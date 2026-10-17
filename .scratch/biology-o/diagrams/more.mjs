// biology-o: variation (histogram, bar chart), cell division, DNA, skeleton (elbow), skin, blood glucose, malaria
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

// ---------- 1. Histogram of bean-pod lengths (the 20 measurements in Example 1)
{
  const data = [9.2, 10.5, 11.8, 12.1, 12.4, 12.9, 13.3, 13.5, 13.8, 14.0, 14.2, 14.6, 14.9, 15.1, 15.4, 15.8, 16.3, 16.9, 17.5, 18.6];
  const classes = [[9, 10.9], [11, 12.9], [13, 14.9], [15, 16.9], [17, 18.9]];
  const freq = classes.map(([a, c]) => data.filter((v) => v >= a && v <= c).length);
  if (freq.join() !== "2,4,7,5,2") throw new Error("frequencies differ from the lesson: " + freq);
  const ax = D.axes({ x: [0, 5], y: [0, 8], xTicks: [], yTicks: 1, yLabel: "Frequency (number of pods)", w: 560, h: 380, pad: { l: 64, r: 30, t: 34, b: 80 }, origin: false });
  let b = ax.frame;
  freq.forEach((f, i) => {
    b += D.rect(ax.X(i), ax.Y(f), ax.X(i + 1) - ax.X(i), ax.Y(0) - ax.Y(f), { fill: C.fillBlue, stroke: C.blue, width: 2 });
    b += D.text((ax.X(i) + ax.X(i + 1)) / 2, ax.Y(f) - 6, String(f), { anchor: "middle", size: 13, fill: C.muted });
    b += D.text((ax.X(i) + ax.X(i + 1)) / 2, ax.Y(0) + 20, `${classes[i][0].toFixed(1)}–${classes[i][1].toFixed(1)}`, { anchor: "middle", size: 12 });
  });
  b += D.text(ax.X(5), ax.Y(0) + 52, "Length of bean pod (cm)", { anchor: "end", size: 14, weight: 600 });
  b += D.tag(ax.X(3.75), ax.Y(7.3), "modal class 13.0–14.9 cm", { anchor: "middle", size: 13 });
  const alt = "Histogram of 20 bean pod lengths in 2 cm classes: frequencies 2, 4, 7, 5 and 2 with touching bars, peaking in the 13.0 to 14.9 cm modal class and falling on both sides, which shows continuous variation.";
  await add("bean-pod-histogram", D.svg(560, 380, b), alt, "Figure: a histogram of bean pod lengths shows continuous variation", "variation/variation", "To investigate a feature showing continuous variation");
}

// ---------- 2. Bar chart: tongue rolling (26 of 40 can, 14 cannot)
{
  const roll = 26, no = 14, n = roll + no;
  const ax = D.axes({ x: [0, 2], y: [0, 30], xTicks: [], yTicks: 5, yLabel: "Number of students", w: 480, h: 360, pad: { l: 64, r: 30, t: 34, b: 70 }, origin: false });
  let b = ax.frame;
  [["Can roll tongue", roll, C.teal], ["Cannot roll tongue", no, C.amber]].forEach(([lab, v, col], i) => {
    const cx = ax.X(i + 0.5), w = (ax.X(1) - ax.X(0)) * 0.5;
    b += D.rect(cx - w / 2, ax.Y(v), w, ax.Y(0) - ax.Y(v), { fill: col, stroke: C.ink, width: 1.5 });
    b += D.text(cx, ax.Y(v) - 8, `${v} (${(v / n) * 100}%)`, { anchor: "middle", size: 14, weight: 700 });
    b += D.text(cx, ax.Y(0) + 22, lab, { anchor: "middle", size: 13 });
  });
  b += D.text(ax.X(2), ax.Y(0) + 52, "Two separate categories: gap between the bars", { anchor: "end", size: 13, fill: C.muted });
  const alt = "Bar chart of tongue rolling in a class of 40 students: 26 (65%) can roll their tongue and 14 (35%) cannot, drawn as two separate bars with a gap because the feature falls into distinct categories with no intermediates, which is discontinuous variation.";
  await add("tongue-rolling-bar-chart", D.svg(480, 360, b), alt, "Figure: a bar chart with a gap between the bars shows discontinuous variation", "variation/variation", "For a feature with distinct categories, count how many");
}

