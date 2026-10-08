import { describe, expect, it } from "vitest";
import type { MarkingStatus } from "@/generated/prisma/enums";
import type { Recommendation } from "@/server/adaptive/core";
import {
  buildAttemptAnalysis,
  computeAttemptTotals,
  countedPositions,
  foldMasteryChanges,
  isFinalMark,
  nextGradeInfo,
  scaleAwarded,
  scoringStatusOf,
  toAnalysisRecommendations,
  topicIdsInOrder,
  withAnalysisMastery,
  type ScoringSlot,
} from "./analysis";
import { readAttemptAnalysis } from "./policy";

let position = 0;
function slot(overrides: Partial<ScoringSlot> & { status?: MarkingStatus }): ScoringSlot {
  position += 1;
  const status = overrides.status ?? "AUTO_MARKED";
  const marksAvailable = overrides.marksAvailable ?? 1;
  const marksAwarded = overrides.marksAwarded === undefined ? (status === "PENDING" ? null : 0) : overrides.marksAwarded;
  return {
    position: overrides.position ?? position,
    questionId: overrides.questionId ?? `q${position}`,
    topicId: overrides.topicId ?? "t1",
    sectionNumber: overrides.sectionNumber ?? null,
    marksAvailable,
    marksAwarded,
    isCorrect: overrides.isCorrect ?? (marksAwarded === null ? null : marksAwarded === marksAvailable),
    markingStatus: status,
    answered: overrides.answered ?? status !== "UNANSWERED",
    timeSpentSeconds: overrides.timeSpentSeconds ?? 30,
  };
}

describe("status mapping", () => {
  it("maps stored marking statuses onto the scoring core", () => {
    expect(scoringStatusOf("AUTO_MARKED")).toBe("MARKED");
    expect(scoringStatusOf("AI_MARKED")).toBe("MARKED");
    expect(scoringStatusOf("TEACHER_MARKED")).toBe("MARKED");
    expect(scoringStatusOf("SELF_ASSESSED")).toBe("SELF_ASSESSED");
    expect(scoringStatusOf("PENDING")).toBe("PENDING");
    expect(isFinalMark("AUTO_MARKED")).toBe(true);
    expect(isFinalMark("NEEDS_REVIEW")).toBe(false);
    expect(isFinalMark("UNANSWERED")).toBe(false);
  });
});

describe("answer any N (§12)", () => {
  const sections = [{ sectionNumber: 1, answerCount: 2, maxMarks: 10 }];

  it("keeps the N best answers by default and the N first with policy FIRST", () => {
    const slots = [
      slot({ position: 1, sectionNumber: 1, marksAvailable: 5, marksAwarded: 1 }),
      slot({ position: 2, sectionNumber: 1, marksAvailable: 5, marksAwarded: 5 }),
      slot({ position: 3, sectionNumber: 1, marksAvailable: 5, marksAwarded: 3 }),
      slot({ position: 4, sectionNumber: null, marksAvailable: 2, marksAwarded: 2 }),
    ];
    expect([...countedPositions(slots, sections)].sort()).toEqual([2, 3, 4]);
    expect([...countedPositions(slots, sections, "FIRST")].sort()).toEqual([1, 2, 4]);
  });

  it("always counts answers waiting for AI marking (the database cannot exclude them)", () => {
    const slots = [
      slot({ position: 1, sectionNumber: 1, marksAvailable: 5, status: "PENDING", answered: true }),
      slot({ position: 2, sectionNumber: 1, marksAvailable: 5, marksAwarded: 5 }),
      slot({ position: 3, sectionNumber: 1, marksAvailable: 5, marksAwarded: 4 }),
    ];
    expect([...countedPositions(slots, sections)].sort()).toEqual([1, 2]);
  });

  it("contributes the section maximum to the total and caps counted marks", () => {
    const slots = [
      slot({ position: 1, sectionNumber: 1, marksAvailable: 6, marksAwarded: 6 }),
      slot({ position: 2, sectionNumber: 1, marksAvailable: 6, marksAwarded: 6 }),
      slot({ position: 3, sectionNumber: 1, marksAvailable: 6, marksAwarded: 0 }),
    ];
    const counted = countedPositions(slots, sections);
    const totals = computeAttemptTotals(slots, sections, counted, { practiceLike: false });
    expect(totals.totalMarks).toBe(10);
    expect(totals.marksAwarded).toBe(10);
    expect(totals.percentage).toBe(100);
    expect(totals.sectionMarks.get(1)).toBe(10);
  });
});

