/**
 * Identity, school and class fixtures (§5, §21, §22, §23, §33). Every factory returns the rows it created and uses
 * unique values (see ./util), so parallel test files never collide in the shared test database.
 *
 * Database rules these factories satisfy (init migration, C3.1 / C3.2):
 * - a user has an email or phone (or username + password); SCHOOL_ADMIN is never a platform role (it is held through
 *   SchoolMember);
 * - role extension rows (Student / Parent / Teacher) exist iff the role is in `User.roles` (service invariant);
 * - a minor student has guardian consent other than NOT_REQUIRED; an adult has NOT_REQUIRED;
 * - an ACTIVE school is verified; ACTIVE memberships have `joinedAt`; a current teacher of a school class holds an
 *   ACTIVE TEACHER / SCHOOL_ADMIN membership of that school (trigger), which `createClass` provides by default;
 * - an ACTIVE parent link has both sides, an activation time, a consent basis and (for student-consent bases) the
 *   student's consent time, all >= the row's `createdAt`.
 */
import type {
  Class,
  ClassMember,
  ClassTeacher,
  GuardianConsentStatus,
  Parent,
  ParentLinkConsentBasis,
  ParentStudentLink,
  Profile,
  Role,
  School,
  SchoolMember,
  SchoolMemberRole,
  SchoolMemberStatus,
  SchoolStatus,
  Student,
  Teacher,
  User,
  UserStatus,
} from "@/generated/prisma/client";
import { db } from "@/server/db";
import { ensureTestCountry } from "./curriculum";
import { uniqueEmail, uniqueJoinCode, uniqueSlug, uniqueUsername } from "./util";

/** Platform roles a User row may hold (SCHOOL_ADMIN is per school, never stored in `User.roles`). */
export type PlatformRole = Exclude<Role, "SCHOOL_ADMIN">;

/** Student-extension fields a test may set (track ids must be consistent: the qualification belongs to the board…). */
export interface StudentFixtureFields {
  isMinor?: boolean;
  guardianConsentStatus?: GuardianConsentStatus;
  countryId?: string | null;
  examBoardId?: string | null;
  qualificationId?: string | null;
  yearGroupId?: string | null;
  schoolId?: string | null;
  /** Marks onboarding COMPLETED (requires countryId, examBoardId and qualificationId). */
  onboardingCompleted?: boolean;
}

export interface CreateUserOptions {
  /** Platform roles (default none). Matching Student / Parent / Teacher rows are created unless `extensions: false`. */
  roles?: PlatformRole[];
  /** Login email; default a unique `@example.test` address. Pass `null` for a phone-only account. */
  email?: string | null;
  /** E.164 login phone (default none). */
  phone?: string | null;
  /** Argon2id PHC string, if the test needs one (factories never hash passwords themselves). */
  passwordHash?: string | null;
  status?: Exclude<UserStatus, "DELETED">;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string | null;
  /** Create the Profile row (default true). */
  profile?: boolean;
  /** Create role extension rows for STUDENT / PARENT / TEACHER (default true). */
  extensions?: boolean;
  /** Student-extension fields, used when STUDENT is in `roles`. */
  student?: StudentFixtureFields;
}

/** Rows created by {@link createUser} and the role-specific factories. */
export interface UserFixture {
  user: User;
  profile: Profile | null;
  student: Student | null;
  parent: Parent | null;
  teacher: Teacher | null;
}

function studentData(userId: string, fields: StudentFixtureFields = {}) {
  const isMinor = fields.isMinor ?? true;
  const consent: GuardianConsentStatus = fields.guardianConsentStatus ?? (isMinor ? "PENDING" : "NOT_REQUIRED");
  const completed = fields.onboardingCompleted ?? false;
  if (completed && (!fields.countryId || !fields.examBoardId || !fields.qualificationId)) {
    throw new Error("createStudent: onboardingCompleted needs countryId, examBoardId and qualificationId");
  }
  if (consent === "GRANTED") {
    throw new Error("createStudent: grant consent through linkParent + the consent service, not the factory");
  }
  return {
    userId,
    isMinor,
    guardianConsentStatus: consent,
    countryId: fields.countryId ?? null,
    examBoardId: fields.examBoardId ?? null,
    qualificationId: fields.qualificationId ?? null,
    yearGroupId: fields.yearGroupId ?? null,
    schoolId: fields.schoolId ?? null,
    ...(completed ? { onboardingStep: "COMPLETED" as const, onboardingCompletedAt: new Date() } : {}),
  };
}

/**
 * Creates a user (+ Profile and role extension rows) in one transaction.
 *
 * @example const { user } = await createUser({ roles: ["SUPER_ADMIN"] });
 */
