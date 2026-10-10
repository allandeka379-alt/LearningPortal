---
{
  "key": "astro.redshift-hubble",
  "title": "Redshift, Hubble's law and the expanding Universe",
  "summary": "Explain the redshift of spectral lines from distant galaxies, use Δλ/λ ≈ Δf/f ≈ v/c to find the speed of recession, describe how redshift shows that the Universe is expanding, use Hubble's law v ≈ H₀d in SI units, explain how it leads to the Big Bang theory, and estimate the age of the Universe as 1/H₀.",
  "concepts": ["aphys.astro.redshift-hubble"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

In the 1920s astronomers measuring the spectra of distant galaxies noticed something strange. The familiar dark lines produced by hydrogen, calcium and other elements were all there, in the same pattern as in the laboratory, but shifted towards the red end of the spectrum. The further away the galaxy, the bigger the shift. That simple observation overturned the idea of an unchanging Universe and led to the Big Bang theory: the Universe had a beginning, about fourteen billion years ago, and has been expanding ever since.

You should already know the Doppler effect for a moving source, the emission and absorption spectra of atoms, and the inverse-square law and standard candles for finding distances to galaxies.

## Key definitions

:::definition{term="Redshift"}
The increase in the wavelength (decrease in frequency) of electromagnetic radiation received from a source moving away from the observer; for spectral lines, the shift of the whole pattern of lines towards longer wavelengths.
:::

:::definition{term="Hubble's law"}
The speed at which a distant galaxy is receding from the Earth is approximately proportional to its distance from the Earth.
:::

:::definition{term="Hubble constant"}
The constant of proportionality $H_0$ in Hubble's law, the recession speed per unit distance; in SI units it has the unit $\text{s}^{-1}$.
:::

:::formula{name="Redshift for a source moving away"}
$$
\frac{\Delta\lambda}{\lambda} \approx \frac{\Delta f}{f} \approx \frac{v}{c}
$$

$\Delta\lambda$ = observed wavelength − emitted (laboratory) wavelength (m), $\lambda$ = emitted wavelength (m), $\Delta f$ = magnitude of the change in frequency (Hz), $f$ = emitted frequency (Hz), $v$ = speed of the source away from the observer ($\text{m s}^{-1}$), $c = 3.00 \times 10^{8}\ \text{m s}^{-1}$. Valid for $v$ much less than $c$.
:::

:::formula{name="Hubble's law"}
$$
v \approx H_0 d
$$

$v$ = recession speed ($\text{m s}^{-1}$), $d$ = distance to the galaxy (m), $H_0$ = Hubble constant ($\text{s}^{-1}$), measured to be about $2.3 \times 10^{-18}\ \text{s}^{-1}$ (equivalent to about $70\ \text{km s}^{-1}$ per megaparsec). Use the value given in a question.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Redshift and Hubble's law are Cambridge A Level only (topic 25.3, Paper 4); they are not in the ZIMSEC topic list. Cambridge expects SI units for $H_0$.
:::

## Redshift

A galaxy's light contains absorption lines at wavelengths fixed by the atoms in its stars. If the galaxy moves away from us, each successive wavecrest is emitted from slightly further away, so the waves arrive stretched out: every wavelength is longer, and every frequency lower, by the same fraction $v/c$. The **pattern** of lines is unchanged, which is how astronomers recognise them; only their positions move towards the red.

Light from a source moving towards us is **blueshifted** (shorter wavelengths). A few nearby galaxies, such as the Andromeda galaxy, are blueshifted, but essentially all distant galaxies are redshifted.

:::worked-solution[Speed of a receding galaxy]
The hydrogen-alpha line has a laboratory wavelength of $656.3\ \text{nm}$. In the spectrum of a galaxy it is observed at $669.4\ \text{nm}$. Find the galaxy's speed of recession.

1. $\Delta\lambda = 669.4 - 656.3 = 13.1\ \text{nm}$.
2. $v = c\,\dfrac{\Delta\lambda}{\lambda} = 3.00 \times 10^{8} \times \dfrac{13.1}{656.3}$.
3. $v = 5.99 \times 10^{6}\ \text{m s}^{-1}$, about 2% of the speed of light, so the approximation is valid. (The nanometres cancel, so there is no need to convert.)
:::

## Hubble's law and the expanding Universe

When the recession speeds of many galaxies are plotted against their distances (found from standard candles), the points lie close to a straight line through the origin. Typical data:

| $d\,/\,10^{24}\ \text{m}$ | 1.0 | 2.0 | 3.0 | 4.0 | 5.0 |
|---|---|---|---|---|---|
| $v\,/\,10^{6}\ \text{m s}^{-1}$ | 2.4 | 4.4 | 7.1 | 9.0 | 11.6 |

The gradient of the best-fit line is the Hubble constant, here about $2.3 \times 10^{-18}\ \text{s}^{-1}$. The scatter is real: galaxies also have their own random motions, and their distances are uncertain.

**Why this means expansion.** If every distant galaxy is moving away from us, with speed proportional to distance, then the space between galaxies is growing everywhere. An observer in any other galaxy would see the same pattern: all galaxies receding, faster in proportion to distance. We are not at a special centre; the whole Universe is expanding, like dots on the surface of a balloon being blown up, all moving apart from one another.

:::worked-solution[Distance from redshift]
Find the distance to the galaxy in the first worked example, taking $H_0 = 2.3 \times 10^{-18}\ \text{s}^{-1}$.

1. $d = \dfrac{v}{H_0} = \dfrac{5.99 \times 10^{6}}{2.3 \times 10^{-18}}$.
2. $d = 2.6 \times 10^{24}\ \text{m}$, about 275 million light-years.
:::

Once $H_0$ is known, Hubble's law becomes a distance-measuring tool for galaxies too far away for any standard candle: measure the redshift, find $v$, and divide by $H_0$.

## The Big Bang and the age of the Universe

If the galaxies are moving apart now, they were closer together in the past. Running the expansion backwards, all the matter and energy of the Universe was once concentrated in an extremely hot, dense state. The **Big Bang theory** says that the Universe began from this state and has been expanding and cooling ever since. (Other evidence, such as the cosmic microwave background radiation, supports it.)

**Estimating the age.** A galaxy at distance $d$ moving at speed $v$ would have taken a time $t = d/v$ to get there from a single point, if its speed had been constant. By Hubble's law $d/v = 1/H_0$ for every galaxy, so all of them would have started together at a time

$$
t \approx \frac{1}{H_0} = \frac{1}{2.3 \times 10^{-18}} = 4.3 \times 10^{17}\ \text{s}
$$

ago, about $1.4 \times 10^{10}$ years (14 billion years). This is only an estimate, because the rate of expansion has not been constant.

## Common mistakes

:::mistake{title="Using the observed wavelength as λ"}
In $\Delta\lambda/\lambda$, $\lambda$ is the emitted (laboratory) wavelength; the difference is small, but use the right value.
:::

:::mistake{title="Saying redshifted light is red"}
Redshift means a shift to **longer** wavelengths; a line in the blue part of the spectrum is still blue-green after a small redshift.
:::

:::mistake{title="Mixing units for H₀"}
Cambridge uses SI: $H_0$ in $\text{s}^{-1}$, $v$ in $\text{m s}^{-1}$, $d$ in m. Convert km to m and light-years to m first.
:::

:::mistake{title="Thinking we are at the centre"}
Every observer sees all distant galaxies receding; the expansion has no centre.
:::

## Exam tips

:::exam-tip{title="Cambridge Paper 4"}
*Describe* redshift (shift of spectral lines to longer wavelengths). *Calculate* $v$ from $\Delta\lambda/\lambda$ or $\Delta f/f$, then $d$ from $v = H_0d$. *Explain* how redshift shows an expanding Universe (almost all distant galaxies receding, faster when further) and how Hubble's law leads to the Big Bang (galaxies closer together in the past; a common origin). *Estimate* the age as $1/H_0$ and say why it is approximate.
:::

## Summary

:::summary
- Light from a receding source is redshifted: $\Delta\lambda/\lambda \approx \Delta f/f \approx v/c$ for $v \ll c$.
- Almost all distant galaxies are redshifted, and more distant ones more strongly: the Universe is expanding.
- Hubble's law: $v \approx H_0d$, with $H_0 \approx 2.3 \times 10^{-18}\ \text{s}^{-1}$ in SI units.
- Running the expansion backwards suggests the Universe began in a hot, dense state: the Big Bang.
- Age of the Universe $\approx 1/H_0 \approx 4 \times 10^{17}\ \text{s} \approx 14$ billion years.
:::
