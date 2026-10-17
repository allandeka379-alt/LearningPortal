import { D, fig, place, C, T, ln, dt, poly, arc, rightAngle, polarText, rad } from "./lib2.mjs";

const deg = (r) => (r * 180) / Math.PI;

// ---- Three dimensions: cuboid 8 x 6 x 5, AC and AG, and the flat triangle ACG
{
  const l = 8, wd = 6, hh = 5;
  const s = 22, dd = [wd * s * 0.5 * Math.cos(rad(45)), -wd * s * 0.5 * Math.sin(rad(45))];
  const A = [50, 270], B = [A[0] + l * s, A[1]], Cc = [B[0] + dd[0], B[1] + dd[1]], Dd = [A[0] + dd[0], A[1] + dd[1]];
  const up = [0, -hh * s];
  const add = (p, v) => [p[0] + v[0], p[1] + v[1]];
  const E = add(A, up), F = add(B, up), G = add(Cc, up), H = add(Dd, up);
  let b = "";
  // faces: front, right, top; hidden edges dashed
  b += poly([A, B, F, E], { fill: "none", stroke: C.ink, width: 2 }) + poly([B, Cc, G, F], { fill: "none", stroke: C.ink, width: 2 }) + poly([E, F, G, H], { fill: "none", stroke: C.ink, width: 2 });
  b += ln(A, Dd, { stroke: C.muted, dash: true, width: 1.6 }) + ln(Dd, Cc, { stroke: C.muted, dash: true, width: 1.6 }) + ln(Dd, H, { stroke: C.muted, dash: true, width: 1.6 });
  b += ln(A, Cc, { stroke: C.blue, dash: true, width: 2.4 }) + ln(A, G, { stroke: C.red, width: 2.8 });
  const lab = (p, t, dx, dy) => D.text(p[0] + dx, p[1] + dy, t, { weight: 700, size: 16, anchor: "middle" });
  b += lab(A, "A", -12, 16) + lab(B, "B", 8, 20) + lab(Cc, "C", 16, 6) + lab(Dd, "D", -12, 4) + lab(E, "E", -12, -4) + lab(F, "F", -10, -8) + lab(G, "G", 14, -6) + lab(H, "H", -2, -10);
  b += D.text((A[0] + B[0]) / 2, A[1] + 22, `${l} cm`, { anchor: "middle", size: 14, fill: C.muted }) + D.text(B[0] + 28, (B[1] + Cc[1]) / 2 + 22, `${wd} cm`, { size: 14, fill: C.muted }) + D.text(A[0] - 8, (A[1] + E[1]) / 2 + 5, `${hh} cm`, { anchor: "end", size: 14, fill: C.muted });
  const vAC = [Cc[0] - A[0], Cc[1] - A[1]], vAG = [G[0] - A[0], G[1] - A[1]];
  const a1 = deg(Math.atan2(-vAC[1], vAC[0])), a2 = deg(Math.atan2(-vAG[1], vAG[0]));
  b += arc(A[0], A[1], 70, a1, a2, { stroke: C.amber });
  const AC = Math.hypot(l, wd), AG = Math.sqrt(l * l + wd * wd + hh * hh), th = deg(Math.atan(hh / AC));
  // flat triangle
  const k = 15, P = [345, 270], Q = [P[0] + AC * k, P[1]], R = [Q[0], Q[1] - hh * k];
  b += poly([P, Q, R], { fill: C.fillBlue, stroke: C.blue }) + rightAngle(Q[0], Q[1], 180, 90, 12);
  b += D.text(P[0] - 6, P[1] + 20, "A", { weight: 700, size: 16, anchor: "middle" }) + D.text(Q[0] + 4, Q[1] + 20, "C", { weight: 700, size: 16, anchor: "middle" }) + D.text(R[0] + 4, R[1] - 8, "G", { weight: 700, size: 16, anchor: "middle" });
  b += D.text((P[0] + Q[0]) / 2, P[1] + 22, `AC = ${AC} cm`, { anchor: "middle", size: 14, fill: C.blue }) + D.text(Q[0] + 10, (Q[1] + R[1]) / 2 + 5, `${hh} cm`, { size: 14 });
  b += D.text((P[0] + Q[0]) / 2 - 24, (P[1] + R[1]) / 2 - 14, `AG = ${AG.toFixed(1)} cm`, { anchor: "middle", size: 14, fill: C.red });
  b += arc(P[0], P[1], 54, 0, th, { stroke: C.amber }) + D.text(P[0] + 62, P[1] - 9, `${th.toFixed(1)}°`, { size: 14, fill: C.amber, weight: 700 });
  const alt = `A cuboid with AB = ${l} cm, BC = ${wd} cm and AE = ${hh} cm: the base diagonal AC = ${AC} cm and the space diagonal AG = √125 = ${AG.toFixed(1)} cm are the sides of the right-angled triangle ACG (right angle at C), and the angle between AG and the base is ${th.toFixed(1)}°.`;
  const cap = "Figure: the right-angled triangle ACG inside the cuboid";
  await fig("three-d-cuboid-diagonal-triangle", b, 560, 300, alt, cap);
  place("trigonometry/three-dimensions", ":::worked-solution[Example 2", "three-d-cuboid-diagonal-triangle", alt, cap, { before: true });
}

