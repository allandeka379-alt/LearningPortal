---
{
  "key": "circuits.series-parallel",
  "title": "Kirchhoff's laws and resistors in series and parallel",
  "summary": "State Kirchhoff's first and second laws as conservation of charge and of energy, derive the formulae for resistors in series and in parallel from them, and find combined resistances, currents and p.d.s in series-parallel networks.",
  "concepts": ["aphys.circuits.series-parallel"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The lights and sockets in a house are wired in parallel, so each appliance gets the full mains p.d. and can be switched independently. The resistors that set the brightness of an LED indicator are wired in series with it. Every circuit, from a vehicle's wiring loom to a solar installation on a rural clinic, is built from these two arrangements, and two conservation laws, named after Gustav Kirchhoff, tell you how current and p.d. are shared in them.

You should know $R = V/I$, that p.d. is energy per unit charge, and that e.m.f. is energy given to each unit of charge by a source.

## Key definitions

:::definition{term="Kirchhoff's first law"}
The sum of the currents entering any junction in a circuit is equal to the sum of the currents leaving that junction. It is a consequence of the conservation of charge.
:::

:::definition{term="Kirchhoff's second law"}
Around any closed loop in a circuit, the sum of the e.m.f.s is equal to the sum of the p.d.s. It is a consequence of the conservation of energy.
:::

:::formula{name="Resistors in series"}
$$
R = R_1 + R_2 + R_3 + \dots
$$

The combined resistance is larger than the largest individual resistance.
:::

:::formula{name="Resistors in parallel"}
$$
\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \dots
$$

The combined resistance is smaller than the smallest individual resistance. For two resistors, $R = \dfrac{R_1R_2}{R_1 + R_2}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require both laws, their basis in conservation, the derivations of the series and parallel formulae, and their use (Cambridge AS 10.2; ZIMSEC Form 5). Circuits with several sources are in the next lesson.
:::

## Why the laws hold

**First law.** Charge cannot be created or destroyed, and it does not pile up at a junction in a steady circuit. Whatever charge arrives per second must leave per second. At a junction where $3.0\ \text{A}$ arrives and one branch takes $1.2\ \text{A}$, the other branch must take $1.8\ \text{A}$.

**Second law.** Each coulomb that travels once round a loop returns to its starting point with the same potential energy. The energy it gains from the e.m.f.s must equal the energy it transfers in the components: $\sum E = \sum IR$. Going round a loop that contains no source, the p.d.s add to zero when their directions are taken into account.

## Deriving the series formula

1. In series, the same current $I$ passes through each resistor (first law: there are no junctions).
2. Second law around the loop: the total p.d. $V = V_1 + V_2 + V_3$.
3. Substitute $V = IR$ for each: $IR = IR_1 + IR_2 + IR_3$.
4. Divide by $I$: $R = R_1 + R_2 + R_3$.

## Deriving the parallel formula

1. In parallel, each resistor has the same p.d. $V$ across it (second law applied to the loop through any two branches).
2. First law at the junction: total current $I = I_1 + I_2 + I_3$.
3. Substitute $I = V/R$ for each: $\dfrac{V}{R} = \dfrac{V}{R_1} + \dfrac{V}{R_2} + \dfrac{V}{R_3}$.
4. Divide by $V$: $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dfrac{1}{R_3}$.

## Sharing p.d. and current

- In series, p.d. is shared in proportion to resistance: $\dfrac{V_1}{V_2} = \dfrac{R_1}{R_2}$.
- In parallel, current is shared in inverse proportion to resistance: $\dfrac{I_1}{I_2} = \dfrac{R_2}{R_1}$, so the smaller resistance takes the larger current. For two branches, $I_1 = I\dfrac{R_2}{R_1 + R_2}$.

:::worked-solution[A series-parallel network]
Resistors of $6.0\ \Omega$ and $12\ \Omega$ in parallel are connected in series with a $2.0\ \Omega$ resistor across a $12\ \text{V}$ supply of negligible internal resistance. Find the current from the supply and the current in each parallel branch.

1. Parallel pair: $R_p = \dfrac{6.0 \times 12}{6.0 + 12} = 4.0\ \Omega$.
2. Total resistance $= 4.0 + 2.0 = 6.0\ \Omega$, so $I = \dfrac{12}{6.0} = 2.0\ \text{A}$.
3. P.d. across the parallel pair $= 2.0 \times 4.0 = 8.0\ \text{V}$ (the $2.0\ \Omega$ resistor takes the other $4.0\ \text{V}$).
4. $I_6 = \dfrac{8.0}{6.0} = 1.33\ \text{A}$ and $I_{12} = \dfrac{8.0}{12} = 0.667\ \text{A}$; check: $1.33 + 0.667 = 2.0\ \text{A}$ (first law).
:::

The worked example can be checked with the second law. Round the loop containing the supply, the $2.0\ \Omega$ resistor and the $6.0\ \Omega$ branch: the e.m.f. is $12\ \text{V}$ and the p.d.s are $2.0 \times 2.0 = 4.0\ \text{V}$ and $1.33 \times 6.0 = 8.0\ \text{V}$, which add to $12\ \text{V}$. Round the loop formed by the two parallel branches alone there is no e.m.f., and the two p.d.s of $8.0\ \text{V}$, taken in opposite directions round the loop, cancel. Checks like these catch most arithmetic slips.

:::worked-solution[Current divider]
A current of $2.4\ \text{A}$ divides between parallel resistors of $15\ \Omega$ and $5.0\ \Omega$.

1. $I_{15} = 2.4 \times \dfrac{5.0}{15 + 5.0} = 0.60\ \text{A}$.
2. $I_{5} = 2.4 \times \dfrac{15}{20} = 1.8\ \text{A}$.
3. Both have the same p.d.: $0.60 \times 15 = 1.8 \times 5.0 = 9.0\ \text{V}$.
:::

## Reducing a network step by step

Work from the innermost group outwards: combine resistors that are unambiguously in series or in parallel, redraw (in words) and repeat. Two resistors are in series only if the same current must pass through both, with no junction between them; they are in parallel only if both ends of each are connected to the same two points.

| Arrangement of four identical resistors $R$ | Combined resistance |
|---|---|
| All four in series | $4R$ |
| Two in series, this pair in parallel with another series pair | $R$ |
| Two in parallel, in series with another parallel pair | $R$ |
| All four in parallel | $R/4$ |

A useful check: adding a resistor in series always increases the total; adding any resistor in parallel always decreases it. A short circuit (a wire of zero resistance) in parallel with a resistor takes all the current, so the resistor can be removed from the calculation.

## Common mistakes

:::mistake{title="Forgetting to invert"}
$\dfrac{1}{R} = \dfrac{1}{6} + \dfrac{1}{12} = \dfrac{1}{4}$ gives $R = 4\ \Omega$, not $0.25\ \Omega$.
:::

:::mistake{title="Calling resistors in series when a junction separates them"}
If a branch joins between two resistors, they do not carry the same current and are not simply in series.
:::

:::mistake{title="Stating Kirchhoff's laws without the conservation principle"}
When asked what the laws are consequences of, say conservation of **charge** (first) and conservation of **energy** (second).
:::

## Exam tips

:::exam-tip{title="Derive"}
A *derive* question wants each step: state what is the same (current in series, p.d. in parallel), apply the appropriate Kirchhoff law, substitute $V = IR$, and cancel.
:::

:::exam-tip{title="Calculate and check"}
After solving a network, check that the currents balance at each junction and the p.d.s add up round each loop. Give currents and p.d.s to the precision of the data.
:::

:::exam-tip{title="Which papers"}
Network reductions are favourites in ZIMSEC Paper 1 and Cambridge Paper 1; definitions and derivations appear in ZIMSEC Paper 2 and Cambridge Paper 2.
:::

## Summary

:::summary
- First law: current into a junction = current out (conservation of charge).
- Second law: round a loop, sum of e.m.f.s = sum of p.d.s (conservation of energy).
- Series: $R = R_1 + R_2 + \dots$; same current; p.d. shared in proportion to $R$.
- Parallel: $1/R = 1/R_1 + 1/R_2 + \dots$; same p.d.; current shared inversely with $R$.
- Reduce networks step by step and check with both laws.
:::
