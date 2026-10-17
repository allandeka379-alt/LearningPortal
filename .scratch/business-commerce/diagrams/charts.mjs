// business-commerce-o charts and organisation charts. Run from the repo root: node .scratch/business-commerce/diagrams/charts.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { breakEvenSvg } from "../../business-a/diagrams/fixer.mjs";
import { FAM, L, bars, insertAfterBlock } from "./_h.mjs";
const { C } = D;
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  insertAfterBlock(L(lesson), after, D.md(name, alt, cap));
};
const money = (v) => v.toLocaleString("en-GB");

// ---- organisation charts (people/organisational-structure.md): Chart A and the flatter version
{
  const managers = ["Operations\nmanager", "Marketing\nmanager", "Finance\nmanager", "Human resources\nmanager"];
  const mx = [10, 140, 270, 400];
  const chart = (flat) => {
    let b = D.node(200, 10, 140, 40, "Managing director", { fill: C.fillAmber, size: 13 });
    managers.forEach((m, i) => {
      b += D.node(mx[i], 90, 120, 46, m, { fill: C.fillBlue, size: 13 });
      b += D.line(270, 50, mx[i] + 60, 90, { width: 1.6 });
    });
    if (!flat) {
      ["Cutting\nsupervisor", "Sewing\nsupervisor", "Finishing\nsupervisor"].forEach((s, i) => {
        const x = 10 + i * 105;
        b += D.node(x, 180, 95, 46, s, { fill: C.fillGreen, size: 13 });
        b += D.line(70, 136, x + 47, 180, { width: 1.6 });
        b += D.node(x, 270, 95, 40, "8 machinists", { fill: C.fillGrey, size: 13 });
        b += D.line(x + 47, 226, x + 47, 270, { width: 1.6 });
      });
      b += D.text(530, 35, "Level 1", { size: 13, weight: 700 }) + D.text(530, 120, "Level 2", { size: 13, weight: 700 }) + D.text(530, 208, "Level 3", { size: 13, weight: 700 }) + D.text(530, 295, "Level 4", { size: 13, weight: 700 });
      b += D.text(350, 35, "span 4", { size: 13, fill: C.muted }) + D.text(12, 152, "span 3", { size: 13, fill: C.muted });
      [0, 1, 2].forEach((i) => (b += D.text(10 + i * 105 + 52, 252, "span 8", { size: 13, fill: C.muted })));
    } else {
      b += D.node(10, 190, 190, 46, "24 machinists", { fill: C.fillGrey, size: 14 });
      b += D.line(70, 136, 105, 190, { width: 1.6 });
      b += D.text(530, 35, "Level 1", { size: 13, weight: 700 }) + D.text(530, 120, "Level 2", { size: 13, weight: 700 }) + D.text(530, 218, "Level 3", { size: 13, weight: 700 });
      b += D.text(350, 35, "span 4", { size: 13, fill: C.muted }) + D.text(12, 156, "span 24", { size: 13, fill: C.muted });
    }
    return D.svg(620, flat ? 260 : 330, b);
  };
  await put("org-chart-tendai-uniforms", chart(false),
    "Organisation chart A of Tendai's Uniforms: managing director with four managers (span 4); the operations manager has three supervisors (span 3) and each supervisor has 8 machinists (span 8); four levels of hierarchy in all.",
    "Figure: Chart A, the organisation chart of Tendai's Uniforms (4 levels)", "people/organisational-structure.md", "- Human resources manager");
  // the figure belongs after the list under Chart A: re-place it after the list instead of right after the heading line
  await put("org-chart-flatter", chart(true),
    "Chart A after the three supervisor posts are removed: the 24 machinists report directly to the operations manager, so the hierarchy falls from 4 to 3 levels and the operations manager's span of control rises from 3 to 24.",
    "Figure: the flatter structure after removing the supervisor level (3 levels, span of 24)", "people/organisational-structure.md", "Effect of removing a level");
}

