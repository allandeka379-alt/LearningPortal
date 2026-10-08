import "server-only";
import { z } from "zod";
import { Prisma, type PrivacyRequestStatus, type Role } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { CONSENT_GIVING_RELATIONSHIPS } from "@/server/family/schemas";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getStorage, type StorageDriver } from "@/server/lib/storage";
import { createRoutedNotification } from "@/server/notifications/digest";
import { DELETION_GRACE_DAYS, EXPORT_COOLDOWN_HOURS, EXPORT_JOB } from "./privacy";

/**
 * Data rights of a MINOR exercised by their guardian (SECURITY.md PRIV-02; privacy notice "Children"; ARCHITECTURE
 * §4.13, §5.12): a copy of the child's data, and deletion of the child's account, requested from the parent area
 * (`/parent/children/[studentId]`). The same `PrivacyRequest` rows and workers as the student's own requests
 * (./privacy.ts), with `requestedById` = the guardian.
 *
 * Who may ask ({@link guardianPrivacyAuthority}): a PARENT account that is either
 *   - linked to the child with an ACTIVE link whose relationship is PARENT or GUARDIAN (the relationships that may give
 *     consent; a sponsor, sibling or other relative may not), or
 *   - the child's guardian of record (`Student.guardianConsentByUserId`, the parent who gave consent),
 * and only while the child is a minor (`Student.isMinor`): adults manage their own data.
 *
 * Safeguards:
 *   - The child is told at once (in-app and their notification channels) whenever a guardian asks for their data or for
 *     their deletion, and when a guardian cancels a deletion.
 *   - Deletion keeps the 14-day grace period. The child can still cancel it from their settings (the requesting guardian
 *     is then told); the guardian can cancel their own request. Disputes go to support, never to a silent deletion.
 *   - A guardian's copy NEVER includes the child's AI tutor conversations (§21: parents never see them by default; the
 *     separately consented parent path is `src/server/family/ai-conversations.ts`).
 *   - Only the requesting guardian can download their copy, and only while they still hold authority; downloads are
 *     audited. Every request and cancellation is audited with the guardian as actor and the child as target.
 */

export interface GuardianActor {
  userId: string;
  roles: readonly Role[];
}

export type GuardianAuthorityVia = "link" | "guardian_of_record";

export interface GuardianAuthority {
  studentUserId: string;
  via: GuardianAuthorityVia;
  linkId: string | null;
}

const DAY_MS = 86_400_000;

const notFound = () => AppError.notFound("We couldn't find that child.");

function parseStudentId(value: unknown): string {
  const parsed = z.uuid().safeParse(value);
  if (!parsed.success) throw notFound();
  return parsed.data;
}

/**
 * Checks that `actor` may exercise the child's data rights (module docs).
 *
 * @throws AppError FORBIDDEN (not a parent account; linked, but not as a parent or legal guardian; the child is an
 *         adult) | NOT_FOUND (no link, not the guardian of record, unknown or deleted child)
 */
export async function guardianPrivacyAuthority(actor: GuardianActor, studentUserId: unknown, client: DbClient = db): Promise<GuardianAuthority> {
  if (!actor.roles.includes("PARENT")) throw AppError.forbidden("Only a parent or guardian account can do this.");
  const childId = parseStudentId(studentUserId);
  // Sequential: `client` may be a transaction (one connection).
  const student = await client.student.findUnique({
    where: { userId: childId },
    select: { isMinor: true, guardianConsentByUserId: true, user: { select: { status: true } } },
  });
  const link = await client.parentStudentLink.findFirst({
    where: { parentUserId: actor.userId, studentUserId: childId, status: "ACTIVE" },
    select: { id: true, relationship: true },
  });
  if (!student || student.user.status === "DELETED") throw notFound();
  const guardianLink = link && CONSENT_GIVING_RELATIONSHIPS.includes(link.relationship) ? link : null;
  const ofRecord = student.guardianConsentByUserId === actor.userId;
  if (!guardianLink && !ofRecord) {
    if (link) throw AppError.forbidden("Only a parent or legal guardian can ask for a child's data or for their account to be deleted.");
    throw notFound();
  }
  if (!student.isMinor) {
    throw AppError.forbidden("This student is an adult, so they manage their own data from their account settings.");
  }
  return { studentUserId: childId, via: guardianLink ? "link" : "guardian_of_record", linkId: guardianLink?.id ?? null };
}

export interface ChildPrivacyOverview {
  /** The guardian may request a copy / deletion (otherwise `blockedReason` says why). */
  canAct: boolean;
  blockedReason: string | null;
  /** The child's open deletion request, whoever asked for it. */
  deletion: { id: string; scheduledFor: Date; status: PrivacyRequestStatus; requestedByYou: boolean } | null;
  /** The newest copy THIS guardian asked for. */
  export: { id: string; status: PrivacyRequestStatus; requestedAt: Date; availableUntil: Date | null; downloadable: boolean } | null;
}

