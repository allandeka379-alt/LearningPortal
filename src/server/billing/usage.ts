import "server-only";
import { z } from "zod";
import { Prisma, type AiFeature, type AttemptMode } from "@/generated/prisma/client";
import type { LimitFeature } from "@/lib/billing/entitlements";
import {
  DEFAULT_TIMEZONE,
  addDays,
  dateColumnFromLocalDate,
  formatLocalDate,
  isValidTimeZone,
  localDateString,
  parseLocalDate,
  startOfLocalDay,
  startOfWeek,
  type LocalDate,
} from "@/lib/dates";
import { AI_MESSAGE_QUOTA_FEATURES } from "@/server/ai/meter";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { EntitlementRequiredError, LimitReachedError, evaluateLimit } from "./entitlements";

/**
 * Usage counters behind the numeric plan limits (§31 FREE "limited questions / limited AI", §40 usage limits).
 * Pair them with `checkLimit` / `assertWithinLimit` from ./entitlements:
 *
 * ```ts
 * const tz = await getUserTimezone(actor.userId);
 * const used = await usageFor(actor.userId, "practiceQuestionsPerDay", tz);
 * await assertWithinLimit(actor, "practiceQuestionsPerDay", used, { resetsAt: limitWindow("practiceQuestionsPerDay", new Date(), tz).end });
 * ```
 *
 * Windows are the student's LOCAL calendar day / ISO week (Monday) / month (Profile.timezone, default Africa/Harare).
 * Every query is index-backed and touches only the user's recent rows:
 * - practice: AssessmentAttempt(userId, startedAt) for the user's recent practice attempts, then QuestionAttempt's
 *   primary key (attemptId, position) for rows answered inside the window. DailyActivity.questionsAttempted is NOT
 *   used: it counts every mode (mocks, diagnostics, the daily question), not just limited practice.
 * - topic tests / mocks: AssessmentAttempt(userId, startedAt), filtered by mode.
 * - AI: AiUsageDaily unique (userId, date, feature).
 * Sponsored teacher assignments never count against a student's personal limits. Assignment work the class's tenant
 * does not sponsor is stored with `config.planGated = true` (src/server/attempts/start.ts) and counts like the
 * student's own work: see {@link countsAgainstPlan}.
 */

/** Attempt modes whose answered questions count toward `practiceQuestionsPerDay`. */
export const PRACTICE_LIMIT_MODES = ["PRACTICE", "RETEST", "QUIZ"] as const satisfies readonly AttemptMode[];
/**
 * How far back to look for practice attempts that may still receive answers today. Practice attempts are closed by
 * the idle sweep long before this, so older attempts cannot hold answers inside today's window.
 */
export const PRACTICE_ATTEMPT_LOOKBACK_HOURS = 48;
/**
 * AI features counted as tutor messages (`aiMessagesPerDay`): web/app tutor and WhatsApp explanations. The same bucket
 * the AI meter reserves against atomically (src/server/ai/meter.ts, PAY-5).
 */
export const AI_MESSAGE_FEATURES = AI_MESSAGE_QUOTA_FEATURES;
/** AI features counted against `aiSolverPerDay`. */
export const AI_SOLVER_FEATURES = ["SOLVER"] as const satisfies readonly AiFeature[];

const uuidSchema = z.uuid();

function assertUuid(value: string): void {
  if (!uuidSchema.safeParse(value).success) throw AppError.validation({ userId: ["Invalid id."] });
}

function safeZone(tz: string | null | undefined): string {
  return tz && isValidTimeZone(tz) ? tz : DEFAULT_TIMEZONE;
}

/** A counting window: `[start, end)` instants and the local date it was derived from. */
export interface UsageWindow {
  start: Date;
  /** Exclusive end; also when the allowance resets (use as `resetsAt`). */
  end: Date;
  localDate: LocalDate;
}

function firstOfMonth(date: LocalDate): LocalDate {
  const { year, month } = parseLocalDate(date);
  return formatLocalDate({ year, month, day: 1 });
}

function firstOfNextMonth(date: LocalDate): LocalDate {
  const { year, month } = parseLocalDate(date);
  return month === 12 ? formatLocalDate({ year: year + 1, month: 1, day: 1 }) : formatLocalDate({ year, month: month + 1, day: 1 });
}

/**
 * The window a limit counts over at `now` in `tz` (pure): local day for per-day limits, ISO week (Monday start) for
 * `topicTestsPerWeek`, calendar month for `mockExamsPerMonth`. Unknown zones fall back to Africa/Harare.
 */
