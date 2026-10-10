---
{
  "key": "oscillations.shm-energy",
  "title": "Energy in simple harmonic motion",
  "summary": "Describe the interchange of kinetic and potential energy in simple harmonic motion, use E = ½mω²x₀² for the total energy, find kinetic and potential energy at any displacement, and interpret energy-displacement and energy-time graphs.",
  "concepts": ["aphys.oscillations.shm-energy"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A child on a swing in a Gweru park rises to a stop at each end, swoops fastest through the bottom and rises again. Energy is being passed back and forth between two stores: gravitational potential energy at the ends and kinetic energy at the middle. In a car's suspension, a vibrating bridge or a quartz crystal the stores are different (elastic potential energy, for example), but the pattern of exchange is the same for every simple harmonic oscillator. Knowing it lets you find the speed of an oscillator anywhere in its motion from energy alone.

You should already know the s.h.m. equations $a = -\omega^2x$, $v = \pm\omega\sqrt{x_0^2 - x^2}$ and $v_0 = \omega x_0$, kinetic energy $\tfrac{1}{2}mv^2$ and elastic potential energy $\tfrac{1}{2}kx^2$.

## Key definitions

:::definition{term="Total energy of an oscillator"}
The sum of the kinetic energy and the potential energy of the oscillating system at any instant; in the absence of resistive forces it is constant.
:::

:::definition{term="Undamped oscillation"}
An oscillation in which no energy is transferred out of the system, so the total energy and the amplitude stay constant.
:::

:::formula{name="Energy in s.h.m."}
$$
E = \tfrac{1}{2}m\omega^2x_0^2
$$

$$
E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2) \qquad E_p = \tfrac{1}{2}m\omega^2x^2
$$

$E$ total energy, $E_k$ kinetic energy and $E_p$ potential energy, all in J; $m$ mass in kg; $\omega$ angular frequency in $\text{rad s}^{-1}$; $x_0$ amplitude and $x$ displacement in m. The potential energy is measured from the equilibrium position.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards (ZIMSEC Form 5; Cambridge A Level 17.2) require the interchange of energy, $E = \tfrac{1}{2}m\omega^2x_0^2$, and the energy graphs. Damping, which removes energy, is in the next lesson.
:::

## Where the formulae come from

Kinetic energy at displacement $x$, using $v^2 = \omega^2(x_0^2 - x^2)$:

$$
E_k = \tfrac{1}{2}mv^2 = \tfrac{1}{2}m\omega^2(x_0^2 - x^2).
$$

At $x = 0$ this is greatest: $E_k = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2}mv_0^2$. At $x = \pm x_0$ the oscillator is momentarily at rest, so all the energy is potential. Because the total is constant, the total energy equals the maximum kinetic energy:

$$
E = \tfrac{1}{2}m\omega^2x_0^2, \qquad E_p = E - E_k = \tfrac{1}{2}m\omega^2x^2.
$$

For a mass on a spring, $m\omega^2 = k$, so $E_p = \tfrac{1}{2}kx^2$: the familiar elastic potential energy.

Two consequences matter in exams:

- $E \propto x_0^2$: doubling the amplitude multiplies the energy by four.
- $E \propto \omega^2$ (for the same mass and amplitude): doubling the frequency multiplies the energy by four.

## Energy graphs

**Against displacement**, the potential energy is a parabola through the origin, $E_p \propto x^2$, rising to $E$ at $x = \pm x_0$; the kinetic energy is an inverted parabola, equal to $E$ at $x = 0$ and zero at the ends; the total is a horizontal line. The table shows the fractions of the total energy.

| $x/x_0$ | $E_p/E$ | $E_k/E$ |
| --- | --- | --- |
| 0.00 | 0.0000 | 1.0000 |
| 0.25 | 0.0625 | 0.9375 |
| 0.50 | 0.2500 | 0.7500 |
| 0.75 | 0.5625 | 0.4375 |
| 1.00 | 1.0000 | 0.0000 |

At half the amplitude, only a quarter of the energy is potential. The two energies are equal where $x^2 = x_0^2/2$, at $x = \pm x_0/\sqrt{2} \approx \pm 0.71x_0$.

