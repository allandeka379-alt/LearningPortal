---
{
  "key": "stoich.formulae-equations",
  "title": "Formulae, equations, and empirical and molecular formulae",
  "summary": "Writing formulae of ionic compounds from ionic charges, the common ions to recall, balanced full and ionic equations with state symbols, empirical and molecular formulae from percentage composition, masses and combustion data, and finding the water of crystallisation in a hydrated salt.",
  "concepts": ["achem.stoich.formulae-equations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A chemical formula is a precise statement: $\ce{Fe2(SO4)3}$ tells you that iron(III) sulfate contains two iron ions for every three sulfate ions. An equation is a statement about amounts as well as substances. If either is wrong, every calculation that follows is wrong too, so examiners reward accuracy here heavily.

Chemists in industry use formulae every day. A laboratory at a sugar mill in the Lowveld that analyses an unknown residue first finds its percentage composition by mass, then its **empirical formula**, then, with a measured molar mass, its **molecular formula**. The same method identifies an unknown organic liquid from the masses of carbon dioxide and water it gives when burned.

You should already be able to write simple formulae and balance equations, and to use $n = m/M$.

## Key definitions

:::definition{term="Empirical formula"}
The simplest whole-number ratio of the atoms of each element in a compound.
:::

:::definition{term="Molecular formula"}
The actual number of atoms of each element in one molecule of a compound. It is a whole-number multiple of the empirical formula.
:::

:::definition{term="Water of crystallisation"}
Water molecules chemically bound within the crystal lattice of a **hydrated** salt, such as the five water molecules in $\ce{CuSO4.5H2O}$. Heating drives it off to leave the **anhydrous** salt.
:::

:::definition{term="Ionic equation"}
An equation showing only the ions and other species that take part in a reaction; **spectator ions**, present unchanged on both sides, are left out.
:::

## Formulae of ionic compounds

The charges on the ions must cancel. Charges of simple ions follow from the Periodic Table: Group 1 form 1+, Group 2 form 2+, aluminium 3+; Group 15 (nitrogen) 3−, Group 16 2−, Group 17 1−. For transition metals the Roman numeral in the name gives the oxidation number, and so the charge: iron(III) is $\ce{Fe^3+}$.

:::keyfact{title="Ions to recall"}
| Ion | Formula | Ion | Formula |
|---|---|---|---|
| nitrate | $\ce{NO3-}$ | ammonium | $\ce{NH4+}$ |
| carbonate | $\ce{CO3^2-}$ | hydrogencarbonate | $\ce{HCO3-}$ |
| sulfate | $\ce{SO4^2-}$ | phosphate | $\ce{PO4^3-}$ |
| hydroxide | $\ce{OH-}$ | zinc | $\ce{Zn^2+}$ |
| silver | $\ce{Ag+}$ | | |
:::

Use brackets when more than one polyatomic ion is needed: calcium nitrate is $\ce{Ca(NO3)2}$ (one $\ce{Ca^2+}$, two $\ce{NO3-}$); ammonium phosphate is $\ce{(NH4)3PO4}$; aluminium sulfate is $\ce{Al2(SO4)3}$ (2 × 3+ = 6+ balances 3 × 2− = 6−).

## Balanced equations and ionic equations

Balance atoms by changing the numbers **in front of** formulae, never the formulae themselves. Add state symbols: (s), (l), (g), (aq).

To write an ionic equation:

1. Write the balanced full equation with state symbols.
2. Split every **aqueous** ionic compound (soluble salts, strong acids, alkalis) into its ions. Leave solids, liquids, gases and covalent molecules as they are.
3. Cross out the ions that appear unchanged on both sides.
4. Check that both atoms and **charges** balance.

:::example{title="Precipitating silver chloride"}
Full equation: $\ce{AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)}$

Split: $\ce{Ag+(aq) + NO3-(aq) + Na+(aq) + Cl-(aq) -> AgCl(s) + Na+(aq) + NO3-(aq)}$

Sodium and nitrate ions are spectators, so the ionic equation is $\ce{Ag+(aq) + Cl-(aq) -> AgCl(s)}$. Charges: (+1) + (−1) = 0 on the left, 0 on the right.
:::

Other ionic equations worth knowing: neutralisation $\ce{H+(aq) + OH-(aq) -> H2O(l)}$; carbonate with acid $\ce{CO3^2-(aq) + 2H+(aq) -> CO2(g) + H2O(l)}$ (or with a solid carbonate, $\ce{CaCO3(s) + 2H+(aq) -> Ca^2+(aq) + CO2(g) + H2O(l)}$); and displacement $\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}$.

## Empirical formula from percentages or masses

The method is the same whether you start with percentages (treat them as grams in 100 g) or with masses.

1. Divide the mass (or percentage) of each element by its $A_\mathrm{r}$ to get moles.
2. Divide every result by the smallest.
3. If a ratio is close to x.5 or x.33, multiply all by 2 or 3 to reach whole numbers.

