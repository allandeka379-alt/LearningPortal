import { describe, expect, it } from "vitest";
import { masteryBandFromScore } from "@/lib/mastery-band";
import type { Recommendation } from "@/server/adaptive/core";
import {
  computeSubjectRollup,
  inScopeLeafTopicIds,
  leafTopicIds,
  masteryStateFromRow,
  remediationStartedAt,
  resolveDailyTarget,
  rollupAncestorMastery,
  storableMasteryScore,
  toProgressRecommendations,
  type AssessmentFacts,
  type ExamCountdown,
  type MasteryRollupRow,
  type ScopeTopic,
} from "./service";
import { chooseExamCountdown } from "./student-overview";

/** The CHECK constraint TopicMastery_band_chk: band from the RAW score. */
function dbBand(score: number) {
  return score >= 90 ? "MASTERED" : score >= 75 ? "STRONG" : score >= 60 ? "COMPETENT" : score >= 40 ? "DEVELOPING" : "WEAK";
}

function topic(id: string, parent: ScopeTopic | null, extra: Partial<ScopeTopic> = {}): ScopeTopic {
  return {
    id,
    parentId: parent?.id ?? null,
    kind: parent ? "SUBTOPIC" : "TOPIC",
    depth: parent ? parent.depth + 1 : 0,
    path: parent ? `${parent.path}/${id}` : id,
    sortOrder: 0,
    code: null,
    name: id,
    isOptional: false,
    examYearFrom: null,
    examYearTo: null,
    ...extra,
  };
}

function row(topicId: string, score: number, attempted: number, extra: Partial<MasteryRollupRow> = {}): MasteryRollupRow {
  const at = new Date("2026-10-01T10:00:00Z");
  return {
    topicId,
    isLeaf: true,
    score,
    questionsAttempted: attempted,
    questionsCorrect: Math.round((attempted * score) / 100),
    marksAwarded: Math.round((attempted * score) / 100),
    marksAvailable: attempted,
    recentAccuracy: score / 100,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
    currentDifficulty: 3,
    firstPracticedAt: at,
    lastPracticedAt: at,
    nextReviewAt: new Date("2026-10-03T22:00:00Z"),
    remediationStartedAt: null,
    seededByDiagnostic: false,
    ...extra,
  };
}

const NO_FACTS: AssessmentFacts = {
  completed: 0,
  averagePercent: null,
  mocksCompleted: 0,
  lastMockPercent: null,
  bestMockPercent: null,
  averageMockPercent: null,
  lastMockAt: null,
};

describe("storableMasteryScore", () => {
  it("keeps the stored band equal to the displayed band and the database CHECK", () => {
    for (let raw = 0; raw <= 100; raw += 0.01) {
      const stored = storableMasteryScore(raw);
      expect(masteryBandFromScore(stored)).toBe(dbBand(stored));
      expect(Math.abs(stored - raw)).toBeLessThan(0.51);
    }
    expect(storableMasteryScore(39.5)).toBe(40);
    expect(storableMasteryScore(39.49)).toBe(39.49);
    expect(storableMasteryScore(89.99)).toBe(90);
    expect(storableMasteryScore(120)).toBe(100);
    expect(storableMasteryScore(-3)).toBe(0);
  });
});

