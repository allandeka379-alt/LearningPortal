// Run: node .scratch/mathematics-a/diagrams/mix5.mjs   (lessons are hand-written .md)
import { D, C, fig, PI } from "./_h.mjs";
const nf = (v, d = 2) => String(Math.round(v * 10 ** d) / 10 ** d).replace("-", "−");
const rad = (d) => (d * PI) / 180;

// ---- kinematics/calculus Example 1: s = t^3 - 6t^2 + 9t + 2
{
  const s = (t) => t ** 3 - 6 * t * t + 9 * t + 2;
  if (s(0) !== 2 || s(1) !== 6 || s(3) !== 2 || s(4) !== 6) throw new Error("s values");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 4.4], y: [0, 8], xTicks: 1, yTicks: 1, w: 540, h: 360, xLabel: "t (s)", yLabel: "s (m)" });
  const body = ax.frame + ax.plot(s, { domain: [0, 4.3] }) + ax.line([[0, 6], [4.4, 6]], { stroke: C.muted, width: 1.2, dash: true }) +
    [[0, 2], [1, 6], [3, 2], [4, 6]].map(([a, b]) => ax.point(a, b, { stroke: C.red })).join("") +
    ax.tag(1, 6, "t = 1: at rest, s = 6", { dx: 10, dy: -14, size: 13 }) + ax.tag(3, 2, "t = 3: at rest, s = 2", { dx: -70, dy: 36, size: 13 }) +
    ax.tag(0, 2, "s(0) = 2", { dx: 12, dy: 28, size: 13 }) + ax.tag(4, 6, "s(4) = 6", { dx: -86, dy: -14, size: 13 });
  const note = D.text(70, 352, "Distance in 4 s: 4 + 4 + 4 = 12 m, but displacement = 6 − 2 = 4 m", { size: 13, fill: C.blue });
  await fig("kinematics/calculus", "displacement-time-cubic-turns", D.svg(540, 365, body + note),
    "Displacement-time graph of s = t³ − 6t² + 9t + 2: the particle starts at s = 2, is at rest (turning) at t = 1 with s = 6 and at t = 3 with s = 2, and reaches s = 6 at t = 4; each of the three stages is 4 m, so the distance is 12 m but the displacement is 4 m.",
    "Figure: the turning points t = 1 and t = 3 show why distance (12 m) is more than displacement (4 m)", { block: "Example 1" });
}

// ---- kinematics/calculus Example 3: v = 0.6t^2 - 0.04t^3
{
  const v = (t) => 0.6 * t * t - 0.04 * t ** 3;
  const area = 0.2 * 15 ** 3 - 0.01 * 15 ** 4;
  if (Math.abs(v(10) - 20) > 1e-9 || Math.abs(v(15)) > 1e-9 || Math.abs(area - 168.75) > 1e-9) throw new Error("v values");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 16], y: [0, 24], xTicks: 2, yTicks: 4, w: 540, h: 360, xLabel: "t (s)", yLabel: "v (m/s)" });
  const body = ax.frame + ax.area(v, null, [0, 15], { fill: C.fillBlue }) + ax.plot(v, { domain: [0, 15.6] }) + ax.guides(10, 20) + ax.point(10, 20, { stroke: C.red, r: 5 }) + ax.point(15, 0, { stroke: C.red }) +
    ax.tag(10, 20, "greatest speed (10, 20)", { dx: -190, dy: -6, size: 13, fill: C.red }) + ax.tag(15, 0, "v = 0 at t = 15", { dx: -128, dy: -30, size: 13, fill: C.red }) +
    ax.tag(8, 8, "area = distance = 168.75 m", { dx: -30, size: 13, fill: C.blue });
  await fig("kinematics/calculus", "velocity-time-cubic-area", D.svg(540, 360, body),
    "Velocity-time graph of v = 0.6t² − 0.04t³ for 0 to 15 s: the particle starts and ends at rest, its greatest speed is 20 m/s at t = 10 (where a = 0), and the shaded area under the curve, the integral from 0 to 15, is the distance 168.75 m.",
    "Figure: the area under the velocity–time curve is the distance travelled, 168.75 m", { block: "Example 3" });
}

