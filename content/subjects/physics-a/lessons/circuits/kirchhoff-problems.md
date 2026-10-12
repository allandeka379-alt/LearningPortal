---
{
  "key": "circuits.kirchhoff-problems",
  "title": "Solving circuits with Kirchhoff's laws",
  "summary": "Apply Kirchhoff's laws systematically to networks with more than one source or several loops, set up and solve simultaneous equations with sign conventions, interpret negative answers, check results by an energy balance, and see how real meters disturb a circuit.",
  "concepts": ["aphys.circuits.kirchhoff-problems"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A solar panel charging a battery while the battery also runs a lamp in a rural homestead; two batteries connected in parallel on a truck; a charger topping up a phone that is in use. In each case there is more than one source of e.m.f., and the simple series and parallel rules are not enough. Kirchhoff's laws, applied systematically, solve any such network.

You should already be able to state both laws, explain them from conservation of charge and energy, and combine resistors in series and parallel.

## Key definitions

:::definition{term="Loop"}
Any closed path round a circuit that starts and ends at the same point.
:::

:::definition{term="Junction (node)"}
A point where three or more conductors meet, at which current can divide or combine.
:::

:::definition{term="Ideal meters"}
An ideal ammeter has zero resistance (so no p.d. across it); an ideal voltmeter has infinite resistance (so it draws no current).
:::

:::formula{name="Kirchhoff's laws in use"}
$$
\sum I_{\text{in}} = \sum I_{\text{out}} \qquad \sum E = \sum IR \ \ (\text{round any loop})
$$

In the loop equation, an e.m.f. counts as positive when you pass through the source from its negative to its positive terminal in your chosen direction; a p.d. $IR$ counts as positive when your direction is the same as the assumed current direction in that resistor.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect multi-loop and multi-source problems solved with Kirchhoff's laws (Cambridge AS 10.2; ZIMSEC Form 5). Meter resistance appears in practical-style questions; treat meters as ideal unless told otherwise.
:::

## A systematic method

1. **Label the currents.** Choose a direction for the current in each branch and label it ($I_1$, $I_2$, …). Use the first law at junctions so you introduce as few unknowns as possible (e.g. $I_3 = I_1 + I_2$).
2. **Choose loops.** You need as many independent loop equations as unknown currents that remain. Each new loop must include at least one branch not already used.
3. **Write each loop equation** going round in one direction, applying the sign convention above.
4. **Solve** the simultaneous equations.
5. **Interpret signs.** A negative current means the true current flows opposite to the direction you assumed; the magnitude is still correct.
6. **Check** with a loop you did not use, and with an energy balance: the power supplied by the sources equals the total $I^2R$ dissipated (a source being charged counts as receiving power).

## Worked example: two sources

![Circuit for the Kirchhoff worked example: three branches between X (top) and Y (bottom), a 6.0 V battery with 2.0 ohms, a 4.0 V battery with 4.0 ohms, and a 6.0 ohm resistor; the currents are I1 = 0.818 A and I3 = 0.727 A, with I2 = −0.091 A, negative because current actually flows down through the 4.0 V battery.](media:diagrams/kirchhoff-two-batteries-circuit.png "Figure: the three-branch circuit with the currents from the worked solution")

:::worked-solution[Two batteries supplying one resistor]
Three branches connect two points X (top) and Y (bottom). Branch 1: a $6.0\ \text{V}$ battery (positive terminal towards X) in series with $2.0\ \Omega$. Branch 2: a $4.0\ \text{V}$ battery (positive terminal towards X) in series with $4.0\ \Omega$. Branch 3: a $6.0\ \Omega$ resistor. The batteries have negligible internal resistance. Find the current in each branch.

1. Let $I_1$ flow up branch 1 to X, $I_2$ up branch 2 to X, and $I_3$ down branch 3 from X to Y. First law at X: $I_3 = I_1 + I_2$.
2. Loop through branches 1 and 3: $6.0 = 2.0I_1 + 6.0I_3$.
3. Loop through branches 2 and 3: $4.0 = 4.0I_2 + 6.0I_3$.
4. A quicker route: let the potential of X above Y be $V$. Then $I_1 = \dfrac{6.0 - V}{2.0}$, $I_2 = \dfrac{4.0 - V}{4.0}$, $I_3 = \dfrac{V}{6.0}$. Substituting into $I_1 + I_2 = I_3$ and multiplying by 12: $6(6.0 - V) + 3(4.0 - V) = 2V$, so $48 = 11V$ and $V = 4.36\ \text{V}$.
5. $I_1 = \dfrac{6.0 - 4.36}{2.0} = 0.818\ \text{A}$; $I_2 = \dfrac{4.0 - 4.36}{4.0} = -0.0909\ \text{A}$; $I_3 = \dfrac{4.36}{6.0} = 0.727\ \text{A}$.
6. $I_2$ is negative: $0.0909\ \text{A}$ actually flows **down** through the $4.0\ \text{V}$ battery, into its positive terminal. The $6.0\ \text{V}$ battery is charging it.
7. Check the first law: $0.818 - 0.0909 = 0.727\ \text{A}$.
:::

:::worked-solution[Energy balance for the same circuit]
1. Power from the $6.0\ \text{V}$ battery $= EI = 6.0 \times 0.818 = 4.91\ \text{W}$.
2. Power taken in by the $4.0\ \text{V}$ battery (being charged) $= 4.0 \times 0.0909 = 0.364\ \text{W}$.
3. Net power from sources $= 4.91 - 0.364 = 4.55\ \text{W}$.
4. Power dissipated $= 0.818^2 \times 2.0 + 0.0909^2 \times 4.0 + 0.727^2 \times 6.0 = 1.34 + 0.033 + 3.17 = 4.55\ \text{W}$. The balance confirms the solution.
:::

## Sources in series and parallel

Cells in series **aiding** add their e.m.f.s and their internal resistances; a cell connected **opposing** the others subtracts its e.m.f. but still adds its internal resistance. Identical cells in parallel give the e.m.f. of one cell with the internal resistance divided by the number of cells, which lets them supply a larger current. Cells with different e.m.f.s should not be connected in parallel: the higher one drives a current through the lower one, wasting energy, exactly as in the worked example.

## Real meters

A real voltmeter has a large but finite resistance, so it draws some current and lowers the p.d. it is measuring, especially across high resistances. A real ammeter has a small resistance, which slightly reduces the current in the branch where it is placed.

:::worked-solution[A voltmeter loading a circuit]
Two resistors, $100\ \text{k}\Omega$ (top) and $100\ \text{k}\Omega$ (bottom), are in series across a $10\ \text{V}$ supply. A voltmeter of resistance $200\ \text{k}\Omega$ is connected across the bottom resistor.

1. Without the meter, the p.d. across the bottom resistor would be $5.00\ \text{V}$.
2. With the meter: bottom resistor $\parallel$ meter $= \dfrac{100 \times 200}{300} = 66.7\ \text{k}\Omega$.
3. Reading $= 10 \times \dfrac{66.7}{100 + 66.7} = 4.00\ \text{V}$, 20% below the true value.
4. A voltmeter's resistance should be much larger (at least about 100 times) than the resistance it is connected across.
:::

## Common mistakes

:::mistake{title="Inconsistent signs"}
Pick a direction for each current and a direction round each loop, and apply the sign convention every time. Changing convention half-way through a loop is the commonest source of wrong answers.
:::

:::mistake{title="Rejecting a negative answer"}
A negative current is not an error; it tells you the actual direction. Do not "correct" it by changing a sign in your equations.
:::

:::mistake{title="Too many unknowns"}
Use the first law to express one current in terms of the others before writing loop equations; otherwise you will have more unknowns than equations.
:::

## Exam tips

:::exam-tip{title="Set out the working"}
Write the junction equation, then each loop equation with the loop named ("loop ABCD"). Examiners award marks for correct equations even if the algebra slips.
:::

:::exam-tip{title="Explain a meter's effect"}
For *explain why the voltmeter reading is less than expected*: the meter's finite resistance in parallel lowers the combined resistance of that section, so it takes a smaller share of the supply p.d.
:::

:::exam-tip{title="Which papers"}
Two-source and meter-loading problems appear in ZIMSEC Paper 2 and Cambridge Paper 2, and in multiple-choice form in ZIMSEC Paper 1 and Cambridge Paper 1.
:::

## Summary

:::summary
- Label branch currents, use the first law at junctions, then write one loop equation per remaining unknown.
- Sign convention: e.m.f. positive from − to + in the loop direction; $IR$ positive along the assumed current.
- A negative current flows opposite to the assumed direction; a source with current driven into its positive terminal is being charged.
- Check with an unused loop and an energy balance.
- Real voltmeters (finite resistance) read low across large resistances; real ammeters reduce the current slightly.
:::
