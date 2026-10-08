---
{
  "key": "energetics.bond-energies",
  "title": "Enthalpy changes from bond energies",
  "summary": "Calculate the enthalpy change of a reaction from a table of bond energies: the energy taken in to break the bonds in the reactants minus the energy given out when the bonds in the products form (Cambridge Supplement).",
  "concepts": ["chem.energetics.bond-energies"],
  "objectives": ["cambridge/igcse/chemistry:5.1.7", "cambridge/igcse/chemistry:5.1.8"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Before a company builds a new gas-fired boiler or an ammonia plant, its engineers want to know how much energy the reaction will give out or need. You can estimate this on paper, without doing the experiment, from a table of **bond energies**.

This lesson is **Cambridge IGCSE Supplement** content (topic 5.1); it is not in the ZIMSEC O-Level syllabus. You should already know that bond breaking is endothermic and bond making is exothermic, and be able to draw displayed formulae showing every bond.

## Key definitions

:::definition{term="Bond energy"}
The energy needed to break one mole of a particular covalent bond, in kJ/mol. The same amount of energy is given out when one mole of that bond forms.
:::

:::definition{term="Displayed formula"}
A formula that shows every atom and every bond: a single bond as $\ce{-}$, a double bond as $\ce{=}$ and a triple bond as $\ce{#}$. For example, water is $\ce{H-O-H}$ and carbon dioxide is $\ce{O=C=O}$.
:::

:::formula{name="Enthalpy change from bond energies"}
$$
\Delta H = \text{total energy of bonds broken} - \text{total energy of bonds made}
$$
:::

:::keyfact{title="Signs"}
Bond breaking takes in energy (+). Bond making gives out energy (−). A negative answer means the reaction is exothermic; a positive answer means it is endothermic.
:::

## The method

1. Write the balanced equation and draw the displayed formula of every substance.
2. List the bonds **broken** in the reactants. Multiply by the number of each bond in a molecule **and** by the number of molecules in the equation. Add up their energies.
3. List the bonds **made** in the products in the same way and add up their energies.
4. Calculate $\Delta H = \text{broken} - \text{made}$ and give the sign and unit.

The worked examples use these bond energies:

| Bond | Bond energy / kJ/mol | Bond | Bond energy / kJ/mol |
| --- | :---: | --- | :---: |
| $\ce{H-H}$ | 436 | $\ce{O=O}$ | 498 |
| $\ce{Cl-Cl}$ | 242 | $\ce{C=O}$ (in $\ce{CO2}$) | 805 |
| $\ce{H-Cl}$ | 431 | $\ce{O-H}$ | 464 |
| $\ce{C-H}$ | 413 | $\ce{N#N}$ | 945 |
| | | $\ce{N-H}$ | 391 |

### Counting bonds

| Molecule | Displayed formula (in words) | Bonds |
| --- | --- | --- |
| hydrogen, $\ce{H2}$ | $\ce{H-H}$ | one $\ce{H-H}$ |
| oxygen, $\ce{O2}$ | $\ce{O=O}$ | one $\ce{O=O}$ |
| methane, $\ce{CH4}$ | a carbon atom joined to four hydrogen atoms | four $\ce{C-H}$ |
| carbon dioxide, $\ce{CO2}$ | $\ce{O=C=O}$ | two $\ce{C=O}$ |
| water, $\ce{H2O}$ | $\ce{H-O-H}$ | two $\ce{O-H}$ |
| ammonia, $\ce{NH3}$ | a nitrogen atom joined to three hydrogen atoms | three $\ce{N-H}$ |
| nitrogen, $\ce{N2}$ | $\ce{N#N}$ | one $\ce{N#N}$ |

## Worked examples

:::worked-solution[Example 1: making hydrogen chloride, $\ce{H2 + Cl2 -> 2HCl}$]
1. Bonds broken: one $\ce{H-H}$ and one $\ce{Cl-Cl}$: $436 + 242 = 678$ kJ.
2. Bonds made: two $\ce{H-Cl}$: $2 \times 431 = 862$ kJ.
3. $\Delta H = 678 - 862 = -184$ kJ/mol.
4. The answer is negative, so the reaction is exothermic: more energy is given out making the $\ce{H-Cl}$ bonds than is taken in breaking the $\ce{H-H}$ and $\ce{Cl-Cl}$ bonds.
:::

:::worked-solution[Example 2: burning methane, $\ce{CH4 + 2O2 -> CO2 + 2H2O}$]
1. Bonds broken: four $\ce{C-H}$ $= 4 \times 413 = 1652$ kJ, and two $\ce{O=O}$ $= 2 \times 498 = 996$ kJ. Total $= 1652 + 996 = 2648$ kJ.
2. Bonds made: two $\ce{C=O}$ $= 2 \times 805 = 1610$ kJ, and four $\ce{O-H}$ (two in each of two water molecules) $= 4 \times 464 = 1856$ kJ. Total $= 1610 + 1856 = 3466$ kJ.
3. $\Delta H = 2648 - 3466 = -818$ kJ/mol: exothermic.
:::

The measured value for burning methane is $-890$ kJ/mol. Bond-energy answers are only estimates for two reasons: the values in the table are **averages** (a $\ce{C-H}$ bond is slightly different in different molecules), and the method treats every substance as a **gas**, whereas the measured value is for liquid water, which gives out extra energy as the steam condenses.

:::worked-solution[Example 3: the Haber process, $\ce{N2 + 3H2 -> 2NH3}$]
1. Bonds broken: one $\ce{N#N}$ $= 945$ kJ, and three $\ce{H-H}$ $= 3 \times 436 = 1308$ kJ. Total $= 945 + 1308 = 2253$ kJ.
2. Bonds made: each $\ce{NH3}$ has three $\ce{N-H}$ bonds, so two molecules have six: $6 \times 391 = 2346$ kJ.
3. $\Delta H = 2253 - 2346 = -93$ kJ/mol: exothermic.
:::

If the total for the bonds broken is **larger** than the total for the bonds made, $\Delta H$ comes out positive and the reaction is endothermic.

:::worked-solution[Example 4: splitting water, $\ce{2H2O -> 2H2 + O2}$]
This is the overall change when water is electrolysed.

1. Bonds broken: two water molecules contain four $\ce{O-H}$ bonds: $4 \times 464 = 1856$ kJ.
2. Bonds made: two $\ce{H-H}$ and one $\ce{O=O}$: $2 \times 436 + 498 = 872 + 498 = 1370$ kJ.
3. $\Delta H = 1856 - 1370 = +486$ kJ/mol.
4. The answer is positive, so the reaction is endothermic: more energy is needed to break the $\ce{O-H}$ bonds than is released when the $\ce{H-H}$ and $\ce{O=O}$ bonds form. This is why electrolysis must keep supplying energy to split water.
:::

Reversing a reaction reverses the sign of $\Delta H$. Splitting hydrogen chloride into hydrogen and chlorine is the reverse of Example 1, so its $\Delta H = +184$ kJ/mol.

### A short cut: count only the bonds that change

Bonds that are present on both sides of the equation are broken and then made again, so they cancel. In a reaction of ethene, $\ce{CH2=CH2}$, the four $\ce{C-H}$ bonds are not changed, so you may leave them out of both totals. Counting every bond gives the same answer; it just takes longer.

## Common mistakes

:::mistake{title="Forgetting the numbers in the equation"}
$\ce{2H2O}$ contains **four** $\ce{O-H}$ bonds, not two. Multiply by the bonds in one molecule and then by the number of molecules.
:::

:::mistake{title="Subtracting the wrong way round"}
$\Delta H$ = broken − made. Working out made − broken gives the right number with the wrong sign, which turns an exothermic reaction into an endothermic one.
:::

:::mistake{title="Wrong bonds in carbon dioxide"}
Carbon dioxide is $\ce{O=C=O}$: two $\ce{C=O}$ **double** bonds. A double bond has its own bond energy; it is not twice a single bond.
:::

:::mistake{title="Leaving out the sign and unit"}
"818" is not an enthalpy change. Write $\Delta H = -818$ kJ/mol.
:::

## Exam tips

:::exam-tip
Set out the working in two labelled lines, "energy to break bonds = …" and "energy released making bonds = …", before the subtraction. Method marks are given for each total even if the final answer is wrong.
:::

:::exam-tip
Always use the bond energies printed in the question. Different books give slightly different values, and the mark scheme expects the ones on the paper.
:::

:::exam-tip
"Explain why the reaction is exothermic" after a calculation: say that more energy is released when the bonds in the products form than is taken in to break the bonds in the reactants.
:::

## Summary

:::summary
- Bond energy: the energy needed to break one mole of a covalent bond; the same energy is released when it forms.
- $\Delta H$ = energy of bonds broken − energy of bonds made.
- Count bonds from displayed formulae, multiplying by the coefficients in the equation.
- A negative $\Delta H$ means exothermic; a positive $\Delta H$ means endothermic.
- Bond-energy answers are estimates because bond energies are averages and all substances are treated as gases.
:::
