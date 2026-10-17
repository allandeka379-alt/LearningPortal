// economics-a: macroeconomics lessons. Run: node .scratch/economics-a/diagrams/macro.mjs
import { D, C, put, putAfterBlock, lab, dotted, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);
const hline = (ax, y, x0, x1, o = {}) => ax.line([[x0, y], [x1, y]], o);
const vline = (ax, x, y0, y1, o = {}) => ax.line([[x, y0], [x, y1]], { stroke: C.muted, dash: true, width: 1.4, ...o });
const mk = (o) => D.axes({ w: 600, h: 450, ...o });
const comma = (v) => v.toLocaleString("en-GB");

// ---- circular flow (circular-flow.md) with the worked-example numbers
{
  const W = 620, H = 540;
  const box = (x, y, w, h, t, fill) => D.node(x, y, w, h, t, { fill, size: 15, weight: 700 });
  const mids = [132, 260, 388];
  const names = ["Financial sector\n(banks)", "Government", "Rest of the world"];
  const leak = ["S 1,200", "T 1,800", "M 900"];
  const inj = ["I 1,500", "G 1,700", "X 800"];
  let body = box(20, 210, 130, 80, "Households", C.fillBlue) + box(470, 210, 130, 80, "Firms", C.fillAmber);
  const ys = [222, 250, 278];
  mids.forEach((m, i) => {
    body += box(235, m - 32, 150, 64, names[i], C.fillGrey);
    body += D.arrow(150, ys[i], 233, m, { stroke: C.amber, width: 2 }) + D.arrow(387, m, 470, ys[i], { stroke: C.blue, width: 2 });
    const t = 0.42, off = i === 1 ? -10 : 6;
    body += D.tag(150 + (233 - 150) * t, ys[i] + (m - ys[i]) * t + off, leak[i], { anchor: "middle", size: 13, fill: C.amber });
    body += D.tag(387 + (470 - 387) * (1 - t) - 12, m + (ys[i] - m) * (1 - t) + off, inj[i], { anchor: "middle", size: 13, fill: C.blue });
  });
  body += D.path_("M535,208 L535,72 L85,72 L85,208", { stroke: C.ink, width: 2, arrow: true });
  body += D.text(310, 62, "Factor incomes: wages, rent, interest and profit", { anchor: "middle", size: 14 });
  body += D.path_("M85,292 L85,478 L535,478 L535,292", { stroke: C.ink, width: 2, arrow: true });
  body += D.text(310, 502, "Consumption spending (C) on domestic output", { anchor: "middle", size: 14 });
  body += D.text(10, 18, "Leakages (amber arrows): S + T + M = 3,900", { size: 13, fill: C.muted }) + D.text(10, 36, "Injections (blue arrows): I + G + X = 4,000   (US$ million)", { size: 13, fill: C.muted });
  const alt = "Circular flow of an open economy with the worked-example figures (US$ million): households receive factor incomes from firms and spend on domestic output (C); leakages saving 1,200, taxes 1,800 and imports 900 total 3,900 and flow to banks, government and the rest of the world, while injections investment 1,500, government spending 1,700 and exports 800 total 4,000 flow back to firms, so injections exceed leakages by 100.";
  await put("circular-flow-open-economy", D.svg(W, H, body), alt, "Figure: the circular flow with leakages (amber) and injections (blue); J exceeds W by 100 so income expands", "macro/circular-flow", "In words, the flow diagram for the full open economy shows");
}

