---
{
  "key": "intervention.price-controls-buffer-stocks",
  "title": "Maximum and minimum prices and buffer stock schemes",
  "summary": "Analyse maximum and minimum prices and buffer stocks with calculated examples, and evaluate their effects on consumers, producers and the government budget.",
  "concepts": ["aecon.intervention.price-controls-buffer-stocks"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

When the price of bread or maize meal jumps, there is public pressure for the government to fix a ceiling. When the price of farm produce collapses after a good harvest, farmers ask for a guaranteed minimum. Both responses are attempts to override the price that demand and supply would set. Governments also try to smooth price swings in agricultural markets by buying produce when prices are low and selling when they are high. These policies sound simple, but their effects depend on whether the controlled price is above or below the market-clearing price, and on elasticities.

You should know equilibrium, shortage and surplus, price elasticity of demand and supply, and consumer and producer surplus.

## Key definitions

:::definition{term="Maximum price (price ceiling)"}
A legal limit above which the price of a good may not be charged. It has an effect only if set **below** the equilibrium price.
:::

:::definition{term="Minimum price (price floor)"}
A legal limit below which the price may not fall. It has an effect only if set **above** the equilibrium price. A minimum wage is a minimum price of labour.
:::

:::definition{term="Buffer stock scheme"}
A scheme in which an agency buys the produce when the market price falls to a lower limit and sells from its stock when the price rises to an upper limit, to keep the price within a target range.
:::

## Maximum prices

Take a fictional market for maize (price in US\$ per tonne, quantity in tonnes) with demand $P = 60 - 0.1Q$ and supply $P = 20 + 0.1Q$. Equilibrium is $Q = 200$ and $P = 40$.

:::worked-solution{title="A maximum price of 30 dollars"}
1. Quantity demanded at 30: $Q_d = (60 - 30) \div 0.1 = 300$.
2. Quantity supplied at 30: $Q_s = (30 - 20) \div 0.1 = 100$.
3. **Shortage** $= 300 - 100 = 200$ tonnes. Only 100 tonnes are traded, less than the 200 at equilibrium.
:::

![A maximum price of US\$30 below the equilibrium of US\$40 and 200 tonnes: quantity demanded is 300 tonnes but only 100 tonnes are supplied, a shortage of 200, and at 100 tonnes buyers would pay up to US\$50, so a black market can exceed the original equilibrium price.](media:diagrams/maximum-price-shortage.png "Figure: a maximum price below equilibrium creates a shortage (red bar) and an incentive for black-market trade")

Consequences:

1. **Shortages** and queues; sellers decide who gets the good.
2. **Rationing** by ability to queue, by favouritism or by coupons, not by price.
3. **Black markets** in which the good is sold above the maximum price. At 100 tonnes, consumers would be willing to pay $60 - 0.1 \times 100 = 50$, so black-market prices can exceed even the original equilibrium price.
4. **Lower quality** and reduced supply as producers cut costs or switch to other products.
5. Consumers who are able to buy gain from the lower price; producers lose revenue and surplus.
6. A loss of total surplus: a deadweight loss from the trades that no longer occur.

Governments may use maximum prices on essentials such as bread, rent or fuel to protect low-income households. Supporters say they stop price gouging in an emergency; critics say they cause shortages, and that cash transfers to the poor would be a better way to help.

## Minimum prices

:::worked-solution{title="A minimum price of 50 dollars"}
1. Quantity demanded at 50: $Q_d = (60 - 50) \div 0.1 = 100$.
2. Quantity supplied at 50: $Q_s = (50 - 20) \div 0.1 = 300$.
3. **Surplus** $= 300 - 100 = 200$ tonnes.
4. If the government buys the surplus to maintain the price, the cost is $50 \times 200 = 10{,}000$, plus storage.
5. Farmers' revenue from consumers is $50 \times 100 = 5{,}000$; with the government's purchases, farmers receive $50 \times 300 = 15{,}000$, compared with $40 \times 200 = 8{,}000$ at the equilibrium.
:::

![A minimum price of US\$50 above the equilibrium of US\$40 and 200 tonnes: quantity demanded falls to 100 tonnes while quantity supplied rises to 300, a surplus of 200 tonnes that the government would have to buy at a cost of US\$10,000 to hold the price.](media:diagrams/minimum-price-surplus.png "Figure: a minimum price above equilibrium creates a surplus (red bar) that must be bought, stored or exported")

Consequences:

1. **Surpluses** which must be bought, stored, exported or destroyed, or which remain unsold.
2. Producers who sell gain; consumers pay more and buy less.
3. A cost to the government (and taxpayers) if it buys the surplus.
4. **Resources stay in the industry** that would otherwise have moved; inefficiency may be protected.
5. The surplus may be dumped abroad, harming other countries' farmers.

**A minimum wage** is a minimum price for labour. Set above the market wage, it raises the pay of those who keep their jobs but may reduce the quantity of labour demanded, particularly where demand is elastic. Labour market analysis, including monopsony, comes later in the course.

## Buffer stock schemes

Agricultural prices swing because supply varies with weather while demand is inelastic: a small change in supply produces a large price change. A buffer stock aims to stabilise this.

Suppose the agency's target range is US\$35 (the floor) to US\$45 (the ceiling). In a **good harvest** supply is $P = 4 + 0.1Q$.

:::worked-solution{title="A good harvest: the agency buys"}
1. Without the scheme: $60 - 0.1Q = 4 + 0.1Q$, so $Q = 280$ and $P = 32$, below the floor.
2. At the floor of 35: $Q_d = (60 - 35) \div 0.1 = 250$ and $Q_s = (35 - 4) \div 0.1 = 310$.
3. The agency **buys** $310 - 250 = 60$ tonnes at a cost of $35 \times 60 = 2{,}100$.
4. Farmers' revenue rises from $32 \times 280 = 8{,}960$ to $35 \times 310 = 10{,}850$. Consumers pay US\$35 instead of US\$32.
:::

In a **poor harvest** supply is $P = 36 + 0.1Q$.

:::worked-solution{title="A poor harvest: the agency sells"}
1. Without the scheme: $60 - 0.1Q = 36 + 0.1Q$, so $Q = 120$ and $P = 48$, above the ceiling.
2. At the ceiling of 45: $Q_d = (60 - 45) \div 0.1 = 150$ and $Q_s = (45 - 36) \div 0.1 = 90$.
3. The agency **sells** $150 - 90 = 60$ tonnes from stock for $45 \times 60 = 2{,}700$.
4. Taken over both years the agency spends 2,100 and receives 2,700, a surplus of US\$600 before storage costs. The scheme pays for itself only if good and bad years balance and storage is cheap.
:::

![A buffer stock with a floor of US\$35 and a ceiling of US\$45: in a good harvest the market price would be US\$32, so at US\$35 the agency buys the 60 tonnes by which supply of 310 exceeds demand of 250; in a poor harvest the price would be US\$48, so at US\$45 it sells 60 tonnes from stock to meet demand of 150 against supply of 90.](media:diagrams/buffer-stock-scheme.png "Figure: the agency buys 60 tonnes in a good harvest (green) and sells 60 in a poor one (red) to hold price between US\$35 and US\$45")

### Problems of buffer stocks

1. **Information**: the agency must know the long-run equilibrium price to set a range around it; if the floor is set too high the agency accumulates unsold stocks and cost grows without limit.
2. **Cost of storage** and losses from deterioration, theft and pests.
3. **Financing**: buying requires money in good years; the stock may run out in a run of bad years, and the scheme then collapses.
4. **Trends**: if the market price keeps rising or falling because of a lasting change in demand or supply, the scheme cannot keep it within the range.
5. **Interference with market signals** and encouragement of over-production if the floor is above equilibrium.
6. **Political pressure** to raise the floor.

A related arrangement is a state **marketing board** that buys the crop at a set price and sells it on. Zimbabwe, like many countries, has had a state grain marketing body that buys maize and holds strategic reserves, and the level of the announced purchase price, the speed of payment and the board's role have been much discussed: supporters argue that it guarantees farmers a market and supports food security, while critics argue that it can crowd out private traders and distort prices.

## Evaluation

Whether intervention is justified depends on its objective and its side effects. Maximum prices aim at fairness for consumers but cause shortages; minimum prices aim to protect producers but create surpluses; buffer stocks aim at stability but are costly and can fail. Their success depends on elasticities (shortages and surpluses are bigger when curves are elastic), on how long they last (the long-run elasticities are larger) and on the government's capacity to enforce and finance them. Alternatives include direct income support, vouchers, improving storage and market information, and crop insurance.

:::example{title="Assessing a maximum price on bread"}
A fictional government fixes the price of bread below its market level. Households that can buy gain; queues form and some bakeries cut quality or stop production; a black market appears. The policy helps low-income families only if supply is sufficient, so the assessment depends on supply elasticity (how many bakeries stop), on how the bread is distributed and on whether a cash transfer or targeted subsidy would help the poor at lower cost to efficiency.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards test maximum and minimum prices and buffer stocks. ZIMSEC includes marketing arrangements for grain as an application; Cambridge may ask you to compare buffer stocks with other forms of intervention and to assess them in an essay. Keep answers factual and balanced.
:::

## Common mistakes

:::mistake{title="Drawing a maximum price above equilibrium"}
A ceiling above equilibrium has no effect. To cause a shortage it must be below equilibrium. Likewise a floor below equilibrium has no effect.
:::

:::mistake{title="Calling a surplus under a minimum price a failure of the market"}
The surplus is the result of the control, not of the market.
:::

:::mistake{title="Forgetting the cost to the government"}
A government that buys the surplus pays price times surplus, plus storage.
:::

:::mistake{title="Describing buffer stocks as setting a fixed price"}
They try to keep the price between a floor and a ceiling; the price still moves within the band.
:::

## Exam tips

:::exam-tip{title="Where tested"}
ZIMSEC Papers 1 and 2 ask for shortage or surplus calculations and the cost of buying surplus; Paper 3 essays ask for the effects of controls in agriculture. Cambridge Papers 1 and 2 test the diagrams (described) and the consequences of controls and buffer stocks.
:::

:::exam-tip{title="Command words"}
*Calculate the surplus*: quantity supplied minus quantity demanded at the minimum price. *Explain*: link the control to the shortage or surplus. *Evaluate*: consider winners and losers, costs, black markets and alternatives, and reach a judgement.
:::

## Summary

:::summary
- A maximum price below equilibrium creates a shortage, rationing, black markets and a loss of total surplus.
- A minimum price above equilibrium creates a surplus that must be bought, stored or left unsold, raising costs or inefficiency.
- Buffer stocks buy at a floor price and sell at a ceiling price to stabilise prices, but face costs, information and financing problems.
- Effects depend on elasticities, the time period and the government's ability to enforce and finance the policy.
- Alternatives such as targeted income support may achieve the same aims at lower cost.
:::
