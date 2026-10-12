// Run: node .scratch/additional-mathematics/diagrams/calculus.mjs
import { D, C, fig } from "./_h.mjs";

const rad = (d) => (d * Math.PI) / 180;

// calculus/derivative-idea Example 1: chords of y = x^2 from P(3, 9)
{
  const f = (x) => x * x;
  const ax = D.axes({ x: [0, 5], y: [0, 18], xTicks: 1, yTicks: 3, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const chord = (h) => { const m = (f(3 + h) - 9) / h; return [[2, 9 - m], [4.1, 9 + 1.1 * m]]; };
  const body = ax.frame + ax.plot(f, { domain: [0, 4.3] }) +
    ax.line(chord(1), { stroke: C.amber, width: 2 }) + ax.line([[2.2, 9 - 6 * 0.8], [3.8, 9 + 6 * 0.8]], { stroke: C.green, width: 2.4 }) +
    ax.point(3, 9) + ax.point(4, 16) + ax.point(3.1, f(3.1)) +
    ax.tag(3, 9, "P(3, 9)", { dx: 12, dy: 26 }) + ax.tag(4, 16, "Q (h = 1): gradient 7", { dx: -190, dy: 4, fill: C.amber }) +
    ax.tag(4.3, 11.5, "tangent: gradient 6", { dx: -80, dy: 40, fill: C.green }) + ax.tag(3.1, f(3.1), "h = 0.1: 6.1", { dx: -120, dy: 0, size: 13 });
  await fig("calculus/derivative-idea", "chords-approach-tangent", D.svg(540, 420, body),
    "Graph of y = x^2 with P(3, 9): the chord to Q(4, 16) has gradient 7, the chord to the point with x = 3.1 has gradient 6.1, and as Q moves towards P the chords approach the tangent at P, whose gradient is 6.",
    "Figure: chord gradients 7, 6.1, ... close in on the tangent gradient 6 at P", { block: "Example 1" });
}

// calculus/tangents-normals Example 1: y = x^3 - 2x^2 + 1, tangent y = 4x - 7 at (2, 1)
{
  const f = (x) => x ** 3 - 2 * x * x + 1;
  const ax = D.axes({ x: [-1, 3.2], y: [-5, 10], xTicks: 1, yTicks: 2, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-0.9, 3.1] }) + ax.line([[0.8, 4 * 0.8 - 7], [3.1, 4 * 3.1 - 7]], { stroke: C.amber }) +
    ax.point(2, 1) + ax.tag(2, 1, "P(2, 1)", { dx: 14, dy: 62 }) + ax.tag(3, 5, "tangent y = 4x − 7", { dx: -190, dy: 14, fill: C.amber }) +
    ax.label(-0.8, 6, "y = x³ − 2x² + 1", { fill: C.blue, weight: 700 });
  await fig("calculus/tangents-normals", "tangent-to-cubic", D.svg(540, 420, body),
    "Graph of y = x^3 - 2x^2 + 1 with its tangent y = 4x - 7 touching the curve at P(2, 1), where the gradient 3x^2 - 4x equals 4.",
    "Figure: the tangent y = 4x − 7 touches the cubic at P(2, 1)", { block: "Example 1" });
}

// calculus/stationary-points Example 1: y = x^3 - 6x^2 + 9x + 1
{
  const f = (x) => x ** 3 - 6 * x * x + 9 * x + 1;
  const ax = D.axes({ x: [-1, 5], y: [-4, 9], xTicks: 1, yTicks: 1, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-0.3, 4.2] }) + ax.point(1, 5) + ax.point(3, 1) + ax.point(0, 1) +
    ax.tag(1, 5, "maximum (1, 5)", { dx: -50, dy: -12 }) + ax.tag(3, 1, "minimum (3, 1)", { dx: -50, dy: 78 }) + ax.tag(0, 1, "(0, 1)", { dx: 12, dy: 4 });
  await fig("calculus/stationary-points", "stationary-points-cubic", D.svg(540, 420, body),
    "Graph of y = x^3 - 6x^2 + 9x + 1: the curve rises to a maximum at (1, 5), falls to a minimum at (3, 1) and then rises again; it crosses the y-axis at (0, 1).",
    "Figure: y = x³ − 6x² + 9x + 1 has a maximum at (1, 5) and a minimum at (3, 1)", { block: "Example 1" });
}

