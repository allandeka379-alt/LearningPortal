import "server-only";
import { z } from "zod";
import type { AssessmentFeedbackTiming, AssessmentKind, AttemptMode, AttemptStatus, AttemptSubmitReason, ContentAccessTier } from "@/generated/prisma/client";
import { attemptModeLabel } from "@/components/dashboard/links";
import { clampPosition, sectionFinishDecision, sectionStartDecision, timeUpDue } from "@/components/exam/exam-model";
import type {
  ExamClock,
  ExamQuestion,
  ExamRoomData,
  ExamSection,
  ExamSectionInput,
  SaveExamInput,
  SaveExamResult,
  SubmitExamInput,
  SubmitExamResult,
} from "@/components/exam/types";
import type { PresentedFeedback, PresentedQuestion, QuestionResponse } from "@/components/questions/types";
import type { LimitFeature, Entitlements } from "@/lib/billing/entitlements";
import type { SanitizedHtml } from "@/lib/content/types";
import {
  attemptResultsHref,
  closeAttemptIfDue,
  gatesFor,
  getAttemptForStudent,
  GRADED_MODES,
  isPracticeLike,
  recordSelfAssessment,
  saveResponse,
  startAttempt,
  submitAttempt,
  type AttemptScore,
  type AttemptView,
  type GradeEstimateView,
  type LearnerActor,
  type RecommendationView,
  type TopicResultView,
} from "@/server/attempts";
import { lockAttempt, requireOwnAttempt, TX_OPTIONS } from "@/server/attempts/context";
import { finalizeAttempt } from "@/server/attempts/finalize";
import { hasPermission } from "@/server/auth/permissions";
import {
  EntitlementRequiredError,
  evaluateLimit,
  getSubjectEntitlements,
  hasFeature,
  LimitReachedError,
  UPGRADE_PATH,
} from "@/server/billing/entitlements";
import { getUserTimezone, usageFor } from "@/server/billing/usage";
import { renderContent } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { listEnrollments, type EnrollmentView } from "@/server/enrollment";
import { expiryAction } from "@/server/exams/timer";
import { AppError } from "@/server/lib/errors";
import { loadQuestionAssets, loadRevealAssets, normalizeResponse, presentQuestion, presentSlotFeedback, slotSelfAssessment } from "@/server/practice";

/**
 * Exam mode for the student web app (§12 mock exams, §13 examination mode) on top of the attempt engine
 * (`@/server/attempts`), which owns selection, entitlements at start, the server deadline, autosave, marking, scoring,
 * the grade estimate and the analysis. This module adds what the exam pages need around it:
 *
 * - the catalogue of PUBLISHED platform assessments for the student's enrolled subjects (pinned syllabus version and
 *   route), with access computed from the plan (CLAUDE.md rule 9) so locked tests show a friendly upgrade prompt
 *   instead of failing at start, plus attempt history (cursor-paginated);
 * - the instructions page data and starting / resuming an assessment;
 * - the exam room: every question presented server-side (sanitised HTML, never answers), saved answers with their
 *   save versions, and the server clock (overall deadline + per-paper clocks);
 * - per-paper timing for multi-paper mocks: a paper's clock starts when the student starts it and stops at its
 *   deadline or when the student finishes it early; one paper runs at a time (rules in
 *   `src/components/exam/exam-model.ts`, shared with the client);
 * - submission, including the client's TIME_UP submit, which closes the attempt with reason TIME_EXPIRED only when
 *   the SERVER clock agrees that time is up;
 * - results (§12 "You scored 68%", grade ESTIMATE, strong / weak areas, recommended study, question review).
 *
 * Every function acts on the actor's own attempts only (others are NOT_FOUND).
 */

