---
{
  "key": "energetics.entropy-gibbs",
  "title": "Entropy and Gibbs free energy",
  "summary": "Entropy as a measure of the ways particles and their energy can be arranged, predicting and calculating ΔS, and using ΔG = ΔH − TΔS to decide whether a reaction is feasible and at what temperature it becomes feasible.",
  "concepts": ["achem.energetics.entropy-gibbs"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Ice melts on a warm day in Masvingo even though melting is endothermic. Ammonium nitrate dissolves in water and cools it. So "exothermic means it happens" cannot be the whole story. The missing idea is **entropy**: the tendency of particles and their energy to spread out into as many arrangements as possible. Combining entropy with enthalpy in the **Gibbs free energy** tells you whether a reaction is feasible, and at what temperature a reaction such as the decomposition of limestone in a lime kiln becomes possible.

This lesson builds on enthalpy changes and Hess's law. Standard entropies are given in data tables in J K⁻¹ mol⁻¹, while enthalpies are in kJ mol⁻¹: watch the units.

## Key definitions

:::definition{term="Entropy, S"}
A measure of the number of possible ways in which the particles of a system, and their energy, can be arranged. The more ways, the greater the entropy. Units: J K⁻¹ mol⁻¹.
:::

:::definition{term="Standard entropy, S⦵"}
The entropy of one mole of a substance in its standard state at 298 K and 101 kPa. Every substance has a positive standard entropy (a perfect crystal at 0 K would have zero entropy).
:::

:::definition{term="Gibbs free energy change, ΔG"}
The quantity $\Delta G = \Delta H - T\Delta S$, which combines the enthalpy change and the entropy change of a reaction at temperature $T$. A reaction is **feasible** (can take place spontaneously) when $\Delta G \le 0$, strictly when $\Delta G$ is negative.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Entropy and Gibbs free energy are Cambridge A Level content (Paper 4). They are not in the ZIMSEC syllabus. Cambridge does not require ΔS of the surroundings.
:::

## Predicting the sign of ΔS

Entropy increases (ΔS positive) when particles gain more freedom or more ways to share their energy:

| Change | Sign of ΔS | Reason |
|---|---|---|
| solid → liquid → gas | + | particles move more freely; gases have by far the most arrangements |
| dissolving a solid | usually + | ions or molecules spread through the solvent |
| raising the temperature | + | particles have a wider range of energies to share |
| more moles of gas in the products | + | gas particles dominate entropy |
| fewer moles of gas in the products | − | for example $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$: 4 mol of gas become 2 |

When a reaction involves gases, count the moles of gas on each side first: that usually decides the sign.

## Calculating ΔS

:::formula{name="Entropy change of reaction"}
$$
\Delta S^\ominus = \sum S^\ominus(\text{products}) - \sum S^\ominus(\text{reactants})
$$
:::

Multiply each standard entropy by its coefficient. Elements do **not** have zero entropy, so oxygen, hydrogen and carbon are included.

## Gibbs free energy and feasibility

![Gibbs energy change against temperature for two reactions: CaCO3 decomposition (ΔH +178, ΔS +0.1604 kJ per K per mol) falls with temperature, from +130 kJ per mol at 298 K to zero at 1110 K; ammonia synthesis (ΔH −92.2, ΔS −0.1988) rises, from −33.0 kJ per mol at 298 K to zero at 464 K. The gradient is minus ΔS and the intercept is ΔH.](media:diagrams/gibbs-energy-against-temperature.png "Figure: ΔG against T is a straight line with gradient −ΔS and intercept ΔH; it crosses zero at T = ΔH/ΔS")

:::formula{name="Gibbs equation"}
$$
\Delta G^\ominus = \Delta H^\ominus - T\Delta S^\ominus
$$
:::

Convert ΔS to kJ K⁻¹ mol⁻¹ (divide by 1000) before using it with ΔH in kJ mol⁻¹, and use $T$ in kelvin.

| ΔH | ΔS | ΔG | Feasibility |
|---|---|---|---|
| − | + | always − | feasible at all temperatures |
| + | − | always + | never feasible |
| − | − | − at low T | feasible below $T = \Delta H/\Delta S$ |
| + | + | − at high T | feasible above $T = \Delta H/\Delta S$ |

The temperature at which a reaction just becomes feasible is found by setting $\Delta G = 0$:

$$
T = \frac{\Delta H}{\Delta S}
$$

:::worked-solution[Example 1: decomposition of calcium carbonate]
$\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, ΔH⦵ = +178 kJ mol⁻¹. Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{CaCO3(s)}$ 92.9; $\ce{CaO(s)}$ 39.7; $\ce{CO2(g)}$ 213.6.

1. $\Delta S^\ominus = (39.7 + 213.6) - 92.9 = +160.4\ \text{J K}^{-1}\,\text{mol}^{-1} = +0.1604\ \text{kJ K}^{-1}\,\text{mol}^{-1}$. Positive: one mole of gas forms from a solid.
2. At 298 K: $\Delta G^\ominus = 178 - 298 \times 0.1604 = +130\ \text{kJ mol}^{-1}$. Not feasible at room temperature.
3. Feasible when $T > \dfrac{178}{0.1604} = 1110$ K (about 837 °C), which is why lime kilns run hotter than this.
:::

:::worked-solution[Example 2: the Haber process]
$\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, ΔH⦵ = −92.2 kJ mol⁻¹. Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{N2}$ 191.6; $\ce{H2}$ 130.6; $\ce{NH3}$ 192.3.

1. $\Delta S^\ominus = 2(192.3) - [191.6 + 3(130.6)] = -198.8\ \text{J K}^{-1}\,\text{mol}^{-1}$: negative, as 4 mol of gas become 2.
2. At 298 K: $\Delta G^\ominus = -92.2 - 298 \times (-0.1988) = -33.0\ \text{kJ mol}^{-1}$: feasible.
3. ΔG becomes positive above $T = \dfrac{-92.2}{-0.1988} = 464$ K. Industrial plants still run at about 700 K because the reaction is far too slow at lower temperatures: feasibility says nothing about rate. (At those temperatures the equilibrium yield is lower, which is why high pressure is also used.)
:::

## Limits of ΔG

- **Feasible is not fast.** A negative ΔG means the reaction can happen, not that it will happen at a measurable rate. Diamond turning into graphite has a negative ΔG at room temperature, but the activation energy is so high that it does not happen.
- **Standard conditions.** ΔG⦵ refers to standard concentrations and pressures; under other conditions ΔG is different.
- **Assumption.** Using ΔH⦵ and ΔS⦵ at other temperatures assumes they do not change with temperature, which is only approximately true.

## Common mistakes

:::mistake{title="Mixing J and kJ"}
Entropies are in J K⁻¹ mol⁻¹. Divide ΔS by 1000 before combining it with ΔH in kJ mol⁻¹, or multiply ΔH by 1000.
:::

:::mistake{title="Using °C in the Gibbs equation"}
T must be in kelvin: add 273 to a Celsius temperature.
:::

:::mistake{title="Setting S⦵ of elements to zero"}
Only ΔH⦵f of elements is zero. Elements have positive standard entropies, and they must be included in ΔS.
:::

:::mistake{title="Saying a feasible reaction happens quickly"}
ΔG is about whether a reaction can occur; rate depends on activation energy.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4: predict and explain the sign of ΔS, calculate ΔS from data, calculate ΔG and the feasibility temperature, and explain why a feasible reaction may not occur. Cambridge Paper 5 can ask for a plot of ΔG against T: its gradient is −ΔS and its intercept is ΔH.
:::

:::exam-tip{title="Command words"}
*Predict* the sign of ΔS and *explain*: refer to states and the number of moles of gas. *Calculate*: show the unit conversion. *Deduce* the temperature of feasibility: set ΔG = 0 and give T in K. *Explain* why a reaction with negative ΔG does not happen: high activation energy, slow rate.
:::

## Summary

:::summary
- Entropy measures the number of ways particles and energy can be arranged; gases ≫ liquids > solids.
- ΔS⦵ = ΣS⦵(products) − ΣS⦵(reactants); elements have non-zero entropy.
- ΔG⦵ = ΔH⦵ − TΔS⦵ with ΔS in kJ K⁻¹ mol⁻¹ and T in K.
- Feasible when ΔG ≤ 0; the changeover temperature is T = ΔH/ΔS.
- A negative ΔG does not guarantee a measurable rate.
:::
