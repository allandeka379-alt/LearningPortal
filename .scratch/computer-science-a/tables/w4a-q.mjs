// Local shorthand for the w4a slices (in tables/ so the build does not import it as a slice).
import { P, codeBlock, mdTable } from "../lib.mjs";
export function mc(b, d, skill, stem, right, wrongs, explanation, extra = {}) {
  if (wrongs.length !== 3) throw new Error(`mc needs 3 distractors: ${stem.slice(0, 50)}`);
  return b.mcq({ d, skill, stem, options: [right, ...wrongs], answer: "A", explanation, ...extra });
}
export function pm(label, stem, right, wrongs, explanation, marks = 1) {
  if (wrongs.length !== 3) throw new Error(`pm needs 3 distractors: ${stem.slice(0, 50)}`);
  const w = (x) => (Array.isArray(x) ? x : [x, undefined]);
  return P.mcq({ label, marks, stem, options: [right, ...wrongs].map(w), answer: "A", explanation });
}
export const code = (s) => codeBlock(s);
export const py_ = (s) => codeBlock(s, "python");
export { mdTable };
