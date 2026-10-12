// Run from the repo root: node .scratch/mathematics-a/diagrams/pure5.mjs
import { D, C, fig, PI, eqH } from "./_h.mjs";
const P = { r: 44, b: 44 };
const rad = (d) => (d * PI) / 180;

// vectors/lines Example 4: foot of the perpendicular from P(5, 3, -1) to l1
{
  const w = 540, h = 300;
  const A = [60, 230], dir = [0.962, -0.275], F = [270, 170], n = [-0.275, -0.962], Pp = [F[0] + 110 * n[0], F[1] + 110 * n[1]];
  const e = (t) => [A[0] + 420 * t, A[1] - 120 * t];
  const u = [0.962, -0.275], v = [-0.275, -0.962]; // right-angle marker at F
  const m = 14;
  const body = D.arrow(A[0], A[1], 490, 108, { stroke: C.blue, width: 2.6 }) +
    D.line(F[0], F[1], Pp[0], Pp[1], { stroke: C.red, width: 2.4, dash: true }) +
    D.polyline([[F[0] - u[0] * m, F[1] - u[1] * m], [F[0] - u[0] * m + v[0] * m, F[1] - u[1] * m + v[1] * m], [F[0] + v[0] * m, F[1] + v[1] * m]], { stroke: C.muted, width: 1.4 }) +
    D.dot(F[0], F[1]) + D.dot(Pp[0], Pp[1]) +
    D.tag(F[0] + 14, F[1] + 30, "F(3, 1, 1), s = 1", { size: 14 }) + D.tag(Pp[0] - 190, Pp[1] + 8, "P(5, 3, −1)", { size: 14 }) +
    D.text(Pp[0] + 22, Pp[1] + 8, "PF = −2i − 2j + 2k", { size: 14, fill: C.red }) + D.text(Pp[0] + 22, Pp[1] + 30, "distance = √12 = 3.46", { size: 14, fill: C.red, weight: 700 }) +
    D.text(70, 262, "l₁: r = i + 2j + s(2i − j + k)", { size: 14, fill: C.blue, weight: 700 }) + D.text(70, 284, "PF is perpendicular to the direction 2i − j + k", { size: 13, fill: C.muted });
  await fig("vectors/lines", "vector-line-foot-of-perpendicular", D.svg(w, h, body),
    "Sketch of the line l1 with direction 2i - j + k and the point P(5, 3, -1) off the line: the foot of the perpendicular F(3, 1, 1) is the point of l1 with s = 1, where PF is perpendicular to the line, and the perpendicular distance is the length of PF, root 12, about 3.46.",
    "Figure: F(3, 1, 1) is where PF meets l₁ at a right angle; the distance PF is √12", { block: "Example 4" });
}

// vectors/lines-planes Example 3: distance from P(4, -1, 3) to plane 2x - y + 2z = 3
{
  const w = 540, h = 330;
  const Fp = [300, 235], Pp = [300, 70];
  const body = D.polyline([[70, 285], [370, 285], [490, 205], [190, 205]], { fill: C.fillBlue, stroke: C.blue, width: 2, close: true }) +
    D.line(Fp[0], Fp[1], Pp[0], Pp[1], { stroke: C.amber, width: 3 }) + D.arrow(Pp[0], Pp[1], Pp[0], 24, { stroke: C.muted, width: 2 }) +
    D.polyline([[Fp[0] + 12, Fp[1]], [Fp[0] + 12, Fp[1] - 12], [Fp[0], Fp[1] - 12]], { stroke: C.muted, width: 1.4 }) +
    D.dot(Fp[0], Fp[1]) + D.dot(Pp[0], Pp[1]) +
    D.tag(Pp[0] + 12, Pp[1] + 6, "P(4, −1, 3)", { size: 14 }) + D.tag(Fp[0] + 14, Fp[1] + 28, "F(4/3, 1/3, 1/3)", { size: 14 }) +
    D.text(Pp[0] - 14, (Pp[1] + Fp[1]) / 2, "distance 4", { anchor: "end", size: 15, fill: C.amber, weight: 700 }) + D.text(Pp[0] + 10, 34, "n = (2, −1, 2), |n| = 3", { size: 14, fill: C.muted }) +
    D.text(80, 305, "plane 2x − y + 2z = 3", { size: 14, fill: C.blue, weight: 700 });
  await fig("vectors/lines-planes", "vector-point-to-plane-distance", D.svg(w, h, body),
    "Sketch of the plane 2x - y + 2z = 3 and the point P(4, -1, 3) above it: the shortest distance is along the normal n = (2, -1, 2) to the foot F(4/3, 1/3, 1/3), and the distance PF is 4, the same as the formula gives.",
    "Figure: the shortest distance from P to the plane is along the normal, meeting the plane at F", { block: "Example 3" });
}

