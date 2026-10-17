// biology-a: nitrogen cycle + nitrate graph, antibody response, aerobic respiration overview, heart structure.
// Run: node .scratch/biology-a/diagrams/misc2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const head = (x1, y1, x2, y2, col, s = 10) => { const a = Math.atan2(y2 - y1, x2 - x1); return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
const arr = (x1, y1, x2, y2, col = C.ink, w = 2.4, dash = false) => D.line(x1, y1, x2, y2, { stroke: col, width: w, dash }) + head(x1, y1, x2, y2, col);
const lead = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2 });
const parr = (pts, col = C.ink, w = 2.4) => { const n = pts.length; return D.polyline(pts, { stroke: col, width: w }) + head(pts[n - 2][0], pts[n - 2][1], pts[n - 1][0], pts[n - 1][1], col); };

// ---- Nitrogen cycle
{
  const w = 640, h = 430;
  let b = "";
  const nd = (x, y, wd, s, fill) => D.node(x, y, wd, 46, s, { fill, size: 13 });
  b += nd(250, 118, 140, "Atmospheric N₂", C.fillGrey);
  b += nd(30, 24, 150, "Dead organisms,\nurea, faeces", C.fillAmber);
  b += nd(460, 24, 150, "Animals\n(proteins)", C.fillAmber);
  b += nd(460, 132, 150, "Plants\n(proteins)", C.fillGreen);
  b += nd(30, 212, 150, "Ammonium NH₄⁺", C.fillBlue);
  b += nd(30, 330, 150, "Nitrite NO₂⁻", C.fillBlue);
  b += nd(250, 330, 140, "Nitrate NO₃⁻", C.fillBlue);
  // arrows
  b += arr(460, 47, 182, 47, C.ink, 2.2) + T(320, 40, "death and excretion", { size: 12, fill: C.muted });
  b += arr(535, 130, 535, 72) + D.text(545, 106, "feeding", { size: 12, fill: C.muted });
  b += arr(105, 72, 105, 210, C.green, 2.4) + D.text(113, 146, "ammonification", { size: 12, fill: C.green, weight: 700 }) + D.text(113, 161, "(saprotrophic bacteria", { size: 11, fill: C.muted }) + D.text(113, 175, "and fungi)", { size: 11, fill: C.muted });
  b += arr(250, 150, 182, 222, C.blue, 2.6) + D.text(194, 238, "nitrogen fixation", { size: 12, fill: C.blue, weight: 700 }) + D.text(194, 252, "Rhizobium, free-living", { size: 11, fill: C.muted }) + D.text(194, 265, "bacteria, lightning,", { size: 11, fill: C.muted }) + D.text(194, 278, "Haber process", { size: 11, fill: C.muted });
  b += arr(105, 260, 105, 328, C.amber, 2.6) + D.text(113, 288, "nitrification 1", { size: 12, fill: C.amber, weight: 700 }) + D.text(113, 303, "Nitrosomonas", { size: 11, fill: C.muted });
  b += arr(182, 353, 248, 353, C.amber, 2.6) + D.text(215, 396, "nitrification 2: Nitrobacter", { size: 12, fill: C.amber, weight: 700, anchor: "middle" });
  b += arr(320, 328, 320, 166, C.red, 2.6) + D.text(332, 250, "denitrification", { size: 12, fill: C.red, weight: 700 }) + D.text(332, 265, "Pseudomonas:", { size: 11, fill: C.muted }) + D.text(332, 279, "waterlogged soil,", { size: 11, fill: C.muted }) + D.text(332, 293, "no oxygen", { size: 11, fill: C.muted });
  b += arr(392, 345, 520, 182, C.green, 2.6) + D.text(500, 300, "uptake of nitrate", { size: 12, fill: C.green, weight: 700, anchor: "middle" }) + D.text(500, 315, "(active transport)", { size: 11, fill: C.muted, anchor: "middle" });
  b += D.text(10, 420, "Nitrification needs oxygen; denitrification happens where there is none.", { size: 12, fill: C.muted });
  const alt = "Nitrogen cycle: nitrogen gas is fixed to ammonium by Rhizobium, free-living bacteria, lightning and the Haber process; Nitrosomonas turns ammonium into nitrite and Nitrobacter turns nitrite into nitrate; plants take up nitrate and make proteins, animals eat plants, and dead organisms, urea and faeces are ammonified back to ammonium; denitrifying bacteria in waterlogged soil turn nitrate back to nitrogen gas.";
  const cap = "Figure: the nitrogen cycle and the bacteria involved at each stage";
  await fig("nitrogen-cycle-flow", D.svg(w, h, b), alt, cap, "ecology/nitrogen-cycle", "## The stages of the cycle");
}

