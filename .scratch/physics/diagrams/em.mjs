// Run: node .scratch/physics/diagrams/em.mjs  (magnetism and electromagnetism)
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LL = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LL}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const rad = (d) => (d * Math.PI) / 180;
const magnet = (x, y, w, h) => D.rect(x, y, w / 2, h, { fill: "#dfeaf0", stroke: C.ink }) + D.rect(x + w / 2, y, w / 2, h, { fill: "#f7d9d5", stroke: C.ink }) +
  M(x + w / 4, y + h / 2 + 7, "S", { size: 22, weight: 700, fill: C.blue }) + M(x + (3 * w) / 4, y + h / 2 + 7, "N", { size: 22, weight: 700, fill: C.red });

// ---- bar magnet field lines
{
  const cx = 300, yc = 155, L = 180;
  let b = "";
  const lines = [[105, 45], [140, 90], [190, 125], [250, 140]];
  for (const [a, h] of lines) {
    for (const sgn of [-1, 1]) {
      b += D.path_(`M${cx + a},${yc} A${a},${h} 0 0 ${sgn === -1 ? 0 : 1} ${cx - a},${yc}`, { stroke: C.blue, width: 2 });
      b += D.arrow(cx + 7, yc + sgn * h, cx - 7, yc + sgn * h, { stroke: C.blue, width: 2 });
    }
  }
  // straight central lines at the poles
  b += D.arrow(cx + L / 2 + 70, yc, cx + L / 2 + 6, yc, { stroke: C.blue, width: 2 }).replace("", "");
  b = b.replace(/<line [^>]*\/>$/, "");
  b += D.line(cx + L / 2 + 8, yc, cx + L / 2 + 70, yc, { stroke: C.blue, width: 2 }) + D.line(cx - L / 2 - 8, yc, cx - L / 2 - 70, yc, { stroke: C.blue, width: 2 });
  b += magnet(cx - L / 2, yc - 20, L, 40) + T(24, 322, "Field lines run from the N pole to the S pole, closest together (strongest field) at the poles.", { size: 13 });
  const alt = "Magnetic field of a bar magnet: field lines loop out of the north pole and curve round into the south pole, never crossing, and are closest together near the poles where the field is strongest.";
  await put("magnet-field-lines", 600, 340, b, alt, "Figure: the magnetic field of a bar magnet", "magnetism/magnets", "Lines never cross.");
}

// ---- straight wire: current towards the viewer, field anticlockwise
{
  const cx = 170, cy = 150;
  let b = "";
  [26, 52, 88, 136].forEach((r) => {
    b += D.circle(cx, cy, r, { stroke: C.blue, width: 2 });
    b += D.arrow(cx + 6, cy - r, cx - 6, cy - r, { stroke: C.blue, width: 2 });
  });
  b += D.circle(cx, cy, 11, { fill: "#fff", width: 2.4 }) + D.dot(cx, cy, { r: 3.5 });
  const lines = ["Current flows towards you", "(out of the page).", "", "Right-hand grip rule: the", "field lines run anticlockwise.", "", "The circles get further apart", "away from the wire: the field", "is strongest close to it."];
  lines.forEach((l, i) => { b += T(335, 60 + i * 22, l, { size: 14 }); });
  const alt = "Magnetic field around a straight wire carrying a current towards the viewer: concentric circular field lines centred on the wire, directed anticlockwise by the right-hand grip rule, with the circles drawn further apart at greater distance because the field gets weaker.";
  await put("magnetic-field-straight-wire", 600, 310, b, alt, "Figure: field lines around a straight current-carrying wire", "electromagnetism/magnetic-effect", "## The field around a straight wire");
}

// ---- solenoid
{
  const x0 = 200, x1 = 400, yc = 150, h = 34;
  let b = "";
  // outside loops
  for (const [a, hh] of [[145, 70], [190, 105], [240, 125]]) {
    for (const sgn of [-1, 1]) {
      b += D.path_(`M${x1 + 5},${yc + sgn * 0} L${x1 + 5},${yc}`, { stroke: "none" });
      b += D.path_(`M${300 + a},${yc} A${a},${hh} 0 0 ${sgn === -1 ? 0 : 1} ${300 - a},${yc}`, { stroke: C.blue, width: 2 });
      b += D.arrow(307, yc + sgn * hh, 293, yc + sgn * hh, { stroke: C.blue, width: 2 });
    }
  }
  // inside straight lines (S to N, left to right inside coil)
  for (const dy of [-18, 0, 18]) b += D.arrow(x0 + 20, yc + dy, x1 - 22, yc + dy, { stroke: C.blue, width: 2 });
  // winding
  b += D.rect(x0, yc - h, x1 - x0, 2 * h, { fill: "none", stroke: C.axis, width: 1.6 });
  for (let x = x0 + 10; x < x1; x += 14) b += D.line(x, yc - h - 5, x + 8, yc + h + 5, { stroke: C.amber, width: 3 });
  b += M(x1 + 26, yc + 6, "N", { size: 22, weight: 700, fill: C.red }) + M(x0 - 26, yc + 6, "S", { size: 22, weight: 700, fill: C.blue }) +
    T(24, 318, "Outside: like a bar magnet. Inside: straight, parallel, close together (strong, almost uniform).", { size: 13 });
  const alt = "Magnetic field of a solenoid: outside the coil the field lines loop from one end to the other like a bar magnet, with a north pole at one end and a south pole at the other; inside the coil the lines are straight, parallel and close together, so the field is strong and almost uniform.";
  await put("magnetic-field-solenoid", 600, 330, b, alt, "Figure: the field of a solenoid is like that of a bar magnet", "electromagnetism/magnetic-effect", "## The field of a solenoid");
}

