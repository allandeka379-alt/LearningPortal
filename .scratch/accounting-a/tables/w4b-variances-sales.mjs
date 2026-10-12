import { table, chk, r2, variances } from "../lib.mjs";
import { F, usd, p2, V, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: soap bars, Mutare. Standard price 2.40, variable cost 1.50, fixed overhead absorbed 0.30
const sp = 2.4, vc = 1.5, fo = 0.3;
const contr = r2(sp - vc), prof = r2(sp - vc - fo);
chk(contr, 0.9); chk(prof, 0.6);
const bu = 20000, au = 22500, ap = 2.3;
const price = variances.salesPrice({ stdPrice: sp, actualPrice: ap, actualUnits: au });
const volC = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
const volP = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: prof });
chk(price.value, -2250); chk(volC.value, 2250); chk(volP.value, 1500);
const budC = r2(bu * contr), actC = r2(au * (ap - vc));
chk(actC - budC, price.value + volC.value);
const budP = r2(bu * prof), actP = r2(au * (ap - vc - fo));
chk(actP - budP, price.value + volP.value);
chk(actC, 18000); chk(budC, 18000); chk(budP, 12000); chk(actP, 11250);
const t1 = table(["", "Contribution basis US\\$", "Absorption (profit) basis US\\$"], [
  ["Budgeted margin", `${F(bu)} × ${p2(contr)} = ${F(budC)}`, `${F(bu)} × ${p2(prof)} = ${F(budP)}`],
  ["Sales volume variance", `${F(au - bu)} × ${p2(contr)} = ${F(volC.amount)} ${volC.fa}`, `${F(au - bu)} × ${p2(prof)} = ${F(volP.amount)} ${volP.fa}`],
  ["Sales price variance", `${F(au)} × (2.30 - 2.40) = ${F(price.amount)} ${price.fa}`, `${F(price.amount)} ${price.fa}`],
  ["Actual margin at standard cost", `${F(actC)}`, `${F(actP)}`],
], ["l", "r", "r"]);
const t1b = table(["", "Contribution basis US\\$", "Absorption basis US\\$"], [
  ["Budgeted margin", budC, budP],
  ["Sales volume variance (favourable)", volC.amount, volP.amount],
  ["Sales price variance (adverse)", -price.amount, -price.amount],
  ["Actual margin", actC, actP],
], ["l", "r", "r"]);
chk(budC + volC.amount - price.amount, actC);
chk(budP + volP.amount - price.amount, actP);

// Example 2: paint tins
const sp2 = 18, vc2 = 11.5, c2 = r2(sp2 - vc2), bu2 = 3000, au2 = 2700, ap2 = 19.2;
const pr2 = variances.salesPrice({ stdPrice: sp2, actualPrice: ap2, actualUnits: au2 });
const vo2 = variances.salesVolume({ budgetUnits: bu2, actualUnits: au2, stdProfitPerUnit: c2 });
chk(pr2.value, 3240); chk(vo2.value, -1950);
const bud2 = r2(bu2 * c2), act2 = r2(au2 * (ap2 - vc2));
chk(bud2, 19500); chk(act2, 20790); chk(act2 - bud2, 1290); chk(pr2.value + vo2.value, 1290);
const t2 = table(["", "US\\$"], [
  [`Budgeted contribution (${F(bu2)} × ${p2(c2)})`, bud2],
  [`Sales volume variance (${F(bu2 - au2)} fewer × ${p2(c2)}), adverse`, -vo2.amount],
  [`Sales price variance (${F(au2)} × 1.20), favourable`, pr2.amount],
  [`**Actual contribution** (${F(au2)} × ${p2(ap2 - vc2)})`, `**${F(act2)}**`],
]);

