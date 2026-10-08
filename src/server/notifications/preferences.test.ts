import { describe, expect, it } from "vitest";
import {
  CODE_NOTIFICATION_DEFAULTS,
  contactPointsFrom,
  decideDelivery,
  inQuietWindow,
  isAllowedReminderTime,
  isQuietTime,
  localMinuteOfDay,
  mergeNotificationDefaults,
  NO_CONTACTS,
  quietHoursEnd,
  readStoredPreferences,
  reminderTimeOptions,
  resolvePreferences,
  routeChannels,
  withPreferencesUpdate,
  type ContactPoints,
  type DeliveryFacts,
} from "./preferences";

const DEFAULTS = CODE_NOTIFICATION_DEFAULTS;
const HARARE = "Africa/Harare"; // UTC+2, no DST

describe("reading and resolving Profile.notificationPrefs", () => {
  it("uses platform defaults for a missing or unreadable document", () => {
    for (const raw of [null, undefined, "nonsense", 42, [], { version: 1 }]) {
      const prefs = resolvePreferences(raw, DEFAULTS);
      expect(prefs.reminders).toEqual({ study: true, streakAtRisk: true, weeklySummary: true });
      expect(prefs.dailyReminderTime).toBe("17:00");
      expect(prefs.categories.ANNOUNCEMENT).toEqual({ inApp: true, email: false, sms: false, push: false, whatsapp: false });
      expect(prefs.categories.SECURITY.email).toBe(true);
      expect(prefs.quietWindows).toEqual([{ start: "21:00", end: "06:00" }]);
    }
  });

  it("reads each part on its own, so one bad key never hides the others", () => {
    const stored = readStoredPreferences({
      version: 1,
      categories: { ANNOUNCEMENT: { email: true, sms: "yes" }, REMINDER: { sms: true }, NOT_A_CATEGORY: { email: true } },
      quietHours: { start: "25:00", end: "06:00" },
      dailyReminderTime: "18:30",
      reminders: { study: false, weeklySummary: "maybe" },
      parentDigest: "WEEKLY",
    });
    expect(stored.categories).toEqual({ REMINDER: { sms: true } });
    expect(stored.quietHours).toBeNull();
    expect(stored.dailyReminderTime).toBe("18:30");
    expect(stored.reminders).toEqual({});
  });

  it("applies stored choices over defaults and keeps in-app on for security", () => {
    const prefs = resolvePreferences(
      {
        categories: { ANNOUNCEMENT: { email: true, whatsapp: true }, SECURITY: { inApp: false } },
        reminders: { study: false },
        dailyReminderTime: "06:30",
        quietHours: { start: "13:00", end: "14:00" },
      },
      DEFAULTS,
    );
    expect(prefs.categories.ANNOUNCEMENT).toMatchObject({ email: true, whatsapp: true, sms: false });
    expect(prefs.categories.SECURITY.inApp).toBe(true);
    expect(prefs.reminders).toEqual({ study: false, streakAtRisk: true, weeklySummary: true });
    expect(prefs.dailyReminderTime).toBe("06:30");
    expect(prefs.quietWindows).toEqual([
      { start: "21:00", end: "06:00" },
      { start: "13:00", end: "14:00" },
    ]);
  });

  it("ignores a stored reminder time inside quiet hours or off the 15-minute grid", () => {
    expect(resolvePreferences({ dailyReminderTime: "22:00" }, DEFAULTS).dailyReminderTime).toBe("17:00");
    expect(resolvePreferences({ dailyReminderTime: "17:10" }, DEFAULTS).dailyReminderTime).toBe("17:00");
  });

  it("merges a partial notifications.defaults Setting over the code defaults", () => {
    const merged = mergeNotificationDefaults(DEFAULTS, {
      categories: { ANNOUNCEMENT: { email: true } },
      dailyReminderTime: "18:00",
      reminders: { weeklySummary: false },
    });
    expect(merged.categories.ANNOUNCEMENT.email).toBe(true);
    expect(merged.categories.REMINDER.email).toBe(false);
    expect(merged.dailyReminderTime).toBe("18:00");
    expect(merged.reminders).toEqual({ study: true, streakAtRisk: true, weeklySummary: false });
    expect(merged.quietHours).toEqual(DEFAULTS.quietHours);
  });

  it("writes an update without losing keys owned by other modules", () => {
    const stored = { version: 1, parentDigest: "MONTHLY", categories: { SECURITY: { email: false }, ANNOUNCEMENT: { push: true } }, extra: { a: 1 } };
    const next = withPreferencesUpdate(stored, {
      reminders: { study: false, streakAtRisk: true, weeklySummary: false },
      dailyReminderTime: "19:00",
      channels: {
        REMINDER: { email: true, sms: false, whatsapp: false },
        LEARNING: { email: false, sms: false, whatsapp: false },
        ANNOUNCEMENT: { email: false, sms: true, whatsapp: false },
      },
    });
    expect(next).toEqual({
      version: 1,
      parentDigest: "MONTHLY",
      extra: { a: 1 },
      dailyReminderTime: "19:00",
      reminders: { study: false, streakAtRisk: true, weeklySummary: false },
      categories: {
        SECURITY: { email: false },
        ANNOUNCEMENT: { push: true, email: false, sms: true, whatsapp: false },
        REMINDER: { email: true, sms: false, whatsapp: false },
        LEARNING: { email: false, sms: false, whatsapp: false },
      },
    });
  });
});

