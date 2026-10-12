// Physics-o motion diagrams. Run: node .scratch/physics/diagrams/motion.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o";
const L = `content/subjects/${F}/lessons`;
const { C } = D;

// ---- acceleration lesson: car from rest to 18 m/s in 7.5 s => a = 2.4 m/s^2
{
  const u = 0, v = 18, t = 7.5, a = (v - u) / t;
  const ax = D.axes({ x: [0, 10], y: [0, 24], xTicks: 2, yTicks: 6, xLabel: "Time (s)", yLabel: "Speed (m/s)", w: 560, h: 380 });
  const body = ax.frame + ax.line([[0, 0], [t, v], [10, v]], { stroke: C.blue }) +
    ax.guides(t, v) + ax.point(t, v) +
    ax.line([[2, a * 2], [5, a * 2]], { stroke: C.amber, width: 2, dash: true }) +
    ax.line([[5, a * 2], [5, a * 5]], { stroke: C.amber, width: 2, dash: true }) +
    ax.tag(5, a * 3.5, `Δv = ${(a * 3).toFixed(1)} m/s`, { dx: 8, fill: C.amber }) +
    ax.tag(3.5, a * 2, "Δt = 3 s", { dy: 26, anchor: "middle", fill: C.amber }) +
    ax.tag(1.0, 20.5, `gradient = ${a.toFixed(1)} m/s²`, { fill: C.blue });
  const alt = `Speed-time graph of a car pulling away: speed rises in a straight line from 0 to ${v} m/s in ${t} s, so the gradient, which is the acceleration, is ${a.toFixed(1)} m/s squared (every 3 s the speed rises by ${(a * 3).toFixed(1)} m/s); after ${t} s the speed stays at ${v} m/s.`;
  const cap = "Figure: the gradient of a speed-time graph is the acceleration";
  await D.figure(F, "acceleration-speed-time-gradient", D.svg(560, 380, body), { alt, caption: cap });
  D.insertAfter(`${L}/motion/acceleration.md`, "Acceleration is found in the laboratory", D.md("acceleration-speed-time-gradient", alt, cap));
}

// ---- motion-graphs: distance-time straight line, 300 m in 40 s => 7.5 m/s
{
  const T = 40, S = 300, v = S / T;
  const ax = D.axes({ x: [0, 50], y: [0, 350], xTicks: 10, yTicks: 50, xLabel: "Time (s)", yLabel: "Distance (m)", w: 560, h: 400 });
  const body = ax.frame + ax.line([[0, 0], [T, S]]) + ax.guides(T, S) + ax.point(T, S) +
    ax.line([[10, v * 10], [30, v * 10]], { stroke: C.amber, width: 2, dash: true }) +
    ax.line([[30, v * 10], [30, v * 30]], { stroke: C.amber, width: 2, dash: true }) +
    ax.tag(20, v * 10, "Δt = 20 s", { dy: 26, anchor: "middle", fill: C.amber }) +
    ax.tag(30, v * 20, "Δd = 150 m", { dx: 8, fill: C.amber }) +
    ax.tag(4, 320, `gradient = 150 ÷ 20 = ${v} m/s`, { fill: C.blue });
  const alt = `Distance-time graph: a straight line from the origin to ${S} m at ${T} s. A gradient triangle with 150 m up and 20 s across gives the speed, ${v} m/s, which is constant because the line is straight.`;
  const cap = "Figure: the gradient of a distance-time graph is the speed";
  await D.figure(F, "motion-distance-time-gradient", D.svg(560, 400, body), { alt, caption: cap });
  D.insertAfter(`${L}/motion/motion-graphs.md`, "A straight line on a distance-time graph rises from the origin", D.md("motion-distance-time-gradient", alt, cap));
}

