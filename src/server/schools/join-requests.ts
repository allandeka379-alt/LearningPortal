import "server-only";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { isUuid } from "./access";

/**
 * The school directory students pick from (§5 onboarding, §23 "join requests"): verified (ACTIVE) schools of the
 * student's country that accept join requests, searched by name or town. Picking one creates a
 * SchoolMember(STUDENT, REQUESTED, source REQUEST); the school's admins approve or decline it on /school/students
 * (`approveStudentRequest` / `declineStudentRequest` in ./students). Only id, name and place are ever returned:
 * nothing about the school's members.
 */

export interface DirectorySchool {
  id: string;
  name: string;
  /** Town, district or region (whichever is known first), for telling same-named schools apart. */
  place: string | null;
}

/** Shortest search the directory answers (a single letter would list half the country). */
export const SCHOOL_SEARCH_MIN_LENGTH = 2;
export const SCHOOL_SEARCH_LIMIT = 20;

const querySchema = z.string().trim().min(SCHOOL_SEARCH_MIN_LENGTH).max(100);

const DIRECTORY_SELECT = { id: true, name: true, town: true, district: true, region: true, settings: true } as const satisfies Prisma.SchoolSelect;

type DirectoryRow = Prisma.SchoolGetPayload<{ select: typeof DIRECTORY_SELECT }>;

/** `School.settings.allowStudentJoinRequests` (default: allowed). Pure. */
export function acceptsJoinRequests(settings: Prisma.JsonValue | null): boolean {
  if (settings === null || typeof settings !== "object" || Array.isArray(settings)) return true;
  return (settings as { allowStudentJoinRequests?: unknown }).allowStudentJoinRequests !== false;
}

function toDirectorySchool(row: DirectoryRow): DirectorySchool {
  return { id: row.id, name: row.name, place: row.town ?? row.district ?? row.region ?? null };
}

function directoryWhere(countryId: string): Prisma.SchoolWhereInput {
  return { countryId, status: "ACTIVE" };
}

/**
 * Schools of `countryId` whose name or town contains `query` (case-insensitive), by name, at most
 * {@link SCHOOL_SEARCH_LIMIT}. An empty list for a too-short query or an invalid country.
 */
export async function searchSchoolDirectory(input: { countryId: string; query: string; limit?: number }): Promise<DirectorySchool[]> {
  const query = querySchema.safeParse(input.query);
  if (!query.success || !isUuid(input.countryId)) return [];
  const limit = Math.min(SCHOOL_SEARCH_LIMIT, Math.max(1, input.limit ?? SCHOOL_SEARCH_LIMIT));
  const rows = await db.school.findMany({
    where: {
      ...directoryWhere(input.countryId),
      OR: [{ name: { contains: query.data, mode: "insensitive" } }, { town: { contains: query.data, mode: "insensitive" } }],
    },
    select: DIRECTORY_SELECT,
    orderBy: [{ name: "asc" }, { id: "asc" }],
    // A few spare rows so schools that switched join requests off do not shorten the list.
    take: limit + 5,
  });
  return rows.filter((row) => acceptsJoinRequests(row.settings)).slice(0, limit).map(toDirectorySchool);
}

/** One directory school of `countryId`, or null (unknown, other country, not verified, or not taking requests). */
export async function findDirectorySchool(countryId: string, schoolId: string, client: DbClient = db): Promise<DirectorySchool | null> {
  if (!isUuid(countryId) || !isUuid(schoolId)) return null;
  const row = await client.school.findFirst({ where: { id: schoolId, ...directoryWhere(countryId) }, select: DIRECTORY_SELECT });
  return row && acceptsJoinRequests(row.settings) ? toDirectorySchool(row) : null;
}

export type JoinRequestOutcome = "requested" | "existing" | "unavailable";

/**
 * Asks to join a directory school as a student: creates SchoolMember(STUDENT, REQUESTED, source REQUEST) for the
 * school admins to approve. Idempotent and never overrides an existing membership row of that school (ACTIVE, INVITED,
 * an open request, or one the school declined / ended): returns "existing". "unavailable" when the school is not in
 * the student's country directory any more. Runs on the caller's transaction client.
 */
export async function requestSchoolMembership(
  client: DbClient,
  input: { userId: string; countryId: string; schoolId: string; now?: Date },
): Promise<JoinRequestOutcome> {
  const school = await findDirectorySchool(input.countryId, input.schoolId, client);
  if (!school) return "unavailable";
  const created = await client.schoolMember.createMany({
    data: [{ schoolId: school.id, userId: input.userId, role: "STUDENT", status: "REQUESTED", source: "REQUEST", createdAt: input.now ?? new Date() }],
    skipDuplicates: true,
  });
  return created.count > 0 ? "requested" : "existing";
}
