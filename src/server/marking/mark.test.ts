import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { QUESTION_TYPES, type QuestionRecord, type QuestionType } from "@/lib/questions";
import { sampleQuestion, type SampleQuestion } from "../../../tests/factories/questions";
import { markQuestion, markResponse } from "./mark";
import type { MarkingResult } from "./types";

/** A response that earns full marks on the sample of each type (open types: a genuine attempt). */
const CORRECT_RESPONSES: Record<QuestionType, (q: SampleQuestion & { id: string; partIds: string[] }) => unknown> = {
  MULTIPLE_CHOICE: () => ({ type: "MULTIPLE_CHOICE", optionKeys: ["A"] }),
  TRUE_FALSE: () => ({ type: "TRUE_FALSE", value: true }),
  SHORT_ANSWER: () => ({ type: "SHORT_ANSWER", text: "Oxygen" }),
  NUMERICAL: () => ({ type: "NUMERICAL", value: "5" }),
  CALCULATION: () => ({ type: "CALCULATION", value: "60", unit: "km/h", working: "150 ÷ 2.5 = 60" }),
  STRUCTURED: (q) => ({
    type: "STRUCTURED",
    parts: [
      { partId: q.partIds[0], text: "x^2 + 3x" },
      { partId: q.partIds[1], value: "5" },
    ],
  }),
  ESSAY: () => ({ type: "ESSAY", text: "Renewable energy comes from sources that are naturally replenished, such as sunlight." }),
  MATCHING: () => ({
    type: "MATCHING",
    pairs: [
      { leftId: "l1", rightId: "r1" },
      { leftId: "l2", rightId: "r2" },
      { leftId: "l3", rightId: "r3" },
    ],
  }),
  FILL_IN_THE_BLANK: () => ({
    type: "FILL_IN_THE_BLANK",
    blanks: [
      { blankId: "b1", text: "Harare" },
      { blankId: "b2", text: "100" },
    ],
  }),
  DIAGRAM_LABELLING: () => ({
    type: "DIAGRAM_LABELLING",
    labels: [
      { targetId: "h1", labelId: "L1" },
      { targetId: "h2", labelId: "L2" },
      { targetId: "h3", labelId: "L3" },
    ],
  }),
  EXTENDED_RESPONSE: () => ({ type: "EXTENDED_RESPONSE", text: "Water evaporates, condenses into clouds and falls as rain." }),
};

let counter = 0;
function fakeId(): string {
  counter += 1;
  return `01990000-0000-7000-8000-${String(counter).padStart(12, "0")}`;
}

/** Turns a sample into a QuestionRecord with ids (parts included). */
function record(sample: SampleQuestion): QuestionRecord & { partIds: string[] } {
  const partIds: string[] = [];
  const toRecord = (q: SampleQuestion, partLabel: string | null, partOrder: number): QuestionRecord => {
    const id = fakeId();
    if (partLabel !== null) partIds.push(id);
    return {
      id,
      type: q.type,
      markingMode: q.markingMode,
      stem: q.stem,
      payload: q.payload,
      answerSpec: q.answerSpec,
      marks: q.marks,
      partLabel,
      partOrder,
      options: q.options,
      parts: q.parts.map((p, i) => toRecord(p, p.partLabel, i)),
    };
  };
  return { ...toRecord(sample, null, 0), partIds };
}

function expectInvariants(result: MarkingResult): void {
  expect(Number.isInteger(result.marksAwarded)).toBe(true);
  expect(result.marksAwarded).toBeGreaterThanOrEqual(0);
  expect(result.marksAwarded).toBeLessThanOrEqual(result.maxMarks);
  expect(result.pendingMarks).toBeGreaterThanOrEqual(0);
  expect(result.marksAwarded + result.pendingMarks).toBeLessThanOrEqual(result.maxMarks);
  if (result.status === "UNANSWERED") expect(result).toMatchObject({ marksAwarded: 0, isCorrect: false, pendingMarks: 0 });
  if (result.status === "MARKED") {
    expect(result.pendingMarks).toBe(0);
    if (result.isCorrect === true) expect(result.marksAwarded).toBe(result.maxMarks);
    if (result.isCorrect === false) expect(result.marksAwarded).toBe(0);
  } else if (result.status !== "UNANSWERED") {
    expect(result.isCorrect).toBeNull();
  }
}

