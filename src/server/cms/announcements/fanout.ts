import "server-only";
import { z } from "zod";
import { Prisma, type AnnouncementScope, type Role } from "@/generated/prisma/client";
import { toPlainText } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { enqueue, registerJobHandler } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { notifyMany } from "@/server/notifications";
import { enqueueAnnouncementDelivery } from "@/server/notifications/digest";

/**
 * Announcement fan-out (§22 announcements, ARCHITECTURE §3.7 jobs): turns a published Announcement into in-app
 * Notification rows for its audience, in keyset batches, idempotently.
 *
 * - Enqueued in the SAME transaction that publishes or schedules the announcement (outbox), with `runAt =
 *   publishedAt`, so a scheduled announcement fans out when it goes live and never before.
 * - The payload names the `publishedAt` it was enqueued for. Rescheduling enqueues a new job; a stale job sees the
 *   mismatch and does nothing. Archived and expired announcements are skipped.
 * - Recipients are resolved in id order with `id > afterUserId` batches (no OFFSET), `notifyMany` writes with
 *   `skipDuplicates` and the per-user dedupe key `announcement:{id}`, so a retried or duplicated job never notifies
 *   anyone twice. Large audiences continue in a follow-up job after {@link MAX_BATCHES_PER_RUN} batches, so one job
 *   never holds a worker for long.
 * - Fan-out writes the in-app notifications. External delivery (email / SMS / WhatsApp, honouring `notify`,
 *   preferences and quiet hours) is `notifications.announcementDelivery` (src/server/notifications/digest.ts), enqueued
 *   as soon as the fan-out completes; the 10-minute `notifications.announcementSweep` is the safety net.
 */

export const ANNOUNCEMENT_FANOUT_JOB = "announcements.fanout";
export const ANNOUNCEMENT_FANOUT_QUEUE = "notifications";
export const FANOUT_BATCH_SIZE = 1_000;
export const MAX_BATCHES_PER_RUN = 20;

export const fanoutPayloadSchema = z.object({
  announcementId: z.uuid(),
  /** The publication instant this job was enqueued for (ISO, UTC). */
  publishedAt: z.iso.datetime(),
  /** Continue after this user id (keyset). */
  afterUserId: z.uuid().optional(),
});
export type FanoutPayload = z.infer<typeof fanoutPayloadSchema>;

/** Dedupe key of a fan-out job (one pending job per announcement × publication time × continuation point). */
export function fanoutDedupeKey(announcementId: string, publishedAt: Date, afterUserId?: string): string {
  return `fanout:${announcementId}:${publishedAt.getTime()}${afterUserId ? `:${afterUserId}` : ""}`;
}

/** Enqueues the fan-out for a published / scheduled announcement inside the caller's transaction. */
export async function enqueueAnnouncementFanout(
  client: DbClient,
  announcement: { id: string; publishedAt: Date },
  afterUserId?: string,
): Promise<{ id: string | null; created: boolean }> {
  const payload: FanoutPayload = {
    announcementId: announcement.id,
    publishedAt: announcement.publishedAt.toISOString(),
    ...(afterUserId ? { afterUserId } : {}),
  };
  return enqueue(ANNOUNCEMENT_FANOUT_JOB, payload, {
    client,
    queue: ANNOUNCEMENT_FANOUT_QUEUE,
    runAt: announcement.publishedAt,
    dedupeKey: fanoutDedupeKey(announcement.id, announcement.publishedAt, afterUserId),
  });
}

export interface AudienceSpec {
  scope: AnnouncementScope;
  schoolId: string | null;
  classId: string | null;
  countryId: string | null;
  audienceRoles: readonly Role[];
}

const OPERATING_SCHOOL = Prisma.sql`('ACTIVE', 'PENDING_VERIFICATION')`;

/**
 * The next `limit` recipient user ids (ACTIVE accounts only) after `afterUserId`, ascending. Parameterised SQL
 * (`$queryRaw` tagged templates only).
 */
