// biology-o: ecology (nitrogen cycle, carbon cycle, food web, energy pyramid, yeast population curve)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

/** Box registry helper: returns drawing + edge-point function between boxes. */
function flow() {
  const boxes = {};
  let svg = "";
  const box = (id, x, y, w, h, label, fill) => { boxes[id] = { x, y, w, h }; svg += D.node(x, y, w, h, label, { fill, size: 14 }); };
  const pt = (id, side, t = 0.5) => {
    const b = boxes[id];
    if (side === "top") return [b.x + b.w * t, b.y];
    if (side === "bottom") return [b.x + b.w * t, b.y + b.h];
    if (side === "left") return [b.x, b.y + b.h * t];
    return [b.x + b.w, b.y + b.h * t];
  };
  /** arrow from (id1, side1, t1) to (id2, side2, t2) with optional label tag at fraction f along the line */
  const arr = (a, b, o = {}) => {
    const [x1, y1] = pt(a[0], a[1], a[2] ?? 0.5), [x2, y2] = pt(b[0], b[1], b[2] ?? 0.5);
    svg += D.arrow(x1, y1, x2, y2, { stroke: o.stroke ?? C.ink, width: o.width ?? 2, dash: o.dash });
    if (o.label) {
      const f = o.f ?? 0.5, mx = x1 + (x2 - x1) * f + (o.dx ?? 0), my = y1 + (y2 - y1) * f + (o.dy ?? 0);
      const lines = o.label.split("\n");
      lines.forEach((l, i) => { svg += D.tag(mx, my + i * 20 - ((lines.length - 1) * 10) + 5, l, { anchor: "middle", size: 12, fill: o.fill ?? C.ink }); });
    }
  };
  return { box, arr, get svg() { return svg; }, add: (s) => { svg += s; } };
}

// ---------- 1. Nitrogen cycle
{
  const f = flow();
  f.box("air", 150, 14, 340, 46, "Nitrogen gas in the air", C.fillGrey);
  f.box("nh4", 20, 190, 170, 52, "Ammonium ions\nin the soil", C.fillAmber);
  f.box("no3", 450, 190, 170, 52, "Nitrate ions\nin the soil", C.fillAmber);
  f.box("plant", 450, 318, 170, 46, "Plants (proteins)", C.fillGreen);
  f.box("animal", 245, 380, 170, 46, "Animals (proteins)", C.fillBlue);
  f.box("dead", 20, 318, 190, 46, "Dead organisms, urea,\nfaeces", C.fillGrey);
  f.arr(["air", "bottom", 0.15], ["nh4", "top", 0.6], { stroke: C.blue, label: "Nitrogen fixation\n(bacteria, root nodules)", f: 0.5, dx: -22 });
  f.arr(["air", "bottom", 0.8], ["no3", "top", 0.25], { stroke: C.amber, label: "Lightning", f: 0.62, dx: -6 });
  f.arr(["no3", "top", 0.8], ["air", "bottom", 0.97], { stroke: C.red, label: "Denitrification\n(denitrifying bacteria)", f: 0.7, dx: -10 });
  f.arr(["nh4", "right", 0.5], ["no3", "left", 0.5], { stroke: C.blue, label: "Nitrification\n(nitrifying bacteria)" });
  f.arr(["no3", "bottom", 0.5], ["plant", "top", 0.5], { label: "Absorption by roots", f: 0.5, dx: 0 });
  f.arr(["plant", "bottom", 0.3], ["animal", "right", 0.5], { label: "Feeding", f: 0.45, dx: 12 });
  f.arr(["animal", "left", 0.5], ["dead", "bottom", 0.7], { label: "Death, urea, faeces", f: 0.5, dx: -34, dy: 26 });
  f.arr(["plant", "left", 0.5], ["dead", "right", 0.5], { label: "Death", f: 0.5 });
  f.arr(["dead", "top", 0.4], ["nh4", "bottom", 0.4], { stroke: C.green, label: "Decomposers", f: 0.5, dx: -8 });
  const alt = "Nitrogen cycle: nitrogen-fixing bacteria and lightning turn nitrogen gas into usable compounds, decomposers turn the proteins and urea of dead organisms into ammonium ions, nitrifying bacteria turn ammonium into nitrate, plants absorb nitrate to make protein, animals eat the plants, and denitrifying bacteria return nitrate to nitrogen gas.";
  await add("nitrogen-cycle", D.svg(640, 440, f.svg), alt, "Figure: the nitrogen cycle with the four groups of bacteria and decomposers", "ecology/nitrogen-cycle", "**Denitrifying bacteria** turn nitrate into nitrogen gas.");
}

