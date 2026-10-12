---
{
  "key": "oscillations.shm",
  "title": "Simple harmonic motion",
  "summary": "Describe oscillations with displacement, amplitude, period, frequency, angular frequency and phase difference, state the defining condition a = −ω²x, use x = x₀ sin ωt, v = v₀ cos ωt and v = ±ω√(x₀² − x²), interpret the graphs of s.h.m., and apply T = 2π√(m/k) and T = 2π√(l/g).",
  "concepts": ["aphys.oscillations.shm"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A child on a swing at a Bulawayo playground, a mass bouncing on the spring of a kombi's suspension, the quartz crystal in a watch and the atoms in a solid all **oscillate**: they move to and fro about a fixed equilibrium position. Many of these oscillations share one simple mathematical pattern, called simple harmonic motion (s.h.m.). Once you recognise it, you can predict the period, the speed and the acceleration at every point of the motion.

You should know circular motion (angular speed $\omega$ in $\text{rad s}^{-1}$), Newton's second law, Hooke's law and the sine and cosine graphs.

## Key definitions

:::definition{term="Displacement and amplitude"}
The displacement $x$ is the distance of the oscillating object from its equilibrium position in a stated direction. The amplitude $x_0$ is the maximum displacement.
:::

:::definition{term="Period, frequency and angular frequency"}
The period $T$ is the time for one complete oscillation; the frequency $f = 1/T$ is the number of oscillations per unit time; the angular frequency is $\omega = 2\pi f = 2\pi/T$, in $\text{rad s}^{-1}$.
:::

:::definition{term="Phase difference"}
A measure, as an angle, of how far one oscillation is ahead of or behind another of the same frequency; one full cycle is $2\pi$ rad.
:::

:::definition{term="Simple harmonic motion"}
Motion in which the acceleration is directly proportional to the displacement from a fixed point and is always directed towards that point.
:::

:::formula{name="Defining equation and solutions"}
$$
a = -\omega^2 x
$$

$$
x = x_0\sin\omega t \qquad v = v_0\cos\omega t \qquad v = \pm\,\omega\sqrt{x_0^2 - x^2}
$$

$a$ acceleration in $\text{m s}^{-2}$, $x$ displacement and $x_0$ amplitude in m, $\omega$ in $\text{rad s}^{-1}$, $t$ in s, $v$ velocity in $\text{m s}^{-1}$, $v_0 = \omega x_0$ the maximum speed. Use $x = x_0\cos\omega t$ (and $v = -v_0\sin\omega t$) if timing starts at maximum displacement.
:::

:::formula{name="Two common oscillators"}
$$
T = 2\pi\sqrt{\frac{m}{k}} \qquad T = 2\pi\sqrt{\frac{l}{g}}
$$

Mass $m$ (kg) on a spring of spring constant $k$ ($\text{N m}^{-1}$); simple pendulum of length $l$ (m) with small amplitude, $g = 9.81\ \text{m s}^{-2}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
S.h.m. is Form 5 for ZIMSEC and A Level only for Cambridge (17.1-17.2), with the same content. Cambridge gives the mass-spring and pendulum formulae in context; ZIMSEC may expect them to be recalled (to be confirmed), so learn them.
:::

## The defining condition

The minus sign in $a = -\omega^2 x$ says the acceleration always points back towards equilibrium; "proportional" says the further away the object is, the harder it is pulled back. Any system obeying this oscillates with angular frequency $\omega$, **whatever the amplitude**: the period of s.h.m. does not depend on amplitude (isochronous).

For a mass on a spring, the resultant force is $F = -kx$, so $a = -\dfrac{k}{m}x$. Comparing with $a = -\omega^2 x$ gives $\omega^2 = k/m$ and hence $T = 2\pi\sqrt{m/k}$. For a pendulum at small angles, the restoring force is about $-\dfrac{mg}{l}x$, so $\omega^2 = g/l$.

## Graphs of s.h.m.

The table follows the mass-spring system of the first worked example below ($x_0 = 8.0\ \text{cm}$, $\omega = 6.32\ \text{rad s}^{-1}$, $T = 0.993\ \text{s}$) through one cycle, starting at equilibrium moving in the positive direction.

| $t$ | $x\,/\,\text{cm}$ | $v\,/\,\text{m s}^{-1}$ | $a\,/\,\text{m s}^{-2}$ |
| --- | --- | --- | --- |
| 0 | 0.0 | 0.51 | 0.00 |
| 0.125T | 5.7 | 0.36 | −2.26 |
| 0.25T | 8.0 | 0.00 | −3.20 |
| 0.375T | 5.7 | −0.36 | −2.26 |
| 0.5T | 0.0 | −0.51 | 0.00 |
| 0.625T | −5.7 | −0.36 | 2.26 |
| 0.75T | −8.0 | 0.00 | 3.20 |
| 0.875T | −5.7 | 0.36 | 2.26 |
| T | 0.0 | 0.51 | 0.00 |

Against time, $x$ is a sine curve, $v$ a cosine curve (a quarter cycle, $\pi/2$, **ahead** of $x$), and $a$ is an inverted sine curve, in **antiphase** with $x$ ($\pi$ out of phase). The gradient of the $x$-$t$ graph is $v$; the gradient of the $v$-$t$ graph is $a$.

![Graphs of s.h.m. for a 0.50 kg mass on a 20 N/m spring (amplitude 8.0 cm, period 0.993 s) against time in periods: displacement is a sine curve, velocity a cosine curve a quarter cycle ahead (maximum 0.51 m/s), and acceleration an inverted sine curve in antiphase with displacement (maximum 3.20 m/s²).](media:diagrams/shm-x-v-a-graphs.png "Figure: displacement, velocity and acceleration in s.h.m. over one period")

Against displacement:

- $a$ against $x$ is a **straight line through the origin with negative gradient** $-\omega^2$, running from $x = -x_0$ to $x = +x_0$. This graph is the test for s.h.m.
- $v$ against $x$ is an **ellipse** (a circle with suitable scales): $v = 0$ at $x = \pm x_0$ and $v = \pm v_0$ at $x = 0$.

![Acceleration against displacement for the spring oscillator: a straight line through the origin from +3.2 m/s² at x = −8.0 cm to −3.2 m/s² at x = +8.0 cm, with gradient −ω² = −40 per s², which is the defining test for simple harmonic motion.](media:diagrams/shm-acceleration-displacement-graph.png "Figure: a = −ω²x is a straight line of negative gradient through the origin")

## Worked examples

:::worked-solution[A mass on a spring]
A $0.50\ \text{kg}$ mass on a spring of spring constant $20\ \text{N m}^{-1}$ is pulled down $8.0\ \text{cm}$ and released.

1. $\omega = \sqrt{k/m} = \sqrt{20/0.50} = 6.32\ \text{rad s}^{-1}$.
2. $T = 2\pi/\omega = 0.993\ \text{s}$ (or $2\pi\sqrt{0.50/20}$).
3. Maximum speed (at equilibrium): $v_0 = \omega x_0 = 6.32 \times 0.080 = 0.506\ \text{m s}^{-1}$.
4. Maximum acceleration (at the extremes): $a_{\max} = \omega^2 x_0 = 40 \times 0.080 = 3.20\ \text{m s}^{-2}$.
:::

:::worked-solution[Speed and acceleration at a given displacement]
For the same oscillator, find the speed and acceleration when the displacement is $5.0\ \text{cm}$.

1. $v = \omega\sqrt{x_0^2 - x^2} = 6.32\sqrt{0.080^2 - 0.050^2} = 6.32 \times 0.0624 = 0.395\ \text{m s}^{-1}$.
2. $a = -\omega^2 x = -40 \times 0.050 = -2.00\ \text{m s}^{-2}$: magnitude $2.00\ \text{m s}^{-2}$, directed towards equilibrium.
:::

:::worked-solution[A simple pendulum]
Find the period of a pendulum $0.90\ \text{m}$ long swinging through a small angle.

1. $T = 2\pi\sqrt{\dfrac{l}{g}} = 2\pi\sqrt{\dfrac{0.90}{9.81}}$.
2. $T = 1.90\ \text{s}$, independent of the mass of the bob and (for small swings) of the amplitude.
:::

## Common mistakes

:::mistake{title="Degrees in the calculator"}
In $x = x_0\sin\omega t$, $\omega t$ is in **radians**. Set the calculator to radian mode.
:::

:::mistake{title="Maximum speed at the extremes"}
Speed is maximum at the equilibrium position and zero at maximum displacement; acceleration is the opposite.
:::

:::mistake{title="Leaving out the minus sign"}
$a = -\omega^2x$: without the minus sign the acceleration would point away from equilibrium and the motion would not be an oscillation.
:::

:::mistake{title="Confusing ω with f"}
$\omega = 2\pi f$. A frequency of 2.0 Hz is an angular frequency of $12.6\ \text{rad s}^{-1}$.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-2 (Form 5) and Cambridge Paper 4 (A Level); pendulum and mass-spring experiments are standard on practical Papers 3, 4 and 5.
:::

:::exam-tip{title="Command words"}
*Define* s.h.m. with both parts: acceleration proportional to displacement **and** directed towards a fixed point. *Show that* a system performs s.h.m.: reach the form $a = -(\text{constant})x$ and identify $\omega^2$. *Sketch* (describe) graphs: state shapes, phase relationships, and values at $x = 0$ and $x = \pm x_0$. *Determine* $\omega$ from an $a$-$x$ graph: gradient $= -\omega^2$.
:::

## Summary

:::summary
- S.h.m.: $a = -\omega^2x$, acceleration proportional to displacement and directed towards equilibrium.
- $\omega = 2\pi f = 2\pi/T$; the period does not depend on amplitude.
- $x = x_0\sin\omega t$, $v = v_0\cos\omega t$, $v = \pm\omega\sqrt{x_0^2 - x^2}$, $v_0 = \omega x_0$, $a_{\max} = \omega^2x_0$.
- $v$ leads $x$ by $\pi/2$; $a$ is in antiphase with $x$; $a$ against $x$ is a straight line of gradient $-\omega^2$.
- Mass-spring: $T = 2\pi\sqrt{m/k}$; pendulum: $T = 2\pi\sqrt{l/g}$.
:::
