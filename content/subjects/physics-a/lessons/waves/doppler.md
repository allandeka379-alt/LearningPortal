---
{
  "key": "waves.doppler",
  "title": "The Doppler effect for sound",
  "summary": "Explain with wavefronts why the observed frequency of sound rises as a source approaches and falls as it moves away, and use f_o = f_s v/(v ± v_s) for a moving source and a stationary observer, including finding a source's speed.",
  "concepts": ["aphys.waves.doppler"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Stand beside the Harare-Bulawayo road as an ambulance races past with its siren on. As it approaches, the note is high; the instant it passes, the pitch drops noticeably. The siren itself never changes its note. What changes is the spacing of the wavefronts reaching you, because the source is moving. This is the **Doppler effect**, and it is used in traffic speed checks, in medical ultrasound to measure blood flow and, with light, to measure how fast galaxies recede.

You should know $v = f\lambda$, that the speed of sound depends on the medium and not on the source, and the idea of a wavefront.

## Key definitions

:::definition{term="Doppler effect"}
The change in the observed frequency of a wave when the source of the wave and the observer are moving relative to each other.
:::

:::definition{term="Wavefront"}
A line or surface joining points on a wave that are in phase, for example the crests of successive waves.
:::

:::formula{name="Moving source, stationary observer"}
$$
f_o = \frac{f_s\,v}{v \pm v_s}
$$

$f_o$ is the observed frequency and $f_s$ the source frequency (both in Hz), $v$ the speed of sound in the air and $v_s$ the speed of the source (both in $\text{m s}^{-1}$). Use $v - v_s$ when the source moves **towards** the observer (higher $f_o$) and $v + v_s$ when it moves **away** (lower $f_o$).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The Doppler effect for sound is **Cambridge only** (AS 7.3); it is not in the ZIMSEC topic list. Cambridge restricts it to a moving source and a stationary observer. The redshift of light from galaxies is covered in the astronomy lessons (Cambridge A Level).
:::

## Explaining the effect with wavefronts

Picture a stationary source emitting sound of frequency $f_s$. The wavefronts spread out as concentric circles centred on the source, all one wavelength $\lambda = v/f_s$ apart. Observers on every side receive wavefronts at the same rate, $f_s$.

Now let the source move to the right at speed $v_s$. Each wavefront still spreads at speed $v$ from the point where it was emitted, but each new wavefront is emitted from a point further to the right. The circles are no longer concentric:

- **Ahead of the source** (to the right) the wavefronts are bunched together. In one period $T = 1/f_s$ the previous wavefront travels $vT$ while the source moves $v_sT$ after it, so the wavelength is shortened to $\lambda' = (v - v_s)/f_s$.
- **Behind the source** they are spread out: $\lambda' = (v + v_s)/f_s$.

The waves still travel at $v$ relative to the air, so the observed frequency is

$$
f_o = \frac{v}{\lambda'} = \frac{v}{(v \mp v_s)/f_s} = \frac{f_s\,v}{v \mp v_s}.
$$

The amplitude and loudness are separate matters: the note gets louder as the source comes closer, but the **pitch** depends only on the frequency received.

The table shows the wavelengths for a $900\ \text{Hz}$ siren moving at $25\ \text{m s}^{-1}$ through air where $v = 340\ \text{m s}^{-1}$.

| Position of observer | Wavelength / m | Observed frequency / Hz |
| --- | --- | --- |
| Source at rest | 0.378 | 900 |
| Ahead of the moving source | 0.350 | 971 |
| Behind the moving source | 0.406 | 838 |

## Worked examples

:::worked-solution[An ambulance passing a pedestrian]
An ambulance siren emits $900\ \text{Hz}$. The ambulance travels at $25\ \text{m s}^{-1}$; the speed of sound is $340\ \text{m s}^{-1}$. Find the frequency heard by a stationary pedestrian as it approaches and as it moves away.

1. Approaching: $f_o = \dfrac{f_s v}{v - v_s} = \dfrac{900 \times 340}{340 - 25} = \dfrac{306\,000}{315} = 971\ \text{Hz}$.
2. Receding: $f_o = \dfrac{900 \times 340}{340 + 25} = \dfrac{306\,000}{365} = 838\ \text{Hz}$.
3. The pedestrian hears the pitch drop by about $133\ \text{Hz}$ as the ambulance passes. The change is not symmetrical: the rise above 900 Hz (71 Hz) is larger than the fall below it (62 Hz).
:::

:::worked-solution[Finding the speed of a source]
A car horn sounds continuously. A stationary listener hears $520\ \text{Hz}$ as the car approaches and $460\ \text{Hz}$ as it moves away along the same road. Find the car's speed and the true horn frequency. Take $v = 340\ \text{m s}^{-1}$.

1. Write both equations: $520 = \dfrac{f_s \times 340}{340 - v_s}$ and $460 = \dfrac{f_s \times 340}{340 + v_s}$.
2. Each gives $340 f_s$, so $520(340 - v_s) = 460(340 + v_s)$.
3. Expand: $176\,800 - 520v_s = 156\,400 + 460v_s$, so $980v_s = 20\,400$ and $v_s = 20.8\ \text{m s}^{-1}$.
4. $f_s = \dfrac{520(340 - 20.8)}{340} = 488\ \text{Hz}$.
5. Check: $\dfrac{488 \times 340}{340 + 20.8} = 460\ \text{Hz}$.
:::

## Applications

- **Passing vehicles and sirens**: the drop in pitch as a vehicle passes; from the two frequencies and the speed of sound, its speed can be found as above.
- **Speed measurement**: traffic speed guns reflect waves from a moving vehicle and measure the frequency shift. (The radar version uses microwaves and a reflection, which doubles the shift; only the sound formula for a moving source is examined.)
- **Medicine and astronomy**: Doppler ultrasound measures the speed of blood in an artery; the redshift of light measures the speed at which galaxies recede.

## Common mistakes

:::mistake{title="Choosing the sign"}
Approaching means a **higher** observed frequency, so the denominator must be **smaller**: $v - v_s$. Check the answer: approaching must give $f_o > f_s$.
:::

:::mistake{title="Thinking the wave speed changes"}
The speed of sound relative to the air is set by the air, not by the source. The moving source changes the wavelength, and therefore the received frequency.
:::

:::mistake{title="Confusing loudness and pitch"}
Getting louder as the source approaches is due to distance; the change in pitch is the Doppler effect.
:::

:::mistake{title="Using the formula for a moving observer"}
The syllabus formula is for a moving source and stationary observer only. Do not adapt it for a moving listener.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Papers 1 and 2 (AS). Not examined by ZIMSEC.
:::

:::exam-tip{title="Command words"}
*Explain* the effect: wavefronts bunched ahead of (spread behind) the moving source, so a shorter (longer) wavelength and, at the same wave speed, a higher (lower) frequency. *Calculate*: write the formula with the sign chosen, substitute with units and give 3 s.f. *Determine the speed of the source* from two frequencies: set up two equations and eliminate $f_s$.
:::

## Summary

:::summary
- The Doppler effect is the change in observed frequency due to relative motion of source and observer.
- A moving source bunches wavefronts ahead and spreads them behind; the wave speed is unchanged.
- $f_o = f_s v/(v \pm v_s)$: minus for approaching (higher pitch), plus for receding (lower pitch).
- Two observed frequencies (approach and recession) give both the source speed and its true frequency.
- Cambridge only; moving source and stationary observer only.
:::
