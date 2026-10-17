// agriculture-o flower diagrams. Run: node .scratch/agriculture-o/diagrams/flowers.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const ellipse = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"/>`;

{
  const W = 660, H = 410;
  let b = "";
  b += D.text(10, 24, "Bean flower (bisexual): side section", { size: 15, weight: 700 });
  // standard (back petal), wing, calyx
  b += ellipse(165, 148, 62, 52, { fill: "#f1e4f4", stroke: C.purple, width: 2 });
  b += ellipse(118, 212, 38, 20, { fill: "#f6e8f8", stroke: C.purple, width: 2 });
  b += D.polyline([[128, 292], [190, 292], [180, 272], [138, 272]], { close: true, fill: "#d6ecc6", stroke: C.green, width: 2 });
  // pistil and stamens (inside the keel)
  b += D.path_("M104,268 L176,270 C214,266 228,248 232,232", { stroke: C.green, width: 9 });
  b += D.circle(233, 228, 6, { fill: "#fff", stroke: C.green, width: 2.2 });
  for (const [x, y] of [[170, 268], [150, 268], [130, 268], [112, 267]]) b += D.circle(x, y, 2.8, { fill: "#fff", stroke: C.axis, width: 1 });
  for (const [fx, fy, ex, ey] of [[110, 262, 196, 246], [130, 262, 206, 250], [150, 262, 188, 252]]) b += D.line(fx, fy, ex, ey, { stroke: C.axis, width: 1.6 }) + ellipse(ex + 2, ey - 2, 6, 4, { fill: C.fillAmber, stroke: C.amber, width: 1.4 });
  // keel (boat) drawn over, semi-transparent so the inside shows
  b += `<path d="M80,250 C110,296 206,292 248,218 C204,250 130,262 80,250 Z" fill="#e8d4ee" fill-opacity="0.55" stroke="${C.purple}" stroke-width="2"/>`;
  // labels
  b += D.text(10, 60, "Standard (back petal)", { size: 13, weight: 700 }) + leader(80, 66, 130, 120);
  b += D.text(10, 176, "Wing", { size: 13, weight: 700 }) + leader(40, 182, 92, 205);
  b += D.text(262, 190, "Stigma", { size: 13, weight: 700 }) + leader(268, 196, 242, 222);
  b += D.text(262, 232, "Anthers", { size: 13, weight: 700 }) + leader(268, 238, 214, 246);
  b += D.text(262, 276, "Keel: encloses", { size: 13, weight: 700 }) + D.text(262, 292, "stamens and pistil", { size: 12, fill: C.muted }) + leader(258, 270, 232, 262);
  b += D.text(10, 322, "Ovary with ovules", { size: 13, weight: 700 }) + D.text(10, 338, "(becomes the pod)", { size: 12, fill: C.muted }) + leader(100, 310, 130, 272);
  b += D.text(200, 320, "Calyx", { size: 13, weight: 700 }) + leader(214, 308, 184, 290);
  b += D.text(10, 372, "Anthers and stigma are enclosed together,", { size: 13 }) + D.text(10, 390, "so beans are mainly self-pollinated.", { size: 13 });

  // maize plant
  b += D.text(340, 24, "Maize plant (male and female flowers)", { size: 15, weight: 700 });
  const sx = 500;
  b += D.line(sx, 70, sx, 360, { stroke: C.green, width: 7 });
  // tassel: branched head
  for (const dx of [-36, -18, 0, 18, 36]) { b += D.path_(`M${sx},84 Q${sx + dx * 0.6},60 ${sx + dx},46`, { stroke: "#b8a050", width: 3 }); for (const t of [0.3, 0.6, 0.9]) b += ellipse(sx + dx * t, 84 - (84 - 46) * t - 4, 3.4, 5, { fill: C.fillAmber, stroke: C.amber, width: 1.2 }); }
  b += D.text(sx + 48, 50, "Tassel (male):", { size: 13, weight: 700 }) + D.text(sx + 48, 66, "anthers shed", { size: 12, fill: C.muted }) + D.text(sx + 48, 80, "light pollen", { size: 12, fill: C.muted });
  // leaves
  b += D.path_(`M${sx},170 C${sx + 60},130 ${sx + 110},150 ${sx + 130},190`, { stroke: C.green, width: 5 }) + D.path_(`M${sx},250 C${sx - 70},210 ${sx - 120},235 ${sx - 140},285`, { stroke: C.green, width: 5 });
  // cob in leaf axil with husk and silks
  b += D.path_(`M${sx},215 C${sx - 14},190 ${sx - 54},200 ${sx - 52},248 C${sx - 40},262 ${sx - 12},250 ${sx},235 Z`, { fill: "#e0f0d0", stroke: C.green, width: 2 });
  for (let i = 0; i < 8; i += 1) b += D.path_(`M${sx - 54},${226 + i * 2} Q${sx - 70 - i * 3},${250 + i * 4} ${sx - 72 - i * 4},${268 + i * 5}`, { stroke: "#c9a655", width: 1.6 });
  b += D.text(sx - 60, 330, "Cob (female): each silk", { size: 13, weight: 700, anchor: "end" }) + D.text(sx - 60, 346, "leads to one ovule", { size: 12, fill: C.muted, anchor: "end" });
  b += leader(sx - 90, 322, sx - 82, 296);
  // wind and pollen
  b += D.arrow(sx - 26, 70, sx - 112, 232, { stroke: C.blue, width: 1.8 });
  b += D.text(sx - 190, 130, "wind carries pollen", { size: 13, fill: C.blue }) + D.text(sx - 190, 146, "to silks of other plants", { size: 13, fill: C.blue });
  b += D.text(350, 390, "Maize: wind-pollinated, mainly cross-pollinated.", { size: 12, fill: C.muted });
  const alt = "Flower structure compared: the bean flower has a standard, wings, a keel enclosing the stamens with anthers and a pistil with stigma, style and an ovary of ovules, so it self-pollinates inside the keel; the maize plant has a tassel with anthers at the top and a cob with silks lower down, and wind carries pollen from tassels to the silks of other plants.";
  const cap = "Figure: the bean flower (self-pollinated) and the male and female flowers of maize (wind cross-pollinated)";
  await D.figure(FAMILY, "bean-flower-maize-flowers", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/plants/flowers-pollination.md`, "Because the anthers and stigma are enclosed together in the keel", D.md("bean-flower-maize-flowers", alt, cap));
}
console.log("flowers done");
