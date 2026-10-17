// Run: node .scratch/mathematics-a/diagrams/mix4.mjs   (lessons are hand-written .md)
import { D, C, fig, PI } from "./_h.mjs";
const nf = (v, d = 2) => String(Math.round(v * 10 ** d) / 10 ** d).replace("-", "−");

// ---- diff/first-principles Example 4: chords PQ to the tangent on y = x^3 + 2x at P (1, 3)
{
  const f = (x) => x ** 3 + 2 * x;
  const chord = (h) => 5 + 3 * h + h * h;
  if (f(1) !== 3 || Math.abs((f(2) - f(1)) / 1 - chord(1)) > 1e-9 || Math.abs((f(1.5) - f(1)) / 0.5 - chord(0.5)) > 1e-9) throw new Error("chords");
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [0, 2.3], y: [0, 16], xTicks: 0.5, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const line = (m, a, b, o) => ax.line([[a, 3 + m * (a - 1)], [b, 3 + m * (b - 1)]], o);
  const body = ax.frame + ax.plot(f, { domain: [0, 2.3], stroke: C.ink, width: 2.8 }) +
    line(chord(1), 0.6, 2.1, { stroke: C.red, width: 2 }) + line(chord(0.5), 0.7, 1.9, { stroke: C.amber, width: 2 }) + line(5, 0.3, 2.0, { stroke: C.blue, width: 2.6 }) +
    ax.point(1, 3, { r: 5 }) + ax.point(2, f(2), { stroke: C.red }) + ax.point(1.5, f(1.5), { stroke: C.amber }) +
    ax.tag(1, 3, "P (1, 3)", { dx: 12, dy: 30, size: 13 }) + ax.label(0.08, 13.7, "red chord PQ, h = 1: gradient 9", { size: 13, fill: C.red, weight: 700 }) + ax.label(0.08, 12.6, "orange chord PQ, h = 0.5: gradient 6.75", { size: 13, fill: C.amber, weight: 700 }) + ax.label(0.08, 11.5, "blue tangent at P: gradient 5", { size: 13, fill: C.blue, weight: 700 }) +
    ax.tag(1.9, 3.2, "y = x³ + 2x", { size: 13, dx: 20, dy: 40 });
  await fig("diff/first-principles", "chords-to-tangent-cubic", D.svg(540, 400, body),
    "Curve y = x³ + 2x with P (1, 3): the chord to Q at x = 2 (h = 1) has gradient 5 + 3 + 1 = 9, the chord to Q at x = 1.5 (h = 0.5) has gradient 5 + 1.5 + 0.25 = 6.75, and as Q moves towards P the chord gradient 5 + 3h + h² tends to 5, the gradient of the tangent at P.",
    "Figure: as h gets smaller the chord PQ turns into the tangent at P, with gradient 5 + 3h + h² → 5", { block: "Example 4" });
}

// ---- functions/linear-law Example 1: ln y against ln x
{
  const p1 = [0.5, 2.1], p2 = [2.0, 4.8];
  const n = (p2[1] - p1[1]) / (p2[0] - p1[0]), lnk = p1[1] - n * p1[0];
  if (Math.abs(n - 1.8) > 1e-9 || Math.abs(lnk - 1.2) > 1e-9) throw new Error("linear law 1");
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [0, 2.5], y: [0, 6], xTicks: 0.5, yTicks: 1, w: 540, h: 360, xLabel: "ln x", yLabel: "ln y" });
  const body = ax.frame + ax.line([[0, lnk], [2.5, lnk + n * 2.5]], { stroke: C.blue, width: 2.6 }) +
    ax.line([p1, [p2[0], p1[1]], p2], { stroke: C.muted, width: 1.4, dash: true }) + ax.point(...p1) + ax.point(...p2) + ax.point(0, lnk, { stroke: C.red, r: 5 }) +
    ax.tag(...p1, "(0.5, 2.1)", { dx: 10, dy: 28, size: 13 }) + ax.tag(...p2, "(2.0, 4.8)", { dx: -112, dy: -10, size: 13 }) +
    ax.tag(0, lnk, "intercept ln k = 1.2", { dx: 10, dy: 30, size: 13, fill: C.red }) +
    ax.tag(1.25, 2.1, "Δ(ln x) = 1.5", { dx: -20, dy: 24, size: 13, fill: C.muted }) + 
    ax.tag(0.1, 5.6, "gradient n = 2.7 ÷ 1.5 = 1.8", { size: 13, fill: C.blue }) + ax.tag(2.0, 3.4, "Δ(ln y) = 2.7", { dx: -8, size: 13, fill: C.muted, anchor: "end" });
  await fig("functions/linear-law", "linear-law-ln-y-against-ln-x", D.svg(540, 360, body),
    "Straight-line graph of ln y against ln x through (0.5, 2.1) and (2.0, 4.8): the gradient 2.7 ÷ 1.5 = 1.8 is the power n and the intercept 1.2 on the ln y axis is ln k, so y = kx^n with n = 1.8 and k = e^1.2 = 3.32.",
    "Figure: for y = kxⁿ, a graph of ln y against ln x is a line with gradient n and intercept ln k", { block: "Example 1" });
}

