import "server-only";
import type { AnnouncementScope, Prisma, Role } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import type { SanitizedHtml } from "@/lib/content/types";
import { renderContent, trustPersistedHtml } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { CMS_AUDIT, CMS_AUDIT_OPERATIONS } from "../users/audit-actions";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "../users/cursor";
import { enqueueAnnouncementFanout } from "./fanout";
import {
  announcementIdSchema,
  announcementState,
  createAnnouncementSchema,
  listAnnouncementsSchema,
  localDateTimeToInstant,
  updateAnnouncementSchema,
  type AnnouncementState,
  type ListAnnouncementsInput,
} from "./schemas";

/**
 * Announcements from the admin console (§22, §25, §36 Notifications): GLOBAL (optionally one country), SCHOOL or CLASS
 * scope with audience roles; draft → scheduled / published → expired / archived. Permission: `class.manage` with
 * scope "all" (ADMIN, SUPER_ADMIN; announcements are part of `class.manage` in ARCHITECTURE §5.2).
 *
 * - Body: markdown rendered by the content pipeline (sanitised; raw HTML dropped) and stored as `bodyHtml` at write
 *   time. Images are refused: announcements are text (low bandwidth, no media review path).
 * - Times in forms are wall-clock in Africa/Harare (`datetime-local`).
 * - Publishing or scheduling enqueues the fan-out job in the same transaction (`./fanout`). Only drafts and scheduled
 *   announcements can be edited: delivered notifications are never rewritten. Expiring or archiving also hides the
 *   already-delivered notifications (`Notification.expiresAt`).
 * - Every mutation is audited in the same transaction.
 */

export interface AnnouncementListItem {
  id: string;
  createdAt: Date;
  scope: AnnouncementScope;
  title: string;
  state: AnnouncementState;
  audienceRoles: Role[];
  pinned: boolean;
  target: string | null;
  author: string;
  publishedAt: Date | null;
  expiresAt: Date | null;
  fannedOutAt: Date | null;
  recipients: number;
}

function personName(profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username || "Unnamed user";
}

const PROFILE_NAME = { select: { displayName: true, firstName: true, lastName: true, username: true } } as const;

function parse<T>(result: { success: true; data: T } | { success: false; error: Parameters<typeof AppError.fromZod>[0] }): T {
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function stateWhere(state: AnnouncementState, now: Date): Prisma.AnnouncementWhereInput {
  switch (state) {
    case "ARCHIVED":
      return { archivedAt: { not: null } };
    case "DRAFT":
      return { archivedAt: null, publishedAt: null };
    case "SCHEDULED":
      return { archivedAt: null, publishedAt: { gt: now } };
    case "EXPIRED":
      return { archivedAt: null, publishedAt: { not: null }, expiresAt: { lte: now } };
    case "LIVE":
      return { archivedAt: null, publishedAt: { lte: now }, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] };
  }
}

const LIST_SELECT = {
  id: true,
  createdAt: true,
  scope: true,
  title: true,
  audienceRoles: true,
  pinned: true,
  publishedAt: true,
  expiresAt: true,
  archivedAt: true,
  fannedOutAt: true,
  author: { select: { profile: PROFILE_NAME } },
  school: { select: { name: true } },
  class: { select: { name: true, school: { select: { name: true } } } },
  country: { select: { name: true } },
} as const satisfies Prisma.AnnouncementSelect;

type ListRow = Prisma.AnnouncementGetPayload<{ select: typeof LIST_SELECT }>;

function targetLabel(row: Pick<ListRow, "scope" | "school" | "class" | "country">): string | null {
  if (row.scope === "GLOBAL") return row.country ? `Everyone in ${row.country.name}` : "Everyone";
  if (row.scope === "SCHOOL") return row.school?.name ?? null;
  return row.class ? `${row.class.name}${row.class.school ? ` · ${row.class.school.name}` : ""}` : null;
}

