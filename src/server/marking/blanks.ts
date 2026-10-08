/**
 * FILL_IN_THE_BLANK marking: each blank is marked on its own and the credit is summed.
 *
 * Policies:
 * - Blank weights: a blank's own `marks`, else an equal share of the marks not explicitly allocated; the sum of
 *   correct weights is floored to whole marks (3 blanks, 2 marks: two correct blanks earn 1).
 * - `text` blanks: normalised comparison (NFKC, whitespace, case-insensitive unless `caseSensitive`, plus the blank's
 *   `normalise` flags) against every accepted answer.
 * - `number` blanks: numeric comparison with the blank's absolute `tolerance` (exact when absent) when both sides
 *   parse as numbers; otherwise the text comparison above.
 * - `select` blanks: the chosen choice must equal an accepted value (canonical text; case-insensitive unless
 *   `caseSensitive`).
 * - Duplicate entries for a blank: the first is marked (DUPLICATE_ENTRY); entries for unknown blanks are ignored
 *   (UNKNOWN_TARGET). All blanks empty → UNANSWERED.
 * - Payload and spec must declare the same blank ids, otherwise the question is unmarkable (SPEC_INVALID).
 */
import {
  canonicalText,
  formatCorrectAnswer,
  isBlankText,
  normaliseAnswerText,
  parseNumberInput,
  withinTolerance,
  type FillInTheBlankPayload,
  type FillInTheBlankSpec,
  type ResponseFor,
} from "@/lib/questions";
import { buildResult, displayWeight, invalidSpec, itemWeights, unanswered } from "./result";
import type { ItemMarking, MarkingFeedback, MarkingResult } from "./types";

export interface FillInTheBlankMarkingInput {
  marks: number;
  payload: FillInTheBlankPayload;
  spec: FillInTheBlankSpec;
  response: ResponseFor<"FILL_IN_THE_BLANK"> | null;
}

type BlankSpec = FillInTheBlankSpec["blanks"][number];
type BlankInput = FillInTheBlankPayload["blanks"][number]["input"];

/** True when `given` satisfies one of the blank's accepted answers. */
export function blankMatches(given: string, input: BlankInput, spec: BlankSpec): boolean {
  const caseSensitive = spec.caseSensitive ?? false;
  if (input === "select") {
    const chosen = canonicalText(given);
    return spec.accepted.some((a) => {
      const accepted = canonicalText(a);
      return caseSensitive ? accepted === chosen : accepted.toLowerCase() === chosen.toLowerCase();
    });
  }
  if (input === "number") {
    const student = parseNumberInput(given);
    if (student.ok) {
      const tolerance = spec.tolerance !== undefined ? { kind: "absolute" as const, amount: spec.tolerance } : undefined;
      for (const a of spec.accepted) {
        const expected = parseNumberInput(a);
        if (expected.ok && withinTolerance(student.number.value, expected.number.value, tolerance)) return true;
      }
    }
  }
  const options = { caseSensitive, flags: spec.normalise ?? [] };
  const normalised = normaliseAnswerText(given, options);
  return spec.accepted.some((a) => normaliseAnswerText(a, options) === normalised);
}

/** Marks a FILL_IN_THE_BLANK response blank by blank. */
export function markFillInTheBlank({ marks, payload, spec, response }: FillInTheBlankMarkingInput): MarkingResult {
  const specById = new Map(spec.blanks.map((b) => [b.id, b]));
  if (payload.blanks.length !== spec.blanks.length || payload.blanks.some((b) => !specById.has(b.id))) return invalidSpec(marks);
  const display = formatCorrectAnswer("FILL_IN_THE_BLANK", payload, spec);

  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };
  const given = new Map<string, string>();
  for (const entry of response?.blanks ?? []) {
    if (!specById.has(entry.blankId)) {
      feedback.flags.push("UNKNOWN_TARGET");
      continue;
    }
    if (given.has(entry.blankId)) {
      feedback.flags.push("DUPLICATE_ENTRY");
      continue;
    }
    given.set(entry.blankId, entry.text);
  }
  if (payload.blanks.every((b) => isBlankText(given.get(b.id)))) return unanswered(marks, display);

  const weights = itemWeights(
    payload.blanks.map((b) => specById.get(b.id)?.marks),
    marks,
  );
  let raw = 0;
  feedback.items = payload.blanks.map<ItemMarking>((blank, index) => {
    const blankSpec = specById.get(blank.id) as BlankSpec;
    const text = given.get(blank.id) ?? "";
    const weight = weights[index] ?? 0;
    const correct = !isBlankText(text) && blankMatches(text, blank.input, blankSpec);
    if (correct) raw += weight;
    return {
      id: blank.id,
      correct,
      awarded: displayWeight(correct ? weight : 0),
      maxMarks: displayWeight(weight),
      expected: blankSpec.accepted[0] ?? null,
      given: text === "" ? null : text,
    };
  });
  const correctCount = feedback.items.filter((i) => i.correct).length;
  if (correctCount > 0 && correctCount < payload.blanks.length) feedback.flags.push("PARTIAL_ANSWER");
  return buildResult("MARKED", raw, marks, feedback);
}
