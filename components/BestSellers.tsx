"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

const TABS = [
  { key: "all",         label: "All" },
  { key: "new",         label: "New" },
  { key: "refurbished", label: "Refurbished" },
] as const;

export default function BestSellers({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<typeof TABS[number]["key"]>("all");
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const list = products.filter(p => tab === "all" || p.condition === tab);

  const scroll = (dir: "l" | "r") => {
    const el = ref.current; if (!el) return;
    el.scrollBy({ left: dir === "l" ? -280 : 280, behavior: "smooth" });
    setTimeout(() => { if (!el) return; setCanL(el.scrollLeft > 4); setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4); }, 340);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="wrap">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-2">Top Picks</p>
            <h2 className="heading-2 text-[#1D1D1F]">Best Sellers</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex bg-[#F5F5F7] rounded-xl p-1 gap-0.5">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    tab === key
                      ? "bg-white text-[#1D1D1F] shadow-sm"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-1.5">
              {(["l", "r"] as const).map(dir => (
                <button key={dir} onClick={() => scroll(dir)} disabled={dir === "l" ? !canL : !canR}
                  className="w-9 h-9 rounded-xl border border-[#D2D2D7] bg-white flex items-center justify-center text-[#6E6E73] hover:border-[#0071E3] hover:text-[#0071E3] disabled:opacity-25 transition-all"
                >
                  {dir === "l" ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll row */}
        <div
          ref={ref}
          onScroll={() => { const el = ref.current; if (!el) return; setCanL(el.scrollLeft > 4); setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4); }}
          className="flex gap-4 overflow-x-auto pb-3 no-scrollbar"
        >
          {list.map((p) => (
            <div key={p.id} className="shrink-0 w-[218px] md:w-[255px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop" className="btn btn-outline-dark">
            Browse All Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
