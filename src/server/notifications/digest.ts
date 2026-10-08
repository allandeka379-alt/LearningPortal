import "server-only";
import { z } from "zod";
import { Prisma, type NotificationCategory, type NotificationChannel } from "@/generated/prisma/client";
import { APP_NAME, DEFAULT_TIMEZONE } from "@/lib/config";
import type { SanitizedHtml } from "@/lib/content/types";
import {
  addDays,
  dateColumnFromLocalDate,
  isoWeekKey,
  isValidTimeZone,
  localDateFromDateColumn,
  localDateString,
  startOfLocalDay,
  type LocalDate,
} from "@/lib/dates";
import { formatCount, formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { trustPersistedHtml } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { displayedStreak } from "@/server/gamification/service";
import { DEFAULT_DAILY_GOAL } from "@/server/gamification/streaks";
import { absoluteUrl } from "@/server/lib/env";
import { describeJobError, enqueue, registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getStudyDefaults } from "@/server/lib/settings";
import { getMessagingChannel, isChannelSwitchedOn, sendMessage, type ChannelName } from "@/server/messaging";
import { UnconfiguredProvider } from "@/server/messaging/providers";
import {
  channelAvailability,
  EXTERNAL_CHANNEL_KEYS,
  EXTERNAL_CHANNELS,
  getNotificationDefaults,
  isExternalChannel,
  loadRoutingFacts,
  minutesOfDay,
  NO_CONTACTS,
  resolvePreferences,
  routeChannels,
  wantsExternal,
  decideDelivery,
  type ExternalChannel,
  type NotificationDefaults,
  type ResolvedNotificationPreferences,
} from "./preferences";
import {
  categoryForType,
  countUnread,
  listNotifications,
  markRead,
  notificationInputSchema,
  type NotificationInput,
  type NotificationListItem,
} from "./service";

/**
 * Notification digests and delivery (§6 study reminders, §19 streak reminders, §21 / §22 announcements; ARCHITECTURE
 * §3.7 jobs `notifications.send` / `notifications.dailyReminders`):
 *
 * - Inbox views for the header bell and /app/notifications (unread count, recent items, deep links, detail).
 * - `notifications.dailyReminders` (every 15 min): students whose chosen local reminder time has passed and who have
 *   not met today's goal get ONE reminder per local day (dedupe `remind:{date}`): "keep your N-day streak" when a live
 *   streak is at risk, otherwise a study reminder (daily target, plus flashcards due). It expires at local midnight, so
 *   a dormant account never piles up reminders.
 * - `notifications.weeklySummary` (Sunday 17:00 CAT): a real-numbers summary of the student's last 7 local days.
 * - `notifications.send`: delivers one notification on one external channel (email / SMS / WhatsApp) through the
 *   messaging adapters, re-checking preferences, read state, expiry and quiet hours at send time (./preferences).
 *   Notification email is OPTIONAL email: email, SMS and WhatsApp are each switched off by default (feature flags
 *   `features.email` / `sms` / `whatsapp`, docs/ARCHITECTURE.md §3.14): nothing is routed to them and a leftover send is
 *   skipped (`switched_off`), so digests, reminders, receipts and announcements stay in-app.
 * - `notifications.announcementDelivery` + a 10-minute sweep: routes fanned-out announcements with `notify = true` to
 *   the external channels each recipient opted into.
 *
 * Every job is idempotent (dedupe keys on Notification and Job rows) and payloads carry ids only.
 */

export const NOTIFICATIONS_QUEUE = "notifications";
export const NOTIFICATION_SEND_JOB = "notifications.send";
export const DAILY_REMINDERS_JOB = "notifications.dailyReminders";
export const WEEKLY_SUMMARY_JOB = "notifications.weeklySummary";
export const ANNOUNCEMENT_DELIVERY_JOB = "notifications.announcementDelivery";
export const ANNOUNCEMENT_SWEEP_JOB = "notifications.announcementSweep";

export const DAILY_REMINDERS_EVERY_MINUTES = 15;
/** Weekly at Sunday 15:00 UTC (17:00 CAT): epoch weeks start on Thursday 00:00 UTC, + 3 days 15 hours. */
export const WEEKLY_SUMMARY_EVERY_MINUTES = 7 * 24 * 60;
export const WEEKLY_SUMMARY_OFFSET_MINUTES = 3 * 24 * 60 + 15 * 60;
export const ANNOUNCEMENT_SWEEP_EVERY_MINUTES = 10;
/** Announcements fanned out within this window are (re)checked by the sweep. */
export const ANNOUNCEMENT_SWEEP_LOOKBACK_MINUTES = 120;

const BATCH_SIZE = 500;
const MAX_BATCHES_PER_RUN = 40;
const ZERO_UUID = "00000000-0000-0000-0000-000000000000";
const APP_PATH = /^\/(?![/\\])[^\s]*$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkAborted(signal: AbortSignal | undefined, job: string): void {
  if (signal?.aborted) throw new Error(`${job} aborted (worker shutting down)`);
}

// =====================================================================================================================
// Routing + delivery enqueue (used by the jobs below and by any service that wants external delivery)
// =====================================================================================================================

export function sendDedupeKey(notificationId: string, channel: ExternalChannel): string {
  return `send:${notificationId}:${channel}`;
}

/**
 * Enqueues `notifications.send` for every external channel of a notification (outbox: pass the transaction that
 * created it). Already-queued sends are deduplicated. Returns the number of new jobs.
 */
export async function enqueueNotificationDeliveries(
  client: DbClient,
  notification: { id: string; channels: readonly NotificationChannel[] },
  options: { runAt?: Date } = {},
): Promise<number> {
  let queued = 0;
  for (const channel of notification.channels) {
    if (!isExternalChannel(channel)) continue;
    const result = await enqueue(
      NOTIFICATION_SEND_JOB,
      { notificationId: notification.id, channel },
      { client, queue: NOTIFICATIONS_QUEUE, dedupeKey: sendDedupeKey(notification.id, channel), ...(options.runAt ? { runAt: options.runAt } : {}) },
    );
    if (result.created) queued += 1;
  }
  return queued;
}

/**
 * Creates a notification routed by the recipient's preferences (IN_APP + opted-in external channels the user can
 * receive) and enqueues its external deliveries in the same transaction. For services that want more than the in-app
 * inbox (e.g. assignment or billing reminders). Idempotent with a `dedupeKey`.
 */
export async function createRoutedNotification(
  userId: string,
  input: NotificationInput,
  options: { now?: Date } = {},
): Promise<{ id: string; channels: NotificationChannel[]; queued: number }> {
  const now = options.now ?? new Date();
  const parsed = notificationInputSchema.parse(input);
  const category = parsed.category ?? categoryForType(parsed.type);
  const [facts, defaults] = await Promise.all([loadRoutingFacts([userId], now), getNotificationDefaults()]);
  const user = facts.get(userId);
  const channels: NotificationChannel[] = user
    ? routeChannels(category, resolvePreferences(user.prefsRaw, defaults), channelAvailability(user.contacts))
    : ["IN_APP"];
  return db.$transaction(async (tx) => {
    // ON CONFLICT DO NOTHING (not a caught unique violation, which would abort the transaction).
    const [created] = await tx.notification.createManyAndReturn({
      data: [notificationRow(userId, input, channels)],
      skipDuplicates: true,
      select: { id: true, channels: true },
    });
    if (created) return { id: created.id, channels: created.channels, queued: await enqueueNotificationDeliveries(tx, created) };
    // Same dedupe key as an earlier notification: that one stands, and its sends were queued with it.
    const existing = await tx.notification.findUniqueOrThrow({
      where: { userId_dedupeKey: { userId, dedupeKey: parsed.dedupeKey ?? "" } },
      select: { id: true, channels: true },
    });
    return { id: existing.id, channels: existing.channels, queued: 0 };
  });
}

function notificationRow(
  userId: string,
  input: NotificationInput,
  channels: NotificationChannel[],
): Prisma.NotificationCreateManyInput {
  const value = notificationInputSchema.parse(input);
  // Same rule as the inbox service: no control characters (except newlines and tabs) in visible text.
  const clean = (text: string) => text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return {
    userId,
    type: value.type,
    category: value.category ?? categoryForType(value.type),
    title: clean(value.title),
    body: clean(value.body),
    ...(value.data === undefined ? {} : { data: value.data as Prisma.InputJsonObject }),
    channels,
    dedupeKey: value.dedupeKey ?? null,
    announcementId: value.announcementId ?? null,
    expiresAt: value.expiresAt ?? null,
  };
}

/** Inserts personalised notifications (skipping dedupe-key duplicates) and enqueues their external deliveries. */
async function insertAndEnqueue(rows: Prisma.NotificationCreateManyInput[]): Promise<{ created: number; queued: number }> {
  if (rows.length === 0) return { created: 0, queued: 0 };
  return db.$transaction(async (tx) => {
    const created = await tx.notification.createManyAndReturn({ data: rows, skipDuplicates: true, select: { id: true, channels: true } });
    let queued = 0;
    for (const row of created) {
      if (row.channels.some(isExternalChannel)) queued += await enqueueNotificationDeliveries(tx, row);
    }
    return { created: created.length, queued };
  });
}

// =====================================================================================================================
// Inbox views (header bell, /app/notifications)
// =====================================================================================================================

/** Where a notification leads: its own `data.href` (app-relative), else its detail page (announcements, plain notices). */
export function notificationHref(item: { id: string; data: unknown }): string {
  const data = isRecord(item.data) ? item.data : {};
  const href = data.href;
  if (typeof href === "string" && href.length <= 2_000 && APP_PATH.test(href)) return href;
  return `/app/notifications/${item.id}`;
}

export function isAnnouncementData(data: unknown): boolean {
  return isRecord(data) && data.entityType === "Announcement";
}

export interface InboxItem {
  id: string;
  type: string;
  category: NotificationCategory;
  title: string;
  body: string;
  href: string;
  unread: boolean;
  isAnnouncement: boolean;
  createdAt: Date;
}

function toInboxItem(item: NotificationListItem): InboxItem {
  return {
    id: item.id,
    type: item.type,
    category: item.category,
    title: item.title,
    body: item.body,
    href: notificationHref(item),
    unread: item.readAt === null,
    isAnnouncement: isAnnouncementData(item.data),
    createdAt: item.createdAt,
  };
}

/** One page of the inbox (newest first) plus the unread count. */
export async function getInboxPage(
  userId: string,
  options: { cursor?: string | null; unreadOnly?: boolean; limit?: number } = {},
): Promise<{ items: InboxItem[]; nextCursor: string | null; unread: number }> {
  const [page, unread] = await Promise.all([
    listNotifications(userId, {
      cursor: options.cursor ?? null,
      limit: options.limit ?? 20,
      ...(options.unreadOnly ? { unreadOnly: true } : {}),
    }),
    countUnread(userId),
  ]);
  return { items: page.items.map(toInboxItem), nextCursor: page.nextCursor, unread };
}

/** JSON item for the header bell's panel (body shortened). */
export interface BellItem {
  id: string;
  title: string;
  body: string;
  category: NotificationCategory;
  href: string;
  unread: boolean;
  createdAt: string;
}

export const BELL_ITEM_LIMIT = 8;
const BELL_BODY_CHARS = 180;

function shorten(text: string, max: number): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat;
}