// ---- AD/AS equilibrium, demand-pull, cost-push (ad-as-equilibrium.md)
{
  const prices = [90, 100, 110, 120, 130];
  const ad = [11800, 11200, 10600, 10000, 9400], sras = [9200, 10000, 10600, 11100, 11500];
  const ad2 = [12900, 12300, 11700, 11100, 10500], sras2 = [8100, 8900, 9500, 10000, 10400];
  const mkAx = () => D.axes({ x: [8000, 13500], y: [80, 140], xTicks: 1000, yTicks: 10, xLabel: "Real output (US$ million)", yLabel: "Price level (index)", w: 600, h: 450, pad: { l: 64, r: 28, t: 24, b: 56 } });
  {
    const ax = mkAx();
    const body = ax.frame + vline(ax, 12000, 80, 135, { stroke: C.green, dash: false, width: 2.2 }) + ax.tag(12000, 134, "LRAS: potential 12,000", { dx: 6, dy: 0, size: 13, fill: C.green }) +
      dotted(ax, ad.map((q, i) => [q, prices[i]]), { stroke: C.blue }) + dotted(ax, sras.map((q, i) => [q, prices[i]]), { stroke: C.amber }) + dotted(ax, ad2.map((q, i) => [q, prices[i]]), { stroke: C.teal, dash: true }) +
      lab(ax, 9400, 130, "AD1", { dx: -36, dy: 4, fill: C.blue }) + lab(ax, 10500, 130, "AD2", { dx: 8, dy: 4, fill: C.teal }) + lab(ax, 9200, 90, "SRAS", { dx: -50, dy: 4, fill: C.amber }) +
      ax.point(10600, 110, { r: 6 }) + ax.tag(10600, 110, "E1: 10,600 at 110", { dx: -190, dy: 20, size: 13 }) + ax.point(11100, 120, { r: 6, stroke: C.teal }) + ax.tag(11100, 120, "E2: 11,100 at 120", { dx: 14, dy: -8, size: 13, fill: C.teal });
    const alt = "AD/AS with the worked schedule: AD1 and SRAS meet at a price level of 110 and real output 10,600, below potential output 12,000 (vertical LRAS); AD rises by 1,100 at every price to AD2, giving a new equilibrium at price level 120 and output 11,100, so both output and the price level rise (demand-pull).";
    await putAfterBlock("ad-as-demand-pull", D.svg(600, 450, body), alt, "Figure: an increase in AD raises both real output (10,600 to 11,100) and the price level (110 to 120); the economy stays below potential output of 12,000", "macro/ad-as-equilibrium", "An increase in AD: demand-pull (illustrative data)");
  }
  {
    const ax = mkAx();
    const body = ax.frame + vline(ax, 12000, 80, 135, { stroke: C.green, dash: false, width: 2.2 }) + ax.tag(12000, 134, "LRAS: potential 12,000", { dx: 6, dy: 0, size: 13, fill: C.green }) +
      dotted(ax, ad.map((q, i) => [q, prices[i]]), { stroke: C.blue }) + dotted(ax, sras.map((q, i) => [q, prices[i]]), { stroke: C.amber }) + dotted(ax, sras2.map((q, i) => [q, prices[i]]), { stroke: C.red, dash: true }) +
      lab(ax, 9400, 130, "AD", { dx: -36, dy: 4, fill: C.blue }) + lab(ax, 11500, 130, "SRAS1", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 10400, 130, "SRAS2", { dx: -10, dy: -10, fill: C.red }) +
      ax.point(10600, 110, { r: 6 }) + ax.tag(10600, 110, "E1: 10,600 at 110", { dx: 14, dy: 40, size: 13 }) + ax.point(10000, 120, { r: 6, stroke: C.red }) + ax.tag(10000, 120, "E2: 10,000 at 120", { dx: -180, dy: -10, size: 13, fill: C.red });
    const alt = "Stagflation in AD/AS: an oil price rise shifts SRAS left by 1,100 at every price level from SRAS1 to SRAS2; the equilibrium moves from price level 110 and output 10,600 to price level 120 and output 10,000, so the price level rises while real output and employment fall (cost-push).";
    await putAfterBlock("ad-as-cost-push", D.svg(600, 450, body), alt, "Figure: a fall in SRAS raises the price level (110 to 120) and lowers real output (10,600 to 10,000): stagflation", "macro/ad-as-equilibrium", "A fall in SRAS: cost-push and stagflation (illustrative data)");
  }
}

