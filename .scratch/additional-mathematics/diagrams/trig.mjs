// Run: node .scratch/additional-mathematics/diagrams/trig.mjs
import fs from "node:fs";
import { D, C, fig, FAMILY, LESSONS } from "./_h.mjs";

const rad = (d) => (d * Math.PI) / 180;

// trig/six-ratios: unit circle with theta and -theta, quadrant signs (CAST)
{
  const w = 700, h = 520, ox = 300, oy = 260, R = 190;
  const th = 30;
  const P = (a) => [ox + R * Math.cos(rad(a)), oy - R * Math.sin(rad(a))];
  const [px, py] = P(th), [qx, qy] = P(-th);
  let b = D.line(ox - R - 30, oy, ox + R + 40, oy, { stroke: C.axis, width: 1.6, arrow: true }) + D.line(ox, oy + R + 30, ox, oy - R - 40, { stroke: C.axis, width: 1.6, arrow: true }) +
    D.text(ox + R + 36, oy + 20, "x", { size: 14, weight: 600, anchor: "end" }) + D.text(ox + 10, oy - R - 30, "y", { size: 14, weight: 600 }) +
    D.circle(ox, oy, R, { stroke: C.blue, width: 2.4 }) +
    D.line(ox, oy, px, py, { stroke: C.blue, width: 2.4 }) + D.line(ox, oy, qx, qy, { stroke: C.amber, width: 2.4 }) +
    D.line(px, py, px, oy, { stroke: C.muted, width: 1.4, dash: true }) + D.line(qx, qy, qx, oy, { stroke: C.muted, width: 1.4, dash: true }) +
    D.dot(px, py) + D.dot(qx, qy) +
    D.path_(`M${ox + 55},${oy} A55,55 0 0 0 ${ox + 55 * Math.cos(rad(th))},${oy - 55 * Math.sin(rad(th))}`, { stroke: C.blue, width: 1.6 }) +
    D.path_(`M${ox + 70},${oy} A70,70 0 0 1 ${ox + 70 * Math.cos(rad(th))},${oy + 70 * Math.sin(rad(th))}`, { stroke: C.amber, width: 1.6 }) +
    D.text(ox + 82, oy - 12, "θ", { size: 16, fill: C.blue, weight: 700 }) + D.text(ox + 84, oy + 26, "−θ", { size: 16, fill: C.amber, weight: 700 }) +
    D.tag(px + 10, py - 4, "P (cos θ, sin θ)", { size: 14 }) + D.tag(qx + 10, qy + 22, "(cos θ, −sin θ)", { size: 14 }) +
    D.text(20, 30, "Unit circle: radius 1", { size: 14, fill: C.muted }) +
    D.text(ox - 100, oy - 110, "2nd: sin (+)", { size: 15, weight: 700, fill: C.muted, anchor: "middle" }) + D.text(ox + 90, oy - 120, "1st: all (+)", { size: 15, weight: 700, fill: C.muted, anchor: "middle" }) +
    D.text(ox - 80, oy + 130, "3rd: tan (+)", { size: 15, weight: 700, fill: C.muted, anchor: "middle" }) + D.text(ox + 70, oy + 130, "4th: cos (+)", { size: 15, weight: 700, fill: C.muted, anchor: "middle" });
  await fig("trig/six-ratios", "unit-circle-angle-and-negative", D.svg(w, h, b),
    "Unit circle with the angle theta measured anticlockwise to the point (cos theta, sin theta) and the angle minus theta measured clockwise to (cos theta, minus sin theta): the two points have the same x-coordinate and opposite y-coordinates, so cos(-theta) = cos theta and sin(-theta) = -sin theta. Quadrants are labelled with the functions that are positive.",
    "Figure: the unit circle shows cos(−θ) = cos θ and sin(−θ) = −sin θ", { block: "Sine, cosine and tangent of any angle" });
  const p = `${LESSONS}/trig/six-ratios.md`;
  const t = fs.readFileSync(p, "utf8");
  fs.writeFileSync(p, t.replace("Two results follow straight from the diagram:", "Two results follow straight from the unit-circle figure above:"));
}

// trig/graphs Example 1: y = 3 sin 2x + 1
{
  const f = (x) => 3 * Math.sin(rad(2 * x)) + 1;
  const ax = D.axes({ x: [0, 360], y: [-3, 5], xTicks: 45, yTicks: 1, w: 580, h: 380, xLabel: "x (degrees)", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 1], [360, 1]], { stroke: C.muted, width: 1.2, dash: true }) + ax.label(360, 1, "y = 1", { fill: C.muted, dy: -6, anchor: "end", size: 13 }) + ax.plot(f, { domain: [0, 360] }) +
    ax.point(45, 4) + ax.point(225, 4) + ax.point(135, -2) + ax.point(315, -2) + ax.point(0, 1) +
    ax.tag(45, 4, "(45°, 4)", { dx: -30, dy: -12 }) + ax.tag(225, 4, "(225°, 4)", { dx: -30, dy: -12 }) + ax.tag(135, -2, "(135°, -2)", { dx: -34, dy: 28 }) + ax.tag(315, -2, "(315°, -2)", { dx: -34, dy: 28 });
  await fig("trig/graphs", "trig-sine-2x-plus-1", D.svg(580, 380, body),
    "Graph of y = 3 sin 2x + 1 for 0 to 360 degrees: two complete waves of period 180 degrees about the centre line y = 1, with maxima of 4 at 45 and 225 degrees and minima of -2 at 135 and 315 degrees.",
    "Figure: y = 3 sin 2x + 1 has amplitude 3, period 180° and centre line y = 1", { block: "Example 1" });
}

// vectors/geometry: triangle OAB, midpoints
{
  const O = [70, 300], A = [440, 300], B = [190, 70];
  const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], N = [(O[0] + A[0]) / 2, 300];
  const b =
    D.arrow(...O, ...A, { stroke: C.blue, width: 2.6 }) + D.arrow(...O, ...B, { stroke: C.amber, width: 2.6 }) + D.line(...A, ...B, { stroke: C.ink, width: 2.2 }) +
    D.line(...N, ...M, { stroke: C.green, width: 2.4, dash: true }) + D.dot(...M) + D.dot(...N) + D.dot(...O) + D.dot(...A) + D.dot(...B) +
    D.text(O[0] - 22, O[1] + 18, "O", { weight: 700 }) + D.text(A[0] + 10, A[1] + 18, "A", { weight: 700 }) + D.text(B[0] - 8, B[1] - 12, "B", { weight: 700 }) +
    D.text(M[0] + 12, M[1] - 4, "M", { weight: 700 }) + D.text(N[0] - 6, N[1] + 24, "N", { weight: 700 }) +
    D.text((O[0] + A[0]) / 2 - 50, O[1] + 50, "OA = a", { fill: C.blue, weight: 700, size: 16 }) + D.text(O[0] - 64, (O[1] + B[1]) / 2, "OB = b", { fill: C.amber, weight: 700, size: 16 }) +
    D.text(120, 220, "NM = ½b\n(parallel to OB)", { fill: C.green, weight: 700, size: 15 });
  await fig("vectors/geometry", "vectors-midpoint-theorem", D.svg(560, 370, b),
    "Triangle OAB with OA = a and OB = b; N is the midpoint of OA and M the midpoint of AB, and the dashed line NM equals half of b, so NM is parallel to OB and half its length (the midpoint theorem).",
    "Figure: NM = ½b, so the line joining two midpoints is parallel to the third side", { heading: "## Writing vectors in terms of a and b" });
}
console.log("trig diagrams written");
