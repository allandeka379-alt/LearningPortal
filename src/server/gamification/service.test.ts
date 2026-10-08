import { describe, expect, it } from "vitest";
import {
  achievementMet,
  attemptXp,
  defaultXpFor,
  displayedStreak,
  normalizeAchievementCriteria,
  streakStateFromStats,
  type AchievementMetrics,
} from "./service";
import { DEFAULT_XP_RULES, resolveXpRules } from "./xp";

const METRICS: AchievementMetrics = {
  longestStreak: 7,
  questionsAnswered: 120,
  mocksCompleted: 1,
  weeklyGoalsMet: 2,
  studySeconds: 5 * 3600,
  flashcardsReviewed: 40,
  topicsMastered: 3,
  topicsMasteredBySubject: new Map([["s1", 3]]),
  bestMockPercent: 68,
  diagnosticsCompleted: 1,
  daysToExam: 100,
};

describe("achievement criteria", () => {
  it("accepts the seed shape (prisma/seed/data/platform.ts)", () => {
    expect(normalizeAchievementCriteria({ type: "streak_days", threshold: 3 })).toEqual({ type: "STREAK_DAYS", days: 3 });
    expect(normalizeAchievementCriteria({ type: "questions_answered", threshold: 100 })).toEqual({ type: "QUESTIONS_ANSWERED", count: 100 });
    expect(normalizeAchievementCriteria({ type: "mocks_completed", threshold: 1 })).toEqual({ type: "MOCKS_COMPLETED", count: 1 });
    expect(normalizeAchievementCriteria({ type: "topics_mastered", threshold: 10 })).toEqual({ type: "TOPICS_MASTERED", count: 10 });
    expect(normalizeAchievementCriteria({ type: "diagnostics_completed", threshold: 1 })).toEqual({ type: "DIAGNOSTIC_COMPLETED", count: 1 });
  });

  it("accepts the schema-doc shape", () => {
    expect(normalizeAchievementCriteria({ type: "STREAK_DAYS", days: 30 })).toEqual({ type: "STREAK_DAYS", days: 30 });
    expect(normalizeAchievementCriteria({ type: "DIAGNOSTIC_COMPLETED" })).toEqual({ type: "DIAGNOSTIC_COMPLETED", count: 1 });
    expect(normalizeAchievementCriteria({ type: "MOCK_SCORE_AT_LEAST", percent: 80 })).toEqual({ type: "MOCK_SCORE_AT_LEAST", percent: 80 });
  });

  it("rejects unknown or invalid rules (never guessed)", () => {
    expect(normalizeAchievementCriteria({ type: "be_awesome", threshold: 1 })).toBeNull();
    expect(normalizeAchievementCriteria({ type: "STREAK_DAYS", days: -1 })).toBeNull();
    expect(normalizeAchievementCriteria(null)).toBeNull();
    expect(normalizeAchievementCriteria("streak_days")).toBeNull();
  });

  it("evaluates rules against metrics", () => {
    expect(achievementMet({ type: "STREAK_DAYS", days: 7 }, METRICS)).toBe(true);
    expect(achievementMet({ type: "STREAK_DAYS", days: 30 }, METRICS)).toBe(false);
    expect(achievementMet({ type: "QUESTIONS_ANSWERED", count: 100 }, METRICS)).toBe(true);
    expect(achievementMet({ type: "TOPICS_MASTERED", count: 3, subjectId: "s1" }, METRICS)).toBe(true);
    expect(achievementMet({ type: "TOPICS_MASTERED", count: 1, subjectId: "s2" }, METRICS)).toBe(false);
    expect(achievementMet({ type: "MOCK_SCORE_AT_LEAST", percent: 70 }, METRICS)).toBe(false);
    expect(achievementMet({ type: "MOCK_SCORE_AT_LEAST", percent: 60 }, { ...METRICS, bestMockPercent: null })).toBe(false);
    expect(achievementMet({ type: "STUDY_HOURS", hours: 5 }, METRICS)).toBe(true);
    expect(achievementMet({ type: "DIAGNOSTIC_COMPLETED", count: 1 }, METRICS)).toBe(true);
    expect(achievementMet({ type: "DAYS_TO_EXAM", days: 100 }, METRICS)).toBe(true);
    expect(achievementMet({ type: "DAYS_TO_EXAM", days: 100 }, { ...METRICS, daysToExam: null })).toBe(false);
    expect(achievementMet({ type: "WEEKLY_GOALS_MET", count: 3 }, METRICS)).toBe(false);
    expect(achievementMet({ type: "FLASHCARDS_REVIEWED", count: 40 }, METRICS)).toBe(true);
  });
});

describe("XP amounts", () => {
  it("has flat defaults only for flat reasons", () => {
    expect(defaultXpFor("MOCK_EXAM_COMPLETED")).toBe(DEFAULT_XP_RULES.mockExamCompleted);
    expect(defaultXpFor("DAILY_GOAL_MET")).toBe(DEFAULT_XP_RULES.dailyGoalMet);
    expect(defaultXpFor("WEEKLY_GOAL_MET", resolveXpRules({ weeklyGoalMet: 99 }))).toBe(99);
    expect(defaultXpFor("PRACTICE_COMPLETED")).toBeNull();
    expect(defaultXpFor("ADJUSTMENT")).toBeNull();
  });

  it("rewards effort per answer and a flat amount per mock", () => {
    const answers = [
      { result: "CORRECT" as const, difficulty: 3 },
      { result: "INCORRECT" as const, difficulty: 3 },
      { result: "PARTIAL" as const, difficulty: 5 },
    ];
    // 1 + 4, 1, 1 + floor(8 × 0.5)
    expect(attemptXp("OTHER", answers)).toBe(5 + 1 + 5);
    expect(attemptXp("MOCK_EXAM", answers)).toBe(DEFAULT_XP_RULES.mockExamCompleted);
    expect(attemptXp("OTHER", [])).toBe(0);
    expect(attemptXp("MOCK_EXAM", [])).toBe(0);
  });
});

describe("streak state from LearnerStats", () => {
  const stats = {
    currentStreak: 4,
    longestStreak: 9,
    lastStreakDate: new Date("2026-10-04T00:00:00Z"),
    streakFreezesAvailable: 1,
    weekStartDate: new Date("2026-09-28T00:00:00Z"),
    weekGoalMet: true,
  };

  it("maps DATE columns without time-zone shifts", () => {
    const state = streakStateFromStats(stats, { freezeUsedOn: null, weekKey: "2026-W40", weekDaysMet: 3 });
    expect(state).toEqual({
      currentStreak: 4,
      longestStreak: 9,
      lastActiveDate: "2026-10-04",
      freezesAvailable: 1,
      freezeUsedOn: null,
      weekKey: "2026-W40",
      weekDaysMet: 3,
      lastFreezeEarnedWeek: "2026-W40",
    });
  });

  it("shows a live streak only while it can still continue", () => {
    expect(displayedStreak(stats, "2026-10-05")).toBe(4);
    expect(displayedStreak(stats, "2026-10-06")).toBe(4); // one missed day, a freeze can bridge it
    expect(displayedStreak({ ...stats, streakFreezesAvailable: 0 }, "2026-10-06")).toBe(0);
    expect(displayedStreak(null, "2026-10-05")).toBe(0);
  });
});
