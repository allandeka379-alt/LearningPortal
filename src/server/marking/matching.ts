/**
 * MATCHING marking: one scoring unit per left item that has a correct pair.
 *
 * Policies:
 * - A left item is correct when the student paired it with one of its acceptable right items (the spec may list a
 *   left id several times to accept alternatives). A left item paired with several different right items is wrong
 *   (DUPLICATE_ENTRY): hedging never pays. Pairs naming unknown ids are ignored (UNKNOWN_TARGET).
 * - Marks: `marksPerPair` × correct items (capped at the question's marks) when set; otherwise marks × correct /
 *   items, floored to whole marks.
 * - No valid pair → UNANSWERED.
 */
import { formatCorrectAnswer, type MatchingPayload, type MatchingSpec, type ResponseFor } from "@/lib/questions";
import { buildResult, displayWeight, invalidSpec, unanswered } from "./result";
import type { ItemMarking, MarkingFeedback, MarkingResult } from "./types";

export interface MatchingMarkingInput {
  marks: number;
  payload: MatchingPayload;
  spec: MatchingSpec;
  response: ResponseFor<"MATCHING"> | null;
}

/** Marks a MATCHING response pair by pair. */
export function markMatching({ marks, payload, spec, response }: MatchingMarkingInput): MarkingResult {
  const display = formatCorrectAnswer("MATCHING", payload, spec);
  const leftIds = new Set(payload.left.map((l) => l.id));
  const rightIds = new Set(payload.right.map((r) => r.id));
  const rightContent = new Map(payload.right.map((r) => [r.id, r.content]));
  const acceptable = new Map<string, Set<string>>();
  for (const pair of spec.pairs) {
    if (!leftIds.has(pair.leftId) || !rightIds.has(pair.rightId)) continue;
    const set = acceptable.get(pair.leftId) ?? new Set<string>();
    set.add(pair.rightId);
    acceptable.set(pair.leftId, set);
  }
  const units = payload.left.filter((l) => acceptable.has(l.id));
  if (units.length === 0) return invalidSpec(marks);

  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };
  const chosen = new Map<string, Set<string>>();
  for (const pair of response?.pairs ?? []) {
    if (!leftIds.has(pair.leftId) || !rightIds.has(pair.rightId)) {
      feedback.flags.push("UNKNOWN_TARGET");
      continue;
    }
    const set = chosen.get(pair.leftId) ?? new Set<string>();
    set.add(pair.rightId);
    chosen.set(pair.leftId, set);
  }
  if (chosen.size === 0) return unanswered(marks, display);

  const perItem = spec.marksPerPair ?? marks / units.length;
  let correctCount = 0;
  feedback.items = units.map<ItemMarking>((left) => {
    const picks = chosen.get(left.id);
    if (picks && picks.size > 1) feedback.flags.push("DUPLICATE_ENTRY");
    const pick = picks && picks.size === 1 ? ([...picks][0] as string) : null;
    const accepted = acceptable.get(left.id) as Set<string>;
    const correct = pick !== null && accepted.has(pick);
    if (correct) correctCount += 1;
    const firstAccepted = [...accepted][0] as string;
    return {
      id: left.id,
      correct,
      awarded: displayWeight(correct ? perItem : 0),
      maxMarks: displayWeight(perItem),
      expected: rightContent.get(firstAccepted) ?? firstAccepted,
      given: pick === null ? null : (rightContent.get(pick) ?? pick),
    };
  });
  if (correctCount > 0 && correctCount < units.length) feedback.flags.push("PARTIAL_ANSWER");
  return buildResult("MARKED", Math.min(marks, correctCount * perItem), marks, feedback);
}
