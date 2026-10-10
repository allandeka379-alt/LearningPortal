---
{
  "key": "electrochem.faraday",
  "title": "Quantitative electrolysis and the Faraday constant",
  "summary": "Use Q = It and the Faraday constant to calculate the amounts of electrons, the masses of metals and the volumes of gases liberated in electrolysis, deduce the charge on an ion, and determine the Avogadro constant by an electrolytic method.",
  "concepts": ["achem.electrochem.faraday"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A copper refinery or an electroplating workshop in Bulawayo needs to know how long to run the current to deposit a given mass of metal, and how much electricity that will cost. Michael Faraday's laws of electrolysis answer this: the amount of substance produced depends only on the charge passed and the number of electrons each ion needs. The same idea, run backwards, lets you count atoms: measuring a current, a time and a change in mass gives the **Avogadro constant**.

You need the mole, electrode half-equations, molar gas volume and standard form before starting.

## Key definitions

:::definition{term="Electric charge, Q"}
The quantity of electricity passed, in coulombs (C): $Q = It$, where $I$ is the current in amperes and $t$ is the time in seconds.
:::

:::definition{term="Faraday constant, F"}
The charge on one mole of electrons: $F = 9.65 \times 10^{4}$ C mol⁻¹.
:::

:::definition{term="Avogadro constant, L"}
The number of particles in one mole: $L = 6.022 \times 10^{23}$ mol⁻¹.
:::

:::formula{name="Linking the constants"}
$$
F = L \times e
$$

where $e = 1.60 \times 10^{-19}$ C is the charge on one electron.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches quantitative electrolysis in Form 6; for Cambridge it is A Level only (Paper 4). Both boards ask for the Avogadro constant determination and its sources of error.
:::

## The method for every calculation

1. Charge: $Q = It$ (time in **seconds**).
2. Moles of electrons: $n(e^-) = Q \div F$.
3. Use the half-equation to convert moles of electrons into moles of product (divide by the number of electrons per particle).
4. Convert to mass ($m = nM$) or gas volume ($V = n \times 24.0$ dm³ mol⁻¹ at room conditions).

| Product | Half-equation | Electrons per particle |
|---|---|---|
| silver | $\ce{Ag+ + e- -> Ag}$ | 1 |
| copper | $\ce{Cu^2+ + 2e- -> Cu}$ | 2 |
| aluminium | $\ce{Al^3+ + 3e- -> Al}$ | 3 |
| hydrogen | $\ce{2H+ + 2e- -> H2}$ | 2 |
| chlorine | $\ce{2Cl- -> Cl2 + 2e-}$ | 2 |
| oxygen | $\ce{2H2O -> O2 + 4H+ + 4e-}$ | 4 |

:::worked-solution[Example 1: mass of copper deposited]
A current of 0.500 A passes through copper(II) sulfate solution for 30.0 minutes. Find the mass of copper deposited (Ar Cu = 63.5).

1. $t = 30.0 \times 60 = 1800$ s; $Q = 0.500 \times 1800 = 900$ C.
2. $n(e^-) = 900 \div F = 9.33 \times 10^{-3}$ mol.
3. $n(\ce{Cu}) = 9.33 \times 10^{-3} \div 2 = 4.66 \times 10^{-3}$ mol.
4. Mass $= 4.66 \times 10^{-3} \times 63.5 = 0.296$ g.
:::

:::worked-solution[Example 2: volume of oxygen at the anode]
A current of 1.50 A passes for 20.0 minutes through dilute sulfuric acid. Find the volume of oxygen at room conditions.

1. $Q = 1.50 \times 1200 = 1800$ C; $n(e^-) = 1800 \div F = 0.0187$ mol.
2. Four electrons per $\ce{O2}$: $n(\ce{O2}) = 0.0187 \div 4 = 4.66 \times 10^{-3}$ mol.
3. $V = 4.66 \times 10^{-3} \times 24.0 = 0.112$ dm³ (112 cm³). Twice this volume of hydrogen forms at the cathode in the same time.
:::

### Finding the charge on an ion

If the mass deposited, the charge passed and the molar mass are known, the number of electrons per ion is $n(e^-) \div n(\text{metal})$.

:::worked-solution[Example 3: the charge on silver ions]
0.400 A for 40.0 minutes deposits 1.07 g of silver (Ar = 107.9).

1. $Q = 0.400 \times 2400 = 960$ C; $n(e^-) = 960 \div F = 9.95 \times 10^{-3}$ mol.
2. $n(\ce{Ag}) = 1.07 \div 107.9 = 9.92 \times 10^{-3}$ mol.
3. Ratio $= 9.95 \div 9.92 = 1.00$: one electron per silver ion, so the ion is $\ce{Ag+}$.
:::

## Determining the Avogadro constant

The method uses two weighed copper electrodes in copper(II) sulfate solution, with an ammeter, a variable resistor and a switch in series with a d.c. supply.

1. Clean the copper electrodes with emery paper, wash with propanone (or water) and dry, then weigh each on the most precise balance available.
2. Pass a **constant** current, adjusting the variable resistor, for a measured time (for example 45 minutes).
3. Remove, wash gently with distilled water and then propanone, dry and reweigh. The cathode gains mass; the anode loses about the same mass.
4. Use the cathode's gain (or the anode's loss) to calculate:

$$
L = \frac{Q}{e \times n(e^-)} \qquad n(e^-) = 2 \times \frac{\text{mass change}}{A_\mathrm{r}(\ce{Cu})}
$$

:::worked-solution[Example 4: calculating L]
A current of 0.300 A for 45.0 minutes increased the cathode's mass by 0.267 g.

1. $Q = 0.300 \times 2700 = 810$ C.
2. $n(\ce{Cu}) = 0.267 \div 63.5 = 4.205 \times 10^{-3}$ mol, so $n(e^-) = 8.409 \times 10^{-3}$ mol.
3. Number of electrons $= Q \div e = 5.06 \times 10^{21}$.
4. $L = 5.06 \times 10^{21} \div 8.409 \times 10^{-3} = 6.02 \times 10^{23}$ mol⁻¹.
:::

### Sources of error

| Error | Effect | Improvement |
|---|---|---|
| current drifts during the experiment | Q not equal to It | monitor and adjust the variable resistor; record I regularly and use the mean |
| copper not firmly attached falls off the cathode | mass gain too small, L too large | use a low current density (small current, large electrode) |
| electrodes not completely dry when weighed | mass change wrong | rinse with propanone and dry thoroughly |
| small mass change measured on a 2-place balance | large percentage uncertainty | pass a larger charge (longer time) or use a 3- or 4-place balance |

## Common mistakes

:::mistake{title="Time in minutes"}
$Q = It$ needs t in seconds: multiply minutes by 60.
:::

:::mistake{title="Ignoring the electrons per particle"}
One mole of copper needs two moles of electrons; one mole of oxygen needs four.
:::

:::mistake{title="Using the formula of the gas wrongly"}
For chlorine, two electrons give one $\ce{Cl2}$ molecule, not two.
:::

:::mistake{title="Mixing up F and L"}
F is a charge per mole (C mol⁻¹); L is a number per mole (mol⁻¹). F = Le links them.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (calculations) and the practical papers (the Avogadro experiment and its errors). Cambridge Paper 4 calculations and Paper 5 evaluation of the Avogadro method.
:::

:::exam-tip{title="Command words"}
*Calculate*: show Q, moles of electrons, moles of product and the final mass or volume with units. *Deduce* the charge on an ion: compare moles of electrons with moles of metal. *Describe* the Avogadro method: apparatus, measurements, calculation. *Suggest* improvements linked to named errors.
:::

## Summary

:::summary
- Q = It (seconds); moles of electrons = Q ÷ F.
- Divide by the number of electrons in the half-equation to get moles of product.
- Gas volume at room conditions = moles × the molar gas volume.
- Charge on an ion = moles of electrons ÷ moles of metal deposited.
- L = Q ÷ (e × moles of electrons); F = Le.
:::
