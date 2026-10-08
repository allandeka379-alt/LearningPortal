import { describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createStudent } from "../../../tests/factories/index";
import { getNotificationPreferences, updateMarketingConsent, updateNotificationPreferences, type PreferencesUpdate } from "./preferences";

// Optional email and SMS are switched on for this file (`features.email` / `features.sms`): it covers the external
// channel paths, which are dormant while the flags are off (the defaults); one case switches them off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: true, sms: true, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

const actorFor = (userId: string) => ({ userId, roles: ["STUDENT" as const] });

const update: PreferencesUpdate = {
  reminders: { study: false, streakAtRisk: true, weeklySummary: false },
  dailyReminderTime: "19:30",
  channels: {
    REMINDER: { email: true, sms: false, whatsapp: false },
    LEARNING: { email: false, sms: false, whatsapp: false },
    ANNOUNCEMENT: { email: true, sms: true, whatsapp: false },
  },
};

describe("notification preferences (Profile.notificationPrefs)", () => {
  it("shows platform defaults and which channels the student can receive", async () => {
    const { user } = await createStudent({ emailVerified: true, student: { isMinor: false } });
    const view = await getNotificationPreferences(actorFor(user.id));
    expect(view.reminders).toEqual({ study: true, streakAtRisk: true, weeklySummary: true });
    expect(view.dailyReminderTime).toBe("17:00");
    expect(view.reminderTimeOptions).toContain("17:00");
    expect(view.channels.ANNOUNCEMENT).toEqual({ email: false, sms: false, whatsapp: false });
    expect(view.available).toEqual({ email: true, sms: false, whatsapp: false });
    expect(view.quietHours).toEqual({ start: "21:00", end: "06:00" });
    expect(view.marketing).toEqual({ email: false, sms: false, whatsapp: false, allowed: true });
    expect(view.offered).toEqual({ email: true, sms: true, whatsapp: false });
  });

  it("offers no external channel while optional email, SMS and WhatsApp are off (notifications stay in-app)", async () => {
    featureFlags.email = false;
    featureFlags.sms = false;
    try {
      const { user } = await createStudent({ emailVerified: true, student: { isMinor: false } });
      await db.user.update({ where: { id: user.id }, data: { contactPhoneE164: "+263771234567" } });
      const view = await getNotificationPreferences(actorFor(user.id));
      expect(view.offered).toEqual({ email: false, sms: false, whatsapp: false });
      expect(view.available).toEqual({ email: false, sms: false, whatsapp: false });
    } finally {
      featureFlags.email = true;
      featureFlags.sms = true;
    }
  });

  it("saves reminders and channels, keeping keys other modules own", async () => {
    const { user } = await createStudent();
    await db.profile.update({ where: { userId: user.id }, data: { notificationPrefs: { version: 1, parentDigest: "WEEKLY" } } });
    await updateNotificationPreferences(actorFor(user.id), update);
    const stored = await db.profile.findUniqueOrThrow({ where: { userId: user.id }, select: { notificationPrefs: true } });
    expect(stored.notificationPrefs).toMatchObject({ version: 1, parentDigest: "WEEKLY", dailyReminderTime: "19:30", reminders: update.reminders });
    const view = await getNotificationPreferences(actorFor(user.id));
    expect(view.reminders).toEqual(update.reminders);
    expect(view.dailyReminderTime).toBe("19:30");
    expect(view.channels).toEqual(update.channels);
  });

  it("refuses a reminder time at night or a malformed input", async () => {
    const { user } = await createStudent();
    const night = await updateNotificationPreferences(actorFor(user.id), { ...update, dailyReminderTime: "22:00" }).catch((e: unknown) => e);
    expect(isAppError(night) && night.code).toBe("VALIDATION");
    expect(isAppError(night) && night.fieldErrors?.dailyReminderTime).toBeTruthy();
    const malformed = await updateNotificationPreferences(actorFor(user.id), { reminders: "all" }).catch((e: unknown) => e);
    expect(isAppError(malformed) && malformed.code).toBe("VALIDATION");
  });
});

describe("marketing consent (separate, audited)", () => {
  it("records grants and withdrawals with an audit entry each", async () => {
    const { user } = await createStudent({ student: { isMinor: false } });
    const granted = await updateMarketingConsent(actorFor(user.id), { email: true, sms: false, whatsapp: false });
    expect(granted).toEqual({ email: true, sms: false, whatsapp: false, allowed: true });
    const profile = await db.profile.findUniqueOrThrow({ where: { userId: user.id }, select: { marketingEmailOptInAt: true, marketingSmsOptInAt: true } });
    expect(profile.marketingEmailOptInAt).toBeInstanceOf(Date);
    expect(profile.marketingSmsOptInAt).toBeNull();

    await updateMarketingConsent(actorFor(user.id), { email: false, sms: false, whatsapp: false });
    const after = await db.profile.findUniqueOrThrow({ where: { userId: user.id }, select: { marketingEmailOptInAt: true } });
    expect(after.marketingEmailOptInAt).toBeNull();

    const audits = await db.auditLog.findMany({
      where: { targetUserId: user.id, entityType: "Profile" },
      orderBy: { createdAt: "asc" },
      select: { action: true, metadata: true, actorUserId: true },
    });
    expect(audits.map((a) => a.action)).toEqual(["consent.grant", "consent.withdraw"]);
    expect(audits[0]?.metadata).toMatchObject({ consent: "marketing", channel: "email" });
    expect(audits[0]?.actorUserId).toBe(user.id);
  });

  it("never opts a minor in, and writes nothing when nothing changed", async () => {
    const { user } = await createStudent({ student: { isMinor: true } });
    const error = await updateMarketingConsent(actorFor(user.id), { email: true, sms: false, whatsapp: false }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("FORBIDDEN");
    const unchanged = await updateMarketingConsent(actorFor(user.id), { email: false, sms: false, whatsapp: false });
    expect(unchanged.allowed).toBe(false);
    expect(await db.auditLog.count({ where: { targetUserId: user.id, entityType: "Profile" } })).toBe(0);
  });
});
