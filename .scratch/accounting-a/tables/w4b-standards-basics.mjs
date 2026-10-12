import { table, chk, r2, sum } from "../lib.mjs";
import { F, usd, p2, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: standard cost card for a school desk
const card = [
  ["Direct material: timber", "4.5 m", 3.6],
  ["Direct material: fittings", "1 set", 2.4],
  ["Direct labour", "3 hours", 4.2],
  ["Variable production overhead", "3 hours", 1.1],
  ["Fixed production overhead", "3 hours", 1.9],
];
const qty = [4.5, 1, 3, 3, 3];
const amt = card.map((c, i) => r2(qty[i] * c[2]));
const stdCost = sum(amt);
chk(stdCost, 40.2);
const price = 52;
const stdProfit = r2(price - stdCost);
chk(stdProfit, 11.8);
const cardTab = table(["Cost element", "Quantity", "Standard price or rate US\\$", "Standard cost per desk US\\$"], [
  ...card.map((c, i) => [c[0], c[1], p2(c[2]), p2(amt[i])]),
  ["**Total standard cost per desk**", "", "", `**${p2(stdCost)}**`],
  ["Standard selling price", "", "", p2(price)],
  ["**Standard profit per desk**", "", "", `**${p2(stdProfit)}**`],
], ["l", "r", "r", "r"]);
const direct = r2(amt[0] + amt[1] + amt[2]);
chk(direct, 31.2);

// Example 2: flex the standard to actual output
const budgetU = 1000, actualU = 1250;
const stdDirectActual = r2(direct * actualU);
const actualDirect = 40150;
const tv = r2(stdDirectActual - actualDirect);
chk(stdDirectActual, 39000);
chk(tv, -1150);
const budgetDirect = r2(direct * budgetU);
const wrongV = r2(budgetDirect - actualDirect);
const ex2 = table(["", "US\\$"], [
  [`Standard direct cost of ${F(actualU)} desks (${F(actualU)} × ${p2(direct)})`, stdDirectActual],
  ["Actual direct cost (materials and labour)", actualDirect],
  ["**Total direct cost variance**", `**${F(Math.abs(tv))} adverse**`],
]);
const wrongTab = table(["", "US\\$"], [
  [`Budgeted direct cost of ${F(budgetU)} desks`, budgetDirect],
  ["Actual direct cost", actualDirect],
  ["Apparent difference", `${F(Math.abs(wrongV))} adverse`],
]);
chk(wrongV, -8950);
chk((Math.abs(tv) / stdDirectActual) * 100, 2.9487, 0.01);

const body = `
## Introduction

Mutare Joinery makes school desks for primary schools in Manicaland. When the owner prices a tender for 2,000 desks she needs to know what one desk should cost, and when the work is finished she needs to know whether it really did cost that much. A **standard cost** is a carefully predetermined cost per unit, and **standard costing** compares it with the actual cost to find out where and why the business did better or worse than planned. The topic is the base of the next four lessons on variances and is tested in ZIMSEC Paper 1 and in the cost questions of Papers 2 and 3, and in Cambridge Paper 4 (A Level only). You should already know direct and indirect costs, overhead absorption and cost behaviour.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Standard costing; standard cost card | Standard costing; standard cost card |
| Material, labour and overhead standards | Standard price and standard quantity for materials; standard rate and standard time for labour |
| Basic, ideal, attainable and current standards | Ideal, attainable, current and basic standards |
| Variances (overhead variances are not set) | Variances, including fixed overhead variances |

Standard costing is **Form 6** for ZIMSEC and **A Level only** for Cambridge: it is not in Cambridge Papers 1 and 2.
:::

## Key definitions

:::definition{term="Standard cost"}
The planned cost of one unit of output (or of one unit of input), built up from the expected quantity of each resource and its expected price or rate.
:::

:::definition{term="Standard costing"}
A system that costs output at standard, compares it with the actual cost and reports the differences, called variances, so that management can investigate them.
:::

:::definition{term="Standard cost card"}
A document listing, for one unit of product, the standard quantity and price of each material, the standard hours and rate of each labour grade, the overhead absorbed and the standard selling price and profit.
:::

:::keyfact
Standard cost per unit = standard quantity × standard price (materials) + standard hours × standard rate (labour) + overhead absorbed per unit. A favourable variance increases profit; an adverse variance reduces it.
:::

## Setting standards

**Materials.** The *quantity* comes from the product specification and the engineers, allowing for the normal waste that cannot be avoided. The *price* comes from supplier quotations, expected bulk discounts and the carriage that will be paid, adjusted for expected price changes over the period. **Labour.** The *time* comes from time-and-motion studies or past records of skilled workers, with allowance for rest. The *rate* comes from the wage agreement for each grade. **Overheads.** The rate per hour is budgeted overhead divided by budgeted hours, as in absorption costing. Production, purchasing, personnel and the accountant should all be involved, because standards the people do not believe in will not motivate them.

## Types of standard

| Type | Meaning | Effect |
| --- | --- | --- |
| Ideal | Perfect conditions: no waste, no idle time, lowest prices | Usually gives adverse variances; can discourage workers |
| Attainable | Efficient but achievable work, allowing normal waste, breaks and breakdowns | Realistic and motivating; the most widely recommended |
| Current | Based on present conditions and prices; changed when conditions change | Useful for control now, but may accept present inefficiency |
| Basic | Kept unchanged for a long time, often years | Shows trends against a base year, but out of date for planning |

## The standard cost card

:::worked-solution[Example 1: the standard cost card of a school desk]
Mutare Joinery sets these standards for one desk: 4.5 metres of timber at US\\$3.60 a metre, one set of fittings at US\\$2.40, 3 hours of labour at US\\$4.20 an hour, and variable and fixed production overheads absorbed at US\\$1.10 and US\\$1.90 an hour of labour. The standard selling price is US\\$52.

${cardTab}

The **direct** standard cost (materials and labour) is ${usd(amt[0])} + ${usd(amt[1])} + ${usd(amt[2])} = ${usd(direct)} a desk. Total standard cost is ${usd(stdCost)} and the standard profit is ${usd(stdProfit)} a desk. If the business budgets to make and sell 1,000 desks, budgeted profit is 1,000 × ${usd(stdProfit)} = ${usd(stdProfit * 1000)}.
:::

## Standard cost of the actual output

The key rule of standard costing is that actual cost must be compared with the standard cost **of the actual output**, never with the original budget. If the business planned 1,000 desks but made 1,250, the standard cost allowed must be flexed up to 1,250 desks; otherwise the difference mainly shows that more desks were made.

:::worked-solution[Example 2: comparing actual with standard for 1,250 desks]
The budget was 1,000 desks but 1,250 were made. Actual direct cost (timber, fittings and labour) was ${usd(actualDirect)}.

A careless comparison with the budget gives:

${wrongTab}

This is meaningless, because 250 extra desks need extra materials and labour. The correct comparison is with the standard cost of 1,250 desks:

${ex2}

The total direct cost variance is only US\\$1,150 adverse (about 2.9% of the standard allowed). The next lessons split it into price, usage, rate and efficiency variances to show where the extra cost arose.
:::

## Uses, advantages and limitations

A standard costing system supports **planning** (the standards feed the budget and the selling price), **control** (variances are reported by exception: managers study the large ones and ignore the small ones), **performance measurement** (each manager is accountable for the variances he controls), **motivation** (when the standards are attainable) and **simpler bookkeeping** (inventory may be valued at standard cost). To be useful the variances must be reported soon after the period and passed to the person who can act on them.

The limitations are real. Setting and updating standards is costly, so it suits repetitive production better than one-off jobs. Standards go out of date when prices or methods change quickly, which is a serious problem when input prices keep changing. Ideal standards demotivate, and too much attention to cost variances may harm quality or encourage workers to cut corners. A variance shows *what* happened but not *why*: someone must investigate.

## Common mistakes

:::mistake{title="Comparing actual cost with the original budget"}
Always flex the standard to the actual output first. Comparing 1,250 desks of actual cost with 1,000 desks of budget produces a large variance that has nothing to do with efficiency.
:::

:::mistake{title="Leaving out part of the card"}
A standard cost card lists every element: materials, labour and overhead. Leaving out the fittings or the overhead gives a standard profit that is too high and a variance that cannot be traced.
:::

:::mistake{title="Believing an ideal standard is the best one"}
Ideal standards ignore normal waste and breaks, so every period shows adverse variances and staff stop trying. Attainable standards are normally recommended.
:::

:::mistake{title="Treating every variance as bad management"}
A favourable variance can come from poor-quality material or cut corners, and an adverse variance from an unexpected price rise. Investigate the cause before blaming anyone.
:::

## Exam tips

:::exam-tip
Standard costing is examined in ZIMSEC Papers 1 to 3 (Form 6) and in Cambridge Paper 4 (A Level only). For *state* or *define*, give the meaning in one precise sentence. For *calculate*, build the standard cost per unit line by line (quantity × price) and show the total before multiplying by the actual output.
:::

:::exam-tip
For *explain*, *evaluate* or *advise* on a standard costing system, give a benefit with its reason (for example "variances are reported by exception, so managers spend time only on large differences") and a limitation with its reason ("standards become out of date when prices change"), then a judgement about whether the system suits the business.
:::

## Summary

:::summary
- A standard cost is a predetermined cost per unit, built from standard quantities and standard prices or rates.
- A standard cost card lists the standard cost of each element, the standard selling price and the standard profit.
- Standards may be ideal, attainable, current or basic; attainable standards are normally the most motivating.
- Actual cost must be compared with the standard cost of the actual output, not with the original budget.
- Standard costing supports planning, control by exception and performance measurement, but standards need regular review.
:::
`;
writeLesson("cost/standards-basics.md", front("cost.standards-basics", "Standard costing: meaning, standards and uses", "Define standard costing, build a standard cost card, distinguish ideal, attainable, current and basic standards, and compare actual cost with the standard cost of the actual output.", "aacc.cost.standards-basics", 45), body);
