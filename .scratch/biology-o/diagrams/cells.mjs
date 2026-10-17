// biology-o: cells (plant/animal/bacterial cell, agar cubes, osmosis in plant cells, specialised cells)
import { D, FAMILY, LES, C, call, title, ell } from "./_h.mjs";

// ---------- 1. Plant and animal cell
{
  let b = "";
  b += title(205, 22, "Plant cell (palisade cell)");
  b += D.rect(120, 40, 170, 250, { fill: "#f4efe6", stroke: C.green, width: 5, r: 10 });
  b += D.rect(126, 46, 158, 238, { fill: "#fbf7ef", stroke: C.ink, width: 1.5, r: 8 });
  b += D.rect(155, 85, 100, 160, { fill: C.fillBlue, stroke: C.teal, width: 1.5, r: 14 });
  b += ell(138, 165, 10, 16, { fill: "#e5dcc9" }) + D.circle(138, 165, 4, { fill: C.muted, stroke: C.muted, width: 1 });
  for (const [x, y] of [[165, 63], [237, 63], [165, 268], [237, 268]]) b += ell(x, y, 17, 8, { fill: C.fillGreen, stroke: C.green, width: 1.6 });
  for (const [x, y] of [[272, 130], [272, 200]]) b += ell(x, y, 7, 5, { fill: C.fillAmber, stroke: C.amber, width: 1.4 });
  b += D.text(205, 170, "Cell sap", { anchor: "middle", size: 13, fill: C.teal });
  b += call(110, 70, "Chloroplast", 150, 63, { anchor: "end" });
  b += call(110, 172, "Nucleus", 130, 165, { anchor: "end" });
  b += call(300, 52, "Cell wall\n(cellulose)", 289, 52);
  b += call(300, 104, "Cell membrane", 284, 104);
  b += call(300, 150, "Large\npermanent\nvacuole", 255, 148);
  b += call(300, 214, "Mitochondrion", 276, 202);

  b += title(455, 22, "Animal cell (cheek cell)");
  b += `<path d="M400,110 C410,72 445,56 480,60 C515,64 535,96 532,150 C536,205 515,252 478,262 C440,270 405,245 402,200 C398,160 396,132 400,110 Z" fill="#fbf7ef" stroke="${C.ink}" stroke-width="2"/>`;
  b += ell(462, 150, 30, 27, { fill: "#e5dcc9" }) + D.circle(462, 150, 7, { fill: C.muted, stroke: C.muted, width: 1 });
  for (const [x, y, r] of [[430, 105, 0], [495, 215, 35], [430, 215, 20]]) b += ell(x, y, 11, 6, { fill: C.fillAmber, stroke: C.amber, width: 1.4, rotate: r });
  for (const [x, y] of [[495, 95], [505, 130], [500, 175], [450, 245], [485, 240], [420, 160], [470, 85], [440, 190]]) b += D.dot(x, y, { r: 2.2, fill: C.ink });
  b += call(545, 100, "Nucleus", 488, 140);
  b += call(545, 170, "Ribosomes\n(small dots)", 502, 176);
  b += call(545, 232, "Mitochondrion", 505, 220);
  b += call(430, 285, "Cell membrane", 405, 190, { anchor: "start", fromY: 281 });
  await D.figure(FAMILY, "plant-animal-cell", D.svg(640, 305, b), {
    alt: "Plant cell and animal cell side by side: both have a cell membrane, cytoplasm, nucleus, mitochondria and ribosomes; only the plant cell also has a cellulose cell wall, a large permanent vacuole full of cell sap and chloroplasts.",
    caption: "Figure: a plant cell and an animal cell with their main structures labelled",
  });
}

// ---------- 2. Bacterial cell
{
  let b = "";
  b += D.rect(110, 70, 320, 150, { fill: "#f1e8d6", stroke: C.green, width: 5, r: 75 });
  b += D.rect(118, 78, 304, 134, { fill: "#fbf7ef", stroke: C.ink, width: 1.4, r: 67 });
  b += ell(270, 145, 72, 36, { stroke: C.purple, width: 2.6 });
  b += ell(385, 118, 11, 11, { stroke: C.purple, width: 2 }) + ell(165, 172, 10, 10, { stroke: C.purple, width: 2 });
  for (const [x, y] of [[160, 120], [240, 195], [330, 200], [395, 160], [185, 100], [300, 95], [420, 140]].slice(0, 6)) b += D.dot(x, y, { r: 3 });
  b += call(120, 40, "Cell wall (not cellulose)", 190, 74, { anchor: "start", fromY: 36 });
  b += call(300, 262, "Cell membrane", 330, 213);
  b += call(80, 262, "Ribosomes", 150, 120, { anchor: "start", fromY: 258 });
  b += D.text(275, 152, "Circular DNA\n(no nucleus)", { anchor: "middle", size: 13, fill: C.purple });
  b += call(445, 100, "Plasmid", 396, 112);
  b += D.text(270, 290, "Length 1-5 micrometres; a cheek cell is about 50 micrometres across", { anchor: "middle", size: 13, fill: C.muted });
  await D.figure(FAMILY, "bacterial-cell", D.svg(540, 305, b), {
    alt: "Bacterial cell: a cell wall, cell membrane, cytoplasm with ribosomes, a single loop of circular DNA lying free in the cytoplasm and small rings called plasmids; there is no nucleus and no mitochondria.",
    caption: "Figure: a bacterial cell has circular DNA and plasmids but no nucleus",
  });
}

