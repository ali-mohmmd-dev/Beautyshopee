import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { STORE } from "../store-info";

export function VisitSection() {
  return (
    <section id="visit" className="border-t hairline bg-background" aria-labelledby="visit-title">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 id="visit-title" className="font-display text-3xl font-medium sm:text-5xl">
              Find us in {STORE.city}.
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-[1.4] text-muted-foreground">
              Explore the entire collection in person, test shades in natural light with our beauty
              advisors, or call us to check stock and same-day delivery in Tirur.
            </p>
            <div className="mt-5 grid gap-2 min-[360px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={STORE.directions}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-3 py-3.5 sm:px-6 text-xs font-medium text-background transition-opacity hover:opacity-85"
              >
                Get directions
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={STORE.phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 border hairline px-3 py-3.5 sm:px-6 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Phone size={14} aria-hidden="true" />
                Call the shop
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
                <p className="text-xs font-semibold text-foreground">Store location</p>
                <address className="mt-1 text-sm font-light not-italic leading-[1.4] text-muted-foreground">
                  {STORE.address}
                </address>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  Located in: Foreign Market Tirur
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
                <p className="text-xs font-semibold text-foreground">Opening hours</p>
                <p className="mt-1 text-sm font-light text-muted-foreground">{STORE.hours}</p>
                <p className="mt-1 text-xs text-muted-foreground/80">Open 7 days a week</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-6">
              <Phone
                size={20}
                className="mt-0.5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-semibold text-foreground">Phone & inquiries</p>
                <a
                  href={STORE.phoneHref}
                  className="mt-1 block text-sm font-light text-muted-foreground hover:text-foreground"
                >
                  {STORE.phone}
                </a>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  Quick support for orders & shade guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
