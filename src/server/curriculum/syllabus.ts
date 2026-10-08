import "server-only";
import type { EnrollmentStatus, Prisma, SyllabusStatus } from "@/generated/prisma/client";
import { localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { db, type DbClient } from "@/server/db";
import { ENROLLABLE_SYLLABUS_STATUSES, PUBLISHED_SYLLABUS_STATUSES, selectSyllabusVersion } from "./core";

/**
 * Syllabus versions (§26, CLAUDE.md rule 8, ARCHITECTURE §4.3). One `Syllabus` row per version; students pin a
 * version on `SubjectEnrollment.syllabusId` and keep it until the explicit, audited "move to the new version" flow.
 * Every per-topic read for a student must use the PINNED version from {@link getSyllabusForEnrollment}, never the
 * subject's current version.
 */

/** A syllabus version as shown to students and used by other services. Dates are `YYYY-MM-DD`. */
export interface SyllabusSummary {
  id: string;
  subjectId: string;
  code: string | null;
  title: string;
  versionLabel: string;
  status: SyllabusStatus;
  effectiveFrom: LocalDate;
  effectiveTo: LocalDate | null;
  overview: string | null;
  assessmentOverview: string | null;
  officialDocumentUrl: string | null;
  gradeSchemeId: string | null;
  /** Dev-seed demo version (never present in production data). */
  isDemo: boolean;
}

export const SYLLABUS_SUMMARY_SELECT = {
  id: true,
  subjectId: true,
  code: true,
  title: true,
  versionLabel: true,
  status: true,
  effectiveFrom: true,
  effectiveTo: true,
  overview: true,
  assessmentOverview: true,
  officialDocumentUrl: true,
  gradeSchemeId: true,
  isDemo: true,
} as const satisfies Prisma.SyllabusSelect;

type SyllabusSummaryRow = Prisma.SyllabusGetPayload<{ select: typeof SYLLABUS_SUMMARY_SELECT }>;

/** Maps a selected row to {@link SyllabusSummary} (DATE columns become calendar dates without time-zone shifts). */
export function toSyllabusSummary(row: SyllabusSummaryRow): SyllabusSummary {
  return {
    ...row,
    effectiveFrom: localDateFromDateColumn(row.effectiveFrom),
    effectiveTo: row.effectiveTo ? localDateFromDateColumn(row.effectiveTo) : null,
  };
}

/** A published syllabus version by id (any published status, so pinned students keep access); null for DRAFT/unknown. */
export async function getPublishedSyllabus(syllabusId: string, client: DbClient = db): Promise<SyllabusSummary | null> {
  const row = await client.syllabus.findFirst({
    where: { id: syllabusId, status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } },
    select: SYLLABUS_SUMMARY_SELECT,
  });
  return row ? toSyllabusSummary(row) : null;
}

/**
 * The syllabus version a NEW enrolment should pin. Without `at`: the subject's CURRENT version. With `at` (the target
 * exam date, a Date or a `YYYY-MM-DD` calendar date): the enrollable version whose effective range contains it,
 * falling back to CURRENT (rules in `selectSyllabusVersion`). Null when the subject has no published version.
 */
export async function resolveCurrentSyllabus(subjectId: string, at?: Date | LocalDate | null, client: DbClient = db): Promise<SyllabusSummary | null> {
  const rows = await client.syllabus.findMany({
    where: { subjectId, status: { in: [...ENROLLABLE_SYLLABUS_STATUSES] } },
    select: SYLLABUS_SUMMARY_SELECT,
  });
  const versions = rows.map(toSyllabusSummary);
  const date = at === undefined || at === null ? null : typeof at === "string" ? at : localDateString(at);
  return selectSyllabusVersion(versions, date);
}

/** The enrolment and the version it pins. */
export interface PinnedSyllabus {
  enrollment: {
    id: string;
    userId: string;
    subjectId: string;
    routeId: string | null;
    status: EnrollmentStatus;
    targetExamSessionId: string | null;
    syllabusPinnedAt: Date;
  };
  /** The PINNED version (may be SUPERSEDED or ARCHIVED: pinned students keep their version, §26). */
  syllabus: SyllabusSummary;
}

/**
 * The syllabus version pinned by a student's enrolment in a subject (§26: "a student studying an older syllabus
 * retains access to the correct content"). Returns null when the student is not enrolled.
 *
 * Authorisation is the caller's job: pass the acting student's own id, or a student id the caller has already
 * checked access to (linked parent, class teacher).
 */
export async function getSyllabusForEnrollment(userId: string, subjectId: string, client: DbClient = db): Promise<PinnedSyllabus | null> {
  const row = await client.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId, subjectId } },
    select: {
      id: true,
      userId: true,
      subjectId: true,
      routeId: true,
      status: true,
      targetExamSessionId: true,
      syllabusPinnedAt: true,
      syllabus: { select: SYLLABUS_SUMMARY_SELECT },
    },
  });
  if (!row) return null;
  const { syllabus, ...enrollment } = row;
  return { enrollment, syllabus: toSyllabusSummary(syllabus) };
}

/** Every published version of a subject, newest first (version history on the subject page and in the CMS). */
export async function listSyllabusVersions(subjectId: string, client: DbClient = db): Promise<SyllabusSummary[]> {
  const rows = await client.syllabus.findMany({
    where: { subjectId, status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } },
    select: SYLLABUS_SUMMARY_SELECT,
    orderBy: [{ effectiveFrom: "desc" }, { versionLabel: "desc" }],
  });
  return rows.map(toSyllabusSummary);
}
