// geography-o human geography diagrams (population pyramids, DTM, farm system, industrial location).
// Run from repo root: node .scratch/geography-o/diagrams/human.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;

// ---------- 1. Population pyramids: a youthful (Zimbabwe-type) and an ageing (Germany-type) pyramid (population/structure.md)
{
  const ages = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80+"];
  // relative weights per 5-year group (both sexes), normalised to 100% below; illustrative shapes, approximate
  const youthful = [12.6, 11.6, 10.6, 9.8, 8.4, 7.2, 6.0, 5.0, 4.0, 3.2, 2.6, 2.1, 1.7, 1.3, 0.9, 0.5, 0.3];
  const ageing = [4.2, 4.5, 4.8, 5.0, 5.6, 6.2, 6.3, 6.2, 6.0, 7.0, 8.0, 7.4, 6.1, 5.5, 5.2, 4.4, 6.0];
  const femaleShare = (i, top) => 0.49 + (top - 0.49) * Math.pow(i / 16, 2.2);
  const make = (w, top) => {
    const tot = w.reduce((a, v) => a + v, 0);
    return w.map((v, i) => { const p = (v / tot) * 100; return { m: p * (1 - femaleShare(i, top)), f: p * femaleShare(i, top), p }; });
  };
  const panelData = [
    ["Youthful pyramid (Zimbabwe-type)", make(youthful, 0.56)],
    ["Ageing pyramid (Germany-type)", make(ageing, 0.6)],
  ];
  const maxPct = 8, half = 108, gap = 38, bh = 14, top = 70;
  let b = "";
  const summary = [];
  panelData.forEach(([title, rows], k) => {
    const ox = 6 + k * 280, cx = ox + 135;
    b += D.text(cx, 22, title, { anchor: "middle", size: 14, weight: 700 });
    const u15 = rows.slice(0, 3).reduce((a, r) => a + r.p, 0), o65 = rows.slice(13).reduce((a, r) => a + r.p, 0);
    summary.push([Math.round(u15), Math.round(o65)]);
    b += D.text(cx, 42, `Under 15: about ${Math.round(u15)}%; 65 and over: about ${Math.round(o65)}%`, { anchor: "middle", size: 12.5, fill: C.muted });
    b += D.text(cx - gap / 2 - 4, top - 8, "Males", { anchor: "end", size: 13, weight: 700, fill: C.blue }) + D.text(cx + gap / 2 + 4, top - 8, "Females", { anchor: "start", size: 13, weight: 700, fill: C.amber });
    rows.forEach((r, i) => {
      const y = top + (16 - i) * (bh + 2);
      const wm = (r.m / maxPct) * half, wf = (r.f / maxPct) * half;
      b += D.rect(cx - gap / 2 - wm, y, wm, bh, { fill: C.teal, stroke: "none" }) + D.rect(cx + gap / 2, y, wf, bh, { fill: "#e2a36b", stroke: "none" });
      b += D.text(cx, y + bh - 2, ages[i], { anchor: "middle", size: 11.5, fill: C.muted });
    });
    // x scale
    const yb = top + 17 * (bh + 2) + 6;
    for (const v of [0, 4, 8]) {
      const xm = cx - gap / 2 - (v / maxPct) * half, xf = cx + gap / 2 + (v / maxPct) * half;
      b += D.text(xm, yb + 12, `${v}`, { anchor: "middle", size: 12, fill: C.muted }) + (v ? D.text(xf, yb + 12, `${v}`, { anchor: "middle", size: 12, fill: C.muted }) : "");
    }
    b += D.text(cx, yb + 30, "% of total population", { anchor: "middle", size: 12, fill: C.muted });
  });
  b += D.text(280, 408, "Illustrative shapes, with approximate shares as in the lesson (not exact census data).", { anchor: "middle", size: 12, fill: C.muted });
  const alt = `Two population pyramids on the same scale: a youthful pyramid (Zimbabwe-type) with a very wide base, about ${summary[0][0]}% aged under 15 and only about ${summary[0][1]}% aged 65 and over, and an ageing pyramid (Germany-type) with a narrow base, a bulge in middle age and about ${summary[1][1]}% aged 65 and over.`;
  const cap = "Figure: a youthful and an ageing population pyramid (illustrative shapes)";
  await D.figure(FAMILY, "population-pyramids-youthful-ageing", D.svg(570, 418, b), { alt, caption: cap });
  D.insertAfter(`${L}/population/structure.md`, "When you describe a pyramid, comment on:", D.md("population-pyramids-youthful-ageing", alt, cap));
  console.log("pyramid shares (under15, 65+):", JSON.stringify(summary));
}

