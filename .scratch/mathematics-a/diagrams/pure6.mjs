// Run from the repo root: node .scratch/mathematics-a/diagrams/pure6.mjs
import { D, C, fig, PI } from "./_h.mjs";
const P = { r: 44, b: 44 };

// probability/conditional Example 1: two sweets without replacement
{
  const w = 560, h = 380;
  const root = [40, 190], l1 = [[230, 100, "O", "8/12"], [230, 280, "L", "4/12"]];
  const l2 = [[430, 50, "O", "7/11", "OO", "56/132"], [430, 150, "L", "4/11", "OL", "32/132"], [430, 230, "O", "8/11", "LO", "32/132"], [430, 330, "L", "3/11", "LL", "12/132"]];
  let b = "";
  l1.forEach(([x, y, n, p], i) => {
    b += D.line(root[0], root[1], x, y, { stroke: C.blue, width: 2.2 }) + D.dot(x, y) + D.tag((root[0] + x) / 2 + 14, (root[1] + y) / 2 + (i ? 20 : -2), p, { size: 14, anchor: "middle" }) + D.text(x + 10, y + (i ? 24 : -10), n, { size: 15, weight: 700, fill: C.blue });
  });
  l2.forEach(([x, y, n, p, out, pr], i) => {
    const src = l1[i < 2 ? 0 : 1];
    b += D.line(src[0], src[1], x, y, { stroke: C.amber, width: 2.2 }) + D.dot(x, y) + D.tag((src[0] + x) / 2 + 14, (src[1] + y) / 2 + (i % 2 ? 22 : -2), p, { size: 14, anchor: "middle" }) + D.text(x + 12, y + 5, `${out}: ${pr}`, { size: 14 });
  });
  b += D.dot(root[0], root[1]) + D.text(20, 40, "1st sweet", { size: 13, fill: C.muted }) + D.text(205, 40, "2nd sweet", { size: 13, fill: C.muted }) + D.text(405, 18, "outcome: probability", { size: 13, fill: C.muted }) +
    D.text(20, 366, "O = orange, L = lemon; 12 sweets (8 O, 4 L), no replacement", { size: 13, fill: C.muted });
  await fig("probability/conditional", "tree-diagram-sweets-no-replacement", D.svg(w, h, b),
    "Tree diagram for two sweets taken without replacement from 8 orange and 4 lemon: the first-stage branches are 8/12 and 4/12; after an orange the second branches are 7/11 and 4/11, after a lemon 8/11 and 3/11; the four outcomes OO, OL, LO and LL have probabilities 56/132, 32/132, 32/132 and 12/132.",
    "Figure: multiply along each path; the second-stage probabilities change because there is no replacement", { block: "Example 1" });
}

// probability/events-rules Example 3: Venn diagram, 30 learners, B = 17, C = 12, both = 6
{
  const w = 520, h = 320, cy = 160, r = 95, bx = 195, cx = 325;
  const b = D.rect(20, 40, 480, 250, { stroke: C.ink, width: 2 }) + D.text(490, 282, "30 learners in total", { size: 13, fill: C.muted, anchor: "end" }) +
    D.circle(bx, cy, r, { stroke: C.blue, width: 2.6 }) + D.circle(cx, cy, r, { stroke: C.amber, width: 2.6 }) +
    D.text(bx - 70, cy - r - 8, "Biology (17)", { size: 15, weight: 700, fill: C.blue, anchor: "middle" }) + D.text(cx + 70, cy - r - 8, "Chemistry (12)", { size: 15, weight: 700, fill: C.amber, anchor: "middle" }) +
    D.text(bx - 52, cy + 8, "11", { size: 24, anchor: "middle", weight: 700 }) + D.text((bx + cx) / 2, cy + 8, "6", { size: 24, anchor: "middle", weight: 700 }) + D.text(cx + 52, cy + 8, "6", { size: 24, anchor: "middle", weight: 700 }) +
    D.text(60, 260, "7", { size: 24, anchor: "middle", weight: 700 }) + D.text(60, 280, "neither", { size: 13, anchor: "middle", fill: C.muted }) + D.text(bx - 52, cy + 30, "Biology only", { size: 12, anchor: "middle", fill: C.muted }) + D.text(cx + 52, cy + 30, "Chem. only", { size: 12, anchor: "middle", fill: C.muted }) + D.text((bx + cx) / 2, cy + 30, "both", { size: 12, anchor: "middle", fill: C.muted });
  await fig("probability/events-rules", "venn-biology-chemistry", D.svg(w, h, b),
    "Venn diagram of 30 learners: 11 take Biology only, 6 take both Biology and Chemistry, 6 take Chemistry only and 7 take neither; the Biology circle totals 17 and the Chemistry circle totals 12.",
    "Figure: fill the Venn diagram from the middle outwards: 6, then 11 and 6, then 7 outside", { block: "Example 3" });
}

