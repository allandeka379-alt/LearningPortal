/**
 * Study streaks, streak freezes and weekly goals (§19: daily streak, weekly goals — "not childish").
 * Pure core: no DB, no I/O. All day arithmetic is on local calendar dates (`YYYY-MM-DD` in the student's time zone,
 * via `@/lib/dates`), so streaks are immune to UTC/midnight-CAT confusion (ARCHITECTURE risk T11).
 *
 * Definitions:
 * - **Streak day**: a local calendar day on which the student met the daily goal. The default daily goal is
 *   deliberately a low bar — at least one qualifying activity (answer a question, complete a lesson, finish a mock
 *   exam, or review 5 flashcards; see {@link dailyGoalMet}). Streaks reward showing up; the study plan's daily
 *   target (minutes) measures volume separately.
 * - **Current streak**: consecutive streak days ending today or yesterday. A day that is still in progress does not
 *   break anything: the streak is "at risk" until midnight.
 * - **Freeze**: earned by meeting the weekly goal (default 5 streak days in an ISO week, at most one per week,
 *   holding at most 2). A freeze bridges a single missed day automatically: the streak survives but the bridged day
 *   does not add to its length. Two or more consecutive missed days break the streak even with freezes in hand.
 * - **Late sync**: activity for an older day that arrives after newer days (offline sync) is ignored for the streak,
 *   except that activity for the exact day a freeze bridged refunds the freeze and counts that day.
 *
 * The functions return the new state plus events (started, extended, broken, freeze used/earned, weekly goal met,
 * milestone) that the service turns into XP (`xp.ts`), notifications and achievements.
 */
import { addDays, daysBetween, isoWeekKey, isoWeekday, parseLocalDate, startOfWeek, type LocalDate } from "@/lib/dates";

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  /** Last local date on which the daily goal was met. */
  lastActiveDate: LocalDate | null;
  freezesAvailable: number;
  /** Most recent missed day bridged by a freeze. */
  freezeUsedOn: LocalDate | null;
  /** ISO week (`"2026-W41"`) that `weekDaysMet` refers to. */
  weekKey: string | null;
  /** Streak days so far in `weekKey`. */
  weekDaysMet: number;
  /** ISO week in which the last freeze was earned (at most one per week). */
  lastFreezeEarnedWeek: string | null;
}

export interface StreakConfig {
  maxFreezes: number;
  /** Streak days needed in an ISO week to meet the weekly goal (and earn a freeze). */
  weeklyGoalDays: number;
  /** Longest run of consecutive missed days that freezes may bridge. */
  maxBridgeDays: number;
  /** Streak lengths that emit a MILESTONE event. */
  milestones: readonly number[];
}

export const DEFAULT_STREAK_CONFIG: Readonly<StreakConfig> = Object.freeze({
  maxFreezes: 2,
  weeklyGoalDays: 5,
  maxBridgeDays: 1,
  milestones: Object.freeze([3, 7, 14, 30, 50, 100, 200, 365]),
});

export type StreakEvent =
  | { type: "STREAK_STARTED"; date: LocalDate }
  | { type: "STREAK_EXTENDED"; date: LocalDate; length: number }
  | { type: "STREAK_BROKEN"; previousLength: number }
  | { type: "FREEZE_USED"; date: LocalDate }
  | { type: "FREEZE_REFUNDED"; date: LocalDate }
  | { type: "FREEZE_EARNED"; weekKey: string }
  | { type: "WEEKLY_GOAL_MET"; weekKey: string }
  | { type: "MILESTONE"; days: number };

export interface StreakUpdate {
  state: StreakState;
  events: StreakEvent[];
}

