// chemistry-a: apparatus drawings (reflux/distillation, fractional distillation, steam distillation).
// Run: node .scratch/chemistry-a/diagrams/apparatus.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, note, fig } from "./_m.mjs";

/** Round-bottomed flask centred (cx, cy), radius r, neck up to neckTop; liquid fraction fill (0-1 of diameter). */
const flask = (cx, cy, r, neckTop, fillCol, fillTo) => {
  const ly = cy + r - 2 * r * fillTo; // liquid surface y
  const dx = Math.sqrt(r * r - (ly - cy) ** 2);
  let s = fillTo > 0 ? `<path d="M${cx - dx},${ly} A${r},${r} 0 ${fillTo > 0.5 ? 1 : 0} 0 ${cx + dx},${ly} Z" fill="${fillCol}" stroke="none"/>` : "";
  const nx = 12, ny = cy - Math.sqrt(r * r - nx * nx);
  s += `<path d="M${cx - nx},${neckTop} L${cx - nx},${ny} A${r},${r} 0 1 0 ${cx + nx},${ny} L${cx + nx},${neckTop}" fill="none" stroke="${C.ink}" stroke-width="2.2"/>`;
  return s;
};
/** Sloped water-cooled condenser from A to B, half-width hw; returns svg. */
const condenser = (ax, ay, bx, by, hw = 16) => {
  const dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, nx = -uy, ny = ux;
  const P = (t, k) => [ax + ux * t + nx * k, ay + uy * t + ny * k];
  const jac = [P(0, hw), P(l, hw), P(l, -hw), P(0, -hw)];
  return D.polyline(jac, { fill: C.fillBlue, close: true }) + D.line(...P(-6, 5), ...P(l + 14, 5), { width: 2 }) + D.line(...P(-6, -5), ...P(l + 14, -5), { width: 2 });
};

// ---- reflux versus distillation (oxidation of ethanol)
{
  const w = 660, h = 440;
  let s = D.text(150, 24, "Reflux: acid formed", { anchor: "middle", weight: 700 }) + D.text(500, 24, "Distillation: aldehyde removed", { anchor: "middle", weight: 700 });
  // reflux
  s += D.rect(122, 50, 56, 140, { fill: C.fillBlue }) + D.rect(140, 36, 20, 170, { fill: "#fff", stroke: C.ink, width: 2 }) +
    D.arrow(92, 172, 122, 172, { stroke: C.blue }) + D.text(88, 168, "water in", { anchor: "end", size: 13, fill: C.blue }) + D.arrow(178, 70, 208, 70, { stroke: C.blue }) + D.text(212, 74, "water out", { size: 13, fill: C.blue }) +
    flask(150, 290, 52, 206, C.fillAmber, 0.45) + D.text(150, 296, "ethanol +\noxidant", { anchor: "middle", size: 13 }) +
    D.text(150, 20 + 18, "", {}) + D.arrow(150, 410, 150, 350, { stroke: C.amber, width: 3 }) + D.text(150, 428, "heat", { anchor: "middle", size: 13, fill: C.amber }) +
    D.text(214, 128, "vapour condenses\nand runs back", { size: 13, fill: C.muted }) + D.arrow(212, 150, 186, 164, { stroke: C.muted, width: 1.4 });
  // distillation
  const ox = 330, A = [ox + 112, 172], B = [ox + 240, 246];
  const l = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / l, uy = (B[1] - A[1]) / l, nx = -uy, ny = ux;
  const Pt = (t, k) => [A[0] + ux * t + nx * k, A[1] + uy * t + ny * k];
  s += flask(ox + 60, 290, 52, 150, C.fillAmber, 0.45) + D.text(ox + 60, 296, "ethanol +\noxidant", { anchor: "middle", size: 13 }) +
    D.line(ox + 60, 108, ox + 60, 170, { stroke: C.ink, width: 3 }) + D.rect(ox + 56, 164, 8, 26, { fill: C.red, stroke: C.ink, width: 1.2 }) + D.text(ox + 70, 112, "thermometer", { size: 13 }) +
    D.rect(ox + 44, 144, 32, 8, { fill: C.fillGrey, stroke: C.ink, width: 1.5 }) +
    D.line(ox + 72, 168, A[0] - 4, A[1] + 0, { width: 2.4 }) +
    condenser(A[0], A[1], B[0], B[1], 16) +
    D.arrow(...Pt(l - 22, 40), ...Pt(l - 22, 17), { stroke: C.blue }) + D.text(Pt(l - 22, 40)[0] - 6, Pt(l - 22, 40)[1] + 16, "water in", { anchor: "end", size: 13, fill: C.blue }) +
    D.arrow(...Pt(22, -17), ...Pt(22, -42), { stroke: C.blue }) + D.text(Pt(22, -42)[0] + 8, Pt(22, -42)[1] - 4, "water out", { size: 13, fill: C.blue }) +
    D.path_(`M${B[0] + 8},268 L${B[0] - 2},304 L${B[0] + 48},304 L${B[0] + 38},268 Z`, { fill: C.fillGreen }) + D.text(B[0] + 30, 326, "ethanal collected\n(bp 21 °C)", { anchor: "middle", size: 13 }) +
    D.arrow(ox + 60, 410, ox + 60, 350, { stroke: C.amber, width: 3 }) + D.text(ox + 60, 428, "heat", { anchor: "middle", size: 13, fill: C.amber });
  const alt = "Two set-ups for oxidising ethanol with acidified dichromate: under reflux, a vertical water-cooled condenser sits on the flask so vapour condenses and runs back, giving the carboxylic acid; for distillation, the flask is fitted with a thermometer and a sloping condenser leading to a receiver, so the lower-boiling aldehyde ethanal (bp 21 degrees C) is collected before it is oxidised further.";
  const cap = "Figure: heating under reflux (acid) compared with distilling off the product (aldehyde)";
  await fig("reflux-distillation-apparatus", w, h, s, alt, cap, "hydroxy/alcohol-reactions", "## Oxidation");
}

