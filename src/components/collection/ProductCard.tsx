import { motion } from "framer-motion";
import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="mb-5"
        >
            <button
                onClick={() =>
                    navigate(`/product/${product.slug ? product.slug : product.id}`)
                }
                className="w-full text-left cursor-pointer"
            >
                <div className="overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </button>

            <div className="py-2 flex items-center justify-between gap-4">
                <button
                    onClick={() =>
                        navigate(`/product/${product.slug ? product.slug : product.id}`)
                    }
                    className="min-w-0 text-left cursor-pointer"
                >
                    <h3 className="text-sm font-medium text-neutral-900 line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 capitalize">
                        {product.category}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                        € {product.price}
                    </p>
                </button>

                <a
                    href={`https://wa.me/?text=Hola! Estoy interesado/a en ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Consultar ${product.name} por WhatsApp`}
                    className="
                        flex-shrink-0
                        flex items-center justify-center
                        w-9 h-9
                        rounded-full
                        text-neutral-700
                        transition-all duration-300
                        hover:bg-neutral-100
                        hover:text-[#25D366]
                    "
                >
                    <FaWhatsapp
                        size={20}
                        className="transition-transform duration-300 hover:scale-110"
                    />
                </a>
            </div>
        </motion.div>
    );
}