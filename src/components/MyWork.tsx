import { motion } from "framer-motion";
import { FaHandSparkles } from "react-icons/fa";
import { GiSparklingSabre } from "react-icons/gi";
import { RiScissorsCutFill } from "react-icons/ri";

export default function MyWork() {
  return (
    <section
      id="mi-trabajo"
      className="relative overflow-hidden bg-brand-crema py-20 px-6 md:px-12 lg:px-20 pb-150 mb-50 mt-50"
    >
      {/* Imagen decorativa */}

      <motion.img
        src="/assets/telas_fondo.webp"
        alt=""
        aria-hidden="true"
        initial={{ x: 120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.50 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="
          absolute
          right-[80px]
          top-1/2
          -translate-y-1/2

          w-[220px]
          md:w-[300px]
          lg:w-[420px]

          pointer-events-none
          select-none
          z-0
        "
      />

      {/* Contenido */}

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Encabezado */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: .6 }}
          className="text-center max-w-3xl mx-auto"
        >

          {/* <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
            Qué hago
          </span> */}

          <h2 className="mt-4 font-heading text-5xl md:text-6xl leading-tight text-neutral-900">
            Bolsos pensados
            <br />
            para durar.
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            Cada pieza nace de una idea simple: crear accesorios que
            acompañen el día a día, hechos con dedicación y materiales
            seleccionados.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 mt-24 bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-3xl overflow-hidden shadow-sm">

          {/* Card */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: .1 }}
            className="px-10 py-14 text-center md:border-r border-neutral-200"
          >

            <FaHandSparkles
              size={34}
              className="mx-auto text-brand-rosa"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Hechos a mano
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              Cada bolso está confeccionado uno por uno, con tiempo,
              atención y cuidado en cada detalle.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: .25 }}
            className="px-10 py-14 text-center md:border-r border-neutral-200"
          >

            <RiScissorsCutFill
              size={34}
              className="mx-auto text-brand-rosa"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Personalizados
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              Elegimos juntos telas, colores y medidas para crear una
              pieza completamente única y pensada para vos.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: .4 }}
            className="px-10 py-14 text-center"
          >

            <GiSparklingSabre
              size={34}
              className="mx-auto text-brand-rosa"
            />

            <h3 className="mt-8 uppercase tracking-widest text-sm font-semibold">
              Ediciones limitadas
            </h3>

            <p className="mt-5 text-neutral-600 leading-7">
              Muchas combinaciones se realizan en pocas unidades para
              mantener el carácter único de cada colección.
            </p>

          </motion.div>

        </div>

      </div>

    </section>
  );
}