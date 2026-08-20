import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import type {ReactNode} from 'react';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  stock?: number; // Agregado como opcional por si decides verificarlo
  // quantity: number; -> Lo comentamos ya que indicaste que por ahora no manejas cantidades
}

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  // updateQuantity: (productId: string, amount: number) => void; -> Removido temporalmente
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("noventitre-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

/*   const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }); */

  useEffect(() => {
    localStorage.setItem("noventitre-cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product: CartItem) => {
    // 1. (OPCIONAL) Verificar el stock antes de hacer cualquier cosa
    /*
    if (product.stock !== undefined && product.stock <= 0) {
      console.warn("No se puede agregar: Producto sin stock");
      return; 
    }
    */

    setCartItems((prevItems) => {
      const itemExists = prevItems.some((item) => item.id === product.id);
      console.log(cartItems, "cartItems")
      if (itemExists) {
        console.log("El producto ya existe en el carrito. Ignorando.");
        // CRÍTICO: Si existe, DEBEMOS retornar el array previo intacto. 
        return prevItems; 
      }

      return [...prevItems, product];
    });
    
    // Abrimos el carrito automáticamente al agregar algo
    openCart(); 
  };

  // Eliminar por completo un producto del carrito
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular totales (Simplificado ya que no hay cantidades)
  const cartTotal = useMemo(() => {
    // Simplemente sumamos los precios de todos los items en el array
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    // La cantidad es simplemente el número de items en el array
    return cartItems.length;
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        toggleCart,
        closeCart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}