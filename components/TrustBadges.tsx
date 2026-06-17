import { ShieldCheck, RefreshCcw, Truck, Lock, Headphones, Award, Zap, RotateCcw, Users, Star, MapPin, MessageCircle } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "100% Genuine",    desc: "Every device is authentic Apple — IMEI verified and blacklist-checked.",  color: "#0071E3" },
  { icon: Award,       label: "Grade A Only",    desc: "We reject anything less than Grade A. Only near-mint refurbished.",         color: "#30D158" },
  { icon: RefreshCcw,  label: "50-Point Check",  desc: "Screen, battery, cameras, Face ID, speakers — all tested before dispatch.",color: "#FF9F0A" },
  { icon: Zap,         label: "Battery Cert.",   desc: "Printed battery health certificate with every refurbished device.",          color: "#BF5AF2" },
  { icon: Truck,       label: "Fast Delivery",   desc: "Same/next day Nairobi. Countrywide in 1–3 days via G4S & Fargo.",         color: "#5E5CE6" },
  { icon: Lock,        label: "M-Pesa & Cards",  desc: "M-Pesa Paybill, Visa, Mastercard, bank transfer. 100% secure.",            color: "#FF6B35" },
  { icon: RotateCcw,   label: "Trade-In",        desc: "Trade in your old iPhone for instant credit. Quick WhatsApp valuation.",   color: "#32ADE6" },
  { icon: Headphones,  label: "2-Min Support",   desc: "Real experts on WhatsApp. Average reply: under 2 minutes.",               color: "#FF2D55" },
];

const stats = [
  { num: "10,000+", label: "Happy Customers", Icon: Users,          color: "#0071E3" },
  { num: "4.8 / 5", label: "Google Rating",   Icon: Star,           color: "#FF9F0A" },
  { num: "47",       label: "Counties Served", Icon: MapPin,         color: "#30D158" },
  { num: "< 2 min",  label: "WhatsApp Reply",  Icon: MessageCircle,  color: "#25D366" },
];

export default function TrustBadges() {
  return (
    <section className="py-20 md:py-28" style={{ background: "#F5F5F7" }}>
      <div className="wrap">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Why Chomly?</p>
          <h2 className="heading-2 text-[#1D1D1F] mb-4">
            Kenya&apos;s Most Trusted iPhone Store
          </h2>
          <p className="text-[#6E6E73] max-w-lg mx-auto text-base">
            Since day one, our promise has been simple: genuine products, fair prices, and service that doesn&apos;t stop when you close your wallet.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14">
          {items.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="group bg-white rounded-2xl p-5 border border-[#E8E8ED] hover:border-transparent hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${color}18` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <p className="font-bold text-[#1D1D1F] text-sm mb-1.5">{label}</p>
              <p className="text-[#6E6E73] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#D2D2D7] rounded-2xl overflow-hidden">
          {stats.map(({ num, label, Icon, color }) => (
            <div key={label} className="bg-white px-6 py-6 text-center">
              <div className="flex justify-center mb-2"><Icon size={26} style={{ color }} /></div>
              <div className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight mb-0.5">{num}</div>
              <div className="text-xs text-[#6E6E73] font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
