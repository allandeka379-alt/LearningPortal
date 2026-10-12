// Shared helpers for chemistry-o diagrams. Not part of the kit.
import * as D from "../../tools/diagram-kit.mjs";
export const F = "chemistry-o";
export const L = `content/subjects/${F}/lessons`;
export const { C } = D;
export const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
export const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  if (lesson) D.insertAfter(`${L}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
export const rot = (a, cx, cy, body) => `<g transform="rotate(${a} ${cx} ${cy})">${body}</g>`;
export const GLASS = "#9fb6bf";
export const WATER = "#d6ecf5";
/** open-top beaker: x,y top-left, w,h, liquid height lh */
export const beaker = (x, y, w, h, lh = 0, fill = WATER) =>
  (lh ? D.rect(x + 1, y + h - lh, w - 2, lh - 1, { fill, stroke: "none" }) : "") +
  D.polyline([[x - 4, y - 2], [x, y], [x, y + h], [x + w, y + h], [x + w, y], [x + w + 4, y - 2]], { stroke: C.axis, width: 2 });
/** conical flask: centre cx, top y, neck half-width nw, body half-width bw, neck height nh, total h, liquid level ly (y px of surface) */
export const conical = (cx, y, nw, bw, nh, h, ly, fill = WATER) => {
  const body = [[cx - nw, y], [cx - nw, y + nh], [cx - bw, y + h], [cx + bw, y + h], [cx + nw, y + nh], [cx + nw, y]];
  let s = "";
  if (ly !== undefined) {
    // clip liquid to the flask shape
    const id = `cf${Math.round(cx)}${Math.round(y)}`;
    s += `<clipPath id="${id}"><path d="M${body.map((p) => p.join(",")).join(" L")} Z"/></clipPath><rect x="${cx - bw}" y="${ly}" width="${bw * 2}" height="${y + h - ly}" fill="${fill}" clip-path="url(#${id})"/>`;
  }
  return s + D.polyline(body, { stroke: C.axis, width: 2 });
};
/** round-bottomed flask centre cx, centre cy, radius r, neck half-width nw, neck top y; liquid fill fraction from bottom */
export const roundFlask = (cx, cy, r, nw, topY, level = 0.45, fill = WATER) => {
  const a = Math.asin(nw / r), yN = cy - r * Math.cos(a);
  const id = `rf${Math.round(cx)}${Math.round(cy)}`;
  const d = `M${cx - nw},${topY} L${cx - nw},${yN} A${r},${r} 0 1 0 ${cx + nw},${yN} L${cx + nw},${topY}`;
  const ly = cy + r - 2 * r * level;
  return `<clipPath id="${id}"><path d="${d} Z"/></clipPath><rect x="${cx - r}" y="${ly}" width="${2 * r}" height="${cy + r - ly}" fill="${fill}" clip-path="url(#${id})"/>` + D.path_(d, { stroke: C.axis, width: 2 });
};
/** test tube vertical: x centre, top y, w, h */
export const tube = (cx, y, w, h, lh = 0, fill = WATER) =>
  (lh ? `<path d="M${cx - w / 2 + 1},${y + h - lh} L${cx + w / 2 - 1},${y + h - lh} L${cx + w / 2 - 1},${y + h - w / 2} A${w / 2 - 1},${w / 2 - 1} 0 0 1 ${cx - w / 2 + 1},${y + h - w / 2} Z" fill="${fill}"/>` : "") +
  D.path_(`M${cx - w / 2},${y} L${cx - w / 2},${y + h - w / 2} A${w / 2},${w / 2} 0 0 0 ${cx + w / 2},${y + h - w / 2} L${cx + w / 2},${y}`, { stroke: C.axis, width: 2 });
/** Liebig condenser drawn along +x from (x0,y0), length len, rotated by angle; labels for water in/out */
export const condenser = (x0, y0, len, ang, o = {}) => {
  const hw = 20;
  let s = D.rect(x0, y0 - hw, len, 2 * hw, { fill: o.fill ?? "#eaf5fa", stroke: C.axis, width: 2 }) +
    D.line(x0 - 30, y0 - 7, x0 + len + 30, y0 - 7, { stroke: C.axis, width: 1.6 }) + D.line(x0 - 30, y0 + 7, x0 + len + 30, y0 + 7, { stroke: C.axis, width: 1.6 }) +
    D.rect(x0 - 30, y0 - 7, 30, 14, { fill: "#fff", stroke: "none" }) + D.rect(x0 + len, y0 - 7, 30, 14, { fill: "#fff", stroke: "none" }) +
    D.line(x0 - 30, y0 - 7, x0, y0 - 7, { stroke: C.axis, width: 1.6 }) + D.line(x0 - 30, y0 + 7, x0, y0 + 7, { stroke: C.axis, width: 1.6 }) +
    D.line(x0 + len, y0 - 7, x0 + len + 30, y0 - 7, { stroke: C.axis, width: 1.6 }) + D.line(x0 + len, y0 + 7, x0 + len + 30, y0 + 7, { stroke: C.axis, width: 1.6 });
  // water stubs: out at top (left end), in at bottom (right end)
  s += D.line(x0 + 22, y0 - hw, x0 + 22, y0 - hw - 16, { stroke: C.axis, width: 2 }) + D.line(x0 + len - 22, y0 + hw, x0 + len - 22, y0 + hw + 16, { stroke: C.axis, width: 2 });
  return rot(ang, x0, y0, s);
};
export const rp = (x0, y0, ang, dx, dy) => { const a = (ang * Math.PI) / 180; return [x0 + dx * Math.cos(a) - dy * Math.sin(a), y0 + dx * Math.sin(a) + dy * Math.cos(a)]; };
