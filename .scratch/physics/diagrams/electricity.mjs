// Run: node .scratch/physics/diagrams/electricity.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { S, W, J, lab, vAcross } from "./_circ.mjs";
const F = "physics-o", L = `content/subjects/${F}/lessons/electricity`;
const { C } = D;
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${L}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });

// 1. symbol sheet
{
  const items = [
    ["Cell", (x, y) => D.sym.cell(x, y)], ["Battery", S.battery], ["D.c. supply", S.dcSupply], ["Switch (open)", (x, y) => D.sym.switch_(x, y)],
    ["Switch (closed)", (x, y) => D.sym.switch_(x, y, { closed: true })], ["Lamp", (x, y) => D.sym.lamp(x, y)], ["Fixed resistor", (x, y) => D.sym.resistor(x, y)], ["Variable resistor", S.varRes],
    ["Heater", S.heater], ["Thermistor (NTC)", S.thermistor], ["LDR", S.ldr], ["Fuse", S.fuse],
    ["Ammeter", (x, y) => D.sym.meter(x, y, "A")], ["Voltmeter", (x, y) => D.sym.meter(x, y, "V")], ["Motor", (x, y) => D.sym.meter(x, y, "M")], ["Generator", (x, y) => D.sym.meter(x, y, "G")],
    ["Potential divider", S.pot], ["Diode", (x, y) => D.sym.diode(x, y)], ["LED", S.led],
  ];
  let b = "";
  items.forEach(([name, fn], i) => {
    const cx = 80 + (i % 4) * 160, cy = 62 + Math.floor(i / 4) * 100;
    b += fn(cx, cy) + lab(cx, cy + 46, name, { size: 14 });
  });
  const alt = "Sheet of standard circuit symbols, each labelled: cell, battery, d.c. supply, open and closed switch, lamp, fixed and variable resistor, heater, NTC thermistor, LDR, fuse, ammeter (A), voltmeter (V), motor (M), generator (G), potential divider, diode and LED.";
  await put("circuit-symbols-sheet", 640, 540, b, alt, "Figure: the standard circuit symbols", "circuit-diagrams", "Each symbol is described below. Learn to draw every one neatly.");
}

// 2. lamp circuit: ammeter in series, voltmeter across the lamp
{
  let b = D.sym.cell(90, 150, { vertical: true }) + W([90, 120], [90, 70], [200, 70]) + D.sym.switch_(230, 70, { closed: true }) + W([260, 70], [360, 70]) + D.sym.meter(390, 70, "A") + W([420, 70], [490, 70], [490, 110]) +
    D.sym.lamp(490, 140, { vertical: true }) + W([490, 170], [490, 240], [90, 240], [90, 180]) +
    W([490, 110], [545, 110], [545, 115]) + W([545, 165], [545, 170], [490, 170]) + D.sym.meter(545, 140, "V", { vertical: true }) + J(490, 110) + J(490, 170);
  b += lab(390, 40, "ammeter (in series)", { size: 14 }) + T(462, 138, "voltmeter (in parallel", { anchor: "end" }) + T(462, 156, "with the lamp)", { anchor: "end" }) + T(230, 50, "closed switch", { anchor: "middle" }) + T(112, 130, "+", { weight: 700 });
  const alt = "Circuit diagram: a cell, closed switch, ammeter and lamp in a single series loop, with a voltmeter connected in parallel across the lamp; the ammeter measures the current through the lamp and the voltmeter the p.d. across it.";
  await put("lamp-circuit-meters", 620, 270, b, alt, "Figure: an ammeter in series and a voltmeter in parallel with the lamp", "circuit-diagrams", "Opening the switch breaks the only path");
}

