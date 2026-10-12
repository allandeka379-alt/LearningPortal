// Angle properties, polygons, circle theorems, bearings.
import { D, fig, put, putBefore, arc, polarText, rightAngle, rad } from "./lib.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
const cp = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });
/** vertex label pushed away from a centre */
const vl = (p, c, s, d = 16) => {
  const vx = p[0] - c[0], vy = p[1] - c[1], L = Math.hypot(vx, vy) || 1;
  return D.text(p[0] + (vx / L) * d, p[1] + (vy / L) * d + 5, s, { anchor: "middle", weight: 700, size: 16 });
};
/** small arrowhead marks for parallel lines */
const par = (x, y) => D.polyline([[x - 6, y - 7], [x + 2, y], [x - 6, y + 7]], { width: 1.8 });

// 1. Parallel lines: PXY = 64, XYS = 64 (alternate), XYR = 116 (co-interior)
{
  const X = [300, 100], Y = [300 + 150 * Math.cos(rad(244)), 100 - 150 * Math.sin(rad(244))];
  const yy = Y[1];
  let b = ln([30, X[1]], [540, X[1]]) + ln([30, yy], [540, yy]) + par(480, X[1]) + par(480, yy);
  const dir = [Math.cos(rad(64)), -Math.sin(rad(64))];
  // transversal extended both ways
  const ext = (p, k) => [p[0] + dir[0] * k, p[1] + dir[1] * k];
  b += ln(ext(X, 60), ext(Y, -60), { stroke: C.blue });
  b += dt(X, { stroke: C.blue }) + dt(Y, { stroke: C.blue });
  b += T(X[0] + 14, X[1] - 12, "X", { weight: 700, size: 16 }) + T(Y[0] - 16, Y[1] + 22, "Y", { weight: 700, size: 16 });
  b += T(18, X[1] + 5, "P", { weight: 700, size: 16 }) + T(552, X[1] + 5, "Q", { weight: 700, size: 16 }) + T(18, yy + 5, "R", { weight: 700, size: 16 }) + T(552, yy + 5, "S", { weight: 700, size: 16 });
  b += arc(X[0], X[1], 34, 180, 244) + polarText(X[0], X[1], 54, 212, "64°", { fill: C.amber, weight: 700 });
  b += arc(Y[0], Y[1], 34, 0, 64) + polarText(Y[0], Y[1], 56, 28, "64°", { fill: C.amber, weight: 700 });
  b += arc(Y[0], Y[1], 26, 64, 180, { stroke: C.red }) + polarText(Y[0], Y[1], 46, 125, "116°", { fill: C.red, weight: 700 });
  b += T(300, 322, "Alternate angles: 64° and 64°.  Co-interior angles: 64° + 116° = 180°.", { size: 14, fill: C.muted });
  const alt = "Two parallel lines PQ and RS cut by a transversal XY: angle PXY is 64°, the alternate angle XYS is also 64°, and the co-interior angle XYR is 116°, so 64° + 116° = 180°.";
  await fig("angles-parallel-transversal", b, 560, 340, alt, "Figure: alternate angles are equal; co-interior angles add up to 180°");
  put("geometry/angle-properties", "The facts also work backwards", "angles-parallel-transversal", alt, "Figure: alternate angles are equal; co-interior angles add up to 180°");
}

