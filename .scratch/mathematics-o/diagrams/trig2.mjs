import { D, fig, place, C, T, ln, dt, poly, arc, rightAngle, polarText, rad } from "./lib2.mjs";

const pt = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];

// ---- Obtuse angles: sin x = 0.6 has two answers between 0 and 180 degrees
{
  const w = 520, h = 300, cx = 260, cy = 250, R = 190;
  const x1 = Math.asin(0.6) * 180 / Math.PI, x2 = 180 - x1;
  let b = "";
  b += D.path_(`M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy}`, { stroke: C.blue, width: 2.6 });
  b += D.line(cx - R - 20, cy, cx + R + 24, cy, { stroke: C.axis, width: 1.6, arrow: true }) + D.line(cx, cy, cx, cy - R - 24, { stroke: C.axis, width: 1.6, arrow: true });
  b += D.text(cx + R + 24, cy - 10, "x-axis", { anchor: "end", size: 13, fill: C.muted }) + D.text(cx + 8, cy - R - 20, "y-axis", { size: 13, fill: C.muted });
  const P1 = pt(cx, cy, R, x1), P2 = pt(cx, cy, R, x2);
  b += D.line(P2[0] - 6, P1[1], P1[0] + 6, P1[1], { stroke: C.amber, width: 2, dash: true });
  b += ln([cx, cy], P1, { stroke: C.blue }) + ln([cx, cy], P2, { stroke: C.blue });
  b += D.line(P1[0], P1[1], P1[0], cy, { stroke: C.muted, width: 1.4, dash: true }) + D.line(P2[0], P2[1], P2[0], cy, { stroke: C.muted, width: 1.4, dash: true });
  b += arc(cx, cy, 52, 0, x1, { stroke: C.amber }) + arc(cx, cy, 34, 0, x2, { stroke: C.green });
  b += polarText(cx, cy, 72, x1 / 2 - 3, `${x1.toFixed(1)}°`, { fill: C.amber, weight: 700, size: 14 }).replace("", "");
  b += D.text(cx - 90, cy - 6, `${x2.toFixed(1)}°`, { anchor: "middle", fill: C.green, weight: 700, size: 14 }).replace("", "");
  b += dt(P1, { stroke: C.red }) + dt(P2, { stroke: C.red });
  b += D.tag(P1[0] + 10, P1[1] - 8, "(0.8, 0.6)", { size: 13 }) + D.tag(P2[0] - 10, P2[1] - 8, "(−0.8, 0.6)", { size: 13, anchor: "end" });
  b += D.tag(cx + 8, P1[1] - 40, "height 0.6", { size: 13, fill: C.amber }).replace("", "");
  b += D.text(cx - R, cy + 20, "−1", { anchor: "middle", size: 13, fill: C.muted }) + D.text(cx + R, cy + 20, "1", { anchor: "middle", size: 13, fill: C.muted }) + D.text(cx + 8, cy - R + 20, "1", { size: 13, fill: C.muted });
  const alt = `Unit circle (upper half): the horizontal line at height 0.6 meets the circle at two points, at ${x1.toFixed(1)}° and at 180° − ${x1.toFixed(1)}° = ${x2.toFixed(1)}°, so sin x = 0.6 has two solutions between 0° and 180°.`;
  const cap = "Figure: a positive sine value gives an acute angle and its supplement";
  await fig("obtuse-unit-circle-sin-0-6", b, w, h, alt, cap);
  place("trigonometry/obtuse-angles", "## Equations with two answers", "obtuse-unit-circle-sin-0-6", alt, cap);
}

