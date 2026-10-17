// physics-a dynamics / circular motion. Run: node .scratch/physics-a/diagrams/mechanics2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const g = 9.81;
const rad = (d) => (d * Math.PI) / 180;
const f = (v, d = 0) => v.toFixed(d).replace("-", "−");

// ---- Newton's laws: lift free-body (70 kg, a = 1.5 up) and smooth 25 degree ramp
{
  const m = 70, a = 1.5, W = m * g, R = m * (g + a);
  const s = 0.11; // px per N
  let b = D.text(10, 22, "(a) Person in a lift accelerating upwards", { weight: 700, size: 14 });
  b += D.rect(110, 120, 40, 90, { fill: C.fillGrey, r: 6 }) + D.circle(130, 100, 14, { fill: C.fillGrey });
  b += D.arrow(130, 120, 130, 120 - R * s, { stroke: C.blue, width: 3 }) + D.text(142, 120 - R * s + 4, `R = ${f(R)} N`, { size: 14, fill: C.blue, weight: 600 });
  b += D.arrow(130, 210, 130, 210 + W * s, { stroke: C.red, width: 3 }) + D.text(142, 210 + W * s - 2, `W = mg = ${f(W)} N`, { size: 14, fill: C.red, weight: 600 });
  b += D.arrow(330, 190, 330, 150, { stroke: C.amber, width: 3 }) + D.text(342, 168, `a = ${a} m s⁻²`, { size: 14, fill: C.amber, weight: 600 });
  b += D.text(290, 250, `R − W = ${f(R)} − ${f(W)}`, { size: 14 }) + D.text(290, 270, `= ${f(R - W)} N = ma = 70 × ${a}`, { size: 14 });
  b += D.text(290, 295, "(m = 70 kg, g = 9.81 N/kg)", { size: 13, fill: C.muted });
  const alt1 = `Free-body diagram of a 70 kg person in a lift accelerating upwards at 1.5 m s⁻²: the contact force R = ${f(R)} N upwards is larger than the weight ${f(W)} N downwards, and the resultant of ${f(R - W)} N upwards equals ma.`;
  const cap1 = "Figure: free-body diagram for the lift (arrow lengths drawn to scale)";
  await D.figure(F, "lift-free-body-diagram", D.svg(480, 330, b), { alt: alt1, caption: cap1 });
  D.insertAfter(L("dynamics/newtons-laws"), "## Lifts", D.md("lift-free-body-diagram", alt1, cap1));

  const th = 25, ct = Math.cos(rad(th)), st = Math.sin(rad(th));
  const n = [-st, -ct], dn = [-ct, st];
  const len = 110;
  let r = D.polyline([[40, 280], [440, 280 - 400 * Math.tan(rad(th))], [440, 280]], { fill: C.fillGrey, close: true, stroke: C.muted, width: 1.6 });
  const sy = 280 - (250 - 40) * Math.tan(rad(th));
  const C2 = [250 + n[0] * 16, sy + n[1] * 16];
  r += `<g transform="rotate(${-th} ${C2[0]} ${C2[1]})">${D.rect(C2[0] - 28, C2[1] - 16, 56, 32, { fill: "#fff", r: 3 })}</g>`;
  const arr = (v, l, o, lab, lp) => D.arrow(C2[0], C2[1], C2[0] + v[0] * l, C2[1] + v[1] * l, o) + D.text(C2[0] + v[0] * l + lp[0], C2[1] + v[1] * l + lp[1], lab, { size: 14, fill: o.stroke, weight: 600, anchor: lp[2] ?? "start" });
  r += arr([0, 1], len, { stroke: C.red, width: 3 }, "mg", [8, 14]);
  r += arr(n, len * ct, { stroke: C.blue, width: 3 }, "R = mg cos 25°", [-6, -6, "end"]);
  r += D.arrow(C2[0], C2[1], C2[0] + dn[0] * len * st, C2[1] + dn[1] * len * st, { stroke: C.amber, width: 3 }) + D.text(C2[0] + dn[0] * len * st - 6, C2[1] + dn[1] * len * st + 6, "mg sin 25°", { size: 14, fill: C.amber, weight: 600, anchor: "end" });
  r += D.line(C2[0], C2[1] + len, C2[0] + dn[0] * len * st, C2[1] + dn[1] * len * st, { stroke: C.muted, dash: true, width: 1.4 });
  r += D.text(110, 272, "25°", { size: 14 });
  r += D.text(10, 22, "(b) Trolley on a smooth 25° ramp", { weight: 700, size: 14 });
  r += D.text(10, 320, `Along the slope: mg sin 25° = ma, so a = ${f(g * st, 2)} m s⁻², whatever the mass`, { size: 14, weight: 600 });
  const alt2 = `Free-body diagram of a trolley on a smooth 25° ramp: weight mg straight down and the normal force R = mg cos 25° perpendicular to the slope; the unbalanced component mg sin 25° along the slope gives a = g sin 25° = ${f(g * st, 2)} m s⁻².`;
  const cap2 = "Figure: forces on a trolley on a smooth 25° incline";
  await D.figure(F, "smooth-ramp-free-body-diagram", D.svg(480, 340, r), { alt: alt2, caption: cap2 });
  D.insertAfter(L("dynamics/newtons-laws"), "## Smooth inclined planes", D.md("smooth-ramp-free-body-diagram", alt2, cap2));
}

