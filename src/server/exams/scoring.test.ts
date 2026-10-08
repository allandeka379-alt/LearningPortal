import { describe, expect, it } from "vitest";
import { analyseByTopic, computeScore, estimateGrade, percentageOf, type GradeBand, type MarkingStatus, type ScoringItem } from "./scoring";

let seq = 0;
function item(topicId: string, marksAvailable: number, marksAwarded: number | null, markingStatus: MarkingStatus = "MARKED"): ScoringItem {
  seq += 1;
  return { questionId: `q${seq}`, topicId, marksAvailable, marksAwarded, markingStatus };
}

/** Builds `count` questions in a topic splitting `available`/`awarded` evenly-ish (all MARKED). */
function topicItems(topicId: string, available: number, awarded: number, count: number): ScoringItem[] {
  const each = available / count;
  let left = awarded;
  return Array.from({ length: count }, () => {
    const got = Math.min(each, left);
    left -= got;
    return item(topicId, each, got);
  });
}

// §12 example: "You scored 68%." Strong: Algebra, Geometry. Weak: Probability, Statistics.
const SECTION_12_PAPER: ScoringItem[] = [
  ...topicItems("algebra", 20, 18, 4),
  ...topicItems("geometry", 20, 16, 4),
  ...topicItems("trigonometry", 15, 10, 3),
  ...topicItems("mensuration", 15, 10, 3),
  ...topicItems("probability", 15, 6, 3),
  ...topicItems("statistics", 15, 8, 3),
];
const TOPIC_NAMES = new Map([
  ["algebra", "Algebra"],
  ["geometry", "Geometry"],
  ["trigonometry", "Trigonometry"],
  ["mensuration", "Mensuration"],
  ["probability", "Probability"],
  ["statistics", "Statistics"],
]);
const GRADE_BANDS: GradeBand[] = [
  { grade: "C", minPercent: 50 },
  { grade: "A", minPercent: 70 },
  { grade: "B", minPercent: 60 },
  { grade: "D", minPercent: 40 },
  { grade: "E", minPercent: 30 },
  { grade: "U", minPercent: 0 },
];

describe("computeScore", () => {
  it("scores the §12 example at 68 %", () => {
    const score = computeScore(SECTION_12_PAPER);
    expect(score).toMatchObject({
      totalMarks: 100,
      marksAwarded: 68,
      markedMarks: 100,
      percentage: 68,
      percentageOfTotal: 68,
      pendingMarks: 0,
      isProvisional: false,
    });
    expect(score.counts.MARKED).toBe(SECTION_12_PAPER.length);
  });

  it("rounds the percentage half up to one decimal", () => {
    expect(computeScore([item("t", 200, 136.5)]).percentage).toBe(68.3); // 68.25
    expect(computeScore([item("t", 3, 1)]).percentage).toBe(33.3);
    expect(computeScore([item("t", 3, 2)]).percentage).toBe(66.7);
    expect(percentageOf(0.1 + 0.2, 0.3)).toBe(100);
    expect(percentageOf(5, 0)).toBeNull();
  });

  it("handles half marks without floating-point noise", () => {
    const score = computeScore([item("t", 0.5, 0.5), item("t", 0.1, 0.1), item("t", 0.2, 0.2)]);
    expect(score.totalMarks).toBe(0.8);
    expect(score.marksAwarded).toBe(0.8);
    expect(score.percentage).toBe(100);
  });

  it("clamps awarded marks into [0, available]", () => {
    const score = computeScore([item("t", 4, 6), item("t", 4, -2)]);
    expect(score.marksAwarded).toBe(4);
    expect(score.percentage).toBe(50);
  });

  it("excludes pending items from the percentage and flags the score provisional", () => {
    const items = [item("t", 30, 24), item("t", 20, null, "PENDING")];
    const score = computeScore(items);
    expect(score).toMatchObject({ totalMarks: 50, marksAwarded: 24, markedMarks: 30, percentage: 80, percentageOfTotal: 48, pendingMarks: 20, isProvisional: true });
  });

  it("counts provisional NEEDS_REVIEW marks but keeps them pending", () => {
    const score = computeScore([item("t", 10, 10), item("t", 10, 5, "NEEDS_REVIEW")]);
    expect(score).toMatchObject({ marksAwarded: 15, markedMarks: 20, percentage: 75, pendingMarks: 10, isProvisional: true });
    const noMark = computeScore([item("t", 10, 10), item("t", 10, null, "NEEDS_REVIEW")]);
    expect(noMark).toMatchObject({ markedMarks: 10, percentage: 100, pendingMarks: 10 });
  });

  it("counts unanswered as zero and reports self-assessed marks", () => {
    const score = computeScore([item("t", 10, null, "UNANSWERED"), item("t", 10, 7, "SELF_ASSESSED")]);
    expect(score).toMatchObject({ marksAwarded: 7, markedMarks: 20, percentage: 35, unansweredMarks: 10, selfAssessedMarks: 10, isProvisional: false });
    expect(score.counts).toEqual({ MARKED: 0, SELF_ASSESSED: 1, UNANSWERED: 1, NEEDS_REVIEW: 0, PENDING: 0 });
  });

  it("returns null percentages when nothing is marked or there are no items", () => {
    expect(computeScore([item("t", 10, null, "PENDING")])).toMatchObject({ percentage: null, percentageOfTotal: 0, isProvisional: true });
    expect(computeScore([])).toMatchObject({ totalMarks: 0, percentage: null, percentageOfTotal: null, isProvisional: false });
  });

  it("rejects structurally invalid items", () => {
    expect(() => computeScore([item("t", 5, null, "MARKED")])).toThrow(RangeError);
    expect(() => computeScore([item("t", -1, 0)])).toThrow(RangeError);
    expect(() => computeScore([item("t", 5, Number.NaN)])).toThrow(RangeError);
    expect(() => computeScore([item("t", 5, 1, "GUESSED" as MarkingStatus)])).toThrow(RangeError);
  });
});