// ---- Sine and cosine rules: triangle ABC from Example 2 (b = 7, c = 10, A = 115 degrees)
{
  const bL = 7, cL = 10, A = 115;
  const a = Math.sqrt(bL ** 2 + cL ** 2 - 2 * bL * cL * Math.cos(rad(A)));
  const sB = (bL * Math.sin(rad(A))) / a;
  const Bd = Math.asin(sB) * 180 / Math.PI, Cd = 180 - A - Bd;
  const s = 28; // px per cm
  const Ap = [120, 50];
  // A at left-top; AB along the positive x direction, AC at angle 115 measured anticlockwise (drawn downwards by flipping y)
  const B = [Ap[0] + cL * s, Ap[1]];
  const Cc = [Ap[0] + bL * s * Math.cos(rad(A)), Ap[1] + bL * s * Math.sin(rad(A))];
  let b = poly([Ap, B, Cc], { fill: C.fillBlue, stroke: C.blue });
  b += D.text(Ap[0] - 8, Ap[1] - 10, "A", { anchor: "end", weight: 700, size: 17 }) + D.text(B[0] + 10, B[1] - 6, "B", { weight: 700, size: 17 }) + D.text(Cc[0] + 12, Cc[1] + 8, "C", { weight: 700, size: 17 });
  b += D.path_(`M${Ap[0] + 34},${Ap[1]} A34,34 0 0 1 ${(Ap[0] + 34 * Math.cos(rad(A))).toFixed(1)},${(Ap[1] + 34 * Math.sin(rad(A))).toFixed(1)}`, { stroke: C.amber });
  b += D.text(Ap[0] + 4, Ap[1] + 62, `${A}°`, { size: 14, fill: C.amber, weight: 700 });
  b += D.tag((Ap[0] + B[0]) / 2 + 10, Ap[1] - 6, `c = ${cL} cm`, { anchor: "middle", size: 14, fill: C.blue }).replace("", "");
  b += D.tag(Ap[0] + (Cc[0] - Ap[0]) / 2 + 12, Ap[1] + (Cc[1] - Ap[1]) / 2 + 12, `b = ${bL} cm`, { anchor: "start", size: 14 });
  b += D.tag((B[0] + Cc[0]) / 2 + 40, (B[1] + Cc[1]) / 2 + 24, `a = ${a.toFixed(1)} cm`, { anchor: "middle", size: 14, fill: C.red });
  const w = 460, h = 290;
  const alt = `Triangle ABC with the standard labelling: sides b = ${bL} cm and c = ${cL} cm enclose angle A = ${A}°, so the cosine rule gives the opposite side a = ${a.toFixed(1)} cm (the longest side, opposite the obtuse angle); the other angles are ${Bd.toFixed(1)}° and ${Cd.toFixed(1)}°.`;
  const cap = "Figure: side a lies opposite angle A; two sides and the angle between them fix the triangle";
  await fig("cosine-rule-triangle-example", b, w, h, alt, cap);
  place("trigonometry/sine-and-cosine-rules", ":::worked-solution[Example 2", "cosine-rule-triangle-example", alt, cap, { before: true });
}

// ---- Exact values: the two special triangles
{
  const w = 560, h = 260;
  let b = "";
  // 45-45-90 with legs 1
  const u = 120, o1 = [50, 210];
  const A1 = o1, B1 = [o1[0] + u, o1[1]], C1 = [o1[0], o1[1] - u];
  b += poly([A1, B1, C1], { fill: C.fillBlue, stroke: C.blue }) + rightAngle(A1[0], A1[1], 0, 90, 14);
  b += D.text(A1[0] + u / 2, A1[1] + 24, "1", { anchor: "middle", weight: 700 }) + D.text(A1[0] - 14, A1[1] - u / 2 + 5, "1", { anchor: "end", weight: 700 }) + D.text(A1[0] + u / 2 + 18, A1[1] - u / 2 - 6, "√2", { anchor: "middle", weight: 700, fill: C.red });
  b += D.text(B1[0] - 38, B1[1] - 6, "45°", { size: 14, fill: C.amber, weight: 700 }) + D.text(C1[0] + 8, C1[1] + 34, "45°", { size: 14, fill: C.amber, weight: 700 });
  // 30-60-90: hypotenuse 2, short side 1, height sqrt(3)
  const k = 100, o2 = [330, 210];
  const A2 = o2, B2 = [o2[0] + k, o2[1]], C2 = [o2[0], o2[1] - Math.sqrt(3) * k];
  b += poly([A2, B2, C2], { fill: C.fillAmber, stroke: C.amber }) + rightAngle(A2[0], A2[1], 0, 90, 14);
  b += D.text(A2[0] + k / 2, A2[1] + 24, "1", { anchor: "middle", weight: 700 }) + D.text(A2[0] - 14, A2[1] - (Math.sqrt(3) * k) / 2 + 5, "√3", { anchor: "end", weight: 700, fill: C.red }) + D.text(A2[0] + k / 2 + 20, A2[1] - (Math.sqrt(3) * k) / 2 - 4, "2", { anchor: "middle", weight: 700 });
  b += D.text(B2[0] - 44, B2[1] - 8, "60°", { size: 14, fill: C.blue, weight: 700 }) + D.text(C2[0] + 8, C2[1] + 44, "30°", { size: 14, fill: C.blue, weight: 700 });
  const alt = "The two special triangles for exact trigonometric values: a right-angled isosceles triangle with legs 1 and hypotenuse √2 (angles 45°), and half an equilateral triangle with sides 1, √3 and 2 (angles 30° and 60°).";
  const cap = "Figure: the 45° triangle and the 30°–60° triangle give the exact values";
  await fig("exact-values-special-triangles", b, w, h, alt, cap);
  place("trigonometry/exact-values", "## Where the values come from", "exact-values-special-triangles", alt, cap);
}