/** Unread count, and optionally the most recent items, for the header bell. */
export async function getInboxDigest(
  userId: string,
  options: { includeItems?: boolean; limit?: number } = {},
): Promise<{ unread: number; items?: BellItem[] }> {
  if (!options.includeItems) return { unread: await countUnread(userId) };
  const [unread, page] = await Promise.all([countUnread(userId), listNotifications(userId, { limit: options.limit ?? BELL_ITEM_LIMIT })]);
  return {
    unread,
    items: page.items.map((item) => ({
      id: item.id,
      title: item.title,
      body: shorten(item.body, BELL_BODY_CHARS),
      category: item.category,
      href: notificationHref(item),
      unread: item.readAt === null,
      createdAt: item.createdAt.toISOString(),
    })),
  };
}

export interface InboxNotificationDetail extends InboxItem {
  /** Link to act on (the notification's own `data.href`), when it has one. */
  actionHref: string | null;
  /** The announcement's sanitised body (rendered at write time), when this notifies of a live announcement. */
  announcement: { title: string; bodyHtml: SanitizedHtml } | null;
  /** The announcement was withdrawn after it was sent. */
  announcementWithdrawn: boolean;
}

/** One of `userId`'s own notifications (ownership is part of the query), or `null`. */
export async function getInboxNotification(userId: string, notificationId: string): Promise<InboxNotificationDetail | null> {
  if (!z.uuid().safeParse(notificationId).success) return null;
  const row = await db.notification.findFirst({
    where: { id: notificationId, userId },
    select: {
      id: true,
      type: true,
      category: true,
      title: true,
      body: true,
      data: true,
      readAt: true,
      createdAt: true,
      announcement: { select: { title: true, bodyHtml: true, archivedAt: true } },
    },
  });
  if (!row) return null;
  const item = toInboxItem(row);
  const ownHref = item.href.startsWith(`/app/notifications/${row.id}`) ? null : item.href;
  const live = row.announcement && row.announcement.archivedAt === null ? row.announcement : null;
  return {
    ...item,
    isAnnouncement: item.isAnnouncement || row.announcement !== null,
    actionHref: ownHref,
    announcement: live ? { title: live.title, bodyHtml: trustPersistedHtml(live.bodyHtml) } : null,
    announcementWithdrawn: row.announcement !== null && row.announcement.archivedAt !== null,
  };
}