describe("estimateGrade", () => {
  it("picks the highest band met, whatever the input order", () => {
    expect(estimateGrade(68, GRADE_BANDS)).toBe("B");
    expect(estimateGrade(70, GRADE_BANDS)).toBe("A");
    expect(estimateGrade(69.9, GRADE_BANDS)).toBe("B");
    expect(estimateGrade(0, GRADE_BANDS)).toBe("U");
    expect(estimateGrade(100, GRADE_BANDS)).toBe("A");
  });

  it("returns null when unknown or below every band", () => {
    expect(estimateGrade(null, GRADE_BANDS)).toBeNull();
    expect(estimateGrade(68, [])).toBeNull();
    expect(estimateGrade(20, [{ grade: "A", minPercent: 70 }, { grade: "E", minPercent: 30 }])).toBeNull();
    expect(estimateGrade(Number.NaN, GRADE_BANDS)).toBeNull();
  });
});

describe("analyseByTopic", () => {
  it("reproduces the §12 example: strong Algebra/Geometry, weak Probability/Statistics", () => {
    const analysis = analyseByTopic(SECTION_12_PAPER, TOPIC_NAMES);
    expect(analysis.topics.map((t) => t.topicId)).toEqual(["algebra", "geometry", "trigonometry", "mensuration", "probability", "statistics"]);
    expect(analysis.strongAreas.map((t) => t.topicName)).toEqual(["Algebra", "Geometry"]);
    expect(analysis.weakAreas.map((t) => t.topicName)).toEqual(["Probability", "Statistics"]);
    expect(analysis.focusTopics).toEqual([
      { topicId: "probability", topicName: "Probability", percentage: 40, band: "DEVELOPING" },
      { topicId: "statistics", topicName: "Statistics", percentage: 53.3, band: "DEVELOPING" },
    ]);
    const algebra = analysis.topics[0];
    expect(algebra).toMatchObject({ marksAwarded: 18, marksAvailable: 20, totalMarks: 20, percentage: 90, band: "MASTERED", questionCount: 4, sufficientEvidence: true });
    const trig = analysis.topics.find((t) => t.topicId === "trigonometry");
    expect(trig).toMatchObject({ percentage: 66.7, band: "COMPETENT" });
  });

  it("needs minimum evidence before labelling a topic strong or weak", () => {
    const items = [item("lucky", 2, 2), item("unlucky", 1, 0), item("unlucky", 1, 0), item("solid", 3, 3), item("solid", 3, 3)];
    const analysis = analyseByTopic(items, {});
    expect(analysis.topics.find((t) => t.topicId === "lucky")?.sufficientEvidence).toBe(false); // 1 question
    expect(analysis.topics.find((t) => t.topicId === "unlucky")?.sufficientEvidence).toBe(false); // 2 marks
    expect(analysis.strongAreas.map((t) => t.topicId)).toEqual(["solid"]);
    expect(analysis.weakAreas).toEqual([]);
    expect(analyseByTopic(items, {}, { minMarks: 1, minQuestions: 1 }).weakAreas.map((t) => t.topicId)).toEqual(["unlucky"]);
  });

  it("excludes pending marks from topic percentages", () => {
    const analysis = analyseByTopic([item("essay", 20, null, "PENDING"), item("essay", 5, 5), item("essay", 5, 4)], new Map());
    expect(analysis.topics[0]).toMatchObject({ marksAvailable: 10, totalMarks: 30, pendingMarks: 20, percentage: 90, markedQuestionCount: 2, topicName: null });
  });

  it("returns null percentage and band for a fully pending topic", () => {
    const analysis = analyseByTopic([item("essay", 20, null, "PENDING")], { essay: "Essay writing" });
    expect(analysis.topics[0]).toMatchObject({ topicName: "Essay writing", percentage: null, band: null, sufficientEvidence: false });
  });

  it("does not resolve names from the prototype chain", () => {
    expect(analyseByTopic([item("constructor", 1, 1)], {}).topics[0]?.topicName).toBeNull();
  });
});
