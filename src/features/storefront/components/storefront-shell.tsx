import type { ReactNode } from "react";
import { ShopProvider } from "../shop-provider";
import { SiteFooter } from "./site-footer";
import { AnnouncementBar, SiteHeader } from "./site-header";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </ShopProvider>
  );
}
