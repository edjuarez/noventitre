import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section id="sobre-mi" className="py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Texto */}

          <div className="max-w-xl order-2 lg:order-2">

            {/* <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
              Sobre mí
            </span> */}

            <h2
              className="
                mt-5
                font-heading
                leading-tight
                text-neutral-900
                text-4xl
                md:text-5xl
                tracking-tighter
              "
            >
              ¿Por qué Noventitre?
            </h2>

            <div className="mt-10 space-y-6 text-neutral-700 leading-8 text-lg">

              <p>
                En Noventitre creamos accesorios para
                quienes buscan algo diferente. Combinamos
                telas, colores, texturas y detalles para
                crear piezas con personalidad, confeccionadas
                artesanalmente y pensadas para formar parte
                de tu día a día.
                <br /><br />
                Cada pieza la pienso y confecciono buscando que tenga algo propio, algo que la haga diferente. Sin seguir una fórmula y sin buscar que todas sean iguales.
                <br /><br />
                Porque creo que llevar algo hecho a mano también es una forma de expresar quién sos.
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
          {/* Imagen */}

          <div className="overflow-hidden rounded-sm order-2 lg:order-2">

            <img
              src="/assets/collage_1.webp"
              alt="Collage"
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
        </motion.div>

      </div>
    </section>
  );
}