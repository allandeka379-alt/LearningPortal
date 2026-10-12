/**
 * Pure shaping for the "Form 3 to Form 6" sections of the public site (owner brief 2026-10-12: a learning platform for
 * Forms 3-6 that also serves exam candidates). Year groups come from the database (`YearGroup`, with the level most
 * students in that year study); this module only picks the stage of each year and links it to the listed
 * qualifications of its level. Unit tested.
 */
import type { MarketingLevel } from "./catalogue-core";
import { qualificationLabel } from "./catalogue-core";

export interface YearGroupRow {
  code: string;
  name: string;
  ordinal: number;
  typicalLevel: { id: string; slug: string; name: string } | null;
}

/**
 * Where a year sits in its course: the first year of a level starts the course, the last year of a level writes the
 * exam (O-Level: Form 3 starts, Form 4 writes; A-Level: Lower Sixth starts, Upper Sixth writes). A level with a single
 * listed year counts as an exam year.
 */
export type FormStage = "course" | "exam";

export interface MarketingForm {
  code: string;
  /** "Form 3", "Lower Sixth (Form 5)". */
  name: string;
  stage: FormStage;
  level: { id: string; slug: string; name: string };
  /** Listed qualifications of the year's level, e.g. "ZIMSEC O-Level", "Cambridge IGCSE", with their public pages. */
  qualifications: { id: string; label: string; href: string | null; comingSoon: boolean }[];
}

/**
 * The years shown on the public site: active year groups that have a typical level which is listed in the catalogue,
 * in age order, each with its stage. Years without a level (e.g. Forms 1-2 before O-Level) are left out.
 */
export function buildMarketingForms(yearGroups: readonly YearGroupRow[], levels: readonly MarketingLevel[]): MarketingForm[] {
  const levelById = new Map(levels.map((level) => [level.id, level]));
  const withLevel = yearGroups
    .filter((year): year is YearGroupRow & { typicalLevel: NonNullable<YearGroupRow["typicalLevel"]> } => year.typicalLevel !== null)
    .filter((year) => levelById.has(year.typicalLevel.id))
    .slice()
    .sort((a, b) => a.ordinal - b.ordinal);

  const lastOrdinalByLevel = new Map<string, number>();
  for (const year of withLevel) {
    const current = lastOrdinalByLevel.get(year.typicalLevel.id);
    if (current === undefined || year.ordinal > current) lastOrdinalByLevel.set(year.typicalLevel.id, year.ordinal);
  }

  return withLevel.map((year) => {
    const level = levelById.get(year.typicalLevel.id);
    return {
      code: year.code,
      name: year.name,
      stage: lastOrdinalByLevel.get(year.typicalLevel.id) === year.ordinal ? "exam" : "course",
      level: { id: year.typicalLevel.id, slug: year.typicalLevel.slug, name: year.typicalLevel.name },
      qualifications: (level?.qualifications ?? []).map((qualification) => ({
        id: qualification.id,
        label: qualificationLabel(qualification.board.shortName, qualification.shortName),
        href: qualification.href,
        comingSoon: qualification.comingSoon,
      })),
    };
  });
}

/** Published content counts for the public site. Real numbers only (CLAUDE.md rule 6). */
export interface ContentStats {
  subjects: number;
  lessons: number;
  questions: number;
  flashcards: number;
  tests: number;
}

/**
 * Rounds a count DOWN to a figure that reads well in marketing copy without overstating it: 2,473 -> "2,400+",
 * 98 -> "90+", 7 -> "7". Never rounds up.
 */
export function roundedCount(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0";
  const n = Math.floor(value);
  if (n < 20) return String(n);
  const step = n < 100 ? 10 : n < 1_000 ? 50 : n < 10_000 ? 100 : 1_000;
  const floored = Math.floor(n / step) * step;
  const label = floored.toLocaleString("en-GB");
  return floored === n ? label : `${label}+`;
}

/** True when there is enough published content to show the numbers at all (an empty catalogue shows none). */
export function hasStats(stats: ContentStats): boolean {
  return stats.lessons > 0 && stats.subjects > 0;
}
