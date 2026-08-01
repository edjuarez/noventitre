import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useProduct } from "../hooks/useProduct";
//import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
//import useCart } from "../context/CartContext";

export default function ProductDetailScreen() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);
    //const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [zoomOpen, setZoomOpen] = useState(false);

    const { slug } = useParams();
    const { product, loading, error } = useProduct(slug);
    const [currentImage, setCurrentImage] = useState(0);
    const {addToCart} = useCart();

    const handleCart = () => {
    if (!product) return;

    const itemToAdd: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      stock: product.stock,
    };
        addToCart(itemToAdd);
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
            <div className="w-full max-w-[1700px] mx-auto xl:px-24">
                <button
                    onClick={handleClose}
                    className="flex items-center gap-2 mb-12 text-xl md:text-1xl hover:opacity-60 transition cursor-pointer"
                >
                    <ChevronLeft size={18} />
                    Volver
                </button>

                <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
                    {/* LEFT: Imágenes */}
                    <div className="flex gap-5">

                        {/* Miniaturas */}

                        <div className="hidden md:flex flex-col gap-3 w-20">

                            {product.images.map((image, index) => (

                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`
                                        aspect-[4/5]
                                        overflow-hidden
                                        border
                                        transition
                                        cursor-pointer

                                        ${
                                            currentImage === index
                                                ? "border-black border-1"
                                                : "border-neutral-200 hover:border-neutral-500"
                                        }
                                    `}
                                >
                                    <img
                                        src={image}
                                        className="w-full h-full object-cover"
                                    />

                                </button>

                            ))}

                        </div>

                        {/* Imagen principal */}

                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    onClick={() => setZoomOpen(true)}
                                    key={currentImage}
                                    src={product.images[currentImage]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: .25 }}
                                    className="w-full
                                    h-full
                                    object-cover
                                    cursor-zoom-in
                                    transition-transform
                                    duration-500
                                    hover:scale-110r"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Info y Acción */}
                    <div className="min-w-0 flex flex-col">

                        {/* HEADER */}

                        <h1 className="font-heading text-[26px] leading-none tracking-tight text-neutral-900">
                            {product.name}
                        </h1>

                        <p className="mt-2 text-xl font-normal tracking-tight text-neutral-900">
                            € {product.price}
                        </p>

                        {/* ACTIONS */}

                        <div className="mt-5 flex gap-3">

                            <button
                                onClick={handleCheckout}
                                className="
                                    flex-1
                                    h-11
                                    bg-neutral-900
                                    hover:bg-black
                                    text-white
                                    rounded-[4px]
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                "
                            >
                                <MdShoppingCartCheckout size={18} />
                                Comprar
                            </button>

                            <button
                                onClick={handleCart}
                                className="
                                    flex-1
                                    h-11
                                    bg-white
                                    border
                                    border-neutral-300
                                    hover:border-black
                                    hover:bg-neutral-100
                                    rounded-[4px]
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                "
                            >
                                Añadir al carro
                            </button>

                        </div>

                        <div className="mt-3 flex items-center gap-2 text-[12px] text-neutral-500">

                            <ShieldCheck
                                size={14}
                                className="text-neutral-700"
                            />

                            <span>
                                Pago seguro mediante Stripe
                            </span>

                        </div>

                        {/* DESCRIPCIÓN */}

                        <section className="mt-6">

                            <h2 className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 mb-2">
                                Descripción
                            </h2>

                            <p className="text-[14px] leading-6 text-neutral-600">
                                {product.description}
                            </p>

                        </section>

                        {/* DETAILS */}

                        <section className="mt-6 border-t border-neutral-200 pt-4 space-y-3 text-[13px]">

                            <div className="flex justify-between gap-6">

                                <span className="uppercase tracking-[0.18em] text-[10px] text-neutral-400">
                                    Categoría
                                </span>

                                <span className="text-right text-neutral-900 capitalize">
                                    {product.category}
                                </span>

                            </div>

                            <div className="flex justify-between gap-6">

                                <span className="uppercase tracking-[0.18em] text-[10px] text-neutral-400">
                                    Material
                                </span>

                                <span className="text-right text-neutral-900 max-w-[60%]">
                                    Cuero ecológico, algodón y herrajes metálicos.
                                </span>

                            </div>

                            <div className="flex justify-between gap-6">

                                <span className="uppercase tracking-[0.18em] text-[10px] text-neutral-400">
                                    Stock
                                </span>

                                <span
                                    className={`font-medium ${
                                        product.stock > 0
                                            ? "text-green-700"
                                            : "text-red-600"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? `En stock`
                                        : "Agotado"}
                                </span>

                            </div>

                        </section>

                        {/* ENVÍOS */}

                        <section className="mt-5 border-t border-neutral-200 pt-4">

                            <h2 className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 mb-2">
                                Envíos
                            </h2>

                            <p className="text-[13px] leading-6 text-neutral-600">
                                Envíos a toda España. El costo del envío se calcula durante el proceso
                                de compra según el destino seleccionado.
                            </p>

                        </section>

                        {/* INFORMACIÓN */}

                        <section className="mt-5 border-t border-neutral-200 pt-4">

                            <h2 className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 mb-2">
                                Información
                            </h2>

                            <p className="text-[13px] leading-6 text-neutral-600">
                                Cada pieza es confeccionada artesanalmente, por lo que pequeñas
                                variaciones en el color o la textura forman parte de su identidad y
                                hacen único cada producto.
                            </p>

                        </section>

                    </div>
                </div>
            </div>

            {/* Imagen Zoom */}
            <AnimatePresence>

                {zoomOpen && (

                    <motion.div

                        initial={{ opacity:0 }}

                        animate={{ opacity:1 }}

                        exit={{ opacity:0 }}

                        className="
                        fixed
                        inset-0
                        bg-black/90
                        z-[60]
                        flex
                        items-center
                        justify-center
                        "

                        onClick={() => setZoomOpen(false)}
                    >

                        <img

                            src={product.images[currentImage]}

                            className="
                            max-w-[90vw]
                            max-h-[90vh]
                            object-contain
                            "

                        />

                    </motion.div>

                )}

            </AnimatePresence>
        </motion.main>
    );
}