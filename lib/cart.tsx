"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product, Storage } from "./types";

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, color: string, storage: Storage, qty?: number) => void;
  removeItem: (productId: string, color: string, storage: string) => void;
  updateQty: (productId: string, color: string, storage: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chomly-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("chomly-cart", JSON.stringify(items));
  }, [items]);

  const key = (item: CartItem) =>
    `${item.product.id}-${item.selectedColor}-${item.selectedStorage}`;

  const addItem = (product: Product, color: string, storage: Storage, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedColor === color && i.selectedStorage === storage
      );
      if (existing) {
        return prev.map((i) =>
          key(i) === `${product.id}-${color}-${storage}`
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product, quantity: qty, selectedColor: color, selectedStorage: storage }];
    });
  };

  const removeItem = (productId: string, color: string, storage: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedColor === color && i.selectedStorage === storage)
      )
    );
  };

  const updateQty = (productId: string, color: string, storage: string, qty: number) => {
    if (qty <= 0) { removeItem(productId, color, storage); return; }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.selectedColor === color && i.selectedStorage === storage
          ? { ...i, quantity: qty }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
