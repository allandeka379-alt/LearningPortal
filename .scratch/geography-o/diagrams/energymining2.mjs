// geography-o second pass: energy and mining diagrams. Run from repo root: node .scratch/geography-o/diagrams/energymining2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, figBefore, poly, SOIL, SAND, GRASS, ROCK } from "./kit2.mjs";

// ---------- 1. Hydro-electric power station (energy/power-generation.md)
{
  const W = 560, H = 380, top = 90, base = 300, tail = 270;
  let b = poly([[0, top], [248, top], [248, base], [0, base]], { fill: "#a9d6e5", stroke: "none" });
  b += poly([[330, tail], [470, tail], [470, base], [330, base]], { fill: "#a9d6e5", stroke: "none" });
  b += D.rect(0, base, W, 80, { fill: ROCK, stroke: C.axis, width: 1.5 }) + D.rect(470, 240, 90, 60, { fill: ROCK, stroke: C.axis, width: 1.5 });
  b += poly([[248, 70], [300, 70], [330, base], [235, base]], { fill: "#d8d3cb", stroke: C.axis, width: 2.2 });
  b += D.line(0, top, 248, top, { stroke: C.blue, width: 2, dash: true });
  b += D.rect(242, 224, 10, 14, { fill: "#ffffff", stroke: C.axis, width: 1.6 });
  b += D.path_("M252,231 L292,231 L336,278", { stroke: C.blue, width: 6 });
  b += D.rect(322, 238, 100, 62, { fill: "#ffffff", stroke: C.axis, width: 2 }) + D.circle(344, 284, 12, { fill: C.fillAmber, stroke: C.amber, width: 2 });
  b += D.line(356, 284, 376, 284, { stroke: C.axis, width: 2.4 }) + D.rect(376, 262, 38, 34, { fill: C.fillGreen, stroke: C.green, width: 2 }) + D.text(395, 285, "G", { anchor: "middle", size: 16, weight: 700 });
  b += D.arrow(424, 288, 466, 288, { stroke: C.blue, width: 2.4 });
  b += D.rect(484, 208, 28, 32, { fill: C.fillGrey, stroke: C.axis, width: 1.8 }) + D.line(414, 270, 414, 224, { stroke: C.axis, width: 1.6 }) + D.line(414, 224, 484, 224, { stroke: C.axis, width: 1.6 });
  b += D.line(538, 110, 538, 240, { stroke: C.axis, width: 3 }) + D.line(522, 130, 554, 130, { stroke: C.axis, width: 2.4 }) + D.line(526, 156, 550, 156, { stroke: C.axis, width: 2.4 }) + D.line(512, 224, 538, 160, { stroke: C.axis, width: 1.6 });
  b += D.line(30, top, 30, 284, { stroke: C.red, width: 1.8, arrow: true, arrowStart: true }) + lab(40, 190, "Head: height of water", { size: 12.5, fill: C.red }) + D.text(48, 210, "above the turbine", { size: 12.5, fill: C.red });
  b += D.text(150, 126, "RESERVOIR", { anchor: "middle", weight: 700, size: 14, fill: C.blue }) + D.text(150, 144, "(Lake Kariba)", { anchor: "middle", size: 13, fill: C.blue });
  b += lab(8, 262, "Intake near the base", { size: 12.5 }) + D.line(130, 258, 242, 232, { stroke: C.muted, width: 1.2 });
  b += lab(100, 344, "Dam wall (Kariba Gorge)", { size: 12.5 }) + D.line(180, 328, 262, 296, { stroke: C.muted, width: 1.2 });
  b += lab(160, 54, "Penstock: water falls", { size: 12.5 }) + D.line(260, 60, 292, 228, { stroke: C.muted, width: 1.2 });
  b += lab(326, 150, "Turbine spins the generator", { size: 12.5 }) + D.line(380, 156, 346, 274, { stroke: C.muted, width: 1.2 });
  b += lab(376, 196, "Transformer", { size: 12.5 }) + D.line(430, 202, 486, 214, { stroke: C.muted, width: 1.2 });
  b += lab(556, 92, "To the national grid", { size: 12.5, anchor: "end" });
  b += lab(440, 344, "Water returns to the river", { size: 12.5, anchor: "middle" });
  await fig("hydro-electric-station-section",
    D.svg(W, H, b),
    "Cross-section of a hydro-electric power station: water from the reservoir enters an intake near the base of the dam wall, falls down a penstock to spin a turbine and generator, a transformer raises the voltage for the grid, and the water returns to the river; a greater head gives more power.",
    "Figure: how a hydro-electric station such as Kariba South generates electricity",
    "energy/power-generation", "**Hydro-electric power (HEP).**");
}

