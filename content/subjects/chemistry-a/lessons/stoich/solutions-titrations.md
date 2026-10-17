---
{
  "key": "stoich.solutions-titrations",
  "title": "Solution concentrations and acid-base titration calculations",
  "summary": "Concentration in mol dm⁻³ and g dm⁻³, dilution and standard solutions, concordant titres, and acid-base titration calculations: simple titrations, titrations of a diluted aliquot, back titrations, and finding an Mr, the basicity of an acid, water of crystallisation or a reacting ratio.",
  "concepts": ["achem.stoich.solutions-titrations"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Titration is one of the most precise techniques in a school laboratory: with care, two titres agree to within 0.10 cm³. Water-treatment works check the alkalinity of water by titration, food scientists use it to find the acid content of vinegar and fruit juices such as citrus juice, and the ZIMSEC Paper 4 and Cambridge Paper 3 practical examinations are built around it.

The chemistry in each titration is simple; the skill is in the calculation. This lesson shows how to move confidently between volumes, concentrations and moles, including the two-stage problems examiners like best: a diluted sample, and a back titration. You should already be able to use $n = m/M$ and balance neutralisation equations. Practical technique and uncertainties are covered in the quantitative practical skills lesson, and redox titrations in the electrochemistry lessons.

## Key definitions

:::definition{term="Concentration"}
The amount of solute in a stated volume of solution, usually in mol dm⁻³ (also written M). Mass concentration is in g dm⁻³.
:::

:::definition{term="Standard solution"}
A solution of accurately known concentration, made by dissolving a weighed mass of a pure solid and making the solution up to the mark in a volumetric flask.
:::

:::definition{term="Concordant titres"}
Accurate titres that agree within 0.10 cm³ of each other. Only concordant titres are averaged to give the mean titre.
:::

:::definition{term="Back titration"}
A method in which a known excess of a reagent is added to the sample, and the amount left over is then found by titration. The amount that reacted with the sample is the difference.
:::

:::keyfact{title="Equations to learn"}
$$
n = c \times \frac{V}{1000}
$$

with $c$ in mol dm⁻³ and $V$ in cm³ (or $n = cV$ with $V$ in dm³).

Mass concentration (g dm⁻³) = concentration (mol dm⁻³) × $M$ (g mol⁻¹).

Dilution: $c_1V_1 = c_2V_2$ (the amount of solute does not change).
:::

## Concordant titres and the mean

A burette is read to the nearest 0.05 cm³ and every reading is recorded to two decimal places. The first (rough) titre is usually ignored; the mean is taken of the titres that agree within 0.10 cm³.

![Titration apparatus: a burette on a stand holds 0.100 mol per dm3 sulfuric acid above a conical flask containing 25.0 cm3 of sodium hydroxide from a pipette plus indicator, standing on a white tile; acid is added while swirling until the colour changes, and the titre is the final minus the initial burette reading (mean of concordant titres 22.42 cm3).](media:diagrams/titration-apparatus.png "Figure: titration set-up for Example 1 (acid in the burette, 25.0 cm³ of alkali in the flask)")

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| Final reading / cm³ | 22.85 | 45.20 | 22.95 | 23.65 |
| Initial reading / cm³ | 0.00 | 22.85 | 0.50 | 1.20 |
| Titre / cm³ | 22.85 | 22.35 | 22.45 | 22.45 |

Titres 1, 2 and 3 are concordant (range 0.10 cm³), so the mean titre is $(22.35 + 22.45 + 22.45) \div 3 = 22.42$ cm³.

## Simple titration calculations

The method is the same as for reacting masses, with $n = cV/1000$ at either end.

:::worked-solution[Example 1: concentration of sodium hydroxide]
The titres above were obtained when 25.0 cm³ of sodium hydroxide solution was titrated with 0.100 mol dm⁻³ sulfuric acid. Calculate the concentration of the sodium hydroxide.

$$
\ce{H2SO4(aq) + 2NaOH(aq) -> Na2SO4(aq) + 2H2O(l)}
$$

1. $n(\ce{H2SO4}) = 0.100 \times 22.42 \div 1000 = 0.002242$ mol.
2. Ratio $\ce{H2SO4} : \ce{NaOH} = 1 : 2$, so $n(\ce{NaOH}) = 0.004483$ mol.
3. $c(\ce{NaOH}) = 0.004483 \div (25.0 \div 1000) = 0.179$ mol dm⁻³.
:::

## Titrating a diluted sample

Concentrated samples (vinegar, household ammonia, a concentrated acid) are diluted accurately first. Work back through the dilution at the end: if 10.0 cm³ was made up to 100 cm³, the original solution was **10 times** more concentrated than the diluted one.

:::worked-solution[Example 2: ethanoic acid in vinegar]
10.0 cm³ of vinegar is diluted to 100 cm³ in a volumetric flask. 25.0 cm³ of the diluted solution needs 21.85 cm³ of 0.100 mol dm⁻³ sodium hydroxide. Calculate the concentration of ethanoic acid in the vinegar in mol dm⁻³ and in g dm⁻³. ($M(\ce{CH3COOH}) = 60.0$ g mol⁻¹)

$$
\ce{CH3COOH(aq) + NaOH(aq) -> CH3COONa(aq) + H2O(l)}
$$

1. $n(\ce{NaOH}) = 0.100 \times 21.85 \div 1000 = 0.002185$ mol $= n(\ce{CH3COOH})$ in 25.0 cm³.
2. Diluted concentration $= 0.002185 \div 0.0250 = 0.0874$ mol dm⁻³.
3. Dilution factor $= 100 \div 10.0 = 10$, so the vinegar is $0.874$ mol dm⁻³.
4. Mass concentration $= 0.874 \times 60.0 = 52.4$ g dm⁻³.
:::

## Back titrations

A back titration is used when the substance is insoluble (calcium carbonate in an antacid tablet or in limestone), reacts slowly, or has an end-point that is hard to see. Add a measured **excess** of acid, let the reaction finish, then titrate the acid that is left.

:::worked-solution[Example 3: calcium carbonate in an antacid tablet]
An antacid tablet is added to 50.0 cm³ of 0.500 mol dm⁻³ hydrochloric acid (an excess). When the reaction is over, the excess acid needs 25.30 cm³ of 0.400 mol dm⁻³ sodium hydroxide. Calculate the mass of calcium carbonate in the tablet. ($M(\ce{CaCO3}) = 100.1$ g mol⁻¹)

1. Total HCl added $= 0.500 \times 50.0 \div 1000 = 0.0250$ mol.
2. Excess HCl $= n(\ce{NaOH}) = 0.400 \times 25.30 \div 1000 = 0.01012$ mol.
3. HCl that reacted with the carbonate $= 0.0250 - 0.01012 = 0.01488$ mol.
4. $\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$: $n(\ce{CaCO3}) = 0.01488 \div 2 = 0.00744$ mol.
5. Mass $= 0.00744 \times 100.1 = 0.745$ g.
:::

## What else a titration can reveal

The same method finds unknown quantities in a formula:

- **Relative formula mass**: titrate a solution made from a known mass of the unknown; $M = \text{mass} \div n$.
- **Basicity of an acid** (the number of $\ce{H+}$ ions one molecule can donate): compare moles of acid with moles of NaOH. A 1 : 2 ratio shows a dibasic acid such as $\ce{H2SO4}$ or ethanedioic acid.
- **Water of crystallisation**: find $M$ of a hydrated salt (for example $\ce{Na2CO3.xH2O}$) by titration, subtract the anhydrous part and divide by 18.0.
- **Reacting ratio**: when the equation is unknown, the mole ratio from the titration gives the coefficients.

## Common mistakes

:::mistake{title="Forgetting to divide by 1000"}
Volumes in cm³ must be converted to dm³: 25.0 cm³ = 0.0250 dm³.
:::

:::mistake{title="Including the rough titre or non-concordant titres in the mean"}
Average only titres within 0.10 cm³ of each other.
:::

:::mistake{title="Forgetting the dilution factor"}
If the titration used a diluted aliquot, multiply back to the original concentration (or scale the moles from 25.0 cm³ to the whole flask).
:::

:::mistake{title="Using the total acid in a back titration"}
The sample reacted only with the acid that was **used up**: total minus excess.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 4 and Cambridge Paper 3 the calculation follows your own titre. Give the mean titre to two decimal places and show which titres you used; examiners credit correct working with an error carried forward.
:::

:::exam-tip
In multi-step **calculate** questions (Papers 2 on both boards and ZIMSEC Paper 3), label each amount ("moles of HCl in excess = …"). It makes the logic clear and earns method marks.
:::

:::exam-tip
When asked to **deduce** the basicity of an acid or a reacting ratio, state the mole ratio explicitly before drawing the conclusion.
:::

## Summary

:::summary
- $n = cV/1000$ with $V$ in cm³; g dm⁻³ = mol dm⁻³ × $M$; dilution keeps $n$ constant ($c_1V_1 = c_2V_2$).
- Mean titre: average concordant titres only (within 0.10 cm³), recorded to 0.05 cm³.
- Moles of the titrant → mole ratio → moles in the aliquot → concentration.
- Diluted samples: multiply by the dilution factor; back titrations: reacted = total − excess.
- Titrations can give $M_\mathrm{r}$, basicity, water of crystallisation and reacting ratios.
:::
