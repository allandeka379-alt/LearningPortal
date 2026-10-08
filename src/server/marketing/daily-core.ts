/**
 * Pure rules of the public (signed-out) daily question (§46, ARCHITECTURE §3.3 "/daily: anonymous answers are marked but
 * not stored"). The answer is marked by the deterministic marking engine and returned as the same `PresentedFeedback`
 * the signed-in renderers use, but nothing is recorded: no attempt, no streak, no mastery. Unit tested.
 */
import type { PresentedFeedback, PresentedReveal } from "@/components/questions/types";
import { feedbackOutcome } from "@/components/questions/response-model";
import type { MarkingStatus } from "@/generated/prisma/enums";
import { daysBetween, type LocalDate } from "@/lib/dates";
import type { MarkingResult } from "@/server/marking/types";

/**
 * How many days after its date a daily question still accepts anonymous answers. The page is cached for a few minutes,
 * so a visitor who loaded it just before midnight (Africa/Harare) can still submit after the rollover.
 */
export const DAILY_ANSWER_GRACE_DAYS = 1;

/** True when a daily question dated `questionDate` may be answered on `today` (same day, or within the grace window). */
export function isAnswerableDailyDate(questionDate: LocalDate, today: LocalDate): boolean {
  const age = daysBetween(questionDate, today);
  return age >= 0 && age <= DAILY_ANSWER_GRACE_DAYS;
}

/** Shown when an answer could not be marked automatically (signed-out visitors have no AI or teacher marking). */
export const ANONYMOUS_REVIEW_NOTE =
  "Answers given without an account are not saved or reviewed. Sign in to have written answers marked in full; for now, compare yours with the answer below.";

/** Marking outcome → the attempt-style status the shared renderers understand. Pending AI work stays provisional. */
function statusFor(result: MarkingResult): MarkingStatus {
  switch (result.status) {
    case "MARKED":
      return "AUTO_MARKED";
    case "UNANSWERED":
      return "UNANSWERED";
    case "NEEDS_REVIEW":
    case "PENDING_AI":
      return "NEEDS_REVIEW";
  }
}

/**
 * Feedback for an anonymous answer: the deterministic mark (provisional when a human or AI would have to finish it),
 * the marker's notes and the full reveal (correct answer, explanation, worked solution). No topic link, mastery or
 * self-assessment: those belong to a signed-in attempt.
 */
export function publicFeedbackFromMarking(result: MarkingResult, reveal: PresentedReveal | null): PresentedFeedback {
  const status = statusFor(result);
  const provisional = status === "NEEDS_REVIEW";
  const notes = [...result.feedback.notes];
  if (provisional && !notes.includes(ANONYMOUS_REVIEW_NOTE)) notes.push(ANONYMOUS_REVIEW_NOTE);
  const marksAwarded = result.status === "UNANSWERED" ? 0 : result.marksAwarded;
  return {
    position: 1,
    status,
    outcome: feedbackOutcome({ status, marksAwarded, marksAvailable: result.maxMarks, isCorrect: provisional ? null : result.isCorrect }),
    marksAwarded,
    marksAvailable: result.maxMarks,
    notes,
    reveal,
    markerComment: null,
    topic: null,
    studyLesson: null,
    mastery: null,
    selfAssessment: null,
    attemptCompleted: true,
    nextPosition: null,
  };
}