// ---------- 2. Coal-fired thermal station flow (energy/power-generation.md)
{
  const W = 560, bw = 118, bh = 66;
  const N = (x, y, s, f) => D.node(x, y, bw, bh, s, { fill: f, size: 13 });
  let b = N(8, 20, "Coal\n(crushed to\npowder)", C.fillGrey) + N(146, 20, "Boiler\n(burns coal,\nmakes steam)", C.fillAmber) + N(284, 20, "Turbine\n(steam spins\nthe blades)", C.fillBlue) + N(422, 20, "Generator\n(makes\nelectricity)", C.fillGreen);
  b += D.arrow(126, 53, 144, 53, { stroke: C.ink, width: 2.4 }) + D.arrow(264, 53, 282, 53, { stroke: C.ink, width: 2.4 }) + D.arrow(402, 53, 420, 53, { stroke: C.ink, width: 2.4 });
  b += N(284, 150, "Condenser\n(steam cooled\nto water)", "#cfeaf3") + N(422, 150, "Transformer\n(raises voltage)", C.fillGrey);
  b += D.arrow(343, 88, 343, 148, { stroke: C.ink, width: 2.4 }) + D.arrow(481, 88, 481, 148, { stroke: C.ink, width: 2.4 });
  b += D.path_("M284,183 L205,183 L205,88", { stroke: C.blue, width: 2.4, arrow: true });
  b += D.text(278, 204, "water returns to the boiler", { anchor: "end", size: 12.5, fill: C.blue });
  b += D.arrow(481, 218, 481, 244, { stroke: C.ink, width: 2.4 }) + D.text(481, 262, "National grid", { anchor: "middle", size: 13.5, weight: 700 });
  b += D.arrow(343, 232, 343, 218, { stroke: C.blue, width: 2 }) + D.text(343, 248, "Cooling water", { anchor: "middle", size: 12.5, fill: C.blue }) + D.text(343, 264, "(piped from a river)", { anchor: "middle", size: 12.5, fill: C.blue });
  b += D.text(10, 246, "Hwange: coal comes by conveyor,", { size: 12.5, fill: C.muted }) + D.text(10, 262, "cooling water from the Zambezi", { size: 12.5, fill: C.muted });
  await fig("coal-thermal-station-flow",
    D.svg(W, 284, b),
    "Flow chart of a coal-fired power station such as Hwange: coal burns in a boiler to make steam, the steam spins a turbine and generator, a transformer raises the voltage for the national grid, and the steam is cooled in a condenser with river water and returned to the boiler.",
    "Figure: from coal to electricity in a thermal power station",
    "energy/power-generation", "**Coal-fired thermal power.**");
}

