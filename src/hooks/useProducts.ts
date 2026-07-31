import { useEffect, useState, useRef, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

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
        isMounted.current = false;
      };
    }, []);

  const refetch = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    
    let data: Product[] = [];

    if (mode === 'featured') {
      data = await productService.getFeaturedProducts(limit);
    } else if (mode === 'all') {
      data = await productService.getProducts();
    }

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
    const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Product[] = [];

      if (mode === 'featured') {
        data = await productService.getFeaturedProducts(limit);
      } else if (mode === 'all') {
        data = await productService.getProducts();
      }

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
    }
    loadProducts();
  }, [mode, limit]);

  return { products, loading, error, refetch , setProducts };
}