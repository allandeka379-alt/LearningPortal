// chemistry-a: glycine titration, Haber plant, sigma/pi bonds, radical chain, rate-determining-step profile.
// Run: node .scratch/chemistry-a/diagrams/misc2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curly, grp, bond, dbl, rxn, note, fig } from "./_m.mjs";
const NL = "\n";

// ---- glycine hydrochloride titrated with NaOH (lesson Example 1: pKa 2.34 and 9.60, 20.0 cm3 of 0.100 mol/dm3)
{
  const pKa1 = 2.34, pKa2 = 9.60, Ka1 = 10 ** -pKa1, Ka2 = 10 ** -pKa2, C0 = 0.1 * 20, cNaOH = 0.1;
  const pH = (V) => {
    const vt = 20 + V, c = C0 / vt, na = (cNaOH * V) / vt;
    const f = (p) => {
      const h = 10 ** -p, oh = 1e-14 / h, d = h * h + Ka1 * h + Ka1 * Ka2;
      const a1 = (c * h * h) / d, a3 = (c * Ka1 * Ka2) / d; // H2A+ and A-
      return na + h + a1 - oh - a3 - c; // charge balance incl. the chloride counter-ion
    };
    let lo = 0, hi = 14;
    for (let i = 0; i < 80; i += 1) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  };
  const iso = (pKa1 + pKa2) / 2;
  const check = [[0, 1.7], [10, 2.34], [20, 5.97], [30, 9.6]];
  for (const [v, p] of check) if (Math.abs(pH(v) - p) > 0.15) throw new Error(`glycine curve differs at ${v}: ${pH(v)} vs ${p}`);
  const ax = D.axes({ x: [0, 50], y: [0, 14], xTicks: 10, yTicks: 2, xLabel: "Volume of NaOH / cm³", yLabel: "pH", w: 600, h: 420, pad: { l: 56, r: 28, t: 34, b: 58 } });
  let body = ax.frame + ax.plot(pH, { stroke: C.blue, steps: 400 });
  for (const [v, p, lab, dx, dy] of [[10, pKa1, "10.0 cm³: pH 2.34 (= pKa)", 14, 22], [20, iso, "20.0 cm³: pH 5.97 (isoelectric point)", 14, 18], [30, pKa2, "30.0 cm³: pH 9.60 (= pKa)", -14, -14]]) {
    body += ax.point(v, p, { stroke: C.amber, r: 5 }) + ax.tag(v, p, lab, { dx, dy, size: 13, fill: C.amber, anchor: dx < 0 ? "end" : "start" });
  }
  body += D.line(ax.X(40), ax.Y(0), ax.X(40), ax.Y(14), { stroke: C.muted, width: 1.2, dash: true }) + D.line(ax.X(20), ax.Y(0), ax.X(20), ax.Y(14), { stroke: C.muted, width: 1.2, dash: true });
  body += D.text(ax.X(20) - 6, ax.Y(13.2), "first equivalence", { size: 13, fill: C.muted, anchor: "end" }) + D.text(ax.X(40) - 6, ax.Y(13.2), "second equivalence", { size: 13, fill: C.muted, anchor: "end" });
  const alt = "Titration curve of 20.0 cm3 of 0.100 mol per dm3 glycine hydrochloride with NaOH: the pH starts near 1.7, has a first buffer region around pH 2.34, rises steeply at the first equivalence point (20.0 cm3, pH 5.97, the isoelectric point), has a second buffer region around pH 9.60, and rises again to about pH 11 at the second equivalence point (40.0 cm3).";
  const cap = "Figure: glycine titration curve with two buffer regions and two equivalence points (pKa 2.34 and 9.60)";
  await fig("glycine-titration-curve", 600, 420, body, alt, cap, "amines/amino-acids", "## Titration curves of amino acids (ZIMSEC detail)");
}

