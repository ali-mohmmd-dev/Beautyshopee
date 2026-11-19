import type { Product } from "./catalog";
import type { CmsRecord } from "./cms-context";
export function toProduct(record: CmsRecord, records: CmsRecord[]): Product {
  const data = record.data,
    brand = records.find((r) => r.id === data["brandId"]),
    variants = data["variants"] ?? [],
    first = variants[0];
  return {
    id: record.slug,
    name: data["name"],
    description: data["shortDescription"],
    tag: data["badge"] === "NEW" || data["badge"] === "BESTSELLER" ? data["badge"] : null,
    code: first?.sku ?? record.slug,
    price: first?.price ?? 0,
    image: data["images"]?.[0]?.url ?? "",
    brand: brand?.data["name"],
    sampleBrand: brand?.data["sample"],
    sampleProduct: data["sample"],
    categories: records
      .filter((r) => data["categoryIds"]?.includes(r.id))
      .map((r) => r.slug) as Product["categories"],
    reviews: records
      .filter((r) => r.kind === "reviews" && r.data["productId"] === record.id)
      .map((r) => ({
        id: r.id,
        author: r.data["author"],
        rating: r.data["rating"],
        text: r.data["text"],
        sample: r.data["sample"],
      })),
    cmsVariants: variants,
    cmsImages: data["images"],
    fullDescription: data["description"],
    ...(data["bundleItems"]?.length
      ? {
          bundle: {
            compareAt: first?.compareAt ?? first?.price ?? 0,
            items: data["bundleItems"].map((item: any) => ({ ...item, image: item.image.url })),
          },
        }
      : {}),
  };
}
