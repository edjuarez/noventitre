import { useEffect, useState, useRef, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

export function useProduct(slug?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

  const loadProduct = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    let data = await productService.getProduct(slug!);

    if (isMounted.current) {
      setProduct(data);
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
  }, [slug])

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return { product, loading, error, refetch: loadProduct , setProduct };
}