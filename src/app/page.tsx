import type { Metadata } from "next";
import { BrandPillars } from "@/features/storefront/components/brand-pillars";
import { BundleShowcase } from "@/features/storefront/components/bundle-showcase";
import { CategoryGrid } from "@/features/storefront/components/category-grid";
import { CategorySlider } from "@/features/storefront/components/category-slider";
import { EditorialSpotlight } from "@/features/storefront/components/editorial-spotlight";
import { Hero } from "@/features/storefront/components/hero";
import { ProductCarousel } from "@/features/storefront/components/product-carousel";
import { Reviews } from "@/features/storefront/components/reviews";
import { VisitSection } from "@/features/storefront/components/visit-section";

const title = "Beauty Shoppee Tirur — Premium Cosmetics Store";

export const metadata: Metadata = {
  title: { absolute: title },
  description:
    "Tirur's trusted cosmetics store — authentic beauty brands, in-store testers and everyday offers. 1st Floor, New Bus Stand Building, Tirur, Kerala 676101. Rated 4.5 by 153 customers.",
  openGraph: {
    title,
    description:
      "Authentic brands, in-store testers and everyday offers at 1st Floor, New Bus Stand Building, Tirur, Kerala. Rated 4.5 by 153 customers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Authentic brands, in-store testers and everyday offers in Tirur, Kerala.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <CategorySlider /> */}
      <CategoryGrid />
      <ProductCarousel />
      <EditorialSpotlight />
      <BrandPillars />
      <BundleShowcase />
      <Reviews />
      <VisitSection />
    </>
  );
}
