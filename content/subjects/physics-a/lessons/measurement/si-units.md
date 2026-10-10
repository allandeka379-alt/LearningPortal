---
{
  "key": "measurement.si-units",
  "title": "SI base units, prefixes and homogeneous equations",
  "summary": "Write every physical quantity as a number times a unit, express derived units in the six SI base units, check equations for homogeneity, convert prefixes (including areas and volumes) and make order-of-magnitude estimates.",
  "concepts": ["aphys.measurement.si-units"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

An engineer at a maize mill in Chinhoyi who reads "motor power 15" on a data plate learns nothing until the unit is given: 15 W would not turn the rollers, 15 kW is about right. In physics every measured quantity is a **number multiplied by a unit**, and A-Level questions test whether you can handle both parts.

This lesson sets out the SI system that all later topics depend on: the base quantities, how every other unit is built from them, how to check an equation by its units, and how to move between prefixes such as milli-, micro- and giga- without losing a power of ten. You should already be comfortable with the O-Level units of force, energy and power and with indices.

## Key definitions

:::definition{term="Physical quantity"}
A property that can be measured and is expressed as a numerical value multiplied by a unit, for example $m = 2.5\ \text{kg}$.
:::

:::definition{term="SI base quantity"}
One of the quantities chosen to define the SI system, each with its own base unit, from which all other units are derived.
:::

:::definition{term="Derived unit"}
A unit formed by multiplying and dividing base units, such as $\text{m s}^{-1}$ for velocity or $\text{kg m s}^{-2}$ (the newton) for force.
:::

:::definition{term="Homogeneous equation"}
An equation in which every term has the same base units, so that the units on both sides agree.
:::

:::keyfact{title="The base quantities you need"}
| Base quantity | Unit | Symbol |
| --- | --- | --- |
| mass | kilogram | kg |
| length | metre | m |
| time | second | s |
| electric current | ampere | A |
| thermodynamic temperature | kelvin | K |
| amount of substance | mole | mol |

(The seventh SI base unit, the candela, is not needed in this course.)
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the base units, derived units in base units, homogeneity, prefixes and estimates. The same table of prefixes is used by both.
:::

## Derived units in base units

Work from a **defining equation**, replacing each quantity by its unit.

| Quantity | Defining equation | Named unit | Base units |
| --- | --- | --- | --- |
| force | $F = ma$ | newton, N | $\text{kg m s}^{-2}$ |
| energy, work | $W = Fs$ | joule, J | $\text{kg m}^2\ \text{s}^{-2}$ |
| power | $P = W/t$ | watt, W | $\text{kg m}^2\ \text{s}^{-3}$ |
| pressure | $p = F/A$ | pascal, Pa | $\text{kg m}^{-1}\ \text{s}^{-2}$ |
| charge | $Q = It$ | coulomb, C | $\text{A s}$ |
| potential difference | $V = W/Q$ | volt, V | $\text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-1}$ |
| resistance | $R = V/I$ | ohm, $\Omega$ | $\text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-2}$ |

:::worked-solution[The volt in base units]
1. Potential difference is energy transferred per unit charge: $V = W/Q$.
2. Energy: $\text{J} = \text{N m} = \text{kg m s}^{-2} \times \text{m} = \text{kg m}^2\ \text{s}^{-2}$.
3. Charge: $\text{C} = \text{A s}$.
4. $\text{V} = \dfrac{\text{kg m}^2\ \text{s}^{-2}}{\text{A s}} = \text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-1}$.
:::

Some quantities have no unit at all: a ratio of two lengths (strain), a refractive index, an efficiency. Angles in radians are a ratio of arc length to radius, so the radian is not a base unit.

## Checking homogeneity

To test an equation, reduce **every term** to base units. If any term differs, the equation is certainly wrong.

:::worked-solution[Is $v^2 = u^2 + 2as$ homogeneous?]
1. $v^2$: $(\text{m s}^{-1})^2 = \text{m}^2\ \text{s}^{-2}$.
2. $u^2$: also $\text{m}^2\ \text{s}^{-2}$.
3. $2as$: the number 2 has no unit; $\text{m s}^{-2} \times \text{m} = \text{m}^2\ \text{s}^{-2}$.
4. Every term has the units $\text{m}^2\ \text{s}^{-2}$, so the equation is homogeneous.
:::

A homogeneous equation is **not necessarily correct**. The equation $v^2 = u^2 + as$ is homogeneous too, but the factor 2 is missing: pure numbers and dimensionless factors such as $2$, $\tfrac{1}{2}$ or $\pi$ cannot be checked by units. An equation can also be wrong because a term is missing altogether or has the wrong sign.

Units also find the unit of an unknown constant. In $F = kv^2$ for air resistance, $k = F/v^2$ has units $\dfrac{\text{kg m s}^{-2}}{\text{m}^2\ \text{s}^{-2}} = \text{kg m}^{-1}$.

