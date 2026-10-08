/**
 * STRUCTURED marking: recurse into the parts and aggregate (§13 structured questions; ARCHITECTURE §4.5).
 *
 * - The root response is a flat list of `{ partId, … }` entries for LEAF parts at any depth; each entry is converted
 *   to the part's typed response (`partEntryToResponse`). An entry that cannot express an answer for its part's type
 *   counts as no answer for that part (RESPONSE_TYPE_MISMATCH). Duplicate entries: the first wins (DUPLICATE_ENTRY);
 *   entries for unknown parts are ignored (UNKNOWN_TARGET).
 * - Parts may be STRUCTURED themselves one level down ("(b)(i)"); deeper nesting is unmarkable (DEPTH_EXCEEDED).
 * - Each part is marked by its own type and marking mode, so a question can mix auto-marked and AI-marked parts.
 * - Aggregation: marks = Σ part marks; status = UNANSWERED if every part is unanswered, else PENDING_AI if any part
 *   awaits AI (the ai.mark job uses `perPart` to find its parts and must keep human-review parts in review), else
 *   NEEDS_REVIEW if any part needs a human, else MARKED (unanswered parts score 0). If the parts' marks do not add up
 *   to the root's marks (an authoring error) the total is scaled to the root's marks and flagged MARKS_MISMATCH.
 */
import { partEntryToResponse, type ResponseFor, type StructuredPartEntry } from "@/lib/questions";
import { buildResult, invalidSpec, unanswered } from "./result";
import type { MarkingFeedback, MarkingFlag, MarkingPartInput, MarkingResult, PartMarking } from "./types";

/** Root (0) → part (1) → sub-part (2). */
export const MAX_STRUCTURE_DEPTH = 2;

export interface StructuredMarkingInput {
  marks: number;
  parts: readonly MarkingPartInput[];
  response: ResponseFor<"STRUCTURED"> | null;
  /** Depth of this STRUCTURED question (0 for a root). */
  depth: number;
  /** Marks one child: a leaf with its own typed response, or a nested STRUCTURED part with the root response. */
  markChild: (part: MarkingPartInput, response: unknown, depth: number) => MarkingResult;
}

function leafIds(parts: readonly MarkingPartInput[], into: Set<string>): Set<string> {
  for (const part of parts) {
    if (part.type === "STRUCTURED") leafIds(part.parts ?? [], into);
    else into.add(part.id);
  }
  return into;
}

/** Marks a STRUCTURED response by marking each part with `markChild` and aggregating (module header). */
export function markStructured({ marks, parts, response, depth, markChild }: StructuredMarkingInput): MarkingResult {
  if (parts.length === 0) return invalidSpec(marks);
  const flags: MarkingFlag[] = [];
  const entries = new Map<string, StructuredPartEntry>();
  for (const entry of response?.parts ?? []) {
    if (entries.has(entry.partId)) flags.push("DUPLICATE_ENTRY");
    else entries.set(entry.partId, entry);
  }
  if (depth === 0) {
    const known = leafIds(parts, new Set());
    if ([...entries.keys()].some((id) => !known.has(id))) flags.push("UNKNOWN_TARGET");
  }

  const ordered = [...parts].sort((a, b) => (a.partOrder ?? 0) - (b.partOrder ?? 0));
  const perPart: PartMarking[] = ordered.map((part) => {
    let result: MarkingResult;
    if (part.type === "STRUCTURED") {
      if (depth + 1 >= MAX_STRUCTURE_DEPTH) {
        const invalid = invalidSpec(part.marks);
        result = { ...invalid, feedback: { ...invalid.feedback, flags: [...invalid.feedback.flags, "DEPTH_EXCEEDED"] } };
      } else {
        result = markChild(part, response, depth + 1);
      }
    } else {
      const entry = entries.get(part.id);
      const partResponse = entry ? partEntryToResponse(entry, part.type) : null;
      if (entry && partResponse === null) flags.push("RESPONSE_TYPE_MISMATCH");
      result = markChild(part, partResponse, depth + 1);
    }
    return { partId: part.id, partLabel: part.partLabel ?? null, type: part.type, result };
  });

  const results = perPart.map((p) => p.result);
  const partsMax = ordered.reduce((sum, p) => sum + p.marks, 0);
  const awarded = results.reduce((sum, r) => sum + r.marksAwarded, 0);
  const pending = results.reduce((sum, r) => sum + r.pendingMarks, 0);
  for (const r of results) flags.push(...r.feedback.flags);

  if (results.every((r) => r.status === "UNANSWERED")) {
    const empty = unanswered(marks, null);
    return { ...empty, feedback: { ...empty.feedback, perPart, flags: [...new Set(flags)] } };
  }

  let scale = 1;
  if (partsMax !== marks && partsMax > 0) {
    scale = marks / partsMax;
    flags.push("MARKS_MISMATCH");
  }
  const status = results.some((r) => r.status === "PENDING_AI")
    ? "PENDING_AI"
    : results.some((r) => r.status === "NEEDS_REVIEW")
      ? "NEEDS_REVIEW"
      : "MARKED";
  const feedback: MarkingFeedback = { correctAnswerDisplay: null, perPart, notes: [], flags };
  return buildResult(status, awarded * scale, marks, feedback, pending * scale);
}