export function initialStreakState(): StreakState {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    freezesAvailable: 0,
    freezeUsedOn: null,
    weekKey: null,
    weekDaysMet: 0,
    lastFreezeEarnedWeek: null,
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Daily goal
// ---------------------------------------------------------------------------------------------------------------

/** One local day's activity totals for a student. */
export interface DailyActivity {
  questionsAnswered: number;
  lessonsCompleted: number;
  flashcardsReviewed: number;
  mockExamsCompleted: number;
  studyMinutes?: number;
}

export interface DailyGoal {
  minQualifyingActivities: number;
  /** Optional minimum study time; 0 = not required. */
  minStudyMinutes: number;
  /** Flashcard reviews that make up one qualifying activity. */
  flashcardsPerActivity: number;
}

export const DEFAULT_DAILY_GOAL: Readonly<DailyGoal> = Object.freeze({
  minQualifyingActivities: 1,
  minStudyMinutes: 0,
  flashcardsPerActivity: 5,
});

const count = (value: number | undefined) => (value !== undefined && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0);

/** Number of qualifying activities in a day (questions + lessons + mock exams + flashcard batches). */
export function qualifyingActivities(activity: DailyActivity, goal: Partial<DailyGoal> = {}): number {
  const perBatch = Math.max(1, goal.flashcardsPerActivity ?? DEFAULT_DAILY_GOAL.flashcardsPerActivity);
  return (
    count(activity.questionsAnswered) +
    count(activity.lessonsCompleted) +
    count(activity.mockExamsCompleted) +
    Math.floor(count(activity.flashcardsReviewed) / perBatch)
  );
}

/** Whether a day's activity meets the daily goal (default: at least one qualifying activity). */
export function dailyGoalMet(activity: DailyActivity, goal: Partial<DailyGoal> = {}): boolean {
  const g = { ...DEFAULT_DAILY_GOAL, ...goal };
  return qualifyingActivities(activity, g) >= g.minQualifyingActivities && count(activity.studyMinutes) >= g.minStudyMinutes;
}

// ---------------------------------------------------------------------------------------------------------------
// Streak transitions
// ---------------------------------------------------------------------------------------------------------------

function resolveConfig(overrides?: Partial<StreakConfig>): StreakConfig {
  return overrides ? { ...DEFAULT_STREAK_CONFIG, ...overrides } : DEFAULT_STREAK_CONFIG;
}

/** The latest day that keeps the streak alive: the last goal day or the last bridged day. */
function anchorOf(state: StreakState): LocalDate | null {
  const { lastActiveDate, freezeUsedOn } = state;
  if (lastActiveDate === null) return freezeUsedOn;
  if (freezeUsedOn === null) return lastActiveDate;
  return daysBetween(lastActiveDate, freezeUsedOn) > 0 ? freezeUsedOn : lastActiveDate;
}

function cloneState(state: StreakState): StreakState {
  return { ...state };
}

/**
 * Closes out days that ended without the goal before `today` (exclusive): bridges a short gap with freezes or
 * breaks the streak. Idempotent; used by the nightly `gamification.streakMaintenance` job and internally before
 * every activity. Never changes anything for `today` itself.
 */
export function settleStreak(state: StreakState, today: LocalDate, config?: Partial<StreakConfig>): StreakUpdate {
  parseLocalDate(today);
  const cfg = resolveConfig(config);
  const next = cloneState(state);
  const anchor = anchorOf(state);
  if (anchor === null || state.currentStreak === 0) return { state: next, events: [] };
  const gap = daysBetween(anchor, today);
  if (gap <= 1) return { state: next, events: [] };

  const missed = gap - 1;
  if (missed <= cfg.maxBridgeDays && missed <= state.freezesAvailable) {
    const events: StreakEvent[] = [];
    for (let i = 1; i <= missed; i++) events.push({ type: "FREEZE_USED", date: addDays(anchor, i) });
    next.freezesAvailable = state.freezesAvailable - missed;
    next.freezeUsedOn = addDays(today, -1);
    return { state: next, events };
  }
  next.currentStreak = 0;
  return { state: next, events: [{ type: "STREAK_BROKEN", previousLength: state.currentStreak }] };
}

function countWeekDay(next: StreakState, date: LocalDate, cfg: StreakConfig, events: StreakEvent[]): void {
  const week = isoWeekKey(date);
  if (next.weekKey !== week) {
    next.weekKey = week;
    next.weekDaysMet = 0;
  }
  next.weekDaysMet += 1;
  if (next.weekDaysMet !== cfg.weeklyGoalDays) return;
  events.push({ type: "WEEKLY_GOAL_MET", weekKey: week });
  if (next.lastFreezeEarnedWeek !== week && next.freezesAvailable < cfg.maxFreezes) {
    next.freezesAvailable += 1;
    next.lastFreezeEarnedWeek = week;
    events.push({ type: "FREEZE_EARNED", weekKey: week });
  }
}

function lengthen(next: StreakState, cfg: StreakConfig, events: StreakEvent[]): void {
  next.longestStreak = Math.max(next.longestStreak, next.currentStreak);
  if (cfg.milestones.includes(next.currentStreak)) events.push({ type: "MILESTONE", days: next.currentStreak });
}

/**
 * Records the outcome of local day `activityDate` for the streak (call it whenever activity is recorded; it is
 * idempotent per day). `goalMet = false` only settles missed days.
 */
export function applyActivityDay(
  state: StreakState,
  activityDate: LocalDate,
  goalMet: boolean,
  config?: Partial<StreakConfig>,
): StreakUpdate {
  parseLocalDate(activityDate);
  const cfg = resolveConfig(config);

  // Late sync for the day a freeze bridged (and nothing newer recorded since): refund the freeze, count the day.
  // Restricted to the anchor day so we never credit a bridged day from an earlier, already-broken run.
  if (
    goalMet &&
    state.currentStreak > 0 &&
    state.freezeUsedOn === activityDate &&
    (state.lastActiveDate === null || daysBetween(state.lastActiveDate, activityDate) > 0)
  ) {
    const next = cloneState(state);
    const events: StreakEvent[] = [{ type: "FREEZE_REFUNDED", date: activityDate }];
    next.freezeUsedOn = null;
    next.freezesAvailable = Math.min(cfg.maxFreezes, state.freezesAvailable + 1);
    next.currentStreak = state.currentStreak + 1;
    next.lastActiveDate = activityDate;
    events.push({ type: "STREAK_EXTENDED", date: activityDate, length: next.currentStreak });
    lengthen(next, cfg, events);
    countWeekDay(next, activityDate, cfg, events); // the bridged day is the latest day, so its week is current
    return { state: next, events };
  }

  const anchor = anchorOf(state);
  if (anchor !== null && daysBetween(anchor, activityDate) < 0) return { state: cloneState(state), events: [] };

  const settled = settleStreak(state, activityDate, cfg);
  if (!goalMet || settled.state.lastActiveDate === activityDate) return settled;

  const next = settled.state;
  const events = [...settled.events];
  const newAnchor = anchorOf(next);
  if (next.currentStreak > 0 && newAnchor !== null && daysBetween(newAnchor, activityDate) === 1) {
    next.currentStreak += 1;
    events.push({ type: "STREAK_EXTENDED", date: activityDate, length: next.currentStreak });
  } else {
    next.currentStreak = 1;
    events.push({ type: "STREAK_STARTED", date: activityDate });
  }
  next.lastActiveDate = activityDate;
  lengthen(next, cfg, events);
  countWeekDay(next, activityDate, cfg, events);
  return { state: next, events };
}

/**
 * The streak to display on `today` without mutating state: unchanged while today or yesterday is a streak day,
 * kept when the gap can still be bridged by freezes, otherwise 0.
 */
export function currentStreakAsOf(state: StreakState, today: LocalDate, config?: Partial<StreakConfig>): number {
  const cfg = resolveConfig(config);
  const anchor = anchorOf(state);
  if (anchor === null || state.currentStreak === 0) return 0;
  const gap = daysBetween(anchor, today);
  if (gap <= 1) return state.currentStreak;
  const missed = gap - 1;
  return missed <= cfg.maxBridgeDays && missed <= state.freezesAvailable ? state.currentStreak : 0;
}

export type StreakStatus = "INACTIVE" | "AT_RISK" | "DONE_TODAY";

/** `DONE_TODAY` once today's goal is met; `AT_RISK` while a live streak still needs today; otherwise `INACTIVE`. */
export function streakStatus(state: StreakState, today: LocalDate, config?: Partial<StreakConfig>): StreakStatus {
  if (state.lastActiveDate === today) return "DONE_TODAY";
  return currentStreakAsOf(state, today, config) > 0 ? "AT_RISK" : "INACTIVE";
}

export interface WeeklyGoalProgress {
  weekKey: string;
  /** Monday of the week. */
  weekStart: LocalDate;
  daysMet: number;
  goalDays: number;
  achieved: boolean;
  /** Days left in the week including today. */
  daysLeft: number;
  /** Whether the goal can still be reached this week. */
  stillPossible: boolean;
}

/** Weekly goal progress for the ISO week containing `today` (§19 "weekly goals"). */
export function weeklyGoalProgress(state: StreakState, today: LocalDate, config?: Partial<StreakConfig>): WeeklyGoalProgress {
  const cfg = resolveConfig(config);
  const weekKey = isoWeekKey(today);
  const daysMet = state.weekKey === weekKey ? state.weekDaysMet : 0;
  const doneToday = state.lastActiveDate === today;
  const daysLeft = 8 - isoWeekday(today);
  const achievable = daysMet + daysLeft - (doneToday ? 1 : 0);
  return {
    weekKey,
    weekStart: startOfWeek(today),
    daysMet,
    goalDays: cfg.weeklyGoalDays,
    achieved: daysMet >= cfg.weeklyGoalDays,
    daysLeft,
    stillPossible: daysMet >= cfg.weeklyGoalDays || achievable >= cfg.weeklyGoalDays,
  };
}