/** Announcements of every scope, newest first, filterable by scope, state and title. */
export async function listAnnouncements(
  actor: CmsActor,
  input: ListAnnouncementsInput = {},
  options: { now?: Date } = {},
): Promise<{ items: AnnouncementListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "class.manage");
  const data = parse(listAnnouncementsSchema.safeParse(input));
  const now = options.now ?? new Date();
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.AnnouncementWhereInput[] = [];
  if (data.scope) where.push({ scope: data.scope });
  if (data.state) where.push(stateWhere(data.state, now));
  if (data.q) where.push({ title: { contains: data.q, mode: "insensitive" } });
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.AnnouncementWhereInput);
  const rows = await db.announcement.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: LIST_SELECT,
  });
  const page = pageOf(rows, limit);
  const ids = page.items.map((row) => row.id);
  // Delivered notifications per announcement, one grouped query (Notification(announcementId) index).
  const counts = ids.length === 0 ? [] : await db.notification.groupBy({ by: ["announcementId"], where: { announcementId: { in: ids } }, _count: { _all: true } });
  return {
    nextCursor: page.nextCursor,
    items: page.items.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      scope: row.scope,
      title: row.title,
      state: announcementState(row, now),
      audienceRoles: row.audienceRoles,
      pinned: row.pinned,
      target: targetLabel(row),
      author: personName(row.author.profile),
      publishedAt: row.publishedAt,
      expiresAt: row.expiresAt,
      fannedOutAt: row.fannedOutAt,
      recipients: counts.find((count) => count.announcementId === row.id)?._count._all ?? 0,
    })),
  };
}

export interface AnnouncementDetail extends AnnouncementListItem {
  body: string;
  bodyHtml: SanitizedHtml;
  notify: boolean;
  schoolId: string | null;
  schoolSlug: string | null;
  classId: string | null;
  classJoinCode: string | null;
  countryId: string | null;
  archivedAt: Date | null;
  updatedAt: Date;
  /** Delivered notifications read so far (engagement; real counts only). */
  read: number;
  editable: boolean;
}

