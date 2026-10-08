import "server-only";
import type { PresentedFeedback, PresentedHint, PresentedQuestion, QuestionResponse } from "@/components/questions/types";
import type { AttemptMode, AttemptStatus } from "@/generated/prisma/client";
import { getAttemptForStudent, isPracticeLike, type AttemptResult, type AttemptSlotView, type AttemptView, type LearnerActor } from "@/server/attempts";
import { toPlainText, trustPersistedHtml } from "@/server/content/render";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { getLessonForStudent, type LessonActor, type LessonForStudent } from "@/server/lessons";
import {
  answerPracticeQuestion,
  endPracticeSession,
  getDailyOverview,
  getPracticeSummary,
  loadQuestionAssets,
  loadRevealAssets,
  normalizeResponse,
  presentQuestion,
  presentSlotFeedback,
  revealPracticeHint,
  selfAssessPracticeAnswer,
  slotSelfAssessment,
  startDailyQuestion,
  startPracticeSession,
  type DailyOverview,
  type PracticeSummary,
  type StartPracticeInput,
} from "@/server/practice";
import { getPlanPage, type PlanActor, type PlanSummary, type TodayPlan } from "@/server/studyplan/service";

/**
 * Learning read models of the REST API (§8 lessons, §10 practice, §46 daily question): the same services as the web
 * pages, projected for clients that render a whole session at once (a native app, offline).
 *
 * Answer safety: questions come from the attempt engine's `getAttemptForStudent` (only `toStudentView` projections:
 * no answer spec, correct flags, rationales, explanations or hint texts) and are presented server-side
 * (`src/server/practice/present.ts`: sanitised HTML, KaTeX). Feedback and reveals appear only on slots the engine has
 * marked and whose feedback rules allow showing them. Other students' sessions are NOT_FOUND (never "forbidden"), so
 * ids cannot be probed.
 */

/** One question of a session as the API returns it. */
export interface ApiPracticeSlot {
  position: number;
  marksAvailable: number;
  /** Marked, or queued for (AI) marking. */
  answered: boolean;
  question: PresentedQuestion | null;
  response: QuestionResponse | null;
  feedback: PresentedFeedback | null;
  hints: PresentedHint[];
}

export interface ApiPracticeSession {
  id: string;
  mode: AttemptMode;
  status: AttemptStatus;
  subject: { id: string; name: string };
  isOpen: boolean;
  immediateFeedback: boolean;
  questionCount: number;
  markedCount: number;
  nextPosition: number | null;
  startedAt: Date;
  submittedAt: Date | null;
  slots: ApiPracticeSlot[];
}

/** The single slot of a DAILY_QUESTION attempt. */
export const DAILY_QUESTION_POSITION = 1;

function sessionNotFound(): AppError {
  return AppError.notFound("Session not found.");
}

/** Hints already revealed on a slot (the engine sanitised them when it stored them). */
function revealedHints(slot: Pick<AttemptSlotView, "revealedHints" | "question">): PresentedHint[] {
  const total = Math.max(slot.question?.hintCount ?? 0, slot.revealedHints.length);
  return slot.revealedHints.map((html, index) => ({ hintNumber: index + 1, totalHints: total, html: trustPersistedHtml(html) }));
}

/** Presents every slot of an attempt view: one asset query for the questions, one for the reveals. */
async function presentSlots(attempt: AttemptView): Promise<ApiPracticeSlot[]> {
  const views = attempt.questions.flatMap((slot) => (slot.question ? [slot.question] : []));
  const [questionAssets, revealAssets] = await Promise.all([
    loadQuestionAssets(views),
    loadRevealAssets(attempt.questions.map((slot) => slot.result?.reveal ?? null)),
  ]);
  const closed = attempt.status !== "IN_PROGRESS";
  return attempt.questions.map((slot) => {
    const feedback = presentSlotFeedback(slot, { resolveAsset: revealAssets, selfAssessment: slotSelfAssessment(slot) });
    return {
      position: slot.position,
      marksAvailable: slot.marksAvailable,
      answered: slot.result !== null,
      question: slot.question ? presentQuestion(slot.question, questionAssets) : null,
      response: slot.question ? normalizeResponse(slot.question.type, slot.response) : null,
      feedback: feedback ? { ...feedback, attemptCompleted: closed } : null,
      hints: revealedHints(slot),
    };
  });
}

