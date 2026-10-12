// Run from repo root: node .scratch/chemistry-o/diagrams/electro2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker, WATER } from "./_h.mjs";

const ELECTRODE = "#4a4742";
const bub = (pts, r = 4) => pts.map(([x, y]) => D.circle(x, y, r, { fill: "#fff", stroke: C.muted, width: 1.3 })).join("");

// ---------- Hofmann voltameter (lesson example: 40.0 cm3 H2 and 20.0 cm3 O2)
{
  const top = 60, per = 5.2; // px per cm3, reading 0 at the top
  const vH = 40, vO = 20;
  const tubeX = { H: 120, O: 340 }, tw = 44, bottom = 330;
  const tubeFor = (x, v, gasLabel, el, sign, col) =>
    D.rect(x, top, tw, bottom - top, { fill: WATER, stroke: "none" }) + D.rect(x, top, tw, v * per, { fill: "#ffffff", stroke: "none" }) +
    D.line(x, top, x, bottom, { stroke: C.axis, width: 2.5 }) + D.line(x + tw, top, x + tw, bottom, { stroke: C.axis, width: 2.5 }) + D.line(x, top, x + tw, top, { stroke: C.axis, width: 2.5 }) +
    D.line(x + 10, top + v * per, x + tw - 10, top + v * per, { stroke: col, width: 1.6, dash: true }).replace("", "") +
    D.rect(x + tw / 2 - 4, bottom - 56, 8, 56, { fill: ELECTRODE, stroke: C.ink, width: 1.2 }) +
    T(x + tw / 2, top - 22, el, { anchor: "middle", size: 14, weight: 700 }) +
    T(x + tw / 2, top - 6, sign, { anchor: "middle", size: 14, fill: C.muted });
  let b = tubeFor(tubeX.H, vH, "", "cathode (−)", "hydrogen", C.blue) + tubeFor(tubeX.O, vO, "", "anode (+)", "oxygen", C.red);
  // scale beside each tube
  for (let v = 0; v <= 50; v += 10) b += D.line(tubeX.H + tw, top + v * per, tubeX.H + tw + 8, top + v * per, { stroke: C.axis, width: 1.4 }) + T(tubeX.H + tw + 12, top + v * per + 4, String(v), { size: 12, fill: C.muted });
  for (let v = 0; v <= 50; v += 10) b += D.line(tubeX.O + tw, top + v * per, tubeX.O + tw + 8, top + v * per, { stroke: C.axis, width: 1.4 }) + T(tubeX.O + tw + 12, top + v * per + 4, String(v), { size: 12, fill: C.muted });
  // central reservoir and base
  b += D.polyline([[225, 20], [225, 300], [265, 300]], { stroke: C.axis, width: 2.5 }) + D.line(275, 20, 275, 310, { stroke: C.axis, width: 2.5 }).replace("", "");
  b += D.rect(222, 160, 56, 160, { fill: WATER, stroke: "none" }).replace("", "") + D.polyline([[222, 20], [222, 330], [278, 330], [278, 20]], { stroke: C.axis, width: 2.5 }) +
    D.rect(224, 120, 52, 208, { fill: WATER, stroke: "none" }) +
    D.line(tubeX.H + tw, 318, 222, 318, { stroke: C.axis, width: 2.5 }).replace("", "") +
    D.rect(tubeX.H + tw, 306, 222 - tubeX.H - tw, 24, { fill: WATER, stroke: "none" }) + D.line(tubeX.H + tw, 306, 222, 306, { stroke: C.axis, width: 2.5 }) + D.line(tubeX.H + tw, 330, 222, 330, { stroke: C.axis, width: 2.5 }) +
    D.rect(278, 306, tubeX.O - 278, 24, { fill: WATER, stroke: "none" }) + D.line(278, 306, tubeX.O, 306, { stroke: C.axis, width: 2.5 }) + D.line(278, 330, tubeX.O, 330, { stroke: C.axis, width: 2.5 }) +
    T(250, 14, "dilute sulfuric acid is poured in here", { anchor: "middle", size: 12, fill: C.muted });
  // wires to supply
  b += D.polyline([[142, 330], [142, 372], [190, 372]], { width: 2 }) + D.polyline([[362, 330], [362, 372], [310, 372]], { width: 2 }) +
    D.sym.cell(250, 372) + T(193, 366, "−", { size: 16, weight: 700, anchor: "end" }) + T(307, 366, "+", { size: 16, weight: 700 }) +
    T(250, 404, "d.c. supply", { anchor: "middle", size: 13, fill: C.muted });
  // readings
  b += T(20, 70 + vH * per - 30, "hydrogen\n40.0 cm³", { size: 14, weight: 700, fill: C.blue }) + T(450, 70 + vO * per - 20, "oxygen\n20.0 cm³", { size: 14, weight: 700, fill: C.red });
  await put("electrolysis-hofmann-voltameter", 560, 420, b.replaceAll(/D\.text/g, "T"),
    "Hofmann voltameter electrolysing acidified water: hydrogen collects at the negative electrode and oxygen at the positive electrode, and the volume of hydrogen, 40.0 cm3, is twice the volume of oxygen, 20.0 cm3, which shows the formula of water is H2O.",
    "Figure: a Hofmann voltameter; the gas volumes are read from the scale beside each tube", "electrochemistry/electrolysis-of-solutions", "### Deducing the formula of water (ZIMSEC)");
}

