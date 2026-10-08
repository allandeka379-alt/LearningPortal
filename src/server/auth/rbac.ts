import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { SCOPE_ASSIGNMENT_STATUSES } from "@/server/teaching/core";
import type { Actor } from "./actor";
import { hasPermission, permissionScope } from "./permissions";
import { OPERATING_SCHOOL_STATUSES } from "./session-policy";

/**
 * RBAC (§33, §39; ARCHITECTURE §5.2 matrix + §5.3 resource rules).
 *
 * Two layers, both required:
 * 1. Coarse permission (pure, ./permissions, re-exported here): "may this kind of user do this at all?"
 * 2. Resource checks (this module, database-backed): "may THIS user act on THIS class / student / school?"
 *
 * The resource checks below are the single source of truth for §5.3; services MUST use them (or the equivalent SQL
 * scoping for lists) instead of re-implementing membership logic. They never throw for "no access" (they return
 * false / null); the `assert*` variants throw `FORBIDDEN`. Malformed ids are treated as "no access".
 *
 * AI conversations are deliberately NOT covered: parents, teachers and school admins can never read them (enforced by
 * row-level security, ARCHITECTURE §4.9).
 */

export {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  PERMISSION_RESTRICTIONS,
  effectivePermissions,
  grantableRoles,
  hasAnyRole,
  hasPermission,
  permissionScope,
  type Permission,
  type PermissionScope,
  type RoleHolder,
} from "./permissions";

const uuidSchema = z.uuid();

function isUuid(value: string): boolean {
  return uuidSchema.safeParse(value).success;
}

/** Actor fields the resource checks need (a full `Actor` satisfies it). */
export type AccessSubject = Pick<Actor, "userId" | "roles">;

/** Throws FORBIDDEN unless `actor` holds `permission` (any scope). For services; routes use the guards. */
export function assertPermission(actor: AccessSubject, permission: Parameters<typeof hasPermission>[1]): void {
  if (!hasPermission(actor, permission)) throw AppError.forbidden();
}

/** True when `userId` holds an ACTIVE SCHOOL_ADMIN membership of an operating `schoolId`. */
export async function isActiveSchoolAdmin(userId: string, schoolId: string): Promise<boolean> {
  if (!isUuid(userId) || !isUuid(schoolId)) return false;
  const row = await db.schoolMember.findFirst({
    where: {
      schoolId,
      userId,
      role: "SCHOOL_ADMIN",
      status: "ACTIVE",
      school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } },
    },
    select: { id: true },
  });
  return row !== null;
}

/**
 * May `actor` manage the school (teachers, students, subjects, seats; §23)? ADMIN / SUPER_ADMIN: any existing school.
 * SCHOOL_ADMIN: only schools they administer.
 */
export async function canManageSchool(actor: AccessSubject, schoolId: string): Promise<boolean> {
  if (!isUuid(schoolId)) return false;
  const scope = permissionScope(actor, "school.manage");
  if (scope === null) return false;
  if (scope === "all") return (await db.school.count({ where: { id: schoolId } })) > 0;
  return isActiveSchoolAdmin(actor.userId, schoolId);
}

/** Throws FORBIDDEN unless {@link canManageSchool}. */
export async function assertCanManageSchool(actor: AccessSubject, schoolId: string): Promise<void> {
  if (!(await canManageSchool(actor, schoolId))) throw AppError.forbidden();
}

/** How an actor reaches a class. */
export type ClassAccessVia = "teacher" | "school_admin" | "staff";

async function classAccess(
  actor: AccessSubject,
  classId: string,
  permission: "class.manage" | "class.viewPerformance",
): Promise<ClassAccessVia | null> {
  if (!isUuid(classId)) return null;
  const scope = permissionScope(actor, permission);
  if (scope === null) return null;
  const cls = await db.class.findUnique({
    where: { id: classId },
    select: {
      teachers: { where: { userId: actor.userId, removedAt: null }, select: { id: true }, take: 1 },
      school: {
        select: {
          status: true,
          members: {
            where: { userId: actor.userId, role: "SCHOOL_ADMIN", status: "ACTIVE" },
            select: { id: true },
            take: 1,
          },
        },
      },
    },
  });
  if (!cls) return null;
  if (scope === "all") return "staff";
  // A current ClassTeacher row: the database guarantees a school class's teacher holds an ACTIVE membership there.
  if (cls.teachers.length > 0) return "teacher";
  if (cls.school && cls.school.members.length > 0 && OPERATING_SCHOOL_STATUSES.includes(cls.school.status)) {
    return "school_admin";
  }
  return null;
}

