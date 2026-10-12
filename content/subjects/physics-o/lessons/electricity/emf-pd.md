---
{
  "key": "electricity.emf-pd",
  "title": "E.m.f. and potential difference",
  "summary": "Define e.m.f. and potential difference as energy transferred per unit charge, use E = W/Q and V = W/Q, and use voltmeters correctly.",
  "concepts": ["phys.electricity.emf-pd"],
  "objectives": ["cambridge/igcse/physics:4.2.3.1", "cambridge/igcse/physics:4.2.3.2", "cambridge/igcse/physics:4.2.3.3", "cambridge/igcse/physics:4.2.3.4", "cambridge/igcse/physics:4.2.3.5", "cambridge/igcse/physics:4.2.3.6", "cambridge/igcse/physics:4.2.3.7", "zimsec/o-level/physics:11.2.1", "zimsec/o-level/physics:11.2.2", "zimsec/o-level/physics:11.3.2", "zimsec/o-level/physics:11.3.3"],
  "estimatedMinutes": 25
}
---
## Introduction

A $1.5\ \text{V}$ torch cell and a $12\ \text{V}$ car battery can both push charge round a circuit, but the car battery gives each coulomb of charge eight times as much energy. The **volt** measures energy per unit charge. Two quantities are measured in volts: the **e.m.f.** of a source and the **potential difference** across a component.

## Key definitions

:::definition{term="Electromotive force (e.m.f.), E"}
The electrical work done by a source in moving unit charge around a complete circuit. Unit: volt (V).
:::

:::definition{term="Potential difference (p.d.), V"}
The work done by unit charge passing through a component (the energy transferred from electrical energy to other forms per coulomb). Unit: volt (V).
:::

:::keyfact
$1\ \text{V} = 1\ \text{J/C}$: one volt means one joule of energy for each coulomb of charge.
:::

## E.m.f. and p.d. compared

- **E.m.f.** describes a **source** (cell, battery, generator, solar panel): energy is given **to** the charges.
- **P.d.** describes a **component** (lamp, resistor, motor): energy is transferred **from** the charges to other stores, such as thermal energy and light.

:::formula{name="E.m.f. and potential difference (Cambridge Supplement)"}
$$
E = \frac{W}{Q} \qquad V = \frac{W}{Q}
$$
where $W$ is the work done (energy transferred) in joules and $Q$ is the charge in coulombs.
:::

:::worked-solution[Energy from a battery]
A $9.0\ \text{V}$ battery drives $20\ \text{C}$ of charge round a circuit.

1. $W = EQ = 9.0 \times 20 = 180\ \text{J}$.
2. The battery transfers $180\ \text{J}$ of energy to the charge.
:::

:::worked-solution[Charge through a lamp]
A lamp has a p.d. of $12\ \text{V}$ across it and transfers $600\ \text{J}$ of energy.

1. $Q = \dfrac{W}{V} = \dfrac{600}{12} = 50\ \text{C}$.
:::

## Measuring p.d. with a voltmeter

A **voltmeter** measures the p.d. between two points.

- Connect the voltmeter **in parallel** with (across) the component, one lead on each side of it.
- A voltmeter connected across a cell, with no current drawn, reads the cell's e.m.f.
- As with ammeters, connect the positive terminal towards the positive side, check analogue zero errors, and choose the range that gives the largest reading without going off the scale. A digital voltmeter should be started on its highest range.

:::example{title="Setting up the meters"}
To find the p.d. across a lamp and the current through it, connect a cell, a switch, the lamp and an ammeter in a **series** loop. Then connect a voltmeter directly across the lamp's two terminals, in **parallel** with it. The voltmeter does not change the current much, because it has a very high resistance.
:::

## P.d.s in a series circuit

In a series circuit, the energy given to each coulomb by the source is shared between the components, so the p.d.s across them **add up** to the e.m.f. (ignoring any losses inside the source). For example, a lamp and a resistor in series with a $6.0\ \text{V}$ battery might have $4.0\ \text{V}$ and $2.0\ \text{V}$ across them.

![Circuit: a 6.0 V battery in series with a lamp and a resistor; a voltmeter across each reads 4.0 V and 2.0 V, so the p.d.s across the components add up to the 6.0 V e.m.f.](media:diagrams/series-pd-add-up.png "Figure: in series the p.d.s add up to the e.m.f.")

## Common mistakes

:::mistake{title="Voltage flows"}
Current flows through a component; p.d. is **across** it, between two points. Say "the p.d. across the lamp", not "the voltage through it".
:::

:::mistake{title="Voltmeter in series"}
A voltmeter in series has such a high resistance that almost no current flows. Always connect it in parallel.
:::

## Exam tips

:::exam-tip
Learn the definitions word for word in meaning: e.m.f. is work done **by the source** per unit charge **around a complete circuit**; p.d. is work done per unit charge **through a component**.
:::

:::exam-tip
The units J/C and V are the same; questions often ask you to show this.
:::

## Summary

:::summary
- E.m.f.: work done by a source per unit charge round a complete circuit, $E = \dfrac{W}{Q}$.
- P.d.: work done per unit charge passing through a component, $V = \dfrac{W}{Q}$.
- Both are measured in volts: $1\ \text{V} = 1\ \text{J/C}$.
- Voltmeters are connected in parallel with the component.
- In a series circuit the p.d.s across the components add up to the e.m.f.
:::
