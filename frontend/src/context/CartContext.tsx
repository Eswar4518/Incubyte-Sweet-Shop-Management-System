import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sweet } from '../api/sweetsApi';

export interface CartItem extends Sweet {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: string) => void;
  updateQuantity: (sweetId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (sweet: Sweet, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item._id === sweet._id);
      if (existing) {
        return prev.map(item =>
          item._id === sweet._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...sweet, quantity }];
    });
  };

  const removeFromCart = (sweetId: string) => {
    setItems(prev => prev.filter(item => item._id !== sweetId));
  };

  const updateQuantity = (sweetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item._id === sweetId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};