// ---------- 2. Demographic transition model (population/growth-dtm.md)
{
  const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const birth = (x) => 38 - 24 * sm(1.9, 3.7, x) - 2 * sm(4.2, 4.9, x);
  const death = (x) => 38 - 26 * sm(0.9, 2.0, x) - 1 * sm(2.4, 3.4, x) + 1.5 * sm(4.1, 5, x) + (x < 1 ? 1.6 * Math.sin(x * 22) : 0);
  const pop = (x) => 5 + 20 * sm(0.8, 3.4, x) + 4 * sm(3.4, 4.2, x) - 2.5 * sm(4.6, 5, x);
  const ax = D.axes({ x: [0, 5], y: [0, 50], xTicks: [], yTicks: [0, 10, 20, 30, 40], xLabel: "Time (stages 1 to 5)", yLabel: "Rate per 1,000 (population: relative size)", w: 580, h: 430, pad: { l: 64, r: 20, t: 84, b: 52 }, grid: false });
  const xs = []; for (let x = 0; x <= 5.001; x += 0.05) xs.push(x);
  let b = ax.frame;
  // stage boundaries and labels
  const names = ["1 High\nfluctuating", "2 Early\nexpanding", "3 Late\nexpanding", "4 Low\nfluctuating", "5 Declining"];
  for (let i = 0; i < 5; i += 1) {
    if (i) b += ax.line([[i, 0], [i, 50]], { stroke: C.grid, width: 1.4, dash: true });
    b += D.text(ax.X(i + 0.5), 22, names[i], { anchor: "middle", size: 12.5, weight: 700 });
  }
  b += ax.area((x) => Math.max(birth(x), death(x)), (x) => Math.min(birth(x), death(x)), [0, 5], { fill: C.fillAmber });
  b += ax.line(xs.map((x) => [x, pop(x)]), { stroke: C.green, width: 2.6, dash: true });
  b += ax.line(xs.map((x) => [x, death(x)]), { stroke: C.red, width: 3 });
  b += ax.line(xs.map((x) => [x, birth(x)]), { stroke: C.blue, width: 3 });
  b += ax.tag(0.1, 43, "Birth rate", { dy: 0, fill: C.blue, size: 13 });
  b += ax.tag(3.7, 9, "Death rate", { dy: 28, fill: C.red, size: 13 });
  b += ax.tag(2.6, 20, "Total population (relative)", { dx: 30, dy: 6, fill: C.green, size: 13 });
  b += ax.tag(1.5, 30, "natural increase", { dy: 8, size: 12 });
  const alt = "Demographic transition model: birth and death rates start high at about 38 per 1,000 in stage 1; the death rate falls first in stage 2 so the gap (natural increase) and population grow fast; in stage 3 the birth rate falls; in stage 4 both rates are low and population is high and stable; in stage 5 the birth rate dips below the death rate and population falls slowly.";
  const cap = "Figure: the five stages of the demographic transition model (shape only; values illustrative)";
  await D.figure(FAMILY, "demographic-transition-model", D.svg(580, 430, b), { alt, caption: cap });
  D.insertAfter(`${L}/population/growth-dtm.md`, "| **5 Declining**", D.md("demographic-transition-model", alt, cap));
}

