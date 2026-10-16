// Writes lessons/accounts/depreciation-inventory.md from checked figures.
import { depreciation, inventory, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

// Example 1: depreciation
const cost = 84000, residual = 12000, life = 6;
const sl = depreciation.straightLine(cost, residual, life);
chk(sl, 12000);
const rb = depreciation.reducingBalance(cost, 25, 3);
chk(rb[0].charge, 21000); chk(rb[1].charge, 15750); chk(rb[2].charge, 11812.5); chk(rb[2].nbv, 35437.5);
const rows = [1, 2, 3].map((y) => [`Year ${y}`, sl, cost - sl * y, rb[y - 1].charge, rb[y - 1].nbv]);
const depT = table(["Year", "Straight line charge", "Straight line NBV", "Reducing balance charge", "Reducing balance NBV"], rows);

// Example 2: inventory
const opening = { qty: 40, unitCost: 25 };
const txs = [{ type: "receipt", qty: 60, unitCost: 28 }, { type: "receipt", qty: 50, unitCost: 32 }, { type: "issue", qty: 120 }];
const fifo = inventory.fifoPeriodic(txs, opening), lifo = inventory.lifoPeriodic(txs, opening), avco = inventory.avcoPeriodic(txs, opening);
chk(fifo.closingValue, 960); chk(lifo.closingValue, 750); chk(avco.closingValue, 856, 0.005);
chk(fifo.goodsAvailable, 4280); chk(fifo.costOfSales, 3320); chk(lifo.costOfSales, 3530); chk(avco.costOfSales, 3424, 0.005);
const revenue = 120 * 55;
chk(revenue, 6600);
const gp = { fifo: revenue - fifo.costOfSales, lifo: revenue - lifo.costOfSales, avco: revenue - avco.costOfSales };
const invT = table(["US\\$", "FIFO", "LIFO", "AVCO"], [
  ["Goods available for sale", fifo.goodsAvailable, lifo.goodsAvailable, r2(avco.goodsAvailable)], ["Closing inventory (30 units)", fifo.closingValue, lifo.closingValue, r2(avco.closingValue)],
  ["Cost of sales", fifo.costOfSales, lifo.costOfSales, r2(avco.costOfSales)], ["Revenue (120 × 55)", revenue, revenue, revenue], ["Gross profit", gp.fifo, gp.lifo, r2(gp.avco)],
]);
// NRV
const items = [["Item A", 4800, 5500, 900], ["Item B", 3000, 3900, 300]];
const nrvRows = items.map(([n, c, sp, cs]) => [n, c, sp, cs, sp - cs, inventory.lowerOfCostAndNrv(c, sp, cs)]);
chk(nrvRows[0][5], 4600); chk(nrvRows[1][5], 3000);
const nrvT = table(["Item", "Cost (US\\$)", "Selling price (US\\$)", "Costs to sell (US\\$)", "NRV (US\\$)", "Value in the accounts (US\\$)"], nrvRows);

const body = `
## Introduction

Chidawanyika Plant Hire is a fictional company in Harare that buys an excavator for US\\$84,000. The machine will serve the business for years, but the whole of the cost cannot be charged against the first year's revenue. At the year end the company also holds spare parts and fuel, and the way these are valued changes the profit shown. **Depreciation** and **inventory valuation** are two places where accountants must use judgement, and different choices give different profit and asset values.

This lesson is tested in ZIMSEC Business Studies (Form 6) and Business Enterprise Skills (Form 5) and in Cambridge **A Level** Paper 3 and Paper 4. Cambridge asks for the **straight-line** method only, and for the **difficulties of valuing inventory** and the **net realisable value** rule. ZIMSEC adds **reducing balance** depreciation and the **FIFO, LIFO and AVCO** methods.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Depreciation: straight line and reducing balance; provision for depreciation (BES); stock valuation by FIFO, LIFO and AVCO | Depreciation (straight line only); inventory valuation; net realisable value (no methods named) |

**FIFO, LIFO, AVCO and reducing balance are ZIMSEC only.** Cambridge candidates need straight-line depreciation and the lower of cost and net realisable value.
:::

## Key definitions

:::definition{term="Depreciation"}
The allocation of the cost of a non-current asset, less any residual value, over its useful life.
:::

:::definition{term="Net book value (NBV)"}
The cost of a non-current asset less the total depreciation charged to date.
:::

:::definition{term="Net realisable value (NRV)"}
The estimated selling price of inventory less the costs of completing and selling it.
:::

:::definition{term="Residual value"}
The estimated amount that an asset will be sold for at the end of its useful life.
:::

## Depreciation

Assets wear out, become obsolete or are used up in earning revenue. Charging depreciation spreads the cost over the years that benefit (the **matching** idea) and prevents the asset from being shown at more than it is worth.

:::keyfact{title="Methods"}
- **Straight line:** annual charge = (cost − residual value) ÷ useful life in years. The charge is the same each year.
- **Reducing balance (ZIMSEC):** annual charge = percentage × net book value at the start of the year. The charge is highest in the early years and falls.
:::

**Effect on the statements.** Depreciation is an **expense** in the statement of profit or loss, so it reduces profit. In the statement of financial position it reduces the asset's **net book value** (BES shows the accumulated total as the **provision for depreciation**). It involves **no cash payment**, so it does not directly affect cash. Because it lowers profit, it may lower tax and dividends.

**Choosing a method.** Straight line is simple and suits assets used evenly. Reducing balance suits assets that lose value or become less useful quickly (vehicles, computers). Depreciation is an estimate of life and residual value, so profit includes a judgement.

## Inventory valuation

Inventory is valued at the **lower of cost and net realisable value** (NRV). The **difficulties** are: estimating the selling price of damaged, old or fashion goods; deciding the costs to sell; counting and costing items bought at different prices; and the temptation to overvalue closing inventory to raise profit. Higher closing inventory lowers the cost of sales and raises profit, so errors affect profit and the asset figure.

### ZIMSEC methods for items bought at different prices

- **FIFO** (first in, first out): the oldest units are assumed to be sold first, so closing inventory is valued at the **latest** prices.
- **LIFO** (last in, first out): the newest units are assumed to be sold first, so closing inventory is valued at the **oldest** prices.
- **AVCO** (average cost): the units are valued at a weighted average of the cost of the opening inventory and the purchases.

When prices are **rising**, FIFO gives the **highest** closing inventory and profit, and LIFO the lowest, with AVCO between. When prices fall the ranking is reversed. Total profit over the life of the business is the same; the methods only change the **timing** of profit and tax.

:::worked-solution[Example 1: straight line and reducing balance depreciation (ZIMSEC detail for reducing balance)]
**Context.** Chidawanyika Plant Hire (a fictional company) buys an excavator for ${D}84,000. It expects to use it for 6 years and then sell it for ${D}12,000. Compare straight line with reducing balance at 25% a year (no residual value is used in the reducing-balance calculation).

${depT}

1. Straight line: (84,000 − 12,000) ÷ 6 = ${D}12,000 a year. After 3 years the NBV is 84,000 − 36,000 = ${D}48,000.
2. Reducing balance: year 1 = 25% × 84,000 = ${D}21,000 (NBV 63,000); year 2 = 25% × 63,000 = ${D}15,750 (NBV 47,250); year 3 = 25% × 47,250 = ${D}11,812.50 (NBV 35,437.50).
3. **Impact.** Reducing balance charges ${D}9,000 more than straight line in year 1 so profit is lower by ${D}9,000, and the NBV is lower. By year 3 the charge (${D}11,812.50) is lower than straight line (${D}12,000). Neither method changes cash.
4. **Judgement.** If the excavator loses value fastest in the early years, reducing balance is more realistic. Cambridge candidates would use the straight-line figures. The estimates of life and residual value affect both methods, so they are a judgement.
:::

:::worked-solution[Example 2: case analysis, inventory valuation]
**Context.** Nkomo Electrical (a fictional shop) opens with 40 units at ${D}25. It buys 60 units at ${D}28 and then 50 units at ${D}32. It sells 120 units at ${D}55 each, leaving 30 units. Prices are rising. Values are by the periodic method.

${invT}

1. FIFO: the 30 units left are the latest purchases: 30 × 32 = ${D}960.
2. LIFO: the 30 units left come from the oldest layer: 30 × 25 = ${D}750.
3. AVCO: average cost = 4,280 ÷ 150 = ${D}28.53; closing inventory = 30 × 28.53 = ${D}856.
4. **Analysis.** FIFO shows the highest profit (${D}${fmt(gp.fifo)}) and the highest closing inventory; LIFO the lowest profit (${D}${fmt(gp.lifo)}); AVCO is in between (${D}${fmt(r2(gp.avco))}). The difference between FIFO and LIFO is ${D}210, and it reverses when the stock is sold later.
5. **Judgement.** When prices rise FIFO gives the higher profit but also higher tax, while LIFO gives a more recent cost of sales. LIFO is not accepted in some accounting standards, so a business must use a method consistently and say which it uses. The choice affects timing, not the total profit over the business's life.

**Net realisable value (Cambridge and ZIMSEC).** Inventory is valued at the lower of cost and NRV:

${nrvT}

Item A is written down to its NRV of ${D}4,600 (a loss of ${D}200 is charged to cost of sales); Item B stays at cost.
:::

## Common mistakes

:::mistake{title="Depreciating land or forgetting the residual value"}
Land is normally not depreciated. For straight line, deduct the residual value before dividing by the life.
:::

:::mistake{title="Applying the reducing-balance percentage to cost every year"}
The percentage is applied to the **net book value at the start of the year**, which falls each year.
:::

:::mistake{title="Saying that depreciation saves cash"}
Depreciation is a non-cash expense. It lowers profit (and so tax), but the cash for replacing the asset must be provided separately.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *calculate* depreciation (straight line and reducing balance) and closing inventory (FIFO, LIFO, AVCO) and to *discuss* their effects; Cambridge Papers 3 and 4 ask you to *explain* the role of depreciation, *explain* the difficulties of valuing inventory and *assess* the impact of a change. Show the formula, the working and the effect on profit and on the statement of financial position, and for any assessment mention that the estimates are judgements.
:::

## Summary

:::summary
- Depreciation spreads the cost of a non-current asset over its useful life; it is an expense but not a cash payment.
- Straight line = (cost − residual value) ÷ life; reducing balance (ZIMSEC) = a percentage of the opening net book value.
- Depreciation reduces profit and the net book value; it does not change cash directly.
- Inventory is valued at the lower of cost and net realisable value; higher closing inventory means higher profit.
- When prices rise, FIFO gives the highest closing inventory and profit, LIFO the lowest and AVCO lies between (ZIMSEC).
- The choice of method and the estimates are judgements and change the timing of profit, not its total.
:::
`;
lesson("accounts/depreciation-inventory", { key: "accounts.depreciation-inventory", title: "Depreciation and inventory valuation", summary: "The role of depreciation and its impact on the statements (straight line, and reducing balance for ZIMSEC), and inventory valuation: the difficulties, net realisable value, and FIFO, LIFO and AVCO (ZIMSEC).", concept: "abus.accounts.depreciation-inventory", minutes: 60 }, body);
