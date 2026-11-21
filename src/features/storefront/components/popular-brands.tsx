"use client";

import { useCms } from "../cms-context";
import Image from "next/image";
import Link from "next/link";

const brandLogos = [
  { name: "Maybelline New York", image: "/brands/maybelline-new-york.svg" },
  { name: "NIVEA", image: "/brands/nivea.svg" },
  { name: "Garnier", image: "/brands/garnier.svg" },
];

export function PopularBrands() {
  const records = useCms();
  const featuredBrands = records
    .filter((record) => record.kind === "brands" && record.data["featured"] && !record.data["sample"])
    .map((record) => ({
      name: record.data["name"] as string,
      image: record.data["logo"]?.url || "",
      href: "/brands/" + record.slug,
    }))
    .filter((brand) => Boolean(brand.image));
  const slides: { name: string; image: string; href?: string }[] =
    featuredBrands.length ? featuredBrands : brandLogos;

  const imageSlides = slides.filter((slide) => Boolean(slide.image));
  if (!imageSlides.length) return null;
  // Keep each repeated strip wider than a large desktop viewport.
  const loopSlides = Array.from(
    { length: Math.ceil(24 / imageSlides.length) },
    () => imageSlides,
  ).flat();

  return (
    <section aria-label="Popular brands" className="my-10 sm:my-20 lg:my-28">
      <div className="brand-marquee overflow-hidden">
        <div className="brand-marquee-track flex w-max gap-8 [--brand-gap:2rem] sm:gap-12 sm:[--brand-gap:3rem]">
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
              className={
                "flex shrink-0 items-center gap-8 sm:gap-12 " +
                (duplicate ? "brand-marquee-copy" : "")
              }
            >
              {loopSlides.map(({ name, image, href }, index) => {
                const decorative = duplicate || index >= imageSlides.length;
                const logo = (
                  <Image
                    src={image}
                    width={240}
                    height={96}
                    alt={decorative ? "" : name}
                    sizes="(max-width: 640px) 160px, 208px"
                    className="h-20 w-40 object-contain px-3 py-3 sm:h-24 sm:w-52"
                  />
                );
                return (
                  <li key={name + index} aria-hidden={decorative || undefined} className="shrink-0">
                    {href && !decorative ? (
                      <Link
                        href={href}
                        title={name}
                        className="block focus-visible:outline-offset-4"
                      >
                        {logo}
                      </Link>
                    ) : (
                      logo
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
