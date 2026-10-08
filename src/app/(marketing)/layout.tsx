import type { ReactNode } from "react";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";

/**
 * Public marketing site shell (§45). Static: no cookies, headers or session reads anywhere in this group, so every page
 * is prerendered and revalidated (ISR) and can be served from a CDN on slow connections (§29, ARCHITECTURE §3.4).
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