// ---------- 2. Carbon cycle
{
  const f = flow();
  f.box("air", 140, 14, 360, 50, "Carbon dioxide in the air", C.fillGrey);
  f.box("plant", 20, 170, 170, 50, "Plants (producers)", C.fillGreen);
  f.box("animal", 450, 170, 170, 50, "Animals (consumers)", C.fillBlue);
  f.box("dead", 190, 300, 260, 50, "Dead remains, waste, humus", C.fillAmber);
  f.box("decomp", 20, 390, 190, 44, "Decomposers", C.fillGrey);
  f.box("fossil", 430, 390, 190, 44, "Fossil fuels", C.fillGrey);
  f.arr(["air", "bottom", 0.1], ["plant", "top", 0.3], { stroke: C.green, label: "Photosynthesis", f: 0.5, dx: -34 });
  f.arr(["plant", "top", 0.8], ["air", "bottom", 0.22], { stroke: C.red, label: "Respiration", f: 0.5, dx: 40 });
  f.arr(["animal", "top", 0.2], ["air", "bottom", 0.8], { stroke: C.red, label: "Respiration", f: 0.5, dx: -40 });
  f.arr(["plant", "right", 0.5], ["animal", "left", 0.5], { label: "Feeding" });
  f.arr(["plant", "bottom", 0.5], ["dead", "left", 0.5], { label: "Death", f: 0.5, dx: -22 });
  f.arr(["animal", "bottom", 0.5], ["dead", "right", 0.5], { label: "Death, waste", f: 0.5, dx: 26 });
  f.arr(["dead", "bottom", 0.25], ["decomp", "top", 0.8], { label: "Decay", f: 0.5, dx: 26 });
  f.arr(["dead", "bottom", 0.75], ["fossil", "top", 0.3], { label: "Fossilisation", f: 0.5, dx: 62, dy: -18 });
  // return routes along the margins: decomposers' respiration (left) and combustion (right)
  f.add(D.path_("M20,412 L8,412 L8,39 L136,39", { stroke: C.red, width: 2, arrow: true }));
  f.add(D.tag(8, 300, "Respiration of decomposers", { anchor: "start", size: 12, fill: C.red }).replace(/^/, ""));
  f.add(D.path_("M620,412 L634,412 L634,39 L504,39", { stroke: C.red, width: 2, arrow: true }));
  f.add(D.tag(634, 300, "Combustion", { anchor: "end", size: 12, fill: C.red }));
  const alt = "Carbon cycle: plants take carbon dioxide from the air by photosynthesis, animals get carbon by feeding, respiration by plants, animals and decomposers returns carbon dioxide to the air, dead remains are broken down by decomposers or fossilised into fossil fuels, and combustion of fossil fuels releases carbon dioxide.";
  await add("carbon-cycle", D.svg(650, 450, f.svg), alt, "Figure: the carbon cycle, showing photosynthesis, feeding, respiration, decomposition, fossilisation and combustion", "ecology/carbon-cycle", "**Respiration**, **decomposition** (through the respiration of decomposers) and **combustion** all return it.");
}

// ---------- 3. Food web (the lesson's Hwange table)
{
  let b = "";
  const nodes = {
    grass: [150, 350, 150, "Grass", C.fillGreen], leaves: [440, 350, 190, "Leaves of trees and shrubs", C.fillGreen],
    termites: [65, 215, 100, "Termites", C.fillAmber], zebra: [175, 215, 90, "Zebra", C.fillAmber], impala: [290, 215, 90, "Impala", C.fillAmber], kudu: [400, 215, 80, "Kudu", C.fillAmber], giraffe: [500, 215, 90, "Giraffe", C.fillAmber], elephant: [595, 215, 90, "Elephant", C.fillAmber],
    aardvark: [70, 80, 100, "Aardvark", C.fillBlue], lion: [200, 80, 90, "Lion", C.fillBlue], leopard: [310, 80, 90, "Leopard", C.fillBlue], dog: [430, 80, 100, "Wild dog", C.fillBlue],
  };
  const edges = [["grass", "termites"], ["grass", "zebra"], ["grass", "impala"], ["leaves", "impala"], ["leaves", "kudu"], ["leaves", "giraffe"], ["leaves", "elephant"], ["termites", "aardvark"], ["zebra", "lion"], ["impala", "lion"], ["impala", "leopard"], ["impala", "dog"], ["kudu", "lion"], ["kudu", "dog"]];
  for (const [a, c] of edges) {
    const A = nodes[a], B = nodes[c];
    b += D.arrow(A[0], A[1] - 18, B[0], B[1] + 18, { stroke: C.muted, width: 1.8 });
  }
  for (const [x, y, w, t, fill] of Object.values(nodes)) b += D.node(x - w / 2, y - 18, w, 36, t, { fill, size: 13 });
  b += D.text(10, 395, "Arrows point from the food to the animal that eats it.", { size: 13, fill: C.muted });
  const alt = "Food web from the Hwange table: grass and the leaves of trees and shrubs are the producers; termites, zebra, impala, kudu, giraffe and elephant are primary consumers; the aardvark, lion, leopard and wild dog are secondary consumers, and the impala is eaten by lion, leopard and wild dog, so it sits in several food chains.";
  await add("hwange-food-web", D.svg(660, 410, b), alt, "Figure: part of a food web in Hwange, with arrows pointing from food to feeder", "ecology/food-chains-and-webs", "- One food chain in it is: leaves");
}

