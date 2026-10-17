// agriculture-o business diagrams: returns, profit, budgets, market. Run: node .scratch/agriculture-o/diagrams/business.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const money = (v) => `US$${v.toLocaleString("en-GB")}`;

// ---------------------------------------------------------------- TP, MP, AP for workers on 1 ha (table in the lesson)
{
  const tp = [0, 400, 1000, 1500, 1800, 1900, 1850];
  const mp = tp.map((v, i) => (i === 0 ? null : v - tp[i - 1]));
  const ap = tp.map((v, i) => (i === 0 ? null : v / i));
  if (mp.join() !== ",400,600,500,300,100,-50" || Math.abs(ap[6] - 308.33) > 0.01) throw new Error("returns table");
  const W = 600, H = 600;
  const top = D.axes({ x: [0, 6], y: [0, 2000], xTicks: 1, yTicks: 500, xLabel: "Workers", yLabel: "Total product (kg)", w: W, h: 290, pad: { l: 70, r: 30, t: 30, b: 50 } });
  let b = top.frame + top.line(tp.map((v, i) => [i, v]), { stroke: C.blue });
  tp.forEach((v, i) => { b += top.point(i, v, { stroke: C.blue }); });
  b += top.label(5, 1900, "Maximum: 1,900 kg", { anchor: "middle", dy: -14, size: 13, weight: 700, fill: C.blue });
  b += top.label(0.15, 1700, "TP rises steeply, then flattens", { size: 13, fill: C.blue });
  // stage lines
  const bot = D.axes({ x: [0, 6], y: [-100, 700], xTicks: 1, yTicks: [-100, 0, 100, 200, 300, 400, 500, 600, 700], xLabel: "Workers", yLabel: "Product per worker (kg)", origin: false, w: W, h: 300, pad: { l: 70, r: 30, t: 30, b: 50 } });
  let c = bot.frame;
  c += bot.line(mp.map((v, i) => [i, v]).filter(([, v]) => v !== null), { stroke: C.amber });
  c += bot.line(ap.map((v, i) => [i, v]).filter(([, v]) => v !== null), { stroke: C.green, dash: true });
  mp.forEach((v, i) => { if (v !== null) c += bot.point(i, v, { stroke: C.amber }); });
  ap.forEach((v, i) => { if (v !== null) c += bot.point(i, v, { stroke: C.green }); });
  c += bot.tag(2, 600, "MP peaks at 2 workers", { dx: -150, dy: -4, fill: C.amber });
  c += bot.tag(5, 100, "MP (solid)", { dx: 12, dy: -8, fill: C.amber, size: 13 });
  c += bot.tag(5, 380, "AP (dashed)", { dx: 10, dy: -4, fill: C.green, size: 13 });
  c += bot.line([[0, 0], [6, 0]], { stroke: C.axis, width: 1.4 }) + bot.label(6, -50, "MP is negative", { size: 12, dx: -170, dy: 4, fill: C.red });
  for (const v of [3, 5]) c += D.line(bot.X(v), bot.Y(700), bot.X(v), bot.Y(-100), { stroke: C.muted, width: 1.4, dash: true });
  // stage dividers across both panels
  const xs = [3, 5];
  let dividers = "";
  for (const v of xs) { dividers += D.line(top.X(v), top.Y(2000), top.X(v), top.Y(0), { stroke: C.muted, width: 1.4, dash: true }); }
  b += dividers + D.text((top.X(0) + top.X(3)) / 2, top.Y(1900), "Stage I", { anchor: "middle", size: 13, weight: 700 }) + D.text((top.X(3) + top.X(5)) / 2, top.Y(500), "Stage II", { anchor: "middle", size: 13, weight: 700 }) + D.text((top.X(5) + top.X(6)) / 2, top.Y(700), "III", { anchor: "middle", size: 13, weight: 700 });
  const svg = D.svg(W, H, b + D.group(c, { translate: [0, 300] }));
  const alt = "Graphs from the garden table: total product rises to a maximum of 1,900 kg at 5 workers then falls to 1,850 kg at 6; marginal product peaks at 600 kg for the 2nd worker, falls to 100 kg for the 5th and becomes negative (minus 50 kg) for the 6th; average product peaks at 500 kg per worker at 2 to 3 workers; stages I, II and III are marked.";
  const cap = "Figure: total, marginal and average product for 0 to 6 workers on one hectare";
  await D.figure(FAMILY, "returns-tp-mp-ap-graphs", svg, { alt, caption: cap });
  D.insertAfter(`${L}/business/diminishing-returns.md`, "If total product is plotted against input:", D.md("returns-tp-mp-ap-graphs", alt, cap));
}

