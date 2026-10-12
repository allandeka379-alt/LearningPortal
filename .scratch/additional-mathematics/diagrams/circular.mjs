// Run: node .scratch/additional-mathematics/diagrams/circular.mjs
import { D, C, fig } from "./_h.mjs";

// circular/radians Example 2: sector r = 8 cm, theta = 1.2 rad
{
  const r = 8, th = 1.2, k = 28, R = r * k;
  const O = [70, 300];
  const A = [O[0] + R, O[1]], B = [O[0] + R * Math.cos(th), O[1] - R * Math.sin(th)];
  const arc = r * th, area = 0.5 * r * r * th, per = 2 * r + arc;
  const b = D.polyline([O, A], { fill: "none" }) +
    `<path d="M${O[0]},${O[1]} L${A[0]},${A[1]} A${R},${R} 0 0 0 ${B[0].toFixed(2)},${B[1].toFixed(2)} Z" fill="${C.fillBlue}" stroke="${C.blue}" stroke-width="2.6" stroke-linejoin="round"/>` +
    D.path_(`M${O[0] + 48},${O[1]} A48,48 0 0 0 ${O[0] + 48 * Math.cos(th)},${O[1] - 48 * Math.sin(th)}`, { stroke: C.amber, width: 2 }) +
    D.text(O[0] + 58, O[1] - 22, "1.2 rad", { fill: C.amber, weight: 700, size: 15 }) +
    D.text((O[0] + A[0]) / 2, O[1] + 24, `radius ${r} cm`, { anchor: "middle", weight: 700 }) +
    D.text(A[0] + 8, A[1] - 90, `arc length\n${r} × 1.2 = ${arc} cm`, { fill: C.blue, weight: 700, size: 15 }) +
    D.text(O[0] + 70, O[1] - 110, `area = ${area} cm²`, { size: 15, fill: C.blue, weight: 700 }) +
    D.dot(...O) + D.text(O[0] - 22, O[1] + 6, "O", { weight: 700 }) + D.text(A[0] + 8, A[1] + 18, "A", { weight: 700 }) + D.text(B[0] - 4, B[1] - 12, "B", { weight: 700 });
  await fig("circular/radians", "sector-radians-arc-area", D.svg(540, 340, b),
    "Sector OAB of radius 8 cm and angle 1.2 radians: the arc length is 8 times 1.2 = 9.6 cm, the area is half of 8 squared times 1.2 = 38.4 square centimetres, and the perimeter is 8 + 8 + 9.6 = 25.6 cm.",
    "Figure: a sector of radius 8 cm and angle 1.2 radians", { block: "Example 2" });
}

// circular/compound-shapes Example 1: sector r = 10, theta = 1.4; chord and minor segment
{
  const r = 10, th = 1.4, k = 22, R = r * k;
  const O = [280, 330];
  const P = (a) => [O[0] + R * Math.cos(a), O[1] - R * Math.sin(a)];
  const A = P(Math.PI / 2 - th / 2), B = P(Math.PI / 2 + th / 2);
  const chord = 2 * r * Math.sin(th / 2), seg = 0.5 * r * r * (th - Math.sin(th));
  const b =
    `<path d="M${A[0].toFixed(2)},${A[1].toFixed(2)} A${R},${R} 0 0 0 ${B[0].toFixed(2)},${B[1].toFixed(2)} Z" fill="${C.fillAmber}" stroke="none"/>` +
    D.line(...O, ...A, { stroke: C.ink, width: 2, dash: true }) + D.line(...O, ...B, { stroke: C.ink, width: 2, dash: true }) +
    D.path_(`M${A[0].toFixed(2)},${A[1].toFixed(2)} A${R},${R} 0 0 0 ${B[0].toFixed(2)},${B[1].toFixed(2)}`, { stroke: C.blue, width: 2.8 }) +
    D.line(...A, ...B, { stroke: C.amber, width: 2.8 }) + D.dot(...O) + D.dot(...A) + D.dot(...B) +
    D.text(O[0] - 6, O[1] + 24, "O", { weight: 700 }) + D.text(A[0] + 10, A[1] + 4, "A", { weight: 700 }) + D.text(B[0] - 22, B[1] + 4, "B", { weight: 700 }) +
    D.path_(`M${O[0] - 45 * Math.sin(th / 2)},${O[1] - 45 * Math.cos(th / 2)} A45,45 0 0 1 ${O[0] + 45 * Math.sin(th / 2)},${O[1] - 45 * Math.cos(th / 2)}`, { stroke: C.amber, width: 2 }) +
    D.text(O[0], O[1] - 62, "1.4 rad", { anchor: "middle", weight: 700, size: 15, fill: C.amber }) +
    D.text((O[0] + A[0]) / 2 + 16, (O[1] + A[1]) / 2 + 20, "10 cm", { size: 15 }) +
    D.tag(280, 96, `arc = ${r * th} cm`, { anchor: "middle", fill: C.blue }) +
    D.tag(280, A[1] + 44, `chord AB = ${chord.toFixed(1)} cm`, { anchor: "middle", fill: C.amber }) +
    D.tag(280, A[1] + 78, `segment = ${seg.toFixed(1)} cm²`, { anchor: "middle", size: 13 });
  await fig("circular/compound-shapes", "sector-segment-chord", D.svg(560, 380, b),
    "Sector OAB with radius 10 cm and angle 1.4 radians: the chord AB is 12.9 cm, the arc is 14 cm, and the shaded minor segment between the chord and the arc has area 20.7 square centimetres (sector area minus triangle area).",
    "Figure: the minor segment lies between the chord AB and the arc AB", { block: "Example 1" });
}
console.log("circular diagrams written");