// bivariate/regression-correlation Example 1: rainfall and maize yield
{
  const xs = [4.2, 5.0, 5.8, 6.1, 6.9, 7.4, 8.0, 8.6], ys = [2.1, 2.6, 2.9, 3.4, 3.6, 4.1, 4.3, 4.8];
  const a = -0.4447, bb = 0.6030;
  const ax = D.axes({ pad: P, x: [3, 10], y: [1.5, 5.5], xTicks: 1, yTicks: 0.5, w: 560, h: 400, xLabel: "rainfall x (hundreds of mm)", yLabel: "yield y (t/ha)", origin: false });
  const body = ax.frame + ax.line([[4, a + bb * 4], [9, a + bb * 9]], { stroke: C.amber, width: 2.4 }) + xs.map((x, i) => ax.point(x, ys[i], { stroke: C.blue, r: 4.5 })).join("") +
    ax.point(6.5, 3.475, { stroke: C.red, r: 5.5 }) + ax.tag(6.5, 3.475, "mean point (6.5, 3.475)", { dx: 12, dy: 30, size: 13, fill: C.red }) +
    ax.guides(7, a + bb * 7) + ax.tag(7, a + bb * 7, "x = 7: y ≈ 3.78", { dx: 14, dy: 10, size: 13 }) + ax.label(4.2, 5.2, "y = −0.445 + 0.603x", { fill: C.amber, weight: 700, size: 14 });
  await fig("bivariate/regression-correlation", "scatter-rainfall-yield-regression", D.svg(560, 400, body),
    "Scatter diagram of rainfall and maize yield for eight farms with the regression line y = -0.445 + 0.603x: the points lie close to the line, which passes through the mean point (6.5, 3.475) and predicts a yield of about 3.78 tonnes per hectare at x = 7.",
    "Figure: the regression line y = −0.445 + 0.603x passes through the mean point (6.5, 3.475)", { block: "Example 1" });
}

// normal/probabilities Example 1: X ~ N(165, 64), P(153 < X < 171) = 0.7066
{
  const mu = 165, sd = 8, pdf = (x) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * PI));
  const ax = D.axes({ pad: P, x: [133, 197], y: [0, 0.055], xTicks: [141, 149, 157, 165, 173, 181, 189], yTicks: [], w: 560, h: 340, xLabel: "height (cm)", grid: false, origin: false, arrows: false });
  const body = ax.frame + ax.area(pdf, null, [153, 171], { fill: C.fillBlue }) + ax.plot(pdf, { domain: [133, 197] }) +
    ax.line([[165, 0], [165, pdf(165)]], { stroke: C.muted, width: 1.4, dash: true }) + ax.line([[153, 0], [153, pdf(153)]], { stroke: C.blue, width: 1.6 }) + ax.line([[171, 0], [171, pdf(171)]], { stroke: C.blue, width: 1.6 }) +
    ax.tag(165, 0.02, "P = 0.7066", { dx: -45, dy: 0, fill: C.blue }) + ax.tag(153, pdf(153), "153: z = −1.5", { dx: -118, dy: -6, size: 13 }) + ax.tag(171, pdf(171), "171: z = 0.75", { dx: 10, dy: -6, size: 13 }) + ax.label(165, pdf(165), "μ = 165", { anchor: "middle", dy: -8, size: 13, fill: C.muted });
  await fig("normal/probabilities", "normal-area-between-two-heights", D.svg(560, 340, body),
    "Normal curve for heights X ~ N(165, 64) with the area between 153 cm (z = -1.5) and 171 cm (z = 0.75) shaded: the shaded area is the probability 0.7066.",
    "Figure: P(153 < X < 171) is the shaded area, 0.7066", { block: "Example 1" });
}

// normal/probabilities Example 2: X ~ N(330, 2.5^2), P(X < 326) = 0.0548
{
  const mu = 330, sd = 2.5, pdf = (x) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * PI));
  const ax = D.axes({ pad: P, x: [322, 338], y: [0, 0.18], xTicks: [322, 324, 326, 328, 330, 332, 334, 336, 338], yTicks: [], w: 560, h: 320, xLabel: "volume (ml)", grid: false, origin: false, arrows: false });
  const body = ax.frame + ax.area(pdf, null, [322, 326], { fill: C.fillAmber }) + ax.plot(pdf, { domain: [322, 338] }) + ax.line([[326, 0], [326, pdf(326)]], { stroke: C.amber, width: 1.8 }) + ax.line([[330, 0], [330, pdf(330)]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.tag(322.3, 0.115, "P = 0.0548 (shaded)", { fill: C.amber }) + ax.line([[323.4, 0.105], [324.6, 0.016]], { stroke: C.amber, width: 1.2 }) + ax.tag(326, 0.03, "326: z = −1.6", { dx: 8, dy: 0, size: 13 }) + ax.label(330, pdf(330), "μ = 330", { anchor: "middle", dy: -8, size: 13, fill: C.muted });
  await fig("normal/probabilities", "normal-lower-tail-underweight-cans", D.svg(560, 320, body),
    "Normal curve for can volumes X ~ N(330, 2.5 squared) with the lower tail below 326 ml (z = -1.6) shaded: this is the probability that a can is underweight, 0.0548.",
    "Figure: the shaded lower tail, P(X < 326) = 0.0548", { block: "Example 2" });
}
