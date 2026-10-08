import "server-only";
import { z } from "zod";
import {
  Prisma,
  type AbilityLevel,
  type EnrollmentSource,
  type EnrollmentStatus,
  type Role,
  type SyllabusStatus,
} from "@/generated/prisma/client";
import { localDateFromDateColumn, type LocalDate } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { isEnrollableCatalogueStatus } from "@/server/curriculum/core";
import { getGradeScheme } from "@/server/curriculum/grades";
import { resolveCurrentSyllabus } from "@/server/curriculum/syllabus";
import { db, type DbClient } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { refreshSubjectProgress } from "@/server/progress/service";

/**
 * Subject enrolments (§5 onboarding "select subjects", §26 versioned curriculum, CLAUDE.md rule 8).
 *
 * - A new enrolment PINS a published syllabus version: the version whose effective range contains the target exam
 *   date, else the subject's CURRENT version (`resolveCurrentSyllabus`). The `SubjectEnrollment_pin_guard` trigger
 *   refuses DRAFT and (newly) ARCHIVED versions; the pin is never changed here (moving to a new version is the
 *   explicit, audited version-move flow).
 * - Rows are never deleted (§4.1 "learning history is never deleted"): {@link unenrol} sets DROPPED; enrolling again
 *   re-activates the same row (and keeps its pinned version and history).
 * - Defaults for ability, target grade and target exam come from the student's onboarding answers (Student row).
 * - Each new / re-activated enrolment gets its SubjectProgress row computed in the same transaction, so dashboards
 *   show honest zeros and "topics remaining" from the first visit (§50).
 */

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface EnrollmentActor {
  userId: string;
  roles: readonly Role[];
}

const uuid = z.uuid();
const abilitySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
const targetGradeSchema = z.string().trim().min(1).max(8);

export const enrolInSubjectsSchema = z.strictObject({
  subjectIds: z.array(uuid).min(1).max(20),
  targetExamSessionId: uuid.optional(),
  targetGrade: targetGradeSchema.optional(),
  abilityLevel: abilitySchema.optional(),
});
export type EnrolInSubjectsInput = z.input<typeof enrolInSubjectsSchema>;

export const updateEnrollmentSchema = z
  .strictObject({
    targetExamSessionId: uuid.nullable().optional(),
    targetGrade: targetGradeSchema.nullable().optional(),
    abilityLevel: abilitySchema.nullable().optional(),
    /** Award route inside the PINNED version (e.g. IGCSE Core vs Extended). */
    routeId: uuid.nullable().optional(),
    /** Pause / resume (DROPPED goes through {@link unenrol}). */
    status: z.enum(["ACTIVE", "PAUSED"]).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: "Nothing to update." });
export type UpdateEnrollmentInput = z.input<typeof updateEnrollmentSchema>;

/** An enrolment as the student sees it. */
export interface EnrollmentView {
  id: string;
  status: EnrollmentStatus;
  enrolledVia: EnrollmentSource;
  subject: { id: string; name: string; slug: string; qualification: { id: string; name: string; shortName: string | null } };
  syllabus: { id: string; title: string; versionLabel: string; status: SyllabusStatus };
  route: { id: string; code: string; name: string } | null;
  targetExamSession: { id: string; name: string; startsOn: LocalDate; isProvisional: boolean } | null;
  targetGrade: string | null;
  abilityLevel: AbilityLevel | null;
  diagnosticCompletedAt: Date | null;
  createdAt: Date;
}

const VIEW_SELECT = {
  id: true,
  status: true,
  enrolledVia: true,
  targetGrade: true,
  abilityLevel: true,
  diagnosticCompletedAt: true,
  createdAt: true,
  subject: { select: { id: true, name: true, slug: true, qualification: { select: { id: true, name: true, shortName: true } } } },
  syllabus: { select: { id: true, title: true, versionLabel: true, status: true } },
  route: { select: { id: true, code: true, name: true } },
  targetExamSession: { select: { id: true, name: true, startsOn: true, isProvisional: true } },
} as const satisfies Prisma.SubjectEnrollmentSelect;

type ViewRow = Prisma.SubjectEnrollmentGetPayload<{ select: typeof VIEW_SELECT }>;

