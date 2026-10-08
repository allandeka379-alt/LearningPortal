import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal/LegalDocument";
import { TERMS_SECTIONS, TERMS_SUMMARY, TERMS_VERSION } from "@/components/marketing/legal/terms";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  // A draft template: kept out of search indexes until it has been reviewed and adopted.
  return marketingMetadata({
    title: "Terms of use (draft)",
    description: "The rules for using the platform: accounts, plans and payments, the AI tutor, content and acceptable use.",
    path: "/legal/terms",
    noIndex: true,
  });
}

/** /legal/terms: DRAFT terms of use. */
export default function TermsPage() {
  return <LegalDocument title="Terms of use" summary={TERMS_SUMMARY} version={TERMS_VERSION} sections={TERMS_SECTIONS} />;
}
