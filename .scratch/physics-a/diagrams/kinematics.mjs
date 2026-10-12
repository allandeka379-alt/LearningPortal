// Diagrams for physics-a kinematics lessons. Run: node .scratch/physics-a/diagrams/kinematics.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;

// ---- Kombi journey v-t (lesson numbers: 0->20 in 8 s, 20 for 30 s, 20->0 in 12 s)
{
  const v = 20, t1 = 8, t2 = 30, t3 = 12, T = t1 + t2 + t3;
  const A1 = 0.5 * t1 * v, A2 = t2 * v, A3 = 0.5 * t3 * v;
  const ax = D.axes({ x: [0, 55], y: [0, 24], xTicks: 10, yTicks: 5, xLabel: "t / s", yLabel: "v / m s⁻¹", w: 600, h: 400 });
  const pts = [[0, 0], [t1, v], [t1 + t2, v], [T, 0]];
  const body = ax.frame +
    ax.area((x) => (x < t1 ? (v / t1) * x : x < t1 + t2 ? v : v * (T - x) / t3), null, [0, T], { fill: C.fillBlue }) +
    ax.line(pts) +
    ax.line([[t1, v], [t1, 0]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.line([[t1 + t2, v], [t1 + t2, 0]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.label(t1 / 2 + 1.5, 5, `${A1} m`, { anchor: "middle", size: 14 }) +
    ax.label(t1 + t2 / 2, 10, `${A2} m`, { anchor: "middle", size: 15 }) +
    ax.label(t1 + t2 + t3 / 2 + 0.5, 5, `${A3} m`, { anchor: "middle", size: 14 }) +
    ax.tag(9.5, 15, `a = ${(v / t1).toFixed(1)} m s⁻²`, { fill: C.blue }) +
    ax.tag(36.5, 15, `a = −${(v / t3).toFixed(1)} m s⁻²`, { anchor: "end", fill: C.red });
  const alt = `Velocity-time graph of the kombi: it accelerates uniformly from rest to 20 m/s in 8 s (gradient 2.5 m/s²), moves at 20 m/s for 30 s, then slows to rest in 12 s; the areas under the three sections are ${A1} m, ${A2} m and ${A3} m, a total displacement of ${A1 + A2 + A3} m.`;
  const cap = `Figure: the area under the v-t graph is the displacement, ${A1 + A2 + A3} m`;
  await D.figure(F, "kombi-velocity-time-graph", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinematics/motion-graphs"), "A kombi accelerates uniformly from rest", D.md("kombi-velocity-time-graph", alt, cap));
}

// ---- Thrown ball v-t, v = 12 - 9.81 t
{
  const u = 12, g = 9.81, top = u / g, T = 2 * top, H = 0.5 * u * top;
  const ax = D.axes({ x: [0, 2.6], y: [-14, 14], xTicks: 0.5, yTicks: 4, xLabel: "t / s", yLabel: "v / m s⁻¹", w: 600, h: 400 });
  const body = ax.frame +
    ax.area((x) => u - g * x, null, [0, top], { fill: C.fillBlue }) +
    ax.area((x) => u - g * x, null, [top, T], { fill: C.fillAmber }) +
    ax.line([[0, u], [T, -u]]) +
    ax.point(top, 0) +
    ax.tag(top, 0, `top: t = ${top.toFixed(2)} s, v = 0`, { dx: 12, dy: -34 }) +
    ax.label(0.42, 4, `+${H.toFixed(1)} m`, { anchor: "middle", size: 15 }) +
    ax.label(1.8, -4, `−${H.toFixed(1)} m`, { anchor: "middle", size: 15 }) +
    ax.tag(1.7, 9, `gradient = −9.81 m s⁻²`, { anchor: "start", fill: C.blue });
  const alt = `Velocity-time graph for a ball thrown up at 12 m/s: one straight line of gradient −9.81 m/s² crossing zero at the top of the flight (t = 1.22 s); the triangle above the axis is +7.3 m (maximum height) and the equal triangle below is −7.3 m, so the net displacement is zero.`;
  const cap = "Figure: one straight line for the whole flight; areas above and below the axis cancel";
  await D.figure(F, "thrown-ball-velocity-time-graph", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinematics/motion-graphs"), "A ball thrown straight up at $12", D.md("thrown-ball-velocity-time-graph", alt, cap));
}

// ---- Car s-t curve with tangent, s = 0.75 t^2
{
  const s = (t) => 0.75 * t * t;
  const ax = D.axes({ x: [0, 6.5], y: [0, 30], xTicks: 1, yTicks: 5, xLabel: "t / s", yLabel: "s / m", w: 600, h: 400 });
  const body = ax.frame + ax.plot(s, { domain: [0, 6.5] }) +
    ax.line([[2, 0], [6, 24]], { stroke: C.amber, width: 2.2 }) +
    ax.point(4, s(4)) + ax.guides(4, s(4)) +
    ax.point(2, 0, { stroke: C.amber }) + ax.point(6, 24, { stroke: C.amber }) +
    ax.tag(4, 12, "tangent at t = 4.0 s", { dx: 14, dy: 34, fill: C.amber }) +
    ax.tag(4, 12, "gradient = 24.0 / 4.0 = 6.0 m s⁻¹", { dx: 14, dy: 58, fill: C.amber });
  const alt = "Displacement-time graph of the accelerating car (s = 0.75t²): the curve steepens, and the tangent at t = 4.0 s passes through (2.0 s, 0 m) and (6.0 s, 24.0 m), so its gradient, the velocity at that instant, is 6.0 m/s.";
  const cap = "Figure: the velocity at an instant is the gradient of the tangent";
  await D.figure(F, "car-displacement-time-tangent", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinematics/motion-graphs"), "The tangent drawn at $t = 4.0", D.md("car-displacement-time-tangent", alt, cap));
}

// ---- Projectile: kick 18 m/s at 35 deg
{
  const u = 18, th = 35 * Math.PI / 180, g = 9.81;
  const ux = u * Math.cos(th), uy = u * Math.sin(th), T = 2 * uy / g, R = ux * T, H = uy * uy / (2 * g);
  const ax = D.axes({ x: [0, 34], y: [0, 8], xTicks: 5, yTicks: 2, xLabel: "x / m", yLabel: "y / m", w: 620, h: 360, pad: { l: 56, r: 24, t: 24, b: 56 } });
  const y = (x) => x * Math.tan(th) - g * x * x / (2 * ux * ux);
  const t15 = 1.5, x15 = ux * t15, y15 = uy * t15 - 0.5 * g * t15 * t15, vy15 = uy - g * t15;
  const sc = 0.45; // metres of arrow per m/s
  const body = ax.frame + ax.plot(y, { domain: [0, R] }) +
    ax.arrow(0, 0, ux * sc, uy * sc, { stroke: C.red, width: 2 }) + ax.label(0.5, uy * sc + 1.3, `u = 18 m s⁻¹`, { fill: C.red, size: 14 }) +
    ax.arrow(R / 2, H, R / 2 + ux * sc, H, { stroke: C.blue }) + ax.label(R / 2, H + 0.7, `top: horizontal ${ux.toFixed(1)} m s⁻¹, vertical 0`, { anchor: "middle", size: 14 }) +
    ax.point(x15, y15) + ax.arrow(x15, y15, x15 + ux * sc * 0.6, y15 + vy15 * sc * 0.6, { stroke: C.amber }) +
    ax.label(17.5, 2.2, `At t = 1.5 s:
vertical = ${vy15.toFixed(2).replace("-","−")} m s⁻¹`, { size: 13, fill: C.amber }) +
    ax.tag(R, 0, `R = ${R.toFixed(1)} m`, { anchor: "end", dy: -40 }) +
    ax.line([[R / 2, 0], [R / 2, H]], { stroke: C.muted, width: 1.4, dash: true }) + ax.label(R / 2 + 0.3, H / 2, `H = ${H.toFixed(2)} m`, { size: 14 });
  const alt = `Path of the goalkeeper's kick (18 m/s at 35° above the horizontal): a parabola of range ${R.toFixed(1)} m and maximum height ${H.toFixed(2)} m, with a constant horizontal velocity component ${ux.toFixed(1)} m/s and a vertical component that is zero at the top and negative on the way down.`;
  const cap = "Figure: a parabolic path; horizontal velocity stays constant while vertical velocity changes";
  await D.figure(F, "kick-projectile-path", D.svg(620, 360, body), { alt, caption: cap });
  D.insertAfter(L("kinematics/projectiles"), "Maximum height: $H = ", D.md("kick-projectile-path", alt, cap));
}
console.log("kinematics ok");
