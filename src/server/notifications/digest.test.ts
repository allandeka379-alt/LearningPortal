import { describe, expect, it } from "vitest";
import { getJobHandler, recurringJobs, recurringPeriodStart } from "@/server/lib/jobs";
import {
  composeChannelMessage,
  composeWeeklySummary,
  decideDailyReminder,
  notificationHref,
  registerNotificationJobs,
  WEEKLY_SUMMARY_EVERY_MINUTES,
  WEEKLY_SUMMARY_OFFSET_MINUTES,
} from "./digest";

describe("registerNotificationJobs", () => {
  it("registers every handler on the notifications queue and the schedules", () => {
    registerNotificationJobs();
    for (const type of [
      "notifications.send",
      "notifications.dailyReminders",
      "notifications.weeklySummary",
      "notifications.announcementDelivery",
      "notifications.announcementSweep",
    ]) {
      expect(getJobHandler(type)?.queue, type).toBe("notifications");
    }
    expect(getJobHandler("notifications.send")?.schema.safeParse({ notificationId: "not-a-uuid", channel: "EMAIL" }).success).toBe(false);
    expect(getJobHandler("notifications.send")?.schema.safeParse({ notificationId: "11111111-1111-4111-8111-111111111111", channel: "PUSH" }).success).toBe(false);
    const schedules = recurringJobs()
      .filter((job) => job.name.startsWith("notifications."))
      .map((job) => [job.name, job.everyMinutes, job.offsetMinutes]);
    expect(schedules).toEqual([
      ["notifications.dailyReminders", 15, 1],
      ["notifications.weeklySummary", 10_080, 5_220],
      ["notifications.announcementSweep", 10, 3],
    ]);
  });

  it("runs the weekly summary on Sunday at 17:00 Harare time (15:00 UTC)", () => {
    expect(recurringPeriodStart(new Date("2026-10-04T15:30:00.000Z"), WEEKLY_SUMMARY_EVERY_MINUTES, WEEKLY_SUMMARY_OFFSET_MINUTES).toISOString()).toBe(
      "2026-10-04T15:00:00.000Z",
    );
    expect(recurringPeriodStart(new Date("2026-10-08T09:00:00.000Z"), WEEKLY_SUMMARY_EVERY_MINUTES, WEEKLY_SUMMARY_OFFSET_MINUTES).toISOString()).toBe(
      "2026-10-04T15:00:00.000Z",
    );
  });
});

describe("decideDailyReminder (§6 study reminder, §19 streak at risk)", () => {
  const base = { reminders: { study: true, streakAtRisk: true }, streak: 0, goalMinutes: 45, hasActivePlan: false };

  it("reminds about the daily goal, or the plan when there is one", () => {
    expect(decideDailyReminder(base)).toEqual({
      kind: "study",
      title: "Time for today's study session",
      body: "Your daily goal is 45 minutes. Start with a few practice questions or a lesson.",
      href: "/app/practice",
    });
    const planned = decideDailyReminder({ ...base, hasActivePlan: true });
    expect(planned?.href).toBe("/app/plan");
    expect(planned?.body).toContain("study plan");
  });

  it("mentions flashcards due for review (§18) when there are any", () => {
    expect(decideDailyReminder({ ...base, dueFlashcards: 12 })?.body).toBe(
      "Your daily goal is 45 minutes. Start with a few practice questions or a lesson. You also have 12 flashcards due for review.",
    );
    expect(decideDailyReminder({ ...base, dueFlashcards: 1 })?.body).toContain("You also have 1 flashcard due for review.");
    expect(decideDailyReminder({ ...base, streak: 2, dueFlashcards: 12 })?.body).not.toContain("due for review");
  });

  it("prefers the streak message while a live streak is at risk", () => {
    const reminder = decideDailyReminder({ ...base, streak: 6 });
    expect(reminder?.kind).toBe("streak");
    expect(reminder?.title).toBe("Keep your 6-day streak going");
    expect(reminder?.body).toContain("review 5 flashcards before midnight");
  });

  it("honours each switch", () => {
    expect(decideDailyReminder({ ...base, streak: 6, reminders: { study: true, streakAtRisk: false } })?.kind).toBe("study");
    expect(decideDailyReminder({ ...base, streak: 6, reminders: { study: false, streakAtRisk: true } })?.kind).toBe("streak");
    expect(decideDailyReminder({ ...base, streak: 0, reminders: { study: false, streakAtRisk: true } })).toBeNull();
    expect(decideDailyReminder({ ...base, streak: 3, reminders: { study: false, streakAtRisk: false } })).toBeNull();
  });
});

