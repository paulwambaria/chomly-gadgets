"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown, Lock, ArrowLeft, Smartphone, CreditCard, Building2, LucideIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

type Step = "info" | "payment" | "review";

const MPESA_PAYBILL = "247247";
const MPESA_ACCOUNT = "CHOMLY";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [placed, setPlaced] = useState(false);
  const [payMethod, setPayMethod] = useState<"mpesa" | "card" | "bank">("mpesa");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "Nairobi", county: "", notes: "",
  });

  const set = (key: keyof typeof form, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const shipping = totalPrice >= 5000 ? 0 : 350;
  const grand = totalPrice + shipping;

  const placeOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F5F7]">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">Order Confirmed!</h2>
          <p className="text-gray-500 mb-2">Thank you for your order. We&apos;ll confirm via WhatsApp/SMS shortly.</p>
          <p className="text-sm text-gray-400 mb-6">Order reference: <strong>CG-{Date.now().toString().slice(-6)}</strong></p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-secondary">Continue Shopping</Link>
            <a href={`https://wa.me/254708267513?text=Hi%2C%20I%20just%20placed%20an%20order%20on%20Chomly%20Gadgets.%20Order%20total%3A%20${formatPrice(grand)}`} className="btn-primary">
              Track via WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "info", label: "Information" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8">
      <div className="wrap max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-[#0071E3] text-sm">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Lock size={12} className="text-green-500" /> Secure Checkout
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === s.id ? "bg-[#0071E3] text-white" :
                  steps.indexOf(steps.find(x => x.id === step)!) > i ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                }`}>
                  {steps.indexOf(steps.find(x => x.id === step)!) > i ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s.id ? "text-[#1D1D1F]" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${steps.indexOf(steps.find(x => x.id === step)!) > i ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-3">
            {step === "info" && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-[#1D1D1F] text-xl mb-6">Delivery Information</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                    <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                    <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="Kamau" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="john@email.com" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (M-Pesa) *</label>
                  <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="0712 345 678" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Address *</label>
                  <input value={form.address} onChange={(e) => set("address", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="Street, building, apartment" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <div className="relative">
                      <select value={form.city} onChange={(e) => set("city", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] appearance-none">
                        {["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Other"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">County</label>
                    <input value={form.county} onChange={(e) => set("county", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="Nairobi County" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes (optional)</label>
                  <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] resize-none" placeholder="Special delivery instructions…" />
                </div>
                <button onClick={() => setStep("payment")} className="btn-primary w-full py-4 text-base justify-center">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-[#1D1D1F] text-xl mb-6">Choose Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {(
                    [
                      { id: "mpesa" as const, label: "M-Pesa", desc: "Instant mobile payment", Icon: Smartphone, color: "#00A651" },
                      { id: "card" as const, label: "Visa / Mastercard", desc: "Secure card payment", Icon: CreditCard, color: "#1434CB" },
                      { id: "bank" as const, label: "Bank Transfer", desc: "Direct bank deposit", Icon: Building2, color: "#6E6E73" },
                    ] as { id: "mpesa" | "card" | "bank"; label: string; desc: string; Icon: LucideIcon; color: string }[]
                  ).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPayMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        payMethod === method.id ? "border-[#0071E3] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${method.color}18` }}>
                        <method.Icon size={20} style={{ color: method.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1D1D1F]">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${payMethod === method.id ? "border-[#0071E3] bg-[#0071E3]" : "border-gray-300"}`}>
                        {payMethod === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {payMethod === "mpesa" && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">📱 M-Pesa Payment Instructions</h3>
                    <ol className="space-y-2 text-sm text-green-700">
                      <li>1. Go to <strong>M-Pesa</strong> → <strong>Lipa na M-Pesa</strong> → <strong>Paybill</strong></li>
                      <li>2. Enter Business No: <strong>{MPESA_PAYBILL}</strong></li>
                      <li>3. Enter Account No: <strong>{MPESA_ACCOUNT}</strong></li>
                      <li>4. Enter Amount: <strong>{formatPrice(grand)}</strong></li>
                      <li>5. Enter your M-Pesa PIN and confirm</li>
                      <li>6. Share the M-Pesa SMS confirmation code with us on WhatsApp</li>
                    </ol>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep("info")} className="btn-secondary flex-1 py-4 justify-center">
                    ← Back
                  </button>
                  <button onClick={() => setStep("review")} className="btn-primary flex-1 py-4 justify-center">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-[#1D1D1F] text-xl mb-6">Review Your Order</h2>

                <div className="mb-5 p-4 bg-gray-50 rounded-xl text-sm space-y-2">
                  <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
                  <p><strong>Email:</strong> {form.email}</p>
                  <p><strong>Phone:</strong> {form.phone}</p>
                  <p><strong>Address:</strong> {form.address}, {form.city}</p>
                  <p><strong>Payment:</strong> {payMethod === "mpesa" ? "M-Pesa" : payMethod === "card" ? "Card" : "Bank Transfer"}</p>
                </div>

                <div className="mb-6 space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {item.product.images[0] && (
                          <Image src={item.product.images[0].url} alt={item.product.name} width={48} height={48} className="object-cover w-full h-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1D1D1F]">{item.product.name}</p>
                        <p className="text-gray-400">{item.selectedStorage} · {item.selectedColor} × {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span>{formatPrice(grand)}</span></div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")} className="btn-secondary flex-1 py-4 justify-center">
                    ← Back
                  </button>
                  <button onClick={placeOrder} className="btn-primary flex-1 py-4 justify-center text-base">
                    Place Order 🎉
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="font-semibold text-[#1D1D1F] mb-4">Order ({items.length} item{items.length > 1 ? "s" : ""})</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-sm">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {item.product.images[0] && (
                        <Image src={item.product.images[0].url} alt={item.product.name} width={56} height={56} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1D1D1F] text-xs leading-tight line-clamp-2">{item.product.name}</p>
                      <p className="text-gray-400 text-xs">{item.selectedStorage} · ×{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between text-base font-bold border-t pt-2"><span>Total</span><span>{formatPrice(grand)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
