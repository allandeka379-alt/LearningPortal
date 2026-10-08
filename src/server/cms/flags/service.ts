import "server-only";
import { Prisma, type ContentEntityType, type ContentFlagReason, type ContentFlagSource, type ContentFlagStatus, type ContentStatus, type Role } from "@/generated/prisma/client";
import { hasPermission } from "@/server/auth/permissions";
import { toExcerpt } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";
import type { CmsActor } from "@/server/cms/users/access";
import {
  assertCanDraft,
  auditContent,
  CONTENT_CMS_AUDIT,
  CONTENT_CMS_OPERATIONS,
  inTransaction,
  parseInput,
  PERSON_SELECT,
  staffName,
  type ContentServiceContext,
} from "../review/context";
import { decodeKeyset, keysetOrder, keysetPage, keysetWhere } from "../review/cursor";
import { editorHref, reviewHref } from "../review/labels";
import {
  createFlagSchema,
  flagFilterSchema,
  rejectFlagSchema,
  resolveFlagSchema,
  triageFlagSchema,
  type FlaggableType,
} from "./schemas";

/**
 * Content quality flags (§42): students, teachers and editors report a problem with a lesson, question, flashcard or
 * test; editors triage (OPEN → IN_PROGRESS, assigned to themselves), then resolve (with a note, usually after
 * publishing a fixed revision through the normal workflow) or reject. Flags always point at the LIVE row (students'
 * id), so they survive publish merges. Reporters are shown by role only (ARCHITECTURE §5.3: no student PII for content
 * editors).
 */

// =====================================================================================================================
// Raising a flag (students, teachers, editors)
// =====================================================================================================================

/** The actor shape `createContentFlag` needs (an `Actor` from src/server/auth/actor satisfies it). */
export interface FlagActor {
  kind: "user";
  userId: string;
  roles: readonly Role[];
}

const STAFF_ROLES: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

/** Who raised it, for triage priority (staff > teacher > student). */
export function flagSourceFor(roles: readonly Role[]): ContentFlagSource {
  if (roles.some((role) => STAFF_ROLES.includes(role))) return "EDITOR";
  if (roles.includes("TEACHER")) return "TEACHER";
  return "STUDENT";
}

interface FlagTarget {
  /** Live (students') id the flag is stored against. */
  id: string;
  revision: number;
  status: ContentStatus;
  /** Set when a question PART was reported: stored in `context.partId`, the flag targets the root. */
  partId: string | null;
}

