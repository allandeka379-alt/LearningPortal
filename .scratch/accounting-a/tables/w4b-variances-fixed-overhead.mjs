import { table, chk, r2, variances } from "../lib.mjs";
import { F, usd, writeLesson, front } from "./w4b-lib.mjs";

function setUp(name, { budU, hrsPer, budOH, actU, actH, actOH }) {
  const budH = budU * hrsPer;
  const ratePerHour = budOH / budH;
  const ratePerUnit = budOH / budU;
  const absorbed = actU * ratePerUnit;
  const stdH = actU * hrsPer;
  const exp = variances.fixedOverheadExpenditure({ budgetedOverhead: budOH, actualOverhead: actOH });
  const vol = variances.fixedOverheadVolume({ budgetedUnits: budU, actualUnits: actU, ratePerUnit });
  const cap = variances.fixedOverheadCapacity({ budgetedHours: budH, actualHours: actH, ratePerHour });
  const eff = variances.fixedOverheadEfficiency({ stdHoursForActualOutput: stdH, actualHours: actH, ratePerHour });
  chk(cap.value + eff.value, vol.value);
  chk(exp.value + vol.value, r2(absorbed - actOH));
  return { name, budU, hrsPer, budOH, actU, actH, actOH, budH, ratePerHour, ratePerUnit, absorbed, stdH, exp, vol, cap, eff, under: r2(absorbed - actOH) };
}
const a = setUp("Ncube", { budU: 6000, hrsPer: 2, budOH: 24000, actU: 5600, actH: 11500, actOH: 25100 });
chk(a.budH, 12000); chk(a.ratePerHour, 2); chk(a.ratePerUnit, 4); chk(a.absorbed, 22400); chk(a.stdH, 11200);
chk(a.exp.value, -1100); chk(a.vol.value, -1600); chk(a.cap.value, -1000); chk(a.eff.value, -600); chk(a.under, -2700);
const e = setUp("Mutasa", { budU: 4500, hrsPer: 3, budOH: 27000, actU: 4800, actH: 14700, actOH: 26400 });
chk(e.budH, 13500); chk(e.ratePerHour, 2); chk(e.ratePerUnit, 6); chk(e.absorbed, 28800); chk(e.stdH, 14400);
chk(e.exp.value, 600); chk(e.vol.value, 1800); chk(e.cap.value, 2400); chk(e.eff.value, -600); chk(e.under, 2400);

const tA = table(["Variance", "Working", "US\\$"], [
  ["Fixed overhead expenditure", `Budgeted ${F(a.budOH)} - actual ${F(a.actOH)}`, `${F(a.exp.amount)} ${a.exp.fa}`],
  ["Fixed overhead volume", `(${F(a.actU)} - ${F(a.budU)}) × US\\$4.00`, `${F(a.vol.amount)} ${a.vol.fa}`],
  ["Capacity (part of volume)", `(${F(a.actH)} - ${F(a.budH)}) h × US\\$2.00`, `${F(a.cap.amount)} ${a.cap.fa}`],
  ["Efficiency (part of volume)", `(${F(a.stdH)} - ${F(a.actH)}) h × US\\$2.00`, `${F(a.eff.amount)} ${a.eff.fa}`],
  ["**Total fixed overhead variance (under-absorbed)**", `Absorbed ${F(a.absorbed)} - actual ${F(a.actOH)}`, `**${F(Math.abs(a.under))} A**`],
], ["l", "l", "r"]);
const tE = table(["Variance", "Working", "US\\$"], [
  ["Fixed overhead expenditure", `${F(e.budOH)} - ${F(e.actOH)}`, `${F(e.exp.amount)} ${e.exp.fa}`],
  ["Fixed overhead volume", `(${F(e.actU)} - ${F(e.budU)}) × US\\$6.00`, `${F(e.vol.amount)} ${e.vol.fa}`],
  ["Capacity", `(${F(e.actH)} - ${F(e.budH)}) h × US\\$2.00`, `${F(e.cap.amount)} ${e.cap.fa}`],
  ["Efficiency", `(${F(e.stdH)} - ${F(e.actH)}) h × US\\$2.00`, `${F(e.eff.amount)} ${e.eff.fa}`],
  ["**Total (over-absorbed)**", `Absorbed ${F(e.absorbed)} - actual ${F(e.actOH)}`, `**${F(e.under)} F**`],
], ["l", "l", "r"]);
const tAbs = table(["", "US\\$"], [
  ["Overhead absorbed (5,600 units × US\\$4.00)", a.absorbed], ["Actual overhead", a.actOH], ["Under-absorbed overhead (adverse)", -Math.abs(a.under)],
]);

