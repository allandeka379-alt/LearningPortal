---
{
  "key": "stoich.relative-masses-mole",
  "title": "Relative masses, the mole and the Avogadro constant",
  "summary": "The carbon-12 scale and the unified atomic mass unit; relative isotopic, atomic, molecular and formula masses; calculating relative atomic mass from isotopic abundances or mass-spectrum peak heights; the mole and the Avogadro constant; and converting between mass, amount and numbers of particles.",
  "concepts": ["achem.stoich.relative-masses-mole"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A pharmacist in Bulawayo weighing out paracetamol, a technician at a fertiliser plant checking the nitrogen content of ammonium nitrate, and a laboratory testing water from the Kariba dam for lead all face the same problem: atoms are far too small to count, yet reactions happen atom by atom. The mole solves this. It links a mass you can weigh on a balance to a number of particles you can never count directly.

Every calculation in A-Level Chemistry, from titrations to equilibrium constants, depends on the ideas in this lesson. You should already be able to work out relative formula masses from a formula and use $n = m/M$.

## Key definitions

:::definition{term="Unified atomic mass unit (u)"}
One twelfth of the mass of one atom of carbon-12. Relative masses are measured against it.
:::

:::definition{term="Relative isotopic mass"}
The mass of an atom of an isotope compared with one twelfth of the mass of an atom of carbon-12.
:::

:::definition{term="Relative atomic mass, Ar"}
The weighted mean mass of an atom of an element compared with one twelfth of the mass of an atom of carbon-12. "Weighted mean" means each isotope counts in proportion to its abundance.
:::

:::definition{term="Relative molecular mass, Mr, and relative formula mass"}
The weighted mean mass of a molecule (or of one formula unit of an ionic compound) compared with one twelfth of the mass of an atom of carbon-12. It is the sum of the relative atomic masses of the atoms in the formula. "Relative formula mass" is used for giant ionic compounds such as $\ce{NaCl}$.
:::

:::definition{term="Mole"}
The amount of substance that contains $6.022 \times 10^{23}$ particles (atoms, molecules, ions or electrons). This number is the **Avogadro constant**, $L = 6.022 \times 10^{23}\ \text{mol}^{-1}$.
:::

:::keyfact{title="Equations to learn"}
$$
n = \frac{m}{M}
$$

$$
N = n \times L
$$

$n$ = amount in mol, $m$ = mass in g, $M$ = molar mass in g mol⁻¹ (numerically equal to $A_\mathrm{r}$ or $M_\mathrm{r}$), $N$ = number of particles. Relative masses have **no units**; molar mass has the unit g mol⁻¹.
:::

## Why carbon-12?

Masses of atoms are tiny (a carbon-12 atom has a mass of about 2 × 10⁻²³ g), so chemists compare them with a standard instead. The standard is the carbon-12 atom, given a mass of exactly 12 u. On this scale a hydrogen-1 atom is about 1 u and an oxygen-16 atom about 16 u. The Avogadro constant is chosen so that one mole of carbon-12 atoms has a mass of exactly 12 g, which is why the molar mass in grams per mole has the same number as the relative mass.

## Relative atomic mass from isotopes

Most elements are mixtures of isotopes, so $A_\mathrm{r}$ is rarely a whole number. Chlorine is 35.5 because about three quarters of its atoms are chlorine-35 and a quarter chlorine-37. The data may be given as **percentage abundances** or as **relative peak heights** from a mass spectrum; the method is the same.

$$
A_\mathrm{r} = \frac{\sum (\text{isotopic mass} \times \text{abundance})}{\sum \text{abundances}}
$$

:::worked-solution[Example 1: $A_\mathrm{r}$ of copper from percentage abundances]
Copper consists of 69.2% copper-63 and 30.8% copper-65. Calculate the relative atomic mass of copper to three significant figures.

1. Multiply each isotopic mass by its abundance: $63 \times 69.2 = 4359.6$ and $65 \times 30.8 = 2002$.
2. Add: $4359.6 + 2002 = 6361.6$.
3. Divide by the total abundance, 100: $6361.6 \div 100 = 63.616$.
4. $A_\mathrm{r}(\ce{Cu}) = 63.6$ (no units).
:::

:::worked-solution[Example 2: $A_\mathrm{r}$ of magnesium from a mass spectrum]
The mass spectrum of a magnesium sample has peaks at m/e 24, 25 and 26 with relative heights 7.9, 1.0 and 1.1. Calculate $A_\mathrm{r}$.

1. The total of the heights is $7.9 + 1.0 + 1.1 = 10.0$ (they need not add up to 100).
2. Weighted sum: $24 \times 7.9 + 25 \times 1.0 + 26 \times 1.1 = 189.6 + 25 + 28.6 = 243.2$.
3. $A_\mathrm{r} = 243.2 \div 10.0 = 24.32$, so $24.3$ to three significant figures.
:::

:::note{title="Mass spectra of molecules"}
Interpreting the molecular ion, fragment peaks and the M+1 and M+2 peaks of organic compounds is part of the analysis lessons. Here the mass spectrum of an element is used only to find $A_\mathrm{r}$.
:::

## The mole: counting by weighing

One mole of any substance contains $6.022 \times 10^{23}$ of its specified particles. Always say which particles you mean: one mole of oxygen **molecules**, $\ce{O2}$, has a mass of 32.0 g and contains $2 \times 6.022 \times 10^{23}$ oxygen **atoms**.

A strategy that never fails:

1. Find the molar mass from the formula.
2. Convert mass to moles with $n = m/M$.
3. Multiply by the number of the required particles in one formula unit.
4. Multiply by $L$ to get a number of particles.

:::worked-solution[Example 3: counting ions and atoms in aluminium sulfate]
How many formula units, ions and oxygen atoms are there in 17.1 g of aluminium sulfate, $\ce{Al2(SO4)3}$? ($A_\mathrm{r}$: Al 27.0, S 32.1, O 16.0)

1. $M_\mathrm{r} = 2(27.0) + 3(32.1) + 12(16.0) = 342.3$, so $M = 342.3\ \text{g mol}^{-1}$.
2. $n = 17.1 \div 342.3 = 0.0500\ \text{mol}$ (to 3 s.f.).
3. Formula units: $0.0500 \times 6.022 \times 10^{23} = 3.01 \times 10^{22}$.
4. Each formula unit contains 5 ions (2 $\ce{Al^3+}$ + 3 $\ce{SO4^2-}$): $0.0500 \times 5 = 0.250\ \text{mol}$ of ions, $= 1.50 \times 10^{23}$ ions.
5. Each formula unit contains 12 oxygen atoms: $0.0500 \times 12 = 0.600\ \text{mol}$, $= 3.61 \times 10^{23}$ oxygen atoms.
:::

## Molar mass of compounds

| Substance | Formula | $M_\mathrm{r}$ |
|---|---|---|
| calcium hydroxide | $\ce{Ca(OH)2}$ | 74.1 |
| glucose | $\ce{C6H12O6}$ | 180.0 |
| ammonium sulfate | $\ce{(NH4)2SO4}$ | 132.1 |
| copper(II) sulfate pentahydrate | $\ce{CuSO4.5H2O}$ | 249.6 |

For a hydrated salt, include the water of crystallisation: $\ce{CuSO4.5H2O}$ is $159.6 + 5(18.0) = 249.6$.

## Common mistakes

:::mistake{title="Giving units to relative masses"}
$A_\mathrm{r}$ and $M_\mathrm{r}$ are ratios and have **no units**. Molar mass $M$ has units of g mol⁻¹.
:::

:::mistake{title="Using the nucleon number as Ar"}
Chlorine's $A_\mathrm{r}$ is 35.5, not 35. Use the Periodic Table values, which are weighted means of all isotopes.
:::

:::mistake{title="Confusing molecules with atoms"}
One mole of $\ce{H2O}$ contains one mole of molecules but three moles of atoms. Multiply by the number of atoms or ions per formula unit when the question asks about them.
:::

:::mistake{title="Dividing by 100 when the abundances do not add up to 100"}
With peak heights, divide by the **sum of the heights**, not by 100.
:::

## Exam tips

:::exam-tip
**Define** $A_\mathrm{r}$ using the three key phrases: *weighted mean (average) mass*, *of an atom*, *compared with 1/12 of the mass of an atom of carbon-12*. Each usually earns a mark.
:::

:::exam-tip
In **calculate** questions (Paper 1 and Paper 2 on both boards), give the answer to three significant figures unless asked otherwise, and show each step: molar mass, moles, multiplier, final number.
:::

:::exam-tip
ZIMSEC papers do not come with a data booklet: the $A_\mathrm{r}$ values you need are printed in the question or in the Periodic Table provided. Use exactly those values.
:::

## Summary

:::summary
- Relative masses compare with 1/12 of the mass of a carbon-12 atom and have no units.
- $A_\mathrm{r}$ is a weighted mean of isotopic masses: $\sum(\text{mass} \times \text{abundance}) \div \sum \text{abundance}$.
- One mole contains $6.022 \times 10^{23}$ particles; molar mass in g mol⁻¹ equals $A_\mathrm{r}$ or $M_\mathrm{r}$.
- $n = m/M$ and $N = n \times L$; always state which particles you are counting.
- Hydrated salts include the water of crystallisation in $M_\mathrm{r}$.
:::
