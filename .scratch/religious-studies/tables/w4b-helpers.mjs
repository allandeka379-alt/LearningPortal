// W4b helper shortcuts for slice files (not a slice: lives in tables/).
import { P, levels } from "../lib.mjs";

/** Single-answer MCQ with the key first (the build rebalances answer positions). key/bad entries are [content, rationale]. */
export function mc(b, d, skill, stem, key, bad, explanation, extra = {}) {
  return b.mcq({ d, skill, stem, options: [key, ...bad], answer: "A", explanation, hints: extra.hints, daily: extra.daily });
}
/** Same for a part inside b.struct(). */
export function pmc(label, stem, key, bad, explanation) {
  return P.mcq({ label, stem, options: [key, ...bad], answer: "A", explanation });
}
/** Self-marked short item: points are strings (1 mark) or [text, marks]. */
export function ms(b, d, skill, marks, stem, points, modelAnswer, explanation, hints) {
  return b.manualShort({ d, skill, marks, stem, points, modelAnswer, explanation, hints });
}
/** Part-level self-marked extended response for exam items (15 or 10 marks). */
export function ex(label, marks, stem, points, modelAnswer, explanation, wordMax = 400) {
  const o = { label, marks, type: "EXTENDED_RESPONSE", wordLimit: { max: wordMax }, stem, points, modelAnswer, explanation };
  if (label === "(b)") o.levels = levels(10);
  return P.manual(o);
}
