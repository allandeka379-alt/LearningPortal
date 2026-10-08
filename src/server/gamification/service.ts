import "server-only";
import { z } from "zod";
import type { LearnerStats, Prisma, XpReason, XpSourceType } from "@/generated/prisma/client";
import {
  DEFAULT_TIMEZONE,
  addDays,
  dateColumnFromLocalDate,
  isValidTimeZone,
  isoWeekKey,
  localDateFromDateColumn,
  localDateString,
  startOfWeek,
  type LocalDate,
} from "@/lib/dates";
import type { DbClient } from "@/server/db";
import { logger } from "@/server/lib/logger";
import { getXpRulesOverride } from "@/server/lib/settings";
import { createNotification } from "@/server/notifications/service";
import { applyActivityDay, currentStreakAsOf, dailyGoalMet, type StreakEvent, type StreakState } from "./streaks";
import { DEFAULT_XP_RULES, resolveXpRules, xpFor, type XpRules } from "./xp";

/**
 * Gamification persistence (§19 streaks, weekly goals, XP, badges): wires the pure cores in ./streaks and ./xp to
 * the ledger and rollup tables. Every function takes the CALLER's transaction client so the award happens atomically
 * with the activity that earned it (ARCHITECTURE §4.6 "per answer, one transaction").
 *
 * Tables and rules (prisma/schema.prisma + init migration CHECKs):
 * - `XpEvent` is an append-only ledger, idempotent on (userId, reason, sourceId): an insert that conflicts awards
 *   nothing (`createMany … skipDuplicates` = ON CONFLICT DO NOTHING, which never aborts the caller's transaction).
 *   LearnerStats.totalXp / weekXp and DailyActivity.xpEarned move in the same transaction, only when inserted.
 * - `DailyActivity` (student-local date) is upserted per activity with one atomic statement (counters never lose
 *   increments under concurrency); `studySeconds` is capped at 25 h (DailyActivity_counters_chk).
 * - `LearnerStats` is touched only when the daily goal is newly met (once a day: streak + XP), at attempt close
 *   (lifetime totals) and by XP awards — never per answer (schema doc). Writes take a row lock (SELECT … FOR UPDATE)
 *   so concurrent sessions of one student serialise. Week counters reset when the local ISO week (Monday) rolls over.
 * - Streak days use the pure `applyActivityDay` (freezes bridge one missed day; bridged days are recorded as
 *   DailyActivity rows with streakFreezeUsed = streakCredited = true, DailyActivity_freeze_chk).
 * - Achievements are DB rows (admin-editable). `criteria` is accepted in both the seed shape
 *   (`{ type: "streak_days", threshold: 3 }`, prisma/seed/data/platform.ts) and the schema-doc shape
 *   (`{ type: "STREAK_DAYS", days: 3 }`); unknown rules are skipped (logged), never guessed.
 *
 * Time: every timestamp is a JS `Date` (ORM writes or raw parameters), never SQL `now()`, so comparisons stay
 * consistent whatever the database session time zone is.
 */

// =====================================================================================================================
// Shared helpers
// =====================================================================================================================

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

/** XP rules from Setting `gamification.xp` merged onto the code defaults; invalid settings fall back to defaults. */
export async function getXpRules(): Promise<XpRules> {
  try {
    const override = await getXpRulesOverride();
    return override ? resolveXpRules(override) : DEFAULT_XP_RULES;
  } catch (error) {
    logger.error("gamification: invalid gamification.xp setting, using defaults", { err: error });
    return DEFAULT_XP_RULES;
  }
}

/**
 * Flat XP amount for reasons that have one in the rules (mock exam, lesson, flashcard session, daily / weekly goal);
 * null when the caller must supply the amount (practice, assessments, achievements, adjustments).
 */
export function defaultXpFor(reason: XpReason, rules: XpRules = DEFAULT_XP_RULES): number | null {
  switch (reason) {
    case "MOCK_EXAM_COMPLETED":
      return rules.mockExamCompleted;
    case "LESSON_COMPLETED":
      return rules.lessonCompleted;
    case "FLASHCARD_SESSION_COMPLETED":
      return rules.flashcardSession;
    case "DAILY_GOAL_MET":
      return rules.dailyGoalMet;
    case "WEEKLY_GOAL_MET":
      return rules.weeklyGoalMet;
    default:
      return null;
  }
}

/** One marked answer as XP sees it (§19: effort counts, harder correct answers count more). */
export interface AnsweredForXp {
  result: "CORRECT" | "PARTIAL" | "INCORRECT";
  difficulty: number;
}

