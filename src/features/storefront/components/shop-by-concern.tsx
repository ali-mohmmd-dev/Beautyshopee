"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { useCms } from "../cms-context";
import { concernSectionSettings, homeConcerns } from "../concerns";
export function ShopByConcern() {
  const records = useCms();
  const config = concernSectionSettings(records);
  const concerns = homeConcerns(records);
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: false });
  function updateEdges() {
    const list = track.current;
    if (list)
      setEdges({
        previous: list.scrollLeft > 1,
        next: list.scrollLeft + list.clientWidth < list.scrollWidth - 2,
      });
  }
  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [concerns.length]);
  if (!concerns.length) return null;
  function scroll(direction: number) {
    const list = track.current;
    if (!list) return;
    const first = list.firstElementChild;
    const distance =
      (first?.getBoundingClientRect().width ?? list.clientWidth) +
      (parseFloat(getComputedStyle(list).columnGap) || 0);
    list.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      id="shop-by-concern"
      aria-labelledby="concern-section-title"
      className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-20 lg:pb-28"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id="concern-section-title" className="font-display text-3xl font-medium sm:text-5xl">
            {config.heading}
          </h2>
          {config.text && (
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">{config.text}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            aria-label="Previous concern"
            aria-controls="concern-slides"
            disabled={!edges.previous}
            onClick={() => scroll(-1)}
            className="touch-target hover:bg-accent disabled:opacity-30"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next concern"
            aria-controls="concern-slides"
            disabled={!edges.next}
            onClick={() => scroll(1)}
            className="touch-target hover:bg-accent disabled:opacity-30"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        id="concern-slides"
        ref={track}
        onScroll={updateEdges}
        className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:mt-10 sm:gap-6 sm:scroll-px-6 sm:px-6"
      >
        {concerns.map((concern) => {
          const image = concern.data["image"];
          return (
            <li
              key={concern.id}
              className="w-[calc((100%-1.5rem)/2.5)] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <Link
                href={"/concerns/" + concern.slug}
                className="group block focus-visible:outline-offset-[-2px]"
              >
                {image?.url ? (
                  <div className="overflow-hidden bg-secondary">
                    <Image
                      src={image.url}
                      alt={image.decorative ? "" : image.alt || concern.data["name"]}
                      width={600}
                      height={600}
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 40vw"
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-secondary">
                    <Leaf size={40} strokeWidth={1} aria-hidden="true" />
                  </div>
                )}
                <div className="mt-3 flex items-start justify-between gap-2">
                  <h3 className="min-w-0 break-words font-display text-base font-medium sm:text-xl">
                    {concern.data["name"]}
                  </h3>
                  <ArrowUpRight size={16} className="mt-1 shrink-0" aria-hidden="true" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