// ---- Soil nitrate after flooding
{
  const d = [0, 2, 4, 6, 8, 10], n = [24, 18, 11, 6, 4, 3];
  const drop = Math.round(((24 - 3) / 24) * 1000) / 10;
  if (drop !== 87.5) throw new Error("nitrate drop " + drop);
  const ax = D.axes({ x: [0, 10], y: [0, 28], w: 600, h: 400, xTicks: 2, yTicks: 4, xLabel: "Days after flooding", yLabel: "Nitrate / mg per kg soil", pad: { l: 70, r: 28, t: 40, b: 58 } });
  let b = ax.frame + ax.line(d.map((x, i) => [x, n[i]]), { stroke: C.blue });
  d.forEach((x, i) => { b += ax.point(x, n[i], { stroke: C.blue, r: 3.5 }); });
  b += D.text(ax.X(4.4), ax.Y(24), "24 to 6 mg per kg in six days,", { size: 13 }) + D.text(ax.X(4.4), ax.Y(24) + 17, "then slowly to 3: a fall of 87.5%", { size: 13 });
  const alt = "Soil nitrate after flooding: it falls steeply from 24 to 18, 11 and 6 mg per kg over the first six days and then more slowly to 4 and 3 mg per kg by day 10, a total decrease of 87.5%, because waterlogged soil favours denitrifying bacteria.";
  const cap = "Figure: soil nitrate after flooding, from the lesson's table";
  await fig("soil-nitrate-flooding", D.svg(600, 400, b), alt, cap, "ecology/nitrogen-cycle", "| Nitrate / mg per kg soil");
}

// ---- Primary and secondary antibody response
{
  const day = [0, 7, 14, 21, 28, 35, 42, 49, 56], ab = [0, 4, 20, 9, 3, 150, 380, 300, 210];
  if (Math.round(380 / 20) !== 19) throw new Error("ratio");
  const ax = D.axes({ x: [0, 56], y: [0, 420], w: 600, h: 400, xTicks: 7, yTicks: 50, xLabel: "Day", yLabel: "Antibody concentration / arbitrary units", pad: { l: 70, r: 28, t: 40, b: 58 } });
  let b = ax.frame;
  for (const dd of [0, 28]) b += D.line(ax.X(dd), ax.Y(0), ax.X(dd), ax.Y(420), { stroke: C.red, width: 1.4, dash: true });
  b += ax.line(day.map((x, i) => [x, ab[i]]), { stroke: C.blue });
  day.forEach((x, i) => { b += ax.point(x, ab[i], { stroke: C.blue, r: 3.5 }); });
  b += D.text(ax.X(0) + 6, ax.Y(405), "first exposure", { size: 12, fill: C.red }) + D.text(ax.X(28) + 6, ax.Y(405), "second exposure", { size: 12, fill: C.red });
  b += ax.tag(14, 62, "primary peak 20 (day 14)", { anchor: "middle" }) + ax.tag(39.5, 320, "secondary peak 380 (19 × the first)", { anchor: "end" });
  const alt = "Antibody concentration after two exposures to the same antigen: after the first exposure on day 0 it peaks slowly at 20 units on day 14 and falls to 3 by day 28; after the second exposure on day 28 it rises faster to 150 by day 35 and peaks at 380 on day 42, 19 times the first peak, then falls more slowly, showing the effect of memory cells.";
  const cap = "Figure: primary and secondary immune responses, from the lesson's data (exposures on day 0 and day 28)";
  await fig("antibody-primary-secondary", D.svg(600, 400, b), alt, cap, "immunity/immune-response", "| Antibody concentration / arbitrary units | 0 | 4 | 20");
}

