// biology-a cell structure: animal cell, bacterium, mitochondrion + chloroplast, fluid-mosaic membrane, beetroot graph.
// Run: node .scratch/biology-a/diagrams/cells.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig, curve } from "./_h.mjs";

/** Label at the left (x=8, anchor start) or right (x=w-8, anchor end) margin with a leader to (px, py). */
const lab = (w, side, y, s, px, py) => {
  const x = side === "L" ? 8 : w - 8;
  const lines = s.split("\n").length;
  const midY = y - 4 + ((lines - 1) * 13 * 1.25) / 2;
  const lx = side === "L" ? x + Math.max(...s.split("\n").map((l) => l.length)) * 6.9 + 3 : x - Math.max(...s.split("\n").map((l) => l.length)) * 6.9 - 3;
  return D.line(lx, midY, px, py, { stroke: C.muted, width: 1.2 }) + D.text(x, y, s, { anchor: side === "L" ? "start" : "end", size: 13 });
};

// ---- Animal cell ultrastructure (labelled)
{
  const w = 640, h = 470, cx = 320, cy = 235;
  let b = ellipse(cx, cy, 205, 190, { fill: "#fdfbf7", width: 3 });
  // nucleus: double envelope, nucleolus, pores as gaps
  b += D.circle(285, 215, 72, { fill: C.fillBlue, width: 2 }) + D.circle(285, 215, 66, { stroke: C.blue, width: 1.5 }) + D.dot(285, 215, { r: 20, stroke: C.blue, fill: C.blue });
  for (const a of [20, 80, 140, 200, 260, 320]) { const r = (a * Math.PI) / 180; b += D.line(285 + 66 * Math.cos(r), 215 + 66 * Math.sin(r), 285 + 72 * Math.cos(r), 215 + 72 * Math.sin(r), { stroke: "#fff", width: 3 }); }
  // rough ER: stacked sheets with ribosome dots, round the nucleus (lower left)
  const rer = (dy) => D.path_(`M${210},${300 + dy} C${240},${288 + dy} ${280},${312 + dy} ${330},${296 + dy}`, { stroke: C.teal, width: 2.5 });
  b += rer(0) + rer(14) + rer(28);
  for (let i = 0; i < 9; i += 1) b += D.dot(218 + i * 13, 293 + (i % 2) * 9 + (i > 4 ? 2 : 0), { r: 2, stroke: C.ink });
  // Golgi: stack of curved cisternae
  for (let i = 0; i < 4; i += 1) b += D.path_(`M${400},${150 + i * 10} Q${440},${140 + i * 10} ${480},${150 + i * 10}`, { stroke: C.amber, width: 3 });
  b += D.circle(492, 142, 6, { fill: C.fillAmber, stroke: C.amber, width: 1.5 }) + D.circle(405, 188, 5, { fill: C.fillAmber, stroke: C.amber, width: 1.5 });
  // mitochondria with cristae
  const mito = (x, y, rot) => `<g transform="rotate(${rot} ${x} ${y})">` + ellipse(x, y, 36, 16, { fill: C.fillGreen, stroke: C.green }) + D.path_(`M${x - 28},${y} L${x - 22},${y - 10} L${x - 16},${y + 10} L${x - 8},${y - 10} L${x},${y + 10} L${x + 8},${y - 10} L${x + 16},${y + 10} L${x + 24},${y}`, { stroke: C.green, width: 1.5 }) + "</g>";
  b += mito(185, 130, -25) + mito(430, 330, 15) + mito(200, 380, 0);
  // lysosome, centrioles, SER, ribosomes, vacuole-like vesicles
  b += D.circle(470, 235, 14, { fill: C.fillAmber, stroke: C.amber, width: 2 });
  b += D.rect(370, 395, 28, 11, { fill: C.fillGrey, stroke: C.ink, width: 1.5 }) + D.rect(386, 380, 11, 28, { fill: C.fillGrey, stroke: C.ink, width: 1.5 });
  b += D.path_("M340,350 C350,335 360,365 372,350 C384,335 392,365 404,350", { stroke: C.purple, width: 2.5 });
  for (const [x, y] of [[170, 245], [155, 275], [260, 120], [350, 110], [385, 270], [430, 280], [235, 350]]) b += D.dot(x, y, { r: 2.4 });
  // labels
  b += lab(w, "L", 40, "Cell surface\nmembrane", 150, 105);
  b += lab(w, "L", 100, "Mitochondrion", 160, 125).replace("", "");
  b += lab(w, "L", 170, "Nucleus\n(double envelope,\nnuclear pores)", 213, 205);
  b += lab(w, "L", 280, "Free ribosomes\n(80S)", 168, 247);
  b += lab(w, "L", 335, "Rough ER\n(ribosomes\non the sheets)", 215, 316);
  b += lab(w, "L", 420, "Mitochondrion\n(cristae)", 175, 383);
  b += lab(w, "R", 50, "Golgi body\n(stack of\ncisternae)", 470, 142);
  b += lab(w, "R", 270, "Lysosome\n(hydrolytic\nenzymes)", 482, 238);
  b += lab(w, "R", 345, "Smooth ER", 404, 350);
  b += lab(w, "R", 425, "Centrioles", 398, 400);
  b += lab(w, "R", 190, "Nucleolus", 303, 210).replace("", "");
  const alt = "Labelled animal cell as seen with an electron microscope: the nucleus has a double envelope with pores and a dark nucleolus; rough ER with ribosomes lies near the nucleus, a Golgi stack and lysosome sit towards the cell surface membrane, mitochondria have folded cristae, and centrioles and free 80S ribosomes lie in the cytoplasm.";
  const cap = "Figure: a generalised animal cell showing the organelles named in the lesson";
  await fig("animal-cell-ultrastructure", D.svg(w, h, b), alt, cap, "cells/eukaryotic-ultrastructure", "## Organelles with a double membrane".replace("## ", "## "));
}
