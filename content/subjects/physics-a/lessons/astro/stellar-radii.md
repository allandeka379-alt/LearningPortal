---
{
  "key": "astro.stellar-radii",
  "title": "Wien's law, the Stefan-Boltzmann law and the sizes of stars",
  "summary": "Use Wien's displacement law λ_max ∝ 1/T to estimate the surface temperature of a star from the peak of its spectrum, use the Stefan-Boltzmann law L = 4πσr²T⁴, and combine the two (with a luminosity from a standard candle or from flux and distance) to estimate stellar radii and compare stars by temperature and size.",
  "concepts": ["aphys.astro.stellar-radii"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Look at the constellation Orion from anywhere in Zimbabwe on a summer evening and two of its brightest stars differ obviously in colour: one glows orange-red, the other blue-white. That colour is a thermometer. Even though no star can be visited, two laws of thermal radiation let astronomers find a star's surface temperature from its colour, and then, combined with its luminosity, its size. Stars turn out to range from smaller than the Earth to large enough to swallow the orbit of Mars.

You should already know luminosity and the inverse-square law $F = L/4\pi d^{2}$, temperature in kelvin, and the electromagnetic spectrum.

## Key definitions

:::definition{term="Black body"}
An idealised object that absorbs all the electromagnetic radiation falling on it and emits a continuous spectrum of radiation whose distribution depends only on its temperature. Stars behave approximately as black bodies.
:::

:::definition{term="Wien's displacement law"}
The wavelength at which a black body emits radiation of maximum intensity is inversely proportional to its thermodynamic temperature.
:::

:::definition{term="Stefan-Boltzmann law"}
The total power radiated per unit surface area of a black body is proportional to the fourth power of its thermodynamic temperature, so the luminosity of a star of radius $r$ is $L = 4\pi\sigma r^{2}T^{4}$.
:::

:::formula{name="Wien's displacement law"}
$$
\lambda_{\max} T = \text{constant} \approx 2.9 \times 10^{-3}\ \text{m K}
$$

$\lambda_{\max}$ = wavelength of peak emission (m), $T$ = surface temperature (K). The constant is given in questions when needed.
:::

:::formula{name="Stefan-Boltzmann law for a star"}
$$
L = 4\pi\sigma r^{2}T^{4}
$$

$L$ = luminosity (W), $\sigma$ = Stefan-Boltzmann constant $= 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$, $r$ = radius of the star (m), $T$ = surface temperature (K). $4\pi r^{2}$ is the star's surface area.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Stellar radii are Cambridge A Level only (topic 25.2, Paper 4); not in the ZIMSEC topic list.
:::

## The spectrum of a star and Wien's law

A hot object emits a continuous spectrum: a little radiation at very short and very long wavelengths, and a peak in between. As the temperature rises, the whole curve grows taller (much more power at every wavelength) and the peak shifts to **shorter wavelengths**:

| $T\,/\,\text{K}$ | 3000 | 6000 | 12 000 | 24 000 |
|---|---|---|---|---|
| $\lambda_{\max}\,/\,\text{nm}$ | 967 | 483 | 242 | 121 |
| Region of peak | infrared | visible (green-yellow) | ultraviolet | ultraviolet |
| Colour seen | red-orange | yellow-white | blue-white | blue |

Doubling the temperature halves $\lambda_{\max}$: the product $\lambda_{\max} T$ stays at about $2.9 \times 10^{-3}\ \text{m K}$. Cool stars look red because their peak is in the infrared and their visible light is weighted to the red end; hot stars look blue-white.

## Luminosity, temperature and radius

Each square metre of a star's surface radiates $\sigma T^{4}$ watts. Multiplying by the surface area $4\pi r^{2}$ gives the luminosity. Because of the fourth power, temperature matters enormously: a star twice as hot radiates $2^{4} = 16$ times as much from each square metre.

Rearranging gives the radius:

$$
r = \sqrt{\frac{L}{4\pi\sigma T^{4}}}
$$

So the method for estimating a star's radius is:

1. Find $T$ from the peak wavelength of its spectrum using Wien's law.
2. Find $L$, either from a standard candle relation or from the measured flux and a known distance, $L = 4\pi d^{2}F$.
3. Use the Stefan-Boltzmann law to find $r$.

:::worked-solution[Testing the method on the Sun]
The Sun's spectrum peaks at about $500\ \text{nm}$ and its luminosity is $3.83 \times 10^{26}\ \text{W}$. Estimate its surface temperature and radius. (Wien constant $2.9 \times 10^{-3}\ \text{m K}$; $\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$)

1. $T = \dfrac{2.9 \times 10^{-3}}{5.0 \times 10^{-7}} = 5800\ \text{K}$.
2. $r = \sqrt{\dfrac{3.83 \times 10^{26}}{4\pi \times 5.67 \times 10^{-8} \times 5800^{4}}} = 6.9 \times 10^{8}\ \text{m}$.
3. This agrees well with the measured solar radius of about $7.0 \times 10^{8}\ \text{m}$, which gives confidence in the method.
:::

:::worked-solution[A red giant]
A star's spectrum peaks at $830\ \text{nm}$ and its luminosity is $2.0 \times 10^{29}\ \text{W}$. Estimate its temperature and radius, and compare its radius with the Sun's (about $7.0 \times 10^{8}\ \text{m}$).

1. $T = \dfrac{2.9 \times 10^{-3}}{8.3 \times 10^{-7}} = 3490\ \text{K}$ (about 3500 K): cooler than the Sun, so it looks orange-red.
2. $r = \sqrt{\dfrac{2.0 \times 10^{29}}{4\pi \times 5.67 \times 10^{-8} \times 3490^{4}}} = 4.3 \times 10^{10}\ \text{m}$.
3. $\dfrac{4.3 \times 10^{10}}{7.0 \times 10^{8}} \approx 62$: about 60 times the Sun's radius. It is far more luminous than the Sun despite its lower temperature because its surface area is enormous: a **giant**.
:::

## Comparing stars by ratios

Many questions compare two stars without needing the constants. From $L \propto r^{2}T^{4}$ and $\lambda_{\max} \propto 1/T$:

- Two stars of **equal luminosity**: $r \propto 1/T^{2}$, so a star twice as hot has a quarter of the radius.
- Two stars of **equal radius**: $L \propto T^{4}$.
- Two stars of **equal temperature** (same colour): $L \propto r^{2}$.

A hot star that is faint must be very small (a **white dwarf**, roughly Earth-sized); a cool star that is very luminous must be very large (a **red giant** or supergiant).

**Limitations.** Stars are not perfect black bodies, and their atmospheres absorb some wavelengths (absorption lines), so the peak is estimated from the overall curve. The peak of a very hot star lies in the ultraviolet, which is absorbed by the Earth's atmosphere, so such observations are made from space. Uncertainty in $T$ is especially serious: since $r \propto T^{-2}$, a 5% uncertainty in $T$ gives 10% in $r$.

## Common mistakes

:::mistake{title="Using degrees Celsius"}
Both laws need the thermodynamic temperature in kelvin; at stellar temperatures the difference matters less, but the habit matters.
:::

:::mistake{title="Using πr² instead of 4πr²"}
A star radiates from its whole surface, a sphere of area $4\pi r^{2}$.
:::

:::mistake{title="Forgetting the fourth power"}
$T^{4}$ grows quickly: 6000 K gives 16 times the power per unit area of 3000 K, not twice.
:::

:::mistake{title="Thinking hotter stars have longer peak wavelengths"}
Hotter means a shorter $\lambda_{\max}$: blue stars are hotter than red ones.
:::

## Exam tips

:::exam-tip{title="Cambridge Paper 4"}
*State* Wien's law in words (peak wavelength inversely proportional to thermodynamic temperature). *Calculate* $T$ from $\lambda_{\max}$, then $r$ from $L = 4\pi\sigma r^{2}T^{4}$, keeping powers of ten in standard form. *Compare* stars using ratios and say clearly which quantity is constant. *Explain* why a star of low temperature can still be very luminous (large surface area). Watch the units: nm to m before substituting.
:::

## Summary

:::summary
- Stars radiate approximately as black bodies; hotter stars peak at shorter wavelengths and look bluer.
- Wien's law: $\lambda_{\max}T \approx 2.9 \times 10^{-3}\ \text{m K}$ gives the surface temperature.
- Stefan-Boltzmann law: $L = 4\pi\sigma r^{2}T^{4}$.
- Radius: $r = \sqrt{L/4\pi\sigma T^{4}}$, with $T$ from Wien's law and $L$ from a standard candle or $4\pi d^{2}F$.
- Ratios: equal $L$ → $r \propto 1/T^{2}$; equal $r$ → $L \propto T^{4}$; equal $T$ → $L \propto r^{2}$.
:::
