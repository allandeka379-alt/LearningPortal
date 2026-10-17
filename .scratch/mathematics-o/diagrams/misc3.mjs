import { D, fig, place, C, T, ln, dt, poly, numberLine } from "./lib2.mjs";

// ---- Basic probability: the probability scale
{
  const w = 560, h = 200, x0 = 40, x1 = 520, y = 130;
  const X = (p) => x0 + p * (x1 - x0);
  let b = D.line(x0 - 6, y, x1 + 6, y, { stroke: C.axis, width: 2.4 });
  for (const [p, lab] of [[0, "0"], [0.5, "½"], [1, "1"]]) b += D.line(X(p), y - 12, X(p), y + 12, { stroke: C.axis, width: 2.4 }) + D.text(X(p), y + 32, lab, { anchor: "middle", size: 17, weight: 700 });
  b += D.text(X(0), y + 54, "impossible", { anchor: "middle", size: 13, fill: C.muted }) + D.text(X(0.5), y + 54, "even chance", { anchor: "middle", size: 13, fill: C.muted }) + D.text(X(1), y + 54, "certain", { anchor: "middle", size: 13, fill: C.muted });
  const ev = [
    [0, "dice shows 7: 0", 44],
    [1 / 6, "dice shows 6: 1/6", 96],
    [0.5, "coin lands heads: 1/2", 44],
    [5 / 6, "dice shows more than 1: 5/6", 96],
    [1, "dice shows less than 7: 1", 44],
  ];
  b += D.text(x0, 20, "unlikely", { size: 14, fill: C.blue, weight: 700 }) + D.text(x1, 20, "likely", { anchor: "end", size: 14, fill: C.blue, weight: 700 });
  ev.forEach(([p, t, ty], i) => {
    b += D.dot(X(p), y, { r: 6, stroke: C.red }) + D.line(X(p), y - 8, X(p), ty + 8, { stroke: C.muted, width: 1, dash: true });
    const ax = i === 0 ? "start" : i === 4 ? "end" : "middle";
    b += D.text(X(p) + (i === 0 ? -6 : i === 4 ? 6 : i === 3 ? -28 : 0), ty, t, { anchor: ax, size: 13, fill: C.ink });
  });
  const alt = "The probability scale from 0 (impossible) through 1/2 (even chance) to 1 (certain), with events marked: a dice showing 7 is 0, a 6 is 1/6, heads is 1/2, a number greater than 1 is 5/6 and a number less than 7 is 1.";
  const cap = "Figure: events placed on the probability scale";
  await fig("probability-scale-events", b, w, h, alt, cap);
  place("probability/basic-probability", "## The probability scale", "probability-scale-events", alt, cap);
}

/** Two-set Venn diagram. regions: onlyA, both, onlyB, neither. */
function venn({ nameA, nameB, totA, totB, onlyA, both, onlyB, neither, universe, highlight }) {
  const w = 480, h = 290;
  const ca = [190, 160], cb = [290, 160], r = 92;
  let b = D.rect(20, 28, 440, 245, { stroke: C.axis, width: 2 });
  b += D.text(30, 50, `ℰ = ${universe}`, { size: 15, weight: 700 });
  const fillA = highlight === "A" ? C.fillAmber : highlight === "B" ? "none" : C.fillBlue;
  const fillB = highlight === "B" ? C.fillAmber : highlight === "A" ? "none" : C.fillGreen;
  b += D.circle(ca[0], ca[1], r, { fill: fillA, stroke: C.blue, width: 2.6 }) + D.circle(cb[0], cb[1], r, { fill: fillB, stroke: C.green, width: 2.6 });
  b += D.circle(ca[0], ca[1], r, { fill: "none", stroke: C.blue, width: 2.6 }) + D.circle(cb[0], cb[1], r, { fill: "none", stroke: C.green, width: 2.6 });
  b += D.text(ca[0] - 50, ca[1] - r - 6 + 4, `${nameA} (${totA})`, { anchor: "middle", size: 16, weight: 700, fill: C.blue }).replace("", "");
  b += D.text(cb[0] + 50, cb[1] - r - 6 + 4, `${nameB} (${totB})`, { anchor: "middle", size: 16, weight: 700, fill: C.green });
  b += D.text(ca[0] - 42, ca[1] + 8, String(onlyA), { anchor: "middle", size: 22, weight: 700 }) + D.text((ca[0] + cb[0]) / 2, ca[1] + 8, String(both), { anchor: "middle", size: 22, weight: 700 }) + D.text(cb[0] + 42, cb[1] + 8, String(onlyB), { anchor: "middle", size: 22, weight: 700 });
  b += D.text(430, 258, String(neither), { anchor: "end", size: 22, weight: 700 });
  return { svg: b, w, h };
}

