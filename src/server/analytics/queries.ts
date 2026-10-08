import "server-only";
import { Prisma } from "@/generated/prisma/client";
import type { DbClient } from "@/server/db";
import { addDays, type LocalDate } from "@/lib/dates";

/**
 * Shared, parameterised aggregate SQL for analytics (§35). Every query is a `$queryRaw` tagged template (CLAUDE.md
 * Prisma rules) that aggregates in Postgres — no row-by-row loops in application code — and is shaped to use an
 * existing index (noted per function).
 *
 * Demo exclusion (§50, User.isDemo "excluded from analytics"): callers fetch the (tiny; empty in production, where the
 * demo guard refuses such rows) set of demo user ids once and pass it as `demoUserIds`; queries filter with
 * `"userId" <> ALL($demoUserIds)`.
 */

/**
 * Predicate: a DailyActivity row (alias `d`) records real learning activity. Rows written only by the streak job for a
 * freeze day have zero activity and are excluded ("DAU counts only rows with activity", DailyActivity docs).
 */
export function activeDayPredicate(): Prisma.Sql {
  return Prisma.sql`(d."studySeconds" > 0 OR d."questionsAttempted" > 0 OR d."flashcardsReviewed" > 0
    OR d."lessonsCompleted" > 0 OR d."assessmentsCompleted" > 0)`;
}

/**
 * QuestionAttempt marking states that carry a (final or provisional) mark for an answered question. PENDING (not yet
 * marked) and UNANSWERED (closed without an answer) are not "attempted".
 */
export const MARKED_ANSWER_STATUSES = ["AUTO_MARKED", "AI_MARKED", "TEACHER_MARKED", "SELF_ASSESSED", "NEEDS_REVIEW"] as const;

/** Ids of dev-seed demo users (excluded from every metric). Sequential scan of User once per run; empty in production. */
export async function fetchDemoUserIds(client: DbClient): Promise<string[]> {
  const rows = await client.$queryRaw<{ id: string }[]>`SELECT u."id"::text AS id FROM "User" u WHERE u."isDemo"`;
  return rows.map((row) => row.id);
}

export interface LearnerActivityCounts {
  dau: number;
  wau: number;
  mau: number;
  /** Distinct users with a Student profile active in the 30-day window (§35 funnel "active students"). */
  studentsActive: number;
  /** Σ studySeconds on `date`. */
  studySeconds: number;
}

/**
 * DAU / WAU / MAU / 30-day active students and study time for `date` from DailyActivity (one scan of the 30-day
 * window through the `DailyActivity(date)` index).
 */
export async function learnerActivityCounts(
  client: DbClient,
  params: { date: LocalDate; demoUserIds: readonly string[] },
): Promise<LearnerActivityCounts> {
  const { date } = params;
  const weekStart = addDays(date, -6);
  const monthStart = addDays(date, -29);
  const rows = await client.$queryRaw<LearnerActivityCounts[]>`
    SELECT
      count(DISTINCT d."userId") FILTER (WHERE d."date" = ${date}::date)::int AS dau,
      count(DISTINCT d."userId") FILTER (WHERE d."date" >= ${weekStart}::date)::int AS wau,
      count(DISTINCT d."userId")::int AS mau,
      count(DISTINCT d."userId") FILTER (WHERE st."userId" IS NOT NULL)::int AS "studentsActive",
      coalesce(sum(d."studySeconds") FILTER (WHERE d."date" = ${date}::date), 0)::float8 AS "studySeconds"
    FROM "DailyActivity" d
    LEFT JOIN "Student" st ON st."userId" = d."userId"
    WHERE d."date" >= ${monthStart}::date AND d."date" <= ${date}::date
      AND ${activeDayPredicate()}
      AND d."userId" <> ALL(${[...params.demoUserIds]}::uuid[])`;
  const row = rows[0];
  return row ?? { dau: 0, wau: 0, mau: 0, studentsActive: 0, studySeconds: 0 };
}

/** DAU only (admin "today so far"). Uses the `DailyActivity(date)` index. */
export async function countActiveLearnersOn(
  client: DbClient,
  params: { date: LocalDate; demoUserIds: readonly string[] },
): Promise<number> {
  const rows = await client.$queryRaw<{ n: number }[]>`
    SELECT count(DISTINCT d."userId")::int AS n
    FROM "DailyActivity" d
    WHERE d."date" = ${params.date}::date AND ${activeDayPredicate()}
      AND d."userId" <> ALL(${[...params.demoUserIds]}::uuid[])`;
  return rows[0]?.n ?? 0;
}

export interface AnsweredQuestionGroup {
  /** "total" | "subject" | "topic" */
  level: "total" | "subject" | "topic";
  subjectId: string | null;
  topicId: string | null;
  attempted: number;
  correct: number;
}

/**
 * Answered-and-marked questions presented in [start, end), as a platform total plus per-subject and per-topic groups
 * (one scan via GROUPING SETS). Uses the BRIN index on `QuestionAttempt(createdAt)` (createdAt is immutable).
 */
export async function answeredQuestionGroups(
  client: DbClient,
  params: { start: Date; end: Date; demoUserIds: readonly string[] },
): Promise<AnsweredQuestionGroup[]> {
  const rows = await client.$queryRaw<
    { gSubject: number; gTopic: number; subjectId: string | null; topicId: string | null; attempted: number; correct: number }[]
  >`
    SELECT
      GROUPING(qa."subjectId")::int AS "gSubject",
      GROUPING(qa."topicId")::int AS "gTopic",
      qa."subjectId"::text AS "subjectId",
      qa."topicId"::text AS "topicId",
      count(*)::int AS attempted,
      count(*) FILTER (WHERE qa."isCorrect")::int AS correct
    FROM "QuestionAttempt" qa
    WHERE qa."createdAt" >= ${params.start} AND qa."createdAt" < ${params.end}
      AND qa."markingStatus" = ANY(${[...MARKED_ANSWER_STATUSES]}::"MarkingStatus"[])
      AND qa."userId" <> ALL(${[...params.demoUserIds]}::uuid[])
    GROUP BY GROUPING SETS ((), (qa."subjectId"), (qa."topicId"))`;
  return rows.map((row) => ({
    level: row.gSubject === 1 && row.gTopic === 1 ? "total" : row.gSubject === 0 ? "subject" : "topic",
    subjectId: row.gSubject === 0 ? row.subjectId : null,
    topicId: row.gTopic === 0 ? row.topicId : null,
    attempted: row.attempted,
    correct: row.correct,
  }));
}

/** Platform total of answered-and-marked questions presented in [start, end) (admin "today so far"; BRIN createdAt). */
export async function answeredQuestionTotals(
  client: DbClient,
  params: { start: Date; end: Date; demoUserIds: readonly string[] },
): Promise<{ attempted: number; correct: number }> {
  const rows = await client.$queryRaw<{ attempted: number; correct: number }[]>`
    SELECT count(*)::int AS attempted, count(*) FILTER (WHERE qa."isCorrect")::int AS correct
    FROM "QuestionAttempt" qa
    WHERE qa."createdAt" >= ${params.start} AND qa."createdAt" < ${params.end}
      AND qa."markingStatus" = ANY(${[...MARKED_ANSWER_STATUSES]}::"MarkingStatus"[])
      AND qa."userId" <> ALL(${[...params.demoUserIds]}::uuid[])`;
  return rows[0] ?? { attempted: 0, correct: 0 };
}
