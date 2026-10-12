// Run from the repo root: node .scratch/mathematics-a/diagrams/pure7.mjs   (mechanics)
import { D, C, fig, PI } from "./_h.mjs";
const P = { r: 44, b: 44 };
const rad = (d) => (d * PI) / 180;
const g = 9.8;

// projectiles/motion Example 1: u = 25, alpha = 40 degrees
{
  const u = 25, al = rad(40), tanA = Math.tan(al);
  const y = (x) => x * tanA - (g * x * x) / (2 * u * u * Math.cos(al) ** 2);
  const H = (u * Math.sin(al)) ** 2 / (2 * g), R = (u * u * Math.sin(2 * al)) / g, T = (2 * u * Math.sin(al)) / g;
  const ax = D.axes({ pad: P, x: [0, 70], y: [0, 16], xTicks: 10, yTicks: 2, w: 560, h: 360, xLabel: "x (m)", yLabel: "y (m)" });
  const body = ax.frame + ax.plot(y, { domain: [0, R] }) + ax.arrow(0, 0, 9.5, 9.5 * tanA, { stroke: C.amber, width: 2.6 }) + ax.point(R / 2, H) + ax.guides(R / 2, H) + ax.point(R, 0) +
    ax.tag(R / 2, H, `greatest height ${H.toFixed(1)} m`, { dx: -110, dy: -14, size: 13 }) + ax.tag(R, 0, `range ${R.toFixed(1)} m`, { dx: -118, dy: -16, size: 13 }) +
    ax.label(0.8, 15, "launch: 25 m/s at 40°", { fill: C.amber, weight: 700, size: 14 }) + ax.label(R / 2, 0, `time of flight ${T.toFixed(2)} s`, { size: 13, fill: C.muted, anchor: "middle", dy: -18 });
  await fig("projectiles/motion", "projectile-ball-kicked-40-degrees", D.svg(560, 360, body),
    "Trajectory of a ball kicked at 25 metres per second at 40 degrees above the horizontal from level ground: a parabola rising to a greatest height of 13.2 m halfway along, and landing 62.8 m away after 3.28 s.",
    "Figure: the path is a parabola: greatest height 13.2 m, range 62.8 m, time of flight 3.28 s", { block: "Example 1" });
}

// projectiles/motion Example 3: two angles hit the window (60, 10)
{
  const u = 30;
  const traj = (a) => { const t = Math.tan(rad(a)); return (x) => x * t - (g * x * x) / (2 * u * u * Math.cos(rad(a)) ** 2); };
  const ax = D.axes({ pad: P, x: [0, 70], y: [0, 45], xTicks: 10, yTicks: 10, w: 560, h: 400, xLabel: "x (m)", yLabel: "y (m)" });
  const f1 = traj(31.7), f2 = traj(67.7);
  const body = ax.frame + ax.plot(f1, { domain: [0, 68] }) + ax.plot(f2, { domain: [0, 30], stroke: C.amber }) + ax.plot(f2, { domain: [30, 68], stroke: C.amber }) + ax.point(60, 10, { stroke: C.red, r: 6 }) +
    ax.tag(60, 10, "window (60, 10)", { dx: -70, dy: 34, fill: C.red, size: 13 }) + ax.label(14, 3, "α = 31.7° (flat path)", { fill: C.blue, weight: 700, size: 13 }) + ax.label(22, 41, "α = 67.7° (high lob)", { fill: C.amber, weight: 700, size: 13 }) +
    ax.line([[60, 0], [60, 10]], { stroke: C.muted, width: 1.4, dash: true });
  await fig("projectiles/motion", "projectile-two-angles-same-target", D.svg(560, 400, body),
    "Two trajectories of water leaving a nozzle at 30 metres per second that both pass through the window at (60, 10): the flatter path at 31.7 degrees and the higher lob at 67.7 degrees, the two roots of the quadratic in tan alpha.",
    "Figure: two launch angles, 31.7° and 67.7°, reach the same point (60, 10)", { block: "Example 3" });
}

