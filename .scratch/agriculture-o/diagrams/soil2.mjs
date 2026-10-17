// agriculture-o soil conservation diagrams. Run: node .scratch/agriculture-o/diagrams/soil2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const BROWN = "#7a5a2f";

// ---------------------------------------------------------------- field plan: storm drain, 8 contour ridges 25 m apart, grass waterway
{
  const rise = 2, run = 50, length = 200, vi = 1.0;
  const slopePct = (rise / run) * 100; // 4
  const spacing = (vi / slopePct) * 100; // 25
  const nRidges = length / spacing; // 8
  if (slopePct !== 4 || spacing !== 25 || nRidges !== 8) throw new Error("ridge numbers");
  const W = 640, H = 480;
  const x0 = 80, x1 = 410, y0 = 70, ppm = 1.8; // px per metre down the slope
  let b = "";
  const yb = y0 + length * ppm;
  b += D.rect(x0, y0, x1 - x0, yb - y0, { fill: "#f5efe0", stroke: C.axis, width: 1.4 });
  // waterway on the right
  b += D.rect(x1, y0 - 10, 44, yb - y0 + 30, { fill: "#d6ecc6", stroke: C.green, width: 1.6 });
  b += D.text(x1 + 27, y0 + 100, "Grass waterway", { size: 13, anchor: "middle", fill: C.green, weight: 700, rotate: 90 });
  b += D.arrow(x1 + 22, yb - 40, x1 + 22, yb + 18, { stroke: C.blue, width: 2 });
  b += D.text(x1 + 22, yb + 36, "to the stream", { size: 12, anchor: "middle", fill: C.blue });
  // storm drain
  b += D.line(x0 - 10, y0, x1, y0 + 8, { stroke: C.blue, width: 5 });
  b += D.text(x0 + 60, y0 + 30, "Storm drain (built first)", { size: 13, weight: 700, fill: C.blue });
  for (const x of [120, 200, 280, 360]) b += D.arrow(x, 28, x, y0 - 8, { stroke: C.blue, width: 1.6 });
  b += D.text(x0, 20, "runoff from higher land", { size: 12, fill: C.blue });
  // ridges
  for (let k = 1; k <= nRidges; k += 1) {
    const y = y0 + k * spacing * ppm;
    b += D.line(x0, y, x1, y + 8, { stroke: BROWN, width: 4 });
    b += D.arrow(x0 + 120, y - 12, x0 + 120, y - 2, { stroke: C.blue, width: 1.4 });
    b += D.arrow(x0 + 260, y - 8, x0 + 260, y + 4, { stroke: C.blue, width: 1.4 });
  }
  b += D.text(x0 + 6, y0 + 3 * spacing * ppm - 8, "Ridge 3", { size: 12, fill: BROWN, weight: 700 });
  // dimensions
  const yA = y0 + 4 * spacing * ppm, yB = y0 + 5 * spacing * ppm;
  b += D.line(x0 - 24, yA, x0 - 24, yB, { stroke: C.red, width: 1.6, arrow: true, arrowStart: true });
  b += D.text(x0 - 30, (yA + yB) / 2 + 4, `${spacing} m`, { size: 13, anchor: "end", fill: C.red, weight: 700 });
  b += D.line(x0 - 6, yb + 12, x0 - 6, y0, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true });
  b += D.text(x0 - 12, y0 + 110, `${length} m`, { size: 13, anchor: "end", weight: 700 });
  // key facts on the right
  const rx = 478;
  b += D.text(rx, 130, "Uphill", { size: 13, weight: 700 }) + D.text(rx, 148, "is at the top", { size: 12, fill: C.muted });
  b += D.text(rx, 200, `Slope: ${rise} m rise in ${run} m`, { size: 13 }) + D.text(rx, 218, `= ${slopePct}%`, { size: 13, weight: 700 });
  b += D.text(rx, 262, `Vertical interval ${vi.toFixed(1)} m`, { size: 13 }) + D.text(rx, 280, `spacing = ${vi.toFixed(1)} / ${slopePct} x 100`, { size: 13 }) + D.text(rx, 298, `= ${spacing} m`, { size: 13, weight: 700 });
  b += D.text(rx, 342, `${length} m / ${spacing} m`, { size: 13 }) + D.text(rx, 360, `= ${nRidges} ridges`, { size: 13, weight: 700 });
  b += D.text(rx, 404, "Each ridge falls very\ngently to the waterway.", { size: 12, fill: C.muted });
  const alt = "Plan of a 200 m field on a 4% slope: a storm drain along the top keeps runoff from higher land out, eight contour ridges 25 m apart (1.0 m vertical interval divided by 4% slope) cross the slope with a very gentle fall to a grass waterway on the right that leads to the stream.";
  const cap = "Figure: laying out eight contour ridges 25 m apart below a storm drain, draining to a grass waterway";
  await D.figure(FAMILY, "contour-ridges-field-plan", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/soil/conservation.md`, "A field rises $2\\ \\text{m}$ over a horizontal distance", D.md("contour-ridges-field-plan", alt, cap));
}

// ---------------------------------------------------------------- cross-section: channel dug uphill, soil thrown downhill
{
  const W = 600, H = 330;
  let b = "";
  const gy = (x) => 70 + 0.2 * (x - 30);
  const ridge = (cx) => {
    // ground profile pieces: channel (notch) then bank (hump) downhill (to the right)
    return { cx };
  };
  const cxs = [150, 400];
  const pts = [];
  for (let x = 30; x <= 570; x += 6) {
    let y = gy(x);
    for (const cx of cxs) {
      if (x >= cx - 20 && x <= cx) y += 16 * Math.sin(((x - (cx - 20)) / 20) * Math.PI); // channel
      if (x > cx && x <= cx + 44) y -= 20 * Math.sin(((x - cx) / 44) * Math.PI); // bank
    }
    pts.push([x, y]);
  }
  b += D.polyline([...pts, [570, 300], [30, 300]], { close: true, fill: "#efe2cc", stroke: "none" });
  b += D.polyline(pts, { stroke: BROWN, width: 3 });
  // grass on banks
  for (const cx of cxs) for (const dx of [10, 22, 34]) { const x = cx + dx; const y = pts.find((p) => p[0] >= x)[1]; b += D.line(x, y, x - 2, y - 10, { stroke: C.green, width: 2 }) + D.line(x + 3, y, x + 5, y - 9, { stroke: C.green, width: 2 }); }
  // runoff arrows
  b += D.arrow(40, 70, 118, 84, { stroke: C.blue, width: 2 });
  b += D.text(40, 54, "runoff from above", { size: 12, fill: C.blue });
  b += D.arrow(150, 80, 150, 96, { stroke: C.blue, width: 2 });
  // labels
  b += D.text(40, 215, "Channel holds the water and\ncarries it to the waterway", { size: 12, fill: C.muted });
  b += D.line(100, 266, 138, 112, { stroke: C.muted, width: 1 });
  b += D.text(196, 62, "Bank: soil thrown", { size: 12, fill: C.muted }) + D.text(196, 76, "DOWNHILL, grassed", { size: 12, fill: C.muted });
  b += D.line(180, 78, 176, 84, { stroke: C.muted, width: 1 });
  // dimensions between channel bottoms
  const yA = gy(cxs[0] - 10) + 16, yB = gy(cxs[1] - 10) + 16;
  b += D.line(cxs[0] - 10, yA, cxs[1] - 10, yA, { stroke: C.red, width: 1.6, dash: true });
  b += D.line(cxs[1] - 10, yA, cxs[1] - 10, yB, { stroke: C.red, width: 2, arrow: true });
  b += D.text(cxs[1] - 18, (yA + yB) / 2 + 2, "vertical interval 1.0 m", { size: 13, fill: C.red, weight: 700, anchor: "end" });
  b += D.line(cxs[0] - 10, yA + 80, cxs[1] - 10, yA + 80, { stroke: C.axis, width: 1.6, arrow: true, arrowStart: true });
  b += D.text((cxs[0] + cxs[1]) / 2 - 10, yA + 102, "horizontal spacing 25 m on a 4% slope", { size: 13, anchor: "middle", weight: 700 });
  b += D.text(30, 320, "Not to scale: the slope and ridges are exaggerated so that they can be seen.", { size: 12, fill: C.muted });
  const alt = "Cross-section of two contour ridges on a slope: each has a channel dug on the uphill side that catches runoff and a grassed bank of the excavated soil thrown downhill; the ridges are 1.0 m apart in height (vertical interval) and 25 m apart horizontally on a 4% slope.";
  const cap = "Figure: a cross-section of two contour ridges, with the vertical interval and horizontal spacing";
  await D.figure(FAMILY, "contour-ridge-cross-section", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/soil/conservation.md`, "The design figures (channel size, gradient and spacing", D.md("contour-ridge-cross-section", alt, cap));
}
console.log("soil2 done");