/** Assessment kinds listed on /app/exams (the diagnostic has its own onboarding flow). */
export const EXAM_KINDS = ["TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "MOCK_EXAM", "QUIZ"] as const satisfies readonly AssessmentKind[];
export type ExamKind = (typeof EXAM_KINDS)[number];

/** Section headings of the catalogue, in display order. */
export const EXAM_KIND_GROUP_LABELS: Readonly<Record<ExamKind, string>> = {
  TOPIC_TEST: "Topic tests",
  CHAPTER_TEST: "Chapter tests",
  SUBJECT_TEST: "Subject tests",
  TIMED_EXAM: "Timed exams",
  MOCK_EXAM: "Mock exams",
  QUIZ: "Quizzes",
};

const HISTORY_PAGE_SIZE = 10;
const MAX_LISTED_ASSESSMENTS = 100;
const uuid = z.uuid();

// =====================================================================================================================
// Shared helpers
// =====================================================================================================================

function assertStudent(actor: LearnerActor): void {
  if (!uuid.safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students can take tests and exams.");
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function assertAttemptId(attemptId: string): void {
  if (!uuid.safeParse(attemptId).success) throw AppError.notFound("Attempt not found.");
}

async function timeZoneOf(actor: LearnerActor): Promise<string> {
  return actor.timeZone ?? getUserTimezone(actor.userId);
}

/**
 * The mark allocation shown for a question is the attempt's (§13): a test may weight a question differently from the
 * bank (AssessmentItem.marks), and marking scales to it.
 */
function withSlotMarks(question: PresentedQuestion, marks: number): PresentedQuestion {
  return question.marks === marks ? question : { ...question, marks };
}

const resultsHref = (attemptId: string) => `/app/exams/attempt/${attemptId}/results`;
const roomHref = (attemptId: string) => `/app/exams/attempt/${attemptId}`;

/**
 * Where an attempt belongs when it is opened in the exam room: null = the room. Practice-style attempts and tests with
 * immediate feedback run in the practice runner; the daily question has its own page; closed attempts show their
 * mode's results (a diagnostic its report).
 */
export function examRoomRedirect(view: Pick<AttemptView, "id" | "mode" | "status" | "feedback">): string | null {
  if (view.mode === "DAILY_QUESTION") return "/app/daily";
  if (isPracticeLike(view.mode) || view.feedback === "IMMEDIATE") return `/app/practice/${view.id}`;
  if (view.status !== "IN_PROGRESS") return attemptResultsHref(view.mode, view.id);
  return null;
}

/**
 * Where an attempt belongs when its exam results are opened: null = the results page. Practice-style sessions open
 * their summary, the daily question its page, a diagnostic its §52 report (or its room while open), open tests their
 * room. `diagnosticReport`: the diagnostic report itself is loading the results (no redirect for DIAGNOSTIC).
 */
export function examResultsRedirect(
  view: Pick<AttemptView, "id" | "mode" | "status" | "feedback">,
  options: { diagnosticReport?: boolean } = {},
): string | null {
  if (isPracticeLike(view.mode)) return attemptResultsHref(view.mode, view.id);
  if (view.mode === "DIAGNOSTIC" && !options.diagnosticReport) {
    return view.status === "IN_PROGRESS" ? `/app/diagnostic/${view.id}` : attemptResultsHref("DIAGNOSTIC", view.id);
  }
  if (view.status === "IN_PROGRESS") return view.feedback === "IMMEDIATE" ? `/app/practice/${view.id}` : roomHref(view.id);
  return null;
}

interface SectionRow {
  sectionNumber: number;
  timeLimitSeconds: number | null;
  startedAt: Date | null;
  deadlineAt: Date | null;
  submittedAt: Date | null;
}

const SECTION_CLOCK_SELECT = { sectionNumber: true, timeLimitSeconds: true, startedAt: true, deadlineAt: true, submittedAt: true } as const;

/** Server clock snapshot of an attempt. */
export function toExamClock(attemptId: string, open: boolean, deadlineAt: Date | null, sections: readonly SectionRow[], now: Date): ExamClock {
  return {
    attemptId,
    open,
    serverNowMs: now.getTime(),
    deadlineMs: deadlineAt?.getTime() ?? null,
    sections: [...sections]
      .sort((a, b) => a.sectionNumber - b.sectionNumber)
      .map((s) => ({
        sectionNumber: s.sectionNumber,
        timeLimitSeconds: s.timeLimitSeconds,
        startedAtMs: s.startedAt?.getTime() ?? null,
        deadlineMs: s.deadlineAt?.getTime() ?? null,
        finishedAtMs: s.submittedAt?.getTime() ?? null,
      })),
  };
}

// =====================================================================================================================
// Access (CLAUDE.md rule 9): what the plan allows, computed without throwing
// =====================================================================================================================

export type ExamAccess =
  | { status: "AVAILABLE"; allowance: { limit: number; remaining: number; label: string } | null }
  | { status: "IN_PROGRESS"; attemptId: string }
  | { status: "UPGRADE"; message: string; upgradeHref: string }
  | { status: "LIMIT_REACHED"; message: string; upgradeHref: string }
  | { status: "NO_ATTEMPTS_LEFT"; message: string }
  | { status: "NOT_ENROLLED"; message: string };

const LIMIT_PERIOD: Readonly<Record<LimitFeature, string>> = {
  practiceQuestionsPerDay: "practice questions left today",
  topicTestsPerWeek: "topic tests left this week",
  mockExamsPerMonth: "mock exams left this month",
  aiMessagesPerDay: "AI tutor messages left today",
  aiSolverPerDay: "AI solver requests left today",
};

/**
 * Whether the student may start an assessment now, mirroring the engine's start gates (`gatesFor`): plan features,
 * premium subject content, attempts allowed by the test, then the plan's numeric allowance. Pure.
 */
export function examAccess(input: {
  kind: AssessmentKind;
  accessTier: ContentAccessTier;
  maxAttempts: number | null;
  attemptsUsed: number;
  openAttemptId: string | null;
  entitlements: Entitlements;
  usage: Partial<Record<LimitFeature, number>>;
}): ExamAccess {
  if (input.openAttemptId) return { status: "IN_PROGRESS", attemptId: input.openAttemptId };
  const gates = gatesFor(input.kind, { accessTier: input.accessTier, planExempt: false });
  for (const feature of gates.features) {
    if (!hasFeature(input.entitlements, feature)) return { status: "UPGRADE", message: new EntitlementRequiredError(feature).message, upgradeHref: UPGRADE_PATH };
  }
  if (gates.needsSubjectContent && input.entitlements.lessonAccess !== "ALL") {
    return { status: "UPGRADE", message: new EntitlementRequiredError("lessons.full").message, upgradeHref: UPGRADE_PATH };
  }
  if (input.maxAttempts !== null && input.attemptsUsed >= input.maxAttempts) {
    return {
      status: "NO_ATTEMPTS_LEFT",
      message: input.maxAttempts === 1 ? "You've already taken this test." : `You've used all ${input.maxAttempts} attempts at this test.`,
    };
  }
  if (!gates.limit) return { status: "AVAILABLE", allowance: null };
  const check = evaluateLimit(gates.limit, input.entitlements[gates.limit], input.usage[gates.limit] ?? 0);
  if (!check.allowed) {
    if (check.limit === 0) return { status: "UPGRADE", message: new EntitlementRequiredError(gates.limit).message, upgradeHref: UPGRADE_PATH };
    return { status: "LIMIT_REACHED", message: new LimitReachedError({ ...check, limit: check.limit ?? 0 }).message, upgradeHref: UPGRADE_PATH };
  }
  return {
    status: "AVAILABLE",
    allowance: check.limit !== null && check.remaining !== null ? { limit: check.limit, remaining: check.remaining, label: LIMIT_PERIOD[gates.limit] } : null,
  };
}

// =====================================================================================================================
// Catalogue (§12) and history
// =====================================================================================================================

export interface ExamListItem {
  id: string;
  kind: ExamKind;
  kindLabel: string;
  title: string;
  description: string | null;
  subject: { id: string; name: string };
  /** Overall limit, or the papers' limits added up; null = untimed. */
  timeLimitSeconds: number | null;
  /** Separately timed papers (multi-paper mocks); 0 when the paper shares one timer. */
  timedPaperCount: number;
  questionCount: number;
  totalMarks: number;
  topics: string[];
  accessTier: ContentAccessTier;
  attemptsUsed: number;
  maxAttempts: number | null;
  bestPercent: number | null;
  access: ExamAccess;
}

export interface ExamGroup {
  kind: ExamKind;
  label: string;
  items: ExamListItem[];
}

export interface ExamHistoryItem {
  attemptId: string;
  mode: AttemptMode;
  modeLabel: string;
  title: string;
  subjectName: string;
  status: AttemptStatus;
  submitReason: AttemptSubmitReason | null;
  percentage: number | null;
  marksAwarded: number | null;
  totalMarks: number | null;
  gradeEstimate: string | null;
  isProvisional: boolean;
  startedAt: Date;
  submittedAt: Date | null;
  /** Results, or the exam room for an attempt still in progress. */
  href: string;
}

export interface ExamCatalogue {
  subjects: { id: string; name: string }[];
  /** Subject filter in effect (null = every enrolled subject). */
  selectedSubjectId: string | null;
  /** Topic filter (`?topicId=`) in effect. */
  topic: { id: string; name: string; subjectId: string } | null;
  /** A topic filter was asked for but the topic is not in the student's syllabus. */
  topicNotFound: boolean;
  groups: ExamGroup[];
  /** Tests and exams the student started and has not submitted (resume). */
  inProgress: ExamHistoryItem[];
}

const ASSESSMENT_LIST_SELECT = {
  id: true,
  kind: true,
  title: true,
  description: true,
  subjectId: true,
  timeLimitSeconds: true,
  totalMarks: true,
  accessTier: true,
  maxAttempts: true,
  allowNavigation: true,
  feedbackTiming: true,
  sections: {
    orderBy: { sortOrder: "asc" },
    select: {
      title: true,
      instructions: true,
      timeLimitSeconds: true,
      answerCount: true,
      marks: true,
      _count: { select: { items: true } },
      rules: { select: { questionCount: true } },
    },
  },
  topics: { select: { topic: { select: { name: true, sortOrder: true } } } },
} as const;

/** The where-clause for assessments a student may take in their enrolled subjects (pinned version + route). */
function listedWhere(enrollments: readonly EnrollmentView[]) {
  return {
    status: "PUBLISHED" as const,
    draftOfId: null,
    schoolId: null,
    ownerUserId: null,
    kind: { in: [...EXAM_KINDS] },
    OR: enrollments.map((e) => ({
      subjectId: e.subject.id,
      AND: [
        { OR: [{ syllabusId: null }, { syllabusId: e.syllabus.id }] },
        { OR: [{ routeId: null }, ...(e.route ? [{ routeId: e.route.id }] : [])] },
      ],
    })),
  };
}

function sectionQuestionCount(section: { _count: { items: number }; rules: { questionCount: number }[] }): number {
  return section._count.items + section.rules.reduce((sum, rule) => sum + rule.questionCount, 0);
}

function timingOf(assessment: { timeLimitSeconds: number | null; sections: { timeLimitSeconds: number | null }[] }): {
  timeLimitSeconds: number | null;
  timedPaperCount: number;
} {
  const timed = assessment.sections.filter((s) => s.timeLimitSeconds !== null);
  if (assessment.timeLimitSeconds !== null) return { timeLimitSeconds: assessment.timeLimitSeconds, timedPaperCount: timed.length > 1 ? timed.length : 0 };
  if (timed.length > 0 && timed.length === assessment.sections.length) {
    return { timeLimitSeconds: timed.reduce((sum, s) => sum + (s.timeLimitSeconds ?? 0), 0), timedPaperCount: timed.length };
  }
  return { timeLimitSeconds: null, timedPaperCount: 0 };
}

/** Plan entitlements per subject (study packs are subject-scoped) and the usage counters the gates need. */
async function accessContext(
  actor: LearnerActor,
  subjects: readonly { id: string; syllabusId: string }[],
  kinds: readonly AssessmentKind[],
  now: Date,
): Promise<{ entitlementsBySubject: Map<string, Entitlements>; usage: Partial<Record<LimitFeature, number>> }> {
  const limits = [...new Set(kinds.map((kind) => gatesFor(kind, { accessTier: "PREMIUM", planExempt: false }).limit).filter((l): l is LimitFeature => l !== null))];
  const timeZone = limits.length > 0 ? await timeZoneOf(actor) : null;
  const [entitlements, counts] = await Promise.all([
    Promise.all(subjects.map((s) => getSubjectEntitlements(actor.userId, s.id, { syllabusId: s.syllabusId }))),
    Promise.all(limits.map((feature) => usageFor(actor.userId, feature, timeZone ?? undefined, now))),
  ]);
  const usage: Partial<Record<LimitFeature, number>> = {};
  limits.forEach((feature, index) => {
    usage[feature] = counts[index] ?? 0;
  });
  return { entitlementsBySubject: new Map(subjects.map((s, index) => [s.id, entitlements[index] as Entitlements])), usage };
}

function toHistoryItem(row: {
  id: string;
  mode: AttemptMode;
  status: AttemptStatus;
  submitReason: AttemptSubmitReason | null;
  percentage: number | null;
  marksAwarded: number | null;
  totalMarks: number | null;
  gradeEstimate: string | null;
  pendingReviewCount: number;
  startedAt: Date;
  submittedAt: Date | null;
  assessment: { title: string } | null;
  subject: { name: string };
}): ExamHistoryItem {
  return {
    attemptId: row.id,
    mode: row.mode,
    modeLabel: attemptModeLabel(row.mode),
    title: row.assessment?.title ?? attemptModeLabel(row.mode),
    subjectName: row.subject.name,
    status: row.status,
    submitReason: row.submitReason,
    percentage: row.percentage,
    marksAwarded: row.marksAwarded,
    totalMarks: row.totalMarks,
    gradeEstimate: row.gradeEstimate,
    isProvisional: row.status === "AWAITING_MARKING" || row.status === "SUBMITTED" || row.pendingReviewCount > 0,
    startedAt: row.startedAt,
    submittedAt: row.submittedAt,
    href: row.status === "IN_PROGRESS" ? roomHref(row.id) : resultsHref(row.id),
  };
}

const HISTORY_SELECT = {
  id: true,
  mode: true,
  status: true,
  submitReason: true,
  percentage: true,
  marksAwarded: true,
  totalMarks: true,
  gradeEstimate: true,
  pendingReviewCount: true,
  startedAt: true,
  submittedAt: true,
  assessment: { select: { title: true } },
  subject: { select: { name: true } },
} as const;

/** Test and exam attempts that ended (newest first), cursor-paginated (rule 11). */
export async function listExamHistory(
  actor: LearnerActor,
  options: { subjectId?: string | null; cursor?: string | null; limit?: number } = {},
): Promise<{ items: ExamHistoryItem[]; nextCursor: string | null }> {
  assertStudent(actor);
  const limit = Math.min(50, Math.max(1, options.limit ?? HISTORY_PAGE_SIZE));
  const cursor = options.cursor && uuid.safeParse(options.cursor).success ? options.cursor : null;
  const subjectId = options.subjectId && uuid.safeParse(options.subjectId).success ? options.subjectId : null;
  const rows = await db.assessmentAttempt.findMany({
    where: {
      userId: actor.userId,
      mode: { in: [...GRADED_MODES] },
      status: { in: ["MARKED", "AWAITING_MARKING", "SUBMITTED", "EXPIRED"] },
      ...(subjectId ? { subjectId } : {}),
    },
    orderBy: [{ startedAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: HISTORY_SELECT,
  });
  const page = rows.slice(0, limit);
  return { items: page.map(toHistoryItem), nextCursor: rows.length > limit ? (page[page.length - 1]?.id ?? null) : null };
}

/**
 * The exams page (§12): PUBLISHED platform assessments of the student's enrolled subjects grouped by kind, with access
 * from the plan, attempts used and best score; plus unfinished attempts to resume. `topicId` narrows the list to
 * tests covering that topic (its ancestors or descendants), e.g. "Take a topic test" from a results page.
 */
export async function getExamCatalogue(
  actor: LearnerActor,
  options: { subjectId?: string | null; topicId?: string | null; now?: Date } = {},
): Promise<ExamCatalogue> {
  assertStudent(actor);
  const now = options.now ?? new Date();
  const enrollments = await listEnrollments(actor);
  const subjects = enrollments.map((e) => ({ id: e.subject.id, name: e.subject.name }));

  let topic: ExamCatalogue["topic"] = null;
  let topicNotFound = false;
  let topicPath: string | null = null;
  if (options.topicId) {
    const row = uuid.safeParse(options.topicId).success
      ? await db.topic.findUnique({ where: { id: options.topicId }, select: { id: true, name: true, path: true, syllabusId: true } })
      : null;
    const enrollment = row ? enrollments.find((e) => e.syllabus.id === row.syllabusId) : undefined;
    if (row && enrollment) {
      topic = { id: row.id, name: row.name, subjectId: enrollment.subject.id };
      topicPath = row.path;
    } else {
      topicNotFound = true;
    }
  }
  const selectedSubjectId = topic?.subjectId ?? subjects.find((s) => s.id === options.subjectId)?.id ?? null;
  const scoped = selectedSubjectId ? enrollments.filter((e) => e.subject.id === selectedSubjectId) : enrollments;

  const inProgressRows = await db.assessmentAttempt.findMany({
    where: { userId: actor.userId, status: "IN_PROGRESS", mode: { in: [...GRADED_MODES] }, ...(selectedSubjectId ? { subjectId: selectedSubjectId } : {}) },
    orderBy: { startedAt: "desc" },
    take: 5,
    select: HISTORY_SELECT,
  });
  if (scoped.length === 0) return { subjects, selectedSubjectId, topic, topicNotFound, groups: [], inProgress: inProgressRows.map(toHistoryItem) };

  const ancestorIds = topicPath ? topicPath.split("/").filter(Boolean) : [];
  const assessments = await db.assessment.findMany({
    where: {
      ...listedWhere(scoped),
      ...(topicPath
        ? { topics: { some: { OR: [{ topicId: { in: ancestorIds } }, { topic: { path: { startsWith: `${topicPath}/` } } }] } } }
        : {}),
    },
    orderBy: [{ title: "asc" }, { id: "asc" }],
    take: MAX_LISTED_ASSESSMENTS,
    select: ASSESSMENT_LIST_SELECT,
  });
  const ids = assessments.map((a) => a.id);
  const [stats, open, access] = await Promise.all([
    ids.length
      ? db.assessmentAttempt.groupBy({
          by: ["assessmentId"],
          where: { userId: actor.userId, assessmentId: { in: ids } },
          _count: { _all: true },
          _max: { percentage: true },
        })
      : Promise.resolve([]),
    ids.length
      ? db.assessmentAttempt.findMany({ where: { userId: actor.userId, status: "IN_PROGRESS", assessmentId: { in: ids } }, select: { id: true, assessmentId: true } })
      : Promise.resolve([]),
    accessContext(
      actor,
      scoped.map((e) => ({ id: e.subject.id, syllabusId: e.syllabus.id })),
      [...new Set(assessments.map((a) => a.kind))],
      now,
    ),
  ]);
  const statsById = new Map(stats.map((s) => [s.assessmentId, s]));
  const openById = new Map(open.map((o) => [o.assessmentId, o.id]));
  const subjectName = new Map(subjects.map((s) => [s.id, s.name]));

  const items: ExamListItem[] = assessments.map((a) => {
    const stat = statsById.get(a.id);
    const attemptsUsed = stat?._count._all ?? 0;
    const entitlements = access.entitlementsBySubject.get(a.subjectId);
    return {
      id: a.id,
      kind: a.kind as ExamKind,
      kindLabel: attemptModeLabel(a.kind),
      title: a.title,
      description: a.description,
      subject: { id: a.subjectId, name: subjectName.get(a.subjectId) ?? "" },
      ...timingOf(a),
      questionCount: a.sections.reduce((sum, s) => sum + sectionQuestionCount(s), 0),
      totalMarks: a.totalMarks,
      topics: [...a.topics].sort((x, y) => x.topic.sortOrder - y.topic.sortOrder).map((t) => t.topic.name),
      accessTier: a.accessTier,
      attemptsUsed,
      maxAttempts: a.maxAttempts,
      bestPercent: stat?._max.percentage ?? null,
      access: entitlements
        ? examAccess({
            kind: a.kind,
            accessTier: a.accessTier,
            maxAttempts: a.maxAttempts,
            attemptsUsed,
            openAttemptId: openById.get(a.id) ?? null,
            entitlements,
            usage: access.usage,
          })
        : { status: "NOT_ENROLLED", message: "Add this subject to your subjects first." },
    };
  });

  const groups = EXAM_KINDS.map((kind) => ({ kind, label: EXAM_KIND_GROUP_LABELS[kind], items: items.filter((item) => item.kind === kind) })).filter(
    (group) => group.items.length > 0,
  );
  return { subjects, selectedSubjectId, topic, topicNotFound, groups, inProgress: inProgressRows.map(toHistoryItem) };
}

// =====================================================================================================================
// Instructions (§13 "exam instructions") and starting
// =====================================================================================================================

export interface ExamPaperInfo {
  title: string;
  instructionsHtml: SanitizedHtml | null;
  /** Limit as defined; `adjustedTimeLimitSeconds` includes the student's extra time. */
  timeLimitSeconds: number | null;
  adjustedTimeLimitSeconds: number | null;
  questionCount: number;
  marks: number | null;
  answerCount: number | null;
}

export interface ExamInstructions {
  id: string;
  kind: ExamKind;
  kindLabel: string;
  title: string;
  description: string | null;
  instructionsHtml: SanitizedHtml | null;
  subject: { id: string; name: string };
  timeLimitSeconds: number | null;
  adjustedTimeLimitSeconds: number | null;
  timedPaperCount: number;
  extraTimePercent: number | null;
  totalMarks: number;
  questionCount: number;
  papers: ExamPaperInfo[];
  topics: string[];
  allowNavigation: boolean;
  /** Marks and explanations appear after each question (the test runs like practice) instead of after submitting. */
  immediateFeedback: boolean;
  feedbackTiming: AssessmentFeedbackTiming;
  maxAttempts: number | null;
  attemptsUsed: number;
  access: ExamAccess;
  /** This student's earlier attempts at this test (newest first). */
  previousAttempts: ExamHistoryItem[];
}

function withExtraTime(seconds: number | null, percent: number | null): number | null {
  if (seconds === null) return null;
  return percent ? Math.ceil(seconds * (1 + Math.min(100, percent) / 100)) : seconds;
}

/**
 * The instructions page of an assessment (§13): title, subject, papers, marks, time limit (with the student's
 * extra time), number of questions, access and earlier attempts.
 *
 * @throws AppError NOT_FOUND (not a published platform assessment for one of the student's subjects / versions)
 */
export async function getExamInstructions(actor: LearnerActor, assessmentId: string, now: Date = new Date()): Promise<ExamInstructions> {
  assertStudent(actor);
  if (!uuid.safeParse(assessmentId).success) throw AppError.notFound("Test not found.");
  const assessment = await db.assessment.findFirst({
    where: { id: assessmentId, status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null, kind: { in: [...EXAM_KINDS] } },
    select: { ...ASSESSMENT_LIST_SELECT, instructions: true, syllabusId: true, routeId: true, subject: { select: { name: true } } },
  });
  if (!assessment) throw AppError.notFound("Test not found.");
  const [enrollment, student, attemptsUsed, open, previous] = await Promise.all([
    db.subjectEnrollment.findUnique({
      where: { userId_subjectId: { userId: actor.userId, subjectId: assessment.subjectId } },
      select: { status: true, syllabusId: true, routeId: true },
    }),
    db.student.findUnique({ where: { userId: actor.userId }, select: { examExtraTimePercent: true } }),
    db.assessmentAttempt.count({ where: { userId: actor.userId, assessmentId } }),
    db.assessmentAttempt.findFirst({ where: { userId: actor.userId, assessmentId, status: "IN_PROGRESS" }, select: { id: true } }),
    db.assessmentAttempt.findMany({
      where: { userId: actor.userId, assessmentId, status: { in: ["MARKED", "AWAITING_MARKING", "SUBMITTED", "EXPIRED"] } },
      orderBy: [{ startedAt: "desc" }, { id: "desc" }],
      take: 3,
      select: HISTORY_SELECT,
    }),
  ]);
  const enrolled = enrollment !== null && (enrollment.status === "ACTIVE" || enrollment.status === "PAUSED");
  if (
    enrolled &&
    ((assessment.syllabusId !== null && assessment.syllabusId !== enrollment.syllabusId) ||
      (assessment.routeId !== null && assessment.routeId !== enrollment.routeId))
  ) {
    throw AppError.notFound("This test isn't available for your syllabus.");
  }

  let access: ExamAccess;
  if (!enrolled) {
    access = { status: "NOT_ENROLLED", message: `Add ${assessment.subject.name} to your subjects to take this test.` };
  } else {
    const context = await accessContext(actor, [{ id: assessment.subjectId, syllabusId: enrollment.syllabusId }], [assessment.kind], now);
    access = examAccess({
      kind: assessment.kind,
      accessTier: assessment.accessTier,
      maxAttempts: assessment.maxAttempts,
      attemptsUsed,
      openAttemptId: open?.id ?? null,
      entitlements: context.entitlementsBySubject.get(assessment.subjectId) as Entitlements,
      usage: context.usage,
    });
  }

  const extra = student?.examExtraTimePercent && student.examExtraTimePercent > 0 ? student.examExtraTimePercent : null;
  const timing = timingOf(assessment);
  const kind = assessment.kind as ExamKind;
  const immediateFeedback = kind !== "TIMED_EXAM" && kind !== "MOCK_EXAM" && assessment.feedbackTiming === "IMMEDIATE";
  return {
    id: assessment.id,
    kind,
    kindLabel: attemptModeLabel(kind),
    title: assessment.title,
    description: assessment.description,
    instructionsHtml: assessment.instructions?.trim()
      ? renderContent(assessment.instructions, { idPrefix: "exam-instructions-", baseHeadingLevel: 3 }).html
      : null,
    subject: { id: assessment.subjectId, name: assessment.subject.name },
    timeLimitSeconds: timing.timeLimitSeconds,
    adjustedTimeLimitSeconds: withExtraTime(timing.timeLimitSeconds, extra),
    timedPaperCount: timing.timedPaperCount,
    extraTimePercent: extra,
    totalMarks: assessment.totalMarks,
    questionCount: assessment.sections.reduce((sum, s) => sum + sectionQuestionCount(s), 0),
    papers: assessment.sections.map((section, index) => ({
      title: section.title,
      instructionsHtml: section.instructions?.trim()
        ? renderContent(section.instructions, { idPrefix: `exam-paper-${index + 1}-`, baseHeadingLevel: 4 }).html
        : null,
      timeLimitSeconds: section.timeLimitSeconds,
      adjustedTimeLimitSeconds: withExtraTime(section.timeLimitSeconds, extra),
      questionCount: sectionQuestionCount(section),
      marks: section.marks,
      answerCount: section.answerCount,
    })),
    topics: [...assessment.topics].sort((x, y) => x.topic.sortOrder - y.topic.sortOrder).map((t) => t.topic.name),
    allowNavigation: assessment.allowNavigation,
    immediateFeedback,
    feedbackTiming: assessment.feedbackTiming,
    maxAttempts: assessment.maxAttempts,
    attemptsUsed,
    access,
    previousAttempts: previous.map(toHistoryItem),
  };
}

export const startExamSchema = z.strictObject({
  assessmentId: z.uuid(),
  idempotencyKey: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,64}$/)
    .optional(),
  origin: z.enum(["BUILDER", "PLAN_ITEM", "RECOMMENDATION"]).optional(),
});
export type StartExamInput = z.input<typeof startExamSchema>;

export interface StartedExam {
  attemptId: string;
  resumed: boolean;
  /** The exam room, or the practice runner for tests with immediate feedback. */
  href: string;
}

/**
 * Starts (or resumes: one open attempt per test, same idempotency key) an assessment in an enrolled subject. The
 * engine applies the plan gates, selects the questions, fixes the server deadline (with extra time) and schedules the
 * auto-submit job.
 *
 * @throws AppError VALIDATION (not enrolled) | NOT_FOUND | CONFLICT (no attempts left) | ENTITLEMENT_REQUIRED |
 *         QUOTA_EXCEEDED | BAD_REQUEST (test not configured)
 */
export async function startExam(actor: LearnerActor, input: StartExamInput, now: Date = new Date()): Promise<StartedExam> {
  assertStudent(actor);
  const parsed = parse(startExamSchema, input);
  const assessment = await db.assessment.findFirst({
    where: { id: parsed.assessmentId, status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null, kind: { in: [...EXAM_KINDS] } },
    select: { id: true, kind: true, subjectId: true, subject: { select: { name: true } } },
  });
  if (!assessment) throw AppError.notFound("Test not found.");
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId: assessment.subjectId } },
    select: { status: true },
  });
  if (!enrollment || (enrollment.status !== "ACTIVE" && enrollment.status !== "PAUSED")) {
    throw AppError.validation({ assessmentId: [`Add ${assessment.subject.name} to your subjects before taking this test.`] });
  }
  const started = await startAttempt(
    actor,
    {
      mode: assessment.kind,
      subjectId: assessment.subjectId,
      assessmentId: assessment.id,
      origin: parsed.origin ?? "BUILDER",
      ...(parsed.idempotencyKey ? { idempotencyKey: parsed.idempotencyKey } : {}),
    },
    { now },
  );
  const attempt = started.attempt;
  const href = attempt.feedback === "IMMEDIATE" ? `/app/practice/${attempt.id}` : roomHref(attempt.id);
  return { attemptId: attempt.id, resumed: started.resumed, href };
}

