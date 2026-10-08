import "server-only";
import { z } from "zod";
import { db, type DbClient } from "@/server/db";
import type { Permission } from "@/server/auth/permissions";
import { assertCmsPermission, infraActor, type CmsActor } from "@/server/cms/users/access";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { SEARCH_JOB_QUEUE, searchIndexDedupeKey } from "@/server/search/indexer";

/**
 * Plumbing shared by the question bank, assessment builder and study-pack services (src/server/cms/{questions,
 * assessments,study-packs}): transactions, the §5.2 permission gates, audit entries, input parsing, keyset cursors
 * and the search re-index queue. Business rules live in the services; this module has none.
 */

export type { CmsActor };

/** Optional context every service accepts. */
export interface CmsContext {
  /**
   * Run inside the caller's transaction instead of opening one (tests use it to set transaction-local settings such
   * as `app.four_eyes`). Passing the root client is the same as passing nothing.
   */
  client?: DbClient;
  /** Request metadata for audit entries (request id, hashed IP, user agent). */
  request?: AuditRequestInfo | null;
}

function isTransactionClient(client: DbClient | undefined): client is Tx {
  // Interactive-transaction clients expose the same delegates as the root client, so compare with the singleton.
  return client !== undefined && client !== db;
}

/** Runs `fn` in the caller's transaction (when one is passed) or a new one. */
export async function inTransaction<T>(context: CmsContext, fn: (tx: Tx) => Promise<T>): Promise<T> {
  if (isTransactionClient(context.client)) return fn(context.client);
  return db.$transaction(fn, { timeout: 30_000, maxWait: 10_000 });
}

/** Read client: the caller's transaction or the root client. */
export function readClient(context: CmsContext = {}): DbClient {
  return context.client ?? db;
}

// ---------------------------------------------------------------------------------------------------------------------
// Permission gates (ARCHITECTURE §5.2). Platform content work needs the "all" scope: a teacher's restricted
// `content.draft` (class tests only) never reaches these services.
// ---------------------------------------------------------------------------------------------------------------------

function gate(permission: Permission) {
  return (actor: CmsActor): void => assertCmsPermission(actor, permission, "all");
}

/** Read and edit drafts (CONTENT_EDITOR, ADMIN, SUPER_ADMIN). */
export const assertCanDraft = gate("content.draft");
/** Approve / send back (never one's own work when four-eyes is on). */
export const assertCanReview = gate("content.review");
export const assertCanPublish = gate("content.publish");
export const assertCanArchive = gate("content.archive");
/** Study-pack prices (ADMIN, SUPER_ADMIN; ARCHITECTURE §3.3 "pricing ADMIN+"). */
export const assertCanPrice = gate("billing.manage");

/** True when `actor` may perform `permission` platform-wide (UI: which buttons to show). */
export function can(actor: CmsActor, permission: Permission): boolean {
  try {
    assertCmsPermission(actor, permission, "all");
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Audit (ARCHITECTURE §5.10)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Audit actions of these services: precise keys of the shared registry (`AUDIT_ACTIONS`, src/server/lib/audit.ts).
 * Approve / publish / archive are written by the publish helper itself. The event is also recorded in
 * `metadata.operation` ({@link CMS_CONTENT_OPERATIONS}).
 */
export const CMS_CONTENT_AUDIT = {
  CREATE: AUDIT_ACTIONS.CONTENT_CREATE,
  UPDATE: AUDIT_ACTIONS.CONTENT_UPDATE,
  DELETE: AUDIT_ACTIONS.CONTENT_DELETE,
  SUBMIT: AUDIT_ACTIONS.CONTENT_SUBMIT,
  REQUEST_CHANGES: AUDIT_ACTIONS.CONTENT_REQUEST_CHANGES,
  DRAFT_COPY: AUDIT_ACTIONS.CONTENT_DRAFT_COPY,
  DISCARD: AUDIT_ACTIONS.CONTENT_DISCARD,
  REOPEN: AUDIT_ACTIONS.CONTENT_REOPEN,
  PRICE_CREATE: AUDIT_ACTIONS.PLAN_PRICE_CREATE,
  PRICE_UPDATE: AUDIT_ACTIONS.PLAN_PRICE_UPDATE,
} as const satisfies Record<string, AuditAction>;

/** Precise operation names written to `AuditLog.metadata.operation`. */
export const CMS_CONTENT_OPERATIONS = {
  create: "content.create",
  update: "content.update",
  delete: "content.delete",
  submit: "content.submit",
  requestChanges: "content.request_changes",
  draftCopy: "content.draft_copy",
  discardDraftCopy: "content.discard",
  reopen: "content.reopen",
  priceCreate: "plan_price.create",
  priceUpdate: "plan_price.update",
} as const;

export interface CmsAuditEntry {
  action: AuditAction;
  operation: string;
  /** Table name, e.g. "Question", "Assessment", "StudyPack", "PlanPrice". */
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  metadata?: Record<string, unknown>;
  reason?: string | null;
}

/** Writes the audit entry in the same transaction as the change (both commit or neither does). */
export async function auditCms(tx: DbClient, actor: CmsActor, context: CmsContext, entry: CmsAuditEntry): Promise<void> {
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

/** Optional trimmed text with a maximum length (blank → null). */
export function optionalText(max: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).nullable(),
  );
}

/** Optional uuid (blank → null). */
export const optionalUuid = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null)),
  z.uuid("Choose a valid item.").nullable(),
);

