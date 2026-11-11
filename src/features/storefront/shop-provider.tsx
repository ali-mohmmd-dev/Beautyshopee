"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "./catalog";

export type CartLine = { id: string; qty: number };

type ShopState = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  openCart: () => void;
  closeCart: () => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const add = useCallback((id: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }, []);

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const line of lines) {
      const product = getProduct(line.id);
      if (!product) continue;
      count += line.qty;
      total += product.price * line.qty;
    }
    return { count, total };
  }, [lines]);

  const value = useMemo<ShopState>(
    () => ({
      lines,
      count,
      total,
      isOpen,
      query,
      setQuery,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
      wishlist,
      toggleWish,
    }),
    [lines, count, total, isOpen, query, add, setQty, remove, clear, wishlist, toggleWish],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopState {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
