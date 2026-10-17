// geography-o second pass: agriculture and land diagrams. Run from repo root: node .scratch/geography-o/diagrams/agri2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, figBefore, poly, SOIL, SAND, GRASS, ROCK } from "./kit2.mjs";

// ---------- 1. Irrigation scheme layout and a centre pivot (agriculture/farming-types.md)
{
  // worked example in the lesson: 40 ha irrigated with 6 mm a day, 1 mm over 1 ha = 10 m3
  const ha = 40, mm = 6, daily = ha * mm * 10, season = daily * 90;
  const radius = Math.sqrt((ha * 10000) / Math.PI); // metres, from the area of the circle
  let b = D.rect(4, 4, 340, 372, { stroke: C.grid, width: 1.5 }) + D.text(14, 24, "A  Canal irrigation scheme (plan view)", { weight: 700, size: 13.5 });
  b += D.path_("M26,62 C 40,42 100,42 120,66 C 134,96 110,120 70,116 C 30,112 10,92 26,62 Z", { fill: "#a9d6e5", stroke: C.blue, width: 2 });
  b += D.text(66, 86, "Dam", { anchor: "middle", weight: 700, size: 13, fill: C.blue }) + D.text(66, 102, "(reservoir)", { anchor: "middle", size: 12, fill: C.blue });
  b += D.line(118, 62, 124, 112, { stroke: C.axis, width: 6 });
  b += D.path_("M124,90 L322,90", { stroke: C.blue, width: 3, arrow: true }) + D.text(222, 80, "Main canal", { anchor: "middle", size: 12.5, fill: C.blue, weight: 600 });
  const cx = [170, 235, 300], edges = [128, 164, 176, 229, 241, 294, 306, 340];
  for (let i = 0; i < edges.length; i += 2) b += D.rect(edges[i], 112, edges[i + 1] - edges[i], 120, { fill: C.fillGreen, stroke: C.green, width: 1.4 });
  for (const x of cx) b += D.path_(`M${x},90 L${x},244`, { stroke: C.blue, width: 2.4, arrow: true });
  b += D.text(248, 272, "Secondary canals water the fields", { anchor: "middle", size: 12.5, fill: C.blue });
  b += D.path_("M110,262 L110,300 L320,300", { stroke: C.muted, width: 2.4, dash: true, arrow: true }) + D.text(214, 322, "Drain carries away extra water", { anchor: "middle", size: 12.5, fill: C.muted });
  b += D.text(14, 352, "Poor drainage: waterlogging and salt build-up.", { size: 12.5, fill: C.red });
  b += D.rect(350, 4, 206, 372, { stroke: C.grid, width: 1.5 }) + D.text(358, 24, "B  Centre pivot", { weight: 700, size: 13.5 });
  const pcx = 453, pcy = 150, pr = 86;
  b += D.rect(pcx - pr, pcy - pr, pr * 2, pr * 2, { fill: "#f4f1ec", stroke: C.grid, width: 1.2 }) + D.circle(pcx, pcy, pr, { fill: C.fillGreen, stroke: C.green, width: 2 });
  b += D.line(pcx, pcy, pcx + pr * Math.cos(-0.6), pcy + pr * Math.sin(-0.6), { stroke: C.axis, width: 3 }) + D.dot(pcx, pcy, { stroke: C.axis, r: 5 });
  for (let k = 1; k <= 6; k++) b += D.dot(pcx + ((pr * k) / 6) * Math.cos(-0.6), pcy + ((pr * k) / 6) * Math.sin(-0.6), { stroke: C.blue, r: 2.6 });
  b += D.text(pcx - 8, pcy + 22, "arm turns", { anchor: "end", size: 12 }) + D.text(pcx - 8, pcy + 36, "round", { anchor: "end", size: 12 });
  b += D.text(pcx, 262, `Area ${ha} ha`, { anchor: "middle", size: 12.5, weight: 600 }) + D.text(pcx, 280, `radius about ${Math.round(radius)} m`, { anchor: "middle", size: 12.5 });
  b += D.text(pcx, 304, `${mm} mm a day`, { anchor: "middle", size: 12.5 }) + D.text(pcx, 322, `${ha} × ${mm} × 10 = ${daily.toLocaleString("en-GB")} m³`, { anchor: "middle", size: 12.5 });
  b += D.text(pcx, 340, `a day; ${season.toLocaleString("en-GB")} m³ in 90 days`, { anchor: "middle", size: 12.5 });
  b += D.text(pcx, 364, "(circle not to scale)", { anchor: "middle", size: 11.5, fill: C.muted });
  await figBefore("irrigation-canal-pivot",
    D.svg(560, 380, b),
    `Two irrigation layouts: a dam feeds a main canal and secondary canals that water fields, with a drain to prevent waterlogging; and a centre pivot irrigating a circle of ${ha} ha (radius about ${Math.round(radius)} m) with ${mm} mm a day, which is ${daily.toLocaleString("en-GB")} cubic metres a day.`,
    "Figure: a canal irrigation scheme and a centre pivot (worked example: 40 ha at 6 mm a day)",
    "agriculture/farming-types", "**Methods:** surface (flood");
}

