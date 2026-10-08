import "server-only";
import { z } from "zod";
import type { AttemptStatus, AttemptSubmitReason } from "@/generated/prisma/client";
import type { ExamRoomData, SubmitExamInput, SubmitExamResult } from "@/components/exam/types";
import { startAttempt, type AttemptScore, type LearnerActor } from "@/server/attempts";
import { hasPermission } from "@/server/auth/permissions";
import { hasEntitlement } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { getExamResults, getExamRoom, submitExam, type ExamReviewItem } from "@/server/exams/service";
import { AppError, isAppError } from "@/server/lib/errors";
import { firstLessonForTopic } from "@/server/progress/service";
import {
  buildDiagnosticReport,
  diagnosticQuestionCount,
  diagnosticReportHref,
  diagnosticRoomHref,
  planHrefFor,
  type DiagnosticReportCore,
  type RootTopicRef,
  type StartingTopic,
  type TopicMasteryRef,
} from "./report";

/**
 * The free diagnostic (§46, §52 steps 5-7) on top of the attempt engine (mode DIAGNOSTIC) and the exam room:
 *
 * - {@link getDiagnosticHub}: the student's subjects with what a diagnostic would contain, its status (not taken, in
 *   progress, completed) and whether the plan includes it (CLAUDE.md rule 9, `diagnostic_test`).
 * - {@link startDiagnostics}: starts (or resumes) one DIAGNOSTIC attempt per chosen subject: the subject's published
 *   diagnostic test when there is one for the pinned syllabus version, else a generated one (about one question per
 *   leaf topic, 8-12 questions, spread evenly over topics at a difficulty set from the self-reported ability).
 * - {@link getDiagnosticRoom} / {@link submitDiagnostic}: the exam room (no feedback until submission) and submission,
 *   which seeds topic mastery (finalize, `seededByDiagnostic`) and marks the enrolment's diagnostic as done.
 * - {@link getDiagnosticReport}: the §52 performance report: score, performance by top-level topic with the mastery
 *   band the diagnostic seeded, strengths, gaps, recommended starting topics, the study-plan link and the question
 *   review.
 *
 * Every function acts on the actor's own attempts only (others are NOT_FOUND).
 */

const uuid = z.uuid();

