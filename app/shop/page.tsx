"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Grid3X3, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Suspense } from "react";

const seriesOptions = ["iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone XR", "iPhone X"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"] as const;
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "newest", label: "Newest" },
];

function ShopContent() {
  const params = useSearchParams();
  const initialCondition = params.get("condition") ?? "all";
  const initialQ = params.get("q") ?? "";

  const [condition, setCondition] = useState<"all" | "new" | "refurbished">(initialCondition as never);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState(initialQ);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = [...products];

    if (condition !== "all") list = list.filter((p) => p.condition === condition);
    if (selectedSeries.length) list = list.filter((p) => selectedSeries.some((s) => p.name.includes(s)));
    if (selectedStorage.length) list = list.filter((p) => p.storage.some((s) => selectedStorage.includes(s)));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.includes(search.toLowerCase())));

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [condition, selectedSeries, selectedStorage, priceRange, sort, search]);

  const toggleSeries = (s: string) =>
    setSelectedSeries((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleStorage = (s: string) =>
    setSelectedStorage((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const activeFilters = [
    ...(condition !== "all" ? [condition] : []),
    ...selectedSeries,
    ...selectedStorage,
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="wrap py-8">
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
            {condition === "refurbished" ? "Certified Refurbished iPhones" :
             condition === "new" ? "New iPhones" : "All iPhones & Accessories"}
          </h1>
          <p className="text-gray-500">{filtered.length} products found</p>
        </div>
      </div>

      <div className="wrap py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters — desktop */}
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-[#1D1D1F]">Filters</h2>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => { setCondition("all"); setSelectedSeries([]); setSelectedStorage([]); setPriceRange([0, 250000]); }}
                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Condition */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Condition</p>
                {(["all", "new", "refurbished"] as const).map((c) => (
                  <label key={c} className="flex items-center gap-2.5 mb-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === c}
                      onChange={() => setCondition(c)}
                      className="accent-[#0071E3]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#0071E3] capitalize transition-colors">
                      {c === "all" ? "All Devices" : c === "new" ? "New" : "Refurbished"}
                    </span>
                  </label>
                ))}
              </div>

              {/* Series */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">iPhone Series</p>
                {seriesOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2.5 mb-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedSeries.includes(s)}
                      onChange={() => toggleSeries(s)}
                      className="accent-[#0071E3] rounded"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#0071E3] transition-colors">{s}</span>
                  </label>
                ))}
              </div>

              {/* Storage */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Storage</p>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleStorage(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                        selectedStorage.includes(s)
                          ? "bg-[#0071E3] text-white border-[#0071E3]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#0071E3]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Price Range</p>
                <p className="text-sm text-gray-600 mb-2">
                  KES {priceRange[0].toLocaleString()} — KES {priceRange[1].toLocaleString()}
                </p>
                <input
                  type="range"
                  min={0}
                  max={250000}
                  step={5000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#0071E3]"
                />
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 bg-[#0071E3] text-white rounded-full text-[10px] flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              {/* Search */}
              <div className="flex-1 min-w-48">
                <input
                  type="search"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setView("grid")} className={`p-2.5 ${view === "grid" ? "bg-[#0071E3] text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <Grid3X3 size={16} />
                </button>
                <button onClick={() => setView("list")} className={`p-2.5 ${view === "list" ? "bg-[#0071E3] text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeFilters.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0071E3] text-sm rounded-full font-medium capitalize">
                    {f}
                    <button onClick={() => {
                      if (f === "new" || f === "refurbished") setCondition("all");
                      else if (seriesOptions.includes(f)) toggleSeries(f);
                      else toggleStorage(f);
                    }}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">No products found</h3>
                <p className="text-gray-500 mb-5">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setCondition("all"); setSelectedSeries([]); setSelectedStorage([]); setSearch(""); }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
                {filtered.map((product) =>
                  view === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center hover:shadow-md transition-all">
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        {product.images[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1D1D1F] mb-1">{product.name}</p>
                        <p className="text-sm text-gray-500 mb-2">{product.warranty}</p>
                        <p className="text-xl font-bold text-[#1D1D1F]">KES {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="skeleton w-64 h-8 rounded-xl" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
