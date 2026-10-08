import type { ReactNode } from "react";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { SiteFooter, SiteHeader } from "@/components/marketing/SiteChrome";

/**
 * Chrome of the public SEO curriculum pages (§44): the same header and footer as the marketing site. Static: no
 * cookies, headers or session reads anywhere below this layout, so every page prerenders (generateStaticParams) or
 * renders once and is cached (ISR).
 */
export default function PublicCurriculumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
