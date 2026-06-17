"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const SHIPPING = 350;
const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "CHOMLY10") {
      setDiscount(Math.round(totalPrice * 0.1));
      setCouponMsg({ type: "success", text: "10% discount applied!" });
    } else {
      setCouponMsg({ type: "error", text: "Invalid coupon code." });
    }
  };

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING;
  const grandTotal = totalPrice + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F5F7]">
        <div className="text-center max-w-md p-8">
          <div className="text-7xl mb-5">🛒</div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any iPhones yet. Start shopping!</p>
          <Link href="/shop" className="btn-primary text-base px-8 py-4">
            Browse iPhones <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="wrap">
        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-8">
          Shopping Cart <span className="text-gray-400 font-normal text-xl">({totalItems} {totalItems === 1 ? "item" : "items"})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="bg-white rounded-2xl p-5 flex gap-5 border border-gray-100 shadow-sm">
                {/* Image */}
                <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  {item.product.images[0] && (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors line-clamp-2 mb-1">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.selectedStorage} · {item.selectedColor} · {item.product.warranty}
                  </p>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedColor, item.selectedStorage, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.selectedColor, item.selectedStorage, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price + remove */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-[#1D1D1F]">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">{formatPrice(item.product.price)} each</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedStorage)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link href="/shop" className="inline-flex items-center gap-2 text-[#0071E3] font-medium hover:gap-3 transition-all text-sm mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h2 className="font-bold text-[#1D1D1F] text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              {/* Coupon */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mt-1.5 ${couponMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                    {couponMsg.text}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">Try: CHOMLY10 for 10% off</p>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 mt-1">✓ Free shipping applied!</p>
                )}
              </div>

              <Link href="/checkout" className="btn-primary w-full text-base py-4 justify-center text-center">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              {/* Payment icons */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center mb-3">Secure Payment via</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["M-Pesa", "Visa", "Mastercard", "Bank Transfer"].map((method) => (
                    <span key={method} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-500 font-medium">
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Upsell banner */}
        <div className="mt-10 bg-gradient-to-r from-[#0071E3] to-[#5856D6] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5 text-white">
          <div className="flex items-center gap-4">
            <ShoppingBag size={36} className="shrink-0 opacity-80" />
            <div>
              <p className="font-bold text-lg">Need a case or screen protector?</p>
              <p className="text-blue-100 text-sm">Protect your new iPhone with our accessories</p>
            </div>
          </div>
          <Link href="/shop?category=accessory" className="shrink-0 px-6 py-3 bg-white text-[#0071E3] font-semibold rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
            Browse Accessories
          </Link>
        </div>
      </div>
    </div>
  );
}
