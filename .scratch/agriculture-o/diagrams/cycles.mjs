// agriculture-o: nitrogen cycle and water cycle. Run: node .scratch/agriculture-o/diagrams/cycles.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "agriculture-o";
const L = `content/subjects/${FAMILY}/lessons`;
import { lab, C } from "./lib.mjs";

// ---------------------------------------------------------------- nitrogen cycle
{
  const W = 600, H = 510, bw = 150, bh = 46;
  let b = "";
  const box = (x, y, label, fill) => D.node(x, y, bw, bh, label, { fill, size: 14 });
  b += box(225, 14, "Nitrogen gas, N₂\nin the air", C.fillGrey);
  b += box(20, 170, "Nitrate, NO₃⁻\nin the soil", C.fillGreen);
  b += box(430, 170, "Plants, then\nanimals (proteins)", C.fillGreen);
  b += box(430, 310, "Dead plants and\nanimals, dung, urine", C.fillAmber);
  b += box(225, 410, "Ammonium, NH₄⁺\nin the soil", C.fillBlue);
  b += box(20, 310, "Nitrite, NO₂⁻\nin the soil", C.fillBlue);
  b += D.arrow(250, 62, 130, 168, { stroke: C.amber, width: 2 });
  b += lab(205, 125, "Lightning", { fill: C.amber });
  b += D.arrow(60, 168, 225, 44, { stroke: C.red, width: 2 });
  b += lab(112, 98, "Denitrification", { fill: C.red, anchor: "end" });
  b += D.text(112, 118, "(no oxygen)", { size: 12, fill: C.red, anchor: "end" });
  b += D.arrow(300, 62, 300, 408, { stroke: C.amber, width: 2 });
  b += lab(308, 232, "Fixation by Rhizobium,\nfree-living bacteria\nand industry (Haber)", { fill: C.amber });
  b += D.arrow(170, 193, 428, 193, { stroke: C.blue, width: 2 });
  b += lab(180, 186, "Uptake by roots", { fill: C.blue });
  b += D.arrow(505, 218, 505, 308, { stroke: C.ink, width: 2 });
  b += lab(497, 294, "Death and excretion", { anchor: "end" });
  b += D.arrow(440, 358, 372, 418, { stroke: C.ink, width: 2 });
  b += lab(412, 400, "Ammonification\n(decomposers)");
  b += D.arrow(228, 430, 172, 358, { stroke: C.ink, width: 2 });
  b += lab(188, 404, "Nitrosomonas", { anchor: "end" });
  b += D.arrow(95, 308, 95, 218, { stroke: C.ink, width: 2 });
  b += lab(103, 268, "Nitrobacter");
  b += D.text(14, 482, "Nitrification (ammonium to nitrite to nitrate) needs oxygen. Other losses: leaching of", { size: 12, fill: C.red });
  b += D.text(14, 500, "nitrate, ammonia gas from urea or manure, crop removal, erosion and burning.", { size: 12, fill: C.red });
  const alt = "Nitrogen cycle: nitrogen gas is fixed by lightning, Rhizobium, free-living bacteria and industry; ammonification by decomposers makes ammonium, Nitrosomonas makes nitrite and Nitrobacter makes nitrate, which roots take up into plants and animals; denitrification returns nitrate to nitrogen gas in waterlogged soil.";
  const cap = "Figure: the nitrogen cycle, with the organism or agent at each step and the losses in red";
  await D.figure(FAMILY, "nitrogen-cycle", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/soil/nitrogen-cycle.md`, "Think of the cycle as a set of", D.md("nitrogen-cycle", alt, cap));
}

// ---------------------------------------------------------------- water cycle (landscape)
{
  const W = 620, H = 470;
  let b = "";
  const blue = C.blue;
  const surface = [[150, 262], [250, 212], [400, 240], [470, 262], [620, 268]];
  const sy = (x) => { for (let i = 0; i < surface.length - 1; i += 1) { const [x1, y1] = surface[i], [x2, y2] = surface[i + 1]; if (x >= x1 && x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1); } return 262; };
  b += D.polyline([...surface, [620, 340], [150, 340]], { close: true, fill: "#f3e7d3", stroke: "none" });
  b += D.rect(0, 340, 620, 100, { fill: C.fillBlue, stroke: "none" });
  b += D.rect(0, 262, 150, 78, { fill: C.fillBlue, stroke: "none" });
  b += D.line(0, 262, 150, 262, { stroke: blue, width: 2 });
  b += D.polyline(surface, { stroke: "#7a5a2f", width: 3 });
  b += D.line(150, 340, 620, 340, { stroke: blue, width: 2, dash: true });
  b += D.line(150, 262, 150, 340, { stroke: "#7a5a2f", width: 2 });
  b += D.text(14, 300, "Sea", { size: 15, weight: 700, fill: blue });
  b += D.text(165, 300, "Unsaturated zone\n(air and water in pores)", { size: 13, fill: "#7a5a2f" });
  b += D.text(165, 358, "Water table", { size: 13, fill: blue, weight: 700 });
  b += D.text(14, 410, "Saturated zone: aquifer (all pores full of water)", { size: 13, fill: blue });
  b += D.polyline([[470, 262], [490, 282], [550, 282], [572, 266]], { close: true, fill: "#bfe3ef", stroke: blue, width: 2 });
  // crops
  for (const x of [330, 350, 370, 390]) { const y = sy(x); b += D.line(x, y, x, y - 22, { stroke: C.green, width: 2.5 }) + D.line(x, y - 10, x - 9, y - 18, { stroke: C.green, width: 2 }) + D.line(x, y - 14, x + 9, y - 22, { stroke: C.green, width: 2 }); }
  // tree on the hill
  b += D.line(225, sy(225), 225, sy(225) - 16, { stroke: "#7a5a2f", width: 4 }) + D.circle(225, sy(225) - 28, 14, { fill: "#cfeede", stroke: C.green });
  // sun, cloud
  b += D.circle(48, 52, 22, { fill: C.fillAmber, stroke: C.amber });
  for (let a = 0; a < 8; a += 1) { const t = (a * Math.PI) / 4; b += D.line(48 + 28 * Math.cos(t), 52 + 28 * Math.sin(t), 48 + 38 * Math.cos(t), 52 + 38 * Math.sin(t), { stroke: C.amber, width: 2 }); }
  b += D.circle(310, 78, 22, { fill: C.fillGrey, stroke: C.axis, width: 1.6 }) + D.circle(340, 70, 28, { fill: C.fillGrey, stroke: C.axis, width: 1.6 }) + D.circle(374, 80, 20, { fill: C.fillGrey, stroke: C.axis, width: 1.6 });
  b += D.rect(311, 78, 62, 22, { fill: C.fillGrey, stroke: "none" }) + D.line(310, 100, 374, 100, { stroke: C.axis, width: 1.6 });
  b += lab(398, 62, "3 Condensation");
  // 1 evaporation
  b += D.arrow(60, 256, 60, 150, { stroke: C.amber, width: 2 });
  b += D.arrow(100, 256, 100, 170, { stroke: C.amber, width: 2 });
  b += lab(20, 138, "1 Evaporation");
  b += D.arrow(512, 258, 512, 190, { stroke: C.amber, width: 2 });
  b += lab(520, 228, "Evaporation", { size: 12 });
  // 2 transpiration
  b += D.arrow(390, 205, 390, 130, { stroke: C.amber, width: 2 });
  b += lab(400, 170, "2 Transpiration");
  // 4 precipitation
  for (const x of [300, 330, 360]) b += D.arrow(x, 112, x - 10, 148, { stroke: blue, width: 1.8 });
  b += lab(182, 125, "4 Precipitation");
  // 5 interception
  b += lab(168, 150, "5 Interception");
  b += D.arrow(225, 188, 225, 170, { stroke: C.amber, width: 1.6 });
  // 6 infiltration
  b += D.arrow(350, sy(350) + 6, 350, 334, { stroke: blue, width: 2.4 });
  b += lab(360, 322, "6 Infiltration and percolation");
  // 7 runoff
  b += D.arrow(262, 217, 296, 224, { stroke: C.red, width: 2.2 });
  b += D.arrow(404, 242, 462, 259, { stroke: C.red, width: 2.2 });
  b += lab(266, 205, "7 Runoff", { fill: C.red });
  // 8 groundwater
  b += D.arrow(560, 375, 170, 375, { stroke: blue, width: 2.6 });
  b += lab(365, 428, "8 Groundwater flow towards the sea", { anchor: "middle" });
  b += D.text(521, 277, "Dam", { size: 12, fill: blue, anchor: "middle", weight: 700 });
  const alt = "Water cycle on a farm landscape: 1 evaporation from sea and dam, 2 transpiration from crops, 3 condensation into cloud, 4 precipitation, 5 interception on leaves, 6 infiltration and percolation to the water table, 7 surface runoff to the dam, 8 groundwater flow through the aquifer towards the sea.";
  const cap = "Figure: the water cycle, numbered in the same order as the stages in the text";
  await D.figure(FAMILY, "water-cycle-landscape", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/water/water-cycle.md`, "Land use changes the cycle", D.md("water-cycle-landscape", alt, cap));
}
// ---------------------------------------------------------------- where does 25 mm of rain go (worked example)
{
  const rainMm = 25, area = 10000; // m2 (1 ha)
  const total = (rainMm * area) / 1000; // m3: 1 mm on 1 m2 = 1 L
  const parts = [["Runoff", 0.2, C.red], ["Infiltration", 0.7, C.blue], ["Evaporation", 0.1, C.amber]].map(([l, f, c]) => ({ label: l, value: total * f, fill: c, pct: f * 100 }));
  const sum = parts.reduce((s, p) => s + p.value, 0);
  if (Math.abs(sum - total) > 1e-9 || total !== 250) throw new Error("water budget");
  const svg = D.barChart(parts.map((p) => ({ label: `${p.label} (${p.pct}%)`, value: p.value, fill: p.fill })), { w: 560, h: 360, yMax: 200, yLabel: "Volume (cubic metres, m3)", yTicks: 50 });
  const alt = "Bar chart of where 250 cubic metres of rain from a 25 mm storm on 1 hectare goes: runoff 50 m3 (20%), infiltration 175 m3 (70%) and evaporation 25 m3 (10%), which add up to 250 m3.";
  const cap = "Figure: where the 250 m3 of rain from a 25 mm storm on 1 ha goes";
  await D.figure(FAMILY, "rain-partition-bar-chart", svg, { alt, caption: cap });
  D.insertAfter(`${L}/water/water-cycle.md`, "Land use changes the cycle", D.md("rain-partition-bar-chart", alt, cap));
}
console.log("cycles done");
