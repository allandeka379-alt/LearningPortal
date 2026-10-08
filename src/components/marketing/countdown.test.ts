import { describe, expect, it } from "vitest";
import { countdownHeadline, countdownState, formatLongDate, formatShortDate } from "./countdown";

describe("countdownState", () => {
  it("counts whole days until the first exam day", () => {
    expect(countdownState("2026-10-06", "2027-02-07", "2027-02-20")).toEqual({ kind: "upcoming", days: 124 });
    expect(countdownState("2026-10-06", "2026-10-07", "2026-11-20")).toEqual({ kind: "upcoming", days: 1 });
  });

  it("handles the first day, a session under way and an ended session", () => {
    expect(countdownState("2026-10-06", "2026-10-06", "2026-11-20")).toEqual({ kind: "starts_today" });
    expect(countdownState("2026-10-20", "2026-10-06", "2026-11-20")).toEqual({ kind: "in_progress" });
    expect(countdownState("2026-11-20", "2026-10-06", "2026-11-20")).toEqual({ kind: "in_progress" });
    expect(countdownState("2026-11-21", "2026-10-06", "2026-11-20")).toEqual({ kind: "ended" });
  });
});

describe("countdownHeadline", () => {
  it("words each state", () => {
    expect(countdownHeadline({ kind: "upcoming", days: 1 })).toBe("1 day");
    expect(countdownHeadline({ kind: "upcoming", days: 124 })).toBe("124 days");
    expect(countdownHeadline({ kind: "starts_today" })).toBe("Today");
    expect(countdownHeadline({ kind: "in_progress" })).toBe("In progress");
    expect(countdownHeadline({ kind: "ended" })).toBe("Ended");
  });
});

describe("date formatting", () => {
  it("formats calendar dates without time-zone drift", () => {
    expect(formatLongDate("2026-10-06")).toBe("Tuesday, 6 October 2026");
    expect(formatShortDate("2027-01-01")).toBe("1 Jan 2027");
  });
});
