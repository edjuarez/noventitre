import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import type { Product } from "../../../types/product";

interface ProductDetailsSheetProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailsSheet({
  product,
  open,
  onClose,
}: ProductDetailsSheetProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [product]);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sheet */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-50 bg-brand-crema overflow-y-auto"
          >
            {/* Header */}

            <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-6 bg-brand-crema border-b border-black/5">

              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                <ArrowLeft size={18} />
                Collection
              </button>

            </div>

            {/* Content */}

            <div className="grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">

              {/* LEFT */}

              <div className="relative flex items-center justify-center bg-[#f5f3ef]">

                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="max-h-[80vh] w-full object-contain"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow cursor-pointer"
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow cursor-pointer"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}

                {/* Indicators */}

                {product.images.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">

                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`h-2 rounded-full transition-all ${
                          currentImage === index
                            ? "w-8 bg-black"
                            : "w-2 bg-black/30"
                        }`}
                      />
                    ))}

                  </div>
                )}

              </div>

              {/* RIGHT */}

              <div className="flex flex-col justify-center px-8 md:px-16 py-12">

                <p className="uppercase tracking-[0.2em] text-xs text-neutral-500 mb-3">
                  Handmade Collection
                </p>

                <h1 className="font-heading text-4xl md:text-6xl leading-none">
                  {product.name}
                </h1>

                <p className="mt-6 text-2xl">
                  € {product.price}
                </p>

                <div className="mt-12 space-y-8">

                  <div>

                    <h3 className="uppercase tracking-wide text-xs mb-3">
                      Descripción
                    </h3>

                    <p className="text-neutral-700 leading-8">
                      {product.description ||
                        "Cada pieza es confeccionada artesanalmente utilizando materiales cuidadosamente seleccionados. Debido a su proceso de fabricación, cada producto posee detalles únicos que lo hacen especial."}
                    </p>

                  </div>

                  <div>

                    <h3 className="uppercase tracking-wide text-xs mb-3">
                      Materiales
                    </h3>

                    <p className="text-neutral-700">
                      Cuero · Lona · Herrajes metálicos
                    </p>

                  </div>

                  <div>

                    <h3 className="uppercase tracking-wide text-xs mb-3">
                      Disponibilidad
                    </h3>

                    <p className="text-neutral-700">
                      {product.stock > 0 ? "En stock" : "Sin stock"}
                    </p>

                  </div>

                </div>

                <div className="mt-16 flex flex-col gap-4">

                  <button className="bg-brand-rosa text-white py-4 rounded-full hover:opacity-90 transition cursor-pointer">
                    Comprar ahora
                  </button>

                  <button className="border border-neutral-300 py-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Consultar por WhatsApp
                  </button>

                </div>

              </div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}