// Run: node .scratch/mathematics-a/diagrams/geo3.mjs   (lessons are hand-written .md)
import { D, C, fig, PI, eqH } from "./_h.mjs";
const rad = (d) => (d * PI) / 180;
const nf = (v, d = 2) => String(Math.round(v * 10 ** d) / 10 ** d).replace("-", "−");

// ---- complex/de-moivre Example 4: z^3 = 8i
{
  const R = 2, args = [PI / 6, (5 * PI) / 6, -PI / 2];
  const roots = args.map((a) => [R * Math.cos(a), R * Math.sin(a)]);
  if (Math.abs(roots[0][0] - Math.sqrt(3)) > 1e-9 || Math.abs(roots[2][1] + 2) > 1e-9) throw new Error("roots");
  const w = 520, h = 450;
  const ax = D.axes({ pad: { l: 50, r: 40, t: 30, b: 40 }, x: [-3, 3], y: [-2.6, 2.6], xTicks: 1, yTicks: 1, w, h, xLabel: "Re", yLabel: "Im" });
  const unit = ax.X(1) - ax.X(0);
  let body = ax.frame + D.circle(ax.X(0), ax.Y(0), R * unit, { stroke: C.muted, dash: true, width: 1.6 }) +
    D.polyline(roots.map(([a, b]) => [ax.X(a), ax.Y(b)]), { close: true, stroke: C.blue, width: 1.8, fill: C.fillBlue }) +
    ax.point(8 * 0, 8 * 0, {}).replace(/.*/, "");
  roots.forEach(([a, b]) => { body += D.line(ax.X(0), ax.Y(0), ax.X(a), ax.Y(b), { stroke: C.muted, width: 1.2 }) + ax.point(a, b, { stroke: C.red, r: 5 }); });
  body += ax.tag(roots[0][0], roots[0][1], `√3 + i  (2e^(iπ/6))`, { dx: -40, dy: -12, size: 13 }) +
    
    ax.tag(roots[1][0], roots[1][1], `−√3 + i  (2e^(5iπ/6))`, { dx: 44, dy: -14, anchor: "middle", size: 13 }) + ax.label(0.12, -1.0, "|z| = 2", { size: 13, fill: C.muted }) +
    ax.tag(roots[2][0], roots[2][1], `−2i  (2e^(−iπ/2))`, { dx: 12, dy: 6, size: 13 }) +
    
    ax.label(0, 2.45, "", {});
  await fig("complex/de-moivre", "roots-z-cubed-8i-argand", D.svg(w, h, body),
    "Argand diagram of the three roots of z^3 = 8i: they lie on the circle of radius 2 at arguments pi/6, 5pi/6 and -pi/2, the points sqrt(3) + i, -sqrt(3) + i and -2i, which are the vertices of an equilateral triangle 120 degrees apart.",
    "Figure: the cube roots of 8i are equally spaced on the circle |z| = 2", { block: "Example 4" });
}

