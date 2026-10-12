---
{
  "key": "electricity.series-parallel",
  "title": "Series and parallel circuits",
  "summary": "Use the rules for current, p.d. and resistance in series and parallel circuits, calculate combined e.m.f. and resistance, and explain why house lamps are wired in parallel.",
  "concepts": ["phys.electricity.series-parallel"],
  "objectives": ["cambridge/igcse/physics:4.3.2.1", "cambridge/igcse/physics:4.3.2.2", "cambridge/igcse/physics:4.3.2.3", "cambridge/igcse/physics:4.3.2.4", "cambridge/igcse/physics:4.3.2.5", "cambridge/igcse/physics:4.3.2.6", "cambridge/igcse/physics:4.3.2.7", "cambridge/igcse/physics:4.3.2.8", "cambridge/igcse/physics:4.3.2.9", "cambridge/igcse/physics:4.3.2.10", "zimsec/o-level/physics:11.3.3", "zimsec/o-level/physics:11.4.3", "zimsec/o-level/physics:11.4.4"],
  "estimatedMinutes": 30
}
---
## Introduction

Decorative lights on a string, where one broken bulb makes the whole string go dark, are wired in **series**. The lights and sockets in a house, which can be switched on and off separately, are wired in **parallel**. The two arrangements follow different rules for current, potential difference and resistance.

## Key definitions

:::definition{term="Series circuit"}
Components connected one after another in a single loop, so the same current passes through each.
:::

:::definition{term="Parallel circuit"}
Components connected in separate branches between the same two points, so each has the same p.d. across it.
:::

:::definition{term="Junction"}
A point where a circuit divides into branches or where branches join.
:::

## Series circuits

- The **current is the same** at every point.
- The **p.d.s add up**: the p.d.s across the components add up to the total p.d. (the e.m.f. of the source).
- The **resistances add up**:

:::formula{name="Resistors in series"}
$$
R = R_1 + R_2 + R_3 + \dots
$$
:::

- **Cells in series**: their e.m.f.s add (a cell connected the wrong way round subtracts).

![Series circuit: a 6.0 V battery with 4.0 ohm and 8.0 ohm resistors in one loop. The same 0.50 A flows everywhere, and the p.d.s of 2.0 V and 4.0 V add up to 6.0 V.](media:diagrams/series-circuit-example.png "Figure: current is the same in series; p.d.s add")

:::worked-solution[A series circuit]
A $4.0\ \Omega$ resistor and an $8.0\ \Omega$ resistor are connected in series to a $6.0\ \text{V}$ battery.

1. Total resistance: $R = 4.0 + 8.0 = 12\ \Omega$.
2. Current: $I = \dfrac{V}{R} = \dfrac{6.0}{12} = 0.50\ \text{A}$, the same through both resistors.
3. P.d.s: $V_1 = 0.50 \times 4.0 = 2.0\ \text{V}$ and $V_2 = 0.50 \times 8.0 = 4.0\ \text{V}$.
4. Check: $2.0 + 4.0 = 6.0\ \text{V}$, the battery's e.m.f.
:::

## Parallel circuits

- The **p.d. across each branch is the same** (equal to the supply p.d. when the branches are connected directly across it).
- The **current from the source is the sum** of the branch currents, so it is larger than the current in any one branch.
- The combined resistance of resistors in parallel is **less than the smallest** individual resistance: adding a branch gives the current another path.

:::formula{name="Two resistors in parallel (Cambridge Supplement; ZIMSEC)"}
$$
\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}
$$
:::

![Parallel circuit: a 12 V supply connected directly across a 6.0 ohm and a 3.0 ohm resistor. Each branch has 12 V across it; the branch currents are 2.0 A and 4.0 A, which add to the 6.0 A supply current. Combined resistance 2.0 ohms.](media:diagrams/parallel-circuit-example.png "Figure: same p.d. in each branch; branch currents add")

:::worked-solution[Two resistors in parallel]
A $6.0\ \Omega$ resistor and a $3.0\ \Omega$ resistor are connected in parallel to a $12\ \text{V}$ supply.

1. $\dfrac{1}{R} = \dfrac{1}{6.0} + \dfrac{1}{3.0} = \dfrac{1}{6.0} + \dfrac{2}{6.0} = \dfrac{3}{6.0}$, so $R = 2.0\ \Omega$ (less than $3.0\ \Omega$).
2. Branch currents: $I_1 = \dfrac{12}{6.0} = 2.0\ \text{A}$ and $I_2 = \dfrac{12}{3.0} = 4.0\ \text{A}$.
3. Supply current: $I = 2.0 + 4.0 = 6.0\ \text{A}$. Check: $\dfrac{12}{2.0} = 6.0\ \text{A}$.
:::

## Currents at a junction (Cambridge Supplement; ZIMSEC)

:::keyfact
The total current flowing into a junction equals the total current flowing out of it. This is because **charge is conserved**: charge cannot be created or destroyed, or pile up at the junction.
:::

For example, if $0.9\ \text{A}$ flows into a junction and one branch carries $0.3\ \text{A}$, the other branch must carry $0.6\ \text{A}$.

## Why lamps in a house are wired in parallel

- Each lamp gets the **full mains p.d.**, so it works at its normal brightness.
- Each lamp can be **switched on and off independently**.
- If one lamp **fails**, the others stay on, because their branches are still complete.

In series, the lamps would share the mains p.d. and glow dimly, one switch would control them all, and one broken filament would put them all out.

## Common mistakes

:::mistake{title="Parallel resistance is a sum"}
In parallel, the combined resistance is **less** than either resistor. Adding $\dfrac{1}{R}$ values gives $\dfrac{1}{R}$: remember to invert at the end.
:::

:::mistake{title="Current is shared in series"}
In series, the current is the same everywhere; it is the **p.d.** that is shared.
:::

## Exam tips

:::exam-tip
Before calculating, label the circuit: which components are in series (same current) and which in parallel (same p.d.)?
:::

:::exam-tip
Check answers using the rules: series p.d.s must add up to the supply; branch currents must add up to the supply current.
:::

## Summary

:::summary
- Series: same current everywhere; p.d.s add to the total; $R = R_1 + R_2$; cell e.m.f.s add.
- Parallel: same p.d. across each branch; branch currents add to the supply current.
- Two resistors in parallel have less resistance than either; $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}$.
- Current into a junction equals current out, because charge is conserved.
- House lamps are in parallel: full p.d., independent switching, and one failure does not affect the rest.
:::
