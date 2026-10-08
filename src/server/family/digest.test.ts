import { describe, expect, it } from "vitest";
import { composeDigest, digestKindsFor, digestWindowDays, PARENT_DIGEST_OFFSET_MINUTES, readDigestPreference, withDigestPreference } from "./digest";
import { recurringPeriodStart } from "@/server/lib/jobs";

const ALL = { progress: true, activity: true, results: true };

describe("parent digest preference (Profile.notificationPrefs.parentDigest)", () => {
  it("is OFF unless the parent opted in", () => {
    expect(readDigestPreference(null)).toBe("OFF");
    expect(readDigestPreference({ version: 1 })).toBe("OFF");
    expect(readDigestPreference({ parentDigest: "WEEKLY" })).toBe("WEEKLY");
    expect(readDigestPreference({ parentDigest: "DAILY" })).toBe("OFF"); // unknown value: treated as off
    expect(readDigestPreference("nonsense")).toBe("OFF");
  });

  it("merges into the stored document without losing other preferences", () => {
    const stored = { version: 1, quietHours: { start: "21:00", end: "06:00" }, parentDigest: "OFF" };
    expect(withDigestPreference(stored, "MONTHLY")).toEqual({ version: 1, quietHours: { start: "21:00", end: "06:00" }, parentDigest: "MONTHLY" });
    expect(withDigestPreference(null, "WEEKLY")).toEqual({ version: 1, parentDigest: "WEEKLY" });
    expect(withDigestPreference([1, 2], "WEEKLY")).toEqual({ version: 1, parentDigest: "WEEKLY" });
  });
});

describe("digest schedule", () => {
  it("runs on Sunday at 18:00 Harare time (16:00 UTC)", () => {
    const start = recurringPeriodStart(new Date("2026-10-07T12:00:00Z"), 7 * 24 * 60, PARENT_DIGEST_OFFSET_MINUTES);
    expect(start.toISOString()).toBe("2026-10-04T16:00:00.000Z");
    expect(start.getUTCDay()).toBe(0); // Sunday
  });

  it("sends monthly summaries only in the first week of a month", () => {
    expect(digestKindsFor("2026-11-01")).toEqual(["WEEKLY", "MONTHLY"]);
    expect(digestKindsFor("2026-11-07")).toEqual(["WEEKLY", "MONTHLY"]);
    expect(digestKindsFor("2026-11-08")).toEqual(["WEEKLY"]);
    expect(digestWindowDays("WEEKLY")).toBe(7);
    expect(digestWindowDays("MONTHLY")).toBe(30);
  });
});

describe("composeDigest", () => {
  it("reports real study time and marked tests per child", () => {
    const { title, body } = composeDigest("WEEKLY", [
      { name: "Tariro", permissions: ALL, activity: { minutes: 135, activeDays: 4 }, results: { marked: 3, averagePct: 67.6 } },
    ]);
    expect(title).toBe("Your weekly summary");
    expect(body).toBe("Tariro studied 2 hours 15 minutes on 4 days this week. 3 tests marked, average 68%.");
  });

  it("says so honestly when a child did not study", () => {
    const { body } = composeDigest("MONTHLY", [{ name: "Kuda", permissions: ALL, activity: { minutes: 0, activeDays: 0 }, results: { marked: 0, averagePct: null } }]);
    expect(body).toBe("Kuda did not study on the app in the last 30 days.");
  });

  it("never mentions sections the student did not share", () => {
    const noActivity = composeDigest("WEEKLY", [
      { name: "Rudo", permissions: { progress: true, activity: false, results: true }, results: { marked: 1, averagePct: null } },
    ]);
    expect(noActivity.body).toBe("1 test marked.");
    expect(noActivity.body).not.toMatch(/studied/);

    const nothingShared = composeDigest("WEEKLY", [{ name: "Rudo", permissions: { progress: true, activity: false, results: false } }]);
    expect(nothingShared.body).toBe("Rudo shares subjects and exam dates with you. Open the dashboard to see them.");

    const resultsOnlyNone = composeDigest("WEEKLY", [
      { name: "Rudo", permissions: { progress: false, activity: false, results: true }, results: { marked: 0, averagePct: null } },
    ]);
    expect(resultsOnlyNone.body).toBe("Rudo: no tests marked this week.");
  });

  it("lists several children on separate lines", () => {
    const { body } = composeDigest("WEEKLY", [
      { name: "A", permissions: ALL, activity: { minutes: 30, activeDays: 1 }, results: { marked: 0, averagePct: null } },
      { name: "B", permissions: ALL, activity: { minutes: 0, activeDays: 0 }, results: { marked: 2, averagePct: 50 } },
    ]);
    expect(body.split("\n")).toEqual(["A studied 30 minutes on 1 day this week.", "B did not study on the app this week. 2 tests marked, average 50%."]);
  });
});
