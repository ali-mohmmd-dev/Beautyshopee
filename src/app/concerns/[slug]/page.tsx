import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getCms } from "@/lib/cms";
import { concernProducts } from "@/features/storefront/concerns";
import { toProduct } from "@/features/storefront/cms-product";
import { ProductCard } from "@/features/storefront/components/product-card";
import { DescriptionText } from "@/features/storefront/components/description-text";

type Props = { params: Promise<{ slug: string }> };
async function loadConcern(slug: string) {
  const records = await getCms();
  const preview = (await draftMode()).isEnabled;
  const concern = records.find(
    (record) =>
      record.kind === "concerns" &&
      record.slug === slug &&
      (preview || record.data["enabled"] !== false),
  );
  if (!concern) notFound();
  return { records, concern };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { concern } = await loadConcern((await params).slug);
  const seo = concern.data["seo"] ?? {};
  const title = seo.title || concern.data["name"];
  const base = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: { absolute: title },
    description: seo.description,
    alternates: { canonical: seo.canonical || base + "/concerns/" + concern.slug },
    robots: seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: seo.socialTitle || title,
      description: seo.socialDescription || seo.description,
      ...(seo.socialImage ? { images: [seo.socialImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle || title,
      description: seo.socialDescription || seo.description,
      ...(seo.socialImage ? { images: [seo.socialImage] } : {}),
    },
  };
}
export default async function ConcernPage({ params }: Props) {
  const { records, concern } = await loadConcern((await params).slug);
  const products = concernProducts(records, concern.id);
  const image = concern.data["image"];
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/#shop-by-concern"
          className="inline-flex min-h-11 items-center underline underline-offset-4"
        >
          Shop by concern
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{concern.data["name"]}</span>
      </nav>
      <div
        className={
          image?.url ? "grid items-center gap-6 sm:grid-cols-[2fr_1fr] sm:gap-12" : "max-w-3xl"
        }
      >
        <div>
          <h1 className="break-words font-display text-4xl font-medium sm:text-5xl">
            {concern.data["name"]}
          </h1>
          {concern.data["description"] && (
            <div className="mt-4">
              <DescriptionText text={concern.data["description"]} />
            </div>
          )}
        </div>
        {image?.url && (
          <Image
            src={image.url}
            alt={image.decorative ? "" : image.alt || concern.data["name"]}
            width={640}
            height={480}
            sizes="(min-width:640px) 33vw, 100vw"
            className="aspect-[4/3] w-full bg-secondary object-cover"
          />
        )}
      </div>
      <div className="mt-8 border-t pt-6 hairline sm:mt-12">
        <p className="text-xs text-muted-foreground">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        {products.length ? (
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={toProduct(product, records)}
                sizes="(min-width:1024px) 25vw,50vw"
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-sm text-muted-foreground">
            <p>Products for this concern are coming soon.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
