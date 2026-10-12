// Lesson generator: ratios.efficiency (W3b)
import { coYear, R, writeLesson, front, F } from "./w3b-lib.mjs";
import { table, ratios, chk } from "../lib.mjs";

const p1 = (v) => v.toFixed(1);
const p0 = (v) => Math.round(v).toString();
const p2 = (v) => v.toFixed(2);
const mk = (year, o) => coYear({ name: "Marondera Dairy Ltd", year, distribution: 0, admin: 0, finance: 0, tax: 0, bank: 5000, otherCL: 9000, loan: 0, shareCapital: 150000, ...o });
const a = mk(2024, { revenue: 640000, cos: 416000, creditSales: 560000, creditPurchases: 420000, inventory: 52000, receivables: 86000, payables: 61000, nca: 330000 });
const b = mk(2025, { revenue: 720000, cos: 489600, creditSales: 648000, creditPurchases: 516000, inventory: 78000, receivables: 125000, payables: 62000, nca: 410000 });
const wk = table(["Ratio", "Formula", "2024 working", "2025 working", "2024", "2025"], [
  ["Inventory turnover (days)", "inventory ÷ cost of sales × 365", `${F(a.inventory)} ÷ ${F(a.cos)} × 365`, `${F(b.inventory)} ÷ ${F(b.cos)} × 365`, p0(R.invDays(a)) + " days", p0(R.invDays(b)) + " days"],
  ["Inventory turnover (times)", "cost of sales ÷ inventory", `${F(a.cos)} ÷ ${F(a.inventory)}`, `${F(b.cos)} ÷ ${F(b.inventory)}`, p1(R.invTimes(a)) + " times", p1(R.invTimes(b)) + " times"],
  ["Trade receivables days", "receivables ÷ credit sales × 365", `${F(a.receivables)} ÷ ${F(a.creditSales)} × 365`, `${F(b.receivables)} ÷ ${F(b.creditSales)} × 365`, p0(R.recDays(a, a.creditSales)) + " days", p0(R.recDays(b, b.creditSales)) + " days"],
  ["Trade payables days", "payables ÷ credit purchases × 365", `${F(a.payables)} ÷ ${F(a.creditPurchases)} × 365`, `${F(b.payables)} ÷ ${F(b.creditPurchases)} × 365`, p0(R.payDays(a, a.creditPurchases)) + " days", p0(R.payDays(b, b.creditPurchases)) + " days"],
  ["Non-current asset turnover", "revenue ÷ non-current assets", `${F(a.revenue)} ÷ ${F(a.nca)}`, `${F(b.revenue)} ÷ ${F(b.nca)}`, p2(R.ncaTurn(a)) + " times", p2(R.ncaTurn(b)) + " times"],
], ["l", "l", "l", "l", "r", "r"]);

const c = coYear({ name: "Chegutu Feeds Ltd", year: 2025, revenue: 810000, cos: 567000, distribution: 0, admin: 0, finance: 0, tax: 0, nca: 360000, inventory: 73000, receivables: 118000, bank: 9000, payables: 64000, otherCL: 14000, loan: 80000, shareCapital: 150000, creditSales: 729000, creditPurchases: 590000 });
const open = 61000;
const avg = (open + c.inventory) / 2;
const t2 = table(["Ratio", "Working", "Result"], [
  ["Inventory turnover (times), average inventory", `${F(c.cos)} ÷ ((${F(open)} + ${F(c.inventory)}) ÷ 2) = ${F(c.cos)} ÷ ${F(avg)}`, p1(c.cos / avg) + " times"],
  ["Inventory turnover (days), average inventory", `${F(avg)} ÷ ${F(c.cos)} × 365`, p0((avg / c.cos) * 365) + " days"],
  ["Trade receivables days", `${F(c.receivables)} ÷ ${F(c.creditSales)} × 365`, p0(R.recDays(c, c.creditSales)) + " days"],
  ["Trade payables days", `${F(c.payables)} ÷ ${F(c.creditPurchases)} × 365`, p0(R.payDays(c, c.creditPurchases)) + " days"],
  ["Non-current asset turnover", `${F(c.revenue)} ÷ ${F(c.nca)}`, p2(R.ncaTurn(c)) + " times"],
  ["Total assets turnover (ZIMSEC)", `${F(c.revenue)} ÷ ${F(c.assets)}`, p2(ratios.totalAssetsTurnover(c.revenue, c.assets)) + " times"],
  ["Current assets turnover (ZIMSEC)", `${F(c.revenue)} ÷ ${F(c.ca)}`, p2(ratios.currentAssetsTurnover(c.revenue, c.ca)) + " times"],
  ["Capital employed turnover (ZIMSEC)", `${F(c.revenue)} ÷ ${F(c.capitalEmployed)}`, p2(ratios.capitalEmployedTurnover(c.revenue, c.capitalEmployed)) + " times"],
], ["l", "l", "r"]);
chk(c.assets, 560000);

