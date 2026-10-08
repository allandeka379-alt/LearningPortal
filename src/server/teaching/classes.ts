import "server-only";
import { randomInt } from "node:crypto";
import { Prisma, type ClassTeacherRole, type MembershipSource } from "@/generated/prisma/client";
import { parseLoginIdentifier, maskIdentifier } from "@/server/auth/identifiers";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications";
import { assignLiveWorkToMembers } from "./assignment-progress";
import {
  assertTeacher,
  isUuid,
  listTeachingSchools,
  loadClassForTeacher,
  teachesInSchool,
  type ClassContext,
  type TeachingActor,
} from "./access";
import { generateJoinCode, rosterName } from "./core";
import { coTeacherSchema, createClassSchema, memberRefSchema, updateClassSchema, classRefSchema } from "./schemas";
import { parseWith } from "./validation";

/**
 * Classes for teachers (§22 "create classes, add students"; §23 for school admins reusing the same services):
 * create (school class or independent tutor class), settings, join code (show / rotate / switch off), archive,
 * roster with join requests, removing students and co-teachers (ClassTeacher ASSISTANT).
 *
 * Authorization: `loadClassForTeacher` (current teacher, ACTIVE school admin of the class's school, or staff; school
 * operating). Roster views show names only: no contact details, no AI conversations, nothing about other classes.
 * Membership changes are audited in the same transaction; affected students are told in-app.
 */

const DEFAULT_ROSTER_LIMIT = 500;

/** Audit keys for class changes (`metadata.operation` refines the event, e.g. "class_member.approve"). */
export const CLASS_AUDIT = {
  CREATE: AUDIT_ACTIONS.CLASS_CREATE,
  ARCHIVE: AUDIT_ACTIONS.CLASS_ARCHIVE,
  RESTORE: AUDIT_ACTIONS.CLASS_RESTORE,
  MEMBER_ADD: AUDIT_ACTIONS.CLASS_MEMBER_ADD,
  MEMBER_REMOVE: AUDIT_ACTIONS.CLASS_MEMBER_REMOVE,
  TEACHER_ADD: AUDIT_ACTIONS.CLASS_TEACHER_ADD,
  TEACHER_REMOVE: AUDIT_ACTIONS.CLASS_TEACHER_REMOVE,
} as const;

function auditActor(actor: TeachingActor) {
  return { actorUserId: actor.userId, actorRoles: actor.roles };
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** A fresh join code that no class uses yet (retries on the rare collision). */
async function uniqueJoinCode(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateJoinCode(randomInt);
    const taken = await db.class.findUnique({ where: { joinCode: code }, select: { id: true } });
    if (!taken) return code;
  }
  throw new AppError("INTERNAL", "Could not generate a join code. Please try again.");
}

// =====================================================================================================================
// Lists and options
// =====================================================================================================================

export interface TeacherClassSummary {
  id: string;
  name: string;
  schoolId: string | null;
  schoolName: string | null;
  subjectId: string | null;
  subjectName: string | null;
  academicYear: string;
  archived: boolean;
  role: ClassTeacherRole;
  joinCode: string | null;
  activeStudents: number;
  pendingRequests: number;
}

/** Classes the actor currently teaches (school classes of operating schools and tutor classes), newest first. */
export async function listTeacherClasses(actor: TeachingActor, options: { includeArchived?: boolean } = {}): Promise<TeacherClassSummary[]> {
  const rows = await db.classTeacher.findMany({
    where: {
      userId: actor.userId,
      removedAt: null,
      class: {
        ...(options.includeArchived ? {} : { archivedAt: null }),
        OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }],
      },
    },
    select: {
      role: true,
      class: {
        select: {
          id: true,
          name: true,
          schoolId: true,
          academicYear: true,
          archivedAt: true,
          joinCode: true,
          subjectId: true,
          createdAt: true,
          school: { select: { name: true } },
          subject: { select: { name: true } },
        },
      },
    },
    take: 200,
  });
  const classIds = rows.map((row) => row.class.id);
  const counts = classIds.length
    ? await db.classMember.groupBy({ by: ["classId", "status"], where: { classId: { in: classIds }, status: { in: ["ACTIVE", "PENDING"] } }, _count: { _all: true } })
    : [];
  const count = (classId: string, status: "ACTIVE" | "PENDING") => counts.find((c) => c.classId === classId && c.status === status)?._count._all ?? 0;
  return rows
    .sort((a, b) => Number(a.class.archivedAt !== null) - Number(b.class.archivedAt !== null) || b.class.createdAt.getTime() - a.class.createdAt.getTime())
    .map(({ role, class: c }) => ({
      id: c.id,
      name: c.name,
      schoolId: c.schoolId,
      schoolName: c.school?.name ?? null,
      subjectId: c.subjectId,
      subjectName: c.subject?.name ?? null,
      academicYear: c.academicYear,
      archived: c.archivedAt !== null,
      role,
      joinCode: c.joinCode,
      activeStudents: count(c.id, "ACTIVE"),
      pendingRequests: count(c.id, "PENDING"),
    }));
}

