// biology-a cell division: DNA content through the cell cycle, mitosis stages, meiosis stages.
// Run: node .scratch/biology-a/diagrams/division.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

/** A chromosome centred at (x,y), length len, rotated rot degrees; dbl = two sister chromatids. */
const chrom = (x, y, len, rot, col, dbl = true) => {
  const g = (inner) => `<g transform="translate(${x} ${y}) rotate(${rot})">${inner}</g>`;
  if (!dbl) return g(D.rect(-2.6, -len / 2, 5.2, len, { fill: col, stroke: col, width: 1, r: 2.5 }) + D.circle(0, 0, 2.6, { fill: "#fff", stroke: col, width: 1.2 }));
  return g(D.rect(-5.2, -len / 2, 4.6, len, { fill: col, stroke: col, width: 1, r: 2.3 }) + D.rect(0.6, -len / 2, 4.6, len, { fill: col, stroke: col, width: 1, r: 2.3 }) + D.circle(0, 0, 3.2, { fill: "#fff", stroke: col, width: 1.3 }));
};
const BL = C.blue, AM = C.amber;
const label = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });

// ---- DNA content through the 20-hour cell cycle (worked solution of chromosomes-cell-cycle)
{
  const ph = [["G1", 9], ["S", 7], ["G2", 3], ["M", 1]]; // hours: 180, 140, 60, 20 of 400 cells x 20 h
  const total = ph.reduce((a, [, h]) => a + h, 0);
  if (total !== 20 || Math.round((180 / 400) * 20) !== 9 || Math.round((140 / 400) * 20) !== 7 || Math.round((60 / 400) * 20) !== 3 || Math.round((20 / 400) * 20) !== 1) throw new Error("cell cycle numbers");
  const ax = D.axes({ x: [0, 20], y: [0, 2.6], w: 600, h: 400, xTicks: [0, 4, 8, 12, 16, 20], yTicks: [0, 1, 2], xLabel: "Time / h", yLabel: "DNA per cell (units; G1 = 1)", pad: { l: 70, r: 28, t: 60, b: 58 } });
  let b = ax.frame;
  const bands = [[0, 9, "G1", C.fillBlue], [9, 16, "S", C.fillAmber], [16, 19, "G2", C.fillGreen], [19, 20, "M", C.fillGrey]];
  for (const [a, z, name, fill] of bands) b += `<rect x="${ax.X(a)}" y="${ax.Y(2.6)}" width="${ax.X(z) - ax.X(a)}" height="${ax.Y(0) - ax.Y(2.6)}" fill="${fill}" fill-opacity="0.6"/>`;
  b += ax.frame;
  for (const [a, z, name] of bands) b += D.text((ax.X(a) + ax.X(z)) / 2, ax.Y(2.6) + 18, name + (name === "M" ? "" : ""), { anchor: "middle", size: 14, weight: 700 }) + D.text((ax.X(a) + ax.X(z)) / 2, ax.Y(2.6) + 34, z - a + " h", { anchor: "middle", size: 12, fill: C.muted });
  b += ax.line([[0, 1], [9, 1], [16, 2], [19, 2], [20, 2], [20, 1]], { stroke: C.blue });
  b += D.text(ax.X(9) + 6, ax.Y(1) + 24, "DNA doubles during S phase", { size: 13 });
  b += D.text(ax.X(20) - 8, ax.Y(1.5), "cytokinesis:", { anchor: "end", size: 12, fill: C.muted }) + D.text(ax.X(20) - 8, ax.Y(1.5) + 15, "back to 1", { anchor: "end", size: 12, fill: C.muted });
  const alt = "DNA content per cell through a 20-hour cell cycle: it stays at 1 unit through G1 (9 h), doubles to 2 units during S phase (7 h), stays at 2 through G2 (3 h) and mitosis (1 h), then falls back to 1 unit in each daughter cell after cytokinesis.";
  const cap = "Figure: DNA content during the cell cycle, with phase lengths from the worked example (9 + 7 + 3 + 1 = 20 h)";
  await fig("cell-cycle-dna-content", D.svg(600, 400, b), alt, cap, "division/chromosomes-cell-cycle", "If we take the DNA content of a cell in G1");
}

