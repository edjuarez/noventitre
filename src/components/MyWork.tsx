import { FaHandSparkles } from "react-icons/fa";
import { GiSparklingSabre } from "react-icons/gi";
import { RiScissorsCutFill } from "react-icons/ri";

export default function MyWork() {
  return (
    <section id="mi-trabajo" className="bg-brand-crema py-32 px-6 md:px-12 lg:px-20">

      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
            Qué hago
          </span>

          <h2
            className="
              mt-4
              font-heading
              text-5xl
              md:text-6xl
              leading-tight
              text-neutral-900
            "
          >
            Bolsos pensados
            <br />
            para durar.
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            Cada pieza nace de una idea simple: crear accesorios que
            acompañen el día a día, hechos con dedicación y materiales
            seleccionados.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 mt-24 border-y border-neutral-200">

          {/* Item */}

          <div className="px-10 py-14 text-center md:border-r border-neutral-200">

            <FaHandSparkles 
              size={34}
              strokeWidth={1.5}
              className="mx-auto"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Hechos a mano
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              Cada bolso está confeccionado uno por uno, con tiempo,
              atención y cuidado en cada detalle.
            </p>

          </div>

          {/* Item */}

          <div className="px-10 py-14 text-center md:border-r border-neutral-200">

            <RiScissorsCutFill
              size={34}
              className="mx-auto"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Personalizados
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              ¿Tenés una idea? Elegimos juntos telas, colores y medidas
              para crear una pieza completamente tuya.
            </p>

          </div>

          {/* Item */}

          <div className="px-10 py-14 text-center">

            <GiSparklingSabre
              size={34}
              strokeWidth={1.5}
              className="mx-auto"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Ediciones limitadas
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              Muchas combinaciones se realizan en pocas unidades para
              que cada colección conserve su identidad.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}