/**
 * XP for completing an attempt: a mock exam earns the flat mock amount whatever the score (weaker students are not
 * punished for testing, ./xp); every other attempt earns Σ per-answer XP over its marked answers. 0 when nothing
 * was answered (no ledger row: XpEvent_amount_chk forbids 0).
 */
export function attemptXp(kind: "MOCK_EXAM" | "OTHER", answers: readonly AnsweredForXp[], rules: XpRules = DEFAULT_XP_RULES): number {
  if (answers.length === 0) return 0;
  if (kind === "MOCK_EXAM") return xpFor({ type: "MOCK_EXAM_COMPLETED" }, rules);
  return answers.reduce((sum, a) => sum + xpFor({ type: "QUESTION_ANSWERED", result: a.result, difficulty: a.difficulty }, rules), 0);
}

// =====================================================================================================================
// LearnerStats (row lock + week rollover)
// =====================================================================================================================

type LearnerStatsRow = LearnerStats;

interface StatsContext {
  /** Local date of the activity. */
  date: LocalDate;
  /** Monday of the activity's week. */
  monday: LocalDate;
  /** True when the activity falls in the row's current week (after rollover). */
  inCurrentWeek: boolean;
  at: Date;
}

/**
 * Locks (creating if needed) the student's LearnerStats row, rolls the week counters over when the activity's local
 * week is newer than the stored one, applies `mutate`, and writes the result in one UPDATE.
 */
async function updateLearnerStats(
  tx: DbClient,
  userId: string,
  at: Date,
  timeZone: string,
  mutate: (row: LearnerStatsRow, ctx: StatsContext) => Prisma.LearnerStatsUpdateInput,
): Promise<LearnerStatsRow> {
  await tx.$executeRaw`
    INSERT INTO "LearnerStats" ("userId", "createdAt", "updatedAt") VALUES (${userId}::uuid, ${at}, ${at})
    ON CONFLICT ("userId") DO NOTHING`;
  await tx.$queryRaw`SELECT 1 FROM "LearnerStats" WHERE "userId" = ${userId}::uuid FOR UPDATE`;
  const row = await tx.learnerStats.findUniqueOrThrow({ where: { userId } });

  const date = localDateString(at, timeZone);
  const monday = startOfWeek(date);
  const storedMonday = row.weekStartDate ? localDateFromDateColumn(row.weekStartDate) : null;
  const rollover: Prisma.LearnerStatsUpdateInput = {};
  let current = row;
  if (storedMonday === null || storedMonday < monday) {
    const keepsWeeklyStreak = storedMonday !== null && row.weekGoalMet && addDays(storedMonday, 7) === monday;
    Object.assign(rollover, {
      weekStartDate: dateColumnFromLocalDate(monday),
      weekXp: 0,
      weekQuestions: 0,
      weekStudySeconds: 0,
      weekGoalMet: false,
      weeklyGoalStreak: keepsWeeklyStreak ? row.weeklyGoalStreak : 0,
    });
    current = {
      ...row,
      weekStartDate: dateColumnFromLocalDate(monday),
      weekXp: 0,
      weekQuestions: 0,
      weekStudySeconds: 0,
      weekGoalMet: false,
      weeklyGoalStreak: keepsWeeklyStreak ? row.weeklyGoalStreak : 0,
    };
  }
  const currentMonday = current.weekStartDate ? localDateFromDateColumn(current.weekStartDate) : monday;
  const data = mutate(current, { date, monday, inCurrentWeek: currentMonday === monday, at });
  return tx.learnerStats.update({ where: { userId }, data: { ...rollover, ...data } });
}

// =====================================================================================================================
// XP
// =====================================================================================================================

export interface AwardXpOptions {
  /** Polymorphic source type (default ASSESSMENT_ATTEMPT). */
  sourceType?: XpSourceType;
  /** When the XP was earned (default now). */
  at?: Date;
  /** Student time zone for the local date (default Africa/Harare). */
  timeZone?: string;
  /** Rules for default amounts (default: Setting-backed {@link getXpRules}). */
  rules?: XpRules;
}

export interface XpAward {
  /** False when this (reason, sourceId) was already awarded (idempotent replay) or the amount is 0. */
  awarded: boolean;
  amount: number;
}

const sourceIdSchema = z.string().min(1).max(100);

/**
 * Awards XP once per (user, reason, sourceId) (§19). The ledger insert and the LearnerStats / DailyActivity
 * increments happen in the caller's transaction; a retried job, double tap or replayed request awards nothing.
 *
 * @param amount whole XP; defaults to the rule for flat reasons ({@link defaultXpFor}); must be > 0 unless the reason
 *               is ADJUSTMENT (staff correction, may be negative: totals never drop below 0)
 * @throws RangeError for programming errors (missing amount for a non-flat reason, negative amount, bad sourceId)
 */
