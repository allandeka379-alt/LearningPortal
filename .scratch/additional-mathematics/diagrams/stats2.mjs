// Run: node .scratch/additional-mathematics/diagrams/stats2.mjs   (second diagram pass; lessons are hand-written .md files)
import { D, C, fig } from "./_h.mjs";

const f1 = (v, n = 1) => String(Math.round(v * 10 ** n) / 10 ** n);

// ---- probability/set-language Example 2: Venn, 40 learners, G 23, H 18, both 7
{
  const n = 40, G = 23, H = 18, both = 7;
  const gOnly = G - both, hOnly = H - both, none = n - (gOnly + hOnly + both);
  let b = D.rect(20, 30, 500, 290, { stroke: C.axis, width: 2 }) + D.text(30, 52, `All 40 learners`, { size: 14, weight: 600 });
  b += D.circle(210, 185, 105, { stroke: C.blue, width: 2.6, fill: "none" }) + D.circle(330, 185, 105, { stroke: C.amber, width: 2.6, fill: "none" });
  b += D.text(160, 68, `Geography, 23`, { size: 14, fill: C.blue, weight: 600, anchor: "middle" }) + D.text(380, 68, `History, 18`, { size: 14, fill: C.amber, weight: 600, anchor: "middle" });
  b += D.text(163, 195, String(gOnly), { size: 24, anchor: "middle", weight: 700 }) + D.text(270, 195, String(both), { size: 24, anchor: "middle", weight: 700 }) + D.text(377, 195, String(hOnly), { size: 24, anchor: "middle", weight: 700 }) + D.text(60, 290, String(none), { size: 24, anchor: "middle", weight: 700 });
  b += D.text(163, 218, "Geography only", { size: 12, anchor: "middle", fill: C.muted }) + D.text(270, 218, "both", { size: 12.5, anchor: "middle", fill: C.muted }) + D.text(377, 218, "History only", { size: 12.5, anchor: "middle", fill: C.muted }) + D.text(60, 310, "neither", { size: 12.5, anchor: "middle", fill: C.muted });
  await fig("probability/set-language", "venn-two-sets-geography-history", D.svg(540, 340, b),
    `Venn diagram of 40 learners: Geography only ${gOnly}, both subjects ${both}, History only ${hOnly}, neither ${none}; the circle totals 23 and 18 add to 41 because the 7 in the overlap are counted twice.`,
    "Figure: fill the overlap first (7), then each circle's remainder (16 and 11), then the outside (6)", { block: "Example 2" });
}
// Example 3: three sets, 60 households
{
  const r = { c: 12, g: 9, k: 13, cg: 7, gk: 4, ck: 6, all: 5 };
  const none = 60 - Object.values(r).reduce((a, v) => a + v, 0);
  let b = D.rect(20, 20, 500, 400, { stroke: C.axis, width: 2 }) + D.text(30, 42, "60 households", { size: 14, weight: 600 });
  const C1 = [205, 170], C2 = [335, 170], C3 = [270, 280], R = 105;
  b += D.circle(...C1, R, { stroke: C.blue, width: 2.6 }) + D.circle(...C2, R, { stroke: C.amber, width: 2.6 }) + D.circle(...C3, R, { stroke: C.green, width: 2.6 });
  b += D.text(130, 62, "Cattle 30", { size: 14, weight: 600, fill: C.blue, anchor: "middle" }) + D.text(410, 62, "Goats 25", { size: 14, weight: 600, fill: C.amber, anchor: "middle" }) + D.text(270, 412, "Chickens 28", { size: 14, weight: 600, fill: C.green, anchor: "middle" });
  const num = (x, y, v) => D.text(x, y + 8, String(v), { size: 22, weight: 700, anchor: "middle" });
  b += num(150, 140, r.c) + num(390, 140, r.g) + num(270, 345, r.k) + num(270, 118, r.cg) + num(205, 245, r.ck) + num(335, 245, r.gk) + num(270, 188, r.all) + num(60, 385, none);
  await fig("probability/set-language", "venn-three-sets-livestock", D.svg(540, 430, b),
    `Three-circle Venn diagram of 60 households: cattle only ${r.c}, goats only ${r.g}, chickens only ${r.k}, cattle and goats only ${r.cg}, goats and chickens only ${r.gk}, cattle and chickens only ${r.ck}, all three ${r.all}, none ${none}.`,
    "Figure: eight regions, filled from the centre (5) outwards; the regions add up to 60", { block: "Example 3" });
}

