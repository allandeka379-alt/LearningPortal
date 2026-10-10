---
{
  "key": "stoich.reacting-masses-yield",
  "title": "Reacting masses, gas volumes, yield and purity",
  "summary": "Using balanced equations to calculate reacting masses and gas volumes (24.0 dm³ mol⁻¹ at room conditions, 22.4 dm³ mol⁻¹ at s.t.p.), finding formulae from gas volume data, limiting and excess reagents, percentage yield, percentage purity and stoichiometric ratios from experimental results.",
  "concepts": ["achem.stoich.reacting-masses-yield"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A balanced equation is a recipe written in moles. Once you can turn masses and gas volumes into moles, you can predict how much product a reaction should give, which reagent will run out first, and how efficient a process really is.

These are the calculations of industry. Lime for treating acidic soils and for water treatment is made by heating limestone; a plant manager needs to know how much quicklime a tonne of limestone can give. Fertiliser producers check the purity of their raw materials, and anyone running a reaction wants to know the percentage yield. You should already be confident with $n = m/M$ and with writing balanced equations.

## Key definitions

:::definition{term="Limiting reagent"}
The reactant that is completely used up first. It decides the maximum amount of product. The other reactants are **in excess**.
:::

:::definition{term="Percentage yield"}
$\dfrac{\text{actual mass (or amount) of product obtained}}{\text{theoretical maximum mass (or amount)}} \times 100$
:::

:::definition{term="Percentage purity"}
$\dfrac{\text{mass of the pure substance in a sample}}{\text{total mass of the sample}} \times 100$
:::

:::definition{term="Molar volume of a gas"}
The volume occupied by one mole of any gas: **24.0 dm³ mol⁻¹ at room conditions** (about 20 °C and 101 kPa) and **22.4 dm³ mol⁻¹ at s.t.p.** (273 K and 101 kPa).
:::

:::keyfact{title="Gas volume relationships"}
$$
n = \frac{V}{V_\mathrm{m}}
$$

For reactions in which all the reactants and products being compared are gases at the same temperature and pressure, **volume ratios equal mole ratios** (Avogadro's law). $1\ \text{dm}^3 = 1000\ \text{cm}^3$.
:::

## The four-step method

Almost every reacting-quantities problem follows the same path.

1. **Moles of the known substance** from its mass ($n = m/M$), gas volume ($n = V/V_\mathrm{m}$) or solution.
2. **Mole ratio** from the balanced equation.
3. **Moles of the unknown** substance.
4. **Convert** to the quantity asked for: mass, volume or number of particles.

:::worked-solution[Example 1: lime from limestone, and the percentage yield]
Calculate the maximum mass of calcium oxide obtained by heating 25.0 g of calcium carbonate. A student obtains 12.6 g; calculate the percentage yield. ($M$: $\ce{CaCO3}$ 100.1, $\ce{CaO}$ 56.1 g mol⁻¹)

$$
\ce{CaCO3(s) -> CaO(s) + CO2(g)}
$$

1. $n(\ce{CaCO3}) = 25.0 \div 100.1 = 0.2498$ mol.
2. Ratio $\ce{CaCO3} : \ce{CaO} = 1 : 1$, so $n(\ce{CaO}) = 0.2498$ mol.
3. Maximum mass $= 0.2498 \times 56.1 = 14.0$ g.
4. Percentage yield $= 12.6 \div 14.01 \times 100 = 89.9\%$.
:::

## Limiting reagent

When masses of two reactants are given, compare what you **have** with what the equation **needs**. Divide the moles of each reactant by its coefficient: the smaller result identifies the limiting reagent. Then calculate the product from the limiting reagent only.

:::worked-solution[Example 2: aluminium and chlorine]
10.0 g of aluminium is heated in 20.0 g of chlorine. Which is limiting, and what mass of aluminium chloride forms? ($A_\mathrm{r}$: Al 27.0, Cl 35.5)

$$
\ce{2Al(s) + 3Cl2(g) -> 2AlCl3(s)}
$$

1. $n(\ce{Al}) = 10.0 \div 27.0 = 0.370$ mol; $n(\ce{Cl2}) = 20.0 \div 71.0 = 0.282$ mol.
2. 0.370 mol of Al would need $0.370 \times \tfrac{3}{2} = 0.556$ mol of $\ce{Cl2}$, but only 0.282 mol is present: **chlorine is limiting**, aluminium is in excess.
3. $n(\ce{AlCl3}) = 0.282 \times \tfrac{2}{3} = 0.188$ mol.
4. $M(\ce{AlCl3}) = 133.5$ g mol⁻¹, so mass $= 0.1878 \times 133.5 = 25.1$ g.
:::

## Gas volumes and formulae from gas data

At the same temperature and pressure, equal volumes of gases contain equal numbers of molecules. This makes gas reactions easy to treat with volumes directly.

To find the formula of a hydrocarbon $\mathrm{C}_x\mathrm{H}_y$ by explosion with excess oxygen:

- The volume of $\ce{CO2}$ is found by absorbing it in aqueous sodium (or potassium) hydroxide: the fall in volume is the $\ce{CO2}$.
- Water condenses to a liquid at room temperature and has negligible volume.
- The general equation is $\mathrm{C}_x\mathrm{H}_y + \left(x + \tfrac{y}{4}\right)\mathrm{O_2} \rightarrow x\,\mathrm{CO_2} + \tfrac{y}{2}\,\mathrm{H_2O}$.

:::worked-solution[Example 3: identifying a hydrocarbon from gas volumes]
20 cm³ of a gaseous hydrocarbon is exploded with 150 cm³ of oxygen (an excess). After cooling to room temperature, 110 cm³ of gas remains. Passing this through aqueous sodium hydroxide reduces the volume to 50 cm³. Find the formula.

1. The 50 cm³ left is unreacted oxygen, so oxygen used $= 150 - 50 = 100$ cm³.
2. $\ce{CO2}$ absorbed by NaOH $= 110 - 50 = 60$ cm³.
3. Ratio hydrocarbon : $\ce{CO2}$ = 20 : 60 = 1 : 3, so $x = 3$.
4. Ratio hydrocarbon : $\ce{O2}$ = 20 : 100 = 1 : 5, so $x + \tfrac{y}{4} = 5$, giving $\tfrac{y}{4} = 2$ and $y = 8$.
5. The hydrocarbon is $\ce{C3H8}$, propane.
:::

## Percentage purity

Natural raw materials are never pure. The purity can be found by reacting a sample and measuring a product whose amount depends only on the wanted substance.

:::worked-solution[Example 4: purity of limestone from the gas evolved]
A 5.00 g sample of impure limestone reacts with excess dilute hydrochloric acid, giving 1.08 dm³ of carbon dioxide at room conditions. The impurities do not produce gas. Find the percentage purity of the calcium carbonate. ($M(\ce{CaCO3}) = 100.1$ g mol⁻¹)

$$
\ce{CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)}
$$

1. $n(\ce{CO2}) = 1.08 \div 24.0 = 0.0450$ mol.
2. Ratio 1 : 1, so $n(\ce{CaCO3}) = 0.0450$ mol.
3. Mass of $\ce{CaCO3} = 0.0450 \times 100.1 = 4.50$ g.
4. Purity $= 4.50 \div 5.00 \times 100 = 90.1\%$ (from 4.5045 g).
:::

## Deducing a stoichiometric ratio from results

Sometimes the equation is the unknown. Measure the amounts that react, convert each to moles and simplify the ratio. For example, if 0.0200 mol of a metal reacts with 0.0400 mol of hydrochloric acid, the ratio metal : HCl is 1 : 2, suggesting a 2+ metal ion: $\ce{M + 2HCl -> MCl2 + H2}$.

## Significant figures

Give the final answer to the same number of significant figures as the least precise data (or one more), usually three. Keep extra figures in intermediate steps and round only at the end, as in Example 2, where 0.1878 mol was carried forward.

## Common mistakes

:::mistake{title="Ignoring the mole ratio"}
In Example 2, using $n(\ce{AlCl3}) = n(\ce{Cl2})$ gives an answer 1.5 times too large. Always read the coefficients.
:::

:::mistake{title="Calculating the product from the reagent in excess"}
Only the limiting reagent decides how much product forms.
:::

:::mistake{title="Using 24.0 dm³ at s.t.p."}
24.0 dm³ mol⁻¹ is for room conditions; 22.4 dm³ mol⁻¹ is for s.t.p. (273 K). Read the conditions in the question.
:::

:::mistake{title="Mixing cm³ and dm³"}
1 dm³ = 1000 cm³. A volume of 240 cm³ is 0.240 dm³, which is 0.0100 mol at room conditions.
:::

## Exam tips

:::exam-tip
Both boards test these calculations throughout: Paper 1 (single steps), Paper 2 and ZIMSEC Paper 3 (multi-step **calculate** questions) and the practical papers. Write each step with its unit; method marks are awarded even when an early slip spoils the final answer.
:::

:::exam-tip
When asked to **suggest** why a percentage yield is below 100%, give specific reasons: the reaction is reversible or incomplete, side reactions form other products, or product is lost during transfer, filtration or purification.
:::

:::exam-tip
In gas volume problems, state clearly what each volume change represents ("contraction on adding NaOH = volume of $\ce{CO2}$").
:::

## Summary

:::summary
- Convert to moles, use the equation's mole ratio, convert back to the quantity required.
- Gas volume: $n = V/V_\mathrm{m}$ with 24.0 dm³ mol⁻¹ (room conditions) or 22.4 dm³ mol⁻¹ (s.t.p.); gas volume ratios equal mole ratios.
- The limiting reagent is used up first and decides the amount of product.
- Percentage yield = actual ÷ theoretical × 100; percentage purity = mass of pure substance ÷ sample mass × 100.
- Experimental mole ratios reveal the equation; round final answers to 3 s.f.
:::
