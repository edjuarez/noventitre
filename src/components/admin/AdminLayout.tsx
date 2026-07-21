import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase'; // Ajusta según tu ruta

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Obtener la sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchar cambios de estado en tiempo real (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Spinner mientras se verifica la sesión en Supabase
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-crema">
        <p className="text-neutral-500 font-medium animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  // Redirección si no hay usuario autenticado
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión válida, mostramos el panel de admin con la barra superior
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-neutral-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-heading font-bold text-xl">NOVENTITRE</span>
          <span className="bg-neutral-800 text-xs text-neutral-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-neutral-400">{session.user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md border border-neutral-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="flex-grow p-6 max-w-[1600px] w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}