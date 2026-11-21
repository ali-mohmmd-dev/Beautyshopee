import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import ProductsPage from "@/app/products/page";
import ProductPage from "@/app/products/[slug]/page";
import { StorefrontShell } from "@/features/storefront/components/storefront-shell";

// Vitest loads JPEGs as URLs. Next.js supplies dimensions and image optimization.
vi.mock("@/lib/cms", () => ({
  getCms: async () => [],
  cmsMetadata: async (_slug: string, fallback: unknown) => fallback,
}));
vi.mock("next/image", () => ({
  default: () => null,
  getImageProps: ({ src, ...props }: any) => ({
    props: { ...props, src: typeof src === "string" ? src : src.src },
  }),
}));

describe("Storefront home page", () => {
  it("renders the storefront and adds a featured product to the cart", () => {
    render(
      <StorefrontShell>
        <HomePage />
      </StorefrontShell>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Beauty Shoppee Tirur");
    const product = screen.getByRole("heading", { name: "Blush Collection" }).closest("article");
    if (!product) throw new Error("Expected a product card for Blush Collection");
    fireEvent.click(within(product).getByRole("button", { name: "Quick add" }));
    fireEvent.click(screen.getByRole("button", { name: "Cart" }));

    const cart = within(screen.getByRole("dialog", { name: "Cart" }));
    expect(cart.getByText("Blush Collection")).toBeInTheDocument();
    expect(cart.getByText("Cart (1)")).toBeInTheDocument();
  });
});

describe("Product pages", () => {
  it("filters the catalog and keeps the cart when moving to a product detail page", async () => {
    const detailPage = await ProductPage({
      params: Promise.resolve({ slug: "silk-lip-oil" }),
    });
    const { rerender } = render(
      <StorefrontShell>
        <ProductsPage />
      </StorefrontShell>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("8 products");
    fireEvent.change(screen.getByRole("searchbox", { name: "Filter products" }), {
      target: { value: "silk lip oil" },
    });
    expect(screen.getByRole("status")).toHaveTextContent("1 product");
    expect(
      within(screen.getByRole("main")).getByRole("link", { name: "Silk Lip Oil" }),
    ).toHaveAttribute("href", "/products/silk-lip-oil");
    fireEvent.click(screen.getByRole("button", { name: "Quick add" }));

    rerender(<StorefrontShell>{detailPage}</StorefrontShell>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Silk Lip Oil");
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    const cart = within(screen.getByRole("dialog", { name: "Cart" }));
    expect(cart.getByText("Cart (2)")).toBeInTheDocument();
  });

  it("does not filter the home page featured section when clicking a header category", () => {
    render(
      <StorefrontShell>
        <HomePage />
      </StorefrontShell>,
    );

    const nav = screen.getByRole("navigation", { name: "Category navigation slider" });
    fireEvent.click(within(nav).getByRole("link", { name: /Lips/i }));

    const featured = document.getElementById("featured");
    if (!featured) throw new Error("Expected #featured section on home page");
    expect(
      within(featured).getByRole("heading", { name: "Featured this week" }),
    ).toBeInTheDocument();
    expect(within(featured).getByRole("heading", { name: "Blush Collection" })).toBeInTheDocument();
    expect(within(featured).getByRole("heading", { name: "Silk Lip Oil" })).toBeInTheDocument();
  });

  it("filters products when clicking a category slider link", () => {
    render(
      <StorefrontShell>
        <ProductsPage />
      </StorefrontShell>,
    );

    const nav = screen.getByRole("navigation", { name: "Category navigation slider" });
    const faceLink = within(nav).getByRole("link", { name: /Face/i });
    expect(faceLink).toHaveAttribute("href", "/products?q=face");

    fireEvent.click(faceLink);
    expect(screen.getByRole("status")).toHaveTextContent("4 products");
    expect(screen.getByRole("searchbox", { name: "Filter products" })).toHaveValue("face");
  });
});
