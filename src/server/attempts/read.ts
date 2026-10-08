import "server-only";
import { toAnswerReveal, toStudentView, type StudentQuestionView } from "@/lib/questions";
import { db } from "@/server/db";
import { expiryAction, timerSnapshot } from "@/server/exams/timer";
import { logger } from "@/server/lib/logger";
import type { AttemptFeedbackJson } from "@/server/marking";
import { getQuestionsForAttempt, type AttemptQuestion } from "@/server/questions";
import { assertLearner, assignmentWindowEnd, loadSlots, requireOwnAttempt, type AttemptContext } from "./context";
import { revealedHintHtml } from "./hints";
import { revealAllowed, selfAssessmentAllowed } from "./policy";
import { loadAttemptResult } from "./result";
import { aiMarkingAvailableFor } from "./self-assess";
import { closeAttemptIfDue } from "./submit";
import type { AttemptSlotView, AttemptView, LearnerActor } from "./types";

/**
 * The student-facing view of an attempt (§13 exam mode: numbering, mark allocation, time remaining, flags, review
 * unanswered; §10 practice one question at a time).
 *
 * Answer-safety (§13 "answers never exposed before submission"): questions are projected with `toStudentView` (a
 * whitelist: no answer spec, no isCorrect, no explanations, hint texts or rendered answer HTML), each slot carries the
 * student's OWN saved response only (with its save version, and the hints the student already revealed, so a reload
 * keeps them), and marks / reveals are attached only where the attempt's feedback rules allow
 * (`revealAllowed`): per marked slot in immediate-feedback modes, after submission in exam modes (and for AFTER_CLOSE
 * teacher tests only after the assignment window closes). A timed attempt whose deadline + grace has passed is closed
 * lazily here when the job has not run yet.
 */

/** Projects a question for the student; a corrupt payload is logged and shown as unavailable (never thrown). */
function studentView(question: AttemptQuestion | undefined, seed: string): StudentQuestionView | null {
  if (!question) return null;
  try {
    return toStudentView(question, { shuffleSeed: seed });
  } catch (error) {
    logger.error("attempts: question payload failed validation; hidden from the student", { questionId: question.id, err: error });
    return null;
  }
}

async function buildView(context: AttemptContext, now: Date): Promise<AttemptView> {
  const [slots, sections] = await Promise.all([
    loadSlots(db, context.id),
    db.assessmentAttemptSection.findMany({ where: { attemptId: context.id }, orderBy: { sectionNumber: "asc" } }),
  ]);
  const questions = await getQuestionsForAttempt(
    [...new Set(slots.map((s) => s.questionId))],
    { ...(context.enrollment ? { syllabusId: context.enrollment.syllabusId } : {}), ...(context.tenancy ? { tenancy: context.tenancy } : {}) },
  );
  const byId = new Map(questions.map((q) => [q.id, q]));
  const open = context.status === "IN_PROGRESS";
  const windowClosesAt = assignmentWindowEnd(context);
  // Per student: a minor whose guardian consent refuses AI processing self-assesses like on a server without AI (MIN-01).
  const aiMarkingAvailable = await aiMarkingAvailableFor(context.userId);

  const views: AttemptSlotView[] = slots.map((slot) => {
    const question = byId.get(slot.questionId);
    const processed = slot.markingStatus !== "PENDING" || slot.markedAt !== null;
    const visible = revealAllowed({
      feedback: context.feedback,
      attemptOpen: open,
      slotMarked: processed,
      assessmentTiming: context.assessment?.feedbackTiming ?? null,
      windowClosesAt,
      now,
    });
    return {
      position: slot.position,
      sectionNumber: slot.sectionNumber,
      marksAvailable: slot.marksAvailable,
      flagged: slot.flaggedForReview,
      answered: slot.response !== null,
      response: slot.response,
      responseVersion: slot.responseVersion,
      hintsUsed: slot.hintsUsed,
      // Hints exist in immediate-feedback modes only: an exam never shows hint texts, whatever a client reported.
      revealedHints: context.feedback === "IMMEDIATE" ? revealedHintHtml(question, slot.hintsUsed) : [],
      question: studentView(question, `${context.id}:${slot.position}`),
      result: visible
        ? {
            status: slot.markingStatus,
            marksAwarded: slot.marksAwarded,
            isCorrect: slot.isCorrect,
            feedback: (slot.feedback as AttemptFeedbackJson | null) ?? null,
            reveal: question ? toAnswerReveal(question) : null,
            selfAssessable: selfAssessmentAllowed({
              markingStatus: slot.markingStatus,
              processed,
              answered: slot.response !== null,
              questionType: question?.type ?? null,
              isAssignment: context.assignmentId !== null,
              feedbackVisible: visible,
              aiMarkingAvailable,
            }),
          }
        : null,
    };
  });

  return {
    id: context.id,
    mode: context.mode,
    status: context.status,
    subject: { id: context.subjectId, name: context.subjectName },
    assessment: context.assessment
      ? {
          id: context.assessment.id,
          title: context.assessment.title,
          kind: context.assessment.kind,
          instructions: context.assessment.instructions,
          allowNavigation: context.assessment.allowNavigation,
        }
      : null,
    topicId: context.topicId,
    lessonId: context.lessonId,
    assignmentId: context.assignmentId,
    feedback: context.feedback,
    startedAt: context.startedAt,
    deadlineAt: context.deadlineAt,
    submittedAt: context.submittedAt,
    timer:
      context.deadlineAt !== null
        ? timerSnapshot({ status: open ? "IN_PROGRESS" : "SUBMITTED", startedAt: context.startedAt, deadline: context.deadlineAt }, now)
        : null,
    extraTimePercent: context.config.extraTimePercent && context.config.extraTimePercent > 0 ? context.config.extraTimePercent : null,
    sections: sections.map((s) => ({
      sectionNumber: s.sectionNumber,
      title: s.title,
      answerCount: s.answerCount,
      maxMarks: s.maxMarks,
      timeLimitSeconds: s.timeLimitSeconds,
      startedAt: s.startedAt,
      deadlineAt: s.deadlineAt,
      submittedAt: s.submittedAt,
      marksAwarded: open ? null : s.marksAwarded,
    })),
    questionCount: slots.length,
    answeredCount: slots.filter((s) => s.response !== null).length,
    flaggedPositions: slots.filter((s) => s.flaggedForReview).map((s) => s.position),
    unansweredPositions: slots.filter((s) => s.response === null).map((s) => s.position),
    lastPosition: context.lastPosition,
    allowNavigation: context.assessment?.allowNavigation ?? true,
    lateSync: context.lateSync,
    questions: views,
    result: open ? null : await loadAttemptResult(db, context.id),
  };
}

/**
 * The student's own attempt with student-safe question views, saved responses, remaining time and flags (module
 * header). Another student's attempt is NOT_FOUND.
 *
 * @throws AppError FORBIDDEN (not a student) | NOT_FOUND
 */
export async function getAttemptForStudent(actor: LearnerActor, attemptId: string, options: { now?: Date } = {}): Promise<AttemptView> {
  assertLearner(actor);
  const now = options.now ?? new Date();
  let context = await requireOwnAttempt(db, actor, attemptId);
  if (
    context.status === "IN_PROGRESS" &&
    context.deadlineAt !== null &&
    expiryAction({ status: "IN_PROGRESS", startedAt: context.startedAt, deadline: context.deadlineAt }, now) === "AUTO_SUBMIT"
  ) {
    await closeAttemptIfDue(attemptId, { now });
    context = await requireOwnAttempt(db, actor, attemptId);
  }
  return buildView(context, now);
}
