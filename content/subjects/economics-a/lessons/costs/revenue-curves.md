---
{
  "key": "costs.revenue-curves",
  "title": "Revenue and the profit-maximising output",
  "summary": "Calculate total, average and marginal revenue for a price-taker and for a firm facing a downward-sloping demand curve, and find the profit-maximising output where marginal cost equals marginal revenue with marginal cost rising.",
  "concepts": ["aecon.costs.revenue-curves"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A farmer selling tomatoes at Mbare market in Harare takes the going price: if she asks more than her neighbours, buyers walk away. A company that is the only seller of a product in a town has more freedom: if it wants to sell more it must lower its price, and the lower price applies to every unit, not only the extra ones. These two situations give very different revenue curves, and the revenue curves together with the cost curves decide how much a firm should produce. In this lesson you find the output that gives the largest profit.

You should already know the short-run cost curves, in particular marginal cost. Revenue is simply price times quantity. All figures are illustrative.

## Key definitions

:::definition{term="Total revenue (TR)"}
The total receipts from sales: price multiplied by quantity sold.
:::

:::definition{term="Average revenue (AR)"}
Revenue per unit sold: $\text{TR} \div Q$. Because all units are sold at one price, AR equals price, so the AR curve is the firm's demand curve.
:::

:::definition{term="Marginal revenue (MR)"}
The addition to total revenue from selling one more unit: $\Delta \text{TR} \div \Delta Q$.
:::

## Revenue for a firm with a downward-sloping demand curve

A firm with some control over price must lower the price to sell more. Here is the demand for a fictional firm (price per unit, quantity per day).

| Quantity (units) | Price (US\$) | TR (US\$) | AR (US\$) | MR (US\$) |
| --- | ---: | ---: | ---: | ---: |
| 0 | 20 | 0 | – | – |
| 1 | 18 | 18 | 18 | 18 |
| 2 | 16 | 32 | 16 | 14 |
| 3 | 14 | 42 | 14 | 10 |
| 4 | 12 | 48 | 12 | 6 |
| 5 | 10 | 50 | 10 | 2 |
| 6 | 8 | 48 | 8 | −2 |
| 7 | 6 | 42 | 6 | −6 |

:::worked-solution{title="Marginal revenue below average revenue"}
1. Selling 3 units at US\$14 gives $\text{TR} = 42$. Selling 4 units at US\$12 gives $\text{TR} = 48$.
2. $\text{MR} = (48 - 42) \div 1 = 6$, which is below the new price of 12.
3. Reason: the fourth unit sells for US\$12, but to sell it the firm has to lower the price on the first three units by US\$2 each (a loss of US\$6). MR $= 12 - 6 = 6$.
:::

Three points follow. First, MR is below AR whenever the demand curve slopes downward. Second, TR rises as long as MR is positive and **falls once MR is negative**, so TR is at its maximum where MR is zero (in the table, between 5 and 6 units). Third, with a straight-line demand curve the MR curve is also a straight line, starting at the same price intercept and falling twice as steeply, so it cuts the quantity axis at half the quantity at which the demand curve does. The link between MR and elasticity is that MR is positive where demand is elastic, zero where it is unit elastic and negative where it is inelastic.

## Revenue for a price-taker

A price-taker is a firm so small that it cannot influence the market price. It can sell any quantity at the market price, so the demand curve it faces is horizontal at that price. Each extra unit adds the same amount to revenue.

:::worked-solution{title="Revenue for a price-taker"}
A fictional farmer sells tomatoes at US\$6 per crate whatever she sells.

1. $\text{TR}$ for 4 crates $= 4 \times 6 = 24$; for 5 crates $= 30$.
2. $\text{AR} = 24 \div 4 = 6 = \text{price}$.
3. $\text{MR} = 30 - 24 = 6$. For a price-taker, price = AR = MR = demand.
:::

## The profit-maximising output

A firm maximises profit by producing the output at which marginal cost equals marginal revenue, provided that MC is rising (cutting MR from below). The logic:

1. If MR is greater than MC, the next unit adds more to revenue than to cost, so profit rises: produce more.
2. If MC is greater than MR, the last unit added more to cost than to revenue, so profit falls: produce less.
3. Profit is largest at the point where the two are equal, with MC rising.

The same firm now has a cost schedule (fixed cost US\$10). The table shows revenue from the earlier demand schedule, cost and profit.

| Output (units) | Price (US\$) | TR (US\$) | TC (US\$) | MR (US\$) | MC (US\$) | Profit (US\$) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 20 | 0 | 10 | – | – | −10 |
| 1 | 18 | 18 | 18 | 18.00 | 8.00 | 0 |
| 2 | 16 | 32 | 24 | 14.00 | 6.00 | 8 |
| 3 | 14 | 42 | 28 | 10.00 | 4.00 | 14 |
| 4 | 12 | 48 | 33 | 6.00 | 5.00 | 15 |
| 5 | 10 | 50 | 40 | 2.00 | 7.00 | 10 |
| 6 | 8 | 48 | 50 | −2.00 | 10.00 | −2 |
| 7 | 6 | 42 | 64 | −6.00 | 14.00 | −22 |
| 8 | 4 | 32 | 82 | −10.00 | 18.00 | −50 |

:::worked-solution{title="Finding the profit-maximising output"}
1. At 3 units MR (10) is above MC (4): profit rises if output rises. At 4 units MR (6) is still above MC (5), so the fourth unit adds a profit of US\$1.
2. At 5 units MR (2) is below MC (7): the fifth unit lowers profit by US\$5.
3. Profit is maximised at **4 units**, where profit $= 48 - 33 =$ US\$15 and the price is US\$12.
4. The check by totals gives the same answer: profit is 14 at 3 units, 15 at 4 units and 10 at 5 units.
:::

In a discrete table MC and MR are rarely exactly equal, so the rule is to produce every unit for which MR is at least MC and stop when MC exceeds MR. The rule "MC = MR" is the continuous version.

:::worked-solution{title="A price-taker with the same costs"}
The farmer who sells at US\$6 has the same cost schedule, with MR = 6 at every output.

1. MC is 8, 6, 4, 5, 7 for units 1 to 5. MC equals MR at 2 units, but MC is **falling** there (it then falls to 4), so this is not the maximum.
2. On the rising part of MC, the fourth unit (MC 5) is below MR and is worth producing; the fifth unit (MC 7) is above MR and is not. The output is 4 units.
3. Profit at 4 units $= 24 - 33 = -9$: the firm makes a loss, but a smaller one than at any other output (−10 at 0, 3 or 5 units, −12 at 1 or 2 units).
:::

This second example shows why the condition includes "MC rising". It also leads into the next lesson: whether a loss-maker should keep producing depends on average costs.

## Applying demand and supply analysis to the firm

A rise in demand for the firm's product shifts its AR curve to the right and raises MR, so the profit-maximising output rises. A rise in wage costs shifts MC upward, so profit-maximising output falls. A rise in a fixed cost shifts no marginal curve, so the best output is unchanged although profit is lower.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect TR, AR and MR calculations from schedules, the shape of the revenue curves under price-taking and downward-sloping demand, and profit maximisation at MC = MR. Cambridge answers should show that MC cuts MR from below and may link MR to elasticity; ZIMSEC answers should read the output from a table and may ask for diagrams to be described.
:::

## Common mistakes

:::mistake{title="Using price instead of MR"}
Except for a price-taker, price is above MR. A firm with downward-sloping demand must compare MC with MR, not with price.
:::

:::mistake{title="Choosing the output of maximum revenue"}
Maximum revenue (MR = 0) is generally at a larger output than maximum profit, because the firm must also pay marginal cost.
:::

:::mistake{title="Ignoring the condition on MC"}
MC = MR is necessary but not sufficient; MC must cut MR from below, otherwise the point may be a minimum of profit.
:::

## Exam tips

:::exam-tip{title="Where tested"}
ZIMSEC Paper 1 asks for TR, AR or MR; Paper 2 gives a cost and revenue table and asks for the profit-maximising output; Paper 3 asks for an explanation of the rule. Cambridge Paper 3 contains MR/MC calculations and Paper 4 uses the profit-maximising output in data response.
:::

:::exam-tip{title="Command words"}
*Calculate MR*: change in TR over change in output. *Explain*: say why producing where MR > MC adds profit and where MC > MR lowers it. *Analyse*: show how a shift in demand or cost changes the output. Always state the output and the profit it gives.
:::

## Summary

:::summary
- TR = P × Q; AR = TR ÷ Q = price; MR = change in TR from one more unit.
- A price-taker faces a horizontal demand curve: P = AR = MR.
- With downward-sloping demand MR is below AR; TR is greatest where MR = 0.
- Profit is maximised where MC = MR with MC rising (produce while MR is at least MC).
- A rise in a fixed cost does not change the best output; a rise in a marginal cost lowers it.
:::