const body = `
## Introduction

Farai Mutasa makes soap in Mutare and sells it to shops and market stalls. In June he cuts the price of a bar to win a big order, and sales rise. Did the price cut help or hurt? **Sales variances** answer that by splitting the difference between budgeted and actual sales margin into a **price** part and a **volume** part. They complete the variance analysis begun with materials and labour, so the final profit reconciliation (two lessons on) can start from the budgeted profit and end at the actual profit. The topic is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4); both boards use the same two variances.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge 9706 (A Level only) |
| --- | --- |
| Sales price variance | Sales price variance |
| Sales volume (profit) variance | Sales volume variance, at standard profit or at standard contribution as the question states |
| Standard profit per unit (absorption costing) | Standard profit per unit, or standard contribution per unit under marginal costing |

Read the question: if it says "at standard contribution", use the contribution per unit; if it gives a standard profit per unit, use that.
:::

## Key definitions

:::definition{term="Sales price variance"}
The effect on profit of selling at a price different from the standard price: (actual price - standard price) × actual units sold. A higher price is favourable.
:::

:::definition{term="Sales volume variance"}
The effect on profit of selling a different number of units from the budget, valued at the standard profit (or standard contribution) per unit: (actual units - budgeted units) × standard profit per unit. More units than budgeted is favourable.
:::

:::keyfact
Sales price variance = (actual price - standard price) × actual units. Sales volume variance = (actual units - budgeted units) × standard margin per unit. Their sum is the total sales margin variance: actual margin at standard cost - budgeted margin.
:::

The direction is **opposite** to that of cost variances. For costs, spending *less* than standard is favourable; for sales, receiving *more* than standard is favourable. The volume variance is valued at the **standard margin**, not at the selling price, because producing and selling extra units also costs money: only the margin is extra profit.

## Which margin to use

Under **absorption costing** the standard profit per unit is the selling price less the full standard cost (including the fixed overhead absorbed). Under **marginal costing** the margin is the contribution per unit, the selling price less the standard variable cost. The two give different volume variances, and the stem will say which is wanted. The price variance is the same on either basis because fixed overhead does not enter it.

:::worked-solution[Example 1: Mutare soap bars, price cut]
The standard selling price is US\\$2.40 a bar and the standard variable cost is US\\$1.50, so the standard contribution is US\\$0.90. Fixed overhead absorbed is US\\$0.30 a bar, giving a standard profit of US\\$0.60. The budget was ${F(bu)} bars. Farai sold ${F(au)} bars at US\\$2.30.

${t1}

Reconciliation of budgeted margin to actual margin:

${t1b}

On the contribution basis the favourable volume variance (${F(volC.amount)}) exactly offsets the adverse price variance (${F(price.amount)}): the price cut produced extra sales but no extra contribution. Actual contribution (${usd(actC)}) equals budgeted contribution (${usd(budC)}). With the extra 2,500 bars, however, the factory worked harder, used more materials and labour and might have needed more storage and delivery, so the cut did not improve profit and needed more effort.
:::

## Causes and links to other variances

**Price variance.** Adverse causes include discounts to win orders, competitors cutting their prices, weak demand and promotions. Favourable causes include a strong brand, a price increase, shortages that allow higher prices and selling to a higher-priced market.

**Volume variance.** Favourable causes include good marketing, a price cut (as above), new customers and seasonal demand. Adverse causes include a competitor's offer, a higher price, supply shortages and a poor sales force.

The sales variances are not independent of the others. A price rise often reduces volume (a favourable price variance with an adverse volume variance). Higher volume needs more material and labour, which can raise the cost of unplanned overtime (adverse labour rate variance) and may push production beyond the efficient range. Selling more than the budget is only good if the extra margin exceeds the extra costs.

:::worked-solution[Example 2: paint tins, price rise]
A Gweru hardware wholesaler has a standard selling price of US\\$18.00 a tin of paint and a standard variable cost of US\\$11.50, so the standard contribution is US\\$6.50. The budget was ${F(bu2)} tins. It sold ${F(au2)} tins at US\\$19.20.

Sales price variance = (19.20 - 18.00) × ${F(au2)} = ${usd(pr2.amount)} favourable.
Sales volume variance = (${F(au2)} - ${F(bu2)}) × 6.50 = ${usd(vo2.amount)} adverse.
Total sales margin variance = ${usd(pr2.amount)} - ${usd(vo2.amount)} = ${usd(act2 - bud2)} favourable.

${t2}

The price rise more than made up for the loss of 300 tins. A manager should still ask whether the lost customers might be permanent and whether a smaller rise would have kept the volume.
:::

## Common mistakes

:::mistake{title="Using the selling price to value the volume variance"}
Extra units earn only the standard margin, not the whole selling price. Using US\\$18 instead of US\\$6.50 would greatly overstate the effect of the missing tins.
:::

:::mistake{title="Using budgeted units for the price variance"}
The price variance applies to the units actually sold: (actual price - standard price) × **actual** units.
:::

:::mistake{title="Reversing the direction"}
For sales, a higher price or more units than budget is favourable. For costs it is the reverse. Check the sign by asking whether profit rises.
:::

:::mistake{title="Ignoring the basis in the question"}
If the question asks for a volume variance at standard contribution, do not use the absorption profit per unit. Quote the margin used in your working.
:::

## Exam tips

:::exam-tip
Sales variances appear in ZIMSEC Papers 1 and 3 (Form 6) and in Cambridge Paper 4 (A Level only), usually as part of a reconciliation of budgeted to actual profit. For *calculate*, show the margin per unit, the unit difference or price difference, and label F or A. For *state the effect*, say whether profit rises or falls.
:::

:::exam-tip
For *comment* or *evaluate*, link the two variances: a favourable volume variance with an adverse price variance suggests discounting; the reverse suggests a price rise that lost customers. Give a figure, a cause and a judgement on whether the policy helped total margin.
:::

## Summary

:::summary
- Sales price variance = (actual price - standard price) × actual units; higher prices are favourable.
- Sales volume variance = (actual units - budgeted units) × standard margin per unit; more units than budget is favourable.
- Use standard profit (absorption costing) or standard contribution (marginal costing) exactly as the question states.
- Price variance plus volume variance equals the actual margin at standard cost less the budgeted margin.
- Price and volume interact: a discount may raise volume but lower the price variance, and the net effect must be judged.
:::
`;
writeLesson("cost/variances-sales.md", front("cost.variances-sales", "Sales price and sales volume variances", "Calculate sales price and sales volume variances at standard profit or standard contribution, label them favourable or adverse and explain their causes and links to other variances.", "aacc.cost.variances-sales", 45), body);
void V;