// ---- motor effect: wire between N (left) and S (right), current into the page => force down
{
  const cx = 300, cy = 150;
  let b = D.rect(30, 70, 90, 160, { fill: "#f7d9d5" }) + M(75, 160, "N", { size: 28, weight: 700, fill: C.red }) + D.rect(480, 70, 90, 160, { fill: "#dfeaf0" }) + M(525, 160, "S", { size: 28, weight: 700, fill: C.blue });
  for (const dy of [-45, -15, 15, 45]) b += D.arrow(130, cy + dy, 470, cy + dy, { stroke: C.blue, width: 1.8 });
  b += D.circle(cx, cy, 14, { fill: "#fff", width: 2.4 }) + D.line(cx - 8, cy - 8, cx + 8, cy + 8, { width: 2.4 }) + D.line(cx - 8, cy + 8, cx + 8, cy - 8, { width: 2.4 }) +
    D.arrow(cx, cy + 22, cx, cy + 90, { stroke: C.red, width: 4 }) + T(cx + 30, cy + 70, "force (thrust)", { fill: C.red, weight: 700 }) +
    T(30, 262, "Wire: current into the page (cross).   First finger: field, N to S (right).", { size: 13 }) + T(30, 282, "Second finger: current (into the page).   Thumb: force, downwards.", { size: 13 });
  b += T(240, 54, "magnetic field", { fill: C.blue, weight: 700, anchor: "start" });
  const alt = "Motor effect: a wire carrying current into the page lies between a north pole on the left and a south pole on the right, so the field points right. By Fleming's left-hand rule (first finger field, second finger current) the thumb points down: the wire is pushed downwards.";
  await put("motor-effect-left-hand-rule", 600, 300, b, alt, "Figure: Fleming's left-hand rule gives the force on the wire", "electromagnetism/motor-effect", "## Fleming's left-hand rule");
}

// ---- d.c. motor: coil end-on, plane along the field
{
  const cx = 300, cy = 150, half = 90;
  let b = D.rect(30, 60, 90, 180, { fill: "#f7d9d5" }) + M(75, 160, "N", { size: 28, weight: 700, fill: C.red }) + D.rect(480, 60, 90, 180, { fill: "#dfeaf0" }) + M(525, 160, "S", { size: 28, weight: 700, fill: C.blue });
  for (const dy of [-60, -30, 30, 60]) b += D.arrow(130, cy + dy, 470, cy + dy, { stroke: C.blue, width: 1.6 });
  b += D.line(cx - half, cy, cx + half, cy, { stroke: C.axis, width: 3 }) + D.dot(cx, cy, { r: 5 }) + T(cx + 8, cy + 20, "axle", { size: 13, fill: C.muted });
  // left side cross (current in): force down; right side dot (current out): force up
  b += D.circle(cx - half, cy, 13, { fill: "#fff", width: 2.4 }) + D.line(cx - half - 7, cy - 7, cx - half + 7, cy + 7, { width: 2.4 }) + D.line(cx - half - 7, cy + 7, cx - half + 7, cy - 7, { width: 2.4 }) +
    D.circle(cx + half, cy, 13, { fill: "#fff", width: 2.4 }) + D.dot(cx + half, cy, { r: 4 }) +
    D.arrow(cx - half, cy + 22, cx - half, cy + 80, { stroke: C.red, width: 4 }) + D.arrow(cx + half, cy - 22, cx + half, cy - 80, { stroke: C.red, width: 4 }) +
    T(cx - half - 12, cy + 100, "force down", { fill: C.red, weight: 700, anchor: "middle" }) + T(cx + half + 12, cy - 92, "force up", { fill: C.red, weight: 700, anchor: "middle" }) +
    D.path_(`M${cx + 40},${cy - 95} A100,100 0 0 0 ${cx - 40},${cy - 95}`, { stroke: C.amber, width: 3, arrow: true }).replace("", "") + T(cx, cy - 112, "the coil turns anticlockwise", { anchor: "middle", fill: C.amber, weight: 700 }).replace("", "") +
    T(30, 268, "Current goes in on one side of the coil and out on the other,", { size: 13 }) + T(30, 288, "so the two forces make a turning effect.", { size: 13 });
  const alt = "End view of a d.c. motor coil with its plane along the magnetic field between a north pole on the left and a south pole on the right. Current goes into the page on the left side and out on the right side, so Fleming's left-hand rule gives a downward force on the left and an upward force on the right, turning the coil anticlockwise.";
  await put("dc-motor-coil-forces", 600, 305, b, alt, "Figure: the forces on opposite sides of the coil give a turning effect", "electromagnetism/dc-motor", "## The turning effect on a coil");
}