describe("mastery rows", () => {
  it("treats rows without evidence as not started", () => {
    const base = { score: 0, questionsAttempted: 0, questionsCorrect: 0, recentAccuracy: null, consecutiveCorrect: 0, consecutiveIncorrect: 0, currentDifficulty: 3, lastPracticedAt: null, nextReviewAt: null };
    expect(masteryStateFromRow(base, new Date())).toBeNull();
    const state = masteryStateFromRow({ ...base, score: 55, questionsAttempted: 4, questionsCorrect: 2 }, new Date("2026-10-05T00:00:00Z"));
    expect(state).toMatchObject({ score: 55, evidenceCount: 4, recentAccuracy: 0.5, currentDifficulty: 3 });
  });

  it("enters remediation after repeated misses and leaves it on recovery (§11)", () => {
    const at = new Date("2026-10-05T10:00:00Z");
    const base = { score: 30, evidenceCount: 4, recentAccuracy: 0.2, consecutiveCorrect: 0, consecutiveIncorrect: 2, currentDifficulty: 2 as const, lastPracticedAt: at, nextReviewAt: at };
    expect(remediationStartedAt(null, base, at)).toEqual(at);
    const earlier = new Date("2026-10-01T10:00:00Z");
    expect(remediationStartedAt(earlier, base, at)).toEqual(earlier);
    expect(remediationStartedAt(earlier, { ...base, score: 65, consecutiveIncorrect: 0 }, at)).toBeNull();
    expect(remediationStartedAt(earlier, { ...base, consecutiveIncorrect: 0, consecutiveCorrect: 3 }, at)).toBeNull();
    expect(remediationStartedAt(null, { ...base, score: 50, consecutiveIncorrect: 1 }, at)).toBeNull();
  });
});

describe("topics in scope (SubjectEnrollment doc)", () => {
  const algebra = topic("algebra", null);
  const quadratics = topic("quadratics", algebra);
  const linear = topic("linear", algebra);
  const history = topic("history", null);
  const depthA = topic("depth-a", history, { isOptional: true, optionGroup: undefined } as Partial<ScopeTopic>);
  const depthB = topic("depth-b", history, { isOptional: true });
  const setText = topic("set-text", null, { examYearFrom: 2027, examYearTo: 2028 });
  const all = [algebra, quadratics, linear, history, depthA, depthB, setText];
  const noRules = { routeComponentIds: null, topicComponents: new Map(), chosenTopicIds: new Set<string>(), examYear: null };

  it("lists leaves only", () => {
    expect(leafTopicIds(all)).toEqual(["quadratics", "linear", "depth-a", "depth-b", "set-text"]);
  });

  it("drops unchosen optional topics and topics outside the exam-year window", () => {
    expect(inScopeLeafTopicIds(all, noRules)).toEqual(["quadratics", "linear", "set-text"]);
    expect(inScopeLeafTopicIds(all, { ...noRules, chosenTopicIds: new Set(["depth-b"]) })).toEqual(["quadratics", "linear", "depth-b", "set-text"]);
    expect(inScopeLeafTopicIds(all, { ...noRules, examYear: 2029 })).toEqual(["quadratics", "linear"]);
  });

  it("restricts to the route's papers, inheriting links from ancestors", () => {
    const topicComponents = new Map<string, string[]>([
      ["algebra", ["P1"]],
      ["linear", ["P2"]],
    ]);
    const rules = { ...noRules, routeComponentIds: new Set(["P1"]), topicComponents };
    // quadratics inherits P1 from algebra; linear is P2 only; untagged topics are in every paper.
    expect(inScopeLeafTopicIds(all, rules)).toEqual(["quadratics", "set-text"]);
  });
});

describe("rollupAncestorMastery", () => {
  it("weights leaves by evidence and skips ancestors without evidence", () => {
    const algebra = topic("algebra", null);
    const a = topic("a", algebra);
    const b = topic("b", algebra);
    const geometry = topic("geometry", null);
    const g = topic("g", geometry);
    const rows = new Map([
      ["a", row("a", 90, 12)],
      ["b", row("b", 30, 4, { remediationStartedAt: new Date("2026-10-02T00:00:00Z"), nextReviewAt: new Date("2026-10-02T22:00:00Z") })],
    ]);
    const rollups = rollupAncestorMastery([algebra, a, b, geometry, g], rows);
    expect([...rollups.keys()]).toEqual(["algebra"]);
    const algebraRow = rollups.get("algebra");
    expect(algebraRow?.score).toBe(storableMasteryScore((90 * 12 + 30 * 4) / 16));
    expect(algebraRow?.band).toBe(masteryBandFromScore(algebraRow?.score ?? 0));
    expect(algebraRow?.questionsAttempted).toBe(16);
    expect(algebraRow?.leavesWithEvidence).toBe(2);
    expect(algebraRow?.nextReviewAt).toEqual(new Date("2026-10-02T22:00:00Z"));
    expect(algebraRow?.remediationStartedAt).toEqual(new Date("2026-10-02T00:00:00Z"));
  });
});

