import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { MarkingMode } from "@/lib/questions";
import { markResponse } from "./mark";
import type { MarkingPartInput } from "./types";

const essaySpec = { markScheme: { points: [{ id: "P1", description: "Explains the idea", marks: 4 }] }, modelAnswer: "Original model answer." };

describe("essay and extended response", () => {
  function essay(text: string | null, markingMode: MarkingMode, payload: unknown = { wordLimit: { min: 3, max: 10 } }, type: "ESSAY" | "EXTENDED_RESPONSE" = "ESSAY") {
    return markResponse({ type, marks: 4, markingMode, payload, answerSpec: essaySpec, response: text === null ? null : { type, text } });
  }

  it("is never auto-awarded: AI-assisted goes to the AI marker", () => {
    const r = essay("A thoughtful answer of several words here.", "AI_ASSISTED");
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 0, pendingMarks: 4, isCorrect: null });
    expect(r.feedback.matchedPoints).toEqual([{ pointId: "P1", description: "Explains the idea", maxMarks: 4, awarded: null, evidence: null }]);
    expect(r.feedback.correctAnswerDisplay).toBeNull();
  });

  it("manual (and mis-configured AUTO) marking goes to a human", () => {
    expect(essay("Some words in the answer.", "MANUAL")).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(essay("Some words in the answer.", "AUTO")).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(essay("Some words in the answer.", "MANUAL", null, "EXTENDED_RESPONSE").status).toBe("NEEDS_REVIEW");
  });

  it("reports word-limit problems without changing marks", () => {
    const long = essay("one two three four five six seven eight nine ten eleven", "AI_ASSISTED");
    expect(long.feedback.flags).toContain("OVER_WORD_LIMIT");
    expect(long.feedback.notes.join(" ")).toMatch(/11 words; the limit is 10/);
    expect(essay("too short", "AI_ASSISTED").feedback.flags).toContain("UNDER_WORD_LIMIT");
  });

  it("treats blank essays as unanswered", () => {
    expect(essay("   ", "AI_ASSISTED")).toMatchObject({ status: "UNANSWERED" });
    expect(essay(null, "AI_ASSISTED")).toMatchObject({ status: "UNANSWERED" });
  });

  it("accepts long essays up to the limit and refuses longer ones", () => {
    expect(essay("word ".repeat(9_000), "AI_ASSISTED", null).status).toBe("PENDING_AI");
    expect(essay("w".repeat(50_001), "AI_ASSISTED", null).feedback.flags).toContain("RESPONSE_INVALID");
  });
});

// ------------------------------------------------------------------------------------------------------------------
// STRUCTURED
// ------------------------------------------------------------------------------------------------------------------

const A = randomUUID();
const B = randomUUID();
const C = randomUUID();
const BI = randomUUID();
const BII = randomUUID();

const partA: MarkingPartInput = {
  id: A,
  type: "SHORT_ANSWER",
  marks: 1,
  partLabel: "(a)",
  partOrder: 0,
  payload: null,
  answerSpec: { accepted: [{ value: "x^2+3x" }, { value: "x(x+3)" }], normalise: ["remove_whitespace"] },
};
const partB: MarkingPartInput = { id: B, type: "NUMERICAL", marks: 2, partLabel: "(b)", partOrder: 1, payload: null, answerSpec: { value: 5 } };
const partC: MarkingPartInput = {
  id: C,
  type: "MULTIPLE_CHOICE",
  marks: 1,
  partLabel: "(c)",
  partOrder: 2,
  payload: { selectMode: "single" },
  answerSpec: null,
  options: [
    { key: "A", isCorrect: false },
    { key: "B", isCorrect: true },
  ],
};

function structured(parts: unknown[] | null, partsInput: MarkingPartInput[] = [partA, partB, partC], marks = 4) {
  return markResponse({
    type: "STRUCTURED",
    marks,
    payload: null,
    answerSpec: null,
    parts: partsInput,
    response: parts === null ? null : { type: "STRUCTURED", parts },
  });
}

