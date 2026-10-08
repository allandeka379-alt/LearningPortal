import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { sampleQuestion } from "../../../tests/factories/questions";
import { QUESTION_TYPES, isMarkingMode, isQuestionType } from "./constants";
import { parseAnswerSpec, parseQuestionPayload, parseResponse, safeParseAnswerSpec, safeParseQuestionPayload, safeParseResponse } from "./parse";
import { partEntryToResponse } from "./response";

describe("constants", () => {
  it("covers the 11 §9 question types", () => {
    expect(QUESTION_TYPES).toHaveLength(11);
    expect(isQuestionType("MATCHING")).toBe(true);
    expect(isQuestionType("matching")).toBe(false);
    expect(isQuestionType(undefined)).toBe(false);
    expect(isMarkingMode("AI_ASSISTED")).toBe(true);
    expect(isMarkingMode("AI")).toBe(false);
  });
});

describe("payload and answer-spec schemas accept the samples of every type", () => {
  it.each(QUESTION_TYPES.map((t) => [t]))("%s", (type) => {
    const sample = sampleQuestion(type);
    expect(safeParseQuestionPayload(type, sample.payload).success).toBe(true);
    expect(safeParseAnswerSpec(type, sample.answerSpec).success).toBe(true);
  });
});

describe("documented contract shapes (prisma/schema.prisma, ARCHITECTURE §4.5) parse unchanged", () => {
  it.each<[string, Parameters<typeof parseAnswerSpec>[0], unknown]>([
    ["MCQ", "MULTIPLE_CHOICE", { scoring: "partial" }],
    ["true/false", "TRUE_FALSE", { correct: true, feedbackTrue: "Yes", feedbackFalse: "No" }],
    ["short answer", "SHORT_ANSWER", { accepted: [{ value: "oxygen" }, { value: "O2", caseSensitive: true }], patterns: ["^o2$"], keywords: { all: ["a"], any: ["b"], minAny: 1 }, normalise: ["trim", "lowercase"] }],
    ["numerical", "NUMERICAL", { value: 3.14, tolerance: { kind: "relative", amount: 0.01 }, sigFigs: { min: 2, max: 4 }, decimalPlaces: 2, units: { required: true, accepted: ["m"], penaltyMarks: 1 } }],
    ["calculation", "CALCULATION", { value: 60, methodMarks: [{ id: "M1", description: "distance ÷ time", marks: 1 }] }],
    ["matching", "MATCHING", { pairs: [{ leftId: "l1", rightId: "r1" }], marksPerPair: 1 }],
    ["blanks", "FILL_IN_THE_BLANK", { blanks: [{ id: "b1", accepted: ["Harare"], caseSensitive: false, tolerance: 0 }] }],
    ["labelling", "DIAGRAM_LABELLING", { hotspots: [{ hotspotId: "h1", labelId: "L1" }, { hotspotId: "h2", accepted: ["xylem"] }] }],
    ["essay", "ESSAY", { markScheme: { points: [{ id: "P1", description: "Defines", marks: 2, indicators: ["defin"] }], levels: [{ level: 3, minMarks: 7, maxMarks: 10, descriptor: "Sustained" }] }, modelAnswer: "…" }],
  ])("%s answer spec", (_label, type, spec) => {
    expect(() => parseAnswerSpec(type, spec)).not.toThrow();
  });

  it("accepts markingNotes on any type", () => {
    expect(safeParseAnswerSpec("TRUE_FALSE", { correct: false, markingNotes: "Accept 'F'." }).success).toBe(true);
  });

  it.each<[Parameters<typeof parseQuestionPayload>[0], unknown]>([
    ["MULTIPLE_CHOICE", { selectMode: "multiple", shuffleOptions: true }],
    ["TRUE_FALSE", { statementStyle: "yes_no" }],
    ["MATCHING", { left: [{ id: "l1", content: "A" }], right: [{ id: "r1", content: "B" }], shuffle: false }],
    ["FILL_IN_THE_BLANK", { template: "x {{blank:b1}}", blanks: [{ id: "b1", input: "select", choices: ["a", "b"] }] }],
    ["DIAGRAM_LABELLING", { mediaAssetId: "01990000-0000-7000-8000-000000000001", hotspots: [{ id: "h1", x: 0, y: 100, w: 5, h: 5 }] }],
    ["NUMERICAL", { unitHint: "km/h", answerPrefix: "x =" }],
    ["ESSAY", { wordLimit: { min: 100, max: 400 } }],
  ])("%s payload", (type, payload) => {
    expect(() => parseQuestionPayload(type, payload)).not.toThrow();
  });
});