// vectors/lines-planes Example 1: line meets plane at (5, 0, 5), angle phi = 49.8 degrees
{
  const w = 540, h = 340;
  const X0 = [290, 215], phi = 49.8, dx = Math.cos(rad(phi)), dy = -Math.sin(rad(phi));
  const L0 = [X0[0] - 130 * dx, X0[1] - 130 * dy], L1 = [X0[0] + 120 * dx, X0[1] + 120 * dy];
  const arc = (r, a0, a1) => `M${X0[0] + r * Math.cos(rad(a0))},${X0[1] - r * Math.sin(rad(a0))} A${r},${r} 0 0 0 ${X0[0] + r * Math.cos(rad(a1))},${X0[1] - r * Math.sin(rad(a1))}`;
  const body = D.line(40, X0[1], 500, X0[1], { stroke: C.blue, width: 3 }) + D.arrow(L0[0], L0[1], L1[0], L1[1], { stroke: C.amber, width: 2.6 }) +
    D.arrow(X0[0], X0[1], X0[0], 70, { stroke: C.muted, width: 2 }) + D.line(X0[0], X0[1], X0[0], 120, { stroke: C.muted, width: 2, dash: true }) +
    D.path_(arc(62, 0, phi), { stroke: C.red, width: 2 }) + D.path_(arc(88, phi, 90), { stroke: C.green, width: 2 }) +
    D.dot(X0[0], X0[1]) + D.text(X0[0] + 70, X0[1] - 22, "φ = 49.8°", { size: 15, fill: C.red, weight: 700 }) + D.text(X0[0] - 14, 130, "40.2°", { anchor: "end", size: 14, fill: C.green, weight: 700 }) +
    D.tag(X0[0] + 12, X0[1] + 30, "(5, 0, 5)", { size: 14 }) + D.text(X0[0] + 10, 64, "n = (1, 1, 2)", { size: 14, fill: C.muted }) +
    D.text(46, X0[1] - 12, "plane x + y + 2z = 15 (seen edge-on)", { size: 14, fill: C.blue, weight: 700 }) + D.text(330, 300, "line, direction (2, −1, 3)", { size: 14, fill: C.amber, weight: 700 });
  await fig("vectors/lines-planes", "vector-line-meets-plane-angle", D.svg(w, h, body),
    "Side view of the plane x + y + 2z = 15 seen edge-on and the line with direction (2, -1, 3) meeting it at (5, 0, 5): the angle phi between the line and the plane is 49.8 degrees, while the angle between the line and the normal n = (1, 1, 2) is 40.2 degrees, so sin phi, not cos, comes from the dot product.",
    "Figure: the angle with the plane (49.8°) and the angle with the normal (40.2°) add to 90°", { block: "Example 1" });
}