function toView(row: ViewRow): EnrollmentView {
  return {
    ...row,
    targetExamSession: row.targetExamSession
      ? { ...row.targetExamSession, startsOn: localDateFromDateColumn(row.targetExamSession.startsOn) }
      : null,
  };
}

function assertStudent(actor: EnrollmentActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) {
    throw AppError.forbidden("Only students can enrol in subjects.");
  }
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/** Validates `grade` against the qualification's default grade scheme when one is configured (§5 "target grade"). */
async function assertValidTargetGrade(qualificationId: string, grade: string): Promise<void> {
  const scheme = await getGradeScheme(qualificationId);
  if (scheme && !scheme.bands.some((band) => band.grade === grade)) {
    throw AppError.validation({ targetGrade: [`"${grade}" is not a grade of this qualification.`] });
  }
}

const TX_OPTIONS = { maxWait: 10_000, timeout: 20_000 } as const;

/**
 * Enrols the student in subjects (§5), pinning each subject's syllabus version (§26). Idempotent: an ACTIVE enrolment
 * is returned unchanged; a PAUSED or DROPPED one is re-activated (history and pinned version kept).
 *
 * @throws AppError FORBIDDEN (not a student) | VALIDATION (unknown / unavailable subject, session of another
 *         qualification, no published syllabus, unknown grade)
 */
export async function enrolInSubjects(actor: EnrollmentActor, input: EnrolInSubjectsInput, now: Date = new Date()): Promise<EnrollmentView[]> {
  assertStudent(actor);
  const parsed = parse(enrolInSubjectsSchema, input);
  const subjectIds = [...new Set(parsed.subjectIds)];

  const [subjects, student, session] = await Promise.all([
    db.subject.findMany({ where: { id: { in: subjectIds } }, select: { id: true, name: true, qualificationId: true, catalogueStatus: true } }),
    db.student.findUnique({ where: { userId: actor.userId }, select: { abilityLevel: true, targetGrade: true, targetExamSessionId: true } }),
    parsed.targetExamSessionId
      ? db.examSession.findUnique({ where: { id: parsed.targetExamSessionId }, select: { id: true, qualificationId: true, status: true, startsOn: true } })
      : Promise.resolve(null),
  ]);
  const byId = new Map(subjects.map((s) => [s.id, s]));
  const fieldErrors: Record<string, string[]> = {};
  subjectIds.forEach((id, index) => {
    const subject = byId.get(id);
    if (!subject) fieldErrors[`subjectIds.${index}`] = ["Subject not found."];
    else if (!isEnrollableCatalogueStatus(subject.catalogueStatus)) fieldErrors[`subjectIds.${index}`] = [`${subject.name} is not available yet.`];
  });
  if (parsed.targetExamSessionId) {
    if (!session || session.status !== "PUBLISHED") fieldErrors.targetExamSessionId = ["Examination session not found."];
    else if (subjects.some((s) => s.qualificationId !== session.qualificationId)) {
      fieldErrors.targetExamSessionId = ["This examination session does not apply to every selected subject."];
    }
  }
  if (Object.keys(fieldErrors).length > 0) throw AppError.validation(fieldErrors);

  // The onboarding target exam applies only to subjects of its own qualification.
  const defaultSession =
    !parsed.targetExamSessionId && student?.targetExamSessionId
      ? await db.examSession.findUnique({ where: { id: student.targetExamSessionId }, select: { id: true, qualificationId: true, status: true, startsOn: true } })
      : null;
  const targetGrade = parsed.targetGrade ?? null;
  if (targetGrade) {
    for (const qualificationId of new Set(subjects.map((s) => s.qualificationId))) await assertValidTargetGrade(qualificationId, targetGrade);
  }

  const plans: { subjectId: string; syllabusId: string; routeId: string | null; sessionId: string | null }[] = [];
  for (const subjectId of subjectIds) {
    const subject = byId.get(subjectId);
    if (!subject) continue;
    const sessionForSubject =
      session && session.qualificationId === subject.qualificationId
        ? session
        : defaultSession && defaultSession.status === "PUBLISHED" && defaultSession.qualificationId === subject.qualificationId
          ? defaultSession
          : null;
    const syllabus = await resolveCurrentSyllabus(subjectId, sessionForSubject ? localDateFromDateColumn(sessionForSubject.startsOn) : null);
    if (!syllabus) throw AppError.validation({ subjectIds: [`${subject.name} has no published syllabus yet.`] });
    const route = await db.syllabusRoute.findFirst({ where: { syllabusId: syllabus.id, isDefault: true }, select: { id: true } });
    plans.push({ subjectId, syllabusId: syllabus.id, routeId: route?.id ?? null, sessionId: sessionForSubject?.id ?? null });
  }

  const ids = await db.$transaction(async (tx) => {
    const out: string[] = [];
    for (const plan of plans) {
      const id = await ensureEnrollmentTx(tx, actor.userId, plan.subjectId, {
        source: "SELF",
        now,
        pin: plan,
        defaults: {
          abilityLevel: parsed.abilityLevel ?? student?.abilityLevel ?? null,
          targetGrade: targetGrade ?? student?.targetGrade ?? null,
        },
      });
      out.push(id);
    }
    return out;
  }, TX_OPTIONS);

  const rows = await db.subjectEnrollment.findMany({ where: { id: { in: ids } }, select: VIEW_SELECT });
  const order = new Map(ids.map((id, index) => [id, index]));
  return rows.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)).map(toView);
}

