import { describe, expect, it } from "vitest";
import { questionResponseSchema, RESPONSE_SCHEMAS } from "@/lib/questions";
import {
  blankText,
  chooseOption,
  diagramLabelOf,
  feedbackOutcome,
  leafPartIds,
  marksText,
  matchedRight,
  numericFields,
  numericResponse,
  partResponseOf,
  responseOfType,
  setBlank,
  setDiagramLabel,
  setMatchingPair,
  setPartResponse,
  textResponse,
  toggleOption,
  trueFalse,
} from "./response-model";
import type { PresentedQuestion } from "./types";

const PART_A = "0199a1b2-0000-7000-8000-00000000000a";
const PART_B = "0199a1b2-0000-7000-8000-00000000000b";
const PART_B1 = "0199a1b2-0000-7000-8000-0000000000b1";

/** Every value the helpers produce must parse with the stored-response schema (and its per-type schema). */
function expectValid(value: unknown): void {
  expect(questionResponseSchema.safeParse(value).success).toBe(true);
  const type = (value as { type: keyof typeof RESPONSE_SCHEMAS }).type;
  expect(RESPONSE_SCHEMAS[type].safeParse(value).success).toBe(true);
}

describe("selected response", () => {
  it("single choice serialises one option key", () => {
    const value = chooseOption("B");
    expect(value).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["B"] });
    expectValid(value);
  });

  it("multi-select keeps display order and clears to null", () => {
    const order = ["C", "A", "B"];
    let value = toggleOption(null, "B", true, order);
    value = toggleOption(value, "C", true, order);
    expect(value).toEqual({ type: "MULTIPLE_CHOICE", optionKeys: ["C", "B"] });
    expectValid(value);
    value = toggleOption(value, "C", false, order);
    value = toggleOption(value, "B", false, order);
    expect(value).toBeNull();
  });

  it("true / false", () => {
    expect(trueFalse(false)).toEqual({ type: "TRUE_FALSE", value: false });
    expectValid(trueFalse(true));
  });
});

describe("text and numbers", () => {
  it("text answers keep the text as typed; empty is null", () => {
    expect(textResponse("SHORT_ANSWER", "Oxygen ")).toEqual({ type: "SHORT_ANSWER", text: "Oxygen " });
    expectValid(textResponse("ESSAY", "An essay."));
    expectValid(textResponse("EXTENDED_RESPONSE", "Longer."));
    expect(textResponse("SHORT_ANSWER", "")).toBeNull();
  });

  it("numeric answers record the displayed unit hint as the unit", () => {
    const value = numericResponse("CALCULATION", { value: "60", working: "150 / 2.5" }, "km/h");
    expect(value).toEqual({ type: "CALCULATION", value: "60", unit: "km/h", working: "150 / 2.5" });
    expectValid(value);
  });

  it("numeric answers use the typed unit only without a hint, and drop blank units", () => {
    expect(numericResponse("NUMERICAL", { value: "5", unit: "cm" }, null)).toEqual({ type: "NUMERICAL", value: "5", unit: "cm" });
    expect(numericResponse("NUMERICAL", { value: "5", unit: "  " }, null)).toEqual({ type: "NUMERICAL", value: "5" });
    expectValid(numericResponse("NUMERICAL", { value: "-1.5e-3" }, null));
  });

  it("numeric: nothing typed is null; working alone is kept (method marks)", () => {
    expect(numericResponse("NUMERICAL", { value: "", unit: "cm" }, null)).toBeNull();
    const working = numericResponse("CALCULATION", { value: "", working: "d = s × t" }, "km/h");
    expect(working).toEqual({ type: "CALCULATION", value: "", working: "d = s × t" });
    expectValid(working);
  });

  it("numericFields reads a saved response back", () => {
    expect(numericFields({ type: "NUMERICAL", value: "5", unit: "cm" })).toEqual({ value: "5", unit: "cm", working: "" });
    expect(numericFields(null)).toEqual({ value: "", unit: "", working: "" });
  });
});

