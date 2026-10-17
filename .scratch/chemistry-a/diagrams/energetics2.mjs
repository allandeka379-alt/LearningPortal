// chemistry-a: Gibbs graph, solution cycles, calorimetry. Run: node .scratch/chemistry-a/diagrams/energetics2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, note, fig } from "./_m.mjs";

// ---- DG against T (lesson data: CaCO3 decomposition and ammonia synthesis)
{
  const caH = 178, caS = 0.1604, nhH = -92.2, nhS = -0.1988;
  const ca = (T) => caH - T * caS, nh = (T) => nhH - T * nhS;
  const Tca = caH / caS, Tnh = nhH / nhS; // 1110 K, 464 K
  const ax = D.axes({ x: [0, 1400], y: [-150, 250], xTicks: 200, yTicks: 50, yLabel: "ΔG / kJ mol⁻¹", w: 600, h: 410, pad: { l: 70, r: 30, t: 30, b: 56 } });
  const body = ax.frame + ax.line([[0, ca(0)], [1400, ca(1400)]], { stroke: C.blue }) + ax.line([[0, nh(0)], [1400, nh(1400)]], { stroke: C.amber }) +
    ax.point(Tca, 0, { stroke: C.blue }) + ax.point(Tnh, 0, { stroke: C.amber }) + ax.point(298, ca(298), { stroke: C.blue }) + ax.point(298, nh(298), { stroke: C.amber }) +
    ax.tag(60, 232, "CaCO₃ → CaO + CO₂:  ΔG = 178 − 0.1604T", { fill: C.blue, size: 13 }) +
    ax.tag(560, -110, "N₂ + 3H₂ → 2NH₃:  ΔG = −92.2 + 0.1988T", { fill: C.amber, size: 13 }) +
    ax.tag(Tca + 20, 52, `ΔG = 0 at ${Math.round(Tca)} K`, { fill: C.blue, size: 13 }) +
    ax.tag(Tnh - 40, 45, `ΔG = 0 at ${Math.round(Tnh)} K`, { fill: C.amber, size: 13, anchor: "end" }) +
    ax.tag(306, ca(298) + 10, `298 K: +${Math.round(ca(298))}`, { size: 13, fill: C.blue }) + ax.tag(306, nh(298) - 14, `298 K: ${nh(298).toFixed(1).replace("-", "−")}`, { size: 13, fill: C.amber }) +
    note(ax.X(760), ax.Y(-142), "below the axis (ΔG < 0): feasible", { size: 13 }) + D.text(ax.X(1400), 396, "T / K", { anchor: "end", size: 14, weight: 600 });
  const alt = `Gibbs energy change against temperature for two reactions: CaCO3 decomposition (ΔH +178, ΔS +0.1604 kJ per K per mol) falls with temperature, from +130 kJ per mol at 298 K to zero at ${Math.round(Tca)} K; ammonia synthesis (ΔH −92.2, ΔS −0.1988) rises, from −33.0 kJ per mol at 298 K to zero at ${Math.round(Tnh)} K. The gradient is minus ΔS and the intercept is ΔH.`;
  const cap = "Figure: ΔG against T is a straight line with gradient −ΔS and intercept ΔH; it crosses zero at T = ΔH/ΔS";
  await fig("gibbs-energy-against-temperature", 600, 410, body, alt, cap, "energetics/entropy-gibbs", "## Gibbs free energy and feasibility");
}

