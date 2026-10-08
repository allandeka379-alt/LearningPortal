import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Prisma } from "@/generated/prisma/client";
import { dateColumnFromLocalDate } from "@/lib/dates";
import { db } from "@/server/db";
import { setMessagingChannel, type MessagingChannel, type OutboundMessage } from "@/server/messaging";
import { createCurriculumChain, createStudent, createUser, uniquePhone, type CurriculumChain } from "../../../tests/factories/index";
import {
  createRoutedNotification,
  deliverNotification,
  getInboxDigest,
  getInboxNotification,
  getInboxPage,
  markInboxRead,
  runAnnouncementDelivery,
  runAnnouncementSweep,
  runDailyReminders,
  runWeeklySummaries,
  sendDedupeKey,
} from "./digest";
import { createNotification, notifyMany } from "./service";

// Notification email is OPTIONAL email and SMS is optional too: both are switched on for this file, which covers the
// external delivery paths (dormant while the flags are off, the defaults). The switched-off behaviour is tested in
// "notifications while optional email and SMS are off" (it flips the flags and restores them).
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: true, sms: true, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Notification jobs and inbox views against the test database. Every run is scoped to the users this file creates
 * (`userIds`) or to its own announcements, so parallel test files are never touched.
 */

let chain: CurriculumChain;

beforeAll(async () => {
  chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
});

async function student(options: { prefs?: Prisma.InputJsonObject; emailVerified?: boolean; timezone?: string } = {}) {
  const { user } = await createStudent({
    emailVerified: options.emailVerified ?? false,
    student: {
      isMinor: false,
      onboardingCompleted: true,
      countryId: chain.country.id,
      examBoardId: chain.examBoard.id,
      qualificationId: chain.qualification.id,
    },
  });
  if (options.prefs || options.timezone) {
    await db.profile.update({
      where: { userId: user.id },
      data: { ...(options.prefs ? { notificationPrefs: options.prefs } : {}), ...(options.timezone ? { timezone: options.timezone } : {}) },
    });
  }
  return user;
}

async function pendingSendJob(notificationId: string, channel: "EMAIL" | "SMS" | "WHATSAPP") {
  return db.job.findFirst({ where: { dedupeKey: sendDedupeKey(notificationId, channel), status: "PENDING" }, select: { id: true, runAt: true, payload: true } });
}

// =====================================================================================================================

