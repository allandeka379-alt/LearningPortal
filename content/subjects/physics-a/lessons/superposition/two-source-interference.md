---
{
  "key": "superposition.two-source-interference",
  "title": "Interference, coherence and Young's double slit",
  "summary": "Explain interference and coherence, state the conditions for observable two-source fringes, use path difference and phase difference to predict maxima and minima, describe demonstrations with water, sound, microwaves and light, and use λ = ax/D for Young's double-slit experiment.",
  "concepts": ["aphys.superposition.two-source-interference"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Walk slowly across the front of a school hall while two loudspeakers play the same steady note and you will hear it grow loud, fade almost to nothing, and grow loud again every metre or so. Nothing about the loudspeakers changes: the waves from the two sources are adding up at some places and cancelling at others. In 1801 Thomas Young showed the same effect with light, producing bright and dark bands from two narrow slits; it was the decisive evidence that light is a wave, and it is still one of the simplest ways to measure a wavelength of light.

You should know the principle of superposition, phase difference and diffraction (which makes the waves from two slits overlap).

## Key definitions

:::definition{term="Interference"}
The superposition of two or more waves from coherent sources to give a resultant wave whose amplitude depends on the phase difference between the waves at each point.
:::

:::definition{term="Coherent sources"}
Sources that emit waves with a constant phase difference between them (which requires the same frequency).
:::

:::definition{term="Path difference"}
The difference in the distances travelled by two waves from their sources to a point.
:::

:::definition{term="Constructive and destructive interference"}
Constructive interference occurs where the waves arrive in phase, giving maximum amplitude. Destructive interference occurs where they arrive in antiphase, giving minimum amplitude.
:::

:::formula{name="Young's double slit"}
$$
\lambda = \frac{ax}{D}
$$

$a$ is the slit separation (centre to centre), $x$ the fringe separation (distance between adjacent bright fringes) and $D$ the distance from the slits to the screen, all in m; $\lambda$ the wavelength in m. Valid when $D \gg a$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require interference, coherence, the conditions for fringes, path and phase difference, the demonstrations and $\lambda = ax/D$ (ZIMSEC Form 5; Cambridge AS 8.3). The diffraction grating has its own lesson.
:::

## Conditions for observable interference

For a steady, visible pattern of fringes:

1. The sources must be **coherent**: a constant phase difference, so the same frequency. Two separate lamps are never coherent because their light is emitted in random bursts; Young solved this by lighting both slits from one source.
2. The waves should have **similar amplitudes**, so that destructive interference gives near-zero intensity and the contrast is high.
3. For transverse waves, the waves must have the **same polarisation** (or be unpolarised); waves oscillating in perpendicular planes cannot cancel.
4. The waves must **overlap**, which for slits needs diffraction.

## Path difference and phase difference

For two sources oscillating **in phase**:

| Path difference | Phase difference | Result |
| --- | --- | --- |
| $0, \lambda, 2\lambda, \ldots = n\lambda$ | $0, 2\pi, 4\pi, \ldots$ | Constructive: maximum |
| $\tfrac{1}{2}\lambda, \tfrac{3}{2}\lambda, \ldots = (n + \tfrac{1}{2})\lambda$ | $\pi, 3\pi, \ldots$ | Destructive: minimum |

Phase difference $= \dfrac{\text{path difference}}{\lambda} \times 2\pi$. If the sources are in antiphase, the conditions swap.

:::worked-solution[Two loudspeakers]
Two loudspeakers connected to the same signal generator emit $680\ \text{Hz}$ in phase; sound travels at $340\ \text{m s}^{-1}$. A microphone at P is $3.00\ \text{m}$ from one loudspeaker and $3.75\ \text{m}$ from the other. Is P a maximum or a minimum?

1. Wavelength: $\lambda = \dfrac{340}{680} = 0.50\ \text{m}$.
2. Path difference $= 3.75 - 3.00 = 0.75\ \text{m}$.
3. In wavelengths: $\dfrac{0.75}{0.50} = 1.5$, a half-integer, so the waves arrive in antiphase (phase difference $3\pi$).
4. P is a minimum: destructive interference. It is not quite silent, because the farther loudspeaker's wave is slightly weaker and sound reflects from the walls.
:::

## Demonstrations

- **Water waves**: two dippers on one vibrating bar in a ripple tank give lines of calm water (nodal lines) radiating between lines of large ripples.
- **Sound**: two loudspeakers driven by one signal generator; a listener or microphone moving across the front finds loud and quiet regions.
- **Microwaves**: a transmitter in front of a metal sheet with two slits a few centimetres apart; a probe receiver moved along an arc finds maxima and minima.
- **Light**: a laser (or a lamp with a single slit and a colour filter) illuminating two narrow slits less than a millimetre apart; fringes appear on a screen a metre or more away. Never look into a laser beam.

## Young's double-slit experiment

Light from a laser falls on two narrow parallel slits a fraction of a millimetre apart. The two slits act as coherent sources because they are lit by the same wavefront. Light diffracts at each slit and the two beams overlap on a screen several metres away, showing equally spaced bright and dark fringes. At the centre the path difference is zero, so there is a bright fringe; the next bright fringes on either side have a path difference of one wavelength, and so on.

Because $x$ is only a few millimetres, measure across several fringes: for example, across 10 fringe spacings, and divide by 10. This reduces the percentage uncertainty in $x$.

:::worked-solution[Wavelength of a laser]
Slits $0.50\ \text{mm}$ apart are $1.80\ \text{m}$ from a screen. Ten fringe spacings measure $21.6\ \text{mm}$.

1. Fringe separation: $x = \dfrac{21.6}{10} = 2.16\ \text{mm} = 2.16 \times 10^{-3}\ \text{m}$.
2. $\lambda = \dfrac{ax}{D} = \dfrac{0.50 \times 10^{-3} \times 2.16 \times 10^{-3}}{1.80}$.
3. $\lambda = 6.00 \times 10^{-7}\ \text{m} = 600\ \text{nm}$: orange-red light.
4. With blue light of $450\ \text{nm}$ in the same apparatus the fringes would be closer: $x = \lambda D/a = 1.62\ \text{mm}$.
:::

Rearranged as $x = \lambda D/a$, the formula shows that the fringes spread apart when the wavelength or the slit-screen distance increases, and move closer together when the slits are further apart. With white light the central fringe is white and the others show coloured edges, because each wavelength has its own spacing.

## Common mistakes

:::mistake{title="Mixing up a and x"}
$a$ is the slit separation (a fraction of a millimetre); $x$ is the fringe separation on the screen (millimetres). Check that $D$ is much larger than both.
:::

:::mistake{title="Coherent means in phase"}
Coherent sources have a **constant** phase difference, which may be zero or any other fixed value.
:::

:::mistake{title="Counting fringes instead of spacings"}
Eleven bright fringes have ten spacings between them.
:::

:::mistake{title="Energy destroyed at minima"}
Energy is redistributed, not destroyed: the bright fringes are brighter than either beam alone would be.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Interference is a regular ZIMSEC Paper 2 and Cambridge Paper 2 question, and the double-slit method appears in practical Papers 3 and 4.
:::

:::exam-tip{title="Command words"}
*Explain the meaning of coherent*: constant phase difference. *Explain the formation of fringes*: diffraction at each slit, overlap, superposition, path difference $n\lambda$ for bright and $(n + \tfrac{1}{2})\lambda$ for dark. *Determine* $\lambda$: show $x$ from several spacings, all lengths in metres, and the answer in nm or standard form.
:::

## Summary

:::summary
- Interference is the superposition of waves from coherent sources (constant phase difference).
- Fringes need coherence, similar amplitudes, the same polarisation and overlapping beams.
- In-phase sources: path difference $n\lambda$ gives a maximum, $(n + \tfrac{1}{2})\lambda$ a minimum.
- Young's double slit: $\lambda = ax/D$; measure $x$ over several fringes.
- The pattern is shown by water, sound, microwaves and light.
:::
