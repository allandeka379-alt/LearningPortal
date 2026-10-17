// physics-a electricity, circuits, energy. Run: node .scratch/physics-a/diagrams/electricity2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const g = 9.81;
const rad = (d) => (d * Math.PI) / 180;
const f = (v, d = 0) => v.toFixed(d).replace("-", "−");

// ---- I-V characteristics: lamp (table), diode (table), ohmic wire (qualitative)
{
  const lamp = [[0, 0], [1, 0.62], [2, 0.95], [4, 1.3], [6, 1.58], [8, 1.8], [10, 1.98], [12, 2.1]];
  const a = D.axes({ x: [0, 13], y: [0, 2.4], xTicks: 2, yTicks: 0.5, xLabel: "V / V", yLabel: "I / A", w: 560, h: 340 });
  let b = a.frame + a.line([[0, 0], [12, 2.1]], { stroke: C.muted, width: 1.6, dash: true }) + a.line(lamp, { stroke: C.blue });
  for (const [v, i] of lamp.slice(1)) b += a.point(v, i, { stroke: C.blue, r: 4 });
  b += a.tag(4.6, 0.55, `at 12.0 V: R = V/I = 12.0/2.10 = ${f(12 / 2.1, 2)} Ω`, { size: 14, fill: C.muted });
  b += a.tag(4.6, 0.2, `at 6.0 V: R = 6.0/1.58 = ${f(6 / 1.58, 2)} Ω`, { size: 14, fill: C.blue });
  b += a.tag(5.6, 2.3, "curve flattens: R rises as the filament heats", { size: 14, anchor: "start" });
  const alt = "I-V graph of the 12 V vehicle lamp from the table: the curve through the origin bends towards the V axis, so resistance V/I rises from 1.61 Ω at 1.0 V to 3.80 Ω at 6.0 V and 5.71 Ω at 12.0 V; the dashed chord to the 12 V point has gradient 1/R.";
  const cap = "Figure: I-V characteristic of a filament lamp (points from the lesson table)";
  await D.figure(F, "filament-lamp-iv-graph", D.svg(560, 340, b), { alt, caption: cap });
  D.insertAfter(L("electricity/resistance-iv"), "The graph of $I$ against $V$ curves over", D.md("filament-lamp-iv-graph", alt, cap));

  const dio = [[0, 0], [0.4, 0.01], [0.55, 0.3], [0.6, 1.2], [0.65, 5], [0.7, 18], [0.75, 55]];
  const d = D.axes({ x: [-1, 0.8], y: [0, 60], xTicks: 0.2, yTicks: 10, xLabel: "V / V", yLabel: "I / mA", w: 560, h: 340, xFormat: (v) => (Math.round(v * 10) / 10).toString().replace("-", "−") });
  let b2 = d.frame + d.line([[-1, 0], [0, 0]], { stroke: C.blue }) + d.line(dio, { stroke: C.blue });
  b2 += d.point(0.6, 1.2, { stroke: C.amber, r: 5 }) + d.point(0.7, 18, { stroke: C.amber, r: 5 }) + d.point(0.75, 55, { stroke: C.blue });
  b2 += d.tag(-0.95, 52, "0.60 V: R = 500 Ω", { size: 14, fill: C.amber }) + d.tag(-0.95, 40, "0.70 V: R = 38.9 Ω", { size: 14, fill: C.amber });
  b2 += d.tag(-0.95, 28, "reverse bias: almost no current", { size: 14 }) ;
  b2 += d.tag(-0.95, 16, "threshold about 0.6 V", { size: 14, fill: C.blue });
  const alt2 = "I-V graph of a silicon diode: no current in reverse bias or below about 0.6 V forward, then the current rises very steeply (1.2 mA at 0.60 V, 18 mA at 0.70 V, 55 mA at 0.75 V), so its resistance falls from 500 Ω to 38.9 Ω.";
  const cap2 = "Figure: I-V characteristic of a silicon diode (points from the lesson table)";
  await D.figure(F, "silicon-diode-iv-graph", D.svg(560, 340, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("electricity/resistance-iv"), "## The semiconductor diode", D.md("silicon-diode-iv-graph", alt2, cap2));

  const o = D.axes({ x: [-3, 3], y: [-3, 3], xTicks: [], yTicks: [], tickLabels: false, xLabel: "V", yLabel: "I", w: 480, h: 300, pad: { l: 40, r: 40, t: 28, b: 40 } });
  const b3 = o.frame + o.line([[-2.6, -2.6], [2.6, 2.6]], { stroke: C.blue }) + o.tag(0.4, 2.7, "straight line through the origin", { size: 14, anchor: "start" }) + o.tag(-2.9, -2.2, "V/I is constant", { size: 14, fill: C.blue }) + o.tag(0.3, -1.6, "reverse V, reverse I", { size: 14, anchor: "start" });
  const alt3 = "I-V graph of a metal wire at constant temperature: a straight line through the origin in both directions, so V/I is the same at every point and the wire is ohmic.";
  const cap3 = "Figure: an ohmic conductor at constant temperature (sketch)";
  await D.figure(F, "ohmic-conductor-iv-graph", D.svg(480, 300, b3), { alt: alt3, caption: cap3 });
  D.insertAfter(L("electricity/resistance-iv"), "## Ohmic conductors", D.md("ohmic-conductor-iv-graph", alt3, cap3));
}

// ---- Current-time graph: 4.0 mA falling to zero in 10 s, Q = 0.020 C
{
  const a = D.axes({ x: [0, 12], y: [0, 5], xTicks: 2, yTicks: 1, xLabel: "t / s", yLabel: "I / mA", w: 520, h: 300 });
  const b = a.frame + a.area((t) => 4 * (1 - t / 10), null, [0, 10], { fill: C.fillBlue }) + a.line([[0, 4], [10, 0]], { stroke: C.blue }) +
    a.tag(4.4, 3.5, "Q = area = ½ × 4.0 × 10⁻³ × 10 = 0.020 C", { size: 14, fill: C.blue, anchor: "start" });
  const alt = "Current-time graph: a current falling steadily from 4.0 mA to zero in 10 s; the area under the line, a triangle of ½ × 4.0 × 10⁻³ A × 10 s, is the charge that flowed, 0.020 C.";
  const cap = "Figure: charge is the area under a current-time graph";
  await D.figure(F, "current-time-area-charge", D.svg(520, 300, b), { alt, caption: cap });
  D.insertAfter(L("electricity/current-charge"), "## Current-time graphs", D.md("current-time-area-charge", alt, cap));
}

// ---- Series-parallel network: 12 V, 2.0 ohm in series with 6.0 || 12 ohm
{
  const S = D.sym;
  let b = S.cell(80, 170, { vertical: true, label: "12 V" });
  b += S.wire([[80, 140], [80, 70], [200, 70]]) + S.resistor(230, 70, { label: "2.0 Ω" }) + S.wire([[260, 70], [440, 70]]);
  b += S.wire([[340, 70], [340, 110]]) + S.resistor(340, 140, { vertical: true, label: "6.0 Ω" }) + S.wire([[340, 170], [340, 270]]);
  b += S.wire([[440, 70], [440, 140]]) + S.resistor(440, 170, { vertical: true, label: "12 Ω" }) + S.wire([[440, 200], [440, 270]]);
  b += S.wire([[80, 200], [80, 270], [440, 270]]) + S.junction(340, 70) + S.junction(340, 270);
  b += D.arrow(130, 52, 170, 52, { stroke: C.amber, width: 2.4 }) + D.text(150, 40, "I = 2.0 A", { anchor: "middle", size: 14, fill: C.amber, weight: 600 });
  b += D.text(230, 108, "4.0 V", { anchor: "middle", size: 14, fill: C.blue, weight: 600 });
  b += D.text(280, 330, "8.0 V across both branches (R = 4.0 Ω)", { anchor: "middle", size: 14, fill: C.blue, weight: 600 });
  b += D.text(352, 215, "1.33 A", { anchor: "start", size: 14, fill: C.amber, weight: 600 }) + D.text(452, 240, "0.667 A", { anchor: "start", size: 14, fill: C.amber, weight: 600 });
  b += D.text(280, 355, "1.33 + 0.667 = 2.0 A (current in = current out)", { anchor: "middle", size: 14, fill: C.muted });
  const alt = "Series-parallel circuit on a 12 V supply: a 2.0 Ω resistor in series with 6.0 Ω and 12 Ω in parallel (4.0 Ω together); the supply current is 2.0 A, 4.0 V across the 2.0 Ω and 8.0 V across the pair, which carry 1.33 A and 0.667 A.";
  const cap = "Figure: the worked series-parallel network with currents and p.d.s";
  await D.figure(F, "series-parallel-network", D.svg(560, 370, b), { alt, caption: cap });
  D.insertAfter(L("circuits/series-parallel"), "## Sharing p.d. and current", D.md("series-parallel-network", alt, cap));
}

// ---- Potentiometer: 1.000 m wire, 2.00 V across it, balance at 72.5 cm
{
  const S = D.sym, x0 = 70, px = 4, lb = 72.5, xj = x0 + lb * px, Vw = 2.0;
  let b = D.rect(x0, 196, 100 * px, 8, { fill: C.fillGrey, stroke: C.ink, width: 2 }) + D.text(x0 - 8, 190, "A", { anchor: "end", weight: 700 }) + D.text(x0 + 100 * px + 8, 190, "B", { weight: 700 });
  b += S.wire([[x0, 204], [x0, 300], [130, 300]]) + S.cell(160, 300) + S.wire([[190, 300], [218, 300]]) + S.resistor(240, 300) + S.wire([[262, 300], [x0 + 100 * px, 300], [x0 + 100 * px, 204]]);
  b += D.text(160, 340, "driver cell + rheostat", { anchor: "middle", size: 14, fill: C.muted });
  b += S.wire([[x0, 196], [x0, 100], [120, 100]]) + S.cell(150, 100) + S.wire([[180, 100], [200, 100]]) + S.meter(230, 100, "G") + S.wire([[260, 100], [xj, 100], [xj, 172]]);
  b += D.text(150, 70, "test cell E", { anchor: "middle", size: 14, fill: C.muted });
  b += D.polyline([[xj, 196], [xj - 9, 172], [xj + 9, 172]], { fill: C.amber, close: true, stroke: C.amber }) + D.text(xj + 14, 168, "jockey J", { size: 14, fill: C.amber });
  b += D.arrow(x0, 232, xj, 232, { width: 2, stroke: C.blue }) + D.arrow(xj, 232, x0, 232, { width: 2, stroke: C.blue }) + D.text((x0 + xj) / 2, 252, `balance length l = ${lb} cm (G reads zero)`, { anchor: "middle", size: 14, fill: C.blue, weight: 600 });
  b += D.text(280, 20, `whole wire: 100.0 cm with ${Vw.toFixed(2)} V across it = ${(Vw / 100).toFixed(4)} V/cm`, { anchor: "middle", size: 14 });
  b += D.text(280, 380, `E = ${(Vw / 100).toFixed(4)} × ${lb} = ${((Vw / 100) * lb).toFixed(2)} V`, { anchor: "middle", size: 15, weight: 700 });
  const alt = "Potentiometer circuit: a driver cell with rheostat across the 100.0 cm wire AB gives 2.00 V (0.0200 V per cm); a test cell in series with a galvanometer and a jockey balances at 72.5 cm so no current flows in the test cell and its e.m.f. is 0.0200 × 72.5 = 1.45 V.";
  const cap = "Figure: a potentiometer balanced at 72.5 cm, giving E = 1.45 V";
  await D.figure(F, "potentiometer-circuit", D.svg(560, 400, b), { alt, caption: cap });
  D.insertAfter(L("circuits/potentiometer"), "## How the potentiometer works", D.md("potentiometer-circuit", alt, cap));
}

// ---- Energy against height: ball 0.15 kg dropped from 20 m (free fall and with air resistance)
{
  const m = 0.15, H = 20, Et = m * g * H, Ek = 0.5 * m * 17.6 ** 2;
  const a = D.axes({ x: [0, 22], y: [0, 36], xTicks: 5, yTicks: 5, xLabel: "height h / m", yLabel: "energy / J", w: 560, h: 340 });
  const ep = (h) => m * g * h, ekf = (h) => m * g * (H - h);
  const b = a.frame + a.line([[0, ep(0)], [H, ep(H)]], { stroke: C.amber }) + a.line([[0, ekf(0)], [H, ekf(H)]], { stroke: C.blue }) +
    a.line([[0, Et], [H, Et]], { stroke: C.muted, dash: true, width: 1.8 }) + a.line([[0, Ek], [H, 0]], { stroke: C.blue, dash: true, width: 1.8 }) +
    a.tag(4, 34, `total = mgH = ${f(Et, 1)} J (free fall)`, { size: 14, fill: C.muted, anchor: "start" }) +
    a.tag(0.4, 10, "orange: EP = mgh", { size: 14, fill: C.amber, anchor: "start" }) + a.tag(0.4, 6, "blue solid: EK, free fall", { size: 14, fill: C.blue, anchor: "start" }) +
    a.tag(0.4, 2, `blue dashed: EK with drag, ${f(Ek, 1)} J`, { size: 14, fill: C.blue, anchor: "start" });
  const alt = `Energy against height for a 0.15 kg ball dropped from 20 m: EP falls in a straight line from ${f(Et, 1)} J to zero while EK rises by the same amount in free fall (total constant); with air resistance EK reaches only ${f(Ek, 1)} J at the ground, the other 6.2 J being work done against drag.`;
  const cap = "Figure: energy against height for a falling ball, with and without air resistance";
  await D.figure(F, "energy-against-height-graph", D.svg(560, 340, b), { alt, caption: cap });
  D.insertAfter(L("energy/gpe-ke"), "## Graphs of energy against height", D.md("energy-against-height-graph", alt, cap));
}

// ---- Power: driving force F = P/v for a 60 kW car; resistive forces 1200 N at 20 m/s and 2000 N at 30 m/s
{
  const P = 60000;
  const a = D.axes({ x: [0, 40], y: [0, 5000], xTicks: 10, yTicks: 1000, xLabel: "v / m s⁻¹", yLabel: "force / N", w: 560, h: 340 });
  const b = a.frame + a.plot((v) => P / v, { domain: [12, 40], stroke: C.blue }) +
    a.line([[20, 1200], [20, 3000]], { stroke: C.amber, width: 2.6 }) + a.point(20, 3000, { stroke: C.blue, r: 5 }) + a.point(20, 1200, { stroke: C.amber, r: 5 }) + a.point(30, 2000, { stroke: C.red, r: 6 }) +
    a.tag(19.4, 2250, "resultant 1800 N", { size: 14, fill: C.amber, anchor: "end" }) + a.tag(19.4, 1800, "a = 1.8 m s⁻²", { size: 14, fill: C.amber, anchor: "end" }) +
    a.tag(19.4, 1100, "resistive 1200 N at 20 m/s", { size: 14, fill: C.amber, anchor: "end" }) +
    a.tag(24, 4000, "F = P/v (P = 60 kW)", { size: 14, fill: C.blue, anchor: "start" }) +
    a.tag(39.5, 1300, "top speed 30 m/s: F = 2000 N", { size: 14, fill: C.red, anchor: "end" });
  const alt = "Driving force against speed for a 1000 kg car with maximum power 60 kW: the curve F = P/v gives 3000 N at 20 m/s, where the resistive force is 1200 N, leaving a resultant of 1800 N (a = 1.8 m/s²); at 30 m/s the force is 2000 N, equal to the resistive force, so 30 m/s is the top speed.";
  const cap = "Figure: full-power driving force falls as speed rises until it equals the resistive force";
  await D.figure(F, "power-force-speed-graph", D.svg(560, 340, b), { alt, caption: cap });
  D.insertAfter(L("energy/power"), "## Maximum speed and acceleration", D.md("power-force-speed-graph", alt, cap));
}

// ---- Work at an angle: scotch cart 25 m, rope 35 degrees, 120 N
{
  const th = 35, Fn = 120, s = 1.2; // px per N
  let b = D.text(10, 22, "Pulling a scotch cart 25 m along a level road", { weight: 700, size: 14 });
  b += D.line(20, 190, 540, 190, { stroke: C.muted, width: 2 });
  b += D.rect(90, 140, 90, 50, { fill: C.fillGrey, r: 4 }) + D.circle(110, 197, 8, { fill: "#fff" }) + D.circle(160, 197, 8, { fill: "#fff" });
  const ox = 180, oy = 150, ex = ox + Fn * s * Math.cos(rad(th)), ey = oy - Fn * s * Math.sin(rad(th));
  b += D.arrow(ox, oy, ex, ey, { stroke: C.blue, width: 3 }) + D.text(ex + 6, ey + 4, `F = ${Fn} N`, { size: 14, fill: C.blue, weight: 600 });
  b += D.line(ox, oy, ex, oy, { stroke: C.muted, dash: true, width: 1.4 }) + D.line(ex, oy, ex, ey, { stroke: C.muted, dash: true, width: 1.4 });
  b += D.text(ox + 8, oy + 20, `F cos 35° = ${f(Fn * Math.cos(rad(th)), 1)} N (does the work)`, { anchor: "start", size: 13, fill: C.blue });
  b += D.text(ex + 8, (oy + ey) / 2 + 6, `F sin 35° = ${f(Fn * Math.sin(rad(th)), 1)} N`, { size: 13, fill: C.muted }) + D.text(ox + 24, oy - 8, "35°", { size: 14 });
  b += D.arrow(100, 240, 520, 240, { width: 2, stroke: C.amber }) + D.arrow(520, 240, 100, 240, { width: 2, stroke: C.amber }) + D.text(310, 262, "s = 25 m", { anchor: "middle", size: 14, fill: C.amber, weight: 600 });
  b += D.text(280, 300, `W = Fs cos 35° = ${Fn} × 25 × cos 35° = ${f(Fn * 25 * Math.cos(rad(th)), 0)} J`, { anchor: "middle", size: 14, weight: 700 });
  const alt = "A rope pulls a scotch cart 25 m at 35° above the horizontal with a tension of 120 N: only the horizontal component 98.3 N does work, W = 120 × 25 × cos 35° = 2457 J, and the vertical component 68.8 N does none.";
  const cap = "Figure: only the component of the force along the displacement does work";
  await D.figure(F, "force-at-angle-work", D.svg(560, 320, b), { alt, caption: cap });
  D.insertAfter(L("energy/work-conservation-efficiency"), "## Work done by a force at an angle", D.md("force-at-angle-work", alt, cap));

  const a2 = D.axes({ x: [0, 0.6], y: [0, 70], xTicks: 0.1, yTicks: 10, xLabel: "displacement / m", yLabel: "F / N", w: 520, h: 300 });
  const b2 = a2.frame + a2.area((x) => (x <= 0.3 ? 200 * x : 60), null, [0, 0.5], { fill: C.fillBlue }) + a2.line([[0, 0], [0.3, 60], [0.5, 60]], { stroke: C.blue }) +
    a2.tag(0.12, 12, "triangle: 9.0 J", { size: 14, fill: C.blue, anchor: "start" }) + a2.tag(0.32, 30, "rectangle: 12 J", { size: 14, fill: C.blue, anchor: "start" }) +
    a2.tag(0.07, 68, "work done = area = 21 J", { size: 14, anchor: "start" });
  const alt2 = "Force-displacement graph: the force rises steadily from 0 to 60 N over 0.30 m then stays at 60 N for a further 0.20 m; the work done is the area under the graph, a 9.0 J triangle plus a 12 J rectangle, 21 J in total.";
  const cap2 = "Figure: work done is the area under a force-displacement graph";
  await D.figure(F, "force-displacement-area-work", D.svg(520, 300, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("energy/work-conservation-efficiency"), "## Work from a force-displacement graph", D.md("force-displacement-area-work", alt2, cap2));
}
