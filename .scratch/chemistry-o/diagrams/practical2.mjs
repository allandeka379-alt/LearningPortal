// Run from repo root: node .scratch/chemistry-o/diagrams/practical2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker, conical, roundFlask, condenser, rp } from "./_h.mjs";

// ---- fractional distillation (ethanol 78, water 100)
{
  const x0 = 235, y0 = 130, ang = 14, len = 220;
  const [sx, sy] = rp(x0, y0, ang, -30, 0), [ex, ey] = rp(x0, y0, ang, len + 30, 0);
  const [ox, oy] = rp(x0, y0, ang, 22, -36), [ix, iy] = rp(x0, y0, ang, len - 22, 36);
  let beads = "";
  for (let r = 0; r < 7; r += 1) for (let c = 0; c < 3; c += 1) beads += D.circle(97 + c * 13 + (r % 2) * 6, 112 + r * 19, 5, { stroke: C.muted, width: 1.3 });
  const b = roundFlask(110, 330, 58, 20, 232, 0.5) +
    D.polyline([[90, 232], [90, 92], [130, 92], [130, 232]], { stroke: C.axis, width: 2 }) + beads +
    D.rect(97, 82, 26, 10, { fill: "#d9cbb6", stroke: C.axis, width: 1.5 }) + D.line(110, 40, 110, 118, { stroke: C.red, width: 4 }) + D.dot(110, 120, { r: 4, fill: C.red, stroke: C.red }) +
    D.line(130, 108, sx, sy - 7, { stroke: C.axis, width: 1.6 }) + D.line(130, 122, sx, sy + 7, { stroke: C.axis, width: 1.6 }) +
    D.rect(60, 395, 100, 12, { fill: C.fillGrey, stroke: C.axis, width: 1.5 }) + D.path_("M95,393 q5,-14 10,0 q5,-14 10,0", { stroke: C.amber, width: 2 }) +
    condenser(x0, y0, len, ang) +
    beaker(445, 235, 85, 80, 20) + D.line(ex, ey + 6, ex, 235 + 80 - 22, { stroke: C.teal, width: 1.5, dash: true }) +
    D.arrow(30, 270, 30, 125, { stroke: C.muted, width: 1.6 }) + T(8, 116, "cooler", { size: 13, fill: C.muted }) + T(8, 290, "hotter", { size: 13, fill: C.muted }) +
    T(180, 28, "thermometer reads 78 °C while ethanol distils", { fill: C.red, weight: 700 }) + D.arrow(180, 34, 118, 70, { stroke: C.red, width: 1.4 }) +
    T(150, 185, "fractionating column\n(packed with glass beads)", {}) +
    T(175, 345, "mixture of ethanol\nand water", { fill: C.blue, weight: 700 }) +
    T(ox - 70, oy - 36, "cold water out", { fill: C.blue, size: 13 }) + D.arrow(ox - 12, oy - 30, ox - 3, oy - 18, { stroke: C.blue, width: 1.4 }) +
    T(ix - 100, iy + 42, "cold water in", { fill: C.blue, size: 13 }) + D.arrow(ix - 8, iy + 28, ix - 1, iy + 8, { stroke: C.blue, width: 1.4 }) +
    T(540, 290, "receiver\n(first fraction:\nmostly ethanol)", { fill: C.teal, weight: 700, size: 13 }) +
    T(330, 112, "Liebig condenser", { weight: 700, size: 13 });
  await put("fractional-distillation-apparatus", 700, 430, b,
    "Fractional distillation apparatus: a flask of ethanol and water is heated below a fractionating column packed with glass beads; the thermometer at the top reads 78 degrees Celsius while ethanol, the lower-boiling liquid, reaches the top first, passes into the Liebig condenser and is collected, while water (100 degrees Celsius) condenses in the column and runs back.",
    "Figure: fractional distillation of ethanol and water", "practical/fractional-distillation", "- a conical flask (the **receiver**)");
}

