//import React, { useState, createContext, useContext, useMemo } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import {useCart} from '../context/CartContext';
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Package, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    
    if (cartItems.length === 0) return;

    // TRANSFORMACIÓN CLAVE: 
    // Recorremos todos los items del carrito y les inyectamos "quantity: 1"
    // para que Stripe esté contento.
    const itemsForCheckout = cartItems.map(item => ({
      ...item,
      quantity: 1
    }));

    navigate("/checkout", {
      state: {
        items: itemsForCheckout,
        // Ya no necesitas pasar 'total' ni 'quantity' sueltos por aquí
      }
    });
  };
return (
  <>
    {/* Overlay */}

    <div
      className={`fixed inset-0 bg-black/35 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
        isCartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeCart}
    />

    {/* Drawer */}

    <aside
      className={`fixed inset-y-0 right-0 z-100 w-full md:w-[470px] bg-brand-crema shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER */}

      <div className="px-8 pt-8 pb-6">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="font-heading text-4xl tracking-tight">
              Tu pedido
            </h2>

          </div>

          <button
            onClick={closeCart}
            className="text-neutral-500 hover:text-black transition cursor-pointer"
          >
            <X size={24} />
          </button>

        </div>

        <div className="relative mt-6">

          <div className="h-px bg-neutral-200" />

          <div className="absolute top-0 left-0 h-px w-16 bg-brand-rosa" />

        </div>

      </div>

      {/* ITEMS */}

      <div className="flex-1 overflow-y-auto px-4 pb-2">

        {cartItems.length === 0 ? (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <ShoppingBag
              size={54}
              strokeWidth={1.2}
              className="text-neutral-400"
            />

            <h3 className="mt-6 font-heading text-3xl">
              Tu carrito está vacío
            </h3>

            <p className="mt-3 text-sm text-neutral-500 max-w-xs leading-6">
              Descubrí piezas confeccionadas artesanalmente para acompañarte todos los días.
            </p>

            <button
              onClick={() => {
                closeCart();
                navigate("/catalogo");
              }}
              className="mt-8 border border-neutral-300 px-8 py-3 rounded-sm hover:bg-white transition"
            >
              Ver colección
            </button>

          </div>

        ) : (

          cartItems.map((item) => (

            <article
              key={item.id}
               className="p-4"
               /* className="bg-white border border-neutral-200 p-4 rounded-sm" */
            >
              <div className="flex gap-4">

                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-28 h-32 object-cover"
                />

                <div className="flex flex-col flex-1">

                  <div className="flex justify-between">

                    <div>

                      <h3 className="text-[17px] font-medium leading-tight">
                        {item.name}
                      </h3>

{/*                       <p className="mt-1 text-xs uppercase tracking-[.18em] text-neutral-400">
                        Artesanal
                      </p> */}

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <div className="mt-auto">

                    <div className="flex justify-between items-end">
{/* 
                      <span className="text-sm text-neutral-500">
                        Cantidad: {item.quantity}
                      </span> */}

                      <span className="text-xl font-medium tracking-tight">
                        €{item.price}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </article>

          ))

        )}

      </div>

      {/* FOOTER */}

      {cartItems.length > 0 && (

        <div className="bg-stone-50 border-t border-brand-rosa/20 px-8 pb-3 md:pb-7 pt-3">

          <div className="flex justify-between items-center">
              <p className="text-sm uppercase tracking-[.18em] text-neutral-400">
                Total
              </p>

              <p className="text-2xl mt-1 text-neutral-700">
                €{cartTotal}
              </p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-neutral-500">

            <div className="flex items-center gap-2">

              <ShieldCheck size={15} className="text-brand-rosa" />

              Pago seguro mediante Stripe

            </div>

            <div className="flex items-center gap-2">

              <Package size={15} className="text-brand-rosa" />

              Envíos a toda España

            </div>

            <div className="flex items-center gap-2">

              <Sparkles size={15} className="text-brand-rosa" />

              Productos confeccionados artesanalmente

            </div>

          </div>

          <button
            onClick={handleCheckout}
            className="
              mt-7
              w-full
              h-12
              bg-neutral-900
              hover:bg-brand-rosa
              text-white
              rounded-sm
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
              group
              cursor-pointer
            "
          >
            Finalizar compra

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />

          </button>

        </div>

      )}

    </aside>

  </>
);
};