// =====================================================================================================================
// Exam room (§13)
// =====================================================================================================================

export type ExamRoomLoad = { kind: "ROOM"; room: ExamRoomData } | { kind: "REDIRECT"; href: string };

/**
 * The exam room: every question presented server-side (answer-safe), the student's saved answers and flags with their
 * save versions, papers and the server clock. Attempts that belong elsewhere (practice runner, results) redirect.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function getExamRoom(actor: LearnerActor, attemptId: string, now: Date = new Date()): Promise<ExamRoomLoad> {
  assertStudent(actor);
  assertAttemptId(attemptId);
  const view = await getAttemptForStudent(actor, attemptId, { now });
  const redirect = examRoomRedirect(view);
  if (redirect) return { kind: "REDIRECT", href: redirect };

  const views = view.questions.flatMap((slot) => (slot.question ? [slot.question] : []));
  const resolveAsset = await loadQuestionAssets(views);

  const questions: ExamQuestion[] = view.questions.map((slot) => ({
    position: slot.position,
    sectionNumber: slot.sectionNumber,
    marks: slot.marksAvailable,
    flagged: slot.flagged,
    response: slot.question ? normalizeResponse(slot.question.type, slot.response) : null,
    responseVersion: slot.responseVersion,
    question: slot.question ? withSlotMarks(presentQuestion(slot.question, resolveAsset), slot.marksAvailable) : null,
  }));
  const clock = toExamClock(view.id, true, view.deadlineAt, view.sections, now);
  const sections: ExamSection[] = view.sections.map((section) => {
    const sectionClock = clock.sections.find((s) => s.sectionNumber === section.sectionNumber);
    const slots = questions.filter((q) => q.sectionNumber === section.sectionNumber);
    return {
      sectionNumber: section.sectionNumber,
      title: section.title,
      answerCount: section.answerCount,
      marks: section.maxMarks ?? slots.reduce((sum, q) => sum + q.marks, 0),
      positions: slots.map((q) => q.position),
      timeLimitSeconds: section.timeLimitSeconds,
      startedAtMs: sectionClock?.startedAtMs ?? null,
      deadlineMs: sectionClock?.deadlineMs ?? null,
      finishedAtMs: sectionClock?.finishedAtMs ?? null,
    };
  });
  const totalMarks =
    sections.length > 0
      ? sections.reduce((sum, s) => sum + s.marks, 0) + questions.filter((q) => q.sectionNumber === null).reduce((sum, q) => sum + q.marks, 0)
      : questions.reduce((sum, q) => sum + q.marks, 0);

  return {
    kind: "ROOM",
    room: {
      attemptId: view.id,
      title: view.assessment?.title ?? attemptModeLabel(view.mode),
      kindLabel: attemptModeLabel(view.mode),
      subject: view.subject,
      allowNavigation: view.allowNavigation,
      clock,
      sections,
      questions,
      startPosition: clampPosition(view.lastPosition, questions.length),
      totalMarks,
      extraTimePercent: view.extraTimePercent,
    },
  };
}

export const saveExamSchema = z.strictObject({
  attemptId: z.uuid(),
  position: z.int().min(1).max(32_767),
  response: z.unknown().optional(),
  flagged: z.boolean().optional(),
  responseVersion: z.int().min(0).max(2_000_000_000).optional(),
  clientSavedAtMs: z.number().int().min(0).max(8_640_000_000_000).optional(),
  timeSpentSeconds: z.number().min(0).max(86_400).optional(),
});

/**
 * Autosave of one answer and/or its flag (§12 "save progress", §13 "flag question"). The engine validates the answer
 * against the question type, enforces the deadline (+ late-sync grace for answers made before it) and ignores stale
 * replays; nothing is marked until submission.
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT (submitted, time up, paper finished)
 */
