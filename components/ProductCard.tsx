import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Zap } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];

  return (
    <div className="product-card flex flex-col group">
      {/* Image container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative overflow-hidden"
        style={{ aspectRatio: "1", background: "#F5F5F7" }}
      >
        {img ? (
          <Image
            src={img.url}
            alt={img.alt}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl">📱</div>
        )}


        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={product.condition === "new" ? "badge badge-new" : "badge badge-refurb"}>
            {product.condition === "new" ? "New" : "Refurb"}
          </span>
          {product.discount && product.discount >= 15 && (
            <span className="badge badge-sale">-{product.discount}%</span>
          )}
        </div>

        {/* Battery health bottom-left */}
        {product.batteryHealth && (
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur rounded-full">
            <Zap size={10} color="#30D158" />
            <span className="text-white text-[10px] font-bold">{product.batteryHealth}%</span>
          </div>
        )}

        {/* Wishlist top-right */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#C7C7CC] hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 shadow-sm">
          <Heart size={14} />
        </button>
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <p className="font-semibold text-[#1D1D1F] text-sm leading-snug hover:text-[#0071E3] transition-colors line-clamp-2 mb-2">
            {product.name}
          </p>
        </Link>

        {/* Storage options */}
        {product.storage.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.storage.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 bg-[#F5F5F7] text-[#6E6E73] rounded-full border border-[#E8E8ED] font-medium">
                {s}
              </span>
            ))}
            {product.storage.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 bg-[#F5F5F7] text-[#6E6E73] rounded-full border border-[#E8E8ED]">
                +{product.storage.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={11} fill={s <= Math.round(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[11px] text-[#6E6E73]">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Warranty */}
        <p className="text-[11px] font-semibold text-[#30D158] mb-3">
          ✓ {product.warranty}
        </p>

        {/* Price + actions */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-[#1D1D1F] tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#C7C7CC] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <AddToCartButton product={product} compact />
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 text-center py-2.5 text-xs font-bold text-[#0071E3] border border-[#0071E3] rounded-xl hover:bg-[#0071E3] hover:text-white transition-all"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
