"use client";

import Link from "next/link";

const APPLE = "https://www.apple.com";

/* Apple.com official feature photography */
const features = [
  {
    title: "Apple Intelligence",
    sub: "iPhone 15 Pro · iPhone 16",
    desc: "Writing tools, Image Playground, priority notifications, and a smarter Siri. All processed on-device for complete privacy.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/ios__8z58j1o80yqi_large.jpg`,
    fallback: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=700&q=85",
    accent: "#BF5AF2",
    href: "/shop?q=iphone+16",
  },
  {
    title: "48MP Pro Camera",
    sub: "iPhone 15 Pro · iPhone 16 Pro",
    desc: "48MP Fusion camera, Camera Control button, 5× optical zoom, and ProRes 4K video. Replace a professional camera.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/camera__dez4cvpw83sm_large.jpg`,
    fallback: "https://images.unsplash.com/photo-1621768216002-5ac171661b23?auto=format&fit=crop&w=700&q=85",
    accent: "#FF9F0A",
    href: "/shop?q=iphone+16+pro",
  },
  {
    title: "Emergency SOS Satellite",
    sub: "iPhone 14 · 15 · 16",
    desc: "Connect to emergency services anywhere in Kenya — even without cell signal or Wi-Fi. Crash Detection included.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/safety__grtwyqpan8yi_large.jpg`,
    fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=85",
    accent: "#FF3B30",
    href: "/shop?series=iphone-14",
  },
  {
    title: "Privacy Built In",
    sub: "Every iPhone",
    desc: "Face ID, App Tracking Transparency, Private Relay, Lockdown Mode. Apple never builds a profile of you.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/privacy__cv4ztv5gebyq_large.jpg`,
    fallback: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=85",
    accent: "#30D158",
    href: "/shop",
  },
];

const bottomFeatures = [
  {
    label: "A18 Pro Chip",
    desc: "The fastest chip ever in a smartphone. Built for Apple Intelligence. 6-core GPU, 6-core CPU, 16-core Neural Engine.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/chip__fh5j5on49p2e_large.jpg`,
    accent: "#BF5AF2",
  },
  {
    label: "MagSafe + USB-C",
    desc: "Magnetic snap-on accessories from iPhone 12+. USB-C with USB 3 speeds from iPhone 15 Pro. Charge, snap, go.",
    img: `${APPLE}/v/iphone/home/cj/images/overview/consider/designed-to_last__f60bwgep88ya_large.jpg`,
    accent: "#0071E3",
  },
];

export default function AppleFeatures() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="wrap">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Apple Technology</p>
          <h2 className="heading-2 text-white mb-4">Everything Apple Provides</h2>
          <p className="text-[#6E6E73] max-w-xl mx-auto">
            Every genuine Apple device we sell comes with the full ecosystem — hardware, software, and services working seamlessly together.
          </p>
        </div>

        {/* 4-feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {features.map(({ title, sub, desc, img, fallback, accent, href }) => (
            <Link key={title} href={href}
              className="group relative rounded-3xl overflow-hidden bg-[#1C1C1E] flex flex-col hover:-translate-y-1 transition-transform duration-300"
              style={{ minHeight: 340 }}>

              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C1C1E]" />
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: accent }}>{sub}</p>
                <h3 className="text-white font-black text-lg leading-tight tracking-tight mb-2">{title}</h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed flex-1">{desc}</p>
                <p className="mt-4 text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200" style={{ color: accent }}>
                  Shop Now →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 2 wide cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {bottomFeatures.map(({ label, desc, img, accent }) => (
            <div key={label} className="relative rounded-3xl overflow-hidden bg-[#1C1C1E] flex items-center gap-0" style={{ minHeight: 160 }}>
              <img
                src={img}
                alt={label}
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
              />
              <div className="relative z-10 p-7 md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: accent }}>{label}</p>
                <h3 className="text-white font-black text-xl md:text-2xl tracking-tight mb-2">{label === "A18 Pro Chip" ? "The fastest chip in any phone." : "Charge. Snap. Go."}</h3>
                <p className="text-[#6E6E73] text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* iOS banner */}
        <div className="mt-4 relative rounded-3xl overflow-hidden bg-[#1C1C1E]" style={{ minHeight: 180 }}>
          <img
            src={`${APPLE}/v/iphone/home/cj/images/overview/consider/ios__8z58j1o80yqi_large.jpg`}
            alt="iOS 18"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
          />
          <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#30D158] text-xs font-bold uppercase tracking-widest mb-2">iOS 18 · Included Free</p>
              <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight mb-2">The world's most advanced mobile OS.</h3>
              <p className="text-[#6E6E73] text-sm max-w-xl">Every iPhone we sell is updated to the latest iOS. Apple Intelligence, customisable Control Centre, Lock Screen widgets, RCS messaging — all included.</p>
            </div>
            <Link href="/shop" className="shrink-0 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "#30D158" }}>
              Explore iOS 18 →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
