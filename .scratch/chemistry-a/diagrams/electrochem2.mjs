// chemistry-a: electrolysis cells and fuel cell. Run: node .scratch/chemistry-a/diagrams/electrochem2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, fig } from "./_m.mjs";
const NL = "\n";
const plate = (x, y1, y2, fill, w = 12) => D.rect(x - w / 2, y1, w, y2 - y1, { fill, stroke: C.ink, width: 1.8 });

// ---- membrane cell for brine
{
  const w = 680, h = 420;
  let s = D.rect(150, 90, 400, 230, { fill: "#fff", stroke: C.ink, width: 2.4 }) + D.rect(152, 130, 196, 188, { fill: C.fillBlue, stroke: "none" }) + D.rect(352, 130, 196, 188, { fill: C.fillGreen, stroke: "none" }) +
    D.line(350, 90, 350, 320, { stroke: C.purple, width: 5, dash: "3 4" }) + D.text(350, 340, "ion-exchange membrane", { anchor: "middle", size: 13, fill: C.purple });
  s += plate(235, 110, 300, C.fillGrey) + plate(465, 110, 300, C.fillGrey);
  s += D.text(235, 372, "anode (+)" + NL + "coated titanium", { anchor: "middle", size: 13 }) + D.text(465, 372, "cathode (−)" + NL + "nickel or steel", { anchor: "middle", size: 13 });
  s += D.sym.wire([[235, 110], [235, 40], [320, 40]]) + D.sym.cell(350, 40, {}) + D.sym.wire([[380, 40], [465, 40], [465, 110]]);
  s += D.arrow(150, 112, 70, 112, { width: 2.2 }) + D.text(110, 102, "Cl₂ out", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(70, 230, 150, 230, { width: 2.2 }) + D.text(110, 220, "brine in", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(550, 112, 630, 112, { width: 2.2 }) + D.text(590, 102, "H₂ out", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(630, 170, 550, 170, { width: 2.2 }) + D.text(590, 160, "water in", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(550, 262, 640, 262, { width: 2.2 }) + D.text(595, 250, "NaOH(aq)", { anchor: "middle", size: 14, weight: 600 }) + D.text(595, 282, "out", { anchor: "middle", size: 14, weight: 600 });
  s += D.arrow(300, 290, 400, 290, { stroke: C.red, width: 2.4 }) + D.text(300, 280, "Na⁺", { anchor: "middle", size: 14, fill: C.red, weight: 700 });
  s += D.text(180, 160, "Cl⁻", { size: 13, fill: C.muted }) + D.text(500, 160, "OH⁻", { size: 13, fill: C.muted });
  s += D.text(20, 410, "anode: 2Cl⁻ → Cl₂ + 2e⁻   |   cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻", { size: 14, weight: 600 });
  const alt = "Membrane cell for brine: concentrated sodium chloride enters the anode compartment where chloride ions form chlorine (2Cl- to Cl2 + 2e-); water enters the cathode compartment where hydrogen and hydroxide ions form; sodium ions pass through the ion-exchange membrane to the cathode side to give sodium hydroxide solution, and the membrane keeps chlorine, hydrogen and sodium hydroxide apart.";
  const cap = "Figure: membrane cell producing chlorine, hydrogen and sodium hydroxide from brine";
  await fig("membrane-cell-brine", w, h, s, alt, cap, "electrochem/industrial-electrolysis", "Concentrated sodium chloride solution (brine) is electrolysed");
}
// ---- aluminium cell
{
  const w = 640, h = 420;
  let s = D.rect(110, 120, 420, 220, { fill: C.fillGrey, stroke: C.ink, width: 3 }) + D.rect(130, 140, 380, 180, { fill: C.fillAmber, stroke: C.muted, width: 2 }) + D.rect(130, 280, 380, 40, { fill: "#d9e2e8", stroke: "none" }) + D.line(130, 280, 510, 280, { stroke: C.blue, width: 1.5, dash: true });
  s += D.rect(170, 70, 60, 150, { fill: "#3b3833", stroke: C.ink, width: 1.5, r: 2 }) + D.rect(410, 70, 60, 150, { fill: "#3b3833", stroke: C.ink, width: 1.5, r: 2 }) + D.line(150, 70, 490, 70, { stroke: C.ink, width: 4 }) + D.text(110, 56, "carbon anodes (+)", { anchor: "start", size: 14, weight: 600 }) +
    D.text(320, 252, "alumina dissolved in molten cryolite, about 950 °C", { anchor: "middle", size: 14 }) + D.text(320, 304, "molten aluminium", { anchor: "middle", size: 14, weight: 600, fill: C.blue });
  s += D.text(120, 362, "carbon lining of the steel cell: cathode (−)", { size: 14, weight: 600 }) + D.arrow(532, 306, 600, 306, { stroke: C.blue, width: 2.4 }) + D.text(566, 292, "tapped off", { anchor: "middle", size: 13, fill: C.blue }) +
    D.arrow(320, 70, 320, 22, { width: 2.4 }) + D.text(330, 36, "CO₂ (anode burns away)", { size: 13 }) + D.text(60, 400, "cathode: Al³⁺ + 3e⁻ → Al   |   anode: 2O²⁻ → O₂ + 4e⁻, then C + O₂ → CO₂", { size: 14, weight: 600 });
  const alt = "Electrolysis cell for aluminium: carbon anodes dip into alumina dissolved in molten cryolite at about 950 degrees C inside a carbon-lined steel cell that is the cathode; Al3+ ions are reduced to molten aluminium which collects at the bottom and is tapped off, while oxygen formed at the anodes burns the carbon to CO2, so the anodes are replaced.";
  const cap = "Figure: the aluminium extraction cell (alumina in molten cryolite, carbon electrodes)";
  await fig("aluminium-electrolysis-cell", w, h, s, alt, cap, "electrochem/industrial-electrolysis", "| overall |");
}
// ---- copper refining
{
  const w = 640, h = 420;
  let s = D.rect(100, 120, 440, 200, { fill: C.fillBlue, stroke: C.ink, width: 2.4 }) + D.rect(180, 120, 22, 150, { fill: C.fillAmber, stroke: C.ink, width: 2 }) + D.rect(450, 120, 8, 150, { fill: C.fillAmber, stroke: C.ink, width: 2 });
  s += D.path_("M150,320 Q190,296 230,320 Z", { fill: "#6b6761", stroke: "none" }) + D.text(190, 342, "anode sludge: Ag, Au, Pt", { anchor: "middle", size: 13 }) +
    D.text(182, 86, "impure Cu anode (+)" + NL + "loses mass", { anchor: "end", size: 13, weight: 600 }).replace("<text", "<text") + D.text(464, 86, "pure Cu cathode (−)" + NL + "gains mass", { anchor: "start", size: 13, weight: 600 }) +
    D.text(320, 230, "CuSO₄(aq) + H₂SO₄", { anchor: "middle", size: 14 }) + D.arrow(215, 190, 440, 190, { stroke: C.red, width: 2.4 }) + D.text(330, 180, "Cu²⁺", { anchor: "middle", size: 14, fill: C.red, weight: 700 });
  s += D.sym.wire([[191, 120], [191, 34], [290, 34]]) + D.sym.cell(320, 34, {}) + D.sym.wire([[350, 34], [454, 34], [454, 120]]);
  s += D.text(40, 372, "anode: Cu → Cu²⁺ + 2e⁻ (Zn, Fe, Ni also dissolve and stay as ions)", { size: 13, weight: 600 }) + D.text(40, 394, "cathode: Cu²⁺ + 2e⁻ → Cu (only copper is deposited)", { size: 13, weight: 600 });
  const alt = "Copper refining cell: a thick impure copper anode and a thin pure copper cathode in acidified copper(II) sulfate; copper dissolves from the anode as Cu2+ and is deposited as pure copper on the cathode, so the anode loses mass and the cathode gains mass, while unreactive silver, gold and platinum fall below the anode as anode sludge.";
  const cap = "Figure: electrolytic refining of copper";
  await fig("copper-refining-cell", w, h, s, alt, cap, "electrochem/industrial-electrolysis", "## Refining copper and nickel");
}
// ---- hydrogen-oxygen fuel cell (acidic electrolyte)
{
  const w = 640, h = 400;
  let s = D.rect(140, 110, 80, 170, { fill: C.fillGrey, stroke: C.ink, width: 2 }) + D.rect(290, 110, 80, 170, { fill: C.fillBlue, stroke: C.ink, width: 2 }) + D.rect(440, 110, 80, 170, { fill: C.fillGrey, stroke: C.ink, width: 2 }) +
    D.text(172, 100, "anode (−)", { anchor: "end", size: 14, weight: 600 }) + D.text(490, 100, "cathode (+)", { anchor: "start", size: 14, weight: 600 }) +
    D.text(330, 150, "acid" + NL + "(proton-" + NL + "exchange" + NL + "membrane)", { anchor: "middle", size: 13 }) +
    D.text(180, 190, "porous," + NL + "Pt catalyst", { anchor: "middle", size: 13 }) + D.text(480, 190, "porous," + NL + "Pt catalyst", { anchor: "middle", size: 13 }) +
    D.arrow(90, 190, 138, 190, { width: 2.4 }) + D.text(60, 176, "H₂ in", { anchor: "middle", size: 14, weight: 600 }) + D.arrow(570, 190, 522, 190, { width: 2.4 }) + D.text(592, 176, "O₂ in", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(480, 282, 480, 330, { width: 2.4 }) + D.text(480, 352, "H₂O out", { anchor: "middle", size: 14, weight: 600 }) +
    D.arrow(222, 262, 288, 262, { stroke: C.red, width: 2.4 }) + D.text(255, 254, "H⁺", { anchor: "middle", size: 14, fill: C.red, weight: 700 }) + D.arrow(372, 262, 438, 262, { stroke: C.red, width: 2.4 });
  s += D.sym.wire([[180, 110], [180, 50], [260, 50]]) + D.sym.lamp(290, 50, {}) + D.sym.wire([[320, 50], [480, 50], [480, 110]]) + D.text(320, 22, "electrons through the external circuit: anode to cathode", { anchor: "middle", size: 13, fill: C.blue });
  s += D.text(20, 384, "anode: H₂ → 2H⁺ + 2e⁻   |   cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O   |   E°cell = 1.23 V", { size: 13, weight: 600 });
  const alt = "Hydrogen-oxygen fuel cell with an acidic electrolyte: hydrogen is oxidised at the negative porous platinum-catalysed anode (H2 to 2H+ + 2e-), H+ ions pass through the electrolyte to the positive cathode where oxygen is reduced to water (O2 + 4H+ + 4e- to 2H2O), and electrons travel through the external circuit; the cell potential is 1.23 V.";
  const cap = "Figure: hydrogen-oxygen fuel cell with an acid electrolyte (E°cell = 1.23 V)";
  await fig("hydrogen-fuel-cell", w, h, s, alt, cap, "electrochem/fuel-cells", "### Acidic electrolyte (proton-exchange membrane)");
}
