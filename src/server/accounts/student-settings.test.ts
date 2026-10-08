import { describe, expect, it } from "vitest";
import {
  ANONYMOUS_LEADERBOARD_NAME,
  displayNameSchema,
  leaderboardDisplayName,
  leaderboardPrivacySchema,
  studyPreferencesSchema,
  timeZoneOptions,
} from "./student-settings";

describe("leaderboard display names (§20)", () => {
  const full = { firstName: "Tariro", lastName: "Moyo", username: "swiftkudu482" };

  it("resolves every mode", () => {
    expect(leaderboardDisplayName(full, "REAL_NAME")).toBe("Tariro Moyo");
    expect(leaderboardDisplayName(full, "FIRST_NAME")).toBe("Tariro M.");
    expect(leaderboardDisplayName(full, "USERNAME")).toBe("swiftkudu482");
    expect(leaderboardDisplayName(full, "ANONYMOUS")).toBe(ANONYMOUS_LEADERBOARD_NAME);
  });

  it("degrades without a surname and refuses modes the profile cannot support", () => {
    const firstOnly = { firstName: " Tariro ", lastName: null, username: null };
    expect(leaderboardDisplayName(firstOnly, "REAL_NAME")).toBe("Tariro");
    expect(leaderboardDisplayName(firstOnly, "FIRST_NAME")).toBe("Tariro");
    expect(leaderboardDisplayName(firstOnly, "USERNAME")).toBeNull();
    expect(leaderboardDisplayName({ firstName: "", lastName: "Moyo", username: "u_1" }, "FIRST_NAME")).toBeNull();
  });
});

describe("settings schemas", () => {
  it("trims names and rejects blank, long or control-character names", () => {
    expect(displayNameSchema.parse({ displayName: "  Tari  " })).toEqual({ displayName: "Tari" });
    expect(displayNameSchema.safeParse({ displayName: "   " }).success).toBe(false);
    expect(displayNameSchema.safeParse({ displayName: "x".repeat(61) }).success).toBe(false);
    expect(displayNameSchema.safeParse({ displayName: "Tari\nro" }).success).toBe(false);
    expect(displayNameSchema.safeParse({ displayName: "Tari", extra: 1 }).success).toBe(false);
  });

  it("validates time zones and the daily goal range", () => {
    expect(studyPreferencesSchema.parse({ timezone: "Africa/Lusaka", dailyGoalMinutes: 45 })).toEqual({ timezone: "Africa/Lusaka", dailyGoalMinutes: 45 });
    expect(studyPreferencesSchema.parse({ timezone: "Africa/Harare", dailyGoalMinutes: null }).dailyGoalMinutes).toBeNull();
    expect(studyPreferencesSchema.safeParse({ timezone: "Mars/Olympus", dailyGoalMinutes: 30 }).success).toBe(false);
    expect(studyPreferencesSchema.safeParse({ timezone: "Africa/Harare", dailyGoalMinutes: 2 }).success).toBe(false);
    expect(studyPreferencesSchema.safeParse({ timezone: "Africa/Harare", dailyGoalMinutes: 601 }).success).toBe(false);
    expect(studyPreferencesSchema.safeParse({ timezone: "Africa/Harare", dailyGoalMinutes: 12.5 }).success).toBe(false);
  });

  it("accepts only known leaderboard modes", () => {
    expect(leaderboardPrivacySchema.safeParse({ optIn: true, display: "NICKNAME" }).success).toBe(false);
    expect(leaderboardPrivacySchema.parse({ optIn: false, display: "ANONYMOUS" })).toEqual({ optIn: false, display: "ANONYMOUS" });
  });
});

describe("time zone options", () => {
  it("lists African zones plus UTC and the current zone, sorted and unique", () => {
    const zones = timeZoneOptions("Europe/London");
    expect(zones).toContain("Africa/Harare");
    expect(zones).toContain("UTC");
    expect(zones).toContain("Europe/London");
    expect(new Set(zones).size).toBe(zones.length);
    expect([...zones].sort((a, b) => a.localeCompare(b, "en"))).toEqual(zones);
    expect(timeZoneOptions("Not/AZone")).not.toContain("Not/AZone");
  });
});