describe("quiet hours (21:00-06:00 local)", () => {
  const window = { start: "21:00", end: "06:00" };

  it("matches windows that wrap midnight, end-exclusive", () => {
    expect(inQuietWindow(21 * 60, window)).toBe(true);
    expect(inQuietWindow(23 * 60 + 59, window)).toBe(true);
    expect(inQuietWindow(5 * 60 + 59, window)).toBe(true);
    expect(inQuietWindow(6 * 60, window)).toBe(false);
    expect(inQuietWindow(20 * 60 + 59, window)).toBe(false);
    expect(inQuietWindow(12 * 60, { start: "10:00", end: "10:00" })).toBe(false);
  });

  it("uses the student's time zone", () => {
    expect(localMinuteOfDay(new Date("2026-10-05T19:30:00Z"), HARARE)).toBe(21 * 60 + 30);
    expect(isQuietTime(new Date("2026-10-05T19:30:00Z"), HARARE, [window])).toBe(true); // 21:30 CAT
    expect(isQuietTime(new Date("2026-10-05T18:59:00Z"), HARARE, [window])).toBe(false); // 20:59 CAT
    expect(isQuietTime(new Date("2026-10-05T03:59:00Z"), HARARE, [window])).toBe(true); // 05:59 CAT
    expect(isQuietTime(new Date("2026-10-05T04:00:00Z"), HARARE, [window])).toBe(false); // 06:00 CAT
    expect(isQuietTime(new Date("2026-10-05T19:30:00Z"), "Europe/London", [window])).toBe(false); // 20:30 BST
  });

  it("finds when the quiet period ends, chaining overlapping windows", () => {
    expect(quietHoursEnd(new Date("2026-10-05T12:00:00Z"), HARARE, [window])).toBeNull();
    expect(quietHoursEnd(new Date("2026-10-05T19:30:00Z"), HARARE, [window])?.toISOString()).toBe("2026-10-06T04:00:00.000Z");
    expect(quietHoursEnd(new Date("2026-10-06T01:00:00Z"), HARARE, [window])?.toISOString()).toBe("2026-10-06T04:00:00.000Z");
    expect(quietHoursEnd(new Date("2026-10-05T19:30:00Z"), HARARE, [window, { start: "05:30", end: "07:00" }])?.toISOString()).toBe(
      "2026-10-06T05:00:00.000Z",
    );
  });

  it("offers reminder times every 30 minutes from 06:00 to 20:30 only", () => {
    const options = reminderTimeOptions();
    expect(options[0]).toBe("06:00");
    expect(options.at(-1)).toBe("20:30");
    expect(options).toHaveLength(30);
    expect(isAllowedReminderTime("20:45")).toBe(true);
    expect(isAllowedReminderTime("21:00")).toBe(false);
    expect(isAllowedReminderTime("05:45")).toBe(false);
    expect(isAllowedReminderTime("17:10")).toBe(false);
    expect(isAllowedReminderTime("7:00")).toBe(false);
  });
});