export async function awardXp(
  tx: DbClient,
  userId: string,
  reason: XpReason,
  sourceId: string,
  amount?: number,
  options: AwardXpOptions = {},
): Promise<XpAward> {
  if (!sourceIdSchema.safeParse(sourceId).success) throw new RangeError("awardXp: sourceId must be 1-100 characters");
  const rules = options.rules ?? (amount === undefined ? await getXpRules() : DEFAULT_XP_RULES);
  const value = amount ?? defaultXpFor(reason, rules);
  if (value === null) throw new RangeError(`awardXp: reason ${reason} needs an explicit amount`);
  if (!Number.isInteger(value)) throw new RangeError("awardXp: amount must be a whole number");
  if (value < 0 && reason !== "ADJUSTMENT") throw new RangeError("awardXp: only ADJUSTMENT may be negative");
  if (value === 0) return { awarded: false, amount: 0 };

  const at = options.at ?? new Date();
  const timeZone = safeZone(options.timeZone);
  const localDate = localDateString(at, timeZone);
  const { count } = await tx.xpEvent.createMany({
    data: [
      {
        userId,
        reason,
        sourceType: options.sourceType ?? "ASSESSMENT_ATTEMPT",
        sourceId,
        amount: value,
        occurredAt: at,
        createdAt: at,
        localDate: dateColumnFromLocalDate(localDate),
      },
    ],
    skipDuplicates: true,
  });
  if (count === 0) return { awarded: false, amount: value };

  await updateLearnerStats(tx, userId, at, timeZone, (row, ctx) => ({
    totalXp: Math.max(0, row.totalXp + value),
    ...(ctx.inCurrentWeek ? { weekXp: Math.max(0, row.weekXp + value) } : {}),
  }));
  if (value > 0) {
    await tx.$executeRaw`
      INSERT INTO "DailyActivity" ("userId", "date", "createdAt", "updatedAt", "xpEarned")
      VALUES (${userId}::uuid, ${localDate}::date, ${at}, ${at}, ${value})
      ON CONFLICT ("userId", "date") DO UPDATE SET
        "xpEarned" = "DailyActivity"."xpEarned" + EXCLUDED."xpEarned",
        "updatedAt" = EXCLUDED."updatedAt"`;
  }
  return { awarded: true, amount: value };
}

// =====================================================================================================================
// Activity, daily goal and streaks
// =====================================================================================================================

/** Activity to add to the student's local day (DailyActivity counters). */
export interface ActivityDelta {
  studySeconds?: number;
  /** Questions answered and marked. */
  questions?: number;
  /** Of which fully correct. */
  correct?: number;
  lessonsCompleted?: number;
  flashcards?: number;
  /** Marked quizzes / tests / mocks / diagnostics finished. */
  assessmentsCompleted?: number;
}

/** Lifetime / weekly totals to add to LearnerStats (attempt close, lesson completion). */
export interface LifetimeDelta {
  questions?: number;
  correct?: number;
  studySeconds?: number;
  lessonsCompleted?: number;
  assessmentsCompleted?: number;
  mockExamsCompleted?: number;
  flashcards?: number;
}

export interface RecordActivityOptions {
  at?: Date;
  timeZone?: string;
  /** Add these totals to LearnerStats (omit per answer: LearnerStats is never written per answer). */
  lifetime?: LifetimeDelta;
  /** Daily target in force today (minutes), recorded once for honest history. */
  targetMinutes?: number | null;
  rules?: XpRules;
}

export interface ActivityResult {
  date: LocalDate;
  /** Today's goal is met (after this activity). */
  dailyGoalMet: boolean;
  /** This activity met the goal for the first time today (streak credited, DAILY_GOAL_MET XP). */
  goalNewlyMet: boolean;
  streakEvents: StreakEvent[];
  /** Streak after the update (null when the streak was not touched). */
  streak: { current: number; longest: number } | null;
  xpAwarded: number;
}

const count = (value: number | undefined) => (value !== undefined && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0);

interface DailyCountersRow {
  studySeconds: number;
  questionsAttempted: number;
  flashcardsReviewed: number;
  lessonsCompleted: number;
  assessmentsCompleted: number;
  streakCredited: boolean;
}

/** StreakState of the pure core from a LearnerStats row (+ facts kept in DailyActivity). */
export function streakStateFromStats(
  stats: Pick<LearnerStatsRow, "currentStreak" | "longestStreak" | "lastStreakDate" | "streakFreezesAvailable" | "weekStartDate" | "weekGoalMet">,
  facts: { freezeUsedOn: LocalDate | null; weekKey: string | null; weekDaysMet: number },
): StreakState {
  const storedWeek = stats.weekStartDate ? isoWeekKey(localDateFromDateColumn(stats.weekStartDate)) : null;
  return {
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
    lastActiveDate: stats.lastStreakDate ? localDateFromDateColumn(stats.lastStreakDate) : null,
    freezesAvailable: stats.streakFreezesAvailable,
    freezeUsedOn: facts.freezeUsedOn,
    weekKey: facts.weekKey,
    weekDaysMet: facts.weekDaysMet,
    lastFreezeEarnedWeek: stats.weekGoalMet && storedWeek !== null ? storedWeek : null,
  };
}

