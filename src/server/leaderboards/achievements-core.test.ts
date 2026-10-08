import { describe, expect, it } from "vitest";
import { criteriaProgress, criteriaText, percentOf, weeklyMinutesTarget, type AchievementProgressFacts } from "./achievements-core";

const facts: AchievementProgressFacts = {
  longestStreak: 4,
  questionsAnswered: 1250,
  mocksCompleted: 1,
  weeklyGoalsMet: 2,
  studySeconds: 5 * 3600 + 1800,
  flashcardsReviewed: 30,
  topicsMastered: 3,
  topicsMasteredBySubject: new Map([["maths", 2]]),
  bestMockPercent: 64.5,
  diagnosticsCompleted: 0,
};

describe("criteriaText", () => {
  it("describes every rule in plain words", () => {
    expect(criteriaText({ type: "STREAK_DAYS", days: 7 })).toBe("Meet your daily goal 7 days in a row.");
    expect(criteriaText({ type: "QUESTIONS_ANSWERED", count: 1000 })).toBe("Answer 1,000 questions.");
    expect(criteriaText({ type: "TOPICS_MASTERED", count: 1 })).toBe("Reach Mastered on 1 topic.");
    expect(criteriaText({ type: "TOPICS_MASTERED", count: 5, subjectId: "maths" }, "Mathematics")).toBe("Reach Mastered on 5 topics in Mathematics.");
    expect(criteriaText({ type: "TOPICS_MASTERED", count: 5, subjectId: "maths" })).toBe("Reach Mastered on 5 topics in one subject.");
    expect(criteriaText({ type: "MOCKS_COMPLETED", count: 1 })).toBe("Complete 1 mock exam.");
    expect(criteriaText({ type: "MOCK_SCORE_AT_LEAST", percent: 75 })).toBe("Score at least 75% in a mock exam.");
    expect(criteriaText({ type: "WEEKLY_GOALS_MET", count: 1 })).toBe("Meet your weekly goal once.");
    expect(criteriaText({ type: "WEEKLY_GOALS_MET", count: 4 })).toBe("Meet your weekly goal 4 times.");
    expect(criteriaText({ type: "STUDY_HOURS", hours: 10 })).toBe("Study for 10 hours in total.");
    expect(criteriaText({ type: "FLASHCARDS_REVIEWED", count: 500 })).toBe("Review 500 flashcards.");
    expect(criteriaText({ type: "DIAGNOSTIC_COMPLETED", count: 1 })).toBe("Complete a diagnostic test.");
    expect(criteriaText({ type: "DIAGNOSTIC_COMPLETED", count: 3 })).toBe("Complete 3 diagnostic tests.");
    expect(criteriaText({ type: "DAYS_TO_EXAM", days: 30 })).toBe("Keep studying when your exam is 30 days away or less.");
  });
});

describe("criteriaProgress", () => {
  it("measures progress from real counters and caps it at the target", () => {
    expect(criteriaProgress({ type: "STREAK_DAYS", days: 7 }, facts)).toEqual({ current: 4, target: 7, unit: "days" });
    expect(criteriaProgress({ type: "QUESTIONS_ANSWERED", count: 1000 }, facts)).toEqual({ current: 1000, target: 1000, unit: "questions" });
    expect(criteriaProgress({ type: "TOPICS_MASTERED", count: 5, subjectId: "maths" }, facts)?.current).toBe(2);
    expect(criteriaProgress({ type: "TOPICS_MASTERED", count: 5, subjectId: "physics" }, facts)?.current).toBe(0);
    expect(criteriaProgress({ type: "TOPICS_MASTERED", count: 10 }, facts)?.current).toBe(3);
    expect(criteriaProgress({ type: "MOCK_SCORE_AT_LEAST", percent: 80 }, facts)).toEqual({ current: 64, target: 80, unit: "%" });
    expect(criteriaProgress({ type: "MOCK_SCORE_AT_LEAST", percent: 80 }, { ...facts, bestMockPercent: null })?.current).toBe(0);
    expect(criteriaProgress({ type: "STUDY_HOURS", hours: 10 }, facts)).toEqual({ current: 5, target: 10, unit: "hours" });
    expect(criteriaProgress({ type: "DIAGNOSTIC_COMPLETED", count: 1 }, facts)?.current).toBe(0);
    expect(criteriaProgress({ type: "DAYS_TO_EXAM", days: 30 }, facts)).toBeNull();
  });
});

describe("weekly goal", () => {
  it("uses the student's own target, then their daily goal, then the platform default", () => {
    expect(weeklyMinutesTarget({ goalMinutes: 300, dailyGoalMinutes: 30, defaultDailyMinutes: 45, weeklyGoalDays: 5 })).toEqual({ minutes: 300, source: "CUSTOM" });
    expect(weeklyMinutesTarget({ goalMinutes: null, dailyGoalMinutes: 30, defaultDailyMinutes: 45, weeklyGoalDays: 5 })).toEqual({ minutes: 150, source: "DAILY_GOAL" });
    expect(weeklyMinutesTarget({ goalMinutes: null, dailyGoalMinutes: null, defaultDailyMinutes: 45, weeklyGoalDays: 5 })).toEqual({ minutes: 225, source: "DEFAULT" });
  });

  it("reports whole, capped percentages", () => {
    expect(percentOf(90, 225)).toBe(40);
    expect(percentOf(500, 225)).toBe(100);
    expect(percentOf(5, 0)).toBe(100);
    expect(percentOf(-5, 10)).toBe(0);
  });
});
