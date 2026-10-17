// biology-a enzymes + oxygen transport. Run: node .scratch/biology-a/diagrams/enzymes.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curve, fig } from "./_h.mjs";

// ---- Michaelis-Menten with inhibitors: exactly the worked-solution table
{
  const mm = (V, K) => (s) => (V * s) / (K + s);
  const S = [0.5, 1, 2, 4, 8, 16, 32];
  const none = mm(0.8, 2), P = mm(0.8, 5), Q = mm(0.4, 2);
  const ax = D.axes({ x: [0, 32], y: [0, 0.9], w: 600, h: 420, xTicks: [0, 4, 8, 12, 16, 20, 24, 28, 32], yTicks: [0, 0.2, 0.4, 0.6, 0.8], xLabel: "Substrate / mmol dm⁻³", yLabel: "Initial rate / µmol min⁻¹", pad: { l: 70, r: 40, t: 34, b: 58 } });
  let b = ax.frame;
  b += D.line(ax.X(0), ax.Y(0.8), ax.X(32), ax.Y(0.8), { stroke: C.muted, width: 1.4, dash: true }) + D.text(ax.X(32), ax.Y(0.8) - 6, "Vmax 0.80", { anchor: "end", size: 13, fill: C.muted });
  b += D.line(ax.X(0), ax.Y(0.4), ax.X(32), ax.Y(0.4), { stroke: C.muted, width: 1.4, dash: true }) + D.text(ax.X(32), ax.Y(0.4) - 6, "half Vmax 0.40", { anchor: "end", size: 13, fill: C.muted });
  b += ax.plot(none, { stroke: C.blue, steps: 300 }) + ax.plot(P, { stroke: C.amber, steps: 300 }) + ax.plot(Q, { stroke: C.red, steps: 300, dash: true });
  b += D.line(ax.X(2), ax.Y(0.4), ax.X(2), ax.Y(0), { stroke: C.blue, width: 1.4, dash: true });
  b += D.line(ax.X(5), ax.Y(0.4), ax.X(5), ax.Y(0), { stroke: C.amber, width: 1.4, dash: true });
  b += ax.point(2, 0.4, { stroke: C.blue }) + ax.point(5, 0.4, { stroke: C.amber });
  b += D.text(ax.X(2) + 5, ax.Y(0) - 8, "Km 2", { size: 13, fill: C.blue, weight: 700 }) + D.text(ax.X(5) + 5, ax.Y(0) - 8, "Km about 5 (P)", { size: 13, fill: C.amber, weight: 700 });
  b += ax.tag(14, none(14) , "No inhibitor", { fill: C.blue, dy: -26 }) + ax.tag(20, P(20), "P: competitive", { fill: C.amber, dy: 28, dx: 0 }) + ax.tag(20, Q(20), "Q: non-competitive", { fill: C.red, dy: 28 });
  const alt = "Rate against substrate concentration for an enzyme: with no inhibitor the curve levels towards a Vmax of 0.80 and reaches half Vmax (0.40) at Km 2 mmol per dm3; competitive inhibitor P reaches the same Vmax but its Km rises to about 5; non-competitive inhibitor Q levels off at only 0.40 with Km still 2.";
  const cap = "Figure: Michaelis-Menten curves from the worked data; a competitive inhibitor raises Km, a non-competitive one lowers Vmax";
  await fig("enzyme-inhibitors-vmax-km", D.svg(600, 420, b), alt, cap, "enzymes/inhibition-kinetics", "Vmax** is the rate the curve approaches");
}

// ---- Oxygen dissociation curves: values exactly as the worked-solution table
{
  const p = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14];
  const lo = [0, 10, 30, 45, 60, 72, 80, 90, 95, 97, 98];
  const hi = [0, 5, 18, 32, 45, 58, 68, 82, 91, 95, 97];
  const ax = D.axes({ x: [0, 14], y: [0, 100], w: 600, h: 420, xTicks: 2, yTicks: 20, xLabel: "Partial pressure of oxygen / kPa", yLabel: "Saturation of haemoglobin / %", pad: { l: 70, r: 40, t: 34, b: 58 } });
  let b = ax.frame;
  b += curve(ax, p.map((x, i) => [x, lo[i]]), { stroke: C.blue }) + curve(ax, p.map((x, i) => [x, hi[i]]), { stroke: C.amber });
  b += D.line(ax.X(4), ax.Y(60), ax.X(4), ax.Y(45), { stroke: C.ink, width: 1.4 });
  for (const [x, y, c] of [[12, 97, C.blue], [4, 60, C.blue], [4, 45, C.amber]]) b += ax.point(x, y, { stroke: c });
  b += D.line(ax.X(4), ax.Y(60), ax.X(4), ax.Y(0), { stroke: C.muted, width: 1.2, dash: true }) + D.line(ax.X(12), ax.Y(97), ax.X(12), ax.Y(0), { stroke: C.muted, width: 1.2, dash: true });
  b += ax.tag(12, 30, "lungs 12 kPa: 97% (low CO₂)", { anchor: "end", dx: 60 }) + ax.tag(4, 60, "60%", { anchor: "end", dx: -8, dy: -6, fill: C.blue }) + ax.tag(4, 45, "45%", { dx: 12, dy: 18, fill: C.amber });
  b += ax.tag(0.4, 94, "low CO₂ (blue)", { fill: C.blue, dx: 20 }) + ax.tag(0.4, 82, "high CO₂ (amber)", { fill: C.amber, dx: 20 });
  const alt = "Oxygen dissociation curves of adult haemoglobin: both are S-shaped and nearly flat at 97% (low CO2) and 95% (high CO2) at 12 kPa in the lungs; at 4 kPa in a muscle saturation is 60% at low CO2 but only 45% at high CO2, so the Bohr shift to the right unloads more oxygen.";
  const cap = "Figure: S-shaped oxygen dissociation curves at low and high carbon dioxide (data from the worked solution)";
  await fig("oxygen-dissociation-bohr", D.svg(600, 420, b), alt, cap, "mammal-transport/gas-transport", "Once three are bound");
}
