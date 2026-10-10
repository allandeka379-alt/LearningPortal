---
{
  "key": "acids.ph-kw",
  "title": "pH, pOH and the ionic product of water",
  "summary": "The pH scale as −log[H⁺], the ionic product of water Kw and pKw, pOH, and calculating the pH of strong acids, strong alkalis and mixtures after neutralisation, including the effect of temperature on Kw and on neutral pH.",
  "concepts": ["achem.acids.ph-kw"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Hydrogen ion concentrations in everyday solutions range from about 1 mol dm⁻³ in battery acid to around 10⁻¹⁴ mol dm⁻³ in strong caustic soda: fourteen powers of ten. Water treatment works in Harare and Bulawayo, swimming pools and laboratories need a convenient way to talk about such a range, and the **pH scale** provides it by using logarithms.

In this lesson you will learn to convert between $[\ce{H+}]$ and pH, use the ionic product of water to handle alkalis, and calculate the pH after an acid and an alkali are mixed. You should know what strong acids and bases are (fully dissociated) and be able to calculate amounts from volumes and concentrations. Your calculator's **log** and **10ˣ** keys will be used constantly.

## Key definitions

:::definition{term="pH"}
$\text{pH} = -\log_{10}[\ce{H+(aq)}]$, where $[\ce{H+(aq)}]$ is in mol dm⁻³. Conversely, $[\ce{H+}] = 10^{-\text{pH}}$.
:::

:::definition{term="Ionic product of water, Kw"}
$K_\text{w} = [\ce{H+(aq)}][\ce{OH-(aq)}]$. At 298 K, $K_\text{w} = 1.00 \times 10^{-14}\ \text{mol}^2\,\text{dm}^{-6}$.
:::

:::definition{term="pOH and pKw"}
$\text{pOH} = -\log_{10}[\ce{OH-(aq)}]$ and $\text{p}K_\text{w} = -\log_{10} K_\text{w}$, so at 298 K, pH + pOH = pKw = 14.00.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need pH, Kw and pH calculations for strong acids, strong alkalis and mixtures. ZIMSEC also uses **pOH** and pKw (Form 5); Cambridge examines this topic at A Level (Paper 4) and works with Kw directly instead of pOH. Both methods give the same pH.
:::

## Where Kw comes from

Water ionises very slightly:

$$
\ce{H2O(l) <=> H+(aq) + OH-(aq)} \qquad \Delta H = +57\ \text{kJ mol}^{-1}
$$

Because so little water ionises, $[\ce{H2O}]$ is effectively constant and is absorbed into the constant, giving $K_\text{w} = [\ce{H+}][\ce{OH-}]$. In pure water at 298 K, $[\ce{H+}] = [\ce{OH-}] = 1.00 \times 10^{-7}$ mol dm⁻³, so the pH is 7.00.

Kw holds in **every** aqueous solution. If acid is added, $[\ce{H+}]$ rises and $[\ce{OH-}]$ falls so that their product stays at $1.00 \times 10^{-14}$ (at 298 K).

## pH of strong acids

Assume full dissociation, so $[\ce{H+}]$ comes straight from the acid concentration.

| Acid | Concentration / mol dm⁻³ | $[\ce{H+}]$ / mol dm⁻³ | pH |
|---|---|---|---|
| nitric acid (monobasic) | 0.0250 | 0.0250 | 1.60 |
| sulfuric acid (dibasic, both protons assumed donated) | 0.0150 | 0.0300 | 1.52 |

Each tenfold dilution of a strong acid raises the pH by 1. Give pH values to **two decimal places**.

## pH of strong alkalis

1. Find $[\ce{OH-}]$ from the alkali concentration (× 2 for $\ce{Ba(OH)2}$).
2. Either use Kw: $[\ce{H+}] = \dfrac{K_\text{w}}{[\ce{OH-}]}$, then pH; or (ZIMSEC) find pOH and use pH = 14.00 − pOH.

:::worked-solution[Example 1: pH of sodium hydroxide]
Calculate the pH of 0.0400 mol dm⁻³ sodium hydroxide at 298 K.

1. NaOH is fully dissociated: $[\ce{OH-}] = 0.0400$ mol dm⁻³.
2. Route A: $[\ce{H+}] = \dfrac{1.00 \times 10^{-14}}{0.0400} = 2.50 \times 10^{-13}$ mol dm⁻³; pH = $-\log(2.50 \times 10^{-13}) = 12.60$.
3. Route B: pOH = $-\log(0.0400) = 1.40$; pH = 14.00 − 1.40 = 12.60.
:::

## pH after mixing an acid and an alkali

1. Calculate the amounts (mol) of $\ce{H+}$ and $\ce{OH-}$.
2. Subtract to find which is in excess and by how much.
3. Divide the excess by the **total** volume in dm³.
4. Calculate pH (via Kw or pOH if the alkali is in excess).

:::worked-solution[Example 2: excess alkali]
20.0 cm³ of 0.100 mol dm⁻³ hydrochloric acid is mixed with 25.0 cm³ of 0.100 mol dm⁻³ sodium hydroxide. Calculate the pH of the mixture at 298 K.

1. $n(\ce{H+}) = 0.0200 \times 0.100 = 2.00 \times 10^{-3}$ mol; $n(\ce{OH-}) = 0.0250 \times 0.100 = 2.50 \times 10^{-3}$ mol.
2. Excess $\ce{OH-}$ = $5.0 \times 10^{-4}$ mol.
3. Total volume = 45.0 cm³ = 0.0450 dm³, so $[\ce{OH-}] = \dfrac{5.0 \times 10^{-4}}{0.0450} = 0.0111$ mol dm⁻³.
4. pOH = 1.95, so pH = 14.00 − 1.95 = 12.05 (or $[\ce{H+}] = K_\text{w}/0.0111$, pH = 12.05).
:::

Using only the volume of the alkali in step 3 is the most common error; the ions are spread through the whole mixture.

## Kw and temperature

Because the ionisation of water is **endothermic**, raising the temperature moves the position of equilibrium to the right and Kw increases. For example (data), Kw at 323 K is $5.48 \times 10^{-14}$ mol² dm⁻⁶. In pure water at that temperature:

$$
[\ce{H+}] = \sqrt{5.48 \times 10^{-14}} = 2.34 \times 10^{-7}\ \text{mol dm}^{-3}, \qquad \text{pH} = 6.63
$$

The water is still **neutral**, because $[\ce{H+}] = [\ce{OH-}]$. "Neutral" means equal concentrations of $\ce{H+}$ and $\ce{OH-}$; pH 7 is neutral only at 298 K. Likewise pH + pOH = 14.00 is true only at 298 K.

## Converting pH back to concentration

$[\ce{H+}] = 10^{-\text{pH}}$. For a solution of pH 3.40, $[\ce{H+}] = 10^{-3.40} = 3.98 \times 10^{-4}$ mol dm⁻³. A change of one pH unit is a tenfold change in $[\ce{H+}]$; a change of 2 units is a hundredfold change.

## Common mistakes

:::mistake{title="Forgetting that sulfuric acid is dibasic"}
For $\ce{H2SO4}$, assume $[\ce{H+}]$ = 2 × the acid concentration unless the question says otherwise.
:::

:::mistake{title="Taking −log of [OH⁻] and calling it pH"}
$-\log[\ce{OH-}]$ is pOH. Convert it: pH = 14.00 − pOH at 298 K, or use Kw first.
:::

:::mistake{title="Using one volume after mixing"}
After mixing, divide the excess by the total volume of the mixture.
:::

:::mistake{title="Thinking hot water is acidic"}
At 323 K pure water has pH below 7 but is still neutral, because [H⁺] = [OH⁻].
:::

:::mistake{title="Wrong number of decimal places"}
Quote pH to 2 decimal places; the number of decimal places in pH matches the significant figures in [H⁺].
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A) and Paper 4 practical work with pH meters; Cambridge Paper 4 (structured calculations) and Paper 5 (data analysis). Expect a sequence: pH of the acid, pH of the alkali, then pH after partial neutralisation.
:::

:::exam-tip{title="Command words"}
*Define* pH or Kw: give the expression with square brackets meaning concentration in mol dm⁻³. *Calculate*: show the amounts, the excess and the total volume. *Explain* why pure water at a higher temperature has a pH below 7 but is neutral: endothermic ionisation, larger Kw, but [H⁺] still equals [OH⁻].
:::

## Summary

:::summary
- pH = −log[H⁺]; [H⁺] = 10⁻ᵖᴴ; one pH unit is a factor of 10 in [H⁺].
- Kw = [H⁺][OH⁻] = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K; pH + pOH = 14.00 at 298 K.
- Strong acids and alkalis are fully dissociated; remember the factor of 2 for H₂SO₄ and Ba(OH)₂.
- After mixing, find the excess amount and divide by the total volume.
- Kw rises with temperature (endothermic ionisation); neutral means [H⁺] = [OH⁻], not necessarily pH 7.
:::