function assertLearner(actor: LearnerActor): void {
  if (!uuid.safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("The diagnostic is for student accounts.");
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

/** The student's own attempt: its mode and status (NOT_FOUND for anyone else's or a malformed id). */
async function ownAttempt(actor: LearnerActor, attemptId: string) {
  if (!uuid.safeParse(attemptId).success) throw AppError.notFound("Diagnostic not found.");
  const row = await db.assessmentAttempt.findFirst({
    where: { id: attemptId, userId: actor.userId },
    select: { id: true, mode: true, status: true, subjectId: true },
  });
  if (!row) throw AppError.notFound("Diagnostic not found.");
  return row;
}

// =====================================================================================================================
// Hub
// =====================================================================================================================

export type DiagnosticStatus = "NOT_TAKEN" | "IN_PROGRESS" | "COMPLETED";

export interface DiagnosticSubject {
  subjectId: string;
  name: string;
  qualificationName: string;
  /** Pinned syllabus version, e.g. "4004 · 2025-2027". */
  syllabusLabel: string;
  /** Published questions the diagnostic can draw on in the pinned version (0 = not available yet). */
  questionsAvailable: number;
  /** Questions a diagnostic of this subject will ask. */
  plannedQuestions: number;
  status: DiagnosticStatus;
  openAttemptId: string | null;
  completed: { attemptId: string; completedAt: Date; percentage: number | null } | null;
}

export interface DiagnosticHub {
  /** The plan includes the free diagnostic (§46). */
  included: boolean;
  subjects: DiagnosticSubject[];
}

interface SyllabusCounts {
  questions: Map<string, number>;
  leaves: Map<string, number>;
}

/** Published platform root questions and leaf topics per syllabus version (two grouped queries). */
async function syllabusCounts(syllabusIds: readonly string[]): Promise<SyllabusCounts> {
  const ids = [...new Set(syllabusIds)];
  if (ids.length === 0) return { questions: new Map(), leaves: new Map() };
  const [questions, leaves] = await Promise.all([
    db.$queryRaw<{ syllabusId: string; count: number }[]>`
      SELECT qt."syllabusId"::text AS "syllabusId", count(DISTINCT q."id")::int AS "count"
      FROM "QuestionTopic" qt
      JOIN "Question" q ON q."id" = qt."questionId"
      WHERE qt."syllabusId" = ANY(${ids}::uuid[]) AND qt."isPlatform"
        AND q."status" = 'PUBLISHED' AND q."parentId" IS NULL AND q."draftOfId" IS NULL
      GROUP BY qt."syllabusId"`,
    db.$queryRaw<{ syllabusId: string; count: number }[]>`
      SELECT t."syllabusId"::text AS "syllabusId", count(*)::int AS "count"
      FROM "Topic" t
      WHERE t."syllabusId" = ANY(${ids}::uuid[])
        AND NOT EXISTS (SELECT 1 FROM "Topic" c WHERE c."parentId" = t."id" AND c."syllabusId" = t."syllabusId")
      GROUP BY t."syllabusId"`,
  ]);
  return {
    questions: new Map(questions.map((r) => [r.syllabusId, r.count])),
    leaves: new Map(leaves.map((r) => [r.syllabusId, r.count])),
  };
}

interface PublishedDiagnostic {
  id: string;
  /** Fixed items (blueprint rules add their own counts). */
  questionCount: number;
}

/**
 * The published platform DIAGNOSTIC test of each subject usable with the student's pinned version, if any (one
 * query). A test built for the pinned version wins over a version-independent one, then the latest published.
 */
async function publishedDiagnostics(enrolments: readonly { subjectId: string; syllabusId: string }[]): Promise<Map<string, PublishedDiagnostic>> {
  const out = new Map<string, PublishedDiagnostic>();
  if (enrolments.length === 0) return out;
  const rows = await db.assessment.findMany({
    where: {
      subjectId: { in: enrolments.map((e) => e.subjectId) },
      kind: "DIAGNOSTIC",
      status: "PUBLISHED",
      draftOfId: null,
      schoolId: null,
      ownerUserId: null,
    },
    orderBy: [{ publishedAt: "desc" }, { id: "asc" }],
    take: 200,
    select: {
      id: true,
      subjectId: true,
      syllabusId: true,
      sections: { select: { _count: { select: { items: true } }, rules: { select: { questionCount: true } } } },
    },
  });
  for (const enrolment of enrolments) {
    const usable = rows.filter((a) => a.subjectId === enrolment.subjectId && (a.syllabusId === null || a.syllabusId === enrolment.syllabusId));
    const chosen = usable.find((a) => a.syllabusId === enrolment.syllabusId) ?? usable[0];
    if (!chosen) continue;
    const questionCount = chosen.sections.reduce((sum, s) => sum + s._count.items + s.rules.reduce((n, r) => n + r.questionCount, 0), 0);
    out.set(enrolment.subjectId, { id: chosen.id, questionCount });
  }
  return out;
}

/** The student's subjects and their diagnostic status (§46, §52 step 5). */
export async function getDiagnosticHub(actor: LearnerActor): Promise<DiagnosticHub> {
  assertLearner(actor);
  const [enrolments, open, included] = await Promise.all([
    db.subjectEnrollment.findMany({
      where: { userId: actor.userId, status: "ACTIVE" },
      orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
      select: {
        subjectId: true,
        syllabusId: true,
        diagnosticCompletedAt: true,
        subject: { select: { name: true, qualification: { select: { shortName: true } } } },
        syllabus: { select: { code: true, versionLabel: true } },
        diagnosticAttempt: { select: { id: true, userId: true, percentage: true } },
      },
    }),
    db.assessmentAttempt.findMany({
      where: { userId: actor.userId, mode: "DIAGNOSTIC", status: "IN_PROGRESS", assignmentId: null },
      orderBy: { startedAt: "desc" },
      select: { id: true, subjectId: true },
    }),
    hasEntitlement(actor, "diagnostic_test"),
  ]);
  const [counts, published] = await Promise.all([syllabusCounts(enrolments.map((e) => e.syllabusId)), publishedDiagnostics(enrolments)]);
  const openBySubject = new Map<string, string>();
  for (const attempt of open) if (!openBySubject.has(attempt.subjectId)) openBySubject.set(attempt.subjectId, attempt.id);

  return {
    included,
    subjects: enrolments.map((e) => {
      const available = counts.questions.get(e.syllabusId) ?? 0;
      const test = published.get(e.subjectId);
      const planned = test ? test.questionCount : Math.min(available, diagnosticQuestionCount(counts.leaves.get(e.syllabusId) ?? 0));
      const attempt = e.diagnosticAttempt && e.diagnosticAttempt.userId === actor.userId ? e.diagnosticAttempt : null;
      const openAttemptId = openBySubject.get(e.subjectId) ?? null;
      const completed = attempt && e.diagnosticCompletedAt ? { attemptId: attempt.id, completedAt: e.diagnosticCompletedAt, percentage: attempt.percentage } : null;
      return {
        subjectId: e.subjectId,
        name: e.subject.name,
        qualificationName: e.subject.qualification.shortName,
        syllabusLabel: [e.syllabus.code, e.syllabus.versionLabel].filter(Boolean).join(" · "),
        questionsAvailable: test ? Math.max(available, test.questionCount) : available,
        plannedQuestions: planned,
        status: openAttemptId ? "IN_PROGRESS" : completed ? "COMPLETED" : "NOT_TAKEN",
        openAttemptId,
        completed,
      };
    }),
  };
}

// =====================================================================================================================
// Start
// =====================================================================================================================

export const startDiagnosticsSchema = z.strictObject({
  subjectIds: z
    .array(z.uuid({ error: "Choose subjects from the list." }), { error: "Choose at least one subject." })
    .min(1, "Choose at least one subject.")
    .max(20, "Choose at most 20 subjects."),
  /** Per page view (form): a double tap or resubmitted form resumes the same attempts. */
  idempotencyKey: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,56}$/)
    .optional(),
  /** The student came straight from the onboarding wizard (recorded on the attempt for analytics). */
  fromOnboarding: z.boolean().optional(),
});
export type StartDiagnosticsInput = z.input<typeof startDiagnosticsSchema>;

