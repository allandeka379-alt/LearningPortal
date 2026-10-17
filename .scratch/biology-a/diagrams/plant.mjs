// biology-a plant transport: root water potentials, root pathways, potometer, stomatal aperture, xylem and phloem cells.
// Run: node .scratch/biology-a/diagrams/plant.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const head = (x1, y1, x2, y2, col, s = 10) => { const a = Math.atan2(y2 - y1, x2 - x1); return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
const arr = (x1, y1, x2, y2, col = C.ink, w = 2.4, dash = false) => D.line(x1, y1, x2, y2, { stroke: col, width: w, dash }) + head(x1, y1, x2, y2, col);
const lead = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2 });

// ---- Water potential from soil to xylem (worked solution of water-uptake)
{
  const rows = [["Soil water", -30, 0, -30], ["Root hair cell", -620, 280, -340], ["Cortex cell", -700, 300, -400], ["Xylem sap", -150, -400, -550]];
  for (const [n, s, p, w] of rows) if (s + p !== w) throw new Error("water potential " + n);
  const w = 600, h = 430;
  const ax = D.axes({ x: [0, 4], y: [-750, 400], w, h, xTicks: [], yTicks: [-600, -400, -200, 0, 200, 400], yLabel: "Potential / kPa", pad: { l: 70, r: 20, t: 52, b: 70 }, arrows: false });
  let b = ax.frame;
  const cols = [C.amber, C.teal, C.blue], names = ["Solute potential", "Pressure potential", "Water potential"];
  rows.forEach(([name, s, p, wp], i) => {
    [s, p, wp].forEach((v, k) => {
      const x0 = ax.X(i + 0.14 + k * 0.24), x1 = ax.X(i + 0.14 + k * 0.24 + 0.22);
      const y0 = ax.Y(0), y1 = ax.Y(v);
      b += D.rect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0), { fill: cols[k], stroke: "none" });
      b += D.text((x0 + x1) / 2, v >= 0 ? y1 - 5 : y1 + 15, (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v), { anchor: "middle", size: 11, fill: C.ink });
    });
    b += T(ax.X(i + 0.5), ax.Y(-750) + 22, name, { size: 13, weight: 700 });
  });
  names.forEach((n, k) => { b += D.rect(70 + k * 170, 12, 14, 14, { fill: cols[k], stroke: "none" }) + D.text(90 + k * 170, 24, n, { size: 13 }); });
  const alt = "Potentials in kPa from soil to xylem: soil water −30 (solute −30, pressure 0); root hair cell −340 (−620 + 280); cortex cell −400 (−700 + 300); xylem sap −550 (−150 + −400). Water potential falls steadily inwards, so water moves by osmosis down the gradient, and the negative pressure in the xylem shows tension.";
  const cap = "Figure: solute, pressure and water potential at four places across a root (values from the worked solution)";
  await fig("root-water-potential-gradient", D.svg(w, h, b), alt, cap, "plant-transport/water-uptake", "| Xylem sap | −150 | −400 | −550 |");
}

