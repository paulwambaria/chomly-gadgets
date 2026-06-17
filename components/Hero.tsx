"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Shield, Truck, MessageCircle, Award } from "lucide-react";

/*
  Apple Store CDN transparent-PNG product images.
  These are the exact same images Apple uses on apple.com/iphone/.
  fmt=png-alpha → transparent background PNG, perfect on any gradient.
  wid/hei control resolution; use large values for crisp display.
*/
const APPLE_CDN = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is";

const slides = [
  {
    id: 0,
    eyebrow: "Grade A Refurbished · iPhone 16 Pro Max · A18 Pro",
    headline: ["Titanium.", "Pro camera.", "Pro performance."],
    sub: "95%+ battery health · Camera Control · 6.9″ Super Retina XDR · 6-month warranty",
    price: "KES 175,000",
    was:   "KES 219,000",
    save:  "Save KES 44,000",
    cta1:  { label: "Shop iPhone 16 Pro Max", href: "/products/refurbished-iphone-16-pro-max-256gb" },
    cta2:  { label: "See all models",         href: "/shop" },
    productImg: `${APPLE_CDN}/iphone-compare-iphone-17-pro-202509?wid=680&hei=860&fmt=png-alpha&.v=1725568695209`,
    fallbackImg: "https://images.unsplash.com/photo-1695048132520-aa5757ee47e5?auto=format&fit=crop&w=680&q=90",
    bg:    "radial-gradient(ellipse 90% 80% at 75% 40%, #1D0040 0%, #0A0015 45%, #000 100%)",
    glow:  "rgba(139,92,246,0.35)",
    accent:"#BF5AF2",
    chip:  "#BF5AF2",
  },
  {
    id: 1,
    eyebrow: "Grade A Refurbished · iPhone 15 Pro Max · A17 Pro",
    headline: ["Titanium.", "5x Zoom.", "USB-C speed."],
    sub: "93%+ battery health · Blue Titanium · 5x Telephoto · 6-month warranty",
    price: "KES 155,000",
    was:   "KES 195,000",
    save:  "Save KES 40,000",
    cta1:  { label: "Shop iPhone 15 Pro Max", href: "/products/refurbished-iphone-15-pro-max-256gb" },
    cta2:  { label: "All Pro models",         href: "/shop?series=iphone-15" },
    productImg: `${APPLE_CDN}/iphone-compare-iphone-17-pro-202509?wid=680&hei=860&fmt=png-alpha&.v=1725568695209`,
    fallbackImg: "https://images.unsplash.com/photo-1695048132520-aa5757ee47e5?auto=format&fit=crop&w=680&q=90",
    bg:    "radial-gradient(ellipse 90% 80% at 70% 40%, #00154D 0%, #000B2E 45%, #000 100%)",
    glow:  "rgba(0,113,227,0.35)",
    accent:"#0071E3",
    chip:  "#0071E3",
  },
  {
    id: 2,
    eyebrow: "Best Value · iPhone 13 · Grade A Refurbished",
    headline: ["Premium Apple.", "Up to 40%", "less."],
    sub: "92%+ battery health · 5G · MagSafe · 6-month warranty · From KES 22,000",
    price: "From KES 22,000",
    was:   null,
    save:  "Up to 40% off retail",
    cta1:  { label: "Shop All Refurbished", href: "/shop?condition=refurbished" },
    cta2:  { label: "How we certify →",     href: "/about" },
    productImg: `${APPLE_CDN}/iphone-compare-iphone-16-202409?wid=680&hei=860&fmt=png-alpha&.v=1724785200000`,
    fallbackImg: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=680&q=90",
    bg:    "radial-gradient(ellipse 90% 80% at 70% 40%, #001A09 0%, #000D05 45%, #000 100%)",
    glow:  "rgba(48,209,88,0.3)",
    accent:"#30D158",
    chip:  "#30D158",
  },
  {
    id: 3,
    eyebrow: "Grade A Refurbished · iPhone 14 Pro Max · 48MP",
    headline: ["Dynamic Island.", "ProRes video.", "Always-On."],
    sub: "91%+ battery health · A16 Bionic · 48MP camera · 5G · 6-month warranty",
    price: "KES 118,000",
    was:   "KES 148,000",
    save:  "Save KES 30,000",
    cta1:  { label: "Shop iPhone 14 Pro Max", href: "/products/refurbished-iphone-14-pro-max-256gb" },
    cta2:  { label: "All iPhone 14 models",   href: "/shop?series=iphone-14" },
    productImg: `${APPLE_CDN}/iphone-compare-iphone-17-pro-202509?wid=680&hei=860&fmt=png-alpha&.v=1725568695209`,
    fallbackImg: "https://images.unsplash.com/photo-1672978922499-f1f01d5b7e3a?auto=format&fit=crop&w=680&q=90",
    bg:    "radial-gradient(ellipse 90% 80% at 70% 40%, #1A0E00 0%, #0E0900 45%, #000 100%)",
    glow:  "rgba(255,159,10,0.3)",
    accent:"#FF9F0A",
    chip:  "#FF9F0A",
  },
];

