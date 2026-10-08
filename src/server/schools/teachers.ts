import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { maskIdentifier } from "@/server/auth/identifiers";
import { db } from "@/server/db";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications";
import { assertSchoolAdmin, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { personName } from "./core";
import { decodeMemberCursor, encodeMemberCursor, memberSearchWhere } from "./members";
import { listMembersSchema, memberActionSchema, type ListMembersInput } from "./schemas";

/**
 * Teachers of a school (§23 "manage teachers"): list (paginated), invite (see ./invitations), deactivate and the
 * classes each one teaches. Deactivating sets the TEACHER membership REMOVED; the database trigger then ends the
 * person's current ClassTeacher rows in this school in the same transaction (unless they also hold an ACTIVE
 * SCHOOL_ADMIN membership there), so a removed teacher immediately stops seeing those classes' students.
 */

export interface SchoolTeacherItem {
  memberId: string;
  userId: string;
  name: string;
  /** Staff contact for the school admin: email in full (work contact), phone masked. */
  email: string | null;
  phoneMasked: string | null;
  status: "ACTIVE" | "REMOVED" | "INVITED" | "REQUESTED";
  joinedAt: Date | null;
  removedAt: Date | null;
  /** Also a school admin here. */
  isSchoolAdmin: boolean;
  classes: { classId: string; name: string; role: "LEAD" | "ASSISTANT" }[];
}

/** The school's teachers, newest first, keyset-paginated, searchable by name or email. */
export async function listSchoolTeachers(actor: SchoolActor, input: ListMembersInput): Promise<{ items: SchoolTeacherItem[]; nextCursor: string | null }> {
  const data = parseInput(listMembersSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const status = data.status === "REQUESTED" ? "ACTIVE" : data.status;
  const where: Prisma.SchoolMemberWhereInput[] = [{ schoolId: school.schoolId, role: "TEACHER", status }];
  if (data.q) where.push(memberSearchWhere(data.q, { schoolId: school.schoolId, identifiers: "listed" }));
  const cursor = data.cursor ? decodeMemberCursor(data.cursor) : null;
  if (cursor) where.push({ OR: [{ createdAt: { lt: cursor.createdAt } }, { createdAt: cursor.createdAt, id: { lt: cursor.id } }] });
  const rows = await db.schoolMember.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: data.limit + 1,
    select: {
      id: true,
      createdAt: true,
      userId: true,
      status: true,
      joinedAt: true,
      removedAt: true,
      user: { select: { emailNormalized: true, phoneE164: true, profile: { select: { displayName: true, firstName: true, lastName: true } } } },
    },
  });
  const page = rows.slice(0, data.limit);
  const userIds = page.map((row) => row.userId);
  const [admins, teaching] = await Promise.all([
    userIds.length
      ? db.schoolMember.findMany({ where: { schoolId: school.schoolId, role: "SCHOOL_ADMIN", status: "ACTIVE", userId: { in: userIds } }, select: { userId: true } })
      : [],
    userIds.length
      ? db.classTeacher.findMany({
          where: { userId: { in: userIds }, removedAt: null, class: { schoolId: school.schoolId, archivedAt: null } },
          select: { userId: true, role: true, class: { select: { id: true, name: true } } },
          orderBy: { class: { name: "asc" } },
        })
      : [],
  ]);
  const adminSet = new Set(admins.map((row) => row.userId));
  const last = page[page.length - 1];
  return {
    nextCursor: rows.length > data.limit && last ? encodeMemberCursor(last) : null,
    items: page.map((row) => ({
      memberId: row.id,
      userId: row.userId,
      name: personName(row.user.profile, "Unnamed teacher"),
      email: row.user.emailNormalized,
      phoneMasked: row.user.phoneE164 ? maskIdentifier(row.user.phoneE164) : null,
      status: row.status,
      joinedAt: row.joinedAt,
      removedAt: row.removedAt,
      isSchoolAdmin: adminSet.has(row.userId),
      classes: teaching.filter((t) => t.userId === row.userId).map((t) => ({ classId: t.class.id, name: t.class.name, role: t.role })),
    })),
  };
}

/** ACTIVE teachers (and teaching school admins) of the school, for "assign a teacher" pickers. */
export async function listTeacherOptions(actor: SchoolActor, schoolId: string): Promise<{ userId: string; name: string }[]> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const rows = await db.schoolMember.findMany({
    where: { schoolId: school.schoolId, role: { in: ["TEACHER", "SCHOOL_ADMIN"] }, status: "ACTIVE" },
    select: { userId: true, role: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
    take: 500,
  });
  const byUser = new Map<string, string>();
  for (const row of rows) byUser.set(row.userId, personName(row.user.profile, "Unnamed teacher"));
  return [...byUser].map(([userId, name]) => ({ userId, name })).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Deactivates a teacher's membership (REMOVED). The database ends their classes in this school (trigger). The teacher
 * is told in-app. Audited.
 */
export async function deactivateTeacher(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ classesEnded: number }> {
  const data = parseInput(memberActionSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const member = await db.schoolMember.findUnique({
    where: { schoolId_userId_role: { schoolId: school.schoolId, userId: data.userId, role: "TEACHER" } },
    select: { id: true, status: true },
  });
  if (!member) throw AppError.notFound("Teacher not found.");
  if (member.status === "REMOVED") throw AppError.conflict("This teacher has already been deactivated.");
  const now = new Date();
  return db.$transaction(async (tx) => {
    const before = await tx.classTeacher.count({ where: { userId: data.userId, removedAt: null, class: { schoolId: school.schoolId } } });
    const updated = await tx.schoolMember.updateMany({
      where: { id: member.id, status: member.status },
      data: { status: "REMOVED", removedAt: now, removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.conflict();
    const after = await tx.classTeacher.count({ where: { userId: data.userId, removedAt: null, class: { schoolId: school.schoolId } } });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.MEMBER_REMOVE,
      entityType: "SchoolMember",
      entityId: member.id,
      schoolId: school.schoolId,
      targetUserId: data.userId,
      before: { role: "TEACHER", status: member.status },
      after: { status: "REMOVED" },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.teacherRemove, classesEnded: before - after },
      reason: data.reason ?? null,
      request: meta ?? null,
    });
    await createNotification(
      data.userId,
      {
        type: "account.school_membership_ended",
        category: "ACCOUNT",
        title: `Your teaching access at ${school.name} ended`.slice(0, 200),
        body: `${school.name} ended your teacher membership. You no longer teach its classes on this platform.`.slice(0, 2_000),
        data: { entityType: "School", entityId: school.schoolId },
        dedupeKey: `school-teacher-removed:${member.id}:${now.getTime()}`,
      },
      { client: tx },
    );
    return { classesEnded: before - after };
  });
}
