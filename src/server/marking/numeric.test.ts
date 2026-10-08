import { describe, expect, it } from "vitest";
import { assessNumericAnswer } from "./numeric";
import { markResponse } from "./mark";

function num(value: string | null, answerSpec: unknown, marks = 2, unit?: string) {
  return markResponse({
    type: "NUMERICAL",
    marks,
    payload: null,
    answerSpec,
    response: value === null ? null : { type: "NUMERICAL", value, ...(unit !== undefined ? { unit } : {}) },
  });
}

describe("numerical — reading the number", () => {
  const spec = { value: 1234.5 };

  it.each(["1234.5", "1,234.5", "1 234.5", "+1234.5", "1.2345e3", "1.2345×10^3", "1.2345 x 10³", "2469/2", "1234 1/2", "１２３４.５"])("accepts %j", (value) => {
    expect(num(value, spec)).toMatchObject({ status: "MARKED", marksAwarded: 2, isCorrect: true });
  });

  it("sends an ambiguous decimal comma to review instead of guessing", () => {
    const r = num("1,5", { value: 1.5 });
    expect(r).toMatchObject({ status: "NEEDS_REVIEW", marksAwarded: 0, isCorrect: null });
    expect(r.feedback.flags).toContain("NUMBER_AMBIGUOUS");
    expect(r.feedback.notes.join(" ")).toMatch(/decimal point/);
  });

  it.each(["abc", "NaN", "Infinity", "1e999", "0x10", "1.2.3", "five"])("marks unreadable %j as wrong", (value) => {
    const r = num(value, { value: 5 });
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 0, isCorrect: false });
    expect(r.feedback.flags.some((f) => f === "NUMBER_INVALID")).toBe(true);
  });

  it("treats a blank value as unanswered", () => {
    expect(num("", { value: 5 })).toMatchObject({ status: "UNANSWERED" });
    expect(num("  ", { value: 5 })).toMatchObject({ status: "UNANSWERED" });
    expect(num(null, { value: 5 })).toMatchObject({ status: "UNANSWERED" });
  });

  it("accepts negative zero for zero", () => {
    expect(num("-0", { value: 0 }).marksAwarded).toBe(2);
    expect(num("-0.0", { value: 0 }).marksAwarded).toBe(2);
  });

  it("is exact up to float noise without a tolerance", () => {
    expect(num("0.3", { value: 0.1 + 0.2 }).marksAwarded).toBe(2);
    expect(num("0.30001", { value: 0.3 }).marksAwarded).toBe(0);
    expect(num("0.0000001", { value: 0 }).marksAwarded).toBe(0);
  });

  it("rejects an over-long value as an invalid response", () => {
    const r = num("9".repeat(100), { value: 9 });
    expect(r.feedback.flags).toContain("RESPONSE_INVALID");
    expect(r.marksAwarded).toBe(0);
  });
});

describe("numerical — tolerance", () => {
  it.each<[string, number]>([
    ["60", 2],
    ["60.5", 2],
    ["59.5", 2],
    ["60.51", 0],
    ["59.4", 0],
  ])("absolute ±0.5 around 60: %j → %i", (value, expected) => {
    expect(num(value, { value: 60, tolerance: { kind: "absolute", amount: 0.5 } }).marksAwarded).toBe(expected);
  });

  it.each<[string, number]>([
    ["101", 2],
    ["99", 2],
    ["98.9", 0],
    ["-100", 0],
  ])("relative 1 %% around 100: %j → %i", (value, expected) => {
    expect(num(value, { value: 100, tolerance: { kind: "relative", amount: 0.01 } }).marksAwarded).toBe(expected);
  });

  it("relative tolerance around zero only accepts zero", () => {
    expect(num("0", { value: 0, tolerance: { kind: "relative", amount: 0.1 } }).marksAwarded).toBe(2);
    expect(num("0.001", { value: 0, tolerance: { kind: "relative", amount: 0.1 } }).marksAwarded).toBe(0);
  });

  it("works for very small and very large values", () => {
    expect(num("6.63e-34", { value: 6.626e-34, tolerance: { kind: "relative", amount: 0.01 } }).marksAwarded).toBe(2);
    expect(num("3.0×10^8", { value: 299792458, tolerance: { kind: "relative", amount: 0.01 } }).marksAwarded).toBe(2);
  });

  it("rejects a relative tolerance given as a percentage (authoring error)", () => {
    expect(num("100", { value: 100, tolerance: { kind: "relative", amount: 5 } }).feedback.flags).toContain("SPEC_INVALID");
  });
});