// ---------- 3. Mining methods (mining/factors-methods.md)
{
  const W = 560, H = 440, pw = 272, ph = 190;
  let b = "";
  const panel = (ox, oy, title) => D.rect(ox, oy, pw, ph, { stroke: C.grid, width: 1.5 }) + D.text(ox + 8, oy + 20, title, { weight: 700, size: 13.5 });
  const SEAM = "#3a3733";
  // A open-cast (benched pit) down to a shallow seam
  {
    const ox = 4, oy = 4; b += panel(ox, oy, "A  Open-cast (surface)");
    b += poly([[ox + 1, oy + 60], [ox + 50, oy + 60], [ox + 70, oy + 78], [ox + 90, oy + 78], [ox + 108, oy + 96], [ox + 126, oy + 96], [ox + 144, oy + 134], [ox + 190, oy + 134], [ox + 208, oy + 96], [ox + 226, oy + 96], [ox + 244, oy + 78], [ox + 262, oy + 78], [ox + 262, oy + 60], [ox + pw - 1, oy + 60], [ox + pw - 1, oy + ph - 1], [ox + 1, oy + ph - 1]], { fill: SOIL, stroke: "#8a6a3b", width: 2 });
    b += D.rect(ox + 1, oy + 134, pw - 2, 14, { fill: SEAM, stroke: "none" });
    b += D.text(ox + 136, oy + 172, "Ore seam", { anchor: "middle", size: 12.5, fill: C.muted }) + D.text(ox + 168, oy + 52, "Overburden removed in benches", { anchor: "middle", size: 12.5 }).replace("", "");
    b += D.text(ox + 12, oy + 50, "", {});
  }
  // B shaft
  {
    const ox = 280, oy = 4; b += panel(ox, oy, "B  Shaft (underground)");
    b += D.rect(ox + 1, oy + 60, pw - 2, ph - 61, { fill: SOIL, stroke: "none" }) + D.line(ox + 1, oy + 60, ox + pw - 1, oy + 60, { stroke: "#8a6a3b", width: 2 });
    b += D.rect(ox + 1, oy + 150, pw - 2, 14, { fill: SEAM, stroke: "none" });
    b += D.rect(ox + 70, oy + 60, 12, 92, { fill: "#ffffff", stroke: C.axis, width: 1.8 }) + poly([[ox + 62, oy + 60], [ox + 76, oy + 36], [ox + 90, oy + 60]], { fill: C.fillGrey, stroke: C.axis, width: 1.8 });
    b += D.rect(ox + 82, oy + 148, 140, 8, { fill: "#ffffff", stroke: C.axis, width: 1.4 });
    b += D.text(ox + 160, oy + 100, "Vertical shaft, then", { size: 12.5 }) + D.text(ox + 160, oy + 116, "levels run to the ore", { size: 12.5 });
  }
  // C adit
  {
    const ox = 4, oy = 202; b += panel(ox, oy, "C  Adit (underground)");
    b += poly([[ox + 1, oy + 150], [ox + 40, oy + 150], [ox + 110, oy + 60], [ox + 200, oy + 60], [ox + 262, oy + 150], [ox + pw - 1, oy + 150], [ox + pw - 1, oy + ph - 1], [ox + 1, oy + ph - 1]], { fill: SOIL, stroke: "#8a6a3b", width: 2 });
    b += D.rect(ox + 60, oy + 120, 190, 14, { fill: SEAM, stroke: "none" });
    b += D.rect(ox + 40, oy + 124, 100, 6, { fill: "#ffffff", stroke: C.axis, width: 1.4 });
    b += D.text(ox + 8, oy + 44, "Horizontal tunnel", { size: 12.5 }) + D.text(ox + 8, oy + 60, "into the hillside", { size: 12.5 }) + D.text(ox + 20, oy + 176, "water drains out naturally", { size: 12.5, fill: C.blue });
  }
  // D drift
  {
    const ox = 280, oy = 202; b += panel(ox, oy, "D  Drift (underground)");
    b += D.rect(ox + 1, oy + 60, pw - 2, ph - 61, { fill: SOIL, stroke: "none" }) + D.line(ox + 1, oy + 60, ox + pw - 1, oy + 60, { stroke: "#8a6a3b", width: 2 });
    b += poly([[ox + 30, oy + 60], [ox + 262, oy + 150], [ox + 262, oy + 164], [ox + 30, oy + 76]], { fill: SEAM, stroke: "none" });
    b += D.line(ox + 34, oy + 66, ox + 250, oy + 150, { stroke: "#ffffff", width: 5 });
    b += D.text(ox + 20, oy + 176, "Sloping tunnel follows a dipping seam", { size: 12.5 });
  }
  b += D.rect(10, 408, 14, 14, { fill: SEAM, stroke: "none" }) + D.text(30, 420, "Ore seam (black)", { size: 12.5 });
  b += D.text(556, 420, "Soil and rock above the ore is the overburden.", { anchor: "end", size: 12.5, fill: C.muted });
  await fig("mining-methods-sections",
    D.svg(W, H, b),
    "Four mining methods in cross-section: open-cast removes the overburden in benches to reach a shallow seam; a shaft mine sinks a vertical shaft with levels to deep ore; an adit is a horizontal tunnel into a hillside; a drift is a sloping tunnel that follows a dipping seam.",
    "Figure: open-cast, shaft, adit and drift mining compared",
    "mining/factors-methods", "### Underground methods").catch((e) => console.log(e.message));
}

// ---------- 4. Gold processing (mining/processing-beneficiation.md): the seven steps in the lesson
{
  const bw = 120, bh = 84, W = 560;
  const steps = [
    ["1 Crushing", "jaw and cone\ncrushers break\nthe ore"], ["2 Milling", "ball mills grind\nit to a slurry"], ["3 Gravity", "heavy coarse\ngold caught\nfirst"], ["4 Leaching", "cyanide dissolves\nfine gold; carbon\nabsorbs it"],
    ["5 Recovery", "electrowinning\nstrips the gold\nfrom the carbon"], ["6 Smelting", "melted into\nbars of impure\nbullion"], ["7 Refining", "Fidelity Gold\nRefinery,\nHarare"],
  ];
  const xs = [8, 146, 284, 422];
  let b = "";
  const pos = [[xs[0], 20], [xs[1], 20], [xs[2], 20], [xs[3], 20], [xs[3], 150], [xs[2], 150], [xs[1], 150]];
  const fills = [C.fillGrey, C.fillGrey, C.fillAmber, C.fillBlue, C.fillBlue, C.fillAmber, C.fillGreen];
  steps.forEach(([t, d], i) => {
    const [x, y] = pos[i];
    b += D.rect(x, y, bw, bh, { fill: fills[i], stroke: C.axis, width: 1.8, r: 8 }) + D.text(x + bw / 2, y + 22, t, { anchor: "middle", weight: 700, size: 14 }) + D.text(x + bw / 2, y + 42, d, { anchor: "middle", size: 12.5 });
  });
  for (const i of [0, 1, 2]) b += D.arrow(pos[i][0] + bw + 2, 62, pos[i + 1][0] - 2, 62, { stroke: C.ink, width: 2.4 });
  b += D.arrow(xs[3] + bw / 2, 106, xs[3] + bw / 2, 148, { stroke: C.ink, width: 2.4 });
  b += D.arrow(xs[3] - 2, 192, xs[2] + bw + 2, 192, { stroke: C.ink, width: 2.4 }) + D.arrow(xs[2] - 2, 192, xs[1] + bw + 2, 192, { stroke: C.ink, width: 2.4 });
  b += D.text(8, 196, "Refined gold", { size: 13, weight: 600 }) + D.text(8, 213, "is then sold", { size: 13, weight: 600 });
  await fig("gold-processing-flow",
    D.svg(W, 250, b),
    "Flow chart of gold processing in seven steps: crushing, milling to a slurry, gravity concentration of coarse gold, cyanide leaching with carbon, recovery by electrowinning, smelting into bullion bars and refining at Fidelity Gold Refinery in Harare.",
    "Figure: from gold ore to refined gold",
    "mining/processing-beneficiation", "### Gold").catch((e) => console.log(e.message));
}

