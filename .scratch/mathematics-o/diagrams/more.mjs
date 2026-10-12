// Venn, tree, matrices, trig graphs, solids, circles.
import { D, fig, put, putBefore, arc, rightAngle, rad } from "./lib.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });
const g = (body, x, y) => D.group(body, { translate: [x, y] });
const cp = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];

// ---- Venn: football and netball (40 learners)
{
  const c1 = [210, 170], c2 = [330, 170], r = 105;
  let b = D.rect(20, 20, 520, 300, { fill: "#fff", stroke: C.axis, width: 2 }) + T(44, 46, "E", { weight: 700, size: 18 });
  b += D.circle(c1[0], c1[1], r, { stroke: C.blue, width: 2.8, fill: "#daf2f8" }).replace("fill=", 'fill-opacity="0.7" fill=');
  b += D.circle(c2[0], c2[1], r, { stroke: C.amber, width: 2.8, fill: "#feeace" }).replace("fill=", 'fill-opacity="0.7" fill=');
  b += D.circle(c1[0], c1[1], r, { stroke: C.blue, width: 2.8 });
  b += T(c1[0] - 28, 52, "F  (football) 25", { weight: 700, fill: C.blue, anchor: "end", size: 15 }) + T(c2[0] + 28, 52, "N  (netball) 18", { weight: 700, fill: C.amber, anchor: "start", size: 15 });
  b += T(160, 178, "18", { weight: 700, size: 24 }) + T(270, 178, "7", { weight: 700, size: 24 }) + T(380, 178, "11", { weight: 700, size: 24 }) + T(490, 300, "4", { weight: 700, size: 24 });
  b += T(160, 202, "football only", { size: 12, fill: C.muted }) + T(270, 202, "both", { size: 12, fill: C.muted }) + T(380, 202, "netball only", { size: 12, fill: C.muted }) + T(490, 322 - 4, "", {});
  b += D.text(430, 270, "neither", { size: 12, fill: C.muted, anchor: "start" });
  const alt = "Venn diagram for 40 learners: 18 play football only, 7 play both football and netball, 11 play netball only and 4 play neither; the football circle totals 25 and the netball circle totals 18.";
  await fig("venn-football-netball", b, 560, 340, alt, "Figure: fill the overlap first, then the 'only' regions, then the outside");
  putBefore("sets/venn-diagrams", ":::worked-solution[Example 2", "venn-football-netball", alt, "Figure: fill the overlap first, then the 'only' regions, then the outside");
}
// ---- Venn of prime factors for 84 and 120
{
  const c1 = [210, 150], c2 = [350, 150], r = 110;
  let b = D.circle(c1[0], c1[1], r, { stroke: C.blue, width: 2.8, fill: "#daf2f8" }).replace("fill=", 'fill-opacity="0.7" fill=') + D.circle(c2[0], c2[1], r, { stroke: C.amber, width: 2.8, fill: "#feeace" }).replace("fill=", 'fill-opacity="0.7" fill=') + D.circle(c1[0], c1[1], r, { stroke: C.blue, width: 2.8 });
  b += T(c1[0] - 40, 20, "84 = 2² × 3 × 7", { weight: 700, fill: C.blue, anchor: "middle" }) + T(c2[0] + 40, 20, "120 = 2³ × 3 × 5", { weight: 700, fill: C.amber, anchor: "middle" });
  b += T(160, 158, "7", { weight: 700, size: 24 }) + T(280, 140, "2   2", { weight: 700, size: 24 }) + T(280, 172, "3", { weight: 700, size: 24 }) + T(400, 140, "2", { weight: 700, size: 24 }) + T(400, 172, "5", { weight: 700, size: 24 });
  b += T(280, 290, "HCF = 2 × 2 × 3 = 12 (the overlap)", { weight: 700, fill: C.blue }) + T(280, 314, "LCM = 7 × 2 × 2 × 3 × 2 × 5 = 840 (everything)", { weight: 700, fill: C.amber });
  const alt = "Venn diagram of the prime factors of 84 and 120: the overlap holds 2, 2 and 3, so the HCF is 12; 84 alone has 7; 120 alone has 2 and 5; multiplying all the numbers in the diagram gives the LCM 840.";
  await fig("venn-prime-factors-84-120", b, 560, 335, alt, "Figure: the overlap multiplies to the HCF; everything multiplies to the LCM");
  put("number/factors-and-multiples", "You can also show the prime factors in a Venn diagram", "venn-prime-factors-84-120", alt, "Figure: the overlap multiplies to the HCF; everything multiplies to the LCM");
}
// ---- Tree diagram without replacement
{
  const S = [50, 180], L1 = [[250, 90], [250, 270]], L2 = [[470, 40], [470, 120], [470, 220], [470, 310]];
  let b = "";
  const lab = (a, bb, s, o = {}) => T((a[0] + bb[0]) / 2 + (o.dx ?? 0), (a[1] + bb[1]) / 2 + (o.dy ?? 0), s, { size: 14, weight: 700, fill: C.muted, ...o });
  L1.forEach((p) => { b += ln(S, p, { stroke: C.axis }); });
  [[L1[0], L2[0]], [L1[0], L2[1]], [L1[1], L2[2]], [L1[1], L2[3]]].forEach(([a, c]) => { b += ln(a, c, { stroke: C.axis }); });
  b += lab(S, L1[0], "3/10", { dx: -20, dy: -6, fill: C.red }) + lab(S, L1[1], "7/10", { dx: -20, dy: 14, fill: C.blue });
  b += lab(L1[0], L2[0], "2/9", { dy: -8, fill: C.red }) + lab(L1[0], L2[1], "7/9", { dy: 14, fill: C.blue }) + lab(L1[1], L2[2], "3/9", { dy: -8, fill: C.red }) + lab(L1[1], L2[3], "6/9", { dy: 14, fill: C.blue });
  b += [S, ...L1, ...L2].map((p) => dt(p)).join("");
  b += T(L1[0][0] + 14, L1[0][1] - 14, "Red", { weight: 700, fill: C.red }) + T(L1[1][0] + 14, L1[1][1] + 26, "Blue", { weight: 700, fill: C.blue });
  [["RR", "3/10 × 2/9 = 6/90 = 1/15", 0], ["RB", "3/10 × 7/9 = 21/90", 1], ["BR", "7/10 × 3/9 = 21/90", 2], ["BB", "7/10 × 6/9 = 42/90", 3]].forEach(([n, pr, i]) => {
    b += D.text(L2[i][0] + 12, L2[i][1] + 5, n, { weight: 700, size: 15 }) + D.text(L2[i][0] + 44, L2[i][1] + 5, pr, { size: 14, fill: C.muted });
  });
  b += T(S[0], S[1] - 20, "start", { size: 14, fill: C.muted }) + T(150, 355, "3 red and 7 blue counters; the first counter is not replaced.", { size: 14, fill: C.muted, anchor: "start" });
  const alt = "Tree diagram for two counters taken without replacement from 3 red and 7 blue: first branches red 3/10 and blue 7/10; after red the second branches are red 2/9 and blue 7/9, after blue they are red 3/9 and blue 6/9; the four path probabilities are 6/90, 21/90, 21/90 and 42/90, which add up to 1.";
  await fig("tree-without-replacement", b, 780, 370, alt, "Figure: multiply along the branches; add the paths that give the result you want");
  putBefore("probability/tree-diagrams", ":::worked-solution[Example 2", "tree-without-replacement", alt, "Figure: multiply along the branches; add the paths that give the result you want");
}
// ---- Matrix transformations: columns are images of I and J
{
  let b = "";
  const mk = (ox, w, xr, title, imgs, sq) => {
    const ax = D.axes({ x: xr, y: [-1, 2], xTicks: 1, yTicks: 1, w, h: 200, pad: { l: 26, r: 14, t: 24, b: 30 }, arrows: false });
    const P = (x, y) => [ax.X(x), ax.Y(y)];
    let p = ax.frame + D.polyline([[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => P(x, y)), { close: true, fill: C.fillBlue, stroke: C.blue, width: 2 }) + D.polyline(sq.map(([x, y]) => P(x, y)), { close: true, fill: C.fillAmber, stroke: C.amber, width: 2 });
    p += ax.arrow(0, 0, 0.9, 0, { stroke: C.blue, width: 3 }) + ax.arrow(0, 0, 0, 0.9, { stroke: C.blue, width: 3 });
    for (const [x, y, s2, dx, dy] of imgs) p += ax.arrow(0, 0, x * 0.93, y * 0.93, { stroke: C.amber, width: 3 }) + ax.label(x, y, s2, { fill: C.amber, weight: 700, size: 13, dx, dy });
    p += ax.label(1, 0, "I (1, 0)", { weight: 700, size: 13, fill: C.blue, dx: -4, dy: 40 }) + T(w / 2 + 10, 14, title, { weight: 700, size: 14 });
    return g(p, ox, 0);
  };
  b += mk(0, 230, [-2, 2], "Quarter turn anticlockwise", [[0, 1, "J (0, 1) = I′", 6, -8], [-1, 0, "J′ (−1, 0)", -34, 40]], [[0, 0], [0, 1], [-1, 1], [-1, 0]]);
  b += mk(230, 330, [-1, 5], "Shear, x-axis invariant, factor 3", [[3, 1, "J′ (3, 1)", -20, -10]], [[0, 0], [1, 0], [4, 1], [3, 1]]);
  b += T(115, 236, "M = (0 −1 ; 1 0)", { weight: 700, fill: C.amber, size: 14 }) + T(395, 236, "M = (1 3 ; 0 1)", { weight: 700, fill: C.amber, size: 14 });
  b += T(280, 262, "Column 1 of M is the image of I; column 2 is the image of J.", { size: 13, fill: C.muted });
  const alt = "Two unit squares and their images: a quarter turn anticlockwise sends I(1, 0) to (0, 1) and J(0, 1) to (−1, 0), giving the matrix with columns (0, 1) and (−1, 0); a shear with the x-axis invariant and factor 3 keeps I fixed and sends J to (3, 1), giving the columns (1, 0) and (3, 1).";
  await fig("matrix-columns-images-of-i-j", b, 560, 275, alt, "Figure: the columns of a matrix are the images of I and J");
  put("matrices/matrix-transformations", "You do not need to memorise the table blindly", "matrix-columns-images-of-i-j", alt, "Figure: the columns of a matrix are the images of I and J");
}
// ---- Trig graphs
{
  const mk = (extra, h = 340) => {
    const ax = D.axes({ x: [0, 360], y: [-1.5, 1.5], xTicks: 90, yTicks: 0.5, xLabel: "x (degrees)", yLabel: "y", w: 600, h, xFormat: (v) => v + "°" });
    return ax;
  };
  { // sin and cos
    const ax = mk();
    const b = ax.frame + ax.plot((x) => Math.sin(rad(x)), { steps: 360 }) + ax.plot((x) => Math.cos(rad(x)), { stroke: C.amber, steps: 360 }) + ax.tag(100, 1.0, "y = sin x", { fill: C.blue, dx: 10, dy: 0 }) + ax.tag(0, 1, "y = cos x", { fill: C.amber, dx: 14, dy: -6 }) + ax.tag(300, -1.1, "cos x", { dx: 0, fill: C.amber, size: 12 }).replace(/.*/, "");
    const alt = "Graphs of y = sin x and y = cos x from 0° to 360°: sine starts at 0, peaks at 1 at 90°, crosses 0 at 180°, bottoms at −1 at 270°; cosine starts at 1, crosses 0 at 90°, reaches −1 at 180° and returns to 1 at 360°; both have period 360°.";
    await fig("trig-sine-cosine-graphs", b, 600, 340, alt, "Figure: sine and cosine are the same wave shifted by 90°");
    putBefore("trigonometry/trig-graphs-and-equations", ":::keyfact{title=\"y = tan x\"}", "trig-sine-cosine-graphs", alt, "Figure: sine and cosine are the same wave shifted by 90°");
  }
  { // tan
    const ax = D.axes({ x: [0, 360], y: [-4, 4], xTicks: 90, yTicks: 1, xLabel: "x (degrees)", yLabel: "y", w: 600, h: 340, xFormat: (v) => v + "°" });
    let b = ax.frame + ax.line([[90, -4], [90, 4]], { stroke: C.muted, dash: true, width: 1.6 }) + ax.line([[270, -4], [270, 4]], { stroke: C.muted, dash: true, width: 1.6 });
    b += ax.plot((x) => Math.tan(rad(x)), { domain: [0, 89.4], steps: 200 }) + ax.plot((x) => Math.tan(rad(x)), { domain: [90.6, 269.4], steps: 400 }) + ax.plot((x) => Math.tan(rad(x)), { domain: [270.6, 360], steps: 200 });
    b += ax.tag(90, 3.4, "asymptote x = 90°", { dx: 6, fill: C.muted, size: 13 }) + ax.tag(270, -3.2, "asymptote x = 270°", { dx: 6, fill: C.muted, size: 13 });
    const alt = "Graph of y = tan x from 0° to 360°: three rising branches through (0, 0), (180, 0) and (360, 0), with vertical asymptotes (dashed) at x = 90° and x = 270° where tan x is undefined; the period is 180°.";
    await fig("trig-tangent-graph", b, 600, 340, alt, "Figure: tan x repeats every 180° and has asymptotes at 90° and 270°");
    putBefore("trigonometry/trig-graphs-and-equations", "| $x$ | $0^\\circ$ | $90^\\circ$", "trig-tangent-graph", alt, "Figure: tan x repeats every 180° and has asymptotes at 90° and 270°");
  }
  { // sin x = 0.4
    const ax = mk();
    const a1 = (Math.asin(0.4) * 180) / Math.PI, a2 = 180 - a1;
    let b = ax.frame + ax.plot((x) => Math.sin(rad(x)), { steps: 360 }) + ax.line([[0, 0.4], [360, 0.4]], { stroke: C.amber, dash: true, width: 2 });
    for (const a of [a1, a2]) b += ax.point(a, 0.4, { stroke: C.red, r: 5 }) + ax.line([[a, 0.4], [a, 0]], { stroke: C.red, dash: true, width: 1.6 });
    b += ax.tag(a1, 0.4, "23.6°", { dx: 6, dy: -22, fill: C.red }) + ax.tag(a2, 0.4, "156.4°", { dx: 6, dy: -10, fill: C.red }) + ax.tag(350, 0.4, "y = 0.4", { anchor: "end", dy: -8, fill: C.amber });
    const alt = "Graph of y = sin x with the horizontal line y = 0.4: the line crosses the first hump at x = 23.6° and x = 156.4° (that is 180° − 23.6°), the two solutions of sin x = 0.4 between 0° and 360°.";
    await fig("trig-solve-sin-0-4", b, 600, 340, alt, "Figure: the line y = 0.4 meets the sine curve twice, symmetrically about 90°");
    putBefore("trigonometry/trig-graphs-and-equations", ":::worked-solution[Example 2", "trig-solve-sin-0-4", alt, "Figure: the line y = 0.4 meets the sine curve twice, symmetrically about 90°");
  }
}
// ---- Solids: cuboid and tent prism
{
  const ob = [28, -20];
  const box = (x, y, w, h, d, fill) => {
    const F = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], B = F.map(([a, c]) => [a + d[0], c + d[1]]);
    return { F, B };
  };
  let b = "";
  { // cuboid 8 x 5 x 3, scale 15
    const k = 15, w = 8 * k, h = 3 * k, d = [5 * k * 0.5 * 0.9, -5 * k * 0.5 * 0.9], x = 50, y = 130;
    const { F, B } = box(x, y, w, h, d);
    b += D.polyline([F[0], F[1], B[1], B[0]], { close: true, fill: "#e6f2f6", stroke: C.blue, width: 2.2 }) + D.polyline([F[1], F[2], B[2], B[1]], { close: true, fill: "#d3e8ef", stroke: C.blue, width: 2.2 }) + D.polyline(F, { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.6 });
    b += T(x + w / 2, y + h + 22, "8 cm", { fill: C.muted }) + D.text(x - 10, y + h / 2 + 5, "3 cm", { fill: C.muted, anchor: "end" }) + D.text(F[1][0] + d[0] / 2 + 6, F[1][1] + d[1] / 2 - 18, "5 cm", { fill: C.muted, anchor: "start" });
    b += T(x + w / 2 + 20, 215, "V = 8 × 5 × 3 = 120 cm³", { weight: 700, fill: C.blue, size: 14 }) + T(x + w / 2 + 20, 236, "A = 2(40 + 24 + 15) = 158 cm²", { weight: 700, fill: C.blue, size: 14 });
  }
  { // tent: triangular prism base 2.4, height 1.6, length 3; scale 40 (length shortened)
    const k = 40, bw = 2.4 * k, th = 1.6 * k, x = 360, y = 170, d = [80, -34];
    const F = [[x, y], [x + bw, y], [x + bw / 2, y - th]], B = F.map(([a, c]) => [a + d[0], c + d[1]]);
    b += D.polyline([F[0], F[1], B[1], B[0]], { close: true, fill: "#e6f2f6", stroke: C.amber, width: 2.2 }) + D.polyline([F[1], F[2], B[2], B[1]], { close: true, fill: "#d3e8ef", stroke: C.amber, width: 2.2 }) + D.polyline(F, { close: true, fill: C.fillAmber, stroke: C.amber, width: 2.6 });
    b += T(x + bw / 2, y + 22, "2.4 m", { fill: C.muted }) + D.text(x + bw / 2 + 6, y - th / 2 + 4, "1.6 m", { fill: C.muted, anchor: "start" }) + ln([x + bw / 2, y - th], [x + bw / 2, y], { stroke: C.muted, dash: true, width: 1.4 });
    b += D.text(F[1][0] + 40, F[1][1] - 6 + d[1] / 2 + 28, "3 m long", { fill: C.muted, anchor: "start" });
    b += T(x + 70, 215, "Cross-section ½ × 2.4 × 1.6 = 1.92 m²", { weight: 700, fill: C.amber, size: 13 }) + T(x + 70, 236, "V = 1.92 × 3 = 5.76 m³", { weight: 700, fill: C.amber, size: 14 });
  }
  const alt = "Two prisms: a cuboid 8 cm by 5 cm by 3 cm with volume 8 × 5 × 3 = 120 cm³ and surface area 158 cm², and a ridge tent that is a triangular prism 3 m long whose triangular cross-section (base 2.4 m, height 1.6 m) has area 1.92 m², giving a volume of 5.76 m³.";
  await fig("solids-cuboid-and-tent-prism", b, 560, 260, alt, "Figure: volume of a prism = area of cross-section × length");
  putBefore("mensuration/prisms-and-cylinders", ":::worked-solution[Example 2", "solids-cuboid-and-tent-prism", alt, "Figure: volume of a prism = area of cross-section × length");
}
// ---- Cylinder and its curved surface
{
  const k = 40, r = 1.2 * k, h = 2 * k, cx = 90, top = 50, ry = 16;
  let b = D.path_(`M${cx - r},${top} L${cx - r},${top + h} A${r},${ry} 0 0 0 ${cx + r},${top + h} L${cx + r},${top}`, { fill: C.fillBlue, stroke: C.blue, width: 2.6 }) + `<ellipse cx="${cx}" cy="${top}" rx="${r}" ry="${ry}" fill="#e6f2f6" stroke="${C.blue}" stroke-width="2.6"/>`;
  b += ln([cx, top], [cx + r, top], { stroke: C.red, width: 2 }) + T(cx, top + 34, "r = 1.2 m", { size: 13, fill: C.red }) + D.text(cx + r + 10, top + h / 2 + 5, "h = 2 m", { fill: C.muted, anchor: "start" });
  const nx = 250, nw = 2 * Math.PI * 1.2 * k * 0.8;
  b += D.rect(nx, top + 8, nw, h, { fill: C.fillAmber, stroke: C.amber, width: 2.6 }) + T(nx + nw / 2, top + 8 + h + 22, "length = circumference = 2π × 1.2 = 7.54 m", { size: 14, fill: C.muted }) + T(nx + nw / 2, top + 8 + h / 2 + 5, "curved surface = 2πrh = 15.1 m²", { weight: 700, fill: C.amber, size: 14 }) + D.text(nx + nw + 8, top + 8 + h / 2 + 5, "2 m", { fill: C.muted, anchor: "start" });
  b += T(280, 195, "Unrolled, the curved surface is a rectangle: 2πr by h.", { size: 13, fill: C.muted }).replace("", "");
  const alt = "A cylindrical tank of radius 1.2 m and height 2 m next to its curved surface unrolled into a rectangle 7.54 m long (the circumference 2π × 1.2) and 2 m high, with area 2πrh = 15.1 m².";
  await fig("cylinder-curved-surface-rectangle", b, 560, 215, alt, "Figure: the curved surface of a cylinder unrolls into a rectangle");
  put("mensuration/prisms-and-cylinders", "The curved surface of a cylinder unrolls into a rectangle", "cylinder-curved-surface-rectangle", alt, "Figure: the curved surface of a cylinder unrolls into a rectangle");
}
// ---- Sector and segment
{
  const k = 12;
  let b = "";
  { // sector r = 9, 40 deg
    const O = [60, 160], r = 9 * k, p1 = cp(O[0], O[1], r, 0), p2 = cp(O[0], O[1], r, 40);
    b += D.path_(`M${O[0]},${O[1]} L${p1[0]},${p1[1]} A${r},${r} 0 0 0 ${p2[0].toFixed(2)},${p2[1].toFixed(2)} Z`, { fill: C.fillBlue, stroke: C.blue, width: 2.6 });
    b += arc(O[0], O[1], 30, 0, 40, { stroke: C.red }) + D.text(O[0] + 36, O[1] - 6, "40°", { fill: C.red, weight: 700, size: 14 }) + T(O[0] + r / 2, O[1] + 20, "r = 9 cm", { fill: C.muted, size: 14 });
    b += D.text(O[0] + 6, 40, "Sector: 1/9 of the circle", { weight: 700, size: 14, anchor: "start" }) + D.text(O[0] + 6, 200, "arc = 2π ≈ 6.28 cm", { fill: C.blue, weight: 700, size: 14, anchor: "start" }) + D.text(O[0] + 6, 220, "area = 9π ≈ 28.3 cm²", { fill: C.blue, weight: 700, size: 14, anchor: "start" });
  }
  { // segment r = 8, 60 deg, symmetric about east
    const O = [300, 140], r = 8 * k, A = cp(O[0], O[1], r, 30), B = cp(O[0], O[1], r, -30);
    b += D.path_(`M${A[0].toFixed(2)},${A[1].toFixed(2)} A${r},${r} 0 0 1 ${B[0].toFixed(2)},${B[1].toFixed(2)} Z`, { fill: C.fillAmber, stroke: C.amber, width: 2.6 });
    b += D.polyline([O, A, B], { close: true, fill: "none", stroke: C.amber, width: 2.2 }) + ln(O, cp(O[0], O[1], r, 0), { stroke: C.muted, dash: true, width: 1.2 });
    b += arc(O[0], O[1], 26, -30, 30, { stroke: C.red }) + D.text(O[0] + 30, O[1] + 5, "60°", { fill: C.red, weight: 700, size: 14, anchor: "start" }) + T(O[0] + (r / 2) * Math.cos(rad(30)) - 4, O[1] - (r / 2) * Math.sin(rad(30)) - 12, "r = 8 cm", { fill: C.muted, size: 14 });
    b += D.text(O[0] + r + 8, O[1] + 5, "segment", { weight: 700, fill: C.amber, size: 14, anchor: "start" });
    b += D.text(O[0] - 70, 40, "Segment = sector − triangle", { weight: 700, size: 14, anchor: "start" }) + D.text(O[0] - 70, 200, "sector 33.51 − triangle 27.71", { fill: C.amber, weight: 700, size: 14, anchor: "start" }) + D.text(O[0] - 70, 220, "segment ≈ 5.80 cm²", { fill: C.amber, weight: 700, size: 14, anchor: "start" });
  }
  const alt = "Left: a sector of radius 9 cm and angle 40° (one ninth of the circle) with arc length 2π ≈ 6.28 cm and area 9π ≈ 28.3 cm². Right: a segment of a circle of radius 8 cm cut off by a chord at 60°, whose area is the sector 33.51 cm² minus the triangle 27.71 cm², about 5.80 cm².";
  await fig("circle-sector-and-segment", b, 560, 240, alt, "Figure: a sector is a fraction θ/360 of the circle; a segment is a sector minus a triangle");
  putBefore("mensuration/circles-arcs-sectors", ":::worked-solution[Example 4", "circle-sector-and-segment", alt, "Figure: a sector is a fraction θ/360 of the circle; a segment is a sector minus a triangle");
}
console.log("more done");
