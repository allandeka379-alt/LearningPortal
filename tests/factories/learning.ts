/**
 * Learning-engine fixtures (§10–§13, §19, §52): curricula with questions tagged to leaf topics, learners with explicit
 * plan grants, enrolments, grade schemes, PUBLISHED assessments (with their ContentRevision snapshot) and synthetic
 * attempts with answers (e.g. to simulate today's practice usage).
 *
 * Rules (tests/README.md): parallel test files share one never-truncated database, so everything is created with
 * unique values and assertions must only look at rows the test created. Entitlements: the shared default (FREE) plan
 * may hold any values, so learners that need a feature get an explicit EntitlementGrant (source PROMO, `features`
 * document) — grants only ever ADD access (most generous value wins), they never lower the default plan.
 */
import { createHash, randomUUID } from "node:crypto";
import type {
  AssessmentAssembly,
  AssessmentFeedbackTiming,
  AssessmentKind,
  AttemptMode,
  CognitiveSkill,
  ContentAccessTier,
  Prisma,
  QuestionType,
} from "@/generated/prisma/client";
import type { LearnerActor } from "@/server/attempts/types";
import { createCurriculumChain, type CurriculumChain } from "./curriculum";
import { createStudent } from "./identity";
import { createQuestion, type CreatedQuestion, type SampleQuestion } from "./questions";

