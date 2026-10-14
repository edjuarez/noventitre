import { useEffect, useState, useRef, useCallback } from 'react';
import type { RefObject } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

type ProductMode = 'featured' | 'all' | 'admin';

interface UseProductsOptions {
  mode: ProductMode;
  limit?: number;
}

interface LoadHandlers {
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  isMounted: RefObject<boolean>;
}

async function runLoad(
  mode: ProductMode,
  limit: number | undefined,
  { setProducts, setLoading, setError, isMounted }: LoadHandlers
) {
  setLoading(true);
  setError(null);

  try {
    let data: Product[] | null = null;

    if (mode === 'featured') {
      data = await productService.getFeaturedProducts(limit);
    } else if (mode === 'all') {
      data = await productService.getProducts();
    } else if (mode === 'admin') {
      data = await productService.getAdminProducts();
    } else {
      throw new Error(`[useProducts]: modo "${mode}" no soportado`);
    }

    if (data === null) {
      throw new Error(`[useProducts]: la consulta no devolvió datos`);
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

  useEffect(() => {
    void runLoad(mode, limit, { setProducts, setLoading, setError, isMounted });
  }, [mode, limit]);

  const refetch = useCallback(
    () => runLoad(mode, limit, { setProducts, setLoading, setError, isMounted }),
    [mode, limit]
  );

  return { products, loading, error, refetch, setProducts };
}
