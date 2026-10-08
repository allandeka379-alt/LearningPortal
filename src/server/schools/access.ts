import "server-only";
import { z } from "zod";
import type { Role, SchoolStatus } from "@/generated/prisma/client";
import { isActiveSchoolAdmin } from "@/server/auth/rbac";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db, type DbClient } from "@/server/db";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/**
 * Resource-level authorization for the school administration area (§23; CLAUDE.md rule 3, ARCHITECTURE §5.2 / §5.3).
 *
 * School authority exists ONLY through an ACTIVE `SchoolMember(SCHOOL_ADMIN)` row of an OPERATING school (ACTIVE or
 * PENDING_VERIFICATION): a suspended or closed school's admins lose access, exactly as their session drops the
 * membership. The check delegates to the single source of truth, `isActiveSchoolAdmin` in `src/server/auth/rbac`.
 * Platform staff manage schools from `/admin` (src/server/cms/schools), never through these services.
 *
 * Every service in this module takes the acting user and an explicit `schoolId` (never trusted: re-checked here), and
 * scopes every query to that school. AI conversations are never read anywhere in the school area.
 */

/** The acting user (a full auth `Actor` satisfies it). */
export interface SchoolActor {
  userId: string;
  roles: readonly Role[];
}

/** Request metadata for audit entries (IP is hashed downstream). */
export type SchoolRequestMeta = AuditRequestInfo | null | undefined;

/** The school an admin is acting in. */
export interface SchoolContext {
  schoolId: string;
  name: string;
  slug: string;
  status: SchoolStatus;
  countryId: string;
  timezone: string;
  /** Raw School.settings JSON (Zod-validated where read). */
  settings: unknown;
}

const uuid = z.uuid();

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && uuid.safeParse(value).success;
}

export function isOperatingSchoolStatus(status: SchoolStatus | null | undefined): boolean {
  return status !== null && status !== undefined && OPERATING_SCHOOL_STATUSES.includes(status);
}

/** Schools (operating) the actor administers, alphabetical. */
export async function listAdministeredSchools(actor: SchoolActor, client: DbClient = db): Promise<{ id: string; name: string; status: SchoolStatus }[]> {
  if (!isUuid(actor.userId)) return [];
  const rows = await client.schoolMember.findMany({
    where: { userId: actor.userId, role: "SCHOOL_ADMIN", status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
    select: { school: { select: { id: true, name: true, status: true } } },
    orderBy: { school: { name: "asc" } },
    take: 50,
  });
  return rows.map((row) => row.school);
}

const SCHOOL_SELECT = { id: true, name: true, slug: true, status: true, countryId: true, timezone: true, settings: true } as const;

/**
 * The school the actor administers: `schoolId` when given (FORBIDDEN unless the actor is an ACTIVE SCHOOL_ADMIN of
 * that operating school), otherwise the first school they administer (FORBIDDEN when none).
 */
export async function resolveSchoolAdmin(actor: SchoolActor, schoolId?: string | null): Promise<SchoolContext> {
  let id = schoolId ?? null;
  if (id !== null) {
    if (!isUuid(id) || !(await isActiveSchoolAdmin(actor.userId, id))) {
      throw AppError.forbidden("You are not an administrator of this school.");
    }
  } else {
    const first = (await listAdministeredSchools(actor))[0];
    if (!first) throw AppError.forbidden("You are not an administrator of any active school.");
    id = first.id;
  }
  const school = await db.school.findUnique({ where: { id }, select: SCHOOL_SELECT });
  if (!school || !isOperatingSchoolStatus(school.status)) throw AppError.forbidden("This school's account is not active.");
  return {
    schoolId: school.id,
    name: school.name,
    slug: school.slug,
    status: school.status,
    countryId: school.countryId,
    timezone: school.timezone,
    settings: school.settings,
  };
}

/** Throws FORBIDDEN unless the actor administers `schoolId` (operating). Returns the school context. */
export function assertSchoolAdmin(actor: SchoolActor, schoolId: string): Promise<SchoolContext> {
  if (!isUuid(schoolId)) return Promise.reject(AppError.forbidden("You are not an administrator of this school."));
  return resolveSchoolAdmin(actor, schoolId);
}

/** Audit actor fields for a school admin: the effective roles always include SCHOOL_ADMIN when acting in a school. */
export function schoolAuditActor(actor: SchoolActor): { actorUserId: string; actorRoles: Role[] } {
  const roles = new Set<Role>(actor.roles);
  roles.add("SCHOOL_ADMIN");
  return { actorUserId: actor.userId, actorRoles: [...roles] };
}

/** NOT_FOUND unless `classId` is a class of `schoolId` (archived allowed unless `active`). */
export async function loadSchoolClass(
  schoolId: string,
  classId: string,
  options: { active?: boolean; client?: DbClient } = {},
): Promise<{ id: string; name: string; subjectId: string | null; archivedAt: Date | null; academicYear: string; yearGroupId: string | null }> {
  if (!isUuid(classId)) throw AppError.notFound("Class not found.");
  const cls = await (options.client ?? db).class.findFirst({
    where: { id: classId, schoolId },
    select: { id: true, name: true, subjectId: true, archivedAt: true, academicYear: true, yearGroupId: true },
  });
  if (!cls) throw AppError.notFound("Class not found.");
  if (options.active && cls.archivedAt !== null) throw AppError.conflict("This class is archived. Restore it before making changes.");
  return cls;
}

/** The ACTIVE STUDENT members of the school among `userIds` (others are silently dropped). */
export async function activeStudentIds(schoolId: string, userIds: readonly string[], client: DbClient = db): Promise<string[]> {
  const ids = [...new Set(userIds.filter(isUuid))];
  if (ids.length === 0) return [];
  const rows = await client.schoolMember.findMany({
    where: { schoolId, role: "STUDENT", status: "ACTIVE", userId: { in: ids } },
    select: { userId: true },
  });
  return rows.map((row) => row.userId);
}

/** True when `userId` holds an ACTIVE TEACHER or SCHOOL_ADMIN membership of `schoolId` (may teach its classes). */
export async function isSchoolTeacher(schoolId: string, userId: string, client: DbClient = db): Promise<boolean> {
  if (!isUuid(userId)) return false;
  const row = await client.schoolMember.findFirst({
    where: { schoolId, userId, role: { in: ["TEACHER", "SCHOOL_ADMIN"] }, status: "ACTIVE" },
    select: { id: true },
  });
  return row !== null;
}

/** Parses `input` with `schema` or throws a VALIDATION AppError with field errors. */
export function parseInput<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}
