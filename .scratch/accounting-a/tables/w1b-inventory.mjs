// Lesson: valuation.inventory
import { t, money, fmt, check, chk, r2, sum, table, statement, inventory, ratios } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: lower of cost and NRV
const items = [
  ["Cooking oil (20 litre drums)", 4200, 5600, 300],
  ["Maize meal (50 kg bags)", 6800, 6500, 250],
  ["Soap (cartons)", 3100, 3150, 200],
  ["Damaged tins of fish", 2400, 2600, 900],
];
const rows1 = items.map(([n, cost, sp, sc]) => {
  const nrv = sp - sc;
  return { n, cost, sp, sc, nrv, val: Math.min(cost, nrv) };
});
const t1 = table(["Item", `Cost ${U}`, `Selling price ${U}`, `Selling costs ${U}`, `NRV ${U}`, `Valued at ${U}`],
  rows1.map((r) => [r.n, r.cost, r.sp, r.sc, r.nrv, r.val]));
const totCost = sum(rows1.map((r) => r.cost));
const totVal = sum(rows1.map((r) => r.val));
const t1tot = `Total cost ${money(totCost)}; total at the lower of cost and NRV ${money(totVal)}; write-down ${money(totCost - totVal)}`;
chk(totVal, 15100); chk(totCost - totVal, 1400);

// Example 2: FIFO and AVCO, perpetual and periodic
const opening = { qty: 100, unitCost: 12 };
const txs = [
  { date: "5 Mar", type: "receipt", qty: 200, unitCost: 13 },
  { date: "12 Mar", type: "issue", qty: 150 },
  { date: "20 Mar", type: "receipt", qty: 150, unitCost: 15 },
  { date: "28 Mar", type: "issue", qty: 200 },
];
const fp = inventory.fifoPerpetual(txs, opening);
const ap = inventory.avcoPerpetual(txs, opening);
const fper = inventory.fifoPeriodic(txs, opening);
const aper = inventory.avcoPeriodic(txs, opening);
// FIFO perpetual table
{
  const layers = [{ qty: 100, u: 12 }];
  var fifoRows = [];
  for (const tx of txs) {
    if (tx.type === "receipt") {
      layers.push({ qty: tx.qty, u: tx.unitCost });
      fifoRows.push([tx.date, `Receipt ${tx.qty} units at ${tx.unitCost}`, tx.qty * tx.unitCost, null, layers.map((l) => `${l.qty} @ ${l.u}`).join(", "), sum(layers.map((l) => l.qty * l.u))]);
    } else {
      let need = tx.qty, cost = 0;
      const parts = [];
      while (need > 0) {
        const l = layers[0];
        const take = Math.min(need, l.qty);
        cost += take * l.u;
        parts.push(`${take} @ ${l.u}`);
        l.qty -= take;
        need -= take;
        if (l.qty === 0) layers.shift();
      }
      fifoRows.push([tx.date, `Issue ${tx.qty} units (${parts.join(" + ")})`, null, cost, layers.map((l) => `${l.qty} @ ${l.u}`).join(", "), sum(layers.map((l) => l.qty * l.u))]);
    }
  }
}
const fifoTab = table(["Date", "Transaction", `Receipts ${U}`, `Issues ${U}`, "Units held", `Value held ${U}`], fifoRows, ["l", "l", "r", "r", "l", "r"]);
check("fifo issues", fp.costOfIssues, 4550);
check("fifo closing", fp.closingValue, 1500);
// AVCO perpetual table
{
  let q = 100, v = 1200;
  var avRows = [];
  for (const tx of txs) {
    if (tx.type === "receipt") {
      q += tx.qty; v += tx.qty * tx.unitCost;
      avRows.push([tx.date, `Receipt ${tx.qty} units at ${tx.unitCost}`, tx.qty * tx.unitCost, null, q, r2(v / q), r2(v)]);
    } else {
      const avg = v / q, cost = tx.qty * avg;
      q -= tx.qty; v -= cost;
      avRows.push([tx.date, `Issue ${tx.qty} units at ${r2(avg)}`, null, r2(cost), q, q ? r2(v / q) : 0, r2(v)]);
    }
  }
}
const avTab = table(["Date", "Transaction", `Receipts ${U}`, `Issues ${U}`, "Units held", `Average cost ${U}`, `Value held ${U}`], avRows, ["l", "l", "r", "r", "r", "r", "r"]);
check("avco issues", ap.costOfIssues, 4666.67);
check("avco closing", ap.closingValue, 1383.33);
check("avco periodic closing", aper.closingValue, 1344.44);
const cmp = table(["Method", `Closing inventory ${U}`, `Cost of goods sold ${U}`], [
  ["FIFO, perpetual", fp.closingValue, fp.costOfIssues],
  ["FIFO, periodic", fper.closingValue, fper.costOfSales],
  ["AVCO, perpetual", ap.closingValue, ap.costOfIssues],
  ["AVCO, periodic", aper.closingValue, aper.costOfSales],
]);
check("fifo periodic = perpetual", fper.closingValue, fp.closingValue);
check("goods available", fp.closingValue + fp.costOfIssues, 6050);
check("avco goods available", ap.closingValue + ap.costOfIssues, 6050);