export async function getAnnouncement(actor: CmsActor, announcementId: string, options: { now?: Date } = {}): Promise<AnnouncementDetail> {
  assertCmsPermission(actor, "class.manage");
  const { announcementId: id } = parse(announcementIdSchema.safeParse({ announcementId }));
  const now = options.now ?? new Date();
  const row = await db.announcement.findUnique({
    where: { id },
    select: {
      ...LIST_SELECT,
      body: true,
      bodyHtml: true,
      notify: true,
      schoolId: true,
      classId: true,
      countryId: true,
      updatedAt: true,
      school: { select: { name: true, slug: true } },
      class: { select: { name: true, joinCode: true, school: { select: { name: true } } } },
    },
  });
  if (!row) throw AppError.notFound("Announcement not found.");
  const [recipients, read] = await Promise.all([
    db.notification.count({ where: { announcementId: id } }),
    db.notification.count({ where: { announcementId: id, readAt: { not: null } } }),
  ]);
  const state = announcementState(row, now);
  return {
    id: row.id,
    createdAt: row.createdAt,
    scope: row.scope,
    title: row.title,
    state,
    audienceRoles: row.audienceRoles,
    pinned: row.pinned,
    target: targetLabel(row),
    author: personName(row.author.profile),
    publishedAt: row.publishedAt,
    expiresAt: row.expiresAt,
    fannedOutAt: row.fannedOutAt,
    recipients,
    read,
    body: row.body,
    bodyHtml: trustPersistedHtml(row.bodyHtml),
    notify: row.notify,
    schoolId: row.schoolId,
    schoolSlug: row.school?.slug ?? null,
    classId: row.classId,
    classJoinCode: row.class?.joinCode ?? null,
    countryId: row.countryId,
    archivedAt: row.archivedAt,
    updatedAt: row.updatedAt,
    editable: state === "DRAFT" || state === "SCHEDULED",
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function resolveScopeTarget(
  client: DbClient,
  scope: AnnouncementScope,
  refs: { schoolRef?: string | undefined; classRef?: string | undefined; countryId?: string | undefined },
): Promise<{ schoolId: string | null; classId: string | null; countryId: string | null }> {
  if (scope === "GLOBAL") {
    if (refs.countryId) {
      const country = await client.country.findUnique({ where: { id: refs.countryId }, select: { id: true } });
      if (!country) throw AppError.validation({ countryId: ["Choose a country from the list."] });
    }
    return { schoolId: null, classId: null, countryId: refs.countryId ?? null };
  }
  if (scope === "SCHOOL") {
    const ref = refs.schoolRef!.trim();
    const school = await client.school.findFirst({
      where: UUID.test(ref) ? { id: ref.toLowerCase() } : { slug: ref.toLowerCase() },
      select: { id: true, status: true },
    });
    if (!school) throw AppError.validation({ schoolRef: ["No school with this slug or id."] });
    if (school.status === "SUSPENDED" || school.status === "CLOSED") throw AppError.validation({ schoolRef: ["This school is suspended or closed."] });
    return { schoolId: school.id, classId: null, countryId: null };
  }
  const ref = refs.classRef!.trim();
  const cls = await client.class.findFirst({
    where: UUID.test(ref) ? { id: ref.toLowerCase() } : { joinCode: ref.toUpperCase() },
    select: { id: true, archivedAt: true },
  });
  if (!cls) throw AppError.validation({ classRef: ["No class with this join code or id."] });
  if (cls.archivedAt) throw AppError.validation({ classRef: ["This class is archived."] });
  return { schoolId: null, classId: cls.id, countryId: null };
}

function renderBody(body: string): string {
  if (/!\[[^\]]*\]\(/.test(body)) throw AppError.validation({ body: ["Announcements can't include images. Link to a page instead."] });
  try {
    return renderContent(body, { idPrefix: "ann-", baseHeadingLevel: 3 }).html;
  } catch {
    throw AppError.validation({ body: ["This text couldn't be formatted. Check for unusual characters."] });
  }
}

/** Resolves publication instants from the form; throws field errors for past schedules / bad windows. */
function publicationWindow(
  data: { publish: "draft" | "now" | "schedule"; publishAt?: string | undefined; expiresAt?: string | undefined },
  now: Date,
  timeZone: string,
): { publishedAt: Date | null; expiresAt: Date | null } {
  let publishedAt: Date | null = null;
  if (data.publish === "now") publishedAt = now;
  if (data.publish === "schedule") {
    publishedAt = localDateTimeToInstant(data.publishAt ?? "", timeZone);
    if (!publishedAt) throw AppError.validation({ publishAt: ["Enter a valid date and time."] });
    if (publishedAt <= now) throw AppError.validation({ publishAt: ["Choose a time in the future, or publish now."] });
  }
  let expiresAt: Date | null = null;
  if (data.expiresAt) {
    expiresAt = localDateTimeToInstant(data.expiresAt, timeZone);
    if (!expiresAt) throw AppError.validation({ expiresAt: ["Enter a valid date and time."] });
    if (expiresAt <= (publishedAt ?? now)) throw AppError.validation({ expiresAt: ["The end must be after the publication time."] });
  }
  return { publishedAt, expiresAt };
}

/** Creates an announcement as a draft, or publishes / schedules it (enqueueing the fan-out in the same transaction). */
export async function createAnnouncement(
  actor: CmsActor,
  input: unknown,
  request?: AuditRequestInfo,
  options: { now?: Date; timeZone?: string } = {},
): Promise<{ id: string; state: AnnouncementState }> {
  assertCmsPermission(actor, "class.manage");
  const data = parse(createAnnouncementSchema.safeParse(input));
  const now = options.now ?? new Date();
  const { publishedAt, expiresAt } = publicationWindow(data, now, options.timeZone ?? DEFAULT_TIMEZONE);
  const bodyHtml = renderBody(data.body);
  return db.$transaction(async (tx) => {
    const target = await resolveScopeTarget(tx, data.scope, data);
    const created = await tx.announcement.create({
      data: {
        scope: data.scope,
        ...target,
        authorId: actor.userId,
        title: data.title,
        body: data.body,
        bodyHtml,
        audienceRoles: [...new Set(data.audienceRoles)],
        pinned: data.pinned,
        notify: data.notify,
        publishedAt,
        expiresAt,
      },
      select: { id: true },
    });
    if (publishedAt) await enqueueAnnouncementFanout(tx, { id: created.id, publishedAt });
    const state = announcementState({ publishedAt, expiresAt, archivedAt: null }, now);
    // Created and published / scheduled in one step is recorded as the publication (or schedule) it is.
    const [action, operation] =
      data.publish === "now"
        ? [CMS_AUDIT.ANNOUNCEMENT_PUBLISH, CMS_AUDIT_OPERATIONS.announcementPublish]
        : data.publish === "schedule"
          ? [CMS_AUDIT.ANNOUNCEMENT_SCHEDULE, CMS_AUDIT_OPERATIONS.announcementSchedule]
          : [CMS_AUDIT.ANNOUNCEMENT_CREATE, CMS_AUDIT_OPERATIONS.announcementCreate];
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action,
      entityType: "Announcement",
      entityId: created.id,
      schoolId: target.schoolId,
      after: { scope: data.scope, title: data.title, audienceRoles: data.audienceRoles, publishedAt: publishedAt?.toISOString() ?? null, expiresAt: expiresAt?.toISOString() ?? null },
      metadata: { operation, created: true, classId: target.classId },
      request: request ?? null,
    });
    return { id: created.id, state };
  });
}