// ---- chromatography: paper in beaker + chromatogram with Rf
{
  const cm = 30, by = 330; // 1 cm = 30 px; base line at y=330
  const spot = (x, cmv, fill) => `<ellipse cx="${x}" cy="${by - cmv * cm}" rx="13" ry="9" fill="${fill}" stroke="${C.axis}" stroke-width="1.2"/>`;
  const front = 8.0, dA = 3.6, dB = 5.6;
  const b = beaker(40, 170, 120, 190, 36) +
    D.rect(30, 164, 140, 8, { fill: "#d9d3c8", stroke: C.axis, width: 1.5 }) +
    D.rect(80, 70, 40, 280, { fill: "#fbf8f1", stroke: C.muted, width: 1.5 }) +
    D.line(80, 296, 120, 296, { stroke: C.ink, width: 2 }) + D.dot(100, 296, { r: 4, fill: C.blue, stroke: C.blue }) +
    T(8, 50, "paper hangs from a lid", { size: 13, fill: C.muted }) +
    T(180, 306, "pencil base line", { size: 13 }) + D.arrow(176, 298, 122, 296, { stroke: C.muted, width: 1.3 }) +
    T(176, 345, "solvent", { size: 13, fill: C.blue }) +
    D.rect(300, 60, 210, 300, { fill: "#fbf8f1", stroke: C.muted, width: 1.5 }) +
    D.line(300, by, 510, by, { stroke: C.ink, width: 2 }) + T(514, by + 4, "base line", { size: 13 }) +
    D.line(300, by - front * cm, 510, by - front * cm, { stroke: C.muted, width: 1.6, dash: true }) + T(514, by - front * cm + 4, "solvent front", { size: 13 }) +
    spot(340, dA, C.fillAmber) + spot(400, dB, C.fillBlue) + spot(460, dA, C.fillAmber) + spot(460, dB, C.fillBlue) +
    T(340, by + 22, "dye A", { anchor: "middle", size: 13 }) + T(400, by + 22, "dye B", { anchor: "middle", size: 13 }) + T(460, by + 22, "mixture", { anchor: "middle", size: 13 }) +
    D.line(285, by, 285, by - front * cm, { stroke: C.red, width: 1.6, arrow: true, arrowStart: true }) + T(278, by - front * cm / 2 + 4, "8.0 cm", { anchor: "end", size: 13, fill: C.red, weight: 700 }) +
    D.line(560, by, 560, by - dA * cm, { stroke: C.amber, width: 1.6, arrow: true, arrowStart: true }) + T(566, by - dA * cm / 2 + 4, "3.6 cm", { size: 13, fill: C.amber, weight: 700 }) +
    D.line(473, by - dA * cm, 560, by - dA * cm, { stroke: C.amber, width: 1, dash: true }) +
    T(300, 30, "Rf of dye A = 3.6 ÷ 8.0 = 0.45", { weight: 700 }) +
    T(300, 48, "Rf of dye B = 5.6 ÷ 8.0 = 0.70", { size: 13, fill: C.muted });
  await put("chromatography-paper-rf", 640, 400, b,
    "Paper chromatography: a pencil base line above the solvent level in a covered beaker, and a chromatogram where the solvent front is 8.0 cm above the base line; dye A has moved 3.6 cm (Rf = 0.45), dye B 5.6 cm (Rf = 0.70), and the mixture separates into both spots.",
    "Figure: set-up and chromatogram; Rf = distance moved by the spot ÷ distance moved by the solvent front", "practical/chromatography", "5. The solvent soaks up the paper");
}

