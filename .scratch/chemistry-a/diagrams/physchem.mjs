// chemistry-a physical chemistry: equilibrium graphs, electrochemical cells, d-orbital splitting, SN1/SN2 profiles.
// Run: node .scratch/chemistry-a/diagrams/physchem.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

// ---- dynamic equilibrium: rates and concentrations against time (qualitative; H2 + I2 <=> 2HI style)
{
  const w = 620, h = 330;
  const mk = (yl) => D.axes({ x: [0, 10], y: [0, 1.05], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Time", yLabel: yl, w: 310, h, pad: { l: 30, r: 16, t: 34, b: 52 } });
  const a = mk("Rate"), b = mk("Concentration");
  const te = 5; // equilibrium reached
  const fwd = (t) => 0.45 + 0.5 * Math.exp(-0.75 * t), rev = (t) => 0.45 * (1 - Math.exp(-0.75 * t));
  const rr = (t) => (t < te ? 0 : 0);
  const fw = (t) => fwd(t), rv = (t) => 0.45 * (1 - Math.exp(-0.75 * t));
  const pa = a.plot(fw, { stroke: C.blue, width: 2.8 }) + a.plot(rv, { stroke: C.amber, width: 2.8 }) +
    a.tag(0.6, 0.97, "forward", { size: 13, fill: C.blue }) + a.tag(0.6, 0.12, "reverse", { size: 13, fill: C.amber }) +
    D.line(a.X(te), a.Y(0), a.X(te), a.Y(1.0), { stroke: C.muted, width: 1.4, dash: true }) + a.tag(9.8, 0.75, "equal rates: equilibrium", { size: 13, anchor: "end" });
  const pb = b.plot((t) => 0.4 + 0.55 * Math.exp(-0.75 * t), { stroke: C.blue, width: 2.8 }) + b.plot((t) => 0.4 * (1 - Math.exp(-0.75 * t)) * 1 + 0.0, { stroke: C.amber, width: 2.8 }) +
    b.tag(0.5, 0.95, "reactants", { size: 13, fill: C.blue }) + b.tag(0.5, 0.1, "products", { size: 13, fill: C.amber }) +
    D.line(b.X(te), b.Y(0), b.X(te), b.Y(1.0), { stroke: C.muted, width: 1.4, dash: true }) + b.tag(9.8, 0.75, "constant, but not equal", { size: 13, anchor: "end" });
  const body = D.group(a.frame + pa, { translate: [0, 24] }) + D.group(b.frame + pb, { translate: [310, 24] }) +
    D.text(155, 18, "rates of the two reactions", { anchor: "middle", size: 14, weight: 700 }) + D.text(465, 18, "concentrations", { anchor: "middle", size: 14, weight: 700 });
  const alt = "Two graphs for a reversible reaction starting from reactants only: on the left the forward rate falls and the reverse rate rises until they meet and stay equal (dynamic equilibrium); on the right the reactant concentration falls and the product concentration rises until both become constant, at different values.";
  const cap = "Figure: at equilibrium the rates are equal and the concentrations stay constant (they need not be equal)";
  await D.figure(F, "dynamic-equilibrium-graphs", D.svg(w, h + 24, body), { alt, caption: cap });
  D.insertAfter(L("equilibria/dynamic-le-chatelier"), "5. it needs a **closed system**", D.md("dynamic-equilibrium-graphs", alt, cap));
}

// ---- electrochemical cells
function beaker(x, y, w, h, fill) {
  return D.rect(x, y + 22, w, h - 22, { fill, stroke: C.axis, width: 2 }) + D.line(x, y, x, y + 22, { stroke: C.axis, width: 2 }) + D.line(x + w, y, x + w, y + 22, { stroke: C.axis, width: 2 });
}
function cell({ name, alt, cap, anchor, lesson, volts, left, right }) {
  const w = 600, h = 440;
  const bw = 190, by = 230, bh = 130;
  const lx = 60, rx = 350;
  const wireTop = 110;
  let body = "";
  body += beaker(lx, by, bw, bh, C.fillBlue) + beaker(rx, by, bw, bh, C.fillAmber);
  // electrodes
  const el = (x, label, sign, tag) => D.rect(x - 12, by - 40, 24, 150, { fill: "#e8e5df", stroke: C.axis, width: 2 }) + D.text(x, by + 130 + 0, "", {}) + D.text(x + 20, by - 18, sign, { size: 20, weight: 700, fill: sign === "+" ? C.red : C.blue }) + D.text(x, by + 90, label, { anchor: "middle", size: 13, weight: 700 }).replace("<text", "<text transform='rotate(0)'");
  body += el(lx + 55, left.electrode, left.sign) + el(rx + 135, right.electrode, right.sign);
  // wires + voltmeter
  const vx = 300;
  body += D.polyline([[lx + 55, by - 40], [lx + 55, wireTop], [vx - 28, wireTop]], { width: 2 }) + D.polyline([[vx + 28, wireTop], [rx + 135, wireTop], [rx + 135, by - 40]], { width: 2 });
  body += D.circle(vx, wireTop, 28, { fill: "#fff" }) + D.text(vx, wireTop + 6, "V", { anchor: "middle", size: 20, weight: 700 }) + D.text(vx, wireTop - 40, volts, { anchor: "middle", size: 17, weight: 700 });
  body += D.arrow(lx + 70, wireTop - 12, lx + 150, wireTop - 12, { stroke: C.amber, width: 2 }) + D.text(lx + 110, wireTop - 20, "e⁻", { anchor: "middle", size: 14, fill: C.amber, weight: 700 });
  // salt bridge
  const sb = [[lx + bw - 40, by + 60], [lx + bw - 40, by - 20], [rx + 40, by - 20], [rx + 40, by + 60]];
  body += D.polyline(sb, { stroke: C.axis, width: 15 }) + D.polyline(sb, { stroke: "#f6f3ee", width: 11 }) + D.text(300, by - 30, "salt bridge", { anchor: "middle", size: 13, fill: C.muted });
  // solution labels
  body += D.text(lx + bw / 2, by + bh + 58, left.solution, { anchor: "middle", size: 13 }) + D.text(rx + bw / 2, by + bh + 58, right.solution, { anchor: "middle", size: 13 });
  body += D.text(lx + bw / 2, by + bh + 22, left.half, { anchor: "middle", size: 13, fill: C.blue, weight: 700 }) + D.text(rx + bw / 2, by + bh + 22, right.half, { anchor: "middle", size: 13, fill: C.amber, weight: 700 });
  body += D.text(lx + bw / 2, by + bh + 40, left.role, { anchor: "middle", size: 13, fill: C.muted }) + D.text(rx + bw / 2, by + bh + 40, right.role, { anchor: "middle", size: 13, fill: C.muted });
  return { name, alt, cap, anchor, lesson, svg: D.svg(w, h, body) };
}
{
  const c = cell({
    name: "zinc-copper-cell", anchor: "In any cell the half-cell with the **more positive**", lesson: "electrochem/electrode-potentials", volts: "1.10 V",
    alt: "Zinc-copper cell with a high-resistance voltmeter reading 1.10 V: a zinc electrode in 1.00 mol per dm³ zinc ions is the negative electrode where zinc is oxidised, a copper electrode in 1.00 mol per dm³ copper ions is the positive electrode where copper ions are reduced, a salt bridge joins the beakers and electrons flow through the wire from zinc to copper.",
    cap: "Figure: the zinc-copper cell; electrons flow from the negative zinc electrode to the positive copper electrode",
    left: { electrode: "Zn", sign: "−", solution: "Zn²⁺(aq) 1.00 mol dm⁻³", half: "Zn → Zn²⁺ + 2e⁻", role: "oxidation, negative" },
    right: { electrode: "Cu", sign: "+", solution: "Cu²⁺(aq) 1.00 mol dm⁻³", half: "Cu²⁺ + 2e⁻ → Cu", role: "reduction, positive" },
  });
  await D.figure(F, c.name, c.svg, { alt: c.alt, caption: c.cap });
  D.insertAfter(L(c.lesson), c.anchor, D.md(c.name, c.alt, c.cap));
}
{
  // SHE connected to Cu2+/Cu: reads +0.34 V
  const c = cell({
    name: "she-copper-cell", anchor: "- at 298 K. The half-equation is", lesson: "electrochem/electrode-potentials", volts: "+0.34 V",
    alt: "Measuring the standard electrode potential of copper: on the left the standard hydrogen electrode (platinum in 1.00 mol per dm³ H+ with hydrogen gas at 101 kPa bubbling over it) is connected through a high-resistance voltmeter and a salt bridge to a copper electrode in 1.00 mol per dm³ Cu2+; the voltmeter reads +0.34 V, the E standard of Cu2+/Cu.",
    cap: "Figure: the standard hydrogen electrode (left) joined to a Cu²⁺/Cu half-cell; the reading is E⦵(Cu²⁺/Cu) = +0.34 V",
    left: { electrode: "Pt", sign: "−", solution: "H⁺(aq) 1.00 mol dm⁻³", half: "H₂ → 2H⁺ + 2e⁻", role: "SHE: H₂(g) at 101 kPa, 298 K" },
    right: { electrode: "Cu", sign: "+", solution: "Cu²⁺(aq) 1.00 mol dm⁻³", half: "Cu²⁺ + 2e⁻ → Cu", role: "half-cell under test" },
  });
  // add the hydrogen gas inlet to the SHE image
  const extra = D.arrow(82, 214, 82, 330, { stroke: C.green, width: 2.4 }) + D.text(10, 190, "H₂(g), 101 kPa", { size: 13, fill: C.green, weight: 700 }) + D.text(10, 206, "bubbled over Pt", { size: 13, fill: C.green });
  const svg = c.svg.replace("</g>\n</svg>", extra + "</g>\n</svg>");
  await D.figure(F, c.name, svg, { alt: c.alt, caption: c.cap });
  D.insertAfter(L(c.lesson), c.anchor, D.md(c.name, c.alt, c.cap));
}

// ---- d-orbital splitting and colour
{
  const w = 600, h = 380;
  const Y = (e) => 320 - e;
  let body = "";
  // free ion
  body += D.line(40, Y(150), 130, Y(150), { width: 3 }) + D.text(85, Y(150) + 22, "five d orbitals", { anchor: "middle", size: 13 }) + D.text(85, 30, "free ion", { anchor: "middle", size: 14, weight: 700 }) + D.text(85, 48, "(all d orbitals equal)", { anchor: "middle", size: 13, fill: C.muted });
  // split
  const eHi = 205, eLo = 95;
  body += D.text(350, 30, "in an octahedral complex", { anchor: "middle", size: 14, weight: 700 }) + D.text(350, 48, "(ligands split the d orbitals)", { anchor: "middle", size: 13, fill: C.muted });
  body += D.line(290, Y(eHi), 390, Y(eHi), { width: 3 }) + D.text(400, Y(eHi) + 5, "two higher-energy d orbitals", { size: 13 });
  body += D.line(290, Y(eLo), 390, Y(eLo), { width: 3 }) + D.text(400, Y(eLo) + 5, "three lower-energy", { size: 13 }) + D.text(400, Y(eLo) + 21, "d orbitals", { size: 13 });
  body += D.line(130, Y(150), 290, Y(eHi), { stroke: C.muted, width: 1.4, dash: true }) + D.line(130, Y(150), 290, Y(eLo), { stroke: C.muted, width: 1.4, dash: true });
  // gap + photon
  body += D.arrow(220, Y(eLo), 220, Y(eHi) + 4, { stroke: C.amber, width: 2.6 }) + D.text(212, Y(150) + 5, "ΔE", { anchor: "end", size: 16, weight: 700, fill: C.amber }) +
    D.polyline([[170, Y(eLo) + 70], [182, Y(eLo) + 60], [194, Y(eLo) + 70], [206, Y(eLo) + 60], [218, Y(eLo) + 70]], { stroke: C.red, width: 2.4 }) + D.text(150, Y(eLo) + 92, "a photon of visible light with", { size: 13, fill: C.red }) + D.text(150, Y(eLo) + 108, "energy ΔE is absorbed; an electron", { size: 13, fill: C.red }) + D.text(150, Y(eLo) + 124, "moves up; the other colours are seen", { size: 13, fill: C.red });
  const alt = "Energy diagram of d orbitals: in a free transition metal ion the five d orbitals have the same energy; in an octahedral complex the ligands split them into three lower and two higher orbitals with an energy gap ΔE. A photon of visible light with energy ΔE is absorbed when an electron moves up, so the complex appears coloured with the remaining wavelengths.";
  const cap = "Figure: d-orbital splitting in a complex; absorption of light across the gap ΔE gives colour";
  await D.figure(F, "d-orbital-splitting", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("transition/colour"), "## Splitting the d orbitals", D.md("d-orbital-splitting", alt, cap));
}
