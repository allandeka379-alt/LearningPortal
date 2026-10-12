// Local shorthand for the w2a slices (kept in tables/ so the build does not import it as a slice).
// mc(b, d, skill, stem, [right, why], [[wrong, why], ...], explanation, extra) → a four-option MCQ whose key is first
// (the build rebalances the positions). pm(...) is the same for a part inside b.struct.
import { P } from "../lib.mjs";
export function mc(b, d, skill, stem, right, wrongs, explanation, extra = {}) {
  if (wrongs.length !== 3) throw new Error(`mc needs 3 distractors: ${stem.slice(0, 50)}`);
  return b.mcq({ d, skill, stem, options: [right, ...wrongs], answer: "A", explanation, ...extra });
}
export function pm(label, stem, right, wrongs, explanation, marks = 1) {
  if (wrongs.length !== 3) throw new Error(`pm needs 3 distractors: ${stem.slice(0, 50)}`);
  return P.mcq({ label, marks, stem, options: [right, ...wrongs], answer: "A", explanation });
}
