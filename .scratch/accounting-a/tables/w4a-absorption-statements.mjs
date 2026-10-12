// Lesson generator: cost.absorption-statements
import { t, table, check, chk, r2, statement, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

const price = 18, dm = 4, dl = 3, vpo = 1, fixedBud = 48000, budUnits = 12000;
const fRate = fixedBud / budUnits; // 4
const full = dm + dl + vpo + fRate;
chk(full, 12);

// Year 1: opening 1,000, produced 12,000, sold 11,500, closing 1,500
const o1 = 1000, p1 = 12000, s1 = 11500, c1 = o1 + p1 - s1;
chk(c1, 1500);
const sales1 = s1 * price;
const openV1 = o1 * full, prodV1 = p1 * full, closeV1 = c1 * full;
const cos1 = openV1 + prodV1 - closeV1;
const gp1 = sales1 - cos1;
const sell1 = s1 * 1.5, adm = 15000;
const np1 = gp1 - sell1 - adm;
chk(sales1, 207000); chk(cos1, 138000); chk(gp1, 69000); chk(np1, 36750);
const stmt1 = statement("Harare Soap Works: absorption costing profit statement, year 1", [
  ["Sales (11,500 units × US\\$18)", null, sales1],
  ["Opening inventory (1,000 × US\\$12)", openV1],
  ["Production cost (12,000 × US\\$12)", prodV1],
  ["Cost of goods available", r2(openV1 + prodV1)],
  ["Closing inventory (1,500 × US\\$12)", -closeV1],
  ["Cost of sales", null, -cos1],
  ["**Gross profit**", null, gp1],
  ["Selling and distribution (11,500 × US\\$1.50)", null, -sell1],
  ["Administration expenses", null, -adm],
  ["**Profit**", null, np1],
], { cols: ["US\\$", "US\\$"], checks: [["avail", openV1 + prodV1 - closeV1, cos1], ["gp", sales1 - cos1, gp1], ["np", gp1 - sell1 - adm, np1]] });
const costCard = table(["Per unit", "US\\$"], [["Direct materials", dm], ["Direct labour", dl], ["Variable production overhead", vpo], ["Fixed production overhead absorbed (48,000 ÷ 12,000)", fRate], ["**Full production cost**", full]], ["l", "r"]);

// Year 2: opening 1,500, produced 10,000, sold 11,000, closing 500, actual fixed 48,000 (budget 12,000 units)
const o2 = 1500, p2 = 10000, s2 = 11000, c2 = o2 + p2 - s2;
chk(c2, 500);
const sales2 = s2 * price;
const openV2 = o2 * full, prodV2 = p2 * full, closeV2 = c2 * full;
const cos2 = openV2 + prodV2 - closeV2;
chk(cos2, 132000);
const gp2 = sales2 - cos2;
const absorbedFixed2 = p2 * fRate;
const under2 = fixedBud - absorbedFixed2;
chk(under2, 8000);
const gp2a = gp2 - under2;
const sell2 = s2 * 1.5;
const np2 = gp2a - sell2 - adm;
chk(np2, 26500);
const stmt2 = statement("Harare Soap Works: absorption costing profit statement, year 2", [
  ["Sales (11,000 units × US\\$18)", null, sales2],
  ["Opening inventory (1,500 × US\\$12)", openV2],
  ["Production cost (10,000 × US\\$12)", prodV2],
  ["Closing inventory (500 × US\\$12)", -closeV2],
  ["Cost of sales", null, -cos2],
  ["Gross profit before adjustment", null, gp2],
  ["Under-absorbed fixed production overhead (48,000 - 40,000)", null, -under2],
  ["**Adjusted gross profit**", null, gp2a],
  ["Selling and distribution (11,000 × US\\$1.50)", null, -sell2],
  ["Administration expenses", null, -adm],
  ["**Profit**", null, np2],
], { cols: ["US\\$", "US\\$"], checks: [["cos", openV2 + prodV2 - closeV2, cos2], ["gp2a", gp2 - under2, gp2a], ["np2", gp2a - sell2 - adm, np2]] });

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Absorption costing; full costing", "Absorption costing (full cost)"],
  ["Profit statement; income statement", "Statement of profit or loss"],
  ["Cost-plus pricing (mark-up on full cost)", "Cost-plus pricing (mark-up or margin on full cost)"],
  ["Stock (inventory)", "Inventory"],
], ["l", "l"]);

