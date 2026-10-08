import { entitlementsSchema, NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import type { FieldErrors } from "@/server/lib/errors";

/**
 * Pure rules of study packs (§24, §27, §31): the entitlements a pack unlocks, PDF-export licensing and price amounts.
 * No I/O; unit tested in core.test.ts.
 */

const ENTITLEMENT_KEYS = new Set(Object.keys(NO_ENTITLEMENTS));

/**
 * Validates a pack's entitlements document with the SAME schema and key registry as plan entitlements
 * (`entitlementsSchema`). Missing keys default to "not included"; unknown keys are refused (a typo must never look
 * like a feature). Returns field errors keyed `entitlements.<key>`.
 */
export function parsePackEntitlements(raw: unknown): { ok: true; value: Entitlements } | { ok: false; errors: FieldErrors } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ok: false, errors: { entitlements: ["Choose what the pack unlocks."] } };
  const unknown = Object.keys(raw).filter((key) => !ENTITLEMENT_KEYS.has(key));
  if (unknown.length > 0) return { ok: false, errors: { entitlements: [`Unknown entitlement: ${unknown.join(", ")}.`] } };
  const parsed = entitlementsSchema.safeParse({ ...NO_ENTITLEMENTS, ...raw });
  if (parsed.success) return { ok: true, value: parsed.data };
  const errors: FieldErrors = {};
  for (const issue of parsed.error.issues) (errors[`entitlements.${issue.path.map(String).join(".")}`] ??= []).push(issue.message);
  return { ok: false, errors };
}

/** True when the document unlocks something beyond "no entitlements" (a pack that unlocks nothing cannot be sold). */
export function unlocksAnything(entitlements: Entitlements): boolean {
  return (Object.keys(NO_ENTITLEMENTS) as (keyof Entitlements)[]).some((key) => entitlements[key] !== NO_ENTITLEMENTS[key]);
}

// ---------------------------------------------------------------------------------------------------------------------
// PDF export licensing (§24 "PDF export optional where licensing permits", §27)
// ---------------------------------------------------------------------------------------------------------------------

export type PdfBlockReason = "copyright_unverified" | "licence_without_source" | "source_forbids_pdf" | "source_inactive" | "source_expired";

export interface PdfLicensingFacts {
  copyrightStatus: string;
  source: { permitsPdfExport: boolean; isActive: boolean; validUntil: Date | null } | null;
}

/**
 * Why an item may NOT be exported to PDF (null = it may): its copyright must be cleared; when it names a content
 * source, that source must permit PDF export and be active and in date; licensed / open-licensed items must name one
 * (their licence terms live on the source). Original or public-domain items without a source are the platform's own.
 */
export function pdfBlockReason(item: PdfLicensingFacts, today: Date): PdfBlockReason | null {
  if (item.copyrightStatus === "UNVERIFIED") return "copyright_unverified";
  if (item.source === null) return item.copyrightStatus === "LICENSED" || item.copyrightStatus === "OPEN_LICENSE" ? "licence_without_source" : null;
  if (!item.source.permitsPdfExport) return "source_forbids_pdf";
  if (!item.source.isActive) return "source_inactive";
  if (item.source.validUntil !== null && item.source.validUntil.getTime() < today.getTime()) return "source_expired";
  return null;
}

export const PDF_BLOCK_LABELS: Readonly<Record<PdfBlockReason, string>> = {
  copyright_unverified: "Copyright not cleared",
  licence_without_source: "Licensed without a recorded source",
  source_forbids_pdf: "The source's licence does not allow PDF export",
  source_inactive: "The source is no longer active",
  source_expired: "The source's licence has expired",
};

// ---------------------------------------------------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------------------------------------------------

/** Minor-unit digits of an ISO 4217 currency (2 when the runtime does not know it). */
export function currencyDigits(currency: string): number {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

/** "12.50" in USD → 1250. Null when the amount has more decimals than the currency allows. */
export function toMinorUnits(amount: string, currency: string): number | null {
  const digits = currencyDigits(currency);
  const match = /^(\d+)(?:\.(\d+))?$/.exec(amount.trim());
  if (!match) return null;
  const fraction = match[2] ?? "";
  if (fraction.length > digits) return null;
  const minor = Number(match[1]) * 10 ** digits + Number(fraction.padEnd(digits, "0") || "0");
  return Number.isSafeInteger(minor) && minor <= 2_147_483_647 ? minor : null;
}