export async function createUser(options: CreateUserOptions = {}): Promise<UserFixture> {
  const roles = [...new Set(options.roles ?? [])];
  if ((roles as Role[]).includes("SCHOOL_ADMIN")) {
    throw new Error("createUser: SCHOOL_ADMIN is not a platform role; use createSchoolMember({ role: 'SCHOOL_ADMIN' })");
  }
  const email = options.email === undefined ? uniqueEmail() : options.email;
  const phone = options.phone ?? null;
  if (email === null && phone === null) throw new Error("createUser: an email or a phone is required");
  const withExtensions = options.extensions ?? true;
  const now = new Date();

  return db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        emailNormalized: email === null ? null : email.trim().toLowerCase(),
        phoneE164: phone,
        passwordHash: options.passwordHash ?? null,
        roles,
        status: options.status ?? "ACTIVE",
        emailVerifiedAt: options.emailVerified && email !== null ? now : null,
      },
    });
    const profile =
      options.profile === false
        ? null
        : await tx.profile.create({
            data: {
              userId: user.id,
              firstName: options.firstName ?? "Test",
              lastName: options.lastName === undefined ? "User" : options.lastName,
              displayName: options.firstName ?? "Test",
              username: uniqueUsername(),
            },
          });
    const student =
      withExtensions && roles.includes("STUDENT")
        ? await tx.student.create({ data: studentData(user.id, options.student) })
        : null;
    const parent = withExtensions && roles.includes("PARENT") ? await tx.parent.create({ data: { userId: user.id } }) : null;
    const teacher =
      withExtensions && roles.includes("TEACHER") ? await tx.teacher.create({ data: { userId: user.id } }) : null;
    return { user, profile, student, parent, teacher };
  });
}

type RoleFactoryOptions = Omit<CreateUserOptions, "roles"> & { extraRoles?: PlatformRole[] };

/** Student account: User (roles STUDENT + extras) + Profile + Student (minor with PENDING consent by default). */
export async function createStudent(
  options: RoleFactoryOptions = {},
): Promise<UserFixture & { student: Student }> {
  const fixture = await createUser({ ...options, roles: ["STUDENT", ...(options.extraRoles ?? [])], extensions: true });
  if (!fixture.student) throw new Error("createStudent: student row missing");
  return { ...fixture, student: fixture.student };
}

/** Parent account: User (roles PARENT + extras) + Profile + Parent. */
export async function createParent(options: RoleFactoryOptions = {}): Promise<UserFixture & { parent: Parent }> {
  const fixture = await createUser({ ...options, roles: ["PARENT", ...(options.extraRoles ?? [])], extensions: true });
  if (!fixture.parent) throw new Error("createParent: parent row missing");
  return { ...fixture, parent: fixture.parent };
}

/** Teacher account: User (roles TEACHER + extras) + Profile + Teacher. */
export async function createTeacher(options: RoleFactoryOptions = {}): Promise<UserFixture & { teacher: Teacher }> {
  const fixture = await createUser({ ...options, roles: ["TEACHER", ...(options.extraRoles ?? [])], extensions: true });
  if (!fixture.teacher) throw new Error("createTeacher: teacher row missing");
  return { ...fixture, teacher: fixture.teacher };
}

export interface CreateSchoolOptions {
  /** Defaults to the shared test country. */
  countryId?: string;
  name?: string;
  /** Default ACTIVE (verified now). */
  status?: SchoolStatus;
  createdById?: string | null;
}

/** Creates a school with a unique slug. ACTIVE schools get `verifiedAt` (School_verified_chk). */
export async function createSchool(options: CreateSchoolOptions = {}): Promise<{ school: School }> {
  const countryId = options.countryId ?? (await ensureTestCountry()).id;
  const status = options.status ?? "ACTIVE";
  const slug = uniqueSlug("school");
  const school = await db.school.create({
    data: {
      name: options.name ?? `Test High School ${slug}`,
      slug,
      countryId,
      type: "GOVERNMENT",
      status,
      verifiedAt: status === "ACTIVE" ? new Date() : null,
      createdById: options.createdById ?? null,
    },
  });
  return { school };
}

export interface CreateSchoolMemberOptions {
  schoolId: string;
  userId: string;
  role: SchoolMemberRole;
  /** Default ACTIVE. */
  status?: SchoolMemberStatus;
  studentNumber?: string | null;
}

/** Adds a school membership (the only source of school-scoped authority, incl. SCHOOL_ADMIN). */
export async function createSchoolMember(options: CreateSchoolMemberOptions): Promise<{ member: SchoolMember }> {
  const status = options.status ?? "ACTIVE";
  const now = new Date();
  const member = await db.schoolMember.create({
    data: {
      schoolId: options.schoolId,
      userId: options.userId,
      role: options.role,
      status,
      source: "ADDED_BY_STAFF",
      studentNumber: options.role === "STUDENT" ? (options.studentNumber ?? null) : null,
      joinedAt: status === "ACTIVE" || status === "REMOVED" ? now : null,
      removedAt: status === "REMOVED" ? now : null,
    },
  });
  return { member };
}