// ---- tree diagrams
function tree({ first, second, title }) {
  // first: [{label, p}], second: [[{label, p}, {label, p}], ...] ; path probabilities are given as text in `path`
  const w = 600, h = 380;
  let b = "";
  const root = [40, 190], x1 = 250, x2 = 420, ys1 = [100, 280], ys2 = [60, 140, 240, 320];
  first.forEach((f, i) => {
    b += D.line(root[0], root[1], x1, ys1[i], { stroke: C.blue, width: 2.2 }) + D.tag(root[0] + (x1 - root[0]) / 2 - 20, (root[1] + ys1[i]) / 2 + (i === 0 ? -6 : 22), f.p, { size: 14, fill: C.blue });
    b += D.dot(x1, ys1[i], { r: 4 }) + D.text(x1 - 8, ys1[i] + (i === 0 ? -12 : 26), f.label, { size: 14, weight: 600, anchor: "end" });
    second[i].forEach((s, j) => {
      const y2 = ys2[i * 2 + j];
      b += D.line(x1, ys1[i], x2, y2, { stroke: C.axis, width: 2 }) + D.tag(x1 + (x2 - x1) / 2 - 22, (ys1[i] + y2) / 2 + (j === 0 ? -4 : 20), s.p, { size: 14 });
      b += D.dot(x2, y2, { r: 4 }) + D.text(x2 + 10, y2 + 5, s.out, { size: 14 }) + D.text(x2 + 10, y2 + 5, "", { size: 14 });
    });
  });
  b += D.text(20, 22, title, { size: 14, weight: 600 });
  return D.svg(w, h, b);
}
{
  const svg = tree({
    title: "Maize seed: supplier, then germination",
    first: [{ label: "Supplier A", p: "0.7" }, { label: "Supplier B", p: "0.3" }],
    second: [[{ p: "0.9", out: "G: 0.7 × 0.9 = 0.63" }, { p: "0.1", out: "not G: 0.7 × 0.1 = 0.07" }], [{ p: "0.8", out: "G: 0.3 × 0.8 = 0.24" }, { p: "0.2", out: "not G: 0.3 × 0.2 = 0.06" }]],
  });
  await fig("probability/conditional", "tree-maize-seed-germination", svg,
    "Tree diagram: supplier A 0.7 then germinates 0.9 gives 0.63, not 0.07; supplier B 0.3 then germinates 0.8 gives 0.24, not 0.06; P(G) = 0.63 + 0.24 = 0.87 and P(A given G) = 0.63/0.87, which is 21/29.",
    "Figure: second-stage branches are conditional probabilities; P(A | G) = 0.63 ÷ (0.63 + 0.24)", { block: "Example 3" });
}
{
  const svg = tree({
    title: "Two beads without replacement: 4 red, 6 white",
    first: [{ label: "1st red", p: "4/10" }, { label: "1st white", p: "6/10" }],
    second: [[{ p: "3/9", out: "RR: 12/90 = 2/15" }, { p: "6/9", out: "RW: 24/90 = 4/15" }], [{ p: "4/9", out: "WR: 24/90 = 4/15" }, { p: "5/9", out: "WW: 30/90 = 1/3" }]],
  });
  await fig("probability/addition-product-rules", "tree-beads-without-replacement", svg,
    "Tree diagram for two beads taken without replacement from 4 red and 6 white: after a red the second-stage probabilities are 3/9 and 6/9, after a white 4/9 and 5/9; the paths give RR 2/15, RW 4/15, WR 4/15 and WW 1/3, so P(same colour) = 2/15 + 1/3 = 7/15.",
    "Figure: multiply along each path; the second-stage probabilities change because one bead has been removed", { block: "Example 5" });
}

