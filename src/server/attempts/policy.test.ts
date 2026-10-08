import { describe, expect, it } from "vitest";
import { AttemptMode } from "@/generated/prisma/enums";
import { PRACTICE_LIMIT_MODES } from "@/server/billing/usage";
import type { MarkingResult } from "@/server/marking/types";
import {
  ATTEMPT_MODES,
  PRACTICE_LIMITED_MODES,
  assessmentAllowed,
  assessmentRequired,
  attemptNoun,
  attemptResultsHref,
  countsTowardPracticeLimit,
  diagnosticDifficultyTargets,
  estimateTimeLimitSeconds,
  extraTimeMultiplier,
  feedbackModeFor,
  gatesFor,
  initialDifficultyFor,
  isGradedMode,
  isPlanExemptAttempt,
  isPracticeLike,
  modeMatchesAssessmentKind,
  planDiagnosticQuestions,
  questionCountFor,
  readAttemptAnalysis,
  readAttemptConfig,
  revealAllowed,
  routeWithoutAiMarking,
  SELF_MARK_NOTE,
  selfAssessableWithoutAi,
  selfAssessmentAllowed,
  TEACHER_MARK_NOTE,
  toDifficultyMode,
  xpReasonFor,
  type DiagnosticCandidate,
} from "./policy";

describe("attempt modes", () => {
  it("lists exactly the Prisma AttemptMode values", () => {
    expect([...ATTEMPT_MODES].sort()).toEqual(Object.values(AttemptMode).sort());
  });

  it("matches the billing usage counter's practice modes", () => {
    expect([...PRACTICE_LIMITED_MODES].sort()).toEqual([...PRACTICE_LIMIT_MODES].sort());
  });

  it("knows which modes need, allow or forbid an assessment (AssessmentAttempt_assessment_mode_chk)", () => {
    for (const mode of ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "MOCK_EXAM"] as const) {
      expect(assessmentRequired(mode)).toBe(true);
      expect(assessmentAllowed(mode)).toBe(true);
    }
    for (const mode of ["TIMED_EXAM", "DIAGNOSTIC"] as const) {
      expect(assessmentRequired(mode)).toBe(false);
      expect(assessmentAllowed(mode)).toBe(true);
    }
    for (const mode of ["PRACTICE", "RETEST", "LESSON_CHECK", "DAILY_QUESTION"] as const) {
      expect(assessmentAllowed(mode)).toBe(false);
      expect(isPracticeLike(mode)).toBe(true);
      expect(isGradedMode(mode)).toBe(false);
    }
    expect(isGradedMode("MOCK_EXAM")).toBe(true);
    expect(modeMatchesAssessmentKind("MOCK_EXAM", "MOCK_EXAM")).toBe(true);
    expect(modeMatchesAssessmentKind("QUIZ", "MOCK_EXAM")).toBe(false);
  });

  it("counts practice-limited modes only outside plan-exempt (sponsored assignment) work", () => {
    expect(countsTowardPracticeLimit("PRACTICE", false)).toBe(true);
    expect(countsTowardPracticeLimit("QUIZ", false)).toBe(true);
    expect(countsTowardPracticeLimit("PRACTICE", true)).toBe(false);
    expect(countsTowardPracticeLimit("MOCK_EXAM", false)).toBe(false);
  });
});

