// Run from repo root: node .scratch/chemistry-o/diagrams/organic3.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker, tube, conical, WATER } from "./_h.mjs";

// ---- cracking liquid paraffin in the laboratory
{
  const w = 600, h = 340;
  let b = "";
  // trough with water
  b += D.rect(300, 245, 280, 70, { fill: WATER, stroke: "none" });
  b += D.polyline([[298, 225], [298, 316], [582, 316], [582, 225]], { stroke: C.axis, width: 2 });
  b += T(440, 300, "water in trough", { size: 12, fill: C.muted });
  // inverted collecting tube
  b += D.rect(341, 196, 38, 98, { fill: WATER, stroke: "none" });
  b += D.polyline([[340, 294], [340, 172], [380, 172], [380, 294]], { stroke: C.axis, width: 2 });
  b += T(390, 186, "gas collected\nover water", { size: 12 });
  // boiling tube
  b += D.path_("M262,110 L86,110 A26,26 0 0 0 86,162 L262,162", { stroke: C.axis, width: 2 });
  b += D.rect(70, 114, 60, 44, { fill: "#e9dcc3", stroke: "none" });
  b += T(60, 80, "mineral wool soaked in\nliquid paraffin", { size: 12 });
  b += D.rect(160, 114, 56, 44, { fill: "#d9d4cc", stroke: C.muted, width: 1 });
  for (let i = 0; i < 6; i += 1) b += D.circle(168 + (i % 3) * 18, 126 + Math.floor(i / 3) * 20, 5, { fill: "#b9b1a5", stroke: C.muted, width: 1 });
  b += T(188, 100, "catalyst", { anchor: "middle", size: 12, weight: 700 });
  b += D.rect(262, 106, 14, 60, { fill: C.fillAmber, stroke: C.axis, width: 1.6 });
  // delivery tube
  b += D.polyline([[276, 136], [320, 136], [320, 306], [360, 306], [360, 240]], { stroke: C.axis, width: 2 });
  // flame
  b += D.polyline([[176, 212], [188, 184], [200, 212]], { fill: C.fillAmber, stroke: C.amber, width: 2, close: true });
  b += T(188, 232, "heat the catalyst\nstrongly", { anchor: "middle", size: 12, weight: 700, fill: C.red });
  b += T(20, 28, "Long-chain alkanes (liquid paraffin) vapour over a hot catalyst", { size: 14, weight: 700 });
  b += T(20, 50, "gives shorter alkanes and alkenes; the gas decolourises bromine water.", { size: 13 });
  await put("cracking-laboratory-apparatus", w, h, b,
    "Laboratory cracking: liquid paraffin on mineral wool is vaporised over a strongly heated catalyst in a hard-glass tube; the gas formed, containing alkenes, is collected over water and turns bromine water from orange to colourless.",
    "Figure: cracking liquid paraffin over a hot catalyst, collecting the gas over water",
    "organic/cracking", "## Cracking in the laboratory");
}

// ---- fermentation apparatus
{
  const w = 600, h = 360;
  let b = "";
  b += conical(150, 120, 22, 76, 44, 150, 200, "#f1e7c8");
  b += D.rect(138, 112, 24, 14, { fill: C.fillAmber, stroke: C.axis, width: 1.6 });
  b += D.polyline([[155, 112], [155, 80], [330, 80], [330, 250]], { stroke: C.axis, width: 2 });
  b += tube(330, 150, 64, 130, 70, "#e8edf0");
  b += D.polyline([[155, 80], [155, 80]], { stroke: C.axis });
  for (let i = 0; i < 4; i += 1) b += D.circle(326 + (i % 2) * 8, 246 - i * 14, 3, { fill: "#fff", stroke: C.muted, width: 1.2 });
  b += T(150, 250, "yeast + glucose"+"\n"+"solution", { anchor: "middle", size: 13, weight: 700 });
  b += T(20, 40, "kept at 25–35 °C", { size: 14, weight: 700 });
  b += T(16, 290, "sealed from the air:\nno oxygen (anaerobic)", { size: 13 });
  b += T(376, 190, "limewater turns milky:\ncarbon dioxide is made", { size: 13 });
  b += T(20, 336, "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂      (yeast enzymes are the catalyst)", { size: 14, weight: 700 });
  await put("fermentation-glucose-apparatus", w, h, b,
    "Fermentation apparatus: yeast in glucose solution at 25 to 35 degrees Celsius in a flask closed to the air (anaerobic); the carbon dioxide made, 2 mol for each mole of glucose, bubbles through limewater and turns it milky while ethanol stays in the flask.",
    "Figure: fermenting glucose with yeast, with the gas tested using limewater",
    "organic/making-ethanol", "## Method 1: fermentation");
}

// ---- strong and weak acid particles
{
  const w = 600, h = 320;
  let b = "";
  const ion = (x, y, s, plus) => D.circle(x, y, 13, { fill: plus ? C.fillAmber : C.fillBlue, stroke: plus ? C.amber : C.blue, width: 1.6 }) + T(x, y + 4, s, { anchor: "middle", size: 11, weight: 700 });
  b += D.rect(10, 40, 280, 200, { fill: "#fbf8f2", stroke: C.muted, width: 1 });
  b += D.rect(310, 40, 280, 200, { fill: "#fbf8f2", stroke: C.muted, width: 1 });
  b += T(20, 24, "Hydrochloric acid (strong)", { size: 14, weight: 700 }) + T(320, 24, "Ethanoic acid (weak)", { size: 14, weight: 700 });
  // strong: 8 pairs of ions, no whole molecules
  const pos = [[44, 76], [114, 70], [184, 84], [250, 72], [60, 130], [140, 144], [214, 134], [264, 124], [46, 190], [112, 200], [186, 196], [252, 190]];
  pos.slice(0, 12).forEach(([x, y], i) => { b += ion(x, y, i % 2 ? "Cl⁻" : "H⁺", i % 2 === 0); });
  // weak: molecules as small rounded boxes, one pair of ions
  const mol = [[330, 62], [440, 62], [330, 106], [440, 106], [330, 150], [440, 150], [330, 194], [440, 194]];
  mol.forEach(([x, y]) => { b += D.rect(x, y, 92, 26, { fill: C.fillGrey, stroke: C.axis, width: 1.4, r: 6 }) + T(x + 46, y + 18, "CH₃COOH", { anchor: "middle", size: 12 }); });
  b += ion(548, 100, "H⁺", true) + ion(552, 160, "A⁻", false);
  b += T(10, 266, "Every HCl molecule has split into H⁺ and Cl⁻ ions.", { size: 13 });
  b += T(310, 266, "Most CH₃COOH molecules stay whole; only a", { size: 13 }) + T(310, 284, "few split into ions (A⁻ = CH₃COO⁻).", { size: 13 });
  b += T(310, 302, "About 1 in 100 in 0.1 mol/dm³; not to scale.", { size: 13, fill: C.muted });
  await put("strong-weak-acid-particles", w, h, b,
    "Particle pictures: hydrochloric acid, a strong acid, is completely split into H+ and Cl- ions; ethanoic acid, a weak acid, is mostly whole CH3COOH molecules with only a few (about 1 in 100) split into H+ and CH3COO- ions, so it has fewer hydrogen ions and a higher pH.",
    "Figure: a strong acid is fully dissociated, a weak acid only partly",
    "acids/strong-and-weak-acids", "## Strong and weak acids");
}
