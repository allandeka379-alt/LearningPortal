import "server-only";
import { z } from "zod";
import type { AchievementCategory, Role } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, dateColumnFromLocalDate, isValidTimeZone, isoWeekKey, localDateString, startOfWeek, addDays, type LocalDate } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { db } from "@/server/db";
import { normalizeAchievementCriteria, streakStateFromStats } from "@/server/gamification/service";
import { DEFAULT_STREAK_CONFIG, currentStreakAsOf, streakStatus, weeklyGoalProgress, type StreakStatus } from "@/server/gamification/streaks";
import { levelForXp, type LevelProgress } from "@/server/gamification/xp";
import { AppError } from "@/server/lib/errors";
import { getStudyDefaults } from "@/server/lib/settings";
import { WEEKLY_GOAL_LIMITS, criteriaProgress, criteriaText, percentOf, weeklyMinutesTarget, type CriteriaProgress } from "./achievements-core";

/**
 * /app/achievements read model (§19: badges, streak, weekly goals, XP and levels) plus the student's editable weekly
 * targets. Reads the gamification rollups (LearnerStats, DailyActivity, UserAchievement) — never raw attempts except
 * one aggregate for mock-score badges. Rules come from the Achievement rows (admin-editable data).
 */

/** The reading user. Structurally satisfied by the auth `Actor`. */
export interface EngagementActor {
  userId: string;
  roles: readonly Role[];
  timeZone?: string;
}

export interface AchievementItem {
  achievementId: string;
  code: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: number;
  iconKey: string;
  xpReward: number;
  earned: boolean;
  unlockedAt: Date | null;
  /** What it takes, from the rule (null when the rule shape is unknown). */
  criteria: string | null;
  /** Progress toward a locked badge (null when earned or not countable). */
  progress: CriteriaProgress | null;
}

export interface WeeklyGoalView {
  weekKey: string;
  weekStart: LocalDate;
  /** Days this week the daily goal was met (streak days) and the days the weekly goal needs. */
  daysMet: number;
  goalDays: number;
  achieved: boolean;
  daysLeft: number;
  stillPossible: boolean;
  /** `defaultTarget` is what applies when the student clears their own target. */
  minutes: { target: number; source: "CUSTOM" | "DAILY_GOAL" | "DEFAULT"; defaultTarget: number; done: number; percent: number };
  /** Optional XP target (null until the student sets one). */
  xp: { target: number | null; done: number; percent: number | null };
}

