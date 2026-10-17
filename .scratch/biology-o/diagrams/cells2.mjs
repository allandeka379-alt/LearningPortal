// biology-o: cells part 2 (sweet potato osmosis graph, specialised cells) + placement of all cells figures
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

// ---------- sweet potato graph (the lesson's table)
const conc = [0, 0.2, 0.4, 0.6, 0.8, 1.0], chg = [15.0, 7.9, 1.6, -5.0, -10.8, -16.0];
const cross = conc[2] + ((0 - chg[2]) / (chg[3] - chg[2])) * (conc[3] - conc[2]); // 0.448
const potatoAlt = `Graph of the lesson's sweet potato results: mean change in mass falls from +15.0% in pure water to −16.0% in 1.0 mol per dm³ sucrose, crossing 0% at about ${cross.toFixed(2)} mol per dm³, where there is no net movement of water.`;
{
  const ax = D.axes({ x: [0, 1.0], y: [-20, 20], xTicks: 0.2, yTicks: 10, yLabel: "Mean change in mass (%)", w: 560, h: 400, pad: { l: 64, r: 30, t: 30, b: 70 } });
  let b = ax.frame;
  b += D.text(300, 386, "Sucrose concentration (mol per dm³)", { anchor: "middle", size: 14, weight: 600 });
  b += ax.line(conc.map((c, i) => [c, chg[i]]), { stroke: C.blue, width: 2.6 });
  conc.forEach((c, i) => { b += ax.point(c, chg[i], { stroke: C.blue }); });
  b += D.dot(ax.X(cross), ax.Y(0), { r: 5, fill: C.amber, stroke: C.amber });
  b += ax.line([[cross, 0], [cross, -20]], { stroke: C.amber, width: 1.4, dash: true });
  b += ax.tag(cross, 9, `crosses 0% at about ${cross.toFixed(2)}`, { dx: 12, size: 13 });
  b += ax.tag(0, 15, "+15.0", { dx: 12, dy: -4, size: 12 }) + ax.tag(1, -16, "−16.0", { anchor: "end", dx: -8, dy: -14, size: 12 });
  await D.figure(FAMILY, "sweet-potato-osmosis-graph", D.svg(560, 400, b), { alt: potatoAlt, caption: "Figure: percentage change in mass of sweet potato against sucrose concentration" });
}

// ---------- specialised cells (6 schematics)
const specAlt = "Six specialised cells with the feature that suits each job: ciliated cell with cilia that sweep mucus, root hair cell with a long thin extension, red blood cell that is a biconcave disc with no nucleus, sperm cell with a tail and mitochondria, palisade cell packed with chloroplasts and neurone with a long fibre.";
{
  let b = "";
  const name = (x, y, n, note) => D.text(x, y, n, { anchor: "middle", size: 14, weight: 700 }) + D.text(x, y + 18, note, { anchor: "middle", size: 12, fill: C.muted });
  // row 1: y 40-150, names at 170
  // ciliated cell
  let cx = 95;
  b += D.rect(cx - 30, 70, 60, 80, { fill: "#fbf7ef", r: 6 }) + ell(cx, 120, 10, 12, { fill: "#e5dcc9" });
  for (let i = -24; i <= 24; i += 8) b += D.line(cx + i, 70, cx + i + (i > 0 ? 3 : -3), 44, { stroke: C.teal, width: 2 });
  b += D.text(cx + 36, 56, "cilia", { size: 12, fill: C.teal });
  b += name(cx, 178, "Ciliated cell", "cilia sweep mucus up");
  // root hair cell
  cx = 280;
  b += D.rect(cx - 30, 50, 60, 60, { fill: "#fbf7ef", r: 4 }) + ell(cx, 78, 9, 11, { fill: "#e5dcc9" });
  b += D.path_(`M${cx - 9},110 L${cx - 9},152 Q${cx - 9},156 ${cx - 5},156 L${cx + 5},156 Q${cx + 9},156 ${cx + 9},152 L${cx + 9},110`, { fill: "#fbf7ef" });
  b += D.line(cx - 7, 110, cx + 7, 110, { stroke: "#fbf7ef", width: 3 });
  b += D.text(cx + 40, 135, "root hair", { size: 12, fill: C.muted });
  b += name(cx, 178, "Root hair cell", "large surface area");
  // red blood cell: top view and side view
  cx = 465;
  b += ell(cx - 44, 100, 32, 32, { fill: "#f4c7c3", stroke: C.red }) + ell(cx - 44, 100, 14, 14, { fill: "#fbe3e1", stroke: C.red, width: 1.2 });
  b += `<path d="M${cx + 8},86 Q${cx + 38},98 ${cx + 68},86 C${cx + 78},92 ${cx + 78},108 ${cx + 68},114 Q${cx + 38},102 ${cx + 8},114 C${cx - 2},108 ${cx - 2},92 ${cx + 8},86 Z" fill="#f4c7c3" stroke="${C.red}" stroke-width="2"/>`;
  b += D.text(cx - 44, 150, "top view", { anchor: "middle", size: 12, fill: C.muted }) + D.text(cx + 40, 150, "side view", { anchor: "middle", size: 12, fill: C.muted });
  b += name(cx + 5, 178, "Red blood cell", "biconcave disc, no nucleus");
  // row 2: sperm, palisade, neurone
  const r2 = 255;
  cx = 95;
  b += ell(cx - 34, r2, 18, 12, { fill: "#e5dcc9" }) + D.rect(cx - 14, r2 - 6, 34, 12, { fill: C.fillAmber, stroke: C.amber, width: 1.5, r: 4 });
  b += D.path_(`M${cx + 20},${r2} C${cx + 36},${r2 - 16} ${cx + 52},${r2 + 16} ${cx + 68},${r2}`, { stroke: C.ink, width: 2 });
  b += D.text(cx - 34, r2 - 20, "head", { anchor: "middle", size: 12, fill: C.muted }) + D.text(cx + 6, r2 + 26, "mitochondria", { anchor: "middle", size: 12, fill: C.amber }) + D.text(cx + 54, r2 - 14, "tail", { anchor: "middle", size: 12, fill: C.muted });
  b += name(cx, 322, "Sperm cell", "tail and mitochondria");
  cx = 280;
  b += D.rect(cx - 24, r2 - 40, 48, 90, { fill: "#fbf7ef", stroke: C.green, width: 3, r: 4 });
  for (const [x, y] of [[-12, -26], [12, -16], [-10, 2], [10, 10], [-12, 28], [12, 36]]) b += ell(cx + x, r2 + y, 6, 4, { fill: C.fillGreen, stroke: C.green, width: 1.4 });
  b += name(cx, 322, "Palisade cell", "many chloroplasts");
  cx = 465;
  b += ell(cx - 50, r2, 16, 14, { fill: "#e5dcc9" }) + D.circle(cx - 50, r2, 4, { fill: C.muted, stroke: C.muted, width: 1 });
  for (const dy of [-22, 0, 22]) b += D.line(cx - 66, r2, cx - 84, r2 + dy, { stroke: C.ink, width: 1.4 });
  b += D.line(cx - 34, r2, cx + 62, r2, { stroke: C.ink, width: 2.4 });
  for (const dy of [-14, 0, 14]) b += D.line(cx + 62, r2, cx + 82, r2 + dy, { stroke: C.ink, width: 1.4 });
  b += name(cx, 322, "Neurone", "long fibre carries impulses");
  await D.figure(FAMILY, "specialised-cells", D.svg(580, 360, b), { alt: specAlt, caption: "Figure: six specialised cells, each with a structure that suits its function" });
}

