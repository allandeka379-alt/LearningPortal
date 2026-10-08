import { describe, expect, it } from "vitest";
import {
  NO_ENTITLEMENTS,
  mergeEntitlements,
  parseEntitlements,
  remainingAllowance,
  tierAllowed,
  type Entitlements,
} from "./entitlements";

const free: Entitlements = {
  ...NO_ENTITLEMENTS,
  practiceQuestionsPerDay: 15,
  dailyQuestion: true,
  diagnosticTest: true,
  aiTutor: true,
  aiMessagesPerDay: 3,
  examCountdown: true,
};

const student: Entitlements = {
  ...free,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  mockExams: true,
  mockExamsPerMonth: 4,
  aiMessagesPerDay: 30,
  aiMaxModelTier: "STANDARD",
};

describe("mergeEntitlements", () => {
  it("returns NO_ENTITLEMENTS when given nothing", () => {
    expect(mergeEntitlements()).toEqual(NO_ENTITLEMENTS);
  });

  it("takes the most generous value per key", () => {
    const merged = mergeEntitlements(free, student);
    expect(merged.lessonAccess).toBe("ALL");
    expect(merged.practiceQuestionsPerDay).toBeNull(); // unlimited wins
    expect(merged.aiMessagesPerDay).toBe(30);
    expect(merged.aiMaxModelTier).toBe("STANDARD");
    expect(merged.mockExams).toBe(true);
    expect(merged.dailyQuestion).toBe(true);
  });

  it("is order independent", () => {
    expect(mergeEntitlements(student, free)).toEqual(mergeEntitlements(free, student));
  });
});

describe("parseEntitlements", () => {
  it("fails closed for missing keys", () => {
    const parsed = parseEntitlements({ aiTutor: true });
    expect(parsed.aiTutor).toBe(true);
    expect(parsed.mockExams).toBe(false);
    expect(parsed.practiceQuestionsPerDay).toBe(0);
  });

  it("rejects invalid values", () => {
    expect(() => parseEntitlements({ practiceQuestionsPerDay: -1 })).toThrow();
    expect(() => parseEntitlements({ aiMaxModelTier: "ULTRA" })).toThrow();
  });

  it("treats non-objects as empty", () => {
    expect(parseEntitlements(null)).toEqual(NO_ENTITLEMENTS);
  });
});

describe("helpers", () => {
  it("remainingAllowance", () => {
    expect(remainingAllowance(null, 999)).toBeNull();
    expect(remainingAllowance(5, 3)).toBe(2);
    expect(remainingAllowance(5, 9)).toBe(0);
  });

  it("tierAllowed", () => {
    expect(tierAllowed("STANDARD", "FAST")).toBe(true);
    expect(tierAllowed("STANDARD", "DEEP")).toBe(false);
    expect(tierAllowed("DEEP", "DEEP")).toBe(true);
  });
});
