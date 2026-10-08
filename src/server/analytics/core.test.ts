import { describe, expect, it } from "vitest";
import {
  childOverviewSections,
  combineRetention,
  dailySeries,
  dateRangeSchema,
  evaluatePass,
  instantWindow,
  meanOf,
  PARENT_REPORT_SECTIONS,
  passRate,
  passThresholdPercent,
  percent,
  rangeDays,
  rankDifficultTopics,
  ratio,
  retentionRate,
  roundOrNull,
  schoolPassMark,
  summariseAssessments,
  trailingRange,
  weightedMean,
  type GradeBandLike,
} from "./core";

describe("ratios and averages", () => {
  it("returns null instead of dividing by zero", () => {
    expect(ratio(3, 4)).toBe(0.75);
    expect(ratio(0, 5)).toBe(0);
    expect(ratio(3, 0)).toBeNull();
    expect(ratio(3, -1)).toBeNull();
    expect(ratio(Number.NaN, 2)).toBeNull();
    expect(percent(1, 3)).toBe(33.3);
    expect(percent(2, 3)).toBe(66.7);
    expect(percent(1, 8, 2)).toBe(12.5);
    expect(percent(0, 0)).toBeNull();
    expect(roundOrNull(64.1666)).toBe(64.2);
    expect(roundOrNull(null)).toBeNull();
    expect(roundOrNull(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("combines pre-aggregated means exactly by weight", () => {
    expect(weightedMean([{ mean: 70, weight: 2 }, { mean: 50, weight: 3 }])).toBe(58);
    expect(weightedMean([{ mean: 70, weight: 2 }, { mean: null, weight: 0 }, { mean: 90, weight: 0 }])).toBe(70);
    expect(weightedMean([])).toBeNull();
    expect(weightedMean([{ mean: null, weight: 4 }])).toBeNull();
    expect(meanOf([80, null, 50, undefined])).toBe(65);
    expect(meanOf([null])).toBeNull();
  });
});

describe("retention", () => {
  it("is retained / cohort, null for an empty cohort", () => {
    expect(retentionRate({ cohort: 4, retained: 1 })).toBe(0.25);
    expect(retentionRate({ cohort: 1, retained: 0 })).toBe(0);
    expect(retentionRate({ cohort: 0, retained: 0 })).toBeNull();
  });

  it("refuses impossible counts instead of publishing > 100%", () => {
    expect(() => retentionRate({ cohort: 2, retained: 3 })).toThrow(RangeError);
    expect(() => retentionRate({ cohort: -1, retained: 0 })).toThrow(RangeError);
    expect(() => retentionRate({ cohort: 2.5, retained: 1 })).toThrow(RangeError);
  });

  it("combines daily samples by summing cohorts (not averaging rates)", () => {
    // 1/4 and 3/6 average to 37.5%, but the true combined rate is 4/10.
    expect(combineRetention([{ cohort: 4, retained: 1 }, { cohort: 6, retained: 3 }])).toEqual({ cohort: 10, retained: 4, rate: 0.4 });
    expect(combineRetention([])).toEqual({ cohort: 0, retained: 0, rate: null });
  });
});

describe("summariseAssessments", () => {
  it("averages scored test modes, tracks mocks separately and ignores practice", () => {
    const summary = summariseAssessments([
      { subjectId: "s1", mode: "MOCK_EXAM", completed: 3, scored: 2, percentSum: 140 },
      { subjectId: "s1", mode: "SUBJECT_TEST", completed: 1, scored: 1, percentSum: 50 },
      { subjectId: "s2", mode: "QUIZ", completed: 2, scored: 0, percentSum: 0 },
      { subjectId: "s2", mode: "PRACTICE", completed: 9, scored: 9, percentSum: 900 },
    ]);
    expect(summary.overall.scored).toBe(3);
    expect(summary.overall.avgPct).toBeCloseTo(190 / 3, 10);
    expect(summary.bySubject).toEqual([{ subjectId: "s1", scored: 3, avgPct: 190 / 3 }]);
    expect(summary.mock).toEqual({ completed: 3, scored: 2, avgPct: 70 });
  });

  it("reports null averages when nothing was scored", () => {
    const summary = summariseAssessments([{ subjectId: "s1", mode: "MOCK_EXAM", completed: 1, scored: 0, percentSum: 0 }]);
    expect(summary.overall).toEqual({ scored: 0, avgPct: null });
    expect(summary.mock).toEqual({ completed: 1, scored: 0, avgPct: null });
    expect(summary.bySubject).toEqual([]);
  });
});

describe("rankDifficultTopics", () => {
  const rows = [
    { topicId: "a", attempted: 40, correct: 10 },
    { topicId: "b", attempted: 20, correct: 20 },
    { topicId: "c", attempted: 2, correct: 0 },
    { topicId: "d", attempted: 80, correct: 20 },
  ];

  it("ranks lowest correct rate first, only above the attempt threshold", () => {
    expect(rankDifficultTopics(rows, { minAttempts: 5 }).map((t) => [t.topicId, t.correctRate])).toEqual([
      ["d", 0.25], // same rate as "a" but more evidence
      ["a", 0.25],
      ["b", 1],
    ]);
    expect(rankDifficultTopics(rows, { minAttempts: 5, limit: 1 }).map((t) => t.topicId)).toEqual(["d"]);
    expect(rankDifficultTopics(rows, { minAttempts: 0 }).map((t) => t.topicId)).toContain("c");
  });
});

describe("pass rate (estimate)", () => {
  const bands: GradeBandLike[] = [
    { label: "A", minPercent: 70, isPass: true },
    { label: "C", minPercent: 50, isPass: true },
    { label: "D", minPercent: 40, isPass: false },
    { label: "U", minPercent: 0, isPass: false },
  ];

  it("finds the lowest passing threshold", () => {
    expect(passThresholdPercent(bands)).toBe(50);
    expect(passThresholdPercent(bands.filter((b) => !b.isPass))).toBeNull();
    expect(passThresholdPercent([])).toBeNull();
  });

  it("prefers the school pass mark, then the grade frozen at marking, then the current scheme", () => {
    expect(evaluatePass({ percentage: 45, gradeIsPass: false }, { passMarkPercent: 40 })).toEqual({ pass: true, basis: "SCHOOL_PASS_MARK" });
    expect(evaluatePass({ percentage: null, gradeIsPass: true }, { passMarkPercent: 40 })).toEqual({ pass: null, basis: null });
    expect(evaluatePass({ percentage: 45, gradeIsPass: true, schemeThresholdPercent: 50 })).toEqual({ pass: true, basis: "GRADE_AT_MARKING" });
    expect(evaluatePass({ percentage: 45, gradeIsPass: null, schemeThresholdPercent: 50 })).toEqual({ pass: false, basis: "GRADE_SCHEME" });
    expect(evaluatePass({ percentage: 50, gradeIsPass: null, schemeThresholdPercent: 50 })).toEqual({ pass: true, basis: "GRADE_SCHEME" });
    expect(evaluatePass({ percentage: 99, gradeIsPass: null })).toEqual({ pass: null, basis: null });
  });

  it("excludes unjudgeable results from the denominator and is always labelled an estimate", () => {
    const results = [
      { percentage: 40, gradeIsPass: false },
      { percentage: 55, gradeIsPass: null, schemeThresholdPercent: 50 },
      { percentage: 45, gradeIsPass: null, schemeThresholdPercent: 50 },
      { percentage: 75, gradeIsPass: true },
      { percentage: 99, gradeIsPass: null },
    ];
    expect(passRate(results)).toEqual({ assessed: 4, passed: 2, ratePercent: 50, unknown: 1, isEstimate: true });
    expect(passRate(results, { passMarkPercent: 40 })).toEqual({ assessed: 5, passed: 5, ratePercent: 100, unknown: 0, isEstimate: true });
    expect(passRate([])).toEqual({ assessed: 0, passed: 0, ratePercent: null, unknown: 0, isEstimate: true });
  });

  it("reads the school pass mark defensively", () => {
    expect(schoolPassMark({ version: 1, passMarkPercent: 45 })).toBe(45);
    expect(schoolPassMark({ version: 1 })).toBeNull();
    expect(schoolPassMark({ passMarkPercent: "50" })).toBeNull();
    expect(schoolPassMark({ passMarkPercent: 150 })).toBeNull();
    expect(schoolPassMark(null)).toBeNull();
  });
});

describe("dates and ranges", () => {
  it("validates inclusive ranges", () => {
    expect(dateRangeSchema.safeParse({ from: "2026-10-01", to: "2026-10-05" }).success).toBe(true);
    expect(dateRangeSchema.safeParse({ from: "2026-10-05", to: "2026-10-05" }).success).toBe(true);
    expect(dateRangeSchema.safeParse({ from: "2026-10-06", to: "2026-10-05" }).success).toBe(false);
    expect(dateRangeSchema.safeParse({ from: "2025-01-01", to: "2026-01-01" }).success).toBe(true); // 366 days
    expect(dateRangeSchema.safeParse({ from: "2025-01-01", to: "2026-01-02" }).success).toBe(false);
    expect(dateRangeSchema.safeParse({ from: "2026-02-30", to: "2026-03-01" }).success).toBe(false);
    expect(dateRangeSchema.safeParse({ from: "yesterday", to: "2026-03-01" }).success).toBe(false);
    expect(rangeDays({ from: "2026-09-30", to: "2026-10-02" })).toBe(3);
  });

  it("maps local days to a half-open instant window in the given time zone", () => {
    expect(instantWindow({ from: "2026-10-05", to: "2026-10-05" }, "Africa/Harare")).toEqual({
      start: new Date("2026-10-04T22:00:00.000Z"),
      end: new Date("2026-10-05T22:00:00.000Z"),
    });
    expect(instantWindow({ from: "2026-10-01", to: "2026-10-02" }, "UTC")).toEqual({
      start: new Date("2026-10-01T00:00:00.000Z"),
      end: new Date("2026-10-03T00:00:00.000Z"),
    });
  });

  it("builds trailing windows and gap-preserving daily series", () => {
    expect(trailingRange("2026-10-05", 7)).toEqual({ from: "2026-09-29", to: "2026-10-05" });
    expect(trailingRange("2026-10-05", 1)).toEqual({ from: "2026-10-05", to: "2026-10-05" });
    expect(() => trailingRange("2026-10-05", 0)).toThrow(RangeError);
    const series = dailySeries({ from: "2026-10-01", to: "2026-10-03" }, new Map([["2026-10-02", 5]]));
    expect(series).toEqual([
      { date: "2026-10-01", value: null },
      { date: "2026-10-02", value: 5 },
      { date: "2026-10-03", value: null },
    ]);
  });
});

describe("childOverviewSections (§21 sections × the child's parentReports, §31)", () => {
  const ALL = { canViewProgress: true, canViewStudyActivity: true, canViewTestResults: true };

  it("shows everything shared when the child's plan includes parent reports", () => {
    expect(childOverviewSections(ALL, true)).toEqual({
      visible: ["subjects", "examCountdown", "progress", "weakAreas", "studyTime", "activityCalendar", "testResults"],
      locked: [],
    });
  });

  it("keeps the basic overview without it and locks only the shared report sections", () => {
    expect(childOverviewSections(ALL, false)).toEqual({
      visible: ["subjects", "examCountdown", "studyTime"],
      locked: ["progress", "weakAreas", "activityCalendar", "testResults"],
    });
    expect(childOverviewSections({ canViewProgress: false, canViewStudyActivity: false, canViewTestResults: true }, false)).toEqual({
      visible: ["subjects", "examCountdown"],
      locked: ["testResults"],
    });
  });

  it("never reveals an unshared section, whatever the plan", () => {
    const none = { canViewProgress: false, canViewStudyActivity: false, canViewTestResults: false };
    expect(childOverviewSections(none, true)).toEqual({ visible: ["subjects", "examCountdown"], locked: [] });
    expect(childOverviewSections(none, false)).toEqual({ visible: ["subjects", "examCountdown"], locked: [] });
    expect([...PARENT_REPORT_SECTIONS]).toEqual(["progress", "weakAreas", "activityCalendar", "testResults"]);
  });
});
