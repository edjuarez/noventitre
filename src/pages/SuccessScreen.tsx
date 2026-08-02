import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Mail, Truck, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function SuccessScreen() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <section className="min-h-screen bg-brand-crema flex items-center justify-center px-5 py-20 relative overflow-hidden">

      {/* Decoración de fondo */}

      <div className="absolute top-0 right-[-120px] opacity-15 rotate-12 pointer-events-none">
        <div className="w-72 h-72 bg-brand-rosa rotate-45" />
      </div>

      <div className="absolute bottom-[-120px] left-[-120px] opacity-10 pointer-events-none">
        <div className="w-80 h-80 rounded-full border border-black/15" />
      </div>

      {/* Card */}

      <div className="relative z-10 w-full max-w-2xl bg-white border border-stone-200 shadow-sm p-10 md:p-14">

        {/* Icon */}

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-brand-rosa/10 flex items-center justify-center">
            <CheckCircle2
              size={34}
              className="text-brand-rosa"
            />
          </div>
        </div>

        {/* Title */}

        <h1 className="mt-8 font-heading text-5xl tracking-tight text-center text-stone-900">
          ¡Gracias!
        </h1>

        <p className="mt-5 text-center text-lg text-stone-600 leading-8 max-w-xl mx-auto">
          Tu pedido fue recibido correctamente y ya comenzamos a prepararlo.
        </p>

        {/* Próximos pasos */}

        <div className="mt-12 grid gap-5">

          <div className="flex gap-4 border border-stone-200 bg-stone-50 p-5">

            <Mail
              className="text-brand-rosa shrink-0 mt-1"
              size={20}
            />

            <div>

              <h3 className="font-medium text-stone-900">
                Confirmación por correo
              </h3>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                En los próximos minutos recibirás un correo con el resumen de tu
                compra, los datos de envío y la confirmación del pago.
              </p>

            </div>

          </div>

          <div className="flex gap-4 border border-stone-200 bg-stone-50 p-5">

            <Truck
              className="text-brand-rosa shrink-0 mt-1"
              size={20}
            />

            <div>

              <h3 className="font-medium text-stone-900">
                Estamos preparando tu pedido
              </h3>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                Nuestro equipo comenzará a preparar tu compra para enviarla lo
                antes posible. Te avisaremos por correo cuando salga hacia su
                destino.
              </p>

            </div>

          </div>

        </div>

        {/* DEV ONLY */}

        {import.meta.env.DEV && sessionId && (
          <p className="mt-8 text-center text-xs text-stone-400 font-mono">
            {sessionId}
          </p>
        )}

        {/* CTA */}

        <div className="mt-12 flex justify-center">

          <Link
            to="/catalogo"
            className="
              inline-flex
              items-center
              gap-2
              bg-neutral-900
              hover:bg-black
              text-white
              px-8
              h-12
              transition
            "
          >
            <ArrowLeft size={17} />
            Seguir comprando
          </Link>

        </div>

      </div>

    </section>
  );
}