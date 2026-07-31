import { useState } from "react";
import { Package, ShoppingCart } from "lucide-react";
import { AdminOrders } from "../components/admin/AdminOrders"; // <-- Importa tu nuevo componente de órdenes
import { AdminProducts } from "../components/admin/AdminProducts";

export const AdminDashboard = () => {
  // Estado para controlar la pestaña activa ('products' | 'orders')
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');


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