// ---- SRAS shift and LRAS views (aggregate-supply.md)
{
  const prices = [80, 90, 100, 110, 120];
  const before = [9000, 9800, 10500, 11000, 11300], after = [9600, 10400, 11100, 11600, 11900];
  const ax = D.axes({ x: [8500, 13000], y: [70, 130], xTicks: 500, yTicks: 10, xLabel: "Real output (US$ million)", yLabel: "Price level (index)", w: 600, h: 440, xFormat: comma });
  const body = ax.frame + vline(ax, 12000, 70, 125, { stroke: C.green, dash: false, width: 2.2 }) + ax.tag(12000, 125, "LRAS at 12,000", { dx: 6, size: 13, fill: C.green }) +
    dotted(ax, before.map((q, i) => [q, prices[i]]), { stroke: C.amber }) + dotted(ax, after.map((q, i) => [q, prices[i]]), { stroke: C.teal }) +
    lab(ax, 11300, 120, "SRAS1", { dx: -62, dy: 6, fill: C.amber }) + lab(ax, 11900, 120, "SRAS2", { dx: -66, dy: -12, fill: C.teal }) +
    dash(ax, [[10500, 100], [11100, 100]]) + ax.tag(10500, 100, "10,500", { dx: -66, dy: 4, size: 12 }) + ax.tag(11100, 100, "11,100", { dx: 8, dy: 22, size: 12, fill: C.teal });
  const alt = "SRAS shifts right by 600 at every price level when costs fall: SRAS1 gives 10,500 at a price level of 100 and SRAS2 gives 11,100; both curves steepen as output approaches potential output of 12,000, where the vertical LRAS stands.";
  await putAfterBlock("sras-shift-lras", D.svg(600, 440, body), alt, "Figure: lower costs shift SRAS right (600 more at each price); both curves steepen towards potential output, shown by the vertical LRAS", "macro/aggregate-supply", "A short-run AS schedule and a shift (illustrative data)");

  // schematic: classical and Keynesian LRAS
  const panel = (ox, title, body, note) => D.group(body + D.text(150, 16, title, { anchor: "middle", weight: 700, size: 14 }) + D.text(150, 224, note, { anchor: "middle", size: 12, fill: C.muted }), { translate: [ox, 0] });
  const a = () => D.axes({ x: [0, 10], y: [0, 10], xTicks: [], yTicks: [], tickLabels: false, grid: false, xLabel: "Real output", yLabel: "Price level", w: 300, h: 210, pad: { l: 28, r: 10, t: 44, b: 38 } });
  const a1 = a(), a2 = a();
  const k = a2.line([[1, 2], [4.5, 2.6], [6.2, 5], [7.6, 9], [7.6, 9.7]], { stroke: C.green, width: 3 }) + a2.label(0.8, 3.7, "Spare capacity: flat", { size: 12 }) + a2.label(6.5, 3.4, "Rising", { size: 12 }) + a2.label(1.2, 8.6, "Full employment:", { size: 12 }) + a2.label(1.2, 7.6, "vertical", { size: 12 });
  const body2 = panel(0, "Classical: vertical LRAS", a1.frame + a1.line([[6, 0], [6, 9.5]], { stroke: C.green, width: 3 }) + a1.label(6, 9, "LRAS", { dx: 8, weight: 700, fill: C.green }), "price level does not change real output") +
    panel(300, "Keynesian: three sections", a2.frame + k, "shape depends on spare capacity");
  const alt2 = "Two schematic aggregate supply curves: the classical long-run curve is a vertical line at potential output; the Keynesian curve has three sections, flat when there is much spare capacity, rising as the economy nears capacity and vertical at full employment. Drawn for illustration, not from data.";
  await put("lras-classical-keynesian", D.svg(600, 236, body2), alt2, "Figure: schematic classical (vertical) and Keynesian (three-section) long-run aggregate supply", "macro/aggregate-supply", "- **The three-section (Keynesian) view.**");
}

