import "server-only";
import { z } from "zod";
import type { AttemptMode, AttemptStatus } from "@/generated/prisma/client";
import type {
  PresentedFeedback,
  PresentedHint,
  PresentedQuestion,
  QuestionResponse,
} from "@/components/questions/types";
import { DEFAULT_TIMEZONE, isValidTimeZone } from "@/lib/dates";
import type { MasteryBand } from "@/lib/mastery-band";
import {
  aiMarkingConfigured,
  answerAndMark,
  DIFFICULTY_CHOICES,
  getAttemptForStudent,
  recordSelfAssessment,
  revealHint,
  startAttempt,
  submitAttempt,
  type AttemptResult,
  type AttemptSlotView,
  type AttemptView,
  type LearnerActor,
} from "@/server/attempts";
import { hasPermission } from "@/server/auth/permissions";
import { checkLimit } from "@/server/billing/entitlements";
import { practiceQuestionsToday } from "@/server/billing/usage";
import { trustPersistedHtml } from "@/server/content/render";
import { getTopicTree, type TopicNode } from "@/server/curriculum";
import { db } from "@/server/db";
import { listEnrollments } from "@/server/enrollment";
import { AppError } from "@/server/lib/errors";
import {
  loadQuestionAssets,
  loadRevealAssets,
  normalizeResponse,
  presentAnswerFeedback,
  presentQuestion,
  presentSelfAssessment,
  presentSlotFeedback,
  slotSelfAssessment,
} from "./present";

/**
 * Practice orchestration for the web app (§10 practice builder and sessions, §11 adaptive, §46 daily question). Thin:
 * the attempt engine (`@/server/attempts`) does selection, marking, mastery, entitlements and XP; this module adds what
 * the one-question-at-a-time UI needs on top of it:
 *
 * - the builder's data (enrolled subjects, the PINNED syllabus topic tree, today's practice allowance, open sessions);
 * - the topic band BEFORE an answer, so the feedback can show "Developing → Competent" (§11);
 * - the self-assessment fallback for open answers when AI marking is not configured (ARCHITECTURE §6.5/§6.8);
 * - server-side presentation of questions and feedback (sanitised HTML, never answers before marking).
 *
 * Every function acts only on the actor's own attempts (the engine reports others as NOT_FOUND).
 */

/** Session sizes offered by the builder (§10 "number of questions"). */
export const PRACTICE_SESSION_SIZES = [5, 10, 20, 30] as const;
/** Largest session a deep link may ask for (the engine also caps at its own maximum). */
export const MAX_PRACTICE_QUESTIONS = 60;
const PRACTICE_MODES = ["PRACTICE", "RETEST"] as const satisfies readonly AttemptMode[];
const XP_REASONS = ["PRACTICE_COMPLETED", "DAILY_QUESTION_ANSWERED", "ASSIGNMENT_SUBMITTED", "ASSESSMENT_COMPLETED"] as const;

