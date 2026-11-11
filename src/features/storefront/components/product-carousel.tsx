"use client";

import Link from "next/link";
import { PRODUCTS, searchProducts } from "../catalog";
import { useShop } from "../shop-provider";
import { ProductSlider } from "./product-slider";

export function ProductCarousel() {
  const { query } = useShop();
  const visible = searchProducts(PRODUCTS, query);

  return (
    <section
      id="featured"
      className="mx-auto max-w-7xl overflow-x-clip px-4 pb-10 sm:px-6 sm:pb-20 lg:pb-28"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:items-end sm:gap-4">
        <h2 className="font-display text-3xl font-medium sm:text-5xl">
          {query.trim() ? `Results for “${query}”` : "Featured this week"}
        </h2>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 sm:min-h-0 sm:text-xs"
        >
          View all products
        </Link>
      </div>

      {visible.length === 0 ? (
        <p className="mt-5 text-sm text-muted-foreground sm:mt-12">
          No featured products matched “{query}”. Try “blush”, “lip” or “mascara”.
        </p>
      ) : (
        <ProductSlider products={visible} />
      )}
    </section>
  );
}