/** Lazily loaded so importing this module never touches the database. */
async function dbModules() {
  const [{ db }, { setContentPublishContext }] = await Promise.all([import("@/server/db"), import("@/server/lib/db-context")]);
  return { db, setContentPublishContext };
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

// ---------------------------------------------------------------------------------------------------------------------
// Learners
// ---------------------------------------------------------------------------------------------------------------------

/** A grant document unlocking everything the attempt engine gates (unlimited practice, tests, mocks, diagnostic). */
export const UNLIMITED_LEARNING_FEATURES = {
  lessonAccess: "ALL",
  practiceQuestionsPerDay: null,
  dailyQuestion: true,
  diagnosticTest: true,
  topicTestsPerWeek: null,
  mockExams: true,
  mockExamsPerMonth: null,
  flashcards: true,
  studyPlan: true,
  examCountdown: true,
} as const;

export interface CreateLearnerOptions {
  /** Entitlement grant document (flat contract shape), "UNLIMITED" (default) or null for the default plan only. */
  features?: Record<string, unknown> | "UNLIMITED" | null;
  /** Student.examExtraTimePercent (1-100). */
  examExtraTimePercent?: number | null;
  /** Profile.timezone (default Africa/Harare). */
  timezone?: string;
  firstName?: string;
}

export interface Learner {
  userId: string;
  actor: LearnerActor;
}

/** The minimal learning actor for a student user id (what routes pass as the auth Actor). */
export function learnerActor(userId: string, overrides: Partial<LearnerActor> = {}): LearnerActor {
  return { userId, roles: ["STUDENT"], channel: "web", ...overrides };
}

/** Grants `features` to a user through a PROMO EntitlementGrant (started a minute ago, open-ended). */
export async function grantLearnerFeatures(userId: string, features: Record<string, unknown>): Promise<string> {
  const { db } = await dbModules();
  const grant = await db.entitlementGrant.create({
    data: { userId, source: "PROMO", features: features as Prisma.InputJsonObject, startsAt: new Date(Date.now() - 60_000) },
    select: { id: true },
  });
  return grant.id;
}

/**
 * Makes a class tenant SPONSOR its assignment work (§22 assignments under the SCHOOL plan): a PROMO grant of
 * `assignments` held by the school (school classes) or by the tutor who created the class (school-less classes).
 * Without it, assignment work is gated by the student's own plan (`assignmentWorkSponsored`). Drops this worker's
 * cached entitlements so the grant applies at once.
 */
export async function sponsorAssignments(tenant: { schoolId: string | null; createdById: string }): Promise<string> {
  const { db } = await dbModules();
  const { invalidateEntitlements } = await import("@/server/billing/entitlements");
  const features = { assignments: true } as Prisma.InputJsonObject;
  const startsAt = new Date(Date.now() - 60_000);
  const grant = await db.entitlementGrant.create({
    data: tenant.schoolId !== null ? { schoolId: tenant.schoolId, source: "PROMO", features, startsAt } : { userId: tenant.createdById, source: "PROMO", features, startsAt },
    select: { id: true },
  });
  invalidateEntitlements(tenant.schoolId !== null ? undefined : tenant.createdById);
  return grant.id;
}

/** A student (adult, consent not required) with an optional entitlement grant. */
export async function createLearner(options: CreateLearnerOptions = {}): Promise<Learner> {
  const { db } = await dbModules();
  const { user } = await createStudent({ student: { isMinor: false }, ...(options.firstName ? { firstName: options.firstName } : {}) });
  if (options.timezone) await db.profile.update({ where: { userId: user.id }, data: { timezone: options.timezone } });
  if (options.examExtraTimePercent) {
    await db.student.update({ where: { userId: user.id }, data: { examExtraTimePercent: options.examExtraTimePercent } });
  }
  const features = options.features === undefined ? "UNLIMITED" : options.features;
  if (features !== null) await grantLearnerFeatures(user.id, features === "UNLIMITED" ? { ...UNLIMITED_LEARNING_FEATURES } : features);
  return { userId: user.id, actor: learnerActor(user.id) };
}

// ---------------------------------------------------------------------------------------------------------------------
// Curriculum + questions
// ---------------------------------------------------------------------------------------------------------------------

export interface GradeBandSpec {
  label: string;
  minPercent: number;
  isPass: boolean;
}

/** Default estimate bands used by the fixtures (A ≥ 80, B ≥ 65, C ≥ 50, U below). Placeholder values for tests. */
export const TEST_GRADE_BANDS: readonly GradeBandSpec[] = [
  { label: "A", minPercent: 80, isPass: true },
  { label: "B", minPercent: 65, isPass: true },
  { label: "C", minPercent: 50, isPass: true },
  { label: "U", minPercent: 0, isPass: false },
];

/** Creates a grade scheme (default for the qualification unless `isDefault: false`) with its bands. */
export async function createGradeScheme(
  qualificationId: string,
  bands: readonly GradeBandSpec[] = TEST_GRADE_BANDS,
  options: { isDefault?: boolean; name?: string } = {},
): Promise<{ id: string }> {
  const { db } = await dbModules();
  return db.gradeScheme.create({
    data: {
      qualificationId,
      name: options.name ?? "Test scheme (estimate)",
      isDefault: options.isDefault ?? true,
      disclaimer: "Estimated from practice results; not an official grade.",
      bands: { create: bands.map((b, index) => ({ label: b.label, minPercent: b.minPercent, isPass: b.isPass, sortOrder: index })) },
    },
    select: { id: true },
  });
}

export interface LearningSetupOptions {
  /** TOPIC roots (default 2). */
  topics?: number;
  /** SUBTOPIC leaves per topic (default 2). */
  subtopicsPerTopic?: number;
  /** Questions tagged to each leaf (default 3). */
  questionsPerLeaf?: number;
  /** Question type (default MULTIPLE_CHOICE). */
  type?: QuestionType;
  /** Difficulty of every question (default 3). */
  difficulty?: number;
  /** Lessons per TOPIC (tagged at TOPIC level, default 1). */
  lessonsPerTopic?: number;
  accessTier?: ContentAccessTier;
  /** Create a default grade scheme for the qualification (default true). */
  gradeScheme?: boolean;
}

export interface LearningQuestion {
  id: string;
  topicId: string;
  definition: SampleQuestion;
}

export interface LearningSetup {
  chain: CurriculumChain;
  subjectId: string;
  syllabusId: string;
  qualificationId: string;
  /** SUBTOPIC leaves in tree order. */
  leafTopicIds: string[];
  /** TOPIC roots in order. */
  topicIds: string[];
  questions: LearningQuestion[];
  questionsByTopic: Map<string, LearningQuestion[]>;
  gradeSchemeId: string | null;
}

/** Curriculum chain (CURRENT syllabus) + PUBLISHED questions tagged (primary) to every leaf topic. */
export async function createLearningSetup(options: LearningSetupOptions = {}): Promise<LearningSetup> {
  const chain = await createCurriculumChain({
    topicCount: options.topics ?? 2,
    subtopicsPerTopic: options.subtopicsPerTopic ?? 2,
    lessonsPerTopic: options.lessonsPerTopic ?? 1,
  });
  const leafTopicIds = chain.subtopics.length > 0 ? chain.subtopics.map((t) => t.id) : chain.topics.map((t) => t.id);
  const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: leafTopicIds };
  const questions: LearningQuestion[] = [];
  const questionsByTopic = new Map<string, LearningQuestion[]>();
  for (const topicId of leafTopicIds) {
    for (let i = 0; i < (options.questionsPerLeaf ?? 3); i += 1) {
      const created: CreatedQuestion = await createQuestion(options.type ?? "MULTIPLE_CHOICE", {
        context,
        topicId,
        difficulty: options.difficulty ?? 3,
        accessTier: options.accessTier ?? "FREE",
      });
      const question = { id: created.id, topicId, definition: created.definition };
      questions.push(question);
      questionsByTopic.set(topicId, [...(questionsByTopic.get(topicId) ?? []), question]);
    }
  }
  const gradeSchemeId = options.gradeScheme === false ? null : (await createGradeScheme(chain.qualification.id)).id;
  return {
    chain,
    subjectId: chain.subject.id,
    syllabusId: chain.syllabus.id,
    qualificationId: chain.qualification.id,
    leafTopicIds,
    topicIds: chain.topics.map((t) => t.id),
    questions,
    questionsByTopic,
    gradeSchemeId,
  };
}

