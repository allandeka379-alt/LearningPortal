// Run: node .scratch/additional-mathematics/diagrams/calc2.mjs   (second diagram pass; lessons are hand-written .md files)
import { D, C, fig } from "./_h.mjs";

// ---- calculus/kinematics Example 1: s = t^3 - 6t^2 + 9t ; v = 3t^2 - 12t + 9 = 3(t-1)(t-3)
{
  const v = (t) => 3 * t * t - 12 * t + 9;
  const ax = D.axes({ x: [0, 4.4], y: [-5, 10], xTicks: 1, yTicks: 5, w: 540, h: 400, xLabel: "t (s)", yLabel: "v (m/s)" });
  const body = ax.frame + ax.area(v, null, [1, 3], { fill: C.fillAmber }) + ax.plot(v, { domain: [0, 4.2] }) +
    ax.point(1, 0, { fill: "#fff", stroke: C.red }) + ax.point(3, 0, { fill: "#fff", stroke: C.red }) +
    ax.tag(1, 0, "at rest, t = 1", { dx: -78, dy: -22, size: 13 }) + ax.tag(3, 0, "at rest, t = 3", { dx: 8, dy: -22, size: 13 }) +
    ax.tag(2, v(2), "v = −3 (backwards)", { dx: -62, dy: 30, fill: C.amber, size: 13 }) +
    ax.tag(0, v(0), "v = 9", { dx: 10, dy: 4, size: 13 }) + ax.tag(4, v(4), "v = 9", { dx: -64, dy: 0, size: 13 });
  await fig("calculus/kinematics", "kinematics-velocity-roots", D.svg(540, 400, body),
    "Velocity-time graph of v = 3t^2 - 12t + 9: v is zero at t = 1 s and t = 3 s, negative (moving backwards) between them with a minimum of -3 m/s at t = 2, and returns to 9 m/s at t = 0 and t = 4.",
    "Figure: v = 3(t − 1)(t − 3) crosses zero twice, so the particle turns round at t = 1 and t = 3", { block: "Example 1" });
}
// Example 2: displacements 0, 4, 0, 4 at t = 0, 1, 3, 4
{
  const s = (t) => t ** 3 - 6 * t * t + 9 * t;
  const ax = D.axes({ x: [0, 4.4], y: [-1, 6], xTicks: 1, yTicks: 1, w: 540, h: 400, xLabel: "t (s)", yLabel: "s (m)" });
  let body = ax.frame + ax.plot(s, { domain: [0, 4.2] });
  for (const [t, label, dx, dy] of [[0, "s = 0", 10, -8], [1, "s = 4", 10, -4], [3, "s = 0", 8, 28], [4, "s = 4", -70, -4]]) body += ax.point(t, s(t)) + ax.tag(t, s(t), label, { dx, dy, size: 13 });
  body += ax.tag(2, 2, "stages: 4 + 4 + 4 = 12 m", { dx: -40, dy: -60, fill: C.amber, size: 13 });
  await fig("calculus/kinematics", "kinematics-displacement-stages", D.svg(540, 400, body),
    "Displacement-time graph of s = t^3 - 6t^2 + 9t: s = 0 at t = 0, rises to 4 m at t = 1, falls back to 0 at t = 3, then rises to 4 m at t = 4, so the distance travelled is 4 + 4 + 4 = 12 m but the displacement is 4 m.",
    "Figure: s rises to 4 m, returns to 0, then rises to 4 m again: distance 12 m, displacement 4 m", { block: "Example 2" });
}
// Example 4: v = 10 - 10e^{-0.2t}; distance in first 5 s = 50/e = 18.4
{
  const v = (t) => 10 - 10 * Math.exp(-0.2 * t);
  const ax = D.axes({ x: [0, 14], y: [0, 12], xTicks: 2, yTicks: 2, w: 540, h: 380, xLabel: "t (s)", yLabel: "v (m/s)" });
  const body = ax.frame + ax.area(v, null, [0, 5], { fill: C.fillBlue }) + ax.line([[0, 10], [14, 10]], { stroke: C.muted, width: 1.6, dash: "6 5" }) +
    ax.plot(v) + ax.label(14, 10, "v → 10", { dx: -70, dy: -8, size: 13, fill: C.muted }) +
    ax.tag(5, 0, "shaded area = distance in 5 s = 50/e ≈ 18.4 m", { dx: -150, dy: -62, size: 13, fill: C.blue }) +
    ax.point(5, v(5)) + ax.label(5, v(5), "v(5) ≈ 6.3", { dx: 8, dy: 22, size: 13 });
  await fig("calculus/kinematics", "kinematics-cyclist-limit", D.svg(540, 380, body),
    "Velocity-time graph of v = 10 - 10e^(-0.2t): the cyclist speeds up from rest and approaches but never reaches 10 m/s; the area under the curve for the first 5 s is the distance, 50/e, about 18.4 m.",
    "Figure: the cyclist's velocity levels off towards 10 m/s; the shaded area is the distance in 5 s", { block: "Example 4" });
}