// ---------- aluminium cell
{
  const b = D.rect(100, 120, 360, 190, { fill: "#d8d4cf", stroke: C.ink, width: 3 }) + D.rect(115, 135, 330, 160, { fill: "#fbe3c8", stroke: "none" }) +
    D.rect(115, 262, 330, 33, { fill: "#cfd5d8", stroke: C.muted, width: 1.2 }) +
    // anodes
    D.rect(170, 60, 60, 160, { fill: ELECTRODE, stroke: C.ink, width: 1.5 }) + D.rect(330, 60, 60, 160, { fill: ELECTRODE, stroke: C.ink, width: 1.5 }) +
    D.line(200, 60, 200, 30, { width: 3 }) + D.line(360, 60, 360, 30, { width: 3 }) + D.line(200, 30, 360, 30, { width: 3 }) + D.line(280, 30, 280, 10, { width: 3 }) +
    T(292, 18, "to + terminal", { size: 13 }) +
    bub([[185, 235], [205, 245], [345, 235], [378, 250]], 4).replace("", "") +
    T(110, 54, "carbon anodes (+)", { size: 14, weight: 700 }) + D.arrow(150, 60, 175, 90, { stroke: C.muted, width: 1.3 }) +
    D.line(100, 310, 60, 310, { width: 3 }) + D.line(60, 310, 60, 340, { width: 3 }) + T(20, 360, "to − terminal", { size: 13 }) +
    T(470, 200, "carbon lining of the\nsteel tank = cathode (−)", { size: 13, weight: 700 }) + D.arrow(466, 196, 448, 180, { stroke: C.muted, width: 1.3 }).replace("", "") +
    T(470, 150, "Al₂O₃ dissolved in molten\ncryolite, about 950 °C", { size: 13, fill: C.amber, weight: 700 }) + D.arrow(466, 146, 400, 160, { stroke: C.amber, width: 1.3 }) +
    T(470, 270, "molten aluminium\n(tapped off)", { size: 13, weight: 700 }) + D.arrow(466, 270, 430, 280, { stroke: C.muted, width: 1.3 }) +
    T(130, 340, "At the anode: 2O²⁻ → O₂ + 4e⁻; the oxygen burns the carbon: C + O₂ → CO₂", { size: 13, fill: C.red }) +
    T(130, 360, "At the cathode: Al³⁺ + 3e⁻ → Al", { size: 13, fill: C.blue });
  await put("aluminium-electrolysis-cell", 640, 380, b.replace("T(", "T("),
    "Electrolysis cell for aluminium: purified aluminium oxide dissolved in molten cryolite at about 950 degrees Celsius in a steel tank lined with carbon, which is the negative cathode; carbon anodes dip in from above; aluminium ions gain electrons to form molten aluminium that sinks to the bottom and is tapped off, oxide ions lose electrons to form oxygen which burns the carbon anodes away as carbon dioxide.",
    "Figure: the cell used to extract aluminium", "metals/aluminium-extraction", "## The electrolysis cell (Supplement)");
}

