import type { FooterColumn } from "@/components/layout/MarketingFooter";
import type { NavLinkItem } from "@/components/layout/nav-types";

/**
 * Navigation of the public site (§45). UI copy and routes only (no product data). Shared by the (marketing) layout and
 * any other public group that wants the same chrome (e.g. the SEO curriculum pages).
 */

/** Sign-up entry points. `next` targets are validated again by /register (`safeNextPath`). */
export const SIGN_UP_HREF = "/register";
export const SIGN_IN_HREF = "/login";
export const DIAGNOSTIC_SIGN_UP_HREF = "/register?next=/app/diagnostic";
export const DAILY_SIGN_UP_HREF = "/register?next=/app/daily";
/** Signed-in plan management (link only: public pages never read the session). */
export const BILLING_HREF = "/app/billing";

export const MARKETING_NAV: readonly NavLinkItem[] = [
  { href: "/subjects", label: "Subjects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/schools", label: "Schools" },
  { href: "/daily", label: "Daily question" },
];

export const MARKETING_CTA: NavLinkItem = { href: SIGN_UP_HREF, label: "Start free" };
export const MARKETING_SIGN_IN: NavLinkItem = { href: SIGN_IN_HREF, label: "Sign in" };

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Study",
    links: [
      { href: "/subjects", label: "Subjects" },
      { href: "/daily", label: "Daily question" },
      { href: "/exam-countdown", label: "Exam countdown" },
      { href: DIAGNOSTIC_SIGN_UP_HREF, label: "Free diagnostic" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/schools", label: "For schools" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About us" },
      { href: SIGN_IN_HREF, label: "Sign in" },
      { href: SIGN_UP_HREF, label: "Create an account" },
    ],
  },
];

export const LEGAL_LINKS: readonly NavLinkItem[] = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookies" },
];

/** Footer line under the logo: what the platform is for, no claims. */
export const FOOTER_TAGLINE = "Study for ZIMSEC and Cambridge O-Level and A-Level examinations.";
