import "server-only";
import type { Prisma, Role } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { addDays, dateColumnFromLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { maskIdentifier, normalizeEmail, normalizePhone } from "@/server/auth/identifiers";
import { sendSecurityNotice } from "@/server/auth/notices";
import { grantableRoles } from "@/server/auth/permissions";
import { listActiveSessions, revokeAllSessions, revokeSession, type RequestMeta, type SessionListItem } from "@/server/auth/sessions";
import { getCurrentSubscription, type CurrentSubscriptionView } from "@/server/billing/subscriptions";
import { issueTemporaryPassword } from "@/server/schools/credentials";
import { db } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { adminContactSendLimits, assertRateLimit } from "@/server/lib/rate-limit";
import { sendMessage } from "@/server/messaging";
import { assertCmsPermission, infraActor, isSuperAdmin, PRIVILEGED_ROLES, type CmsActor } from "./access";
import { CMS_AUDIT, CMS_AUDIT_OPERATIONS } from "./audit-actions";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "./cursor";
import {
  contactActionSchema,
  listStudentsSchema,
  listTeachersSchema,
  listUsersSchema,
  reactivateUserSchema,
  revokeSessionSchema,
  roleChangeSchema,
  STAFF_GRANTABLE_ROLES,
  studentViewSchema,
  suspendUserSchema,
  temporaryPasswordSchema,
  userIdSchema,
  type ListStudentsInput,
  type ListTeachersInput,
  type ListUsersInput,
  type StaffGrantableRole,
} from "./schemas";

/**
 * Admin people management (§36 Users / Students / Teachers, §39, ARCHITECTURE §5.2–§5.3, §5.10).
 *
 * Authorization at the service boundary: every function requires `users.manage` with scope "all" (ADMIN,
 * SUPER_ADMIN); acting on another administrator (ADMIN / SUPER_ADMIN) requires SUPER_ADMIN; staff role grants follow
 * `grantableRoles` (ADMIN → CONTENT_EDITOR; SUPER_ADMIN → every staff role). Nobody acts on their own account here.
 *
 * Privacy:
 * - Lists mask phone numbers (ARCHITECTURE §5.12) and show no learning data.
 * - Opening an individual STUDENT's record needs a stated reason, recorded as a `student.view` audit entry; the
 *   record is then readable by that admin for {@link STUDENT_VIEW_WINDOW_MS} (the audit row IS the grant).
 * - AI conversations are never read (row-level security would hide them anyway).
 *
 * Every mutation writes its AuditLog entry in the same transaction as the change (`auditInTx`).
 */

/** How long one recorded `student.view` reason lets the same admin re-open the record. */
export const STUDENT_VIEW_WINDOW_MS = 30 * 60_000;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---------------------------------------------------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------------------------------------------------

const LIST_SELECT = {
  id: true,
  emailNormalized: true,
  phoneE164: true,
  loginUsername: true,
  roles: true,
  status: true,
  isDemo: true,
  createdAt: true,
  lastActiveAt: true,
  lastLoginAt: true,
  emailVerifiedAt: true,
  phoneVerifiedAt: true,
  profile: { select: { displayName: true, firstName: true, lastName: true, username: true } },
  schoolMemberships: { where: { role: "SCHOOL_ADMIN", status: "ACTIVE" }, select: { schoolId: true }, take: 1 },
} as const satisfies Prisma.UserSelect;

type ListRow = Prisma.UserGetPayload<{ select: typeof LIST_SELECT }>;

export interface UserListItem {
  id: string;
  name: string;
  email: string | null;
  /** Masked (ARCHITECTURE §5.12: phone numbers are masked in admin lists). */
  phoneMasked: string | null;
  loginUsername: string | null;
  /** Platform roles plus SCHOOL_ADMIN when the user administers a school. */
  roles: Role[];
  status: ListRow["status"];
  isDemo: boolean;
  verified: boolean;
  createdAt: Date;
  lastActiveAt: Date | null;
}

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

function displayName(profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username || "Unnamed user";
}

function toListItem(row: ListRow): UserListItem {
  const roles = [...row.roles];
  if (row.schoolMemberships.length > 0) roles.push("SCHOOL_ADMIN");
  return {
    id: row.id,
    name: displayName(row.profile),
    email: row.emailNormalized,
    phoneMasked: row.phoneE164 ? maskIdentifier(row.phoneE164) : null,
    loginUsername: row.loginUsername,
    roles,
    status: row.status,
    isDemo: row.isDemo,
    verified: row.emailVerifiedAt !== null || row.phoneVerifiedAt !== null,
    createdAt: row.createdAt,
    lastActiveAt: row.lastActiveAt,
  };
}

/**
 * Search clause: a uuid matches the id; an email matches exactly (or by fragment); a phone number matches the login
 * or contact phone; anything else matches every word against names, public handle, login username or email start.
 */
export function userSearchWhere(rawQuery: string): Prisma.UserWhereInput {
  const q = rawQuery.trim().slice(0, 200);
  if (UUID_PATTERN.test(q)) return { id: q.toLowerCase() };
  if (q.includes("@")) {
    const email = normalizeEmail(q);
    return email ? { emailNormalized: email } : { emailNormalized: { contains: q.toLowerCase() } };
  }
  if (/^\+?[\d\s().-]{6,}$/.test(q)) {
    const phone = normalizePhone(q);
    if (phone) return { OR: [{ phoneE164: phone }, { contactPhoneE164: phone }] };
    const digits = q.replace(/\D/g, "");
    return { OR: [{ phoneE164: { contains: digits } }, { contactPhoneE164: { contains: digits } }] };
  }
  const words = q.split(/\s+/).filter(Boolean).slice(0, 4);
  return {
    AND: words.map((word) => ({
      OR: [
        { profile: { is: { firstName: { contains: word, mode: "insensitive" } } } },
        { profile: { is: { lastName: { contains: word, mode: "insensitive" } } } },
        { profile: { is: { displayName: { contains: word, mode: "insensitive" } } } },
        { profile: { is: { username: { contains: word.toLowerCase() } } } },
        { loginUsername: { contains: word.toLowerCase() } },
        { emailNormalized: { startsWith: word.toLowerCase() } },
      ],
    })),
  } satisfies Prisma.UserWhereInput;
}

function baseWhere(input: { q?: string | undefined; status?: ListRow["status"] | undefined }): Prisma.UserWhereInput[] {
  const where: Prisma.UserWhereInput[] = [{ status: input.status ?? { not: "DELETED" } }];
  if (input.q) where.push(userSearchWhere(input.q));
  return where;
}

function roleWhere(role: Role): Prisma.UserWhereInput {
  return role === "SCHOOL_ADMIN"
    ? { schoolMemberships: { some: { role: "SCHOOL_ADMIN", status: "ACTIVE" } } }
    : { roles: { has: role } };
}

async function fetchPage<S extends Prisma.UserSelect>(
  where: Prisma.UserWhereInput[],
  cursor: string | undefined,
  limit: number,
  select: S,
): Promise<Prisma.UserGetPayload<{ select: S }>[]> {
  const after = cursor ? decodeCursor(cursor) : null;
  return (await db.user.findMany({
    where: { AND: [...where, afterCursorWhere(after) as Prisma.UserWhereInput] },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select,
  })) as Prisma.UserGetPayload<{ select: S }>[];
}

/** §36 Users: search by email / phone / name / id, filter by role and status, newest first (cursor pagination). */
export async function listUsers(actor: CmsActor, input: ListUsersInput = {}): Promise<Page<UserListItem>> {
  assertCmsPermission(actor, "users.manage");
  const parsed = listUsersSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { role, cursor } = parsed.data;
  const limit = parsed.data.limit ?? DEFAULT_PAGE_SIZE;
  const where = baseWhere(parsed.data);
  if (role) where.push(roleWhere(role));
  const rows = await fetchPage(where, cursor, limit, LIST_SELECT);
  const page = pageOf(rows, limit);
  return { items: page.items.map(toListItem), nextCursor: page.nextCursor };
}

export interface StudentListItem extends UserListItem {
  qualification: string | null;
  examBoard: string | null;
  yearGroup: string | null;
  onboardingCompleted: boolean;
  isMinor: boolean | null;
  guardianConsentStatus: string | null;
  school: string | null;
  activeEnrollments: number;
}

const STUDENT_SELECT = {
  ...LIST_SELECT,
  student: {
    select: {
      onboardingCompletedAt: true,
      isMinor: true,
      guardianConsentStatus: true,
      qualification: { select: { shortName: true } },
      examBoard: { select: { shortName: true } },
      yearGroup: { select: { name: true } },
      school: { select: { name: true } },
    },
  },
  _count: { select: { subjectEnrollments: { where: { status: "ACTIVE" } } } },
} as const satisfies Prisma.UserSelect;

/** §36 Students: students only, with track, onboarding and guardian-consent status (no learning data in the list). */
export async function listStudents(actor: CmsActor, input: ListStudentsInput = {}): Promise<Page<StudentListItem>> {
  assertCmsPermission(actor, "users.manage");
  const parsed = listStudentsSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { onboarding, consent, cursor } = parsed.data;
  const limit = parsed.data.limit ?? DEFAULT_PAGE_SIZE;
  const where = baseWhere(parsed.data);
  where.push({ roles: { has: "STUDENT" } });
  if (onboarding === "completed") where.push({ student: { is: { onboardingCompletedAt: { not: null } } } });
  if (onboarding === "in_progress") where.push({ student: { is: { onboardingCompletedAt: null } } });
  if (consent) where.push({ student: { is: { guardianConsentStatus: consent } } });
  const rows = await fetchPage(where, cursor, limit, STUDENT_SELECT);
  const page = pageOf(rows, limit);
  return {
    items: page.items.map((row) => ({
      ...toListItem(row),
      qualification: row.student?.qualification?.shortName ?? null,
      examBoard: row.student?.examBoard?.shortName ?? null,
      yearGroup: row.student?.yearGroup?.name ?? null,
      onboardingCompleted: row.student?.onboardingCompletedAt != null,
      isMinor: row.student?.isMinor ?? null,
      guardianConsentStatus: row.student?.guardianConsentStatus ?? null,
      school: row.student?.school?.name ?? null,
      activeEnrollments: row._count.subjectEnrollments,
    })),
    nextCursor: page.nextCursor,
  };
}

export interface TeacherListItem extends UserListItem {
  title: string | null;
  verifiedAt: Date | null;
  schools: number;
  classes: number;
}

const TEACHER_SELECT = {
  ...LIST_SELECT,
  teacher: { select: { title: true, verifiedAt: true } },
  _count: {
    select: {
      schoolMemberships: { where: { role: "TEACHER", status: "ACTIVE" } },
      classTeaching: { where: { removedAt: null } },
    },
  },
} as const satisfies Prisma.UserSelect;

/** §36 Teachers: teachers with their school memberships and current classes, and tutor verification status. */
export async function listTeachers(actor: CmsActor, input: ListTeachersInput = {}): Promise<Page<TeacherListItem>> {
  assertCmsPermission(actor, "users.manage");
  const parsed = listTeachersSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { verification, cursor } = parsed.data;
  const limit = parsed.data.limit ?? DEFAULT_PAGE_SIZE;
  const where = baseWhere(parsed.data);
  where.push({ roles: { has: "TEACHER" } });
  if (verification === "verified") where.push({ teacher: { is: { verifiedAt: { not: null } } } });
  if (verification === "unverified") where.push({ teacher: { is: { verifiedAt: null } } });
  const rows = await fetchPage(where, cursor, limit, TEACHER_SELECT);
  const page = pageOf(rows, limit);
  return {
    items: page.items.map((row) => ({
      ...toListItem(row),
      title: row.teacher?.title ?? null,
      verifiedAt: row.teacher?.verifiedAt ?? null,
      schools: row._count.schoolMemberships,
      classes: row._count.classTeaching,
    })),
    nextCursor: page.nextCursor,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Detail
// ---------------------------------------------------------------------------------------------------------------------

export interface UserAuditEntry {
  id: string;
  action: string;
  createdAt: Date;
  /** "target": something was done to this user; "actor": this user did it. */
  direction: "target" | "actor";
  actorName: string | null;
  actorUserId: string | null;
  entityType: string;
  entityId: string | null;
  reason: string | null;
}

export interface UserDetail {
  id: string;
  name: string;
  status: ListRow["status"];
  statusReason: string | null;
  statusChangedAt: Date | null;
  platformRoles: Role[];
  isSchoolAdmin: boolean;
  email: string | null;
  emailVerifiedAt: Date | null;
  phone: string | null;
  phoneVerifiedAt: Date | null;
  loginUsername: string | null;
  contactPhoneMasked: string | null;
  provisionedBySchool: { id: string; name: string } | null;
  signupChannel: string;
  isDemo: boolean;
  createdAt: Date;
  lastLoginAt: Date | null;
  lastActiveAt: Date | null;
  lockedUntil: Date | null;
  hasPassword: boolean;
  profile: {
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    username: string | null;
    timezone: string;
    locale: string;
    country: string | null;
  } | null;
  student: {
    examBoard: string | null;
    qualification: string | null;
    yearGroup: string | null;
    school: string | null;
    declaredSchoolName: string | null;
    onboardingStep: string;
    onboardingCompletedAt: Date | null;
    diagnosticCompletedAt: Date | null;
    isMinor: boolean;
    guardianConsentStatus: string;
    examExtraTimePercent: number | null;
  } | null;
  teacher: { title: string | null; verifiedAt: Date | null } | null;
  isParent: boolean;
  schoolMemberships: { id: string; schoolId: string; schoolName: string; role: string; status: string; joinedAt: Date | null; studentNumber: string | null }[];
  enrollments: {
    id: string;
    subject: string;
    qualification: string | null;
    syllabusVersion: string;
    syllabusStatus: string;
    status: string;
    enrolledVia: string;
    targetGrade: string | null;
    createdAt: Date;
  }[];
  parentLinks: { id: string; as: "parent" | "student"; otherUserId: string | null; otherName: string; status: string; relationship: string; activatedAt: Date | null }[];
  subscription: CurrentSubscriptionView | null;
  activity: { date: LocalDate; studyMinutes: number; questionsAttempted: number; questionsCorrect: number; lessonsCompleted: number }[];
  sessions: SessionListItem[];
  audit: UserAuditEntry[];
  /** What the viewing admin may do here (the actions re-check). */
  can: { grant: StaffGrantableRole[]; revoke: StaffGrantableRole[]; suspend: boolean; reactivate: boolean; signOut: boolean; contact: boolean };
}

export type UserDetailResult =
  | { access: "granted"; user: UserDetail; studentViewRecordedAt: Date | null }
  | { access: "reason_required"; summary: { id: string; name: string; roles: Role[]; status: ListRow["status"] } };

/** Whether `actor` may act on `target`: never on themselves; administrators only by SUPER_ADMIN. */
function actingRestriction(actor: CmsActor, target: { id: string; roles: readonly Role[] }): string | null {
  if (actor.userId === target.id) return "You can't do this to your own account here.";
  if (target.roles.some((role) => PRIVILEGED_ROLES.includes(role)) && !isSuperAdmin(actor)) {
    return "Only a super admin can manage another administrator.";
  }
  return null;
}

function assertMayActOn(actor: CmsActor, target: { id: string; roles: readonly Role[] }): void {
  const restriction = actingRestriction(actor, target);
  if (restriction) throw AppError.forbidden(restriction);
}

/** Staff roles `actor` may grant / revoke from the Users page. */
export function staffRolesManageableBy(actor: Pick<CmsActor, "roles">): StaffGrantableRole[] {
  const grantable = new Set(grantableRoles(actor));
  return STAFF_GRANTABLE_ROLES.filter((role) => grantable.has(role));
}

async function recentStudentView(actorUserId: string, studentUserId: string, now: Date): Promise<Date | null> {
  const row = await db.auditLog.findFirst({
    where: {
      targetUserId: studentUserId,
      actorUserId,
      action: CMS_AUDIT.STUDENT_VIEW,
      createdAt: { gte: new Date(now.getTime() - STUDENT_VIEW_WINDOW_MS) },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  return row?.createdAt ?? null;
}

/**
 * Records why an admin is opening a student's record (`student.view`, reason required by `AuditLog_reason_chk`).
 * The entry is written before any of the record is returned.
 */
export async function recordStudentView(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ userId: string }> {
  assertCmsPermission(actor, "users.manage");
  const parsed = studentViewSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { userId, reason } = parsed.data;
  const student = await db.student.findUnique({ where: { userId }, select: { userId: true } });
  if (!student) throw AppError.notFound("Student not found.");
  await db.$transaction((tx) =>
    auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.STUDENT_VIEW,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      reason,
      metadata: { surface: "admin.users.detail" },
      request: request ?? null,
    }),
  );
  return { userId };
}

/**
 * The admin view of one user (§36): roles, profile, track, enrolments, subscription, recent activity, sessions and
 * audit trail. For a student the caller must first record a reason ({@link recordStudentView}); until then only a
 * minimal summary is returned.
 */
export async function getUserDetail(actor: CmsActor, userId: string, options: { now?: Date } = {}): Promise<UserDetailResult> {
  assertCmsPermission(actor, "users.manage");
  const id = userIdSchema.safeParse({ userId });
  if (!id.success) throw AppError.notFound("User not found.");
  const now = options.now ?? new Date();

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      emailNormalized: true,
      emailVerifiedAt: true,
      phoneE164: true,
      phoneVerifiedAt: true,
      loginUsername: true,
      contactPhoneE164: true,
      passwordHash: true,
      roles: true,
      status: true,
      statusReason: true,
      statusChangedAt: true,
      lockedUntil: true,
      lastLoginAt: true,
      lastActiveAt: true,
      signupChannel: true,
      isDemo: true,
      createdAt: true,
      provisionedBySchool: { select: { id: true, name: true } },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          displayName: true,
          username: true,
          timezone: true,
          locale: true,
          country: { select: { name: true } },
        },
      },
      student: {
        select: {
          onboardingStep: true,
          onboardingCompletedAt: true,
          diagnosticCompletedAt: true,
          isMinor: true,
          guardianConsentStatus: true,
          examExtraTimePercent: true,
          declaredSchoolName: true,
          examBoard: { select: { shortName: true } },
          qualification: { select: { shortName: true } },
          yearGroup: { select: { name: true } },
          school: { select: { name: true } },
        },
      },
      teacher: { select: { title: true, verifiedAt: true } },
      parent: { select: { userId: true } },
    },
  });
  if (!user) throw AppError.notFound("User not found.");

  const name = displayName(user.profile);
  let studentViewRecordedAt: Date | null = null;
  if (user.student !== null && user.id !== actor.userId) {
    studentViewRecordedAt = await recentStudentView(actor.userId, user.id, now);
    if (studentViewRecordedAt === null) {
      return { access: "reason_required", summary: { id: user.id, name, roles: user.roles, status: user.status } };
    }
  }

  const activityFrom = dateColumnFromLocalDate(addDays(localDateString(now), -13));
  const [memberships, enrollments, linksAsParent, linksAsStudent, sessions, subscription, activity, auditAsTarget, auditAsActor] =
    await Promise.all([
      db.schoolMember.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: { id: true, schoolId: true, role: true, status: true, joinedAt: true, studentNumber: true, school: { select: { name: true } } },
      }),
      db.subjectEnrollment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          status: true,
          enrolledVia: true,
          targetGrade: true,
          createdAt: true,
          subject: { select: { name: true, qualification: { select: { shortName: true } } } },
          syllabus: { select: { versionLabel: true, status: true } },
        },
      }),
      db.parentStudentLink.findMany({
        where: { parentUserId: userId },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          status: true,
          relationship: true,
          activatedAt: true,
          studentUserId: true,
          student: { select: { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } },
        },
      }),
      db.parentStudentLink.findMany({
        where: { studentUserId: userId },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          status: true,
          relationship: true,
          activatedAt: true,
          parentUserId: true,
          parent: { select: { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } },
        },
      }),
      listActiveSessions(userId, now),
      getCurrentSubscription(userId),
      db.dailyActivity.findMany({
        where: { userId, date: { gte: activityFrom } },
        orderBy: { date: "desc" },
        take: 14,
        select: { date: true, studySeconds: true, questionsAttempted: true, questionsCorrect: true, lessonsCompleted: true },
      }),
      db.auditLog.findMany({
        where: { targetUserId: userId },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take: 20,
        select: { id: true, action: true, createdAt: true, actorUserId: true, entityType: true, entityId: true, reason: true, actor: { select: { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } } },
      }),
      db.auditLog.findMany({
        // Entries this user made about others or about no person (null target), not their own events again.
        where: { actorUserId: userId, OR: [{ targetUserId: null }, { targetUserId: { not: userId } }] },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take: 20,
        select: { id: true, action: true, createdAt: true, actorUserId: true, entityType: true, entityId: true, reason: true },
      }),
    ]);

  const audit: UserAuditEntry[] = [
    ...auditAsTarget.map((row) => ({
      id: row.id,
      action: row.action,
      createdAt: row.createdAt,
      direction: "target" as const,
      actorUserId: row.actorUserId,
      actorName: row.actorUserId === null ? null : displayName(row.actor?.profile ?? null),
      entityType: row.entityType,
      entityId: row.entityId,
      reason: row.reason,
    })),
    ...auditAsActor.map((row) => ({
      id: row.id,
      action: row.action,
      createdAt: row.createdAt,
      direction: "actor" as const,
      actorUserId: row.actorUserId,
      actorName: name,
      entityType: row.entityType,
      entityId: row.entityId,
      reason: row.reason,
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime() || (a.id < b.id ? 1 : -1))
    .slice(0, 25);

  const manageable = staffRolesManageableBy(actor);
  const restriction = actingRestriction(actor, user);
  const isSchoolAdmin = memberships.some((m) => m.role === "SCHOOL_ADMIN" && m.status === "ACTIVE");

  return {
    access: "granted",
    studentViewRecordedAt,
    user: {
      id: user.id,
      name,
      status: user.status,
      statusReason: user.statusReason,
      statusChangedAt: user.statusChangedAt,
      platformRoles: user.roles,
      isSchoolAdmin,
      email: user.emailNormalized,
      emailVerifiedAt: user.emailVerifiedAt,
      phone: user.phoneE164,
      phoneVerifiedAt: user.phoneVerifiedAt,
      loginUsername: user.loginUsername,
      contactPhoneMasked: user.contactPhoneE164 ? maskIdentifier(user.contactPhoneE164) : null,
      provisionedBySchool: user.provisionedBySchool,
      signupChannel: user.signupChannel,
      isDemo: user.isDemo,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      lastActiveAt: user.lastActiveAt,
      lockedUntil: user.lockedUntil && user.lockedUntil > now ? user.lockedUntil : null,
      hasPassword: user.passwordHash !== null,
      profile: user.profile
        ? {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            displayName: user.profile.displayName,
            username: user.profile.username,
            timezone: user.profile.timezone,
            locale: user.profile.locale,
            country: user.profile.country?.name ?? null,
          }
        : null,
      student: user.student
        ? {
            examBoard: user.student.examBoard?.shortName ?? null,
            qualification: user.student.qualification?.shortName ?? null,
            yearGroup: user.student.yearGroup?.name ?? null,
            school: user.student.school?.name ?? null,
            declaredSchoolName: user.student.declaredSchoolName,
            onboardingStep: user.student.onboardingStep,
            onboardingCompletedAt: user.student.onboardingCompletedAt,
            diagnosticCompletedAt: user.student.diagnosticCompletedAt,
            isMinor: user.student.isMinor,
            guardianConsentStatus: user.student.guardianConsentStatus,
            examExtraTimePercent: user.student.examExtraTimePercent,
          }
        : null,
      teacher: user.teacher,
      isParent: user.parent !== null,
      schoolMemberships: memberships.map((m) => ({
        id: m.id,
        schoolId: m.schoolId,
        schoolName: m.school.name,
        role: m.role,
        status: m.status,
        joinedAt: m.joinedAt,
        studentNumber: m.studentNumber,
      })),
      enrollments: enrollments.map((e) => ({
        id: e.id,
        subject: e.subject.name,
        qualification: e.subject.qualification.shortName,
        syllabusVersion: e.syllabus.versionLabel,
        syllabusStatus: e.syllabus.status,
        status: e.status,
        enrolledVia: e.enrolledVia,
        targetGrade: e.targetGrade,
        createdAt: e.createdAt,
      })),
      parentLinks: [
        ...linksAsParent.map((link) => ({
          id: link.id,
          as: "parent" as const,
          otherUserId: link.studentUserId,
          otherName: link.student ? displayName(link.student.profile) : "Not yet linked",
          status: link.status,
          relationship: link.relationship,
          activatedAt: link.activatedAt,
        })),
        ...linksAsStudent.map((link) => ({
          id: link.id,
          as: "student" as const,
          otherUserId: link.parentUserId,
          otherName: link.parent ? displayName(link.parent.profile) : "Not yet linked",
          status: link.status,
          relationship: link.relationship,
          activatedAt: link.activatedAt,
        })),
      ],
      subscription,
      activity: activity.map((row) => ({
        date: localDateFromDateColumn(row.date),
        studyMinutes: Math.round(row.studySeconds / 60),
        questionsAttempted: row.questionsAttempted,
        questionsCorrect: row.questionsCorrect,
        lessonsCompleted: row.lessonsCompleted,
      })),
      sessions,
      audit,
      can: {
        grant: restriction ? [] : manageable.filter((role) => !user.roles.includes(role)),
        revoke: restriction ? [] : manageable.filter((role) => user.roles.includes(role)),
        suspend: restriction === null && user.status === "ACTIVE",
        reactivate: restriction === null && user.status === "SUSPENDED",
        signOut: restriction === null && sessions.length > 0,
        contact: restriction === null && user.status === "ACTIVE",
      },
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------

async function loadTarget(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      roles: true,
      status: true,
      statusReason: true,
      emailNormalized: true,
      emailVerifiedAt: true,
      phoneE164: true,
      phoneVerifiedAt: true,
      loginUsername: true,
    },
  });
  if (!user) throw AppError.notFound("User not found.");
  return user;
}

function parseOrThrow<T>(result: { success: true; data: T } | { success: false; error: Parameters<typeof AppError.fromZod>[0] }): T {
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/**
 * Suspends an ACTIVE account (abuse, chargeback, safeguarding): status SUSPENDED with the staff reason, every session
 * revoked, audited. A suspended user cannot sign in until reactivated.
 */
export async function suspendUser(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ sessionsRevoked: number }> {
  assertCmsPermission(actor, "users.manage");
  const { userId, reason } = parseOrThrow(suspendUserSchema.safeParse(input));
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "ACTIVE") throw AppError.conflict("Only active accounts can be suspended.");
  return db.$transaction(async (tx) => {
    const updated = await tx.user.updateMany({
      where: { id: userId, status: "ACTIVE" },
      data: { status: "SUSPENDED", statusReason: reason, statusChangedAt: new Date() },
    });
    if (updated.count === 0) throw AppError.conflict();
    const sessionsRevoked = await revokeAllSessions(userId, { reason: "suspended", client: tx });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.USER_SUSPEND,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      before: { status: target.status },
      after: { status: "SUSPENDED" },
      metadata: { sessionsRevoked },
      reason,
      request: request ?? null,
    });
    return { sessionsRevoked };
  });
}