/**
 * May `actor` manage the class (students, assignments, tests, announcements; §22)? A current teacher of the class,
 * an ACTIVE SCHOOL_ADMIN of the class's school, or ADMIN / SUPER_ADMIN.
 */
export async function canManageClass(actor: AccessSubject, classId: string): Promise<boolean> {
  return (await classAccess(actor, classId, "class.manage")) !== null;
}

/** May `actor` see the class's performance views (§22 drill-down)? Same people as {@link canManageClass}. */
export async function canViewClass(actor: AccessSubject, classId: string): Promise<boolean> {
  return (await classAccess(actor, classId, "class.viewPerformance")) !== null;
}

/** How `actor` reached the class, or `null` (e.g. to label "viewing as school admin"). */
export function getClassAccess(actor: AccessSubject, classId: string): Promise<ClassAccessVia | null> {
  return classAccess(actor, classId, "class.viewPerformance");
}

/** Throws FORBIDDEN unless {@link canManageClass}. */
export async function assertCanManageClass(actor: AccessSubject, classId: string): Promise<void> {
  if (!(await canManageClass(actor, classId))) throw AppError.forbidden();
}

/** Throws FORBIDDEN unless {@link canViewClass}. */
export async function assertCanViewClass(actor: AccessSubject, classId: string): Promise<void> {
  if (!(await canViewClass(actor, classId))) throw AppError.forbidden();
}

/**
 * Which part of a student's record is being read. Parents are limited by the per-link flags (§21): `progress`
 * (mastery, weak areas) → canViewProgress, `activity` (study time, streaks) → canViewStudyActivity, `results`
 * (tests, mocks) → canViewTestResults; `overview` (subjects, exam countdown) is always visible on an ACTIVE link.
 */
export type StudentDataAspect = "overview" | "progress" | "activity" | "results";

/** Why access to a student's data was granted. Services use it to scope what they return. */
export type StudentAccess =
  | { via: "self" }
  | {
      via: "parent";
      linkId: string;
      permissions: { progress: boolean; activity: boolean; results: boolean };
    }
  | {
      via: "teacher";
      /** Shared active classes. */
      classIds: string[];
      /**
       * Subjects the teacher may see, sorted: each shared class's subject; for a subject-less class (tutor group, form
       * class) the subjects of the work set to it (published, closed or archived assignments; §22). Empty when no
       * subject applies yet: then no subject data is visible.
       */
      subjectIds: string[];
    }
  | { via: "school_admin"; schoolIds: string[] }
  /** ADMIN / SUPER_ADMIN: allowed, but the service MUST write a `student.view` audit entry with a reason (§5.3). */
  | { via: "staff"; auditRequired: true };

const PARENT_ASPECT_FLAG = {
  progress: "canViewProgress",
  activity: "canViewStudyActivity",
  results: "canViewTestResults",
} as const;

/**
 * Resolves whether `actor` may read `studentUserId`'s learning data (ARCHITECTURE §5.3), in this order:
 *
 * 1. the student themself;
 * 2. a parent (PARENT role) with an ACTIVE ParentStudentLink whose flags allow `aspect`;
 * 3. a teacher with a current ClassTeacher row on a non-archived class where the student is an ACTIVE ClassMember
 *    (data limited to those classes' subjects; a subject-less class contributes the subjects of its assignments);
 * 4. an ACTIVE SCHOOL_ADMIN of an operating school where the student holds an ACTIVE STUDENT membership;
 * 5. ADMIN / SUPER_ADMIN (audit required).
 *
 * Returns `null` when none applies. Never grants access to AI conversations.
 */
