import { describe, expect, it } from "vitest";
import {
  formatMilestones,
  parseBooleanSettingForm,
  parseFeaturesForm,
  parseIntegerSettingForm,
  parseMilestones,
  parseRateLimitsForm,
  parseRetentionDaysForm,
  parseSmsBudgetForm,
  parseStudyDefaultsForm,
  parseXpForm,
} from "./forms";

describe("platform setting forms", () => {
  it("parses the feature flags: one checkbox per flag, unticked = off", () => {
    expect(parseFeaturesForm({})).toEqual({ ok: true, value: { ai: false, whatsapp: false, email: false, sms: false, stripe: false } });
    expect(parseFeaturesForm({ ai: "on", stripe: "on", email: "off", sms: "on" })).toEqual({ ok: true, value: { ai: true, whatsapp: false, email: false, sms: true, stripe: true } });
  });

  it("parses booleans, integers and retention", () => {
    expect(parseBooleanSettingForm({ value: "on" })).toEqual({ ok: true, value: true });
    expect(parseBooleanSettingForm({})).toEqual({ ok: true, value: false });
    expect(parseIntegerSettingForm({ value: " 5 " })).toEqual({ ok: true, value: 5 });
    expect(parseIntegerSettingForm({ value: "5.5" })).toEqual({ ok: false, fieldErrors: { value: ["Enter a whole number."] } });
    expect(parseIntegerSettingForm({ value: "" })).toEqual({ ok: false, fieldErrors: { value: ["Enter a value."] } });
    expect(parseRetentionDaysForm({ days: "180" })).toEqual({ ok: true, value: { days: 180 } });
  });

  it("parses study defaults with per-day errors on the right fields", () => {
    const values = { dailyGoalMinutes: "45", "availability.mon": "60", "availability.tue": "60", "availability.wed": "60", "availability.thu": "60", "availability.fri": "45", "availability.sat": "90", "availability.sun": "45" };
    expect(parseStudyDefaultsForm(values)).toEqual({
      ok: true,
      value: { dailyGoalMinutes: 45, availability: { mon: 60, tue: 60, wed: 60, thu: 60, fri: 45, sat: 90, sun: 45 } },
    });
    const broken = parseStudyDefaultsForm({ ...values, "availability.sat": "ninety", dailyGoalMinutes: "" });
    expect(broken).toEqual({ ok: false, fieldErrors: { dailyGoalMinutes: ["Enter a value."], "availability.sat": ["Enter a whole number."] } });
  });

  it("builds a partial XP override, or null for built-in defaults", () => {
    expect(parseXpForm({ useDefaults: "on", questionAnswered: "9" })).toEqual({ ok: true, value: null });
    expect(parseXpForm({ questionAnswered: "", lessonCompleted: "" })).toEqual({ ok: true, value: null });
    expect(
      parseXpForm({
        questionAnswered: "2",
        "correctAnswerByDifficulty.5": "10",
        partialCreditFraction: "0.25",
        streakMilestones: "30: 80\n7=20\n",
      }),
    ).toEqual({
      ok: true,
      value: { questionAnswered: 2, correctAnswerByDifficulty: { "5": 10 }, partialCreditFraction: 0.25, streakMilestones: { "30": 80, "7": 20 } },
    });
    const bad = parseXpForm({ streakMilestones: "seven: 20", partialCreditFraction: "half" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(Object.keys(bad.fieldErrors).sort()).toEqual(["partialCreditFraction", "streakMilestones"]);
  });

  it("round-trips streak milestones", () => {
    const errors = {};
    expect(parseMilestones("100: 200\n 7 : 25", errors)).toEqual({ "100": 200, "7": 25 });
    expect(formatMilestones({ "100": 200, "7": 25 })).toBe("7: 25\n100: 200");
    expect(formatMilestones(null)).toBe("");
  });

  it("parses the SMS budget: a cap unless explicitly removed, and a prefix list", () => {
    expect(parseSmsBudgetForm({ dailyMax: "2,500", allowedCountryPrefixes: "+263, +27\n+26777" })).toEqual({
      ok: true,
      value: { dailyMax: 2500, allowedCountryPrefixes: ["+263", "+27", "+26777"] },
    });
    // An empty maximum is an error, never "no cap"; removing the cap needs the box.
    expect(parseSmsBudgetForm({ dailyMax: "", allowedCountryPrefixes: "+263" })).toEqual({ ok: false, fieldErrors: { dailyMax: ["Enter a value."] } });
    expect(parseSmsBudgetForm({ dailyMax: "", noCap: "on", allowedCountryPrefixes: "" })).toEqual({ ok: true, value: { dailyMax: null, allowedCountryPrefixes: [] } });
  });

  it("stores only rate-limit rows that differ from the built-in rules", () => {
    const presets = { login: { limit: 10, windowSeconds: 900 }, uploads: { limit: 30, windowSeconds: 3600 } };
    expect(parseRateLimitsForm({ "login.limit": "10", "login.windowSeconds": "900" }, presets)).toEqual({ ok: true, value: {} });
    expect(parseRateLimitsForm({ "login.limit": "5", "uploads.windowSeconds": "60" }, presets)).toEqual({
      ok: true,
      value: { login: { limit: 5, windowSeconds: 900 }, uploads: { limit: 30, windowSeconds: 60 } },
    });
    expect(parseRateLimitsForm({ "login.limit": "lots" }, presets)).toEqual({ ok: false, fieldErrors: { "login.limit": ["Enter a whole number."] } });
  });
});
