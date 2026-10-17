// Shared helpers for the computer-science-o diagram scripts (logic gate symbols, labelled wires).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAM = "computer-science-o";
export const LESSONS = "content/subjects/computer-science-o/lessons";

/** Gate symbol with its top-left at (x, y); body 56 wide, 48 tall. Returns { svg, in: [pt...], out: pt }. */
export function gate(type, x, y, o = {}) {
  const w = 56, h = 48, st = { fill: "#fff", width: 2 };
  let body = "", outX = x + w, ins;
  const inset = type === "OR" || type === "NOR" || type === "XOR" ? 6 : 0;
  if (type === "NOT") {
    body = D.polyline([[x, y + 4], [x, y + h - 4], [x + 42, y + h / 2]], { ...st, close: true }) + D.circle(x + 47, y + h / 2, 5, st);
    outX = x + 52;
    ins = [[x, y + h / 2]];
  } else {
    if (type === "AND" || type === "NAND") body = D.path_(`M${x},${y} L${x + 28},${y} A24,24 0 0 1 ${x + 28},${y + h} L${x},${y + h} Z`, st);
    else body = D.path_(`M${x},${y} Q${x + 36},${y} ${x + w},${y + h / 2} Q${x + 36},${y + h} ${x},${y + h} Q${x + 14},${y + h / 2} ${x},${y} Z`, st);
    if (type === "XOR") body += D.path_(`M${x - 8},${y} Q${x + 6},${y + h / 2} ${x - 8},${y + h}`, { width: 2 });
    if (type === "NAND" || type === "NOR") { body += D.circle(x + w + 5, y + h / 2, 5, st); outX = x + w + 10; }
    ins = [[x - (type === "XOR" ? 8 : 0), y + 14], [x - (type === "XOR" ? 8 : 0), y + 34]];
    if (type === "OR" || type === "NOR" || type === "XOR") ins = [[x + 5 - (type === "XOR" ? 8 : 0), y + 14], [x + 5 - (type === "XOR" ? 8 : 0), y + 34]];
  }
  return { svg: body, in: ins, out: [outX, y + h / 2] };
}
/** Orthogonal wire through points. */
export const wire = (pts, o = {}) => D.polyline(pts, { width: 2, ...o });
export const dotAt = (x, y) => D.dot(x, y, { r: 4 });
/** Render + embed in one call. */
export async function fig(name, svgText, alt, caption, lesson, after) {
  await D.figure(FAM, name, svgText, { alt, caption });
  const done = D.insertAfter(`${LESSONS}/${lesson}.md`, after, D.md(name, alt, caption));
  console.log(name, done ? "inserted" : "already there");
}
export const inLabel = (name, x, y) => D.text(x, y + 5, name, { weight: 700, size: 15, anchor: "end" });
export const outLabel = (x, y, s = "X") => D.text(x, y + 5, s, { weight: 700, size: 16 });

/**
 * Simple table: rows = array of arrays (first row = header). widths per column. o.hi = Set of row indexes (body, 0-based) to
 * highlight, o.dim = Set of body rows to grey out, o.colFill = {colIndex: fill}, o.rh row height.
 */
export function table(x, y, widths, rows, o = {}) {
  const rh = o.rh ?? 28, size = o.size ?? 14;
  let s = "", yy = y;
  rows.forEach((r, i) => {
    let xx = x;
    r.forEach((cell, j) => {
      const head = i === 0;
      const hi = !head && o.hi?.has(i - 1), dim = !head && o.dim?.has(i - 1);
      const fill = head ? (o.headFill?.[j] ?? D.C.fillGrey) : hi ? D.C.fillAmber : dim ? "#ffffff" : (o.colFill?.[j] ?? "#ffffff");
      s += D.rect(xx, yy, widths[j], rh, { fill, stroke: D.C.axis, width: 1.2 });
      s += D.text(xx + widths[j] / 2, yy + rh / 2 + size * 0.35, String(cell), { anchor: "middle", size, weight: head ? 700 : undefined, fill: dim ? D.C.muted : undefined });
      xx += widths[j];
    });
    yy += rh;
  });
  return s;
}
