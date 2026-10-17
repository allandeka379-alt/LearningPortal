// Run: node .scratch/mathematics-a/diagrams/trigvec.mjs   (lessons are hand-written .md, not generated)
import { D, C, fig, PI } from "./_h.mjs";

// trig/radians-arcs-sectors Example 4: r = 6, theta = 2pi/3, minor segment
{
  const r = 6, th = (2 * PI) / 3, R = 140, cx = 270, cy = 50;
  const half = th / 2;
  const A = [cx - R * Math.sin(half), cy + R * Math.cos(half)];
  const B = [cx + R * Math.sin(half), cy + R * Math.cos(half)];
  const seg = `M${A[0]},${A[1]} A${R},${R} 0 0 0 ${B[0]},${B[1]} Z`;
  const sector = `M${cx},${cy} L${A[0]},${A[1]} A${R},${R} 0 0 0 ${B[0]},${B[1]} Z`;
  const chord = 2 * r * Math.sin(half), arc = r * th;
  let body = D.path_(sector, { fill: C.fillGrey, stroke: "none" }) + D.path_(seg, { fill: C.fillAmber, stroke: "none" }) +
    D.path_(`M${A[0]},${A[1]} A${R},${R} 0 0 0 ${B[0]},${B[1]}`, { stroke: C.blue, width: 3 }) +
    D.line(cx, cy, A[0], A[1], { stroke: C.ink }) + D.line(cx, cy, B[0], B[1], { stroke: C.ink }) +
    D.line(A[0], A[1], B[0], B[1], { stroke: C.amber, width: 3 }) +
    D.dot(cx, cy) + D.text(cx, cy - 10, "O", { anchor: "middle", weight: 700 }) +
    D.text(A[0] - 10, A[1] + 6, "A", { anchor: "end", weight: 700 }) + D.text(B[0] + 10, B[1] + 6, "B", { weight: 700 }) +
    D.path_(`M${cx - 26 * Math.sin(half)},${cy + 26 * Math.cos(half)} A26,26 0 0 0 ${cx + 26 * Math.sin(half)},${cy + 26 * Math.cos(half)}`, { stroke: C.ink, width: 1.5 }) +
    D.text(cx, cy + 46, "2π/3", { anchor: "middle", size: 14 }) +
    D.tag((cx + A[0]) / 2 - 8, (cy + A[1]) / 2 - 6, `${r} cm`, { anchor: "end" }) + D.tag((cx + B[0]) / 2 + 8, (cy + B[1]) / 2 - 6, `${r} cm`) +
    D.tag(cx, A[1] + 26, `chord 6√3 = ${chord.toFixed(2)} cm`, { anchor: "middle", fill: C.amber }) +
    D.tag(cx, cy + R + 28, `arc AB = 4π cm (${arc.toFixed(2)})`, { anchor: "middle", fill: C.blue }) +
    D.text(cx, A[1] + 52, "minor segment", { anchor: "middle", size: 14, weight: 700, fill: C.amber });
  await fig("trig/radians-arcs-sectors", "radians-minor-segment-sector", D.svg(540, 250, body),
    "Sector OAB of a circle of radius 6 cm with angle 2π/3 at O: the arc AB is 4π cm (12.57), the chord AB is 6√3 cm (10.39), and the minor segment between chord and arc has area 12π − 9√3 cm², the sector minus triangle OAB.",
    "Figure: the minor segment is the sector OAB minus triangle OAB; arc 4π cm, chord 6√3 cm", { block: "Example 4" });
}

// trig/radians small-angle: y = x, sin x, tan x
{
  const ax = D.axes({ pad: { r: 40, b: 46 }, x: [0, 1.2], y: [0, 1.6], xTicks: 0.2, yTicks: 0.4, w: 540, h: 380, xLabel: "x (radians)", yLabel: "y" });
  const x0 = 0.5;
  const body = ax.frame + ax.plot((x) => Math.tan(x), { stroke: C.red }) + ax.line([[0, 0], [1.2, 1.2]], { stroke: C.ink, width: 2, dash: true }) + ax.plot(Math.sin, { stroke: C.blue }) +
    ax.point(x0, Math.tan(x0), { stroke: C.red }) + ax.point(x0, x0, { stroke: C.ink }) + ax.point(x0, Math.sin(x0), { stroke: C.blue }) +
    ax.tag(1.02, 1.55, "y = tan x", { fill: C.red, dx: -120, dy: 0, anchor: "start" }) + ax.tag(1.0, 1.3, "y = x", { dx: -30 }) + ax.tag(1.2, Math.sin(1.2), "y = sin x", { dx: 4, dy: 28, anchor: "end", fill: C.blue }) +
    ax.tag(x0, Math.tan(x0), `x = 0.5: tan ${Math.tan(x0).toFixed(3)}`, { dx: 12, dy: -18, size: 13 }) + ax.tag(x0, Math.sin(x0), `sin ${Math.sin(x0).toFixed(3)}`, { dx: 12, dy: 28, size: 13 });
  await fig("trig/radians-arcs-sectors", "small-angle-sin-tan-line", D.svg(540, 380, body),
    "Graphs of y = sin x, y = x and y = tan x for x from 0 to 1.2 radians: near zero all three coincide, at x = 0.5 sin x = 0.479, x = 0.5 and tan x = 0.546, and they separate as x grows, so sin x ≈ x and tan x ≈ x only for small x.",
    "Figure: sin x and tan x hug the line y = x near 0 and separate as x grows", { heading: "## Small-angle approximations (ZIMSEC)" });
}

