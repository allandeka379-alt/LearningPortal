// chemistry-a: Period 3 data, Group 2 solubility, Group 17 bond energies. Run: node .scratch/chemistry-a/diagrams/periodicity2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, note, fig } from "./_m.mjs";

const els = ["Na", "Mg", "Al", "Si", "P", "S", "Cl"];
// ---- atomic and ionic radii across Period 3 (lesson table)
{
  const atom = [0.186, 0.160, 0.143, 0.117, 0.110, 0.104, 0.099], ion = [0.095, 0.065, 0.050, 0.041, 0.212, 0.184, 0.181];
  const ions = ["Na⁺", "Mg²⁺", "Al³⁺", "Si⁴⁺", "P³⁻", "S²⁻", "Cl⁻"];
  const ax = D.axes({ x: [0.5, 7.5], y: [0, 0.25], xTicks: [], yTicks: [0, 0.05, 0.1, 0.15, 0.2, 0.25], yLabel: "Radius / nm", w: 600, h: 400, pad: { l: 64, r: 30, t: 34, b: 60 }, yFormat: (v) => v.toFixed(2) });
  let body = ax.frame;
  els.forEach((e, i) => { body += D.text(ax.X(i + 1), ax.Y(0) + 22, e, { anchor: "middle", size: 14 }); });
  body += ax.line(atom.map((v, i) => [i + 1, v]), { stroke: C.blue }) + ax.line(ion.slice(0, 4).map((v, i) => [i + 1, v]), { stroke: C.amber, dash: true }) + ax.line(ion.slice(4).map((v, i) => [i + 5, v]), { stroke: C.amber, dash: true });
  atom.forEach((v, i) => { body += ax.point(i + 1, v, { stroke: C.blue, r: 4.5 }); });
  ion.forEach((v, i) => { body += ax.point(i + 1, v, { stroke: C.amber, r: 4.5 }) + D.text(ax.X(i + 1), ax.Y(v) + (i < 4 ? 22 : -10), ions[i], { anchor: "middle", size: 13, fill: C.amber }); });
  body += ax.tag(4.5, 0.075, "solid blue: atoms", { fill: C.blue, size: 13 }) + ax.tag(4.5, 0.05, "dashed amber: ions", { fill: C.amber, size: 13 }) +
    ax.tag(0.7, 0.24, "jump: anions have one more shell", { size: 13 });
  const alt = "Atomic and ionic radii across Period 3: atomic radius falls steadily from 0.186 nm for Na to 0.099 nm for Cl; the cations Na+ to Si4+ are much smaller (0.095 down to 0.041 nm) while the anions P3-, S2- and Cl- are larger than their atoms (0.212, 0.184, 0.181 nm), so ionic radius jumps up between Si4+ and P3-.";
  const cap = "Figure: atomic and ionic radii across Period 3 (data from the table above)";
  await fig("period-3-atomic-ionic-radii", 600, 400, body, alt, cap, "periodicity/physical-properties", "## Ionic radius");
}
// ---- melting points across Period 3
{
  const mp = [371, 922, 933, 1687, 317, 388, 172, 84];
  const names = ["Na", "Mg", "Al", "Si", "P₄", "S₈", "Cl₂", "Ar"];
  const col = [C.teal, C.teal, C.teal, C.amber, C.muted, C.muted, C.muted, C.muted];
  const bars = mp.map((v, i) => ({ label: names[i], value: v, fill: col[i] }));
  let s = D.barChart(bars, { w: 600, h: 400, yMax: 1900, yLabel: "Melting point / K", yTicks: 400 });
  const alt = "Bar chart of melting points across Period 3 in kelvin: Na 371, Mg 922, Al 933 (giant metallic, rising), Si 1687 (giant covalent, highest), then P4 317, S8 388, Cl2 172 and Ar 84 (simple molecules or atoms, low).";
  const cap = "Figure: melting points across Period 3; metals rise to Al, Si (giant covalent) is highest, molecular elements are low";
  s = s.replace("</g>\n</svg>", D.text(190, 150, "giant metallic", { anchor: "middle", size: 13, fill: C.teal }) + D.text(297, 34, "giant covalent", { anchor: "middle", size: 13, fill: C.amber }) + D.text(500, 230, "simple molecular / atoms", { anchor: "middle", size: 13, fill: C.muted }) + "</g>\n</svg>");
  await D.figure("chemistry-a", "period-3-melting-points", s, { alt, caption: cap });
  const { insertAfter, md } = D;
  insertAfter("content/subjects/chemistry-a/lessons/periodicity/physical-properties.md", "## Melting point", md("period-3-melting-points", alt, cap));
}
// ---- Group 2: enthalpy of solution of sulfates and hydroxides (lesson Examples 2 and 3)
{
  const sul = (latt, hMg) => -latt + hMg - 1100;
  const vals = [["MgSO₄", -150], ["BaSO₄", 10], ["Mg(OH)₂", 155], ["Ba(OH)₂", 40]];
  if (sul(-2870, -1920) !== -150 || sul(-2470, -1360) !== 10 || 2995 - 1920 - 920 !== 155 || 2320 - 1360 - 920 !== 40) throw new Error("group 2 values differ from lesson");
  const ax = D.axes({ x: [0, 4], y: [-200, 250], xTicks: [], yTicks: 50, yLabel: "ΔH sol / kJ mol⁻¹", w: 600, h: 400, pad: { l: 70, r: 30, t: 34, b: 60 }, origin: true });
  let body = ax.frame;
  vals.forEach(([n, v], i) => {
    const cx = i + 0.5, w = 0.55;
    body += D.rect(ax.X(cx - w / 2), Math.min(ax.Y(v), ax.Y(0)), ax.X(cx + w / 2) - ax.X(cx - w / 2), Math.abs(ax.Y(v) - ax.Y(0)), { fill: v < 0 ? C.fillGreen : C.fillAmber, stroke: v < 0 ? C.green : C.amber, width: 2 });
    body += D.text(ax.X(cx), v < 0 ? ax.Y(v) + 18 : ax.Y(v) - 8, (v > 0 ? "+" : "−") + Math.abs(v), { anchor: "middle", size: 14, weight: 700 });
    body += D.text(ax.X(cx), ax.Y(-200) + 20, n, { anchor: "middle", size: 14 });
  });
  body += D.text(ax.X(1), ax.Y(190), "sulfates: Mg to Ba is less exothermic,\nso they get less soluble", { anchor: "middle", size: 13, fill: C.muted }) + D.text(ax.X(3), ax.Y(-110), "hydroxides: Mg to Ba is less endothermic,\nso they get more soluble", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Enthalpy of solution from the lesson examples: MgSO4 -150 kJ per mol (exothermic, soluble) but BaSO4 +10 (endothermic, insoluble), so sulfates get less soluble down Group 2; Mg(OH)2 +155 but Ba(OH)2 +40, less endothermic, so hydroxides get more soluble down the group.";
  const cap = "Figure: ΔH sol for Mg and Ba sulfates and hydroxides (values from Examples 2 and 3)";
  await fig("group-2-enthalpy-of-solution", 600, 400, body, alt, cap, "group2/thermal-stability-solubility", "## Solubility: the energy balance");
}
// ---- Group 17 bond energies (lesson table)
{
  const be = [["F–F", 158], ["Cl–Cl", 242], ["Br–Br", 193], ["I–I", 151]];
  let s = D.barChart(be.map(([l, v], i) => ({ label: l, value: v, fill: i === 0 ? C.amber : C.teal })), { w: 560, h: 380, yMax: 300, yLabel: "Bond energy / kJ mol⁻¹", yTicks: 50 });
  s = s.replace("</g>\n</svg>", D.text(280, 368, "F–F is weaker than Cl–Cl: lone pairs on the two small atoms repel", { anchor: "middle", size: 13, fill: C.amber }) + D.text(480, 96, "Cl to I: bond\nenergy falls", { size: 13, anchor: "middle", fill: C.muted }) + "</g>\n</svg>");
  const alt = "Bar chart of halogen bond energies in kJ per mol: F-F 158, Cl-Cl 242, Br-Br 193, I-I 151; the energy falls from chlorine to iodine as atoms get larger, but fluorine is out of order because repulsion between lone pairs on its small atoms weakens the bond.";
  const cap = "Figure: halogen X–X bond energies; F–F is anomalously weak";
  await D.figure("chemistry-a", "halogen-bond-energies", s, { alt, caption: cap });
  D.insertAfter("content/subjects/chemistry-a/lessons/group17/properties-reactivity.md", "## Bond strength of the halogen molecules", D.md("halogen-bond-energies", alt, cap));
}