describe("markQuestion — every question type end to end", () => {
  it.each(QUESTION_TYPES.map((t) => [t]))("%s: the correct response earns full marks (or waits for AI / review)", (type) => {
    const q = record(sampleQuestion(type));
    const result = markQuestion(q, CORRECT_RESPONSES[type]({ ...sampleQuestion(type), id: q.id, partIds: q.partIds }));
    expectInvariants(result);
    if (type === "ESSAY") expect(result.status).toBe("PENDING_AI");
    else if (type === "EXTENDED_RESPONSE") expect(result.status).toBe("NEEDS_REVIEW");
    else expect(result).toMatchObject({ status: "MARKED", marksAwarded: q.marks, isCorrect: true });
  });

  it.each(QUESTION_TYPES.map((t) => [t]))("%s: no response is unanswered", (type) => {
    const result = markQuestion(record(sampleQuestion(type)), null);
    expect(result).toMatchObject({ status: "UNANSWERED", marksAwarded: 0, isCorrect: false });
  });

  it.each(QUESTION_TYPES.map((t) => [t]))("%s: a response of another type is never marked", (type) => {
    const other = type === "TRUE_FALSE" ? { type: "SHORT_ANSWER", text: "true" } : { type: "TRUE_FALSE", value: true };
    const result = markQuestion(record(sampleQuestion(type)), other);
    expect(result).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(result.feedback.flags).toContain("RESPONSE_TYPE_MISMATCH");
  });

  it("is deterministic", () => {
    const q = record(sampleQuestion("MATCHING"));
    const response = CORRECT_RESPONSES.MATCHING({ ...sampleQuestion("MATCHING"), id: q.id, partIds: [] });
    expect(markQuestion(q, response)).toEqual(markQuestion(q, response));
  });
});

describe("markResponse — marking modes on deterministic types", () => {
  const mcq = sampleQuestion("MULTIPLE_CHOICE");
  const input = (markingMode: "AUTO" | "AI_ASSISTED" | "MANUAL") => ({
    type: "MULTIPLE_CHOICE" as const,
    marks: 1,
    markingMode,
    payload: mcq.payload,
    answerSpec: mcq.answerSpec,
    options: mcq.options,
    response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
  });

  it("AI_ASSISTED has no effect", () => {
    expect(markResponse(input("AI_ASSISTED"))).toMatchObject({ status: "MARKED", marksAwarded: 1 });
  });

  it("MANUAL turns the rule-based mark into a suggestion for review", () => {
    const r = markResponse(input("MANUAL"));
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 1, isCorrect: null });
    expect(r.feedback.flags).toContain("MANUAL_REVIEW");
  });
});

