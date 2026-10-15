// W4a shared helpers for slices (a compact MCQ builder and a thousands formatter). Not a slice: lives in tables/.
export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** MCQ with the key first (the build rebalances answer positions): o = { ok: [text, rationale], bad: [[t, r] x3], ...rest }. */
export function mc(b, o) {
  const { ok, bad, ...rest } = o;
  if (bad.length !== 3) throw new Error(`mc: three distractors needed (${o.stem.slice(0, 40)})`);
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
