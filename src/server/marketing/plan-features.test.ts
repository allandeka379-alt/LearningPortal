import { describe, expect, it } from "vitest";
import { entitlementsSchema, NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import {
  advertisedGroups,
  buildComparison,
  comparisonKeys,
  featureCell,
  isAdvertisedFeature,
  keyFeatures,
  PLAN_FEATURE_COPY,
  UNBUILT_FEATURES,
} from "./plan-features";

const FREE: Entitlements = {
  ...NO_ENTITLEMENTS,
  dailyQuestion: true,
  diagnosticTest: true,
  practiceQuestionsPerDay: 20,
  aiTutor: true,
  aiMessagesPerDay: 3,
  aiSolverPerDay: 1,
  examCountdown: true,
};

const STUDENT: Entitlements = {
  ...FREE,
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  mockExams: true,
  mockExamsPerMonth: null,
  flashcards: true,
  studyPlan: true,
  aiMessagesPerDay: 30,
  aiMaxModelTier: "STANDARD",
};

describe("PLAN_FEATURE_COPY", () => {
  it("describes every entitlement key of the contract (and nothing else)", () => {
    expect(Object.keys(PLAN_FEATURE_COPY).sort()).toEqual(Object.keys(entitlementsSchema.shape).sort());
  });

  it("folds flags only into limit rows that exist", () => {
    for (const [key, copy] of Object.entries(PLAN_FEATURE_COPY)) {
      if (copy.kind === "flag" && copy.foldedInto) expect(PLAN_FEATURE_COPY[copy.foldedInto].kind, key).toBe("limit");
    }
    expect(comparisonKeys()).not.toContain("mockExams");
    expect(comparisonKeys()).not.toContain("aiTutor");
  });
});

describe("featureCell", () => {
  it("words flags, limits and choices for buyers", () => {
    expect(featureCell("dailyQuestion", FREE)).toEqual({ included: true, text: "Included" });
    expect(featureCell("flashcards", FREE)).toEqual({ included: false, text: "Not included" });
    expect(featureCell("practiceQuestionsPerDay", FREE)).toEqual({ included: true, text: "20 a day" });
    expect(featureCell("practiceQuestionsPerDay", STUDENT)).toEqual({ included: true, text: "Unlimited" });
    expect(featureCell("lessonAccess", FREE)).toEqual({ included: true, text: "Free lessons" });
    expect(featureCell("lessonAccess", STUDENT)).toEqual({ included: true, text: "Every lesson" });
  });

  it("treats a limit as not included when its flag is off or the limit is 0", () => {
    expect(featureCell("mockExamsPerMonth", { ...STUDENT, mockExams: false })).toEqual({ included: false, text: "Not included" });
    expect(featureCell("mockExamsPerMonth", { ...STUDENT, mockExamsPerMonth: 4 })).toEqual({ included: true, text: "4 a month" });
    expect(featureCell("aiMessagesPerDay", { ...FREE, aiTutor: false })).toEqual({ included: false, text: "Not included" });
    expect(featureCell("topicTestsPerWeek", FREE)).toEqual({ included: false, text: "Not included" });
  });

  it("shows the AI level only when the plan has some AI", () => {
    expect(featureCell("aiMaxModelTier", STUDENT).text).toBe("Standard");
    expect(featureCell("aiMaxModelTier", NO_ENTITLEMENTS).included).toBe(false);
  });
});

describe("buildComparison", () => {
  it("builds grouped rows with one cell per plan, dropping features no plan has", () => {
    const groups = buildComparison([{ entitlements: FREE }, { entitlements: STUDENT }]);
    const names = groups.map((g) => g.group);
    expect(names).toEqual(["Learning", "Tests and exams", "Study tools", "AI help"]);
    const learning = groups.find((g) => g.group === "Learning");
    expect(learning?.rows.map((r) => r.label)).toEqual(["Lessons", "Practice questions", "Daily question"]);
    const mock = groups.flatMap((g) => g.rows).find((r) => r.key === "mockExamsPerMonth");
    expect(mock?.cells).toEqual([
      { included: false, text: "Not included" },
      { included: true, text: "Unlimited" },
    ]);
    expect(groups.flatMap((g) => g.rows).some((r) => r.key === "teacherDashboard")).toBe(false);
  });

  it("restricts to the requested groups and handles no plans", () => {
    const school = { ...STUDENT, teacherDashboard: true, assignments: true };
    expect(buildComparison([{ entitlements: school }], { groups: ["For schools"] }).map((g) => g.rows.map((r) => r.key))).toEqual([
      ["teacherDashboard", "assignments"],
    ]);
    expect(buildComparison([])).toEqual([]);
  });
});

describe("AI features switched off (features.ai, owner decision 2026-10-07)", () => {
  const withAi: Entitlements = { ...NO_ENTITLEMENTS, lessonAccess: "ALL", aiTutor: true, aiMessagesPerDay: 30, aiSolverPerDay: null, aiImageUploads: true, aiMaxModelTier: "DEEP" };

  it("drops the AI help group from what is advertised, keeping the order of the rest", () => {
    expect(advertisedGroups(false)).toEqual(["Learning", "Tests and exams", "Study tools", "Reports", "For schools"]);
    expect(advertisedGroups(true)).toContain("AI help");
    expect(advertisedGroups(false, ["For schools", "Learning", "AI help"])).toEqual(["For schools", "Learning"]);
  });

  it("leaves AI out of comparisons and key features while off (the entitlements stay in the plan)", () => {
    const off = buildComparison([{ entitlements: withAi }], { groups: advertisedGroups(false) });
    expect(off.map((group) => group.group)).not.toContain("AI help");
    expect(keyFeatures(withAi, { max: 20, groups: advertisedGroups(false) }).join(" | ")).not.toMatch(/AI|tutor|solver|photograph/i);
    expect(buildComparison([{ entitlements: withAi }], { groups: advertisedGroups(true) }).map((group) => group.group)).toContain("AI help");
  });
});

describe("advertised features (§31, §50: list only what is enforced)", () => {
  // Every boolean flag on: what a maximal plan would advertise.
  const EVERYTHING: Entitlements = Object.fromEntries(
    Object.entries(NO_ENTITLEMENTS).map(([key, value]) => [key, typeof value === "boolean" ? true : value]),
  ) as Entitlements;

  it("names exactly the unbuilt keys and keeps them in the contract", () => {
    expect(Object.keys(UNBUILT_FEATURES).sort()).toEqual(["pdfExport", "personalisedLearning"]);
    for (const key of Object.keys(UNBUILT_FEATURES)) {
      expect(Object.keys(entitlementsSchema.shape)).toContain(key);
      expect(isAdvertisedFeature(key)).toBe(false);
    }
    expect(isAdvertisedFeature("advancedAnalytics")).toBe(true);
    expect(isAdvertisedFeature("parentReports")).toBe(true);
    expect(isAdvertisedFeature("notAKey")).toBe(false);
  });

  it("never puts an unbuilt feature in the comparison, plan cards or teasers", () => {
    const rows = buildComparison([{ entitlements: EVERYTHING }]).flatMap((group) => group.rows.map((row) => row.key));
    expect(rows).not.toContain("pdfExport");
    expect(rows).not.toContain("personalisedLearning");
    expect(rows).toEqual(expect.arrayContaining(["advancedAnalytics", "parentReports"]));
    const cards = keyFeatures(EVERYTHING, { max: 100 });
    expect(cards).not.toContain(PLAN_FEATURE_COPY.pdfExport.label);
    expect(cards).not.toContain(PLAN_FEATURE_COPY.personalisedLearning.label);
    expect(cards).toEqual(expect.arrayContaining(["Detailed progress analytics", "Detailed progress reports for parents"]));
    expect(comparisonKeys().every((key) => isAdvertisedFeature(key))).toBe(true);
  });
});

describe("keyFeatures", () => {
  it("lists what a plan includes in display order, capped", () => {
    expect(keyFeatures(STUDENT, { max: 4 })).toEqual(["Every lesson", "Practice questions: unlimited", "Daily question", "Diagnostic test"]);
    expect(keyFeatures(FREE, { groups: ["AI help"] })).toEqual(["AI tutor messages: 3 a day", "AI question solver: 1 a day", "AI reasoning level: fast"]);
    expect(keyFeatures(NO_ENTITLEMENTS)).toEqual(["Free lessons"]);
    const school = { ...STUDENT, teacherDashboard: true, assignments: true };
    expect(keyFeatures(school, { max: 3, groups: ["For schools", "Learning"] })).toEqual(["Teacher dashboard", "Assignments", "Every lesson"]);
  });
});
