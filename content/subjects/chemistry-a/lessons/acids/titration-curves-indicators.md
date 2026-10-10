---
{
  "key": "acids.titration-curves-indicators",
  "title": "pH titration curves and indicators",
  "summary": "The shapes of pH curves for strong and weak acids titrated with strong and weak bases, reading the equivalence point, buffer region and half-equivalence point, and choosing an indicator whose colour-change range lies on the vertical section.",
  "concepts": ["achem.acids.titration-curves-indicators"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A titration only works if you can see the end-point. Methyl orange is perfect for titrating sodium carbonate with hydrochloric acid, but useless for vinegar with sodium hydroxide. Why? The answer is in the **pH titration curve**: a graph of pH against the volume of solution added. Its shape depends on whether the acid and the base are strong or weak, and an indicator works only if it changes colour where the curve is steepest.

This lesson shows the four standard curves, how to read them and how to choose an indicator. You should know the difference between strong and weak acids, how to calculate pH, and how to do titration calculations. Plotting your own curve with a pH meter is a ZIMSEC suggested activity, and Cambridge Paper 3 may ask you to select an indicator.

## Key definitions

:::definition{term="Equivalence point"}
The point in a titration at which the amount of added base exactly reacts with the amount of acid present, according to the equation (stoichiometric amounts).
:::

:::definition{term="End-point"}
The point at which the indicator changes colour. For a well-chosen indicator it coincides with the equivalence point to within a drop.
:::

:::definition{term="Acid-base indicator"}
A weak acid, HIn, whose undissociated form and conjugate base, $\ce{In-}$, have different colours: $\ce{HIn(aq) <=> H+(aq) + In-(aq)}$. Its colour changes over a range of about two pH units.
:::

:::definition{term="Half-equivalence point"}
In a weak acid–strong base titration, the point where half of the acid has been neutralised, so [HA] = [A⁻] and pH = pKa.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: sketching and interpreting the four curves and choosing an indicator from given data. ZIMSEC also uses the half-equivalence point (pH = pKa) and plotting curves from experimental data. Cambridge chooses indicators from their pH ranges at AS Level and does not use indicator pKa values.
:::

## The four curves

The table shows pH values calculated for 25.0 cm³ of 0.100 mol dm⁻³ acid in the flask with 0.100 mol dm⁻³ base added from the burette (data: Ka of ethanoic acid 1.74 × 10⁻⁵, Kb of ammonia 1.8 × 10⁻⁵ mol dm⁻³). Equivalence is at 25.0 cm³ in every case.

| Base added / cm³ | HCl with NaOH | CH₃COOH with NaOH | HCl with NH₃ |
|---|---|---|---|
| 0.0 | 1.00 | 2.88 | 1.00 |
| 5.0 | 1.18 | 4.16 | 1.18 |
| 12.5 | 1.48 | 4.76 | 1.48 |
| 20.0 | 1.95 | 5.36 | 1.95 |
| 24.0 | 2.69 | 6.14 | 2.69 |
| 24.9 | 3.70 | 7.16 | 3.70 |
| 25.0 | 7.00 | 8.73 | 5.28 |
| 25.1 | 10.30 | 10.30 | 6.86 |
| 26.0 | 11.29 | 11.29 | 7.86 |
| 30.0 | 11.96 | 11.96 | 8.56 |
| 40.0 | 12.36 | 12.36 | 9.03 |

**Strong acid–strong base.** The pH starts at 1 and rises slowly, then jumps from about 3 to about 11 within a fraction of a cm³ around equivalence. The equivalence point is at **pH 7**: sodium chloride solution is neutral. After equivalence the curve levels off towards the pH of the alkali.

**Weak acid–strong base.** The starting pH is higher (about 3) because the acid is weak. After a small initial rise the curve flattens into a **buffer region**, where both ethanoic acid and ethanoate ions are present. The vertical section is shorter (about 7 to 11) and the equivalence point is **above 7** (8.73 here) because the ethanoate ion is a weak base: $\ce{CH3COO- + H2O <=> CH3COOH + OH-}$. At the half-equivalence point (12.5 cm³) the pH equals the pKa, 4.76.

**Strong acid–weak base.** The early part matches the strong-strong curve, but the vertical section is from about 3 to 7 and the equivalence point is **below 7** (5.28 here) because the ammonium ion is a weak acid. After equivalence the pH rises slowly in an ammonia–ammonium buffer and never gets as high as with sodium hydroxide.

**Weak acid–weak base.** There is no vertical section at all: the pH changes gradually through the equivalence point. No indicator gives a sharp end-point, so such titrations are followed with a pH meter or by conductivity instead.

| Titration | Starting pH (0.1 mol dm⁻³) | Vertical section | pH at equivalence |
|---|---|---|---|
| strong acid–strong base | about 1 | about 3–11 | 7 |
| weak acid–strong base | about 3 | about 7–11 | above 7 |
| strong acid–weak base | about 1 | about 3–7 | below 7 |
| weak acid–weak base | about 3 | none | near 7 (depends on Ka and Kb) |

## Choosing an indicator

An indicator is suitable if its **whole colour-change range lies within the vertical section** of the curve. Then a single drop at the equivalence point takes the pH right through the range and the colour changes sharply.

| Indicator (data) | pH range | Colour in acid | Colour in alkali |
|---|---|---|---|
| methyl orange | 2.9–4.6 | red | yellow |
| bromophenol blue | 3.0–4.5 | yellow | blue |
| phenolphthalein | 8.3–10.0 | colourless | pink |
| thymol blue (second change) | 8.0–9.6 | yellow | blue |
| thymolphthalein | 9.3–10.5 | colourless | blue |

| Titration | Suitable indicators | Unsuitable |
|---|---|---|
| strong acid–strong base | any of them | — |
| weak acid–strong base | phenolphthalein, thymol blue, thymolphthalein | methyl orange, bromophenol blue (change in the buffer region, too early) |
| strong acid–weak base | methyl orange, bromophenol blue | phenolphthalein (changes after equivalence, gradually) |
| weak acid–weak base | none | all |

:::example{title="Example 1: choosing an indicator"}
Ethanoic acid in vinegar is titrated with sodium hydroxide. Which of methyl orange and phenolphthalein should be used?

1. Weak acid–strong base: the vertical section runs from about pH 7 to 11, and the equivalence point is above 7.
2. Phenolphthalein's range (8.3–10.0) lies wholly inside the vertical section: one drop at equivalence turns it from colourless to pink.
3. Methyl orange's range (2.9–4.6) lies in the buffer region, where the pH rises slowly. It would change gradually over many cm³, long before equivalence. Use phenolphthalein.
:::

:::worked-solution[Example 2: data from a weak acid curve (ZIMSEC detail)]
20.0 cm³ of a weak monobasic acid HA was titrated with 0.150 mol dm⁻³ sodium hydroxide. The equivalence point was at 18.40 cm³ and the pH after 9.20 cm³ was 4.20. Find the concentration of the acid and its Ka.

1. $n(\ce{NaOH}) = \dfrac{18.40}{1000} \times 0.150 = 2.76 \times 10^{-3}$ mol $= n(\ce{HA})$.
2. $[\ce{HA}] = \dfrac{2.76 \times 10^{-3}}{0.0200} = 0.138$ mol dm⁻³.
3. 9.20 cm³ is half of 18.40 cm³: at half-equivalence [HA] = [A⁻], so $K_\text{a} = [\ce{H+}]$ and pH = pKa = 4.20.
4. $K_\text{a} = 10^{-4.20} = 6.31 \times 10^{-5}$ mol dm⁻³.
:::

## How an indicator works

For $\ce{HIn <=> H+ + In-}$, adding acid moves the position left (colour of HIn); adding alkali removes $\ce{H+}$ and moves it right (colour of $\ce{In-}$). The colour changes when [HIn] ≈ [In⁻], which happens at a pH close to the indicator's own pKa, so each indicator changes over its own range.

## Common mistakes

:::mistake{title="Equivalence at pH 7 for every titration"}
Only strong acid–strong base titrations have an equivalence point at pH 7. Weak acid–strong base gives above 7; strong acid–weak base gives below 7.
:::

:::mistake{title="Choosing an indicator that only touches the steep part"}
The whole range must lie on the vertical section, not just part of it.
:::

:::mistake{title="Sketching the wrong starting pH"}
0.1 mol dm⁻³ strong acid starts at pH 1; a weak acid of the same concentration starts at about 3.
:::

:::mistake{title="Confusing end-point and equivalence point"}
The equivalence point is a property of the reaction; the end-point is what the indicator shows.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 and Paper 4 (choosing an indicator, plotting a curve); Cambridge Papers 1 and 2 (AS) and Paper 3 (indicator choice in practical work). Multiple-choice items often show four curves described in words or as tables and ask which matches a titration.
:::

:::exam-tip{title="Command words"}
*Sketch* (described in words here): give the starting pH, the shape of the buffer region if any, the range of the vertical section, the equivalence volume and pH, and the final pH. *Explain* the choice of indicator: compare its range with the vertical section. *Suggest* why no indicator suits a weak-weak titration: no steep section. *Deduce* pKa: read the pH at half the equivalence volume.
:::

## Summary

:::summary
- Strong-strong: vertical section about 3–11, equivalence at pH 7; any common indicator works.
- Weak acid–strong base: buffer region, vertical section about 7–11, equivalence above 7; use phenolphthalein or thymol blue.
- Strong acid–weak base: vertical section about 3–7, equivalence below 7; use methyl orange.
- Weak-weak: no vertical section; no indicator is suitable.
- At half-equivalence in a weak acid titration, pH = pKa.
:::