/** Lifts a suspension (SUSPENDED → ACTIVE), audited. */
export async function reactivateUser(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<void> {
  assertCmsPermission(actor, "users.manage");
  const { userId, reason } = parseOrThrow(reactivateUserSchema.safeParse(input));
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "SUSPENDED") throw AppError.conflict("Only suspended accounts can be reactivated.");
  await db.$transaction(async (tx) => {
    const updated = await tx.user.updateMany({
      where: { id: userId, status: "SUSPENDED" },
      data: { status: "ACTIVE", statusReason: null, statusChangedAt: new Date() },
    });
    if (updated.count === 0) throw AppError.conflict();
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.USER_REACTIVATE,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      before: { status: "SUSPENDED", statusReason: target.statusReason },
      after: { status: "ACTIVE" },
      reason: reason ?? null,
      request: request ?? null,
    });
  });
}

/** Signs the user out on every device (all sessions revoked), audited. */
export async function forceSignOut(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ sessionsRevoked: number }> {
  assertCmsPermission(actor, "users.manage");
  const { userId } = parseOrThrow(userIdSchema.safeParse(input));
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  return db.$transaction(async (tx) => {
    const sessionsRevoked = await revokeAllSessions(userId, { reason: "admin_signout", client: tx });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.SESSIONS_REVOKE,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.forceSignOut, sessionsRevoked },
      request: request ?? null,
    });
    return { sessionsRevoked };
  });
}