// ---- matrices/transformations Example 2: shear
{
  const S = [[1, 2], [0, 1]], tri = [[1, 0], [3, 0], [1, 2]];
  const img = tri.map(([x, y]) => [S[0][0] * x + S[0][1] * y, S[1][0] * x + S[1][1] * y]);
  if (img[2][0] !== 5 || img[2][1] !== 2) throw new Error("shear");
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: [-0.5, 7], y: [-0.5, 3.2], xTicks: 1, yTicks: 1, w: 540, h: eqH([-0.5, 7], [-0.5, 3.2], 540), xLabel: "x", yLabel: "y" });
  const P = (pts) => pts.map(([a, b]) => [ax.X(a), ax.Y(b)]);
  const body = ax.frame + D.polyline(P(img), { close: true, fill: C.fillAmber, stroke: C.amber, width: 2.5 }) + D.polyline(P(tri), { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    ax.arrow(1.15, 2.2, 4.85, 2.2, { stroke: C.muted, width: 1.6 }) + ax.tag(3, 2.2, "slides 4 units", { dx: -48, dy: -8, size: 13, fill: C.muted }) +
    ax.label(1, 0, "(1, 0)", { dy: 40, size: 13, anchor: "middle" }) + ax.label(3, 0, "(3, 0)", { dy: 40, size: 13, anchor: "middle" }) +
    ax.label(1, 2, "(1, 2)", { dx: -8, dy: -6, anchor: "end", size: 13 }) + ax.label(5, 2, "(5, 2)", { dx: 8, dy: 4, size: 13 }) +
    ax.label(3.3, 0.55, "image: area 2", { fill: C.amber, size: 13, weight: 700 }) + ax.label(1.15, 0.55, "T", { fill: C.blue, weight: 700, size: 14 });
  await fig("matrices/transformations", "shear-triangle-before-after", D.svg(540, eqH([-0.5, 7], [-0.5, 3.2], 540), body),
    "A shear with matrix (1 2; 0 1) maps the triangle (1, 0), (3, 0), (1, 2) to (1, 0), (3, 0), (5, 2): points on the x-axis stay fixed, the top vertex slides 4 units parallel to the axis, and both triangles have base 2 and height 2, so the area (2) is unchanged because the determinant is 1.",
    "Figure: a shear keeps the base fixed and slides the top vertex, so the area does not change", { block: "Example 2" });
}

// ---- coordinate/straight-lines Example 4: two lines and the y-axis
{
  const P = [3, 5];
  const f1 = (x) => 2 * x - 1, f2 = (x) => (18 - x) / 3;
  if (f1(3) !== 5 || f2(3) !== 5) throw new Error("P");
  const A = [0, f1(0)], B = [0, f2(0)];
  const area = 0.5 * (B[1] - A[1]) * P[0];
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [-1, 9], y: [-2, 8], xTicks: 1, yTicks: 1, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + D.polyline([[ax.X(0), ax.Y(A[1])], [ax.X(0), ax.Y(B[1])], [ax.X(P[0]), ax.Y(P[1])]], { close: true, fill: C.fillAmber, stroke: "none" }) +
    ax.plot(f1, { domain: [-0.5, 4.5], stroke: C.blue }) + ax.plot(f2, { domain: [-1, 9], stroke: C.red }) +
    ax.point(...P) + ax.point(...A) + ax.point(...B) +
    ax.tag(P[0], P[1], "P (3, 5)", { dx: 10, dy: -6 }) + ax.label(0, A[1], "(0, −1)", { dx: 8, dy: 20, size: 13 }) + ax.label(0, B[1], "(0, 6)", { dx: 8, dy: -10, size: 13 }) +
    
    ax.tag(5.0, 3.0, "L₂: x + 3y = 18", { fill: C.red, size: 13 }) + ax.tag(3.7, 6.3, "L₁: y = 2x − 1", { fill: C.blue, size: 13, anchor: "end" });
  const note = D.text(70, 412, `Triangle: base 7 on the y-axis (from −1 to 6), height 3, area ${area} square units`, { size: 13 });
  await fig("coordinate/straight-lines", "two-lines-triangle-yaxis", D.svg(540, 435, body + note),
    `The lines y = 2x - 1 and x + 3y = 18 meet at P (3, 5) and cut the y-axis at (0, -1) and (0, 6); the shaded triangle has base 7 on the y-axis and height 3 (the x-coordinate of P), so its area is ${area} square units.`,
    "Figure: the triangle has its base on the y-axis, so the height is the x-coordinate of P", { block: "Example 4" });
}

// ---- coordinate/straight-lines Example 3: perpendicular bisector of PQ
{
  const Pp = [1, 7], Q = [7, 3], M = [(Pp[0] + Q[0]) / 2, (Pp[1] + Q[1]) / 2];
  if (M[0] !== 4 || M[1] !== 5) throw new Error("M");
  const bis = (x) => (3 * x - 2) / 2; // 3x - 2y - 2 = 0
  if (bis(4) !== 5) throw new Error("bis");
  const xr = [-1, 9], yr = [0, 9];
  const h = eqH(xr, yr, 540);
  const ax = D.axes({ pad: { r: 44, b: 44 }, x: xr, y: yr, xTicks: 1, yTicks: 1, w: 540, h, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([Pp, Q], { stroke: C.blue, width: 3 }) + ax.plot(bis, { domain: [0.67, 6.7], stroke: C.red }) +
    ax.point(...Pp) + ax.point(...Q) + ax.point(...M, { stroke: C.red }) +
    ax.label(1, 7, "P (1, 7)", { dx: -8, dy: -10, size: 14, weight: 700 }) + ax.label(7, 3, "Q (7, 3)", { dx: 8, dy: 22, size: 14, weight: 700 }) +
    ax.tag(4, 5, "M (4, 5)", { dx: 12, dy: 28, size: 13 }) + 
    ax.tag(5.2, 8.4, "3x − 2y − 2 = 0", { fill: C.red, size: 13 }) + ax.label(2.5, 6.1, "m = −2/3", { dx: 0, dy: -12, size: 13, fill: C.blue }) + ax.label(2.5, 3.3, "m = 3/2", { size: 13, fill: C.red, anchor: "end" });
  await fig("coordinate/straight-lines", "perpendicular-bisector-pq", D.svg(540, h, body),
    "The perpendicular bisector of P (1, 7) and Q (7, 3): it passes through the midpoint M (4, 5) with gradient 3/2, the negative reciprocal of the gradient -2/3 of PQ, and has equation 3x - 2y - 2 = 0.",
    "Figure: the perpendicular bisector passes through the midpoint M (4, 5) at right angles to PQ", { block: "Example 3" });
}

// ---- quadratics/completing-square-discriminant Example 1: 2x^2 - 12x + 7
{
  const f = (x) => 2 * x * x - 12 * x + 7;
  const r1 = 3 - Math.sqrt(22) / 2, r2 = 3 + Math.sqrt(22) / 2;
  if (Math.abs(f(r1)) > 1e-9 || f(3) !== -11) throw new Error("vertex");
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [-1, 7], y: [-14, 14], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[3, -14], [3, 14]], { stroke: C.muted, width: 1.4, dash: true }) + ax.plot(f, { domain: [-0.9, 6.9] }) +
    ax.point(3, -11, { stroke: C.red, r: 5 }) + ax.point(0, 7) + ax.point(r1, 0) + ax.point(r2, 0) +
    ax.tag(3, -11, "vertex (3, −11)", { dx: 12, dy: 4, fill: C.red, size: 13 }) + ax.tag(3, 11, "x = 3", { dx: 6, size: 13, fill: C.muted }) +
    ax.tag(0, 7, "(0, 7)", { dx: 10, dy: -8, size: 13 }) + ax.label(r1, 0, `${nf(r1)}`, { dx: 8, dy: -12, size: 13 }) + ax.label(r2, 0, `${nf(r2)}`, { dx: 8, dy: -14, size: 13 });
  await fig("quadratics/completing-square-discriminant", "completed-square-vertex-parabola", D.svg(540, 400, body + D.text(90, 396, "y = 2(x − 3)² − 11: minimum value −11 at x = 3", { size: 13, fill: C.blue })),
    `Graph of y = 2x² - 12x + 7 = 2(x - 3)² - 11: a U-shaped parabola with minimum (vertex) at (3, -11), line of symmetry x = 3, y-intercept 7 and x-intercepts ${nf(r1)} and ${nf(r2)}.`,
    "Figure: completing the square gives the vertex (3, −11) and the line of symmetry x = 3", { block: "Example 1" });
}

// ---- quadratics/completing-square-discriminant Example 4: y = x + k against y = x^2 - 3x + 6
{
  const f = (x) => x * x - 3 * x + 6;
  const disc = (k) => 16 - 4 * (6 - k);
  if (disc(2) !== 0 || disc(4) <= 0 || disc(0) >= 0 || f(2) !== 4) throw new Error("disc");
  const xs = [2 - Math.SQRT2, 2 + Math.SQRT2];
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [-1, 6], y: [0, 14], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-1, 5.4] }) +
    ax.line([[-1, -1 + 4], [6, 6 + 4]], { stroke: C.green, width: 2.2 }) + ax.line([[-1, 1], [6, 8]], { stroke: C.amber, width: 2.4 }) + ax.line([[-1, -1], [6, 6]], { stroke: C.red, width: 2.2 }) +
    ax.point(2, 4, { stroke: C.amber, r: 5 }) + xs.map((x) => ax.point(x, x + 4, { stroke: C.green, r: 4 })).join("") +
    
    ax.label(0.3, 13.2, "k = 4 (y = x + 4): two points", { fill: C.green, size: 13, weight: 700 }) + ax.label(0.3, 12.0, "k = 2 (y = x + 2): tangent at (2, 4)", { fill: C.amber, size: 13, weight: 700 }) + ax.label(0.3, 10.8, "k = 0 (y = x): no points", { fill: C.red, size: 13, weight: 700 }) +
    
    
    
        ax.tag(6, 1.4, "curve: y = x² − 3x + 6", { fill: C.blue, size: 13, anchor: "end" });
  await fig("quadratics/completing-square-discriminant", "line-and-parabola-discriminant", D.svg(540, 400, body),
    "The curve y = x² - 3x + 6 with three lines y = x + k: k = 4 cuts it at two points (discriminant 8 > 0), k = 2 touches it at (2, 4) (discriminant 0, tangent), and k = 0 misses it (discriminant -8 < 0).",
    "Figure: the sign of the discriminant 4k − 8 decides whether the line cuts, touches or misses the curve", { block: "Example 4" });
}

