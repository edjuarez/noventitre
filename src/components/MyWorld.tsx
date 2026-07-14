import { motion, AnimatePresence } from "framer-motion";
import { IoMdImages } from "react-icons/io";
import { useState } from "react";


const images = [
  "/assets/myWorld/myworld_1.webp",
  "/assets/myWorld/myworld_2.webp",
  "/assets/myWorld/myworld_3.webp",
  "/assets/myWorld/myworld_4.webp",
  "/assets/myWorld/myworld_5.webp",
  "/assets/myWorld/myworld_6.webp",
  "/assets/myWorld/myworld_7.webp",
  "/assets/myWorld/myworld_8.webp",
  "/assets/myWorld/myworld_9.webp",
];

export default function MyWorld() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <section id="mi-mundo" className="bg-brand-crema py-17 md:py-15 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="
              mt-4
              font-heading
              leading-tight
              text-neutral-900
              text-4xl md:text-5xl tracking-tighter
            "
          >
             Un vistazo
              <br />
              a mi mundo.
          </h2>

          <p className="mt-6 text-lg text-neutral-600 leading-8">
            Una selección de bolsos creados a mano, donde cada combinación de telas, colores y detalles da lugar a una pieza diferente. <br />
           Ninguno es igual al anterior, y esa es justamente la idea.
          </p>

        </div>
        {/* Galería */}

        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
          {images.map((image, index) => (
            <motion.article
              key={index}
              initial={{
                opacity: 0,
                x: 35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className={`
      group
      overflow-hidden
      bg-neutral-100
      relative
      aspect-square

      ${
        index === images.length - 1
          ? "col-span-2 md:col-span-1"
          : ""
      }
    `}
            >
              <img
                src={image}
                alt={`Noventitre ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                  cursor-pointer
                "
                onClick={() => setSelectedImage(image)}
              />

              {/* Overlay opcional */}

              {/*
              <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/20
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <Camera
                  className="
                    opacity-0
                    group-hover:opacity-100
                    text-white
                    transition
                  "
                  size={28}
                />
              </div>
              */}
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center md:mt-16 md:pt-20 pt-5 mt-10"
        >
          <motion.a
            href="https://photos.google.com/share/AF1QipPZWCT5MR8D_PBaBaZjMkJPRe53NHmb-czXhYqTj_6OvgteAaHy3Kmsd86Jm4lb5g?key=YXlSVF9pbEVfaXMxem9xb3FEamNYOEg0MkpKdm9B"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className="
              inline-flex
              items-center
              gap-3
              bg-black
              text-white
              px-8
              py-4
              rounded-full
              hover:scale-105
              hover:bg-brand-rosa
              hover:text-white
              transition-all
              duration-300
              shadow-sm
            "
          >
            <IoMdImages size={22} />
            Ver galería completa
          </motion.a>
        </motion.div>
      </div>
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedImage(null)}
      className="
        fixed
        inset-0
        bg-black/90
        z-[999]
        flex
        items-center
        justify-center
        p-6
      "
    >
      <motion.img
        initial={{ scale: .9 }}
        animate={{ scale: 1 }}
        exit={{ scale: .9 }}
        transition={{ duration: .25 }}
        src={selectedImage}
        className="
          max-h-[90vh]
          max-w-[90vw]
          object-contain
        "
      />
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}