const body = t`
## Introduction

Farai Chiwenga manages Harare Soap Works. The owner asks: how much profit did we make this year, and how much of our cost is sitting in the store as unsold soap? The answer depends on how inventory is valued. Under **absorption costing**, each unit made carries a share of all the production overheads, so inventory is valued at full production cost. Preparing the cost and profit statements, and judging the usefulness of the figures, is tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4.

You should be able to calculate an absorption rate and over- or under-absorbed overhead.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine the same layout. The statement uses the inventory and cost headings of the examination paper.
:::

## Key definitions

:::definition{term="Absorption costing"}
A method in which all production costs, fixed and variable, are charged to units made. Inventory is valued at the full production cost per unit. Non-production overheads are charged to the period.
:::

:::definition{term="Full production cost"}
Direct materials, direct labour, direct expenses and a share of both variable and fixed production overheads absorbed into each unit.
:::

:::definition{term="Cost-plus pricing"}
Setting the selling price by adding a mark-up or profit margin to the full cost of a unit.
:::

## Layout of the statement

1. Show **sales** (units sold × selling price).
2. Calculate **cost of sales**: opening inventory + production cost - closing inventory, all valued at the full production cost per unit.
3. Adjust for **under- or over-absorbed** production overhead.
4. Deduct **non-production overheads** (selling, distribution and administration), which are period costs and are not added to inventory.

${costCard}

A simple check: closing inventory units = opening units + units produced - units sold. Opening inventory is valued at the cost brought forward from the previous period. In ZIMSEC and Cambridge questions the cost per unit is usually the same in both years unless the question says otherwise.

:::worked-solution[Example 1: absorption costing profit statement for year 1]
Harare Soap Works sells bars of soap at US\$18. In year 1 it had 1,000 units in opening inventory, produced 12,000 units and sold 11,500 units. The budget was 12,000 units and the fixed production overhead was US\$48,000, so there was no under- or over-absorption. Selling and distribution cost US\$1.50 a unit sold and administration expenses were US\$15,000.

${stmt1}

Closing inventory is 1,000 + 12,000 - 11,500 = 1,500 units, valued at the full production cost of US\$12 each, so US\$18,000 of this year's production cost (including US\$6,000 of fixed overhead) is carried forward in the statement of financial position.
:::

## Effect of the change in inventory

When inventory rises, part of the fixed production overhead is carried forward in the closing inventory, so profit is **higher** than if all the fixed overhead had been charged to the period. When inventory falls, overhead brought forward in the opening inventory is released into cost of sales and profit is lower. Selling more than you produce uses up inventory. If the actual output differs from the budgeted output, some fixed overhead is under- or over-absorbed.

:::worked-solution[Example 2: year 2, when production is below budget]
In year 2 the opening inventory was 1,500 units. Production was only 10,000 units, below the budget of 12,000, and 11,000 units were sold. Actual fixed production overhead was still US\$48,000 and the rate stays at US\$4 per unit. Other costs are as in year 1.

${stmt2}

Output fell, so only 10,000 × 4 = US\$40,000 of fixed overhead was absorbed. The under-absorbed US\$8,000 reduces profit. Inventory fell from 1,500 to 500 units, so overhead of US\$4,000 from the opening inventory (1,000 units × US\$4) was released into cost of sales.
:::

## Selling price on a cost-plus basis

With cost-plus pricing a business adds a profit mark-up to full production cost. A 50% mark-up on US\$12 gives a price of US\$18. To cover non-production overheads of US\$32,250 the price must include them in the mark-up. The method is simple, and ensures that all costs are covered if the budgeted output is reached. However, it ignores demand and competitors' prices.

## Uses and limitations

**Uses:** it values inventory at full cost, as required for financial statements under IAS 2; it gives a cost for pricing and for quotations; and it encourages managers to recover all production costs, not only variable costs.

**Limitations:** the allocation and apportionment of overheads are arbitrary, so unit costs depend on the chosen bases; the fixed overhead per unit changes with the budgeted output, so profit can be changed by changing production; it can hide the cost behaviour (fixed against variable) needed for decisions; and it may lead to wrong decisions, for example to refuse an order that covers its variable cost.

**Non-financial factors:** quality, customer relationships and the effect on jobs matter as much as the profit shown by the cost statement. Absorption costing data are useful for long-run pricing but need adjustment for short-run decisions.

## Common mistakes

:::mistake{title="Valuing inventory at variable cost"}
In absorption costing closing inventory carries the fixed production overhead as well. Using variable cost belongs to marginal costing.
:::

:::mistake{title="Adding selling and administration costs to inventory"}
Non-production overheads are period costs. They are deducted in full in the period and never included in the value of inventory.
:::

:::mistake{title="Forgetting the under- or over-absorption adjustment"}
If actual production differs from the budget, the fixed overhead absorbed is not equal to the actual. Adjust profit for the difference.
:::

:::mistake{title="Calculating closing inventory units wrongly"}
Closing units = opening + produced - sold. Do not use the sales units or the production units alone.
:::

## Exam tips

:::exam-tip
Absorption statements are tested in ZIMSEC Papers 2 and 3 (usually 8 to 12 marks within a 25-mark question) and in Cambridge Paper 2 question 4. For *prepare*, give a full heading, the units in brackets in each line and a check on closing inventory units. For *calculate* the profit, show cost of sales with opening and closing inventory at the full unit cost.
:::

:::exam-tip
For *discuss* or *evaluate* the usefulness of absorption costing, give a use, a limitation (arbitrary overhead bases, fixed overhead per unit depends on output) and a non-financial factor. Always relate your answer to the figures of the business.
:::

## Summary

:::summary
- Absorption costing values units at full production cost including fixed production overhead.
- Profit statement: sales less cost of sales (opening + production - closing), adjust for under- or over-absorption, then deduct non-production overheads.
- Rising inventory carries fixed overhead forward and raises profit; falling inventory releases it and lowers profit.
- Cost-plus pricing adds a mark-up to full cost.
- Limits: arbitrary overhead bases and the effect of output on unit cost.
:::
`;
writeLesson("cost/absorption-statements.md", front("cost.absorption-statements", "Absorption costing statements and profit; uses and limitations", "Prepare cost and profit statements under absorption costing, show the effect of changes in inventory and of under-absorption, set a cost-plus price and discuss the uses and limitations of the method.", "aacc.cost.absorption-statements", 55), body);