describe("computeSubjectRollup (§6, §7)", () => {
  const leaves = ["l1", "l2", "l3", "l4"];

  it("is all zeros and nulls without evidence (§50)", () => {
    const rollup = computeSubjectRollup({
      inScopeLeafIds: leaves,
      allLeafIds: leaves,
      leafRows: new Map(),
      lessonsByLeaf: new Map(leaves.map((id) => [id, [{ lessonId: "lesson-1", completed: false }]])),
      assessments: NO_FACTS,
      studySeconds: 0,
      gradeBands: [{ grade: "A", minPercent: 80, isPass: true }],
    });
    expect(rollup).toMatchObject({
      progressPercent: 0,
      syllabusCoveragePercent: 0,
      topicsTotal: 4,
      topicsStarted: 0,
      topicsCompleted: 0,
      lessonsTotal: 1,
      lessonsCompleted: 0,
      readinessPercent: null,
      predictedGrade: null,
      averageScorePercent: null,
    });
  });

  it("counts unstarted topics as 0 for progress and needs evidence for completion", () => {
    const rollup = computeSubjectRollup({
      inScopeLeafIds: leaves,
      allLeafIds: [...leaves, "out-of-scope"],
      leafRows: new Map([
        ["l1", row("l1", 92, 10)],
        ["l2", row("l2", 35, 4)],
        ["l3", row("l3", 64, 3)],
        ["out-of-scope", row("out-of-scope", 50, 2)],
      ]),
      lessonsByLeaf: new Map([
        ["l3", [{ lessonId: "x", completed: true }]],
        ["l4", [{ lessonId: "y", completed: true }]],
      ]),
      assessments: { ...NO_FACTS, completed: 2, averagePercent: 61.25, mocksCompleted: 1, averageMockPercent: 70, lastMockPercent: 70, bestMockPercent: 70 },
      studySeconds: 3600,
      gradeBands: [
        { grade: "A", minPercent: 80, isPass: true },
        { grade: "C", minPercent: 50, isPass: true },
        { grade: "U", minPercent: 0, isPass: false },
      ],
    });
    expect(rollup.progressPercent).toBe(47.8); // (92 + 35 + 64 + 0) / 4
    expect(rollup.topicsStarted).toBe(4); // l4 via a completed lesson
    expect(rollup.syllabusCoveragePercent).toBe(100);
    expect(rollup.topicsCompleted).toBe(2); // l1 (strong) and l3 (competent + lessons done)
    expect(rollup.topicsMastered).toBe(1);
    expect(rollup.weakTopicsCount).toBe(1);
    expect(rollup.questionsAttempted).toBe(19);
    expect(rollup.lessonsTotal).toBe(2);
    expect(rollup.lessonsCompleted).toBe(2);
    expect(rollup.assessmentsCompleted).toBe(2);
    expect(rollup.mockExamsCompleted).toBe(1);
    expect(rollup.averageScorePercent).toBe(61.3);
    expect(rollup.readinessPercent).toBe(Math.round((0.3 * 100 + 0.4 * 47.8 + 0.3 * 70) * 10) / 10);
    expect(rollup.predictedGrade).toBe("C");
    expect(rollup.predictedPass).toBe(true);
    expect(rollup.studySeconds).toBe(3600);
  });
});

