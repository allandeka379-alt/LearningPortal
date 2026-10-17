import { D, fig, place, C, T, ln, dt, poly, arc, rightAngle, polarText, rad } from "./lib2.mjs";

function eq(xr, yr, s, o = {}) {
  const pad = { l: 40, r: 20, t: 26, b: 44, ...(o.pad ?? {}) };
  const w = pad.l + pad.r + (xr[1] - xr[0]) * s, h = pad.t + pad.b + (yr[1] - yr[0]) * s;
  return D.axes({ x: xr, y: yr, w, h, pad, xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", ...o });
}

// ---- Congruent triangles: why SSA fails (AB = 7, angle B = 35 degrees, AC = 5)
{
  const AB = 7, AC = 5, ang = 35;
  const disc = Math.sqrt(AC ** 2 - (AB * Math.sin(rad(ang))) ** 2);
  const t1 = AB * Math.cos(rad(ang)) - disc, t2 = AB * Math.cos(rad(ang)) + disc;
  const s = 34, B = [40, 250];
  const dir = [Math.cos(rad(ang)), -Math.sin(rad(ang))];
  const A = [B[0] + AB * s, B[1]];
  const C1 = [B[0] + t1 * s * dir[0], B[1] + t1 * s * dir[1]], C2 = [B[0] + t2 * s * dir[0], B[1] + t2 * s * dir[1]];
  let b = "";
  b += ln(B, [B[0] + 9.6 * s * dir[0], B[1] + 9.6 * s * dir[1]], { stroke: C.muted, width: 1.8 }) + ln(B, A, { stroke: C.ink, width: 2.6 });
  // arc of radius AC centred on A (dashed), drawn over the useful part
  const a1 = 180 - ang - 38, a2 = 180 - ang + 55;
  const pa = (a) => [A[0] + AC * s * Math.cos(rad(a)), A[1] - AC * s * Math.sin(rad(a))];
  b += D.path_(`M${pa(95)[0].toFixed(1)},${pa(95)[1].toFixed(1)} A${AC * s},${AC * s} 0 0 0 ${pa(180 - 10)[0].toFixed(1)},${pa(180 - 10)[1].toFixed(1)}`, { stroke: C.muted, dash: true, width: 1.6 }).replace("", "");
  b += poly([B, A, C1], { fill: "none", stroke: C.blue, width: 2.8 }) + poly([B, A, C2], { fill: "none", stroke: C.amber, width: 2.8 });
  b += dt(C1, { stroke: C.blue }) + dt(C2, { stroke: C.amber }) + dt(A) + dt(B);
  b += D.text(B[0] - 14, B[1] + 6, "B", { anchor: "end", weight: 700, size: 17 }) + D.text(A[0] + 10, A[1] + 6, "A", { weight: 700, size: 17 }) + D.text(C1[0] - 4, C1[1] - 14, "C", { anchor: "end", weight: 700, size: 15, fill: C.blue }) + D.text(C2[0] + 12, C2[1] + 4, "C′", { weight: 700, size: 15, fill: C.amber });
  b += D.text((B[0] + A[0]) / 2, B[1] + 24, `AB = ${AB} cm`, { anchor: "middle", size: 14 });
  b += D.text(B[0] + 54, B[1] - 6, `${ang}°`, { size: 14, weight: 700, fill: C.green });
  b += D.path_(`M${B[0] + 44},${B[1]} A44,44 0 0 0 ${(B[0] + 44 * Math.cos(rad(ang))).toFixed(1)},${(B[1] - 44 * Math.sin(rad(ang))).toFixed(1)}`, { stroke: C.green, width: 1.8 });
  b += D.text(C1[0] + 60, C1[1] - 26 + 40, `BC = ${t1.toFixed(1)} cm`, { size: 14, fill: C.blue, weight: 600 }).replace("", "");
  b += D.text(330, 70, `AC = ${AC} cm in both triangles`, { size: 14, weight: 700 }) + D.text(330, 96, `BC = ${t1.toFixed(1)} cm (blue) or`, { size: 14, fill: C.blue, weight: 600 }) + D.text(330, 116, `BC = ${t2.toFixed(1)} cm (amber)`, { size: 14, fill: C.amber, weight: 600 });
  const alt = `Why SSA does not prove congruence: with AB = ${AB} cm, angle B = ${ang}° and AC = ${AC} cm, an arc of radius ${AC} cm centred on A cuts the line from B twice, giving two different triangles with BC = ${t1.toFixed(1)} cm and BC = ${t2.toFixed(1)} cm.`;
  const cap = "Figure: two different triangles fit the same two sides and a non-included angle";
  await fig("congruent-ssa-two-triangles", b, 560, 290, alt, cap);
  place("geometry/congruent-triangles", "The RHS condition is the exception that works", "congruent-ssa-two-triangles", alt, cap);
}

// ---- Scale drawings: classroom 12 m x 8 m at 1 : 200
{
  const Lm = 12, Wm = 8, cmPer = 2; // 1 cm on the plan represents 2 m
  const Lc = Lm / cmPer, Wc = Wm / cmPer; // 6 cm by 4 cm
  const s = 40, x0 = 70, y0 = 50; // px per plan cm
  const dPlan = Math.hypot(Lc, Wc), dReal = dPlan * cmPer;
  let b = D.rect(x0, y0, Lc * s, Wc * s, { fill: C.fillBlue, stroke: C.blue, width: 3 });
  // cm ticks along the bottom and left
  for (let i = 0; i <= Lc; i += 1) b += D.line(x0 + i * s, y0 + Wc * s, x0 + i * s, y0 + Wc * s + 8, { stroke: C.muted, width: 1.4 }) + D.text(x0 + i * s, y0 + Wc * s + 24, String(i), { anchor: "middle", size: 12, fill: C.muted }).replace("", "");
  b += D.text(x0 + (Lc * s) / 2, y0 + Wc * s + 44, "plan length in cm", { anchor: "middle", size: 13, fill: C.muted });
  b += ln([x0, y0 + Wc * s], [x0 + Lc * s, y0], { stroke: C.red, dash: true, width: 2.4 });
  b += D.text(x0 + (Lc * s) / 2, y0 - 12, `${Lc} cm on the plan = ${Lm} m`, { anchor: "middle", size: 15, weight: 700, fill: C.blue });
  b += D.text(x0 + Lc * s + 14, y0 + (Wc * s) / 2 - 6, `${Wc} cm`, { size: 15, weight: 700, fill: C.blue }) + D.text(x0 + Lc * s + 14, y0 + (Wc * s) / 2 + 14, `= ${Wm} m`, { size: 15, weight: 700, fill: C.blue });
  b += D.text(x0 + 12, y0 + 24, `scale 1 : 200`, { size: 14, weight: 700 }) + D.text(x0 + 12, y0 + 44, `1 cm = ${cmPer} m`, { size: 14 });
  b += D.text(x0 + Lc * s - 12, y0 + Wc * s - 36, `diagonal ${dPlan.toFixed(1)} cm`, { size: 14, fill: C.red, weight: 700, anchor: "end" }) + D.text(x0 + Lc * s - 12, y0 + Wc * s - 16, `× ${cmPer} m = ${dReal.toFixed(1)} m`, { size: 14, fill: C.red, anchor: "end" });
  const w = 440, h = y0 + Wc * s + 56;
  const alt = `A classroom 12 m by 8 m drawn at scale 1 : 200, so 1 cm represents 2 m: the plan is a rectangle ${Lc} cm by ${Wc} cm and its diagonal measures about ${dPlan.toFixed(1)} cm, which is about ${dReal.toFixed(1)} m in the real room.`;
  const cap = "Figure: every length on the plan is divided by 200; angles do not change";
  await fig("scale-drawing-classroom-1-200", b, w, h, alt, cap);
  place("geometry/scale-drawings", ":::example{title=\"Planning a classroom drawing\"}", "scale-drawing-classroom-1-200", alt, cap, { before: true });
}

// ---- Terms: types of angle
{
  const defs = [
    { name: "acute", a: 40, rng: "between 0° and 90°" },
    { name: "right", a: 90, rng: "exactly 90°" },
    { name: "obtuse", a: 130, rng: "between 90° and 180°" },
    { name: "straight", a: 180, rng: "exactly 180°" },
    { name: "reflex", a: 250, rng: "between 180° and 360°" },
  ];
  const pw = 112, vy = 90, L = 50;
  let b = "";
  defs.forEach((d, i) => {
    const vx = i * pw + 28;
    const p2 = [vx + L * Math.cos(rad(d.a)), vy - L * Math.sin(rad(d.a))];
    b += ln([vx, vy], [vx + L, vy], { stroke: C.ink, width: 2.6 }) + ln([vx, vy], p2, { stroke: C.ink, width: 2.6 });
    if (d.a === 90) b += rightAngle(vx, vy, 0, 90, 14);
    else b += arc(vx, vy, 24, 0, d.a, { stroke: C.amber, width: 2.4 });
    b += dt([vx, vy], { r: 3 });
    b += D.text(vx + 36, vy + 62, d.name, { anchor: "middle", size: 15, weight: 700, fill: C.blue }) + D.text(vx + 36, vy + 80, `${d.a}°`, { anchor: "middle", size: 14, fill: C.amber, weight: 700 });
  });
  const w = 560, h = 190;
  const alt = "Five angle types drawn with their sizes: acute 40°, right 90°, obtuse 130°, straight 180° and reflex 250°, showing acute below 90°, obtuse between 90° and 180°, and reflex between 180° and 360°.";
  const cap = "Figure: acute, right, obtuse, straight and reflex angles";
  await fig("angle-types-acute-to-reflex", b, w, h, alt, cap);
  place("geometry/terms-and-vocabulary", "## Types of angle", "angle-types-acute-to-reflex", alt, cap);
}

// ---- Stretches and shears
{
  const s = 28;
  const a1 = eq([0, 7], [0, 3], s, { pad: { b: 72 } });
  const sq = [[1, 1], [2, 1], [2, 2], [1, 2]], img = [[3, 1], [6, 1], [6, 2], [3, 2]];
  const P = (ax, pts) => pts.map(([x, y]) => [ax.X(x), ax.Y(y)]);
  let s1 = a1.frame + D.polyline(P(a1, img), { close: true, fill: C.fillAmber, stroke: C.amber, width: 2.4 }) + D.polyline(P(a1, sq), { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.4 });
  s1 += a1.arrow(2, 1.5, 6, 1.5, { stroke: C.muted, width: 1.4 }).replace("", "") + a1.label(1.5, 1.5, "S", { anchor: "middle", dy: 5, weight: 700, fill: C.blue }) + a1.label(4.5, 1.5, "S′", { anchor: "middle", dy: 5, weight: 700, fill: C.amber });
  s1 += D.text(a1.X(3.5), a1.Y(0) + 60, "stretch, factor 3, y-axis invariant", { anchor: "middle", size: 13, weight: 600 });
  const a2 = eq([0, 8], [0, 3], s, { pad: { b: 72 } });
  const rect = [[0, 0], [3, 0], [3, 2], [0, 2]], sh = [[0, 0], [3, 0], [7, 2], [4, 2]];
  let s2 = a2.frame + D.polyline(P(a2, sh), { close: true, fill: C.fillAmber, stroke: C.amber, width: 2.4 }) + D.polyline(P(a2, rect), { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.4 });
  s2 += a2.label(1.5, 1.0, "OABC", { anchor: "middle", dy: 5, weight: 700, fill: C.blue, size: 13 }) + a2.label(4.5, 1.0, "image", { anchor: "middle", dy: 5, weight: 700, fill: C.amber, size: 13 });
  s2 += a2.arrow(3, 2.1, 6.9, 2.1, { stroke: C.muted, width: 1.4 }).replace("", "");
  s2 += D.text(a2.X(4), a2.Y(0) + 60, "shear, factor 2, x-axis invariant", { anchor: "middle", size: 13, weight: 600 });
  const w = 560;
  const h = Math.max(a1.h, a2.h) + 14;
  const b = D.group(s1, { translate: [0, 0] }) + D.group(s2, { translate: [a1.w + 6, 0] });
  const alt = "Left: the unit-sized square with corners (1, 1) to (2, 2) is stretched with factor 3 and the y-axis invariant, giving the rectangle from (3, 1) to (6, 2) whose area is 3 times larger. Right: rectangle OABC with B(3, 2) is sheared with factor 2 and the x-axis invariant, giving a parallelogram with B′(7, 2) and C′(4, 2) and the same area, 6.";
  const cap = "Figure: a stretch changes area by its factor; a shear keeps the area";
  await fig("stretch-and-shear-examples", b, Math.ceil(a1.w + a2.w + 6), h, alt, cap);
  place("transformations/stretches-and-shears", ":::worked-solution[Example 3", "stretch-and-shear-examples", alt, cap, { before: true });
}

// ---- Magnitude of a vector: the ranger's walk
{
  const O = [0, 0], Pp = [3, 4], Q = [-2, 6];
  const ax = eq([-3, 5], [-1, 7], 38, { pad: { l: 44, r: 20, t: 30, b: 50 } });
  let b = ax.frame;
  b += ax.arrow(...O, ...Pp, { stroke: C.blue, width: 3 }) + ax.arrow(...Pp, ...Q, { stroke: C.amber, width: 3 }) + ax.arrow(...O, ...Q, { stroke: C.red, width: 3, dash: true });
  for (const p of [O, Pp, Q]) b += ax.point(...p, { stroke: C.ink });
  b += ax.tag(0, 0, "camp O", { dx: -10, dy: 24, size: 13, anchor: "end" }) + ax.tag(3, 4, "P(3, 4)", { dx: 10, dy: 2, size: 13 }) + ax.tag(-2, 6, "Q(−2, 6)", { dx: 10, dy: -2, size: 13 });
  b += ax.tag(1.7, 1.6, "(3, 4): 5 km", { fill: C.blue, size: 13, dx: 8 }) + ax.tag(0.4, 5.5, "(−5, 2): 5.39 km", { fill: C.amber, size: 13, dx: 8, dy: -14 }) + ax.tag(-2.9, 2.8, "(−2, 6): 6.32 km", { fill: C.red, size: 13, dx: 0 });
  const alt = "The ranger's walk from camp O: first (3, 4) km, a distance of 5 km to P, then (−5, 2) km, 5.39 km to Q; her total displacement is (−2, 6) km, so she is √40 = 6.32 km from camp although she walked 10.4 km.";
  const cap = "Figure: the magnitude of the total displacement is shorter than the distance walked";
  await fig("vector-magnitude-ranger-walk", b, ax.w, ax.h, alt, cap);
  place("vectors/magnitude-of-a-vector", ":::worked-solution[Example 6", "vector-magnitude-ranger-walk", alt, cap, { before: true });
}
