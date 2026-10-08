---
{
  "key": "kinetics.measuring-rates",
  "title": "Measuring and interpreting rates of reaction",
  "summary": "Follow a reaction by measuring the volume of gas given off, the loss in mass or the time taken for a precipitate to hide a cross; calculate average rates from results; compare rate graphs; evaluate the methods; and (Extended) find a rate from the gradient of a tangent.",
  "concepts": ["chem.kinetics.measuring-rates"],
  "objectives": [
    "cambridge/igcse/chemistry:6.2.3",
    "cambridge/igcse/chemistry:6.2.4",
    "cambridge/igcse/chemistry:6.2.8",
    "zimsec/o-level/chemistry:7.1.11.1",
    "zimsec/o-level/chemistry:7.1.11.2",
    "zimsec/o-level/chemistry:7.1.11.3"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Which indigestion tablet neutralises stomach acid fastest? Which brand of agricultural lime reacts quickest with acid soil? To answer questions like these, chemists **measure** how fast a reaction goes. They follow the change in something they can measure (the volume of a gas, the mass of the flask or how cloudy a solution becomes) as time passes.

In this lesson you will learn three standard methods, how to calculate rates from the results and how to read and compare rate graphs. You should already know the factors that affect the rate of a reaction.

:::note{title="Syllabus coverage"}
The methods, average rates and graph interpretation are needed by both boards. Evaluating the methods is **Cambridge Supplement**, and finding a rate from the gradient of a tangent is for **Cambridge Extended** candidates only.
:::

## Key definitions

:::definition{term="Average rate of reaction"}
The change in the amount of a reactant or product divided by the time taken. For a gas: $\text{average rate} = \dfrac{\text{volume of gas produced}}{\text{time taken}}$, in $\text{cm}^3/\text{s}$.
:::

:::definition{term="Initial rate"}
The rate at the very start of a reaction, when it is fastest.
:::

:::definition{term="Gradient"}
The steepness of a line on a graph: the change in the vertical quantity divided by the change in time. A steeper line means a faster rate.
:::

## Method 1: measuring the volume of gas

**Apparatus (in words).** The reactants are mixed in a conical flask closed with a bung. A delivery tube leads to a **gas syringe**, whose plunger is pushed out as gas collects. (Instead, the gas can be collected in an upturned measuring cylinder or burette filled with water and standing in a trough of water.) A stopwatch is started as the reactants are mixed and the volume is read every 10 or 20 seconds.

A typical reaction is magnesium with dilute hydrochloric acid:

$$
\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}
$$

:::worked-solution[Example 1: average rates from gas volumes]
| Time / s | 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Volume of hydrogen / cm³ | 0 | 20 | 36 | 48 | 56 | 60 | 62 | 62 |

1. Average rate in the first 20 s $= \dfrac{36}{20} = 1.8\ \text{cm}^3/\text{s}$.
2. Average rate from 20 s to 40 s $= \dfrac{56 - 36}{40 - 20} = \dfrac{20}{20} = 1.0\ \text{cm}^3/\text{s}$: slower, because the acid is being used up.
3. The volume stops changing at 60 s, so the reaction has finished. Average rate for the whole reaction $= \dfrac{62}{60} = 1.03\ \text{cm}^3/\text{s}$ (3 significant figures).
:::

## Method 2: measuring the loss in mass

**Apparatus (in words).** The flask of acid stands on a top-pan balance. The solid is added, a loose plug of **cotton wool** is put in the neck, and the mass is recorded at regular intervals. The cotton wool lets the gas escape but stops droplets of acid spraying out.

This works well for reactions that give off a fairly heavy gas, such as carbon dioxide:

$$
\ce{CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)}
$$

:::worked-solution[Example 2: rate from loss in mass]
| Time / min | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Mass of flask and contents / g | 85.20 | 84.62 | 84.26 | 84.06 | 83.98 | 83.98 |

1. Total mass of carbon dioxide lost $= 85.20 - 83.98 = 1.22$ g.
2. Mass lost in the first 2 minutes $= 85.20 - 84.26 = 0.94$ g.
3. Average rate in the first 2 minutes $= \dfrac{0.94}{2} = 0.47\ \text{g/min}$.
:::

It is **not** suitable for magnesium and acid: hydrogen is so light that the change in mass is too small to measure accurately on a school balance.

