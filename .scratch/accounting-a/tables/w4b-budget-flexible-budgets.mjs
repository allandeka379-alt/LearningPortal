import { table, chk, r2, sum, costing } from "../lib.mjs";
import { F, usd, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: Gweru Foods
const bu = 10000, au = 11200, price = 8;
const lines = [
  { name: "Materials", perUnit: 2.2, act: 25100 },
  { name: "Labour", perUnit: 1.8, act: 20700 },
  { name: "Utilities (semi-variable)", fixed: 1500, perUnit: 0.3, act: 5000 },
  { name: "Fixed production overhead", fixed: 12000, act: 12400 },
  { name: "Administration", fixed: 6000, act: 5900 },
];
const flexedL = costing.flex(lines, au);
const origL = costing.flex(lines, bu);
const revB = bu * price, revF = au * price, revA = 87400;
chk(revF, 89600);
const costB = sum(origL.map((x) => x.amount)), costF = sum(flexedL.map((x) => x.amount)), costA = sum(lines.map((x) => x.act));
const profB = revB - costB, profF = revF - costF, profA = revA - costA;
chk(profB, 17500); chk(profF, 21940); chk(profA, 18300);
const vRow = (flex, act, isRevenue) => {
  const v = isRevenue ? act - flex : flex - act;
  return `${F(Math.abs(v))} ${v > 0 ? "F" : v < 0 ? "A" : ""}`.trim();
};
const rows1 = [
  ["Revenue", revB, revF, revA, vRow(revF, revA, true)],
  ...lines.map((l, i) => [l.name, origL[i].amount, flexedL[i].amount, l.act, vRow(flexedL[i].amount, l.act, false)]),
  ["**Total costs**", costB, costF, costA, vRow(costF, costA, false)],
  ["**Profit**", profB, profF, profA, vRow(profF, profA, true)],
];
const t1 = table(["US\\$", `Original budget (${F(bu)} units)`, `Flexed budget (${F(au)} units)`, "Actual", "Variance (flexed v actual)"], rows1, ["l", "r", "r", "r", "r"]);
chk(-2200 - 460 - 540 - 140 - 400 + 100, profA - profF);

// Example 2: reconciliation of cost of production
const bu2 = 3000, au2 = 3400;
const per = { mat: 5, lab: 3.5, voh: 1.2 }, fixed2 = 9000;
const flexCost = r2(au2 * (per.mat + per.lab + per.voh) + fixed2);
chk(flexCost, 41980);
const act2 = { mat: 17850, lab: 11500, voh: 4300, fix: 9400 };
const actCost2 = sum(Object.values(act2));
chk(actCost2, 43050);
const f2 = { mat: au2 * per.mat, lab: au2 * per.lab, voh: au2 * per.voh, fix: fixed2 };
const d = (k) => r2(f2[k] - act2[k]);
chk(d("mat"), -850); chk(d("lab"), 400); chk(d("voh"), -220); chk(d("fix"), -400);
chk(flexCost + 850 - 400 + 220 + 400, actCost2);
const t2 = table(["Reconciliation of flexed budgeted cost to actual cost", "Favourable US\\$", "Adverse US\\$", "US\\$"], [
  [`Original budgeted cost of production (${F(bu2)} units)`, "", "", r2(bu2 * (per.mat + per.lab + per.voh) + fixed2)],
  [`Increase due to extra output (${F(au2 - bu2)} units × US\\$9.70)`, "", "", r2((au2 - bu2) * 9.7)],
  [`**Flexed budgeted cost of production (${F(au2)} units)**`, "", "", `**${F(flexCost)}**`],
  ["Materials", "", 850, ""],
  ["Labour", 400, "", ""],
  ["Variable overhead", "", 220, ""],
  ["Fixed overhead", "", 400, ""],
  ["Net variance (adverse)", 400, 1470, 1070],
  ["**Actual cost of production**", "", "", `**${F(actCost2)}**`],
], ["l", "r", "r", "r"]);
chk(r2(bu2 * 9.7 + fixed2 + (au2 - bu2) * 9.7), flexCost);
chk(1470 - 400, 1070);

const body = `
## Introduction

Gweru Foods makes packs of snacks. The yearly budget assumed 10,000 packs, but the factory made and sold 11,200. When the owner compares the actual profit with the original budget she cannot tell whether the cost overrun is due to poor control or simply to the extra 1,200 packs: of course more packs cost more. A **flexible (flexed) budget** solves this by recalculating the budget for the actual level of activity, so that actual costs are compared with what they *should* have been at that activity. This lesson is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4). You need the cost behaviour lesson (fixed, variable, semi-variable) and the variance lessons.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Fixed budget; flexible budget | Fixed budget; flexible (flexed) budget |
| Flexing the budget to the actual activity | Flexing for the actual level of activity |
| Reconciliation of budgeted and actual cost / profit | Reconciliation of flexed budgeted cost of production with actual cost of production; flexed budgeted profit with actual profit |
:::

## Key definitions

:::definition{term="Fixed budget"}
A budget prepared for one level of activity only. It is not changed if the actual activity is different.
:::

:::definition{term="Flexible (flexed) budget"}
A budget recalculated for the actual level of activity: variable costs change in proportion to activity, fixed costs stay the same within the relevant range, and semi-variable costs are split into their fixed and variable parts.
:::

:::keyfact
Flexed variable cost = budgeted cost per unit × actual activity. Flexed fixed cost = original fixed cost. Flexed semi-variable cost = fixed part + (variable rate × actual activity). Revenue is flexed at the budgeted selling price per unit. Variance = flexed budget compared with actual (favourable if actual cost is lower or actual revenue is higher).
:::

## Why flex?

The original (fixed) budget is the plan. The flexed budget is the *fair comparison*: it shows what the actual output should have cost. The difference between the flexed budget and the actual cost is the variance managers can control. The difference between the original and the flexed budget is simply the effect of the change in volume. Benefits of flexing: it separates volume effects from efficiency effects; it gives managers a fairer standard; it helps set realistic targets; it is the basis of standard costing variances. Limits: cost behaviour must be known (the fixed/variable split may be only approximate), and fixed costs may step up outside the relevant range.

## Preparing a flexed budget statement

1. Split every cost into fixed, variable and semi-variable.
2. Work out the budgeted rate per unit for each variable cost and the fixed part of each semi-variable cost.
3. Multiply the variable rates by the **actual** activity; keep the fixed costs; flex revenue at the budgeted price.
4. Show columns: original budget, flexed budget, actual, variance (flexed v actual) with F or A.
5. Total the costs and the profit and check that the profit variance equals the sum of the item variances.

:::worked-solution[Example 1: Gweru Foods, flexed budget statement]
The original budget is for ${F(bu)} packs at US\\$8.00. The cost behaviour is: materials US\\$2.20 a pack; labour US\\$1.80 a pack; utilities US\\$1,500 a month plus US\\$0.30 a pack; fixed production overhead ${usd(12000)}; administration ${usd(6000)}. Actual results for ${F(au)} packs: revenue ${usd(revA)}; materials ${usd(25100)}; labour ${usd(20700)}; utilities ${usd(5000)}; fixed production overhead ${usd(12400)}; administration ${usd(5900)}.

${t1}

Compared with the original budget, profit looks good: ${usd(profA)} against ${usd(profB)}. Compared with the flexed budget, profit is ${usd(profF - profA)} below what 11,200 packs should have earned. The shortfall comes mainly from revenue (the average price was below US\\$8.00: ${usd(revA)} ÷ ${F(au)} = US\\$7.80) and from materials and labour that cost more than the flexed standard. Only administration was under budget.
:::

## Reconciling the flexed budget with actual results

A cost reconciliation starts with the **flexed budgeted cost of production**, lists the differences for each cost and ends at the **actual cost of production**. A profit reconciliation starts with the flexed budgeted profit and ends at the actual profit. Adverse differences add to cost (and reduce profit); favourable differences do the reverse.

:::worked-solution[Example 2: reconciling the cost of production]
A Chinhoyi workshop budgets for ${F(bu2)} units. The budgeted cost per unit is materials US\\$5.00, labour US\\$3.50 and variable overhead US\\$1.20 (US\\$9.70 in total) and the fixed overhead is ${usd(fixed2)}. The workshop makes ${F(au2)} units. Actual costs: materials ${usd(act2.mat)}, labour ${usd(act2.lab)}, variable overhead ${usd(act2.voh)}, fixed overhead ${usd(act2.fix)}.

Flexed budgeted cost = ${F(au2)} × 9.70 + ${F(fixed2)} = ${usd(flexCost)}. Actual cost = ${usd(actCost2)}.

${t2}

The fixed overhead is not flexed. Materials were US\\$850 over the flexed budget (${F(act2.mat)} against ${F(f2.mat)}), labour US\\$400 under (${F(act2.lab)} against ${F(f2.lab)}), variable overhead US\\$220 over and fixed overhead US\\$400 over. Together, costs were ${usd(1070)} above the flexed budget, even though the original budget would have suggested a much larger overspend (${usd(actCost2 - r2(bu2 * 9.7 + fixed2))}).
:::

## Interpreting differences and recommending action

Compare each item with its flexed budget. Large adverse differences are investigated first: materials (price rise, waste), labour (overtime, slow working), fixed costs (spending beyond budget). Revenue shortfalls may come from discounts or competitors. Consider the cause (controllable or not), the person responsible and the action: renegotiate with suppliers, retrain staff, review the selling price, or revise the budget if conditions have changed. Non-financial factors such as quality, delivery and worker morale should be weighed too. Rolling or continuous budgets update the plan as conditions change.

## Common mistakes

:::mistake{title="Flexing fixed costs"}
Fixed costs stay the same within the relevant range. Do not multiply them by the new activity.
:::

:::mistake{title="Forgetting to split semi-variable costs"}
A semi-variable cost has a fixed part and a variable part. Flex only the variable part (here US\\$0.30 a pack) and keep the fixed part.
:::

:::mistake{title="Comparing actual with the original budget"}
The fair comparison is with the flexed budget. The original budget answers a different question: did we achieve the plan?
:::

:::mistake{title="Wrong labels for revenue variances"}
For revenue, actual above flexed is favourable; for costs, actual below flexed is favourable. Check the effect on profit before labelling.
:::

## Exam tips

:::exam-tip
Flexible budgets appear in ZIMSEC Papers 1 to 3 (Form 6) and in Cambridge Paper 4 (A Level only) as flexed statements and as reconciliations. For *prepare*, show the original budget, the flexed budget, actual and variance columns with F or A, and check that the profit variance equals the item variances. For *calculate*, show the rate per unit and the activity.
:::

:::exam-tip
For *comment*, *explain* or *advise*, refer to two or three items by name and size, give a cause for each, say whether it is controllable, recommend an action and mention one non-financial factor. State clearly that the comparison with the flexed budget is fairer than the comparison with the original budget.
:::

## Summary

:::summary
- A fixed budget is for one level of activity; a flexed budget is recalculated for the actual activity.
- Variable costs change in proportion to activity; fixed costs stay constant; semi-variable costs are split.
- Compare actual results with the flexed budget to find the variances that managers control.
- A reconciliation starts with the flexed budgeted cost (or profit) and ends at the actual figure.
- Recommend action using the largest and most controllable variances, and consider non-financial factors.
:::
`;
writeLesson("budget/flexible-budgets.md", front("budget.flexible-budgets", "Flexible budgets and comparing budget with actual", "Prepare a flexed budget for actual activity from fixed, variable and semi-variable costs, compare it with actual results, reconcile flexed budgeted cost and profit with actual and recommend action.", "aacc.budget.flexible-budgets", 55), body);
