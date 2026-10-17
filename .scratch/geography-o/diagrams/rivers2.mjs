// geography-o second pass: river diagrams. Run from repo root: node .scratch/geography-o/diagrams/rivers2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, poly, SOIL, SEA, GRASS, ROCK } from "./kit2.mjs";

// ---------- 1. How a river carries its load (rivers/processes.md)
{
  const W = 560, H = 392, bedY = 250, topY = 70;
  let b = D.rect(20, topY, 520, bedY - topY, { fill: "#e3f3f8", stroke: "none" }) + D.rect(20, bedY, 520, 142, { fill: SOIL, stroke: "none" }) + D.line(20, bedY, 540, bedY, { stroke: "#8a6a3b", width: 2.4 });
  b += D.line(20, topY, 540, topY, { stroke: C.blue, width: 1.6, dash: true });
  b += D.arrow(30, 40, 160, 40, { stroke: C.blue, width: 3 }) + D.text(170, 45, "Flow", { fill: C.blue, weight: 700 });
  // traction: big boulders on the bed
  for (const x of [285, 375]) b += D.circle(x, bedY - 18, 17, { fill: ROCK, stroke: C.axis, width: 2 }) + D.arrow(x + 22, bedY - 18, x + 56, bedY - 18, { stroke: C.axis, width: 2 });
  // saltation: pebbles hopping
  for (const x of [90, 175, 440]) b += D.path_(`M${x},${bedY - 6} C ${x + 8},${bedY - 54} ${x + 52},${bedY - 54} ${x + 60},${bedY - 6}`, { stroke: C.amber, width: 2, arrow: true }) + D.circle(x, bedY - 6, 5, { fill: C.amber, stroke: C.amber, width: 1 });
  // suspension: silt dots through the water column
  for (const [x, y] of [[300, 120], [340, 160], [420, 130], [470, 170], [160, 150], [230, 130], [510, 120], [380, 100], [270, 170]]) b += D.circle(x, y, 2.8, { fill: C.muted, stroke: C.muted, width: 1 });
  // solution: dissolved ions
  for (const [x, y] of [[190, 108], [330, 90], [450, 96], [90, 130], [480, 205]]) b += D.text(x, y, "+", { fill: C.red, size: 15, weight: 700, anchor: "middle" });
  b += lab(24, 288, "1 Traction: boulders rolled along the bed", { size: 12.5 });
  b += lab(24, 316, "2 Saltation: pebbles and coarse sand bounce", { size: 12.5 });
  b += lab(24, 344, "3 Suspension: silt and clay (grey dots)", { size: 12.5 });
  b += lab(24, 372, "4 Solution: dissolved minerals (red +)", { size: 12.5, fill: C.red });
  await fig("river-load-transport",
    D.svg(W, H, b),
    "Channel cross-section showing the four ways a river moves its load: traction rolls boulders along the bed, saltation bounces pebbles and coarse sand, suspension carries silt and clay in the water, and solution carries dissolved minerals.",
    "Figure: traction, saltation, suspension and solution in a river",
    "rivers/processes", "## The four processes of transportation").catch((e) => console.log(e.message));
}

// ---------- 2. Flood defences on a floodplain (rivers/flooding.md)
{
  const gy = 250; // floodplain surface
  let b = "";
  const ground = [[0, gy], [190, gy], [215, gy + 6], [230, gy + 46], [330, gy + 46], [345, gy + 6], [370, gy], [440, gy], [480, gy - 30], [560, gy - 30], [560, 380], [0, 380]];
  b += poly(ground, { fill: SOIL, stroke: "#8a6a3b", width: 2.2 });
  b += poly([[230, gy + 46], [330, gy + 46], [345, gy + 6], [326, gy - 26], [224, gy - 26], [215, gy + 6]], { fill: "#a9d6e5", stroke: C.blue, width: 1.6 });
  b += poly([[186, gy], [200, gy - 40], [224, gy - 40], [236, gy + 8], [215, gy + 6]], { fill: GRASS, stroke: C.green, width: 2 });
  b += poly([[364, gy], [350, gy - 40], [326, gy - 40], [314, gy + 8], [345, gy + 6]], { fill: GRASS, stroke: C.green, width: 2 });
  b += D.line(214, gy - 26, 336, gy - 26, { stroke: C.red, width: 1.8, dash: true });
  b += D.text(280, gy + 36, "River", { anchor: "middle", size: 13, fill: C.blue, weight: 600 });
  b += D.text(100, gy + 36, "Floodplain zone:", { anchor: "middle", size: 13 }) + D.text(100, gy + 54, "grazing, park", { anchor: "middle", size: 13 });
  for (let i = 0; i < 3; i++) b += D.line(60 + i * 40, gy, 60 + i * 40, gy - 14, { stroke: C.green, width: 2 }) + D.circle(60 + i * 40, gy - 18, 5, { fill: C.fillGreen, stroke: C.green, width: 1.4 });
  for (const x of [494, 528]) b += poly([[x, gy - 30], [x + 26, gy - 30], [x + 26, gy - 52], [x + 13, gy - 64], [x, gy - 52]], { fill: "#ffffff", stroke: C.axis, width: 1.8 });
  b += lab(556, gy - 84, "Homes on higher ground", { size: 12.5, anchor: "end" });
  b += lab(190, 128, "Levée", { size: 13, anchor: "end" }) + D.line(180, 134, 205, gy - 42, { stroke: C.muted, width: 1.2 });
  b += lab(372, 128, "Levée", { size: 13 }) + D.line(382, 134, 342, gy - 42, { stroke: C.muted, width: 1.2 });
  b += lab(280, 128, "Flood level", { size: 13, anchor: "middle", fill: C.red }) + D.line(280, 134, 280, gy - 28, { stroke: C.red, width: 1.2 });
  b += D.text(280, 342, "Hard engineering: levées. Soft engineering: floodplain zoning (no homes on the floodplain).", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("flood-defences-levee-zoning",
    D.svg(560, 356, b),
    "Cross-section of a river and its floodplain: levées raise both banks so the channel holds the flood level, the floodplain is zoned for grazing and parkland, and homes are built on higher ground away from the river.",
    "Figure: levées (hard engineering) and floodplain zoning (soft engineering)",
    "rivers/flooding", "### Soft engineering").catch((e) => console.log(e.message));
}

// ---------- 3. Eutrophication step by step (rivers/pollution.md)
{
  const steps = [
    "1  Fertiliser and sewage add nitrates and phosphates",
    "2  Algal bloom: algae and water weeds grow fast",
    "3  Surface layer blocks sunlight; plants below die",
    "4  Bacteria decompose dead plants and use up oxygen",
    "5  Oxygen is too low: fish and other animals die",
  ];
  const fills = [C.fillAmber, C.fillGreen, C.fillGrey, C.fillBlue, "#f3b4ad"];
  let b = "";
  steps.forEach((s, i) => {
    const y = 12 + i * 70;
    b += D.node(30, y, 500, 46, s, { fill: fills[i], size: 14.5 });
    if (i < steps.length - 1) b += D.arrow(280, y + 48, 280, y + 68, { stroke: C.ink, width: 2 });
  });
  await fig("eutrophication-steps",
    D.svg(560, 362, b),
    "Eutrophication in five steps: fertiliser or sewage adds nitrates and phosphates, algae bloom, the surface layer blocks sunlight, bacteria decomposing the dead plants use up the oxygen, and fish die.",
    "Figure: the chain of eutrophication in a river or dam",
    "rivers/pollution", "### On ecosystems: eutrophication step by step").catch((e) => console.log(e.message));
}
