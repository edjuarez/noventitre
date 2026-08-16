import { motion } from "framer-motion";
import type { Product } from "../../types/product";
import { useNavigate } from 'react-router-dom';



export default function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();
    return(
        <motion.button
            key={product.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/product/${product.slug ? product.slug : product.id}`)}
            className="text-left cursor-pointer mb-5"
        >
            <div className="text-sm overflow-hidden">

            <img
                src={product.images[0]}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-105"
            />
            </div>
            <div className="py-2 h-15 flex flex-col">
            <h3 className="text-sm">
                {product.name}
            </h3>
            <p className="text-xs text-neutral-600 capitalize">
                {product.category}
            </p>
            <p className="mt-1 text-sm">
                € {product.price}
            </p>
            </div>
        </motion.button>
    )
}