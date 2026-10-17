import { D, fig, place, C } from "./lib2.mjs";

// ---- Non-linear simultaneous: y = x^2 + x - 5 and y = 2x + 1
{
  const f = (x) => x * x + x - 5, g = (x) => 2 * x + 1;
  const ax = D.axes({ x: [-4, 5], y: [-6, 10], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 420 });
  let b = ax.frame + ax.plot(f, { stroke: C.blue }) + ax.plot(g, { stroke: C.amber });
  const P = [[3, 7], [-2, -3]];
  for (const [x, y] of P) b += ax.guides(x, y) + ax.point(x, y, { stroke: C.ink });
  b += ax.tag(3.2, 7.2, "(3, 7)") + ax.tag(-1.9, -3.2, "(−2, −3)", { dx: 0, dy: 22 });
  b += ax.tag(-3.9, 8.8, "y = x² + x − 5", { fill: C.blue }) + ax.tag(1.2, -4.2, "y = 2x + 1", { fill: C.amber });
  const alt = "The parabola y = x² + x − 5 and the straight line y = 2x + 1 cross at exactly two points, (3, 7) and (−2, −3), which are the two solutions of the simultaneous equations found from x² − x − 6 = 0.";
  await fig("nonlinear-line-parabola-intersect", b, 540, 420, alt, "Figure: the solutions are where the line meets the curve");
  place("algebra/non-linear-simultaneous-equations", "## Line and parabola", "nonlinear-line-parabola-intersect", alt, "Figure: the solutions are where the line meets the curve");
}

// ---- Non-linear simultaneous: number of solutions (two, one tangent, none)
{
  const panels = [
    { name: "two solutions", line: (x) => 2 * x + 1, f: (x) => x * x + x - 5, eq: "y = x² + x − 5, y = 2x + 1", y: [-6, 10], x: [-3, 4] },
    { name: "one (tangent)", line: (x) => 4 * x - 4, f: (x) => x * x, eq: "y = x², y = 4x − 4", y: [-2, 10], x: [-1, 5] },
    { name: "none", line: () => -2, f: (x) => x * x, eq: "y = x², y = −2", y: [-4, 8], x: [-3, 3] },
  ];
  let b = "";
  panels.forEach((p, i) => {
    const ax = D.axes({ x: p.x, y: p.y, xTicks: [], yTicks: [], w: 180, h: 170, pad: { l: 10, r: 10, t: 10, b: 10 }, grid: false, tickLabels: false });
    const s = ax.frame + ax.plot(p.f, { stroke: C.blue }) + ax.plot(p.line, { stroke: C.amber });
    b += D.group(s, { translate: [i * 187, 0] });
    b += D.text(i * 187 + 90, 196, p.name, { anchor: "middle", size: 15, weight: 700 });
    b += D.text(i * 187 + 90, 216, p.eq, { anchor: "middle", size: 13, fill: C.muted });
  });
  const alt = "Three small graphs of a parabola with a line: a line crossing it gives two solutions (two real roots), a line touching it gives one solution (a repeated root, y = 4x − 4 touching y = x² at (2, 4)), and a line below it gives none.";
  await fig("nonlinear-number-of-solutions", b, 560, 230, alt, "Figure: two, one or no solutions depending on how the line meets the curve");
  place("algebra/non-linear-simultaneous-equations", "For example, $y = x^2$ and $y = 4x - 4$", "nonlinear-number-of-solutions", alt, "Figure: two, one or no solutions depending on how the line meets the curve");
}

// ---- Variation graphs: d = 5t^2 (stone), t = 240 / v (journey)
{
  const k1 = 5, k2 = 240;
  const a1 = D.axes({ x: [0, 5], y: [0, 125], xTicks: 1, yTicks: 25, xLabel: "t (s)", yLabel: "d (m)", w: 270, h: 300, pad: { l: 54, r: 14, t: 36, b: 50 } });
  let s1 = a1.frame + a1.plot((t) => k1 * t * t, { stroke: C.blue });
  for (const t of [1, 2, 3, 4]) s1 += a1.point(t, k1 * t * t, { stroke: C.amber });
  s1 += a1.tag(0.4, 112, "d = 5t²", { fill: C.blue }) + a1.tag(2.9, 38, "(3, 45)", { anchor: "end" }) + a1.tag(3.9, 76, "(4, 80)", { anchor: "end" });
  const a2 = D.axes({ x: [0, 120], y: [0, 6], xTicks: 20, yTicks: 1, xLabel: "v (km/h)", yLabel: "t (h)", w: 270, h: 300, pad: { l: 40, r: 14, t: 36, b: 50 } });
  let s2 = a2.frame + a2.plot((v) => k2 / v, { stroke: C.blue, domain: [40, 120] });
  s2 += a2.point(80, 3, { stroke: C.amber }) + a2.point(96, 2.5, { stroke: C.amber });
  s2 += a2.tag(82, 3.9, "(80, 3)") + a2.tag(118, 1.7, "(96, 2.5)", { anchor: "end" }) + a2.tag(44, 5.4, "t = 240 ÷ v", { fill: C.blue });
  const b = D.group(s1, { translate: [0, 0] }) + D.group(s2, { translate: [285, 0] });
  const alt = "Two graphs of variation: the stone's distance d = 5t² rises ever more steeply through (1, 5), (2, 20), (3, 45) and (4, 80); the journey time t = 240 ÷ v falls as speed rises, passing through (80, 3) and (96, 2.5).";
  await fig("variation-square-and-inverse-graphs", b, 560, 300, alt, "Figure: direct variation with the square (left) and inverse variation (right)");
  place("algebra/variation", "## Graphs of variation", "variation-square-and-inverse-graphs", alt, "Figure: direct variation with the square (left) and inverse variation (right)");
}

