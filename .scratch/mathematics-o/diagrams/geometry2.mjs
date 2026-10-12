// Bearings, Pythagoras, right-angled trigonometry, similarity, transformations, enlargement.
import { D, fig, put, putBefore, arc, polarText, rightAngle, rad } from "./lib.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
const cp = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });
const deg = (a, b) => (Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180) / Math.PI;

// ---------------------------------------------------------------- bearings
{ // Farai: 5 km east then 8 km north
  const k = 25, A = [130, 330], Cc = [A[0] + 5 * k, A[1]], B = [Cc[0], A[1] - 8 * k];
  const th = (Math.atan2(5, 8) * 180) / Math.PI; // 32.0
  let b = ln(A, Cc, { stroke: C.muted }) + ln(Cc, B, { stroke: C.muted }) + ln(A, B, { stroke: C.blue, width: 3 });
  b += D.arrow(A[0], A[1], A[0], A[1] - 120, { stroke: C.ink, width: 1.8 }) + D.arrow(B[0], B[1], B[0], B[1] - 60, { stroke: C.ink, width: 1.8 });
  b += T(A[0], A[1] - 128, "N", { weight: 700 }) + T(B[0], B[1] - 68, "N", { weight: 700 });
  b += rightAngle(Cc[0], Cc[1], 180, 90, 14) + dt(A) + dt(B) + dt(Cc);
  b += T(A[0] - 16, A[1] + 18, "A", { weight: 700, size: 16 }) + T(B[0] + 16, B[1] + 6, "B", { weight: 700, size: 16 }) + T(Cc[0] + 14, Cc[1] + 18, "C", { weight: 700, size: 16 });
  b += T((A[0] + Cc[0]) / 2, A[1] + 22, "5 km east", { fill: C.muted }) + D.text(Cc[0] + 10, (B[1] + A[1]) / 2, "8 km north", { fill: C.muted });
  b += D.text(A[0] + 44, A[1] - 114, "AB = 9.43 km", { fill: C.blue, weight: 700, anchor: "middle", rotate: -58 });
  b += arc(A[0], A[1], 62, 90 - th, 90, { stroke: C.amber }) + D.text(A[0] - 8, A[1] - 72, "032°", { fill: C.amber, weight: 700, anchor: "end" });
  b += arc(B[0], B[1], 40, 90, -122, { stroke: C.red });
  b += T(B[0] + 66, B[1] + 36, "212°", { fill: C.red, weight: 700 });
  b += D.text(300, 270, "Bearing of B from A = 032°", { size: 14, fill: C.amber, weight: 700 }) + D.text(300, 292, "Bearing of A from B = 212°", { size: 14, fill: C.red, weight: 700 });
  const alt = "Farai walks 5 km due east from A to C, then 8 km due north to B: AB is 9.43 km, the bearing of B from A is 032° (tan θ = 5/8), and the back bearing of A from B is 212°, measured clockwise from the north line at B.";
  await fig("bearings-walk-east-north", b, 560, 380, alt, "Figure: bearings are measured clockwise from the north line at the starting point");
  put("geometry/bearings", "Always start with a **sketch**", "bearings-walk-east-north", alt, "Figure: bearings are measured clockwise from the north line at the starting point");
}
{ // compass rose with three-figure bearings
  const O = [240, 235], R = 150;
  const names = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  let b = D.circle(O[0], O[1], R, { stroke: C.grid, width: 2 }) + D.circle(O[0], O[1], 6, { fill: C.ink });
  names.forEach((nm, i) => {
    const bearing = i * 45, a = 90 - bearing;
    const p = cp(O[0], O[1], R, a), q = cp(O[0], O[1], R + 26, a), r = cp(O[0], O[1], R + 52, a);
    b += ln(O, p, { stroke: i % 2 ? C.muted : C.blue, width: i % 2 ? 1.6 : 2.6, arrow: false });
    b += T(q[0], q[1] + 5, nm, { weight: 700, size: 16 }) + T(r[0], r[1] + 5, String(bearing).padStart(3, "0") + "°", { size: 13, fill: C.amber, weight: 700 });
  });
  b += arc(O[0], O[1], 60, 90, 0, { stroke: C.amber, arrow: false }) + T(O[0] + 52, O[1] - 66, "clockwise", { size: 12, fill: C.muted });
  const alt = "A compass with the eight directions and their three-figure bearings, all measured clockwise from north: north 000°, north-east 045°, east 090°, south-east 135°, south 180°, south-west 225°, west 270° and north-west 315°.";
  await fig("bearings-compass-rose", b, 480, 470, alt, "Figure: three-figure bearings run clockwise from north through 360°");
  put("geometry/bearings", "## Three-figure bearings", "bearings-compass-rose", alt, "Figure: three-figure bearings run clockwise from north through 360°");
}