async function loadForChange(client: DbClient, id: string) {
  const row = await client.announcement.findUnique({
    where: { id },
    select: { id: true, scope: true, schoolId: true, classId: true, publishedAt: true, expiresAt: true, archivedAt: true, title: true },
  });
  if (!row) throw AppError.notFound("Announcement not found.");
  return row;
}

/** Edits a draft or scheduled announcement (and re-plans its publication). Live announcements are never rewritten. */
export async function updateAnnouncement(
  actor: CmsActor,
  input: unknown,
  request?: AuditRequestInfo,
  options: { now?: Date; timeZone?: string } = {},
): Promise<{ id: string; state: AnnouncementState }> {
  assertCmsPermission(actor, "class.manage");
  const data = parse(updateAnnouncementSchema.safeParse(input));
  const now = options.now ?? new Date();
  const { publishedAt, expiresAt } = publicationWindow(data, now, options.timeZone ?? DEFAULT_TIMEZONE);
  const bodyHtml = renderBody(data.body);
  return db.$transaction(async (tx) => {
    const current = await loadForChange(tx, data.announcementId);
    const state = announcementState(current, now);
    if (state !== "DRAFT" && state !== "SCHEDULED") {
      throw AppError.conflict("Only drafts and scheduled announcements can be edited. Expire this one and create a new announcement instead.");
    }
    const target = await resolveScopeTarget(tx, data.scope, data);
    const updated = await tx.announcement.updateMany({
      where: { id: current.id, archivedAt: null, OR: [{ publishedAt: null }, { publishedAt: { gt: now } }] },
      data: {
        scope: data.scope,
        ...target,
        title: data.title,
        body: data.body,
        bodyHtml,
        audienceRoles: [...new Set(data.audienceRoles)],
        pinned: data.pinned,
        notify: data.notify,
        publishedAt,
        expiresAt,
      },
    });
    if (updated.count === 0) throw AppError.conflict();
    // A new publication time gets its own job; a job for the old time finds the mismatch and does nothing.
    if (publishedAt) await enqueueAnnouncementFanout(tx, { id: current.id, publishedAt });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ANNOUNCEMENT_UPDATE,
      entityType: "Announcement",
      entityId: current.id,
      schoolId: target.schoolId,
      before: { title: current.title, publishedAt: current.publishedAt?.toISOString() ?? null, expiresAt: current.expiresAt?.toISOString() ?? null },
      after: { title: data.title, publishedAt: publishedAt?.toISOString() ?? null, expiresAt: expiresAt?.toISOString() ?? null },
      metadata: { operation: CMS_AUDIT_OPERATIONS.announcementUpdate, publish: data.publish },
      request: request ?? null,
    });
    return { id: current.id, state: announcementState({ publishedAt, expiresAt, archivedAt: null }, now) };
  });
}

/** Publishes a draft or scheduled announcement immediately. */
export async function publishAnnouncementNow(actor: CmsActor, input: unknown, request?: AuditRequestInfo, options: { now?: Date } = {}): Promise<void> {
  assertCmsPermission(actor, "class.manage");
  const { announcementId } = parse(announcementIdSchema.safeParse(input));
  const now = options.now ?? new Date();
  await db.$transaction(async (tx) => {
    const current = await loadForChange(tx, announcementId);
    const state = announcementState(current, now);
    if (state !== "DRAFT" && state !== "SCHEDULED") throw AppError.conflict("This announcement is already published, expired or archived.");
    if (current.expiresAt && current.expiresAt <= now) throw AppError.conflict("Its end time has already passed. Edit the end time first.");
    const updated = await tx.announcement.updateMany({
      where: { id: announcementId, archivedAt: null, OR: [{ publishedAt: null }, { publishedAt: { gt: now } }] },
      data: { publishedAt: now },
    });
    if (updated.count === 0) throw AppError.conflict();
    await enqueueAnnouncementFanout(tx, { id: announcementId, publishedAt: now });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ANNOUNCEMENT_PUBLISH,
      entityType: "Announcement",
      entityId: announcementId,
      schoolId: current.schoolId,
      before: { publishedAt: current.publishedAt?.toISOString() ?? null },
      after: { publishedAt: now.toISOString() },
      metadata: { operation: CMS_AUDIT_OPERATIONS.announcementPublish },
      request: request ?? null,
    });
  });
}