// ---- discount waterfall (trade/home-trade-documents.md, Example 1)
{
  const list = 2400, trade = list * 0.15, afterTrade = list - trade, cash = afterTrade * 0.05, paid = afterTrade - cash;
  const { svg } = bars([
    { label: "List price", value: list, fill: C.fillGrey },
    { label: "Trade discount\n15%", value: afterTrade, from: list, text: `−${money(trade)}`, fill: C.fillAmber },
    { label: "After trade\ndiscount", value: afterTrade, fill: C.fillBlue },
    { label: "Cash discount\n5%", value: paid, from: afterTrade, text: `−${money(cash)}`, fill: C.fillAmber },
    { label: "Paid within\n14 days", value: paid, fill: C.fillGreen },
  ], { w: 580, h: 380, yMax: 2600, yTicks: 500, yLabel: "US$" });
  await put("discount-waterfall", svg,
    "Trade and cash discount on the cement order: list price US$2,400, less 15% trade discount of US$360 gives US$2,040, less 5% cash discount of US$102 (taken on US$2,040, not on US$2,400) gives US$1,938 if paid within 14 days.",
    "Figure: Example 1, trade discount first, then cash discount on the reduced amount", "trade/home-trade-documents.md", "Example 1: trade and cash discount on cement");
}

// ---- product life cycle (marketing/product-life-cycle.md)
{
  const yrs = [1, 2, 3, 4, 5, 6], sales = [20, 60, 140, 210, 230, 232];
  const ax = D.axes({ x: [0, 7], y: [0, 250], w: 580, h: 400, xTicks: yrs, yTicks: 50, xLabel: "Year", yLabel: "Sales (thousand bottles)", pad: { r: 40 } });
  let b = ax.frame + ax.line(yrs.map((x, i) => [x, sales[i]]), { stroke: C.blue });
  yrs.forEach((x, i) => (b += ax.point(x, sales[i], { r: 5, stroke: C.blue }) + ax.label(x, sales[i], String(sales[i]), { dy: -12, anchor: "middle", size: 13, weight: 700 })));
  b += ax.tag(5.5, 140, "Maturity: sales almost flat", { anchor: "middle", dy: 20 });
  b += ax.tag(2.6, 150, "Growth: rising steeply", { anchor: "end" });
  await put("plc-flavoured-water-sales", D.svg(580, 400, b),
    "Sales of flavoured water in thousands of bottles over six years: 20, 60, 140, 210, 230 and 232. Sales rise steeply and then level off, so the product is in maturity, close to saturation, and an extension strategy should be planned.",
    "Figure: the flavoured water example, sales rising and then levelling off", "marketing/product-life-cycle.md", "Identifying the stage from data");
  // generic schematic of the four stages
  const f = (t) => (105 / (1 + Math.exp(-1.5 * (t - 3)))) / (1 + Math.exp(1.6 * (t - 10)));
  const a2 = D.axes({ x: [0, 12], y: [0, 130], w: 580, h: 380, xTicks: [], yTicks: [], xLabel: "Time", yLabel: "Sales", arrows: true, grid: false, pad: { b: 60 } });
  let s = a2.frame + a2.plot(f);
  for (const t of [2, 5, 8]) s += D.line(a2.X(t), a2.Y(0), a2.X(t), a2.Y(126), { stroke: C.muted, dash: true, width: 1.4 });
  [["Introduction", 1], ["Growth", 3.5], ["Maturity", 6.5], ["Decline", 10]].forEach(([t, x]) => (s += D.text(a2.X(x), a2.Y(0) + 22, t, { anchor: "middle", size: 14, weight: 700 })));
  s += D.text(a2.X(1), a2.Y(60), "slow\nrise", { anchor: "middle", size: 13, fill: C.muted }) + D.text(a2.X(3.4), a2.Y(80), "rising\nsteeply", { anchor: "end", size: 13, fill: C.muted }) + D.text(a2.X(6.5), a2.Y(122), "levels off", { anchor: "middle", size: 13, fill: C.muted }) + D.text(a2.X(11.3), a2.Y(62), "falling", { anchor: "middle", size: 13, fill: C.muted });
  await put("plc-four-stages", D.svg(580, 380, s),
    "Schematic product life cycle: sales against time rise slowly in introduction, steeply in growth, level off in maturity and fall in decline; the stages are separated by dashed lines.",
    "Figure: the four stages of the product life cycle (schematic, no scale)", "marketing/product-life-cycle.md", "## The stages of the life cycle");
}

