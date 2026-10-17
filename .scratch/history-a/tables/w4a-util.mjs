// Helper for w4a- slices (kept out of slices/ because the build imports every file there).
export const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
/** MCQ shorthand: ok = [text, rationale] is the key; no = [[text, rationale] x3]. The builder rebalances key positions. */
export function mc(b, { ok, no, ...rest }) {
  return b.mcq({ options: [ok, ...no], answer: "A", ...rest });
}
/** Chronology item: events listed in true order; the builder shows them in that order and asks for positions. */
export function chrono(b, events, rest) {
  return b.match({ stem: "Put these events in chronological order.", pairs: events, right: POS, rightIndex: [0, 1, 2, 3], ...rest });
}
