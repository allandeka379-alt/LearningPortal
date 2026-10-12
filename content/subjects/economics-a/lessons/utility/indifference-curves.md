---
{
  "key": "utility.indifference-curves",
  "title": "Indifference curves, budget lines and the income and substitution effects",
  "summary": "Describe indifference curves and budget lines, find consumer equilibrium, and separate the effect of a price change into substitution and income effects for normal, inferior and Giffen goods.",
  "concepts": ["aecon.utility.indifference-curves"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

The marginal utility approach asks you to believe that satisfaction can be counted in utils. Most economists prefer a weaker assumption: a consumer need only be able to say which of two bundles of goods she prefers, or whether she is equally happy with both. **Indifference curve analysis** starts from this ordering of preferences, adds the consumer's budget and shows how the choice of goods responds to a change in price or income. It also explains something marginal utility cannot: why a fall in price raises demand for two separate reasons, the *substitution effect* and the *income effect*.

You should know demand, normal and inferior goods and the idea of opportunity cost. The budget line is a simple linear equation.

## Key definitions

:::definition{term="Indifference curve"}
A curve showing all the combinations of two goods between which a consumer is equally satisfied, so that she is indifferent between any two points on it. A higher curve shows a higher level of satisfaction.
:::

:::definition{term="Marginal rate of substitution (MRS)"}
The quantity of one good a consumer is willing to give up to gain one more unit of the other while staying on the same indifference curve. It is the slope (in absolute value) of the indifference curve and equals $MU_X \div MU_Y$.
:::

:::definition{term="Budget line"}
A line showing all the combinations of two goods a consumer can buy with a given income at given prices. Its slope (in absolute value) is the price ratio $P_X \div P_Y$ when X is on the horizontal axis.
:::

## Properties of indifference curves

With good X on the horizontal axis and good Y on the vertical axis, indifference curves:

1. **Slope downward** from left to right: to get more of one good the consumer must have less of the other to remain equally satisfied.
2. **Are convex to the origin**: the slope gets flatter as we move down the curve because the MRS falls. This reflects diminishing marginal utility: a consumer with a lot of Y and little X will give up much Y for a little X, and the reverse as the proportions change.
3. **Never cross**: crossing would imply that a bundle is both preferred to and equal to another.
4. **Are infinite in number**: a map of curves exists, with higher curves further from the origin preferred.

## The budget line

Suppose a consumer has an income of US\$120 and X costs US\$4 and Y costs US\$6. Spending everything on X buys $120 \div 4 = 30$ units; spending everything on Y buys $120 \div 6 = 20$ units. The budget line joins (30, 0) and (0, 20) and has slope $4 \div 6 = 0.67$ (giving up one unit of X frees US\$4, which buys two-thirds of a unit of Y).

| Change | Effect on the budget line |
| --- | --- |
| Income rises | Parallel shift outward (right) |
| Income falls | Parallel shift inward |
| Price of X falls | Pivots outward on the X axis (the Y intercept is unchanged) |
| Price of X rises | Pivots inward on the X axis |

When the price of X falls to US\$2 with income unchanged, the X intercept becomes $120 \div 2 = 60$ and the slope falls to $2 \div 6 = 0.33$.

## Consumer equilibrium

The consumer chooses the affordable bundle on the highest attainable indifference curve. This is where an indifference curve is **tangent** to the budget line, so that the slopes are equal:

:::keyfact{title="Equilibrium condition"}
$$MRS = \frac{MU_X}{MU_Y} = \frac{P_X}{P_Y}$$

This is the equi-marginal condition $MU_X/P_X = MU_Y/P_Y$ in another form. At any other point on the budget line the consumer could reach a higher curve by shifting spending.
:::

## Income, substitution and price effects

When the price of X falls, the quantity bought changes for two reasons.

- **Substitution effect:** X has become cheaper *relative* to Y, so the consumer switches towards X and away from Y. It always works to raise the quantity of X when its price falls.
- **Income effect:** the fall in price raises the consumer's **real income** (purchasing power), so she can buy more of everything. For a normal good this raises demand for X further; for an inferior good it lowers demand.
- **Price effect:** the total change in quantity, equal to the substitution effect plus the income effect.

To decompose the price effect we draw an imaginary budget line parallel to the new budget line and tangent to the *original* indifference curve. It shows the income needed to be as well off as before at the new prices (the Hicks method). The move from the original point to this tangent point is the substitution effect; the move from there to the new equilibrium is the income effect.

:::worked-solution{title="Decomposing a price fall (illustrative preferences)"}
A consumer with income US\$120 always spends half of it on each good. Initially $P_X = 4$ and $P_Y = 6$. These preferences are illustrative.

1. **Initial equilibrium.** Spending on X is US\$60, so $X = 60 \div 4 = 15$; spending on Y is US\$60, so $Y = 60 \div 6 = 10$. Utility, measured as $X \times Y$, is $150$.
2. **After the price of X falls to US\$2.** She spends US\$60 on X, so $X = 30$; still $Y = 10$. Price effect on X $= 30 - 15 = +15$ units.
3. **Compensated bundle.** Find the cheapest bundle on the *original* curve ($XY = 150$) at the new prices. At the optimum, $P_X X = P_Y Y$, so $2X = 6Y$ and $X = 3Y$. Then $3Y^2 = 150$, $Y = \sqrt{50} = 7.07$ and $X = 21.21$. The cost is $2 \times 21.21 + 6 \times 7.07 = 84.85$: the income needed to be as well off as before.
4. **Substitution effect on X** $= 21.21 - 15 = +6.21$ units (and Y falls from 10 to 7.07).
5. **Income effect on X** $= 30 - 21.21 = +8.79$ units (the extra purchasing power, $120 - 84.85 = 35.15$, is spent on both goods).
6. Check: $6.21 + 8.79 = 15$.
:::

For these preferences both effects increase X, so X is a normal good.

### Normal, inferior and Giffen goods

| Type of good | Substitution effect (price fall) | Income effect (price fall) | Price effect | Demand curve |
| --- | --- | --- | --- | --- |
| Normal | Raises quantity | Raises quantity | Large rise | Downward sloping |
| Inferior | Raises quantity | Lowers quantity | Smaller rise | Downward sloping |
| Giffen | Raises quantity | Lowers quantity, by **more** | Quantity falls | Upward sloping |

An **inferior** good has a negative income elasticity, so the rise in real income makes the consumer buy less of it. The substitution effect still dominates, so demand slopes downward. A **Giffen good** is a rare, extremely inferior good that takes a large share of a poor consumer's budget; the negative income effect outweighs the substitution effect, so a price rise raises the quantity demanded. Textbook examples are staple foods for very poor households, but clear evidence is hard to find.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 6) expects you to distinguish normal from inferior goods with indifference curve analysis. Cambridge (A Level only) also requires Giffen goods and the evaluation of the model.
:::

## Evaluation

**Strengths.** The model needs only ordinal preferences, separates the substitution and income effects, and can be extended to many policy questions such as taxes, benefits and the choice between work and leisure.

**Weaknesses.** It treats only two goods, assumes consumers are rational and know their preferences, cannot be observed directly, and ignores habit, advertising, social influence and the fact that choices take place over time. It also assumes goods are divisible and prices are fixed, and that the consumer is a single decision-maker (a household may not be). Despite these limits, it provides a rigorous explanation of demand.

:::example{title="Applying the model"}
A government can help a poor household either with a cash transfer or with a food subsidy of the same cost to the government. The cash transfer shifts the budget line outward in parallel, so the household can choose any combination of goods. The food subsidy pivots the line and rewards buying food in particular. The household can reach a curve at least as high with the cash transfer as with the subsidy, and strictly higher if it would have bought less food than the subsidy leads it to buy; the subsidy may still be preferred by a government whose aim is to raise food consumption specifically. The model makes the comparison precise.
:::

## Common mistakes

:::mistake{title="Drawing curves that cross or slope upward"}
Indifference curves slope downward and never intersect.
:::

:::mistake{title="Saying that the budget line slope is Py/Px"}
With X on the horizontal axis, the slope is $P_X \div P_Y$. Check with the intercepts: rise over run $= (I/P_Y) \div (I/P_X)$.
:::

:::mistake{title="Confusing inferior with Giffen"}
All Giffen goods are inferior, but almost no inferior goods are Giffen. Giffen requires the income effect to outweigh the substitution effect.
:::

:::mistake{title="Forgetting that the decomposition keeps the consumer on the original curve"}
The substitution effect holds satisfaction constant, so it is measured along the original indifference curve.
:::

## Exam tips

:::exam-tip{title="Where tested"}
ZIMSEC Paper 1 and Paper 3 (Form 6 content) ask for the properties of indifference curves, equilibrium and the effects of a price change. Cambridge Paper 3 uses multiple choice on budget line shifts and the price effect; Paper 4 asks for diagrams described in words and evaluation of the model.
:::

:::exam-tip{title="Command words"}
*Explain the effect of a fall in the price of X*: describe the pivot of the budget line, the new tangency and the split into substitution and income effects. *Distinguish normal from inferior goods*: compare the direction of the income effect. *Evaluate*: weigh the model's ordinal logic against its unrealistic assumptions.
:::

## Summary

:::summary
- Indifference curves are downward sloping, convex to the origin and never cross; higher curves are preferred.
- The budget line has slope Px/Py; income changes shift it, price changes pivot it.
- Equilibrium is at the tangency where MRS equals the price ratio.
- A price change has a substitution effect and an income effect; their sum is the price effect.
- Inferior goods have a negative income effect; Giffen goods (Cambridge) have an income effect strong enough to give an upward-sloping demand curve.
:::