// ---------------------------------------------------------------- bags of fertiliser: value of marginal product against cost
{
  const price = 0.3, cost = 35;
  const yields = [2000, 2600, 3100, 3450, 3600, 3650];
  const mp = yields.map((y, i) => (i === 0 ? null : y - yields[i - 1]));
  const vmp = mp.map((m) => (m === null ? null : Math.round(m * price * 100) / 100));
  if (vmp.slice(1).join() !== "180,150,105,45,15") throw new Error("vmp");
  const bars = vmp.slice(1).map((v, i) => ({ label: `Bag ${i + 1}`, value: v, fill: v > cost ? C.blue : C.red }));
  const W = 560, H = 380;
  const ax = D.axes({ x: [0, 5], y: [0, 200], xTicks: [], yTicks: 50, w: W, h: H, origin: false, arrows: false, yLabel: "Value of the extra yield (US$)" });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.6;
  bars.forEach((bar, i) => {
    const cx = ax.X(i + 0.5);
    b += D.rect(cx - bw / 2, ax.Y(bar.value), bw, ax.Y(0) - ax.Y(bar.value), { fill: bar.fill, stroke: "none" });
    b += D.text(cx, ax.Y(0) + 20, bar.label, { anchor: "middle", size: 13 });
    b += D.text(cx, ax.Y(bar.value) - 6, `US$${bar.value}`, { anchor: "middle", size: 13, fill: C.muted });
  });
  b += D.line(ax.X(0), ax.Y(cost), ax.X(5), ax.Y(cost), { stroke: C.red, width: 2, dash: true });
  b += D.text(ax.X(2.6), ax.Y(170), `Dashed line: cost of a bag, US$${cost}`, { size: 13, fill: C.red });
  b += D.text(ax.X(2.6), ax.Y(150), "Bags 1 to 4 pay (blue bars);", { size: 13 }) + D.text(ax.X(2.6), ax.Y(150) + 17, "bag 5 loses US$20 (red bar).", { size: 13 });
  const alt = "Bar chart for maize at US$0.30 per kg: the value of the extra yield from bags 1 to 5 of fertiliser is US$180, 150, 105, 45 and 15 against a cost of US$35 a bag, so the 4th bag still pays but the 5th loses US$20, making 4 bags per hectare the most profitable rate.";
  const cap = "Figure: the value of the extra maize from each bag of fertiliser against the US$35 cost of a bag";
  await D.figure(FAMILY, "fertiliser-marginal-value-bars", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/business/diminishing-returns.md`, "| 5 | 3,650 | 50 | 15 |", D.md("fertiliser-marginal-value-bars", alt, cap));
}

// ---------------------------------------------------------------- broiler batch profit and loss
{
  const costs = [["Chicks", 100 * 0.9], ["Feed", 8 * 28], ["Vaccines", 8], ["Electricity", 25], ["Transport", 15], ["Litter", 6]];
  const totalCost = costs.reduce((s, [, v]) => s + v, 0), income = 94 * 6.5;
  if (totalCost !== 368 || income !== 611) throw new Error("broiler numbers");
  const bars = [...costs.map(([l, v]) => ({ label: l, value: v, fill: C.amber })), { label: "Total costs", value: totalCost, fill: C.red }, { label: "Income", value: income, fill: C.green }];
  const svg = D.barChart(bars, { w: 640, h: 380, yMax: 700, yLabel: "US$", yTicks: 100 });
  const alt = "Bar chart of the broiler batch: costs of chicks US$90, feed US$224 (the largest), vaccines US$8, electricity US$25, transport US$15 and litter US$6 add up to US$368, against income of US$611 from 94 birds, a profit of US$243.";
  const cap = "Figure: the costs of the broiler batch against its income (profit US$243)";
  await D.figure(FAMILY, "broiler-batch-costs-income", svg, { alt, caption: cap });
  insertAfterBlock(`${L}/business/profit-loss.md`, "Profit and loss account for a broiler batch", D.md("broiler-batch-costs-income", alt, cap));
}

// ---------------------------------------------------------------- gross margin of 2 ha of maize (stacked bar)
{
  const items = [["Seed", 110], ["Basal fertiliser", 330], ["Top dressing", 250], ["Chemicals", 90], ["Hired labour", 160], ["Transport", 70], ["Bags", 40]];
  const vc = items.reduce((s, [, v]) => s + v, 0), output = 9 * 290, gm = output - vc;
  if (vc !== 1050 || output !== 2610 || gm !== 1560) throw new Error("gm numbers");
  const W = 620, H = 330, x0 = 20, bw = 580, y = 90, h = 54;
  const X = (v) => x0 + (v / output) * bw;
  let b = D.text(x0, 30, `Gross output ${money(output)} (9 t x US$290)`, { size: 14, weight: 700 });
  const fills = ["#f6d9b8", "#efc08f", "#e9aa6c", "#f6d9b8", "#efc08f", "#e9aa6c", "#f6d9b8"];
  let acc = 0;
  items.forEach(([name, v], i) => {
    b += D.rect(X(acc), y, X(acc + v) - X(acc), h, { fill: fills[i], stroke: C.axis, width: 1 });
    acc += v;
  });
  b += D.rect(X(vc), y, X(output) - X(vc), h, { fill: C.fillGreen, stroke: C.green, width: 2 });
  b += D.text((X(vc) + X(output)) / 2, y + 26, "Gross margin", { size: 15, anchor: "middle", weight: 700, fill: C.green }) + D.text((X(vc) + X(output)) / 2, y + 44, money(gm), { size: 15, anchor: "middle", weight: 700, fill: C.green });
  b += D.line(X(0), y + h + 14, X(vc), y + h + 14, { stroke: C.amber, width: 2, arrow: true, arrowStart: true });
  b += D.text((X(0) + X(vc)) / 2, y + h + 34, `Variable costs ${money(vc)}`, { size: 14, anchor: "middle", weight: 700, fill: C.amber });
  // cost list
  let ly = 220;
  items.forEach(([name, v], i) => { const col = i < 4 ? 0 : 1; const row = i < 4 ? i : i - 4; b += D.text(30 + col * 300, ly + row * 20, `${name}: ${money(v)}`, { size: 13 }); });
  b += D.text(330, ly + 3 * 20 + 0, `Total ${money(vc)}`, { size: 13, weight: 700 });
  b += D.text(20, 316, `Gross margin per hectare = ${money(gm)} / 2 = ${money(gm / 2)}`, { size: 14, weight: 700 });
  const alt = "Bar split of the 2 ha maize gross output of US$2,610 (9 t at US$290): variable costs of US$1,050 (seed 110, basal fertiliser 330, top dressing 250, chemicals 90, hired labour 160, transport 70, bags 40) leave a gross margin of US$1,560, which is US$780 per hectare.";
  const cap = "Figure: where the US$2,610 gross output of 2 ha of maize goes, leaving a gross margin of US$1,560";
  await D.figure(FAMILY, "maize-gross-margin-bar", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/business/budgets.md`, "Gross margin for 2 ha of maize", D.md("maize-gross-margin-bar", alt, cap));
}