export async function saveExamResponse(actor: LearnerActor, input: SaveExamInput, now: Date = new Date()): Promise<SaveExamResult> {
  assertStudent(actor);
  const parsed = parse(saveExamSchema, input);
  const result = await saveResponse(
    actor,
    parsed.attemptId,
    parsed.position,
    "response" in parsed ? (parsed.response as QuestionResponse | null | undefined) : undefined,
    {
      now,
      ...(parsed.flagged !== undefined ? { flagged: parsed.flagged } : {}),
      ...(parsed.responseVersion !== undefined ? { responseVersion: parsed.responseVersion } : {}),
      ...(parsed.clientSavedAtMs !== undefined ? { clientSavedAt: new Date(parsed.clientSavedAtMs) } : {}),
      ...(parsed.timeSpentSeconds !== undefined ? { timeSpentSeconds: parsed.timeSpentSeconds } : {}),
    },
  );
  return {
    position: result.position,
    saved: result.saved,
    stale: result.stale,
    lateSync: result.lateSync,
    flagged: result.flagged,
    answered: result.answered,
    responseVersion: result.responseVersion,
    serverNowMs: now.getTime(),
    deadlineMs: result.timer?.deadlineMs ?? null,
  };
}

async function loadClockRow(actor: LearnerActor, attemptId: string) {
  const row = await db.assessmentAttempt.findFirst({
    where: { id: attemptId, userId: actor.userId },
    select: { id: true, status: true, startedAt: true, deadlineAt: true, sections: { select: SECTION_CLOCK_SELECT } },
  });
  if (!row) throw AppError.notFound("Attempt not found.");
  return row;
}