// ---- Completing the square: y = 2(x - 2)^2 - 5
{
  const f = (x) => 2 * (x - 2) ** 2 - 5;
  const ax = D.axes({ x: [-1, 5], y: [-6, 10], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 400 });
  const r = Math.sqrt(2.5);
  let b = ax.frame + ax.plot(f, { stroke: C.blue });
  b += ax.line([[2, -6], [2, 10]], { stroke: C.muted, width: 1.4, dash: true });
  b += ax.point(2, -5, { stroke: C.red, r: 5 }) + ax.tag(2.15, -4.6, "minimum (2, −5)", { fill: C.red });
  b += ax.point(2 - r, 0, { stroke: C.ink }) + ax.point(2 + r, 0, { stroke: C.ink });
  b += ax.tag(0.2, 1.9, "x ≈ 0.42", { anchor: "end", size: 13 }) + ax.tag(3.85, 1.9, "x ≈ 3.58", { size: 13 });
  b += ax.tag(2.3, 9.3, "y = 2(x − 2)² − 5", { fill: C.blue });
  const alt = "Graph of y = 2(x − 2)² − 5: the completed-square form gives the minimum point (2, −5) on the line of symmetry x = 2, and the curve crosses the x-axis at x ≈ 0.42 and x ≈ 3.58.";
  await fig("completing-square-vertex-graph", b, 540, 400, alt, "Figure: the turning point of y = 2(x − 2)² − 5 is (2, −5)");
  place("algebra/quadratics-completing-the-square-and-formula", "has its minimum point at $(2, -5)$", "completing-square-vertex-graph", alt, "Figure: the turning point of y = 2(x − 2)² − 5 is (2, −5)");
}

// ---- Solving by factorising: y = x^2 - 5x + 6 roots at 2 and 3
{
  const f = (x) => x * x - 5 * x + 6;
  const ax = D.axes({ x: [-1, 6], y: [-2, 12], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 400 });
  let b = ax.frame + ax.plot(f, { stroke: C.blue });
  b += ax.point(2, 0, { stroke: C.red, r: 5 }) + ax.point(3, 0, { stroke: C.red, r: 5 }) + ax.point(0, 6, { stroke: C.ink });
  b += ax.tag(1.9, -1.9, "x = 2", { anchor: "end", fill: C.red }) + ax.tag(3.1, -1.9, "x = 3", { fill: C.red });
  b += ax.tag(0.15, 7.3, "(0, 6)") + ax.tag(3.4, 11.4, "y = (x − 2)(x − 3)", { fill: C.blue });
  const alt = "Graph of y = x² − 5x + 6 = (x − 2)(x − 3): the curve crosses the x-axis at x = 2 and x = 3, which are the solutions of x² − 5x + 6 = 0, and meets the y-axis at (0, 6).";
  const cap = "Figure: the solutions of x² − 5x + 6 = 0 are where the curve crosses the x-axis";
  await fig("quadratic-roots-factorised-graph", b, 540, 400, alt, cap);
  place("algebra/quadratics-solving-by-factorising", ":::worked-solution[Example 2", "quadratic-roots-factorised-graph", alt, cap, { before: true });
}

// ---- Non-linear sequences: difference method for 4, 11, 22, 37, 56
{
  const seq = [4, 11, 22, 37, 56];
  const d1 = seq.slice(1).map((v, i) => v - seq[i]);
  const d2 = d1.slice(1).map((v, i) => v - d1[i]);
  const step = 100, x0 = 150;
  let b = "";
  const box = (x, y, s, fill) => D.node(x - 26, y - 20, 52, 40, String(s), { fill, size: 17 });
  seq.forEach((v, i) => (b += box(x0 + i * step, 50, v, C.fillBlue)));
  d1.forEach((v, i) => (b += box(x0 + step / 2 + i * step, 120, v, C.fillAmber)));
  d2.forEach((v, i) => (b += box(x0 + step + i * step, 190, v, C.fillGreen)));
  b += D.text(10, 55, "terms", { size: 14, weight: 700, fill: C.blue }) + D.text(10, 117, "first\ndifferences", { size: 14, weight: 700, fill: C.amber }) + D.text(10, 187, "second\ndifferences", { size: 14, weight: 700, fill: C.green });
  b += D.text(x0 + step * 3 + 60, 235, `second difference ${d2[0]}, so a = ${d2[0]} ÷ 2 = 2`, { anchor: "end", size: 14, fill: C.green, weight: 600 });
  const alt = `Difference table for the sequence ${seq.join(", ")}: the first differences are ${d1.join(", ")} and the second differences are all ${d2[0]}, so the nth term is quadratic with 2n² as its leading part (2n² + n + 1).`;
  await fig("sequence-difference-table-quadratic", b, 600, 250, alt, "Figure: a constant second difference means a quadratic nth term");
  place("algebra/non-linear-sequences", ":::worked-solution[Example 2", "sequence-difference-table-quadratic", alt, "Figure: a constant second difference means a quadratic nth term", { before: true });
}
