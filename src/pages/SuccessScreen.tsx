import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SuccessScreen() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId]);

  return (
    <div className="max-w-md mx-auto my-12 p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">¡Gracias por tu compra!</h1>
      <p className="mt-2 text-gray-600">Hemos recibido tu pedido correctamente.</p>
      {sessionId && (
        <p className="mt-1 text-xs text-gray-400 font-mono">ID de sesión: {sessionId}</p>
      )}
      <Link to="/" className="mt-6 inline-block bg-black text-white px-4 py-2 rounded">
        Volver a la tienda
      </Link>
    </div>
  );
}