export async function canViewStudent(
  actor: Pick<Actor, "userId" | "roles">,
  studentUserId: string,
  options: { aspect?: StudentDataAspect } = {},
): Promise<StudentAccess | null> {
  if (actor.userId === studentUserId) return { via: "self" };
  if (!isUuid(studentUserId) || !isUuid(actor.userId)) return null;
  const aspect = options.aspect ?? "overview";

  if (hasPermission(actor, "child.view")) {
    const link = await db.parentStudentLink.findFirst({
      where: { parentUserId: actor.userId, studentUserId, status: "ACTIVE" },
      select: { id: true, canViewProgress: true, canViewStudyActivity: true, canViewTestResults: true },
      orderBy: { activatedAt: "desc" },
    });
    if (link && (aspect === "overview" || link[PARENT_ASPECT_FLAG[aspect]])) {
      return {
        via: "parent",
        linkId: link.id,
        permissions: {
          progress: link.canViewProgress,
          activity: link.canViewStudyActivity,
          results: link.canViewTestResults,
        },
      };
    }
  }

  const performanceScope = permissionScope(actor, "class.viewPerformance");
  if (performanceScope !== null && actor.roles.includes("TEACHER")) {
    const shared = await db.classMember.findMany({
      where: {
        userId: studentUserId,
        status: "ACTIVE",
        class: { archivedAt: null, teachers: { some: { userId: actor.userId, removedAt: null } } },
      },
      select: { classId: true, class: { select: { subjectId: true } } },
      take: 100,
    });
    if (shared.length > 0) {
      const classSubjects = shared.flatMap((row) => (row.class.subjectId === null ? [] : [row.class.subjectId]));
      const subjectless = shared.filter((row) => row.class.subjectId === null).map((row) => row.classId);
      // Same rule as the teacher area's class scope (teaching/access.ts classSubjectScope): the work set to the class.
      const workSubjects = subjectless.length
        ? await db.assignment.findMany({
            where: { classId: { in: subjectless }, status: { in: [...SCOPE_ASSIGNMENT_STATUSES] } },
            distinct: ["subjectId"],
            select: { subjectId: true },
          })
        : [];
      return {
        via: "teacher",
        classIds: shared.map((row) => row.classId),
        subjectIds: [...new Set([...classSubjects, ...workSubjects.map((row) => row.subjectId)])].sort(),
      };
    }
  }

  if (actor.roles.includes("SCHOOL_ADMIN")) {
    const memberships = await db.schoolMember.findMany({
      where: {
        userId: studentUserId,
        role: "STUDENT",
        status: "ACTIVE",
        school: {
          status: { in: [...OPERATING_SCHOOL_STATUSES] },
          members: { some: { userId: actor.userId, role: "SCHOOL_ADMIN", status: "ACTIVE" } },
        },
      },
      select: { schoolId: true },
      take: 20,
    });
    if (memberships.length > 0) return { via: "school_admin", schoolIds: memberships.map((row) => row.schoolId) };
  }

  if (performanceScope === "all") {
    const student = await db.student.findUnique({ where: { userId: studentUserId }, select: { userId: true } });
    if (student) return { via: "staff", auditRequired: true };
  }
  return null;
}

/** {@link canViewStudent} or FORBIDDEN. */
export async function assertCanViewStudent(
  actor: Pick<Actor, "userId" | "roles">,
  studentUserId: string,
  options: { aspect?: StudentDataAspect } = {},
): Promise<StudentAccess> {
  const access = await canViewStudent(actor, studentUserId, options);
  if (access === null) throw AppError.forbidden();
  return access;
}

/** True when `teacherUserId` currently teaches `classId` (ClassTeacher with removedAt NULL). */
export async function isCurrentClassTeacher(teacherUserId: string, classId: string): Promise<boolean> {
  if (!isUuid(teacherUserId) || !isUuid(classId)) return false;
  const row = await db.classTeacher.findFirst({
    where: { classId, userId: teacherUserId, removedAt: null },
    select: { id: true },
  });
  return row !== null;
}