// 3. current direction
{
  let b = D.sym.cell(110, 150, { vertical: true }) + W([110, 120], [110, 60], [260, 60]) + D.sym.lamp(290, 60) + W([320, 60], [470, 60], [470, 240], [110, 240], [110, 180]);
  b += D.arrow(170, 90, 235, 90, { stroke: C.blue, width: 3 }) + D.arrow(470, 120, 470, 175, { stroke: C.blue, width: 3 }) + D.arrow(235, 210, 170, 210, { stroke: C.amber, width: 3 });
  b += lab(300, 30, "conventional current: + to −", { fill: C.blue, weight: 700 }) + lab(300, 270, "electron flow: − to +", { fill: C.amber, weight: 700 }) + T(80, 118, "+", { weight: 700, size: 18, anchor: "end" }) + T(80, 190, "−", { weight: 700, size: 18, anchor: "end" });
  const alt = "Circuit loop with a cell and lamp: conventional current is drawn leaving the positive terminal and flowing round to the negative terminal, while the electrons in the wire drift the opposite way, from negative to positive.";
  await put("current-direction-loop", 560, 290, b, alt, "Figure: conventional current and electron flow go opposite ways", "current", "### Conventional current and electron flow");
}

// 4. series p.d.s add up (6.0 V = 4.0 V + 2.0 V)
{
  const E = 6, V1 = 4, V2 = E - V1;
  let b = D.sym.cell(80, 190, { vertical: true }) + W([80, 160], [80, 110], [200, 110]) + D.sym.lamp(230, 110) + W([260, 110], [350, 110]) + D.sym.resistor(380, 110) + W([410, 110], [520, 110], [520, 270], [80, 270], [80, 220]);
  b += vAcross(200, 260, 110, 70) + vAcross(350, 410, 110, 70) + lab(230, 150, `${V1.toFixed(1)} V`, { fill: C.blue, weight: 700 }) + lab(380, 150, `${V2.toFixed(1)} V`, { fill: C.blue, weight: 700 }) +
    T(230, 172, "lamp", { anchor: "middle", fill: C.muted }) + T(380, 172, "resistor", { anchor: "middle", fill: C.muted }) + T(55, 196, `${E.toFixed(1)} V`, { weight: 700, anchor: "end" }) +
    lab(300, 300, `${V1.toFixed(1)} V + ${V2.toFixed(1)} V = ${E.toFixed(1)} V (the e.m.f.)`, { weight: 700 });
  const alt = "Circuit: a 6.0 V battery in series with a lamp and a resistor; a voltmeter across each reads 4.0 V and 2.0 V, so the p.d.s across the components add up to the 6.0 V e.m.f.";
  await put("series-pd-add-up", 600, 320, b, alt, "Figure: in series the p.d.s add up to the e.m.f.", "emf-pd", "## P.d.s in a series circuit");
}

// 5. I-V graphs
{
  const R = 30, Vmax = 12;
  const ax = D.axes({ x: [0, 12], y: [0, 0.5], xTicks: 2, yTicks: 0.1, xLabel: "V (V)", yLabel: "I (A)", w: 560, h: 380, yFormat: (v) => v.toFixed(1) });
  const b = ax.frame + ax.line([[0, 0], [Vmax, Vmax / R]]) + ax.guides(Vmax, Vmax / R) + ax.point(Vmax, Vmax / R) +
    ax.tag(1.2, 0.47, "straight line through the origin: I ∝ V", { fill: C.blue }) + ax.tag(Vmax, Vmax / R, "12 V, 0.40 A: R = 30 Ω", { dx: -20, dy: 150, anchor: "end" });
  const alt = "Current-voltage graph of a fixed resistor: a straight line through the origin, reaching 0.40 A at 12 V; the current is proportional to the p.d., so the resistance is constant at 30 ohms (12 V divided by 0.40 A).";
  await put("iv-graph-resistor", 560, 380, b, alt, "Figure: an ohmic conductor gives a straight I-V line", "resistance", "## Current–voltage graphs");

  const mk = (yr) => D.axes({ x: [-6, 6], y: yr, w: 300, h: 330, pad: { l: 30, r: 18, t: 60, b: 40 }, xLabel: "V", yLabel: "I", tickLabels: false });
  const a1 = mk([-3, 3]), a2 = mk([-1.5, 3]);
  const lamp = (v) => Math.sign(v) * 2.4 * (1 - Math.exp(-Math.abs(v) / 2.2));
  const diode = (v) => (v < 0 ? -0.03 : v < 0.6 ? 0.01 * v : Math.min(3.2, 0.08 * (Math.exp((v - 0.6) * 1.9) - 1)));
  const left = a1.frame + a1.plot(lamp, { steps: 120 }) + T(10, 20, "Filament lamp", { weight: 700, size: 15 }) + T(10, 38, "curve flattens: R rises", { size: 13, fill: C.muted });
  const right = a2.frame + a2.plot(diode, { steps: 400 }) + T(10, 20, "Diode", { weight: 700, size: 15 }) + T(10, 38, "conducts one way only", { size: 13, fill: C.muted }) + a2.tag(0.6, 0, "about 0.6 V", { dx: 10, dy: 26, size: 13 });
  await put("iv-graph-lamp-diode", 620, 330, left + D.group(right, { translate: [310, 0] }),
    "Two current-voltage graphs. Filament lamp: an S-shaped curve through the origin that gets less steep as V increases, in both directions, because the hot filament has higher resistance. Diode: almost no current for negative V and below about 0.6 V, then the current rises steeply.",
    "Figure: I-V graphs of a filament lamp and a diode", "resistance", "Ohm's law therefore has limits");
}

