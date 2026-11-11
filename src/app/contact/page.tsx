import type { Metadata } from "next";
import Link from "next/link";
import { VisitSection } from "@/features/storefront/components/visit-section";
import { STORE } from "@/features/storefront/store-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find the Beauty Shoppee Tirur address, opening hours, directions, and phone number.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Beauty Shoppee Tirur
          </p>
          <h1 className="mt-3 font-display text-4xl sm:mt-4 font-medium sm:text-7xl">Contact us</h1>
          <p className="mt-3 max-w-lg sm:mt-5 text-base font-light text-muted-foreground">
            Call us about products, orders, or local delivery. For shade advice, visit the shop and
            try our in-store testers.
          </p>
        </div>
      </section>
      <VisitSection />
      <section aria-labelledby="contact-questions" className="border-t hairline bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-5 sm:gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">
          <h2 id="contact-questions" className="font-display text-4xl font-medium">
            Before you visit
          </h2>
          <div className="divide-y border-y hairline">
            <details>
              <summary className="min-h-11 cursor-pointer py-4 text-sm font-medium">
                Can I check if a product is in stock?
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">
                <Link href="/products" className="underline underline-offset-4">
                  Browse the collection
                </Link>
                , then call{" "}
                <a href={STORE.phoneHref} className="underline underline-offset-4">
                  {STORE.phone}
                </a>{" "}
                to check availability before you visit.
              </p>
            </details>
            <details>
              <summary className="min-h-11 cursor-pointer py-4 text-sm font-medium">
                Do you deliver locally?
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">
                Same-day delivery is available in Tirur and nearby areas, with free delivery on
                orders above ₹999. Call the shop to check delivery for your address.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
