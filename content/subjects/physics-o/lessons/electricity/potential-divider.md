---
{
  "key": "electricity.potential-divider",
  "title": "Potential dividers and sensors",
  "summary": "Explain how two resistors in series share a p.d., use R1/R2 = V1/V2, describe a variable potential divider, and use thermistors and LDRs in sensing circuits.",
  "concepts": ["phys.electricity.potential-divider"],
  "objectives": ["cambridge/igcse/physics:4.3.3.1", "cambridge/igcse/physics:4.3.3.2", "cambridge/igcse/physics:4.3.3.3", "zimsec/o-level/physics:14.4.3", "zimsec/o-level/physics:14.4.4"],
  "estimatedMinutes": 30
}
---
## Introduction

A street light that switches on by itself at dusk, a fire alarm that sounds when a room gets hot, and the volume knob on a radio all use the same idea: a **potential divider**, in which two resistances in series share the p.d. of a supply. If one of them is a sensor whose resistance changes, the output p.d. changes with the conditions.

## Key definitions

:::definition{term="Potential divider"}
Two (or more) resistors in series across a supply, used to give an output p.d. that is a fraction of the supply p.d.
:::

:::definition{term="Thermistor (NTC)"}
A resistor whose resistance decreases as its temperature increases.
:::

:::definition{term="Light-dependent resistor (LDR)"}
A resistor whose resistance decreases as the light falling on it gets brighter.
:::

## Sharing the p.d.

![Potential divider: a 2.0 kilohm and a 1.0 kilohm resistor in series across a 9.0 V supply. The p.d.s are in the ratio of the resistances, 6.0 V across the larger resistor and 3.0 V across the smaller, adding to 9.0 V.](media:diagrams/potential-divider-9v.png "Figure: a potential divider shares 9.0 V in the ratio 2 : 1")

:::keyfact
For a fixed current, the p.d. across a conductor **increases** as its resistance increases ($V = IR$). In a series pair, the larger resistor gets the larger share of the supply p.d.
:::

:::formula{name="Potential divider (Cambridge Supplement)"}
$$
\frac{R_1}{R_2} = \frac{V_1}{V_2}
$$
where $V_1$ and $V_2$ are the p.d.s across resistors $R_1$ and $R_2$ in series.
:::

:::worked-solution[Sharing 9.0 V]
Resistors of $2.0\ \text{k}\Omega$ and $1.0\ \text{k}\Omega$ are connected in series across a $9.0\ \text{V}$ supply.

1. The ratio of resistances is $2.0 : 1.0$, so the p.d.s are in the ratio $2 : 1$.
2. $V_1 = \dfrac{2}{3} \times 9.0 = 6.0\ \text{V}$ and $V_2 = \dfrac{1}{3} \times 9.0 = 3.0\ \text{V}$.
3. Check: $6.0 + 3.0 = 9.0\ \text{V}$.
:::

:::worked-solution[Finding a resistor]
In a potential divider, $R_1 = 470\ \Omega$ has $1.5\ \text{V}$ across it and $R_2$ has $4.5\ \text{V}$ across it.

1. $\dfrac{R_1}{R_2} = \dfrac{V_1}{V_2}$, so $R_2 = R_1 \times \dfrac{V_2}{V_1} = 470 \times \dfrac{4.5}{1.5}$.
2. $R_2 = 1410\ \Omega \approx 1.4\ \text{k}\Omega$.
:::

## The variable potential divider (Cambridge Supplement; ZIMSEC)

A **potentiometer** is a resistance track with a sliding contact. The whole track is connected across the supply, and the output is taken between one end of the track and the slider. Moving the slider changes how the track's resistance is split, so the output p.d. can be set to **any value from zero up to the full supply p.d.** A volume control works this way. (A variable resistor in series, by contrast, can only reduce the current; it cannot bring the p.d. down to zero.)

## Sensing circuits

Replace one resistor of a potential divider with a sensor:

![Light-sensing potential divider: a fixed resistor in series with an LDR across a 6 V supply, with a voltmeter taking the output across the LDR. In the dark the LDR's resistance is high so its share of the p.d. is high; in bright light it falls.](media:diagrams/potential-divider-ldr.png "Figure: an LDR potential divider gives a high output in the dark")

- **Temperature sensor**: a thermistor in series with a fixed resistor. As the temperature **rises**, the thermistor's resistance **falls**, so its share of the p.d. **falls** and the p.d. across the fixed resistor **rises**.
- **Light sensor**: an LDR in series with a fixed resistor. In **darkness** the LDR's resistance is **high**, so the p.d. across the LDR is **high**.

:::example{title="An automatic security light"}
An LDR and a fixed resistor form a potential divider across a $6\ \text{V}$ supply, and the output is taken across the LDR. In daylight the LDR's resistance is low, so it takes only a small share of the p.d. At dusk its resistance rises sharply, the p.d. across it rises, and that output is used (through a transistor or relay) to switch the lamp on.
:::

:::example{title="A fire alarm"}
A thermistor is placed in series with a fixed resistor, and the alarm circuit monitors the p.d. across the **fixed resistor**. When a fire heats the thermistor, its resistance drops, more of the supply p.d. appears across the fixed resistor, and the alarm is triggered.
:::

## Common mistakes

:::mistake{title="Equal shares"}
The p.d. is shared in proportion to the resistances, not equally, unless the resistors are equal.
:::

:::mistake{title="Which way the sensor changes"}
NTC thermistor: hotter means **lower** resistance. LDR: brighter means **lower** resistance. Then decide which part's p.d. rises.
:::

## Exam tips

:::exam-tip
Reason in steps: condition changes → sensor resistance changes → its share of the p.d. changes → the output changes.
:::

:::exam-tip
Check that the two p.d.s in a potential divider add up to the supply p.d.
:::

## Summary

:::summary
- For a fixed current, a larger resistance has a larger p.d. across it.
- Two resistors in series share the supply p.d. in the ratio of their resistances: $\dfrac{R_1}{R_2} = \dfrac{V_1}{V_2}$.
- A variable potential divider (potentiometer) gives any output from zero to the full supply p.d.
- Thermistor: resistance falls as temperature rises. LDR: resistance falls as light increases.
- Sensors in potential dividers give an output p.d. that changes with temperature or light.
:::