export interface StartedDiagnostics {
  /** One attempt per subject that could start, in the order chosen. */
  started: { subjectId: string; attemptId: string; resumed: boolean }[];
  /** Subjects without enough published questions yet. */
  unavailable: { subjectId: string; name: string }[];
  /** The first diagnostic's room. */
  href: string;
}

/**
 * Starts (or resumes) a diagnostic for each chosen subject, in order, and returns the first one's room. A subject whose
 * open diagnostic exists is resumed; one without published questions is reported as unavailable. When none can start
 * the call fails.
 *
 * @throws AppError VALIDATION (not one of the student's subjects) | NOT_FOUND (no subject has questions yet) |
 *         ENTITLEMENT_REQUIRED (the plan does not include the diagnostic)
 */
export async function startDiagnostics(actor: LearnerActor, input: StartDiagnosticsInput, now: Date = new Date()): Promise<StartedDiagnostics> {
  assertLearner(actor);
  const parsed = parse(startDiagnosticsSchema, input);
  const subjectIds = [...new Set(parsed.subjectIds)];
  const [enrolments, open] = await Promise.all([
    db.subjectEnrollment.findMany({
      where: { userId: actor.userId, subjectId: { in: subjectIds }, status: "ACTIVE" },
      select: { subjectId: true, syllabusId: true, subject: { select: { name: true } } },
    }),
    db.assessmentAttempt.findMany({
      where: { userId: actor.userId, subjectId: { in: subjectIds }, mode: "DIAGNOSTIC", status: "IN_PROGRESS", assignmentId: null },
      orderBy: { startedAt: "desc" },
      select: { id: true, subjectId: true },
    }),
  ]);
  const enrolmentOf = new Map(enrolments.map((e) => [e.subjectId, e]));
  const missing = subjectIds.filter((id) => !enrolmentOf.has(id));
  if (missing.length > 0) throw AppError.validation({ subjectIds: ["Add the subject to your subjects before taking its diagnostic."] });
  const openOf = new Map<string, string>();
  for (const attempt of open) if (!openOf.has(attempt.subjectId)) openOf.set(attempt.subjectId, attempt.id);
  const [counts, published] = await Promise.all([syllabusCounts(enrolments.map((e) => e.syllabusId)), publishedDiagnostics(enrolments)]);

  const started: StartedDiagnostics["started"] = [];
  const unavailable: StartedDiagnostics["unavailable"] = [];
  for (const [index, subjectId] of subjectIds.entries()) {
    const enrolment = enrolmentOf.get(subjectId);
    if (!enrolment) continue;
    const existing = openOf.get(subjectId);
    if (existing) {
      started.push({ subjectId, attemptId: existing, resumed: true });
      continue;
    }
    const assessment = published.get(subjectId)?.id ?? null;
    try {
      const result = await startAttempt(
        actor,
        {
          mode: "DIAGNOSTIC",
          subjectId,
          ...(assessment ? { assessmentId: assessment } : { count: diagnosticQuestionCount(counts.leaves.get(enrolment.syllabusId) ?? 0) }),
          origin: parsed.fromOnboarding ? "ONBOARDING" : "BUILDER",
          ...(parsed.idempotencyKey ? { idempotencyKey: `${parsed.idempotencyKey}-${index}` } : {}),
        },
        { now },
      );
      started.push({ subjectId, attemptId: result.attempt.id, resumed: result.resumed });
    } catch (error) {
      if (isAppError(error) && error.code === "NOT_FOUND") {
        unavailable.push({ subjectId, name: enrolment.subject.name });
        continue;
      }
      throw error;
    }
  }
  const first = started[0];
  if (!first) {
    const names = unavailable.map((u) => u.name).join(", ");
    throw AppError.notFound(`There aren't enough questions for a diagnostic in ${names || "these subjects"} yet. Try practice instead.`);
  }
  return { started, unavailable, href: diagnosticRoomHref(first.attemptId) };
}

