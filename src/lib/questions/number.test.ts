import { describe, expect, it } from "vitest";
import { numberParseMessage, parseNumberInput, splitNumberAndUnit, stripAnswerAffixes, type NumberParseFailure } from "./number";

function value(input: string): number {
  const result = parseNumberInput(input);
  if (!result.ok) throw new Error(`expected ${JSON.stringify(input)} to parse, got ${result.reason}`);
  return result.number.value;
}

function failure(input: string): NumberParseFailure | null {
  const result = parseNumberInput(input);
  return result.ok ? null : result.reason;
}

describe("parseNumberInput: accepted forms", () => {
  it.each<[string, number]>([
    ["42", 42],
    ["-3.5", -3.5],
    ["+7", 7],
    [".5", 0.5],
    ["-.5", -0.5],
    ["5.", 5],
    ["  12.25  ", 12.25],
    ["1,234.5", 1234.5],
    ["1 234.5", 1234.5],
    ["1 234.5", 1234.5],
    ["1 234", 1234],
    ["1 234", 1234],
    ["1,234,567", 1234567],
    ["1,500", 1500],
    ["3.2e4", 32000],
    ["3.2E-4", 0.00032],
    ["3.2e+4", 32000],
    ["3.2×10^4", 32000],
    ["3.2 x 10^4", 32000],
    ["3.2X10^-3", 0.0032],
    ["3.2*10^4", 32000],
    ["3.2·10⁴", 32000],
    ["3.2×10⁻²", 0.032],
    ["3.2\\times10^{4}", 32000],
    ["$3.2 \\times 10^{4}$", 32000],
    ["10^4", 10000],
    ["10^-2", 0.01],
    ["3/4", 0.75],
    ["-3/4", -0.75],
    ["3 / 4", 0.75],
    ["2 1/2", 2.5],
    ["−5", -5],
    ["–5", -5],
    ["４２", 42],
    ["4​2", 42],
    ["0", 0],
  ])("%j → %d", (input, expected) => {
    expect(value(input)).toBeCloseTo(expected, 12);
  });

  it("normalises negative zero", () => {
    expect(Object.is(value("-0"), 0)).toBe(true);
    expect(Object.is(value("-0.000"), 0)).toBe(true);
  });
});

describe("parseNumberInput: rejected forms", () => {
  it.each<[string, NumberParseFailure]>([
    ["", "EMPTY"],
    ["   ", "EMPTY"],
    ["​", "EMPTY"],
    ["1,5", "AMBIGUOUS_DECIMAL_COMMA"],
    ["0,25", "AMBIGUOUS_DECIMAL_COMMA"],
    ["12,5", "AMBIGUOUS_DECIMAL_COMMA"],
    ["1.234,5", "AMBIGUOUS_DECIMAL_COMMA"],
    ["NaN", "INVALID"],
    ["Infinity", "INVALID"],
    ["-Infinity", "INVALID"],
    ["0x10", "INVALID"],
    ["1_000", "INVALID"],
    ["1,23", "AMBIGUOUS_DECIMAL_COMMA"],
    ["1,2345", "AMBIGUOUS_DECIMAL_COMMA"],
    ["1,234,5", "INVALID"],
    ["1.2.3", "INVALID"],
    ["--5", "INVALID"],
    ["+-5", "INVALID"],
    ["abc", "INVALID"],
    ["5 apples", "INVALID"],
    ["1/0", "INVALID"],
    ["3 5/4", "INVALID"],
    ["e5", "INVALID"],
    ["1e999", "NON_FINITE"],
    ["-1e999", "NON_FINITE"],
    ["1".repeat(41), "INVALID"],
    ["9".repeat(300), "TOO_LONG"],
  ])("%j → %s", (input, reason) => {
    expect(failure(input)).toBe(reason);
  });

  it("never throws on non-string input", () => {
    expect(parseNumberInput(undefined as unknown as string)).toEqual({ ok: false, reason: "INVALID" });
    expect(parseNumberInput(42 as unknown as string)).toEqual({ ok: false, reason: "INVALID" });
  });

  it("handles a huge input quickly", () => {
    const started = Date.now();
    expect(failure("1,".repeat(100_000))).toBe("TOO_LONG");
    expect(Date.now() - started).toBeLessThan(100);
  });
});