describe("contact points and routing", () => {
  const now = new Date("2026-10-05T10:00:00Z");
  const base = {
    emailNormalized: "tariro@example.test",
    emailVerifiedAt: null as Date | null,
    phoneE164: null as string | null,
    phoneVerifiedAt: null as Date | null,
    contactPhoneE164: null as string | null,
    channelIdentities: [] as { externalId: string; verifiedAt: Date | null; optedInAt: Date | null; optedOutAt: Date | null; lastInboundAt: Date | null }[],
  };

  it("needs a verified email, and uses the verified phone before the shared contact phone", () => {
    expect(contactPointsFrom(base, now)).toEqual({ email: null, sms: null, whatsapp: null });
    expect(contactPointsFrom({ ...base, emailVerifiedAt: now }, now).email).toBe("tariro@example.test");
    expect(contactPointsFrom({ ...base, phoneE164: "+263771234567", contactPhoneE164: "+263772222222" }, now).sms).toBe("+263772222222");
    expect(contactPointsFrom({ ...base, phoneE164: "+263771234567", phoneVerifiedAt: now, contactPhoneE164: "+263772222222" }, now).sms).toBe(
      "+263771234567",
    );
  });

  it("uses WhatsApp only for a verified, opted-in identity and knows the 24-hour window", () => {
    const identity = { externalId: "+263771234567", verifiedAt: now, optedInAt: new Date("2026-09-01T00:00:00Z"), optedOutAt: null, lastInboundAt: new Date("2026-10-05T02:00:00Z") };
    expect(contactPointsFrom({ ...base, channelIdentities: [identity] }, now).whatsapp).toEqual({ to: "+263771234567", sessionOpen: true });
    expect(contactPointsFrom({ ...base, channelIdentities: [{ ...identity, lastInboundAt: new Date("2026-10-03T00:00:00Z") }] }, now).whatsapp?.sessionOpen).toBe(false);
    expect(contactPointsFrom({ ...base, channelIdentities: [{ ...identity, optedOutAt: new Date("2026-09-10T00:00:00Z") }] }, now).whatsapp).toBeNull();
    expect(contactPointsFrom({ ...base, channelIdentities: [{ ...identity, verifiedAt: null }] }, now).whatsapp).toBeNull();
  });

  it("routes to in-app plus each opted-in channel the user can receive", () => {
    const prefs = resolvePreferences({ categories: { ANNOUNCEMENT: { email: true, sms: true } } }, DEFAULTS);
    expect(routeChannels("ANNOUNCEMENT", prefs, { email: true, sms: false, whatsapp: true })).toEqual(["IN_APP", "EMAIL"]);
    expect(routeChannels("ANNOUNCEMENT", prefs, NO_CONTACTS)).toEqual(["IN_APP"]);
    expect(routeChannels("REMINDER", prefs, { email: true, sms: true, whatsapp: true })).toEqual(["IN_APP"]);
  });
});

describe("decideDelivery", () => {
  const contacts: ContactPoints = { email: "tariro@example.test", sms: "+263771234567", whatsapp: { to: "+263771234567", sessionOpen: true } };
  const prefs = resolvePreferences(
    { categories: { ANNOUNCEMENT: { email: true, sms: true, whatsapp: true }, REMINDER: { sms: true } } },
    DEFAULTS,
  );
  const facts = (overrides: Partial<DeliveryFacts> = {}): DeliveryFacts => ({
    channel: "EMAIL",
    category: "ANNOUNCEMENT",
    now: new Date("2026-10-05T10:00:00Z"), // 12:00 CAT
    readAt: null,
    expiresAt: null,
    userActive: true,
    alreadySent: false,
    prefs,
    timeZone: HARARE,
    contacts,
    providerConfigured: true,
    ...overrides,
  });

  it("sends to the channel's address in the daytime", () => {
    expect(decideDelivery(facts())).toEqual({ action: "send", to: "tariro@example.test" });
    expect(decideDelivery(facts({ channel: "SMS" }))).toEqual({ action: "send", to: "+263771234567" });
    expect(decideDelivery(facts({ channel: "WHATSAPP" }))).toEqual({ action: "send", to: "+263771234567" });
  });

  it("skips with a reason", () => {
    const skip = (f: Partial<DeliveryFacts>) => {
      const decision = decideDelivery(facts(f));
      return decision.action === "skip" ? decision.reason : decision.action;
    };
    expect(skip({ alreadySent: true })).toBe("already_sent");
    expect(skip({ userActive: false })).toBe("user_inactive");
    expect(skip({ expiresAt: new Date("2026-10-05T09:00:00Z") })).toBe("expired");
    expect(skip({ readAt: new Date("2026-10-05T09:30:00Z") })).toBe("read_in_app");
    expect(skip({ category: "LEARNING" })).toBe("opted_out");
    expect(skip({ contacts: { ...contacts, email: null } })).toBe("no_recipient");
    expect(skip({ channel: "WHATSAPP", contacts: { ...contacts, whatsapp: null } })).toBe("no_recipient");
    expect(skip({ channel: "WHATSAPP", contacts: { ...contacts, whatsapp: { to: "+263771234567", sessionOpen: false } } })).toBe(
      "whatsapp_template_required",
    );
    expect(skip({ providerConfigured: false })).toBe("provider_not_configured");
  });

  it("waits for the morning during quiet hours, or drops what expires first", () => {
    const night = new Date("2026-10-05T20:00:00Z"); // 22:00 CAT
    expect(decideDelivery(facts({ now: night }))).toEqual({ action: "defer", until: new Date("2026-10-06T04:00:00Z") });
    expect(decideDelivery(facts({ now: night, category: "REMINDER", channel: "SMS", expiresAt: new Date("2026-10-05T22:00:00Z") }))).toEqual({
      action: "skip",
      reason: "quiet_hours",
    });
  });

  it("never holds back security messages", () => {
    const security = resolvePreferences({}, DEFAULTS);
    const decision = decideDelivery(facts({ category: "SECURITY", prefs: security, now: new Date("2026-10-05T20:00:00Z"), readAt: new Date() }));
    expect(decision).toEqual({ action: "send", to: "tariro@example.test" });
  });
});
