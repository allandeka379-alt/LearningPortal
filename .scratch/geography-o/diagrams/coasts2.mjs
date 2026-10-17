// geography-o second pass: coast diagrams. Run from repo root: node .scratch/geography-o/diagrams/coasts2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, figBefore, poly, SOIL, SEA, SAND, GRASS, ROCK } from "./kit2.mjs";

// ---------- 1. Wave refraction at a headland (coasts/processes.md)
{
  const W = 560, H = 400;
  let b = D.rect(0, 0, W, 300, { fill: "#e3f3f8", stroke: "none" });
  b += poly([[0, 300], [190, 300], [215, 244], [248, 218], [312, 218], [345, 244], [370, 300], [560, 300], [560, 400], [0, 400]], { fill: SAND, stroke: C.amber, width: 2.2 });
  // wave fronts: straight in deep water, lagging over the shallow water off the headland
  const g = (x) => Math.exp(-(((x - 280) / 62) ** 2)); // 1 at the headland, 0 in the bays
  const fronts = [[28, 0], [76, 0], [124, 8], [172, 22], [208, 42]]; // [base y, extra advance in the bays]
  for (const [y0, adv] of fronts) {
    let d = "";
    for (let x = 14; x <= 546; x += 8) d += `${x === 14 ? "M" : "L"}${x},${y0 + adv * (1 - g(x))} `;
    b += D.path_(d.trim(), { stroke: C.blue, width: 2.2 });
  }
  b += D.text(20, 22, "Deep water: waves fast, fronts straight", { size: 12.5, fill: C.blue, weight: 600 });
  b += D.text(280, 276, "HEADLAND", { anchor: "middle", size: 12.5, weight: 700 }) + D.text(90, 284, "BAY", { anchor: "middle", size: 12.5, weight: 700 }) + D.text(470, 284, "BAY", { anchor: "middle", size: 12.5, weight: 700 });
  // energy arrows converge on the headland, spread in the bays
  b += D.arrow(210, 150, 240, 206, { stroke: C.red, width: 2.4 }) + D.arrow(350, 150, 320, 206, { stroke: C.red, width: 2.4 }) + D.arrow(280, 150, 280, 208, { stroke: C.red, width: 2.4 });
  b += D.arrow(60, 160, 52, 250, { stroke: C.muted, width: 1.6 }) + D.arrow(100, 160, 100, 250, { stroke: C.muted, width: 1.6 }) + D.arrow(480, 160, 490, 250, { stroke: C.muted, width: 1.6 }) + D.arrow(520, 160, 520, 250, { stroke: C.muted, width: 1.6 });
  b += lab(280, 336, "Headland: shallow, waves slowed, energy concentrated: erosion", { anchor: "middle", size: 12.5, fill: C.red });
  b += lab(280, 366, "Bays: deeper, energy spread out, low waves: deposition and beaches", { anchor: "middle", size: 12.5 });
  await fig("wave-refraction-headland",
    D.svg(W, H, b),
    "Plan view of wave refraction: waves slow in the shallow water off a headland and bend round it, so energy is concentrated on the headland, causing erosion, and spread out in the bays, where sand is deposited.",
    "Figure: wave refraction at a headland between two bays",
    "coasts/processes", "In the bays, wave");
}

// ---------- 2. Longshore drift (coasts/processes.md): 36 m in 6 minutes = 6 m a minute in the lesson's example
{
  const W = 560, H = 360, shore = 230;
  let b = D.rect(0, 0, W, shore, { fill: "#e3f3f8", stroke: "none" }) + D.rect(0, shore, W, 40, { fill: SAND, stroke: "none" }) + D.rect(0, shore + 40, W, H - shore - 40, { fill: GRASS, stroke: "none" }) + D.line(0, shore, W, shore, { stroke: C.amber, width: 2.4 });
  b += D.text(12, shore + 26, "Beach", { size: 13 }) + D.text(12, shore + 70, "Land", { size: 13 });
  const ux = 0.86, uy = -0.5; // wave fronts rise to the right (the waves come from the upper left)
  for (const y of [190, 130, 70]) b += D.line(20, y, 20 + 230 * ux, y + 230 * uy, { stroke: C.blue, width: 2.2 });
  b += D.arrow(70, 20, 110, 88, { stroke: C.blue, width: 3 }) + D.text(120, 30, "Prevailing wind", { size: 13, fill: C.blue, weight: 600 }) + D.text(120, 47, "and waves", { size: 13, fill: C.blue, weight: 600 });
  // zigzag path of a pebble: swash up the beach at an angle, backwash straight back
  const sx = 62; // horizontal gain per swash
  let x = 300, path = "", sw = "";
  for (let i = 0; i < 4; i++) {
    sw += D.arrow(x, shore - 40, x + sx, shore - 4, { stroke: C.amber, width: 2.4 });
    sw += D.arrow(x + sx, shore - 4, x + sx, shore - 40, { stroke: C.muted, width: 2, dash: true });
    x += sx;
  }
  b += sw;
  b += D.dot(300, shore - 40, { stroke: C.red, r: 5 });
  b += lab(290, shore - 90, "Swash: up the beach at an angle", { size: 12.5, fill: C.amber }) + lab(290, shore - 126, "Backwash: straight down the slope", { size: 12.5 });
  b += D.arrow(300, shore + 80, 300 + 4 * sx, shore + 80, { stroke: C.red, width: 3 }) + lab(430, shore + 110, "Net movement along the coast", { anchor: "middle", size: 13, fill: C.red });
  await fig("longshore-drift-plan",
    D.svg(W, H, b),
    "Plan view of longshore drift: waves arrive at an angle to the beach, swash carries sand and pebbles up the beach at that angle, backwash returns straight down the slope, so each wave moves the material a little further along the coast in a zigzag.",
    "Figure: longshore drift on a beach (plan view)",
    "coasts/processes", "5. Over time large amounts of sediment move along the coast");
}