// 6. series and parallel worked examples
{
  let b = D.sym.cell(80, 150, { vertical: true }) + W([80, 120], [80, 60], [150, 60]) + D.sym.resistor(180, 60) + W([210, 60], [300, 60]) + D.sym.resistor(330, 60) + W([360, 60], [440, 60], [440, 130]) + D.sym.meter(440, 160, "A", { vertical: true }) + W([440, 190], [440, 240], [80, 240], [80, 180]);
  b += lab(180, 100, "4.0 Ω") + lab(330, 100, "8.0 Ω") + lab(180, 28, "2.0 V", { fill: C.blue, weight: 700 }) + lab(330, 28, "4.0 V", { fill: C.blue, weight: 700 }) + T(55, 154, "6.0 V", { weight: 700, anchor: "end" }) + T(462, 164, "0.50 A", { weight: 700, fill: C.amber }) +
    lab(260, 280, "same current everywhere; p.d.s add: 2.0 + 4.0 = 6.0 V");
  await put("series-circuit-example", 580, 300, b,
    "Series circuit: a 6.0 V battery with 4.0 ohm and 8.0 ohm resistors in one loop. The same 0.50 A flows everywhere, and the p.d.s of 2.0 V and 4.0 V add up to 6.0 V.",
    "Figure: current is the same in series; p.d.s add", "series-parallel", "Cells in series");

  const x1 = 220, x2 = 360;
  let p = D.sym.cell(70, 160, { vertical: true }) + W([70, 130], [70, 50], [480, 50], [480, 250], [70, 250], [70, 190]) +
    W([x1, 50], [x1, 100]) + D.sym.resistor(x1, 130, { vertical: true }) + W([x1, 160], [x1, 250]) +
    W([x2, 50], [x2, 100]) + D.sym.resistor(x2, 130, { vertical: true }) + W([x2, 160], [x2, 250]) + J(x1, 50) + J(x2, 50) + J(x1, 250) + J(x2, 250);
  p += T(x1 + 18, 134, "6.0 Ω") + T(x2 + 18, 134, "3.0 Ω") + T(x1 + 12, 214, "2.0 A", { fill: C.amber, weight: 700 }).replace(`y="210"`, `y="210"`) + T(x2 + 12, 214, "4.0 A", { fill: C.amber, weight: 700 }) +
    lab(275, 32, "supply current 6.0 A", { weight: 700, fill: C.amber }) + T(40, 164, "12 V", { weight: 700, anchor: "end" }) + lab(280, 285, "same p.d. (12 V) across each branch; currents add: 2.0 + 4.0 = 6.0 A");
  await put("parallel-circuit-example", 600, 300, p,
    "Parallel circuit: a 12 V supply connected directly across a 6.0 ohm and a 3.0 ohm resistor. Each branch has 12 V across it; the branch currents are 2.0 A and 4.0 A, which add to the 6.0 A supply current. Combined resistance 2.0 ohms.",
    "Figure: same p.d. in each branch; branch currents add", "series-parallel", "Two resistors in parallel");
}