// ---- Aerobic respiration overview with the counts of the worked solutions
{
  const g = { atp: 2, nad: 2, co2: 0 }, link = { co2: 2, nad: 2 }, kreb = { co2: 4, nad: 6, fad: 2, atp: 2 };
  const nadTotal = g.nad + link.nad + kreb.nad, fadTotal = kreb.fad, atpDirect = g.atp + kreb.atp, co2Total = link.co2 + kreb.co2;
  const ox = nadTotal * 2.5 + fadTotal * 1.5, total = ox + atpDirect;
  if (nadTotal !== 10 || fadTotal !== 2 || atpDirect !== 4 || co2Total !== 6 || ox !== 28 || total !== 32) throw new Error("respiration counts");
  const w = 640, h = 380;
  let b = "";
  const bx = (i) => 14 + i * 156, bwid = 142;
  const stages = [
    ["Glycolysis", "cytoplasm", ["glucose (6C) →", "2 pyruvate (3C)", "net 2 ATP", "2 reduced NAD"], C.fillBlue],
    ["Link reaction (×2)", "mitochondrial matrix", ["pyruvate →", "acetyl (2C)", "2 CO₂", "2 reduced NAD"], C.fillGreen],
    ["Krebs cycle (×2)", "mitochondrial matrix", ["acetyl + 4C acid,", "CO₂ released;", "per glucose: 4 CO₂,", "6 NAD, 2 FAD, 2 ATP", "(NAD, FAD reduced)"], C.fillAmber],
    ["Oxidative|phosphorylation", "inner membrane", ["10 reduced NAD ×2.5", "= 25 ATP", "2 reduced FAD ×1.5", "= 3 ATP; O₂ → water"], C.fillGrey],
  ];
  stages.forEach(([name, site, lines, fill], i) => {
    b += D.rect(bx(i), 30, bwid, 190, { fill, stroke: C.axis, width: 2, r: 10 });
    b += T(bx(i) + bwid / 2, 50, name.split("|")[0], { weight: 700, size: 13 }) + (name.includes("|") ? T(bx(i) + bwid / 2, 66, name.split("|")[1], { weight: 700, size: 13 }) : "");
    b += T(bx(i) + bwid / 2, 86, site, { size: 12, fill: C.muted });
    lines.forEach((l, k) => { b += T(bx(i) + bwid / 2, 114 + k * 22, l, { size: 12 }); });
    if (i < 3) b += arr(bx(i) + bwid + 1, 125, bx(i + 1) - 1, 125, C.ink, 2.4);
  });
  b += D.text(14, 255, "Totals per glucose", { size: 14, weight: 700 });
  b += D.text(14, 280, `CO₂: ${link.co2} + ${kreb.co2} = ${co2Total}`, { size: 13 }) + D.text(14, 300, `Reduced NAD: ${g.nad} + ${link.nad} + ${kreb.nad} = ${nadTotal};  reduced FAD: ${fadTotal}`, { size: 13 });
  b += D.text(14, 320, `ATP made directly: ${g.atp} + ${kreb.atp} = ${atpDirect};  oxidative phosphorylation: ${nadTotal} × 2.5 + ${fadTotal} × 1.5 = ${ox}`, { size: 13 });
  b += D.text(14, 350, `Total ATP per glucose: ${atpDirect} + ${ox} = ${total}`, { size: 15, weight: 700 });
  const alt = "Aerobic respiration in four stages with counts per glucose: glycolysis in the cytoplasm gives 2 pyruvate, 2 net ATP and 2 reduced NAD; the link reaction and Krebs cycle (each twice) in the matrix give 6 CO2, 8 more reduced NAD, 2 reduced FAD and 2 ATP; oxidative phosphorylation on the inner membrane makes 25 + 3 = 28 ATP, so the total is 4 + 28 = 32 ATP.";
  const cap = "Figure: the four stages of aerobic respiration and the yield per glucose (values from the worked solutions)";
  await fig("aerobic-respiration-overview", D.svg(w, h, b), alt, cap, "respiration/glycolysis-krebs", "| Total per glucose | 6 | 10 | 2 | 4 |");
}

