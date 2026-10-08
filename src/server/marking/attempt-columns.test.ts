import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { toAttemptColumns, toAttemptFeedback, toScoringStatus } from "./attempt-columns";
import { markResponse } from "./mark";

const numerical = (value: string | null, marks = 2) =>
  markResponse({ type: "NUMERICAL", marks, payload: null, answerSpec: { value: 5, units: { required: true, accepted: ["m"] } }, response: value === null ? null : { type: "NUMERICAL", value } });

describe("toAttemptColumns (honours the QuestionAttempt CHECKs)", () => {
  it("MARKED → AUTO_MARKED with isCorrect = full marks", () => {
    const response = { type: "NUMERICAL", value: "5 m" };
    expect(toAttemptColumns(numerical("5 m"), response)).toEqual({ markingStatus: "AUTO_MARKED", marksAwarded: 2, isCorrect: true, feedback: null, response });
    // Partial credit is not "correct" in the DB sense (isCorrect = marksAwarded = marksAvailable).
    expect(toAttemptColumns(numerical("5"), {})).toMatchObject({ marksAwarded: 1, isCorrect: false });
  });

  it("UNANSWERED → 0 marks, isCorrect false, response cleared", () => {
    expect(toAttemptColumns(numerical(""), { type: "NUMERICAL", value: "" })).toEqual({
      markingStatus: "UNANSWERED",
      marksAwarded: 0,
      isCorrect: false,
      feedback: null,
      response: null,
    });
  });

  it("PENDING_AI → PENDING with no mark (marksAwarded and isCorrect NULL)", () => {
    const essay = markResponse({
      type: "ESSAY",
      marks: 4,
      markingMode: "AI_ASSISTED",
      payload: null,
      answerSpec: { markScheme: { points: [{ id: "P1", description: "Point", marks: 4 }] } },
      response: { type: "ESSAY", text: "An answer." },
    });
    expect(toAttemptColumns(essay, { type: "ESSAY", text: "An answer." })).toMatchObject({ markingStatus: "PENDING", marksAwarded: null, isCorrect: null });
  });

  it("NEEDS_REVIEW → provisional mark with a non-null isCorrect", () => {
    const review = numerical("1,5");
    expect(toAttemptColumns(review, {})).toMatchObject({ markingStatus: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: false });
    const manual = markResponse({ type: "TRUE_FALSE", marks: 1, markingMode: "MANUAL", payload: null, answerSpec: { correct: true }, response: { type: "TRUE_FALSE", value: true } });
    expect(toAttemptColumns(manual, {})).toMatchObject({ markingStatus: "NEEDS_REVIEW", marksAwarded: 1, isCorrect: true });
  });
});

describe("toAttemptFeedback", () => {
  it("is null for single-part deterministic answers", () => {
    expect(toAttemptFeedback(numerical("5 m"))).toBeNull();
  });

  it("records rubric points that were decided", () => {
    const r = markResponse({
      type: "SHORT_ANSWER",
      marks: 2,
      payload: null,
      answerSpec: { rubric: [{ id: "R1", anyOf: ["light"], marks: 1 }, { id: "R2", anyOf: ["glucose"], marks: 1 }] },
      response: { type: "SHORT_ANSWER", text: "light" },
    });
    expect(toAttemptFeedback(r)).toEqual({ points: [{ pointId: "R1", awarded: 1, evidence: "light" }, { pointId: "R2", awarded: 0 }] });
  });

  it("flattens structured parts (nested included) and marks pending parts", () => {
    const a = randomUUID();
    const b = randomUUID();
    const bi = randomUUID();
    const r = markResponse({
      type: "STRUCTURED",
      marks: 5,
      payload: null,
      answerSpec: null,
      parts: [
        { id: a, type: "NUMERICAL", marks: 1, partOrder: 0, payload: null, answerSpec: { value: 1 } },
        {
          id: b,
          type: "STRUCTURED",
          marks: 4,
          partOrder: 1,
          payload: null,
          answerSpec: null,
          parts: [{ id: bi, type: "ESSAY", marks: 4, markingMode: "AI_ASSISTED", payload: null, answerSpec: { markScheme: { points: [{ id: "P", description: "d", marks: 4 }] } } }],
        },
      ],
      response: {
        type: "STRUCTURED",
        parts: [
          { partId: a, value: "1" },
          { partId: bi, text: "An essay." },
        ],
      },
    });
    expect(toAttemptFeedback(r)?.parts).toEqual([
      { partId: a, awarded: 1, max: 1, correct: true },
      { partId: bi, awarded: 0, max: 4, correct: false, pending: true },
    ]);
  });
});

describe("toScoringStatus", () => {
  it("maps outcomes onto the exam scoring statuses", () => {
    expect(toScoringStatus("MARKED")).toBe("MARKED");
    expect(toScoringStatus("PENDING_AI")).toBe("PENDING");
    expect(toScoringStatus("NEEDS_REVIEW")).toBe("NEEDS_REVIEW");
    expect(toScoringStatus("UNANSWERED")).toBe("UNANSWERED");
  });
});
