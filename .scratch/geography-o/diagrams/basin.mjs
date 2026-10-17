// geography-o: drainage basin as an open system (hillside cross-section). Run: node .scratch/geography-o/diagrams/basin.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons/rivers`;
const { C } = D;
const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 13, ...o });

const S = [[20, 120], [120, 160], [240, 220], [340, 262], [400, 288]];
const soilDepth = 24;
const WT = (x) => 270 + (x - 20) * 0.078; // water table
let b = "";
// ground body (rock)
b += D.polyline([...S, [424, 312], [490, 312], [514, 288], [540, 270], [540, 392], [20, 392]], { fill: C.fillGrey, stroke: "none", close: true });
// groundwater store (below the water table)
b += D.polyline([[20, WT(20)], [404, WT(404)], [540, WT(404)], [540, 392], [20, 392]], { fill: C.fillBlue, stroke: "none", close: true });
b += D.polyline([[20, WT(20)], [404, WT(404)]], { stroke: C.blue, width: 1.6, dash: true });
// soil
b += D.polyline([...S, ...[...S].reverse().map(([x, y]) => [x, y + soilDepth])], { fill: "#e9d5b8", stroke: "none", close: true });
// river water
b += D.polyline([[400, 288], [424, 312], [490, 312], [514, 288]], { fill: "#bfe6f1", stroke: C.blue, width: 2.4, close: true });
b += D.polyline([...S, [424, 312], [490, 312], [514, 288], [540, 270]], { stroke: C.ink, width: 2.6 });
// tree
b += D.line(150, 174, 150, 146, { stroke: "#6b4f2a", width: 4 }) + D.circle(150, 128, 20, { fill: C.fillGreen, stroke: C.green, width: 2 });
// rain (input)
for (const x of [50, 105, 215, 330, 420]) b += D.arrow(x - 8, 40, x + 4, 76, { stroke: C.blue, width: 2.2 });
b += lab(290, 28, "Precipitation (input): 800 mm a year", { anchor: "middle", fill: C.blue });
// evaporation and transpiration (output)
b += D.arrow(150, 100, 150, 70, { stroke: C.red, width: 2, dash: true }) + D.arrow(300, 228, 300, 150, { stroke: C.red, width: 2, dash: true });
b += lab(206, 136, "Evaporation + transpiration (output): 600 mm", { anchor: "start", size: 12, fill: C.red, dy: -14 });
// interception
b += lab(90, 104, "Interception", { anchor: "middle", size: 12 }) + D.line(130, 108, 136, 118, { stroke: C.muted, width: 1.4 });
// flows
b += D.arrow(196, 190, 196, 212, { stroke: C.blue, width: 2.4 }) + lab(196, 174, "Infiltration", { anchor: "start", size: 12 });
b += D.arrow(262, 224, 322, 247, { stroke: C.amber, width: 2.8 }) + lab(336, 232, "Overland flow", { anchor: "start", size: 12, fill: C.amber });
b += D.arrow(250, 237, 330, 270, { stroke: C.teal, width: 2.6 }) + D.line(222, 250, 252, 240, { stroke: C.muted, width: 1.3 }) + lab(130, 262, "Throughflow", { anchor: "start", size: 12, fill: C.teal });
b += D.arrow(60, 176, 60, 254, { stroke: C.blue, width: 2.4 }) + lab(68, 232, "Percolation", { anchor: "start", size: 12 });
b += D.arrow(100, WT(100) + 20, 360, WT(360) + 20, { stroke: C.blue, width: 2.6 }) + lab(120, 346, "Groundwater flow", { anchor: "start", size: 12 });
b += D.arrow(440, 300, 494, 300, { stroke: C.blue, width: 2.6 }) + lab(450, 268, "Channel flow", { anchor: "start", size: 12 });
// legend and balance
b += D.rect(20, 400, 520, 34, { fill: "#fff", stroke: C.ink, width: 1.2, r: 6 }) + D.text(280, 422, "Water balance: 800 mm = 200 mm discharge + 600 mm evapotranspiration", { anchor: "middle", size: 13.5, weight: 700 });
b += D.text(20, 454, "Brown = soil; grey = rock; blue = groundwater store below the dashed water table.", { size: 12, fill: C.muted });
const alt = "Hillside cross-section of a drainage basin: rain (800 mm a year) is intercepted by trees, infiltrates the soil, runs as overland flow or throughflow, percolates to groundwater and reaches the river as channel flow, while 600 mm is lost to evaporation and transpiration, leaving 200 mm of discharge.";
const cap = "Figure: stores and flows in a drainage basin (water balance of the fictional 800 mm basin)";
await D.figure(FAMILY, "drainage-basin-system", D.svg(560, 462, b), { alt, caption: cap });
D.insertAfter(`${L}/drainage-basin.md`, "6. Throughout, water returns to the air", D.md("drainage-basin-system", alt, cap));
console.log("basin done");
