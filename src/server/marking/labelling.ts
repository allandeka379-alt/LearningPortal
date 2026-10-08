/**
 * DIAGRAM_LABELLING marking: each hotspot is marked on its own and the credit is summed.
 *
 * Policies:
 * - Word-bank mode (payload `labels`): a hotspot is correct when the chosen label is its `labelId` or one of its
 *   `alternativeLabelIds`, or when the chosen label's TEXT is one of its `accepted` texts (two bank entries with the
 *   same wording are interchangeable). A label may be used on several hotspots.
 * - Free-text mode (no word bank) and typed labels: normalised comparison (NFKC, whitespace, case-insensitive unless
 *   `caseSensitive`) against `accepted` and the texts of the correct bank labels.
 * - Weights as for blanks: a hotspot's own `marks`, else an equal share of the rest; floored to whole marks.
 * - Duplicate entries for a hotspot: the first is marked (DUPLICATE_ENTRY); unknown targets/labels are ignored
 *   (UNKNOWN_TARGET). Nothing labelled → UNANSWERED. Payload/spec hotspot mismatch → SPEC_INVALID.
 */
import {
  formatCorrectAnswer,
  isBlankText,
  normaliseAnswerText,
  type DiagramLabellingPayload,
  type DiagramLabellingSpec,
  type ResponseFor,
} from "@/lib/questions";
import { buildResult, displayWeight, invalidSpec, itemWeights, unanswered } from "./result";
import type { ItemMarking, MarkingFeedback, MarkingResult } from "./types";

export interface DiagramLabellingMarkingInput {
  marks: number;
  payload: DiagramLabellingPayload;
  spec: DiagramLabellingSpec;
  response: ResponseFor<"DIAGRAM_LABELLING"> | null;
}

/** Marks a DIAGRAM_LABELLING response hotspot by hotspot. */
export function markDiagramLabelling({ marks, payload, spec, response }: DiagramLabellingMarkingInput): MarkingResult {
  const specById = new Map(spec.hotspots.map((h) => [h.hotspotId, h]));
  if (payload.hotspots.length !== spec.hotspots.length || payload.hotspots.some((h) => !specById.has(h.id))) return invalidSpec(marks);
  const display = formatCorrectAnswer("DIAGRAM_LABELLING", payload, spec);
  const bank = new Map((payload.labels ?? []).map((l) => [l.id, l.text]));

  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };
  const given = new Map<string, { labelId?: string; text?: string }>();
  for (const entry of response?.labels ?? []) {
    if (!specById.has(entry.targetId) || (entry.labelId !== undefined && !bank.has(entry.labelId))) {
      feedback.flags.push("UNKNOWN_TARGET");
      continue;
    }
    if (entry.labelId === undefined && isBlankText(entry.text)) continue;
    if (given.has(entry.targetId)) {
      feedback.flags.push("DUPLICATE_ENTRY");
      continue;
    }
    given.set(entry.targetId, entry);
  }
  if (given.size === 0) return unanswered(marks, display);

  const weights = itemWeights(
    payload.hotspots.map((h) => specById.get(h.id)?.marks),
    marks,
  );
  let raw = 0;
  feedback.items = payload.hotspots.map<ItemMarking>((hotspot, index) => {
    const h = specById.get(hotspot.id) as DiagramLabellingSpec["hotspots"][number];
    const options = { caseSensitive: h.caseSensitive ?? false };
    const correctIds = new Set([...(h.labelId !== undefined ? [h.labelId] : []), ...(h.alternativeLabelIds ?? [])]);
    const acceptedTexts = [...(h.accepted ?? []), ...[...correctIds].map((id) => bank.get(id)).filter((t): t is string => t !== undefined)];
    const acceptedNormalised = new Set(acceptedTexts.map((t) => normaliseAnswerText(t, options)));
    const entry = given.get(hotspot.id);
    const givenText = entry?.labelId !== undefined ? (bank.get(entry.labelId) ?? null) : (entry?.text ?? null);
    let correct = false;
    if (entry?.labelId !== undefined) correct = correctIds.has(entry.labelId) || (givenText !== null && acceptedNormalised.has(normaliseAnswerText(givenText, options)));
    else if (givenText !== null) correct = acceptedNormalised.has(normaliseAnswerText(givenText, options));
    const weight = weights[index] ?? 0;
    if (correct) raw += weight;
    return {
      id: hotspot.id,
      correct,
      awarded: displayWeight(correct ? weight : 0),
      maxMarks: displayWeight(weight),
      expected: acceptedTexts[0] ?? null,
      given: givenText,
    };
  });
  const correctCount = feedback.items.filter((i) => i.correct).length;
  if (correctCount > 0 && correctCount < payload.hotspots.length) feedback.flags.push("PARTIAL_ANSWER");
  return buildResult("MARKED", raw, marks, feedback);
}