// forces/friction Example 2: block of 3 kg on a 20 degree rough plane, at rest
{
  const w = 540, h = 330, a = 20, ca = Math.cos(rad(a)), sa = Math.sin(rad(a));
  const A = [50, 290], B = [490, 290], Cc = [490, 290 - 440 * Math.tan(rad(a))];
  const P0 = [A[0] + 250 * ca, A[1] - 250 * sa], up = [ca, -sa], nrm = [-sa, -ca];
  const corner = (s, t) => [P0[0] + up[0] * s + nrm[0] * t, P0[1] + up[1] * s + nrm[1] * t];
  const cen = corner(0, 25), k = 3.2;
  const arrowFrom = (dx, dy, len, col) => D.arrow(cen[0], cen[1], cen[0] + dx * len, cen[1] + dy * len, { stroke: col, width: 2.8 });
  const body = D.polyline([A, B, Cc], { fill: C.fillGrey, stroke: C.axis, width: 2, close: true }) +
    D.polyline([corner(-38, 0), corner(38, 0), corner(38, 50), corner(-38, 50)], { fill: "#ffffff", stroke: C.ink, width: 2.2, close: true }) +
    arrowFrom(0, 1, 30 * k, C.ink) + arrowFrom(nrm[0], nrm[1], 28.19 * k, C.blue) + arrowFrom(up[0], up[1], 10.26 * k, C.red) +
    D.dot(cen[0], cen[1], { r: 3 }) + D.text(cen[0] + 10, cen[1] + 55, "weight 30 N", { size: 14, weight: 700 }) +
    D.text(cen[0] + nrm[0] * 28.19 * k - 40, cen[1] + nrm[1] * 28.19 * k - 8, "R = 28.19 N", { size: 14, fill: C.blue, weight: 700 }) +
    D.text(cen[0] + 20, cen[1] - 75, "F = 10.26 N\n(friction, up the plane)", { size: 14, fill: C.red, weight: 700 }) +
    D.path_(`M${A[0] + 80},${A[1]} A80,80 0 0 0 ${A[0] + 80 * ca},${A[1] - 80 * sa}`, { stroke: C.muted, width: 1.6 }) + D.text(A[0] + 90, A[1] - 8, "20°", { size: 14 }) +
    D.text(20, 28, "3 kg block at rest; μ = 0.45, so the most friction available is 12.69 N", { size: 14, fill: C.muted });
  await fig("forces/friction", "forces-on-block-rough-incline", D.svg(w, h, body),
    "Forces on a 3 kg block at rest on a rough plane inclined at 20 degrees: weight 30 N vertically down, normal reaction R = 28.19 N perpendicular to the plane and friction F = 10.26 N up the plane, which is less than the greatest friction available, 12.69 N.",
    "Figure: friction (10.26 N) acts up the plane and balances the component of weight down the plane", { block: "Example 2" });
}