// ---- enthalpy of solution cycles (lesson Examples 1 and 2)
{
  const panel = (x0, title, solid, gasL, aqL, latt, hydTxt, hyd, sol) => {
    const top = 90, base = 300, sc = (base - top) / latt, Y = (e) => base - e * sc;
    const ys = Y(0), yg = Y(latt), ya = Y(sol);
    let s = D.text(x0 + 140, 24, title, { anchor: "middle", weight: 700 });
    s += D.line(x0 + 20, ys, x0 + 120, ys, { width: 3, stroke: C.ink }) + D.line(x0 + 20, yg, x0 + 270, yg, { width: 3, stroke: C.ink }) + D.line(x0 + 190, ya, x0 + 270, ya, { width: 3, stroke: C.ink });
    s += D.text(x0 + 20, yg - 10, `${gasL}   +${latt}`, { size: 13 });
    s += D.text(x0 + 20, ys + 22, `${solid}   0`, { size: 13 });
    s += D.text(x0 + 270, Math.max(ys, ya) + 44, `${aqL}   ${sol > 0 ? "+" : "−"}${Math.abs(sol)}`, { size: 13, anchor: "end" });
    s += D.arrow(x0 + 70, ys - 3, x0 + 70, yg + 3, { stroke: C.blue, width: 2.4 }) + D.text(x0 + 76, (ys + yg) / 2 + 20, `−ΔH latt\n= +${latt}`, { size: 13, fill: C.blue });
    s += D.arrow(x0 + 230, yg + 3, x0 + 230, ya - 3, { stroke: C.red, width: 2.4 }) + D.text(x0 + 224, (yg + ya) / 2 - 20, hydTxt, { size: 13, fill: C.red, anchor: "end" });
    s += D.line(x0 + 120, ys, x0 + 190, ya, { stroke: C.amber, width: 2.4, dash: true, arrow: true }) + D.tag(x0 + 128, Math.max(ys, ya) + 74, `ΔH sol = ${sol > 0 ? "+" : "−"}${Math.abs(sol)}`, { size: 13, fill: C.amber });
    return s;
  };
  const nl = 787, nh1 = -406, nh2 = -364, nsol = nl + nh1 + nh2;
  const ml = 2526, mh1 = -1921, mh2 = -364, msol = ml + mh1 + 2 * mh2;
  const M = (v) => String(v).replace("-", "−");
  const body = panel(0, "NaCl", "NaCl(s)", "Na⁺(g) + Cl⁻(g)", "Na⁺(aq) + Cl⁻(aq)", nl, `hydration\n${M(nh1)} + (${M(nh2)})\n= ${M(nh1 + nh2)}`, nh1 + nh2, nsol) +
    panel(310, "MgCl₂", "MgCl₂(s)", "Mg²⁺(g) + 2Cl⁻(g)", "Mg²⁺(aq) + 2Cl⁻(aq)", ml, `hydration\n${M(mh1)} + 2(${M(mh2)})\n= ${M(mh1 + 2 * mh2)}`, mh1 + 2 * mh2, msol) +
    D.text(310, 414, "Energies in kJ mol⁻¹ relative to the solid; each panel has its own scale.", { anchor: "middle", size: 13, fill: C.muted });
  if (nsol !== 17 || msol !== -123) throw new Error("solution cycle values do not match the lesson");
  const alt = "Enthalpy cycles for dissolving: for NaCl the lattice must be broken (+787 kJ per mol) and the ions hydrated (-406 + -364 = -770), so the enthalpy of solution is +17, slightly endothermic; for MgCl2 breaking the lattice costs +2526 and hydration gives -1921 + 2(-364) = -2649, so the enthalpy of solution is -123, exothermic.";
  const cap = "Figure: enthalpy of solution as lattice breaking plus hydration, for NaCl (+17) and MgCl₂ (−123 kJ mol⁻¹)";
  await fig("solution-enthalpy-cycles", 620, 428, body, alt, cap, "energetics/solution-hydration", "## The energy cycle");
}

