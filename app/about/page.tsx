import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Award, Users, MapPin, ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Chomly Gadgets KE-Deals — Kenya's trusted source for new and refurbished iPhones since our founding. Our mission, team, and commitment to quality.",
};

const values = [
  {
    icon: Shield,
    title: "Authenticity",
    desc: "Every device we sell is genuine Apple hardware. We source directly from authorized channels and reject counterfeits.",
  },
  {
    icon: Award,
    title: "Quality Standards",
    desc: "Our certified technicians put every refurbished device through a 50-point inspection covering hardware, software, battery, and cosmetics.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "We answer WhatsApp messages within minutes, not hours. Your satisfaction is our priority, not just our slogan.",
  },
  {
    icon: MapPin,
    title: "Kenyan Pride",
    desc: "Born and built in Nairobi. We understand what Kenyans need and provide technology that fits our lifestyle and budget.",
  },
];

const team = [
  { name: "Alex Muthoni", role: "Founder & CEO", bg: "from-blue-400 to-blue-600" },
  { name: "Sarah Wanjiku", role: "Head of Quality", bg: "from-purple-400 to-purple-600" },
  { name: "Kevin Otieno", role: "Customer Experience", bg: "from-green-400 to-green-600" },
  { name: "Diana Njeri", role: "Sales & Marketing", bg: "from-orange-400 to-orange-600" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1D1D1F] via-[#0D1B2E] to-[#0A0A0A] text-white py-20 md:py-28">
        <div className="wrap text-center max-w-3xl mx-auto">
          <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Making Premium Technology Accessible to Every Kenyan
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            We started with a simple belief: every Kenyan deserves access to the world&apos;s best smartphone. Chomly Gadgets KE-Deals was built to bridge the gap between premium Apple devices and everyday Kenyan budgets.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <section className="py-16 bg-white">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-3xl font-bold text-[#1D1D1F] mb-5">Kenya&apos;s Most Trusted iPhone Retailer</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Chomly Gadgets KE-Deals was founded by a team of Apple enthusiasts who were tired of inflated prices, counterfeit devices, and poor after-sales service in the Kenyan smartphone market.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                We set out to create something different — a store where every device is verified, every customer is heard, and every price is fair. Today, we serve thousands of satisfied customers across all 47 counties of Kenya.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our refurbished iPhones go through a rigorous 50-point inspection process before reaching you. We disclose battery health percentages, cosmetic grades, and include a warranty on every device — because trust is everything.
              </p>
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                Shop Our Collection <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "10,000+", label: "Devices Sold" },
                { number: "4.8★", label: "Average Rating" },
                { number: "47", label: "Counties Served" },
                { number: "6", label: "Months Avg Warranty" },
              ].map(({ number, label }) => (
                <div key={label} className="bg-[#F5F5F7] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#0071E3] mb-1">{number}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F5F5F7]">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#0071E3]" />
                </div>
                <h3 className="font-bold text-[#1D1D1F] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refurb process */}
      <section className="py-16 bg-white">
        <div className="wrap max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-2">Our Process</p>
            <h2 className="text-3xl font-bold text-[#1D1D1F] mb-4">How We Certify Refurbished iPhones</h2>
            <p className="text-gray-500">Every refurbished device goes through our rigorous 50-point certification process.</p>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Sourcing", desc: "We source devices from verified suppliers including returns, trade-ins, and corporate fleet upgrades — never stolen or blacklisted phones." },
              { step: "02", title: "Inspection", desc: "Our certified technicians run a full 50-point hardware and software diagnostic covering display, battery, cameras, speakers, Face ID, and all sensors." },
              { step: "03", title: "Repair & Restoration", desc: "Any faulty components are replaced with original Apple parts. The device is deep-cleaned and the software is wiped and updated to the latest iOS." },
              { step: "04", title: "Grading", desc: "Devices are graded based on cosmetic condition: Grade A (near mint), Grade B (light scratches). We only sell Grade A." },
              { step: "05", title: "Packaging & Warranty", desc: "Each device is repackaged with new accessories (cable, adapter). A warranty card, battery health certificate, and IMEI documentation are included." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-[#0071E3] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {step}
                </div>
                <div className="flex-1 pb-5 border-b border-gray-100 last:border-0">
                  <h3 className="font-bold text-[#1D1D1F] mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[#F5F5F7]">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-2">The People</p>
            <h2 className="text-3xl font-bold text-[#1D1D1F]">Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {team.map(({ name, role, bg }) => (
              <div key={name} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-[#1D1D1F] mb-1">{name}</h3>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0071E3] to-[#0055B3] text-white">
        <div className="wrap text-center">
          <div className="flex justify-center mb-5">
            {[1,2,3,4,5].map((s) => <Star key={s} size={24} fill="currentColor" className="text-yellow-300" />)}
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Join 10,000+ happy customers who trust Chomly Gadgets for their Apple needs.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop" className="px-8 py-4 bg-white text-[#0071E3] font-bold rounded-full hover:bg-blue-50 transition-colors">
              Shop Now
            </Link>
            <a href="https://wa.me/254708267513" className="px-8 py-4 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-colors border border-white/30">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