// Example 3: count after the year end
const counted = 24600, purchasesAfter = 3200, salesAfter = 5500, markUp = 25;
const costOfSalesAfter = chk(salesAfter / (1 + markUp / 100), 4400);
const closing3 = chk(counted - purchasesAfter + costOfSalesAfter, 25800);
const t3 = statement("Inventory at 31 December 2025", [
  ["Inventory counted on 8 January 2026, at cost", counted],
  ["Less purchases received between 1 and 8 January (at cost)", -purchasesAfter],
  ["Add cost of goods sold between 1 and 8 January (5,500 × 100/125)", costOfSalesAfter],
  ["Inventory at 31 December 2025", closing3],
], { cols: [U], checks: [["inventory", counted - purchasesAfter + costOfSalesAfter, closing3]] });

const body = t`
## Introduction

At the end of each year a shopkeeper in Harare counts the goods on the shelves and asks what they are worth. The answer fixes both the closing inventory in the statement of financial position and the cost of sales in the statement of profit or loss. A US\$1,000 mistake in closing inventory changes profit by US\$1,000, so inventory valuation is a favourite topic in Papers 2 and 3.

You should already know that cost of sales = opening inventory + purchases − closing inventory. This lesson explains the rule that IAS 2 sets for the valuation, then the two cost formulas, first in, first out (FIFO) and weighted average cost (AVCO).

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards use **IAS 2** and both examine **FIFO** and **AVCO** (also called weighted average cost). Cambridge uses **inventory** and **rate of inventory turnover**; ZIMSEC may say **stock** in older papers. LIFO is not examined by either board. Net realisable value is abbreviated NRV.
:::

## Key definitions

:::definition{term="Cost of inventory"}
All costs of buying the goods and bringing them to their present location and condition: the purchase price (less trade discounts), import duties and non-recoverable taxes, carriage inwards and, for goods made by the business, the costs of conversion. Storage, administration and selling costs are not included.
:::

:::definition{term="Net realisable value (NRV)"}
The selling price less any costs that must still be incurred to complete the item and to sell it.
:::

:::definition{term="IAS 2 measurement rule"}
Inventory is valued at the lower of cost and net realisable value, applied item by item (or group by group for similar items).
:::

:::definition{term="FIFO"}
A cost formula that assumes the goods bought first are the first to be sold, so closing inventory is valued at the most recent purchase prices.
:::

:::definition{term="AVCO"}
A cost formula that values issues and closing inventory at the weighted average cost of the goods held.
:::

## Lower of cost and net realisable value

Prudence says that inventory should not be carried at more than it can earn. If goods have been damaged, have become obsolete or can only be sold at a reduced price, their NRV may be below cost. Each item is compared separately: a gain on one item cannot offset a loss on another.

:::worked-solution[Example 1: valuing inventory at the lower of cost and NRV]
Nyasha's grocery wholesaler in Mutare has four items in inventory at the year end.

${t1}

1. NRV = selling price − selling costs. Oil: 5,600 − 300 = 5,300. Maize meal: 6,500 − 250 = 6,250. Soap: 3,150 − 200 = 2,950. Fish: 2,600 − 900 = 1,700.
2. Compare each NRV with cost and use the lower: oil 4,200 (cost), maize meal 6,250 (NRV), soap 2,950 (NRV), fish 1,700 (NRV).
3. ${t1tot}.
4. The write-down of ${money(totCost - totVal)} reduces closing inventory, increases cost of sales and reduces profit by the same amount.
:::

## FIFO and AVCO

When the same item is bought at different prices, a formula is needed to decide which cost is attached to the goods sold and which to the goods left.

- **FIFO** matches the oldest cost with the sales. Closing inventory consists of the latest purchases, so in a period of rising prices it is valued high, cost of sales is low and profit is high.
- **AVCO** uses the average cost. In a **perpetual** system the average is recalculated after every receipt; in a **periodic** system it is calculated once, at the end of the period, from the opening inventory and all purchases.

In a perpetual system the stores record is updated after every transaction, so the cost of each issue is known immediately. In a periodic system only opening inventory, purchases and the closing count are known, so the cost of sales is a balancing figure: opening inventory + purchases − closing inventory.

:::worked-solution[Example 2: one product under four methods]
Chipo sells bags of cement at a depot in Gweru. During March there were 100 bags in inventory at US\$12 each. The movements were:

- 5 March: bought 200 bags at US\$13.
- 12 March: sold 150 bags.
- 20 March: bought 150 bags at US\$15.
- 28 March: sold 200 bags.

**FIFO, perpetual**

${fifoTab}

**AVCO, perpetual** (the average is recalculated after each receipt)

${avTab}

Averages are shown to two decimal places; the working uses the exact average (3,800 ÷ 300 = 12.6667).

**Periodic systems.** Goods available for sale cost 1,200 + 2,600 + 2,250 = 6,050 for 450 bags. FIFO: the 100 bags left are the latest purchases, 100 × 15 = 1,500, so cost of sales is 4,550. AVCO: average cost 6,050 ÷ 450 = US\$13.44 per bag, so closing inventory is 100 × 13.4444 = 1,344.44 and cost of sales is 4,705.56.

**Summary**

${cmp}

FIFO gives the same answer in both systems because the oldest cost is always used first. AVCO gives different answers because the average changes through the period in a perpetual system. Goods available (6,050) are split between closing inventory and cost of goods sold in every case.
:::

## Rising and falling prices

When prices are rising, FIFO gives a higher closing inventory, a lower cost of sales and a higher profit than AVCO; when prices are falling, the reverse is true. Over the whole life of a business the total profit is the same, but the timing differs. Both formulas must be applied consistently, and the choice does not change the cash received or paid.

## Inventory counted after the year end

A physical count is sometimes made after the year-end date. The count value must be adjusted back to the year end: **deduct** purchases received after the year end, **add back** the cost of goods sold since then. Sales are converted to cost using the mark-up or margin given. Returns are adjusted in the opposite direction.

:::worked-solution[Example 3: counting after the year end]
Farai's hardware shop in Masvingo has a year end of 31 December 2025. The inventory was counted on 8 January 2026 and valued at cost at US\$24,600. Between 1 and 8 January the shop received purchases at cost of US\$3,200 and sold goods for US\$5,500. The shop earns a mark-up of 25% on cost.

1. Cost of the goods sold = 5,500 × 100/125 = 4,400.
2. Roll the count back to the year end:

${t3}

3. Closing inventory of 25,800 is used in the 2025 final accounts: it is deducted in cost of sales and shown as a current asset.
:::

## Presentation in the final accounts

Closing inventory is deducted from opening inventory plus purchases to find cost of sales in the statement of profit or loss, and shown at the lower of cost and NRV under current assets. An overstatement of closing inventory overstates gross profit, profit for the year and current assets by the same amount in that year, and understates profit in the next year.

## Common mistakes

:::mistake{title="Netting gains against losses"}
The lower of cost and NRV is applied to each item or group, never to the total of all inventory.
:::

:::mistake{title="Using selling price in the valuation"}
Inventory is not valued above cost, even if it can be sold at a profit. Selling price only matters when NRV is below cost.
:::

:::mistake{title="Averaging all purchase prices in perpetual AVCO"}
After an issue, the remaining units keep the average cost; the new average is recalculated only at the next receipt.
:::

:::mistake{title="Rolling the count the wrong way"}
Purchases after the year end are deducted from the count; goods sold after the year end are added back (at cost).
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2 test IAS 2. When you **calculate**, show the NRV for each item, the lower figure and the total; when you **explain**, link prudence to the reason that inventory is not stated above NRV. In FIFO and AVCO tables, show units and unit cost for each line so that method marks can be given.
:::

:::exam-tip
In **evaluate** or **advise** questions on the choice of formula, use the figures. State that FIFO gives higher profit when prices rise, that AVCO smooths price changes and that the formula must be applied consistently.
:::

## Summary

:::summary
- IAS 2: inventory is valued at the lower of cost and net realisable value, item by item.
- Cost includes the purchase price and the costs of bringing the goods to their location and condition; selling and storage costs are excluded.
- FIFO uses the oldest cost first; AVCO uses the weighted average, recalculated after each receipt in a perpetual system.
- Periodic systems find cost of sales as opening inventory + purchases − closing inventory.
- With rising prices FIFO gives a higher profit than AVCO.
- A count after the year end is rolled back: deduct later purchases, add back the cost of later sales.
:::
`;

writeLesson("valuation/inventory", {
  key: "valuation.inventory",
  title: "Inventory valuation: IAS 2, FIFO and AVCO",
  summary: "Value inventory at the lower of cost and net realisable value, apply FIFO and weighted average cost in perpetual and periodic systems, and adjust a count made after the year end.",
  concepts: ["aacc.valuation.inventory"],
  estimatedMinutes: 50,
}, body);