// ---- Mitosis: four stages for a cell with 2n = 4
{
  const w = 640, h = 285, pw = 160, cy = 112, R = 64;
  let b = "";
  const cx = (i) => pw * i + pw / 2;
  const names = ["Prophase", "Metaphase", "Anaphase", "Telophase"];
  const sub = ["chromosomes condense;|envelope breaks down", "centromeres on the|equator", "chromatids pulled|to the poles", "two nuclei reform;|cell pinches in two"];
  names.forEach((n, i) => { b += label(cx(i), 222, n, { weight: 700, size: 14 }) + label(cx(i), 240, sub[i].replace("|", "\n"), { size: 12, fill: C.muted }); });
  const cell = (i, ry = R, rx = R) => ellipse(cx(i), cy, rx, ry, { fill: "#fdfbf7", width: 2.5 });
  const pole = (x, y) => D.circle(x, y, 3.2, { fill: C.ink, stroke: C.ink, width: 1 });
  {
    const i = 0, x = cx(i);
    b += cell(i) + D.circle(x, cy, 42, { stroke: C.muted, width: 1.4, dash: true });
    b += chrom(x - 18, cy - 14, 40, 35, BL) + chrom(x + 14, cy - 18, 40, -30, AM) + chrom(x - 10, cy + 18, 26, 80, BL) + chrom(x + 18, cy + 14, 26, 15, AM);
    b += pole(x - 54, cy - 8) + pole(x + 54, cy + 8);
  }
  {
    const i = 1, x = cx(i);
    const items = [[x - 38, cy - 6, 34, BL], [x - 3, cy - 6, 34, AM], [x - 28, cy + 8, 22, BL], [x + 6, cy + 8, 22, AM]];
    b += cell(i);
    for (const [px, py] of items) b += D.line(x, cy - 58, px, py, { stroke: C.muted, width: 1 }) + D.line(x, cy + 58, px, py, { stroke: C.muted, width: 1 });
    for (const [px, py, len, col] of items) b += chrom(px, py, len, 90, col);
    b += pole(x, cy - 58) + pole(x, cy + 58);
  }
  {
    const i = 2, x = cx(i);
    b += ellipse(x, cy, 55, 72, { fill: "#fdfbf7", width: 2.5 });
    const set = (dir) => {
      let s = "";
      [[-24, 40, BL], [-8, 40, AM], [8, 26, BL], [24, 26, AM]].forEach(([dx, len, col]) => {
        const apex = cy + dir * 40, arm = (len / 2) * 0.9;
        s += D.polyline([[x + dx - 5, apex - dir * arm], [x + dx, apex], [x + dx + 5, apex - dir * arm]], { stroke: col, width: 4.5 });
        s += D.line(x, cy + dir * 66, x + dx, apex, { stroke: C.muted, width: 1 });
      });
      return s;
    };
    b += set(-1) + set(1) + pole(x, cy - 66) + pole(x, cy + 66);
  }
  {
    const i = 3, x = cx(i), r = 44, d = 34;
    b += D.circle(x, cy - d, r, { fill: "#fdfbf7", width: 2.5 }) + D.circle(x, cy + d, r, { fill: "#fdfbf7", width: 2.5 });
    const lens = Math.sqrt(r * r - d * d);
    b += D.rect(x - lens + 1.5, cy - (r - d) + 1, 2 * lens - 3, 2 * (r - d) - 2, { fill: "#fdfbf7", stroke: "none" });
    for (const dy of [-d, d]) {
      b += D.circle(x, cy + dy, 24, { stroke: C.muted, width: 1.4 });
      b += D.path_(`M${x - 14},${cy + dy - 8} q5,-5 10,0 t10,0 t8,0`, { stroke: BL, width: 3 }) + D.path_(`M${x - 14},${cy + dy - 1} q5,-5 10,0 t10,0 t8,0`, { stroke: AM, width: 3 }) + D.path_(`M${x - 10},${cy + dy + 7} q5,-5 10,0 t8,0`, { stroke: BL, width: 3 }) + D.path_(`M${x - 8},${cy + dy + 14} q5,-5 10,0 t8,0`, { stroke: AM, width: 3 });
    }
  }
  b += D.text(10, 20, "Cell with 2n = 4: blue and amber chromosomes are the two homologues of each pair", { size: 13, fill: C.muted });
  const alt = "Four stages of mitosis in a cell with 2n = 4: in prophase the double chromosomes condense and the nuclear envelope breaks down; in metaphase they line up on the equator attached to spindle fibres; in anaphase the sister chromatids are pulled apart to opposite poles; in telophase two nuclei reform and the cell pinches in two, giving identical cells.";
  const cap = "Figure: the stages of mitosis (spindle fibres drawn as thin grey lines)";
  await fig("mitosis-stages", D.svg(w, h, b), alt, cap, "division/mitosis", "The cell enters mitosis with 2n chromosomes");
}

