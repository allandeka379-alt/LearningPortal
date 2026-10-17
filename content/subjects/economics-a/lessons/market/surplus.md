---
{
  "key": "market.surplus",
  "title": "Consumer surplus and producer surplus",
  "summary": "Define consumer and producer surplus, measure them as areas on linear demand and supply curves, and show how changes in price, costs, taxes, subsidies and price controls alter them.",
  "concepts": ["aecon.market.surplus"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When you buy a bag of maize meal at US\$7 that you would have been willing to buy at US\$12, you gain US\$5 that never appears in a till. The seller who would have accepted US\$2 but receives US\$7 gains too. These gains are invisible in the price, yet they are what trade is for. **Consumer surplus** and **producer surplus** measure them, and they give economists a way to judge who gains and loses when the price changes, a tax is imposed or a price is controlled.

You should be able to read demand and supply curves and compute the area of a triangle ($\tfrac{1}{2} \times \text{base} \times \text{height}$). The demand curve shows the maximum price consumers are willing to pay for each unit; the supply curve shows the minimum price producers will accept.

## Key definitions

:::definition{term="Consumer surplus"}
The difference between the price consumers are willing to pay for a good and the price they actually pay. On a diagram it is the area below the demand curve and above the price line, up to the quantity bought.
:::

:::definition{term="Producer surplus"}
The difference between the price producers receive for a good and the minimum price they would be willing to accept. On a diagram it is the area above the supply curve and below the price line, up to the quantity sold.
:::

:::keyfact{title="Total surplus and welfare"}
Total (economic) surplus = consumer surplus + producer surplus. In a competitive market at equilibrium, the total surplus is at its maximum. A reduction in total surplus caused by a quantity other than the equilibrium quantity is called a **deadweight loss** (or welfare loss).
:::

## Measuring the areas

Take a fictional market with demand $P = 12 - 0.05Q$ and supply $P = 2 + 0.05Q$, where $P$ is in US\$ and $Q$ in units per week.

![Equilibrium at US\$7 and 100 units with demand P = 12 - 0.05Q and supply P = 2 + 0.05Q: consumer surplus is the triangle between demand and the price line, half of 5 times 100 = 250; producer surplus is the triangle between price line and supply, 250; total surplus 500.](media:diagrams/surplus-equilibrium.png "Figure: consumer surplus (blue) lies below demand and above the price; producer surplus (amber) lies above supply and below the price")

:::worked-solution{title="Surplus at equilibrium"}
1. Equilibrium: $12 - 0.05Q = 2 + 0.05Q$, so $10 = 0.1Q$, $Q = 100$ and $P = 7$.
2. The demand curve meets the price axis at US\$12 (the highest price anyone would pay).
3. Consumer surplus $= \tfrac{1}{2} \times (12 - 7) \times 100 = 250$.
4. The supply curve meets the price axis at US\$2 (the lowest price any seller would accept).
5. Producer surplus $= \tfrac{1}{2} \times (7 - 2) \times 100 = 250$.
6. Total surplus $= 500$.
:::

The demand curve slopes downward because the first units are valued most; the surplus on the first unit is US\$5, and on the 100th unit it is zero.

## What changes the surpluses?

**A rise in price caused by a cost increase.** Suppose costs rise and supply becomes $P = 4 + 0.05Q$. The new equilibrium is $Q = 80$, $P = 8$. Consumer surplus falls to $\tfrac{1}{2} \times (12 - 8) \times 80 = 160$ and producer surplus falls to $\tfrac{1}{2} \times (8 - 4) \times 80 = 160$. Both fall: higher costs hurt buyers and sellers.

**An increase in demand** (for example, higher incomes) raises the equilibrium price and quantity. With demand $P = 14 - 0.05Q$ the equilibrium is $Q = 120$ and $P = 8$: consumer surplus $= \tfrac{1}{2} \times (14 - 8) \times 120 = 360$ and producer surplus $= \tfrac{1}{2} \times (8 - 2) \times 120 = 360$. Both rise.

**The role of elasticity.** For the same price rise, consumers lose more surplus when demand is inelastic: they pay the higher price on units they were not willing to give up. Producers gain more from a price rise, or lose more from a price fall, when supply is inelastic. Steeper curves mean larger surplus changes for a given price change.

## A maximum price

:::worked-solution{title="Effect of a price ceiling on surplus"}
In the same market a government imposes a maximum price of US\$5.

1. At US\$5, $Q_d = (12 - 5) \div 0.05 = 140$ and $Q_s = (5 - 2) \div 0.05 = 60$. A shortage of 80 units.
2. Only 60 units are supplied, so the quantity traded is 60.
3. Demand at 60 units: $12 - 0.05 \times 60 = 9$. Consumer surplus, assuming the units go to those who value them most, $= (9 - 5) \times 60 + \tfrac{1}{2} \times (12 - 9) \times 60 = 240 + 90 = 330$.
4. Producer surplus $= \tfrac{1}{2} \times (5 - 2) \times 60 = 90$.
5. Total surplus $= 330 + 90 = 420$, compared with 500: a **deadweight loss** of $\tfrac{1}{2} \times (9 - 5) \times (100 - 60) = 80$.
6. Consumers who obtain the good gain (330 against 250) but producers lose heavily (90 against 250).
:::

Several caveats apply. The calculation assumes the 60 units go to the consumers who value them most; if they are allocated by queues or by chance, the consumer surplus will be lower. The units missing (40 units) would have given a gain to buyers and sellers that is lost altogether. Other effects, such as black markets, are beyond this calculation.

![A maximum price of US\$5 on the same market: only 60 units are supplied while 140 are demanded (a shortage of 80); consumer surplus 330 plus producer surplus 90 totals 420 instead of 500, so the triangle of deadweight loss between 60 and 100 units is 80.](media:diagrams/surplus-price-ceiling.png "Figure: a maximum price of US\$5 cuts trade to 60 units and creates a deadweight loss of 80 (red triangle)")

## Taxes, subsidies and efficiency

An indirect tax raises the price consumers pay and lowers the price producers receive. Both surpluses fall; part of the loss becomes tax revenue for the government (a transfer) and the remainder is deadweight loss, because some mutually beneficial trades no longer take place. A subsidy raises both surpluses but costs the government more than the gain, so it creates a welfare loss unless it corrects a market failure. These cases are developed in the lesson on indirect taxes and subsidies.

## Why surplus matters and its limits

**Uses.** Surplus allows economists to compare policies: a policy that raises total surplus is efficient in this sense. It explains why voluntary trade benefits both parties, why price controls and taxes impose costs, and why monopolies reduce welfare.

**Limits.**

1. The measurement assumes demand curves show true willingness to pay, which depends on income: richer consumers have a higher willingness to pay than poorer consumers with the same need.
2. It ignores who gains: a transfer from rich to poor may raise welfare in practice even if total surplus is unchanged.
3. It ignores external costs and benefits, so a market equilibrium that maximises surplus may still be inefficient for society.
4. Real demand and supply curves are not exactly straight lines, so triangles are approximations.

:::example{title="Evaluating a statement"}
"The government should remove the maximum price on bread because it reduces total surplus." An evaluation would agree that surplus falls (deadweight loss) and shortages occur, but note that consumers who can buy bread gain and that poor households may value cheap bread highly; it would ask whether alternatives such as targeted subsidies or income support could protect low-income households at lower cost. Whether to remove the control depends on the weight given to efficiency and to fairness.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect you to define the two surpluses, identify them on a described diagram and explain how a change in price changes them. Calculation of areas on linear curves is a sensible extension and may appear in data-response parts; Cambridge Paper 2 asks you to apply surplus to a policy.
:::

## Common mistakes

:::mistake{title="Using the whole triangle in the wrong place"}
Consumer surplus is the area between the demand curve and the price line, not the area under the whole demand curve.
:::

:::mistake{title="Forgetting to halve"}
The area of a triangle is half base times height. Base times height gives twice the right answer.
:::

:::mistake{title="Assuming a price cut for consumers is always a gain"}
A maximum price lowers the price but reduces the quantity traded; some consumers cannot buy at all.
:::

:::mistake{title="Calling tax revenue a deadweight loss"}
Revenue is a transfer to the government; only the lost trades are deadweight loss.
:::

## Exam tips

:::exam-tip{title="Where tested"}
ZIMSEC Paper 1 asks definitions and effects of a price change; Paper 2 includes surplus on a table or described diagram. Cambridge Papers 1 and 2 test identification of surplus and explanations of how it changes, sometimes with a calculation from given figures.
:::

:::exam-tip{title="Command words"}
*Define*: state the difference between willingness to pay and price paid (consumers) or between price received and minimum acceptable price (producers). *Explain*: identify the area before and after and say why it changed. *Assess*: weigh the efficiency loss against distributional effects.
:::

## Summary

:::summary
- Consumer surplus is willingness to pay minus the price paid; producer surplus is the price received minus the minimum price acceptable.
- On linear curves each is a triangle with area half base times height; at equilibrium total surplus is largest.
- A price rise from higher costs lowers both surpluses; a rise in demand raises both.
- Taxes, subsidies and price controls reduce total surplus (deadweight loss) because some trades are lost or distorted.
- Surplus ignores income differences and externalities, so it is a guide to efficiency, not to fairness.
:::