// ---------------------------------------------------------------- partial budget: soya instead of maize
{
  const A = 2.2 * 480, B = 525, Cc = 410, Dd = 4.5 * 290;
  const gains = A + B, losses = Cc + Dd, net = gains - losses;
  if (gains !== 1581 || losses !== 1715 || net !== -134) throw new Error("partial budget " + [gains, losses, net]);
  const W = 560, H = 360;
  const ax = D.axes({ x: [0, 2], y: [0, 2000], xTicks: [], yTicks: 500, w: W, h: H, origin: false, arrows: false, yLabel: "US$" });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.5;
  const stack = (cx, parts) => { let acc = 0; for (const [name, v, fill] of parts) { b += D.rect(cx - bw / 2, ax.Y(acc + v), bw, ax.Y(acc) - ax.Y(acc + v), { fill, stroke: "#fff", width: 1.5 }); b += D.text(cx, (ax.Y(acc) + ax.Y(acc + v)) / 2 - 2, `${name}
${money(v)}`, { anchor: "middle", size: 13 }); acc += v; } };
  stack(ax.X(0.5), [["A extra income (soya)", A, C.fillGreen], ["B costs saved (maize)", B, "#bfe8cf"]]);
  stack(ax.X(1.5), [["C extra costs (soya)", Cc, C.fillAmber], ["D income lost (maize)", Dd, "#f6c28a"]]);
  b += D.text(ax.X(0.5), ax.Y(0) + 22, `Gains ${money(gains)}`, { anchor: "middle", size: 14, weight: 700 }) + D.text(ax.X(1.5), ax.Y(0) + 22, `Losses ${money(losses)}`, { anchor: "middle", size: 14, weight: 700 });
  b += D.text(ax.X(1), 18, `Net change = ${money(gains)} - ${money(losses)} = -US$${Math.abs(net)}`, { anchor: "middle", size: 14, weight: 700, fill: C.red });
  const alt = "Partial budget for 1 ha of soya beans instead of maize: gains are extra income US$1,056 plus maize costs saved US$525, a total of US$1,581; losses are extra soya costs US$410 plus maize income lost US$1,305, a total of US$1,715; the net change is minus US$134 so the change would lower profit.";
  const cap = "Figure: gains and losses of replacing 1 ha of maize by soya beans (net change minus US$134)";
  await D.figure(FAMILY, "soya-partial-budget-bars", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/business/budgets.md`, "Partial budget: one hectare of soya beans instead of maize", D.md("soya-partial-budget-bars", alt, cap));
}

// ---------------------------------------------------------------- tomato demand and supply schedule
{
  const price = [2, 4, 6, 8, 10], qd = [900, 700, 500, 300, 100], qs = [100, 300, 500, 700, 900];
  const eq = price.findIndex((p, i) => qd[i] === qs[i]);
  if (price[eq] !== 6 || qd[eq] !== 500) throw new Error("equilibrium");
  const W = 580, H = 420;
  const ax = D.axes({ x: [0, 1000], y: [0, 12], xTicks: 200, yTicks: 2, xLabel: "Crates per week", yLabel: "Price per crate (US$)", w: W, h: H });
  let b = ax.frame + ax.line(price.map((p, i) => [qd[i], p]), { stroke: C.blue }) + ax.line(price.map((p, i) => [qs[i], p]), { stroke: C.amber });
  price.forEach((p, i) => { b += ax.point(qd[i], p, { stroke: C.blue }) + ax.point(qs[i], p, { stroke: C.amber }); });
  b += ax.label(100, 10, "D", { dx: -22, dy: 4, weight: 700, fill: C.blue }) + ax.label(900, 10, "S", { dx: 10, dy: 4, weight: 700, fill: C.amber });
  b += ax.guides(500, 6) + ax.point(500, 6, { r: 6, fill: C.red, stroke: C.red });
  b += ax.tag(620, 6, "Equilibrium", { dx: 0, dy: 5 });
  b += ax.line([[qs[3], 8], [qd[3], 8]], { stroke: C.red, width: 2, dash: true }) + ax.tag(600, 8, "Surplus 400 at US$8", { dx: -48, dy: -10, fill: C.red });
  b += ax.line([[qs[1], 4], [qd[1], 4]], { stroke: C.red, width: 2, dash: true }) + ax.tag(500, 4, "Shortage 400 at US$4", { dx: -80, dy: 24, fill: C.red });
  const alt = "Demand and supply graph for crates of tomatoes: demand falls from 900 crates at US$2 to 100 at US$10 while supply rises from 100 to 900; they meet at the equilibrium of US$6 and 500 crates; at US$8 supply exceeds demand by 400 crates (surplus) and at US$4 demand exceeds supply by 400 crates (shortage).";
  const cap = "Figure: the tomato market schedule plotted: equilibrium at US$6 and 500 crates";
  await D.figure(FAMILY, "tomato-schedule-supply-demand", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/business/economic-principles.md`, "Reading a demand and supply schedule", D.md("tomato-schedule-supply-demand", alt, cap));
}
console.log("business done");
