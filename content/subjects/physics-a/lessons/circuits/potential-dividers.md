---
{
  "key": "circuits.potential-dividers",
  "title": "Potential dividers and sensor circuits",
  "summary": "Explain the principle of a potential divider, use V_out = V_in R₂/(R₁ + R₂), obtain a variable output from a potentiometer, design temperature and light sensor circuits with thermistors and LDRs, and account for the loading effect of a connected meter or load.",
  "concepts": ["aphys.circuits.potential-dividers"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Street lights that switch on at dusk, a fire alarm in a Mutare warehouse, and the volume control of a radio all rely on the same simple circuit: two resistances in series that split a supply p.d. into a chosen fraction. When one of the resistances is a sensor, the output p.d. becomes a measurement of the light level or the temperature.

You should know how p.d. is shared between resistors in series, and how the resistance of an LDR and an NTC thermistor depends on light and temperature.

## Key definitions

:::definition{term="Potential divider"}
Two or more resistances connected in series across a supply, so that the supply p.d. is shared between them in proportion to their resistances; the output is taken across one of them.
:::

:::definition{term="Potentiometer (as a variable potential divider)"}
A resistor with a sliding contact connected across a supply, so that the p.d. between the slider and one end can be varied continuously from zero to the full supply p.d.
:::

:::formula{name="Potential divider output"}
$$
V_{\text{out}} = V_{\text{in}} \times \frac{R_2}{R_1 + R_2}
$$

$V_{\text{out}}$ is the p.d. across $R_2$; $V_{\text{in}}$ is the p.d. across the whole chain. This assumes no current is drawn from the output (an ideal voltmeter or a very high-resistance load).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the principle of the potential divider, the formula and its use with thermistors and LDRs (Cambridge AS 10.3; ZIMSEC Form 5). Cambridge also states that a potential divider can be used to give a variable p.d.
:::

## The principle

The same current $I = \dfrac{V_{\text{in}}}{R_1 + R_2}$ passes through both resistors, so the p.d. across $R_2$ is $IR_2 = V_{\text{in}}\dfrac{R_2}{R_1 + R_2}$. Equivalently, the p.d.s are in the ratio of the resistances: $\dfrac{V_1}{V_2} = \dfrac{R_1}{R_2}$. Doubling both resistors leaves the output unchanged: only their **ratio** matters, though the size affects how much current is wasted and how easily the output is loaded.

![Potential divider: a 9.0 V battery across a 4.7 kΩ resistor in series with a 2.2 kΩ resistor; the output taken across the 2.2 kΩ resistor is 9.0 × 2.2/6.9 = 2.87 V, and the other resistor has 6.13 V across it.](media:diagrams/potential-divider-circuit.png "Figure: the supply p.d. divides in proportion to resistance; the output is taken across R₂")

:::worked-solution[A fixed divider]
A $9.0\ \text{V}$ battery of negligible internal resistance is connected across a $4.7\ \text{k}\Omega$ resistor in series with a $2.2\ \text{k}\Omega$ resistor. Find the p.d. across the $2.2\ \text{k}\Omega$ resistor.

1. $V_{\text{out}} = 9.0 \times \dfrac{2.2}{4.7 + 2.2}$.
2. $V_{\text{out}} = 9.0 \times \dfrac{2.2}{6.9} = 2.87\ \text{V}$.
3. The other resistor has $9.0 - 2.87 = 6.13\ \text{V}$ across it.
:::

## Variable output: rheostat or potentiometer?

A **rheostat** (variable resistor in series with a load) can reduce the current and the p.d. across the load, but never to zero. A **potentiometer** connected across the supply, with the load between the slider and one end, gives any p.d. from zero to the full supply. This is why the potentiometer arrangement is used to obtain $I$-$V$ characteristics from zero.

## Sensor circuits

Replace one resistor with a sensor whose resistance changes:

| Sensor and position | As the condition increases | $V_{\text{out}}$ across the fixed resistor | $V_{\text{out}}$ across the sensor |
|---|---|---|---|
| NTC thermistor | temperature rises → $R$ falls | rises | falls |
| LDR | light intensity rises → $R$ falls | rises | falls |

To design a circuit, decide what should happen and work backwards. For a **heat alarm** that needs a rising output as it gets hotter, take the output across the **fixed** resistor with the thermistor as the other half. For a **dark-activated** street light that needs a rising output as it gets darker, take the output across the **LDR** itself (its resistance rises in the dark).

:::worked-solution[A thermistor heat sensor]
A $12\ \text{V}$ supply is connected across an NTC thermistor in series with a $3.0\ \text{k}\Omega$ resistor; the output is taken across the fixed resistor. The thermistor's resistance is $5.0\ \text{k}\Omega$ at $20\ ^\circ\text{C}$ and $1.2\ \text{k}\Omega$ at $60\ ^\circ\text{C}$.

1. At $20\ ^\circ\text{C}$: $V_{\text{out}} = 12 \times \dfrac{3.0}{5.0 + 3.0} = 4.5\ \text{V}$.
2. At $60\ ^\circ\text{C}$: $V_{\text{out}} = 12 \times \dfrac{3.0}{1.2 + 3.0} = 8.57\ \text{V}$.
3. The output rises with temperature, so it could switch on an alarm or a fan when it passes a set value.
:::

The fixed resistor sets the **sensitivity**: the output changes most rapidly when the fixed resistance is comparable to the sensor's resistance in the range of interest. Replacing the fixed resistor with a variable resistor lets the user set the temperature or light level at which a device switches.

## Loading

Connecting a load (a meter, a lamp or another circuit) across the output places it **in parallel** with $R_2$. The combined resistance of that section falls, so its share of the supply p.d. falls. The formula above then overestimates the output.

:::worked-solution[Loading a divider]
Two $10\ \text{k}\Omega$ resistors divide a $6.0\ \text{V}$ supply. A $10\ \text{k}\Omega$ load is connected across the lower resistor.

1. Unloaded output $= 3.0\ \text{V}$.
2. Lower section: $10\ \text{k}\Omega \parallel 10\ \text{k}\Omega = 5.0\ \text{k}\Omega$.
3. Loaded output $= 6.0 \times \dfrac{5.0}{10 + 5.0} = 2.0\ \text{V}$.
:::

To keep loading small, the load resistance should be much larger than $R_2$; for this reason sensor dividers often feed an amplifier with a very high input resistance. Smaller divider resistances reduce loading but waste more current, which matters in battery-powered devices.

## Common mistakes

:::mistake{title="Using the wrong resistor on top"}
$V_{\text{out}}$ uses the resistance the output is taken **across** in the numerator. Decide that first.
:::

:::mistake{title="Reversing sensor behaviour"}
LDR and NTC thermistor resistances **fall** as light and temperature rise. The p.d. across the sensor therefore falls too.
:::

:::mistake{title="Ignoring loading"}
A low-resistance load across the output is in parallel with $R_2$; recalculate before using the divider formula.
:::

## Exam tips

:::exam-tip{title="Explain a sensor circuit"}
Use a chain: condition changes → sensor resistance changes → its share of the supply p.d. changes → output across the chosen component rises or falls. Name the direction at every step.
:::

:::exam-tip{title="Design questions"}
For *suggest where to place the sensor*, state where the output is taken and justify it from the required direction of change. Quote numbers if data are given.
:::

:::exam-tip{title="Which papers"}
Divider calculations and sensor reasoning appear in ZIMSEC Paper 1 and Cambridge Paper 1 items, and in ZIMSEC Paper 2 and Cambridge Paper 2 structured questions.
:::

## Summary

:::summary
- A potential divider shares $V_{\text{in}}$ in the ratio of the resistances: $V_{\text{out}} = V_{\text{in}}R_2/(R_1 + R_2)$.
- A potentiometer gives a variable p.d. from zero to the full supply; a series rheostat cannot reach zero.
- With an NTC thermistor or LDR, the output across the fixed resistor rises as temperature or light rises; across the sensor it falls.
- A load across the output is in parallel with $R_2$ and lowers the output (loading).
- Use a load resistance much larger than $R_2$, or a high-input-resistance amplifier.
:::
