import type { FooterColumn } from "@/components/layout/MarketingFooter";
import type { NavLinkItem } from "@/components/layout/nav-types";
import { APP_NAME } from "@/lib/config";

/**
 * Navigation of the public site (§45; owner brief 2026-10-12: learning platform for Forms 3-6 plus exam candidates,
 * no free tier). UI copy and routes only (no product data). Shared by the (marketing) layout and any other public group
 * that wants the same chrome (e.g. the SEO curriculum pages).
 */

/** Sign-up entry points. `next` targets are validated again by /register (`safeNextPath`). */
export const SIGN_UP_HREF = "/register";
export const SIGN_IN_HREF = "/login";
/** Sign-up that lands on the in-app daily question once access is unlocked. */
export const DAILY_SIGN_UP_HREF = "/register?next=/app/daily";
/** Signed-in plan management (link only: public pages never read the session). */
export const BILLING_HREF = "/app/billing";

export const HOW_IT_WORKS_HREF = "/how-it-works";
export const EXAM_CANDIDATES_HREF = "/exam-candidates";

export const MARKETING_NAV: readonly NavLinkItem[] = [
  { href: HOW_IT_WORKS_HREF, label: "How it works" },
  { href: "/subjects", label: "Subjects" },
  { href: EXAM_CANDIDATES_HREF, label: "Exam candidates" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
];

export const MARKETING_CTA: NavLinkItem = { href: SIGN_UP_HREF, label: "Get full access" };
export const MARKETING_SIGN_IN: NavLinkItem = { href: SIGN_IN_HREF, label: "Sign in" };

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Learn",
    links: [
      { href: HOW_IT_WORKS_HREF, label: "How it works" },
      { href: "/subjects", label: "Subjects" },
      { href: EXAM_CANDIDATES_HREF, label: "For exam candidates" },
      { href: "/daily", label: "Today's question" },
      { href: "/exam-countdown", label: "Exam countdown" },
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
    title: APP_NAME,
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
export const FOOTER_TAGLINE = "Courses, practice and mock exams for Form 3 to Form 6: ZIMSEC and Cambridge, O-Level and A-Level.";
