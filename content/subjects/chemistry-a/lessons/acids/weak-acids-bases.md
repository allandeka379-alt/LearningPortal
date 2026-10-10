---
{
  "key": "acids.weak-acids-bases",
  "title": "Weak acids and bases: Ka, pKa, Kb and pKb",
  "summary": "The acid dissociation constant Ka and pKa, calculating the pH of a weak acid and Ka from a measured pH, percentage dissociation, comparing acid strengths, and (ZIMSEC) Kb, pKb and Kw = Ka × Kb for a conjugate pair.",
  "concepts": ["achem.acids.weak-acids-bases"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Vinegar, the citric acid in oranges from the Mazowe valley, the lactic acid in sour milk (amasi) and the carbonic acid in fizzy drinks are all **weak acids**: in water only a small fraction of their molecules give up a proton. Their pH therefore cannot be worked out from the concentration alone, as it can for hydrochloric acid. You need one more number, the **acid dissociation constant**, Ka, which measures how far the dissociation goes.

This lesson shows how to write Ka, convert it to pKa, calculate the pH of a weak acid and work backwards from a measured pH to Ka. ZIMSEC candidates also need the parallel ideas for weak bases (Kb and pKb). You should be confident with pH and Kw, with Kc expressions and with the Brønsted-Lowry idea of conjugate pairs.

## Key definitions

:::definition{term="Acid dissociation constant, Ka"}
For a weak acid HA dissociating as $\ce{HA(aq) <=> H+(aq) + A-(aq)}$, $K_\text{a} = \dfrac{[\ce{H+}][\ce{A-}]}{[\ce{HA}]}$ at equilibrium. Units: mol dm⁻³. The larger Ka, the stronger the acid.
:::

:::definition{term="pKa"}
$\text{p}K_\text{a} = -\log_{10} K_\text{a}$, so $K_\text{a} = 10^{-\text{p}K_\text{a}}$. The **smaller** pKa, the stronger the acid.
:::

:::definition{term="Percentage dissociation"}
$\dfrac{[\ce{H+}]\ \text{from the acid}}{\text{initial concentration of acid}} \times 100$: the percentage of acid molecules that have dissociated at equilibrium.
:::

:::definition{term="Base dissociation constant, Kb (ZIMSEC)"}
For a weak base B reacting as $\ce{B(aq) + H2O(l) <=> BH+(aq) + OH-(aq)}$, $K_\text{b} = \dfrac{[\ce{BH+}][\ce{OH-}]}{[\ce{B}]}$; $\text{p}K_\text{b} = -\log_{10} K_\text{b}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Ka, pKa, the pH of a weak acid and Ka from pH: both boards (ZIMSEC Form 5; Cambridge A Level, Paper 4). **Kb, pKb and Kw = Ka × Kb are ZIMSEC only**; Cambridge does not test Kb. Both boards expect you to state the approximation used.
:::

## Writing Ka

For ethanoic acid:

$$
\ce{CH3COOH(aq) <=> CH3COO-(aq) + H+(aq)} \qquad K_\text{a} = \frac{[\ce{CH3COO-}][\ce{H+}]}{[\ce{CH3COOH}]}
$$

Water does not appear: it is the solvent and its concentration is effectively constant. Typical values (data):

| Acid | Ka / mol dm⁻³ | pKa |
|---|---|---|
| chloroethanoic acid | 1.38 × 10⁻³ | 2.86 |
| methanoic acid | 1.78 × 10⁻⁴ | 3.75 |
| benzoic acid | 6.30 × 10⁻⁵ | 4.20 |
| ethanoic acid | 1.74 × 10⁻⁵ | 4.76 |
| phenol | 1.30 × 10⁻¹⁰ | 9.89 |

Strength decreases down the table. Each unit of pKa is a factor of ten in Ka.

## Calculating the pH of a weak acid

Two assumptions are made:

1. **Every $\ce{H+}$ comes from the acid** (water's contribution is negligible), so $[\ce{H+}] = [\ce{A-}]$.
2. **The acid is so slightly dissociated** that its equilibrium concentration equals its initial concentration $c$: $[\ce{HA}] \approx c$.

Then $K_\text{a} = \dfrac{[\ce{H+}]^2}{c}$, so

$$
[\ce{H+}] = \sqrt{K_\text{a}\,c}
$$

:::worked-solution[Example 1: pH of ethanoic acid]
Calculate the pH of 0.0500 mol dm⁻³ ethanoic acid. (data: Ka = 1.74 × 10⁻⁵ mol dm⁻³)

1. Assume $[\ce{H+}] = [\ce{CH3COO-}]$ and $[\ce{CH3COOH}] \approx 0.0500$ mol dm⁻³.
2. $[\ce{H+}] = \sqrt{1.74 \times 10^{-5} \times 0.0500} = 9.33 \times 10^{-4}$ mol dm⁻³.
3. pH = $-\log(9.33 \times 10^{-4}) = 3.03$.
4. Percentage dissociation = $\dfrac{9.33 \times 10^{-4}}{0.0500} \times 100 = 1.87\%$: small, so assumption 2 is reasonable.
:::

Compare: 0.0500 mol dm⁻³ hydrochloric acid has pH 1.30. The weak acid's pH is almost two units higher at the same concentration.

## Calculating Ka from pH

Reverse the steps: $[\ce{H+}] = 10^{-\text{pH}}$, then $K_\text{a} = \dfrac{[\ce{H+}]^2}{c}$.

:::worked-solution[Example 2: Ka of methanoic acid]
A 0.100 mol dm⁻³ solution of methanoic acid, $\ce{HCOOH}$, has a measured pH of 2.38. Calculate Ka and pKa.

1. $[\ce{H+}] = 10^{-2.38} = 4.17 \times 10^{-3}$ mol dm⁻³ $= [\ce{HCOO-}]$.
2. $K_\text{a} = \dfrac{(4.17 \times 10^{-3})^2}{0.100} = 1.74 \times 10^{-4}$ mol dm⁻³ (assuming $[\ce{HCOOH}] \approx 0.100$).
3. pKa = $-\log(1.74 \times 10^{-4}) = 3.76$.
:::

## Dilution and percentage dissociation

Diluting a weak acid **increases** its percentage dissociation (Le Chatelier: fewer particles in solution favours the side with more particles), but $[\ce{H+}]$ still falls, so the pH rises. Diluting a weak acid tenfold raises its pH by only 0.5, because $[\ce{H+}] \propto \sqrt{c}$.

## Weak bases, Kb and pKb (ZIMSEC)

Ammonia is the standard weak base:

$$
\ce{NH3(aq) + H2O(l) <=> NH4+(aq) + OH-(aq)} \qquad K_\text{b} = \frac{[\ce{NH4+}][\ce{OH-}]}{[\ce{NH3}]}
$$

The same two approximations give $[\ce{OH-}] = \sqrt{K_\text{b}\,c}$. For 0.100 mol dm⁻³ ammonia with Kb = 1.8 × 10⁻⁵ mol dm⁻³ (data): $[\ce{OH-}] = 1.34 \times 10^{-3}$ mol dm⁻³, pOH = 2.87 and pH = 14.00 − 2.87 = 11.13.

For a conjugate pair, $K_\text{a} \times K_\text{b} = K_\text{w}$, so pKa + pKb = 14.00 at 298 K. For the ammonium ion, $K_\text{a} = \dfrac{1.00 \times 10^{-14}}{1.8 \times 10^{-5}} = 5.56 \times 10^{-10}$ mol dm⁻³ (pKa 9.26). The weaker the base, the stronger its conjugate acid.

## Common mistakes

:::mistake{title="Treating a weak acid as fully dissociated"}
−log(c) gives the pH of a strong acid. For a weak acid use $\sqrt{K_\text{a} c}$.
:::

:::mistake{title="Forgetting the square root"}
$K_\text{a} c$ is $[\ce{H+}]^2$, not $[\ce{H+}]$.
:::

:::mistake{title="Not stating assumptions"}
Mark schemes often give a mark for stating that $[\ce{HA}]_\text{eq} \approx [\ce{HA}]_\text{initial}$ and $[\ce{H+}] = [\ce{A-}]$.
:::

:::mistake{title="Reading pKa the wrong way"}
A larger pKa means a weaker acid.
:::

:::mistake{title="Using these formulas for strong acids or concentrated mixtures"}
The square-root formula assumes slight dissociation. For a buffer (acid plus its salt) $[\ce{H+}] \neq [\ce{A-}]$; use the buffer method instead.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Section A); Cambridge Paper 4 and Paper 5 (pKa from experimental pH). Expect: write Ka, calculate pH, calculate Ka from pH, compare acids using pKa.
:::

:::exam-tip{title="Command words"}
*Write an expression* for Ka: products over HA, no water. *Calculate* the pH: state the two assumptions, show $[\ce{H+}]$ to 3 s.f. and pH to 2 d.p. *Deduce* which acid is stronger: larger Ka or smaller pKa. *Explain* why diluting a weak acid increases its percentage dissociation: Le Chatelier, more particles on the right.
:::

## Summary

:::summary
- Ka = [H⁺][A⁻]/[HA]; pKa = −log Ka; larger Ka (smaller pKa) means a stronger acid.
- pH of a weak acid: [H⁺] = √(Ka c), assuming [H⁺] = [A⁻] and [HA] ≈ c.
- Ka from pH: Ka = (10⁻ᵖᴴ)²/c.
- Percentage dissociation rises on dilution, but [H⁺] falls.
- ZIMSEC: Kb = [BH⁺][OH⁻]/[B]; Ka × Kb = Kw and pKa + pKb = 14.00 at 298 K.
:::
