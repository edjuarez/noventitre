import { ShieldCheck } from "lucide-react";

interface CheckoutItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
}

interface OrderSummaryProps {
    items: CheckoutItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <aside className="sticky top-5">

            <div className="bg-white border border-neutral-200 rounded-lg p-8">

                {/* Logo */}

                <div className="flex justify-center mb-10">

                    <img
                        src="/assets/logo.webp"
                        alt="Noventitre"
                        className="w-36 object-contain"
                    />

                </div>

                {/* Header */}

                <div className="mb-8">

                    <h2 className="uppercase tracking-[0.25em] text-xs text-neutral-500">
                        Resumen del pedido
                    </h2>

                </div>

                {/* Productos */}

                <div className="space-y-6">

                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="flex gap-4"
                        >

                            {/* Imagen */}

                            <div className="w-24 h-28 overflow-hidden rounded-md bg-neutral-100 flex-shrink-0">

                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            {/* Info */}

                            <div className="flex flex-col flex-1">

                                <h3 className="font-medium leading-tight">
                                    {item.name}
                                </h3>

                                <p className="mt-2 text-sm text-neutral-500">
                                    Cantidad: {item.quantity}
                                </p>

                                <p className="mt-auto font-medium">
                                    € {(item.price * item.quantity).toFixed(2)}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Totales */}

                <div className="mt-10 border-t border-neutral-200 pt-8 space-y-5">

                    <div className="flex justify-between text-neutral-700">

                        <span>Subtotal</span>

                        <span>
                            € {subtotal.toFixed(2)}
                        </span>

                    </div>

                    <div className="flex justify-between text-neutral-500">

                        <span>Envío</span>

                        <span className="text-right text-sm">
                            Calculado al finalizar la compra
                        </span>

                    </div>

                    <div className="border-t border-neutral-200 pt-5 flex justify-between text-lg font-semibold">

                        <span>Total</span>

                        <span>
                            € {subtotal.toFixed(2)}
                        </span>

                    </div>

                </div>

                {/* Info */}

                <div className="mt-10 border-t border-neutral-200 pt-8 space-y-4">

                    <div className="flex items-center gap-3 text-sm text-neutral-600">

                        <ShieldCheck
                            size={18}
                            className="text-neutral-800"
                        />

                        <span>
                            Pago seguro mediante Stripe
                        </span>

                    </div>

                    <p className="text-sm leading-6 text-neutral-500">

                        Todos los pagos son procesados de forma segura mediante
                        Stripe. No almacenamos información de tarjetas de crédito.

                    </p>

                </div>

            </div>

        </aside>
    );
}