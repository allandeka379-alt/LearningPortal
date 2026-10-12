// Diagrams for physics-a circuits and capacitance lessons. Run: node .scratch/physics-a/diagrams/electricity.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C, sym } = D;
const f = (v, d = 2) => v.toFixed(d).replace("-", "−");

// ---- Terminal p.d. against current (battery pack readings from the lesson)
{
  const I = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2], V = [4.28, 4.01, 3.79, 3.52, 3.3, 3.07];
  const E = 4.51, m = -1.21;
  const ax = D.axes({ x: [0, 1.6], y: [0, 5], xTicks: 0.2, yTicks: 1, xLabel: "I / A", yLabel: "V / V", w: 600, h: 400 });
  let body = ax.frame + ax.line([[0, E], [1.5, E + m * 1.5]], { stroke: C.blue, width: 2.6 });
  I.forEach((x, i) => { body += ax.point(x, V[i], { r: 5, stroke: C.amber }); });
  body += ax.point(0, E, { r: 5, stroke: C.red }) + ax.tag(0.05, E, `intercept ≈ ${f(E)} V = E`, { dx: 12, dy: 4, fill: C.red }) +
    ax.tag(0.62, 2.3, `gradient ≈ −${f(-m)} V A⁻¹ = −r, so r ≈ 1.2 Ω`, { fill: C.blue });
  const alt = "Terminal p.d. against current for a battery pack: six points fall on a straight line sloping down; the intercept on the V axis, about 4.51 V, is the e.m.f., and the gradient, about −1.21 V per A, gives the internal resistance, about 1.2 ohms.";
  const cap = "Figure: V = E − Ir, so the intercept is the e.m.f. and the gradient is minus the internal resistance";
  await D.figure(F, "emf-internal-resistance-vi-graph", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("circuits/emf-internal-resistance"), "The points lie on a straight line sloping downwards", D.md("emf-internal-resistance-vi-graph", alt, cap));
}

// ---- Potential divider: 9.0 V, 4.7 k and 2.2 k
{
  const Vin = 9.0, R1 = 4.7, R2 = 2.2, Vout = (Vin * R2) / (R1 + R2);
  const top = 60, bot = 230;
  const body =
    sym.cell(80, 145, { vertical: true, label: `${Vin.toFixed(1)} V` }) +
    sym.wire([[80, 115], [80, top], [180, top]]) + sym.resistor(210, top, { label: `R₁ = ${R1} kΩ` }) + sym.wire([[240, top], [330, top]]) +
    sym.resistor(330, 145, { vertical: true }) + D.text(346, 150, `R₂ = ${R2} kΩ`, { size: 14 }) +
    sym.wire([[330, 175], [330, bot], [80, bot], [80, 175]]) +
    sym.wire([[330, 115], [330, top]]) +
    sym.junction(330, 100) * 0 + D.dot(330, 100, { r: 4 }) + D.dot(330, 190, { r: 4 }) +
    D.line(330, 100, 480, 100, { width: 2 }) + D.line(330, 190, 480, 190, { width: 2 }) +
    D.circle(480, 100, 5, { fill: "#fff" }) + D.circle(480, 190, 5, { fill: "#fff" }) +
    D.arrow(500, 108, 500, 182, { stroke: C.blue, width: 2, arrowStart: true }) + D.text(512, 150, `V_out = ${f(Vout)} V`, { fill: C.blue, size: 15, weight: 700 }) +
    D.text(110, 150, "", {}) + D.text(210, 100, `p.d. across R₁ = ${f(Vin - Vout)} V`, { size: 13, anchor: "middle", fill: C.muted });
  const alt = `Potential divider: a 9.0 V battery across a 4.7 kΩ resistor in series with a 2.2 kΩ resistor; the output taken across the 2.2 kΩ resistor is 9.0 × 2.2/6.9 = ${f(Vout)} V, and the other resistor has ${f(Vin - Vout)} V across it.`;
  const cap = "Figure: the supply p.d. divides in proportion to resistance; the output is taken across R₂";
  await D.figure(F, "potential-divider-circuit", D.svg(640, 270, body), { alt, caption: cap });
  D.insertAfter(L("circuits/potential-dividers"), "## The principle", D.md("potential-divider-circuit", alt, cap));
}

