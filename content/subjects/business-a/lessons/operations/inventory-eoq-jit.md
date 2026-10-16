---
{
  "key": "operations.inventory-eoq-jit",
  "title": "Just-in-time, just-in-case and the economic order quantity",
  "summary": "The purpose and impact of just-in-time (JIT) and just-in-case (JIC) inventory management, and the economic order quantity (EOQ, ZIMSEC): the formula, ordering and holding costs, total cost at different order sizes, assumptions and limitations.",
  "concepts": ["abus.operations.inventory-eoq-jit"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A fictional furniture assembler in Bulawayo buys wooden panels from a supplier in Harare. If it orders panels in huge batches it pays little for delivery, but it needs a large store, cash is tied up and some panels warp. If it orders small amounts every day, stock is low but delivery costs and the risk of a late lorry rise. Between these extremes is a policy that fits the business. **Just-in-time (JIT)** keeps stock to a minimum by receiving materials only when needed. **Just-in-case (JIC)** keeps large stocks as insurance. The **economic order quantity (EOQ)** is a ZIMSEC method of finding the order size with the lowest total cost.

This lesson serves ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and Cambridge **AS** (Papers 1 and 2). EOQ is ZIMSEC only; Cambridge examines JIT and JIC but not EOQ. You should know the inventory control chart and the idea of fixed and variable costs.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Economic order quantity (EOQ); stock control; just-in-time | Just-in-time (JIT) and just-in-case (JIC) inventory management; EOQ is not examined |

EOQ: ZIMSEC only. JIT and JIC: both boards. Lean production more widely is a separate A Level lesson.
:::

## Key definitions

:::definition{term="Just-in-time (JIT)"}
An approach in which materials and parts are delivered to production only as they are needed, so that very little stock is held.
:::

:::definition{term="Just-in-case (JIC)"}
An approach in which a business holds large stocks as a safeguard against late deliveries, rising demand or price rises.
:::

:::definition{term="Economic order quantity (EOQ)"}
The order size that gives the lowest total yearly cost of ordering and holding inventory, ZIMSEC detail.
:::

:::keyfact
**EOQ = √(2DS ÷ H)** where D is the yearly demand in units, S the cost of placing one order and H the cost of holding one unit in stock for a year. At the EOQ, yearly ordering cost equals yearly holding cost. **Total yearly cost = (D ÷ Q) × S + (Q ÷ 2) × H** for an order size Q. EOQ: ZIMSEC only.
:::

## Just-in-time and just-in-case

| | JIT | JIC |
| --- | --- | --- |
| Stock held | Very low | High |
| Benefits | Lower storage and holding costs; less cash tied up; less waste and damage; space freed; quick response to changes in design | Protects against late delivery and stock-outs; meets sudden demand; bulk discounts |
| Costs and risks | Production stops if a supplier is late; frequent small orders may raise delivery cost; needs very reliable suppliers and accurate forecasts; less buffer for sudden demand | Cash tied up; storage, insurance and security; damage and obsolescence |
| Suited to | Predictable demand, reliable suppliers close by, products with short shelf life | Unreliable supply, uncertain demand, goods whose prices are rising |

**Impact of adopting JIT.** Costs fall (storage, waste, financing), flexibility improves, and working capital is released. But the business becomes dependent on suppliers, who need to be reliable and close; one late delivery can stop production; there may be extra delivery costs; and workers need to be flexible. The changeover demands planning and trust with suppliers.

## The economic order quantity (ZIMSEC detail)

Every order has a cost (administration, transport, checking), so ordering often is expensive. Holding stock also costs money, so ordering large amounts is expensive too. EOQ finds the balance.

- **Ordering cost per year** = (D ÷ Q) × S: falls as Q rises.
- **Holding cost per year** = (Q ÷ 2) × H: rises as Q rises, because average stock is half the order size.
- **Total cost** is lowest where the two are equal, at Q = √(2DS ÷ H).

**Assumptions and limitations.** The model assumes constant demand, a fixed ordering cost, a constant holding cost per unit, no discounts for bulk buying, and no delay in delivery, which is rarely true in practice. It also ignores the cost of running out, shelf life and changes in price. The EOQ is a guide, and a manager may adjust it for discounts, space or the reliability of supply.

:::worked-solution[Example 1: finding the EOQ]
**Context.** A fictional hardware wholesaler in Mutare sells 4,000 units of an item a year. Each order costs US\$50 to place and each unit costs US\$2.50 a year to hold.

1. EOQ = √(2 × 4,000 × 50 ÷ 2.50) = √(400,000 ÷ 2.50) = √160,000 = **400 units**.
2. Orders a year = 4,000 ÷ 400 = 10. Ordering cost = 10 × 50 = US\$500. Holding cost = (400 ÷ 2) × 2.50 = US\$500. The two are equal at the EOQ.

| Order size (units) | Orders a year | Ordering cost (US\$) | Holding cost (US\$) | Total cost (US\$) |
| ---: | ---: | ---: | ---: | ---: |
| 200 | 20 | 1,000 | 250 | 1,250 |
| 300 | 13.33 | 666.67 | 375 | 1,041.67 |
| 400 | 10 | 500 | 500 | 1,000 |
| 500 | 8 | 400 | 625 | 1,025 |
| 800 | 5 | 250 | 1,000 | 1,250 |

3. The lowest total cost, US\$1,000, is at 400 units. Ordering 200 units at a time costs US\$250 more a year.
4. **Interpretation.** The total cost is fairly flat near the EOQ: ordering 500 units costs only US\$25 more. If a supplier gave a discount for orders of 500, the saving might outweigh the US\$25, so the manager should not follow the formula blindly.
:::

:::worked-solution[Example 2: case analysis, should the assembler adopt JIT?]
**Context.** The furniture assembler holds an average stock worth US\$40,000, with holding costs of 10% of stock value a year. Under JIT, the average stock would be US\$8,000, but deliveries would be more frequent, adding US\$1,500 a year in transport. A stoppage caused by a late delivery would cost two days of contribution, at US\$1,200 a day.

**Point.** JIT saves money but exposes the business to supply risk.

**Application.** Holding cost now = 10% × 40,000 = US\$4,000. Under JIT = 10% × 8,000 = US\$800. Saving = US\$3,200. After the extra delivery costs of US\$1,500, the net saving is US\$1,700 a year. One two-day stoppage would cost 2 × 1,200 = US\$2,400.

**Analysis.** A single stoppage would more than cancel a year's net saving. JIT is only attractive if the supplier is dependable. JIT would also release US\$32,000 of cash (40,000 − 8,000) and free space, which could be put to other uses such as new machinery, a benefit not counted in the US\$1,700.

**Judgement.** The assembler should adopt JIT for materials with reliable local suppliers but keep a buffer of the panels from the single Harare supplier whose lorries are sometimes late. The decision depends on how often late deliveries occur: JIT still pays if such a stoppage happens less often than once in 2,400 ÷ 1,700 = 1.4 years.
:::

## Common mistakes

:::mistake{title="Using full order size for holding cost"}
Average stock is **half** the order size (Q ÷ 2), because stock falls from Q to zero between orders. Holding cost = (Q ÷ 2) × H.
:::

:::mistake{title="Treating JIT as having no costs"}
JIT saves holding costs but needs reliable suppliers; a late delivery stops production. Weigh the saving against the risk.
:::

:::mistake{title="Treating EOQ as an exact answer"}
EOQ assumes steady demand, no discounts and reliable delivery. It is a guide, and the total cost is flat near the minimum.
:::

## Exam tips

:::exam-tip
Cambridge Papers 1 and 2 test JIT and JIC (*define*, *explain*, *analyse*, *assess*) but do not set EOQ. ZIMSEC Business Studies and Business Enterprise Skills Papers 1 and 2 ask you to *state* the formula, *calculate* the EOQ and total cost, and *discuss* the limitations or the choice between JIT and JIC. Write the formula first, substitute the numbers and show the units. For an evaluation of JIT, weigh lower holding cost against the risk to production and base your judgement on the reliability of suppliers.
:::

## Summary

:::summary
- JIT keeps stock to a minimum by delivering only when needed; JIC holds large stocks as a safeguard.
- JIT lowers holding costs and releases cash but depends on reliable suppliers; one late delivery can stop production.
- EOQ (ZIMSEC only) = √(2DS ÷ H); it is the order size that minimises total ordering and holding costs.
- Ordering cost falls with larger orders, holding cost rises; at the EOQ they are equal.
- EOQ assumes steady demand, fixed costs, no discounts and no delivery delays, so it is a guide only.
:::