// diff/implicit-parametric Example 4: ellipse x = 3cos t, y = 2 sin t, tangent at t = pi/4
{
  const x = [-4, 4], y = [-3, 3], w = 540, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "x", yLabel: "y" });
  const px = 3 / Math.SQRT2, py = Math.SQRT2;
  const pts = []; for (let i = 0; i <= 120; i += 1) { const t = (2 * PI * i) / 120; pts.push([3 * Math.cos(t), 2 * Math.sin(t)]); }
  const body = ax.frame + ax.line(pts, { stroke: C.blue, width: 2.8 }) + ax.line([[px - 1.8, py + 1.8 * 2 / 3], [px + 1.8, py - 1.8 * 2 / 3]], { stroke: C.amber, width: 2.4 }) +
    ax.point(px, py) + ax.tag(px, py, "P", { dx: 10, dy: -8, size: 13 }) + ax.label(-3.9, 2.7, "x²/9 + y²/4 = 1", { fill: C.blue, weight: 700 }) +
    ax.label(-3.9, -2.3, "P: θ = π/4, point (2.12, 1.41)", { fill: C.ink, size: 14 }) + ax.label(-3.9, -2.7, "tangent at P: gradient −2/3", { fill: C.amber, size: 14, weight: 700 });
  await fig("diff/implicit-parametric", "parametric-ellipse-tangent", D.svg(w, h, body),
    "The ellipse x = 3 cos theta, y = 2 sin theta, with x-intercepts at plus and minus 3 and y-intercepts at plus and minus 2: at theta = pi/4 the point is (2.12, 1.41) and the tangent has gradient -2/3.",
    "Figure: the ellipse x²/9 + y²/4 = 1 and its tangent at θ = π/4, gradient −2/3", { block: "Example 4" });
}

// diff/stationary-points Example 1: cubic and the line y = k, three roots when 1 < k < 5
{
  const f = (x) => x ** 3 - 6 * x * x + 9 * x + 1;
  const s3 = Math.sqrt(3);
  const ax = D.axes({ pad: P, x: [-1, 5], y: [-3, 9], xTicks: 1, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[-1, 3], [5, 3]], { stroke: C.amber, width: 2 }) + ax.plot(f, { domain: [-0.4, 4.4] }) + [2 - s3, 2, 2 + s3].map((x) => ax.point(x, 3, { stroke: C.amber })).join("") +
    ax.point(1, 5) + ax.point(3, 1) + ax.tag(1, 5, "max (1, 5)", { dx: 12, dy: -12, size: 13 }) + ax.line([[3, 1], [3, -1.1]], { stroke: C.muted, width: 1.4 }) + ax.tag(3, -1.1, "min (3, 1)", { dx: -40, dy: 18, size: 13 }) +
    ax.label(5, 3, "y = 3: three roots", { fill: C.amber, anchor: "end", weight: 700, dy: -8 }) + ax.label(0.2, 8.4, "y = x³ − 6x² + 9x + 1", { fill: C.blue, weight: 700 });
  await fig("diff/stationary-points", "cubic-turning-points-three-roots", D.svg(540, 400, body),
    "Graph of y = x^3 - 6x^2 + 9x + 1 with its maximum (1, 5) and minimum (3, 1): a horizontal line y = k cuts the curve three times when k lies between 1 and 5, shown here for k = 3 at x = 0.27, 2 and 3.73.",
    "Figure: y = k meets the cubic three times when 1 < k < 5 (shown for k = 3)", { heading: "Curve sketching" });
}

// diff/stationary-points Example 2: y = x^4 - 4x^3
{
  const f = (x) => x ** 4 - 4 * x ** 3;
  const ax = D.axes({ pad: P, x: [-1.5, 4.5], y: [-30, 40], xTicks: 1, yTicks: 10, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-1.4, 4.4] }) + ax.point(0, 0) + ax.point(3, -27) +
    ax.tag(0, 0, "(0, 0): stationary point of inflexion", { dx: -20, dy: -20, size: 13 }) + ax.tag(3, -27, "minimum (3, −27)", { dx: -80, dy: 30, size: 13 }) + ax.label(2.4, 33, "y = x⁴ − 4x³", { fill: C.blue, weight: 700 });
  await fig("diff/stationary-points", "quartic-inflexion-and-minimum", D.svg(540, 420, body),
    "Graph of y = x^4 - 4x^3: the curve falls through the origin with a horizontal tangent but no turning point there, a stationary point of inflexion at (0, 0), then reaches a minimum at (3, -27) and rises.",
    "Figure: y = x⁴ − 4x³ flattens at (0, 0) without turning, then has a minimum at (3, −27)", { block: "Example 2" });
}

