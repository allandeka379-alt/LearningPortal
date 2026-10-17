// physics-a nuclear, quantum, solids, superposition (new figures). Run: node .scratch/physics-a/diagrams/modern2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const rad = (d) => (d * Math.PI) / 180;
const f = (v, d = 0) => v.toFixed(d).replace("-", "−");
const sup = (n) => String(n).split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(c)] ?? c).join("");

// ---- Alpha scattering: relative count against angle (log scale)
{
  const data = [[10, 1e6], [20, 63000], [30, 13000], [45, 2700], [60, 920], [90, 230], [120, 100], [150, 66]];
  const a = D.axes({ x: [0, 160], y: [1, 6.4], xTicks: 30, yTicks: [1, 2, 3, 4, 5, 6], xLabel: "scattering angle θ / °", yLabel: "relative number per unit time (log scale)", w: 560, h: 340, yFormat: (v) => `10${sup(v)}`, pad: { l: 64, r: 28, t: 30, b: 56 } });
  let b = a.frame + a.line(data.map(([t, n]) => [t, Math.log10(n)]), { stroke: C.blue });
  for (const [t, n] of data) b += a.point(t, Math.log10(n), { stroke: C.amber, r: 4.5 });
  b += a.tag(62, 5.6, "falls steeply, then flattens:", { size: 14, anchor: "start" }) + a.tag(62, 5.15, "a few always come back (θ > 90°)", { size: 14, anchor: "start" }) + a.tag(92, 2.7, "150°: 66", { size: 14, anchor: "start", fill: C.amber });
  const alt = "Alpha-particle scattering from gold foil: the relative number detected per unit time falls from 1 000 000 at 10° to 13 000 at 30°, 230 at 90° and 66 at 150°; on a log scale the curve drops steeply then flattens, but a few alpha particles still rebound through large angles.";
  const cap = "Figure: alpha particles scattered by a gold foil, number against angle (log scale, values from the lesson table)";
  await D.figure(F, "alpha-scattering-count-angle", D.svg(560, 340, b), { alt, caption: cap });
  D.insertAfter(L("nuclear/atom-nucleus"), "The graph of number against angle is a steeply falling curve", D.md("alpha-scattering-count-angle", alt, cap));
}

