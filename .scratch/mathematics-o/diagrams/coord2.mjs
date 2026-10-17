import { D, fig, place, C } from "./lib2.mjs";

/** Axes with the same pixel scale on both directions (so right angles look right). */
function eq(xr, yr, s, o = {}) {
  const pad = { l: 56, r: 28, t: 30, b: 50, ...(o.pad ?? {}) };
  const w = pad.l + pad.r + (xr[1] - xr[0]) * s, h = pad.t + pad.b + (yr[1] - yr[0]) * s;
  return D.axes({ x: xr, y: yr, w, h, pad, xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", ...o });
}
/** Small right-angle square at data point (a,b) with arms along data unit vectors u, v. */
function rightMark(ax, a, b, u, v, k = 0.35) {
  const P = (p, q) => [ax.X(a + u[0] * p + v[0] * q), ax.Y(b + u[1] * p + v[1] * q)];
  return D.polyline([P(k, 0), P(k, k), P(0, k)], { width: 1.6 });
}

// ---- Coordinates: four quadrants
{
  const ax = eq([-5, 5], [-4, 4], 40, { xTicks: 1, yTicks: 1 });
  let b = ax.frame;
  const pts = [[3, 2, "(3, 2)", 10, -8], [-3, 2, "(−3, 2)", -10, -8], [-3, -2, "(−3, −2)", -10, 26], [3, -2, "(3, −2)", 10, 26]];
  for (const [x, y, t, dx, dy] of pts) {
    b += ax.guides(x, y) + ax.point(x, y, { stroke: C.red, r: 5 }) + ax.tag(x, y, t, { dx, dy, anchor: dx < 0 ? "end" : "start" });
  }
  b += ax.label(4.6, 3.5, "1st", { anchor: "middle", fill: C.blue, weight: 700 }) + ax.label(-4.6, 3.5, "2nd", { anchor: "middle", fill: C.blue, weight: 700 });
  b += ax.label(-4.6, -3.2, "3rd", { anchor: "middle", fill: C.blue, weight: 700 }) + ax.label(4.6, -3.2, "4th", { anchor: "middle", fill: C.blue, weight: 700 });
  b += ax.label(0.15, 0, "O", { dx: -16, dy: 18, weight: 700 }) ;
  const alt = "The four quadrants of the Cartesian plane numbered anticlockwise from the top right, with one point in each: (3, 2) in the first, (−3, 2) in the second, (−3, −2) in the third and (3, −2) in the fourth, showing the signs of x and y.";
  const cap = "Figure: the four quadrants, numbered anticlockwise from the top right";
  await fig("coordinates-four-quadrants", b, ax.w, ax.h, alt, cap);
  place("coordinate-geometry/coordinates", "### The four quadrants", "coordinates-four-quadrants", alt, cap);
}

// ---- Length and midpoint: borehole (2, 3) to school (10, 9)
{
  const A = [2, 3], B = [10, 9];
  const dx = B[0] - A[0], dy = B[1] - A[1], d = Math.hypot(dx, dy), M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const ax = eq([0, 12], [0, 11], 38, { xTicks: 2, yTicks: 2 });
  let b = ax.frame;
  b += D.polyline([[ax.X(A[0]), ax.Y(A[1])], [ax.X(B[0]), ax.Y(A[1])], [ax.X(B[0]), ax.Y(B[1])]], { close: true, fill: C.fillBlue, stroke: C.muted, width: 1.6, dash: true });
  b += ax.line([A, B], { stroke: C.blue, width: 3 });
  b += rightMark(ax, B[0], A[1], [-1, 0], [0, 1]);
  b += ax.point(...A, { stroke: C.ink, r: 5 }) + ax.point(...B, { stroke: C.ink, r: 5 }) + ax.point(...M, { stroke: C.red, r: 5 });
  b += ax.tag(A[0] - 0.3, A[1] + 0.2, "(2, 3) borehole", { anchor: "start", size: 13, dx: 0, dy: -14 });
  b += ax.tag(B[0] + 0.3, B[1] + 0.4, "(10, 9) school", { size: 13, anchor: "end", dx: 20 });
  b += ax.tag(M[0] - 0.2, M[1] + 0.2, "midpoint (6, 6)", { anchor: "end", fill: C.red, size: 13 });
  b += ax.label((A[0] + B[0]) / 2, A[1], `${dx} km across`, { anchor: "middle", dy: 20, fill: C.muted, weight: 600 });
  b += ax.label(B[0] + 0.3, (A[1] + B[1]) / 2, `${dy} km up`, { dy: 5, fill: C.muted, weight: 600 });
  b += ax.tag(7.0, 5.2, `pipe = ${d} km`, { fill: C.blue });
  const alt = `The borehole at (2, 3) and the school at (10, 9) are joined by a pipe that is the hypotenuse of a right-angled triangle with sides ${dx} and ${dy}, so its length is √(${dx}² + ${dy}²) = ${d} km and its midpoint is (${M[0]}, ${M[1]}).`;
  const cap = "Figure: the length of a segment is the hypotenuse of a right-angled triangle";
  await fig("length-midpoint-borehole-school", b, ax.w, ax.h, alt, cap);
  place("coordinate-geometry/length-and-midpoint", "## Why the length formula works", "length-midpoint-borehole-school", alt, cap);
}

// ---- Parallel lines: parallelogram ABCD
{
  const A = [0, 1], B = [4, 3], Cc = [5, 6], Dd = [1, 4];
  const ax = eq([-1, 7], [-1, 8], 42, { xTicks: 1, yTicks: 1 });
  let b = ax.frame;
  b += D.polyline([A, B, Cc, Dd].map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.8 });
  const gl = (P, Q) => (Q[1] - P[1]) / (Q[0] - P[0]);
  for (const [p, n, dx, dy] of [[A, "A(0, 1)", -8, 22], [B, "B(4, 3)", 8, 6], [Cc, "C(5, 6)", 8, -4], [Dd, "D(1, 4)", -8, -16]]) b += ax.point(...p, { stroke: C.ink }) + ax.tag(...p, n, { dx, dy, anchor: dx < 0 ? "end" : "start", size: 13 });
  b += ax.label(2.0, 2.0, "gradient ½", { dx: 4, dy: 24, fill: C.amber, weight: 700, anchor: "middle" }) + ax.label(3.0, 5.0, "gradient ½", { dx: -4, dy: -14, fill: C.amber, weight: 700, anchor: "middle" });
  b += ax.label(4.5, 4.5, "gradient 3", { dx: 52, dy: 5, fill: C.green, weight: 700, anchor: "middle" });
  b += ax.label(0.4, 7.5, "AB and DC: gradient ½", { fill: C.amber, weight: 700, size: 14 }) + ax.label(0.4, 6.8, "AD and BC: gradient 3", { fill: C.green, weight: 700, size: 14 });
  const alt = `Parallelogram ABCD with A(0, 1), B(4, 3), C(5, 6) and D(1, 4): AB and DC both have gradient ${gl(A, B)}, and AD and BC both have gradient ${gl(A, Dd)}, so each pair of opposite sides is parallel.`;
  const cap = "Figure: parallel sides have equal gradients";
  await fig("parallel-lines-parallelogram-gradients", b, ax.w, ax.h, alt, cap);
  place("coordinate-geometry/parallel-lines", "## Parallel sides in shapes", "parallel-lines-parallelogram-gradients", alt, cap);
}

// ---- Perpendicular bisector of A(1, 2), B(7, 6)
{
  const A = [1, 2], B = [7, 6], M = [4, 4];
  const ax = eq([-1, 9], [-1, 11], 38, { xTicks: 1, yTicks: 1 });
  let b = ax.frame;
  const bis = (x) => -1.5 * x + 10;
  b += ax.line([[0, 10], [6.5, bis(6.5)]], { stroke: C.amber, width: 3 }) + ax.line([A, B], { stroke: C.blue, width: 3 });
  b += rightMark(ax, 4, 4, [3, 2].map((v) => v / Math.hypot(3, 2)), [2, -3].map((v) => v / Math.hypot(2, 3)), 0.45);
  for (const p of [A, B]) b += ax.point(...p, { stroke: C.ink, r: 5 });
  b += ax.point(...M, { stroke: C.red, r: 5 }) + ax.point(0, 10, { stroke: C.ink });
  b += ax.tag(1, 2, "A(1, 2)", { dx: 8, dy: 24, size: 13 }) + ax.tag(7, 6, "B(7, 6)", { dx: 8, dy: 4, size: 13 });
  b += ax.line([M, [5.3, 3.0]], { stroke: C.red, width: 1.2 }) + ax.tag(5.3, 3.4, "M(4, 4) midpoint", { size: 13, fill: C.red });
  b += ax.tag(0, 10, "(0, 10)", { dx: 8, dy: 4, size: 13 });
  b += ax.tag(5.2, 7.9, "3x + 2y = 20", { fill: C.amber }) + ax.tag(0.2, 5.6, "gradient 2/3", { fill: C.blue, size: 13 }) + ax.tag(5.3, 1.6, "gradient −3/2", { fill: C.amber, size: 13 });
  const alt = "The perpendicular bisector of A(1, 2) and B(7, 6): it passes through the midpoint M(4, 4) at a right angle to AB (gradient 2/3), has gradient −3/2 and equation 3x + 2y = 20, and passes through (0, 10).";
  const cap = "Figure: the perpendicular bisector 3x + 2y = 20 meets AB at its midpoint";
  await fig("perpendicular-bisector-ab", b, ax.w, ax.h, alt, cap);
  place("coordinate-geometry/perpendicular-lines", "## The perpendicular bisector", "perpendicular-bisector-ab", alt, cap);
}
