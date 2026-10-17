// Run from repo root: node .scratch/chemistry-o/diagrams/stoich2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";

// ---- titres and mean (titration-calculations, Example 1)
{
  const titres = [["Rough", 21.30, false], ["Trial 1", 20.85, true], ["Trial 2", 20.95, true], ["Trial 3", 20.90, true]];
  const conc = titres.filter((t) => t[2]).map((t) => t[1]);
  const mean = Math.round((conc.reduce((a, b) => a + b, 0) / conc.length) * 100) / 100; // 20.90
  const w = 560, h = 380;
  const ax = D.axes({ x: [0, 4], y: [20.5, 21.5], w, h, xTicks: [], yTicks: [20.6, 20.8, 21.0, 21.2, 21.4], origin: false, arrows: false, yLabel: "Titre / cm³", pad: { l: 64, r: 30, t: 34, b: 56 } });
  let b = ax.frame;
  // concordant band mean +- 0.10
  b += D.rect(ax.X(0), ax.Y(mean + 0.1), ax.X(4) - ax.X(0), ax.Y(mean - 0.1) - ax.Y(mean + 0.1), { fill: C.fillGreen, stroke: "none" });
  b += D.line(ax.X(0), ax.Y(mean), ax.X(4), ax.Y(mean), { stroke: C.green, width: 1.6, dash: true });
  const bw = (ax.X(1) - ax.X(0)) * 0.5;
  titres.forEach(([lab, v, ok], i) => {
    const cx = ax.X(i + 0.5);
    b += D.rect(cx - bw / 2, ax.Y(v), bw, ax.Y(20.5) - ax.Y(v), { fill: ok ? C.teal : "#c9c4bd", stroke: "none" });
    b += T(cx, ax.Y(v) - 7, v.toFixed(2), { anchor: "middle", size: 14, weight: 700 });
    b += T(cx, ax.Y(20.5) + 20, lab, { anchor: "middle", size: 13 });
    if (!ok) b += T(cx, ax.Y(20.5) - 10, "not used", { anchor: "middle", size: 12, fill: C.ink });
  });
  b += D.line(ax.X(4) - 14, ax.Y(21.3) + 4, ax.X(4) - 14, ax.Y(mean), { stroke: C.green, width: 1.4, arrow: false });
  b += D.tag(ax.X(4) - 4, ax.Y(21.3), `mean titre = ${mean.toFixed(2)} cm³`, { anchor: "end", size: 13, stroke: C.green });
  b += T(ax.X(1) + 20, ax.Y(21.43), "green band: within 0.10 cm³ of the mean", { size: 13, fill: C.green });
  await put("titration-titres-mean-concordant", w, h, b,
    `Bar chart of four titres: the rough titre of 21.30 cm3 is left out; the three accurate titres 20.85, 20.95 and 20.90 cm3 are all within 0.10 cm3 of each other, so their mean is ${mean.toFixed(2)} cm3.`,
    "Figure: the rough titre is excluded; the mean of the concordant titres is 20.90 cm³",
    "stoichiometry/titration-calculations", "## A 1 : 1 titration");
}

// ---- mole-method flow with Example 2 values (H2SO4 + 2NaOH)
{
  const w = 600, h = 330;
  const cA = 0.0500, vA = 18.40, vB = 25.0;
  const nA = (cA * vA) / 1000; // 0.000920
  const nB = 2 * nA;
  const cB = nB / (vB / 1000);
  let b = "";
  const bx = (x, y, ww, hh, s, fill) => D.node(x, y, ww, hh, s, { fill, size: 14 });
  b += bx(20, 20, 250, 70, "Burette: H₂SO₄\nc = 0.0500 mol/dm³\nmean titre = 18.40 cm³", C.fillBlue);
  b += bx(330, 20, 250, 70, "Flask: NaOH, c unknown\npipette volume = 25.0 cm³", C.fillAmber);
  b += D.arrow(145, 90, 145, 130, { stroke: C.blue });
  b += bx(20, 130, 250, 62, `n(H₂SO₄) = c × V\n= 0.0500 × 0.01840\n= ${nA.toFixed(6)} mol`, C.fillBlue);
  b += T(300, 156, "× 2", { anchor: "middle", size: 16, weight: 700 });
  b += T(300, 176, "(1 : 2)", { anchor: "middle", size: 13, fill: C.muted });
  b += D.arrow(272, 161, 328, 161, { stroke: C.amber });
  b += bx(330, 130, 250, 62, `n(NaOH) = 2 × ${nA.toFixed(6)}\n= ${nB.toFixed(5)} mol`, C.fillAmber);
  b += D.arrow(455, 192, 455, 232, { stroke: C.amber });
  b += bx(330, 232, 250, 62, `c(NaOH) = n ÷ V\n= ${nB.toFixed(5)} ÷ 0.0250\n= ${cB.toFixed(4)} mol/dm³`, C.fillGreen);
  b += T(20, 262, "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O", { size: 14, weight: 700 });
  b += T(20, 284, "Volumes are converted from cm³ to dm³ (÷ 1000).", { size: 13, fill: C.muted });
  await put("titration-mole-method-flow", w, h, b,
    `Mole method for Example 2: 18.40 cm3 of 0.0500 mol/dm3 sulfuric acid contains ${nA.toFixed(6)} mol; the 1 : 2 ratio gives ${nB.toFixed(5)} mol of sodium hydroxide in 25.0 cm3, so its concentration is ${cB.toFixed(4)} mol/dm3.`,
    "Figure: from burette reading to unknown concentration, using the 1 : 2 mole ratio",
    "stoichiometry/titration-calculations", "## Ratios that are not 1 : 1");
}

