import { MapPin, ShoppingBag, Star, Truck } from "lucide-react";
import { STORE } from "../store-info";

const PILLARS = [
  {
    title: "Authentic brands",
    text: "Direct brand sourcing with GST invoice on every purchase. 100% original cosmetics.",
  },
  {
    title: "In-store shade testing",
    text: "Visit our shop at New Bus Stand, Tirur to test shades in natural light before buying.",
  },
  {
    title: "Expert advice",
    text: "Friendly beauty advisors in store to curate routines for your specific skin type.",
  },
  {
    title: "Local express delivery",
    text: "Same-day delivery options across Tirur and nearby areas with free delivery above ₹999.",
  },
];

export function BrandPillars() {
  return (
    <section className="bg-background py-10 sm:pt-6 sm:pt-20 lg:pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 sm:gap-0 sm:p-0 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="">
            <div className="border-l pl-3 hairline sm:px-8">
              <h3 className="text-sm font-semibold sm:mt-4 sm:text-xs">{pillar.title}</h3>
              <p className="mt-2 text-sm font-light leading-[1.4] text-muted-foreground sm:mt-3">
                {pillar.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OffersBand() {
  return (
    <aside
      id="offers"
      aria-label="Shopping information"
      className="border-b hairline bg-background"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 text-xs text-foreground/80 sm:px-6">
        <span className="flex items-center gap-2">
          <ShoppingBag size={14} className="text-foreground" aria-hidden="true" />
          In-store shopping & testers
        </span>
        <span className="flex items-center gap-2">
          <Truck size={14} className="text-foreground" aria-hidden="true" />
          Delivery available · Free above ₹999
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={14} className="text-foreground" aria-hidden="true" />
          1st Floor, New Bus Stand, {STORE.city}
        </span>
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <Star size={13} className="fill-foreground text-foreground" aria-hidden="true" />
          {STORE.rating} ({STORE.reviewCount} reviews)
        </span>
      </div>
    </aside>
  );
}