describe("pairing and blanks", () => {
  it("matching pairs follow the left order; clearing removes the pair", () => {
    const left = ["l1", "l2", "l3"];
    let value = setMatchingPair(null, "l3", "r1", left);
    value = setMatchingPair(value, "l1", "r2", left);
    expect(value).toEqual({ type: "MATCHING", pairs: [{ leftId: "l1", rightId: "r2" }, { leftId: "l3", rightId: "r1" }] });
    expectValid(value);
    expect(matchedRight(value, "l3")).toBe("r1");
    value = setMatchingPair(value, "l1", "r3", left);
    expect(matchedRight(value, "l1")).toBe("r3");
    value = setMatchingPair(setMatchingPair(value, "l1", "", left), "l3", "", left);
    expect(value).toBeNull();
  });

  it("blanks keep template order and drop empty blanks", () => {
    const order = ["b1", "b2"];
    let value = setBlank(null, "b2", "100", order);
    value = setBlank(value, "b1", "Harare", order);
    expect(value).toEqual({ type: "FILL_IN_THE_BLANK", blanks: [{ blankId: "b1", text: "Harare" }, { blankId: "b2", text: "100" }] });
    expectValid(value);
    expect(blankText(value, "b2")).toBe("100");
    expect(setBlank(setBlank(value, "b1", "", order), "b2", "", order)).toBeNull();
  });

  it("diagram labels: word bank ids or free text per hotspot", () => {
    const order = ["h1", "h2"];
    let value = setDiagramLabel(null, "h2", { labelId: "L3" }, order);
    value = setDiagramLabel(value, "h1", { text: "nucleus" }, order);
    expect(value).toEqual({ type: "DIAGRAM_LABELLING", labels: [{ targetId: "h1", text: "nucleus" }, { targetId: "h2", labelId: "L3" }] });
    expectValid(value);
    expect(diagramLabelOf(value, "h2")).toEqual({ labelId: "L3", text: "" });
    expect(setDiagramLabel(setDiagramLabel(value, "h1", { text: "" }, order), "h2", { labelId: "" }, order)).toBeNull();
  });
});

describe("structured questions", () => {
  const leaf = (id: string, partLabel: string): PresentedQuestion => ({
    id,
    type: "SHORT_ANSWER",
    markingMode: "AUTO",
    marks: 1,
    partLabel,
    stemHtml: "" as PresentedQuestion["stemHtml"],
    interaction: { type: "SHORT_ANSWER", maxLength: null },
    hintCount: 0,
    calculatorAllowed: null,
    estimatedSeconds: null,
    parts: [],
  });

  it("finds leaf parts depth-first", () => {
    const question = { parts: [leaf(PART_A, "(a)"), { ...leaf(PART_B, "(b)"), parts: [leaf(PART_B1, "(b)(i)")] }] };
    expect(leafPartIds(question)).toEqual([PART_A, PART_B1]);
  });

  it("combines typed part responses into one STRUCTURED response", () => {
    const order = [PART_A, PART_B1];
    let value = setPartResponse(null, PART_B1, { type: "NUMERICAL", value: "5" }, order);
    value = setPartResponse(value, PART_A, { type: "SHORT_ANSWER", text: "x^2 + 3x" }, order);
    expect(value).toEqual({
      type: "STRUCTURED",
      parts: [
        { partId: PART_A, response: { type: "SHORT_ANSWER", text: "x^2 + 3x" } },
        { partId: PART_B1, response: { type: "NUMERICAL", value: "5" } },
      ],
    });
    expectValid(value);
    expect(partResponseOf(value, PART_B1)).toEqual({ type: "NUMERICAL", value: "5" });
    expect(setPartResponse(setPartResponse(value, PART_A, null, order), PART_B1, null, order)).toBeNull();
  });
});

describe("helpers", () => {
  it("responseOfType ignores other shapes", () => {
    expect(responseOfType({ type: "TRUE_FALSE", value: true }, "TRUE_FALSE")).toEqual({ type: "TRUE_FALSE", value: true });
    expect(responseOfType({ type: "TRUE_FALSE", value: true }, "MULTIPLE_CHOICE")).toBeNull();
    expect(responseOfType(null, "ESSAY")).toBeNull();
  });

  it("classifies marking results", () => {
    const base = { marksAvailable: 3 };
    expect(feedbackOutcome({ ...base, status: "AUTO_MARKED", marksAwarded: 3, isCorrect: true })).toBe("correct");
    expect(feedbackOutcome({ ...base, status: "AI_MARKED", marksAwarded: 2, isCorrect: false })).toBe("partial");
    expect(feedbackOutcome({ ...base, status: "AUTO_MARKED", marksAwarded: 0, isCorrect: false })).toBe("incorrect");
    expect(feedbackOutcome({ ...base, status: "SELF_ASSESSED", marksAwarded: 3, isCorrect: null })).toBe("correct");
    expect(feedbackOutcome({ ...base, status: "PENDING", marksAwarded: null, isCorrect: null })).toBe("pending");
    expect(feedbackOutcome({ ...base, status: "NEEDS_REVIEW", marksAwarded: 1, isCorrect: null })).toBe("review");
    expect(feedbackOutcome({ ...base, status: "UNANSWERED", marksAwarded: 0, isCorrect: false })).toBe("unanswered");
  });

  it("marks text", () => {
    expect(marksText(1)).toBe("1 mark");
    expect(marksText(3)).toBe("3 marks");
  });
});
