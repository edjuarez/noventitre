import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const from = location.state?.from?.pathname;

  const handleRoleRedirect = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profile?.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate(from || '/', { replace: true });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        if (data.user) {
          await handleRoleRedirect(data.user.id);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });

        if (error) throw error;

        // Si la confirmación de email está desactivada en Supabase, inicia sesión automáticamente
        if (data.user) {
          await handleRoleRedirect(data.user.id);
        } else {
          setErrorMsg('Registro exitoso. Revisa tu email para confirmar la cuenta.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/cuenta`,
      },
    });

    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="min-h-screen bg-brand-crema flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-100 bg-white p-8 shadow-xl">
        <button
          className="flex justify-center w-full"
          onClick={() => navigate("/")}>
          <h1 className="cursor-pointer font-heading text-3xl font-bold text-center text-neutral-900 mb-1">
            NOVENTITRE
          </h1>
        </button>

        <p className="text-sm text-neutral-500 text-center mb-6">
          {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </p>

        {/* Botón Google */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continuar con Google
        </button>

        <div className="relative my-6 text-center text-xs uppercase tracking-wider text-neutral-400">
          <span className="bg-white px-2">o con email</span>
          <div className="absolute inset-0 top-1/2 -z-10 border-t border-neutral-200" />
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. María García"
                className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
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
              placeholder="••••••••"
              className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500">
          {mode === 'login' ? (
            <p>
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(null); }}
                className="font-semibold text-neutral-900 underline"
              >
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); }}
                className="font-semibold text-neutral-900 underline"
              >
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}