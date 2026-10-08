import "server-only";
import { z } from "zod";
import {
  NotificationCategory,
  NotificationChannel,
  Prisma,
  type Notification,
} from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";

/**
 * In-app notifications (§6, §21, §22 announcements, ARCHITECTURE §3.2 `notifications`).
 *
 * - Plain text only (`title` ≤ 200, `body` ≤ 2,000); links go in `data.href` as an APP-RELATIVE path.
 * - `data` carries only what the recipient may already see — never secrets, never another student's data.
 * - Fan-out ({@link notifyMany}) writes in chunks with `createMany … skipDuplicates`; pass a `dedupeKey`
 *   (e.g. `announcement:<id>`) so a retried fan-out job never notifies anyone twice (unique per user).
 * - Delivery to email / SMS / WhatsApp is a separate step (`notifications.send` job, messaging adapters in
 *   `src/server/messaging`), applying preferences and quiet hours; this module only records the in-app inbox.
 */

export const NOTIFICATION_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;
const MAX_DATA_BYTES = 4_096;
export const NOTIFY_MANY_CHUNK_SIZE = 1_000;

const TYPE_PATTERN = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/;
const APP_PATH_PATTERN = /^\/(?![/\\])[^\s]*$/;

/** Category for a type key by its first segment (`assignment.due` → ASSIGNMENT); explicit `category` wins. */
const CATEGORY_BY_PREFIX: Readonly<Record<string, NotificationCategory>> = {
  account: "ACCOUNT",
  auth: "SECURITY",
  security: "SECURITY",
  learning: "LEARNING",
  lesson: "LEARNING",
  practice: "LEARNING",
  exam: "LEARNING",
  studyplan: "LEARNING",
  reminder: "REMINDER",
  assignment: "ASSIGNMENT",
  announcement: "ANNOUNCEMENT",
  parent: "PARENT",
  billing: "BILLING",
  payment: "BILLING",
  subscription: "BILLING",
  achievement: "ACHIEVEMENT",
  gamification: "ACHIEVEMENT",
};

/** Category used when a notification does not name one: by the type's first segment, else SYSTEM. */
export function categoryForType(type: string): NotificationCategory {
  return CATEGORY_BY_PREFIX[type.split(".")[0] ?? ""] ?? "SYSTEM";
}

const dataSchema = z
  .record(z.string(), z.unknown())
  .superRefine((data, ctx) => {
    const href = data.href;
    if (href !== undefined && (typeof href !== "string" || href.length > 2_000 || !APP_PATH_PATTERN.test(href))) {
      ctx.addIssue({ code: "custom", path: ["href"], message: "href must be an app-relative path such as /app/practice" });
    }
    const size = JSON.stringify(data)?.length ?? Infinity;
    if (size > MAX_DATA_BYTES) ctx.addIssue({ code: "custom", message: `data must be at most ${MAX_DATA_BYTES} bytes of JSON` });
  });

/** Input for one notification. */
export const notificationInputSchema = z.object({
  /** Code-registered type key, e.g. "assignment.due", "billing.renewal_reminder" (≤ 64 chars). */
  type: z.string().max(64).regex(TYPE_PATTERN, { error: "type must be a dotted lower-case key" }),
  category: z.enum(NotificationCategory).optional(),
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(2_000),
  data: dataSchema.optional(),
  /** Channels routed to (default IN_APP only). */
  channels: z.array(z.enum(NotificationChannel)).min(1).optional(),
  /** Idempotency key, unique per user (≤ 128 chars). */
  dedupeKey: z.string().min(1).max(128).optional(),
  announcementId: z.uuid().optional(),
  expiresAt: z.date().optional(),
});

export type NotificationInput = z.input<typeof notificationInputSchema>;

/** Fields returned to inbox UIs. */
export const NOTIFICATION_LIST_SELECT = {
  id: true,
  type: true,
  category: true,
  title: true,
  body: true,
  data: true,
  readAt: true,
  createdAt: true,
} as const satisfies Prisma.NotificationSelect;

export type NotificationListItem = Prisma.NotificationGetPayload<{ select: typeof NOTIFICATION_LIST_SELECT }>;

