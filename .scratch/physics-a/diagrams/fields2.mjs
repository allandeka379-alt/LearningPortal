// physics-a gravitation, induction, magnetism, vectors. Run: node .scratch/physics-a/diagrams/fields2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const rad = (d) => (d * Math.PI) / 180;
const f = (v, d = 0) => v.toFixed(d).replace("-", "−");

// ---- Gravitational field lines (radial and near-uniform) and g against r
{
  let b = D.text(140, 22, "Radial field of a sphere", { anchor: "middle", size: 14, weight: 700 }) + D.text(430, 22, "Near the surface", { anchor: "middle", size: 14, weight: 700 });
  const cx = 140, cy = 150;
  b += D.circle(cx, cy, 38, { fill: C.fillBlue, stroke: C.blue });
  for (let k = 0; k < 8; k += 1) { const t = rad(k * 45 + 22.5); b += D.arrow(cx + 118 * Math.cos(t), cy + 118 * Math.sin(t), cx + 44 * Math.cos(t), cy + 44 * Math.sin(t), { stroke: C.blue, width: 2 }); }
  b += D.text(cx, cy + 5, "mass", { anchor: "middle", size: 14 }) + D.text(cx, 290, "lines point inwards; they spread out so", { anchor: "middle", size: 13, fill: C.muted }) + D.text(cx, 308, "the field weakens with distance", { anchor: "middle", size: 13, fill: C.muted });
  b += D.rect(340, 240, 180, 26, { fill: C.fillGrey, stroke: C.muted, width: 1.6 }) + D.text(430, 258, "ground", { anchor: "middle", size: 13 });
  for (let k = 0; k < 5; k += 1) b += D.arrow(360 + k * 35, 60, 360 + k * 35, 232, { stroke: C.blue, width: 2 });
  b += D.text(430, 290, "parallel and equally spaced:", { anchor: "middle", size: 13, fill: C.muted }) + D.text(430, 308, "a uniform field", { anchor: "middle", size: 13, fill: C.muted });
  const alt1 = "Gravitational field lines: around a sphere they run straight inwards to the centre and spread out with distance, so the field weakens; near the ground over a small region they are parallel, vertical and equally spaced, a uniform field.";
  const cap1 = "Figure: gravitational field lines, radial (left) and nearly uniform near the surface (right)";
  await D.figure(F, "gravitational-field-lines", D.svg(560, 320, b), { alt: alt1, caption: cap1 });
  D.insertAfter(L("gravitation/field-strength"), "## Field lines", D.md("gravitational-field-lines", alt1, cap1));

  const g0 = 9.81;
  const a = D.axes({ x: [0, 7], y: [0, 10.5], xTicks: 1, yTicks: 2, xLabel: "r / R_E", yLabel: "g / N kg⁻¹", w: 560, h: 340 });
  let b2 = a.frame + a.plot((x) => g0 / (x * x), { domain: [0.7, 7] });
  for (const [x, y] of [[1, 9.81], [1.5, 4.36], [2, 2.45], [3, 1.09], [4, 0.613], [6.6, 0.225]]) b2 += a.point(x, y, { stroke: C.amber, r: 4.5 });
  b2 += a.tag(1.15, 9.9, "surface: 9.81 N kg⁻¹", { size: 14, anchor: "start", fill: C.amber, dx: 20 }) + a.tag(3.2, 5.0, "inverse square: g ∝ 1/r²", { size: 14, anchor: "start" }) + a.tag(3.2, 3.2, "double r, g ÷ 4", { size: 14, anchor: "start" });
  const alt2 = "Graph of Earth's gravitational field strength against distance from its centre in Earth radii: it starts at 9.81 N/kg at the surface, falls to 2.45 at 2 radii and 0.613 at 4 radii, an inverse-square curve that approaches zero but never reaches it.";
  const cap2 = "Figure: g falls as 1/r² (points from the lesson table)";
  await D.figure(F, "g-against-distance-graph", D.svg(560, 340, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("gravitation/field-strength"), "A graph of $g$ against $r$ starts at", D.md("g-against-distance-graph", alt2, cap2));
}

// ---- Induction: generator e.m.f. E0 = 113 V ; Lenz coil sketch
{
  const E0 = 113;
  const a = D.axes({ x: [0, 360], y: [-130, 130], xTicks: 90, yTicks: [-113, -56.5, 0, 56.5, 113], yLabel: "E / V", w: 560, h: 360, yFormat: (v) => String(Math.round(v * 10) / 10).replace("-", "−") });
  let b = a.frame + a.plot((t) => E0 * Math.sin(rad(t)), { domain: [0, 360] });
  for (const [t, e] of [[30, 56.5], [60, 97.9], [90, 113], [120, 97.9], [150, 56.5], [270, -113]]) b += a.point(t, e, { stroke: C.amber, r: 4.5 });
  b += a.tag(100, 120, "peak E₀ = 113 V (coil plane parallel to field)", { size: 14, anchor: "start", dx: 20, fill: C.blue }) + a.tag(190, 70, "E = 0: coil plane perpendicular to field", { size: 14, anchor: "start" }) + D.text(532, 350, "angle of normal from field / °", { size: 14, weight: 600, anchor: "end" });
  const alt = "Generator e.m.f. against the angle of the coil's normal from the field: a sine curve E = 113 sin θ with peak 113 V at 90° and 270° (coil plane parallel to the field) and zero at 0°, 180° and 360° (coil plane perpendicular to the field); 56.5 V at 30°.";
  const cap = "Figure: e.m.f. of the a.c. generator (200 turns, 0.012 m², 50 rev/s, 0.15 T) over one rotation";
  await D.figure(F, "generator-emf-graph", D.svg(560, 360, b), { alt, caption: cap });
  D.insertAfter(L("induction/lenz-applications"), "The graph of $E$ against time is a sine curve", D.md("generator-emf-graph", alt, cap));

  let s = D.text(10, 22, "North pole pushed towards a coil", { size: 14, weight: 700 });
  s += D.rect(40, 90, 130, 44, { fill: C.fillGrey }) + D.rect(40, 90, 65, 44, { fill: "#fbe4e1", stroke: C.ink }) + D.text(72, 119, "S", { anchor: "middle", weight: 700 }) + D.rect(105, 90, 65, 44, { fill: C.fillBlue }) + D.text(138, 119, "N", { anchor: "middle", weight: 700 });
  s += D.arrow(100, 70, 190, 70, { stroke: C.amber, width: 3 }) + D.text(120, 58, "pushed in", { size: 14, fill: C.amber });
  for (let k = 0; k < 5; k += 1) s += `<ellipse cx="${300 + k * 24}" cy="112" rx="16" ry="48" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
  s += D.text(300, 222, "near end becomes N", { size: 14, fill: C.blue, weight: 600 }) + D.text(300, 242, "(like poles repel)", { size: 14, fill: C.blue });
  s += D.arrow(280, 160, 205, 160, { stroke: C.red, width: 3 }) + D.text(200, 184, "repelling force on the magnet", { size: 14, fill: C.red });
  s += D.text(10, 275, "Work done pushing the magnet against this repulsion", { size: 14 }) + D.text(10, 295, "becomes electrical energy: energy is conserved.", { size: 14 });
  const alt2 = "Lenz's law: as a north pole is pushed into a coil, the induced current makes the near end of the coil a north pole, which repels the magnet; the work done against this repulsion is the energy that appears as electrical energy.";
  const cap2 = "Figure: the induced current opposes the approaching north pole";
  await D.figure(F, "lenz-law-magnet-coil", D.svg(480, 310, s), { alt: alt2, caption: cap2 });
  D.insertAfter(L("induction/lenz-applications"), "## Lenz's law and conservation of energy", D.md("lenz-law-magnet-coil", alt2, cap2));
}

// ---- Magnetism: Fleming's left-hand rule axes; current-balance graph
{
  let b = "";
  const ox = 220, oy = 215;
  b += D.arrow(ox, oy, ox + 160, oy, { stroke: C.blue, width: 4 }) + D.text(ox + 172, oy - 4, "Field (N to S)", { size: 14, fill: C.blue, weight: 600 }) + D.text(ox + 172, oy + 14, "first finger", { size: 13, fill: C.blue });
  b += D.arrow(ox, oy, ox, oy - 150, { stroke: C.red, width: 4 }) + D.text(ox - 6, oy - 160, "Current (second finger)", { size: 14, fill: C.red, weight: 600, anchor: "middle" });
  b += D.arrow(ox, oy, ox + 75, oy - 62, { stroke: C.amber, width: 4 }) + D.text(ox + 84, oy - 66, "Motion / force (thumb):", { size: 14, fill: C.amber, weight: 600 }) + D.text(ox + 84, oy - 48, "into the page", { size: 14, fill: C.amber, weight: 600 });
  b += D.text(280, 20, "Use the LEFT hand: three directions at right angles", { size: 14, weight: 700, anchor: "middle" });
  b += D.text(280, 350, "Force is perpendicular to both field and current. F = BIL when at 90°.", { size: 13, fill: C.muted, anchor: "middle" });
  const alt = "Fleming's left-hand rule: the first finger gives the field direction (north to south), the second finger the conventional current and the thumb the motion or force, all three at right angles; with the field to the right and the current up the force is into the page (drawn up and to the right in this oblique sketch); reversing either the field or the current reverses the force.";
  const cap = "Figure: Fleming's left-hand rule for the motor effect (three mutually perpendicular directions)";
  await D.figure(F, "flemings-left-hand-rule", D.svg(560, 365, b), { alt, caption: cap });
  D.insertAfter(L("magnetism/force-on-conductor"), "## Direction: Fleming's left-hand rule", D.md("flemings-left-hand-rule", alt, cap));

  const a = D.axes({ x: [0, 6], y: [0, 1.8], xTicks: 1, yTicks: 0.3, xLabel: "I / A", yLabel: "Δm / g", w: 520, h: 320, yFormat: (v) => v.toFixed(1) });
  let b2 = a.frame + a.line([[0, 0], [6, 0.304 * 6]], { stroke: C.muted, width: 1.8, dash: true });
  for (const [i, m] of [[1, 0.32], [2, 0.6], [3, 0.92], [4, 1.24], [5, 1.52]]) b2 += a.point(i, m, { stroke: C.blue, r: 5 });
  b2 += a.tag(0.5, 1.7, "straight line through the origin: F ∝ I", { size: 14, anchor: "start", dx: 10 }) + a.tag(3.4, 0.55, "gradient 0.304 g/A = BL/g", { size: 14, anchor: "start", fill: C.blue }) + a.tag(3.4, 0.25, "B = 0.0596 T (L = 5.0 cm)", { size: 14, anchor: "start", fill: C.blue });
  const alt2 = "Current-balance results for a 5.0 cm wire: the change in balance reading rises in proportion to the current (0.32 g at 1.0 A to 1.52 g at 5.0 A), a straight line through the origin of gradient 0.304 g per A, giving B = 0.0596 T.";
  const cap2 = "Figure: current balance, balance change against current (points from the lesson table)";
  await D.figure(F, "current-balance-graph", D.svg(520, 320, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("magnetism/force-on-conductor"), "is a straight line through the origin, showing", D.md("current-balance-graph", alt2, cap2));
}

// ---- Magnetic force on a charge: electron circle; mass spectrometer
{
  const m = 9.11e-31, v = 3.0e7, B = 2.0e-3, e = 1.6e-19, r = (m * v) / (B * e);
  const cx = 300, cy = 175, R = 100;
  let b = "";
  for (let i = 0; i < 9; i += 1) for (let j = 0; j < 6; j += 1) b += D.text(80 + i * 50, 70 + j * 42, "×", { anchor: "middle", size: 16, fill: C.grid });
  b += D.circle(cx, cy, R, { stroke: C.blue, width: 2.4, dash: true }) + D.dot(cx, cy, { r: 3, stroke: C.muted });
  const ex = cx - R, ey = cy;
  b += D.circle(ex, ey, 9, { fill: C.fillAmber, stroke: C.amber }) + D.text(ex, ey + 5, "−", { anchor: "middle", size: 14, weight: 700 });
  b += D.arrow(ex, ey, ex, ey - 55, { stroke: C.amber, width: 3 }) + D.text(ex - 12, ey - 55, "v", { anchor: "end", size: 15, fill: C.amber, weight: 600 });
  b += D.arrow(ex, ey, ex + 55, ey, { stroke: C.red, width: 3 }) + D.text(ex + 62, ey - 8, "F = BQv", { size: 14, fill: C.red, weight: 600 });
  b += D.line(cx, cy, cx + 70, cy + 70, { stroke: C.muted, width: 1.4 }) + D.text(cx + 44, cy + 76, `r = ${f(r * 100, 1)} cm`, { size: 14, fill: C.muted, anchor: "end" });
  b += D.text(10, 22, "Electron at 3.0 × 10⁷ m/s in 2.0 mT, field into the page (×)", { size: 14, weight: 700 });
  b += D.text(10, 338, `r = mv/(BQ) = ${f(r * 100, 1)} cm; force always at right angles to v: speed unchanged, path a circle`, { size: 13, fill: C.muted });
  const alt = `An electron moving at 3.0 × 10⁷ m/s at right angles to a 2.0 mT field into the page: the magnetic force BQv is always perpendicular to the velocity, towards the centre, so the electron moves in a circle of radius mv/(BQ) = ${f(r * 100, 1)} cm at constant speed.`;
  const cap = "Figure: a charged particle moves in a circle in a uniform magnetic field";
  await D.figure(F, "charge-circular-path-b-field", D.svg(560, 350, b), { alt, caption: cap });
  D.insertAfter(L("magnetism/force-on-charge"), "## Circular motion in a uniform field", D.md("charge-circular-path-b-field", alt, cap));

  const u = 1.66e-27, vv = 4.0e5, B2 = 0.5, q = 1.6e-19;
  const r20 = (20 * u * vv) / (q * B2), r22 = (22 * u * vv) / (q * B2), sc = 600; // px per m
  const x0 = 120, y0 = 300;
  let s = "";
  for (let i = 0; i < 12; i += 1) for (let j = 0; j < 5; j += 1) s += D.circle(60 + i * 38, 60 + j * 46, 3, { fill: C.grid, stroke: C.grid });
  s += D.line(30, y0, 470, y0, { stroke: C.ink, width: 3 }) + D.text(470, y0 + 20, "detector / plate", { anchor: "end", size: 13, fill: C.muted });
  for (const [r2, col, lab, dy] of [[r20, C.blue, "neon-20", 0], [r22, C.amber, "neon-22", 0]]) {
    s += D.path_(`M${x0},${y0} A${r2 * sc},${r2 * sc} 0 0 1 ${x0 + 2 * r2 * sc},${y0}`, { stroke: col, width: 3 });
  }
  s += D.arrow(x0, y0 + 40, x0, y0 + 6, { stroke: C.ink, width: 2 }) + D.text(x0 - 8, y0 + 56, "ions enter (slit)", { anchor: "start", size: 13 });
  s += D.text(x0 + r20 * sc, y0 - 24, `neon-20: r = ${f(r20, 3)} m`, { size: 14, fill: C.blue, weight: 600, anchor: "middle" });
  s += D.text(x0 + r22 * sc + 24, y0 - r22 * sc - 10, `neon-22: r = ${f(r22, 3)} m`, { size: 14, fill: C.amber, weight: 600, anchor: "middle" });
  s += D.text(10, 22, "Ions at 4.0 × 10⁵ m/s in 0.50 T (field out of the page, dots)", { size: 14, weight: 700 });
  s += D.text(10, 396 - 6, `Landing points ${f(2 * r22 * 100, 1)} cm and ${f(2 * r20 * 100, 1)} cm from the slit: separation ${f(2 * (r22 - r20) * 100, 1)} cm`, { size: 13, fill: C.muted });
  const alt2 = `Mass spectrometer: neon ions at 4.0 × 10⁵ m/s enter a 0.50 T field and move in semicircles with r = mv/(BQ) proportional to mass; neon-20 has r = ${f(r20, 3)} m and neon-22 r = ${f(r22, 3)} m, so they land ${f(2 * (r22 - r20) * 100, 1)} cm apart.`;
  const cap2 = "Figure: heavier isotopes follow larger semicircles in a mass spectrometer";
  await D.figure(F, "mass-spectrometer-semicircles", D.svg(500, 400, s), { alt: alt2, caption: cap2 });
  D.insertAfter(L("magnetism/force-on-charge"), "## The mass spectrometer", D.md("mass-spectrometer-semicircles", alt2, cap2));
}

// ---- Vectors: 40 kN and 30 kN at 60 degrees
{
  const A = 40, Bm = 30, ang = 60, k = 4.2;
  const ox = 70, oy = 250;
  const ax = ox + A * k, ay = oy, bx = ax + Bm * k * Math.cos(rad(ang)), by = ay - Bm * k * Math.sin(rad(ang));
  const R = Math.sqrt(A * A + Bm * Bm - 2 * A * Bm * Math.cos(rad(180 - ang))), alpha = (Math.atan2(Bm * Math.sin(rad(ang)), A + Bm * Math.cos(rad(ang))) * 180) / Math.PI;
  const cx = ox + Bm * k * Math.cos(rad(ang)), cy = oy - Bm * k * Math.sin(rad(ang));
  let b = D.line(ox, oy, cx, cy, { stroke: C.muted, dash: true, width: 1.4 }) + D.line(cx, cy, bx, by, { stroke: C.muted, dash: true, width: 1.4 });
  b += D.arrow(ox, oy, ax, ay, { stroke: C.blue, width: 3 }) + D.text((ox + ax) / 2, oy + 24, "40 kN", { anchor: "middle", size: 14, fill: C.blue, weight: 600 });
  b += D.arrow(ax, ay, bx, by, { stroke: C.amber, width: 3 }) + D.text((ax + bx) / 2 + 12, (ay + by) / 2 + 6, "30 kN", { size: 14, fill: C.amber, weight: 600 });
  b += D.arrow(ox, oy, bx, by, { stroke: C.red, width: 3.4 }) + D.text((ox + bx) / 2 + 12, (oy + by) / 2 + 40, `R = ${f(R, 1)} kN`, { anchor: "start", size: 14, fill: C.red, weight: 600 });
  b += D.text(ox + 64, oy - 8, `${f(alpha, 1)}°`, { size: 14 }) + D.text(ax - 36, ay - 10, "120°", { size: 13, fill: C.muted });
  b += D.text(10, 22, "Two chains pull a tree at 60° to each other", { size: 14, weight: 700 }) + D.text(10, 310, `tip to tail: R² = 40² + 30² − 2(40)(30)cos 120° = 3700, R = ${f(R, 1)} kN at ${f(alpha, 1)}° to the 40 kN chain`, { size: 13, fill: C.muted });
  const alt = `Vector triangle for two tractor pulls of 40 kN and 30 kN with 60° between the chains: placed tip to tail the resultant closes the triangle, R = ${f(R, 1)} kN at ${f(alpha, 1)}° to the 40 kN chain (angle opposite R is 120°).`;
  const cap = "Figure: adding two forces tip to tail (scale drawing, 1 kN = 4.2 px)";
  await D.figure(F, "vector-triangle-two-pulls", D.svg(560, 330, b), { alt, caption: cap });
  D.insertAfter(L("measurement/scalars-vectors"), "A scale drawing gives the same result", D.md("vector-triangle-two-pulls", alt, cap));
}