describe("defaults", () => {
  it("fills MCQ, true/false and matching defaults", () => {
    expect(parseQuestionPayload("MULTIPLE_CHOICE", null)).toEqual({ selectMode: "single", shuffleOptions: false });
    expect(parseAnswerSpec("MULTIPLE_CHOICE", null)).toEqual({ scoring: "all_or_nothing" });
    expect(parseQuestionPayload("TRUE_FALSE", null)).toEqual({ statementStyle: "true_false" });
    expect(parseQuestionPayload("MATCHING", { left: [{ id: "l", content: "a" }], right: [{ id: "r", content: "b" }] }).shuffle).toBe(true);
    expect(parseQuestionPayload("NUMERICAL", null)).toEqual({});
    expect(parseQuestionPayload("STRUCTURED", undefined)).toBeNull();
    expect(parseAnswerSpec("SHORT_ANSWER", { patterns: ["^a$"] }).accepted).toEqual([]);
    expect(parseAnswerSpec("NUMERICAL", { value: 1, units: { accepted: ["m"] } }).units?.required).toBe(false);
  });
});

describe("strictness and invariants", () => {
  it.each<[string, Parameters<typeof parseAnswerSpec>[0], unknown]>([
    ["unknown key", "TRUE_FALSE", { correct: true, corect: false }],
    ["structured spec", "STRUCTURED", {}],
    ["empty short answer spec", "SHORT_ANSWER", { accepted: [] }],
    ["blank accepted answer", "SHORT_ANSWER", { accepted: [{ value: "   " }] }],
    ["unsafe pattern", "SHORT_ANSWER", { patterns: ["(a+)+"] }],
    // INJ-1: each pattern is accepted alone, but together they exceed the per-spec matching budget.
    ["patterns over the spec budget", "SHORT_ANSWER", { patterns: ["v", "w", "x", "y", "z"].map((c) => `^.{0,60}.{0,60}.{0,60}.{0,60}${c}$`) }],
    ["a pattern expanding past the program budget", "SHORT_ANSWER", { patterns: ["^.{0,99}.{0,99}.{0,99}.{0,19}x$"] }],
    ["minAny above any", "SHORT_ANSWER", { keywords: { any: ["a"], minAny: 2 } }],
    ["fractional marks", "SHORT_ANSWER", { accepted: [{ value: "a", marks: 0.5 }] }],
    ["relative tolerance as a percentage", "NUMERICAL", { value: 1, tolerance: { kind: "relative", amount: 5 } }],
    ["sig figs min > max", "NUMERICAL", { value: 1, sigFigs: { min: 4, max: 2 } }],
    ["empty sig figs", "NUMERICAL", { value: 1, sigFigs: {} }],
    ["conversion duplicating an accepted unit", "NUMERICAL", { value: 1, units: { accepted: ["km/h"], conversions: [{ unit: "km h^-1", factor: 1 }] } }],
    ["zero conversion factor", "NUMERICAL", { value: 1, units: { accepted: ["m"], conversions: [{ unit: "cm", factor: 0 }] } }],
    ["duplicate method ids", "CALCULATION", { value: 1, methodMarks: [{ id: "M", description: "a", marks: 1 }, { id: "M", description: "b", marks: 1 }] }],
    ["duplicate pairs", "MATCHING", { pairs: [{ leftId: "l", rightId: "r" }, { leftId: "l", rightId: "r" }] }],
    ["duplicate blanks", "FILL_IN_THE_BLANK", { blanks: [{ id: "b", accepted: ["a"] }, { id: "b", accepted: ["c"] }] }],
    ["hotspot without an answer", "DIAGRAM_LABELLING", { hotspots: [{ hotspotId: "h1" }] }],
    ["essay without points", "ESSAY", { markScheme: { points: [] } }],
    ["level min > max", "ESSAY", { markScheme: { points: [{ id: "P", description: "d", marks: 1 }], levels: [{ level: 1, minMarks: 3, maxMarks: 2, descriptor: "x" }] } }],
    ["id with path characters", "MATCHING", { pairs: [{ leftId: "../l", rightId: "r" }] }],
  ])("rejects %s", (_label, type, spec) => {
    expect(safeParseAnswerSpec(type, spec).success).toBe(false);
  });

  it.each<[string, Parameters<typeof parseQuestionPayload>[0], unknown]>([
    ["MCQ select mode", "MULTIPLE_CHOICE", { selectMode: "many" }],
    ["structured payload", "STRUCTURED", { anything: true }],
    ["duplicate left ids", "MATCHING", { left: [{ id: "a", content: "x" }, { id: "a", content: "y" }], right: [{ id: "r", content: "z" }] }],
    ["blank missing from template", "FILL_IN_THE_BLANK", { template: "no blanks", blanks: [{ id: "b1" }] }],
    ["blank used twice", "FILL_IN_THE_BLANK", { template: "{{blank:b1}} {{blank:b1}}", blanks: [{ id: "b1" }] }],
    ["select without choices", "FILL_IN_THE_BLANK", { template: "{{blank:b1}}", blanks: [{ id: "b1", input: "select" }] }],
    ["hotspot outside the image", "DIAGRAM_LABELLING", { mediaAssetId: "01990000-0000-7000-8000-000000000001", hotspots: [{ id: "h", x: 101, y: 0 }] }],
    ["media id that is not a uuid", "DIAGRAM_LABELLING", { mediaAssetId: "javascript:alert(1)", hotspots: [{ id: "h", x: 1, y: 1 }] }],
    ["word limit min > max", "ESSAY", { wordLimit: { min: 10, max: 5 } }],
  ])("rejects payload: %s", (_label, type, payload) => {
    expect(safeParseQuestionPayload(type, payload).success).toBe(false);
  });

  it("throws ZodError from the throwing variants", () => {
    expect(() => parseAnswerSpec("TRUE_FALSE", {})).toThrow(ZodError);
    expect(() => parseQuestionPayload("MATCHING", null)).toThrow(ZodError);
  });
});

