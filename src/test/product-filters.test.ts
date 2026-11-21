import { describe, it, expect } from "vitest";
import { filterProducts, productFacets } from "@/features/storefront/product-filters";
import { CATALOG, type Product } from "@/features/storefront/catalog";
const variant = (sku: string, price: number, stock: number, color: string) => ({
  sku,
  price,
  stock,
  compareAt: price + 100,
  options: [{ name: "Color", value: color }],
  netQuantity: 100,
  unit: "ml",
  image: { url: "", alt: "" },
});
const oil: Product = {
  ...CATALOG[0]!,
  id: "oil",
  name: "Oil",
  brand: "Brand A",
  categories: ["face"],
  concerns: [{ slug: "dryness", name: "Dryness" }],
  cmsVariants: [variant("RED", 100, 0, "Red"), variant("BLUE", 500, 5, "Blue")],
  reviews: [{ id: "r", author: "Test", text: "Great", rating: 5 }],
};
const tint: Product = {
  ...CATALOG[1]!,
  id: "tint",
  name: "Tint",
  brand: "Brand B",
  categories: ["lips"],
  cmsVariants: [variant("TINT", 250, 2, "Red")],
  reviews: [],
};
const catalog = [oil, tint];
describe("Product filters", () => {
  it("requires price, stock, and selected options on the same variant", () => {
    expect(filterProducts(catalog, new URLSearchParams("brand=Brand+A&max=200&stock=in"))).toEqual(
      [],
    );
    expect(
      filterProducts(catalog, new URLSearchParams("brand=Brand+A&option.color=Red&stock=in")),
    ).toEqual([]);
    const result = filterProducts(
      catalog,
      new URLSearchParams("brand=Brand+A&option.color=Blue&stock=in"),
    );
    expect(result[0]?.price).toBe(500);
    expect(result[0]?.cmsVariants?.map((v) => v.sku)).toEqual(["BLUE"]);
  });
  it("uses OR inside a facet and AND across facets", () => {
    expect(
      filterProducts(catalog, new URLSearchParams("category=face&category=lips&brand=Brand+B")).map(
        (p) => p.id,
      ),
    ).toEqual(["tint"]);
    expect(
      filterProducts(catalog, new URLSearchParams("concern=dryness&rating=4")).map((p) => p.id),
    ).toEqual(["oil"]);
  });
  it("filters quantities and discounts and handles invalid ranges", () => {
    expect(filterProducts(catalog, new URLSearchParams("size=100+ml&offer=sale"))).toHaveLength(2);
    expect(filterProducts(catalog, new URLSearchParams("min=500&max=100"))).toEqual([]);
    expect(filterProducts(catalog, new URLSearchParams("min=garbage"))).toHaveLength(2);
  });
  it("sorts matching prices and restores the catalogue when cleared", () => {
    expect(
      filterProducts(catalog, new URLSearchParams("stock=in&sort=price-asc")).map((p) => p.id),
    ).toEqual(["tint", "oil"]);
    expect(filterProducts(catalog, new URLSearchParams())).toHaveLength(2);
    expect(catalog[0]?.cmsVariants?.[0]?.sku).toBe("RED");
  });
  it("builds facets from actual product data", () => {
    const facets = productFacets(catalog);
    expect(facets.brands).toEqual(["Brand A", "Brand B"]);
    expect(facets.options[0]?.key).toBe("option.color");
    expect(facets.concerns[0]?.name).toBe("Dryness");
  });
});