describe("notifications.dailyReminders", () => {
  // 18:00 in Harare on Monday 5 October 2026.
  const NOW = new Date("2026-10-05T16:00:00.000Z");
  const TODAY = "2026-10-05";

  it("reminds students who have not met today's goal by their reminder time, once a day", async () => {
    const due = await student();
    const goalMet = await student();
    const later = await student({ prefs: { version: 1, dailyReminderTime: "19:00" } });
    const streaker = await student();
    const off = await student({ prefs: { version: 1, reminders: { study: false, streakAtRisk: false } } });
    const byEmail = await student({ emailVerified: true, prefs: { version: 1, categories: { REMINDER: { email: true } } } });
    const london = await student({ timezone: "Europe/London" }); // 17:00 BST: due
    const users = [due, goalMet, later, streaker, off, byEmail, london];

    await db.dailyActivity.create({
      data: { userId: goalMet.id, date: dateColumnFromLocalDate(TODAY), questionsAttempted: 3, questionsCorrect: 2, dailyGoalMet: true, streakCredited: true },
    });
    await db.learnerStats.createMany({
      data: [
        { userId: streaker.id, currentStreak: 4, longestStreak: 4, lastStreakDate: dateColumnFromLocalDate("2026-10-04"), dailyGoalMinutes: 30 },
        // The student's own goal (independent of the shared study.defaults Setting).
        { userId: due.id, dailyGoalMinutes: 45 },
      ],
    });

    const result = await runDailyReminders({ now: NOW, userIds: users.map((u) => u.id) });
    expect(result).toMatchObject({ candidates: 4, created: 4, study: 3, streak: 1, deliveriesQueued: 1 });

    const rows = await db.notification.findMany({
      where: { userId: { in: users.map((u) => u.id) }, type: { startsWith: "reminder." } },
      select: { userId: true, type: true, category: true, title: true, body: true, data: true, channels: true, dedupeKey: true, expiresAt: true, id: true },
    });
    const byUser = new Map(rows.map((row) => [row.userId, row]));
    expect([...byUser.keys()].sort()).toEqual([due.id, streaker.id, byEmail.id, london.id].sort());

    expect(byUser.get(due.id)).toMatchObject({
      type: "reminder.study",
      category: "REMINDER",
      title: "Time for today's study session",
      body: "Your daily goal is 45 minutes. Start with a few practice questions or a lesson.",
      data: { href: "/app/practice", kind: "study", date: TODAY },
      channels: ["IN_APP"],
      dedupeKey: `remind:${TODAY}`,
      // Local midnight (Harare): useless afterwards.
      expiresAt: new Date("2026-10-05T22:00:00.000Z"),
    });
    expect(byUser.get(streaker.id)).toMatchObject({ type: "reminder.streak", title: "Keep your 4-day streak going" });
    expect(byUser.get(london.id)?.expiresAt).toEqual(new Date("2026-10-05T23:00:00.000Z"));

    const emailed = byUser.get(byEmail.id);
    expect(emailed?.channels).toEqual(["IN_APP", "EMAIL"]);
    expect(await pendingSendJob(emailed!.id, "EMAIL")).toMatchObject({ payload: { notificationId: emailed!.id, channel: "EMAIL" } });

    // Re-running (retry, overlapping period) never reminds anyone twice.
    expect(await runDailyReminders({ now: new Date(NOW.getTime() + 15 * 60_000), userIds: users.map((u) => u.id) })).toMatchObject({ created: 0 });
  });

  it("stops at its batch cap and continues from where it stopped", async () => {
    const users = [await student(), await student(), await student()];
    const ids = users.map((u) => u.id);
    const first = await runDailyReminders({ now: NOW, userIds: ids, batchSize: 1, maxBatches: 2 });
    expect(first).toMatchObject({ candidates: 2, created: 2 });
    expect(first.continuedAfter).toBe([...ids].sort()[1]);
    const rest = await runDailyReminders({ now: NOW, userIds: ids, batchSize: 1, maxBatches: 5, afterUserId: first.continuedAfter! });
    expect(rest).toMatchObject({ candidates: 1, created: 1, continuedAfter: null });
  });

  it("sends nothing at night or before the reminder time", async () => {
    const user = await student();
    expect((await runDailyReminders({ now: new Date("2026-10-05T19:30:00.000Z"), userIds: [user.id] })).candidates).toBe(0); // 21:30 CAT
    expect((await runDailyReminders({ now: new Date("2026-10-05T12:00:00.000Z"), userIds: [user.id] })).candidates).toBe(0); // 14:00 CAT
  });
});

// =====================================================================================================================

describe("notifications.weeklySummary", () => {
  // Sunday 4 October 2026, 17:00 in Harare.
  const PERIOD = new Date("2026-10-04T15:00:00.000Z");

  it("summarises the last 7 local days with real numbers, once per week", async () => {
    const active = await student();
    const idle = await student();
    const optedOut = await student({ prefs: { version: 1, reminders: { weeklySummary: false } } });
    const users = [active, idle, optedOut];
    await db.dailyActivity.createMany({
      data: [
        { userId: active.id, date: dateColumnFromLocalDate("2026-10-01"), studySeconds: 1800, questionsAttempted: 10, questionsCorrect: 7 },
        { userId: active.id, date: dateColumnFromLocalDate("2026-10-03"), studySeconds: 1200, questionsAttempted: 5, questionsCorrect: 5, lessonsCompleted: 1 },
        // Outside the window.
        { userId: active.id, date: dateColumnFromLocalDate("2026-09-20"), studySeconds: 3600, questionsAttempted: 50, questionsCorrect: 10 },
      ],
    });
    await db.learnerStats.create({ data: { userId: active.id, currentStreak: 2, longestStreak: 5, lastStreakDate: dateColumnFromLocalDate("2026-10-03") } });

    const result = await runWeeklySummaries({ periodStart: PERIOD, now: PERIOD, userIds: users.map((u) => u.id) });
    expect(result).toMatchObject({ weekKey: "2026-W40", candidates: 2, created: 2 });

    const rows = await db.notification.findMany({
      where: { userId: { in: users.map((u) => u.id) }, type: "learning.weekly_summary" },
      select: { userId: true, title: true, body: true, category: true, data: true, dedupeKey: true },
    });
    const byUser = new Map(rows.map((row) => [row.userId, row]));
    expect(byUser.has(optedOut.id)).toBe(false);
    expect(byUser.get(active.id)).toMatchObject({
      title: "Your week in review",
      category: "LEARNING",
      body: "You studied for 50 minutes on 2 days in the last 7 days. You answered 15 questions and got 80% right. You completed 1 lesson. Current streak: 2 days.",
      data: { href: "/app/progress", week: "2026-W40" },
      dedupeKey: "summary.weekly:2026-W40",
    });
    expect(byUser.get(idle.id)?.body).toContain("You didn't study on the app in the last 7 days.");

    expect((await runWeeklySummaries({ periodStart: PERIOD, now: PERIOD, userIds: users.map((u) => u.id) })).created).toBe(0);
  });
});

