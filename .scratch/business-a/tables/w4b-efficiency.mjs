// Writes lessons/ratios/efficiency.md from checked figures.
import { ratios, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

// Example 1: Vumba Hardware Ltd
const Y = {
  2024: { cos: 462000, invOpen: 49000, invClose: 50000, credSales: 560000, rec: 63000, credPurch: 390000, pay: 52000 },
  2025: { cos: 504000, invOpen: 50000, invClose: 74000, credSales: 600000, rec: 82000, credPurch: 420000, pay: 54000 },
};
const calc = (y) => {
  const avg = (y.invOpen + y.invClose) / 2;
  return { avg, turn: ratios.inventoryTurnover(y.cos, avg), days: ratios.inventoryDays(avg, y.cos), rec: ratios.receivablesDays(y.rec, y.credSales), pay: ratios.payablesDays(y.pay, y.credPurch) };
};
const a24 = calc(Y[2024]), a25 = calc(Y[2025]);
chk(a24.avg, 49500); chk(a25.avg, 62000);
chk(a24.turn, 9.3333, 1e-3); chk(a25.turn, 8.1290, 1e-3);
chk(a24.rec, 41.0625, 1e-3); chk(a25.rec, 49.8833, 1e-3);
chk(a24.pay, 48.6667, 1e-3); chk(a25.pay, 46.9286, 1e-3);
chk(a25.days, 44.9, 0.05);
const input = table(["US\\$", "2024", "2025"], [
  ["Cost of sales", Y[2024].cos, Y[2025].cos], ["Inventories at start of year", Y[2024].invOpen, Y[2025].invOpen], ["Inventories at end of year", Y[2024].invClose, Y[2025].invClose],
  ["Credit sales", Y[2024].credSales, Y[2025].credSales], ["Trade receivables at year end", Y[2024].rec, Y[2025].rec],
  ["Credit purchases", Y[2024].credPurch, Y[2025].credPurch], ["Trade payables at year end", Y[2024].pay, Y[2025].pay],
]);
const out = table(["Ratio", "2024", "2025"], [
  ["Rate of inventory turnover (times)", a24.turn.toFixed(1), a25.turn.toFixed(1)],
  ["Trade receivables turnover (days)", a24.rec.toFixed(0), a25.rec.toFixed(0)],
  ["Trade payables turnover (days)", a24.pay.toFixed(0), a25.pay.toFixed(0)],
], ["l", "r", "r"]);
// Example 2
const cs = 600000, recNow = 82000;
const days40 = 40;
const recAt40 = (cs * days40) / 365;
const freed = recNow - recAt40;
chk(recAt40, 65753.4247, 0.01);
const discCost = cs * 0.5 * 0.02;
chk(discCost, 6000);

const body = `
## Introduction

Vumba Hardware Ltd is a fictional company in Mutare. It makes a good profit, yet its owner is always chasing cash: customers take weeks to pay, the warehouse is full, and suppliers want their money. Profit and liquidity ratios do not show **why**. **Financial efficiency ratios** measure how well the business manages its inventory, what customers owe it and what it owes its suppliers, the three items that decide how quickly it turns resources into cash.

This lesson is tested in ZIMSEC Business Studies (Form 6) and in Cambridge **A Level** Paper 3 and Paper 4. You should know the ratios from liquidity and the idea of working capital. The Cambridge appendix gives the formulae below; ratios are not printed in question papers.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Stock turnover (times); stock days; debtor days (debtors' collection period); creditor days (creditors' payment period) | Rate of inventory turnover (times); trade receivables turnover (days); trade payables turnover (days) |

**Inventory days** (average inventory ÷ cost of sales × 365) are **ZIMSEC detail** and are not in the Cambridge appendix; Cambridge asks for the rate of inventory turnover. Use year-end receivables and payables unless a question says "average".
:::

## Key definitions

:::definition{term="Rate of inventory turnover"}
The number of times in a year that a business sells and replaces its average inventory.
:::

:::definition{term="Trade receivables turnover (days)"}
The average number of days that customers take to pay for goods or services bought on credit.
:::

:::definition{term="Trade payables turnover (days)"}
The average number of days that the business takes to pay its suppliers for goods or services bought on credit.
:::

:::definition{term="Financial efficiency"}
How well a business manages its inventory, receivables and payables so that cash is not tied up unnecessarily.
:::

## The formulae

:::keyfact{title="Financial efficiency ratios"}
- Rate of inventory turnover (times) = cost of sales ÷ average inventory
- Average inventory = (opening inventory + closing inventory) ÷ 2
- Inventory days (ZIMSEC) = average inventory ÷ cost of sales × 365
- Trade receivables turnover (days) = trade receivables ÷ credit sales × 365
- Trade payables turnover (days) = trade payables ÷ credit purchases × 365
:::

Use **cost of sales** (not revenue) for inventory, **credit sales** (not all sales) for receivables and **credit purchases** for payables. If a question gives only total sales or purchases, say that you are assuming all are on credit.

## Interpreting the ratios

- **Inventory turnover:** a higher figure means inventory is sold more quickly, so less money is tied up and there is less risk of wastage or obsolescence. Too high may mean stock-outs and lost sales. What is normal depends on the industry: a bakery turns inventory over daily; a car dealer much more slowly.
- **Receivables days:** fewer days means cash arrives sooner. Very short terms may lose customers; long terms raise the risk of bad debts.
- **Payables days:** more days means the business is using suppliers' credit as free finance. But paying too late may lose discounts and supplier goodwill, and a rising figure can show a cash problem.

Compare the three figures with **each other**: if customers take 50 days to pay but the business pays suppliers in 47, cash is out of the business for 3 days longer than it is being funded by suppliers, and the gap must be financed by an overdraft or cash. Compare also with the previous year, with competitors and with the **credit terms** offered (a "30-day" term with a result of 50 days means customers are paying late).

## Improving financial efficiency

| Target | Methods | Drawbacks |
| --- | --- | --- |
| Inventory turnover | Just-in-time ordering; sell slow lines at a discount; better demand forecasts | Risk of stock-outs; discounts reduce profit |
| Receivables days | Credit checks; shorter terms; early-payment discounts; debt collection; factoring | May lose customers; discounts cost money |
| Payables days | Negotiate longer terms; pay on the last permitted day | Supplier goodwill or discounts may be lost |

:::worked-solution[Example 1: calculating and interpreting efficiency ratios]
**Context.** Vumba Hardware Ltd (a fictional company) supplies the following data.

${input}

1. Average inventory 2025 = (50,000 + 74,000) ÷ 2 = US\\$62,000; 2024 = (49,000 + 50,000) ÷ 2 = US\\$49,500.
2. Rate of inventory turnover 2025 = 504,000 ÷ 62,000 = **${a25.turn.toFixed(1)} times**; 2024 = 462,000 ÷ 49,500 = ${a24.turn.toFixed(1)} times. (ZIMSEC inventory days 2025 = 62,000 ÷ 504,000 × 365 = ${a25.days.toFixed(1)} days.)
3. Trade receivables days 2025 = 82,000 ÷ 600,000 × 365 = **${a25.rec.toFixed(1)} days** (50 to the nearest day); 2024 = 63,000 ÷ 560,000 × 365 = ${a24.rec.toFixed(1)} days.
4. Trade payables days 2025 = 54,000 ÷ 420,000 × 365 = **${a25.pay.toFixed(1)} days** (47 to the nearest day); 2024 = 52,000 ÷ 390,000 × 365 = ${a24.pay.toFixed(1)} days.

${out}

5. **Interpretation.** Efficiency has worsened on all three fronts. Inventory turns over less often because closing inventory rose by US\\$24,000; customers now take about 50 days instead of 41 to pay, while the company pays its own suppliers in 47 days instead of 49. Customers are being financed for longer than the company is financed by its suppliers.
6. **Judgement.** The company should find out why inventory rose, enforce its credit terms and perhaps offer a discount for early payment. The cause may be temporary, for example stock bought before a price rise, so the next year's figures are needed before the trend is called permanent.
:::

:::worked-solution[Example 2: case analysis, improving receivables days]
**Context.** The owner of Vumba Hardware proposes to cut receivables days from about 50 to 40, either by stricter credit control or by offering a 2% discount for payment within 10 days (expected to be taken by half of the credit sales of US\\$600,000).

**Point.** A faster collection of cash would reduce the overdraft, but the methods have different costs.

**Application.** At 40 days, receivables would be 600,000 × 40 ÷ 365 = US\\$${fmt(r2(recAt40))}, compared with US\\$82,000 now: about US\\$${fmt(Math.round(freed))} of cash released. The discount would cost 2% × US\\$300,000 = US\\$${fmt(discCost)} a year.

**Analysis.** Stricter credit control costs little but may annoy customers who are used to long terms, and some may go to a rival. The discount costs US\\$${fmt(discCost)}; if the company pays 12% on its overdraft, the interest saved on US\\$${fmt(Math.round(freed))} is about US\\$${fmt(Math.round(freed * 0.12))}, much less than the cost of the discount.

**Judgement.** The discount does not pay for itself at this interest rate. Credit control, with a warning to customers, is likely to be better, provided it does not lose valuable customers. The company should apply it gradually and monitor sales.
:::

## Common mistakes

:::mistake{title="Using revenue instead of cost of sales for inventory"}
Inventory is valued at cost, so inventory turnover uses **cost of sales**. Using revenue gives a figure that is too high.
:::

:::mistake{title="Forgetting to average the inventory"}
The Cambridge appendix uses **average inventory** for turnover. Using only closing inventory gives a different answer.
:::

:::mistake{title="Mixing up receivables and payables"}
A longer receivables period is **bad** for cash (customers take longer to pay); a longer payables period **helps** cash but may harm supplier relations. Say which side you mean.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 ask you to *calculate*, *state* and *discuss* stock turnover, debtor days and creditor days; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse* and *evaluate* the three ratios. Write the formula, state whether you are using average or year-end figures, round as asked, and then interpret the figures in context with a comparison. For *evaluate*, weigh each method of improvement against its cost, for example discounts and lost customers.
:::

## Summary

:::summary
- Rate of inventory turnover = cost of sales ÷ average inventory (times); ZIMSEC also uses inventory days = average inventory ÷ cost of sales × 365.
- Receivables days = trade receivables ÷ credit sales × 365; payables days = trade payables ÷ credit purchases × 365.
- Faster inventory turnover and fewer receivables days release cash; more payables days finances the business but may harm suppliers.
- Compare receivables days and payables days with each other, with credit terms, the previous year and rivals.
- Improvement methods include just-in-time, credit control, early-payment discounts and longer supplier terms, each with a drawback.
- Industry matters: a bakery and a car dealer have very different normal figures.
:::
`;
lesson("ratios/efficiency", { key: "ratios.efficiency", title: "Financial efficiency ratios: inventory turnover, receivables days and payables days", summary: "Calculating and interpreting the rate of inventory turnover, trade receivables days and trade payables days (ZIMSEC stock, debtor and creditor days), their links to cash flow, and ways of improving efficiency.", concept: "abus.ratios.efficiency", minutes: 55 }, body);