// ---- demand and supply (marketing/demand-supply.md)
{
  const D1 = (q) => 10 - q / 20, S = (q) => 2 + q / 20;
  const ax = D.axes({ x: [0, 160], y: [0, 10], w: 580, h: 420, xTicks: 20, yTicks: 1, xLabel: "Quantity (crates)", yLabel: "Price per crate (US$)" });
  let b = ax.frame + ax.line([[0, 10], [160, 2]], { stroke: C.blue }) + ax.line([[0, 2], [160, 10]], { stroke: C.red });
  b += ax.label(156, 1.5, "Demand", { anchor: "end", fill: C.blue, weight: 700 }) + ax.label(138, 9.6, "Supply", { anchor: "end", fill: C.red, weight: 700 });
  b += ax.guides(80, 6) + ax.point(80, 6, { r: 5 }) + ax.tag(4, 1.2, "Equilibrium: US$6 and 80 crates");
  b += ax.line([[40, 4], [120, 4]], { stroke: C.amber, width: 2.4, dash: true }) + ax.tag(80, 4, "Shortage: 80", { anchor: "middle", dy: 26 });
  b += ax.line([[60, 7], [100, 7]], { stroke: C.amber, width: 2.4, dash: true }) + ax.tag(80, 7, "Surplus: 40", { anchor: "middle", dy: -14 });
  b += ax.point(40, 4, { stroke: C.red }) + ax.point(120, 4, { stroke: C.blue }) + ax.point(60, 7, { stroke: C.blue }) + ax.point(100, 7, { stroke: C.red });
  await put("tomato-demand-supply-equilibrium", D.svg(580, 420, b),
    "Demand and supply of tomato crates: the curves cross at US$6 and 80 crates. At US$4 demand is 120 and supply 40, a shortage of 80; at US$7 demand is 60 and supply 100, a surplus of 40; so the price moves back to US$6.",
    "Figure: equilibrium at US$6 and 80 crates, with the shortage at US$4 and the surplus at US$7", "marketing/demand-supply.md", "In a diagram, this is the point where");
  const D2 = (q) => 12 - q / 20;
  const a2 = D.axes({ x: [0, 200], y: [0, 12], w: 580, h: 420, xTicks: 20, yTicks: 1, xLabel: "Quantity (crates)", yLabel: "Price per crate (US$)", pad: { r: 40 } });
  let s = a2.frame + a2.line([[0, 10], [200, 0]], { stroke: C.blue, dash: true }) + a2.line([[0, 12], [200, 2]], { stroke: C.blue }) + a2.line([[0, 2], [200, 12]], { stroke: C.red });
  s += a2.label(196, 1, "D1", { anchor: "end", fill: C.blue, weight: 700, dy: -4 }) + a2.label(196, 2.7, "D2", { anchor: "end", fill: C.blue, weight: 700, dy: 0 }) + a2.label(190, 11.5, "Supply", { anchor: "end", fill: C.red, weight: 700, dx: -6 });
  s += a2.guides(80, 6) + a2.point(80, 6, { r: 5 }) + a2.tag(4, 1.7, "Old: US$6 and 80 crates");
  s += a2.guides(100, 7) + a2.point(100, 7, { r: 5 }) + a2.tag(4, 0.7, "New: US$7 and 100 crates");
  await put("tomato-demand-increase", D.svg(580, 420, s),
    "An increase in demand before a public holiday shifts the demand curve right by 40 crates at every price (D1 to D2); the equilibrium moves from US$6 and 80 crates to US$7 and 100 crates, so both price and quantity rise.",
    "Figure: demand rises by 40 crates at every price, moving equilibrium to US$7 and 100 crates", "marketing/demand-supply.md", ":::worked-solution[An increase in demand]");
}

// ---- cash flow closing balances (finance/cash-flow-forecast.md, Example 1)
{
  const { svg } = bars([
    { label: "July", value: 750, fill: C.fillGreen, text: "750" },
    { label: "August", value: -400, from: 0, fill: C.fillAmber, text: "(400)" },
    { label: "September", value: -350, from: 0, fill: C.fillAmber, text: "(350)" },
  ], { w: 560, h: 380, yMin: -600, yMax: 900, yTicks: [-600, -300, 0, 300, 600, 900], yLabel: "Closing balance (US$)", labelGap: 40 });
  await put("cash-flow-closing-balances", svg,
    "Closing bank balances in Thandeka's cash flow forecast: US$750 in July, then an overdraft of US$400 in August when the fridge is bought, and still US$350 overdrawn in September; negative balances are shown in brackets.",
    "Figure: closing balances from Example 1 (brackets mean overdrawn)", "finance/cash-flow-forecast.md", "Example 1: completing a three-month forecast");
}

