// Lesson: manufacturing.profit-unrealised
import { money, fmt, chk, r2 } from "../lib.mjs";
import { writeLesson, U, transfer } from "./w2b-lib.mjs";

const e1 = transfer({ name: "Zambezi Metals", cop: 160000, markupPct: 25, sales: 310000, fgOpen: 36000, fgClose: 45000, expenses: 48500 });
chk(e1.profit, 40000); chk(e1.transferValue, 200000); chk(e1.provOpen, 7200); chk(e1.provClose, 9000); chk(e1.provChange, 1800); chk(e1.cos, 191000); chk(e1.gp, 119000); chk(e1.net, 108700);
const e2 = transfer({ name: "Masvingo Joinery", cop: 90000, markupPct: 20, sales: 168000, fgOpen: 54000, fgClose: 42000, expenses: 26000 });
chk(e2.profit, 18000); chk(e2.transferValue, 108000); chk(e2.provOpen, 9000); chk(e2.provClose, 7000); chk(e2.provChange, -2000); chk(e2.cos, 120000); chk(e2.gp, 48000); chk(e2.net, 48000 + 18000 + 2000 - 26000);

const body = `
## Introduction

Zambezi Metals makes steel gates in a workshop at the back of its Harare premises and sells them from the shop at the front. The owner wonders whether the workshop is efficient: could the gates be bought more cheaply from a supplier? To find out, she transfers the gates from the factory to the shop not at cost, but at the price a supplier would charge, the **market value**. The difference between cost and market value is the **manufacturing profit**. But there is a trap: if gates remain in the shop's inventory at the year end, some of the manufacturing profit has not yet been earned by a sale. A **provision for unrealised profit** removes it.

This topic is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know the manufacturing account and how a provision is created and adjusted.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **factory profit / manufacturing profit**, **provision for unrealised profit**, **income statement**. Cambridge: **manufacturing profit**, **provision for unrealised profit**, **statement of profit or loss**. The method is the same.
:::

## Key definitions

:::definition{term="Transfer price"}
The value at which finished goods are transferred from the factory to the trading account. It may be the cost of production or a market value.
:::

:::definition{term="Manufacturing (factory) profit"}
The difference between the market value at which goods are transferred and their cost of production. It is credited in the statement of profit or loss as a profit of the factory.
:::

:::definition{term="Unrealised profit"}
The part of the manufacturing profit contained in finished goods that have been transferred but not yet sold at the year end.
:::

:::definition{term="Provision for unrealised profit"}
An amount deducted from the closing inventory of finished goods so that it is shown at cost in the statement of financial position, not at the inflated transfer price.
:::

## Why transfer at market value

- The business can **compare** the factory's cost with the price at which the goods could be bought outside. A manufacturing profit means the factory is cheaper than the market; a manufacturing loss means it is dearer.
- The **factory and the shop** can be judged separately: the factory by its manufacturing profit, the shop by its gross profit on goods valued at market price.
- It helps managers decide whether to keep manufacturing or to buy the goods.

If goods are transferred at cost there is no manufacturing profit and no provision.

## The provision for unrealised profit

Finished goods are valued in the trading account at the **transfer price**. At the year end, closing inventory therefore includes manufacturing profit that has not yet been realised through a sale. The profit element is found from the mark-up:

:::keyfact
If goods are transferred at cost plus a mark-up of m% on cost, the profit in inventory valued at transfer price = inventory × m ÷ (100 + m). For a 25% mark-up this is 25/125 = one fifth of the transfer price.
:::

Each year the provision is **adjusted** to the new figure: an **increase** is deducted from profit, a **decrease** is added to profit. Only the change appears in the statement of profit or loss. In the statement of financial position, closing finished goods are shown at transfer price less the provision (that is, at cost).

:::worked-solution[Example 1: the provision increases]
Zambezi Metals' cost of production for the year is ${money(160000)}. Finished goods are transferred to the trading account at cost plus 25%. Sales are ${money(310000)}. Opening finished goods at transfer price ${money(36000)}; closing ${money(45000)}. Other expenses are ${money(48500)}. The opening provision is based on the same mark-up.

1. Manufacturing profit: 160,000 × 25% = 40,000. Transfer value 200,000.
2. Cost of sales: 36,000 + 200,000 − 45,000 = 191,000. Gross profit 310,000 − 191,000 = 119,000.
3. Provision at the end: 45,000 × 25/125 = 9,000. At the start: 36,000 × 25/125 = 7,200. Increase 1,800.
4. Profit for the year: 119,000 + 40,000 − 1,800 − 48,500 = 108,700.

${e1.mfgMd}

${e1.tradMd}

${e1.provMd}

${e1.plMd}

In the statement of financial position, inventory of finished goods is shown as 45,000 − 9,000 = 36,000, which is its cost.
:::

:::worked-solution[Example 2: the provision decreases]
Masvingo Joinery's cost of production is ${money(90000)}, transferred at cost plus 20% (market value). Sales ${money(168000)}; opening finished goods ${money(54000)}; closing ${money(42000)}; other expenses ${money(26000)}.

1. Manufacturing profit: 90,000 × 20% = 18,000. Transfer value 108,000.
2. Cost of sales: 54,000 + 108,000 − 42,000 = 120,000. Gross profit 48,000.
3. Provision: opening 54,000 × 20/120 = 9,000; closing 42,000 × 20/120 = 7,000. The provision **decreases** by 2,000, which is added to profit.
4. Profit for the year: 48,000 + 18,000 + 2,000 − 26,000 = 42,000.

${e2.mfgMd}

${e2.provMd}

${e2.plMd}

Closing finished goods in the statement of financial position: 42,000 − 7,000 = 35,000 (cost).
:::

## Reading the result

A manufacturing profit tells the owner that the factory produces goods at less than the market price. It is **not** extra cash: until the goods are sold, it exists only in the figures. The provision stops the business from counting profit it has not earned. Over the life of the business the total profit is the same however the goods are transferred; the method only changes how it is split between the factory and the shop and when it is recognised.

## Common mistakes

:::mistake{title="Calculating the provision on the cost of production"}
The provision is based on the **closing inventory at transfer price**, using m ÷ (100 + m), not on the cost of production.
:::

:::mistake{title="Charging the whole provision each year"}
Only the **change** in the provision is charged (increase) or added (decrease) in the statement of profit or loss.
:::

:::mistake{title="Using the mark-up fraction as m ÷ 100"}
The profit in an inventory valued at cost plus 25% is 25/125, not 25/100, because the inventory value already includes the profit.
:::

:::mistake{title="Showing closing inventory at transfer price in the statement of financial position"}
Inventory is valued at cost. Deduct the provision from the transfer-price figure.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic with a manufacturing account. With **prepare**, show the manufacturing profit in the manufacturing account and add it in the statement of profit or loss, with the provision adjustment on its own line. With **calculate**, show the fraction (m ÷ (100 + m)) and the opening and closing provisions. With **explain**, say that an unrealised profit is one not yet made through a sale, and that prudence requires it to be removed.
:::

## Summary

:::summary
- Goods may be transferred to the trading account at cost or at market value (cost plus a mark-up).
- Manufacturing profit = transfer value − cost of production; it is added in the statement of profit or loss.
- Closing finished goods at transfer price contain unrealised profit = inventory × m ÷ (100 + m).
- Only the change in the provision is shown: an increase reduces profit, a decrease adds to profit.
- In the statement of financial position finished goods are shown at transfer price less the provision, which is cost.
- The method lets the owner compare the factory's cost with the market price.
:::
`;

writeLesson("manufacturing/profit-unrealised", {
  key: "manufacturing.profit-unrealised",
  title: "Manufacturing profit and the provision for unrealised profit",
  summary: "Transfer finished goods at market value, calculate the manufacturing profit and adjust the provision for unrealised profit in closing inventory of finished goods.",
  concepts: ["aacc.manufacturing.profit-unrealised"],
  estimatedMinutes: 45,
}, body);
