import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  redirectTo?: string;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ 
  redirectTo = '/login', 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  // 1. Pantalla de carga mientras Supabase verifica sesión y perfil
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-crema text-black">
        <span className="text-sm font-medium">Verificando sesión...</span>
      </div>
    );
  }

  // 2. Si no hay usuario autenticado
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. Si la ruta requiere admin y el usuario no lo es
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 4. Si pasa todas las validaciones, renderizar el contenido
  return <Outlet />;
};