import type { Choice } from "./types";

/**
 * Select options of the editorial forms and filters (UI copy only; plain module so both Server and Client Components
 * can import the values — exports of "use client" modules are references, not data, on the server).
 */

export const LESSON_KIND_OPTIONS: readonly Choice[] = [
  { value: "LESSON", label: "Lesson" },
  { value: "REVISION_NOTES", label: "Revision notes" },
  { value: "WORKED_EXAMPLES", label: "Worked examples" },
  { value: "EXAM_TIPS", label: "Exam tips" },
  { value: "STUDY_GUIDE", label: "Study guide (public SEO page)" },
  { value: "ARTICLE", label: "Article (public SEO page)" },
];

export const ACCESS_TIER_OPTIONS: readonly Choice[] = [
  { value: "PREMIUM", label: "Premium (subscribers only)" },
  { value: "FREE", label: "Free preview (any signed-in student)" },
  { value: "PUBLIC", label: "Public (no sign-in; SEO pages)" },
];

export const CARD_TYPE_OPTIONS: readonly Choice[] = [
  { value: "DEFINITION", label: "Definition" },
  { value: "FORMULA", label: "Formula" },
  { value: "VOCABULARY", label: "Vocabulary" },
  { value: "CONCEPT", label: "Key concept" },
  { value: "DATE", label: "Date" },
  { value: "FACT", label: "Fact" },
];

export const COPYRIGHT_OPTIONS: readonly Choice[] = [
  { value: "UNVERIFIED", label: "Not yet cleared" },
  { value: "OWNED", label: "Original (owned by the platform)" },
  { value: "LICENSED", label: "Licensed (agreement with the source)" },
  { value: "OPEN_LICENSE", label: "Open licence (e.g. CC BY)" },
  { value: "PUBLIC_DOMAIN", label: "Public domain" },
];

export const PURPOSE_OPTIONS: readonly Choice[] = [
  { value: "CONTENT_IMAGE", label: "Content image (photo, illustration)" },
  { value: "DIAGRAM", label: "Diagram, graph or chart" },
];

export const VISIBILITY_OPTIONS: readonly Choice[] = [
  { value: "AUTHENTICATED", label: "Signed-in users (premium and free content)" },
  { value: "PUBLIC", label: "Public (public SEO pages; copyright must be cleared)" },
];

/** Label of an option value (falls back to the value). */
export function optionLabel(options: readonly Choice[], value: string | null | undefined): string {
  return options.find((option) => option.value === value)?.label ?? value ?? "—";
}
