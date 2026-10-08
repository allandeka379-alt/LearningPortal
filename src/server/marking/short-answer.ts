/**
 * SHORT_ANSWER marking.
 *
 * Every comparison runs on normalised text (`normaliseAnswerText`: NFKC, invisible characters stripped, whitespace
 * collapsed, case-insensitive unless the spec says otherwise, plus the spec's `normalise` flags), applied identically
 * to the student's answer and the authored answers.
 *
 * Order of rules:
 *   1. blank answer → UNANSWERED;
 *   2. `rejected` answers (mark-scheme "reject" lines) → 0, final — even under AI-assisted marking;
 *   3. `accepted` answers (exact match after normalisation) → full marks, or the entry's own `marks` for a partially
 *      creditworthy answer;
 *   4. `patterns` (anchored, ReDoS-safe regexes; answers longer than 200 characters are not tested) → full marks;
 *   5. `keywords` → full marks when ALL `all` keywords and at least `minAny` (default 1) `any` keywords appear as whole
 *      words/phrases (a trailing `*` is a prefix: `evaporat*`);
 *   6. `rubric` points → partial credit: each point's marks when any of its phrases appears; capped at the question's
 *      marks.
 * The best credit from 3–6 is the deterministic award. Then by marking mode:
 *   - AUTO: MARKED with that award;
 *   - AI_ASSISTED: MARKED only when an exact accepted answer or a pattern gave full marks (cheap, certain); otherwise
 *     PENDING_AI with the deterministic award as the provisional lower bound (keywords and rubrics are fuzzy — "not
 *     oxygen" contains "oxygen" — so the model decides);
 *   - MANUAL: NEEDS_REVIEW with the deterministic award as a suggestion.
 */
import {
  containsKeyword,
  formatCorrectAnswer,
  isBlankText,
  normaliseAnswerText,
  prepareKeyword,
  testSafePattern,
  tokenize,
  type MarkingMode,
  type NormaliseFlag,
  type ResponseFor,
  type ShortAnswerSpec,
} from "@/lib/questions";
import { buildResult, unanswered, wholeMarks } from "./result";
import type { MarkingFeedback, MarkingResult, MatchedPoint } from "./types";

export interface ShortAnswerMarkingInput {
  marks: number;
  markingMode: MarkingMode;
  spec: ShortAnswerSpec;
  response: ResponseFor<"SHORT_ANSWER"> | null;
}

/** Marks a SHORT_ANSWER response (rule order and marking modes in the module header). */
export function markShortAnswer({ marks, markingMode, spec, response }: ShortAnswerMarkingInput): MarkingResult {
  const display = formatCorrectAnswer("SHORT_ANSWER", null, spec);
  const text = response?.text ?? "";
  if (isBlankText(text)) return unanswered(marks, display);

  const flags: readonly NormaliseFlag[] = spec.normalise ?? [];
  const specCase = spec.caseSensitive ?? false;
  const memo = new Map<string, string>();
  const norm = (value: string, caseSensitive: boolean) => {
    const key = `${caseSensitive ? 1 : 0}${value}`;
    let out = memo.get(key);
    if (out === undefined) {
      out = normaliseAnswerText(value, { caseSensitive, flags });
      memo.set(key, out);
    }
    return out;
  };
  const feedback: MarkingFeedback = { correctAnswerDisplay: display, notes: [], flags: [] };

  // 2. Rejected answers are final, whatever the marking mode.
  for (const rejected of spec.rejected ?? []) {
    if (norm(text, specCase) === norm(rejected.value, specCase)) {
      feedback.flags.push("REJECTED_ANSWER");
      if (rejected.feedback !== undefined) feedback.responseFeedback = rejected.feedback;
      return buildResult(markingMode === "MANUAL" ? "NEEDS_REVIEW" : "MARKED", 0, marks, feedback, markingMode === "MANUAL" ? marks : 0);
    }
  }

  let award = 0;
  let certainFull = false;

  // 3. Accepted answers.
  for (const accepted of spec.accepted) {
    const caseSensitive = accepted.caseSensitive ?? false;
    if (norm(text, caseSensitive) !== norm(accepted.value, caseSensitive)) continue;
    const value = Math.min(accepted.marks ?? marks, marks);
    if (value > award) {
      award = value;
      if (accepted.feedback !== undefined) feedback.responseFeedback = accepted.feedback;
      else delete feedback.responseFeedback;
    }
    if (value >= marks) certainFull = true;
  }
  if (award > 0 && award < marks) feedback.flags.push("PARTIAL_ANSWER");

  // 4. Patterns.
  if (!certainFull && spec.patterns) {
    const subject = norm(text, specCase);
    for (const pattern of spec.patterns) {
      const outcome = testSafePattern(subject, pattern, specCase);
      if (outcome === "skipped") feedback.flags.push("PATTERN_SKIPPED");
      if (outcome === true) {
        award = marks;
        certainFull = true;
        break;
      }
    }
  }

  // 5–6. Keywords and rubric work on whole-word tokens (never with whitespace removed).
  const tokenFlags = flags.filter((f) => f !== "remove_whitespace");
  const tokens = tokenize(normaliseAnswerText(text, { caseSensitive: specCase, flags: tokenFlags }));
  const has = (phrase: string) => {
    const keyword = prepareKeyword(phrase, { caseSensitive: specCase, flags: tokenFlags });
    return keyword !== null && containsKeyword(tokens, keyword);
  };

  if (!certainFull && spec.keywords) {
    const all = spec.keywords.all ?? [];
    const any = spec.keywords.any ?? [];
    const allOk = all.every(has);
    const anyOk = any.length === 0 || any.filter(has).length >= (spec.keywords.minAny ?? 1);
    if (allOk && anyOk) {
      award = marks;
      feedback.flags.push("KEYWORD_MATCH");
    }
  }

  if (spec.rubric) {
    const points: MatchedPoint[] = spec.rubric.map((point) => {
      const hit = point.anyOf.find(has);
      return {
        pointId: point.id,
        description: point.description ?? null,
        maxMarks: point.marks,
        awarded: hit !== undefined ? point.marks : 0,
        evidence: hit ?? null,
      };
    });
    feedback.matchedPoints = points;
    const rubricAward = wholeMarks(points.reduce((sum, p) => sum + (p.awarded ?? 0), 0), marks);
    if (rubricAward > award) {
      award = rubricAward;
      if (rubricAward < marks) feedback.flags.push("RUBRIC_PARTIAL");
    }
  }

  if (markingMode === "MANUAL") {
    feedback.flags.push("MANUAL_REVIEW");
    feedback.notes.push("Your teacher will mark this answer.");
    return buildResult("NEEDS_REVIEW", award, marks, feedback, marks - award);
  }
  if (markingMode === "AI_ASSISTED" && !certainFull) {
    feedback.flags.push("AI_REQUIRED");
    if (feedback.matchedPoints) feedback.matchedPoints = feedback.matchedPoints.map((p) => (p.awarded === 0 ? { ...p, awarded: null } : p));
    return buildResult("PENDING_AI", award, marks, feedback, marks - award);
  }
  return buildResult("MARKED", award, marks, feedback);
}
