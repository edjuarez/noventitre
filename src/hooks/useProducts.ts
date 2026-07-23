import { useEffect, useState, useRef, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';

interface UseProductsOptions {
  mode: 'featured' | 'all';
  limit?: number;
}

export function useProducts({ mode, limit }: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
      isMounted.current = true;
      return () => {
        // Al desmontar el componente (ej. cambiar de página), marcamos como false
        isMounted.current = false;
      };
    }, []);

  const loadProducts = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    
    let data: Product[] = [];

    if (mode === 'featured') {
      data = await productService.getFeaturedProducts(limit);
    } else if (mode === 'all') {
      data = await productService.getProducts();
    }

    // Solo actualizamos el estado si el efecto sigue "activo"
    if (isMounted.current) {
      setProducts(data);
    }
  } catch (err: unknown) {
    if (isMounted.current) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los productos';
      setError(errorMessage);
    }
  } finally {
    if (isMounted.current) {
      setLoading(false);
    }
  }
  }, [mode, limit])

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refetch: loadProducts , setProducts };
}