describe("parseNumberInput: precision as written", () => {
  it.each<[string, number, number]>([
    ["60", 1, 2],
    ["60.", 2, 2],
    ["60.0", 3, 3],
    ["0.0450", 3, 3],
    ["4500", 2, 4],
    ["4.50e3", 3, 3],
    ["3.20×10^4", 3, 3],
    ["1,234", 4, 4],
    ["1,200", 2, 4],
    ["0", 1, 1],
    ["0.00", 1, 2],
    ["-0.0012", 2, 2],
  ])("%j has %i–%i significant figures", (input, min, max) => {
    const result = parseNumberInput(input);
    expect(result.ok && result.number.sigFigs).toEqual({ min, max });
  });

  it.each<[string, number | null]>([
    ["3.20", 2],
    ["60", 0],
    ["5.", 0],
    ["3.25e1", 1],
    ["1.5e-3", 4],
    ["3/4", null],
  ])("%j has %s decimal places", (input, places) => {
    const result = parseNumberInput(input);
    expect(result.ok && result.number.decimalPlaces).toBe(places);
  });

  it("reports fractions as exact (no precision)", () => {
    const result = parseNumberInput("3/4");
    expect(result.ok && result.number.form).toBe("fraction");
    expect(result.ok && result.number.sigFigs).toBeNull();
  });
});

describe("splitNumberAndUnit", () => {
  it.each<[string, string, string]>([
    ["60 km/h", "60", "km/h"],
    ["60km/h", "60", "km/h"],
    ["3.2 x 10^4 kg", "3.2 x 10^4", "kg"],
    ["-5 °C", "-5", "°C"],
    ["45%", "45", "%"],
    ["2 1/2 m", "2 1/2", "m"],
    ["1,500 m", "1,500", "m"],
    ["1 500 m", "1 500", "m"],
    ["1,5 m", "1,5", "m"],
    ["10^4", "10^4", ""],
    ["42", "42", ""],
    ["abc", "abc", ""],
    ["3.2 x 10", "3.2 x 10", ""],
  ])("%j → number %j, unit %j", (input, number, unit) => {
    expect(splitNumberAndUnit(input)).toEqual({ number, unit });
  });
});

describe("stripAnswerAffixes", () => {
  it.each<[string, string | null, string | null, string]>([
    ["x = 5", "x =", null, "5"],
    ["x=-3", "x =", null, "-3"],
    ["X = 2.5", "x =", null, "2.5"],
    ["US$16.20", "US$", null, "16.20"],
    ["us$ 16.20", "US$", null, "16.20"],
    ["x400", "×", null, "400"],
    ["×400", "×", null, "400"],
    ["pH 7", "pH", null, "7"],
    ["12:1", null, ": 1", "12"],
    ["12 : 1", "ratio =", ": 1", "12"],
    ["ratio = 4.5 : 1", "ratio =", ": 1", "4.5"],
  ])("%j with prefix %j and suffix %j → %j", (raw, prefix, suffix, expected) => {
    expect(stripAnswerAffixes(raw, { prefix, suffix })).toBe(expected);
  });

  it.each<[string, string | null, string | null]>([
    ["y = 5", "x =", null],
    ["5", "x =", null],
    ["x =", "x =", null],
    ["0x10", "×", null],
    ["16.20", null, null],
  ])("leaves %j unchanged (prefix %j, suffix %j)", (raw, prefix, suffix) => {
    expect(stripAnswerAffixes(raw, { prefix, suffix })).toBe(raw);
  });
});

describe("numberParseMessage", () => {
  it("explains every failure in plain language", () => {
    for (const reason of ["EMPTY", "TOO_LONG", "AMBIGUOUS_DECIMAL_COMMA", "NON_FINITE", "INVALID"] as const) {
      expect(numberParseMessage(reason).length).toBeGreaterThan(5);
    }
    expect(numberParseMessage("AMBIGUOUS_DECIMAL_COMMA")).toMatch(/decimal point/);
  });
});
