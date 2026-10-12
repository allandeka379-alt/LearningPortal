// Curves, travel graphs, simultaneous equations, inequality regions.
import { D, fig, put } from "./lib.mjs";
const C = D.C;

// Quadratic y = x^2 - 2x - 3, with y = 2
{
  const f = (x) => x * x - 2 * x - 3;
  const ax = D.axes({ x: [-3, 5], y: [-6, 9], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 560, h: 440 });
  let b = ax.frame + ax.plot(f, { domain: [-2.5, 4.5] });
  b += ax.line([[-3, 2], [5, 2]], { stroke: C.amber, width: 2, dash: true });
  for (const x of [-1, 3]) b += ax.point(x, 0, { stroke: C.blue, r: 5 });
  const r = Math.sqrt(6);
  for (const x of [1 - r, 1 + r]) b += ax.point(x, 2, { stroke: C.amber, r: 5 });
  b += ax.point(1, -4, { stroke: C.blue, r: 5 }) + ax.tag(1, -4, "minimum (1, −4)", { dx: 10, dy: 20 });
  b += ax.tag(-1, 0, "x = −1", { dx: -76, dy: 30 }) + ax.tag(3, 0, "x = 3", { dx: 8, dy: 28 });
  b += ax.tag(4.95, 2, "y = 2", { anchor: "end", dy: -8, fill: C.amber });
  b += ax.tag(-1.45, 2, "x ≈ −1.4", { dx: -92, dy: -8 }) + ax.tag(3.45, 2, "x ≈ 3.4", { dx: 4, dy: -50 });
  b += ax.label(-2.1, 6.7, "y = x² − 2x − 3", { weight: 700, fill: C.blue, dx: -4 });
  const alt = "Graph of y = x² − 2x − 3: a U-shaped curve with minimum (1, −4) that crosses the x-axis at x = −1 and x = 3; the dashed line y = 2 meets it at about x = −1.4 and x = 3.4, the solutions of x² − 2x − 3 = 2.";
  await fig("quadratic-solve-graphically", b, 560, 440, alt, "Figure: roots and the solutions of x² − 2x − 3 = 2 read from the curve");
  put("graphs/graphs-of-functions", "### Choosing a suitable straight line", "quadratic-solve-graphically", alt, "Figure: roots and the solutions of x² − 2x − 3 = 2 read from the curve");
}
// Cubic x^3 - 3x + 1
{
  const f = (x) => x ** 3 - 3 * x + 1;
  const ax = D.axes({ x: [-2.5, 2.5], y: [-3, 5], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 520, h: 420 });
  let b = ax.frame + ax.plot(f);
  for (const x of [-2, -1, 0, 1, 2]) b += ax.point(x, f(x), { stroke: C.amber });
  b += ax.tag(-1, 3, "maximum near (−1, 3)", { dx: -150, dy: -8 }) + ax.tag(2.45, -2.2, "minimum near (1, −1)", { anchor: "end" });
  b += ax.label(-2.4, 4.4, "y = x³ − 3x + 1", { weight: 700, fill: C.blue });
  const alt = "Graph of the cubic y = x³ − 3x + 1 for x from −2 to 2: the curve rises from the bottom left to a maximum near (−1, 3), falls to a minimum near (1, −1), then rises again, passing through (0, 1).";
  await fig("cubic-x3-minus-3x-plus-1", b, 520, 420, alt, "Figure: a cubic curve has a maximum and a minimum");
  put("graphs/graphs-of-functions", "For an exponential such as", "cubic-x3-minus-3x-plus-1", alt, "Figure: a cubic curve has a maximum and a minimum");
}
// Reciprocal 6/x
{
  const f = (x) => 6 / x;
  const ax = D.axes({ x: [-7, 7], y: [-7, 7], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 520, h: 460 });
  let b = ax.frame + ax.plot(f, { domain: [0.8, 7] }) + ax.plot(f, { domain: [-7, -0.8] });
  for (const x of [1, 2, 3, 6, -2]) b += ax.point(x, f(x), { stroke: C.amber });
  b += ax.tag(2, 3, "(2, 3)", { dx: 8, dy: -8 }) + ax.tag(-2, -3, "(−2, −3)", { dx: -90, dy: 22 });
  b += ax.label(3.3, 6, "y = 6/x", { weight: 700, fill: C.blue });
  const alt = "Graph of y = 6/x: two separate smooth branches, one in the first quadrant through (1, 6), (2, 3), (3, 2) and (6, 1) and one in the third quadrant through (−2, −3); neither branch touches the axes.";
  await fig("reciprocal-6-over-x", b, 520, 460, alt, "Figure: the reciprocal graph has two branches that never touch the axes");
  put("graphs/graphs-of-functions", "## Other curves you must know", "reciprocal-6-over-x", alt, "Figure: the reciprocal graph has two branches that never touch the axes");
}
// Sketch y = x^2 - 6x + 8
{
  const f = (x) => x * x - 6 * x + 8;
  const ax = D.axes({ x: [-1, 7], y: [-3, 10], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 440, grid: false });
  let b = ax.frame + ax.line([[3, -2.6], [3, 9.6]], { stroke: C.muted, width: 1.4, dash: true }) + ax.plot(f, { domain: [-0.5, 6.5] });
  for (const [x, y] of [[0, 8], [2, 0], [4, 0], [3, -1]]) b += ax.point(x, y, { stroke: C.amber, r: 5 });
  b += ax.tag(0, 8, "(0, 8)", { dx: 10, dy: 0 }) + ax.tag(2, 0, "(2, 0)", { dx: -66, dy: -10 }) + ax.tag(4, 0, "(4, 0)", { dx: 8, dy: -10 }) + ax.tag(3, -1, "(3, −1)", { dx: 10, dy: 24 });
  b += ax.tag(3, 9.4, "line of symmetry x = 3", { dx: 8, dy: 0 });
  const alt = "Sketch of y = x² − 6x + 8: a U-shaped curve through (0, 8), crossing the x-axis at (2, 0) and (4, 0), with its minimum at (3, −1) on the dashed line of symmetry x = 3.";
  await fig("sketch-quadratic-x2-6x-8", b, 540, 440, alt, "Figure: sketch with the intercepts, line of symmetry and turning point labelled");
  put("graphs/sketching-curves", "- The **line of symmetry** is halfway", "sketch-quadratic-x2-6x-8", alt, "Figure: sketch with the intercepts, line of symmetry and turning point labelled");
}
// Sketch cubic (x+2)(x-1)(x-3)
{
  const f = (x) => (x + 2) * (x - 1) * (x - 3);
  const ax = D.axes({ x: [-3, 4], y: [-8, 10], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 440, grid: false });
  let b = ax.frame + ax.plot(f, { domain: [-2.6, 3.5] });
  for (const [x, y] of [[-2, 0], [1, 0], [3, 0], [0, 6]]) b += ax.point(x, y, { stroke: C.amber, r: 5 });
  b += ax.tag(-2, 0, "(−2, 0)", { dx: -78, dy: -10 }) + ax.tag(1, 0, "(1, 0)", { dx: -20, dy: 34 }) + ax.tag(3, 0, "(3, 0)", { dx: 8, dy: -12 }) + ax.tag(0, 6, "(0, 6)", { dx: 10, dy: -4 });
  const alt = "Sketch of y = (x + 2)(x − 1)(x − 3): a cubic that starts at the bottom left, crosses the x-axis at x = −2, rises to a maximum, passes through (0, 6), crosses at x = 1, dips to a minimum, then crosses at x = 3 and rises.";
  await fig("sketch-cubic-three-roots", b, 540, 440, alt, "Figure: a cubic with three roots, crossing the axis at each");
  put("graphs/sketching-curves", "A **repeated** factor means", "sketch-cubic-three-roots", alt, "Figure: a cubic with three roots, crossing the axis at each");
}
// Gradient of curve: y = x^2 tangent at (2,4)
{
  const ax = D.axes({ x: [-1, 4], y: [-1, 10], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 520, h: 440 });
  let b = ax.frame + ax.plot((x) => x * x, { domain: [-1, 3.2] }) + ax.line([[0.4, 4 * 0.4 - 4], [3.3, 4 * 3.3 - 4]], { stroke: C.amber });
  b += ax.line([[1, 0], [3, 0], [3, 8]], { stroke: C.muted, width: 1.6, dash: true });
  for (const [x, y] of [[1, 0], [3, 8]]) b += ax.point(x, y, { stroke: C.amber });
  b += ax.point(2, 4, { stroke: C.blue, r: 6 });
  b += ax.tag(2, 4, "P (2, 4)", { dx: -96, dy: -8 }) + ax.tag(3, 8, "(3, 8)", { dx: -68, dy: -4 }) + ax.tag(1, 0, "(1, 0)", { dx: -20, dy: -12 });
  b += ax.tag(3.9, 3, "gradient = 8 ÷ 2 = 4", { anchor: "end", fill: C.amber }) + ax.label(0.1, 9.2, "y = x²", { weight: 700, fill: C.blue });
  const alt = "Graph of y = x² with the tangent at P(2, 4) drawn as a straight line touching the curve only at P and passing through (1, 0) and (3, 8); its gradient is 8 divided by 2, which is 4.";
  await fig("tangent-gradient-x-squared", b, 520, 440, alt, "Figure: the gradient of the tangent at P estimates the gradient of the curve");
  put("graphs/gradient-of-a-curve", "Different students' tangents differ slightly", "tangent-gradient-x-squared", alt, "Figure: the gradient of the tangent at P estimates the gradient of the curve");
}
// Kombi d = 0.5 t^2, tangent at t=6 through (3,0),(10,42), chord (0,0)-(10,50)
{
  const ax = D.axes({ x: [0, 11], y: [-2, 55], xTicks: 1, yTicks: 10, xLabel: "t (s)", yLabel: "d (m)", w: 560, h: 440 });
  let b = ax.frame + ax.plot((t) => 0.5 * t * t, { domain: [0, 10] });
  b += ax.line([[0, 0], [10, 50]], { stroke: C.muted, width: 1.8, dash: true }) + ax.line([[3, 0], [10, 42]], { stroke: C.amber });
  b += ax.point(6, 18, { stroke: C.blue, r: 6 }) + ax.point(3, 0, { stroke: C.amber }) + ax.point(10, 42, { stroke: C.amber });
  b += ax.tag(6, 18, "(6, 18)", { dx: 12, dy: 28 }) + ax.tag(3, 0, "(3, 0)", { dx: -10, dy: -10, anchor: "end" });
  b += ax.tag(2.4, 46, "tangent at t = 6: 42 ÷ 7 = 6 m/s", { fill: C.amber }) + ax.tag(0.6, 37, "chord 0 to 10: 50 ÷ 10 = 5 m/s", { fill: C.muted });
  const alt = "Distance-time curve d = 0.5t² for 0 to 10 s: the tangent at t = 6 s (through (3, 0) and (10, 42)) has gradient 6 m/s, steeper than the dashed chord from (0, 0) to (10, 50), whose gradient is the average speed of 5 m/s.";
  await fig("kombi-tangent-speed", b, 560, 440, alt, "Figure: the tangent gives speed at one instant, the chord gives average speed");
  put("graphs/gradient-of-a-curve", "Compare this with the **average** speed", "kombi-tangent-speed", alt, "Figure: the tangent gives speed at one instant, the chord gives average speed");
}
// Travel: Tatenda distance-time
{
  const ax = D.axes({ x: [0, 90], y: [0, 11], xTicks: 15, yTicks: 1, xLabel: "Time (min)", yLabel: "Distance from home (km)", w: 560, h: 420 });
  const pts = [[0, 0], [30, 9], [45, 9], [75, 0]];
  let b = ax.frame + ax.line(pts);
  for (const [x, y] of pts) b += ax.point(x, y, { stroke: C.amber });
  b += ax.tag(15, 4.5, "18 km/h", { dx: 14, dy: 0 }) + ax.tag(37.5, 9, "stationary 15 min", { dx: -60, dy: -12 }) + ax.tag(60, 4.5, "18 km/h back", { dx: 10, dy: 0 });
  const alt = "Distance-time graph of Tatenda's cycle ride: 9 km out in 30 minutes (18 km/h), stationary for 15 minutes (the horizontal section), then 9 km back home in 30 minutes, reaching home at 75 minutes.";
  await fig("travel-distance-time-tatenda", b, 560, 420, alt, "Figure: gradient is speed; the flat section is time at rest");
  put("graphs/travel-graphs", "Notice step 1: the time was converted", "travel-distance-time-tatenda", alt, "Figure: gradient is speed; the flat section is time at rest");
}
// Travel: speed-time
{
  const ax = D.axes({ x: [0, 55], y: [0, 24], xTicks: 10, yTicks: 4, xLabel: "Time (s)", yLabel: "Speed (m/s)", w: 560, h: 420 });
  const pts = [[0, 0], [10, 20], [40, 20], [48, 0]];
  let b = ax.frame + ax.area((t) => (t <= 10 ? 2 * t : t <= 40 ? 20 : 20 - 2.5 * (t - 40)), null, [0, 48], { fill: C.fillBlue }) + ax.line(pts);
  b += ax.line([[10, 0], [10, 20]], { stroke: C.muted, width: 1.3, dash: true }) + ax.line([[40, 0], [40, 20]], { stroke: C.muted, width: 1.3, dash: true });
  b += ax.label(7.2, 5, "100 m", { anchor: "middle", size: 13 }) + ax.label(25, 10, "600 m", { anchor: "middle", size: 15, weight: 700 }) + ax.label(43.4, 3, "80 m", { anchor: "middle", size: 12 });
  b += ax.tag(12, 23, "acceleration 2 m/s²", { dx: -80 }) + ax.tag(54, 17, "deceleration 2.5 m/s²", { anchor: "end", dy: 0 });
  b += ax.tag(30, 3.5, "total area = 780 m", { anchor: "middle" });
  const alt = "Speed-time graph of a car: it accelerates from rest to 20 m/s in 10 s, holds 20 m/s until 40 s, then slows to rest at 48 s; the areas under the graph are 100 m, 600 m and 80 m, giving a total distance of 780 m.";
  await fig("travel-speed-time-car", b, 560, 420, alt, "Figure: the area under a speed-time graph is the distance travelled");
  put("graphs/travel-graphs", "## Speed–time graphs", "travel-speed-time-car", alt, "Figure: the area under a speed-time graph is the distance travelled");
}
// Simultaneous equations graphically
{
  const ax = D.axes({ x: [-1, 8], y: [-5, 10], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 540, h: 440 });
  let b = ax.frame + ax.line([[0, -3], [6.5, 10]]) + ax.line([[-0.5, 9.5], [7.5, 1.5]], { stroke: C.amber });
  b += ax.point(4, 5, { stroke: C.red, r: 6 }) + ax.tag(3.6, 2.2, "solution (4, 5)");
  b += ax.label(5.3, 7.4, "y = 2x − 3", { fill: C.blue, weight: 700 }) + ax.label(0.4, 8.6, "y = −x + 9", { fill: C.amber, weight: 700 });
  const alt = "Graphs of y = 2x − 3 and y = −x + 9: the two straight lines cross at (4, 5), so x = 4 and y = 5 is the solution of the simultaneous equations.";
  await fig("simultaneous-lines-intersect", b, 540, 440, alt, "Figure: the solution is where the two lines meet");
  put("algebra/simultaneous-equations", "## What the solution means on a graph", "simultaneous-lines-intersect", alt, "Figure: the solution is where the two lines meet");
}
// Inequalities region x>=0, y>=1, x+y<=5 (unwanted shaded)
{
  const ax = D.axes({ x: [-2, 7], y: [-1, 7], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 540, h: 440 });
  const X = ax.X, Y = ax.Y;
  const outer = `M${X(-2)},${Y(7)} L${X(7)},${Y(7)} L${X(7)},${Y(-1)} L${X(-2)},${Y(-1)} Z`;
  const tri = `M${X(0)},${Y(1)} L${X(0)},${Y(5)} L${X(4)},${Y(1)} Z`;
  let b = `<path d="${outer} ${tri}" fill="#e4dfd8" fill-rule="evenodd" stroke="none"/>` + ax.frame;
  b += ax.line([[0, -1], [0, 7]], { stroke: C.ink }) + ax.line([[-2, 1], [7, 1]], { stroke: C.blue }) + ax.line([[-1, 6], [6, -1]], { stroke: C.amber });
  for (const [x, y] of [[0, 1], [0, 5], [4, 1]]) b += ax.point(x, y, { stroke: C.red, r: 5 });
  b += ax.tag(0, 1, "(0, 1)", { dx: -66, dy: 24 }) + ax.tag(0, 5, "(0, 5)", { dx: 10, dy: -4 }) + ax.tag(4, 1, "(4, 1)", { dx: 8, dy: 24 });
  b += ax.label(1.1, 2.1, "R", { weight: 700, size: 22, fill: C.blue }) + ax.tag(6.9, 1, "y = 1", { anchor: "end", dy: -8, fill: C.blue }) + ax.tag(-0.8, 6.4, "x + y = 5", { fill: C.amber });
  const alt = "Region for x ≥ 0, y ≥ 1 and x + y ≤ 5: the unwanted areas are shaded grey and the unshaded triangle R has vertices (0, 1), (0, 5) and (4, 1).";
  await fig("inequality-region-triangle", b, 540, 440, alt, "Figure: shade the unwanted regions; the unshaded triangle R is the answer");
  put("algebra/inequalities-in-two-variables", "## Several inequalities together", "inequality-region-triangle", alt, "Figure: shade the unwanted regions; the unshaded triangle R is the answer");
}
console.log("curves done");