describe("toProgressRecommendations", () => {
  it("maps adaptive recommendations to the cached SubjectProgress shape", () => {
    const recs: Recommendation[] = [
      { kind: "STUDY_LESSON", topicId: "t1", lessonId: "l1", reason: "NOT_STARTED", priority: 40 },
      { kind: "PRACTICE", topicId: "t2", difficulty: 2, count: 10, reason: "REPEATED_ERRORS", priority: 60 },
      { kind: "RETEST", topicId: "t3", dueAt: new Date(), isDue: true, reason: "RETEST_DUE", priority: 55 },
      { kind: "EXAM_PRACTICE", topicIds: ["t4"], reason: "EXAM_LEVEL_READY", priority: 42 },
    ];
    expect(toProgressRecommendations(recs)).toEqual([
      { kind: "LESSON", topicId: "t1", lessonId: "l1", reason: "NEW_TOPIC" },
      { kind: "PRACTICE", topicId: "t2", questionCount: 10, reason: "WEAK_TOPIC" },
      { kind: "REVIEW", topicId: "t3", questionCount: 10, reason: "SPACED_REVIEW" },
      { kind: "TOPIC_TEST", topicId: "t4", reason: "EXAM_PREPARATION" },
    ]);
  });
});

describe("resolveDailyTarget (dashboard 'Today's target')", () => {
  it("uses the minutes planned for today, not the plan's weekly average", () => {
    expect(resolveDailyTarget({ plannedTodayMinutes: 30, goalMinutes: 45, defaultMinutes: 20 })).toEqual({ minutes: 30, source: "PLAN" });
  });

  it("falls back to the student's goal on a rest day or without a plan, then to the platform default", () => {
    expect(resolveDailyTarget({ plannedTodayMinutes: 0, goalMinutes: 45, defaultMinutes: 20 })).toEqual({ minutes: 45, source: "GOAL" });
    expect(resolveDailyTarget({ plannedTodayMinutes: null, goalMinutes: 45, defaultMinutes: 20 })).toEqual({ minutes: 45, source: "GOAL" });
    expect(resolveDailyTarget({ plannedTodayMinutes: 0, goalMinutes: null, defaultMinutes: 20 })).toEqual({ minutes: 20, source: "DEFAULT" });
    expect(resolveDailyTarget({ plannedTodayMinutes: null, goalMinutes: 0, defaultMinutes: 20 })).toEqual({ minutes: 20, source: "DEFAULT" });
  });
});

describe("chooseExamCountdown (dashboard §17)", () => {
  const TODAY = "2026-10-06";
  const c = (id: string, startsOn: string, endsOn: string, daysUntil: number): ExamCountdown => ({
    examSessionId: id,
    name: id,
    startsOn,
    endsOn,
    daysUntil,
    isProvisional: true,
    isDemo: false,
    subjectIds: [],
  });

  it("prefers the nearest upcoming enrolment session, then the student's own upcoming target", () => {
    expect(chooseExamCountdown([c("far", "2027-06-01", "2027-06-30", 238), c("near", "2026-11-02", "2026-11-30", 27)], null, TODAY)?.examSessionId).toBe("near");
    expect(chooseExamCountdown([c("started", "2026-10-01", "2026-11-30", -5)], c("own", "2027-06-01", "2027-06-30", 238), TODAY)?.examSessionId).toBe("own");
  });

  it("returns a started session that has not ended (under way) only when nothing is upcoming", () => {
    expect(chooseExamCountdown([c("started", "2026-10-01", "2026-11-30", -5)], null, TODAY)?.examSessionId).toBe("started");
    expect(chooseExamCountdown([], c("own-started", "2026-10-01", "2026-10-06", -5), TODAY)?.examSessionId).toBe("own-started");
  });

  it("never returns a session that has ended", () => {
    expect(chooseExamCountdown([c("over", "2026-06-01", "2026-06-30", -127)], null, TODAY)).toBeNull();
    expect(chooseExamCountdown([null], null, TODAY)).toBeNull();
  });
});
