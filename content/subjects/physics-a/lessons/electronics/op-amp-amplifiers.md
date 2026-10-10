---
{
  "key": "electronics.op-amp-amplifiers",
  "title": "Negative feedback: inverting and non-inverting amplifiers",
  "summary": "Explain negative feedback and its effects on gain, bandwidth and stability, use the virtual earth to derive the gain −R_f/R_in of the inverting amplifier and 1 + R_f/R₁ of the non-inverting amplifier, describe the voltage follower, sketch input-output graphs with saturation, and design simple amplifiers.",
  "concepts": ["aphys.electronics.op-amp-amplifiers"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A microphone at a church in Gweru produces a few millivolts; a loudspeaker needs several volts. A thermocouple on a solar geyser gives a voltage too small to drive a meter. Both need an **amplifier** whose gain is known, steady and does not depend on the particular chip used. An op-amp on its own is useless for this: its open-loop gain is enormous, varies from one chip to the next and changes with temperature, and the output saturates for any input bigger than a few microvolts. The cure is **negative feedback**: feeding a fraction of the output back to the inverting input.

You should already know the ideal op-amp properties, $V_{\text{out}} = A_0(V^{+} - V^{-})$, saturation and potential dividers.

## Key definitions

:::definition{term="Negative feedback"}
The process of returning a fraction of the output voltage of an amplifier to its inverting input, so that the fed-back signal opposes the change that produced it.
:::

:::definition{term="Closed-loop gain"}
The voltage gain of an amplifier with feedback: the ratio of the output voltage to the input voltage, $G = V_{\text{out}}/V_{\text{in}}$.
:::

:::definition{term="Virtual earth"}
A point that is held at (very nearly) 0 V by the action of the circuit without being connected directly to 0 V; in an inverting amplifier it is the inverting input.
:::

:::definition{term="Bandwidth"}
The range of signal frequencies over which the gain of an amplifier is approximately constant (stays above a stated fraction of its maximum value).
:::

:::formula{name="Inverting amplifier"}
$$
G = \frac{V_{\text{out}}}{V_{\text{in}}} = -\frac{R_f}{R_{\text{in}}}
$$

$R_f$ = feedback resistor (Ω), $R_{\text{in}}$ = input resistor (Ω). The minus sign means the output is inverted (180° out of phase for a.c.).
:::

:::formula{name="Non-inverting amplifier"}
$$
G = \frac{V_{\text{out}}}{V_{\text{in}}} = 1 + \frac{R_f}{R_1}
$$

$R_f$ = resistor from the output to the inverting input (Ω), $R_1$ = resistor from the inverting input to 0 V (Ω).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Op-amp amplifiers are ZIMSEC Form 6 only (not in Cambridge 9702 for 2025-2027); scope to be confirmed against the ZIMSEC syllabus.
:::

## What negative feedback does

With negative feedback, if the output tries to rise too far, more of it is returned to the inverting input, which pulls the output down again. The circuit settles where the two inputs are almost exactly equal. The effects are:

- **Reduced gain**: the closed-loop gain is much smaller than $A_0$.
- **Predictable, stable gain**: it depends only on the resistor values, not on $A_0$, so it is the same for every chip and does not drift with temperature.
- **Increased bandwidth**: for an op-amp the product of gain and bandwidth is roughly constant (about 1 MHz for a 741), so a gain of 100 gives a bandwidth of about $10^{6}/100 = 10\ \text{kHz}$, far wider than the 10 Hz or so without feedback.
- **Less distortion**: the output follows the input faithfully over a wide linear range.

## The inverting amplifier

**Arrangement.** The input voltage is connected through $R_{\text{in}}$ to the inverting input. $R_f$ connects the output back to the inverting input. The non-inverting input is connected to 0 V.

**Derivation of the gain.**

1. The op-amp is not saturated and $A_0$ is very large, so $V^{+} - V^{-} = V_{\text{out}}/A_0 \approx 0$. Since $V^{+} = 0$, $V^{-} \approx 0$: the inverting input is a **virtual earth**.
2. The input resistance of the op-amp is very large, so no current enters the inverting input. The current $I$ through $R_{\text{in}}$ therefore all flows through $R_f$.
3. Across $R_{\text{in}}$: $I = \dfrac{V_{\text{in}} - 0}{R_{\text{in}}}$. Across $R_f$: $I = \dfrac{0 - V_{\text{out}}}{R_f}$.
4. Equating: $\dfrac{V_{\text{in}}}{R_{\text{in}}} = -\dfrac{V_{\text{out}}}{R_f}$, so $G = \dfrac{V_{\text{out}}}{V_{\text{in}}} = -\dfrac{R_f}{R_{\text{in}}}$.

Because the inverting input is at 0 V, the **input resistance of the whole amplifier** is just $R_{\text{in}}$.

:::worked-solution[Inverting amplifier with saturation]
An inverting amplifier has $R_{\text{in}} = 4.7\ \text{k}\Omega$ and $R_f = 47\ \text{k}\Omega$; the op-amp saturates at $\pm 9.0\ \text{V}$. Find the output for $V_{\text{in}} = 0.35\ \text{V}$ and for $V_{\text{in}} = 1.2\ \text{V}$, and the largest input that is amplified without distortion.

1. $G = -\dfrac{47}{4.7} = -10$.
2. $V_{\text{in}} = 0.35\ \text{V}$: $V_{\text{out}} = -10 \times 0.35 = -3.5\ \text{V}$ (within $\pm 9.0\ \text{V}$).
3. $V_{\text{in}} = 1.2\ \text{V}$: $-10 \times 1.2 = -12\ \text{V}$ is beyond the supply, so $V_{\text{out}} = -9.0\ \text{V}$ (saturated).
4. Largest undistorted input: $|V_{\text{in}}| = \dfrac{9.0}{10} = 0.90\ \text{V}$.
:::

**Input-output graph.** For this amplifier, $V_{\text{out}}$ against $V_{\text{in}}$ is a straight line through the origin of gradient $-10$ between $-0.9\ \text{V}$ and $+0.9\ \text{V}$, and flat at $+9.0\ \text{V}$ and $-9.0\ \text{V}$ beyond:

| $V_{\text{in}}\,/\,\text{V}$ | −1.2 | −0.9 | −0.6 | −0.3 | 0 | 0.3 | 0.6 | 0.9 | 1.2 |
|---|---|---|---|---|---|---|---|---|---|
| $V_{\text{out}}\,/\,\text{V}$ | 9.0 | 9.0 | 6.0 | 3.0 | 0 | −3.0 | −6.0 | −9.0 | −9.0 |

For a sinusoidal input of peak 1.2 V, the output is an inverted sine wave whose peaks are **clipped** flat at $\pm 9.0\ \text{V}$.

## The non-inverting amplifier

**Arrangement.** The input voltage is connected directly to the non-inverting input. $R_f$ connects the output to the inverting input, and $R_1$ connects the inverting input to 0 V, so $R_f$ and $R_1$ form a potential divider across the output.

**Derivation of the gain.**

1. No current enters the inverting input, so $R_f$ and $R_1$ carry the same current and act as a potential divider: $V^{-} = V_{\text{out}}\dfrac{R_1}{R_1 + R_f}$.
2. With very large $A_0$ and no saturation, $V^{-} \approx V^{+} = V_{\text{in}}$.
3. So $V_{\text{in}} = V_{\text{out}}\dfrac{R_1}{R_1 + R_f}$, giving $G = \dfrac{R_1 + R_f}{R_1} = 1 + \dfrac{R_f}{R_1}$.

The output is **in phase** with the input, and the amplifier's input resistance is that of the op-amp itself, very high, so it hardly loads a sensor.

:::worked-solution[Designing a non-inverting amplifier]
A sensor gives up to $0.25\ \text{V}$ and a data logger needs up to about $5\ \text{V}$. Choose resistors for a non-inverting amplifier, using $R_1 = 1.0\ \text{k}\Omega$, and find the output at full scale.

1. Gain needed $\approx \dfrac{5}{0.25} = 20$, so $1 + \dfrac{R_f}{R_1} = 20$ would need $R_f = 19\ \text{k}\Omega$.
2. Use the nearest standard value, $R_f = 20\ \text{k}\Omega$: $G = 1 + \dfrac{20}{1.0} = 21$.
3. Output at full scale: $21 \times 0.25 = 5.25\ \text{V}$, within a $\pm 9\ \text{V}$ supply.
:::

**The voltage follower.** If $R_f = 0$ (a wire from the output to the inverting input) and $R_1$ is removed (infinite), the gain is $1 + 0 = 1$: the output follows the input. It is used as a **buffer**: its huge input resistance draws no current from a sensor, and its tiny output resistance can drive a load, so a weak source can drive a meter without its voltage being pulled down.

## Comparing the two amplifiers

| Feature | Inverting | Non-inverting |
|---|---|---|
| Gain | $-R_f/R_{\text{in}}$ | $1 + R_f/R_1$ |
| Phase of output | inverted (180°) | in phase |
| Input resistance | $R_{\text{in}}$ (moderate) | very high |
| Smallest gain magnitude | can be less than 1 | at least 1 |

## Common mistakes

:::mistake{title="Writing the non-inverting gain as R_f/R_1"}
The divider gives $1 + R_f/R_1$; forgetting the 1 is the most common slip.
:::

:::mistake{title="Saying the virtual earth is connected to 0 V"}
It is at nearly 0 V because of feedback, but it is not joined to 0 V; current flows through it from $R_{\text{in}}$ to $R_f$.
:::

:::mistake{title="Ignoring saturation"}
Always check the calculated output against the supply. A gain of 50 with a 0.5 V input does not give 25 V from a ±12 V supply.
:::

:::mistake{title="Using positive feedback"}
Feedback must go to the **inverting** input. Feedback to the non-inverting input drives the output into saturation.
:::

## Exam tips

:::exam-tip{title="Derivations"}
ZIMSEC Papers 2 and 3 can ask you to *derive* either gain. State the two assumptions (very large gain so $V^{+} \approx V^{-}$; very large input resistance so no current into the inputs) before writing the current or divider equation.
:::

:::exam-tip{title="Graphs and design"}
*Sketch described in words*: a straight line through the origin with gradient equal to the gain, and horizontal sections at the saturation voltages. *Design*: choose resistor values from the gain, then check the output at the largest input. Paper 1 often tests the sign, the phase and the effect of feedback on bandwidth.
:::

## Summary

:::summary
- Negative feedback returns part of the output to the inverting input: it lowers the gain but makes it stable and set by resistors, and increases the bandwidth.
- Inverting amplifier: virtual earth at the inverting input; $G = -R_f/R_{\text{in}}$; input resistance $R_{\text{in}}$.
- Non-inverting amplifier: $G = 1 + R_f/R_1$, output in phase, very high input resistance.
- Voltage follower: gain 1, used as a buffer.
- The output saturates at about the supply voltages, so large inputs are clipped.
:::