export async function resolveAudienceBatch(spec: AudienceSpec, afterUserId: string | null, limit: number): Promise<string[]> {
  const roles = [...new Set(spec.audienceRoles)];
  const everyone = roles.length === 0;
  const after = afterUserId ?? null;

  if (spec.scope === "GLOBAL") {
    const platformRoles = roles.filter((role) => role !== "SCHOOL_ADMIN");
    const roleConditions: Prisma.Sql[] = [];
    if (platformRoles.length > 0) roleConditions.push(Prisma.sql`u."roles"::text[] && ${platformRoles}::text[]`);
    if (roles.includes("SCHOOL_ADMIN")) {
      roleConditions.push(Prisma.sql`EXISTS (
        SELECT 1 FROM "SchoolMember" sm JOIN "School" s ON s."id" = sm."schoolId"
        WHERE sm."userId" = u."id" AND sm."role" = 'SCHOOL_ADMIN' AND sm."status" = 'ACTIVE' AND s."status" IN ${OPERATING_SCHOOL})`);
    }
    const roleFilter = everyone ? Prisma.sql`TRUE` : Prisma.sql`(${Prisma.join(roleConditions, " OR ")})`;
    const countryFilter =
      spec.countryId === null
        ? Prisma.sql`TRUE`
        : Prisma.sql`EXISTS (SELECT 1 FROM "Profile" p WHERE p."userId" = u."id" AND p."countryId" = ${spec.countryId}::uuid)`;
    return (
      await db.$queryRaw<{ id: string }[]>`
        SELECT u."id"::text AS id FROM "User" u
        WHERE u."status" = 'ACTIVE' AND ${roleFilter} AND ${countryFilter}
          AND (${after}::uuid IS NULL OR u."id" > ${after}::uuid)
        ORDER BY u."id"
        LIMIT ${limit}`
    ).map((row) => row.id);
  }

  const parts: Prisma.Sql[] = [];
  if (spec.scope === "SCHOOL" && spec.schoolId) {
    const memberRoles = everyone ? ["STUDENT", "TEACHER", "SCHOOL_ADMIN"] : roles.filter((role) => role === "STUDENT" || role === "TEACHER" || role === "SCHOOL_ADMIN");
    if (memberRoles.length > 0) {
      parts.push(Prisma.sql`SELECT sm."userId" AS id FROM "SchoolMember" sm
        WHERE sm."schoolId" = ${spec.schoolId}::uuid AND sm."status" = 'ACTIVE' AND sm."role"::text = ANY(${memberRoles}::text[])`);
    }
    if (roles.includes("PARENT")) {
      parts.push(Prisma.sql`SELECT l."parentUserId" AS id FROM "ParentStudentLink" l
        JOIN "SchoolMember" sm ON sm."userId" = l."studentUserId" AND sm."schoolId" = ${spec.schoolId}::uuid
          AND sm."role" = 'STUDENT' AND sm."status" = 'ACTIVE'
        WHERE l."status" = 'ACTIVE' AND l."parentUserId" IS NOT NULL`);
    }
  } else if (spec.scope === "CLASS" && spec.classId) {
    if (everyone || roles.includes("STUDENT")) {
      parts.push(Prisma.sql`SELECT cm."userId" AS id FROM "ClassMember" cm WHERE cm."classId" = ${spec.classId}::uuid AND cm."status" = 'ACTIVE'`);
    }
    if (everyone || roles.includes("TEACHER")) {
      parts.push(Prisma.sql`SELECT ct."userId" AS id FROM "ClassTeacher" ct WHERE ct."classId" = ${spec.classId}::uuid AND ct."removedAt" IS NULL`);
    }
    if (roles.includes("PARENT")) {
      parts.push(Prisma.sql`SELECT l."parentUserId" AS id FROM "ParentStudentLink" l
        JOIN "ClassMember" cm ON cm."userId" = l."studentUserId" AND cm."classId" = ${spec.classId}::uuid AND cm."status" = 'ACTIVE'
        WHERE l."status" = 'ACTIVE' AND l."parentUserId" IS NOT NULL`);
    }
  }
  if (parts.length === 0) return [];
  const source = Prisma.join(parts, " UNION ");
  return (
    await db.$queryRaw<{ id: string }[]>`
      SELECT a.id::text AS id FROM (${source}) a
      JOIN "User" u ON u."id" = a.id
      WHERE u."status" = 'ACTIVE' AND (${after}::uuid IS NULL OR a.id > ${after}::uuid)
      ORDER BY a.id
      LIMIT ${limit}`
  ).map((row) => row.id);
}

export type FanoutResult =
  | { status: "done"; notified: number; recipients: number }
  | { status: "continued"; notified: number; recipients: number; afterUserId: string }
  | { status: "skipped"; reason: "missing" | "archived" | "superseded" | "not_published" | "expired" }
  | { status: "deferred"; runAt: string };

/** Plain-text notification body from the announcement's markdown (≤ 2,000 characters). */
export function notificationBody(markdown: string, fallback: string): string {
  let text: string;
  try {
    text = toPlainText(markdown).replace(/\n{3,}/g, "\n\n").trim();
  } catch {
    text = markdown.trim();
  }
  if (!text) return fallback.slice(0, 2_000);
  return text.length > 2_000 ? `${text.slice(0, 1_997).trimEnd()}…` : text;
}