## Method 3: the disappearing cross

Sodium thiosulfate solution reacts with dilute hydrochloric acid to form a pale yellow **precipitate of sulfur**:

$$
\ce{Na2S2O3(aq) + 2HCl(aq) -> 2NaCl(aq) + S(s) + SO2(g) + H2O(l)}
$$

**Apparatus (in words).** A flask stands on a sheet of paper marked with a dark cross. The acid is added, the stopwatch started, and the time is recorded when the cross can no longer be seen from above through the cloudy mixture. The faster the reaction, the shorter the time, so:

$$
\text{rate} \propto \frac{1}{\text{time}}
$$

A time of 40 s gives a relative rate of $\dfrac{1}{40} = 0.025\ \text{s}^{-1}$. Sulfur dioxide is an irritant gas, so the room must be well ventilated.

## Interpreting rate graphs

On a graph of volume of gas (or loss in mass) against time:

- the curve is **steepest at the start**, where the reactants are most concentrated: the rate is fastest;
- the gradient **decreases** as reactants are used up and collisions become less frequent;
- the curve becomes **horizontal** when the reaction stops because the limiting reactant has been used up.

When two experiments are compared:

| Change (other reactant in excess) | Initial gradient | Final volume of gas |
| --- | --- | --- |
| higher temperature, higher concentration of the excess reactant, smaller pieces or a catalyst | steeper | the **same** |
| twice the amount of the limiting reactant | steeper or the same | **twice** as much |
| half the amount of the limiting reactant | less steep or the same | **half** as much |

## Rate from a tangent (Extended only)

To find the rate at one particular moment, draw a straight line that just touches the curve at that time (a **tangent**) and work out its gradient.

:::worked-solution[Example 3: gradient of a tangent]
At $t = 0$ the tangent to a curve passes through $(0\ \text{s}, 0\ \text{cm}^3)$ and $(10\ \text{s}, 25\ \text{cm}^3)$.

1. Gradient $= \dfrac{\text{change in volume}}{\text{change in time}} = \dfrac{25 - 0}{10 - 0}$.
2. Initial rate $= 2.5\ \text{cm}^3/\text{s}$.
:::

## Evaluating the methods (Supplement)

- A **gas syringe** measures gas volume more precisely than collecting over water, and does not lose gases that dissolve in water (carbon dioxide is slightly soluble).
- Some gas escapes before the bung is put in; adding the solid in a small tube that is tipped over **after** the bung is fitted avoids this.
- The **mass-loss** method is simple, but the cotton wool must stop acid spray, and it is unsuitable for light gases.
- The **disappearing cross** relies on judging when the cross vanishes, which differs between people; use the same observer, cross and lighting each time.

## Common mistakes

:::mistake{title="Averaging over the wrong time"}
If the reaction finished at 60 s, use 60 s (not 70 s) for the average rate of the whole reaction.
:::

:::mistake{title="Saying a longer time means a faster rate"}
In the disappearing-cross method, a **longer** time means a **slower** reaction. Rate is proportional to $\dfrac{1}{\text{time}}$.
:::

:::mistake{title="Changing the final amount with a catalyst"}
A catalyst, higher temperature or larger surface area makes the curve steeper but does not change the final volume. Only the amount of the limiting reactant does that.
:::

## Exam tips

:::exam-tip
Always give units for rates: $\text{cm}^3/\text{s}$, $\text{g/min}$ or $\text{s}^{-1}$.
:::

:::exam-tip
"Explain why the rate decreases" needs: the concentration of the reactant decreases (it is used up), so there are fewer particles per unit volume and collisions become less frequent.
:::

:::exam-tip
When you sketch a second curve, check two things: is it steeper or less steep at the start, and where does it level off?
:::

## Summary

:::summary
- Rates are followed by measuring gas volume (gas syringe), loss in mass (balance and cotton wool) or the time for a precipitate to hide a cross.
- Average rate = change in amount ÷ time; for the disappearing cross, rate ∝ 1/time.
- Graphs are steepest at the start, flatten as reactants are used up and are horizontal when the reaction stops.
- A steeper curve means a faster rate; the final amount depends only on the limiting reactant.
- Supplement: a gas syringe is more precise and avoids gas dissolving; judging the cross is subjective.
- Extended: the rate at an instant is the gradient of the tangent at that time.
:::
