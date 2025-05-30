import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItem: CartItem | null;
  addToCart: (
    product: Product, 
    quantity: number, 
    variantName: string, 
    variantValue: string
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const addToCart = (
    product: Product, 
    quantity: number, 
    variantName: string, 
    variantValue: string
  ) => {
    const newItem: CartItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      selectedVariant: {
        name: variantName,
        value: variantValue
      }
    };
    
    setCartItem(newItem);
  };

  const clearCart = () => {
    setCartItem(null);
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};