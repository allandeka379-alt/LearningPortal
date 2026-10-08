import { describe, expect, it } from "vitest";
import type { MarkingMode } from "@/lib/questions";
import { markResponse } from "./mark";

const spec = {
  value: 60,
  tolerance: { kind: "absolute", amount: 0.5 },
  units: { required: true, accepted: ["km/h"], penaltyMarks: 1 },
  methodMarks: [{ id: "M1", description: "Divides distance by time", marks: 1 }],
};

function calc(response: { value: string; unit?: string; working?: string } | null, markingMode: MarkingMode = "AI_ASSISTED", answerSpec: unknown = spec, marks = 3) {
  return markResponse({
    type: "CALCULATION",
    marks,
    markingMode,
    payload: { unitHint: "km/h" },
    answerSpec,
    response: response === null ? null : { type: "CALCULATION", ...response },
  });
}

describe("calculation", () => {
  it("awards full marks for a correct final answer (method implied)", () => {
    const r = calc({ value: "60", unit: "km/h" });
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 3, isCorrect: true });
    expect(r.feedback.flags).toContain("METHOD_MARKS_IMPLIED");
    expect(r.feedback.matchedPoints?.[0]).toMatchObject({ pointId: "M1", awarded: 1 });
  });

  it("sends wrong answers with working to the AI marker for the method marks", () => {
    const r = calc({ value: "62", unit: "km/h", working: "150 / 2.5 = 62" });
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 0, pendingMarks: 1, isCorrect: null });
    expect(r.feedback.matchedPoints).toEqual([{ pointId: "M1", description: "Divides distance by time", maxMarks: 1, awarded: null, evidence: null }]);
    expect(r.feedback.flags).toEqual(expect.arrayContaining(["METHOD_MARKS_PENDING", "AI_REQUIRED"]));
  });

  it("keeps the earned answer marks as the provisional floor (unit missing)", () => {
    // Value right, unit missing: A marks 2 − 1 penalty = 1; method marks pending on the working.
    const r = calc({ value: "60", working: "150 ÷ 2.5" });
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 1, pendingMarks: 1 });
  });

  it("marks a wrong answer without working as final (method marks need working)", () => {
    const r = calc({ value: "62", unit: "km/h" });
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 0, isCorrect: false });
    expect(r.feedback.flags).toContain("WORKING_MISSING");
    expect(r.feedback.notes).toContain("Show your working to earn method marks.");
  });

  it("routes working to a human under manual marking", () => {
    expect(calc({ value: "62", working: "150/2.5" }, "MANUAL")).toMatchObject({ status: "NEEDS_REVIEW", pendingMarks: 1 });
    expect(calc({ value: "60", unit: "km/h" }, "MANUAL")).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 3 });
  });

  it("routes method marks to AI even when the author chose AUTO", () => {
    expect(calc({ value: "1", working: "x" }, "AUTO").status).toBe("PENDING_AI");
  });

  it("requires the working when methodRequired is set", () => {
    const required = { ...spec, methodRequired: true };
    expect(calc({ value: "60", unit: "km/h" }, "AI_ASSISTED", required)).toMatchObject({ status: "MARKED", marksAwarded: 2 });
    expect(calc({ value: "60", unit: "km/h", working: "150/2.5" }, "AI_ASSISTED", required)).toMatchObject({ status: "PENDING_AI", marksAwarded: 2, pendingMarks: 1 });
  });

  it("marks like NUMERICAL when there are no method marks", () => {
    const plain = { value: spec.value, tolerance: spec.tolerance, units: spec.units };
    expect(calc({ value: "60", unit: "km/h" }, "AI_ASSISTED", plain)).toMatchObject({ status: "MARKED", marksAwarded: 3 });
    expect(calc({ value: "60" }, "AI_ASSISTED", plain)).toMatchObject({ status: "MARKED", marksAwarded: 2 });
    expect(calc({ value: "1,5", working: "..." }, "AI_ASSISTED", plain)).toMatchObject({ status: "NEEDS_REVIEW" });
  });

  it("treats working without a final answer as an attempt", () => {
    expect(calc({ value: "", working: "150/2.5 = ..." })).toMatchObject({ status: "PENDING_AI", marksAwarded: 0 });
  });

  it("treats no answer and no working as unanswered", () => {
    expect(calc({ value: "", working: "  " })).toMatchObject({ status: "UNANSWERED" });
    expect(calc(null)).toMatchObject({ status: "UNANSWERED" });
  });

  it("sends an ambiguous decimal comma without working to review", () => {
    expect(calc({ value: "60,5" })).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
  });

  it("displays the expected answer with its unit", () => {
    expect(calc({ value: "1" }).feedback.correctAnswerDisplay).toBe("60 km/h");
  });
});