export interface SubjectOption {
  id: string;
  name: string;
  qualificationId: string;
  /** e.g. "ZIMSEC O-Level". */
  qualificationLabel: string;
}

export interface ClassCreationOptions {
  schools: { id: string; name: string; subjectIds: string[] }[];
  subjects: SubjectOption[];
  canCreateTutorClass: boolean;
}

/** Subjects open for study (AVAILABLE), labelled with their board and qualification. */
export async function listSubjectOptions(): Promise<SubjectOption[]> {
  const rows = await db.subject.findMany({
    where: { catalogueStatus: "AVAILABLE" },
    select: {
      id: true,
      name: true,
      qualificationId: true,
      qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } },
    },
    orderBy: [{ qualification: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }],
    take: 1_000,
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    qualificationId: row.qualificationId,
    qualificationLabel: `${row.qualification.examBoard.shortName} ${row.qualification.shortName}`,
  }));
}

/** Choices for the "new class" form: the schools the actor teaches at (with the subjects each offers) and subjects. */
export async function getClassCreationOptions(actor: TeachingActor): Promise<ClassCreationOptions> {
  assertTeacher(actor);
  const [schools, subjects] = await Promise.all([listTeachingSchools(actor), listSubjectOptions()]);
  const offered = schools.length
    ? await db.schoolSubject.findMany({ where: { schoolId: { in: schools.map((s) => s.id) }, isActive: true }, select: { schoolId: true, subjectId: true } })
    : [];
  return {
    schools: schools.map((school) => ({ ...school, subjectIds: offered.filter((o) => o.schoolId === school.id).map((o) => o.subjectId) })),
    subjects,
    canCreateTutorClass: true,
  };
}

// =====================================================================================================================
// Create / update / archive
// =====================================================================================================================

/**
 * Creates a class with the actor as LEAD teacher (§22). A school class needs an ACTIVE teaching membership at an
 * operating school (the database guard re-checks it) and, when the school lists the subjects it offers, one of those
 * subjects. A class without a school is an independent tutor's class.
 */