// newton/connected-particles Example 1: 5 kg and 3 kg over a smooth pulley
{
  const w = 540, h = 390, cx = 270, cyp = 70, r = 28, xl = cx - r, xr = cx + r;
  const box = (x, y0, label) => D.rect(x - 28, y0, 56, 50, { fill: C.fillBlue, stroke: C.blue, width: 2.2, r: 4 }) + D.text(x, y0 + 30, label, { anchor: "middle", size: 15, weight: 700 });
  const yl = 220, yr = 170;
  const body = D.line(cx - 50, 30, cx + 50, 30, { stroke: C.axis, width: 3 }) + D.line(cx, 30, cx, cyp - r, { stroke: C.axis, width: 3 }) + D.circle(cx, cyp, r, { fill: "#fff", stroke: C.ink, width: 2.4 }) + D.dot(cx, cyp, { r: 3 }) +
    D.line(xl, cyp, xl, yl, { stroke: C.ink, width: 2 }) + D.line(xr, cyp, xr, yr, { stroke: C.ink, width: 2 }) + box(xl, yl, "5 kg") + box(xr, yr, "3 kg") +
    D.arrow(xl - 50, yl + 25, xl - 50, yl + 70, { stroke: C.red, width: 2.6 }) + D.text(xl - 60, yl + 92, "a = 2.5", { anchor: "end", size: 14, fill: C.red, weight: 700 }) +
    D.arrow(xr + 50, yr + 25, xr + 50, yr - 20, { stroke: C.red, width: 2.6 }) + D.text(xr + 60, yr - 24, "a = 2.5", { size: 14, fill: C.red, weight: 700 }) +
    D.arrow(xl, yl + 50, xl, yl + 110, { stroke: C.ink, width: 2.6 }) + D.text(xl + 8, yl + 120, "50 N", { size: 14 }) + D.arrow(xr, yr + 50, xr, yr + 90, { stroke: C.ink, width: 2.6 }) + D.text(xr + 8, yr + 104, "30 N", { size: 14 }) +
    D.tag(xl - 6, 140, "T = 37.5 N", { anchor: "end", size: 14, fill: C.blue }) + D.tag(xr + 6, 120, "T = 37.5 N", { size: 14, fill: C.blue });
  await fig("newton/connected-particles", "pulley-two-particles-5kg-3kg", D.svg(w, h, body),
    "Two particles of mass 5 kg and 3 kg hanging over a smooth pulley: the heavier one accelerates downwards and the lighter one upwards, each at 2.5 m per second squared, with the same tension 37.5 N throughout the string; the weights are 50 N and 30 N.",
    "Figure: the string tension is 37.5 N on both sides; the particles have the same acceleration size, 2.5 m/s²", { block: "Example 1" });
}

// newton/connected-particles Example 2: block on a rough table joined to a hanging particle
{
  const w = 540, h = 340, tx = 340;
  const blockX = [150, 205], by = [96, 146];
  const body = D.line(40, 146, tx, 146, { stroke: C.axis, width: 3 }) + D.line(tx, 146, tx, 320, { stroke: C.axis, width: 3 }) +
    D.rect(blockX[0], by[0], 55, 50, { fill: C.fillBlue, stroke: C.blue, width: 2.2, r: 4 }) + D.text(177, 126, "4 kg", { anchor: "middle", size: 15, weight: 700 }) +
    D.path_(`M${blockX[1]},120 L${tx + 4},120 A14,14 0 0 1 ${tx + 18},134 L${tx + 18},210`, { stroke: C.ink, width: 2 }) + D.circle(tx + 4, 134, 14, { fill: "#fff", stroke: C.ink, width: 2.2 }) +
    D.rect(tx - 4, 210, 44, 44, { fill: C.fillAmber, stroke: C.amber, width: 2.2, r: 4 }) + D.text(tx + 18, 238, "2 kg", { anchor: "middle", size: 15, weight: 700 }) +
    D.arrow(blockX[0], 126, blockX[0] - 60, 126, { stroke: C.red, width: 2.8 }) + D.text(blockX[0] - 62, 112, "friction 10 N", { anchor: "end", size: 14, fill: C.red, weight: 700 }) +
    D.arrow(blockX[1], 108, blockX[1] + 70, 108, { stroke: C.blue, width: 2.8 }) + D.text(blockX[1] + 6, 90, "T = 16.7 N", { size: 14, fill: C.blue, weight: 700 }) +
    D.arrow(tx + 18, 254, tx + 18, 306, { stroke: C.ink, width: 2.6 }) + D.text(tx + 28, 296, "20 N", { size: 14 }) + D.arrow(tx + 70, 226, tx + 70, 262, { stroke: C.green, width: 2.6 }) + D.text(tx + 78, 250, "a = 5/3", { size: 14, fill: C.green, weight: 700 }) +
    D.arrow(blockX[0] + 20, 196, blockX[0] + 60, 196, { stroke: C.green, width: 2.6 }) + D.text(blockX[0] + 20, 218, "a = 5/3", { size: 14, fill: C.green, weight: 700 }) + D.text(40, 300, "rough table, μ = 0.25; smooth pulley", { size: 14, fill: C.muted });
  await fig("newton/connected-particles", "pulley-block-on-table-and-hanging-mass", D.svg(w, h, body),
    "A 4 kg block on a rough table (friction 10 N) joined by a string over a smooth pulley to a hanging 2 kg particle (weight 20 N): both move with acceleration 5/3 m per second squared, the string tension is 16.7 N, less than the 20 N weight of the hanging particle.",
    "Figure: forces on the 4 kg block and the 2 kg particle, with the shared tension T = 16.7 N", { block: "Example 2" });
}