describe("feedback timing (§10 vs §13)", () => {
  it("is immediate for practice and on submit for exams", () => {
    expect(feedbackModeFor("PRACTICE", null)).toBe("IMMEDIATE");
    expect(feedbackModeFor("DAILY_QUESTION", null)).toBe("IMMEDIATE");
    expect(feedbackModeFor("MOCK_EXAM", "IMMEDIATE")).toBe("ON_SUBMIT");
    expect(feedbackModeFor("TIMED_EXAM", null)).toBe("ON_SUBMIT");
    expect(feedbackModeFor("DIAGNOSTIC", "IMMEDIATE")).toBe("ON_SUBMIT");
    expect(feedbackModeFor("QUIZ", "IMMEDIATE")).toBe("IMMEDIATE");
    expect(feedbackModeFor("QUIZ", "AFTER_SUBMIT")).toBe("ON_SUBMIT");
    expect(feedbackModeFor("TOPIC_TEST", "AFTER_CLOSE")).toBe("ON_SUBMIT");
  });

  it("never reveals before the rules allow", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    const base = { assessmentTiming: null, windowClosesAt: null, now } as const;
    expect(revealAllowed({ ...base, feedback: "IMMEDIATE", attemptOpen: true, slotMarked: false })).toBe(false);
    expect(revealAllowed({ ...base, feedback: "IMMEDIATE", attemptOpen: true, slotMarked: true })).toBe(true);
    expect(revealAllowed({ ...base, feedback: "ON_SUBMIT", attemptOpen: true, slotMarked: true })).toBe(false);
    expect(revealAllowed({ ...base, feedback: "ON_SUBMIT", attemptOpen: false, slotMarked: true })).toBe(true);
    const closesLater = new Date("2026-10-06T10:00:00Z");
    expect(revealAllowed({ ...base, feedback: "ON_SUBMIT", attemptOpen: false, slotMarked: true, assessmentTiming: "AFTER_CLOSE", windowClosesAt: closesLater })).toBe(
      false,
    );
    expect(
      revealAllowed({ ...base, feedback: "ON_SUBMIT", attemptOpen: false, slotMarked: true, assessmentTiming: "AFTER_CLOSE", windowClosesAt: new Date("2026-10-04T10:00:00Z") }),
    ).toBe(true);
  });
});

describe("gates (rule 9)", () => {
  it("maps modes to features and limits", () => {
    expect(gatesFor("PRACTICE", { accessTier: null, planExempt: false })).toEqual({ features: [], limit: "practiceQuestionsPerDay", needsSubjectContent: false });
    expect(gatesFor("MOCK_EXAM", { accessTier: "PREMIUM", planExempt: false })).toEqual({
      features: ["mock_exams"],
      limit: "mockExamsPerMonth",
      needsSubjectContent: false,
    });
    expect(gatesFor("TOPIC_TEST", { accessTier: "FREE", planExempt: false })).toEqual({ features: [], limit: "topicTestsPerWeek", needsSubjectContent: false });
    expect(gatesFor("TOPIC_TEST", { accessTier: "PREMIUM", planExempt: false }).needsSubjectContent).toBe(true);
    expect(gatesFor("DIAGNOSTIC", { accessTier: null, planExempt: false }).features).toEqual(["diagnostic_test"]);
    expect(gatesFor("DAILY_QUESTION", { accessTier: null, planExempt: false }).features).toEqual(["daily_question"]);
  });

  it("exempts sponsored assignment work only", () => {
    expect(gatesFor("MOCK_EXAM", { accessTier: "PREMIUM", planExempt: true })).toEqual({ features: [], limit: null, needsSubjectContent: false });
    // Unsponsored assignment work (stored with config.planGated) keeps the student's own gates and allowances.
    expect(isPlanExemptAttempt("0190a000-0000-7000-8000-000000000001", {})).toBe(true);
    expect(isPlanExemptAttempt("0190a000-0000-7000-8000-000000000001", { planGated: true })).toBe(false);
    expect(isPlanExemptAttempt(null, {})).toBe(false);
  });
});

