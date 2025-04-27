import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  const addToCart = (newItem) => {
    const existingItem = cart.find(item => item.id === newItem.id && item.size === newItem.size);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === newItem.id && item.size === newItem.size
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      ));
    } else {
      setCart([...cart, newItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