describe("totals", () => {
  it("scores exams over every question (unanswered = 0)", () => {
    const slots = [
      slot({ marksAvailable: 2, marksAwarded: 2 }),
      slot({ marksAvailable: 2, marksAwarded: 1 }),
      slot({ marksAvailable: 4, status: "UNANSWERED", marksAwarded: 0 }),
    ];
    const totals = computeAttemptTotals(slots, [], countedPositions(slots, []), { practiceLike: false });
    expect(totals).toMatchObject({ totalMarks: 8, marksAwarded: 3, percentage: 37.5, answeredCount: 2, correctCount: 1, unansweredCount: 1 });
    expect(totals.isProvisional).toBe(false);
  });

  it("scores practice over the answered questions only", () => {
    const slots = [slot({ marksAwarded: 1 }), slot({ marksAwarded: 0 }), slot({ status: "UNANSWERED", marksAwarded: 0 }), slot({ status: "UNANSWERED", marksAwarded: 0 })];
    const totals = computeAttemptTotals(slots, [], countedPositions(slots, []), { practiceLike: true });
    expect(totals.totalMarks).toBe(4);
    expect(totals.marksAwarded).toBe(1);
    expect(totals.percentage).toBe(50);
  });

  it("keeps pending AI answers out of the percentage and flags the score as provisional", () => {
    const slots = [slot({ marksAvailable: 2, marksAwarded: 2 }), slot({ marksAvailable: 8, status: "PENDING", answered: true })];
    const totals = computeAttemptTotals(slots, [], countedPositions(slots, []), { practiceLike: false });
    expect(totals.percentage).toBe(100);
    expect(totals.totalMarks).toBe(10);
    expect(totals.awaitingMarking).toBe(true);
    expect(totals.pendingReviewCount).toBe(1);
    expect(totals.isProvisional).toBe(true);
  });

  it("counts NEEDS_REVIEW as provisional but not awaiting AI", () => {
    const slots = [slot({ marksAvailable: 3, status: "NEEDS_REVIEW", marksAwarded: 1 })];
    const totals = computeAttemptTotals(slots, [], countedPositions(slots, []), { practiceLike: false });
    expect(totals.awaitingMarking).toBe(false);
    expect(totals.pendingReviewCount).toBe(1);
    expect(totals.marksAwarded).toBe(1);
  });
});

describe("helpers", () => {
  it("scales marks to an item override without over-awarding", () => {
    expect(scaleAwarded(2, 2, 4)).toBe(4);
    expect(scaleAwarded(1, 3, 2)).toBe(0);
    expect(scaleAwarded(2, 3, 2)).toBe(1);
    expect(scaleAwarded(5, 5, 5)).toBe(5);
    expect(scaleAwarded(1, 0, 2)).toBe(0);
  });

  it("finds the next grade band and the marks still needed", () => {
    const bands = [
      { grade: "A", minPercent: 80 },
      { grade: "B", minPercent: 65 },
      { grade: "C", minPercent: 50 },
    ];
    expect(nextGradeInfo(30, 50, 60, bands)).toEqual({ nextGrade: "B", marksToNextGrade: 3 });
    expect(nextGradeInfo(45, 50, 90, bands)).toEqual({});
    expect(nextGradeInfo(0, 0, null, bands)).toEqual({});
  });

  it("maps adaptive recommendations to the stored analysis shape", () => {
    const recs: Recommendation[] = [
      { kind: "STUDY_LESSON", topicId: "t1", lessonId: "l1", reason: "CONCEPT_GAP", priority: 70 },
      { kind: "PRACTICE", topicId: "t2", difficulty: 2, count: 10, reason: "WEAK_TOPIC", priority: 60 },
      { kind: "RETEST", topicId: "t3", dueAt: new Date(), isDue: true, reason: "RETEST_DUE", priority: 55 },
      { kind: "EXAM_PRACTICE", topicIds: ["t4", "t5"], reason: "EXAM_LEVEL_READY", priority: 42 },
    ];
    expect(toAnalysisRecommendations(recs)).toEqual([
      { kind: "LESSON", topicId: "t1", lessonId: "l1", reason: "CONCEPT_GAP" },
      { kind: "PRACTICE", topicId: "t2", questionCount: 10, reason: "WEAK_TOPIC" },
      { kind: "PRACTICE", topicId: "t3", questionCount: 10, reason: "RETEST_DUE" },
      { kind: "TOPIC_TEST", topicId: "t4", reason: "EXAM_LEVEL_READY" },
    ]);
    expect(toAnalysisRecommendations(recs, 1)).toHaveLength(1);
  });

  it("builds the version-1 analysis document", () => {
    const slots = [
      slot({ topicId: "a", marksAvailable: 2, marksAwarded: 2, timeSpentSeconds: 40 }),
      slot({ topicId: "a", marksAvailable: 2, marksAwarded: 2, timeSpentSeconds: 40 }),
      slot({ topicId: "b", marksAvailable: 2, marksAwarded: 0, timeSpentSeconds: 40 }),
      slot({ topicId: "b", marksAvailable: 2, marksAwarded: 0, timeSpentSeconds: 40 }),
      slot({ topicId: "c", marksAvailable: 2, status: "UNANSWERED", marksAwarded: 0, timeSpentSeconds: 0 }),
    ];
    const counted = countedPositions(slots, []);
    const totals = computeAttemptTotals(slots, [], counted, { practiceLike: false });
    const analysis = buildAttemptAnalysis({
      slots,
      counted,
      practiceLike: false,
      totals,
      recommendations: [{ kind: "LESSON", topicId: "b", lessonId: "l", reason: "CONCEPT_GAP" }],
      gradeBands: [
        { grade: "A", minPercent: 80 },
        { grade: "C", minPercent: 40 },
      ],
    });
    expect(analysis.version).toBe(1);
    expect(analysis.byTopic.map((t) => [t.topicId, t.percent])).toEqual([
      ["a", 100],
      ["b", 0],
      ["c", 0],
    ]);
    expect(analysis.strongTopicIds).toEqual(["a"]);
    expect(analysis.weakTopicIds).toEqual(["b"]);
    // 4 of 10 marks = 40 % (grade C); A needs 80 % = 8 marks, 4 more.
    expect(analysis.grade).toEqual({ nextGrade: "A", marksToNextGrade: 4 });
    expect(analysis.time).toEqual({ avgSecondsPerMark: 20, unansweredCount: 1 });
    expect(topicIdsInOrder(slots)).toEqual(["a", "b", "c"]);
    expect(analysis.mastery).toBeUndefined();

    const withMastery = buildAttemptAnalysis({ slots, counted, practiceLike: false, totals, recommendations: [], gradeBands: null, mastery: [{ topicId: "a", before: null, after: "WEAK" }] });
    expect(withMastery.mastery).toEqual([{ topicId: "a", before: null, after: "WEAK" }]);
  });
});

