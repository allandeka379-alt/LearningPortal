import type { PrismaClient } from "@/generated/prisma/client";
import { addDays, localDateString } from "@/lib/dates";
import { hashPassword } from "@/server/auth/passwords";
import { passwordPolicyErrors } from "@/server/auth/password-policy";
import { enqueueAnnouncementFanout } from "@/server/cms/announcements/fanout";
import { renderContent } from "@/server/content/render";
import { createAssignment } from "@/server/teaching/assignments";
import { CLASS_ANNOUNCEMENT_AUDIENCE } from "@/server/teaching/announcements";
import type { SeedLog, SeedTally } from "../util";
import type { DemoPeople } from "./people";

/**
 * DEV ONLY: the demo school's provisioned roster and class work (§22, §23), so the teacher and school areas have
 * realistic data. Three username students as a roster import creates them (no email or phone of their own, a
 * school-set temporary password they must change at first sign-in: `passwordMustChange`), placed in the demo class
 * and its subject; one lesson assignment set by the demo teacher (through the teaching service, so progress rows,
 * counters and student notifications are real); one class announcement. Idempotent: existing rows are left alone
 * (a roster student who already changed their password keeps it). Usernames and temporary passwords: docs/DEV_SEED.md.
 */

export interface DemoRosterStudent {
  loginUsername: string;
  /** Dev-only temporary password printed on the "slip" (docs/DEV_SEED.md). */
  temporaryPassword: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
}

export const DEMO_ROSTER: readonly DemoRosterStudent[] = [
  { loginUsername: "dss.tmoyo01", temporaryPassword: "msasa-river-4127", firstName: "Tendai", lastName: "Moyo", studentNumber: "DSS-0001" },
  { loginUsername: "dss.rncube02", temporaryPassword: "granite-hill-5381", firstName: "Rudo", lastName: "Ncube", studentNumber: "DSS-0002" },
  { loginUsername: "dss.fchirwa03", temporaryPassword: "zambezi-dawn-6274", firstName: "Farai", lastName: "Chirwa", studentNumber: "DSS-0003" },
];

export const DEMO_ASSIGNMENT_TITLE = "Read before Monday: the first lesson of the topic (demo)";
export const DEMO_ANNOUNCEMENT_TITLE = "Welcome to Form 4A Mathematics (demo)";

const DEMO_SCHOOL_SLUG = "demo-secondary-school";
const DEMO_CLASS_JOIN_CODE = "DEMO4A";

async function ensureRosterStudent(
  db: PrismaClient,
  spec: DemoRosterStudent,
  ctx: { schoolId: string; classId: string; countryId: string; yearGroupId: string; subjectId: string; syllabusId: string },
  tally: SeedTally,
): Promise<string> {
  const existing = await db.user.findUnique({ where: { loginUsername: spec.loginUsername }, select: { id: true } });
  tally.add("User", !existing);
  let userId = existing?.id ?? null;
  if (userId === null) {
    const problems = passwordPolicyErrors(spec.temporaryPassword, { username: spec.loginUsername });
    if (problems.length > 0) throw new Error(`demo roster password for ${spec.loginUsername} rejected: ${problems.join(" ")}`);
    const now = new Date();
    const passwordHash = await hashPassword(spec.temporaryPassword);
    userId = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          loginUsername: spec.loginUsername,
          passwordHash,
          passwordUpdatedAt: now,
          // The school knows this password (printed slip): the student chooses their own at first sign-in.
          passwordMustChange: true,
          roles: ["STUDENT"],
          provisionedBySchoolId: ctx.schoolId,
          signupChannel: "WEB",
          status: "ACTIVE",
          isDemo: true,
        },
        select: { id: true },
      });
      await tx.profile.create({
        data: {
          userId: user.id,
          firstName: spec.firstName,
          lastName: spec.lastName,
          displayName: spec.firstName,
          // Public handle (never the login username or the real name, §20).
          username: `demo_roster_${spec.studentNumber.slice(-2)}`,
          countryId: ctx.countryId,
          timezone: "Africa/Harare",
          locale: "en",
        },
      });
      // Like a roster import: the school is set, onboarding is left to the student (after the password change).
      await tx.student.create({
        data: { userId: user.id, countryId: ctx.countryId, yearGroupId: ctx.yearGroupId, schoolId: ctx.schoolId, isMinor: true, guardianConsentStatus: "PENDING" },
      });
      return user.id;
    });
  }

  const member = await db.schoolMember.findUnique({ where: { schoolId_userId_role: { schoolId: ctx.schoolId, userId, role: "STUDENT" } }, select: { id: true } });
  if (!member) {
    await db.schoolMember.create({
      data: { schoolId: ctx.schoolId, userId, role: "STUDENT", status: "ACTIVE", source: "ROSTER_IMPORT", studentNumber: spec.studentNumber, joinedAt: new Date() },
    });
  }
  tally.add("SchoolMember", !member);
  const classMember = await db.classMember.findUnique({ where: { classId_userId: { classId: ctx.classId, userId } }, select: { userId: true } });
  if (!classMember) await db.classMember.create({ data: { classId: ctx.classId, userId, status: "ACTIVE", source: "ROSTER_IMPORT" } });
  tally.add("ClassMember", !classMember);
  const enrolment = await db.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId: ctx.subjectId } }, select: { id: true } });
  if (!enrolment) {
    await db.subjectEnrollment.create({
      data: { userId, subjectId: ctx.subjectId, syllabusId: ctx.syllabusId, status: "ACTIVE", enrolledVia: "SCHOOL", abilityLevel: "INTERMEDIATE" },
    });
  }
  tally.add("SubjectEnrollment", !enrolment);
  return userId;
}