// ---- functions/linear-law Example 2: ln y against x
{
  const p1 = [1, 3.2], p2 = [5, 4.4];
  const lna = (p2[1] - p1[1]) / (p2[0] - p1[0]), lnk = p1[1] - lna * p1[0];
  if (Math.abs(lna - 0.3) > 1e-9 || Math.abs(lnk - 2.9) > 1e-9) throw new Error("linear law 2");
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [0, 6], y: [2, 5], xTicks: 1, yTicks: 0.5, w: 540, h: 340, xLabel: "x", yLabel: "ln y" });
  const body = ax.frame + ax.line([[0, lnk], [6, lnk + 6 * lna]], { stroke: C.blue, width: 2.6 }) +
    ax.line([p1, [p2[0], p1[1]], p2], { stroke: C.muted, width: 1.4, dash: true }) + ax.point(...p1) + ax.point(...p2) + ax.point(0, lnk, { stroke: C.red, r: 5 }) +
    ax.tag(...p1, "(1, 3.2)", { dx: 8, dy: 28, size: 13 }) + ax.tag(...p2, "(5, 4.4)", { dx: -92, dy: -12, size: 13 }) +
    ax.tag(0, lnk, "intercept ln k = 2.9", { dx: 12, dy: 42, size: 13, fill: C.red }) +
    ax.tag(3, 3.2, "Δx = 4", { dx: -30, dy: 26, size: 13, fill: C.muted }) +
    
    ax.tag(0.2, 4.8, "gradient ln a = 1.2 ÷ 4 = 0.3", { size: 13, fill: C.blue }) + ax.tag(5, 3.8, "Δ(ln y) = 1.2", { dx: 8, size: 13, fill: C.muted });
  await fig("functions/linear-law", "linear-law-ln-y-against-x", D.svg(540, 340, body),
    "Straight-line graph of ln y against x through (1, 3.2) and (5, 4.4): the gradient 1.2 ÷ 4 = 0.3 is ln a and the intercept 2.9 is ln k, so y = ka^x with a = e^0.3 = 1.35 and k = e^2.9 = 18.2.",
    "Figure: for y = kaˣ, a graph of ln y against x is a line with gradient ln a and intercept ln k", { block: "Example 2" });
}

