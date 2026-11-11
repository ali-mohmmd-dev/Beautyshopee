"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { inr, type Product } from "../catalog";
import { useShop } from "../shop-provider";

export function ProductCard({
  product,
  sizes,
  className,
  overlay = false,
}: {
  product: Product;
  sizes: string;
  className?: string;
  overlay?: boolean;
}) {
  const { add, wishlist, toggleWish } = useShop();
  const wished = wishlist.includes(product.id);
  const href = `/products/${product.id}`;
  const quickAdd = (
    <button
      type="button"
      onClick={() => add(product.id)}
      className={
        overlay
          ? "absolute inset-x-2 bottom-2 min-h-11 bg-foreground/95 py-2.5 text-xs font-medium text-background transition-opacity sm:inset-x-3 sm:bottom-3 sm:min-h-0 sm:text-[10px] lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
          : "mt-3 min-h-11 w-full border hairline py-2.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background sm:min-h-0"
      }
    >
      Quick add
    </button>
  );

  return (
    <article className={`min-w-0 ${className ?? ""}`}>
      <div className="group relative overflow-hidden bg-secondary">
        <Link href={href} aria-label={`View ${product.name}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            sizes={sizes}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        </Link>
        {product.tag && (
          <span className="pointer-events-none absolute left-2 top-2 bg-card px-2 py-1 text-[9px] font-medium sm:left-3 sm:top-3 sm:px-2.5">
            {product.tag === "BESTSELLER" ? "Bestseller" : "New"}
          </span>
        )}
        <button
          type="button"
          aria-label={
            wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          aria-pressed={wished}
          onClick={() => toggleWish(product.id)}
          className="absolute right-1 top-1 bg-card/90 p-2 backdrop-blur-sm max-sm:touch-target sm:right-3 sm:top-3"
        >
          <Heart size={16} strokeWidth={1.5} className={wished ? "fill-foreground" : undefined} />
        </button>
        {overlay && quickAdd}
      </div>
      <div className="flex flex-col items-start justify-between gap-1 pt-3 sm:flex-row sm:gap-2 sm:pt-4">
        <div>
          <h3 className="text-sm font-medium">
            <Link href={href} className="hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">{product.code}</p>
        </div>
        <p className="text-sm">{inr(product.price)}</p>
      </div>
      {!overlay && quickAdd}
    </article>
  );
}