// 7. potential dividers
{
  let b = D.sym.cell(80, 170, { vertical: true }) + W([80, 140], [80, 90], [170, 90]) + D.sym.resistor(200, 90) + W([230, 90], [310, 90]) + D.sym.resistor(340, 90) + W([370, 90], [470, 90], [470, 260], [80, 260], [80, 200]);
  b += vAcross(170, 230, 90, 50) + vAcross(310, 370, 90, 50) + lab(200, 132, "2.0 kΩ") + lab(340, 132, "1.0 kΩ") + lab(200, 20, "V₁ = 6.0 V", { fill: C.blue, weight: 700 }).replace("", "") + lab(340, 20, "V₂ = 3.0 V", { fill: C.blue, weight: 700 }) + T(55, 174, "9.0 V", { weight: 700, anchor: "end" }) +
    lab(270, 292, "R₁ : R₂ = 2 : 1, so V₁ : V₂ = 2 : 1; the p.d.s add to 9.0 V");
  await put("potential-divider-9v", 560, 310, b,
    "Potential divider: a 2.0 kilohm and a 1.0 kilohm resistor in series across a 9.0 V supply. The p.d.s are in the ratio of the resistances, 6.0 V across the larger resistor and 3.0 V across the smaller, adding to 9.0 V.",
    "Figure: a potential divider shares 9.0 V in the ratio 2 : 1", "potential-divider", "## Sharing the p.d.");

  let c = D.sym.cell(80, 160, { vertical: true }) + W([80, 130], [80, 40], [300, 40], [300, 70]) + D.sym.resistor(300, 100, { vertical: true }) + W([300, 130], [300, 165]) + S.ldr(300, 195).replace("", "") +
    W([300, 225], [300, 270], [80, 270], [80, 190]);
  c = D.sym.cell(80, 160, { vertical: true }) + W([80, 130], [80, 40], [300, 40], [300, 70]) + D.sym.resistor(300, 100, { vertical: true }) + W([300, 130], [300, 150]) + J(300, 150) + vLdr(300, 150) +
    W([300, 240], [300, 280], [80, 280], [80, 190]) + J(300, 240) + W([300, 150], [420, 150], [420, 175]) + D.sym.meter(420, 205, "V", { vertical: true }) + W([420, 235], [420, 240], [300, 240]);
  c += T(278, 104, "fixed R", { anchor: "end" }) + T(340, 196, "LDR") + T(55, 164, "6 V", { weight: 700, anchor: "end" }) + T(440, 130, "output p.d.", { fill: C.blue, weight: 700 }) + T(440, 148, "across the LDR", { fill: C.blue }).replace("", "");
  c += lab(260, 314, "Dark: LDR resistance high, output p.d. high", { weight: 700 }) + lab(260, 336, "Bright: LDR resistance low, output p.d. low", { weight: 700 });
  await put("potential-divider-ldr", 580, 350, c,
    "Light-sensing potential divider: a fixed resistor in series with an LDR across a 6 V supply, with a voltmeter taking the output across the LDR. In the dark the LDR's resistance is high so its share of the p.d. is high; in bright light it falls.",
    "Figure: an LDR potential divider gives a high output in the dark", "potential-divider", "## Sensing circuits");
}
// vertical LDR: rotate the horizontal symbol about its centre-ish (centre at (x, y+45) after wires)
function vLdr(x, y) {
  const cy = y + 45;
  return D.line(x, y, x, cy - 30) + `<g transform="rotate(90 ${x} ${cy})">${S.ldr(x, cy)}</g>`.replace(/<line[^>]*x1="[^"]*"[^>]*\/>/, (m) => m) + D.line(x, cy + 30, x, y + 90);
}
console.log("electricity done");
