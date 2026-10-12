// Lesson generator: cost.profit-reconciliation
import { t, table, check, chk, r2, statement, costing, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

const price = 8, dm = 2, dl = 1, vpo = 0.5, vsell = 0.5, fixP = 28000, bud = 14000, adm = 12000;
const vpc = dm + dl + vpo; // 3.5
const rate = fixP / bud; // 2
const full = vpc + rate; // 5.5
chk(vpc, 3.5); chk(rate, 2); chk(full, 5.5);

function marginal(open, prod, sold, title) {
  const close = open + prod - sold;
  const sales = sold * price;
  const vcos = open * vpc + prod * vpc - close * vpc;
  chk(vcos, sold * vpc);
  const vs = sold * vsell;
  const contrib = sales - vcos - vs;
  const profit = contrib - fixP - adm;
  const md = statement(title, [
    [`Sales (${fmt(sold)} × US\\$8.00)`, null, sales],
    [`Opening inventory (${fmt(open)} × US\\$3.50)`, open * vpc],
    [`Production (${fmt(prod)} × US\\$3.50)`, prod * vpc],
    [`Closing inventory (${fmt(close)} × US\\$3.50)`, -close * vpc],
    ["Variable cost of sales", null, -vcos],
    [`Variable selling cost (${fmt(sold)} × US\\$0.50)`, null, -vs],
    ["**Contribution**", null, contrib],
    ["Fixed production overhead", null, -fixP],
    ["Administration expenses", null, -adm],
    ["**Profit**", null, profit],
  ], { cols: ["US\\$", "US\\$"], checks: [["vcos", open * vpc + prod * vpc - close * vpc, vcos], ["contrib", sales - vcos - vs, contrib], ["profit", contrib - fixP - adm, profit]] });
  return { md, profit, close };
}
function absorption(open, prod, sold, title) {
  const close = open + prod - sold;
  const sales = sold * price;
  const cos = open * full + prod * full - close * full;
  chk(cos, sold * full);
  const under = fixP - prod * rate;
  const gp = sales - cos - under;
  const vs = sold * vsell;
  const profit = gp - vs - adm;
  const rows = [
    [`Sales (${fmt(sold)} × US\\$8.00)`, null, sales],
    [`Opening inventory (${fmt(open)} × US\\$5.50)`, open * full],
    [`Production (${fmt(prod)} × US\\$5.50)`, prod * full],
    [`Closing inventory (${fmt(close)} × US\\$5.50)`, -close * full],
    ["Cost of sales", null, -cos],
  ];
  if (under !== 0) rows.push(["Under-absorbed fixed production overhead (28,000 - 24,000)", null, -under]);
  rows.push(["**Gross profit**", null, gp], [`Selling cost (${fmt(sold)} × US\\$0.50)`, null, -vs], ["Administration expenses", null, -adm], ["**Profit**", null, profit]);
  const md = statement(title, rows, { cols: ["US\\$", "US\\$"], checks: [["cos", open * full + prod * full - close * full, cos], ["profit", gp - vs - adm, profit]] });
  return { md, profit, close };
}

const m1 = marginal(1000, 14000, 12500, "Mutare Biscuits: marginal costing profit statement, year 1");
const a1 = absorption(1000, 14000, 12500, "Mutare Biscuits: absorption costing profit statement, year 1");
chk(m1.profit, 10000); chk(a1.profit, 13000);
const diff1 = costing.profitDifference(1000, m1.close, rate);
chk(diff1, 3000); chk(a1.profit - m1.profit, diff1);
const rec1 = statement("Reconciliation of profits, year 1", [
  ["Profit under marginal costing", m1.profit],
  ["Add: increase in inventory (2,500 - 1,000 = 1,500 units) × US\\$2.00 fixed overhead", diff1],
  ["**Profit under absorption costing**", a1.profit],
], { cols: ["US\\$"], checks: [["rec1", m1.profit + diff1, a1.profit]] });

const m2 = marginal(2500, 12000, 13500, "Mutare Biscuits: marginal costing profit statement, year 2");
const a2 = absorption(2500, 12000, 13500, "Mutare Biscuits: absorption costing profit statement, year 2");
chk(m2.profit, 14000); chk(a2.profit, 11000);
const diff2 = costing.profitDifference(2500, m2.close, rate);
chk(diff2, -3000); chk(a2.profit - m2.profit, diff2);
const rec2 = statement("Reconciliation of profits, year 2", [
  ["Profit under marginal costing", m2.profit],
  ["Less: decrease in inventory (2,500 - 1,000 = 1,500 units) × US\\$2.00 fixed overhead", diff2],
  ["**Profit under absorption costing**", a2.profit],
], { cols: ["US\\$"], checks: [["rec2", m2.profit + diff2, a2.profit]] });

const sumTab = table(["Inventory", "Absorption profit compared with marginal profit", "Reason"], [
  ["Rises (closing > opening)", "Higher", "Fixed overhead is carried forward in closing inventory"],
  ["Falls (closing < opening)", "Lower", "Fixed overhead brought forward in opening inventory is charged"],
  ["Unchanged", "Equal", "Fixed overhead carried in = carried out"],
], ["l", "l", "l"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Reconciliation of profits under marginal and absorption costing", "Reconciliation of profit under absorption and marginal costing"],
  ["Stock (inventory)", "Inventory"],
], ["l", "l"]);

const body = t`
## Introduction

Nyasha Dube, the owner of Mutare Biscuits, receives two profit figures for the same year. The accountant's absorption costing statement shows US\$13,000, while the manager's marginal costing statement shows US\$10,000. Both are correct. They differ only because the two methods treat the fixed production overhead of the unsold biscuits differently. Examiners ask you to prepare both statements, to reconcile the two profits and to explain which is higher and why. The topic is tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4.

You should be able to prepare absorption and marginal costing statements.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine the same reconciliation. Use the board's heading for the statement but the same arithmetic.
:::

## Key definitions

:::definition{term="Reconciliation of profits"}
A calculation that explains the difference between the profit under absorption costing and the profit under marginal costing by the fixed production overhead carried in the change in inventory.
:::

:::definition{term="Fixed overhead absorbed per unit"}
The part of the absorption cost per unit that is fixed production overhead (the rate for fixed overhead). It is the amount carried in inventory under absorption costing and excluded under marginal costing.
:::

## Why the profits differ

The only difference between the methods is the valuation of inventory. Absorption costing includes the fixed production overhead in each unit of inventory; marginal costing does not. Marginal costing charges **all** of the year's fixed production overhead to the year. Absorption costing charges only the part that belongs to the units sold, and carries the rest forward in closing inventory (and brings the previous year's amount into cost of sales through the opening inventory).

:::keyfact{title="Profit difference"}
Absorption profit - marginal profit = (closing inventory units - opening inventory units) × fixed production overhead absorbed per unit.
:::

${sumTab}

If under- or over-absorbed overhead is treated in the same way in both statements (charged to profit in the period), the formula holds exactly. The formula depends on the change in the **number of units**, not on production or sales alone.

:::worked-solution[Example 1: inventory rises]
Mutare Biscuits sells packets at US\$8.00. Variable production cost is US\$3.50 a packet (materials 2.00, labour 1.00, variable overhead 0.50) and variable selling cost is US\$0.50 a packet sold. Fixed production overhead is US\$28,000 a year and was absorbed on the budgeted output of 14,000 packets, a rate of US\$2.00; administration expenses are US\$12,000. In year 1 opening inventory was 1,000 packets, production 14,000 and sales 12,500.

${m1.md}

${a1.md}

${rec1}

The inventory rose by 1,500 packets, each carrying US\$2.00 of fixed overhead, so US\$3,000 of the year's fixed overhead is deferred under absorption costing. Absorption costing therefore gives the higher profit.
:::

:::worked-solution[Example 2: inventory falls]
In year 2 opening inventory was 2,500 packets (from year 1). Production fell to 12,000 packets because of a shortage of flour, and 13,500 packets were sold. Actual fixed production overhead was still US\$28,000. The rate remains US\$2.00.

${m2.md}

${a2.md}

${rec2}

Inventory fell by 1,500 packets. Absorption costing releases the US\$3,000 of fixed overhead from the opening inventory into cost of sales, so its profit is US\$3,000 **lower**. The under-absorption of US\$4,000 is charged in the absorption statement, and the difference between the profits is the same US\$3,000 because marginal costing charges the full US\$28,000 of fixed overhead in the year.
:::

## Reading the result

If the inventory is the same at the beginning and end of the year, both methods give the same profit. In the long run, total profit over all years is the same under both methods, because overhead deferred in one year is charged in the next. The two methods differ in timing. A manager who is rewarded for profit under absorption costing may be tempted to build inventory at the year end to boost the reported figure; marginal costing removes that incentive.

A third point is the use of each figure. The absorption profit is the figure that goes into the published financial statements, because IAS 2 requires inventory at full production cost. The marginal costing profit and the contribution are the figures used inside the business to judge whether to accept an order, to drop a product or to set a price, because they show how profit responds to sales. A good answer to a question that asks which method is more useful states the purpose first, then names the method that suits it. When a question gives both opening and closing inventory in units, always check the direction of the change before you decide whether to add or deduct the difference.

## Common mistakes

:::mistake{title="Using the total fixed overhead instead of the rate per unit"}
The difference is the **change in units** multiplied by the fixed overhead per unit, not the full fixed overhead of US\$28,000.
:::

:::mistake{title="Adding when inventory falls"}
If inventory falls, absorption profit is lower than marginal profit, so deduct the difference.
:::

:::mistake{title="Using production or sales units in the formula"}
Use closing units less opening units. A year with sales above production has a falling inventory.
:::

:::mistake{title="Using the full unit cost as the multiplier"}
Only the **fixed** production overhead per unit explains the difference. Variable cost per unit is the same under both methods.
:::

## Exam tips

:::exam-tip
Reconciliations are examined in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4. For *reconcile*, start with one profit, state the change in inventory in units, multiply by the fixed overhead per unit and show the second profit. For *explain*, name the direction (rises, falls or unchanged) and say that fixed overhead is carried forward or released.
:::

:::exam-tip
For *evaluate* which method is better, link the answer to the purpose: absorption costing for financial statements (IAS 2) and full-cost pricing, marginal costing for decisions and for performance measures not distorted by inventory. Mention one non-financial factor, such as the risk of building unwanted inventory.
:::

## Summary

:::summary
- The profits differ only because absorption costing carries fixed production overhead in inventory.
- Difference = (closing units - opening units) × fixed overhead per unit.
- Inventory rises: absorption profit is higher. Inventory falls: it is lower. Unchanged: equal.
- Over the long run the total profit is the same; only the timing differs.
- Marginal costing profit is not affected by building up inventory.
:::
`;
writeLesson("cost/profit-reconciliation.md", front("cost.profit-reconciliation", "Marginal against absorption costing: reconciling the profits", "Explain why profits under marginal and absorption costing differ, reconcile them using the change in inventory and the fixed overhead per unit, and show which method gives the higher profit.", "aacc.cost.profit-reconciliation", 55), body);
