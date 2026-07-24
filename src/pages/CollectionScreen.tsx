import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import type { Product } from "../types/product";


// const products: Product[] = [
//   {
//     id: 1,
//     name: "Bolso Nube",
//     price: 95,
//     images: [
//       "/assets/myWorld/myworld_1.webp",
//       "/assets/myWorld/myworld_2.webp",
//       "/assets/myWorld/myworld_3.webp",
//     ],
//   },
//   {
//     id: 2,
//     name: "Tote Camel",
//     price: 82,
//     images: [
//       "/assets/myWorld/myworld_2.webp",
//       "/assets/myWorld/myworld_3.webp",
//       "/assets/myWorld/myworld_4.webp",
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_3.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_4.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_5.webp"
//     ],
//   },
//   {
//     id: 2,
//     name: "Tote Camel",
//     price: 82,
//     images: [
//       "/assets/myWorld/myworld_2.webp",
//       "/assets/myWorld/myworld_3.webp",
//       "/assets/myWorld/myworld_4.webp",
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_3.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_4.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_5.webp"
//     ],
//   },
//   {
//     id: 2,
//     name: "Tote Camel",
//     price: 82,
//     images: [
//       "/assets/myWorld/myworld_2.webp",
//       "/assets/myWorld/myworld_3.webp",
//       "/assets/myWorld/myworld_4.webp",
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_3.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_4.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_5.webp"
//     ],
//   },
//   {
//     id: 2,
//     name: "Tote Camel",
//     price: 82,
//     images: [
//       "/assets/myWorld/myworld_2.webp",
//       "/assets/myWorld/myworld_3.webp",
//       "/assets/myWorld/myworld_4.webp",
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_3.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_4.webp"
//     ],
//   },
//   {
//     id: 3,
//     name: "Necessaire",
//     price: 35,
//     images: [
//       "/assets/myWorld/myworld_5.webp"
//     ],
//   },
// ];

export default function Collection() {
  const { products } = useProducts({ mode: 'all'});
  //console.log(products, "productos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const closeModal = () => {
    setSelectedProduct(null);
    setCurrentImage(0);
  };

  const nextImage = () => {
    if (!selectedProduct) return;

    setCurrentImage((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (!selectedProduct) return;

    setCurrentImage((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-brand-crema py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">

      <div className=" mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            className="
              mt-4
              font-heading
              leading-tight
              text-neutral-900
              text-4xl md:text-5xl tracking-tighter
            "
          >
            Colección
          </h1>

          <p className="mt-6 text-neutral-600 max-w-2xl mx-auto leading-7">
            Descubrí una selección de piezas artesanales creadas con dedicación,
            pensadas para acompañarte todos los días.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">

          {products.map((product) => (
            <motion.button
              key={product.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              // onClick={() => {
              //   setSelectedProduct(product);
              //   setCurrentImage(0);
              // }}
              onClick={() => navigate(`/product/${product.slug ? product.slug : product.id}`)}
              className="text-left cursor-pointer"
            >
              <div className="overflow-hidden">

                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>

              <h3 className="mt-4 text-md">
                {product.name}
              </h3>

              <p className="mt-1 text-sm">
                € {product.price}
              </p>

            </motion.button>
          ))}

        </div>

      </div>

      <AnimatePresence>

        {selectedProduct && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >

            <motion.div
              initial={{ scale: .95 }}
              animate={{ scale: 1 }}
              exit={{ scale: .95 }}
              className="relative bg-white rounded-sm overflow-hidden"
            >

              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-20 bg-white rounded-full p-2 cursor-pointer"
              >
                <X size={22} />
              </button>

  

                <div className="relative bg-neutral-100">

                  <img
                    src={selectedProduct.images[currentImage]}
                    alt={selectedProduct.name}
                    className="w-full h-[70vh] object-contain"
                  />

                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 cursor-pointer"
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 cursor-pointer"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}

                </div>

                {/* <div className="p-10 flex flex-col justify-center">

                  <h2 className="font-heading text-4xl">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-4 text-2xl">
                    € {selectedProduct.price}
                  </p>

                  <p className="mt-8 text-neutral-600 leading-8">
                    Cada pieza es confeccionada artesanalmente utilizando
                    materiales cuidadosamente seleccionados. Debido a su proceso
                    de fabricación, cada producto posee detalles únicos que lo
                    hacen especial.
                  </p>

                  <div className="mt-12 flex flex-col gap-4">

                    <button className="bg-brand-rosa text-white rounded-full py-4 hover:opacity-90 transition cursor-pointer">
                      Comprar ahora
                    </button>

                    <button className="border border-neutral-300 rounded-full py-4 hover:bg-neutral-100 transition cursor-pointer">
                      Consultar por WhatsApp
                    </button>

                  </div>

                </div> */}

      

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}