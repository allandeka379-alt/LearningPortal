// Run: node .scratch/mathematics-a/diagrams/pure1.mjs
import { D, C, fig, PI, piTicks, piFmt } from "./_h.mjs";

// quadratics/equations-inequalities Example 1: 3x^2 - 5x - 2 <= 0  (roots -1/3 and 2)
{
  const f = (x) => 3 * x * x - 5 * x - 2;
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [-1.5, 3], y: [-10, 8], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, null, [-1 / 3, 2], { fill: C.fillBlue }) + ax.plot(f, { domain: [-1.4, 2.9] }) +
    ax.point(-1 / 3, 0) + ax.point(2, 0) + ax.point(0, -2) +
    ax.tag(-1 / 3, 0, "x = −1/3", { dx: -92, dy: -14 }) + ax.tag(2, 0, "x = 2", { dx: 8, dy: -14 }) +
    ax.tag(0.8, -7, "f(x) ≤ 0 here", { dx: -46, fill: C.blue }) + ax.label(2.2, 5, "y = 3x² − 5x − 2", { fill: C.blue, weight: 700, dx: -190, dy: -16 });
  await fig("quadratics/equations-inequalities", "quadratic-inequality-parabola", D.svg(540, 400, body),
    "Graph of y = 3x^2 - 5x - 2, a U-shaped parabola crossing the x-axis at x = -1/3 and x = 2: the curve is on or below the axis between these roots, so 3x^2 - 5x - 2 <= 0 gives -1/3 <= x <= 2.",
    "Figure: the parabola is on or below the x-axis between its roots, so −1/3 ≤ x ≤ 2", { block: "Example 1" });
}

// trig/graphs-exact-values Example 3: y = 1 - 2cos x on [0, 2pi]
{
  const f = (x) => 1 - 2 * Math.cos(x);
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [0, 2 * PI], y: [-2, 4], xTicks: piTicks(0, 2, 2), xFormat: piFmt, yTicks: 1, w: 560, h: 380, xLabel: "x (radians)", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 1], [2 * PI, 1]], { stroke: C.muted, width: 1.2, dash: true }) + ax.label(2 * PI, 1, "y = 1", { fill: C.muted, dy: -6, anchor: "end", size: 13 }) +
    ax.plot(f) + ax.point(0, -1) + ax.point(PI, 3) + ax.point(PI / 3, 0) + ax.point(5 * PI / 3, 0) + ax.point(2 * PI, -1) +
    ax.tag(0, -1, "(0, −1)", { dx: 8, dy: 22 }) + ax.tag(PI, 3, "(π, 3)", { dx: -26, dy: -10 }) +
    ax.tag(PI / 3, 0, "x = π/3", { dx: -92, dy: -12 }) + ax.tag(5 * PI / 3, 0, "x = 5π/3", { dx: 14, dy: -16 });
  await fig("trig/graphs-exact-values", "trig-one-minus-two-cos", D.svg(560, 380, body),
    "Graph of y = 1 - 2 cos x for 0 to 2 pi: it starts at a minimum of -1 when x = 0, crosses the x-axis at x = pi/3, reaches a maximum of 3 at x = pi, crosses the axis again at x = 5pi/3 and returns to -1 at x = 2pi; the range is -1 to 3.",
    "Figure: y = 1 − 2cos x has range −1 ≤ y ≤ 3 and crosses the x-axis at π/3 and 5π/3", { block: "Example 3" });
}

// trig/graphs-exact-values: sin 2x = 0.3 has 4 solutions on 0..360 degrees
{
  const rad = (d) => (d * PI) / 180;
  const a = Math.asin(0.3) * 180 / PI / 2;
  const sols = [a, 90 - a, 180 + a, 270 - a];
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [0, 360], y: [-1.2, 1.2], xTicks: 90, yTicks: [-1, -0.5, 0, 0.5, 1], w: 580, h: 360, xLabel: "x (degrees)", yLabel: "y" });
  let body = ax.frame + ax.plot((x) => Math.sin(rad(2 * x)), { domain: [0, 360] }) + ax.line([[0, 0.3], [360, 0.3]], { stroke: C.amber, width: 2 }) +
    ax.label(360, 0.3, "y = 0.3", { fill: C.amber, anchor: "end", dy: -8, weight: 700 });
  sols.forEach((s, i) => { body += ax.point(s, 0.3, { stroke: C.amber }) + ax.line([[s, 0.3], [s, 0]], { stroke: C.muted, width: 1.2, dash: "4 4" }) + ax.label(s, 0, `${s.toFixed(1)}°`, { dy: -12, dx: 0, size: 12, anchor: "middle" }); });
  await fig("trig/graphs-exact-values", "trig-sin2x-line-four-solutions", D.svg(580, 360, body),
    "Graph of y = sin 2x for 0 to 360 degrees with the horizontal line y = 0.3: the line cuts the two waves at four points, x = 8.7, 81.3, 188.7 and 261.3 degrees, so sin 2x = 0.3 has 4 solutions in this interval.",
    "Figure: the line y = 0.3 crosses y = sin 2x four times in 0° to 360°", { heading: "The number of solutions of an equation" });
}