// forces/moments-rigid-body Example 1: beam AB with supports C, D
{
  const w = 560, h = 330, x0 = 60, s = 70, yb = 160;
  const X = (m) => x0 + s * m;
  const tri = (m) => D.polyline([[X(m), yb + 2], [X(m) - 16, yb + 34], [X(m) + 16, yb + 34]], { fill: C.fillGrey, stroke: C.axis, width: 2, close: true });
  const body = D.line(X(0), yb, X(6), yb, { stroke: C.ink, width: 7 }) + tri(1) + tri(4.5) +
    D.arrow(X(1), yb + 66, X(1), yb + 38, { stroke: C.blue, width: 2.8 }) + D.text(X(1), yb + 88, "R_C = 63 N", { anchor: "middle", size: 14, fill: C.blue, weight: 700 }) +
    D.arrow(X(4.5), yb + 66, X(4.5), yb + 38, { stroke: C.blue, width: 2.8 }) + D.text(X(4.5), yb + 88, "R_D = 574 N", { anchor: "middle", size: 14, fill: C.blue, weight: 700 }) +
    D.arrow(X(3), yb - 70, X(3), yb - 6, { stroke: C.ink, width: 2.8 }) + D.text(X(3), yb - 78, "beam 392 N", { anchor: "middle", size: 14, weight: 700 }) +
    D.arrow(X(6), yb - 50, X(6), yb - 6, { stroke: C.red, width: 2.8 }) + D.text(X(6), yb - 58, "load 245 N", { anchor: "middle", size: 14, fill: C.red, weight: 700 }) +
    D.text(X(0) - 6, yb - 12, "A", { anchor: "end", size: 16, weight: 700 }) + D.text(X(6) + 10, yb + 5, "B", { size: 16, weight: 700 }) + D.text(X(1) + 22, yb + 28, "C", { size: 15, weight: 700 }) + D.text(X(4.5) + 22, yb + 28, "D", { size: 15, weight: 700 }) +
    D.line(X(0), 250, X(1), 250, { stroke: C.muted, width: 1.4, arrow: true, arrowStart: true }) + D.text((X(0) + X(1)) / 2, 270, "1 m", { anchor: "middle", size: 13, fill: C.muted }) +
    D.line(X(0), 290, X(4.5), 290, { stroke: C.muted, width: 1.4, arrow: true, arrowStart: true }) + D.text(X(2.25), 310, "4.5 m", { anchor: "middle", size: 13, fill: C.muted }) +
    D.line(X(4.5), 250, X(6), 250, { stroke: C.muted, width: 1.4, arrow: true, arrowStart: true }) + D.text(X(5.25), 270, "1.5 m", { anchor: "middle", size: 13, fill: C.muted }) +
    D.text(300, 30, "arrow lengths not to scale", { size: 13, fill: C.muted, anchor: "middle" });
  await fig("forces/moments-rigid-body", "beam-two-supports-and-load", D.svg(w, h, body),
    "Uniform beam AB of length 6 m resting on supports at C (1 m from A) and D (4.5 m from A) with its weight 392 N at the midpoint and a 245 N load at B: taking moments about C gives the reaction at D as 574 N, and resolving vertically gives the reaction at C as 63 N.",
    "Figure: forces on the beam: R_C = 63 N, R_D = 574 N, weight 392 N and load 245 N", { block: "Example 1" });
}

