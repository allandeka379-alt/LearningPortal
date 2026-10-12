// Lesson generator: cost.marginal-costing
import { t, table, check, chk, r2, statement, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

const price = 9, dm = 1.8, dl = 0.9, vpo = 0.3, vsell = 0.4, fixP = 30000, fixO = 14000;
const vpc = dm + dl + vpo;
chk(vpc, 3);
const cpu = price - vpc - vsell;
chk(cpu, 5.6);
const open = 800, prod = 10000, sold = 9500, close = open + prod - sold;
chk(close, 1300);
const sales = sold * price;
const vcos = open * vpc + prod * vpc - close * vpc;
chk(vcos, sold * vpc);
const vs = sold * vsell;
const contrib = sales - vcos - vs;
chk(contrib, sold * cpu);
const fixed = fixP + fixO;
const profit = contrib - fixed;
chk(profit, 9200);
const stmt1 = statement("Kadoma Peanut Butter: marginal costing profit statement for the year", [
  ["Sales (9,500 units × US\\$9.00)", null, sales],
  ["Opening inventory (800 × US\\$3.00)", open * vpc],
  ["Production at variable cost (10,000 × US\\$3.00)", prod * vpc],
  ["Closing inventory (1,300 × US\\$3.00)", -close * vpc],
  ["Variable cost of sales", null, -vcos],
  ["Variable selling cost (9,500 × US\\$0.40)", null, -vs],
  ["**Contribution**", null, contrib],
  ["Fixed production overhead", null, -fixP],
  ["Fixed selling and administration costs", null, -fixO],
  ["**Profit**", null, profit],
], { cols: ["US\\$", "US\\$"], checks: [["vcos", open * vpc + prod * vpc - close * vpc, vcos], ["contrib", sales - vcos - vs, contrib], ["profit", contrib - fixed, profit]] });
const card = table(["Per unit", "US\\$"], [["Selling price", price], ["Direct materials", -dm], ["Direct labour", -dl], ["Variable production overhead", -vpo], ["Variable selling cost", -vsell], ["**Contribution per unit**", cpu]], ["l", "r"]);

// Example 2: changes in sales and production
const s2 = 10450;
const p2 = (s2 - sold) * cpu + profit;
chk(p2, 14520);
const cpu3 = price - 0.5 - vpc - vsell;
chk(cpu3, 5.1);
const s3 = 11000;
const p3 = s3 * cpu3 - fixed;
chk(p3, 12100);
const profitProdChange = profit; // production changed: no effect
const scen = table(["Scenario", "Units sold", "Contribution per unit US\\$", "Total contribution US\\$", "Fixed costs US\\$", "Profit US\\$"], [
  ["Original", fmt(sold), cpu, sold * cpu, fixed, profit],
  ["Sales rise 10% (price unchanged)", fmt(s2), cpu, s2 * cpu, fixed, p2],
  ["Price cut by US\\$0.50, sales rise to 11,000", fmt(s3), cpu3, s3 * cpu3, fixed, p3],
], ["l", "r", "r", "r", "r", "r"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Marginal cost; marginal costing", "Marginal cost; marginal costing"],
  ["Contribution", "Contribution (sales less variable costs)"],
  ["Profit statement; income statement", "Statement of profit or loss"],
], ["l", "l"]);

const body = t`
## Introduction

Nyasha Zvobgo runs Kadoma Peanut Butter. When a supermarket asks her for an extra 950 jars at a lower price, she needs to know what the extra jars will add to profit. If she spreads rent and salaries over every jar she may refuse the order. But rent and salaries do not change with the order. **Marginal costing** concentrates on what does change: the variable costs. It is tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4, and it is the base of break-even and decision lessons.

You should know the difference between variable and fixed costs and how an absorption costing statement is arranged.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine the same layout. Marginal cost is the variable cost of one extra unit.
:::

## Key definitions

:::definition{term="Marginal cost"}
The variable cost of producing (and selling) one extra unit: direct materials, direct labour, variable production overhead and, for a profit statement, variable selling costs.
:::

:::definition{term="Contribution"}
Sales revenue less variable costs. Contribution per unit = selling price per unit - variable cost per unit. It is the amount each unit contributes to fixed costs and then to profit.
:::

:::definition{term="Marginal costing"}
A method in which only variable costs are charged to units. Inventory is valued at variable production cost and fixed costs are written off in full in the period in which they arise.
:::

## The marginal costing statement

The layout shows contribution before fixed costs.

1. Sales.
2. Variable cost of sales: opening inventory + variable production cost - closing inventory, all at **variable production cost per unit**.
3. Other variable costs (for example selling costs) of the units sold.
4. **Contribution** = sales - all variable costs.
5. Deduct **all fixed costs** (production and non-production) as period costs.
6. **Profit**.

${card}

The fixed costs are not divided among units. Because of this, the profit depends only on the units **sold**, the contribution per unit and the fixed costs. How many units were produced does not change the profit.

:::worked-solution[Example 1: marginal costing profit statement]
Kadoma Peanut Butter sells jars at US\$9.00. Variable production cost is US\$3.00 a jar (materials 1.80, labour 0.90, variable overhead 0.30) and variable selling cost is US\$0.40 a jar sold. Fixed production overhead is US\$30,000 a year and fixed selling and administration costs US\$14,000. Opening inventory was 800 jars, production 10,000 jars and sales 9,500 jars.

${stmt1}

Contribution per jar is US\$5.60, so total contribution is 9,500 × 5.60 = US\$53,200. Closing inventory is 1,300 jars at the variable cost of US\$3.00, or US\$3,900. No fixed cost is carried forward in inventory.
:::

## Changes in sales and production

Each extra unit sold adds its contribution to profit, because the fixed costs stay the same. Each unit lost takes its contribution away. This makes marginal costing a quick tool for what-if questions.

:::worked-solution[Example 2: effect of different sales]
The supermarket order would raise sales by 10%, to 10,450 jars, at the normal price. Alternatively, the owner could cut the price by US\$0.50 and sell 11,000 jars.

${scen}

Selling 950 more jars at the normal price adds 950 × 5.60 = US\$5,320, so profit becomes US\$14,520. The price cut lowers the contribution to US\$5.10 a jar, but the 11,000 jars give US\$56,100 of contribution; after the same fixed costs of US\$44,000 the profit is US\$12,100. The price cut earns more than the original position but less than the first option. Production in the year does not appear in the calculation: if she had produced 9,000 jars instead of 10,000, profit would still be US\$9,200 because the fixed costs are the same and the same jars were sold.
:::

## Uses and limitations

**Uses:** the contribution per unit helps in decisions about prices, special orders and product mix; the statement is simple and avoids the arbitrary apportionment of fixed costs; profit does not depend on changes in inventory, so it is not affected by producing more to carry fixed overhead forward; and it supports break-even analysis and budgeting.

**Limitations:** it assumes that costs are either fixed or variable and that variable costs per unit are constant, which may not hold; it does not satisfy IAS 2, which requires inventory to be valued at full production cost in published financial statements; ignoring fixed costs may lead to prices that never cover them in the long run; and it needs a careful split of semi-variable costs.

## Common mistakes

:::mistake{title="Including fixed overhead in inventory"}
Under marginal costing closing inventory is valued at variable production cost only. Do not add a fixed overhead per unit.
:::

:::mistake{title="Dividing fixed costs by units"}
Fixed costs are deducted in total as a period cost. Do not calculate a fixed cost per unit for the statement.
:::

:::mistake{title="Leaving out variable selling costs"}
Contribution is sales less all variable costs, including variable selling and distribution costs of the units sold.
:::

:::mistake{title="Saying profit depends on production"}
Under marginal costing, profit depends on sales, contribution per unit and fixed costs. Changing production does not change profit.
:::

## Exam tips

:::exam-tip
Marginal costing appears in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4. For *prepare*, show variable cost of sales with opening and closing inventory at variable cost, then contribution, then fixed costs. For *calculate* contribution per unit, show price less each variable cost. For *state* an effect on profit, multiply the change in units by the contribution per unit.
:::

:::exam-tip
For *evaluate* marginal costing, give a use (decisions, simple, not affected by inventory changes) and a limitation (IAS 2 does not allow it for published accounts; it hides the need to cover fixed costs). Always link the answer to the figures.
:::

## Summary

:::summary
- Contribution = sales - variable costs; contribution per unit = price - variable cost per unit.
- Inventory is valued at variable production cost; all fixed costs are charged in the period.
- Profit = total contribution - fixed costs, and depends on units sold, not on units produced.
- Extra sales add contribution; fixed costs do not change within the relevant range.
- Limits: not allowed by IAS 2 for published accounts; assumes constant variable cost per unit.
:::
`;
writeLesson("cost/marginal-costing.md", front("cost.marginal-costing", "Marginal costing: contribution and profit statements", "Calculate contribution per unit and in total, prepare marginal costing profit statements with inventory at variable cost, and show the effect of changing sales and production.", "aacc.cost.marginal-costing", 50), body);
void check; void r2; void profitProdChange;
