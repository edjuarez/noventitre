import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Datos pasados desde ProductDetailScreen
    const { productName, price } = location.state || {};

    useEffect(() => {
        // Si no hay datos (ej. recargó la página directamente), redirigimos al catálogo
        if (!productName || !price) {
            navigate("/", { replace: true });
            return;
        }

        const initCheckoutSession = async () => {
            try {
                const { data, error } = await supabase.functions.invoke("create-checkout-session", {
                    body: { productName, price },
                });

                if (error) throw error;
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            } catch (err: any) {
                console.error("Error al iniciar el checkout:", err);
                setError("No se pudo cargar la pasarela de pago.");
            } finally {
                setLoading(false);
            }
        };

        initCheckoutSession();
    }, [productName, price, navigate]);

    return (
        <main className="min-h-screen bg-brand-crema pt-28 pb-16 px-5 md:px-12">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 text-sm hover:opacity-60 transition cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Volver al producto
                </button>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="animate-spin text-neutral-600" size={32} />
                        <p className="text-sm text-neutral-500">Cargando pasarela de pago segura...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center">
                        <p>{error}</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-4 underline text-sm cursor-pointer"
                        >
                            Regresar
                        </button>
                    </div>
                )}

                {clientSecret && (
                    <div id="checkout" className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={{ clientSecret }}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    </div>
                )}
            </div>
        </main>
    );
}