// ---- Momentum and force: kicked ball (triangle 600 N, 12 ms) and crumple zone (same impulse)
{
  const Fp = 600, T = 12;
  const a = D.axes({ x: [0, 16], y: [0, 700], xTicks: 4, yTicks: 200, xLabel: "t / ms", yLabel: "F / N", w: 560, h: 320 });
  const body = a.frame + a.area((x) => (x <= 6 ? (Fp * x) / 6 : (Fp * (T - x)) / 6), null, [0, 12], { fill: C.fillBlue }) + a.line([[0, 0], [6, Fp], [12, 0]], { stroke: C.blue }) +
    a.guides(6, Fp) + a.tag(6.6, 665, "impulse = area = ½ × 600 × 0.012 = 3.6 N s", { size: 14, fill: C.blue }) + a.tag(4, 200, "area under graph", { size: 14 });
  const alt = "Force-time graph for the kicked ball: the force rises steadily to 600 N and falls to zero over 12 ms, a triangle whose area, ½ × 600 × 0.012 = 3.6 N s, is the impulse and the ball's change in momentum.";
  const cap = "Figure: impulse is the area under a force-time graph (kicked ball)";
  await D.figure(F, "kicked-ball-force-time-graph", D.svg(560, 320, body), { alt, caption: cap });
  D.insertAfter(L("dynamics/momentum-force"), "## Force-time graphs", D.md("kicked-ball-force-time-graph", alt, cap));

  const dp = 1200 * 15;
  const F1 = dp / 0.020, F2 = dp / 0.090;
  const b = D.axes({ x: [0, 100], y: [0, 1000], xTicks: 20, yTicks: 200, xLabel: "t / ms", yLabel: "F / kN", w: 560, h: 340, pad: { l: 64, r: 24, t: 28, b: 56 } });
  const body2 = b.frame +
    b.area(() => F1 / 1000, null, [0, 20], { fill: C.fillAmber }) + b.line([[0, 0], [0, F1 / 1000], [20, F1 / 1000], [20, 0]], { stroke: C.amber }) +
    b.area(() => F2 / 1000, null, [0, 90], { fill: C.fillBlue }) + b.line([[0, 0], [0, F2 / 1000], [90, F2 / 1000], [90, 0]], { stroke: C.blue }) +
    b.tag(24, 900, `rigid car: 20 ms, ${f(F1 / 1000)} kN`, { fill: C.amber, size: 14 }) + b.tag(30, 330, `crumple zone: 90 ms, ${f(F2 / 1000)} kN`, { fill: C.blue, size: 14 }) +
    b.tag(32, 120, "both areas = 18 000 N s", { size: 14 });
  const alt2 = "Two force-time graphs for a 1200 kg car stopping from 15 m/s: a rigid car stops in 20 ms with a force of 900 kN, a crumple zone stops it in 90 ms with 200 kN; the areas are equal (18 000 N s) so a longer time means a much smaller force.";
  const cap2 = "Figure: same impulse, different stopping times (rigid car against crumple zone)";
  await D.figure(F, "crumple-zone-force-time-graph", D.svg(560, 340, body2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("dynamics/momentum-force"), "## Impulse and safety", D.md("crumple-zone-force-time-graph", alt2, cap2));
}

// ---- Conservation of momentum: before / after pictures (sticking trolleys, elastic balls)
{
  const row = (y, label, objs) => {
    let s = D.text(10, y - 36, label, { size: 14, weight: 700 });
    for (const o of objs) {
      s += D.rect(o.x, y - 18, o.w, 36, { fill: o.fill, r: 6 }) + D.text(o.x + o.w / 2, y + 5, o.m, { anchor: "middle", size: 14, weight: 600 });
      if (o.v) s += D.arrow(o.x + o.w / 2, y - 26, o.x + o.w / 2 + o.v * 14, y - 26, { stroke: C.blue, width: 2.4 }) + D.text(o.x + o.w / 2 + o.v * 7, y - 38, o.vl, { anchor: "middle", size: 13, fill: C.blue });
    }
    return s;
  };
  let b = D.text(10, 20, "(a) Trolleys that stick together", { weight: 700 });
  b += row(80, "before", [{ x: 80, w: 60, m: "2.0 kg", fill: C.fillBlue, v: 3, vl: "3.0 m/s" }, { x: 280, w: 60, m: "1.0 kg", fill: C.fillAmber }]);
  b += D.text(380, 85, "p = 6.0 kg m/s", { size: 14 });
  b += row(160, "after", [{ x: 150, w: 100, m: "3.0 kg", fill: C.fillBlue, v: 2, vl: "2.0 m/s" }]);
  b += D.text(380, 165, "p = 6.0 kg m/s", { size: 14 });
  b += D.text(10, 195, "Ek: 9.0 J before, 6.0 J after (inelastic)", { size: 14, fill: C.muted });
  b += D.line(10, 212, 550, 212, { stroke: C.grid, width: 1 });
  b += D.text(10, 236, "(b) Elastic collision of two balls", { weight: 700 });
  b += row(310, "before", [{ x: 60, w: 56, m: "0.40", fill: C.fillBlue, v: 5, vl: "5.0 m/s" }, { x: 300, w: 64, m: "0.60", fill: C.fillAmber }]);
  b += D.text(400, 315, "p = 2.0", { size: 14 });
  b += row(400, "after", [{ x: 100, w: 56, m: "0.40", fill: C.fillBlue, v: -1, vl: "−1.0 m/s" }, { x: 300, w: 64, m: "0.60", fill: C.fillAmber, v: 4, vl: "4.0 m/s" }]);
  b += D.text(400, 405, "p = −0.4 + 2.4 = 2.0", { size: 14 });
  b += D.text(10, 435, "Ek: 5.0 J before and after (masses in kg, p in kg m/s)", { size: 14, fill: C.muted });
  const alt = "Before-and-after pictures: a 2.0 kg trolley at 3.0 m/s sticking to a stationary 1.0 kg trolley moves off at 2.0 m/s (momentum 6.0 kg m/s, kinetic energy 9.0 J to 6.0 J); a 0.40 kg ball at 5.0 m/s hitting a 0.60 kg ball elastically gives -1.0 and 4.0 m/s with total momentum 2.0 kg m/s unchanged.";
  const cap = "Figure: momentum is the same before and after; kinetic energy is lost only when the trolleys stick";
  await D.figure(F, "collisions-before-after", D.svg(560, 450, b), { alt, caption: cap });
  D.insertAfter(L("dynamics/conservation-momentum"), "## Collisions in one dimension", D.md("collisions-before-after", alt, cap));
}

// ---- Terminal velocity: m = 80 kg, D = kv^2, k = 0.25 -> vt = 56.0 m/s ; v = vt tanh(g t / vt)
{
  const m = 80, k = 0.25, vt = Math.sqrt((m * g) / k);
  const a = D.axes({ x: [0, 20], y: [0, 64], xTicks: 4, yTicks: 10, xLabel: "t / s", yLabel: "v / m s⁻¹", w: 560, h: 340 });
  const v = (t) => vt * Math.tanh((g * t) / vt);
  const body = a.frame + a.line([[0, vt], [20, vt]], { stroke: C.muted, width: 1.6, dash: true }) + a.plot(v, { domain: [0, 20] }) +
    a.line([[0, 0], [5.7, g * 5.7]], { stroke: C.amber, width: 1.8, dash: true }) +
    a.tag(3, 62, `terminal velocity ${f(vt, 1)} m/s: drag = weight`, { fill: C.muted, size: 14 }) + a.tag(6.2, 14, "initial gradient g = 9.81", { fill: C.amber, size: 14 }) +
    a.tag(7, 28, "gradient falls as drag grows", { size: 14 });
  const alt = `Velocity-time graph for an 80 kg skydiver with drag 0.25v²: it starts with gradient 9.81 m/s², curves over as drag grows and levels off at the terminal velocity ${f(vt, 1)} m/s (18.9 m/s at 2 s, 49.6 m/s at 8 s) where drag equals weight.`;
  const cap = "Figure: velocity-time graph of a skydiver reaching terminal velocity";
  await D.figure(F, "terminal-velocity-graph", D.svg(560, 340, body), { alt, caption: cap });
  D.insertAfter(L("dynamics/drag-terminal-velocity"), "The velocity-time graph starts with gradient", D.md("terminal-velocity-graph", alt, cap));
}

// ---- Centripetal: conical pendulum (L = 0.80, 30 deg, m = 0.20) and vertical circle (r = 0.60)
{
  const th = 30, Lm = 0.8, m = 0.2, r = Lm * Math.sin(rad(th)), T = (m * g) / Math.cos(rad(th));
  let b = D.text(10, 22, "Conical pendulum: 0.20 kg bob, string 0.80 m", { weight: 700, size: 14 });
  const px = 140, py = 50, bx = px + 150 * Math.sin(rad(th)), by = py + 150 * Math.cos(rad(th));
  b += D.line(px - 40, py, px + 40, py, { width: 4, stroke: C.muted }) + D.line(px, py, bx, by, { width: 2 });
  b += D.line(px, py, px, by + 20, { dash: true, stroke: C.muted, width: 1.4 }) + D.line(px, by, bx, by, { dash: true, stroke: C.muted, width: 1.4 });
  b += D.circle(bx, by, 11, { fill: C.fillAmber });
  b += D.text(px + 44, py + 52, "30°", { size: 14 }) + D.text(px - 30, by + 46, `r = ${f(r, 2)} m`, { anchor: "start", size: 14, fill: C.muted });
  const k = 40; // px per N
  b += D.arrow(bx, by, bx + (px - bx) * 0.0 - T * Math.sin(rad(th)) * k, by - T * Math.cos(rad(th)) * k, { stroke: C.blue, width: 3 });
  b += D.tag(bx - T * Math.sin(rad(th)) * k - 8, by - T * Math.cos(rad(th)) * k + 4, `T = ${f(T, 2)} N`, { size: 14, fill: C.blue, anchor: "end" }) + D.arrow(bx, by + 0, bx - T * Math.sin(rad(th)) * k, by, { stroke: C.amber, width: 2.4, dash: true }) + D.text(bx - 8, by + 22, "T sin 30° = centripetal", { size: 13, fill: C.amber, anchor: "end" });
  b += D.arrow(bx, by, bx, by + m * g * k, { stroke: C.red, width: 3 }) + D.text(bx + 8, by + m * g * k + 4, `mg = ${f(m * g, 2)} N`, { size: 14, fill: C.red, weight: 600 });
  b += D.text(10, 292, "Vertical: T cos 30° = mg, so T = 2.27 N", { size: 14 }) + D.text(10, 312, "Horizontal: T sin 30° = mrω², so ω = 3.76 rad/s", { size: 14 });
  const alt1 = "Conical pendulum, a 0.20 kg bob on a 0.80 m string at 30° to the vertical: radius 0.40 m; the vertical component of tension T cos 30° balances the weight 1.96 N (T = 2.27 N) and the horizontal component T sin 30° is the centripetal force, giving ω = 3.76 rad/s.";
  const cap1 = "Figure: forces on a conical pendulum bob";
  await D.figure(F, "conical-pendulum-forces", D.svg(480, 320, b), { alt: alt1, caption: cap1 });
  D.insertAfter(L("circular/centripetal-force"), "On a **banked** track", D.md("conical-pendulum-forces", alt1, cap1));
}
{
  const m = 0.2, r = 0.6, vt = 3.0, vb = 5.0;
  const Tt = (m * vt ** 2) / r - m * g, Tb = m * g + (m * vb ** 2) / r;
  let b = D.text(10, 22, "Vertical circle: r = 0.60 m, m = 0.20 kg", { weight: 700, size: 14 });
  const cx = 250, cy = 170, R = 100;
  b += D.circle(cx, cy, R, { stroke: C.muted, dash: true, width: 1.4 }) + D.dot(cx, cy, { r: 3, stroke: C.muted });
  const bob = (x, y) => D.circle(x, y, 10, { fill: C.fillAmber });
  b += D.line(cx, cy, cx, cy - R, { width: 1.6 }) + bob(cx, cy - R) + D.line(cx, cy, cx, cy + R, { width: 1.6 }) + bob(cx, cy + R);
  b += D.arrow(cx, cy - R + 12, cx, cy - R + 50, { stroke: C.blue, width: 3 }) + D.tag(cx + 12, cy - R + 40, `T = ${f(Tt, 2)} N`, { size: 14, fill: C.blue });
  b += D.arrow(cx + 24, cy - R - 12, cx + 24, cy - R + 18, { stroke: C.red, width: 3 }) + D.text(cx + 36, cy - R - 2, `mg = ${f(m * g, 2)} N`, { size: 14, fill: C.red, weight: 600 });
  b += D.text(cx - 90, cy - R + 4, `top: v = ${f(vt, 1)} m/s`, { size: 13, anchor: "end" });
  b += D.arrow(cx, cy + R - 12, cx, cy + R - 84, { stroke: C.blue, width: 3 }) + D.tag(cx + 12, cy + R - 40, `T = ${f(Tb, 1)} N`, { size: 14, fill: C.blue });
  b += D.arrow(cx + 24, cy + R + 12, cx + 24, cy + R + 42, { stroke: C.red, width: 3 }) + D.text(cx + 36, cy + R + 32, `mg = ${f(m * g, 2)} N`, { size: 14, fill: C.red, weight: 600 });
  b += D.text(cx - 90, cy + R + 4, `bottom: v = ${f(vb, 1)} m/s`, { size: 13, anchor: "end" });
  b += D.text(10, 330, "top: T + mg = mv²/r        bottom: T − mg = mv²/r", { size: 14, weight: 600 });
  b += D.text(10, 352, "Resultant towards the centre in both; the string is tighter at the bottom.", { size: 14, fill: C.muted });
  const alt = `Forces on a 0.20 kg mass in a vertical circle of radius 0.60 m: at the top (3.0 m/s) tension 1.04 N and weight 1.96 N both point to the centre; at the bottom (5.0 m/s) tension ${f(Tb, 1)} N upwards exceeds the weight, so the string is most likely to break at the bottom.`;
  const cap = "Figure: tension at the top and bottom of a vertical circle";
  await D.figure(F, "vertical-circle-tension", D.svg(560, 370, b), { alt, caption: cap });
  D.insertAfter(L("circular/centripetal-force"), "## Vertical circles and humps", D.md("vertical-circle-tension", alt, cap));
}