// ---------- copper-plating an iron key
{
  const b = D.sym.wire([[190, 50], [190, 110]]) + D.sym.wire([[190, 50], [240, 50]]) + D.sym.cell(270, 50) + D.sym.wire([[300, 50], [370, 50], [370, 110]]) +
    T(224, 40, "−", { size: 18, weight: 700, anchor: "end" }) + T(316, 40, "+", { size: 18, weight: 700 }) + T(270, 22, "d.c. supply", { anchor: "middle", size: 13, fill: C.muted }) +
    beaker(110, 190, 340, 150, 110, "#bfe0f2") +
    // key (cathode) on left
    D.rect(185, 108, 10, 160, { fill: "#a8aeb2", stroke: C.ink, width: 1.5 }) + D.circle(190, 280, 14, { fill: "none", stroke: C.ink, width: 3 }).replace("", "") +
    D.rect(178, 255, 24, 26, { fill: "#d98f62", stroke: C.ink, width: 1.2 }) +
    // anode: copper strip right
    D.rect(366, 108, 10, 170, { fill: "#d98f62", stroke: C.ink, width: 1.5 }) +
    T(176, 150, "iron key =\ncathode (−)", { anchor: "end", size: 13, weight: 700 }) +
    T(392, 150, "copper =\nanode (+)", { size: 13, weight: 700 }) +
    T(280, 255, "copper(II) sulfate\nsolution", { anchor: "middle", size: 13, fill: C.blue, weight: 700 }) +
    T(468, 200, "Cathode:\nCu²⁺ + 2e⁻ → Cu\n(copper coats the key)", { size: 13, fill: C.blue }) + T(468, 270, "Anode:\nCu → Cu²⁺ + 2e⁻\n(the anode dissolves)", { size: 13, fill: C.amber });
  await put("electroplating-copper-key-cell", 660, 360, b,
    "Cell for copper-plating an iron key: the key is connected to the negative terminal and is the cathode, a strip of copper joined to the positive terminal is the anode, and the electrolyte is copper(II) sulfate solution; copper ions gain electrons and coat the key while the copper anode dissolves to replace them.",
    "Figure: the object to be plated is the cathode and the anode is the plating metal", "electrochemistry/electroplating-and-refining", "## How to electroplate an object");
}

// ---------- zinc-copper simple cell
{
  const b = beaker(120, 200, 300, 140, 100, "#e3eef3") +
    D.rect(190, 120, 22, 190, { fill: "#b9bfc3", stroke: C.ink, width: 1.5 }) + D.rect(330, 120, 22, 190, { fill: "#d98f62", stroke: C.ink, width: 1.5 }) +
    D.polyline([[201, 120], [201, 80], [250, 80]], { width: 2 }) + D.polyline([[341, 120], [341, 80], [292, 80]], { width: 2 }) + D.sym.meter(271, 80, "V") +
    T(184, 150, "zinc (−)", { anchor: "end", size: 14, weight: 700 }) + T(358, 150, "copper (+)", { size: 14, weight: 700 }) +
    D.arrow(210, 66, 244, 66, { stroke: C.red, width: 2 }) + D.arrow(292, 66, 328, 66, { stroke: C.red, width: 2 }) + T(270, 48, "electrons flow from zinc to copper", { anchor: "middle", size: 13, fill: C.red, weight: 700 }) +
    bub([[330, 250], [348, 235], [338, 270], [356, 215]], 4) + T(430, 240, "H₂ bubbles:\n2H⁺ + 2e⁻ → H₂", { size: 13, fill: C.blue, weight: 700 }) +
    T(20, 250, "Zn → Zn²⁺ + 2e⁻\n(zinc dissolves)", { size: 13, fill: C.amber, weight: 700 }) +
    T(270, 330, "dilute sulfuric acid (electrolyte)", { anchor: "middle", size: 13, fill: C.muted });
  await put("simple-cell-zinc-copper", 600, 360, b,
    "A simple cell: a zinc strip and a copper strip in dilute sulfuric acid joined through a voltmeter; zinc, the more reactive metal, loses electrons and dissolves, so it is the negative electrode, the electrons flow through the wire from zinc to copper, and hydrogen ions gain electrons at the copper, which is the positive electrode, forming hydrogen bubbles.",
    "Figure: a zinc–copper cell; electrons flow through the wire from the more reactive metal", "electrochemistry/cells-and-batteries", "## Building a zinc–copper cell");
}