**Against time**, with $x = x_0\sin\omega t$: $E_p = E\sin^2\omega t$ and $E_k = E\cos^2\omega t$. Both vary between 0 and $E$, never become negative, and repeat **twice per oscillation**: their period is $T/2$ and their frequency $2f$. The curves are mirror images, crossing at $E/2$, and their sum is always $E$.

## Worked examples

:::worked-solution[Energy stores at a given displacement]
A $0.40\ \text{kg}$ mass oscillates with s.h.m. of angular frequency $5.0\ \text{rad s}^{-1}$ and amplitude $0.10\ \text{m}$. Find the total energy and the kinetic and potential energies when $x = 0.060\ \text{m}$.

1. $E = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2} \times 0.40 \times 5.0^2 \times 0.10^2 = 0.050\ \text{J}$.
2. $E_p = \tfrac{1}{2}m\omega^2x^2 = \tfrac{1}{2} \times 0.40 \times 25 \times 0.060^2 = 0.018\ \text{J}$.
3. $E_k = E - E_p = 0.050 - 0.018 = 0.032\ \text{J}$.
4. Energies are equal at $x = 0.10/\sqrt{2} = 0.071\ \text{m}$.
:::

:::worked-solution[Maximum speed from energy]
A pendulum bob of mass $0.20\ \text{kg}$ swings with period $1.6\ \text{s}$ and amplitude $5.0\ \text{cm}$ (small enough for s.h.m.). Find its total energy and maximum speed.

1. $\omega = \dfrac{2\pi}{1.6} = 3.93\ \text{rad s}^{-1}$.
2. $E = \tfrac{1}{2} \times 0.20 \times 3.93^2 \times 0.050^2 = 3.86 \times 10^{-3}\ \text{J}$.
3. At the lowest point all of this is kinetic: $v_0 = \sqrt{\dfrac{2E}{m}} = \sqrt{\dfrac{2 \times 3.86 \times 10^{-3}}{0.20}} = 0.196\ \text{m s}^{-1}$.
4. Check: $v_0 = \omega x_0 = 3.93 \times 0.050 = 0.196\ \text{m s}^{-1}$.
:::

## Common mistakes

:::mistake{title="Energy proportional to amplitude"}
Energy is proportional to amplitude **squared**. Halving the amplitude leaves a quarter of the energy.
:::

:::mistake{title="Half the energy at half the amplitude"}
At $x = x_0/2$, $E_p$ is only $E/4$; the energies are equal at $x_0/\sqrt{2}$.
:::

:::mistake{title="Energy-time period"}
Kinetic and potential energy each go through two cycles for every oscillation, because the speed is maximum twice per cycle (once in each direction).
:::

:::mistake{title="Using f instead of ω"}
$E = \tfrac{1}{2}m\omega^2x_0^2$ uses $\omega = 2\pi f$; using $f$ gives an answer about 40 times too small.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-2 (Form 5) and Cambridge Paper 4, often as a part of a longer s.h.m. question.
:::

:::exam-tip{title="Command words"}
*Describe* the energy changes: kinetic energy greatest at equilibrium, potential greatest at the extremes, total constant (undamped). *Show that* $E = \tfrac{1}{2}m\omega^2x_0^2$: use $v_0 = \omega x_0$ in $\tfrac{1}{2}mv_0^2$. *Sketch* (describe) energy graphs: parabolas against $x$; $\sin^2$ and $\cos^2$ curves of period $T/2$ against $t$.
:::

## Summary

:::summary
- In s.h.m. energy is exchanged between kinetic and potential; the total is constant without damping.
- $E = \tfrac{1}{2}m\omega^2x_0^2$, so $E \propto x_0^2$ and $E \propto \omega^2$.
- $E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2)$, $E_p = \tfrac{1}{2}m\omega^2x^2$.
- Against $x$: two parabolas; equal energies at $x = \pm x_0/\sqrt{2}$.
- Against $t$: $E_k$ and $E_p$ oscillate at twice the oscillator's frequency.
:::