// =====================================================================================================================

describe("notifications.send", () => {
  const sent: OutboundMessage[] = [];
  let failNext = false;
  const fakeEmail: MessagingChannel = {
    channel: "email",
    driver: "fake",
    async send(message) {
      if (failNext) {
        failNext = false;
        throw new Error("provider timeout");
      }
      sent.push(message);
      return { providerRef: `fake-${sent.length}`, driver: "fake" };
    },
  };
  const DAY = new Date("2026-10-05T10:00:00.000Z"); // 12:00 CAT
  const NIGHT = new Date("2026-10-05T20:00:00.000Z"); // 22:00 CAT

  beforeAll(() => setMessagingChannel("email", fakeEmail));
  afterAll(() => setMessagingChannel("email", null));
  beforeEach(() => {
    sent.length = 0;
    failNext = false;
  });

  async function emailStudent(optedIn = true) {
    return student({ emailVerified: true, prefs: { version: 1, categories: { ANNOUNCEMENT: { email: optedIn } } } });
  }

  async function announcementNotice(userId: string) {
    return createNotification(userId, {
      type: "announcement.published",
      category: "ANNOUNCEMENT",
      title: "Mock exams start Monday",
      body: "Bring two pens and a calculator.",
      data: { entityType: "Announcement" },
      channels: ["IN_APP", "EMAIL"],
    });
  }

  it("emails an opted-in student once, with a link back to the notification", async () => {
    const user = await emailStudent();
    const notification = await announcementNotice(user.id);
    expect(await deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: DAY })).toMatchObject({ status: "sent" });
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ channel: "email", to: user.emailNormalized, subject: "Mock exams start Monday", tag: "notification.announcement.published" });
    expect(sent[0]?.text).toContain("Bring two pens and a calculator.");
    expect(sent[0]?.text).toContain(`/app/notifications/${notification.id}`);
    expect(sent[0]?.text).toContain("/app/notifications/settings");
    const stored = await db.notification.findUniqueOrThrow({ where: { id: notification.id }, select: { deliveries: true } });
    expect(stored.deliveries).toMatchObject({ EMAIL: { status: "SENT", providerRef: "fake-1" } });

    expect(await deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: DAY })).toMatchObject({
      status: "skipped",
      reason: "already_sent",
    });
    expect(sent).toHaveLength(1);
  });

  it("waits for the morning during quiet hours", async () => {
    const user = await emailStudent();
    const notification = await announcementNotice(user.id);
    expect(await deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: NIGHT })).toEqual({
      status: "deferred",
      channel: "EMAIL",
      until: "2026-10-06T04:00:00.000Z",
    });
    expect(sent).toHaveLength(0);
    expect((await pendingSendJob(notification.id, "EMAIL"))?.runAt).toEqual(new Date("2026-10-06T04:00:00.000Z"));
  });

  it("re-checks preferences and read state at send time and records why it skipped", async () => {
    const optedOut = await emailStudent(false);
    const first = await announcementNotice(optedOut.id);
    expect(await deliverNotification({ notificationId: first.id, channel: "EMAIL" }, { now: DAY })).toMatchObject({ status: "skipped", reason: "opted_out" });

    const reader = await emailStudent();
    const second = await announcementNotice(reader.id);
    await markInboxRead(reader.id, [second.id]);
    expect(await deliverNotification({ notificationId: second.id, channel: "EMAIL" }, { now: DAY })).toMatchObject({ status: "skipped", reason: "read_in_app" });
    const stored = await db.notification.findUniqueOrThrow({ where: { id: second.id }, select: { deliveries: true } });
    expect(stored.deliveries).toMatchObject({ EMAIL: { status: "SKIPPED", error: "read_in_app" } });
    expect(sent).toHaveLength(0);
  });

  it("records a provider failure and rethrows so the job retries", async () => {
    const user = await emailStudent();
    const notification = await announcementNotice(user.id);
    failNext = true;
    await expect(deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: DAY })).rejects.toThrow("provider timeout");
    const stored = await db.notification.findUniqueOrThrow({ where: { id: notification.id }, select: { deliveries: true } });
    expect(stored.deliveries).toMatchObject({ EMAIL: { status: "FAILED" } });
    // The retry succeeds.
    expect(await deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: DAY })).toMatchObject({ status: "sent" });
  });

  it("creates routed notifications for other services and queues their sends", async () => {
    const user = await student({ prefs: { version: 1, categories: { ASSIGNMENT: { sms: true } } } });
    await db.user.update({ where: { id: user.id }, data: { phoneE164: uniquePhone(), phoneVerifiedAt: new Date() } });
    const input = { type: "assignment.due", title: "Homework due tomorrow", body: "Algebra worksheet 3.", dedupeKey: "assignment.due:test" };
    const created = await createRoutedNotification(user.id, input);
    expect(created.channels).toEqual(["IN_APP", "SMS"]);
    expect(created.queued).toBe(1);
    expect(await pendingSendJob(created.id, "SMS")).not.toBeNull();
    // The same dedupe key returns the first notification and queues nothing new.
    expect(await createRoutedNotification(user.id, input)).toEqual({ id: created.id, channels: ["IN_APP", "SMS"], queued: 0 });
  });

  describe("notifications while optional email and SMS are off (the defaults; owner decision 2026-10-07)", () => {
    beforeEach(() => {
      featureFlags.email = false;
      featureFlags.sms = false;
    });
    afterEach(() => {
      featureFlags.email = true;
      featureFlags.sms = true;
    });

    it("routes nothing to email or SMS, so digests, reminders and announcements stay in-app", async () => {
      const user = await student({ emailVerified: true, prefs: { version: 1, categories: { ASSIGNMENT: { email: true, sms: true } } } });
      await db.user.update({ where: { id: user.id }, data: { phoneE164: uniquePhone(), phoneVerifiedAt: new Date() } });
      const created = await createRoutedNotification(user.id, { type: "assignment.due", title: "Homework due", body: "Worksheet 4.", dedupeKey: "assignment.due:off" });
      expect(created).toMatchObject({ channels: ["IN_APP"], queued: 0 });
      expect(await pendingSendJob(created.id, "EMAIL")).toBeNull();
      expect(await pendingSendJob(created.id, "SMS")).toBeNull();
    });

    it("skips a leftover email send queued before the switch, without calling the provider", async () => {
      const user = await emailStudent();
      const notification = await announcementNotice(user.id);
      expect(await deliverNotification({ notificationId: notification.id, channel: "EMAIL" }, { now: DAY })).toEqual({
        status: "skipped",
        channel: "EMAIL",
        reason: "switched_off",
      });
      expect(sent).toHaveLength(0);
      const stored = await db.notification.findUniqueOrThrow({ where: { id: notification.id }, select: { deliveries: true } });
      expect(stored.deliveries).toMatchObject({ EMAIL: { status: "SKIPPED", error: "switched_off" } });
    });
  });
});

