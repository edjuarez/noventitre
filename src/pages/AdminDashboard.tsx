import { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2 } from "lucide-react";
import AddProductModal from "../components/admin/AddProductModal";
import EditProductModal from "../components/admin/EditProductModal";
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';

export const AdminDashboard = () => {
  const { products: initialProducts, loading, error, refetch } = useProducts({ mode: 'all' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // 2. Estado local para actualizaciones instantáneas en UI (optimistas)
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (initialProducts) {
      setProductsList(initialProducts);
    }
  }, [initialProducts]);

  // 4. Filtrado derivado del estado local activo
  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 5. Manejo de eliminación (Soft delete + UI update)
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

  return (
    <div className="space-y-6">
      {/* Encabezado local y acciones principales */}
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

      {/* Barra de herramientas: Búsqueda */}
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

      {/* Tabla de Productos */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando inventario...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 font-mono">${product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 5 ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-black transition-colors"
                    onClick={() => setEditingProduct(product)}>
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

        {/* Modal de Alta */}
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
            // Reemplaza sólo el producto modificado en el array activo
            setProductsList((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            }}
        />
        )}
    </div>
  );
};

export default AdminDashboard;