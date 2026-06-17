import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Truck, Zap, ChevronRight, Sparkles, Layers, Magnet, Camera, Film, Signal, Satellite, ScanFace, Aperture, Cpu, LucideIcon } from "lucide-react";
import { getProductBySlug, getRelatedProducts, formatPrice, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";
import { Product } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.condition === "refurbished" ? "Certified Refurbished" : "Brand New"} | ${formatPrice(product.price)}`,
    description: `Buy ${product.name} in Kenya. ${product.condition === "refurbished" ? `Certified Grade A refurbished with ${product.batteryHealth}% battery health.` : "Brand new sealed in box."} ${product.warranty}. ${formatPrice(product.price)}. M-Pesa accepted, nationwide delivery.`,
    openGraph: {
      images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
    },
  };
}

const SPEC_LABELS: Record<string, string> = {
  display: "Display",
  chip: "Chip",
  camera: "Camera System",
  battery: "Battery Life",
  os: "Operating System",
  network: "Connectivity",
};

function getAppleFeatures(p: Product): { Icon: LucideIcon; label: string; desc: string }[] {
  const tags = p.tags ?? [];
  const chip = p.specs.chip ?? "";
  const series = p.series ?? "";
  const features: { Icon: LucideIcon; label: string; desc: string }[] = [];

  const seriesNum = parseInt(series.replace("iPhone ", ""));

  if (chip.includes("A18")) features.push({ Icon: Sparkles, label: "Apple Intelligence", desc: "Writing tools, image creation, Siri upgrades" });
  if (tags.includes("dynamic-island") || series === "iPhone 14" && p.name.includes("Pro") || seriesNum >= 15)
    features.push({ Icon: Layers, label: "Dynamic Island", desc: "Alerts & Live Activities right at the top" });
  if (tags.includes("magsafe") || seriesNum >= 12)
    features.push({ Icon: Magnet, label: "MagSafe", desc: "Snap-on magnetic charging & accessories" });
  if (tags.includes("usb-c") || seriesNum >= 15)
    features.push({ Icon: Zap, label: "USB-C", desc: "Up to USB 3 speeds on Pro models" });
  if (p.specs.camera?.includes("48MP"))
    features.push({ Icon: Camera, label: "48MP Main Camera", desc: "More pixels, more detail, more versatility" });
  if (chip.includes("Pro"))
    features.push({ Icon: Film, label: "ProRes Video", desc: "Cinema-grade video on your iPhone" });
  if (p.specs.display?.includes("ProMotion") || p.specs.display?.includes("120Hz"))
    features.push({ Icon: Sparkles, label: "ProMotion 120Hz", desc: "Ultra-smooth scrolling and motion" });
  if (tags.includes("5g") || p.specs.network?.includes("5G"))
    features.push({ Icon: Signal, label: "5G", desc: "Blazing fast downloads and streaming" });
  if (seriesNum >= 14)
    features.push({ Icon: Satellite, label: "Emergency SOS Satellite", desc: "Connect to emergency services with no signal" });
  if (seriesNum >= 12)
    features.push({ Icon: ScanFace, label: "Face ID", desc: "Secure biometric authentication" });
  if (p.name.includes("16"))
    features.push({ Icon: Aperture, label: "Camera Control", desc: "Dedicated hardware button for photos & video" });
  if (p.specs.chip?.includes("Bionic") || p.specs.chip?.includes("Pro"))
    features.push({ Icon: Cpu, label: "Neural Engine", desc: "On-device machine learning and AI" });

  return features.slice(0, 8);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const appleFeatures = getAppleFeatures(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => i.url),
    description: product.description,
    brand: { "@type": "Brand", name: "Apple" },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Chomly Gadgets KE-Deals" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#F5F5F7] border-b border-[#E8E8ED]">
          <div className="wrap py-3">
            <nav className="flex items-center gap-2 text-sm text-[#6E6E73]">
              <Link href="/" className="hover:text-[#0071E3] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/shop" className="hover:text-[#0071E3] transition-colors">Shop</Link>
              <ChevronRight size={14} />
              <span className="text-[#1D1D1F] font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="wrap py-10 md:py-14">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Image gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F5F5F7]">
                {product.images[0] && (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className={product.condition === "new" ? "badge badge-new" : "badge badge-refurb"}>
                    {product.condition === "new" ? "Brand New" : "Grade A Refurbished"}
                  </span>
                </div>
                {product.discount && (
                  <div className="absolute top-4 right-4 badge badge-sale">-{product.discount}%</div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#0071E3] cursor-pointer bg-[#F5F5F7]">
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                    </div>
                  ))}
                </div>
              )}

              {/* Apple Features — desktop below images */}
              {appleFeatures.length > 0 && (
                <div className="hidden lg:block rounded-2xl bg-[#F5F5F7] p-5 mt-2">
                  <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-widest mb-4">Apple Features</p>
                  <div className="grid grid-cols-2 gap-3">
                    {appleFeatures.map(({ Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-2.5">
                        <Icon size={16} className="shrink-0 mt-0.5 text-[#0071E3]" />
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1F] leading-tight">{label}</p>
                          <p className="text-[11px] text-[#6E6E73] leading-snug mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Product info */}
            <div>
              <div className="mb-5">
                <div className="flex items-center gap-2 text-sm text-[#6E6E73] mb-2">
                  <span>{product.series}</span>
                  {product.batteryHealth && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[#30D158] font-semibold">
                        <Zap size={12} /> {product.batteryHealth}% Battery Health
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] tracking-tight mb-3">{product.name}</h1>

                <div className="flex items-center gap-3">
                  <div className="flex stars">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={16} fill={s <= Math.round(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm text-[#6E6E73]">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-[#F5F5F7]">
                <span className="text-4xl font-black text-[#1D1D1F] tracking-tight">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[#6E6E73] line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.discount && product.originalPrice && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Interactive selections + Add to cart */}
              <ProductActions product={product} />

              {/* Trust row */}
              <div className="grid grid-cols-3 gap-3 py-5 border-t border-[#F5F5F7] mt-5">
                {[
                  { icon: Shield, label: product.warranty, sub: "Guaranteed" },
                  { icon: Truck, label: "Free Delivery", sub: "Nairobi & beyond" },
                  { icon: Zap, label: "M-Pesa Ready", sub: "Pay instantly" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                      <Icon size={18} className="text-[#0071E3]" />
                    </div>
                    <p className="text-xs font-semibold text-[#1D1D1F]">{label}</p>
                    <p className="text-xs text-[#6E6E73]">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="mt-5 pt-5 border-t border-[#F5F5F7]">
                <h3 className="font-bold text-[#1D1D1F] mb-4">Technical Specifications</h3>
                <dl className="space-y-3">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-start gap-3 text-sm">
                      <dt className="w-28 shrink-0 font-medium text-[#6E6E73]">{SPEC_LABELS[key] ?? key}</dt>
                      <dd className="text-[#1D1D1F] font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Apple Features — mobile (below specs) */}
              {appleFeatures.length > 0 && (
                <div className="lg:hidden rounded-2xl bg-[#F5F5F7] p-5 mt-5">
                  <p className="text-xs font-bold text-[#6E6E73] uppercase tracking-widest mb-4">Apple Features</p>
                  <div className="grid grid-cols-2 gap-3">
                    {appleFeatures.map(({ Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-2.5">
                        <Icon size={16} className="shrink-0 mt-0.5 text-[#0071E3]" />
                        <div>
                          <p className="text-xs font-bold text-[#1D1D1F] leading-tight">{label}</p>
                          <p className="text-[11px] text-[#6E6E73] leading-snug mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-14 pt-10 border-t border-[#F5F5F7]">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-4">About This {product.category === "iphone" ? "iPhone" : "Product"}</h2>
                <p className="text-[#6E6E73] leading-relaxed">{product.description}</p>
                {product.condition === "refurbished" && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
                    <p className="font-bold text-green-800 text-sm mb-2">✓ Chomly Refurbishment Promise</p>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• 50-point inspection passed</li>
                      <li>• IMEI verified — not blacklisted</li>
                      <li>• Factory reset & latest iOS installed</li>
                      <li>• Battery health {product.batteryHealth}% certified in writing</li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">What&apos;s in the Box</h3>
                <ul className="space-y-2 text-sm text-[#6E6E73]">
                  <li className="flex items-center gap-2"><span className="text-[#30D158]">✓</span> {product.name}</li>
                  <li className="flex items-center gap-2"><span className="text-[#30D158]">✓</span> {product.condition === "new" ? "USB-C to USB-C Cable" : "USB Cable (compatible)"}</li>
                  {product.condition === "new" && <li className="flex items-center gap-2"><span className="text-[#30D158]">✓</span> Documentation & Apple SIM card tool</li>}
                  {product.condition === "refurbished" && <li className="flex items-center gap-2"><span className="text-[#30D158]">✓</span> Battery health certificate (printed)</li>}
                  <li className="flex items-center gap-2"><span className="text-[#30D158]">✓</span> Chomly {product.warranty}</li>
                </ul>
                <div className="mt-6 p-4 bg-[#F0F7FF] rounded-2xl border border-blue-100">
                  <p className="text-sm font-bold text-[#0071E3] mb-1">Questions? We reply in &lt;2 minutes</p>
                  <a href="https://wa.me/254708267513" className="text-sm text-[#6E6E73] hover:text-[#0071E3] transition-colors">
                    WhatsApp 0708 267 513 →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#F5F5F7]">
              <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
