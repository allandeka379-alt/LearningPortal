import type { PrismaClient, Role } from "@/generated/prisma/client";
import { hashPassword } from "@/server/auth/passwords";
import { passwordPolicyErrors } from "@/server/auth/password-policy";
import type { CatalogueIds } from "../catalogue";
import type { SeedLog, SeedTally } from "../util";

/**
 * DEV ONLY demo accounts, school, class and parent link (§21, §22, §23). Every account is `isDemo`, uses a reserved
 * `example.test` address (RFC 2606, never deliverable) and the shared dev-only password documented in
 * docs/DEV_SEED.md. The seed refuses to run any of this in production.
 */

/** Dev-only password for every demo account (override with SEED_DEMO_PASSWORD). Documented in docs/DEV_SEED.md. */
export const DEFAULT_DEMO_PASSWORD = "demo-pass-2026";

type PlatformRole = Exclude<Role, "SCHOOL_ADMIN">;

export interface DemoAccountSpec {
  key: "student" | "student2" | "parent" | "teacher" | "schoolAdmin" | "editor" | "admin" | "superAdmin";
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: PlatformRole[];
}

/** One account per role (SCHOOL_ADMIN is held through a school membership, never as a platform role). */
export const DEMO_ACCOUNTS: readonly DemoAccountSpec[] = [
  { key: "student", email: "demo.student@example.test", username: "demo_student", firstName: "Demo", lastName: "Student", roles: ["STUDENT"] },
  { key: "student2", email: "demo.student2@example.test", username: "demo_student_two", firstName: "Demo", lastName: "Student Two", roles: ["STUDENT"] },
  { key: "parent", email: "demo.parent@example.test", username: "demo_parent", firstName: "Demo", lastName: "Parent", roles: ["PARENT"] },
  { key: "teacher", email: "demo.teacher@example.test", username: "demo_teacher", firstName: "Demo", lastName: "Teacher", roles: ["TEACHER"] },
  { key: "schoolAdmin", email: "demo.schooladmin@example.test", username: "demo_school_admin", firstName: "Demo", lastName: "School Admin", roles: [] },
  { key: "editor", email: "demo.editor@example.test", username: "demo_editor", firstName: "Demo", lastName: "Content Editor", roles: ["CONTENT_EDITOR"] },
  { key: "admin", email: "demo.admin@example.test", username: "demo_admin", firstName: "Demo", lastName: "Admin", roles: ["ADMIN"] },
  { key: "superAdmin", email: "demo.superadmin@example.test", username: "demo_super_admin", firstName: "Demo", lastName: "Super Admin", roles: ["SUPER_ADMIN"] },
];

export type DemoPeople = Record<DemoAccountSpec["key"], string>;

export interface DemoTrack {
  countryId: string;
  examBoardId: string;
  qualificationId: string;
  yearGroupId: string;
  targetExamSessionId: string | null;
}

export interface DemoPeopleInput {
  catalogue: CatalogueIds;
  /** Student tracks: ZIMSEC O-Level for `student`, Cambridge IGCSE for `student2`. */
  tracks: { student: DemoTrack; student2: DemoTrack };
  password?: string;
}

async function ensureAccount(db: PrismaClient, spec: DemoAccountSpec, passwordHash: string, input: DemoPeopleInput, tally: SeedTally): Promise<string> {
  const email = spec.email.toLowerCase();
  const existing = await db.user.findUnique({ where: { emailNormalized: email }, select: { id: true } });
  tally.add("User", !existing);
  if (existing) return existing.id;
  const now = new Date();
  const countryId = input.catalogue.countries.get("ZW") ?? null;
  return db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { emailNormalized: email, emailVerifiedAt: now, passwordHash, passwordUpdatedAt: now, roles: spec.roles, status: "ACTIVE", isDemo: true },
      select: { id: true },
    });
    await tx.profile.create({
      data: {
        userId: user.id,
        firstName: spec.firstName,
        lastName: spec.lastName,
        displayName: `${spec.firstName} ${spec.lastName}`,
        username: spec.username,
        countryId,
        timezone: "Africa/Harare",
        locale: "en",
        termsAcceptedAt: now,
        termsVersion: "dev-demo",
      },
    });
    if (spec.roles.includes("STUDENT")) {
      const track = spec.key === "student2" ? input.tracks.student2 : input.tracks.student;
      const adult = spec.key === "student2";
      await tx.student.create({
        data: {
          userId: user.id,
          ...track,
          abilityLevel: "INTERMEDIATE",
          targetGrade: adult ? "A" : "B",
          onboardingStep: "COMPLETED",
          onboardingCompletedAt: now,
          isMinor: !adult,
          // Minors start PENDING; consent is granted below through the linked parent account (consent guard trigger).
          guardianConsentStatus: adult ? "NOT_REQUIRED" : "PENDING",
        },
      });
    }
    if (spec.roles.includes("PARENT")) await tx.parent.create({ data: { userId: user.id, onboardingCompletedAt: now } });
    if (spec.roles.includes("TEACHER")) await tx.teacher.create({ data: { userId: user.id, onboardingCompletedAt: now } });
    return user.id;
  });
}

