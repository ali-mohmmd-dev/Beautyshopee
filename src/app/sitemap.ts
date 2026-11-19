export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { getCms } from "@/lib/cms";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000").replace(/\/$/, "");
  return (await getCms())
    .filter(
      (record) =>
        ["pages", "products", "brands", "categories"].includes(record.kind) &&
        !record.data["seo"]?.noIndex,
    )
    .map((record) => ({
      url:
        base +
        (record.kind === "pages" ? record.data["path"] : "/" + record.kind + "/" + record.slug),
      changeFrequency: "weekly",
    }));
}
