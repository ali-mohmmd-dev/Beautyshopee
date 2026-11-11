"use client";

import Image from "next/image";
import Link from "next/link";
import { ParallaxImage } from "./parallax-image";
import { BUNDLE, inr } from "../catalog";
import { useShop } from "../shop-provider";

export function BundleShowcase() {
  const { add } = useShop();

  return (
    <section id="bundle" className="grid lg:grid-cols-2">
      <div className="relative min-h-[16rem] sm:min-h-[50vh] overflow-hidden bg-secondary lg:min-h-[80vh]">
        <ParallaxImage className="absolute inset-0 h-full w-full" speed={0.12}>
          <Image
            src={BUNDLE.image}
            alt={BUNDLE.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxImage>
      </div>
      <div className="flex flex-col justify-center bg-background px-4 py-10 sm:px-12 sm:py-16 lg:px-16">
        <h2 className="font-display text-3xl font-medium sm:text-5xl">
          <Link
            href={`/products/${BUNDLE.id}`}
            className="hover:underline hover:underline-offset-4"
          >
            {BUNDLE.name}
          </Link>
        </h2>
        <p className="mt-4 text-sm font-light text-muted-foreground">
          Four everyday icons in one box — our most-loved shades, paired for a complete look.
        </p>

        <ul className="mt-6 divide-y sm:mt-10 hairline border-y hairline">
          {BUNDLE.bundle.items.map((item) => (
            <li key={item.name} className="flex items-center gap-4 py-4">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-block h-2 w-2 bg-accent" />
                  {item.shade}
                </p>
              </div>
              <p className="text-sm">{inr(item.price)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground">Total value</p>
            <p className="text-sm text-muted-foreground line-through">
              {inr(BUNDLE.bundle.compareAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Kit price</p>
            <p className="font-display text-4xl">{inr(BUNDLE.price)}</p>
          </div>
        </div>

        <button
          onClick={() => add(BUNDLE.id)}
          className="mt-6 min-h-11 w-full sm:mt-8 bg-foreground py-3.5 text-xs font-medium text-background transition-opacity hover:opacity-85 sm:w-auto sm:px-12"
        >
          Add to cart
        </button>
        <p className="mt-4 text-[11px] text-muted-foreground">
          Free delivery above ₹999 · Testers available in store at Tirur
        </p>
      </div>
    </section>
  );
}
