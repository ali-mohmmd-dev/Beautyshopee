"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useShop } from "../shop-provider";

export function ProductActions({ id, name }: { id: string; name: string }) {
  const { add, openCart, wishlist, toggleWish } = useShop();
  const wished = wishlist.includes(id);

  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => {
          add(id);
          openCart();
        }}
        className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        <ShoppingBag size={16} aria-hidden="true" /> Add to cart
      </button>
      <button
        type="button"
        aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
        aria-pressed={wished}
        onClick={() => toggleWish(id)}
        className="border hairline px-4 transition-colors hover:bg-accent"
      >
        <Heart size={19} aria-hidden="true" className={wished ? "fill-foreground" : undefined} />
      </button>
    </div>
  );
}