describe("difficulty, counts, timing, XP", () => {
  it("maps choices and abilities", () => {
    expect(toDifficultyMode("EASY")).toBe("easy");
    expect(toDifficultyMode(undefined)).toBe("adaptive");
    expect(initialDifficultyFor("BEGINNER")).toBe(2);
    expect(initialDifficultyFor(null)).toBe(3);
    expect(initialDifficultyFor("ADVANCED")).toBe(4);
  });

  it("clamps generated counts", () => {
    expect(questionCountFor("PRACTICE", undefined)).toBe(10);
    expect(questionCountFor("DIAGNOSTIC", undefined)).toBe(20);
    expect(questionCountFor("PRACTICE", 0)).toBe(1);
    expect(questionCountFor("PRACTICE", 1_000)).toBe(60);
  });

  it("turns accommodations into multipliers and estimates generated limits", () => {
    expect(extraTimeMultiplier(null)).toBe(1);
    expect(extraTimeMultiplier(25)).toBe(1.25);
    expect(extraTimeMultiplier(250)).toBe(2);
    expect(estimateTimeLimitSeconds([{ estimatedSeconds: 120, marks: 1 }, { estimatedSeconds: null, marks: 2 }])).toBe(300);
    expect(estimateTimeLimitSeconds([{ estimatedSeconds: 10, marks: 1 }])).toBe(300);
    expect(estimateTimeLimitSeconds(Array.from({ length: 400 }, () => ({ estimatedSeconds: 600, marks: 5 })))).toBe(4 * 3600);
  });

  it("names the XP ledger reason per mode", () => {
    expect(xpReasonFor("PRACTICE", false)).toBe("PRACTICE_COMPLETED");
    expect(xpReasonFor("MOCK_EXAM", false)).toBe("MOCK_EXAM_COMPLETED");
    expect(xpReasonFor("DIAGNOSTIC", false)).toBe("DIAGNOSTIC_COMPLETED");
    expect(xpReasonFor("DAILY_QUESTION", false)).toBe("DAILY_QUESTION_ANSWERED");
    expect(xpReasonFor("QUIZ", false)).toBe("ASSESSMENT_COMPLETED");
    expect(xpReasonFor("QUIZ", true)).toBe("ASSIGNMENT_SUBMITTED");
  });
});

