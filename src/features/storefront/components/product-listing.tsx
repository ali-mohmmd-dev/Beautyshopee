"use client";
import { useCatalog, useCms, useSectionContent } from "../cms-context";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATALOG } from "../catalog";
import { filterProducts, productFacets, rangeValue } from "../product-filters";
import { useShop } from "../shop-provider";
import { ProductCard } from "./product-card";
const sortOptions = [
  ["featured", "Featured"],
  ["newest", "Newest first"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["rating", "Highest rated"],
  ["name", "Name: A–Z"],
];
export function ProductListing() {
  const content = useSectionContent("product-listing");
  const records = useCms();
  const catalog = useCatalog(CATALOG);
  const { query, setQuery } = useShop();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchKey = searchParams?.toString() ?? "";
  const [params, setParams] = useState(() => new URLSearchParams(searchKey));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setParams(new URLSearchParams(searchKey));
    const q = new URLSearchParams(searchKey).get("q");
    if (q !== null) setQuery(q);
  }, [searchKey, setQuery]);
  useEffect(() => {
    function restore() {
      const next = new URLSearchParams(window.location.search);
      setParams(next);
      setQuery(next.get("q") ?? "");
    }
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [setQuery]);
  const facets = useMemo(() => productFacets(catalog), [catalog]);
  const activeParams = new URLSearchParams(params);
  if (query.trim()) activeParams.set("q", query);
  else activeParams.delete("q");
  const products = filterProducts(catalog, activeParams);
  function write(next: URLSearchParams) {
    setParams(next);
    const url = (pathname ?? "/products") + (next.size ? "?" + next.toString() : "");
    window.history.replaceState(null, "", url);
  }
  function change(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (query.trim()) next.set("q", query);
    else next.delete("q");
    if (value) next.set(key, value);
    else next.delete(key);
    write(next);
  }
  function toggle(key: string, value: string) {
    const next = new URLSearchParams(params);
    const values = next.getAll(key);
    next.delete(key);
    (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]).forEach((v) =>
      next.append(key, v),
    );
    if (query.trim()) next.set("q", query);
    write(next);
  }
  function clear() {
    setQuery("");
    write(new URLSearchParams());
  }
  const categoryName = (value: string) =>
    records.find((r) => r.kind === "categories" && r.slug === value)?.data["name"] ??
    value.replace(/^./, (c) => c.toUpperCase());
  const groups = [
    {
      key: "category",
      title: "Category",
      options: facets.categories.map((value) => ({ value, label: categoryName(value) })),
    },
    {
      key: "brand",
      title: "Brand",
      options: facets.brands.map((value) => ({ value, label: value })),
    },
    {
      key: "concern",
      title: "Concern",
      options: facets.concerns.map((c) => ({ value: c.slug, label: c.name })),
    },
    {
      key: "quality",
      title: "Quality type",
      options: facets.qualities.map((value) => ({ value, label: value })),
    },
    {
      key: "company",
      title: "Company",
      options: facets.companies.map((value) => ({ value, label: value })),
    },
    {
      key: "size",
      title: "Quantity / size",
      options: facets.sizes.map((value) => ({ value, label: value })),
    },
    ...facets.options.map((o) => ({
      key: o.key,
      title: o.label,
      options: o.values.map((value) => ({ value, label: value })),
    })),
  ].filter((g) => g.options.length);
  const active = [...activeParams.entries()].filter(
    ([key, value]) =>
      key !== "sort" &&
      value &&
      (["q", "min", "max", "stock", "offer", "rating"].includes(key) ||
        groups.some((g) => g.key === key)),
  );
  const min = rangeValue(params.get("min")),
    max = rangeValue(params.get("max"));
  const invalidRange = min !== undefined && max !== undefined && min > max;
  function chip(key: string, value: string) {
    const group = groups.find((g) => g.key === key);
    if (group)
      return group.title + ": " + (group.options.find((o) => o.value === value)?.label ?? value);
    return (
      (
        {
          q: "Search",
          min: "Min ₹",
          max: "Max ₹",
          stock: "Availability",
          offer: "Collection",
          rating: "Minimum stars",
        } as Record<string, string>
      )[key] +
      ": " +
      ((
        {
          in: "In stock",
          out: "Out of stock",
          sale: "On sale",
          new: "New arrivals",
          bestseller: "Bestsellers",
        } as Record<string, string>
      )[value] ?? value)
    );
  }
  return (
    <section
      aria-labelledby="catalog-title"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-4 hairline sm:pb-6">
        <div>
          <h1 id="catalog-title" className="font-display text-3xl font-medium">
            {content.text("text-0", "Shop the products")}
          </h1>
          <p role="status" aria-live="polite" className="mt-2 text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <div className="flex w-full items-center gap-3 border bg-card px-4 hairline sm:w-80">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            aria-label={content.text("aria-label-1", "Filter products")}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              change("q", event.target.value);
            }}
            placeholder={content.text("placeholder-2", "Search the collection")}
            className="min-w-0 flex-1 bg-transparent py-3 text-base sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="catalog-filters"
          className="inline-flex min-h-11 items-center gap-2 border px-4 text-sm hairline lg:hidden"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filters{active.length > 0 ? " (" + active.length + ")" : ""}
        </button>
        <label className="ml-auto flex min-h-11 items-center gap-2 text-sm">
          Sort by
          <select
            value={params.get("sort") ?? "featured"}
            onChange={(e) => change("sort", e.target.value)}
            className="min-h-11 max-w-48 border bg-background px-2 text-sm hairline"
          >
            {sortOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {active.length > 0 && (
        <div aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
          {active.map(([key, value]) => (
            <button
              key={key + value}
              type="button"
              aria-label={"Remove " + chip(key, value)}
              onClick={() => {
                if (key === "q") {
                  setQuery("");
                  change("q", "");
                } else if (groups.some((g) => g.key === key)) toggle(key, value);
                else change(key, "");
              }}
              className="inline-flex min-h-11 max-w-full items-center gap-2 border px-3 py-2 text-xs hairline"
            >
              <span className="break-words">{chip(key, value)}</span>
              <X size={12} className="shrink-0" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            onClick={clear}
            className="min-h-11 px-2 text-xs underline underline-offset-4"
          >
            Clear all
          </button>
        </div>
      )}
      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <aside
          id="catalog-filters"
          aria-label="Product filters"
          className={
            (open ? "block" : "hidden") +
            " min-w-0 border bg-background px-4 py-3 hairline lg:block"
          }
        >
          <div className="flex items-center justify-between border-b py-3 hairline">
            <h2 className="text-sm font-medium">Filter products</h2>
            <button
              type="button"
              onClick={clear}
              className="min-h-11 px-1 text-xs underline underline-offset-4"
            >
              Reset
            </button>
          </div>
          <fieldset className="border-b py-4 hairline">
            <legend className="pt-4 text-sm font-medium">Price range (₹)</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="text-xs text-muted-foreground">
                Minimum
                <input
                  type="number"
                  min="0"
                  step="1"
                  aria-label="Minimum price"
                  value={params.get("min") ?? ""}
                  onChange={(e) => change("min", e.target.value)}
                  className="mt-1 min-h-11 w-full border bg-background px-2 text-base hairline"
                />
              </label>
              <label className="text-xs text-muted-foreground">
                Maximum
                <input
                  type="number"
                  min="0"
                  step="1"
                  aria-label="Maximum price"
                  value={params.get("max") ?? ""}
                  onChange={(e) => change("max", e.target.value)}
                  className="mt-1 min-h-11 w-full border bg-background px-2 text-base hairline"
                />
              </label>
            </div>
            {invalidRange && (
              <p className="mt-2 text-xs" role="alert">
                Minimum price must not exceed maximum price.
              </p>
            )}
          </fieldset>
          {groups.map((group) => (
            <details
              key={group.key}
              open={group.key === "category" || params.has(group.key)}
              className="border-b py-3 hairline"
            >
              <summary className="cursor-pointer py-2 text-sm font-medium">
                {group.title}
                {params.getAll(group.key).length
                  ? " (" + params.getAll(group.key).length + ")"
                  : ""}
              </summary>
              <div className="mt-2 max-h-56 overflow-y-auto overscroll-contain" data-lenis-prevent>
                {group.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex min-h-11 cursor-pointer items-center gap-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={params.getAll(group.key).includes(option.value)}
                      onChange={() => toggle(group.key, option.value)}
                      className="size-4 shrink-0 accent-foreground"
                    />
                    <span className="min-w-0 break-words">{option.label}</span>
                  </label>
                ))}
              </div>
            </details>
          ))}
          <label className="block py-4 text-sm font-medium">
            Availability
            <select
              aria-label="Availability"
              value={params.get("stock") ?? ""}
              onChange={(e) => change("stock", e.target.value)}
              className="mt-2 min-h-11 w-full border bg-background px-2 font-normal hairline"
            >
              <option value="">All products</option>
              <option value="in">In stock</option>
              <option value="out">Out of stock</option>
            </select>
          </label>
          <label className="block border-t py-4 text-sm font-medium hairline">
            Offers & collections
            <select
              aria-label="Offers and collections"
              value={params.get("offer") ?? ""}
              onChange={(e) => change("offer", e.target.value)}
              className="mt-2 min-h-11 w-full border bg-background px-2 font-normal hairline"
            >
              <option value="">All collections</option>
              <option value="sale">On sale</option>
              <option value="new">New arrivals</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </label>
          <label className="block border-t py-4 text-sm font-medium hairline">
            Customer rating
            <select
              aria-label="Customer rating"
              value={params.get("rating") ?? ""}
              onChange={(e) => change("rating", e.target.value)}
              className="mt-2 min-h-11 w-full border bg-background px-2 font-normal hairline"
            >
              <option value="">All ratings</option>
              {[4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars & up
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 min-h-11 w-full bg-foreground px-4 text-sm text-background lg:hidden"
          >
            Show {products.length} {products.length === 1 ? "product" : "products"}
          </button>
        </aside>
        <div className="min-w-0">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  sizes="(min-width:1280px) 300px,(min-width:1024px) 35vw,50vw"
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No products match your current filters.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-4 min-h-11 px-3 text-sm underline underline-offset-4"
              >
                Clear filters and search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
