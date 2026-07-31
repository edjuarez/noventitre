import { supabase } from '../lib/supabase';
import type { Product } from "../types/product";

export type ProductInput = Omit<Product, 'id' | 'created_at'>;

/**
 * Sube una lista de archivos File al Storage de Supabase y retorna las URLs públicas.
 */
export const uploadProductImages = async (files: File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `items/${fileName}`;
    const BUCKET_NAME = 'product-images';

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`[uploadProductImages]: ${uploadError.message}`);
    }

    // Obtener la URL pública del archivo subido
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return data.publicUrl;
  });

  return Promise.all(uploadPromises);
};

/**
 * Operación de Escritura: Crea un producto en la base de datos.
 */
export const createProduct = async (product: ProductInput): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(`[createProduct]: ${error.message}`);
  return data;
};

// Servicio unificado exportado por defecto/objeto
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
  async getProduct(value: string): Promise<Product | null> {
    const slugResult = await supabase
      .from('products')
      .select('*')
      .eq('slug', value)
      .eq('visible', true)
      .maybeSingle();

    if (slugResult.error) throw new Error(`[getProduct]: ${slugResult.error.message}`);
    if (slugResult.data) {
      return slugResult.data;
    }

    const idResult = await supabase
      .from('products')
      .select('*')
      .eq('id', value)
      .eq('visible', true)
      .single();
      if (idResult.error) throw idResult.error;
      return idResult.data;
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

  createProduct,
  uploadProductImages,


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