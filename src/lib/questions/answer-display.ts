/**
 * Human-readable "correct answer" strings (§10 "show the correct answer"). Plain text built from authored values; it
 * may contain inline markdown/LaTeX from authored content, so render it with the inline content pipeline (or as plain
 * text) — never as raw HTML. Only shown AFTER an answer is submitted.
 */
import type { QuestionType } from "./constants";
import type { AnswerSpecMap } from "./answer-spec";
import type { QuestionPayloadMap } from "./payload";
import type { QuestionOptionRecord } from "./types";

/** `1.5e-7` → `1.5×10^-7`; plain numbers unchanged. */
function exponentToTimesTen(text: string): string {
  const m = /^(-?[\d.]+)e([+-]\d+)$/.exec(text);
  if (!m) return text;
  const exponent = Number(m[2]);
  return `${m[1]}×10^${exponent}`;
}

/**
 * Formats an expected numeric value the way the question asks for it: to `decimalPlaces`, else to the minimum
 * significant figures, else JavaScript's shortest round-trip form of the value rounded to 12 significant figures
 * (so floating-point noise in authored values, e.g. 93.60000000000001 from 0.72 × 130, shows as 93.6). Very
 * large/small values use `×10^n`.
 */
export function formatExpectedNumber(value: number, precision: { sigFigs?: { min?: number; max?: number }; decimalPlaces?: number } = {}): string {
  if (!Number.isFinite(value)) return String(value);
  if (precision.decimalPlaces !== undefined && Math.abs(value) < 1e15) return value.toFixed(precision.decimalPlaces);
  const sf = precision.sigFigs?.min ?? precision.sigFigs?.max;
  if (sf !== undefined) return exponentToTimesTen(value.toPrecision(sf));
  const clean = Number(value.toPrecision(12));
  return exponentToTimesTen(String(clean === 0 ? 0 : clean));
}

/** Sorted correct option keys (by sortOrder, then key). */
export function correctOptionKeys(options: readonly QuestionOptionRecord[]): string[] {
  return [...options]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
    .filter((o) => o.isCorrect)
    .map((o) => o.key);
}

/**
 * The correct answer of a (non-STRUCTURED) question as display text, from its PARSED payload and answer spec (the
 * outputs of `parseQuestionPayload(type, …)` / `parseAnswerSpec(type, …)` for the same `type`).
 * Returns null for open responses (essay / extended response: the model answer and mark scheme are revealed instead)
 * and when nothing deterministic can be shown (a short answer marked by mark scheme only).
 */
export function formatCorrectAnswer(
  type: QuestionType,
  payload: unknown,
  spec: unknown,
  options: readonly QuestionOptionRecord[] = [],
): string | null {
  switch (type) {
    case "MULTIPLE_CHOICE": {
      const keys = correctOptionKeys(options);
      return keys.length > 0 ? keys.join(", ") : null;
    }
    case "TRUE_FALSE": {
      const p = payload as QuestionPayloadMap["TRUE_FALSE"];
      const s = spec as AnswerSpecMap["TRUE_FALSE"];
      if (p.statementStyle === "yes_no") return s.correct ? "Yes" : "No";
      return s.correct ? "True" : "False";
    }
    case "SHORT_ANSWER": {
      const s = spec as AnswerSpecMap["SHORT_ANSWER"];
      const best = s.accepted.find((a) => a.marks === undefined) ?? s.accepted[0];
      return best ? best.value : null;
    }
    case "NUMERICAL":
    case "CALCULATION": {
      const s = spec as AnswerSpecMap["NUMERICAL"];
      const number = formatExpectedNumber(s.value, s);
      const unit = s.units?.accepted[0];
      return unit ? `${number} ${unit}` : number;
    }
    case "MATCHING": {
      const p = payload as QuestionPayloadMap["MATCHING"];
      const s = spec as AnswerSpecMap["MATCHING"];
      const right = new Map(p.right.map((r) => [r.id, r.content]));
      const lines: string[] = [];
      for (const left of p.left) {
        const pair = s.pairs.find((x) => x.leftId === left.id);
        if (pair) lines.push(`${left.content} → ${right.get(pair.rightId) ?? pair.rightId}`);
      }
      return lines.length > 0 ? lines.join("; ") : null;
    }
    case "FILL_IN_THE_BLANK": {
      const p = payload as QuestionPayloadMap["FILL_IN_THE_BLANK"];
      const s = spec as AnswerSpecMap["FILL_IN_THE_BLANK"];
      const byId = new Map(s.blanks.map((b) => [b.id, b]));
      const parts = p.blanks.map((blank, index) => `(${index + 1}) ${byId.get(blank.id)?.accepted[0] ?? "—"}`);
      return parts.join(" ");
    }
    case "DIAGRAM_LABELLING": {
      const p = payload as QuestionPayloadMap["DIAGRAM_LABELLING"];
      const s = spec as AnswerSpecMap["DIAGRAM_LABELLING"];
      const labels = new Map((p.labels ?? []).map((l) => [l.id, l.text]));
      const byHotspot = new Map(s.hotspots.map((h) => [h.hotspotId, h]));
      return p.hotspots
        .map((hotspot, index) => {
          const h = byHotspot.get(hotspot.id);
          const text = (h?.labelId !== undefined ? labels.get(h.labelId) : undefined) ?? h?.accepted?.[0] ?? "—";
          return `${index + 1}: ${text}`;
        })
        .join("; ");
    }
    default:
      return null;
  }
}