// ---- Radiations: penetration schematic and beta energy spectrum
{
  let b = D.text(280, 20, "Radiation from a source meets three barriers", { anchor: "middle", size: 14, weight: 700 });
  const rows = [[70, "alpha", C.red, 200], [140, "beta", C.amber, 300], [210, "gamma", C.blue, null]];
  b += D.rect(20, 40, 40, 190, { fill: C.fillGrey, r: 4 }) + D.text(40, 250, "source", { anchor: "middle", size: 13, fill: C.muted });
  b += D.rect(196, 45, 4, 180, { fill: C.ink, stroke: C.ink }) + D.text(198, 250, "paper", { anchor: "middle", size: 13 });
  b += D.rect(296, 45, 12, 180, { fill: C.fillBlue, stroke: C.blue }) + D.text(302, 250, "few mm Al", { anchor: "middle", size: 13 });
  b += D.rect(396, 45, 50, 180, { fill: C.fillGrey, stroke: C.ink }) + D.text(421, 250, "several cm Pb", { anchor: "middle", size: 13 });
  for (const [y, name, col, stop] of rows) {
    b += D.text(66, y - 12, name, { size: 14, fill: col, weight: 700 });
    if (stop) b += D.arrow(62, y, stop - 4, y, { stroke: col, width: 3 }) + D.text(stop - 8, y + 20, "stopped", { anchor: "end", size: 13, fill: col });
    else b += D.arrow(62, y, 396, y, { stroke: col, width: 3 }) + D.arrow(446, y, 540, y, { stroke: col, width: 1.4, dash: true }) + D.text(500, y - 10, "weaker", { anchor: "middle", size: 13, fill: col });
  }
  b += D.text(280, 285, "alpha: paper or a few cm of air; beta: a few mm of aluminium;", { anchor: "middle", size: 13, fill: C.muted }) + D.text(280, 303, "gamma: intensity reduced by lead, never stopped completely", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Penetrating power: alpha particles are stopped by a sheet of paper, beta particles by a few millimetres of aluminium, and gamma rays pass through both and are only reduced in intensity by several centimetres of lead, never stopped completely.";
  const cap = "Figure: what stops alpha, beta and gamma radiation";
  await D.figure(F, "alpha-beta-gamma-penetration", D.svg(560, 315, b), { alt, caption: cap });
  D.insertAfter(L("nuclear/radiations-decay-equations"), "## Ionising and penetrating power", D.md("alpha-beta-gamma-penetration", alt, cap));

  const spec = [[0, 0], [0.05, 87], [0.1, 100], [0.2, 85], [0.3, 53], [0.4, 21], [0.5, 2.4], [0.55, 0]];
  const a = D.axes({ x: [0, 0.6], y: [0, 115], xTicks: 0.1, yTicks: 20, xLabel: "Ek / MeV", yLabel: "relative number", w: 520, h: 320, xFormat: (v) => v.toFixed(1) });
  let b2 = a.frame + a.line(spec, { stroke: C.blue });
  for (const [e, n] of spec.slice(1, -1)) b2 += a.point(e, n, { stroke: C.amber, r: 4.5 });
  b2 += a.tag(0.17, 110, "continuous: peak near 0.10 MeV, zero at 0.55 MeV", { size: 14, anchor: "start" });
  const alt2 = "Beta energy spectrum: the relative number of beta particles rises to a peak of 100 near 0.10 MeV and falls to zero at the maximum energy of 0.55 MeV, a continuous range, which is why a third particle (the antineutrino) must share the decay energy.";
  const cap2 = "Figure: beta particles have a continuous spread of kinetic energies (values from the lesson table)";
  await D.figure(F, "beta-energy-spectrum", D.svg(520, 320, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("nuclear/radiations-decay-equations"), "The curve rises from zero to a peak at low energy", D.md("beta-energy-spectrum", alt2, cap2));
}

// ---- Hydrogen energy levels and transitions
{
  const lv = [[1, -13.6], [2, -3.4], [3, -1.51], [4, -0.85], [5, -0.54], [Infinity, 0]];
  const top = 50, sc = 19; // px per eV
  const Y = (e) => top - e * sc;
  let b = D.text(20, 24, "Hydrogen energy levels (to scale)", { size: 14, weight: 700 });
  const ly = { Infinity: Y(0) + 4, 5: 72, 4: 88, 3: 104, 2: Y(-3.4) + 4, 1: Y(-13.6) + 4 };
  for (const [n, e] of lv) {
    b += D.line(170, Y(e), 340, Y(e), { width: 2.4 });
    b += D.text(160, ly[n], (n === Infinity ? "n = ∞" : "n = " + n) + "   " + (e === 0 ? "0" : f(e, 2)) + " eV", { size: 13, anchor: "end", weight: 600 });
    if (Math.abs(ly[n] - 4 - Y(e)) > 2) b += D.line(163, ly[n] - 4, 170, Y(e), { stroke: C.muted, width: 1 });
  }
  b += D.arrow(210, Y(-1.51), 210, Y(-3.4) - 3, { stroke: C.red, width: 3 }) + D.text(352, 124, "3 → 2: 1.89 eV, 658 nm (red)", { size: 14, fill: C.red, weight: 600 });
  b += D.arrow(260, Y(-0.85), 260, Y(-3.4) - 3, { stroke: C.blue, width: 3 }) + D.text(352, 62, "4 → 2: 2.55 eV, 488 nm\n(blue-green)", { size: 14, fill: C.blue, weight: 600 });
  b += D.arrow(310, Y(-13.6) - 2, 310, Y(0) + 3, { stroke: C.amber, width: 3 }) + D.text(322, Y(-8), "ionisation: 13.6 eV,", { size: 14, fill: C.amber, weight: 600 }) + D.text(322, Y(-8) + 18, "91.4 nm (UV)", { size: 14, fill: C.amber, weight: 600 });
  const alt = "Hydrogen energy-level diagram to scale: levels at −13.60, −3.40, −1.51, −0.85 and −0.54 eV closing up towards 0 eV; the fall from n = 3 to n = 2 emits 1.89 eV (658 nm, red), 4 to 2 emits 2.55 eV (488 nm, blue-green), and raising the electron from n = 1 to infinity takes 13.6 eV (91.4 nm).";
  const cap = "Figure: energy levels of hydrogen and three transitions from the worked examples";
  await D.figure(F, "hydrogen-energy-levels", D.svg(600, 330, b), { alt, caption: cap });
  D.insertAfter(L("quantum/energy-levels-spectra"), "An energy-level diagram draws these as horizontal lines", D.md("hydrogen-energy-levels", alt, cap));
}

// ---- Solids: loading/unloading beyond the elastic limit; spring energy triangle
{
  const yield_ = (x) => (x <= 2 ? 2 * x : 4 + 2.2 * (1 - Math.exp(-(x - 2) / 2)));
  const xm = 5.5, ym = yield_(xm), xint = xm - ym / 2;
  const a = D.axes({ x: [0, 7], y: [0, 7.5], xTicks: [], yTicks: [], tickLabels: false, xLabel: "extension", yLabel: "force", w: 520, h: 320 });
  let b = a.frame + a.plot(yield_, { domain: [0, xm] }) + a.line([[xm, ym], [xint, 0]], { stroke: C.amber, width: 2.6 }) + a.line([[0, 0], [2.8, 5.6]], { stroke: C.muted, width: 1.4, dash: true });
  b += a.point(2, 4, { stroke: C.blue, r: 5 }) + D.text(a.X(0.15), a.Y(6.9), "straight line up to the\nlimit of proportionality", { size: 14, fill: C.blue, weight: 600 });
  b += a.tag(3.3, 7.1, "plastic deformation", { size: 14, anchor: "start" }) + D.text(a.X(4.3), a.Y(2.6), "unloading line parallel\nto the straight part", { size: 14, fill: C.amber, weight: 600 });
  b += D.arrow(a.X(0), a.Y(0) + 12, a.X(xint), a.Y(0) + 12, { stroke: C.muted, width: 1.6 }) + D.arrow(a.X(xint), a.Y(0) + 12, a.X(0), a.Y(0) + 12, { stroke: C.muted, width: 1.6 }) + D.text(a.X(xint / 2), a.Y(0) + 34, "permanent extension", { size: 14, fill: C.muted, anchor: "middle" });
  const alt = "Force-extension graph for a wire stretched past its elastic limit: the line is straight up to the limit of proportionality, then curves in the plastic region; on unloading the line is parallel to the original straight part and meets the extension axis away from zero, leaving a permanent extension.";
  const cap = "Figure: unloading beyond the elastic limit leaves a permanent extension (sketch)";
  await D.figure(F, "plastic-unloading-curve", D.svg(520, 320, b), { alt, caption: cap });
  D.insertAfter(L("solids/elastic-plastic-energy"), "## Loading and unloading curves", D.md("plastic-unloading-curve", alt, cap));

  const k = 250, x1 = 0.08;
  const a2 = D.axes({ x: [0, 0.1], y: [0, 26], xTicks: 0.02, yTicks: 5, xLabel: "extension / m", yLabel: "F / N", w: 520, h: 320, xFormat: (v) => v.toFixed(2) });
  const b2 = a2.frame + a2.area((x) => k * x, null, [0, x1], { fill: C.fillBlue }) + a2.line([[0, 0], [0.1, 25]], { stroke: C.blue }) + a2.guides(x1, k * x1) + a2.point(x1, k * x1, { stroke: C.amber, r: 5 }) +
    a2.tag(0.003, 24, "k = 250 N/m: F = 20 N at x = 0.080 m", { size: 14, anchor: "start" }) + a2.tag(0.012, 8, "E = area = ½ × 20 × 0.080 = 0.80 J", { size: 14, anchor: "start", fill: C.blue });
  const alt2 = "Force-extension graph for the catapult spring (k = 250 N/m): the straight line reaches 20 N at an extension of 0.080 m, and the area under it, ½ × 20 × 0.080 = 0.80 J, is the elastic potential energy stored.";
  const cap2 = "Figure: elastic energy is the area under the force-extension graph (k = 250 N/m, x = 8.0 cm)";
  await D.figure(F, "spring-energy-area", D.svg(520, 320, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("solids/elastic-plastic-energy"), "For a curved graph, count squares", D.md("spring-energy-area", alt2, cap2));
}

// ---- Diffraction grating: 500 lines/mm, 589 nm
{
  const d = 1 / 5.0e5, lam = 589e-9;
  const orders = [3, 2, 1, 0, -1, -2, -3].map((n) => ({ n, th: (Math.asin((Math.abs(n) * lam) / d) * 180) / Math.PI * Math.sign(n) }));
  const gx = 100, gy = 255, len = 215;
  let b = D.text(10, 22, "Grating 500 lines/mm, sodium light 589 nm", { size: 14, weight: 700 });
  b += D.arrow(20, gy, gx - 4, gy, { stroke: C.amber, width: 3 }) + D.text(10, gy - 12, "incident beam", { size: 13, fill: C.amber });
  b += D.line(gx, gy - 60, gx, gy + 60, { width: 5, stroke: C.muted }) + D.text(gx - 6, gy + 82, "grating", { size: 13, fill: C.muted, anchor: "middle" });
  for (const { n, th } of orders) {
    const ex = gx + len * Math.cos(rad(th)), ey = gy - len * Math.sin(rad(th));
    b += D.line(gx, gy, ex, ey, { stroke: n === 0 ? C.ink : C.blue, width: n === 0 ? 2.6 : 2.2 });
    const lab = n === 0 ? "n = 0 (white for white light)" : `n = ${Math.abs(n)}: ${f(Math.abs(th), 1)}°`;
    b += D.text(ex + 8, ey + (th > 0 ? 4 : 4), n === 0 ? "n = 0" : lab, { size: 13, fill: n === 0 ? C.ink : C.blue, weight: 600 });
  }
  b += D.text(10, 484, "d sin θ = nλ; highest order n ≤ d/λ = 3.40, so n = 3 (7 maxima)", { size: 13, fill: C.muted });
  const alt = "Diffraction grating with 500 lines per mm (d = 2.00 µm) and 589 nm sodium light at normal incidence: maxima appear at 0° and on each side at 17.1° (first order), 36.1° (second) and 62.1° (third); the fourth order would need sin θ > 1, so seven maxima are seen.";
  const cap = "Figure: the seven orders from a 500 lines/mm grating (angles from d sin θ = nλ)";
  await D.figure(F, "grating-orders-fan", D.svg(480, 500, b), { alt, caption: cap });
  D.insertAfter(L("superposition/diffraction-grating"), "## Worked examples", D.md("grating-orders-fan", alt, cap));
}
