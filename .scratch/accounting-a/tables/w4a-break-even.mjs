// Lesson generator: cost.break-even (free preview)
import { t, table, check, chk, r2, cvp, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

const price = 12, dm = 4, dl = 2.5, oth = 1, fixed = 27000;
const vc = dm + dl + oth + 0; // 7.5
chk(vc, 7.5);
const m = cvp({ price, variable: vc, fixed });
chk(m.contribution, 4.5); chk(m.csRatio, 0.375); chk(m.breakEvenUnits, 6000); chk(m.breakEvenRevenue, 72000);
const actual = 8000;
const mosU = m.marginOfSafetyUnits(actual);
chk(mosU, 2000); chk(m.marginOfSafetyPct(actual), 25);
const mosRev = mosU * price;
chk(mosRev, 24000);
const profitAt = m.profitAt(actual);
chk(profitAt, 9000);
const target = 13500;
chk(m.unitsForProfit(target), 9000); chk(m.revenueForProfit(target), 108000);
const costs = table(["Per brick", "US\\$"], [["Selling price", price], ["Direct materials", -dm], ["Direct labour", -dl], ["Variable overheads", -oth], ["**Contribution per brick**", m.contribution]], ["l", "r"]);
const levels = [0, 2000, 4000, 6000, 8000, 10000];
const chart = table(["Output (bricks)", "Revenue US\\$", "Variable cost US\\$", "Fixed cost US\\$", "Total cost US\\$", "Profit or (loss) US\\$"], levels.map((u) => {
  const rev = u * price, v = u * vc, tc = v + fixed;
  return [fmt(u), rev, v, fixed, tc, rev - tc];
}), ["r", "r", "r", "r", "r", "r"]);
chk(levels.map((u) => u * price - u * vc - fixed)[3], 0);

// Example 2: changes and mix
const price2 = 13.5, vc2 = 8, fixed2 = 29000;
const m2 = cvp({ price: price2, variable: vc2, fixed: fixed2 });
chk(m2.contribution, 5.5);
chk(m2.breakEvenUnits, 5272.727272727273, 1e-6);
const be2 = Math.ceil(m2.breakEvenUnits);
chk(be2, 5273);
const p2At7000 = m2.profitAt(7000);
chk(p2At7000, 9500);
const sc = table(["", "Current", "After the changes"], [
  ["Selling price US\\$", price, price2],
  ["Variable cost per brick US\\$", vc, vc2],
  ["Contribution per brick US\\$", m.contribution, m2.contribution],
  ["Fixed costs US\\$", fixed, fixed2],
  ["Break-even point (bricks)", "6,000", "5,273 (5,272.7 rounded up)"],
  ["Profit at 7,000 bricks US\\$", m.profitAt(7000), p2At7000],
], ["l", "r", "r"]);
chk(m.profitAt(7000), 4500);

const fixedMix = 17000;
const cP = 10 - 6, cQ = 20 - 15;
const packC = 3 * cP + 1 * cQ;
chk(packC, 17);
const packs = fixedMix / packC;
chk(packs, 1000);
const revPack = 3 * 10 + 1 * 20;
chk(packs * revPack, 50000);
const mix = table(["Product", "Units in each pack", "Price US\\$", "Variable cost US\\$", "Contribution per unit US\\$", "Contribution per pack US\\$"], [
  ["P", 3, 10, 6, cP, 3 * cP],
  ["Q", 1, 20, 15, cQ, cQ],
  ["**Pack of 4 units**", 4, revPack, "", "", packC],
], ["l", "r", "r", "r", "r", "r"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Break-even point; margin of safety", "Break-even point; margin of safety"],
  ["Contribution to sales ratio (profit-volume ratio)", "Contribution to sales ratio (C/S ratio)"],
  ["Break-even chart (interpreted)", "Break-even chart is interpreted, not drawn, in the examination"],
], ["l", "l"]);

const body = t`
## Introduction

Tendai Mhaka makes concrete bricks in Kwekwe. His rent, supervisor and machine hire come to US\$27,000 a year, however many bricks he sells. Each brick sells for US\$12.00 and costs US\$7.50 to make. How many bricks must he sell before he stops losing money? And if he sells 8,000, how far can sales fall before he is back in loss? **Break-even analysis** answers both questions. It is among the most tested topics in the cost section: ZIMSEC Papers 1 to 3 and Cambridge Paper 1 and Paper 2 question 4.

You should know contribution and the difference between fixed and variable costs. This lesson is free to preview because it shows how the whole cost course connects to decisions.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards ask you to interpret a break-even chart from a table or a description. Neither asks you to draw one in the examination.
:::

## Key definitions

:::definition{term="Break-even point"}
The level of sales (in units or in dollars) at which total revenue equals total cost, so that contribution exactly covers fixed costs and profit is nil.
:::

:::definition{term="Contribution to sales ratio (C/S ratio)"}
Contribution as a percentage (or fraction) of sales revenue: contribution per unit ÷ selling price per unit. It is the share of every dollar of sales that is left to cover fixed costs and profit.
:::

:::definition{term="Margin of safety"}
The amount by which actual (or budgeted) sales exceed the break-even sales. It shows how far sales can fall before a loss occurs.
:::

## The formulae

:::keyfact{title="Break-even formulae"}
- Break-even point (units) = fixed costs ÷ contribution per unit.
- Break-even point (revenue) = fixed costs ÷ C/S ratio, or break-even units × selling price.
- Sales for a target profit (units) = (fixed costs + target profit) ÷ contribution per unit.
- Margin of safety (units) = actual sales - break-even sales; as a percentage = margin of safety ÷ actual sales × 100.
- Profit = units sold × contribution per unit - fixed costs.
:::

Each formula follows from one idea: to break even, total contribution must equal fixed costs. A target profit is simply a larger amount that contribution must cover.

${costs}

:::worked-solution[Example 1: break-even, margin of safety and target profit]
Fixed costs are US\$27,000. Contribution per brick = 12.00 - 7.50 = US\$4.50, so the C/S ratio is 4.50 ÷ 12.00 = 37.5%. Actual sales are 8,000 bricks.

1. Break-even point in units = 27,000 ÷ 4.50 = **6,000 bricks**.
2. Break-even point in revenue = 6,000 × 12 = US\$72,000 (or 27,000 ÷ 0.375).
3. Margin of safety = 8,000 - 6,000 = 2,000 bricks, or 2,000 × 12 = US\$24,000, or 2,000 ÷ 8,000 × 100 = **25%**.
4. Profit at 8,000 bricks = 8,000 × 4.50 - 27,000 = US\$9,000.
5. Bricks needed for a profit of US\$13,500 = (27,000 + 13,500) ÷ 4.50 = **9,000 bricks**, revenue US\$108,000.

The table below is what a break-even chart would show.

${chart}

Revenue and total cost are equal at 6,000 bricks. Below that output there is a loss; above it a profit that rises by US\$4.50 for each extra brick. The gap between revenue and total cost at 8,000 bricks is the profit of US\$9,000, and the horizontal gap between 6,000 and 8,000 is the margin of safety.
:::

## Changes in price, cost and mix

A change in the selling price, the variable cost or the fixed costs changes the break-even point. A higher price or a lower variable cost raises the contribution per unit and lowers the break-even point. Higher fixed costs raise it. Always recalculate the contribution per unit and then apply the same formula.

When a business sells more than one product, the **mix** matters. Calculate the contribution of one pack of products in the usual sales ratio and divide fixed costs by the contribution per pack. A change in the mix towards products with a lower contribution raises the break-even point.

:::worked-solution[Example 2: changes in price and cost, and a sales mix]
(a) Tendai considers raising the price to US\$13.50. Better-quality cement raises the variable cost to US\$8.00 a brick and fixed costs rise to US\$29,000.

${sc}

New contribution per brick = 13.50 - 8.00 = US\$5.50. Break-even = 29,000 ÷ 5.50 = 5,272.7, so 5,273 bricks (rounded up to the next whole brick). At 7,000 bricks profit rises from US\$4,500 to 7,000 × 5.50 - 29,000 = US\$9,500, so the changes are worth making if 7,000 bricks can still be sold.

(b) A second business, Gweru Plastics, sells products P and Q in the ratio 3 : 1 with fixed costs of US\$17,000.

${mix}

Packs to break even = 17,000 ÷ 17 = 1,000 packs, which is 3,000 units of P and 1,000 units of Q. Break-even revenue = 1,000 × 50 = US\$50,000.
:::

## Assumptions and limitations

Break-even analysis assumes that costs can be split into fixed and variable and behave in a straight line; that the selling price is constant; that the sales mix is constant; that production equals sales (no change in inventory); and that fixed costs stay fixed in the range considered. In practice, discounts reduce the price at higher volumes, bulk purchases lower the cost per unit, and costs step up at capacity. The analysis is also a snapshot of one period and ignores the time value of money. It is most useful as a quick guide for pricing and planning, not as an exact forecast.

## Common mistakes

:::mistake{title="Using the selling price instead of the contribution per unit"}
Divide fixed costs by contribution per unit (price less variable cost), not by the selling price.
:::

:::mistake{title="Calculating margin of safety as a percentage of break-even sales"}
The percentage is based on actual (or budgeted) sales: margin of safety ÷ actual sales × 100.
:::

:::mistake{title="Including fixed costs in the variable cost per unit"}
Only variable costs are deducted to find the contribution. Fixed costs are added to the target profit in the numerator.
:::

:::mistake{title="Forgetting to round the break-even units up"}
A fraction of a unit cannot be sold. State the break-even units as the next whole number when the question asks for units sold.
:::

## Exam tips

:::exam-tip
Break-even questions appear in ZIMSEC Paper 1 (multiple choice), Paper 2 and Paper 3, and in Cambridge Paper 1 and Paper 2 question 4. For *calculate*, state the formula, show the working and give the unit (bricks, US dollars or %). For *interpret* a chart or table, say where revenue equals total cost and what the margin of safety is.
:::

:::exam-tip
For *evaluate* or *advise*, discuss the margin of safety in percentage terms, what would happen to the break-even point if prices or costs change, and at least one limitation (constant mix, no stock change, fixed costs not fixed at higher output). Add a non-financial point, such as the risk of losing customers if the price is raised.
:::

## Summary

:::summary
- Break-even units = fixed costs ÷ contribution per unit; break-even revenue = fixed costs ÷ C/S ratio.
- Target profit units = (fixed costs + target profit) ÷ contribution per unit.
- Margin of safety = actual sales - break-even sales, also shown as a percentage of actual sales.
- A change in price, variable cost or fixed costs changes the break-even point; for several products, use a pack in the sales mix.
- Assumptions: linear costs and revenue, constant price and mix, and production equal to sales.
:::
`;
writeLesson("cost/break-even.md", front("cost.break-even", "Break-even analysis and cost-volume-profit calculations", "Calculate the break-even point in units and revenue, the contribution to sales ratio, the margin of safety and the sales needed for a target profit, and evaluate the effect of changes and the assumptions behind them.", "aacc.cost.break-even", 60, true), body);
void check; void r2;
