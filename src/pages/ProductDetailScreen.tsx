import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

import { useProduct } from "../hooks/useProduct";

export default function ProductDetailScreen() {

    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);

        setTimeout(() => {
            navigate(-1);
        }, 200); // igual a la duración de la animación
    };
    const { slug } = useParams();

    const { product, loading, error } = useProduct(slug);

    const [currentImage, setCurrentImage] = useState(0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {error}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Product not found.
            </div>
        );
    }

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

        <motion.main
            animate={
                isClosing
                    ? { x: "100%" }
                    : { x: 0 }
            }
            initial={{ x: "100%" }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
            }}
            // exit={{ x: "100%" }}
            className="min-h-screen bg-brand-crema pt-32 pb-24 px-5 md:px-12"
        >

            <div className="max-w-7xl mx-auto">

                <button

                    onClick={handleClose}

                    className="flex items-center gap-2 mb-12 text-sm hover:opacity-60 transition cursor-pointer"

                >

                    <ArrowLeft size={18} />

                    Volver a la colección

                </button>

                <div className="grid lg:grid-cols-2 gap-20">

                    {/* LEFT */}

                    <div>

                        <div className="relative bg-neutral-100">

                            <AnimatePresence mode="wait">

                                <motion.img

                                    key={currentImage}

                                    src={product.images[currentImage]}

                                    alt={product.name}

                                    initial={{ opacity: 0 }}

                                    animate={{ opacity: 1 }}

                                    exit={{ opacity: 0 }}

                                    transition={{ duration: .25 }}

                                    className="w-full aspect-[4/5] object-cover"

                                />

                            </AnimatePresence>

                            {product.images.length > 1 && (

                                <>

                                    <button

                                        onClick={previousImage}

                                        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 cursor-pointer"

                                    >

                                        <ChevronLeft />

                                    </button>

                                    <button

                                        onClick={nextImage}

                                        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 cursor-pointer"

                                    >

                                        <ChevronRight />

                                    </button>

                                </>

                            )}

                        </div>

                        {/* Indicators */}

                        <div className="flex justify-center gap-2 mt-6">

                            {product.images.map((_, index) => (

                                <button

                                    key={index}

                                    onClick={() => setCurrentImage(index)}

                                    className={`h-2 rounded-full transition-all ${currentImage === index
                                            ? "w-8 bg-neutral-900"
                                            : "w-2 bg-neutral-300"
                                        }`}

                                />

                            ))}

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col">

                        <h1 className="font-heading text-5xl">

                            {product.name}

                        </h1>

                        <p className="text-2xl mt-6">

                            € {product.price}

                        </p>

                        <div className="mt-12 space-y-8">

                            <div>

                                <h3 className="uppercase text-xs tracking-[.25em] mb-3">

                                    Descripción

                                </h3>

                                <p className="leading-8 text-neutral-600">

                                    {product.description}

                                </p>

                            </div>

                            <div>

                                <h3 className="uppercase text-xs tracking-[.25em] mb-3">

                                    Materiales

                                </h3>

                                <p className="leading-8 text-neutral-600">

                                    Cuero ecológico, algodón y herrajes metálicos.

                                </p>

                            </div>

                        </div>

                        <div className="mt-14 flex flex-col gap-4">

                            <button

                                className="bg-brand-rosa text-white py-4 rounded-full hover:opacity-90 transition cursor-pointer"

                            >

                                Comprar ahora

                            </button>

                            <button

                                className="border py-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"

                            >

                                Consultar por WhatsApp

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </motion.main>

    );

}