// Run: node .scratch/physics/diagrams/misc.mjs  (nuclear, thermal, pressure, electronics, vectors, energy)
import * as D from "../../tools/diagram-kit.mjs";
import { S, W, J } from "./_circ.mjs";
const F = "physics-o", LL = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LL}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const rad = (d) => (d * Math.PI) / 180;

// ---- half-life: 1200 counts/min, half-life 6.0 h
{
  const A0 = 1200, th = 6;
  const ax = D.axes({ x: [0, 26], y: [0, 1300], xTicks: 6, yTicks: 200, xLabel: "Time (hours)", yLabel: "Count rate (counts/min)", w: 600, h: 400, pad: { l: 74 } });
  let b = ax.frame + ax.plot((t) => A0 * 0.5 ** (t / th), { domain: [0, 26] });
  for (let k = 0; k <= 4; k += 1) {
    const t = k * th, a = A0 / 2 ** k;
    b += ax.point(t, a, { r: 4 }) + (k > 0 ? ax.guides(t, a) : D.line(ax.X(0), ax.Y(a), ax.X(0), ax.Y(a)));
  }
  b += ax.tag(6, 600, "600 after 6 h", { dx: 12, dy: -10 }) + ax.tag(12, 300, "300 after 12 h", { dx: 12, dy: -10 }) + ax.tag(18, 150, "150 after 18 h", { dx: 14, dy: -26 }) + ax.tag(24, 75, "75 after 24 h", { dx: -6, dy: -84, anchor: "end" }) +
    ax.tag(1, 1250, "each 6 hours, the count rate halves", { fill: C.blue });
  const alt = "Decay curve for a source with a half-life of 6.0 hours and an initial count rate of 1200 counts per minute: the count rate falls to 600 after 6 hours, 300 after 12, 150 after 18 and 75 after 24 hours, halving in every equal 6-hour step, falling steeply at first and then more slowly.";
  await put("half-life-decay-curve", 600, 400, b, alt, "Figure: the count rate halves every half-life", "nuclear/half-life", "The amount never quite reaches zero");
}

// ---- heating curve of water
{
  const ax = D.axes({ x: [0, 14], y: [-20, 130], xTicks: [], yTicks: [0, 20, 40, 60, 80, 100, 120], xLabel: "Time (steady heating)", yLabel: "Temperature (°C)", w: 600, h: 400, pad: { l: 70 } });
  const pts = [[0, -10], [1, 0], [3, 0], [6.2, 100], [9, 100], [10.5, 125]];
  const b = ax.frame + ax.line(pts, { width: 3 }) +
    ax.tag(1.4, -12, "solid warming", {}) + ax.tag(0.2, 16, "melts at 0 °C", {}) + ax.tag(4.8, 40, "liquid warming", {}) + ax.tag(4.6, 114, "boils at 100 °C", {}) + ax.tag(10.2, 92, "gas warming", {});
  const alt = "Heating curve for water heated steadily: temperature rises as a solid, then stays flat at 0 degrees Celsius while the ice melts, rises as a liquid, stays flat at 100 degrees Celsius while it boils, then rises again as a gas. The energy supplied during the flat sections breaks bonds instead of raising the temperature.";
  await put("heating-curve-water", 600, 400, b, alt, "Figure: the temperature stays constant while a substance melts or boils", "thermal/changes-of-state", "## Melting and boiling");
}

