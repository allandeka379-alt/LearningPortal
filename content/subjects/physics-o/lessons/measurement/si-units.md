---
{
  "key": "measurement.si-units",
  "title": "SI units, prefixes and derived units",
  "summary": "Use the SI base units and prefixes, write quantities in standard form, and build derived units such as the newton, joule, watt and pascal from base units.",
  "concepts": ["phys.measurement.si-units"],
  "objectives": ["zimsec/o-level/physics:1.1.3", "zimsec/o-level/physics:1.1.4"],
  "estimatedMinutes": 25
}
---
## Introduction

Scientists in Harare, Lagos and London must be able to compare results, so they all use one system of units: the **Système International (SI)**. Every quantity in O-Level physics is measured in SI units or in units built from them.

This lesson shows you the base units, the prefixes that make numbers manageable, and how units such as the newton and the joule are built from base units. Checking units is also one of the quickest ways to catch a mistake in a calculation.

## Key definitions

:::definition{term="Base quantity"}
One of a small set of quantities from which all others are defined: mass, length, time, electric current, temperature and amount of substance (and luminous intensity).
:::

:::definition{term="Derived unit"}
A unit made by multiplying or dividing base units, for example metres per second for speed.
:::

:::definition{term="Prefix"}
A word in front of a unit that multiplies it by a power of ten, for example kilo ($\times 10^{3}$).
:::

## The base units

| Quantity | SI unit | Symbol |
| --- | --- | --- |
| mass | kilogram | kg |
| length | metre | m |
| time | second | s |
| electric current | ampere | A |
| temperature | kelvin | K |
| amount of substance | mole | mol |

Notice that the base unit of mass is the kilogram, not the gram.

## Prefixes

| Prefix | Symbol | Multiplies by |
| --- | --- | --- |
| giga | G | $10^{9}$ |
| mega | M | $10^{6}$ |
| kilo | k | $10^{3}$ |
| centi | c | $10^{-2}$ |
| milli | m | $10^{-3}$ |
| micro | µ | $10^{-6}$ |
| nano | n | $10^{-9}$ |

To convert **to** the base unit, replace the prefix by its power of ten.

:::worked-solution[Converting with prefixes]
1. $750\ \text{g} = 750 \times 10^{-3}\ \text{kg} = 0.75\ \text{kg}$.
2. $4.5\ \text{km} = 4.5 \times 10^{3}\ \text{m} = 4500\ \text{m}$.
3. $36\ \text{mA} = 36 \times 10^{-3}\ \text{A} = 0.036\ \text{A}$.
4. Kariba South power station can deliver about $1050\ \text{MW} = 1.05 \times 10^{9}\ \text{W}$.
:::

### Area and volume

Squared and cubed units need extra care because the conversion factor is squared or cubed too: $1\ \text{m} = 100\ \text{cm}$, so $1\ \text{m}^2 = 100^2 = 10\,000\ \text{cm}^2$ and $1\ \text{m}^3 = 100^3 = 1\,000\,000\ \text{cm}^3$.

## Standard form

Very large and very small numbers are written as $A \times 10^{n}$ with $1 \leq A < 10$. The speed of light is $3.0 \times 10^{8}\ \text{m/s}$; the diameter of a hydrogen atom is about $1 \times 10^{-10}\ \text{m}$.

## Derived units

Derived units come from the defining equation of the quantity.

:::worked-solution[Building derived units from base units]
1. Speed $= \dfrac{\text{distance}}{\text{time}}$, so its unit is $\text{m/s}$.
2. Acceleration $= \dfrac{\text{change in velocity}}{\text{time}}$, so its unit is $\text{m/s}^2$.
3. Force $= \text{mass} \times \text{acceleration}$: $1\ \text{N} = 1\ \text{kg}\ \text{m/s}^2$.
4. Work $= \text{force} \times \text{distance}$: $1\ \text{J} = 1\ \text{N}\ \text{m} = 1\ \text{kg}\ \text{m}^2/\text{s}^2$.
5. Power $= \dfrac{\text{energy}}{\text{time}}$: $1\ \text{W} = 1\ \text{J/s}$.
6. Pressure $= \dfrac{\text{force}}{\text{area}}$: $1\ \text{Pa} = 1\ \text{N/m}^2$.
:::

Other derived units you will meet: the coulomb ($1\ \text{C} = 1\ \text{A s}$), the volt ($1\ \text{V} = 1\ \text{J/C}$) and the ohm ($1\ \Omega = 1\ \text{V/A}$).

:::keyfact
An equation must be **homogeneous**: the units on both sides must be the same. If they are not, the equation is wrong.
:::

## Common mistakes

:::mistake{title="Grams are not the base unit"}
In $F = ma$ the mass must be in kilograms. Using $500$ instead of $0.5$ for a $500\ \text{g}$ mass makes the force 1000 times too big.
:::

:::mistake{title="Converting areas by 100"}
$1\ \text{m}^2$ is $10\,000\ \text{cm}^2$, not $100\ \text{cm}^2$. Square the length conversion.
:::

:::mistake{title="Capital letters matter"}
$\text{mW}$ (milliwatt) and $\text{MW}$ (megawatt) differ by a factor of $10^{9}$. Write prefixes carefully.
:::

## Exam tips

:::exam-tip
Convert every quantity into base SI units **before** substituting into an equation, then give the answer with its unit.
:::

:::exam-tip
When asked to "show that a unit is equivalent to …", start from the defining equation and replace each quantity by its unit, one step per line.
:::

## Summary

:::summary
- SI base units include the kilogram, metre, second, ampere and kelvin.
- Prefixes multiply by powers of ten: G $10^{9}$, M $10^{6}$, k $10^{3}$, c $10^{-2}$, m $10^{-3}$, µ $10^{-6}$, n $10^{-9}$.
- Area conversions are squared and volume conversions cubed.
- Derived units come from defining equations: N = kg m/s², J = N m, W = J/s, Pa = N/m².
- Check that both sides of an equation have the same units.
:::
