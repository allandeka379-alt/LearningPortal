import { describe, expect, it } from "vitest";
import type { MarkingResult } from "@/server/marking/types";
import { ANONYMOUS_REVIEW_NOTE, isAnswerableDailyDate, publicFeedbackFromMarking } from "./daily-core";

function result(overrides: Partial<MarkingResult> = {}): MarkingResult {
  return {
    status: "MARKED",
    marksAwarded: 1,
    maxMarks: 1,
    isCorrect: true,
    pendingMarks: 0,
    feedback: { correctAnswerDisplay: "x = 2", notes: [], flags: [] },
    ...overrides,
  };
}

describe("isAnswerableDailyDate", () => {
  it("accepts today's and yesterday's question only", () => {
    expect(isAnswerableDailyDate("2026-10-06", "2026-10-06")).toBe(true);
    expect(isAnswerableDailyDate("2026-10-05", "2026-10-06")).toBe(true);
    expect(isAnswerableDailyDate("2026-10-04", "2026-10-06")).toBe(false);
    expect(isAnswerableDailyDate("2026-10-07", "2026-10-06")).toBe(false);
  });
});

describe("publicFeedbackFromMarking", () => {
  it("presents a correct automatic mark as final, with the reveal and no tracking extras", () => {
    const feedback = publicFeedbackFromMarking(result(), null);
    expect(feedback).toMatchObject({
      status: "AUTO_MARKED",
      outcome: "correct",
      marksAwarded: 1,
      marksAvailable: 1,
      topic: null,
      mastery: null,
      studyLesson: null,
      selfAssessment: null,
      attemptCompleted: true,
      nextPosition: null,
    });
  });

  it("presents wrong and partial answers", () => {
    expect(publicFeedbackFromMarking(result({ marksAwarded: 0, isCorrect: false, feedback: { correctAnswerDisplay: "4", notes: ["Include the unit."], flags: [] } }), null)).toMatchObject({
      outcome: "incorrect",
      marksAwarded: 0,
      notes: ["Include the unit."],
    });
    expect(publicFeedbackFromMarking(result({ maxMarks: 3, marksAwarded: 2, isCorrect: null }), null).outcome).toBe("partial");
  });

  it("keeps marks that would need AI or a human provisional, and says so", () => {
    const feedback = publicFeedbackFromMarking(result({ status: "PENDING_AI", marksAwarded: 1, maxMarks: 4, isCorrect: null, pendingMarks: 3 }), null);
    expect(feedback.status).toBe("NEEDS_REVIEW");
    expect(feedback.outcome).toBe("review");
    expect(feedback.marksAwarded).toBe(1);
    expect(feedback.notes).toContain(ANONYMOUS_REVIEW_NOTE);
  });

  it("scores an unanswered question as zero", () => {
    const feedback = publicFeedbackFromMarking(result({ status: "UNANSWERED", marksAwarded: 0, isCorrect: false }), null);
    expect(feedback).toMatchObject({ status: "UNANSWERED", outcome: "unanswered", marksAwarded: 0 });
  });
});
