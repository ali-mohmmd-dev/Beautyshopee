import { getCms } from "@/lib/cms";
import { toProduct } from "@/features/storefront/cms-product";
import { VariantPicker } from "@/features/storefront/components/variant-picker";
import { DescriptionText } from "@/features/storefront/components/description-text";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import { CATALOG, getProduct, inr, type Product } from "@/features/storefront/catalog";
import { ProductActions } from "@/features/storefront/components/product-actions";
import { ProductReviews } from "@/features/storefront/components/product-reviews";
import { ProductSlider } from "@/features/storefront/components/product-slider";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CATALOG.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const records = await getCms();
  const record = records.find((item) => item.kind === "products" && item.slug === slug);
  const product = records.length
    ? record
      ? toProduct(record, records)
      : undefined
    : getProduct(slug);
  if (!product) notFound();
  const seo = record?.data["seo"];
  return {
    title: { absolute: seo?.title || product.name },
    description: seo?.description || product.description,
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: seo?.socialTitle || seo?.title || product.name,
      description: seo?.socialDescription || seo?.description || product.description,
      ...(seo?.socialImage ? { images: [seo.socialImage] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;
  const records = await getCms();
  const record = records.find((item) => item.kind === "products" && item.slug === slug);
  const catalog = records.length
    ? records.filter((item) => item.kind === "products").map((item) => toProduct(item, records))
    : CATALOG;
  const product = catalog.find((item) => item.id === slug);
  if (!product) notFound();
  const { bundle } = product;
  const otherProducts = catalog.filter(({ id }) => id !== product.id);
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
          alt={
            product.cmsImages?.[0]?.decorative ? "" : product.cmsImages?.[0]?.alt || product.name
          }
          width={1200}
          height={1200}
          sizes="(min-width: 1280px) 585px, (min-width: 1024px) 50vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-[5/4] w-full bg-secondary object-cover sm:aspect-square"
        />
        <section className="lg:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {product.code}
            {product.sampleProduct && " · Sample product"}
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
            {product.cmsVariants?.length ? (
              <VariantPicker product={product} />
            ) : (
              <ProductActions id={product.id} name={product.name} />
            )}
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
      {product.fullDescription && (
        <section className={detailSection}>
          <h2 className="font-display text-3xl font-medium">Product details</h2>
          <DescriptionText text={product.fullDescription} />
        </section>
      )}
      {product.cmsImages && product.cmsImages.length > 1 && (
        <section className={detailSection}>
          <h2 className="font-display text-3xl">Product gallery</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {product.cmsImages.slice(1).map((image, index) => (
              <figure key={index}>
                <Image
                  src={image.url}
                  alt={image.decorative ? "" : image.alt}
                  width={800}
                  height={800}
                  className="w-full"
                />
                {image.caption && <figcaption className="mt-2 text-sm">{image.caption}</figcaption>}
                {image.imageText && (
                  <p className="mt-2 text-sm text-muted-foreground">{image.imageText}</p>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
      <section aria-labelledby="product-reviews-title" className={detailSection}>
        <h2 id="product-reviews-title" className="font-display text-3xl font-medium sm:text-4xl">
          Product reviews
        </h2>
        <ProductReviews reviews={reviews} />
      </section>
      <ProductRecommendations
        id="same-brand-title"
        title={"More from the same brand"}
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
        <ProductSlider products={products} />
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </section>
  );
}
