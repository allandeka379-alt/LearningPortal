import "server-only";
import { z } from "zod";
import { NotificationCategory, type NotificationChannel, type Prisma, type Role } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { addDays, isValidTimeZone, localDateString, startOfLocalDay, timeZoneOffsetMinutes } from "@/lib/dates";
import type { FeatureFlags } from "@/lib/features";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { getSetting } from "@/server/lib/settings";

/**
 * Notification preferences, channel routing and quiet hours (§6 study reminders, §19 streak reminders, §21 / §22
 * announcements; ARCHITECTURE §3.2 `notifications`: "preferences, quiet hours").
 *
 * Stored in `Profile.notificationPrefs` (JSON, documented in the schema) and read LENIENTLY: an unreadable part falls
 * back to the platform default instead of failing a page or a job. Platform defaults come from the Setting
 * `notifications.defaults` (partial override, Zod-validated here) on top of {@link CODE_NOTIFICATION_DEFAULTS}.
 *
 * Document shape (version 1). Keys this module does not own (e.g. `parentDigest`, written by the family module) are
 * always preserved on write:
 *
 *     { version: 1,
 *       categories?: { [NotificationCategory]?: { inApp?, email?, sms?, push?, whatsapp?: boolean } },
 *       quietHours?: { start: "HH:MM", end: "HH:MM" },     // extra personal window; the platform window always applies
 *       dailyReminderTime?: "HH:MM",                       // local time of the daily study / streak reminder
 *       reminders?: { study?, streakAtRisk?, weeklySummary?: boolean },
 *       parentDigest?: "OFF" | "WEEKLY" | "MONTHLY" }
 *
 * Rules:
 * - In-app is always on (the inbox is the record); external channels (email, SMS, WhatsApp) are OPT-IN per category
 *   and need a usable contact point: a verified email, a phone, or a linked WhatsApp number that opted in.
 * - Quiet hours: no email / SMS / WhatsApp between 21:00 and 06:00 local time (platform window, Profile.timezone).
 *   Messages due then wait for the morning; time-bound ones (reminders) are dropped instead. SECURITY is exempt.
 * - Marketing consent (`Profile.marketing*OptInAt`) is separate from these preferences: announcements are not
 *   marketing, and opting in to announcement emails never implies marketing consent (and vice versa).
 * - Switched-off channels (`features.email` — notification email is OPTIONAL email —, `features.sms`,
 *   `features.whatsapp`; all off by default, docs/ARCHITECTURE.md §3.14) are treated as unreachable: nothing is routed
 *   to them, the delivery job skips them, and the settings page does not offer them. Notifications (digests,
 *   announcements, reminders, receipts) then stay in the in-app inbox. Stored choices are kept, so they apply again
 *   when the channel is switched back on. Account email (codes, resets, security notices, invitations) does not go
 *   through notifications and is always sent.
 */

export const NOTIFICATION_PREFS_VERSION = 1;
/** Setting key holding the platform defaults (partial override of {@link CODE_NOTIFICATION_DEFAULTS}). */
export const NOTIFICATION_DEFAULTS_SETTING = "notifications.defaults";

export const NOTIFICATION_CATEGORIES = Object.values(NotificationCategory) as NotificationCategory[];

/** Channel keys used inside the preferences document. */
export const PREFERENCE_CHANNEL_KEYS = ["inApp", "email", "sms", "push", "whatsapp"] as const;
export type PreferenceChannelKey = (typeof PREFERENCE_CHANNEL_KEYS)[number];

/** Channels delivered by the `notifications.send` job (web push has no adapter yet). */
export const EXTERNAL_CHANNELS = ["EMAIL", "SMS", "WHATSAPP"] as const satisfies readonly NotificationChannel[];
export type ExternalChannel = (typeof EXTERNAL_CHANNELS)[number];

export const CHANNEL_KEY: Readonly<Record<NotificationChannel, PreferenceChannelKey>> = {
  IN_APP: "inApp",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
  WHATSAPP: "whatsapp",
};

