import { describe, expect, it } from "vitest";
import { parseFeedResponse } from "./client-api";
import { bellAccessibleName, categoryLabel, formatNotificationTime, safeAppHref, unreadBadgeLabel } from "./format";
import { channelFieldName, marketingInputFromForm, preferencesInputFromForm } from "./preference-fields";

describe("bell labels", () => {
  it("caps the badge and states the count in words", () => {
    expect(unreadBadgeLabel(0)).toBe("");
    expect(unreadBadgeLabel(3)).toBe("3");
    expect(unreadBadgeLabel(9)).toBe("9");
    expect(unreadBadgeLabel(10)).toBe("9+");
    expect(bellAccessibleName(null)).toBe("Notifications");
    expect(bellAccessibleName(0)).toBe("Notifications");
    expect(bellAccessibleName(4)).toBe("Notifications, 4 unread");
  });

  it("labels categories, falling back for unknown ones", () => {
    expect(categoryLabel("ANNOUNCEMENT")).toBe("Announcement");
    expect(categoryLabel("REMINDER")).toBe("Reminder");
    expect(categoryLabel("SOMETHING_NEW")).toBe("Update");
  });
});

describe("safeAppHref", () => {
  it("accepts app-relative paths only", () => {
    expect(safeAppHref("/app/plan")).toBe("/app/plan");
    expect(safeAppHref("/app/practice?topic=x#q1")).toBe("/app/practice?topic=x#q1");
    for (const href of ["https://evil.example", "//evil.example", "/\\evil", "javascript:alert(1)", "", null, 3]) expect(safeAppHref(href)).toBeNull();
  });
});

describe("formatNotificationTime", () => {
  const now = new Date("2026-10-05T12:00:00.000Z");
  const ago = (ms: number) => new Date(now.getTime() - ms);

  it("words recent times relative to now", () => {
    expect(formatNotificationTime(ago(20_000), now, "Africa/Harare")).toBe("Just now");
    expect(formatNotificationTime(ago(5 * 60_000), now, "Africa/Harare")).toBe("5 min ago");
    expect(formatNotificationTime(ago(3 * 3_600_000), now, "Africa/Harare")).toBe("3 h ago");
    expect(formatNotificationTime(ago(30 * 3_600_000), now, "Africa/Harare")).toBe("Yesterday");
    expect(formatNotificationTime(ago(4 * 86_400_000), now, "Africa/Harare")).toBe("4 days ago");
  });

  it("shows a date for older items, with the year only when it differs", () => {
    // ICU versions abbreviate September as "Sep" or "Sept".
    expect(formatNotificationTime(new Date("2026-09-20T10:00:00.000Z"), now, "Africa/Harare")).toMatch(/^20 Sept?$/);
    expect(formatNotificationTime(new Date("2025-12-30T10:00:00.000Z"), now, "Africa/Harare")).toMatch(/^30 Dec,? 2025$/);
    expect(formatNotificationTime(new Date("2026-09-20T23:30:00.000Z"), now, "Not/AZone")).toMatch(/^21 Sept?$/);
  });
});

describe("parseFeedResponse", () => {
  it("reads the feed envelope and drops malformed items", () => {
    const parsed = parseFeedResponse({
      data: {
        unread: 2,
        items: [
          { id: "a", title: "T", body: "B", category: "REMINDER", href: "/app/plan", unread: true, createdAt: "2026-10-05T10:00:00.000Z" },
          { id: "b", title: "T", body: "B", category: "SYSTEM", href: "https://evil.example", unread: false, createdAt: "2026-10-05T10:00:00.000Z" },
          { id: "c", title: "T" },
          { id: "d", title: "T", body: "B", category: "SYSTEM", href: "/x", unread: false, createdAt: "not a date" },
        ],
      },
    });
    expect(parsed?.unread).toBe(2);
    expect(parsed?.items?.map((item) => [item.id, item.href, item.unread])).toEqual([
      ["a", "/app/plan", true],
      ["b", "/app/notifications/b", false],
    ]);
  });

  it("returns null for anything that is not the feed", () => {
    for (const body of [null, "<html>", { data: null }, { data: { unread: -1 } }, { error: { code: "UNAUTHENTICATED" } }]) {
      expect(parseFeedResponse(body)).toBeNull();
    }
    expect(parseFeedResponse({ data: { unread: 1 } })).toEqual({ unread: 1, items: null });
  });
});

describe("settings form mapping", () => {
  it("reads switches, the reminder time and channel checkboxes (present = on)", () => {
    const form = new FormData();
    form.set("studyReminder", "on");
    form.set("weeklySummary", "on");
    form.set("dailyReminderTime", " 18:30 ");
    form.set(channelFieldName("ANNOUNCEMENT", "email"), "on");
    form.set(channelFieldName("REMINDER", "sms"), "on");
    expect(preferencesInputFromForm(form)).toEqual({
      reminders: { study: true, streakAtRisk: false, weeklySummary: true },
      dailyReminderTime: "18:30",
      channels: {
        REMINDER: { email: false, sms: true, whatsapp: false },
        LEARNING: { email: false, sms: false, whatsapp: false },
        ANNOUNCEMENT: { email: true, sms: false, whatsapp: false },
      },
    });
  });

  it("reads marketing consent separately", () => {
    const form = new FormData();
    form.set("marketingSms", "on");
    expect(marketingInputFromForm(form)).toEqual({ email: false, sms: true, whatsapp: false });
  });
});