function assertStudent(actor: LearnerActor): void {
  if (!z.uuid().safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students can practise.");
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

async function timeZoneOf(actor: LearnerActor): Promise<string> {
  if (actor.timeZone && isValidTimeZone(actor.timeZone)) return actor.timeZone;
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE;
}

/** True when open answers can be marked by AI on this server (otherwise students self-assess). */
export function aiMarkingAvailable(): boolean {
  return aiMarkingConfigured();
}

// =====================================================================================================================
// Builder (§10)
// =====================================================================================================================

export interface PracticeSubjectOption {
  id: string;
  name: string;
  qualificationName: string;
  syllabusId: string;
  paused: boolean;
}

export interface PracticeTopicOption {
  id: string;
  name: string;
  code: string | null;
  /** 0 for the top level of the tree. */
  depth: number;
  parentId: string | null;
  hasChildren: boolean;
}

export interface PracticeAllowance {
  /** Null = unlimited. */
  limit: number | null;
  used: number;
  remaining: number | null;
}

export interface OpenPracticeSession {
  attemptId: string;
  mode: AttemptMode;
  subjectName: string;
  topicName: string | null;
  answered: number;
  total: number;
  startedAt: Date;
}

export interface PracticeBuilderData {
  subjects: PracticeSubjectOption[];
  selectedSubjectId: string | null;
  /** The selected subject's PINNED syllabus topic tree, flattened in order. */
  topics: PracticeTopicOption[];
  allowance: PracticeAllowance | null;
  openSessions: OpenPracticeSession[];
}

function flattenTopics(nodes: readonly TopicNode[], depth = 0, out: PracticeTopicOption[] = []): PracticeTopicOption[] {
  for (const node of nodes) {
    out.push({ id: node.id, name: node.name, code: node.code, depth, parentId: node.parentId, hasChildren: node.children.length > 0 });
    flattenTopics(node.children, depth + 1, out);
  }
  return out;
}

/** Today's practice allowance (§31 FREE "limited questions") for a subject, from the plan and the usage counter. */
export async function getPracticeAllowance(actor: LearnerActor, subjectId: string, now: Date = new Date()): Promise<PracticeAllowance> {
  const used = await practiceQuestionsToday(actor.userId, await timeZoneOf(actor), now);
  const check = await checkLimit(actor, "practiceQuestionsPerDay", used, { subjectId });
  return { limit: check.limit, used: check.used, remaining: check.remaining };
}

/** The student's unfinished practice sessions (most recent first), to resume (§10). */
export async function listOpenPracticeSessions(actor: LearnerActor, options: { limit?: number } = {}): Promise<OpenPracticeSession[]> {
  assertStudent(actor);
  const rows = await db.assessmentAttempt.findMany({
    where: { userId: actor.userId, status: "IN_PROGRESS", mode: { in: [...PRACTICE_MODES] }, assignmentId: null },
    orderBy: { startedAt: "desc" },
    take: Math.min(10, Math.max(1, options.limit ?? 3)),
    select: {
      id: true,
      mode: true,
      startedAt: true,
      questionCount: true,
      subject: { select: { name: true } },
      topic: { select: { name: true } },
      _count: { select: { questionAttempts: { where: { markedAt: { not: null } } } } },
    },
  });
  return rows.map((row) => ({
    attemptId: row.id,
    mode: row.mode,
    subjectName: row.subject.name,
    topicName: row.topic?.name ?? null,
    answered: row._count.questionAttempts,
    total: row.questionCount,
    startedAt: row.startedAt,
  }));
}

/** Everything the practice builder page needs: subjects from enrolments, the pinned topic tree, allowance, open sessions. */
export async function getPracticeBuilder(actor: LearnerActor, options: { subjectId?: string | null; now?: Date } = {}): Promise<PracticeBuilderData> {
  assertStudent(actor);
  const enrollments = (await listEnrollments(actor)).filter((e) => e.status === "ACTIVE" || e.status === "PAUSED");
  const subjects: PracticeSubjectOption[] = enrollments.map((e) => ({
    id: e.subject.id,
    name: e.subject.name,
    qualificationName: e.subject.qualification.shortName ?? e.subject.qualification.name,
    syllabusId: e.syllabus.id,
    paused: e.status === "PAUSED",
  }));
  const selected = subjects.find((s) => s.id === options.subjectId) ?? subjects.find((s) => !s.paused) ?? subjects[0] ?? null;
  const [tree, allowance, openSessions] = await Promise.all([
    selected ? getTopicTree(selected.syllabusId) : Promise.resolve(null),
    selected ? getPracticeAllowance(actor, selected.id, options.now) : Promise.resolve(null),
    listOpenPracticeSessions(actor),
  ]);
  return { subjects, selectedSubjectId: selected?.id ?? null, topics: tree ? flattenTopics(tree) : [], allowance, openSessions };
}

// =====================================================================================================================
// Sessions
// =====================================================================================================================

export const startPracticeSchema = z.strictObject({
  subjectId: z.uuid(),
  topicIds: z.array(z.uuid()).max(50).default([]),
  count: z.int().min(1).max(MAX_PRACTICE_QUESTIONS).default(10),
  difficulty: z.enum(DIFFICULTY_CHOICES).default("ADAPTIVE"),
  mode: z.enum(PRACTICE_MODES).default("PRACTICE"),
  origin: z.enum(["BUILDER", "PLAN_ITEM", "RECOMMENDATION", "RETEST", "MISTAKES"]).default("BUILDER"),
  idempotencyKey: z
    .string()
    .regex(/^[A-Za-z0-9_-]{8,64}$/)
    .optional(),
});
export type StartPracticeInput = z.input<typeof startPracticeSchema>;

export interface StartedPractice {
  attemptId: string;
  resumed: boolean;
  questionCount: number;
  /** Requested minus selected (the bank had fewer matching questions). */
  shortfall: number;
}

/**
 * Starts a practice (or re-test) session in an ENROLLED subject. The engine checks the daily allowance (QUOTA_EXCEEDED
 * / ENTITLEMENT_REQUIRED with friendly messages), selects questions adaptively and caps the size at the allowance left.
 */
export async function startPracticeSession(actor: LearnerActor, input: StartPracticeInput): Promise<StartedPractice> {
  assertStudent(actor);
  const parsed = parse(startPracticeSchema, input);
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId: parsed.subjectId } },
    select: { status: true },
  });
  if (!enrollment || enrollment.status === "DROPPED" || enrollment.status === "COMPLETED") {
    throw AppError.validation({ subjectId: ["Add this subject to your subjects before practising it."] });
  }
  const started = await startAttempt(actor, {
    mode: parsed.mode,
    subjectId: parsed.subjectId,
    ...(parsed.topicIds.length > 0 ? { topicIds: parsed.topicIds } : {}),
    count: parsed.count,
    difficulty: parsed.difficulty,
    origin: parsed.mode === "RETEST" ? "RETEST" : parsed.origin,
    ...(parsed.idempotencyKey ? { idempotencyKey: parsed.idempotencyKey } : {}),
  });
  return { attemptId: started.attempt.id, resumed: started.resumed, questionCount: started.attempt.questionCount, shortfall: started.shortfall };
}

