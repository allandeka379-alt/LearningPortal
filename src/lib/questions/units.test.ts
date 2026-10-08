import { describe, expect, it } from "vitest";
import { canonicalUnit, matchUnit } from "./units";

describe("canonicalUnit", () => {
  it.each<[string, string]>([
    ["km/h", "km·h-1"],
    ["km h^-1", "km·h-1"],
    ["km·h⁻¹", "km·h-1"],
    ["km h-1", "km·h-1"],
    ["km per h", "km·h-1"],
    ["m/s^2", "m·s-2"],
    ["m s⁻²", "m·s-2"],
    ["m^2", "m2"],
    ["m²", "m2"],
    ["cm³", "cm3"],
    ["N m", "N·m"],
    ["N.m", "N·m"],
    ["N*m", "N·m"],
    ["\\mathrm{kg}", "kg"],
    ["\\mu m", "μm"],
    ["µm", "μm"],
    ["ºC", "°C"],
    ["℃", "°C"],
    ["  kg  ", "kg"],
    ["", ""],
  ])("%j → %j", (input, expected) => {
    expect(canonicalUnit(input)).toBe(expected);
  });
});

describe("matchUnit", () => {
  const accepted = ["km/h", "kmh^-1"];
  const conversions = [
    { unit: "m/s", factor: 3.6 },
    { unit: "K", factor: 1, offset: -273.15 },
  ];

  it("matches accepted spellings in any notation", () => {
    expect(matchUnit("km h⁻¹", accepted)).toMatchObject({ kind: "accepted", caseFolded: false });
    expect(matchUnit("km per h", accepted)).toMatchObject({ kind: "accepted" });
  });

  it("matches conversions with their factor and offset", () => {
    expect(matchUnit("m s^-1", accepted, conversions)).toEqual({ kind: "converted", unit: "m/s", factor: 3.6, offset: 0, caseFolded: false });
    expect(matchUnit("K", accepted, conversions)).toMatchObject({ kind: "converted", offset: -273.15 });
  });

  it("falls back to a case-insensitive match only when it is unique", () => {
    expect(matchUnit("KM/H", accepted)).toMatchObject({ kind: "accepted", caseFolded: true });
    // "ms" (millisecond) and "Ms" (megasecond) are different units: an ambiguous fold is refused.
    expect(matchUnit("MS", ["ms"], [{ unit: "Ms", factor: 1e9 }])).toBeNull();
  });

  it("keeps SI prefixes case-sensitive when an exact match exists", () => {
    expect(matchUnit("Ms", ["ms"], [{ unit: "Ms", factor: 1e9 }])).toMatchObject({ kind: "converted", factor: 1e9 });
  });

  it("returns null for blank or unknown units", () => {
    expect(matchUnit("", accepted)).toBeNull();
    expect(matchUnit("   ", accepted)).toBeNull();
    expect(matchUnit("kg", accepted, conversions)).toBeNull();
  });
});