// ---- Heart, internal structure
{
  const w = 600, h = 470;
  let b = "";
  const blue = C.fillBlue, red = C.fillAmber;
  // vessels
  b += D.rect(258, 50, 30, 192, { fill: blue, stroke: C.axis, width: 2 }) + D.rect(306, 50, 40, 192, { fill: red, stroke: C.axis, width: 2 });
    // atria
  b += D.rect(120, 130, 130, 105, { fill: blue, stroke: C.axis, width: 3, r: 22 }) + D.rect(350, 130, 130, 105, { fill: red, stroke: C.axis, width: 3, r: 22 });
  // ventricles: right thin wall, left thick wall
  b += D.rect(130, 240, 170, 165, { fill: blue, stroke: C.axis, width: 3, r: 30 }) + D.rect(300, 240, 175, 165, { fill: red, stroke: C.axis, width: 10, r: 36 });
  b += D.line(300, 236, 300, 400, { stroke: C.axis, width: 7 }); // septum
  // AV valves (flaps) and tendinous cords
  b += D.polyline([[170, 238], [190, 268], [210, 238]], { stroke: C.amber, width: 3 }) + D.polyline([[222, 238], [236, 262], [250, 238]], { stroke: C.amber, width: 3 });
  b += D.polyline([[350, 238], [372, 270], [394, 238]], { stroke: C.amber, width: 3 }) + D.polyline([[408, 238], [424, 264], [440, 238]], { stroke: C.amber, width: 3 });
  for (const [x, y] of [[190, 268], [236, 262], [372, 270], [424, 264]]) b += D.line(x, y, x + (x < 300 ? -2 : 3), 330, { stroke: C.muted, width: 1.4 });
  b += D.path_("M184,330 q8,-8 16,0 v24 h-16 z", { fill: C.fillGrey, stroke: C.axis, width: 1.5 }) + D.path_("M366,330 q8,-8 16,0 v24 h-16 z", { fill: C.fillGrey, stroke: C.axis, width: 1.5 });
  // semilunar valve marks at the arterial bases
  b += D.polyline([[258, 226], [273, 238], [288, 226]], { stroke: C.amber, width: 3 }) + D.polyline([[306, 226], [326, 238], [346, 226]], { stroke: C.amber, width: 3 });
  // chamber labels
  b += T(185, 190, "right atrium", { weight: 700 }) + T(415, 190, "left atrium", { weight: 700 }) + T(225, 385, "right ventricle", { weight: 700 }) + T(392, 385, "left ventricle", { weight: 700 });
  // arrows into and out of the heart
  b += arr(60, 170, 120, 170, C.ink, 2.4) + D.text(8, 150, "venae cavae", { size: 12 }) + D.text(8, 164, "from body", { size: 12 }).replace("", "");
  b += arr(540, 170, 482, 170, C.ink, 2.4) + D.text(500, 150, "pulmonary", { size: 12 }) + D.text(500, 164, "veins from lungs", { size: 12 }).replace("", "");
  b += arr(273, 70, 273, 36, C.ink, 2.4) + arr(326, 70, 326, 36, C.ink, 2.4);
  b += D.text(268, 26, "pulmonary artery", { size: 12, anchor: "end" }) + D.text(334, 26, "aorta", { size: 12 });
  // labels with leaders
  b += D.text(8, 232, "tricuspid valve", { size: 12 }) + lead(96, 228, 180, 240);
  b += D.text(500, 232, "bicuspid valve", { size: 12 }) + lead(500, 228, 420, 240);
  b += D.text(8, 318, "tendinous cords", { size: 12 }) + lead(88, 314, 188, 304);
  b += D.text(8, 346, "papillary muscle", { size: 12 }) + lead(96, 342, 186, 342);
  b += D.text(300, 432, "septum", { size: 12, anchor: "middle" }) + lead(300, 420, 300, 404);
  b += D.text(500, 330, "left ventricle wall", { size: 12 }) + D.text(500, 345, "2-3 × thicker", { size: 12 }) + lead(498, 326, 474, 316);
  b += D.text(500, 284, "semilunar valves", { size: 12 }) + lead(498, 280, 350, 232);
  b += D.text(300, 462, "Blue fill: right side, deoxygenated blood. Amber fill: left side, oxygenated blood.", { size: 12, fill: C.muted, anchor: "middle" });
  const alt = "Internal structure of the heart: deoxygenated blood from the venae cavae enters the right atrium and passes through the tricuspid valve to the right ventricle and out by the pulmonary artery; oxygenated blood from the pulmonary veins enters the left atrium, passes through the bicuspid valve to the left ventricle, whose wall is two to three times thicker, and leaves by the aorta; a septum separates the two sides and tendinous cords hold the valve flaps.";
  const cap = "Figure: the four chambers, valves and main vessels of the mammalian heart (diagrammatic)";
  await fig("heart-internal-structure", D.svg(w, h, b), alt, cap, "mammal-transport/heart", "**Internal structure:**");
}
