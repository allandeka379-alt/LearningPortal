---
{
  "key": "electronics.op-amp-properties",
  "title": "The operational amplifier and the comparator",
  "summary": "Describe the properties of an ideal operational amplifier and how real op-amps compare, use V_out = A₀(V⁺ − V⁻) with saturation at the supply voltages, and use an op-amp as a comparator that switches an LED or relay when a sensor reaches a set temperature or light level.",
  "concepts": ["aphys.electronics.op-amp-properties"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A borehole pump in Masvingo that switches off when the tank is full, a greenhouse fan that starts when the air gets too hot, a security light that comes on at dusk: each of these needs a circuit that **compares** a sensor's voltage with a set value and makes a clear decision. The integrated circuit that does this, and that also forms the heart of most amplifiers, is the **operational amplifier** (op-amp). It is a high-gain voltage amplifier built from many transistors on one chip, but you only need to know how it behaves at its terminals.

You should already know potential dividers, the behaviour of thermistors and LDRs, and the idea of a voltage gain. Amplifiers built with feedback are in the next lesson; this lesson covers the op-amp itself and its use **without** feedback.

## Key definitions

:::definition{term="Operational amplifier"}
A high-gain, direct-coupled voltage amplifier with two inputs, an inverting input (−) and a non-inverting input (+), and one output, whose output voltage depends on the difference between the voltages at the two inputs.
:::

:::definition{term="Open-loop gain"}
The voltage gain $A_0$ of the op-amp when no feedback is used: the ratio of the output voltage to the difference between the input voltages, $A_0 = \dfrac{V_{\text{out}}}{V^{+} - V^{-}}$.
:::

:::definition{term="Saturation"}
The state in which the output voltage cannot increase further because it has reached (very nearly) one of the supply voltages; the output is then independent of the size of the input difference.
:::

:::definition{term="Comparator"}
A circuit in which an op-amp without feedback compares two input voltages and gives an output at positive saturation when $V^{+} > V^{-}$ and at negative saturation when $V^{+} < V^{-}$.
:::

:::formula{name="Op-amp output (no feedback)"}
$$
V_{\text{out}} = A_0\,(V^{+} - V^{-})
$$

$V_{\text{out}}$ = output voltage (V), $A_0$ = open-loop gain (no unit), $V^{+}$ and $V^{-}$ = voltages at the non-inverting and inverting inputs (V), all measured from 0 V. Valid only while $|V_{\text{out}}|$ is less than the saturation voltage.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Electronics (op-amps, sensors, logic) is ZIMSEC Form 6 only; it is not in Cambridge 9702 for 2025-2027. The scope here follows standard A-Level practice and is to be confirmed against the ZIMSEC syllabus.
:::

## The terminals and the supply

An op-amp is usually run from a **dual supply**, for example $+12\ \text{V}$, $0\ \text{V}$ and $-12\ \text{V}$. The 0 V line is the reference for every voltage in the circuit; it is not connected to the chip itself in most circuit diagrams, but all inputs and the output are measured from it. The output can therefore swing both positive and negative.

- **Non-inverting input (+):** a rise in $V^{+}$ makes the output rise.
- **Inverting input (−):** a rise in $V^{-}$ makes the output fall.

## Ideal and real op-amps

| Property | Ideal op-amp | Typical general-purpose op-amp (e.g. 741) | Why it matters |
|---|---|---|---|
| Open-loop gain $A_0$ | infinite | about $2 \times 10^{5}$ (at d.c.) | tiny input differences give a full output |
| Input resistance | infinite | about $2\ \text{M}\Omega$ (FET-input types $10^{12}\ \Omega$) | draws no current, so it does not load a sensor or divider |
| Output resistance | zero | about $75\ \Omega$ | output voltage does not fall when a load draws current |
| Bandwidth | infinite | open-loop gain falls above about 10 Hz; gain × bandwidth ≈ 1 MHz | same gain at all signal frequencies |
| Slew rate | infinite | about $0.5\ \text{V}\,\mu\text{s}^{-1}$ | output can change instantly |

The **slew rate** is the maximum rate of change of the output voltage. A real op-amp switching from $-12\ \text{V}$ to $+12\ \text{V}$ at $0.5\ \text{V}\,\mu\text{s}^{-1}$ takes $24 / 0.5 = 48\ \mu\text{s}$, which matters only for fast signals.

## Output, gain and saturation

Because $A_0$ is so large, the output can follow $A_0(V^{+} - V^{-})$ only while the input difference is tiny. With $A_0 = 2.0 \times 10^{5}$ and a $\pm 12\ \text{V}$ supply, the largest difference that keeps the op-amp out of saturation is $12 / (2.0 \times 10^{5}) = 6.0 \times 10^{-5}\ \text{V}$, only $60\ \mu\text{V}$. For anything larger, the output **saturates**: it sits at (nearly) $+12\ \text{V}$ if $V^{+} > V^{-}$ and (nearly) $-12\ \text{V}$ if $V^{+} < V^{-}$. Real op-amps saturate one or two volts inside the supply rails; questions usually tell you to take the saturation voltage as equal to the supply voltage.

:::worked-solution[Output of an op-amp without feedback]
An op-amp with $A_0 = 2.0 \times 10^{5}$ runs from a $\pm 12\ \text{V}$ supply (saturation at $\pm 12\ \text{V}$). $V^{+} = 1.50000\ \text{V}$. Find $V_{\text{out}}$ when (a) $V^{-} = 1.49995\ \text{V}$, (b) $V^{-} = 1.49990\ \text{V}$, (c) $V^{-} = 1.6\ \text{V}$.

1. (a) $V^{+} - V^{-} = 5.0 \times 10^{-5}\ \text{V}$, so $V_{\text{out}} = 2.0 \times 10^{5} \times 5.0 \times 10^{-5} = 10\ \text{V}$ (below 12 V, so valid).
2. (b) $V^{+} - V^{-} = 1.0 \times 10^{-4}\ \text{V}$ would give $20\ \text{V}$, more than the supply, so the op-amp saturates: $V_{\text{out}} = +12\ \text{V}$.
3. (c) $V^{-} > V^{+}$ by $0.1\ \text{V}$: negative saturation, $V_{\text{out}} = -12\ \text{V}$.
:::

A graph of $V_{\text{out}}$ against $(V^{+} - V^{-})$ is a steep straight line through the origin, of gradient $A_0$, between $-60\ \mu\text{V}$ and $+60\ \mu\text{V}$, and flat at $+12\ \text{V}$ and $-12\ \text{V}$ outside that range.

| $(V^{+} - V^{-})\,/\,\mu\text{V}$ | −100 | −60 | −30 | 0 | 30 | 60 | 100 |
|---|---|---|---|---|---|---|---|
| $V_{\text{out}}\,/\,\text{V}$ | −12 | −12 | −6.0 | 0 | 6.0 | 12 | 12 |

The linear region is so narrow that, in practice, an op-amp without feedback is almost always saturated. That is a nuisance for amplifying, but exactly what a **switch** needs.

## The op-amp as a comparator

In a comparator, one input is held at a fixed **reference voltage** from a potential divider, and the other comes from a **sensor** in a second divider. The output is at one saturation level or the other, flipping when the sensor voltage crosses the reference.

**Example circuit (temperature alarm).** A dual $\pm 9\ \text{V}$ supply. The non-inverting input is connected to the junction of a $10\ \text{k}\Omega$ resistor (to $+9\ \text{V}$) and an $8.2\ \text{k}\Omega$ resistor (to 0 V). The inverting input is connected to the junction of a $3.3\ \text{k}\Omega$ resistor (to $+9\ \text{V}$) and an NTC thermistor (to 0 V). An LED and series resistor are connected from the output to 0 V, so the LED lights only when the output is positive.

As the temperature rises, the thermistor's resistance falls, so its share of the 9 V, $V^{-}$, falls. When $V^{-}$ drops below $V^{+}$, the output switches to $+9\ \text{V}$ and the LED lights.

:::worked-solution[Switching temperature of a comparator]
For the circuit above, find $V^{+}$ and the thermistor resistance at which the output switches, then use the table to estimate the switching temperature.

1. $V^{+} = 9.0 \times \dfrac{8.2}{10 + 8.2} = 4.05\ \text{V}$.
2. Switching when $V^{-} = V^{+}$: $9.0 \times \dfrac{R_{\text{th}}}{3.3 + R_{\text{th}}} = 9.0 \times \dfrac{8.2}{18.2}$, so $\dfrac{R_{\text{th}}}{3.3} = \dfrac{8.2}{10}$ and $R_{\text{th}} = 2.71\ \text{k}\Omega$.
3. From the table, $R_{\text{th}}$ passes $2.71\ \text{k}\Omega$ between $35\ ^\circ\text{C}$ and $40\ ^\circ\text{C}$ (about $38\ ^\circ\text{C}$).
:::

| $\theta\,/\,^\circ\text{C}$ | 20 | 25 | 30 | 35 | 40 | 45 |
|---|---|---|---|---|---|---|
| $R_{\text{th}}\,/\,\text{k}\Omega$ | 5.89 | 4.70 | 3.78 | 3.06 | 2.49 | 2.04 |
| $V^{-}\,/\,\text{V}$ | 5.77 | 5.29 | 4.80 | 4.33 | 3.87 | 3.44 |

To change the switching temperature, replace one reference resistor with a **variable resistor**; to make the alarm respond to falling temperature instead, swap the thermistor and the $3.3\ \text{k}\Omega$ resistor, or swap the two inputs. An LDR in place of the thermistor gives a dusk switch.

**Driving outputs.** An LED needs a **series resistor** to limit its current. Two LEDs connected in opposite directions from the output to 0 V show both states (one lights for $+V_{\text{sat}}$, the other for $-V_{\text{sat}}$). A **relay** lets the small op-amp output switch a large current such as a pump motor; a diode in series stops the relay operating on negative output, and a diode across the relay coil protects the op-amp from the large induced e.m.f. when the coil current is switched off. The next lessons develop sensors and output devices in more detail.

## Common mistakes

:::mistake{title="Forgetting saturation"}
$V_{\text{out}} = A_0(V^{+} - V^{-})$ gives values like 20 000 V for a 0.1 V difference. The output can never exceed the supply: state the saturation value.
:::

:::mistake{title="Getting the inputs the wrong way round"}
The output is positive when the **non-inverting** input is higher. Write $V^{+} - V^{-}$, not the other way.
:::

:::mistake{title="Saying the ideal op-amp has infinite output resistance"}
Ideal input resistance is infinite; ideal output resistance is **zero**, so the output voltage does not change with the load.
:::

:::mistake{title="Treating a comparator as an amplifier"}
A comparator's output is either $+V_{\text{sat}}$ or $-V_{\text{sat}}$; it does not give an output proportional to the input.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests the ideal properties and saturation; Papers 2 and 3 ask you to *explain* a comparator circuit and *calculate* a switching resistance or temperature. *State* an ideal property with its value (infinite, zero); *explain* why it matters (no current drawn from the sensor). *Determine* the output: compare $V^{+}$ and $V^{-}$ first, then give the saturation value with its sign.
:::

:::exam-tip{title="Explaining a sensor circuit"}
Use a chain: temperature rises → thermistor resistance falls → its share of the supply voltage falls → $V^{-}$ falls below $V^{+}$ → output switches to positive saturation → LED lights.
:::

## Summary

:::summary
- An op-amp amplifies the difference between its inputs: $V_{\text{out}} = A_0(V^{+} - V^{-})$, until it saturates near a supply voltage.
- Ideal op-amp: infinite open-loop gain, input resistance, bandwidth and slew rate; zero output resistance. Real ones: $A_0 \approx 10^{5}$, $M\Omega$ input resistance, tens of ohms output resistance, limited bandwidth and slew rate.
- With no feedback the linear range is only tens of microvolts, so the output is almost always saturated.
- A comparator gives $+V_{\text{sat}}$ when $V^{+} > V^{-}$ and $-V_{\text{sat}}$ when $V^{+} < V^{-}$; with a sensor divider it switches at a set temperature or light level.
- LEDs need series resistors; relays need a protective diode across the coil.
:::