// diff/stationary-points Example 3: A = 2 pi r^2 + 256 pi / r
{
  const A = (r) => 2 * PI * r * r + 256 * PI / r;
  const ax = D.axes({ pad: P, x: [0, 9], y: [0, 800], xTicks: 1, yTicks: 100, w: 540, h: 400, xLabel: "r (cm)", yLabel: "A (cm²)" });
  const body = ax.frame + ax.plot(A, { domain: [1.0, 8.7] }) + ax.point(4, 96 * PI) + ax.guides(4, 96 * PI) + ax.tag(4.4, 200, "minimum: r = 4, A = 96π ≈ 302", { dx: 0, dy: 0, size: 13 });
  await fig("diff/stationary-points", "tin-surface-area-minimum", D.svg(540, 400, body),
    "Graph of the surface area A = 2 pi r^2 + 256 pi / r of a closed tin of volume 128 pi cm^3 against the radius r: A falls to a minimum of 96 pi, about 302 cm^2, at r = 4 cm and rises again for larger r.",
    "Figure: the surface area of the tin is least, 96π ≈ 302 cm², when r = 4 cm", { block: "Example 3" });
}

// data/histograms-cumulative Example 1: histogram of homework times
{
  const cls = [[0, 10, 8], [10, 20, 14], [20, 40, 30], [40, 60, 18], [60, 100, 10]];
  const ax = D.axes({ pad: P, x: [0, 100], y: [0, 1.8], xTicks: 10, yTicks: 0.2, w: 560, h: 400, xLabel: "time t (minutes)", yLabel: "frequency density" });
  let body = ax.frame;
  cls.forEach(([a, b, f]) => { const d = f / (b - a); body += D.rect(ax.X(a), ax.Y(d), ax.X(b) - ax.X(a), ax.Y(0) - ax.Y(d), { fill: C.fillBlue, stroke: C.blue, width: 2 }) + D.text((ax.X(a) + ax.X(b)) / 2, ax.Y(d / 2) + 5, `f = ${f}`, { anchor: "middle", size: 13, fill: C.blue }) + D.text((ax.X(a) + ax.X(b)) / 2, ax.Y(d) - 6, String(d), { anchor: "middle", size: 13, fill: C.ink, weight: 700 }); });
  await fig("data/histograms-cumulative", "histogram-unequal-class-widths", D.svg(560, 400, body),
    "Histogram of the homework times of 80 learners with unequal classes: the bar heights are frequency densities 0.8, 1.4, 1.5, 0.9 and 0.25 for the classes 0-10, 10-20, 20-40, 40-60 and 60-100 minutes, and the area of each bar equals its frequency 8, 14, 30, 18 and 10; the 20 to 40 class is the modal class.",
    "Figure: bar height is frequency density, so the area of each bar is its frequency", { block: "Example 1" });
}

