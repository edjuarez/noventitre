import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { X, Upload } from 'lucide-react';
import { productService, uploadProductImages } from '../../services/productService';
import type { Product } from '../../types/product';

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

export const EditProductModal = ({
  isOpen,
  product,
  onClose,
  onProductUpdated,
}: EditProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Lista de categorías por defecto
  const defaultCategories = ['bolsos', 'accesorios', 'mochilas', 'billeteras', 'ropa'];

  // 2. Estado para saber si estamos usando una categoría manual
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price ? product.price.toString() : '0',
    category: product?.category || 'bolsos',
    stock: product?.stock !== undefined ? product.stock.toString() : '0',
    featured: Boolean(product?.featured),
    visible: product?.visible !== undefined ? Boolean(product.visible) : true,
  });

  // Fotos que ya están subidas en Supabase Storage
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Archivos de fotos nuevas agregadas desde la compu
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // Pre-poblar los campos cada vez que se selecciona un producto distinto
  useEffect(() => {
    if (product) {
      setExistingImages(product.images || []);
      setNewFiles([]);
      setNewPreviews([]);
      setErrorMsg(null);

      const currentCategory = product.category?.toLowerCase() || 'bolsos';
      
      // 3. Si la categoría del producto NO está en las opciones por defecto, activamos el input manual
      setIsCustomCategory(!defaultCategories.includes(currentCategory));

      // 4. Actualizamos el form data para asegurarnos de que cargue el producto correcto si el modal no se desmonta
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price ? product.price.toString() : '0',
        category: product.category || 'bolsos',
        stock: product.stock !== undefined ? product.stock.toString() : '0',
        featured: Boolean(product.featured),
        visible: product.visible !== undefined ? Boolean(product.visible) : true,
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...filesArray]);

    // Blob local para preview inmediato
    const newBlobUrls = filesArray.map((file) => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...newBlobUrls]);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (existingImages.length === 0 && newFiles.length === 0) {
      setErrorMsg('El producto debe conservar o incluir al menos una imagen.');
      return;
    }

    // Validación de categoría manual vacía
    if (isCustomCategory && !formData.category.trim()) {
      setErrorMsg('Debes escribir un nombre para la categoría.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      let uploadedUrls: string[] = [];
      if (newFiles.length > 0) {
        uploadedUrls = await uploadProductImages(newFiles);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      // 5. Nos aseguramos de limpiar y guardar en minúsculas la categoría
      const updates: Partial<Product> = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category.toLowerCase().trim(),
        stock: parseInt(formData.stock, 10),
        featured: formData.featured,
        visible: formData.visible,
        images: finalImages,
      };

      const updatedProduct = await productService.updateProduct(product.id, updates);

      onProductUpdated(updatedProduct);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Error al actualizar el producto');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 border border-neutral-100">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Editar Producto
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">ID: {product.id}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-neutral-400 hover:text-black font-bold p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm p-3.5 rounded-xl mb-5 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
              Nombre del Producto
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Precio y Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                Precio ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            
            {/* 6. Selector de Categoría (Idéntico al de Crear Producto) */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                Categoría
              </label>
              {isCustomCategory ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
                    placeholder="Escribe la categoría..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(false);
                      setFormData({ ...formData, category: defaultCategories[0] });
                    }}
                    className="px-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
                    title="Volver a la lista"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <select
                  value={defaultCategories.includes(formData.category.toLowerCase()) ? formData.category.toLowerCase() : 'ADD_NEW'}
                  onChange={(e) => {
                    if (e.target.value === 'ADD_NEW') {
                      setIsCustomCategory(true);
                      setFormData({ ...formData, category: '' });
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none bg-white cursor-pointer"
                >
                  {defaultCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                  <option disabled>──────────</option>
                  <option value="ADD_NEW" className="font-bold text-black">
                    + Añadir nueva...
                  </option>
                </select>
              )}
            </div>
          </div>

          {/* Stock, Destacado y Visibilidad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                Stock
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2 sm:pt-6">
              <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-neutral-300 text-black focus:ring-black w-4 h-4 cursor-pointer"
                />
                <span className="font-medium text-neutral-700">Destacado</span>
              </label>
            </div>

            <div className="flex items-center space-x-2 pt-2 sm:pt-6">
              <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="rounded border-neutral-300 text-black focus:ring-black w-4 h-4 cursor-pointer"
                />
                <span className="font-medium text-neutral-700">Visible</span>
              </label>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
              Descripción
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Galería de Imágenes */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
              Imágenes del Producto
            </label>

            <div className="flex gap-3 overflow-x-auto pb-3 mb-3">
              {/* Fotos ya guardadas en Supabase */}
              {existingImages.map((src, index) => (
                <div key={`existing-${index}`} className="relative w-20 h-20 flex-shrink-0 group">
                  <img
                    src={src}
                    alt="Guardada"
                    className="w-full h-full object-cover rounded-lg border border-neutral-200"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1 rounded">
                    Guardada
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow hover:bg-red-700 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Previews de fotos recién seleccionadas */}
              {newPreviews.map((src, index) => (
                <div key={`new-${index}`} className="relative w-20 h-20 flex-shrink-0 group">
                  <img
                    src={src}
                    alt="Nueva"
                    className="w-full h-full object-cover rounded-lg border-2 border-emerald-500"
                  />
                  <span className="absolute bottom-1 left-1 bg-emerald-700 text-white text-[9px] px-1 rounded">
                    Nueva
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow hover:bg-red-700 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input para agregar más fotos */}
            <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-neutral-300 rounded-lg text-xs font-semibold text-neutral-600 hover:border-black cursor-pointer transition-colors">
              <Upload size={16} />
              <span>Añadir más imágenes</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Guardando Cambios...' : 'Actualizar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;