// ---- multiplier rounds (multiplier.md): 100 injection, MPC 0.8
{
  const cum = [];
  let inc = 100, tot = 0;
  for (let r = 1; r <= 10; r += 1) { tot += inc; cum.push(tot); inc *= 0.8; }
  const ax = mk({ x: [0, 11], y: [0, 550], xTicks: 1, yTicks: 100, xLabel: "Round of spending", yLabel: "Cumulative rise in income (US$ million)", w: 600, h: 440 });
  let body = ax.frame;
  cum.forEach((v, i) => {
    body += D.rect(ax.X(i + 1) - 17, ax.Y(v), 34, ax.Y(0) - ax.Y(v), { fill: C.fillBlue, stroke: C.blue, width: 1.2 });
    if (i < 6) body += D.text(ax.X(i + 1), ax.Y(v) - 6, v.toFixed(0), { anchor: "middle", size: 12, fill: C.muted });
  });
  body += hline(ax, 500, 0, 10.8, { stroke: C.red, width: 2, dash: true }) + ax.tag(10.8, 500, "Limit: 100 / 0.2 = 500", { anchor: "end", dy: -6, size: 13, fill: C.red });
  const alt = "The multiplier process for a US$100 million injection with MPC 0.8: cumulative income rises 100, 180, 244, 295, 336, 369 and so on, each round adding 80% of the last, approaching the limit of US$500 million (multiplier 1 / 0.2 = 5).";
  await put("multiplier-rounds", D.svg(600, 440, body), alt, "Figure: each round of spending adds less; cumulative income approaches the multiplier limit of US$500 million", "macro/multiplier", "The rounds continue, each smaller than the last");
}

// ---- consumption and saving functions (consumption-saving-investment.md): C = 40 + 0.8Y
{
  const top = D.axes({ x: [0, 550], y: [0, 500], xTicks: 100, yTicks: 100, xLabel: "National income Y (US$ billion)", yLabel: "C and Y (US$ billion)", w: 600, h: 300, pad: { l: 64, r: 28, t: 30, b: 50 } });
  const bot = D.axes({ x: [0, 550], y: [-60, 80], xTicks: 100, yTicks: 20, yLabel: "Saving S (US$ billion)", w: 600, h: 260, pad: { l: 64, r: 28, t: 30, b: 30 } });
  const g1 = top.frame + lineF(top, (y) => y, 0, 500, { stroke: C.muted, width: 1.8, dash: true }) + lineF(top, (y) => 40 + 0.8 * y, 0, 500) +
    top.tag(400, 478, "C = Y", { size: 13, fill: C.muted }) + top.tag(470, 372, "C = 40 + 0.8Y", { size: 13, fill: C.blue }) +
    top.point(200, 200, { r: 5.5 }) + top.guides(200, 200) + top.tag(200, 200, "Break-even Y = 200", { dx: 12, dy: 34, size: 13 }) + top.tag(0, 40, "C = 40 at Y = 0", { dx: 10, dy: -4, size: 13, fill: C.blue });
  const g2 = bot.frame + lineF(bot, (y) => -40 + 0.2 * y, 0, 500, { stroke: C.amber }) + bot.point(200, 0, { r: 5.5 }) + bot.tag(0, -40, "S = -40 at Y = 0", { dx: 10, dy: -4, size: 13, fill: C.amber }) + bot.tag(200, 0, "S = 0 at Y = 200", { dx: 12, dy: -16, size: 13 }) + lab(bot, 500, 60, "S = -40 + 0.2Y", { dx: -120, dy: -14, fill: C.amber, size: 13 }) + bot.label(545, -24, "Y (US$ billion)", { anchor: "end", weight: 600, size: 14 });
  const body = D.group(g1) + D.group(g2, { translate: [0, 300] });
  const alt = "Consumption and saving functions for C = 40 + 0.8Y: the consumption line starts at 40 when income is zero and crosses the 45-degree line (C = Y) at the break-even income of 200, below which households dissave; the saving function S = -40 + 0.2Y starts at -40 and crosses zero at Y = 200, with slopes MPC 0.8 and MPS 0.2.";
  await putAfterBlock("consumption-saving-functions", D.svg(600, 560, body), alt, "Figure: the consumption function against the 45-degree line and the matching saving function, both break even at Y = 200", "macro/consumption-saving-investment", "Reading the consumption and saving functions");
}

// ---- accelerator (consumption-saving-investment.md)
{
  const svg = D.barChart([{ label: "Year 2", value: 30, fill: C.teal }, { label: "Year 3", value: 12, fill: C.teal }, { label: "Year 4", value: 0, fill: C.teal }, { label: "Year 5", value: 18, fill: C.teal }], { w: 560, h: 360, yMax: 36, yLabel: "Induced investment (v = 3)", yTicks: 6 });
  const alt = "Accelerator with capital-output ratio 3: induced investment is 30 in year 2 when output rises by 10, falls to 12 in year 3 when output rises by only 4, is zero in year 4 when output is unchanged and recovers to 18 in year 5 when output rises by 6.";
  await putAfterBlock("accelerator-investment", svg, alt, "Figure: investment responds to the change in output, so it falls even while output is still rising (year 3) and is zero when output is flat (year 4)", "macro/consumption-saving-investment", "The accelerator in action");
}