export interface AchievementsView {
  today: LocalDate;
  timeZone: string;
  xp: { total: number; thisWeek: number; level: LevelProgress };
  streak: { current: number; longest: number; status: StreakStatus; freezesAvailable: number };
  weeklyGoal: WeeklyGoalView;
  earned: AchievementItem[];
  locked: AchievementItem[];
  /** Secret badges not yet earned (shown as a count only). */
  hiddenCount: number;
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

function assertStudent(actor: EngagementActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Achievements are for students.");
}

/**
 * Everything the achievements page shows: level progress (levelForXp), XP this week, streak and freezes, the weekly
 * goal (days, minutes and optional XP target), badges earned (newest first, with dates) and badges still locked with
 * their criteria and real progress. Secret badges stay hidden until earned.
 *
 * @throws AppError FORBIDDEN for non-students.
 */
export async function getAchievementsView(actor: EngagementActor, now: Date = new Date()): Promise<AchievementsView> {
  assertStudent(actor);
  const userId = actor.userId;
  const profile = actor.timeZone ? null : await db.profile.findUnique({ where: { userId }, select: { timezone: true } });
  const timeZone = safeZone(actor.timeZone ?? profile?.timezone);
  const today = localDateString(now, timeZone);
  const monday = startOfWeek(today);

  const [stats, definitions, earnedRows, weekDays, studyDefaults] = await Promise.all([
    db.learnerStats.findUnique({ where: { userId } }),
    db.achievement.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { code: "asc" }],
      select: { id: true, code: true, name: true, description: true, category: true, tier: true, iconKey: true, xpReward: true, isSecret: true, criteria: true },
    }),
    // Earned badges stay visible even if the definition was deactivated later.
    db.userAchievement.findMany({
      where: { userId },
      orderBy: [{ unlockedAt: "desc" }],
      select: {
        unlockedAt: true,
        achievement: { select: { id: true, code: true, name: true, description: true, category: true, tier: true, iconKey: true, xpReward: true, criteria: true } },
      },
    }),
    db.dailyActivity.findMany({
      where: { userId, date: { gte: dateColumnFromLocalDate(monday), lte: dateColumnFromLocalDate(addDays(monday, 6)) } },
      select: { studySeconds: true, xpEarned: true, streakCredited: true, streakFreezeUsed: true },
    }),
    getStudyDefaults(),
  ]);

  const earnedIds = new Set(earnedRows.map((row) => row.achievement.id));
  const lockedDefinitions = definitions.filter((d) => !earnedIds.has(d.id));
  const lockedRules = lockedDefinitions.map((d) => ({ definition: d, rule: normalizeAchievementCriteria(d.criteria) }));
  const needs = new Set(lockedRules.flatMap((r) => (r.rule ? [r.rule.type] : [])));
  const subjectIds = [...new Set(lockedRules.flatMap((r) => (r.rule?.type === "TOPICS_MASTERED" && r.rule.subjectId ? [r.rule.subjectId] : [])))];

  const [mastered, bestMock, diagnostics, subjects] = await Promise.all([
    needs.has("TOPICS_MASTERED")
      ? db.topicMastery.groupBy({ by: ["subjectId"], where: { userId, band: "MASTERED", isLeaf: true }, _count: { _all: true } })
      : Promise.resolve([]),
    needs.has("MOCK_SCORE_AT_LEAST")
      ? db.assessmentAttempt.aggregate({ where: { userId, mode: "MOCK_EXAM", status: "MARKED" }, _max: { percentage: true } })
      : Promise.resolve(null),
    needs.has("DIAGNOSTIC_COMPLETED") ? db.subjectEnrollment.count({ where: { userId, diagnosticCompletedAt: { not: null } } }) : Promise.resolve(0),
    subjectIds.length ? db.subject.findMany({ where: { id: { in: subjectIds } }, select: { id: true, name: true } }) : Promise.resolve([]),
  ]);
  const bySubject = new Map(mastered.map((row) => [row.subjectId, row._count._all]));
  const subjectName = new Map(subjects.map((s) => [s.id, s.name]));
  const facts = {
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
  };

  const earned: AchievementItem[] = earnedRows.map(({ achievement: a, unlockedAt }) => {
    const rule = normalizeAchievementCriteria(a.criteria);
    return {
      achievementId: a.id,
      code: a.code,
      name: a.name,
      description: a.description,
      category: a.category,
      tier: a.tier,
      iconKey: a.iconKey,
      xpReward: a.xpReward,
      earned: true,
      unlockedAt,
      criteria: rule ? criteriaText(rule, rule.type === "TOPICS_MASTERED" && rule.subjectId ? subjectName.get(rule.subjectId) : null) : null,
      progress: null,
    };
  });
  const locked: AchievementItem[] = lockedRules
    .filter(({ definition }) => !definition.isSecret)
    .map(({ definition: d, rule }) => ({
      achievementId: d.id,
      code: d.code,
      name: d.name,
      description: d.description,
      category: d.category,
      tier: d.tier,
      iconKey: d.iconKey,
      xpReward: d.xpReward,
      earned: false,
      unlockedAt: null,
      criteria: rule ? criteriaText(rule, rule.type === "TOPICS_MASTERED" && rule.subjectId ? subjectName.get(rule.subjectId) : null) : null,
      progress: rule ? criteriaProgress(rule, facts) : null,
    }));

  // Weekly goal: streak days this week (the §19 weekly goal that earns a freeze) + minutes / XP targets.
  const weekDaysMet = weekDays.filter((d) => d.streakCredited && !d.streakFreezeUsed).length;
  const state = stats ? streakStateFromStats(stats, { freezeUsedOn: null, weekKey: isoWeekKey(today), weekDaysMet }) : null;
  const weekly = weeklyGoalProgress(
    state ?? {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      freezesAvailable: 0,
      freezeUsedOn: null,
      weekKey: isoWeekKey(today),
      weekDaysMet,
      lastFreezeEarnedWeek: null,
    },
    today,
  );
  const minutesDone = Math.floor(weekDays.reduce((sum, d) => sum + d.studySeconds, 0) / 60);
  const xpDone = weekDays.reduce((sum, d) => sum + d.xpEarned, 0);
  const targetInput = {
    goalMinutes: stats?.weeklyGoalMinutes ?? null,
    dailyGoalMinutes: stats?.dailyGoalMinutes ?? null,
    defaultDailyMinutes: studyDefaults.dailyGoalMinutes,
    weeklyGoalDays: DEFAULT_STREAK_CONFIG.weeklyGoalDays,
  };
  const minutesTarget = weeklyMinutesTarget(targetInput);
  const defaultMinutesTarget = weeklyMinutesTarget({ ...targetInput, goalMinutes: null }).minutes;
  const xpTarget = stats?.weeklyGoalXp ?? null;

  const totalXp = stats?.totalXp ?? 0;
  return {
    today,
    timeZone,
    xp: { total: totalXp, thisWeek: xpDone, level: levelForXp(totalXp) },
    streak: {
      current: state ? currentStreakAsOf(state, today) : 0,
      longest: stats?.longestStreak ?? 0,
      status: state ? streakStatus(state, today) : "INACTIVE",
      freezesAvailable: stats?.streakFreezesAvailable ?? 0,
    },
    weeklyGoal: {
      weekKey: weekly.weekKey,
      weekStart: weekly.weekStart,
      daysMet: weekly.daysMet,
      goalDays: weekly.goalDays,
      achieved: weekly.achieved,
      daysLeft: weekly.daysLeft,
      stillPossible: weekly.stillPossible,
      minutes: {
        target: minutesTarget.minutes,
        source: minutesTarget.source,
        defaultTarget: defaultMinutesTarget,
        done: minutesDone,
        percent: percentOf(minutesDone, minutesTarget.minutes),
      },
      xp: { target: xpTarget, done: xpDone, percent: xpTarget === null ? null : percentOf(xpDone, xpTarget) },
    },
    earned,
    locked,
    hiddenCount: lockedDefinitions.filter((d) => d.isSecret).length,
  };
}

