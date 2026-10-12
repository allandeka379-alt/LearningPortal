---
{
  "key": "capacitance.energy-stored",
  "title": "Energy stored in a capacitor",
  "summary": "Show that the energy stored in a capacitor is the area under its p.d.-charge graph, use W = ½QV = ½CV² = Q²/2C for camera flashes, defibrillators and backup supplies, and explain why half the energy supplied by a battery is dissipated when a capacitor is charged.",
  "concepts": ["aphys.capacitance.energy-stored"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A camera flash needs a burst of power far larger than its small battery can deliver directly. The battery slowly charges a capacitor over a second or two; the capacitor then dumps its stored energy through the flash tube in about a millisecond. Hospital defibrillators work the same way on a larger scale. To design such devices you need to know how much energy a charged capacitor holds.

You should know $C = Q/V$, that p.d. is energy transferred per unit charge, and that the area under a graph can represent a physical quantity.

## Key definitions

:::definition{term="Energy stored in a capacitor"}
The work done in separating the charges on the plates while charging, which is stored as electric potential energy and can be recovered when the capacitor discharges.
:::

:::formula{name="Energy stored"}
$$
W = \tfrac{1}{2}QV = \tfrac{1}{2}CV^2 = \frac{Q^2}{2C}
$$

$W$ in J, $Q$ in C, $V$ in V, $C$ in F.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require $W = \tfrac{1}{2}QV$ from the area under a p.d.-charge graph and its use in the equivalent forms (Cambridge A Level 19.2, Paper 4; ZIMSEC Form 5). The energy lost when charging from a battery is an extension.
:::

## Deriving the energy from the graph

While a capacitor charges, the p.d. across it rises in proportion to the charge, $V = Q/C$. Moving a small extra charge $\Delta Q$ onto the plates when the p.d. is $V$ requires work $\Delta W = V\Delta Q$, the area of a thin strip under the graph of $V$ against $Q$.

1. Adding the strips from zero to the final charge $Q$ gives the total area under the graph.
2. The graph is a straight line through the origin, so the area is a triangle.
3. $W = \tfrac{1}{2} \times Q \times V$.
4. Substituting $Q = CV$ gives $W = \tfrac{1}{2}CV^2$; substituting $V = Q/C$ gives $W = \dfrac{Q^2}{2C}$.

The factor $\tfrac{1}{2}$ arises because the early charge is moved through a small p.d. and only the last charge is moved through the full p.d.; the average p.d. during charging is $V/2$.

These values are for a $2200\ \mu\text{F}$ capacitor:

| $V\,/\,\text{V}$ | $Q\,/\,\text{mC}$ | $W = \tfrac{1}{2}QV\,/\,\text{mJ}$ |
|---|---|---|
| 0.0 | 0.00 | 0.00 |
| 2.0 | 4.40 | 4.40 |
| 4.0 | 8.80 | 17.6 |
| 6.0 | 13.2 | 39.6 |
| 8.0 | 17.6 | 70.4 |
| 10.0 | 22.0 | 110 |
| 12.0 | 26.4 | 158 |

The charge rises linearly with p.d. but the energy rises with the **square** of the p.d.: doubling $V$ from 6.0 V to 12.0 V multiplies the energy by four.

## Using the three forms

Choose the form that uses the quantities you know: $\tfrac{1}{2}CV^2$ when $C$ and $V$ are given (most common), $\tfrac{1}{2}QV$ when the charge is known, $\dfrac{Q^2}{2C}$ when the charge is fixed (an isolated capacitor whose plates are moved).

:::worked-solution[A camera flash]
A $150\ \mu\text{F}$ flash capacitor is charged to $330\ \text{V}$ and discharged through the flash tube in $1.0\ \text{ms}$.

1. $W = \tfrac{1}{2}CV^2 = \tfrac{1}{2} \times 150 \times 10^{-6} \times 330^2 = 8.17\ \text{J}$.
2. Average power $= \dfrac{W}{t} = \dfrac{8.17}{1.0 \times 10^{-3}} = 8.2 \times 10^{3}\ \text{W}$, from a battery that could supply only a few watts.
:::

:::worked-solution[A defibrillator]
A defibrillator must store $200\ \text{J}$ in a $32\ \mu\text{F}$ capacitor. Find the charging p.d.

1. $W = \tfrac{1}{2}CV^2$, so $V = \sqrt{\dfrac{2W}{C}}$.
2. $V = \sqrt{\dfrac{2 \times 200}{32 \times 10^{-6}}} = 3.54 \times 10^{3}\ \text{V}$ (3.5 kV).
3. Such p.d.s are dangerous: the capacitor must be discharged safely, through a resistor, before the device is serviced.
:::

## Energy supplied by the battery

A battery of e.m.f. $V$ charging a capacitor moves charge $Q$ through its full e.m.f., so it supplies energy $QV$. Only $\tfrac{1}{2}QV$ ends up stored. The other half is dissipated as thermal energy in the resistance of the circuit (and some is radiated), **whatever the value of that resistance**: a smaller resistance gives a larger current for a shorter time, but the same energy loss.

The graphs show why. Plot the battery's e.m.f. against the charge it moves: a horizontal line at height $E$, so the energy it supplies is the rectangle $QE$. The p.d. across the capacitor rises along a straight line from zero to $E$, so the energy stored is the triangle under that line, exactly half the rectangle. The difference between the two areas is the energy converted to thermal energy while the current flows. Only if the capacitor were charged in many tiny steps, each with the supply p.d. barely above the capacitor's p.d., would the loss become small.

![Graphs for charging a 2200 µF capacitor from a 12 V battery: the capacitor p.d. rises along a straight line from 0 to 12 V as the charge rises to 26.4 mC; the triangle under it is the energy stored, 158 mJ, and the rectangle under the battery's 12 V line is the energy supplied, 317 mJ, so half is dissipated.](media:diagrams/capacitor-energy-vq-graph.png "Figure: the triangle is the energy stored; the rectangle is the energy supplied by the battery")

For the $2200\ \mu\text{F}$ capacitor charged to $12\ \text{V}$: charge $= 2200 \times 10^{-6} \times 12 = 0.0264\ \text{C}$; energy from the battery $= 0.0264 \times 12 = 0.317\ \text{J}$; energy stored $= 0.158\ \text{J}$.

:::worked-solution[Energy lost when capacitors share charge]
A $20\ \mu\text{F}$ capacitor charged to $9.0\ \text{V}$ is connected across an identical uncharged capacitor.

1. Energy before $= \tfrac{1}{2} \times 20 \times 10^{-6} \times 9.0^2 = 8.1 \times 10^{-4}\ \text{J}$.
2. Charge is conserved: $180\ \mu\text{C}$ spreads over $40\ \mu\text{F}$, so the common p.d. is $4.5\ \text{V}$.
3. Energy after $= \tfrac{1}{2} \times 40 \times 10^{-6} \times 4.5^2 = 4.05 \times 10^{-4}\ \text{J}$.
4. Half the energy has been dissipated in the connecting wires (and as electromagnetic radiation) during the surge of current.
:::

## Applications

- **Camera flashes and defibrillators**: slow charging, very rapid release, so a very large power.
- **Backup supplies**: a large capacitor (or supercapacitor) keeps a clock or memory running for a short time during a power cut. Its p.d. falls as the energy is used, so the usable energy is less than $\tfrac{1}{2}CV^2$ if the circuit stops working below some minimum p.d.
- **Energy storage comparison**: per kilogram, capacitors store far less energy than rechargeable batteries but can deliver it much faster and survive many more charging cycles.

## Common mistakes

:::mistake{title="Forgetting the half"}
$W = QV$ is the energy supplied by the battery, not the energy stored. Stored energy is $\tfrac{1}{2}QV$.
:::

:::mistake{title="Not squaring V"}
In $\tfrac{1}{2}CV^2$ the p.d. is squared: doubling $V$ quadruples the energy.
:::

:::mistake{title="Unit prefixes"}
Convert µF to F before substituting; a 1000-fold error in $C$ gives a 1000-fold error in energy.
:::

## Exam tips

:::exam-tip{title="Show that and explain"}
For *show that the energy stored is $\tfrac{1}{2}QV$*, sketch-in-words the $V$-$Q$ graph (straight line through the origin), state that work = area under it, and find the triangle's area. For *explain why only half the energy is stored*, state that the battery supplies $QV$ and the rest is dissipated in the resistance of the circuit.
:::

:::exam-tip{title="Which papers"}
Energy stored appears in Cambridge Paper 4 and in ZIMSEC Papers 1 and 2, often combined with capacitor networks or discharge.
:::

## Summary

:::summary
- Energy stored = area under the $V$-$Q$ graph = $\tfrac{1}{2}QV$.
- Equivalent forms: $W = \tfrac{1}{2}CV^2 = Q^2/2C$; energy is proportional to $V^2$.
- A battery charging a capacitor supplies $QV$; half is stored, half is dissipated in the circuit resistance.
- When charged and uncharged capacitors share charge, charge is conserved but energy is lost.
- Capacitors release energy quickly: flashes, defibrillators, backup supplies.
:::
