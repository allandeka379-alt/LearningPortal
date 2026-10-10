---
{
  "key": "waves.progressive-waves",
  "title": "Progressive waves: the wave equation and intensity",
  "summary": "Describe a progressive wave with displacement, amplitude, phase difference, period, frequency, wavelength and speed, read frequency and amplitude from a CRO trace, derive and use v = fλ, and relate intensity to power, area and amplitude.",
  "concepts": ["aphys.waves.progressive-waves"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When a kombi hoots in a Harare street, nothing travels from the horn to your ear except energy: the air near the horn vibrates, passes the vibration to the next layer of air, and so on. A ripple spreading across Lake Kariba, a pulse sent along a skipping rope and the radio signal reaching a phone in Gweru all do the same thing. A **progressive wave** transfers energy from one place to another without transferring matter.

This lesson builds the vocabulary used in every later wave topic (superposition, stationary waves, interference, diffraction and s.h.m.). You should already know that frequency is measured in hertz, that speed = distance ÷ time, and how to use a cathode-ray oscilloscope (CRO) in outline.

## Key definitions

:::definition{term="Progressive wave"}
A wave in which a disturbance travels through a medium (or through space, for electromagnetic waves), transferring energy from the source without any net transfer of the medium.
:::

:::definition{term="Displacement"}
The distance, in a stated direction, of a point on the wave from its undisturbed (equilibrium) position.
:::

:::definition{term="Amplitude"}
The maximum displacement of a point on the wave from its equilibrium position.
:::

:::definition{term="Wavelength"}
The distance between two adjacent points on a wave that are oscillating in phase, for example from one crest to the next.
:::

:::definition{term="Period and frequency"}
The period $T$ is the time taken for one complete oscillation of a point on the wave. The frequency $f$ is the number of complete oscillations per unit time, so $f = 1/T$.
:::

:::definition{term="Phase difference"}
The fraction of a cycle by which one oscillation leads or lags another, expressed as an angle: one whole cycle is $360^\circ$ or $2\pi$ radians.
:::

:::definition{term="Intensity"}
The power transmitted per unit area, the area being perpendicular to the direction of travel of the wave. Unit: $\text{W m}^{-2}$.
:::

:::formula{name="The wave equation"}
$$
v = f\lambda
$$

$v$ is the wave speed in $\text{m s}^{-1}$, $f$ the frequency in Hz and $\lambda$ the wavelength in m.
:::

:::formula{name="Intensity"}
$$
I = \frac{P}{A} \qquad I \propto (\text{amplitude})^2
$$

$P$ is the power in W passing through area $A$ in $\text{m}^2$. For a point source radiating equally in all directions, $A = 4\pi r^2$ at distance $r$, so $I = \dfrac{P}{4\pi r^2}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require every idea in this lesson (ZIMSEC Form 5; Cambridge AS 7.1). Cambridge states phase difference in degrees or radians; ZIMSEC uses both too. The inverse-square law for a point source is an application of $I = P/A$, not a separate formula to memorise.
:::

## Deriving v = fλ

In one period $T$ the source completes one oscillation, so the disturbance moves forward by exactly one wavelength $\lambda$.

1. Speed = distance travelled ÷ time taken $= \dfrac{\lambda}{T}$.
2. Since $f = \dfrac{1}{T}$, this gives $v = f\lambda$.

The speed depends on the **medium** (the tension and mass per unit length of a string, the temperature of air), while the frequency is fixed by the **source**. When a wave passes into a new medium its frequency stays the same, so its wavelength changes in proportion to its speed.

## Two graphs that look alike

A progressive wave can be shown on two different graphs, and examiners use both.

- **Displacement against distance** is a snapshot of the whole wave at one instant. The distance between successive crests is the **wavelength**.
- **Displacement against time** follows one point on the wave. The time between successive crests is the **period**.

The table gives a snapshot of a wave on a rope with amplitude $3.0\ \text{cm}$ and wavelength $0.80\ \text{m}$.

| $x\,/\,\text{m}$ | $y\,/\,\text{cm}$ |
| --- | --- |
| 0.0 | 0.0 |
| 0.1 | 2.1 |
| 0.2 | 3.0 |
| 0.3 | 2.1 |
| 0.4 | 0.0 |
| 0.5 | −2.1 |
| 0.6 | −3.0 |
| 0.7 | −2.1 |
| 0.8 | 0.0 |

Plotted, the points form one full sine curve: the shape repeats after $0.80\ \text{m}$, so $\lambda = 0.80\ \text{m}$, and the largest displacement is $3.0\ \text{cm}$, the amplitude. Points $0.40\ \text{m}$ apart (half a wavelength) are in antiphase: a phase difference of $180^\circ$ or $\pi$ rad.

The phase difference between two points a distance $\Delta x$ apart along a progressive wave is

$$
\phi = \frac{\Delta x}{\lambda} \times 360^\circ = \frac{\Delta x}{\lambda} \times 2\pi\ \text{rad}.
$$

## Measuring frequency and amplitude with a CRO

A microphone connected to a CRO turns a sound wave into a voltage trace (a displacement-time graph of the voltage). The **time-base** setting gives the time per horizontal division; the **y-gain** gives the voltage per vertical division.

:::worked-solution[Reading a CRO trace]
A trace shows one complete cycle across $4.0$ horizontal divisions with the time-base at $0.5\ \text{ms div}^{-1}$. The peak-to-peak height is $5.2$ divisions with the y-gain at $2.0\ \text{V div}^{-1}$. The sound travels at $340\ \text{m s}^{-1}$.

1. Period: $T = 4.0 \times 0.5\ \text{ms} = 2.0\ \text{ms} = 2.0 \times 10^{-3}\ \text{s}$.
2. Frequency: $f = \dfrac{1}{T} = \dfrac{1}{2.0 \times 10^{-3}} = 500\ \text{Hz}$.
3. Amplitude: half the peak-to-peak height, $2.6$ divisions, so $2.6 \times 2.0 = 5.2\ \text{V}$.
4. Wavelength of the sound: $\lambda = \dfrac{v}{f} = \dfrac{340}{500} = 0.68\ \text{m}$.
:::

To reduce the uncertainty, measure across several cycles (for example three cycles over 12 divisions) and divide, and adjust the y-gain so that the trace fills most of the screen.

:::worked-solution[Phase difference between two points]
For the sound wave above ($\lambda = 0.68\ \text{m}$), find the phase difference between two points $0.17\ \text{m}$ apart along the direction of travel.

1. Fraction of a wavelength: $\dfrac{0.17}{0.68} = 0.25$.
2. Phase difference $= 0.25 \times 360^\circ = 90^\circ$, or $0.25 \times 2\pi = \dfrac{\pi}{2}\ \text{rad}$.
3. The point further from the source lags behind the nearer one by a quarter of a cycle.
:::

## Energy, intensity and amplitude

The energy of an oscillating particle is proportional to the square of its amplitude, so the power a wave carries, and hence its intensity, is proportional to amplitude squared. Doubling the amplitude multiplies the intensity by four; halving the intensity reduces the amplitude by a factor of $\sqrt{2}$, not 2.

:::worked-solution[Intensity from a point source]
A small loudspeaker emits sound of power $0.80\ \text{W}$ equally in all directions. Find the intensity at $5.0\ \text{m}$ and at $10.0\ \text{m}$, and compare the amplitudes.

1. At $5.0\ \text{m}$: $I = \dfrac{P}{4\pi r^2} = \dfrac{0.80}{4\pi \times 5.0^2} = 2.55 \times 10^{-3}\ \text{W m}^{-2}$.
2. At $10.0\ \text{m}$: $I = \dfrac{0.80}{4\pi \times 10.0^2} = 6.37 \times 10^{-4}\ \text{W m}^{-2}$, one quarter of the value at $5.0\ \text{m}$ (inverse-square law).
3. Since $I \propto A^2$, the amplitude at $10.0\ \text{m}$ is $\sqrt{1/4} = 1/2$ of that at $5.0\ \text{m}$.
:::

The inverse-square fall applies only to a point source with no absorption. A wave on a rope or a parallel laser beam does not spread out, so its intensity stays nearly constant with distance.

## Common mistakes

:::mistake{title="Reading wavelength from a displacement-time graph"}
The repeat distance on a displacement-time graph is the **period**, not the wavelength. Check the axis label before reading a value.
:::

:::mistake{title="Amplitude as peak-to-peak"}
On a CRO the amplitude is half the peak-to-peak height. Using the full height doubles the answer.
:::

:::mistake{title="Intensity proportional to amplitude"}
Intensity is proportional to amplitude **squared**. Twice the amplitude means four times the intensity.
:::

:::mistake{title="Saying the medium travels with the wave"}
The particles oscillate about fixed positions; only energy (and the wave shape) moves along.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Progressive waves appear in ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2, often as the first part of a longer waves question; CRO readings also appear in practical Papers 3 and 4.
:::

:::exam-tip{title="Command words"}
*Define* wavelength or phase difference in words with "adjacent" and "in phase" where needed. *Derive* $v = f\lambda$ from speed = distance ÷ time using one wavelength in one period. *Determine* a frequency from a CRO: show the number of divisions, the time-base value and $f = 1/T$. *Calculate* a phase difference: write the fraction of a wavelength first.
:::

## Summary

:::summary
- A progressive wave transfers energy without net transfer of the medium.
- Amplitude, wavelength, period, frequency and phase difference describe a wave; $f = 1/T$.
- $v = f\lambda$, derived from one wavelength travelled in one period; the source fixes $f$, the medium fixes $v$.
- A CRO gives $T$ from the time-base and the amplitude from the y-gain (half the peak-to-peak height).
- Intensity = power ÷ area, $I \propto$ amplitude$^2$; for a point source $I = P/4\pi r^2$.
:::