/** The streak a student sees today (live: an unbridgeable gap shows 0 before the nightly job closes it). */
export function displayedStreak(
  stats: Pick<LearnerStatsRow, "currentStreak" | "longestStreak" | "lastStreakDate" | "streakFreezesAvailable" | "weekStartDate" | "weekGoalMet"> | null,
  today: LocalDate,
): number {
  if (!stats) return 0;
  return currentStreakAsOf(streakStateFromStats(stats, { freezeUsedOn: null, weekKey: null, weekDaysMet: 0 }), today);
}

/**
 * Records learning activity for the student's local day (§6 daily target, §19 streaks, §21 parent activity, §35):
 * one atomic DailyActivity upsert; when the daily goal (./streaks `dailyGoalMet`) is met for the first time today the
 * streak advances (freezes bridge one missed day) and DAILY_GOAL_MET / WEEKLY_GOAL_MET / STREAK_MILESTONE XP is
 * awarded idempotently. `options.lifetime` adds totals to LearnerStats (attempt close).
 */
export async function recordActivity(
  tx: DbClient,
  userId: string,
  delta: ActivityDelta,
  options: RecordActivityOptions = {},
): Promise<ActivityResult> {
  const at = options.at ?? new Date();
  const timeZone = safeZone(options.timeZone);
  const date = localDateString(at, timeZone);
  const questions = count(delta.questions);
  const correct = Math.min(questions, count(delta.correct));
  const target = options.targetMinutes === undefined || options.targetMinutes === null ? null : Math.min(1440, Math.max(0, Math.floor(options.targetMinutes)));

  const rows = await tx.$queryRaw<DailyCountersRow[]>`
    INSERT INTO "DailyActivity" (
      "userId", "date", "firstActivityAt", "lastActivityAt", "createdAt", "updatedAt", "studySeconds",
      "questionsAttempted", "questionsCorrect", "flashcardsReviewed", "lessonsCompleted", "assessmentsCompleted",
      "targetMinutes")
    VALUES (
      ${userId}::uuid, ${date}::date, ${at}, ${at}, ${at}, ${at}, LEAST(90000, ${count(delta.studySeconds)}::int),
      ${questions}::int, ${correct}::int, ${count(delta.flashcards)}::int, ${count(delta.lessonsCompleted)}::smallint,
      ${count(delta.assessmentsCompleted)}::smallint, ${target}::smallint)
    ON CONFLICT ("userId", "date") DO UPDATE SET
      "firstActivityAt" = LEAST(COALESCE("DailyActivity"."firstActivityAt", EXCLUDED."firstActivityAt"), EXCLUDED."firstActivityAt"),
      "lastActivityAt" = GREATEST(COALESCE("DailyActivity"."lastActivityAt", EXCLUDED."lastActivityAt"), EXCLUDED."lastActivityAt"),
      "updatedAt" = EXCLUDED."updatedAt",
      "studySeconds" = LEAST(90000, "DailyActivity"."studySeconds" + EXCLUDED."studySeconds"),
      "questionsAttempted" = "DailyActivity"."questionsAttempted" + EXCLUDED."questionsAttempted",
      "questionsCorrect" = "DailyActivity"."questionsCorrect" + EXCLUDED."questionsCorrect",
      "flashcardsReviewed" = "DailyActivity"."flashcardsReviewed" + EXCLUDED."flashcardsReviewed",
      "lessonsCompleted" = "DailyActivity"."lessonsCompleted" + EXCLUDED."lessonsCompleted",
      "assessmentsCompleted" = "DailyActivity"."assessmentsCompleted" + EXCLUDED."assessmentsCompleted",
      "targetMinutes" = COALESCE("DailyActivity"."targetMinutes", EXCLUDED."targetMinutes")
    RETURNING "studySeconds", "questionsAttempted", "flashcardsReviewed", "lessonsCompleted", "assessmentsCompleted",
      "streakCredited"`;
  const day = rows[0];
  if (!day) throw new Error("recordActivity: DailyActivity upsert returned no row");

  const goalMet = dailyGoalMet({
    questionsAnswered: day.questionsAttempted,
    lessonsCompleted: day.lessonsCompleted,
    flashcardsReviewed: day.flashcardsReviewed,
    mockExamsCompleted: day.assessmentsCompleted,
    studyMinutes: Math.floor(day.studySeconds / 60),
  });
  const goalNewlyMet = goalMet && !day.streakCredited;
  const lifetime = options.lifetime;
  if (!goalNewlyMet && !lifetime) {
    return { date, dailyGoalMet: goalMet, goalNewlyMet: false, streakEvents: [], streak: null, xpAwarded: 0 };
  }

  // Filled by the LearnerStats mutation below (a callback, so kept in an object rather than narrowed locals).
  const outcome: { events: StreakEvent[]; bridged: LocalDate[]; refunded: LocalDate | null } = { events: [], bridged: [], refunded: null };
  let streakFacts: { freezeUsedOn: LocalDate | null; weekDaysMet: number } | null = null;
  if (goalNewlyMet) {
    await tx.dailyActivity.update({
      where: { userId_date: { userId, date: dateColumnFromLocalDate(date) } },
      data: { dailyGoalMet: true, streakCredited: true },
    });
    const monday = startOfWeek(date);
    // Sequential on purpose: one transaction = one connection (no concurrent queries on it).
    const lastFreeze = await tx.dailyActivity.findFirst({
      where: { userId, streakFreezeUsed: true },
      orderBy: { date: "desc" },
      select: { date: true },
    });
    const weekDays = await tx.dailyActivity.count({
      where: {
        userId,
        streakCredited: true,
        streakFreezeUsed: false,
        date: { gte: dateColumnFromLocalDate(monday), lt: dateColumnFromLocalDate(date) },
      },
    });
    streakFacts = { freezeUsedOn: lastFreeze ? localDateFromDateColumn(lastFreeze.date) : null, weekDaysMet: weekDays };
  }

  let streak: ActivityResult["streak"] = null;
  const stats = await updateLearnerStats(tx, userId, at, timeZone, (row, ctx) => {
    const data: Prisma.LearnerStatsUpdateInput = {};
    if (streakFacts) {
      const before = streakStateFromStats(row, { ...streakFacts, weekKey: isoWeekKey(ctx.date) });
      const update = applyActivityDay(before, ctx.date, true);
      outcome.events = update.events;
      outcome.bridged = update.events.flatMap((e) => (e.type === "FREEZE_USED" ? [e.date] : []));
      outcome.refunded = update.events.some((e) => e.type === "FREEZE_REFUNDED") ? ctx.date : null;
      const weeklyGoal = update.events.some((e) => e.type === "WEEKLY_GOAL_MET");
      Object.assign(data, {
        currentStreak: update.state.currentStreak,
        longestStreak: Math.max(row.longestStreak, update.state.longestStreak),
        lastStreakDate: update.state.lastActiveDate ? dateColumnFromLocalDate(update.state.lastActiveDate) : null,
        streakFreezesAvailable: update.state.freezesAvailable,
        streakFreezesUsedTotal: Math.max(0, row.streakFreezesUsedTotal + outcome.bridged.length - (outcome.refunded ? 1 : 0)),
        ...(update.events.some((e) => e.type === "STREAK_STARTED") ? { streakStartDate: dateColumnFromLocalDate(ctx.date) } : {}),
        ...(weeklyGoal && ctx.inCurrentWeek && !row.weekGoalMet
          ? { weekGoalMet: true, weeksGoalMetTotal: row.weeksGoalMetTotal + 1, weeklyGoalStreak: row.weeklyGoalStreak + 1 }
          : {}),
      });
    }
    const firstActive = row.firstActiveDate ? localDateFromDateColumn(row.firstActiveDate) : null;
    const lastActive = row.lastActiveDate ? localDateFromDateColumn(row.lastActiveDate) : null;
    Object.assign(data, {
      firstActiveDate: dateColumnFromLocalDate(firstActive !== null && firstActive < ctx.date ? firstActive : ctx.date),
      lastActiveDate: dateColumnFromLocalDate(lastActive !== null && lastActive > ctx.date ? lastActive : ctx.date),
      lastActivityAt: row.lastActivityAt && row.lastActivityAt.getTime() > at.getTime() ? row.lastActivityAt : at,
    });
    if (lifetime) {
      const q = count(lifetime.questions);
      const seconds = count(lifetime.studySeconds);
      const assessments = count(lifetime.assessmentsCompleted);
      Object.assign(data, {
        totalQuestionsAttempted: row.totalQuestionsAttempted + q,
        totalQuestionsCorrect: Math.min(row.totalQuestionsAttempted + q, row.totalQuestionsCorrect + count(lifetime.correct)),
        totalStudySeconds: row.totalStudySeconds + seconds,
        lessonsCompleted: row.lessonsCompleted + count(lifetime.lessonsCompleted),
        assessmentsCompleted: row.assessmentsCompleted + assessments,
        mockExamsCompleted: Math.min(row.assessmentsCompleted + assessments, row.mockExamsCompleted + count(lifetime.mockExamsCompleted)),
        flashcardsReviewed: row.flashcardsReviewed + count(lifetime.flashcards),
        ...(ctx.inCurrentWeek ? { weekQuestions: row.weekQuestions + q, weekStudySeconds: row.weekStudySeconds + seconds } : {}),
      });
    }
    return data;
  });
  if (streakFacts) streak = { current: stats.currentStreak, longest: stats.longestStreak };

  // Days bridged by a freeze are credited (and flagged) so history and parents see why the streak survived.
  for (const bridgedDate of outcome.bridged) {
    await tx.$executeRaw`
      INSERT INTO "DailyActivity" ("userId", "date", "createdAt", "updatedAt", "streakCredited", "streakFreezeUsed")
      VALUES (${userId}::uuid, ${bridgedDate}::date, ${at}, ${at}, true, true)
      ON CONFLICT ("userId", "date") DO UPDATE SET "streakCredited" = true, "streakFreezeUsed" = true, "updatedAt" = EXCLUDED."updatedAt"`;
  }
  if (outcome.refunded) {
    await tx.dailyActivity.update({
      where: { userId_date: { userId, date: dateColumnFromLocalDate(outcome.refunded) } },
      data: { streakFreezeUsed: false },
    });
  }

  let xpAwarded = 0;
  if (goalNewlyMet) {
    const rules = options.rules ?? (await getXpRules());
    const award = async (reason: XpReason, sourceId: string, amount: number, sourceType: XpSourceType) => {
      if (amount <= 0) return;
      const result = await awardXp(tx, userId, reason, sourceId, amount, { sourceType, at, timeZone, rules });
      if (result.awarded) xpAwarded += result.amount;
    };
    await award("DAILY_GOAL_MET", date, rules.dailyGoalMet, "DAILY_ACTIVITY");
    for (const event of outcome.events) {
      if (event.type === "WEEKLY_GOAL_MET") await award("WEEKLY_GOAL_MET", event.weekKey, rules.weeklyGoalMet, "LEARNER_STATS");
      if (event.type === "MILESTONE") {
        await award("STREAK_MILESTONE", String(event.days), xpFor({ type: "STREAK_MILESTONE", days: event.days }, rules), "LEARNER_STATS");
      }
    }
  }
  return { date, dailyGoalMet: goalMet, goalNewlyMet, streakEvents: outcome.events, streak, xpAwarded };
}