// ---- motion-graphs: three-stage trolley
{
  const pts = [[0, 0], [6, 12], [16, 12], [20, 0]];
  const ax = D.axes({ x: [0, 22], y: [0, 15], xTicks: 2, yTicks: 3, xLabel: "Time (s)", yLabel: "Speed (m/s)", w: 600, h: 380 });
  const body = ax.frame + ax.area((x) => (x <= 6 ? 2 * x : x <= 16 ? 12 : Math.max(0, 12 - 3 * (x - 16))), null, [0, 20], { fill: C.fillBlue }) +
    ax.line(pts) + ax.line([[6, 0], [6, 12]], { stroke: C.muted, width: 1.4, dash: true }) + ax.line([[16, 0], [16, 12]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.label(4.6, 2.2, "36 m", { anchor: "middle", weight: 700 }) + ax.label(11, 6, "120 m", { anchor: "middle", weight: 700 }) + ax.label(17.0, 2.2, "24 m", { anchor: "middle", weight: 700 }) +
    ax.tag(3, 12.8, "a = +2.0 m/s²", { anchor: "middle", dx: -10, fill: C.blue }) + ax.tag(11, 13.9, "a = 0", { anchor: "middle", fill: C.blue }) + ax.tag(19.2, 13.6, "a = −3.0 m/s²", { anchor: "middle", fill: C.blue });
  const alt = "Speed-time graph of a trolley: speeds up from 0 to 12 m/s in 6 s (gradient 2.0 m/s squared), moves at a steady 12 m/s for 10 s, then slows to rest in 4 s (gradient minus 3.0 m/s squared). The areas under the three sections are 36 m, 120 m and 24 m, a total distance of 180 m.";
  const cap = "Figure: gradient gives acceleration; area under the line gives distance";
  await D.figure(F, "motion-speed-time-three-stage", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(`${L}/motion/motion-graphs.md`, "A horizontal line on a **speed-time** graph does not mean", D.md("motion-speed-time-three-stage", alt, cap));
}

// ---- motion-graphs: tangent to a curved distance-time graph, d = 0.1 t^2, tangent at t = 20 s
{
  const f = (t) => 0.1 * t * t, t0 = 20, d0 = f(t0), slope = 0.2 * t0;
  const ax = D.axes({ x: [0, 30], y: [0, 100], xTicks: 5, yTicks: 20, xLabel: "Time (s)", yLabel: "Distance (m)", w: 560, h: 400 });
  const tan = (t) => d0 + slope * (t - t0);
  const body = ax.frame + ax.plot(f, { domain: [0, 30] }) + ax.plot(tan, { domain: [8, 30], stroke: C.amber, width: 2, dash: true }) +
    ax.point(t0, d0) + ax.line([[12, tan(12)], [28, tan(12)]], { stroke: C.muted, width: 1.4 }) + ax.line([[28, tan(12)], [28, tan(28)]], { stroke: C.muted, width: 1.4 }) +
    ax.tag(20, tan(12), "Δt = 16 s", { dy: -8, anchor: "middle" }) + ax.tag(28, (tan(12) + tan(28)) / 2, "Δd = 64 m", { dx: -8, dy: 0, anchor: "end" }) +
    ax.tag(1, 92, "gradient of tangent = 64 ÷ 16 = 4.0 m/s", { fill: C.amber }) + ax.tag(t0, d0, "speed at 20 s", { dx: -10, dy: 6, anchor: "end" });
  const alt = "Curved distance-time graph that gets steeper with time. A straight tangent drawn at 20 s rises 64 m over 16 s, so the speed at that instant is 4.0 m/s; the curve means the speed is increasing.";
  const cap = "Figure: a tangent to the curve gives the speed at one instant";
  await D.figure(F, "motion-tangent-curve", D.svg(560, 400, body), { alt, caption: cap });
  D.insertAfter(`${L}/motion/motion-graphs.md`, "To find the speed at one instant on a curved", D.md("motion-tangent-curve", alt, cap));
}
console.log("motion done");
