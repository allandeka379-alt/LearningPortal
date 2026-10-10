// W2b helper shortcuts for slice files (not a slice: lives in tables/).
import { P, levels } from "../lib.mjs";

/** Single-answer MCQ with the key first (the build rebalances answer positions). key/bad entries are [content, rationale]. */
export function mc(b, d, skill, stem, key, bad, explanation, extra = {}) {
  return b.mcq({ d, skill, stem, options: [key, ...bad], answer: "A", explanation, hints: extra.hints, daily: extra.daily });
}
/** Self-marked short part: points are strings (1 mark) or [text, marks]. */
export function ms(b, d, skill, marks, stem, points, modelAnswer, explanation, hints) {
  // More 1-mark strings than marks: the extras become alternatives to the last point ("or ...").
  if (points.every((p) => typeof p === "string") && points.length > marks) {
    points = [...points.slice(0, marks - 1), points.slice(marks - 1).join(" / or: ")];
  }
  return b.manualShort({ d, skill, marks, stem, points, modelAnswer, explanation, hints });
}
/** Part-level self-marked extended response for exam items (15 or 10 marks). */
export function ex(label, marks, stem, points, modelAnswer, explanation, wordMax = 400) {
  const o = { label, marks, type: "EXTENDED_RESPONSE", wordLimit: { max: wordMax }, stem, points, modelAnswer, explanation };
  if (label === "(b)") o.levels = levels(10);
  return P.manual(o);
}

/** P.manual that tolerates more 1-mark points than marks: the surplus points become alternatives to the last point. */
export function pm(o) {
  const norm = o.points.map((p) => (Array.isArray(p) ? p : [p, 1]));
  const total = norm.reduce((t, p) => t + p[1], 0);
  if (total > o.marks && norm.every((p) => p[1] === 1)) {
    const keep = o.marks - 1;
    const rest = norm.slice(keep).map((p) => p[0]).join(" / or: ");
    return P.manual({ ...o, points: [...norm.slice(0, keep), [rest, 1]] });
  }
  return P.manual(o);
}