// =====================================================================================================================
// Achievements (§19 badges)
// =====================================================================================================================

/** A normalised achievement rule (schema-doc shape of Achievement.criteria). */
export type AchievementRule =
  | { type: "STREAK_DAYS"; days: number }
  | { type: "QUESTIONS_ANSWERED"; count: number }
  | { type: "TOPICS_MASTERED"; count: number; subjectId?: string }
  | { type: "MOCKS_COMPLETED"; count: number }
  | { type: "MOCK_SCORE_AT_LEAST"; percent: number }
  | { type: "WEEKLY_GOALS_MET"; count: number }
  | { type: "STUDY_HOURS"; hours: number }
  | { type: "FLASHCARDS_REVIEWED"; count: number }
  | { type: "DIAGNOSTIC_COMPLETED"; count: number }
  | { type: "DAYS_TO_EXAM"; days: number };

const positive = z.number().positive();
const schemaShape = z.discriminatedUnion("type", [
  z.object({ type: z.literal("STREAK_DAYS"), days: positive }),
  z.object({ type: z.literal("QUESTIONS_ANSWERED"), count: positive }),
  z.object({ type: z.literal("TOPICS_MASTERED"), count: positive, subjectId: z.uuid().optional() }),
  z.object({ type: z.literal("MOCKS_COMPLETED"), count: positive }),
  z.object({ type: z.literal("MOCK_SCORE_AT_LEAST"), percent: z.number().min(0).max(100) }),
  z.object({ type: z.literal("WEEKLY_GOALS_MET"), count: positive }),
  z.object({ type: z.literal("STUDY_HOURS"), hours: positive }),
  z.object({ type: z.literal("FLASHCARDS_REVIEWED"), count: positive }),
  z.object({ type: z.literal("DIAGNOSTIC_COMPLETED"), count: positive.optional() }),
  z.object({ type: z.literal("DAYS_TO_EXAM"), days: z.number().min(0) }),
]);
const seedShape = z.object({ type: z.string().regex(/^[a-z_]+$/), threshold: z.number().min(0) });