const body = `
## Introduction

Chipo Dube manages a dairy in Marondera. Milk, cheese and yoghurt must be sold quickly, supermarkets take weeks to pay and the farmers who supply the milk want their money each month. If she holds too much stock, lets customers pay late or pays suppliers too early, cash is trapped. **Efficiency ratios** show how well a business uses its assets and manages its working capital. They are sometimes called activity ratios or resource-utilisation ratios.

You already know the layout of the statements and the profitability and liquidity ratios. Here the same statements give a different view: how fast inventory sells, how fast customers pay, how long the business takes to pay its suppliers and how much revenue each dollar of assets earns. Both boards test these ratios in Papers 1 to 3.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Stock turnover; rate of stock turnover | Rate of inventory turnover (times); inventory turnover (days) |
| Accounts receivable collection period; debtors' collection period | Trade receivables turnover (days) |
| Accounts payable payment period; creditors' payment period | Trade payables turnover (days) |
| Total assets, current assets and capital employed turnover | Not in the Cambridge appendix (non-current asset turnover is) |
:::

The turnover of total assets, current assets and capital employed is **ZIMSEC detail**. State the formula you use.

## Key definitions

:::definition{term="Inventory turnover"}
How quickly inventory is sold and replaced. It is expressed in times (cost of sales divided by inventory) or in days (inventory divided by cost of sales, multiplied by 365).
:::

:::definition{term="Trade receivables days"}
The average number of days customers take to pay, found from trade receivables and credit sales.
:::

:::definition{term="Trade payables days"}
The average number of days the business takes to pay its suppliers, found from trade payables and credit purchases.
:::

:::definition{term="Non-current asset turnover"}
Revenue divided by the carrying amount of non-current assets. It shows the revenue earned for each dollar invested in non-current assets.
:::

## The formulae

:::keyfact{title="Efficiency formulae"}
- Rate of inventory turnover (times) = cost of sales ÷ average inventory
- Inventory turnover (days) = average inventory ÷ cost of sales × 365
- Trade receivables days = trade receivables ÷ credit sales × 365
- Trade payables days = trade payables ÷ credit purchases × 365
- Non-current asset turnover = revenue ÷ non-current assets (carrying amount)
- ZIMSEC: total assets turnover = revenue ÷ total assets; current assets turnover = revenue ÷ current assets; capital employed turnover = revenue ÷ capital employed
:::

Use **year-end balances** unless the question says *average*, and state which you used. Average inventory is (opening inventory + closing inventory) ÷ 2. Receivables days is based on credit sales, and payables days on credit purchases; if the question gives only revenue or cost of sales, use those and say so. Days are normally given to the nearest whole day, and turnovers in times to one decimal place.

:::worked-solution[Example 1: Marondera Dairy Ltd, two years]
The figures of Marondera Dairy Ltd for the years ended 31 December 2024 and 2025 are below. Calculate the efficiency ratios, using year-end balances, and comment.

| Item | 2024 US\\$ | 2025 US\\$ |
| --- | ---: | ---: |
| Revenue | ${F(a.revenue)} | ${F(b.revenue)} |
| of which credit sales | ${F(a.creditSales)} | ${F(b.creditSales)} |
| Cost of sales | ${F(a.cos)} | ${F(b.cos)} |
| Credit purchases | ${F(a.creditPurchases)} | ${F(b.creditPurchases)} |
| Inventory | ${F(a.inventory)} | ${F(b.inventory)} |
| Trade receivables | ${F(a.receivables)} | ${F(b.receivables)} |
| Trade payables | ${F(a.payables)} | ${F(b.payables)} |
| Non-current assets (carrying amount) | ${F(a.nca)} | ${F(b.nca)} |

${wk}
:::

Every ratio has moved in the wrong direction. Inventory now takes ${p0(R.invDays(b))} days to sell instead of ${p0(R.invDays(a))}, so more cash is held in milk products, which have a short life. Customers take ${p0(R.recDays(b, b.creditSales))} days to pay instead of ${p0(R.recDays(a, a.creditSales))}, which suggests weaker credit control or more generous terms given to win sales. The dairy pays its suppliers faster, in ${p0(R.payDays(b, b.creditPurchases))} days instead of ${p0(R.payDays(a, a.creditPurchases))}, so it receives less free credit. Together these changes absorb cash. Non-current asset turnover fell from ${p2(R.ncaTurn(a))} to ${p2(R.ncaTurn(b))} times: the extra plant has not yet produced a proportionate rise in revenue.

:::worked-solution[Example 2: average inventory and the ZIMSEC turnovers]
Chegutu Feeds Ltd made revenue of US\\$${F(c.revenue)} in 2025, of which US\\$${F(c.creditSales)} was on credit, and its cost of sales was US\\$${F(c.cos)}. Credit purchases were US\\$${F(c.creditPurchases)}. Inventory was US\\$${F(open)} at 1 January 2025. Other year-end figures: inventory US\\$${F(c.inventory)}, trade receivables US\\$${F(c.receivables)}, cash US\\$${F(c.bank)}, trade payables US\\$${F(c.payables)}, non-current assets US\\$${F(c.nca)}, capital employed US\\$${F(c.capitalEmployed)}. Calculate the efficiency ratios, using average inventory.

${t2}

Average inventory is ${F(avg)}. The two inventory measures are linked: ${p1(c.cos / avg)} times a year is one sale of the stock every ${p0((avg / c.cos) * 365)} days. Receivables days of ${p0(R.recDays(c, c.creditSales))} exceed payables days of ${p0(R.payDays(c, c.creditPurchases))}, so the company waits longer to be paid than it takes to pay, and must finance the gap.
:::

## Interpreting the ratios

A change in a ratio tells you where to look; it does not tell you the cause. Link each ratio to a business reason and to the other ratios.

- **Inventory days rising** can mean slow sales, over-buying, obsolete items or stock-piling before a price rise. Falling days can mean good control or a risk of running out of items.
- **Receivables days rising** shows slow collection, weak credit control or longer credit terms given to win customers. Compare with the stated credit period: if the terms are 30 days and the figure is 70, there is a problem.
- **Payables days rising** means the business uses suppliers as a source of finance, which helps cash but risks losing supplier goodwill or discounts. Falling days may show that suppliers now demand quicker payment.
- **Non-current asset turnover falling** means the assets earn less revenue: capacity may be unused, or new assets have not yet reached full production.

Compare the three working capital measures: inventory days + receivables days - payables days is the **working capital cycle** (see the solvency and gearing lesson). A long cycle means cash is tied up for long.

## Common mistakes

:::mistake{title="Using total sales for receivables days"}
Trade receivables arise only from credit sales. If the question gives credit sales, use them. If cash sales are not stated, use revenue and say so.
:::

:::mistake{title="Using revenue for inventory days"}
Inventory is valued at cost, so the base is cost of sales. Revenue includes profit and gives a wrong answer.
:::

:::mistake{title="Using credit sales for payables days"}
Payables days compares trade payables with credit purchases, not with sales or cost of sales (unless the question gives only cost of sales).
:::

:::mistake{title="Describing a rise in payables days as always good"}
It conserves cash, but it may mean the business is struggling to pay or will lose supplier discounts. Comment on both sides.
:::

## Exam tips

:::exam-tip
Efficiency ratios are tested in ZIMSEC Papers 1 to 3 and Cambridge Papers 1 to 3. For *calculate*, state the formula, the figures, the answer and its unit (days or times), and use the basis the question names. For *comment*, give the direction, a business reason and the effect on cash.
:::

:::exam-tip
For *evaluate* or *advise* link the ratios: slower inventory and slower customers together with faster payment to suppliers drain cash, so recommend actions such as stricter credit control, a cash discount, smaller orders or renegotiated supplier terms, and give the cost of each.
:::

## Summary

:::summary
- Inventory turnover uses cost of sales; receivables days uses credit sales; payables days uses credit purchases; all days are multiplied by 365.
- Use year-end balances unless the question says average; state your basis.
- Non-current asset turnover = revenue ÷ non-current assets; total assets, current assets and capital employed turnover are ZIMSEC detail.
- Longer inventory and receivables days with shorter payables days tie up cash.
- Explain a change by naming a business cause and linking it to the other ratios.
:::
`;
writeLesson("ratios/efficiency.md", front("ratios.efficiency", "Efficiency ratios and working capital management", "Calculate inventory turnover, receivables and payables days and asset turnover (with the ZIMSEC total assets, current assets and capital employed turnover), and interpret changes in credit control and stock control.", ["aacc.ratios.efficiency"], 50), body);
