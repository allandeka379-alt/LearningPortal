---
{
  "key": "electricity.resistance-iv",
  "title": "Resistance, Ohm's law and I-V characteristics",
  "summary": "Define resistance and the ohm, state Ohm's law, and interpret the I-V characteristics of a metallic conductor, a filament lamp and a semiconductor diode, together with the behaviour of LDRs and NTC thermistors and the experiment used to obtain a characteristic.",
  "concepts": ["aphys.electricity.resistance-iv"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A street lamp in Harare switches itself on at dusk, a geyser thermostat senses the water temperature, and the charger for a phone turns alternating current into direct current. Each of these depends on a component whose current does not simply rise in proportion to the p.d. across it. To understand them you need a precise idea of resistance and a way to picture how each component behaves: its current-voltage ($I$-$V$) characteristic.

You should know that $I = \Delta Q/\Delta t$ and that p.d. is energy transferred per unit charge. Resistivity, which explains how the shape and material of a conductor set its resistance, follows in the next lesson.

## Key definitions

:::definition{term="Resistance"}
The ratio of the potential difference across a component to the current in it: $R = \dfrac{V}{I}$.
:::

:::definition{term="The ohm"}
The resistance of a component in which a current of one ampere flows when the potential difference across it is one volt: $1\ \Omega = 1\ \text{V A}^{-1}$.
:::

:::definition{term="Ohm's law"}
The current in a conductor is directly proportional to the potential difference across it, provided that the temperature and other physical conditions remain constant.
:::

:::formula{name="Resistance"}
$$
R = \frac{V}{I}
$$

$R$ in Ω, $V$ in V, $I$ in A. This defines resistance for **any** component at any point on its characteristic, whether or not it obeys Ohm's law.
:::

:::keyfact{title="Typical values to learn"}
A silicon diode conducts appreciably in the forward direction above a threshold of about $0.6$ to $0.7\ \text{V}$ and passes almost no current in reverse bias. The resistance of an LDR falls as the light intensity increases; the resistance of an NTC thermistor falls as its temperature rises.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the definition of resistance, Ohm's law and the $I$-$V$ characteristics of a metallic conductor at constant temperature, a filament lamp and a semiconductor diode, plus the LDR and NTC thermistor (Cambridge AS 9.3 and 10.3; ZIMSEC Form 5).
:::

## Ohmic conductors

A metal wire kept at constant temperature has an $I$-$V$ graph that is a **straight line through the origin**, in both directions. The ratio $V/I$ is the same at every point, so its resistance is constant: it is an ohmic conductor. Reversing the p.d. simply reverses the current, so the graph passes symmetrically through the third quadrant.

Note that resistance is $V/I$ at a point, **not** the gradient of the graph. For an ohmic conductor the two happen to agree ($R = 1/\text{gradient}$ when $I$ is plotted against $V$), which is why students sometimes confuse them.

## The filament lamp

As the current through a tungsten filament increases, the filament heats up. The positive ions of the metal lattice vibrate with larger amplitude, the free electrons collide with them more often, and the resistance increases. The $I$-$V$ graph is a curve through the origin whose gradient **decreases** as $V$ increases, symmetric for reversed p.d.

These readings were taken for a $12\ \text{V}$ vehicle lamp:

| $V\,/\,\text{V}$ | $I\,/\,\text{A}$ | $R = V/I\,/\,\Omega$ |
|---|---|---|
| 1.0 | 0.62 | 1.61 |
| 2.0 | 0.95 | 2.11 |
| 4.0 | 1.30 | 3.08 |
| 6.0 | 1.58 | 3.80 |
| 8.0 | 1.80 | 4.44 |
| 10.0 | 1.98 | 5.05 |
| 12.0 | 2.10 | 5.71 |

The graph of $I$ against $V$ curves over towards the $V$-axis; the resistance rises by a factor of more than three across the range because the filament temperature rises by well over a thousand kelvin.

:::worked-solution[Resistance of a lamp, not the gradient]
Using the table, find the resistance of the lamp at $6.0\ \text{V}$ and at $12.0\ \text{V}$, and show why $1/\text{gradient}$ gives a wrong answer.

1. At $6.0\ \text{V}$: $R = \dfrac{V}{I} = \dfrac{6.0}{1.58} = 3.80\ \Omega$.
2. At $12.0\ \text{V}$: $R = \dfrac{12.0}{2.10} = 5.71\ \Omega$.
3. Between $10.0\ \text{V}$ and $12.0\ \text{V}$ the gradient of $I$ against $V$ is $\dfrac{2.10 - 1.98}{12.0 - 10.0} = 0.060\ \text{A V}^{-1}$; its reciprocal, $16.7\ \Omega$, is **not** the resistance at any point. Always use $V/I$.
:::

## The semiconductor diode

A diode lets current flow easily in one direction only. In **forward bias** almost no current flows until the p.d. reaches the threshold (about 0.6 V for silicon), after which the current rises very steeply. In **reverse bias** the current is negligible (a few microamperes at most) until a much larger breakdown p.d. is reached.

| $V\,/\,\text{V}$ | $I\,/\,\text{mA}$ |
|---|---|
| −1.00 | 0 |
| 0.00 | 0 |
| 0.20 | 0 |
| 0.40 | 0.01 |
| 0.55 | 0.3 |
| 0.60 | 1.2 |
| 0.65 | 5 |
| 0.70 | 18 |
| 0.75 | 55 |

:::worked-solution[Resistance of a diode at two points]
Using the diode table, compare its resistance at $0.60\ \text{V}$ and at $0.70\ \text{V}$.

1. At $0.60\ \text{V}$: $R = \dfrac{0.60}{1.2 \times 10^{-3}} = 500\ \Omega$.
2. At $0.70\ \text{V}$: $R = \dfrac{0.70}{18 \times 10^{-3}} = 38.9\ \Omega$.
3. A small increase in p.d. above the threshold makes the resistance fall sharply, so a diode is always used with a series resistor to limit the current.
:::

## LDRs and NTC thermistors

Both are made from semiconducting materials. Light falling on an **LDR** frees more charge carriers, so its resistance falls as the light intensity rises: typically from around a megaohm in darkness to a few hundred ohms in bright light. Raising the temperature of an **NTC** (negative temperature coefficient) **thermistor** also frees more carriers, so its resistance falls as temperature rises. At a fixed light level or temperature each behaves much like an ohmic resistor; their use in sensing circuits is covered with potential dividers.

## Obtaining a characteristic

1. Connect the component in series with an ammeter, and connect a voltmeter in parallel across the component only.
2. Supply the p.d. from a potential divider (a rheostat connected across the supply), so the p.d. can be varied smoothly from zero.
3. Record $I$ for at least eight values of $V$, then reverse the connections to the component to take negative values.
4. For a diode, include a protective resistor in series, take closely spaced readings around the threshold, and use a milliammeter.
5. For a lamp, wait for each reading to settle (the filament takes a moment to reach its new temperature). Switch off between readings for a metal wire so it does not heat up.

## Common mistakes

:::mistake{title="Using the gradient for resistance"}
Resistance is $V/I$ at the point, not the gradient of the $I$-$V$ graph and not its reciprocal (except for an ohmic conductor).
:::

:::mistake{title="Stating Ohm's law without the condition"}
"Current is proportional to p.d." is incomplete: add "provided the temperature (and other physical conditions) stays constant".
:::

:::mistake{title="Saying a lamp obeys Ohm's law at low current"}
A lamp is non-ohmic throughout; the curve is only approximately straight near the origin.
:::

:::mistake{title="Reversing the LDR and thermistor behaviour"}
More light means **less** resistance for an LDR; higher temperature means **less** resistance for an NTC thermistor.
:::

## Exam tips

:::exam-tip{title="Sketch described in words"}
When asked to sketch a characteristic, describe the axes, the origin, the shape (straight, curving towards the $V$-axis, or zero then steep), and what happens for negative $V$.
:::

:::exam-tip{title="Explain the lamp curve"}
Chain the reasoning: larger current → filament hotter → lattice ions vibrate more → more frequent collisions with electrons → resistance increases → gradient of $I$-$V$ graph decreases.
:::

:::exam-tip{title="Which papers"}
Characteristic graphs feature in ZIMSEC Paper 1 and Cambridge Paper 1 multiple-choice items, ZIMSEC Paper 2 and Cambridge Paper 2 structured questions, and the practical papers (Cambridge Paper 3, ZIMSEC Paper 4) for the experiment.
:::

## Summary

:::summary
- Resistance $R = V/I$; $1\ \Omega = 1\ \text{V A}^{-1}$. Use $V/I$ at a point, never the gradient.
- Ohm's law: $I \propto V$ at constant temperature; a metal wire at constant temperature is ohmic.
- Filament lamp: resistance rises with temperature, so the $I$-$V$ curve bends towards the $V$-axis.
- Diode: almost no current in reverse bias; conducts above about 0.6-0.7 V in forward bias.
- LDR resistance falls as light intensity rises; NTC thermistor resistance falls as temperature rises.
:::