// ---- Haber process plant (lesson conditions: iron catalyst, about 200 atm, 400-450 C; recycle)
{
  const w = 640, h = 330;
  let s = D.node(20, 30, 130, 60, "N₂ from air" + NL + "H₂ from natural gas", { fill: C.fillGrey, size: 13 }) + D.node(200, 30, 120, 60, "Compressor" + NL + "about 200 atm", { fill: C.fillAmber, size: 13 }) + D.node(370, 20, 150, 80, "Converter: iron" + NL + "catalyst, 400–450 °C" + NL + "N₂ + 3H₂ ⇌ 2NH₃", { fill: C.fillBlue, size: 13 }) +
    D.node(450, 160, 140, 60, "Cooler: NH₃" + NL + "liquefies", { fill: C.fillGreen, size: 13 }) + D.node(450, 250, 140, 50, "Liquid NH₃ out", { fill: C.fillGrey, size: 13, weight: 700 });
  s += D.arrow(150, 60, 198, 60, { width: 2.2 }) + D.arrow(320, 60, 368, 60, { width: 2.2 }) + D.polyline([[520, 70], [560, 70], [560, 158]], { width: 2.2, arrow: true }).replace("", "") +
    D.arrow(520, 190, 520, 190, { width: 0 }).replace(/.*/, "") + D.arrow(520, 222, 520, 248, { width: 2.2 }) +
    D.polyline([[450, 190], [260, 190], [260, 92]], { stroke: C.amber, width: 2.4, arrow: true }) + D.text(350, 182, "unreacted N₂ and H₂ recycled", { anchor: "middle", size: 13, fill: C.amber });
  s += D.text(20, 322, "Only a small fraction reacts per pass; recycling converts almost all the feed.", { size: 13, fill: C.muted });
  const alt = "Flow diagram of the Haber process: nitrogen and hydrogen are compressed to about 200 atm, passed over an iron catalyst at 400-450 degrees C in the converter, then cooled so ammonia liquefies and is removed; the unreacted nitrogen and hydrogen are recycled back to the compressor.";
  const cap = "Figure: the Haber process as a flow of conditions, with recycling of unreacted gases";
  await fig("haber-process-flow", w, h, s, alt, cap, "equilibria/haber-contact", "Only a small fraction of the gases reacts in one pass");
}

// ---- sigma and pi bonds in ethene
{
  const w = 600, h = 340, cy = 160, c1 = 230, c2 = 370;
  let s = D.ellipse ? "" : "";
  const lobe = (x, y, up) => `<ellipse cx="${x}" cy="${y + (up ? -34 : 34)}" rx="22" ry="34" fill="${C.fillAmber}" fill-opacity="0.8" stroke="${C.amber}" stroke-width="2"/>`;
  s += lobe(c1, cy, true) + lobe(c1, cy, false) + lobe(c2, cy, true) + lobe(c2, cy, false) +
    D.rect(c1 + 22, cy - 62, c2 - c1 - 44, 22, { fill: C.fillAmber, stroke: "none" }) + D.rect(c1 + 22, cy + 40, c2 - c1 - 44, 22, { fill: C.fillAmber, stroke: "none" });
  s += D.line(c1, cy, c2, cy, { width: 4, stroke: C.blue }) + D.circle(c1, cy, 15, { fill: "#fff" }) + D.circle(c2, cy, 15, { fill: "#fff" }) + D.text(c1, cy + 5, "C", { anchor: "middle", weight: 700 }) + D.text(c2, cy + 5, "C", { anchor: "middle", weight: 700 });
  for (const [x, dy, sx] of [[c1, -1, -1], [c1, 1, -1], [c2, -1, 1], [c2, 1, 1]]) s += D.line(x + sx * 12, cy + dy * 10, x + sx * 62, cy + dy * 40, { width: 2.4 }) + D.text(x + sx * 76, cy + dy * 46 + 5, "H", { anchor: "middle", size: 15 });
  s += D.text(300, 218 + 36, "σ bond: end-on overlap on the C–C axis (blue line)", { anchor: "middle", size: 14, fill: C.blue, weight: 600 }) +
    D.text(300, 30, "π bond: sideways overlap of the two p orbitals,", { anchor: "middle", size: 14, fill: C.amber, weight: 600 }) + D.text(300, 50, "one lobe above and one below the plane", { anchor: "middle", size: 14, fill: C.amber, weight: 600 }) +
    D.text(300, 306, "C=C = 1 σ + 1 π;  ethene C₂H₄ has 5 σ bonds and 1 π bond", { anchor: "middle", size: 14 });
  const alt = "Ethene bonding: the two carbon atoms are joined by a sigma bond from end-on overlap along the C-C axis, plus a pi bond from sideways overlap of two p orbitals with one lobe above and one below the plane of the molecule; with four C-H sigma bonds, C2H4 has 5 sigma bonds and 1 pi bond.";
  const cap = "Figure: the sigma and pi bonds of the C=C double bond in ethene";
  await fig("ethene-sigma-pi-bonds", w, h, s, alt, cap, "bonding/orbitals-hybridisation", "## π bonds: sideways overlap");
}