const body = `
## Introduction

Ncube Furniture in Bulawayo budgets its factory rent, supervisors and depreciation at US\\$24,000 for a period and charges them to each table at a fixed rate. When the period ends, the factory has made fewer tables than planned and the actual overhead is more than the budget. Some of the shortfall is because the overhead cost more; some is because the factory was less busy than planned; and some is because the workers took longer than they should have. **Fixed overhead variances** separate these causes. This lesson is **Cambridge A Level only**: ZIMSEC states that questions on overhead variances will not be set. ZIMSEC students need only the idea that a total over- or under-absorption is the difference between overhead absorbed and actual overhead (from the earlier lesson on over- and under-absorption).

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge 9706 (A Level only) |
| --- | --- |
| Overhead variances are not set | Fixed overhead expenditure variance |
| Over- or under-absorbed overhead | Fixed overhead volume variance, split into capacity and efficiency variances |
| Overhead absorption rate (per hour) | Budgeted fixed overhead ÷ budgeted hours (or units) |
:::

## Key definitions

:::definition{term="Fixed overhead expenditure variance"}
Budgeted fixed overhead less actual fixed overhead. It is favourable if less was spent than budgeted.
:::

:::definition{term="Fixed overhead volume variance"}
Overhead absorbed less budgeted overhead: (actual output - budgeted output) × standard fixed overhead rate per unit. It is favourable if more units were made than budgeted.
:::

:::definition{term="Capacity variance"}
The part of the volume variance caused by working more or fewer hours than budgeted: (actual hours - budgeted hours) × standard fixed overhead rate per hour.
:::

:::definition{term="Efficiency variance (fixed overhead)"}
The part of the volume variance caused by producing the output in more or fewer hours than the standard: (standard hours for actual output - actual hours) × standard fixed overhead rate per hour.
:::

:::keyfact
Expenditure = budgeted overhead - actual overhead. Volume = absorbed overhead - budgeted overhead. Capacity + efficiency = volume. Expenditure + volume = total under- or over-absorption = absorbed overhead - actual overhead. Positive = favourable.
:::

## Setting the standard rate

Fixed overhead is absorbed using a rate set **in advance** from the budget:

- standard rate per hour = budgeted fixed overhead ÷ budgeted hours;
- standard rate per unit = budgeted fixed overhead ÷ budgeted output = rate per hour × standard hours per unit.

Overhead absorbed = actual output × standard rate per unit. Because fixed overhead does not change with output, absorption can differ from actual overhead for two reasons: the actual spending differed from the budget (**expenditure**), or the output differed from the budget (**volume**).

## Why the volume variance is split

If output is below budget (an adverse volume variance), either the factory worked fewer hours than planned (idle capacity: the **capacity** variance) or it took more hours per unit than the standard (poor performance: the **efficiency** variance). The split shows management whether the problem is too little work or slow work.

:::worked-solution[Example 1: Ncube Furniture, under-absorption]
Budget: ${F(a.budU)} tables, 2 standard hours per table (${F(a.budH)} hours) and fixed overhead of ${usd(a.budOH)}. Standard rate = ${F(a.budOH)} ÷ ${F(a.budH)} = US\\$2.00 an hour, or US\\$4.00 a table. Actual: ${F(a.actU)} tables made in ${F(a.actH)} hours; actual fixed overhead ${usd(a.actOH)}.

Standard hours for the actual output = ${F(a.actU)} × 2 = ${F(a.stdH)} hours. Overhead absorbed = ${F(a.actU)} × US\\$4.00 = ${usd(a.absorbed)}.

${tA}

Check: capacity (${F(a.cap.amount)} A) + efficiency (${F(a.eff.amount)} A) = volume (${F(a.vol.amount)} A); expenditure (${F(a.exp.amount)} A) + volume = ${F(Math.abs(a.under))} A.

${tAbs}

The factory worked 500 fewer hours than planned (capacity) and took 300 more hours than the standard for the tables made (efficiency), and spent US\\$1,100 more than budgeted.
:::

:::worked-solution[Example 2: Mutasa Joinery, mixed variances]
Budget: ${F(e.budU)} units at 3 hours each (${F(e.budH)} hours) and fixed overhead of ${usd(e.budOH)}, so the standard rate is US\\$2.00 an hour or US\\$6.00 a unit. Actual: ${F(e.actU)} units in ${F(e.actH)} hours; actual fixed overhead ${usd(e.actOH)}. Standard hours for actual output = ${F(e.stdH)}.

${tE}

Output rose above budget (volume favourable), but the workers needed 300 hours more than the standard for the output (efficiency adverse); the capacity variance is favourable because more hours were worked than budgeted. A favourable capacity variance does not mean the hours were well used: the efficiency variance shows that some of them were wasted.
:::

## Interpreting the variances

| Variance | Typical causes of an adverse result | Typical causes of a favourable result |
| --- | --- | --- |
| Expenditure | Rent, salary or depreciation rose; unplanned supervision | Savings on rent or insurance; lower salaries |
| Capacity | Machines idle; a shortage of orders; breakdowns; strikes | Overtime or extra shifts; more machine time used |
| Efficiency | Slow or untrained workers; poor materials; machine problems | Skilled workers; good methods |

The efficiency variance is linked to the labour efficiency variance: hours wasted cost both labour and fixed overhead absorption. Fixed overhead is not controlled by the production manager in the short run, so the expenditure variance is usually the responsibility of a senior manager.

## Common mistakes

:::mistake{title="Using actual output for the capacity variance"}
The capacity variance compares **actual hours** with **budgeted hours**. The efficiency variance compares **standard hours for the actual output** with actual hours. Mixing them changes both answers.
:::

:::mistake{title="Using the actual overhead in the volume variance"}
Volume and capacity are valued at the **standard** rate. The actual overhead appears only in the expenditure variance.
:::

:::mistake{title="Forgetting that capacity plus efficiency equals volume"}
Always check that the sub-variances add up to the volume variance and that expenditure plus volume equals the total over- or under-absorption.
:::

:::mistake{title="Presenting fixed overhead variances to a ZIMSEC question"}
ZIMSEC does not set overhead variances. Learn them for Cambridge Paper 4 only; ZIMSEC answers stop at the material, labour and sales variances.
:::

## Exam tips

:::exam-tip
Fixed overhead variances appear only in Cambridge Paper 4 (A Level), often with the direct variances in a reconciliation of budgeted to actual profit under absorption costing. For *calculate*, find budgeted hours, the rate per hour and per unit, and the standard hours for actual output before the variances. Always show the check that expenditure plus volume equals the total.
:::

:::exam-tip
For *explain* or *comment*, say whether the volume problem is idle capacity (capacity variance) or slow working (efficiency variance), name a cause for each, and say who is responsible. A favourable capacity variance with an adverse efficiency variance means more hours were worked, but not productively.
:::

## Summary

:::summary
- Cambridge A Level only: ZIMSEC questions on overhead variances are not set.
- Standard fixed overhead rate = budgeted overhead ÷ budgeted hours (or output); overhead absorbed = actual output × rate per unit.
- Expenditure variance = budgeted overhead - actual overhead; volume variance = (actual - budgeted output) × rate per unit.
- Volume splits into capacity (actual hours v budgeted hours) and efficiency (standard hours for actual output v actual hours), both at the rate per hour.
- Expenditure + volume = overhead absorbed - actual overhead.
- Positive results are favourable; label F or A.
:::
`;
writeLesson("cost/variances-fixed-overhead.md", front("cost.variances-fixed-overhead", "Fixed overhead variances: expenditure, volume, capacity and efficiency", "Cambridge A Level only: calculate fixed overhead expenditure and volume variances, split the volume variance into capacity and efficiency variances, and explain the causes.", "aacc.cost.variances-fixed-overhead", 45), body);