// ---- specific heat capacity experiment: aluminium block
{
  let b = D.rect(150, 50, 120, 170, { fill: "none", stroke: C.muted, width: 14, r: 6 }) + D.rect(165, 65, 90, 140, { fill: "#c9ced4", width: 2.4, r: 3 }) + M(210, 150, "aluminium", { size: 13 }) + M(210, 168, "block 1.0 kg", { size: 13 }) +
    D.rect(184, 28, 16, 76, { fill: C.fillAmber, width: 2 }) + D.rect(228, 28, 10, 76, { fill: "#fff", width: 2 }) + D.rect(231, 66, 4, 38, { fill: C.red, stroke: "none" }) +
    T(176, 30, "electric heater", { anchor: "end", size: 13 }) + D.line(178, 34, 184, 40, { stroke: C.muted, width: 1.2 }) + T(246, 24, "thermometer", { size: 13 }) + D.line(238, 34, 244, 30, { stroke: C.muted, width: 1.2 }) +
    T(210, 252, "insulation round the block", { size: 13, fill: C.muted, anchor: "middle" }) +
    D.sym.cell(370, 170, { vertical: true }) + W([370, 140], [370, 60], [420, 60]) + D.sym.meter(450, 60, "A") + W([480, 60], [540, 60]) + D.sym.resistor(540, 170, { vertical: true }) + W([540, 60], [540, 140]) +
    W([540, 200], [540, 270], [370, 270], [370, 200]) + W([540, 90], [600, 90], [600, 140]) + D.sym.meter(600, 170, "V", { vertical: true }) + W([600, 200], [600, 230], [540, 230]) + J(540, 90) + J(540, 230);
  b += T(520, 176, "heater", { size: 13, anchor: "end" }) + T(310, 304, "energy supplied = P × t = 50 W × 300 s = 15 000 J", { anchor: "middle", weight: 700 }) + T(310, 328, "c = 15 000 ÷ (1.0 kg × 16.5 °C) = 909 J/(kg °C)", { anchor: "middle", weight: 700 });
  const alt = "Apparatus for measuring the specific heat capacity of a 1.0 kg aluminium block: an electric heater and a thermometer in holes in the block, insulation round it, and a circuit with an ammeter in series and a voltmeter across the heater to find its power. A 50 W heater for 300 s supplies 15 000 J, giving a 16.5 degree rise and c of about 909 J per kg per degree Celsius.";
  await put("shc-block-experiment", 640, 345, b, alt, "Figure: measuring the specific heat capacity of a metal block", "thermal/specific-heat-capacity", "### A solid (for example an aluminium block)");
}

// ---- pressure: crate on two faces (schematic, widths proportional to the areas)
{
  const g0 = 215;
  const crate = (x, w, h, area, p) => D.rect(x, g0 - h, w, h, { fill: C.fillAmber, r: 3 }) + D.line(x - 20, g0, x + w + 20, g0, { stroke: C.axis, width: 3 }) +
    D.arrow(x + w / 2, 44, x + w / 2, g0 - h - 4, { stroke: C.red, width: 3 }) + M(x + w / 2, 34, "weight 600 N", { fill: C.red, weight: 700, size: 13 }) + M(x + w / 2, g0 + 28, `area ${area} m²`, {}) +
    M(x + w / 2, g0 + 52, `p = 600 ÷ ${area} = ${p.toLocaleString("en-GB")} Pa`, { weight: 700, fill: C.blue });
  const b = crate(60, 190, 70, "0.20", 3000) + crate(390, 48, 130, "0.050", 12000) + M(155, g0 + 76, "on its largest face", { fill: C.muted }) + M(414, g0 + 76, "on its smallest face", { fill: C.muted });
  const alt = "A 600 N crate resting on two faces: on its largest face, 0.20 square metres, it exerts a pressure of 3000 Pa; stood on its smallest face, 0.050 square metres, the same weight gives 12 000 Pa, four times the pressure from a quarter of the area.";
  await put("pressure-crate-two-faces", 560, 320, b, alt, "Figure: the same force on a smaller area gives a larger pressure", "forces/pressure", "## Pressure under solids");
}