// ---- Pyramids, cones and spheres: cone r = 6, h = 8, l = 10
{
  const r = 6, h = 8, l = Math.hypot(r, h);
  const s = 20, cx = 180, by = 250, ry = 26;
  const apex = [cx, by - h * s];
  let b = "";
  b += D.path_(`M${cx - r * s},${by} A${r * s},${ry} 0 0 0 ${cx + r * s},${by}`, { stroke: C.ink, width: 2.4 });
  b += D.path_(`M${cx - r * s},${by} A${r * s},${ry} 0 0 1 ${cx + r * s},${by}`, { stroke: C.muted, width: 1.8, dash: true });
  b += ln([cx - r * s, by], apex, { stroke: C.ink, width: 2.4 }) + ln([cx + r * s, by], apex, { stroke: C.ink, width: 2.4 });
  b += ln(apex, [cx, by], { stroke: C.blue, dash: true, width: 2.2 }) + ln([cx, by], [cx + r * s, by], { stroke: C.amber, width: 2.6 }) + ln(apex, [cx + r * s, by], { stroke: C.red, width: 2.8 });
  b += rightAngle(cx, by, 0, 90, 12);
  b += D.text(cx + 8, (apex[1] + by) / 2 + 5, `${h} cm`, { anchor: "start", size: 15, fill: C.blue, weight: 600 }) + D.text(cx + (r * s) / 2, by - 8, `${r} cm`, { anchor: "middle", size: 15, fill: C.amber, weight: 600 }) + D.text(cx + (r * s) / 2 + 24, (apex[1] + by) / 2 - 10, `l = ${l} cm`, { size: 15, fill: C.red, weight: 600 });
  // flat triangle on the right
  const k = 20, P = [400, 250], Q = [P[0] + r * k, P[1]], R = [P[0], P[1] - h * k];
  b += poly([P, Q, R], { fill: C.fillBlue, stroke: C.blue }) + rightAngle(P[0], P[1], 0, 90, 12);
  b += D.text(P[0] + (r * k) / 2, P[1] + 22, `${r}`, { anchor: "middle", size: 15 }) + D.text(P[0] - 8, (P[1] + R[1]) / 2 + 5, `${h}`, { anchor: "end", size: 15 }) + D.text(P[0] + (r * k) / 2 + 14, (P[1] + R[1]) / 2 - 4, `l`, { size: 15, fill: C.red, weight: 700 });
  b += D.text(P[0] - 6, P[1] + 46, `l² = ${r}² + ${h}² = ${r * r + h * h}, l = ${l}`, { size: 14, anchor: "start" });
  const alt = `A cone with radius ${r} cm and vertical height ${h} cm: the radius, height and slant height form a right-angled triangle, so the slant height is l = √(${r}² + ${h}²) = ${l} cm.`;
  const cap = "Figure: the slant height of a cone comes from a right-angled triangle";
  await fig("cone-slant-height-triangle", b, 560, 310, alt, cap);
  place("mensuration/pyramids-cones-spheres", ":::worked-solution[Example 2", "cone-slant-height-triangle", alt, cap, { before: true });
}

