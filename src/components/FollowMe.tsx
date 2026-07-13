import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { motion } from "framer-motion";

const links = [
  {
    title: "Instagram",
    subtitle: "Proceso, novedades y detrás de escena",
    icon: <FaInstagram size={22} />,
    href: "https://instagram.com",
  },
  {
    title: "WhatsApp",
    subtitle: "Consultas y pedidos personalizados",
    icon: <FaWhatsapp size={22} />,
    href: "https://wa.me/34600000000",
  },
  {
    title: "Google Fotos",
    subtitle: "Todos los diseños y colecciones",
    icon: <MdPhotoLibrary size={22} />,
    href: "https://photos.google.com",
  },
];

export default function FollowMe() {
  return (
    <section
      id="contacto"
      className="bg-brand-crema py-36 px-6 md:px-12 lg:px-20 pb-60"
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
          viewport={{ once: false }}
          transition={{ duration: .6, delay: .1 }}
          className="mt-6 font-heading text-5xl md:text-7xl leading-none"
        >
          Gracias.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: .6, delay: .2 }}
          className="mt-8 max-w-2xl mx-auto text-lg leading-8 text-neutral-600"
        >
          Detrás de cada bolso hay tiempo, pruebas,
          combinaciones de telas y mucho trabajo hecho a mano.

          <br />
          <br />

          Si querés seguir viendo nuevos diseños o tenés
          una idea para crear juntos, te espero por acá.
        </motion.p>

        <div className="mt-24 divide-y divide-neutral-200">

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

        </div>

      </div>
    </section>
  );
}