/** Resolves what a reporter is flagging to its live row; null when it does not exist or may not be reported. */
async function resolveTarget(client: DbClient, type: FlaggableType, id: string, isStaff: boolean): Promise<FlagTarget | null> {
  const select = { id: true, status: true, revision: true, draftOfId: true } as const;
  let row: { id: string; status: ContentStatus; revision: number; draftOfId: string | null } | null = null;
  let partId: string | null = null;
  switch (type) {
    case "LESSON":
      row = await client.lesson.findUnique({ where: { id }, select });
      break;
    case "ASSESSMENT":
      row = await client.assessment.findUnique({ where: { id }, select });
      break;
    case "FLASHCARD": {
      const card = await client.flashcard.findUnique({ where: { id }, select: { ...select, ownerUserId: true } });
      if (card?.ownerUserId) return null; // personal cards are private to their owner and have no editors
      row = card;
      break;
    }
    case "QUESTION": {
      let question = await client.question.findUnique({ where: { id }, select: { ...select, parentId: true } });
      for (let depth = 0; question?.parentId && depth < 3; depth += 1) {
        partId ??= question.id;
        question = await client.question.findUnique({ where: { id: question.parentId }, select: { ...select, parentId: true } });
      }
      row = question;
      break;
    }
  }
  if (!row) return null;
  if (row.draftOfId !== null) {
    if (!isStaff) return null;
    const live = await resolveTarget(client, type, row.draftOfId, true);
    return live && { ...live, partId: partId ?? live.partId };
  }
  if (!isStaff && row.status !== "PUBLISHED") return null;
  return { id: row.id, revision: row.revision, status: row.status, partId };
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/**
 * Raises a quality flag (§42) — the service the student / teacher "Report a problem" UI and the REST API call.
 * Requires `content.flag`; rate limited per user (`rateLimits.contentFlag`, 20 per hour). Students and teachers can report only
 * PUBLISHED content; staff can also report drafts (stored against the live row). A repeated report of the same item
 * and reason by the same person while the first is still open is merged into it (`created: false`), so nobody can
 * flood the queue. Not audited (not a privileged action); the flag row itself is the record.
 *
 * @throws AppError FORBIDDEN | VALIDATION | NOT_FOUND | RATE_LIMITED
 */
export async function createContentFlag(
  actor: FlagActor,
  raw: unknown,
  options: { client?: DbClient } = {},
): Promise<{ id: string; created: boolean; status: ContentFlagStatus }> {
  if (actor.kind !== "user" || !hasPermission(actor, "content.flag")) throw AppError.forbidden();
  const input = parseInput(createFlagSchema, raw);
  const client = options.client ?? db;
  await assertRateLimit(rateLimits.contentFlag(actor.userId), "You have sent a lot of reports recently. Please try again later.");
  const isStaff = hasPermission(actor, "content.draft", "all");
  const target = await resolveTarget(client, input.entityType, input.entityId, isStaff);
  if (!target) throw AppError.notFound("We couldn't find that item.");

  const contextJson = {
    ...(input.context ?? {}),
    ...(target.partId && !input.context?.partId ? { partId: target.partId } : {}),
  };
  const data = {
    entityType: input.entityType as ContentEntityType,
    entityId: target.id,
    revision: input.revision ?? target.revision,
    reason: input.reason as ContentFlagReason,
    source: flagSourceFor(actor.roles),
    details: input.details,
    ...(Object.keys(contextJson).length > 0 ? { context: contextJson as Prisma.InputJsonObject } : {}),
    flaggedById: actor.userId,
  };
  try {
    const created = await client.contentFlag.create({ data, select: { id: true, status: true } });
    logger.info("content.flag.created", { flagId: created.id, entityType: data.entityType, reason: data.reason, source: data.source });
    return { id: created.id, created: true, status: created.status };
  } catch (error) {
    if (!isUniqueViolation(error)) throw error;
    const existing = await client.contentFlag.findFirst({
      where: { entityType: data.entityType, entityId: data.entityId, flaggedById: actor.userId, reason: data.reason, status: { in: ["OPEN", "IN_PROGRESS"] } },
      select: { id: true, status: true, details: true },
    });
    if (!existing) throw error;
    if (input.details && !existing.details) {
      await client.contentFlag.update({ where: { id: existing.id }, data: { details: input.details } });
    }
    return { id: existing.id, created: false, status: existing.status };
  }
}

// =====================================================================================================================
// Triage queue (editors)
// =====================================================================================================================

export interface FlagTargetSummary {
  title: string;
  status: ContentStatus | null;
  /** Current revision of the live row (compare with the revision the reporter saw). */
  revision: number | null;
  exists: boolean;
  editorHref: string | null;
  reviewHref: string | null;
}

export interface FlagListItem {
  id: string;
  entityType: FlaggableType;
  entityId: string;
  revision: number | null;
  reason: ContentFlagReason;
  source: ContentFlagSource;
  details: string | null;
  status: ContentFlagStatus;
  createdAt: Date;
  assignedTo: string | null;
  assignedToMe: boolean;
  target: FlagTargetSummary;
}

function excerpt(source: string | null | undefined): string {
  if (!source) return "(empty)";
  try {
    return toExcerpt(source, 110) || "(empty)";
  } catch {
    return source.slice(0, 110);
  }
}

/** Titles, statuses and links of flagged items, one query per content type. */
async function describeTargets(refs: readonly { entityType: string; entityId: string }[]): Promise<Map<string, FlagTargetSummary>> {
  const idsOf = (type: string) => [...new Set(refs.filter((r) => r.entityType === type).map((r) => r.entityId))];
  const select = { id: true, status: true, revision: true } as const;
  const [lessons, questions, flashcards, assessments] = await Promise.all([
    db.lesson.findMany({ where: { id: { in: idsOf("LESSON") } }, select: { ...select, title: true } }),
    db.question.findMany({ where: { id: { in: idsOf("QUESTION") } }, select: { ...select, stem: true } }),
    db.flashcard.findMany({ where: { id: { in: idsOf("FLASHCARD") } }, select: { ...select, front: true } }),
    db.assessment.findMany({ where: { id: { in: idsOf("ASSESSMENT") } }, select: { ...select, title: true } }),
  ]);
  const out = new Map<string, FlagTargetSummary>();
  const put = (type: FlaggableType, row: { id: string; status: ContentStatus; revision: number }, title: string) =>
    out.set(`${type}:${row.id}`, { title, status: row.status, revision: row.revision, exists: true, editorHref: editorHref(type, row.id), reviewHref: reviewHref(type, row.id) });
  for (const row of lessons) put("LESSON", row, row.title);
  for (const row of questions) put("QUESTION", row, excerpt(row.stem));
  for (const row of flashcards) put("FLASHCARD", row, excerpt(row.front));
  for (const row of assessments) put("ASSESSMENT", row, row.title);
  return out;
}

const MISSING_TARGET: FlagTargetSummary = { title: "Item no longer exists", status: null, revision: null, exists: false, editorHref: null, reviewHref: null };

const FLAG_LIST_SELECT = {
  id: true,
  entityType: true,
  entityId: true,
  revision: true,
  reason: true,
  source: true,
  details: true,
  status: true,
  createdAt: true,
  assignedToId: true,
  assignedTo: { select: PERSON_SELECT },
} as const satisfies Prisma.ContentFlagSelect;

/**
 * The flag queue (`content.draft`): open flags (OPEN + IN_PROGRESS) oldest first by default; closed ones newest first.
 * Filters: status, reason, content type, source, assigned to me / unassigned.
 */
export async function listFlags(actor: CmsActor, raw: unknown = {}): Promise<{ items: FlagListItem[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const filter = parseInput(flagFilterSchema, raw);
  const cursor = decodeKeyset(filter.cursor);
  const direction = filter.status === "open" || filter.status === "OPEN" || filter.status === "IN_PROGRESS" ? "asc" : "desc";
  const and: Prisma.ContentFlagWhereInput[] = [{ entityType: { in: ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"] } }];
  if (filter.status === "open") and.push({ status: { in: ["OPEN", "IN_PROGRESS"] } });
  else if (filter.status !== "all") and.push({ status: filter.status });
  if (filter.reason) and.push({ reason: filter.reason });
  if (filter.entityType) and.push({ entityType: filter.entityType });
  if (filter.entityId) and.push({ entityId: filter.entityId });
  if (filter.source) and.push({ source: filter.source });
  if (filter.assigned === "me") and.push({ assignedToId: actor.userId });
  if (filter.assigned === "unassigned") and.push({ assignedToId: null });
  const page = keysetWhere("createdAt", cursor, direction) as Prisma.ContentFlagWhereInput;
  if (Object.keys(page).length > 0) and.push(page);
  const rows = await db.contentFlag.findMany({
    where: { AND: and },
    orderBy: keysetOrder("createdAt", direction) as Prisma.ContentFlagOrderByWithRelationInput[],
    take: filter.limit + 1,
    select: FLAG_LIST_SELECT,
  });
  const { items, nextCursor } = keysetPage(rows, filter.limit, (row) => row.createdAt);
  const targets = await describeTargets(items);
  return {
    items: items.map((row) => ({
      id: row.id,
      entityType: row.entityType as FlaggableType,
      entityId: row.entityId,
      revision: row.revision,
      reason: row.reason,
      source: row.source,
      details: row.details,
      status: row.status,
      createdAt: row.createdAt,
      assignedTo: staffName(row.assignedTo),
      assignedToMe: row.assignedToId === actor.userId,
      target: targets.get(`${row.entityType}:${row.entityId}`) ?? MISSING_TARGET,
    })),
    nextCursor,
  };
}

export interface FlagDetail extends FlagListItem {
  context: Record<string, unknown> | null;
  resolution: string | null;
  resolutionRevision: number | null;
  resolvedBy: string | null;
  resolvedAt: Date | null;
  updatedAt: Date;
  /** Other flags on the same item (most recent first, max 20). */
  related: { id: string; reason: ContentFlagReason; source: ContentFlagSource; status: ContentFlagStatus; createdAt: Date }[];
}

/** One flag with its item, the other reports on that item and the resolution trail. Reporter shown by role only. */
export async function getFlagDetail(actor: CmsActor, flagId: string): Promise<FlagDetail> {
  assertCanDraft(actor);
  const { flagId: id } = parseInput(triageFlagSchema, { flagId });
  const row = await db.contentFlag.findUnique({
    where: { id },
    select: { ...FLAG_LIST_SELECT, context: true, resolution: true, resolutionRevision: true, resolvedAt: true, updatedAt: true, resolvedBy: { select: PERSON_SELECT } },
  });
  if (!row || !["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"].includes(row.entityType)) throw AppError.notFound("Flag not found.");
  const [targets, related] = await Promise.all([
    describeTargets([row]),
    db.contentFlag.findMany({
      where: { entityType: row.entityType, entityId: row.entityId, id: { not: row.id } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 20,
      select: { id: true, reason: true, source: true, status: true, createdAt: true },
    }),
  ]);
  return {
    id: row.id,
    entityType: row.entityType as FlaggableType,
    entityId: row.entityId,
    revision: row.revision,
    reason: row.reason,
    source: row.source,
    details: row.details,
    status: row.status,
    createdAt: row.createdAt,
    assignedTo: staffName(row.assignedTo),
    assignedToMe: row.assignedToId === actor.userId,
    target: targets.get(`${row.entityType}:${row.entityId}`) ?? MISSING_TARGET,
    context: row.context && typeof row.context === "object" && !Array.isArray(row.context) ? (row.context as Record<string, unknown>) : null,
    resolution: row.resolution,
    resolutionRevision: row.resolutionRevision,
    resolvedBy: staffName(row.resolvedBy),
    resolvedAt: row.resolvedAt,
    updatedAt: row.updatedAt,
    related,
  };
}

/** Real count of open flags (for the sidebar badge / dashboard). */
export async function countOpenFlags(actor: CmsActor): Promise<number> {
  assertCanDraft(actor);
  return db.contentFlag.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] }, entityType: { in: ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"] } } });
}

// =====================================================================================================================
// Triage transitions (audited)
// =====================================================================================================================

async function lockFlag(client: DbClient, id: string) {
  const rows = await client.$queryRaw<{ id: string }[]>`SELECT "id" FROM "ContentFlag" WHERE "id" = ${id}::uuid FOR UPDATE`;
  if (rows.length === 0) throw AppError.notFound("Flag not found.");
  return client.contentFlag.findUniqueOrThrow({
    where: { id },
    select: { id: true, status: true, entityType: true, entityId: true, revision: true, reason: true, assignedToId: true },
  });
}

/** OPEN (or IN_PROGRESS by someone else) → IN_PROGRESS, assigned to the actor ("I'm on it"). */
export async function triageFlag(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; status: ContentFlagStatus }> {
  assertCanDraft(actor);
  const { flagId } = parseInput(triageFlagSchema, raw);
  return inTransaction(context, async (tx) => {
    const flag = await lockFlag(tx, flagId);
    if (flag.status !== "OPEN" && flag.status !== "IN_PROGRESS") throw AppError.conflict("This flag is already closed.");
    if (flag.status === "IN_PROGRESS" && flag.assignedToId === actor.userId) return { id: flag.id, status: flag.status };
    await tx.contentFlag.update({ where: { id: flag.id }, data: { status: "IN_PROGRESS", assignedToId: actor.userId } });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.FLAG_TRIAGE,
      operation: CONTENT_CMS_OPERATIONS.flagTriage,
      entityType: "ContentFlag",
      entityId: flag.id,
      before: { status: flag.status, assignedToId: flag.assignedToId },
      after: { status: "IN_PROGRESS", assignedToId: actor.userId },
      metadata: { targetType: flag.entityType, targetId: flag.entityId, reason: flag.reason },
    });
    return { id: flag.id, status: "IN_PROGRESS" as const };
  });
}

async function currentRevision(client: DbClient, type: string, id: string): Promise<{ revision: number; status: ContentStatus } | null> {
  const select = { revision: true, status: true } as const;
  switch (type) {
    case "LESSON":
      return client.lesson.findUnique({ where: { id }, select });
    case "QUESTION":
      return client.question.findUnique({ where: { id }, select });
    case "FLASHCARD":
      return client.flashcard.findUnique({ where: { id }, select });
    case "ASSESSMENT":
      return client.assessment.findUnique({ where: { id }, select });
    default:
      return null;
  }
}

/**
 * Closes a flag as RESOLVED with a resolution note. When the item has been republished since the report, the fixing
 * revision is recorded (`resolutionRevision`).
 */
export async function resolveFlag(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; status: ContentFlagStatus; resolutionRevision: number | null }> {
  assertCanDraft(actor);
  const input = parseInput(resolveFlagSchema, raw);
  return inTransaction(context, async (tx) => {
    const flag = await lockFlag(tx, input.flagId);
    if (flag.status !== "OPEN" && flag.status !== "IN_PROGRESS") throw AppError.conflict("This flag is already closed.");
    const target = await currentRevision(tx, flag.entityType, flag.entityId);
    const resolutionRevision = target && target.status === "PUBLISHED" && target.revision > (flag.revision ?? 0) ? target.revision : null;
    await tx.contentFlag.update({
      where: { id: flag.id },
      data: {
        status: "RESOLVED",
        resolution: input.resolution,
        resolutionRevision,
        resolvedById: actor.userId,
        resolvedAt: new Date(),
        assignedToId: flag.assignedToId ?? actor.userId,
      },
    });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.FLAG_RESOLVE,
      operation: CONTENT_CMS_OPERATIONS.flagResolve,
      entityType: "ContentFlag",
      entityId: flag.id,
      before: { status: flag.status },
      after: { status: "RESOLVED", resolutionRevision },
      metadata: { targetType: flag.entityType, targetId: flag.entityId, reason: flag.reason },
      reason: input.resolution,
    });
    return { id: flag.id, status: "RESOLVED" as const, resolutionRevision };
  });
}

/** Closes a flag as REJECTED (the report was not a real problem), with the reason. */
export async function rejectFlag(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; status: ContentFlagStatus }> {
  assertCanDraft(actor);
  const input = parseInput(rejectFlagSchema, raw);
  return inTransaction(context, async (tx) => {
    const flag = await lockFlag(tx, input.flagId);
    if (flag.status !== "OPEN" && flag.status !== "IN_PROGRESS") throw AppError.conflict("This flag is already closed.");
    await tx.contentFlag.update({
      where: { id: flag.id },
      data: { status: "REJECTED", resolution: input.resolution, resolvedById: actor.userId, resolvedAt: new Date(), assignedToId: flag.assignedToId ?? actor.userId },
    });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.FLAG_REJECT,
      operation: CONTENT_CMS_OPERATIONS.flagReject,
      entityType: "ContentFlag",
      entityId: flag.id,
      before: { status: flag.status },
      after: { status: "REJECTED" },
      metadata: { targetType: flag.entityType, targetId: flag.entityId, reason: flag.reason },
      reason: input.resolution,
    });
    return { id: flag.id, status: "REJECTED" as const };
  });
}
