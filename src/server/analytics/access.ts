import "server-only";
import { z } from "zod";
import { canViewStudent, isActiveSchoolAdmin, isCurrentClassTeacher } from "@/server/auth/rbac";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";

/**
 * Resource-level authorization checks for the analytics views (CLAUDE.md rule 3, ARCHITECTURE §5.3). Routes still
 * run the coarse guard (`requireUser` / `requireRole`) first; these answer "may THIS user see THIS school / class /
 * child?". They are thin adapters over the single source of truth in `src/server/auth/rbac` (no membership logic of
 * their own) for callers that only hold a user id; the analytics services themselves take an already-authorised scope.
 * The role areas (`src/server/family`, `src/server/teaching`, `src/server/schools`) call rbac directly.
 */

const uuid = z.uuid();

function assertUuid(value: string, field: string): void {
  if (!uuid.safeParse(value).success) throw AppError.validation({ [field]: ["Invalid id."] });
}

/**
 * True when `userId` holds an ACTIVE SCHOOL_ADMIN membership of `schoolId` (the only source of school authority) and
 * the school is operating (ACTIVE or PENDING_VERIFICATION). Delegates to `rbac.isActiveSchoolAdmin`.
 */
export async function isSchoolAdmin(userId: string, schoolId: string): Promise<boolean> {
  assertUuid(userId, "userId");
  assertUuid(schoolId, "schoolId");
  return isActiveSchoolAdmin(userId, schoolId);
}

/** Throws FORBIDDEN unless the actor administers the school (§23 analytics are school-admin only). */
export async function assertSchoolAdmin(actor: { userId: string }, schoolId: string): Promise<void> {
  if (!(await isSchoolAdmin(actor.userId, schoolId))) throw AppError.forbidden();
}

/**
 * True when `userId` may view a class's analytics: a current teacher of the class (`rbac.isCurrentClassTeacher`), or
 * an ACTIVE SCHOOL_ADMIN of the class's operating school (`rbac.isActiveSchoolAdmin`). Callers holding a full actor
 * should prefer `rbac.canViewClass(actor, classId)`, which also admits platform staff.
 */
export async function canViewClass(userId: string, classId: string): Promise<boolean> {
  assertUuid(userId, "userId");
  assertUuid(classId, "classId");
  if (await isCurrentClassTeacher(userId, classId)) return true;
  const cls = await db.class.findUnique({ where: { id: classId }, select: { schoolId: true } });
  return cls?.schoolId ? isActiveSchoolAdmin(userId, cls.schoolId) : false;
}

/** Throws FORBIDDEN unless the actor may view the class (§22). */
export async function assertClassAccess(actor: { userId: string }, classId: string): Promise<void> {
  if (!(await canViewClass(actor.userId, classId))) throw AppError.forbidden();
}

/** The §21 visibility flags of an ACTIVE parent link. */
export interface ParentPermissions {
  canViewProgress: boolean;
  canViewStudyActivity: boolean;
  canViewTestResults: boolean;
}

/**
 * Permission flags of the ACTIVE ParentStudentLink between a parent and a student, or null when there is none (the
 * caller must then refuse). Resolved through `rbac.canViewStudent` as a parent, so the same link rule applies
 * everywhere. AI-conversation access is intentionally not returned: the parent overview never shows AI conversations.
 */
export async function getParentLinkPermissions(parentUserId: string, studentUserId: string): Promise<ParentPermissions | null> {
  assertUuid(parentUserId, "parentUserId");
  assertUuid(studentUserId, "studentUserId");
  // Only the parent branch of canViewStudent can answer for the PARENT role (no class / school / staff authority).
  const access = await canViewStudent({ userId: parentUserId, roles: ["PARENT"] }, studentUserId, { aspect: "overview" });
  if (access?.via !== "parent") return null;
  return {
    canViewProgress: access.permissions.progress,
    canViewStudyActivity: access.permissions.activity,
    canViewTestResults: access.permissions.results,
  };
}
