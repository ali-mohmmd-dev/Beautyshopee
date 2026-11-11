import type { Product } from "../catalog";
import { ProductCard } from "./product-card";

export function ProductSlider({ products }: { products: readonly Product[] }) {
  return (
    <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:mt-12 sm:gap-6 sm:scroll-pl-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:scroll-pl-0 lg:px-0">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          overlay
          className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      ))}
    </div>
  );
}