// ---- fractional distillation of crude oil (lesson table of fractions)
{
  const w = 640, h = 470, cx0 = 190, cx1 = 330, top = 40, bot = 400;
  let s = D.rect(cx0, top, cx1 - cx0, bot - top, { fill: "#fff", stroke: C.ink, width: 2.4, r: 14 });
  const fr = [["refinery gases", "C₁–C₄", "LPG"], ["gasoline (petrol)", "C₅–C₁₀", "car fuel"], ["naphtha", "C₇–C₁₀", "chemical feedstock"], ["kerosene", "C₁₀–C₁₆", "jet fuel, paraffin"], ["diesel (gas oil)", "C₁₄–C₂₀", "diesel engines"], ["residue", "above C₂₀", "fuel oil, wax, bitumen"]];
  const ys = fr.map((_, i) => top + 34 + i * ((bot - top - 50) / 5));
  for (let i = 1; i < fr.length; i += 1) { const y = ys[i] - 30; s += D.line(cx0 + 2, y, cx1 - 2, y, { stroke: C.muted, width: 1.4, dash: true }); }
  fr.forEach(([n, c, u], i) => {
    s += D.line(cx1, ys[i], cx1 + 50, ys[i], { stroke: C.ink, width: 2 }) + D.text(cx1 + 58, ys[i] - 2, `${n}  ${c}`, { size: 14, weight: 600 }) + D.text(cx1 + 58, ys[i] + 16, u, { size: 13, fill: C.muted });
  });
  // crude oil in from a furnace on the left
  s += D.rect(20, 296, 90, 68, { fill: C.fillAmber, r: 6 }) + D.text(65, 320, "furnace:\ncrude oil\nheated", { anchor: "middle", size: 13 }) + D.arrow(110, 330, cx0, 330, { width: 2.4, stroke: C.amber }) + D.text(150, 322, "vapour", { size: 13, fill: C.amber, anchor: "middle" });
  // arrows for gradients
  s += D.arrow(100, 190, 100, 60, { stroke: C.blue, width: 2.4 }) + D.text(100, 214, "cooler column,\nsmaller molecules,\nlower boiling point", { anchor: "middle", size: 13, fill: C.blue }).replace("", "") + D.text(100, 56, "", {});
  s += D.arrow(cx0 - 30, 410, cx0 - 30, 412, { width: 0 }).replace(/.*/, "") + D.text(w - 20, 436, "hotter at the bottom: larger molecules condense lower down", { anchor: "end", size: 13, fill: C.muted });
  const alt = "Fractional distillation column: heated crude oil vapour enters near the bottom; the column is hotter at the bottom and cooler at the top, so the fractions leave at different heights, from the top refinery gases (C1-C4), gasoline (C5-C10), naphtha (C7-C10), kerosene (C10-C16), diesel (C14-C20) to the residue above C20 at the bottom; boiling point and molecule size rise down the column.";
  const cap = "Figure: fractional distillation of crude oil, with the carbon range and typical use of each fraction";
  await fig("fractional-distillation-column", w, h, s, alt, cap, "hydrocarbons/alkanes-crude-oil", "## Crude oil and fractional distillation");
}