// forces/moments-rigid-body Example 3: ladder against a smooth wall
{
  const w = 540, h = 340, sc = 50, wallX = 430, gy = 290, a = rad(60);
  const foot = [wallX - 5 * Math.cos(a) * sc, gy], top = [wallX, gy - 5 * Math.sin(a) * sc];
  const at = (m) => [foot[0] + m * Math.cos(a) * sc, foot[1] - m * Math.sin(a) * sc];
  const mid = at(2.5), man = at(4);
  const body = D.line(30, gy, 500, gy, { stroke: C.axis, width: 3 }) + D.line(wallX, gy, wallX, 20, { stroke: C.axis, width: 3 }) + D.line(foot[0], foot[1], top[0], top[1], { stroke: C.ink, width: 6 }) +
    D.arrow(mid[0], mid[1], mid[0], mid[1] + 60, { stroke: C.ink, width: 2.6 }) + D.text(mid[0] - 8, mid[1] + 80, "ladder 200 N", { anchor: "end", size: 14, weight: 700 }) +
    D.arrow(man[0], man[1], man[0], man[1] + 60, { stroke: C.red, width: 2.6 }) + D.text(man[0] - 12, man[1] + 20, "painter 700 N", { anchor: "end", size: 14, fill: C.red, weight: 700 }) +
    D.arrow(foot[0], foot[1], foot[0], foot[1] - 70, { stroke: C.blue, width: 2.8 }) + D.text(foot[0] - 8, foot[1] - 80, "R = 900 N", { anchor: "end", size: 14, fill: C.blue, weight: 700 }) +
    D.arrow(foot[0], foot[1] - 12, foot[0] + 70, foot[1] - 12, { stroke: C.green, width: 2.8 }) + D.text(foot[0] + 4, foot[1] + 24, "F = 381 N", { size: 14, fill: C.green, weight: 700 }) +
    D.arrow(top[0], top[1] + 14, top[0] - 70, top[1] + 14, { stroke: C.green, width: 2.8 }) + D.text(top[0] - 74, top[1] + 38, "S = 381 N", { anchor: "end", size: 14, fill: C.green, weight: 700 }) +
    D.path_(`M${foot[0] + 38},${gy} A38,38 0 0 0 ${foot[0] + 38 * Math.cos(a)},${gy - 38 * Math.sin(a)}`, { stroke: C.muted, width: 1.6 }) + D.text(foot[0] + 44, gy - 8, "60°", { size: 14 }) + D.text(wallX + 10, 50, "smooth wall", { size: 13, fill: C.muted }) + D.text(foot[0] - 200, gy + 28, "rough ground", { size: 13, fill: C.muted });
  await fig("forces/moments-rigid-body", "ladder-smooth-wall-rough-ground", D.svg(w, h, body),
    "Forces on a 5 m ladder of weight 200 N at 60 degrees against a smooth wall with a 700 N painter 4 m up it: at the foot the normal reaction R = 900 N upwards and friction F = 381 N towards the wall, and at the top the wall reaction S = 381 N horizontally away from the wall.",
    "Figure: R = 900 N and F = S = 381 N; moments about the foot give S", { block: "Example 3" });
}

