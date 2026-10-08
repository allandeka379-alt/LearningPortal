import "server-only";
import { z } from "zod";
import { Prisma, type PrivacyRequestStatus, type Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { generateStorageKey, getStorage, type StorageDriver } from "@/server/lib/storage";
import { createRoutedNotification } from "@/server/notifications/digest";
import { deleteUserAccount } from "./deletion";
import { buildAccountExport } from "./export";

/**
 * Data-subject requests (privacy notice "Your rights"; ARCHITECTURE §4.13 / §5.13; schema `PrivacyRequest`):
 *
 * - **Account deletion**: requested by the account holder, carried out {@link DELETION_GRACE_DAYS} days later by the
 *   privacy worker ({@link processDuePrivacyRequests} → `accounts.deleteUser`, ./deletion.ts) unless cancelled first.
 *   One open deletion request per user (partial unique index).
 * - **Data export**: a JSON file of the account's data (./export.ts) built by the `accounts.exportData` job, stored in
 *   PRIVATE storage and downloadable by its owner only (`/app/settings/data/[requestId]`) for
 *   {@link EXPORT_AVAILABLE_DAYS} days; then the file is removed. At most one export per {@link EXPORT_COOLDOWN_HOURS}.
 *
 * Every request, cancellation, export and deletion is audited (`privacy.*`).
 *
 * A minor's guardian can make the same requests for the child (./guardian-privacy.ts, `requestedById` = the guardian):
 * the student sees a guardian's pending deletion here and can cancel it (the guardian is told); a guardian's copy
 * leaves out AI conversations and is downloadable by that guardian only. Whoever asked for an export is notified when
 * it is ready.
 */

export const DELETION_GRACE_DAYS = 14;
export const EXPORT_AVAILABLE_DAYS = 7;
export const EXPORT_COOLDOWN_HOURS = 24;
export const EXPORT_JOB = "accounts.exportData";
export const PRIVACY_SWEEP_JOB = "accounts.privacySweep";

const DAY_MS = 86_400_000;

export interface PrivacyActor {
  userId: string;
  roles: readonly Role[];
}

function actorFields(actor: PrivacyActor): { actorUserId: string; actorRoles: readonly Role[] } {
  return { actorUserId: actor.userId, actorRoles: actor.roles };
}

export interface PrivacyOverview {
  /** The open deletion request, when there is one (`requestedByGuardian`: a parent or guardian asked for it). */
  deletion: { id: string; scheduledFor: Date; status: PrivacyRequestStatus; requestedByGuardian: boolean } | null;
  /** The newest export request the user made themselves. */
  export: { id: string; status: PrivacyRequestStatus; requestedAt: Date; availableUntil: Date | null; downloadable: boolean } | null;
}

/** Requests the user made themselves (a guardian's requests for a child carry the guardian's id). */
function ownRequests(userId: string): Prisma.PrivacyRequestWhereInput {
  return { OR: [{ requestedById: userId }, { requestedById: null }] };
}

/** What the "Your data" settings section shows. */
export async function getPrivacyOverview(actor: PrivacyActor, now: Date = new Date()): Promise<PrivacyOverview> {
  const [deletion, latestExport] = await Promise.all([
    db.privacyRequest.findFirst({
      where: { userId: actor.userId, kind: "DELETION", status: { in: ["REQUESTED", "PROCESSING"] } },
      select: { id: true, scheduledFor: true, status: true, requestedById: true },
    }),
    db.privacyRequest.findFirst({
      where: { userId: actor.userId, kind: "EXPORT", ...ownRequests(actor.userId) },
      orderBy: { createdAt: "desc" },
      select: { id: true, status: true, createdAt: true, exportStorageKey: true, exportExpiresAt: true },
    }),
  ]);
  return {
    deletion: deletion
      ? {
          id: deletion.id,
          scheduledFor: deletion.scheduledFor,
          status: deletion.status,
          requestedByGuardian: deletion.requestedById !== null && deletion.requestedById !== actor.userId,
        }
      : null,
    export: latestExport
      ? {
          id: latestExport.id,
          status: latestExport.status,
          requestedAt: latestExport.createdAt,
          availableUntil: latestExport.exportExpiresAt,
          downloadable:
            latestExport.status === "COMPLETED" && latestExport.exportStorageKey !== null && (latestExport.exportExpiresAt?.getTime() ?? 0) > now.getTime(),
        }
      : null,
  };
}

/** Schedules the account's deletion {@link DELETION_GRACE_DAYS} days from now (cancellable until then). */
export async function requestAccountDeletion(
  actor: PrivacyActor,
  input: { confirmed?: unknown },
  meta: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; scheduledFor: Date }> {
  if (input.confirmed !== true) {
    throw AppError.validation({ confirmed: ["Tick the box to confirm you want your account deleted."] });
  }
  const scheduledFor = new Date(now.getTime() + DELETION_GRACE_DAYS * DAY_MS);
  try {
    return await db.$transaction(async (tx) => {
      const row = await tx.privacyRequest.create({
        data: { userId: actor.userId, requestedById: actor.userId, kind: "DELETION", scheduledFor },
        select: { id: true, scheduledFor: true },
      });
      await auditInTx(tx, {
        ...actorFields(actor),
        action: AUDIT_ACTIONS.PRIVACY_DELETION_REQUEST,
        entityType: "PrivacyRequest",
        entityId: row.id,
        targetUserId: actor.userId,
        metadata: { operation: "request", scheduledFor: scheduledFor.toISOString() },
        request: meta,
      });
      return row;
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw AppError.conflict("Your account is already scheduled for deletion.");
    }
    throw error;
  }
}

/**
 * Cancels the account's pending deletion (only while it has not started), including one a guardian asked for: the
 * guardian is then notified.
 */
export async function cancelAccountDeletion(actor: PrivacyActor, meta: AuditRequestInfo | null = null, now: Date = new Date()): Promise<void> {
  const cancelled = await db.$transaction(async (tx) => {
    const pending = await tx.privacyRequest.findFirst({
      where: { userId: actor.userId, kind: "DELETION", status: "REQUESTED" },
      select: { id: true, requestedById: true },
    });
    if (!pending) throw AppError.notFound("There is no account deletion to cancel.");
    const updated = await tx.privacyRequest.updateMany({
      where: { id: pending.id, status: "REQUESTED" },
      data: { status: "CANCELLED", cancelledAt: now },
    });
    if (updated.count !== 1) throw AppError.conflict("The deletion has already started and can no longer be cancelled.");
    await auditInTx(tx, {
      ...actorFields(actor),
      action: AUDIT_ACTIONS.PRIVACY_DELETION_REQUEST,
      entityType: "PrivacyRequest",
      entityId: pending.id,
      targetUserId: actor.userId,
      metadata: { operation: "cancel", ...(pending.requestedById !== null && pending.requestedById !== actor.userId ? { requestedBy: "guardian" } : {}) },
      request: meta,
    });
    return pending;
  });
  if (cancelled.requestedById !== null && cancelled.requestedById !== actor.userId) {
    await notifyRequester(
      cancelled.requestedById,
      {
        type: "parent.child_deletion_cancelled",
        title: "Your child cancelled the account deletion",
        body: "Your child cancelled the deletion of their account that you asked for, so it will not be deleted. If you still want it deleted, talk to them or contact support.",
        href: `/parent/children/${actor.userId}`,
        dedupeKey: `deletion-cancelled:${cancelled.id}`,
      },
      now,
    );
  }
}

/** Notifies whoever asked for a privacy request (best effort: the request itself is committed and audited). */
async function notifyRequester(
  userId: string,
  input: { type: string; title: string; body: string; href: string; dedupeKey: string },
  now: Date,
): Promise<void> {
  try {
    await createRoutedNotification(
      userId,
      { type: input.type, category: "ACCOUNT", title: input.title, body: input.body, data: { href: input.href }, dedupeKey: input.dedupeKey },
      { now },
    );
  } catch (error) {
    logger.error("privacy: could not notify the requester", { userId, err: error });
  }
}

/** Queues a JSON export of the account's data. */
export async function requestDataExport(actor: PrivacyActor, meta: AuditRequestInfo | null = null, now: Date = new Date()): Promise<{ id: string }> {
  return db.$transaction(async (tx) => {
    const recent = await tx.privacyRequest.findFirst({
      where: {
        userId: actor.userId,
        kind: "EXPORT",
        AND: [
          ownRequests(actor.userId),
          { OR: [{ status: { in: ["REQUESTED", "PROCESSING"] } }, { status: "COMPLETED", createdAt: { gt: new Date(now.getTime() - EXPORT_COOLDOWN_HOURS * 3_600_000) } }] },
        ],
      },
      select: { id: true },
    });
    if (recent) throw AppError.conflict("You asked for a copy of your data recently. Use that one, or try again tomorrow.");
    const row = await tx.privacyRequest.create({
      data: { userId: actor.userId, requestedById: actor.userId, kind: "EXPORT", scheduledFor: now },
      select: { id: true },
    });
    await auditInTx(tx, {
      ...actorFields(actor),
      action: AUDIT_ACTIONS.PRIVACY_EXPORT,
      entityType: "PrivacyRequest",
      entityId: row.id,
      targetUserId: actor.userId,
      metadata: { operation: "request" },
      request: meta,
    });
    await enqueue(EXPORT_JOB, { requestId: row.id }, { client: tx, dedupeKey: `export:${row.id}`, maxAttempts: 3 });
    return row;
  });
}

/**
 * The owner's ready export file (one they asked for themselves; a guardian's copy is downloaded by the guardian, see
 * ./guardian-privacy.ts), for the download route. Anything else is NOT_FOUND (ids cannot be probed).
 */
export async function openDataExport(
  actor: PrivacyActor,
  requestId: string,
  options: { now?: Date; storage?: StorageDriver } = {},
): Promise<{ stream: ReadableStream<Uint8Array>; size: number; filename: string }> {
  const now = options.now ?? new Date();
  const notFound = () => AppError.notFound("This download is not available.");
  if (!z.uuid().safeParse(requestId).success) throw notFound();
  const row = await db.privacyRequest.findFirst({
    where: {
      id: requestId,
      userId: actor.userId,
      kind: "EXPORT",
      status: "COMPLETED",
      exportStorageKey: { not: null },
      exportExpiresAt: { gt: now },
      ...ownRequests(actor.userId),
    },
    select: { exportStorageKey: true, completedAt: true },
  });
  if (!row?.exportStorageKey) throw notFound();
  const opened = await (options.storage ?? getStorage()).getStream(row.exportStorageKey);
  if (!opened) throw notFound();
  const date = (row.completedAt ?? now).toISOString().slice(0, 10);
  return { ...opened, filename: `my-data-${date}.json` };
}

// =====================================================================================================================
// Worker
// =====================================================================================================================

/**
 * `accounts.exportData`: builds and stores one export. Idempotent (a COMPLETED request is left alone). A failure puts
 * the request back for the job's next attempt, and marks it FAILED on the last one. A guardian's copy of a child's
 * data leaves out the child's AI conversations (§21). Whoever asked is notified when the file is ready.
 */
export async function runDataExport(
  requestId: string,
  options: { now?: Date; storage?: StorageDriver; finalAttempt?: boolean } = {},
): Promise<{ status: string }> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  const claimed = await db.privacyRequest.updateMany({
    where: { id: requestId, kind: "EXPORT", status: { in: ["REQUESTED", "PROCESSING"] } },
    data: { status: "PROCESSING" },
  });
  if (claimed.count !== 1) return { status: "skipped" };
  const row = await db.privacyRequest.findUniqueOrThrow({ where: { id: requestId }, select: { userId: true, requestedById: true } });
  const byGuardian = row.requestedById !== null && row.requestedById !== row.userId;
  try {
    const document = await buildAccountExport(row.userId, now, { audience: byGuardian ? "guardian" : "owner" });
    const key = generateStorageKey("privacy-export", "json", now);
    await storage.put(key, new TextEncoder().encode(JSON.stringify(document, null, 2)), "application/json");
    await db.$transaction(async (tx) => {
      await tx.privacyRequest.update({
        where: { id: requestId },
        data: { status: "COMPLETED", completedAt: now, exportStorageKey: key, exportExpiresAt: new Date(now.getTime() + EXPORT_AVAILABLE_DAYS * DAY_MS) },
      });
      await auditInTx(tx, {
        actorUserId: null,
        action: AUDIT_ACTIONS.PRIVACY_EXPORT,
        entityType: "PrivacyRequest",
        entityId: requestId,
        targetUserId: row.userId,
        metadata: { operation: "complete", ...(byGuardian ? { requestedBy: "guardian" } : {}) },
      });
    });
    const availableUntil = new Date(now.getTime() + EXPORT_AVAILABLE_DAYS * DAY_MS).toISOString().slice(0, 10);
    await notifyRequester(
      row.requestedById ?? row.userId,
      byGuardian
        ? {
            type: "parent.child_data_export_ready",
            title: "Your child's data copy is ready",
            body: `The copy of your child's account data that you asked for is ready to download until ${availableUntil}. It does not include their AI tutor conversations.`,
            href: `/parent/children/${row.userId}`,
            dedupeKey: `export-ready:${requestId}`,
          }
        : {
            type: "account.data_export_ready",
            title: "Your data copy is ready",
            body: `The copy of your account data that you asked for is ready to download from Settings until ${availableUntil}.`,
            href: "/app/settings",
            dedupeKey: `export-ready:${requestId}`,
          },
      now,
    );
    return { status: "completed" };
  } catch (error) {
    logger.error("privacy export failed", { privacyRequestId: requestId, err: error });
    await db.privacyRequest.update({
      where: { id: requestId },
      data: { status: options.finalAttempt === false ? "REQUESTED" : "FAILED", failureReason: "The export could not be built." },
    });
    throw error;
  }
}

/**
 * `accounts.privacySweep` (hourly): carries out deletions whose grace period is over, and removes export files that
 * are no longer downloadable. A deletion that fails goes back to REQUESTED with the reason recorded and is retried by
 * the next sweep (each run logs an error for operators); `deleteUserAccount` is idempotent.
 */
export async function processDuePrivacyRequests(options: { now?: Date; storage?: StorageDriver } = {}): Promise<{ deleted: number; failed: number; exportsExpired: number }> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  let deleted = 0;
  let failed = 0;
  const due = await db.privacyRequest.findMany({
    where: { kind: "DELETION", status: "REQUESTED", scheduledFor: { lte: now } },
    orderBy: { scheduledFor: "asc" },
    take: 50,
    select: { id: true, userId: true },
  });
  for (const request of due) {
    const claimed = await db.privacyRequest.updateMany({ where: { id: request.id, status: "REQUESTED" }, data: { status: "PROCESSING" } });
    if (claimed.count !== 1) continue;
    try {
      await deleteUserAccount(request.userId, { now, storage, privacyRequestId: request.id });
      await db.privacyRequest.update({ where: { id: request.id }, data: { status: "COMPLETED", completedAt: now } });
      deleted += 1;
    } catch (error) {
      failed += 1;
      logger.error("account deletion failed", { privacyRequestId: request.id, userId: request.userId, err: error });
      await db.privacyRequest.update({ where: { id: request.id }, data: { status: "REQUESTED", failureReason: "The last deletion attempt failed; it is retried." } });
    }
  }

  const expired = await db.privacyRequest.findMany({
    where: { kind: "EXPORT", exportStorageKey: { not: null }, exportExpiresAt: { lte: now } },
    take: 200,
    select: { id: true, exportStorageKey: true },
  });
  let exportsExpired = 0;
  for (const row of expired) {
    try {
      if (row.exportStorageKey) await storage.delete(row.exportStorageKey);
      await db.privacyRequest.update({ where: { id: row.id }, data: { exportStorageKey: null } });
      exportsExpired += 1;
    } catch (error) {
      logger.error("privacy export cleanup failed", { privacyRequestId: row.id, err: error });
    }
  }
  return { deleted, failed, exportsExpired };
}
