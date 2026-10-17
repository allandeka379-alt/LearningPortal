// Run: node .scratch/mathematics-a/diagrams/mech2.mjs   (lessons are hand-written .md)
import { D, C, fig, PI } from "./_h.mjs";
const rad = (d) => (d * PI) / 180;

// ---- newton/laws Example 3: rough slope 25 deg, mu 0.2
{
  const alpha = 25, mu = 0.2, g = 10;
  const sa = Math.sin(rad(alpha)), ca = Math.cos(rad(alpha));
  const au = g * (sa + mu * ca), ad = g * (sa - mu * ca);
  const panel = (ox, up) => {
    const x0 = ox + 20, y0 = 250;
    const P = (u, v) => [x0 + u * ca - v * sa, y0 - u * sa - v * ca];
    const poly = (pts, o) => D.polyline(pts.map(([u, v]) => P(u, v)), o);
    const arr = (u, v, du, dv, o) => { const a = P(u, v), b = P(u + du, v + dv); return D.arrow(a[0], a[1], b[0], b[1], o); };
    const c = [120, 14];
    const C0 = P(...c);
    let b = D.polyline([[x0, y0], [x0 + 250 * ca, y0], [x0 + 250 * ca, y0 - 250 * sa]], { close: true, fill: C.fillGrey, stroke: C.ink, width: 2.5 }) +
      poly([[96, 0], [144, 0], [144, 28], [96, 28]], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2 }) +
      D.arrow(C0[0], C0[1], C0[0], C0[1] + 62, { stroke: C.ink, width: 2.5 }) +
      arr(c[0], c[1], 0, 58, { stroke: C.blue, width: 2.5 }) +
      arr(c[0], c[1], up ? -34 : 34, 0, { stroke: C.red, width: 2.5 });
    const wEnd = [C0[0], C0[1] + 62], rEnd = P(c[0], c[1] + 58), fEnd = P(c[0] + (up ? -34 : 34), c[1]);
    b += D.text(wEnd[0] + 6, wEnd[1] + 12, "mg", { size: 14, weight: 700 }) +
      D.text(rEnd[0] - 6, rEnd[1] - 4, "R", { size: 14, weight: 700, fill: C.blue, anchor: "end" }) +
      D.text(fEnd[0] + (up ? -4 : 6), fEnd[1] + (up ? 20 : -8), "F", { size: 14, weight: 700, fill: C.red, anchor: up ? "end" : "start" }) + D.text(ox + 145, 284, "R = mg cos 25°,  F = 0.2R", { anchor: "middle", size: 13 });
    const v0 = P(up ? 170 : 232, 44), v1 = P(up ? 232 : 170, 44);
    b += D.arrow(v0[0], v0[1], v1[0], v1[1], { stroke: C.amber, width: 3 }) +
      D.text(v0[0] + (up ? -30 : -40), v0[1] - (up ? 22 : 14), "velocity", { size: 13, fill: C.amber, weight: 700 });
    b += D.text(x0 + 70, y0 - 14, "25°", { size: 14 }) + D.path_(`M${x0 + 56},${y0} A56,56 0 0 0 ${x0 + 56 * ca},${y0 - 56 * sa}`, { stroke: C.ink, width: 1.4 });
    b += D.text(ox + 145, 28, up ? "(a) moving up" : "(b) sliding down", { anchor: "middle", weight: 700, size: 15 }) +
      D.text(ox + 145, 48, up ? `deceleration ${au.toFixed(2)} m/s²` : `acceleration ${ad.toFixed(2)} m/s²`, { anchor: "middle", size: 14, fill: C.muted });
    return b;
  };
  const body = panel(0, true) + panel(290, false);
  await fig("newton/laws", "slope-forces-up-and-down-friction", D.svg(580, 295, body),
    `A particle on a rough plane inclined at 25 degrees with mu = 0.2: moving up the slope, friction F = 0.2R acts down the slope and the deceleration is ${au.toFixed(2)} m/s²; sliding down, friction acts up the slope and the acceleration is ${ad.toFixed(2)} m/s². Friction always opposes the motion.`,
    "Figure: friction acts against the motion, so the same slope gives different accelerations up and down", { block: "Example 3" });
}

