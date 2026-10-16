// W2b helpers for slices and table scripts.
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
