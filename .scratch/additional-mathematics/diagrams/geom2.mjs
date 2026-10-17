// Run: node .scratch/additional-mathematics/diagrams/geom2.mjs   (second diagram pass; lessons are hand-written .md files)
import { D, C, fig, open } from "./_h.mjs";

const deg = (d) => (d * Math.PI) / 180;
const f1 = (v, n = 1) => String(Math.round(v * 10 ** n) / 10 ** n);

// ---- modulus/inequalities Example 4: |2x - 3| < x + 1  ->  2/3 < x < 4
{
  const V = (x) => Math.abs(2 * x - 3), L = (x) => x + 1;
  const ax = D.axes({ x: [-1, 5.5], y: [-1, 7], xTicks: 1, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(L, V, [2 / 3, 4], { fill: C.fillGreen }) + ax.plot(V, { domain: [-1, 5.5] }) + ax.plot(L, { stroke: C.amber }) +
    ax.point(2 / 3, 5 / 3, { fill: C.red, stroke: C.red }) + ax.point(4, 5, { fill: C.red, stroke: C.red }) +
    ax.tag(2 / 3, 5 / 3, "x = 2/3", { dx: -70, dy: -14, size: 13, fill: C.red }) + ax.tag(4, 5, "x = 4", { dx: -66, dy: -12, size: 13, fill: C.red }) +
    ax.tag(-0.9, 5.2, "y = |2x − 3|", { size: 13, fill: C.blue }) + ax.tag(4.4, 1.1, "y = x + 1", { dx: -10, dy: 34, size: 13, fill: C.amber }) +
    ax.tag(1.45, 2.0, "2/3 < x < 4", { size: 13, fill: C.green });
  await fig("modulus/inequalities", "modulus-ineq-v-and-line", D.svg(540, 400, body),
    "Graphs of y = |2x - 3| and y = x + 1: the line crosses the V at x = 2/3 and x = 4 and lies above it between them, so |2x - 3| < x + 1 holds for 2/3 < x < 4.",
    "Figure: the line is above the V-shaped graph only between the crossing points x = 2/3 and x = 4", { block: "Example 4" });
}
// Example 6: |x^2 - 6x + 5| > 3
{
  const f = (x) => Math.abs(x * x - 6 * x + 5);
  const r1 = 3 - Math.sqrt(7), r2 = 3 + Math.sqrt(7);
  const ax = D.axes({ x: [-1, 7], y: [-2, 9], xTicks: 1, yTicks: 1, w: 560, h: 420, xLabel: "x", yLabel: "y" });
  let body = ax.frame + ax.plot(f) + ax.line([[-1, 3], [7, 3]], { stroke: C.amber, width: 2.2 });
  for (const [a, b] of [[-1, r1], [2, 4], [r2, 7]]) body += ax.line([[a, 0], [b, 0]], { stroke: C.red, width: 6 });
  for (const [v, s] of [[r1, f1(r1, 2)], [2, "2"], [4, "4"], [r2, f1(r2, 2)]]) body += ax.line([[v, 0], [v, 3]], { stroke: C.muted, width: 1.4, dash: "6 5" }) + ax.tag(v, -1.5, s, { dx: -14, size: 13, fill: C.red });
  body += ax.tag(5.2, 3, "y = 3", { dx: 30, dy: -6, size: 13, fill: C.amber }) + ax.tag(0.5, 8.6, "y = |x² − 6x + 5|", { size: 13, fill: C.blue }) +
    ax.tag(0.6, 5.6, "thick red parts of the x-axis: graph above y = 3", { dx: 30, dy: 0, size: 12.5, fill: C.red });
  await fig("modulus/inequalities", "modulus-ineq-quadratic-three-pieces", D.svg(560, 420, body),
    "Graph of y = |x^2 - 6x + 5| with the line y = 3: the curve is above the line for x < 3 - sqrt 7 (about 0.35), for 2 < x < 4 where the reflected arch pokes above, and for x > 3 + sqrt 7 (about 5.65), giving three pieces.",
    "Figure: |x² − 6x + 5| > 3 has three pieces, marked in red on the x-axis", { block: "Example 6" });
}

// ---- polynomials/cubic-equations Example 3: x^3 - 3x^2 - 2x + 4 = (x - 1)(x^2 - 2x - 4)
{
  const f = (x) => x ** 3 - 3 * x * x - 2 * x + 4;
  const s5 = Math.sqrt(5);
  const ax = D.axes({ x: [-2, 4], y: [-12, 12], xTicks: 1, yTicks: 4, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  let body = ax.frame + ax.plot(f);
  for (const [r, s, dx, dy] of [[1 - s5, "1 − √5 ≈ −1.24", -70, -26], [1, "x = 1", -20, -24], [1 + s5, "1 + √5 ≈ 3.24", -110, -26]]) body += ax.point(r, 0, { fill: "#fff", stroke: C.red }) + ax.tag(r, 0, s, { dx, dy, size: 13, fill: C.red });
  body += ax.point(0, 4) + ax.tag(0, 4, "(0, 4)", { dx: 10, dy: -8, size: 13 }) + ax.tag(-1.9, -8, "y = x³ − 3x² − 2x + 4", { size: 13, fill: C.blue });
  await fig("polynomials/cubic-equations", "cubic-surd-roots-graph", D.svg(540, 420, body),
    "Graph of y = x^3 - 3x^2 - 2x + 4 crossing the x-axis at x = 1 and at the surd roots 1 - sqrt 5 (about -1.24) and 1 + sqrt 5 (about 3.24) from the quadratic factor, and the y-axis at 4.",
    "Figure: the three roots of the cubic: x = 1 and the surd roots 1 ± √5", { block: "Example 3" });
}

// ---- algebra/linear-inequalities Example 5: 2x - 1 > 5 and 3x + 4 <= 25  ->  3 < x <= 7
{
  const w = 560, h = 260, X = (v) => 40 + (v + 1) * 48;
  const row = (y, label, from, to, openA, openB, arrowL, arrowR) => {
    let b = D.line(X(-1) - 10, y, X(9) + 14, y, { stroke: C.axis, width: 1.6, arrow: true });
    for (let v = -1; v <= 9; v += 1) b += D.line(X(v), y - 5, X(v), y + 5, { stroke: C.axis, width: 1.2 }) + D.text(X(v), y + 22, String(v).replace("-", "−"), { anchor: "middle", size: 13, fill: C.muted });
    const x1 = from === null ? X(-1) - 10 : X(from), x2 = to === null ? X(9) + 14 : X(to);
    b += D.line(x1, y, x2, y, { stroke: C.blue, width: 6, arrow: false });
    if (from !== null) b += D.circle(X(from), y, 6, { fill: openA ? "#fff" : C.blue, stroke: C.blue, width: 2.4 });
    if (to !== null) b += D.circle(X(to), y, 6, { fill: openB ? "#fff" : C.blue, stroke: C.blue, width: 2.4 });
    return b + D.text(40, y - 20, label, { size: 14, weight: 600 });
  };
  const body = row(55, "2x − 1 > 5   gives   x > 3  (open circle at 3)", 3, null, true, false) +
    row(130, "3x + 4 ≤ 25   gives   x ≤ 7  (filled circle at 7)", null, 7, false, false) +
    row(215, "both together: 3 < x ≤ 7  (integers 4, 5, 6, 7)", 3, 7, true, false);
  await fig("algebra/linear-inequalities", "linear-ineq-overlap-number-line", D.svg(w, h, body),
    "Number lines for 2x - 1 > 5 (x > 3, open circle) and 3x + 4 <= 25 (x <= 7, filled circle): the overlap is 3 < x <= 7, which contains the integers 4, 5, 6 and 7.",
    "Figure: two conditions on number lines; the solution is where they overlap, 3 < x ≤ 7", { block: "Example 5" });
}

// ---- coordinate/parallel-perpendicular Example 2: perpendicular bisector of A(1,-2), B(7,6): 3x + 4y - 20 = 0
{
  const A = [1, -2], B = [7, 6], M = [4, 2], P = [0, 5];
  const ax = D.axes({ x: [-3, 10], y: [-4, 9], xTicks: 1, yTicks: 1, w: 560, h: 548, xLabel: "x", yLabel: "y" });
  const bis = (x) => (20 - 3 * x) / 4;
  const a = 0.55, u = [0.6, 0.8], v = [0.8, -0.6];
  const sq = [[M[0] + a * u[0], M[1] + a * u[1]], [M[0] + a * (u[0] + v[0]), M[1] + a * (u[1] + v[1])], [M[0] + a * v[0], M[1] + a * v[1]]];
  const body = ax.frame + ax.line([[-3, bis(-3)], [10, bis(10)]], { stroke: C.amber, width: 2.4 }) + ax.line([A, B], { stroke: C.blue, width: 2.6 }) +
    ax.line([P, A], { stroke: C.muted, width: 1.6, dash: "6 5" }) + ax.line([P, B], { stroke: C.muted, width: 1.6, dash: "6 5" }) + ax.line(sq, { stroke: C.ink, width: 1.4 }) +
    [A, B, M, P].map((p) => ax.point(p[0], p[1])).join("") +
    ax.tag(1, -2, "A(1, −2)", { dx: -8, dy: 30, size: 13 }) + ax.tag(7, 6, "B(7, 6)", { dx: 8, dy: -6, size: 13 }) + ax.tag(4, 2, "M(4, 2)", { dx: 12, dy: 28, size: 13 }) +
    ax.tag(0, 5, "(0, 5)", { dx: 8, dy: -8, size: 13 }) + ax.tag(0.6, 2.6, "PA = √50", { dx: 0, dy: 0, size: 13, fill: C.muted }) + ax.tag(3.2, 6.1, "PB = √50", { dx: -6, dy: -12, size: 13, fill: C.muted }) +
    ax.tag(7.4, -1.2, "3x + 4y − 20 = 0", { dx: -50, dy: 0, size: 13, fill: C.amber }) + ax.tag(5.3, 3.4, "AB: gradient 4/3", { size: 13, fill: C.blue });
  await fig("coordinate/parallel-perpendicular", "perpendicular-bisector-ab", D.svg(560, 548, body),
    "Segment AB from A(1, -2) to B(7, 6) with its perpendicular bisector 3x + 4y - 20 = 0 through the midpoint M(4, 2) at a right angle; the point (0, 5) on the bisector is the same distance, square root of 50, from A and from B.",
    "Figure: the perpendicular bisector passes through the midpoint M(4, 2); every point on it, such as (0, 5), is equidistant from A and B", { block: "Example 2" });
}

// ---- circle/two-circles Example 2: x^2 + y^2 = 25 and (x - 6)^2 + y^2 = 13 cross at (4, +-3)
{
  const ax = D.axes({ x: [-6, 10], y: [-6, 6], xTicks: 2, yTicks: 2, w: 572, h: 440, xLabel: "x", yLabel: "y" });
  const k = ax.X(1) - ax.X(0);
  const body = ax.frame + D.circle(ax.X(0), ax.Y(0), 5 * k, { stroke: C.blue, width: 2.6 }) + D.circle(ax.X(6), ax.Y(0), Math.sqrt(13) * k, { stroke: C.amber, width: 2.6 }) +
    ax.line([[4, -3], [4, 3]], { stroke: C.red, width: 2.4 }) + [[0, 0], [6, 0]].map((p) => ax.point(p[0], p[1])).join("") + ax.point(4, 3, { fill: C.red, stroke: C.red }) + ax.point(4, -3, { fill: C.red, stroke: C.red }) +
    ax.tag(4, 3, "(4, 3)", { dx: 8, dy: -6, size: 13, fill: C.red }) + ax.tag(4, -3, "(4, −3)", { dx: 8, dy: 24, size: 13, fill: C.red }) +
    ax.tag(-4.2, 4.4, "x² + y² = 25, r = 5", { size: 13, fill: C.blue }) + ax.tag(6, 4.8, "(x − 6)² + y² = 13", { dx: 8, size: 13, fill: C.amber }) +
    ax.tag(4, 0, "common chord x = 4", { dx: 6, dy: -8, size: 13, fill: C.red });
  await fig("circle/two-circles", "two-circles-common-chord", D.svg(572, 440, body),
    "Circles x^2 + y^2 = 25 (centre origin, radius 5) and (x - 6)^2 + y^2 = 13 (centre (6, 0), radius about 3.61) cross at (4, 3) and (4, -3); the common chord is the vertical line x = 4, at right angles to the line of centres.",
    "Figure: the circles meet at (4, 3) and (4, −3); the common chord x = 4 is perpendicular to the line of centres", { block: "Example 2" });
}
// Example 1: touching externally, centres (1,2) r 3 and (7,10) r 7, contact (2.8, 4.4)
{
  const ax = D.axes({ x: [-3, 15], y: [-2, 18], xTicks: 2, yTicks: 2, w: 560, h: 600, xLabel: "x", yLabel: "y" });
  const k = ax.X(1) - ax.X(0);
  const T = [2.8, 4.4];
  const body = ax.frame + D.circle(ax.X(1), ax.Y(2), 3 * k, { stroke: C.blue, width: 2.6 }) + D.circle(ax.X(7), ax.Y(10), 7 * k, { stroke: C.amber, width: 2.6 }) +
    ax.line([[1, 2], [7, 10]], { stroke: C.muted, width: 1.6, dash: "6 5" }) + [[1, 2], [7, 10]].map((p) => ax.point(p[0], p[1])).join("") + ax.point(T[0], T[1], { fill: C.red, stroke: C.red }) +
    ax.tag(1, 2, "C₁(1, 2), r = 3", { dx: -100, dy: 34, size: 13, fill: C.blue }) + ax.tag(7, 10, "C₂(7, 10), r = 7", { dx: 8, dy: 30, size: 13, fill: C.amber }) +
    ax.tag(T[0], T[1], "T(2.8, 4.4)", { dx: 14, dy: 24, size: 13, fill: C.red }) + ax.tag(4.6, 6.2, "d = 10 = 3 + 7", { dx: 0, dy: 0, size: 13 });
  await fig("circle/two-circles", "two-circles-touch-externally", D.svg(560, 600, body),
    "Circles with centres C1(1, 2), radius 3, and C2(7, 10), radius 7, whose centres are 10 apart, equal to 3 + 7, so they touch externally at T(2.8, 4.4) on the line joining the centres.",
    "Figure: the centres are 10 apart, equal to the sum of the radii, so the circles touch at one point T on the line of centres", { block: "Example 1" });
}

// ---- vectors/velocity: canoe crossing a river (2.5 m/s relative to water, current 1.5 m/s)
{
  const k = 50, w = 560, h = 330;
  let body = "";
  const O1 = [70, 260], O2 = [390, 260];
  // panel 1: head straight across
  body += D.arrow(O1[0], O1[1], O1[0], O1[1] - 2.5 * k, { stroke: C.blue, width: 2 }) + D.arrow(O1[0], O1[1] - 2.5 * k, O1[0] + 1.5 * k, O1[1] - 2.5 * k, { stroke: C.red, width: 2 }) +
    D.arrow(O1[0], O1[1], O1[0] + 1.5 * k, O1[1] - 2.5 * k, { stroke: C.amber, width: 2 });
  body += D.text(O1[0] - 8, O1[1] - 62, "paddle\n2.5 m/s", { anchor: "end", size: 13, fill: C.blue }) + D.text(O1[0] + 20, O1[1] - 2.5 * k - 10, "current 1.5 m/s", { size: 13, fill: C.red }) +
    D.text(O1[0] + 1.5 * k + 8, O1[1] - 50, "resultant\n2.92 m/s", { size: 13, fill: C.amber });
  body += D.text(O1[0] - 30, 30, "Head straight across", { size: 14, weight: 700 }) + D.text(O1[0] - 30, 50, "time 48 s, carried 72 m downstream", { size: 13 });
  // panel 2: aim upstream so the resultant is straight across
  body += D.arrow(O2[0], O2[1], O2[0] - 1.5 * k, O2[1] - 2 * k, { stroke: C.blue, width: 2 }) + D.arrow(O2[0] - 1.5 * k, O2[1] - 2 * k, O2[0], O2[1] - 2 * k, { stroke: C.red, width: 2 }) +
    D.arrow(O2[0], O2[1], O2[0], O2[1] - 2 * k, { stroke: C.amber, width: 2 });
  body += D.text(O2[0] - 1.5 * k - 6, O2[1] - 40, "paddle 2.5 m/s", { anchor: "end", size: 13, fill: C.blue }) + D.text(O2[0] - 1.5 * k + 6, O2[1] - 2 * k - 10, "current 1.5", { size: 13, fill: C.red }) +
    D.text(O2[0] + 10, O2[1] - 40, "resultant\n2 m/s", { size: 13, fill: C.amber }) + D.text(O2[0] + 2, O2[1] - 8 + 24, "α = 36.9° from straight across", { anchor: "middle", size: 12 });
  body += D.text(O2[0] - 100, 30, "Aim upstream", { size: 14, weight: 700 }) + D.text(O2[0] - 100, 50, "lands directly opposite, time 60 s", { size: 13 });
  await fig("vectors/velocity", "velocity-river-crossing", D.svg(w, h, body),
    "Velocity triangles for a canoe paddled at 2.5 m/s in a river with a 1.5 m/s current: heading straight across gives a resultant of about 2.92 m/s and 72 m of drift in 48 s; aiming upstream at 36.9 degrees makes the resultant 2 m/s straight across, taking 60 s.",
    "Figure: paddle velocity plus current velocity equals the resultant; aiming upstream cancels the drift", { block: "Example 5" });
}

// ---- mechanics: forces on inclined planes
function plane({ alpha, k, forces, label }) {
  const a = deg(alpha), base = [70, 300], run = 400, rise = run * Math.tan(a);
  const u = [Math.cos(a), -Math.sin(a)], n = [-Math.sin(a), -Math.cos(a)];
  let b = D.polyline([base, [base[0] + run, base[1]], [base[0] + run, base[1] - rise]], { fill: C.fillGrey, stroke: C.axis, close: true, width: 2 });
  b += D.path_(`M${base[0] + 60},${base[1]} A60,60 0 0 0 ${base[0] + 60 * Math.cos(a)},${base[1] - 60 * Math.sin(a)}`, { stroke: C.ink, width: 1.4 }) + D.text(base[0] + 68, base[1] - 8, `${alpha}°`, { size: 13 });
  const s = 290, hh = 22, ww = 38;
  const P = [base[0] + s * u[0], base[1] + s * u[1]];
  const corners = [[-ww, 0], [ww, 0], [ww, 2 * hh], [-ww, 2 * hh]].map(([i, j]) => [P[0] + i * u[0] + j * n[0], P[1] + i * u[1] + j * n[1]]);
  b += D.polyline(corners, { fill: "#fff", stroke: C.ink, close: true, width: 2 });
  const Cn = [P[0] + hh * n[0], P[1] + hh * n[1]];
  const dir = { W: [0, 1], R: n, up: u, down: [-u[0], -u[1]], inward: [-n[0], -n[1]] };
  for (const f of forces) {
    const d = dir[f.dir], L = f.mag * k;
    const tip = [Cn[0] + d[0] * L, Cn[1] + d[1] * L];
    b += D.arrow(Cn[0], Cn[1], tip[0], tip[1], { stroke: f.color ?? C.blue, width: f.dashed ? 2 : 3, dash: f.dashed ? "6 5" : undefined });
    b += D.text(tip[0] + (f.dx ?? 0), tip[1] + (f.dy ?? 0), f.text, { anchor: f.anchor ?? "start", size: 13, fill: f.color ?? C.blue });
  }
  b += D.dot(Cn[0], Cn[1], { r: 3 });
  b += D.text(base[0], 326, label, { size: 14, weight: 700 });
  return D.svg(560, 340, b);
}
await fig("mechanics/equilibrium", "plane-smooth-string-equilibrium",
  plane({ alpha: 30, k: 5, label: "2 kg particle held on a smooth 30° plane by a string", forces: [
    { dir: "W", mag: 19.6, text: "weight 19.6 N", dx: 8, dy: 4, color: C.ink },
    { dir: "R", mag: 17.0, text: "R = 19.6 cos 30° ≈ 17.0 N", dx: -190, dy: -6, color: C.blue },
    { dir: "up", mag: 9.8, text: "T = 9.8 N", dx: 0, dy: -22, color: C.amber }] }),
  "Forces on a 2 kg particle in equilibrium on a smooth plane inclined at 30 degrees: weight 19.6 N down, normal reaction about 17.0 N perpendicular to the plane, and a string tension of 9.8 N up the plane, which equals 19.6 sin 30 degrees.",
  "Figure: along the plane T = 19.6 sin 30° = 9.8 N; perpendicular to the plane R = 19.6 cos 30° ≈ 17.0 N", { block: "Example 3" });
await fig("mechanics/friction", "plane-rough-friction-at-rest",
  plane({ alpha: 25, k: 3.2, label: "4 kg block at rest on a rough 25° plane, μ = 0.6", forces: [
    { dir: "W", mag: 39.2, text: "weight 39.2 N", dx: 8, dy: 4, color: C.ink },
    { dir: "R", mag: 35.5, text: "R ≈ 35.5 N", dx: -88, dy: -6, color: C.blue },
    { dir: "up", mag: 16.6, text: "friction 16.6 N (max 21.3 N)", dx: -20, dy: -26, color: C.amber }] }),
  "Forces on a 4 kg block at rest on a rough plane inclined at 25 degrees with friction coefficient 0.6: weight 39.2 N, normal reaction about 35.5 N, and friction up the plane of 16.6 N, which is less than the maximum 21.3 N, so the block does not slip.",
  "Figure: friction needed 16.6 N is below its limit μR ≈ 21.3 N, so the block stays at rest", { block: "Example 3" });
await fig("mechanics/newtons-laws-planes", "plane-rough-sliding-forces",
  plane({ alpha: 30, k: 2.6, label: "5 kg parcel sliding down a rough 30° plane, μ = 0.2", forces: [
    { dir: "W", mag: 49, text: "weight 49 N", dx: 8, dy: 4, color: C.ink },
    { dir: "R", mag: 42.4, text: "R ≈ 42.4 N", dx: -92, dy: -6, color: C.blue },
    { dir: "up", mag: 8.49, text: "F = 0.2R ≈ 8.49 N", dx: -4, dy: -28, color: C.amber },
    { dir: "down", mag: 24.5, text: "49 sin 30° = 24.5 N", dx: -4, dy: 22, color: C.green, anchor: "end", dashed: true }] }),
  "Forces on a 5 kg parcel sliding down a rough plane inclined at 30 degrees with friction coefficient 0.2: weight 49 N, normal reaction about 42.4 N, friction about 8.49 N up the plane, and the weight component 24.5 N down the plane, giving a net 16.0 N and acceleration about 3.20 m/s squared.",
  "Figure: down the plane 24.5 − 8.49 ≈ 16.0 N is the resultant, so a ≈ 3.20 m s⁻²", { block: "Example 3" });

// ---- trig/equations Example 1: sin x = -0.4 ; Example 2: tan 2x = sqrt 3
{
  const al = (Math.asin(0.4) * 180) / Math.PI;
  const ax = D.axes({ x: [0, 360], y: [-1.3, 1.3], xTicks: 45, yTicks: [-1, -0.4, 0, 1], w: 560, h: 380, yLabel: "y", pad: { l: 52 } });
  const s = (x) => Math.sin(deg(x));
  const body = ax.frame + ax.label(360, 0.3, "x (°)", { dx: -44, size: 14, weight: 600 }) + ax.plot(s) + ax.line([[0, -0.4], [360, -0.4]], { stroke: C.amber, width: 2.2 }) +
    ax.line([[180 + al, -0.4], [180 + al, 0]], { stroke: C.muted, width: 1.4, dash: "6 5" }) + ax.line([[360 - al, -0.4], [360 - al, 0]], { stroke: C.muted, width: 1.4, dash: "6 5" }) +
    ax.point(180 + al, -0.4, { fill: C.red, stroke: C.red }) + ax.point(360 - al, -0.4, { fill: C.red, stroke: C.red }) +
    ax.tag(180 + al, -0.4, "203.6°", { dx: -66, dy: 38, size: 13, fill: C.red }) + ax.tag(360 - al, -0.4, "336.4°", { dx: -66, dy: 38, size: 13, fill: C.red }) +
    ax.tag(20, 1, "y = sin x", { size: 13, fill: C.blue }) + ax.tag(20, -0.4, "y = −0.4", { dx: 0, dy: 32, size: 13, fill: C.amber });
  await fig("trig/equations", "trig-eq-sin-negative-solutions", D.svg(560, 380, body),
    "Graph of y = sin x for 0 to 360 degrees with the line y = -0.4: they meet at x = 203.6 degrees and x = 336.4 degrees, the two solutions of sin x = -0.4 in the interval, both in the third and fourth quadrants where sine is negative.",
    "Figure: the line y = −0.4 meets the sine curve twice in 0° to 360°, at 203.6° and 336.4°", { block: "Example 1" });
}
{
  const t2 = (x) => Math.tan(deg(2 * x));
  const ax = D.axes({ x: [0, 360], y: [-4, 4], xTicks: 90, yTicks: [-4, -2, 0, 2, 4], w: 580, h: 400, xLabel: "x (°)", yLabel: "y", pad: { l: 50 } });
  let body = ax.frame;
  for (const v of [45, 135, 225, 315]) body += ax.line([[v, -4], [v, 4]], { stroke: C.muted, width: 1.2, dash: "4 4" });
  const doms = [[0, 44.5], [45.5, 134.5], [135.5, 224.5], [225.5, 314.5], [315.5, 360]];
  for (const d of doms) body += ax.plot(t2, { domain: d, steps: 160 });
  body += ax.line([[0, Math.sqrt(3)], [360, Math.sqrt(3)]], { stroke: C.amber, width: 2.2 });
  for (const x of [30, 120, 210, 300]) body += ax.point(x, Math.sqrt(3), { fill: C.red, stroke: C.red }) + ax.tag(x, 0, String(x) + "°", { dx: -16, dy: 34, size: 13, fill: C.red });
  body += ax.tag(5, -2.6, "y = tan 2x", { size: 13, fill: C.blue }) + ax.tag(250, 2.7, "y = √3 ≈ 1.73", { size: 13, fill: C.amber });
  await fig("trig/equations", "trig-eq-tan-double-angle", D.svg(580, 400, body),
    "Graph of y = tan 2x for 0 to 360 degrees with the line y = square root of 3: tan 2x has period 90 degrees and meets the line four times, at x = 30, 120, 210 and 300 degrees, with asymptotes at 45, 135, 225 and 315 degrees.",
    "Figure: tan 2x repeats every 90°, so tan 2x = √3 has four solutions: 30°, 120°, 210°, 300°", { block: "Example 2" });
}
console.log("geom2 done");
