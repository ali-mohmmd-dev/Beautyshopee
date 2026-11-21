import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "All brands",
  description: "Explore beauty brands at Beauty Shoppee Tirur.",
};
export default async function BrandsPage() {
  const brands = (await getCms()).filter((record) => record.kind === "brands");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
      <h1 className="font-display text-3xl font-medium sm:text-5xl">All brands</h1>
      <p className="mt-3 text-muted-foreground">
        Explore our beauty brands and shop their collections.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={"/brands/" + brand.slug}
            title={brand.data["name"]}
            className="group flex aspect-square items-center justify-center overflow-hidden rounded-3xl border hairline bg-card p-6 transition-shadow hover:shadow-md sm:p-8"
          >
            {brand.data["logo"]?.url ? (
              <Image
                src={brand.data["logo"].url}
                alt={brand.data["name"]}
                width={320}
                height={320}
                sizes="(min-width:1024px) 25vw, 50vw"
                className="h-full w-full object-contain transition-transform group-hover:scale-105 motion-reduce:transition-none"
              />
            ) : (
              <span className="font-display text-xl">{brand.data["name"]}</span>
            )}
          </Link>
        ))}
      </div>
      {!brands.length && (
        <p className="mt-8 text-muted-foreground">Our brand collection will be available soon.</p>
      )}
    </section>
  );
}