export interface EnsureEnrollmentOptions {
  source: EnrollmentSource;
  now?: Date;
  /** Pre-resolved pin (else the subject's CURRENT version and its default route). */
  pin?: { syllabusId: string; routeId: string | null; sessionId: string | null };
  defaults?: { abilityLevel?: AbilityLevel | null; targetGrade?: string | null };
}

/**
 * The student's enrolment in a subject inside the caller's transaction, creating it (pinning the CURRENT version) or
 * re-activating a PAUSED / DROPPED one when needed: every per-subject rollup hangs off an enrolment (schema doc), so
 * learning activity always happens inside one. Returns the enrolment id. Concurrency-safe (ON CONFLICT DO NOTHING).
 *
 * @throws AppError VALIDATION when the subject has no published syllabus version
 */
export async function ensureEnrollmentTx(tx: DbClient, userId: string, subjectId: string, options: EnsureEnrollmentOptions): Promise<string> {
  const now = options.now ?? new Date();
  const existing = await tx.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId } }, select: { id: true, status: true } });
  if (existing) {
    if (existing.status !== "ACTIVE") {
      await tx.subjectEnrollment.update({ where: { id: existing.id }, data: { status: "ACTIVE", statusChangedAt: now } });
      await refreshSubjectProgress(tx, userId, subjectId, { now });
    }
    return existing.id;
  }
  let pin = options.pin;
  if (!pin) {
    const syllabus = await resolveCurrentSyllabus(subjectId, null, tx);
    if (!syllabus) throw AppError.validation({ subjectId: ["This subject has no published syllabus yet."] });
    const route = await tx.syllabusRoute.findFirst({ where: { syllabusId: syllabus.id, isDefault: true }, select: { id: true } });
    pin = { syllabusId: syllabus.id, routeId: route?.id ?? null, sessionId: null };
  }
  await tx.subjectEnrollment.createMany({
    data: [
      {
        userId,
        subjectId,
        syllabusId: pin.syllabusId,
        routeId: pin.routeId,
        targetExamSessionId: pin.sessionId,
        abilityLevel: options.defaults?.abilityLevel ?? null,
        targetGrade: options.defaults?.targetGrade ?? null,
        enrolledVia: options.source,
        syllabusPinnedAt: now,
        createdAt: now,
      },
    ],
    skipDuplicates: true,
  });
  const created = await tx.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId } }, select: { id: true } });
  await refreshSubjectProgress(tx, userId, subjectId, { now });
  return created.id;
}

/** The student's enrolments (ACTIVE and PAUSED by default; DROPPED with `includeDropped`). */
export async function listEnrollments(actor: EnrollmentActor, options: { includeDropped?: boolean } = {}): Promise<EnrollmentView[]> {
  assertStudent(actor);
  const statuses: EnrollmentStatus[] = options.includeDropped ? ["ACTIVE", "PAUSED", "COMPLETED", "DROPPED"] : ["ACTIVE", "PAUSED"];
  const rows = await db.subjectEnrollment.findMany({
    where: { userId: actor.userId, status: { in: statuses } },
    select: VIEW_SELECT,
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
  });
  return rows.map(toView);
}

