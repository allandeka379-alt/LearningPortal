---
{
  "key": "ac.characteristics-rms",
  "title": "Alternating current: period, peak and r.m.s. values",
  "summary": "Describe an alternating current or voltage by its period, frequency and peak value, use x = x₀ sin ωt, define and use root-mean-square values with I_rms = I₀/√2 and V_rms = V₀/√2 for sinusoidal a.c., show that the mean power in a resistor is half the peak power, and read a.c. waveforms on an oscilloscope.",
  "concepts": ["aphys.ac.characteristics-rms"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The supply at a wall socket in Zimbabwe is quoted as 230 V at 50 Hz, yet the voltage is never steady: it swings from about +325 V to −325 V and back fifty times every second. A battery-powered torch, in contrast, runs on a steady direct p.d. How can a constantly reversing voltage be given a single value, and why 230 V rather than 325 V? This lesson answers both questions with the **root-mean-square** value, the steady (d.c.) value that would deliver the same mean power.

You should already know $P = VI = I^2R = V^2/R$, the sine function and radians, and the idea of angular frequency $\omega = 2\pi f$ from oscillations.

## Key definitions

:::definition{term="Alternating current (a.c.)"}
A current that repeatedly reverses its direction. For sinusoidal a.c. the current varies with time as $I = I_0\sin\omega t$.
:::

:::definition{term="Period and frequency"}
The period $T$ is the time for one complete cycle; the frequency $f = 1/T$ is the number of cycles per unit time. The angular frequency is $\omega = 2\pi f$.
:::

:::definition{term="Peak value"}
The maximum value ($I_0$ or $V_0$) of the current or voltage in either direction, measured from zero.
:::

:::definition{term="Root-mean-square (r.m.s.) value"}
The r.m.s. value of an alternating current is the value of the steady direct current that would dissipate energy at the same average rate in a resistor.
:::

:::formula{name="Sinusoidal a.c."}
$$
x = x_0\sin\omega t, \qquad \omega = 2\pi f = \frac{2\pi}{T}
$$

$x$ = instantaneous current $I$ or voltage $V$; $x_0$ = peak value; $\omega$ in rad s⁻¹; $t$ in s.
:::

:::formula{name="r.m.s. values of a sinusoid"}
$$
I_{\text{r.m.s.}} = \frac{I_0}{\sqrt{2}}, \qquad V_{\text{r.m.s.}} = \frac{V_0}{\sqrt{2}}
$$
:::

:::formula{name="Mean power in a resistor"}
$$
\langle P\rangle = I_{\text{r.m.s.}}V_{\text{r.m.s.}} = I_{\text{r.m.s.}}^2R = \tfrac{1}{2}I_0V_0 = \tfrac{1}{2}P_0
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (21.1, Paper 4). Mains supplies are always quoted as r.m.s. values; in Zimbabwe 230 V, 50 Hz.
:::

## Describing an a.c. waveform

A sinusoidal voltage $V = V_0\sin\omega t$ starts at zero, rises to $+V_0$ after a quarter of a period, returns to zero at $T/2$, reaches $-V_0$ at $3T/4$ and returns to zero at $T$. The **peak-to-peak** value is $2V_0$.

For the Zimbabwean mains: $f = 50\ \text{Hz}$, so $T = 1/50 = 0.020\ \text{s} = 20\ \text{ms}$ and $\omega = 2\pi \times 50 = 314\ \text{rad s}^{-1}$.

## Why the r.m.s. value?

The **mean** of a sinusoidal current over a whole cycle is zero, because it is positive for half the cycle and negative for the other half. That is useless for describing heating. But the heating effect depends on $I^2$, which is never negative. The power in a resistor is $P = I^2R = I_0^2R\sin^2\omega t$.

The value of $\sin^2\omega t$ swings between 0 and 1, symmetrically about $\tfrac{1}{2}$, so its mean over a cycle is $\tfrac{1}{2}$. (Using $\sin^2\theta = \tfrac{1}{2}(1 - \cos 2\theta)$: the cosine term averages to zero.) Therefore

$$
\langle P\rangle = \tfrac{1}{2}I_0^2R = \left(\frac{I_0}{\sqrt{2}}\right)^2R
$$

A steady current $I_0/\sqrt{2}$ would produce the same mean power. That is the r.m.s. current: the **square root** of the **mean** of the **squares** of the current. The same reasoning gives $V_{\text{r.m.s.}} = V_0/\sqrt{2}$. The factor $\sqrt{2}$ applies only to sinusoidal waveforms; a square wave that switches between $+V_0$ and $-V_0$ has $V_{\text{r.m.s.}} = V_0$.

:::worked-solution[Peak values of the mains]
The mains supply is $230\ \text{V}$ r.m.s. at $50\ \text{Hz}$. A $2.0\ \text{kW}$ kettle is connected. Find the peak voltage, the r.m.s. and peak currents, and the peak power.

1. $V_0 = \sqrt{2} \times 230 = 325\ \text{V}$.
2. $I_{\text{r.m.s.}} = \dfrac{P}{V_{\text{r.m.s.}}} = \dfrac{2000}{230} = 8.70\ \text{A}$.
3. $I_0 = \sqrt{2} \times 8.70 = 12.3\ \text{A}$.
4. Peak power $= I_0V_0 = 2 \times \langle P\rangle = 4.0\ \text{kW}$: the power swings between $0$ and $4.0\ \text{kW}$, averaging $2.0\ \text{kW}$, a hundred times a second.
:::

## Reading a waveform on an oscilloscope

An oscilloscope (CRO) plots voltage (vertical) against time (horizontal). The **Y-gain** (volts per division) sets the vertical scale and the **time-base** (time per division) the horizontal scale.

- Peak voltage = (height of a peak above the centre line in divisions) × (Y-gain). It is usually more precise to measure the peak-to-peak height and halve it.
- Period = (horizontal length of one complete cycle in divisions) × (time-base). Measure several cycles and divide, for precision.

:::worked-solution[Reading a CRO trace]
A sinusoidal trace has a peak-to-peak height of $6.4$ divisions with the Y-gain at $2.0\ \text{V div}^{-1}$. Two complete cycles occupy $8.0$ divisions with the time-base at $5.0\ \text{ms div}^{-1}$. Find $V_0$, $V_{\text{r.m.s.}}$, the frequency, and the mean power the voltage would deliver to a $10\ \Omega$ resistor.

1. $V_0 = \dfrac{6.4}{2} \times 2.0 = 6.4\ \text{V}$.
2. $V_{\text{r.m.s.}} = \dfrac{6.4}{\sqrt{2}} = 4.53\ \text{V}$.
3. $T = \dfrac{8.0}{2} \times 5.0\ \text{ms} = 20\ \text{ms}$, so $f = \dfrac{1}{0.020} = 50\ \text{Hz}$.
4. $\langle P\rangle = \dfrac{V_{\text{r.m.s.}}^2}{R} = \dfrac{4.53^2}{10} = 2.05\ \text{W}$ (half the peak power, $6.4^2/10 = 4.10\ \text{W}$).
:::

| Quantity | Symbol | Mains value in Zimbabwe |
|---|---|---|
| r.m.s. voltage | $V_{\text{r.m.s.}}$ | 230 V |
| peak voltage | $V_0$ | 325 V |
| peak-to-peak voltage | $2V_0$ | 651 V |
| frequency | $f$ | 50 Hz |
| period | $T$ | 20 ms |
| angular frequency | $\omega$ | 314 rad s⁻¹ |

## Common mistakes

:::mistake{title="Dividing by 2 instead of √2"}
$V_{\text{r.m.s.}} = V_0/\sqrt{2} \approx 0.707V_0$, not $V_0/2$. It is the **power** that averages to half its peak value.
:::

:::mistake{title="Using the peak-to-peak value as the peak"}
On an oscilloscope, halve the peak-to-peak height to get $V_0$.
:::

:::mistake{title="Calculator in degrees"}
In $V_0\sin\omega t$, $\omega t$ is in radians. Set the calculator to radians.
:::

:::mistake{title="Using peak values in P = VI for mean power"}
$V_0I_0$ is the peak power, twice the mean. Use r.m.s. values for mean power.
:::

## Exam tips

:::exam-tip{title="Define r.m.s."}
Mention "steady direct current", "same mean power" (or "same heating effect") and "in a resistor". For *explain why the mean power is half the peak power*, use the mean of $\sin^2\omega t$ being one half.
:::

:::exam-tip{title="Sketch described in words"}
For the power-time graph in a resistor: a $\sin^2$ curve between $0$ and $P_0$, always positive, at twice the frequency of the supply, with mean $P_0/2$.
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 and ZIMSEC Papers 1-3; CRO readings also appear in practical papers.
:::

## Summary

:::summary
- Sinusoidal a.c.: $x = x_0\sin\omega t$, $\omega = 2\pi f$, $T = 1/f$.
- The r.m.s. value is the steady d.c. value giving the same mean power in a resistor.
- For a sinusoid, $I_{\text{r.m.s.}} = I_0/\sqrt{2}$ and $V_{\text{r.m.s.}} = V_0/\sqrt{2}$.
- Mean power in a resistor $= I_{\text{r.m.s.}}V_{\text{r.m.s.}} = \tfrac{1}{2}$ peak power.
- On a CRO: peak = height × Y-gain; period = length of a cycle × time-base.
:::