/** Roster students, a published lesson assignment and a class announcement for the demo class (run after seedDemoClass). */
export async function seedDemoRosterAndWork(
  db: PrismaClient,
  input: { people: DemoPeople; countryId: string; yearGroupId: string; subjectId: string; syllabusId: string; now: Date },
  tally: SeedTally,
  log: SeedLog,
): Promise<void> {
  const school = await db.school.findUnique({ where: { slug: DEMO_SCHOOL_SLUG }, select: { id: true } });
  const cls = await db.class.findUnique({ where: { joinCode: DEMO_CLASS_JOIN_CODE }, select: { id: true } });
  if (!school || !cls) throw new Error("demo: school or class missing (run seedDemoPeople and seedDemoClass first)");
  const ctx = { schoolId: school.id, classId: cls.id, countryId: input.countryId, yearGroupId: input.yearGroupId, subjectId: input.subjectId, syllabusId: input.syllabusId };
  for (const spec of DEMO_ROSTER) await ensureRosterStudent(db, spec, ctx, tally);

  // One published lesson assignment, set by the demo teacher through the teaching service (progress rows, counters and
  // the students' "New work" notifications are real). Due a week from today at 17:00 Harare time.
  const teacher = { userId: input.people.teacher, roles: ["TEACHER" as const] };
  const existingWork = await db.assignment.findFirst({ where: { classId: cls.id, title: DEMO_ASSIGNMENT_TITLE }, select: { id: true } });
  if (!existingWork) {
    const lesson = await db.lesson.findFirst({
      where: { subjectId: input.subjectId, status: "PUBLISHED", draftOfId: null, isDemo: true },
      orderBy: [{ title: "asc" }, { id: "asc" }],
      select: { id: true },
    });
    if (lesson) {
      const due = `${addDays(localDateString(input.now, "Africa/Harare"), 7)}T17:00`;
      await createAssignment(
        teacher,
        {
          classId: cls.id,
          type: "LESSON",
          title: DEMO_ASSIGNMENT_TITLE,
          instructions: "Read the lesson and try its practice questions. Mark it as complete when you are done.",
          lessonId: lesson.id,
          dueAt: due,
          allowLateSubmission: "on",
          publish: "now",
        },
        { now: input.now, timeZone: "Africa/Harare" },
      );
    } else {
      log.warn("demo: no published demo lesson for the class assignment; skipped");
    }
  }
  tally.add("Assignment", !existingWork);

  // A pinned class announcement from the teacher (fanned out to the class by the worker's announcements.fanout job).
  const existingNote = await db.announcement.findFirst({ where: { classId: cls.id, title: DEMO_ANNOUNCEMENT_TITLE }, select: { id: true } });
  if (!existingNote) {
    const body = "Welcome! Our first lesson is set for this week: open **Classes** to see it and its due date.";
    await db.$transaction(async (tx) => {
      const created = await tx.announcement.create({
        data: {
          scope: "CLASS",
          classId: cls.id,
          authorId: input.people.teacher,
          title: DEMO_ANNOUNCEMENT_TITLE,
          body,
          bodyHtml: renderContent(body, { idPrefix: "ann-", baseHeadingLevel: 3 }).html,
          audienceRoles: [...CLASS_ANNOUNCEMENT_AUDIENCE],
          pinned: true,
          notify: true,
          publishedAt: input.now,
          isDemo: true,
        },
        select: { id: true, publishedAt: true },
      });
      await enqueueAnnouncementFanout(tx, { id: created.id, publishedAt: created.publishedAt ?? input.now });
    });
  }
  tally.add("Announcement", !existingNote);
  log.info(`demo: ${DEMO_ROSTER.length} roster students, class assignment and announcement ready`);
}
