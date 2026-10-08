import { describe, expect, it } from "vitest";
import { countdownSentence, formatInstantDate, formatLocalDate, streakDescription } from "./format";

describe("student display helpers", () => {
  it("formats calendar dates without shifting the day", () => {
    expect(formatLocalDate("2027-02-06")).toBe("6 February 2027");
    expect(formatLocalDate("2026-10-05", "short")).toMatch(/^0?5 Oct$/);
    expect(formatLocalDate("2026-10-05", "weekday")).toMatch(/Monday/);
    expect(formatLocalDate("not-a-date")).toBe("not-a-date");
  });

  it("formats instants in the student's time zone", () => {
    // 23:30 UTC on 4 Oct is already 5 Oct in Harare.
    expect(formatInstantDate(new Date("2026-10-04T23:30:00.000Z"), "Africa/Harare")).toMatch(/^0?5 Oct,? 2026$/);
    expect(formatInstantDate(new Date("2026-10-04T23:30:00.000Z"), "UTC")).toMatch(/^0?4 Oct,? 2026$/);
  });

  it("words the exam countdown (§17)", () => {
    expect(countdownSentence(124)).toBe("124 days until your examination");
    expect(countdownSentence(1)).toBe("1 day until your examination");
    expect(countdownSentence(0)).toBe("Your examination starts today");
    expect(countdownSentence(-5)).toBe("Your examinations are under way");
  });

  it("describes the streak without inventing one", () => {
    expect(streakDescription(0, "INACTIVE")).toBe("No study streak yet");
    expect(streakDescription(12, "AT_RISK")).toBe("12 days study streak. Study today to keep it going.");
    expect(streakDescription(1, "DONE_TODAY")).toBe("1 day study streak. Today's goal is done.");
  });
});
