// geography-a: succession data, water stress gauge, rank-size. Run: node .scratch/geography-a/diagrams/misc2.mjs
import { D, C, make, lab, T } from "./_h.mjs";
const G = (body, x, y) => D.group(body, { translate: [x, y] });

// ---------- 1. Secondary succession data (four plots on an abandoned maize field)
{
  const yrs = [1, 5, 15, 40];
  const series = [
    ["Plant cover (%)", [35, 70, 85, 95], [0, 100], 25, C.green],
    ["Species per 100 m²", [9, 16, 22, 28], [0, 32], 8, C.blue],
    ["Soil organic matter (%)", [1.1, 1.6, 2.4, 3.5], [0, 4], 1, C.amber],
    ["Mean plant height (m)", [0.4, 1.2, 3.5, 9.0], [0, 10], 2, C.purple],
  ];
  const w = 580, h = 470;
  let b = "";
  series.forEach(([name, v, yr, step, col], i) => {
    const ax = D.axes({ x: [0, 42], y: yr, w: 285, h: 225, xTicks: 10, yTicks: step, yLabel: name, pad: { l: 44, r: 16, t: 30, b: 34 } });
    let p = ax.frame + ax.line(yrs.map((y, k) => [y, v[k]]), { stroke: col, width: 2.8 });
    yrs.forEach((y, k) => { p += ax.point(y, v[k], { stroke: col, r: 4 }) + ax.label(y, v[k], String(v[k]), { dx: y > 30 ? -4 : 9, dy: 19, size: 12, weight: 700, anchor: y > 30 ? "end" : "start" }); });
    b += G(p, (i % 2) * 292, Math.floor(i / 2) * 232);
  });
  b += D.text(290, 462, "Horizontal axes: years since the maize field was abandoned (0 to 40).", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("succession-field-data", w, h, b,
    "Secondary succession on an abandoned maize field: plant cover rises from 35 to 95 percent, species from 9 to 28 per 100 square metres, soil organic matter from 1.1 to 3.5 percent and mean height from 0.4 to 9.0 m over 40 years, with organic matter rising more slowly after year 15.",
    "Figure: four measures of an abandoned field over 40 years (worked-example data, illustrative)",
    "bio/plant-succession", "Interpreting a succession data set");
}

// ---------- 2. Water per person against stress thresholds
{
  const pop1 = 9.5e6, pop2 = 12.5e6, water = 14.25e9;
  const a = water / pop1, b2 = water / pop2; // 1500, 1140
  const w = 580, h = 240;
  const X = (v) => 30 + (v / 2000) * 520;
  let b = "";
  const zones = [[0, 500, "#f4b8b0", "Absolute scarcity"], [500, 1000, "#f8d4a8", "Scarcity"], [1000, 1700, "#fbeab8", "Stress"], [1700, 2000, "#d7efdc", "No stress"]];
  zones.forEach(([x0, x1, f, n2]) => { b += D.rect(X(x0), 90, X(x1) - X(x0), 56, { fill: f, stroke: C.ink, width: 1.4 }) + D.text((X(x0) + X(x1)) / 2, 124, n2, { anchor: "middle", size: x1 - x0 < 400 ? 12 : 13, weight: 700 }); });
  [0, 500, 1000, 1700, 2000].forEach((v) => { b += D.line(X(v), 146, X(v), 156, { stroke: C.ink, width: 1.4 }) + D.text(X(v), 174, String(v), { anchor: "middle", size: 12.5 }); });
  b += D.text(X(1000), 196, "Water available per person (m³ per year)", { anchor: "middle", size: 13.5, weight: 600 });
  b += D.arrow(X(a), 64, X(a), 88, { stroke: C.blue, width: 2.4 }) + D.text(X(a) - 6, 42, "9.5 million people:", { anchor: "start", size: 13, fill: C.blue, weight: 700 }) + D.text(X(a) - 6, 58, `${Math.round(a)} m³ per person`, { anchor: "start", size: 13, fill: C.blue, weight: 700 });
  b += D.arrow(X(b2), 64, X(b2), 88, { stroke: C.red, width: 2.4 }) + D.text(X(b2) + 6, 42, "12.5 million people:", { anchor: "end", size: 13, fill: C.red, weight: 700 }) + D.text(X(b2) + 6, 58, `${Math.round(b2)} m³ per person`, { anchor: "end", size: 13, fill: C.red, weight: 700 });
  b += D.text(10, 20, "Fixed supply: 14.25 billion m³ a year", { anchor: "start", size: 14, weight: 700 });
  await make("water-per-person-thresholds", w, h, b,
    `Water per person against stress thresholds: with 14.25 billion cubic metres a year, ${Math.round(a)} m3 per person for 9.5 million people lies in the stress band (1000 to 1700), and falls to ${Math.round(b2)} m3 for 12.5 million people, still stressed but closer to the scarcity limit of 1000 m3.`,
    "Figure: water available per person against the stress and scarcity thresholds (worked-example values, illustrative)",
    "water/global-resources", "Water available per person");
}

// ---------- 3. Rank-size rule: actual and expected populations
{
  const pop = [1800, 520, 410, 210, 190];
  const exp = pop.map((_, i) => 1800 / (i + 1));
  const w = 560, h = 400;
  const ax = D.axes({ x: [0, 5], y: [0, 2000], w, h, xTicks: [], yTicks: 400, yLabel: "Population (thousands)", origin: false, pad: { b: 56 } });
  let b = ax.frame;
  pop.forEach((v, i) => {
    const x0 = ax.X(i + 0.1), mid = ax.X(i + 0.5), x1 = ax.X(i + 0.9);
    b += D.rect(x0, ax.Y(exp[i]), mid - x0 - 1, ax.Y(0) - ax.Y(exp[i]), { fill: C.fillGrey, stroke: C.muted, width: 1.4 });
    b += D.rect(mid + 1, ax.Y(v), x1 - mid - 1, ax.Y(0) - ax.Y(v), { fill: C.teal, stroke: "none" });
    b += D.text(mid, ax.Y(0) + 20, `Rank ${i + 1}`, { anchor: "middle", size: 13 });
    if (i > 0) { b += D.text(mid - 6, ax.Y(exp[i]) - 6, String(exp[i]), { anchor: "end", size: 11.5, fill: C.muted }) + D.text(mid + 6, ax.Y(v) - 6, String(v), { anchor: "start", size: 11.5, weight: 700 }); }
  });
  b += D.text(ax.X(0.3), ax.Y(1800) - 8, "1800", { anchor: "middle", size: 12, weight: 700 });
  b += D.rect(ax.X(2.6), 40, 16, 12, { fill: C.fillGrey, stroke: C.muted, width: 1.2 }) + D.text(ax.X(2.6) + 22, 51, "Expected (1800 ÷ rank)", { size: 13 });
  b += D.rect(ax.X(2.6), 62, 16, 12, { fill: C.teal, stroke: "none" }) + D.text(ax.X(2.6) + 22, 73, "Actual", { size: 13 });
  b += lab(ax.X(5) - 6, ax.Y(1100), "Primacy index 1800 ÷ 520 = 3.5", { anchor: "end", size: 12.5, fill: C.red });
  await make("rank-size-primate-city", w, h, b,
    "Actual and expected town populations under the rank-size rule: the largest city has 1800 thousand people, but towns of rank 2 to 5 have 520, 410, 210 and 190 thousand, well below the 900, 600, 450 and 360 the rule predicts, giving a primacy index of 3.5, so the country has a primate city.",
    "Figure: actual populations compared with the rank-size rule for five towns (worked-example data, illustrative)",
    "settle/hierarchy-theories", "Rank-size and primacy");
}
