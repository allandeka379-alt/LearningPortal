// Diagram kit for lessons and questions (owner 2026-10-12, "option 2": priority diagram pass).
// Draw diagrams in CODE as SVG (exact graphs, curves, circuits, geometry), render them to PNG with sharp, list them in
// the family's media/media.json and embed them in Markdown as ![alt](media:diagrams/<file>.png "Figure: caption").
//
// Rules (docs/CONTENT_PIPELINE.md §10, docs/CONTENT_AUTHORING.md):
//   - lower-case file names under diagrams/, PNG, < 2 MB; white background (the image sits on a light card in both
//     themes); every image has alt text that states the learning point (labels, trends, values), not "a diagram".
//   - original drawings only; values in the diagram must match the lesson / question text exactly (compute them).
//
// Usage in a family script (.scratch/<family>/diagrams/<slice>.mjs):
//   import * as D from "../../tools/diagram-kit.mjs";
//   const ax = D.axes({ x: [0, 10], y: [0, 10], xLabel: "Quantity", yLabel: "Price (US$)", w: 560, h: 400 });
//   const svg = D.svg(560, 400, ax.frame + ax.line([[1, 9], [9, 1]], { stroke: D.C.blue }) + ax.label(9, 1, "D", { dx: 6 }));
//   await D.figure("economics-o", "demand-curve", svg, { alt: "...", caption: "Figure: a demand curve" });
//   // then put D.md("demand-curve", "alt", "Figure: ...") in the lesson where it belongs (or use D.insertAfter).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Palette: calm, high contrast on white, readable when printed in grey. */
export const C = {
  ink: "#1f1d1a",
  muted: "#6b6761",
  grid: "#e6e2dc",
  axis: "#3b3833",
  blue: "#135568", // Zambezi 700 (primary)
  teal: "#3b8da7",
  amber: "#bc661e", // Msasa 600 (accent)
  red: "#b42318",
  green: "#1e7f4f",
  purple: "#5b3f8c",
  fillBlue: "#daf2f8",
  fillAmber: "#feeace",
  fillGreen: "#e7f9ed",
  fillGrey: "#f0ede9",
};
export const FONT = "Arial, Helvetica, sans-serif";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n = (v) => Math.round(v * 100) / 100;

/** Wraps SVG body in a document with a white background and default text style. */
export function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.ink}"/></marker>
  <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.blue}"/></marker>
  <marker id="arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.amber}"/></marker>
  <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.red}"/></marker>
</defs>
<rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff"/>
<g font-family="${FONT}" font-size="15" fill="${C.ink}">${body}</g>
</svg>`;
}

/** Arrow marker id for a stroke colour (black, blue, amber, red). */
const markerFor = (stroke) => (stroke === C.blue ? "arrow-blue" : stroke === C.amber ? "arrow-amber" : stroke === C.red ? "arrow-red" : "arrow");

// ---------------------------------------------------------------- primitives (pixel coordinates)
export const line = (x1, y1, x2, y2, o = {}) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.dash ? ` stroke-dasharray="${o.dash === true ? "6 5" : o.dash}"` : ""}${o.arrow ? ` marker-end="url(#${markerFor(o.stroke ?? C.ink)})"` : ""}${o.arrowStart ? ` marker-start="url(#${markerFor(o.stroke ?? C.ink)})"` : ""} stroke-linecap="round"/>`;
export const arrow = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { ...o, arrow: true });
export const rect = (x, y, w, h, o = {}) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${o.r ?? 0}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.dash ? ` stroke-dasharray="6 5"` : ""}/>`;
export const circle = (cx, cy, r, o = {}) =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.dash ? ` stroke-dasharray="6 5"` : ""}/>`;
export const dot = (cx, cy, o = {}) => circle(cx, cy, o.r ?? 4, { fill: o.fill ?? o.stroke ?? C.ink, stroke: o.stroke ?? C.ink, width: 1 });
export const path_ = (d, o = {}) =>
  `<path d="${d}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.dash ? ` stroke-dasharray="6 5"` : ""}${o.arrow ? ` marker-end="url(#${markerFor(o.stroke ?? C.ink)})"` : ""} stroke-linejoin="round" stroke-linecap="round"/>`;
