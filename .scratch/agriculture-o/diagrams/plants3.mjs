// agriculture-o diagrams: osmosis in root hairs, potometer rates, mouldboard plough. Run: node .scratch/agriculture-o/diagrams/plants3.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const SOIL = "#efe2cc";

// ---------------------------------------------------------------- osmosis in a root hair: normal soil vs too much fertiliser
{
  const W = 640, H = 380;
  let b = "";
  const dots = (x, y, w, h, n, fill) => { let o = ""; for (let i = 0; i < n; i += 1) { const px = x + 8 + ((i * 37) % (w - 16)); const py = y + 8 + ((i * 53) % (h - 16)); o += D.circle(px, py, 2.6, { fill, stroke: fill, width: 1 }); } return o; };
  const panel = (x0, title, soilDots, sub, inward) => {
    let o = D.text(x0 + 150, 24, title, { size: 15, weight: 700, anchor: "middle" });
    o += D.rect(x0, 50, 300, 250, { fill: SOIL, stroke: C.axis, width: 1.4 });
    o += dots(x0, 50, 300, 250, soilDots, C.amber);
    // root hair cell (tube) coming down from the top into soil water
    o += D.rect(x0 + 100, 50, 100, 150, { fill: "#f4fbf2", stroke: C.green, width: 3, r: 14 });
    o += dots(x0 + 100, 50, 100, 150, 26, C.blue);
    o += D.rect(x0 + 106, 104, 88, 60, { fill: "#f4fbf2", stroke: "none" });
    o += D.text(x0 + 150, 120, "root hair cell", { size: 13, anchor: "middle", weight: 700 }) + D.text(x0 + 150, 138, "(cell sap: many dissolved", { size: 12, anchor: "middle" }) + D.text(x0 + 150, 154, "substances)", { size: 12, anchor: "middle" });
    // arrows for water
    if (inward) { o += D.arrow(x0 + 70, 120, x0 + 98, 120, { stroke: C.blue, width: 3 }) + D.arrow(x0 + 230, 120, x0 + 202, 120, { stroke: C.blue, width: 3 }) + D.arrow(x0 + 150, 250, x0 + 150, 204, { stroke: C.blue, width: 3 }); }
    else { o += D.arrow(x0 + 98, 120, x0 + 66, 120, { stroke: C.red, width: 3 }) + D.arrow(x0 + 202, 120, x0 + 234, 120, { stroke: C.red, width: 3 }) + D.arrow(x0 + 150, 204, x0 + 150, 246, { stroke: C.red, width: 3 }); }
    o += D.text(x0 + 150, 322, sub, { size: 13, anchor: "middle", weight: 700, fill: inward ? C.blue : C.red });
    return o;
  };
  b += panel(10, "Normal soil water", 8, "Soil water is dilute: water moves IN", true);
  b += panel(330, "Fertiliser against the roots", 40, "Soil solution is stronger: water moves OUT", false);
  b += D.text(10, 350, "Amber dots = dissolved substances in the soil water; blue dots = dissolved substances in the cell sap.", { size: 12, fill: C.muted });
  b += D.text(10, 368, "Water always moves by osmosis towards the more concentrated solution.", { size: 12, fill: C.muted });
  const alt = "Two panels showing osmosis at a root hair: in normal dilute soil water, water moves into the root hair cell whose sap is more concentrated; with fertiliser placed against the roots the soil solution becomes more concentrated than the cell sap, so water moves out of the root hair and the seedling wilts and looks scorched.";
  const cap = "Figure: water moves into a root hair from dilute soil water but out of it when fertiliser makes the soil solution stronger";
  await D.figure(FAMILY, "root-hair-osmosis-fertiliser", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/plants/water-uptake-transpiration.md`, "Why too much fertiliser near the seed causes damage", D.md("root-hair-osmosis-fertiliser", alt, cap));
}

// ---------------------------------------------------------------- potometer rates (worked example)
{
  const data = [["Still air, shade", 15], ["Still air, bright light", 30], ["Fan (wind), bright light", 55], ["Bag over shoot (humid)", 10]];
  const rates = data.map(([n, d]) => [n, d / 5]);
  if (rates.map((r) => r[1]).join() !== "3,6,11,2") throw new Error("potometer");
  const svg = D.barChart(rates.map(([l, v], i) => ({ label: l.replace(", ", ",\n").replace(" (", "\n("), value: v, fill: [C.teal, C.amber, C.red, C.green][i] })), { w: 600, h: 400, yMax: 14, yLabel: "Rate of water uptake (mm per minute)", yTicks: 2 });
  const alt = "Bar chart of potometer rates from the bean shoot: 3 mm per minute in still air and shade, 6 in still air and bright light, 11 with a fan in bright light and 2 with a plastic bag over the shoot; light doubles the rate, wind raises it a further 83.3% and high humidity cuts it.";
  const cap = "Figure: potometer rates (distance moved in 5 minutes divided by 5) under four conditions";
  await D.figure(FAMILY, "potometer-rates-bars", svg, { alt, caption: cap });
  insertAfterBlock(`${L}/plants/water-uptake-transpiration.md`, "Interpreting potometer results", D.md("potometer-rates-bars", alt, cap));
}

// ---------------------------------------------------------------- mouldboard plough, side view
{
  const W = 680, H = 410;
  let b = "";
  const gy = 250;
  b += D.rect(0, gy, W, 70, { fill: SOIL, stroke: "none" }) + D.line(0, gy, W, gy, { stroke: "#7a5a2f", width: 3 });
  b += D.line(0, 292, W, 292, { stroke: "#a98d63", width: 1.6, dash: true }) + D.text(W - 6, 312, "furrow bottom", { size: 12, anchor: "end", fill: C.muted });
  const wood = "#9a6b3a", iron = "#59636a";
  // trek chain and hake
  for (let i = 0; i < 5; i += 1) b += `<ellipse cx="${20 + i * 12}" cy="150" rx="7" ry="4" fill="none" stroke="${C.axis}" stroke-width="2"/>`;
  b += D.line(80, 150, 440, 186, { stroke: wood, width: 10 });
  b += D.rect(74, 134, 22, 40, { fill: "#d9c3a0", stroke: C.axis, width: 1.4 });
  for (const [x, y] of [[80, 142], [80, 152], [80, 162], [90, 152]]) b += D.circle(x, y, 2, { fill: C.axis, stroke: C.axis, width: 1 });
  // wheel
  b += D.line(125, 158, 125, 228, { stroke: iron, width: 5 }) + D.circle(125, 228, 22, { fill: "#fff", stroke: C.axis, width: 3 }) + D.circle(125, 228, 3, { fill: C.axis, stroke: C.axis, width: 1 });
  // coulter
  b += D.line(250, 168, 262, 262, { stroke: iron, width: 4 });
  // frog and body
  b += D.polyline([[300, 176], [372, 182], [378, 270], [296, 284], [292, 250]], { close: true, fill: "#b9b3a6", stroke: C.axis, width: 2 });
  // share
  b += D.polyline([[268, 292], [312, 270], [350, 292]], { close: true, fill: iron, stroke: C.axis, width: 2 });
  // mouldboard
  b += D.path_("M312,270 C340,268 380,258 408,228 C396,262 372,284 350,290 Z", { fill: "#7e8890", stroke: C.axis, width: 2 });
  // landside and heel
  b += D.line(350, 292, 420, 292, { stroke: iron, width: 7 });
  // handles
  b += D.line(440, 186, 560, 118, { stroke: wood, width: 8 }) + D.line(470, 168, 540, 205, { stroke: wood, width: 6 });
  // labels
  b += D.text(10, 100, "Trek chain", { size: 13, weight: 700 }) + leader(40, 106, 44, 140);
  b += D.text(60, 54, "Hake: holes set depth", { size: 13, weight: 700 }) + D.text(60, 70, "(up and down) and width (sideways)", { size: 12, fill: C.muted }) + leader(80, 76, 84, 132);
  b += D.text(130, 330, "Wheel: steadies the plough, sets depth", { size: 13, weight: 700 }) + leader(150, 318, 135, 248);
  b += D.text(300, 96, "Beam", { size: 14, weight: 700 }) + leader(318, 102, 300, 164);
  b += D.text(180, 120, "Coulter", { size: 13, weight: 700 }) + leader(215, 128, 252, 190);
  b += D.text(380, 60, "Frog: frame for share,", { size: 13, weight: 700 }) + D.text(380, 76, "mouldboard and landside", { size: 12, fill: C.muted }) + leader(390, 84, 358, 190);
  b += D.text(240, 360, "Share: penetrates and cuts the slice", { size: 13, weight: 700 }) + leader(300, 346, 296, 286);
  b += D.text(420, 340, "Mouldboard: lifts and turns the slice", { size: 13, weight: 700 }) + leader(520, 326, 396, 258);
  b += D.text(460, 288, "Landside, heel", { size: 13, weight: 700 }) + leader(470, 292, 418, 292);
  b += D.text(540, 100, "Handles (stilts)", { size: 13, weight: 700 }) + leader(566, 106, 540, 150);
  b += D.text(10, 390, "Direction of travel", { size: 12, fill: C.muted }) + D.arrow(190, 385, 120, 385, { stroke: C.muted, width: 1.6 });
  const alt = "Side view of an ox-drawn mouldboard plough from front to back: trek chain, hake on the beam, wheel, coulter, frog carrying the share, mouldboard and landside with its heel, and the handles; the share cuts the furrow slice, the mouldboard turns it and the landside keeps the plough straight.";
  const cap = "Figure: the parts of a mouldboard plough, front to back";
  await D.figure(FAMILY, "mouldboard-plough-parts", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/machinery/tillage-implements.md`, "| Heel | Rear end of the landside", D.md("mouldboard-plough-parts", alt, cap));
}
console.log("plants3 done");