export interface SessionSlot {
  position: number;
  marksAvailable: number;
  /** Null when the question can no longer be shown (archived after the session started). */
  question: PresentedQuestion | null;
  /** A saved (unmarked) answer, or the marked answer for review. */
  response: QuestionResponse | null;
  feedback: PresentedFeedback | null;
  /** Hints the student already revealed on this question (shown again after a reload). */
  hints: PresentedHint[];
}

export interface SessionState {
  attemptId: string;
  mode: AttemptMode;
  status: AttemptStatus;
  subject: { id: string; name: string };
  isOpen: boolean;
  /** Immediate feedback (practice-style) or on submit (exam-style: not handled by these pages). */
  immediateFeedback: boolean;
  questionCount: number;
  /** Slots with a mark or queued for marking. */
  markedCount: number;
  /** The next question to answer (first unmarked slot), presented. */
  current: SessionSlot | null;
  /** The most recently answered slot with its feedback (single-question modes show it after answering). */
  lastAnswered: SessionSlot | null;
}

function isProcessed(slot: AttemptSlotView): boolean {
  return slot.result !== null;
}

async function presentSlot(attempt: AttemptView, slot: AttemptSlotView, withFeedback: boolean): Promise<SessionSlot> {
  const [resolveAsset, revealAssets] = await Promise.all([
    slot.question ? loadQuestionAssets([slot.question]) : Promise.resolve(() => null),
    withFeedback && slot.result?.reveal ? loadRevealAssets([slot.result.reveal]) : Promise.resolve(() => null),
  ]);
  const question = slot.question ? presentQuestion(slot.question, resolveAsset) : null;
  const feedback = withFeedback ? presentSlotFeedback(slot, { resolveAsset: revealAssets, selfAssessment: slotSelfAssessment(slot) }) : null;
  return {
    position: slot.position,
    marksAvailable: slot.marksAvailable,
    question,
    response: slot.question ? normalizeResponse(slot.question.type, slot.response) : null,
    feedback: feedback ? { ...feedback, attemptCompleted: attempt.status !== "IN_PROGRESS" } : null,
    hints: revealedHints(slot),
  };
}

/** The slot's already revealed hints, presented (`revealedHints` is sanitised by the engine). */
function revealedHints(slot: Pick<AttemptSlotView, "revealedHints" | "question">): PresentedHint[] {
  const total = Math.max(slot.question?.hintCount ?? 0, slot.revealedHints.length);
  return slot.revealedHints.map((html, index) => ({ hintNumber: index + 1, totalHints: total, html: trustPersistedHtml(html) }));
}

/**
 * The state of a practice-style attempt for the one-question-at-a-time page: the next question to answer (presented,
 * answer-safe) and the latest answered one with its feedback. Only the slots shown are rendered.
 *
 * @throws AppError NOT_FOUND (not the student's attempt) | FORBIDDEN (not a student)
 */
export async function getSessionState(
  actor: LearnerActor,
  attemptId: string,
  options: { withLastAnswered?: boolean } = {},
): Promise<SessionState> {
  assertStudent(actor);
  if (!z.uuid().safeParse(attemptId).success) throw AppError.notFound("Session not found.");
  const attempt = await getAttemptForStudent(actor, attemptId);
  const isOpen = attempt.status === "IN_PROGRESS";
  const next = isOpen ? attempt.questions.find((slot) => !isProcessed(slot)) : undefined;
  const answered = attempt.questions.filter(isProcessed);
  const last = options.withLastAnswered ? answered.at(-1) : undefined;
  const [current, lastAnswered] = await Promise.all([
    next ? presentSlot(attempt, next, false) : Promise.resolve(null),
    last ? presentSlot(attempt, last, true) : Promise.resolve(null),
  ]);
  return {
    attemptId: attempt.id,
    mode: attempt.mode,
    status: attempt.status,
    subject: attempt.subject,
    isOpen,
    immediateFeedback: attempt.feedback === "IMMEDIATE",
    questionCount: attempt.questionCount,
    markedCount: answered.length,
    current,
    lastAnswered,
  };
}

