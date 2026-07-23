import {useProduct} from '../hooks/useProduct';
import { useParams } from "react-router-dom";
//import type { Product } from "../types/product";


export default function ProductDetailScreen() {
    const { slug } = useParams();
    const {product, loading, error} = useProduct(slug);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return(
        <h1>{product.name}</h1>

    )
}