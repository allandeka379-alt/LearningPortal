// biology-a: bacterium, mitochondrion + chloroplast, fluid-mosaic membrane, beetroot graph. Run: node .scratch/biology-a/diagrams/cells-b.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig, curve } from "./_h.mjs";

const lead = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2 });
const t = (x, y, s, a = "start", o = {}) => D.text(x, y, s, { anchor: a, size: 13, ...o });

// ---- Typical bacterium
{
  const w = 640, h = 395;
  let b = "";
  b += D.rect(130, 80, 380, 190, { fill: "#fdfbf7", stroke: C.muted, width: 2, r: 95, dash: true }); // capsule
  b += D.rect(150, 100, 340, 150, { fill: "#fff", stroke: C.amber, width: 3.5, r: 75 }); // cell wall
  b += D.rect(162, 112, 316, 126, { fill: C.fillBlue, stroke: C.blue, width: 2, r: 63 }); // cell surface membrane
  b += ellipse(300, 175, 66, 28, { stroke: C.purple, width: 3 }) + ellipse(300, 175, 50, 19, { stroke: C.purple, width: 1.5, dash: true });
  b += D.circle(410, 190, 12, { stroke: C.purple, width: 2.5 }) + D.circle(215, 200, 11, { stroke: C.purple, width: 2.5 });
  for (const [x, y] of [[200, 140], [240, 128], [375, 135], [430, 150], [440, 205], [350, 218], [265, 220], [325, 125], [195, 175]]) b += D.dot(x, y, { r: 3 });
  b += D.path_("M510,175 C535,150 555,200 580,175 C600,155 612,185 628,168", { stroke: C.ink, width: 3 }); // flagellum
  for (const [x, y, dx, dy] of [[236, 270, -4, 24], [300, 270, 0, 26], [368, 270, 4, 24], [160, 90, -20, -14], [140, 215, -26, 8]]) b += D.line(x, y, x + dx, y + dy, { width: 1.6 });
  // labels
  b += t(10, 30, "Capsule (slime layer)") + lead(95, 36, 220, 82);
  b += t(300, 22, "Cell wall (peptidoglycan)", "middle") + lead(330, 28, 330, 100);
  b += t(630, 22, "Cell surface membrane", "end") + lead(560, 28, 440, 112);
  b += t(630, 95, "Plasmid (small\ncircular DNA)", "end") + lead(560, 112, 421, 184);
  b += t(630, 255, "Flagellum", "end") + lead(590, 240, 566, 188);
  b += t(630, 305, "Ribosomes (70S)", "end") + lead(540, 300, 442, 208);
  b += t(300, 378, "Circular DNA lying free (nucleoid): no nuclear envelope", "middle") + lead(300, 362, 300, 204);
  b += t(10, 312, "Pili (short, on the surface)") + lead(60, 298, 236, 275);
  const alt = "Labelled bacterium: a capsule and a peptidoglycan cell wall lie outside the cell surface membrane; inside, circular DNA lies free in the cytoplasm with no nuclear envelope, with small plasmid rings, 70S ribosomes and no membrane-bound organelles; pili and a flagellum project from the surface.";
  const cap = "Figure: structure of a typical bacterium (a prokaryote), about 1 to 5 micrometres long";
  await fig("bacterium-structure", D.svg(w, h, b), alt, cap, "cells/prokaryotes-viruses", "## Structure of a typical bacterium");
}

// ---- Mitochondrion and chloroplast
{
  const w = 640, h = 380;
  let b = "";
  const mx = 160, my = 150;
  b += D.text(mx, 24, "Mitochondrion (1-5 µm long)", { anchor: "middle", size: 14, weight: 700 });
  b += ellipse(mx, my, 130, 70, { fill: C.fillGreen, stroke: C.green, width: 3 }) + ellipse(mx, my, 118, 58, { stroke: C.green, width: 1.8 });
  const inner = (x) => 58 * Math.sqrt(1 - ((x - mx) / 118) ** 2);
  [-72, -42, -12, 18, 48, 78].forEach((dx, i) => {
    const x = mx + dx, up = i % 2 === 0, y0 = my + (up ? -1 : 1) * inner(x), len = 38 * (up ? 1 : -1);
    b += D.path_(`M${x - 7},${y0} L${x - 7},${y0 + len} Q${x},${y0 + len + (up ? 9 : -9)} ${x + 7},${y0 + len} L${x + 7},${y0}`, { stroke: C.green, width: 1.8, fill: "#fff" });
  });
  b += t(10, 262, "Outer membrane") + lead(120, 258, 160, 212);
  b += t(10, 292, "Inner membrane, folded\ninto cristae") + lead(155, 288, 180, 190);
  b += t(10, 52, "Matrix: Krebs cycle enzymes,\ncircular DNA, 70S ribosomes") + lead(120, 74, 190, 125);
  // chloroplast
  const cx = 480, cy = 150;
  b += D.text(cx, 24, "Chloroplast (3-10 µm long)", { anchor: "middle", size: 14, weight: 700 });
  b += ellipse(cx, cy, 124, 72, { fill: C.fillGreen, stroke: C.green, width: 3 }) + ellipse(cx, cy, 114, 62, { stroke: C.green, width: 1.5 });
  for (const gx of [432, 480, 528]) for (let i = 0; i < 4; i += 1) b += D.rect(gx - 17, 126 + i * 12, 34, 8, { fill: "#2e8b57", stroke: C.green, width: 1, r: 4 });
  b += D.line(449, 138, 463, 138, { stroke: C.green, width: 1.5 }) + D.line(497, 138, 511, 138, { stroke: C.green, width: 1.5 });
  b += t(630, 262, "Double envelope", "end") + lead(595, 258, 548, 211);
  b += t(630, 292, "Granum: stack of thylakoids\n(chlorophyll, light-dependent stage)", "end") + lead(520, 285, 528, 172);
  b += t(398, 335, "Stroma: Calvin cycle enzymes,\nstarch grain, DNA, 70S ribosomes", "start") + lead(392, 331, 420, 190);
  const alt = "Two double-membrane organelles side by side: a mitochondrion with a smooth outer membrane, an inner membrane folded into cristae and a matrix holding Krebs cycle enzymes, and a chloroplast whose thylakoids are stacked in grana inside a stroma where the Calvin cycle occurs.";
  const cap = "Figure: mitochondrion and chloroplast, each with a double membrane and its own 70S ribosomes and circular DNA";
  await fig("mitochondrion-chloroplast-structure", D.svg(w, h, b), alt, cap, "cells/eukaryotic-ultrastructure", "### Chloroplasts");
}

