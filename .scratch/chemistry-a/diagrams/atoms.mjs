// chemistry-a atoms: ionisation energy. Run: node .scratch/chemistry-a/diagrams/atoms.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);
{
  const el = ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"], ie = [494, 736, 577, 786, 1060, 1000, 1260, 1520];
  const ax = D.axes({ x: [0.4, 8.6], y: [0, 1700], xTicks: [], tickLabels: true, yTicks: 400, xLabel: "Element (Period 3)", yLabel: "First ionisation energy / kJ mol⁻¹", w: 600, h: 420, pad: { l: 66, r: 20, t: 36, b: 62 } });
  let body = ax.frame + ax.line(ie.map((v, i) => [i + 1, v]), { stroke: C.blue, width: 2.6 });
  ie.forEach((v, i) => { body += ax.point(i + 1, v, { stroke: C.blue, r: 5 }) + D.text(ax.X(i + 1), ax.axisX + 20, el[i], { anchor: "middle", size: 14, weight: 600 }) + D.text(ax.X(i + 1), ax.Y(v) - 10, String(v), { anchor: "middle", size: 12, fill: C.muted }); });
  body += ax.tag(3.6, 300, "Mg to Al dip: 3p higher than 3s", { size: 13, fill: C.amber, anchor: "middle" }) + ax.tag(8.5, 560, "P to S dip: first paired 3p electron", { size: 13, fill: C.amber, anchor: "end" });
  const alt = "First ionisation energy across Period 3 in kJ per mole: Na 494, Mg 736, Al 577, Si 786, P 1060, S 1000, Cl 1260, Ar 1520. The general rise is interrupted by a dip from Mg to Al (the 3p electron is higher in energy than 3s) and a dip from P to S (the first paired 3p electron is repelled).";
  const cap = "Figure: first ionisation energies across Period 3, with the two dips explained";
  await D.figure(F, "ionisation-energy-period-3", D.svg(600, 420, body), { alt, caption: cap });
  D.insertAfter(L("atoms/ionisation-energy"), "| First IE / kJ mol⁻¹ | 494", D.md("ionisation-energy-period-3", alt, cap));
}
{
  const ies = [494, 4560, 6940, 9540, 13400, 16600, 20100, 25500, 28900, 141000, 159000];
  const lg = ies.map((v) => Math.log10(v));
  const ax = D.axes({ x: [0, 12], y: [2, 5.5], xTicks: 1, yTicks: [2, 3, 4, 5], xLabel: "Number of electrons removed", yLabel: "log₁₀(IE / kJ mol⁻¹)", w: 600, h: 420, pad: { l: 60, r: 22, t: 36, b: 58 } });
  let body = ax.frame + ax.line(lg.map((v, i) => [i + 1, v]), { stroke: C.blue, width: 2 });
  lg.forEach((v, i) => { body += ax.point(i + 1, v, { stroke: C.blue, r: 5 }); });
  body += ax.tag(1.2, 2.95, "1 electron: shell 3", { size: 13, anchor: "start", fill: C.amber, dx: 6, dy: 12 }) +
    ax.tag(3.4, 4.35, "8 electrons: shell 2", { size: 13, anchor: "start", fill: C.amber, dy: -10 }) +
    ax.tag(9.7, 5.2, "2 electrons: shell 1", { size: 13, anchor: "end", fill: C.amber });
  const alt = "Graph of log10 of the successive ionisation energies of sodium against the number of electrons removed: one electron is removed easily (494 kJ per mole), then eight electrons with slowly rising values from 4560 to 28 900, then a huge jump to 141 000 and 159 000 for the last two, showing the 2,8,1 shell structure.";
  const cap = "Figure: successive ionisation energies of sodium; each step up marks a new shell closer to the nucleus";
  await D.figure(F, "ionisation-energy-sodium-successive", D.svg(600, 420, body), { alt, caption: cap });
  D.insertAfter(L("atoms/ionisation-energy"), "A graph of log₁₀(IE) against the number of electrons removed", D.md("ionisation-energy-sodium-successive", alt, cap));
}
