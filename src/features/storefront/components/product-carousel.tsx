"use client";

import Link from "next/link";
import { PRODUCTS, searchProducts } from "../catalog";
import { useShop } from "../shop-provider";
import { ProductCard } from "./product-card";

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
        <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:mt-12 sm:gap-6 sm:scroll-pl-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:scroll-pl-0 lg:px-0">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              overlay
              className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
              sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          ))}
        </div>
      )}
    </section>
  );
}
