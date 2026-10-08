/**
 * ESSAY and EXTENDED_RESPONSE: never auto-awarded (§9, ARCHITECTURE §6.5).
 *
 * - Blank → UNANSWERED.
 * - AI_ASSISTED → PENDING_AI (the ai.mark job marks against our own mark-scheme points; low confidence → review).
 * - MANUAL → NEEDS_REVIEW. AUTO is an authoring error for these types (validateQuestionDefinition rejects it) and is
 *   treated like MANUAL: a human decides, nothing is awarded automatically.
 * - Provisional marks are 0 and every mark-scheme point is listed with `awarded: null`.
 * - Word limits are reported (OVER_WORD_LIMIT / UNDER_WORD_LIMIT) for the marker; they never change marks here.
 */
import { isBlankText, wordCount, type MarkingMode, type OpenResponsePayload, type OpenResponseSpec, type ResponseFor } from "@/lib/questions";
import { buildResult, openRoute, unanswered } from "./result";
import type { MarkingFeedback, MarkingResult } from "./types";

export interface OpenResponseMarkingInput {
  marks: number;
  markingMode: MarkingMode;
  payload: OpenResponsePayload;
  spec: OpenResponseSpec;
  response: ResponseFor<"ESSAY"> | ResponseFor<"EXTENDED_RESPONSE"> | null;
}

/** Routes an ESSAY / EXTENDED_RESPONSE answer to AI-assisted or manual marking; never awards marks itself. */
export function markOpenResponse({ marks, markingMode, payload, spec, response }: OpenResponseMarkingInput): MarkingResult {
  const text = response?.text ?? "";
  if (isBlankText(text)) return unanswered(marks, null);
  const status = openRoute(markingMode);
  const feedback: MarkingFeedback = {
    correctAnswerDisplay: null,
    notes: [status === "PENDING_AI" ? "Your answer will be marked against the mark scheme shortly." : "Your teacher will mark this answer."],
    flags: [status === "PENDING_AI" ? "AI_REQUIRED" : "MANUAL_REVIEW"],
    matchedPoints: spec.markScheme.points.map((p) => ({ pointId: p.id, description: p.description, maxMarks: p.marks, awarded: null, evidence: null })),
  };
  const limit = payload.wordLimit;
  if (limit) {
    const words = wordCount(text);
    if (limit.max !== undefined && words > limit.max) {
      feedback.flags.push("OVER_WORD_LIMIT");
      feedback.notes.push(`Your answer has ${words} words; the limit is ${limit.max}.`);
    }
    if (limit.min !== undefined && words < limit.min) {
      feedback.flags.push("UNDER_WORD_LIMIT");
      feedback.notes.push(`Your answer has ${words} words; at least ${limit.min} are expected.`);
    }
  }
  return buildResult(status, 0, marks, feedback, marks);
}