/** Lower-case key of an external channel (`EMAIL` → `email`), as used in forms and the document. */
export type ExternalChannelKey = "email" | "sms" | "whatsapp";
export const EXTERNAL_CHANNEL_KEYS: readonly ExternalChannelKey[] = ["email", "sms", "whatsapp"];

export function isExternalChannel(channel: NotificationChannel): channel is ExternalChannel {
  return (EXTERNAL_CHANNELS as readonly string[]).includes(channel);
}

/** Categories a student can route to email / SMS / WhatsApp from the preferences page (the ones delivered today). */
export const EDITABLE_CATEGORIES = ["REMINDER", "LEARNING", "ANNOUNCEMENT"] as const satisfies readonly NotificationCategory[];
export type EditableCategory = (typeof EDITABLE_CATEGORIES)[number];

/** Categories whose messages are never held back by quiet hours or skipped once read in-app. */
const URGENT_CATEGORIES: ReadonlySet<NotificationCategory> = new Set<NotificationCategory>(["SECURITY"]);

export type ChannelToggles = Record<PreferenceChannelKey, boolean>;
export interface ReminderToggles {
  study: boolean;
  streakAtRisk: boolean;
  weeklySummary: boolean;
}
export interface QuietWindow {
  start: string;
  end: string;
}

export interface NotificationDefaults {
  categories: Record<NotificationCategory, ChannelToggles>;
  /** The platform quiet window (always applies). */
  quietHours: QuietWindow;
  dailyReminderTime: string;
  reminders: ReminderToggles;
}

const HH_MM = /^([01]\d|2[0-3]):[0-5]\d$/;
export const timeOfDaySchema = z.string().regex(HH_MM, { error: "Use a time like 17:00." });

const channelTogglesSchema = z.looseObject({
  inApp: z.boolean().optional(),
  email: z.boolean().optional(),
  sms: z.boolean().optional(),
  push: z.boolean().optional(),
  whatsapp: z.boolean().optional(),
});
const quietWindowSchema = z.object({ start: timeOfDaySchema, end: timeOfDaySchema });
const reminderTogglesSchema = z.looseObject({
  study: z.boolean().optional(),
  streakAtRisk: z.boolean().optional(),
  weeklySummary: z.boolean().optional(),
});

function allChannels(value: boolean, overrides: Partial<ChannelToggles> = {}): ChannelToggles {
  return { inApp: true, email: value, sms: value, push: value, whatsapp: value, ...overrides };
}

/** Code defaults: in-app on everywhere; external channels off, except transactional email (account, security, billing). */
export const CODE_NOTIFICATION_DEFAULTS: NotificationDefaults = Object.freeze({
  categories: Object.fromEntries(
    NOTIFICATION_CATEGORIES.map((category) => [
      category,
      allChannels(false, category === "SECURITY" || category === "ACCOUNT" || category === "BILLING" ? { email: true } : {}),
    ]),
  ) as Record<NotificationCategory, ChannelToggles>,
  quietHours: { start: "21:00", end: "06:00" },
  dailyReminderTime: "17:00",
  reminders: { study: true, streakAtRisk: true, weeklySummary: true },
});

/** Shape of the `notifications.defaults` Setting: any subset of {@link NotificationDefaults}. */
export const notificationDefaultsOverrideSchema = z.looseObject({
  categories: z.record(z.string(), channelTogglesSchema).optional(),
  quietHours: quietWindowSchema.optional(),
  dailyReminderTime: timeOfDaySchema.optional(),
  reminders: reminderTogglesSchema.optional(),
});
export type NotificationDefaultsOverride = z.output<typeof notificationDefaultsOverrideSchema>;

function definedBooleans<T extends string>(value: Partial<Record<T, unknown>>, keys: readonly T[]): Partial<Record<T, boolean>> {
  const out: Partial<Record<T, boolean>> = {};
  for (const key of keys) if (typeof value[key] === "boolean") out[key] = value[key] as boolean;
  return out;
}

