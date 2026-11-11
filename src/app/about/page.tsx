import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import editorialImage from "@/assets/spotlight.jpg";
import { BrandPillars } from "@/features/storefront/components/brand-pillars";
import { Reviews } from "@/features/storefront/components/reviews";
import { STORE } from "@/features/storefront/store-info";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know Beauty Shoppee Tirur, a local cosmetics shop with in-store shade testers and beauty advice.",
};

export default function AboutPage() {
  return (
    <>
      <section className="grid border-b hairline lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center bg-background px-4 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About Beauty Shoppee
          </p>
          <h1 className="mt-5 max-w-lg font-display text-4xl font-medium leading-[0.95] sm:text-7xl">
            Your local beauty shop in {STORE.city}.
          </h1>
          <p className="mt-4 max-w-md sm:mt-6 text-base font-light text-muted-foreground">
            We stock authentic cosmetics at the New Bus Stand in Tirur. Drop in to try shades in
            natural light, find an everyday favourite, or get help putting together a routine.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 sm:mt-8 items-center gap-2 bg-foreground px-6 py-3.5 text-xs font-medium text-background transition-opacity hover:opacity-85"
          >
            Plan your visit <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="relative min-h-[240px] bg-secondary sm:min-h-[440px]">
          <Image
            src={editorialImage}
            alt="Model applying cream blush"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="font-display text-4xl font-medium sm:text-5xl">
            Try a shade before you buy.
          </h2>
          <div>
            <p className="max-w-lg text-base font-light text-muted-foreground">
              If you’re just getting into makeup or replacing a favourite, our team can help you
              compare shades and choose products that suit your skin tone and routine.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
            >
              Browse the collection
            </Link>
          </div>
        </div>
      </section>
      <BrandPillars />
      <Reviews />
    </>
  );
}