export function limitWindow(feature: LimitFeature, now: Date, tz: string = DEFAULT_TIMEZONE): UsageWindow {
  const zone = safeZone(tz);
  const today = localDateString(now, zone);
  switch (feature) {
    case "topicTestsPerWeek": {
      const monday = startOfWeek(today);
      return { start: startOfLocalDay(monday, zone), end: startOfLocalDay(addDays(monday, 7), zone), localDate: today };
    }
    case "mockExamsPerMonth":
      return { start: startOfLocalDay(firstOfMonth(today), zone), end: startOfLocalDay(firstOfNextMonth(today), zone), localDate: today };
    default:
      return { start: startOfLocalDay(today, zone), end: startOfLocalDay(addDays(today, 1), zone), localDate: today };
  }
}

/**
 * Attempts that count against the student's own allowances: their own work, and assignment work the class's tenant
 * does not sponsor (`config.planGated`, written at start). Must agree with `isPlanExemptAttempt` in
 * src/server/attempts/policy.ts.
 */
const countsAgainstPlan = Prisma.sql`(a."assignmentId" IS NULL OR a."config" @> '{"planGated": true}'::jsonb)`;
const COUNTS_AGAINST_PLAN_WHERE: Prisma.AssessmentAttemptWhereInput = {
  OR: [{ assignmentId: null }, { config: { path: ["planGated"], equals: true } }],
};

/** Practice questions answered in the student's local day (modes {@link PRACTICE_LIMIT_MODES}, sponsored assignments excluded). */
export async function practiceQuestionsToday(
  userId: string,
  tz: string = DEFAULT_TIMEZONE,
  now: Date = new Date(),
  client: DbClient = db,
): Promise<number> {
  assertUuid(userId);
  const window = limitWindow("practiceQuestionsPerDay", now, tz);
  const lookback = new Date(window.start.getTime() - PRACTICE_ATTEMPT_LOOKBACK_HOURS * 3_600_000);
  const rows = await client.$queryRaw<{ count: number }[]>`
    SELECT count(*)::int AS "count"
      FROM "AssessmentAttempt" a
      JOIN "QuestionAttempt" q ON q."attemptId" = a."id"
     WHERE a."userId" = ${userId}::uuid
       AND a."startedAt" >= ${lookback}
       AND a."startedAt" < ${window.end}
       AND a."mode" IN (${Prisma.join(PRACTICE_LIMIT_MODES)})
       AND ${countsAgainstPlan}
       AND q."answeredAt" >= ${window.start}
       AND q."answeredAt" < ${window.end}`;
  return rows[0]?.count ?? 0;
}

async function countAttempts(userId: string, mode: AttemptMode, window: UsageWindow, client: DbClient = db): Promise<number> {
  assertUuid(userId);
  // AssessmentAttempt(userId, startedAt) index. Every started attempt counts (abandoning does not refund it).
  return client.assessmentAttempt.count({
    where: { userId, mode, startedAt: { gte: window.start, lt: window.end }, ...COUNTS_AGAINST_PLAN_WHERE },
  });
}

/** Topic tests started this local ISO week (Monday start). */
export function topicTestsThisWeek(userId: string, tz: string = DEFAULT_TIMEZONE, now: Date = new Date(), client: DbClient = db): Promise<number> {
  return countAttempts(userId, "TOPIC_TEST", limitWindow("topicTestsPerWeek", now, tz), client);
}

/** Mock exams started this local calendar month. */
export function mockExamsThisMonth(userId: string, tz: string = DEFAULT_TIMEZONE, now: Date = new Date(), client: DbClient = db): Promise<number> {
  return countAttempts(userId, "MOCK_EXAM", limitWindow("mockExamsPerMonth", now, tz), client);
}

async function aiRequestsToday(userId: string, features: readonly AiFeature[], tz: string, now: Date, client: DbClient = db): Promise<number> {
  assertUuid(userId);
  const { localDate } = limitWindow("aiMessagesPerDay", now, tz);
  // AiUsageDaily unique (userId, date, feature). In-flight reservations count so parallel requests cannot overshoot.
  const rows = await client.aiUsageDaily.findMany({
    where: { userId, date: dateColumnFromLocalDate(localDate), feature: { in: [...features] } },
    select: { requests: true, reservedRequests: true },
  });
  return rows.reduce((sum, row) => sum + row.requests + row.reservedRequests, 0);
}

/**
 * AI tutor messages used today (TUTOR + WHATSAPP requests, including in-flight reservations). The AI service counts
 * cache hits in `requests` (a cached answer still counts as a message, ARCHITECTURE §6.3).
 */
export function aiMessagesToday(userId: string, tz: string = DEFAULT_TIMEZONE, now: Date = new Date(), client: DbClient = db): Promise<number> {
  return aiRequestsToday(userId, AI_MESSAGE_FEATURES, tz, now, client);
}