// ---- titration set-up
{
  const bx = 250;
  let ticks = ""; for (let i = 0; i <= 20; i += 1) ticks += D.line(bx - 12, 50 + i * 9, bx - (i % 5 ? 5 : 1), 50 + i * 9, { stroke: C.muted, width: 1 });
  const b = D.rect(430, 20, 8, 370, { fill: C.axis, stroke: C.axis, width: 1 }) + D.rect(360, 388, 150, 12, { fill: C.axis, stroke: C.axis, width: 1 }) +
    D.line(430, 110, bx + 13, 110, { stroke: C.axis, width: 5 }) +
    D.rect(bx - 13, 40, 26, 190, { fill: "#fff", stroke: C.axis }) + D.rect(bx - 12, 80, 24, 150, { fill: "#fde8d0", stroke: "none" }) + ticks +
    D.rect(bx - 16, 232, 32, 12, { fill: "#d9cbb6", stroke: C.axis, width: 1.5 }) + D.line(bx + 16, 238, bx + 52, 232, { stroke: C.axis, width: 5 }) +
    D.line(bx, 244, bx, 285, { stroke: C.axis, width: 5 }) + D.dot(bx, 292, { r: 3, fill: C.amber, stroke: C.amber }) +
    D.rect(150, 392, 200, 10, { fill: "#fff", stroke: C.axis, width: 2 }) +
    conical(bx, 310, 18, 62, 30, 82, 355, "#ffd7e0") +
    T(10, 70, "burette\n(acid)", { weight: 700 }) + D.arrow(60, 82, bx - 16, 95, { stroke: C.muted, width: 1.4 }) +
    T(330, 252, "tap", {}) + D.arrow(332, 248, bx + 52, 236, { stroke: C.muted, width: 1.4 }) +
    T(10, 285, "acid added drop by\ndrop, swirling", { size: 13, fill: C.amber }) + D.arrow(115, 292, bx - 10, 292, { stroke: C.amber, width: 1.4 }) +
    T(10, 350, "conical flask:\n25.0 cm³ alkali\n+ indicator", { weight: 700, fill: C.blue }) + D.arrow(115, 372, bx - 40, 372, { stroke: C.blue, width: 1.4 }) +
    T(40, 428, "white tile: makes the colour change easy to see", { size: 13 }) + D.arrow(120, 414, 170, 402, { stroke: C.muted, width: 1.4 }) +
    T(450, 70, "retort\nstand\nand clamp", { size: 13, fill: C.muted });
  await put("titration-apparatus", 560, 440, b,
    "Titration set-up: acid in a burette with a tap above a conical flask holding 25.0 cm3 of alkali and a few drops of indicator, standing on a white tile so the end-point colour change is easy to see.",
    "Figure: titration apparatus", "practical/titration-technique", "## Carrying out the titration");
}

// ---- solubility curve of potassium nitrate (lesson Example 2: 110 g at 60 C, 31.6 g at 20 C)
{
  const pts = [[0, 13.3], [10, 20.9], [20, 31.6], [30, 45.8], [40, 63.9], [50, 85.5], [60, 110], [70, 138], [80, 169], [90, 202], [100, 246]];
  const ax = D.axes({ x: [0, 100], y: [0, 250], xTicks: 10, yTicks: 50, xLabel: "Temperature (°C)", yLabel: "Solubility (g per 100 g water)", w: 580, h: 420, pad: { l: 70, t: 34 } });
  const b = ax.frame + ax.line(pts) + pts.map(([x, y]) => ax.point(x, y, { r: 3.5, fill: C.blue })).join("") +
    ax.guides(60, 110) + ax.guides(20, 31.6) + ax.point(60, 110, { r: 5, fill: C.amber, stroke: C.amber }) + ax.point(20, 31.6, { r: 5, fill: C.amber, stroke: C.amber }) +
    ax.tag(60, 110, "110 g at 60 °C", { dx: -160, dy: -16 }) + ax.tag(20, 31.6, "31.6 g at 20 °C", { dx: 34, dy: 42 }) +
    ax.label(80, 169, "KNO₃", { dx: -62, dy: 6, weight: 700, fill: C.blue }) +
    D.line(ax.X(60) + 40, ax.Y(110), ax.X(60) + 40, ax.Y(31.6), { stroke: C.red, width: 1.6, arrow: true }) + T(ax.X(60) + 48, ax.Y(70), "110 − 31.6\n= 78.4 g\ncrystallises", { size: 13, fill: C.red, weight: 700 });
  await put("solubility-curve-potassium-nitrate", 580, 420, b,
    "Solubility curve of potassium nitrate: solubility rises from 13.3 g per 100 g of water at 0 degrees Celsius to 31.6 g at 20 degrees and 110 g at 60 degrees, so cooling a saturated solution from 60 to 20 degrees crystallises 78.4 g per 100 g of water.",
    "Figure: solubility of potassium nitrate in water against temperature", "practical/separating-mixtures", "The amount of solid that crystallises can be worked out");
}
