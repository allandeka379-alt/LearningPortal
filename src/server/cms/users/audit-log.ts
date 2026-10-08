import "server-only";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { addDays, isLocalDate, startOfLocalDay } from "@/lib/dates";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { normalizeEmail } from "@/server/auth/identifiers";
import { db } from "@/server/db";
import { AUDIT_ACTIONS } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertCmsPermission, type CmsActor } from "./access";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf, pageSizeSchema } from "./cursor";

/**
 * Read-only audit log viewer (§39, ARCHITECTURE §5.10; route `/admin/audit`, permission `audit.view` — ADMIN and
 * SUPER_ADMIN). Filters map onto the AuditLog indexes: actor `(actorUserId, createdAt)`, target
 * `(targetUserId, createdAt)`, entity `(entityType, entityId, createdAt)`, action `(action, createdAt)`, school
 * `(schoolId, createdAt)`, and the BRIN on `createdAt` for date windows. Entries are append-only (the app role
 * cannot UPDATE / DELETE them) and their diffs were redacted when written; this module never writes.
 */

const localDate = z.string().refine(isLocalDate, { message: "Use a date like 2026-10-05." });
const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const auditLogFilterSchema = z
  .object({
    /** Acting user: id, email, or "system" for worker / webhook entries. */
    actor: optionalTrimmed(254),
    /** Person whose data was viewed / changed: id or email. */
    target: optionalTrimmed(254),
    /** Exact action key ("role.grant") or a prefix ending with "." ("auth."). */
    action: optionalTrimmed(100).refine((value) => value === undefined || /^[a-z0-9_.]+$/.test(value), {
      message: "Use an action key such as role.grant or a prefix such as auth.",
    }),
    entityType: optionalTrimmed(64).refine((value) => value === undefined || /^[A-Za-z][A-Za-z0-9_]*$/.test(value), {
      message: "Use a model name such as User or School.",
    }),
    entityId: optionalTrimmed(128),
    schoolId: z.uuid({ error: "Invalid school id." }).optional(),
    from: localDate.optional(),
    to: localDate.optional(),
    cursor: z.string().max(500).optional(),
    limit: pageSizeSchema.optional(),
  })
  .refine((value) => !value.from || !value.to || value.from <= value.to, { message: "`From` must be on or before `To`.", path: ["to"] });

export type AuditLogFilter = z.input<typeof auditLogFilterSchema>;

export interface AuditLogItem {
  id: string;
  createdAt: Date;
  action: string;
  actorKind: string;
  actorRoles: string[];
  actor: { id: string; name: string; email: string | null } | null;
  target: { id: string; name: string } | null;
  entityType: string;
  entityId: string | null;
  school: { id: string; name: string } | null;
  reason: string | null;
  before: Prisma.JsonValue;
  after: Prisma.JsonValue;
  metadata: Prisma.JsonValue;
  requestId: string | null;
  /** First 12 hex chars of the keyed IP hash (correlation only; never the IP). */
  ipHashPrefix: string | null;
  userAgent: string | null;
}

/** The registered action keys (filter suggestions). */
export const AUDIT_ACTION_KEYS: readonly string[] = Object.values(AUDIT_ACTIONS).sort();

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Resolves an id-or-email filter to a user id; `null` when no such user (the result is then empty). */
async function resolveUser(value: string): Promise<string | null> {
  if (UUID.test(value)) return value.toLowerCase();
  const email = normalizeEmail(value);
  if (!email) throw AppError.validation({ actor: ["Use a user id or an email address."] });
  const user = await db.user.findUnique({ where: { emailNormalized: email }, select: { id: true } });
  return user?.id ?? null;
}

function personName(profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username || "Unnamed user";
}

const PROFILE_NAME = { select: { displayName: true, firstName: true, lastName: true, username: true } } as const;

/** One page of audit entries, newest first, matching every given filter. */
export async function listAuditLog(
  actor: CmsActor,
  filter: AuditLogFilter = {},
  options: { timeZone?: string } = {},
): Promise<{ items: AuditLogItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "audit.view");
  const parsed = auditLogFilterSchema.safeParse(filter);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const input = parsed.data;
  const limit = input.limit ?? DEFAULT_PAGE_SIZE;
  const timeZone = options.timeZone ?? DEFAULT_TIMEZONE;

  const where: Prisma.AuditLogWhereInput[] = [];
  if (input.actor) {
    if (input.actor.toLowerCase() === "system") {
      where.push({ actorKind: "SYSTEM" });
    } else {
      const id = await resolveUser(input.actor);
      if (id === null) return { items: [], nextCursor: null };
      where.push({ actorUserId: id });
    }
  }
  if (input.target) {
    const id = await resolveUser(input.target);
    if (id === null) return { items: [], nextCursor: null };
    where.push({ targetUserId: id });
  }
  if (input.action) where.push(input.action.endsWith(".") ? { action: { startsWith: input.action } } : { action: input.action });
  if (input.entityType) where.push({ entityType: input.entityType });
  if (input.entityId) where.push({ entityId: input.entityId });
  if (input.schoolId) where.push({ schoolId: input.schoolId });
  if (input.from) where.push({ createdAt: { gte: startOfLocalDay(input.from, timeZone) } });
  if (input.to) where.push({ createdAt: { lt: startOfLocalDay(addDays(input.to, 1), timeZone) } });
  if (input.cursor) where.push(afterCursorWhere(decodeCursor(input.cursor)) as Prisma.AuditLogWhereInput);

  const rows = await db.auditLog.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: {
      id: true,
      createdAt: true,
      action: true,
      actorKind: true,
      actorRoles: true,
      actorUserId: true,
      targetUserId: true,
      entityType: true,
      entityId: true,
      schoolId: true,
      reason: true,
      before: true,
      after: true,
      metadata: true,
      requestId: true,
      ipHash: true,
      userAgent: true,
      actor: { select: { emailNormalized: true, profile: PROFILE_NAME } },
      target: { select: { profile: PROFILE_NAME } },
      school: { select: { name: true } },
    },
  });
  const page = pageOf(rows, limit);
  return {
    nextCursor: page.nextCursor,
    items: page.items.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      action: row.action,
      actorKind: row.actorKind,
      actorRoles: row.actorRoles,
      actor: row.actorUserId ? { id: row.actorUserId, name: personName(row.actor?.profile ?? null), email: row.actor?.emailNormalized ?? null } : null,
      target: row.targetUserId ? { id: row.targetUserId, name: personName(row.target?.profile ?? null) } : null,
      entityType: row.entityType,
      entityId: row.entityId,
      school: row.schoolId ? { id: row.schoolId, name: row.school?.name ?? "Unknown school" } : null,
      reason: row.reason,
      before: row.before,
      after: row.after,
      metadata: row.metadata,
      requestId: row.requestId,
      ipHashPrefix: row.ipHash ? row.ipHash.slice(0, 12) : null,
      userAgent: row.userAgent,
    })),
  };
}
