import { supabase } from '../lib/supabase';

// Tipo unificado de TypeScript para toda la aplicación
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  featured: boolean;
  visible: boolean;
  created_at: string;
}

export const productService = {
  /**
   * Obtiene únicamente los productos destacados (featured = true) y visibles para el Home.
   */
  async getFeaturedProducts(limit: number = 9): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`[getFeaturedProducts]: ${error.message}`);
    return data || [];
  },

  /**
   * Obtiene todos los productos disponibles y visibles para la página Colección.
   */
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`[getProducts]: ${error.message}`);
    return data || [];
  },

  /**
   * Obtiene un único producto mediante su ID único.
   */
  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('visible', true)
      .single();

    if (error) throw new Error(`[getProduct]: ${error.message}`);
    return data;
  },

  /**
   * Realiza búsquedas predictivas por nombre o descripción.
   */
  async searchProducts(search: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .or(`name.ilike.%${search}%,description.ilike.%${search}%`)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`[searchProducts]: ${error.message}`);
    return data || [];
  },

  /**
   * Filtra el catálogo por categorías de diseño.
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`[getProductsByCategory]: ${error.message}`);
    return data || [];
  },

  /**
   * Operación de Escritura: Crea un producto (Exclusivo del Panel de Administración).
   */
  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw new Error(`[createProduct]: ${error.message}`);
    return data;
  },

  /**
   * Operación de Modificación: Actualiza parcialmente un producto (Exclusivo del Panel).
   */
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`[updateProduct]: ${error.message}`);
    return data;
  },

  /**
   * Borrado Lógico (Soft Delete): Cambia la visibilidad a falso sin destruir registros transaccionales.
   */
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ visible: false })
      .eq('id', id);

    if (error) throw new Error(`[deleteProduct]: ${error.message}`);
  }
};