import "server-only";
import { z } from "zod";
import { db, type DbClient } from "@/server/db";
import { assertCmsPermission, infraActor, type CmsActor } from "@/server/cms/users/access";
import type { Permission } from "@/server/auth/permissions";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";

/**
 * Plumbing shared by the editorial CMS services (lessons, flashcards, media, review queue, flags): transactions, the
 * permission gates of ARCHITECTURE §5.2, audit entries and input parsing. Business rules live in the services.
 */

export type { CmsActor };

/** Optional context every service accepts. */
export interface ContentServiceContext {
  /**
   * Run inside the caller's transaction instead of opening one (tests use it to set transaction-local settings such
   * as `app.four_eyes`). The root client is ignored and a new transaction is opened.
   */
  client?: DbClient;
  /** Request metadata for audit entries (request id, hashed IP, user agent). */
  request?: AuditRequestInfo | null;
}

function isTransactionClient(client: DbClient | undefined): client is Tx {
  // Interactive-transaction clients also expose model delegates, so compare with the root singleton instead.
  return client !== undefined && client !== db;
}

/** Runs `fn` in the caller's transaction (when one is passed) or a new one. */
export async function inTransaction<T>(context: ContentServiceContext, fn: (tx: Tx) => Promise<T>): Promise<T> {
  if (isTransactionClient(context.client)) return fn(context.client);
  return db.$transaction(fn, { timeout: 30_000, maxWait: 10_000 });
}

/** Read client: the caller's transaction or the root client. */
export function readClient(context: ContentServiceContext = {}): DbClient {
  return context.client ?? db;
}

// ---------------------------------------------------------------------------------------------------------------------
// Permission gates (ARCHITECTURE §5.2). Platform-wide content work needs the "all" scope: a teacher's restricted
// `content.draft` (class tests only) never reaches these services.
// ---------------------------------------------------------------------------------------------------------------------

export const CONTENT_PERMISSIONS = {
  draft: "content.draft",
  review: "content.review",
  publish: "content.publish",
  archive: "content.archive",
} as const satisfies Record<string, Permission>;

export function assertCanDraft(actor: CmsActor): void {
  assertCmsPermission(actor, CONTENT_PERMISSIONS.draft, "all");
}

export function assertCanReview(actor: CmsActor): void {
  assertCmsPermission(actor, CONTENT_PERMISSIONS.review, "all");
}

export function assertCanPublish(actor: CmsActor): void {
  assertCmsPermission(actor, CONTENT_PERMISSIONS.publish, "all");
}

export function assertCanArchive(actor: CmsActor): void {
  assertCmsPermission(actor, CONTENT_PERMISSIONS.archive, "all");
}

// ---------------------------------------------------------------------------------------------------------------------
// Audit (ARCHITECTURE §5.10)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Audit actions of the editorial CMS: precise keys of the shared registry (`AUDIT_ACTIONS`, src/server/lib/audit.ts).
 * Approve / publish / archive are written by the publish helper itself. `metadata.operation`
 * ({@link CONTENT_CMS_OPERATIONS}) is still recorded and refines the action where needed (e.g. "content.bulk_create").
 */
export const CONTENT_CMS_AUDIT = {
  CREATE: AUDIT_ACTIONS.CONTENT_CREATE,
  UPDATE: AUDIT_ACTIONS.CONTENT_UPDATE,
  SUBMIT: AUDIT_ACTIONS.CONTENT_SUBMIT,
  REQUEST_CHANGES: AUDIT_ACTIONS.CONTENT_REQUEST_CHANGES,
  DRAFT_COPY: AUDIT_ACTIONS.CONTENT_DRAFT_COPY,
  DISCARD: AUDIT_ACTIONS.CONTENT_DISCARD,
  MEDIA_UPLOAD: AUDIT_ACTIONS.MEDIA_UPLOAD,
  MEDIA_UPDATE: AUDIT_ACTIONS.MEDIA_UPDATE,
  MEDIA_DELETE: AUDIT_ACTIONS.MEDIA_DELETE,
  FLAG_TRIAGE: AUDIT_ACTIONS.CONTENT_FLAG_TRIAGE,
  FLAG_RESOLVE: AUDIT_ACTIONS.CONTENT_FLAG_RESOLVE,
  FLAG_REJECT: AUDIT_ACTIONS.CONTENT_FLAG_REJECT,
} as const satisfies Record<string, AuditAction>;

/** Precise operation names written to `AuditLog.metadata.operation`. */
export const CONTENT_CMS_OPERATIONS = {
  create: "content.create",
  update: "content.update",
  bulkCreate: "content.bulk_create",
  submit: "content.submit",
  requestChanges: "content.request_changes",
  draftCopy: "content.draft_copy",
  discardDraftCopy: "content.discard",
  mediaUpload: "media.upload",
  mediaUpdate: "media.update",
  mediaDelete: "media.delete",
  flagTriage: "content_flag.triage",
  flagResolve: "content_flag.resolve",
  flagReject: "content_flag.reject",
} as const;

export interface ContentAuditEntry {
  action: AuditAction;
  operation: string;
  /** Table name, e.g. "Lesson", "Flashcard", "MediaAsset", "ContentFlag". */
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  metadata?: Record<string, unknown>;
  reason?: string | null;
}

/** Writes the audit entry in the same transaction as the change (both commit or neither does). */
export async function auditContent(tx: DbClient, actor: CmsActor, context: ContentServiceContext, entry: ContentAuditEntry): Promise<void> {
  const fields = infraActor(actor);
  await auditInTx(tx, {
    actorUserId: fields.kind === "user" ? fields.userId : null,
    actorRoles: fields.kind === "user" ? fields.roles : [],
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    before: entry.before,
    after: entry.after,
    metadata: { operation: entry.operation, ...entry.metadata },
    reason: entry.reason ?? null,
    request: context.request ?? null,
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Input parsing
// ---------------------------------------------------------------------------------------------------------------------

/** Validates service input: AppError VALIDATION with field errors (never a raw ZodError) on failure. */
export function parseInput<S extends z.ZodType>(schema: S, raw: unknown): z.output<S> {
  const result = schema.safeParse(raw);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/** Blank strings (from forms) become `undefined`; other values pass through. */
export function blankToUndefined(value: unknown): unknown {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

/** Optional trimmed text with a maximum length (blank → null). */
export function optionalText(max: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
    z.string().max(max, `Use at most ${max} characters.`).nullable(),
  );
}

export const uuidSchema = z.uuid("Choose a valid item.");

/** Profile columns needed for {@link staffName}. */
export const PERSON_SELECT = { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } as const;

type PersonRow = { profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null } | null;

/** Display name of a staff member (author, reviewer, approver); `null` when the user was deleted. */
export function staffName(person: PersonRow | undefined): string | null {
  if (!person) return null;
  const profile = person.profile;
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username?.trim() || "Unnamed user";
}

/** True when `app.four_eyes = 'on'` (production default): authors may not approve their own work. */
export async function isFourEyesEnforced(client: DbClient = db): Promise<boolean> {
  const rows = await client.$queryRaw<{ v: string | null }[]>`SELECT current_setting('app.four_eyes', true) AS "v"`;
  return rows[0]?.v === "on";
}
