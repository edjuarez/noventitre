import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: 'paid' | 'shipped' | 'delivered';
  shipping_address: {
    name?: string;
    address?: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  } | null;
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando órdenes:', error);
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  }

  async function updateOrderStatus(orderId: string, newStatus: Order['status']) {
    try {
      setUpdatingId(orderId);

      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Actualizar el estado local solo tras confirmación exitosa de la BD
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      alert('Hubo un error al actualizar el estado en la base de datos');
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <div className="p-8 text-gray-500 font-mono text-sm">Cargando pedidos...</div>;
  }

  return (
    <div className="bg-white text-black p-6 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-tighter">Gestión de Pedidos</h2>
        <span className="bg-black text-white px-3 py-1 text-xs font-mono font-bold">
          {orders.length} TOTAL
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="p-3 text-sm uppercase tracking-wider font-bold">ID / Fecha</th>
              <th className="p-3 text-sm uppercase tracking-wider font-bold">Cliente</th>
              <th className="p-3 text-sm uppercase tracking-wider font-bold">Total</th>
              <th className="p-3 text-sm uppercase tracking-wider font-bold">Estado</th>
              <th className="p-3 text-sm uppercase tracking-wider font-bold text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 font-mono">
                  No hay pedidos registrados todavía.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isUpdating = updatingId === order.id;

                return (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="font-mono text-xs font-bold">{order.id.split('-')[0]}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-sm">{order.customer_name}</div>
                      <div className="text-xs text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="p-3 font-mono font-bold">
                      ${order.total_amount.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-bold uppercase border ${
                          order.status === 'paid'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800 border-blue-800'
                            : 'bg-green-100 text-green-800 border-green-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        disabled={isUpdating}
                        className="text-xs font-mono border border-black px-2 py-1 bg-white cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as Order['status'])
                        }
                      >
                        <option value="paid">PAID (Pendiente)</option>
                        <option value="shipped">SHIPPED (Enviado)</option>
                        <option value="delivered">DELIVERED (Entregado)</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}