export const polyline = (pts, o = {}) => path_(`M${pts.map(([x, y]) => `${n(x)},${n(y)}`).join(" L")}${o.close ? " Z" : ""}`, o);
/** Text; o.anchor start|middle|end, o.size, o.weight, o.fill, o.italic, o.rotate (deg). Multi-line with "\n". */
export function text(x, y, s, o = {}) {
  const lines = String(s).split("\n");
  const size = o.size ?? 15;
  const rot = o.rotate ? ` transform="rotate(${o.rotate} ${n(x)} ${n(y)})"` : "";
  const tspans = lines.map((l, i) => `<tspan x="${n(x)}" dy="${i === 0 ? 0 : size * 1.25}">${esc(l)}</tspan>`).join("");
  return `<text x="${n(x)}" y="${n(y)}" font-size="${size}" text-anchor="${o.anchor ?? "start"}"${o.weight ? ` font-weight="${o.weight}"` : ""}${o.italic ? ` font-style="italic"` : ""} fill="${o.fill ?? C.ink}"${rot}>${tspans}</text>`;
}
/** A label in a white box (stands out over lines). */
export function tag(x, y, s, o = {}) {
  const size = o.size ?? 14;
  const w = String(s).length * size * 0.56 + 10;
  const h = size + 8;
  const left = o.anchor === "end" ? x - w : o.anchor === "middle" ? x - w / 2 : x;
  return rect(left, y - h + 4, w, h, { fill: o.bg ?? "#ffffff", stroke: o.stroke ?? C.grid, width: 1, r: 4 }) + text(left + 5, y - 1, s, { size, fill: o.fill });
}
export const group = (body, o = {}) => `<g${o.translate ? ` transform="translate(${o.translate[0]} ${o.translate[1]})"` : ""}>${body}</g>`;

// ---------------------------------------------------------------- graphs
/**
 * Cartesian axes in a plot area. x/y are [min, max] in data units; returns helpers that take DATA coordinates.
 * opts: w, h (svg size), pad {l, r, t, b}, xLabel, yLabel, xTicks/yTicks (array of values or a step number),
 * grid (true), origin (draw axes through 0 when in range, default true), tickLabels (true), xFormat/yFormat.
 */