/** Marks some (or all) of `userId`'s notifications read and returns the new unread count. */
export async function markInboxRead(userId: string, ids: readonly string[] | "all"): Promise<{ updated: number; unread: number }> {
  const { updated } = await markRead(userId, ids);
  return { updated, unread: await countUnread(userId) };
}

// =====================================================================================================================
// Daily study / streak reminders
// =====================================================================================================================

export interface DailyReminderInput {
  reminders: { study: boolean; streakAtRisk: boolean };
  /** Streak the student sees today (0 = none). Today's goal is not met yet (the job only asks then). */
  streak: number;
  /** Today's target in minutes (own goal or platform default). */
  goalMinutes: number;
  hasActivePlan: boolean;
  /** Flashcards due for review now (§18), 0 when none. */
  dueFlashcards?: number;
}

export interface DailyReminder {
  kind: "streak" | "study";
  title: string;
  body: string;
  href: string;
}

/** The reminder (if any) for a student who has not met today's goal by their reminder time. Pure. */
export function decideDailyReminder(input: DailyReminderInput): DailyReminder | null {
  const href = input.hasActivePlan ? "/app/plan" : "/app/practice";
  if (input.streak > 0 && input.reminders.streakAtRisk) {
    return {
      kind: "streak",
      title: `Keep your ${formatNumber(input.streak)}-day streak going`,
      body:
        `You haven't studied yet today. Answer a question, finish a lesson or review ${DEFAULT_DAILY_GOAL.flashcardsPerActivity} ` +
        "flashcards before midnight to keep your streak.",
      href,
    };
  }
  if (!input.reminders.study) return null;
  const due = input.dueFlashcards ?? 0;
  const base = input.hasActivePlan
    ? "Today's sessions are ready in your study plan. A few focused minutes now keeps you on track."
    : `Your daily goal is ${formatDuration(input.goalMinutes, { style: "long" })}. Start with a few practice questions or a lesson.`;
  return {
    kind: "study",
    title: "Time for today's study session",
    body: due > 0 ? `${base} You also have ${formatCount(due, "flashcard")} due for review.` : base,
    href,
  };
}

export function reminderDedupeKey(localDate: LocalDate): string {
  return `remind:${localDate}`;
}

interface ReminderCandidate {
  userId: string;
  timeZone: string;
  prefs: unknown;
  localDate: string;
}

/**
 * Students due a reminder at `now`: onboarded, ACTIVE, at least one reminder switched on, local time between their
 * reminder time and the start of quiet hours, no reminder yet today and today's goal not met. Keyset by user id.
 */
let postgresZoneNames: Promise<string[]> | null = null;

/**
 * Postgres's own time zone names, loaded once per process: `pg_timezone_names` reads the tz database on every call
 * (over a second on some hosts), far too slow to repeat for every reminder batch. Only zones Postgres knows may reach
 * `AT TIME ZONE` (an unknown one would fail the whole batch). A failed load is retried on the next call.
 */
function knownTimeZones(): Promise<string[]> {
  postgresZoneNames ??= db
    .$queryRaw<{ name: string }[]>`SELECT "name" FROM pg_timezone_names`
    .then((rows) => rows.map((row) => row.name))
    .catch((error: unknown) => {
      postgresZoneNames = null;
      throw error;
    });
  return postgresZoneNames;
}

async function findReminderCandidates(input: {
  now: Date;
  after: string;
  limit: number;
  defaults: NotificationDefaults;
  userIds: readonly string[] | null;
}): Promise<ReminderCandidate[]> {
  const now = input.now.toISOString();
  const scope = input.userIds ? Prisma.sql`AND s."userId" = ANY(${[...input.userIds]}::uuid[])` : Prisma.empty;
  const study = JSON.stringify(input.defaults.reminders.study);
  const streak = JSON.stringify(input.defaults.reminders.streakAtRisk);
  // Never inside the platform quiet window (which may or may not wrap midnight).
  const quiet = input.defaults.quietHours;
  const localTime = Prisma.sql`(${now}::timestamptz AT TIME ZONE p."timezone")::time`;
  const quietStart = minutesOfDay(quiet.start);
  const quietEnd = minutesOfDay(quiet.end);
  const zones = await knownTimeZones();
  const outsideQuietHours =
    quietStart === quietEnd
      ? Prisma.sql`TRUE`
      : quietStart > quietEnd
        ? Prisma.sql`(${localTime} >= ${quiet.end}::time AND ${localTime} < ${quiet.start}::time)`
        : Prisma.sql`(${localTime} < ${quiet.start}::time OR ${localTime} >= ${quiet.end}::time)`;
  return db.$queryRaw<ReminderCandidate[]>`
    SELECT s."userId"::text AS "userId", p."timezone" AS "timeZone", p."notificationPrefs" AS "prefs",
           to_char((${now}::timestamptz AT TIME ZONE p."timezone")::date, 'YYYY-MM-DD') AS "localDate"
      FROM "Student" s
      JOIN "User" u ON u."id" = s."userId"
      JOIN "Profile" p ON p."userId" = s."userId"
     WHERE s."onboardingCompletedAt" IS NOT NULL
       AND u."status" = 'ACTIVE'
       AND s."userId" > ${input.after}::uuid
       ${scope}
       AND p."timezone" = ANY(${zones}::text[])
       AND NOT (COALESCE(p."notificationPrefs"->'reminders'->'study', ${study}::jsonb) = 'false'::jsonb
                AND COALESCE(p."notificationPrefs"->'reminders'->'streakAtRisk', ${streak}::jsonb) = 'false'::jsonb)
       AND ${localTime} >= (
             CASE WHEN COALESCE(p."notificationPrefs"->>'dailyReminderTime', '') ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'
                  THEN (p."notificationPrefs"->>'dailyReminderTime')::time
                  ELSE ${input.defaults.dailyReminderTime}::time END)
       AND ${outsideQuietHours}
       AND NOT EXISTS (
             SELECT 1 FROM "Notification" n
              WHERE n."userId" = s."userId"
                AND n."dedupeKey" = 'remind:' || to_char((${now}::timestamptz AT TIME ZONE p."timezone")::date, 'YYYY-MM-DD'))
       AND NOT EXISTS (
             SELECT 1 FROM "DailyActivity" d
              WHERE d."userId" = s."userId"
                AND d."date" = (${now}::timestamptz AT TIME ZONE p."timezone")::date
                AND d."dailyGoalMet")
     ORDER BY s."userId"
     LIMIT ${input.limit}`;
}

