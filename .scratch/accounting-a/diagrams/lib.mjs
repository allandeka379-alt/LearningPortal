// Shared helpers for the accounting-a and accounting-o diagram scripts (own helpers; the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export { D };

export const money = (v) => (v < 0 ? "−" : "") + Math.abs(Math.round(v * 100) / 100).toLocaleString("en-GB");
export function assertEq(a, b, what) {
  if (Math.abs(a - b) > 0.005) throw new Error(`ASSERT ${what}: ${a} != ${b}`);
}

/**
 * Waterfall chart. items: { label, value, kind: "total" | "delta", fill? }. "total" bars are drawn from 0 to value
 * (and assert that the running total equals value when check is true); "delta" bars float from the running total.
 * opts: w, h, yMin, yMax, yTick, yLabel, fmt, labelSize.
 */
export function waterfall(items, opts = {}) {
  const w = opts.w ?? 600, h = opts.h ?? 400;
  const fm = opts.fmt ?? money;
  let run = 0;
  const bars = items.map((it) => {
    if (it.kind === "total") {
      if (it.check !== false && it.first !== true && Math.abs(run - it.value) > 0.005) throw new Error(`waterfall: running total ${run} != ${it.value} at ${it.label}`);
      run = it.value;
      return { ...it, from: 0, to: it.value, shown: it.value };
    }
    const from = run;
    run += it.value;
    return { ...it, from, to: run, shown: it.value };
  });
  const all = bars.flatMap((b) => [b.from, b.to]);
  const yMin = opts.yMin ?? Math.min(0, ...all) * 1.15;
  const yMax = opts.yMax ?? Math.max(0, ...all) * 1.12;
  const ax = D.axes({ x: [0, bars.length], y: [yMin, yMax], w, h, yLabel: opts.yLabel, xTicks: [], yTicks: opts.yTick, origin: true, arrows: false, pad: { l: opts.padL ?? 70, b: opts.padB ?? 62, t: 30, r: 16 }, yFormat: opts.yFormat });
  const bw = (ax.X(1) - ax.X(0)) * 0.62;
  let body = ax.frame;
  bars.forEach((b, i) => {
    const cx = ax.X(i + 0.5);
    const top = Math.min(b.from, b.to), bot = Math.max(b.from, b.to);
    const fill = b.fill ?? (b.kind === "total" ? D.C.blue : b.value >= 0 ? D.C.teal : D.C.amber);
    body += D.rect(cx - bw / 2, ax.Y(bot), bw, Math.max(1.5, ax.Y(top) - ax.Y(bot)), { fill, stroke: "none" });
    if (i > 0 && !b.noConn) body += D.line(ax.X(i - 0.5) + bw / 2, ax.Y(bars[i - 1].to), cx - bw / 2, ax.Y(bars[i - 1].to), { stroke: D.C.muted, width: 1, dash: true });
    const sign = b.kind === "total" ? "" : b.value >= 0 ? "+" : "";
    const txt = sign + fm(b.shown);
    const up = b.kind === "total" ? b.to >= 0 : b.value >= 0;
    const nearFloor = !up && ax.Y(top) > h - (opts.padB ?? 62) - 24 && b.kind !== "total";
    const ty = up || nearFloor ? (up ? ax.Y(bot) - 6 : ax.Y(bot) - 6) : ax.Y(top) + 15;
    body += D.text(cx, ty, txt, { anchor: "middle", size: opts.valSize ?? 13, weight: 700, fill: D.C.ink });
    body += D.text(cx, h - (opts.padB ?? 62) + 22, b.label, { anchor: "middle", size: opts.labelSize ?? 13 });
  });
  return D.svg(w, h, body);
}

/** Grouped bars with negative values allowed. groups: [{ label, bars:[{ value, fill, text? }] }]. */
export function grouped(groups, opts = {}) {
  const w = opts.w ?? 600, h = opts.h ?? 400;
  const fm = opts.fmt ?? money;
  const vals = groups.flatMap((g) => g.bars.map((b) => b.value));
  const yMin = opts.yMin ?? Math.min(0, ...vals) * 1.2;
  const yMax = opts.yMax ?? Math.max(0, ...vals) * 1.15;
  const ax = D.axes({ x: [0, groups.length], y: [yMin, yMax], w, h, yLabel: opts.yLabel, xTicks: [], yTicks: opts.yTick, arrows: false, pad: { l: opts.padL ?? 64, b: opts.padB ?? 56, t: opts.legend ? 62 : 30, r: 16 }, yFormat: opts.yFormat });
  let body = ax.frame;
  const gw = ax.X(1) - ax.X(0);
  groups.forEach((g, i) => {
    const n = g.bars.length;
    const bw = (gw * 0.8) / n;
    g.bars.forEach((b, j) => {
      const x = ax.X(i) + gw * 0.1 + j * bw;
      const y0 = ax.Y(0), y1 = ax.Y(b.value);
      body += D.rect(x + 2, Math.min(y0, y1), bw - 4, Math.max(1.5, Math.abs(y1 - y0)), { fill: b.fill, stroke: "none" });
      const txt = b.text ?? fm(b.value);
      body += D.text(x + bw / 2, b.value >= 0 ? y1 - 6 : y1 + 15, txt, { anchor: "middle", size: opts.valSize ?? 13, weight: 700 });
    });
    body += D.text(ax.X(i + 0.5), h - (opts.padB ?? 56) + 22, g.label, { anchor: "middle", size: 13 });
  });
  if (opts.legend) {
    opts.legend.forEach((l, k) => {
      body += D.rect(ax.X(0) + 8 + k * (opts.legendW ?? 170), 6, 14, 14, { fill: l.fill, stroke: "none" }) + D.text(ax.X(0) + 28 + k * (opts.legendW ?? 170), 18, l.label, { size: 13 });
    });
  }
  return D.svg(w, h, body);
}

