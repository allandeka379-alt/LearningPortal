import type { Metadata } from "next";
import { LegalDocument } from "@/components/marketing/legal/LegalDocument";
import { PRIVACY_SECTIONS, PRIVACY_SUMMARY, PRIVACY_VERSION } from "@/components/marketing/legal/privacy";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  // A draft template: kept out of search indexes until it has been reviewed and adopted.
  return marketingMetadata({
    title: "Privacy notice (draft)",
    description: "How personal information is collected, used, shared and protected, including for learners under 18.",
    path: "/legal/privacy",
    noIndex: true,
  });
}

/** /legal/privacy: DRAFT privacy notice aligned with the Cyber and Data Protection Act [Chapter 12:07] principles. */
export default function PrivacyPage() {
  return <LegalDocument title="Privacy notice" summary={PRIVACY_SUMMARY} version={PRIVACY_VERSION} sections={PRIVACY_SECTIONS} />;
}