// ---------- 3. Groynes trap sand (coasts/management.md)
{
  const W = 560, H = 330, shore = 170;
  let b = D.rect(0, 0, W, 250, { fill: "#e3f3f8", stroke: "none" }) + D.rect(0, 250, W, 80, { fill: GRASS, stroke: "none" });
  b += D.arrow(40, 40, 520, 40, { stroke: C.red, width: 3 }) + D.text(280, 28, "Longshore drift", { anchor: "middle", fill: C.red, weight: 700 });
  const gx = [130, 270, 410];
  // beach narrows to the right of each groyne (down-drift): sand piles on the up-drift (left) side
  let beach = [[0, 250], [0, 168]];
  for (const x of gx) { beach.push([x - 70, 168], [x - 2, 150], [x - 2, 250]); }
  // draw the beach as separate wedges
  for (const x of gx) b += poly([[x - 100, 250], [x - 100, 200], [x - 2, 150], [x - 2, 250]], { fill: SAND, stroke: "none" });
  b += poly([[gx[2] + 2, 250], [gx[2] + 2, 214], [W, 226], [W, 250]], { fill: SAND, stroke: "none" });
  b += D.rect(0, 250, W, 3, { fill: "#8a6a3b", stroke: "none" });
  for (const x of gx) b += D.rect(x - 3, 140, 6, 112, { fill: "#8a6a3b", stroke: "#5c4526", width: 1 });
  b += D.text(gx[0], 128, "Groyne", { anchor: "middle", size: 13, weight: 600 });
  b += lab(150, 232, "Sand trapped: beach builds up", { anchor: "middle", size: 12.5 });
  b += lab(554, 196, "Narrow beach:", { anchor: "end", size: 12.5, fill: C.red }) + lab(554, 218, "erosion down-drift", { anchor: "end", size: 12.5, fill: C.red });
  b += D.text(280, 312, "Groynes trap sand moved by longshore drift but starve beaches further along the coast.", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("groynes-trap-sand",
    D.svg(W, H, b),
    "Plan view of groynes built at right angles to a beach: sand carried by longshore drift piles up against the up-drift side of each groyne, widening the beach there, while the beach beyond the last groyne is starved of sand and erodes.",
    "Figure: how groynes trap sand and starve the beach down-drift",
    "coasts/management", "### Hard engineering");
}

// ---------- 4. Coral reef types (coasts/coral-mangroves.md)
{
  const W = 560, H = 300, seaY = 130;
  let b = "";
  const col = (ox, title) => D.text(ox + 88, 22, title, { anchor: "middle", weight: 700, size: 14 }) + D.rect(ox, 30, 176, 250, { stroke: C.grid, width: 1.5 }) + D.rect(ox + 1, seaY, 174, 149, { fill: "#cfeaf3", stroke: "none" }) + D.line(ox + 1, seaY, ox + 175, seaY, { stroke: C.blue, width: 1.4, dash: true });
  const reef = (x, y, w, h) => D.rect(x, y, w, h, { fill: "#f6c691", stroke: C.amber, width: 1.6, r: 4 });
  const land = (pts) => poly(pts, { fill: SOIL, stroke: "#8a6a3b", width: 2 });
  {
    const ox = 4; b += col(ox, "Fringing reef");
    b += land([[ox + 1, 60], [ox + 70, 70], [ox + 92, 150], [ox + 100, 279], [ox + 1, 279]]) + reef(ox + 90, seaY - 6, 18, 36);
    b += D.text(ox + 130, 200, "reef joins", { size: 12.5, anchor: "middle" }) + D.text(ox + 130, 216, "the shore", { size: 12.5, anchor: "middle" });
  }
  {
    const ox = 190; b += col(ox, "Barrier reef");
    b += land([[ox + 1, 60], [ox + 40, 70], [ox + 56, 150], [ox + 62, 279], [ox + 1, 279]]) + reef(ox + 120, seaY - 6, 22, 36);
    b += D.text(ox + 96, 190, "lagoon", { size: 12.5, anchor: "middle", weight: 600 }) + D.text(ox + 96, 206, "(shallow water)", { size: 12.5, anchor: "middle" });
    b += D.text(ox + 131, seaY + 58, "reef", { size: 12.5, anchor: "middle" });
  }
  {
    const ox = 376; b += col(ox, "Atoll");
    b += reef(ox + 14, seaY - 6, 22, 36) + reef(ox + 138, seaY - 6, 22, 36);
    b += D.text(ox + 88, 190, "lagoon", { size: 12.5, anchor: "middle", weight: 600 }) + D.text(ox + 88, 206, "(no land inside)", { size: 12.5, anchor: "middle" });
    b += D.text(ox + 88, 250, "ring of reef", { size: 12.5, anchor: "middle" });
    b += D.path_(`M${ox + 100},${seaY + 160} C ${ox + 80},${seaY + 160} ${ox + 60},${seaY + 160} ${ox + 40},${seaY + 160}`, { stroke: "none" });
  }
  b += D.text(280, 296, "Side views. Dashed line: sea level. Reef-building corals live in warm, shallow, clear water.", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("coral-reef-types",
    D.svg(W, 306, b),
    "Side views of the three coral reef types: a fringing reef grows close to the shore, a barrier reef is separated from the land by a lagoon, and an atoll is a ring of reef around a lagoon with no land in the middle.",
    "Figure: fringing reef, barrier reef and atoll",
    "coasts/coral-mangroves", "There are three main types");
}

// ---------- 5. Mangrove adaptations (coasts/coral-mangroves.md)
{
  const W = 560, H = 360, mud = 230, tide = 190;
  let b = D.rect(0, tide, W, mud - tide, { fill: "#cfeaf3", stroke: "none" }) + D.rect(0, mud, W, H - mud, { fill: "#cbb08a", stroke: "none" }) + D.line(0, mud, W, mud, { stroke: "#8a6a3b", width: 2 }) + D.line(0, tide, W, tide, { stroke: C.blue, width: 1.4, dash: true });
  b += D.text(540, tide - 6, "High tide", { anchor: "end", size: 12.5, fill: C.blue });
  // trunk and crown
  b += D.rect(270, 110, 18, 80, { fill: "#8a6a3b", stroke: "#5c4526", width: 1.4 }) + D.circle(279, 80, 52, { fill: "#8fc58a", stroke: C.green, width: 2 });
  // prop (stilt) roots
  for (const [x2, x1] of [[200, 272], [240, 276], [320, 282], [360, 286]]) b += D.path_(`M${x1},${tide - 14} Q ${(x1 + x2) / 2},${tide + 10} ${x2},${mud + 26}`, { stroke: "#8a6a3b", width: 3.4 });
  // pneumatophores (breathing roots)
  for (const x of [120, 150, 410, 440, 480]) b += D.line(x, mud + 8, x, mud - 30, { stroke: "#5c4526", width: 4 });
  // seedling hanging from a branch
  b += D.line(320, 110, 330, 150, { stroke: C.green, width: 3 }) + D.circle(331, 154, 4, { fill: C.green, stroke: C.green, width: 1 });
  b += lab(24, 38, "Salt tolerance: roots filter salt,", { size: 12.5 }) + lab(24, 64, "leaves excrete it", { size: 12.5 }) + D.line(120, 66, 232, 80, { stroke: C.muted, width: 1.2 });
  b += lab(336, 44, "Seedling grows on the parent,", { size: 12.5 }) + lab(336, 70, "then drops into the mud", { size: 12.5 }) + D.line(418, 76, 336, 150, { stroke: C.muted, width: 1.2 });
  b += lab(24, 300, "Breathing roots (pneumatophores)", { size: 12.5 }) + D.line(100, 282, 120, 246, { stroke: C.muted, width: 1.2 });
  b += lab(300, 300, "Prop (stilt) roots anchor the tree", { size: 12.5 }) + D.line(340, 282, 322, 258, { stroke: C.muted, width: 1.2 });
  b += D.text(24, 336, "Waterlogged mud has little oxygen: breathing roots reach the air.", { size: 12.5 });
  await fig("mangrove-adaptations",
    D.svg(W, H, b),
    "Mangrove tree in tidal mud: prop (stilt) roots anchor it in soft mud, breathing roots (pneumatophores) stick up out of the waterlogged mud to take in air, the tree tolerates salt, and seedlings grow while still attached to the parent.",
    "Figure: how a mangrove tree is adapted to salty, waterlogged mud",
    "coasts/coral-mangroves", "- **Seedlings** grow while still attached");
}