/**
 * The server clock of an attempt (re-sync on focus / visibility change). An attempt whose deadline and late-sync grace
 * have passed is closed here if the auto-submit job has not run yet; `open: false` tells the client to show results.
 */
export async function getExamClock(actor: LearnerActor, attemptId: string, now: Date = new Date()): Promise<ExamClock> {
  assertStudent(actor);
  assertAttemptId(attemptId);
  let row = await loadClockRow(actor, attemptId);
  if (
    row.status === "IN_PROGRESS" &&
    row.deadlineAt !== null &&
    expiryAction({ status: "IN_PROGRESS", startedAt: row.startedAt, deadline: row.deadlineAt }, now) === "AUTO_SUBMIT"
  ) {
    await closeAttemptIfDue(attemptId, { now });
    row = await loadClockRow(actor, attemptId);
  }
  return toExamClock(row.id, row.status === "IN_PROGRESS", row.deadlineAt, row.sections, now);
}

export const examSectionSchema = z.strictObject({ attemptId: z.uuid(), sectionNumber: z.int().min(1).max(32_767) });

/** Runs `fn` under the attempt row lock (serialises with saves, submits and the auto-submit job). */
async function withOpenAttempt<T>(
  actor: LearnerActor,
  attemptId: string,
  fn: (tx: DbClient, sections: SectionRow[], deadlineAt: Date | null) => Promise<T>,
): Promise<T> {
  return db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, attemptId))) throw AppError.notFound("Attempt not found.");
    const context = await requireOwnAttempt(tx, actor, attemptId);
    if (context.status !== "IN_PROGRESS") throw AppError.conflict("This exam has been submitted.");
    const sections = await tx.assessmentAttemptSection.findMany({ where: { attemptId }, select: SECTION_CLOCK_SELECT });
    return fn(tx, sections, context.deadlineAt);
  }, TX_OPTIONS);
}