describe("numerical — units", () => {
  const spec = {
    value: 60,
    tolerance: { kind: "absolute", amount: 0.5 },
    units: { required: true, accepted: ["km/h", "kmh^-1"], conversions: [{ unit: "m/s", factor: 3.6 }], penaltyMarks: 1 },
  };

  it.each<[string, string | undefined, number]>([
    ["60", "km/h", 2],
    ["60", "km h⁻¹", 2],
    ["60 km/h", undefined, 2],
    ["60km/h", undefined, 2],
    ["60", "KM/H", 2],
    ["16.67", "m/s", 2],
    ["16.67 m/s", undefined, 2],
    ["60", undefined, 1],
    ["60", "", 1],
    ["60", "kg", 1],
    ["16.67", undefined, 0],
    ["61", "km/h", 0],
  ])("%j with unit %j → %i of 2", (value, unit, expected) => {
    expect(num(value, spec, 2, unit).marksAwarded).toBe(expected);
  });

  it("flags missing, wrong and converted units", () => {
    expect(num("60", spec).feedback.flags).toContain("UNIT_MISSING");
    expect(num("60", spec, 2, "kg").feedback.flags).toContain("UNIT_WRONG");
    expect(num("16.67", spec, 2, "m/s").feedback.flags).toContain("UNIT_CONVERTED");
  });

  it("does not penalise a missing optional unit, but does penalise a wrong one", () => {
    const optional = { ...spec, units: { ...spec.units, required: false } };
    expect(num("60", optional).marksAwarded).toBe(2);
    expect(num("60", optional, 2, "kg").marksAwarded).toBe(1);
  });

  it("defaults the unit penalty to one mark and never goes below zero", () => {
    const noPenalty = { value: 60, units: { required: true, accepted: ["km/h"] } };
    expect(num("60", noPenalty, 3).marksAwarded).toBe(2);
    expect(num("60", { ...noPenalty, units: { ...noPenalty.units, penaltyMarks: 5 } }, 1).marksAwarded).toBe(0);
  });

  it("applies conversion offsets (kelvin → °C)", () => {
    const celsius = { value: 25, tolerance: { kind: "absolute", amount: 0.5 }, units: { required: true, accepted: ["°C"], conversions: [{ unit: "K", factor: 1, offset: -273.15 }] } };
    expect(num("298", celsius, 1, "K").marksAwarded).toBe(1);
    expect(num("25", celsius, 1, "ºC").marksAwarded).toBe(1);
  });

  it("ignores units when the spec has none", () => {
    expect(num("5 apples", { value: 5 }).marksAwarded).toBe(2);
  });

  it("displays the expected value with the first accepted unit", () => {
    expect(num("1", spec).feedback.correctAnswerDisplay).toBe("60 km/h");
  });
});