// ---- Meiosis: 2n = 4 to four haploid cells
{
  const w = 640, h = 300, pw = 128, cy = 112, R = 50;
  let b = "";
  const cx = (i) => pw * i + pw / 2;
  const names = ["Prophase I", "Metaphase I", "Anaphase I", "After meiosis I", "After meiosis II"];
  const sub = ["homologues pair;|red ring = chiasma", "bivalents on|the equator", "homologues|separate", "2 cells, n = 2|(chromosomes double)", "4 cells, n = 2|(chromatids separated)"];
  names.forEach((n, i) => { b += label(cx(i), 228, n, { weight: 700, size: 13 }) + label(cx(i), 246, sub[i].replace("|", "\n"), { size: 12, fill: C.muted }); });
  const cell = (x, y, rx, ry) => ellipse(x, y, rx, ry, { fill: "#fdfbf7", width: 2.5 });
  // 1 prophase I: two bivalents; a chiasma on the long one
  {
    const x = cx(0);
    b += cell(x, cy, R, R);
    b += chrom(x - 24, cy - 12, 44, 0, BL) + chrom(x - 8, cy - 12, 44, 0, AM) + chrom(x + 12, cy + 18, 28, 0, BL) + chrom(x + 28, cy + 18, 28, 0, AM);
    b += D.circle(x - 16, cy - 12, 9, { stroke: C.red, width: 1.5 });
  }
  // 2 metaphase I: bivalents, homologues on opposite sides of the equator
  {
    const x = cx(1);
    b += cell(x, cy, R, R);
    const items = [[x - 18, cy - 9, 36, BL], [x - 18, cy + 9, 36, AM], [x + 22, cy - 9, 22, BL], [x + 22, cy + 9, 22, AM]];
    for (const [px, py] of items) b += D.line(x, cy + (py < cy ? -46 : 46), px, py, { stroke: C.muted, width: 1 });
    b += D.line(x - R - 4, cy, x + R + 4, cy, { stroke: C.muted, width: 1, dash: true });
    for (const [px, py, len, col] of items) b += chrom(px, py, len, 90, col);
  }
  // 3 anaphase I: whole homologues move apart, each still double
  {
    const x = cx(2);
    b += cell(x, cy, 46, 58);
    for (const [dy, col] of [[-34, BL], [34, AM]]) b += chrom(x - 14, cy + dy, 34, 90, col) + chrom(x + 18, cy + dy, 22, 90, col) + D.line(x, cy + dy * 1.6, x - 14, cy + dy, { stroke: C.muted, width: 1 }) + D.line(x, cy + dy * 1.6, x + 18, cy + dy, { stroke: C.muted, width: 1 });
  }
  // 4 after meiosis I
  {
    const x = cx(3);
    for (const [dy, col] of [[-50, BL], [50, AM]]) b += cell(x, cy + dy, 46, 38) + chrom(x - 14, cy + dy, 36, 0, col) + chrom(x + 14, cy + dy, 24, 0, col);
  }
  // 5 after meiosis II
  {
    const x = cx(4);
    for (const [dx, dy, col] of [[-30, -50, BL], [30, -50, BL], [-30, 50, AM], [30, 50, AM]]) b += cell(x + dx, cy + dy, 28, 36) + chrom(x + dx - 8, cy + dy, 30, 0, col, false) + chrom(x + dx + 8, cy + dy, 20, 0, col, false);
  }
  for (let i = 0; i < 4; i += 1) b += D.arrow(pw * (i + 1) - 8, cy, pw * (i + 1) + 9, cy, { stroke: C.muted, width: 1.5 });
  b += D.text(10, 22, "Cell with 2n = 4 after S phase: every chromosome is two sister chromatids", { size: 13, fill: C.muted });
  b += D.text(10, 282, "Blue and amber are homologues. Crossing over and independent assortment make the four cells different.", { size: 12, fill: C.muted });
  const alt = "Meiosis in a cell with 2n = 4: in prophase I homologous chromosomes pair into bivalents and cross over at chiasmata; in metaphase I the bivalents lie on the equator; in anaphase I whole homologues separate, giving two cells with n = 2 and double chromosomes; meiosis II separates the sister chromatids, giving four haploid cells with single chromosomes.";
  const cap = "Figure: meiosis I separates homologous chromosomes, meiosis II separates sister chromatids";
  await fig("meiosis-stages", D.svg(w, h, b), alt, cap, "division/meiosis", "Before meiosis, DNA replicates in S phase");
}