export const answerSchema = z.strictObject({
  attemptId: z.uuid(),
  position: z.int().min(1).max(32_767),
  response: z.unknown(),
  timeSpentSeconds: z.number().min(0).max(86_400).optional(),
  hintsUsed: z.int().min(0).max(50).optional(),
});
export type AnswerPracticeInput = z.input<typeof answerSchema>;

/**
 * Answers one question with instant marking (§10) and presents the engine's feedback (sanitised HTML): the topic band
 * before and after the answer (§11 band change), the stored per-part detail for structured questions, and the
 * self-assessment offer for open answers when AI marking is not configured.
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT | BAD_REQUEST | QUOTA_EXCEEDED | ENTITLEMENT_REQUIRED
 */
export async function answerPracticeQuestion(actor: LearnerActor, input: AnswerPracticeInput): Promise<PresentedFeedback> {
  assertStudent(actor);
  const parsed = parse(answerSchema, input);
  const feedback = await answerAndMark(actor, parsed.attemptId, parsed.position, parsed.response, {
    ...(parsed.timeSpentSeconds !== undefined ? { timeSpentSeconds: parsed.timeSpentSeconds } : {}),
    ...(parsed.hintsUsed !== undefined ? { hintsUsed: parsed.hintsUsed } : {}),
  });
  const resolveAsset = await loadRevealAssets([feedback.reveal]);
  return presentAnswerFeedback(feedback, {
    resolveAsset,
    selfAssessment: presentSelfAssessment({
      selfAssessable: feedback.selfAssessable,
      marksAvailable: feedback.marksAvailable,
      markScheme: feedback.reveal?.markScheme ?? null,
      questionId: feedback.reveal?.questionId ?? parsed.attemptId,
    }),
  });
}

const slotSchema = z.strictObject({ attemptId: z.uuid(), position: z.int().min(1).max(32_767) });

/** Reveals the next hint of an unanswered practice question (lowers its mastery credit, §11). */
export async function revealPracticeHint(actor: LearnerActor, input: z.input<typeof slotSchema>): Promise<PresentedHint> {
  assertStudent(actor);
  const { attemptId, position } = parse(slotSchema, input);
  const hint = await revealHint(actor, attemptId, position);
  return { hintNumber: hint.hintNumber, totalHints: hint.totalHints, html: trustPersistedHtml(hint.html) };
}

export const selfAssessSchema = z.strictObject({
  attemptId: z.uuid(),
  position: z.int().min(1).max(32_767),
  pointIds: z.array(z.string().min(1).max(64)).max(100).default([]),
  marks: z.int().min(0).max(1_000).default(0),
});
export type SelfAssessInput = z.input<typeof selfAssessSchema>;

/**
 * Self-assessment of an open answer waiting for AI marking when AI is not configured (ARCHITECTURE §6.5/§6.8), from the
 * practice runner or the session summary: the attempt engine's `recordSelfAssessment` (the student ticks the
 * mark-scheme points they made, the server sums and scales them; recorded as SELF_ASSESSED). Returns the answer's
 * presented feedback with the new mark.
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT (already marked) | BAD_REQUEST (not self-assessable)
 */
export async function selfAssessPracticeAnswer(actor: LearnerActor, input: SelfAssessInput): Promise<PresentedFeedback> {
  assertStudent(actor);
  const parsed = parse(selfAssessSchema, input);
  await recordSelfAssessment(actor, parsed.attemptId, parsed.position, { pointIds: parsed.pointIds, marks: parsed.marks });

  const attempt = await getAttemptForStudent(actor, parsed.attemptId);
  const marked = attempt.questions.find((s) => s.position === parsed.position);
  const presented = marked ? (await presentSlot(attempt, marked, true)).feedback : null;
  if (!presented) throw AppError.notFound("Question not found in this session.");
  return presented;
}

/** Ends a practice session early: answered questions are kept and scored, unanswered ones are left out (§10). */
export async function endPracticeSession(actor: LearnerActor, attemptId: string): Promise<AttemptResult> {
  assertStudent(actor);
  if (!z.uuid().safeParse(attemptId).success) throw AppError.notFound("Session not found.");
  return submitAttempt(actor, attemptId);
}

