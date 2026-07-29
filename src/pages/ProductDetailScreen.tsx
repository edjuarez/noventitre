import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X, ShieldCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useProduct } from "../hooks/useProduct";
//import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
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
    const currentImage = 0;
    const {addToCart} = useCart();

    const handleCart = () => {
        addToCart(product);
    }
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
            className="min-h-screen bg-brand-crema pt-25 pb-24 px-5 md:px-1 relative"
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

                        <h1 className="font-heading text-2xl md:text-3xl tracking-tighter leading-tight text-neutral-900">
                            {product.name}
                        </h1>

                        <p className="mt-3 text-xl font-medium text-brand-rosa">
                            € {product.price}
                        </p>

                        {/* Actions */}

                        <div className="flex items-center mt-6 gap-3">

                            <button
                                onClick={handleCheckout}
                                className="w-full sm:w-52 h-11 bg-white border border-black hover:bg-neutral-900 hover:text-white rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                            >
                                <MdShoppingCartCheckout size={18} />
                                Comprar
                            </button>

                            {/* <button
                                onClick={() => navigate("/catalogo")}
                                className="w-full sm:w-52 h-11 bg-brand-rosa border border-brand-rosa hover:bg-neutral-900 hover:border-neutral-900 text-white rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                            >
                                <FaWhatsapp size={18} />
                                Consultar
                            </button> */}
                            
                            <button
                                onClick={handleCart}
                                className="w-full sm:w-52 h-11 bg-white border border-black hover:bg-neutral-900 hover:text-white rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                            >
                                {/* <FaWhatsapp size={18} /> */}
                                Añadir al carro
                            </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-[13px] text-neutral-500">

                            <ShieldCheck
                                size={15}
                                className="text-neutral-700"
                            />

                            <span>
                                Pago seguro mediante Stripe
                            </span>

                        </div>

                        {/* Description */}

                        <section className="mt-8">

                            <h2 className="text-[11px] uppercase tracking-[0.18em] text-brand-rosa mb-3">
                                Descripción
                            </h2>

                            <p className="text-sm leading-6 text-neutral-600">
                                {product.description}
                            </p>

                        </section>

                        {/* Details */}

                        <section className="mt-6 border-t border-brand-rosa pt-5 space-y-4 text-[13px]">

                            <div className="flex justify-between gap-5">

                                <span className="text-brand-rosa">
                                    Categoría
                                </span>

                                <span className="text-right text-neutral-900 capitalize">
                                    {product.category}
                                </span>

                            </div>

                            <div className="flex justify-between gap-5">

                                <span className="text-brand-rosa">
                                    Materiales
                                </span>

                                <span className="text-right text-neutral-900">
                                    Cuero ecológico, algodón y herrajes metálicos.
                                </span>

                            </div>

                            <div className="flex justify-between gap-5">

                                <span className="text-brand-rosa">
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

                        <section className="mt-6 border-t border-brand-rosa pt-5">

                            <h2 className="text-[11px] uppercase tracking-[0.18em] text-brand-rosa mb-3">
                                Envíos
                            </h2>

                            <p className="text-sm leading-6 text-neutral-600">
                                Envíos a toda España. El costo del envío se calcula durante el proceso
                                de compra según el destino seleccionado.
                            </p>

                        </section>

                        {/* Handmade */}

                        <section className="mt-6 border-t border-brand-rosa pt-5">

                            <h2 className="text-[11px] uppercase tracking-[0.18em] text-brand-rosa mb-3">
                                Información
                            </h2>

                            <p className="text-sm leading-6 text-neutral-600">
                                Cada pieza es confeccionada artesanalmente, por lo que pequeñas
                                variaciones en el color o la textura forman parte de su identidad y
                                hacen único cada producto.
                            </p>

                        </section>

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