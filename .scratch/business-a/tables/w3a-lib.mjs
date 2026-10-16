// W3a helpers for slices and table scripts.
/** Shorthand MCQ: ok = [content, rationale]; bad = three [content, rationale]. Key placed first (the build rebalances). */
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
/** Part-level MCQ for structured items. */
export function pmc(P, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("pmc needs three distractors: " + rest.stem);
  return P.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
export const LV8 = [[1, 1, 3, "Limited knowledge; points are stated or only partly explained"], [2, 4, 6, "Good analysis; points explained and applied to the context"], [3, 7, 8, "Developed, accurate analysis with clear chains of reasoning applied to the context"]];
export const LV12 = [[1, 1, 4, "Mostly assertion or description; one-sided; limited or no judgement"], [2, 5, 8, "Some balance and application; a judgement that is not fully supported"], [3, 9, 12, "Balanced arguments applied to the context and a supported judgement that considers conditions or a time-frame"]];
export const LV10 = [[1, 1, 3, "Description or assertion with little development; no judgement"], [2, 4, 7, "Some balanced, applied arguments; a judgement that is only partly supported"], [3, 8, 10, "Balanced, applied arguments and a justified judgement or recommendation"]];
export const LV15 = [[1, 1, 5, "Description or assertion; little application; no or unsupported judgement"], [2, 6, 10, "Some balanced, applied discussion; a judgement that is only partly supported"], [3, 11, 15, "Balanced, well-applied discussion with a justified conclusion that weighs the arguments"]];
export const LV6 = [[1, 1, 2, "Assertion; little development or judgement"], [2, 3, 4, "Developed points with some application; a limited judgement"], [3, 5, 6, "Balanced, applied points and a justified judgement"]];
