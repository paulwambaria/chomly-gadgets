import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Chomly Gadgets KE-Deals. WhatsApp, call, or visit our Nairobi store. We're available Mon–Fri 8AM–6PM.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "0708 267 513",
    href: "tel:+254708267513",
    color: "#0071E3",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "0708 267 513",
    href: "https://wa.me/254708267513",
    color: "#25D366",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@chomlygadgets.co.ke",
    href: "mailto:hello@chomlygadgets.co.ke",
    color: "#FF9F0A",
  },
  {
    icon: MapPin,
    title: "Physical Store",
    value: "H H Towers, Basement, Shop B06",
    href: "https://maps.google.com/?q=HH+Towers+Nairobi",
    color: "#FF3B30",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon–Fri: 8AM–6PM, Sat: 9AM–5PM",
    href: null,
    color: "#5856D6",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1D1D1F] to-[#0D0D0D] text-white py-16 md:py-20">
        <div className="wrap text-center">
          <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We&apos;d Love to Hear from You</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Whether you need help choosing an iPhone, have a question about your order, or want to trade in your device — we&apos;re here!
          </p>
        </div>
      </div>

      <div className="wrap py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map(({ icon: Icon, title, value, href, color }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{title}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-[#1D1D1F]">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick WhatsApp CTA */}
            <a
              href="https://wa.me/254708267513?text=Hello%2C%20I%27d%20like%20to%20ask%20about%20iPhones%20at%20Chomly%20Gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#20B858] transition-colors"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp Now
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="Kamau" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="john@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]" placeholder="0712 345 678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] appearance-none bg-white">
                    <option>I want to buy an iPhone</option>
                    <option>Trade-in enquiry</option>
                    <option>Order tracking</option>
                    <option>Warranty claim</option>
                    <option>General question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] resize-none" placeholder="Tell us how we can help…" />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-base justify-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-10 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <p className="font-semibold text-gray-700">Chomly Gadgets KE-Deals</p>
              <p className="text-gray-500 text-sm">H H Towers, Basement, Shop B06</p>
              <a
                href="https://maps.google.com/?q=HH+Towers+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#0071E3] text-sm font-medium hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