// ---------- 3. Mitosis and meiosis (4 chromosomes drawn as an illustration)
{
  let b = "";
  const red = C.red, blue = C.blue;
  /** a chromosome: vertical bar; dup = two chromatids joined at the middle */
  const chrom = (x, y, len, col, dup) => (dup
    ? D.line(x - 3, y - len / 2, x - 3, y + len / 2, { stroke: col, width: 3 }) + D.line(x + 3, y - len / 2, x + 3, y + len / 2, { stroke: col, width: 3 }) + D.dot(x, y, { r: 2.5, stroke: C.ink, fill: C.ink })
    : D.line(x, y - len / 2, x, y + len / 2, { stroke: col, width: 3.4 }));
  /** a cell with chromosome set: list of [dx, len, colour] */
  const cell = (cx, cy, r, set, dup) => D.circle(cx, cy, r, { fill: "#fbf7ef", stroke: C.ink, width: 2 }) + set.map(([dx, len, col]) => chrom(cx + dx * (dup ? 1.5 : 1), cy, len, col, dup)).join("");
  const full = [[-14, 26, red], [-5, 14, red], [5, 26, blue], [14, 14, blue]];
  const half = (r) => [[-5, 26, red], [6, 14, blue]].map(([dx, l, c]) => [dx * r, l * r, c]);
  const arr = (x1, y1, x2, y2) => D.arrow(x1, y1, x2, y2, { width: 2 });
  // row 1: mitosis
  b += D.text(14, 28, "MITOSIS", { size: 14, weight: 700, fill: C.blue });
  b += cell(70, 96, 40, full, false) + D.text(70, 150, "Parent cell", { anchor: "middle", size: 13 }) + D.text(70, 166, "4 chromosomes", { anchor: "middle", size: 12, fill: C.muted });
  b += arr(116, 96, 156, 96) + D.text(136, 84, "copy", { anchor: "middle", size: 12, fill: C.muted });
  b += cell(210, 96, 40, full, true) + D.text(210, 150, "Chromosomes copied", { anchor: "middle", size: 13 });
  b += arr(256, 96, 296, 96) + D.text(276, 84, "divide", { anchor: "middle", size: 12, fill: C.muted });
  b += cell(350, 96, 34, full, false) + cell(432, 96, 34, full, false) + D.text(391, 150, "Two identical cells", { anchor: "middle", size: 13 }) + D.text(391, 166, "each with 4 chromosomes", { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(480, 100, "Human body cell:", { size: 13, fill: C.muted }) + D.text(480, 118, "46 → 46 + 46", { size: 14, weight: 700 });
  // row 2: meiosis
  const y2 = 276;
  b += D.line(14, 192, 626, 192, { stroke: C.grid, width: 1.5 });
  b += D.text(14, 218, "MEIOSIS", { size: 14, weight: 700, fill: C.red });
  b += cell(70, y2, 40, full, false) + D.text(70, y2 + 54, "Parent cell", { anchor: "middle", size: 13 }) + D.text(70, y2 + 70, "4 chromosomes", { anchor: "middle", size: 12, fill: C.muted });
  b += arr(116, y2, 150, y2);
  b += cell(196, y2, 40, full, true) + D.text(196, y2 + 54, "Copied", { anchor: "middle", size: 13 });
  b += arr(242, y2, 272, y2) + D.text(257, y2 - 12, "divide", { anchor: "middle", size: 12, fill: C.muted });
  const twin = [[-8, 24, red], [-1, 14, red], [7, 22, blue], [14, 12, blue]];
  b += cell(312, y2 - 30, 28, [[-8, 22, red], [8, 22, blue]].map(([dx, l, c]) => [dx, l, c]), true) + cell(312, y2 + 30, 28, [[-8, 14, red], [8, 14, blue]], true);
  b += arr(346, y2, 376, y2) + D.text(361, y2 - 12, "divide", { anchor: "middle", size: 12, fill: C.muted });
  for (const [x, dy] of [[408, -36], [408, 14], [466, -36], [466, 14]]) b += cell(x, y2 + dy + 12, 22, [[-5, 20, dy < 0 ? red : blue], [5, 12, dy < 0 ? blue : red]], false);
  b += D.text(470, y2 + 80, "Four different cells, each with 2 chromosomes", { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(500, y2 - 24, "Human cell:", { size: 13, fill: C.muted }) + D.text(500, y2 - 6, "46 → 23, 23,", { size: 14, weight: 700 }) + D.text(500, y2 + 12, "23, 23", { size: 14, weight: 700 });
  const alt = "Mitosis versus meiosis using a cell with 4 chromosomes: in mitosis the chromosomes are copied and the cell divides once into two genetically identical cells with 4 chromosomes each (human 46 to 46 and 46); in meiosis the cell divides twice into four genetically different cells with half the chromosomes, 2 each (human 46 to 23).";
  await add("mitosis-meiosis-diagram", D.svg(640, 372, b), alt, "Figure: mitosis makes two identical cells, meiosis makes four different cells with half the chromosomes (4 chromosomes shown for clarity)", "inheritance/mitosis-and-meiosis", "## Mitosis and meiosis compared");
}

// ---------- 4. DNA double helix with base pairing A-T and C-G
{
  let b = "";
  const cx = 180, A = 46, P = 150, y0 = 24, y1 = 372;
  const sx = (y, ph) => cx + A * Math.sin(((y - y0) / P) * 2 * Math.PI + ph);
  const strand = (ph, col) => { let d = ""; for (let y = y0; y <= y1; y += 3) d += `${y === y0 ? "M" : "L"}${sx(y, ph).toFixed(1)},${y}`; return D.path_(d, { stroke: col, width: 6 }); };
  const pairs = [["A", "T"], ["C", "G"], ["T", "A"], ["G", "C"], ["A", "T"], ["C", "G"], ["T", "A"], ["G", "C"], ["A", "T"], ["C", "G"]];
  const colOf = { A: C.amber, T: C.teal, C: C.green, G: C.purple };
  let rungs = "", letters = "";
  pairs.forEach(([l, r], i) => {
    const y = y0 + 20 + i * 34;
    const xa = sx(y, 0), xb = sx(y, Math.PI);
    if (Math.abs(xa - xb) < 30) return;
    const mid = (xa + xb) / 2;
    rungs += D.line(xa, y, mid, y, { stroke: colOf[l], width: 5 }) + D.line(mid, y, xb, y, { stroke: colOf[r], width: 5 });
    letters += D.text(xa + (xa < xb ? -4 : 4), y + 5, l, { anchor: xa < xb ? "end" : "start", size: 14, weight: 700, fill: colOf[l] }) + D.text(xb + (xb < xa ? -4 : 4), y + 5, r, { anchor: xb < xa ? "end" : "start", size: 14, weight: 700, fill: colOf[r] });
  });
  b += strand(0, C.muted) + strand(Math.PI, C.ink) + rungs + letters;
  // labels (right)
  b += call(330, 60, "Sugar-phosphate backbone", sx(60, Math.PI) + 4, 60, { fromY: 56 });
  b += D.text(330, 78, "(the two sides of the ladder)", { size: 13, fill: C.muted });
  b += call(330, 190, "Base pair held by weak", 180, 214, { fromY: 186 });
  b += D.text(330, 208, "hydrogen bonds (a rung)", { size: 14 });
  b += D.text(330, 262, "A always pairs with T", { size: 15, weight: 700 });
  b += D.text(330, 284, "C always pairs with G", { size: 15, weight: 700 });
  b += D.text(330, 318, "The strands are complementary,", { size: 13, fill: C.muted }) + D.text(330, 335, "not identical, and coiled into", { size: 13, fill: C.muted }) + D.text(330, 352, "a double helix.", { size: 13, fill: C.muted });
  const alt = "DNA as a twisted ladder: two sugar-phosphate backbone strands coiled into a double helix, joined by rungs of bases held by weak hydrogen bonds, with A always pairing with T and C always pairing with G, so the two strands are complementary.";
  await add("dna-double-helix", D.svg(560, 392, b), alt, "Figure: the structure of DNA, a double helix with base pairs A-T and C-G", "molecules/dna-structure", "- The two strands are **coiled** around each other to make a **double helix**.");
}
