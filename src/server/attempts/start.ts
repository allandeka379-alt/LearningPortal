import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { Prisma, type AttemptMode, type ContentAccessTier } from "@/generated/prisma/client";
import type { LimitFeature } from "@/lib/billing/entitlements";
import {
  assertEntitlement,
  assertWithinLimit,
  assignmentWorkSponsored,
  canAccessSubjectContent,
  EntitlementRequiredError,
  LimitReachedError,
} from "@/server/billing/entitlements";
import { assertWithinLimitInTx, isAttemptLimitFeature, limitWindow, usageFor } from "@/server/billing/usage";
import { isEnrollableCatalogueStatus } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { ensureEnrollmentTx } from "@/server/enrollment/service";
import { autoSubmitAt, computeDeadline } from "@/server/exams/timer";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getQuestionsForAttempt, updateQuestionStats, type AttemptQuestion, type QuestionTenancy } from "@/server/questions";
import { activityChannel, assertLearner, parseInput, safeZone, TX_OPTIONS, uuidSchema } from "./context";
import {
  ATTEMPT_MODES,
  ATTEMPT_ORIGINS,
  AUTO_SUBMIT_JOB,
  DIFFICULTY_CHOICES,
  MAX_ATTEMPT_QUESTIONS,
  MAX_GENERATED_QUESTIONS,
  assessmentAllowed,
  assessmentRequired,
  estimateTimeLimitSeconds,
  extraTimeMultiplier,
  feedbackModeFor,
  gatesFor,
  initialDifficultyFor,
  modeMatchesAssessmentKind,
  questionCountFor,
  toDifficultyMode,
  type AttemptConfig,
  type DifficultyChoice,
} from "./policy";
import { getAttemptForStudent } from "./read";
import {
  dueRetestTopics,
  expandTopicScope,
  planAssessment,
  planDiagnostic,
  planGenerated,
  planLessonCheck,
  previouslySeen,
  resolveDailyQuestion,
  type PlannedSection,
  type PlannedSlot,
  type SelectionPlan,
} from "./selection";
import type { LearnerActor, StartAttemptInput, StartedAttempt } from "./types";
import { withAttemptThrottle } from "./throttle";

/**
 * Starting an attempt (§10 practice builder, §12 tests and mocks, §46 daily question, §52 diagnostic, §22 assignment
 * work). Order of operations:
 *
 * 1. validate the request per mode; resume instead of duplicating: the same idempotency key, the open attempt of an
 *    assessment (one IN_PROGRESS per user and assessment, partial unique index) or today's daily-question attempt;
 * 2. plan gates (CLAUDE.md rule 9, ./policy `gatesFor`): features with `assertEntitlement`, numeric limits with the
 *    usage counters + `assertWithinLimit` (practice sessions are capped at the remaining daily allowance); assignment
 *    work is exempt only when the class's tenant sponsors it (`assignmentWorkSponsored`), otherwise it is gated, uses
 *    the student's own question pool and is stored with `config.planGated` so it counts toward their allowances;
 * 3. make sure the student is enrolled (pins the syllabus version, §26) and select questions (./selection);
 * 4. server deadline for timed modes (`computeDeadline`, extra-time accommodation, assignment close), then ONE
 *    transaction: AssessmentAttempt + sections + every QuestionAttempt slot (position order, question revision,
 *    marks, difficulty, primary topic in the pinned version), QuestionStats `presented`, the `exams.autoSubmit` job at
 *    deadline + late-sync grace, assignment progress.
 *
 * Timestamps are written from the server clock in JS (startedAt = lastSavedAt = now), so the timer CHECKs compare like
 * with like.
 */