/**
 * Starts the clock of a separately timed paper (multi-paper mocks, §12): deadline = now + the paper's limit (extra
 * time already applied at attempt start). One paper runs at a time. Starting a running or untimed paper is a no-op.
 *
 * @throws AppError NOT_FOUND | CONFLICT (submitted, paper finished, another paper running)
 */
export async function startExamSection(actor: LearnerActor, input: ExamSectionInput, now: Date = new Date()): Promise<ExamClock> {
  assertStudent(actor);
  const { attemptId, sectionNumber } = parse(examSectionSchema, input);
  await withOpenAttempt(actor, attemptId, async (tx, sections, deadlineAt) => {
    const clock = toExamClock(attemptId, true, deadlineAt, sections, now);
    const decision = sectionStartDecision(clock.sections, sectionNumber, now.getTime());
    switch (decision.kind) {
      case "UNKNOWN":
        throw AppError.notFound("Paper not found.");
      case "CLOSED":
        throw AppError.conflict("This paper is finished.");
      case "BLOCKED": {
        const running = await tx.assessmentAttemptSection.findUnique({
          where: { attemptId_sectionNumber: { attemptId, sectionNumber: decision.runningSectionNumber } },
          select: { title: true },
        });
        throw AppError.conflict(`Finish ${running?.title ?? "the paper you are working on"} before starting another paper.`);
      }
      case "START": {
        const section = sections.find((s) => s.sectionNumber === sectionNumber) as SectionRow;
        await tx.assessmentAttemptSection.update({
          where: { attemptId_sectionNumber: { attemptId, sectionNumber } },
          data: { startedAt: now, deadlineAt: new Date(now.getTime() + (section.timeLimitSeconds as number) * 1000) },
        });
        await tx.assessmentAttempt.update({ where: { id: attemptId }, data: { lastSavedAt: now } });
        return;
      }
      default:
        return;
    }
  });
  return getExamClock(actor, attemptId, now);
}