const STREAK_STATS_SELECT = {
  userId: true,
  currentStreak: true,
  longestStreak: true,
  lastStreakDate: true,
  streakFreezesAvailable: true,
  weekStartDate: true,
  weekGoalMet: true,
  dailyGoalMinutes: true,
} as const satisfies Prisma.LearnerStatsSelect;

export interface DailyRemindersResult {
  candidates: number;
  study: number;
  streak: number;
  created: number;
  deliveriesQueued: number;
  /** Set when the run stopped at its batch cap with students left: continue after this user id. */
  continuedAfter: string | null;
}

export interface BatchRunOptions {
  /** Restricts the run to these users (tests; never used by the worker). */
  userIds?: readonly string[];
  /** Continue a capped run after this user id (keyset). */
  afterUserId?: string;
  batchSize?: number;
  maxBatches?: number;
  signal?: AbortSignal;
}

/**
 * One run of `notifications.dailyReminders`. Idempotent: the per-day dedupe key means a retried or overlapping run
 * never reminds anyone twice. A run stops after `maxBatches` batches and reports where to continue.
 */
export async function runDailyReminders(options: BatchRunOptions & { now?: Date } = {}): Promise<DailyRemindersResult> {
  const now = options.now ?? new Date();
  const batchSize = options.batchSize ?? BATCH_SIZE;
  const maxBatches = options.maxBatches ?? MAX_BATCHES_PER_RUN;
  const [defaults, studyDefaults] = await Promise.all([getNotificationDefaults(), getStudyDefaults()]);
  const result: DailyRemindersResult = { candidates: 0, study: 0, streak: 0, created: 0, deliveriesQueued: 0, continuedAfter: null };
  let after = options.afterUserId ?? ZERO_UUID;
  for (let batch = 0; batch < maxBatches; batch += 1) {
    checkAborted(options.signal, DAILY_REMINDERS_JOB);
    const rows = await findReminderCandidates({ now, after, limit: batchSize, defaults, userIds: options.userIds ?? null });
    if (rows.length === 0) return result;
    after = rows[rows.length - 1]?.userId ?? after;
    result.candidates += rows.length;

    const ids = rows.map((row) => row.userId);
    const [stats, plans, dueCards] = await Promise.all([
      db.learnerStats.findMany({ where: { userId: { in: ids } }, select: STREAK_STATS_SELECT }),
      db.studyPlan.findMany({ where: { userId: { in: ids }, status: "ACTIVE" }, select: { userId: true } }),
      db.flashcardState.groupBy({
        by: ["userId"],
        where: { userId: { in: ids }, dueAt: { lte: now }, isSuspended: false },
        _count: { _all: true },
      }),
    ]);
    const statsBy = new Map(stats.map((row) => [row.userId, row]));
    const planned = new Set(plans.map((row) => row.userId));
    const dueBy = new Map(dueCards.map((row) => [row.userId, row._count._all]));

    const decided: { row: ReminderCandidate; prefs: ResolvedNotificationPreferences; reminder: DailyReminder }[] = [];
    for (const row of rows) {
      const prefs = resolvePreferences(row.prefs, defaults);
      const stat = statsBy.get(row.userId) ?? null;
      const reminder = decideDailyReminder({
        reminders: prefs.reminders,
        streak: displayedStreak(stat, row.localDate),
        goalMinutes: stat?.dailyGoalMinutes ?? studyDefaults.dailyGoalMinutes,
        hasActivePlan: planned.has(row.userId),
        dueFlashcards: dueBy.get(row.userId) ?? 0,
      });
      if (reminder) decided.push({ row, prefs, reminder });
    }
    const external = decided.filter((d) => wantsExternal("REMINDER", d.prefs)).map((d) => d.row.userId);
    const facts = await loadRoutingFacts(external, now);
    const inserts = decided.map(({ row, prefs, reminder }) => {
      const contacts = facts.get(row.userId)?.contacts;
      const channels = routeChannels("REMINDER", prefs, contacts ? channelAvailability(contacts) : NO_CONTACTS);
      if (reminder.kind === "streak") result.streak += 1;
      else result.study += 1;
      return notificationRow(
        row.userId,
        {
          type: reminder.kind === "streak" ? "reminder.streak" : "reminder.study",
          category: "REMINDER",
          title: reminder.title,
          body: reminder.body,
          data: { href: reminder.href, kind: reminder.kind, date: row.localDate },
          dedupeKey: reminderDedupeKey(row.localDate),
          // Useless after local midnight: hidden from the inbox and never sent late.
          expiresAt: startOfLocalDay(addDays(row.localDate, 1), safeZoneOf(row.timeZone)),
        },
        channels,
      );
    });
    const written = await insertAndEnqueue(inserts);
    result.created += written.created;
    result.deliveriesQueued += written.queued;
    if (rows.length < batchSize) return result;
  }
  result.continuedAfter = after;
  return result;
}

// =====================================================================================================================
// Weekly summary
// =====================================================================================================================

export interface WeeklySummaryFacts {
  activeDays: number;
  studyMinutes: number;
  questions: number;
  correct: number;
  lessons: number;
  flashcards: number;
  streak: number;
}

/** Title and body of a student's weekly summary. Real values only; an inactive week says so. Pure. */
export function composeWeeklySummary(facts: WeeklySummaryFacts): { title: string; body: string } {
  const title = "Your week in review";
  if (facts.activeDays === 0) {
    return { title, body: "You didn't study on the app in the last 7 days. A short session today is a good way to restart." };
  }
  const parts: string[] = [
    facts.studyMinutes > 0
      ? `You studied for ${formatDuration(facts.studyMinutes, { style: "long" })} on ${formatCount(facts.activeDays, "day")} in the last 7 days.`
      : `You studied on ${formatCount(facts.activeDays, "day")} in the last 7 days.`,
  ];
  if (facts.questions > 0) {
    const accuracy = formatPercent(Math.min(facts.correct, facts.questions) / facts.questions, { input: "ratio" });
    parts.push(`You answered ${formatCount(facts.questions, "question")} and got ${accuracy} right.`);
  }
  if (facts.lessons > 0) parts.push(`You completed ${formatCount(facts.lessons, "lesson")}.`);
  if (facts.flashcards > 0) parts.push(`You reviewed ${formatCount(facts.flashcards, "flashcard")}.`);
  if (facts.streak > 0) parts.push(`Current streak: ${formatCount(facts.streak, "day")}.`);
  return { title, body: parts.join(" ") };
}