/** Seed `type` (lower snake case) → rule builder. Plural/singular spellings are both accepted. */
const SEED_TYPES: Readonly<Record<string, (threshold: number) => AchievementRule>> = {
  streak_days: (n) => ({ type: "STREAK_DAYS", days: n }),
  questions_answered: (n) => ({ type: "QUESTIONS_ANSWERED", count: n }),
  topics_mastered: (n) => ({ type: "TOPICS_MASTERED", count: n }),
  mocks_completed: (n) => ({ type: "MOCKS_COMPLETED", count: n }),
  mock_score_at_least: (n) => ({ type: "MOCK_SCORE_AT_LEAST", percent: n }),
  weekly_goals_met: (n) => ({ type: "WEEKLY_GOALS_MET", count: n }),
  study_hours: (n) => ({ type: "STUDY_HOURS", hours: n }),
  flashcards_reviewed: (n) => ({ type: "FLASHCARDS_REVIEWED", count: n }),
  diagnostics_completed: (n) => ({ type: "DIAGNOSTIC_COMPLETED", count: Math.max(1, n) }),
  diagnostic_completed: (n) => ({ type: "DIAGNOSTIC_COMPLETED", count: Math.max(1, n) }),
  days_to_exam: (n) => ({ type: "DAYS_TO_EXAM", days: n }),
};

