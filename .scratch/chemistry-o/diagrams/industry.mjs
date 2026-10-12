// Run from repo root: node .scratch/chemistry-o/diagrams/industry.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";

const arr = (x1, y1, x2, y2, o = {}) => D.arrow(x1, y1, x2, y2, { width: 2, ...o });
const bend = (pts, o = {}) => D.path_(`M${pts.map(([x, y]) => `${x},${y}`).join(" L")}`, { width: 2, arrow: true, ...o });

// ---------- Haber process flow
{
  const b =
    D.node(20, 25, 150, 50, "Nitrogen\n(from air)", { fill: C.fillGreen }) + D.node(20, 105, 150, 50, "Hydrogen\n(from methane\nand steam)", { fill: C.fillGreen, size: 13 }) +
    arr(170, 50, 232, 80) + arr(170, 130, 232, 100) +
    D.node(235, 55, 150, 70, "Compressor\nN₂ : H₂ = 1 : 3\nabout 200 atm", { size: 13 }) +
    arr(385, 90, 438, 90) +
    D.node(440, 45, 190, 90, "Converter\niron catalyst\nabout 450 °C\nabout 15% becomes NH₃", { fill: C.fillAmber, size: 13 }) +
    arr(535, 135, 535, 195) +
    D.node(440, 197, 190, 54, "Cooler: NH₃ liquefies\n(−33 °C)", { size: 13 }) +
    arr(535, 251, 535, 300) +
    D.node(440, 302, 190, 44, "Liquid ammonia", { fill: C.fillGreen, weight: 700 }) +
    bend([[440, 224], [310, 224], [310, 127]], { stroke: C.blue }) +
    T(30, 232, "unreacted N₂ and H₂ are\ncompressed again (recycled)", { size: 13, fill: C.blue, weight: 700 }) +
    T(30, 290, "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)", { size: 14, weight: 700 });
  await put("haber-process-flow", 650, 360, b,
    "Flow chart of the Haber process: nitrogen from air and hydrogen from methane and steam are mixed 1 to 3 by volume and compressed to about 200 atm, pass over an iron catalyst at about 450 °C in the converter where about 15% becomes ammonia, are cooled so that ammonia liquefies and is run off, and the unreacted nitrogen and hydrogen are recycled back to the compressor.",
    "Figure: the Haber process; unreacted gases are recycled", "industry/haber-process", "## Inside the plant");
}

// ---------- Contact process flow
{
  const W = 190, H = 80;
  const nd = (x, y, s, o = {}) => D.node(x, y, W, H, s, { size: 13, ...o });
  const b =
    nd(10, 20, "1. Burn sulfur (or roast\nsulfide ore) in air:\nS + O₂ → SO₂") + arr(200, 60, 230, 60) +
    nd(230, 20, "Clean and dry the gases\n(impurities would poison\nthe catalyst)") + arr(420, 60, 450, 60) +
    nd(450, 20, "2. Converter: V₂O₅\ncatalyst, about 450 °C,\nabout 2 atm\n2SO₂ + O₂ ⇌ 2SO₃", { fill: C.fillAmber }) +
    bend([[545, 100], [545, 140], [105, 140], [105, 170]]) +
    nd(10, 172, "3. Absorb SO₃ in 98%\nH₂SO₄ to make oleum:\nH₂SO₄ + SO₃ → H₂S₂O₇") + arr(200, 212, 230, 212) +
    nd(230, 172, "Add water carefully:\nH₂S₂O₇ + H₂O →\n2H₂SO₄") + arr(420, 212, 450, 212) +
    nd(450, 172, "Concentrated\nsulfuric acid", { fill: C.fillGreen, weight: 700 }) +
    T(320, 290, "SO₃ is not added to water directly: the reaction would make a mist of acid", { anchor: "middle", size: 13, fill: C.muted });
  await put("contact-process-flow", 660, 310, b,
    "Flow chart of the Contact process: sulfur is burned or sulfide ore roasted in air to make sulfur dioxide, the gases are cleaned and dried, sulfur dioxide and oxygen react over a vanadium(V) oxide catalyst at about 450 °C and 2 atm to make sulfur trioxide, which is absorbed in 98% sulfuric acid to form oleum, and water is then added to make concentrated sulfuric acid.",
    "Figure: the Contact process in three stages", "industry/contact-process", "## Stage 1: making sulfur dioxide");
}