// ---- steam distillation (lesson "The apparatus")
{
  const w = 700, h = 400, NL = "\n";
  const A = [360, 150], B = [500, 232];
  let s = flask(90, 260, 52, 200, C.fillBlue, 0.55) + D.text(120, 272, "boiling" + NL + "water", { anchor: "middle", size: 13 }) + D.text(90, 342, "steam generator", { anchor: "middle", size: 13, fill: C.muted }) +
    D.rect(78, 194, 24, 8, { fill: C.fillGrey, stroke: C.ink, width: 1.5 }) +
    D.line(80, 296, 80, 110, { stroke: C.ink, width: 2.4 }) + D.text(90, 96, "safety tube"+"\n"+"(dips into the water)", { size: 13, fill: C.muted }) +
    D.polyline([[100, 194], [100, 142], [243, 142], [243, 300]], { stroke: C.ink, width: 2.4 }) + D.text(150, 134, "steam", { size: 13, fill: C.blue }) +
    flask(250, 260, 52, 200, C.fillGreen, 0.55) + D.rect(238, 194, 24, 8, { fill: C.fillGrey, stroke: C.ink, width: 1.5 }) + D.text(262, 290, "plant material" + NL + "+ water", { anchor: "middle", size: 13 }).replace('x="262"', 'x="262"') +
    D.polyline([[258, 194], [258, 120], [A[0], A[1] - 30], [A[0] + 4, A[1]]], { stroke: C.ink, width: 2.4 }) + D.text(268, 112, "oil and water vapour", { size: 13, fill: C.muted }) +
    D.arrow(90, 384, 90, 354, { stroke: C.amber, width: 3 }) + D.text(90, 400, "heat", { anchor: "middle", size: 13, fill: C.amber });
  const l = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / l, uy = (B[1] - A[1]) / l, nx = -uy, ny = ux;
  const Pt = (t, k) => [A[0] + ux * t + nx * k, A[1] + uy * t + ny * k];
  const jac = [Pt(0, 16), Pt(l, 16), Pt(l, -16), Pt(0, -16)];
  s += D.polyline(jac, { fill: C.fillBlue, close: true }) + D.line(...Pt(-6, 5), ...Pt(l + 14, 5), { width: 2 }) + D.line(...Pt(-6, -5), ...Pt(l + 14, -5), { width: 2 }) +
    D.arrow(...Pt(l - 22, 40), ...Pt(l - 22, 17), { stroke: C.blue }) + D.text(Pt(l - 22, 40)[0] - 6, Pt(l - 22, 40)[1] + 16, "water in", { anchor: "end", size: 13, fill: C.blue }) +
    D.arrow(...Pt(22, -17), ...Pt(22, -42), { stroke: C.blue }) + D.text(Pt(22, -42)[0] + 8, Pt(22, -42)[1] - 4, "water out", { size: 13, fill: C.blue }) +
    D.path_(`M${B[0] + 8},262 L${B[0] - 4},316 L${B[0] + 56},316 L${B[0] + 44},262 Z`, { fill: C.fillAmber }) + D.line(B[0] - 2, 292, B[0] + 54, 292, { stroke: C.muted, width: 1.4, dash: true }) +
    D.text(B[0] + 26, 340, "cloudy distillate:" + NL + "oil and water form two layers", { anchor: "middle", size: 13 }) +
    D.text(680, 396, "oil separated with a separating funnel, dried with anhydrous Na₂SO₄, filtered", { size: 13, fill: C.muted, anchor: "end" });
  const alt = "Steam distillation apparatus: a flask of boiling water with a safety tube makes steam, which is passed through a tube to the bottom of a second flask holding plant material and water; the mixed vapour of oil and water goes through a water-cooled condenser into a receiver as a cloudy distillate that forms two layers, and the oil is separated with a separating funnel.";
  const cap = "Figure: steam distillation of an essential oil, from steam generator to distillate";
  await fig("steam-distillation-apparatus", w, 345, D.group(s, { translate: [0, -62] }), alt, cap, "phase/steam-distillation", "## The apparatus");
}
