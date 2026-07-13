
import { motion } from "framer-motion";

export default function CustomOrder() {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  return (
    <section  id="custom-order"className="bg-brand-crema py-30 px-6 md:px-12 lg:px-20 pb-60">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-[40%_60%] gap-16 items-center">

          {/* Texto */}

          <div>

            {/* <span className="uppercase tracking-[0.25em] text-xs text-neutral-500">
              Personalizados
            </span> */}

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

          </div>

          {/* Imagen */}

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="
              flex
              items-center
              justify-center
              gap-5
              flex-wrap
            "
          >

            <motion.img
              variants={item}
              src="/assets/customOrder/pieza_1.webp"
              className="w-28 md:w-36"
            />

            <motion.span
              variants={item}
              className="text-4xl font-light"
            >
              +
            </motion.span>

            <motion.img
              variants={item}
              src="/assets/customOrder/pieza_2.webp"
              className="w-28 md:w-36"
            />

            <motion.span
              variants={item}
              className="text-4xl font-light"
            >
              +
            </motion.span>

            <motion.img
              variants={item}
              src="/assets/customOrder/pieza_3.webp"
              className="w-24 md:w-32"
            />

            <motion.span
              variants={item}
              className="text-5xl font-light"
            >
              =
            </motion.span>

            <motion.img
              variants={item}
              src="/assets/customOrder/producto_final.webp"
              className="w-48 md:w-60"
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
}