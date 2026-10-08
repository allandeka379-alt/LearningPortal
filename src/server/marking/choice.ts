/**
 * Selected-response marking: MULTIPLE_CHOICE (single and multi-select) and TRUE_FALSE.
 *
 * Policies:
 * - Single-select: exactly one key must be chosen; full marks when it is a correct key (when an author marks several
 *   options correct, any one of them is accepted). Choosing several keys scores 0 (TOO_MANY_SELECTIONS) — a student
 *   cannot hedge.
 * - Multi-select, `all_or_nothing` (default): full marks only for exactly the set of correct keys.
 * - Multi-select, `partial`: credit = max(0, correctPicks − wrongPicks) / correctKeys × marks, floored to whole marks.
 *   Unknown keys count as wrong picks, so "select everything" earns nothing when there are as many distractors as
 *   keys.
 * - Duplicate keys in a response are ignored; unknown keys are flagged (UNKNOWN_OPTION). No selection = UNANSWERED.
 * - A question without options or without a correct option cannot be marked: NEEDS_REVIEW (SPEC_INVALID).
 * - True/false: full marks when `value === answerSpec.correct`; the authored feedback for the chosen value is returned.
 */
import {
  correctOptionKeys,
  formatCorrectAnswer,
  type MultipleChoicePayload,
  type MultipleChoiceSpec,
  type ResponseFor,
  type TrueFalsePayload,
  type TrueFalseSpec,
} from "@/lib/questions";
import { buildResult, invalidSpec, unanswered } from "./result";
import type { ItemMarking, MarkingFeedback, MarkingOption, MarkingResult } from "./types";

export interface MultipleChoiceMarkingInput {
  marks: number;
  payload: MultipleChoicePayload;
  spec: MultipleChoiceSpec;
  options: readonly MarkingOption[];
  response: ResponseFor<"MULTIPLE_CHOICE"> | null;
}

/** Marks a MULTIPLE_CHOICE response (single or multi-select; policies in the module header). */
export function markMultipleChoice({ marks, payload, spec, options, response }: MultipleChoiceMarkingInput): MarkingResult {
  const correct = new Set(options.filter((o) => o.isCorrect).map((o) => o.key));
  if (options.length === 0 || correct.size === 0) return invalidSpec(marks);
  const display = correctOptionKeys(options.map((o) => ({ key: o.key, isCorrect: o.isCorrect, content: o.content ?? "", sortOrder: o.sortOrder ?? 0 }))).join(", ");

  const picks = [...new Set(response?.optionKeys ?? [])];
  if (picks.length === 0) return unanswered(marks, display);

  const known = new Set(options.map((o) => o.key));
  const picked = new Set(picks);
  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };
  if (picks.some((k) => !known.has(k))) feedback.flags.push("UNKNOWN_OPTION");
  feedback.items = [...options]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map<ItemMarking>((o) => ({
      id: o.key,
      correct: picked.has(o.key) === o.isCorrect,
      awarded: null,
      maxMarks: null,
      expected: o.isCorrect ? "selected" : "not selected",
      given: picked.has(o.key) ? "selected" : "not selected",
    }));

  if (payload.selectMode === "single") {
    if (picks.length > 1) {
      feedback.flags.push("TOO_MANY_SELECTIONS");
      feedback.notes.push("Only one answer may be chosen.");
      return buildResult("MARKED", 0, marks, feedback);
    }
    return buildResult("MARKED", correct.has(picks[0] as string) ? marks : 0, marks, feedback);
  }

  const right = picks.filter((k) => correct.has(k)).length;
  const wrong = picks.length - right;
  if (spec.scoring === "all_or_nothing") {
    return buildResult("MARKED", right === correct.size && wrong === 0 ? marks : 0, marks, feedback);
  }
  const raw = (Math.max(0, right - wrong) / correct.size) * marks;
  if (raw > 0 && raw < marks) feedback.flags.push("PARTIAL_ANSWER");
  return buildResult("MARKED", raw, marks, feedback);
}

export interface TrueFalseMarkingInput {
  marks: number;
  payload: TrueFalsePayload;
  spec: TrueFalseSpec;
  response: ResponseFor<"TRUE_FALSE"> | null;
}

/** Marks a TRUE_FALSE response. */
export function markTrueFalse({ marks, payload, spec, response }: TrueFalseMarkingInput): MarkingResult {
  const display = formatCorrectAnswer("TRUE_FALSE", payload, spec);
  if (!response) return unanswered(marks, display);
  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };
  const authored = response.value ? spec.feedbackTrue : spec.feedbackFalse;
  if (authored !== undefined) feedback.responseFeedback = authored;
  return buildResult("MARKED", response.value === spec.correct ? marks : 0, marks, feedback);
}