describe("responses", () => {
  it("returns null for no answer", () => {
    expect(parseResponse("NUMERICAL", null)).toBeNull();
    expect(parseResponse("NUMERICAL", undefined)).toBeNull();
    expect(safeParseResponse("ESSAY", null)).toEqual({ success: true, data: null });
  });

  it.each<[Parameters<typeof parseResponse>[0], unknown]>([
    ["MULTIPLE_CHOICE", { type: "MULTIPLE_CHOICE", optionKeys: ["A", "C"] }],
    ["TRUE_FALSE", { type: "TRUE_FALSE", value: false }],
    ["SHORT_ANSWER", { type: "SHORT_ANSWER", text: "oxygen" }],
    ["NUMERICAL", { type: "NUMERICAL", value: "60", unit: "km/h" }],
    ["CALCULATION", { type: "CALCULATION", value: "60", unit: "km/h", working: "150 / 2.5" }],
    ["STRUCTURED", { type: "STRUCTURED", parts: [{ partId: "01990000-0000-7000-8000-000000000001", text: "x^2" }] }],
    ["MATCHING", { type: "MATCHING", pairs: [{ leftId: "l1", rightId: "r1" }] }],
    ["FILL_IN_THE_BLANK", { type: "FILL_IN_THE_BLANK", blanks: [{ blankId: "b1", text: "harare" }] }],
    ["DIAGRAM_LABELLING", { type: "DIAGRAM_LABELLING", labels: [{ targetId: "h1", labelId: "L1" }, { targetId: "h2", text: "xylem" }] }],
    ["ESSAY", { type: "ESSAY", text: "…" }],
    ["EXTENDED_RESPONSE", { type: "EXTENDED_RESPONSE", text: "…" }],
  ])("accepts the documented %s response", (type, response) => {
    expect(parseResponse(type, response)).toEqual(response);
  });

  it.each<[string, Parameters<typeof parseResponse>[0], unknown]>([
    ["mismatched type", "NUMERICAL", { type: "SHORT_ANSWER", text: "5" }],
    ["unknown key", "SHORT_ANSWER", { type: "SHORT_ANSWER", text: "a", score: 10 }],
    ["over-long short answer", "SHORT_ANSWER", { type: "SHORT_ANSWER", text: "a".repeat(2_001) }],
    ["over-long number", "NUMERICAL", { type: "NUMERICAL", value: "1".repeat(65) }],
    ["too many option keys", "MULTIPLE_CHOICE", { type: "MULTIPLE_CHOICE", optionKeys: Array.from({ length: 27 }, (_, i) => `K${i}`) }],
    ["option key with symbols", "MULTIPLE_CHOICE", { type: "MULTIPLE_CHOICE", optionKeys: ["A;DROP"] }],
    ["non-uuid part id", "STRUCTURED", { type: "STRUCTURED", parts: [{ partId: "a" }] }],
    ["nested structured response", "STRUCTURED", { type: "STRUCTURED", parts: [{ partId: "01990000-0000-7000-8000-000000000001", response: { type: "STRUCTURED", parts: [] } }] }],
  ])("rejects %s", (_label, type, response) => {
    expect(safeParseResponse(type, response).success).toBe(false);
  });
});

