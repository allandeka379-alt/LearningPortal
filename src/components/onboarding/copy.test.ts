import { describe, expect, it } from "vitest";
import {
  abilityLabel,
  dailyGoalLabel,
  diagnosticSizeText,
  evidenceText,
  matchesSubjectQuery,
  sessionDateStatus,
  sessionDescription,
  startingReasonText,
  subjectCodeLabel,
} from "./copy";
import { formMessages } from "./form-state";

describe("onboarding copy", () => {
  it("labels exam session dates honestly (§17: provisional and demo dates are marked)", () => {
    expect(sessionDateStatus({ isProvisional: true, isDemo: false })).toBe("Provisional date");
    expect(sessionDateStatus({ isProvisional: true, isDemo: true })).toBe("Demo date (development only)");
    expect(sessionDateStatus({ isProvisional: false, isDemo: false })).toBeNull();
    expect(sessionDescription({ startsOn: "2027-11-02", isProvisional: true, isDemo: false, daysUntil: 393 })).toBe(
      "Starts 2 November 2027 · in 393 days · Provisional date",
    );
    expect(sessionDescription({ startsOn: "2026-10-06", isProvisional: false, isDemo: false, daysUntil: 1 })).toBe("Starts 6 October 2026 · tomorrow");
    expect(sessionDescription({ startsOn: "2026-10-01", isProvisional: false, isDemo: false, daysUntil: -4 })).toBe("Starts 1 October 2026 · under way");
  });

  it("words abilities, goals, codes and diagnostic sizes", () => {
    expect(abilityLabel("INTERMEDIATE")).toBe("Intermediate");
    expect(abilityLabel(null)).toBeNull();
    expect(abilityLabel("EXPERT")).toBeNull();
    expect(dailyGoalLabel(45)).toBe("45 min a day");
    expect(dailyGoalLabel(90)).toBe("1 h 30 min a day");
    expect(subjectCodeLabel(" 4004 ")).toBe("Syllabus 4004");
    expect(subjectCodeLabel(null)).toBeNull();
    expect(diagnosticSizeText(12, 10)).toBe("12 questions · about 10 minutes");
    expect(diagnosticSizeText(1, 2)).toBe("1 question · about 2 minutes");
    expect(evidenceText(2, 0)).toBe("Based on 2 questions");
    expect(evidenceText(1, 1)).toBe("Based on 1 question (1 answer still being marked)");
  });

  it("explains each starting-topic reason in plain words", () => {
    expect(startingReasonText("GAP", 33.3)).toContain("33%");
    expect(startingReasonText("MIXED", 66.7)).toContain("67%");
    expect(startingReasonText("NOT_COVERED", null)).toContain("didn't ask");
  });

  it("searches subjects by name or code, ignoring case and accents", () => {
    const maths = { name: "Mathematics", code: "4004" };
    const french = { name: "Français", code: null };
    expect(matchesSubjectQuery(maths, "")).toBe(true);
    expect(matchesSubjectQuery(maths, " MATH ")).toBe(true);
    expect(matchesSubjectQuery(maths, "400")).toBe(true);
    expect(matchesSubjectQuery(maths, "chem")).toBe(false);
    expect(matchesSubjectQuery(french, "francais")).toBe(true);
  });

  it("shows field messages first, else the general message", () => {
    expect(formMessages(null)).toEqual([]);
    expect(formMessages({ ok: true, data: null })).toEqual([]);
    expect(formMessages({ ok: false, error: { code: "CONFLICT", message: "Try again." } })).toEqual(["Try again."]);
    expect(
      formMessages({ ok: false, error: { code: "VALIDATION", message: "Please check", fieldErrors: { a: ["Choose one.", "Choose one."], b: ["Other."] } } }),
    ).toEqual(["Choose one.", "Other."]);
  });
});