describe("generated diagnostic (§52 placement)", () => {
  const count = (values: readonly number[]) => values.reduce<Record<number, number>>((acc, v) => ({ ...acc, [v]: (acc[v] ?? 0) + 1 }), {});

  it("aims a third each below, at and above the self-reported ability (clamped 1-5)", () => {
    expect(count(diagnosticDifficultyTargets("INTERMEDIATE", 9))).toEqual({ 2: 3, 3: 3, 4: 3 });
    expect(count(diagnosticDifficultyTargets(null, 20))).toEqual({ 2: 7, 3: 7, 4: 6 });
    expect(count(diagnosticDifficultyTargets("BEGINNER", 6))).toEqual({ 1: 2, 2: 2, 3: 2 });
    expect(count(diagnosticDifficultyTargets("ADVANCED", 6))).toEqual({ 3: 2, 4: 2, 5: 2 });
    expect(diagnosticDifficultyTargets("ADVANCED", 0)).toEqual([]);
  });

  /** `roots` top-level topics × `leaves` leaves × one question at each difficulty 1-5. */
  function bank(roots: number, leaves: number): DiagnosticCandidate[] {
    const out: DiagnosticCandidate[] = [];
    for (let r = 0; r < roots; r += 1) {
      for (let l = 0; l < leaves; l += 1) {
        for (let d = 1; d <= 5; d += 1) out.push({ id: `q-${r}-${l}-${d}`, topicId: `leaf-${r}-${l}`, rootTopicId: `root-${r}`, difficulty: d, timesSeen: 0 });
      }
    }
    return out;
  }

  it("covers every top-level topic before any gets a second question, then spreads over leaves", () => {
    const picks = planDiagnosticQuestions(bank(4, 3), diagnosticDifficultyTargets(null, 8), "seed-1");
    expect(picks).toHaveLength(8);
    const roots = picks.map((p) => p.topicId.split("-")[1]);
    expect(new Set(roots.slice(0, 4)).size).toBe(4);
    expect(Object.values(count(roots.map(Number)))).toEqual([2, 2, 2, 2]);
    // Two questions in one top-level topic come from two different leaves.
    for (const root of ["0", "1", "2", "3"]) {
      const leaves = picks.filter((p) => p.topicId.startsWith(`leaf-${root}-`)).map((p) => p.topicId);
      expect(new Set(leaves).size).toBe(leaves.length);
    }
    expect(new Set(picks.map((p) => p.questionId)).size).toBe(picks.length);
  });

  it("matches each slot's target difficulty when the bank has it, and prefers unseen questions", () => {
    const picks = planDiagnosticQuestions(bank(3, 2), diagnosticDifficultyTargets("ADVANCED", 6), "seed-2");
    for (const pick of picks) expect(Number(pick.questionId.split("-")[3])).toBe(pick.targetDifficulty);
    expect(count(picks.map((p) => p.targetDifficulty))).toEqual({ 3: 2, 4: 2, 5: 2 });

    const seen = [
      { id: "a-seen", topicId: "leaf", rootTopicId: "root", difficulty: 3, timesSeen: 2 },
      { id: "b-new", topicId: "leaf", rootTopicId: "root", difficulty: 3, timesSeen: 0 },
    ];
    expect(planDiagnosticQuestions(seen, [3], "seed-3")[0]?.questionId).toBe("b-new");
  });

  it("falls back to the nearest difficulty, is deterministic per seed and stops when the bank runs out", () => {
    const onlyEasy = [
      { id: "e1", topicId: "l1", rootTopicId: "r1", difficulty: 1, timesSeen: 0 },
      { id: "e2", topicId: "l2", rootTopicId: "r2", difficulty: 2, timesSeen: 0 },
    ];
    const picks = planDiagnosticQuestions(onlyEasy, [4, 4, 4], "seed-4");
    expect(picks.map((p) => p.questionId).sort()).toEqual(["e1", "e2"]);
    expect(planDiagnosticQuestions(bank(4, 3), diagnosticDifficultyTargets(null, 10), "same")).toEqual(
      planDiagnosticQuestions(bank(4, 3), diagnosticDifficultyTargets(null, 10), "same"),
    );
  });
});

describe("self-assessment fallback (AI marking not configured)", () => {
  const base = {
    markingStatus: "PENDING" as const,
    processed: true,
    answered: true,
    questionType: "ESSAY" as const,
    isAssignment: false,
    feedbackVisible: true,
    aiMarkingAvailable: false,
  };

  it("allows the student to mark their own open answer waiting for AI marking", () => {
    expect(selfAssessmentAllowed(base)).toBe(true);
    expect(selfAssessmentAllowed({ ...base, questionType: "SHORT_ANSWER" })).toBe(true);
    expect(selfAssessmentAllowed({ ...base, questionType: "EXTENDED_RESPONSE" })).toBe(true);
  });

  it("refuses everything else", () => {
    expect(selfAssessmentAllowed({ ...base, aiMarkingAvailable: true })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, isAssignment: true })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, feedbackVisible: false })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, markingStatus: "SELF_ASSESSED" })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, markingStatus: "AI_MARKED" })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, processed: false })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, answered: false })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, questionType: "MULTIPLE_CHOICE" })).toBe(false);
    expect(selfAssessmentAllowed({ ...base, questionType: null })).toBe(false);
  });
});

