import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F5F5F7]">
      <div className="text-center max-w-md px-6">
        <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
        <h2 className="text-2xl font-bold text-[#1D1D1F] mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to shopping!</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-secondary">Go Home</Link>
          <Link href="/shop" className="btn-primary">
            Shop iPhones <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