/** Revokes one of the user's sessions (device list), audited. */
export async function revokeUserSession(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<void> {
  assertCmsPermission(actor, "users.manage");
  const { userId, sessionId } = parseOrThrow(revokeSessionSchema.safeParse(input));
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  const session = await db.session.findFirst({ where: { id: sessionId, userId }, select: { id: true, kind: true, revokedAt: true } });
  if (!session) throw AppError.notFound("Session not found.");
  if (session.revokedAt !== null) throw AppError.conflict("This session has already ended.");
  await db.$transaction(async (tx) => {
    const revoked = await revokeSession(sessionId, "admin_revoked", tx);
    if (!revoked) throw AppError.conflict("This session has already ended.");
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.SESSIONS_REVOKE,
      entityType: "Session",
      entityId: sessionId,
      targetUserId: userId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.sessionRevoke, kind: session.kind },
      request: request ?? null,
    });
  });
}

/**
 * Grants a staff role (CONTENT_EDITOR by ADMIN; CONTENT_EDITOR / ADMIN / SUPER_ADMIN by SUPER_ADMIN). The user's
 * sessions are revoked so they sign in again under the staff session policy (12 h idle / 7 days absolute). Callers
 * must require a recent step-up authentication (ARCHITECTURE §5.1).
 */
export async function grantStaffRole(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ roles: Role[] }> {
  assertCmsPermission(actor, "roles.grant", "restricted");
  const { userId, role, reason } = parseOrThrow(roleChangeSchema.safeParse(input));
  if (!staffRolesManageableBy(actor).includes(role)) {
    throw AppError.forbidden(role === "CONTENT_EDITOR" ? undefined : "Only a super admin can grant administrator roles.");
  }
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "ACTIVE") throw AppError.conflict("Roles can only be granted to active accounts.");
  if (target.roles.includes(role)) throw AppError.conflict("The user already has this role.");
  const roles = [...target.roles, role];
  await db.$transaction(async (tx) => {
    const updated = await tx.user.updateMany({ where: { id: userId, NOT: { roles: { has: role } } }, data: { roles } });
    if (updated.count === 0) throw AppError.conflict("The user already has this role.");
    const sessionsRevoked = await revokeAllSessions(userId, { reason: "role_changed", client: tx });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ROLE_GRANT,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      before: { roles: target.roles },
      after: { roles },
      metadata: { role, sessionsRevoked },
      reason: reason ?? null,
      request: request ?? null,
    });
  });
  return { roles };
}