const startSchema = z
  .strictObject({
    mode: z.enum(ATTEMPT_MODES),
    subjectId: uuidSchema,
    topicIds: z.array(uuidSchema).max(50).optional(),
    count: z.int().min(1).max(MAX_GENERATED_QUESTIONS).optional(),
    difficulty: z.enum(DIFFICULTY_CHOICES).optional(),
    assessmentId: uuidSchema.optional(),
    assignmentId: uuidSchema.optional(),
    lessonId: uuidSchema.optional(),
    dailyQuestionId: uuidSchema.optional(),
    timeLimitMinutes: z.int().min(5).max(240).optional(),
    idempotencyKey: z.string().regex(/^[A-Za-z0-9_-]{8,64}$/).optional(),
    origin: z.enum(ATTEMPT_ORIGINS).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.assessmentId && !assessmentAllowed(value.mode)) {
      ctx.addIssue({ code: "custom", path: ["assessmentId"], message: "This mode does not use an assessment." });
    }
    if (assessmentRequired(value.mode) && !value.assessmentId && !value.assignmentId) {
      ctx.addIssue({ code: "custom", path: ["assessmentId"], message: "Choose a test to start." });
    }
    if (value.mode === "LESSON_CHECK" && !value.lessonId) {
      ctx.addIssue({ code: "custom", path: ["lessonId"], message: "Choose a lesson." });
    }
  });

const practiceConfigSchema = z.looseObject({
  questionCount: z.int().min(1).max(MAX_GENERATED_QUESTIONS),
  difficulty: z.enum(DIFFICULTY_CHOICES),
  topicIds: z.array(uuidSchema).max(50),
  timeLimitSeconds: z.int().min(60).max(4 * 3600).optional(),
});

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** An attempt to resume instead of creating a duplicate, if any. */
async function findResumable(
  client: DbClient,
  userId: string,
  input: { idempotencyKey?: string; assessmentId?: string | null; dailyQuestionId?: string | null },
): Promise<string | null> {
  if (input.idempotencyKey) {
    const byKey = await client.assessmentAttempt.findUnique({
      where: { userId_idempotencyKey: { userId, idempotencyKey: input.idempotencyKey } },
      select: { id: true },
    });
    if (byKey) return byKey.id;
  }
  if (input.assessmentId) {
    const open = await client.assessmentAttempt.findFirst({ where: { userId, assessmentId: input.assessmentId, status: "IN_PROGRESS" }, select: { id: true } });
    if (open) return open.id;
  }
  if (input.dailyQuestionId) {
    const daily = await client.assessmentAttempt.findUnique({
      where: { dailyQuestionId_userId: { dailyQuestionId: input.dailyQuestionId, userId } },
      select: { id: true },
    });
    if (daily) return daily.id;
  }
  return null;
}

async function resumed(actor: LearnerActor, attemptId: string, now: Date): Promise<StartedAttempt> {
  return { attempt: await getAttemptForStudent(actor, attemptId, { now }), resumed: true, shortfall: 0 };
}

/** The numeric allowance checked by {@link applyGates}: `limit` / `remaining` null = unlimited. */
interface GateAllowance {
  feature: LimitFeature;
  limit: number | null;
  remaining: number | null;
}

/** Applies the plan gates (rule 9) and returns the numeric allowance checked (null = none checked). */
async function applyGates(
  actor: LearnerActor,
  mode: AttemptMode,
  context: { subjectId: string; syllabusId: string | null; accessTier: ContentAccessTier | null; planExempt: boolean; timeZone: string; now: Date },
): Promise<GateAllowance | null> {
  const gates = gatesFor(mode, { accessTier: context.accessTier, planExempt: context.planExempt });
  const subjectContext = { subjectId: context.subjectId, syllabusId: context.syllabusId };
  for (const feature of gates.features) await assertEntitlement(actor, feature, subjectContext);
  if (gates.needsSubjectContent && !(await canAccessSubjectContent(actor.userId, context.subjectId, { syllabusId: context.syllabusId }))) {
    throw new EntitlementRequiredError("lessons.full");
  }
  if (!gates.limit) return null;
  const used = await usageFor(actor.userId, gates.limit, context.timeZone, context.now);
  const check = await assertWithinLimit(actor, gates.limit, used, {
    ...subjectContext,
    resetsAt: limitWindow(gates.limit, context.now, context.timeZone).end,
  });
  return { feature: gates.limit, limit: check.limit, remaining: check.remaining };
}

