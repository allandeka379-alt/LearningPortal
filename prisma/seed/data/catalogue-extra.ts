/**
 * Catalogue details that `catalogue.ts` does not carry (extension file: catalogue.ts itself is shared and read-only
 * for the seed). Structure only, no syllabus content (§4).
 *
 * Verification policy (applied by prisma/seed/catalogue.ts):
 * - Country and boards are listed (AVAILABLE): they are the well-known entities the platform serves.
 * - Qualifications start COMING_SOON: listed honestly, not yet enrollable until content exists (§50).
 * - Subjects are `verified: false` in catalogue.ts, so they are seeded HIDDEN with no `sourceId`: never shown to
 *   students until the content team has checked name, code and availability against the board's official list and
 *   moved them to COMING_SOON / AVAILABLE (with the official list recorded as their ContentSource).
 */

export const COUNTRY_DETAILS: Readonly<Record<string, { slug: string; defaultLocale: string; dialCode: string }>> = {
  ZW: { slug: "zimbabwe", defaultLocale: "en-ZW", dialCode: "+263" },
};

/** Stable short codes (ExamBoard.code is unique, VARCHAR 32). */
export const BOARD_CODES: Readonly<Record<string, string>> = {
  zimsec: "ZIMSEC",
  cambridge: "CAIE",
};

/** Cross-board levels used to group qualifications in onboarding (§5 "Level"). */
export const QUALIFICATION_LEVELS: readonly { slug: "o-level" | "a-level"; name: string; shortName: string; description: string; sortOrder: number }[] = [
  {
    slug: "o-level",
    name: "O-Level",
    shortName: "O-Level",
    description: "Ordinary Level and equivalents such as Cambridge IGCSE, usually studied in Forms 3 and 4.",
    sortOrder: 1,
  },
  {
    slug: "a-level",
    name: "A-Level",
    shortName: "A-Level",
    description: "Advanced Level, including Cambridge International AS Level, usually studied in Lower and Upper Sixth.",
    sortOrder: 2,
  },
];

/** Qualification.code per `<board>/<qualification>` slug pair. */
export const QUALIFICATION_CODES: Readonly<Record<string, string>> = {
  "zimsec/o-level": "ZIMSEC-O",
  "zimsec/a-level": "ZIMSEC-A",
  "cambridge/igcse": "IGCSE",
  "cambridge/a-level": "AS-A",
};

/** School years per country (§5 "Year/form"); `levelSlug` is the level most students in that year study. */
export const YEAR_GROUPS: readonly { countryCode: string; code: string; name: string; ordinal: number; levelSlug: "o-level" | "a-level" }[] = [
  { countryCode: "ZW", code: "F1", name: "Form 1", ordinal: 1, levelSlug: "o-level" },
  { countryCode: "ZW", code: "F2", name: "Form 2", ordinal: 2, levelSlug: "o-level" },
  { countryCode: "ZW", code: "F3", name: "Form 3", ordinal: 3, levelSlug: "o-level" },
  { countryCode: "ZW", code: "F4", name: "Form 4", ordinal: 4, levelSlug: "o-level" },
  { countryCode: "ZW", code: "L6", name: "Lower Sixth (Form 5)", ordinal: 5, levelSlug: "a-level" },
  { countryCode: "ZW", code: "U6", name: "Upper Sixth (Form 6)", ordinal: 6, levelSlug: "a-level" },
];

/** BCP-47 language of subjects that are not taught in English (drives the search configuration). */
export const SUBJECT_LANGUAGES: Readonly<Record<string, string>> = {
  shona: "sn",
  ndebele: "nd",
  french: "fr",
};

/** The platform's own provenance record for original content (§27). */
export const ORIGINAL_CONTENT_SOURCE = {
  slug: "original-content",
  name: "Original content",
  type: "ORIGINAL",
  licenceCode: "PROPRIETARY",
  permitsCommercialUse: true,
  permitsDerivatives: true,
  permitsPdfExport: true,
  notes: "Lessons, questions and other material written by the platform's own content team.",
} as const;
