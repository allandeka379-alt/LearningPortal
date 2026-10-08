import { describe, expect, it } from "vitest";
import { toJson } from "./serialize";

describe("toJson", () => {
  it("converts dates to ISO strings and keeps JSON values", () => {
    const value = {
      at: new Date("2026-10-06T08:30:00.000Z"),
      nested: [{ when: new Date(0), ok: true }, null],
      count: 3,
      label: "x",
      none: null,
    };
    expect(toJson(value)).toEqual({
      at: "2026-10-06T08:30:00.000Z",
      nested: [{ when: "1970-01-01T00:00:00.000Z", ok: true }, null],
      count: 3,
      label: "x",
      none: null,
    });
  });

  it("drops undefined properties, nulls undefined array entries and non-finite numbers", () => {
    expect(toJson({ a: undefined, b: 1, c: [undefined, 2], d: Number.NaN, e: Infinity })).toEqual({ b: 1, c: [null, 2], d: null, e: null });
  });

  it("handles bigint, Map, Set, toJSON and invalid dates", () => {
    const decimal = { toJSON: () => "12.50" };
    expect(
      toJson({
        big: 9007199254740993n,
        map: new Map<string, unknown>([["k", new Date("2026-01-01T00:00:00Z")]]),
        set: new Set([1, 2]),
        decimal,
        invalid: new Date("nope"),
      }),
    ).toEqual({ big: "9007199254740993", map: { k: "2026-01-01T00:00:00.000Z" }, set: [1, 2], decimal: "12.50", invalid: null });
  });

  it("produces exactly what JSON.stringify would send for plain read models", () => {
    const model = { id: "a", createdAt: new Date("2026-10-06T00:00:00Z"), items: [{ at: new Date(5), n: 1 }], gone: undefined };
    expect(toJson(model)).toEqual(JSON.parse(JSON.stringify(model)));
  });

  it("refuses values JSON cannot carry", () => {
    expect(() => toJson({ fn: () => 1 })).toThrow(/function at fn/);
    expect(() => toJson({ s: Symbol("x") })).toThrow(/symbol/);
    const cyclic: Record<string, unknown> = { a: 1 };
    cyclic.self = cyclic;
    expect(() => toJson(cyclic)).toThrow(/circular/);
  });

  it("allows the same object twice when it is not a cycle", () => {
    const shared = { x: 1 };
    expect(toJson({ a: shared, b: [shared] })).toEqual({ a: { x: 1 }, b: [{ x: 1 }] });
  });
});