describe("composeWeeklySummary (real numbers only)", () => {
  const zero = { activeDays: 0, studyMinutes: 0, questions: 0, correct: 0, lessons: 0, flashcards: 0, streak: 0 };

  it("says so honestly when the week was inactive", () => {
    const summary = composeWeeklySummary(zero);
    expect(summary.title).toBe("Your week in review");
    expect(summary.body).toBe("You didn't study on the app in the last 7 days. A short session today is a good way to restart.");
  });

  it("lists only what happened", () => {
    expect(composeWeeklySummary({ ...zero, activeDays: 3, studyMinutes: 95, questions: 20, correct: 15, lessons: 1, flashcards: 12, streak: 4 }).body).toBe(
      "You studied for 1 hour 35 minutes on 3 days in the last 7 days. You answered 20 questions and got 75% right. " +
        "You completed 1 lesson. You reviewed 12 flashcards. Current streak: 4 days.",
    );
    expect(composeWeeklySummary({ ...zero, activeDays: 1, questions: 1, correct: 1 }).body).toBe(
      "You studied on 1 day in the last 7 days. You answered 1 question and got 100% right.",
    );
  });
});

describe("composeChannelMessage", () => {
  const input = {
    title: "Mock exams start Monday",
    body: "Form 4 mock examinations start on Monday 12 October. Bring two pens and a calculator.",
    link: "https://dzidza.example/app/notifications/abc",
    settingsLink: "https://dzidza.example/app/notifications/settings",
    appName: "BvunzoHub",
  };

  it("writes a plain email with the link and how to opt out", () => {
    const email = composeChannelMessage({ ...input, channel: "EMAIL" });
    expect(email.subject).toBe("Mock exams start Monday");
    expect(email.text).toContain(input.body);
    expect(email.text).toContain(`Open in BvunzoHub: ${input.link}`);
    expect(email.text).toContain(`Change your notification settings: ${input.settingsLink}`);
  });

  it("keeps SMS to two segments and always includes the link", () => {
    const sms = composeChannelMessage({ ...input, channel: "SMS", body: "x ".repeat(400) });
    expect(sms.text.length).toBeLessThanOrEqual(320);
    expect(sms.text.startsWith("BvunzoHub: Mock exams start Monday. ")).toBe(true);
    expect(sms.text.endsWith(input.link)).toBe(true);
    expect(composeChannelMessage({ ...input, channel: "SMS", link: null }).text).toBe(`BvunzoHub: Mock exams start Monday. ${input.body}`);
  });

  it("formats WhatsApp with a bold title", () => {
    expect(composeChannelMessage({ ...input, channel: "WHATSAPP" }).text).toBe(`*Mock exams start Monday*\n\n${input.body}\n\n${input.link}`);
  });
});

describe("notificationHref", () => {
  it("uses the app-relative link, otherwise the detail page", () => {
    expect(notificationHref({ id: "n1", data: { href: "/app/plan" } })).toBe("/app/plan");
    expect(notificationHref({ id: "n1", data: { entityType: "Announcement" } })).toBe("/app/notifications/n1");
    expect(notificationHref({ id: "n1", data: null })).toBe("/app/notifications/n1");
    for (const href of ["https://evil.example", "//evil.example", "/\\evil.example", "javascript:alert(1)", "/app/a b"]) {
      expect(notificationHref({ id: "n1", data: { href } })).toBe("/app/notifications/n1");
    }
  });
});