describe("routing without AI marking (features.ai off, ARCHITECTURE §3.14)", () => {
  function pendingAi(patch: Partial<MarkingResult> = {}): MarkingResult {
    return {
      status: "PENDING_AI",
      marksAwarded: 2,
      maxMarks: 6,
      isCorrect: null,
      pendingMarks: 4,
      feedback: {
        correctAnswerDisplay: null,
        notes: ["Your answer will be marked against the mark scheme shortly.", "Your answer has 420 words; the limit is 400."],
        flags: ["AI_REQUIRED", "OVER_WORD_LIMIT"],
      },
      ...patch,
    };
  }

  it("keeps the student's own written answers pending for self-assessment, with an honest note", () => {
    for (const type of ["ESSAY", "EXTENDED_RESPONSE", "SHORT_ANSWER"] as const) {
      expect(selfAssessableWithoutAi(type, false)).toBe(true);
      const routed = routeWithoutAiMarking(pendingAi(), type, false);
      expect(routed.status).toBe("PENDING_AI");
      expect(routed.marksAwarded).toBe(2);
      expect(routed.feedback.notes).toEqual([SELF_MARK_NOTE, "Your answer has 420 words; the limit is 400."]);
      expect(routed.feedback.flags).toEqual(["OVER_WORD_LIMIT"]);
    }
  });

  it("sends calculations, structured questions and all assignment work to the teacher queue with the provisional mark", () => {
    for (const [type, isAssignment] of [["CALCULATION", false], ["STRUCTURED", false], ["ESSAY", true], ["SHORT_ANSWER", true]] as const) {
      expect(selfAssessableWithoutAi(type, isAssignment)).toBe(false);
      const routed = routeWithoutAiMarking(pendingAi(), type, isAssignment);
      expect(routed.status, type).toBe("NEEDS_REVIEW");
      expect(routed.marksAwarded).toBe(2);
      expect(routed.feedback.notes[0]).toBe(TEACHER_MARK_NOTE);
      expect(routed.feedback.flags).toEqual(["MANUAL_REVIEW", "OVER_WORD_LIMIT"]);
    }
  });

  it("leaves every result that is not waiting for AI unchanged", () => {
    for (const status of ["MARKED", "NEEDS_REVIEW", "UNANSWERED"] as const) {
      const result = pendingAi({ status });
      expect(routeWithoutAiMarking(result, "ESSAY", false)).toBe(result);
    }
  });
});

describe("results routing", () => {
  it("links each mode's closed attempt to its own results page", () => {
    expect(attemptResultsHref("PRACTICE", "a1")).toBe("/app/practice/a1/summary");
    expect(attemptResultsHref("RETEST", "a1")).toBe("/app/practice/a1/summary");
    expect(attemptResultsHref("LESSON_CHECK", "a1")).toBe("/app/practice/a1/summary");
    expect(attemptResultsHref("DAILY_QUESTION", "a1")).toBe("/app/daily");
    expect(attemptResultsHref("DIAGNOSTIC", "a1")).toBe("/app/diagnostic/a1/report");
    for (const mode of ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "MOCK_EXAM"] as const) {
      expect(attemptResultsHref(mode, "a1")).toBe("/app/exams/attempt/a1/results");
    }
  });

  it("names every mode in running text", () => {
    for (const mode of ATTEMPT_MODES) expect(attemptNoun(mode)).toMatch(/^[a-z][a-z -]+$/);
    expect(attemptNoun("DIAGNOSTIC")).toBe("diagnostic");
  });
});

describe("stored JSON", () => {
  it("falls back to safe defaults for unreadable configs", () => {
    expect(readAttemptConfig(null, "PRACTICE").feedback).toBe("IMMEDIATE");
    expect(readAttemptConfig({ nonsense: true }, "MOCK_EXAM").feedback).toBe("ON_SUBMIT");
    expect(readAttemptConfig({ feedback: "IMMEDIATE", origin: "BUILDER", seed: "x", extra: 1 }, "QUIZ")).toMatchObject({ feedback: "IMMEDIATE", seed: "x" });
  });

  it("reads only version-1 analysis documents", () => {
    expect(readAttemptAnalysis({ version: 2 })).toBeNull();
    expect(readAttemptAnalysis({ version: 1, byTopic: [], strongTopicIds: [], weakTopicIds: [], recommendations: [] })).toMatchObject({ version: 1 });
  });
});
