// Run: node .scratch/additional-mathematics/diagrams/algebra.mjs
import { D, C, fig, open } from "./_h.mjs";

// functions/inverse Example 3: f(x) = (x-1)^2 + 4, x >= 1, and f^-1(x) = 1 + sqrt(x-4)
{
  const f = (x) => (x - 1) ** 2 + 4, g = (x) => 1 + Math.sqrt(x - 4);
  const ax = D.axes({ x: [0, 9], y: [0, 9], xTicks: 1, yTicks: 1, w: 540, h: 520, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 0], [9, 9]], { stroke: C.muted, width: 1.6, dash: true }) + ax.label(8.2, 8.6, "y = x", { fill: C.muted, dx: 6 }) +
    ax.plot(f, { domain: [1, 3.2] }) + ax.plot(g, { domain: [4, 9], stroke: C.amber }) +
    ax.point(1, 4) + ax.point(4, 1) +
    ax.tag(1, 4, "(1, 4)", { dx: 8, dy: -2 }) + ax.tag(4, 1, "(4, 1)", { dx: 6, dy: 28 }) +
    ax.label(2.9, 8.3, "y = f(x)", { fill: C.blue, weight: 700, dx: -90 }) + ax.label(8, 3.3, "y = f⁻¹(x)", { fill: C.amber, weight: 700, dx: -30, dy: -8 });
  await fig("functions/inverse", "inverse-quadratic-reflection", D.svg(540, 520, body),
    "Graphs of f(x) = (x - 1)^2 + 4 for x at least 1 (vertex at (1, 4)) and its inverse f^-1(x) = 1 + square root of (x - 4) (starting at (4, 1)); the two curves are mirror images in the dashed line y = x.",
    "Figure: f and its inverse are reflections in the line y = x", { block: "Example 3" });
}

// graphs/modulus-functions Example 2: y = |x^2 - 2x - 8| and lines y = 5, 9, 12
{
  const f = (x) => Math.abs(x * x - 2 * x - 8);
  const ax = D.axes({ x: [-4, 6], y: [0, 16], xTicks: 1, yTicks: 2, w: 560, h: 420, xLabel: "x", yLabel: "y", pad: { r: 60 } });
  let body = ax.frame + ax.plot(f);
  for (const [k, c] of [[5, C.amber], [9, C.green], [12, C.red]]) body += ax.line([[-4, k], [6, k]], { stroke: c, width: 1.6, dash: true }) + ax.label(6, k, `y = ${k}`, { fill: c, dx: 6, dy: 4, size: 13 });
  body += ax.point(-2, 0) + ax.point(4, 0) + ax.point(1, 9) + ax.point(0, 8) +
    ax.tag(1, 9, "(1, 9)", { dx: 8, dy: -12 }) + ax.tag(0, 8, "(0, 8)", { dx: -62, dy: 4 }) + ax.tag(-2, 0, "(-2, 0)", { dx: -70, dy: -8 }) + ax.tag(4, 0, "(4, 0)", { dx: 8, dy: -8 });
  await fig("graphs/modulus-functions", "modulus-quadratic-arch", D.svg(560, 420, body),
    "Graph of y = |x^2 - 2x - 8|: cusps at (-2, 0) and (4, 0), the reflected arch peaking at (1, 9) and crossing the y-axis at (0, 8). The line y = 5 meets it four times, y = 9 three times, y = 12 twice.",
    "Figure: y = |x² − 2x − 8| and the lines y = 5, 9 and 12", { block: "Example 2" });
}
// graphs/modulus-functions Example 3: y = |2cos x + 1|, 0 to 360 degrees
{
  const f = (x) => Math.abs(2 * Math.cos((x * Math.PI) / 180) + 1);
  const ax = D.axes({ x: [0, 360], y: [0, 3.5], xTicks: 60, yTicks: 1, w: 560, h: 340, xLabel: "x (degrees)", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 1], [360, 1]], { stroke: C.muted, width: 1.2, dash: true }) + ax.plot(f, { domain: [0, 360] }) +
    ax.point(0, 3) + ax.point(120, 0) + ax.point(180, 1) + ax.point(240, 0) + ax.point(360, 3) +
    ax.tag(0, 3, "(0°, 3)", { dx: 8, dy: 4 }) + ax.tag(180, 1, "(180°, 1)", { dx: -32, dy: -14 }) + ax.tag(120, 0, "cusp 120°", { dx: -80, dy: -30 }) + ax.tag(240, 0, "cusp 240°", { dx: 6, dy: -30 });
  await fig("graphs/modulus-functions", "modulus-cosine-graph", D.svg(560, 340, body),
    "Graph of y = |2cos x + 1| for 0 to 360 degrees: starts at 3, falls to a cusp at 120 degrees, rises to 1 at 180 degrees (the reflected minimum), falls to a cusp at 240 degrees and rises back to 3 at 360 degrees.",
    "Figure: y = |2cos x + 1| with cusps at 120° and 240°", { block: "Example 3" });
}

