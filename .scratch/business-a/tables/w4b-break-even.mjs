// Writes lessons/finance/break-even.md from checked figures.
import { cvp, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const base = cvp({ price: 3.2, variable: 1.7, fixed: 15000 });
chk(base.contribution, 1.5, 1e-9); chk(base.breakEvenUnits, 10000, 1e-6); chk(base.breakEvenRevenue, 32000, 1e-6);
chk(base.profitAt(12500), 3750, 1e-6); chk(base.marginOfSafetyUnits(12500), 2500, 1e-6); chk(base.marginOfSafetyPct(12500), 20, 1e-6);
chk(base.unitsForProfit(6000), 14000, 1e-6);
const tbl = base.table([0, 5000, 10000, 12500, 15000]);

const cut = cvp({ price: 2.9, variable: 1.7, fixed: 15000 });
const mach = cvp({ price: 3.2, variable: 1.4, fixed: 18000 });
chk(cut.contribution, 1.2, 1e-9); chk(cut.breakEvenUnits, 12500, 1e-6); chk(cut.profitAt(14000), 1800, 1e-6);
chk(mach.contribution, 1.8, 1e-9); chk(mach.breakEvenUnits, 10000, 1e-6); chk(mach.profitAt(12500), 4500, 1e-6); chk(mach.marginOfSafetyUnits(12500), 2500, 1e-6);
chk(cut.marginOfSafetyUnits(14000), 1500, 1e-6);
const opt = table(["", "Current", "Price cut to US\\$2.90", "New machine"], [
  ["Selling price per bottle (US\\$)", "3.20", "2.90", "3.20"], ["Variable cost per bottle (US\\$)", "1.70", "1.70", "1.40"], ["Fixed costs per month (US\\$)", 15000, 15000, 18000],
  ["Contribution per bottle (US\\$)", base.contribution.toFixed(2), cut.contribution.toFixed(2), mach.contribution.toFixed(2)],
  ["Break-even output (bottles)", base.breakEvenUnits, cut.breakEvenUnits, mach.breakEvenUnits],
  ["Expected output (bottles)", 12500, 14000, 12500],
  ["Margin of safety (bottles)", base.marginOfSafetyUnits(12500), cut.marginOfSafetyUnits(14000), mach.marginOfSafetyUnits(12500)],
  ["Monthly profit (US\\$)", base.profitAt(12500), cut.profitAt(14000), mach.profitAt(12500)],
], ["l", "r", "r", "r"]);

const body = `
## Introduction

Chipo Ncube runs a fictional fruit-juice business, Mazowe Juice, in Mutare. She pays US$15,000 a month in rent, wages and electricity whether she sells ten bottles or ten thousand, and each bottle she sells costs her US$1.70 in fruit, glass and labour. A friend says, "You must be making money, your stall is always busy." Chipo wants to know more precisely: **how many bottles must she sell before she stops making a loss?** That number is the **break-even output**, and working it out is one of the most useful pieces of arithmetic in business.

This lesson is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 5) and in Cambridge **AS Level** (Papers 1 and 2). Cambridge items are interpreted from tables and described graphs; ZIMSEC may also ask for the chart elements from data. You should know the difference between **fixed** and **variable** costs.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Break-even analysis; break-even point; margin of safety; contribution; break-even chart | Break-even analysis; contribution; margin of safety; interpreting numeric and graphic forms |

Both boards use the same formulae. In this bank the break-even chart is **described from a table of values**: you read the break-even point, the margin of safety and the profit or loss at each output.
:::

## Key definitions

:::definition{term="Break-even output"}
The level of output at which total revenue equals total costs, so that there is neither profit nor loss.
:::

:::definition{term="Contribution per unit"}
The selling price per unit less the variable cost per unit; it is the amount each unit adds towards fixed costs and then profit.
:::

:::definition{term="Margin of safety"}
The amount by which actual (or planned) output exceeds the break-even output, in units, as a percentage of actual output or in revenue.
:::

## Formulae

:::keyfact{title="Break-even formulae"}
- Contribution per unit = selling price − variable cost per unit
- Break-even output (units) = fixed costs ÷ contribution per unit
- Profit = (output × contribution per unit) − fixed costs
- Output for a target profit = (fixed costs + target profit) ÷ contribution per unit
- Margin of safety (units) = actual output − break-even output
- Margin of safety (%) = margin of safety in units ÷ actual output × 100
- Break-even revenue = break-even output × selling price
:::

**Reading a break-even chart.** On the chart (described from a table), the **fixed-cost line** is horizontal. The **total-cost line** starts at the fixed-cost level on the vertical axis and slopes upward by the variable cost per unit. The **total-revenue line** starts at the origin and slopes upward more steeply by the selling price. They meet at the **break-even point**. To the left (less output) there is a **loss**; to the right a **profit**. The gap between the lines at the actual output is the profit, and the horizontal gap between actual output and break-even output is the **margin of safety**.

${tbl}

The shape of the table above is what the chart shows: the profit or loss figure moves from negative to zero at 10,000 bottles and becomes positive after.

## Uses and limitations

**Uses:** to set the minimum sales target; to see the effect of a price change or a new cost before it is made; to judge how risky a plan is (a small margin of safety means high risk); to support a loan application; to compare options.

**Limitations:**

- it assumes that all output is **sold** and that the **price** is the same at every level of output (no discounts);
- it assumes that variable cost per unit is **constant** (no bulk discounts) and that fixed costs stay **fixed**, which is untrue over a large range;
- it is only as accurate as the **forecast** costs and prices;
- it is hard to apply to a business with **many products** unless the sales mix is stable;
- it is a **static** picture; it ignores competitors' reactions and changes over time.

## Effects of changes

| Change | Contribution per unit | Break-even output | Margin of safety |
| --- | --- | --- | --- |
| Price rises | Rises | Falls | Rises (if sales hold) |
| Variable cost falls | Rises | Falls | Rises |
| Fixed costs rise | Unchanged | Rises | Falls |
| Price falls | Falls | Rises | Falls (unless sales rise) |

A price cut helps only if the **extra sales** more than make up for the lower contribution per unit, so the price elasticity of demand matters.

:::worked-solution[Example 1: calculating break-even, margin of safety and target profit]
**Context.** Mazowe Juice (a fictional business) sells bottles at ${D}3.20. Variable cost is ${D}1.70 a bottle and fixed costs are ${D}15,000 a month. Chipo expects to sell 12,500 bottles a month.

1. Contribution per bottle = 3.20 − 1.70 = **${D}1.50**.
2. Break-even output = 15,000 ÷ 1.50 = **10,000 bottles**; break-even revenue = 10,000 × 3.20 = ${D}32,000.
3. Profit at 12,500 bottles = (12,500 × 1.50) − 15,000 = 18,750 − 15,000 = **${D}3,750**.
4. Margin of safety = 12,500 − 10,000 = **2,500 bottles**, or 2,500 ÷ 12,500 × 100 = **20.0%** of expected output.
5. Output for a profit of ${D}6,000 = (15,000 + 6,000) ÷ 1.50 = **14,000 bottles**.
6. **Interpretation.** Sales can fall by 20% before Chipo makes a loss. The business is reasonably safe, but not very: a wet season that cuts demand by a fifth would remove the profit.
:::

:::worked-solution[Example 2: case analysis, comparing three plans]
**Context.** Chipo is considering (a) a price cut to ${D}2.90, which she thinks would raise sales to 14,000 bottles, or (b) a new bottling machine that raises fixed costs to ${D}18,000 but lowers variable costs to ${D}1.40 a bottle with sales unchanged at 12,500.

${opt}

**Point.** Only the machine improves profit; the price cut reduces it.

**Application.** With the price cut the contribution falls to ${D}1.20, so break-even rises to 12,500 bottles and the profit at 14,000 bottles is only ${D}1,800, against ${D}3,750 now. With the machine, break-even is unchanged at 10,000 bottles but the contribution is ${D}1.80, so the profit at 12,500 bottles rises to ${D}4,500.

**Analysis.** The price cut lowers the margin of safety to 1,500 bottles because the lower contribution must carry the same fixed costs. The machine gives a larger contribution on every bottle sold, so profit rises faster with output, but its higher fixed costs would increase the loss if sales fell below 10,000.

**Judgement.** The machine is the better plan if Chipo is confident of selling 12,500 bottles or more, and she should check how reliable her estimate of demand is. The price cut would work only if demand were highly elastic; at 14,000 bottles it is not. Break-even analysis assumes the numbers are accurate, so she should test them with a lower sales figure.
:::

## Common mistakes

:::mistake{title="Dividing fixed costs by the selling price"}
Break-even output = fixed costs ÷ **contribution** per unit, not ÷ price. Using the price ignores the variable cost.
:::

:::mistake{title="Confusing margin of safety with profit"}
The margin of safety is a **quantity** (or a percentage of output), not a sum of money. Profit is found separately: margin of safety × contribution per unit.
:::

:::mistake{title="Forgetting that the lines are assumptions"}
Break-even analysis assumes a constant price and variable cost per unit. Say so when you evaluate its usefulness.
:::

## Exam tips

:::exam-tip
Business Studies and Business Enterprise Skills Papers 1 and 2 ask you to *calculate*, *state*, *explain* and *discuss* break-even; Cambridge Papers 1 and 2 ask you to *calculate*, *explain*, *analyse* and *assess* its use and limitations. Show the contribution first, then the break-even output, then the margin of safety, with units. For *assess*, name two uses and two limitations, apply them to the case and reach a judgement (for example, reliable only if the forecasts are).
:::

## Summary

:::summary
- Contribution per unit = price − variable cost; break-even output = fixed costs ÷ contribution per unit.
- Profit = output × contribution − fixed costs; target-profit output = (fixed costs + target) ÷ contribution.
- Margin of safety = actual output − break-even output, shown in units or as a percentage of actual output.
- On a chart the total-revenue line starts at the origin and the total-cost line at the fixed-cost level; they meet at the break-even point.
- A rise in fixed costs raises break-even output; a rise in price or a fall in variable cost lowers it.
- Break-even analysis assumes constant prices and costs and perfect forecasts, and must be used with care.
:::
`;
lesson("finance/break-even", { key: "finance.break-even", title: "Break-even analysis", summary: "Calculating contribution, break-even output, margin of safety and profit, interpreting a break-even table or described chart, the effect of changes in price and costs, and the uses and limitations of break-even analysis.", concept: "abus.finance.break-even", minutes: 55, free: true }, body.replace(/US\$(?=\d)/g, "US\\$"));