// ---------- Blast furnace
{
  const left = [[190, 90], [160, 230], [190, 330], [215, 395]], right = [[330, 90], [360, 230], [330, 330], [305, 395]];
  const outline = D.polyline([[190, 70], [190, 90], [160, 230], [190, 330], [215, 395], [305, 395], [330, 330], [360, 230], [330, 90], [330, 70]], { stroke: C.ink, width: 3.5 });
  const b = D.polyline([[190, 90], [160, 230], [190, 330], [215, 395], [305, 395], [330, 330], [360, 230], [330, 90]], { fill: "#f0e1d1", stroke: "none", close: true }) +
    D.polyline([[212, 385], [215, 395], [305, 395], [308, 385]], { fill: "#e9a24a", stroke: "none", close: true }) +
    D.rect(213, 370, 94, 12, { fill: "#d8d4cf", stroke: "none" }) + D.rect(215, 382, 90, 13, { fill: "#e9a24a", stroke: "none" }) + outline +
    // inputs
    arr(260, 20, 260, 66, { width: 2.4 }) + T(260, 14, "haematite, coke and limestone", { anchor: "middle", size: 13, weight: 700 }) +
    // waste gases
    arr(340, 60, 440, 40) + T(448, 40, "waste gases:\nN₂, CO₂, some CO", { size: 13 }) +
    // hot air
    arr(60, 330, 170, 326, { stroke: C.red }) + arr(460, 330, 350, 326, { stroke: C.red }) + T(20, 352, "hot air", { size: 13, fill: C.red, weight: 700 }) + T(448, 352, "hot air", { size: 13, fill: C.red, weight: 700 }) +
    // outputs
    arr(190, 386, 90, 410, { stroke: C.muted }) + T(10, 428, "molten slag\n(floats on the iron)", { size: 13 }) +
    arr(300, 392, 400, 420, { stroke: C.muted }) + T(380, 438, "molten iron", { size: 13, weight: 700 }) +
    // reactions
    D.line(360, 130, 400, 130, { stroke: C.muted, width: 1.2 }) + T(406, 134, "CaCO₃ → CaO + CO₂", { size: 13 }) +
    D.line(360, 200, 400, 200, { stroke: C.muted, width: 1.2 }) + T(406, 190, "Fe₂O₃ + 3CO → 2Fe + 3CO₂", { size: 13, weight: 700, fill: C.blue }) + T(406, 214, "(iron(III) oxide is reduced)", { size: 12, fill: C.muted }) +
    D.line(350, 262, 400, 262, { stroke: C.muted, width: 1.2 }) + T(406, 258, "C + CO₂ → 2CO", { size: 13 }) +
    D.line(335, 318, 400, 300, { stroke: C.muted, width: 1.2 }) + T(406, 296, "C + O₂ → CO₂", { size: 13 }).replace("", "") +
    T(10, 262, "CaO + SiO₂ → CaSiO₃\n(slag forms here)", { size: 13 }) + D.line(130, 284, 186, 300, { stroke: C.muted, width: 1.2 }) +
    T(260, 160, "iron ore\nbeing reduced", { anchor: "middle", size: 13, fill: C.muted }).replace("", "");
  await put("blast-furnace-schematic", 580, 460, b,
    "Blast furnace: haematite, coke and limestone are fed in at the top and hot air is blown in near the bottom; carbon burns to carbon dioxide (C + O2), carbon dioxide is reduced to carbon monoxide (C + CO2), carbon monoxide reduces iron(III) oxide to iron (Fe2O3 + 3CO), limestone decomposes and its calcium oxide reacts with silicon dioxide to make slag; molten slag floats on molten iron and both are tapped off at the bottom, while waste gases leave at the top.",
    "Figure: the blast furnace with its main reactions", "metals/extraction-and-iron", "### The reactions, step by step");
}

// ---------- Fractionating column
{
  const fr = [["refinery gas", "1–4", "bottled gas"], ["gasoline (petrol)", "5–10", "car fuel"], ["naphtha", "6–12", "chemical feedstock"], ["kerosene (paraffin)", "10–16", "jet fuel, paraffin"], ["diesel oil", "14–20", "diesel engines"], ["fuel oil", "20–40", "ships, heating"], ["lubricating oil", "30–50", "lubricants, waxes"], ["bitumen", "more than 50", "road surfaces"]];
  const top = 50, bot = 440, step = (bot - top - 40) / (fr.length - 1);
  let b = D.rect(190, top - 20, 90, bot - top + 40, { fill: "#f4f9fb", stroke: C.ink, width: 3 }).replace("", "") +
    D.rect(190, top - 20, 90, bot - top + 40, { fill: "#f4f9fb", stroke: C.ink, width: 3, r: 10 });
  for (let i = 0; i < fr.length; i += 1) {
    const y = top + 14 + i * step;
    b += D.line(190, y + 22, 280, y + 22, { stroke: C.muted, width: 1.3 }) + D.line(280, y, 320, y, { stroke: C.ink, width: 2 }) +
      T(326, y + 5, `${fr[i][0]}  (C${fr[i][1] === "more than 50" ? " >50" : " " + fr[i][1]})`, { size: 13, weight: 700 }) + T(326, y + 21, fr[i][2], { size: 12, fill: C.muted });
  }
  b += arr(60, 410, 188, 410, { width: 2.4 }) + T(10, 378, "crude oil vapour\nfrom the furnace", { size: 13, fill: C.red, weight: 700 }) +
    arr(150, 300, 150, 80, { stroke: C.blue, width: 2 }) + T(10, 80, "cooler,\nlower boiling\npoints", { size: 13, fill: C.blue, weight: 700 }) + T(10, 318, "hotter,\nhigher boiling\npoints", { size: 13, fill: C.red, weight: 700 });
  await put("crude-oil-fractionating-column", 620, 480, b,
    "Fractionating column for crude oil: hot vapour enters near the bottom and the column is cooler towards the top; from the top down the fractions drawn off are refinery gas (1 to 4 carbon atoms), gasoline, naphtha, kerosene, diesel oil, fuel oil, lubricating oil and bitumen (more than 50), so chain length and boiling point increase down the column.",
    "Figure: the fractions of crude oil, top to bottom", "fuels/crude-oil", "## Fractional distillation of crude oil");
}