// =====================================================================================================================
// Summary (§10, §11, §19)
// =====================================================================================================================

export interface SummaryTopic {
  topicId: string;
  topicName: string | null;
  marksAwarded: number;
  marksAvailable: number;
  /** This session's score in the topic. */
  percent: number | null;
  /** The topic's mastery now (null = no evidence yet). */
  mastery: { band: MasteryBand; score: number } | null;
  /**
   * The band change this session made (§11), recorded on the attempt as it was answered: `before` = the band before the
   * session's first answer in the topic (null = first practice in it), `after` = after its latest. Null when the
   * session changed nothing in the topic (e.g. every answer still waits for marking).
   */
  change: { before: MasteryBand | null; after: MasteryBand } | null;
}

export interface ReviewItem {
  position: number;
  question: PresentedQuestion | null;
  response: QuestionResponse | null;
  feedback: PresentedFeedback | null;
}

export interface PracticeSummary {
  attemptId: string;
  mode: AttemptMode;
  status: AttemptStatus;
  subject: { id: string; name: string };
  result: AttemptResult | null;
  topics: SummaryTopic[];
  /** XP recorded for this session (null when none was awarded). */
  xpEarned: number | null;
  /** LESSON_CHECK: the lesson whose practice questions these were (the summary links back to it). */
  lesson: { id: string; title: string } | null;
  /** Answers waiting for marking that the student may mark themselves (AI marking not configured). */
  selfAssessableCount: number;
  review: ReviewItem[];
}

/**
 * Results of a closed practice-style session: score, per-topic results with the topic's mastery now and the band change
 * the session made (stored on the attempt), the engine's recommendations, XP from the ledger (never estimated), the
 * lesson of a lesson check, and every question with its answer and feedback for review — open answers still waiting
 * for marking carry the self-assessment offer when AI marking is not configured.
 *
 * @throws AppError NOT_FOUND | FORBIDDEN
 */
export async function getPracticeSummary(actor: LearnerActor, attemptId: string): Promise<PracticeSummary> {
  assertStudent(actor);
  if (!z.uuid().safeParse(attemptId).success) throw AppError.notFound("Session not found.");
  const attempt = await getAttemptForStudent(actor, attemptId);
  const result = attempt.result;
  const topicIds = result?.topics.map((t) => t.topicId) ?? [];
  const views = attempt.questions.flatMap((slot) => (slot.question ? [slot.question] : []));
  const [mastery, xp, questionAssets, revealAssets, lesson] = await Promise.all([
    topicIds.length > 0
      ? db.topicMastery.findMany({ where: { userId: actor.userId, topicId: { in: topicIds } }, select: { topicId: true, band: true, score: true } })
      : Promise.resolve([]),
    db.xpEvent.aggregate({ where: { userId: actor.userId, reason: { in: [...XP_REASONS] }, sourceId: attemptId }, _sum: { amount: true }, _count: true }),
    loadQuestionAssets(views),
    loadRevealAssets(attempt.questions.map((slot) => slot.result?.reveal ?? null)),
    attempt.mode === "LESSON_CHECK" && attempt.lessonId
      ? db.lesson.findUnique({ where: { id: attempt.lessonId }, select: { id: true, title: true } })
      : Promise.resolve(null),
  ]);
  const masteryById = new Map(mastery.map((row) => [row.topicId, { band: row.band as MasteryBand, score: row.score }]));
  const changeById = new Map((result?.analysis?.mastery ?? []).map((change) => [change.topicId, { before: change.before, after: change.after }]));
  const review = attempt.questions.map((slot) => ({
    position: slot.position,
    question: slot.question ? presentQuestion(slot.question, questionAssets) : null,
    response: slot.question ? normalizeResponse(slot.question.type, slot.response) : null,
    feedback: presentSlotFeedback(slot, { resolveAsset: revealAssets, selfAssessment: slotSelfAssessment(slot) }),
  }));
  return {
    attemptId: attempt.id,
    mode: attempt.mode,
    status: attempt.status,
    subject: attempt.subject,
    result,
    topics: (result?.topics ?? []).map((topic) => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
      marksAwarded: topic.marksAwarded,
      marksAvailable: topic.marksAvailable,
      percent: topic.percent,
      mastery: masteryById.get(topic.topicId) ?? null,
      change: changeById.get(topic.topicId) ?? null,
    })),
    xpEarned: xp._count > 0 ? (xp._sum.amount ?? 0) : null,
    lesson,
    selfAssessableCount: review.filter((item) => item.feedback?.selfAssessment).length,
    review,
  };
}
