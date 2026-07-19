import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // 🛡️ Bandera para evitar actualizar el estado si el componente se desmonta 
    // en medio de la petición asíncrona (evita race conditions)
    let active = true;

    async function loadProducts() {
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
        if (active) {
          setProducts(data);
        }
      } catch (err: unknown) {
        if (active) {
          const errorMessage = err instanceof Error ? err.message : 'Error al cargar los productos';
          setError(errorMessage);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    // 🧹 Limpieza del efecto
    return () => {
      active = false;
    };
  }, [mode, limit]); // Ahora si cambias de modo o de límite, el hook reacciona perfectamente

  return { products, loading, error };
}