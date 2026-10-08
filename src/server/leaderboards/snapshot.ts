import "server-only";
import type { LeaderboardMetric } from "@/generated/prisma/client";
import {
  DEFAULT_TIMEZONE,
  dateColumnFromLocalDate,
  isValidTimeZone,
  isoWeekKey,
  localDateString,
  startOfLocalDay,
  type LocalDate,
} from "@/lib/dates";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db } from "@/server/db";
import { displayedStreak } from "@/server/gamification/service";
import { logger } from "@/server/lib/logger";
import {
  DEFAULT_MIN_MOCKS,
  LIVE_PERIOD_KEY,
  WEEKLY_METRICS,
  buildBoardRows,
  isWeekKey,
  monthKeyOf,
  monthKeysOfWeek,
  monthRange,
  previousWeekKey,
  weekRange,
  type BoardRow,
  type StudentBoardFacts,
} from "./core";

/**
 * Leaderboard snapshot job (§20; ARCHITECTURE §3.7 `gamification.leaderboardSnapshot`, §4.7). Writes LeaderboardEntry
 * SCORES for students who opted in (Profile.leaderboardOptIn) — never computed live from raw activity on page views.
 *
 * - Hourly run for the current ISO week: WEEKLY_XP / WEEKLY_QUESTIONS (that week), STREAK / SUBJECT_MASTERY ("LIVE")
 *   and MOCK_AVERAGE for the month(s) the week touches (up to now).
 * - Final run after the week ends (`final: true`): the week's WEEKLY_* scores once more (late syncs), its months'
 *   MOCK_AVERAGE, then final dense ranks (`rank`) and last week's rank (`previousRank`) for movement arrows.
 * - Students are processed in batches (cursor on userId) with ~6 indexed queries per batch (no N+1). Each batch upserts
 *   only CHANGED values (`ON CONFLICT … DO UPDATE … WHERE value IS DISTINCT FROM`) and deletes the batch's rows that
 *   no longer apply (left a class, score dropped to zero); a final sweep removes rows of students who opted out or
 *   are no longer active students. Opting out in settings already deletes a student's rows immediately.
 * - Weekly values come from DailyActivity (student-local dates); mock months use Africa/Harare day boundaries.
 *
 * Idempotent: running a period twice changes nothing the second time.
 */

/** Platform time zone for month windows and "the current week" of the scheduler. */
export const PLATFORM_TIMEZONE = DEFAULT_TIMEZONE;
const DEFAULT_BATCH_SIZE = 500;
const UPSERT_CHUNK = 2_000;

export interface ComputeLeaderboardsOptions {
  now?: Date;
  /** Weekly close: weekly metrics + months of the week, then final ranks. */
  final?: boolean;
  /** Restrict to these users (on-demand refresh after opting in; tests). Skips the global opt-out sweep. */
  userIds?: readonly string[];
  batchSize?: number;
  minMocks?: number;
}

export interface ComputeLeaderboardsResult {
  weekKey: string;
  monthKeys: string[];
  final: boolean;
  students: number;
  /** Rows inserted or whose value changed. */
  written: number;
  /** Rows removed (no longer applicable, or the student opted out). */
  removed: number;
  /** Rows given a final rank (weekly close only). */
  ranked: number;
}

