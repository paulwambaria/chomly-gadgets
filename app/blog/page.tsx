import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — iPhone Buying Guides, Tips & Reviews in Kenya",
  description: "Expert guides on buying iPhones in Kenya, refurbished vs new comparisons, battery tips, and the latest iPhone reviews. Updated weekly.",
};

const categories = ["All", "Buying Guide", "Comparison", "Tips & Tricks", "Reviews", "Consumer Tips"];

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10">
        <div className="wrap">
          <p className="text-[#0071E3] font-semibold text-sm uppercase tracking-widest mb-2">Knowledge Hub</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">iPhone Tips, Guides & Reviews</h1>
          <p className="text-gray-500 max-w-xl">Expert advice to help you choose the right iPhone, care for your device, and get the most value in Kenya.</p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All"
                    ? "bg-[#0071E3] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap py-12">
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 grid md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto min-h-[240px] bg-gray-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0071E3] text-white text-xs font-bold rounded-full">
                  Featured
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-[#0071E3] text-xs font-semibold rounded-full">{featured.category}</span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} /> {featured.readTime} min read
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-3 group-hover:text-[#0071E3] transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-500 mb-5 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-[#0071E3] font-medium text-sm">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#0071E3] text-xs font-semibold rounded-full flex items-center gap-1">
                    <Tag size={10} /> {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={10} /> {post.readTime} min
                  </span>
                </div>
                <h3 className="font-bold text-[#1D1D1F] mb-2 group-hover:text-[#0071E3] transition-colors leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                  <span>{new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span className="flex items-center gap-1 text-[#0071E3] font-medium">Read <ArrowRight size={12} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-14 bg-gradient-to-r from-[#1D1D1F] to-[#0D0D0D] rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Get the Latest iPhone News</h3>
          <p className="text-gray-400 mb-6">Weekly deals, buying guides, and tech tips delivered to your inbox.</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
            />
            <button type="submit" className="btn-primary px-6 shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
