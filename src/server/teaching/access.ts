import "server-only";
import { z } from "zod";
import type { Role, SchoolStatus } from "@/generated/prisma/client";
import { getClassAccess, isCurrentClassTeacher, type ClassAccessVia } from "@/server/auth/rbac";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, audit, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { deriveClassSubjectScope, SCOPE_ASSIGNMENT_STATUSES, type ClassSubjectScope } from "./core";

/**
 * Resource-level authorization for the teacher area (CLAUDE.md rule 3, ARCHITECTURE §5.3). Builds on the single
 * source of truth in `src/server/auth/rbac` (current ClassTeacher row, ACTIVE SCHOOL_ADMIN of the class's school, or
 * platform staff) and adds what the teacher views need on top:
 *
 * - a school class of a SUSPENDED / CLOSED school is out of reach for its teachers and admins (sessions already drop
 *   such memberships; this closes the gap for ClassTeacher rows that outlive the school's suspension);
 * - archived classes are read-only;
 * - the class SUBJECT SCOPE: teachers see learning data only for the class subject or, for a subject-less class, the
 *   subjects of the work set to it ({@link deriveClassSubjectScope});
 * - a student's record is visible only while they are an ACTIVE member of the class;
 * - every individual-student view by a teacher, school admin or staff member is audited (`student.view`).
 */

/** The acting user (a full `Actor` satisfies it). */
export interface TeachingActor {
  userId: string;
  roles: Role[];
}

const uuid = z.uuid();
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && uuid.safeParse(value).success;
}

export function isOperatingSchool(status: SchoolStatus | null | undefined): boolean {
  return status !== null && status !== undefined && OPERATING_SCHOOL_STATUSES.includes(status);
}

export interface ClassContext {
  id: string;
  name: string;
  description: string | null;
  schoolId: string | null;
  schoolName: string | null;
  subjectId: string | null;
  subjectName: string | null;
  qualificationId: string | null;
  academicYear: string;
  joinCode: string | null;
  joinRequiresApproval: boolean;
  createdById: string;
  archivedAt: Date | null;
  /** How the actor reaches the class. */
  via: ClassAccessVia;
  /** The actor is the class's current LEAD teacher. */
  isLead: boolean;
}

const CLASS_SELECT = {
  id: true,
  name: true,
  description: true,
  schoolId: true,
  subjectId: true,
  qualificationId: true,
  academicYear: true,
  joinCode: true,
  joinRequiresApproval: true,
  createdById: true,
  archivedAt: true,
  school: { select: { name: true, status: true } },
  subject: { select: { name: true } },
} as const;

export interface LoadClassOptions {
  /** Refuse (CONFLICT) when the class is archived: the caller is about to change it. */
  write?: boolean;
  /** Only the LEAD teacher, a school admin of the class's school or staff (co-teacher management). */
  leadOnly?: boolean;
  client?: DbClient;
}

/**
 * Loads a class the actor may manage / view (§22). NOT_FOUND for an unknown id, FORBIDDEN when the actor does not
 * teach it (removed teacher, other school, other tutor) or the school is suspended / closed, CONFLICT for writes to
 * an archived class.
 */
export async function loadClassForTeacher(actor: TeachingActor, classId: string, options: LoadClassOptions = {}): Promise<ClassContext> {
  if (!isUuid(classId)) throw AppError.notFound("Class not found.");
  const client = options.client ?? db;
  const row = await client.class.findUnique({ where: { id: classId }, select: CLASS_SELECT });
  if (!row) throw AppError.notFound("Class not found.");
  const via = await getClassAccess(actor, classId);
  if (via === null) throw AppError.forbidden("You don't teach this class.");
  if (row.schoolId !== null && via !== "staff" && !isOperatingSchool(row.school?.status)) {
    throw AppError.forbidden("This school's account is suspended, so its classes are unavailable.");
  }
  if (options.write && row.archivedAt !== null) throw AppError.conflict("This class is archived. Restore it before making changes.");
  const lead = await client.classTeacher.findFirst({ where: { classId, role: "LEAD", removedAt: null }, select: { userId: true } });
  const isLead = lead?.userId === actor.userId;
  if (options.leadOnly && via === "teacher" && !isLead) throw AppError.forbidden("Only the class's lead teacher can do this.");
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    schoolId: row.schoolId,
    schoolName: row.school?.name ?? null,
    subjectId: row.subjectId,
    subjectName: row.subject?.name ?? null,
    qualificationId: row.qualificationId,
    academicYear: row.academicYear,
    joinCode: row.joinCode,
    joinRequiresApproval: row.joinRequiresApproval,
    createdById: row.createdById,
    archivedAt: row.archivedAt,
    via,
    isLead,
  };
}

/** The subjects whose data the class's teachers may see (core rule, read from the class and its assignments). */
export async function classSubjectScope(cls: { id: string; subjectId: string | null }, client: DbClient = db): Promise<ClassSubjectScope> {
  if (cls.subjectId !== null) return deriveClassSubjectScope(cls.subjectId, []);
  const rows = await client.assignment.findMany({
    where: { classId: cls.id, status: { in: [...SCOPE_ASSIGNMENT_STATUSES] } },
    distinct: ["subjectId"],
    select: { subjectId: true },
  });
  return deriveClassSubjectScope(null, rows.map((row) => row.subjectId));
}

