// Right-angled trigonometry, similarity, transformations, enlargement.
import { D, fig, put, putBefore, arc, rightAngle, rad } from "./lib.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });

// ---- SOH CAH TOA triangle (Example 1: H = 12, angle 35 deg)
{
  const P = [60, 270], th = 35, s = 24, H = 12 * s;
  const Q = [P[0] + H * Math.cos(rad(th)), P[1]], R = [Q[0], P[1] - H * Math.sin(rad(th))];
  let b = D.polyline([P, Q, R], { close: true, width: 3, fill: C.fillBlue }) + rightAngle(Q[0], Q[1], 180, 90, 14);
  b += arc(P[0], P[1], 46, 0, th, { stroke: C.amber }) + D.text(P[0] + 52, P[1] - 8, "35°", { fill: C.amber, weight: 700 });
  b += D.text((P[0] + R[0]) / 2 - 12, (P[1] + R[1]) / 2 - 14, "H  hypotenuse = 12 cm", { anchor: "middle", rotate: -th, weight: 700, fill: C.blue });
  b += T((P[0] + Q[0]) / 2, P[1] + 24, "A  adjacent to the 35° angle", { weight: 700, fill: C.blue });
  b += D.text(Q[0] + 12, (Q[1] + R[1]) / 2 - 8, "O  opposite", { weight: 700, fill: C.blue }) + D.text(Q[0] + 12, (Q[1] + R[1]) / 2 + 12, "the 35° angle", { weight: 700, fill: C.blue }) + D.text(Q[0] + 12, (Q[1] + R[1]) / 2 + 32, "x = 12 sin 35°", { weight: 700, fill: C.red }) + D.text(Q[0] + 12, (Q[1] + R[1]) / 2 + 52, "= 6.88 cm", { weight: 700, fill: C.red });
  b += T(280, 322, "sin = O ÷ H      cos = A ÷ H      tan = O ÷ A", { size: 15, weight: 700 });
  const alt = "A right-angled triangle with a 35° angle: the hypotenuse H is 12 cm, A is the side next to the 35° angle, O is the side opposite it, and x = O = 12 sin 35° = 6.88 cm; the ratios are sin = O/H, cos = A/H, tan = O/A.";
  await fig("trig-soh-cah-toa-labels", b, 560, 335, alt, "Figure: name the sides from the angle you are using, then pick sin, cos or tan");
  put("trigonometry/right-angled-triangles", "In a right-angled triangle, name the sides", "trig-soh-cah-toa-labels", alt, "Figure: name the sides from the angle you are using, then pick sin, cos or tan");
}
// ---- Roof (Example 6)
{
  const k = 40, x = 3.2 / Math.tan(rad(28)), L = [50, 220], A = [L[0] + x * k, L[1] - 3.2 * k], Rr = [A[0] + x * k, L[1]];
  let b = D.polyline([L, A, Rr], { width: 3, stroke: C.blue }) + ln(L, Rr, { stroke: C.axis }) + ln([A[0], A[1]], [A[0], L[1]], { stroke: C.muted, dash: true, width: 1.8 });
  b += rightAngle(A[0], L[1], 180, 90, 14) + arc(L[0], L[1], 52, 0, 28, { stroke: C.amber });
  b += D.text(L[0] + 62, L[1] - 8, "28°", { fill: C.amber, weight: 700 }) + D.text(A[0] + 8, (A[1] + L[1]) / 2 + 5, "3.2 m", { fill: C.red, weight: 700 });
  b += T((L[0] + A[0]) / 2, L[1] + 24, "x = 6.02 m", { fill: C.blue, weight: 700 }) + D.text((L[0] + A[0]) / 2 - 26, (L[1] + A[1]) / 2 - 18, "s = 6.82 m", { fill: C.blue, weight: 700, anchor: "middle", rotate: -28 });
  const alt = "Cross-section of a roof: each side slopes at 28° and the ridge is 3.2 m above the walls; the right-angled triangle gives the horizontal distance x = 3.2 ÷ tan 28° = 6.02 m and the sloping side s = 3.2 ÷ sin 28° = 6.82 m.";
  await fig("trig-roof-pitch", b, 560, 260, alt, "Figure: the roof splits into right-angled triangles for tan and sin");
  putBefore("trigonometry/right-angled-triangles", "Bearing problems work the same way", "trig-roof-pitch", alt, "Figure: the roof splits into right-angled triangles for tan and sin");
}
// ---- Similar triangles with DE parallel to BC (Example 2) - the sides 7.5, 10, 12.5 make A a right angle
{
  const k = 28, A = [110, 50], B = [110, 50 + 10 * k], Cc = [110 + 7.5 * k, 50], Dd = [110, 50 + 4 * k], E = [110 + 3 * k, 50];
  let b = D.polyline([A, B, Cc], { close: true, width: 2.6, fill: C.fillBlue }) + D.polyline([A, Dd, E], { close: true, width: 2.6, fill: C.fillAmber }) + ln(Dd, E, { stroke: C.amber, width: 3 });
  b += rightAngle(A[0], A[1], 0, -90, 14);
  b += [A, B, Cc, Dd, E].map((p) => dt(p)).join("");
  b += T(A[0] - 14, A[1] - 8, "A", { weight: 700, size: 16 }) + T(B[0] - 14, B[1] + 18, "B", { weight: 700, size: 16 }) + T(Cc[0] + 16, Cc[1] - 4, "C", { weight: 700, size: 16 }) + T(Dd[0] - 14, Dd[1] + 5, "D", { weight: 700, size: 16 }) + T(E[0], E[1] - 12, "E", { weight: 700, size: 16 });
  b += D.text(A[0] + 8, (A[1] + Dd[1]) / 2 + 5, "4", { fill: C.red, weight: 700 }) + D.text(B[0] + 8, (Dd[1] + B[1]) / 2 + 5, "6", { fill: C.red, weight: 700 });
  b += T((A[0] + E[0]) / 2, A[1] - 8, "3", { fill: C.red, weight: 700 }) + T((E[0] + Cc[0]) / 2, A[1] - 8, "4.5", { fill: C.red, weight: 700 });
  b += D.text((Dd[0] + E[0]) / 2 + 12, (Dd[1] + E[1]) / 2 + 18, "DE = 5", { fill: C.amber, weight: 700 }) + D.text((B[0] + Cc[0]) / 2 + 12, (B[1] + Cc[1]) / 2 + 20, "BC = 12.5", { fill: C.blue, weight: 700 });
  b += D.text(330, 330, "k = 10 ÷ 4 = 2.5", { fill: C.muted, weight: 700 }) + D.text(330, 352, "DE ∥ BC, so ADE and ABC are similar", { size: 13, fill: C.muted });
  const alt = "Triangle ABC with DE parallel to BC: AD = 4, DB = 6, AE = 3, EC = 4.5, DE = 5 and BC = 12.5 cm; the small triangle ADE is similar to ABC with scale factor 10 ÷ 4 = 2.5.";
  await fig("similar-triangles-parallel-line", b, 560, 370, alt, "Figure: a line parallel to one side makes a smaller similar triangle");
  putBefore("geometry/similarity", ":::example{title=\"Showing that two triangles are similar\"}", "similar-triangles-parallel-line", alt, "Figure: a line parallel to one side makes a smaller similar triangle");
}
// ---- Reflection: ABC in y = x and in x = -1
{
  const ax = D.axes({ x: [-9, 7], y: [-1, 8], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 760, h: 440 });
  const poly = (pts, fill, stroke) => D.polyline(pts.map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill, stroke, width: 2.4 });
  let b = ax.frame + ax.line([[-1, -1], [7.5, 7.5]], { stroke: C.muted, dash: true, width: 1.8 }) + ax.line([[-1, -1], [-1, 8]], { stroke: C.muted, dash: true, width: 1.8 });
  b += poly([[2, 1], [5, 1], [5, 3]], C.fillBlue, C.blue) + poly([[1, 2], [1, 5], [3, 5]], C.fillAmber, C.amber) + poly([[-4, 1], [-7, 1], [-7, 3]], C.fillGreen, C.green);
  b += ax.label(3.8, 0.45, "ABC", { weight: 700, fill: C.blue, anchor: "middle", size: 15 }) + ax.label(2, 5.7, "A′B′C′", { weight: 700, fill: C.amber, anchor: "middle", size: 15 }) + ax.label(-5.5, 0.45, "A″B″C″", { weight: 700, fill: C.green, anchor: "middle", size: 15 });
  b += ax.tag(6.9, 7.3, "y = x", { anchor: "end", size: 14 }) + ax.tag(-1, 7.4, "x = −1", { dx: -8, anchor: "end", size: 14 });
  const alt = "Triangle ABC with vertices (2, 1), (5, 1) and (5, 3) reflected in the line y = x to give (1, 2), (1, 5) and (3, 5), and in the line x = −1 to give (−4, 1), (−7, 1) and (−7, 3); each image is the same distance behind the mirror line as the object is in front.";
  await fig("reflection-y-x-and-x-minus-1", b, 760, 440, alt, "Figure: reflecting a triangle in y = x and in x = −1");
  putBefore("transformations/reflection-rotation-translation", ":::worked-solution[Example 2", "reflection-y-x-and-x-minus-1", alt, "Figure: reflecting a triangle in y = x and in x = −1");
}
// ---- Rotation: S -> T, 90 deg anticlockwise about origin (Example 3)
{
  const ax = D.axes({ x: [-5, 5], y: [-2, 5], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 560, h: 400 });
  const poly = (pts, fill, stroke) => D.polyline(pts.map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill, stroke, width: 2.4 });
  let b = ax.frame + poly([[1, 2], [3, 2], [3, 3]], C.fillBlue, C.blue) + poly([[-2, 1], [-2, 3], [-3, 3]], C.fillAmber, C.amber);
  b += ax.line([[0, 0], [1, 2]], { stroke: C.muted, dash: true, width: 1.6 }) + ax.line([[0, 0], [-2, 1]], { stroke: C.muted, dash: true, width: 1.6 });
  b += arc(ax.X(0), ax.Y(0), 40, 63.4, 153.4, { stroke: C.red }) + ax.label(-0.05, 1.5, "90°", { fill: C.red, weight: 700, anchor: "middle" });
  b += ax.label(2.2, 2.3, "S", { weight: 700, size: 18, fill: C.blue }) + ax.label(-2.5, 2.1, "T", { weight: 700, size: 18, fill: C.amber });
  b += ax.point(0, 0, { stroke: C.ink, r: 5 }) + ax.tag(0, 0, "centre O", { dx: 8, dy: 24 });
  const alt = "Triangle S with vertices (1, 2), (3, 2) and (3, 3) is mapped onto triangle T with vertices (−2, 1), (−2, 3) and (−3, 3) by a rotation of 90° anticlockwise about the origin; the dashed lines from the origin to (1, 2) and (−2, 1) meet at 90°.";
  await fig("rotation-90-anticlockwise-origin", b, 560, 400, alt, "Figure: S maps onto T by a quarter turn anticlockwise about the origin");
  putBefore("transformations/reflection-rotation-translation", "## Combined transformations", "rotation-90-anticlockwise-origin", alt, "Figure: S maps onto T by a quarter turn anticlockwise about the origin");
}
// ---- Enlargement: centre (-1, 0), k = 3 (Example 3)
{
  const ax = D.axes({ x: [-2, 7], y: [-1, 7], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 560, h: 440 });
  const poly = (pts, fill, stroke) => D.polyline(pts.map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill, stroke, width: 2.4 });
  let b = ax.frame;
  for (const p of [[2, 3], [5, 3], [2, 6]]) b += ax.line([[-1, 0], p], { stroke: C.muted, dash: true, width: 1.5 });
  b += poly([[0, 1], [1, 1], [0, 2]], C.fillBlue, C.blue) + poly([[2, 3], [5, 3], [2, 6]], C.fillAmber, C.amber);
  b += ax.point(-1, 0, { stroke: C.ink, r: 5 }) + ax.tag(-1, 0, "centre (−1, 0)", { dx: 8, dy: 30 });
  b += ax.label(0.3, 0.3, "ABC", { weight: 700, fill: C.blue, size: 13 }) + ax.label(2.6, 3.9, "A′B′C′", { weight: 700, fill: C.amber }) + ax.tag(5.9, 6.6, "scale factor 3", { anchor: "end" });
  const alt = "Triangle ABC with A(0, 1), B(1, 1), C(0, 2) is enlarged with scale factor 3 about the centre (−1, 0) to give A′(2, 3), B′(5, 3), C′(2, 6); the rays from the centre through each vertex pass through the matching image vertex.";
  await fig("enlargement-scale-factor-3", b, 560, 440, alt, "Figure: rays from the centre through each vertex find the enlarged image");
  putBefore("transformations/enlargement", ":::worked-solution[Example 4", "enlargement-scale-factor-3", alt, "Figure: rays from the centre through each vertex find the enlarged image");
}
console.log("geometry3 done");