// ---- trade cycle: actual vs potential GDP (growth-cycles-gaps.md)
{
  const actual = [990, 1045, 1089, 1050, 1070, 1128], pot = [1000, 1030, 1061, 1093, 1126, 1160];
  const gap = actual.map((a, i) => ((a - pot[i]) / pot[i]) * 100);
  const ax = D.axes({ x: [0, 7], y: [950, 1200], xTicks: 1, yTicks: 50, xLabel: "Year", yLabel: "Real GDP (US$ billion)", w: 600, h: 440, xFormat: (v) => String(v), yFormat: comma });
  let body = ax.frame + dotted(ax, actual.map((v, i) => [i + 1, v]), { stroke: C.blue }) + dotted(ax, pot.map((v, i) => [i + 1, v]), { stroke: C.amber, dash: true });
  gap.forEach((g, i) => { body += ax.label(i + 1, Math.min(actual[i], pot[i]), `${g > 0 ? "+" : "-"}${Math.abs(g).toFixed(1)}%`, { dx: -14, dy: 30, size: 13, weight: 700, fill: g > 0 ? C.green : C.red }); });
  body += ax.tag(0.2, 1185, "Solid: actual GDP", { size: 13, fill: C.blue }) + ax.tag(0.2, 1160, "Dashed: potential GDP", { size: 13, fill: C.amber }) + ax.tag(0.2, 1135, "Figures: output gap", { size: 13 });
  const alt = "Actual and potential real GDP over six years: potential grows steadily from 1,000 to 1,160 while actual output crosses above it in years 2 and 3 (output gaps +1.5% and +2.6%) then falls below it in year 4 (-3.9%), year 5 (-5.0%) and year 6 (-2.8%), showing a boom followed by a recession and recovery.";
  await putAfterBlock("business-cycle-output-gap", D.svg(600, 440, body), alt, "Figure: actual GDP fluctuates around steadily growing potential GDP; the output gap is positive in the boom and negative in the slump", "macro/growth-cycles-gaps", "Reading the table");
}

// ---- Phillips curves (interrelated-problems-phillips.md)
{
  const pts = [[3, 6.0], [4, 4.5], [5, 3.5], [6, 2.8], [8, 2.0]];
  const ax = mk({ x: [0, 10], y: [0, 8], xTicks: 1, yTicks: 1, xLabel: "Unemployment rate (%)", yLabel: "Inflation rate (%)" });
  const body = ax.frame + dotted(ax, pts) + lab(ax, 8, 2, "SRPC", { dx: 8, dy: -8, fill: C.blue }) +
    ax.tag(3, 6.0, "3%: 6.0%", { dx: 12, dy: -4, size: 13 }) + ax.tag(4, 4.5, "4%: 4.5%", { dx: 12, dy: -4, size: 13 }) + ax.tag(6, 2.8, "6%: 2.8%", { dx: 12, dy: -12, size: 13 }) + ax.tag(8, 2.0, "8%: 2.0%", { dx: -40, dy: 34, size: 13 }) +
    ax.tag(6.2, 6.8, "Steeper at low unemployment", { size: 13, fill: C.muted });
  const alt = "Traditional Phillips curve from the data: inflation falls as unemployment rises, from 6.0% at 3% unemployment to 4.5% at 4%, 3.5% at 5%, 2.8% at 6% and 2.0% at 8%; the curve is steeper at low unemployment, so the trade-off worsens.";
  await putAfterBlock("phillips-curve-data", D.svg(600, 450, body), alt, "Figure: the traditional Phillips curve shows lower unemployment going with higher inflation", "policy/interrelated-problems-phillips", "Reading the trade-off");

  const ax2 = mk({ x: [0, 10], y: [0, 8], xTicks: 1, yTicks: 1, xLabel: "Unemployment rate (%)", yLabel: "Inflation rate (%)" });
  const sr = (pe) => (u) => pe + 0.5 * (5 - u);
  let b2 = ax2.frame + vline(ax2, 5, 0, 7.6, { stroke: C.green, dash: false, width: 2.4 }) + ax2.tag(5, 7.6, "LRPC at natural rate 5%", { dx: 8, dy: -2, size: 13, fill: C.green });
  [[3, C.blue], [3.5, C.teal], [4, C.amber], [4.5, C.red]].forEach(([pe, col], i) => {
    b2 += lineF(ax2, sr(pe), 1.5, 8.5, { stroke: col, width: 2.2 });
    b2 += ax2.label(8.5, sr(pe)(8.5), `SRPC${i + 1}`, { dx: 8, dy: 4, size: 13, fill: col, weight: 700 });
  });
  [[4, 3.5], [4, 4.0], [4, 4.5], [4, 5.0]].forEach(([u, p], i) => { b2 += ax2.point(u, p, { r: 4.5 }) + ax2.tag(u, p, `Year ${i + 1}: ${p.toFixed(1)}%`, { anchor: "end", dx: -10, dy: 6, size: 12 }); });
  b2 += ax2.label(0.2, 1.5, "SRPC1 to SRPC4: expected inflation", { size: 13 }) + ax2.label(0.2, 0.8, "3%, 3.5%, 4%, 4.5%; natural rate 5%", { size: 13 });
  const alt2 = "Expectations-augmented Phillips curve with natural rate 5%: holding unemployment at 4% gives inflation 3.5% on the first short-run curve (expected inflation 3%), then each year expectations catch up and the curve shifts up by 0.5, giving 4.0%, 4.5% and 5.0%; the long-run curve is vertical at 5% unemployment.";
  await putAfterBlock("phillips-expectations-augmented", D.svg(600, 450, b2), alt2, "Figure: keeping unemployment at 4%, below the natural rate, shifts the short-run curve up every year; the long-run curve is vertical at 5%", "policy/interrelated-problems-phillips", "Accelerating inflation below the natural rate");
}

