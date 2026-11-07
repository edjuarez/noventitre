
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, X } from "lucide-react";
import { IoMdImages } from "react-icons/io";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export default function MyWorld() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const { products, loading, error } = useProducts({ mode: "featured", limit: 6 });
    const navigate = useNavigate();

    const closeModal = () => {
        setSelectedImage(null);
        setIsZoomed(false);
    };

    return (
        <section
            id="mi-mundo"
            className="py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="mt-4 font-heading leading-tight text-neutral-900 text-4xl md:text-5xl tracking-tighter">
                        Un vistazo
                        <br />
                        a mi mundo.
                    </h2>

                    <p className="mt-6 text-lg text-neutral-600 leading-8">
                        Una selección de bolsos creados a mano, donde cada combinación de telas, colores y detalles da lugar a una pieza diferente.
                        <br />
                        Ninguno es igual al anterior, y esa es justamente la idea.
                    </p>
                </div>

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

                {!loading && !error && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3">
                        {products.map((product, index) => (
                            <motion.article
                                key={product.id || index}
                                initial={{ opacity: 0, x: 35 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.12,
                                    ease: "easeOut",
                                }}
                                className="group overflow-hidden bg-neutral-100 relative aspect-square"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    onClick={() => {
                                        setIsZoomed(false);
                                        setSelectedImage(product.images[0]);
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
                                />
                            </motion.article>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center md:mt-16 md:pt-20 pt-5 mt-10"
                >
                    <button
                        onClick={() => navigate("/catalogo")}
                        className="w-full border-2 border-black sm:w-56 bg-white hover:bg-gray-800 text-black hover:text-white px-8 py-4 rounded flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <IoMdImages size={24} />
                        Ver colección
                    </button>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center overflow-hidden"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            className="absolute top-6 right-6 z-20 text-white hover:opacity-60 cursor-pointer"
                            aria-label="Cerrar imagen"
                        >
                            <X size={28} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsZoomed(prev => !prev);
                            }}
                            className="absolute top-6 right-20 z-20 text-white hover:opacity-60 cursor-pointer"
                            aria-label={isZoomed ? "Alejar" : "Acercar"}
                        >
                            {isZoomed ? <ZoomOut size={26} /> : <ZoomIn size={26} />}
                        </button>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-full h-full p-5"
                        >
                            <img
                                src={selectedImage}
                                alt="Imagen ampliada"
                                draggable={false}
                                className={`max-w-[90vw] max-h-[90vh] object-contain select-none transition-transform duration-300 ${
                                    isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                                }`}
                                onClick={() => setIsZoomed(prev => !prev)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
