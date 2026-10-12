// Diagrams for chemistry-a kinetics lessons. Run: node .scratch/chemistry-a/diagrams/kinetics.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "chemistry-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;

// ---- Volume-time graph with initial-rate tangent (Rudo's CaCO3 data, lesson example 1)
{
  const t = [0, 20, 40, 60, 80, 100, 120, 160, 200], v = [0, 28, 46, 56, 62, 66, 68, 71, 72];
  const ax = D.axes({ x: [0, 200], y: [0, 80], xTicks: 40, yTicks: 20, xLabel: "Time / s", yLabel: "Volume of CO₂ / cm³", w: 560, h: 380 });
  const pts = t.map((x, i) => [x, v[i]]);
  let d = `M${ax.X(0)},${ax.Y(0)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${ax.X(c1[0])},${ax.Y(c1[1])} ${ax.X(c2[0])},${ax.Y(c2[1])} ${ax.X(p2[0])},${ax.Y(p2[1])}`;
  }
  const body = ax.frame + D.path_(d, { stroke: C.blue, width: 2.6 }) + pts.map(([a, b]) => ax.point(a, b, { r: 4, stroke: C.blue })).join("") +
    ax.line([[0, 0], [44, 79.2]], { stroke: C.amber, width: 2, dash: true }) +
    ax.point(30, 54, { r: 4.5, stroke: C.amber }) + ax.tag(34, 60, "tangent at t = 0: 54 cm³ in 30 s", { size: 13, fill: C.amber, dx: 6, dy: -2 }) +
    ax.tag(195, 66, "final volume 72 cm³", { size: 13, anchor: "end", dy: -6 }) +
    ax.tag(100, 30, "gradient flattens: rate falls", { size: 13 });
  const alt = "Volume of carbon dioxide against time for 0.300 g of calcium carbonate with excess acid: the curve rises steeply then levels at 72 cm³, and a dashed tangent at t = 0 through (30 s, 54 cm³) has gradient 1.8 cm³ per second, the initial rate.";
  const cap = "Figure: gas volume against time; the tangent at t = 0 gives the initial rate (1.8 cm³ s⁻¹)";
  await D.figure(F, "rate-gas-volume-time-graph", D.svg(560, 380, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/collisions-boltzmann"), "The rate at any moment is the **gradient of", D.md("rate-gas-volume-time-graph", alt, cap));
}

// ---- Boltzmann distribution: two temperatures, Ea marked
const mb = (kT) => (E) => (2 / Math.sqrt(Math.PI)) * Math.sqrt(E) * Math.exp(-E / kT) / Math.pow(kT, 1.5);
{
  const EaV = 3.2, kT1 = 1.0, kT2 = 1.35;
  const ax = D.axes({ x: [0, 8], y: [0, 0.62], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Energy, E", yLabel: "Number of molecules with energy E", w: 600, h: 400, pad: { l: 40, r: 30, t: 30, b: 56 } });
  const f1 = mb(kT1), f2 = mb(kT2);
  const body = ax.frame +
    ax.area(f2, f1, [EaV, 8], { fill: C.fillAmber }) + ax.area(f1, null, [EaV, 8], { fill: C.fillBlue }) +
    ax.plot(f1, { stroke: C.blue, width: 2.8, domain: [0, 8] }) + ax.plot(f2, { stroke: C.amber, width: 2.8, domain: [0, 8] }) +
    D.line(ax.X(EaV), ax.Y(0), ax.X(EaV), ax.Y(0.55), { stroke: C.ink, width: 1.8, dash: true }) + D.text(ax.X(EaV), ax.Y(0.55) - 8, "Ea", { anchor: "middle", weight: 700 }) +
    ax.tag(0.9, 0.55, "lower temperature T₁", { fill: C.blue, size: 14, dx: 8 }) + ax.tag(4.2, 0.4, "higher temperature T₂: lower,\nbroader, peak to the right", { fill: C.amber, size: 13 }) +
    D.text(ax.X(5.2), ax.Y(0.2), "extra molecules with E ≥ Ea\nat T₂ (amber area)", { size: 13, fill: C.amber }) +
    D.text(ax.X(4.3), ax.Y(0.025), "E ≥ Ea at T₁ (blue area)", { size: 13, fill: C.blue });
  const alt = "Maxwell-Boltzmann distribution at two temperatures: both curves start at the origin and have the same area; the higher-temperature curve is lower and broader with its peak to the right, so the area beyond the activation energy Ea (the molecules able to react) is much larger.";
  const cap = "Figure: Boltzmann distributions at T₁ and a higher T₂; the area beyond Ea grows with temperature";
  await D.figure(F, "boltzmann-temperature", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/collisions-boltzmann"), "At a higher temperature the curve is **flatter and broader**", D.md("boltzmann-temperature", alt, cap));
}
// ---- Boltzmann: catalyst moves Ea left (same curve)
{
  const Ea = 3.6, Eac = 2.2, f = mb(1.0);
  const ax = D.axes({ x: [0, 8], y: [0, 0.62], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Energy, E", yLabel: "Number of molecules with energy E", w: 600, h: 380, pad: { l: 40, r: 30, t: 30, b: 56 } });
  const body = ax.frame + ax.area(f, null, [Eac, Ea], { fill: C.fillAmber }) + ax.area(f, null, [Ea, 8], { fill: C.fillBlue }) + ax.plot(f, { stroke: C.blue, width: 2.8 }) +
    D.line(ax.X(Ea), ax.Y(0), ax.X(Ea), ax.Y(0.5), { stroke: C.ink, width: 1.8, dash: true }) + D.text(ax.X(Ea) + 6, ax.Y(0.5) + 4, "Ea (uncatalysed)", { size: 14, weight: 700 }) +
    D.line(ax.X(Eac), ax.Y(0), ax.X(Eac), ax.Y(0.38), { stroke: C.amber, width: 1.8, dash: true }) + D.text(ax.X(Eac) - 6, ax.Y(0.38) - 8, "Ea (catalysed)", { size: 14, weight: 700, fill: C.amber, anchor: "end" }) +
    D.text(ax.X(5.2), ax.Y(0.25), "one curve, same temperature:\nthe catalyst does not change it", { size: 13, fill: C.muted }) +
    D.text(ax.X(4.6), ax.Y(0.075), "blue: E ≥ Ea (uncatalysed)", { size: 13, fill: C.blue }) +
    D.text(ax.X(1.2), ax.Y(0.5), "amber: extra molecules able\nto react with the catalyst", { size: 13, fill: C.amber });
  const alt = "Boltzmann distribution at one temperature with two activation energies: the catalysed Ea line lies to the left of the uncatalysed Ea line, so the area of the curve beyond it, the molecules with enough energy to react, is larger, while the curve itself is unchanged.";
  const cap = "Figure: a catalyst lowers Ea, so more molecules have enough energy; the distribution itself is unchanged";
  await D.figure(F, "boltzmann-catalyst", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/collisions-boltzmann"), "A catalyst does **not** change the Boltzmann distribution", D.md("boltzmann-catalyst", alt, cap));
}

// ---- Energy profiles (qualitative; no invented numbers)
function profile({ R, P, peaks, X = 10 }) {
  const step = (x) => 0.5 * (1 + Math.tanh((x - X / 2) / 1.3));
  const bump = (x) => peaks.reduce((s, pk) => s + pk.h * Math.exp(-(((x - pk.x) / pk.w) ** 2)), 0);
  return (x) => R + (P - R) * step(x) + bump(x);
}
const topIn = (f, a, b) => { let m = [a, -1e9]; for (let x = a; x <= b; x += 0.01) if (f(x) > m[1]) m = [x, f(x)]; return m; };
const botIn = (f, a, b) => { let m = [a, 1e9]; for (let x = a; x <= b; x += 0.01) if (f(x) < m[1]) m = [x, f(x)]; return m; };
const profAxes = () => D.axes({ x: [0, 10], y: [0, 125], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Progress of reaction", yLabel: "Energy", w: 600, h: 400, pad: { l: 40, r: 30, t: 30, b: 56 } });
{
  const R = 70, P = 30;
  const f1 = profile({ R, P, peaks: [{ x: 5, h: 52, w: 1.1 }] });
  const f2 = profile({ R, P, peaks: [{ x: 5, h: 22, w: 1.1 }] });
  const ax = profAxes();
  const [px, py] = topIn(f1, 0, 10), [cx, cy] = topIn(f2, 0, 10);
  const body = ax.frame + ax.plot(f1, { stroke: C.blue, width: 2.8 }) + ax.plot(f2, { stroke: C.amber, width: 2.8 }) +
    D.line(ax.X(0), ax.Y(R), ax.X(2.8), ax.Y(R), { stroke: C.muted, width: 1.3, dash: true }) +
    D.line(ax.X(7.2), ax.Y(P), ax.X(10), ax.Y(P), { stroke: C.muted, width: 1.3, dash: true }) +
    D.arrow(ax.X(1.6), ax.Y(R), ax.X(1.6), ax.Y(py), { stroke: C.blue, width: 1.8 }) + D.text(ax.X(1.5), ax.Y((R + py) / 2) + 4, "Ea\n(uncatalysed)", { anchor: "end", size: 13, fill: C.blue }) +
    D.arrow(ax.X(2.6), ax.Y(R), ax.X(2.6), ax.Y(cy), { stroke: C.amber, width: 1.8 }) + D.text(ax.X(2.2), ax.Y(cy) - 8, "Ea (catalysed)", { size: 13, fill: C.amber }) +
    D.arrow(ax.X(8.8), ax.Y(R), ax.X(8.8), ax.Y(P), { stroke: C.red, width: 1.8 }) + D.text(ax.X(8.7), ax.Y((R + P) / 2) + 4, "ΔH (same\nfor both)", { anchor: "end", size: 13, fill: C.red }) +
    ax.tag(0.15, R + 12, "reactants", { size: 14 }) + ax.tag(8.0, P - 6, "products", { size: 14 }) +
    D.text(ax.X(px) + 14, ax.Y(py) + 4, "uncatalysed", { size: 13, fill: C.blue, weight: 700 }) + D.text(ax.X(cx) + 36, ax.Y(cy) + 4, "catalysed", { size: 13, fill: C.amber, weight: 700 });
  const alt = "Energy profile of an exothermic reaction: reactants at a higher energy than products; the catalysed path has a lower peak, so a smaller activation energy, but starts and ends at the same energy levels, so the enthalpy change is unchanged.";
  const cap = "Figure: a catalyst lowers the activation energy; reactant and product levels, and ΔH, are the same";
  await D.figure(F, "energy-profile-catalyst", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/collisions-boltzmann"), "A reaction pathway (energy profile) diagram plots", D.md("energy-profile-catalyst", alt, cap));
}
{
  const R = 70, P = 30;
  const f1 = profile({ R, P, peaks: [{ x: 5, h: 52, w: 1.1 }] });
  const f2 = profile({ R, P, peaks: [{ x: 3.2, h: 26, w: 0.85 }, { x: 6.8, h: 20, w: 0.85 }] });
  const ax = profAxes();
  const [p1x, p1y] = topIn(f2, 1, 5), [p2x, p2y] = topIn(f2, 5, 9), [dx, dy] = botIn(f2, p1x, p2x);
  const [ux, uy] = topIn(f1, 0, 10);
  const body = ax.frame + ax.plot(f1, { stroke: C.blue, width: 2.8 }) + ax.plot(f2, { stroke: C.amber, width: 2.8 }) +
    D.line(ax.X(0), ax.Y(R), ax.X(2.2), ax.Y(R), { stroke: C.muted, width: 1.3, dash: true }) +
    D.arrow(ax.X(0.9), ax.Y(R), ax.X(0.9), ax.Y(uy), { stroke: C.blue, width: 1.8 }) + D.text(ax.X(1.0), ax.Y(uy) + 18, "Ea (uncatalysed)", { size: 13, fill: C.blue }) +
    D.arrow(ax.X(2.1), ax.Y(R), ax.X(2.1), ax.Y(p1y), { stroke: C.amber, width: 1.8 }) +
    D.text(ax.X(p1x) - 6, ax.Y(p1y) - 10, "step 1: catalyst used", { size: 13, fill: C.amber, anchor: "end" }) + D.text(ax.X(p2x) + 6, ax.Y(p2y) - 10, "step 2: catalyst\nregenerated", { size: 13, fill: C.amber }) +
    D.text(ax.X(dx), ax.Y(dy) + 22, "intermediate", { size: 13, anchor: "middle" }) +
    ax.tag(0.15, R + 12, "reactants", { size: 14 }) + ax.tag(8.4, P - 6, "products", { size: 14 }) + D.text(ax.X(ux), ax.Y(uy) - 8, "uncatalysed route", { size: 13, fill: C.blue, anchor: "middle", weight: 700 });
  const alt = "Energy profile for homogeneous catalysis: the uncatalysed route has one high peak; the catalysed route has two lower peaks with a dip between them for an intermediate, the catalyst reacting in step 1 and being regenerated in step 2, and both end at the same product energy.";
  const cap = "Figure: homogeneous catalysis gives a two-step route with two lower activation energies";
  await D.figure(F, "energy-profile-two-step-catalysis", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/catalysis"), "A homogeneous catalyst offers a different route", D.md("energy-profile-two-step-catalysis", alt, cap));
}

// ---- Rate equation graphs: concentration-time and rate-concentration for orders 0, 1, 2
{
  const w = 620, h = 300;
  const a = D.axes({ x: [0, 10], y: [0, 1.1], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Time", yLabel: "[X]", w: 300, h, pad: { l: 30, r: 16, t: 26, b: 52 } });
  const b = D.axes({ x: [0, 1.1], y: [0, 1.1], xTicks: [], yTicks: [], tickLabels: false, xLabel: "[X]", yLabel: "Rate", w: 300, h, pad: { l: 30, r: 16, t: 26, b: 52 } });
  const pa = a.line([[0, 1.0], [10, 0.0]], { stroke: C.red, width: 2.6 }) +
    a.plot((t) => Math.exp(-0.25 * t), { stroke: C.blue, width: 2.6 }) +
    a.plot((t) => 1 / (1 + 0.9 * t), { stroke: C.amber, width: 2.6 }) +
    a.tag(2.2, 0.2, "second order", { size: 13, fill: C.amber, dx: 20, dy: -2 }) + a.tag(5.6, 0.5, "first order", { size: 13, fill: C.blue }) + a.tag(2.0, 0.78, "zero order", { size: 13, fill: C.red, dx: 0, dy: 0 });
  const pb = b.line([[0, 0.5], [1.05, 0.5]], { stroke: C.red, width: 2.6 }) + b.line([[0, 0], [1.05, 1.0]], { stroke: C.blue, width: 2.6 }) +
    b.plot((x) => x * x, { stroke: C.amber, width: 2.6, domain: [0, 1.05] }) +
    b.tag(0.1, 0.5, "zero: flat", { size: 13, fill: C.red, dy: -8 }) + b.tag(0.05, 1.0, "first: straight line", { size: 13, fill: C.blue }) + b.tag(0.55, 0.15, "second: curves up", { size: 13, fill: C.amber });
  const body = D.group(a.frame + pa, { translate: [0, 24] }) + D.group(b.frame + pb, { translate: [320, 24] }) +
    D.text(150, 18, "concentration against time", { anchor: "middle", size: 14, weight: 700 }) + D.text(470, 18, "rate against concentration", { anchor: "middle", size: 14, weight: 700 });
  const alt = "Two graph panels for orders 0, 1 and 2. Concentration against time: zero order is a straight falling line, first order a curve with constant half-life, second order a curve that flattens more slowly. Rate against concentration: zero order is horizontal, first order a straight line through the origin, second order curves upward.";
  const cap = "Figure: concentration-time and rate-concentration graphs for zero, first and second order";
  await D.figure(F, "rate-order-graphs", D.svg(w, h + 24, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/rate-equations"), "- **second order**: a curve through the origin", D.md("rate-order-graphs", alt, cap));
}
// ---- First-order half-life (Example 2: t1/2 = 345 s, c0 = 0.0800)
{
  const th = 345, c0 = 0.08;
  const ax = D.axes({ x: [0, 1200], y: [0, 0.09], xTicks: [345, 690, 1035], yTicks: [0.02, 0.04, 0.06, 0.08], yFormat: (v) => v.toFixed(3), w: 580, h: 380, xLabel: "Time / s", yLabel: "Concentration / mol dm⁻³", pad: { l: 78, r: 24, t: 30, b: 56 } });
  let body = ax.frame + ax.plot((t) => c0 * Math.exp((-Math.LN2 * t) / th), { stroke: C.blue, width: 2.8 });
  for (let i = 1; i <= 3; i += 1) {
    const t = th * i, c = c0 / 2 ** i;
    body += ax.guides(t, c) + ax.point(t, c, { r: 4.5, stroke: C.amber, fill: C.amber });
  }
  body += ax.tag(345, 0.055, "0.0800 → 0.0400 in 345 s", { size: 13, dx: 14, dy: -34, anchor: "start" }) + ax.tag(690, 0.034, "0.0400 → 0.0200 in 345 s", { size: 13, dx: 14, dy: -20, anchor: "start" }) + ax.tag(1035, 0.016, "0.0200 → 0.0100 in 345 s", { size: 13, dx: -190, dy: -34, anchor: "start" });
  const alt = "Concentration-time curve for a first-order reaction with half-life 345 s starting at 0.0800 mol per dm³: the concentration is 0.0400 at 345 s, 0.0200 at 690 s and 0.0100 at 1035 s, so every half-life is the same length, which proves first order.";
  const cap = "Figure: a first-order reaction has a constant half-life (345 s here)";
  await D.figure(F, "first-order-half-life", D.svg(580, 380, body), { alt, caption: cap });
  D.insertAfter(L("kinetics/rate-equations"), "To show from a graph that a reaction is first order", D.md("first-order-half-life", alt, cap));
}