/** A response that earns full marks for a sample question (MCQ, TRUE_FALSE, NUMERICAL, SHORT_ANSWER). */
export function correctResponse(definition: SampleQuestion): unknown {
  switch (definition.type) {
    case "MULTIPLE_CHOICE":
      return { type: "MULTIPLE_CHOICE", optionKeys: definition.options.filter((o) => o.isCorrect).map((o) => o.key) };
    case "TRUE_FALSE":
      return { type: "TRUE_FALSE", value: (definition.answerSpec as { correct: boolean }).correct };
    case "NUMERICAL":
      return { type: "NUMERICAL", value: String((definition.answerSpec as { value: number }).value) };
    case "SHORT_ANSWER":
      return { type: "SHORT_ANSWER", text: (definition.answerSpec as { accepted: { value: string }[] }).accepted[0]?.value ?? "" };
    default:
      throw new Error(`correctResponse: unsupported type ${definition.type}`);
  }
}

/** A response that earns no marks for a sample question. */
export function wrongResponse(definition: SampleQuestion): unknown {
  switch (definition.type) {
    case "MULTIPLE_CHOICE": {
      const wrong = definition.options.find((o) => !o.isCorrect);
      if (!wrong) throw new Error("wrongResponse: no incorrect option");
      return { type: "MULTIPLE_CHOICE", optionKeys: [wrong.key] };
    }
    case "TRUE_FALSE":
      return { type: "TRUE_FALSE", value: !(definition.answerSpec as { correct: boolean }).correct };
    case "NUMERICAL":
      return { type: "NUMERICAL", value: "987654" };
    case "SHORT_ANSWER":
      return { type: "SHORT_ANSWER", text: "definitely not it" };
    default:
      throw new Error(`wrongResponse: unsupported type ${definition.type}`);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Enrolments, exam sessions
// ---------------------------------------------------------------------------------------------------------------------

/** A PUBLISHED exam session of the qualification starting `daysFromNow` days ahead (calendar dates, UTC). */
export async function createExamSession(qualificationId: string, options: { startsOn: string; isProvisional?: boolean; name?: string }): Promise<{ id: string; year: number }> {
  const { db } = await dbModules();
  const year = Number(options.startsOn.slice(0, 4));
  return db.examSession.create({
    data: {
      qualificationId,
      name: options.name ?? `Test session ${options.startsOn}`,
      seriesCode: `T-${randomUUID().slice(0, 8)}`,
      year,
      startsOn: new Date(`${options.startsOn}T00:00:00.000Z`),
      endsOn: new Date(`${options.startsOn}T00:00:00.000Z`),
      isProvisional: options.isProvisional ?? true,
      status: "PUBLISHED",
    },
    select: { id: true, year: true },
  });
}

/** Enrols a user directly (pins the setup's syllabus version) without the service's validation. */
export async function createEnrollment(
  userId: string,
  setup: Pick<LearningSetup, "subjectId" | "syllabusId">,
  overrides: Partial<Prisma.SubjectEnrollmentUncheckedCreateInput> = {},
): Promise<{ id: string }> {
  const { db } = await dbModules();
  return db.subjectEnrollment.create({
    data: { userId, subjectId: setup.subjectId, syllabusId: setup.syllabusId, ...overrides },
    select: { id: true },
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Assessments
// ---------------------------------------------------------------------------------------------------------------------

export interface AssessmentSectionSpec {
  title?: string;
  questionIds: string[];
  /** Per-item marks overrides (same order as questionIds; null = question marks). */
  itemMarks?: (number | null)[];
  timeLimitSeconds?: number | null;
  answerCount?: number | null;
  /** Section marks (required with answerCount). */
  marks?: number | null;
  /** Blueprint rules (used when the assessment's assembly is BLUEPRINT / ADAPTIVE). */
  rules?: {
    topicId?: string | null;
    includeSubtopics?: boolean;
    questionCount: number;
    difficultyMin?: number;
    difficultyMax?: number;
    examStyleOnly?: boolean;
    objectiveId?: string | null;
    questionType?: QuestionType | null;
    cognitiveSkill?: CognitiveSkill | null;
    marksPerQuestion?: number | null;
  }[];
}

export interface CreateAssessmentOptions {
  subjectId: string;
  syllabusId: string;
  kind: AssessmentKind;
  sections: AssessmentSectionSpec[];
  title?: string;
  instructions?: string | null;
  timeLimitSeconds?: number | null;
  feedbackTiming?: AssessmentFeedbackTiming;
  accessTier?: ContentAccessTier;
  gradeSchemeId?: string | null;
  maxAttempts?: number | null;
  allowNavigation?: boolean;
  shuffleQuestions?: boolean;
  topicIds?: string[];
  assembly?: AssessmentAssembly;
}

/**
 * A PUBLISHED platform assessment with sections and fixed items, inserted with its revision-1 ContentRevision snapshot
 * in one transaction (the child guard is unlocked with `setContentPublishContext`, the deferred snapshot check runs at
 * COMMIT), exactly like the publish merge.
 */
export async function createAssessment(options: CreateAssessmentOptions): Promise<{ id: string; totalMarks: number }> {
  const { db, setContentPublishContext } = await dbModules();
  const questionIds = options.sections.flatMap((s) => s.questionIds);
  const marks = new Map((await db.question.findMany({ where: { id: { in: questionIds } }, select: { id: true, marks: true } })).map((q) => [q.id, q.marks]));
  const totalMarks = options.sections.reduce((sum, section) => {
    if (section.answerCount && section.marks) return sum + section.marks;
    const fixed = section.questionIds.reduce((s, id, i) => s + (section.itemMarks?.[i] ?? marks.get(id) ?? 0), 0);
    return sum + fixed + (section.rules ?? []).reduce((s, r) => s + r.questionCount * (r.marksPerQuestion ?? 1), 0);
  }, 0);
  const now = new Date();
  return db.$transaction(async (tx) => {
    const assessment = await tx.assessment.create({
      data: {
        kind: options.kind,
        assembly: options.assembly ?? "FIXED",
        subjectId: options.subjectId,
        syllabusId: options.syllabusId,
        title: options.title ?? `Test ${options.kind.toLowerCase().replace(/_/g, " ")}`,
        instructions: options.instructions ?? "Answer every question.",
        timeLimitSeconds: options.timeLimitSeconds ?? null,
        totalMarks: Math.max(1, totalMarks),
        gradeSchemeId: options.gradeSchemeId ?? null,
        feedbackTiming: options.feedbackTiming ?? "AFTER_SUBMIT",
        accessTier: options.accessTier ?? "FREE",
        maxAttempts: options.maxAttempts ?? null,
        allowNavigation: options.allowNavigation ?? true,
        shuffleQuestions: options.shuffleQuestions ?? false,
        status: "PUBLISHED",
        revision: 1,
        approvedAt: now,
        publishedAt: now,
        copyrightStatus: "OWNED",
        author: "Test author",
      },
      select: { id: true },
    });
    await setContentPublishContext(tx, assessment.id);
    const sections = [];
    for (const [index, spec] of options.sections.entries()) {
      const section = await tx.assessmentSection.create({
        data: {
          assessmentId: assessment.id,
          title: spec.title ?? `Section ${String.fromCharCode(65 + index)}`,
          sortOrder: index,
          timeLimitSeconds: spec.timeLimitSeconds ?? null,
          answerCount: spec.answerCount ?? null,
          marks: spec.marks ?? null,
        },
        select: { id: true },
      });
      if (spec.questionIds.length > 0) {
        await tx.assessmentItem.createMany({
          data: spec.questionIds.map((questionId, i) => ({ sectionId: section.id, questionId, sortOrder: i, marks: spec.itemMarks?.[i] ?? null })),
        });
      }
      if (spec.rules?.length) {
        await tx.assessmentBlueprintRule.createMany({
          data: spec.rules.map((rule, i) => ({
            sectionId: section.id,
            topicId: rule.topicId ?? null,
            includeSubtopics: rule.includeSubtopics ?? true,
            questionCount: rule.questionCount,
            difficultyMin: rule.difficultyMin ?? 1,
            difficultyMax: rule.difficultyMax ?? 5,
            examStyleOnly: rule.examStyleOnly ?? false,
            objectiveId: rule.objectiveId ?? null,
            questionType: rule.questionType ?? null,
            cognitiveSkill: rule.cognitiveSkill ?? null,
            marksPerQuestion: rule.marksPerQuestion ?? null,
            sortOrder: i,
          })),
        });
      }
      sections.push({ id: section.id, questionIds: spec.questionIds });
    }
    if (options.topicIds?.length) {
      await tx.assessmentTopic.createMany({ data: options.topicIds.map((topicId) => ({ assessmentId: assessment.id, topicId })) });
    }
    const snapshot = { assessment: { id: assessment.id, kind: options.kind, subjectId: options.subjectId, revision: 1 }, sections, topics: options.topicIds ?? [] };
    await tx.contentRevision.create({
      data: {
        entityType: "ASSESSMENT",
        entityId: assessment.id,
        revision: 1,
        snapshot,
        contentHash: sha256Hex(JSON.stringify(snapshot)),
        changeNote: "Test fixture",
      },
    });
    return { id: assessment.id, totalMarks: Math.max(1, totalMarks) };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Attempts
// ---------------------------------------------------------------------------------------------------------------------

export interface CreateAttemptWithAnswersOptions {
  userId: string;
  subjectId: string;
  questionId: string;
  topicId: string;
  /** Default PRACTICE (no assessment). */
  mode?: Extract<AttemptMode, "PRACTICE" | "RETEST">;
  /** Answered slots (all auto-marked). */
  answered: number;
  /** Of which correct (default all). */
  correct?: number;
  /** When the answers were given (default now). */
  at?: Date;
  /** Default MARKED (closed); IN_PROGRESS leaves the attempt open. */
  status?: "IN_PROGRESS" | "MARKED";
}

/**
 * A synthetic practice attempt with `answered` auto-marked MCQ answers of one question (the same question may fill
 * several positions), e.g. to simulate today's practice usage for limit tests. Satisfies every attempt CHECK.
 */
export async function createAttemptWithAnswers(options: CreateAttemptWithAnswersOptions): Promise<{ attemptId: string }> {
  const { db } = await dbModules();
  const at = options.at ?? new Date();
  const correct = Math.min(options.answered, options.correct ?? options.answered);
  const closed = (options.status ?? "MARKED") === "MARKED";
  return db.$transaction(async (tx) => {
    const attempt = await tx.assessmentAttempt.create({
      data: {
        userId: options.userId,
        subjectId: options.subjectId,
        mode: options.mode ?? "PRACTICE",
        startedAt: at,
        lastSavedAt: at,
        createdAt: at,
        questionCount: options.answered,
        config: { feedback: "IMMEDIATE", origin: "BUILDER" },
        ...(closed
          ? {
              status: "MARKED",
              submitReason: "STUDENT",
              submittedAt: at,
              markedAt: at,
              totalMarks: options.answered,
              marksAwarded: correct,
              answeredCount: options.answered,
              correctCount: correct,
              percentage: options.answered > 0 ? (correct * 100) / options.answered : null,
            }
          : {}),
      },
      select: { id: true },
    });
    if (options.answered > 0) {
      await tx.questionAttempt.createMany({
        data: Array.from({ length: options.answered }, (_, i) => ({
          attemptId: attempt.id,
          userId: options.userId,
          subjectId: options.subjectId,
          topicId: options.topicId,
          questionId: options.questionId,
          createdAt: at,
          answeredAt: at,
          markedAt: at,
          questionRevision: 1,
          position: i + 1,
          difficulty: 3,
          marksAvailable: 1,
          marksAwarded: i < correct ? 1 : 0,
          isCorrect: i < correct,
          markingStatus: "AUTO_MARKED" as const,
          response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
        })),
      });
    }
    return { attemptId: attempt.id };
  });
}