const trust = [
  { Icon: Shield,        label: "Apple Warranty",     sub: "on all new iPhones"   },
  { Icon: Award,         label: "Grade A Only",        sub: "refurbished quality"  },
  { Icon: Truck,         label: "Free Nairobi Delivery", sub: "same or next day"  },
  { Icon: MessageCircle, label: "WhatsApp in <2 min", sub: "real expert support"  },
];

export default function Hero() {
  const [idx, setIdx]     = useState(0);
  const [prev, setPrev]   = useState<number | null>(null);
  const [dir, setDir]     = useState<1 | -1>(1);
  const [imgFailed, setImgFailed] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const go = useCallback((next: number, direction: 1 | -1 = 1) => {
    clearTimeout(timerRef.current);
    setPrev(idx);
    setDir(direction);
    setTimeout(() => { setIdx((next + slides.length) % slides.length); setPrev(null); }, 20);
  }, [idx]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(idx + 1, 1), 7000);
    return () => clearTimeout(timerRef.current);
  }, [go, idx]);

  const s = slides[idx];
  const p = prev !== null ? slides[prev] : null;

  return (
    <section className="relative overflow-hidden select-none" style={{ minHeight: "100vh", background: s.bg, transition: "background 0.9s ease" }}>

      {/* ── Glow blob behind product image ── */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: s.glow, opacity: 0.6 }} />

      {/* ══ DESKTOP LAYOUT ══ */}
      <div className="hidden md:flex wrap items-center" style={{ minHeight: "100vh", paddingTop: "72px", paddingBottom: "72px" }}>

        {/* Left: text */}
        <div className="flex-1 pr-8 z-10">
          {/* Eyebrow */}
          <div key={`ey${idx}`}
            className="anim-fade-up anim-d1 inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase border"
            style={{ color: s.accent, borderColor: `${s.accent}40`, background: `${s.accent}0D` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
            {s.eyebrow}
          </div>

          {/* Headline — each word on its own line like Apple */}
          <div key={`h${idx}`} className="anim-fade-up anim-d1 mb-5">
            {s.headline.map((line, i) => (
              <div key={i} className="text-white leading-[1.01] tracking-[-0.045em]"
                style={{ fontSize: "clamp(3rem, 6.5vw, 5.8rem)", fontWeight: 900, fontFamily: "var(--font-sans)" }}>
                {line}
              </div>
            ))}
          </div>

          {/* Sub */}
          <p key={`su${idx}`} className="anim-fade-up anim-d2 text-white/50 text-base md:text-[17px] leading-relaxed mb-7 max-w-sm">
            {s.sub}
          </p>

          {/* Price */}
          <div key={`pr${idx}`} className="anim-fade-up anim-d2 flex flex-wrap items-baseline gap-3 mb-3">
            <span className="text-white font-black tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontFamily: "var(--font-sans)" }}>
              {s.price}
            </span>
            {s.was && <span className="text-white/28 text-xl line-through">{s.was}</span>}
          </div>
          {s.save && (
            <p key={`sv${idx}`} className="anim-fade-up anim-d2 mb-8 text-sm font-semibold" style={{ color: s.accent }}>
              {s.save}
            </p>
          )}

          {/* CTAs */}
          <div key={`ct${idx}`} className="anim-fade-up anim-d3 flex flex-wrap gap-3">
            <Link href={s.cta1.href}
              className="btn text-[0.875rem] px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: s.accent }}>
              {s.cta1.label}
            </Link>
            <Link href={s.cta2.href} className="btn btn-outline-white text-[0.875rem] px-7 py-3.5">
              {s.cta2.label}
            </Link>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2.5 mt-8">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#FF9F0A" color="#FF9F0A" />)}
            </div>
            <span className="text-white/35 text-sm">4.8 · 10,000+ customers in Kenya</span>
          </div>
        </div>

        {/* Right: Apple product image */}
        <div className="relative flex-shrink-0 flex items-center justify-center z-10"
          style={{ width: "clamp(280px, 42%, 520px)", height: "clamp(360px, 80vh, 700px)" }}>
          <img
            key={`img${idx}`}
            src={imgFailed[s.id] ? s.fallbackImg : s.productImg}
            alt={s.headline.join(" ")}
            onError={() => setImgFailed(prev => ({ ...prev, [s.id]: true }))}
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6))",
              animation: "fade-up 0.65s ease both",
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* ══ MOBILE LAYOUT ══ */}
      <div className="md:hidden flex flex-col" style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "96px" }}>
        {/* Product image - top */}
        <div className="relative h-[240px] flex items-end justify-center overflow-hidden">
          <img
            key={`mimg${idx}`}
            src={imgFailed[s.id] ? s.fallbackImg : s.productImg}
            alt={s.headline.join(" ")}
            onError={() => setImgFailed(prev => ({ ...prev, [s.id]: true }))}
            className="h-full w-auto object-contain"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
            draggable={false}
          />
          {/* bottom gradient so text area below reads clean */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Text */}
        <div className="flex-1 wrap flex flex-col justify-center py-6">
          <div key={`mey${idx}`} className="anim-fade-up inline-flex items-center gap-1.5 mb-4 self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase border"
            style={{ color: s.accent, borderColor: `${s.accent}40`, background: `${s.accent}0D` }}>
            <span className="w-1 h-1 rounded-full" style={{ background: s.accent }} />
            {s.eyebrow}
          </div>

          <div key={`mh${idx}`} className="anim-fade-up mb-3">
            {s.headline.map((line, i) => (
              <div key={i} className="text-white font-black leading-tight tracking-tight text-4xl"
                style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.035em" }}>
                {line}
              </div>
            ))}
          </div>

          <p className="text-white/45 text-sm leading-relaxed mb-5">{s.sub}</p>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-white font-black text-2xl tracking-tight">{s.price}</span>
            {s.was && <span className="text-white/28 line-through">{s.was}</span>}
          </div>
          {s.save && <p className="text-sm font-semibold mb-5" style={{ color: s.accent }}>{s.save}</p>}

          <div className="flex flex-col gap-2.5">
            <Link href={s.cta1.href} className="btn text-sm py-3.5 text-white text-center" style={{ background: s.accent }}>
              {s.cta1.label}
            </Link>
            <Link href={s.cta2.href} className="btn btn-outline-white text-sm py-3.5">
              {s.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Slide dots + arrows ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={() => go(idx - 1, -1)}
          className="w-9 h-9 rounded-full border border-white/18 text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
          <ChevronLeft size={15} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === idx ? 26 : 7, height: 7, background: i === idx ? s.accent : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
        <button
          onClick={() => go(idx + 1, 1)}
          className="w-9 h-9 rounded-full border border-white/18 text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* ── Trust strip ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.07]"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            {trust.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <Icon size={16} style={{ color: s.accent }} className="shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">{label}</p>
                  <p className="text-white/35 text-[10px] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