function parseInput(input: NotificationInput) {
  const parsed = notificationInputSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const value = parsed.data;
  // Strip control characters (except newlines and tabs) from the visible text.
  const clean = (text: string) => text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return {
    type: value.type,
    category: value.category ?? categoryForType(value.type),
    title: clean(value.title),
    body: clean(value.body),
    ...(value.data === undefined ? {} : { data: value.data as Prisma.InputJsonObject }),
    channels: value.channels ?? (["IN_APP"] as NotificationChannel[]),
    dedupeKey: value.dedupeKey ?? null,
    announcementId: value.announcementId ?? null,
    expiresAt: value.expiresAt ?? null,
  };
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/**
 * Creates one notification for `userId`. With a `dedupeKey`, a repeat call returns the existing notification instead
 * of creating a duplicate.
 *
 * @throws AppError VALIDATION for invalid input.
 */
export async function createNotification(
  userId: string,
  input: NotificationInput,
  options: { client?: DbClient } = {},
): Promise<Notification> {
  const data = parseInput(input);
  const client = options.client ?? db;
  try {
    return await client.notification.create({ data: { ...data, userId } });
  } catch (error) {
    if (data.dedupeKey !== null && isUniqueViolation(error)) {
      const existing = await client.notification.findUnique({ where: { userId_dedupeKey: { userId, dedupeKey: data.dedupeKey } } });
      if (existing) return existing;
    }
    throw error;
  }
}

/**
 * Fan-out: creates the same notification for many users in chunks (`createMany … skipDuplicates`). Duplicate user ids
 * are ignored. Returns the number of rows actually created (rows skipped by `dedupeKey` are not counted).
 *
 * For very large audiences call this from a `notifications.fanout` job, one chunk of recipients per job.
 */
export async function notifyMany(
  userIds: readonly string[],
  input: NotificationInput,
  options: { chunkSize?: number; client?: DbClient } = {},
): Promise<{ created: number }> {
  const data = parseInput(input);
  const chunkSize = options.chunkSize ?? NOTIFY_MANY_CHUNK_SIZE;
  if (!Number.isInteger(chunkSize) || chunkSize < 1 || chunkSize > 5_000) throw new RangeError("notifyMany: chunkSize must be 1-5000");
  const recipients = [...new Set(userIds)];
  const client = options.client ?? db;
  let created = 0;
  for (let start = 0; start < recipients.length; start += chunkSize) {
    const chunk = recipients.slice(start, start + chunkSize);
    const result = await client.notification.createMany({
      data: chunk.map((userId) => ({ ...data, userId })),
      skipDuplicates: true,
    });
    created += result.count;
  }
  return { created };
}

const cursorSchema = z.object({ t: z.number().int().nonnegative(), id: z.uuid() });

/** Opaque cursor for keyset pagination (newest first): `createdAt` + `id` tiebreak. */
export function encodeNotificationCursor(item: { createdAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: item.createdAt.getTime(), id: item.id })).toString("base64url");
}

function decodeCursor(cursor: string): { createdAt: Date; id: string } {
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { createdAt: new Date(parsed.t), id: parsed.id };
  } catch {
    throw new AppError("BAD_REQUEST", "Invalid page cursor.");
  }
}

export interface ListNotificationsOptions {
  /** `nextCursor` from the previous page. */
  cursor?: string | null;
  /** Page size, 1-50 (default 20). */
  limit?: number;
  unreadOnly?: boolean;
}

/**
 * One page of `userId`'s inbox, newest first, excluding expired notifications. Keyset pagination on
 * (`createdAt`, `id`), served by the `(userId, createdAt)` / `(userId, readAt, createdAt)` indexes.
 */
export async function listNotifications(
  userId: string,
  options: ListNotificationsOptions = {},
): Promise<{ items: NotificationListItem[]; nextCursor: string | null }> {
  const limit = Math.min(Math.max(Math.trunc(options.limit ?? NOTIFICATION_PAGE_SIZE), 1), MAX_PAGE_SIZE);
  const cursor = options.cursor ? decodeCursor(options.cursor) : null;
  const now = new Date();
  const rows = await db.notification.findMany({
    where: {
      userId,
      ...(options.unreadOnly ? { readAt: null } : {}),
      AND: [
        { OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
        ...(cursor
          ? [{ OR: [{ createdAt: { lt: cursor.createdAt } }, { createdAt: cursor.createdAt, id: { lt: cursor.id } }] }]
          : []),
      ],
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: NOTIFICATION_LIST_SELECT,
  });
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  return { items, nextCursor: rows.length > limit && last ? encodeNotificationCursor(last) : null };
}

/** Number of unread, unexpired notifications (for the badge). */
export async function countUnread(userId: string): Promise<number> {
  return db.notification.count({
    where: { userId, readAt: null, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
  });
}

/**
 * Marks notifications read. Only `userId`'s own notifications are touched (ownership is part of the filter), so
 * passing someone else's ids is a silent no-op. `"all"` marks the whole inbox read.
 *
 * @returns the number of notifications that changed from unread to read.
 */
export async function markRead(userId: string, ids: readonly string[] | "all"): Promise<{ updated: number }> {
  if (ids !== "all") {
    const parsed = z.array(z.uuid()).max(100).safeParse(ids);
    if (!parsed.success) throw AppError.fromZod(parsed.error);
    if (parsed.data.length === 0) return { updated: 0 };
  }
  const result = await db.notification.updateMany({
    where: { userId, readAt: null, ...(ids === "all" ? {} : { id: { in: [...ids] } }) },
    data: { readAt: new Date() },
  });
  return { updated: result.count };
}

/**
 * Retention purge (ARCHITECTURE §4.13, setting `notifications.retention`): deletes notifications older than
 * `olderThanDays`, in batches (BRIN index on `createdAt`). Expired notifications are already hidden from the inbox and
 * go with the same age-based sweep. Returns rows deleted.
 */
export async function purgeOldNotifications(
  olderThanDays: number,
  options: { batchSize?: number; maxBatches?: number } = {},
): Promise<number> {
  if (!Number.isInteger(olderThanDays) || olderThanDays < 1) throw new RangeError("purgeOldNotifications: olderThanDays >= 1");
  const batchSize = options.batchSize ?? 5_000;
  const maxBatches = options.maxBatches ?? 100;
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 3600_000).toISOString();
  let total = 0;
  for (let i = 0; i < maxBatches; i += 1) {
    const deleted = await db.$executeRaw`
      DELETE FROM "Notification" WHERE "id" IN (
        SELECT "id" FROM "Notification" WHERE "createdAt" < ${cutoff}::timestamptz LIMIT ${batchSize})`;
    total += deleted;
    if (deleted < batchSize) break;
  }
  return total;
}
