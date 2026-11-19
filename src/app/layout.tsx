import { draftMode } from "next/headers";
export const dynamic = "force-dynamic";
import { getCms } from "@/lib/cms";
import { CmsProvider } from "@/features/storefront/cms-context";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/features/storefront/components/smooth-scroll";
import { StorefrontShell } from "@/features/storefront/components/storefront-shell";
import "./globals.css";

const title = "Beauty Shoppee Tirur";
const description = "Premium cosmetics store in Tirur, Kerala.";

const defaultMetadata: Metadata = {
  title: { default: title, template: `%s — ${title}` },
  description,
  authors: [{ name: title }],
  icons: { icon: { url: "/beauty-shoppee-logo.png", type: "image/png" } },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cms = await getCms();
  const preview = (await draftMode()).isEnabled;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <SmoothScroll />
        {preview && (
          <div className="flex items-center justify-between bg-foreground px-4 py-3 text-sm text-background">
            <span>Draft preview</span>
            <a href="/api/cms-preview/exit" className="underline">
              Exit preview
            </a>
          </div>
        )}
        <CmsProvider records={cms}>
          <StorefrontShell>{children}</StorefrontShell>
        </CmsProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const records = await getCms();
  const settings = records.find(
    (record) => record.kind === "settings" && record.slug === "site",
  )?.data;
  return {
    ...defaultMetadata,
    icons: {
      icon: { url: settings?.["favicon"]?.url || "/beauty-shoppee-logo.png", type: "image/png" },
    },
  };
}
