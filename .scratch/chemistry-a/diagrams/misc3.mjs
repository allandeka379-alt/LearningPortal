// chemistry-a: addition polymer repeat units, nylon hydrogen bonding, titration apparatus.
// Run: node .scratch/chemistry-a/diagrams/misc3.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, fig } from "./_m.mjs";
const NL = "\n";

// ---- repeat units: poly(propene) (CH3 on every second carbon) and poly(but-2-ene) (CH3 on every carbon)
{
  const w = 600, h = 430;
  const chain = (oy, every, title, unit) => {
    const pts = Array.from({ length: 7 }, (_, i) => [70 + i * 70, i % 2 === 0 ? oy + 34 : oy]); // odd index = top carbon
    let s = D.text(30, oy - 66, title, { weight: 700, size: 15 });
    s += D.rect(pts[0][0] - 22, oy - 48, pts[1][0] - pts[0][0] + 44, 144, { fill: C.fillBlue, stroke: C.blue, width: 1.5, r: 8 });
    s += D.polyline(pts, { width: 3, stroke: C.ink });
    pts.forEach(([x, y], i) => {
      const top = i % 2 === 1;
      const sub = every === 1 || i % 2 === 1;
      if (sub) s += D.line(x, y + (top ? -4 : 4), x, y + (top ? -26 : 26), { width: 2.4 }) + D.text(x, y + (top ? -32 : 44), "CH₃", { anchor: "middle", size: 14, fill: C.red, weight: 700 });
    });
    s += D.text(pts[0][0] - 22, oy + 114, unit, { size: 14, fill: C.blue, weight: 600 });
    return s;
  };
  const body = chain(90, 2, "Poly(propene): CH₃ on every second carbon", "repeat unit: –CH₂–CH(CH₃)–") + chain(290, 1, "Poly(but-2-ene): CH₃ on every carbon", "repeat unit: –CH(CH₃)–CH(CH₃)–");
  const alt = "Two addition polymer chains with an all-carbon backbone: poly(propene) has a methyl side group on every second backbone carbon, repeat unit -CH2-CH(CH3)-; poly(but-2-ene) has a methyl group on every backbone carbon, repeat unit -CH(CH3)-CH(CH3)-, so the two are different polymers although both come from alkenes.";
  const cap = "Figure: repeat units of poly(propene) and poly(but-2-ene); the methyl groups are side groups, not part of the backbone";
  await fig("addition-polymer-repeat-units", w, h, body, alt, cap, "polymers/addition", "Notice that the methyl group in poly(propene) is a **side group**");
}

// ---- nylon-6,6: formation and hydrogen bonds between chains
{
  const w = 650, h = 410, bw = 50, x0 = 20;
  let s = D.text(20, 24, "Formation: each –COOH and –NH₂ lose H₂O to make an amide link (CO–NH)", { weight: 700, size: 14 });
  s += D.node(20, 40, 190, 50, "H₂N(CH₂)₆NH₂", { fill: C.fillBlue, size: 14 }) + D.text(222, 72, "+", { size: 20, anchor: "middle" }) + D.node(236, 40, 190, 50, "HOOC(CH₂)₄COOH", { fill: C.fillBlue, size: 14 }) +
    D.arrow(440, 65, 480, 65, { width: 2.2 }) + D.text(560, 70, "nylon-6,6 + 2n H₂O", { size: 14, anchor: "middle", weight: 600 });
  const seq = ["CO", "NH", "(CH₂)₆", "NH", "CO", "(CH₂)₄", "CO", "NH", "(CH₂)₆"];
  const shift = 3, y1 = 170, y2 = 270;
  const box = (i, y, lab) => D.rect(x0 + i * bw, y, bw - 6, 36, { fill: lab === "NH" ? C.fillAmber : lab === "CO" ? C.fillGreen : C.fillGrey, stroke: C.ink, width: 1.4, r: 4 }) + D.text(x0 + i * bw + (bw - 6) / 2, y + 23, lab, { anchor: "middle", size: lab.length > 3 ? 12 : 14, weight: lab.length > 3 ? 400 : 700 });
  s += D.text(20, 148, "Hydrogen bonds hold neighbouring chains together", { weight: 700, size: 14 });
  seq.forEach((lab, i) => { s += box(i, y1, lab); });
  seq.forEach((lab, i) => { s += box(i + shift, y2, lab); });
  seq.forEach((lab, i) => {
    if (lab === "NH" && seq[i - shift] === "CO") {
      const x = x0 + i * bw + (bw - 6) / 2;
      s += D.line(x, y1 + 36, x, y2, { stroke: C.red, width: 2.4, dash: true });
    }
  });
  s += D.text(x0 + 3 * bw + 30, 244, "N–H···O=C", { size: 14, fill: C.red, weight: 700 }) + D.text(20, 336, "amber = N–H (δ+ H);  green = C=O (δ− O);  dashed red = hydrogen bond between chains", { size: 13, fill: C.muted }) +
    D.text(20, 360, "Each chain repeats –NH(CH₂)₆NH–CO(CH₂)₄CO–; the H bonds make nylon stronger than poly(alkene)s.", { size: 13, fill: C.muted });
  const alt = "Nylon-6,6: hexane-1,6-diamine and hexanedioic acid join by condensation, losing water at each amide link CO-NH; in the solid, the delta-plus hydrogen of an N-H group on one chain forms a hydrogen bond (dashed) with the delta-minus oxygen of a C=O group on the neighbouring chain, which makes the polyamide strong with a high melting point.";
  const cap = "Figure: nylon-6,6 amide links and the hydrogen bonds between neighbouring chains";
  await fig("nylon-66-amide-links-hydrogen-bonds", w, h, s, alt, cap, "polymers/condensation", "### Hydrogen bonding between polyamide chains");
}

