import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

const normalizeProduct = (product) => {
  const id = product?.id ?? product?._id ?? product?.slug ?? product?.name ?? "item";

  return {
    id,
    _id: product?._id ?? id,
    slug: product?.slug ?? id,
    name: product?.name ?? "Item",
    price: Number(product?.price ?? 0),
    image: product?.image ?? "",
    qty: 1,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const add = (product) => {
    const normalized = normalizeProduct(product);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);

      if (existing) {
        return prev.map((item) =>
          item.id === normalized.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, normalized];
    });
  };

  const addToCart = (product) => add(product);

  const updateQty = (id, qty) => {
    const nextQty = Math.max(0, Number(qty) || 0);

    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        return nextQty > 0 ? [{ ...item, qty: nextQty }] : [];
      })
    );
  };

  const remove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => setCart([]);

  const items = cart;
  const count = cart.reduce((sum, item) => sum + Number(item.qty || 1), 0);
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0
  );

  const value = useMemo(
    () => ({
      cart,
      items,
      count,
      total,
      add,
      addToCart,
      updateQty,
      remove,
      removeFromCart,
      clear,
    }),
    [cart, count, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};