export async function createClass(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<{ id: string; joinCode: string }> {
  assertTeacher(actor);
  const data = parseWith(createClassSchema, input);
  if (data.schoolId && !(await teachesInSchool(actor.userId, data.schoolId))) throw AppError.forbidden("You don't teach at this school.");

  let qualificationId = data.qualificationId;
  if (data.subjectId) {
    const subject = await db.subject.findUnique({ where: { id: data.subjectId }, select: { qualificationId: true, catalogueStatus: true } });
    if (!subject || subject.catalogueStatus !== "AVAILABLE") throw AppError.validation({ subjectId: ["Choose a subject from the list."] });
    if (qualificationId && qualificationId !== subject.qualificationId) {
      throw AppError.validation({ qualificationId: ["This subject belongs to a different qualification."] });
    }
    qualificationId = subject.qualificationId;
    if (data.schoolId) {
      const offered = await db.schoolSubject.findMany({ where: { schoolId: data.schoolId, isActive: true }, select: { subjectId: true } });
      if (offered.length > 0 && !offered.some((o) => o.subjectId === data.subjectId)) {
        throw AppError.validation({ subjectId: ["Your school doesn't offer this subject yet. Ask your school admin to add it."] });
      }
    }
  } else if (qualificationId) {
    const qualification = await db.qualification.findUnique({ where: { id: qualificationId }, select: { id: true } });
    if (!qualification) throw AppError.validation({ qualificationId: ["Choose a qualification from the list."] });
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const joinCode = await uniqueJoinCode();
    try {
      return await db.$transaction(async (tx) => {
        const created = await tx.class.create({
          data: {
            schoolId: data.schoolId,
            name: data.name,
            description: data.description,
            subjectId: data.subjectId,
            qualificationId,
            academicYear: data.academicYear,
            joinCode,
            joinRequiresApproval: data.joinRequiresApproval,
            createdById: actor.userId,
          },
          select: { id: true },
        });
        await tx.classTeacher.create({ data: { classId: created.id, userId: actor.userId, role: "LEAD" } });
        if (data.schoolId) {
          await auditInTx(tx, {
            ...auditActor(actor),
            action: CLASS_AUDIT.CREATE,
            entityType: "Class",
            entityId: created.id,
            schoolId: data.schoolId,
            after: { name: data.name, subjectId: data.subjectId, academicYear: data.academicYear },
            metadata: { operation: "class.create" },
            request: request ?? null,
          });
        }
        return { id: created.id, joinCode };
      });
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
    }
  }
  throw new AppError("INTERNAL", "Could not create the class. Please try again.");
}

/** Renames the class, edits its description and whether code joins need approval. */
export async function updateClass(actor: TeachingActor, input: unknown): Promise<{ id: string }> {
  const data = parseWith(updateClassSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  await db.class.update({
    where: { id: cls.id },
    data: { name: data.name, description: data.description, joinRequiresApproval: data.joinRequiresApproval },
    select: { id: true },
  });
  return { id: cls.id };
}

/** A new join code (the old one stops working at once). Also switches joining by code back on. */
export async function rotateJoinCode(actor: TeachingActor, input: unknown): Promise<{ joinCode: string }> {
  const { classId } = parseWith(classRefSchema, input);
  const cls = await loadClassForTeacher(actor, classId, { write: true });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const joinCode = await uniqueJoinCode();
    try {
      await db.class.update({ where: { id: cls.id }, data: { joinCode }, select: { id: true } });
      return { joinCode };
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
    }
  }
  throw new AppError("INTERNAL", "Could not generate a join code. Please try again.");
}

/** Switches joining by code off (students can still be added or invited). */
export async function disableJoinCode(actor: TeachingActor, input: unknown): Promise<void> {
  const { classId } = parseWith(classRefSchema, input);
  const cls = await loadClassForTeacher(actor, classId, { write: true });
  await db.class.update({ where: { id: cls.id }, data: { joinCode: null }, select: { id: true } });
}

/** Archives the class (kept for history; read-only, no joining). Lead teacher, school admin or staff. */
export async function archiveClass(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const { classId } = parseWith(classRefSchema, input);
  const cls = await loadClassForTeacher(actor, classId, { write: true, leadOnly: true });
  await db.$transaction(async (tx) => {
    await tx.class.update({ where: { id: cls.id }, data: { archivedAt: new Date(), joinCode: null }, select: { id: true } });
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.ARCHIVE,
      entityType: "Class",
      entityId: cls.id,
      schoolId: cls.schoolId,
      metadata: { operation: "class.archive" },
      request: request ?? null,
    });
  });
}

/** Restores an archived class. */
export async function restoreClass(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const { classId } = parseWith(classRefSchema, input);
  const cls = await loadClassForTeacher(actor, classId, { leadOnly: true });
  if (cls.archivedAt === null) return;
  await db.$transaction(async (tx) => {
    await tx.class.update({ where: { id: cls.id }, data: { archivedAt: null }, select: { id: true } });
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.RESTORE,
      entityType: "Class",
      entityId: cls.id,
      schoolId: cls.schoolId,
      metadata: { operation: "class.restore" },
      request: request ?? null,
    });
  });
}

// =====================================================================================================================
// Roster
// =====================================================================================================================

export interface RosterStudent {
  userId: string;
  name: string;
  joinedAt: Date;
  source: MembershipSource;
}

export interface RosterTeacher {
  userId: string;
  name: string;
  role: ClassTeacherRole;
  isYou: boolean;
}

export interface RosterInvitation {
  id: string;
  /** Masked email / phone ("ta***@example.com"). */
  sentTo: string;
  channel: string;
  lastSentAt: Date | null;
  expiresAt: Date;
  sendCount: number;
}

export interface ClassRoster {
  class: ClassContext;
  students: RosterStudent[];
  requests: { userId: string; name: string; requestedAt: Date }[];
  teachers: RosterTeacher[];
  invitations: RosterInvitation[];
  /** The actor may add / remove co-teachers (lead teacher, school admin, staff). */
  canManageTeachers: boolean;
}

const NAME = { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } as const;