// ---- Combined events: subject choices (Example 3)
{
  const v = venn({ nameA: "G", nameB: "H", totA: 18, totB: 14, onlyA: 13, both: 5, onlyB: 9, neither: 3, universe: 30 });
  const alt = "Venn diagram of 30 learners: Geography only 13, both subjects 5, History only 9 and neither 3, so P(Geography only) = 13/30 and P(G or H) = 27/30 = 9/10.";
  const cap = "Figure: fill in the overlap first, then each region and the outside";
  await fig("venn-geography-history-30", v.svg.replace("", ""), 480, 290, alt, cap);
  place("probability/combined-events", ":::worked-solution[Example 3", "venn-geography-history-30", alt, cap, { before: true });
}
// ---- Conditional probability: tea and coffee (Example 2)
{
  const v = venn({ nameA: "T", nameB: "C", totA: 28, totB: 20, onlyA: 20, both: 8, onlyB: 12, neither: 10, universe: 50, highlight: "B" });
  const alt = "Venn diagram of 50 people: tea only 20, both 8, coffee only 12 and neither 10; given that a person drinks coffee, only the circle C (20 people) counts, and 8 of them also drink tea, so the probability is 8/20 = 2/5.";
  const cap = "Figure: given coffee, only the shaded circle C (20 people) is possible";
  await fig("venn-tea-coffee-given-coffee", v.svg, 480, 290, alt, cap);
  place("probability/conditional-probability", ":::worked-solution[Example 2", "venn-tea-coffee-given-coffee", alt, cap, { before: true });
}

// ---- Determinant and inverse: unique solution versus singular matrix (parallel lines)
{
  const mk = (lines, pt, ptLabel, title, sub) => {
    const ax = D.axes({ x: [0, 8], y: [0, 6], xTicks: 2, yTicks: 2, w: 270, h: 250, pad: { l: 34, r: 14, t: 22, b: 40 }, xLabel: "x", yLabel: "y" });
    let s = ax.frame;
    lines.forEach((l) => (s += ax.line(l.pts, { stroke: l.stroke, width: 2.6 })));
    if (pt) s += ax.point(...pt, { stroke: C.red, r: 5 }) + ax.tag(pt[0] + 0.1, pt[1] - 0.2, ptLabel, { size: 13, fill: C.red, dx: 8, dy: 24 });
    return s + D.text(135, 282, title, { anchor: "middle", size: 14, weight: 700 }) + D.text(135, 300, sub, { anchor: "middle", size: 13, fill: C.muted });
  };
  // 2x + 3y = 12 through (0,4) and (6,0); x + 2y = 7 through (1,3) and (7,0)
  const left = mk([{ pts: [[0, 4], [6, 0]], stroke: C.blue, tag: [3.9, 2.0], label: "2x + 3y = 12" }, { pts: [[0, 3.5], [7, 0]], stroke: C.amber, tag: [3.6, 3.9], label: "x + 2y = 7" }], [3, 2], "(3, 2)", "det = 1: one solution", "blue 2x + 3y = 12, orange x + 2y = 7");
  // singular: x + 2y = 7 and 2x + 4y = 6 (parallel, det 0)
  const right = mk([{ pts: [[0, 3.5], [7, 0]], stroke: C.amber, tag: [3.6, 3.9], label: "x + 2y = 7" }, { pts: [[0, 1.5], [3, 0]], stroke: C.blue, tag: [3.2, 1.3], label: "2x + 4y = 6" }], null, "", "det = 0: parallel, no solution", "orange x + 2y = 7, blue 2x + 4y = 6");
  const b = D.group(left, { translate: [0, 0] }) + D.group(right, { translate: [285, 0] });
  const alt = "Two graphs of simultaneous equations: 2x + 3y = 12 and x + 2y = 7 have determinant 1 and cross at the single point (3, 2); x + 2y = 7 and 2x + 4y = 6 have determinant 0 (a singular matrix) and are parallel lines with no solution.";
  const cap = "Figure: a non-zero determinant gives one crossing point, a zero determinant gives parallel lines";
  await fig("determinant-lines-unique-or-parallel", b, 560, 310, alt, cap);
  place("matrices/determinant-and-inverse", "If the matrix of coefficients is singular", "determinant-lines-unique-or-parallel", alt, cap);
}

