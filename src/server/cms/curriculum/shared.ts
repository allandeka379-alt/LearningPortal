import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { localDateString } from "@/lib/dates";
import { invalidateCatalogueCache, invalidateCurriculumPathCache, invalidateGradeSchemeCache } from "@/server/curriculum";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { z } from "zod";
import type { CurriculumActor } from "./access";
import type { Problems } from "./core";

/**
 * Plumbing shared by the curriculum CMS services: transactions, audit entries, Prisma error mapping, cache and search
 * invalidation, cursor pagination.
 */

/** Optional context every mutating service accepts. */
export interface ServiceContext {
  /**
   * Run inside the caller's transaction instead of opening one (tests use this to set transaction-local settings such
   * as `app.four_eyes`). A root client is ignored and a new transaction is opened.
   */
  client?: DbClient;
  /** Request metadata for the audit entry (request id, hashed IP, user agent). */
  request?: AuditRequestInfo | null;
}

function isTransactionClient(client: DbClient | undefined): client is Tx {
  // Interactive-transaction clients also expose `$transaction`, so compare with the root singleton instead.
  return client !== undefined && client !== db;
}

/** Runs `fn` in the caller's transaction (when one is passed) or a new one. */
export async function inTransaction<T>(context: ServiceContext, fn: (tx: Tx) => Promise<T>): Promise<T> {
  if (isTransactionClient(context.client)) return fn(context.client);
  return db.$transaction(fn, { timeout: 30_000, maxWait: 10_000 });
}

/** Read client: the caller's transaction or the root client. */
export function readClient(context: ServiceContext = {}): DbClient {
  return context.client ?? db;
}

/**
 * Runs independent reads concurrently on the pool, or one after another inside a caller's transaction (a transaction
 * is one connection; concurrent queries on it are deprecated by `pg`).
 */
export async function readAll<T extends unknown[]>(context: ServiceContext, tasks: [...{ [K in keyof T]: () => Promise<T[K]> }]): Promise<T> {
  if (isTransactionClient(context.client)) {
    const results: unknown[] = [];
    for (const task of tasks) results.push(await (task as () => Promise<unknown>)());
    return results as T;
  }
  return (await Promise.all(tasks.map((task) => (task as () => Promise<unknown>)()))) as T;
}

// ---------------------------------------------------------------------------------------------------------------------
// Audit (ARCHITECTURE §5.10)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Curriculum audit events (keys of the shared registry, `AUDIT_ACTIONS` in src/server/lib/audit.ts). Every entry also
 * records the precise event in `metadata.operation` (e.g. "curriculum.board.update").
 */
export const CURRICULUM_AUDIT = {
  /** Catalogue / draft structure / exam session / grade scheme changes. */
  UPDATE: AUDIT_ACTIONS.CURRICULUM_UPDATE,
  /** Exam session cancel/archive, grade scheme retirement. */
  RETIRE: AUDIT_ACTIONS.CURRICULUM_RETIRE,
  /** Exam session published (students can target it). */
  EXAM_SESSION_PUBLISH: AUDIT_ACTIONS.EXAM_SESSION_PUBLISH,
  /** New grade scheme version (results already graded keep the previous one). */
  GRADE_SCHEME_VERSION: AUDIT_ACTIONS.GRADE_SCHEME_VERSION,
  /** Syllabus version publish and "make current". */
  SYLLABUS_PUBLISH: AUDIT_ACTIONS.SYLLABUS_PUBLISH,
  /** Syllabus version archive and draft deletion. */
  SYLLABUS_ARCHIVE: AUDIT_ACTIONS.SYLLABUS_ARCHIVE,
  /** Pasted outline (bulk topic entry). */
  IMPORT: AUDIT_ACTIONS.IMPORT_COMMIT,
} as const satisfies Record<string, AuditAction>;

export interface CurriculumAuditEntry {
  action: AuditAction;
  /** Precise event, e.g. "curriculum.topic.create". */
  operation: string;
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  metadata?: Record<string, unknown>;
}

/** Writes the audit entry in the same transaction as the change (both commit or neither does). */
export async function auditCurriculum(tx: Tx, actor: CurriculumActor, context: ServiceContext, entry: CurriculumAuditEntry): Promise<void> {
  await auditInTx(tx, {
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    before: entry.before,
    after: entry.after,
    metadata: { operation: entry.operation, ...entry.metadata },
    request: context.request ?? null,
  });
}