// ---- Root cross-section: three pathways and the Casparian strip
{
  const w = 640, h = 410, yT = 40, yM = 120, yB = 200; // two rows of cells
  let b = "";
  const cols = [[90, 140, "epi"], [140, 190, "c"], [190, 240, "c"], [240, 290, "c"], [290, 340, "c"], [340, 390, "end"], [390, 440, "peri"], [440, 500, "xyl"]];
  for (const [x0, x1, kind] of cols) for (const [y0, y1] of [[yT, yM], [yM, yB]]) {
    if (kind === "xyl") { b += D.rect(x0, y0, x1 - x0, y1 - y0, { fill: "#fff", stroke: C.axis, width: 2.5 }) + D.rect(x0 + 8, y0 + 8, x1 - x0 - 16, y1 - y0 - 16, { fill: C.fillBlue, stroke: C.blue, width: 1.2, dash: true }); continue; }
    b += D.rect(x0, y0, x1 - x0, y1 - y0, { fill: kind === "end" ? C.fillGreen : "#fdfbf7", stroke: C.axis, width: 1.8 });
    b += D.rect(x0 + 7, y0 + 32, x1 - x0 - 14, y1 - y0 - 40, { fill: C.fillBlue, stroke: C.blue, width: 1, r: 6 });
  }
  // plasmodesmata in vertical walls
  for (const [x0] of cols.slice(1, 7)) for (const [y0] of [[yT], [yM]]) b += D.dot(x0, y0 + 48, { r: 3, stroke: C.blue });
  // root hair and soil
  b += D.path_("M90,150 C60,150 30,160 14,176 C30,192 60,202 90,202", { stroke: C.axis, width: 2.2, fill: "#fdfbf7" });
  for (const [x, y] of [[30, 90], [60, 110], [20, 240], [50, 262], [76, 240], [34, 120]]) b += D.circle(x, y, 9, { fill: C.fillGrey, stroke: C.muted, width: 1.5 });
  b += T(55, 296, "soil water", { size: 12, fill: C.muted }).replace("", "") + "";
  // Casparian strip: waterproof band across the wall (y = yM) of the endodermis
  b += D.line(340, yM, 390, yM, { stroke: C.red, width: 7 });
  // apoplast (along the wall, y = yM)
  b += arr(110, yM, 336, yM, C.amber, 3) + arr(340, yM + 4, 356, yM + 34, C.amber, 3);
  // symplast (cytoplasm band, via plasmodesmata)
  b += arr(96, yM + 20, 436, yM + 20, C.blue, 3).replace("", "");
  // vacuolar (through vacuoles)
  b += arr(96, yB - 24, 436, yB - 24, C.purple, 3, true).replace("", "");
  // labels
  const lg = (x, y, col, s, dash = false) => D.line(x, y - 4, x + 40, y - 4, { stroke: col, width: 3, dash: dash ? "5 4" : false }) + D.text(x + 48, y, s, { size: 13 });
  b += lg(20, 340, C.amber, "Apoplast: along cell walls") + lg(20, 362, C.blue, "Symplast: cytoplasm, via plasmodesmata") + lg(20, 384, C.purple, "Vacuolar: through the vacuoles", true);
  b += D.line(400, 336, 440, 336, { stroke: C.red, width: 6 }) + D.text(448, 340, "Casparian strip", { size: 13 });
  b += D.text(400, 362, "Apoplast water is blocked at", { size: 12, fill: C.muted }) + D.text(400, 378, "the strip and must enter the", { size: 12, fill: C.muted }) + D.text(400, 394, "endodermis cell.", { size: 12, fill: C.muted });
  const under = [[115, "root hair cell", 214], [215, "cortex", 214], [315, "cortex", 214], [365, "endodermis", 232], [415, "pericycle", 214], [470, "xylem", 214]];
  for (const [x, s, y] of under) b += T(x, y + 14, s, { size: 12 });
  const alt = "Root cross-section from soil to xylem: water enters the root hair cell and crosses the cortex by the apoplast pathway along cell walls, the symplast pathway through cytoplasm and plasmodesmata and the vacuolar pathway through vacuoles; at the endodermis the Casparian strip blocks the apoplast route so water must pass through the cell surface membrane before reaching the xylem.";
  const cap = "Figure: the three pathways for water across the root cortex, and the Casparian strip in the endodermis";
  await fig("root-water-pathways", D.svg(w, h, b), alt, cap, "plant-transport/water-uptake", "3. **Vacuolar pathway.**");
}