/** Boxes helper: returns { svg, centre } for flows. */
export const cx = (x, w) => x + w / 2;

/** Standard re-runnable publish step: write the PNG and put it in the lesson. */
export async function publish(family, name, svg, alt, caption, lesson, after) {
  await D.figure(family, name, svg, { alt, caption });
  refreshFigure(`content/subjects/${family}/lessons/${lesson}`, D.md(name, alt, caption));
  const placed = D.insertAfter(`content/subjects/${family}/lessons/${lesson}`, after, D.md(name, alt, caption));
  console.log(`${family}/${name}${placed ? " (placed)" : " (already placed)"}`);
}

import fs from "node:fs";
/** Inserts the figure just before a heading line (so it never lands inside a ::: block). Idempotent. */
export function insertBefore(lessonPath, heading, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.trim() === heading);
  if (i < 0) throw new Error(`${lessonPath}: no heading ${heading}`);
  lines.splice(i, 0, figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
/** Like publish() but places the figure before a heading. */
export async function publishBefore(family, name, svg, alt, caption, lesson, heading) {
  await D.figure(family, name, svg, { alt, caption });
  refreshFigure(`content/subjects/${family}/lessons/${lesson}`, D.md(name, alt, caption));
  const placed = insertBefore(`content/subjects/${family}/lessons/${lesson}`, heading, D.md(name, alt, caption));
  console.log(`${family}/${name}${placed ? " (placed)" : " (already placed)"}`);
}

/** If the lesson already holds this image, refresh its alt text and caption in place (keeps re-runs honest). */
export function refreshFigure(lessonPath, figureMd) {
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  const text = fs.readFileSync(lessonPath, "utf8");
  if (!ref || !text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n").map((l) => (l.startsWith("![") && l.includes(`(media:${ref}`) ? figureMd : l));
  fs.writeFileSync(lessonPath, lines.join("\n"));
  return true;
}

/**
 * Stacked bars. cats: [{ label, parts: [{ value, fill, name? }] }] (parts stack upward). opts: w, h, yMax, yTick, yLabel, legend.
 * Segment values are written inside a segment when it is tall enough.
 */
export function stacked(cats, opts = {}) {
  const w = opts.w ?? 600, h = opts.h ?? 400;
  const fm = opts.fmt ?? money;
  const yMax = opts.yMax ?? Math.max(...cats.map((c) => c.parts.reduce((a, p) => a + p.value, 0))) * 1.1;
  const ax = D.axes({ x: [0, cats.length], y: [0, yMax], w, h, yLabel: opts.yLabel, xTicks: [], yTicks: opts.yTick, arrows: false, pad: { l: opts.padL ?? 70, b: 56, t: opts.legend ? 62 : 30, r: 16 } });
  let body = ax.frame;
  const gw = ax.X(1) - ax.X(0);
  cats.forEach((c, i) => {
    let run = 0;
    const bw = gw * 0.62, x = ax.X(i + 0.5) - bw / 2;
    c.parts.forEach((p) => {
      const y1 = ax.Y(run + p.value), y0 = ax.Y(run);
      body += D.rect(x, y1, bw, y0 - y1, { fill: p.fill, stroke: "#ffffff", width: 1.5 });
      if (y0 - y1 >= 20) body += D.text(x + bw / 2, (y0 + y1) / 2 + 5, fm(p.value), { anchor: "middle", size: 13, weight: 700 });
      run += p.value;
    });
    body += D.text(ax.X(i + 0.5), h - 56 + 22, c.label, { anchor: "middle", size: 13 });
    body += D.text(ax.X(i + 0.5), ax.Y(run) - 6, fm(run), { anchor: "middle", size: 13, fill: D.C.muted });
  });
  (opts.legend ?? []).forEach((l, k) => {
    body += D.rect(ax.X(0) + 8 + k * (opts.legendW ?? 190), 6, 14, 14, { fill: l.fill, stroke: D.C.muted, width: 1 }) + D.text(ax.X(0) + 28 + k * (opts.legendW ?? 190), 18, l.label, { size: 13 });
  });
  return D.svg(w, h, body);
}