/** Parses Achievement.criteria in either accepted shape (module header); null when unknown or invalid. */
export function normalizeAchievementCriteria(raw: unknown): AchievementRule | null {
  const doc = schemaShape.safeParse(raw);
  if (doc.success) {
    const rule = doc.data;
    return rule.type === "DIAGNOSTIC_COMPLETED" ? { type: "DIAGNOSTIC_COMPLETED", count: rule.count ?? 1 } : (rule as AchievementRule);
  }
  const seed = seedShape.safeParse(raw);
  if (seed.success) return SEED_TYPES[seed.data.type]?.(seed.data.threshold) ?? null;
  return null;
}

/** The facts achievement rules are evaluated against (lazily loaded per rule type). */
export interface AchievementMetrics {
  longestStreak: number;
  questionsAnswered: number;
  mocksCompleted: number;
  weeklyGoalsMet: number;
  studySeconds: number;
  flashcardsReviewed: number;
  /** Leaf topics at MASTERED, overall. */
  topicsMastered: number;
  /** Leaf topics at MASTERED per subject. */
  topicsMasteredBySubject: ReadonlyMap<string, number>;
  /** Best marked mock-exam percentage; null when none. */
  bestMockPercent: number | null;
  /** Enrolments with a completed diagnostic. */
  diagnosticsCompleted: number;
  /** Days to the nearest target exam; null when unknown. */
  daysToExam: number | null;
}

/** Whether a rule is met (pure). Streak badges use the longest streak ("met your goal N days running"). */
export function achievementMet(rule: AchievementRule, m: AchievementMetrics): boolean {
  switch (rule.type) {
    case "STREAK_DAYS":
      return m.longestStreak >= rule.days;
    case "QUESTIONS_ANSWERED":
      return m.questionsAnswered >= rule.count;
    case "TOPICS_MASTERED":
      return (rule.subjectId ? (m.topicsMasteredBySubject.get(rule.subjectId) ?? 0) : m.topicsMastered) >= rule.count;
    case "MOCKS_COMPLETED":
      return m.mocksCompleted >= rule.count;
    case "MOCK_SCORE_AT_LEAST":
      return m.bestMockPercent !== null && m.bestMockPercent >= rule.percent;
    case "WEEKLY_GOALS_MET":
      return m.weeklyGoalsMet >= rule.count;
    case "STUDY_HOURS":
      return m.studySeconds >= rule.hours * 3600;
    case "FLASHCARDS_REVIEWED":
      return m.flashcardsReviewed >= rule.count;
    case "DIAGNOSTIC_COMPLETED":
      return m.diagnosticsCompleted >= rule.count;
    case "DAYS_TO_EXAM":
      return m.daysToExam !== null && m.daysToExam >= 0 && m.daysToExam <= rule.days;
  }
}

export interface UnlockedAchievement {
  achievementId: string;
  code: string;
  name: string;
  description: string;
  xpReward: number;
}

export interface EvaluateAchievementsOptions {
  at?: Date;
  timeZone?: string;
  /** Stored on UserAchievement.context (what triggered it). */
  context?: { attemptId?: string; subjectId?: string; topicId?: string };
  /** Days to the nearest target exam, when the caller knows it (enables DAYS_TO_EXAM badges). */
  daysToExam?: number | null;
  rules?: XpRules;
}

