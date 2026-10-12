import { table, chk, r2, variances } from "../lib.mjs";
import { F, usd, p2, V, VF, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: Tendai Bags
const stdLeather = 1.5, stdLeatherPrice = 8, stdHours = 2, stdRate = 4.5;
const bud = 1000, out = 1100;
const actLeatherQty = 1800, actLeatherCost = 14670, actHours = 2350, actLabourCost = 10810;
const actLeatherPrice = actLeatherCost / actLeatherQty;
const actRate = actLabourCost / actHours;
chk(actLeatherPrice, 8.15, 1e-9);
chk(actRate, 4.6, 1e-9);
const sqAct = stdLeather * out;
const shAct = stdHours * out;
const mp = variances.materialPrice({ stdPrice: stdLeatherPrice, actualPrice: actLeatherPrice, actualQty: actLeatherQty });
const mu = variances.materialUsage({ stdQtyForActualOutput: sqAct, actualQty: actLeatherQty, stdPrice: stdLeatherPrice });
const lr = variances.labourRate({ stdRate, actualRate: actRate, actualHours: actHours });
const le = variances.labourEfficiency({ stdHoursForActualOutput: shAct, actualHours: actHours, stdRate });
chk(sqAct, 1650); chk(shAct, 2200);
chk(mp.value, -270); chk(mu.value, -1200); chk(lr.value, -235); chk(le.value, -675);
const stdDirect = r2(out * (stdLeather * stdLeatherPrice + stdHours * stdRate));
const actDirect = actLeatherCost + actLabourCost;
const total = r2(stdDirect - actDirect);
chk(stdDirect, 23100); chk(actDirect, 25480); chk(total, -2380);
chk(mp.value + mu.value + lr.value + le.value, total);

const t1m = table(["Material (leather)", "Working", "US\\$"], [
  ["Standard cost of actual usage", `${F(actLeatherQty)} m² × US\\$8.00`, actLeatherQty * stdLeatherPrice],
  ["Actual cost", "", actLeatherCost],
  ["**Price variance**", "", `**${F(mp.amount)} ${mp.fa}**`],
  ["Standard quantity for actual output", `${F(out)} bags × 1.5 m² = ${F(sqAct)} m²`, ""],
  ["Actual quantity used", "", `${F(actLeatherQty)} m²`],
  ["**Usage variance**", `(${F(sqAct)} - ${F(actLeatherQty)}) × US\\$8.00`, `**${F(mu.amount)} ${mu.fa}**`],
], ["l", "l", "r"]);
const t1l = table(["Labour", "Working", "US\\$"], [
  ["Standard cost of actual hours", `${F(actHours)} h × US\\$4.50`, actHours * stdRate],
  ["Actual cost", "", actLabourCost],
  ["**Rate variance**", "", `**${F(lr.amount)} ${lr.fa}**`],
  ["Standard hours for actual output", `${F(out)} bags × 2 h = ${F(shAct)} h`, ""],
  ["Actual hours worked", "", `${F(actHours)} h`],
  ["**Efficiency variance**", `(${F(shAct)} - ${F(actHours)}) × US\\$4.50`, `**${F(le.amount)} ${le.fa}**`],
], ["l", "l", "r"]);
chk(actLeatherQty * stdLeatherPrice - actLeatherCost, mp.value);
chk(actHours * stdRate - actLabourCost, lr.value);
const sumTab = table(["Variance", "US\\$", "F / A"], [
  ["Material price", mp.amount, mp.fa], ["Material usage", mu.amount, mu.fa], ["Labour rate", lr.amount, lr.fa], ["Labour efficiency", le.amount, le.fa],
  ["**Total direct cost variance**", `**${F(Math.abs(total))}**`, "**A**"],
], ["l", "r", "r"]);
const recTab = table(["", "US\\$"], [
  [`Standard direct cost of ${F(out)} bags`, stdDirect], ["Actual direct cost", actDirect], ["Total direct cost variance (adverse)", total],
]);

// Example 2: purchases differ from usage
const sP = 3, sQ = 2, units = 2000, bought = 5000, aP = 3.1, used = 4300;
const cost = bought * aP;
chk(cost, 15500);
const pv = variances.materialPrice({ stdPrice: sP, actualPrice: aP, actualQty: bought });
const uv = variances.materialUsage({ stdQtyForActualOutput: sQ * units, actualQty: used, stdPrice: sP });
chk(pv.value, -500); chk(uv.value, -900);
const inv = (bought - used) * sP;
chk(used * sP + inv + pv.amount, cost);
const pvUsage = variances.materialPrice({ stdPrice: sP, actualPrice: aP, actualQty: used });
chk(pvUsage.value, -430);
const t2 = table(["", "Working", "US\\$"], [
  ["Actual cost of purchases", `${F(bought)} kg × US\\$3.10`, cost],
  ["Standard cost of purchases", `${F(bought)} kg × US\\$3.00`, bought * sP],
  ["**Price variance on purchases**", "", `**${F(pv.amount)} ${pv.fa}**`],
  ["Standard quantity for 2,000 units", "2,000 × 2 kg", "4,000 kg"],
  ["Quantity used", "", `${F(used)} kg`],
  ["**Usage variance**", `(${F(sQ * units)} - ${F(used)}) × US\\$3.00`, `**${F(uv.amount)} ${uv.fa}**`],
  ["Inventory increase at standard", `${F(bought - used)} kg × US\\$3.00`, inv],
], ["l", "l", "r"]);

const body = `
## Introduction

Tendai Bags in Gweru makes leather handbags. At the end of March the owner finds that the direct cost of the month's bags is higher than the standard, but she needs to know whether the leather cost more, was wasted, whether the stitchers were paid more or took longer. **Direct material and direct labour variances** answer these questions by splitting the total direct cost variance into a price part and a quantity part. They are the most frequently examined variances: ZIMSEC calls them material and labour variances (Form 6) and Cambridge tests them in Paper 4 (A Level only). You should know the standard cost card from the previous lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge 9706 (A Level only) |
| --- | --- |
| Material price variance; material usage variance | Direct material price variance; direct material usage variance |
| Labour rate variance; labour efficiency variance | Direct labour rate variance; direct labour efficiency variance |
| Favourable (F) and adverse (A) variances | Favourable and adverse variances |

**Sign convention used in these lessons:** a positive (favourable) variance means actual cost was below standard and profit rises; an adverse variance means actual cost was above standard and profit falls. Always write F or A.
:::

## Key definitions

:::definition{term="Material price variance"}
The difference between the standard price and the actual price paid for the quantity of material bought (or used, as the question states): (standard price - actual price) × actual quantity.
:::

:::definition{term="Material usage variance"}
The difference between the standard quantity of material allowed for the actual output and the quantity actually used, valued at the standard price: (standard quantity - actual quantity) × standard price.
:::

:::definition{term="Labour rate variance"}
(Standard rate - actual rate) × actual hours paid.
:::

:::definition{term="Labour efficiency variance"}
(Standard hours for the actual output - actual hours worked) × standard rate.
:::

:::keyfact
Price or rate variance: **(standard price - actual price) × actual quantity**. Quantity variance: **(standard quantity for actual output - actual quantity) × standard price**. A negative answer is adverse. Total direct cost variance = standard cost of actual output - actual cost = the sum of the four variances.
:::

## The method in four steps

1. Work out the **standard quantity (or hours) for the actual output**: actual units made × standard quantity per unit.
2. Work out the **price variance**: compare the actual price with the standard price, on the actual quantity.
3. Work out the **quantity variance**: compare the actual quantity with the standard quantity allowed, at the **standard** price.
4. Add the variances and check that they equal the difference between the standard cost of the actual output and the actual cost.

The price variance is valued at the actual quantity and the quantity variance at the standard price, so the two parts never overlap and always add up to the total.

:::worked-solution[Example 1: Tendai Bags, March]
The standard for one bag is 1.5 m² of leather at US\\$8.00 and 2 labour hours at US\\$4.50 an hour. The budget was 1,000 bags; 1,100 bags were made. The stitchers used ${F(actLeatherQty)} m² of leather costing ${usd(actLeatherCost)} and worked ${F(actHours)} hours, for which they were paid ${usd(actLabourCost)}.

Actual leather price = ${F(actLeatherCost)} ÷ ${F(actLeatherQty)} = US\\$8.15 a m²; actual wage rate = ${F(actLabourCost)} ÷ ${F(actHours)} = US\\$4.60 an hour.

${t1m}

${t1l}

${sumTab}

Check: standard direct cost of ${F(out)} bags = ${F(out)} × (12.00 + 9.00) = ${usd(stdDirect)}; actual direct cost = ${usd(actLeatherCost)} + ${usd(actLabourCost)} = ${usd(actDirect)}.

${recTab}

The four variances add to the total of ${usd(Math.abs(total))} adverse. The usage and efficiency variances are the largest, so the owner starts by checking waste of leather and the stitchers' time.
:::

## When purchases differ from usage

A business may buy more or less material than it uses. Then the **price variance is usually calculated when the material is bought** (on the quantity purchased), so that the price effect is reported at once and inventory is held at standard price. The **usage variance** is always based on the quantity used. If the question says the price variance is found on usage, use the quantity used instead.

:::worked-solution[Example 2: materials bought and used at different times]
A Mutare plastics maker has a standard of 2 kg of resin at US\\$3.00 a kilogram for each unit. It made 2,000 units in July, bought ${F(bought)} kg at US\\$3.10 a kilogram and used ${F(used)} kg. The price variance is calculated on purchases.

${t2}

Check: the cost of purchases (${usd(cost)}) = standard cost of the material used (${F(used)} × US\\$3.00 = ${usd(used * sP)}) + inventory increase at standard (${usd(inv)}) + price variance (${usd(pv.amount)}). If the price variance had been calculated on the quantity used it would be ${usd(pvUsage.amount)} adverse (4,300 × US\\$0.10), and the other ${usd(pv.amount - pvUsage.amount)} would stay in inventory until the material is used.
:::

## Interpreting the variances

A variance gives the *amount* and the *direction*; management must find the *cause*.

| Variance | Possible causes when adverse | Possible causes when favourable |
| --- | --- | --- |
| Material price | Supplier raised price; urgent buying; lost discount; better quality bought | Bulk discount; cheaper supplier; lower quality bought |
| Material usage | Waste; poor-quality material; careless or untrained workers; faulty machines; theft | Better quality material; skilled workers; better method |
| Labour rate | Pay rise above the standard; overtime; higher grade of worker used | Lower grade used; fewer bonuses |
| Labour efficiency | Untrained or unmotivated workers; poor material; machine breakdown; shortage of materials | Skilled workers; good machines; strong supervision |

Variances are linked. Cheaper, poorer-quality material may give a favourable price variance but adverse usage and efficiency variances. The next lessons return to this.

## Common mistakes

:::mistake{title="Using the actual price in the usage variance"}
The quantity variance is valued at the **standard** price. Valuing it at the actual price makes the price and usage effects overlap and the variances will not add up to the total.
:::

:::mistake{title="Using the budgeted output for the standard quantity"}
Standard quantity and standard hours are for the **actual** output, not the budgeted output. Here that is ${F(out)} bags, not 1,000.
:::

:::mistake{title="Wrong sign or missing label"}
(standard - actual) gives a negative answer when actual is higher: that means adverse. Write the amount as positive with F or A, and say which direction profit moves.
:::

:::mistake{title="Mixing paid hours and worked hours"}
The rate variance uses hours paid; the efficiency variance uses hours worked. If there is idle time, the two differ and the question will say how to treat it.
:::

## Exam tips

:::exam-tip
Direct variances appear in ZIMSEC Papers 1 to 3 (Form 6) and in Cambridge Paper 4 (A Level only), often followed by a reconciliation of standard to actual profit. For *calculate*, show the standard quantity for the actual output first, then each variance with its working, F or A, and the check against the total. For *state the sign*, say whether actual cost was above or below standard.
:::

:::exam-tip
For *explain* or *suggest reasons*, give two realistic causes linked to the data (for example "adverse usage may be caused by waste, which also explains the adverse efficiency variance") and the person responsible (purchasing manager for price; production manager for usage and efficiency; personnel for rates). For *advise*, say which variance should be investigated first and why.
:::

## Summary

:::summary
- Price/rate variance = (standard price - actual price) × actual quantity; quantity variance = (standard quantity for actual output - actual quantity) × standard price.
- The standard quantity or hours must be for the actual output, not the budget.
- Positive results are favourable and negative results are adverse; always label F or A.
- The four variances add up to the standard cost of actual output less the actual direct cost.
- Price variances may be calculated on purchases, while usage variances always use the quantity used.
- Causes are linked: poor material may save money but cause waste and lost time.
:::
`;
writeLesson("cost/variances-direct.md", front("cost.variances-direct", "Direct material and direct labour variances", "Calculate material price and usage variances and labour rate and efficiency variances, label them favourable or adverse, check them against the total and suggest causes.", "aacc.cost.variances-direct", 55), body);
void p2; void V; void VF;
