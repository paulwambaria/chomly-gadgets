import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F5F7]">
      <div className="text-center max-w-md p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart size={28} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#1D1D1F] mb-3">Your Wishlist</h1>
        <p className="text-gray-500 mb-8">Save your favourite iPhones here and come back when you&apos;re ready to buy.</p>
        <Link href="/shop" className="btn-primary text-base px-8 py-4">
          Browse iPhones <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
