---
{
  "key": "operations.inventory-control",
  "title": "Inventory (stock) management and inventory control charts",
  "summary": "Why businesses hold inventory, the costs and benefits of holding it, buffer inventory, re-order level, re-order quantity and lead time, reading and calculating from inventory control charts, supply chain management and the factors that set the level of stock held.",
  "concepts": ["abus.operations.inventory-control"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Chipo owns a fictional hardware shop in Chinhoyi. When her cement runs out, builders go to a rival and may not come back. When she orders too much, cement bags absorb moisture, tie up her cash and take space she needs for paint. The skill is to hold **enough** stock and no more. Inventory management is the planning and control of the stock of materials, parts, work in progress and finished goods so that production and sales are never held up and money is not wasted.

This lesson serves ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and Cambridge **AS** (Papers 1 and 2). It also uses the idea of cash tied up in stock. Just-in-time and the economic order quantity are covered in the next lesson. You should be able to multiply and subtract simple quantities.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Stock; stock control; stock control chart; buffer stock | Inventory; inventory control; inventory control chart; buffer inventory |

Both boards use the same chart. Cambridge also expects the importance of supply chain management.
:::

## Key definitions

:::definition{term="Inventory (stock)"}
The materials, work in progress and finished goods that a business holds to support production and sales.
:::

:::definition{term="Buffer inventory"}
The minimum quantity of stock held as a safety margin to avoid running out if demand rises or a delivery is late.
:::

:::definition{term="Re-order level"}
The quantity of stock at which a new order is placed with the supplier.
:::

:::definition{term="Lead time"}
The time between placing an order and receiving the goods.
:::

:::keyfact
**Re-order level = (usage per day × lead time in days) + buffer stock.** **Maximum stock level = buffer stock + re-order quantity** (steady usage, delivery arriving as stock reaches the buffer).
:::

## Types of inventory

| Type | Meaning | Example: a bakery |
| --- | --- | --- |
| Raw materials and components | Inputs waiting to be used | Flour, yeast |
| Work in progress | Partly finished goods | Dough being proved |
| Finished goods | Completed goods waiting to be sold | Baked loaves |

## Costs and benefits of holding inventory

| Benefits | Costs |
| --- | --- |
| Production and sales are not interrupted | Cash is tied up, so it cannot be used elsewhere |
| Bulk buying may give discounts | Storage space, insurance, security and handling costs |
| Meets sudden rises in demand | Stock may be damaged, stolen, go out of date or become obsolete |
| Protects against late deliveries and price rises | Opportunity cost of the money (interest lost or paid) |

**Factors that determine the level of stock held**: the speed and reliability of delivery; the rate of use or sales; the shelf life of the goods; the cost and space of storage; the cost of running out (lost sales, stopped production); the price discounts for bulk orders; the firm's cash; and expected changes in demand or prices.

## The inventory control chart

A chart (described here as a table) shows stock over time. It has four main features: the **maximum stock level**; the **re-order level**, where an order is placed; the **buffer stock**, the lowest level that stock should reach; and the **lead time**, shown as the time that stock takes to fall between the re-order level and the buffer while waiting for delivery. The line falls steadily as stock is used and jumps up by the re-order quantity when the delivery arrives.

## Supply chain management

The supply chain links suppliers, producers, transport and retailers. Managing it well means choosing reliable suppliers, sharing information on demand, agreeing delivery times and keeping the flow of goods smooth. **Importance**: lower inventory costs; fewer stock-outs; shorter lead times; better quality; and a more reliable service to customers. Weak links, such as a late supplier or poor roads, can stop the whole chain.

:::worked-solution[Example 1: an inventory control chart]
**Context.** Chipo's shop sells 30 bags of cement a day. The supplier takes 4 days to deliver. She keeps a buffer stock of 60 bags and orders 300 bags at a time.

1. Re-order level = (30 × 4) + 60 = 120 + 60 = **180 bags**.
2. Maximum stock = buffer + order quantity = 60 + 300 = **360 bags**.
3. Starting from 360, stock falls by 30 a day, so it reaches 180 after (360 − 180) ÷ 30 = 6 days. She orders then. During the 4 days of lead time, 120 bags are sold, leaving 60 (the buffer) when the delivery arrives.

| Day | Stock at the start of the day (bags) | Event |
| --- | ---: | --- |
| Day 0 | 360 | Maximum stock |
| Day 3 | 270 | |
| Day 6 | 180 | Stock reaches 180: order placed |
| Day 8 | 120 | |
| Day 9 | 90 | |
| Day 10 | 360 | Stock had fallen to 60 (the buffer); the delivery of 300 bags arrives |
| Day 12 | 300 | |

4. **Interpretation.** If the supplier is late by two days, Chipo uses 60 of the buffer and has none left. If demand rises, the buffer is used up sooner. The buffer is the shop's insurance.
:::

![Inventory control chart for Chipo's cement: stock falls 30 bags a day from the maximum of 360, reaches the re-order level of 180 on day 6 when the order is placed, and falls to the buffer of 60 bags when the delivery of 300 bags arrives after the 4-day lead time on day 10, lifting stock back to 360.](media:diagrams/inventory-control-chart.png "Figure: the inventory control chart for cement (usage 30 a day, lead time 4 days, buffer 60, order 300)")

:::worked-solution[Example 2: case analysis, how large should the buffer be?]
**Context.** The shop pays US\$9 a bag. The average stock is (maximum + buffer) ÷ 2 = (360 + 60) ÷ 2 = 210 bags, worth 210 × 9 = US\$1,890. Holding costs (cash tied up, storage, damage) are estimated at 12% of the value of the average stock a year, which is US\$226.80. Chipo is thinking of raising the buffer by 30 bags. Last year, the shop ran out of cement on 5 days. On each of those days, 30 bags (the normal daily sales) would have been sold at a contribution of US\$2.50 a bag.

**Point.** A larger buffer protects sales but increases holding cost.

**Application.** Raising the buffer by 30 bags raises average stock by 30 bags, costing 30 × 9 × 12% = US\$32.40 a year more. Lost contribution from the five days was 30 × 5 × 2.50 = US\$375.

**Analysis.** The extra holding cost of US\$32.40 is far less than the US\$375 contribution that was lost. A larger buffer would also keep builders loyal, who might otherwise have used rival shops. However, the 12% figure is an estimate, and the cement bags can harden if kept too long in damp conditions.

**Judgement.** Chipo should raise her buffer, provided her store is dry and cash is available, because the cost is small compared with the lost sales. She should review the stock-outs after a season.
:::

## Common mistakes

:::mistake{title="Forgetting the buffer in the re-order level"}
Re-order level = usage during lead time **plus** buffer. Using only the usage in lead time leaves no safety margin, so any delay causes a stock-out.
:::

:::mistake{title="Saying that more stock is always better"}
Stock costs money and space and may spoil or become obsolete. The best level balances the risk of running out against the cost of holding stock.
:::

:::mistake{title="Mixing up lead time and re-order quantity"}
Lead time is the **time** from ordering to delivery; the re-order quantity is the **amount** ordered.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies and Business Enterprise Skills Papers 1 and 2 ask you to *state* the importance of stock, *calculate* levels from a table or chart and *discuss* the problems of holding too much or too little. Cambridge Papers 1 and 2 use *define*, *calculate*, *explain*, *analyse* and *assess*, often with a chart described in a table. Show each formula and substitute the numbers. For evaluation, compare the cost of holding stock with the cost of running out, and base your judgement on a condition such as the reliability of the supplier or the shelf life of the goods.
:::

## Summary

:::summary
- Inventory comprises raw materials, work in progress and finished goods; holding it avoids stoppages but costs money and space.
- Buffer stock is the minimum safety stock; lead time is the time from ordering to delivery.
- Re-order level = usage per day × lead time + buffer; maximum stock = buffer + re-order quantity in the simple model.
- The right level depends on delivery reliability, rate of use, shelf life, storage cost and the cost of running out.
- Good supply chain management lowers cost and stock-outs and shortens lead times.
:::
