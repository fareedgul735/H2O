import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const increaseCart = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cartons: item.cartons + 1 } : item,
      ),
    );
  };

  const decreaseCart = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (item.cartons <= item.minCarton) {
          return item; 
        }

        return {
          ...item,
          cartons: item.cartons - 1,
        };
      }),
    );
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartons: item.cartons + product.minCarton,
              }
            : item,
        );
      }

      return [...prev, product];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        isCartOpen,
        setIsCartOpen,
        increaseCart,
        decreaseCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