// ---- pressure in a liquid: depth 8.0 m, rho g h
{
  const top = 40, bot = 290, left = 100, right = 220;
  let b = D.rect(left, top, right - left, bot - top, { fill: C.fillBlue, stroke: C.axis, width: 3 }) + D.line(left, top, right, top, { stroke: C.blue, width: 3 });
  for (const f of [0.25, 0.5, 0.75, 1]) {
    const y = top + f * (bot - top), len = 25 + 80 * f;
    b += D.arrow(right + len, y, right + 4, y, { stroke: C.red, width: 2.4 });
  }
  b += D.line(70, top, 70, bot, { stroke: C.amber, width: 1.8, arrow: true, arrowStart: true }) + T(62, (top + bot) / 2, "8.0 m", { anchor: "end", fill: C.amber, weight: 700 }) +
    T(left + 60, top + 22, "water surface", { anchor: "middle", size: 13, fill: C.blue }) + T(left + 60, bot - 14, "ρ = 1000 kg/m³", { anchor: "middle", size: 13 }) +
    T(370, 90, "Longer arrows lower down:", { weight: 700 }) + T(370, 112, "pressure increases with depth.", { weight: 700 }) + T(370, 160, "Δp = ρgΔh", { weight: 700, fill: C.red }) +
    T(370, 184, "= 1000 × 9.8 × 8.0", {}) + T(370, 208, "= 78 400 Pa at the bottom", { weight: 700 });
  const alt = "Tank of water 8.0 m deep with arrows pushing sideways on the wall that get longer with depth: pressure increases with depth. At 8.0 m, with a density of 1000 kg per cubic metre and g of 9.8 N per kg, the pressure from the water is 78 400 Pa.";
  await put("pressure-depth-liquid", 600, 320, b, alt, "Figure: liquid pressure increases with depth", "forces/pressure", "## Pressure in liquids");
}

// ---- rectification: four stacked graphs, 50 Hz, two cycles (0.04 s)
{
  const f = (t) => Math.sin(2 * Math.PI * 50 * t);
  const smooth = () => {
    const pts = []; let v = 0; const dt = 0.04 / 400;
    for (let i = 0; i <= 400; i += 1) { const t = i * dt; const r = Math.abs(f(t)); v = Math.max(r, v * Math.exp(-dt / 0.006)); pts.push([t, v]); }
    return pts;
  };
  const hs = [175, 135, 135, 175];
  const offs = [0, 175, 310, 445];
  const panel = (title, fn, i, ac) => {
    const last = i === 3;
    const ax = D.axes({ x: [0, 0.04], y: ac ? [-1.2, 2.0] : [-0.15, 1.9], xTicks: last ? [0, 0.01, 0.02, 0.03, 0.04] : [], yTicks: [], w: 600, h: hs[i], pad: { l: 40, r: 20, t: 8, b: last ? 36 : 8 }, grid: false, xLabel: last ? "Time (s)" : "", xFormat: (v) => v.toFixed(2) });
    return D.group(ax.frame + fn(ax) + D.text(52, 22, title, { size: 14, weight: 700 }), { translate: [0, offs[i]] });
  };
  const b = panel("a.c. input", (ax) => ax.plot(f, { domain: [0, 0.04], steps: 300 }), 0, true) +
    panel("half-wave rectified (one diode)", (ax) => ax.plot((t) => Math.max(0, f(t)), { domain: [0, 0.04], steps: 400 }), 1) +
    panel("full-wave rectified (bridge of four diodes)", (ax) => ax.plot((t) => Math.abs(f(t)), { domain: [0, 0.04], steps: 400 }), 2) +
    panel("full-wave with a smoothing capacitor", (ax) => ax.line(smooth(), { stroke: C.blue }), 3);
  const alt = "Four voltage-time graphs over two cycles of 50 Hz mains. The a.c. input swings above and below zero. Half-wave rectification keeps only the positive humps, with gaps between them. Full-wave rectification gives a continuous row of humps, twice as many. Adding a smoothing capacitor gives an almost steady output with a small ripple.";
  await put("rectification-waveforms", 600, 620, b, alt, "Figure: a.c. input, half-wave, full-wave and smoothed outputs", "electronics/rectification", "## The a.c. input");
}

