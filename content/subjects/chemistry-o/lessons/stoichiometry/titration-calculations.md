---
{
  "key": "stoichiometry.titration-calculations",
  "title": "Titration calculations",
  "summary": "Use the mean of concordant titres and the balanced equation, including 1 : 2 and 2 : 1 mole ratios and dilution steps, to calculate unknown concentrations, volumes and masses.",
  "concepts": ["chem.stoichiometry.titration-calculations"],
  "objectives": ["cambridge/igcse/chemistry:3.3.6", "zimsec/o-level/chemistry:7.1.1.6"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Factories that make soft drinks, cleaning products or fertilisers test their solutions many times a day. One of the most reliable checks is a **titration**: a measured volume of one solution is reacted exactly with a second solution of known concentration, and the volume needed reveals how concentrated the first solution was. Laboratories in Zimbabwe's breweries, sugar mills and water works all use this method.

This lesson covers the calculations. It is Cambridge IGCSE **Supplement** content and ZIMSEC Form 4 content (volumetric analysis). The practical technique, reading a burette and recording results, is covered in the lesson on acid–base titration technique. You should already be able to use $n = c \times V$.

## Key definitions

:::definition{term="Titre"}
The volume of solution added from the burette to reach the end-point: final burette reading minus initial burette reading.
:::

:::definition{term="Concordant titres"}
Accurate titres that agree closely with each other, within $0.10\ \text{cm}^3$.
:::

:::definition{term="Mean titre"}
The average of the concordant titres. The rough (trial) titre is never included.
:::

## The method

1. Write the **balanced equation** and note the mole ratio.
2. Calculate the **mean titre** from the concordant results.
3. Calculate the amount of the substance whose concentration you know: $n = c \times V$, with $V$ in dm³.
4. Use the **mole ratio** to find the amount of the other substance.
5. Divide by its volume in dm³ to find its concentration (or use the amount to find a mass or a volume).

## A 1 : 1 titration

![Bar chart of four titres: the rough titre of 21.30 cm3 is left out; the three accurate titres 20.85, 20.95 and 20.90 cm3 are all within 0.10 cm3 of each other, so their mean is 20.90 cm3.](media:diagrams/titration-titres-mean-concordant.png "Figure: the rough titre is excluded; the mean of the concordant titres is 20.90 cm³")

:::worked-solution[Example 1: sodium hydroxide with hydrochloric acid]
25.0 cm³ of sodium hydroxide solution is titrated with 0.100 mol/dm³ hydrochloric acid. The titres are: rough 21.30 cm³, then 20.85, 20.95 and 20.90 cm³. Find the concentration of the sodium hydroxide.

1. $\ce{NaOH + HCl -> NaCl + H2O}$: ratio $1 : 1$.
2. The three accurate titres are all within 0.10 cm³ of each other: mean $= (20.85 + 20.95 + 20.90) \div 3 = 20.90\ \text{cm}^3$.
3. $n(\ce{HCl}) = 0.100 \times 0.02090 = 0.002090$ mol.
4. $n(\ce{NaOH}) = 0.002090$ mol.
5. $c(\ce{NaOH}) = 0.002090 \div 0.0250 = 0.0836$ mol/dm³.
:::

## Ratios that are not 1 : 1

Sulfuric acid has two hydrogen ions to give, and a carbonate ion takes two hydrogen ions, so these reactions have $1 : 2$ ratios. Always read the ratio from the equation.

![Mole method for Example 2: 18.40 cm3 of 0.0500 mol/dm3 sulfuric acid contains 0.000920 mol; the 1 : 2 ratio gives 0.00184 mol of sodium hydroxide in 25.0 cm3, so its concentration is 0.0736 mol/dm3.](media:diagrams/titration-mole-method-flow.png "Figure: from burette reading to unknown concentration, using the 1 : 2 mole ratio")

:::worked-solution[Example 2: sulfuric acid with sodium hydroxide]
25.0 cm³ of sodium hydroxide is neutralised by a mean titre of 18.40 cm³ of 0.0500 mol/dm³ sulfuric acid. Find the concentration of the sodium hydroxide.

1. $\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$: ratio acid $:$ alkali $= 1 : 2$.
2. $n(\ce{H2SO4}) = 0.0500 \times 0.01840 = 0.000920$ mol.
3. $n(\ce{NaOH}) = 2 \times 0.000920 = 0.00184$ mol.
4. $c(\ce{NaOH}) = 0.00184 \div 0.0250 = 0.0736$ mol/dm³.
:::

:::worked-solution[Example 3: sodium carbonate with hydrochloric acid]
25.0 cm³ of 0.0500 mol/dm³ sodium carbonate solution needs a mean titre of 24.60 cm³ of hydrochloric acid. Find the concentration of the acid.

1. $\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2}$: ratio $1 : 2$.
2. $n(\ce{Na2CO3}) = 0.0500 \times 0.0250 = 0.00125$ mol.
3. $n(\ce{HCl}) = 2 \times 0.00125 = 0.00250$ mol.
4. $c(\ce{HCl}) = 0.00250 \div 0.02460 = 0.102$ mol/dm³ (to 3 significant figures).
:::

## Titrations with a dilution step

A concentrated solution is often diluted accurately before it is titrated, so that a sensible titre is obtained. Work out the concentration of the **diluted** solution first, then multiply by the dilution factor.

:::worked-solution[Example 4: undoing a dilution]
25.0 cm³ of a concentrated acid was made up to 250 cm³ with distilled water. Titration showed that the diluted acid had a concentration of 0.0950 mol/dm³. What was the concentration of the original acid?

1. The volume increased from 25.0 cm³ to 250 cm³, a factor of $250 \div 25.0 = 10$.
2. The original acid was 10 times more concentrated: $0.0950 \times 10 = 0.950$ mol/dm³.
:::

## Common mistakes

:::mistake{title="Including the rough titre"}
The rough titre is a quick trial run and usually overshoots the end-point. Use only the accurate, concordant titres in the mean.
:::

:::mistake{title="Using the wrong mole ratio"}
Treating $\ce{H2SO4 + 2NaOH}$ as $1 : 1$ makes the sodium hydroxide concentration half its true value. Write the equation first, every time.
:::

:::mistake{title="Pairing volumes with the wrong solution"}
The titre belongs to the solution in the burette; the pipette volume (usually 25.0 cm³) belongs to the solution in the flask. Label each volume as you write it down.
:::

:::mistake{title="Forgetting the dilution factor"}
If a sample was diluted before titrating, the titration gives the diluted concentration. Multiply by the dilution factor to get back to the original.
:::

## Exam tips

:::exam-tip
Show the mean titre calculation with the titres you chose: "mean $= (20.85 + 20.95 + 20.90) \div 3 = 20.90\ \text{cm}^3$". Examiners check that you excluded the rough titre.
:::

:::exam-tip
Carry at least four significant figures through the working and round only the final answer, normally to 3 significant figures, with its unit.
:::

:::exam-tip
"Calculate the concentration in g/dm³" needs one more step: multiply the concentration in mol/dm³ by the molar mass.
:::

## Summary

:::summary
- Mean titre = average of the concordant titres (within 0.10 cm³); never include the rough titre.
- Amount of the known solution: $n = c \times V$, with $V$ in dm³.
- Use the mole ratio from the balanced equation; $\ce{H2SO4}$ with NaOH and $\ce{Na2CO3}$ with HCl are $1 : 2$.
- Concentration of the unknown = its amount ÷ its volume in dm³.
- After a dilution step, multiply the concentration found by the dilution factor.
:::