/** NOT_FOUND unless `studentUserId` is an ACTIVE member of the class (teachers never see pending / removed students). */
export async function assertActiveMember(classId: string, studentUserId: string, client: DbClient = db): Promise<{ joinedAt: Date }> {
  if (!isUuid(studentUserId)) throw AppError.notFound("This student is not in the class.");
  const member = await client.classMember.findUnique({
    where: { classId_userId: { classId, userId: studentUserId } },
    select: { status: true, joinedAt: true },
  });
  if (!member || member.status !== "ACTIVE") throw AppError.notFound("This student is not in the class.");
  return { joinedAt: member.joinedAt };
}

/** True when `userId` holds an ACTIVE TEACHER or SCHOOL_ADMIN membership of an operating `schoolId`. */
export async function teachesInSchool(userId: string, schoolId: string, client: DbClient = db): Promise<boolean> {
  if (!isUuid(userId) || !isUuid(schoolId)) return false;
  const row = await client.schoolMember.findFirst({
    where: { schoolId, userId, role: { in: ["TEACHER", "SCHOOL_ADMIN"] }, status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
    select: { id: true },
  });
  return row !== null;
}

/** Schools (operating) where the actor teaches or administers, for school pickers. */
export async function listTeachingSchools(actor: TeachingActor, client: DbClient = db): Promise<{ id: string; name: string }[]> {
  const rows = await client.schoolMember.findMany({
    where: {
      userId: actor.userId,
      role: { in: ["TEACHER", "SCHOOL_ADMIN"] },
      status: "ACTIVE",
      school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } },
    },
    select: { school: { select: { id: true, name: true } } },
    orderBy: { school: { name: "asc" } },
    take: 50,
  });
  const seen = new Map<string, string>();
  for (const row of rows) seen.set(row.school.id, row.school.name);
  return [...seen].map(([id, name]) => ({ id, name }));
}

/** FORBIDDEN unless the actor holds the TEACHER role (class and test creation). */
export function assertTeacher(actor: TeachingActor): void {
  if (!actor.roles.includes("TEACHER")) throw AppError.forbidden("Only teachers can do this.");
}

/** The tenant of teacher-made content (ARCHITECTURE §4.4): a school's private bank or a tutor's own. */
export interface ContentTenant {
  schoolId: string | null;
  ownerUserId: string | null;
}

/**
 * Resolves who will own new teacher content: a school the actor teaches in (all its teachers can use it) or the
 * actor as an independent tutor. FORBIDDEN otherwise.
 */
export async function resolveContentTenant(
  actor: TeachingActor,
  owner: { kind: "school"; schoolId: string } | { kind: "tutor" },
  client: DbClient = db,
): Promise<ContentTenant> {
  assertTeacher(actor);
  if (owner.kind === "tutor") return { schoolId: null, ownerUserId: actor.userId };
  if (!(await teachesInSchool(actor.userId, owner.schoolId, client))) throw AppError.forbidden("You don't teach at this school.");
  return { schoolId: owner.schoolId, ownerUserId: null };
}

/**
 * May the actor read / use content of this tenant? Platform content: yes (within entitlements). A school's private
 * content: its ACTIVE teachers and admins. A tutor's content: the tutor only.
 */
export async function canUseTenantContent(actor: TeachingActor, tenant: ContentTenant, client: DbClient = db): Promise<boolean> {
  if (tenant.schoolId === null && tenant.ownerUserId === null) return true;
  if (tenant.ownerUserId !== null) return tenant.ownerUserId === actor.userId;
  return teachesInSchool(actor.userId, tenant.schoolId as string, client);
}

/** True when the actor currently teaches `classId` (ClassTeacher, not removed). */
export function teachesClass(actor: TeachingActor, classId: string): Promise<boolean> {
  return isCurrentClassTeacher(actor.userId, classId);
}

/** How long one `student.view` audit entry covers repeated views of the same student by the same person. */
export const STUDENT_VIEW_AUDIT_WINDOW_MS = 30 * 60_000;

const VIEW_REASON: Record<ClassAccessVia, string> = {
  teacher: "Class teacher reviewing a student's performance in their class",
  school_admin: "School admin reviewing a student's performance in a school class",
  staff: "Platform staff reviewing a student's performance in a class",
};

/**
 * Writes the `student.view` audit entry (ARCHITECTURE §5.3 / §5.10) for an individual-student view through a class,
 * at most once per {@link STUDENT_VIEW_AUDIT_WINDOW_MS} per (viewer, student). Never throws: the audit helper logs a
 * failed write instead of failing the page.
 */
export async function auditClassStudentView(
  actor: TeachingActor,
  view: { classId: string; schoolId: string | null; studentUserId: string; via: ClassAccessVia; surface: string },
  options: { now?: Date; request?: AuditRequestInfo | null } = {},
): Promise<boolean> {
  const now = options.now ?? new Date();
  const recent = await db.auditLog.findFirst({
    where: {
      targetUserId: view.studentUserId,
      actorUserId: actor.userId,
      action: AUDIT_ACTIONS.STUDENT_VIEW,
      createdAt: { gte: new Date(now.getTime() - STUDENT_VIEW_AUDIT_WINDOW_MS) },
    },
    select: { id: true },
  });
  if (recent) return false;
  return audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.STUDENT_VIEW,
    entityType: "User",
    entityId: view.studentUserId,
    targetUserId: view.studentUserId,
    schoolId: view.schoolId,
    reason: VIEW_REASON[view.via],
    metadata: { surface: view.surface, classId: view.classId, via: view.via },
    request: options.request ?? null,
  });
}