// =====================================================================================================================
// Room and submission
// =====================================================================================================================

export type DiagnosticRoomLoad = { kind: "ROOM"; room: ExamRoomData } | { kind: "REDIRECT"; href: string };

/**
 * The diagnostic in the exam room (one question at a time, autosave, no feedback until submission). Other modes go to
 * their own room; a closed diagnostic opens its report.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function getDiagnosticRoom(actor: LearnerActor, attemptId: string, now: Date = new Date()): Promise<DiagnosticRoomLoad> {
  assertLearner(actor);
  const attempt = await ownAttempt(actor, attemptId);
  if (attempt.mode !== "DIAGNOSTIC") return { kind: "REDIRECT", href: `/app/exams/attempt/${attempt.id}` };
  if (attempt.status !== "IN_PROGRESS") return { kind: "REDIRECT", href: diagnosticReportHref(attempt.id) };
  const loaded = await getExamRoom(actor, attempt.id, now);
  // Closed meanwhile (time limit of a published diagnostic): the report, not the exam results page.
  if (loaded.kind === "REDIRECT") return { kind: "REDIRECT", href: loaded.href.endsWith("/results") ? diagnosticReportHref(attempt.id) : loaded.href };
  const room = loaded.room;
  return { kind: "ROOM", room: room.title === room.kindLabel ? { ...room, title: `${room.subject.name} diagnostic` } : room };
}

/**
 * Submits the diagnostic (the student's confirmation, or the countdown of a timed one reaching zero) and returns the
 * report link. Marking, scoring and mastery seeding happen in the engine.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN | VALIDATION
 */
export async function submitDiagnostic(actor: LearnerActor, input: SubmitExamInput, now: Date = new Date()): Promise<SubmitExamResult> {
  assertLearner(actor);
  const attemptId = typeof input?.attemptId === "string" ? input.attemptId : "";
  const attempt = await ownAttempt(actor, attemptId);
  if (attempt.mode !== "DIAGNOSTIC") throw AppError.notFound("Diagnostic not found.");
  const result = await submitExam(actor, input, now);
  return result.submitted ? { submitted: true, resultsHref: diagnosticReportHref(attempt.id) } : result;
}

// =====================================================================================================================
// Report
// =====================================================================================================================

export interface StartingTopicView extends StartingTopic {
  /** "Study this topic" lesson (the topic's first published lesson, own tag or an ancestor's). */
  lesson: { lessonId: string; title: string } | null;
}

export interface OtherDiagnostic {
  subjectId: string;
  name: string;
  /** Set when a diagnostic of this subject is already in progress. */
  openAttemptId: string | null;
}

export interface DiagnosticReport extends Omit<DiagnosticReportCore, "startingTopics"> {
  attemptId: string;
  subject: { id: string; name: string };
  title: string;
  status: AttemptStatus;
  submitReason: AttemptSubmitReason | null;
  submittedAt: Date | null;
  lateSync: boolean;
  score: AttemptScore | null;
  nothingAnswered: boolean;
  /** Marks of answers still being marked. */
  pendingMarks: number;
  startingTopics: StartingTopicView[];
  /** Enrolled subjects still without a diagnostic (in progress ones carry their attempt). */
  otherDiagnostics: OtherDiagnostic[];
  /** "Create my study plan" with every diagnosed subject pre-selected (§52 step 7). */
  planHref: string;
  hasActivePlan: boolean;
  /** Written answers waiting for marking that the student may mark themselves (AI marking not configured). */
  selfAssessableCount: number;
  review: ExamReviewItem[];
}

export type DiagnosticReportLoad = { kind: "REPORT"; report: DiagnosticReport } | { kind: "REDIRECT"; href: string };

