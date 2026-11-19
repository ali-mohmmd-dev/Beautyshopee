import { cmsMetadata } from "@/lib/cms";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/features/storefront/components/product-listing";

const fallbackMetadata: Metadata = {
  title: "Products",
  description: "Browse makeup favourites and beauty sets from Beauty Shoppee Tirur.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductListing />
    </Suspense>
  );
}

export async function generateMetadata() {
  return cmsMetadata("products", fallbackMetadata);
}
