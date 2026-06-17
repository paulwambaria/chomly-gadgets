"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X, Phone, ChevronDown, Heart, Truck, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks = [
  {
    label: "iPhones",
    href: "/shop",
    children: [
      { label: "All iPhones",          href: "/shop" },
      { label: "Grade A Refurbished",  href: "/shop?condition=refurbished" },
      { label: "iPhone 16 Series",     href: "/shop?series=iphone-16" },
      { label: "iPhone 15 Series",     href: "/shop?series=iphone-15" },
      { label: "iPhone 14 Series",     href: "/shop?series=iphone-14" },
      { label: "iPhone 13 Series",     href: "/shop?series=iphone-13" },
      { label: "iPhone 11 & 12",       href: "/shop?series=iphone-12" },
    ],
  },
  {
    label: "Accessories",
    href: "/shop?category=accessory",
    children: [
      { label: "AirPods",              href: "/shop?tag=airpods" },
      { label: "Cases & Covers",       href: "/shop?tag=cases" },
      { label: "Chargers",             href: "/shop?tag=chargers" },
      { label: "Screen Protectors",    href: "/shop?tag=screen-protectors" },
      { label: "Power Banks",          href: "/shop?tag=power-banks" },
    ],
  },
  { label: "Deals",   href: "/shop?deals=true" },
  { label: "Blog",    href: "/blog" },
  { label: "About",   href: "/about" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen]                       = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [searchOpen, setSearchOpen]           = useState(false);
  const [searchQuery, setSearchQuery]         = useState("");
  const [activeDropdown, setActiveDropdown]   = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#1D1D1F] text-white text-xs py-2 hidden md:block">
        <div className="wrap flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Phone size={11} className="text-[#6E6E73]" />
            <a href="tel:+254708267513" className="hover:text-[#0071E3] transition-colors font-medium">0708 267 513</a>
            <span className="text-white/20 mx-2">|</span>
            <span className="text-white/50">Mon–Fri 8AM–6PM · Sat 9AM–5PM</span>
          </span>
          <span className="flex items-center gap-4 text-white/60">
            <span className="flex items-center gap-1.5"><Truck size={11} className="shrink-0" /> Free delivery in Nairobi on orders over KES 5,000</span>
            <span className="text-white/20">|</span>
            <a href="https://wa.me/254708267513" className="flex items-center gap-1 hover:text-[#25D366] transition-colors font-medium">
              <MessageCircle size={11} className="shrink-0" /> WhatsApp Us
            </a>
          </span>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          boxShadow: scrolled ? "0 1px 0 #E8E8ED, 0 4px 20px rgba(0,0,0,0.06)" : "0 1px 0 #F5F5F7",
        }}
      >
        <div className="wrap flex items-center justify-between h-[110px]">
          {/* Logo */}
          <Link href="/" className="shrink-0 select-none" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="Chomly Gadgets KE-Deals" width={420} height={177} className="h-[100px] w-auto object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium rounded-lg transition-colors"
                  style={{
                    color: activeDropdown === link.label ? "#0071E3" : "#1D1D1F",
                    background: activeDropdown === link.label ? "rgba(0,113,227,0.06)" : "transparent",
                  }}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[210px]">
                    <div className="bg-white rounded-2xl border border-[#E8E8ED] p-1.5 overflow-hidden"
                      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center px-3.5 py-2.5 text-sm text-[#1D1D1F] hover:text-[#0071E3] hover:bg-[#F0F7FF] rounded-xl transition-colors font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl transition-colors text-[#1D1D1F]"
              style={{ background: searchOpen ? "#F0F7FF" : "transparent" }}
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <Link href="/wishlist"
              className="p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors text-[#1D1D1F] hidden md:flex">
              <Heart size={19} />
            </Link>

            <Link href="/cart"
              className="relative p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors text-[#1D1D1F]">
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#0071E3] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors ml-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#F5F5F7] bg-white px-4 py-3">
            <div className="wrap">
              <div className="relative max-w-2xl mx-auto">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
                <input
                  autoFocus
                  type="search"
                  placeholder="Search iPhones, AirPods, accessories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F5F5F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:bg-white border border-transparent focus:border-[#0071E3]"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
                {searchQuery && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0071E3] font-semibold"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  >
                    Search →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] max-w-full z-50 lg:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]`}
        style={{
          background: "#fff",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F7]">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="Chomly Gadgets KE-Deals" width={240} height={101} className="h-[64px] w-auto object-contain" />
          </Link>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)] py-3">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-5 py-3 text-[15px] font-semibold text-[#1D1D1F] hover:text-[#0071E3] hover:bg-[#F0F7FF] transition-colors"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="border-l-2 border-[#F0F7FF] ml-5 mb-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-5 mx-4 p-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #0071E3, #0051B3)" }}>
            <p className="text-white font-bold text-sm mb-0.5">Need help choosing?</p>
            <p className="text-blue-200 text-xs mb-3">Our experts reply in &lt;2 minutes.</p>
            <a
              href="https://wa.me/254708267513?text=Hi, I need help choosing an iPhone"
              className="block w-full text-center bg-white text-[#0071E3] font-bold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={14} className="mr-1 shrink-0" /> WhatsApp Us
            </a>
          </div>

          <div className="mt-4 px-5">
            <a href="tel:+254708267513" className="flex items-center gap-2 text-sm text-[#6E6E73]">
              <Phone size={13} /> 0708 267 513
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