/** The ISO week key of `now` in the platform time zone. */
export function currentWeekKey(now: Date = new Date()): string {
  return isoWeekKey(localDateString(now, PLATFORM_TIMEZONE));
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

interface Board {
  metric: LeaderboardMetric;
  periodKey: string;
}

/** Month keys of the week whose first day is not in the future (the hourly run never computes next month). */
function monthsUpTo(weekKey: string, today: LocalDate): string[] {
  const current = monthKeyOf(today);
  return monthKeysOfWeek(weekKey).filter((month) => month <= current);
}

interface StudentRow {
  userId: string;
  countryId: string | null;
  timezone: string;
}

/** Loads the facts of one batch of students with one query per fact table. */
async function loadBatchFacts(
  students: readonly StudentRow[],
  input: { weekKey: string; monthKeys: readonly string[]; metrics: ReadonlySet<LeaderboardMetric>; now: Date },
): Promise<{ facts: Map<string, StudentBoardFacts>; mocksByMonth: Map<string, Map<string, { subjectId: string; percentage: number }[]>> }> {
  const ids = students.map((s) => s.userId);
  const { start, end } = weekRange(input.weekKey);
  const wantsWeekly = input.metrics.has("WEEKLY_XP") || input.metrics.has("WEEKLY_QUESTIONS");
  const wantsStreak = input.metrics.has("STREAK");
  const wantsMastery = input.metrics.has("SUBJECT_MASTERY");

  const [weekly, stats, schools, classes, mastery] = await Promise.all([
    wantsWeekly
      ? db.dailyActivity.groupBy({
          by: ["userId"],
          where: { userId: { in: ids }, date: { gte: dateColumnFromLocalDate(start), lte: dateColumnFromLocalDate(end) } },
          _sum: { xpEarned: true, questionsAttempted: true },
        })
      : Promise.resolve([]),
    wantsStreak
      ? db.learnerStats.findMany({
          where: { userId: { in: ids } },
          select: {
            userId: true,
            currentStreak: true,
            longestStreak: true,
            lastStreakDate: true,
            streakFreezesAvailable: true,
            weekStartDate: true,
            weekGoalMet: true,
          },
        })
      : Promise.resolve([]),
    db.schoolMember.findMany({
      where: { userId: { in: ids }, role: "STUDENT", status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
      select: { userId: true, schoolId: true },
    }),
    db.classMember.findMany({
      where: { userId: { in: ids }, status: "ACTIVE", class: { archivedAt: null } },
      select: { userId: true, classId: true, class: { select: { subjectId: true } } },
    }),
    wantsMastery ? loadActiveMastery(ids) : Promise.resolve([]),
  ]);

  const mocksByMonth = new Map<string, Map<string, { subjectId: string; percentage: number }[]>>();
  for (const monthKey of input.monthKeys) {
    const range = monthRange(monthKey);
    const rows = await db.assessmentAttempt.findMany({
      where: {
        userId: { in: ids },
        mode: "MOCK_EXAM",
        status: "MARKED",
        percentage: { not: null },
        submittedAt: { gte: startOfLocalDay(range.start, PLATFORM_TIMEZONE), lt: startOfLocalDay(range.endExclusive, PLATFORM_TIMEZONE) },
      },
      select: { userId: true, subjectId: true, percentage: true },
    });
    mocksByMonth.set(
      monthKey,
      groupByUser(
        rows.flatMap((row) => (row.percentage === null ? [] : [{ userId: row.userId, subjectId: row.subjectId, percentage: row.percentage }])),
        (row) => ({ subjectId: row.subjectId, percentage: row.percentage }),
      ),
    );
  }

  const weeklyByUser = new Map(weekly.map((w) => [w.userId, w._sum]));
  const statsByUser = new Map(stats.map((s) => [s.userId, s]));
  const schoolsByUser = groupByUser(schools, (s) => s.schoolId);
  const classesByUser = groupByUser(classes, (c) => ({ classId: c.classId, subjectId: c.class.subjectId }));
  const masteryByUser = groupByUser(mastery, (m) => ({ subjectId: m.subjectId, percent: m.progressPercent }));
  const facts = new Map<string, StudentBoardFacts>();
  for (const student of students) {
    const sums = weeklyByUser.get(student.userId);
    const stat = statsByUser.get(student.userId) ?? null;
    facts.set(student.userId, {
      userId: student.userId,
      countryId: student.countryId,
      schoolIds: schoolsByUser.get(student.userId) ?? [],
      classes: classesByUser.get(student.userId) ?? [],
      weeklyXp: sums?.xpEarned ?? 0,
      weeklyQuestions: sums?.questionsAttempted ?? 0,
      streak: stat ? displayedStreak(stat, localDateString(input.now, safeZone(student.timezone))) : 0,
      mocks: [],
      mastery: masteryByUser.get(student.userId) ?? [],
    });
  }
  return { facts, mocksByMonth };
}

/**
 * SubjectProgress of the batch's ACTIVE enrolments. Two per-user index reads instead of a relation filter: Prisma
 * renders `enrollment: { status }` as a join the planner answers by hashing every enrolment of the platform for each
 * batch of 500 students (scripts/perf: 36 ms -> 3 ms per batch at 100k enrolments, growing with the platform).
 */
async function loadActiveMastery(ids: readonly string[]): Promise<{ userId: string; subjectId: string; progressPercent: number }[]> {
  const [progress, active] = await Promise.all([
    db.subjectProgress.findMany({
      where: { userId: { in: [...ids] }, progressPercent: { gt: 0 } },
      select: { userId: true, subjectId: true, progressPercent: true },
    }),
    db.subjectEnrollment.findMany({ where: { userId: { in: [...ids] }, status: "ACTIVE" }, select: { userId: true, subjectId: true } }),
  ]);
  const activeKeys = new Set(active.map((e) => `${e.userId}:${e.subjectId}`));
  return progress.filter((p) => activeKeys.has(`${p.userId}:${p.subjectId}`));
}

function groupByUser<R extends { userId: string }, V>(rows: readonly R[], map: (row: R) => V): Map<string, V[]> {
  const grouped = new Map<string, V[]>();
  for (const row of rows) {
    const list = grouped.get(row.userId);
    if (list) list.push(map(row));
    else grouped.set(row.userId, [map(row)]);
  }
  return grouped;
}

function columns(rows: readonly BoardRow[]) {
  return {
    metrics: rows.map((r) => r.metric as string),
    periods: rows.map((r) => r.periodKey),
    scopes: rows.map((r) => r.scopeType as string),
    scopeIds: rows.map((r) => r.scopeId),
    userIds: rows.map((r) => r.userId),
    values: rows.map((r) => r.value),
  };
}

/** Upserts rows, touching only values that changed. Returns rows inserted or updated. */
async function upsertRows(rows: readonly BoardRow[], now: Date): Promise<number> {
  let written = 0;
  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const chunk = rows.slice(i, i + UPSERT_CHUNK);
    const global = columns(chunk.filter((r) => r.scopeId === null));
    const scoped = columns(chunk.filter((r) => r.scopeId !== null));
    if (global.userIds.length > 0) {
      written += await db.$executeRaw`
        INSERT INTO "LeaderboardEntry" ("id", "metric", "periodKey", "scopeType", "scopeId", "userId", "value", "computedAt")
        SELECT uuidv7(), r."metric"::"LeaderboardMetric", r."periodKey", r."scopeType"::"LeaderboardScope", NULL, r."userId", r."value", ${now}
          FROM unnest(${global.metrics}::text[], ${global.periods}::text[], ${global.scopes}::text[], ${global.userIds}::uuid[], ${global.values}::float8[])
            AS r("metric", "periodKey", "scopeType", "userId", "value")
        ON CONFLICT ("metric", "periodKey", "scopeType", "userId") WHERE "scopeId" IS NULL
        DO UPDATE SET "value" = EXCLUDED."value", "computedAt" = EXCLUDED."computedAt"
         WHERE "LeaderboardEntry"."value" IS DISTINCT FROM EXCLUDED."value"`;
    }
    if (scoped.userIds.length > 0) {
      written += await db.$executeRaw`
        INSERT INTO "LeaderboardEntry" ("id", "metric", "periodKey", "scopeType", "scopeId", "userId", "value", "computedAt")
        SELECT uuidv7(), r."metric"::"LeaderboardMetric", r."periodKey", r."scopeType"::"LeaderboardScope", r."scopeId", r."userId", r."value", ${now}
          FROM unnest(${scoped.metrics}::text[], ${scoped.periods}::text[], ${scoped.scopes}::text[], ${scoped.scopeIds}::uuid[],
                      ${scoped.userIds}::uuid[], ${scoped.values}::float8[])
            AS r("metric", "periodKey", "scopeType", "scopeId", "userId", "value")
        ON CONFLICT ("metric", "periodKey", "scopeType", "scopeId", "userId") WHERE "scopeId" IS NOT NULL
        DO UPDATE SET "value" = EXCLUDED."value", "computedAt" = EXCLUDED."computedAt"
         WHERE "LeaderboardEntry"."value" IS DISTINCT FROM EXCLUDED."value"`;
    }
  }
  return written;
}

/** Deletes the batch students' rows on the computed boards that this run did not produce. */
async function deleteStaleRows(userIds: readonly string[], boards: readonly Board[], rows: readonly BoardRow[]): Promise<number> {
  if (userIds.length === 0 || boards.length === 0) return 0;
  const keep = columns(rows);
  // periodKey = ANY(...) is implied by the board match below; spelled out it becomes an index condition of
  // (userId, periodKey), so only the computed periods are read instead of the batch's whole board history.
  return db.$executeRaw`
    DELETE FROM "LeaderboardEntry" e
     WHERE e."userId" = ANY(${[...userIds]}::uuid[])
       AND e."periodKey" = ANY(${[...new Set(boards.map((b) => b.periodKey))]}::text[])
       AND EXISTS (SELECT 1 FROM unnest(${boards.map((b) => b.metric as string)}::"LeaderboardMetric"[], ${boards.map((b) => b.periodKey)}::text[]) AS b("metric", "periodKey")
                    WHERE b."metric" = e."metric" AND b."periodKey" = e."periodKey")
       AND NOT EXISTS (
             SELECT 1 FROM unnest(${keep.metrics}::text[], ${keep.periods}::text[], ${keep.scopes}::text[], ${keep.scopeIds}::uuid[], ${keep.userIds}::uuid[])
                        AS k("metric", "periodKey", "scopeType", "scopeId", "userId")
              WHERE k."metric" = e."metric"::text AND k."periodKey" = e."periodKey" AND k."scopeType" = e."scopeType"::text
                AND k."scopeId" IS NOT DISTINCT FROM e."scopeId" AND k."userId" = e."userId")`;
}

/** Removes rows of the computed boards whose student is no longer an opted-in, active student. */
async function sweepOptedOut(boards: readonly Board[]): Promise<number> {
  if (boards.length === 0) return 0;
  // Typed metric comparison (not e."metric"::text) so the (metric, periodKey, ...) board index stays usable as the
  // table accumulates periods.
  return db.$executeRaw`
    DELETE FROM "LeaderboardEntry" e
     WHERE EXISTS (SELECT 1 FROM unnest(${boards.map((b) => b.metric as string)}::"LeaderboardMetric"[], ${boards.map((b) => b.periodKey)}::text[]) AS b("metric", "periodKey")
                    WHERE b."metric" = e."metric" AND b."periodKey" = e."periodKey")
       AND NOT EXISTS (
             SELECT 1 FROM "Profile" p JOIN "User" u ON u."id" = p."userId"
              WHERE p."userId" = e."userId" AND p."leaderboardOptIn" AND u."status" = 'ACTIVE' AND 'STUDENT' = ANY(u."roles"))`;
}

/** Writes final dense ranks for the week's weekly boards and last week's rank for movement. */
async function writeFinalRanks(weekKey: string): Promise<number> {
  const previous = previousWeekKey(weekKey);
  return db.$executeRaw`
    UPDATE "LeaderboardEntry" e
       SET "rank" = r."rnk",
           "previousRank" = (SELECT p."rank" FROM "LeaderboardEntry" p
                              WHERE p."metric" = e."metric" AND p."periodKey" = ${previous} AND p."scopeType" = e."scopeType"
                                AND p."scopeId" IS NOT DISTINCT FROM e."scopeId" AND p."userId" = e."userId"
                              LIMIT 1)
      FROM (SELECT "id", (DENSE_RANK() OVER (PARTITION BY "metric", "scopeType", "scopeId" ORDER BY "value" DESC))::int AS "rnk"
              FROM "LeaderboardEntry"
             WHERE "periodKey" = ${weekKey} AND "metric"::text = ANY(${[...WEEKLY_METRICS] as string[]}::text[])) r
     WHERE e."id" = r."id"`;
}

/**
 * Computes the leaderboards of ISO week `periodKey` ("2026-W41") — see the module doc for which boards a run writes.
 *
 * @throws RangeError for a malformed week key.
 */
export async function computeLeaderboards(periodKey: string, options: ComputeLeaderboardsOptions = {}): Promise<ComputeLeaderboardsResult> {
  if (!isWeekKey(periodKey)) throw new RangeError(`computeLeaderboards: invalid ISO week key ${periodKey}`);
  const now = options.now ?? new Date();
  const final = options.final ?? false;
  const weekKey = periodKey;
  const today = localDateString(now, PLATFORM_TIMEZONE);
  const monthKeys = final ? monthKeysOfWeek(weekKey) : monthsUpTo(weekKey, today);
  const minMocks = options.minMocks ?? DEFAULT_MIN_MOCKS;
  const batchSize = Math.max(1, Math.min(5_000, options.batchSize ?? DEFAULT_BATCH_SIZE));

  const weeklyAndLive: LeaderboardMetric[] = final ? [...WEEKLY_METRICS] : [...WEEKLY_METRICS, "STREAK", "SUBJECT_MASTERY"];
  const boards: Board[] = [
    ...weeklyAndLive.map((metric) => ({ metric, periodKey: metric === "STREAK" || metric === "SUBJECT_MASTERY" ? LIVE_PERIOD_KEY : weekKey })),
    ...monthKeys.map((monthKey) => ({ metric: "MOCK_AVERAGE" as const, periodKey: monthKey })),
  ];
  const metrics = new Set<LeaderboardMetric>(boards.map((b) => b.metric));
  const restrict = options.userIds ? [...new Set(options.userIds)] : null;

  let cursor: string | null = null;
  let students = 0;
  let written = 0;
  let removed = 0;
  const processed = new Set<string>();
  for (;;) {
    if (restrict !== null && restrict.length === 0) break;
    const userFilter = { ...(cursor ? { gt: cursor } : {}), ...(restrict ? { in: restrict } : {}) };
    const batch: StudentRow[] = (
      await db.profile.findMany({
        where: {
          leaderboardOptIn: true,
          ...(Object.keys(userFilter).length > 0 ? { userId: userFilter } : {}),
          user: { status: "ACTIVE", roles: { has: "STUDENT" } },
        },
        orderBy: { userId: "asc" },
        take: batchSize,
        select: { userId: true, countryId: true, timezone: true, user: { select: { student: { select: { countryId: true } } } } },
      })
    ).map((p) => ({ userId: p.userId, countryId: p.user.student?.countryId ?? p.countryId, timezone: p.timezone }));
    if (batch.length === 0) break;
    cursor = batch[batch.length - 1]!.userId;
    students += batch.length;
    for (const student of batch) processed.add(student.userId);

    const { facts, mocksByMonth } = await loadBatchFacts(batch, { weekKey, monthKeys, metrics, now });
    const rows: BoardRow[] = [];
    for (const student of batch) {
      const base = facts.get(student.userId);
      if (!base) continue;
      rows.push(...buildBoardRows(base, { weekKey, monthKey: monthKeys[0] ?? monthKeyOf(today), metrics: weeklyAndLive, minMocks }));
      for (const monthKey of monthKeys) {
        const mocks = mocksByMonth.get(monthKey)?.get(student.userId) ?? [];
        rows.push(...buildBoardRows({ ...base, mocks }, { weekKey, monthKey, metrics: ["MOCK_AVERAGE"], minMocks }));
      }
    }
    written += await upsertRows(rows, now);
    removed += await deleteStaleRows(
      batch.map((s) => s.userId),
      boards,
      rows,
    );
    if (batch.length < batchSize) break;
  }

  // Restricted runs (one student refreshing after opting in) leave everyone else alone; requested students who are no
  // longer eligible (opted out, suspended) lose their rows on these boards.
  if (restrict === null) removed += await sweepOptedOut(boards);
  else removed += await deleteStaleRows(restrict.filter((id) => !processed.has(id)), boards, []);
  const ranked = final ? await writeFinalRanks(weekKey) : 0;
  logger.info("leaderboards: snapshot computed", { weekKey, monthKeys, final, students, written, removed, ranked });
  return { weekKey, monthKeys, final, students, written, removed, ranked };
}