// quadratics/inequalities Example 1: x^2 - x - 12 < 0 for -3 < x < 4
{
  const f = (x) => x * x - x - 12;
  const ax = D.axes({ x: [-5, 6], y: [-14, 18], xTicks: 1, yTicks: 4, w: 560, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f) + ax.line([[-3, 0], [4, 0]], { stroke: C.red, width: 6 }) + open(ax, -3, 0) + open(ax, 4, 0) +
    ax.point(0, -12) + ax.tag(0, -12, "(0, -12)", { dx: 10, dy: 4 }) +
    ax.tag(0.5, 0, "y < 0 for -3 < x < 4", { dx: -70, dy: -14, stroke: C.red, fill: C.red }) +
    ax.tag(-3, 0, "-3", { dx: -34, dy: -26 }) + ax.tag(4, 0, "4", { dx: 10, dy: -26 });
  await fig("quadratics/inequalities", "quadratic-inequality-sign", D.svg(560, 420, body),
    "Graph of y = x^2 - x - 12 crossing the x-axis at -3 and 4; the part of the curve below the axis, marked in red on the axis, lies between the roots, so x^2 - x - 12 < 0 for -3 < x < 4.",
    "Figure: the curve is below the x-axis between its roots, so x² − x − 12 < 0 there", { block: "Example 1" });
}

// quadratics/discriminant Example 4: y = 2x + c tangent to y = x^2 - 4x + 7 with c = -2, point (3, 4)
{
  const f = (x) => x * x - 4 * x + 7, g = (x) => 2 * x - 2;
  const ax = D.axes({ x: [-1, 6], y: [-4, 18], xTicks: 1, yTicks: 2, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-0.5, 5.2] }) + ax.line([[-1, g(-1)], [6, g(6)]], { stroke: C.amber }) +
    ax.point(3, 4) + ax.tag(3, 4, "(3, 4)", { dx: 12, dy: 24 }) +
    ax.label(0.6, 11.5, "y = x² − 4x + 7", { fill: C.blue, weight: 700 }) + ax.label(4.4, g(4.4), "y = 2x − 2", { fill: C.amber, weight: 700, dx: -20, dy: 30 });
  await fig("quadratics/discriminant", "discriminant-tangent-line", D.svg(540, 420, body),
    "The line y = 2x - 2 touches the curve y = x^2 - 4x + 7 at exactly one point, (3, 4): equal roots (discriminant 0) means the line is a tangent.",
    "Figure: with c = −2 the line y = 2x + c just touches the curve at (3, 4)", { block: "Example 4" });
}

// quadratics/completing-square Example 4: y = 2x^2 - 4x - 6
{
  const f = (x) => 2 * x * x - 4 * x - 6;
  const ax = D.axes({ x: [-3, 5], y: [-10, 14], xTicks: 1, yTicks: 2, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[1, -10], [1, 14]], { stroke: C.muted, width: 1.4, dash: true }) + ax.label(1, 13, "x = 1", { fill: C.muted, dx: 6, dy: 4 }) + ax.plot(f) +
    ax.point(-1, 0) + ax.point(3, 0) + ax.point(0, -6) + ax.point(1, -8) +
    ax.tag(1, -8, "minimum (1, -8)", { dx: -50, dy: 30 }) + ax.tag(-1, 0, "(-1, 0)", { dx: -66, dy: -8 }) + ax.tag(3, 0, "(3, 0)", { dx: 8, dy: -8 }) + ax.tag(0, -6, "(0, -6)", { dx: -72, dy: 4 });
  await fig("quadratics/completing-square", "completing-square-sketch", D.svg(540, 420, body),
    "Graph of y = 2x^2 - 4x - 6 = 2(x - 1)^2 - 8: a U-shaped curve with minimum point (1, -8), x-intercepts (-1, 0) and (3, 0), y-intercept (0, -6), symmetrical about the dashed line x = 1.",
    "Figure: y = 2(x − 1)² − 8 with its vertex, intercepts and line of symmetry", { block: "Example 4" });
}