// ---- Differentiation: y = x^3 - 3x^2 - 9x + 5 stationary points
{
  const f = (x) => x ** 3 - 3 * x ** 2 - 9 * x + 5;
  const ax = D.axes({ x: [-3, 5], y: [-25, 15], xTicks: 1, yTicks: 5, xLabel: "x", yLabel: "y", w: 540, h: 420 });
  let b = ax.frame + ax.plot(f, { stroke: C.blue });
  b += ax.line([[-2.4, 10], [0.4, 10]], { stroke: C.amber, width: 2, dash: "6 4" }) + ax.line([[2.0, -22], [4.4, -22]], { stroke: C.amber, width: 2, dash: "6 4" });
  b += ax.point(-1, 10, { stroke: C.red, r: 5 }) + ax.point(3, -22, { stroke: C.red, r: 5 });
  b += ax.tag(0.4, 12.6, "maximum (−1, 10)", { fill: C.red }) + ax.tag(3.2, -19.0, "minimum (3, −22)", { fill: C.red, dx: 8 });
  b += ax.tag(0.4, 5.6, "gradient 0", { size: 13, fill: C.amber, dx: 10 }).replace("", "") + ax.tag(3.4, -24.4, "gradient 0", { size: 13, fill: C.amber, dx: 0 }).replace("", "");
  b += ax.tag(-2.9, -17, "y = x³ − 3x² − 9x + 5", { fill: C.blue });
  const alt = "Graph of y = x³ − 3x² − 9x + 5: the curve rises to a maximum at (−1, 10) and falls to a minimum at (3, −22); the tangents there are horizontal, so dy/dx = 3x² − 6x − 9 = 0 at x = −1 and x = 3.";
  const cap = "Figure: stationary points are where the tangent is horizontal (gradient 0)";
  await fig("differentiation-stationary-points-cubic", b, 540, 420, alt, cap);
  place("calculus/differentiation", "### Maximum or minimum?", "differentiation-stationary-points-cubic", alt, cap);
}
// ---- Differentiation: goat pen A = 40x - 2x^2
{
  const f = (x) => 40 * x - 2 * x * x;
  const ax = D.axes({ x: [0, 20], y: [0, 240], xTicks: 5, yTicks: 40, xLabel: "x (m)", yLabel: "A (m²)", w: 540, h: 380, pad: { l: 64, r: 28, t: 40, b: 56 } });
  let b = ax.frame + ax.plot(f, { stroke: C.blue }) + ax.guides(10, 200) + ax.point(10, 200, { stroke: C.red, r: 5 });
  b += ax.tag(10.4, 214, "maximum: x = 10, A = 200", { fill: C.red, dx: 4 }) + ax.tag(12, 236, "A = 40x − 2x²", { fill: C.blue });
  const alt = "Graph of the pen area A = 40x − 2x² against the width x: the curve peaks at x = 10 m where A = 200 m², where dA/dx = 40 − 4x = 0, so the largest pen is 10 m wide and 20 m long.";
  const cap = "Figure: the area is greatest where the gradient is zero";
  await fig("differentiation-goat-pen-area", b, 540, 380, alt, cap);
  place("calculus/differentiation", ":::worked-solution[Example 4", "differentiation-goat-pen-area", alt, cap, { before: true });
}

