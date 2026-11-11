import Link from "next/link";
import { CATALOG } from "../catalog";
import { STORE } from "../store-info";

export function FooterContent() {
  return (
    <section
      aria-labelledby="footer-shopping-title"
      className="col-span-full space-y-3 text-xs leading-relaxed text-foreground/75"
    >
      <nav aria-labelledby="popular-searches-title">
        <h2 id="popular-searches-title" className="text-xs font-semibold uppercase text-foreground">
          Popular searches
        </h2>
        <ul className="mt-2 flex flex-wrap items-center gap-y-1">
          {CATALOG.map(({ id, name }, index) => (
            <li key={id} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="mx-2 text-foreground/40">
                  |
                </span>
              )}
              <Link
                href={`/products/${id}`}
                className="inline-flex min-h-8 items-center hover:underline focus-visible:underline"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-2">
        <h2 id="footer-shopping-title" className="text-xs font-semibold uppercase text-foreground">
          Shop makeup at Beauty Shoppee Tirur
        </h2>
        <p>
          Browse blush compacts, lip oils and everyday makeup sets in the{" "}
          <Link href="/products" className="underline underline-offset-2">
            Beauty Shoppee collection
          </Link>
          . Try shades in person at our Tirur shop if you want to compare how they look in natural
          light.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase text-foreground">Visit the Tirur store</h3>
        <p>
          Find us at {STORE.address}. Check{" "}
          <Link href="/contact" className="underline underline-offset-2">
            store hours and directions
          </Link>
          , or call the shop to ask about product availability and local delivery.
        </p>
      </div>
    </section>
  );
}
