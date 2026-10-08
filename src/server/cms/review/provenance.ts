import type { ContentWarning, ContentWarningCode } from "@/lib/content/types";
import type { FieldErrors } from "@/server/lib/errors";

/**
 * Pure editorial checks shared by the lesson and flashcard services (§27 licensing, §43 accessibility). They run
 * before an item enters review, on top of the publish helper's own checks (invalid LaTeX, unknown blocks).
 */

export const COPYRIGHT_STATUSES = ["OWNED", "LICENSED", "PUBLIC_DOMAIN", "OPEN_LICENSE", "UNVERIFIED"] as const;
export type CopyrightStatusValue = (typeof COPYRIGHT_STATUSES)[number];

export interface ProvenanceFields {
  sourceId: string | null;
  author: string | null;
  copyrightStatus: CopyrightStatusValue | string;
  licenceCode: string | null;
  attribution?: string | null;
  sourceUrl?: string | null;
  publicationDate: Date | string | null;
}

export type ProvenanceRequirement = "source" | "author" | "copyright" | "licence" | "publicationDate";

/** Lessons: every licensing field is required before review (§27; task brief). */
export const LESSON_PROVENANCE_REQUIREMENTS: readonly ProvenanceRequirement[] = ["source", "author", "copyright", "licence", "publicationDate"];
/** Flashcards: a cleared copyright status, a source and an author. */
export const FLASHCARD_PROVENANCE_REQUIREMENTS: readonly ProvenanceRequirement[] = ["source", "author", "copyright"];

function blank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === "";
}

/**
 * Licensing problems of an item (empty = none), keyed by form field. Also enforces the database's licence CHECKs
 * (LICENSED needs a source; OPEN_LICENSE a source or a licence code) so the editor sees them as field errors.
 */
export function provenanceIssues(fields: ProvenanceFields, required: readonly ProvenanceRequirement[]): FieldErrors {
  const errors: FieldErrors = {};
  const add = (field: string, message: string) => (errors[field] ??= []).push(message);
  if (required.includes("copyright") && fields.copyrightStatus === "UNVERIFIED") {
    add("copyrightStatus", "Clear the copyright status (original, licensed, public domain or open licence) before review.");
  }
  if (required.includes("source") && blank(fields.sourceId)) add("sourceId", "Choose the content source this item comes from.");
  if (required.includes("author") && blank(fields.author)) add("author", "Name the author.");
  if (required.includes("licence") && blank(fields.licenceCode)) {
    add("licenceCode", 'Give the licence, e.g. "PROPRIETARY" for original work or "CC-BY-4.0".');
  }
  if (required.includes("publicationDate") && (fields.publicationDate === null || fields.publicationDate === "")) {
    add("publicationDate", "Give the publication date.");
  }
  if (fields.copyrightStatus === "LICENSED" && blank(fields.sourceId)) {
    add("sourceId", "Licensed content must name the content source that holds the licence.");
  }
  if (fields.copyrightStatus === "OPEN_LICENSE" && blank(fields.sourceId) && blank(fields.licenceCode)) {
    add("licenceCode", "Open-licensed content needs a source or a licence code.");
  }
  return errors;
}

/**
 * Renderer warnings that block review in the CMS (§43 accessibility, §3.10): broken or undescribed images, invalid
 * LaTeX and unknown blocks. Other warnings (removed raw HTML, money written with `$`) stay advisory.
 */
export const REVIEW_BLOCKING_WARNINGS: ReadonlySet<ContentWarningCode> = new Set<ContentWarningCode>([
  "image-missing-alt",
  "image-unresolved",
  "image-external",
  "math-error",
  "unknown-directive",
]);

/** Adds the blocking renderer warnings of `field` to `errors`. */
export function warningIssues(errors: FieldErrors, field: string, warnings: readonly ContentWarning[]): FieldErrors {
  for (const warning of warnings) {
    if (!REVIEW_BLOCKING_WARNINGS.has(warning.code)) continue;
    (errors[field] ??= []).push(warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`);
  }
  return errors;
}

/** Merges field errors (pure). */
export function mergeIssues(...parts: readonly FieldErrors[]): FieldErrors {
  const out: FieldErrors = {};
  for (const part of parts) {
    for (const [field, messages] of Object.entries(part)) {
      const list = (out[field] ??= []);
      for (const message of messages) if (!list.includes(message)) list.push(message);
    }
  }
  return out;
}
