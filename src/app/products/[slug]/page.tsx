import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import { CATALOG, getProduct, inr, type Product } from "@/features/storefront/catalog";
import { ProductActions } from "@/features/storefront/components/product-actions";
import { ProductCard } from "@/features/storefront/components/product-card";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATALOG.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const { bundle } = product;
  const otherProducts = CATALOG.filter(({ id }) => id !== product.id);
  const sameBrand = product.brand
    ? otherProducts.filter(({ brand }) => brand === product.brand).slice(0, 3)
    : [];
  const similar = otherProducts
    .filter((item) => item.categories.some((category) => product.categories.includes(category)))
    .sort((a, b) => Number(Boolean(a.bundle)) - Number(Boolean(b.bundle)))
    .slice(0, 3);
  const reviews = product.reviews ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-2 sm:px-6 sm:pb-20 sm:pt-8 lg:pb-28">
      <Link
        href="/products"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:min-h-0 sm:text-xs"
      >
        <ArrowLeft size={14} aria-hidden="true" /> Back to products
      </Link>
      <div className="mt-2 grid items-start gap-5 sm:mt-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
        <Image
          src={product.image}
          alt={product.name}
          sizes="(min-width: 1280px) 585px, (min-width: 1024px) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-[5/4] w-full bg-secondary object-cover sm:aspect-square"
        />
        <section className="lg:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.code}
            {product.tag && ` · ${product.tag === "NEW" ? "New" : "Bestseller"}`}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium sm:mt-4 sm:text-6xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-baseline gap-3 sm:mt-4">
            <p className="font-display text-3xl">{inr(product.price)}</p>
            {bundle && <del className="text-sm text-muted-foreground">{inr(bundle.compareAt)}</del>}
          </div>
          <p className="mt-3 max-w-md text-base font-light text-muted-foreground sm:mt-6">
            {product.description}
          </p>
          {bundle && (
            <div className="mt-4 border-y py-4 hairline sm:mt-6">
              <h2 className="text-sm font-medium">What’s in the kit</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {bundle.items.map(({ name, shade }) => (
                  <li key={name}>
                    {name} · {shade}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-5 sm:mt-8">
            <ProductActions id={product.id} name={product.name} />
          </div>
          <ul className="mt-5 space-y-2 border-t pt-4 text-sm text-muted-foreground hairline sm:mt-8 sm:space-y-3 sm:pt-5">
            <li className="flex items-center gap-3">
              <Truck size={16} aria-hidden="true" /> Free local delivery on orders above ₹999
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4 hover:text-foreground sm:min-h-0"
              >
                <MapPin size={16} aria-hidden="true" /> Ask about shade testers in Tirur
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <section aria-labelledby="product-reviews-title" className={detailSection}>
        <h2 id="product-reviews-title" className="font-display text-3xl font-medium sm:text-4xl">
          Product reviews
        </h2>
        {reviews.length ? (
          <ul className="mt-4 divide-y hairline">
            {reviews.map(({ id, author, rating, text, sample }) => (
              <li key={id} className="space-y-2 py-4">
                <p className="text-sm font-medium">
                  {author} · {rating}/5 stars
                  {sample && (
                    <span className="ml-2 text-xs text-muted-foreground">Sample review</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No reviews for this product yet.</p>
        )}
      </section>
      <ProductRecommendations
        id="same-brand-title"
        title={
          product.brand
            ? `More from ${product.brand}${product.sampleBrand ? " (sample brand)" : ""}`
            : "More from the same brand"
        }
        products={sameBrand}
        emptyMessage="Same-brand recommendations are currently unavailable for this product."
      />
      <ProductRecommendations
        id="similar-products-title"
        title="Similar products"
        products={similar}
        emptyMessage="There are no similar products in the collection yet."
      />
    </div>
  );
}

const detailSection =
  "mt-[calc(2.5rem+var(--mobile-section-gap))] border-t pt-6 hairline sm:mt-16 sm:pt-10";

function ProductRecommendations({
  id,
  title,
  products,
  emptyMessage,
}: {
  id: string;
  title: string;
  products: Product[];
  emptyMessage: string;
}) {
  return (
    <section aria-labelledby={id} className={detailSection}>
      <h2 id={id} className="font-display text-3xl font-medium sm:text-4xl">
        {title}
      </h2>
      {products.length ? (
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              sizes="(min-width: 1280px) 395px, (min-width: 640px) 33vw, 50vw"
            />
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </section>
  );
}
