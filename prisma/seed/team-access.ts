import type { PrismaClient, Role } from "@/generated/prisma/client";
import type { CatalogueIds } from "./catalogue";
import type { SeedLog, SeedTally } from "./util";

/**
 * Production-safe team access accounts requested by the owner. The emails are fixed; the shared password is stored as
 * an Argon2id PHC hash, not as readable source text. Re-running the seed is idempotent and only resets the password
 * timestamp when the stored hash differs.
 */

export interface TeamAccessAccountSpec {
  key: "student" | "teacher" | "admin";
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export const TEAM_ACCESS_ACCOUNTS: readonly TeamAccessAccountSpec[] = [
  { key: "student", email: "student@bvunzohub.com", firstName: "Team", lastName: "Student", roles: ["STUDENT"] },
  { key: "teacher", email: "teacher@bvunzohub.com", firstName: "Team", lastName: "Teacher", roles: ["TEACHER"] },
  { key: "admin", email: "admin@bvunzohub.com", firstName: "Team", lastName: "Admin", roles: ["ADMIN"] },
];

const TEAM_ACCESS_PASSWORD_HASH =
  "$argon2id$v=19$m=19456,t=2,p=1$rsZHUlrUeR8Fwq336igzxA$J5D/yGqHqCANbBBqtkcuvmU32VQiGMAdCFxG9DhP1S4";

function sameRoles(left: readonly Role[], right: readonly Role[]): boolean {
  if (left.length !== right.length) return false;
  const wanted = new Set(right);
  return left.every((role) => wanted.has(role));
}

async function defaultStudentTrack(db: PrismaClient, catalogue: CatalogueIds): Promise<{
  countryId: string;
  examBoardId: string;
  qualificationId: string;
  yearGroupId: string;
  targetExamSessionId: string | null;
}> {
  const countryId = catalogue.countries.get("ZW");
  const examBoardId = catalogue.boards.get("zimsec");
  const qualificationId = catalogue.qualifications.get("zimsec/o-level");
  const yearGroupId = catalogue.yearGroups.get("ZW/F4");
  if (!countryId || !examBoardId || !qualificationId || !yearGroupId) {
    throw new Error("team access seed: ZW / ZIMSEC O-Level / Form 4 catalogue rows are missing");
  }
  const session = await db.examSession.findFirst({
    where: { qualificationId, status: "PUBLISHED" },
    select: { id: true },
    orderBy: [{ startsOn: "asc" }, { id: "asc" }],
  });
  return { countryId, examBoardId, qualificationId, yearGroupId, targetExamSessionId: session?.id ?? null };
}

async function ensureTeamAccount(
  db: PrismaClient,
  spec: TeamAccessAccountSpec,
  catalogue: CatalogueIds,
  now: Date,
  tally: SeedTally,
): Promise<void> {
  const email = spec.email.toLowerCase();
  const existing = await db.user.findUnique({
    where: { emailNormalized: email },
    select: { id: true, roles: true, passwordHash: true },
  });
  const created = !existing;
  tally.add("User", created);

  const rolesChanged = existing ? !sameRoles(existing.roles, spec.roles) : false;
  const passwordChanged = existing ? existing.passwordHash !== TEAM_ACCESS_PASSWORD_HASH : true;
  const profile = {
    firstName: spec.firstName,
    lastName: spec.lastName,
    displayName: `${spec.firstName} ${spec.lastName}`,
    countryId: catalogue.countries.get("ZW") ?? null,
    timezone: "Africa/Harare",
    locale: "en",
    termsAcceptedAt: now,
    termsVersion: "team-access",
  };
  const studentTrack = spec.roles.includes("STUDENT") ? await defaultStudentTrack(db, catalogue) : null;

  await db.$transaction(async (tx) => {
    const user = existing
      ? await tx.user.update({
          where: { id: existing.id },
          data: {
            status: "ACTIVE",
            statusReason: null,
            lockedUntil: null,
            passwordMustChange: false,
            roles: spec.roles,
            emailVerifiedAt: now,
            ...(passwordChanged ? { passwordHash: TEAM_ACCESS_PASSWORD_HASH, passwordUpdatedAt: now } : {}),
          },
          select: { id: true },
        })
      : await tx.user.create({
          data: {
            emailNormalized: email,
            emailVerifiedAt: now,
            passwordHash: TEAM_ACCESS_PASSWORD_HASH,
            passwordUpdatedAt: now,
            passwordMustChange: false,
            roles: spec.roles,
            status: "ACTIVE",
            isDemo: false,
            signupChannel: "WEB",
          },
          select: { id: true },
        });

    if (!created && (rolesChanged || passwordChanged)) {
      await tx.session.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: now, revokedReason: "team_access_seed" },
      });
    }

    await tx.profile.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...profile },
      update: profile,
    });

    if (studentTrack) {
      const student = {
        ...studentTrack,
        abilityLevel: "INTERMEDIATE" as const,
        targetGrade: "B",
        onboardingStep: "COMPLETED" as const,
        onboardingCompletedAt: now,
        isMinor: false,
        guardianConsentStatus: "NOT_REQUIRED" as const,
      };
      await tx.student.upsert({
        where: { userId: user.id },
        create: { userId: user.id, ...student },
        update: student,
      });
    }

    if (spec.roles.includes("TEACHER")) {
      await tx.teacher.upsert({
        where: { userId: user.id },
        create: { userId: user.id, onboardingCompletedAt: now },
        update: { onboardingCompletedAt: now },
      });
    }
  });
}

export async function seedTeamAccessAccounts(
  db: PrismaClient,
  catalogue: CatalogueIds,
  now: Date,
  tally: SeedTally,
  log: SeedLog,
): Promise<void> {
  for (const spec of TEAM_ACCESS_ACCOUNTS) await ensureTeamAccount(db, spec, catalogue, now, tally);
  log.info(`team access accounts ready: ${TEAM_ACCESS_ACCOUNTS.map((account) => account.email).join(", ")}`);
}