/** Students (ACTIVE), join requests (PENDING), teachers and open invitations of a class (§22). */
export async function getClassRoster(actor: TeachingActor, classId: string, options: { now?: Date } = {}): Promise<ClassRoster> {
  const cls = await loadClassForTeacher(actor, classId);
  const now = options.now ?? new Date();
  const [members, teachers, invitations] = await Promise.all([
    db.classMember.findMany({
      where: { classId: cls.id, status: { in: ["ACTIVE", "PENDING"] } },
      select: { userId: true, status: true, joinedAt: true, source: true, user: NAME },
      orderBy: { joinedAt: "asc" },
      take: DEFAULT_ROSTER_LIMIT,
    }),
    db.classTeacher.findMany({
      where: { classId: cls.id, removedAt: null },
      select: { userId: true, role: true, user: NAME },
      orderBy: [{ role: "asc" }, { addedAt: "asc" }],
    }),
    db.invitation.findMany({
      where: { classId: cls.id, kind: "CLASS_MEMBER", acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
      select: { id: true, target: true, channel: true, lastSentAt: true, expiresAt: true, sendCount: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);
  const students = members
    .filter((m) => m.status === "ACTIVE")
    .map((m) => ({ userId: m.userId, name: rosterName(m.user.profile), joinedAt: m.joinedAt, source: m.source }))
    .sort((a, b) => a.name.localeCompare(b.name) || a.userId.localeCompare(b.userId));
  return {
    class: cls,
    students,
    requests: members.filter((m) => m.status === "PENDING").map((m) => ({ userId: m.userId, name: rosterName(m.user.profile), requestedAt: m.joinedAt })),
    teachers: teachers.map((t) => ({ userId: t.userId, name: rosterName(t.user.profile), role: t.role, isYou: t.userId === actor.userId })),
    invitations: invitations.map((i) => ({
      id: i.id,
      sentTo: i.target ? maskIdentifier(i.target) : "—",
      channel: i.channel,
      lastSentAt: i.lastSentAt,
      expiresAt: i.expiresAt,
      sendCount: i.sendCount,
    })),
    canManageTeachers: cls.via !== "teacher" || cls.isLead,
  };
}

async function notifyStudent(userId: string, cls: { id: string; name: string }, title: string, body: string, key: string, client: Prisma.TransactionClient): Promise<void> {
  await createNotification(
    userId,
    {
      type: "class.membership",
      category: "ACCOUNT",
      title: title.slice(0, 200),
      body: body.slice(0, 2_000),
      data: { href: `/app/classes/${cls.id}`, entityType: "Class", entityId: cls.id },
      dedupeKey: key.slice(0, 128),
    },
    { client },
  );
}

/** Approves a join request: the student becomes an ACTIVE member and gets the class's live work. */
export async function approveJoinRequest(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const data = parseWith(memberRefSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = new Date();
  await db.$transaction(async (tx) => {
    const updated = await tx.classMember.updateMany({
      where: { classId: cls.id, userId: data.userId, status: "PENDING" },
      data: { status: "ACTIVE", joinedAt: now, removedAt: null, removedById: null },
    });
    if (updated.count === 0) throw AppError.notFound("This join request no longer exists.");
    await assignLiveWorkToMembers(tx, cls.id, [data.userId], now);
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.MEMBER_ADD,
      entityType: "ClassMember",
      entityId: cls.id,
      schoolId: cls.schoolId,
      targetUserId: data.userId,
      after: { status: "ACTIVE" },
      metadata: { operation: "class_member.approve", classId: cls.id },
      request: request ?? null,
    });
    await notifyStudent(data.userId, cls, `You joined ${cls.name}`, `Your request to join ${cls.name} was approved.`, `class-join:${cls.id}:${now.getTime()}`, tx);
  });
}

/** Declines a join request (the student can ask again with the code). */
export async function declineJoinRequest(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const data = parseWith(memberRefSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = new Date();
  await db.$transaction(async (tx) => {
    const updated = await tx.classMember.updateMany({
      where: { classId: cls.id, userId: data.userId, status: "PENDING" },
      data: { status: "REMOVED", removedAt: now, removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.notFound("This join request no longer exists.");
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.MEMBER_REMOVE,
      entityType: "ClassMember",
      entityId: cls.id,
      schoolId: cls.schoolId,
      targetUserId: data.userId,
      metadata: { operation: "class_member.decline", classId: cls.id },
      request: request ?? null,
    });
  });
}

/**
 * Removes a student from the class (§22). Their history stays, but the class's teachers stop seeing their data at
 * once (every teacher view requires an ACTIVE membership).
 */
export async function removeStudent(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const data = parseWith(memberRefSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = new Date();
  await db.$transaction(async (tx) => {
    const updated = await tx.classMember.updateMany({
      where: { classId: cls.id, userId: data.userId, status: { in: ["ACTIVE", "PENDING"] } },
      data: { status: "REMOVED", removedAt: now, removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.notFound("This student is not in the class.");
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.MEMBER_REMOVE,
      entityType: "ClassMember",
      entityId: cls.id,
      schoolId: cls.schoolId,
      targetUserId: data.userId,
      after: { status: "REMOVED" },
      metadata: { operation: "class_member.remove", classId: cls.id },
      request: request ?? null,
    });
  });
}

// =====================================================================================================================
// Co-teachers
// =====================================================================================================================

const CO_TEACHER_REFUSAL =
  "We couldn't add a teacher with those details. They need an active teacher account (and, for a school class, a teaching membership at this school).";

/**
 * Adds a co-teacher (ClassTeacher ASSISTANT) by email, phone or username. For a school class the person must teach
 * at that school (database guard). Lead teacher, school admin or staff only. One generic refusal message for every
 * failure, so the form cannot be used to discover accounts.
 */
export async function addCoTeacher(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<{ userId: string }> {
  const data = parseWith(coTeacherSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true, leadOnly: true });
  const identifier = parseLoginIdentifier(data.identifier);
  if (identifier === null) throw AppError.validation({ identifier: ["Enter an email address, phone number or username."] });
  const user = await db.user.findUnique({
    where: identifier.kind === "email" ? { emailNormalized: identifier.value } : identifier.kind === "phone" ? { phoneE164: identifier.value } : { loginUsername: identifier.value },
    select: { id: true, status: true, roles: true },
  });
  if (!user || user.status !== "ACTIVE" || !user.roles.includes("TEACHER") || user.id === actor.userId) {
    throw AppError.validation({ identifier: [CO_TEACHER_REFUSAL] });
  }
  if (cls.schoolId && !(await teachesInSchool(user.id, cls.schoolId))) throw AppError.validation({ identifier: [CO_TEACHER_REFUSAL] });
  const now = new Date();
  await db.$transaction(async (tx) => {
    const existing = await tx.classTeacher.findUnique({ where: { classId_userId: { classId: cls.id, userId: user.id } }, select: { removedAt: true } });
    if (existing && existing.removedAt === null) throw AppError.conflict("This teacher already teaches the class.");
    if (existing) {
      await tx.classTeacher.update({ where: { classId_userId: { classId: cls.id, userId: user.id } }, data: { removedAt: null, role: "ASSISTANT", addedAt: now } });
    } else {
      await tx.classTeacher.create({ data: { classId: cls.id, userId: user.id, role: "ASSISTANT", addedAt: now } });
    }
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.TEACHER_ADD,
      entityType: "ClassTeacher",
      entityId: cls.id,
      schoolId: cls.schoolId,
      targetUserId: user.id,
      after: { role: "ASSISTANT" },
      metadata: { operation: "class_teacher.add", classId: cls.id },
      request: request ?? null,
    });
    await createNotification(
      user.id,
      {
        type: "class.co_teacher",
        category: "ACCOUNT",
        title: `You now teach ${cls.name}`.slice(0, 200),
        body: `You were added as a co-teacher of ${cls.name}.`.slice(0, 2_000),
        data: { href: `/teacher/classes/${cls.id}`, entityType: "Class", entityId: cls.id },
        dedupeKey: `class-teacher:${cls.id}:${now.getTime()}`,
      },
      { client: tx },
    );
  });
  return { userId: user.id };
}

/**
 * Removes a co-teacher. The lead teacher (or a school admin / staff) can remove any assistant; an assistant can
 * remove themselves. The LEAD row is never removed here.
 */
export async function removeCoTeacher(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const data = parseWith(memberRefSchema, input);
  const self = data.userId === actor.userId;
  const cls = await loadClassForTeacher(actor, data.classId, { write: true, leadOnly: !self });
  await db.$transaction(async (tx) => {
    const updated = await tx.classTeacher.updateMany({
      where: { classId: cls.id, userId: data.userId, role: "ASSISTANT", removedAt: null },
      data: { removedAt: new Date() },
    });
    if (updated.count === 0) throw AppError.notFound("This co-teacher is not on the class.");
    await auditInTx(tx, {
      ...auditActor(actor),
      action: CLASS_AUDIT.TEACHER_REMOVE,
      entityType: "ClassTeacher",
      entityId: cls.id,
      schoolId: cls.schoolId,
      targetUserId: data.userId,
      metadata: { operation: "class_teacher.remove", classId: cls.id, self },
      request: request ?? null,
    });
  });
}

/** True when `classId` is a well-formed id (for routes before they call a service). */
export function isClassId(classId: string): boolean {
  return isUuid(classId);
}
