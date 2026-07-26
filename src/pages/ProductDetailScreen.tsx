import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X, ShieldCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useProduct } from "../hooks/useProduct";
import { FaWhatsapp } from "react-icons/fa";

// Inicializa Stripe con tu PUBLISHABLE KEY (Pública)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function ProductDetailScreen() {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    //const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const { slug } = useParams();
    const { product, loading, error } = useProduct(slug);
    //const [currentImage, setCurrentImage] = useState(0);
const currentImage = 0
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => navigate(-1), 200);
    };

    const handleCheckout = () => {
        if (!product) return;

        navigate("/checkout", {
            state: {
                items: [
                    {
                        ...product,
                        quantity: 1
                    }
                ]
            }
        });
    };
    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (error || !product) return <div className="min-h-screen flex items-center justify-center">Producto no encontrado.</div>;

    return (
        <motion.main
            animate={isClosing ? { x: "100%" } : { x: 0 }}
            initial={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-brand-crema pt-20 pb-24 px-5 md:px-1 relative"
        >
            <div className="w-full max-w-[1700px] mx-auto px-6 xl:px-24">
                <button
                    onClick={handleClose}
                    className="flex items-center gap-2 mb-12 text-xl md:text-1xl hover:opacity-60 transition cursor-pointer"
                >
                    <ChevronLeft size={18} />
                    Volver
                </button>

                <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
                    {/* LEFT: Imágenes */}
                    <div>
                        <div className="relative bg-neutral-100 h-[80vh]">  
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    src={product.images[currentImage]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: .25 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Info y Acción */}
                     <div className="min-w-0 flex flex-col">

                        {/* Header */}

                        <h1 className="font-heading text-3xl md:text-4xl tracking-tighter leading-tight text-neutral-900">
                            {product.name}
                        </h1>

                        <p className="mt-5 text-2xl text-neutral-900">
                            € {product.price}
                        </p>
                        <div className="flex items-center mt-10 mb-2 gap-2">
                            <button
                                onClick={handleCheckout}
                                className=" w-full sm:w-56 bg-white border-2 border-black hover:bg-gray-800 text-black hover:text-white px-8 py-4 rounded flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <MdShoppingCartCheckout size={24} />
                                Comprar
                            </button>
                            <button
                                onClick={() => navigate("/catalogo")}
                                className="w-full sm:w-56 bg-brand-rosa border-2 border-brand-rosa hover:border-gray-800 hover:bg-gray-800 text-white px-8 py-4 rounded flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <FaWhatsapp size={24} />
                                Consultar
                            </button>
                        </div>
                            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-500">
                                <ShieldCheck size={16} className="text-neutral-700" />
                                <span>
                                    Pago seguro con Stripe
                                </span>
                            </div>
                        {/* Description */}

                        <section className="mt-12">

                            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
                                Descripcion
                            </h2>

                            <p className="text-md text-neutral-500">
                                {product.description}
                            </p>

                        </section>

                        {/* Details */}

                        <section className="mt-5 border-t border-neutral-200 pt-8 space-y-6 text-sm">

                            <div className="flex justify-between gap-6">

                                <span className="text-neutral-500">
                                    Categoría
                                </span>

                                <span className="text-right text-neutral-900 capitalize">
                                    {product.category}
                                </span>

                            </div>

                            <div className="flex justify-between gap-6">

                                <span className="text-neutral-500">
                                    Materiales
                                </span>

                                <span className="text-right text-neutral-900">
                                    Cuero ecológico, algodón y herrajes metálicos.
                                </span>

                            </div>

                            <div className="flex justify-between gap-6">

                                <span className="text-neutral-500">
                                    Disponibilidad
                                </span>

                                <span
                                    className={`text-right ${
                                        product.stock > 0
                                            ? "text-green-700"
                                            : "text-red-600"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? `En stock (${product.stock})`
                                        : "Agotado"}
                                </span>

                            </div>

                        </section>

                        {/* Shipping */}

                        <section className="mt-5 border-t border-neutral-200 pt-8 text-sm">

                            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
                                Envíos
                            </h2>

                            <p className="text-neutral-600">
                                Envíos a toda España. El costo del envío se calcula durante el
                                proceso de compra según el destino seleccionado.
                            </p>

                        </section>

                        {/* Handmade */}

                        <section className="mt-5 border-t border-neutral-200 pt-8 text-sm">

                            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
                                Información
                            </h2>

                            <p className="text-neutral-600">
                                Cada pieza es confeccionada artesanalmente, por lo que pequeñas
                                variaciones en el color o la textura forman parte de su identidad
                                y hacen único cada producto.
                            </p>

                        </section>

                        {/* Actions */}

                        <div className="mt-14 flex flex-col gap-4">

                            <button
                                onClick={handleCheckout}
                                //disabled={isCheckoutLoading}
                                className="w-full bg-brand-rosa hover:bg-gray-800 text-white py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
                            >
                                <MdShoppingCartCheckout size={22} />

                                Comprar ahora
                            </button>

                            <button
                                className="w-full border border-neutral-300 hover:bg-neutral-100 py-4 rounded-full transition cursor-pointer"
                            >
                                Consultar por WhatsApp
                            </button>
                            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-500">
                                <ShieldCheck size={16} className="text-neutral-700" />
                                <span>
                                    Pago seguro con Stripe
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* MODAL / CONTENEDOR DEL CHECKOUT EMBEBIDO */}
            <AnimatePresence>
                {clientSecret && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-10"
                    >
                        <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
                            <button
                                onClick={() => setClientSecret(null)}
                                className="absolute right-4 top-4 p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer z-10"
                            >
                                <X size={20} />
                            </button>

                            <div id="checkout" className="pt-8">
                                <EmbeddedCheckoutProvider
                                    stripe={stripePromise}
                                    options={{ clientSecret }}
                                >
                                    <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
}