// trig/basic-identities-equations Example 2: sin 2x = -1/3 on (-pi, pi)
{
  const xs = [-1.40, -0.170, 1.74, 2.97];
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [-PI, PI], y: [-1.3, 1.3], xTicks: piTicks(-1, 1, 2), xFormat: piFmt, yTicks: [-1, 1], w: 580, h: 360, yLabel: "y" });
  let body = ax.frame + ax.label(PI, 0, "x (radians)", { anchor: "end", dy: -10, dx: -16, size: 14, weight: 600 }) + ax.plot((x) => Math.sin(2 * x), { domain: [-PI, PI] }) + ax.line([[-PI, -1 / 3], [PI, -1 / 3]], { stroke: C.amber, width: 2 }) +
    ax.label(-PI + 0.15, -1 / 3, "y = −1/3", { fill: C.amber, dy: 22, weight: 700 });
  xs.forEach((s) => { body += ax.point(s, -1 / 3, { stroke: C.amber }) + ax.label(s, -1 / 3, String(s).replace("-", "−"), { size: 12, anchor: "middle", dy: 22, dx: s === -0.170 ? -22 : 0 }); });
  await fig("trig/basic-identities-equations", "trig-sin2x-minus-third-solutions", D.svg(580, 360, body),
    "Graph of y = sin 2x for x between minus pi and pi with the line y = -1/3: the line meets the curve four times, at x = -1.40, -0.170, 1.74 and 2.97, the four solutions of 3 sin 2x + 1 = 0.",
    "Figure: the four solutions of sin 2x = −1/3 are where the line meets the curve", { block: "Example 2" });
}

// kinematics/graphs Example 1: train trapezium
{
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [0, 200], y: [0, 30], xTicks: [0, 30, 150, 190], yTicks: [0, 12, 24], w: 560, h: 360, xLabel: "t (s)", yLabel: "v (m/s)" });
  const pts = [[0, 0], [30, 24], [150, 24], [190, 0]];
  const body = ax.frame + ax.area((t) => (t <= 30 ? 24 * t / 30 : t <= 150 ? 24 : 24 * (190 - t) / 40), null, [0, 190], { fill: C.fillBlue }) + ax.line(pts) +
    ax.tag(24, 10, "360 m", { dx: -20, dy: 0, size: 13 }) + ax.tag(90, 12, "2880 m", { dx: -30, dy: 0 }) + ax.tag(170, 9, "480 m", { dx: -20, dy: 0, size: 13 }) +
    ax.label(90, 24, "total area = 3720 m", { anchor: "middle", dy: -10, weight: 700, fill: C.blue });
  await fig("kinematics/graphs", "vt-train-trapezium", D.svg(560, 360, body),
    "Velocity-time graph of a train: a line from (0, 0) up to (30, 24), horizontal to (150, 24), then down to (190, 0); the areas of the two triangles and the rectangle are 360 m, 2880 m and 480 m, so the total distance is 3720 m.",
    "Figure: the area under the velocity–time graph is the distance, 3720 m", { block: "Example 1" });
}

// kinematics/graphs Example 3: v = 6 - 2t, t 0..5
{
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [0, 5.5], y: [-6, 7], xTicks: 1, yTicks: 2, w: 540, h: 380, xLabel: "t (s)", yLabel: "v (m/s)" });
  const v = (t) => 6 - 2 * t;
  const body = ax.frame + ax.area(v, null, [0, 3], { fill: C.fillBlue }) + ax.area(v, null, [3, 5], { fill: C.fillAmber }) + ax.line([[0, 6], [5, -4]]) +
    ax.point(0, 6) + ax.point(3, 0) + ax.point(5, -4) + ax.tag(0, 6, "(0, 6)", { dx: 10, dy: 4 }) + ax.tag(5, -4, "(5, −4)", { dx: -84, dy: 6 }) +
    ax.tag(1, 2, "area above: 9 m", { dx: -20, fill: C.blue }) + ax.tag(2.6, -5, "area below: 4 m", { dx: 0, fill: C.amber }) + ax.tag(3, 0, "t = 3", { dx: -4, dy: -14 });
  await fig("kinematics/graphs", "vt-direction-change", D.svg(540, 380, body),
    "Velocity-time graph v = 6 - 2t from (0, 6) to (5, -4), crossing the time axis at t = 3: the area above the axis is 9 m forward and the area below is 4 m backward, so the displacement is 5 m but the distance travelled is 13 m.",
    "Figure: area above the axis (9 m) minus area below (4 m) gives displacement 5 m; the sum gives distance 13 m", { block: "Example 3" });
}

// algebra/modulus Example 5: |2x-1| < x + 4
{
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [-3, 7], y: [-1, 11], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot((x) => Math.abs(2 * x - 1), { domain: [-3, 6] }) + ax.line([[-3, 1], [7, 11]], { stroke: C.amber }) +
    ax.point(-1, 3, { stroke: C.red }) + ax.point(5, 9, { stroke: C.red }) + ax.point(0.5, 0) +
    ax.tag(-1, 3, "(−1, 3)", { dx: -76, dy: 4 }) + ax.tag(5, 9, "(5, 9)", { dx: 8, dy: 22 }) + ax.tag(0.5, 0, "(1/2, 0)", { dx: -30, dy: 28 }) +
    ax.label(-2.9, 2.6, "y = x + 4", { fill: C.amber, weight: 700 }) + ax.label(-2.9, 7, "y = |2x − 1|", { fill: C.blue, weight: 700, dy: 0 });
  await fig("algebra/modulus", "modulus-v-and-line", D.svg(540, 400, body),
    "Graphs of the V-shaped y = |2x - 1| with vertex (1/2, 0) and the line y = x + 4: they meet at (-1, 3) and (5, 9), and the V lies below the line between x = -1 and x = 5, so |2x - 1| < x + 4 for -1 < x < 5.",
    "Figure: the V lies below the line between the intersections, so −1 < x < 5", { block: "Example 5" });
}
