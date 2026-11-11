import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import portraitImg from "@/assets/hero-portrait.jpg";
import { ParallaxImage } from "./parallax-image";
import { STORE } from "../store-info";

export function Hero() {
  return (
    <section className="grid lg:h-[620px] lg:grid-cols-2">
      <div className="relative flex min-h-[clamp(22rem,58svh,30rem)] items-end overflow-hidden sm:min-h-[max(22rem,65svh)] lg:h-[620px] lg:min-h-0">
        <ParallaxImage className="absolute inset-0 h-full w-full" speed={0.1}>
          <Image
            src={portraitImg}
            alt="Editorial beauty portrait — Beauty Shoppee Tirur"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ParallaxImage>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
        <div className="relative w-full p-5 pb-7 text-background sm:p-12 lg:absolute lg:inset-x-0 lg:bottom-50 lg:translate-y-[20%]">
          <h1 className="font-display text-[clamp(2.5rem,11vw,3rem)] font-medium leading-[0.95] sm:text-6xl lg:text-7xl">
            Beauty worth
            <br />
            discovering.
          </h1>
          <p className="mt-3 max-w-sm text-sm font-light leading-[1.4] text-background/85 sm:mt-5">
            {STORE.city}, Kerala — authentic beauty brands, shade testers in store and everyday
            offers, curated for every skin tone.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex min-h-11 items-center gap-2 bg-background px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-background/90 sm:mt-6 sm:min-h-0 sm:px-6 sm:text-xs"
          >
            Explore the edit
            <ArrowDownRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-secondary lg:block lg:h-[620px]">
        <ParallaxImage className="absolute inset-0 h-full w-full" speed={0.1}>
          <Image
            src="https://images.unsplash.com/photo-1718490953028-021d352b14fd?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury cosmetics collection"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </ParallaxImage>
        <p className="absolute bottom-8 right-8 text-right text-[11px] font-light text-foreground/70">
          The collection
          <br />
          New arrivals in store
        </p>
      </div>
    </section>
  );
}