// ---- circular/motion Example 2: conical pendulum
{
  const m = 0.3, l = 0.8, th = 30, g = 9.8;
  const T = (m * g) / Math.cos(rad(th)), r = l * Math.sin(rad(th)), w2 = g / (l * Math.cos(rad(th)));
  const Fc = T * Math.sin(rad(th));
  if (Math.abs(T - 3.39) > 0.01 || Math.abs(Fc - m * r * w2) > 1e-9) throw new Error("conical check");
  const px = 230, py = 30, L = 190, s = 24; // px per N
  const bx = px + L * Math.sin(rad(th)), by = py + L * Math.cos(rad(th));
  const tEnd = [bx - T * s * Math.sin(rad(th)), by - T * s * Math.cos(rad(th))];
  const body = D.rect(px - 40, py - 12, 80, 12, { fill: C.fillGrey }) + D.dot(px, py, { r: 4 }) +
    D.line(px, py, px, by, { stroke: C.muted, dash: true, width: 1.4 }) +
    `<ellipse cx="${px}" cy="${by}" rx="${L * Math.sin(rad(th))}" ry="26" fill="none" stroke="${C.muted}" stroke-width="1.6" stroke-dasharray="6 5"/>` +
    D.line(px, py, bx, by, { stroke: C.ink, width: 2.5 }) + D.circle(bx, by, 11, { fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    D.arrow(bx, by, tEnd[0], tEnd[1], { stroke: C.blue, width: 2.5 }) +
    D.arrow(bx, by, bx, by + m * g * s, { stroke: C.ink, width: 2.5 }) +
    D.arrow(bx, by + 2, bx - Fc * s, by + 2, { stroke: C.red, width: 3 }) +
    D.text(px + 4, py + 90, "30°", { size: 14 }) +
    D.tag(tEnd[0] + 150, tEnd[1] + 4, `T = ${T.toFixed(2)} N`, { fill: C.blue, anchor: "end" }) +
    D.text(bx + 10, by + m * g * s + 4, `mg = ${(m * g).toFixed(2)} N`, { size: 14, weight: 700 }) +
    D.text(px - 8, by - 6, "centre", { anchor: "end", size: 13, fill: C.muted }) +
    D.tag(px - 10, py + 100, `l = ${l} m`, { anchor: "end", size: 13 }) + D.tag(px, by + 60, `r = ${r.toFixed(1)} m`, { size: 13, anchor: "middle" }) +
    D.text(20, 305, `T cos 30° = mg gives T = ${T.toFixed(2)} N;  T sin 30° = mrω² gives ω² = ${w2.toFixed(2)}`, { size: 13 });
  await fig("circular/motion", "conical-pendulum-forces", D.svg(560, 320, body),
    "Conical pendulum, string 0.8 m at 30 degrees to the vertical, radius 0.4 m, mass 0.3 kg: the vertical component of the tension balances the weight 2.94 N, giving T = 3.39 N, and the horizontal component 1.70 N towards the centre of the circle gives omega² = 14.1.",
    "Figure: the horizontal component of the tension is the force towards the centre; the vertical component balances the weight", { block: "Example 2" });
}

// ---- circular/motion Example 3: banked bend 12 deg, r = 80
{
  const th = 12, r = 80, g = 9.8;
  const v = Math.sqrt(r * g * Math.tan(rad(th)));
  if (Math.abs(v - 12.9) > 0.05) throw new Error("bank v " + v);
  const ca = Math.cos(rad(th)), sa = Math.sin(rad(th));
  const x0 = 50, y0 = 265, Ls = 440;
  const P = (u, vv) => [x0 + u * ca - vv * sa, y0 - u * sa - vv * ca];
  const c = P(250, 20), mgPx = 110;
  const Rlen = mgPx / ca, e = [c[0] - Rlen * sa, c[1] - Rlen * ca];
  const body = D.polyline([[x0, y0], [x0 + Ls * ca, y0], [x0 + Ls * ca, y0 - Ls * sa]], { close: true, fill: C.fillGrey, stroke: C.ink, width: 2.5 }) +
    D.polyline([P(222, 0), P(278, 0), P(278, 30), P(222, 30)], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2 }) +
    D.arrow(c[0], c[1], c[0], c[1] + mgPx, { stroke: C.ink, width: 2.5 }) +
    D.arrow(c[0], c[1], e[0], e[1], { stroke: C.blue, width: 2.5 }) + D.text(e[0] - 4, e[1] - 8, "R", { weight: 700, fill: C.blue, anchor: "end" }) +
    D.line(c[0], c[1], c[0], c[1] - mgPx, { stroke: C.blue, dash: true, width: 1.6 }) + D.arrow(c[0], c[1] - mgPx, e[0] + 3, e[1] + 0.5, { stroke: C.red, width: 3 }) +
    D.text(c[0] + 8, c[1] + mgPx + 4, "mg", { weight: 700 }) +
    D.text(x0 + 64, y0 + 20, "12°", { size: 14 }) + D.path_(`M${x0 + 60},${y0} A60,60 0 0 0 ${x0 + 60 * ca},${y0 - 60 * sa}`, { stroke: C.ink, width: 1.4 }) +
    D.text(20, 336, "Red arrow: R sin 12° = mv²/r, the force towards the centre", { fill: C.red, size: 13 }) +
    D.text(60, 30, "centre of the bend is on this side", { size: 13, fill: C.muted }) + D.arrow(56, 40, 24, 40, { stroke: C.muted, width: 1.6 }) +
    D.text(20, 356, `R cos 12° = mg and R sin 12° = mv²/r give tan 12° = v²/(rg), so v = ${v.toFixed(1)} m/s`, { size: 13 });
  await fig("circular/motion", "banked-track-forces", D.svg(560, 368, body),
    `Smooth bend banked at 12 degrees, radius 80 m: the normal reaction R leans towards the centre; its vertical component R cos 12° balances the weight mg and its horizontal component R sin 12° supplies the central force, so tan 12° = v²/(rg) and v = ${v.toFixed(1)} m/s.`,
    "Figure: on a banked track the normal reaction supplies the central force", { block: "Example 3" });
}

// ---- com/centre-of-mass Example 2: L-shaped lamina
{
  const whole = { a: 96, c: [6, 4] }, hole = { a: 16, c: [10, 6] };
  const A = whole.a - hole.a;
  const G = [(whole.a * whole.c[0] - hole.a * hole.c[0]) / A, (whole.a * whole.c[1] - hole.a * hole.c[1]) / A];
  if (Math.abs(G[0] - 5.2) > 1e-9 || Math.abs(G[1] - 3.6) > 1e-9) throw new Error("G");
  const ang = (Math.atan(G[1] / G[0]) * 180) / PI;
  const ax = D.axes({ pad: { r: 36, b: 52, t: 30 }, x: [0, 12.5], y: [0, 8.5], xTicks: 2, yTicks: 2, w: 540, h: 400, xLabel: "x (cm)", yLabel: "y (cm)" });
  const shape = [[0, 0], [12, 0], [12, 4], [8, 4], [8, 8], [0, 8]].map(([a, b]) => [ax.X(a), ax.Y(b)]);
  const R = ax.X(2.4) - ax.X(0);
  const body = ax.frame + D.polyline(shape, { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    D.rect(ax.X(8), ax.Y(8), ax.X(12) - ax.X(8), ax.Y(4) - ax.Y(8), { stroke: C.muted, dash: true, width: 1.4 }) +
    ax.point(6, 4, { stroke: C.muted }) + ax.point(10, 6, { stroke: C.muted }) +
    ax.label(10, 6, "removed (10, 6)", { dy: -12, size: 13, anchor: "middle", fill: C.muted }) +
    ax.label(6, 4, "whole (6, 4)", { dx: 6, dy: 22, size: 13, fill: C.muted }) +
    ax.line([[0, 0], G], { stroke: C.red, width: 2, dash: true }) + ax.point(G[0], G[1], { stroke: C.red, r: 5 }) +
    ax.tag(G[0], G[1], `G (${G[0]}, ${G[1]})`, { dx: -70, dy: -14, fill: C.red }) +
    D.path_(`M${ax.X(0) + R},${ax.Y(0)} A${R},${R} 0 0 0 ${ax.X(0) + R * Math.cos(rad(ang))},${ax.Y(0) - R * Math.sin(rad(ang))}`, { stroke: C.red, width: 1.5 }) +
    ax.label(2.6, 0.9, `${ang.toFixed(1)}°`, { size: 13, fill: C.red }) +
    ax.label(0, 0, "O", { dx: -22, dy: 38, weight: 700 }) + ax.label(12, 0, "A", { dx: -18, dy: -10, weight: 700 }) + ax.label(0, 8, "C", { dx: 8, dy: 22, weight: 700 });
  await fig("com/centre-of-mass", "lamina-with-square-removed", D.svg(540, 400, body),
    `L-shaped lamina: a 12 cm by 8 cm rectangle OABC with a 4 cm square removed at corner B has its centre of mass G at (5.2, 3.6) cm, below and left of the whole rectangle's centre (6, 4); hung from O, OG is vertical and OA makes ${ang.toFixed(1)} degrees with it.`,
    "Figure: removing the corner square moves the centre of mass from (6, 4) to G (5.2, 3.6)", { block: "Example 2" });
}

// ---- com/centre-of-mass Example 3: crate toppling
{
  const w = 0.4, h = 1.2, mu = 0.5;
  const topple = (Math.atan(w / 2 / (h / 2)) * 180) / PI, slide = (Math.atan(mu) * 180) / PI;
  if (Math.abs(topple - 18.4) > 0.05 || Math.abs(slide - 26.6) > 0.05) throw new Error("topple");
  const a = Math.atan(w / h), ca = Math.cos(a), sa = Math.sin(a), k = 130;
  const x0 = 60, y0 = 300;
  const P = (u, v) => [x0 + u * ca - v * sa, y0 - u * sa - v * ca];
  const u1 = 150, u2 = u1 + w * k, vh = h * k;
  const G = P((u1 + u2) / 2, vh / 2), Cl = P(u1, 0);
  const body = D.polyline([[x0, y0], [x0 + 400 * ca, y0], [x0 + 400 * ca, y0 - 400 * sa]], { close: true, fill: C.fillGrey, stroke: C.ink, width: 2.5 }) +
    D.polyline([P(u1, 0), P(u2, 0), P(u2, vh), P(u1, vh)], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    D.line(G[0], G[1], G[0], Cl[1] + 6, { stroke: C.red, width: 2, dash: true }) +
    D.dot(G[0], G[1], { r: 5, stroke: C.red }) + D.dot(Cl[0], Cl[1], { r: 4 }) +
    D.text(G[0] + 12, G[1] + 4, "G", { weight: 700, fill: C.red }) +
    D.text(x0 + 90, y0 - 12, `${topple.toFixed(1)}°`, { size: 14 }) + D.path_(`M${x0 + 76},${y0} A76,76 0 0 0 ${x0 + 76 * ca},${y0 - 76 * sa}`, { stroke: C.ink, width: 1.4 }) +
    D.text(300, 60, "The crate is about to topple:", { size: 14, weight: 700 }) +
    D.text(300, 82, "the vertical through G passes", { size: 14 }) + D.text(300, 102, "through the lower edge", { size: 14 }) +
    D.text(300, 140, `tan θ = 0.2 ÷ 0.6 = 1/3, θ = ${topple.toFixed(1)}°`, { size: 14, fill: C.red }) +
    D.text(300, 164, `sliding needs tan θ = 0.5, θ = ${slide.toFixed(1)}°`, { size: 14, fill: C.muted }) +
    D.text(20, 335, "Crate 0.4 m wide, 1.2 m tall: toppling occurs first (18.4° < 26.6°)", { size: 13 });
  await fig("com/centre-of-mass", "crate-toppling-on-plank", D.svg(560, 345, body),
    `A uniform crate 0.4 m wide and 1.2 m tall on a plank: it topples when the vertical through its centre of mass G passes through the lower edge, at tan θ = 0.2/0.6, θ = ${topple.toFixed(1)} degrees, before it would slide at ${slide.toFixed(1)} degrees (mu = 0.5).`,
    "Figure: toppling starts when the vertical through G reaches the lower edge of the base", { block: "Example 3" });
}

// ---- elasticity/hookes-law-energy: tension-extension graph, lambda 24, l 0.8, mg = 4.9
{
  const lam = 24, l = 0.8, T0 = 0.5 * 9.8, k = lam / l, x0 = T0 / k;
  const epe = (lam * x0 * x0) / (2 * l);
  const ax = D.axes({ pad: { r: 40, b: 48 }, x: [0, 0.3], y: [0, 9], xTicks: 0.05, yTicks: 1, w: 540, h: 380, xLabel: "extension x (m)", yLabel: "tension T (N)" });
  const body = ax.frame + ax.area((x) => k * x, null, [0, x0], { fill: C.fillAmber }) + ax.line([[0, 0], [0.3, 9]], { stroke: C.blue }) +
    ax.guides(x0, T0) + ax.point(x0, T0) +
    ax.tag(x0, T0, `x = ${x0.toFixed(3)} m, T = ${T0} N`, { dx: 12, dy: -24, size: 13 }) +
    ax.tag(0.01, 8.6, `T = (λ/l)x = ${k}x   (24 ÷ 0.8 = 30 N/m)`, { fill: C.blue, size: 13 }) +
    ax.tag(0.13, 1.6, `shaded area = EPE = ½ × ${T0} × ${x0.toFixed(3)} = ${epe.toFixed(2)} J`, { fill: C.amber, size: 13, dx: -120 });
  await fig("elasticity/hookes-law-energy", "tension-extension-graph-epe", D.svg(540, 380, body),
    `Tension-extension graph for a string of natural length 0.8 m and modulus 24 N: a straight line of gradient λ/l = 30 N/m, so a load of 4.9 N gives extension 0.163 m and the area under the line, the stored elastic energy, is ${epe.toFixed(2)} J.`,
    "Figure: the area under the tension–extension line is the elastic energy stored", { heading: "Graphically, this is the area of the triangle under the tension" });
}