/**
 * Revokes a staff role (same authority as {@link grantStaffRole}). Refuses to remove the last SUPER_ADMIN so the
 * platform can never lock itself out. Sessions are revoked so the change applies immediately.
 */
export async function revokeStaffRole(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ roles: Role[] }> {
  assertCmsPermission(actor, "roles.grant", "restricted");
  const { userId, role, reason } = parseOrThrow(roleChangeSchema.safeParse(input));
  if (!staffRolesManageableBy(actor).includes(role)) {
    throw AppError.forbidden(role === "CONTENT_EDITOR" ? undefined : "Only a super admin can revoke administrator roles.");
  }
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (!target.roles.includes(role)) throw AppError.conflict("The user doesn't have this role.");
  const roles = target.roles.filter((held) => held !== role);
  await db.$transaction(async (tx) => {
    if (role === "SUPER_ADMIN") {
      const others = await tx.user.count({ where: { roles: { has: "SUPER_ADMIN" }, status: "ACTIVE", NOT: { id: userId } } });
      if (others === 0) throw AppError.conflict("This is the last super admin. Grant the role to someone else first.");
    }
    const updated = await tx.user.updateMany({ where: { id: userId, roles: { has: role } }, data: { roles } });
    if (updated.count === 0) throw AppError.conflict("The user doesn't have this role.");
    const sessionsRevoked = await revokeAllSessions(userId, { reason: "role_changed", client: tx });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.ROLE_REVOKE,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      before: { roles: target.roles },
      after: { roles },
      metadata: { role, sessionsRevoked },
      reason: reason ?? null,
      request: request ?? null,
    });
  });
  return { roles };
}

