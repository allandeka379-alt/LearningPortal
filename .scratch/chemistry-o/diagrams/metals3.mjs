// Run from repo root: node .scratch/chemistry-o/diagrams/metals3.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, tube, WATER } from "./_h.mjs";

// ---- rusting experiment: three tubes
{
  const w = 600, h = 400;
  let b = "";
  const nail = (cx, y, rust) => D.line(cx - 4, y, cx - 4, y + 70, { stroke: "#555", width: 4 }) + D.line(cx - 10, y, cx + 2, y, { stroke: "#555", width: 4 }) + (rust ? [0, 1, 2, 3, 4, 5].map((i) => D.circle(cx - 4 + (i % 2 ? 4 : -4), y + 14 + i * 10, 3, { fill: C.amber, stroke: C.amber, width: 1 })).join("") : "");
  const y0 = 64, th = 190, tw = 74;
  // tube A: tap water, open to air
  b += tube(110, y0, tw, th, 110, WATER) + nail(110, y0 + 110, true);
  b += T(110, y0 - 10, "open to air", { anchor: "middle", size: 13, fill: C.muted });
  // tube B: boiled water + oil layer
  b += tube(300, y0, tw, th, 110, WATER);
  b += D.rect(300 - tw / 2 + 1, y0 + th - 110 - 2, tw - 2, 14, { fill: "#e8d27a", stroke: "none" });
  b += nail(300, y0 + 108, false);
  b += T(300, y0 - 10, "oil layer", { anchor: "middle", size: 13, fill: C.muted });
  // tube C: dry air with calcium chloride
  b += tube(490, y0, tw, th, 0);
  for (let i = 0; i < 9; i += 1) b += D.circle(490 - 28 + (i % 5) * 14, y0 + th - 14 - Math.floor(i / 5) * 12, 4.5, { fill: "#cfc7bb", stroke: C.muted, width: 1 });
  b += nail(490, y0 + 70, false);
  b += D.rect(490 - tw / 2 - 3, y0 - 16, tw + 6, 18, { fill: C.fillAmber, stroke: C.axis, width: 1.6, r: 2 });
  b += T(490, y0 - 22, "stopper", { anchor: "middle", size: 13, fill: C.muted });
  const lab = (cx, id, l1, l2, res, col) => T(cx, y0 + th + 28, `Tube ${id}`, { anchor: "middle", size: 15, weight: 700 }) + T(cx, y0 + th + 48, l1, { anchor: "middle", size: 13 }) + T(cx, y0 + th + 66, l2, { anchor: "middle", size: 13 }) + T(cx, y0 + th + 90, res, { anchor: "middle", size: 15, weight: 700, fill: col });
  b += lab(110, "A", "tap water", "water + oxygen", "RUSTS", C.red);
  b += lab(300, "B", "boiled water + oil", "water, no oxygen", "no rust", C.green);
  b += lab(490, "C", "anhydrous CaCl₂", "oxygen, no water", "no rust", C.green);
  await put("rusting-experiment-three-nails", w, h, b,
    "The rusting experiment: only tube A, an iron nail in tap water open to air (water and oxygen), rusts; tube B, boiled water under oil (no oxygen), and tube C, dry air over anhydrous calcium chloride (no water), do not rust.",
    "Figure: iron rusts only when both water and oxygen are present",
    "metals/corrosion", "### The classic experiment");
}