// ---- kinematics/vector-motion Example 3: paths cross at (7, 7) but at different times
{
  const P = (t) => [1 + 3 * t, 5 + t], Q = (t) => [13 - 2 * t, -5 + 4 * t];
  if (P(2).join() !== "7,7" || Q(3).join() !== "7,7") throw new Error("cross");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 15], y: [-6, 12], xTicks: 1, yTicks: 2, w: 540, h: 400, origin: false, xLabel: "x (east)", yLabel: "y (north)" });
  const mark = (f, ts, col, dxy, pre) => ts.map((t) => ax.point(...f(t), { stroke: col, r: 4 }) + ax.label(...f(t), pre + t, { dx: dxy[0], dy: dxy[1], size: 12, fill: col, anchor: "middle" })).join("");
  const body = ax.frame + ax.line([P(0), P(4)], { stroke: C.blue, width: 2.4 }) + ax.line([Q(0), Q(3.5)], { stroke: C.amber, width: 2.4 }) +
    mark(P, [0, 1, 3, 4], C.blue, [0, -12], "t=") + mark(Q, [0, 1, 2], C.amber, [26, 5], "t=") +
    ax.point(7, 7, { stroke: C.red, r: 6 }) + ax.tag(1.8, 1.9, "paths cross at (7, 7)", { size: 13, fill: C.red }) +
    ax.tag(1.8, 0.4, "P is there at t = 2, Q at t = 3", { size: 13, fill: C.red }) +
    ax.label(1, 5, "P", { dx: -26, dy: 5, weight: 700, fill: C.blue, size: 16 }) + ax.label(13, -5, "Q", { dx: 40, dy: 5, weight: 700, fill: C.amber, size: 16 });
  await fig("kinematics/vector-motion", "paths-cross-no-collision", D.svg(540, 400, body),
    "Paths of two particles on an x-y plane: P moves from (1, 5) with velocity (3, 1) and Q from (13, -5) with velocity (-2, 4); the paths cross at (7, 7), but P is there at t = 2 and Q at t = 3, so they do not collide.",
    "Figure: the paths cross at (7, 7), but the particles are there at different times (t = 2 and t = 3)", { block: "Example 3" });
}

// ---- trig/compound-double-angle Example 2: A + B on the unit circle
{
  const A = Math.asin(3 / 5), B = Math.acos(5 / 13), AB = A + B;
  if (Math.abs(Math.cos(AB) + 16 / 65) > 1e-9 || Math.abs(Math.sin(AB) - 63 / 65) > 1e-9) throw new Error("compound");
  const ax = D.axes({ pad: { l: 30, r: 30, t: 20, b: 40 }, x: [-1.25, 1.25], y: [-0.15, 1.15], xTicks: [-1, -0.5, 0.5, 1], yTicks: [0.5, 1], w: 540, h: 312, tickLabels: true });
  const arc = (r, a0, a1) => { const pts = []; for (let i = 0; i <= 40; i += 1) { const a = a0 + ((a1 - a0) * i) / 40; pts.push([r * Math.cos(a), r * Math.sin(a)]); } return ax.line(pts, { stroke: C.ink, width: 1.6 }); };
  const pA = [Math.cos(A), Math.sin(A)], pAB = [Math.cos(AB), Math.sin(AB)];
  const body = ax.frame + ax.plot((x) => Math.sqrt(Math.max(0, 1 - x * x)), { domain: [-1, 1], stroke: C.muted, width: 1.6, steps: 400 }) +
    ax.line([[0, 0], pA], { stroke: C.blue, width: 2.6 }) + ax.line([[0, 0], pAB], { stroke: C.red, width: 2.6 }) + ax.point(...pA, { stroke: C.blue }) + ax.point(...pAB, { stroke: C.red }) +
    arc(0.26, 0, A) + arc(0.4, A, AB) + arc(0.55, 0, AB) +
    ax.label(0.3, 0.05, "A", { size: 14, weight: 700 }) + ax.label(0.14, 0.34, "B", { size: 14, weight: 700 }) + ax.label(0.36, 0.5, "A + B", { size: 13, weight: 700, dx: -2, dy: 0 }) +
    D.text(30, 338, "Blue point: (cos A, sin A) = (4/5, 3/5)", { size: 14, fill: C.blue }) +
    D.text(30, 360, "Red point: (cos(A + B), sin(A + B)) = (−16/65, 63/65)", { size: 14, fill: C.red });
  await fig("trig/compound-double-angle", "compound-angle-unit-circle", D.svg(540, 372, body),
    `Unit circle with a ray at angle A (sin A = 3/5, cos A = 4/5, A = ${nf((A * 180) / PI, 1)} degrees) and a ray at A + B where B adds ${nf((B * 180) / PI, 1)} degrees: the point at A + B is (−16/65, 63/65), so cos(A + B) = −16/65 is negative (A + B is obtuse, ${nf((AB * 180) / PI, 1)} degrees) and sin(A + B) = 63/65.`,
    "Figure: the coordinates of the point at angle A + B are (cos(A + B), sin(A + B)) = (−16/65, 63/65)", { block: "Example 2" });
}

