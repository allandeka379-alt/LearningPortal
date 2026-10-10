---
{
  "key": "acids.solubility-product",
  "title": "Solubility product and the common ion effect",
  "summary": "The solubility product Ksp of a sparingly soluble salt, writing Ksp expressions and units, converting between solubility and Ksp for AB, AB₂ and A₂B salts, predicting precipitation from the ionic product, and calculating the common ion effect.",
  "concepts": ["achem.acids.solubility-product"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

"Insoluble" is never quite true. When silver chloride sits in water, a tiny amount dissolves and an equilibrium is set up between the solid and its ions. That tiny amount matters: it decides whether a precipitate forms in qualitative analysis, how much lead or barium could reach drinking water, and how kidney stones (calcium salts) and limescale form. Water treatment works, such as those supplying Harare and Bulawayo, deal with exactly these equilibria when they remove hardness or heavy metals.

The **solubility product**, Ksp, puts a number on the solubility of such salts. In this lesson you will write Ksp expressions, convert between solubility and Ksp, predict whether a precipitate forms, and explain why a salt is less soluble in a solution that already contains one of its ions. You need to be confident with equilibrium constants and with mol dm⁻³ and g dm⁻³ conversions.

## Key definitions

:::definition{term="Solubility"}
The amount (or mass) of solute that dissolves in a stated volume of solvent to give a saturated solution at a given temperature, for example in mol dm⁻³ or g dm⁻³.
:::

:::definition{term="Solubility product, Ksp"}
For a sparingly soluble salt $\ce{A_xB_y}$ in equilibrium with its saturated solution, $\ce{A_xB_y(s) <=> xA^{y+}(aq) + yB^{x-}(aq)}$, $K_\text{sp} = [\ce{A^{y+}}]^x[\ce{B^{x-}}]^y$, the product of the ion concentrations in the saturated solution, each raised to the power of its coefficient, at a given temperature.
:::

:::definition{term="Common ion effect"}
The reduction in the solubility of a sparingly soluble salt when it is dissolved in a solution that already contains one of its ions.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need everything here: Ksp expressions and units, Ksp from solubility and the reverse, predicting precipitation, and the common ion effect explained and calculated (ZIMSEC Form 6; Cambridge A Level, Paper 4).
:::

## Writing Ksp expressions

The solid does not appear in the expression (its "concentration" is constant). Units come from the powers.

| Salt | Equilibrium | Ksp expression | Units |
|---|---|---|---|
| $\ce{AgCl}$ | $\ce{AgCl(s) <=> Ag+(aq) + Cl-(aq)}$ | $[\ce{Ag+}][\ce{Cl-}]$ | mol² dm⁻⁶ |
| $\ce{PbI2}$ | $\ce{PbI2(s) <=> Pb^2+(aq) + 2I-(aq)}$ | $[\ce{Pb^2+}][\ce{I-}]^2$ | mol³ dm⁻⁹ |
| $\ce{Ag2CrO4}$ | $\ce{Ag2CrO4(s) <=> 2Ag+(aq) + CrO4^2-(aq)}$ | $[\ce{Ag+}]^2[\ce{CrO4^2-}]$ | mol³ dm⁻⁹ |
| $\ce{Ca3(PO4)2}$ | $\ce{Ca3(PO4)2(s) <=> 3Ca^2+(aq) + 2PO4^3-(aq)}$ | $[\ce{Ca^2+}]^3[\ce{PO4^3-}]^2$ | mol⁵ dm⁻¹⁵ |

Ksp is used only for **sparingly soluble** salts. For very soluble salts such as sodium chloride the ion concentrations are too high for the simple expression to hold.

## From solubility to Ksp

If the solubility is $s$ mol dm⁻³, each formula unit that dissolves gives its ions in the ratio of the formula.

- AB: $[\ce{A+}] = [\ce{B-}] = s$, so $K_\text{sp} = s^2$.
- AB₂: $[\ce{A^2+}] = s$, $[\ce{B-}] = 2s$, so $K_\text{sp} = s(2s)^2 = 4s^3$.
- A₂B: $[\ce{A+}] = 2s$, $[\ce{B^2-}] = s$, so $K_\text{sp} = (2s)^2 s = 4s^3$.

:::worked-solution[Example 1: Ksp of silver chloride]
A saturated solution of silver chloride contains 1.92 × 10⁻³ g of AgCl per dm³ at 298 K. Calculate Ksp. ($A_\text{r}$: Ag 107.9, Cl 35.5)

1. $M_\text{r}(\ce{AgCl}) = 143.4$; solubility $s = \dfrac{1.92 \times 10^{-3}}{143.4} = 1.34 \times 10^{-5}$ mol dm⁻³.
2. $[\ce{Ag+}] = [\ce{Cl-}] = 1.34 \times 10^{-5}$ mol dm⁻³.
3. $K_\text{sp} = (1.34 \times 10^{-5})^2 = 1.79 \times 10^{-10}$ mol² dm⁻⁶.
:::

:::worked-solution[Example 2: Ksp of lead(II) iodide]
A student found that the solubility of lead(II) iodide is 1.52 × 10⁻³ mol dm⁻³. Calculate Ksp.

1. $\ce{PbI2(s) <=> Pb^2+(aq) + 2I-(aq)}$: $[\ce{Pb^2+}] = 1.52 \times 10^{-3}$; $[\ce{I-}] = 2 \times 1.52 \times 10^{-3} = 3.04 \times 10^{-3}$ mol dm⁻³.
2. $K_\text{sp} = (1.52 \times 10^{-3}) \times (3.04 \times 10^{-3})^2 = 1.40 \times 10^{-8}$ mol³ dm⁻⁹.
3. Forgetting to double $[\ce{I-}]$, or doubling it but not squaring it, are the two classic errors.
:::

## From Ksp to solubility

Reverse the algebra: for AB, $s = \sqrt{K_\text{sp}}$; for AB₂ or A₂B, $s = \sqrt[3]{K_\text{sp}/4}$. For silver chromate(VI), Ksp = 1.1 × 10⁻¹² mol³ dm⁻⁹ (data): $s = \sqrt[3]{\dfrac{1.1 \times 10^{-12}}{4}} = 6.50 \times 10^{-5}$ mol dm⁻³, and $[\ce{Ag+}] = 1.30 \times 10^{-4}$ mol dm⁻³.

You cannot compare the solubilities of salts with **different formula types** just by comparing their Ksp values, because the units and the algebra differ: silver chromate(VI) has a much smaller Ksp than silver chloride but a higher molar solubility.

## Will a precipitate form?

Calculate the **ionic product** using the concentrations present immediately after mixing (remember that mixing equal volumes halves each concentration), in the same form as Ksp:

- ionic product > Ksp: the solution is supersaturated, so a precipitate forms until the product falls to Ksp;
- ionic product ≤ Ksp: no precipitate.

For example, mixing equal volumes of 2.0 × 10⁻⁴ mol dm⁻³ silver nitrate and 2.0 × 10⁻⁴ mol dm⁻³ sodium chloride gives $[\ce{Ag+}] = [\ce{Cl-}] = 1.0 \times 10^{-4}$ mol dm⁻³. The ionic product, 1.0 × 10⁻⁸ mol² dm⁻⁶, is greater than Ksp(AgCl) = 1.8 × 10⁻¹⁰ mol² dm⁻⁶ (data), so silver chloride precipitates.

## The common ion effect

Silver chloride is much less soluble in sodium chloride solution than in pure water. Le Chatelier explains why: the extra $\ce{Cl-}$ ions move $\ce{AgCl(s) <=> Ag+(aq) + Cl-(aq)}$ to the left, so less solid dissolves. Ksp itself is unchanged; the ion concentrations simply adjust.

To calculate it, assume the common ion's concentration is that of the added salt (the salt dissolving adds a negligible amount). In 0.100 mol dm⁻³ sodium chloride:

$$
[\ce{Ag+}] = \frac{K_\text{sp}}{[\ce{Cl-}]} = \frac{1.8 \times 10^{-10}}{0.100} = 1.8 \times 10^{-9}\ \text{mol dm}^{-3}
$$

The solubility has fallen from 1.34 × 10⁻⁵ mol dm⁻³ in pure water by a factor of about 7000. The same effect is used to precipitate ions as completely as possible in gravimetric analysis, and to remove heavy-metal ions from waste water.

## Common mistakes

:::mistake{title="Including the solid"}
Ksp contains only the aqueous ions, never the solid salt.
:::

:::mistake{title="Not doubling or not squaring"}
For $\ce{PbI2}$, $[\ce{I-}] = 2s$ and that whole term is squared: $K_\text{sp} = s(2s)^2 = 4s^3$.
:::

:::mistake{title="Forgetting the dilution on mixing"}
When two solutions are mixed, each concentration is reduced by the dilution before the ionic product is calculated.
:::

:::mistake{title="Comparing Ksp of different formula types"}
Compare solubilities in mol dm⁻³, not Ksp values, when the salts have different formulae (AB versus AB₂).
:::

:::mistake{title="Wrong units"}
The units of Ksp depend on the number of ions: mol² dm⁻⁶ for AB, mol³ dm⁻⁹ for AB₂ and A₂B.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A); Cambridge Paper 4. Expect a Ksp expression with units, a two-way calculation (solubility ↔ Ksp), a precipitation prediction and a common-ion calculation with an explanation.
:::

:::exam-tip{title="Command words"}
*Write an expression*: ions only, with powers, plus units. *Calculate*: convert g dm⁻³ to mol dm⁻³ first, show the ion concentrations, give the answer to 3 s.f. in standard form. *Predict* whether a precipitate forms: compare the ionic product with Ksp after dilution. *Explain* the common ion effect: Le Chatelier, position moves left, Ksp unchanged.
:::

## Summary

:::summary
- Ksp is the product of ion concentrations in a saturated solution of a sparingly soluble salt, each to the power of its coefficient.
- AB: Ksp = s²; AB₂ or A₂B: Ksp = 4s³; units depend on the number of ions.
- A precipitate forms when the ionic product (after mixing) exceeds Ksp.
- A common ion reduces solubility (Le Chatelier) without changing Ksp.
- Common-ion calculation: solubility = Ksp ÷ [common ion] (for AB), assuming the common ion comes from the added salt.
:::