/** `value` without `keys` (form-only flags such as `confirmSlugChange` never reach Prisma). */
export function omit<T extends object, K extends keyof T>(value: T, ...keys: K[]): Omit<T, K> {
  const copy = { ...value };
  for (const key of keys) delete copy[key];
  return copy;
}

/** Changed keys between two flat snapshots (for compact audit diffs). Keys only present in `before` are ignored. */
export function diffFields<T extends Record<string, unknown>>(before: T, after: Partial<T>): { before: Partial<T>; after: Partial<T> } {
  const b: Partial<T> = {};
  const a: Partial<T> = {};
  for (const key of Object.keys(after) as (keyof T)[]) {
    const left = before[key] instanceof Date ? (before[key] as Date).toISOString() : before[key];
    const rightRaw = after[key];
    const right = rightRaw instanceof Date ? rightRaw.toISOString() : rightRaw;
    if (JSON.stringify(left ?? null) !== JSON.stringify(right ?? null)) {
      b[key] = before[key];
      a[key] = after[key];
    }
  }
  return { before: b, after: a };
}

// ---------------------------------------------------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------------------------------------------------

/** Validates service input: AppError VALIDATION with field errors (never a raw ZodError) on failure. */
export function parseInput<S extends z.ZodType>(schema: S, raw: unknown): z.output<S> {
  const result = schema.safeParse(raw);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/** Throws VALIDATION when `problems` has entries. */
export function throwIfProblems(problems: Problems, message?: string): void {
  if (Object.keys(problems).length > 0) throw AppError.validation(problems as FieldErrors, message);
}

/** One-field VALIDATION error. */
export function fieldError(field: string, message: string): AppError {
  return AppError.validation({ [field]: [message] });
}

/** Column / index names a unique violation reports (shape differs between engines and driver adapters). */
function uniqueTarget(error: Prisma.PrismaClientKnownRequestError): string[] {
  const meta = error.meta as
    | { target?: unknown; driverAdapterError?: { cause?: { constraint?: { fields?: unknown; index?: unknown } } } }
    | undefined;
  const constraint = meta?.driverAdapterError?.cause?.constraint;
  const raw: unknown[] = [
    ...(Array.isArray(constraint?.fields) ? constraint.fields : []),
    constraint?.index,
    ...(Array.isArray(meta?.target) ? meta.target : [meta?.target]),
  ];
  return raw.filter((value): value is string => typeof value === "string").map((value) => value.replace(/"/g, ""));
}

/**
 * Maps database failures to user-facing AppErrors: unique violations to a field error (`fields` maps the violated
 * column to the form field and message), foreign-key violations to CONFLICT, and the curriculum triggers' refusals
 * (published structure, used grade bands) to CONFLICT. Anything else is rethrown untouched.
 */
export function mapDbError(error: unknown, unique: Record<string, string> = {}): never {
  if (error instanceof AppError) throw error;
  // Trigger refusals arrive as driver errors (RESTRICT → P2003 through the pg adapter); their text says why.
  const text = `${error instanceof Error ? error.message : ""} ${error instanceof Prisma.PrismaClientKnownRequestError ? JSON.stringify(error.meta ?? {}) : ""}`;
  if (/structure is immutable|cannot return to DRAFT|is immutable/i.test(text)) {
    throw AppError.conflict("This syllabus version is published, so its structure is frozen. Create a new version instead.");
  }
  if (/bands are frozen/i.test(text)) {
    throw AppError.conflict("These grade bands have been used for students' grade estimates, so they are frozen. Save again to create a new version.");
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const targets = uniqueTarget(error);
      // `unique` lists form fields in priority order: the first one the violated constraint mentions gets the error.
      for (const [field, message] of Object.entries(unique)) {
        if (targets.some((target) => target === field || target.split(/[_,\s]+/).includes(field))) throw fieldError(field, message);
      }
      const fallback = Object.entries(unique)[0];
      if (fallback && targets.length === 0) throw fieldError(fallback[0], fallback[1]);
      throw AppError.conflict("Another record already uses these values.");
    }
    if (error.code === "P2003") {
      throw AppError.conflict("Other records still refer to this item, so it cannot be changed this way.");
    }
    if (error.code === "P2025") throw AppError.notFound();
  }
  throw error;
}

// ---------------------------------------------------------------------------------------------------------------------
// Caches and search
// ---------------------------------------------------------------------------------------------------------------------

/** Drops this instance's curriculum read caches (catalogue, public URL lookups, grade schemes). */
export function invalidateCurriculumCaches(): void {
  invalidateCatalogueCache();
  invalidateCurriculumPathCache();
  invalidateGradeSchemeCache();
}

/**
 * Queues a search rebuild for curriculum changes (renames, visibility, a new CURRENT version), in the same transaction
 * as the change. `search.reindexAll` is idempotent and deduplicated while pending.
 */
export async function enqueueCurriculumReindex(tx: Tx, types: readonly ("SUBJECT" | "TOPIC" | "LESSON" | "QUESTION" | "FLASHCARD")[]): Promise<void> {
  const sorted = [...new Set(types)].sort();
  if (sorted.length === 0) return;
  await enqueue("search.reindexAll", { types: sorted }, { client: tx, queue: "search", dedupeKey: `search:reindexAll:${sorted.join(",")}` });
}

// ---------------------------------------------------------------------------------------------------------------------
// Pagination and formatting
// ---------------------------------------------------------------------------------------------------------------------

export const ADMIN_PAGE_SIZE = 25;

export interface Page<T> {
  items: T[];
  /** Opaque cursor of the next page, or null on the last page. */
  nextCursor: string | null;
}

const cursorSchema = z.object({ id: z.uuid() });

/** Opaque cursor for a row id (base64url JSON, like the REST API's cursors). */
export function encodeIdCursor(id: string): string {
  return Buffer.from(JSON.stringify({ id }), "utf8").toString("base64url");
}

/**
 * Prisma cursor arguments for an opaque cursor (`{ cursor: { id }, skip: 1 }`), or `{}` for the first page. Prisma
 * positions the cursor by the row's own ORDER BY values, so any deterministic ordering (ending in `id`) works.
 *
 * @throws AppError VALIDATION (`cursor`) for a malformed or tampered cursor.
 */
export function cursorArgs(cursor: string | null | undefined): { cursor?: { id: string }; skip?: number } {
  if (!cursor) return {};
  try {
    const parsed = cursorSchema.safeParse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as unknown);
    if (parsed.success) return { cursor: { id: parsed.data.id }, skip: 1 };
  } catch {
    // fall through
  }
  throw AppError.validation({ cursor: ["Invalid page link. Go back to the first page."] });
}

/** Splits a `take: limit + 1` result into a page. */
export function toPage<T extends { id: string }>(rows: T[], limit = ADMIN_PAGE_SIZE): Page<T> {
  const items = rows.slice(0, limit);
  const last = items[items.length - 1];
  return { items, nextCursor: rows.length > limit && last ? encodeIdCursor(last.id) : null };
}

/** Case-insensitive "contains" filter for free-text search over several columns. */
export function containsAny<K extends string>(q: string | null, fields: readonly K[]): { OR: Record<K, { contains: string; mode: "insensitive" }>[] } | Record<string, never> {
  if (!q) return {};
  return { OR: fields.map((field) => ({ [field]: { contains: q, mode: "insensitive" } }) as Record<K, { contains: string; mode: "insensitive" }>) };
}

/** Today's calendar date in Africa/Harare. */
export function today(): string {
  return localDateString(new Date());
}

/** Staff display name for "who/when" lines (never an email or phone). */
export function staffName(user: { profile: { displayName: string | null; firstName: string | null } | null } | null): string | null {
  if (!user) return null;
  return user.profile?.displayName?.trim() || user.profile?.firstName?.trim() || "Staff member";
}

export const STAFF_NAME_SELECT = { select: { profile: { select: { displayName: true, firstName: true } } } } as const;

/** True when `app.four_eyes = 'on'` for this transaction (production default; see db-safety). */
export async function fourEyesOn(client: DbClient): Promise<boolean> {
  const rows = await client.$queryRaw<{ v: string | null }[]>`SELECT current_setting('app.four_eyes', true) AS "v"`;
  return rows[0]?.v === "on";
}
