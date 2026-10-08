/**
 * Achievements page read model helpers (§19 badges, weekly goals, levels). Pure core: no DB, no I/O.
 *
 * Achievement definitions are DB rows (admin-editable); their `criteria` is normalised by the gamification service
 * (`normalizeAchievementCriteria`) into an {@link AchievementRule}. Here we only turn a rule into honest, readable
 * criteria text and measurable progress from the student's real counters — nothing is estimated or invented.
 */
import type { AchievementRule } from "@/server/gamification/service";
import { formatCount } from "@/lib/format";

/** Counters progress is measured against (the same facts the unlock rules use). */
export interface AchievementProgressFacts {
  longestStreak: number;
  questionsAnswered: number;
  mocksCompleted: number;
  weeklyGoalsMet: number;
  studySeconds: number;
  flashcardsReviewed: number;
  topicsMastered: number;
  topicsMasteredBySubject: ReadonlyMap<string, number>;
  bestMockPercent: number | null;
  diagnosticsCompleted: number;
}

/** What the student has to do, in plain words (no jargon, no hype). */
export function criteriaText(rule: AchievementRule, subjectName?: string | null): string {
  switch (rule.type) {
    case "STREAK_DAYS":
      return `Meet your daily goal ${formatCount(rule.days, "day")} in a row.`;
    case "QUESTIONS_ANSWERED":
      return `Answer ${formatCount(rule.count, "question")}.`;
    case "TOPICS_MASTERED":
      return `Reach Mastered on ${formatCount(rule.count, "topic")}${rule.subjectId ? ` in ${subjectName ?? "one subject"}` : ""}.`;
    case "MOCKS_COMPLETED":
      return `Complete ${formatCount(rule.count, "mock exam")}.`;
    case "MOCK_SCORE_AT_LEAST":
      return `Score at least ${rule.percent}% in a mock exam.`;
    case "WEEKLY_GOALS_MET":
      return `Meet your weekly goal ${rule.count === 1 ? "once" : `${rule.count} times`}.`;
    case "STUDY_HOURS":
      return `Study for ${formatCount(rule.hours, "hour")} in total.`;
    case "FLASHCARDS_REVIEWED":
      return `Review ${formatCount(rule.count, "flashcard")}.`;
    case "DIAGNOSTIC_COMPLETED":
      return rule.count <= 1 ? "Complete a diagnostic test." : `Complete ${formatCount(rule.count, "diagnostic test")}.`;
    case "DAYS_TO_EXAM":
      return `Keep studying when your exam is ${formatCount(rule.days, "day")} away or less.`;
  }
}

export interface CriteriaProgress {
  current: number;
  target: number;
  /** Unit for display ("days", "questions", "%", "hours"...). */
  unit: string;
}

/**
 * Measurable progress toward a rule from real counters, or null when progress is not a count (exam countdown badges).
 * `current` is capped at `target` so a bar never overflows.
 */
export function criteriaProgress(rule: AchievementRule, facts: AchievementProgressFacts): CriteriaProgress | null {
  const progress = (current: number, target: number, unit: string): CriteriaProgress => ({
    current: Math.max(0, Math.min(target, Math.floor(current))),
    target,
    unit,
  });
  switch (rule.type) {
    case "STREAK_DAYS":
      return progress(facts.longestStreak, rule.days, "days");
    case "QUESTIONS_ANSWERED":
      return progress(facts.questionsAnswered, rule.count, "questions");
    case "TOPICS_MASTERED":
      return progress(rule.subjectId ? (facts.topicsMasteredBySubject.get(rule.subjectId) ?? 0) : facts.topicsMastered, rule.count, "topics");
    case "MOCKS_COMPLETED":
      return progress(facts.mocksCompleted, rule.count, "mock exams");
    case "MOCK_SCORE_AT_LEAST":
      return progress(facts.bestMockPercent ?? 0, rule.percent, "%");
    case "WEEKLY_GOALS_MET":
      return progress(facts.weeklyGoalsMet, rule.count, "weeks");
    case "STUDY_HOURS":
      return progress(facts.studySeconds / 3600, rule.hours, "hours");
    case "FLASHCARDS_REVIEWED":
      return progress(facts.flashcardsReviewed, rule.count, "flashcards");
    case "DIAGNOSTIC_COMPLETED":
      return progress(facts.diagnosticsCompleted, rule.count, "diagnostics");
    case "DAYS_TO_EXAM":
      return null;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Weekly goal (§19 "weekly goals")
// ---------------------------------------------------------------------------------------------------------------------

/** Bounds of the student-editable weekly targets (validated by the service). */
export const WEEKLY_GOAL_LIMITS = Object.freeze({
  minutes: { min: 30, max: 3000 },
  xp: { min: 50, max: 20000 },
});

export interface WeeklyTargetInput {
  /** LearnerStats.weeklyGoalMinutes (student-set; null = default). */
  goalMinutes: number | null;
  /** LearnerStats.dailyGoalMinutes (student's own daily goal) or null. */
  dailyGoalMinutes: number | null;
  /** Platform default daily goal (Setting `study.defaults`). */
  defaultDailyMinutes: number;
  /** Streak days a week needs for the weekly goal (gamification streak config). */
  weeklyGoalDays: number;
}

/**
 * The weekly study-time target: the student's own choice, otherwise their daily goal (or the platform default) times
 * the number of goal days in a week. `source` tells the UI how to label it.
 */
export function weeklyMinutesTarget(input: WeeklyTargetInput): { minutes: number; source: "CUSTOM" | "DAILY_GOAL" | "DEFAULT" } {
  if (input.goalMinutes !== null && input.goalMinutes > 0) return { minutes: input.goalMinutes, source: "CUSTOM" };
  const days = Math.max(1, Math.floor(input.weeklyGoalDays));
  if (input.dailyGoalMinutes !== null && input.dailyGoalMinutes > 0) return { minutes: input.dailyGoalMinutes * days, source: "DAILY_GOAL" };
  return { minutes: Math.max(1, input.defaultDailyMinutes) * days, source: "DEFAULT" };
}

/** 0-100, whole number, capped (a target of 0 or less counts as reached). */
export function percentOf(done: number, target: number): number {
  if (!(target > 0)) return 100;
  return Math.max(0, Math.min(100, Math.floor((done / target) * 100)));
}