/**
 * Starts (or resumes) an attempt — see the module header. Returns the student-safe view of the attempt.
 *
 * @throws AppError VALIDATION (bad input) | NOT_FOUND (unknown subject / assessment / lesson / daily question, or no
 *         published questions for the selection) | FORBIDDEN (not a student, not assigned) | CONFLICT (attempts used
 *         up, assignment closed) | ENTITLEMENT_REQUIRED | QUOTA_EXCEEDED
 */
export async function startAttempt(actor: LearnerActor, input: StartAttemptInput, options: { now?: Date } = {}): Promise<StartedAttempt> {
  assertLearner(actor);
  // Per-student throttles before any query, lock or transaction (./throttle.ts; AI-04, PAY-3). RATE_LIMITED when over.
  return withAttemptThrottle(actor.userId, "start", () => startAttemptNow(actor, input, options));
}

async function startAttemptNow(actor: LearnerActor, input: StartAttemptInput, options: { now?: Date }): Promise<StartedAttempt> {
  assertLearner(actor);
  const parsed = parseInput(startSchema, input);
  const now = options.now ?? new Date();
  const userId = actor.userId;

  const resumable = await findResumable(db, userId, { ...(parsed.idempotencyKey ? { idempotencyKey: parsed.idempotencyKey } : {}) });
  if (resumable) return resumed(actor, resumable, now);

  const [subject, student, profile] = await Promise.all([
    db.subject.findUnique({ where: { id: parsed.subjectId }, select: { id: true, name: true, qualificationId: true, catalogueStatus: true } }),
    db.student.findUnique({ where: { userId }, select: { examExtraTimePercent: true } }),
    actor.timeZone ? Promise.resolve(null) : db.profile.findUnique({ where: { userId }, select: { timezone: true } }),
  ]);
  if (!subject) throw AppError.notFound("Subject not found.");
  const timeZone = safeZone(actor.timeZone ?? profile?.timezone);

  // --- assignment work (§22) ---
  let mode: AttemptMode = parsed.mode;
  let assessmentId = parsed.assessmentId ?? null;
  let assignment: {
    id: string;
    closesAt: Date | null;
    dueAt: Date | null;
    schoolId: string | null;
    createdById: string;
    /** The class's tenant pays for this work: the student's own plan gates and allowances do not apply. */
    sponsored: boolean;
    practice: z.output<typeof practiceConfigSchema> | null;
  } | null = null;
  if (parsed.assignmentId) {
    const row = await db.assignment.findUnique({
      where: { id: parsed.assignmentId },
      select: {
        id: true,
        subjectId: true,
        type: true,
        status: true,
        publishedAt: true,
        closesAt: true,
        dueAt: true,
        allowLateSubmission: true,
        maxAttempts: true,
        assessmentId: true,
        practiceConfig: true,
        createdById: true,
        class: { select: { schoolId: true, createdById: true } },
        progress: { where: { userId }, select: { status: true } },
      },
    });
    if (!row || row.progress.length === 0) throw AppError.notFound("Assignment not found.");
    if (row.status !== "PUBLISHED" || !row.publishedAt || row.publishedAt.getTime() > now.getTime()) throw AppError.notFound("Assignment not found.");
    if (row.subjectId !== subject.id) throw AppError.validation({ subjectId: ["This assignment belongs to another subject."] });
    if (row.closesAt && row.closesAt.getTime() <= now.getTime()) throw AppError.conflict("This assignment is closed.");
    if (row.dueAt && row.dueAt.getTime() < now.getTime() && !row.allowLateSubmission) throw AppError.conflict("This assignment is past its due date.");
    if (row.type === "LESSON") throw AppError.validation({ assignmentId: ["Lesson assignments are completed by reading the lesson."] });
    if (row.maxAttempts !== null) {
      const used = await db.assessmentAttempt.count({ where: { userId, assignmentId: row.id, status: { notIn: ["ABANDONED", "EXPIRED"] } } });
      if (used >= row.maxAttempts) throw AppError.conflict("You've used all attempts for this assignment.");
    }
    let practice: z.output<typeof practiceConfigSchema> | null = null;
    if (row.type === "ASSESSMENT") {
      if (assessmentId && assessmentId !== row.assessmentId) throw AppError.validation({ assessmentId: ["This test is not the assigned one."] });
      assessmentId = row.assessmentId;
    } else {
      const config = practiceConfigSchema.safeParse(row.practiceConfig);
      if (!config.success) throw new AppError("BAD_REQUEST", "This assignment is not set up correctly. Ask your teacher.");
      practice = config.data;
      if (mode !== "PRACTICE" && mode !== "TIMED_EXAM") mode = "PRACTICE";
      if (practice.timeLimitSeconds && mode === "PRACTICE") mode = "TIMED_EXAM";
    }
    const sponsored = await assignmentWorkSponsored(row.class);
    assignment = { id: row.id, closesAt: row.closesAt, dueAt: row.dueAt, schoolId: row.class.schoolId, createdById: row.createdById, sponsored, practice };
  } else if (!isEnrollableCatalogueStatus(subject.catalogueStatus)) {
    throw AppError.validation({ subjectId: [`${subject.name} is not available yet.`] });
  }

  // --- assessment definition ---
  const assessment = assessmentId
    ? await db.assessment.findFirst({
        where: { id: assessmentId, status: "PUBLISHED", draftOfId: null },
        select: {
          id: true,
          kind: true,
          subjectId: true,
          syllabusId: true,
          revision: true,
          timeLimitSeconds: true,
          feedbackTiming: true,
          accessTier: true,
          maxAttempts: true,
          schoolId: true,
          ownerUserId: true,
        },
      })
    : null;
  if (assessmentId) {
    const tenantOk =
      assessment !== null &&
      ((assessment.schoolId === null && assessment.ownerUserId === null) ||
        (assignment !== null &&
          ((assessment.schoolId !== null && assessment.schoolId === assignment.schoolId) ||
            (assessment.ownerUserId !== null && assessment.ownerUserId === assignment.createdById))));
    if (!assessment || !tenantOk || assessment.subjectId !== subject.id) throw AppError.notFound("Test not found.");
    if (!modeMatchesAssessmentKind(mode, assessment.kind)) {
      if (assignment) mode = assessment.kind;
      else throw AppError.validation({ mode: ["This test is started in a different mode."] });
    }
    const open = await findResumable(db, userId, { assessmentId: assessment.id });
    if (open) return resumed(actor, open, now);
  }
  const tenancy: QuestionTenancy | undefined = assessment?.schoolId
    ? { schoolIds: [assessment.schoolId] }
    : assessment?.ownerUserId
      ? { ownerUserIds: [assessment.ownerUserId] }
      : undefined;

  // --- daily question (§46) ---
  let daily: { id: string; questionId: string } | null = null;
  if (mode === "DAILY_QUESTION") {
    daily = await resolveDailyQuestion(db, {
      subjectId: subject.id,
      qualificationId: subject.qualificationId,
      ...(parsed.dailyQuestionId ? { dailyQuestionId: parsed.dailyQuestionId } : {}),
      now,
      timeZone,
    });
    const existing = await findResumable(db, userId, { dailyQuestionId: daily.id });
    if (existing) return resumed(actor, existing, now);
  }

  // --- plan gates ---
  const isAssignment = assignment !== null;
  // Only sponsored assignment work skips the student's own gates (AUTHZ-1: a free tutor must not unlock paid content).
  const planExempt = assignment?.sponsored === true;
  const allowance = await applyGates(actor, mode, {
    subjectId: subject.id,
    syllabusId: assessment?.syllabusId ?? null,
    accessTier: assessment?.accessTier ?? null,
    planExempt,
    timeZone,
    now,
  });

  // --- enrolment (pins the syllabus version) ---
  await db.$transaction((tx) => ensureEnrollmentTx(tx, userId, subject.id, { source: isAssignment ? "CLASS" : "SELF", now }), TX_OPTIONS);
  const enrollment = await db.subjectEnrollment.findUniqueOrThrow({
    where: { userId_subjectId: { userId, subjectId: subject.id } },
    select: { syllabusId: true, abilityLevel: true },
  });
  const poolTier: ContentAccessTier | null =
    planExempt || (await canAccessSubjectContent(userId, subject.id, { syllabusId: enrollment.syllabusId })) ? null : "FREE";
  const seed = randomUUID();
  const initialDifficulty = initialDifficultyFor(enrollment.abilityLevel);

  // --- selection ---
  const difficultyChoice: DifficultyChoice | undefined = parsed.difficulty ?? assignment?.practice?.difficulty;
  let requestedTopics = parsed.topicIds ?? assignment?.practice?.topicIds ?? [];
  let plan: SelectionPlan;
  let lessonId: string | null = null;
  if (assessment) {
    plan = await planAssessment(db, {
      assessmentId: assessment.id,
      subjectId: subject.id,
      fallbackSyllabusId: enrollment.syllabusId,
      userId,
      seed,
      accessTier: planExempt ? null : assessment.accessTier === "PREMIUM" ? null : poolTier,
      tenancy,
    });
  } else if (mode === "LESSON_CHECK") {
    const lessonPlan = await planLessonCheck(db, parsed.lessonId as string, subject.id);
    lessonId = lessonPlan.lessonId;
    plan = lessonPlan;
  } else if (mode === "DAILY_QUESTION" && daily) {
    plan = { slots: [{ questionId: daily.questionId, sectionNumber: null, marks: null, candidateTopicId: null, isRepeat: null }], sections: [], shortfall: 0 };
  } else {
    if (mode === "RETEST" && requestedTopics.length === 0) {
      requestedTopics = await dueRetestTopics(db, userId, subject.id, enrollment.syllabusId, now);
      if (requestedTopics.length === 0) throw AppError.validation({ topicIds: ["No topics are due for a re-test yet."] });
    }
    const scope = await expandTopicScope(db, enrollment.syllabusId, requestedTopics);
    let count = questionCountFor(mode, parsed.count ?? assignment?.practice?.questionCount);
    const remaining = allowance?.remaining ?? null;
    if (remaining !== null && (mode === "PRACTICE" || mode === "RETEST")) count = Math.max(1, Math.min(count, remaining));
    plan =
      mode === "DIAGNOSTIC"
        ? await planDiagnostic(db, {
            userId,
            subjectId: subject.id,
            syllabusId: enrollment.syllabusId,
            topicIds: scope,
            count,
            abilityLevel: enrollment.abilityLevel,
            accessTier: poolTier,
            seed,
          })
        : await planGenerated(db, {
            userId,
            subjectId: subject.id,
            syllabusId: enrollment.syllabusId,
            topicIds: scope,
            count,
            difficulty: toDifficultyMode(difficultyChoice),
            accessTier: poolTier,
            seed,
            now,
            initialDifficulty,
            useMastery: true,
          });
  }

  // --- load questions and build the slots ---
  const planned = plan.slots.slice(0, MAX_ATTEMPT_QUESTIONS);
  const questions = await getQuestionsForAttempt(
    planned.map((s) => s.questionId),
    { syllabusId: enrollment.syllabusId, ...(tenancy ? { tenancy } : {}) },
  );
  const byId = new Map(questions.map((q) => [q.id, q]));
  const missingTopic = planned.filter((s) => byId.has(s.questionId) && !byId.get(s.questionId)?.primaryTopicId && !s.candidateTopicId).map((s) => s.questionId);
  const anyTag = missingTopic.length
    ? await db.questionTopic.findMany({
        where: { questionId: { in: missingTopic } },
        orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }],
        select: { questionId: true, topicId: true },
      })
    : [];
  const fallbackTopic = new Map<string, string>();
  for (const tag of anyTag) if (!fallbackTopic.has(tag.questionId)) fallbackTopic.set(tag.questionId, tag.topicId);
  const seen = await previouslySeen(
    db,
    userId,
    planned.filter((s) => s.isRepeat === null).map((s) => s.questionId),
  );

  interface Slot {
    planned: PlannedSlot;
    question: AttemptQuestion;
    topicId: string;
    marks: number;
  }
  const slots: Slot[] = [];
  for (const p of planned) {
    const question = byId.get(p.questionId);
    if (!question) continue;
    const topicId = question.primaryTopicId ?? p.candidateTopicId ?? fallbackTopic.get(p.questionId) ?? null;
    if (!topicId) {
      logger.warn("attempts: question has no topic tag; left out of the attempt", { questionId: p.questionId });
      continue;
    }
    slots.push({ planned: p, question, topicId, marks: p.marks ?? question.marks });
  }
  if (slots.length === 0) throw AppError.notFound("No published questions match this selection yet.");

  // --- timing ---
  const multiplier = extraTimeMultiplier(student?.examExtraTimePercent);
  let baseLimit: number | null = assessment?.timeLimitSeconds ?? null;
  if (!assessment && mode === "TIMED_EXAM") {
    baseLimit =
      parsed.timeLimitMinutes !== undefined
        ? parsed.timeLimitMinutes * 60
        : (assignment?.practice?.timeLimitSeconds ??
          estimateTimeLimitSeconds(slots.map((s) => ({ estimatedSeconds: s.question.estimatedSeconds ?? null, marks: s.marks }))));
  }
  const deadline = baseLimit !== null ? computeDeadline(now, baseLimit, multiplier, { closesAt: assignment?.closesAt ?? null }) : null;
  if (deadline !== null && deadline.getTime() <= now.getTime()) throw AppError.conflict("There is no time left to start this test.");
  const timeLimitSeconds = deadline !== null ? Math.max(1, Math.ceil((deadline.getTime() - now.getTime()) / 1000)) : null;
  const sections: PlannedSection[] = plan.sections;
  if (mode === "MOCK_EXAM" && deadline === null && (sections.length === 0 || sections.some((s) => s.timeLimitSeconds === null))) {
    throw new AppError("BAD_REQUEST", "This mock exam has no time limit configured yet.");
  }
  if (mode === "TIMED_EXAM" && deadline === null) throw new AppError("BAD_REQUEST", "This timed exam has no time limit configured yet.");

  const extraTimePercent = multiplier > 1 ? Math.round((multiplier - 1) * 100) : undefined;
  const config: AttemptConfig = {
    questionCount: slots.length,
    ...(difficultyChoice ? { difficulty: difficultyChoice } : {}),
    ...(requestedTopics.length > 0 ? { topicIds: requestedTopics, includeSubtopics: true } : {}),
    feedback: feedbackModeFor(mode, assessment?.feedbackTiming ?? null),
    origin: parsed.origin ?? (isAssignment ? "ASSIGNMENT" : mode === "RETEST" ? "RETEST" : actor.channel === "whatsapp" ? "WHATSAPP" : "BUILDER"),
    seed,
    ...(extraTimePercent ? { extraTimePercent } : {}),
    answerAnyPolicy: "BEST",
    // Unsponsored assignment work counts toward the student's own allowances (billing/usage.ts reads this flag).
    ...(isAssignment && !planExempt ? { planGated: true } : {}),
  };
  const attemptNumber = assessment ? (await db.assessmentAttempt.count({ where: { userId, assessmentId: assessment.id } })) + 1 : 1;
  if (assessment?.maxAttempts !== null && assessment?.maxAttempts !== undefined && attemptNumber > assessment.maxAttempts && !isAssignment) {
    throw AppError.conflict("You've used all attempts for this test.");
  }
  const attemptTopicId = requestedTopics.length === 1 ? (requestedTopics[0] as string) : null;

  // --- write ---
  let attemptId: string;
  try {
    attemptId = await db.$transaction(async (tx) => {
      // Attempt-count allowances (topic tests per week, mocks per month) are consumed by this insert: re-check them
      // atomically (PAY-3; parallel starts of different tests all passed the pre-check). Practice answers are counted
      // when answered (./answer.ts), not here.
      if (allowance !== null && allowance.feature !== "practiceQuestionsPerDay" && isAttemptLimitFeature(allowance.feature)) {
        await assertWithinLimitInTx(tx, userId, allowance.feature, allowance.limit, { timeZone, now });
      }
      const attempt = await tx.assessmentAttempt.create({
        data: {
          userId,
          subjectId: subject.id,
          assessmentId: assessment?.id ?? null,
          assessmentRevision: assessment?.revision ?? null,
          topicId: attemptTopicId,
          lessonId,
          assignmentId: assignment?.id ?? null,
          dailyQuestionId: daily?.id ?? null,
          startedAt: now,
          lastSavedAt: now,
          createdAt: now,
          deadlineAt: deadline,
          timeLimitSeconds,
          mode,
          channel: activityChannel(actor),
          attemptNumber: Math.min(32_767, attemptNumber),
          questionCount: slots.length,
          idempotencyKey: parsed.idempotencyKey ?? null,
          config: config as Prisma.InputJsonObject,
        },
        select: { id: true },
      });
      if (sections.length > 0) {
        await tx.assessmentAttemptSection.createMany({
          data: sections.map((s) => ({
            attemptId: attempt.id,
            sectionNumber: s.sectionNumber,
            title: s.title,
            timeLimitSeconds: s.timeLimitSeconds === null ? null : Math.ceil(s.timeLimitSeconds * multiplier),
            answerCount: s.answerCount,
            maxMarks: s.maxMarks,
            createdAt: now,
          })),
        });
      }
      await tx.questionAttempt.createMany({
        data: slots.map((s, index) => ({
          attemptId: attempt.id,
          userId,
          subjectId: subject.id,
          topicId: s.topicId,
          questionId: s.question.id,
          createdAt: now,
          questionRevision: s.question.revision,
          position: index + 1,
          sectionNumber: s.planned.sectionNumber,
          difficulty: Math.min(5, Math.max(1, s.question.difficulty)),
          marksAvailable: s.marks,
          isRepeat: s.planned.isRepeat ?? seen.has(s.question.id),
        })),
      });
      for (const s of slots) await updateQuestionStats(tx, s.question.id, { kind: "presented" });
      const runAt = autoSubmitAt(deadline);
      if (runAt) {
        await enqueue(AUTO_SUBMIT_JOB, { attemptId: attempt.id }, { client: tx, runAt, dedupeKey: `autosubmit:${attempt.id}` });
      }
      if (assignment) {
        const progress = await tx.assignmentProgress.findUniqueOrThrow({
          where: { assignmentId_userId: { assignmentId: assignment.id, userId } },
          select: { status: true, startedAt: true, attemptsCount: true },
        });
        await tx.assignmentProgress.update({
          where: { assignmentId_userId: { assignmentId: assignment.id, userId } },
          data: {
            attemptsCount: Math.min(32_767, progress.attemptsCount + 1),
            startedAt: progress.startedAt ?? now,
            ...(progress.status === "NOT_STARTED" ? { status: "IN_PROGRESS" } : {}),
          },
        });
      }
      return attempt.id;
    }, TX_OPTIONS);
  } catch (error) {
    // A double tap: the other request created the attempt first (unique index), or used the allowance up with it.
    if (isUniqueViolation(error) || error instanceof LimitReachedError) {
      const existing = await findResumable(db, userId, {
        ...(parsed.idempotencyKey ? { idempotencyKey: parsed.idempotencyKey } : {}),
        assessmentId: assessment?.id ?? null,
        dailyQuestionId: daily?.id ?? null,
      });
      if (existing) return resumed(actor, existing, now);
    }
    throw error;
  }
  return { attempt: await getAttemptForStudent(actor, attemptId, { now }), resumed: false, shortfall: plan.shortfall + (planned.length - slots.length) };
}
