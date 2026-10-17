// Run from repo root: node .scratch/chemistry-o/diagrams/organic2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";
import { atom, bond, twoCarbon } from "./_disp.mjs";

const S = 46;
const hl = (x1, y1, x2, y2) => D.rect(x1, y1, x2 - x1, y2 - y1, { stroke: C.amber, dash: true, width: 2, r: 8 });

// ---- four homologous series: displayed formulae with functional groups marked
{
  const w = 600, h = 400;
  let b = "";
  const panel = (px, py, build, t1, t2) => {
    const x = px + 62, y = py + 70;
    return build(x, y) + T(px + 20, py + 156, t1, { size: 14, weight: 700 }) + T(px + 20, py + 175, t2, { size: 13, fill: C.muted });
  };
  // ethane
  b += panel(0, 0, (x, y) => twoCarbon(x, y, ["H", "H", "H", "H"], 1) + bond(x, y, x - S, y) + atom(x - S, y, "H") + bond(x + S, y, x + 2 * S, y) + atom(x + 2 * S, y, "H") + atom(x, y, "C") + atom(x + S, y, "C"),
    "Alkane: ethane, C₂H₆", "only single bonds: saturated");
  // ethene
  b += panel(300, 0, (x, y) => twoCarbon(x, y, ["H", "H", "H", "H"], 2) + hl(x - 16, y - 16, x + S + 16, y + 16),
    "Alkene: ethene, C₂H₄", "C=C (dashed box): unsaturated");
  // ethanol
  b += panel(0, 195, (x, y) => twoCarbon(x, y, ["H", "H", "H", "H"], 1) + bond(x, y, x - S, y) + atom(x - S, y, "H") + bond(x + S, y, x + 2 * S, y) + atom(x + 2 * S, y, "O") + bond(x + 2 * S, y, x + 3 * S, y) + atom(x + 3 * S, y, "H") + atom(x, y, "C") + atom(x + S, y, "C") + hl(x + 2 * S - 16, y - 16, x + 3 * S + 16, y + 16),
    "Alcohol: ethanol, C₂H₅OH", "–OH group (dashed box)");
  // ethanoic acid
  b += panel(300, 195, (x, y) => {
    let s = bond(x, y, x + S, y) + bond(x, y, x, y - S) + atom(x, y - S, "H") + bond(x, y, x, y + S) + atom(x, y + S, "H") + bond(x, y, x - S, y) + atom(x - S, y, "H");
    s += bond(x + S, y, x + S, y - S, { order: 2 }) + atom(x + S, y - S, "O");
    s += bond(x + S, y, x + 2 * S, y) + atom(x + 2 * S, y, "O") + bond(x + 2 * S, y, x + 3 * S, y) + atom(x + 3 * S, y, "H");
    s += atom(x, y, "C") + atom(x + S, y, "C");
    return s + hl(x + S - 18, y - S - 18, x + 3 * S + 18, y + 18);
  }, "Carboxylic acid: CH₃COOH", "ethanoic acid; –COOH group (dashed box)");
  await put("homologous-series-functional-groups", w, h, b,
    "Displayed formulae of four organic compounds: ethane (alkane, only single bonds), ethene (alkene, C=C double bond), ethanol (alcohol, -OH group) and ethanoic acid (carboxylic acid, -COOH group), each carbon with four bonds and each hydrogen with one.",
    "Figure: displayed formulae of ethane, ethene, ethanol and ethanoic acid, with the functional group boxed",
    "organic/homologous-series", "The displayed formula of ethanoic acid shows");
}

// ---- alkane boiling points
{
  const data = [["methane", "CH₄", -162], ["ethane", "C₂H₆", -89], ["propane", "C₃H₈", -42], ["butane", "C₄H₁₀", -1], ["pentane", "C₅H₁₂", 36], ["hexane", "C₆H₁₄", 69]];
  const rt = 25;
  const w = 600, h = 420;
  const ax = D.axes({ x: [0, 6], y: [-200, 100], w, h, xTicks: [], yTicks: [-200, -150, -100, -50, 0, 50, 100], origin: true, arrows: false, yLabel: "Boiling point / °C", pad: { l: 70, r: 20, t: 30, b: 76 } });
  let b = ax.frame;
  const bw = 46;
  data.forEach(([name, f, v], i) => {
    const cx = ax.X(i + 0.5);
    const gas = v < rt;
    b += D.rect(cx - bw / 2, Math.min(ax.Y(v), ax.Y(0)), bw, Math.abs(ax.Y(v) - ax.Y(0)), { fill: gas ? C.teal : C.amber, stroke: "none" });
    b += T(cx, v < 0 ? ax.Y(v) + 18 : ax.Y(v) - 7, String(v).replace("-", "−"), { anchor: "middle", size: 13, weight: 700 });
    b += T(cx, h - 50, name, { anchor: "middle", size: 12 });
    b += T(cx, h - 32, f, { anchor: "middle", size: 12, fill: C.muted });
    b += T(cx, h - 14, gas ? "gas" : "liquid", { anchor: "middle", size: 12, weight: 700, fill: gas ? C.blue : C.amber });
  });
  b += D.line(ax.X(0), ax.Y(rt), ax.X(6), ax.Y(rt), { stroke: C.red, width: 1.6, dash: true });
  b += D.tag(ax.X(0) + 12, ax.Y(rt) - 10, "25 °C: room temperature", { anchor: "start", size: 12, stroke: C.red });
  await put("alkane-boiling-points-trend", w, h, b,
    "Bar chart of alkane boiling points rising with chain length: methane −162, ethane −89, propane −42, butane −1, pentane 36 and hexane 69 degrees Celsius; the first four are gases at 25 degrees Celsius and pentane and hexane are liquids.",
    "Figure: boiling points of the first six alkanes against 25 °C room temperature",
    "organic/homologous-series", "Each extra $\\ce{CH2}$ unit makes the molecules bigger");
}