describe("numerical — significant figures and decimal places", () => {
  const sf3 = { value: 3.14159, tolerance: { kind: "absolute", amount: 0.005 }, sigFigs: { min: 3, max: 3 } };

  it.each<[string, number]>([
    ["3.14", 2],
    ["3.142", 0],
    ["3.1416", 0],
    ["3.1", 0],
    ["22/7", 0],
  ])("3 s.f. required: %j → %i (no partial configured)", (value, expected) => {
    expect(num(value, sf3).marksAwarded).toBe(expected);
  });

  it("awards partial credit when a precision penalty is configured", () => {
    const r = num("3.142", { ...sf3, precisionPenaltyMarks: 1 });
    expect(r).toMatchObject({ status: "MARKED", marksAwarded: 1, isCorrect: null });
    expect(r.feedback.flags).toEqual(expect.arrayContaining(["SIG_FIGS", "PARTIAL_ANSWER"]));
    expect(r.feedback.notes.join(" ")).toMatch(/3 significant figures/);
  });

  it("gives ambiguous trailing zeros the benefit of the doubt", () => {
    const spec = { value: 4500, sigFigs: { min: 3 } };
    expect(num("4500", spec).marksAwarded).toBe(2);
    expect(num("4.50e3", spec).marksAwarded).toBe(2);
    expect(num("4.5e3", spec).marksAwarded).toBe(0);
  });

  it("accepts a range of significant figures", () => {
    const spec = { value: 2.5, tolerance: { kind: "absolute", amount: 0.05 }, sigFigs: { min: 2, max: 3 } };
    expect(num("2.5", spec).marksAwarded).toBe(2);
    expect(num("2.50", spec).marksAwarded).toBe(2);
    expect(num("2.500", spec).marksAwarded).toBe(0);
  });

  it.each<[string, number]>([
    ["12.35", 2],
    ["12.3", 0],
    ["12.350", 0],
    ["1.235e1", 2],
    ["1.2e1", 0],
  ])("2 d.p. required: %j → %i", (value, expected) => {
    expect(num(value, { value: 12.345, tolerance: { kind: "absolute", amount: 0.006 }, decimalPlaces: 2 }).marksAwarded).toBe(expected);
  });

  it("displays the expected value at the required precision", () => {
    expect(num("1", sf3).feedback.correctAnswerDisplay).toBe("3.14");
    expect(num("1", { value: 12.345, decimalPlaces: 2, tolerance: { kind: "absolute", amount: 0.01 } }).feedback.correctAnswerDisplay).toBe("12.35");
  });

  it("combines unit and precision penalties", () => {
    const spec = { ...sf3, precisionPenaltyMarks: 1, units: { required: true, accepted: ["cm"], penaltyMarks: 1 } };
    expect(num("3.142", spec, 3).marksAwarded).toBe(1);
  });
});

describe("assessNumericAnswer", () => {
  it("reports full correctness separately from awarded marks", () => {
    const spec = { value: 10, units: { required: true, accepted: ["m"] } };
    expect(assessNumericAnswer(spec, { value: "10", unit: "m" }, 2)).toMatchObject({ answered: true, valueCorrect: true, fullyCorrect: true, awarded: 2 });
    expect(assessNumericAnswer(spec, { value: "10" }, 2)).toMatchObject({ valueCorrect: true, fullyCorrect: false, awarded: 1 });
    expect(assessNumericAnswer(spec, { value: "" }, 2)).toMatchObject({ answered: false, awarded: 0 });
  });
});

describe("numerical — text the answer box already shows", () => {
  function withPayload(value: string, payload: unknown, answerSpec: unknown, type: "NUMERICAL" | "CALCULATION" = "NUMERICAL") {
    return markResponse({ type, marks: 1, payload, answerSpec, response: { type, value } });
  }

  it.each([
    ["x = 5", { answerPrefix: "x =" }, { value: 5 }],
    ["US$16.20", { answerPrefix: "US$" }, { value: 16.2 }],
    ["x400", { answerPrefix: "×" }, { value: 400 }],
    ["pH 7", { answerPrefix: "pH" }, { value: 7 }],
    ["12:1", { answerPrefix: "ratio =", unitHint: ": 1" }, { value: 12 }],
  ])("accepts %j when the box shows %j", (value, payload, spec) => {
    expect(withPayload(value, payload, spec)).toMatchObject({ status: "MARKED", marksAwarded: 1, isCorrect: true });
  });

  it("still reads a typed unit when units are configured", () => {
    const spec = { value: 12, units: { required: true, accepted: ["m/s"] } };
    expect(withPayload("12 m/s", { unitHint: "m/s" }, spec)).toMatchObject({ marksAwarded: 1, isCorrect: true });
  });

  it("does not strip a different prefix", () => {
    expect(withPayload("y = 5", { answerPrefix: "x =" }, { value: 5 })).toMatchObject({ marksAwarded: 0 });
  });

  it("applies to CALCULATION final answers too", () => {
    expect(withPayload("x = 2.5", { answerPrefix: "x =" }, { value: 2.5 }, "CALCULATION")).toMatchObject({ marksAwarded: 1, isCorrect: true });
  });
});
