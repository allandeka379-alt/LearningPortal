import { table, chk, r2, variances, statement } from "../lib.mjs";
import { F, usd, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: Sibanda Biscuits, operating statement (marginal basis)
const stdPrice = 20, stdMat = 1.5, stdMatP = 4, stdLab = 1, stdLabR = 5;
const stdVar = stdMat * stdMatP + stdLab * stdLabR;
const contr = stdPrice - stdVar;
chk(stdVar, 11); chk(contr, 9);
const bu = 3000, au = 3200, ap = 19.4, fixedBud = 18000, fixedAct = 18400;
const matQty = 5000, matCost = 21000, labH = 3350, labCost = 17420;
const rev = r2(au * ap);
chk(rev, 62080); chk(matCost / matQty, 4.2, 1e-9); chk(labCost / labH, 5.2, 1e-9);
const budProfit = r2(bu * contr - fixedBud);
chk(budProfit, 9000);
const actProfit = r2(rev - matCost - labCost - fixedAct);
chk(actProfit, 5260);
const sv = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
const sp = variances.salesPrice({ stdPrice, actualPrice: ap, actualUnits: au });
const mp = variances.materialPrice({ stdPrice: stdMatP, actualPrice: matCost / matQty, actualQty: matQty });
const mu = variances.materialUsage({ stdQtyForActualOutput: stdMat * au, actualQty: matQty, stdPrice: stdMatP });
const lr = variances.labourRate({ stdRate: stdLabR, actualRate: labCost / labH, actualHours: labH });
const le = variances.labourEfficiency({ stdHoursForActualOutput: stdLab * au, actualHours: labH, stdRate: stdLabR });
const fx = variances.fixedOverheadExpenditure({ budgetedOverhead: fixedBud, actualOverhead: fixedAct });
chk(sv.value, 1800); chk(sp.value, -1920); chk(mp.value, -1000); chk(mu.value, -800); chk(lr.value, -670); chk(le.value, -750); chk(fx.value, -400);
const vs = [sv, sp, mp, mu, lr, le, fx];
const totF = r2(vs.filter((v) => v.value > 0).reduce((s, v) => s + v.value, 0));
const totA = r2(vs.filter((v) => v.value < 0).reduce((s, v) => s + v.amount, 0));
chk(budProfit + totF - totA, actProfit);
const row = (label, v) => [label, v.value > 0 ? v.amount : null, v.value < 0 ? v.amount : null];
const opStmt = statement("Sibanda Biscuits: operating statement for the month ended 31 March", [
  ["Budgeted profit", null, null, budProfit],
  ["Sales volume variance", sv.value > 0 ? sv.amount : null, sv.value < 0 ? sv.amount : null],
  ["Sales price variance", null, sp.amount],
  ["Material price variance", null, mp.amount],
  ["Material usage variance", null, mu.amount],
  ["Labour rate variance", null, lr.amount],
  ["Labour efficiency variance", null, le.amount],
  ["Fixed cost expenditure variance", null, fx.amount],
  ["Total variances", totF, totA],
  ["Net variance (adverse)", null, null, -r2(totA - totF)],
  ["**Actual profit**", null, null, actProfit],
], { cols: ["Favourable US\\$", "Adverse US\\$", "US\\$"], checks: [["net variance", budProfit - (totA - totF), actProfit]] });
const actCheck = table(["Proof of actual profit", "US\\$"], [
  [`Revenue (${F(au)} × 19.40)`, rev], ["Materials", -matCost], ["Labour", -labCost], ["Fixed costs", -fixedAct], ["**Actual profit**", `**${F(actProfit)}**`],
]);

// Example 2: standard cost to actual cost
const stdCostAct = 36000;
const v = { mp: 640, mu: -910, lr: 300, le: -1150 };
const actCost = r2(stdCostAct - v.mp + 910 - v.lr + 1150);
chk(actCost, 37120);
const rec2 = table(["Reconciliation of standard cost to actual cost", "Favourable US\\$", "Adverse US\\$", "US\\$"], [
  ["Standard direct cost of actual output", "", "", stdCostAct],
  ["Material price variance", 640, "", ""],
  ["Material usage variance", "", 910, ""],
  ["Labour rate variance", 300, "", ""],
  ["Labour efficiency variance", "", 1150, ""],
  ["Net variance (adverse)", 940, 2060, 1120],
  ["**Actual direct cost**", "", "", `**${F(actCost)}**`],
], ["l", "r", "r", "r"]);
chk(940 - 2060, -1120);
chk(stdCostAct + 1120, actCost);

const body = `
## Introduction

At the end of March the owner of Sibanda Biscuits in Bulawayo receives a table of eight variances. She does not need eight numbers; she needs a single page that starts with the profit she planned, shows each reason it changed, and ends at the profit she actually made. That page is the **reconciliation** (or **operating statement**) of budgeted and actual profit. After it, she needs to know *why* each variance happened and *what to do* about it. This lesson pulls the earlier variances together. It is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4), and it is the usual ending of a standard costing question.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge 9706 (A Level only) |
| --- | --- |
| Reconciliation of budgeted and actual profit | Reconciliation of budgeted profit with actual profit; operating statement |
| Reconciliation of standard cost and actual cost | Reconciliation of standard cost of actual production with actual cost |
| Variance analysis, management by exception | Variance analysis, causes, interrelationships and action |
| Fixed cost spending (overhead variances not set) | Fixed overhead expenditure and volume variances (A Level) |
:::

## Key definitions

:::definition{term="Reconciliation statement"}
A statement that starts with budgeted (or standard) profit or cost, adds or deducts each variance, and ends with the actual figure, so that the whole difference is explained.
:::

:::definition{term="Operating statement"}
Another name for the reconciliation of budgeted and actual profit, usually with separate columns for favourable and adverse variances.
:::

:::definition{term="Interrelated variances"}
Variances with a common cause, so that a favourable result in one is bought at the cost of an adverse result in another, for example cheap material that causes waste.
:::

:::keyfact
Actual profit = budgeted profit + favourable variances - adverse variances. Standard cost of actual output + adverse variances - favourable variances = actual cost. A reconciliation is correct only if it ends at the actual figure calculated independently from the actual data.
:::

## Building the reconciliation

1. Calculate **budgeted profit**: budgeted units × standard profit (or contribution) per unit, less budgeted fixed costs if marginal costing is used.
2. Calculate each **sales** variance (price and volume) and each **cost** variance (material, labour and, for Cambridge, fixed overhead).
3. List them in the order sales, materials, labour, overhead, with favourable and adverse columns.
4. Add favourable variances to budgeted profit and deduct adverse variances. The result must equal the **actual profit** worked out from the actual revenue and actual costs. If not, a variance is wrong.

If the question uses **absorption costing**, the budgeted profit is budgeted units × standard profit per unit (after fixed overhead absorbed), and the fixed overhead variances (expenditure and volume) take the place of the single fixed cost variance. Make sure the sales volume variance uses the same margin as the budgeted profit.

:::worked-solution[Example 1: operating statement, Sibanda Biscuits]
The standard for a box of biscuits is: selling price US\\$20.00; materials 1.5 kg at US\\$4.00; labour 1 hour at US\\$5.00; so the standard variable cost is US\\$11.00 and the contribution US\\$9.00. Budgeted sales were ${F(bu)} boxes and budgeted fixed costs ${usd(fixedBud)}, so budgeted profit is ${F(bu)} × 9 - ${F(fixedBud)} = ${usd(budProfit)}.

Actual results: ${F(au)} boxes sold at US\\$19.40 (revenue ${usd(rev)}); ${F(matQty)} kg of materials costing ${usd(matCost)} (US\\$4.20 a kg); ${F(labH)} hours paid ${usd(labCost)} (US\\$5.20 an hour); fixed costs ${usd(fixedAct)}.

Variances:
- Sales volume: (${F(au)} - ${F(bu)}) × 9 = ${usd(sv.amount)} F. Sales price: (19.40 - 20.00) × ${F(au)} = ${usd(sp.amount)} A.
- Material price: (4.00 - 4.20) × ${F(matQty)} = ${usd(mp.amount)} A. Usage: standard quantity ${F(stdMat * au)} kg; (${F(stdMat * au)} - ${F(matQty)}) × 4 = ${usd(mu.amount)} A.
- Labour rate: (5.00 - 5.20) × ${F(labH)} = ${usd(lr.amount)} A. Efficiency: standard hours ${F(stdLab * au)}; (${F(stdLab * au)} - ${F(labH)}) × 5 = ${usd(le.amount)} A.
- Fixed costs: ${F(fixedBud)} - ${F(fixedAct)} = ${usd(fx.amount)} A.

${opStmt}

Proof of the actual profit from the actual data:

${actCheck}

The statement ends at the independently calculated actual profit of ${usd(actProfit)}, so the variances are complete. Profit was ${usd(budProfit - actProfit)} below budget even though 200 more boxes were sold.
:::

## Reconciling standard cost to actual cost

When no sales are involved, a cost reconciliation starts from the **standard cost of the actual output** and ends at the **actual cost**: adverse variances increase the cost; favourable variances reduce it.

:::worked-solution[Example 2: a joinery in Masvingo]
The standard direct cost of the month's output is ${usd(stdCostAct)}. The variances are: material price ${usd(v.mp)} F, material usage ${usd(910)} A, labour rate ${usd(v.lr)} F and labour efficiency ${usd(1150)} A.

${rec2}

Actual direct cost = ${F(stdCostAct)} + ${F(1120)} = ${usd(actCost)}. Notice the pattern: both price and rate variances are favourable, but both quantity variances are adverse. That is a classic sign of cheaper timber and a lower grade of worker leading to waste and slow work.
:::

## Causes, links and action

A variance is a signal, not a verdict. The causes are grouped as **controllable** (waste, idle time, poor supervision, careless buying) and **uncontrollable** (a national price increase, a supplier shortage). Managers are judged on controllable variances. Common links:

| Linked variances | Possible explanation |
| --- | --- |
| Favourable material price, adverse material usage | Cheaper, poorer quality material wasted in production |
| Adverse labour rate, favourable labour efficiency | Skilled and highly paid workers finish faster |
| Favourable labour rate, adverse efficiency | Cheaper, less trained workers are slower |
| Adverse sales price, favourable sales volume | Discounts used to win extra sales |
| Favourable sales volume, adverse material price | Urgent buying at a higher price to meet extra orders |
| Adverse efficiency, adverse fixed overhead efficiency (Cambridge) | Slow work absorbs less fixed overhead |

**Management action** depends on size and cause: investigate the largest variances first (management by exception); change suppliers or quality checks; train staff or buy better machines; revise the standards if they are out of date; adjust selling prices. **Non-financial factors** matter too: a cheaper supplier may be late or unreliable, overtime lowers morale and safety, and cutting costs may reduce quality and customer satisfaction. Reports must also arrive soon after the period, or the action comes too late.

## Common mistakes

:::mistake{title="A reconciliation that does not end at actual profit"}
Always prove the closing figure from the actual revenue and costs. If the total does not agree, one of the variances (usually a quantity variance valued at the actual price) is wrong.
:::

:::mistake{title="Adding adverse variances to profit"}
Adverse variances reduce profit and favourable variances increase it. In a cost reconciliation the direction is the reverse: adverse variances increase cost.
:::

:::mistake{title="Using the wrong margin in the volume variance"}
Under marginal costing the volume variance uses the standard contribution and fixed costs appear separately; under absorption costing it uses the standard profit. Do not mix the two in one statement.
:::

:::mistake{title="Blaming a manager for every adverse variance"}
Check whether the variance was controllable and whether it was linked to another. Saying "the production manager must be dismissed" without investigating earns no credit.
:::

## Exam tips

:::exam-tip
Reconciliations appear in ZIMSEC Papers 2 and 3 (Form 6) and in Cambridge Paper 4 (A Level only), nearly always as the culminating part of a standard costing question. For *prepare a reconciliation*, give a heading, budgeted profit, each variance with F or A, and actual profit, and show the proof. For *calculate*, work out the actual profit independently as a check.
:::

:::exam-tip
For *comment*, *advise* or *evaluate*, take the two or three largest variances, give a likely cause for each from the data, link any related variances, state an action and mention one non-financial factor. A sentence such as "the favourable price variance may have been bought at the cost of the adverse usage variance" shows the link examiners reward.
:::

## Summary

:::summary
- A reconciliation starts with budgeted profit, adds favourable and deducts adverse variances and ends at actual profit.
- A cost reconciliation starts with the standard cost of actual output and adds adverse and deducts favourable variances to reach actual cost.
- Prove the closing figure from the actual data; a mismatch means a mistake in a variance.
- Variances are often linked: cheap material and cheap labour can cause adverse usage and efficiency variances.
- Investigate large and controllable variances first, and weigh quality, delivery and morale as well as cost.
:::
`;
writeLesson("cost/variances-analysis.md", front("cost.variances-analysis", "Analysing variances and reconciling standard to actual", "Reconcile budgeted profit to actual profit and standard cost to actual cost, explain the causes and links between variances and recommend management action.", "aacc.cost.variances-analysis", 55), body);
void row;
