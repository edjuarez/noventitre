import { useState } from 'react';
import { uploadProductImages, createProduct } from '../../services/productService';
import type {ProductInput} from '../../services/productService';
import type {ChangeEvent, FormEvent} from 'react';
import type { Product } from '../../services/productService';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (newProduct?: Product) => void;
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'bolsos',
    stock: '5',
    featured: false,
    visible: true,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...filesArray]);

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setErrorMsg('Debes adjuntar al menos una imagen para el producto.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      // 1. Subir imágenes al Storage de Supabase
      const imageUrls = await uploadProductImages(selectedFiles);

      // 2. Preparar el payload con los tipos correctos
      const newProduct: ProductInput = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock, 10),
        featured: formData.featured,
        visible: formData.visible,
        images: imageUrls,
      };

      // 3. Crear registro en PostgreSQL
      const createdProduct = await createProduct(newProduct);

      // 4. Notificar al dashboard y cerrar
      onProductAdded(createdProduct);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 border border-neutral-100">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Agregar Nuevo Producto
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-neutral-400 hover:text-black font-bold p-1 rounded-lg transition-colors"
          >
            ✕
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
              placeholder="Ej: Bolso Tote Cuero Negro"
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
                placeholder="45000"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
              >
                <option value="bolsos">Bolsos</option>
                <option value="accesorios">Accesorios</option>
                <option value="mochilas">Mochilas</option>
                <option value="billeteras">Billeteras</option>
              </select>
            </div>
          </div>

          {/* Stock y Banderas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                Stock Inicial
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
            <div className="flex items-center space-x-6 pt-2 sm:pt-6">
              <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-neutral-300 text-black focus:ring-black w-4 h-4"
                />
                <span className="font-medium text-neutral-700">Producto Destacado</span>
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
              placeholder="Detalles sobre materiales, dimensiones, cuidados..."
            />
          </div>

          {/* Subida de Imágenes */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
              Imágenes del Producto
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800 cursor-pointer"
            />

            {/* Galería de Previews */}
            {previews.length > 0 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
                {previews.map((src, index) => (
                  <div key={index} className="relative w-20 h-20 flex-shrink-0 group">
                    <img
                      src={src}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg border border-neutral-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Subiendo e Insertando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}