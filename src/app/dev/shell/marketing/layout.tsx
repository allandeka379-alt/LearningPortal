import type { ReactNode } from "react";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";

const BASE = "/dev/shell/marketing";

/** Dev preview of the public site chrome. Link labels are placeholders for the marketing team's config. */
export default function MarketingShellPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader
        homeHref={BASE}
        links={[
          { href: `${BASE}/subjects`, label: "Subjects" },
          { href: `${BASE}/pricing`, label: "Pricing" },
          { href: `${BASE}/schools`, label: "For schools" },
          { href: `${BASE}/faq`, label: "FAQ" },
        ]}
        secondaryCta={{ href: `${BASE}/login`, label: "Log in" }}
        cta={{ href: `${BASE}/register`, label: "Get started" }}
      />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        {children}
      </main>
      <MarketingFooter
        tagline="Placeholder tagline from content config."
        columns={[
          {
            title: "Study",
            links: [
              { href: `${BASE}/zimsec`, label: "ZIMSEC" },
              { href: `${BASE}/cambridge`, label: "Cambridge" },
            ],
          },
          {
            title: "Company",
            links: [
              { href: `${BASE}/about`, label: "About" },
              { href: `${BASE}/schools`, label: "For schools" },
            ],
          },
          { title: "Help", links: [{ href: `${BASE}/faq`, label: "FAQ" }] },
        ]}
        legalLinks={[
          { href: `${BASE}/legal/terms`, label: "Terms" },
          { href: `${BASE}/legal/privacy`, label: "Privacy" },
        ]}
      />
    </>
  );
}
