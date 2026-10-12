// Run from repo root: node .scratch/chemistry-o/diagrams/misc2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, WATER } from "./_h.mjs";

const arr = (x1, y1, x2, y2, o = {}) => D.arrow(x1, y1, x2, y2, { width: 2, ...o });

// ---------- reading a thermometer and a measuring cylinder (lesson Examples 1 and 2)
{
  // thermometer: marks 20..30, 1 degC per small division, liquid top at 23.5
  const ty0 = 40, tpx = 24; // 24 px per degC; 30 at ty0, 20 at ty0+240
  const yT = (v) => ty0 + (30 - v) * tpx;
  let b = T(110, 22, "Thermometer", { anchor: "middle", size: 15, weight: 700 }) +
    D.rect(90, ty0 - 10, 40, 270, { fill: "#ffffff", stroke: C.axis, width: 2, r: 12 }) + D.rect(104, yT(23.5), 12, ty0 + 260 - yT(23.5), { fill: C.red, stroke: "none" }) + D.circle(110, ty0 + 262, 16, { fill: C.red, stroke: C.axis, width: 2 }).replace("", "");
  for (let v = 20; v <= 30; v += 1) {
    const major = v % 10 === 0;
    b += D.line(130, yT(v), 130 + (major ? 16 : 9), yT(v), { stroke: C.axis, width: major ? 2 : 1.3 });
    if (major) b += T(152, yT(v) + 5, `${v}`, { size: 13, weight: 700 });
  }
  b += D.line(70, yT(23.5), 130, yT(23.5), { stroke: C.red, width: 1.6, dash: true }) + T(60, yT(23.5) + 5, "23.5 °C", { anchor: "end", size: 14, weight: 700, fill: C.red }) +
    T(190, yT(26), "1 small division\n= (30 − 20) ÷ 10\n= 1 °C", { size: 12, fill: C.muted });
  // measuring cylinder zoom: marks 60..80, 2 cm3 per small division, meniscus bottom at 74
  const ox = 400, cy0 = 40, cpx = 12; // 12 px per cm3
  const yC = (v) => cy0 + (80 - v) * cpx;
  b += T(ox + 40, 22, "Measuring cylinder (part)", { anchor: "middle", size: 15, weight: 700 }) +
    D.rect(ox, yC(74) - 2, 80, yC(60) + 24 - yC(74), { fill: WATER, stroke: "none" }) +
    D.line(ox, cy0 - 10, ox, yC(60) + 24, { stroke: C.axis, width: 2.5 }) + D.line(ox + 80, cy0 - 10, ox + 80, yC(60) + 24, { stroke: C.axis, width: 2.5 }) +
    D.path_(`M${ox},${yC(74) - 8} Q${ox + 40},${yC(74) + 6} ${ox + 80},${yC(74) - 8}`, { stroke: C.blue, width: 2.2 });
  for (let v = 60; v <= 80; v += 2) {
    const major = v % 10 === 0;
    b += D.line(ox + 80, yC(v), ox + 80 - (major ? 22 : 12), yC(v), { stroke: C.axis, width: major ? 2 : 1.3 });
    if (major) b += T(ox + 90, yC(v) + 5, `${v}`, { size: 13, weight: 700 });
  }
  b += D.line(ox - 40, yC(74) - 1, ox + 80, yC(74) - 1, { stroke: C.red, width: 1.6, dash: true }) + T(ox - 46, yC(74) + 4, "74 cm³", { anchor: "end", size: 14, weight: 700, fill: C.red }) +
    T(ox + 120, yC(65), "1 small division\n= 10 ÷ 5 = 2 cm³", { size: 12, fill: C.muted }) +
    T(ox + 40, yC(60) + 46, "read the bottom of the meniscus\nwith your eye level with it", { anchor: "middle", size: 12 });
  await put("reading-thermometer-measuring-cylinder", 640, 360, b,
    "Two scale readings worked out in the lesson: a thermometer with one small division equal to 1 degree Celsius whose liquid stops halfway between the third and fourth marks above 20 degrees, reading 23.5 degrees Celsius; and a measuring cylinder with five small divisions between each 10 cm3 mark, so one division is 2 cm3, with the bottom of the meniscus on the second small mark above 70, reading 74 cm3.",
    "Figure: find the value of one division first, then count up from the last numbered mark", "practical/apparatus-and-measurement", "## Reading a scale");
}