// trig/reciprocal-functions: sec and cosec on 0..360, cot
{
  const rad = (d) => (d * PI) / 180;
  const mk = (f, base, name, asym, dashName, col, y) => {
    const ax = D.axes({ pad: { r: 44, b: 46 }, x: [0, 360], y: [-4, 4], xTicks: 90, yTicks: 1, w: 580, h: 380, yLabel: "y" });
    let b = ax.frame + D.text(ax.X(360), 372, "x (degrees)", { anchor: "end", size: 14, weight: 600 });
    for (const a of asym) b += ax.line([[a, -4], [a, 4]], { stroke: C.muted, width: 1.4, dash: true });
    b += ax.plot(base, { domain: [0, 360], stroke: C.muted, width: 1.8, dash: true, steps: 720 }) + ax.plot(f, { domain: [0, 360], stroke: col, steps: 1440 });
    return { ax, b };
  };
  {
    const { ax, b } = mk((x) => 1 / Math.cos(rad(x)), (x) => Math.cos(rad(x)), "sec", [90, 270], "cos", C.blue);
    const body = b + ax.point(0, 1) + ax.point(180, -1) + ax.point(360, 1) + ax.tag(0, 1, "(0°, 1)", { dx: 10, dy: -14 }) + ax.tag(180, -1, "(180°, −1)", { dx: -40, dy: 26 }) +
      ax.tag(360, 1, "(360°, 1)", { dx: -90, dy: -14 }) + ax.tag(90, 3.5, "x = 90°", { dx: 6, size: 13 }) + ax.tag(270, 3.5, "x = 270°", { dx: 6, size: 13 }) +
      ax.tag(150, 3.4, "y = sec x", { fill: C.blue, weight: 700 }) + ax.tag(275, -3.1, "y = cos x (dashed)", { fill: C.muted, size: 13 });
    await fig("trig/reciprocal-functions", "sec-graph-with-cos", D.svg(580, 380, body),
      "Graph of y = sec x for 0 to 360 degrees drawn from the dashed cosine curve: vertical asymptotes at x = 90 and 270 degrees where cos x = 0, minimum points (0, 1) and (360, 1), a maximum point (180, -1), and no values between -1 and 1.",
      "Figure: y = sec x has asymptotes where cos x = 0 and never lies between −1 and 1", { heading: "The range tells you at once" });
  }
  {
    const { ax, b } = mk((x) => 1 / Math.sin(rad(x)), (x) => Math.sin(rad(x)), "cosec", [0, 180, 360], "sin", C.red);
    const body = b + ax.point(90, 1, { stroke: C.red }) + ax.point(270, -1, { stroke: C.red }) + ax.tag(90, 1, "(90°, 1)", { dx: 8, dy: -12 }) + ax.tag(270, -1, "(270°, −1)", { dx: -30, dy: 28 }) +
      ax.tag(200, 3.4, "y = cosec x", { fill: C.red }) + ax.tag(200, 2.4, "y = sin x (dashed)", { fill: C.muted, size: 13 });
    await fig("trig/reciprocal-functions", "cosec-graph-with-sin", D.svg(580, 380, body),
      "Graph of y = cosec x for 0 to 360 degrees drawn from the dashed sine curve: vertical asymptotes at x = 0, 180 and 360 degrees where sin x = 0, a minimum point (90, 1) and a maximum point (270, -1), so cosec x never lies between -1 and 1.",
      "Figure: y = cosec x has asymptotes where sin x = 0 and turning points (90°, 1) and (270°, −1)", { heading: "Figure: y = sec x has asymptotes" });
  }
}
