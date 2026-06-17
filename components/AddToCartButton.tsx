"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  compact = false,
  selectedColor,
  selectedStorage,
}: {
  product: Product;
  compact?: boolean;
  selectedColor?: string;
  selectedStorage?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = selectedColor ?? product.colors[0]?.name ?? "Default";
    const storage = selectedStorage ?? product.storage[0] ?? "128GB";
    addItem(product, color, storage as never);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
          added
            ? "bg-green-500 text-white"
            : "bg-[#0071E3] text-white hover:bg-[#0077ED]"
        }`}
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {added ? "Added" : "Add"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold transition-all ${
        added
          ? "bg-green-500 text-white"
          : "bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98]"
      }`}
    >
      {added ? <Check size={20} /> : <ShoppingCart size={20} />}
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
