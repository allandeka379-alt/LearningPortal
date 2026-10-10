---
{
  "key": "medical.ultrasound",
  "title": "Ultrasound: production, reflection and attenuation",
  "summary": "Explain the piezoelectric effect and how a piezoelectric transducer generates and detects ultrasound, describe pulse-echo imaging and the information obtained from reflections at tissue boundaries, use specific acoustic impedance Z = ρc and the intensity reflection coefficient, explain the need for a coupling gel, apply attenuation I = I₀e^(−μx) and find depths from echo times.",
  "concepts": ["aphys.medical.ultrasound"],
  "estimatedMinutes": 50,
  "level": "core",
  "freePreview": true
}
---
## Introduction

In antenatal clinics from Chitungwiza to Gwanda, an expectant mother's first sight of her baby is an ultrasound image. Ultrasound scans are cheap, portable and, at the intensities used, involve no ionising radiation, which is why they are the first choice for imaging pregnancies and soft organs such as the liver, kidneys and heart.

This lesson explains how ultrasound is produced and detected, how echoes from boundaries inside the body build up an image, and the two quantities that decide how much of the signal returns: the **acoustic impedance mismatch** at each boundary and the **attenuation** along the path.

You should already know the speed, frequency and wavelength of a wave, intensity, and exponential decay.

## Key definitions

:::definition{term="Ultrasound"}
Longitudinal (sound) waves with frequencies above the upper limit of human hearing, about 20 kHz. Medical imaging uses about 1 to 15 MHz.
:::

:::definition{term="Piezoelectric effect"}
The production of a potential difference across certain crystals (such as quartz or lead zirconate titanate) when they are mechanically stressed, and conversely the change in their shape when a p.d. is applied.
:::

:::definition{term="Specific acoustic impedance Z"}
The product of the density of a medium and the speed of sound in it: $Z = \rho c$.
:::

:::definition{term="Intensity reflection coefficient"}
The ratio of the reflected intensity to the incident intensity at a boundary between two media, $I_R/I_0$.
:::

:::definition{term="Attenuation"}
The gradual decrease in intensity of a beam as it passes through a medium, due to absorption and scattering.
:::

:::formula{name="Acoustic impedance"}
$$
Z = \rho c
$$

$Z$ in $\text{kg m}^{-2}\ \text{s}^{-1}$; $\rho$ density in $\text{kg m}^{-3}$; $c$ speed of sound in $\text{m s}^{-1}$.
:::

:::formula{name="Intensity reflection coefficient (normal incidence)"}
$$
\frac{I_R}{I_0} = \frac{(Z_1 - Z_2)^2}{(Z_1 + Z_2)^2}
$$
:::

:::formula{name="Attenuation"}
$$
I = I_0e^{-\mu x}
$$

$\mu$ attenuation (absorption) coefficient in $\text{m}^{-1}$; $x$ thickness of medium travelled in m.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only (A Level topic 24, Paper 4). Ultrasound in medicine is not in the ZIMSEC topic list.
:::

## Producing and detecting ultrasound

A **piezoelectric transducer** contains a thin slice of piezoelectric crystal with electrodes on opposite faces.

- **Generating**: an alternating p.d. at the crystal's resonant frequency makes it expand and contract, so its faces vibrate and send ultrasound into the material in contact. The resonant frequency is set by the thickness of the crystal.
- **Detecting**: a returning ultrasound wave squeezes and stretches the crystal, producing a small alternating p.d. across it, which is amplified and processed.

The same transducer does both: it emits a short **pulse**, then switches to receiving while the echoes return. A backing material damps the crystal so that each pulse is short, which gives better depth resolution.

## Acoustic impedance and reflection

When ultrasound meets a boundary between two media, part is reflected and part transmitted. The fraction reflected depends on the **difference** in acoustic impedance:

| material | $\rho\,/\,\text{kg m}^{-3}$ | $c\,/\,\text{m s}^{-1}$ | $Z\,/\,\text{kg m}^{-2}\ \text{s}^{-1}$ |
| --- | --- | --- | --- |
| air | 1.29 | 330 | $4.26 \times 10^{2}$ |
| fat | 925 | 1450 | $1.34 \times 10^{6}$ |
| soft tissue | 1060 | 1540 | $1.63 \times 10^{6}$ |
| muscle | 1075 | 1590 | $1.71 \times 10^{6}$ |
| bone | 1900 | 4080 | $7.75 \times 10^{6}$ |
| coupling gel | 1020 | 1520 | $1.55 \times 10^{6}$ |

(Typical values; tissues vary.) Similar impedances give tiny reflections, which is ideal for imaging organ boundaries deep in the body; large differences, such as soft tissue to bone (about 43%) or anything to air (almost 100%), reflect strongly and leave little to go further.

### Why a coupling gel is needed

Without gel, a thin layer of air is trapped between the transducer and the skin. Since $Z_{\text{air}}$ is about 4000 times smaller than $Z_{\text{tissue}}$, the reflection coefficient is 0.999: virtually all the ultrasound is reflected at the skin and none enters the body. A gel with an impedance close to that of skin removes the air and lets almost all the energy through.