// 2. Polygons: hexagon split into 4 triangles; exterior angles
{
  const W = 600, H = 300;
  const hex = (cx, cy, r) => [0, 1, 2, 3, 4, 5].map((i) => cp(cx, cy, r, 90 + 60 * i));
  const L = hex(150, 150, 105), R = hex(450, 150, 80);
  let b = D.polyline(L, { close: true, width: 2.4, fill: C.fillBlue });
  for (const k of [2, 3, 4]) b += ln(L[0], L[k], { stroke: C.amber, width: 2 });
  b += T(150, 262, "4 triangles: 4 × 180° = 720°", { weight: 700, fill: C.blue }) + T(150, 284, "each interior angle 720° ÷ 6 = 120°", { size: 14, fill: C.muted });
  b += T(L[0][0], L[0][1] + 30, "120°", { size: 13, fill: C.blue });
  b += D.polyline(R, { close: true, width: 2.4 });
  // extend each side in the walking direction (anticlockwise order): extension beyond vertex i+1
  for (let i = 0; i < 6; i += 1) {
    const a = R[i], c = R[(i + 1) % 6];
    const d = [c[0] - a[0], c[1] - a[1]], n = Math.hypot(...d);
    const e = [c[0] + (d[0] / n) * 34, c[1] + (d[1] / n) * 34];
    b += ln(c, e, { stroke: C.amber, width: 2 });
    const ang = (Math.atan2(-d[1], d[0]) * 180) / Math.PI;
    b += arc(c[0], c[1], 20, ang, ang + 60, { stroke: C.red, width: 1.8 });
  }
  const c1 = R[1], d1 = [R[1][0] - R[0][0], R[1][1] - R[0][1]];
  b += T(450, 262, "exterior angles: 6 × 60° = 360°", { weight: 700, fill: C.blue }) + T(450, 284, "each interior angle 180° − 60° = 120°", { size: 14, fill: C.muted });
  b += T(R[1][0] - 50, R[1][1] + 16, "60°", { size: 13, fill: C.red, weight: 700 });
  const alt = "Left: a hexagon split from one vertex into 4 triangles, so its interior angles add up to 4 × 180° = 720°, and each angle of a regular hexagon is 120°. Right: a regular hexagon with each side extended, giving six exterior angles of 60° that add up to 360°.";
  await fig("polygon-hexagon-angle-sums", b, W, H, alt, "Figure: interior angle sum from triangles, and exterior angles that total 360°");
  put("geometry/polygons", "Imagine walking all the way round a polygon", "polygon-hexagon-angle-sums", alt, "Figure: interior angle sum from triangles, and exterior angles that total 360°");
}

// 3a. Circle theorem: angle at the centre (130, 65, 115)
{
  const O = [280, 200], R = 150;
  const A = cp(...O, R, 155), B = cp(...O, R, 25), Cc = cp(...O, R, 270), Dd = cp(...O, R, 90);
  let b = D.circle(O[0], O[1], R, { width: 2.4 });
  b += ln(O, A, { stroke: C.muted, width: 2 }) + ln(O, B, { stroke: C.muted, width: 2 });
  b += ln(A, Cc, { stroke: C.blue }) + ln(B, Cc, { stroke: C.blue }) + ln(A, Dd, { stroke: C.amber }) + ln(B, Dd, { stroke: C.amber });
  b += dt(O) + [A, B, Cc, Dd].map((p) => dt(p)).join("");
  b += T(O[0] + 6, O[1] + 20, "O", { weight: 700, size: 16 }) + vl(A, O, "A") + vl(B, O, "B") + vl(Cc, O, "C") + vl(Dd, O, "D");
  b += arc(O[0], O[1], 38, 25, 155, { stroke: C.red }) + T(O[0], O[1] - 52, "130°", { fill: C.red, weight: 700 });
  b += T(Cc[0], Cc[1] - 30, "65°", { fill: C.blue, weight: 700 }) + T(Dd[0], Dd[1] + 42, "115°", { fill: C.amber, weight: 700 });
  b += T(280, 398, "Centre 130°; C on the major arc 65° (half); D on the minor arc 115°; 65° + 115° = 180°.", { size: 13, fill: C.muted });
  const alt = "A circle with centre O and chord AB: angle AOB at the centre is 130°; angle ACB at the circumference on the major arc is half of it, 65°; angle ADB on the minor arc is 115°, and 65° + 115° = 180° because ACBD is a cyclic quadrilateral.";
  await fig("circle-angle-at-centre", b, 560, 415, alt, "Figure: the angle at the centre is twice the angle at the circumference");
  putBefore("geometry/circle-theorems", ":::worked-solution[Example 4", "circle-angle-at-centre", alt, "Figure: the angle at the centre is twice the angle at the circumference");
}

