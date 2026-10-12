---
{
  "key": "firms.collusion-game-theory",
  "title": "Collusion, cartels and the Prisoner's Dilemma",
  "summary": "Distinguish overt and tacit collusion, explain what makes a cartel effective and why members have an incentive to cheat, analyse a two-player pay-off matrix to find dominant strategies and the Nash equilibrium, and outline competition law.",
  "concepts": ["aecon.firms.collusion-game-theory"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Suppose the only two bakeries in a small town agree to raise the price of bread together. Each earns more, and customers pay more. But each bakery also sees that, if it secretly cuts its price slightly, it could take most of the customers and earn even more, provided the other keeps to the agreement. If both think like this, the agreement collapses. This tension between the gains from cooperating and the temptation to cheat is what makes collusion fragile, and **game theory** is the tool that shows why.

You should know oligopoly, interdependence and the monopoly output and price. All figures are illustrative.

## Key definitions

:::definition{term="Collusion"}
An agreement or understanding between firms to restrict competition by fixing prices, limiting output or sharing markets, so as to raise their joint profit.
:::

:::definition{term="Cartel"}
A formal (overt) agreement among firms or countries to control price or output, usually through agreed output quotas or a common price.
:::

:::definition{term="Tacit collusion"}
Coordination of behaviour without any formal agreement, for example by following a price leader or by copying the rivals' price changes.
:::

:::definition{term="Nash equilibrium"}
An outcome in which each player's strategy is the best response to the strategies of the others, so that no player can gain by changing strategy alone.
:::

:::definition{term="Dominant strategy"}
A strategy that gives a player a higher pay-off than any other, whatever the rival does.
:::

## Overt and tacit collusion

**Overt collusion** is open and formal, like a cartel with agreed quotas. It is illegal in most countries. **Tacit collusion** has no explicit agreement and is harder to prove: firms may follow the price leader, or signal intentions through announced price changes.

## When is a cartel effective?

An effective cartel needs:

1. **Few firms**, so that agreement is easy and each member's share is large.
2. **A homogeneous product**, so that a single price can be agreed.
3. **High barriers to entry**, so that outsiders cannot undercut the cartel.
4. **Inelastic market demand**, so that a higher price raises revenue.
5. **Similar costs and objectives**, so that members want similar prices.
6. **Ability to monitor members** and punish cheaters.
7. **Stable demand and no strong government opposition.**

## The incentive to cheat

A fictional market has two firms, A and B. Market demand is $P = 90 - Q$ (Q in thousand units, P in US\$) and each firm has a constant marginal cost of US\$30.

:::worked-solution{title="The cartel output"}
1. A single monopolist would set $\text{MR} = 90 - 2Q = 30$, so $Q = 30$ and $P = 90 - 30 =$ US\$60.
2. Joint profit $= (60 - 30) \times 30 =$ US\$900 thousand. If the firms share equally, each produces 15 thousand units and earns US\$450 thousand.
:::

Now suppose one firm exceeds its quota of 15 thousand units by producing 20 thousand while the other keeps to quota.

:::worked-solution{title="Pay-offs when a firm cheats"}
1. A cheats (20) and B keeps to quota (15): total output 35, price $= 90 - 35 = 55$. Profit of A $= (55 - 30) \times 20 = 500$; profit of B $= (55 - 30) \times 15 = 375$.
2. Both cheat (20 each): total output 40, price $= 50$; each earns $(50 - 30) \times 20 = 400$.
3. Both keep to quota: each earns 450.
:::

## Game theory: the pay-off matrix

The pay-offs (profits in US\$ thousand; the first number is Firm A's) are:

| Firm A \ Firm B | Keep to quota (15) | Cheat (20) |
| --- | :---: | :---: |
| Keep to quota (15) | 450, 450 | 375, 500 |
| Cheat (20) | 500, 375 | 400, 400 |

:::worked-solution{title="Dominant strategies and the Nash equilibrium"}
1. For Firm A: if B keeps to quota, A earns 450 by keeping to quota and 500 by cheating, so cheating is better. If B cheats, A earns 375 by keeping to quota and 400 by cheating, so cheating is again better. **Cheating is a dominant strategy for A.**
2. The matrix is symmetrical, so cheating is also dominant for B.
3. The **Nash equilibrium** is (cheat, cheat), with each firm earning US\$400 thousand.
4. Both would be better off at (keep, keep) with 450 each, yet each has an incentive to depart from it.
:::

This is a **Prisoner's Dilemma**: the rational choice for each player leads to an outcome that is worse for both than cooperation. It explains why cartels are unstable. The agreement could be sustained if the game were repeated many times and each firm feared punishment (for example a price war) if it cheated, or if firms could monitor each other well. Without such enforcement, each member expects the others to cheat.

:::worked-solution{title="The gain from cheating"}
1. A's gain from cheating when B keeps to quota $= 500 - 450 = 50$ (US\$ thousand), or $50 \div 450 \times 100 = 11.1\%$.
2. If both cheat, each loses $450 - 400 = 50$ compared with the cartel outcome.
3. Consumers gain: price falls from US\$60 to US\$50 and output rises from 30 to 40 thousand units.
:::

## Consequences of collusion

Collusion raises prices and profit and reduces output and choice, so consumers are worse off and there is a welfare loss like that of monopoly. Cartels may also protect inefficient firms and weaken the incentive to innovate. Members gain only if the cartel survives.

## Competition law

Governments in most countries prohibit cartels, price-fixing and agreements to share markets, and also forbid mergers that would reduce competition substantially and the abuse of a dominant position. A competition authority (in Zimbabwe, the Competition and Tariff Commission) investigates, may impose fines and may offer leniency to a member that reports the cartel. Enforcement is hard because evidence is secret, and tacit collusion is difficult to prosecute. Regulators must also judge whether cooperation may bring benefits, such as joint research.

:::example{title="Evaluating the strength of a cartel"}
A cartel of producers of a fictional metal agrees to quotas. It is likely to be effective if demand is inelastic, if there are few producers and if no large outsider can expand output. It will probably break down if members have different costs, if the price is much higher than the cost (making cheating attractive), or if new producers enter. Thus the outcome depends on market conditions and on how well members can monitor each other, and no general verdict is possible.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 5) names cartels: the meaning, the conditions, the incentive to cheat and the consequences. Cambridge adds game theory with two-player pay-off matrices, dominant strategies, the Nash equilibrium and the Prisoner's Dilemma (Cambridge detail), and competition law in outline.
:::

## Common mistakes

:::mistake{title="Saying the Nash equilibrium is the best outcome"}
It is the outcome in which neither player can improve alone. In the Prisoner's Dilemma it is worse for both than cooperation.
:::

:::mistake{title="Confusing a dominant strategy with a Nash equilibrium"}
A dominant strategy is best whatever the rival does. A Nash equilibrium is a pair of strategies that are best responses to each other. A game can have a Nash equilibrium without dominant strategies.
:::

:::mistake{title="Reading the matrix the wrong way round"}
Compare the pay-offs of one player across the rows, holding the rival's choice fixed in each column (and vice versa).
:::

## Exam tips

:::exam-tip{title="Where tested"}
ZIMSEC Papers 1 and 3 ask about cartels and the incentive to cheat. Cambridge Papers 3 and 4 give a pay-off matrix and ask for dominant strategies, the Nash equilibrium and an evaluation of the stability of collusion.
:::

:::exam-tip{title="Command words"}
*Identify the Nash equilibrium*: test each player's best response to each rival choice. *Explain why the cartel breaks down*: use the gain from cheating. *Assess*: consider the conditions for the cartel, monitoring and the law.
:::

## Summary

:::summary
- Collusion may be overt (cartel) or tacit; it raises price and joint profit but harms consumers.
- A cartel is likely to succeed with few firms, a homogeneous product, high barriers and inelastic demand.
- Each member can gain by cheating, so cartels are unstable.
- A dominant strategy is best whatever the rival does; the Nash equilibrium is where each choice is a best response.
- In the Prisoner's Dilemma the equilibrium is worse for both players than cooperation.
- Competition law prohibits cartels but enforcement is difficult.
:::
