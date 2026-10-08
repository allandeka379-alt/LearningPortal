import "server-only";
import type { AssignmentAiHelp, EnrollmentStatus, Prisma } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, daysUntil, localDateFromDateColumn } from "@/lib/dates";
import { MAX_RECENT_MISTAKES, toContextSnapshot, type ContextSnapshotV1, type StudentContextInput } from "@/server/ai/context";
import { GRADED_MODES, IDLE_TIMEOUT_MINUTES, readAttemptConfig } from "@/server/attempts/policy";
import { toPlainText } from "@/server/content/render";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import {
  aiLockMessage,
  ANSWERS_WITHHELD_MESSAGE,
  buildQuestionContextBlock,
  decideAiHelpGate,
  describeStudentResponse,
  EXAM_LOCK_MODES,
  misconceptionsOf,
  mistakeSummary,
  questionAccess,
  TUTOR_CODE_DETAIL,
  type AiHelpGate,
  type AiHelpLock,
  type AnsweredQuestionFacts,
  type QuestionAccess,
} from "./core";

export { EXAM_LOCK_MODES };

/**
 * Database side of the tutor's learning context (§14 "knows the student's board, qualification, subject, current topic,
 * performance, weak areas"; §40 / ARCHITECTURE §5.12 data minimisation).
 *
 * Only curriculum facts and system-derived performance reach the model: board, qualification, subject, topic, mastery
 * band, the last 3 marked mistakes on the topic (misconception labels, never the student's words), target grade and
 * days to the exam. Never names, emails, phones or schools. The context is FROZEN on the conversation at creation
 * (`AiConversation.contextSnapshot`) so the cached prompt prefix stays byte-identical across turns.
 */

/** Enrolments the tutor can be opened for (DROPPED / COMPLETED subjects are not offered). */
export const TUTOR_ENROLLMENT_STATUSES = ["ACTIVE", "PAUSED"] as const satisfies readonly EnrollmentStatus[];

/** A timed attempt whose deadline passed more than this long ago is effectively over (the sweep closes it). */
export const EXAM_LOCK_GRACE_MS = 5 * 60_000;

const ENROLLMENT_SELECT = {
  subjectId: true,
  syllabusId: true,
  targetGrade: true,
  subject: {
    select: {
      name: true,
      qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } },
    },
  },
  targetExamSession: { select: { startsOn: true } },
} as const satisfies Prisma.SubjectEnrollmentSelect;

export type TutorEnrollment = Prisma.SubjectEnrollmentGetPayload<{ select: typeof ENROLLMENT_SELECT }>;

export interface TutorTopic {
  id: string;
  name: string;
  path: string;
  syllabusId: string;
}

export interface TutorScope {
  enrollment: TutorEnrollment | null;
  topic: TutorTopic | null;
  questionId: string | null;
  /**
   * The question was answered as teacher assignment work: the assignment and its AI-help setting, snapshotted on the
   * conversation (`AiConversation.assignmentId` / `aiHelp`) and enforced on every turn (ARCHITECTURE §6.4).
   */
  assignment: { assignmentId: string; aiHelp: AssignmentAiHelp } | null;
}

/** The tutor refusal for a paused state (code EXAM_IN_PROGRESS: the chat shows it as an info notice). */
export function aiLockedError(lock: AiHelpLock): AppError {
  return new AppError("FORBIDDEN", aiLockMessage(lock), { details: { [TUTOR_CODE_DETAIL]: "EXAM_IN_PROGRESS", lock } });
}

/** The tutor refusal for a question whose answers the teacher has not released yet (AFTER_CLOSE). */
export function answersWithheldError(): AppError {
  return new AppError("FORBIDDEN", ANSWERS_WITHHELD_MESSAGE, { details: { reason: "answers_withheld" } });
}

/**
 * What the student's OPEN attempts allow AI help to do right now (ARCHITECTURE §6.4), for every AI surface (tutor,
 * solver, WhatsApp): paused during any attempt under exam conditions (timed exams, mocks, and every quiz / test /
 * diagnostic whose answers are withheld until submission, including teacher tests) and during assignment work whose
 * teacher set AI help to "none"; otherwise the strictest AI-help setting of open assignment work (HINTS_ONLY caps the
 * tutor at hints). Attempts the auto-submit sweep would close (deadline + grace passed, or idle) no longer count.
 */
