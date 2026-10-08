/**
 * Mapping from a {@link MarkingResult} to the QuestionAttempt columns, honouring the raw-SQL CHECKs on that table
 * (prisma/migrations/*_init/migration.sql):
 *   - QuestionAttempt_marking_state_chk: PENDING ⇔ marksAwarded IS NULL ⇔ isCorrect IS NULL; non-PENDING needs markedAt;
 *   - QuestionAttempt_is_correct_chk: isCorrect = (marksAwarded = marksAvailable);
 *   - QuestionAttempt_unanswered_chk: UNANSWERED ⇒ response IS NULL AND marksAwarded = 0.
 * So: MARKED → AUTO_MARKED; NEEDS_REVIEW → NEEDS_REVIEW with the provisional mark; PENDING_AI → PENDING (no mark);
 * UNANSWERED → UNANSWERED with the stored response cleared.
 *
 * `feedback` follows the QuestionAttempt.feedback doc shape — `{ parts?, points?, comment? }`, NULL for single-part
 * deterministic answers (the UI re-derives per-item detail by re-running the pure marker). Documented extension:
 * `parts[].pending` is true while that part awaits AI or a human.
 */
import type { MarkingStatus } from "@/generated/prisma/enums";
import type { MarkingOutcome, MarkingResult, PartMarking } from "./types";

export interface AttemptFeedbackJson {
  parts?: { partId: string; awarded: number; max: number; correct: boolean; pending?: true }[];
  points?: { pointId: string; awarded: number; evidence?: string }[];
  comment?: string;
}

export interface AttemptMarkingColumns {
  markingStatus: MarkingStatus;
  marksAwarded: number | null;
  isCorrect: boolean | null;
  feedback: AttemptFeedbackJson | null;
  /** The response to store: null for UNANSWERED (QuestionAttempt_unanswered_chk), otherwise the given response. */
  response: unknown;
}

const STATUS_MAP: Readonly<Record<MarkingOutcome, MarkingStatus>> = {
  MARKED: "AUTO_MARKED",
  NEEDS_REVIEW: "NEEDS_REVIEW",
  PENDING_AI: "PENDING",
  UNANSWERED: "UNANSWERED",
};

function flattenParts(perPart: readonly PartMarking[], into: NonNullable<AttemptFeedbackJson["parts"]>): void {
  for (const part of perPart) {
    if (part.result.feedback.perPart) {
      flattenParts(part.result.feedback.perPart, into);
      continue;
    }
    const final = part.result.status === "MARKED" || part.result.status === "UNANSWERED";
    into.push({
      partId: part.partId,
      awarded: part.result.marksAwarded,
      max: part.result.maxMarks,
      correct: final && part.result.marksAwarded === part.result.maxMarks,
      ...(final ? {} : { pending: true as const }),
    });
  }
}

/** Builds the QuestionAttempt.feedback JSON (null when there is nothing beyond the mark). */
export function toAttemptFeedback(result: MarkingResult): AttemptFeedbackJson | null {
  const feedback: AttemptFeedbackJson = {};
  if (result.feedback.perPart) {
    const parts: NonNullable<AttemptFeedbackJson["parts"]> = [];
    flattenParts(result.feedback.perPart, parts);
    feedback.parts = parts;
  }
  const points = (result.feedback.matchedPoints ?? [])
    .filter((p) => p.awarded !== null)
    .map((p) => ({ pointId: p.pointId, awarded: p.awarded as number, ...(p.evidence !== null ? { evidence: p.evidence } : {}) }));
  if (points.length > 0) feedback.points = points;
  return feedback.parts || feedback.points ? feedback : null;
}

/** QuestionAttempt column values for a marking result (see module header). */
export function toAttemptColumns(result: MarkingResult, response: unknown): AttemptMarkingColumns {
  const markingStatus = STATUS_MAP[result.status];
  if (result.status === "PENDING_AI") {
    return { markingStatus, marksAwarded: null, isCorrect: null, feedback: toAttemptFeedback(result), response };
  }
  if (result.status === "UNANSWERED") {
    return { markingStatus, marksAwarded: 0, isCorrect: false, feedback: null, response: null };
  }
  return {
    markingStatus,
    marksAwarded: result.marksAwarded,
    isCorrect: result.marksAwarded === result.maxMarks,
    feedback: toAttemptFeedback(result),
    response,
  };
}

/** Status for `src/server/exams/scoring.ts` (`ScoringItem.markingStatus`). */
export function toScoringStatus(status: MarkingOutcome): "MARKED" | "NEEDS_REVIEW" | "PENDING" | "UNANSWERED" {
  return status === "PENDING_AI" ? "PENDING" : status;
}