function appUrl(path: string): string {
  return new URL(path, getEnv().APP_URL).toString();
}

/** Staff messages to a person go by email only (owner decision 2026-10-07: accounts are email-based, SMS is off). */
const EMAIL_ONLY_MESSAGE = "We don't send text messages. Account messages go to the person's email address.";

/**
 * "Reset password link": emails the user — at their own VERIFIED address, never to the admin — instructions and the
 * link to start a password reset (the reset code itself is only ever issued to the user's own inbox by the
 * forgot-password flow, so staff never see or hold a working credential). Account email: sent whatever
 * `features.email` says. Rate limited per recipient; audited. Accounts without a verified email (school usernames,
 * or someone who lost access to their inbox) use {@link issueTemporaryPasswordForUser} instead.
 *
 * @throws VALIDATION when the account has no verified email (or `channel: "phone"` is asked for).
 */
export async function sendPasswordResetInstructions(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ channel: "email"; sentTo: string }> {
  assertCmsPermission(actor, "users.manage");
  const { userId, channel } = parseOrThrow(contactActionSchema.safeParse(input));
  if (channel === "phone") throw AppError.validation({ channel: [EMAIL_ONLY_MESSAGE] }, EMAIL_ONLY_MESSAGE);
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "ACTIVE") throw AppError.conflict("Password reset instructions can only be sent to active accounts.");
  const to = target.emailNormalized && target.emailVerifiedAt ? target.emailNormalized : null;
  if (to === null) {
    throw AppError.validation(
      { channel: ["This account has no verified email address. Issue a one-time password instead, or (school accounts) ask the school admin."] },
      "No verified email to send to.",
    );
  }
  for (const limit of adminContactSendLimits(to)) await assertRateLimit(limit, "Instructions were sent to this person recently. Please try again later.");
  const link = appUrl("/forgot-password");
  await sendMessage({
    channel: "email",
    to,
    subject: `Reset your ${APP_NAME} password`,
    text:
      `A member of the ${APP_NAME} support team started a password reset for your account. ` +
      `To choose a new password, open ${link}, enter this email address and follow the steps. ` +
      "If you didn't ask for help, you can ignore this message.",
    tag: "admin.password_reset_instructions",
    transactional: true,
  });
  await db.$transaction((tx) =>
    auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.PASSWORD_RESET_SENT,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.passwordResetSent, channel: "email" },
      request: request ?? null,
    }),
  );
  return { channel: "email", sentTo: maskIdentifier(to) };
}