// calculus/definite-integrals-area Example 2: y = x^2 - 4x, area 32/3
{
  const f = (x) => x * x - 4 * x;
  const ax = D.axes({ x: [-1, 5], y: [-5, 4], xTicks: 1, yTicks: 1, w: 540, h: 380, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, null, [0, 4], { fill: C.fillBlue }) + ax.plot(f, { domain: [-0.7, 4.7] }) + ax.point(2, -4) +
    ax.tag(2, -4, "(2, -4)", { dx: -24, dy: 28 }) + ax.tag(2, -1.8, "area = 32/3", { dx: -40, dy: 0, fill: C.blue }) + ax.tag(4, 0, "4", { dx: 8, dy: -24 });
  await fig("calculus/definite-integrals-area", "area-below-axis", D.svg(540, 380, body),
    "Graph of y = x^2 - 4x from x = 0 to x = 4: the shaded region lies below the x-axis, so the integral is negative (-32/3) but the area enclosed is 32/3 square units.",
    "Figure: the region below the axis gives a negative integral; its area is 32/3", { block: "Example 2" });
}
// calculus/definite-integrals-area Example 4: line y = 2x + 3 and curve y = x^2
{
  const f = (x) => x * x, g = (x) => 2 * x + 3;
  const ax = D.axes({ x: [-2, 4], y: [-1, 12], xTicks: 1, yTicks: 2, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(g, f, [-1, 3], { fill: C.fillAmber }) + ax.plot(f, { domain: [-2, 3.4] }) + ax.line([[-2, g(-2)], [4, g(4)]], { stroke: C.amber }) +
    ax.point(-1, 1) + ax.point(3, 9) + ax.tag(-1, 1, "(-1, 1)", { dx: -66, dy: 22 }) + ax.tag(3, 9, "(3, 9)", { dx: 10, dy: 22 }) +
    ax.tag(1, 4.6, "area = 32/3", { dx: -40, fill: C.amber }) + ax.label(-1.8, 5, "y = x²", { fill: C.blue, weight: 700, dx: 0 }) + ax.label(2.9, 12, "y = 2x + 3", { fill: C.amber, weight: 700, dx: -100, dy: 14 });
  await fig("calculus/definite-integrals-area", "area-between-line-curve", D.svg(540, 420, body),
    "The line y = 2x + 3 lies above the curve y = x^2 between their intersection points (-1, 1) and (3, 9); the shaded region between them has area 32/3 square units, found by integrating (2x + 3 - x^2) from -1 to 3.",
    "Figure: the area between a line and a curve is the integral of top minus bottom", { block: "Example 4" });
}

// mechanics/kinematics-graphs Example 2: kombi velocity-time trapezium
{
  const v = (t) => (t <= 10 ? 2 * t : t <= 70 ? 20 : Math.max(0, 20 - 2.5 * (t - 70)));
  const dist = 0.5 * (78 + 60) * 20;
  const ax = D.axes({ x: [0, 80], y: [0, 24], xTicks: [0, 10, 20, 30, 40, 50, 60, 70, 78], yTicks: 5, w: 580, h: 380, xLabel: "t (s)", yLabel: "v (m/s)" });
  const body = ax.frame + ax.area(v, null, [0, 78], { fill: C.fillBlue }) + ax.line([[0, 0], [10, 20], [70, 20], [78, 0]], { stroke: C.blue, width: 2.8 }) +
    ax.point(10, 20) + ax.point(70, 20) + ax.point(78, 0) +
    ax.tag(5, 20, "gradient 2", { dx: -4, dy: -12, size: 13 }) + ax.tag(40, 20, "constant 20 m/s", { dx: -60, dy: -12, size: 13 }) + ax.tag(72, 5, "gradient -2.5", { anchor: "end", size: 13 }) +
    ax.tag(40, 10, `area = ${dist} m`, { dx: -45, dy: 0, fill: C.blue });
  await fig("mechanics/kinematics-graphs", "velocity-time-kombi", D.svg(580, 380, body),
    "Velocity-time graph of the kombi: it accelerates at 2 m/s^2 from rest to 20 m/s in 10 s, travels at 20 m/s until 70 s, then decelerates at 2.5 m/s^2 to rest at 78 s; the area under the graph, 1380 m, is the total distance.",
    "Figure: the area under the velocity-time graph is the distance travelled, 1380 m", { block: "Example 2" });
}
console.log("calculus diagrams written");