// ---------- 2. Sheet, rill and gully erosion (environment/land-degradation.md)
{
  const W = 560, H = 250, pw = 180;
  let b = "";
  const panel = (i, title) => { const ox = 4 + i * (pw + 4); return [ox, D.rect(ox, 4, pw, 210, { stroke: C.grid, width: 1.5 }) + D.text(ox + pw / 2, 24, title, { anchor: "middle", weight: 700, size: 13.5 })]; };
  const base = 120; // original ground level
  {
    const [ox, p] = panel(0, "Sheet erosion"); b += p;
    b += D.rect(ox + 1, base + 14, pw - 2, 80, { fill: SOIL, stroke: "none" }) + D.line(ox + 1, base + 14, ox + pw - 1, base + 14, { stroke: "#8a6a3b", width: 2.4 });
    b += D.line(ox + 1, base, ox + pw - 1, base, { stroke: C.muted, width: 1.4, dash: true }) + D.text(ox + pw / 2, base - 8, "original surface", { anchor: "middle", size: 12, fill: C.muted });
    b += D.arrow(ox + pw / 2, base + 4, ox + pw / 2, base + 12, { stroke: C.red, width: 2 });
    b += D.text(ox + pw / 2, 164, "thin layer of topsoil", { anchor: "middle", size: 12 }) + D.text(ox + pw / 2, 180, "removed evenly", { anchor: "middle", size: 12 });
  }
  {
    const [ox, p] = panel(1, "Rill erosion"); b += p;
    let pts = [[ox + 1, base]];
    for (const x of [36, 70, 104, 138]) pts.push([ox + x - 6, base], [ox + x, base + 16], [ox + x + 6, base]);
    pts.push([ox + pw - 1, base], [ox + pw - 1, base + 90], [ox + 1, base + 90]);
    b += poly(pts, { fill: SOIL, stroke: "#8a6a3b", width: 2.4 });
    b += D.text(ox + pw / 2, 164, "many small channels,", { anchor: "middle", size: 12 }) + D.text(ox + pw / 2, 180, "a few cm deep:", { anchor: "middle", size: 12 }) + D.text(ox + pw / 2, 196, "a plough can smooth them", { anchor: "middle", size: 12 });
  }
  {
    const [ox, p] = panel(2, "Gully erosion"); b += p;
    const pts = [[ox + 1, base], [ox + 50, base], [ox + 80, base + 84], [ox + 100, base + 84], [ox + 130, base], [ox + pw - 1, base], [ox + pw - 1, base + 90], [ox + 1, base + 90]];
    b += poly(pts, { fill: SOIL, stroke: "#8a6a3b", width: 2.4 });
    b += D.text(ox + 8, 52, "deep steep-sided channel,", { size: 12 }) + D.text(ox + 8, 68, "metres deep: cannot be", { size: 12 }) + D.text(ox + 8, 84, "ploughed across", { size: 12 });
  }
  b += D.text(280, 238, "Cross-sections across a slope: erosion gets deeper from sheet to rill to gully. Not drawn to scale.", { anchor: "middle", size: 12, fill: C.muted });
  await fig("erosion-sheet-rill-gully",
    D.svg(W, 248, b),
    "Cross-sections of three forms of water erosion: sheet erosion removes a thin even layer of topsoil, rill erosion cuts many small channels a few centimetres deep that a plough can smooth, and gully erosion cuts a deep steep-sided channel that cannot be ploughed across.",
    "Figure: sheet, rill and gully erosion compared",
    "environment/land-degradation", "3. **Gully erosion**");
}