// ---- Potometer, with the lesson's worked example (r = 0.5 mm, 42 mm in 5 min)
{
  const r = 0.5, l = 42, t = 5;
  const V = Math.PI * r * r * l, rate = V / t;
  if (V.toFixed(1) !== "33.0" || rate.toFixed(2) !== "6.60") throw new Error("potometer " + V + " " + rate);
  const w = 640, h = 380;
  let b = "";
  // water-filled glass: vertical tube (shoot tube), horizontal capillary, reservoir arm
  b += D.rect(100, 120, 40, 150, { fill: C.fillBlue, stroke: C.axis, width: 2.5 }); // shoot tube
  b += D.rect(100, 252, 460, 18, { fill: C.fillBlue, stroke: C.axis, width: 2.5 }); // capillary + connecting bar
  b += D.rect(540, 252, 20, 80, { fill: C.fillBlue, stroke: C.axis, width: 2.5 }); // right arm
  b += D.rect(500, 330, 100, 28, { fill: C.fillBlue, stroke: C.axis, width: 2.5, r: 4 }); // beaker
  b += D.rect(190, 200, 18, 52, { fill: C.fillBlue, stroke: C.axis, width: 2.5 }) + D.rect(180, 192, 38, 10, { fill: C.fillGrey, stroke: C.axis, width: 2 }); // reservoir tube and tap
  // bung and shoot
  b += D.rect(94, 110, 52, 14, { fill: C.fillAmber, stroke: C.amber, width: 2, r: 3 });
  b += D.line(120, 112, 120, 230, { stroke: C.green, width: 4 });
  b += D.path_("M120,112 C115,90 95,80 80,60 M120,100 C128,80 150,72 164,52 M120,86 C112,70 90,60 84,40", { stroke: C.green, width: 3 }) + ellipse(80, 54, 22, 11, { fill: C.fillGreen, stroke: C.green, width: 1.5, rotate: -40 }) + ellipse(166, 48, 22, 11, { fill: C.fillGreen, stroke: C.green, width: 1.5, rotate: 40 }) + ellipse(88, 34, 20, 10, { fill: C.fillGreen, stroke: C.green, width: 1.5, rotate: -10 });
  // air bubble and scale along the capillary
  b += D.rect(336, 255, 28, 12, { fill: "#fff", stroke: C.ink, width: 1.5, r: 6 });
  for (let i = 0; i <= 40; i += 1) b += D.line(240 + i * 7, 272, 240 + i * 7, i % 5 === 0 ? 284 : 278, { stroke: C.axis, width: 1.2 });
  b += T(240, 300, "0", { size: 11 }) + T(240 + 20 * 7, 300, "20", { size: 11 }) + T(240 + 40 * 7, 300, "40 mm", { size: 11 });
  // labels
  b += D.text(200, 34, "Leafy shoot cut under water", { size: 13 }) + lead(198, 30, 172, 46);
  b += D.text(230, 112, "Bung sealed with", { size: 13 }) + D.text(230, 128, "petroleum jelly", { size: 13 }) + lead(228, 120, 146, 118);
  b += D.text(250, 176, "Reservoir with tap (resets the bubble)", { size: 13 }) + lead(248, 180, 218, 196);
  b += D.text(350, 246, "Air bubble", { size: 13, anchor: "middle" });
  b += D.text(440, 230, "Capillary tube, bore radius", { size: 13 }) + D.text(440, 246, "0.5 mm", { size: 13 });
  b += D.text(10, 346, `Worked example: bubble moves ${l} mm in ${t} min`, { size: 13, weight: 700 }) + D.text(10, 364, `V = π × ${r}² × ${l} = ${V.toFixed(1)} mm³; rate = ${rate.toFixed(2)} mm³ min⁻¹`, { size: 13, weight: 700 });
  b += D.text(600, 376, "Beaker of water", { size: 13, anchor: "end" });
  const alt = "Bubble potometer: a leafy shoot cut under water is fixed with an airtight bung into a water-filled tube joined to a horizontal capillary with a scale and an air bubble; as the shoot takes up water the bubble moves along the scale, and with a bore radius of 0.5 mm a movement of 42 mm in 5 minutes means 33.0 mm3 of water, or 6.60 mm3 per minute.";
  const cap = "Figure: a bubble potometer and the calculation of the rate of water uptake from the distance moved";
  await fig("potometer-apparatus", D.svg(w, h, b), alt, cap, "plant-transport/transpiration", "The volume of water taken up is the volume of the capillary tube");
}

// ---- Stomatal aperture through the day (table of the stomata lesson)
{
  const hrs = [4, 6, 8, 10, 12, 14, 16, 18, 20], ap = [0.5, 2.0, 6.5, 8.0, 7.5, 4.0, 5.5, 2.5, 0.5];
  const ax = D.axes({ x: [4, 20], y: [0, 9], w: 600, h: 400, xTicks: hrs, yTicks: 1, xLabel: "Time of day / h (24-hour clock)", yLabel: "Mean stomatal aperture / µm", pad: { l: 70, r: 28, t: 40, b: 58 }, xFormat: (v) => String(v).padStart(2, "0") + ":00" });
  let b = ax.frame + ax.line(hrs.map((x, i) => [x, ap[i]]), { stroke: C.blue });
  hrs.forEach((x, i) => { b += ax.point(x, ap[i], { stroke: C.blue, r: 3.5 }); });
  b += ax.tag(10, 8.0, "maximum 8.0 µm at 10:00", { dx: 10, dy: -6 }).replace("", "") + ax.tag(14, 4.0, "partial closure at 14:00", { dx: -10, dy: 34, anchor: "middle" });
  const alt = "Mean stomatal aperture through a hot sunny day: about 0.5 micrometres at 04:00, opening to a maximum of 8.0 at 10:00, falling to 4.0 at 14:00 as water stress closes some stomata, rising again to 5.5 at 16:00, then closing to 0.5 by 20:00.";
  const cap = "Figure: stomatal aperture through the day, from the lesson's table";
  await fig("stomatal-aperture-day", D.svg(600, 400, b), alt, cap, "homeostasis/stomata", "| Mean stomatal aperture / µm");
}

