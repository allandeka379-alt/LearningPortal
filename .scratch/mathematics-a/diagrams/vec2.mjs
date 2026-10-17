// Run: node .scratch/mathematics-a/diagrams/vec2.mjs   (lessons are hand-written .md)
import { D, C, fig, PI } from "./_h.mjs";

// vectors/basics Example 2: parallelogram OABC, A(1,2,4), B(4,6,5), C(3,4,1), midpoint M(2,3,2.5)
{
  const a = [1, 2, 4], b = [4, 6, 5];
  const c = b.map((v, i) => v - a[i]); // OC = AB = (3,4,1)
  const m = b.map((v) => v / 2);
  const mAC = a.map((v, i) => (v + c[i]) / 2);
  if (m.join() !== mAC.join()) throw new Error("midpoints differ");
  const O = [150, 215], A = [380, 235], Cp = [220, 80];
  const B = [A[0] + Cp[0] - O[0], A[1] + Cp[1] - O[1]];
  const M = [(O[0] + B[0]) / 2, (O[1] + B[1]) / 2];
  const v = (p) => `(${p.map((x) => String(x).replace("-", "−")).join(", ")})`;
  const body = D.polyline([O, A, B, Cp], { close: true, fill: C.fillBlue, stroke: C.blue, width: 2.5 }) +
    D.line(O[0], O[1], B[0], B[1], { stroke: C.amber, dash: true, width: 2 }) + D.line(A[0], A[1], Cp[0], Cp[1], { stroke: C.amber, dash: true, width: 2 }) +
    D.arrow(O[0], O[1], A[0] - 6, A[1] - 0.5, { stroke: C.ink, width: 2.5 }) + D.arrow(O[0], O[1], Cp[0] - 3, Cp[1] + 5, { stroke: C.ink, width: 2.5 }) +
    D.dot(M[0], M[1], { r: 5, stroke: C.red }) +
    D.text(O[0] - 8, O[1] + 20, `O ${v([0, 0, 0])}`, { anchor: "end", weight: 700 }) +
    D.text(A[0] + 6, A[1] + 22, `A ${v(a)}`, { weight: 700, anchor: "middle" }) +
    D.text(B[0] + 10, B[1] + 5, `B ${v(b)}`, { weight: 700 }) +
    D.text(Cp[0] - 8, Cp[1] - 10, `C ${v(c)}`, { weight: 700, anchor: "end" }) +
    D.text(M[0] + 8, M[1] - 8, "M", { fill: C.red, weight: 700 }) + D.text(280, 282, `M ${v(m)} is the midpoint of both diagonals OB and AC`, { fill: C.red, anchor: "middle", size: 14 }) +
    D.text((O[0] + A[0]) / 2, O[1] + 30, "OA = a", { anchor: "middle", size: 14 }) +
    D.text((O[0] + Cp[0]) / 2 - 12, (O[1] + Cp[1]) / 2 + 6, "OC = AB = b − a", { size: 14, anchor: "end" });
  await fig("vectors/basics", "vector-parallelogram-diagonals", D.svg(560, 295, body),
    "Parallelogram OABC with O the origin, A (1, 2, 4), B (4, 6, 5) and C (3, 4, 1) where OC = AB = b − a: the diagonals OB and AC both have midpoint (2, 3, 2.5), so they bisect each other.",
    "Figure: in parallelogram OABC the diagonals OB and AC meet at their common midpoint M (2, 3, 2.5)", { block: "Example 2" });
}

// vectors/scalar-product Example 3: A(2,0,1), B(5,4,1), C(3,1,6)
{
  const A3 = [2, 0, 1], B3 = [5, 4, 1], C3 = [3, 1, 6];
  const ab = B3.map((x, i) => x - A3[i]), ac = C3.map((x, i) => x - A3[i]);
  const dot = ab.reduce((s, x, i) => s + x * ac[i], 0), mag = (u) => Math.hypot(...u);
  const ang = Math.acos(dot / (mag(ab) * mag(ac)));
  const deg = (ang * 180) / PI;
  if (Math.abs(deg - 74.4) > 0.05 || dot !== 7) throw new Error("check " + deg);
  const s = 42, A = [240, 255];
  const B = [A[0] + mag(ab) * s, A[1]], Cc = [A[0] + mag(ac) * s * Math.cos(ang), A[1] - mag(ac) * s * Math.sin(ang)];
  const bc = Math.hypot(...B3.map((x, i) => C3[i] - x));
  const body = D.polyline([A, B, Cc], { close: true, fill: C.fillGrey, stroke: "none" }) +
    D.line(B[0], B[1], Cc[0], Cc[1], { stroke: C.muted, dash: true, width: 2 }) +
    D.arrow(A[0], A[1], B[0] - 4, B[1], { stroke: C.blue, width: 3 }) + D.arrow(A[0], A[1], Cc[0] - 1, Cc[1] + 4, { stroke: C.amber, width: 3 }) +
    D.path_(`M${A[0] + 40},${A[1]} A40,40 0 0 0 ${A[0] + 40 * Math.cos(ang)},${A[1] - 40 * Math.sin(ang)}`, { stroke: C.ink, width: 1.6 }) +
    D.text(A[0] + 48, A[1] - 14, `${deg.toFixed(1)}°`, { size: 15, weight: 700 }) +
    D.dot(A[0], A[1]) + D.text(A[0] - 12, A[1] + 5, "A (2, 0, 1)", { weight: 700, anchor: "end" }) +
    D.text(B[0] + 10, B[1] + 5, "B (5, 4, 1)", { weight: 700 }) + D.text(Cc[0] + 10, Cc[1] + 4, "C (3, 1, 6)", { weight: 700 }) +
    D.tag(A[0] + (B[0] - A[0]) / 2, A[1] + 36, `AB = 3i + 4j, |AB| = ${mag(ab)}`, { anchor: "middle", fill: C.blue, size: 14 }) +
    D.tag(Cc[0] - 14, (A[1] + Cc[1]) / 2, `AC = i + j + 5k\n`.trim(), { anchor: "end", fill: C.amber, size: 14 }) +
    D.tag(Cc[0] - 14, (A[1] + Cc[1]) / 2 + 28, `|AC| = √27 = ${mag(ac).toFixed(2)}`, { anchor: "end", size: 14, fill: C.amber }) +
    D.tag((B[0] + Cc[0]) / 2 + 14, (B[1] + Cc[1]) / 2 + 36, `BC = √38 = ${bc.toFixed(2)}`, { fill: C.muted, size: 13 }) +
    D.text(20, 40, "AB · AC = 3 + 4 + 0 = 7", { size: 14 });
  await fig("vectors/scalar-product", "vector-angle-triangle-bac", D.svg(560, 310, body),
    "Triangle ABC with A (2, 0, 1), B (5, 4, 1), C (3, 1, 6): the vectors AB = 3i + 4j and AC = i + j + 5k both start at A, AB·AC = 7, |AB| = 5 and |AC| = √27, so angle BAC = 74.4 degrees.",
    "Figure: angle BAC is found from the two vectors that start at A: cos BAC = 7 ÷ (5√27)", { block: "Example 3" });
}