export function axes(opts) {
  const { x: [x0, x1], y: [y0, y1] } = opts;
  const w = opts.w ?? 560, h = opts.h ?? 400;
  const pad = { l: 64, r: 28, t: 24, b: 56, ...(opts.pad ?? {}) };
  const X = (v) => pad.l + ((v - x0) / (x1 - x0)) * (w - pad.l - pad.r);
  const Y = (v) => h - pad.b - ((v - y0) / (y1 - y0)) * (h - pad.t - pad.b);
  const ticks = (t, a, b) => (Array.isArray(t) ? t : t ? range(Math.ceil(a / t) * t, b, t) : []);
  const xt = ticks(opts.xTicks ?? niceStep(x0, x1), x0, x1);
  const yt = ticks(opts.yTicks ?? niceStep(y0, y1), y0, y1);
  const fx = opts.xFormat ?? fmt, fy = opts.yFormat ?? fmt;
  const ax = opts.origin !== false && x0 <= 0 && x1 >= 0 ? X(0) : X(x0);
  const ay = opts.origin !== false && y0 <= 0 && y1 >= 0 ? Y(0) : Y(y0);
  let frame = "";
  if (opts.grid !== false) {
    for (const v of xt) frame += line(X(v), Y(y0), X(v), Y(y1), { stroke: C.grid, width: 1 });
    for (const v of yt) frame += line(X(x0), Y(v), X(x1), Y(v), { stroke: C.grid, width: 1 });
  }
  frame += line(X(x0), ay, X(x1) + 6, ay, { stroke: C.axis, width: 1.6, arrow: opts.arrows !== false });
  frame += line(ax, Y(y0), ax, Y(y1) - 6, { stroke: C.axis, width: 1.6, arrow: opts.arrows !== false });
  if (opts.tickLabels !== false) {
    for (const v of xt) if (!(opts.origin !== false && v === 0 && ax === X(0) && ay === Y(0) && x0 < 0)) frame += line(X(v), ay, X(v), ay + 5, { stroke: C.axis, width: 1.2 }) + text(X(v), ay + 21, fx(v), { anchor: "middle", size: 13, fill: C.muted });
    for (const v of yt) if (!(v === 0 && ay === Y(0) && x0 < 0)) frame += line(ax - 5, Y(v), ax, Y(v), { stroke: C.axis, width: 1.2 }) + text(ax - 9, Y(v) + 4, fy(v), { anchor: "end", size: 13, fill: C.muted });
  }
  if (opts.xLabel) frame += text(X(x1), Math.min(h - 10, ay + 42), opts.xLabel, { anchor: "end", size: 14, weight: 600 });
  if (opts.yLabel) frame += text(ax + 8, pad.t - 6 > 10 ? pad.t - 6 : 14, opts.yLabel, { size: 14, weight: 600 });
  const api = {
    X, Y, w, h, frame,
    /** Polyline through data points. */
    line: (pts, o = {}) => polyline(pts.map(([a, b]) => [X(a), Y(b)]), { stroke: C.blue, width: 2.6, ...o }),
    /** y = f(x) sampled on [a, b] (default the x range); breaks where f is not finite or leaves the y range by far. */
    plot: (f, o = {}) => {
      const [a, b] = o.domain ?? [x0, x1];
      const steps = o.steps ?? 240;
      let d = "", pen = false;
      for (let i = 0; i <= steps; i += 1) {
        const xv = a + ((b - a) * i) / steps;
        const yv = f(xv);
        const ok = Number.isFinite(yv) && yv > y0 - (y1 - y0) && yv < y1 + (y1 - y0);
        if (!ok) { pen = false; continue; }
        d += `${pen ? "L" : "M"}${n(X(xv))},${n(Y(yv))} `;
        pen = true;
      }
      return `<clipPath id="clip${(api._clip = (api._clip ?? 0) + 1)}"><rect x="${X(x0)}" y="${Y(y1)}" width="${X(x1) - X(x0)}" height="${Y(y0) - Y(y1)}"/></clipPath>` +
        `<g clip-path="url(#clip${api._clip})">${path_(d.trim(), { stroke: C.blue, width: 2.6, ...o })}</g>`;
    },
    point: (a, b, o = {}) => dot(X(a), Y(b), o),
    label: (a, b, s, o = {}) => text(X(a) + (o.dx ?? 0), Y(b) + (o.dy ?? 0), s, o),
    tag: (a, b, s, o = {}) => tag(X(a) + (o.dx ?? 0), Y(b) + (o.dy ?? 0), s, o),
    /** Dashed guide lines from a point to both axes. */
    guides: (a, b, o = {}) => line(X(a), Y(b), X(a), ay, { stroke: C.muted, width: 1.4, dash: true, ...o }) + line(X(a), Y(b), ax, Y(b), { stroke: C.muted, width: 1.4, dash: true, ...o }),
    /** Shaded region between f and g (or the x-axis) on [a, b]. */
    area: (f, g, [a, b], o = {}) => {
      const s = 120, top = [], bot = [];
      for (let i = 0; i <= s; i += 1) {
        const xv = a + ((b - a) * i) / s;
        top.push([X(xv), Y(f(xv))]);
        bot.push([X(xv), Y(g ? g(xv) : 0)]);
      }
      return polyline([...top, ...bot.reverse()], { fill: o.fill ?? C.fillBlue, stroke: "none", close: true });
    },
    arrow: (a1, b1, a2, b2, o = {}) => arrow(X(a1), Y(b1), X(a2), Y(b2), o),
    axisX: ay, axisY: ax,
  };
  return api;
}
export function range(a, b, step) {
  const out = [];
  for (let v = a; v <= b + step * 1e-9; v += step) out.push(Math.round(v * 1e9) / 1e9);
  return out;
}
function niceStep(a, b) {
  const span = Math.abs(b - a);
  const raw = span / 8;
  const p = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map((m) => m * p).find((s) => s >= raw) ?? p * 10;
}
export const fmt = (v) => (Math.abs(v) >= 1000 ? v.toLocaleString("en-GB") : String(Math.round(v * 1000) / 1000).replace("-", "−"));