const optionalTarget = (limits: { min: number; max: number }, label: string) =>
  z.preprocess(
    (value) => (value === "" || value === undefined || value === null ? null : typeof value === "string" ? Number(value) : value),
    z
      .number({ error: `Enter a number for your ${label}.` })
      .int({ error: `Use a whole number for your ${label}.` })
      .min(limits.min, { error: `Your ${label} must be at least ${limits.min}.` })
      .max(limits.max, { error: `Your ${label} can be at most ${limits.max.toLocaleString("en")}.` })
      .nullable(),
  );

export const weeklyGoalSchema = z.strictObject({
  /** Weekly study minutes (null = use the default derived from the daily goal). */
  weeklyGoalMinutes: optionalTarget(WEEKLY_GOAL_LIMITS.minutes, "weekly study time"),
  /** Weekly XP target (null = none). */
  weeklyGoalXp: optionalTarget(WEEKLY_GOAL_LIMITS.xp, "weekly XP target"),
});

/**
 * Saves the student's weekly targets (§19 weekly goals) on their own LearnerStats row (created when missing). Blank
 * values clear a target. Only these two columns are written, so streak / XP counters are never touched.
 *
 * @throws AppError FORBIDDEN for non-students, VALIDATION with field errors.
 */
export async function updateWeeklyGoal(actor: EngagementActor, input: unknown): Promise<{ weeklyGoalMinutes: number | null; weeklyGoalXp: number | null }> {
  assertStudent(actor);
  const parsed = weeklyGoalSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const data = { weeklyGoalMinutes: parsed.data.weeklyGoalMinutes, weeklyGoalXp: parsed.data.weeklyGoalXp };
  const row = await db.learnerStats.upsert({
    where: { userId: actor.userId },
    create: { userId: actor.userId, ...data },
    update: data,
    select: { weeklyGoalMinutes: true, weeklyGoalXp: true },
  });
  return { weeklyGoalMinutes: row.weeklyGoalMinutes, weeklyGoalXp: row.weeklyGoalXp };
}