// data/histograms-cumulative Example 3: cumulative frequency graph of goat masses
{
  const pts = [[10, 0], [20, 9], [30, 36], [40, 78], [50, 108], [70, 120]];
  const ax = D.axes({ pad: P, x: [10, 70], y: [0, 130], xTicks: 10, yTicks: 20, w: 560, h: 420, xLabel: "mass (kg)", yLabel: "cumulative frequency" });
  const q = (k) => { for (let i = 1; i < pts.length; i += 1) if (k <= pts[i][1]) return pts[i - 1][0] + ((k - pts[i - 1][1]) / (pts[i][1] - pts[i - 1][1])) * (pts[i][0] - pts[i - 1][0]); };
  const body = ax.frame + ax.line(pts, { stroke: C.blue, width: 2.8 }) + pts.map(([a, b]) => ax.point(a, b)).join("") +
    [[30, C.green, "Q₁ = 27.8"], [60, C.amber, "median = 35.7"], [90, C.red, "Q₃ = 44.0"]].map(([k, col, t]) => ax.line([[10, k], [q(k), k], [q(k), 0]], { stroke: col, width: 1.8, dash: true }) + ax.tag(10.4, k, t, { dx: 0, dy: -6, size: 13, fill: col })).join("") +
    ax.label(40, 20, "120 goats: median at the 60th value", { size: 13, fill: C.muted });
  await fig("data/histograms-cumulative", "cumulative-frequency-goat-masses", D.svg(560, 420, body),
    "Cumulative frequency graph of the masses of 120 goats through the points (10, 0), (20, 9), (30, 36), (40, 78), (50, 108) and (70, 120): reading across from 30, 60 and 90 gives the lower quartile 27.8 kg, the median 35.7 kg and the upper quartile 44.0 kg.",
    "Figure: reading across from 30, 60 and 90 on the cumulative frequency graph gives Q₁, the median and Q₃", { block: "Example 3" });
}

// data/diagrams Example 3: box plot with outlier
{
  const ax = D.axes({ pad: P, x: [0, 32], y: [0, 3], xTicks: 4, yTicks: [], w: 560, h: 280, xLabel: "rainy days", origin: false, arrows: false });
  const Y1 = ax.Y(2.1), Y2 = ax.Y(0.9), Ym = ax.Y(1.5);
  const X = ax.X;
  const body = ax.frame + D.line(X(18.5), ax.Y(2.6), X(18.5), ax.Y(0.3), { stroke: C.muted, width: 1.4, dash: true }) + D.text(X(18.5) + 6, ax.Y(2.55), "upper fence 18.5", { size: 13, fill: C.muted }) +
    D.line(X(3), Ym, X(6), Ym, { width: 2.4 }) + D.line(X(11), Ym, X(12), Ym, { width: 2.4 }) + D.line(X(3), Ym - 12, X(3), Ym + 12, { width: 2.4 }) + D.line(X(12), Ym - 12, X(12), Ym + 12, { width: 2.4 }) +
    D.rect(X(6), Y1, X(11) - X(6), Y2 - Y1, { fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + D.line(X(8), Y1, X(8), Y2, { stroke: C.blue, width: 3.2 }) +
    D.line(X(29) - 7, Ym - 7, X(29) + 7, Ym + 7, { stroke: C.red, width: 2.6 }) + D.line(X(29) - 7, Ym + 7, X(29) + 7, Ym - 7, { stroke: C.red, width: 2.6 }) +
    D.text(X(29), Ym - 18, "outlier 29", { anchor: "middle", size: 13, fill: C.red, weight: 700 }) + D.text(X(3), Y2 + 20, "min 3", { anchor: "middle", size: 13 }) + D.text(X(6), Y1 - 8, "Q₁ 6", { anchor: "middle", size: 13 }) +
    D.text(X(8) + 6, Y2 + 20, "median 8", { anchor: "middle", size: 13, weight: 700 }) + D.text(X(11) + 18, Y1 - 8, "Q₃ 11", { anchor: "middle", size: 13 }) + D.text(X(12) + 8, Ym - 14, "whisker end 12", { size: 13 });
  await fig("data/diagrams", "box-plot-with-outlier", D.svg(560, 280, body),
    "Box-and-whisker plot of the rainy days at 11 weather stations: the box runs from Q1 = 6 to Q3 = 11 with the median at 8, the whiskers reach 3 and 12, and the value 29, above the upper fence 18.5, is marked as an outlier with a cross.",
    "Figure: box plot with the outlier 29 beyond the upper fence 18.5", { block: "Example 3" });
}