// ---- distributions/normal: X ~ N(50, 16)
const dens = (x) => Math.exp(-((x - 50) ** 2) / 32) / (4 * Math.sqrt(2 * Math.PI));
{
  const ax = D.axes({ x: [38, 62], y: [0, 0.11], xTicks: [38, 42, 46, 50, 54, 58, 62], yTicks: [], w: 540, h: 360, xLabel: "length x (cm)", pad: { l: 30 } });
  const body = ax.frame + ax.area(dens, null, [55, 62], { fill: C.fillAmber }) + ax.plot(dens, { steps: 300 }) + ax.line([[50, 0], [50, dens(50)]], { stroke: C.muted, width: 1.4, dash: "6 5" }) +
    ax.tag(50, dens(50), "mean 50, σ = 4", { dx: -62, dy: -10, size: 13 }) + ax.line([[55, 0], [55, dens(55)]], { stroke: C.amber, width: 2 }) +
    ax.tag(55, 0.03, "x = 55, z = 1.25", { dx: -4, dy: -40, size: 13, fill: C.amber }) + ax.tag(55, 0.03, "P(X > 55) = 0.1056", { dx: -4, dy: -14, size: 13, fill: C.amber });
  await fig("distributions/normal", "normal-bream-longer-than-55", D.svg(540, 360, body),
    "Normal curve for bream lengths X ~ N(50, 16), mean 50 cm and standard deviation 4 cm: the shaded upper tail beyond x = 55 cm (z = 1.25) has area 0.1056, the probability that a bream is longer than 55 cm.",
    "Figure: P(X > 55) is the shaded tail beyond z = 1.25, which is 1 − 0.8944 = 0.1056", { block: "Example 2" });
}
{
  const ax = D.axes({ x: [38, 62], y: [0, 0.11], xTicks: [38, 42, 46, 50, 54, 58, 62], yTicks: [], w: 540, h: 360, xLabel: "length x (cm)", pad: { l: 30 } });
  const body = ax.frame + ax.area(dens, null, [46, 53], { fill: C.fillBlue }) + ax.plot(dens, { steps: 300 }) + ax.line([[46, 0], [46, dens(46)]], { stroke: C.blue, width: 2 }) + ax.line([[53, 0], [53, dens(53)]], { stroke: C.blue, width: 2 }) +
    ax.tag(38.6, 0.1, "z = −1 at x = 46 and z = 0.75 at x = 53", { size: 13, fill: C.blue }) + ax.tag(50, 0.04, "P(46 < X < 53) = 0.6147", { dx: -90, dy: 0, size: 13, fill: C.blue });
  await fig("distributions/normal", "normal-bream-between-46-and-53", D.svg(540, 360, body),
    "Normal curve for X ~ N(50, 16): the shaded area between x = 46 (z = -1) and x = 53 (z = 0.75) is 0.7734 - 0.1587 = 0.6147, so about 61% of bream are between 46 cm and 53 cm long.",
    "Figure: P(46 < X < 53) is the shaded area between z = −1 and z = 0.75, which is 0.6147", { block: "Example 3" });
}

// ---- statistics/data-presentation Example 2: walking times, 75 learners
{
  const classes = [[0, 10, 8], [10, 15, 15], [15, 20, 22], [20, 30, 18], [30, 50, 12]];
  const ax = D.axes({ x: [0, 50], y: [0, 5], xTicks: [0, 10, 15, 20, 30, 50], yTicks: 1, w: 560, h: 400, xLabel: "time t (min)", yLabel: "frequency density" });
  let b = ax.frame;
  for (const [a, c, f] of classes) {
    const d = f / (c - a);
    b += D.rect(ax.X(a), ax.Y(d), ax.X(c) - ax.X(a), ax.Y(0) - ax.Y(d), { fill: C.fillBlue, stroke: C.blue, width: 2 });
    b += D.text((ax.X(a) + ax.X(c)) / 2, ax.Y(d) - 6, f1(d, 2), { anchor: "middle", size: 13, weight: 600 });
    b += D.text((ax.X(a) + ax.X(c)) / 2, ax.Y(0) - 8, `f = ${f}`, { anchor: "middle", size: 12, fill: C.muted });
  }
  await fig("statistics/data-presentation", "histogram-walking-times", D.svg(560, 400, b),
    "Histogram of walking times of 75 learners with unequal class widths: frequency densities 0.8, 3, 4.4, 1.8 and 0.6 for the classes 0-10, 10-15, 15-20, 20-30 and 30-50 minutes; the tallest bar is 15-20 minutes and the data are skewed to longer times.",
    "Figure: bar height is frequency density (frequency ÷ class width), so the wide classes do not look too big", { block: "Example 2" });
}
{
  const pts = [[0, 0], [10, 8], [15, 23], [20, 45], [30, 63], [50, 75]];
  const ax = D.axes({ x: [0, 50], y: [0, 80], xTicks: 10, yTicks: 10, w: 560, h: 400, xLabel: "time t (min)", yLabel: "cumulative frequency" });
  let b = ax.frame + ax.line(pts, { stroke: C.blue, width: 2.6 });
  for (const [x, y] of pts) b += ax.point(x, y);
  for (const [x, y, dx, dy] of [[10, 8, 8, 24], [15, 23, 8, 24], [20, 45, -50, -10], [30, 63, 8, 24], [50, 75, -70, -10]]) b += ax.tag(x, y, `(${x}, ${y})`, { dx, dy, size: 13 });
  b += ax.line([[0, 37.5], [50, 37.5]], { stroke: C.muted, width: 1.2, dash: "6 5" }) + ax.label(1, 37.5, "half of 75 = 37.5: median between 15 and 20", { dx: 4, dy: -6, size: 12.5, fill: C.muted });
  await fig("statistics/data-presentation", "cumulative-frequency-walking-times", D.svg(560, 400, b),
    "Cumulative frequency graph of the walking times of 75 learners, plotted at upper class boundaries: (0, 0), (10, 8), (15, 23), (20, 45), (30, 63) and (50, 75); half of the 75 learners, 37.5, is reached between 15 and 20 minutes.",
    "Figure: cumulative frequencies at the upper class boundaries rise to 75, the total number of learners", { heading: "## Cumulative frequency curves" });
}

