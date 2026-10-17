// agriculture-o water diagrams: irrigation methods, efficiency. Run: node .scratch/agriculture-o/diagrams/water.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const SOIL = "#efe2cc", BROWN = "#7a5a2f", WATER = "#9fd0e3";
const plant = (x, y, h = 24) => D.line(x, y, x, y - h, { stroke: C.green, width: 2.5 }) + D.line(x, y - h * 0.5, x - 9, y - h * 0.8, { stroke: C.green, width: 2 }) + D.line(x, y - h * 0.65, x + 9, y - h * 0.95, { stroke: C.green, width: 2 });

// ---------------------------------------------------------------- three methods side by side
{
  const eff = { furrow: "about 50-70%", sprinkler: "about 70-80%", drip: "about 90%" };
  const W = 620, H = 400;
  let b = "";
  const g = 170; // ground line
  const panels = [10, 215, 420];
  const pw = 190;
  panels.forEach((x, i) => { if (i !== 0) b += D.rect(x, g, pw, 110, { fill: SOIL, stroke: "none" }); });
  { const x = panels[0]; b += D.polyline([[x, g], [x + 20, g], [x + 40, g - 22], [x + 62, g - 22], [x + 82, g], [x + 108, g], [x + 128, g - 22], [x + 150, g - 22], [x + 170, g], [x + 190, g], [x + 190, g + 110], [x, g + 110]], { close: true, fill: SOIL, stroke: "none" }); }
  // 1 furrow: ridges and furrows
  {
    const x = panels[0];
    b += D.text(x, 22, "Furrow (surface)", { size: 15, weight: 700 });
    b += D.polyline([[x, g], [x + 20, g], [x + 40, g - 22], [x + 62, g - 22], [x + 82, g], [x + 108, g], [x + 128, g - 22], [x + 150, g - 22], [x + 170, g], [x + 190, g]], { stroke: BROWN, width: 3 });
    for (const fx of [x + 51, x + 139]) b += plant(fx, g - 22, 26);
    b += D.polyline([[x + 84, g - 1], [x + 90, g + 6], [x + 102, g + 6], [x + 108, g - 1]], { close: true, fill: WATER, stroke: C.blue, width: 1.6 });
    b += D.polyline([[x + 2, g - 1], [x + 8, g + 6], [x + 14, g + 6], [x + 20, g - 1]], { close: true, fill: WATER, stroke: C.blue, width: 1.6 });
    b += D.polyline([[x + 170, g - 1], [x + 176, g + 6], [x + 186, g + 6], [x + 190, g - 1]], { close: true, fill: WATER, stroke: C.blue, width: 1.6 });
    b += D.arrow(x + 96, g + 8, x + 70, g + 36, { stroke: C.blue, width: 1.6 }) + D.arrow(x + 96, g + 8, x + 122, g + 36, { stroke: C.blue, width: 1.6 });
    b += D.text(x + 4, g + 130, "Water runs along furrows\nand soaks sideways into\nthe ridges by gravity.", { size: 13 });
  }
  // 2 sprinkler
  {
    const x = panels[1], cx = x + 95;
    b += D.text(x, 22, "Sprinkler (overhead)", { size: 15, weight: 700 });
    b += D.line(x, g, x + pw, g, { stroke: BROWN, width: 3 });
    b += D.line(cx, g, cx, g - 54, { stroke: C.axis, width: 3 }) + D.rect(cx - 6, g - 62, 12, 10, { fill: C.fillAmber, stroke: C.axis, width: 1.5 });
    for (let k = -3; k <= 3; k += 1) b += D.path_(`M${cx},${g - 62} Q${cx + k * 14},${g - 112} ${cx + k * 28},${g - 14}`, { stroke: C.blue, width: 1.6, dash: true });
    for (const fx of [x + 20, x + 50, x + 140, x + 170]) b += plant(fx, g, 24);
    b += D.text(cx, g - 120, "spray falls like rain", { size: 12, anchor: "middle", fill: C.blue });
    b += D.line(x, g + 36, x + pw, g + 36, { stroke: C.axis, width: 5 });
    b += D.line(cx, g + 36, cx, g - 4, { stroke: C.axis, width: 4 });
    b += D.text(x + 100, g + 52, "lateral pipe", { size: 12, anchor: "middle", fill: C.muted });
    b += D.text(x + 4, g + 130, "Pump pushes water through\npipes to sprinklers; wind\ncan blow the spray.", { size: 13 });
  }
  // 3 drip
  {
    const x = panels[2];
    b += D.text(x, 22, "Drip (trickle)", { size: 15, weight: 700 });
    b += D.line(x, g, x + pw, g, { stroke: BROWN, width: 3 });
    b += D.line(x, g - 6, x + pw, g - 6, { stroke: C.ink, width: 4 });
    for (const fx of [x + 40, x + 100, x + 160]) {
      b += plant(fx, g, 24);
      b += D.path_(`M${fx - 28},${g + 2} Q${fx},${g + 70} ${fx + 28},${g + 2} Z`, { fill: WATER, stroke: C.blue, width: 1.4 });
      b += D.line(fx + 8, g - 4, fx + 8, g + 6, { stroke: C.blue, width: 2.4 });
    }
    b += D.text(x + 100, g - 40, "filtered water in", { size: 12, anchor: "middle", fill: C.muted });
    b += D.text(x + 4, g + 130, "Emitters drip water at each\nplant, so only the root zone\nis wetted.", { size: 13 });
  }
  b += D.text(10, 376, `Typical efficiency: furrow ${eff.furrow}, sprinkler ${eff.sprinkler}, drip ${eff.drip}.`, { size: 13, weight: 700 });
  b += D.text(10, 394, "Blue is the water; the lower shaded block in each panel is soil.", { size: 12, fill: C.muted });
  const alt = "Three irrigation methods in cross-section: furrow irrigation runs water along furrows between ridges (efficiency about 50 to 70%), a sprinkler sprays water over the crop from a riser on a lateral pipe (about 70 to 80%), and drip irrigation drips water at each plant so only the root zone is wetted (about 90%).";
  const cap = "Figure: furrow, sprinkler and drip irrigation compared, with typical efficiencies";
  await D.figure(FAMILY, "irrigation-methods-compared", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/water/irrigation-methods.md`, "## Hand watering", D.md("irrigation-methods-compared", alt, cap));
}

// ---------------------------------------------------------------- water to supply: furrow 60% vs drip 90% (worked example)
{
  const crop = 2000 * 30; // 60 000 L stored in the root zone
  const furrow = crop / 0.6, drip = crop / 0.9;
  if (furrow !== 100000 || Math.round(drip) !== 66667) throw new Error("irrigation numbers");
  const svg = D.barChart([
    { label: "Needed by crop", value: crop, fill: C.green },
    { label: "Drip (90%)", value: Math.round(drip), fill: C.blue },
    { label: "Furrow (60%)", value: furrow, fill: C.amber },
  ], { w: 560, h: 370, yMax: 120000, yLabel: "Water per irrigation (litres)", yTicks: 20000 });
  const alt = "Bar chart for 2,000 square metres needing 30 mm in the root zone: the crop needs 60,000 litres, drip irrigation at 90% efficiency must supply 66,667 litres and furrow irrigation at 60% efficiency must supply 100,000 litres, so drip saves 33,333 litres each time.";
  const cap = "Figure: water to supply for a 60,000 L crop need, drip (90%) against furrow (60%)";
  await D.figure(FAMILY, "irrigation-efficiency-bars", svg, { alt, caption: cap });
  insertAfterBlock(`${L}/water/irrigation-methods.md`, "A crop on $2\\,000", D.md("irrigation-efficiency-bars", alt, cap));
}
console.log("water done");
