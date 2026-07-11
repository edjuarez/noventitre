import { ArrowRight, MessageCircle } from "lucide-react";

export default function CustomOrder() {
  return (
    <section className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-[40%_60%] gap-16 items-center">

          {/* Texto */}

          <div>

            <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
              Personalizados
            </span>

            <h2 className="mt-4 font-heading text-5xl md:text-6xl leading-tight">
              Tu idea.
              <br />
              Tu bolso.
            </h2>

            <p className="mt-8 text-lg text-neutral-600 leading-8">

              Si tenés una idea, una combinación de colores o un tamaño
              específico, podemos diseñarlo juntos.

            </p>

            <p className="mt-5 text-lg text-neutral-600 leading-8">

              Elegimos las telas, definimos los detalles y confecciono
              una pieza hecha especialmente para vos.

            </p>

            <button
              className="
                mt-12
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-black
                text-white
                px-8
                py-4
                hover:bg-neutral-800
                transition
              "
            >
              <MessageCircle size={18} />

              Pedir por WhatsApp

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Imagen */}

          <div>

            <img
              src="/assets/custom/custom-order.webp"
              alt="Proceso creativo Noventitre"
              className="
                w-full
                h-[520px]
                object-cover
                rounded-sm
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}