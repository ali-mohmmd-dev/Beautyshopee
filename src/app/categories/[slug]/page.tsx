import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCms } from "@/lib/cms";
import { toProduct } from "@/features/storefront/cms-product";
import { ProductCard } from "@/features/storefront/components/product-card";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const record = (await getCms()).find((r) => r.kind === "categories" && r.slug === slug);
  if (!record) notFound();
  const seo = record.data["seo"];
  return {
    title: { absolute: seo.title || record.data["name"] },
    description: seo.description,
    robots: seo.noIndex ? { index: false, follow: true } : undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
  };
}
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const records = await getCms();
  const record = records.find((r) => r.kind === "categories" && r.slug === slug);
  if (!record) notFound();
  const products = records.filter(
    (r) => r.kind === "products" && r.data["categoryIds"]?.includes(record.id),
  );
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium">{record.data["name"]}</h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{record.data["description"]}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={toProduct(product, records)}
            sizes="(min-width:1024px) 25vw,50vw"
          />
        ))}
      </div>
      {!products.length && (
        <p className="mt-8 text-sm text-muted-foreground">
          Products in this category are coming soon.
        </p>
      )}
    </section>
  );
}