export async function getAiHelpGate(userId: string, now: Date = new Date()): Promise<AiHelpGate> {
  const idleCutoff = new Date(now.getTime() - IDLE_TIMEOUT_MINUTES * 60_000);
  const rows = await db.assessmentAttempt.findMany({
    where: {
      userId,
      status: "IN_PROGRESS",
      AND: [
        // Only attempts that can lock or cap AI help: tests and exams (feedback may be ON_SUBMIT) and assignment work.
        { OR: [{ mode: { in: [...GRADED_MODES] } }, { assignmentId: { not: null } }] },
        // Still live: before its deadline (+ grace), or untimed and not idle (attemptDueReason in ../attempts/submit.ts).
        {
          OR: [
            { deadlineAt: { gt: new Date(now.getTime() - EXAM_LOCK_GRACE_MS) } },
            { deadlineAt: null, OR: [{ lastSavedAt: { gte: idleCutoff } }, { startedAt: { gte: idleCutoff } }] },
          ],
        },
      ],
    },
    orderBy: { startedAt: "desc" },
    take: 50,
    select: { mode: true, config: true, assignment: { select: { aiHelp: true } } },
  });
  return decideAiHelpGate(
    rows.map((row) => ({
      mode: row.mode,
      feedback: readAttemptConfig(row.config, row.mode).feedback,
      assignmentAiHelp: row.assignment?.aiHelp ?? null,
    })),
  );
}

/** True when AI help is paused for the student (exam conditions or no-AI assignment work in progress). */
export async function hasActiveExam(userId: string, now: Date = new Date()): Promise<boolean> {
  return (await getAiHelpGate(userId, now)).lock !== null;
}

const ANSWERED_QUESTION_SELECT = {
  subjectId: true,
  topicId: true,
  response: true,
  isCorrect: true,
  markedAt: true,
  attempt: {
    select: {
      status: true,
      mode: true,
      config: true,
      assignmentId: true,
      assessment: { select: { feedbackTiming: true } },
      assignment: { select: { aiHelp: true, closesAt: true, dueAt: true } },
    },
  },
} as const satisfies Prisma.QuestionAttemptSelect;

type AnsweredQuestionRow = Prisma.QuestionAttemptGetPayload<{ select: typeof ANSWERED_QUESTION_SELECT }>;

/** The student's latest answer to a question (the attempt it belongs to decides what the tutor may use). */
function latestAnswer(userId: string, questionId: string): Promise<AnsweredQuestionRow | null> {
  return db.questionAttempt.findFirst({
    where: { userId, questionId },
    orderBy: { createdAt: "desc" },
    select: ANSWERED_QUESTION_SELECT,
  });
}

function answeredFacts(row: AnsweredQuestionRow): AnsweredQuestionFacts {
  const { attempt } = row;
  return {
    mode: attempt.mode,
    feedback: readAttemptConfig(attempt.config, attempt.mode).feedback,
    assignmentAiHelp: attempt.assignment?.aiHelp ?? null,
    attemptOpen: attempt.status === "IN_PROGRESS",
    assessmentTiming: attempt.assessment?.feedbackTiming ?? null,
    windowClosesAt: attempt.assignment ? (attempt.assignment.closesAt ?? attempt.assignment.dueAt) : null,
    marked: row.markedAt !== null,
  };
}

async function enrollmentFor(userId: string, subjectId: string): Promise<TutorEnrollment | null> {
  return db.subjectEnrollment.findFirst({
    where: { userId, subjectId, status: { in: [...TUTOR_ENROLLMENT_STATUSES] } },
    select: ENROLLMENT_SELECT,
  });
}

/**
 * Validates what a new conversation is about (CLAUDE.md rule 3 resource checks):
 * - a subject must be one of the student's enrolments;
 * - a topic must belong to the syllabus version that enrolment PINS (rule 8);
 * - a question must be one the student has already answered (no browsing of the bank through the tutor), not one
 *   inside an open attempt that pauses AI help (exam conditions, or assignment work without AI help), and not one
 *   whose answers the teacher has not released yet (AFTER_CLOSE tests before the window closes). A question answered
 *   as assignment work carries the assignment's AI-help setting into the conversation.
 *
 * @throws AppError NOT_FOUND | VALIDATION | FORBIDDEN (AI help paused, answers not released)
 */
