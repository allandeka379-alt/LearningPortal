import { describe, expect, it } from "vitest";
import { DEFAULT_LEVEL_CURVE, DEFAULT_XP_RULES, levelForXp, resolveXpRules, totalXp, xpFor, xpRequiredForLevel } from "./xp";

describe("xpFor with default rules", () => {
  it("rewards answering, more for correct answers on harder questions", () => {
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "INCORRECT", difficulty: 5 })).toBe(1);
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 1 })).toBe(3);
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 3 })).toBe(5);
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 5 })).toBe(9);
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "PARTIAL", difficulty: 5 })).toBe(5); // 1 + floor(8 × 0.5)
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "PARTIAL", difficulty: 2 })).toBe(2); // 1 + floor(1.5)
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 9 })).toBe(9); // clamped to 5
  });

  it("awards flat amounts for study milestones", () => {
    expect(xpFor({ type: "LESSON_COMPLETED" })).toBe(10);
    expect(xpFor({ type: "MOCK_EXAM_COMPLETED" })).toBe(50);
    expect(xpFor({ type: "DAILY_GOAL_MET" })).toBe(10);
    expect(xpFor({ type: "WEEKLY_GOAL_MET" })).toBe(30);
  });

  it("requires a real flashcard session", () => {
    expect(xpFor({ type: "FLASHCARD_SESSION", cardsReviewed: 9 })).toBe(0);
    expect(xpFor({ type: "FLASHCARD_SESSION", cardsReviewed: 10 })).toBe(5);
    expect(xpFor({ type: "FLASHCARD_SESSION", cardsReviewed: Number.NaN })).toBe(0);
  });

  it("only listed streak milestones earn XP", () => {
    expect(xpFor({ type: "STREAK_MILESTONE", days: 7 })).toBe(25);
    expect(xpFor({ type: "STREAK_MILESTONE", days: 30 })).toBe(75);
    expect(xpFor({ type: "STREAK_MILESTONE", days: 8 })).toBe(0);
    expect(xpFor({ type: "STREAK_MILESTONE", days: 7.5 })).toBe(0);
  });

  it("sums event lists", () => {
    expect(totalXp([{ type: "LESSON_COMPLETED" }, { type: "DAILY_GOAL_MET" }, { type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 4 }])).toBe(27);
    expect(totalXp([])).toBe(0);
  });

  it("exposes frozen defaults", () => {
    expect(Object.isFrozen(DEFAULT_XP_RULES)).toBe(true);
    expect(Object.isFrozen(DEFAULT_XP_RULES.correctAnswerByDifficulty)).toBe(true);
  });
});

describe("resolveXpRules (settings overrides)", () => {
  it("merges nested overrides key by key", () => {
    const rules = resolveXpRules({ lessonCompleted: 15, correctAnswerByDifficulty: { 5: 12 }, streakMilestones: { "14": 40 } });
    expect(rules.lessonCompleted).toBe(15);
    expect(rules.correctAnswerByDifficulty).toEqual({ 1: 2, 2: 3, 3: 4, 4: 6, 5: 12 });
    expect(xpFor({ type: "STREAK_MILESTONE", days: 14 }, rules)).toBe(40);
    expect(xpFor({ type: "STREAK_MILESTONE", days: 7 }, rules)).toBe(0); // replaced, not merged
    expect(xpFor({ type: "QUESTION_ANSWERED", result: "CORRECT", difficulty: 5 }, rules)).toBe(13);
  });

  it("returns the defaults when nothing is overridden", () => {
    expect(resolveXpRules()).toEqual(DEFAULT_XP_RULES);
  });

  it("rejects invalid configuration", () => {
    expect(() => resolveXpRules({ lessonCompleted: -5 })).toThrow(RangeError);
    expect(() => resolveXpRules({ dailyGoalMet: 2.5 })).toThrow(RangeError);
    expect(() => resolveXpRules({ correctAnswerByDifficulty: { 3: Number.NaN } })).toThrow(RangeError);
    expect(() => resolveXpRules({ streakMilestones: { week: 10 } })).toThrow(RangeError);
    expect(() => resolveXpRules({ partialCreditFraction: 1.5 })).toThrow(RangeError);
  });
});

describe("levels", () => {
  it("uses a gentle arithmetic curve", () => {
    expect(xpRequiredForLevel(1)).toBe(0);
    expect(xpRequiredForLevel(2)).toBe(100);
    expect(xpRequiredForLevel(3)).toBe(250);
    expect(xpRequiredForLevel(4)).toBe(450);
    expect(xpRequiredForLevel(10)).toBe(2700);
    expect(() => xpRequiredForLevel(0)).toThrow(RangeError);
  });

  it("maps XP to level and progress at the boundaries", () => {
    expect(levelForXp(0)).toEqual({ level: 1, xpIntoLevel: 0, xpForNextLevel: 100, xpToNextLevel: 100, progress: 0 });
    expect(levelForXp(99).level).toBe(1);
    expect(levelForXp(100)).toEqual({ level: 2, xpIntoLevel: 0, xpForNextLevel: 150, xpToNextLevel: 150, progress: 0 });
    expect(levelForXp(249)).toMatchObject({ level: 2, xpIntoLevel: 149, xpToNextLevel: 1, progress: 0.993 });
    expect(levelForXp(2700).level).toBe(10);
  });

  it("is consistent with xpRequiredForLevel across a wide range", () => {
    for (let level = 1; level <= 200; level++) {
      const required = xpRequiredForLevel(level);
      expect(levelForXp(required).level).toBe(level);
      if (required > 0) expect(levelForXp(required - 1).level).toBe(level - 1);
    }
  });

  it("treats invalid XP as zero and supports custom curves", () => {
    expect(levelForXp(-50).level).toBe(1);
    expect(levelForXp(Number.NaN).level).toBe(1);
    expect(levelForXp(1000, { firstLevelXp: 100, increment: 0 }).level).toBe(11);
    expect(() => levelForXp(10, { ...DEFAULT_LEVEL_CURVE, firstLevelXp: 0 })).toThrow(RangeError);
  });
});