// ---- series/binomial-expansion: Pascal's triangle rows 0 to 6
{
  const rows = [[1]];
  for (let i = 1; i <= 6; i += 1) { const p = rows[i - 1]; rows.push([1, ...p.slice(1).map((v, j) => v + p[j]), 1]); }
  let b = D.text(20, 24, "Pascal's triangle: each number is the sum of the two above it", { size: 14, weight: 600 });
  rows.forEach((r, i) => {
    const y = 66 + i * 40, hot = i === 4 || i === 6;
    b += D.text(40, y + 5, `n = ${i}`, { size: 13, fill: C.muted });
    r.forEach((v, j) => {
      const x = 250 + (j - i / 2) * 52;
      b += hot ? D.rect(x - 22, y - 16, 44, 30, { fill: i === 4 ? C.fillAmber : C.fillBlue, stroke: "none", r: 6 }) : "";
      b += D.text(x, y + 5, String(v), { anchor: "middle", size: 16, weight: hot ? 700 : 400 });
    });
  });
  b += D.text(392, 66 + 4 * 40 + 5, "(2 + x)⁴: 1, 4, 6, 4, 1", { size: 13, fill: C.amber, weight: 600 }) + D.text(440, 66 + 6 * 40 + 5, "(1 + 2x)⁶: 1, 6, 15, 20, …", { size: 12.5, fill: C.blue, weight: 600 });
  await fig("series/binomial-expansion", "pascal-triangle-rows-0-to-6", D.svg(640, 330, b),
    "Pascal's triangle for n = 0 to 6: row 4 is 1, 4, 6, 4, 1 (the coefficients of (2 + x)^4) and row 6 is 1, 6, 15, 20, 15, 6, 1 (the first four coefficients used for (1 + 2x)^6); each number is the sum of the two above it.",
    "Figure: row n gives the coefficients of (a + b)ⁿ; rows 4 and 6 are used in Examples 1 and 4", { block: "Example 1" });
}

// ---- quadratics/solving Example 2: x^2 - 8x + 13 = 0, roots 4 +- sqrt 3
{
  const f = (x) => x * x - 8 * x + 13;
  const s3 = Math.sqrt(3);
  const ax = D.axes({ x: [0, 8], y: [-4, 14], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f) + ax.point(4 - s3, 0, { fill: "#fff", stroke: C.red }) + ax.point(4 + s3, 0, { fill: "#fff", stroke: C.red }) + ax.point(4, -3) + ax.line([[4, -4], [4, 14]], { stroke: C.muted, width: 1.2, dash: "6 5" }) +
    ax.tag(4 - s3, 0, "4 − √3 ≈ 2.27", { dx: -128, dy: -14, size: 13, fill: C.red }) + ax.tag(4 + s3, 0, "4 + √3 ≈ 5.73", { dx: 8, dy: -14, size: 13, fill: C.red }) +
    ax.tag(4, -3, "minimum (4, −3)", { dx: 8, dy: -4, size: 13 }) + ax.tag(0.1, 13, "y = x² − 8x + 13", { dx: 40, dy: -4, size: 13, fill: C.blue });
  await fig("quadratics/solving", "quadratic-solving-roots-graph", D.svg(540, 400, body),
    "Graph of y = x^2 - 8x + 13 with its minimum at (4, -3) and x-intercepts at 4 - sqrt 3, about 2.27, and 4 + sqrt 3, about 5.73, the two solutions found by completing the square: (x - 4)^2 = 3.",
    "Figure: the solutions of x² − 8x + 13 = 0 are where the parabola crosses the x-axis, symmetrical about x = 4", { block: "Example 2" });
}
console.log("stats2 done");
