// chemistry-a analysis: mass spectra, TLC, proton NMR. Run: node .scratch/chemistry-a/diagrams/analysis.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

/** Stick (mass) spectrum: peaks [{x, h, label, color}] */
function stick(opts, peaks) {
  const ax = D.axes({ ...opts, w: 600, h: 380, pad: { l: 60, r: 24, t: 40, b: 58 } });
  let body = ax.frame;
  for (const p of peaks) {
    body += D.line(ax.X(p.x), ax.Y(0), ax.X(p.x), ax.Y(p.h), { stroke: p.color ?? C.blue, width: 5 });
    body += D.text(ax.X(p.x), ax.Y(p.h) - 22, p.top, { anchor: "middle", size: 13, weight: 700, fill: p.color ?? C.blue });
    if (p.label) body += D.text(ax.X(p.x), ax.Y(p.h) - 7, p.label, { anchor: "middle", size: 12, fill: C.muted });
  }
  return body;
}

// ---- boron: Example 1 (m/e 10: 19.9, m/e 11: 80.1)
{
  const body = stick({ x: [8, 13], y: [0, 100], xTicks: 1, yTicks: 20, xLabel: "m/e", yLabel: "Relative abundance" }, [
    { x: 10, h: 19.9, top: "19.9", label: "¹⁰B⁺" }, { x: 11, h: 80.1, top: "80.1", label: "¹¹B⁺" }]);
  const alt = "Mass spectrum of boron: a short peak at m/e 10 with relative abundance 19.9 and a tall peak at m/e 11 with relative abundance 80.1, giving a relative atomic mass of about 10.8.";
  const cap = "Figure: mass spectrum of boron; each peak is one isotope and its height is its abundance";
  await D.figure(F, "mass-spectrum-boron", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(L("analysis/mass-spectrometry"), "If the abundances are given as peak heights", D.md("mass-spectrum-boron", alt, cap));
}
// ---- butanone: Example 2
{
  const body = stick({ x: [0, 85], y: [0, 115], xTicks: 10, yTicks: [0, 20, 40, 60, 80, 100], xLabel: "m/e", yLabel: "Relative abundance" }, [
    { x: 29, h: 15, top: "15", label: "C₂H₅⁺" }, { x: 43, h: 100, top: "100", label: "CH₃CO⁺ (base peak)" },
    { x: 57, h: 8, top: "8", label: "C₂H₅CO⁺" }, { x: 72, h: 20, top: "20", label: "M⁺", color: C.amber }]);
  const alt = "Mass spectrum of butanone (Mr 72): peaks at m/e 29 (abundance 15, C2H5+), 43 (100, the base peak, CH3CO+), 57 (8, C2H5CO+) and 72 (20, the molecular ion), so the highest m/e is the relative molecular mass and the tallest peak is not the molecular ion.";
  const cap = "Figure: mass spectrum of butanone; the molecular ion is at m/e 72 and the base peak at 43";
  await D.figure(F, "mass-spectrum-butanone", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(L("analysis/mass-spectrometry"), "The isomer butanal, $", D.md("mass-spectrum-butanone", alt, cap));
}
// ---- chloroethane M and M+2, 3:1
{
  const body = stick({ x: [60, 70], y: [0, 4], xTicks: 2, yTicks: [0, 1, 2, 3, 4], xLabel: "m/e", yLabel: "Relative height" }, [
    { x: 64, h: 3, top: "3", label: "C₂H₅³⁵Cl⁺ (M)" }, { x: 66, h: 1, top: "1", label: "C₂H₅³⁷Cl⁺ (M+2)", color: C.amber }]);
  const alt = "Mass spectrum pattern of chloroethane: molecular ion peaks at m/e 64 (C2H5 with chlorine-35) and 66 (chlorine-37) in the height ratio 3 to 1, the signature of one chlorine atom.";
  const cap = "Figure: one chlorine atom gives M and M+2 peaks in the ratio 3 : 1";
  await D.figure(F, "mass-spectrum-chloroethane", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(L("analysis/mass-spectrometry"), "For example, chloroethane", D.md("mass-spectrum-chloroethane", alt, cap));
}

// ---- TLC plate for Example 2 (front 7.5 cm; P 1.8, Q 4.2, R 6.0, S 1.8 and 6.0)
{
  const w = 560, h = 360, s = 30, base = 40, bot = 320; // px per cm; baseline y = bot - 1cm*s ... plate bottom at bot
  const yB = bot - 30; // baseline 1.0 cm above the bottom edge
  const Y = (d) => yB - d * s; // d cm from baseline
  const lanes = [["P", 90, [1.8]], ["Q", 150, [4.2]], ["R", 210, [6.0]], ["S", 270, [1.8, 6.0]]];
  let body = D.rect(60, Y(7.5) - 24, 250, bot - (Y(7.5) - 24), { fill: C.fillGrey, stroke: C.axis, width: 2 });
  body += D.line(60, yB, 310, yB, { stroke: C.muted, width: 1.4, dash: true }) + D.text(316, yB + 5, "baseline (0 cm)", { size: 13 });
  body += D.line(60, Y(7.5), 310, Y(7.5), { stroke: C.blue, width: 1.6 }) + D.text(316, Y(7.5) + 5, "solvent front: 7.5 cm", { size: 13, fill: C.blue, weight: 700 });
  for (const [name, x, ds] of lanes) {
    body += D.text(x, bot + 20, name, { anchor: "middle", size: 15, weight: 700 }) + D.dot(x, yB, { r: 3, stroke: C.muted });
    for (const d of ds) body += `<ellipse cx="${x}" cy="${Y(d)}" rx="12" ry="9" fill="${name === "S" ? C.fillAmber : C.fillBlue}" stroke="${name === "S" ? C.amber : C.blue}" stroke-width="2"/>`;
  }
  const rf = (d) => (d / 7.5).toFixed(2);
  body += D.line(300, yB, 300, Y(6.0), { stroke: C.amber, width: 1.8, arrow: true, arrowStart: true }).replace("</line>", "") + D.text(322, Y(3.0) + 5, "R moved 6.0 cm", { size: 13, fill: C.amber }) + D.text(322, Y(3.0) + 22, `Rf = 6.0 ÷ 7.5 = ${rf(6.0)}`, { size: 13, fill: C.amber, weight: 700 });
  body += D.text(322, Y(6.5) + 5, "S: spots match P and R", { size: 13 }) + D.text(322, Y(6.5) + 21, "(Rf 0.24 and 0.80)", { size: 13 });
  body += D.text(8, 22, "Rf: P 0.24  Q 0.56  R 0.80", { size: 13, fill: C.muted });
  const alt = "TLC plate with solvent front 7.5 cm above the baseline: reference dyes P, Q and R have spots at 1.8, 4.2 and 6.0 cm (Rf 0.24, 0.56 and 0.80) and the mixture S has two spots at 1.8 cm and 6.0 cm, matching P and R, so S contains P and R but not Q.";
  const cap = "Figure: TLC plate for the food-colouring example; spots are compared by Rf on the same plate";
  await D.figure(F, "tlc-plate-dyes", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("analysis/chromatography-tlc"), "- **Following a reaction.**", D.md("tlc-plate-dyes", alt, cap));
}

// ---- ethanol proton NMR: CH3 triplet (3H), CH2 quartet (2H), OH singlet (1H); typical shifts within the lesson table ranges
{
  const sh = { ch3: 1.2, oh: 2.6, ch2: 3.7 };
  const ax = D.axes({ x: [0, 12.6], y: [0, 2.3], xTicks: [0, 2, 4, 6, 8, 10, 12], yTicks: [], tickLabels: true, xLabel: "δ / ppm", yLabel: "", w: 600, h: 360, pad: { l: 30, r: 24, t: 56, b: 62 }, xFormat: (v) => String(12 - v) });
  const X = (d) => ax.X(12 - d);
  const sp = 0.14; // splitting in ppm
  const multi = (d, ints, area) => { // intensities sum to `area` in height units
    const tot = ints.reduce((a, b) => a + b, 0), n = ints.length;
    return ints.map((v, i) => { const x = X(d + (i - (n - 1) / 2) * sp), hgt = (v / tot) * area; return D.line(x, ax.Y(0), x, ax.Y(hgt * 1.0), { stroke: C.blue, width: 3.5 }); }).join("");
  };
  let body = ax.frame.replace(/<text[^>]*>(?:<tspan[^>]*>0<\/tspan>)<\/text>/, (m) => m);
  body += multi(sh.ch3, [1, 2, 1], 3.0 * 1.0) + multi(sh.ch2, [1, 3, 3, 1], 2.0 * 1.0) + multi(sh.oh, [1], 1.0);
  body += D.line(X(0), ax.Y(0), X(0), ax.Y(1.2), { stroke: C.muted, width: 3.5 }) + D.text(X(0), ax.Y(1.2) - 8, "TMS", { anchor: "middle", size: 13, fill: C.muted });
  body += D.text(X(sh.ch3), ax.Y(1.5) - 40, "CH₃", { anchor: "middle", size: 14, weight: 700 }) + D.text(X(sh.ch3), ax.Y(1.5) - 24, "triplet, area 3", { anchor: "middle", size: 13, fill: C.blue });
  body += D.text(X(sh.ch2), ax.Y(0.75) - 26, "CH₂", { anchor: "middle", size: 14, weight: 700 }) + D.text(X(sh.ch2), ax.Y(0.75) - 10, "quartet, area 2", { anchor: "middle", size: 13, fill: C.blue });
  body += D.text(X(sh.oh) + 4, ax.Y(1.0) - 54, "OH", { anchor: "middle", size: 14, weight: 700 }) + D.text(X(sh.oh) + 4, ax.Y(1.0) - 38, "singlet, area 1", { anchor: "middle", size: 13, fill: C.blue });
  body += D.text(300, 346, "Spectrum runs from high δ (left) to low δ (right); shifts are typical values", { anchor: "middle", size: 12, fill: C.muted });
  const alt = "Schematic proton NMR spectrum of ethanol: a triplet for CH3 near 1.2 ppm with area 3, a singlet for OH near 2.6 ppm with area 1, and a quartet for CH2 near 3.7 ppm with area 2; the n + 1 rule gives the splitting, and TMS is the reference at 0 ppm.";
  const cap = "Figure: schematic proton NMR spectrum of ethanol (areas 3 : 2 : 1)";
  await D.figure(F, "proton-nmr-ethanol", D.svg(600, 360, body), { alt, caption: cap });
  D.insertAfter(L("analysis/proton-nmr"), "Three signals, areas 3 : 2 : 1.", D.md("proton-nmr-ethanol", alt, cap));
}