// ---- Lorenz curves (income-distribution-lorenz.md)
{
  const L1 = [[0, 0], [20, 5], [40, 15], [60, 30], [80, 55], [100, 100]], L2 = [[0, 0], [20, 8], [40, 20], [60, 37], [80, 61], [100, 100]];
  const interp = (pts) => (x) => { for (let i = 1; i < pts.length; i += 1) if (x <= pts[i][0]) { const [a, b] = pts[i - 1], [c, d] = pts[i]; return b + ((d - b) * (x - a)) / (c - a); } return 100; };
  const ax = D.axes({ x: [0, 100], y: [0, 100], xTicks: 20, yTicks: 20, xLabel: "Cumulative % of households (poorest first)", yLabel: "Cumulative % of income", w: 580, h: 520, pad: { l: 64, r: 28, t: 28, b: 56 } });
  const body = ax.area((x) => x, interp(L1), [0, 100], { fill: C.fillBlue }) + ax.frame + ax.line([[0, 0], [100, 100]], { stroke: C.muted, width: 2, dash: true }) + dotted(ax, L1) + dotted(ax, L2, { stroke: C.amber }) +
    ax.label(55, 62, "Line of equality", { rotate: -42, size: 13, fill: C.muted, dx: 0, dy: 0 }) +
    ax.tag(100, 24, "Before: Gini 0.38", { anchor: "end", size: 13, fill: C.blue }) + ax.tag(100, 14, "After: Gini 0.296", { anchor: "end", size: 13, fill: C.amber }) +
    ax.tag(4, 80, "Shaded area A = 0.19", { size: 13, fill: C.blue }) + ax.tag(4, 70, "Gini = A / 0.5 = 0.38", { size: 13, fill: C.blue });
  const alt = "Lorenz curves for the quintile data: before, the curve passes through (20, 5), (40, 15), (60, 30) and (80, 55) with the shaded area between it and the line of equality equal to 0.19 so Gini = 0.38; after progressive taxes and transfers the amber curve lies closer to the diagonal at (20, 8), (40, 20), (60, 37), (80, 61) and Gini falls to 0.296.";
  await putAfterBlock("lorenz-curves-gini", D.svg(580, 520, body), alt, "Figure: Lorenz curves before (blue) and after (amber) redistribution; the nearer the diagonal, the lower the Gini coefficient", "dev/income-distribution-lorenz", "Gini for the table above");
}
console.log("done");