async function presentSession(attempt: AttemptView): Promise<ApiPracticeSession> {
  const slots = await presentSlots(attempt);
  const isOpen = attempt.status === "IN_PROGRESS";
  return {
    id: attempt.id,
    mode: attempt.mode,
    status: attempt.status,
    subject: attempt.subject,
    isOpen,
    immediateFeedback: attempt.feedback === "IMMEDIATE",
    questionCount: attempt.questionCount,
    markedCount: slots.filter((slot) => slot.answered).length,
    nextPosition: isOpen ? (slots.find((slot) => !slot.answered)?.position ?? null) : null,
    startedAt: attempt.startedAt,
    submittedAt: attempt.submittedAt,
    slots,
  };
}

/** A practice-style attempt of the actor (exam-mode attempts are not served here). @throws AppError NOT_FOUND */
async function loadPracticeAttempt(actor: LearnerActor, attemptId: string): Promise<AttemptView> {
  const attempt = await getAttemptForStudent(actor, attemptId);
  if (!isPracticeLike(attempt.mode)) throw sessionNotFound();
  return attempt;
}

/**
 * Cheap guard for the practice write endpoints (one primary-key read): the attempt must be the actor's own AND
 * practice-style, so `/practice/sessions/{id}/...` can never reveal hints in, self-mark or SUBMIT an exam, mock or
 * diagnostic attempt (those have their own flows). Unknown and other students' ids are NOT_FOUND, like every other
 * practice endpoint. @throws AppError NOT_FOUND
 */
async function assertPracticeAttempt(actor: LearnerActor, attemptId: string): Promise<void> {
  const row = await db.assessmentAttempt.findUnique({ where: { id: attemptId }, select: { userId: true, mode: true } });
  if (!row || row.userId !== actor.userId || !isPracticeLike(row.mode)) throw sessionNotFound();
}

// =====================================================================================================================
// Practice sessions
// =====================================================================================================================

/**
 * Starts (or, for a repeated idempotency key, returns) a practice session and presents it.
 *
 * @throws AppError VALIDATION (not enrolled, bad scope) | NOT_FOUND (no questions) | QUOTA_EXCEEDED | ENTITLEMENT_REQUIRED
 */
export async function startPracticeForApi(
  actor: LearnerActor,
  input: StartPracticeInput,
): Promise<{ resumed: boolean; shortfall: number; session: ApiPracticeSession }> {
  const started = await startPracticeSession(actor, input);
  const session = await presentSession(await getAttemptForStudent(actor, started.attemptId));
  return { resumed: started.resumed, shortfall: started.shortfall, session };
}

/** @throws AppError NOT_FOUND (unknown, someone else's, or not a practice-style attempt) | FORBIDDEN */
export async function getPracticeSessionForApi(actor: LearnerActor, attemptId: string): Promise<ApiPracticeSession> {
  return presentSession(await loadPracticeAttempt(actor, attemptId));
}

/**
 * Answers one question with immediate marking (the practice service's `answerPracticeQuestion`).
 *
 * @throws AppError VALIDATION | NOT_FOUND | CONFLICT (session closed) | BAD_REQUEST | QUOTA_EXCEEDED | ENTITLEMENT_REQUIRED
 */
