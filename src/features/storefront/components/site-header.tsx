"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { CATALOG, getProduct, inr } from "../catalog";
import { STORE } from "../store-info";
import { useShop } from "../shop-provider";
import { cn } from "@/lib/utils";
import { CategorySlider } from "@/features/storefront/components/category-slider";

const NAV = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "Sets", href: "/products/essentials-kit" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background">
      <p className="px-4 py-2 text-center text-[10px] font-light sm:text-[11px]">
        Free delivery on orders above ₹999 · In-store testers in Tirur
      </p>
    </div>
  );
}

export function SiteHeader() {
  const { count, openCart, wishlist, toggleWish } = useShop();
  const pathname = usePathname();
  const [panel, setPanel] = useState<"menu" | "search" | "wishlist" | null>(null);
  const menuOpen = panel === "menu";
  const wishProducts = CATALOG.filter((p) => wishlist.includes(p.id));
  const closePanel = () => setPanel(null);

  function togglePanel(next: NonNullable<typeof panel>) {
    setPanel((current) => (current === next ? null : next));
  }

  return (
    <>
      <header className="sticky top-0 z-40  bg-card/90 backdrop-blur hairline">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-1 px-2 sm:h-[72px] sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center sm:gap-4">
            <button
              className="touch-target shrink-0 lg:hidden"
              aria-label="Menu"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => togglePanel("menu")}
            >
              {panel === "menu" ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
            <Link
              href="/"
              onClick={closePanel}
              className="flex min-h-11 items-center"
            >
              <Image
                src="/beauty-shoppee-logo.png"
                alt="Beauty Shoppee"
                width={1036}
                height={1014}
                sizes="(min-width: 640px) 66px, 58px"
                loading="eager"
                className="h-14 w-auto sm:h-16"
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closePanel}
                className="text-[11px] font-medium text-foreground/70 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center lg:gap-5">
            <span className="hidden text-[11px] text-muted-foreground md:block">EN · ₹ INR</span>
            <button
              aria-label="Search"
              aria-expanded={panel === "search"}
              onClick={() => togglePanel("search")}
              className="max-lg:touch-target"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Wishlist"
              aria-expanded={panel === "wishlist"}
              className="relative max-lg:touch-target"
              onClick={() => togglePanel("wishlist")}
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center bg-foreground text-[9px] text-background lg:-right-2 lg:-top-2">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              aria-label="Cart"
              className="relative max-lg:touch-target"
              onClick={() => {
                closePanel();
                openCart();
              }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center bg-foreground text-[9px] text-background lg:-right-2 lg:-top-2">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {panel === "search" && <HeaderSearch onClose={closePanel} />}

        {panel === "wishlist" && (
          <div
            data-lenis-prevent
            className="max-h-[50dvh] overflow-y-auto overscroll-contain border-t hairline bg-card"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {wishProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Your wishlist is empty — tap the heart on any product to save it.
                </p>
              ) : (
                <ul className="divide-y hairline">
                  {wishProducts.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2 sm:py-2">
                      <Link
                        href={`/products/${p.id}`}
                        onClick={closePanel}
                        className="flex min-h-11 flex-1 items-center text-sm hover:underline sm:min-h-0"
                      >
                        {p.name}
                      </Link>
                      <button
                        aria-label={`Remove ${p.name} from wishlist`}
                        onClick={() => toggleWish(p.id)}
                        className="text-muted-foreground hover:text-foreground max-sm:touch-target"
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <nav
          id="mobile-navigation"
          inert={!menuOpen}
          data-lenis-prevent
          className={cn(
            "absolute inset-x-0 top-full z-30 max-h-[50dvh] overflow-y-auto overscroll-contain border-y bg-card shadow-lg hairline transition-[opacity,translate,visibility] ease-out motion-reduce:translate-y-0 motion-reduce:transition-none lg:hidden",
            menuOpen
              ? "visible translate-y-0 opacity-100 duration-250"
              : "pointer-events-none invisible -translate-y-2 opacity-0 duration-150",
          )}
          aria-label="Mobile navigation"
        >
          <ul className="divide-y px-4 py-2">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={closePanel}
                  className="flex min-h-12 items-center py-3 text-sm font-medium text-foreground/80 aria-[current=page]:font-semibold aria-[current=page]:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CategorySlider />
      </header>

      <CartDrawer />
    </>
  );
}

function HeaderSearch({ onClose }: { onClose: () => void }) {
  const { query, setQuery } = useShop();
  const router = useRouter();

  return (
    <div className="border-t hairline bg-card">
      <form
        role="search"
        aria-label="Store search"
        onSubmit={(event) => {
          event.preventDefault();
          onClose();
          router.push("/products");
        }}
        className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6"
      >
        <Search size={16} strokeWidth={1.5} className="shrink-0 text-muted-foreground" />
        <input
          autoFocus
          type="search"
          aria-label="Search products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          className="min-h-11 min-w-0 flex-1 bg-transparent text-base placeholder:text-muted-foreground sm:min-h-0 sm:text-sm"
        />
        <button
          type="submit"
          className="min-h-11 shrink-0 bg-foreground px-3 py-2 text-xs text-background sm:min-h-0 sm:px-4"
        >
          View results
        </button>
      </form>
    </div>
  );
}

function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, remove, total, clear } = useShop();
  const [placed, setPlaced] = useState(false);

  if (!isOpen) return null;

  const entries = lines
    .map((line) => {
      const product = getProduct(line.id);
      return product ? { line, product } : null;
    })
    .filter((e) => e !== null);

  const freeDeliveryGap = 999 - total;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Cart">
      <div className="absolute inset-0 bg-foreground/40" onClick={closeCart} aria-hidden="true" />
      <aside
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-in slide-in-from-right flex-col overflow-y-auto overscroll-contain border-l bg-card hairline duration-300"
      >
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-2 hairline sm:px-6 sm:py-5">
          <p className="text-[11px] font-medium">
            Cart ({entries.reduce((n, e) => n + e.line.qty, 0)})
          </p>
          <button aria-label="Close cart" className="max-sm:touch-target" onClick={closeCart}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-display text-3xl">Thank you</p>
            <p className="text-sm text-muted-foreground">
              Your order has been received. We&apos;ll confirm it by phone shortly — or call the
              store directly at {STORE.phone}.
            </p>
            <button
              onClick={closeCart}
              className="mt-2 border px-6 py-3 text-[11px] font-medium hairline hover:bg-accent"
            >
              Continue shopping
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <ShoppingBag size={28} strokeWidth={1} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add something beautiful.
            </p>
          </div>
        ) : (
          <>
            <ul className="min-h-28 flex-1 divide-y overflow-y-auto px-4 hairline sm:px-6">
              {entries.map(({ line, product }) => (
                <li key={line.id} className="flex gap-3 py-3 sm:gap-4 sm:py-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="size-12 shrink-0 object-cover sm:size-16"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="shrink-0 text-sm">{inr(product.price * line.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border hairline">
                        <button
                          aria-label="Decrease quantity"
                          className="p-1.5 max-sm:touch-target"
                          onClick={() => setQty(line.id, line.qty - 1)}
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs">{line.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          className="p-1.5 max-sm:touch-target"
                          onClick={() => setQty(line.id, line.qty + 1)}
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        aria-label={`Remove ${product.name}`}
                        onClick={() => remove(line.id)}
                        className="text-muted-foreground hover:text-foreground max-sm:touch-target"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="shrink-0 border-t px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] hairline sm:px-6 sm:py-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">{inr(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {freeDeliveryGap > 0
                  ? `Add ${inr(freeDeliveryGap)} more for free delivery.`
                  : "You've unlocked free delivery."}
              </p>
              <button
                onClick={() => {
                  clear();
                  setPlaced(true);
                }}
                className="mt-3 min-h-11 w-full bg-foreground py-3.5 text-xs font-medium text-background transition-opacity hover:opacity-85 sm:mt-4"
              >
                Place order · pay at store
              </button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Reserve online, pay on pickup or delivery in Tirur.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