/**
 * Finishes a running paper early: its answers are locked (the engine rejects later saves to it) so the next paper can
 * be started. Marking still happens when the whole exam is submitted.
 *
 * @throws AppError NOT_FOUND | CONFLICT (submitted, paper not running)
 */
export async function finishExamSection(actor: LearnerActor, input: ExamSectionInput, now: Date = new Date()): Promise<ExamClock> {
  assertStudent(actor);
  const { attemptId, sectionNumber } = parse(examSectionSchema, input);
  await withOpenAttempt(actor, attemptId, async (tx, sections, deadlineAt) => {
    const clock = toExamClock(attemptId, true, deadlineAt, sections, now);
    const decision = sectionFinishDecision(clock.sections, sectionNumber, now.getTime());
    switch (decision.kind) {
      case "UNKNOWN":
        throw AppError.notFound("Paper not found.");
      case "NOT_STARTED":
        throw AppError.conflict("This paper hasn't started yet.");
      case "UNTIMED":
        throw new AppError("BAD_REQUEST", "This paper is finished when you submit the exam.");
      case "CLOSED":
        return;
      case "FINISH":
        await tx.assessmentAttemptSection.update({ where: { attemptId_sectionNumber: { attemptId, sectionNumber } }, data: { submittedAt: now } });
    }
  });
  return getExamClock(actor, attemptId, now);
}

export const submitExamSchema = z.strictObject({ attemptId: z.uuid(), reason: z.enum(["STUDENT", "TIME_UP"]) });

/**
 * Submits the exam (§13 "submit exam"). `STUDENT`: marks, scores and analyses it now (idempotent). `TIME_UP` (the
 * client's countdown reached zero): closes it with reason TIME_EXPIRED only when the SERVER clock says time is up
 * (overall deadline passed, or every timed paper is over); otherwise returns the fresh clock so the client re-syncs.
 * A closed attempt simply returns its results link.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function submitExam(actor: LearnerActor, input: SubmitExamInput, now: Date = new Date()): Promise<SubmitExamResult> {
  assertStudent(actor);
  const { attemptId, reason } = parse(submitExamSchema, input);
  if (reason === "STUDENT") {
    await submitAttempt(actor, attemptId, { now });
    return { submitted: true, resultsHref: resultsHref(attemptId) };
  }
  let due = true;
  await db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, attemptId))) throw AppError.notFound("Attempt not found.");
    const context = await requireOwnAttempt(tx, actor, attemptId);
    if (context.status !== "IN_PROGRESS") return;
    const sections = await tx.assessmentAttemptSection.findMany({ where: { attemptId }, select: SECTION_CLOCK_SELECT });
    if (!timeUpDue(toExamClock(attemptId, true, context.deadlineAt, sections, now), now.getTime())) {
      due = false;
      return;
    }
    await finalizeAttempt(tx, context, "TIME_EXPIRED", now);
  }, TX_OPTIONS);
  if (!due) return { submitted: false, clock: await getExamClock(actor, attemptId, now) };
  return { submitted: true, resultsHref: resultsHref(attemptId) };
}

// =====================================================================================================================
// Results (§12)
// =====================================================================================================================

export interface ExamReviewItem {
  position: number;
  sectionNumber: number | null;
  question: PresentedQuestion | null;
  response: QuestionResponse | null;
  feedback: PresentedFeedback | null;
}

export interface ExamSectionResult {
  sectionNumber: number;
  title: string;
  marksAwarded: number | null;
  marks: number;
}

export interface ExamResults {
  attemptId: string;
  mode: AttemptMode;
  modeLabel: string;
  title: string;
  subject: { id: string; name: string };
  assessmentId: string | null;
  status: AttemptStatus;
  submitReason: AttemptSubmitReason | null;
  submittedAt: Date | null;
  lateSync: boolean;
  score: AttemptScore | null;
  /** Nothing was answered (time ran out or the exam was submitted empty). */
  nothingAnswered: boolean;
  /** Marks of answers still waiting for AI or teacher marking (excluded from the score until marked). */
  pendingMarks: number;
  grade: GradeEstimateView | null;
  /** "3 more marks would have reached B" (estimate), from the analysis. */
  nextGrade: { grade: string; marks: number } | null;
  topics: TopicResultView[];
  strongAreas: TopicResultView[];
  weakAreas: TopicResultView[];
  /** Recommendations with working in-app links (§12 "Probability → Lesson 4"). */
  recommendations: (RecommendationView & { href: string })[];
  sections: ExamSectionResult[];
  time: { avgSecondsPerMark: number; unansweredCount: number } | null;
  /**
   * Answers and explanations are held back for now (a teacher's test that reveals them only after the assignment
   * closes); `review` is then empty.
   */
  answersWithheld: boolean;
  /** Written answers waiting for marking that the student may mark themselves (AI marking not configured). */
  selfAssessableCount: number;
  review: ExamReviewItem[];
  /** The instructions page when the test may be taken again. */
  retakeHref: string | null;
}

