"use client";

import { useCatalog, useCms } from "../cms-context";
import { useSectionContent } from "../cms-context";
import Link from "next/link";
import { PRODUCTS } from "../catalog";
import { ProductSlider } from "./product-slider";

export function ProductCarousel() {
  const content = useSectionContent("product-carousel");

  const records = useCms();
  const catalog = useCatalog(PRODUCTS);
  const featuredIds = records
    .filter((record) => record.kind === "products" && record.data["featured"])
    .map((record) => record.slug);
  const featured = records.length
    ? catalog.filter((product) => featuredIds.includes(product.id))
    : catalog;
  return (
    <section
      id="featured"
      className="mx-auto max-w-7xl overflow-x-clip px-4 pb-10 sm:px-6 sm:pb-20 lg:pb-28"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:items-end sm:gap-4">
        <h2 className="font-display text-3xl font-medium sm:text-5xl">
          {content.text("text-0", "Featured this week")}
        </h2>
        <Link
          href={content.text("href-1", "/products")}
          className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 sm:min-h-0 sm:text-xs"
        >
          {content.text("text-2", "View all products")}
        </Link>
      </div>

      <ProductSlider products={featured} />
    </section>
  );
}