/** Turns a scheduled announcement back into a draft (its pending fan-out job will find nothing to do). */
export async function unscheduleAnnouncement(actor: CmsActor, input: unknown, request?: AuditRequestInfo, options: { now?: Date } = {}): Promise<void> {
  assertCmsPermission(actor, "class.manage");
  const { announcementId } = parse(announcementIdSchema.safeParse(input));
  const now = options.now ?? new Date();
  await db.$transaction(async (tx) => {
    const current = await loadForChange(tx, announcementId);
    if (announcementState(current, now) !== "SCHEDULED") throw AppError.conflict("Only scheduled announcements can be unscheduled.");
    const updated = await tx.announcement.updateMany({ where: { id: announcementId, publishedAt: { gt: now }, archivedAt: null }, data: { publishedAt: null } });
    if (updated.count === 0) throw AppError.conflict();
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ANNOUNCEMENT_UNSCHEDULE,
      entityType: "Announcement",
      entityId: announcementId,
      schoolId: current.schoolId,
      before: { publishedAt: current.publishedAt?.toISOString() ?? null },
      after: { publishedAt: null },
      metadata: { operation: CMS_AUDIT_OPERATIONS.announcementUnschedule },
      request: request ?? null,
    });
  });
}

/** Ends a live announcement now: it and its delivered notifications stop showing. */
export async function expireAnnouncement(actor: CmsActor, input: unknown, request?: AuditRequestInfo, options: { now?: Date } = {}): Promise<{ notificationsHidden: number }> {
  assertCmsPermission(actor, "class.manage");
  const { announcementId } = parse(announcementIdSchema.safeParse(input));
  const now = options.now ?? new Date();
  return db.$transaction(async (tx) => {
    const current = await loadForChange(tx, announcementId);
    if (announcementState(current, now) !== "LIVE") throw AppError.conflict("Only live announcements can be ended.");
    // Announcement_window_chk: the end must be strictly after publication.
    const end = new Date(Math.max(now.getTime(), current.publishedAt!.getTime() + 1));
    await tx.announcement.update({ where: { id: announcementId }, data: { expiresAt: end }, select: { id: true } });
    const hidden = await tx.notification.updateMany({
      where: { announcementId, OR: [{ expiresAt: null }, { expiresAt: { gt: end } }] },
      data: { expiresAt: end },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ANNOUNCEMENT_EXPIRE,
      entityType: "Announcement",
      entityId: announcementId,
      schoolId: current.schoolId,
      before: { expiresAt: current.expiresAt?.toISOString() ?? null },
      after: { expiresAt: end.toISOString() },
      metadata: { operation: CMS_AUDIT_OPERATIONS.announcementExpire, notificationsHidden: hidden.count },
      request: request ?? null,
    });
    return { notificationsHidden: hidden.count };
  });
}

/** Archives an announcement (terminal). Delivered notifications are hidden; a pending fan-out does nothing. */
export async function archiveAnnouncement(actor: CmsActor, input: unknown, request?: AuditRequestInfo, options: { now?: Date } = {}): Promise<{ notificationsHidden: number }> {
  assertCmsPermission(actor, "class.manage");
  const { announcementId } = parse(announcementIdSchema.safeParse(input));
  const now = options.now ?? new Date();
  return db.$transaction(async (tx) => {
    const current = await loadForChange(tx, announcementId);
    if (current.archivedAt) throw AppError.conflict("This announcement is already archived.");
    const updated = await tx.announcement.updateMany({ where: { id: announcementId, archivedAt: null }, data: { archivedAt: now } });
    if (updated.count === 0) throw AppError.conflict();
    const hidden = await tx.notification.updateMany({
      where: { announcementId, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
      data: { expiresAt: now },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ANNOUNCEMENT_ARCHIVE,
      entityType: "Announcement",
      entityId: announcementId,
      schoolId: current.schoolId,
      before: { state: announcementState(current, now) },
      after: { state: "ARCHIVED" },
      metadata: { operation: CMS_AUDIT_OPERATIONS.announcementArchive, notificationsHidden: hidden.count },
      request: request ?? null,
    });
    return { notificationsHidden: hidden.count };
  });
}

/** Countries for the GLOBAL country filter (small lookup). */
export async function listAnnouncementCountries(actor: CmsActor): Promise<{ id: string; name: string }[]> {
  assertCmsPermission(actor, "class.manage");
  return db.country.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true, name: true } });
}