// =====================================================================================================================

describe("announcement delivery (notify = true)", () => {
  async function announcement(options: { notify?: boolean; fannedOutAt?: Date } = {}) {
    const { user: author } = await createUser({ roles: ["ADMIN"] });
    return db.announcement.create({
      data: {
        scope: "GLOBAL",
        authorId: author.id,
        title: "Exam timetable published",
        body: "The **November** timetable is out.",
        bodyHtml: "<p>The <strong>November</strong> timetable is out.</p>",
        notify: options.notify ?? true,
        publishedAt: new Date(Date.now() - 3_600_000),
        fannedOutAt: options.fannedOutAt ?? new Date(),
      },
    });
  }

  async function fanOut(announcementId: string, userIds: string[]) {
    await notifyMany(userIds, {
      type: "announcement.published",
      category: "ANNOUNCEMENT",
      title: "Exam timetable published",
      body: "The November timetable is out.",
      data: { entityType: "Announcement", entityId: announcementId, scope: "GLOBAL" },
      dedupeKey: `announcement:${announcementId}`,
      announcementId,
    });
  }

  it("routes only opted-in recipients who can receive the channel, idempotently", async () => {
    const item = await announcement();
    const email = await student({ emailVerified: true, prefs: { version: 1, categories: { ANNOUNCEMENT: { email: true } } } });
    const smsNoPhone = await student({ prefs: { version: 1, categories: { ANNOUNCEMENT: { sms: true } } } });
    const notOptedIn = await student({ emailVerified: true });
    await fanOut(item.id, [email.id, smsNoPhone.id, notOptedIn.id]);

    expect(await runAnnouncementDelivery({ announcementId: item.id })).toEqual({ status: "done", routed: 1, queued: 1 });
    const rows = await db.notification.findMany({ where: { announcementId: item.id }, select: { id: true, userId: true, channels: true } });
    const byUser = new Map(rows.map((row) => [row.userId, row]));
    expect(byUser.get(email.id)?.channels).toEqual(["IN_APP", "EMAIL"]);
    expect(byUser.get(smsNoPhone.id)?.channels).toEqual(["IN_APP"]);
    expect(byUser.get(notOptedIn.id)?.channels).toEqual(["IN_APP"]);
    expect(await pendingSendJob(byUser.get(email.id)!.id, "EMAIL")).not.toBeNull();

    expect(await runAnnouncementDelivery({ announcementId: item.id })).toEqual({ status: "done", routed: 0, queued: 0 });
  });

  it("does nothing for announcements without notify, and the sweep finds recent fan-outs", async () => {
    const quiet = await announcement({ notify: false });
    expect(await runAnnouncementDelivery({ announcementId: quiet.id })).toEqual({ status: "skipped", reason: "notify_off" });

    const fannedOutAt = new Date("2031-01-01T00:30:00.000Z");
    const recent = await announcement({ fannedOutAt });
    const sweep = await runAnnouncementSweep({ now: new Date("2031-01-01T01:00:00.000Z") });
    expect(sweep.checked).toBeGreaterThanOrEqual(1);
    const job = await db.job.findFirst({ where: { dedupeKey: `announce-deliver:${recent.id}`, status: "PENDING" }, select: { payload: true } });
    expect(job?.payload).toEqual({ announcementId: recent.id });
  });
});

