import { table, chk, r2, sum } from "../lib.mjs";
import { F, usd, writeLesson, front } from "./w4b-lib.mjs";

const months = ["January", "February", "March"];
const sales = [1200, 1500, 1800, 2000]; // Apr needed for closing inventory
const price = 14;
const fgPct = 0.2, rmPct = 0.25;
// finished goods
const openFG = [240];
const closeFG = [0.2 * 1500, 0.2 * 1800, 0.2 * 2000].map((x) => x);
const prod = [];
for (let i = 0; i < 3; i += 1) {
  const op = i === 0 ? 240 : closeFG[i - 1];
  prod.push(sales[i] + closeFG[i] - op);
}
chk(prod[0], 1260); chk(prod[1], 1560); chk(prod[2], 1840);
const prodApr = 2040;
// materials
const kgPer = 2, kgPrice = 3, hrPer = 0.5, hrRate = 4.5;
const usage = [...prod, prodApr].map((p) => p * kgPer);
const openRM = [rmPct * usage[0]];
const closeRM = [0, 1, 2].map((i) => rmPct * usage[i + 1]);
const purch = [0, 1, 2].map((i) => usage[i] + closeRM[i] - (i === 0 ? openRM[0] : closeRM[i - 1]));
chk(purch[0], 2670); chk(purch[1], 3260); chk(purch[2], 3780);
const purchCost = purch.map((p) => p * kgPrice);
const hours = prod.map((p) => p * hrPer);
const labCost = hours.map((h) => h * hrRate);
const rev = sales.slice(0, 3).map((s) => s * price);
// receivables
const openRec = 9000, cashPct = 0.4;
const credit = rev.map((r) => r * (1 - cashPct));
const collections = [0, 1, 2].map((i) => cashPct * rev[i] + (i === 0 ? openRec : credit[i - 1]));
const closeRec = credit[2];
chk(openRec + sum(credit) - (collections.reduce((s, c, i) => s + c - cashPct * rev[i], 0)), closeRec);
// payables
const openPay = 7200;
const payments = [0, 1, 2].map((i) => (i === 0 ? openPay : purchCost[i - 1]));
const closePay = purchCost[2];
chk(openPay + sum(purchCost) - sum(payments), closePay);

const m = (arr, fn = F) => [...arr.map((x) => fn(x)), fn(sum(arr))];
const tSales = table(["Sales budget", ...months, "Total"], [
  ["Sales (units)", ...m(sales.slice(0, 3))], ["Selling price US\\$", ...[14, 14, 14].map(F), ""], ["Sales revenue US\\$", ...m(rev)],
]);
const tProd = table(["Production budget (units)", ...months, "Total"], [
  ["Sales", ...m(sales.slice(0, 3))],
  ["Add: closing inventory (20% of next month's sales)", ...m(closeFG)],
  ["Less: opening inventory", ...m([240, closeFG[0], closeFG[1]].map((x) => x))],
  ["**Production**", ...m(prod).map((x) => `**${x}**`)],
]);
// fix: opening inventory shows as deduction label only
const tMat = table(["Materials budget (kg of wax)", ...months, "Total"], [
  ["Materials used (production × 2 kg)", ...m(usage.slice(0, 3))],
  ["Add: closing inventory (25% of next month's usage)", ...m(closeRM)],
  ["Less: opening inventory", ...m([openRM[0], closeRM[0], closeRM[1]])],
  ["**Purchases (kg)**", ...m(purch).map((x) => `**${x}**`)],
  ["**Purchases cost at US\\$3.00 (US\\$)**", ...m(purchCost).map((x) => `**${x}**`)],
]);
const tLab = table(["Labour budget", ...months, "Total"], [
  ["Production (units)", ...m(prod)], ["Labour hours (0.5 per unit)", ...m(hours)], ["Labour cost at US\\$4.50 (US\\$)", ...m(labCost)],
]);
const tRec = table(["Trade receivables budget (US\\$)", ...months, "Total"], [
  ["Cash sales (40%)", ...m(rev.map((r) => r * cashPct))],
  ["Collected from credit customers (previous month's credit sales)", ...m([openRec, credit[0], credit[1]])],
  ["**Cash received from customers**", ...m(collections).map((x) => `**${x}**`)],
]);
const tPay = table(["Trade payables budget (US\\$)", ...months, "Total"], [
  ["Purchases for the month", ...m(purchCost)],
  ["Paid in the month (previous month's purchases)", ...m(payments)],
]);
const recProof = `Closing trade receivables at 31 March = 60% of March sales = ${usd(closeRec)}; closing trade payables = March purchases = ${usd(closePay)}.`;

