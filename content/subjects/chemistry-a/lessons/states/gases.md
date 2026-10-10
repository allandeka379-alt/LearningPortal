---
{
  "key": "states.gases",
  "title": "The gaseous state: kinetic theory and the ideal gas equation",
  "summary": "How gas pressure arises from molecular collisions, the assumptions of the kinetic theory of an ideal gas, calculations with pV = nRT in SI units (including finding the Mr of a gas or volatile liquid), and when and why real gases deviate from ideal behaviour.",
  "concepts": ["achem.states.gases"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A tyre pressure gauge at a Harare service station, the gas cylinder that fuels a family cooker, and the weather balloon released to measure the upper atmosphere all obey the same simple law. Gases are the easiest state of matter to describe mathematically, because their particles are far apart and move independently.

The ideal gas equation lets chemists count moles of gas from a pressure, a volume and a temperature, and even find the relative molecular mass of an unknown volatile liquid. It also shows its own limits: real gases stop behaving ideally when they are squeezed hard or cooled down, and understanding why tells you a lot about intermolecular forces.

You should already be able to use moles and the molar volume (24.0 dm³ mol⁻¹ at room conditions) and to describe the arrangement and movement of particles in solids, liquids and gases.

## Key definitions

:::definition{term="Gas pressure"}
The force per unit area exerted on the walls of a container by gas molecules colliding with them. Pressure is measured in pascals: $1\ \text{Pa} = 1\ \text{N m}^{-2}$.
:::

:::definition{term="Ideal gas"}
A gas that obeys the ideal gas equation, $pV = nRT$, exactly under all conditions. It is a model; real gases behave almost ideally at low pressure and high temperature.
:::

:::keyfact{title="The ideal gas equation"}
$$
pV = nRT
$$

| Symbol | Quantity | SI unit |
|---|---|---|
| $p$ | pressure | Pa |
| $V$ | volume | m³ |
| $n$ | amount | mol |
| $R$ | molar gas constant, 8.31 | J K⁻¹ mol⁻¹ |
| $T$ | temperature | K |

Conversions: $1\ \text{dm}^3 = 10^{-3}\ \text{m}^3$; $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$; $1\ \text{kPa} = 10^3\ \text{Pa}$; $T(\text{K}) = \theta(^\circ\text{C}) + 273$.
:::

## Where gas pressure comes from

Gas molecules move rapidly in random directions. Each time a molecule hits a wall and bounces back, its momentum changes, so it exerts a tiny force on the wall. Billions of collisions per second produce a steady force on every square metre: the pressure.

This explains the gas laws qualitatively:

- **Heating** a gas at constant volume makes molecules move faster, so they hit the walls more often and harder: pressure rises.
- **Compressing** a gas at constant temperature puts the same molecules in less space, so they hit each unit area of wall more often: pressure rises.
- **Adding more gas** to the same container increases the number of collisions: pressure rises.

## The kinetic theory of an ideal gas

The ideal gas model rests on these assumptions:

1. Gas molecules move **rapidly and randomly** in straight lines between collisions.
2. The molecules have **negligible volume** compared with the volume of the container (they are treated as points).
3. There are **no intermolecular forces** of attraction or repulsion between molecules, except during collisions.
4. Collisions between molecules and with the walls are **perfectly elastic**: no kinetic energy is lost overall.
5. The average kinetic energy of the molecules is proportional to the absolute temperature.

## Using pV = nRT

Always convert to SI units **before** substituting, then rearrange.

:::worked-solution[Example 1: amount of gas in a flask]
How many moles of gas are in a 500 cm³ flask at 101 kPa and 25 °C?

1. Convert: $p = 101 \times 10^3 = 1.01 \times 10^5$ Pa; $V = 500 \times 10^{-6} = 5.00 \times 10^{-4}$ m³; $T = 25 + 273 = 298$ K.
2. Rearrange: $n = \dfrac{pV}{RT}$.
3. Substitute: $n = \dfrac{1.01 \times 10^5 \times 5.00 \times 10^{-4}}{8.31 \times 298} = \dfrac{50.5}{2476.4}$.
4. $n = 0.0204$ mol.
:::

:::worked-solution[Example 2: volume of gas from a cylinder]
Calculate the volume, in dm³, occupied by 1.50 mol of a gas at 200 kPa and 27 °C.

1. $p = 2.00 \times 10^5$ Pa; $T = 27 + 273 = 300$ K.
2. $V = \dfrac{nRT}{p} = \dfrac{1.50 \times 8.31 \times 300}{2.00 \times 10^5} = 0.0187$ m³.
3. Convert to dm³: $0.0187 \times 10^3 = 18.7$ dm³.
:::

## Finding the Mr of a gas or volatile liquid

Since $n = m/M$, the ideal gas equation becomes

$$
M = \frac{mRT}{pV}
$$

In the laboratory a small, accurately weighed sample of a volatile liquid is injected through a self-sealing cap into a gas syringe kept in an oven or steam jacket above the liquid's boiling point. The liquid vaporises completely and the volume of vapour is read from the syringe. The temperature of the jacket and the atmospheric pressure are recorded.

:::worked-solution[Example 3: Mr of a volatile liquid]
0.250 g of a volatile liquid is vaporised in a gas syringe at 100 °C and 101 kPa. The vapour occupies 98.0 cm³. Calculate $M_\mathrm{r}$.

1. $T = 373$ K; $p = 1.01 \times 10^5$ Pa; $V = 98.0 \times 10^{-6} = 9.80 \times 10^{-5}$ m³.
2. $M = \dfrac{mRT}{pV} = \dfrac{0.250 \times 8.31 \times 373}{1.01 \times 10^5 \times 9.80 \times 10^{-5}}$.
3. $M = \dfrac{774.9}{9.898} = 78.3\ \text{g mol}^{-1}$, so $M_\mathrm{r} = 78.3$ (close to benzene, $\ce{C6H6}$, 78.0).
:::

## Real gases and ideal behaviour

Real gases behave **most ideally** at **low pressure** and **high temperature**:

- At low pressure the molecules are far apart, so their own volume is a tiny fraction of the container volume and the forces between them are negligible.
- At high temperature the molecules move so fast that intermolecular attractions have little effect during the brief time they are close.

Real gases **deviate** from ideal behaviour at **high pressure** and **low temperature**:

- At high pressure the molecules are close together, so their own volume is no longer negligible (the volume available to them is less than $V$), and intermolecular attractions become significant.
- At low temperature the molecules move slowly, so attractions between them pull them together, reducing the force of collisions with the walls; eventually the gas liquefies.

Gases with **stronger intermolecular forces** deviate more: ammonia (hydrogen bonding) and sulfur dioxide (polar) are much less ideal than helium or hydrogen. Helium, with tiny atoms and very weak forces, is the most nearly ideal real gas. The kinetic theory model therefore holds well for real gases only under conditions where its assumptions of negligible molecular volume and no intermolecular forces are close to true (ZIMSEC asks you to comment on this validity).

## Common mistakes

:::mistake{title="Using °C or kPa or cm³ in the equation"}
pV = nRT with R = 8.31 needs Pa, m³ and K. A temperature of 25 must become 298 K.
:::

:::mistake{title="Converting cm³ to m³ by dividing by 1000"}
$1\ \text{m}^3 = 10^6\ \text{cm}^3$, so divide cm³ by 10⁶ (and dm³ by 10³).
:::

:::mistake{title="Saying gases are ideal at high pressure"}
High pressure squeezes molecules together, so their volume and attractions matter: deviation increases.
:::

:::mistake{title="Saying molecules 'lose energy' in collisions"}
In the ideal model, collisions are elastic: total kinetic energy is conserved.
:::

## Exam tips

:::exam-tip
In **calculate** questions (Paper 1, Paper 2 and the practical papers on both boards), write the conversions as a separate first step. Most lost marks come from units, not from the algebra.
:::

:::exam-tip
"**State** two assumptions of the kinetic theory" asks for statements about molecules: negligible volume and no intermolecular forces are the two most often credited.
:::

:::exam-tip
"**Explain** why a real gas deviates at high pressure" needs both ideas: molecular volume is no longer negligible, and intermolecular forces become significant because molecules are closer together.
:::

## Summary

:::summary
- Gas pressure comes from molecules colliding with the container walls.
- Ideal gas assumptions: random motion, negligible molecular volume, no intermolecular forces, elastic collisions.
- $pV = nRT$ with p in Pa, V in m³, T in K and R = 8.31 J K⁻¹ mol⁻¹.
- $M = mRT/pV$ gives the $M_\mathrm{r}$ of a gas or volatile liquid.
- Real gases are most ideal at low pressure and high temperature; they deviate at high pressure and low temperature, more so with strong intermolecular forces.
:::
