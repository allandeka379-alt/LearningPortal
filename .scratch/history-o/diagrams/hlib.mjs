// Shared helpers for the history diagram scripts (history-o and history-a): wrapped boxes, vertical timelines,
// factor diagrams. Pure drawing code on top of the shared kit; the kit itself is not modified.
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const C = D.C;
const CW = 7.1; // average character width at 14px Arial (bold slightly wider)

export function wrap(s, maxChars) {
  const out = [];
  for (const para of String(s).split("\n")) {
    let cur = "";
    for (const word of para.split(" ")) {
      if (cur && (cur + " " + word).length > maxChars) { out.push(cur); cur = word; }
      else cur = cur ? cur + " " + word : word;
    }
    out.push(cur);
  }
  return out;
}

/** Box with wrapped text. (x,y) top-left, width w. Returns { svg, x, y, w, h, cx, cy, top, bottom, left, right }. */
export function bx(x, y, w, label, o = {}) {
  const size = o.size ?? 14;
  const lines = wrap(label, Math.floor((w - 14) / (size * 0.5 * (o.bold ? 1.1 : 1) + 0.05 * size)));
  const lh = size * 1.25;
  const h = o.h ?? Math.max(o.minH ?? 34, lines.length * lh + 14);
  const fill = o.fill ?? C.fillBlue;
  const stroke = o.stroke ?? C.blue;
  const ty = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.35;
  const svg = D.rect(x, y, w, h, { fill, stroke, r: o.r ?? 8, width: o.width ?? 1.6 }) +
    D.text(x + w / 2, ty, lines.join("\n"), { anchor: "middle", size, weight: o.bold ? 700 : undefined, fill: o.color });
  return { svg, x, y, w, h, cx: x + w / 2, cy: y + h / 2, top: [x + w / 2, y], bottom: [x + w / 2, y + h], left: [x, y + h / 2], right: [x + w, y + h / 2] };
}
/** Arrow between two points (stroke ink unless given). */
export const arr = (a, b, o = {}) => D.arrow(a[0], a[1], b[0], b[1], { stroke: o.stroke ?? C.ink, width: o.width ?? 1.8, dash: o.dash });
export const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { stroke: o.stroke ?? C.axis, width: o.width ?? 1.6, dash: o.dash });

/** Vertical timeline. items: [{ d: date, t: text, hi?: true }]. Returns the full SVG string. */
export function timeline(items, o = {}) {
  const w = o.w ?? 560;
  const dateW = o.dateW ?? 112;
  const spine = dateW + 14;
  const textX = spine + 16;
  const maxChars = Math.floor((w - textX - 10) / 7.0);
  const dChars = Math.floor((dateW - 4) / 7.6);
  const top = o.title ? 40 : 14;
  let y = top;
  const rows = items.map((it) => {
    const tl = wrap(it.t, maxChars);
    const dl = wrap(it.d, dChars);
    const lines = Math.max(tl.length, dl.length);
    const h = Math.max(32, lines * 17.5 + 12);
    const r = { it, tl, dl, y, h };
    y += h;
    return r;
  });
  const h = y + 10;
  let body = "";
  if (o.title) body += D.text(w / 2, 26, o.title, { anchor: "middle", size: 16, weight: 700 });
  body += D.line(spine, top + 4, spine, y - 6, { stroke: C.axis, width: 2.2 });
  for (const r of rows) {
    const cy = r.y + 17;
    const hi = r.it.hi;
    body += D.circle(spine, cy, 6, { fill: hi ? C.amber : C.blue, stroke: hi ? C.amber : C.blue, width: 1 });
    body += D.text(dateW, cy + 5 - (r.dl.length - 1) * 8.75, r.dl.join("\n"), { anchor: "end", size: 14, weight: 700, fill: hi ? C.amber : C.blue });
    body += D.text(textX, cy + 5 - (r.tl.length - 1) * 8.75, r.tl.join("\n"), { size: 14 });
  }
  return D.svg(w, h, body);
}

/** Cause diagram: factor boxes on the left (or in groups), arrows into one result box on the right. */
export function factors(list, result, o = {}) {
  const w = o.w ?? 560;
  const fw = o.fw ?? 300;
  const gap = 10;
  let y = o.title ? 46 : 16;
  const boxes = list.map((f) => {
    const b = bx(14, y, fw, f.t ?? f, { fill: f.fill ?? C.fillGrey, stroke: f.stroke ?? C.axis });
    y += b.h + gap;
    return b;
  });
  const totalH = y - gap - (o.title ? 46 : 16);
  const rw = w - fw - 14 - 14 - 60;
  const rx = 14 + fw + 60;
  const rb = bx(rx, (o.title ? 46 : 16) + totalH / 2 - 40, rw, result, { fill: C.fillAmber, stroke: C.amber, bold: true, h: o.rh ?? 80 });
  let body = o.title ? D.text(w / 2, 28, o.title, { anchor: "middle", size: 16, weight: 700 }) : "";
  for (const b of boxes) body += b.svg + arr(b.right, [rb.x - 2, rb.cy + (b.cy - rb.cy) * 0.35], { stroke: C.blue });
  body += rb.svg;
  return D.svg(w, y - gap + 16, body);
}

export const lessonPath = (family, rel) => `content/subjects/${family}/lessons/${rel}.md`;
/** Make the figure, then place it. */
export async function place(family, lesson, after, name, svg, alt, caption) {
  await D.figure(family, name, svg, { alt, caption });
  const done = D.insertAfter(lessonPath(family, lesson), after, D.md(name, alt, caption));
  console.log(`${family}/${name}: ${done ? "inserted into " + lesson : "already in " + lesson}`);
}
