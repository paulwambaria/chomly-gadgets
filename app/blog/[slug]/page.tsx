import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, Tag, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.image }] },
  };
}

const fullContent: Record<string, string[]> = {
  "best-iphones-kenya-2024": [
    "Choosing the right iPhone in Kenya depends on your budget and priorities. Here's our definitive guide for 2024.",
    "For those on a tight budget (under KES 30,000), the refurbished iPhone 11 remains one of the best-value smartphones you can buy. It features the A13 Bionic chip, an excellent dual-camera system, and runs the latest iOS. Battery health on our Grade A units averages 87-90%.",
    "In the mid-range (KES 30,000–60,000), the refurbished iPhone 13 is the standout choice. With A15 Bionic, 5G connectivity, and an average battery health of 90-95% on Chomly devices, it competes comfortably with current Android flagships.",
    "For those who want the best value in a new iPhone, the iPhone 15 at KES 115,000 offers USB-C, a 48MP camera, Dynamic Island, and is guaranteed to receive iOS updates for years to come.",
    "If money is no object, the iPhone 16 Pro Max is the ultimate — with A18 Pro, Camera Control, and a stunning 6.9\" ProMotion display.",
    "Bottom line: Don't overspend. For most Kenyans, a refurbished iPhone 12 or 13 offers 90% of the flagship experience at half the price.",
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = fullContent[slug] ?? [post.excerpt, "Full article coming soon. Check back or WhatsApp us for expert advice."];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Chomly Gadgets KE-Deals" },
    publisher: { "@type": "Organization", name: "Chomly Gadgets KE-Deals" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="min-h-screen bg-white">
        {/* Hero image */}
        <div className="relative h-72 md:h-[440px] bg-gray-900">
          <Image src={post.image} alt={post.title} fill className="object-cover opacity-70" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 wrap py-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-[#0071E3] text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                <Tag size={10} /> {post.category}
              </span>
              <span className="text-white/60 text-xs flex items-center gap-1.5">
                <Clock size={10} /> {post.readTime} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{post.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="wrap py-12 grid lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <p className="text-lg text-gray-500 leading-relaxed mb-8 border-b border-gray-100 pb-6">{post.excerpt}</p>

            <div className="prose prose-gray max-w-none space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed text-base">{para}</p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Share:</span>
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + "https://chomlygadgets.co.ke/blog/" + post.slug)}`} className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Share2 size={14} />
                </a>
              </div>
              <Link href="/shop" className="btn-primary text-sm">
                Shop iPhones <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div className="bg-[#0071E3] rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">Need Expert Advice?</h3>
                <p className="text-blue-100 text-sm mb-4">Chat with our iPhone experts on WhatsApp.</p>
                <a href="https://wa.me/254708267513" className="block text-center py-2.5 bg-white text-[#0071E3] font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors">
                  WhatsApp Us
                </a>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#1D1D1F] mb-4 text-sm">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image src={r.image} alt={r.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors line-clamp-2 leading-snug">{r.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{r.readTime} min</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
