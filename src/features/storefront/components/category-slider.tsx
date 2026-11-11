"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    query: c.name.toLowerCase(),
  })),
  { id: "skincare", name: "Skincare", query: "skincare" },
  { id: "sets", name: "Sets & Kits", query: "kit", badge: "Offer" },
  { id: "bestsellers", name: "Bestsellers", query: "blush", badge: "Popular" },
  { id: "lip-care", name: "Lip Care & Oils", query: "lip" },
  { id: "eye-makeup", name: "Mascara & Eyes", query: "mascara" },
];

export function CategorySlider() {
  const { query, setQuery } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const handleSelect = (item: CategoryItem) => {
    setQuery(item.query);
    const target = document.getElementById("featured") || document.getElementById("categories");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Category navigation slider"
      className="relative z-20 w-full border-y border-white/10 bg-black text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center px-2 py-1 sm:px-4">
        {/* Left scroll arrow button */}
        {/* <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll categories left"
          className="hidden h-9 w-9 shrink-0 items-center justify-center text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:flex"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button> */}

        {/* Categories single line horizontal slider */}
        <div
          ref={scrollRef}
          className="flex flex-1 items-center gap-2 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORY_ITEMS.map((item) => {
            const isActive =
              item.query === ""
                ? query.trim() === ""
                : query.trim().toLowerCase() === item.query.toLowerCase();

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                className={`group flex shrink-0 items-center gap-2 
                  px-3.5 
                   text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/15  text-white/85 hover:border-white/40 hover:bg-white/10 hover:text-white"
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
              </button>
            );
          })}
        </div>

        {/* Right scroll arrow button
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll categories right"
          className="hidden h-9 w-9 shrink-0 items-center justify-center text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:flex"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button> */}
      </div>
    </nav>
  );
}

