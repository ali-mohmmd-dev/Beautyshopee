import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CmsProvider, type CmsRecord } from "@/features/storefront/cms-context";
import { ShopByConcern } from "@/features/storefront/components/shop-by-concern";
import { concernProducts, homeConcerns } from "@/features/storefront/concerns";
vi.mock("next/image", () => ({ default: () => null }));
const concern = (id: string, enabled = true): CmsRecord => ({
  id,
  kind: "concerns",
  slug: id,
  data: {
    name: id,
    description: "Care collection",
    enabled,
    image: { url: "/test.jpg", alt: "Care" },
  },
});
const product = (id: string, concernIds: string[]): CmsRecord => ({
  id,
  kind: "products",
  slug: id,
  data: { name: id, concernIds },
});
const settings = (value: Record<string, unknown>): CmsRecord => ({
  id: "site",
  kind: "settings",
  slug: "site",
  data: { concernSection: value },
});
describe("Shop by concern", () => {
  it("shows only enabled concerns with assigned products, in the CMS selection order", () => {
    const records = [
      concern("dry-hair"),
      concern("frizz"),
      concern("hidden", false),
      concern("empty"),
      product("oil", ["dry-hair", "frizz", "hidden"]),
      settings({ concernIds: ["frizz", "empty", "dry-hair", "hidden", "missing"] }),
    ];
    expect(homeConcerns(records).map((r) => r.id)).toEqual(["frizz", "dry-hair"]);
    expect(concernProducts(records, "frizz").map((r) => r.id)).toEqual(["oil"]);
    expect(concernProducts(records, "empty")).toEqual([]);
  });
  it("honors section visibility and does not show products without concern assignments", () => {
    expect(homeConcerns([concern("dry"), product("legacy", [])])).toEqual([]);
    expect(
      homeConcerns([concern("dry"), product("oil", ["dry"]), settings({ enabled: false })]),
    ).toEqual([]);
  });
  it("renders editable heading and links below the images without adding an empty section", () => {
    const records = [
      concern("dry-hair"),
      product("oil", ["dry-hair"]),
      settings({ heading: "Care for you", text: "Choose your routine" }),
    ];
    const { rerender } = render(
      <CmsProvider records={records}>
        <ShopByConcern />
      </CmsProvider>,
    );
    expect(screen.getByRole("heading", { name: "Care for you" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "dry-hair" })).toHaveAttribute(
      "href",
      "/concerns/dry-hair",
    );
    expect(screen.getByText("Choose your routine")).toBeInTheDocument();
    rerender(
      <CmsProvider records={[]}>
        <ShopByConcern />
      </CmsProvider>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