export async function resolveTutorScope(
  userId: string,
  input: { subjectId?: string | undefined; topicId?: string | undefined; questionId?: string | undefined },
  now: Date = new Date(),
): Promise<TutorScope> {
  let subjectId = input.subjectId;
  let topicId = input.topicId;
  let questionId: string | null = null;
  let questionTopicId: string | null = null;
  let assignment: TutorScope["assignment"] = null;

  if (input.questionId) {
    const answered = await latestAnswer(userId, input.questionId);
    if (!answered) throw AppError.notFound("We couldn't find that question in your work.");
    const access = questionAccess(answeredFacts(answered), now);
    if (access.kind === "LOCKED") throw aiLockedError(access.lock);
    if (access.kind === "WITHHELD") throw answersWithheldError();
    if (subjectId && subjectId !== answered.subjectId) {
      throw AppError.validation({ questionId: ["This question belongs to a different subject."] });
    }
    subjectId = answered.subjectId;
    questionId = input.questionId;
    questionTopicId = answered.topicId;
    if (answered.attempt.assignmentId && answered.attempt.assignment) {
      assignment = { assignmentId: answered.attempt.assignmentId, aiHelp: answered.attempt.assignment.aiHelp };
    }
  }

  if (topicId && !subjectId) {
    const topic = await db.topic.findUnique({ where: { id: topicId }, select: { syllabus: { select: { subjectId: true } } } });
    if (!topic) throw AppError.notFound("We couldn't find that topic.");
    subjectId = topic.syllabus.subjectId;
  }

  if (!subjectId) return { enrollment: null, topic: null, questionId: null, assignment: null };

  const enrollment = await enrollmentFor(userId, subjectId);
  if (!enrollment) throw AppError.notFound("You're not studying this subject. Add it to your subjects first.");

  let topic: TutorTopic | null = null;
  topicId ??= questionTopicId ?? undefined;
  if (topicId) {
    const row = await db.topic.findUnique({ where: { id: topicId }, select: { id: true, name: true, path: true, syllabusId: true } });
    if (row && row.syllabusId === enrollment.syllabusId) topic = row;
    else if (input.topicId) throw AppError.validation({ topicId: ["This topic isn't part of your syllabus."] });
    // A question's topic from another syllabus version is simply not used.
  }
  return { enrollment, topic, questionId, assignment };
}

async function recentMistakes(userId: string, topic: TutorTopic): Promise<{ topic: string; summary: string }[]> {
  const subtree = await db.topic.findMany({
    where: { syllabusId: topic.syllabusId, OR: [{ id: topic.id }, { path: { startsWith: `${topic.path}/` } }] },
    select: { id: true, name: true },
    take: 500,
  });
  const names = new Map(subtree.map((row) => [row.id, row.name]));
  // QuestionAttempt(userId, topicId, createdAt): the index the adaptive engine and this context share.
  const rows = await db.questionAttempt.findMany({
    where: { userId, topicId: { in: [...names.keys()] }, isCorrect: false },
    orderBy: { createdAt: "desc" },
    take: MAX_RECENT_MISTAKES,
    select: { topicId: true, difficulty: true, feedback: true },
  });
  return rows.map((row) => ({
    topic: names.get(row.topicId) ?? topic.name,
    summary: mistakeSummary({ misconceptions: misconceptionsOf(row.feedback), difficulty: row.difficulty }),
  }));
}

/**
 * The PII-free context snapshot for a new conversation, or null when the student has no single board/qualification
 * to describe (a general conversation across several qualifications).
 */
