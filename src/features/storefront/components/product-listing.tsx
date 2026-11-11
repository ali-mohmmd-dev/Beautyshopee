"use client";

import { Search } from "lucide-react";
import { CATALOG, searchProducts } from "../catalog";
import { useShop } from "../shop-provider";
import { ProductCard } from "./product-card";

export function ProductListing() {
  const { query, setQuery } = useShop();
  const products = searchProducts(CATALOG, query);

  return (
    <section
      aria-labelledby="catalog-title"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4 sm:gap-6 sm:pb-6">
        <div>
          <h1 id="catalog-title" className="font-display text-3xl font-medium">
            Shop the edit
          </h1>
          <p role="status" className="mt-2 text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <div className="flex w-full items-center gap-3 border hairline bg-card px-4 sm:w-80">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            aria-label="Filter products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection"
            className="min-w-0 flex-1 bg-transparent py-3 text-base sm:text-sm"
          />
        </div>
      </div>
      {products.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, 50vw"
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No products match “{query.trim()}”.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 min-h-11 px-3 text-sm underline underline-offset-4"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
