import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // O '../lib/supabase' según el nombre de tu archivo

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Guarda la ruta de la que venía el usuario si intentó acceder a una página protegida
  const from = location.state?.from?.pathname;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // 1. Iniciar sesión en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.log('Error de autenticación:', authError.message);
      setErrorMsg('Credenciales inválidas. Revisa tu email y contraseña.');
      setLoading(false);
      return;
    }

    // 2. Si el login es exitoso, verificar el rol en la tabla profiles
    if (authData.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Error al obtener el perfil:', profileError.message);
      }

      setLoading(false);

      // 3. Redirección condicional según el rol
      if (profile?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        // Redirige a la página que intentaba visitar o al inicio por defecto
        navigate(from || '/', { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-crema flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-neutral-100">
        <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-2 text-center">
          NOVENTITRE
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-8">
          Iniciar Sesión
        </p>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white font-medium py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}