// =====================================================================================================================

describe("inbox views", () => {
  it("counts unread, resolves deep links and marks read only the owner's notifications", async () => {
    const owner = await student();
    const other = await student();
    const plan = await createNotification(owner.id, { type: "studyplan.updated", title: "Your plan changed", body: "We moved Algebra to Thursday.", data: { href: "/app/plan" } });
    const notice = await createNotification(owner.id, { type: "system.notice", title: "Maintenance", body: "Short downtime tonight." });
    const foreign = await createNotification(other.id, { type: "system.notice", title: "Theirs", body: "Not yours." });

    const digest = await getInboxDigest(owner.id, { includeItems: true });
    expect(digest.unread).toBe(2);
    expect(digest.items?.map((item) => [item.id, item.href])).toEqual([
      [notice.id, `/app/notifications/${notice.id}`],
      [plan.id, "/app/plan"],
    ]);
    expect(await getInboxDigest(owner.id)).toEqual({ unread: 2 });

    expect(await markInboxRead(owner.id, [plan.id, foreign.id])).toEqual({ updated: 1, unread: 1 });
    expect((await db.notification.findUniqueOrThrow({ where: { id: foreign.id } })).readAt).toBeNull();
    const unreadPage = await getInboxPage(owner.id, { unreadOnly: true });
    expect(unreadPage.items.map((item) => item.id)).toEqual([notice.id]);

    expect(await getInboxNotification(other.id, notice.id)).toBeNull();
    expect(await getInboxNotification(owner.id, "not-a-uuid")).toBeNull();
    expect(await getInboxNotification(owner.id, plan.id)).toMatchObject({ actionHref: "/app/plan", announcement: null, unread: false });
  });

  it("shows a live announcement's sanitised body, and a withdrawn one as withdrawn", async () => {
    const { user: author } = await createUser({ roles: ["ADMIN"] });
    const user = await student();
    const live = await db.announcement.create({
      data: { scope: "GLOBAL", authorId: author.id, title: "Library hours", body: "Open **late**.", bodyHtml: "<p>Open <strong>late</strong>.</p>", publishedAt: new Date() },
    });
    const notice = await createNotification(user.id, {
      type: "announcement.published",
      title: "Library hours",
      body: "Open late.",
      data: { entityType: "Announcement", entityId: live.id },
      announcementId: live.id,
    });
    expect(await getInboxNotification(user.id, notice.id)).toMatchObject({
      isAnnouncement: true,
      actionHref: null,
      announcement: { title: "Library hours", bodyHtml: "<p>Open <strong>late</strong>.</p>" },
      announcementWithdrawn: false,
    });
    await db.announcement.update({ where: { id: live.id }, data: { archivedAt: new Date() } });
    expect(await getInboxNotification(user.id, notice.id)).toMatchObject({ announcement: null, announcementWithdrawn: true });
  });
});
