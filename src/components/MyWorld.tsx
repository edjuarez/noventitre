import { motion, AnimatePresence } from "framer-motion";
import { IoMdImages } from "react-icons/io";
import { useState } from "react";
import { userData } from "../data/userData"
import { useProducts } from '../hooks/useProducts';


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
  const { products, loading, error } = useProducts({ mode: 'featured', limit: 3 });
  //const { products, loading } = useFeaturedProducts(1);
console.log({ products });
  return (
    <section id="mi-mundo" className="bg-brand-crema py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">

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

        {/* Estados de Carga y Error */}

        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutral-200/60 aspect-square rounded-sm" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 border border-dashed border-red-200 rounded-xl bg-red-50/50">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Galería */}
{!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
            {products.map((product, index) => {
              const imageSrc = product.images[0];
              const productName = product.name;

              return (
                <motion.article
                  key={product.id || index}
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
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
                    ${index === products.length - 1 ? "col-span-2 md:col-span-1" : ""}
                  `}
                >
                  <img
                    src={imageSrc}
                    alt={productName}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                      cursor-pointer
                    "
                    onClick={() => setSelectedImage(imageSrc)}
                  />

                  {/* 🏷️ Info Overlay (Aparece en Hover) */}
                  <div className="
                    absolute
                    inset-0
                    bg-black/0
                    group-hover:bg-black/40
                    transition-all
                    duration-300
                    flex
                    flex-col
                    justify-end
                    p-4
                    pointer-events-none
                  ">
                    <div className="
                      transform
                      translate-y-4
                      group-hover:translate-y-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-300
                    ">
                      <p className="text-white font-heading text-lg md:text-xl">
                        {productName}
                      </p>
                      {product.price && (
                        <p className="text-neutral-200 text-sm mt-0.5">
                          ${product.price}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center md:mt-16 md:pt-20 pt-5 mt-10"
        >
          <motion.a
            href={userData.googleFotos}
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
              bg-white
              text-black
              hover:bg-gray-800
              px-8
              py-4
              rounded-full
              hover:scale-105
              hover:text-white
              transition-all
              duration-300
              shadow-sm
              border border-black
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

