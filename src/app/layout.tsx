import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/features/storefront/components/smooth-scroll";
import { StorefrontShell } from "@/features/storefront/components/storefront-shell";
import "./globals.css";

const title = "Beauty Shoppee Tirur";
const description = "Premium cosmetics store in Tirur, Kerala.";

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${title}` },
  description,
  authors: [{ name: title }],
  icons: { icon: { url: "/beauty-shoppee-logo.png", type: "image/png" } },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <StorefrontShell>{children}</StorefrontShell>
      </body>
    </html>
  );
}
