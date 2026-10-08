import { describe, expect, it } from "vitest";
import { markResponse } from "./mark";
import type { MarkingInput } from "./types";

const options = [
  { key: "A", isCorrect: true, content: "2", sortOrder: 0 },
  { key: "B", isCorrect: false, content: "-2", sortOrder: 1 },
  { key: "C", isCorrect: true, content: "3", sortOrder: 2 },
  { key: "D", isCorrect: false, content: "6", sortOrder: 3 },
];

function mcq(selectMode: "single" | "multiple", optionKeys: string[] | null, extra: Partial<MarkingInput> = {}): ReturnType<typeof markResponse> {
  return markResponse({
    type: "MULTIPLE_CHOICE",
    marks: 2,
    payload: { selectMode, shuffleOptions: false },
    answerSpec: { scoring: "all_or_nothing" },
    options: selectMode === "single" ? options.map((o) => ({ ...o, isCorrect: o.key === "A" })) : options,
    response: optionKeys === null ? null : { type: "MULTIPLE_CHOICE", optionKeys },
    ...extra,
  });
}

describe("multiple choice — single select (exact)", () => {
  it("awards full marks for the key", () => {
    const r = mcq("single", ["A"]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 2, maxMarks: 2, isCorrect: true, pendingMarks: 0 });
    expect(r.feedback.correctAnswerDisplay).toBe("A");
  });

  it("awards nothing for a distractor", () => {
    expect(mcq("single", ["B"])).toMatchObject({ status: "MARKED", marksAwarded: 0, isCorrect: false });
  });

  it("refuses hedging with several picks", () => {
    const r = mcq("single", ["A", "B"]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 0, isCorrect: false });
    expect(r.feedback.flags).toContain("TOO_MANY_SELECTIONS");
  });

  it("ignores duplicate keys", () => {
    expect(mcq("single", ["A", "A"])).toMatchObject({ marksAwarded: 2 });
  });

  it("treats no selection or a null response as unanswered", () => {
    expect(mcq("single", [])).toMatchObject({ status: "UNANSWERED", marksAwarded: 0, isCorrect: false });
    expect(mcq("single", null)).toMatchObject({ status: "UNANSWERED" });
  });

  it("flags unknown option keys and marks them wrong", () => {
    const r = mcq("single", ["Z"]);
    expect(r).toMatchObject({ marksAwarded: 0 });
    expect(r.feedback.flags).toContain("UNKNOWN_OPTION");
  });

  it("accepts any of several correct options in single mode", () => {
    const r = markResponse({
      type: "MULTIPLE_CHOICE",
      marks: 1,
      payload: { selectMode: "single" },
      answerSpec: null,
      options,
      response: { type: "MULTIPLE_CHOICE", optionKeys: ["C"] },
    });
    expect(r.marksAwarded).toBe(1);
  });

  it("uses defaults for a null payload and spec", () => {
    const r = markResponse({ type: "MULTIPLE_CHOICE", marks: 1, payload: null, answerSpec: null, options, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } });
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 1 });
  });

  it("reports per-option detail without awarding per option", () => {
    const r = mcq("single", ["B"]);
    expect(r.feedback.items?.map((i) => [i.id, i.correct])).toEqual([
      ["A", false],
      ["B", false],
      ["C", true],
      ["D", true],
    ]);
  });
});

describe("multiple choice — multi-select", () => {
  it("all_or_nothing requires exactly the correct set", () => {
    expect(mcq("multiple", ["A", "C"])).toMatchObject({ marksAwarded: 2, isCorrect: true });
    expect(mcq("multiple", ["C", "A"])).toMatchObject({ marksAwarded: 2 });
    expect(mcq("multiple", ["A"])).toMatchObject({ marksAwarded: 0, isCorrect: false });
    expect(mcq("multiple", ["A", "C", "D"])).toMatchObject({ marksAwarded: 0 });
  });

  const partial = (keys: string[], marks = 2) =>
    mcq("multiple", keys, { marks, answerSpec: { scoring: "partial" } });

  it.each<[string[], number]>([
    [["A", "C"], 2],
    [["A"], 1],
    [["C"], 1],
    [["A", "B"], 0],
    [["A", "C", "B"], 1],
    [["A", "B", "C", "D"], 0],
    [["B", "D"], 0],
    [["B"], 0],
  ])("partial scoring %j → %i of 2", (keys, expected) => {
    expect(partial(keys).marksAwarded).toBe(expected);
  });

  it("floors partial credit to whole marks", () => {
    const r = markResponse({
      type: "MULTIPLE_CHOICE",
      marks: 1,
      payload: { selectMode: "multiple" },
      answerSpec: { scoring: "partial" },
      options,
      response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
    });
    expect(r).toMatchObject({ marksAwarded: 0, isCorrect: false });
  });

  it("labels partial credit as neither correct nor incorrect", () => {
    const r = partial(["A"]);
    expect(r.isCorrect).toBeNull();
    expect(r.feedback.flags).toContain("PARTIAL_ANSWER");
  });

  it("counts unknown keys as wrong picks", () => {
    expect(partial(["A", "C", "Z"]).marksAwarded).toBe(1);
  });

  it("displays every correct key in option order", () => {
    expect(partial(["A"]).feedback.correctAnswerDisplay).toBe("A, C");
  });
});

describe("multiple choice — broken definitions", () => {
  it("sends a question without a correct option to review", () => {
    const r = markResponse({
      type: "MULTIPLE_CHOICE",
      marks: 1,
      payload: null,
      answerSpec: null,
      options: options.map((o) => ({ ...o, isCorrect: false })),
      response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
    });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: null });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
  });

  it("sends a question without options to review", () => {
    const r = markResponse({ type: "MULTIPLE_CHOICE", marks: 1, payload: null, answerSpec: null, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] } });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
  });
});

describe("true / false", () => {
  const tf = (value: boolean | null, correct = true, payload: unknown = null) =>
    markResponse({
      type: "TRUE_FALSE",
      marks: 1,
      payload,
      answerSpec: { correct, feedbackTrue: "Right: squares have four right angles.", feedbackFalse: "Look again at the angles." },
      response: value === null ? null : { type: "TRUE_FALSE", value },
    });

  it("marks the correct value", () => {
    expect(tf(true)).toMatchObject({ status: "MARKED", marksAwarded: 1, isCorrect: true });
    expect(tf(false)).toMatchObject({ marksAwarded: 0, isCorrect: false });
    expect(tf(false, false)).toMatchObject({ marksAwarded: 1 });
  });

  it("returns the authored feedback for the chosen value", () => {
    expect(tf(false).feedback.responseFeedback).toBe("Look again at the angles.");
    expect(tf(true).feedback.responseFeedback).toBe("Right: squares have four right angles.");
  });

  it("displays True/False or Yes/No per statement style", () => {
    expect(tf(true).feedback.correctAnswerDisplay).toBe("True");
    expect(tf(true, false, { statementStyle: "yes_no" }).feedback.correctAnswerDisplay).toBe("No");
  });

  it("treats a missing response as unanswered", () => {
    expect(tf(null)).toMatchObject({ status: "UNANSWERED", marksAwarded: 0 });
  });

  it("rejects a non-boolean value as an invalid response", () => {
    const r = markResponse({ type: "TRUE_FALSE", marks: 1, payload: null, answerSpec: { correct: true }, response: { type: "TRUE_FALSE", value: "true" } });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(r.feedback.flags).toContain("RESPONSE_INVALID");
  });
});