// ---- titration apparatus (lesson: 25.0 cm3 NaOH titrated with 0.100 mol/dm3 H2SO4; titre 22.42 cm3)
{
  const w = 620, h = 440;
  let s = D.rect(250, 30, 24, 230, { fill: "#fff", stroke: C.ink, width: 2.4 }) + D.rect(252, 70, 20, 190, { fill: C.fillBlue, stroke: "none" });
  for (let i = 0; i <= 10; i += 1) s += D.line(274, 40 + i * 20, i % 5 === 0 ? 284 : 280, 40 + i * 20, { width: 1.4 });
  s += D.rect(248, 260, 28, 14, { fill: C.fillGrey, stroke: C.ink, width: 1.8 }) + D.line(262, 274, 262, 296, { width: 4 });
  s += D.text(300, 60, "burette: 0.100 mol dm⁻³ H₂SO₄" + NL + "(read the bottom of the meniscus" + NL + "to 0.05 cm³, eye level)", { size: 14 });
  // stand and clamp
  s += D.line(170, 40, 170, 395, { stroke: C.muted, width: 6 }) + D.line(170, 395, 380, 395, { stroke: C.muted, width: 6 }) + D.line(170, 120, 250, 120, { stroke: C.muted, width: 5 }) + D.text(20, 120, "stand and clamp", { size: 13, fill: C.muted });
  // conical flask with 25.0 cm3 NaOH + indicator
  s += D.polyline([[236, 300], [236, 312], [200, 372], [200, 384], [324, 384], [324, 372], [288, 312], [288, 300]], { width: 2.4 }) + D.polyline([[222, 340], [302, 340], [322, 372], [322, 382], [202, 382], [202, 372]], { fill: C.fillAmber, stroke: "none", close: true }) +
    D.text(262, 368, "NaOH + indicator", { anchor: "middle", size: 12 }).replace("", "") + D.rect(180, 384, 164, 10, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(430, 340, "conical flask: 25.0 cm³ NaOH" + NL + "(from a pipette) + indicator;" + NL + "swirl as acid is added", { size: 14 }) + D.arrow(425, 346, 330, 360, { stroke: C.muted, width: 1.4 }) +
    D.text(350, 424, "white tile: makes the colour change easy to see", { anchor: "middle", size: 13, fill: C.muted });
  s += D.text(300, 200, "titre = final − initial reading", { size: 14, weight: 600, fill: C.blue }) + D.text(300, 220, "mean of concordant titres = 22.42 cm³", { size: 14, fill: C.blue });
  const alt = "Titration apparatus: a burette on a stand holds 0.100 mol per dm3 sulfuric acid above a conical flask containing 25.0 cm3 of sodium hydroxide from a pipette plus indicator, standing on a white tile; acid is added while swirling until the colour changes, and the titre is the final minus the initial burette reading (mean of concordant titres 22.42 cm3).";
  const cap = "Figure: titration set-up for Example 1 (acid in the burette, 25.0 cm³ of alkali in the flask)";
  await fig("titration-apparatus", w, h, s, alt, cap, "stoich/solutions-titrations", "## Concordant titres and the mean");
}
