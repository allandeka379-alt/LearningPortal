---
{
  "key": "electrochem.redox-titrations",
  "title": "Redox titrations and transition-element redox chemistry",
  "summary": "Use E⦵ values to predict redox reactions of transition-element ions, see how ligands change E⦵, and carry out manganate(VII), dichromate(VI) and iodine-thiosulfate titration calculations, including the percentage of iron in a sample, copper in an alloy and the formula of a salt.",
  "concepts": ["achem.electrochem.redox-titrations"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Transition elements have variable oxidation states, which makes their compounds excellent oxidising and reducing agents. Chemists use these reactions to analyse samples: the iron content of an iron supplement, the copper content of brass fittings, or the purity of a batch of a salt. In a Zimbabwean assay or water laboratory, a redox titration is still one of the cheapest and most reliable analytical methods. This lesson brings together electrode potentials, half-equations and titration technique.

You need half-equations, E⦵cell calculations and the titration technique in the quantitative-practical lesson.

## Key definitions

:::definition{term="Redox titration"}
A titration in which the reaction between the two solutions is a redox reaction; the end point is shown by a colour change of one of the reagents or of an added indicator.
:::

:::definition{term="Self-indicating titration"}
A titration in which one reagent changes colour at the end point, so no indicator is added. Manganate(VII) titrations are self-indicating: the first permanent pale pink colour shows a slight excess of purple $\ce{MnO4-}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the titration calculations (ZIMSEC Form 6; Cambridge A Level, Paper 4 and Paper 3 practical work). The effect of a change of ligand on E⦵ is ZIMSEC detail.
:::

## Predicting transition-element redox reactions

The usual E⦵ rule applies: the reaction is feasible if E⦵(species reduced) − E⦵(species oxidised) is positive.

| Half-equation | E⦵ / V |
|---|---|
| $\ce{MnO4- + 8H+ + 5e- <=> Mn^2+ + 4H2O}$ | +1.52 |
| $\ce{Cr2O7^2- + 14H+ + 6e- <=> 2Cr^3+ + 7H2O}$ | +1.33 |
| $\ce{Fe^3+ + e- <=> Fe^2+}$ | +0.77 |
| $\ce{I2 + 2e- <=> 2I-}$ | +0.54 |
| $\ce{[Fe(CN)6]^3- + e- <=> [Fe(CN)6]^4-}$ | +0.36 |

- Acidified manganate(VII) and dichromate(VI) both oxidise $\ce{Fe^2+}$: $E^\ominus_\mathrm{cell}$ is $1.52 - 0.77 = +0.75$ V and $1.33 - 0.77 = +0.56$ V.
- $\ce{Fe^3+}$ oxidises $\ce{I-}$ to iodine ($+0.23$ V).

### How ligands change E⦵

Changing the ligands around a transition-metal ion changes the relative stability of its two oxidation states and so changes E⦵. With water ligands, $\ce{Fe^3+/Fe^2+}$ is +0.77 V; with cyanide ligands, $\ce{[Fe(CN)6]^3-/[Fe(CN)6]^4-}$ is only +0.36 V, because cyanide stabilises iron(III) relative to iron(II). As a result, hexacyanoferrate(III) does **not** oxidise iodide ($0.36 - 0.54 = -0.18$ V), although aqueous iron(III) does. In the same way, ammonia ligands make cobalt(II) far easier to oxidise to cobalt(III) than in water.

## Titrations with manganate(VII)

Potassium manganate(VII) is always acidified with dilute **sulfuric acid**. Hydrochloric acid cannot be used (manganate(VII) oxidises chloride to chlorine) and nitric acid cannot be used (it is itself an oxidising agent).

| Reducing agent titrated | Half-equation | Mole ratio $\ce{MnO4-}$ : reducing agent |
|---|---|---|
| iron(II) | $\ce{Fe^2+ -> Fe^3+ + e-}$ | 1 : 5 |
| ethanedioate (oxalate) | $\ce{C2O4^2- -> 2CO2 + 2e-}$ | 2 : 5 |
| hydrogen peroxide | $\ce{H2O2 -> O2 + 2H+ + 2e-}$ | 2 : 5 |

The ethanedioate reaction is slow at room temperature, so the flask is warmed to about 60 °C before titrating; the $\ce{Mn^2+}$ formed then catalyses the reaction (autocatalysis).

:::worked-solution[Example 1: percentage of iron in iron wire]
1.40 g of iron wire was dissolved in excess dilute sulfuric acid (forming $\ce{Fe^2+}$) and made up to 250 cm³. 25.0 cm³ portions needed a mean titre of 24.60 cm³ of 0.0200 mol dm⁻³ $\ce{KMnO4}$. (Ar Fe = 55.8)

1. $n(\ce{MnO4-}) = 0.02460 \times 0.0200 = 4.92 \times 10^{-4}$ mol.
2. $n(\ce{Fe^2+})$ in 25.0 cm³ $= 5 \times 4.92 \times 10^{-4} = 2.46 \times 10^{-3}$ mol.
3. In 250 cm³: $2.46 \times 10^{-2}$ mol; mass of Fe $= 2.46 \times 10^{-2} \times 55.8 = 1.373$ g.
4. Percentage of iron $= 1.373 \div 1.40 \times 100 = 98.0\%$.
:::

:::worked-solution[Example 2: the formula of hydrated ethanedioic acid]
1.26 g of $\ce{H2C2O4.xH2O}$ was dissolved and made up to 250 cm³. A 25.0 cm³ portion, warmed, needed 20.00 cm³ of 0.0200 mol dm⁻³ $\ce{KMnO4}$.

1. $n(\ce{MnO4-}) = 0.02000 \times 0.0200 = 4.00 \times 10^{-4}$ mol.
2. $n(\ce{C2O4^2-}) = \frac{5}{2} \times 4.00 \times 10^{-4} = 1.00 \times 10^{-3}$ mol in 25.0 cm³, so 0.0100 mol in 250 cm³.
3. $M_\mathrm{r} = 1.26 \div 0.0100 = 126$.
4. $M_\mathrm{r}(\ce{H2C2O4}) = 90.0$, so $18.0x = 126 - 90.0 = 36.0$ and $x = 2$: $\ce{H2C2O4.2H2O}$.
:::

## Titrations with dichromate(VI)

Acidified potassium dichromate(VI) oxidises $\ce{Fe^2+}$ with a mole ratio $\ce{Cr2O7^2-}$ : $\ce{Fe^2+}$ = 1 : 6:

$$
\ce{Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}
$$

The colour change, orange to green, is hard to see, so a redox indicator such as sodium diphenylaminesulfonate is added (it turns violet-blue at the end point). Unlike manganate(VII), dichromate(VI) can be used in the presence of chloride ions, and it can be weighed out as a primary standard.

## Iodine-thiosulfate titrations

Many oxidising agents are analysed indirectly: they oxidise excess iodide to iodine, and the iodine is titrated with sodium thiosulfate.

$$
\ce{2Cu^2+ + 4I- -> 2CuI + I2} \qquad \ce{I2 + 2S2O3^2- -> 2I- + S4O6^2-}
$$

So $\ce{2Cu^2+ -> I2 -> 2S2O3^2-}$: the ratio $\ce{Cu^2+}$ : $\ce{S2O3^2-}$ is 1 : 1. The solution turns from brown (iodine) to pale yellow; then starch is added, giving a blue-black colour, and the titration continues until the blue-black colour disappears, leaving a white precipitate of copper(I) iodide. Starch is added near the end because a large amount of iodine binds to it too strongly.

:::worked-solution[Example 3: percentage of copper in brass]
1.10 g of brass was dissolved in nitric acid (in a fume cupboard), neutralised and made up to 250 cm³. 25.0 cm³ portions with excess KI needed 21.20 cm³ of 0.0500 mol dm⁻³ $\ce{Na2S2O3}$. (Ar Cu = 63.5)

1. $n(\ce{S2O3^2-}) = 0.02120 \times 0.0500 = 1.06 \times 10^{-3}$ mol $= n(\ce{Cu^2+})$ in 25.0 cm³.
2. In 250 cm³: $1.06 \times 10^{-2}$ mol; mass of Cu $= 1.06 \times 10^{-2} \times 63.5 = 0.673$ g.
3. Percentage of copper $= 0.673 \div 1.10 \times 100 = 61.2\%$. The zinc in brass does not react with iodide.
:::

## Common mistakes

:::mistake{title="Using the wrong mole ratio"}
Write the balanced equation (or combine the half-equations) every time: 1 : 5 for $\ce{MnO4-}$ with $\ce{Fe^2+}$, but 2 : 5 with ethanedioate, and 1 : 6 for dichromate with $\ce{Fe^2+}$.
:::

:::mistake{title="Forgetting the scaling factor"}
If 25.0 cm³ was taken from 250 cm³, multiply the amount by 10 to get the amount in the whole sample.
:::

:::mistake{title="Acidifying manganate(VII) with hydrochloric acid"}
Chloride is oxidised to chlorine, so more manganate(VII) is used and the titre is too large.
:::

:::mistake{title="Adding starch at the start"}
Add starch only when the iodine colour has faded to pale yellow.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 2 and 3 (calculations, E⦵ predictions, ligand effects) and Paper 4 (a manganate(VII) or thiosulfate titration). Cambridge Paper 4 calculations and Paper 3 titrations.
:::

:::exam-tip{title="Command words"}
*Calculate*: moles of titrant → mole ratio → moles in the portion → scale up → mass or percentage. *Explain* the choice of acid or indicator. *Predict* with E⦵ values: show E⦵cell and its sign. *Deduce* a formula: find Mr, then the number of water molecules or the oxidation state.
:::

## Summary

:::summary
- Feasible if E⦵(reduced) − E⦵(oxidised) > 0; ligands change E⦵ (cyanide lowers Fe³⁺/Fe²⁺ to +0.36 V).
- MnO₄⁻ (acidified with H₂SO₄, self-indicating): 1 : 5 with Fe²⁺, 2 : 5 with C₂O₄²⁻ (warm) and H₂O₂.
- Cr₂O₇²⁻: 1 : 6 with Fe²⁺; orange to green, redox indicator needed.
- Cu²⁺ + excess I⁻, then I₂ with S₂O₃²⁻ (starch near the end): Cu²⁺ : S₂O₃²⁻ = 1 : 1.
- Scale from the titrated portion to the whole sample before finding the percentage.
:::
