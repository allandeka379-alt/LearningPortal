---
{
  "key": "ac.rectification-smoothing",
  "title": "Rectification and smoothing",
  "summary": "Describe half-wave rectification with one diode and full-wave rectification with a bridge of four diodes, with their output graphs, explain smoothing by a capacitor and how the capacitance and load resistance affect the ripple (time constant compared with the period), and apply these ideas to a d.c. power supply.",
  "concepts": ["aphys.ac.rectification-smoothing"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Phones, laptops, solar charge controllers and the electronics inside a modern fridge all need a steady direct voltage, but the ZESA supply in a Chitungwiza home is 230 V alternating. A phone charger therefore does three jobs: it reduces the voltage, it **rectifies** the a.c. so that current flows in one direction only, and it **smooths** the result so that the voltage hardly varies. This lesson explains the last two stages using diodes and a capacitor.

You should already know that a diode conducts in one direction only (forward bias), the r.m.s. and peak values of a.c., and how a capacitor discharges through a resistor with time constant $RC$.

## Key definitions

:::definition{term="Rectification"}
The conversion of an alternating current into a current that flows in one direction only (a unidirectional or direct current, which may still vary in size).
:::

:::definition{term="Half-wave rectification"}
Rectification in which only one half of each cycle of the a.c. passes to the load; the other half is blocked.
:::

:::definition{term="Full-wave rectification"}
Rectification in which both halves of each cycle pass to the load, with the negative half reversed, so the load current is always in the same direction.
:::

:::definition{term="Smoothing"}
Reducing the variation (ripple) of a rectified voltage, usually with a capacitor connected in parallel with the load.
:::

:::definition{term="Ripple"}
The small variation in the output voltage of a smoothed supply as the capacitor charges near each peak and discharges between peaks.
:::

:::formula{name="Approximate ripple voltage"}
$$
\Delta V \approx V_0\left(1 - e^{-t/RC}\right) \approx \frac{V_0\,t}{RC} \quad (t \ll RC)
$$

$V_0$ = peak output voltage (V), $t$ = time between peaks (s): $T$ for half-wave, $T/2$ for full-wave; $R$ = load resistance (Ω); $C$ = smoothing capacitance (F).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (21.2, Paper 4). Cambridge requires qualitative treatment of smoothing (the effect of $C$ and $R$); the ripple formula above is an extension that helps with "suggest" questions. Ideal diodes are assumed unless a question gives a forward voltage.
:::

## Half-wave rectification

One diode is connected in series between the a.c. supply and the load resistor. During the half-cycles when the diode is forward-biased it conducts and the load p.d. follows the supply; during the other half-cycles it is reverse-biased, there is no current, and the load p.d. is zero.

**Output described in words:** a series of positive half-sine "humps" separated by flat zero sections of equal length. The output frequency of the humps equals the supply frequency, 50 per second for the mains. Half of each cycle, and so much of the available energy, is wasted.

## Full-wave rectification: the bridge rectifier

Four diodes are arranged in a diamond (a **bridge**). The a.c. supply is connected across one diagonal and the load across the other. In each half-cycle, two diodes on opposite sides of the bridge are forward-biased and conduct, while the other two are reverse-biased:

- In the first half-cycle, current passes from the supply through diode 1, down through the load, and back through diode 3.
- In the next half-cycle, the supply polarity reverses; current passes through diode 2, **down through the load in the same direction**, and back through diode 4.

**Output described in words:** a continuous series of positive half-sine humps with no gaps. There are now two humps per supply cycle, so the hump frequency is $100\ \text{Hz}$ for a $50\ \text{Hz}$ supply. Since current flows through two diodes at a time, real silicon diodes reduce the peak by about $2 \times 0.7 = 1.4\ \text{V}$.

| Feature | Half-wave (1 diode) | Full-wave bridge (4 diodes) |
|---|---|---|
| Parts of each cycle used | one half | both halves |
| Humps per second (50 Hz supply) | 50 | 100 |
| Time between peaks | $T = 20\ \text{ms}$ | $T/2 = 10\ \text{ms}$ |
| Mean output (ideal diodes) | lower | twice the half-wave mean |
| Ripple with the same smoothing | larger | about half |

:::worked-solution[Peak output of a bridge rectifier]
A transformer gives $12\ \text{V}$ r.m.s. to a bridge rectifier. Find the peak output with ideal diodes, and with silicon diodes each dropping $0.7\ \text{V}$.

1. $V_0 = \sqrt{2} \times 12 = 17.0\ \text{V}$ (ideal diodes).
2. Two diodes conduct at a time, so with real diodes $V_0 = 17.0 - 2 \times 0.7 = 15.6\ \text{V}$.
:::

## Smoothing with a capacitor

A capacitor is connected **in parallel with the load**. As the rectified voltage rises towards each peak, the capacitor charges to the peak voltage. After the peak, the supply voltage falls faster than the capacitor can discharge, so the diodes become reverse-biased and the capacitor alone supplies the load, discharging through $R$. Its p.d. falls exponentially, but only a little, until the next rising hump exceeds it and recharges it.

**Output described in words:** the voltage stays close to the peak value, with a small sawtooth ripple: a gentle exponential fall between peaks and a sharp rise as each hump recharges the capacitor.

The ripple is small when the **time constant $RC$ is much larger than the time between peaks**:

- **Larger capacitance** → larger $RC$ → slower discharge → smaller ripple.
- **Larger load resistance** (smaller load current) → larger $RC$ → smaller ripple. A heavier load (smaller $R$) increases the ripple.
- **Full-wave** rectification halves the time between peaks, so the ripple is about half that for half-wave.

:::worked-solution[Estimating the ripple]
A full-wave rectified supply with peak $17.0\ \text{V}$ at a mains frequency of $50\ \text{Hz}$ feeds a $500\ \Omega$ load in parallel with a $2200\ \mu\text{F}$ capacitor. Estimate the ripple.

1. Time constant: $RC = 500 \times 2200 \times 10^{-6} = 1.10\ \text{s}$.
2. Time between peaks (full-wave): $10\ \text{ms}$, much shorter than $RC$.
3. Ripple $\Delta V \approx V_0\left(1 - e^{-0.010/1.10}\right) = 17.0 \times 0.00905 = 0.154\ \text{V}$ (the linear estimate $V_0t/RC$ gives the same to 2 s.f.).
4. With a $220\ \mu\text{F}$ capacitor, $RC = 0.11\ \text{s}$ and the ripple rises to about $1.5\ \text{V}$; with half-wave rectification and the original capacitor it would be about $0.31\ \text{V}$.
:::

## The d.c. power supply

A simple mains power supply has four stages in order: a **step-down transformer** (reduces 230 V to a safe low voltage and isolates the output from the mains), a **bridge rectifier**, a **smoothing capacitor**, and often a **voltage regulator** (for example a Zener diode circuit or an integrated regulator) that removes the remaining ripple and holds the output constant as the load changes.

## Common mistakes

:::mistake{title="Putting the smoothing capacitor in series"}
The capacitor goes **in parallel** with the load. In series it would block the direct current completely.
:::

:::mistake{title="Saying a bigger load reduces ripple"}
A "bigger load" draws more current, which means a **smaller** load resistance, a smaller $RC$, and **more** ripple.
:::

:::mistake{title="Thinking full-wave doubles the frequency of the supply"}
The supply frequency is unchanged; the rectified output has twice as many humps per second.
:::

:::mistake{title="Saying the capacitor discharges through the diodes"}
Between peaks the diodes are reverse-biased; the capacitor discharges only through the load.
:::

## Exam tips

:::exam-tip{title="Describe the output graphs"}
Half-wave: "positive half-cycles only, with gaps". Full-wave: "both halves positive, no gaps, twice as many humps". Smoothed: "close to the peak value with a small ripple; slow exponential fall between peaks, rapid rise at each peak".
:::

:::exam-tip{title="Explain the effect of C and R"}
Always link to the time constant: "larger $RC$ compared with the time between peaks, so the capacitor discharges less between peaks, so less ripple".
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 and ZIMSEC Papers 1-3; the bridge circuit is often given in words or as a diagram to complete.
:::

## Summary

:::summary
- Half-wave: one diode passes one half of each cycle; output has gaps.
- Full-wave bridge: four diodes, two conducting at a time, both halves used, no gaps, twice as many humps.
- Smoothing capacitor in parallel with the load charges at each peak and discharges through the load between peaks.
- Ripple is small when $RC$ is much larger than the time between peaks: increase $C$ or $R$, or use full-wave rectification.
- A d.c. supply: transformer, bridge rectifier, smoothing capacitor, regulator.
:::
