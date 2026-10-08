import type { SchoolStatus } from "@/generated/prisma/client";
import { loadActor, type Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createSchool, createSchoolMember, createStudent, createTeacher, createUser, uniqueSlug } from "../../../tests/factories/index";

/** Helpers for the school integration tests (not used by application code). */

/** The Actor a session would build for `userId` (roles + school memberships from the database). */
export async function actorOf(userId: string): Promise<Actor> {
  const actor = await loadActor(userId);
  if (!actor) throw new Error("actor not loadable");
  return actor;
}

/**
 * A minimal actor that does NOT depend on operating-school filtering (for negative tests where the school is
 * suspended: `loadActor` would drop the membership, but a forged / stale actor must still be refused by the service).
 */
export function rawActor(userId: string, roles: Actor["roles"] = ["SCHOOL_ADMIN"]): { userId: string; roles: Actor["roles"] } {
  return { userId, roles };
}

/** The AppError code a promise rejects with (`null` when it resolves). */
export async function errorCodeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

/** A school (ACTIVE by default) with one ACTIVE school admin. */
export async function schoolWithAdmin(options: { status?: SchoolStatus; name?: string } = {}) {
  const { school } = await createSchool({ status: options.status ?? "ACTIVE", ...(options.name ? { name: options.name } : {}) });
  if (options.name === undefined) {
    // A predictable slug prefix for username assertions ("test-high-school-…" → "thsx").
    await db.school.update({ where: { id: school.id }, data: { slug: uniqueSlug("harare-high") } });
  }
  const admin = (await createUser({ firstName: "Admin", lastName: "Head" })).user;
  await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
  const fresh = await db.school.findUniqueOrThrow({ where: { id: school.id } });
  return { school: fresh, admin, adminActor: options.status === "SUSPENDED" || options.status === "CLOSED" ? null : await actorOf(admin.id) };
}

/** An ACTIVE student member of the school. */
export async function studentOf(schoolId: string, names: { firstName?: string; lastName?: string } = {}) {
  const fixture = await createStudent({ firstName: names.firstName ?? "Tariro", lastName: names.lastName ?? "Moyo" });
  const { member } = await createSchoolMember({ schoolId, userId: fixture.user.id, role: "STUDENT" });
  return { user: fixture.user, member };
}

/** An ACTIVE teacher member of the school. */
export async function teacherOf(schoolId: string, names: { firstName?: string; lastName?: string } = {}) {
  const fixture = await createTeacher({ firstName: names.firstName ?? "Chipo", lastName: names.lastName ?? "Banda" });
  const { member } = await createSchoolMember({ schoolId, userId: fixture.user.id, role: "TEACHER" });
  return { user: fixture.user, member };
}