/** Optional whole number from a form or JSON (blank → null). */
export function optionalInt(min: number, max: number, message?: string) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? null : typeof value === "string" ? Number(value) : value),
    z
      .int(message ?? `Enter a whole number from ${min} to ${max}.`)
      .min(min, message ?? `Enter a whole number from ${min} to ${max}.`)
      .max(max, message ?? `Enter a whole number from ${min} to ${max}.`)
      .nullable(),
  );
}

/** Checkbox / JSON boolean. */
export const flag = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

export const uuidSchema = z.uuid("Choose a valid item.");

/** `YYYY-MM-DD` (blank → null) as a UTC midnight Date for `@db.Date` columns. */
export const optionalDate = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null)),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD.")
    .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime()), "Enter a real date.")
    .transform((value) => new Date(`${value}T00:00:00Z`))
    .nullable(),
);

/** http(s) URL (blank → null). */
export const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : typeof value === "string" ? value.trim() : (value ?? null)),
  z
    .string()
    .max(2_000)
    .refine((value) => /^https?:\/\/[^\s]+$/i.test(value), "Enter a full web address starting with https://.")
    .nullable(),
);

// ---------------------------------------------------------------------------------------------------------------------
// Keyset cursors (rule 11): lists ordered by (updatedAt DESC, id DESC), the "recently worked on" order editors want.
// ---------------------------------------------------------------------------------------------------------------------

const cursorSchema = z.object({ t: z.number().int().nonnegative(), id: z.uuid() });

export function encodeUpdatedCursor(row: { updatedAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: row.updatedAt.getTime(), id: row.id })).toString("base64url");
}

/** Decodes a cursor from the URL; a tampered or stale cursor is a 400, never a crash. */
export function decodeUpdatedCursor(cursor: string | null | undefined): { updatedAt: Date; id: string } | null {
  if (!cursor) return null;
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { updatedAt: new Date(parsed.t), id: parsed.id };
  } catch {
    throw new AppError("BAD_REQUEST", "This page link is no longer valid. Go back to the first page.");
  }
}

/** Prisma `where` fragment selecting rows strictly after the cursor in (updatedAt DESC, id DESC) order. */
export function afterUpdatedCursor(cursor: { updatedAt: Date; id: string } | null): { OR?: Record<string, unknown>[] } {
  if (cursor === null) return {};
  return { OR: [{ updatedAt: { lt: cursor.updatedAt } }, { updatedAt: cursor.updatedAt, id: { lt: cursor.id } }] };
}

/** Splits `limit + 1` fetched rows into the page and the next cursor. */
export function updatedPage<T extends { updatedAt: Date; id: string }>(rows: readonly T[], limit: number): { items: T[]; nextCursor: string | null } {
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  return { items, nextCursor: rows.length > limit && last ? encodeUpdatedCursor(last) : null };
}

export const PAGE_SIZE = 25;

// ---------------------------------------------------------------------------------------------------------------------
// Workflow helpers
// ---------------------------------------------------------------------------------------------------------------------

/** True when `app.four_eyes = 'on'` (production default): authors may not approve their own work. */
export async function isFourEyesOn(client: DbClient = db): Promise<boolean> {
  const rows = await client.$queryRaw<{ v: string | null }[]>`SELECT current_setting('app.four_eyes', true) AS "v"`;
  return rows[0]?.v === "on";
}

/** Queues `search.reindexEntity` in the caller's transaction (deduplicated while pending). */
export async function enqueueReindex(tx: Tx, entityType: "QUESTION" | "ASSESSMENT" | "STUDY_PACK", entityId: string): Promise<void> {
  await enqueue("search.reindexEntity", { entityType, entityId }, { client: tx, queue: SEARCH_JOB_QUEUE, dedupeKey: searchIndexDedupeKey(entityType, entityId) });
}

/** Profile fields for "who" columns (§42 who/when). */
export const PERSON_SELECT = { select: { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } } as const;

export interface PersonRow {
  profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null;
}

/** "Tendai Moyo" for a joined user, null when the user is gone. */
export function personName(user: PersonRow | null | undefined): string | null {
  if (!user) return null;
  const profile = user.profile;
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username?.trim() || "Unnamed user";
}

/** UTC midnight of `now` (for licence validity windows on `@db.Date` columns). */
export function startOfUtcDay(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}
