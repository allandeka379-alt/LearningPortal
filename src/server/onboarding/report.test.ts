import { describe, expect, it } from "vitest";
import {
  DIAGNOSTIC_MAX_QUESTIONS,
  DIAGNOSTIC_MIN_QUESTIONS,
  buildDiagnosticReport,
  diagnosticMinutes,
  diagnosticQuestionCount,
  diagnosticReportHref,
  diagnosticRoomHref,
  findingFor,
  planHrefFor,
  rootIdFromPath,
  type DiagnosticSlot,
} from "./report";

describe("diagnostic size", () => {
  it("asks about one question per leaf topic, between 8 and 12", () => {
    expect(diagnosticQuestionCount(0)).toBe(DIAGNOSTIC_MIN_QUESTIONS);
    expect(diagnosticQuestionCount(5)).toBe(8);
    expect(diagnosticQuestionCount(10)).toBe(10);
    expect(diagnosticQuestionCount(14)).toBe(DIAGNOSTIC_MAX_QUESTIONS);
    expect(diagnosticQuestionCount(Number.NaN)).toBe(8);
  });

  it("estimates minutes on the hub's scale (12 questions ≈ 10 minutes)", () => {
    expect(diagnosticMinutes(12)).toBe(10);
    expect(diagnosticMinutes(8)).toBe(7);
    expect(diagnosticMinutes(1)).toBe(2);
    expect(diagnosticMinutes(0)).toBe(0);
  });
});

describe("findings", () => {
  it("uses the §11 band boundaries: strength from 75%, gap below 60%", () => {
    expect(findingFor(null)).toBe("PENDING");
    expect(findingFor(100)).toBe("STRENGTH");
    expect(findingFor(75)).toBe("STRENGTH");
    expect(findingFor(74.9)).toBe("MIXED");
    expect(findingFor(60)).toBe("MIXED");
    expect(findingFor(59.9)).toBe("GAP");
    expect(findingFor(0)).toBe("GAP");
  });

  it("reads the root of a materialised path", () => {
    expect(rootIdFromPath("a/b/c")).toBe("a");
    expect(rootIdFromPath("a")).toBe("a");
  });
});

describe("buildDiagnosticReport", () => {
  const roots = [
    { id: "algebra", name: "Algebra", sortOrder: 1 },
    { id: "geometry", name: "Geometry", sortOrder: 2 },
    { id: "number", name: "Number", sortOrder: 0 },
    { id: "statistics", name: "Statistics", sortOrder: 3 },
  ];
  const topicPaths = new Map([
    ["algebra/linear", "algebra/linear"],
    ["algebra/quadratics", "algebra/quadratics"],
    ["geometry/angles", "geometry/angles"],
    ["number", "number"],
  ]);
  const slot = (topicId: string, awarded: number | null, available = 1, status: DiagnosticSlot["markingStatus"] = "AUTO_MARKED"): DiagnosticSlot => ({
    topicId,
    marksAvailable: available,
    marksAwarded: awarded,
    markingStatus: status,
  });

  it("groups answers by top-level topic in syllabus order, with mastery, findings and topics not covered", () => {
    const report = buildDiagnosticReport({
      slots: [
        slot("algebra/linear", 1),
        slot("algebra/quadratics", 0),
        slot("algebra/quadratics", 0, 2, "UNANSWERED"),
        slot("geometry/angles", 2, 2),
        slot("geometry/angles", 1, 1),
        slot("number", 1, 2),
        slot("unknown-topic", 1),
      ],
      topicPaths,
      roots,
      mastery: new Map([["algebra", { score: 22, band: "WEAK" }]]),
    });
    expect(report.topics.map((t) => [t.name, t.questionCount, t.answeredCount, t.marksAwarded, t.marksAvailable, t.percent, t.finding])).toEqual([
      ["Number", 1, 1, 1, 2, 50, "GAP"],
      ["Algebra", 3, 2, 1, 4, 25, "GAP"],
      ["Geometry", 2, 2, 3, 3, 100, "STRENGTH"],
    ]);
    expect(report.topics.find((t) => t.topicId === "algebra")?.mastery).toEqual({ score: 22, band: "WEAK" });
    expect(report.topics.find((t) => t.topicId === "geometry")?.mastery).toBeNull();
    expect(report.strengths.map((t) => t.topicId)).toEqual(["geometry"]);
    // Gaps: lowest score first.
    expect(report.gaps.map((t) => t.topicId)).toEqual(["algebra", "number"]);
    expect(report.notCovered.map((t) => t.id)).toEqual(["statistics"]);
    expect(report.startingTopics).toEqual([
      { topicId: "algebra", name: "Algebra", reason: "GAP", percent: 25 },
      { topicId: "number", name: "Number", reason: "GAP", percent: 50 },
      { topicId: "statistics", name: "Statistics", reason: "NOT_COVERED", percent: null },
    ]);
  });

  it("never calls a topic whose answers are still being marked a strength or a gap", () => {
    const report = buildDiagnosticReport({
      slots: [slot("geometry/angles", null, 4, "PENDING"), slot("algebra/linear", 2, 3)],
      topicPaths,
      roots: roots.slice(0, 2),
      mastery: new Map(),
    });
    const geometry = report.topics.find((t) => t.topicId === "geometry");
    expect(geometry).toMatchObject({ percent: null, finding: "PENDING", pendingCount: 1, answeredCount: 1 });
    expect(report.strengths).toEqual([]);
    expect(report.gaps).toEqual([]);
    // Mixed topics (60-74%) come after gaps as starting points.
    expect(report.startingTopics).toEqual([{ topicId: "algebra", name: "Algebra", reason: "MIXED", percent: 66.7 }]);
  });

  it("returns an empty report for an empty attempt", () => {
    const report = buildDiagnosticReport({ slots: [], topicPaths: new Map(), roots: [], mastery: new Map() });
    expect(report).toEqual({ topics: [], strengths: [], gaps: [], notCovered: [], startingTopics: [] });
  });
});

describe("links", () => {
  it("builds the study plan link with the diagnosed subjects, de-duplicated", () => {
    expect(planHrefFor([])).toBe("/app/plan");
    expect(planHrefFor(["a", "b", "a"])).toBe("/app/plan?subjectIds=a%2Cb");
    expect(diagnosticRoomHref("x")).toBe("/app/diagnostic/x");
    expect(diagnosticReportHref("x")).toBe("/app/diagnostic/x/report");
  });
});
