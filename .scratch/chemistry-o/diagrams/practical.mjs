// Run: node .scratch/chemistry-o/diagrams/practical.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, rot, beaker, conical, roundFlask, tube, condenser, rp, WATER } from "./_h.mjs";

// ---- filtration
{
  let b = D.polyline([[170, 100], [350, 100], [270, 195], [270, 245], [250, 245], [250, 195]], { stroke: C.axis, width: 2, close: true, fill: "#fff" }) +
    D.polyline([[182, 104], [338, 104], [262, 190], [258, 190]], { stroke: C.muted, width: 2, close: true, fill: "#f4efe6" }) +
    [[245, 168], [260, 175], [272, 168], [255, 182], [266, 160], [236, 158]].map(([x, y]) => D.dot(x, y, { r: 3.5, fill: C.amber, stroke: C.amber })).join("") +
    conical(260, 235, 20, 85, 40, 130, 330) +
    [0, 1, 2].map((i) => D.dot(260, 258 + i * 22, { r: 3, fill: C.teal, stroke: C.teal })).join("") +
    D.line(150, 365, 370, 365, { stroke: C.axis, width: 3 }) +
    D.arrow(150, 76, 215, 98, { stroke: C.blue, width: 2 }) + T(20, 40, "mixture poured in\n(sand + salt solution)", { fill: C.blue }) +
    D.arrow(430, 120, 322, 112, { stroke: C.muted, width: 1.5 }) + T(436, 112, "filter paper", {}) +
    D.arrow(425, 190, 280, 172, { stroke: C.amber, width: 1.5, }) + T(430, 210, "residue (sand)\nstays on paper", { fill: C.amber, weight: 700 }) +
    T(436, 150, "filter funnel", {}) + D.arrow(434, 146, 345, 130, { stroke: C.muted, width: 1.5 }) +
    D.arrow(425, 345, 345, 335, { stroke: C.teal, width: 1.5 }) + T(405, 290, "filtrate (salt solution)\npasses through", { fill: C.teal, weight: 700 }) +
    T(30, 335, "conical flask", { }) + D.arrow(100, 330, 172, 335, { stroke: C.muted, width: 1.5 });
  await put("separating-filtration-apparatus", 620, 390, b,
    "Filtration apparatus: a mixture of sand and salt solution is poured into a filter paper cone in a funnel; the insoluble sand stays on the paper as the residue and the salt solution runs through into the conical flask as the filtrate.",
    "Figure: filtration separates an insoluble solid (residue) from a liquid (filtrate)", "practical/separating-mixtures", "- Washing the residue with a little distilled water");
}

// ---- simple distillation
{
  const x0 = 200, y0 = 150, ang = 12, len = 230;
  const [sx, sy] = rp(x0, y0, ang, -30, 0);
  const [ox, oy] = rp(x0, y0, ang, 22, -36), [ix, iy] = rp(x0, y0, ang, len - 22, 36);
  const [ex, ey] = rp(x0, y0, ang, len + 30, 0);
  let b = roundFlask(110, 250, 62, 14, 100, 0.55) +
    // side arm
    D.line(124, 124, sx, sy - 7, { stroke: C.axis, width: 1.6 }) + D.line(124, 140, sx, sy + 7, { stroke: C.axis, width: 1.6 }) +
    // thermometer
    D.rect(100, 94, 20, 8, { fill: "#d9cbb6", stroke: C.axis, width: 1.5 }) + D.line(110, 60, 110, 130, { stroke: C.red, width: 4 }) + D.dot(110, 132, { r: 4, fill: C.red, stroke: C.red }) +
    [0, 1, 2].map((i) => D.dot(90 + i * 20, 292, { r: 2.5, fill: C.muted, stroke: C.muted })).join("") +
    D.rect(60, 322, 100, 12, { fill: C.fillGrey, stroke: C.axis, width: 1.5 }) + D.path_("M95,320 q5,-14 10,0 q5,-14 10,0", { stroke: C.amber, width: 2 }) +
    condenser(x0, y0, len, ang) +
    beaker(420, 250, 90, 80, 22) + D.dot(ex, ey + 8, { r: 3, fill: C.teal, stroke: C.teal }) + D.line(ex, ey + 14, ex, 250 + 80 - 24, { stroke: C.teal, width: 1.5, dash: true }) +
    T(10, 40, "thermometer: bulb level\nwith the side arm", { }) + D.arrow(60, 62, 104, 118, { stroke: C.muted, width: 1.4 }) +
    T(10, 232, "salt solution", { fill: C.blue, weight: 700 }) +
    T(10, 285, "anti-bumping\ngranules", {}) + D.arrow(60, 303, 85, 293, { stroke: C.muted, width: 1.4 }) +
    T(170, 350, "heat", { weight: 700, fill: C.amber }) +
    T(200, 225, "Liebig condenser", { weight: 700 }) +
    T(ox - 60, oy - 40, "cold water out (top)", { fill: C.blue, size: 13 }) + D.arrow(ox - 10, oy - 34, ox - 2, oy - 18, { stroke: C.blue, width: 1.4 }) +
    T(ix - 130, iy + 40, "cold water in (bottom)", { fill: C.blue, size: 13 }) + D.arrow(ix - 8, iy + 28, ix - 1, iy + 8, { stroke: C.blue, width: 1.4 }) +
    T(520, 300, "distillate\n(pure water)", { fill: C.teal, weight: 700 }) +
    T(130, 100, "", {});
  await put("separating-simple-distillation", 640, 380, b,
    "Simple distillation apparatus: salt solution is heated in a flask with a thermometer bulb level with the side arm; steam passes into a Liebig condenser with cold water entering at the bottom and leaving at the top, and pure water (distillate) drips into a beaker while the salt stays in the flask.",
    "Figure: simple distillation separates a solvent from a solution", "practical/separating-mixtures", "- a beaker or conical flask to collect the **distillate**");
}
