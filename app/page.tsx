import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import TrustBadges from "@/components/TrustBadges";
import BestSellers from "@/components/BestSellers";
import FeaturedDeals from "@/components/FeaturedDeals";
import AppleFeatures from "@/components/AppleFeatures";
import CustomerReviews from "@/components/CustomerReviews";
import AboutSnippet from "@/components/AboutSnippet";
import FAQSection from "@/components/FAQSection";
import { getBestSellers, getRefurbishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Chomly Gadgets KE-Deals | Best iPhone Prices in Kenya",
  description:
    "Shop new and certified refurbished iPhones in Kenya. iPhone X to iPhone 16 Pro Max with warranty, M-Pesa payment, and nationwide delivery. Starting from KES 16,000.",
};

export default function HomePage() {
  const bestSellers = getBestSellers();
  const refurbished = getRefurbishedProducts();

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrustBadges />
      <BestSellers products={bestSellers} />
      <AppleFeatures />
      <FeaturedDeals products={refurbished} />
      <CustomerReviews />
      <AboutSnippet />
      <FAQSection />
    </>
  );
}