/**
 * "Resend verification": emails a reminder to confirm an UNVERIFIED email address. One-time codes are bound to the
 * device that asks for them, so the reminder links to sign-in, where a fresh code is emailed automatically. Account
 * email; rate limited per recipient; audited. Phone numbers are never verified, so there is nothing to remind about.
 */
export async function sendVerificationReminder(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ channel: "email"; sentTo: string }> {
  assertCmsPermission(actor, "users.manage");
  const { userId, channel } = parseOrThrow(contactActionSchema.safeParse(input));
  if (channel === "phone") throw AppError.validation({ channel: [EMAIL_ONLY_MESSAGE] }, EMAIL_ONLY_MESSAGE);
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "ACTIVE") throw AppError.conflict("Reminders can only be sent to active accounts.");
  const to = target.emailNormalized && !target.emailVerifiedAt ? target.emailNormalized : null;
  if (to === null) throw AppError.validation({ channel: ["There is no unconfirmed email address to confirm."] }, "Nothing to verify.");
  for (const limit of adminContactSendLimits(to)) await assertRateLimit(limit, "A reminder was sent to this person recently. Please try again later.");
  const link = appUrl("/login");
  await sendMessage({
    channel: "email",
    to,
    subject: `Confirm your ${APP_NAME} email address`,
    text:
      `Please confirm this email address for your ${APP_NAME} account. ` +
      `Sign in at ${link} and we'll email you a 6-digit code to enter. If you don't have an account, you can ignore this message.`,
    tag: "admin.verification_reminder",
    transactional: true,
  });
  await db.$transaction((tx) =>
    auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.VERIFICATION_REMINDER_SENT,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.verificationReminderSent, channel: "email" },
      request: request ?? null,
    }),
  );
  return { channel: "email", sentTo: maskIdentifier(to) };
}