export type ExamResultsLoad = { kind: "RESULTS"; results: ExamResults } | { kind: "REDIRECT"; href: string };

/**
 * Results of a submitted test or exam (§12): score and percentage, the grade ESTIMATE with its scheme's disclaimer,
 * marking still pending, strong and weak topics, recommended study with links, per-paper marks and every question
 * with the student's answer, the correct answer and the explanation. Diagnostics open their own report (§52), which
 * builds on these results (`diagnosticReport: true`).
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function getExamResults(
  actor: LearnerActor,
  attemptId: string,
  options: { diagnosticReport?: boolean } = {},
): Promise<ExamResultsLoad> {
  assertStudent(actor);
  assertAttemptId(attemptId);
  const view = await getAttemptForStudent(actor, attemptId);
  const redirect = examResultsRedirect(view, options);
  if (redirect) return { kind: "REDIRECT", href: redirect };

  const result = view.result;
  const views = view.questions.flatMap((slot) => (slot.question ? [slot.question] : []));
  const [questionAssets, revealAssets, retake] = await Promise.all([
    loadQuestionAssets(views),
    loadRevealAssets(view.questions.map((slot) => slot.result?.reveal ?? null)),
    view.assessment ? retakeHrefFor(actor, view.assessment.id) : Promise.resolve(null),
  ]);
  const topicName = new Map((result?.topics ?? []).map((t) => [t.topicId, t]));
  const pickTopics = (ids: readonly string[]) => ids.flatMap((id) => (topicName.has(id) ? [topicName.get(id) as TopicResultView] : []));
  const pendingMarks = view.questions.reduce((sum, slot) => sum + (slot.result?.status === "PENDING" && slot.answered ? slot.marksAvailable : 0), 0);
  const analysisGrade = result?.analysis?.grade;
  const answersWithheld = view.questions.length > 0 && view.questions.every((slot) => slot.result === null);
  const review: ExamReviewItem[] = (answersWithheld ? [] : view.questions).map((slot) => ({
    position: slot.position,
    sectionNumber: slot.sectionNumber,
    question: slot.question ? withSlotMarks(presentQuestion(slot.question, questionAssets), slot.marksAvailable) : null,
    response: slot.question ? normalizeResponse(slot.question.type, slot.response) : null,
    feedback: unansweredAsSuch(presentSlotFeedback(slot, { resolveAsset: revealAssets, selfAssessment: slotSelfAssessment(slot) }), slot.answered),
  }));

  return {
    kind: "RESULTS",
    results: {
      attemptId: view.id,
      mode: view.mode,
      modeLabel: attemptModeLabel(view.mode),
      title: view.assessment?.title ?? attemptModeLabel(view.mode),
      subject: view.subject,
      assessmentId: view.assessment?.id ?? null,
      status: view.status,
      submitReason: result?.submitReason ?? null,
      submittedAt: result?.submittedAt ?? view.submittedAt,
      lateSync: view.lateSync,
      score: result?.score ?? null,
      nothingAnswered: view.status === "EXPIRED" || view.status === "ABANDONED" || (result?.score.answeredCount ?? 0) === 0,
      pendingMarks,
      grade: result?.grade ?? null,
      nextGrade:
        analysisGrade?.nextGrade && analysisGrade.marksToNextGrade !== undefined && analysisGrade.marksToNextGrade > 0
          ? { grade: analysisGrade.nextGrade, marks: analysisGrade.marksToNextGrade }
          : null,
      topics: result?.topics ?? [],
      strongAreas: pickTopics(result?.strongTopicIds ?? []),
      weakAreas: pickTopics(result?.weakTopicIds ?? []),
      recommendations: (result?.recommendations ?? []).flatMap((rec) => (rec.href ? [{ ...rec, href: rec.href }] : [])),
      sections: view.sections.map((section) => ({
        sectionNumber: section.sectionNumber,
        title: section.title,
        marksAwarded: section.marksAwarded,
        marks: section.maxMarks ?? view.questions.filter((q) => q.sectionNumber === section.sectionNumber).reduce((sum, q) => sum + q.marksAvailable, 0),
      })),
      time: result?.analysis?.time ?? null,
      answersWithheld,
      selfAssessableCount: review.filter((item) => item.feedback?.selfAssessment).length,
      review,
      retakeHref: retake,
    },
  };
}

export const selfAssessExamSchema = z.strictObject({
  attemptId: z.uuid(),
  position: z.int().min(1).max(32_767),
  pointIds: z.array(z.string().min(1).max(64)).max(100).default([]),
  marks: z.int().min(0).max(1_000).default(0),
});
export type SelfAssessExamInput = z.input<typeof selfAssessExamSchema>;

/**
 * Self-marking of a written answer on the results page (or the diagnostic report) when AI marking is not configured:
 * the attempt engine's `recordSelfAssessment` (mark-scheme points summed on the server; SELF_ASSESSED, effort-only XP,
 * lower mastery weight). The attempt is re-scored; returns the answer's presented feedback with the new mark.
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT (already marked) | BAD_REQUEST (not self-assessable)
 */
export async function selfAssessExamAnswer(actor: LearnerActor, input: SelfAssessExamInput): Promise<PresentedFeedback> {
  assertStudent(actor);
  const parsed = parse(selfAssessExamSchema, input);
  await recordSelfAssessment(actor, parsed.attemptId, parsed.position, { pointIds: parsed.pointIds, marks: parsed.marks });
  const view = await getAttemptForStudent(actor, parsed.attemptId);
  const slot = view.questions.find((s) => s.position === parsed.position);
  const resolveAsset = await loadRevealAssets([slot?.result?.reveal ?? null]);
  const feedback = slot ? presentSlotFeedback(slot, { resolveAsset, selfAssessment: slotSelfAssessment(slot) }) : null;
  if (!feedback) throw AppError.notFound("Question not found in this attempt.");
  return feedback;
}

/**
 * A question left blank in an attempt that closed without marking (time ran out with nothing saved) is "Not answered",
 * never "Marking in progress".
 */
export function unansweredAsSuch(feedback: PresentedFeedback | null, answered: boolean): PresentedFeedback | null {
  if (!feedback || answered || feedback.outcome !== "pending") return feedback;
  return { ...feedback, outcome: "unanswered", marksAwarded: 0 };
}

async function retakeHrefFor(actor: LearnerActor, assessmentId: string): Promise<string | null> {
  const [assessment, used] = await Promise.all([
    db.assessment.findFirst({
      where: { id: assessmentId, status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null, kind: { in: [...EXAM_KINDS] } },
      select: { maxAttempts: true },
    }),
    db.assessmentAttempt.count({ where: { userId: actor.userId, assessmentId } }),
  ]);
  if (!assessment) return null;
  if (assessment.maxAttempts !== null && used >= assessment.maxAttempts) return null;
  return `/app/exams/${assessmentId}`;
}
