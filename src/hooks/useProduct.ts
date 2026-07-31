import { useEffect, useState, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

export function useProduct(slug?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Refetch manual (expuesto para cuando necesites recargar por acción del usuario)
  const refetch = useCallback(async () => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);

    try {
      // ✅ Linter fix: let data -> const data
      const data = await productService.getProduct(slug);
      setProduct(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar el producto';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // 2. Fetch automático al montar el componente o cambiar el slug
  useEffect(() => {
    // Si no hay slug, detenemos la carga inmediatamente
    if (!slug) {
      setLoading(false);
      return;
    }

    // ✅ Linter fix: Usamos una variable local en lugar de useRef para rastrear el montaje.
    // Esto es más seguro con el StrictMode de React.
    let isMounted = true;

    const fetchProduct = async () => {
      // Al estar dentro de una función async, React ya no lo considera un "setState síncrono bloqueante"
      if (isMounted) setLoading(true);
      
      try {
        const data = await productService.getProduct(slug);
        if (isMounted) {
          setProduct(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error al cargar el producto';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { product, loading, error, refetch, setProduct };
}