describe("partEntryToResponse", () => {
  const partId = "01990000-0000-7000-8000-000000000001";

  it("converts the documented simple entries", () => {
    expect(partEntryToResponse({ partId, text: "x^2" }, "SHORT_ANSWER")).toEqual({ type: "SHORT_ANSWER", text: "x^2" });
    expect(partEntryToResponse({ partId, value: "5", unit: "cm" }, "NUMERICAL")).toEqual({ type: "NUMERICAL", value: "5", unit: "cm" });
    expect(partEntryToResponse({ partId, text: "5" }, "NUMERICAL")).toEqual({ type: "NUMERICAL", value: "5" });
    expect(partEntryToResponse({ partId, value: "60", text: "150/2.5" }, "CALCULATION")).toEqual({ type: "CALCULATION", value: "60", working: "150/2.5" });
    expect(partEntryToResponse({ partId, value: "Yes" }, "TRUE_FALSE")).toEqual({ type: "TRUE_FALSE", value: true });
    expect(partEntryToResponse({ partId, value: "B" }, "MULTIPLE_CHOICE")).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["B"] });
  });

  it("uses an explicit typed response and refuses mismatches", () => {
    const response = { type: "MATCHING" as const, pairs: [{ leftId: "l", rightId: "r" }] };
    expect(partEntryToResponse({ partId, response }, "MATCHING")).toEqual(response);
    expect(partEntryToResponse({ partId, response }, "SHORT_ANSWER")).toBeNull();
    expect(partEntryToResponse({ partId, text: "maybe" }, "TRUE_FALSE")).toBeNull();
    expect(partEntryToResponse({ partId, text: "l1-r1" }, "MATCHING")).toBeNull();
  });
});