export async function answerPracticeForApi(
  actor: LearnerActor,
  attemptId: string,
  input: { position: number; response: unknown; timeSpentSeconds?: number | undefined; hintsUsed?: number | undefined },
): Promise<PresentedFeedback> {
  return answerPracticeQuestion(actor, {
    attemptId,
    position: input.position,
    response: input.response,
    ...(input.timeSpentSeconds !== undefined ? { timeSpentSeconds: input.timeSpentSeconds } : {}),
    ...(input.hintsUsed !== undefined ? { hintsUsed: input.hintsUsed } : {}),
  });
}

/** Results and review of a practice-style session. @throws AppError NOT_FOUND | FORBIDDEN */
export async function getPracticeSummaryForApi(actor: LearnerActor, attemptId: string): Promise<PracticeSummary> {
  const summary = await getPracticeSummary(actor, attemptId);
  if (!isPracticeLike(summary.mode)) throw sessionNotFound();
  return summary;
}

/**
 * Reveals the next hint of an unanswered question (the practice service's `revealPracticeHint`; the hint is stored, so
 * GET /practice/sessions/{id} lists it from then on and `hintsUsed` is recorded with the answer).
 *
 * @throws AppError NOT_FOUND | CONFLICT (session closed, question answered, no hints left) | BAD_REQUEST (no hints in
 *   this mode) | VALIDATION
 */
export async function revealPracticeHintForApi(actor: LearnerActor, attemptId: string, position: number): Promise<PresentedHint> {
  await assertPracticeAttempt(actor, attemptId);
  return revealPracticeHint(actor, { attemptId, position });
}

/**
 * Self-assessment of an open answer that waits for marking while AI marking is not available (§10, ARCHITECTURE §6.5):
 * the student ticks the mark-scheme points they made (`feedback.selfAssessment` lists them); recorded SELF_ASSESSED.
 *
 * @throws AppError NOT_FOUND | CONFLICT (already marked) | BAD_REQUEST (not self-assessable) | VALIDATION
 */
export async function selfAssessPracticeForApi(
  actor: LearnerActor,
  attemptId: string,
  input: { position: number; pointIds?: string[] | undefined; marks?: number | undefined },
): Promise<PresentedFeedback> {
  await assertPracticeAttempt(actor, attemptId);
  return selfAssessPracticeAnswer(actor, {
    attemptId,
    position: input.position,
    ...(input.pointIds !== undefined ? { pointIds: input.pointIds } : {}),
    ...(input.marks !== undefined ? { marks: input.marks } : {}),
  });
}

/**
 * Ends a practice session early (§10): answered questions are kept and scored, unanswered ones are left out.
 * Idempotent: ending a session that is already closed returns its results unchanged.
 *
 * @throws AppError NOT_FOUND (unknown, someone else's, or not a practice-style attempt)
 */
export async function endPracticeForApi(actor: LearnerActor, attemptId: string): Promise<AttemptResult> {
  await assertPracticeAttempt(actor, attemptId);
  return endPracticeSession(actor, attemptId);
}

// =====================================================================================================================
// Daily question
// =====================================================================================================================

export interface ApiDailyCurrent {
  subjectId: string;
  attemptId: string;
  status: AttemptStatus;
  slot: ApiPracticeSlot | null;
}

export interface ApiDailyOverview extends DailyOverview {
  current: ApiDailyCurrent | null;
}

async function dailyCurrent(actor: LearnerActor, subjectId: string, attemptId: string): Promise<ApiDailyCurrent> {
  const attempt = await getAttemptForStudent(actor, attemptId);
  const slots = await presentSlots(attempt);
  return { subjectId, attemptId: attempt.id, status: attempt.status, slot: slots[0] ?? null };
}

/**
 * Today's daily questions (per enrolled subject) plus the selected subject's opened question: `subjectId` when given,
 * else — like the web page — the first entitled one still to answer, else the first scheduled one. Read-only.
 */