// ---- AD movement vs shift (aggregate-demand.md)
{
  const prices = [80, 90, 100, 110, 120];
  const before = [12400, 11700, 11000, 10400, 9900], after = before.map((q) => q + 1000);
  const ax = D.axes({ x: [9000, 14000], y: [70, 130], xTicks: 1000, yTicks: 10, xLabel: "Real output demanded (US$ million)", yLabel: "Price level (index)", w: 600, h: 440, xFormat: comma });
  const body = ax.frame + dotted(ax, before.map((q, i) => [q, prices[i]]), { stroke: C.blue }) + dotted(ax, after.map((q, i) => [q, prices[i]]), { stroke: C.teal, dash: true }) +
    lab(ax, 9900, 120, "AD1", { dx: -42, dy: 4, fill: C.blue }) + lab(ax, 10900, 120, "AD2", { dx: -42, dy: 4, fill: C.teal }) +
    ax.point(11000, 100, { r: 6 }) + ax.point(10400, 110, { r: 6 }) + ax.point(12000, 100, { r: 6, stroke: C.teal }) +
    ax.tag(10400, 110, "110: 10,400", { anchor: "end", dx: -12, dy: 4, size: 13 }) + ax.tag(11000, 100, "100: 11,000", { anchor: "end", dx: -12, dy: 4, size: 13 }) + ax.tag(12000, 100, "Shift: 12,000 at 100", { dx: -24, dy: 36, size: 13, fill: C.teal }) +
    ax.line([[11000, 100], [12000, 100]], { stroke: C.teal, width: 2 });
  const alt = "Aggregate demand schedule: on AD1 a rise in the price level from 100 to 110 moves along the curve from 11,000 to 10,400; a non-price cause such as higher confidence shifts the whole curve right by 1,000 to AD2, so real demand at a price level of 100 rises from 11,000 to 12,000.";
  await putAfterBlock("ad-movement-and-shift", D.svg(600, 440, body), alt, "Figure: a change in the price level moves along AD1; any other cause shifts the whole curve to AD2 (1,000 more at each price level)", "macro/aggregate-demand", "Movement along the AD curve (illustrative data)");
}

// ---- supply-side policy (policy/supply-side.md)
{
  const prices = [100, 110, 120, 130, 140];
  const ad = [1000, 950, 900, 850, 800], s1 = [700, 800, 900, 980, 1040], s2 = [850, 950, 1050, 1130, 1190];
  const ax = D.axes({ x: [650, 1250], y: [90, 150], xTicks: 100, yTicks: 10, xLabel: "Real GDP (US$ million)", yLabel: "Price level (index)", w: 600, h: 440, xFormat: comma });
  const body = ax.frame + dotted(ax, ad.map((q, i) => [q, prices[i]]), { stroke: C.blue }) + dotted(ax, s1.map((q, i) => [q, prices[i]]), { stroke: C.amber }) + dotted(ax, s2.map((q, i) => [q, prices[i]]), { stroke: C.green, dash: true }) +
    lab(ax, 800, 140, "AD", { dx: -4, dy: -10, fill: C.blue }) + lab(ax, 1040, 140, "SRAS1", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 1190, 140, "SRAS2", { dx: -30, dy: -12, fill: C.green }) +
    ax.point(900, 120, { r: 6 }) + ax.tag(900, 120, "E1: 900 at 120", { dx: -150, dy: 30, size: 13 }) + ax.point(950, 110, { r: 6, stroke: C.green }) + ax.tag(950, 110, "E2: 950 at 110", { dx: 14, dy: 32, size: 13, fill: C.green });
  const alt = "Effect of a successful supply-side policy: SRAS shifts right by 150 at every price level from SRAS1 to SRAS2, moving equilibrium from real GDP 900 at a price level of 120 to real GDP 950 at 110, so output rises 5.6% while the price level falls 8.3%.";
  await putAfterBlock("supply-side-sras-shift", D.svg(600, 440, body), alt, "Figure: a rightward shift of SRAS raises output (900 to 950) and lowers the price level (120 to 110)", "policy/supply-side", "Reading the effect on prices and output");
}
console.log("done 2");