// ---- Kirchhoff: two batteries and a resistor
{
  const E1 = 6, E2 = 4, R1 = 2, R2 = 4, R3 = 6;
  const V = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3);
  const I1 = (E1 - V) / R1, I2 = (E2 - V) / R2, I3 = V / R3;
  const top = 50, bot = 280;
  const col = (x, cell, r, lab1, lab2) =>
    sym.wire([[x, top], [x, cell ? 90 : 120]]) +
    (cell ? sym.cell(x, 120, { vertical: true }) + D.text(x + 24, 124, lab1, { size: 14 }) + sym.wire([[x, 150], [x, 175]]) + sym.resistor(x, 205, { vertical: true }) + D.text(x + 18, 210, lab2, { size: 14 }) + sym.wire([[x, 235], [x, bot]])
      : sym.resistor(x, 165, { vertical: true }) + D.text(x + 18, 170, lab2, { size: 14 }) + sym.wire([[x, 195], [x, bot]]));
  let body = D.line(60, top, 460, top, { width: 2 }) + D.line(60, bot, 460, bot, { width: 2 }) +
    sym.wire([[100, top], [100, 90]]) + sym.cell(100, 120, { vertical: true }) + D.text(124, 124, `${E1.toFixed(1)} V`, { size: 14 }) + sym.wire([[100, 150], [100, 175]]) + sym.resistor(100, 205, { vertical: true }) + D.text(118, 210, `${R1.toFixed(1)} Ω`, { size: 14 }) + sym.wire([[100, 235], [100, bot]]) +
    sym.wire([[260, top], [260, 90]]) + sym.cell(260, 120, { vertical: true }) + D.text(284, 124, `${E2.toFixed(1)} V`, { size: 14 }) + sym.wire([[260, 150], [260, 175]]) + sym.resistor(260, 205, { vertical: true }) + D.text(278, 210, `${R2.toFixed(1)} Ω`, { size: 14 }) + sym.wire([[260, 235], [260, bot]]) +
    sym.wire([[420, top], [420, 135]]) + sym.resistor(420, 165, { vertical: true }) + D.text(438, 170, `${R3.toFixed(1)} Ω`, { size: 14 }) + sym.wire([[420, 195], [420, bot]]) +
    D.dot(100, top, { r: 4 }) + D.dot(260, top, { r: 4 }) + D.dot(420, top, { r: 4 }) + D.dot(100, bot, { r: 4 }) + D.dot(260, bot, { r: 4 }) + D.dot(420, bot, { r: 4 }) +
    D.text(40, top + 5, "X", { size: 16, weight: 700, anchor: "end" }) + D.text(40, bot + 5, "Y", { size: 16, weight: 700, anchor: "end" }) +
    D.arrow(70, 160, 70, 100, { stroke: C.blue, width: 2.2 }) + D.text(62, 124, `I₁ =
${f(I1, 3)} A`, { size: 14, fill: C.blue, anchor: "end" }) +
    D.arrow(230, 160, 230, 100, { stroke: C.blue, width: 2.2 }) + D.text(222, 124, `I₂ =
${f(I2, 3)} A`, { size: 14, fill: C.blue, anchor: "end" }) +
    D.arrow(390, 110, 390, 170, { stroke: C.blue, width: 2.2 }) + D.text(382, 134, `I₃ =
${f(I3, 3)} A`, { size: 14, fill: C.blue, anchor: "end" }) +
    D.text(280, 306, "arrows show the assumed directions;\nI₂ is negative, so the 4.0 V battery is being charged", { size: 13, fill: C.muted, anchor: "middle" });
  const alt = `Circuit for the Kirchhoff worked example: three branches between X (top) and Y (bottom), a 6.0 V battery with 2.0 ohms, a 4.0 V battery with 4.0 ohms, and a 6.0 ohm resistor; the currents are I1 = ${f(I1, 3)} A and I3 = ${f(I3, 3)} A, with I2 = ${f(I2, 3)} A, negative because current actually flows down through the 4.0 V battery.`;
  const cap = "Figure: the three-branch circuit with the currents from the worked solution";
  await D.figure(F, "kirchhoff-two-batteries-circuit", D.svg(560, 340, body), { alt, caption: cap });
  D.insertAfter(L("circuits/kirchhoff-problems"), "## Worked example: two sources", D.md("kirchhoff-two-batteries-circuit", alt, cap));
}