// ---- inference/normal-mean-test Example 3: critical regions for x-bar ~ N(75, 1.2^2)
{
  const mu = 75, se = 6 / 5, z1 = 1.645, z2 = 1.96;
  const c1 = mu + z1 * se, lo = mu - z2 * se, hi = mu + z2 * se;
  if (Math.abs(c1 - 76.974) > 1e-3 || Math.abs(lo - 72.648) > 1e-3 || Math.abs(hi - 77.352) > 1e-3) throw new Error("crit");
  const pdf = (x) => Math.exp(-((x - mu) ** 2) / (2 * se * se)) / (se * Math.sqrt(2 * PI));
  const mk = () => D.axes({ pad: { l: 30, r: 28, t: 40, b: 40 }, x: [70, 80], y: [0, 0.36], xTicks: [70, 72, 74, 75, 76, 78, 80], yTicks: [], w: 560, h: 240 });
  const a1 = mk(), a2 = mk();
  const panel1 = a1.frame + a1.area(pdf, null, [c1, 80], { fill: C.fillAmber }) + a1.plot(pdf, { domain: [70, 80], stroke: C.blue }) +
    a1.line([[c1, 0], [c1, 0.17]], { stroke: C.amber, width: 2, dash: true }) + a1.line([[77.1, 0], [77.1, 0.12]], { stroke: C.red, width: 2 }) +
    a1.label(c1, 0.19, `${nf(c1)}`, { anchor: "middle", size: 13, fill: C.amber, weight: 700 }) + a1.label(77.1, 0.105, "", {}) +
    D.text(30, 18, "(a) H₁: μ > 75, 5% in the upper tail: reject if x̄ > 76.97", { size: 14, weight: 700 }) +
    D.text(a1.X(80), 238, "sample mean x̄", { anchor: "end", size: 14, weight: 600 }) + a1.tag(80, 0.3, "x̄ = 77.1 is inside", { anchor: "end", size: 13, fill: C.red });
  const panel2 = a2.frame + a2.area(pdf, null, [70, lo], { fill: C.fillAmber }) + a2.area(pdf, null, [hi, 80], { fill: C.fillAmber }) + a2.plot(pdf, { domain: [70, 80], stroke: C.blue }) +
    a2.line([[lo, 0], [lo, 0.17]], { stroke: C.amber, width: 2, dash: true }) + a2.line([[hi, 0], [hi, 0.17]], { stroke: C.amber, width: 2, dash: true }) + a2.line([[77.1, 0], [77.1, 0.12]], { stroke: C.red, width: 2 }) +
    a2.label(lo, 0.19, `${nf(lo, 3)}`, { anchor: "middle", size: 13, fill: C.amber, weight: 700 }) + a2.label(hi, 0.19, `${nf(hi, 3)}`, { anchor: "middle", size: 13, fill: C.amber, weight: 700 }) +
    D.text(30, 18, "(b) H₁: μ ≠ 75, 2.5% in each tail: reject if x̄ < 72.65 or x̄ > 77.35", { size: 14, weight: 700 }) +
    D.text(a2.X(80), 238, "sample mean x̄", { anchor: "end", size: 14, weight: 600 }) + a2.tag(80, 0.3, "x̄ = 77.1 is not inside", { anchor: "end", size: 13, fill: C.red });
  const body = panel1 + D.group(panel2, { translate: [0, 250] });
  await fig("inference/normal-mean-test", "critical-regions-one-and-two-tailed", D.svg(560, 500, body),
    "Two copies of the distribution of the sample mean N(75, 1.2²): in the one-tailed test the critical region is x̄ > 76.97, in the two-tailed test it is x̄ < 72.65 or x̄ > 77.35; a sample mean of 77.1 (red line) falls in the one-tailed region but not in the two-tailed regions.",
    "Figure: the same sample mean 77.1 is significant in the one-tailed test but not in the two-tailed test", { block: "Example 3" });
}

// ---- shm/motion Example 1: x = 0.5 sin(pi t / 2)
{
  const a = 0.5, T = 4, w = (2 * PI) / T, x1 = 0.3, t1 = Math.asin(x1 / a) / w;
  if (Math.abs(t1 - 0.41) > 0.001) throw new Error("shm t");
  const f = (t) => a * Math.sin(w * t);
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 4], y: [-0.62, 0.62], xTicks: 0.5, yTicks: [-0.5, -0.3, 0, 0.3, 0.5], w: 560, h: 360, yLabel: "x (m)" });
  const body = ax.frame + ax.line([[0, a], [4, a]], { stroke: C.muted, width: 1.2, dash: true }) + ax.line([[0, -a], [4, -a]], { stroke: C.muted, width: 1.2, dash: true }) +
    ax.plot(f, { domain: [0, 4], stroke: C.blue }) + ax.guides(t1, x1) + ax.point(t1, x1, { stroke: C.red, r: 5 }) +
    ax.tag(t1, x1, `x = 0.3 m at t = ${t1.toFixed(3)} s`, { dx: 12, dy: -22, size: 13, fill: C.red }) +
    ax.tag(2.2, 0.56, "amplitude 0.5 m", { size: 13 }) + ax.tag(2.2, 0.27, "x = 0.5 sin(πt/2)", { size: 13, fill: C.blue }) + D.text(ax.X(4), 352, "time t (s)", { anchor: "end", size: 14, weight: 600 }) + D.line(ax.X(0), ax.Y(-0.585), ax.X(4), ax.Y(-0.585), { stroke: C.ink, width: 1.6, arrow: true, arrowStart: true }) + ax.tag(2, -0.585, "period 4 s", { anchor: "middle", size: 13 });
  await fig("shm/motion", "shm-displacement-time-amplitude-05", D.svg(560, 360, body),
    `Displacement-time graph of simple harmonic motion x = 0.5 sin(πt/2): a sine wave of amplitude 0.5 m and period 4 s starting at the centre O; the particle first reaches x = 0.3 m at t = ${t1.toFixed(3)} s.`,
    "Figure: starting from O, SHM x = 0.5 sin(πt/2) first reaches 0.3 m after 0.410 s", { block: "Example 1" });
}