:::worked-solution[Example 1: from percentage composition to molecular formula]
A sugar contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. Its $M_\mathrm{r}$ is 180. Find the empirical and molecular formulae. ($A_\mathrm{r}$: H 1.0, C 12.0, O 16.0)

1. Moles in 100 g: C $40.0 \div 12.0 = 3.33$; H $6.7 \div 1.0 = 6.7$; O $53.3 \div 16.0 = 3.33$.
2. Divide by the smallest (3.33): C 1.00, H 2.01, O 1.00.
3. Empirical formula: $\ce{CH2O}$, with $M_\mathrm{r} = 12.0 + 2.0 + 16.0 = 30.0$.
4. $180 \div 30.0 = 6$, so the molecular formula is $\ce{C6H12O6}$ (glucose).
:::

## Empirical formula from combustion data

An organic compound that contains carbon, hydrogen and possibly oxygen burns completely to carbon dioxide and water. All the carbon ends up in the $\ce{CO2}$ and all the hydrogen in the $\ce{H2O}$; oxygen is found by difference.

:::worked-solution[Example 2: a liquid from its combustion products]
0.460 g of a liquid containing C, H and O burns completely to give 0.880 g of $\ce{CO2}$ and 0.540 g of $\ce{H2O}$. Find its empirical formula. ($A_\mathrm{r}$: H 1.0, C 12.0, O 16.0)

1. Mass of C $= 0.880 \times \dfrac{12.0}{44.0} = 0.240$ g.
2. Mass of H $= 0.540 \times \dfrac{2.0}{18.0} = 0.0600$ g.
3. Mass of O $= 0.460 - 0.240 - 0.0600 = 0.160$ g.
4. Moles: C $0.240 \div 12.0 = 0.0200$; H $0.0600 \div 1.0 = 0.0600$; O $0.160 \div 16.0 = 0.0100$.
5. Ratio ÷ 0.0100: C 2, H 6, O 1. Empirical formula $\ce{C2H6O}$.
:::

## Water of crystallisation

Heat a known mass of hydrated salt in a crucible until the mass stops changing (**heating to constant mass**), so that all the water has gone. The mass lost is water.

:::worked-solution[Example 3: finding x in $\ce{MgSO4.xH2O}$]
2.46 g of hydrated magnesium sulfate is heated to constant mass. 1.20 g of anhydrous $\ce{MgSO4}$ remains. Find x. ($A_\mathrm{r}$: H 1.0, O 16.0, Mg 24.3, S 32.1)

1. Mass of water lost $= 2.46 - 1.20 = 1.26$ g.
2. $n(\ce{MgSO4}) = 1.20 \div 120.4 = 0.00997$ mol.
3. $n(\ce{H2O}) = 1.26 \div 18.0 = 0.0700$ mol.
4. Ratio $0.0700 \div 0.00997 = 7.02$, so $x = 7$: the formula is $\ce{MgSO4.7H2O}$.
:::

## Common mistakes

:::mistake{title="Changing a formula to balance an equation"}
Writing $\ce{H2O2}$ to balance oxygen changes the substance. Only change the coefficients in front.
:::

:::mistake{title="Rounding ratios too early"}
A ratio of 1 : 1.5 is not 1 : 1 or 1 : 2. Multiply by 2 to get 2 : 3. Keep three significant figures in the mole values.
:::

:::mistake{title="Splitting solids and covalent molecules in ionic equations"}
Only aqueous ionic substances are split. $\ce{CaCO3(s)}$, $\ce{H2O(l)}$ and $\ce{CO2(g)}$ stay whole.
:::

:::mistake{title="Not heating to constant mass"}
If the salt is not heated until its mass stops changing, some water remains, the mass loss is too small and x comes out too low.
:::

## Exam tips

:::exam-tip
In **construct an equation** questions (Paper 2 and Paper 3 on ZIMSEC; Papers 2 and 4 on Cambridge) state symbols are often required. Check charges as well as atoms in ionic equations.
:::

:::exam-tip
In empirical formula **calculations**, set the working out as a table (element, mass, $A_\mathrm{r}$, moles, ratio). Examiners award marks for each column even if you slip at the end.
:::

:::exam-tip
"**Deduce** the molecular formula" needs the empirical formula mass and the multiplier stated: "$180 \div 30 = 6$, so $\ce{C6H12O6}$".
:::

## Summary

:::summary
- Ionic formulae balance the charges; brackets enclose repeated polyatomic ions.
- Ionic equations omit spectator ions and must balance in atoms and charge.
- Empirical formula: mass ÷ $A_\mathrm{r}$, divide by the smallest, convert to whole numbers.
- Molecular formula = $n$ × empirical formula, where $n = M_\mathrm{r} \div$ empirical formula mass.
- Combustion data: C from $\ce{CO2}$ (12/44), H from $\ce{H2O}$ (2/18), O by difference.
- Water of crystallisation: heat to constant mass and compare moles of water and anhydrous salt.
:::
