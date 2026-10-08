/**
 * Result builders shared by the per-type markers. Whole-mark policy: QuestionAttempt.marksAwarded is SMALLINT, so
 * fractional credit (multi-select partial scoring, equal shares of marks across blanks/pairs) is FLOORED to whole
 * marks — the engine never over-awards. A tiny epsilon keeps 2.9999999 (binary noise) from flooring to 2.
 */
import type { MarkingMode } from "@/lib/questions";
import type { MarkingFeedback, MarkingFlag, MarkingOutcome, MarkingResult } from "./types";

const EPSILON = 1e-9;

/** Floors `raw` to whole marks within [0, max]; non-finite input counts as 0. */
export function wholeMarks(raw: number, max: number): number {
  if (!Number.isFinite(raw)) return 0;
  return Math.min(max, Math.max(0, Math.floor(raw + EPSILON)));
}

/** Rounds an item weight for display (2 decimals). */
export function displayWeight(weight: number): number {
  return Math.round(weight * 100) / 100;
}

export function emptyFeedback(correctAnswerDisplay: string | null = null): MarkingFeedback {
  return { correctAnswerDisplay, notes: [], flags: [] };
}

function isCorrectFor(status: MarkingOutcome, awarded: number, max: number): boolean | null {
  if (status === "UNANSWERED") return false;
  if (status !== "MARKED") return null;
  if (awarded >= max) return true;
  return awarded === 0 ? false : null;
}

/** Assembles a result, clamping marks and deriving `isCorrect`. */
export function buildResult(status: MarkingOutcome, rawAwarded: number, maxMarks: number, feedback: MarkingFeedback, pendingMarks = 0): MarkingResult {
  const marksAwarded = status === "UNANSWERED" ? 0 : wholeMarks(rawAwarded, maxMarks);
  const pending = status === "MARKED" || status === "UNANSWERED" ? 0 : Math.min(Math.max(0, Math.round(pendingMarks)), maxMarks - marksAwarded);
  return {
    status,
    marksAwarded,
    maxMarks,
    isCorrect: isCorrectFor(status, marksAwarded, maxMarks),
    pendingMarks: pending,
    feedback: { ...feedback, notes: [...new Set(feedback.notes)], flags: [...new Set(feedback.flags)] },
  };
}

export function unanswered(maxMarks: number, correctAnswerDisplay: string | null = null): MarkingResult {
  return buildResult("UNANSWERED", 0, maxMarks, emptyFeedback(correctAnswerDisplay));
}

/** The stored answer spec / payload could not be parsed: never award, send to a human. */
export function invalidSpec(maxMarks: number): MarkingResult {
  return buildResult(
    "NEEDS_REVIEW",
    0,
    maxMarks,
    { correctAnswerDisplay: null, notes: ["This question couldn't be marked automatically, so it has been sent for review."], flags: ["SPEC_INVALID"] },
    maxMarks,
  );
}

/** The stored response is not valid for this question type (a client or storage bug): never award, send to a human. */
export function invalidResponse(maxMarks: number, flag: MarkingFlag, correctAnswerDisplay: string | null): MarkingResult {
  return buildResult(
    "NEEDS_REVIEW",
    0,
    maxMarks,
    { correctAnswerDisplay, notes: ["Your answer couldn't be read automatically, so it has been sent for review."], flags: [flag] },
    maxMarks,
  );
}

/** Where open-ended evaluation goes: AI-assisted questions to the AI marker, everything else to a human. */
export function openRoute(markingMode: MarkingMode): "PENDING_AI" | "NEEDS_REVIEW" {
  return markingMode === "AI_ASSISTED" ? "PENDING_AI" : "NEEDS_REVIEW";
}

/** Turns a deterministic MARKED result into a provisional one for MANUAL questions (a human confirms every mark). */
export function asManualReview(result: MarkingResult): MarkingResult {
  if (result.status !== "MARKED") return result;
  return buildResult(
    "NEEDS_REVIEW",
    result.marksAwarded,
    result.maxMarks,
    { ...result.feedback, notes: [...result.feedback.notes, "Your teacher will confirm this mark."], flags: [...result.feedback.flags, "MANUAL_REVIEW"] },
    result.maxMarks - result.marksAwarded,
  );
}

/**
 * Item weights for blanks / hotspots: an item's own `marks` when given, otherwise an equal share of the marks left
 * after the explicitly weighted items (never negative).
 */
export function itemWeights(explicit: readonly (number | undefined)[], totalMarks: number): number[] {
  const specified = explicit.reduce<number>((sum, m) => sum + (m ?? 0), 0);
  const unspecified = explicit.filter((m) => m === undefined).length;
  const share = unspecified > 0 ? Math.max(0, totalMarks - specified) / unspecified : 0;
  return explicit.map((m) => m ?? share);
}
