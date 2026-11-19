"use client";

import { useCms, useCatalog } from "../cms-context";
import { useSectionContent } from "../cms-context";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import faceImage from "@/assets/cat-face.jpg";
import lipsImage from "@/assets/cat-lips.jpg";
import eyesImage from "@/assets/cat-eyes.jpg";
import { CATALOG, type Product } from "../catalog";

const previewBrands = [
  { name: "Rose Atelier", image: faceImage },
  { name: "Velvet Muse", image: lipsImage },
  { name: "Soft Focus Studio", image: eyesImage },
];

export function PopularBrands() {
  const content = useSectionContent("popular-brands");

  const records = useCms();
  const catalog = useCatalog(CATALOG);
  const track = useRef<HTMLUListElement>(null);
  const brands = new Map<string, Product>();
  for (const product of catalog) {
    if (product.brand && !brands.has(product.brand)) brands.set(product.brand, product);
  }

  const fallbackSlides = [
    ...[...brands].map(([name, product]) => ({
      name,
      image: product.image,
      sample: product.sampleBrand,
      href: `/products/${product.id}#same-brand-title`,
    })),
    ...previewBrands
      .filter(({ name }) => !brands.has(name))
      .map((brand) => ({ ...brand, sample: true, href: undefined })),
  ];

  const slides = records.length
    ? records
        .filter((record) => record.kind === "brands" && record.data["featured"])
        .map((record) => ({
          name: record.data["name"] as string,
          image: record.data["logo"]?.url || "",
          sample: Boolean(record.data["sample"]),
          href: catalog.find((product) => product.brand === record.data["name"])
            ? "/products/" +
              catalog.find((product) => product.brand === record.data["name"])!.id +
              "#same-brand-title"
            : undefined,
        }))
    : fallbackSlides;

  function scroll(direction: -1 | 1) {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap);
    list.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      aria-labelledby="popular-brands-title"
      className="bg-background py-10 sm:py-20 lg:py-28"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <h2 id="popular-brands-title" className="font-display text-3xl font-medium sm:text-5xl">
          {content.text("text-0", "Popular brands")}
        </h2>
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            aria-label={content.text("aria-label-1", "Previous brand")}
            aria-controls="popular-brand-slides"
            onClick={() => scroll(-1)}
            className="touch-target hover:bg-accent"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={content.text("aria-label-2", "Next brand")}
            aria-controls="popular-brand-slides"
            onClick={() => scroll(1)}
            className="touch-target hover:bg-accent"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        id="popular-brand-slides"
        className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:gap-6 sm:scroll-px-6 sm:px-6 lg:[--brand-gutter:max(1.5rem,calc((100%-77rem)/2))] lg:scroll-px-(--brand-gutter) lg:px-(--brand-gutter)"
      >
        {slides.map(({ name, image, sample, href }) => {
          const cardContent = (
            <>
              <div className="overflow-hidden">
                <Image
                  src={image}
                  width={800}
                  height={800}
                  alt=""
                  sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 40vw"
                  className="aspect-[1/1] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-1 sm:gap-3">
                <div className="min-w-0">
                  <p className="break-words font-display text-sm font-medium sm:text-xl">{name}</p>
                  {sample && (
                    <p className="text-xs text-muted-foreground">
                      {content.text("text-3", "Sample brand")}
                    </p>
                  )}
                </div>
                {href && <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />}
              </div>
            </>
          );

          return (
            <li
              key={name}
              className="w-[calc((100%-1.5rem)/2.5)] shrink-0 snap-start sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              {href ? (
                <Link href={href} className="group block focus-visible:outline-offset-[-2px]">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
