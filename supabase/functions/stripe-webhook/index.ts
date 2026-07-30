import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.0.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2022-11-15",
  httpClient: Stripe.createFetchHttpClient(),
});

const resend = new Resend(resendApiKey);

serve(async (req) => {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No stripe signature found", { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        endpointSecret
      );
    } catch (err: any) {
      console.error(`❌ Fallo en la verificación de firma: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`📦 Procesando checkout para la sesión: ${session.id}`);

      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const shippingAddress = session.shipping_details
        ? {
            name: session.shipping_details.name,
            address: session.shipping_details.address,
          }
        : session.customer_details?.address
        ? {
            name: session.customer_details.name,
            address: session.customer_details.address,
          }
        : null;

      // 1. Guardar la orden principal
      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email || "sin-email@domain.com",
          customer_name: session.customer_details?.name || session.shipping_details?.name || "Cliente",
          total_amount: (session.amount_total || 0) / 100,
          status: "paid",
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Obtener los ítems de Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      const purchasedItems = [];

      for (const item of lineItems.data) {
        const stripeProduct = item.price?.product as Stripe.Product | undefined;
        const productId =
          stripeProduct?.metadata?.supabase_product_id ||
          stripeProduct?.metadata?.product_id ||
          item.metadata?.product_id ||
          null;

        const quantity = item.quantity || 1;
        const unitPrice = item.price?.unit_amount
          ? item.price.unit_amount / 100
          : (item.amount_total / 100) / quantity;

        // Guardar ítem en Supabase
        await supabaseAdmin.from("order_items").insert({
          order_id: order.id,
          product_id: productId,
          product_name: item.description || "Producto de la tienda",
          quantity: quantity,
          price_at_purchase: unitPrice,
        });

        // Descontar stock mediante RPC
        if (productId) {
          await supabaseAdmin.rpc("decrement_stock", {
            p_id: productId,
            qty: quantity,
          });
        }

        purchasedItems.push({
          description: item.description || "Producto de la tienda",
          quantity: quantity,
          amount: (item.amount_total || 0) / 100,
        });
      }

      // 3. Enviar correo de confirmación al cliente vía Resend
      const customerEmail = session.customer_details?.email;

      if (customerEmail && resendApiKey) {
        try {
          const emailHtml = buildOrderEmailHTML({
            customerName: session.customer_details?.name || "Cliente",
            orderId: order.id,
            totalAmount: (session.amount_total || 0) / 100,
            items: purchasedItems,
            shippingAddress: shippingAddress,
          });

          const { data: emailRes, error: emailErr } = await resend.emails.send({
            from: "Noventitre <onboarding@resend.dev>", // Cambia a tu dominio al verificar
            to: [customerEmail],
            subject: `Confirmación de pedido #${order.id.slice(0, 8)}`,
            html: emailHtml,
          });

          if (emailErr) {
            console.error("❌ Error enviando correo vía Resend:", emailErr);
          } else {
            console.log(`✉️ Correo de confirmación enviado exitosamente (ID: ${emailRes?.id})`);
          }
        } catch (mailError: any) {
          console.error("❌ Excepción al intentar enviar correo:", mailError.message);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("🔥 Error procesando el webhook:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function buildOrderEmailHTML(params: {
  customerName: string;
  orderId: string;
  totalAmount: number;
  items: Array<{ description: string; quantity: number; amount: number }>;
  shippingAddress: any;
}) {
  const { customerName, orderId, totalAmount, items, shippingAddress } = params;

  const itemsListHTML = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; color: #111111;">
          ${item.description} (x${item.quantity})
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; color: #111111; text-align: right; font-weight: 600;">
          $${item.amount.toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const addressHTML = shippingAddress?.address
    ? `
      <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.5;">
        ${shippingAddress.name || customerName}<br>
        ${shippingAddress.address.line1 || ""}<br>
        ${shippingAddress.address.city || ""}, ${shippingAddress.address.postal_code || ""}<br>
        ${shippingAddress.address.country || ""}
      </p>`
    : `<p style="margin: 0; font-size: 14px; color: #777777;">Sin dirección registrada</p>`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 32px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <h1 style="font-size: 22px; font-weight: 700; color: #111111; margin-top: 0; margin-bottom: 8px;">¡Gracias por tu compra, ${customerName}!</h1>
          <p style="font-size: 14px; color: #666666; margin-top: 0; margin-bottom: 24px;">Hemos recibido tu pedido correctamente. A continuación encuentras el resumen de la orden <strong>#${orderId.slice(0, 8)}</strong>.</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr>
                <th style="text-align: left; padding-bottom: 8px; border-bottom: 2px solid #111111; font-size: 12px; text-transform: uppercase; color: #888888;">Producto</th>
                <th style="text-align: right; padding-bottom: 8px; border-bottom: 2px solid #111111; font-size: 12px; text-transform: uppercase; color: #888888;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsListHTML}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding-top: 16px; font-weight: 700; font-size: 16px; color: #111111;">Total Pagado</td>
                <td style="padding-top: 16px; font-weight: 700; font-size: 16px; color: #111111; text-align: right;">$${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #111111;">Dirección de Envío</h3>
            ${addressHTML}
          </div>

          <p style="font-size: 12px; color: #999999; text-align: center; margin-bottom: 0;">Si tienes alguna duda sobre tu compra, responde directamente a este correo.</p>
        </div>
      </body>
    </html>
  `;
}