"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowRight, Clock, CalendarDays, RotateCcw, LucideIcon } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { Product } from "@/lib/types";

function useCountdown(end: Date) {
  const calc = () => { const d = Math.max(0, end.getTime() - Date.now()); return { h: Math.floor(d/3600000), m: Math.floor((d%3600000)/60000), s: Math.floor((d%60000)/1000) }; };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); });
  return t;
}

const DEALS: { label: string; Icon: LucideIcon; hours: number; accent: string }[] = [
  { label: "Flash Sale",  Icon: Zap,          hours: 8,  accent: "#FF3B30" },
  { label: "Weekly Deal", Icon: CalendarDays,  hours: 72, accent: "#0071E3" },
  { label: "Refurb Pick", Icon: RotateCcw,     hours: 48, accent: "#30D158" },
];

function Cd({ val, lbl }: { val: number; lbl: string }) {
  return (
    <div className="cd-block">
      <span className="n">{String(val).padStart(2, "0")}</span>
      <span className="l">{lbl}</span>
    </div>
  );
}

export default function FeaturedDeals({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const end = new Date(Date.now() + DEALS[active].hours * 3_600_000);
  const t = useCountdown(end);
  const product = products[active % products.length];
  const { accent, Icon: DealIcon, label } = DEALS[active];

  if (!product) return null;

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14">
          <div>
            <p className="eyebrow mb-2" style={{ color: accent }}>Limited Time</p>
            <h2 className="heading-2 text-white">Featured Deals</h2>
          </div>
          <div className="flex gap-2">
            {DEALS.map(({ label: l, Icon: DI }, i) => (
              <button
                key={l}
                onClick={() => setActive(i)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all"
                style={
                  active === i
                    ? { background: DEALS[i].accent, color: "#fff", borderColor: DEALS[i].accent }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.12)" }
                }
              >
                <DI size={11} /> {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Clock size={13} style={{ color: accent }} />
              <span className="text-[#6E6E73] text-xs font-bold uppercase tracking-widest">Deal ends in</span>
            </div>
            <div className="flex items-center gap-3 mb-9">
              <Cd val={t.h} lbl="Hrs" />
              <span className="text-white/20 text-3xl font-thin">:</span>
              <Cd val={t.m} lbl="Min" />
              <span className="text-white/20 text-3xl font-thin">:</span>
              <Cd val={t.s} lbl="Sec" />
            </div>

            <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight leading-tight mb-3">
              {product.name}
            </h3>
            <p className="text-[#6E6E73] text-base leading-relaxed mb-6 max-w-md">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-white text-4xl font-black tracking-tight">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-[#6E6E73] text-xl line-through">{formatPrice(product.originalPrice)}</span>}
              {product.discount && (
                <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: accent }}>
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-[#6E6E73] text-sm mb-7">
              ✓ {product.warranty}
              {product.batteryHealth && <span> · <Zap size={11} className="inline text-[#30D158]" /> {product.batteryHealth}% battery health</span>}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="btn text-sm px-7 py-3.5 text-white font-bold"
                style={{ background: accent }}
              >
                Grab Deal <ArrowRight size={15} />
              </Link>
              <Link href="/shop?deals=true" className="btn btn-ghost text-sm px-7 py-3.5 font-bold">
                All Deals
              </Link>
            </div>
          </div>

          {/* Right: product image */}
          <div className="relative flex items-center justify-center">
            {/* Glow */}
            <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-25" style={{ background: accent }} />

            {/* Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border" style={{ borderColor: `${accent}25`, background: "#111" }}>
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px)100vw,50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20"><DealIcon size={120} style={{ color: accent }} /></div>
              )}
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-sm mb-1">{product.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-xl tracking-tight">{formatPrice(product.price)}</span>
                  <span className="badge badge-sale">{product.discount}% OFF</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex flex-col items-center justify-center font-black text-white shadow-xl" style={{ background: accent }}>
              <span className="text-lg leading-none">-{product.discount}%</span>
              <span className="text-[9px] opacity-80 font-normal">OFF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
