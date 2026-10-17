// Second diagram pass, thermal + energy. Run from repo root: node .scratch/physics/diagrams/p2-thermal.mjs
// Lessons here are hand-written Markdown (not generated).
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LR = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LR}/${lesson}.md`, anchor, D.md(name, alt, cap));
};

// ---- Sankey helper: input band (left) splits into a straight useful band and a wasted band bending down
function sankey({ input, useful, unit, k, x0 = 30, xs = 170, xe = 440, y0 = 40, gap = 50, inLabel, usefulLabel, wasteLabel }) {
  const waste = input - useful, H = input * k, hu = useful * k, hw = waste * k;
  const yw = y0 + hu + gap; // top of waste band at the far end
  const band = (d, fill) => D.path_(d, { fill, stroke: C.ink, width: 1.4 });
  let b = band(`M${x0},${y0} L${xs},${y0} L${xs},${y0 + H} L${x0},${y0 + H} Z`, C.fillBlue);
  b += band(`M${xs},${y0} L${xe},${y0} L${xe},${y0 + hu} L${xs},${y0 + hu} Z`, C.fillGreen);
  const c = (xe - xs) * 0.5;
  b += band(`M${xs},${y0 + hu} C${xs + c},${y0 + hu} ${xe - c},${yw} ${xe - 40},${yw} L${xe - 40},${yw + hw} C${xe - c},${yw + hw} ${xs + c},${y0 + H} ${xs},${y0 + H} Z`, C.fillAmber);
  b += D.polyline([[xe, y0 - 8], [xe + 22, y0 + hu / 2], [xe, y0 + hu + 8]], { fill: C.green, close: true, width: 1 });
  b += D.polyline([[xe - 40, yw - 8], [xe - 18, yw + hw / 2], [xe - 40, yw + hw + 8]], { fill: C.amber, close: true, width: 1 });
  b += M(x0 + (xs - x0) / 2, y0 + H / 2 - 4, `${input} ${unit}`, { weight: 700 }) + M(x0 + (xs - x0) / 2, y0 + H / 2 + 14, inLabel, { size: 13 });
  b += T(xs + 12, y0 + hu / 2 + 5, `${useful} ${unit}  ${usefulLabel}`, { weight: 700 });
  b += T(xe - 40 - 4, yw + hw + 26, `${waste} ${unit}  ${wasteLabel}`, { weight: 700, anchor: "end" });
  return { b, h: yw + hw + 50 };
}
{
  const s = sankey({ input: 500, useful: 150, unit: "J", k: 0.17, inLabel: "electrical input", usefulLabel: "kinetic energy of the drill bit", wasteLabel: "wasted: heat and sound", y0: 40, gap: 50 });
  const alt = "Sankey diagram for an electric drill: a 500 J input band splits into a 150 J useful band (kinetic energy of the drill bit) and a 350 J wasted band (heat and sound). The band widths are proportional to the energy, and 150 plus 350 equals 500.";
  await put("sankey-drill-500j", 600, Math.round(s.h) + 10, s.b, alt, "Figure: Sankey diagram of the drill, band widths proportional to energy", "energy/stores-transfers", "### Sankey diagrams");
}
{
  const s = sankey({ input: 2000, useful: 700, unit: "MW", k: 0.045, inLabel: "chemical power", usefulLabel: "electrical output", wasteLabel: "wasted: cooling water, air", y0: 40, gap: 40, xe: 450 });
  const alt = "Sankey diagram for a coal-fired power station: 2000 MW of power from the coal splits into 700 MW of electrical output and 1300 MW wasted to cooling water and the air, so the efficiency is 700 divided by 2000, which is 35 percent.";
  await put("sankey-power-station-35", 600, Math.round(s.h) + 20, s.b + T(30, Math.round(s.h) + 8, "efficiency = 700 ÷ 2000 × 100% = 35%", { weight: 700, fill: C.blue }), alt, "Figure: Sankey diagram of the coal-fired power station, efficiency 35%", "energy/efficiency", "You can also rearrange the equation");
}

// ---- conduction: rods in a hot trough with wax blobs
{
  const mats = ["copper", "aluminium", "iron", "glass"];
  let b = D.rect(40, 30, 70, 180, { fill: C.fillBlue, r: 4 }) + M(75, 122, "hot", { weight: 700 }) + M(75, 142, "water", { weight: 700 });
  b += D.arrow(75, 270, 75, 222, { stroke: C.red, width: 3 }) + T(90, 262, "heat", { fill: C.red, weight: 700 });
  mats.forEach((m, i) => {
    const y = 60 + i * 42;
    b += D.rect(110, y - 7, 330, 14, { fill: C.fillGrey, width: 1.6 }) + D.circle(450, y, 8, { fill: C.fillAmber, stroke: C.amber });
    b += T(470, y + 5, m, { weight: 700 });
  });
  b += T(110, 25, "rods of the same length and thickness, wax on the far ends", { size: 13, fill: C.muted });
  b += T(130, 245, "wax melts in this order:", { size: 13, fill: C.muted }) + T(130, 265, "1 copper, 2 aluminium, 3 iron; glass may not melt", { weight: 700 });
  const alt = "Four rods of equal length and thickness (copper, aluminium, iron, glass) stick out of a trough of hot water, each with wax on its far end. The wax melts first on copper, then aluminium, then iron, and on glass it may not melt: copper is the best conductor.";
  await put("conduction-wax-rods", 600, 285, b, alt, "Figure: comparing conductors with wax on the ends of rods", "thermal/conduction", "Metals are good conductors.");
}

// ---- vacuum flask cross-section
{
  const x0 = 60, y0 = 40, w = 170, h = 260;
  let b = "";
  b += D.path_(`M${x0},${y0 + 20} L${x0},${y0 + h} Q${x0},${y0 + h + 14} ${x0 + 14},${y0 + h + 14} L${x0 + w - 14},${y0 + h + 14} Q${x0 + w},${y0 + h + 14} ${x0 + w},${y0 + h} L${x0 + w},${y0 + 20}`, { width: 3 });
  const ix = x0 + 18, iw = w - 36;
  b += D.path_(`M${ix},${y0 + 14} L${ix},${y0 + h - 10} Q${ix},${y0 + h} ${ix + 12},${y0 + h} L${ix + iw - 12},${y0 + h} Q${ix + iw},${y0 + h} ${ix + iw},${y0 + h - 10} L${ix + iw},${y0 + 14}`, { stroke: C.axis, width: 3 });
  const jx = ix + 12, jw = iw - 24;
  b += D.path_(`M${jx},${y0 + 14} L${jx},${y0 + h - 22} Q${jx},${y0 + h - 12} ${jx + 12},${y0 + h - 12} L${jx + jw - 12},${y0 + h - 12} Q${jx + jw},${y0 + h - 12} ${jx + jw},${y0 + h - 22} L${jx + jw},${y0 + 14}`, { stroke: C.axis, width: 3 });
  b += D.rect(jx + 4, y0 + 60, jw - 8, h - 82, { fill: C.fillAmber, stroke: "none" }) + M(jx + jw / 2, y0 + 150, "hot", { weight: 700 }) + M(jx + jw / 2, y0 + 170, "drink", { weight: 700 });
  b += D.rect(jx + 6, y0 - 8, jw - 12, 30, { fill: C.fillGrey, r: 3 });
  b += D.rect(x0 + 8, y0 + h - 6, 24, 12, { fill: C.fillGrey, width: 1.4 }) + D.rect(x0 + w - 32, y0 + h - 6, 24, 12, { fill: C.fillGrey, width: 1.4 });
  const lx = 270;
  b += T(lx, y0 + 4, "stopper: an insulator", {}) + D.line(lx - 4, y0 + 0, jx + jw - 6, y0 + 6, { stroke: C.muted, width: 1.2 }) +
    T(lx, y0 + 64, "vacuum between the walls:", {}) + T(lx, y0 + 82, "no conduction, no convection", {}) + D.line(lx - 4, y0 + 70, ix + iw - 6, y0 + 70, { stroke: C.muted, width: 1.2 }) +
    T(lx, y0 + 134, "silvered surfaces facing", {}) + T(lx, y0 + 152, "the gap: reduce radiation", {}) + D.line(lx - 4, y0 + 140, jx + jw, y0 + 140, { stroke: C.muted, width: 1.2 }) +
    T(lx, y0 + 224, "insulating supports", {}) + D.line(lx - 4, y0 + 220, x0 + w - 10, y0 + h, { stroke: C.muted, width: 1.2 }) +
    T(lx, y0 + 274, "outer case", {}) + D.line(lx - 4, y0 + 270, x0 + w, y0 + 250, { stroke: C.muted, width: 1.2 });
  const alt = "Cross-section of a vacuum flask: a double-walled glass bottle with a vacuum between the walls (stops conduction and convection), silvered surfaces (reduce radiation), an insulating stopper and insulating supports inside an outer case.";
  await put("vacuum-flask-section", 520, 365, b, alt, "Figure: how a vacuum flask reduces conduction, convection and radiation", "thermal/transfer-applications", "| insulated supports holding the inner bottle");
}

// ---- convection in a beaker (potassium permanganate)
{
  const bx = 90, by = 40, bw = 300, bh = 190;
  let b = D.path_(`M${bx},${by} L${bx},${by + bh} L${bx + bw},${by + bh} L${bx + bw},${by}`, { width: 3 }) + D.rect(bx + 2, by + 20, bw - 4, bh - 22, { fill: C.fillBlue, stroke: "none" });
  const L = bx + 50, R = bx + bw - 60, top = by + 55, bot = by + bh - 28;
  b += D.path_(`M${L},${bot} L${L},${top} L${R},${top} L${R},${bot} L${L + 6},${bot}`, { stroke: C.purple, width: 4 });
  const tri = (pts) => D.polyline(pts, { fill: C.purple, close: true, stroke: C.purple });
  b += tri([[L - 8, top + 36], [L, top + 20], [L + 8, top + 36]]) + tri([[(L + R) / 2 - 12, top - 8], [(L + R) / 2 + 6, top], [(L + R) / 2 - 12, top + 8]]) +
    tri([[R - 8, top + 50], [R, top + 68], [R + 8, top + 50]]) + tri([[(L + R) / 2 + 12, bot - 8], [(L + R) / 2 - 6, bot], [(L + R) / 2 + 12, bot + 8]]);
  b += D.rect(L - 6, bot + 2, 14, 10, { fill: C.purple, stroke: C.purple }) + T(L + 14, bot + 22, "crystal", { size: 13 });
  b += D.polyline([[L - 14, by + bh + 50], [L, by + bh + 12], [L + 14, by + bh + 50]], { fill: C.fillAmber, stroke: C.amber, close: true }) + T(L + 24, by + bh + 38, "gentle heat", { fill: C.amber, weight: 700 });
  b += T(bx + bw / 2, by + 40, "water", { anchor: "middle", fill: C.muted });
  b += T(L + 14, top + 48, "warm water rises", { size: 13, weight: 700 });
  b += T(R - 14, top + 70, "cooler water sinks", { size: 13, anchor: "end", weight: 700 });
  const alt = "Beaker of water with a purple crystal at the bottom near the left side, heated gently under that side: the purple stream rises on the heated side, spreads across the top, sinks on the cool side and returns along the bottom, showing a convection current.";
  await put("convection-beaker-crystal", 480, 305, b, alt, "Figure: a convection current made visible with a potassium permanganate crystal", "thermal/convection", "Convection cannot happen in solids");
}

// ---- bimetallic strip: brass expands more than iron
{
  let b = T(30, 35, "Cold: straight", { weight: 700 }) + D.rect(30, 50, 220, 10, { fill: C.fillAmber, width: 1.6 }) + D.rect(30, 60, 220, 10, { fill: C.fillGrey, width: 1.6 }) +
    T(258, 59, "brass", { size: 13 }) + T(258, 78, "iron", { size: 13 });
  b += T(30, 108, "Hot: bends, with brass on the outside of the curve", { weight: 700 });
  b += `<path d="M30,185 Q140,120 250,185" fill="none" stroke="${C.amber}" stroke-width="10"/><path d="M30,196 Q140,131 250,196" fill="none" stroke="${C.axis}" stroke-width="10"/>`;
  b += T(258, 184, "brass (expands more)", { size: 13 }) + T(258, 206, "iron (expands less)", { size: 13 });
  const alt = "A bimetallic strip of brass bonded to iron: when cold it is straight; when heated the brass expands more than the iron, so the strip bends with the brass on the outside of the curve. This bending can open or close a contact in a thermostat.";
  await put("bimetallic-strip-bending", 480, 225, b, alt, "Figure: a bimetallic strip bends when heated because brass expands more than iron", "thermal/expansion", "- **Liquid-in-glass thermometers**");
}

// ---- particle arrangement in solid, liquid, gas
{
  const box = (x, label, pts, note) => {
    let s = D.rect(x, 40, 170, 150, { fill: "#fff", r: 4 }) + M(x + 85, 28, label, { weight: 700 });
    for (const [px, py] of pts) s += D.circle(x + px, 40 + py, 9, { fill: C.fillBlue, stroke: C.blue, width: 1.8 });
    return s + M(x + 85, 212, note, { size: 13 });
  };
  const solid = [], liquid = [], gas = [];
  for (let r = 0; r < 5; r += 1) for (let c = 0; c < 7; c += 1) solid.push([22 + c * 21, 22 + r * 26]);
  for (let r = 0; r < 5; r += 1) for (let c = 0; c < 7; c += 1) if ((r * 7 + c) % 9 !== 4) liquid.push([20 + c * 21 + ((r * 5 + c * 3) % 5) - 2 + (r % 2) * 5, 24 + r * 25 + ((c * 7 + r) % 5) - 2]);
  [[30, 30], [120, 24], [78, 62], [145, 95], [40, 110], [100, 125], [20, 72], [150, 40], [68, 20]].forEach((p) => gas.push(p));
  const b = box(15, "Solid", solid, "close, regular, vibrate in place") + box(205, "Liquid", liquid, "close, irregular, slide past") + box(395, "Gas", gas, "far apart, fast, random");
  const alt = "Particle diagrams for the three states: in a solid the particles are close together in a regular pattern, vibrating about fixed positions; in a liquid they are close but irregular and can slide past each other; in a gas they are far apart and move randomly at high speed.";
  await put("states-particle-arrangement", 600, 235, b, alt, "Figure: particle arrangement in a solid, a liquid and a gas", "thermal/particle-model", "## Particles in the three states");
}

// ---- Boyle's law: p-V curve and p-1/V line, using 120 kPa x 2.0 l = 240 and the 0.80 l, 300 kPa end point
{
  const K = 240, V1 = 2.0, V2 = 0.8;
  const o = { y: [0, 400], yTicks: [0, 100, 200, 300, 400], yLabel: "p (kPa)", w: 310, h: 340, pad: { l: 58, r: 22, t: 34, b: 56 } };
  const a1 = D.axes({ ...o, x: [0, 3], xTicks: [0, 1, 2, 3], xLabel: "V (litres)" });
  const a2 = D.axes({ ...o, x: [0, 1.5], xTicks: [0, 0.5, 1.0, 1.5], xLabel: "1/V (1/litre)" });
  const g1 = a1.frame + a1.plot((v) => K / v, { domain: [0.55, 3], steps: 200 }) + a1.guides(V1, K / V1) + a1.guides(V2, K / V2) + a1.point(V1, K / V1, { stroke: C.red }) + a1.point(V2, K / V2, { stroke: C.red }) +
    a1.tag(V1, K / V1, "2.0, 120", { dx: 10, dy: -8 }) + a1.tag(V2, K / V2, "0.80, 300", { dx: 12, dy: -6 });
  const g2 = a2.frame + a2.line([[0, 0], [1.5, K * 1.5]]) + a2.guides(1 / V1, K / V1) + a2.guides(1 / V2, K / V2) + a2.point(1 / V1, K / V1, { stroke: C.red }) + a2.point(1 / V2, K / V2, { stroke: C.red }) +
    a2.tag(1 / V1, K / V1, "0.50, 120", { dx: 12, dy: 24 }) + a2.tag(1 / V2, K / V2, "1.25, 300", { dx: -110, dy: -8 });
  const b = g1 + D.group(g2, { translate: [310, 0] }) + M(155, 356, "p against V: a curve", { size: 13, fill: C.muted }) + M(465, 356, "p against 1/V: straight line", { size: 13, fill: C.muted });
  const alt = "Boyle's law graphs for the syringe air: p against V is a curve passing through (2.0 litres, 120 kPa) and (0.80 litres, 300 kPa); p against 1/V is a straight line through the origin, because pV is constant at 240.";
  await put("gas-boyle-graphs", 620, 365, b, alt, "Figure: Boyle's law, pressure against volume and against 1/V", "thermal/gas-laws", "A graph of $p$ against $V$ is a curve");
}

// ---- Charles's law: V against T (kelvin), V = 3.0 at 290 K, 3.6 at 350 K
{
  const k = 3.0 / 290;
  const ax = D.axes({ x: [0, 400], y: [0, 4.4], xTicks: [0, 100, 200, 300, 400], yTicks: [0, 1, 2, 3, 4], xLabel: "T (K)", yLabel: "V (litres)", w: 560, h: 360, pad: { l: 58, r: 28, t: 30, b: 56 } });
  const b = ax.frame + ax.line([[0, 0], [400, k * 400]]) + ax.guides(290, 3.0) + ax.guides(350, k * 350) +
    ax.point(290, 3.0, { stroke: C.red }) + ax.point(350, k * 350, { stroke: C.red }) +
    ax.tag(40, 3.0, "290 K, 3.0 litres", { dy: -6 }) + ax.tag(40, k * 350, "350 K, 3.6 litres", { dy: -6 });
  const alt = "Charles's law graph: for gas at constant pressure the volume is directly proportional to the kelvin temperature, a straight line through the origin; 3.0 litres at 290 K (17 degrees C) rises to 3.6 litres at 350 K (77 degrees C).";
  await put("gas-charles-volume-kelvin", 560, 360, b, alt, "Figure: Charles's law, volume against kelvin temperature at constant pressure", "thermal/gas-laws", "For a fixed mass of gas at **constant pressure**");
}

// ---- thermometer calibration: column length against temperature (2.0 cm at 0, 22.0 cm at 100, 16.5 cm in the tea)
{
  const l0 = 2.0, l100 = 22.0, lt = 16.5, th = ((lt - l0) / (l100 - l0)) * 100;
  const ax = D.axes({ x: [0, 100], y: [0, 24], xTicks: [0, 20, 40, 60, 80, 100], yTicks: [0, 4, 8, 12, 16, 20, 24], xLabel: "Temperature (°C)", yLabel: "Length of liquid column (cm)", w: 560, h: 380, pad: { l: 58, r: 28, t: 34, b: 56 } });
  const b = ax.frame + ax.line([[0, l0], [100, l100]]) + ax.guides(th, lt) + ax.point(0, l0, { stroke: C.red }) + ax.point(100, l100, { stroke: C.red }) + ax.point(th, lt, { stroke: C.red }) +
    ax.tag(0, l0, "ice point 2.0 cm", { dx: 10, dy: -14 }) + ax.tag(100, l100, "steam point 22.0 cm", { dx: -170, dy: -2 }) + ax.tag(th, lt, `16.5 cm: ${th} °C`, { dx: 10, dy: 40 });
  const alt = "Calibration line for an unmarked thermometer: the liquid column is 2.0 cm at the ice point (0 degrees C) and 22.0 cm at the steam point (100 degrees C); a column of 16.5 cm in the tea reads 72.5 degrees C.";
  await put("thermometer-calibration-line", 560, 380, b, alt, "Figure: calibration line of the unmarked thermometer, with the tea reading", "thermal/thermometers", "To calibrate a liquid-in-glass thermometer");
}
console.log("done p2-thermal");