// ---- Compound shapes: athletics track (top view) and grain silo (side view)
{
  const L = 100, W = 64, r = W / 2;
  let b = "";
  const s = 2.0, x0 = 76, y0 = 40; // px per metre
  const track = `M${x0},${y0} L${x0 + L * s},${y0} A${r * s},${r * s} 0 0 1 ${x0 + L * s},${y0 + W * s} L${x0},${y0 + W * s} A${r * s},${r * s} 0 0 1 ${x0},${y0} Z`;
  b += D.path_(track, { fill: C.fillGreen, stroke: C.green, width: 2.6 });
  b += D.line(x0, y0, x0, y0 + W * s, { stroke: C.muted, width: 1.4, dash: true }) + D.line(x0 + L * s, y0, x0 + L * s, y0 + W * s, { stroke: C.muted, width: 1.4, dash: true });
  b += D.text(x0 + (L * s) / 2, y0 + (W * s) / 2 + 5, `rectangle ${L} m × ${W} m`, { anchor: "middle", size: 14 }) + D.text(x0 + L * s + 30, y0 + W * s / 2 + 22, `semi-
circle`, { anchor: "middle", size: 13, fill: C.green }) + D.text(x0 - 30, y0 + W * s / 2 + 22, `semi-
circle`, { anchor: "middle", size: 13, fill: C.green });
  b += D.text(x0 + (L * s) / 2, y0 - 10, `${L} m`, { anchor: "middle", size: 14, fill: C.muted }) + D.line(x0 + L * s, y0 + W * s / 2, x0 + L * s + r * s, y0 + W * s / 2, { stroke: C.green, width: 1.8 }) + D.text(x0 + L * s + 32, y0 + W * s / 2 - 6, `r = ${r} m`, { anchor: "middle", size: 13, fill: C.green });
  b += D.text(x0 + (L * s) / 2, y0 + W * s + 20, `perimeter = ${L} + ${L} + π × ${W} ≈ ${(2 * L + Math.PI * W).toFixed(0)} m`, { anchor: "middle", size: 14, weight: 600 });
  // silo
  const rr = 3, hc = 8, hk = 2, k = 14, cx = 450, by = 220, ry = 12;
  const top = by - hc * k, apex = [cx, top - hk * k];
  b += D.path_(`M${cx - rr * k},${by} A${rr * k},${ry} 0 0 0 ${cx + rr * k},${by}`, { stroke: C.ink, width: 2.4 }) + ln([cx - rr * k, by], [cx - rr * k, top], { stroke: C.ink, width: 2.4 }) + ln([cx + rr * k, by], [cx + rr * k, top], { stroke: C.ink, width: 2.4 });
  b += D.path_(`M${cx - rr * k},${top} A${rr * k},${ry} 0 0 0 ${cx + rr * k},${top}`, { stroke: C.muted, width: 1.6, dash: true }) + ln([cx - rr * k, top], apex, { stroke: C.amber, width: 2.4 }) + ln([cx + rr * k, top], apex, { stroke: C.amber, width: 2.4 });
  b += D.text(cx + rr * k + 8, (by + top) / 2 + 5, `${hc} m`, { size: 14, fill: C.muted }) + D.text(cx + rr * k + 8, top - 10, `${hk} m`, { size: 14, fill: C.amber }) + D.text(cx, by + 32, `radius ${rr} m`, { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(cx, 22, "cylinder + cone", { anchor: "middle", size: 14, weight: 600 }) + D.text(cx, by + 50, `V = ${72}π + ${6}π = ${78}π ≈ ${(78 * Math.PI).toFixed(0)} m³`, { anchor: "middle", size: 14, weight: 600 });
  const alt = `Two compound shapes: an athletics track made of a ${L} m by ${W} m rectangle with a semicircle of radius ${r} m on each end (perimeter ${L} + ${L} + π × ${W} ≈ ${(2 * L + Math.PI * W).toFixed(0)} m), and a silo made of a cylinder (radius ${rr} m, height ${hc} m) with a cone of height ${hk} m on top (volume 78π ≈ 245 m³).`;
  const cap = "Figure: split a compound shape into rectangles, circles, cylinders and cones";
  await fig("compound-track-and-silo", b, 560, 300, alt, cap);
  place("mensuration/compound-shapes", ":::worked-solution[Example 3", "compound-track-and-silo", alt, cap, { before: true });
}

// ---- Units of measure: 1 m^2 = 10 000 cm^2
{
  const s = 3.2, x0 = 70, y0 = 30, n = 10;
  let b = D.rect(x0, y0, 100 * s, 100 * s, { fill: C.fillBlue, stroke: C.blue, width: 2.6 });
  for (let i = 1; i < n; i += 1) b += D.line(x0 + i * 10 * s, y0, x0 + i * 10 * s, y0 + 100 * s, { stroke: C.teal, width: 1 }) + D.line(x0, y0 + i * 10 * s, x0 + 100 * s, y0 + i * 10 * s, { stroke: C.teal, width: 1 });
  b += D.text(x0 + 50 * s, y0 - 10, "1 m = 100 cm", { anchor: "middle", size: 15, weight: 700, fill: C.blue }) + D.text(x0 - 10, y0 + 50 * s, "1 m = 100 cm", { anchor: "middle", size: 15, weight: 700, fill: C.blue, rotate: -90 });
  b += D.rect(x0, y0 + 90 * s, 10 * s, 10 * s, { fill: C.fillAmber, stroke: C.amber, width: 2 }).replace("", "");
  const tx = x0 + 100 * s + 24;
  b += D.text(tx, y0 + 30, "Each small square\nis 10 cm by 10 cm", { size: 14 }) + D.text(tx, y0 + 90, "= 100 cm²", { size: 15, weight: 700, fill: C.amber });
  b += D.text(tx, y0 + 140, "10 × 10 = 100 small\nsquares", { size: 14 }) + D.text(tx, y0 + 200, "1 m² = 100 × 100\n= 10 000 cm²", { size: 15, weight: 700, fill: C.blue });
  const w = 560, h = 30 + 100 * s + 20;
  const alt = "A square of side 1 m, which is also 100 cm: it splits into 10 × 10 = 100 squares of 10 cm by 10 cm (100 cm² each), so 1 m² = 100 × 100 = 10 000 cm²; area units convert with the length factor squared.";
  const cap = "Figure: 1 m² is 10 000 cm², because the length factor 100 is squared";
  await fig("units-square-metre-in-cm2", b, w, h, alt, cap);
  place("mensuration/units-of-measure", "## Area units: square the factor", "units-square-metre-in-cm2", alt, cap);
}
