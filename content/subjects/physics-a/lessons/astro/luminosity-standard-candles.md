---
{
  "key": "astro.luminosity-standard-candles",
  "title": "Luminosity, radiant flux intensity and standard candles",
  "summary": "Define the luminosity of a star and the radiant flux intensity received from it, use the inverse-square law F = L/(4πd²), explain what a standard candle is (Cepheid variables and type Ia supernovae), and use measured flux and known luminosity to determine the distances to stars and galaxies in SI units.",
  "concepts": ["aphys.astro.luminosity-standard-candles"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

On a clear night far from city lights, in the Matobo Hills or the Chimanimani mountains, thousands of stars are visible. Some look bright because they are close; others look bright because they are enormously powerful but far away. From one photograph you cannot tell which. To measure the distances to galaxies millions of light-years away, astronomers separate **how much power a star emits** from **how much of it reaches us**, and they rely on objects whose true power is known: **standard candles**.

You should already know intensity as power per unit area, the inverse-square law for a point source, and standard form.

## Key definitions

:::definition{term="Luminosity"}
The total power of electromagnetic radiation emitted by a star (in all directions and at all wavelengths). Unit: watt (W).
:::

:::definition{term="Radiant flux intensity"}
The radiant power passing normally through unit area at a given distance from a source. Unit: $\text{W m}^{-2}$.
:::

:::definition{term="Standard candle"}
An astronomical object of known luminosity, whose measured radiant flux intensity can therefore be used to calculate its distance.
:::

:::formula{name="Inverse-square law for radiant flux intensity"}
$$
F = \frac{L}{4\pi d^{2}}
$$

$F$ = radiant flux intensity at the observer ($\text{W m}^{-2}$), $L$ = luminosity of the star (W), $d$ = distance from the star (m). Assumes the star radiates equally in all directions and nothing absorbs the radiation on the way.
:::

:::keyfact{title="Useful values"}
Luminosity of the Sun $\approx 3.83 \times 10^{26}\ \text{W}$; mean Earth-Sun distance $\approx 1.50 \times 10^{11}\ \text{m}$; one light-year (the distance light travels in a year) $\approx 9.46 \times 10^{15}\ \text{m}$. Use metres in every calculation.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Astronomy is Cambridge A Level only (topic 25, Paper 4). It is not in the ZIMSEC topic list.
:::

## Where the inverse-square law comes from

Imagine the star at the centre of a sphere of radius $d$. All the power $L$ the star emits crosses the surface of that sphere, whose area is $4\pi d^{2}$. If the star radiates equally in all directions, the power through each square metre is

$$
F = \frac{L}{4\pi d^{2}}
$$

Doubling the distance spreads the same power over four times the area, so $F$ falls to a quarter; ten times the distance gives one hundredth.

:::worked-solution[The solar constant]
Calculate the radiant flux intensity of sunlight just above the Earth's atmosphere.

1. $F = \dfrac{L}{4\pi d^{2}} = \dfrac{3.83 \times 10^{26}}{4\pi \times (1.50 \times 10^{11})^{2}}$.
2. $F = 1.35 \times 10^{3}\ \text{W m}^{-2}$, about 1.4 kW on every square metre facing the Sun, which is why a rooftop solar panel in Bulawayo can deliver a useful power.
:::

| Distance from the Sun / Earth-Sun distances | 1 | 2 | 3 | 5 | 10 |
|---|---|---|---|---|---|
| $F\,/\,\text{W m}^{-2}$ | 1350 | 339 | 151 | 54.2 | 13.5 |

A graph of $F$ against $d$ falls steeply and flattens out; a graph of $F$ against $1/d^{2}$ is a straight line through the origin with gradient $L/4\pi$.

## Luminosity and apparent brightness

How bright a star **looks** depends on $F$, not on $L$. A star with a large luminosity may look faint because it is very far away. Measuring $F$ is straightforward (a telescope collects light on to a calibrated detector, often a CCD); finding $d$ needs $L$. If we know $L$ by some other means, the inverse-square law gives

$$
d = \sqrt{\frac{L}{4\pi F}}
$$

## Standard candles

A standard candle is any object whose luminosity we can know without first knowing its distance. Two important kinds:

- **Cepheid variable stars.** These stars pulsate, their brightness rising and falling regularly with periods of days to weeks. Their **period is related to their luminosity**: the longer the period, the more luminous the star. Measuring the period gives $L$; measuring the average $F$ then gives $d$. Cepheids are bright enough to be seen in nearby galaxies.
- **Type Ia supernovae.** These explosions of white dwarf stars all reach very nearly the same **peak luminosity** (about $10^{36}\ \text{W}$, billions of times the Sun's). Being so bright, they can be seen in very distant galaxies, far beyond the range of Cepheids.

Each method is calibrated using nearer objects whose distances are known from other methods, so the distances form a chain or "ladder" reaching further and further out.

:::worked-solution[Distance to a Cepheid]
The period of a Cepheid variable shows that its mean luminosity is $1.2 \times 10^{30}\ \text{W}$. The mean radiant flux intensity received at the Earth is $2.5 \times 10^{-12}\ \text{W m}^{-2}$. Find its distance in metres and in light-years.

1. $d = \sqrt{\dfrac{L}{4\pi F}} = \sqrt{\dfrac{1.2 \times 10^{30}}{4\pi \times 2.5 \times 10^{-12}}}$.
2. $d = 1.95 \times 10^{20}\ \text{m}$.
3. In light-years: $\dfrac{1.95 \times 10^{20}}{9.46 \times 10^{15}} = 2.07 \times 10^{4}$ light-years, about twenty thousand light-years: within our own galaxy.
:::

**Comparing two standard candles.** If two type Ia supernovae have the same peak luminosity, the ratio of their distances follows from the ratio of their peak flux intensities alone: $d \propto 1/\sqrt{F}$, so if one appears 16 times fainter, it is 4 times further away. No value of $L$ is needed.

**Limitations.** Dust between the stars absorbs and scatters light, so the measured $F$ is too small and the calculated distance too large unless a correction is made. The luminosity of a standard candle also has its own uncertainty, which carries straight into $d$: since $d \propto \sqrt{L}$, a 10% uncertainty in $L$ gives about 5% in $d$.

## Common mistakes

:::mistake{title="Using the area of a circle"}
The power spreads over a **sphere**, area $4\pi d^{2}$, not over $\pi d^{2}$.
:::

:::mistake{title="Confusing luminosity with brightness"}
Luminosity is the power the star emits; radiant flux intensity is what we receive per square metre. A very luminous star can look faint.
:::

:::mistake{title="Working in light-years"}
Convert light-years to metres before using $F = L/4\pi d^{2}$, and convert back only at the end if asked.
:::

:::mistake{title="Forgetting the square root"}
$d = \sqrt{L/4\pi F}$: halving $F$ increases $d$ by $\sqrt{2}$, not by 2.
:::

## Exam tips

:::exam-tip{title="Cambridge Paper 4"}
*Define* luminosity (total power emitted, unit W) and radiant flux intensity (power per unit area, $\text{W m}^{-2}$). *Explain* what a standard candle is and *describe* how it gives a distance: known $L$, measured $F$, $d = \sqrt{L/4\pi F}$. *Calculate* with powers of ten carefully, showing the rearranged formula before substituting. State the assumptions (isotropic emission, no absorption) when asked to *suggest* sources of error.
:::

## Summary

:::summary
- Luminosity $L$: total power radiated by a star (W). Radiant flux intensity $F$: power received per unit area ($\text{W m}^{-2}$).
- $F = L/4\pi d^{2}$: the power spreads over a sphere, so $F \propto 1/d^{2}$.
- A standard candle has a known luminosity: Cepheid variables (period gives $L$) and type Ia supernovae (known peak $L$).
- Measured $F$ and known $L$ give $d = \sqrt{L/4\pi F}$; always use metres.
- Absorption by dust and uncertainty in $L$ limit the accuracy.
:::