// ---- normal/binomial-approximation Example 1: B(60, 0.4) and N(24, 14.4)
{
  const n = 60, p = 0.4, mu = n * p, v = n * p * (1 - p), sd = Math.sqrt(v);
  const lc = (k) => { let s = 0; for (let i = 1; i <= k; i += 1) s += Math.log((n - k + i) / i); return s; };
  const pmf = (k) => Math.exp(lc(k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
  let tail = 0; for (let k = 30; k <= n; k += 1) tail += pmf(k);
  if (Math.abs(tail - 0.0746) > 0.0006) throw new Error("tail " + tail);
  const npdf = (x) => Math.exp(-((x - mu) ** 2) / (2 * v)) / (sd * Math.sqrt(2 * PI));
  const ax = D.axes({ pad: { r: 36, b: 52 }, x: [10, 40], y: [0, 0.11], xTicks: 4, yTicks: [0, 0.02, 0.04, 0.06, 0.08, 0.1], w: 560, h: 400, xLabel: "X (households using solar lighting)", yLabel: "probability" });
  let bars = "";
  for (let k = 12; k <= 38; k += 1) bars += D.rect(ax.X(k - 0.5), ax.Y(pmf(k)), ax.X(k + 0.5) - ax.X(k - 0.5), ax.Y(0) - ax.Y(pmf(k)), { fill: k >= 30 ? C.fillAmber : C.fillBlue, stroke: k >= 30 ? C.amber : C.teal, width: 1 });
  const body = ax.frame + bars + ax.plot(npdf, { domain: [10, 40], stroke: C.ink, width: 2.4 }) + ax.line([[29.5, 0], [29.5, 0.06]], { stroke: C.red, width: 1.8, dash: true }) +
    
    ax.tag(40, 0.1, "curve: N(24, 14.4)", { size: 13, anchor: "end" }) + ax.label(29.5, 0.064, "29.5", { size: 13, fill: C.red, anchor: "middle" }) +
    ax.tag(40, 0.086, "P(X ≥ 30) exact 0.0746", { size: 13, fill: C.amber, anchor: "end" }) + ax.tag(40, 0.073, "normal 0.0736", { size: 13, anchor: "end" });
  await fig("normal/binomial-approximation", "binomial-normal-overlay-60-04", D.svg(560, 400, body),
    "Bar chart of the binomial distribution B(60, 0.4) with the normal curve N(24, 14.4) drawn over it: the curve follows the bar tops closely, and P(X ≥ 30) is the area of the bars from X = 30, which the normal curve approximates by the area to the right of 29.5 (the continuity correction); exact 0.0746, normal 0.0736.",
    "Figure: the bars are the binomial probabilities, the curve is N(24, 14.4); the tail from 29.5 gives P(X ≥ 30)", { block: "Example 1" });
}

// ---- continuous/rectangular-exponential Example 1: uniform U(0, 15)
{
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 17], y: [0, 0.1], xTicks: 5, yTicks: [0.02, 0.04, 0.06, 0.08, 0.1], w: 540, h: 340, xLabel: "waiting time w (minutes)", yLabel: "f(w)" });
  const h = 1 / 15;
  const body = ax.frame + ax.area(() => h, null, [10, 15], { fill: C.fillAmber }) + ax.line([[0, 0], [0, h], [15, h], [15, 0]], { stroke: C.blue, width: 3 }) +
    ax.line([[10, 0], [10, h]], { stroke: C.amber, width: 2, dash: true }) + ax.line([[7.5, 0], [7.5, h]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.tag(5, h, "f(w) = 1/15", { dx: -40, dy: -10, size: 13, fill: C.blue }) + ax.tag(12.5, 0.03, "P(W > 10) = 5/15 = 0.333", { dx: -78, size: 13, fill: C.amber }) +
    
    ax.tag(6, 0.025, "mean 7.5, sd 4.33", { dx: -50, size: 13, fill: C.muted });
  await fig("continuous/rectangular-exponential", "uniform-waiting-time-0-15", D.svg(540, 340, body),
    "Rectangular distribution U(0, 15) for the waiting time at a kombi rank: a flat density of 1/15 between 0 and 15 minutes; the shaded area from 10 to 15 is P(W > 10) = 5/15 = 1/3, the mean is 7.5 minutes and the standard deviation is 4.33 minutes.",
    "Figure: for a rectangular distribution, probability is a rectangle's area: P(W > 10) = 5/15", { block: "Example 1" });
}

// ---- continuous/rectangular-exponential Example 2: exponential, mean 4
{
  const lam = 0.25, f = (t) => lam * Math.exp(-lam * t), med = Math.log(2) / lam;
  const tail = Math.exp(-lam * 6);
  if (Math.abs(tail - 0.223) > 0.001) throw new Error("tail");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 14], y: [0, 0.28], xTicks: 2, yTicks: [0.05, 0.1, 0.15, 0.2, 0.25], w: 540, h: 360, xLabel: "lifetime t (years)", yLabel: "f(t)" });
  const body = ax.frame + ax.area(f, null, [6, 14], { fill: C.fillAmber }) + ax.plot(f, { domain: [0, 14], stroke: C.blue }) +
    ax.line([[med, 0], [med, f(med)]], { stroke: C.green, width: 2, dash: true }) + ax.line([[4, 0], [4, f(4)]], { stroke: C.muted, width: 1.6, dash: true }) +
    ax.tag(6.4, 0.09, `P(T > 6) = e^(−1.5) = ${tail.toFixed(3)}`, { size: 13, fill: C.amber }) + ax.label(med, 0, `median ${med.toFixed(2)}`, { dx: -4, dy: 42, size: 13, fill: C.green, anchor: "end" }) +
    ax.label(4, 0, "mean 4", { dx: 4, dy: 42, size: 13, fill: C.muted }) + ax.tag(8, 0.2, "f(t) = 0.25e^(−0.25t)", { size: 13, fill: C.blue, dx: 0 });
  await fig("continuous/rectangular-exponential", "exponential-density-mean-4", D.svg(540, 360, body),
    `Exponential density f(t) = 0.25e^(-0.25t) for a battery lifetime with mean 4 years: the curve falls steadily, the median ${med.toFixed(2)} years lies left of the mean 4, and the shaded tail from t = 6 has area e^(-1.5) = ${tail.toFixed(3)}.`,
    "Figure: the median (2.77 years) is below the mean (4 years) because the long right tail pulls the mean up", { block: "Example 2" });
}