// ---------- 3. Contour ridges and terraces (environment/land-degradation.md)
{
  const W = 560, H = 290;
  let b = D.rect(4, 4, 272, 250, { stroke: C.grid, width: 1.5 }) + D.text(14, 24, "A  Contour ridges (gentle slope)", { weight: 700, size: 13.5 });
  b += D.rect(280, 4, 276, 250, { stroke: C.grid, width: 1.5 }) + D.text(290, 24, "B  Terraces (steep slope)", { weight: 700, size: 13.5 });
  // A: even slope descending to the right, with ridges that slow runoff
  const slopeA = (x) => 80 + (x - 12) * 0.22;
  let pa = [[12, slopeA(12)]];
  for (const x of [60, 120, 180, 240]) pa.push([x - 8, slopeA(x - 8)], [x, slopeA(x) - 14], [x + 8, slopeA(x + 8)]);
  pa.push([268, slopeA(268)], [268, 240], [12, 240]);
  b += poly(pa, { fill: SOIL, stroke: "#8a6a3b", width: 2.4 });
  for (const x of [48, 108, 168, 228]) b += D.arrow(x, slopeA(x) - 26, x + 28, slopeA(x + 28) - 14, { stroke: C.blue, width: 1.8 });
  b += D.text(140, 200, "Ridges follow the contours: runoff slows,", { anchor: "middle", size: 12 }) + D.text(140, 216, "soil is trapped, water soaks in.", { anchor: "middle", size: 12 }) + D.text(140, 234, "Ridges must be maintained.", { anchor: "middle", size: 12, fill: C.red });
  // B: steep slope cut into level steps
  let pb = [[288, 70]];
  const steps = 5, sw = 50, sh = 28;
  for (let i = 0; i < steps; i++) pb.push([288 + i * sw, 70 + i * sh], [288 + (i + 1) * sw - 12, 70 + i * sh]);
  pb.push([288 + steps * sw - 12, 70 + steps * sh], [548, 70 + steps * sh], [548, 240], [288, 240]);
  b += poly(pb, { fill: SOIL, stroke: "#8a6a3b", width: 2.4 });
  for (let i = 0; i < steps; i++) b += D.line(288 + i * sw + 4, 70 + i * sh - 4, 288 + (i + 1) * sw - 16, 70 + i * sh - 4, { stroke: C.green, width: 3 });
  b += D.text(420, 200, "Steep slope cut into level steps:", { anchor: "middle", size: 12 }) + D.text(420, 216, "very effective but needs a lot", { anchor: "middle", size: 12 }) + D.text(420, 232, "of labour to build and repair.", { anchor: "middle", size: 12, fill: C.red });
  b += D.text(280, 276, "Side views of the ground. Green: crops on the level steps.", { anchor: "middle", size: 12, fill: C.muted });
  await figBefore("contour-ridges-terraces",
    D.svg(W, H, b),
    "Side views of two soil conservation methods: contour ridges across a gentle slope slow the runoff and trap soil but must be maintained, while terraces cut a steep slope into level steps that are very effective but need much labour to build and repair.",
    "Figure: contour ridges and terraces",
    "environment/land-degradation", "A **sustainable** method protects");
}
