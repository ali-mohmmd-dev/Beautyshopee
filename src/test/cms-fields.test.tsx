import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CmsProvider, type CmsRecord } from "@/features/storefront/cms-context";
import { toProduct } from "@/features/storefront/cms-product";
import { reviewDate, reviewNewestFirst } from "@/features/storefront/review-date";
import { ProductReviews } from "@/features/storefront/components/product-reviews";
import { StorefrontShell } from "@/features/storefront/components/storefront-shell";
vi.mock("next/image", () => ({ default: () => null }));
const settings: CmsRecord = { id: "site", kind: "settings", slug: "site", data: { storeName: "Test Beauty Store", headerLinks: [{ label: "Our collection", href: "/products" }] } };
describe("Published CMS fields", () => {
  it("maps complete specifications and review dates from published records", () => {
    const product: CmsRecord = { id: "p", kind: "products", slug: "dryer", data: { name: "Dryer", specifications: [{name: "Power", value: "1800 W"}, {name: "", value: "Incomplete"}] } };
    const review = (id: string, date: string): CmsRecord => ({id, kind: "reviews", slug: id, data: {productId: "p", author: id, text: "Good", rating: 5, date}});
    const result = toProduct(product, [product, review("old", "2026-01-01"), review("undated", ""), review("new", "2026-11-01")]);
    expect(result.specifications).toEqual([{ name: "Power", value: "1800 W" }]);
    expect(result.reviews?.map(r => r.id)).toEqual(["new", "old", "undated"]);
    expect(result.reviews?.[0]?.date).toBe("2026-11-01");
  });
  it("formats calendar dates consistently and omits invalid dates", () => {
    expect(reviewDate("2026-11-01T23:30:00Z")).toMatchObject({day: "2026-11-01", label: "1 Nov 2026"});
    for (const value of ["", "not a date", "2026-02-30"]) expect(reviewDate(value)).toBeNull();
    expect([{date: ""}, {date: "2026-01-01"}].sort(reviewNewestFirst)[0]?.date).toBe("2026-01-01");
  });
  it("shows supplied review dates without inventing missing dates", () => {
    const {container} = render(<ProductReviews reviews={[
      {id: "a", author: "A", text: "Good", rating: 5, date: "2026-11-01"},
      {id: "b", author: "B", text: "Fine", rating: 4}
    ]}/>);
    expect(container.querySelectorAll("time")).toHaveLength(1);
    expect(screen.getByText("1 Nov 2026")).toHaveAttribute("datetime", "2026-11-01");
  });
  it("uses the CMS store name and the same links in desktop and mobile navigation", () => {
    render(<CmsProvider records={[settings]}><StorefrontShell><p>Page</p></StorefrontShell></CmsProvider>);
    expect(screen.getByRole("link", {name: "Test Beauty Store"})).toHaveAttribute("href", "/");
    expect(within(screen.getByRole("navigation", {name: "Main navigation"})).getByRole("link", {name: "Our collection"})).toHaveAttribute("href", "/products");
    fireEvent.click(screen.getByRole("button", {name: "Menu"}));
    expect(within(screen.getByRole("navigation", {name: "Mobile navigation"})).getByRole("link", {name: "Our collection"})).toHaveAttribute("href", "/products");
    expect(screen.getByText("Test Beauty Store", {selector: "p"})).toBeInTheDocument();
  });
});