## Prefixes

| Prefix | Symbol | Factor | | Prefix | Symbol | Factor |
| --- | --- | --- | --- | --- | --- | --- |
| pico | p | $10^{-12}$ | | kilo | k | $10^{3}$ |
| nano | n | $10^{-9}$ | | mega | M | $10^{6}$ |
| micro | $\mu$ | $10^{-6}$ | | giga | G | $10^{9}$ |
| milli | m | $10^{-3}$ | | tera | T | $10^{12}$ |
| centi | c | $10^{-2}$ | | deci | d | $10^{-1}$ |

A prefix multiplies the unit it is attached to, and when the unit is squared or cubed **the prefix is squared or cubed as well**:

- $1\ \text{mm} = 10^{-3}\ \text{m}$, so $1\ \text{mm}^2 = (10^{-3}\ \text{m})^2 = 10^{-6}\ \text{m}^2$.
- $1\ \text{cm}^3 = (10^{-2}\ \text{m})^3 = 10^{-6}\ \text{m}^3$.

:::worked-solution[Converting a density]
Steel has a density of $7.9\ \text{g cm}^{-3}$. Express it in $\text{kg m}^{-3}$.

1. $1\ \text{g} = 10^{-3}\ \text{kg}$ and $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$.
2. $7.9\ \text{g cm}^{-3} = \dfrac{7.9 \times 10^{-3}\ \text{kg}}{10^{-6}\ \text{m}^3}$.
3. $= 7.9 \times 10^{3}\ \text{kg m}^{-3}$.
:::

Standard form keeps the number of significant figures clear: $7.9 \times 10^{3}$ has two significant figures, while "7900" is ambiguous.

## Estimates

An estimate is a value to the nearest power of ten (or one significant figure), reasoned from things you know. Useful benchmarks:

| Quantity | Sensible estimate |
| --- | --- |
| mass of an adult | $70\ \text{kg}$ |
| height of a door | $2\ \text{m}$ |
| mass of a small car | $1000\ \text{kg}$ |
| speed of a kombi on a highway | $25\ \text{m s}^{-1}$ (about $90\ \text{km h}^{-1}$) |
| power of an electric kettle | $2\ \text{kW}$ |
| density of air | $1.2\ \text{kg m}^{-3}$ |
| wavelength of visible light | $500\ \text{nm}$ |

:::example{title="The mass of air in a classroom"}
A classroom is about $8\ \text{m} \times 6\ \text{m} \times 3\ \text{m}$, a volume of about $150\ \text{m}^3$. With air at about $1.2\ \text{kg m}^{-3}$, the mass of air is roughly $1.2 \times 150 \approx 180\ \text{kg}$, of order $10^{2}\ \text{kg}$: more than two adults.
:::

## Common mistakes

:::mistake{title="Converting squared units with a single factor"}
Writing $1\ \text{mm}^2 = 10^{-3}\ \text{m}^2$. The prefix is squared too: $10^{-6}\ \text{m}^2$. For volumes it is cubed: $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$.
:::

:::mistake{title="Treating the newton or joule as a base unit"}
Only kg, m, s, A, K and mol are base units here. "Give the unit in base units" means no N, J, W, Pa, C, V or $\Omega$ may remain.
:::

:::mistake{title="Saying homogeneity proves an equation"}
Homogeneity is necessary but not sufficient: numerical factors and missing terms are invisible to a unit check.
:::

:::mistake{title="Confusing m and M"}
m (milli, $10^{-3}$) and M (mega, $10^{6}$) differ by a factor of $10^{9}$. Write prefixes carefully and never use a capital K for kilo.
:::

## Exam tips

:::exam-tip{title="Command words"}
"State the SI base units of …" needs only the units, with powers written as $\text{m}^2\ \text{s}^{-2}$. "Show that the equation is homogeneous" needs each term reduced to base units separately and a concluding statement. "Estimate" accepts a range of values; show the quantities you assumed.
:::

:::exam-tip{title="Where it is tested"}
Base units, homogeneity and prefixes appear in Cambridge Paper 1 multiple-choice questions and early parts of Paper 2 questions, and in ZIMSEC Papers 1 and 2. Every numerical answer on every paper needs the right unit and prefix.
:::

## Summary

:::summary
- Every physical quantity is a number times a unit; the six base units used are kg, m, s, A, K and mol.
- Derived units come from defining equations: $\text{N} = \text{kg m s}^{-2}$, $\text{J} = \text{kg m}^2\ \text{s}^{-2}$, $\text{Pa} = \text{kg m}^{-1}\ \text{s}^{-2}$.
- A homogeneous equation has the same base units in every term; homogeneity does not prove an equation correct.
- Prefixes run from pico ($10^{-12}$) to tera ($10^{12}$); for areas and volumes square or cube the prefix factor.
- Estimates use sensible benchmark values and are quoted to one significant figure or a power of ten.
:::
