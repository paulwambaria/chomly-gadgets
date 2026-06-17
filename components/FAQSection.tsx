"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  { q:"Are refurbished iPhones worth buying?",             a:"Yes — our Grade A refurbished iPhones pass a rigorous 50-point inspection covering screen, battery, cameras, Face ID, speakers, and all sensors. They look and perform like new at 30–40% less than retail. Every unit includes a printed battery health certificate and a 3–6 month Chomly warranty." },
  { q:"Do refurbished iPhones come with a warranty?",      a:"Absolutely. Refurbished models carry a 6-month warranty (iPhone 12–14) or 3-month warranty (iPhone X, XR, XS, 11). New iPhones include the full 12-month Apple warranty. We honour all claims — simply WhatsApp us and we'll sort it out fast." },
  { q:"Which iPhone gives the best value in Kenya?",       a:"The refurbished iPhone 13 (from KES 52,000) and new iPhone 15 (KES 115,000) are our best-value picks. For budget shoppers, the refurbished iPhone 11 at KES 24,000 delivers excellent value. We're happy to advise based on your budget — just WhatsApp us." },
  { q:"How long does delivery take?",                      a:"Nairobi: same-day or next-day. Countrywide via G4S / Fargo Courier: 1–3 business days. We send you a tracking link and WhatsApp update the moment your order ships." },
  { q:"What payment methods do you accept?",               a:"M-Pesa (Paybill 247247 / Account: CHOMLY), Visa, Mastercard, and direct bank transfer. M-Pesa is instant and most popular. Orders above KES 50,000 can be done via bank transfer by arrangement." },
  { q:"Can I return or exchange my iPhone?",               a:"Yes. New iPhones: 7-day return (unopened or manufacturer fault). Refurbished: 48-hour exchange if the device doesn't match the description. Just WhatsApp us — no hassle, no arguments." },
  { q:"What battery health do your refurbished phones have?", a:"We guarantee a minimum of 80% battery health on all refurbished devices. Most of our stock is 85–95%, clearly displayed on each product page. A printed battery health certificate is included in the box." },
  { q:"Do you offer trade-in for my current iPhone?",      a:"Yes! Send us photos of your device on WhatsApp and we'll give you an instant cash valuation. The amount can be applied directly toward your new purchase, making upgrading very affordable." },
  { q:"What Apple features are supported?",                a:"All iPhones we sell are genuine Apple devices supporting the full feature set: Face ID / Touch ID, Apple Intelligence (iOS 18 on eligible models), MagSafe (iPhone 12+), 5G (iPhone 12+), Emergency SOS via satellite (iPhone 14+), USB-C (iPhone 15+), Dynamic Island (iPhone 14 Pro+), Camera Control (iPhone 16), and full iCloud / Apple Pay support." },
  { q:"Is Apple Intelligence available on refurbished iPhones?", a:"Yes — Apple Intelligence is available on iPhone 16 (all models), iPhone 15 Pro, and iPhone 15 Pro Max running iOS 18.1 or later. All eligible refurbished devices we sell support it fully since they're genuine Apple hardware on the latest iOS." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="wrap-tight">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="heading-2 text-[#1D1D1F] mb-4">Everything You Need to Know</h2>
          <p className="text-[#6E6E73] max-w-xl mx-auto">Quick answers to the most common questions about buying iPhones in Kenya.</p>
        </div>

        <div className="space-y-2 mb-14">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border transition-all duration-200 overflow-hidden"
                style={{ borderColor: isOpen ? "#0071E3" : "#D2D2D7", background: isOpen ? "#F0F7FF" : "#fff" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`font-semibold text-sm md:text-base leading-snug flex-1 ${isOpen ? "text-[#0071E3]" : "text-[#1D1D1F]"}`}>
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors"
                    style={{ borderColor: isOpen ? "#0071E3" : "#D2D2D7", background: isOpen ? "#0071E3" : "transparent" }}
                  >
                    {isOpen
                      ? <Minus size={12} color="#fff" />
                      : <Plus size={12} color="#6E6E73" />
                    }
                  </span>
                </button>
                <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[#6E6E73] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0071E3 0%, #0051B3 100%)" }}>
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left flex-1">
              <h3 className="text-white font-black text-xl mb-1">Still have questions?</h3>
              <p className="text-blue-200 text-sm">Our iPhone experts reply in under 2 minutes on WhatsApp.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="https://wa.me/254708267513" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-3 bg-white text-[#0071E3] font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
              <Link href="/contact" className="px-5 py-3 bg-white/15 text-white font-bold rounded-xl text-sm hover:bg-white/25 transition-colors border border-white/20">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type":"Question", name:f.q, acceptedAnswer:{"@type":"Answer", text:f.a} })),
      }) }} />
    </section>
  );
}
