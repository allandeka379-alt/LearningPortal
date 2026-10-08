import { describe, expect, it } from "vitest";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import { includedLines, summariseEntitlements } from "./entitlement-summary";

/** A line with AI features switched on (the AI lines exist only then). */
function line(e: Entitlements, key: string) {
  return summariseEntitlements(e, { ai: true }).find((candidate) => candidate.key === key);
}

describe("summariseEntitlements", () => {
  it("describes the free document honestly: previews included, paid features listed as not included", () => {
    const lines = summariseEntitlements(NO_ENTITLEMENTS);
    expect(line(NO_ENTITLEMENTS, "lessons")).toEqual({ key: "lessons", label: "Free preview lessons", included: true });
    expect(line(NO_ENTITLEMENTS, "mocks")).toEqual({ key: "mocks", label: "Mock exams", included: false });
    expect(line(NO_ENTITLEMENTS, "aiTutor")?.included).toBe(false);
    expect(lines.filter((candidate) => candidate.included).map((candidate) => candidate.key)).toEqual(["lessons"]);
  });

  it("words limits from the document (unlimited, N a day / week / month)", () => {
    const paid: Entitlements = {
      ...NO_ENTITLEMENTS,
      lessonAccess: "ALL",
      practiceQuestionsPerDay: null,
      topicTestsPerWeek: 3,
      mockExams: true,
      mockExamsPerMonth: 2,
      aiTutor: true,
      aiMessagesPerDay: 30,
      aiMaxModelTier: "DEEP",
    };
    expect(line(paid, "lessons")?.label).toBe("Full lessons for every topic");
    expect(line(paid, "practice")?.label).toBe("Unlimited practice questions");
    expect(line(paid, "topicTests")?.label).toBe("3 topic tests a week");
    expect(line(paid, "mocks")?.label).toBe("2 mock exams a month");
    expect(line(paid, "aiTutor")?.label).toBe("AI tutor, 30 messages a day");
    expect(line(paid, "aiDeep")?.included).toBe(true);
    expect(line({ ...paid, mockExamsPerMonth: null }, "mocks")?.label).toBe("Unlimited mock exams");
    expect(line({ ...paid, practiceQuestionsPerDay: 1 }, "practice")?.label).toBe("Up to 1 practice question a day");
  });

  it("leaves every AI line out unless AI features are switched on (owner decision 2026-10-07)", () => {
    const paid: Entitlements = { ...NO_ENTITLEMENTS, aiTutor: true, aiMessagesPerDay: null, aiSolverPerDay: 5, aiImageUploads: true, aiMaxModelTier: "DEEP" };
    const AI_KEYS = ["aiTutor", "aiSolver", "aiImages", "aiDeep"];
    for (const lines of [summariseEntitlements(paid), summariseEntitlements(paid, { ai: false }), includedLines(paid)]) {
      expect(lines.map((candidate) => candidate.key).filter((key) => AI_KEYS.includes(key))).toEqual([]);
      expect(lines.some((candidate) => /AI/.test(candidate.label))).toBe(false);
    }
    expect(includedLines(paid, { ai: true }).map((candidate) => candidate.key)).toEqual(expect.arrayContaining(AI_KEYS));
  });

  it("lists only enforced features: never PDF export or personalised learning (UNBUILT_FEATURES)", () => {
    const everything: Entitlements = { ...NO_ENTITLEMENTS, pdfExport: true, personalisedLearning: true, advancedAnalytics: true, parentReports: true };
    const keys = summariseEntitlements(everything).map((candidate) => candidate.key);
    expect(keys).not.toContain("pdf");
    expect(keys).not.toContain("personalised");
    expect(includedLines(everything).map((candidate) => candidate.key)).toEqual(["lessons", "analytics", "parentReports"]);
  });

  it("never lists school-only capabilities as student features", () => {
    const school: Entitlements = { ...NO_ENTITLEMENTS, teacherDashboard: true, assignments: true, schoolAnalytics: true, studentManagement: true };
    expect(includedLines(school).map((candidate) => candidate.key)).toEqual(["lessons"]);
  });
});