// ---- algebra/indices-variation Example 4: C = 21 + 0.4 d
{
  const C_ = (d) => 21 + 0.4 * d;
  if (C_(60) !== 45 || Math.abs(C_(130) - 73) > 1e-9 || Math.abs(C_(200) - 101) > 1e-9) throw new Error("kombi");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 220], y: [0, 110], xTicks: 40, yTicks: 20, w: 540, h: 360, xLabel: "distance d (km)", yLabel: "charge C (US$)" });
  const body = ax.frame + ax.line([[0, 21], [220, C_(220)]], { stroke: C.blue, width: 2.6 }) + ax.line([[0, 21], [200, 21]], { stroke: C.muted, width: 1.2, dash: true }) +
    [[60, 45], [130, 73], [200, 101]].map(([a, b]) => ax.point(a, b)).join("") + ax.point(0, 21, { stroke: C.red, r: 5 }) +
    ax.tag(60, 45, "(60, 45)", { dx: 8, dy: 28, size: 13 }) + ax.tag(130, 73, "(130, 73)", { dx: 8, dy: 28, size: 13 }) + ax.tag(200, 101, "(200, 101)", { dx: -104, dy: -12, size: 13 }) +
    ax.tag(0, 21, "fixed charge a = 21", { dx: 12, dy: -14, size: 13, fill: C.red });
  await fig("algebra/indices-variation", "partial-variation-kombi-hire", D.svg(540, 360, body + ax.tag(80, 30, "C = 21 + 0.4d: gradient 0.4 US$ per km", { size: 13, fill: C.blue, dx: 20 })),
    "Partial variation C = 21 + 0.4d for a kombi hire: a straight line with intercept 21 (the fixed charge) and gradient 0.4 US dollars per km through (60, 45) and (130, 73); a 200 km trip costs US$101.",
    "Figure: partial variation is a straight line: the intercept 21 is the fixed part, the gradient 0.4 the part that varies with distance", { block: "Example 4" });
}

// ---- discrete/binomial Example 2: B(12, 0.3)
{
  const n = 12, p = 0.3;
  const choose = (a, b) => { let r = 1; for (let i = 1; i <= b; i += 1) r = (r * (a - b + i)) / i; return r; };
  const pmf = (k) => choose(n, k) * p ** k * (1 - p) ** (n - k);
  if (Math.abs(pmf(2) - 0.16779) > 1e-5 || Math.abs(pmf(3) - 0.2397) > 1e-4 || Math.abs(pmf(4) - 0.23114) > 1e-5) throw new Error("pmf");
  const total = pmf(2) + pmf(3) + pmf(4);
  const ax = D.axes({ pad: { r: 36, b: 50 }, x: [-0.6, 12.6], y: [0, 0.3], xTicks: 1, yTicks: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3], w: 560, h: 380, xLabel: "X (customers paying by mobile money)", yLabel: "P(X = k)" });
  let bars = "";
  for (let k = 0; k <= n; k += 1) {
    const hot = k >= 2 && k <= 4;
    bars += D.rect(ax.X(k - 0.4), ax.Y(pmf(k)), ax.X(k + 0.4) - ax.X(k - 0.4), ax.Y(0) - ax.Y(pmf(k)), { fill: hot ? C.fillAmber : C.fillBlue, stroke: hot ? C.amber : C.teal, width: 1.4 });
    if (pmf(k) > 0.004) bars += D.text(ax.X(k), ax.Y(pmf(k)) - 6, pmf(k).toFixed(3), { anchor: "middle", size: 11, fill: C.muted });
  }
  const body = ax.frame + bars + ax.tag(12.6, 0.27, "X ~ B(12, 0.3)", { anchor: "end", size: 13 }) +
    ax.tag(12.6, 0.2, `P(2 ≤ X ≤ 4) = 0.168 + 0.240 + 0.231 = ${total.toFixed(3)}`, { anchor: "end", size: 13, fill: C.amber });
  await fig("discrete/binomial", "binomial-12-03-bar-chart", D.svg(560, 380, body),
    `Bar chart of the binomial distribution B(12, 0.3): probabilities rise to a peak at X = 3 (0.240), the three bars for X = 2, 3 and 4 (0.168, 0.240, 0.231) are highlighted and sum to P(2 ≤ X ≤ 4) = ${total.toFixed(3)}, and the distribution is skewed to the right.`,
    "Figure: B(12, 0.3) peaks at 3; the highlighted bars X = 2, 3, 4 give P(2 ≤ X ≤ 4) = 0.639", { block: "Example 2" });
}

