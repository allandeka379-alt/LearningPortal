import "server-only";
import type { Role } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { enqueueAnnouncementFanout } from "@/server/cms/announcements/fanout";
import { localDateTimeToInstant } from "@/server/cms/announcements/schemas";
import { renderContent, trustPersistedHtml } from "@/server/content/render";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { isOperatingSchool, loadClassForTeacher, type TeachingActor } from "./access";
import { isAnnouncementLive, rosterName } from "./core";
import { announcementRefSchema, classAnnouncementSchema } from "./schemas";
import { parseWith } from "./validation";

/**
 * Class announcements (§22 "send announcements"): a CLASS-scope Announcement to the class's students (and its
 * teachers), rendered with the content pipeline at write time (no images, raw HTML dropped) and delivered as in-app
 * notifications by the shared `announcements.fanout` job (src/server/cms/announcements/fanout.ts), enqueued in the
 * same transaction — immediately or at the scheduled time. Students also read them on the class page.
 */

/** Recipients of class announcements: the class's students and teachers (never SCHOOL_ADMIN: database CHECK). */
export const CLASS_ANNOUNCEMENT_AUDIENCE: readonly Role[] = ["STUDENT", "TEACHER"];

function renderBody(body: string): string {
  if (/!\[[^\]]*\]\(/.test(body)) throw AppError.validation({ body: ["Announcements can't include images. Link to a page instead."] });
  try {
    return renderContent(body, { idPrefix: "ann-", baseHeadingLevel: 3 }).html;
  } catch {
    throw AppError.validation({ body: ["This text couldn't be formatted. Check for unusual characters."] });
  }
}

/** Publishes (now or scheduled) an announcement to a class the actor teaches. */
export async function createClassAnnouncement(
  actor: TeachingActor,
  input: unknown,
  options: { now?: Date; timeZone?: string; request?: AuditRequestInfo | null } = {},
): Promise<{ id: string; publishedAt: Date }> {
  const data = parseWith(classAnnouncementSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = options.now ?? new Date();
  const timeZone = options.timeZone ?? DEFAULT_TIMEZONE;
  let publishedAt = now;
  if (data.publish === "schedule") {
    const at = localDateTimeToInstant(data.publishAt ?? "", timeZone);
    if (!at) throw AppError.validation({ publishAt: ["Enter a valid date and time."] });
    if (at.getTime() <= now.getTime()) throw AppError.validation({ publishAt: ["Choose a time in the future, or publish now."] });
    publishedAt = at;
  }
  let expiresAt: Date | null = null;
  if (data.expiresAt) {
    expiresAt = localDateTimeToInstant(data.expiresAt, timeZone);
    if (!expiresAt) throw AppError.validation({ expiresAt: ["Enter a valid date and time."] });
    if (expiresAt.getTime() <= publishedAt.getTime()) throw AppError.validation({ expiresAt: ["The end must be after the publication time."] });
  }
  const bodyHtml = renderBody(data.body);
  return db.$transaction(async (tx) => {
    const created = await tx.announcement.create({
      data: {
        scope: "CLASS",
        classId: cls.id,
        authorId: actor.userId,
        title: data.title,
        body: data.body,
        bodyHtml,
        audienceRoles: [...CLASS_ANNOUNCEMENT_AUDIENCE],
        pinned: data.pinned,
        notify: true,
        publishedAt,
        expiresAt,
      },
      select: { id: true },
    });
    await enqueueAnnouncementFanout(tx, { id: created.id, publishedAt });
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: data.publish === "schedule" ? AUDIT_ACTIONS.ANNOUNCEMENT_SCHEDULE : AUDIT_ACTIONS.ANNOUNCEMENT_PUBLISH,
      entityType: "Announcement",
      entityId: created.id,
      schoolId: cls.schoolId,
      after: { scope: "CLASS", title: data.title, publishedAt: publishedAt.toISOString(), expiresAt: expiresAt?.toISOString() ?? null },
      metadata: { classId: cls.id },
      request: options.request ?? null,
    });
    return { id: created.id, publishedAt };
  });
}

export interface ClassAnnouncementItem {
  id: string;
  title: string;
  bodyHtml: SanitizedHtml;
  author: string;
  isYours: boolean;
  pinned: boolean;
  publishedAt: Date | null;
  expiresAt: Date | null;
  state: "SCHEDULED" | "LIVE" | "EXPIRED";
}

