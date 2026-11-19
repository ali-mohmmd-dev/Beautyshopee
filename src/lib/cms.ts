import "server-only";
import { cache } from "react";
import { PrismaClient, Prisma } from "@prisma/client";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
const globalCms = globalThis as unknown as { cmsDb?: PrismaClient };
export const cmsDb = globalCms.cmsDb ?? new PrismaClient();
if (process.env["NODE_ENV"] !== "production") globalCms.cmsDb = cmsDb;
export const getCms = cache(async () => {
  if (!process.env["DATABASE_URL"]) return [];
  const preview = (await draftMode()).isEnabled;
  const records = await cmsDb.content.findMany({
    where: { archivedAt: null, ...(!preview ? { published: { not: Prisma.DbNull } } : {}) },
    select: { id: true, kind: true, slug: true, draft: true, published: true },
    orderBy: { createdAt: "asc" },
  });
  return records.map(({ draft, published, ...record }) => ({
    ...record,
    data: (preview ? draft : published) as Record<string, any>,
  }));
});
export async function cmsMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const records = await getCms();
  const page = records.find((record) => record.kind === "pages" && record.slug === slug);
  const seo = page?.data["seo"];
  if (!seo) return fallback;
  return {
    ...fallback,
    title: { absolute: seo.title || String(fallback.title ?? "Beauty Shoppee Tirur") },
    description: seo.description || fallback.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : fallback.alternates,
    robots: seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: seo.socialTitle || seo.title,
      description: seo.socialDescription || seo.description,
      ...(seo.socialImage ? { images: [seo.socialImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle || seo.title,
      description: seo.socialDescription || seo.description,
      ...(seo.socialImage ? { images: [seo.socialImage] } : {}),
    },
  };
}