// ---------------------------------------------------------------- Pythagoras
{ // 3-4-5 squares
  const s = 26, ox = 70, C0 = [200 + ox, 200], A = [C0[0], C0[1] - 3 * s], B = [C0[0] + 4 * s, C0[1]];
  const v = [78, -104]; // hypotenuse outward
  let b = D.polyline([C0, B, [B[0], B[1] + 4 * s], [C0[0], C0[1] + 4 * s]], { close: true, fill: C.fillBlue, width: 2 });
  b += D.polyline([C0, A, [A[0] - 3 * s, A[1]], [C0[0] - 3 * s, C0[1]]], { close: true, fill: C.fillAmber, width: 2 });
  b += D.polyline([A, B, [B[0] + v[0], B[1] + v[1]], [A[0] + v[0], A[1] + v[1]]], { close: true, fill: C.fillGreen, width: 2 });
  b += D.polyline([C0, A, B], { close: true, width: 3, stroke: C.ink }) + rightAngle(C0[0], C0[1], 90, 0, 14);
  b += T(C0[0] + 2 * s, C0[1] + 2 * s - 4, "4² = 16", { weight: 700 }) + T(C0[0] - 1.5 * s, C0[1] - 1.5 * s + 5, "3² = 9", { weight: 700 });
  b += T((A[0] + B[0] + v[0]) / 2 + 0, (A[1] + B[1] + 2 * v[1]) / 2 + 5, "5² = 25", { weight: 700 });
  b += T(C0[0] + 2 * s, C0[1] - 8, "4", { fill: C.muted }) + T(C0[0] + 14, C0[1] - 1.5 * s, "3", { fill: C.muted }) + T((A[0] + B[0]) / 2 + 18, (A[1] + B[1]) / 2 - 2, "5", { fill: C.muted });
  b += T(280, 328, "9 + 16 = 25, so the square on the hypotenuse equals the other two squares together.", { size: 13, fill: C.muted });
  const alt = "A right-angled triangle with sides 3, 4 and 5 and a square drawn on each side: the squares have areas 9, 16 and 25, and 9 + 16 = 25, which is Pythagoras' theorem.";
  await fig("pythagoras-squares-3-4-5", b, 560, 345, alt, "Figure: the squares on the two shorter sides add up to the square on the hypotenuse");
  put("trigonometry/pythagoras-theorem", "## Pythagorean triples", "pythagoras-squares-3-4-5", alt, "Figure: the squares on the two shorter sides add up to the square on the hypotenuse");
}
{ // ladder
  const k = 40, foot = [100 + 2.5 * k, 300], top = [100, 300 - 6 * k];
  let b = D.rect(60, top[1] - 20, 40, 6 * k + 20, { fill: C.fillGrey, stroke: C.axis, width: 2 }) + ln([60, 300], [420, 300], { stroke: C.axis });
  b += ln(foot, top, { stroke: C.amber, width: 4 }) + ln([100, 300], top, { stroke: C.muted, dash: true, width: 1.6 }) + ln([100, 300], foot, { stroke: C.muted, dash: true, width: 1.6 });
  b += rightAngle(100, 300, 0, 90, 14);
  b += T(180, 322, "2.5 m", { fill: C.muted }) + D.text(110, 270, "h = 6 m", { fill: C.blue, weight: 700 }) + D.text(188, 180, "6.5 m ladder", { fill: C.amber, weight: 700, rotate: 0, anchor: "start" });
  b += T(80, top[1] - 28, "wall", { fill: C.muted, size: 13 }) + T(380, 322, "ground", { fill: C.muted, size: 13 });
  const alt = "A 6.5 m ladder leans against a vertical wall with its foot 2.5 m from the wall on level ground: the right-angled triangle gives h² = 6.5² − 2.5² = 36, so the ladder reaches 6 m up the wall.";
  await fig("pythagoras-ladder", b, 460, 345, alt, "Figure: the ladder is the hypotenuse of a right-angled triangle");
  putBefore("trigonometry/pythagoras-theorem", ":::worked-solution[Example 2", "pythagoras-ladder", alt, "Figure: the ladder is the hypotenuse of a right-angled triangle");
}
console.log("geometry2 done");
