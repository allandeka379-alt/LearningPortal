// Run from repo root: node .scratch/chemistry-o/diagrams/metals-fuels2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker } from "./_h.mjs";

// ---- ore to metal flow (mineral-processing worked example: copper)
{
  const w = 580, h = 440;
  const steps = [
    ["1  Crushing and grinding", "ore broken to a fine powder:\nmineral grains freed from waste rock", C.fillGrey],
    ["2  Froth flotation", "mineral sticks to air bubbles and floats\nin the froth; waste rock sinks", C.fillBlue],
    ["3  Roasting and smelting", "sulfides to oxides, melted to impure\ncopper; SO₂ captured for sulfuric acid", C.fillAmber],
    ["4  Electrolytic refining", "impure anode, pure cathode:\ncopper over 99.9% pure", C.fillGreen],
    ["5  Value addition", "drawn into wire and made into cables:\nworth more again", C.fillGrey],
  ];
  let b = "";
  steps.forEach(([t, note, fill], i) => {
    const y = 16 + i * 82;
    b += D.node(16, y, 220, 54, t, { fill, size: 14, weight: 700 });
    b += T(256, y + 22, note, { size: 13 });
    if (i < steps.length - 1) b += D.arrow(126, y + 54, 126, y + 82, { width: 2 });
  });
  await put("mineral-processing-ore-to-copper-flow", w, h, b,
    "Flow chart from copper ore to wire: crushing and grinding, froth flotation to concentrate the mineral, roasting and smelting to impure copper (sulfur dioxide captured for sulfuric acid), electrolytic refining to copper over 99.9% pure, then drawing into wire adds more value.",
    "Figure: the stages in processing a copper ore, each step adding value",
    "metals/mineral-processing", "## From ore to metal: the main stages");
}

// ---- copper refining cell
{
  const w = 600, h = 400;
  let b = "";
  const bx = 130, bw = 340, by = 140, bh = 170, liq = 140;
  b += beaker(bx, by, bw, bh, liq, "#cfe6f4");
  b += D.rect(190, 100, 44, 190, { fill: "#e8c9ad", stroke: C.axis });
  b += D.rect(372, 100, 12, 190, { fill: C.amber, stroke: C.axis });
  for (let i = 0; i < 9; i += 1) b += D.circle(190 + i * 5, 303 - (i % 2) * 3, 2.4, { fill: C.muted, stroke: C.muted, width: 1 });
  b += D.sym.cell(300, 52, {});
  b += D.polyline([[212, 100], [212, 52], [270, 52]], { width: 2 });
  b += D.polyline([[330, 52], [378, 52], [378, 100]], { width: 2 });
  b += T(262, 36, "+", { anchor: "middle", size: 18, weight: 700 }) + T(338, 36, "−", { anchor: "middle", size: 18, weight: 700 });
  b += T(10, 112, "Anode (+)\nimpure copper", { size: 14, weight: 700 });
  b += D.line(90, 142, 188, 170, { stroke: C.muted, width: 1.4 });
  b += T(470, 112, "Cathode (−)\npure copper", { size: 14, weight: 700 });
  b += D.line(520, 146, 386, 180, { stroke: C.muted, width: 1.4 });
  b += T(244, 205, "copper(II) sulfate\nsolution, acidified\nwith H₂SO₄", { size: 13 });
  b += T(10, 336, "anode sludge: Ag, Au, Pt\nfall to the bottom", { size: 13 });
  b += D.line(110, 322, 188, 304, { stroke: C.muted, width: 1.4 });
  b += T(300, 352, "Anode:  Cu → Cu²⁺ + 2e⁻      (anode gets thinner)", { anchor: "middle", size: 14 });
  b += T(300, 376, "Cathode:  Cu²⁺ + 2e⁻ → Cu      (cathode grows)", { anchor: "middle", size: 14 });
  await put("copper-refining-electrolytic-cell", w, h, b,
    "Electrolytic refining of copper: the impure copper anode (+) dissolves as Cu2+ ions, pure copper is deposited on the cathode (-), and unreactive silver, gold and platinum fall to the bottom as anode sludge; the electrolyte is acidified copper(II) sulfate solution.",
    "Figure: the cell for refining copper, with the electrode equations",
    "metals/mineral-processing", "## Electrolytic refining of copper and nickel");
}

