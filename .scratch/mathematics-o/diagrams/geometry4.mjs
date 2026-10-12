// Vectors, loci, constructions, area formulas.
import { D, fig, put, putBefore, arc, rightAngle, rad } from "./lib.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });
const g = (body, x, y) => D.group(body, { translate: [x, y] });

// ---- Vectors: parallelogram PQRS (Example 5)
{
  const ax = D.axes({ x: [-1, 8], y: [-1, 7], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 540, h: 420 });
  const P = [1, 1], Q = [5, 2], R = [6, 5], S = [2, 4];
  const shade = D.polyline([P, Q, R, S].map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill: C.fillBlue, stroke: "none" });
  let b = ax.frame + shade;
  b += ax.arrow(...P, ...Q, { stroke: C.blue, width: 2.8 }) + ax.arrow(...S, ...R, { stroke: C.blue, width: 2.8 }) + ax.arrow(...P, ...S, { stroke: C.amber, width: 2.8 }) + ax.arrow(...Q, ...R, { stroke: C.amber, width: 2.8 });
  for (const [p, n, dx, dy] of [[P, "P(1, 1)", -70, 22], [Q, "Q(5, 2)", 10, 24], [R, "R(6, 5)", 10, -6], [S, "S(2, 4)", -70, -6]]) b += ax.point(...p, { stroke: C.ink, r: 4 }) + ax.tag(...p, n, { dx, dy });
  b += ax.label(3, 1.1, "(4, 1)", { anchor: "middle", dy: 22, fill: C.blue, weight: 700 }).replace("", "") + ax.label(4, 4.7, "(4, 1)", { anchor: "middle", dy: -4, fill: C.blue, weight: 700 });
  b += ax.label(1.2, 2.5, "(1, 3)", { anchor: "end", dx: -6, fill: C.amber, weight: 700 }) + ax.label(5.6, 3.5, "(1, 3)", { dx: 14, fill: C.amber, weight: 700 });
  const alt = "Parallelogram PQRS with P(1, 1), Q(5, 2), R(6, 5) and S(2, 4): the opposite sides PQ and SR are equal vectors (4, 1) and PS and QR are equal vectors (1, 3), so S is found by moving (4, 1) back from R.";
  await fig("vectors-parallelogram-pqrs", b, 540, 420, alt, "Figure: opposite sides of a parallelogram are equal vectors");
  putBefore("vectors/vectors-in-two-dimensions", ":::worked-solution[Example 5", "vectors-parallelogram-pqrs", alt, "Figure: opposite sides of a parallelogram are equal vectors");
}
// ---- Vector geometry: triangle OAB, midpoint M, P with AP:PB = 1:2
{
  const O = [90, 320], A = [450, 320], B = [250, 70];
  const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], P = [A[0] + (B[0] - A[0]) / 3, A[1] + (B[1] - A[1]) / 3];
  let b = ln(A, B, { stroke: C.muted, width: 2 });
  b += D.arrow(O[0], O[1], A[0] - 4, A[1], { stroke: C.blue, width: 3 }) + D.arrow(O[0], O[1], B[0] - 2, B[1] + 3, { stroke: C.amber, width: 3 });
  b += ln(O, M, { stroke: C.muted, dash: true, width: 1.6 }) + ln(O, P, { stroke: C.muted, dash: true, width: 1.6 });
  b += [O, A, B, M, P].map((p) => dt(p)).join("");
  b += T(O[0] - 14, O[1] + 20, "O", { weight: 700, size: 16 }) + T(A[0] + 14, A[1] + 20, "A", { weight: 700, size: 16 }) + T(B[0], B[1] - 12, "B", { weight: 700, size: 16 });
  b += D.text(M[0] + 10, M[1] - 6, "M (midpoint)", { weight: 700, anchor: "start" }) + D.text(P[0] + 10, P[1] + 4, "P (AP : PB = 1 : 2)", { weight: 700, anchor: "start" });
  b += T((O[0] + A[0]) / 2, O[1] + 26, "OA = a", { fill: C.blue, weight: 700 }) + D.text(O[0] + 70, O[1] - 150, "OB = b", { fill: C.amber, weight: 700, anchor: "middle", rotate: -57 });
  b += D.text(20, 40, "AB = b − a", { fill: C.muted, weight: 700, anchor: "start" }) + D.text(20, 62, "OM = ½a + ½b", { fill: C.muted, weight: 700, anchor: "start" }) + D.text(20, 84, "OP = ⅔a + ⅓b", { fill: C.muted, weight: 700, anchor: "start" });
  const alt = "Triangle OAB with OA = a and OB = b: AB = b − a, the midpoint M of AB has OM = ½a + ½b, and the point P with AP : PB = 1 : 2 has OP = ⅔a + ⅓b.";
  await fig("vector-geometry-midpoint-ratio", b, 560, 360, alt, "Figure: routes from O to the midpoint M and to the point P that divides AB in the ratio 1 : 2");
  putBefore("vectors/vector-geometry", "## Dividing a line in a ratio", "vector-geometry-midpoint-ratio", alt, "Figure: routes from O to the midpoint M and to the point P that divides AB in the ratio 1 : 2");
}
// ---- Four standard loci
{
  const pw = 280, ph = 225;
  let b = "";
  { // 1 circle
    let p = D.circle(135, 95, 62, { stroke: C.blue, width: 2.6, fill: C.fillBlue }) + dt([135, 95], { fill: C.ink }) + ln([135, 95], [135 + 62, 95], { stroke: C.amber, width: 2.2 });
    p += T(135 - 12, 95 + 18, "P", { weight: 700, size: 16 }) + T(135 + 32, 88, "r", { fill: C.amber, weight: 700 }) + T(135, 195, "1. Fixed distance from a point", { weight: 700, size: 14 }) + T(135, 214, "a circle", { size: 13, fill: C.muted });
    b += g(p, 0, 0);
  }
  { // 2 stadium around segment AB (2 cm either side, segment 6 cm: 20 px per cm)
    const A = [70, 95], B = [190, 95], d = 40;
    let p = D.path_(`M${A[0]},${A[1] - d} L${B[0]},${B[1] - d} A${d},${d} 0 0 1 ${B[0]},${B[1] + d} L${A[0]},${A[1] + d} A${d},${d} 0 0 1 ${A[0]},${A[1] - d} Z`, { stroke: C.blue, width: 2.6, fill: C.fillBlue });
    p += ln(A, B, { width: 3 }) + dt(A) + dt(B) + T(A[0] - 10, A[1] - 8, "A", { weight: 700, size: 16 }) + T(B[0] + 12, B[1] - 8, "B", { weight: 700, size: 16 });
    p += T(140, 195, "2. Fixed distance from a line", { weight: 700, size: 14 }) + T(140, 214, "parallel lines and two semicircles", { size: 13, fill: C.muted });
    b += g(p, pw, 0);
  }
  { // 3 perpendicular bisector
    const A = [50, 100], B = [230, 100];
    let p = ln([140, 25], [140, 175], { stroke: C.blue, width: 2.8 }) + ln(A, B, { width: 2.2 }) + dt(A) + dt(B) + rightAngle(140, 100, 90, 180, 12);
    p += T(A[0], A[1] + 24, "A", { weight: 700, size: 16 }) + T(B[0], B[1] + 24, "B", { weight: 700, size: 16 });
    for (const [x1, x2] of [[95, 95], [185, 185]]) p += ln([x1, 94], [x2, 106], { width: 2 });
    p += T(140, 195, "3. Equidistant from two points", { weight: 700, size: 14 }) + T(140, 214, "the perpendicular bisector of AB", { size: 13, fill: C.muted });
    b += g(p, 0, ph);
  }
  { // 4 angle bisector
    const O = [40, 160];
    const e = (a, r) => [O[0] + r * Math.cos(rad(a)), O[1] - r * Math.sin(rad(a))];
    let p = ln(O, e(10, 200), { width: 2.2 }) + ln(O, e(70, 140), { width: 2.2 }) + ln(O, e(40, 200), { stroke: C.blue, width: 2.8 }) + dt(O);
    p += arc(O[0], O[1], 70, 10, 40, { stroke: C.amber, width: 1.8 }) + arc(O[0], O[1], 84, 40, 70, { stroke: C.amber, width: 1.8 });
    p += T(O[0] - 10, O[1] + 18, "O", { weight: 700, size: 16 }) + T(e(10, 215)[0], e(10, 215)[1] + 5, "X", { weight: 700, size: 16 }) + T(e(70, 155)[0], e(70, 155)[1], "Y", { weight: 700, size: 16 });
    p += T(140, 195, "4. Equidistant from two lines", { weight: 700, size: 14 }) + T(140, 214, "the angle bisector (equal angles)", { size: 13, fill: C.muted });
    b += g(p, pw, ph);
  }
  const alt = "The four standard loci: a circle for a fixed distance from a point; two parallel lines joined by semicircles for a fixed distance from a line segment; the perpendicular bisector for points equidistant from two points A and B; and the angle bisector for points equidistant from two lines meeting at O.";
  await fig("loci-four-standard", b, 560, 450, alt, "Figure: the four standard loci");
  put("geometry/loci", "## The four standard loci", "loci-four-standard", alt, "Figure: the four standard loci");
}
// ---- Loci: garden ABCD with the tap T
{
  const k = 36, A = [60, 270], B = [A[0] + 8 * k, 270], Cc = [B[0], 270 - 6 * k], Dd = [A[0], Cc[1]], Tt = [A[0] + 4 * k, 270 - 3 * k];
  let b = D.polyline([A, B, Cc, Dd], { close: true, fill: C.fillGreen, width: 2.6 }) + ln([A[0] + 4 * k, 270], [A[0] + 4 * k, Cc[1]], { stroke: C.blue, dash: true, width: 2.4 }) + arc(A[0], A[1], 5 * k, 0, 90, { stroke: C.amber, width: 2.6 });
  b += dt(Tt, { fill: C.red, stroke: C.red }) + T(Tt[0] + 16, Tt[1] - 8, "T", { fill: C.red, weight: 700, size: 17 }) + T(A[0] + 4 * k, 312, "T is 4 m from AD and 3 m from AB (the centre of the garden)", { fill: C.red, size: 14, weight: 700 }) + [A, B, Cc, Dd].map((p) => dt(p)).join("");
  b += T(A[0] - 14, A[1] + 20, "A", { weight: 700, size: 16 }) + T(B[0] + 14, B[1] + 20, "B", { weight: 700, size: 16 }) + T(Cc[0] + 14, Cc[1] - 6, "C", { weight: 700, size: 16 }) + T(Dd[0] - 14, Dd[1] - 6, "D", { weight: 700, size: 16 });
  b += D.text(A[0] + 4 * k + 8, Cc[1] + 24, "equidistant\nfrom A and B", { fill: C.blue, size: 13, anchor: "start" }) + D.text(A[0] + 40, A[1] - 120, "5 m from A", { fill: C.amber, size: 13, anchor: "start", weight: 700 });
  b += T(A[0] + 2 * k, A[1] + 24, "8 m", { fill: C.muted }) + D.text(B[0] + 10, A[1] - 3 * k, "6 m", { fill: C.muted, anchor: "start" });
  const alt = "Rectangular garden ABCD with AB = 8 m and BC = 6 m: the dashed perpendicular bisector of AB meets the quarter-circle of radius 5 m centred on A at the tap T, which is 4 m from AD and 3 m from AB, the centre of the garden.";
  await fig("loci-garden-tap", b, 520, 330, alt, "Figure: two loci cross at the tap T");
  putBefore("geometry/loci", ":::worked-solution[Example 3", "loci-garden-tap", alt, "Figure: two loci cross at the tap T");
}
// ---- Constructions: triangle from three sides (8, 6, 7)
{
  const k = 40, A = [50, 300], B = [A[0] + 8 * k, 300];
  const cx = (49 + 64 - 36) / 16, cy = Math.sqrt(49 - cx * cx), Cc = [A[0] + cx * k, 300 - cy * k];
  const aA = (Math.atan2(cy, cx) * 180) / Math.PI, aB = 180 - (Math.atan2(cy, 8 - cx) * 180) / Math.PI;
  let b = arc(A[0], A[1], 7 * k, aA - 12, aA + 14, { stroke: C.amber, width: 1.8 }) + arc(B[0], B[1], 6 * k, aB - 14, aB + 12, { stroke: C.blue, width: 1.8 });
  b += D.polyline([A, B, Cc], { close: true, width: 2.8 }) + [A, B, Cc].map((p) => dt(p)).join("");
  b += T(A[0] - 12, A[1] + 20, "A", { weight: 700, size: 16 }) + T(B[0] + 12, B[1] + 20, "B", { weight: 700, size: 16 }) + T(Cc[0], Cc[1] - 14, "C", { weight: 700, size: 16 });
  b += T((A[0] + B[0]) / 2, A[1] + 26, "AB = 8 cm", { weight: 700 }) + D.text(A[0] + 20, A[1] - 150, "AC = 7 cm", { weight: 700, fill: C.amber, anchor: "middle", rotate: -aA });
  b += D.text(B[0] - 70, B[1] - 150, "BC = 6 cm", { weight: 700, fill: C.blue, anchor: "middle", rotate: 180 - aB });
  b += T(Cc[0] - 60, Cc[1] - 40, "arc from A, radius 7 cm", { size: 12, fill: C.amber }) + D.text(Cc[0] + 36, Cc[1] - 40, "arc from B, radius 6 cm", { size: 12, fill: C.blue, anchor: "start" });
  const alt = "Constructing triangle ABC from three sides: draw AB = 8 cm, then an arc of radius 7 cm from A and an arc of radius 6 cm from B; where the arcs cross is vertex C, and the construction arcs are left showing.";
  await fig("construct-triangle-three-sides", b, 520, 335, alt, "Figure: two arcs fix the third vertex of a triangle");
  put("geometry/constructions", "A triangle is only possible if the two shorter sides", "construct-triangle-three-sides", alt, "Figure: two arcs fix the third vertex of a triangle");
}
// ---- Constructions: perpendicular bisector
{
  const A = [90, 190], B = [410, 190], r = 190, mx = 250, h = Math.sqrt(r * r - 160 * 160);
  const a = (Math.atan2(h, 160) * 180) / Math.PI;
  let b = arc(A[0], A[1], r, a - 14, a + 14, { stroke: C.amber, width: 1.8 }) + arc(A[0], A[1], r, -a - 14, -a + 14, { stroke: C.amber, width: 1.8 }) + arc(B[0], B[1], r, 180 - a - 14, 180 - a + 14, { stroke: C.blue, width: 1.8 }) + arc(B[0], B[1], r, 180 + a - 14, 180 + a + 14, { stroke: C.blue, width: 1.8 });
  b += ln(A, B, { width: 3 }) + ln([mx, 190 - h - 30], [mx, 190 + h + 30], { stroke: C.red, width: 2.6 }) + rightAngle(mx, 190, 90, 0, 12);
  b += dt(A) + dt(B) + dt([mx, 190 - h]) + dt([mx, 190 + h]) + dt([mx, 190]);
  b += T(A[0], A[1] + 22, "A", { weight: 700, size: 16 }) + T(B[0], B[1] + 22, "B", { weight: 700, size: 16 }) + D.text(mx + 10, 190 - h - 6, "P", { weight: 700, size: 16 }) + D.text(mx + 10, 190 + h + 18, "Q", { weight: 700, size: 16 }) + D.text(mx + 10, 190 + 18, "M", { weight: 700, size: 16 });
  b += T(250, 345, "Same radius from A and from B (more than half of AB); join P and Q.", { size: 14, fill: C.muted });
  const alt = "Constructing the perpendicular bisector of AB: arcs of the same radius, more than half of AB, are drawn from A and from B above and below the line; joining the crossing points P and Q gives a line through the midpoint M at a right angle to AB.";
  await fig("construct-perpendicular-bisector", b, 500, 360, alt, "Figure: the perpendicular bisector of a line segment AB");
  putBefore("geometry/constructions", ":::example{title=\"The bisector of an angle ABC\"}", "construct-perpendicular-bisector", alt, "Figure: the perpendicular bisector of a line segment AB");
}
// ---- Area formulas (panels)
{
  const pw = 280, ph = 215;
  let b = "";
  { // rectangle 12.5 x 8, scale 14
    const k = 14, x0 = 50, y0 = 25;
    let p = D.rect(x0, y0, 12.5 * k, 8 * k, { fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + T(x0 + 6.25 * k, y0 + 8 * k + 20, "12.5 m", { fill: C.muted }) + D.text(x0 + 12.5 * k + 8, y0 + 4 * k + 5, "8 m", { fill: C.muted });
    p += T(140, 178, "Rectangle", { weight: 700, size: 14 }) + T(140, 198, "A = 12.5 × 8 = 100 m²", { size: 13, fill: C.blue, weight: 700 });
    b += g(p, 0, 0);
  }
  { // triangle base 9, height 6, scale 17
    const k = 17, x0 = 60, y0 = 25, base = 9 * k, h = 6 * k, apex = [x0 + 3 * k, y0];
    let p = D.polyline([[x0, y0 + h], [x0 + base, y0 + h], apex], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + ln(apex, [apex[0], y0 + h], { stroke: C.red, dash: true, width: 1.8 }) + rightAngle(apex[0], y0 + h, 90, 0, 11);
    p += T(x0 + base / 2, y0 + h + 20, "9 cm", { fill: C.muted }) + D.text(apex[0] + 8, y0 + h / 2 + 5, "6 cm", { fill: C.red });
    p += T(140, 178, "Triangle", { weight: 700, size: 14 }) + T(140, 198, "A = ½ × 9 × 6 = 27 cm²", { size: 13, fill: C.blue, weight: 700 });
    b += g(p, pw, 0);
  }
  { // parallelogram 14, 6 slant, h 5, scale 12
    const k = 12, x0 = 56, y0 = 35, shift = Math.sqrt(36 - 25) * k, base = 14 * k, h = 5 * k;
    let p = D.polyline([[x0, y0 + h], [x0 + base, y0 + h], [x0 + base + shift, y0], [x0 + shift, y0]], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + ln([x0 + shift, y0], [x0 + shift, y0 + h], { stroke: C.red, dash: true, width: 1.8 }) + rightAngle(x0 + shift, y0 + h, 90, 0, 11);
    p += T(x0 + base / 2, y0 + h + 20, "14 cm", { fill: C.muted }) + D.text(x0 + shift + 6, y0 + h / 2 + 5, "5 cm", { fill: C.red, size: 14 }) + D.text(x0 + 4, y0 + h / 2 - 14, "6 cm", { fill: C.muted, size: 14, anchor: "end" });
    p += T(140, 178, "Parallelogram", { weight: 700, size: 14 }) + T(140, 198, "A = 14 × 5 = 70 cm²", { size: 13, fill: C.blue, weight: 700 });
    b += g(p, 0, ph);
  }
  { // trapezium 7, 11, h 4, scale 16
    const k = 16, x0 = 45, y0 = 30, top = 7 * k, bot = 11 * k, h = 4 * k, off = (bot - top) / 2;
    let p = D.polyline([[x0, y0 + h], [x0 + bot, y0 + h], [x0 + off + top, y0], [x0 + off, y0]], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + ln([x0 + off + 12, y0], [x0 + off + 12, y0 + h], { stroke: C.red, dash: true, width: 1.8 });
    p += T(x0 + bot / 2, y0 - 8, "7 m", { fill: C.muted }) + T(x0 + bot / 2, y0 + h + 20, "11 m", { fill: C.muted }) + D.text(x0 + off + 18, y0 + h / 2 + 5, "4 m", { fill: C.red, size: 14 });
    p += T(140, 178, "Trapezium", { weight: 700, size: 14 }) + T(140, 198, "A = ½(7 + 11) × 4 = 36 m²", { size: 13, fill: C.blue, weight: 700 });
    b += g(p, pw, ph);
  }
  const alt = "The four area formulas with the lesson's values: rectangle 12.5 m by 8 m has area 100 m²; triangle with base 9 cm and perpendicular height 6 cm has area 27 cm²; parallelogram with base 14 cm and perpendicular height 5 cm has area 70 cm²; trapezium with parallel sides 7 m and 11 m, 4 m apart, has area 36 m². Marked heights are perpendicular to the base, not the sloping sides.";
  await fig("mensuration-area-formulas", b, 560, 430, alt, "Figure: use the perpendicular height, not the sloping side");
  put("mensuration/area-and-perimeter", "A parallelogram can be cut and rearranged", "mensuration-area-formulas", alt, "Figure: use the perpendicular height, not the sloping side");
}
console.log("geometry4 done");