describe("mastery change over an attempt (§11 summary)", () => {
  it("keeps the band before the first change in a topic and the band after the latest", () => {
    const first = foldMasteryChanges(undefined, [
      { topicId: "a", before: { band: "DEVELOPING" }, band: "COMPETENT" },
      { topicId: "b", before: null, band: "WEAK" },
    ]);
    expect(first).toEqual([
      { topicId: "a", before: "DEVELOPING", after: "COMPETENT" },
      { topicId: "b", before: null, after: "WEAK" },
    ]);
    const second = foldMasteryChanges(first, [
      { topicId: "a", before: { band: "COMPETENT" }, band: "STRONG" },
      { topicId: "c", before: { band: "STRONG" }, band: "STRONG" },
    ]);
    expect(second).toEqual([
      { topicId: "a", before: "DEVELOPING", after: "STRONG" },
      { topicId: "b", before: null, after: "WEAK" },
      { topicId: "c", before: "STRONG", after: "STRONG" },
    ]);
    // Pure: the input is not changed.
    expect(first[0]).toEqual({ topicId: "a", before: "DEVELOPING", after: "COMPETENT" });
  });

  it("stores the change on an open session's document and keeps the rest of a scored one", () => {
    const open = withAnalysisMastery(null, [{ topicId: "a", before: null, after: "WEAK" }]);
    expect(readAttemptAnalysis(open)).toEqual({ version: 1, byTopic: [], strongTopicIds: [], weakTopicIds: [], recommendations: [], mastery: [{ topicId: "a", before: null, after: "WEAK" }] });
    const scored = { version: 1 as const, byTopic: [{ topicId: "a", marksAwarded: 1, marksAvailable: 2, percent: 50 }], strongTopicIds: [], weakTopicIds: ["a"], recommendations: [] };
    expect(withAnalysisMastery(scored, [{ topicId: "a", before: "WEAK", after: "DEVELOPING" }])).toEqual({ ...scored, mastery: [{ topicId: "a", before: "WEAK", after: "DEVELOPING" }] });
    // A malformed stored change list is dropped (no change shown rather than a wrong one); the scored results stay.
    const read = readAttemptAnalysis({ ...scored, mastery: [{ topicId: "a", before: "GREAT", after: "WEAK" }] });
    expect(read?.byTopic).toEqual(scored.byTopic);
    expect(read?.mastery).toBeUndefined();
  });
});
