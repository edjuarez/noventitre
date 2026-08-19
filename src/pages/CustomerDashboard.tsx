import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type TabType = 'pedidos' | 'perfil' | 'direcciones';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  items_summary?: string;
}

export default function CustomerDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('pedidos');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Estado del formulario de perfil
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (user) {
      loadProfileData();
      loadOrders();
    }
  }, [user]);

  const loadProfileData = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', user?.id)
      .single();
console.log('Datos del perfil cargados:', data);
    if (data) {
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
    }
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user?.email)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setLoadingOrders(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage(null);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id);

    setSavingProfile(false);
    if (error) {
      setMessage({ text: 'Error al actualizar datos.', type: 'error' });
    } else {
      setMessage({ text: 'Datos actualizados correctamente.', type: 'success' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'Pendiente',
      processing: 'En preparación',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-brand-crema py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-brand-crema py-17 md:py-30 md:px-6 px-3 mb-[var(--section-mb-mobile)] md:mb-[var(--section-mb-desktop)]">
        
        {/* Cabecera del Perfil */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 font-heading">
              Hola, {fullName || user?.email?.split('@')[0]}
            </h1>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition"
              >
                Ir al Panel Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-semibold text-red-600 border border-red-200 bg-red-50/50 rounded-lg hover:bg-red-100 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-neutral-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'pedidos'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Mis Compras ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'perfil'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Mis Datos
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60">
          
          {/* TAB 1: HISTORIAL DE COMPRAS */}
          {activeTab === 'pedidos' && (
            <div>
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Historial de Pedidos</h2>
              
              {loadingOrders ? (
                <p className="text-sm text-neutral-500 py-4">Cargando tus compras...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-neutral-500 mb-4">Aún no has realizado ninguna compra.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition"
                  >
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-neutral-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-neutral-300 transition"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-xs text-neutral-400">
                            #{order.id.slice(0, 8)}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {new Date(order.created_at).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        {order.items_summary && (
                          <p className="text-xs font-medium text-neutral-700 mt-1">
                            {order.items_summary}
                          </p>
                        )}
                      </div>

                      <div className="text-right flex sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end">
                        <span className="text-base font-bold text-neutral-900">
                          ${order.total_amount.toLocaleString()}
                        </span>
                        {order.tracking_number && (
                          <span className="text-xs text-neutral-500 mt-1">
                            Seguimiento: <span className="font-mono font-bold">{order.tracking_number}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DATOS PERSONALES */}
          {activeTab === 'perfil' && (
            <div>
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Información Personal</h2>

              {message && (
                <div
                  className={`p-3 rounded-lg text-xs mb-4 ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
                    Email (no modificable)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-100 p-2.5 text-sm text-neutral-500 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 ..."
                    className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition"
                >
                  {savingProfile ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}