// ---- Xylem vessel and phloem (sieve tube + companion cell)
{
  const w = 640, h = 400;
  let b = "";
  // xylem vessel elements: stacked tubes without end walls
  const x0 = 40, wd = 90;
  b += D.rect(x0, 50, wd, 250, { fill: C.fillBlue, stroke: C.axis, width: 3 });
  for (let y = 70; y < 290; y += 22) b += D.line(x0 + 1, y, x0 + wd - 1, y, { stroke: C.amber, width: 5 });
  b += D.rect(x0 + wd - 4, 120, 10, 24, { fill: "#fff", stroke: C.axis, width: 1.5 }) + D.rect(x0 - 6, 200, 10, 24, { fill: "#fff", stroke: C.axis, width: 1.5 });
  b += D.line(x0, 175, x0 + wd, 175, { stroke: C.muted, width: 1.4, dash: "3 4" });
  b += T(x0 + wd / 2, 24, "Xylem vessel", { weight: 700, size: 14 }) + T(x0 + wd / 2, 322, "dead, empty tube", { size: 12 }) + T(x0 + wd / 2, 338, "strong, waterproof lignin walls;", { size: 12, fill: C.muted }) + T(x0 + wd / 2, 352, "no end walls (dashed line)", { size: 12, fill: C.muted });
  b += D.text(148, 100, "lignin rings", { size: 13 }) + lead(146, 96, 128, 92);
  b += D.text(148, 140, "pit", { size: 13 }) + lead(146, 136, 134, 132);
  b += D.text(148, 255, "narrow lumen", { size: 13 }) + lead(146, 251, 120, 245);
  // phloem: two sieve tube elements with a sieve plate and a companion cell
  const sx = 410, sw = 60;
  b += D.rect(sx, 50, sw, 120, { fill: "#fdfbf7", stroke: C.axis, width: 2.5 }) + D.rect(sx, 190, sw, 110, { fill: "#fdfbf7", stroke: C.axis, width: 2.5 });
  b += D.rect(sx - 2, 170, sw + 4, 20, { fill: C.fillGrey, stroke: C.axis, width: 2 });
  for (let i = 0; i < 5; i += 1) b += D.line(sx + 7 + i * 11, 172, sx + 7 + i * 11, 188, { stroke: C.axis, width: 1.4 });
  b += D.rect(sx + sw + 10, 50, 56, 250, { fill: C.fillAmber, stroke: C.axis, width: 2.5, r: 10 });
  b += ellipse(sx + sw + 38, 130, 15, 24, { fill: C.fillBlue, stroke: C.blue, width: 1.8 }) + ellipse(sx + sw + 38, 210, 10, 5, { fill: C.fillGreen, stroke: C.green, width: 1.5 }) + ellipse(sx + sw + 38, 235, 10, 5, { fill: C.fillGreen, stroke: C.green, width: 1.5 });
  b += D.line(sx + sw, 100, sx + sw + 10, 100, { stroke: C.blue, width: 3 }) + D.line(sx + sw, 250, sx + sw + 10, 250, { stroke: C.blue, width: 3 });
  b += T(sx + sw + 30, 24, "Phloem", { weight: 700, size: 14 });
  b += D.text(sx - 14, 112, "sieve tube element:", { size: 13, anchor: "end" }) + D.text(sx - 14, 128, "no nucleus, thin", { size: 13, anchor: "end" }) + D.text(sx - 14, 144, "cytoplasm", { size: 13, anchor: "end" });
  b += D.text(sx - 8, 186, "sieve plate (pores)", { size: 13, anchor: "end" }) + lead(sx - 6, 182, sx + 6, 180);
  b += D.text(sx + sw + 72, 130, "nucleus", { size: 13 }) + lead(sx + sw + 72, 126, sx + sw + 52, 130);
  b += D.text(sx + sw + 72, 230, "mitochondria", { size: 13 }) + lead(sx + sw + 72, 226, sx + sw + 52, 222);
  b += D.text(sx + sw + 72, 280, "companion cell", { size: 13, weight: 700 });
    b += D.text(sx + sw + 72, 100, "plasmodesmata", { size: 12, fill: C.blue }) + lead(sx + sw + 70, 96, sx + sw + 10, 100);
  const alt = "Two conducting tissues compared: a xylem vessel is a dead empty tube with lignin rings, pits and no end walls, so water flows as a continuous column; phloem has living sieve tube elements joined by sieve plates with no nucleus and little cytoplasm, next to a companion cell with a nucleus and many mitochondria connected by plasmodesmata.";
  const cap = "Figure: structure of a xylem vessel and of phloem (sieve tube elements with a companion cell)";
  await fig("xylem-phloem-structure", D.svg(w, h, b), alt, cap, "plant-transport/tissues", "| Many plasmodesmata between companion cell and sieve tube element");
}
