// Run from repo root: node .scratch/chemistry-o/diagrams/energetics.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, conical } from "./_h.mjs";

// ---------- shared: energy profile drawn at x offset ox, energies in kJ/mol relative to reactants
const EMIN = -60, EMAX = 230, TOP = 50, BOT = 300;
const yE = (e) => BOT - ((e - EMIN) / (EMAX - EMIN)) * (BOT - TOP);
function profile(ox, { peak, prod, title, peak2, eaLabel }) {
  const x0 = ox + 50, xr = ox + 100, cx = ox + 160, xp = ox + 220, x1 = ox + 262;
  const yR = yE(0), yP = yE(prod), yK = yE(peak);
  const curve = (pk) => `M${x0},${yR} L${xr},${yR} C${xr + 35},${yR} ${cx - 35},${yE(pk)} ${cx},${yE(pk)} C${cx + 35},${yE(pk)} ${xp - 35},${yP} ${xp},${yP} L${x1},${yP}`;
  let s = D.arrow(ox + 30, BOT + 10, ox + 30, TOP - 12, { width: 1.8 }) + D.arrow(ox + 30, BOT + 10, x1 + 24, BOT + 10, { width: 1.8 }) +
    T(ox + 24, TOP - 14, "Energy", { weight: 700, size: 14 }) + T(x1 + 24, BOT + 32, "Progress of reaction", { anchor: "end", weight: 700, size: 13 }) +
    T(ox + 160, 16, title, { anchor: "middle", weight: 700, size: 15 });
  s += D.path_(curve(peak), { stroke: C.blue, width: 3 });
  if (peak2 !== undefined) s += D.path_(curve(peak2), { stroke: C.amber, width: 3, dash: true });
  s += D.line(xr, yR, x1, yR, { stroke: C.muted, width: 1.2, dash: true });
  s += D.arrow(cx, yR, cx, yK + 1, { stroke: C.red, width: 2 });
  s += D.tag(cx - 8, (yR + yK) / 2 + 9, eaLabel ?? `Ea = ${peak}`, { anchor: "end", size: 14, fill: C.red });
  s += D.arrow(x1 - 6, yR, x1 - 6, yP + (prod < 0 ? 1 : -1), { stroke: C.green, width: 2 });
  s += T(x1 + 6, (yR + yP) / 2 + 5, `ΔH = ${prod < 0 ? "−" : "+"}${Math.abs(prod)}`, { size: 14, weight: 700, fill: C.green });
  s += T(x0 + 24, yR + (prod < 0 ? -10 : 20), "reactants", { anchor: "middle", size: 13 });
  s += T(xp + 8, yP + (prod < 0 ? 20 : -10), "products", { anchor: "middle", size: 13 });
  return s;
}
{
  const body = profile(0, { peak: 120, prod: -45, title: "Reaction A: exothermic" }) + profile(380, { peak: 210, prod: 65, title: "Reaction B: endothermic" }) +
    T(360, 350, "Energies in kJ/mol, measured from the reactants (0)", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Two reaction pathway diagrams with energies relative to the reactants: reaction A is exothermic, the products lie 45 kJ/mol below the reactants (ΔH = −45) and the peak is 120 kJ/mol above the reactants (Ea = 120); reaction B is endothermic, the products lie 65 kJ/mol above the reactants (ΔH = +65) and the peak is 210 kJ/mol above (Ea = 210).";
  await put("energy-profiles-exo-endo", 720, 365, body, alt, "Figure: Ea is measured from the reactants to the peak; ΔH is measured from the reactants to the products", "energetics/energy-profiles", "## Reading a reaction pathway diagram");
}
{
  const body = profile(0, { peak: 180, prod: -40, peak2: 110, title: "Effect of a catalyst", eaLabel: "Ea = 180" }) +
    D.line(ox(160), yE(110), 330, yE(110), { stroke: C.amber, width: 1.4, dash: true }) +
    T(336, yE(110) + 5, "with catalyst: +110", { size: 13, fill: C.amber, weight: 700 }) +
    D.line(ox(160), yE(180), 330, yE(180), { stroke: C.blue, width: 1.4, dash: true }) + T(336, yE(180) + 5, "no catalyst: +180", { size: 13, fill: C.blue, weight: 700 }) +
    D.arrow(300, yE(180) + 6, 300, yE(110) - 6, { stroke: C.ink, width: 1.6 }) + T(306, (yE(180) + yE(110)) / 2 + 5, "70 lower", { size: 13 });
  const alt = "Reaction pathway diagram with and without a catalyst: the reactants are at 0 and the products at −40 kJ/mol in both cases, so ΔH = −40 is unchanged, but the catalysed pathway (dashed) peaks at +110 kJ/mol instead of +180 kJ/mol, so the activation energy is 70 kJ/mol lower.";
  await put("energy-profiles-catalyst", 640, 365, body, alt, "Figure: a catalyst lowers the peak (Ea) but leaves the reactant and product levels, and so ΔH, unchanged", "energetics/energy-profiles", "## Catalysts on the diagram");
}
function ox(v) { return v; }

// ---------- heating curve of water
{
  const pts = [[0, -20], [2.5, 0], [5, 0], [11, 100], [19, 100], [20.2, 120]];
  const ax = D.axes({ x: [0, 21], y: [-30, 130], w: 600, h: 400, xTicks: [], yTicks: D.range(-20, 120, 20), origin: false, xLabel: "Time (steady heating)", yLabel: "Temperature (°C)", pad: { l: 64, r: 30, t: 30, b: 50 } });
  const L = (n, t, v, dx, dy) => D.text(ax.X(t) + dx, ax.Y(v) + dy, n, { anchor: "middle", size: 15, weight: 700 });
  const body = ax.frame + ax.line(pts, { stroke: C.blue, width: 3.2 }) + pts.map(([t, v]) => ax.point(t, v, { r: 4.5 })).join("") +
    L("A", 0, -20, 14, 20) + L("B", 2.5, 0, -14, 4) + L("C", 5, 0, 12, 20) + L("D", 11, 100, -14, 4) + L("E", 19, 100, 0, 22) + L("F", 20.2, 120, 14, 5) +
    D.text(ax.X(3.75), ax.Y(0) - 12, "melting: 0 °C", { anchor: "middle", size: 13, fill: C.amber, weight: 700 }) +
    D.text(ax.X(15), ax.Y(100) - 12, "boiling: 100 °C", { anchor: "middle", size: 13, fill: C.amber, weight: 700 }) +
    D.text(ax.X(0.3), ax.Y(14), "solid", { size: 13, fill: C.muted }) +
    D.text(ax.X(8.6), ax.Y(30), "liquid", { size: 13, fill: C.muted }) + D.text(ax.X(3.75), ax.Y(-12), "solid + liquid", { anchor: "middle", size: 13, fill: C.muted }) +
    D.text(ax.X(15), ax.Y(100) + 24, "liquid + gas", { anchor: "middle", size: 13, fill: C.muted }) + D.text(ax.X(18.6), ax.Y(120), "gas", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Heating curve of water from ice at −20 °C to steam: temperature rises from A to B, stays flat at 0 °C from B to C while ice melts, rises from C to D (0 to 100 °C), stays flat at 100 °C from D to E while water boils (a longer flat section than melting), then steam warms from E to F.";
  await put("heating-curve-water", 600, 400, body, alt, "Figure: heating curve of water; the flat sections are the changes of state", "matter/heating-and-cooling-curves", "## The heating curve of water");
}

// ---------- rate graphs
const expo = (fin, tau) => (t) => fin * (1 - Math.exp(-t / tau));
{
  const fin = 2.2; // 5 g CaCO3 = 0.05 mol -> 0.05 x 44 = 2.2 g CO2
  const ax = D.axes({ x: [0, 300], y: [0, 2.6], w: 560, h: 380, xTicks: D.range(0, 300, 50), yTicks: [0, 0.5, 1, 1.5, 2, 2.5], xLabel: "Time (s)", yLabel: "Mass of CO₂ lost (g)" });
  const body = ax.frame + D.line(ax.X(0), ax.Y(fin), ax.X(300), ax.Y(fin), { stroke: C.muted, width: 1.3, dash: true }) + ax.plot(expo(fin, 25), { stroke: C.amber }) + ax.plot(expo(fin, 60), { stroke: C.blue }) +
    ax.tag(45, 1.7, "powder", { size: 14 }) + ax.tag(130, 1.3, "chips", { size: 14 }) + ax.label(300, fin, "2.2 g for both", { anchor: "end", dy: -8, size: 13, fill: C.muted });
  const alt = "Graph of mass of carbon dioxide lost against time for 5 g of marble: the powder curve is steeper and levels off sooner than the chips curve, but both level off at the same 2.2 g because the same amount of calcium carbonate is used and the acid is in excess.";
  await put("rate-marble-chips-vs-powder", 560, 380, body, alt, "Figure: powder reacts faster (steeper curve) but gives the same total CO₂", "kinetics/factors-and-collision-theory", "Example 1: lumps or powder");
}
{ // Q16 zinc: 1.3 g Zn = 0.02 mol -> 480 cm3 H2
  const fin = 480;
  const ax = D.axes({ x: [0, 300], y: [0, 560], w: 560, h: 380, xTicks: D.range(0, 300, 50), yTicks: D.range(0, 500, 100), xLabel: "Time (s)", yLabel: "Volume of H₂ (cm³)" });
  const body = ax.frame + D.line(ax.X(0), ax.Y(fin), ax.X(300), ax.Y(fin), { stroke: C.muted, width: 1.3, dash: true }) + ax.plot(expo(fin, 15), { stroke: C.amber }) + ax.plot(expo(fin, 55), { stroke: C.blue }) +
    ax.tag(30, 390, "B", { size: 15 }) + ax.tag(120, 300, "A", { size: 15 }) + ax.label(300, fin, "480 cm³", { anchor: "end", dy: -8, size: 13, fill: C.muted });
  const alt = "Graph of volume of hydrogen against time for two experiments with 1.3 g of zinc and excess acid: curve B (zinc powder) is steeper at the start and levels off sooner than curve A (zinc granules), but both level off at the same final volume, 480 cm³.";
  await D.figure("chemistry-o", "rate-zinc-granules-vs-powder", D.svg(560, 380, body), { alt, caption: "Figure: A is zinc granules and B is zinc powder" });
}

// ---------- measuring rates: gas syringe apparatus + graph from Example 1
{
  const b = conical(110, 150, 16, 56, 40, 120, 220) + D.rect(96, 140, 28, 14, { fill: "#d9cbb6", stroke: C.axis, width: 1.5 }) +
    D.polyline([[110, 146], [110, 90], [300, 90]], { stroke: C.axis, width: 2.2 }) +
    D.rect(300, 66, 190, 48, { fill: "#f4f9fb", stroke: C.axis, width: 2 }) + D.rect(301, 67, 73, 46, { fill: "#e8f2f6", stroke: "none" }) + D.line(374, 66, 374, 114, { stroke: C.axis, width: 2 }) +
    D.line(374, 90, 520, 90, { stroke: C.axis, width: 4 }) + D.rect(520, 76, 10, 28, { fill: C.fillGrey, stroke: C.axis, width: 1.5 }) +
    T(110, 296, "conical flask: dilute\nhydrochloric acid\nand magnesium", { anchor: "middle", size: 13 }) +
    T(300, 150, "gas syringe: hydrogen\npushes the plunger out", { size: 13 }) + D.arrow(400, 142, 400, 118, { stroke: C.muted, width: 1.3 }) +
    T(150, 80, "delivery tube", { size: 13 }) +
    T(40, 108, "bung", { size: 13 }) + D.arrow(70, 112, 96, 146, { stroke: C.muted, width: 1.3 }) +
    T(300, 40, "read the volume every 10 s", { anchor: "start", size: 13, weight: 700, fill: C.red }) + D.arrow(400, 46, 410, 62, { stroke: C.red, width: 1.3 });
  await put("measuring-rates-gas-syringe", 560, 340, b,
    "Apparatus for measuring the volume of gas: magnesium and dilute hydrochloric acid in a conical flask closed with a bung, a delivery tube leading to a gas syringe whose plunger moves out as hydrogen collects, with the volume read at regular times.",
    "Figure: following a reaction by collecting the gas in a gas syringe", "kinetics/measuring-rates", "## Method 1: measuring the volume of gas");
}
{
  const data = [[0, 0], [10, 20], [20, 36], [30, 48], [40, 56], [50, 60], [60, 62], [70, 62]];
  const ax = D.axes({ x: [0, 80], y: [0, 70], w: 560, h: 380, xTicks: D.range(0, 80, 10), yTicks: D.range(0, 70, 10), xLabel: "Time (s)", yLabel: "Volume of hydrogen (cm³)" });
  const body = ax.frame + ax.line(data, { stroke: C.blue, width: 2.8 }) + data.map(([t, v]) => ax.point(t, v, { r: 4 })).join("") +
    D.line(ax.X(0), ax.Y(0), ax.X(20), ax.Y(36), { stroke: C.red, width: 1.8, dash: true }) +
    ax.tag(26, 22, "first 20 s: 36 ÷ 20 = 1.8 cm³/s", { size: 13 }) +
    ax.tag(3, 64, "steepest at the start", { size: 13 }) + D.arrow(ax.X(8), ax.Y(64) + 8, ax.X(5), ax.Y(14), { stroke: C.muted, width: 1.3 }) +
    ax.tag(36, 36, "gradient falls as acid is used up", { size: 13 }) + ax.tag(46, 67, "flat: finished, 62 cm³", { size: 13 });
  const alt = "Volume of hydrogen against time from the worked example: 0, 20, 36, 48, 56, 60, 62, 62 cm³ at 10 s intervals; the curve is steepest at the start (average rate 1.8 cm³/s over the first 20 s), the gradient falls as the acid is used up and the curve is flat at 62 cm³ from 60 s when the reaction has finished.";
  await put("measuring-rates-volume-time-graph", 560, 380, body, alt, "Figure: the rate graph from Example 1; the dashed line shows the average rate over the first 20 s", "kinetics/measuring-rates", "Average rate for the whole reaction");
}

// ---------- dynamic equilibrium: concentration and rate against time
{
  const teq = 6;
  const mk = (xl, yl) => D.axes({ x: [0, 10], y: [0, 10], w: 330, h: 340, xTicks: [], yTicks: [], pad: { l: 40, r: 14, t: 58, b: 52 }, xLabel: "Time", yLabel: yl });
  const left = mk(0, "Concentration"), right = mk(0, "Rate");
  const k = 1 - Math.exp(-teq / 1.6);
  const rise = (t) => (t < teq ? (1 - Math.exp(-t / 1.6)) / k : 1);
  const fr = (t) => 8 - 4.6 * rise(t), pr = (t) => 5.4 * rise(t);
  const rf = (t) => 7 - 3.6 * rise(t), rr = (t) => 3.4 * rise(t);
  const lb = left.frame + left.plot(fr, { stroke: C.blue, steps: 200 }) + left.plot(pr, { stroke: C.amber, steps: 200 }) +
    D.line(left.X(teq), left.Y(0), left.X(teq), left.Y(9.6), { stroke: C.muted, width: 1.4, dash: true }) +
    D.text(left.X(teq) + 4, left.Y(9.6) + 4, "equilibrium", { size: 12, fill: C.muted }) +
    D.text(left.X(0.6), left.Y(8.9), "reactants", { size: 13, fill: C.blue, weight: 700 }) + D.text(left.X(6.6), left.Y(5.4) - 10, "products", { size: 13, fill: C.amber, weight: 700 }) +
    D.text(165, 14, "Concentrations become constant", { anchor: "middle", size: 14, weight: 700 });
  const rb = right.frame + right.plot(rf, { stroke: C.blue, steps: 200 }) + right.plot(rr, { stroke: C.amber, steps: 200 }) +
    D.line(right.X(teq), right.Y(0), right.X(teq), right.Y(9.6), { stroke: C.muted, width: 1.4, dash: true }) +
    D.text(right.X(0.6), right.Y(7.8), "forward", { size: 13, fill: C.blue, weight: 700 }) + D.text(right.X(4.2), right.Y(1.0), "reverse", { size: 13, fill: C.amber, weight: 700 }) +
    D.text(right.X(teq) + 6, right.Y(3.4) - 10, "equal", { size: 13 }) +
    D.text(165, 14, "Forward and reverse rates become equal", { anchor: "middle", size: 14, weight: 700 });
  const body = D.group(lb) + D.group(rb, { translate: [340, 0] }) + T(335, 372, "Schematic graphs: not to scale", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Two schematic graphs for a reversible reaction in a closed container: on the left the reactant concentration falls and the product concentration rises until both become constant (not equal) at equilibrium; on the right the forward rate falls and the reverse rate rises until they are equal at the same moment.";
  await put("dynamic-equilibrium-graphs", 670, 380, body, alt, "Figure: at equilibrium the concentrations stop changing because the forward and reverse rates are equal", "equilibrium/dynamic-equilibrium", "On a graph of concentration against time");
}
