import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoMdImages } from "react-icons/io";
import { userData } from "../data/userData";

export default function FollowMe() {
  return (
    <section
      id="contacto"
      className="bg-brand-crema py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: .5 }}
          className="uppercase tracking-[.25em] text-xs text-neutral-500"
        >
          Nos seguimos viendo
        </motion.span> */}

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .1 }}
          className="              mt-4
              font-heading
              leading-tight
              text-neutral-900
              text-4xl md:text-5xl tracking-tighter"
        >
          El próximo<br /> ya está en camino.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, delay: .2 }}
          className="mt-8 md:mt-14 max-w-2xl mx-auto text-lg leading-8 text-neutral-600"
        >
          Detrás de cada creación hay tiempo, pruebas,
          combinaciones de telas y mucho trabajo hecho a mano.

          <br />
          <br />

          Si querés seguir viendo nuevos diseños o tenés
          una idea para crear juntos, te espero por acá.
        </motion.p>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: .3, duration: .6 }}
    className="mt-14 flex flex-col items-center gap-5"
  >
  {/* Instagram */}

  <motion.a
    href={userData.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex
      items-center
      justify-center
      gap-3
      bg-black
      text-white
      px-8
      py-4
      rounded-full
      hover:bg-brand-rosa
      transition-all
      duration-300
      shadow-sm
      min-w-[280px]
      hover:scale-105
    "
  >
    <FaInstagram size={22} />

    Seguir en Instagram
  </motion.a>

  {/* Google Fotos */}

  <motion.a
    href={userData.googleFotos}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex
      items-center
      justify-center
      gap-3
      border
      border-black
      bg-transparent
      text-black
      px-8
      py-4
      rounded-full
      hover:bg-black
      hover:text-white
      transition-all
      duration-300
      hover:scale-105
      min-w-[280px]
    "
  >
    <IoMdImages size={22} />

    Ver galería completa
  </motion.a>
</motion.div>

        {/* <div className="mt-24 divide-y divide-neutral-200">

          {links.map((link, index) => (

            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              className="
                group
                flex
                items-center
                justify-between
                py-8
              "
            >
              <div className="flex items-center gap-5">

                <div className="text-neutral-700">
                  {link.icon}
                </div>

                <div className="text-left">

                  <h3 className="text-2xl font-medium">
                    {link.title}
                  </h3>

                  <p className="text-neutral-500 mt-1">
                    {link.subtitle}
                  </p>

                </div>

              </div>

              <ArrowUpRight
                size={28}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                  group-hover:-translate-y-2
                "
              />

            </motion.a>

          ))}

        </div> */}

      </div>
    </section>
  );
}