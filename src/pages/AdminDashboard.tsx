import { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Package, ShoppingCart } from "lucide-react";
import AddProductModal from "../components/admin/AddProductModal";
import EditProductModal from "../components/admin/EditProductModal";
import { AdminOrders } from "../components/admin/AdminOrders"; // <-- Importa tu nuevo componente de órdenes
import { AdminProducts } from "../components/admin/AdminProducts";
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

export const AdminDashboard = () => {
  // Estado para controlar la pestaña activa ('products' | 'orders')
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  // --- Lógica de Productos ---
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

  // Filtrado derivado del estado local activo
  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejo de eliminación (Soft delete + UI update)
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
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      
      {/* Navegación de Pestañas */}
      <div className="flex space-x-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'products'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-50'
          }`}
        >
          <Package size={18} />
          Inventario
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-50'
          }`}
        >
          <ShoppingCart size={18} />
          Pedidos
        </button>
      </div>

      {/* Renderizado Condicional de las Secciones */}
      {activeTab === 'products' ? <AdminProducts /> : <AdminOrders />}
    </div>
  );
};

export default AdminDashboard;