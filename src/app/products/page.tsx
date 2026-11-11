import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/features/storefront/components/product-listing";

export const metadata: Metadata = {
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
