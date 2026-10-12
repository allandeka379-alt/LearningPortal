// Run: node .scratch/additional-mathematics/diagrams/coord.mjs
import { D, C, fig } from "./_h.mjs";

// coordinate/linear-law Example 1: lg y against lg x through (0.2, 1.1) and (0.8, 2.6): n = 2.5, lg A = 0.6
{
  const p1 = [0.2, 1.1], p2 = [0.8, 2.6];
  const n = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  const c = p1[1] - n * p1[0];
  const ax = D.axes({ x: [0, 1], y: [0, 3.5], xTicks: 0.2, yTicks: 0.5, w: 540, h: 400, xLabel: "lg x", yLabel: "lg y" });
  const body = ax.frame + ax.line([[0, c], [1, n + c]], { stroke: C.blue }) +
    ax.line([[0.2, 1.1], [0.8, 1.1], [0.8, 2.6]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.point(...p1) + ax.point(...p2) + ax.point(0, c) +
    ax.tag(0, c, `intercept ${c.toFixed(1)} = lg A`, { dx: 12, dy: 22 }) + ax.tag(...p1, "(0.2, 1.1)", { dx: 10, dy: 28 }) + ax.tag(...p2, "(0.8, 2.6)", { dx: -118, dy: -4 }) +
    ax.tag(0.03, 3.3, `gradient = 1.5 ÷ 0.6 = ${+n.toFixed(2)} = n`, { fill: C.amber });
  await fig("coordinate/linear-law", "linear-law-lg-graph", D.svg(540, 400, body),
    "Straight-line graph of lg y against lg x through (0.2, 1.1) and (0.8, 2.6): the gradient 1.5 divided by 0.6 is 2.5, which is the power n, and the intercept on the vertical axis is 0.6, which is lg A.",
    "Figure: for y = Axⁿ the line of lg y against lg x has gradient n and intercept lg A", { block: "Example 1" });
}

// coordinate/lines Example 5: triangle A(1,2) B(7,4) C(3,9), area 19
{
  const A = [1, 2], B = [7, 4], Cc = [3, 9];
  const area = Math.abs(A[0] * (B[1] - Cc[1]) + B[0] * (Cc[1] - A[1]) + Cc[0] * (A[1] - B[1])) / 2;
  const ax = D.axes({ x: [0, 9], y: [0, 10], xTicks: 1, yTicks: 1, w: 540, h: 460, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([A, B, Cc, A], { stroke: C.blue }) +
    ax.point(...A) + ax.point(...B) + ax.point(...Cc) +
    ax.tag(...A, "A(1, 2)", { dx: -66, dy: 4 }) + ax.tag(...B, "B(7, 4)", { dx: 8, dy: 4 }) + ax.tag(...Cc, "C(3, 9)", { dx: 8, dy: -4 }) +
    ax.tag(3.7, 5, `Area = ${area} square units`, { dx: -30, fill: C.blue });
  await fig("coordinate/lines", "triangle-coordinates-area", D.svg(540, 460, body),
    "Triangle with vertices A(1, 2), B(7, 4) and C(3, 9) drawn on a coordinate grid; the shoelace method gives its area as 19 square units.",
    "Figure: the triangle ABC whose area is found from its coordinates", { block: "Example 5" });
}

// circle/equation Example 1: centre (3, -2), radius 5
{
  const ax = D.axes({ x: [-3, 9], y: [-8, 4], xTicks: 1, yTicks: 1, w: 560, h: 550, xLabel: "x", yLabel: "y" });
  const u = ax.X(1) - ax.X(0);
  const cx = ax.X(3), cy = ax.Y(-2);
  const body = ax.frame + D.circle(cx, cy, 5 * u, { stroke: C.blue, width: 2.6 }) +
    ax.line([[3, -2], [7, 1]], { stroke: C.amber, width: 2.2 }) + ax.point(3, -2) + ax.point(7, 1) +
    ax.tag(3, -2, "centre (3, -2)", { dx: -40, dy: 26 }) + ax.tag(5.2, -1.9, "r = 5", { fill: C.amber }) + ax.tag(7, 1, "(7, 1)", { dx: 8, dy: -4 }) +
    ax.tag(-2, -2, "(-2, -2)", { dx: 8, dy: 28 }) + ax.point(-2, -2);
  await fig("circle/equation", "circle-centre-radius", D.svg(560, 550, body),
    "Circle with centre (3, -2) and radius 5, equation (x - 3)^2 + (y + 2)^2 = 25; the point (7, 1) is at distance 5 from the centre (a 3-4-5 triangle) and (-2, -2) lies on the circle too.",
    "Figure: the circle (x − 3)² + (y + 2)² = 25", { block: "Example 1" });
}

// circle/line-tangents Example 3: circle centre (2,-3) r 5, tangent at P(5,1): 3x + 4y - 19 = 0
{
  const ax = D.axes({ x: [-4, 10], y: [-9, 5], xTicks: 1, yTicks: 1, w: 560, h: 550, xLabel: "x", yLabel: "y" });
  const u = ax.X(1) - ax.X(0);
  const t = (x) => (19 - 3 * x) / 4;
  // right-angle mark at P between PC and the tangent
  const P = [ax.X(5), ax.Y(1)], Cc = [ax.X(2), ax.Y(-3)];
  const d = [(Cc[0] - P[0]) / (5 * u), (Cc[1] - P[1]) / (5 * u)]; // unit vector P->C
  const tdir = [4 / 5, 3 / 5 * -1 * -1]; // placeholder replaced below
  const tx = 4 / 5, ty = -3 / 5; // tangent direction in data coords (4, -3)/5
  const e = [tx, -ty]; // to pixel coords (y flipped)
  const m = 14;
  const mark = D.polyline([[P[0] + d[0] * m, P[1] + d[1] * m], [P[0] + d[0] * m + e[0] * m, P[1] + d[1] * m + e[1] * m], [P[0] + e[0] * m, P[1] + e[1] * m]], { width: 1.6 });
  const body = ax.frame + D.circle(ax.X(2), ax.Y(-3), 5 * u, { stroke: C.blue, width: 2.6 }) +
    ax.line([[0, t(0)], [9, t(9)]], { stroke: C.amber }) + ax.line([[2, -3], [5, 1]], { stroke: C.muted, width: 2 }) + mark +
    ax.point(2, -3) + ax.point(5, 1) +
    ax.tag(2, -3, "C(2, -3)", { dx: -44, dy: 26 }) + ax.tag(5, 1, "P(5, 1)", { dx: 12, dy: -8 }) + ax.tag(5.6, 3.6, "tangent: 3x + 4y − 19 = 0", { fill: C.amber });
  await fig("circle/line-tangents", "circle-tangent-radius", D.svg(560, 550, body),
    "Circle (x - 2)^2 + (y + 3)^2 = 25 with centre C(2, -3) and the tangent 3x + 4y - 19 = 0 touching it at P(5, 1); the tangent is perpendicular to the radius CP, which has gradient 4/3 while the tangent has gradient -3/4.",
    "Figure: the tangent at P is perpendicular to the radius CP", { block: "Example 3" });
}

// vectors/notation-magnitude Example 2: A(2,-1), B(8,7)
{
  const ax = D.axes({ x: [-1, 10], y: [-3, 9], xTicks: 1, yTicks: 1, w: 560, h: 590, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[2, -1], [8, -1], [8, 7]], { stroke: C.muted, width: 1.6, dash: true }) +
    ax.arrow(2, -1, 8, 7, { stroke: C.blue, width: 2.8 }) + ax.point(2, -1) + ax.point(8, 7) +
    ax.tag(2, -1, "A(2, -1)", { dx: -80, dy: 6 }) + ax.tag(8, 7, "B(8, 7)", { dx: 8, dy: -4 }) +
    ax.tag(5, -1, "6 (i-component)", { dx: -50, dy: 28 }) + ax.tag(8, 3, "8 (j-component)", { dx: -150, dy: 6 }) +
    ax.tag(4.6, 3.6, "AB = 6i + 8j, length 10", { dx: -170, dy: -6, fill: C.blue });
  await fig("vectors/notation-magnitude", "vector-ab-components", D.svg(560, 590, body),
    "Vector AB from A(2, -1) to B(8, 7): 6 units across and 8 units up, so AB = 6i + 8j, and its length is the square root of 36 + 64, which is 10.",
    "Figure: the vector AB drawn with its components 6i and 8j", { block: "Example 2" });
}
console.log("coord diagrams written");
