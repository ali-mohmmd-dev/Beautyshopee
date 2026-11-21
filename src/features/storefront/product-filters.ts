import { searchProducts, type Product } from "./catalog";
export const sorts = ["featured", "price-asc", "price-desc", "rating", "newest", "name"] as const;
export function averageRating(product: Product) {
  const reviews = product.reviews ?? [];
  return reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
}
export function quantityLabel(v: NonNullable<Product["cmsVariants"]>[number]) {
  return v.netQuantity && v.unit !== "none" ? v.netQuantity + " " + v.unit : "";
}
export function rangeValue(value: string | null) {
  if (!value?.trim()) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}
export function filterProducts(catalog: Product[], params: URLSearchParams) {
  const min = rangeValue(params.get("min")),
    max = rangeValue(params.get("max"));
  if (min !== undefined && max !== undefined && min > max) return [];
  const selected = (key: string) => params.getAll(key).filter(Boolean);
  const inGroup = (key: string, values: readonly string[]) =>
    !selected(key).length || selected(key).some((v) => values.includes(v));
  const optionKeys = [...new Set([...params.keys()].filter((key) => key.startsWith("option.")))];
  const products = searchProducts(catalog, params.get("q") ?? "").flatMap((product) => {
    if (
      !inGroup("category", product.categories) ||
      !inGroup("brand", [product.brand ?? ""]) ||
      !inGroup(
        "concern",
        (product.concerns ?? []).map((c) => c.slug),
      ) ||
      !inGroup("quality", [product.qualityType ?? ""]) ||
      !inGroup("company", [product.company ?? ""])
    )
      return [];
    const rating = rangeValue(params.get("rating"));
    if (rating !== undefined && rating > 0 && averageRating(product) < rating) return [];
    const offer = params.get("offer");
    if (
      (offer === "new" && product.tag !== "NEW") ||
      (offer === "bestseller" && product.tag !== "BESTSELLER")
    )
      return [];
    const variants = product.cmsVariants ?? [];
    if (!variants.length) {
      if (optionKeys.length || selected("size").length || params.get("stock")) return [];
      if ((min !== undefined && product.price < min) || (max !== undefined && product.price > max))
        return [];
      if (offer === "sale" && !(product.bundle && product.bundle.compareAt > product.price))
        return [];
      return [product];
    }
    const matches = variants
      .filter((v) => {
        if ((min !== undefined && v.price < min) || (max !== undefined && v.price > max))
          return false;
        if (
          (params.get("stock") === "in" && v.stock <= 0) ||
          (params.get("stock") === "out" && v.stock > 0)
        )
          return false;
        if (offer === "sale" && !(v.compareAt !== null && v.compareAt > v.price)) return false;
        if (!inGroup("size", [quantityLabel(v)])) return false;
        return optionKeys.every((key) =>
          inGroup(
            key,
            v.options
              .filter((o) => o.name.trim().toLowerCase() === key.slice(7))
              .map((o) => o.value),
          ),
        );
      })
      .sort((a, b) => a.price - b.price);
    const first = matches[0];
    return first ? [{ ...product, price: first.price, code: first.sku, cmsVariants: matches }] : [];
  });
  const order = params.get("sort");
  if (order === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (order === "price-desc") products.sort((a, b) => b.price - a.price);
  else if (order === "rating") products.sort((a, b) => averageRating(b) - averageRating(a));
  else if (order === "name") products.sort((a, b) => a.name.localeCompare(b.name));
  else if (order === "newest") products.reverse();
  else products.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  return products;
}
export function productFacets(catalog: Product[]) {
  const values = (get: (p: Product) => string[]) =>
    [...new Set(catalog.flatMap(get).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const options = new Map<string, { label: string; values: string[] }>();
  for (const p of catalog)
    for (const v of p.cmsVariants ?? [])
      for (const o of v.options) {
        const key = "option." + o.name.trim().toLowerCase();
        const group = options.get(key) ?? { label: o.name.trim(), values: [] };
        if (!group.values.includes(o.value)) group.values.push(o.value);
        options.set(key, group);
      }
  return {
    categories: values((p) => [...p.categories]),
    brands: values((p) => (p.brand ? [p.brand] : [])),
    concerns: [
      ...new Map(catalog.flatMap((p) => p.concerns ?? []).map((c) => [c.slug, c])).values(),
    ],
    qualities: values((p) => (p.qualityType ? [p.qualityType] : [])),
    companies: values((p) => (p.company ? [p.company] : [])),
    sizes: values((p) => (p.cmsVariants ?? []).map(quantityLabel)),
    options: [...options].map(([key, value]) => ({ key, ...value, values: value.values.sort() })),
  };
}