// forces/equilibrium Example 2: particle on two strings, and its triangle of forces
{
  const w = 560, h = 300, p = [150, 190];
  const t1 = 13.1, t2 = 17.6, wt = 20, kk = 9;
  const e1 = [p[0] - 110 * Math.cos(rad(30)), p[1] - 110 * Math.sin(rad(30))], e2 = [p[0] + 110 * Math.cos(rad(50)), p[1] - 110 * Math.sin(rad(50))];
  const o = [430, 250];
  const T1 = [-t1 * Math.cos(rad(30)), t1 * Math.sin(rad(30))], T2 = [t2 * Math.cos(rad(50)), t2 * Math.sin(rad(50))];
  const S = (v) => [o[0] + kk * v[0], o[1] - kk * v[1]];
  const q1 = [T1[0], T1[1]], q2 = [T1[0] + T2[0], T1[1] + T2[1]];
  const body = D.line(e1[0], e1[1], p[0], p[1], { stroke: C.blue, width: 2.8 }) + D.line(e2[0], e2[1], p[0], p[1], { stroke: C.amber, width: 2.8 }) + D.dot(e1[0], e1[1], { r: 4 }) + D.dot(e2[0], e2[1], { r: 4 }) +
    D.arrow(p[0], p[1], p[0] + 55 * -Math.cos(rad(30)), p[1] - 55 * Math.sin(rad(30)), { stroke: C.blue, width: 2.6 }) + D.arrow(p[0], p[1], p[0] + 60 * Math.cos(rad(50)), p[1] - 60 * Math.sin(rad(50)), { stroke: C.amber, width: 2.6 }) + D.arrow(p[0], p[1], p[0], p[1] + 70, { stroke: C.ink, width: 2.6 }) +
    D.dot(p[0], p[1], { r: 6 }) + D.text(p[0] - 108, p[1] - 76, "T₁ = 13.1 N", { size: 14, fill: C.blue, weight: 700 }) + D.text(p[0] + 60, p[1] - 70, "T₂ = 17.6 N", { size: 14, fill: C.amber, weight: 700 }) + D.text(p[0] + 8, p[1] + 90, "weight 20 N", { size: 14, weight: 700 }) +
    D.line(p[0] - 70, p[1], p[0] - 70 + 120, p[1], { stroke: C.muted, width: 1.2, dash: true }) + D.text(p[0] - 70, p[1] - 8, "30°", { size: 13 }) + D.text(p[0] + 66, p[1] - 8, "50°", { size: 13 }) +
    D.polyline([S([0, 0]), S(q1), S(q2), S([0, 0])], { stroke: C.axis, width: 1, dash: true }) +
    D.arrow(...S([0, 0]), ...S(q1), { stroke: C.blue, width: 2.8 }) + D.arrow(...S(q1), ...S(q2), { stroke: C.amber, width: 2.8 }) + D.arrow(...S(q2), ...S([0, 0]), { stroke: C.ink, width: 2.8 }) +
    D.text(S(q1)[0] - 12, (S([0, 0])[1] + S(q1)[1]) / 2 + 16, "T₁", { anchor: "end", size: 15, fill: C.blue, weight: 700 }) + D.text((S(q1)[0] + S(q2)[0]) / 2 - 8, (S(q1)[1] + S(q2)[1]) / 2 - 12, "T₂", { anchor: "end", size: 15, fill: C.amber, weight: 700 }) + D.text(S(q2)[0] + 12, (S(q2)[1] + S([0, 0])[1]) / 2, "20 N", { size: 15, weight: 700 }) +
    D.text(300, 36, "triangle of forces: arrows nose to tail close up", { size: 14, fill: C.muted }) + D.text(20, 36, "forces on the particle", { size: 14, fill: C.muted });
  await fig("forces/equilibrium", "equilibrium-two-strings-and-triangle", D.svg(w, h, body),
    "Left, a particle of weight 20 N held by two strings at 30 and 50 degrees to the horizontal with tensions T1 = 13.1 N and T2 = 17.6 N; right, the same three forces drawn nose to tail form a closed triangle, which shows they are in equilibrium.",
    "Figure: three forces in equilibrium form a closed triangle when drawn nose to tail", { block: "Example 2" });
}