/** What the child page's "Data and privacy" section shows. Never throws for a guardian without authority. */
export async function getChildPrivacyOverview(actor: GuardianActor, studentUserId: unknown, now: Date = new Date()): Promise<ChildPrivacyOverview> {
  try {
    const { studentUserId: childId } = await guardianPrivacyAuthority(actor, studentUserId);
    const [deletion, latestExport] = await Promise.all([
      db.privacyRequest.findFirst({
        where: { userId: childId, kind: "DELETION", status: { in: ["REQUESTED", "PROCESSING"] } },
        select: { id: true, scheduledFor: true, status: true, requestedById: true },
      }),
      db.privacyRequest.findFirst({
        where: { userId: childId, requestedById: actor.userId, kind: "EXPORT" },
        orderBy: { createdAt: "desc" },
        select: { id: true, status: true, createdAt: true, exportStorageKey: true, exportExpiresAt: true },
      }),
    ]);
    return {
      canAct: true,
      blockedReason: null,
      deletion: deletion
        ? { id: deletion.id, scheduledFor: deletion.scheduledFor, status: deletion.status, requestedByYou: deletion.requestedById === actor.userId }
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
  } catch (error) {
    if (error instanceof AppError && (error.code === "FORBIDDEN" || error.code === "NOT_FOUND")) {
      return { canAct: false, blockedReason: error.message, deletion: null, export: null };
    }
    throw error;
  }
}

/** Tells the child about a guardian's request (best effort: the request itself is already committed and audited). */
async function notifyChild(childId: string, input: { type: string; title: string; body: string; dedupeKey: string }, now: Date): Promise<void> {
  try {
    await createRoutedNotification(
      childId,
      { type: input.type, category: "ACCOUNT", title: input.title, body: input.body, data: { href: "/app/settings" }, dedupeKey: input.dedupeKey },
      { now },
    );
  } catch (error) {
    logger.error("guardian privacy: could not notify the student", { userId: childId, err: error });
  }
}

/**
 * Queues a copy of the child's data for the guardian (without AI conversations). One per guardian and child per
 * {@link EXPORT_COOLDOWN_HOURS} hours. The child is notified.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (authority) | CONFLICT (asked recently)
 */
export async function requestChildDataExport(
  actor: GuardianActor,
  studentUserId: unknown,
  meta: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string }> {
  const row = await db.$transaction(async (tx) => {
    const authority = await guardianPrivacyAuthority(actor, studentUserId, tx);
    const childId = authority.studentUserId;
    const recent = await tx.privacyRequest.findFirst({
      where: {
        userId: childId,
        requestedById: actor.userId,
        kind: "EXPORT",
        OR: [{ status: { in: ["REQUESTED", "PROCESSING"] } }, { status: "COMPLETED", createdAt: { gt: new Date(now.getTime() - EXPORT_COOLDOWN_HOURS * 3_600_000) } }],
      },
      select: { id: true },
    });
    if (recent) throw AppError.conflict("You asked for a copy of this child's data recently. Use that one, or try again tomorrow.");
    const created = await tx.privacyRequest.create({
      data: { userId: childId, requestedById: actor.userId, kind: "EXPORT", scheduledFor: now },
      select: { id: true },
    });
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.PRIVACY_EXPORT,
      entityType: "PrivacyRequest",
      entityId: created.id,
      targetUserId: childId,
      metadata: { operation: "request", requestedBy: "guardian", via: authority.via, linkId: authority.linkId },
      request: meta,
    });
    await enqueue(EXPORT_JOB, { requestId: created.id }, { client: tx, dedupeKey: `export:${created.id}`, maxAttempts: 3 });
    return { id: created.id, childId };
  });
  await notifyChild(
    row.childId,
    {
      type: "account.privacy_guardian_export",
      title: "Your parent or guardian asked for a copy of your data",
      body: "A parent or guardian linked to your account asked for a copy of your account data. It does not include your AI tutor conversations. If you did not expect this, talk to them or contact support.",
      dedupeKey: `guardian-export:${row.id}`,
    },
    now,
  );
  return { id: row.id };
}

/**
 * Schedules the child's account deletion {@link DELETION_GRACE_DAYS} days from now. The child is notified and can
 * cancel it during the grace period (the guardian is then told), as can the requesting guardian.
 *
 * @throws AppError VALIDATION (not confirmed) | FORBIDDEN | NOT_FOUND (authority) | CONFLICT (already scheduled)
 */