describe("markResponse — adversarial and invalid input", () => {
  const numerical = { type: "NUMERICAL" as const, payload: null, answerSpec: { value: 5 } };

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 1_001])("throws on programming errors: marks = %s", (marks) => {
    expect(() => markResponse({ ...numerical, marks, response: null })).toThrow(RangeError);
  });

  it.each<[string, unknown]>([
    ["a string", "5"],
    ["a number", 5],
    ["an array", [{ type: "NUMERICAL", value: "5" }]],
    ["an object without type", { value: "5" }],
    ["extra keys", { type: "NUMERICAL", value: "5", isCorrect: true }],
    ["a non-string value", { type: "NUMERICAL", value: 5 }],
    ["a boolean", true],
  ])("refuses %s as a response", (_label, response) => {
    const r = markResponse({ ...numerical, marks: 1, response });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(r.feedback.flags.some((f) => f === "RESPONSE_INVALID" || f === "RESPONSE_TYPE_MISMATCH")).toBe(true);
  });

  it("is not affected by prototype-pollution payloads", () => {
    const response = JSON.parse('{"type":"NUMERICAL","value":"5","__proto__":{"polluted":true}}') as unknown;
    const r = markResponse({ ...numerical, marks: 1, response });
    expect(r.feedback.flags).toContain("RESPONSE_INVALID");
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it.each<[string, unknown]>([
    ["NaN value", { value: Number.NaN }],
    ["Infinity value", { value: Number.POSITIVE_INFINITY }],
    ["string value", { value: "5" }],
    ["negative tolerance", { value: 5, tolerance: { kind: "absolute", amount: -1 } }],
    ["unknown key (typo)", { value: 5, tolerence: { kind: "absolute", amount: 1 } }],
    ["array", [5]],
    ["null", null],
  ])("treats a stored spec with %s as unmarkable", (_label, answerSpec) => {
    const r = markResponse({ ...numerical, answerSpec, marks: 1, response: { type: "NUMERICAL", value: "5" } });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: null });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
  });

  // INJ-1: a stored question whose answer patterns exceed the per-question budget (e.g. written before the budget
  // existed) is sent to review without running any pattern.
  it("never runs the patterns of a stored question over the matching budget", () => {
    const heavy = ["v", "w", "x", "y"].map((c) => `^.{0,60}.{0,60}.{0,60}.{0,60}${c}$`);
    const parts = [0, 1, 2].map((i) => ({ id: randomUUID(), type: "SHORT_ANSWER" as const, marks: 1, partLabel: `(${i + 1})`, partOrder: i, payload: null, answerSpec: { accepted: [], patterns: heavy } }));
    const response = { type: "STRUCTURED", parts: parts.map((p) => ({ partId: p.id, text: `${"a".repeat(199)}v` })) };
    const r = markResponse({ type: "STRUCTURED", marks: 3, payload: null, answerSpec: null, parts, response });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: null });
    expect(r.feedback.flags).toContain("SPEC_INVALID");
    // Within the budget the same parts are marked by rule.
    const ok = markResponse({ type: "STRUCTURED", marks: 2, payload: null, answerSpec: null, parts: parts.slice(0, 2), response });
    expect(ok.marksAwarded).toBe(2);
  });

  it("refuses more option keys than any question can have", () => {
    const sample = sampleQuestion("MULTIPLE_CHOICE");
    const keys = Array.from({ length: 27 }, (_, i) => `K${i}`);
    const r = markResponse({ type: "MULTIPLE_CHOICE", marks: 1, payload: sample.payload, answerSpec: sample.answerSpec, options: sample.options, response: { type: "MULTIPLE_CHOICE", optionKeys: keys } });
    expect(r.feedback.flags).toContain("RESPONSE_INVALID");
  });

  it("keeps the invariants under random input (seeded fuzz)", () => {
    let state = 42;
    const random = () => {
      state = (state * 1_103_515_245 + 12_345) % 2_147_483_648;
      return state / 2_147_483_648;
    };
    const alphabet = ["0", "1", "5", ".", ",", "-", "e", "x", "^", "/", " ", "a", "Ω", "​", "²", "１", "$", "\\", "(", "*", "km/h", "oxygen", "∞", "NaN"];
    const randomText = () => Array.from({ length: Math.floor(random() * 12) }, () => alphabet[Math.floor(random() * alphabet.length)]).join("");
    for (let i = 0; i < 500; i += 1) {
      for (const type of ["SHORT_ANSWER", "NUMERICAL", "CALCULATION", "FILL_IN_THE_BLANK"] as const) {
        const q = record(sampleQuestion(type));
        const text = randomText();
        const response =
          type === "SHORT_ANSWER"
            ? { type, text }
            : type === "FILL_IN_THE_BLANK"
              ? { type, blanks: [{ blankId: "b1", text }, { blankId: "b2", text: randomText() }] }
              : { type, value: text.slice(0, 64), unit: randomText().slice(0, 32), working: random() < 0.5 ? "" : text };
        expectInvariants(markQuestion(q, response));
      }
    }
  });
});