// ---- chromatography of a protein hydrolysate (natural-polymers worked example)
{
  const w = 560, h = 400;
  const front = 7.5, spot = 3.0;
  const std = [["P", 0.25], ["Q", 0.40], ["S", 0.62]];
  const scale = 32, base = 300; // px per cm; y of baseline
  const yOf = (cm) => base - cm * scale;
  const lanes = [["P", 150, 0.25 * front], ["Q", 215, 0.4 * front], ["S", 280, 0.62 * front], ["protein\nhydrolysate", 360, spot]];
  let b = D.rect(100, 40, 320, 280, { fill: "#fbf8f2", stroke: C.axis, width: 1.6 });
  b += D.line(100, base, 420, base, { stroke: C.muted, width: 1.4, dash: true });
  b += D.line(100, yOf(front), 420, yOf(front), { stroke: C.ink, width: 1.6 });
  b += T(104, yOf(front) - 6, "solvent front", { size: 12 });
  b += T(104, base + 16, "baseline (pencil)", { size: 12, fill: C.muted });
  lanes.forEach(([n, x, cm], i) => {
    b += D.circle(x, yOf(cm), 9, { fill: "#8a63b8", stroke: C.purple, width: 1.4 });
    b += T(x, base + 38, n, { anchor: "middle", size: 14, weight: 700 });
  });
  // match line from unknown to Q
  b += D.line(215 + 12, yOf(spot), 360 - 12, yOf(spot), { stroke: C.green, width: 1.6, dash: true });
  // distance arrows
  b += D.line(70, base, 70, yOf(front), { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true });
  b += T(66, (base + yOf(front)) / 2, "7.5 cm", { anchor: "end", size: 13 });
  b += D.line(448, base, 448, yOf(spot), { stroke: C.blue, width: 1.4, arrow: true, arrowStart: true });
  b += T(454, (base + yOf(spot)) / 2 + 4, "3.0 cm", { size: 13, fill: C.blue });
  b += T(100, 28, "Rf = 3.0 ÷ 7.5 = 0.40, which matches Q (0.40)", { size: 14, weight: 700 });
  b += T(100, 386, "Standard Rf: P 0.25, Q 0.40, S 0.62 (purple spots after ninhydrin)", { size: 12, fill: C.muted });
  await put("chromatography-amino-acids-rf-match", w, h, b,
    `Chromatogram: standards P, Q and S travel ${(0.25 * front).toFixed(2)} cm, ${(0.4 * front).toFixed(1)} cm and ${(0.62 * front).toFixed(2)} cm (Rf 0.25, 0.40, 0.62); the protein hydrolysate spot moved 3.0 cm of 7.5 cm, Rf 0.40, so it matches amino acid Q.`,
    "Figure: identifying an amino acid by its Rf value (3.0 cm ÷ 7.5 cm = 0.40)",
    "organic/natural-polymers", "distance moved by the spot");
}

// ---- protein chain formation
{
  const w = 600, h = 250;
  let b = "";
  const aa = (x, r) => D.rect(x, 20, 160, 44, { fill: C.fillBlue, stroke: C.axis, r: 6 }) + T(x + 80, 48, `H₂N–CHR${r}–COOH`, { anchor: "middle", size: 14, weight: 700 });
  b += aa(20, "₁") + T(190, 48, "+", { anchor: "middle", size: 18 }) + aa(205, "₂") + T(375, 48, "+", { anchor: "middle", size: 18 }) + aa(390, "₃");
  b += D.arrow(300, 70, 300, 118, { width: 2.4 });
  b += T(312, 100, "condensation: water lost at each link", { size: 13 });
  const y = 150;
  const seg = (x, wd, s, fill) => D.rect(x, y - 22, wd, 44, { fill: fill ?? "none", stroke: fill ? C.axis : "none", r: 20 }) + T(x + wd / 2, y + 5, s, { anchor: "middle", size: 14, weight: 700 });
  b += seg(14, 92, "H₂N–CHR₁–");
  b += seg(108, 70, "CONH", C.fillAmber);
  b += seg(180, 74, "–CHR₂–");
  b += seg(256, 70, "CONH", C.fillAmber);
  b += seg(328, 112, "–CHR₃–COOH");
  b += T(450, y + 5, "+ 2H₂O", { size: 16, weight: 700 });
  b += T(14, 214, "Highlighted: the two amide links, CO–NH. Three amino acids give 2 water molecules.", { size: 13 });
  await put("protein-formation-amide-links", w, h, b,
    "Three amino acids H2N-CHR-COOH join in turn, each COOH reacting with the next NH2: the chain H2N-CHR1-CO-NH-CHR2-CO-NH-CHR3-COOH has two amide links and two water molecules are released.",
    "Figure: three amino acids join by two amide links, releasing 2 water molecules",
    "organic/natural-polymers", "There are about 20 different amino acids");
}