// ---- generator e.m.f.-time graph, 25 turns per second => T = 0.04 s
{
  const T0 = 0.04, E0 = 1;
  const ax = D.axes({ x: [0, 0.08], y: [-1.6, 2.1], xTicks: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08], yTicks: [], xLabel: "Time (s)", yLabel: "e.m.f.", w: 600, h: 380, grid: false, origin: false, xFormat: (v) => v.toFixed(2) });
  const f = (t) => E0 * Math.sin((2 * Math.PI * t) / T0);
  const b = ax.frame + D.line(ax.X(0), ax.Y(0), ax.X(0.08), ax.Y(0), { stroke: C.muted, width: 1.4, dash: true }) + T(ax.X(0) + 8, ax.Y(0) + 18, "zero e.m.f.", { fill: C.muted, size: 13 }) +
    ax.plot(f, { domain: [0, 0.08], steps: 300 }) + ax.point(0.01, 1) + ax.point(0.03, -1) + ax.point(0, 0) + ax.point(0.02, 0) + ax.point(0.04, 0) +
    ax.tag(0.01, 1, "peak: coil horizontal", { dy: -12, anchor: "middle", size: 13 }) + T(300, 372, "The e.m.f. is zero (dots on the dashed line) when the coil is vertical.", { anchor: "middle", size: 13 }) + ax.tag(0.03, -1, "trough: coil horizontal", { dy: 30, anchor: "middle", size: 13 }) +
    D.line(ax.X(0), ax.Y(1.85), ax.X(0.04), ax.Y(1.85), { stroke: C.amber, width: 2, arrow: true, arrowStart: true }) + T(ax.X(0.02), ax.Y(1.85) - 8, "one turn = one cycle, T = 0.04 s", { anchor: "middle", fill: C.amber, weight: 700 });
  const alt = "Output of an a.c. generator against time for a coil turning 25 times a second: the e.m.f. is zero when the coil is vertical, peaks after a quarter turn (0.01 s) when the coil is horizontal, is zero again at half a turn, reaches a trough at three-quarters of a turn, and repeats every 0.04 s, a frequency of 25 Hz.";
  await put("generator-emf-time-graph", 600, 385, b, alt, "Figure: one turn of the coil gives one cycle of alternating e.m.f.", "electromagnetism/generators", "## The e.m.f.–time graph");
}

// ---- transformer: 2000 turns, 240 V -> 100 turns, 12 V
{
  let b = D.rect(190, 50, 220, 190, { fill: "none", stroke: "#8a8f98", width: 34 }) + D.rect(190, 50, 220, 190, { fill: "none", stroke: "#cfd3d8", width: 28 }) + M(300, 150, "soft-iron core", { fill: C.muted });
  const coil = (x, n) => { let s2 = ""; for (let i = 0; i < n; i += 1) s2 += D.line(x - 26, 85 + i * 14, x + 26, 99 + i * 14, { stroke: C.amber, width: 3 }); return s2; };
  b += coil(190, 8) + coil(410, 4);
  b += T(140, 130, "primary coil", { anchor: "end", weight: 700 }) + T(140, 152, "2000 turns", { anchor: "end" }) + T(140, 174, "240 V a.c. in", { anchor: "end", weight: 700, fill: C.blue }) +
    T(460, 130, "secondary coil", { weight: 700 }) + T(460, 152, "100 turns") + T(460, 174, "12 V a.c. out", { weight: 700, fill: C.blue }) + M(300, 275, "240 : 12 = 2000 : 100", { weight: 700 });
  const alt = "Step-down transformer: a primary coil of 2000 turns connected to a 240 V a.c. supply and a secondary coil of 100 turns giving 12 V, both wound on a soft-iron core. The voltage ratio equals the turns ratio, 240 to 12 equals 2000 to 100.";
  await put("transformer-step-down", 600, 295, b, alt, "Figure: a step-down transformer with 2000 and 100 turns", "electromagnetism/transformers", "## The transformer equations");
}
console.log("em done");