/** A class's announcements for its teachers (newest first, archived ones hidden). */
export async function listClassAnnouncements(actor: TeachingActor, classId: string, options: { now?: Date } = {}): Promise<ClassAnnouncementItem[]> {
  const cls = await loadClassForTeacher(actor, classId);
  const now = options.now ?? new Date();
  const rows = await db.announcement.findMany({
    where: { classId: cls.id, scope: "CLASS", archivedAt: null },
    select: {
      id: true,
      title: true,
      bodyHtml: true,
      authorId: true,
      pinned: true,
      publishedAt: true,
      expiresAt: true,
      archivedAt: true,
      author: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
    },
    orderBy: [{ publishedAt: { sort: "desc", nulls: "first" } }, { createdAt: "desc" }],
    take: 50,
  });
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    bodyHtml: trustPersistedHtml(row.bodyHtml),
    author: rosterName(row.author.profile),
    isYours: row.authorId === actor.userId,
    pinned: row.pinned,
    publishedAt: row.publishedAt,
    expiresAt: row.expiresAt,
    state: isAnnouncementLive(row, now) ? "LIVE" : row.publishedAt && row.publishedAt.getTime() > now.getTime() ? "SCHEDULED" : "EXPIRED",
  }));
}

/**
 * Withdraws an announcement of a class the actor teaches: archived, and the notifications already delivered are
 * hidden (they expire now). Any current teacher of the class may withdraw it.
 */
export async function archiveClassAnnouncement(actor: TeachingActor, input: unknown, options: { now?: Date; request?: AuditRequestInfo | null } = {}): Promise<void> {
  const { announcementId } = parseWith(announcementRefSchema, input);
  const row = await db.announcement.findUnique({ where: { id: announcementId }, select: { id: true, classId: true, scope: true, archivedAt: true } });
  if (!row || row.scope !== "CLASS" || row.classId === null || row.archivedAt !== null) throw AppError.notFound("Announcement not found.");
  const cls = await loadClassForTeacher(actor, row.classId);
  const now = options.now ?? new Date();
  await db.$transaction(async (tx) => {
    await tx.announcement.update({ where: { id: row.id }, data: { archivedAt: now }, select: { id: true } });
    await tx.notification.updateMany({ where: { announcementId: row.id, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] }, data: { expiresAt: now } });
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.ANNOUNCEMENT_ARCHIVE,
      entityType: "Announcement",
      entityId: row.id,
      schoolId: cls.schoolId,
      metadata: { classId: cls.id },
      request: options.request ?? null,
    });
  });
}

/** Recent announcements across every class the actor teaches (/teacher/announcements). */
export async function listTeacherAnnouncements(actor: TeachingActor, options: { now?: Date; limit?: number } = {}): Promise<(ClassAnnouncementItem & { classId: string; className: string })[]> {
  const now = options.now ?? new Date();
  const rows = await db.announcement.findMany({
    where: { scope: "CLASS", archivedAt: null, class: { archivedAt: null, teachers: { some: { userId: actor.userId, removedAt: null } } } },
    select: {
      id: true,
      title: true,
      bodyHtml: true,
      authorId: true,
      pinned: true,
      publishedAt: true,
      expiresAt: true,
      archivedAt: true,
      classId: true,
      class: { select: { name: true, schoolId: true, school: { select: { status: true } } } },
      author: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: Math.min(100, Math.max(1, options.limit ?? 30)),
  });
  return rows
    .filter((row) => row.class !== null && (row.class.schoolId === null || isOperatingSchool(row.class.school?.status)))
    .map((row) => ({
      id: row.id,
      classId: row.classId as string,
      className: row.class?.name ?? "",
      title: row.title,
      bodyHtml: trustPersistedHtml(row.bodyHtml),
      author: rosterName(row.author.profile),
      isYours: row.authorId === actor.userId,
      pinned: row.pinned,
      publishedAt: row.publishedAt,
      expiresAt: row.expiresAt,
      state: isAnnouncementLive(row, now) ? "LIVE" : row.publishedAt && row.publishedAt.getTime() > now.getTime() ? "SCHEDULED" : "EXPIRED",
    }));
}