// ---- calculus/integration-basics Example 4: dy/dx = 3x^2 - 4/x^2 through (2, 9): y = x^3 + 4/x - 1
{
  const g = (c) => (x) => x ** 3 + 4 / x + c;
  const ax = D.axes({ x: [0, 3.2], y: [-10, 32], xTicks: 0.5, yTicks: 5, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(g(5), { domain: [0.4, 3.1], stroke: C.muted, width: 1.8, dash: "6 5" }) + ax.plot(g(-7), { domain: [0.4, 3.1], stroke: C.muted, width: 1.8, dash: "6 5" }) +
    ax.plot(g(-1), { domain: [0.4, 3.1] }) + ax.point(2, 9) + ax.tag(2, 9, "(2, 9): c = −1", { dx: 10, dy: 34, size: 13, fill: C.blue }) +
    ax.tag(0.4, g(5)(0.4), "c = 5", { dx: 8, dy: -12, size: 13, fill: C.muted }) + ax.tag(0.4, g(-7)(0.4), "c = −7", { dx: 8, dy: 34, size: 13, fill: C.muted }) +
    ax.tag(0.5, 20, "same gradient at each x", { dx: 4, dy: -10, size: 13 });
  await fig("calculus/integration-basics", "integration-family-of-curves", D.svg(540, 420, body),
    "Curves y = x^3 + 4/x + c for c = 5, -1 and -7 are the same shape shifted vertically, all with gradient 3x^2 - 4/x^2; only c = -1 passes through the point (2, 9), which fixes the constant.",
    "Figure: every constant c gives a curve with the same gradient function; the point (2, 9) picks out c = −1", { block: "Example 4" });
}

// ---- calculus/max-min-problems Example 2: V = x(24 - 2x)^2, max 1024 at x = 4
{
  const V = (x) => x * (24 - 2 * x) ** 2;
  const ax = D.axes({ x: [0, 12.5], y: [0, 1200], xTicks: 2, yTicks: 200, w: 540, h: 400, xLabel: "x (cm)", yLabel: "V (cm³)", pad: { l: 72 } });
  const body = ax.frame + ax.plot(V, { domain: [0, 12] }) + ax.guides(4, V(4)) + ax.point(4, V(4), { fill: C.red, stroke: C.red }) +
    ax.tag(4, V(4), "maximum: x = 4, V = 1024", { dx: 14, dy: -6, size: 13, fill: C.red }) +
    ax.tag(12, 0, "x = 12: V = 0", { dx: -100, dy: -30, size: 13, fill: C.muted });
  await fig("calculus/max-min-problems", "maxmin-open-box-volume", D.svg(540, 400, body),
    "Graph of V = x(24 - 2x)^2 for 0 < x < 12: the volume of the open box rises to a maximum of 1024 cm cubed at x = 4 cm and falls to zero at x = 12.",
    "Figure: the volume of the box against the cut size x has its maximum, 1024 cm³, at x = 4", { block: "Example 2" });
}
// Example 3: S = 2 pi r^2 + 32 pi / r, min at r = 2, S = 24 pi
{
  const S = (r) => 2 * Math.PI * r * r + (32 * Math.PI) / r;
  const ax = D.axes({ x: [0.8, 4.4], y: [60, 140], xTicks: 0.5, yTicks: 10, w: 540, h: 400, xLabel: "r (m)", yLabel: "S (m²)", origin: false });
  const body = ax.frame + ax.plot(S, { domain: [0.9, 4.3] }) + ax.line([[2, 60], [2, S(2)]], { stroke: C.muted, width: 1.4, dash: "6 5" }) + ax.point(2, S(2), { fill: C.red, stroke: C.red }) +
    ax.tag(2, S(2), "minimum: r = 2, S = 24π ≈ 75.4", { dx: -70, dy: -26, size: 13, fill: C.red });
  await fig("calculus/max-min-problems", "maxmin-tank-surface-area", D.svg(540, 400, body),
    "Graph of S = 2 pi r^2 + 32 pi / r: the total surface area of the tank falls to a minimum of 24 pi, about 75.4 square metres, at r = 2 m and then rises again.",
    "Figure: the surface area of the closed tank against its radius is least when r = 2 m", { block: "Example 3" });
}

// ---- calculus/rates-of-change Example 4: cone, r = h/2, dV/dt = 2, dh/dt = 1/(2 pi)
{
  const k = 52; // px per metre
  const cx = 270, apexY = 372;
  const H = 6, h = 4; // tank drawn 6 m deep for the picture; water depth 4 m
  const pt = (d) => [cx - (d / 2) * k, apexY - d * k, cx + (d / 2) * k];
  const top = pt(H), wat = pt(h);
  let body = D.polyline([[top[0], top[1]], [cx, apexY], [top[2], top[1]]], { stroke: C.axis, width: 2.5 }) +
    D.polyline([[wat[0], wat[1]], [cx, apexY], [wat[2], wat[1]]], { fill: C.fillBlue, stroke: C.blue, close: true, width: 1.5 }) +
    D.line(wat[0], wat[1], wat[2], wat[1], { stroke: C.blue, width: 2.5 });
  body += D.line(cx + 140, apexY, cx + 140, wat[1], { stroke: C.ink, width: 1.4, arrow: true, arrowStart: true }) + D.text(cx + 150, (apexY + wat[1]) / 2 + 5, "h = 4 m", { size: 14 });
  body += D.line(cx, wat[1] + 16, wat[2] - 4, wat[1] + 16, { stroke: C.ink, width: 1.4, arrow: true }) + D.text(cx, wat[1] + 40, "surface radius r = h/2 = 2 m", { anchor: "middle", size: 13 });
  body += D.arrow(cx, 34, cx, 82, { stroke: C.blue, width: 3 }) + D.text(cx, 24, "water in: dV/dt = 2 m³/min", { anchor: "middle", size: 14, fill: C.blue });
  body += D.text(cx, 414, "V = πh³/12, dV/dh = πh²/4 = 4π at h = 4, so dh/dt = 2 ÷ 4π = 1/(2π) ≈ 0.159 m/min", { anchor: "middle", size: 12.5 });
  await fig("calculus/rates-of-change", "rates-cone-tank", D.svg(540, 430, body),
    "Conical tank with its vertex at the bottom: at depth h = 4 m the water surface has radius r = h/2 = 2 m; with water entering at 2 cubic metres per minute, V = pi h^3 / 12 gives dh/dt = 1/(2 pi), about 0.159 m per minute.",
    "Figure: because r = h/2, the volume depends on h alone: V = πh³/12", { block: "Example 4" });
}

// ---- calculus/volumes-of-revolution Example 2: y = x^2 + 1, x = 0..2
{
  const f = (x) => x * x + 1;
  const ax = D.axes({ x: [-0.4, 2.6], y: [-6, 6], xTicks: 0.5, yTicks: 1, w: 540, h: 440, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, (x) => -f(x), [0, 2], { fill: C.fillBlue }) + ax.plot(f, { domain: [0, 2] }) + ax.plot((x) => -f(x), { domain: [0, 2], dash: "6 5" }) +
    ax.line([[1.2, -f(1.2)], [1.2, f(1.2)]], { stroke: C.amber, width: 3 }) + ax.tag(1.2, 0, "radius y = x² + 1", { dx: 8, dy: -40, size: 13, fill: C.amber }) +
    ax.tag(0.2, 0.2, "y = x² + 1", { dx: 4, dy: -80, size: 13, fill: C.blue }) + ax.tag(2, 5, "x = 2", { dx: -8, dy: -4, size: 13 }) +
        ax.tag(1, -5.4, "dashed: the same curve turned through 180°", { dx: -60, dy: 4, size: 12.5, fill: C.muted });
  await fig("calculus/volumes-of-revolution", "revolution-quadratic-slice", D.svg(540, 440, body),
    "Region under y = x^2 + 1 from x = 0 to x = 2 with its reflection below the x-axis: rotating about the x-axis gives a solid whose cross-section at each x is a circle of radius y = x^2 + 1, so V = pi times the integral of y squared.",
    "Figure: each slice is a disc of radius y, so V = π∫ y² dx between x = 0 and x = 2", { block: "Example 2" });
}
// Example 4: y = 4 - x^2 between -2 and 2
{
  const f = (x) => 4 - x * x;
  const ax = D.axes({ x: [-3, 3], y: [-5, 5], xTicks: 1, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, (x) => -f(x), [-2, 2], { fill: C.fillBlue }) + ax.plot(f, { domain: [-2.6, 2.6] }) + ax.plot((x) => -f(x), { domain: [-2, 2], dash: "6 5" }) +
    ax.line([[0.8, -f(0.8)], [0.8, f(0.8)]], { stroke: C.amber, width: 3 }) + ax.tag(0.8, 0, "radius y", { dx: 8, dy: 4, size: 13, fill: C.amber }) +
    ax.point(-2, 0, { fill: C.red, stroke: C.red }) + ax.point(2, 0, { fill: C.red, stroke: C.red }) + ax.tag(0.3, -4.7, "limits: y = 0 at x = −2 and x = 2", { dx: -120, dy: 0, size: 13, fill: C.red }) +
    ax.tag(-2.9, 4.6, "y = 4 − x²", { dx: 0, dy: 0, size: 13, fill: C.blue });
  await fig("calculus/volumes-of-revolution", "revolution-rugby-ball", D.svg(540, 400, body),
    "Region between y = 4 - x^2 and the x-axis from x = -2 to x = 2, with its reflection below: rotated about the x-axis it forms a closed rugby-ball shape of volume 512 pi over 15 cubic units.",
    "Figure: the limits x = −2 and x = 2 come from solving y = 0; rotating the arch about the x-axis gives a rugby-ball solid", { block: "Example 4" });
}

// ---- calculus/small-increments Example 5: sqrt(25.3) ~ 5.03
{
  const f = Math.sqrt;
  const t = (x) => 5 + (x - 25) / 10;
  const ax = D.axes({ x: [16, 36], y: [3, 7], xTicks: 4, yTicks: 1, w: 540, h: 380, xLabel: "x", yLabel: "y", origin: false });
  const body = ax.frame + ax.plot(f, { domain: [16, 36] }) + ax.line([[16, t(16)], [36, t(36)]], { stroke: C.amber, width: 2, dash: "6 5" }) +
    ax.point(25, 5) + ax.tag(25, 5, "(25, 5)", { dx: 8, dy: 34, size: 13 }) +
    ax.tag(36, 6, "y = √x", { dx: -50, dy: 62, size: 13, fill: C.blue }) + ax.tag(16.5, 6.6, "tangent at x = 25, gradient 1/10", { dx: 0, dy: 0, size: 13, fill: C.amber }) +
    ax.tag(20.5, 3.6, "near x = 25 the tangent and curve almost coincide", { dx: 0, dy: 0, size: 12.5, fill: C.muted });
  await fig("calculus/small-increments", "small-increments-sqrt-tangent", D.svg(540, 380, body),
    "Graph of y = square root of x with its tangent at (25, 5), gradient 1/10: close to x = 25 the tangent and curve almost coincide, so sqrt(25.3) is approximately 5 + 0.1 x 0.3 = 5.03.",
    "Figure: near x = 25 the tangent is a good stand-in for the curve, giving √25.3 ≈ 5.03", { block: "Example 5" });
}

// ---- calculus/trig-exp-log Example 4: y = e^{2x} sin x, gradient 1 at origin
{
  const f = (x) => Math.exp(2 * x) * Math.sin(x);
  const ax = D.axes({ x: [-1, 1.4], y: [-1.5, 6], xTicks: 0.5, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-1, 1.4] }) + ax.line([[-0.3, -0.3], [1.2, 1.2]], { stroke: C.amber, width: 2, dash: "6 5" }) +
    ax.point(0, 0) + ax.tag(0, 0, "gradient 1 at the origin", { dx: 14, dy: 40, size: 13, fill: C.amber }) +
    ax.tag(-0.95, 3.5, "y = e^(2x) sin x", { size: 13, fill: C.blue });
  await fig("calculus/trig-exp-log", "trig-exp-product-tangent", D.svg(540, 400, body),
    "Graph of y = e^(2x) sin x passing through the origin where its tangent is the line y = x with gradient 1, matching dy/dx = e^(2x)(2 sin x + cos x) = 1 at x = 0.",
    "Figure: y = e^(2x) sin x leaves the origin with gradient 1, as dy/dx = e^(2x)(2 sin x + cos x) predicts", { block: "Example 4" });
}
console.log("calc2 done");
