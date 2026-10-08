import "server-only";
import type { ClassMemberStatus, GuardianConsentStatus, MembershipSource } from "@/generated/prisma/client";
import type { DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { assignLiveWorkToMembers } from "./assignment-progress";

/**
 * Student membership rules shared by joining with a code, accepting an invitation and being added by a teacher
 * (§22, ARCHITECTURE §5.12 minors).
 *
 * - Only ACTIVE student accounts can be class members.
 * - Minors whose guardian REFUSED or WITHDREW consent are not placed in an independent tutor's class (a third party
 *   outside the school relationship); school classes follow the school's own consent process (method SCHOOL).
 * - A row is reactivated rather than duplicated (`ClassMember` is unique per class and user). A student a teacher
 *   removed cannot walk back in with the join code: their code join waits for approval again.
 * - Becoming ACTIVE hands the student the class's live class-wide work (AssignmentProgress rows).
 */

export interface StudentEligibility {
  userId: string;
  isMinor: boolean;
  guardianConsentStatus: GuardianConsentStatus;
}

const BLOCKING_CONSENT: readonly GuardianConsentStatus[] = ["REFUSED", "WITHDRAWN"];

/** The ACTIVE student account behind `userId`, or FORBIDDEN. */
export async function requireStudentAccount(client: DbClient, userId: string): Promise<StudentEligibility> {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { status: true, roles: true, student: { select: { isMinor: true, guardianConsentStatus: true } } },
  });
  if (!user || user.status !== "ACTIVE" || !user.roles.includes("STUDENT") || !user.student) {
    throw AppError.forbidden("Only student accounts can join classes.");
  }
  return { userId, isMinor: user.student.isMinor, guardianConsentStatus: user.student.guardianConsentStatus };
}

/** True when a guardian-consent decision keeps this student out of a class of this kind. */
export function consentBlocksClass(student: Pick<StudentEligibility, "isMinor" | "guardianConsentStatus">, cls: { schoolId: string | null }): boolean {
  return cls.schoolId === null && student.isMinor && BLOCKING_CONSENT.includes(student.guardianConsentStatus);
}

/** FORBIDDEN when {@link consentBlocksClass}. */
export function assertConsentAllowsClass(student: StudentEligibility, cls: { schoolId: string | null }): void {
  if (consentBlocksClass(student, cls)) {
    throw AppError.forbidden("Your parent or guardian hasn't agreed to you joining classes run by independent tutors.");
  }
}

/** The student's current row in the class, with whether a teacher (not the student) removed them. */
export async function currentMembership(
  client: DbClient,
  classId: string,
  userId: string,
): Promise<{ status: ClassMemberStatus; removedByOther: boolean } | null> {
  const row = await client.classMember.findUnique({ where: { classId_userId: { classId, userId } }, select: { status: true, removedById: true } });
  if (!row) return null;
  return { status: row.status, removedByOther: row.status === "REMOVED" && row.removedById !== null && row.removedById !== userId };
}

export interface MembershipChange {
  status: ClassMemberStatus;
  /** Status before this change (null = new row). */
  previous: ClassMemberStatus | null;
  /** The student's row was REMOVED by someone else (a teacher) before. */
  removedByOther: boolean;
}

/**
 * Creates or reactivates the student's membership with `status`. An ACTIVE row is left alone (returned unchanged).
 * When the row becomes ACTIVE the class's live work is assigned in the same transaction.
 */
export async function upsertMembership(
  tx: DbClient,
  input: { classId: string; userId: string; status: Extract<ClassMemberStatus, "ACTIVE" | "PENDING">; source: MembershipSource; now: Date },
): Promise<MembershipChange> {
  const existing = await tx.classMember.findUnique({
    where: { classId_userId: { classId: input.classId, userId: input.userId } },
    select: { status: true, removedById: true },
  });
  const removedByOther = existing?.status === "REMOVED" && existing.removedById !== null && existing.removedById !== input.userId;
  if (existing?.status === "ACTIVE") return { status: "ACTIVE", previous: "ACTIVE", removedByOther: false };
  if (existing?.status === "PENDING" && input.status === "PENDING") return { status: "PENDING", previous: "PENDING", removedByOther: false };
  if (existing) {
    await tx.classMember.update({
      where: { classId_userId: { classId: input.classId, userId: input.userId } },
      data: { status: input.status, source: input.source, joinedAt: input.now, removedAt: null, removedById: null },
    });
  } else {
    await tx.classMember.create({
      data: { classId: input.classId, userId: input.userId, status: input.status, source: input.source, joinedAt: input.now },
    });
  }
  if (input.status === "ACTIVE") await assignLiveWorkToMembers(tx, input.classId, [input.userId], input.now);
  return { status: input.status, previous: existing?.status ?? null, removedByOther };
}
