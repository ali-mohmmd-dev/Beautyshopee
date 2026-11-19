"use client";

import { useSectionContent } from "@/features/storefront/cms-context";
import Link from "next/link";
import { VisitSection } from "@/features/storefront/components/visit-section";
import { STORE } from "@/features/storefront/store-info";

export function ContactContent() {
  const content = useSectionContent("contact");

  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {content.text("text-0", "Beauty Shoppee Tirur")}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:mt-4 font-medium sm:text-7xl">
            {content.text("text-1", "Contact us")}
          </h1>
          <p className="mt-3 max-w-lg sm:mt-5 text-base font-light text-muted-foreground">
            {content.text(
              "text-2",
              "Call us about products, orders, or local delivery. For shade advice, visit the shop and try our in-store testers.",
            )}
          </p>
        </div>
      </section>
      <VisitSection />
      <section aria-labelledby="contact-questions" className="border-t hairline bg-background">
        <div className="mx-auto grid max-w-7xl gap-5 sm:gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">
          <h2 id="contact-questions" className="font-display text-4xl font-medium">
            {content.text("text-3", "Before you visit")}
          </h2>
          <div className="divide-y border-y hairline">
            <details>
              <summary className="min-h-11 cursor-pointer py-4 text-sm font-medium">
                {content.text("text-4", "Can I check if a product is in stock?")}
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">
                <Link
                  href={content.text("href-5", "/products")}
                  className="underline underline-offset-4"
                >
                  {content.text("text-6", "Browse the collection")}
                </Link>
                {content.text("text-7", ", then call")}{" "}
                <a href={STORE.phoneHref} className="underline underline-offset-4">
                  {STORE.phone}
                </a>{" "}
                {content.text("text-8", "to check availability before you visit.")}
              </p>
            </details>
            <details>
              <summary className="min-h-11 cursor-pointer py-4 text-sm font-medium">
                {content.text("text-9", "Do you deliver locally?")}
              </summary>
              <p className="pb-4 text-sm text-muted-foreground">
                {content.text(
                  "text-10",
                  "Same-day delivery is available in Tirur and nearby areas, with free delivery on orders above ₹999. Call the shop to check delivery for your address.",
                )}
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
