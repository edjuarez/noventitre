import Stripe from 'npm:stripe@^14.21.0';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // 1. Manejo de CORS (Obligatorio para que React pueda llamar a esta función)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Inicializar Stripe con la clave secreta de Supabase
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    // 3. Recibir los datos del producto desde React
    const { items } = await req.json();
console.log(items);

const lineItems = items.map((item: any) => {
    console.log(item);

    return {
        price_data: {
            currency: "eur",
            product_data: {
                name: item.name,
                metadata: {
                  supabase_product_id: item.id, // 👈 ¡ESTO ES LO QUE LE PERMITE AL WEBHOOK ENTERARSE!
                },
            },
            unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
    };
});
    // 4. Crear la sesión de Checkout Embebido
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      mode: 'payment',
      return_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    // 5. Devolver el client_secret a React
    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});