/**
 * Evaluates every active, not-yet-earned achievement for the student (§19) and unlocks the ones whose rule is met:
 * a UserAchievement row (idempotent), an in-app notification (dedupe key per achievement) and the achievement's XP
 * reward (ACHIEVEMENT_UNLOCKED, idempotent). Returns the newly unlocked achievements.
 */
export async function evaluateAchievements(tx: DbClient, userId: string, options: EvaluateAchievementsOptions = {}): Promise<UnlockedAchievement[]> {
  const at = options.at ?? new Date();
  const definitions = await tx.achievement.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true, description: true, xpReward: true, criteria: true },
    orderBy: [{ sortOrder: "asc" }, { code: "asc" }],
  });
  const earned = await tx.userAchievement.findMany({ where: { userId }, select: { achievementId: true } });
  const earnedIds = new Set(earned.map((row) => row.achievementId));
  const candidates = definitions
    .filter((d) => !earnedIds.has(d.id))
    .flatMap((d) => {
      const rule = normalizeAchievementCriteria(d.criteria);
      if (!rule) {
        logger.warn("gamification: achievement has an unknown criteria shape; skipped", { achievementId: d.id, code: d.code });
        return [];
      }
      return [{ ...d, rule }];
    });
  if (candidates.length === 0) return [];

  const needs = new Set(candidates.map((c) => c.rule.type));
  const stats = await tx.learnerStats.findUnique({ where: { userId } });
  const mastered = needs.has("TOPICS_MASTERED")
    ? await tx.topicMastery.groupBy({ by: ["subjectId"], where: { userId, band: "MASTERED", isLeaf: true }, _count: { _all: true } })
    : [];
  const bestMock = needs.has("MOCK_SCORE_AT_LEAST")
    ? await tx.assessmentAttempt.aggregate({ where: { userId, mode: "MOCK_EXAM", status: "MARKED" }, _max: { percentage: true } })
    : null;
  const diagnostics = needs.has("DIAGNOSTIC_COMPLETED")
    ? await tx.subjectEnrollment.count({ where: { userId, diagnosticCompletedAt: { not: null } } })
    : 0;
  const bySubject = new Map(mastered.map((row) => [row.subjectId, row._count._all]));
  const metrics: AchievementMetrics = {
    longestStreak: Math.max(stats?.longestStreak ?? 0, stats?.currentStreak ?? 0),
    questionsAnswered: stats?.totalQuestionsAttempted ?? 0,
    mocksCompleted: stats?.mockExamsCompleted ?? 0,
    weeklyGoalsMet: stats?.weeksGoalMetTotal ?? 0,
    studySeconds: stats?.totalStudySeconds ?? 0,
    flashcardsReviewed: stats?.flashcardsReviewed ?? 0,
    topicsMastered: [...bySubject.values()].reduce((sum, n) => sum + n, 0),
    topicsMasteredBySubject: bySubject,
    bestMockPercent: bestMock?._max.percentage ?? null,
    diagnosticsCompleted: diagnostics,
    daysToExam: options.daysToExam ?? null,
  };

  const unlocked: UnlockedAchievement[] = [];
  const context = options.context ? (options.context as Prisma.InputJsonObject) : undefined;
  for (const candidate of candidates) {
    if (!achievementMet(candidate.rule, metrics)) continue;
    const { count: inserted } = await tx.userAchievement.createMany({
      data: [{ userId, achievementId: candidate.id, unlockedAt: at, ...(context ? { context } : {}) }],
      skipDuplicates: true,
    });
    if (inserted === 0) continue;
    unlocked.push({
      achievementId: candidate.id,
      code: candidate.code,
      name: candidate.name,
      description: candidate.description,
      xpReward: candidate.xpReward,
    });
    await createNotification(
      userId,
      {
        type: "achievement.unlocked",
        category: "ACHIEVEMENT",
        title: `Badge earned: ${candidate.name}`,
        body: candidate.description,
        data: { href: "/app/achievements", entityType: "Achievement", entityId: candidate.id },
        dedupeKey: `achievement:${candidate.id}`,
      },
      { client: tx },
    );
    if (candidate.xpReward > 0) {
      await awardXp(tx, userId, "ACHIEVEMENT_UNLOCKED", candidate.id, candidate.xpReward, {
        sourceType: "ACHIEVEMENT",
        at,
        ...(options.timeZone ? { timeZone: options.timeZone } : {}),
        ...(options.rules ? { rules: options.rules } : {}),
      });
    }
  }
  if (needs.has("TOPICS_MASTERED")) {
    // Keep the lifetime counter in step (the row may have been created by an XP award above).
    await tx.learnerStats.updateMany({ where: { userId, topicsMastered: { not: metrics.topicsMastered } }, data: { topicsMastered: metrics.topicsMastered } });
  }
  return unlocked;
}