export function weeklySummaryDedupeKey(weekKey: string): string {
  return `summary.weekly:${weekKey}`;
}

export interface WeeklySummaryResult {
  weekKey: string;
  candidates: number;
  created: number;
  deliveriesQueued: number;
  /** Set when the run stopped at its batch cap with students left: continue after this user id. */
  continuedAfter: string | null;
}

/**
 * One run of `notifications.weeklySummary` for the scheduler period starting at `periodStart`: one summary per
 * opted-in student (dedupe `summary.weekly:{ISO week}`), covering the 7 local days ending on the run's local date.
 * A run stops after `maxBatches` batches and reports where to continue (the worker enqueues the continuation).
 */
export async function runWeeklySummaries(options: BatchRunOptions & { periodStart?: Date; now?: Date } = {}): Promise<WeeklySummaryResult> {
  const at = options.periodStart ?? options.now ?? new Date();
  const now = options.now ?? new Date();
  const batchSize = options.batchSize ?? BATCH_SIZE;
  const maxBatches = options.maxBatches ?? MAX_BATCHES_PER_RUN;
  const weekKey = isoWeekKey(localDateString(at, DEFAULT_TIMEZONE));
  const dedupeKey = weeklySummaryDedupeKey(weekKey);
  const defaults = await getNotificationDefaults();
  const enabledByDefault = JSON.stringify(defaults.reminders.weeklySummary);
  const scope = options.userIds ? Prisma.sql`AND s."userId" = ANY(${[...options.userIds]}::uuid[])` : Prisma.empty;
  const result: WeeklySummaryResult = { weekKey, candidates: 0, created: 0, deliveriesQueued: 0, continuedAfter: null };

  let after = options.afterUserId ?? ZERO_UUID;
  for (let batch = 0; batch < maxBatches; batch += 1) {
    checkAborted(options.signal, WEEKLY_SUMMARY_JOB);
    const rows = await db.$queryRaw<{ userId: string; timeZone: string; prefs: unknown }[]>`
      SELECT s."userId"::text AS "userId", p."timezone" AS "timeZone", p."notificationPrefs" AS "prefs"
        FROM "Student" s
        JOIN "User" u ON u."id" = s."userId"
        JOIN "Profile" p ON p."userId" = s."userId"
       WHERE s."onboardingCompletedAt" IS NOT NULL
         AND u."status" = 'ACTIVE'
         AND s."userId" > ${after}::uuid
         ${scope}
         AND COALESCE(p."notificationPrefs"->'reminders'->'weeklySummary', ${enabledByDefault}::jsonb) <> 'false'::jsonb
         AND NOT EXISTS (SELECT 1 FROM "Notification" n WHERE n."userId" = s."userId" AND n."dedupeKey" = ${dedupeKey})
       ORDER BY s."userId"
       LIMIT ${batchSize}`;
    if (rows.length === 0) return result;
    after = rows[rows.length - 1]?.userId ?? after;
    result.candidates += rows.length;

    // Each student's own 7 local days ending on the run's local date in their time zone.
    const entries = rows.map((row) => {
      const to = localDateString(at, safeZoneOf(row.timeZone));
      return {
        userId: row.userId,
        from: addDays(to, -6),
        to,
        prefs: resolvePreferences(row.prefs, defaults),
        facts: { activeDays: 0, studyMinutes: 0, questions: 0, correct: 0, lessons: 0, flashcards: 0, streak: 0 } as WeeklySummaryFacts,
        studySeconds: 0,
      };
    });
    const byUser = new Map(entries.map((entry) => [entry.userId, entry]));
    const minFrom = entries.reduce((min, entry) => (entry.from < min ? entry.from : min), entries[0]?.from ?? localDateString(at));
    const maxTo = entries.reduce((max, entry) => (entry.to > max ? entry.to : max), entries[0]?.to ?? localDateString(at));
    const ids = entries.map((entry) => entry.userId);
    const [activity, stats] = await Promise.all([
      db.dailyActivity.findMany({
        where: { userId: { in: ids }, date: { gte: dateColumnFromLocalDate(minFrom), lte: dateColumnFromLocalDate(maxTo) } },
        select: {
          userId: true,
          date: true,
          studySeconds: true,
          questionsAttempted: true,
          questionsCorrect: true,
          lessonsCompleted: true,
          flashcardsReviewed: true,
          assessmentsCompleted: true,
        },
      }),
      db.learnerStats.findMany({ where: { userId: { in: ids } }, select: STREAK_STATS_SELECT }),
    ]);
    for (const day of activity) {
      const entry = byUser.get(day.userId);
      const date = localDateFromDateColumn(day.date);
      if (!entry || date < entry.from || date > entry.to) continue;
      const active =
        day.studySeconds > 0 || day.questionsAttempted > 0 || day.flashcardsReviewed > 0 || day.lessonsCompleted > 0 || day.assessmentsCompleted > 0;
      if (active) entry.facts.activeDays += 1;
      entry.studySeconds += day.studySeconds;
      entry.facts.questions += day.questionsAttempted;
      entry.facts.correct += day.questionsCorrect;
      entry.facts.lessons += day.lessonsCompleted;
      entry.facts.flashcards += day.flashcardsReviewed;
    }
    const statsBy = new Map(stats.map((row) => [row.userId, row]));

    const routing = await loadRoutingFacts(
      entries.filter((entry) => wantsExternal("LEARNING", entry.prefs)).map((entry) => entry.userId),
      now,
    );
    const inserts = entries.map((entry) => {
      const facts: WeeklySummaryFacts = {
        ...entry.facts,
        studyMinutes: Math.round(entry.studySeconds / 60),
        streak: displayedStreak(statsBy.get(entry.userId) ?? null, entry.to),
      };
      const { title, body } = composeWeeklySummary(facts);
      const contacts = routing.get(entry.userId)?.contacts;
      const channels = routeChannels("LEARNING", entry.prefs, contacts ? channelAvailability(contacts) : NO_CONTACTS);
      return notificationRow(
        entry.userId,
        {
          type: "learning.weekly_summary",
          category: "LEARNING",
          title,
          body,
          data: { href: "/app/progress", week: weekKey },
          dedupeKey,
          // Stale once next week's summary is due.
          expiresAt: new Date(at.getTime() + WEEKLY_SUMMARY_EVERY_MINUTES * 60_000),
        },
        channels,
      );
    });
    const written = await insertAndEnqueue(inserts);
    result.created += written.created;
    result.deliveriesQueued += written.queued;
    if (rows.length < batchSize) return result;
  }
  result.continuedAfter = after;
  return result;
}