// ---- probability/bayes Example 1: tree for three machines
{
  const m = [["A", 0.5, 0.02], ["B", 0.3, 0.03], ["C", 0.2, 0.05]];
  const pD = m.reduce((s, [, p, d]) => s + p * d, 0);
  if (Math.abs(pD - 0.029) > 1e-12) throw new Error("pD");
  const ys = [60, 170, 280];
  let b = D.circle(40, 170, 4, { fill: C.ink });
  m.forEach(([name, p, d], i) => {
    const y = ys[i];
    b += D.line(40, 170, 190, y, { stroke: C.ink, width: 2 }) + D.tag(115, (170 + y) / 2 + 6, String(p), { anchor: "middle", size: 13 }) +
      D.node(190, y - 16, 44, 32, `${name}`, { fill: C.fillBlue, kind: "box", weight: 700, size: 15 }) +
      D.line(234, y, 360, y - 24, { stroke: C.ink, width: 2 }) + D.line(234, y, 360, y + 24, { stroke: C.ink, width: 2 }) +
      D.tag(300, y - 14, String(d), { anchor: "middle", size: 13, fill: C.amber }) + D.tag(300, y + 40, String(Math.round((1 - d) * 100) / 100), { anchor: "middle", size: 13 }) +
      D.rect(364, y - 38, 190, 28, { fill: C.fillAmber, stroke: C.amber, r: 6, width: 1.5 }) +
      D.text(372, y - 18, `D: ${p} × ${d} = ${(p * d).toFixed(3)}`, { size: 14, weight: 700 }) +
      D.text(372, y + 36, `not D: ${p} × ${Math.round((1 - d) * 100) / 100} = ${(p * (1 - d)).toFixed(3)}`, { size: 14, fill: C.muted });
  });
  b += D.text(20, 354, `P(D) = 0.010 + 0.009 + 0.010 = ${pD.toFixed(3)};  P(C | D) = 0.010 ÷ 0.029 = ${(0.01 / pD).toFixed(3)}`, { size: 14, fill: C.red });
  await fig("probability/bayes", "defective-bolts-tree-diagram", D.svg(560, 366, b),
    "Probability tree for three machines A, B, C making 50%, 30% and 20% of bolts with defect rates 0.02, 0.03 and 0.05: the defective branches have probabilities 0.010, 0.009 and 0.010 which total P(D) = 0.029, so P(C | D) = 0.010 ÷ 0.029 = 0.345.",
    "Figure: add the three D branches to get P(D) = 0.029; the share of machine C is 0.010 ÷ 0.029", { block: "Example 1" });
}

