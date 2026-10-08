import { describe, expect, it } from "vitest";
import {
  EMPTY_VALUE,
  formatCount,
  formatDuration,
  formatNumber,
  formatPercent,
  formatRelativeDays,
  getInitials,
  pluralize,
} from "./format";

describe("formatNumber", () => {
  it("groups thousands using the en-ZW locale by default", () => {
    expect(formatNumber(1234567.891)).toBe("1,234,567.89");
  });

  it("respects fraction digit options", () => {
    expect(formatNumber(3.14159, { maximumFractionDigits: 0 })).toBe("3");
    expect(formatNumber(2, { minimumFractionDigits: 1 })).toBe("2.0");
  });

  it("supports compact notation", () => {
    expect(formatNumber(12_500, { compact: true })).toBe("12.5K");
  });

  it("returns the empty placeholder for missing or non-finite input", () => {
    expect(formatNumber(null)).toBe(EMPTY_VALUE);
    expect(formatNumber(undefined)).toBe(EMPTY_VALUE);
    expect(formatNumber(Number.NaN)).toBe(EMPTY_VALUE);
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe(EMPTY_VALUE);
  });

  it("formats zero as zero (zero is real data, not missing data)", () => {
    expect(formatNumber(0)).toBe("0");
  });
});

describe("formatPercent", () => {
  it("treats input as 0-100 by default", () => {
    expect(formatPercent(82)).toBe("82%");
    expect(formatPercent(0)).toBe("0%");
    expect(formatPercent(100)).toBe("100%");
  });

  it("accepts ratios when asked", () => {
    expect(formatPercent(0.825, { input: "ratio" })).toBe("83%");
    expect(formatPercent(0.825, { input: "ratio", maximumFractionDigits: 1 })).toBe("82.5%");
  });

  it("rounds to whole percentages by default", () => {
    expect(formatPercent(41.4)).toBe("41%");
  });

  it("returns the empty placeholder for missing input", () => {
    expect(formatPercent(null)).toBe(EMPTY_VALUE);
    expect(formatPercent(Number.NaN)).toBe(EMPTY_VALUE);
  });
});

describe("formatDuration", () => {
  it("formats minutes only", () => {
    expect(formatDuration(45)).toBe("45 min");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(80)).toBe("1 h 20 min");
  });

  it("omits a zero-minute remainder", () => {
    expect(formatDuration(120)).toBe("2 h");
  });

  it("rounds to the nearest minute", () => {
    expect(formatDuration(44.6)).toBe("45 min");
    expect(formatDuration(59.6)).toBe("1 h");
  });

  it("never shows a positive duration as nothing", () => {
    expect(formatDuration(0.3)).toBe("< 1 min");
    expect(formatDuration(0.3, { style: "long" })).toBe("less than 1 minute");
  });

  it("formats zero", () => {
    expect(formatDuration(0)).toBe("0 min");
  });

  it("supports a long style with correct plurals", () => {
    expect(formatDuration(61, { style: "long" })).toBe("1 hour 1 minute");
    expect(formatDuration(135, { style: "long" })).toBe("2 hours 15 minutes");
  });

  it("groups very large hour counts", () => {
    expect(formatDuration(1500 * 60)).toBe("1,500 h");
  });

  it("treats negative or missing input as unknown", () => {
    expect(formatDuration(-5)).toBe(EMPTY_VALUE);
    expect(formatDuration(null)).toBe(EMPTY_VALUE);
  });
});

describe("formatRelativeDays", () => {
  it("uses natural words for adjacent days", () => {
    expect(formatRelativeDays(0)).toBe("today");
    expect(formatRelativeDays(1)).toBe("tomorrow");
    expect(formatRelativeDays(-1)).toBe("yesterday");
  });

  it("formats future and past offsets", () => {
    expect(formatRelativeDays(126)).toBe("in 126 days");
    expect(formatRelativeDays(-3)).toBe("3 days ago");
  });

  it("rounds fractional days and normalises negative zero", () => {
    expect(formatRelativeDays(2.4)).toBe("in 2 days");
    expect(formatRelativeDays(-0.2)).toBe("today");
  });

  it("returns the empty placeholder for missing input", () => {
    expect(formatRelativeDays(undefined)).toBe(EMPTY_VALUE);
  });
});

describe("pluralize / formatCount", () => {
  it("chooses singular only for one", () => {
    expect(pluralize(1, "day")).toBe("day");
    expect(pluralize(0, "day")).toBe("days");
    expect(pluralize(2, "day")).toBe("days");
    expect(pluralize(1.5, "day")).toBe("days");
  });

  it("supports irregular plurals", () => {
    expect(pluralize(3, "quiz", "quizzes")).toBe("quizzes");
  });

  it("formats a count with its noun", () => {
    expect(formatCount(1, "question")).toBe("1 question");
    expect(formatCount(1250, "question")).toBe("1,250 questions");
    expect(formatCount(null, "question")).toBe(EMPTY_VALUE);
  });
});

describe("getInitials", () => {
  it("uses the first and last name parts", () => {
    expect(getInitials("Tendai Moyo")).toBe("TM");
    expect(getInitials("Rumbidzai Chipo Ncube")).toBe("RN");
  });

  it("handles single names, extra whitespace and lowercase", () => {
    expect(getInitials("  tendai  ")).toBe("T");
    expect(getInitials("nyasha   mutasa")).toBe("NM");
  });

  it("returns an empty string for blank input", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials("   ")).toBe("");
    expect(getInitials(null)).toBe("");
  });

  it("does not split astral characters", () => {
    expect(getInitials("𝒜da Lovelace")).toBe("𝒜L");
  });
});
