import { SUBJECTS } from "../../../../prisma/seed/data/catalogue";

/**
 * Verification notes from the seeded catalogue (prisma/seed/data/catalogue.ts). Every seeded subject is
 * `verified: false`: it was named from public information and must be confirmed against the board's official subject
 * list (name, code, availability for the current exam year) before it is shown to students. Some entries carry a
 * specific note (e.g. "Confirm current ZIMSEC title."). Read-only data; nothing here is shown to students.
 */

export const SEED_VERIFICATION_POLICY =
  "Seeded from the starter catalogue as unverified: confirm the name, official code and availability for the current exam year against the board's official subject list, then record that list as this subject's source.";

export interface SeedSubjectNote {
  /** Name the seed used (may differ from the current name after edits). */
  seededName: string;
  /** Official code the seed used (null = left blank on purpose, e.g. ZIMSEC codes changed with the reforms). */
  seededCode: string | null;
  /** Entry-specific note, if any. */
  note: string | null;
}

const BY_KEY = new Map<string, SeedSubjectNote>(
  SUBJECTS.map((subject) => [
    `${subject.boardSlug}/${subject.qualificationSlug}/${subject.slug}`,
    { seededName: subject.name, seededCode: subject.code, note: subject.note ?? null },
  ]),
);

/** The seed note of a subject identified by its public slugs, or null when it was not seeded. */
export function seedNoteFor(boardSlug: string, qualificationSlug: string, subjectSlug: string): SeedSubjectNote | null {
  return BY_KEY.get(`${boardSlug}/${qualificationSlug}/${subjectSlug}`) ?? null;
}
