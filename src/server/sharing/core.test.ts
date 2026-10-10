import { describe, expect, it } from "vitest";
import {
  buildShareSnapshot,
  isShareTokenFormat,
  shareDisplayName,
  shareHeadline,
  shareKindLabel,
  shareMessage,
  shareSnapshotSchema,
  shareStatus,
  shareUrl,
  shareValueLabel,
  whatsappShareHref,
} from "./core";

describe("shareHeadline (§46 wording)", () => {
  it("reads like the spec example", () => {
    expect(shareHeadline({ kind: "MOCK_SCORE", percentage: 81.6, subjectName: "Mathematics", qualificationName: "O-Level", boardName: "ZIMSEC" })).toBe(
      "I scored 82% in O-Level Mathematics",
    );
    expect(shareHeadline({ kind: "TEST_SCORE", percentage: 50, subjectName: "Biology", qualificationName: null, boardName: null })).toBe("I scored 50% in Biology");
    expect(shareHeadline({ kind: "STREAK", days: 1 })).toBe("I've studied 1 day in a row");
    expect(shareHeadline({ kind: "STREAK", days: 14 })).toBe("I've studied 14 days in a row");
    expect(shareHeadline({ kind: "MASTERY", topics: 12, subjectName: "Physics", qualificationName: "A-Level", boardName: null })).toBe(
      "I've mastered 12 topics in A-Level Physics",
    );
    expect(shareHeadline({ kind: "MASTERY", topics: 1, subjectName: null, qualificationName: null, boardName: null })).toBe("I've mastered 1 topic");
    expect(shareHeadline({ kind: "ACHIEVEMENT", achievementName: "Habit formed" })).toBe("I earned the “Habit formed” badge");
    expect(shareKindLabel("MOCK_SCORE")).toBe("Mock exam result");
  });
});

describe("buildShareSnapshot", () => {
  it("stores only public-safe facts", () => {
    const snapshot = buildShareSnapshot(
      { kind: "MOCK_SCORE", percentage: 81.6, subjectName: "Mathematics", qualificationName: "O-Level", boardName: "ZIMSEC" },
      { displayName: "Tendai", achievedOn: "2026-10-05" },
    );
    expect(snapshot).toEqual({
      headline: "I scored 82% in O-Level Mathematics",
      displayName: "Tendai",
      value: 82,
      unit: "PERCENT",
      subjectName: "Mathematics",
      qualificationName: "O-Level",
      boardName: "ZIMSEC",
      achievedOn: "2026-10-05",
    });
    const anonymous = buildShareSnapshot({ kind: "STREAK", days: 9 }, { displayName: null, achievedOn: "2026-10-05" });
    expect(anonymous).toEqual({ headline: "I've studied 9 days in a row", value: 9, unit: "DAYS", achievedOn: "2026-10-05" });
    expect(Object.keys(anonymous)).not.toContain("displayName");
  });

  it("rejects anything outside the schema", () => {
    expect(shareSnapshotSchema.safeParse({ headline: "x", value: 1, unit: "DAYS", achievedOn: "2026-10-05", email: "a@b.c" }).success).toBe(false);
    expect(shareSnapshotSchema.safeParse({ headline: "x", value: 1, unit: "DAYS", achievedOn: "05/10/2026" }).success).toBe(false);
    expect(() => buildShareSnapshot({ kind: "STREAK", days: 9 }, { displayName: null, achievedOn: "bad" })).toThrow();
  });
});

describe("shareDisplayName", () => {
  it("shows the first name only, the username, or nothing", () => {
    expect(shareDisplayName("FIRST_NAME", { firstName: " Tendai Moyo ", username: "kudu" })).toBe("Tendai");
    expect(shareDisplayName("USERNAME", { firstName: "Tendai", username: "swiftkudu482" })).toBe("swiftkudu482");
    expect(shareDisplayName("NONE", { firstName: "Tendai", username: "kudu" })).toBeNull();
    expect(shareDisplayName("FIRST_NAME", { firstName: "  ", username: "kudu" })).toBeNull();
    expect(shareDisplayName("USERNAME", { firstName: "Tendai", username: null })).toBeNull();
  });
});

describe("links", () => {
  it("builds the public URL and a WhatsApp click-to-chat link", () => {
    const token = "a".repeat(43);
    expect(isShareTokenFormat(token)).toBe(true);
    expect(isShareTokenFormat("short")).toBe(false);
    expect(isShareTokenFormat(`${"a".repeat(42)}/`)).toBe(false);
    const url = shareUrl("https://example.test/", token);
    expect(url).toBe(`https://example.test/s/${token}`);
    const text = shareMessage("I scored 82% in O-Level Mathematics", "BvunzoHub");
    expect(text).toBe("I scored 82% in O-Level Mathematics on BvunzoHub.");
    const href = whatsappShareHref(text, url);
    expect(href.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(href.slice("https://wa.me/?text=".length))).toBe(`${text} ${url}`);
  });

  it("labels values and statuses", () => {
    expect(shareValueLabel({ value: 81.6, unit: "PERCENT" })).toBe("82%");
    expect(shareValueLabel({ value: 1, unit: "DAYS" })).toBe("1 day");
    expect(shareValueLabel({ value: 12, unit: "TOPICS" })).toBe("12 topics");
    expect(shareValueLabel({ value: 1, unit: "BADGE", achievementName: "Century" })).toBe("Century");
    const now = new Date("2026-10-06T10:00:00Z");
    expect(shareStatus({ revokedAt: null, expiresAt: new Date("2026-11-01T00:00:00Z") }, now)).toBe("ACTIVE");
    expect(shareStatus({ revokedAt: null, expiresAt: new Date("2026-10-01T00:00:00Z") }, now)).toBe("EXPIRED");
    expect(shareStatus({ revokedAt: now, expiresAt: new Date("2026-11-01T00:00:00Z") }, now)).toBe("REVOKED");
  });
});
