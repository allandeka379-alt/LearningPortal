---
{
  "key": "kinetics.rate-equations",
  "title": "Rate equations, orders and half-life",
  "summary": "Rate equations of the form rate = k[A]^m[B]^n, orders of reaction (0, 1 and 2), deducing orders from initial-rates data and from concentration–time and rate–concentration graphs, the rate constant and its units, and the constant half-life of a first-order reaction.",
  "concepts": ["achem.kinetics.rate-equations"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Collision theory tells you *that* concentration affects rate. A **rate equation** tells you exactly *how*: doubling the concentration of one reactant may double the rate, quadruple it, or do nothing at all. Pharmacists use the same mathematics to decide how often a medicine must be taken, because many drugs are removed from the body by first-order processes with a constant half-life. Radioactive decay, used in dating archaeological finds such as those at Great Zimbabwe, is also first order.

In this lesson you will write rate equations, find orders from experimental data and graphs, calculate rate constants with units, and use half-lives. You need the idea of rate as the gradient of a concentration–time graph, and confidence with indices and simple graphs.

## Key definitions

:::definition{term="Rate equation"}
An experimentally determined equation, rate = $k[\text{A}]^m[\text{B}]^n$, linking the rate of a reaction to the concentrations of the reactants.
:::

:::definition{term="Order of reaction"}
The power to which the concentration of a reactant is raised in the rate equation ($m$ for A, $n$ for B). The **overall order** is the sum of the individual orders, $m + n$.
:::

:::definition{term="Rate constant, k"}
The constant of proportionality in the rate equation. Its value is fixed at a given temperature and increases as temperature increases.
:::

:::definition{term="Half-life, t½"}
The time taken for the concentration (or amount) of a reactant to fall to half of its initial value.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: rate equations with orders 0, 1 and 2, orders from initial rates and from graphs, k and its units, first-order half-life (ZIMSEC Form 5; Cambridge A Level, Paper 4). Use k = 0.693/t½ for first-order reactions, as Cambridge does. Mechanisms and the rate-determining step are in the next lesson.
:::

## Orders and what they mean

Orders can only be found by **experiment**; they cannot be read from the coefficients in the balanced equation. For a reactant X:

| Order in X | Rate equation term | If [X] doubles, the rate… |
|---|---|---|
| 0 | $[\text{X}]^0 = 1$ | is unchanged |
| 1 | $[\text{X}]^1$ | doubles |
| 2 | $[\text{X}]^2$ | quadruples (× 4) |

A reactant that is zero order does not appear in the rate equation at all, even though it is used up in the reaction.

## The initial-rates method

Run several experiments, changing the concentration of **one** reactant at a time, and measure the initial rate of each (from the gradient at t = 0, or 1/time for a clock reaction).

:::worked-solution[Example 1: deducing a rate equation]
For the reaction A + B → products at 298 K:

| Experiment | [A] / mol dm⁻³ | [B] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
| 1 | 0.10 | 0.10 | 2.0 × 10⁻⁴ |
| 2 | 0.20 | 0.10 | 8.0 × 10⁻⁴ |
| 3 | 0.10 | 0.30 | 6.0 × 10⁻⁴ |

1. Experiments 1 and 2: [B] constant, [A] × 2, rate × 4 = 2². Second order in A.
2. Experiments 1 and 3: [A] constant, [B] × 3, rate × 3 = 3¹. First order in B.
3. Rate = $k[\text{A}]^2[\text{B}]$; overall order 3.
4. $k = \dfrac{\text{rate}}{[\text{A}]^2[\text{B}]} = \dfrac{2.0 \times 10^{-4}}{(0.10)^2 \times 0.10} = 0.20$.
5. Units: $\dfrac{\text{mol dm}^{-3}\,\text{s}^{-1}}{(\text{mol dm}^{-3})^3} = \text{dm}^6\,\text{mol}^{-2}\,\text{s}^{-1}$.
:::

### Units of k

| Overall order | Units of k |
|---|---|
| 0 | mol dm⁻³ s⁻¹ |
| 1 | s⁻¹ |
| 2 | dm³ mol⁻¹ s⁻¹ |
| 3 | dm⁶ mol⁻² s⁻¹ |

Work them out each time by rearranging rate = k × concentrations and cancelling, rather than memorising.

## Orders from graphs

**Concentration–time graphs** (for one reactant, with the others in large excess so that their concentrations hardly change):

- **zero order**: a straight line with constant negative gradient; the rate does not slow down as the reactant is used up.
- **first order**: a curve whose **half-life is constant**: the time to fall from 0.080 to 0.040 mol dm⁻³ is the same as from 0.040 to 0.020 mol dm⁻³.
- **second order**: a curve whose successive half-lives get longer (each one double the last).

**Rate–concentration graphs**:

- **zero order**: a horizontal line (rate independent of concentration);
- **first order**: a straight line through the origin (gradient = k);
- **second order**: a curve through the origin rising ever more steeply (rate ∝ [X]²; a plot of rate against [X]² is a straight line).

![Two graph panels for orders 0, 1 and 2. Concentration against time: zero order is a straight falling line, first order a curve with constant half-life, second order a curve that flattens more slowly. Rate against concentration: zero order is horizontal, first order a straight line through the origin, second order curves upward.](media:diagrams/rate-order-graphs.png "Figure: concentration-time and rate-concentration graphs for zero, first and second order")

## First-order reactions and half-life

For a first-order reaction the half-life does not depend on the starting concentration, and

$$
k = \frac{0.693}{t_{1/2}}
$$

:::worked-solution[Example 2: using a half-life]
A compound decomposes in a first-order reaction with a half-life of 345 s at a certain temperature. Its initial concentration is 0.0800 mol dm⁻³. Calculate k and the concentration after 1035 s.

1. $k = \dfrac{0.693}{345} = 2.01 \times 10^{-3}\ \text{s}^{-1}$.
2. 1035 s = 3 × 345 s = three half-lives.
3. Concentration = $0.0800 \times \left(\tfrac{1}{2}\right)^3 = 0.0100$ mol dm⁻³.
:::

To show from a graph that a reaction is first order, read off at least two successive half-lives (from different starting points) and show that they are equal.

![Concentration-time curve for a first-order reaction with half-life 345 s starting at 0.0800 mol per dm³: the concentration is 0.0400 at 345 s, 0.0200 at 690 s and 0.0100 at 1035 s, so every half-life is the same length, which proves first order.](media:diagrams/first-order-half-life.png "Figure: a first-order reaction has a constant half-life (345 s here)")

## Temperature and the rate constant

The orders do not change with temperature, but **k increases** as the temperature rises, because a larger proportion of collisions has energy at least equal to the activation energy (Boltzmann distribution). A higher k means a faster rate at the same concentrations and a shorter half-life for a first-order reaction. A catalyst also increases k (by lowering Ea), and may change the rate equation, because it changes the mechanism.

## Common mistakes

:::mistake{title="Taking orders from the equation"}
The coefficients in the balanced equation do not give the orders; only experimental data do.
:::

:::mistake{title="Changing two concentrations at once"}
Compare experiments in which only one concentration changes. If two change, divide out the known effect of one first.
:::

:::mistake{title="Wrong units of k"}
Rearrange for k and cancel units every time: first order is s⁻¹, second order dm³ mol⁻¹ s⁻¹.
:::

:::mistake{title="Half-life of a second-order reaction"}
Only a first-order reaction has a constant half-life. Do not use 0.693/t½ for other orders.
:::

:::mistake{title="Thinking k changes with concentration"}
k is constant at constant temperature; changing concentrations changes the rate, not k.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A) and Paper 4 (initial rates from a clock reaction); Cambridge Paper 4 (rate equations, k, half-life) and Paper 5 (analysing rate data). An initial-rates table followed by "deduce the rate equation and calculate k with its units" is the most common question.
:::

:::exam-tip{title="Command words"}
*Deduce* the order: name the two experiments compared, state how the concentration and the rate change, and conclude. *Construct* the rate equation: rate = k[…]ᵐ[…]ⁿ, leaving out zero-order reactants. *Calculate* k: show the substitution and the units. *Show* that a reaction is first order: two equal successive half-lives.
:::

## Summary

:::summary
- Rate = k[A]ᵐ[B]ⁿ; orders (0, 1 or 2) come only from experiment; overall order = m + n.
- Initial-rates method: change one concentration at a time; ×2 concentration gives ×1, ×2 or ×4 rate for order 0, 1 or 2.
- Units of k depend on overall order: s⁻¹ (1st), dm³ mol⁻¹ s⁻¹ (2nd), dm⁶ mol⁻² s⁻¹ (3rd).
- Concentration–time: straight line (zero order); constant half-life (first order). Rate–concentration: flat, straight through origin, or upward curve.
- First order: k = 0.693/t½; k increases with temperature.
:::