/** Bar chart. bars: [{ label, value, fill? }]. opts: w, h, yMax, yLabel, title. */
export function barChart(bars, opts = {}) {
  const w = opts.w ?? 560, h = opts.h ?? 380;
  const yMax = opts.yMax ?? Math.max(...bars.map((b) => b.value)) * 1.15;
  const ax = axes({ x: [0, bars.length], y: [0, yMax], w, h, yLabel: opts.yLabel, xTicks: [], grid: true, origin: false, arrows: false, yTicks: opts.yTicks });
  const bw = (ax.X(1) - ax.X(0)) * 0.6;
  let body = ax.frame;
  bars.forEach((b, i) => {
    const cx = ax.X(i + 0.5);
    body += rect(cx - bw / 2, ax.Y(b.value), bw, ax.Y(0) - ax.Y(b.value), { fill: b.fill ?? C.teal, stroke: "none" });
    body += text(cx, ax.Y(0) + 20, b.label, { anchor: "middle", size: 13 });
    if (opts.values !== false) body += text(cx, ax.Y(b.value) - 6, fmt(b.value), { anchor: "middle", size: 12, fill: C.muted });
  });
  return svg(w, h, body);
}

// ---------------------------------------------------------------- circuits (physics / electronics)
/** Circuit symbols centred on (x, y), horizontal unless o.vertical. Each returns SVG; wires join at ±len/2. */
export const sym = {
  len: 60,
  cell(x, y, o = {}) {
    const v = o.vertical;
    const L = (a, b, c, d, w = 2) => (v ? line(x + b, y + a, x + d, y + c, { width: w }) : line(x + a, y + b, x + c, y + d, { width: w }));
    return L(-30, 0, -5, 0) + L(5, 0, 30, 0) + L(-5, -16, -5, 16, 2.5) + L(5, -9, 5, 9, 5) + (o.label ? text(x + (v ? 22 : 0), y + (v ? 4 : -22), o.label, { anchor: v ? "start" : "middle", size: 14 }) : "");
  },
  resistor(x, y, o = {}) {
    const v = o.vertical;
    const body = v ? rect(x - 9, y - 22, 18, 44, { fill: "#fff" }) + line(x, y - 30, x, y - 22) + line(x, y + 22, x, y + 30) : rect(x - 22, y - 9, 44, 18, { fill: "#fff" }) + line(x - 30, y, x - 22, y) + line(x + 22, y, x + 30, y);
    return body + (o.label ? text(x + (v ? 16 : 0), y + (v ? 5 : -16), o.label, { anchor: v ? "start" : "middle", size: 14 }) : "");
  },
  lamp(x, y, o = {}) {
    const v = o.vertical;
    const ends = v ? line(x, y - 30, x, y - 14) + line(x, y + 14, x, y + 30) : line(x - 30, y, x - 14, y) + line(x + 14, y, x + 30, y);
    return ends + circle(x, y, 14, { fill: "#fff" }) + line(x - 10, y - 10, x + 10, y + 10) + line(x - 10, y + 10, x + 10, y - 10) + (o.label ? text(x + (v ? 20 : 0), y + (v ? 5 : -20), o.label, { anchor: v ? "start" : "middle", size: 14 }) : "");
  },
  meter(x, y, letter, o = {}) {
    const v = o.vertical;
    const ends = v ? line(x, y - 30, x, y - 14) + line(x, y + 14, x, y + 30) : line(x - 30, y, x - 14, y) + line(x + 14, y, x + 30, y);
    return ends + circle(x, y, 14, { fill: "#fff" }) + text(x, y + 5, letter, { anchor: "middle", size: 15, weight: 700 });
  },
  switch_(x, y, o = {}) {
    const v = o.vertical;
    return v
      ? line(x, y - 30, x, y - 12) + dot(x, y - 12, { r: 3 }) + line(x, y - 12, x + (o.closed ? 0 : 14), y + 12) + dot(x, y + 12, { r: 3 }) + line(x, y + 12, x, y + 30)
      : line(x - 30, y, x - 12, y) + dot(x - 12, y, { r: 3 }) + line(x - 12, y, x + 12, y - (o.closed ? 0 : 14)) + dot(x + 12, y, { r: 3 }) + line(x + 12, y, x + 30, y);
  },
  diode(x, y, o = {}) {
    return line(x - 30, y, x - 10, y) + polyline([[x - 10, y - 11], [x - 10, y + 11], [x + 9, y]], { fill: C.ink, close: true }) + line(x + 10, y - 12, x + 10, y + 12, { width: 2.5 }) + line(x + 10, y, x + 30, y) + (o.label ? text(x, y - 18, o.label, { anchor: "middle", size: 14 }) : "");
  },
  /** Wire through points [[x,y], ...]. */
  wire: (pts) => polyline(pts, { width: 2 }),
  junction: (x, y) => dot(x, y, { r: 4 }),
};