/** Creates (or finds) every demo account, the demo school, its class and the parent link. */
export async function seedDemoPeople(db: PrismaClient, input: DemoPeopleInput, tally: SeedTally, log: SeedLog): Promise<DemoPeople> {
  const password = input.password ?? DEFAULT_DEMO_PASSWORD;
  const problems = passwordPolicyErrors(password);
  if (problems.length > 0) throw new Error(`demo password rejected by the password policy: ${problems.join(" ")}`);
  const passwordHash = await hashPassword(password);

  const people = {} as DemoPeople;
  for (const spec of DEMO_ACCOUNTS) people[spec.key] = await ensureAccount(db, spec, passwordHash, input, tally);

  // Parent link (ACTIVE, the student's own consent via a code) and guardian consent through the parent account.
  const openLink = await db.parentStudentLink.findFirst({
    where: { parentUserId: people.parent, studentUserId: people.student, status: { in: ["PENDING", "ACTIVE"] } },
    select: { id: true },
  });
  if (!openLink) {
    const now = new Date();
    await db.parentStudentLink.create({
      data: {
        parentUserId: people.parent,
        studentUserId: people.student,
        status: "ACTIVE",
        relationship: "PARENT",
        initiatedBy: "STUDENT",
        consentBasis: "STUDENT_CODE",
        studentConsentAt: now,
        activatedAt: now,
        createdAt: now,
      },
    });
  }
  tally.add("ParentStudentLink", !openLink);
  const student = await db.student.findUnique({ where: { userId: people.student }, select: { guardianConsentStatus: true } });
  if (student && student.guardianConsentStatus !== "GRANTED") {
    await db.student.update({
      where: { userId: people.student },
      data: { guardianConsentStatus: "GRANTED", guardianConsentMethod: "PARENT_ACCOUNT", guardianConsentByUserId: people.parent, guardianConsentAt: new Date() },
    });
  }

  // Demo school with a teacher, a school admin and the first student.
  const countryId = input.catalogue.countries.get("ZW");
  if (!countryId) throw new Error("demo: country ZW missing");
  const existingSchool = await db.school.findUnique({ where: { slug: "demo-secondary-school" }, select: { id: true } });
  const school =
    existingSchool ??
    (await db.school.create({
      data: {
        name: "Demo Secondary School (development only)",
        slug: "demo-secondary-school",
        countryId,
        town: "Harare",
        type: "GOVERNMENT",
        status: "ACTIVE",
        verifiedAt: new Date(),
        verifiedById: people.admin,
        createdById: people.schoolAdmin,
        isDemo: true,
      },
      select: { id: true },
    }));
  tally.add("School", !existingSchool);
  const memberships: [string, "SCHOOL_ADMIN" | "TEACHER" | "STUDENT"][] = [
    [people.schoolAdmin, "SCHOOL_ADMIN"],
    [people.teacher, "TEACHER"],
    [people.student, "STUDENT"],
  ];
  for (const [userId, role] of memberships) {
    const existing = await db.schoolMember.findUnique({ where: { schoolId_userId_role: { schoolId: school.id, userId, role } }, select: { id: true } });
    if (!existing) {
      await db.schoolMember.create({ data: { schoolId: school.id, userId, role, status: "ACTIVE", source: "ADDED_BY_STAFF", joinedAt: new Date() } });
    }
    tally.add("SchoolMember", !existing);
  }
  await db.student.updateMany({ where: { userId: people.student, schoolId: null }, data: { schoolId: school.id } });
  log.info(`demo: ${DEMO_ACCOUNTS.length} accounts, demo school and parent link ready`);
  return people;
}

/** The demo Form 4 class (teacher + first student), created once the demo subject exists. */
export async function seedDemoClass(
  db: PrismaClient,
  input: { people: DemoPeople; subjectId: string; qualificationId: string; yearGroupId: string },
  tally: SeedTally,
): Promise<void> {
  const school = await db.school.findUnique({ where: { slug: "demo-secondary-school" }, select: { id: true } });
  if (!school) throw new Error("demo: school missing");
  const existing = await db.class.findUnique({ where: { joinCode: "DEMO4A" }, select: { id: true } });
  tally.add("Class", !existing);
  if (existing) return;
  await db.class.create({
    data: {
      schoolId: school.id,
      name: "Form 4A Mathematics (demo)",
      description: "Development demo class.",
      subjectId: input.subjectId,
      qualificationId: input.qualificationId,
      yearGroupId: input.yearGroupId,
      academicYear: "2026",
      joinCode: "DEMO4A",
      createdById: input.people.teacher,
      teachers: { create: { userId: input.people.teacher, role: "LEAD" } },
      members: { create: { userId: input.people.student, status: "ACTIVE", source: "ADDED_BY_STAFF" } },
    },
  });
}

/** Enrols a demo student in a subject, pinned to the given (published) syllabus version (§26). */
export async function ensureDemoEnrollment(
  db: PrismaClient,
  input: { userId: string; subjectId: string; syllabusId: string; targetExamSessionId: string | null; targetGrade: string },
  tally: SeedTally,
): Promise<void> {
  const existing = await db.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId: input.userId, subjectId: input.subjectId } }, select: { id: true } });
  tally.add("SubjectEnrollment", !existing);
  if (existing) return;
  await db.subjectEnrollment.create({
    data: {
      userId: input.userId,
      subjectId: input.subjectId,
      syllabusId: input.syllabusId,
      targetExamSessionId: input.targetExamSessionId,
      status: "ACTIVE",
      enrolledVia: "SELF",
      abilityLevel: "INTERMEDIATE",
      targetGrade: input.targetGrade,
    },
  });
}