function safeZoneOf(timeZone: string): string {
  return isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

// =====================================================================================================================
// Announcements: external delivery for `notify = true`
// =====================================================================================================================

export const announcementDeliveryPayloadSchema = z.object({
  announcementId: z.uuid(),
  /** Continue after this notification id (keyset). */
  afterNotificationId: z.uuid().optional(),
});

export function announcementDeliveryDedupeKey(announcementId: string, afterNotificationId?: string): string {
  return `announce-deliver:${announcementId}${afterNotificationId ? `:${afterNotificationId}` : ""}`;
}

/**
 * Enqueues the external delivery of a fanned-out announcement. Call it (inside the fan-out's final transaction or
 * right after it) when `notify` is on; the {@link ANNOUNCEMENT_SWEEP_JOB} sweep is the safety net.
 */
export async function enqueueAnnouncementDelivery(client: DbClient, announcementId: string, afterNotificationId?: string): Promise<boolean> {
  const result = await enqueue(
    ANNOUNCEMENT_DELIVERY_JOB,
    { announcementId, ...(afterNotificationId ? { afterNotificationId } : {}) },
    { client, queue: NOTIFICATIONS_QUEUE, dedupeKey: announcementDeliveryDedupeKey(announcementId, afterNotificationId) },
  );
  return result.created;
}

/** SQL: the recipient opted in to at least one external channel for announcements (defaults honoured). */
function announcementOptInSql(defaults: NotificationDefaults): Prisma.Sql {
  const toggles = defaults.categories.ANNOUNCEMENT;
  const parts = EXTERNAL_CHANNEL_KEYS.map((key) =>
    toggles[key]
      ? Prisma.sql`COALESCE(p."notificationPrefs"->'categories'->'ANNOUNCEMENT'->${key}::text, 'true'::jsonb) <> 'false'::jsonb`
      : Prisma.sql`p."notificationPrefs"->'categories'->'ANNOUNCEMENT'->${key}::text = 'true'::jsonb`,
  );
  return Prisma.sql`(${Prisma.join(parts, " OR ")})`;
}

export type AnnouncementDeliveryResult =
  | { status: "done"; routed: number; queued: number }
  | { status: "continued"; routed: number; queued: number; afterNotificationId: string }
  | { status: "skipped"; reason: "missing" | "notify_off" | "archived" | "expired" | "not_fanned_out" };

/**
 * Handler of {@link ANNOUNCEMENT_DELIVERY_JOB}: routes the announcement's still-unread, in-app-only notifications of
 * recipients who opted in to an external channel, and enqueues their sends. Re-running finds only rows not yet routed.
 */
export async function runAnnouncementDelivery(
  rawPayload: unknown,
  options: { now?: Date; batchSize?: number; maxBatches?: number; signal?: AbortSignal } = {},
): Promise<AnnouncementDeliveryResult> {
  const payload = announcementDeliveryPayloadSchema.parse(rawPayload);
  const now = options.now ?? new Date();
  const batchSize = options.batchSize ?? BATCH_SIZE;
  const maxBatches = options.maxBatches ?? MAX_BATCHES_PER_RUN;
  const announcement = await db.announcement.findUnique({
    where: { id: payload.announcementId },
    select: { id: true, notify: true, archivedAt: true, expiresAt: true, fannedOutAt: true },
  });
  if (!announcement) return { status: "skipped", reason: "missing" };
  if (!announcement.notify) return { status: "skipped", reason: "notify_off" };
  if (announcement.archivedAt) return { status: "skipped", reason: "archived" };
  if (announcement.expiresAt && announcement.expiresAt <= now) return { status: "skipped", reason: "expired" };
  if (!announcement.fannedOutAt) return { status: "skipped", reason: "not_fanned_out" };

  const defaults = await getNotificationDefaults();
  const optIn = announcementOptInSql(defaults);
  let after = payload.afterNotificationId ?? ZERO_UUID;
  let routed = 0;
  let queued = 0;
  for (let batch = 0; batch < maxBatches; batch += 1) {
    checkAborted(options.signal, ANNOUNCEMENT_DELIVERY_JOB);
    const rows = await db.$queryRaw<{ id: string; userId: string }[]>`
      SELECT n."id"::text AS "id", n."userId"::text AS "userId"
        FROM "Notification" n
        JOIN "Profile" p ON p."userId" = n."userId"
       WHERE n."announcementId" = ${announcement.id}::uuid
         AND n."readAt" IS NULL
         AND n."channels" = ARRAY['IN_APP']::"NotificationChannel"[]
         AND ${optIn}
         AND n."id" > ${after}::uuid
       ORDER BY n."id"
       LIMIT ${batchSize}`;
    if (rows.length === 0) return { status: "done", routed, queued };
    after = rows[rows.length - 1]?.id ?? after;
    const facts = await loadRoutingFacts(
      rows.map((row) => row.userId),
      now,
    );
    const groups = new Map<string, { channels: NotificationChannel[]; ids: string[] }>();
    for (const row of rows) {
      const user = facts.get(row.userId);
      if (!user || user.status !== "ACTIVE") continue;
      const channels = routeChannels("ANNOUNCEMENT", resolvePreferences(user.prefsRaw, defaults), channelAvailability(user.contacts));
      if (channels.length < 2) continue;
      const key = channels.join(",");
      const group = groups.get(key) ?? { channels, ids: [] };
      group.ids.push(row.id);
      groups.set(key, group);
    }
    if (groups.size > 0) {
      queued += await db.$transaction(async (tx) => {
        let count = 0;
        for (const group of groups.values()) {
          await tx.notification.updateMany({ where: { id: { in: group.ids } }, data: { channels: group.channels } });
          for (const id of group.ids) count += await enqueueNotificationDeliveries(tx, { id, channels: group.channels });
        }
        return count;
      });
      for (const group of groups.values()) routed += group.ids.length;
    }
    if (rows.length < batchSize) return { status: "done", routed, queued };
  }
  await enqueueAnnouncementDelivery(db, announcement.id, after);
  return { status: "continued", routed, queued, afterNotificationId: after };
}

/** Handler of {@link ANNOUNCEMENT_SWEEP_JOB}: enqueues delivery for announcements fanned out in the lookback window. */
export async function runAnnouncementSweep(options: { now?: Date; lookbackMinutes?: number } = {}): Promise<{ enqueued: number; checked: number }> {
  const now = options.now ?? new Date();
  const since = new Date(now.getTime() - (options.lookbackMinutes ?? ANNOUNCEMENT_SWEEP_LOOKBACK_MINUTES) * 60_000);
  const rows = await db.announcement.findMany({
    where: { notify: true, archivedAt: null, fannedOutAt: { gte: since, lte: now } },
    select: { id: true },
    orderBy: { fannedOutAt: "asc" },
    take: 200,
  });
  let enqueued = 0;
  for (const row of rows) if (await enqueueAnnouncementDelivery(db, row.id)) enqueued += 1;
  return { enqueued, checked: rows.length };
}

// =====================================================================================================================
// notifications.send — one notification on one external channel
// =====================================================================================================================

export const sendPayloadSchema = z.object({ notificationId: z.uuid(), channel: z.enum(EXTERNAL_CHANNELS) });
export type SendPayload = z.output<typeof sendPayloadSchema>;

const ADAPTER_CHANNEL: Readonly<Record<ExternalChannel, ChannelName>> = { EMAIL: "email", SMS: "sms", WHATSAPP: "whatsapp" };
const SMS_MAX_CHARS = 320;
const WHATSAPP_MAX_CHARS = 1_500;

export interface OutboundContent {
  subject: string;
  text: string;
}

/** The message text for one channel. Plain text; SMS kept to two segments. Pure. */
export function composeChannelMessage(input: {
  channel: ExternalChannel;
  title: string;
  body: string;
  link: string | null;
  settingsLink: string | null;
  appName?: string;
}): OutboundContent {
  const appName = input.appName ?? APP_NAME;
  const subject = input.title;
  if (input.channel === "SMS") {
    const head = `${appName}: ${input.title}`;
    const tail = input.link ? ` ${input.link}` : "";
    const room = SMS_MAX_CHARS - head.length - tail.length - 2;
    const body = room >= 20 ? `. ${shorten(input.body, room)}` : "";
    return { subject, text: `${head}${body}${tail}`.slice(0, SMS_MAX_CHARS) };
  }
  if (input.channel === "WHATSAPP") {
    const text = `*${input.title}*\n\n${input.body}${input.link ? `\n\n${input.link}` : ""}`;
    return { subject, text: text.length > WHATSAPP_MAX_CHARS ? `${text.slice(0, WHATSAPP_MAX_CHARS - 1)}…` : text };
  }
  const lines = [input.body];
  if (input.link) lines.push("", `Open in ${appName}: ${input.link}`);
  lines.push(
    "",
    "—",
    input.settingsLink
      ? `You get these emails because you turned them on in ${appName}. Change your notification settings: ${input.settingsLink}`
      : `You get these emails because you turned them on in ${appName}. You can change this in your notification settings.`,
  );
  return { subject, text: lines.join("\n") };
}

export type DeliveryResult =
  | { status: "sent"; channel: ExternalChannel; providerRef: string }
  | { status: "skipped"; channel: ExternalChannel; reason: string }
  | { status: "deferred"; channel: ExternalChannel; until: string };

interface DeliveryEntry {
  status: "SENT" | "FAILED" | "SKIPPED";
  at: string;
  providerRef?: string;
  error?: string;
}

async function recordDelivery(notificationId: string, channel: ExternalChannel, entry: DeliveryEntry): Promise<void> {
  await db.$executeRaw`
    UPDATE "Notification"
       SET "deliveries" = COALESCE("deliveries", '{}'::jsonb) || jsonb_build_object(${channel}::text, ${JSON.stringify(entry)}::jsonb)
     WHERE "id" = ${notificationId}::uuid`;
}

function adapterFor(channel: ExternalChannel): { configured: boolean } {
  try {
    return { configured: !(getMessagingChannel(ADAPTER_CHANNEL[channel]) instanceof UnconfiguredProvider) };
  } catch {
    // e.g. a console driver refused in production.
    return { configured: false };
  }
}

/**
 * Handler of {@link NOTIFICATION_SEND_JOB}. Idempotent: a channel already SENT is never sent again. Quiet hours defer
 * the job to the morning (same dedupe key) unless the notification expires first. A provider failure is recorded as
 * FAILED and rethrown so the job retries with backoff.
 */
export async function deliverNotification(rawPayload: unknown, options: { now?: Date } = {}): Promise<DeliveryResult> {
  const payload = sendPayloadSchema.parse(rawPayload);
  const now = options.now ?? new Date();
  const { channel } = payload;
  const notification = await db.notification.findUnique({
    where: { id: payload.notificationId },
    select: { id: true, userId: true, type: true, category: true, title: true, body: true, data: true, readAt: true, expiresAt: true, deliveries: true },
  });
  if (!notification) return { status: "skipped", channel, reason: "missing" };
  const previous = isRecord(notification.deliveries) ? notification.deliveries[channel] : undefined;
  const alreadySent = isRecord(previous) && previous.status === "SENT";
  if (alreadySent) return { status: "skipped", channel, reason: "already_sent" };
  // Optional email / SMS / WhatsApp switched off (feature flags): a send queued before the switch is dropped, never sent
  // later.
  if (!(await isChannelSwitchedOn(ADAPTER_CHANNEL[channel]))) {
    await recordDelivery(notification.id, channel, { status: "SKIPPED", at: now.toISOString(), error: "switched_off" });
    return { status: "skipped", channel, reason: "switched_off" };
  }

  const [facts, defaults] = await Promise.all([loadRoutingFacts([notification.userId], now), getNotificationDefaults()]);
  const user = facts.get(notification.userId);
  const prefs = resolvePreferences(user?.prefsRaw ?? null, defaults);
  const decision = decideDelivery({
    channel,
    category: notification.category,
    now,
    readAt: notification.readAt,
    expiresAt: notification.expiresAt,
    userActive: user?.status === "ACTIVE",
    alreadySent,
    prefs,
    timeZone: user?.timeZone ?? DEFAULT_TIMEZONE,
    contacts: user?.contacts ?? { email: null, sms: null, whatsapp: null },
    providerConfigured: adapterFor(channel).configured,
  });

  if (decision.action === "skip") {
    await recordDelivery(notification.id, channel, { status: "SKIPPED", at: now.toISOString(), error: decision.reason });
    return { status: "skipped", channel, reason: decision.reason };
  }
  if (decision.action === "defer") {
    // This job is RUNNING, so the PENDING twin with the same dedupe key is allowed.
    await enqueue(NOTIFICATION_SEND_JOB, payload, {
      queue: NOTIFICATIONS_QUEUE,
      runAt: decision.until,
      dedupeKey: sendDedupeKey(notification.id, channel),
    });
    return { status: "deferred", channel, until: decision.until.toISOString() };
  }

  const isStudent = user?.roles.includes("STUDENT") ?? false;
  const href = notificationHref(notification);
  // Links into the student area only work for students; other recipients (parents, teachers) get their own links only.
  const linkPath = !isStudent && (href === "/app" || href.startsWith("/app/")) ? null : href;
  const content = composeChannelMessage({
    channel,
    title: notification.title,
    body: notification.body,
    link: linkPath ? absoluteUrl(linkPath) : null,
    settingsLink: isStudent ? absoluteUrl("/app/notifications/settings") : null,
  });
  try {
    const sent = await sendMessage({
      channel: ADAPTER_CHANNEL[channel],
      to: decision.to,
      subject: content.subject,
      text: content.text,
      tag: `notification.${notification.type}`,
      // A retried job (timeout after the provider accepted, crash before recordDelivery) must not send twice.
      idempotencyKey: `notification:${notification.id}:${channel}`,
    });
    await recordDelivery(notification.id, channel, { status: "SENT", at: new Date().toISOString(), providerRef: sent.providerRef });
    return { status: "sent", channel, providerRef: sent.providerRef };
  } catch (error) {
    await recordDelivery(notification.id, channel, { status: "FAILED", at: new Date().toISOString(), error: describeJobError(error).slice(0, 300) }).catch(
      (recordError: unknown) => logger.error("notifications.send: could not record the failure", { notificationId: notification.id, channel, err: recordError }),
    );
    throw error;
  }
}

// =====================================================================================================================
// Registration
// =====================================================================================================================

/**
 * Payload of the batch jobs: the scheduler's period (ISO string), plus the keyset position when a capped run continues
 * in a follow-up job.
 */
export const batchJobPayloadSchema = z.looseObject({ periodStart: z.iso.datetime().optional(), afterUserId: z.uuid().optional() });

/** Handler of {@link DAILY_REMINDERS_JOB}: one run, continued in a follow-up job when it hits its batch cap. */
export async function handleDailyRemindersJob(
  payload: z.output<typeof batchJobPayloadSchema>,
  options: { signal?: AbortSignal } = {},
): Promise<DailyRemindersResult> {
  const result = await runDailyReminders({
    ...(payload.afterUserId ? { afterUserId: payload.afterUserId } : {}),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (result.continuedAfter) {
    await enqueue(DAILY_REMINDERS_JOB, { afterUserId: result.continuedAfter }, {
      queue: NOTIFICATIONS_QUEUE,
      dedupeKey: `remind-continue:${result.continuedAfter}`,
    });
  }
  return result;
}

/** Handler of {@link WEEKLY_SUMMARY_JOB}: one run, continued in a follow-up job when it hits its batch cap. */
export async function handleWeeklySummaryJob(
  payload: z.output<typeof batchJobPayloadSchema>,
  options: { signal?: AbortSignal } = {},
): Promise<WeeklySummaryResult> {
  const periodStart = payload.periodStart ? new Date(payload.periodStart) : new Date();
  const result = await runWeeklySummaries({
    periodStart,
    ...(payload.afterUserId ? { afterUserId: payload.afterUserId } : {}),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (result.continuedAfter) {
    await enqueue(WEEKLY_SUMMARY_JOB, { periodStart: periodStart.toISOString(), afterUserId: result.continuedAfter }, {
      queue: NOTIFICATIONS_QUEUE,
      dedupeKey: `summary-continue:${result.weekKey}:${result.continuedAfter}`,
    });
  }
  return result;
}

/**
 * Registers the notification jobs and schedules with the worker. Call ONCE from `src/worker/handlers.ts`
 * `registerAllJobs()`: `registerNotificationJobs(); // notifications.* (send, dailyReminders, weeklySummary, announcements)`.
 */
export function registerNotificationJobs(): void {
  registerJobHandler(NOTIFICATION_SEND_JOB, sendPayloadSchema, (payload) => deliverNotification(payload), {
    queue: NOTIFICATIONS_QUEUE,
    maxAttempts: 5,
  });
  registerJobHandler(DAILY_REMINDERS_JOB, batchJobPayloadSchema, (payload, context) => handleDailyRemindersJob(payload, { signal: context.signal }), {
    queue: NOTIFICATIONS_QUEUE,
    maxAttempts: 3,
  });
  registerJobHandler(WEEKLY_SUMMARY_JOB, batchJobPayloadSchema, (payload, context) => handleWeeklySummaryJob(payload, { signal: context.signal }), {
    queue: NOTIFICATIONS_QUEUE,
    maxAttempts: 3,
  });
  registerJobHandler(
    ANNOUNCEMENT_DELIVERY_JOB,
    announcementDeliveryPayloadSchema,
    (payload, context) => runAnnouncementDelivery(payload, { signal: context.signal }),
    { queue: NOTIFICATIONS_QUEUE, maxAttempts: 5 },
  );
  registerJobHandler(ANNOUNCEMENT_SWEEP_JOB, batchJobPayloadSchema, () => runAnnouncementSweep(), {
    queue: NOTIFICATIONS_QUEUE,
    maxAttempts: 3,
  });

  // Every 15 minutes at :01, :16, :31, :46 (just after the quarter-hour reminder times).
  registerRecurringJob(DAILY_REMINDERS_JOB, DAILY_REMINDERS_EVERY_MINUTES, DAILY_REMINDERS_JOB, { offsetMinutes: 1, queue: NOTIFICATIONS_QUEUE });
  registerRecurringJob(WEEKLY_SUMMARY_JOB, WEEKLY_SUMMARY_EVERY_MINUTES, WEEKLY_SUMMARY_JOB, {
    offsetMinutes: WEEKLY_SUMMARY_OFFSET_MINUTES,
    queue: NOTIFICATIONS_QUEUE,
  });
  registerRecurringJob(ANNOUNCEMENT_SWEEP_JOB, ANNOUNCEMENT_SWEEP_EVERY_MINUTES, ANNOUNCEMENT_SWEEP_JOB, {
    offsetMinutes: 3,
    queue: NOTIFICATIONS_QUEUE,
  });
}
