---
{
  "key": "oscillations.damping-resonance",
  "title": "Damping, forced oscillations and resonance",
  "summary": "Explain damping by resistive forces, describe light, critical and heavy damping and their displacement-time graphs, distinguish free and forced oscillations, explain resonance and how damping changes the resonance curve, and give useful and harmful examples.",
  "concepts": ["aphys.oscillations.damping-resonance"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Drive a kombi along a dirt road outside Masvingo with long, evenly spaced ripples and at one particular speed the body starts to bounce violently; slow down or speed up and the bouncing eases. Push a child on a swing in time with the swing and a small push each cycle builds a large motion. Tune a radio to one station out of dozens broadcasting at once. All three are **resonance**: a system driven at its own natural frequency absorbs energy very efficiently. Damping, the loss of energy to resistive forces, controls how large that response becomes, and engineers design both into suspensions, bridges and buildings.

You should know s.h.m., the energy of an oscillator ($E \propto x_0^2$) and natural frequency formulae such as $T = 2\pi\sqrt{m/k}$.

## Key definitions

:::definition{term="Free oscillation"}
An oscillation of a system that, once started, is acted on by no external periodic force; it oscillates at its natural frequency.
:::

:::definition{term="Natural frequency"}
The frequency at which a system oscillates when it is displaced and released and then left to oscillate freely.
:::

:::definition{term="Damping"}
The loss of energy from an oscillating system to its surroundings, caused by resistive (frictional or viscous) forces, so that the amplitude decreases.
:::

:::definition{term="Forced oscillation"}
An oscillation in which a periodic driving force acts on the system; in the steady state the system oscillates at the driving frequency.
:::

:::definition{term="Resonance"}
The large increase in the amplitude of a forced oscillation that occurs when the driving frequency equals the natural frequency of the system, so that energy is transferred to the system most efficiently.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards (ZIMSEC Form 5; Cambridge A Level 17.3) require the types of damping and their graphs, free and forced oscillations, resonance, the effect of damping on the resonance curve and examples. No damping equations are required.
:::

## Types of damping

A resistive force (air resistance, friction, a viscous liquid, a shock absorber) always opposes the velocity, so it does negative work and removes energy. Because $E \propto x_0^2$, the amplitude falls.

| Type | Displacement-time graph after release | Example |
| --- | --- | --- |
| Light damping | Oscillates at almost the natural frequency; amplitude decreases gradually, by the same fraction each cycle (an exponential envelope) | Pendulum in air, guitar string |
| Critical damping | Returns to equilibrium in the shortest possible time **without** overshooting or oscillating | Vehicle suspension, door closers, analogue meters |
| Heavy damping (overdamping) | No oscillation; creeps back to equilibrium slowly, taking longer than critical damping | Pendulum in thick oil, heavy fire-door closer |

Light damping hardly changes the period; it reduces the amplitude and the energy. A car's suspension is designed to be close to critically damped: after a bump, the body settles quickly without bouncing up and down.

:::worked-solution[Energy lost in a lightly damped oscillation]
A lightly damped pendulum's amplitude falls by 20% every complete oscillation, starting at $10.0\ \text{cm}$.

| Oscillation number | Amplitude / cm | Energy as % of initial |
| --- | --- | --- |
| 0 | 10.0 | 100 |
| 1 | 8.0 | 64 |
| 2 | 6.4 | 41 |
| 3 | 5.1 | 26 |
| 4 | 4.1 | 17 |
| 5 | 3.3 | 11 |

1. Each cycle the amplitude is multiplied by 0.80.
2. Energy $\propto$ amplitude$^2$, so each cycle the energy is multiplied by $0.80^2 = 0.64$.
3. The fraction of energy lost per cycle is $1 - 0.64 = 0.36$, i.e. 36%, much more than the 20% drop in amplitude.
4. The amplitudes plotted against time lie on a smooth decay curve; the ratio of successive amplitudes is constant.
:::

## Forced oscillations and resonance

Attach a mass-spring system to a vibration generator whose frequency $f$ can be varied. After any start-up motion dies away, the mass oscillates at the **driving** frequency, not its natural frequency $f_0$. Its amplitude depends on how close $f$ is to $f_0$:

- $f \ll f_0$: the mass follows the driver with about the driver's amplitude, in phase.
- $f = f_0$: the amplitude is a **maximum** (resonance): each push arrives at the right moment to add energy.
- $f \gg f_0$: the mass hardly moves; it lags the driver by almost half a cycle.

The steady amplitude is reached when the energy supplied each cycle by the driver equals the energy lost to damping each cycle.

## The effect of damping on resonance

The table gives the amplitude of a system with natural frequency $2.0\ \text{Hz}$, as a multiple of its displacement under a steady force of the same size, for light and for heavier damping.

| Driving frequency / Hz | Amplitude ratio, light damping | Amplitude ratio, heavier damping |
| --- | --- | --- |
| 0.5 | 1.07 | 1.06 |
| 1.0 | 1.33 | 1.27 |
| 1.5 | 2.26 | 1.77 |
| 1.8 | 4.92 | 2.13 |
| 2.0 | 12.57 | 2.09 |
| 2.2 | 4.40 | 1.77 |
| 2.5 | 1.75 | 1.22 |
| 3.0 | 0.80 | 0.69 |
| 4.0 | 0.33 | 0.32 |

Plotted against driving frequency, both curves start near 1 at low frequency and fall towards zero at high frequency. Increasing the damping:

- **lowers** the peak amplitude (much less energy builds up);
- **broadens** the peak (the system responds over a wider range of frequencies);
- moves the peak to a **slightly lower** frequency than $f_0$ (here about 1.8 Hz).

Damping has little effect far from resonance.

:::worked-solution[Resonance on a rippled road]
Each wheel of a loaded kombi carries $300\ \text{kg}$ on a suspension spring of spring constant $2.0 \times 10^{4}\ \text{N m}^{-1}$. A dirt road has gentle ripples $8.0\ \text{m}$ apart. At what speed is resonance a problem?

1. Natural frequency: $f_0 = \dfrac{1}{2\pi}\sqrt{\dfrac{k}{m}} = \dfrac{1}{2\pi}\sqrt{\dfrac{2.0 \times 10^{4}}{300}} = 1.30\ \text{Hz}$.
2. Driving frequency at speed $v$: ripples are met at $f = v/8.0$.
3. Resonance when $f = f_0$: $v = 1.30 \times 8.0 = 10.4\ \text{m s}^{-1}$ (about $37\ \text{km h}^{-1}$).
4. The bouncing is worst near this speed; the shock absorbers (damping) limit the amplitude. Much higher speeds drive the suspension far above $f_0$, where the body hardly responds.
:::

## Useful and harmful resonance

| Useful | Harmful |
| --- | --- |
| Tuning a radio: the receiving circuit resonates with the chosen station's frequency | Bridges and footbridges driven by wind or marching feet (the Tacoma Narrows bridge collapsed in 1940) |
| Microwave ovens: microwaves drive water molecules at a frequency they absorb strongly | Vehicle parts rattling at particular engine speeds; vibrating machinery in a maize mill loosening bolts |
| Musical instruments: air columns and soundboards resonate | Buildings shaken by earthquakes at their natural frequency |
| Magnetic resonance imaging in hospitals | Wine glass shattered by a sustained note |

Engineers reduce harmful resonance by changing the natural frequency (stiffening a structure), adding damping (shock absorbers, dampers in tall buildings) or avoiding driving frequencies near $f_0$.

## Common mistakes

:::mistake{title="Damping changes the frequency of free oscillations a lot"}
Light damping reduces amplitude but barely changes the period.
:::

:::mistake{title="Forced oscillations at the natural frequency"}
In the steady state a forced system oscillates at the **driving** frequency, whatever its natural frequency.
:::

:::mistake{title="Critical damping means no motion"}
A critically damped system does move back to equilibrium; it just does so as fast as possible without overshooting.
:::

:::mistake{title="Damping moves the peak to a higher frequency"}
Damping lowers and broadens the peak and shifts it slightly to a **lower** frequency.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-2 (Form 5) and Cambridge Paper 4; resonance curves are a favourite "sketch and explain" item.
:::

:::exam-tip{title="Command words"}
*Define resonance* with both the condition (driving frequency = natural frequency) and the effect (maximum amplitude). *Sketch* (describe) the effect of damping: a lower, broader peak at a slightly lower frequency, with the same behaviour far from resonance. *Explain* critical damping: return to equilibrium in the shortest time without oscillation. *Suggest* an example: give the system and the driver.
:::

## Summary

:::summary
- Damping is the loss of energy to resistive forces; amplitude falls as energy falls ($E \propto x_0^2$).
- Light damping: gradually decaying oscillations; critical: quickest return without oscillation; heavy: slow return without oscillation.
- Forced oscillations occur at the driving frequency; resonance gives maximum amplitude when driving frequency = natural frequency.
- More damping gives a lower, broader resonance peak at a slightly lower frequency.
- Resonance is useful (radio tuning, microwave ovens, instruments) and harmful (bridges, vehicles, machinery).
:::
