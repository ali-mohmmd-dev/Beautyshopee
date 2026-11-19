"use client";
import { useState } from "react";
import { useShop } from "../shop-provider";
import { inr, type Product } from "../catalog";
export function VariantPicker({ product }: { product: Product }) {
  const variants = product.cmsVariants ?? [];
  const [sku, setSku] = useState(variants[0]?.sku ?? "");
  const variant = variants.find((v) => v.sku === sku) ?? variants[0];
  const { add, openCart } = useShop();
  if (!variant) return null;
  return (
    <div className="space-y-4">
      {variants.length > 1 && (
        <label className="block text-sm">
          Choose an option
          <select
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            className="mt-2 w-full border bg-background p-3"
          >
            {variants.map((item) => (
              <option key={item.sku} value={item.sku}>
                {item.options.map((option) => option.name + ": " + option.value).join(" · ") ||
                  item.sku}
                {item.unit !== "none" ? " · " + item.netQuantity + " " + item.unit : ""} —{" "}
                {inr(item.price)}
              </option>
            ))}
          </select>
        </label>
      )}
      <div className="flex justify-between text-sm">
        <span>
          {variant.unit !== "none"
            ? "Net quantity " + variant.netQuantity + " " + variant.unit
            : ""}
        </span>
        <strong>{inr(variant.price)}</strong>
      </div>
      {variant.image.url && (
        <img src={variant.image.url} alt={variant.image.alt} className="size-24 object-cover" />
      )}
      <button
        disabled={variant.stock <= 0}
        onClick={() => {
          add(variant.sku);
          openCart();
        }}
        className="min-h-11 w-full bg-foreground px-6 py-4 text-sm text-background disabled:opacity-50"
      >
        {variant.stock > 0 ? "Add to cart" : "Out of stock"}
      </button>
    </div>
  );
}