/** Handler of {@link ANNOUNCEMENT_FANOUT_JOB}. Idempotent; see the module docs. */
export async function runAnnouncementFanout(
  rawPayload: unknown,
  options: { now?: Date; batchSize?: number; maxBatches?: number; signal?: AbortSignal } = {},
): Promise<FanoutResult> {
  const payload = fanoutPayloadSchema.parse(rawPayload);
  const now = options.now ?? new Date();
  const batchSize = options.batchSize ?? FANOUT_BATCH_SIZE;
  const maxBatches = options.maxBatches ?? MAX_BATCHES_PER_RUN;

  const announcement = await db.announcement.findUnique({
    where: { id: payload.announcementId },
    select: {
      id: true,
      scope: true,
      schoolId: true,
      classId: true,
      countryId: true,
      audienceRoles: true,
      title: true,
      body: true,
      publishedAt: true,
      expiresAt: true,
      archivedAt: true,
    },
  });
  if (!announcement) return { status: "skipped", reason: "missing" };
  if (announcement.archivedAt) return { status: "skipped", reason: "archived" };
  if (!announcement.publishedAt) return { status: "skipped", reason: "not_published" };
  if (announcement.publishedAt.toISOString() !== new Date(payload.publishedAt).toISOString()) return { status: "skipped", reason: "superseded" };
  if (announcement.publishedAt > now) {
    // Ran early (clock skew): a fresh job for the right time (this one is RUNNING, so the dedupe key is free).
    await enqueueAnnouncementFanout(db, { id: announcement.id, publishedAt: announcement.publishedAt }, payload.afterUserId);
    return { status: "deferred", runAt: announcement.publishedAt.toISOString() };
  }
  if (announcement.expiresAt && announcement.expiresAt <= now) return { status: "skipped", reason: "expired" };

  const spec: AudienceSpec = announcement;
  const input = {
    type: "announcement.published",
    category: "ANNOUNCEMENT" as const,
    title: announcement.title,
    body: notificationBody(announcement.body, announcement.title),
    data: { entityType: "Announcement", entityId: announcement.id, scope: announcement.scope },
    dedupeKey: `announcement:${announcement.id}`,
    announcementId: announcement.id,
    ...(announcement.expiresAt ? { expiresAt: announcement.expiresAt } : {}),
  };

  let after = payload.afterUserId ?? null;
  let notified = 0;
  let recipients = 0;
  for (let batch = 0; batch < maxBatches; batch += 1) {
    if (options.signal?.aborted) throw new Error("announcement fan-out aborted (worker shutting down)");
    const ids = await resolveAudienceBatch(spec, after, batchSize);
    if (ids.length > 0) {
      const { created } = await notifyMany(ids, input, { chunkSize: batchSize });
      notified += created;
      recipients += ids.length;
      after = ids[ids.length - 1] ?? after;
    }
    if (ids.length < batchSize) {
      await db.announcement.update({ where: { id: announcement.id }, data: { fannedOutAt: new Date() }, select: { id: true } });
      // External channels right away (deduplicated per announcement; the sweep would catch it within 10 minutes).
      await enqueueAnnouncementDelivery(db, announcement.id);
      return { status: "done", notified, recipients };
    }
  }
  // More recipients remain: continue in a follow-up job right away.
  await enqueue(ANNOUNCEMENT_FANOUT_JOB, { ...payload, afterUserId: after! }, {
    queue: ANNOUNCEMENT_FANOUT_QUEUE,
    dedupeKey: fanoutDedupeKey(announcement.id, announcement.publishedAt, after!),
  });
  logger.info("announcement fan-out continues", { announcementId: announcement.id, recipients });
  return { status: "continued", notified, recipients, afterUserId: after! };
}

/**
 * Registers the fan-out handler with the worker. Call from `src/worker/handlers.ts` `registerAllJobs()` (shared file,
 * owned by the integrator): `registerAnnouncementJobs(); // announcements.fanout (notifications queue)`.
 */
export function registerAnnouncementJobs(): void {
  registerJobHandler(ANNOUNCEMENT_FANOUT_JOB, fanoutPayloadSchema, (payload, context) => runAnnouncementFanout(payload, { signal: context.signal }), {
    queue: ANNOUNCEMENT_FANOUT_QUEUE,
    maxAttempts: 5,
  });
}