// ---- kinematics/constant-acceleration Example 3: car overtakes truck
{
  const car = (t) => t * t, truck = (t) => 15 * t;
  if (car(15) !== truck(15) || car(15) !== 225) throw new Error("overtake");
  const ax = D.axes({ pad: { r: 40, b: 50 }, x: [0, 20], y: [0, 400], xTicks: 5, yTicks: 100, w: 540, h: 380, xLabel: "time t (s)", yLabel: "distance from the robot (m)" });
  const body = ax.frame + ax.plot(car, { domain: [0, 20], stroke: C.blue }) + ax.plot(truck, { domain: [0, 20], stroke: C.amber }) +
    ax.guides(15, 225) + ax.point(15, 225, { stroke: C.red, r: 5 }) +
    ax.tag(20, 100, "overtake: 15 s, 225 m", { anchor: "end", size: 13, fill: C.red }) + ax.tag(4, 300, "truck: s = 15t", { size: 13, fill: C.amber, dx: 20 }) + ax.tag(17, 360, "car: s = t²", { size: 13, fill: C.blue, dx: -80 });
  await fig("kinematics/constant-acceleration", "car-overtakes-truck-distance-time", D.svg(540, 380, body),
    "Distance-time graphs for a car accelerating from rest at 2 m/s² (s = t², a curve) and a truck at constant 15 m/s (s = 15t, a straight line): the truck is ahead at first and the car overtakes it where the graphs meet, at t = 15 s and 225 m from the robot.",
    "Figure: the car overtakes the truck where the curve s = t² meets the line s = 15t, at t = 15 s", { block: "Example 3" });
}

// ---- momentum/collisions Example 3: P (2 kg) and Q (3 kg) head-on
{
  const mP = 2, mQ = 3, uP = 4, uQ = -2, vP = -1;
  const vQ = (mP * uP + mQ * uQ - mP * vP) / mQ;
  if (Math.abs(vQ - 4 / 3) > 1e-9) throw new Error("vQ");
  const box = (cx, y, label, fill) => D.rect(cx - 28, y - 22, 56, 44, { fill, r: 6, stroke: C.ink }) + D.text(cx, y + 5, label, { anchor: "middle", size: 14, weight: 700 });
  const row = (y, name, pxc, qxc, pv, qv) => {
    let b = D.text(20, y + 5, name, { weight: 700, size: 15 }) + box(pxc, y, "P  2 kg", C.fillBlue) + box(qxc, y, "Q  3 kg", C.fillAmber);
    const arr = (cx, v, col) => (v === 0 ? "" : D.arrow(cx, y - 38, cx + Math.sign(v) * (16 + 22 * Math.abs(v)), y - 38, { stroke: col, width: 3 }) +
      D.text(cx + Math.sign(v) * (8 + 11 * Math.abs(v)), y - 54, `${nf(Math.abs(v))} m/s`, { anchor: "middle", size: 13, fill: col }));
    return b + arr(pxc, pv, C.blue) + arr(qxc, qv, C.amber);
  };
  const body = D.text(20, 28, "positive direction →", { size: 14, fill: C.muted }) + D.arrow(190, 24, 250, 24, { stroke: C.muted, width: 1.6 }) +
    row(100, "Before", 170, 400, uP, uQ) + row(210, "After", 170, 400, vP, vQ) +
    D.text(20, 290, "Before: 2(4) + 3(−2) = 2 N s.   After: 2(−1) + 3vQ", { size: 14 }) +
    D.text(20, 314, `So 3vQ = 4 and vQ = 4/3 = ${vQ.toFixed(2)} m/s in P's original direction`, { size: 14, fill: C.red });
  await fig("momentum/collisions", "head-on-collision-p-and-q", D.svg(560, 330, body),
    "Head-on collision on a smooth line: P (2 kg) moves right at 4 m/s and Q (3 kg) moves left at 2 m/s; momentum before is 2(4) + 3(-2) = 2 N s, and after the collision P moves left at 1 m/s so Q moves right at 4/3 = 1.33 m/s.",
    "Figure: conservation of momentum gives Q's velocity after the collision: 4/3 m/s in P's original direction", { block: "Example 3" });
}