/** Applies a Setting override on top of the code defaults. Pure. */
export function mergeNotificationDefaults(base: NotificationDefaults, override: NotificationDefaultsOverride): NotificationDefaults {
  const categories = { ...base.categories };
  for (const category of NOTIFICATION_CATEGORIES) {
    const patch = override.categories?.[category];
    if (patch) categories[category] = { ...categories[category], ...definedBooleans(patch, PREFERENCE_CHANNEL_KEYS) };
  }
  return {
    categories,
    quietHours: override.quietHours ?? base.quietHours,
    dailyReminderTime: override.dailyReminderTime ?? base.dailyReminderTime,
    reminders: { ...base.reminders, ...definedBooleans(override.reminders ?? {}, ["study", "streakAtRisk", "weeklySummary"] as const) },
  };
}

/** Platform defaults (Setting `notifications.defaults`, 60 s cache) merged onto the code defaults. */
export async function getNotificationDefaults(): Promise<NotificationDefaults> {
  const override = await getSetting(NOTIFICATION_DEFAULTS_SETTING, notificationDefaultsOverrideSchema, {});
  return mergeNotificationDefaults(CODE_NOTIFICATION_DEFAULTS, override);
}

// =====================================================================================================================
// Reading and resolving the stored document (pure)
// =====================================================================================================================

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The parts of a stored document this module understands; anything unreadable is left out. */
export interface StoredNotificationPreferences {
  categories: Partial<Record<NotificationCategory, Partial<ChannelToggles>>>;
  quietHours: QuietWindow | null;
  dailyReminderTime: string | null;
  reminders: Partial<ReminderToggles>;
}

/** Leniently reads `Profile.notificationPrefs`: each part is validated on its own, so one bad key never hides the rest. */
export function readStoredPreferences(raw: unknown): StoredNotificationPreferences {
  const doc = isRecord(raw) ? raw : {};
  const categories: StoredNotificationPreferences["categories"] = {};
  if (isRecord(doc.categories)) {
    for (const category of NOTIFICATION_CATEGORIES) {
      const parsed = channelTogglesSchema.safeParse(doc.categories[category]);
      if (parsed.success) categories[category] = definedBooleans(parsed.data, PREFERENCE_CHANNEL_KEYS);
    }
  }
  const quietHours = quietWindowSchema.safeParse(doc.quietHours);
  const time = timeOfDaySchema.safeParse(doc.dailyReminderTime);
  const reminders = reminderTogglesSchema.safeParse(doc.reminders);
  return {
    categories,
    quietHours: quietHours.success ? quietHours.data : null,
    dailyReminderTime: time.success ? time.data : null,
    reminders: reminders.success ? definedBooleans(reminders.data, ["study", "streakAtRisk", "weeklySummary"] as const) : {},
  };
}

export interface ResolvedNotificationPreferences {
  categories: Record<NotificationCategory, ChannelToggles>;
  /** Platform window first, then the user's own extra window (if any). A time inside any window is quiet. */
  quietWindows: QuietWindow[];
  dailyReminderTime: string;
  reminders: ReminderToggles;
}

/** Effective preferences: stored values over platform defaults. In-app is always on for SECURITY. Pure. */
export function resolvePreferences(raw: unknown, defaults: NotificationDefaults): ResolvedNotificationPreferences {
  const stored = readStoredPreferences(raw);
  const categories = {} as Record<NotificationCategory, ChannelToggles>;
  for (const category of NOTIFICATION_CATEGORIES) {
    categories[category] = { ...defaults.categories[category], ...stored.categories[category] };
  }
  categories.SECURITY = { ...categories.SECURITY, inApp: true };
  const quietWindows = [defaults.quietHours];
  if (stored.quietHours && (stored.quietHours.start !== defaults.quietHours.start || stored.quietHours.end !== defaults.quietHours.end)) {
    quietWindows.push(stored.quietHours);
  }
  const reminderTime = stored.dailyReminderTime;
  return {
    categories,
    quietWindows,
    dailyReminderTime: reminderTime && isAllowedReminderTime(reminderTime, defaults.quietHours) ? reminderTime : defaults.dailyReminderTime,
    reminders: { ...defaults.reminders, ...stored.reminders },
  };
}

