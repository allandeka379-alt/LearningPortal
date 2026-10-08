import type { Metadata } from "next";
import { COOKIES_SECTIONS, COOKIES_SUMMARY, COOKIES_VERSION } from "@/components/marketing/legal/cookies";
import { LegalDocument } from "@/components/marketing/legal/LegalDocument";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  // A draft template: kept out of search indexes until it has been reviewed and adopted.
  return marketingMetadata({
    title: "Cookie notice (draft)",
    description: "The cookies and browser storage the platform uses, and why. No advertising or tracking cookies.",
    path: "/legal/cookies",
    noIndex: true,
  });
}

/** /legal/cookies: DRAFT cookie notice listing the cookies the code actually sets. */
export default function CookiesPage() {
  return <LegalDocument title="Cookie notice" summary={COOKIES_SUMMARY} version={COOKIES_VERSION} sections={COOKIES_SECTIONS} />;
}
