import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

const proof = [
  "50-point device inspection on every refurbished iPhone",
  "Printed battery health certificate included",
  "IMEI verified — never blacklisted, never stolen",
  "Grade A only — no Grade B or C devices sold",
  "Genuine Apple parts used in any repairs",
  "iOS factory reset and updated before dispatch",
];

const stats = [
  { num:"10,000+", lbl:"Customers" },
  { num:"4.8★",    lbl:"Rating" },
  { num:"47",       lbl:"Counties" },
  { num:"< 2 min",  lbl:"WA Reply" },
];

export default function AboutSnippet() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: image collage */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#F5F5F7] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85"
                alt="Multiple iPhones"
                fill
                className="object-cover"
                sizes="(max-width:1024px)100vw,50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-4 gap-2">
              {stats.map(({ num, lbl }) => (
                <div key={lbl} className="bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg border border-white">
                  <div className="text-base font-black text-[#1D1D1F] tracking-tight leading-none">{num}</div>
                  <div className="text-[9px] text-[#6E6E73] mt-0.5 font-semibold">{lbl}</div>
                </div>
              ))}
            </div>

            {/* Top-right badge */}
            <div className="absolute -top-4 -right-4 bg-[#0071E3] text-white rounded-2xl px-4 py-3 shadow-xl flex flex-col items-center">
              <MapPin size={22} className="fill-white/30" />
              <p className="text-[10px] font-bold mt-1 opacity-80">Proudly Kenyan</p>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="heading-2 text-[#1D1D1F] mb-5 leading-tight">
              Kenya&apos;s Most Trusted<br />iPhone Retailer
            </h2>
            <p className="text-[#6E6E73] leading-relaxed mb-5 text-base">
              We started with a simple belief: every Kenyan deserves access to premium Apple technology. Chomly Gadgets KE-Deals was built to eliminate counterfeit devices, inflated pricing, and non-existent after-sales support from the Kenyan market.
            </p>
            <p className="text-[#6E6E73] leading-relaxed mb-8 text-base">
              Every device we sell — new or refurbished — is authenticated by our certified technicians. We&apos;re not just a shop. We&apos;re your Apple experts.
            </p>

            {/* Proof list */}
            <ul className="space-y-2.5 mb-8">
              {proof.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]">
                  <CheckCircle size={16} className="text-[#30D158] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-blue">
                Read Our Story <ArrowRight size={15} />
              </Link>
              <a href="https://wa.me/254708267513" className="btn btn-outline-dark">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
