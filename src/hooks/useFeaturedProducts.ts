import { useState, useEffect } from "react";
import { productService } from "../services/productService";
import type { Product } from '../types/product';

export function useFeaturedProducts(limit = 9) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeaturedProducts(limit)
      .then(setProducts)
      .catch((err) => console.error("Error en Home:", err))
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading };
}