/** AI solver requests used today (including in-flight reservations). */
export function aiSolverToday(userId: string, tz: string = DEFAULT_TIMEZONE, now: Date = new Date(), client: DbClient = db): Promise<number> {
  return aiRequestsToday(userId, AI_SOLVER_FEATURES, tz, now, client);
}

/** Current usage for one numeric limit (`client`: run the count inside a transaction). */
export function usageFor(
  userId: string,
  feature: LimitFeature,
  tz: string = DEFAULT_TIMEZONE,
  now: Date = new Date(),
  client: DbClient = db,
): Promise<number> {
  switch (feature) {
    case "practiceQuestionsPerDay":
      return practiceQuestionsToday(userId, tz, now, client);
    case "topicTestsPerWeek":
      return topicTestsThisWeek(userId, tz, now, client);
    case "mockExamsPerMonth":
      return mockExamsThisMonth(userId, tz, now, client);
    case "aiMessagesPerDay":
      return aiMessagesToday(userId, tz, now, client);
    case "aiSolverPerDay":
      return aiSolverToday(userId, tz, now, client);
  }
}

/** Limits consumed by attempts and answers (the AI allowances are reserved atomically by src/server/ai/meter-db.ts). */
export type AttemptLimitFeature = Extract<LimitFeature, "practiceQuestionsPerDay" | "topicTestsPerWeek" | "mockExamsPerMonth">;

/** True for the limits {@link assertWithinLimitInTx} enforces (attempts and answers). */
export function isAttemptLimitFeature(feature: LimitFeature): feature is AttemptLimitFeature {
  return feature === "practiceQuestionsPerDay" || feature === "topicTestsPerWeek" || feature === "mockExamsPerMonth";
}

/**
 * Check-and-consume for a numeric plan limit (PAY-3). The usual pre-check (`usageFor` + `assertWithinLimit`) runs
 * outside the consuming transaction and only sees COMMITTED usage, so a burst of parallel requests (several open
 * practice sessions, several tests started at once) all read the same count and all passed. Call this INSIDE the
 * transaction that consumes the allowance, right before the consuming write: it takes a transaction-scoped advisory
 * lock per (user, limit), so consumers of one allowance serialise, then re-counts with the transaction's client (READ
 * COMMITTED: the new statement sees everything that earlier lock holders committed) and refuses when the allowance is
 * used up.
 *
 * Pass the `limit` resolved by the pre-check (`assertWithinLimit(...).limit`), so no entitlement lookup runs while the
 * lock is held; `null` (unlimited) does nothing.
 *
 * @throws EntitlementRequiredError (limit 0) | LimitReachedError (`QUOTA_EXCEEDED`, `Retry-After` = window reset)
 */
export async function assertWithinLimitInTx(
  tx: DbClient,
  userId: string,
  feature: AttemptLimitFeature,
  limit: number | null,
  options: { timeZone?: string | null; now?: Date; increment?: number } = {},
): Promise<void> {
  if (limit === null) return;
  assertUuid(userId);
  const now = options.now ?? new Date();
  const tz = safeZone(options.timeZone);
  const lockKey = `usage.limit:${feature}:${userId}`;
  await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))) l`;
  const used = await usageFor(userId, feature, tz, now, tx);
  const check = evaluateLimit(feature, limit, used, options.increment ?? 1);
  if (check.allowed) return;
  if (limit === 0) throw new EntitlementRequiredError(feature);
  throw new LimitReachedError({ ...check, limit }, limitWindow(feature, now, tz).end, now);
}

/** Usage for every numeric limit (plan/billing page "x of y used"). Runs the five small queries in parallel. */
export async function getUsageSummary(
  userId: string,
  tz: string = DEFAULT_TIMEZONE,
  now: Date = new Date(),
): Promise<Record<LimitFeature, number>> {
  const [practiceQuestionsPerDay, topicTestsPerWeek, mockExamsPerMonth, aiMessagesPerDay, aiSolverPerDay] = await Promise.all([
    practiceQuestionsToday(userId, tz, now),
    topicTestsThisWeek(userId, tz, now),
    mockExamsThisMonth(userId, tz, now),
    aiMessagesToday(userId, tz, now),
    aiSolverToday(userId, tz, now),
  ]);
  return { practiceQuestionsPerDay, topicTestsPerWeek, mockExamsPerMonth, aiMessagesPerDay, aiSolverPerDay };
}

/** The user's IANA time zone (Profile.timezone), falling back to Africa/Harare when missing or invalid. */
export async function getUserTimezone(userId: string): Promise<string> {
  assertUuid(userId);
  const profile = await db.profile.findUnique({ where: { userId }, select: { timezone: true } });
  return safeZone(profile?.timezone);
}