// Example 2: capacity 1,700 units
const cap = 1700;
const febProd = cap, marProd = cap;
const febCloseFG = 300 + febProd - sales[1];
const marCloseFG = febCloseFG + marProd - sales[2];
chk(febCloseFG, 500);
chk(marCloseFG, 400);
const tCap = table(["Revised production budget (units)", "February", "March"], [
  ["Opening inventory", F(300), F(febCloseFG)],
  ["Production (capacity 1,700)", F(febProd), F(marProd)],
  ["Sales", F(sales[1]), F(sales[2])],
  ["Closing inventory", F(febCloseFG), F(marCloseFG)],
  ["Target closing inventory (20% of next month's sales)", F(360), F(400)],
]);

const body = `
## Introduction

Gift Candles in Chitungwiza makes boxes of candles for gift shops. Before the new quarter the owner must know how many boxes to make each month, how much wax to order, how many hours the workers must be available, and how much cash customers and suppliers will move. These plans are the **operating budgets**: the sales budget, production budget, materials budget (usage and purchases), labour budget, and the budgets for trade receivables and trade payables. They are prepared in a fixed order, each using the one before. The lesson is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4). You should know the purpose of budgets and the limiting factor from the previous lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Sales budget; production budget | Sales budget; production budget |
| Raw materials usage and purchases budgets | Direct materials usage and purchases budgets |
| Debtors and creditors budgets | Trade receivables and trade payables budgets |
| Direct labour budget | Direct labour budget |
| Finished goods and raw materials inventory | Finished goods and raw materials inventory |
:::

## Key definitions

:::definition{term="Sales budget"}
The planned sales in units and in revenue for each period, found from forecasts, orders and capacity.
:::

:::definition{term="Production budget"}
The units that must be made in each period: sales units + planned closing inventory of finished goods - opening inventory.
:::

:::definition{term="Materials purchases budget"}
The quantity and cost of materials to be bought: materials needed for production + planned closing material inventory - opening material inventory.
:::

:::keyfact
Production = sales + closing inventory - opening inventory. Purchases = materials used + closing materials inventory - opening materials inventory. Cash received = cash sales + credit sales collected in the period. The opening inventory of one month is the closing inventory of the month before.
:::

## The order of preparation

1. **Identify the limiting factor** and prepare its budget first. If sales are the limit (the usual case), begin with sales.
2. **Sales budget**: units × selling price, split into cash and credit sales.
3. **Production budget** (units): use the inventory policy.
4. **Materials usage budget**: production units × quantity per unit; then the **purchases budget** (quantity and cost).
5. **Labour budget**: production units × hours per unit × rate; add overtime premium when the hours exceed normal time.
6. **Trade receivables and payables budgets**: use credit terms to turn sales and purchases into cash received and cash paid. These feed the cash budget (a later lesson).
7. **Check that the budgets agree**: production within capacity, materials available and labour hours possible.

:::worked-solution[Example 1: Gift Candles, January to March]
A box sells for US\\$14.00. Sales forecasts are ${F(1200)}, ${F(1500)} and ${F(1800)} boxes for January to March and ${F(2000)} for April. The business wants finished goods at the end of each month equal to 20% of the next month's sales (opening inventory on 1 January: 240 boxes). Each box uses 2 kg of wax at US\\$3.00 and 0.5 labour hours at US\\$4.50. Wax inventory at the end of each month should be 25% of the next month's usage (April production is budgeted at ${F(prodApr)} boxes; opening wax on 1 January: ${F(openRM[0])} kg). 40% of sales are for cash and the rest are paid in the following month (trade receivables at 1 January: ${usd(openRec)}). Purchases are paid in the following month (trade payables at 1 January: ${usd(openPay)}).

${tSales}

${tProd}

${tMat}

${tLab}

${tRec}

${tPay}

${recProof} Check: closing receivables = opening ${F(openRec)} + credit sales ${F(sum(credit))} - collected from credit customers ${F(openRec + credit[0] + credit[1])} = ${F(closeRec)}.
:::

## Checking that the budgets agree

A budget that cannot be done is useless. If production in any month is above the factory's capacity, the shortage of capacity becomes the limiting factor. The options are to produce earlier and hold more inventory, work overtime, hire more machines or reduce sales. Any change flows through all later budgets (materials, labour, cash).

:::worked-solution[Example 2: Gift Candles when capacity is 1,700 boxes a month]
The Example 1 production budget needs ${F(prod[2])} boxes in March but the workshop can make only ${F(cap)}. The owner decides to produce ${F(cap)} in February (instead of ${F(prod[1])}) and ${F(cap)} in March.

${tCap}

February's closing inventory (${F(febCloseFG)}) is above the 20% target of 360, but March's closing inventory is exactly the target of 400, so the plan is feasible. The February materials, labour and cash budgets must be recalculated with 1,700 boxes: extra wax and labour are needed earlier, and cash is needed sooner. If the owner cannot hold the extra inventory, the alternative is overtime or reducing March sales.
:::

## Common mistakes

:::mistake{title="Forgetting the inventory adjustment"}
Production is not equal to sales unless inventory does not change. Add the closing inventory and deduct the opening inventory.
:::

:::mistake{title="Using this month's usage for the closing materials inventory"}
A policy such as "25% of next month's usage" needs the next month's production, so the budget for the following month (or a given figure) is needed.
:::

:::mistake{title="Confusing purchases with usage"}
Usage is what is put into production. Purchases depend on the change in materials inventory. Pay for purchases (not usage) in the payables budget.
:::

:::mistake{title="Taking the opening inventory from the wrong month"}
The opening inventory of February is the closing inventory of January. Check that each month's opening figure agrees with the previous closing figure.
:::

## Exam tips

:::exam-tip
Operating budgets appear in ZIMSEC Papers 2 and 3 (Form 6) and in Cambridge Paper 4 (A Level only), usually as the first part of a cash or master budget question. For *prepare*, set out a table with a column for each period and a total, show the formula line by line and check that opening inventory agrees with the previous closing inventory. For *calculate*, show the units before the dollar amounts.
:::

:::exam-tip
For *explain* or *comment*, link the budgets: "production exceeds capacity in March, so the production budget must be changed and the materials and labour budgets re-calculated". For *advise*, give two options (overtime, earlier production, subcontracting) with a cost or risk for each.
:::

## Summary

:::summary
- Start with the limiting factor; for most businesses this is the sales budget.
- Production = sales + closing inventory - opening inventory.
- Purchases = materials used + closing materials inventory - opening materials inventory.
- Labour cost = production × hours per unit × rate (add overtime premium if required).
- Receivables and payables budgets turn sales and purchases into cash received and paid using the credit terms.
- Check that production, materials and labour fit capacity; adjust and recalculate if they do not.
:::
`;
writeLesson("budget/operating-budgets.md", front("budget.operating-budgets", "Sales, production, purchases, labour and working-capital budgets", "Prepare the sales, production, materials, labour, trade receivables and trade payables budgets from a business's data and inventory policy, and check that the budgets agree.", "aacc.budget.operating-budgets", 55), body);
void r2;