describe("structured", () => {
  it("marks each part by its own type and sums the marks", () => {
    const r = structured([
      { partId: A, text: "x² + 3x" },
      { partId: B, value: "5" },
      { partId: C, response: { type: "MULTIPLE_CHOICE", optionKeys: ["B"] } },
    ]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 4, maxMarks: 4, isCorrect: true });
    expect(r.feedback.perPart?.map((p) => [p.partLabel, p.result.marksAwarded])).toEqual([
      ["(a)", 1],
      ["(b)", 2],
      ["(c)", 1],
    ]);
  });

  it("gives partial credit across parts; unanswered parts score zero", () => {
    const r = structured([{ partId: B, value: "5" }]);
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 2, isCorrect: null });
    expect(r.feedback.perPart?.map((p) => p.result.status)).toEqual(["UNANSWERED", "MARKED", "UNANSWERED"]);
  });

  it("orders parts by partOrder regardless of input order", () => {
    const r = structured([], [partC, partA, partB]);
    expect(r.feedback.perPart?.map((p) => p.partLabel)).toEqual(["(a)", "(b)", "(c)"]);
  });

  it("is unanswered only when every part is", () => {
    expect(structured([])).toMatchObject({ status: "UNANSWERED", marksAwarded: 0 });
    expect(structured(null)).toMatchObject({ status: "UNANSWERED" });
    expect(structured([{ partId: A, text: "  " }])).toMatchObject({ status: "UNANSWERED" });
  });

  it("mixes auto-marked and AI-marked parts (PENDING_AI wins)", () => {
    const essayPart: MarkingPartInput = { id: C, type: "ESSAY", marks: 4, partLabel: "(c)", partOrder: 2, markingMode: "AI_ASSISTED", payload: null, answerSpec: essaySpec };
    const r = structured(
      [
        { partId: A, text: "x(x+3)" },
        { partId: C, text: "Because the area grows quadratically." },
      ],
      [partA, partB, essayPart],
      7,
    );
    expect(r).toMatchObject({ status: "PENDING_AI", marksAwarded: 1, pendingMarks: 4, isCorrect: null });
  });

  it("needs review when a part needs a human", () => {
    const manual: MarkingPartInput = { ...partA, markingMode: "MANUAL" };
    expect(structured([{ partId: A, text: "x^2+3x" }], [manual, partB, partC]).status).toBe("NEEDS_REVIEW");
  });

  it("supports one level of nested parts, (b)(i) and (b)(ii)", () => {
    const nested: MarkingPartInput = {
      id: B,
      type: "STRUCTURED",
      marks: 2,
      partLabel: "(b)",
      partOrder: 1,
      payload: null,
      answerSpec: null,
      parts: [
        { id: BI, type: "NUMERICAL", marks: 1, partLabel: "(i)", partOrder: 0, payload: null, answerSpec: { value: 5 } },
        { id: BII, type: "TRUE_FALSE", marks: 1, partLabel: "(ii)", partOrder: 1, payload: null, answerSpec: { correct: false } },
      ],
    };
    const r = structured(
      [
        { partId: BI, value: "5" },
        { partId: BII, value: "false" },
      ],
      [partA, nested],
      3,
    );
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 2 });
    expect(r.feedback.perPart?.[1]?.result.feedback.perPart?.map((p) => p.result.marksAwarded)).toEqual([1, 1]);
  });

  it("refuses nesting deeper than (b)(i)", () => {
    const deep: MarkingPartInput = {
      id: B,
      type: "STRUCTURED",
      marks: 1,
      partLabel: "(b)",
      payload: null,
      answerSpec: null,
      parts: [{ id: BI, type: "STRUCTURED", marks: 1, partLabel: "(i)", payload: null, answerSpec: null, parts: [{ ...partA, id: BII }] }],
    };
    const r = structured([{ partId: BII, text: "x^2+3x" }], [partA, deep], 2);
    expect(r.feedback.flags).toContain("DEPTH_EXCEEDED");
    expect(r.status).toBe("NEEDS_REVIEW");
  });

  it("scales when the parts' marks do not add up to the root's", () => {
    const r = structured([{ partId: B, value: "5" }], [partA, partB, partC], 8);
    expect(r.marksAwarded).toBe(4);
    expect(r.feedback.flags).toContain("MARKS_MISMATCH");
  });

  it("flags unknown, duplicate and mistyped part entries", () => {
    const r = structured([
      { partId: randomUUID(), text: "?" },
      { partId: B, value: "5" },
      { partId: B, value: "6" },
      { partId: C, response: { type: "TRUE_FALSE", value: true } },
    ]);
    expect(r.marksAwarded).toBe(2);
    expect(r.feedback.flags).toEqual(expect.arrayContaining(["UNKNOWN_TARGET", "DUPLICATE_ENTRY", "RESPONSE_TYPE_MISMATCH"]));
  });

  it("refuses a structured question with an answer spec or without parts", () => {
    expect(markResponse({ type: "STRUCTURED", marks: 1, payload: null, answerSpec: { value: 1 }, parts: [partA], response: null }).feedback.flags).toContain("SPEC_INVALID");
    expect(structured([], [], 1).feedback.flags).toContain("SPEC_INVALID");
  });

  it("rejects part ids that are not uuids", () => {
    expect(structured([{ partId: "../x", text: "a" }]).feedback.flags).toContain("RESPONSE_INVALID");
  });
});