// ---------- placement
const A = {
  pa: "Plant cell and animal cell side by side: both have a cell membrane, cytoplasm, nucleus, mitochondria and ribosomes; only the plant cell also has a cellulose cell wall, a large permanent vacuole full of cell sap and chloroplasts.",
  bac: "Bacterial cell: a cell wall, cell membrane, cytoplasm with ribosomes, a single loop of circular DNA lying free in the cytoplasm and small rings called plasmids; there is no nucleus and no mitochondria.",
  agar: "Three agar cubes of side 1 cm, 2 cm and 3 cm: surface area 6, 24 and 54 square centimetres, volume 1, 8 and 27 cubic centimetres, so the surface area to volume ratio falls from 6 to 1, to 3 to 1, to 2 to 1 and the largest cube takes longest to turn colourless.",
  osm: "Plant cells in three solutions: in pure water or a dilute solution water enters and the cell is turgid; in a solution as concentrated as the cell sap there is no net movement and the cell is flaccid; in a concentrated solution water leaves and the membrane pulls away from the wall, called plasmolysis.",
};
place(LES("cells/cell-structure"), "## Plant and animal cells compared", D.md("plant-animal-cell", A.pa, "Figure: a plant cell and an animal cell with their main structures labelled"));
place(LES("cells/cell-structure"), "## Bacterial cells", D.md("bacterial-cell", A.bac, "Figure: a bacterial cell has circular DNA and plasmids but no nucleus"));
place(LES("cells/diffusion-and-active-transport"), "The explanation lies in the **surface area to volume ratio**", D.md("agar-cubes-sa-v", A.agar, "Figure: the bigger the cube, the smaller its surface area to volume ratio"));
place(LES("cells/osmosis"), "## Osmosis in plant cells", D.md("plant-cell-osmosis", A.osm, "Figure: a plant cell is turgid in water, flaccid in an equal solution and plasmolysed in a concentrated solution"));
place(LES("cells/osmosis"), "Reading from your plotted line, it crosses at about 0.45", D.md("sweet-potato-osmosis-graph", potatoAlt, "Figure: percentage change in mass of sweet potato against sucrose concentration"));
place(LES("cells/specialised-cells"), "The ZIMSEC syllabus also names", D.md("specialised-cells", specAlt, "Figure: six specialised cells, each with a structure that suits its function"));
