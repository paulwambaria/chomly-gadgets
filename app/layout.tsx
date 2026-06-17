import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/lib/cart";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chomlygadgets.co.ke"),
  title: {
    default: "Chomly Gadgets KE-Deals | Premium New & Refurbished iPhones in Kenya",
    template: "%s | Chomly Gadgets KE-Deals",
  },
  description:
    "Kenya's trusted iPhone store. Shop new and certified refurbished iPhones (iPhone X to iPhone 16 Pro Max), accessories, and smart gadgets with warranty and nationwide delivery. M-Pesa accepted.",
  keywords: [
    "buy iPhone Kenya",
    "refurbished iPhone Nairobi",
    "iPhone price Kenya",
    "cheap iPhone Kenya",
    "iPhone 15 Kenya",
    "iPhone 16 Kenya",
    "certified refurbished iPhone",
    "iPhone shop Nairobi",
    "buy iPhone online Kenya",
    "Chomly Gadgets",
    "iPhone deals Kenya",
    "AirPods Kenya",
    "Apple accessories Kenya",
  ],
  authors: [{ name: "Chomly Gadgets KE-Deals" }],
  creator: "Chomly Gadgets KE-Deals",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.chomlygadgets.co.ke",
    siteName: "Chomly Gadgets KE-Deals",
    title: "Chomly Gadgets KE-Deals | Premium iPhones & Gadgets in Kenya",
    description:
      "Shop new and refurbished iPhones from KES 16,000. Warranty included, nationwide delivery, M-Pesa accepted.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chomly Gadgets KE-Deals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chomly Gadgets KE-Deals | iPhones in Kenya",
    description: "Premium new & refurbished iPhones with warranty. Free delivery Nairobi. M-Pesa accepted.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.chomlygadgets.co.ke",
              name: "Chomly Gadgets KE-Deals",
              image: "https://www.chomlygadgets.co.ke/og-image.jpg",
              description:
                "Kenya's trusted smartphone retailer specialising in new and refurbished iPhones, accessories, and smart gadgets.",
              url: "https://www.chomlygadgets.co.ke",
              telephone: "+254708267513",
              address: {
                "@type": "PostalAddress",
                streetAddress: "H H Towers, Basement, Shop B06",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.286389,
                longitude: 36.817223,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              priceRange: "KES 16,000 — KES 200,000",
              currenciesAccepted: "KES",
              paymentAccepted: "M-Pesa, Credit Card, Bank Transfer, Cash",
              sameAs: [
                "https://www.facebook.com/chomlygadgets",
                "https://www.instagram.com/chomlygadgets",
                "https://twitter.com/chomlygadgets",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Preloader />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
