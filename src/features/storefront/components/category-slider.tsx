"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "../catalog";
import { useShop } from "../shop-provider";

interface CategoryItem {
  id: string;
  name: string;
  num?: string;
  query: string;
  badge?: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  ...CATEGORIES.map((c) => ({
    id: c.num,
    name: c.name,
    num: c.num,
    query: c.name === "Looks" ? "look" : c.name.toLowerCase(),
  })),
  { id: "skincare", name: "Skincare", query: "skincare" },
  { id: "sets", name: "Sets & Kits", query: "sets", badge: "Offer" },
  { id: "bestsellers", name: "Bestsellers", query: "bestseller", badge: "Popular" },
  { id: "lip-care", name: "Lip Care & Oils", query: "lip" },
  { id: "eye-makeup", name: "Mascara & Eyes", query: "mascara" },
];

export function CategorySlider() {
  const { query, setQuery } = useShop();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Category navigation slider"
      className="relative z-20 w-full border-y border-white/10 bg-black text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center px-2 py-1 sm:px-4">
        <div className="flex flex-1 items-center gap-2 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORY_ITEMS.map((item) => {
            const isActive =
              pathname === "/products" &&
              query.trim().toLowerCase() === item.query.toLowerCase();

            return (
              <Link
                key={item.id}
                href={`/products?q=${encodeURIComponent(item.query)}`}
                onClick={() => setQuery(item.query)}
                className={`group flex shrink-0 items-center gap-2 border px-3.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-white/85 hover:border-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.num && (
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? "text-black/60" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {item.num}
                  </span>
                )}
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1 py-0.5 text-[9px] uppercase ${
                      isActive ? "bg-black text-white" : "bg-white/20 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

