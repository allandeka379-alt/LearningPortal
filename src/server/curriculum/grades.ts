import "server-only";
import { db } from "@/server/db";
import { memoizeAsync } from "@/server/lib/cache";
import type { GradeBand } from "@/server/exams/scoring";
import { CATALOGUE_CACHE_TTL_MS } from "./catalogue";

/**
 * Grade-estimate schemes (§12; ARCHITECTURE §4.2). Bands turn a percentage into an ESTIMATED grade with
 * `estimateGrade()` from `@/server/exams/scoring`; always show the scheme's `disclaimer` next to the result and never
 * present an estimate as an official grade (CLAUDE.md rule 6). Bands are frozen once an attempt used the scheme
 * (trigger), so a changed boundary is a new scheme row with `version + 1`.
 *
 * Resolution order for an attempt: Assessment.gradeScheme → SyllabusRoute.gradeScheme → Syllabus.gradeScheme →
 * qualification default ({@link getGradeScheme}); see {@link resolveGradeSchemeId}.
 */

export interface GradeSchemeBand extends GradeBand {
  /** 0 = best grade. */
  sortOrder: number;
  /** Counts as a pass for pass-rate analytics (§23). */
  isPass: boolean;
}

export interface GradeSchemeView {
  id: string;
  qualificationId: string;
  name: string;
  version: number;
  isEstimate: boolean;
  /** Student-facing caveat shown next to every estimated grade. */
  disclaimer: string | null;
  /** Best grade first. */
  bands: GradeSchemeBand[];
}

const SCHEME_SELECT = {
  id: true,
  qualificationId: true,
  name: true,
  version: true,
  isEstimate: true,
  disclaimer: true,
  bands: { select: { label: true, minPercent: true, sortOrder: true, isPass: true }, orderBy: { sortOrder: "asc" as const } },
} as const;

type SchemeRow = {
  id: string;
  qualificationId: string;
  name: string;
  version: number;
  isEstimate: boolean;
  disclaimer: string | null;
  bands: { label: string; minPercent: { toNumber(): number } | number; sortOrder: number; isPass: boolean }[];
};

function toView(row: SchemeRow): GradeSchemeView {
  return {
    id: row.id,
    qualificationId: row.qualificationId,
    name: row.name,
    version: row.version,
    isEstimate: row.isEstimate,
    disclaimer: row.disclaimer,
    bands: row.bands.map((band) => ({
      grade: band.label,
      minPercent: typeof band.minPercent === "number" ? band.minPercent : band.minPercent.toNumber(),
      sortOrder: band.sortOrder,
      isPass: band.isPass,
    })),
  };
}

/** The qualification's DEFAULT active grade scheme with its bands (cached); null when none is configured. */
export const getGradeScheme = memoizeAsync(
  async (qualificationId: string): Promise<GradeSchemeView | null> => {
    const row = await db.gradeScheme.findFirst({
      where: { qualificationId, isDefault: true, isActive: true },
      select: SCHEME_SELECT,
    });
    return row ? toView(row) : null;
  },
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 128 },
);

/** A grade scheme by id (e.g. the one an attempt recorded), with its bands (cached). */
export const getGradeSchemeById = memoizeAsync(
  async (gradeSchemeId: string): Promise<GradeSchemeView | null> => {
    const row = await db.gradeScheme.findUnique({ where: { id: gradeSchemeId }, select: SCHEME_SELECT });
    return row ? toView(row) : null;
  },
  { ttlMs: CATALOGUE_CACHE_TTL_MS, maxEntries: 512 },
);

/**
 * Applies the documented resolution order (pure): the most specific configured scheme wins, else the qualification
 * default (pass the id from {@link getGradeScheme}).
 */
export function resolveGradeSchemeId(candidates: {
  assessmentGradeSchemeId?: string | null;
  routeGradeSchemeId?: string | null;
  syllabusGradeSchemeId?: string | null;
  qualificationDefaultId?: string | null;
}): string | null {
  return (
    candidates.assessmentGradeSchemeId ??
    candidates.routeGradeSchemeId ??
    candidates.syllabusGradeSchemeId ??
    candidates.qualificationDefaultId ??
    null
  );
}

/** Drops cached grade schemes on this instance (call after admin edits). */
export function invalidateGradeSchemeCache(): void {
  getGradeScheme.clear();
  getGradeSchemeById.clear();
}