export async function requestChildAccountDeletion(
  actor: GuardianActor,
  studentUserId: unknown,
  input: { confirmed?: unknown },
  meta: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; scheduledFor: Date }> {
  if (input.confirmed !== true) {
    throw AppError.validation({ confirmed: ["Confirm that you want this child's account deleted."] });
  }
  const scheduledFor = new Date(now.getTime() + DELETION_GRACE_DAYS * DAY_MS);
  let created: { id: string; scheduledFor: Date; childId: string };
  try {
    created = await db.$transaction(async (tx) => {
      const authority = await guardianPrivacyAuthority(actor, studentUserId, tx);
      const childId = authority.studentUserId;
      const row = await tx.privacyRequest.create({
        data: { userId: childId, requestedById: actor.userId, kind: "DELETION", scheduledFor },
        select: { id: true, scheduledFor: true },
      });
      await auditInTx(tx, {
        actorUserId: actor.userId,
        actorRoles: actor.roles,
        action: AUDIT_ACTIONS.PRIVACY_DELETION_REQUEST,
        entityType: "PrivacyRequest",
        entityId: row.id,
        targetUserId: childId,
        metadata: { operation: "request", requestedBy: "guardian", via: authority.via, linkId: authority.linkId, scheduledFor: scheduledFor.toISOString() },
        request: meta,
      });
      return { ...row, childId };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw AppError.conflict("This child's account is already scheduled for deletion.");
    }
    throw error;
  }
  await notifyChild(
    created.childId,
    {
      type: "account.privacy_guardian_deletion",
      title: "Your parent or guardian asked for your account to be deleted",
      body: `A parent or guardian linked to your account asked for it to be deleted. It will be deleted in ${DELETION_GRACE_DAYS} days. You can keep using it until then, and you can cancel the deletion in Settings. If you did not expect this, talk to them or contact support.`,
      dedupeKey: `guardian-deletion:${created.id}`,
    },
    now,
  );
  return { id: created.id, scheduledFor: created.scheduledFor };
}

/**
 * Cancels a deletion THIS guardian asked for, while it has not started. The child is notified.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (authority, or no pending deletion of theirs) | CONFLICT (already started)
 */
export async function cancelChildAccountDeletion(
  actor: GuardianActor,
  studentUserId: unknown,
  meta: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<void> {
  const cancelled = await db.$transaction(async (tx) => {
    const authority = await guardianPrivacyAuthority(actor, studentUserId, tx);
    const childId = authority.studentUserId;
    const pending = await tx.privacyRequest.findFirst({
      where: { userId: childId, requestedById: actor.userId, kind: "DELETION", status: "REQUESTED" },
      select: { id: true },
    });
    if (!pending) throw AppError.notFound("There is no account deletion you asked for to cancel.");
    const updated = await tx.privacyRequest.updateMany({ where: { id: pending.id, status: "REQUESTED" }, data: { status: "CANCELLED", cancelledAt: now } });
    if (updated.count !== 1) throw AppError.conflict("The deletion has already started and can no longer be cancelled.");
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.PRIVACY_DELETION_REQUEST,
      entityType: "PrivacyRequest",
      entityId: pending.id,
      targetUserId: childId,
      metadata: { operation: "cancel", requestedBy: "guardian", via: authority.via },
      request: meta,
    });
    return { id: pending.id, childId };
  });
  await notifyChild(
    cancelled.childId,
    {
      type: "account.privacy_guardian_deletion_cancelled",
      title: "Your account will not be deleted",
      body: "Your parent or guardian cancelled the deletion of your account.",
      dedupeKey: `guardian-deletion-cancel:${cancelled.id}`,
    },
    now,
  );
}

/**
 * The guardian's ready copy of the child's data, for the download route. Anything else (another guardian's copy, an
 * expired file, lost authority, an unknown id) is NOT_FOUND, so ids cannot be probed. Each download is audited.
 */
export async function openChildDataExport(
  actor: GuardianActor,
  studentUserId: unknown,
  requestId: string,
  options: { now?: Date; storage?: StorageDriver; meta?: AuditRequestInfo | null } = {},
): Promise<{ stream: ReadableStream<Uint8Array>; size: number; filename: string }> {
  const now = options.now ?? new Date();
  const unavailable = () => AppError.notFound("This download is not available.");
  if (!z.uuid().safeParse(requestId).success) throw unavailable();
  let authority: GuardianAuthority;
  try {
    authority = await guardianPrivacyAuthority(actor, studentUserId);
  } catch (error) {
    if (error instanceof AppError && (error.code === "FORBIDDEN" || error.code === "NOT_FOUND")) throw unavailable();
    throw error;
  }
  const row = await db.privacyRequest.findFirst({
    where: {
      id: requestId,
      userId: authority.studentUserId,
      requestedById: actor.userId,
      kind: "EXPORT",
      status: "COMPLETED",
      exportStorageKey: { not: null },
      exportExpiresAt: { gt: now },
    },
    select: { exportStorageKey: true, completedAt: true },
  });
  if (!row?.exportStorageKey) throw unavailable();
  const opened = await (options.storage ?? getStorage()).getStream(row.exportStorageKey);
  if (!opened) throw unavailable();
  await auditInTx(db, {
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.PRIVACY_EXPORT,
    entityType: "PrivacyRequest",
    entityId: requestId,
    targetUserId: authority.studentUserId,
    metadata: { operation: "download", requestedBy: "guardian", via: authority.via },
    request: options.meta ?? null,
  });
  const date = (row.completedAt ?? now).toISOString().slice(0, 10);
  return { ...opened, filename: `child-data-${date}.json` };
}
