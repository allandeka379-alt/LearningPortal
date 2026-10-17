// agriculture-o livestock diagrams: digestion, reproduction. Run: node .scratch/agriculture-o/diagrams/livestock.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);

// ---------------------------------------------------------------- ruminant stomach (circle areas proportional to capacity)
{
  const caps = { rumen: 160, reticulum: 10, omasum: 15, abomasum: 15 };
  const total = Object.values(caps).reduce((a, b) => a + b, 0); // 200 L
  const k = 78 / Math.sqrt(caps.rumen);
  const r = (n) => k * Math.sqrt(caps[n]);
  const pct = (n) => Math.round((caps[n] / total) * 1000) / 10;
  const W = 620, H = 470;
  let b = "";
  const rum = [170, 270], ret = [262, 188], oma = [300, 275], aba = [262, 350];
  b += D.circle(...rum, r("rumen"), { fill: C.fillGreen, stroke: C.axis, width: 2 });
  b += D.circle(...ret, r("reticulum"), { fill: C.fillAmber, stroke: C.axis, width: 2 });
  b += D.circle(...oma, r("omasum"), { fill: C.fillBlue, stroke: C.axis, width: 2 });
  b += D.circle(...aba, r("abomasum"), { fill: C.fillGrey, stroke: C.axis, width: 2 });
  b += D.text(rum[0], rum[1] - 4, "RUMEN", { anchor: "middle", weight: 700 }) + D.text(rum[0], rum[1] + 14, `${caps.rumen} L`, { anchor: "middle", size: 13 });
  // mouth and oesophagus
  b += D.text(14, 30, "Mouth", { weight: 700 });
  b += D.path_("M50,40 C50,90 150,100 190,185", { stroke: C.ink, width: 3, arrow: true });
  b += D.text(80, 108, "Oesophagus", { size: 13 });
  b += D.path_("M130,196 C100,130 70,110 62,48", { stroke: C.muted, width: 1.6, dash: true, arrow: true });
  b += D.text(10, 135, "cud goes back\nup to be chewed", { size: 12, fill: C.muted });
  // flow arrows between compartments
  b += D.arrow(rum[0] + 70, rum[1] - 38, ret[0] - 14, ret[1] + 12, { width: 2 });
  b += D.arrow(ret[0] + 8, ret[1] + r("reticulum") + 1, oma[0] - 6, oma[1] - r("omasum") - 2, { width: 2 });
  b += D.arrow(oma[0] - 8, oma[1] + r("omasum") + 1, aba[0] + 6, aba[1] - r("abomasum") - 2, { width: 2 });
  // intestines
  const si = [[aba[0] + 22, aba[1] + 8], [330, 360], [345, 395], [300, 405], [330, 420], [300, 432], [345, 440], [400, 440]];
  b += D.polyline(si, { stroke: C.axis, width: 3, arrow: true });
  b += D.polyline([[400, 440], [560, 440]], { stroke: C.muted, width: 5 });
  b += D.text(406, 462, "large intestine, rectum, anus", { size: 12, fill: C.muted });
  // labels column on the right
  const lx = 350;
  const rows = [
    ["Rumen", `${caps.rumen} L, ${pct("rumen")}%`, "fermentation vat: microbes make\nvolatile fatty acids; gas belched out", 62, rum, r("rumen")],
    ["Reticulum", `${caps.reticulum} L, ${pct("reticulum")}%`, "honeycomb lining; traps wire and\nnails, passes food on or back up", 138, ret, r("reticulum")],
    ["Omasum", `${caps.omasum} L, ${pct("omasum")}%`, "folded leaves squeeze food and\nabsorb water", 224, oma, r("omasum")],
    ["Abomasum", `${caps.abomasum} L, ${pct("abomasum")}%`, "true stomach: acid gastric juice\ndigests protein", 296, aba, r("abomasum")],
  ];
  for (const [name, size, fn, y, c, rad] of rows) {
    b += D.text(lx, y, `${name} (${size})`, { size: 14, weight: 700 }) + D.text(lx, y + 17, fn, { size: 12, fill: C.muted });
    const ex = c[0] + rad * Math.cos(-0.5), ey = c[1] + rad * Math.sin(-0.5);
    if (name !== "Rumen") b += D.line(lx - 4, y - 5, ex + 2, ey, { stroke: C.muted, width: 1 });
  }
  b += D.text(385, 372, "Small intestine: bile and pancreatic\njuices finish digestion; nutrients are\nabsorbed through the villi", { size: 12, fill: C.muted });
  b += D.text(10, 460, "Circle areas are proportional to capacity (total 200 L).", { size: 12, fill: C.muted });
  const alt = "Ruminant stomach of an adult cow drawn with circle areas in proportion to capacity: the rumen holds 160 L (80%), reticulum 10 L (5%), omasum 15 L (7.5%) and abomasum 15 L (7.5%); food passes from oesophagus to rumen, reticulum, omasum, abomasum and then the small intestine, and cud returns to the mouth.";
  const cap = "Figure: the four compartments of a cow's stomach, drawn in proportion to their capacity";
  await D.figure(FAMILY, "ruminant-stomach-compartments", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/digestion.md`, "The table shows typical proportions in an adult cow", D.md("ruminant-stomach-compartments", alt, cap));
}

// ---------------------------------------------------------------- pig and fowl digestive tracts as flows
{
  const W = 620, H = 330;
  let b = "";
  const row = (y, title, steps, fills) => {
    let out = D.text(10, y - 10, title, { weight: 700, size: 14 });
    const bw = 66, gap = (W - 20 - bw * steps.length) / (steps.length - 1);
    steps.forEach((s, i) => {
      const x = 10 + i * (bw + gap);
      out += D.node(x, y, bw, 58, s, { fill: fills[i] ?? C.fillBlue, size: 12 });
      if (i < steps.length - 1) out += D.arrow(x + bw + 1, y + 25, x + bw + gap - 2, y + 25, { width: 1.8 });
    });
    return out;
  };
  b += row(40, "Pig (monogastric): one simple stomach", ["Mouth\n(full teeth)", "Oeso-\nphagus", "Stomach\n(acid)", "Small\nintestine", "Caecum\n(small)", "Colon\n(water)", "Rectum,\nanus"], [C.fillGrey, C.fillGrey, C.fillAmber, C.fillGreen, C.fillBlue, C.fillBlue, C.fillGrey]);
  b += row(160, "Fowl: no teeth; crop and gizzard", ["Beak\n(no teeth)", "Oeso-\nphagus", "Crop\n(stores)", "Proven-\ntriculus\n(acid)", "Gizzard\n(grinds)", "Small\nintestine"], [C.fillGrey, C.fillGrey, C.fillBlue, C.fillAmber, C.fillAmber, C.fillGreen]);
  b += D.arrow(W - 40, 215, W - 40, 250, { width: 1.8 });
  b += D.node(W - 330, 252, 300, 54, "Two caeca, short large intestine, then\ncloaca and vent (faeces, urine and eggs)", { fill: C.fillBlue, size: 12 });
  b += D.text(10, 285, "Colour key in words: amber = stomach\nparts, green = main digestion and\nabsorption.", { size: 12, fill: C.muted });
  const alt = "Flow diagrams of non-ruminant digestion: the pig has mouth, oesophagus, one simple stomach, small intestine, small caecum, colon and rectum; the fowl has beak, oesophagus, crop for storing food, proventriculus with acid, gizzard for grinding, small intestine, two caeca and a cloaca.";
  const cap = "Figure: the digestive tract of the pig (one stomach) and the fowl (crop, proventriculus and gizzard)";
  await D.figure(FAMILY, "pig-fowl-digestive-flow", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/digestion.md`, "Free-range chickens pick up small stones as grit", D.md("pig-fowl-digestive-flow", alt, cap));
}
console.log("livestock done");
