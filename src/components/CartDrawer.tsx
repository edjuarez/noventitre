import React, { useState, createContext, useContext, useMemo } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import {useCart} from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartTotal } = useCart();
  console.log(isCartOpen)
  return (
    <>
      {/* Fondo oscuro (Overlay) - Al hacer clic cierra el carrito */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* El panel del carrito que se desliza */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-[#fcfaf7] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del carrito */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 font-[League Gothic]">
            Tu Pedido
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de productos (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-gray-900">{item.name}</h3>
                      {/* <p className="text-sm text-gray-500">{item.color}</p> */}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    {/* Controles de cantidad */}
                    <div className="flex items-center">
{/*                       <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button> */}
                       <span className="text-lg">€{item.price}</span>
                    </div>
                    {/* <span className="text-lg">€{item.price}</span> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer del carrito (Total y Checkout) */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold">€{cartTotal}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Los gastos de envío se calculan en el siguiente paso.
            </p>
            <button className="w-full bg-black text-white py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#ff69b4] transition-colors flex items-center justify-center gap-2 group">
              Finalizar Compra
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};