"use client";

import { useSectionContent } from "../cms-context";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { STORE } from "../store-info";

export function VisitSection() {
  const content = useSectionContent("visit-section");

  return (
    <section id="visit" className="border-t hairline bg-background" aria-labelledby="visit-title">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 id="visit-title" className="font-display text-3xl font-medium sm:text-5xl">
              {content.text("text-0", "Find us in")}
              {STORE.city}.
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-[1.4] text-muted-foreground">
              {content.text(
                "text-1",
                "Explore the entire collection in person, test shades in natural light with our beauty advisors, or call us to check stock and same-day delivery in Tirur.",
              )}
            </p>
            <div className="mt-5 grid gap-2 min-[360px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={content.settings?.["directions"] ?? STORE.directions}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-3 py-3.5 sm:px-6 text-xs font-medium text-background transition-opacity hover:opacity-85"
              >
                {content.text("text-2", "Get directions")}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={
                  content.settings?.["phone"]
                    ? "tel:" + content.settings["phone"].replace(/[^+0-9]/g, "")
                    : STORE.phoneHref
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 border hairline px-3 py-3.5 sm:px-6 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Phone size={14} aria-hidden="true" />
                {content.text("text-3", "Call the shop")}
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center divide-y hairline border hairline bg-background/50 p-4 sm:p-8">
            <div className="flex items-start gap-4 pb-6">
              <MapPin
                size={20}
                className="mt-0.5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {content.text("text-4", "Store location")}
                </p>
                <address className="mt-1 text-sm font-light not-italic leading-[1.4] text-muted-foreground">
                  {content.settings?.["address"] ?? STORE.address}
                </address>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {content.text("text-5", "Located in: Foreign Market Tirur")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 py-6">
              <Clock
                size={20}
                className="mt-0.5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {content.text("text-6", "Opening hours")}
                </p>
                <p className="mt-1 text-sm font-light text-muted-foreground">
                  {content.settings?.["hours"] ?? STORE.hours}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {content.text("text-7", "Open 7 days a week")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6">
              <Phone
                size={20}
                className="mt-0.5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {content.text("text-8", "Phone & inquiries")}
                </p>
                <a
                  href={
                    content.settings?.["phone"]
                      ? "tel:" + content.settings["phone"].replace(/[^+0-9]/g, "")
                      : STORE.phoneHref
                  }
                  className="mt-1 block text-sm font-light text-muted-foreground hover:text-foreground"
                >
                  {content.settings?.["phone"] ?? STORE.phone}
                </a>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {content.text("text-9", "Quick support for orders & shade guidance")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