// ---- Fluid-mosaic membrane
{
  const w = 640, h = 400;
  let b = "";
  const yo = 150, yi = 240; // head centres, outer and inner leaflet
  const lipid = (x, outer) => {
    const yh = outer ? yo : yi, d = outer ? 1 : -1;
    return D.circle(x, yh, 8, { fill: C.fillAmber, stroke: C.amber, width: 1.5 }) + D.line(x - 3, yh + d * 8, x - 4, yh + d * 40, { width: 1.5 }) + D.line(x + 3, yh + d * 8, x + 4, yh + d * 40, { width: 1.5 });
  };
  const prots = [[110, 160], [290, 332], [430, 496]]; // x ranges covered by membrane proteins
  for (let x = 40; x <= 550; x += 20) if (!prots.some(([a, z]) => x > a - 12 && x < z + 12)) b += lipid(x, true) + lipid(x, false);
  b += D.rect(112, 138, 46, 114, { fill: C.fillBlue, stroke: C.blue, width: 2, r: 8 }); // glycoprotein (integral)
  b += D.rect(292, 138, 38, 114, { fill: C.fillBlue, stroke: C.blue, width: 2, r: 6 }) + D.rect(303, 138, 16, 114, { fill: "#fff", stroke: C.blue, width: 1 }); // channel
  b += D.rect(432, 136, 62, 118, { fill: C.fillBlue, stroke: C.blue, width: 2, r: 22 }) + D.path_("M446,136 Q470,170 446,205", { stroke: C.blue, width: 1.5 }); // carrier
  for (const x of [210, 530]) b += D.rect(x - 4, 172, 8, 44, { fill: C.fillGrey, stroke: C.red, width: 1.5, r: 3 }); // cholesterol
  const chain = (x, y0, n) => { let s = D.line(x, y0, x, y0 - 22, { stroke: C.green, width: 2 }); for (let i = 0; i < n; i += 1) s += D.circle(x + (i % 2 ? 6 : -6), y0 - 24 - i * 8, 4.5, { fill: C.fillGreen, stroke: C.green, width: 1.2 }); return s; };
  b += chain(135, 138, 3) + chain(80, 142, 2) + chain(530, 142, 2);
  b += ellipse(250, 130, 28, 13, { fill: C.fillGrey, stroke: C.purple, width: 2 }) + ellipse(380, 268, 30, 14, { fill: C.fillGrey, stroke: C.purple, width: 2 });
  b += D.text(10, 20, "Outside of cell", { size: 14, weight: 700 }) + D.text(10, 392, "Inside of cell (cytoplasm)", { size: 14, weight: 700 });
  b += t(10, 52, "Glycolipid") + lead(40, 58, 80, 114);
  b += t(110, 52, "Glycoprotein") + lead(150, 58, 135, 104);
  b += t(215, 52, "Extrinsic protein", "start") + lead(250, 58, 250, 117);
  b += t(345, 52, "Channel protein") + lead(380, 58, 320, 150);
  b += t(470, 52, "Carrier protein") + lead(510, 58, 470, 140);
  b += t(210, 330, "Cholesterol (between the\nphospholipid tails)", "middle") + lead(210, 314, 210, 216);
  b += t(425, 316, "Extrinsic protein on the inner surface") + lead(400, 300, 380, 280);
  b += D.line(626, yo, 626, yi, { stroke: C.ink, width: 1.4, arrow: true, arrowStart: true }) + t(618, 200, "7-10 nm", "end");
  b += t(632, 372, "Hydrophilic heads face the water; hydrophobic tails face each other", "end", { fill: C.muted, size: 12 });
  const alt = "Fluid-mosaic model: a phospholipid bilayer with hydrophilic heads facing the watery outside and inside and hydrophobic tails in the middle, with cholesterol between the tails, a channel protein and a carrier protein spanning the bilayer, extrinsic proteins on the surfaces, and glycoproteins and glycolipids carrying carbohydrate chains on the outer surface.";
  const cap = "Figure: the fluid-mosaic model of the cell surface membrane";
  await fig("fluid-mosaic-membrane", D.svg(w, h, b), alt, cap, "membranes/fluid-mosaic", "## The components and their roles");
}