export interface TemporaryPasswordResult {
  /** Shown ONCE to the admin; only its Argon2id hash is stored. */
  temporaryPassword: string;
  /** How the person signs in with it (masked verified email, or the school username). */
  signInWith: string[];
  sessionsRevoked: number;
}

/**
 * "Issue a one-time password": account recovery for someone who cannot get a reset code by email themselves (a school
 * username account, or a person who lost access to their inbox). Staff set a random temporary password, shown ONCE to
 * them to pass on (in person or by phone call). It must be changed at the next sign-in (`passwordMustChange`), every
 * session of the account is signed out, the action is audited with the admin's reason, and the account's verified
 * email (if any) gets a security notice. Only accounts that can sign in with it qualify: a verified email or a school
 * username (phone numbers are not sign-in identifiers). Staff can never do this to their own account or to accounts
 * they may not act on (same rules as suspend).
 *
 * @throws FORBIDDEN | NOT_FOUND | CONFLICT (inactive account) | VALIDATION (reason, or no way to sign in) | RATE_LIMITED
 */
export async function issueTemporaryPasswordForUser(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<TemporaryPasswordResult> {
  assertCmsPermission(actor, "users.manage");
  const { userId, reason } = parseOrThrow(temporaryPasswordSchema.safeParse(input));
  if (userId === actor.userId) throw AppError.forbidden("Use Change password for your own account.");
  const target = await loadTarget(userId);
  assertMayActOn(actor, target);
  if (target.status !== "ACTIVE") throw AppError.conflict("A one-time password can only be issued for an active account.");
  const verifiedEmail = target.emailNormalized && target.emailVerifiedAt ? target.emailNormalized : null;
  const signInWith = [verifiedEmail ? maskIdentifier(verifiedEmail) : null, target.loginUsername].filter((value): value is string => value !== null);
  if (signInWith.length === 0) {
    throw AppError.validation(
      { _form: ["This account has no verified email address or school username to sign in with, so a password would not help."] },
      "No way to sign in.",
    );
  }
  for (const limit of adminContactSendLimits(`user:${userId}`)) {
    await assertRateLimit(limit, "A one-time password was issued for this account recently. Please try again later.");
  }
  const { password, passwordHash } = await issueTemporaryPassword({ username: target.loginUsername });
  const now = new Date();
  const sessionsRevoked = await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { passwordHash, passwordUpdatedAt: now, passwordMustChange: true, failedLoginCount: 0, lockedUntil: null },
      select: { id: true },
    });
    const revoked = await revokeAllSessions(userId, { reason: "password_reset", client: tx });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.TEMPORARY_PASSWORD_ISSUED,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.temporaryPasswordIssued, sessionsRevoked: revoked },
      reason,
      request: request ?? null,
    });
    return revoked;
  });
  sendSecurityNotice({ kind: "temporary_password", to: verifiedEmail });
  return { temporaryPassword: password, signInWith, sessionsRevoked };
}

/** Request metadata (from a Server Action) in the audit shape. */
export function auditRequestFrom(meta: RequestMeta): AuditRequestInfo {
  return { requestId: meta.requestId ?? null, ip: meta.ip, userAgent: meta.userAgent };
}