// ---- Practical graphs: conversion graphs
{
  const a1 = D.axes({ x: [0, 50], y: [0, 900], xTicks: 10, yTicks: 150, xLabel: "US$", yLabel: "rand (R)", w: 270, h: 320, pad: { l: 52, r: 14, t: 44, b: 50 } });
  let s1 = a1.frame + a1.line([[0, 0], [50, 900]], { stroke: C.blue }) + a1.guides(25, 450, { stroke: C.red }) + a1.point(25, 450, { stroke: C.red, r: 5 });
  s1 += a1.tag(26, 330, "R450 = US$25", { fill: C.red, size: 13, dx: 6, dy: 0 }).replace("", "") + a1.tag(3, 820, "R = 18 × US$", { fill: C.blue, size: 13 });
  const a2 = D.axes({ x: [0, 100], y: [0, 220], xTicks: 20, yTicks: 40, xLabel: "°C", yLabel: "°F", w: 270, h: 320, pad: { l: 46, r: 14, t: 44, b: 50 } });
  let s2 = a2.frame + a2.line([[0, 32], [100, 212]], { stroke: C.blue }) + a2.guides(25, 77, { stroke: C.red }) + a2.point(25, 77, { stroke: C.red, r: 5 }) + a2.point(0, 32, { stroke: C.ink });
  s2 += a2.tag(30, 60, "25°C = 77°F", { fill: C.red, size: 13, dx: 4 }) + a2.tag(3, 195, "F = 1.8C + 32", { fill: C.blue, size: 13 }) + a2.tag(3, 28, "(0, 32)", { size: 13, dx: 22, dy: -4 }).replace("", "");
  const b = D.group(s1, { translate: [0, 0] }) + D.group(s2, { translate: [285, 0] });
  const alt = "Two conversion graphs: dollars to rand at R18 per dollar is a straight line through the origin (R450 reads as US$25, gradient 18); Celsius to Fahrenheit is a straight line from (0, 32) to (100, 212) with gradient 1.8, F = 1.8C + 32, so 25°C is 77°F.";
  const cap = "Figure: the gradient of a conversion graph is the rate; the second line does not pass through the origin";
  await fig("practical-conversion-graphs", b, 560, 320, alt, cap);
  place("graphs/practical-graphs", "The gradient of this graph is $\\frac{900}{50} = 18$", "practical-conversion-graphs", alt, cap);
}

// ---- Practical graphs: filling containers
{
  const w = 560, h = 336;
  const cols = [
    { name: "cylinder", x: 5, prof: (cx) => D.polyline([[cx - 30, 20], [cx - 30, 110], [cx + 30, 110], [cx + 30, 20]], { width: 2.6 }), f: (t) => t, desc: "straight line" },
    { name: "wider at the top", x: 192, prof: (cx) => D.polyline([[cx - 22, 110], [cx - 48, 20], [cx + 48, 20], [cx + 22, 110], [cx - 22, 110]], { width: 2.6 }), f: (t) => Math.sqrt(t), desc: "less and less steep" },
    { name: "narrower at the top", x: 379, prof: (cx) => D.polyline([[cx - 48, 110], [cx - 14, 20], [cx + 14, 20], [cx + 48, 110], [cx - 48, 110]], { width: 2.6 }), f: (t) => t * t, desc: "steeper and steeper" },
  ];
  let b = "";
  for (const c of cols) {
    const cx = c.x + 90;
    b += c.prof(cx) + D.text(cx, 134, c.name, { anchor: "middle", size: 14, weight: 700 });
    const ax = D.axes({ x: [0, 1], y: [0, 1], w: 180, h: 170, pad: { l: 26, r: 10, t: 6, b: 26 }, xTicks: [], yTicks: [], grid: false, tickLabels: false, xLabel: "time", yLabel: "" });
    let g = ax.frame + ax.plot(c.f, { stroke: C.blue, domain: [0, 1] }) + D.text(34, 12, "depth", { size: 13, weight: 600 });
    b += D.group(g, { translate: [c.x, 150] }) + D.text(cx, 152 + 6, "", {});
    b += D.text(cx, 328, c.desc, { anchor: "middle", size: 13, fill: C.muted });
  }
  const alt = "Three containers filled at a constant rate, with the depth-time graph beneath each: a cylinder gives a straight line, a container that widens towards the top gives a curve that gets less steep, and one that narrows towards the top gives a curve that gets steeper.";
  const cap = "Figure: the shape of the container decides the shape of the depth-time graph";
  await fig("practical-filling-containers", b, w, h, alt, cap);
  place("graphs/practical-graphs", "## Filling containers", "practical-filling-containers", alt, cap);
}