// ---- functions/logarithms Example 3: 0.8^n < 0.1
{
  const f = (x) => 0.8 ** x, nstar = Math.log(0.1) / Math.log(0.8);
  if (Math.abs(nstar - 10.31) > 0.01 || !(f(10) > 0.1) || !(f(11) < 0.1)) throw new Error("log");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 14], y: [0, 1.1], xTicks: 2, yTicks: [0.2, 0.4, 0.6, 0.8, 1], w: 540, h: 360, xLabel: "n", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [0, 14] }) + ax.line([[0, 0.1], [14, 0.1]], { stroke: C.red, width: 1.8, dash: true }) +
    ax.line([[nstar, 0], [nstar, 0.1]], { stroke: C.muted, width: 1.4, dash: true }) + ax.point(10, f(10)) + ax.point(11, f(11)) +
    ax.tag(14, 0.62, `n = 10: 0.8¹⁰ = ${f(10).toFixed(3)} > 0.1`, { size: 13, anchor: "end" }) + ax.tag(14, 0.5, `n = 11: 0.8¹¹ = ${f(11).toFixed(4)} < 0.1`, { size: 13, anchor: "end" }) +
    ax.tag(1.5, 0.1, "y = 0.1", { dy: -8, size: 13, fill: C.red }) + ax.tag(14, 0.38, `crossing at n = ${(Math.floor(nstar * 100) / 100).toFixed(2)}…`, { size: 13, anchor: "end" }) + ax.tag(4, 0.6, "y = 0.8ⁿ", { size: 13, fill: C.blue });
  await fig("functions/logarithms", "decay-curve-08-to-the-n", D.svg(540, 360, body),
    `Graph of y = 0.8^n with the line y = 0.1: the curve crosses the line at n = ${(Math.floor(nstar * 100) / 100).toFixed(2)}…, so 0.8^10 = ${f(10).toFixed(3)} is still above 0.1 and 0.8^11 = ${f(11).toFixed(4)} is below, giving least integer n = 11.`,
    "Figure: the decay curve y = 0.8ⁿ crosses y = 0.1 at n = 10.31, so the least whole n is 11", { block: "Example 3" });
}