export interface CreateClassOptions {
  /** School of the class; `null` creates an independent tutor's class. Default: a new school. */
  schoolId?: string | null;
  /** Creator (also the LEAD teacher unless `teacherUserIds` says otherwise). Default: a new teacher. */
  createdById?: string;
  /** Current teachers; the first is LEAD, the rest ASSISTANT. Default `[createdById]`. */
  teacherUserIds?: string[];
  /** ACTIVE class members. */
  studentUserIds?: string[];
  name?: string;
  subjectId?: string | null;
  qualificationId?: string | null;
  academicYear?: string;
  /** Default a unique join code; `null` disables joining by code. */
  joinCode?: string | null;
  /**
   * For school classes, give every teacher an ACTIVE TEACHER membership and every student an ACTIVE STUDENT membership
   * of the school when missing (required by ClassTeacher_membership_guard). Default true.
   */
  ensureMemberships?: boolean;
}

export interface ClassFixture {
  class: Class;
  teachers: ClassTeacher[];
  members: ClassMember[];
  /** Memberships created or re-activated by `ensureMemberships`. */
  schoolMembers: SchoolMember[];
  /** The school created when `schoolId` was not given. */
  school: School | null;
}

async function ensureActiveMembership(schoolId: string, userId: string, role: SchoolMemberRole): Promise<SchoolMember> {
  const now = new Date();
  return db.schoolMember.upsert({
    where: { schoolId_userId_role: { schoolId, userId, role } },
    create: { schoolId, userId, role, status: "ACTIVE", source: "ADDED_BY_STAFF", joinedAt: now },
    update: { status: "ACTIVE", joinedAt: now, removedAt: null, removedById: null },
  });
}

/** Creates a class with its ClassTeacher and ClassMember rows (and the school memberships they require). */
export async function createClass(options: CreateClassOptions = {}): Promise<ClassFixture> {
  let school: School | null = null;
  let schoolId: string | null;
  if (options.schoolId === undefined) {
    school = (await createSchool()).school;
    schoolId = school.id;
  } else {
    schoolId = options.schoolId;
  }
  const createdById = options.createdById ?? (await createTeacher()).user.id;
  const teacherUserIds = [...new Set(options.teacherUserIds ?? [createdById])];
  const studentUserIds = [...new Set(options.studentUserIds ?? [])];

  const schoolMembers: SchoolMember[] = [];
  if (schoolId !== null && (options.ensureMemberships ?? true)) {
    for (const userId of teacherUserIds) schoolMembers.push(await ensureActiveMembership(schoolId, userId, "TEACHER"));
    for (const userId of studentUserIds) schoolMembers.push(await ensureActiveMembership(schoolId, userId, "STUDENT"));
  }

  const created = await db.class.create({
    data: {
      schoolId,
      name: options.name ?? "Test Class 4A",
      subjectId: options.subjectId ?? null,
      qualificationId: options.qualificationId ?? null,
      academicYear: options.academicYear ?? "2026",
      joinCode: options.joinCode === undefined ? uniqueJoinCode() : options.joinCode,
      createdById,
    },
  });

  const teachers: ClassTeacher[] = [];
  for (const [index, userId] of teacherUserIds.entries()) {
    teachers.push(
      await db.classTeacher.create({
        data: { classId: created.id, userId, role: index === 0 ? "LEAD" : "ASSISTANT" },
      }),
    );
  }
  const members: ClassMember[] = [];
  for (const userId of studentUserIds) {
    members.push(
      await db.classMember.create({
        data: { classId: created.id, userId, status: "ACTIVE", source: "ADDED_BY_STAFF" },
      }),
    );
  }
  return { class: created, teachers, members, schoolMembers, school };
}

export interface LinkParentOptions {
  parentUserId: string;
  studentUserId: string;
  /** Default STUDENT_CODE (the student shared an invite code). */
  consentBasis?: ParentLinkConsentBasis;
  /** Also grant the separate AI-conversation consent (student-consent bases only). Default false. */
  canViewAiConversations?: boolean;
}

/** Creates an ACTIVE parent-student link episode with consent timestamps that satisfy the CHECKs. */
export async function linkParent(options: LinkParentOptions): Promise<{ link: ParentStudentLink }> {
  const basis = options.consentBasis ?? "STUDENT_CODE";
  const studentConsent = basis === "STUDENT_CODE" || basis === "STUDENT_APPROVAL";
  if (options.canViewAiConversations && !studentConsent) {
    throw new Error("linkParent: AI-conversation access needs a student-consent basis");
  }
  // One timestamp for createdAt and every consent time: the CHECKs compare them (consent >= createdAt).
  const now = new Date();
  const link = await db.parentStudentLink.create({
    data: {
      parentUserId: options.parentUserId,
      studentUserId: options.studentUserId,
      status: "ACTIVE",
      relationship: "PARENT",
      initiatedBy: studentConsent ? "STUDENT" : basis === "SCHOOL_RECORD" ? "SCHOOL" : "ADMIN",
      consentBasis: basis,
      studentConsentAt: studentConsent ? now : null,
      activatedAt: now,
      canViewAiConversations: options.canViewAiConversations ?? false,
      aiConversationsConsentAt: options.canViewAiConversations ? now : null,
      createdAt: now,
    },
  });
  return { link };
}
