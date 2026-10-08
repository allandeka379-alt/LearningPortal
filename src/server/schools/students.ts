import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { getChildOverview, type ChildOverview } from "@/server/analytics/parent";
import { maskIdentifier } from "@/server/auth/identifiers";
import { revokeAllSessions } from "@/server/auth/sessions";
import { LIVE_SUBSCRIPTION_STATUSES, releaseSchoolSeat } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications";
import { assertSchoolAdmin, isUuid, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { personName, type CredentialSlip } from "./core";
import { issueTemporaryPassword } from "./credentials";
import { assertSchoolLimit } from "./limits";
import { decodeMemberCursor, encodeMemberCursor, memberSearchWhere } from "./members";
import { bulkStudentsSchema, listMembersSchema, memberActionSchema, studentNumberSchema, studentRefSchema, type ListMembersInput } from "./schemas";

/**
 * Students of a school (§23 "manage students"; B2B2C §53): roster list, the individual record (AUDITED
 * `student.view`), join-request approval, deactivation, admission numbers and password resets for school-provisioned
 * username accounts (AUDITED). Contact details are never listed: a provisioned account shows its school username;
 * parent contact phones are masked. AI conversations are never read (RLS and this module).
 */

export interface SchoolStudentItem {
  memberId: string;
  userId: string;
  name: string;
  studentNumber: string | null;
  /** School-issued login username (provisioned accounts only). */
  username: string | null;
  provisioned: boolean;
  form: string | null;
  status: "ACTIVE" | "REQUESTED" | "REMOVED" | "INVITED";
  joinedAt: Date | null;
  classes: { classId: string; name: string }[];
  lastActiveAt: Date | null;
}

/** The school's students (ACTIVE by default, or join requests / removed), keyset-paginated, searchable, by class. */
export async function listSchoolStudents(actor: SchoolActor, input: ListMembersInput): Promise<{ items: SchoolStudentItem[]; nextCursor: string | null }> {
  const data = parseInput(listMembersSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const where: Prisma.SchoolMemberWhereInput[] = [{ schoolId: school.schoolId, role: "STUDENT", status: data.status }];
  if (data.q) where.push(memberSearchWhere(data.q, { schoolId: school.schoolId, identifiers: "hidden" }));
  if (data.classId) where.push({ user: { classMemberships: { some: { classId: data.classId, status: "ACTIVE", class: { schoolId: school.schoolId } } } } });
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
      studentNumber: true,
      user: {
        select: {
          loginUsername: true,
          provisionedBySchoolId: true,
          lastActiveAt: true,
          profile: { select: { displayName: true, firstName: true, lastName: true } },
          student: { select: { yearGroup: { select: { name: true } } } },
        },
      },
    },
  });
  const page = rows.slice(0, data.limit);
  const userIds = page.map((row) => row.userId);
  const memberships = userIds.length
    ? await db.classMember.findMany({
        where: { userId: { in: userIds }, status: "ACTIVE", class: { schoolId: school.schoolId, archivedAt: null } },
        select: { userId: true, class: { select: { id: true, name: true } } },
        orderBy: { class: { name: "asc" } },
      })
    : [];
  const last = page[page.length - 1];
  return {
    nextCursor: rows.length > data.limit && last ? encodeMemberCursor(last) : null,
    items: page.map((row) => {
      const provisioned = row.user.provisionedBySchoolId === school.schoolId;
      return {
        memberId: row.id,
        userId: row.userId,
        name: personName(row.user.profile, "Unnamed student"),
        studentNumber: row.studentNumber,
        username: provisioned ? row.user.loginUsername : null,
        provisioned,
        form: row.user.student?.yearGroup?.name ?? null,
        status: row.status,
        joinedAt: row.joinedAt,
        classes: memberships.filter((m) => m.userId === row.userId).map((m) => ({ classId: m.class.id, name: m.class.name })),
        lastActiveAt: row.user.lastActiveAt,
      };
    }),
  };
}

