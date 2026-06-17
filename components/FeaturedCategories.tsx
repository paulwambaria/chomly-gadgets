"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* Apple official images → Unsplash fallbacks */
const hero_cards = [
  {
    label:      "iPhone 15 & 16 Series",
    tagline:    "Grade A · Titanium · Up to 40% Off",
    href:       "/shop?series=iphone-15",
    image:      "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large.jpg",
    fallback:   "https://images.unsplash.com/photo-1695048132520-aa5757ee47e5?auto=format&fit=crop&w=900&q=85",
    badge:      "From KES 102,000",
    badgeColor: "#0071E3",
    gradient:   "linear-gradient(to top, #000 0%, rgba(0,0,0,0.55) 45%, transparent 75%)",
    span:       "lg:col-span-2 lg:row-span-2",
    tall:       true,
  },
  {
    label:      "iPhone 11–14 Series",
    tagline:    "Grade A · Battery Certified · From KES 22,000",
    href:       "/shop?series=iphone-13",
    image:      "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_16__b6tkv86m2gc2_large.jpg",
    fallback:   "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85",
    badge:      "Best Value",
    badgeColor: "#30D158",
    gradient:   "linear-gradient(to top, #001A09 0%, rgba(0,26,9,0.6) 50%, transparent 80%)",
    span:       "lg:col-span-1",
    tall:       false,
  },
  {
    label:      "All Refurbished iPhones",
    tagline:    "50-Point Inspected · 3–6 Month Warranty",
    href:       "/shop?condition=refurbished",
    image:      "https://www.apple.com/v/iphone/home/cj/images/overview/augment/airpods__bz9s5pwm8j6u_large.jpg",
    fallback:   "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&w=800&q=85",
    badge:      "15 Models In Stock",
    badgeColor: "#FF9F0A",
    gradient:   "linear-gradient(to top, #1A0E00 0%, rgba(26,14,0,0.6) 50%, transparent 80%)",
    span:       "lg:col-span-1",
    tall:       false,
  },
];

const seriesList = [
  { label: "iPhone 16 Pro", href: "/shop?q=iPhone+16+Pro", hot: true  },
  { label: "iPhone 16",     href: "/shop?q=iPhone+16"                 },
  { label: "iPhone 15 Pro", href: "/shop?q=iPhone+15+Pro"             },
  { label: "iPhone 15",     href: "/shop?q=iPhone+15"                 },
  { label: "iPhone 14",     href: "/shop?q=iPhone+14"                 },
  { label: "iPhone 13",     href: "/shop?q=iPhone+13"                 },
  { label: "iPhone 12",     href: "/shop?q=iPhone+12"                 },
  { label: "iPhone 11",     href: "/shop?q=iPhone+11"                 },
  { label: "iPhone XR",     href: "/shop?q=iPhone+XR"                 },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="wrap">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Shop by Category</p>
            <h2 className="heading-2 text-[#1D1D1F]">Find Your iPhone</h2>
          </div>
          <Link href="/shop"
            className="hidden md:inline-flex items-center gap-1.5 text-[#0071E3] font-semibold text-sm hover:gap-3 transition-all duration-200">
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-rows-2 mb-12">
          {hero_cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`group relative rounded-3xl overflow-hidden bg-[#111] ${card.span}`}
              style={{ minHeight: card.tall ? "480px" : "220px" }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = card.fallback;
                }}
              />
              <div className="absolute inset-0" style={{ background: card.gradient }} />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold text-white mb-3 uppercase tracking-wide"
                  style={{ background: card.badgeColor }}
                >
                  {card.badge}
                </span>
                <h3 className={`font-black text-white leading-tight mb-1 ${card.tall ? "text-2xl md:text-3xl" : "text-xl"}`}>
                  {card.label}
                </h3>
                <p className="text-white/55 text-sm mb-3">{card.tagline}</p>
                <div className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Series quick-links */}
        <div>
          <p className="text-[#6E6E73] text-xs font-bold uppercase tracking-widest mb-4">Browse by series</p>
          <div className="flex flex-wrap gap-2">
            {seriesList.map(({ label, href, hot }) => (
              <Link
                key={label}
                href={href}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:border-[#0071E3] hover:text-[#0071E3] hover:bg-blue-50"
                style={{
                  border: `1.5px solid ${hot ? "#0071E3" : "#D2D2D7"}`,
                  color:  hot ? "#0071E3" : "#1D1D1F",
                  background: hot ? "rgba(0,113,227,0.04)" : "transparent",
                }}
              >
                {label}
                {hot && (
                  <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