// ---------- 4. Pyramid of energy (grass 24000, impala 1800, lion 216 kJ per m2 per year; bar widths to scale)
{
  const lv = [["Lion (secondary consumer)", 216], ["Impala (primary consumer)", 1800], ["Grass (producer)", 24000]];
  const maxW = 360, cx = 200;
  let b = "";
  lv.forEach(([name, kj], i) => {
    const w = (kj / 24000) * maxW, y = 40 + i * 84;
    b += D.rect(cx - w / 2, y, w, 52, { fill: [C.fillBlue, C.fillAmber, C.fillGreen][i], stroke: C.ink, width: 2 });
    b += D.text(cx + 195, y + 22, name, { size: 14, weight: 700 });
    b += D.text(cx + 195, y + 42, `${kj.toLocaleString("en-GB")} kJ per m² per year`, { size: 13, fill: C.muted });
  });
  const eff1 = (1800 / 24000) * 100, eff2 = (216 / 1800) * 100;
  b += D.tag(cx, 115, `${eff2}% passed on`, { anchor: "middle", size: 13, fill: C.red });
  b += D.tag(cx, 199, `${eff1}% passed on`, { anchor: "middle", size: 13, fill: C.red });
  b += D.text(20, 300, "Bar widths are drawn to scale: the lion bar is only 0.9% of the grass bar.", { size: 13, fill: C.muted });
  const alt = `Pyramid of energy for the grassland example, drawn to scale: grass 24 000 kJ per square metre per year, impala 1800 and lion 216; only ${eff1}% of the energy passes from grass to impala and ${eff2}% from impala to lion, so each bar is narrower than the one below.`;
  await add("energy-pyramid", D.svg(620, 320, b), alt, "Figure: a pyramid of energy with bars drawn to scale (kJ per square metre per year)", "ecology/energy-flow-and-pyramids", "A **pyramid of energy** shows the energy passing");
}

// ---------- 5. Yeast growth curve (Example 2 data)
{
  const t = [0, 2, 4, 6, 8, 10, 12], n = [2, 3, 8, 24, 52, 70, 74];
  const ax = D.axes({ x: [0, 12.5], y: [0, 80], xTicks: 2, yTicks: 10, xLabel: "Time (hours)", yLabel: "Yeast cells (thousands per mm³)", w: 560, h: 400, pad: { l: 64, r: 30, t: 34, b: 62 } });
  let b = ax.frame;
  b += ax.line(t.map((x, i) => [x, n[i]]), { stroke: C.blue, width: 3 });
  t.forEach((x, i) => { b += ax.point(x, n[i], { stroke: C.blue }); });
  b += ax.line([[2, 0], [2, 80]], { stroke: C.muted, width: 1.2, dash: true }) + ax.line([[10, 0], [10, 80]], { stroke: C.muted, width: 1.2, dash: true });
  b += ax.tag(0.15, 76, "Lag", { anchor: "start", size: 13 }) + ax.tag(3.4, 76, "Exponential", { anchor: "start", size: 13 }) + ax.tag(10.2, 40, "Stationary", { anchor: "start", size: 13, dy: 0 });
  b += ax.tag(12.4, 8, "4 h to 8 h: (52 − 8) ÷ 4 = 11 per hour", { anchor: "end", size: 12 });
  const alt = "Yeast growth curve from Example 2: numbers rise slowly from 2 to 3 thousand per cubic millimetre in the lag phase to 2 hours, then steeply through 8, 24 and 52 thousand in the exponential phase, and level off near 74 thousand in the stationary phase after about 10 hours.";
  await add("yeast-growth-curve", D.svg(560, 400, b), alt, "Figure: the sigmoid growth curve of yeast in sugar solution", "ecology/populations", "In a closed container nothing new is added");
}
