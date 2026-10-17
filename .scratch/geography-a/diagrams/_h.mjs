// Shared helpers for the geography-a diagram scripts (own file; the shared kit is untouched).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "geography-a";
export const C = D.C;
export const lesson = (p) => `content/subjects/${FAMILY}/lessons/${p}.md`;
/** Draw, save and place one figure. */
export async function make(name, w, h, body, alt, cap, lessonPath, after) {
  await D.figure(FAMILY, name, D.svg(w, h, body), { alt, caption: cap });
  const placed = D.insertAfter(lesson(lessonPath), after, D.md(name, alt, cap));
  console.log(name, placed ? "placed" : "already placed");
}
export const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 13, ...o });
export const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 13, ...o });