// ---- vectors: boat across the river, 3.0 m/s across, 1.6 m/s downstream
{
  const k = 55, x0 = 140, y0 = 270;
  const across = 3.0 * k, down = 1.6 * k;
  let b = D.arrow(x0, y0, x0, y0 - across, { stroke: C.blue, width: 3.4 }) + D.arrow(x0, y0 - across, x0 + down, y0 - across, { stroke: C.amber, width: 3.4 }) + D.arrow(x0, y0, x0 + down, y0 - across, { stroke: C.red, width: 3.4 }) +
    T(x0 - 10, y0 - across / 2, "3.0 m/s across", { anchor: "end", fill: C.blue, weight: 700 }) + T(x0 + down / 2, y0 - across - 10, "1.6 m/s downstream", { anchor: "middle", fill: C.amber, weight: 700 }) +
    T(x0 + down + 14, y0 - across / 2 + 20, "resultant 3.4 m/s", { fill: C.red, weight: 700 }) + D.path_(`M${x0},${y0 - 70} A70,70 0 0 1 ${x0 + 70 * Math.sin(Math.atan2(1.6, 3.0))},${y0 - 70 * Math.cos(Math.atan2(1.6, 3.0))}`, { stroke: C.muted, width: 1.6 }) +
    T(x0 + 12, y0 - 82, "28°", { weight: 700 }) +
    T(380, 60, "Nose to tail: the resultant", {}) + T(380, 82, "joins the start of the first", {}) + T(380, 104, "arrow to the end of the second.", {}) + T(380, 230, "√(3.0² + 1.6²) = 3.4 m/s", { weight: 700 }) + T(380, 254, "tan θ = 1.6 ÷ 3.0, so θ = 28°", { weight: 700 });
  const alt = "Velocity triangle for a boat crossing a river: 3.0 m/s straight across and 1.6 m/s downstream, drawn nose to tail. The resultant is 3.4 m/s (square root of 3.0 squared plus 1.6 squared) at 28 degrees downstream of straight across, since tan of the angle is 1.6 over 3.0.";
  await put("vectors-boat-river", 600, 300, b, alt, "Figure: adding two velocities at right angles, nose to tail", "measurement/scalars-vectors", "### By scale drawing");
}

// ---- energy conservation: 1.0 kg stone falling 5.0 m
{
  const m = 1.0, g = 9.8, H = 5;
  const Etot = m * g * H;
  const stages = [5, 2.5, 0].map((h) => ({ h, Ep: m * g * h, Ek: Etot - m * g * h }));
  const base = 280;
  let b = D.rect(20, 3, 14, 14, { fill: C.teal, stroke: "none" }) + T(40, 15, "gravitational potential energy (J)", { size: 13 }) + D.rect(310, 3, 14, 14, { fill: C.amber, stroke: "none" }) + T(330, 15, "kinetic energy (J)", { size: 13 });
  stages.forEach((s2, i) => {
    const x = 110 + i * 180, y = 60 + ((H - s2.h) / H) * 200;
    b += D.circle(x, y, 10, { fill: C.fillAmber }) + D.line(x - 30, y + 10, x + 20, y + 10, { stroke: C.grid, width: 1.4 }) + T(x, base + 24, `${s2.h.toFixed(1)} m above the ground`, { anchor: "middle", size: 13 });
    const bx = x + 40, bw = 34, sc = 110 / Etot;
    b += D.rect(bx, base - s2.Ep * sc, bw, s2.Ep * sc, { fill: C.teal, stroke: "none" }) + D.rect(bx + bw + 4, base - s2.Ek * sc, bw, s2.Ek * sc, { fill: C.amber, stroke: "none" }) +
      M(bx + bw / 2, base - s2.Ep * sc - 6, s2.Ep.toFixed(1), { size: 12, fill: C.teal, weight: 700 }) + M(bx + bw + 4 + bw / 2, base - s2.Ek * sc - 6, s2.Ek.toFixed(1), { size: 12, fill: C.amber, weight: 700 });
  });
  b += D.line(30, base, 590, base, { stroke: C.axis, width: 1.6 });
  const alt = "Energy of a 1.0 kg stone falling 5.0 m, ignoring air resistance: at the top it has 49.0 J of potential energy and no kinetic energy; halfway down each is 24.5 J; at the bottom all 49.0 J is kinetic, a speed of 9.9 m/s. The total stays 49.0 J.";
  await put("energy-falling-stone", 620, 320, b, alt, "Figure: potential energy changes into kinetic energy as a 1.0 kg stone falls", "energy/kinetic-potential", "## Energy conservation: falling objects");
}
console.log("misc done");