// =====================================================================================================================
// Quiet hours (pure)
// =====================================================================================================================

/** "17:30" → 1050. */
export function minutesOfDay(hhmm: string): number {
  const [h, m] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
}

/** "HH:MM" for a minute of the day (wraps). */
export function formatTimeOfDay(minutes: number): string {
  const m = ((Math.trunc(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

/** Minute of the local day (0-1439) of `instant` in `timeZone`. */
export function localMinuteOfDay(instant: Date, timeZone: string): number {
  const offset = timeZoneOffsetMinutes(instant, safeZone(timeZone));
  const utc = instant.getUTCHours() * 60 + instant.getUTCMinutes();
  return (((utc + offset) % 1440) + 1440) % 1440;
}

/** Whether `minute` lies in `[start, end)`; windows may wrap midnight (21:00-06:00). An empty window never matches. */
export function inQuietWindow(minute: number, window: QuietWindow): boolean {
  const start = minutesOfDay(window.start);
  const end = minutesOfDay(window.end);
  if (start === end) return false;
  return start < end ? minute >= start && minute < end : minute >= start || minute < end;
}

export function isQuietTime(instant: Date, timeZone: string, windows: readonly QuietWindow[]): boolean {
  const minute = localMinuteOfDay(instant, timeZone);
  return windows.some((window) => inQuietWindow(minute, window));
}

/**
 * When the quiet period containing `instant` ends (the next local time outside every window), or `null` when
 * `instant` is not quiet. Overlapping or back-to-back windows are chained.
 */
export function quietHoursEnd(instant: Date, timeZone: string, windows: readonly QuietWindow[]): Date | null {
  const zone = safeZone(timeZone);
  if (!isQuietTime(instant, zone, windows)) return null;
  let candidate = instant;
  for (let guard = 0; guard < 8 && isQuietTime(candidate, zone, windows); guard += 1) {
    const minute = localMinuteOfDay(candidate, zone);
    const date = localDateString(candidate, zone);
    let latest = candidate;
    for (const window of windows) {
      if (!inQuietWindow(minute, window)) continue;
      const end = minutesOfDay(window.end);
      const day = end > minute ? date : addDays(date, 1);
      const endInstant = new Date(startOfLocalDay(day, zone).getTime() + end * 60_000);
      if (endInstant > latest) latest = endInstant;
    }
    if (latest.getTime() === candidate.getTime()) break;
    candidate = latest;
  }
  return candidate;
}

/** Reminder times offered in the UI: every 30 minutes from 06:00 to 20:30 (never inside quiet hours). */
export const REMINDER_TIME_STEP_MINUTES = 30;

/** A reminder time is allowed on the 15-minute grid when its whole slot lies outside the platform quiet window. */
export function isAllowedReminderTime(hhmm: string, quiet: QuietWindow = CODE_NOTIFICATION_DEFAULTS.quietHours): boolean {
  if (!HH_MM.test(hhmm)) return false;
  const minute = minutesOfDay(hhmm);
  if (minute % 15 !== 0) return false;
  return !inQuietWindow(minute, quiet) && !inQuietWindow((minute + 14) % 1440, quiet);
}

export function reminderTimeOptions(quiet: QuietWindow = CODE_NOTIFICATION_DEFAULTS.quietHours): string[] {
  const options: string[] = [];
  for (let minute = 0; minute < 1440; minute += REMINDER_TIME_STEP_MINUTES) {
    const value = formatTimeOfDay(minute);
    if (isAllowedReminderTime(value, quiet)) options.push(value);
  }
  return options;
}

// =====================================================================================================================
// Contact points and routing (pure)
// =====================================================================================================================

/** Where external channels can reach a user. `null` = channel unavailable. */
export interface ContactPoints {
  email: string | null;
  sms: string | null;
  /** A linked, verified WhatsApp number that opted in to proactive messages and has not opted out. */
  whatsapp: { to: string; sessionOpen: boolean } | null;
}

export const CONTACT_SELECT = {
  id: true,
  status: true,
  roles: true,
  emailNormalized: true,
  emailVerifiedAt: true,
  phoneE164: true,
  phoneVerifiedAt: true,
  contactPhoneE164: true,
  channelIdentities: {
    where: { channel: "WHATSAPP" },
    select: { externalId: true, verifiedAt: true, optedInAt: true, optedOutAt: true, lastInboundAt: true },
  },
} as const satisfies Prisma.UserSelect;

export type ContactSource = Prisma.UserGetPayload<{ select: typeof CONTACT_SELECT }>;

/** The 24-hour WhatsApp customer-care window (ARCHITECTURE §8): free-form text only within it. */
export const WHATSAPP_SESSION_MS = 24 * 3600_000;

/**
 * Contact points of a user. Email must be verified (an unverified address may belong to someone else). SMS uses the
 * verified login phone, else the shared contact phone the account designates for notifications.
 */
export function contactPointsFrom(user: Omit<ContactSource, "id" | "status" | "roles">, now: Date): ContactPoints {
  const email = user.emailNormalized && user.emailVerifiedAt ? user.emailNormalized : null;
  const sms = (user.phoneE164 && user.phoneVerifiedAt ? user.phoneE164 : null) ?? user.contactPhoneE164 ?? null;
  const identity = user.channelIdentities[0];
  const optedIn =
    identity !== undefined &&
    identity.verifiedAt !== null &&
    identity.optedInAt !== null &&
    (identity.optedOutAt === null || identity.optedOutAt < identity.optedInAt);
  return {
    email,
    sms,
    whatsapp: optedIn
      ? {
          to: identity.externalId,
          sessionOpen: identity.lastInboundAt !== null && now.getTime() - identity.lastInboundAt.getTime() < WHATSAPP_SESSION_MS,
        }
      : null,
  };
}

export type ChannelAvailability = Record<ExternalChannelKey, boolean>;

export function channelAvailability(contacts: ContactPoints): ChannelAvailability {
  return { email: contacts.email !== null, sms: contacts.sms !== null, whatsapp: contacts.whatsapp !== null };
}

/** External channels the platform offers right now: each only while its flag is on (all off by default). Pure. */
export function offeredChannels(features: Pick<FeatureFlags, "email" | "sms" | "whatsapp">): ChannelAvailability {
  return { email: features.email, sms: features.sms, whatsapp: features.whatsapp };
}

/** `contacts` without the channels that are switched off (routing then treats them as unreachable). Pure. */
export function withoutSwitchedOffChannels(contacts: ContactPoints, features: Pick<FeatureFlags, "email" | "sms" | "whatsapp">): ContactPoints {
  return {
    email: features.email ? contacts.email : null,
    sms: features.sms ? contacts.sms : null,
    whatsapp: features.whatsapp ? contacts.whatsapp : null,
  };
}

export const NO_CONTACTS: ChannelAvailability = Object.freeze({ email: false, sms: false, whatsapp: false });

/** Whether any external channel is switched on for `category` (before checking contact points). */
export function wantsExternal(category: NotificationCategory, prefs: ResolvedNotificationPreferences): boolean {
  const toggles = prefs.categories[category];
  return toggles.email || toggles.sms || toggles.whatsapp;
}

/** Channels a new notification of `category` is routed to: IN_APP plus every opted-in external channel the user can receive. */
export function routeChannels(
  category: NotificationCategory,
  prefs: ResolvedNotificationPreferences,
  available: ChannelAvailability,
): NotificationChannel[] {
  const toggles = prefs.categories[category];
  const channels: NotificationChannel[] = ["IN_APP"];
  for (const channel of EXTERNAL_CHANNELS) {
    const key = CHANNEL_KEY[channel] as ExternalChannelKey;
    if (toggles[key] && available[key]) channels.push(channel);
  }
  return channels;
}

export type DeliverySkipReason =
  | "already_sent"
  | "user_inactive"
  | "expired"
  | "read_in_app"
  | "opted_out"
  | "no_recipient"
  | "whatsapp_template_required"
  | "provider_not_configured"
  | "quiet_hours";

export type DeliveryDecision =
  | { action: "send"; to: string }
  | { action: "skip"; reason: DeliverySkipReason }
  | { action: "defer"; until: Date };

export interface DeliveryFacts {
  channel: ExternalChannel;
  category: NotificationCategory;
  now: Date;
  readAt: Date | null;
  expiresAt: Date | null;
  userActive: boolean;
  alreadySent: boolean;
  prefs: ResolvedNotificationPreferences;
  timeZone: string;
  contacts: ContactPoints;
  providerConfigured: boolean;
}

/**
 * Whether (and when) one notification goes out on one external channel, re-checked at send time so a preference
 * change, a read in the app or an expiry since routing is honoured. Pure.
 */
export function decideDelivery(facts: DeliveryFacts): DeliveryDecision {
  const urgent = URGENT_CATEGORIES.has(facts.category);
  if (facts.alreadySent) return { action: "skip", reason: "already_sent" };
  if (!facts.userActive) return { action: "skip", reason: "user_inactive" };
  if (facts.expiresAt !== null && facts.expiresAt <= facts.now) return { action: "skip", reason: "expired" };
  if (!urgent && facts.readAt !== null) return { action: "skip", reason: "read_in_app" };
  const key = CHANNEL_KEY[facts.channel] as ExternalChannelKey;
  if (!facts.prefs.categories[facts.category][key]) return { action: "skip", reason: "opted_out" };
  let to: string | null;
  if (facts.channel === "WHATSAPP") {
    if (facts.contacts.whatsapp === null) return { action: "skip", reason: "no_recipient" };
    // Outside the 24 h window only approved templates may be sent; none are registered yet.
    if (!facts.contacts.whatsapp.sessionOpen) return { action: "skip", reason: "whatsapp_template_required" };
    to = facts.contacts.whatsapp.to;
  } else {
    to = facts.channel === "EMAIL" ? facts.contacts.email : facts.contacts.sms;
  }
  if (to === null) return { action: "skip", reason: "no_recipient" };
  if (!facts.providerConfigured) return { action: "skip", reason: "provider_not_configured" };
  if (!urgent) {
    const resume = quietHoursEnd(facts.now, facts.timeZone, facts.prefs.quietWindows);
    if (resume !== null) {
      if (facts.expiresAt !== null && resume >= facts.expiresAt) return { action: "skip", reason: "quiet_hours" };
      return { action: "defer", until: resume };
    }
  }
  return { action: "send", to };
}

// =====================================================================================================================
// Reading and writing a user's preferences
// =====================================================================================================================

export interface PreferencesActor {
  userId: string;
  roles: readonly Role[];
}

export interface MarketingConsentView {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  /** False for students under 18: promotional messages are never sent to minors. */
  allowed: boolean;
}

export interface NotificationPreferencesView {
  reminders: ReminderToggles;
  dailyReminderTime: string;
  reminderTimeOptions: string[];
  channels: Record<EditableCategory, Record<ExternalChannelKey, boolean>>;
  available: ChannelAvailability;
  /** Channels the platform offers at all right now (switched-off channels are not shown). */
  offered: ChannelAvailability;
  quietHours: QuietWindow;
  marketing: MarketingConsentView;
  timeZone: string;
}

/** The signed-in user's notification settings for the preferences page. */
export async function getNotificationPreferences(actor: PreferencesActor, now: Date = new Date()): Promise<NotificationPreferencesView> {
  const [defaults, features, user] = await Promise.all([
    getNotificationDefaults(),
    getFeatures(),
    db.user.findUnique({
      where: { id: actor.userId },
      select: {
        ...CONTACT_SELECT,
        student: { select: { isMinor: true } },
        profile: {
          select: { timezone: true, notificationPrefs: true, marketingEmailOptInAt: true, marketingSmsOptInAt: true, marketingWhatsappOptInAt: true },
        },
      },
    }),
  ]);
  if (!user || !user.profile) throw AppError.notFound("Your profile was not found.");
  const prefs = resolvePreferences(user.profile.notificationPrefs, defaults);
  const channels = {} as NotificationPreferencesView["channels"];
  for (const category of EDITABLE_CATEGORIES) {
    const toggles = prefs.categories[category];
    channels[category] = { email: toggles.email, sms: toggles.sms, whatsapp: toggles.whatsapp };
  }
  return {
    reminders: prefs.reminders,
    dailyReminderTime: prefs.dailyReminderTime,
    reminderTimeOptions: reminderTimeOptions(defaults.quietHours),
    channels,
    available: channelAvailability(withoutSwitchedOffChannels(contactPointsFrom(user, now), features)),
    offered: offeredChannels(features),
    quietHours: defaults.quietHours,
    marketing: {
      email: user.profile.marketingEmailOptInAt !== null,
      sms: user.profile.marketingSmsOptInAt !== null,
      whatsapp: user.profile.marketingWhatsappOptInAt !== null,
      allowed: user.student?.isMinor !== true,
    },
    timeZone: safeZone(user.profile.timezone),
  };
}

const channelChoiceSchema = z.object({ email: z.boolean(), sms: z.boolean(), whatsapp: z.boolean() });

/** Input of {@link updateNotificationPreferences} (what the preferences form submits). */
export const preferencesUpdateSchema = z.object({
  reminders: z.object({ study: z.boolean(), streakAtRisk: z.boolean(), weeklySummary: z.boolean() }),
  dailyReminderTime: timeOfDaySchema,
  channels: z.object({ REMINDER: channelChoiceSchema, LEARNING: channelChoiceSchema, ANNOUNCEMENT: channelChoiceSchema }),
});
export type PreferencesUpdate = z.output<typeof preferencesUpdateSchema>;

/** Returns the stored document with `update` applied, preserving every key this module does not own. Pure. */
export function withPreferencesUpdate(stored: unknown, update: PreferencesUpdate): Prisma.InputJsonObject {
  const base = isRecord(stored) ? { ...stored } : {};
  const categories: Record<string, unknown> = isRecord(base.categories) ? { ...base.categories } : {};
  for (const category of EDITABLE_CATEGORIES) {
    const previous = isRecord(categories[category]) ? (categories[category] as Record<string, unknown>) : {};
    categories[category] = { ...previous, ...update.channels[category] };
  }
  const reminders = isRecord(base.reminders) ? base.reminders : {};
  return {
    ...base,
    version: NOTIFICATION_PREFS_VERSION,
    categories,
    dailyReminderTime: update.dailyReminderTime,
    reminders: { ...reminders, ...update.reminders },
  } as Prisma.InputJsonObject;
}

/**
 * Saves the user's reminder and channel choices. Channels without a usable contact point may still be stored (they
 * apply once the contact exists); the page only offers the ones that work.
 *
 * @throws AppError VALIDATION (reminder time outside 06:00-20:45 or off the 15-minute grid), NOT_FOUND.
 */
export async function updateNotificationPreferences(actor: PreferencesActor, input: unknown): Promise<PreferencesUpdate> {
  const parsed = preferencesUpdateSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const defaults = await getNotificationDefaults();
  if (!isAllowedReminderTime(parsed.data.dailyReminderTime, defaults.quietHours)) {
    throw AppError.validation({ dailyReminderTime: ["Choose a time between 06:00 and 20:30."] });
  }
  await db.$transaction(async (tx) => {
    // Row lock so a concurrent write to the same JSON document (e.g. the parent digest setting) is not lost.
    await tx.$queryRaw`SELECT 1 FROM "Profile" WHERE "userId" = ${actor.userId}::uuid FOR UPDATE`;
    const profile = await tx.profile.findUnique({ where: { userId: actor.userId }, select: { notificationPrefs: true } });
    if (!profile) throw AppError.notFound("Your profile was not found.");
    await tx.profile.update({
      where: { userId: actor.userId },
      data: { notificationPrefs: withPreferencesUpdate(profile.notificationPrefs, parsed.data) },
    });
  });
  return parsed.data;
}

export const marketingConsentSchema = z.object({ email: z.boolean(), sms: z.boolean(), whatsapp: z.boolean() });

const MARKETING_COLUMN = {
  email: "marketingEmailOptInAt",
  sms: "marketingSmsOptInAt",
  whatsapp: "marketingWhatsappOptInAt",
} as const satisfies Record<ExternalChannelKey, keyof Prisma.ProfileUpdateInput>;

/**
 * Records marketing consent per channel (separate from notification preferences). Each grant or withdrawal writes an
 * AuditLog entry (`consent.grant` / `consent.withdraw`) in the same transaction. Students under 18 can only withdraw.
 *
 * @throws AppError VALIDATION, FORBIDDEN (a minor opting in), NOT_FOUND.
 */
export async function updateMarketingConsent(
  actor: PreferencesActor,
  input: unknown,
  options: { now?: Date; request?: AuditRequestInfo | null } = {},
): Promise<MarketingConsentView> {
  const parsed = marketingConsentSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const now = options.now ?? new Date();
  return db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT 1 FROM "Profile" WHERE "userId" = ${actor.userId}::uuid FOR UPDATE`;
    // Sequential on purpose: one transaction = one connection.
    const profile = await tx.profile.findUnique({
      where: { userId: actor.userId },
      select: { marketingEmailOptInAt: true, marketingSmsOptInAt: true, marketingWhatsappOptInAt: true },
    });
    const student = await tx.student.findUnique({ where: { userId: actor.userId }, select: { isMinor: true } });
    if (!profile) throw AppError.notFound("Your profile was not found.");
    const allowed = student?.isMinor !== true;
    const data: Prisma.ProfileUpdateInput = {};
    const changes: { channel: ExternalChannelKey; granted: boolean }[] = [];
    for (const channel of EXTERNAL_CHANNEL_KEYS) {
      const current = profile[MARKETING_COLUMN[channel]] !== null;
      const wanted = parsed.data[channel];
      if (current === wanted) continue;
      if (wanted && !allowed) throw AppError.forbidden("News and offers aren't sent to students under 18.");
      data[MARKETING_COLUMN[channel]] = wanted ? now : null;
      changes.push({ channel, granted: wanted });
    }
    if (changes.length > 0) {
      await tx.profile.update({ where: { userId: actor.userId }, data, select: { userId: true } });
      for (const change of changes) {
        await auditInTx(tx, {
          actorUserId: actor.userId,
          actorRoles: actor.roles,
          action: change.granted ? AUDIT_ACTIONS.CONSENT_GRANT : AUDIT_ACTIONS.CONSENT_WITHDRAW,
          entityType: "Profile",
          entityId: actor.userId,
          targetUserId: actor.userId,
          metadata: { consent: "marketing", channel: change.channel },
          request: options.request ?? null,
        });
      }
    }
    return { ...parsed.data, allowed };
  });
}

/**
 * Resolved preferences + contact points of many users in one query (for jobs). Contact points of switched-off channels
 * (email / WhatsApp feature flags) are left out, so nothing is ever routed to them.
 */
export async function loadRoutingFacts(
  userIds: readonly string[],
  now: Date,
): Promise<Map<string, { status: ContactSource["status"]; roles: Role[]; timeZone: string; prefsRaw: unknown; contacts: ContactPoints }>> {
  const out = new Map<string, { status: ContactSource["status"]; roles: Role[]; timeZone: string; prefsRaw: unknown; contacts: ContactPoints }>();
  if (userIds.length === 0) return out;
  const [features, users] = await Promise.all([
    getFeatures(),
    db.user.findMany({
      where: { id: { in: [...new Set(userIds)] } },
      select: { ...CONTACT_SELECT, profile: { select: { timezone: true, notificationPrefs: true } } },
    }),
  ]);
  for (const user of users) {
    out.set(user.id, {
      status: user.status,
      roles: user.roles,
      timeZone: safeZone(user.profile?.timezone),
      prefsRaw: user.profile?.notificationPrefs ?? null,
      contacts: withoutSwitchedOffChannels(contactPointsFrom(user, now), features),
    });
  }
  return out;
}
