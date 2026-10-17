// agriculture-o farm layout and structures. Run: node .scratch/agriculture-o/diagrams/farm.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);

// ---------------------------------------------------------------- farm layout (800 m x 500 m = 40 ha)
{
  const farmW = 800, farmH = 500;
  const farmHa = (farmW * farmH) / 10000;
  const block = { x: 10, y: 125, w: 500, h: 300 };
  const blockHa = (block.w * block.h) / 10000;
  const fieldHa = blockHa / 4;
  const wood = { x: 0, y: 0, w: 300, h: 100 };
  const woodHa = (wood.w * wood.h) / 10000;
  if (farmHa !== 40 || blockHa !== 15 || fieldHa !== 3.75 || woodHa !== 3) throw new Error("farm areas");
  const W = 660, H = 470, k = 0.72, ox = 34, oy = 56;
  const X = (m) => ox + m * k, Y = (m) => oy + m * k;
  let b = "";
  b += D.rect(X(0), Y(0), farmW * k, farmH * k, { fill: "#f8f4e8", stroke: C.axis, width: 2.4 });
  const area = (x, y, w, h, fill, label, o = {}) => D.rect(X(x), Y(y), w * k, h * k, { fill, stroke: C.axis, width: 1.4 }) + D.text(X(x) + (w * k) / 2, Y(y) + (h * k) / 2 - ((label.split("\n").length - 1) * 8) + 5, label, { size: o.size ?? 12, anchor: "middle" });
  b += area(wood.x, wood.y, wood.w, wood.h, "#cfe6c4", `Woodlot ${woodHa} ha`);
  // four arable fields
  const fw = block.w / 2, fh = block.h / 2;
  ["A", "B", "C", "D"].forEach((f, i) => { b += area(block.x + (i % 2) * fw, block.y + Math.floor(i / 2) * fh, fw, fh, "#fbe8c4", `Field ${f}\n${fieldHa} ha`, { size: 13 }); });
  b += D.text(X(block.x + block.w / 2), Y(block.y) - 6, `Arable block 500 m x 300 m = ${blockHa} ha`, { size: 12, anchor: "middle", weight: 700 });
  b += area(620, 130, 140, 80, "#e8e2d4", "Homestead\nand stores");
  b += area(530, 130, 70, 80, "#e8e2d4", "Pigs and\npoultry", { size: 12 });
  b += area(600, 250, 160, 90, "#d6efdc", "Garden and\norchard");
  b += D.circle(X(625), Y(322), 5, { fill: C.blue, stroke: C.blue }) + D.text(X(625) + 9, Y(322) + 5, "borehole", { size: 12, fill: C.blue });
  // paddocks along the bottom
  for (let i = 0; i < 4; i += 1) b += area(i * 150, 435, 150, 35, "#e3f0d3", `Paddock ${i + 1}`);
  // stream and vlei
  b += D.polyline([[X(0), Y(480)], [X(200), Y(476)], [X(420), Y(482)], [X(640), Y(477)], [X(800), Y(481)]], { stroke: C.blue, width: 4 });
  b += D.text(X(300), Y(497), "Stream and vlei, fenced off", { size: 12, fill: C.blue, anchor: "middle" });
  // road on the east boundary
  b += D.line(X(800) + 8, Y(0), X(800) + 8, Y(farmH), { stroke: C.ink, width: 5 });
  b += D.text(X(800) + 20, Y(250), "Main road (east boundary)", { size: 12, rotate: 90 });
  // north arrow, wind
  b += D.arrow(X(700), Y(-8) + 4, X(700), Y(-8) - 30, { width: 2.2 }) + D.text(X(700) + 8, Y(-8) - 14, "N", { size: 15, weight: 700 });
  b += D.arrow(X(520), Y(-8) - 12, X(380), Y(-8) - 12, { stroke: C.amber, width: 2 }) + D.text(X(380), Y(-8) - 22, "prevailing wind from the east", { size: 12, fill: C.amber });
  b += D.text(10, 450, "Slope: from the ridge in the north down to the stream in the south. Scale: the farm is 800 m by 500 m = 40 ha.", { size: 12, fill: C.muted });
  b += D.text(10, 466, "Pigs and poultry are west of the house, so smells blow away from it.", { size: 12, fill: C.muted });
  const alt = "Plan of Farai's 40 ha farm (800 m by 500 m): a 3 ha woodlot on the northern ridge, four arable fields of 3.75 ha forming a 15 ha block, the homestead beside the main road on the east boundary with the pig and poultry houses to its west (downwind), the garden and orchard near the borehole, four paddocks on the lower slope and a fenced stream and vlei on the south boundary.";
  const cap = "Figure: a farm layout for the 40 ha plot, with the arable block divided into four fields of 3.75 ha";
  await D.figure(FAMILY, "farm-layout-plan-40ha", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/land/farm-planning.md`, "On a sketch, each area would be drawn roughly to scale", D.md("farm-layout-plan-40ha", alt, cap));
}
console.log("farm done");