async function ownEnrollment(actor: EnrollmentActor, subjectId: string) {
  if (!uuid.safeParse(subjectId).success) throw AppError.validation({ subjectId: ["Invalid subject."] });
  const row = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId } },
    select: { id: true, status: true, syllabusId: true, subject: { select: { qualificationId: true } } },
  });
  if (!row) throw AppError.notFound("You're not enrolled in this subject.");
  return row;
}

/**
 * Updates the student's per-subject choices (§5): target exam session (same qualification), target grade, ability,
 * route inside the pinned version, or pause / resume. The pinned syllabus version never changes here.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (not enrolled) | VALIDATION
 */
export async function updateEnrollment(actor: EnrollmentActor, subjectId: string, input: UpdateEnrollmentInput, now: Date = new Date()): Promise<EnrollmentView> {
  assertStudent(actor);
  const parsed = parse(updateEnrollmentSchema, input);
  const enrollment = await ownEnrollment(actor, subjectId);
  if (enrollment.status === "DROPPED" && parsed.status === undefined) {
    throw AppError.conflict("Add this subject again before changing it.");
  }
  const data: Prisma.SubjectEnrollmentUncheckedUpdateInput = {};
  if (parsed.targetExamSessionId !== undefined) {
    if (parsed.targetExamSessionId !== null) {
      const session = await db.examSession.findUnique({ where: { id: parsed.targetExamSessionId }, select: { qualificationId: true, status: true } });
      if (!session || session.status !== "PUBLISHED" || session.qualificationId !== enrollment.subject.qualificationId) {
        throw AppError.validation({ targetExamSessionId: ["Choose an examination session of this subject's qualification."] });
      }
    }
    data.targetExamSessionId = parsed.targetExamSessionId;
  }
  if (parsed.targetGrade !== undefined) {
    if (parsed.targetGrade !== null) await assertValidTargetGrade(enrollment.subject.qualificationId, parsed.targetGrade);
    data.targetGrade = parsed.targetGrade;
  }
  if (parsed.abilityLevel !== undefined) data.abilityLevel = parsed.abilityLevel;
  if (parsed.routeId !== undefined) {
    if (parsed.routeId !== null) {
      const route = await db.syllabusRoute.findFirst({ where: { id: parsed.routeId, syllabusId: enrollment.syllabusId }, select: { id: true } });
      if (!route) throw AppError.validation({ routeId: ["Choose a route of your syllabus version."] });
    }
    data.routeId = parsed.routeId;
  }
  if (parsed.status !== undefined && parsed.status !== enrollment.status) {
    data.status = parsed.status;
    data.statusChangedAt = now;
  }
  await db.$transaction(async (tx) => {
    await tx.subjectEnrollment.update({ where: { id: enrollment.id }, data });
    // Route and exam year change which topics are in scope.
    if (data.routeId !== undefined || data.targetExamSessionId !== undefined || data.status === "ACTIVE") {
      await refreshSubjectProgress(tx, actor.userId, subjectId, { now });
    }
  }, TX_OPTIONS);
  return toView(await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrollment.id }, select: VIEW_SELECT }));
}

/**
 * Removes a subject from the student's list (soft: status DROPPED; history, mastery and progress are kept, §4.1).
 * Idempotent.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (not enrolled)
 */
export async function unenrol(actor: EnrollmentActor, subjectId: string, now: Date = new Date()): Promise<EnrollmentView> {
  assertStudent(actor);
  const enrollment = await ownEnrollment(actor, subjectId);
  if (enrollment.status !== "DROPPED") {
    await db.subjectEnrollment.update({ where: { id: enrollment.id }, data: { status: "DROPPED", statusChangedAt: now } });
  }
  return toView(await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrollment.id }, select: VIEW_SELECT }));
}

/** True when a Prisma error is a unique violation (used by callers racing to enrol). */
export function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}
