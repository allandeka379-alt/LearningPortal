---
{
  "key": "superposition.diffraction-grating",
  "title": "The diffraction grating and measuring wavelength",
  "summary": "Use d sin θ = nλ for a diffraction grating, find the grating spacing from lines per millimetre and the highest order visible, explain why grating maxima are sharper and brighter than double-slit fringes, determine a wavelength experimentally and describe white-light spectra and overlapping orders.",
  "concepts": ["aphys.superposition.diffraction-grating"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Tilt a CD or DVD under a lamp and it flashes with colours: the closely spaced tracks act as a reflection grating, sending each wavelength off at a different angle. A transmission diffraction grating, a slide ruled with hundreds of parallel lines per millimetre, does the same job far more precisely. Scientists use gratings to measure wavelengths of light to a fraction of a nanometre, to identify the gases in a flame or a distant star, and to check the colour of LEDs used in solar-powered lighting.

You should know two-source interference, path difference and the condition for constructive interference, and that light diffracts through very narrow slits.

## Key definitions

:::definition{term="Diffraction grating"}
A plate with a very large number of equally spaced, parallel, narrow slits (lines) that diffracts light and produces sharp interference maxima in particular directions.
:::

:::definition{term="Grating spacing"}
The distance $d$ between the centres of adjacent slits of a grating. For $N$ lines per metre, $d = 1/N$.
:::

:::definition{term="Order of a maximum"}
The whole number $n$ that labels a maximum: the path difference between light from adjacent slits is $n\lambda$. The straight-through maximum is the zero order.
:::

:::formula{name="Diffraction grating equation"}
$$
d\sin\theta = n\lambda
$$

$d$ is the grating spacing in m, $\theta$ the angle between the $n$th-order maximum and the straight-through (zero-order) direction, $n$ the order (0, 1, 2, ...) and $\lambda$ the wavelength in m.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require $d\sin\theta = n\lambda$, the grating spacing from lines per millimetre, the maximum order, and the use of a grating to determine wavelength (ZIMSEC Form 5; Cambridge AS 8.4). The structure of a spectrometer is not required.
:::

## Where the equation comes from

Light of wavelength $\lambda$ falls normally on the grating. Consider adjacent slits a distance $d$ apart, and a direction at angle $\theta$ to the normal. The path difference between light from the two slits in that direction is $d\sin\theta$. If this is a whole number of wavelengths, light from the two slits arrives in phase, and so does the light from **every** slit, because each pair of neighbours has the same path difference. So there is a bright maximum where

$$
d\sin\theta = n\lambda.
$$

## Converting lines per millimetre

A grating marked "500 lines per mm" has $N = 500 \times 10^{3} = 5.00 \times 10^{5}$ lines per metre, so

$$
d = \frac{1}{5.00 \times 10^{5}} = 2.00 \times 10^{-6}\ \text{m}.
$$

## Sharper and brighter than a double slit

With two slits, the intensity falls off gradually either side of each maximum, because a small change of angle changes the path difference only slightly and the two waves still largely reinforce. With hundreds of slits, a tiny change of angle puts the waves from distant slits out of step and they cancel almost completely. The result is:

- **very sharp** (narrow) maxima, so their angles can be measured precisely;
- **brighter** maxima, because many slits contribute;
- **widely spaced** maxima at large angles, because $d$ is very small.

These are why a grating measures wavelength more precisely than a double slit.

## Worked examples

![Diffraction grating with 500 lines per mm (d = 2.00 µm) and 589 nm sodium light at normal incidence: maxima appear at 0° and on each side at 17.1° (first order), 36.1° (second) and 62.1° (third); the fourth order would need sin θ > 1, so seven maxima are seen.](media:diagrams/grating-orders-fan.png "Figure: the seven orders from a 500 lines/mm grating (angles from d sin θ = nλ)")

:::worked-solution[Angles and the highest order]
Sodium light of wavelength $589\ \text{nm}$ falls normally on a grating with 500 lines per mm. Find the angles of the first two orders and the highest order visible.

1. $d = 2.00 \times 10^{-6}\ \text{m}$ (above).
2. First order: $\sin\theta_1 = \dfrac{589 \times 10^{-9}}{2.00 \times 10^{-6}} = 0.2945$, so $\theta_1 = 17.1^\circ$.
3. Second order: $\sin\theta_2 = 0.589$, so $\theta_2 = 36.1^\circ$.
4. Highest order: $\sin\theta \le 1$, so $n \le \dfrac{d}{\lambda} = \dfrac{2.00 \times 10^{-6}}{589 \times 10^{-9}} = 3.40$. The highest order is $n = 3$ (at $62.1^\circ$). Always round **down**.
5. Counting both sides and the centre, $2 \times 3 + 1 = 7$ maxima are seen.
:::

:::worked-solution[Determining a wavelength]
A green laser shines normally on a grating with 600 lines per mm. The angle between the two first-order maxima, on opposite sides of the centre, is $38.0^\circ$.

1. $\theta_1 = \dfrac{38.0^\circ}{2} = 19.0^\circ$ (measuring between the two first orders and halving reduces the error from not knowing the exact zero direction).
2. $d = \dfrac{1}{600 \times 10^{3}} = 1.667 \times 10^{-6}\ \text{m}$.
3. $\lambda = d\sin\theta = 1.667 \times 10^{-6} \times \sin 19.0^\circ = 1.667 \times 10^{-6} \times 0.3256$.
4. $\lambda = 5.43 \times 10^{-7}\ \text{m} = 543\ \text{nm}$.
:::

In the laboratory without a spectrometer, the angle can be found from the distance $y$ of a maximum from the centre on a screen a distance $L$ away: $\tan\theta = y/L$. Use the angle, not the small-angle approximation, because grating angles are large.

## White light and overlapping orders

White light contains all wavelengths from about 400 nm to 700 nm. The zero order is white (every wavelength goes straight through). In each other order, the light is spread into a **spectrum** with violet nearest the centre (shortest $\lambda$, smallest $\theta$) and red furthest out. Higher orders are spread more widely.

| Order | Violet (400 nm), $n\lambda$ / nm | Red (700 nm), $n\lambda$ / nm |
| --- | --- | --- |
| 1 | 400 | 700 |
| 2 | 800 | 1400 |
| 3 | 1200 | 2100 |

Because $\sin\theta = n\lambda/d$, two orders overlap whenever their ranges of $n\lambda$ overlap. The second-order red ($1400\ \text{nm}$) lies beyond the third-order violet ($1200\ \text{nm}$), so the second- and third-order spectra overlap for **every** grating; the first and second orders do not.

## Common mistakes

:::mistake{title="Lines per mm not converted"}
$d$ must be in metres: 300 lines per mm gives $d = 1/(3.00 \times 10^{5}) = 3.33 \times 10^{-6}\ \text{m}$, not $1/300$.
:::

:::mistake{title="Rounding the maximum order up"}
$d/\lambda = 3.4$ means the third order is the highest; a fourth order would need $\sin\theta > 1$.
:::

:::mistake{title="Using the angle between two orders"}
$\theta$ is measured from the straight-through direction. If the angle between the two first orders is given, halve it.
:::

:::mistake{title="Using λ = ax/D for a grating"}
The small-angle double-slit formula fails at the large angles of a grating; use $d\sin\theta = n\lambda$.
:::

## Exam tips

:::exam-tip{title="Which papers"}
A standard calculation in ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2; determining a wavelength with a grating is a practical skill for Papers 3, 4 and 5.
:::

:::exam-tip{title="Command words"}
*Explain* why maxima occur only at certain angles: light from every slit arrives in phase when $d\sin\theta = n\lambda$. *Calculate the number of orders*: find $d/\lambda$, round down, and say whether you count both sides. *Explain* why a grating is better than a double slit: sharper, brighter, more widely spaced maxima give a more precise angle.
:::

## Summary

:::summary
- Grating equation: $d\sin\theta = n\lambda$, with $d = 1/N$ in metres.
- Maxima occur where light from all slits arrives in phase.
- Highest order: largest whole number not exceeding $d/\lambda$.
- Grating maxima are sharper, brighter and further apart than double-slit fringes, giving precise wavelengths.
- White light gives spectra with violet nearest the centre; the second and third orders always overlap.
:::
