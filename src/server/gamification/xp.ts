/**
 * Experience points and levels (§19 XP; "NOT childish — appropriate for teenagers and young adults").
 * Pure core: no DB, no I/O.
 *
 * Design:
 * - XP rewards study behaviour, not raw talent: answering a question earns a little even when wrong, correct
 *   answers earn more on harder questions, and completing lessons, mock exams, flashcard sessions and goals earns
 *   flat amounts. Mock exams earn the same XP whatever the score, so weaker students are not punished for testing.
 * - The values are configuration, not code: {@link DEFAULT_XP_RULES} is the fallback and callers may pass rules
 *   loaded from the `Setting` table (merged and validated with {@link resolveXpRules}). XP events are recorded by
 *   the service in an idempotent ledger, which is where daily caps or anti-farming rules belong.
 * - Levels grow gently: reaching level L+1 from L costs `100 + 50·(L−1)` XP (100, 150, 200, …), so level 10 needs
 *   2,700 XP — weeks of steady study, not minutes. No titles, badges or mascots here: the UI shows "Level 7" and a
 *   plain progress bar.
 */
import { toDifficulty, type Difficulty } from "@/server/progress/core";

export type XpEvent =
  | { type: "QUESTION_ANSWERED"; result: "CORRECT" | "PARTIAL" | "INCORRECT"; difficulty: number }
  | { type: "LESSON_COMPLETED" }
  | { type: "FLASHCARD_SESSION"; cardsReviewed: number }
  | { type: "MOCK_EXAM_COMPLETED" }
  | { type: "DAILY_GOAL_MET" }
  | { type: "WEEKLY_GOAL_MET" }
  | { type: "STREAK_MILESTONE"; days: number };

export type XpEventType = XpEvent["type"];

export interface XpRules {
  /** Every answered question (effort counts, even when wrong). */
  questionAnswered: number;
  /** Bonus for a fully correct answer by difficulty 1–5. */
  correctAnswerByDifficulty: Readonly<Record<Difficulty, number>>;
  /** Share of the correct bonus for a PARTIAL answer (rounded down). */
  partialCreditFraction: number;
  lessonCompleted: number;
  flashcardSession: number;
  /** Minimum cards in a session for it to earn XP. */
  flashcardSessionMinCards: number;
  mockExamCompleted: number;
  dailyGoalMet: number;
  weeklyGoalMet: number;
  /** Streak length (days, as a string key for JSON settings) → XP. Lengths not listed earn nothing. */
  streakMilestones: Readonly<Record<string, number>>;
}

export const DEFAULT_XP_RULES: Readonly<XpRules> = Object.freeze({
  questionAnswered: 1,
  correctAnswerByDifficulty: Object.freeze({ 1: 2, 2: 3, 3: 4, 4: 6, 5: 8 }),
  partialCreditFraction: 0.5,
  lessonCompleted: 10,
  flashcardSession: 5,
  flashcardSessionMinCards: 10,
  mockExamCompleted: 50,
  dailyGoalMet: 10,
  weeklyGoalMet: 30,
  streakMilestones: Object.freeze({ "7": 25, "30": 75, "100": 200, "365": 500 }),
});

/** Partial overrides, e.g. parsed from a settings JSON document. Nested records merge key by key. */
export type XpRulesOverride = Partial<Omit<XpRules, "correctAnswerByDifficulty" | "streakMilestones">> & {
  correctAnswerByDifficulty?: Partial<Record<Difficulty, number>>;
  streakMilestones?: Readonly<Record<string, number>>;
};

function assertXp(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`XP rule ${name} must be a non-negative integer, received ${String(value)}`);
}

/**
 * Merges overrides onto {@link DEFAULT_XP_RULES} and validates every value (non-negative integers; the partial
 * fraction in [0, 1]; milestone keys positive integers). Throws `RangeError` on invalid configuration so a bad
 * admin setting fails loudly instead of awarding nonsense.
 */
export function resolveXpRules(overrides: XpRulesOverride = {}): XpRules {
  const rules: XpRules = {
    ...DEFAULT_XP_RULES,
    ...overrides,
    correctAnswerByDifficulty: { ...DEFAULT_XP_RULES.correctAnswerByDifficulty, ...overrides.correctAnswerByDifficulty },
    streakMilestones: overrides.streakMilestones ?? DEFAULT_XP_RULES.streakMilestones,
  };
  for (const key of ["questionAnswered", "lessonCompleted", "flashcardSession", "flashcardSessionMinCards", "mockExamCompleted", "dailyGoalMet", "weeklyGoalMet"] as const) {
    assertXp(rules[key], key);
  }
  for (const [difficulty, xp] of Object.entries(rules.correctAnswerByDifficulty)) assertXp(xp, `correctAnswerByDifficulty.${difficulty}`);
  for (const [days, xp] of Object.entries(rules.streakMilestones)) {
    if (!/^[1-9]\d*$/.test(days)) throw new RangeError(`Streak milestone key must be a positive integer, received ${days}`);
    assertXp(xp, `streakMilestones.${days}`);
  }
  if (!(rules.partialCreditFraction >= 0 && rules.partialCreditFraction <= 1)) {
    throw new RangeError(`partialCreditFraction must be between 0 and 1, received ${String(rules.partialCreditFraction)}`);
  }
  return rules;
}