// ---------- 3. Agar cubes: surface area to volume ratio (same sides and arithmetic as the lesson)
{
  const sides = [1, 2, 3], px = 44;
  let b = D.text(270, 24, "Pink agar cubes placed in dilute acid", { anchor: "middle", size: 15, weight: 700 });
  const base = 200;
  let x = 40;
  for (const s of sides) {
    const sa = 6 * s * s, vol = s ** 3, g = (a, c) => (c === 0 ? a : (() => { let m = a, n2 = c; while (n2) [m, n2] = [n2, m % n2]; return m; })());
    const d = g(sa, vol), ratio = `${sa / d} : ${vol / d}`;
    const w = s * px;
    b += D.rect(x, base - w, w, w, { fill: "#f6c3d6", stroke: C.red, width: 2 });
    b += D.text(x + w / 2, base + 22, `${s} cm cube`, { anchor: "middle", size: 14, weight: 700 });
    b += D.text(x + w / 2, base + 42, `area ${sa} cm²`, { anchor: "middle", size: 13 });
    b += D.text(x + w / 2, base + 60, `volume ${vol} cm³`, { anchor: "middle", size: 13 });
    b += D.text(x + w / 2, base + 80, `ratio ${ratio}`, { anchor: "middle", size: 14, weight: 700, fill: C.blue });
    x += w + 60;
  }
  b += D.text(270, 306, "Bigger cube: smaller ratio, so acid takes longer to reach the centre", { anchor: "middle", size: 13, fill: C.muted });
  await D.figure(FAMILY, "agar-cubes-sa-v", D.svg(540, 322, b), {
    alt: "Three agar cubes of side 1 cm, 2 cm and 3 cm: surface area 6, 24 and 54 square centimetres, volume 1, 8 and 27 cubic centimetres, so the surface area to volume ratio falls from 6 to 1, to 3 to 1, to 2 to 1 and the largest cube takes longest to turn colourless.",
    caption: "Figure: the bigger the cube, the smaller its surface area to volume ratio",
  });
}

// ---------- 4. Plant cell in three solutions (turgid, flaccid, plasmolysed)
{
  let b = "";
  const cell = (x, state) => {
    const y = 70, w = 150, h = 110;
    let s = D.rect(x, y, w, h, { fill: "#f4efe6", stroke: C.green, width: 5, r: 6 });
    if (state === "turgid") {
      s += D.rect(x + 5, y + 5, w - 10, h - 10, { fill: C.fillBlue, stroke: C.ink, width: 1.5, r: 4 });
      s += D.text(x + w / 2, y + h / 2 + 5, "full vacuole", { anchor: "middle", size: 13, fill: C.teal });
    } else if (state === "flaccid") {
      s += D.rect(x + 5, y + 5, w - 10, h - 10, { fill: "#fbf7ef", stroke: C.ink, width: 1.5, r: 4 });
      s += D.rect(x + 22, y + 22, w - 44, h - 44, { fill: C.fillBlue, stroke: C.teal, width: 1.5, r: 8 });
      s += D.text(x + w / 2, y + h / 2 + 5, "smaller vacuole", { anchor: "middle", size: 13, fill: C.teal });
    } else {
      s += D.rect(x + 5, y + 5, w - 10, h - 10, { fill: C.fillAmber, stroke: "none", width: 0 });
      s += D.rect(x + 40, y + 30, w - 80, h - 60, { fill: "#fbf7ef", stroke: C.ink, width: 1.8, r: 14 });
      s += D.rect(x + 52, y + 42, w - 104, h - 84, { fill: C.fillBlue, stroke: C.teal, width: 1.2, r: 6 });
    }
    return s;
  };
  b += cell(25, "turgid") + cell(245, "flaccid") + cell(465, "plasmo");
  const panels = [[25, "Pure water or dilute solution", "Water enters by osmosis.\nCell is turgid and firm;\nthe wall stops it bursting."], [245, "Same concentration as sap", "No net movement of water.\nCell is flaccid (soft)."], [465, "Concentrated solution", "Water leaves by osmosis.\nMembrane pulls away from the\nwall (plasmolysis); the gap\n(amber) fills with solution."]];
  for (const [x, t, d] of panels) {
    b += D.text(x + 75, 40, t, { anchor: "middle", size: 13, weight: 700 });
    b += D.text(x + 75, 210, d, { anchor: "middle", size: 13 });
  }
  await D.figure(FAMILY, "plant-cell-osmosis", D.svg(640, 285, b), {
    alt: "Plant cells in three solutions: in pure water or a dilute solution water enters and the cell is turgid; in a solution as concentrated as the cell sap there is no net movement and the cell is flaccid; in a concentrated solution water leaves and the membrane pulls away from the wall, called plasmolysis.",
    caption: "Figure: a plant cell is turgid in water, flaccid in an equal solution and plasmolysed in a concentrated solution",
  });
}