// ---- free-radical chain: methane + chlorine
{
  const w = 600, h = 400;
  let s = D.node(40, 20, 230, 50, "Initiation (UV light): Cl₂ → 2Cl•", { fill: C.fillAmber, size: 14 });
  s += D.arrow(155, 70, 155, 116, { width: 2.2 });
  s += D.node(40, 120, 230, 70, "Cl• + CH₄" + NL + "→ HCl + •CH₃", { fill: C.fillBlue, size: 15 }) + D.node(330, 120, 230, 70, "•CH₃ + Cl₂" + NL + "→ CH₃Cl + Cl•", { fill: C.fillBlue, size: 15 });
  s += D.polyline([[270, 142], [330, 142]], { width: 2.4, arrow: true }) + D.text(300, 132, "•CH₃", { anchor: "middle", size: 13, fill: C.blue }) +
    D.polyline([[445, 192], [445, 236], [155, 236], [155, 192]], { width: 2.4, arrow: true, stroke: C.blue }) + D.text(300, 256, "Cl• returns: the chain repeats (propagation)", { anchor: "middle", size: 14, fill: C.blue, weight: 600 });
  s += D.node(20, 300, 560, 80, "Termination (two radicals meet, none left)" + NL + "Cl• + Cl• → Cl₂   |   •CH₃ + Cl• → CH₃Cl   |   •CH₃ + •CH₃ → C₂H₆", { fill: C.fillGrey, size: 14 });
  const alt = "Free-radical substitution of methane by chlorine: UV light splits Cl2 into two chlorine radicals (initiation); in propagation Cl radical plus CH4 gives HCl and a methyl radical, and the methyl radical plus Cl2 gives CH3Cl and a new Cl radical, so the chain repeats; termination steps, Cl with Cl, CH3 with Cl or CH3 with CH3, remove two radicals and leave none.";
  const cap = "Figure: the radical chain mechanism for CH₄ + Cl₂, showing the propagation cycle";
  await fig("free-radical-chain-methane-chlorine", w, h, s, alt, cap, "hydrocarbons/free-radical-substitution", "## The mechanism: methane and chlorine");
}

// ---- two-step profile: slow first step (rate-determining), fast second step (iodination of propanone, lesson Example 2)
{
  const w = 620, h = 400;
  const g = (x, c, wd, ht) => ht * Math.exp(-(((x - c) / wd) ** 2));
  const sg = (x, c, wd) => 0.5 * (1 + Math.tanh((x - c) / wd));
  const R = 40, I = 55, P = 25;
  const f = (x) => R + (I - R) * sg(x, 3.8, 0.5) + (P - I) * sg(x, 7.4, 0.5) + 62 * Math.exp(-(((x - 2.6) / 0.8) ** 2)) + 20 * Math.exp(-(((x - 6.1) / 0.8) ** 2));
  let m1 = 0, m2 = 0; for (let x = 0; x <= 4; x += 0.01) m1 = Math.max(m1, f(x)); for (let x = 5; x <= 8; x += 0.01) m2 = Math.max(m2, f(x)); if (!(m1 > m2 + 10)) throw new Error("step 1 peak must be higher than step 2");
  const ax = D.axes({ x: [0, 10], y: [0, 120], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Progress of reaction", yLabel: "Energy", w, h, pad: { l: 40, r: 30, t: 40, b: 56 } });
  const body = ax.frame + ax.plot(f, { stroke: C.blue, width: 2.8 }) +
    ax.tag(0.1, R - 10, "CH₃COCH₃ + H⁺ + I₂", { size: 13 }) + ax.tag(3.4, I - 14, "intermediate", { size: 13, anchor: "start" }) + ax.tag(7.0, P - 12, "CH₃COCH₂I + H⁺ + I⁻", { size: 13 }) +
    ax.tag(2.6, 112, "step 1 (slow): propanone + H⁺", { size: 13, fill: C.red, anchor: "middle" }) + ax.tag(6.3, 92, "step 2 (fast): involves I₂", { size: 13, fill: C.green, anchor: "middle" }) +
    D.text(ax.X(5), ax.Y(2), "the higher peak (step 1) is the rate-determining step: rate = k[CH₃COCH₃][H⁺]", { anchor: "middle", size: 13, fill: C.muted }).replace('y="' + ax.Y(2) + '"', 'y="' + (ax.Y(0) + 40) + '"');
  const alt = "Reaction profile with an intermediate for the acid-catalysed iodination of propanone: step 1, involving propanone and H+, has the higher activation energy and is the slow rate-determining step; step 2, involving iodine, has a lower peak and is fast, which is why the rate equation is rate = k[propanone][H+] and the reaction is zero order in iodine.";
  const cap = "Figure: a two-step profile; the slow step with the higher peak sets the rate equation";
  await fig("rate-determining-step-profile", w, h, body, alt, cap, "kinetics/mechanisms-rds", "## The iodination of propanone");
}