/** ACTIVE students of the school (id + name) for class / subject pickers, alphabetical, at most 1,000. */
export async function listStudentOptions(actor: SchoolActor, schoolId: string, options: { notInClassId?: string } = {}): Promise<{ userId: string; name: string; studentNumber: string | null }[]> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const rows = await db.schoolMember.findMany({
    where: {
      schoolId: school.schoolId,
      role: "STUDENT",
      status: "ACTIVE",
      ...(options.notInClassId && isUuid(options.notInClassId)
        ? { user: { classMemberships: { none: { classId: options.notInClassId, status: "ACTIVE" } } } }
        : {}),
    },
    select: { userId: true, studentNumber: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
    take: 1_000,
  });
  return rows
    .map((row) => ({ userId: row.userId, name: personName(row.user.profile, "Unnamed student"), studentNumber: row.studentNumber }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// =====================================================================================================================
// Individual record (audited)
// =====================================================================================================================

/** One `student.view` audit entry covers repeat views of the same student by the same admin for this long. */
export const STUDENT_VIEW_AUDIT_WINDOW_MS = 30 * 60_000;
const STUDENT_VIEW_REASON = "School admin reviewing a student's record";

export interface SchoolStudentDetail {
  userId: string;
  memberId: string;
  name: string;
  studentNumber: string | null;
  joinedAt: Date | null;
  account: {
    provisioned: boolean;
    username: string | null;
    /** Masked shared contact phone (e.g. a parent's), provisioned accounts. */
    contactPhoneMasked: string | null;
    hasOwnLogin: boolean;
    lastActiveAt: Date | null;
  };
  form: string | null;
  guardianConsent: { isMinor: boolean; status: string; method: string | null };
  classes: { classId: string; name: string; subjectName: string | null }[];
  hasSeat: boolean;
  /** Learning overview (subjects, countdown, progress, weak areas, study time, results). Never AI data. */
  overview: ChildOverview;
}

/**
 * A student's record for the school admin (§23, ARCHITECTURE §5.3 "individual performance of members"). Only an
 * ACTIVE student member of the admin's school; writes the `student.view` audit entry (with its reason) BEFORE the data
 * is returned, at most once per {@link STUDENT_VIEW_AUDIT_WINDOW_MS}; the view fails if the audit write fails.
 */
export async function getSchoolStudent(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<SchoolStudentDetail> {
  const data = parseInput(studentRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const now = options.now ?? new Date();
  const member = await db.schoolMember.findUnique({
    where: { schoolId_userId_role: { schoolId: school.schoolId, userId: data.userId, role: "STUDENT" } },
    select: {
      id: true,
      status: true,
      joinedAt: true,
      studentNumber: true,
      user: {
        select: {
          loginUsername: true,
          provisionedBySchoolId: true,
          contactPhoneE164: true,
          emailNormalized: true,
          phoneE164: true,
          lastActiveAt: true,
          profile: { select: { displayName: true, firstName: true, lastName: true } },
          student: { select: { isMinor: true, guardianConsentStatus: true, guardianConsentMethod: true, yearGroup: { select: { name: true } } } },
        },
      },
    },
  });
  if (!member || member.status !== "ACTIVE" || !member.user.student) throw AppError.notFound("Student not found.");

  const recent = await db.auditLog.findFirst({
    where: {
      action: SCHOOL_AUDIT.STUDENT_VIEW,
      actorUserId: actor.userId,
      targetUserId: data.userId,
      createdAt: { gte: new Date(now.getTime() - STUDENT_VIEW_AUDIT_WINDOW_MS) },
    },
    select: { id: true },
  });
  if (!recent) {
    await auditInTx(db, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.STUDENT_VIEW,
      entityType: "User",
      entityId: data.userId,
      targetUserId: data.userId,
      schoolId: school.schoolId,
      reason: STUDENT_VIEW_REASON,
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentView, via: "school_admin" },
      request: meta ?? null,
    });
  }

  const [classes, seat, overview] = await Promise.all([
    db.classMember.findMany({
      where: { userId: data.userId, status: "ACTIVE", class: { schoolId: school.schoolId, archivedAt: null } },
      select: { class: { select: { id: true, name: true, subject: { select: { name: true } } } } },
      orderBy: { class: { name: "asc" } },
    }),
    db.entitlementGrant.findFirst({
      where: {
        userId: data.userId,
        source: "SCHOOL_SEAT",
        revokedAt: null,
        subscription: { schoolId: school.schoolId, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } },
      },
      select: { id: true },
    }),
    getChildOverview(data.userId, { permissions: { canViewProgress: true, canViewStudyActivity: true, canViewTestResults: true }, now }),
  ]);
  const provisioned = member.user.provisionedBySchoolId === school.schoolId;
  return {
    userId: data.userId,
    memberId: member.id,
    name: personName(member.user.profile, "Unnamed student"),
    studentNumber: member.studentNumber,
    joinedAt: member.joinedAt,
    account: {
      provisioned,
      username: provisioned ? member.user.loginUsername : null,
      contactPhoneMasked: provisioned && member.user.contactPhoneE164 ? maskIdentifier(member.user.contactPhoneE164) : null,
      hasOwnLogin: member.user.emailNormalized !== null || member.user.phoneE164 !== null,
      lastActiveAt: member.user.lastActiveAt,
    },
    form: member.user.student.yearGroup?.name ?? null,
    guardianConsent: {
      isMinor: member.user.student.isMinor,
      status: member.user.student.guardianConsentStatus,
      method: member.user.student.guardianConsentMethod,
    },
    classes: classes.map((row) => ({ classId: row.class.id, name: row.class.name, subjectName: row.class.subject?.name ?? null })),
    hasSeat: seat !== null,
    overview,
  };
}

// =====================================================================================================================
// Membership changes
// =====================================================================================================================

/**
 * Removes a student from the school (membership REMOVED). The database removes them from the school's classes in the
 * same transaction (trigger); their seat on the school subscription is released. The account itself stays (the
 * student keeps their own learning history). Audited; the student is told in-app.
 */
export async function deactivateStudent(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ seatsReleased: number }> {
  const data = parseInput(memberActionSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const member = await db.schoolMember.findUnique({
    where: { schoolId_userId_role: { schoolId: school.schoolId, userId: data.userId, role: "STUDENT" } },
    select: { id: true, status: true },
  });
  if (!member) throw AppError.notFound("Student not found.");
  if (member.status === "REMOVED") throw AppError.conflict("This student has already been removed.");
  const now = new Date();
  await db.$transaction(async (tx) => {
    const updated = await tx.schoolMember.updateMany({
      where: { id: member.id, status: member.status },
      data: { status: "REMOVED", removedAt: now, removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.conflict();
    await tx.student.updateMany({ where: { userId: data.userId, schoolId: school.schoolId }, data: { schoolId: null } });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.MEMBER_REMOVE,
      entityType: "SchoolMember",
      entityId: member.id,
      schoolId: school.schoolId,
      targetUserId: data.userId,
      before: { role: "STUDENT", status: member.status },
      after: { status: "REMOVED" },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentRemove },
      reason: data.reason ?? null,
      request: meta ?? null,
    });
    if (member.status === "ACTIVE") {
      await createNotification(
        data.userId,
        {
          type: "account.school_membership_ended",
          category: "ACCOUNT",
          title: `You are no longer on ${school.name}'s roster`.slice(0, 200),
          body: `${school.name} removed you from its student roster. Your own progress and history stay in your account.`.slice(0, 2_000),
          data: { entityType: "School", entityId: school.schoolId },
          dedupeKey: `school-student-removed:${member.id}:${now.getTime()}`,
        },
        { client: tx },
      );
    }
  });
  const subscriptions = await db.subscription.findMany({ where: { schoolId: school.schoolId, seats: { not: null } }, select: { id: true } });
  let seatsReleased = 0;
  for (const sub of subscriptions) {
    if (await releaseSchoolSeat(sub.id, data.userId, "student removed from school roster", now)) seatsReleased += 1;
  }
  return { seatsReleased };
}

/** Approves a student's request to join the school (REQUESTED → ACTIVE). */
export async function approveStudentRequest(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(studentRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const now = new Date();
  await db.$transaction(async (tx) => {
    const member = await tx.schoolMember.findUnique({
      where: { schoolId_userId_role: { schoolId: school.schoolId, userId: data.userId, role: "STUDENT" } },
      select: { id: true, status: true },
    });
    if (!member || member.status !== "REQUESTED") throw AppError.notFound("This join request is no longer open.");
    await tx.schoolMember.update({ where: { id: member.id }, data: { status: "ACTIVE", joinedAt: now, source: "REQUEST" }, select: { id: true } });
    await tx.student.updateMany({ where: { userId: data.userId, schoolId: null }, data: { schoolId: school.schoolId } });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.MEMBER_ADD,
      entityType: "SchoolMember",
      entityId: member.id,
      schoolId: school.schoolId,
      targetUserId: data.userId,
      before: { status: "REQUESTED" },
      after: { role: "STUDENT", status: "ACTIVE" },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentApprove },
      request: meta ?? null,
    });
    await createNotification(
      data.userId,
      {
        type: "account.school_membership",
        category: "ACCOUNT",
        title: `You joined ${school.name}`.slice(0, 200),
        body: `${school.name} accepted your request. Your teachers can now add you to classes.`.slice(0, 2_000),
        data: { href: "/app", entityType: "School", entityId: school.schoolId },
        dedupeKey: `school-request-approved:${member.id}`,
      },
      { client: tx },
    );
  });
}

/** Declines a student's request to join (REQUESTED → REMOVED). */
export async function declineStudentRequest(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(studentRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  await db.$transaction(async (tx) => {
    const updated = await tx.schoolMember.updateMany({
      where: { schoolId: school.schoolId, userId: data.userId, role: "STUDENT", status: "REQUESTED" },
      data: { status: "REMOVED", removedAt: new Date(), removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.notFound("This join request is no longer open.");
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.MEMBER_REMOVE,
      entityType: "SchoolMember",
      schoolId: school.schoolId,
      targetUserId: data.userId,
      before: { status: "REQUESTED" },
      after: { status: "REMOVED" },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentDecline },
      request: meta ?? null,
    });
  });
}

/** Sets or clears a student's admission number (unique within the school). */
export async function setStudentNumber(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(studentNumberSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  try {
    await db.$transaction(async (tx) => {
      const updated = await tx.schoolMember.updateMany({
        where: { schoolId: school.schoolId, userId: data.userId, role: "STUDENT", status: "ACTIVE" },
        data: { studentNumber: data.studentNumber },
      });
      if (updated.count === 0) throw AppError.notFound("Student not found.");
      await auditInTx(tx, {
        ...schoolAuditActor(actor),
        action: SCHOOL_AUDIT.SCHOOL_UPDATE,
        entityType: "SchoolMember",
        schoolId: school.schoolId,
        targetUserId: data.userId,
        metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentNumber, cleared: data.studentNumber === null },
        request: meta ?? null,
      });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw AppError.validation({ studentNumber: ["Another student at your school already has this number."] });
    }
    throw error;
  }
}

// =====================================================================================================================
// Password resets for school-provisioned accounts (audited)
// =====================================================================================================================

export interface PasswordResetResult {
  slips: CredentialSlip[];
  /** Students that could not be reset (not provisioned by this school, not an active student...). */
  skipped: { userId: string; reason: string }[];
}

const NOT_PROVISIONED =
  "This student signs in with their own email or phone. They can reset their password themselves with “Forgot password”.";

/**
 * Sets new temporary passwords on school-provisioned username accounts of ACTIVE students of the school
 * (`User.provisionedBySchoolId` = this school). Signs the students out everywhere and makes them choose their own
 * password at the next sign-in (`passwordMustChange`). Returns the slips ONCE; the passwords are never stored in plain
 * text. One audit entry per student (`school.password_reset`, actor = admin).
 */
async function resetPasswords(actor: SchoolActor, schoolId: string, userIds: readonly string[], meta: SchoolRequestMeta): Promise<PasswordResetResult> {
  const unique = [...new Set(userIds)];
  const rows = await db.user.findMany({
    where: { id: { in: unique } },
    select: {
      id: true,
      status: true,
      loginUsername: true,
      provisionedBySchoolId: true,
      profile: { select: { displayName: true, firstName: true, lastName: true } },
      schoolMemberships: { where: { schoolId, role: "STUDENT", status: "ACTIVE" }, select: { id: true } },
      classMemberships: { where: { status: "ACTIVE", class: { schoolId, archivedAt: null } }, select: { class: { select: { name: true } } }, take: 1 },
    },
  });
  const byId = new Map(rows.map((row) => [row.id, row]));
  const slips: CredentialSlip[] = [];
  const skipped: { userId: string; reason: string }[] = [];
  const now = new Date();
  for (const userId of unique) {
    const row = byId.get(userId);
    if (!row || row.schoolMemberships.length === 0) {
      skipped.push({ userId, reason: "Not an active student of your school." });
      continue;
    }
    if (row.provisionedBySchoolId !== schoolId || !row.loginUsername) {
      skipped.push({ userId, reason: NOT_PROVISIONED });
      continue;
    }
    if (row.status !== "ACTIVE") {
      skipped.push({ userId, reason: "This account is not active. Contact support." });
      continue;
    }
    const username = row.loginUsername;
    const { password, passwordHash } = await issueTemporaryPassword({ username });
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { passwordHash, passwordUpdatedAt: now, passwordMustChange: true, failedLoginCount: 0, lockedUntil: null },
        select: { id: true },
      });
      const revoked = await revokeAllSessions(userId, { reason: "password_reset", client: tx });
      await auditInTx(tx, {
        ...schoolAuditActor(actor),
        action: SCHOOL_AUDIT.PASSWORD_RESET,
        entityType: "User",
        entityId: userId,
        targetUserId: userId,
        schoolId,
        metadata: { operation: SCHOOL_AUDIT_OPERATIONS.passwordReset, sessionsRevoked: revoked },
        request: meta ?? null,
      });
    });
    slips.push({
      userId,
      name: personName(row.profile, "Student"),
      className: row.classMemberships[0]?.class.name ?? null,
      username,
      temporaryPassword: password,
    });
  }
  return { slips, skipped };
}

/** Resets one provisioned student's password (see {@link resetPasswords}). */
export async function resetStudentPassword(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<CredentialSlip> {
  const data = parseInput(studentRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  await assertSchoolLimit("passwordReset", actor.userId, "You have reset many passwords. Please try again later.");
  const result = await resetPasswords(actor, school.schoolId, [data.userId], meta ?? null);
  const slip = result.slips[0];
  if (!slip) {
    const reason = result.skipped[0]?.reason ?? "This password can't be reset here.";
    throw reason === NOT_PROVISIONED ? AppError.conflict(reason) : AppError.notFound(reason);
  }
  return slip;
}

/** Resets up to 50 provisioned students' passwords at once (lost slips, start of term). */
export async function resetStudentPasswords(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<PasswordResetResult> {
  const data = parseInput(bulkStudentsSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  await assertSchoolLimit("passwordResetBulk", actor.userId, "You have reset many passwords. Please try again later.");
  return resetPasswords(actor, school.schoolId, data.userIds, meta ?? null);
}