// ---- molar gas volume: equal volumes, different masses
{
  const w = 600, h = 300;
  const gases = [["H₂", 2, C.fillBlue], ["O₂", 32, C.fillAmber], ["CO₂", 44, C.fillGreen], ["CH₄", 16, C.fillGrey]];
  let b = T(w / 2, 24, "1 mole of each gas at r.t.p. fills the same volume: 24 dm³", { anchor: "middle", size: 15, weight: 700 });
  const bw = 112, gap = 24, x0 = (w - (4 * bw + 3 * gap)) / 2, y0 = 44;
  gases.forEach(([f, m, fill], i) => {
    const x = x0 + i * (bw + gap);
    b += D.rect(x, y0, bw, bw, { fill, stroke: C.axis, r: 4 });
    b += T(x + bw / 2, y0 + 46, f, { anchor: "middle", size: 22, weight: 700 });
    b += T(x + bw / 2, y0 + 72, "24 dm³", { anchor: "middle", size: 15 });
    b += T(x + bw / 2, y0 + 94, "1 mol", { anchor: "middle", size: 14, fill: C.muted });
    b += T(x + bw / 2, y0 + bw + 24, `mass = ${m} g`, { anchor: "middle", size: 14, weight: 700 });
  });
  // water for contrast
  b += D.rect(40, 232, 12, 12, { fill: C.fillBlue, stroke: C.axis });
  b += T(60, 243, "For comparison, 1 mol of liquid water (18 g) is only about 18 cm³.", { size: 13, fill: C.muted });
  await put("molar-gas-volume-equal-volumes", w, h, b,
    "Four equal squares: 1 mole of hydrogen (2 g), oxygen (32 g), carbon dioxide (44 g) and methane (16 g) each occupy the same 24 dm3 at r.t.p., so the volume of a gas depends on the number of particles, not on their mass.",
    "Figure: equal numbers of gas molecules take the same volume, whatever their mass",
    "stoichiometry/molar-gas-volume", "## Why every gas has the same molar volume");
}

// ---- reacting volumes: CH4 + 2O2 -> CO2 + 2H2O(l)
{
  const w = 600, h = 250;
  const v = 50;
  const unit = 1.6; // px per cm3
  const items = [["CH₄", v, C.fillGrey], ["+ O₂", 2 * v, C.fillAmber], ["CO₂", v, C.fillGreen]];
  let b = T(20, 24, "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)", { size: 15, weight: 700 });
  let x = 20;
  const y = 60, hh = 70;
  const pos = [20, 20 + v * unit + 70, 20 + v * unit + 70 + 2 * v * unit + 70];
  items.forEach(([lab, vol, fill], i) => {
    b += D.rect(pos[i], y, vol * unit, hh, { fill, stroke: C.axis, r: 3 });
    b += T(pos[i] + (vol * unit) / 2, y + 32, lab.replace("+ ", ""), { anchor: "middle", size: 18, weight: 700 });
    b += T(pos[i] + (vol * unit) / 2, y + 54, `${vol} cm³`, { anchor: "middle", size: 14 });
  });
  b += T(pos[0] + v * unit + 35, y + 42, "+", { anchor: "middle", size: 24 });
  b += T(pos[1] + 2 * v * unit + 35, y + 42, "→", { anchor: "middle", size: 24 });
  b += T(20, 172, "Volume ratio CH₄ : O₂ : CO₂ = 1 : 2 : 1, the same as the coefficients.", { size: 14 });
  b += T(20, 196, "The water is a liquid at r.t.p., so it adds no gas volume.", { size: 14 });
  await put("molar-gas-volume-reacting-volumes", w, h, b,
    "Reacting volumes: 50 cm3 of methane burns in 100 cm3 of oxygen to give 50 cm3 of carbon dioxide, a volume ratio of 1 : 2 : 1 matching the equation; liquid water adds no gas volume.",
    "Figure: for gases the equation coefficients are the volume ratio (Example 4)",
    "stoichiometry/molar-gas-volume", "## Volumes of gases in reactions");
}