// ---------- 5. Where alluvial gold collects (mining/small-scale.md)
{
  const W = 560, H = 380;
  const cy = (x) => 150 + 70 * Math.sin((x - 20) / 85);
  let b = D.rect(0, 0, W, H, { fill: "#f4ecdc", stroke: "none" });
  let d = "";
  for (let x = 20; x <= 540; x += 6) d += `${x === 20 ? "M" : "L"}${x},${cy(x)} `;
  b += D.path_(`M470,282 C 466,230 474,180 478,${cy(478) + 14}`, { stroke: "#a9d6e5", width: 14 });
  b += D.path_(d.trim(), { stroke: "#a9d6e5", width: 40 }) + D.path_(d.trim(), { stroke: C.blue, width: 1.6, dash: true });
  b += D.arrow(24, cy(24) - 2, 60, cy(60) + 2, { stroke: C.blue, width: 2.4 }) + D.text(18, cy(24) - 30, "Flow", { fill: C.blue, weight: 700, size: 13 });
  b += D.circle(153, 188, 15, { fill: "#f6c691", stroke: C.amber, width: 1.8 }) + D.circle(420, 114, 15, { fill: "#f6c691", stroke: C.amber, width: 1.8 });
  for (const [x, y] of [[262, cy(262) - 6], [276, cy(276) + 6], [290, cy(290) - 4]]) b += D.circle(x, y, 8, { fill: ROCK, stroke: C.axis, width: 1.6 });
  for (const [x, y] of [[76, cy(76) + 44], [96, cy(96) + 50], [118, cy(118) + 50]]) b += D.circle(x, y, 6, { fill: "#8a6a3b", stroke: "#5c4526", width: 1.4 });
  for (let k = 0; k < 4; k++) b += D.polyline([[340 + k * 10, cy(340) - 18], [346 + k * 10, cy(340) - 6], [340 + k * 10, cy(340) + 6], [346 + k * 10, cy(340) + 18]], { stroke: C.blue, width: 1.8 });
  b += D.circle(380, cy(380) + 26, 12, { fill: "#f6c691", stroke: C.amber, width: 1.8 });
  const num = (x, y, n) => D.circle(x, y, 11, { fill: "#ffffff", stroke: C.red, width: 2 }) + D.text(x, y + 5, String(n), { anchor: "middle", weight: 700, size: 14, fill: C.red });
  b += num(153, 188, 1) + num(420, 114, 1) + num(276, cy(276) + 34, 2) + num(97, cy(97) + 76, 3) + num(380, cy(380) + 26, 4);
  b += D.text(14, 312, "Gold is heavy (about 19 times as dense as water), so it drops where the water slows.", { size: 12.5, fill: C.muted });
  b += lab(14, 340, "1 Inside of a bend   2 Behind boulders and rock bars", { size: 12.5 });
  b += lab(14, 366, "3 Potholes in the bedrock   4 Below rapids or where a tributary joins", { size: 12.5 });
  await figBefore("alluvial-gold-meander-plan",
    D.svg(W, H, b),
    "Plan view of a winding river showing where heavy alluvial gold collects, because the water slows there: (1) the inside of bends, (2) behind boulders and rock bars, (3) potholes in the bedrock and (4) below rapids or where a tributary joins.",
    "Figure: where alluvial gold collects along a river (plan view)",
    "mining/small-scale", "## Gold panning");
}