// ---- Elevation and depression: viewing platform, 110 m, 38 degrees
{
  const H = 110, ang = 38, d = H / Math.tan(rad(ang));
  const w = 560, h = 300, s = 1.9; // px per... scale: d=140.8 -> 267px ; H=110 -> 209px
  const sc = 1.7;
  const base = 262, x0 = 70;
  const P = [x0, base - H * sc], F = [x0, base], R = [x0 + d * sc, base];
  let b = D.rect(x0 - 60, P[1], 60, H * sc, { fill: C.fillGrey, stroke: C.muted });
  b += D.line(x0 - 60, base, w - 20, base, { stroke: C.blue, width: 3 });
  b += D.text(w - 24, base + 22, "river level", { anchor: "end", size: 13, fill: C.blue });
  b += D.line(P[0], P[1], R[0] + 60, P[1], { stroke: C.muted, width: 1.6, dash: true }) + D.line(R[0], R[1], R[0] + 60, R[1], { stroke: C.muted, width: 1.6, dash: true }).replace("", "");
  b += D.line(P[0], P[1], F[0], F[1], { stroke: C.ink, width: 2 }) + D.line(F[0], F[1], R[0], R[1], { stroke: C.ink, width: 2 }) + D.line(P[0], P[1], R[0], R[1], { stroke: C.red, width: 2.6 });
  b += rightAngle(F[0], F[1], 0, 90, 14);
  // depression at P (below horizontal, toward R) and elevation at R (above the river towards P)
  b += D.path_(`M${P[0] + 62},${P[1]} A62,62 0 0 1 ${(P[0] + 62 * Math.cos(rad(ang))).toFixed(1)},${(P[1] + 62 * Math.sin(rad(ang))).toFixed(1)}`, { stroke: C.amber });
  b += D.text(P[0] + 72, P[1] + 22, `${ang}°`, { fill: C.amber, weight: 700, size: 14 }) + D.text(P[0] + 74, P[1] - 10, "angle of depression", { size: 13, fill: C.amber });
  b += D.path_(`M${R[0] - 62},${R[1]} A62,62 0 0 1 ${(R[0] - 62 * Math.cos(rad(ang))).toFixed(1)},${(R[1] - 62 * Math.sin(rad(ang))).toFixed(1)}`, { stroke: C.green });
  b += D.text(R[0] - 98, R[1] - 12, `${ang}°`, { fill: C.green, weight: 700, size: 14 }).replace("", "") + D.text(R[0] + 10, R[1] - 50, "angle of elevation", { size: 13, fill: C.green });
  b += D.text(x0 - 30, P[1] - 8, "platform", { anchor: "middle", size: 13, fill: C.muted }) + D.text(F[0] - 30, (P[1] + F[1]) / 2, `${H} m`, { anchor: "middle", weight: 700 });
  b += D.tag(x0 + 6 + 36, base + 24, `d = ${H} ÷ tan ${ang}° = ${Math.round(d)} m`, { anchor: "start", size: 14 }).replace("", "");
  b += D.dot(R[0], R[1] - 2, { r: 5, stroke: C.ink }) + D.text(R[0] + 8, R[1] - 10, "raft", { size: 13, fill: C.muted });
  const alt = `A viewing platform ${H} m above a river: the angle of depression of the raft from the platform is ${ang}°, equal to the angle of elevation of the platform from the raft (alternate angles), so the raft is ${H} ÷ tan ${ang}° = ${Math.round(d)} m from the foot of the cliff.`;
  const cap = "Figure: angle of depression at the top equals angle of elevation at the bottom";
  await fig("elevation-depression-platform-raft", b, w, h, alt, cap);
  place("trigonometry/elevation-and-depression", "This means you can always put the angle", "elevation-depression-platform-raft", alt, cap, { before: false });
}
