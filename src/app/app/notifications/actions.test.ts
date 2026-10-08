import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createCurriculumChain, createStudent, type CurriculumChain } from "../../../../tests/factories/index";

/**
 * Wiring tests for the notification Server Actions: form fields → guard → notification services → ActionResult.
 * `next/headers` (session cookie) and `next/cache` are mocked; the services and the database are real.
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();
const revalidated = vi.hoisted(() => [] as string[]);

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: (path: string) => void revalidated.push(path) }));

const actions = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");
const { createNotification } = await import("@/server/notifications/service");

let chain: CurriculumChain;
beforeAll(async () => {
  chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
});

beforeEach(() => {
  jar.clear();
  revalidated.length = 0;
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

async function signedInStudent(isMinor = false) {
  const { user } = await createStudent({
    student: { isMinor, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  jar.set(currentSessionCookieName(), token);
  return user.id;
}

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("inbox actions", () => {
  it("marks one or all of the student's notifications read and refreshes the student area", async () => {
    const userId = await signedInStudent();
    const a = await createNotification(userId, { type: "system.notice", title: "One", body: "First." });
    const b = await createNotification(userId, { type: "system.notice", title: "Two", body: "Second." });

    await actions.markNotificationReadAction(form({ notificationId: a.id }));
    expect((await db.notification.findUniqueOrThrow({ where: { id: a.id } })).readAt).toBeInstanceOf(Date);
    expect((await db.notification.findUniqueOrThrow({ where: { id: b.id } })).readAt).toBeNull();
    expect(revalidated).toEqual(["/app"]);

    await actions.markNotificationReadAction(form({ notificationId: "not-a-uuid" }));
    await actions.markAllNotificationsReadAction();
    expect((await db.notification.findUniqueOrThrow({ where: { id: b.id } })).readAt).toBeInstanceOf(Date);
  });

  it("refuses signed-out callers", async () => {
    await expect(actions.markAllNotificationsReadAction()).rejects.toMatchObject({ code: "UNAUTHENTICATED" });
  });
});

describe("settings actions", () => {
  it("saves the preferences form", async () => {
    const userId = await signedInStudent();
    const result = await actions.updateNotificationPreferencesAction(
      null,
      form({ studyReminder: "on", dailyReminderTime: "18:00", "channel.ANNOUNCEMENT.email": "on" }),
    );
    expect(result).toEqual({ ok: true, data: { message: "Notification settings saved." } });
    const profile = await db.profile.findUniqueOrThrow({ where: { userId }, select: { notificationPrefs: true } });
    expect(profile.notificationPrefs).toMatchObject({
      dailyReminderTime: "18:00",
      reminders: { study: true, streakAtRisk: false, weeklySummary: false },
      categories: { ANNOUNCEMENT: { email: true, sms: false, whatsapp: false } },
    });

    const invalid = await actions.updateNotificationPreferencesAction(null, form({ dailyReminderTime: "23:00" }));
    expect(invalid).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { dailyReminderTime: expect.any(Array) } } });
  });

  it("records marketing consent with an audit entry, and refuses it for minors", async () => {
    const adult = await signedInStudent();
    expect(await actions.updateMarketingConsentAction(null, form({ marketingEmail: "on" }))).toEqual({
      ok: true,
      data: { message: "Saved. News and offers by email." },
    });
    expect(await db.auditLog.count({ where: { targetUserId: adult, action: "consent.grant" } })).toBe(1);

    jar.clear();
    await signedInStudent(true);
    expect(await actions.updateMarketingConsentAction(null, form({ marketingEmail: "on" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
  });
});