/**
 * The §52 performance report of a submitted diagnostic (module header). Diagnostics still in progress open their room;
 * other modes open their own results page.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function getDiagnosticReport(actor: LearnerActor, attemptId: string): Promise<DiagnosticReportLoad> {
  assertLearner(actor);
  const attempt = await ownAttempt(actor, attemptId);
  if (attempt.mode !== "DIAGNOSTIC") return { kind: "REDIRECT", href: `/app/exams/attempt/${attempt.id}/results` };
  if (attempt.status === "IN_PROGRESS") return { kind: "REDIRECT", href: diagnosticRoomHref(attempt.id) };
  const loaded = await getExamResults(actor, attempt.id, { diagnosticReport: true });
  if (loaded.kind === "REDIRECT") return loaded;
  const results = loaded.results;

  const [slots, enrolment, enrolments, open, activePlan] = await Promise.all([
    db.questionAttempt.findMany({
      where: { attemptId: attempt.id },
      select: { topicId: true, marksAvailable: true, marksAwarded: true, markingStatus: true },
    }),
    db.subjectEnrollment.findUnique({
      where: { userId_subjectId: { userId: actor.userId, subjectId: attempt.subjectId } },
      select: { syllabusId: true },
    }),
    db.subjectEnrollment.findMany({
      where: { userId: actor.userId, status: "ACTIVE" },
      orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
      select: { subjectId: true, diagnosticCompletedAt: true, subject: { select: { name: true } } },
    }),
    db.assessmentAttempt.findMany({
      where: { userId: actor.userId, mode: "DIAGNOSTIC", status: "IN_PROGRESS", assignmentId: null },
      select: { id: true, subjectId: true },
    }),
    db.studyPlan.findFirst({ where: { userId: actor.userId, status: "ACTIVE" }, select: { id: true } }),
  ]);

  const slotTopicIds = [...new Set(slots.map((s) => s.topicId))];
  const slotTopics = slotTopicIds.length
    ? await db.topic.findMany({ where: { id: { in: slotTopicIds } }, select: { id: true, path: true } })
    : [];
  const topicPaths = new Map(slotTopics.map((t) => [t.id, t.path]));
  const slotRootIds = [...new Set(slotTopics.map((t) => t.path.split("/")[0] ?? t.id))];
  const roots = await db.topic.findMany({
    where: {
      OR: [...(enrolment ? [{ syllabusId: enrolment.syllabusId, parentId: null }] : []), { id: { in: slotRootIds } }],
    },
    select: { id: true, name: true, sortOrder: true },
  });
  const rootRefs: RootTopicRef[] = roots.map((r) => ({ id: r.id, name: r.name, sortOrder: r.sortOrder }));
  const masteryRows = rootRefs.length
    ? await db.topicMastery.findMany({
        where: { userId: actor.userId, topicId: { in: rootRefs.map((r) => r.id) } },
        select: { topicId: true, score: true, band: true },
      })
    : [];
  const mastery = new Map<string, TopicMasteryRef>(masteryRows.map((m) => [m.topicId, { score: m.score, band: m.band }]));

  const core = buildDiagnosticReport({ slots, topicPaths, roots: rootRefs, mastery });
  // Bounded: at most MAX_STARTING_TOPICS (3) small lookups.
  const lessons = await Promise.all(core.startingTopics.map((t) => firstLessonForTopic(db, t.topicId)));

  const openBySubject = new Map(open.map((o) => [o.subjectId, o.id]));
  const otherDiagnostics: OtherDiagnostic[] = enrolments
    .filter((e) => e.subjectId !== attempt.subjectId && e.diagnosticCompletedAt === null)
    .map((e) => ({ subjectId: e.subjectId, name: e.subject.name, openAttemptId: openBySubject.get(e.subjectId) ?? null }));
  const diagnosed = [attempt.subjectId, ...enrolments.filter((e) => e.diagnosticCompletedAt !== null).map((e) => e.subjectId)];

  return {
    kind: "REPORT",
    report: {
      ...core,
      startingTopics: core.startingTopics.map((t, index) => {
        const lesson = lessons[index] ?? null;
        return { ...t, lesson: lesson ? { lessonId: lesson.lessonId, title: lesson.title } : null };
      }),
      attemptId: attempt.id,
      subject: results.subject,
      title: results.title === results.modeLabel ? `${results.subject.name} diagnostic` : results.title,
      status: results.status,
      submitReason: results.submitReason,
      submittedAt: results.submittedAt,
      lateSync: results.lateSync,
      score: results.score,
      nothingAnswered: results.nothingAnswered,
      pendingMarks: results.pendingMarks,
      otherDiagnostics,
      planHref: planHrefFor(diagnosed),
      hasActivePlan: activePlan !== null,
      selfAssessableCount: results.selfAssessableCount,
      review: results.review,
    },
  };
}