// ---- break-even for Chipo's backpacks (operations/break-even-calculation.md, Example 1)
{
  const o = { fc: 6000, price: 20, vc: 12, maxQ: 1000, expected: 1000, qStep: 250, yStep: 5000, yMax: 20000 };
  const alt = "Break-even chart for Chipo's backpacks: fixed costs US$6,000, price US$20, variable cost US$12; total cost and revenue cross at 750 backpacks and US$15,000. Loss to the left, profit to the right; at the expected 1,000 backpacks the margin of safety is 250 backpacks.";
  const cap = "Figure: Example 1 drawn as a chart (break-even 750 backpacks, margin of safety 250)";
  await put("break-even-backpacks", breakEvenSvg(o), alt, cap, "operations/break-even-calculation.md", "Example 1: Chipo's backpacks");
}

// ---- average clause (insurance/principles.md, Example 1)
{
  const { svg } = bars([
    { label: "Value of\nbuilding", value: 80000, fill: C.fillGrey },
    { label: "Sum\ninsured", value: 60000, fill: C.fillBlue },
    { label: "Fire\ndamage", value: 20000, fill: C.fillAmber },
    { label: "Insurer\npays", value: 15000, fill: C.fillGreen },
    { label: "Owner\nbears", value: 5000, fill: C.fillAmber },
  ], { w: 580, h: 380, yMax: 90000, yTicks: 20000, yLabel: "US$" });
  await put("average-clause-under-insurance", svg,
    "Average clause: a building worth US$80,000 insured for US$60,000 (three quarters) suffers US$20,000 of fire damage; the insurer pays three quarters of the loss, US$15,000, and the under-insured owner bears US$5,000.",
    "Figure: under-insurance, the insurer pays 60,000/80,000 of a US$20,000 loss", "insurance/principles.md", "Example 1: under-insurance");
}

// ---- demand forecast from average change (marketing/demand-forecasting.md)
{
  const names = { 1: "Mar", 2: "Apr", 3: "May", 4: "Jun", 5: "Jul", 6: "Aug" };
  const ax = D.axes({ x: [0.5, 6.5], y: [600, 800], w: 580, h: 400, xTicks: [1, 2, 3, 4, 5, 6], yTicks: 50, xLabel: "Month", yLabel: "Sales (crates)", xFormat: (v) => names[v], pad: { r: 40 } });
  let b = ax.frame + ax.line([[1, 620], [2, 655], [3, 690], [4, 725]], { stroke: C.blue }) + ax.line([[4, 725], [5, 760], [6, 795]], { stroke: C.amber, dash: true });
  [[1, 620], [2, 655], [3, 690], [4, 725]].forEach(([x, y]) => (b += ax.point(x, y, { r: 5, stroke: C.blue }) + ax.label(x, y, String(y), { dy: -12, anchor: "middle", size: 13, weight: 700 })));
  [[5, 760], [6, 795]].forEach(([x, y]) => (b += ax.point(x, y, { r: 5, stroke: C.amber, fill: "#ffffff" }) + ax.label(x, y, String(y), { dy: -12, anchor: "middle", size: 13, weight: 700, fill: C.amber })));
  b += ax.tag(2.2, 780, "Solid: actual sales; dashed: forecast", { dx: -95, dy: 20 });
  await put("sales-forecast-average-change", D.svg(580, 400, b),
    "Tatenda's freezit sales rose by 35 crates each month: 620, 655, 690 and 725 from March to June. Extending the trend with the average change of 35 gives forecasts of 760 crates for July and 795 for August. The vertical axis starts at 600.",
    "Figure: actual sales (March to June) and the forecast for July and August", "marketing/demand-forecasting.md", "Forecasting from the average monthly change");
}

// ---- economies of scale (operations/economies-of-scale.md, Example 1)
{
  const { svg } = bars([
    { label: "1,000 bags", value: 6.5, fill: C.fillAmber, text: "6.50" },
    { label: "5,000 bags", value: 3.3, fill: C.fillBlue, text: "3.30" },
    { label: "20,000 bags", value: 2.4, fill: C.fillGreen, text: "2.40" },
  ], { w: 520, h: 360, yMax: 8, yTicks: 2, yLabel: "Average cost per bag (US$)", fmt: (v) => v.toFixed(2) });
  await put("feed-mill-average-cost", svg,
    "Average cost per bag at the feed mill falls as output grows: US$6.50 at 1,000 bags a month, US$3.30 at 5,000 bags and US$2.40 at 20,000 bags, because bulk buying cuts variable cost and fixed costs are spread over more bags.",
    "Figure: average cost per bag at three outputs (Example 1)", "operations/economies-of-scale.md", "Example 1: how average cost falls with scale");
}