// ---- destructive distillation of coal
{
  const w = 600, h = 340;
  let b = "";
  b += D.path_("M215,118 L72,118 A22,22 0 0 0 72,162 L215,162", { stroke: C.axis, width: 2 });
  b += D.rect(62, 122, 70, 36, { fill: "#6b6761", stroke: "none" });
  b += T(97, 108, "powdered coal", { anchor: "middle", size: 13 });
  b += D.rect(207, 114, 14, 52, { fill: C.fillAmber, stroke: C.axis, width: 1.6 });
  b += D.arrow(97, 212, 97, 174, { stroke: C.red, width: 3 });
  b += T(97, 234, "heat strongly,\nno air", { anchor: "middle", size: 13, weight: 700, fill: C.red });
  // water bath beaker and liquids first, tube drawn over them
  b += `<path d="M267,252 L323,252 L323,276 A28,28 0 0 1 267,276 Z" fill="#2f2c28"/>`;
  b += D.rect(267, 226, 56, 26, { fill: "#e9dcc3", stroke: "none" });
  b += D.rect(237, 216, 116, 95, { fill: "#d6ecf5", stroke: "none" });
  b += `<path d="M267,252 L323,252 L323,276 A28,28 0 0 1 267,276 Z" fill="#2f2c28"/>`;
  b += D.rect(267, 226, 56, 26, { fill: "#e9dcc3", stroke: "none" });
  b += D.polyline([[236, 196], [236, 312], [354, 312], [354, 196]], { stroke: C.axis, width: 2 });
  b += D.polyline([[221, 140], [265, 140], [265, 276]], { stroke: C.axis, width: 2 });
  b += D.path_("M265,276 A30,30 0 0 0 325,276", { stroke: C.axis, width: 2 });
  b += D.polyline([[325, 276], [325, 180]], { stroke: C.axis, width: 2 });
  b += D.polyline([[319, 176], [325, 148], [331, 176]], { fill: C.fillAmber, stroke: C.amber, width: 2, close: true });
  b += T(250, 330, "cold water", { size: 13, fill: C.muted });
  b += T(372, 236, "black, sticky tar below,\nwatery layer above:\nammonia turns damp red\nlitmus blue", { size: 13 });
  b += D.line(326, 262, 368, 250, { stroke: C.muted, width: 1.2 });
  b += T(352, 134, "coal gas burns at the jet", { size: 13 });
  b += T(30, 28, "Grey, porous coke is left in the tube.", { size: 14, weight: 700 });
  b += T(30, 52, "Yellow-brown smoke passes along the delivery tube.", { size: 13, fill: C.muted });
  await put("coal-destructive-distillation-apparatus", w, h, b,
    "Destructive distillation of coal: powdered coal is heated strongly without air in a hard-glass tube; coke stays behind, black tar and a watery ammoniacal layer condense in a U-tube in cold water, and coal gas burns at the jet.",
    "Figure: laboratory destructive distillation of coal, with the four products",
    "fuels/coal-wood-and-biofuels", "## Destructive distillation of coal");
}

// ---- biogas digester
{
  const w = 600, h = 350;
  const daily = 2.0, frac = 0.6, methane = Math.round(daily * frac * 10) / 10; // 1.2
  let b = "";
  b += `<path d="M170,300 L170,150 Q170,100 300,100 Q430,100 430,150 L430,300 Z" fill="#fff" stroke="${C.axis}" stroke-width="2"/>`;
  b += `<path d="M171,299 L171,176 L429,176 L429,299 Z" fill="#e3d5ba"/>`;
  b += T(300, 232, "slurry: dung + water\nbacteria digest the waste", { anchor: "middle", size: 14 });
  b += T(300, 140, "biogas", { anchor: "middle", size: 15, weight: 700 });
  b += T(300, 160, "(about 60% methane)", { anchor: "middle", size: 13 });
  b += D.polyline([[110, 276], [170, 276]], { width: 2, arrow: true });
  b += T(10, 270, "dung + water\nfed in", { size: 13 });
  b += D.arrow(430, 285, 500, 285, { width: 2 });
  b += T(436, 308, "slurry out:\nfertiliser", { size: 13 });
  b += D.polyline([[300, 100], [300, 50], [480, 50]], { width: 2, arrow: true });
  b += T(486, 46, "to stove\nand lamps", { size: 13 });
  b += T(20, 340, `${daily.toFixed(1)} m³ of biogas a day contains ${frac * 100}% × ${daily.toFixed(1)} = ${methane.toFixed(1)} m³ of methane.`, { size: 13, fill: C.muted });
  b += T(20, 24, "Sealed tank: no oxygen (anaerobic digestion)", { size: 14, weight: 700 });
  await put("biogas-digester-anaerobic", w, h, b,
    `A biogas digester: dung and water are fed into an airtight tank where bacteria break the waste down without oxygen; biogas, about 60% methane, collects at the top and is piped to stoves, and the slurry is drawn off as fertiliser. 2.0 m3 of biogas a day holds ${methane.toFixed(1)} m3 of methane.`,
    "Figure: an airtight biogas digester, with the gas and the fertiliser slurry as products",
    "fuels/coal-wood-and-biofuels", "## Biogas");
}