// ---- data/location-spread Example 1: box plot of airtime sales
{
  const data = [14, 9, 22, 17, 9, 31, 12, 19, 9, 26, 15].sort((a, b) => a - b);
  const med = data[5], q1 = data[2], q3 = data[8], mean = data.reduce((a, b) => a + b, 0) / data.length;
  if (data.join() !== "9,9,9,12,14,15,17,19,22,26,31" || med !== 15 || q1 !== 9 || q3 !== 22 || Math.abs(mean - 16.636) > 0.001) throw new Error("box");
  const ax = D.axes({ pad: { l: 30, r: 36, t: 20, b: 56 }, x: [0, 35], y: [0, 1], xTicks: 5, yTicks: [], w: 560, h: 260, xLabel: "airtime sales (US$)" });
  const yb = 0.5, hh = 0.2;
  const X = ax.X, Y = ax.Y;
  const stack = {}; let dots = "";
  data.forEach((v) => { stack[v] = (stack[v] ?? 0) + 1; dots += D.circle(X(v), Y(0.17) - (stack[v] - 1) * 11, 4.5, { fill: C.teal, stroke: C.blue, width: 1 }); });
  const body = ax.frame + dots + D.rect(X(q1), Y(yb + hh), X(q3) - X(q1), Y(yb - hh) - Y(yb + hh), { fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    D.line(X(med), Y(yb + hh), X(med), Y(yb - hh), { stroke: C.blue, width: 4 }) + D.line(X(9), Y(yb), X(q1), Y(yb), { stroke: C.blue, width: 2.5 }) + D.line(X(q3), Y(yb), X(31), Y(yb), { stroke: C.blue, width: 2.5 }) +
    D.line(X(9), Y(yb + 0.08), X(9), Y(yb - 0.08), { stroke: C.blue, width: 2.5 }) + D.line(X(31), Y(yb + 0.08), X(31), Y(yb - 0.08), { stroke: C.blue, width: 2.5 }) +
    D.text(X(mean) - 6, Y(yb) + 6, "×", { size: 18, weight: 700, fill: C.red }) +
    D.text(X(9), Y(yb + hh) - 28, "min = Q₁ = 9", { size: 13, anchor: "middle" }) + 
    D.text(X(med), Y(yb + hh) - 8, "median 15", { size: 13, anchor: "middle", weight: 700 }) + D.text(X(q3), Y(yb + hh) - 28, "Q₃ 22", { size: 13, anchor: "middle" }) + D.text(X(31), Y(yb + hh) - 28, "max 31", { size: 13, anchor: "middle" }) +
    D.text(X((med + q3) / 2), Y(yb) + 26, `× mean ${mean.toFixed(1)}`, { size: 13, fill: C.red, anchor: "middle" });
  await fig("data/location-spread", "box-plot-airtime-sales", D.svg(560, 260, body),
    "Box-and-whisker plot of 11 daily airtime sales: minimum 9, lower quartile 9, median 15, upper quartile 22 and maximum 31 dollars, so the interquartile range is 13; the mean 16.6 (marked with a cross) is slightly above the median, and the dots below show the 11 values with three days at 9.",
    "Figure: the box spans Q₁ = 9 to Q₃ = 22 (IQR 13) with the median at 15 and whiskers to 9 and 31", { block: "Example 1" });
}

// ---- series/binomial-positive: Pascal's triangle rows 0-7, row 4 highlighted
{
  const rows = [[1]];
  for (let r = 1; r <= 7; r += 1) { const p = rows[r - 1]; const row = [1]; for (let i = 1; i < r; i += 1) row.push(p[i - 1] + p[i]); row.push(1); rows.push(row); }
  if (rows[4].join() !== "1,4,6,4,1" || rows[7].join() !== "1,7,21,35,35,21,7,1") throw new Error("pascal");
  const w = 560, cx = 300, dx = 56, dy = 36, top = 36;
  let b = "";
  rows.forEach((row, r) => {
    const y = top + r * dy;
    b += D.text(40, y + 5, `row ${r}`, { size: 13, fill: C.muted });
    row.forEach((v, i) => {
      const x = cx + (i - r / 2) * dx;
      if (r === 4) b += D.rect(x - 20, y - 14, 40, 28, { fill: C.fillAmber, stroke: C.amber, r: 6, width: 1.5 });
      b += D.text(x, y + 5, String(v), { anchor: "middle", size: 15, weight: r === 4 ? 700 : 400 });
    });
  });
  b += D.text(20, top + 8 * dy + 10, "Each entry is the sum of the two above it; row n gives the coefficients of (a + b)ⁿ.", { size: 13 }) +
    D.text(20, top + 8 * dy + 32, "Row 4: 1, 4, 6, 4, 1 gives (2 + x)⁴ = 16 + 32x + 24x² + 8x³ + x⁴", { size: 13, fill: C.amber, weight: 700 });
  await fig("series/binomial-positive", "pascals-triangle-rows-0-7", D.svg(w, top + 8 * dy + 50, b),
    "Pascal's triangle for rows 0 to 7, each entry the sum of the two above it, with row 4 (1, 4, 6, 4, 1) highlighted: these are the coefficients used to expand (2 + x)⁴ = 16 + 32x + 24x² + 8x³ + x⁴, and row 7 is 1, 7, 21, 35, 35, 21, 7, 1.",
    "Figure: row n of Pascal's triangle gives the coefficients of (a + b)ⁿ; row 4 expands (2 + x)⁴", { heading: "## Pascal's triangle and the coefficients" });
}
