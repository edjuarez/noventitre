import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="sobre-mi" className="bg-brand-crema py-28 px-6 md:px-12 lg:px-20">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Imagen */}

          <div className="overflow-hidden rounded-sm">

            <img
              src="/assets/carla_working.webp"
              alt="Noe trabajando en Noventitre"
              className="
                w-full
                h-[600px]
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
            />

          </div>

          {/* Texto */}

          <div className="max-w-xl">

            <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
              Sobre mí
            </span>

            <h2
              className="
                mt-5
                font-heading
                text-5xl
                lg:text-6xl
                leading-tight
                text-neutral-900
              "
            >
              Lo que ves,
              <br />
              lo hago yo.
            </h2>

            <div className="mt-10 space-y-6 text-neutral-700 leading-8 text-lg">

              <p>
                Hola soy Carla! La persona detrás de Noventitre.
                Cada bolso nace en mi taller, donde combino telas,
                colores y detalles para crear piezas que no se
                repiten.
              </p>

              <p>
                Me gusta trabajar despacio, elegir cada material y
                cuidar cada costura. Creo que un objeto hecho con
                dedicación también puede contar una historia.
              </p>

              <p>
                Más que vender accesorios, busco crear piezas que
                acompañen el día a día y reflejen la personalidad de
                quien las lleva.
              </p>

            </div>

            {/* <button
              className="
                mt-12
                inline-flex
                items-center
                gap-3
                text-sm
                uppercase
                tracking-[0.18em]
                font-medium
                border-b
                border-black
                pb-2
                hover:gap-5
                transition-all
              "
            >
              Conocer mi historia

              <ArrowRight
                size={18}
                strokeWidth={1.7}
              />

            </button> */}

          </div>

        </div>

      </div>

    </section>
  );
}