export async function getDailyQuestionForApi(actor: LearnerActor, subjectId: string | null): Promise<ApiDailyOverview> {
  const overview = await getDailyOverview(actor);
  const available = overview.items.filter((item) => item.dailyQuestionId !== null);
  const selected =
    (subjectId !== null ? available.find((item) => item.subject.id === subjectId) : undefined) ??
    (subjectId === null ? available.find((item) => item.entitled && (item.attempt === null || item.attempt.status === "IN_PROGRESS")) : undefined) ??
    (subjectId === null ? available[0] : undefined) ??
    null;
  const current = selected?.attempt ? await dailyCurrent(actor, selected.subject.id, selected.attempt.id) : null;
  return { ...overview, current };
}

/**
 * Opens (or resumes) today's question for a subject.
 *
 * @throws AppError VALIDATION (not one of the student's subjects) | NOT_FOUND (no question today) | ENTITLEMENT_REQUIRED
 */
export async function startDailyQuestionForApi(actor: LearnerActor, subjectId: string): Promise<{ resumed: boolean; current: ApiDailyCurrent }> {
  const started = await startDailyQuestion(actor, subjectId);
  return { resumed: started.resumed, current: await dailyCurrent(actor, subjectId, started.attemptId) };
}

/**
 * Answers today's question for a subject (opening it first when needed). Idempotent: a second answer returns the
 * stored result.
 *
 * @throws AppError as {@link startDailyQuestionForApi} and {@link answerPracticeForApi}
 */
export async function answerDailyQuestionForApi(
  actor: LearnerActor,
  input: { subjectId: string; response: unknown; timeSpentSeconds?: number | undefined; hintsUsed?: number | undefined },
): Promise<{ attemptId: string; feedback: PresentedFeedback }> {
  const { attemptId } = await startDailyQuestion(actor, input.subjectId);
  const feedback = await answerPracticeForApi(actor, attemptId, {
    position: DAILY_QUESTION_POSITION,
    response: input.response,
    timeSpentSeconds: input.timeSpentSeconds,
    hintsUsed: input.hintsUsed,
  });
  return { attemptId, feedback };
}

// =====================================================================================================================
// Study plan
// =====================================================================================================================

export interface ApiStudyPlanToday {
  today: string;
  timeZone: string;
  entitled: boolean;
  plan: PlanSummary | null;
  todayPlan: TodayPlan | null;
}

/**
 * Today's study-plan items (§16 "Today's target"), the same read the web /app/plan page makes (`getPlanPage`, which
 * `getTodayPlan` wraps; it first credits the student's latest work to the plan). Without a plan the answer is still 200:
 * `plan` and `todayPlan` are null and `entitled` says whether the student may create one.
 *
 * @throws AppError FORBIDDEN (not a student)
 */
export async function getStudyPlanTodayForApi(actor: PlanActor): Promise<ApiStudyPlanToday> {
  const page = await getPlanPage(actor);
  return { today: page.today, timeZone: page.timeZone, entitled: page.entitled, plan: page.plan, todayPlan: page.todayPlan };
}

// =====================================================================================================================
// Lessons
// =====================================================================================================================

export interface ApiLesson extends Omit<LessonForStudent, "content"> {
  content: (NonNullable<LessonForStudent["content"]> & { plainText: string }) | null;
}

/**
 * The lesson reader's model plus the body as plain text (maths kept as LaTeX) for text-only clients. The plain text is
 * derived only when the lesson is open to the student; a locked lesson carries no content at all.
 *
 * @throws AppError NOT_FOUND (unknown, unpublished, not in a pinned syllabus) | FORBIDDEN (not a student)
 */
export async function getLessonForApi(actor: LessonActor, lessonId: string, topicId: string | null): Promise<ApiLesson> {
  const lesson = await getLessonForStudent(actor, lessonId, { topicId });
  if (lesson.content === null) return { ...lesson, content: null };
  const row = await db.lesson.findUnique({ where: { id: lesson.id }, select: { body: true } });
  return { ...lesson, content: { ...lesson.content, plainText: row ? toPlainText(row.body) : "" } };
}