// graphs/cubic Example 1: y = (x+2)(x-1)(x-3)
{
  const f = (x) => (x + 2) * (x - 1) * (x - 3);
  const ax = D.axes({ x: [-3.5, 4.5], y: [-14, 14], xTicks: 1, yTicks: 4, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-3, 4.1] }) + ax.point(-2, 0) + ax.point(1, 0) + ax.point(3, 0) + ax.point(0, 6) +
    ax.tag(0, 6, "(0, 6)", { dx: 10, dy: 4 }) + ax.tag(-2, 0, "-2", { dx: -26, dy: -24 }) + ax.tag(1, 0, "1", { dx: -2, dy: 40 }) + ax.tag(3, 0, "3", { dx: 8, dy: 40 });
  await fig("graphs/cubic", "cubic-three-roots", D.svg(540, 420, body),
    "Graph of y = (x + 2)(x - 1)(x - 3): the cubic rises from the bottom left, crosses the x-axis at -2, 1 and 3 and the y-axis at (0, 6), and ends at the top right; it is positive between -2 and 1 and beyond 3.",
    "Figure: y = (x + 2)(x − 1)(x − 3) crosses the x-axis at −2, 1 and 3", { block: "Example 1" });
}

// logs/graphs: y = 2^x, y = log2 x and y = x
{
  const ax = D.axes({ x: [-3, 8], y: [-3, 8], xTicks: 1, yTicks: 1, w: 540, h: 520, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[-3, -3], [8, 8]], { stroke: C.muted, width: 1.4, dash: true }) + ax.label(7, 7.6, "y = x", { fill: C.muted, dx: 6 }) +
    ax.plot((x) => 2 ** x, { domain: [-3, 3.2] }) + ax.plot(Math.log2, { domain: [0.1, 8], stroke: C.amber, steps: 400 }) +
    ax.point(0, 1) + ax.point(1, 0) + ax.point(1, 2) + ax.point(2, 1) +
    ax.tag(0, 1, "(0, 1)", { dx: -62, dy: -4 }) + ax.tag(1, 0, "(1, 0)", { dx: 12, dy: 46 }) +
    ax.label(2.7, 6, "y = 2ˣ", { fill: C.blue, weight: 700, dx: -78 }) + ax.label(6, 2.1, "y = log₂ x", { fill: C.amber, weight: 700, dy: -10 });
  await fig("logs/graphs", "exponential-and-log-inverse", D.svg(540, 520, body),
    "Graphs of y = 2^x (through (0, 1), approaching the x-axis on the left) and y = log base 2 of x (through (1, 0), approaching the y-axis downwards); they are reflections of each other in the dashed line y = x.",
    "Figure: y = 2ˣ and y = log₂ x are mirror images in y = x", { heading: "## The basic curves" });
}

// functions/domain-range Example 3: f(x) = x^2 - 6x + 10, 0 <= x <= 5
{
  const f = (x) => x * x - 6 * x + 10;
  const ax = D.axes({ x: [-1.5, 6], y: [0, 12], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "f(x)" });
  const body = ax.frame + ax.plot(f, { domain: [0, 5] }) + ax.line([[-0.6, 1], [-0.6, 10]], { stroke: C.amber, width: 6 }) +
    ax.guides(3, 1) + ax.guides(0, 10) + ax.guides(5, 5) + ax.point(0, 10) + ax.point(3, 1) + ax.point(5, 5) +
    ax.tag(0, 10, "(0, 10)", { dx: 10, dy: 4 }) + ax.tag(3, 1, "(3, 1) minimum", { dx: -30, dy: 32 }) + ax.tag(5, 5, "(5, 5)", { dx: 8, dy: 4 }) +
    ax.tag(1.4, 8.4, "range (orange bar): 1 ≤ f(x) ≤ 10", { stroke: C.amber, fill: C.amber });
  await fig("functions/domain-range", "domain-range-quadratic", D.svg(540, 400, body),
    "Graph of f(x) = x^2 - 6x + 10 for 0 to 5: it falls from (0, 10) to the minimum (3, 1) and rises to (5, 5), so the range is 1 to 10; the highest value comes from the end point x = 0, not from x = 5.",
    "Figure: for 0 ≤ x ≤ 5 the range of f is 1 ≤ f(x) ≤ 10", { block: "Example 3" });
}
console.log("algebra diagrams written");