export async function buildContextSnapshot(
  userId: string,
  scope: TutorScope,
  options: { now?: Date; timeZone?: string } = {},
): Promise<ContextSnapshotV1 | null> {
  const now = options.now ?? new Date();
  const timeZone = options.timeZone ?? DEFAULT_TIMEZONE;
  const { enrollment, topic } = scope;

  if (!enrollment) {
    const enrollments = await db.subjectEnrollment.findMany({
      where: { userId, status: { in: [...TUTOR_ENROLLMENT_STATUSES] } },
      select: { subject: { select: { qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } } } } },
      take: 50,
    });
    const qualifications = new Map(enrollments.map((row) => [row.subject.qualification.id, row.subject.qualification]));
    const only = qualifications.size === 1 ? [...qualifications.values()][0] : undefined;
    return only ? toContextSnapshot({ board: only.examBoard.shortName, qualification: only.shortName }, now) : null;
  }

  const [mastery, mistakes] = topic
    ? await Promise.all([
        db.topicMastery.findUnique({
          where: { userId_topicId: { userId, topicId: topic.id } },
          select: { band: true, questionsAttempted: true },
        }),
        recentMistakes(userId, topic),
      ])
    : [null, []];

  const input: StudentContextInput = {
    board: enrollment.subject.qualification.examBoard.shortName,
    qualification: enrollment.subject.qualification.shortName,
    subject: enrollment.subject.name,
    ...(topic ? { topic: topic.name } : {}),
    // Honest context: no band before there is evidence for it.
    ...(mastery && mastery.questionsAttempted > 0 ? { masteryBand: mastery.band } : {}),
    ...(mistakes.length > 0 ? { recentMistakes: mistakes } : {}),
    ...(enrollment.targetGrade ? { targetGrade: enrollment.targetGrade } : {}),
  };
  if (enrollment.targetExamSession) {
    const days = daysUntil(localDateFromDateColumn(enrollment.targetExamSession.startsOn), now, timeZone);
    if (days >= 0) input.examDaysLeft = days;
  }
  return toContextSnapshot(input, now);
}

const QUESTION_SELECT = {
  type: true,
  stem: true,
  explanation: true,
  answerSpec: true,
  schoolId: true,
  ownerUserId: true,
  options: { select: { key: true, content: true, isCorrect: true }, orderBy: { sortOrder: "asc" } },
} as const satisfies Prisma.QuestionSelect;

type QuestionRow = Prisma.QuestionGetPayload<{ select: typeof QUESTION_SELECT }>;

function plain(markdown: string | null | undefined): string {
  if (!markdown) return "";
  try {
    return toPlainText(markdown);
  } catch {
    return "";
  }
}

/** The correct answer as a short line, for the deterministic types where it is a single value. */
function correctAnswerOf(question: QuestionRow): string | null {
  switch (question.type) {
    case "MULTIPLE_CHOICE": {
      const keys = question.options.filter((option) => option.isCorrect).map((option) => option.key);
      return keys.length > 0 ? `option ${keys.join(", ")}` : null;
    }
    case "TRUE_FALSE": {
      const correct = (question.answerSpec as { correct?: unknown } | null)?.correct;
      return typeof correct === "boolean" ? (correct ? "true" : "false") : null;
    }
    case "NUMERICAL": {
      const value = (question.answerSpec as { value?: unknown } | null)?.value;
      return typeof value === "number" && Number.isFinite(value) ? String(value) : null;
    }
    default:
      return null;
  }
}

export interface QuestionContext {
  /** The `<question_context>` reference block (sent in the first user turn, never in the system prompt). */
  block: string;
  /** The student has a marked answer to this question (counts as an attempt for the reveal rule). */
  answered: boolean;
  /** What the tutor may do with the question now (LOCKED / WITHHELD turns are refused without a model call). */
  access: QuestionAccess;
}

/**
 * The question a conversation was opened from, as a reference block: stem and options always; the student's latest
 * answer; its outcome, the correct answer and the explanation only when the platform's own reveal rule has already
 * shown them to the student (`questionAccess`: never inside an open exam, never before an AFTER_CLOSE teacher test's
 * window closes). Null when the question is no longer published or was never answered.
 */
export async function loadQuestionContext(userId: string, questionId: string, now: Date = new Date()): Promise<QuestionContext | null> {
  const [question, latest] = await Promise.all([
    db.question.findFirst({ where: { id: questionId, status: "PUBLISHED" }, select: QUESTION_SELECT }),
    latestAnswer(userId, questionId),
  ]);
  if (!question || !latest) return null;
  const access = questionAccess(answeredFacts(latest), now);
  const revealed = access.kind === "OPEN" && access.revealed;
  const block = buildQuestionContextBlock({
    stem: plain(question.stem),
    options: question.options.map((option) => ({ key: option.key, text: plain(option.content) })),
    studentAnswer: access.kind === "OPEN" ? describeStudentResponse(latest.response) : null,
    answerCorrect: revealed ? latest.isCorrect : null,
    correctAnswer: revealed ? correctAnswerOf(question) : null,
    explanation: revealed ? plain(question.explanation) || null : null,
    teacherAuthored: question.schoolId !== null || question.ownerUserId !== null,
  });
  return { block, answered: revealed, access };
}