// ---------- 3. The farm as a system (agriculture/systems-factors.md)
{
  let b = "";
  const col = (x, y, w, h, title, lines, fill) => D.rect(x, y, w, h, { fill, stroke: C.axis, width: 1.8, r: 10 }) + D.text(x + w / 2, y + 26, title, { anchor: "middle", size: 15, weight: 700 }) + D.text(x + 10, y + 50, lines, { size: 13 });
  b += col(10, 40, 160, 190, "INPUTS", "Physical: rain, sun,\nsoil, slope, water\nHuman: family labour,\nskills\nEconomic: seed,\nfertiliser, tools,\noxen, money", C.fillGreen);
  b += col(200, 40, 160, 190, "PROCESSES", "ploughing\nplanting\nweeding\nfertilising\nspraying\nharvesting\nherding, dipping", C.fillBlue);
  b += col(390, 40, 160, 190, "OUTPUTS", "maize, beans,\ngroundnuts\nmilk, meat, hides\nmanure, residues\nincome\nwaste: eroded soil", C.fillAmber);
  b += D.arrow(172, 135, 198, 135, { width: 3 }) + D.arrow(362, 135, 388, 135, { width: 3 });
  // feedback loop from outputs back to inputs
  b += D.path_("M470,232 L470,272 L90,272 L90,234", { stroke: C.red, width: 2.6, arrow: true });
  b += D.tag(280, 308, "FEEDBACK: income buys seed and fertiliser; manure goes back to the fields", { anchor: "middle", fill: C.red, size: 13 });
  b += D.text(280, 336, "Smallholder maize and cattle farm", { anchor: "middle", size: 12.5, fill: C.muted });
  const alt = "Systems diagram of a smallholder maize and cattle farm: inputs (physical, human and economic) pass through processes (ploughing, planting, weeding, harvesting, herding) to outputs (crops, milk and meat, manure, income, waste), and feedback arrows return income, seed and manure to the inputs.";
  const cap = "Figure: a farm as a system of inputs, processes, outputs and feedback";
  await D.figure(FAMILY, "farm-system-diagram", D.svg(560, 346, b), { alt, caption: cap });
  D.insertAfter(`${L}/agriculture/systems-factors.md`, "## The farm as a system", D.md("farm-system-diagram", alt, cap).replace(/\n/g, " "));
}

// ---------- 4. Weight-loss idea: sugar mill location (industry/location-factors.md)
{
  const cane = 10, sugar = 1; // tonnes: about ten tonnes of cane make about one tonne of sugar (lesson, approximate)
  let b = "";
  b += D.text(14, 24, "A. Mill beside the cane fields: only 1 t of sugar makes the long journey", { size: 13.5, weight: 700 });
  b += D.node(14, 40, 110, 52, "Cane fields\nand mill", { fill: C.fillGreen }) + D.node(430, 40, 116, 52, "Harare\n(market)", { fill: C.fillAmber });
  b += D.arrow(126, 66, 428, 66, { stroke: C.amber, width: sugar * 1.2 + 1 }) + D.text(278, 56, sugar + " t of sugar travels the long distance", { anchor: "middle", size: 12.5 });
  b += D.text(14, 140, "B. Mill in Harare: all 10 t of cane make the long journey", { size: 13.5, weight: 700 });
  b += D.node(14, 156, 110, 52, "Cane fields", { fill: C.fillGreen }) + D.node(430, 156, 116, 52, "Mill and\nmarket,\nHarare", { fill: C.fillAmber, size: 13 });
  b += D.line(126, 182, 424, 182, { stroke: C.green, width: cane * 1.2 }) + D.text(278, 166, cane + " t of cane travels the long distance", { anchor: "middle", size: 12.5 });
  b += D.text(14, 250, "Line thickness shows the weight moved. Moving 10 t a long way (B)\ncosts far more than moving 1 t (A), so weight-losing industries such\nas sugar milling locate near the raw material.", { size: 13, fill: C.muted });
  const alt = "Two layouts for a sugar mill, with the same long distance to the market: beside the cane fields only 1 tonne of sugar makes the long journey, but with the mill in Harare all 10 tonnes of cane (the weight lost in processing) must travel, so weight-losing industries locate near their raw materials. Figures are approximate and the distance is illustrative.";
  const cap = "Figure: the weight-loss idea, about 10 t of cane makes about 1 t of sugar (approximate)";
  await D.figure(FAMILY, "sugar-mill-weight-loss", D.svg(560, 304, b), { alt, caption: cap });
  D.insertAfter(`${L}/industry/location-factors.md`, "| Footloose | Light, high-value inputs", D.md("sugar-mill-weight-loss", alt, cap));
}
console.log("human done");
