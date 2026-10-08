/**
 * CALCULATION marking: NUMERICAL rules for the final answer (A marks) plus optional method marks (M marks) for the
 * working, which only AI-assisted or human marking can award (ARCHITECTURE §6.5).
 *
 * Let M = Σ methodMarks and A = marks − M.
 * - No answer and no working → UNANSWERED.
 * - No method marks → marked exactly like NUMERICAL out of the full marks.
 * - Correct final answer with no penalties and `methodRequired` not set → full marks, MARKED (exam convention: a
 *   correct answer implies the method unless the question demands the working).
 * - Otherwise the final answer is assessed out of A (unit/precision penalties apply within A), and:
 *     working given    → PENDING_AI (AUTO or AI_ASSISTED) or NEEDS_REVIEW (MANUAL); provisional = A marks earned,
 *                        pending = M; each method point is listed with `awarded: null`;
 *     no working       → MARKED with the A marks only (WORKING_MISSING: method marks need working).
 * - An ambiguous number (decimal comma) without working → NEEDS_REVIEW.
 * MANUAL questions always end in NEEDS_REVIEW (a human confirms every mark).
 */
import { formatCorrectAnswer, isBlankText, type CalculationSpec, type MarkingMode, type ResponseFor } from "@/lib/questions";
import { assessNumericAnswer, type NumericAffixes } from "./numeric";
import { asManualReview, buildResult, unanswered } from "./result";
import type { MarkingFeedback, MarkingResult, MatchedPoint } from "./types";

export interface CalculationMarkingInput {
  marks: number;
  markingMode: MarkingMode;
  spec: CalculationSpec;
  response: ResponseFor<"CALCULATION"> | null;
  /** Text shown around the answer box (see numeric.ts). */
  affixes?: NumericAffixes;
}

/** Marks a CALCULATION response: final answer by rule, method marks routed to AI or a human. */
export function markCalculation({ marks, markingMode, spec, response, affixes }: CalculationMarkingInput): MarkingResult {
  const display = formatCorrectAnswer("CALCULATION", null, spec);
  if (!response) return unanswered(marks, display);
  const hasWorking = !isBlankText(response.working);
  const methodMarks = spec.methodMarks ?? [];
  const methodTotal = Math.min(
    marks,
    methodMarks.reduce((sum, m) => sum + m.marks, 0),
  );
  const full = assessNumericAnswer(spec, response, marks, affixes);
  if (!full.answered && !hasWorking) return unanswered(marks, display);

  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [...full.notes], flags: [...full.flags] };
  const manual = markingMode === "MANUAL";

  if (methodTotal === 0) {
    if (full.flags.includes("NUMBER_AMBIGUOUS")) return buildResult("NEEDS_REVIEW", 0, marks, feedback, marks);
    const result = buildResult("MARKED", full.awarded, marks, feedback);
    return manual ? asManualReview(result) : result;
  }

  if (full.fullyCorrect && !spec.methodRequired) {
    feedback.flags.push("METHOD_MARKS_IMPLIED");
    feedback.matchedPoints = methodMarks.map<MatchedPoint>((m) => ({
      pointId: m.id,
      description: m.description,
      maxMarks: m.marks,
      awarded: m.marks,
      evidence: "Implied by the correct final answer.",
    }));
    const result = buildResult("MARKED", marks, marks, feedback);
    return manual ? asManualReview(result) : result;
  }

  const answerMarks = marks - methodTotal;
  const finalAnswer = answerMarks > 0 ? assessNumericAnswer(spec, response, answerMarks, affixes) : { ...full, awarded: 0 };
  feedback.notes = [...finalAnswer.notes];
  feedback.flags = [...finalAnswer.flags];

  if (hasWorking) {
    feedback.flags.push("METHOD_MARKS_PENDING");
    feedback.matchedPoints = methodMarks.map<MatchedPoint>((m) => ({ pointId: m.id, description: m.description, maxMarks: m.marks, awarded: null, evidence: null }));
    if (manual) {
      feedback.flags.push("MANUAL_REVIEW");
      return buildResult("NEEDS_REVIEW", finalAnswer.awarded, marks, feedback, methodTotal);
    }
    feedback.flags.push("AI_REQUIRED");
    return buildResult("PENDING_AI", finalAnswer.awarded, marks, feedback, methodTotal);
  }

  if (finalAnswer.flags.includes("NUMBER_AMBIGUOUS")) return buildResult("NEEDS_REVIEW", 0, marks, feedback, marks);
  feedback.flags.push("WORKING_MISSING");
  feedback.notes.push("Show your working to earn method marks.");
  feedback.matchedPoints = methodMarks.map<MatchedPoint>((m) => ({ pointId: m.id, description: m.description, maxMarks: m.marks, awarded: 0, evidence: null }));
  const result = buildResult("MARKED", finalAnswer.awarded, marks, feedback);
  return manual ? asManualReview(result) : result;
}