// ---------- preparing a soluble salt: acid + excess insoluble solid
{
  const W = 190, H = 84;
  const nd = (x, y, s, o = {}) => D.node(x, y, W, H, s, { size: 13, ...o });
  const b =
    nd(10, 20, "1. Warm dilute acid\nin a beaker") + arr(200, 62, 230, 62) +
    nd(230, 20, "2. Add the solid a little at a\ntime until some is left over\n(excess): all the\nacid has reacted") + arr(420, 62, 450, 62) +
    nd(450, 20, "3. Filter: the residue is the\nexcess solid, the filtrate is\nthe salt solution", { fill: C.fillAmber }) +
    D.path_("M545,104 L545,138 L105,138 L105,170", { width: 2, arrow: true }) +
    nd(10, 172, "4. Heat the filtrate in an\nevaporating basin until a drop\nforms crystals on a cold rod") + arr(200, 214, 230, 214) +
    nd(230, 172, "5. Leave to cool: crystals\nform as the solubility falls") + arr(420, 214, 450, 214) +
    nd(450, 172, "6. Filter off the crystals,\nwash with a little cold\ndistilled water, and dry", { fill: C.fillGreen, weight: 700 }) +
    T(330, 288, "Do not evaporate to dryness: hydrated crystals would lose their water of crystallisation", { anchor: "middle", size: 13, fill: C.muted });
  await put("soluble-salt-preparation-flow", 660, 305, b,
    "Flow chart for making a soluble salt from an acid and an excess of an insoluble solid: warm the dilute acid, add the solid until some is left over, filter off the excess, heat the filtrate until crystals form on a cold glass rod, cool so crystals form, then filter, wash with a little cold distilled water and dry the crystals.",
    "Figure: Method A, acid plus excess insoluble solid", "acids/soluble-salts", "## Method A: acid + excess insoluble solid");
}

// ---------- plotting data: Example 1 of data-and-evaluation
{
  const data = [[0, 0], [20, 28], [40, 48], [60, 62], [80, 70], [100, 72], [120, 72]];
  const ax = D.axes({ x: [0, 130], y: [0, 80], w: 560, h: 380, xTicks: D.range(0, 120, 20), yTicks: D.range(0, 80, 10), xLabel: "Time / s", yLabel: "Volume of gas / cm³" });
  // smooth curve of best fit through the points (monotone cubic-like using Catmull-Rom to Bezier)
  const P = data.map(([a, b]) => [ax.X(a), ax.Y(b)]);
  let d = `M${P[0][0]},${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i += 1) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  const cross = ([a, b]) => D.line(ax.X(a) - 6, ax.Y(b) - 6, ax.X(a) + 6, ax.Y(b) + 6, { stroke: C.ink, width: 2 }) + D.line(ax.X(a) - 6, ax.Y(b) + 6, ax.X(a) + 6, ax.Y(b) - 6, { stroke: C.ink, width: 2 });
  const body = ax.frame + D.path_(d, { stroke: C.blue, width: 2.6 }) + data.map(cross).join("") +
    ax.tag(30, 12, "28 cm³ in the first 20 s: 28 ÷ 20 = 1.4 cm³/s", { size: 13 }) +
    D.arrow(ax.X(45), ax.Y(12) - 10, ax.X(22), ax.Y(26), { stroke: C.muted, width: 1.3 }) +
    ax.tag(84, 60, "levels off at 72 cm³", { size: 13 }) + D.line(ax.X(0), ax.Y(72), ax.X(130), ax.Y(72), { stroke: C.muted, width: 1.2, dash: true });
  await put("plotting-volume-time-curve", 560, 380, body,
    "Volume of gas against time from the lesson's magnesium and acid experiment: crosses at 0, 28, 48, 62, 70, 72 and 72 cm³ every 20 s with a smooth curve of best fit through them, steepest at the start (28 cm³ in the first 20 s, 1.4 cm³/s) and level at 72 cm³ from 100 s when the magnesium is used up.",
    "Figure: points plotted as crosses with one smooth curve of best fit", "practical/data-and-evaluation", "## Plotting graphs");
}
