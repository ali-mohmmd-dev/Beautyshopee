"use client";

import Image from "next/image";
import lipOilImg from "@/assets/product-lip.jpg";
import { ParallaxImage } from "./parallax-image";
import { inr } from "../catalog";
import { useShop } from "../shop-provider";

export function EditorialSpotlight() {
  const { add } = useShop();

  return (
    <section className="relative flex min-h-[22rem] items-end overflow-hidden p-4 sm:block sm:h-[70vh] sm:p-0 lg:h-[85vh]">
      <ParallaxImage className="absolute inset-0 h-full w-full" speed={0.14}>
        <Image
          src="https://images.unsplash.com/photo-1654969038161-ebd30ff4f73d?auto=format&fit=crop&w=1920&q=80"
          alt="Model applying cream blush"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ParallaxImage>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/50 to-transparent" />
      <div className="relative ml-auto w-full max-w-80 border bg-card/90 p-4 backdrop-blur-md hairline sm:absolute sm:bottom-10 sm:right-10 sm:w-72 sm:bg-card/70 sm:p-5">
        <div className="flex items-center gap-4">
          <Image
            src={lipOilImg}
            alt="Silk Lip Oil"
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 object-cover"
          />
          <div>
            <p className="text-[10px] text-muted-foreground">Silk Lip Oil</p>
            <p className="mt-1 font-display text-2xl">{inr(649)}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href="#featured"
            className="flex min-h-11 items-center justify-center border py-2 text-center text-xs font-medium hairline hover:bg-accent sm:min-h-0 sm:text-[10px]"
          >
            Discover
          </a>
          <button
            onClick={() => add("silk-lip-oil")}
            className="min-h-11 bg-foreground py-2 text-xs font-medium text-background hover:opacity-85 sm:min-h-0 sm:text-[10px]"
          >
            Quick add
          </button>
        </div>
      </div>
    </section>
  );
}