/** XP earned for one event under `rules` (defaults to {@link DEFAULT_XP_RULES}). Always a non-negative integer. */
export function xpFor(event: XpEvent, rules: XpRules = DEFAULT_XP_RULES): number {
  switch (event.type) {
    case "QUESTION_ANSWERED": {
      const bonus = rules.correctAnswerByDifficulty[toDifficulty(event.difficulty)];
      if (event.result === "CORRECT") return rules.questionAnswered + bonus;
      if (event.result === "PARTIAL") return rules.questionAnswered + Math.floor(bonus * rules.partialCreditFraction);
      return rules.questionAnswered;
    }
    case "LESSON_COMPLETED":
      return rules.lessonCompleted;
    case "FLASHCARD_SESSION":
      return Number.isFinite(event.cardsReviewed) && event.cardsReviewed >= rules.flashcardSessionMinCards ? rules.flashcardSession : 0;
    case "MOCK_EXAM_COMPLETED":
      return rules.mockExamCompleted;
    case "DAILY_GOAL_MET":
      return rules.dailyGoalMet;
    case "WEEKLY_GOAL_MET":
      return rules.weeklyGoalMet;
    case "STREAK_MILESTONE":
      return Number.isInteger(event.days) ? (rules.streakMilestones[String(event.days)] ?? 0) : 0;
  }
}

/** Sum of {@link xpFor} over several events. */
export function totalXp(events: readonly XpEvent[], rules: XpRules = DEFAULT_XP_RULES): number {
  return events.reduce((sum, event) => sum + xpFor(event, rules), 0);
}

// ---------------------------------------------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------------------------------------------

export interface LevelCurve {
  /** XP to go from level 1 to level 2. */
  firstLevelXp: number;
  /** Extra XP each subsequent level costs. */
  increment: number;
}

export const DEFAULT_LEVEL_CURVE: Readonly<LevelCurve> = Object.freeze({ firstLevelXp: 100, increment: 50 });

function validateCurve(curve: LevelCurve): void {
  if (!(Number.isFinite(curve.firstLevelXp) && curve.firstLevelXp > 0)) throw new RangeError("firstLevelXp must be positive");
  if (!(Number.isFinite(curve.increment) && curve.increment >= 0)) throw new RangeError("increment must be non-negative");
}

/** Cumulative XP needed to reach `level` (level 1 = 0 XP). */
export function xpRequiredForLevel(level: number, curve: LevelCurve = DEFAULT_LEVEL_CURVE): number {
  validateCurve(curve);
  if (!Number.isInteger(level) || level < 1) throw new RangeError(`level must be a positive integer, received ${String(level)}`);
  const n = level - 1;
  return curve.firstLevelXp * n + (curve.increment * n * (n - 1)) / 2;
}

export interface LevelProgress {
  level: number;
  /** XP earned since reaching `level`. */
  xpIntoLevel: number;
  /** XP span of the current level (from `level` to `level + 1`). */
  xpForNextLevel: number;
  xpToNextLevel: number;
  /** 0–1, three decimals. */
  progress: number;
}

/**
 * Level for a lifetime XP total, using the closed-form inverse of {@link xpRequiredForLevel} (then nudged by ±1 to
 * absorb floating-point error). Negative or non-finite XP is treated as 0.
 */
export function levelForXp(xp: number, curve: LevelCurve = DEFAULT_LEVEL_CURVE): LevelProgress {
  validateCurve(curve);
  const total = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  const a = curve.firstLevelXp;
  const d = curve.increment;
  // Solve d/2·n² + (a − d/2)·n ≤ xp for the largest integer n (levels gained).
  let n =
    d === 0 ? Math.floor(total / a) : Math.floor((-(a - d / 2) + Math.sqrt((a - d / 2) ** 2 + 2 * d * total)) / d);
  n = Math.max(0, n);
  while (n > 0 && xpRequiredForLevel(n + 1, curve) > total) n -= 1;
  while (xpRequiredForLevel(n + 2, curve) <= total) n += 1;
  const level = n + 1;
  const floor = xpRequiredForLevel(level, curve);
  const span = xpRequiredForLevel(level + 1, curve) - floor;
  const into = total - floor;
  return {
    level,
    xpIntoLevel: into,
    xpForNextLevel: span,
    xpToNextLevel: span - into,
    progress: Math.round((into / span) * 1000) / 1000,
  };
}
