// Local helpers for the economics-o diagram scripts (the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "economics-o";
export const LESSONS = `content/subjects/${FAMILY}/lessons`;
export const lesson = (p) => `${LESSONS}/${p}.md`;
export const { C } = D;
/** Bold curve label at data point. */
export const lab = (ax, x, y, s, o = {}) => ax.label(x, y, s, { weight: 700, ...o });
/** Polyline through data points with a dot on each. */
export const dotted = (ax, pts, o = {}) => ax.line(pts, o) + pts.map(([a, b]) => ax.point(a, b, { stroke: o.stroke ?? C.blue, r: 3.5 })).join("");
/** Write the figure and insert it after the anchor. */
export async function put(name, svg, alt, caption, lessonPath, anchor) {
  await D.figure(FAMILY, name, svg, { alt, caption });
  D.insertAfter(lesson(lessonPath), anchor, D.md(name, alt, caption));
  console.log("ok", name);
}
/** Straight line y = a + b x between x endpoints, returned as two data points. */
export const seg = (f, x0, x1) => [[x0, f(x0)], [x1, f(x1)]];
