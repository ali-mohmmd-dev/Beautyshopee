"use client";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { toProduct } from "./cms-product";
import type { Product } from "./catalog";
export type CmsRecord = { id: string; kind: string; slug: string; data: Record<string, any> };
const CmsContext = createContext<CmsRecord[]>([]);
export function CmsProvider({
  records,
  children,
}: {
  records: CmsRecord[];
  children: React.ReactNode;
}) {
  return <CmsContext.Provider value={records}>{children}</CmsContext.Provider>;
}
export function useCms() {
  return useContext(CmsContext);
}
export function useSectionContent(section: string) {
  const records = useCms(),
    pathname = usePathname();
  const page = records.find(
    (record) => record.kind === "pages" && record.data["path"] === pathname,
  );
  const settings = records.find((record) => record.kind === "settings" && record.slug === "site");
  const blocks = page?.data["blocks"] ?? [];
  return {
    text(key: string, fallback: string) {
      const item = blocks.find((block: any) => block.key === section + "." + key);
      const global = settings?.data["labels"]?.find(
        (label: any) => label.name === section + "." + key,
      );
      if (key.startsWith("alt-") && page) {
        const position = Number(key.split("-").at(-1));
        const placement = blocks
          .filter(
            (block: any) =>
              block.key.startsWith(section + ".image-") || block.key.startsWith(section + ".src-"),
          )
          .filter((block: any) => Number(block.key.split("-").at(-1)) < position)
          .sort(
            (a: any, b: any) => Number(b.key.split("-").at(-1)) - Number(a.key.split("-").at(-1)),
          )[0];
        if (placement?.image?.url) return placement.image.decorative ? "" : placement.image.alt;
      }
      const value = String(item?.text ?? global?.value ?? fallback)
        .replaceAll("&apos;", "'")
        .replaceAll("&amp;", "&")
        .replaceAll("&quot;", '"');
      if (!key.startsWith("text-")) return value;
      if (value.endsWith("(") || /^[),.!?]/.test(value)) return value;
      return " " + value + " ";
    },
    image(key: string, fallback: any) {
      const item = blocks.find((block: any) => block.key === section + "." + key);
      const global = settings?.data["labels"]?.find(
        (label: any) => label.name === section + "." + key,
      );
      return item?.image?.url || global?.value || fallback;
    },
    items(key: string, fallback: any[]) {
      return blocks.find((block: any) => block.key === section + "." + key)?.items ?? fallback;
    },
    settings: settings?.data,
  };
}
export function useCatalog(fallback: Product[]): Product[] {
  const records = useCms();
  const products = records.filter((record) => record.kind === "products");
  if (!records.length) return fallback;
  return products.map((record) => toProduct(record, records));
}
