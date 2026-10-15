// chemistry-a energetics: Born-Haber (NaCl) and Hess cycle. Run: node .scratch/chemistry-a/diagrams/energetics.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

// ---- Born-Haber cycle for NaCl, values exactly as Example 1 of the lesson
{
  const d = { f: -411, atNa: 107, ie: 494, atCl: 121, ea: -349 };
  const lat = d.f - (d.atNa + d.ie + d.atCl + d.ea); // -784
  const lv = [0, d.atNa, d.atNa + d.ie, d.atNa + d.ie + d.atCl, d.atNa + d.ie + d.atCl + d.ea, d.f]; // 0,107,601,722,373,-411
  const w = 640, h = 560, top = 36, bot = 44, lo = -480, hi = 800;
  const Y = (v) => top + ((hi - v) / (hi - lo)) * (h - top - bot);
  const colW = 118, x0 = 30, bw = 104;
  const bx = (i) => x0 + i * colW;
  const bar = (i, v, label, o = {}) => D.line(bx(i), Y(v), bx(i) + (o.wide ?? bw), Y(v), { width: 3 }) + D.text(bx(i) + (o.wide ?? bw) / 2, Y(v) + (o.below ? 17 : -18), label, { anchor: "middle", size: 13 }) + D.text(bx(i) + (o.wide ?? bw) / 2, Y(v) + (o.below ? 33 : -4), (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v) + " kJ", { anchor: "middle", size: 13, fill: C.muted });
  const step = (i, a, b, label, col, lines) => D.arrow(bx(i) + 14, Y(a), bx(i) + 14, Y(b), { stroke: col, width: 2.2 }) + D.text(bx(i) + 24, Y((a + b) / 2) - (lines - 1) * 8 + 4, label, { size: 13, fill: col });
  let body = "";
  body += bar(0, 0, "Na(s) + ½Cl₂(g)") + bar(1, lv[1], "Na(g) + ½Cl₂(g)") + bar(2, lv[2], "Na⁺(g) + e⁻ + ½Cl₂(g)", { wide: bw }) + bar(3, lv[3], "Na⁺(g) + e⁻ + Cl(g)") + bar(4, lv[4], "Na⁺(g) + Cl⁻(g)", { below: true });
  body += D.line(bx(0), Y(d.f), bx(4) + bw + 24, Y(d.f), { width: 3 }) + D.text(bx(0) + 2, Y(d.f) + 20, "NaCl(s)   −411 kJ", { size: 13 });
  body += step(1, 0, d.atNa, "atomisation\nNa +107", C.blue, 2) + step(2, lv[1], lv[2], "IE₁ of Na\n+494", C.blue, 2) + step(3, lv[2], lv[3], "atomisation\nof Cl +121", C.blue, 2) + step(4, lv[3], lv[4], "EA₁ of Cl\n−349", C.amber, 2);
  const lx = bx(4) + bw + 12;
  body += D.line(bx(4) + bw, Y(lv[4]), lx, Y(lv[4]), { stroke: C.muted, width: 1.4, dash: true }) + D.arrow(lx, Y(lv[4]), lx, Y(d.f), { stroke: C.red, width: 2.6 }) + D.text(lx - 10, Y((lv[4] + d.f) / 2) - 8, "lattice energy\n−784", { size: 13, fill: C.red, weight: 700, anchor: "end" });
  for (let i = 1; i <= 4; i += 1) body += D.line(bx(i - 1) + bw, Y(lv[i - 1]), bx(i) + 14, Y(lv[i - 1]), { stroke: C.muted, width: 1.4, dash: true });
  body += D.arrow(bx(0) + 40, Y(0), bx(0) + 40, Y(d.f), { stroke: C.ink, width: 2.6 }) + D.text(bx(0) + 50, Y(d.f / 2) + 4, "ΔHf\n−411", { size: 13, weight: 700 });
  body += D.text(10, 20, "Enthalpy (upward arrows endothermic, downward exothermic)", { size: 13, fill: C.muted });
  if (lat !== -784) throw new Error("lattice energy mismatch " + lat);
  const alt = "Born-Haber cycle for sodium chloride as an energy level diagram: from the elements at 0 the steps go up by +107 (atomisation of sodium), +494 (first ionisation energy of sodium) and +121 (atomisation of chlorine) to +722 kJ per mole, then down by 349 (electron affinity of chlorine) to the gaseous ions at +373, and finally down by 784 (lattice energy) to NaCl at −411, the same as the enthalpy of formation.";
  const cap = "Figure: Born-Haber cycle for NaCl (kJ per mole); the lattice energy is the step that completes the loop to ΔHf";
  await D.figure(F, "born-haber-nacl", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("energetics/born-haber"), "On paper the cycle is drawn as an energy level diagram", D.md("born-haber-nacl", alt, cap));
}

// ---- Hess cycle from combustion data: propane (Example 2 of hess-bond-energies)
{
  const cC = -394, cH = -286, cProp = -2219;
  const left = 3 * cC + 4 * cH, f = left - cProp; // -2326, -107
  if (left !== -2326 || f !== -107) throw new Error("hess numbers");
  const w = 600, h = 340;
  const body =
    D.node(20, 36, 190, 50, "3C(s) + 4H₂(g)", { fill: C.fillBlue, size: 15 }) + D.node(390, 36, 190, 50, "C₃H₈(g)", { fill: C.fillBlue, size: 15 }) +
    D.node(185, 250, 230, 50, "3CO₂(g) + 4H₂O(l)", { fill: C.fillAmber, size: 15 }) +
    D.arrow(212, 61, 388, 61, { stroke: C.blue, width: 2.6 }) + D.tag(300, 50, "ΔHf = ?", { anchor: "middle", size: 15, fill: C.blue }) +
    D.arrow(115, 88, 235, 248, { stroke: C.amber, width: 2.4 }) + D.tag(60, 180, "3(−394) + 4(−286)\n".split("\n")[0], { size: 13, fill: C.amber }) + D.text(60, 202, "= −2326 kJ", { size: 14, fill: C.amber, weight: 700 }) +
    D.arrow(485, 88, 365, 248, { stroke: C.red, width: 2.4 }) + D.tag(430, 160, "ΔHc(C₃H₈)", { size: 13, fill: C.red }) + D.text(430, 182, "= −2219 kJ", { size: 14, fill: C.red, weight: 700 }) +
    D.text(300, 326, "ΔHf = −2326 − (−2219) = −107 kJ per mole", { size: 15, anchor: "middle", weight: 700 });
  const alt = "Hess cycle for the formation of propane from combustion data: carbon and hydrogen burn directly to 3CO2 and 4H2O with a total of −2326 kJ (3 × −394 plus 4 × −286), while propane burns to the same products with −2219 kJ, so the enthalpy of formation of propane is −2326 − (−2219) = −107 kJ per mole.";
  const cap = "Figure: energy cycle using combustion data; the enthalpy of formation is the difference between the two routes";
  await D.figure(F, "hess-cycle-propane-combustion", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("energetics/hess-bond-energies"), "In both cases multiply each value by the number of moles", D.md("hess-cycle-propane-combustion", alt, cap));
}
