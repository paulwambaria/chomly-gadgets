"use client";

import { useState } from "react";
import { ShoppingCart, Zap, MessageCircle, Check } from "lucide-react";
import { Product, Storage } from "@/lib/types";
import { useCart } from "@/lib/cart";

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedStorage, setSelectedStorage] = useState<Storage>(product.storage[0] ?? "128GB");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedColor, selectedStorage);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Color selection */}
      {product.colors.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-[#1D1D1F] mb-2.5">
            Color: <span className="font-normal text-gray-500">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                className={`relative w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${
                  selectedColor === color.name
                    ? "border-[#0071E3] shadow-md"
                    : "border-gray-200"
                }`}
                style={{ background: color.hex }}
              >
                {selectedColor === color.name && (
                  <Check
                    size={14}
                    className="absolute inset-0 m-auto"
                    style={{ color: parseInt(color.hex.replace("#", ""), 16) > 0x888888 ? "#000" : "#fff" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage selection */}
      {product.storage.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-[#1D1D1F] mb-2.5">Storage</p>
          <div className="flex flex-wrap gap-2">
            {product.storage.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStorage(s)}
                className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  selectedStorage === s
                    ? "bg-[#0071E3] text-white border-[#0071E3] shadow-md"
                    : "bg-white text-[#1D1D1F] border-gray-200 hover:border-[#0071E3]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-semibold transition-all ${
            added
              ? "bg-green-500 text-white"
              : "bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98]"
          }`}
        >
          {added ? <Check size={20} /> : <ShoppingCart size={20} />}
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-semibold bg-[#1D1D1F] text-white hover:bg-black transition-all active:scale-[0.98]">
          <Zap size={20} />
          Buy Now
        </button>
      </div>

      {/* WhatsApp inquiry */}
      <a
        href={`https://wa.me/254708267513?text=Hi%2C%20I%20am%20interested%20in%20buying%20the%20${encodeURIComponent(product.name)}%20(${selectedStorage}%2C%20${encodeURIComponent(selectedColor)}).%20Is%20it%20available%3F`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366] hover:text-white transition-all"
      >
        <MessageCircle size={18} />
        WhatsApp Inquiry
      </a>
    </div>
  );
}