// ---- Capacitor discharge: V = 12 exp(-t/47)
{
  const V0 = 12, RC = 47;
  const ts = [0, 10, 20, 30, 40, 50, 60];
  const v = (t) => V0 * Math.exp(-t / RC);
  const ax = D.axes({ x: [0, 150], y: [0, 13], xTicks: 20, yTicks: 2, xLabel: "t / s", yLabel: "V / V", w: 600, h: 400 });
  let body = ax.frame + ax.plot(v, { domain: [0, 150] });
  ts.forEach((t) => { body += ax.point(t, v(t), { r: 4.5, stroke: C.amber }); });
  body += ax.guides(RC, v(RC)) + ax.point(RC, v(RC), { r: 5, stroke: C.red }) +
    ax.tag(RC, v(RC), `t = RC = 47 s: V = V₀/e = ${f(v(RC))} V`, { dx: 14, dy: -14, fill: C.red }) +
    ax.tag(60, 11.3, "V₀ = 12 V (t = 0)", { dx: 30, dy: 0 }) +
    ax.tag(RC * 2, v(RC * 2), `2RC: ${f(v(RC * 2))} V (13.5%)`, { dx: 12, dy: -22 });
  const alt = `Discharge curve of a 1000 µF capacitor through 47 kΩ from 12 V: the p.d. falls exponentially, V = 12e^(−t/47), to ${f(v(RC))} V (37%) after one time constant RC = 47 s and ${f(v(2 * RC))} V (13.5%) after 94 s, never quite reaching zero.`;
  const cap = "Figure: exponential decay of p.d. in a discharging capacitor, with one time constant marked";
  await D.figure(F, "capacitor-discharge-curve", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("capacitance/discharge"), "After $t = RC$: 37% remains", D.md("capacitor-discharge-curve", alt, cap));

  // ln V against t
  const lnv = (t) => Math.log(V0) - t / RC;
  const a2 = D.axes({ x: [0, 70], y: [0, 3], xTicks: 10, yTicks: 0.5, xLabel: "t / s", yLabel: "ln (V / V)", w: 600, h: 360 });
  let b2 = a2.frame + a2.line([[0, lnv(0)], [70, lnv(70)]], { stroke: C.blue, width: 2.6 });
  ts.forEach((t) => { b2 += a2.point(t, lnv(t), { r: 4.5, stroke: C.amber }); });
  b2 += a2.point(0, lnv(0), { r: 5, stroke: C.red }) + a2.tag(0, lnv(0), `intercept = ln 12 = ${f(Math.log(V0), 3)}`, { dx: 12, dy: 24, fill: C.red }) +
    a2.tag(26, 2.8, `gradient = −1/RC = −${(1 / RC).toFixed(4)} s⁻¹`, { fill: C.blue });
  const alt2 = `Graph of ln V against t for the discharge data: a straight line from an intercept of ln 12 = ${f(Math.log(V0), 3)} falling by about 0.213 every 10 s, so the gradient is −1/RC = −0.0213 per s and RC = 47 s.`;
  const cap2 = "Figure: ln V against t is a straight line whose gradient is −1/RC";
  await D.figure(F, "capacitor-discharge-ln-graph", D.svg(600, 360, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("capacitance/discharge"), "The $\\ln V$ values fall by almost exactly", D.md("capacitor-discharge-ln-graph", alt2, cap2));
}

// ---- Charging curves (fractions of E, Q0 and I0)
{
  const ax = D.axes({ x: [0, 5], y: [0, 1.1], xTicks: 1, yTicks: 0.2, xLabel: "t / RC", yLabel: "fraction of final or initial value", w: 600, h: 380, xFormat: (v) => String(v) });
  const up = (t) => 1 - Math.exp(-t), down = (t) => Math.exp(-t);
  const body = ax.frame + ax.plot(up, { domain: [0, 5] }) + ax.plot(down, { domain: [0, 5], stroke: C.amber }) +
    ax.point(1, up(1), { stroke: C.blue }) + ax.point(1, down(1), { stroke: C.amber }) + ax.guides(1, up(1), { stroke: C.muted }) +
    ax.tag(1, up(1), `V/E and Q/Q₀ rise: ${(up(1) * 100).toFixed(0)}% at t = RC`, { dx: 14, dy: -4, fill: C.blue }) +
    ax.tag(1.15, down(1), `I/I₀ falls: ${(down(1) * 100).toFixed(0)}% at t = RC`, { dx: 12, dy: 28, fill: C.amber });
  const alt = "Charging a capacitor through a resistor: the p.d. and charge rise from zero towards their final values, reaching 63% after one time constant RC, while the current falls from its initial value to 37% in the same time; after 5RC both are within 1% of their limits.";
  const cap = "Figure: charging curves share the time constant RC; current decays as p.d. and charge grow";
  await D.figure(F, "capacitor-charging-curves", D.svg(600, 380, body), { alt, caption: cap });
  D.insertAfter(L("capacitance/discharge"), "## Charging through a resistor", D.md("capacitor-charging-curves", alt, cap));
}

// ---- Energy stored: V-Q graph, C = 2200 uF charged to 12 V (lesson A item)
{
  const Cc = 2200e-6, V = 12, Q = Cc * V, Wst = 0.5 * Q * V, Wb = Q * V;
  const ax = D.axes({ x: [0, 30], y: [0, 14], xTicks: 5, yTicks: 2, xLabel: "Q / mC", yLabel: "V / V", w: 600, h: 400 });
  const body = ax.frame +
    ax.area((q) => V, null, [0, Q * 1000], { fill: C.fillAmber }) +
    ax.area((q) => (V * q) / (Q * 1000), null, [0, Q * 1000], { fill: C.fillBlue }) +
    ax.line([[Q * 1000, V], [0, V]], { stroke: C.amber, width: 2.4 }) + ax.line([[0, 0], [Q * 1000, V]], { stroke: C.blue, width: 2.8 }) +
    ax.line([[Q * 1000, V], [Q * 1000, 0]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.tag(0.8, V + 1.1, `battery e.m.f. E = 12 V: energy supplied QE = ${(Wb * 1000).toFixed(0)} mJ`, { fill: C.amber }) +
    ax.tag(Q * 1000 * 0.52, 3.2, `stored ${(Wst * 1000).toFixed(0)} mJ at Q = ${(Q * 1000).toFixed(1)} mC`, { fill: C.blue, anchor: "start", dx: 36, dy: 0 }) +
    ax.label(Q * 1000 * 0.18, 9.9, `${(Wst * 1000).toFixed(0)} mJ lost as heat`, { size: 14, fill: C.ink });
  const alt = `Graphs for charging a 2200 µF capacitor from a 12 V battery: the capacitor p.d. rises along a straight line from 0 to 12 V as the charge rises to ${(Q * 1000).toFixed(1)} mC; the triangle under it is the energy stored, ${(Wst * 1000).toFixed(0)} mJ, and the rectangle under the battery's 12 V line is the energy supplied, ${(Wb * 1000).toFixed(0)} mJ, so half is dissipated.`;
  const cap = "Figure: the triangle is the energy stored; the rectangle is the energy supplied by the battery";
  await D.figure(F, "capacitor-energy-vq-graph", D.svg(600, 400, body), { alt, caption: cap });
  D.insertAfter(L("capacitance/energy-stored"), "The graphs show why.", D.md("capacitor-energy-vq-graph", alt, cap));
}
console.log("electricity ok");