## Pulse-echo imaging

The transducer sends a short pulse and times the echoes. For a boundary at depth $d$, the pulse travels $2d$ in time $t$, so

$$
d = \frac{ct}{2}
$$

with $c$ the speed of sound in tissue (about $1540\ \text{m s}^{-1}$).

- An **A-scan** displays echo strength against time on a screen: the spacing of peaks gives the depths of boundaries (for example, measuring the diameter of a baby's head or the depth of the eye).
- A **B-scan** sweeps the beam across the body and displays each echo as a bright dot at the correct depth, building a two-dimensional image of the boundaries.

Higher frequencies give shorter wavelengths and finer detail but are attenuated more, so they are used for shallow organs; lower frequencies reach deeper.

## Attenuation

Intensity falls exponentially with distance travelled. For $\mu = 48\ \text{m}^{-1}$ (a typical value for soft tissue at a few MHz):

| $x\,/\,\text{cm}$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $I/I_0$ | 1.000 | 0.619 | 0.383 | 0.237 | 0.147 | 0.091 | 0.056 |

The intensity falls by the same fraction for each extra centimetre: the curve never reaches zero, and $\ln(I/I_0)$ against $x$ is a straight line of gradient $-\mu$. An echo from a boundary at depth $d$ is attenuated over a path of $2d$, so deep echoes are weak and the machine amplifies late echoes more.

## Worked examples

:::worked-solution[Reflection at a tissue-bone boundary]
Using the table, find the fraction of the intensity reflected at a soft tissue to bone boundary.

1. $Z_1 = 1.63 \times 10^{6}$, $Z_2 = 7.75 \times 10^{6}\ \text{kg m}^{-2}\ \text{s}^{-1}$.
2. $\dfrac{I_R}{I_0} = \dfrac{(1.63 - 7.75)^2}{(1.63 + 7.75)^2} = \dfrac{37.45}{87.98}$ (the $10^{6}$ factors cancel).
3. $I_R/I_0 = 0.426$: over 40% is reflected, which is why bone casts an acoustic "shadow".
:::

:::worked-solution[The effect of the gel]
Compare the fraction reflected at an air-tissue boundary with that at a gel-tissue boundary.

1. Air-tissue: $\dfrac{(4.26 \times 10^{2} - 1.63 \times 10^{6})^2}{(4.26 \times 10^{2} + 1.63 \times 10^{6})^2} = 0.999$.
2. Gel-tissue, with the impedances to four figures ($1.550$ and $1.632 \times 10^{6}$): $\dfrac{(1.550 - 1.632)^2}{(1.550 + 1.632)^2} = 6.6 \times 10^{-4}$.
3. With gel, over 99.9% of the intensity enters the body.
:::

:::worked-solution[Depth from echo time]
An echo from the back wall of an organ returns $65\ \mu\text{s}$ after the pulse is sent. Find the depth of the wall.

1. Distance travelled $= ct = 1540 \times 65 \times 10^{-6} = 0.100\ \text{m}$ (there and back).
2. $d = ct/2 = 0.050\ \text{m} = 5.0\ \text{cm}$.
:::

## Common mistakes

:::mistake{title="Forgetting the return journey"}
The echo time covers the path to the boundary and back: $d = ct/2$, and attenuation acts over $2d$.
:::

:::mistake{title="Z values, not ρ or c alone"}
Reflection depends on the impedance $Z = \rho c$, not just on density or speed.
:::

:::mistake{title="Gel to make the probe slide"}
The gel's main purpose is to exclude air, matching the impedance of the skin so that ultrasound is transmitted.
:::

:::mistake{title="Attenuation is linear"}
Intensity falls exponentially: equal thicknesses reduce it by equal **fractions**, not equal amounts.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level topic 24). Expect explanations of the piezoelectric transducer, calculations of $Z$, reflection coefficients, depths and attenuation, and the reason for the gel.
:::

:::exam-tip{title="Command words"}
*Explain* how ultrasound is produced: alternating p.d. across a piezoelectric crystal makes it vibrate at its resonant frequency. *Explain* how it is detected: the returning wave deforms the crystal, producing a p.d. *Explain* the gel: air gap → large impedance difference → almost total reflection. *Calculate* depth: $d = ct/2$. *Show that* a reflection coefficient is small: substitute both impedances with their powers of ten.
:::

## Summary

:::summary
- A piezoelectric crystal vibrates when an alternating p.d. is applied (generation) and produces a p.d. when vibrated by an echo (detection).
- $Z = \rho c$; the intensity reflection coefficient is $(Z_1 - Z_2)^2/(Z_1 + Z_2)^2$.
- A coupling gel excludes air, whose tiny impedance would reflect almost all the ultrasound at the skin.
- Pulse-echo: depth $d = ct/2$; A-scans give depths, B-scans build images.
- Attenuation: $I = I_0e^{-\mu x}$; higher frequencies give finer detail but are attenuated more.
:::
