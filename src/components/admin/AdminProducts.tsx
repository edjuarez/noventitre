import { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Image as ImageIcon } from "lucide-react";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';
import type { Product } from '../../types/product';

export const AdminProducts = () => {
  const { products: initialProducts, loading, error, refetch } = useProducts({ mode: 'all' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (initialProducts) {
      setProductsList(initialProducts);
    }
  }, [initialProducts]);

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmed) return;

    try {
      await productService.deleteProduct(id);
      setProductsList((prev) => prev.filter((product) => product.id !== id));
    } catch (err: any) {
      alert(`Error al eliminar el producto: ${err.message}`);
    }
  };

  const handleProductAdded = (newProduct?: Product) => {
    if (newProduct) {
      setProductsList((prev) => [newProduct, ...prev]);
    } else if (refetch) {
      refetch();
    }
  };

  // Nueva función para manejar el toggle de visibilidad
  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      // Aquí idealmente llamas a tu backend:
      // await productService.updateProduct(id, { visible: !currentStatus });
      
      setProductsList((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, visible: !currentStatus } : product
        )
      );
    } catch (err: any) {
      alert(`Error al actualizar la visibilidad: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-sm text-gray-500">Gestiona el inventario y catálogo de la tienda.</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
        />
      </div>

      {loading ? (
        <div className="p-8 text-center bg-white rounded-xl border border-gray-200 text-gray-500">
          Cargando inventario...
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-white rounded-xl border border-red-200 text-red-500">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Imagen del producto */}
              <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.images[0] ? (
                  <img 
                    src={product.images[0]} // Ajusta esto si usas product.images[0]
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImageIcon className="text-gray-300" size={48} />
                )}
                
                {/* Badge de Stock flotante sobre la imagen */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                    product.stock < 5 
                      ? "bg-red-100/90 text-red-800 border border-red-200/50" 
                      : "bg-white/90 text-gray-800 border border-gray-200/50"
                  }`}>
                    {product.stock} un.
                  </span>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div className="pr-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-1" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  
                  {/* Toggle Switch de Visibilidad */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleVisibility(product.id, Boolean(product.visible))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 ${
                        product.visible ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <span className="sr-only">Toggle visibilidad</span>
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          product.visible ? 'translate-x-4.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                      {product.visible ? 'Visible' : 'Oculto'}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-lg font-mono font-medium text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="grid grid-cols-2 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors border-r border-gray-100"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddProductModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}
      {editingProduct && (
        <EditProductModal
          isOpen={Boolean(editingProduct)}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={(updatedProduct) => {
            setProductsList((prev) =>
              prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
          }}
        />
      )}
    </div>
  );
};