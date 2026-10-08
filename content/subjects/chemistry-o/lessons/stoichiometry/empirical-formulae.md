---
{
  "key": "stoichiometry.empirical-formulae",
  "title": "Percentage composition, empirical and molecular formulae",
  "summary": "Calculate the percentage by mass of an element in a compound (metals in ores, nitrogen in fertilisers), work out empirical formulae from masses or percentages, and find molecular formulae from the empirical formula and Mr.",
  "concepts": ["chem.stoichiometry.empirical-formulae"],
  "objectives": ["cambridge/igcse/chemistry:3.3.7", "cambridge/igcse/chemistry:3.3.8", "zimsec/o-level/chemistry:7.1.5.3", "zimsec/o-level/chemistry:7.1.5.4"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

A mining company deciding whether to develop an iron-ore deposit, or a farmer comparing two fertiliser bags at a shop in Chinhoyi, wants the same kind of answer: **how much of the useful element is in each kilogram?** Percentage composition answers that question. The reverse calculation, working out a formula from the masses of elements found by analysis, is how chemists identify new compounds.

This lesson is Cambridge IGCSE **Supplement** content and ZIMSEC Form 4 content (percentage composition of compounds, ores and fertilisers). You need to be able to calculate $M_r$ and amounts in moles. Data for this lesson: H = 1, C = 12, N = 14, O = 16, Fe = 56.

## Key definitions

:::definition{term="Percentage composition by mass"}
The percentage of the total mass of a compound that is due to one element.
:::

:::definition{term="Empirical formula"}
The simplest whole-number ratio of the atoms of each element in a compound.
:::

:::definition{term="Molecular formula"}
The actual number of atoms of each element in one molecule. It is a whole-number multiple of the empirical formula.
:::

:::formula{name="Percentage by mass of an element"}
$$
\% \text{ of element} = \frac{\text{number of atoms of the element} \times A_r}{M_r \text{ of the compound}} \times 100
$$
:::

## Percentage composition

:::worked-solution[Example 1: iron in haematite]
Haematite, the main iron ore used for steel making, is iron(III) oxide, $\ce{Fe2O3}$. Calculate the percentage by mass of iron.

1. $M_r(\ce{Fe2O3}) = (2 \times 56) + (3 \times 16) = 160$.
2. Mass of iron in the formula $= 2 \times 56 = 112$.
3. $\% \ce{Fe} = \dfrac{112}{160} \times 100 = 70.0\%$.
:::

:::worked-solution[Example 2: nitrogen in ammonium nitrate fertiliser]
1. $M_r(\ce{NH4NO3}) = 14 + 4 + 14 + 48 = 80$.
2. There are **two** nitrogen atoms: $2 \times 14 = 28$.
3. $\% \ce{N} = \dfrac{28}{80} \times 100 = 35.0\%$.
:::

The same method gives the percentage of copper in copper pyrites (chalcopyrite, $\ce{CuFeS2}$), of aluminium in the aluminium oxide of bauxite, or of nitrogen in any fertiliser. A higher percentage of nitrogen means more nitrogen per bag.

## Empirical formulae from experimental data

Set the calculation out as a table:

1. Write the mass (or percentage) of each element.
2. Divide each by its $A_r$ to get the amount in moles.
3. Divide every amount by the **smallest** amount.
4. If the ratio is not close to whole numbers, multiply by a small integer (2, 3 or 4) until it is.

:::worked-solution[Example 3: an oxide of iron from masses]
5.6 g of iron combines with 2.4 g of oxygen. Find the empirical formula of the oxide.

1. Fe: $5.6 \div 56 = 0.10$ mol. O: $2.4 \div 16 = 0.15$ mol.
2. Divide by the smaller, 0.10: Fe $= 1$, O $= 1.5$.
3. $1.5$ is not a whole number, so multiply both by 2: Fe $= 2$, O $= 3$.
4. Empirical formula: $\ce{Fe2O3}$.
:::

:::worked-solution[Example 4: a hydrocarbon from percentages]
A hydrocarbon contains 85.7% carbon and 14.3% hydrogen by mass. Find its empirical formula.

1. Treat the percentages as masses in a 100 g sample. C: $85.7 \div 12 = 7.14$ mol. H: $14.3 \div 1 = 14.3$ mol.
2. Divide by 7.14: C $= 1.00$, H $= 2.00$.
3. Empirical formula: $\ce{CH2}$.
:::

## Molecular formulae

The molecular formula is $n$ times the empirical formula, where

$$
n = \frac{M_r \text{ of the compound}}{\text{relative mass of the empirical formula}}
$$

:::worked-solution[Example 5: from CH₂ to the molecular formula]
The hydrocarbon in Example 4 has $M_r = 56$.

1. Relative mass of $\ce{CH2} = 12 + 2 = 14$.
2. $n = 56 \div 14 = 4$.
3. Molecular formula $= (\ce{CH2})_4 = \ce{C4H8}$.
:::

If a question gives the percentages of all but one element, find the missing one by difference: the percentages must add up to 100%.

## Common mistakes

:::mistake{title="Rounding a ratio like 1.5 to 2"}
A ratio of $1 : 1.5$ means $2 : 3$, not $1 : 2$. Only round when a value is within about 0.1 of a whole number; otherwise multiply.
:::

:::mistake{title="Using 32 for oxygen"}
In empirical formula calculations you count oxygen **atoms**, so divide by $A_r = 16$, not by $M_r(\ce{O2}) = 32$.
:::

:::mistake{title="Forgetting how many atoms are in the formula"}
Ammonium nitrate contains two nitrogen atoms. Using only one gives 17.5% instead of 35.0%.
:::

:::mistake{title="Rounding too early"}
Keep two or three decimal places in the moles column. Rounding 1.33 to 1 instead of recognising $\frac{4}{3}$ (multiply by 3) gives the wrong formula.
:::

## Exam tips

:::exam-tip
Always show the table: element, mass or %, $\div A_r$, $\div$ smallest, ratio. Each column usually earns a mark, even if the final formula is wrong.
:::

:::exam-tip
"Show that the empirical formula is..." questions still need the full working: divide by $A_r$ and by the smallest amount, then state the ratio.
:::

:::exam-tip
Give percentages to 3 significant figures (for example 34.8%), and check that your percentages for all the elements add up to about 100%.
:::

## Summary

:::summary
- % by mass = (number of atoms × $A_r$ ÷ $M_r$) × 100.
- Empirical formula: mass or % ÷ $A_r$, then ÷ smallest, then make whole numbers.
- Multiply by 2, 3 or 4 when the ratio ends in .5, .33 or .25 and similar.
- Molecular formula = $n$ × empirical formula, with $n = M_r$ ÷ empirical formula mass.
- These calculations find the metal content of ores and the nutrient content of fertilisers.
:::