// ---- temperature-time graph with extrapolation (lesson Example 3: dT = 19.6 C) and combustion apparatus
{
  const T0 = 21.0, dT = 19.6, tmix = 4, slope = 0.35;
  const Tx = T0 + dT; // extrapolated temperature at the time of mixing, 40.6
  const cool = (t) => Tx - slope * (t - tmix);
  const ax = D.axes({ x: [0, 12], y: [18, 44], xTicks: 2, yTicks: 4, xLabel: "Time / min", yLabel: "Temperature / °C", w: 600, h: 400, pad: { l: 64, r: 30, t: 34, b: 56 } });
  const obs = [[0, T0], [1, T0], [2, T0], [3, T0], [4, T0], [4.5, 32.5], [5, 37.5], [5.5, 39.4], [6, cool(6)], [7, cool(7)], [8, cool(8)], [9, cool(9)], [10, cool(10)], [11, cool(11)], [12, cool(12)]];
  const body = ax.frame + ax.line([[0, T0], [4, T0]], { stroke: C.blue }) + ax.line([[4, T0], ...obs.slice(5)], { stroke: C.blue }) + obs.map(([a, b]) => ax.point(a, b, { r: 3.5, stroke: C.blue })).join("") +
    ax.line([[4, Tx], [12, cool(12)]], { stroke: C.amber, width: 2, dash: true }) +
    D.line(ax.X(4), ax.Y(T0), ax.X(4), ax.Y(Tx), { stroke: C.red, width: 2.4, arrow: true, arrowStart: true }) +
    D.line(ax.X(4), ax.Y(4 * 0 + 18), ax.X(4), ax.Y(44), { stroke: C.grid, width: 1.2, dash: true }) +
    ax.tag(4.25, 30, `ΔT = ${Tx.toFixed(1)} − ${T0.toFixed(1)} = ${dT.toFixed(1)} °C`, { fill: C.red, size: 13 }) +
    ax.tag(7.2, 43, "extrapolated cooling line", { fill: C.amber, size: 13 }) +
    ax.tag(0.3, 24.5, "before mixing", { size: 13 }) + ax.tag(9.2, 33.8, "observed", { fill: C.blue, size: 13 }) + ax.tag(3.7, 19.3, "zinc added at 4 min", { size: 13, anchor: "end" });
  const alt = `Temperature against time for zinc displacing copper from copper(II) sulfate: the solution is steady at ${T0} °C, zinc is added at 4 min, the temperature rises quickly then cools slowly; extrapolating the cooling line back to the time of mixing gives ${Tx.toFixed(1)} °C, so the corrected temperature change is ${dT} °C.`;
  const cap = `Figure: extrapolating the cooling line back to the time of mixing gives the corrected ΔT (${dT} °C)`;
  await fig("calorimetry-extrapolated-temperature", 600, 400, body, alt, cap, "energetics/enthalpy-calorimetry", "### Temperature-time graphs and thermometric titrations");
}
{
  // spirit burner heating a copper can of water (lesson Example 2: 150.0 g water, 0.92 g ethanol)
  const body = D.rect(250, 70, 130, 120, { fill: "#ffffff", stroke: C.ink, r: 6, width: 2.4 }) + D.rect(252, 100, 126, 88, { fill: C.fillBlue, stroke: "none", r: 4 }) + D.line(252, 100, 378, 100, { stroke: C.blue, width: 1.5, dash: true }) +
    D.text(300, 160, "water\n150.0 g", { anchor: "middle", size: 14 }) + D.text(280, 62, "copper can", { anchor: "middle", size: 14 }) +
    D.line(350, 14, 350, 150, { stroke: C.ink, width: 4 }) + D.rect(344, 128, 12, 24, { fill: C.red, stroke: C.ink, width: 1.5 }) + D.text(362, 24, "thermometer", { size: 14 }) +
    D.path_("M285,218 Q315,176 345,218", { stroke: C.amber, width: 3 }) + D.path_("M300,222 Q315,196 330,222", { stroke: C.amber, width: 2 }) +
    D.rect(265, 222, 100, 18, { fill: C.fillGrey, stroke: C.ink, r: 3 }) + D.rect(262, 240, 106, 50, { fill: C.fillAmber, stroke: C.ink, r: 6 }) + D.text(315, 270, "spirit burner", { anchor: "middle", size: 14 }) +
    D.text(430, 262, "ethanol: loses 0.92 g\n(0.0200 mol)", { size: 14 }) + D.line(425, 262, 372, 262, { stroke: C.muted, width: 1.4, arrow: true }) +
    D.text(30, 140, "ΔT of the water\n= 24.0 °C", { size: 14, fill: C.blue }) + D.line(130, 138, 246, 138, { stroke: C.muted, width: 1.4, arrow: true }) +
    D.text(300, 322, "heat is also lost to the air and the can, so the measured ΔH is too small", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Combustion calorimetry: a spirit burner containing ethanol heats 150.0 g of water in a copper can under a clamp, with a thermometer in the water; the water rises by 24.0 degrees C while 0.92 g (0.0200 mol) of ethanol burns, and heat lost to the air makes the measured enthalpy change too small.";
  const cap = "Figure: simple combustion calorimeter (spirit burner and copper can) as in Example 2";
  await fig("combustion-calorimeter-apparatus", 620, 340, body, alt, cap, "energetics/enthalpy-calorimetry", "| combustion of a liquid fuel");
}
