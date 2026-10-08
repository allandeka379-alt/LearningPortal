import { describe, expect, it } from "vitest";
import { sampleQuestion } from "../../../tests/factories/questions";
import { QUESTION_TYPES } from "./constants";
import { formatCorrectAnswer, formatExpectedNumber } from "./answer-display";
import { validateQuestionDefinition, type QuestionDefinitionInput } from "./validate";
import { withinTolerance } from "./tolerance";

function messages(def: QuestionDefinitionInput, severity: "error" | "warning" = "error"): string[] {
  return validateQuestionDefinition(def)
    .issues.filter((i) => i.severity === severity)
    .map((i) => `${i.path.join(".")}: ${i.message}`);
}

const sample = (type: Parameters<typeof sampleQuestion>[0], overrides: Parameters<typeof sampleQuestion>[1] = {}) =>
  sampleQuestion(type, overrides, { validate: false });

describe("validateQuestionDefinition", () => {
  it.each(QUESTION_TYPES.map((t) => [t]))("accepts the %s sample", (type) => {
    expect(validateQuestionDefinition(sampleQuestion(type)).valid).toBe(true);
  });

  it("checks marks", () => {
    expect(messages(sample("TRUE_FALSE", { marks: 0 }))).toContain("marks: Marks must be a whole number from 1 to 1000.");
    expect(messages(sample("TRUE_FALSE", { marks: 1.5 })).length).toBeGreaterThan(0);
  });

  it("checks MCQ options", () => {
    const base = sample("MULTIPLE_CHOICE");
    expect(messages({ ...base, options: base.options.slice(0, 1) })).toEqual(expect.arrayContaining([expect.stringMatching(/at least two options/)]));
    expect(messages({ ...base, options: base.options.map((o) => ({ ...o, isCorrect: false })) })).toEqual(expect.arrayContaining([expect.stringMatching(/at least one option as correct/)]));
    expect(messages({ ...base, options: [...base.options, { ...base.options[0]!, isCorrect: false }] })).toEqual(expect.arrayContaining([expect.stringMatching(/Duplicate option key/)]));
    expect(messages({ ...base, options: base.options.map((o, i) => (i === 0 ? { ...o, key: "A B" } : o)) })).toEqual(expect.arrayContaining([expect.stringMatching(/letters or digits/)]));
    expect(messages({ ...base, options: base.options.map((o) => ({ ...o, isCorrect: true })) }, "warning")).toEqual(expect.arrayContaining([expect.stringMatching(/any one of them is accepted/)]));
  });

  // INJ-1: every part may be within its own budget while the question as a whole adds up too much matching work.
  it("bounds the answer-pattern work of a whole question", () => {
    const heavy = ["v", "w", "x", "y"].map((c) => `^.{0,60}.{0,60}.{0,60}.{0,60}${c}$`);
    const part = (label: string): QuestionDefinitionInput => ({ type: "SHORT_ANSWER", markingMode: "AUTO", marks: 1, partLabel: label, payload: null, answerSpec: { accepted: [], patterns: heavy } });
    const structured = (count: number): QuestionDefinitionInput => ({ type: "STRUCTURED", markingMode: "AUTO", marks: count, payload: null, answerSpec: null, parts: Array.from({ length: count }, (_, i) => part(`(${i + 1})`)) });
    expect(validateQuestionDefinition(structured(2)).valid).toBe(true);
    const over = validateQuestionDefinition(structured(3));
    expect(over.valid).toBe(false);
    expect(over.issues).toEqual(expect.arrayContaining([expect.objectContaining({ severity: "error", path: ["parts"], message: expect.stringMatching(/too long in total/) })]));
  });

  it("refuses options or parts on the wrong type", () => {
    expect(messages({ ...sample("TRUE_FALSE"), options: [{ key: "A", isCorrect: true }] })).toEqual(expect.arrayContaining([expect.stringMatching(/Only multiple-choice/)]));
    expect(messages({ ...sample("TRUE_FALSE"), parts: sample("STRUCTURED").parts })).toEqual(expect.arrayContaining([expect.stringMatching(/Only structured/)]));
  });

  it("refuses auto-marked essays", () => {
    expect(messages(sample("ESSAY", { markingMode: "AUTO" }))).toEqual(expect.arrayContaining([expect.stringMatching(/cannot be auto-marked/)]));
    expect(messages(sample("EXTENDED_RESPONSE", { markingMode: "AUTO" }))).toHaveLength(1);
  });

  it("warns about pointless marking modes", () => {
    expect(messages(sample("MATCHING", { markingMode: "MANUAL" }), "warning")).toHaveLength(1);
    expect(messages(sample("MATCHING", { markingMode: "AI_ASSISTED" }), "warning")).toHaveLength(1);
  });

  it("rejects numeric specs that no correctly rounded answer satisfies", () => {
    const def = sample("NUMERICAL", { answerSpec: { value: 3.14159, sigFigs: { min: 3, max: 3 } } });
    expect(messages(def)).toEqual(expect.arrayContaining([expect.stringMatching(/\(3\.14\) would be outside the tolerance/)]));
    expect(validateQuestionDefinition(sample("NUMERICAL", { answerSpec: { value: 3.14159, sigFigs: { min: 3 }, tolerance: { kind: "absolute", amount: 0.005 } } })).valid).toBe(true);
  });

  it("checks calculation method marks", () => {
    const def = sample("CALCULATION", { marks: 1 });
    expect(messages(def)).toEqual(expect.arrayContaining([expect.stringMatching(/at least one mark for the final answer/)]));
    expect(messages(sample("CALCULATION", { markingMode: "AUTO" }), "warning")).toEqual(expect.arrayContaining([expect.stringMatching(/routed to AI marking/)]));
  });

  it("checks penalties against marks", () => {
    const def = sample("NUMERICAL", { answerSpec: { value: 5, precisionPenaltyMarks: 3, units: { accepted: ["m"], penaltyMarks: 2 } } });
    expect(messages(def)).toHaveLength(2);
  });

  it("checks matching ids and coverage", () => {
    const base = sample("MATCHING");
    expect(messages({ ...base, answerSpec: { pairs: [{ leftId: "l1", rightId: "r9" }, { leftId: "l2", rightId: "r2" }, { leftId: "l3", rightId: "r3" }] } })).toEqual(
      expect.arrayContaining([expect.stringMatching(/Unknown right item "r9"/)]),
    );
    expect(messages({ ...base, answerSpec: { pairs: [{ leftId: "l1", rightId: "r1" }] } })).toEqual(expect.arrayContaining([expect.stringMatching(/"l2" has no correct match/)]));
    expect(messages({ ...base, answerSpec: { pairs: [{ leftId: "l1", rightId: "r1" }, { leftId: "l2", rightId: "r2" }, { leftId: "l3", rightId: "r3" }], marksPerPair: 2 } }, "warning")).toHaveLength(1);
  });

  it("checks blanks against the payload", () => {
    const base = sample("FILL_IN_THE_BLANK");
    expect(messages({ ...base, answerSpec: { blanks: [{ id: "b1", accepted: ["Harare"] }] } })).toEqual(expect.arrayContaining([expect.stringMatching(/"b2" has no accepted answers/)]));
    expect(messages({ ...base, answerSpec: { blanks: [{ id: "b1", accepted: ["Harare"] }, { id: "b2", accepted: ["one hundred"] }] } })).toEqual(
      expect.arrayContaining([expect.stringMatching(/"one hundred" is not a number/)]),
    );
    const select = {
      ...base,
      payload: { template: "{{blank:b1}}", blanks: [{ id: "b1", input: "select", choices: ["Harare", "Bulawayo"] }] },
      answerSpec: { blanks: [{ id: "b1", accepted: ["Mutare"] }] },
    };
    expect(messages(select)).toEqual(expect.arrayContaining([expect.stringMatching(/not one of the choices/)]));
    const weighted = { ...base, answerSpec: { blanks: [{ id: "b1", accepted: ["Harare"], marks: 2 }, { id: "b2", accepted: ["100"], marks: 2 }] } };
    expect(messages(weighted)).toEqual(expect.arrayContaining([expect.stringMatching(/more than the question's 2/)]));
  });

  it("checks diagram labels against the payload", () => {
    const base = sample("DIAGRAM_LABELLING");
    expect(messages({ ...base, answerSpec: { hotspots: [{ hotspotId: "h1", labelId: "L9" }, { hotspotId: "h2", labelId: "L2" }, { hotspotId: "h3", labelId: "L3" }] } })).toEqual(
      expect.arrayContaining([expect.stringMatching(/Unknown label "L9"/)]),
    );
    const freeText = { ...base, payload: { mediaAssetId: "01990000-0000-7000-8000-000000000001", hotspots: [{ id: "h1", x: 1, y: 1 }] }, answerSpec: { hotspots: [{ hotspotId: "h1", labelId: "L1" }] }, marks: 1 };
    expect(messages(freeText)).toEqual(expect.arrayContaining([expect.stringMatching(/needs accepted texts/)]));
  });

  it("checks structured parts: marks add up, labels unique, one nesting level", () => {
    const base = sample("STRUCTURED");
    expect(messages({ ...base, marks: 5 })).toEqual(expect.arrayContaining([expect.stringMatching(/Parts are worth 3 marks/)]));
    expect(messages({ ...base, parts: base.parts.map((p) => ({ ...p, partLabel: "(a)" })) })).toEqual(expect.arrayContaining([expect.stringMatching(/Duplicate part label/)]));
    expect(messages({ ...base, parts: [] })).toEqual(expect.arrayContaining([expect.stringMatching(/at least one part/)]));
    const nested = { ...base, marks: 3, parts: [{ ...base, partLabel: "(a)", parts: [{ ...base, partLabel: "(i)" }] }] };
    expect(messages(nested)).toEqual(expect.arrayContaining([expect.stringMatching(/nest only one level/)]));
    const badPart = { ...base, parts: [{ ...base.parts[0]!, answerSpec: { accepted: [] } }, base.parts[1]!] };
    expect(messages(badPart)).toEqual(expect.arrayContaining([expect.stringMatching(/^parts\.0\.answerSpec/)]));
  });

  it("reports Zod issues with their paths", () => {
    expect(messages(sample("TRUE_FALSE", { answerSpec: { correct: "yes" } }))).toEqual([expect.stringMatching(/^answerSpec\.correct:/)]);
  });
});

describe("answer display helpers", () => {
  it.each<[number, Parameters<typeof formatExpectedNumber>[1], string]>([
    [60, {}, "60"],
    [3.14159, { sigFigs: { min: 3 } }, "3.14"],
    [12.345, { decimalPlaces: 2 }, "12.35"],
    [0.00000015, {}, "1.5×10^-7"],
    [123456, { sigFigs: { min: 2 } }, "1.2×10^5"],
    [-0, {}, "0"],
  ])("formatExpectedNumber(%d, %j) → %s", (value, precision, expected) => {
    expect(formatExpectedNumber(value, precision)).toBe(expected);
  });

  it("formats correct answers for every deterministic type", () => {
    const s = sampleQuestion("DIAGRAM_LABELLING");
    expect(formatCorrectAnswer("DIAGRAM_LABELLING", s.payload as never, s.answerSpec as never)).toBe("1: Nucleus; 2: Cell membrane; 3: Cytoplasm");
    expect(formatCorrectAnswer("ESSAY", null, {})).toBeNull();
  });
});

describe("withinTolerance", () => {
  it.each<[number, number, Parameters<typeof withinTolerance>[2], boolean]>([
    [5, 5, undefined, true],
    [0.1 + 0.2, 0.3, undefined, true],
    [5.0001, 5, undefined, false],
    [0, 0, undefined, true],
    [-0, 0, undefined, true],
    [60.5, 60, { kind: "absolute", amount: 0.5 }, true],
    [60.500001, 60, { kind: "absolute", amount: 0.5 }, false],
    [99, 100, { kind: "relative", amount: 0.01 }, true],
    [0.001, 0, { kind: "relative", amount: 0.5 }, false],
    [Number.NaN, 5, { kind: "absolute", amount: 100 }, false],
    [Number.POSITIVE_INFINITY, 5, { kind: "absolute", amount: 1e308 }, false],
  ])("withinTolerance(%d, %d, %j) → %s", (actual, expected, tolerance, result) => {
    expect(withinTolerance(actual, expected, tolerance)).toBe(result);
  });
});