// ---- pure metal vs alloy particles
{
  const w = 600, h = 330;
  let b = "";
  const grid = (ox, oy, big) => {
    let s = D.rect(ox - 14, oy - 14, 6 * 38 + 4, 4 * 38 + 4, { fill: "#fbf8f2", stroke: C.muted, width: 1 });
    for (let r = 0; r < 4; r += 1) for (let c = 0; c < 6; c += 1) {
      const isBig = big.some(([br, bc]) => br === r && bc === c);
      const x = ox + c * 38 + 5, y = oy + r * 38 + 5;
      s += isBig ? D.circle(x, y, 17, { fill: C.fillAmber, stroke: C.amber, width: 2 }) : D.circle(x, y, 15, { fill: C.fillBlue, stroke: C.blue, width: 1.6 });
    }
    return s;
  };
  b += grid(34, 40, []);
  b += grid(334, 40, [[0, 4], [1, 1], [2, 3], [3, 5], [3, 0]]);
  b += T(20, 24, "Pure copper", { size: 15, weight: 700 });
  b += T(320, 24, "Bronze (copper + tin)", { size: 15, weight: 700 });
  b += D.arrow(30, 226, 150, 226, { width: 2, stroke: C.blue });
  b += T(30, 248, "identical atoms in neat layers:\nthe layers slide easily, so it is soft", { size: 13 });
  b += T(330, 226, "larger tin atoms (amber) disturb the layers:", { size: 13 });
  b += T(330, 244, "the layers cannot slide easily, so it is harder", { size: 13 });
  b += D.circle(340, 280, 7, { fill: C.fillBlue, stroke: C.blue, width: 1.6 }) + T(354, 285, "copper atom", { size: 13 });
  b += D.circle(450, 280, 9, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(466, 285, "tin atom (bigger)", { size: 13 });
  await put("alloy-vs-pure-metal-particles", w, h, b,
    "Particle diagrams: in pure copper identical atoms sit in neat layers that slide over each other easily, so it is soft; in bronze, larger tin atoms scattered among the copper atoms disturb the layers so they cannot slide easily, making the alloy harder.",
    "Figure: different-sized atoms in an alloy stop the layers of atoms sliding",
    "metals/alloys", "In a diagram of particles drawn as circles");
}

// ---- reactivity series ladder
{
  const rows = [
    ["potassium, K", "reacts violently with cold water", "electrolysis"],
    ["sodium, Na", "reacts vigorously with cold water", "electrolysis"],
    ["calcium, Ca", "reacts steadily with cold water", "electrolysis"],
    ["magnesium, Mg", "reacts with steam", "electrolysis"],
    ["aluminium, Al", "protected by an oxide layer", "electrolysis"],
    ["carbon, C", "non-metal, for comparison", ""],
    ["zinc, Zn", "reacts with dilute acids", "heat oxide with carbon"],
    ["iron, Fe", "reacts slowly with dilute acids", "heat oxide with carbon"],
    ["hydrogen, H", "non-metal, for comparison", ""],
    ["copper, Cu", "no reaction with dilute HCl", "heat oxide with carbon"],
    ["silver, Ag", "no reaction with dilute HCl", ""],
    ["gold, Au", "found native (as the metal)", "found native"],
  ];
  const w = 600, rh = 34, top = 54, h = top + rows.length * rh + 20;
  let b = T(70, 30, "Element", { size: 13, weight: 700, fill: C.muted }) + T(220, 30, "Evidence", { size: 13, weight: 700, fill: C.muted }) + T(452, 30, "Extraction", { size: 13, weight: 700, fill: C.muted });
  rows.forEach(([el, note, ext], i) => {
    const y = top + i * rh;
    const ref = el.startsWith("carbon") || el.startsWith("hydrogen");
    b += D.rect(60, y, 534, rh - 3, { fill: ref ? C.fillGrey : i % 2 ? "#ffffff" : C.fillBlue, stroke: "none", r: 4 });
    b += T(70, y + 21, el, { size: 14, weight: ref ? 400 : 700, italic: ref });
    b += T(220, y + 21, note, { size: 12.5 });
    b += T(452, y + 21, ext, { size: 12.5 });
  });
  b += D.arrow(44, top + rows.length * rh - 10, 44, top + 6, { width: 3, stroke: C.amber });
  b += T(22, top + (rows.length * rh) / 2, "more reactive", { size: 13, weight: 700, anchor: "middle", rotate: -90 });
  await put("reactivity-series-ladder-evidence-extraction", w, h, b,
    "The reactivity series from potassium to gold with carbon and hydrogen as reference points: K, Na and Ca react with cold water, Mg with steam, Zn and Fe with dilute acid, Cu, Ag and Au do not; metals above carbon are extracted by electrolysis, those below by heating with carbon, and gold is found native.",
    "Figure: the reactivity series, with the evidence for each position and how each metal is extracted",
    "metals/reactivity-series", "## The series");
}
