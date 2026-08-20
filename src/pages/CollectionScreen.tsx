import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useProducts } from '../hooks/useProducts';
import type { Product } from "../types/product";
import ProductCard from "../components/collection/ProductCard";

export default function Collection() {
  const { products } = useProducts({ mode: 'all' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

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

  // Agrupamos los productos por categoría
  const groupedProducts = useMemo(() => {
    return products.reduce<Record<string, Product[]>>((acc, product) => {
      const category = product.category ? product.category.toLowerCase().trim() : 'otros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }, [products]);

  return (
    <section className="bg-brand-crema py-22 md:py-27 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">
      <div className="mx-auto md:px-6">

        {/* Título Principal */}
{/*         <div className="max-w-3xl mb-12">
          <h1 className="mt-4 font-heading leading-tight text-neutral-900 text-4xl md:text-5xl tracking-tighter">
            Colección
          </h1>
        </div> */}

        {/* Secciones agrupadas por categoría */}
        <div className="space-y-16">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="flex flex-col">
              
              {/* Título de la Categoría con el mismo estilo */}
              <div className="mb-6">
                <h2 className="font-heading leading-tight text-neutral-900 text-3xl md:text-4xl tracking-tighter capitalize">
                  {category}
                </h2>
              </div>

              {/* Grid de productos de la categoría */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

            </div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}