// ---------------------------------------------------------------- boxes and flow (CS, economics, biology processes)
/** Rounded box with centred (multi-line) text. kind: box | terminator | decision | io. */
export function node(x, y, w, h, label, o = {}) {
  const fill = o.fill ?? C.fillBlue;
  let shape;
  if (o.kind === "decision") shape = polyline([[x + w / 2, y], [x + w, y + h / 2], [x + w / 2, y + h], [x, y + h / 2]], { fill, close: true });
  else if (o.kind === "io") shape = polyline([[x + 14, y], [x + w, y], [x + w - 14, y + h], [x, y + h]], { fill, close: true });
  else shape = rect(x, y, w, h, { fill, r: o.kind === "terminator" ? h / 2 : 8 });
  const lines = String(label).split("\n");
  const size = o.size ?? 14;
  const ty = y + h / 2 - ((lines.length - 1) * size * 1.25) / 2 + size * 0.35;
  return shape + text(x + w / 2, ty, label, { anchor: "middle", size, weight: o.weight });
}

// ---------------------------------------------------------------- output
const FAMILY_ROOT = "content/subjects";

/** Renders SVG to PNG (2x for sharp text), writes media/diagrams/<name>.png and upserts media.json. Returns the media path. */
export async function figure(family, name, svgText, { alt, caption, longDescription, scale = 2 } = {}) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) throw new Error(`diagram name "${name}": lower-case letters, digits and hyphens only`);
  if (!alt || alt.trim().length < 20) throw new Error(`diagram ${name}: alt text must state the learning point (20+ chars)`);
  const file = `diagrams/${name}.png`;
  const dir = path.join(FAMILY_ROOT, family, "media", "diagrams");
  fs.mkdirSync(dir, { recursive: true });
  const m = /width="(\d+(?:\.\d+)?)"/.exec(svgText);
  const width = m ? Number(m[1]) : 560;
  const png = await sharp(Buffer.from(svgText), { density: 72 * scale }).resize({ width: Math.round(width * scale) }).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  if (png.length > 2 * 1024 * 1024) throw new Error(`diagram ${name}: ${png.length} bytes is over the 2 MB limit`);
  fs.writeFileSync(path.join(dir, `${name}.png`), png);
  upsertMedia(family, { file, alt: alt.trim(), ...(caption ? { caption } : {}), ...(longDescription ? { longDescription } : {}), purpose: "DIAGRAM" });
  return file;
}

/** Adds or replaces one entry in content/subjects/<family>/media/media.json (sorted by file, stable). */
export function upsertMedia(family, entry) {
  const p = path.join(FAMILY_ROOT, family, "media", "media.json");
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const list = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : [];
  const i = list.findIndex((e) => e.file === entry.file);
  if (i >= 0) list[i] = entry;
  else list.push(entry);
  list.sort((a, b) => a.file.localeCompare(b.file));
  fs.writeFileSync(p, JSON.stringify(list, null, 2) + "\n");
}

/** Markdown for a figure (a paragraph of its own becomes <figure> with the title as <figcaption>). */
/** Markdown-safe text: no square brackets, and every `$` escaped (a bare `$` would open a maths span). */
const mdText = (s) => s.replace(/[[\]]/g, "").replace(/(?<!\\)\$/g, "\\$");
export const md = (name, alt, caption) => `![${mdText(alt)}](media:diagrams/${name}.png${caption ? ` "${mdText(caption).replace(/"/g, "'")}"` : ""})`;

/**
 * Inserts a figure into a lesson file after the first line that matches `after` (a string or RegExp: usually a heading
 * or a sentence), as its own paragraph. Idempotent: does nothing if the lesson already references the image.
 */
export function insertAfter(lessonPath, after, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof after === "string" ? l.includes(after) : after.test(l)));
  if (i < 0) throw new Error(`${lessonPath}: no line matches ${after}`);
  // After a heading, put the figure after the paragraph that follows it; otherwise right after the matched line's paragraph.
  let j = i + 1;
  if (/^#{1,6}\s/.test(lines[i])) {
    while (j < lines.length && lines[j].trim() === "") j += 1;
  }
  while (j < lines.length && lines[j].trim() !== "" && !/^#{1,6}\s/.test(lines[j]) && !/^:::/.test(lines[j])) j += 1;
  lines.splice(j, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