// 3b. Semicircle and tangent panels
{
  let b = "";
  { // semicircle, centre (150,170) R 110
    const O = [150, 170], R = 110;
    const A = cp(...O, R, 180), B = cp(...O, R, 0), Cc = cp(...O, R, 68);
    b += D.circle(O[0], O[1], R, { width: 2.4 }) + ln(A, B) + ln(A, Cc, { stroke: C.blue }) + ln(B, Cc, { stroke: C.blue });
    b += dt(O) + dt(A) + dt(B) + dt(Cc) + T(O[0], O[1] + 22, "O", { weight: 700, size: 15 });
    b += vl(A, O, "A") + vl(B, O, "B") + vl(Cc, O, "C");
    const cc = Cc;
    const ca = (Math.atan2(-(A[1] - cc[1]), A[0] - cc[0]) * 180) / Math.PI, cb = (Math.atan2(-(B[1] - cc[1]), B[0] - cc[0]) * 180) / Math.PI;
    b += rightAngle(cc[0], cc[1], ca, cb, 14);
    b += T(A[0] + 56, A[1] - 8, "34°", { fill: C.amber, weight: 700, size: 14 }) + T(B[0] - 50, B[1] - 8, "56°", { fill: C.red, weight: 700, size: 14 }) + T(cc[0] + 4, cc[1] + 52, "90°", { fill: C.blue, weight: 700, size: 14 });
    b += T(150, 340, "Angle in a semicircle = 90°", { weight: 700, fill: C.blue }) + T(150, 362, "180° − 90° − 34° = 56°", { size: 14, fill: C.muted });
  }
  { // tangent, centre (400,250)
    const O = [400, 230], R = 80, Tp = [O[0] + R, O[1]];
    const P = [Tp[0], Tp[1] - R * Math.tan(rad(58))];
    b += D.circle(O[0], O[1], R, { width: 2.4 }) + ln([Tp[0], 60], [Tp[0], O[1] + 70], { stroke: C.blue });
    b += ln(O, Tp, { stroke: C.muted }) + ln(O, P, { stroke: C.amber });
    b += dt(O) + dt(Tp) + dt(P);
    b += T(O[0] - 12, O[1] + 22, "O", { weight: 700, size: 15 }) + T(Tp[0] + 16, Tp[1] + 18, "T", { weight: 700, size: 16 }) + T(P[0] + 16, P[1] + 4, "P", { weight: 700, size: 16 });
    b += rightAngle(Tp[0], Tp[1], 180, 90, 13);
    b += arc(O[0], O[1], 34, 0, 58, { stroke: C.red }) + T(O[0] + 52, O[1] - 18, "58°", { fill: C.red, weight: 700, size: 14 });
    b += T(Tp[0] - 24, P[1] + 62, "32°", { fill: C.amber, weight: 700, size: 14 });
    b += T(400, 340, "Tangent ⟂ radius at T", { weight: 700, fill: C.blue }) + T(400, 362, "180° − 90° − 58° = 32°", { size: 14, fill: C.muted });
  }
  const alt = "Left: AB is a diameter and C is on the circle, so angle ACB is 90°; with angle CAB 34°, angle ABC is 56°. Right: the tangent at T meets the radius OT at 90°; with angle TOP 58°, angle OPT is 32°.";
  await fig("circle-semicircle-and-tangent", b, 560, 375, alt, "Figure: the angle in a semicircle and the tangent-radius angle are both 90°");
  putBefore("geometry/circle-theorems", ":::worked-solution[Example 3", "circle-semicircle-and-tangent", alt, "Figure: the angle in a semicircle and the tangent-radius angle are both 90°");
}
console.log("geometry1 done");
