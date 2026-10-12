import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { FOOTER_COLUMNS, FOOTER_TAGLINE, LEGAL_LINKS, MARKETING_CTA, MARKETING_NAV, MARKETING_SIGN_IN } from "./site-nav";

/**
 * Public site header with the marketing nav (How it works, Subjects, Exam candidates, Schools, Pricing) and the Sign in / Get full access
 * actions. Static: it never reads the session, so public pages stay cacheable (signed-in visitors use "Sign in", which
 * forwards them to their area).
 */
export function SiteHeader() {
  return <MarketingHeader links={MARKETING_NAV} secondaryCta={MARKETING_SIGN_IN} cta={MARKETING_CTA} />;
}

/** Public site footer: link columns, legal links and the chevron band. */
export function SiteFooter() {
  return <MarketingFooter columns={FOOTER_COLUMNS} legalLinks={LEGAL_LINKS} tagline={FOOTER_TAGLINE} />;
}
