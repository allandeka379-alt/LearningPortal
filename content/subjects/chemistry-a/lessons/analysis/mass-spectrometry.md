---
{
  "key": "analysis.mass-spectrometry",
  "title": "Interpreting mass spectra",
  "summary": "Reading mass spectra given as tables of m/e and relative abundance: relative atomic mass from isotopic abundances, the molecular ion and Mr of an organic compound, common fragment ions, the number of carbon atoms from the [M+1]⁺ peak, and chlorine and bromine from [M+2]⁺ patterns.",
  "concepts": ["achem.analysis.mass-spectrometry"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A mass spectrometer turns a tiny sample into positive ions and sorts them by mass. The result, a mass spectrum, can tell you the relative atomic mass of an element from a mine sample, the relative molecular mass of a new compound, and often a good deal about its structure. Laboratories testing water or food for contaminants, and sports bodies testing athletes, rely on it.

You do not need to know how the instrument works. You do need to read a spectrum, given here as a table of m/e values and relative abundances, and draw conclusions from it. You should know isotopes, relative atomic and molecular mass, and organic formulae.

## Key definitions

:::definition{term="m/e"}
The mass-to-charge ratio of an ion. For the singly charged ions met here, m/e equals the relative mass of the ion.
:::

:::definition{term="Molecular ion, M⁺"}
The ion formed when a molecule loses one electron, $\ce{M -> M+ + e-}$; its m/e value gives the relative molecular mass of the compound.
:::

:::definition{term="Fragmentation"}
The breaking of a molecular ion into a smaller positive ion (which is detected) and a neutral radical or molecule (which is not).
:::

:::definition{term="[M+1]⁺ peak"}
A small peak one unit above the molecular ion, caused mainly by molecules containing one atom of carbon-13 instead of carbon-12.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: isotopic abundances, Ar from a spectrum, molecular ions and fragments (ZIMSEC Form 5, 6.1.1.2; Cambridge AS Level, 22.2). The [M+1]⁺ carbon count and [M+2]⁺ halogen patterns are named by Cambridge and are useful to ZIMSEC candidates for fragment questions. ZIMSEC stems give the Ar values needed.
:::

## Spectra of elements: relative atomic mass

For an element, each peak is one isotope, and the peak height (relative abundance) is proportional to the amount of that isotope.

$$
A_\text{r} = \frac{\sum (\text{isotopic mass} \times \text{abundance})}{\sum \text{abundances}}
$$

:::worked-solution[Example 1: Ar of boron]
A mass spectrum of boron shows peaks at m/e 10 (relative abundance 19.9) and m/e 11 (relative abundance 80.1).

1. Sum of (mass × abundance) = (10 × 19.9) + (11 × 80.1) = 199 + 881.1 = 1080.1.
2. Sum of abundances = 19.9 + 80.1 = 100.0.
3. Ar = 1080.1 ÷ 100.0 = 10.8 (to three significant figures).
:::

If the abundances are given as peak heights that do not add up to 100, divide by their total, not by 100.

![Mass spectrum of boron: a short peak at m/e 10 with relative abundance 19.9 and a tall peak at m/e 11 with relative abundance 80.1, giving a relative atomic mass of about 10.8.](media:diagrams/mass-spectrum-boron.png "Figure: mass spectrum of boron; each peak is one isotope and its height is its abundance")

## Spectra of molecules

### The molecular ion

In the spectrum of an organic compound the peak with the **highest m/e** (ignoring the small [M+1]⁺ and any [M+2]⁺ peaks) is usually the molecular ion, M⁺. Its m/e is the relative molecular mass. It is not always the tallest peak; the tallest is the **base peak**, the most abundant (often the most stable) fragment, given relative abundance 100.

### Fragment ions

The molecular ion has an unpaired electron and is energetic, so it breaks apart. Only the **positive** fragment is detected:

$$
\ce{CH3CH2CH2CH3+ -> CH3CH2+ + CH3CH2^.}
$$

Common fragments to recognise:

| m/e | Fragment ion | Typical source |
|---|---|---|
| 15 | $\ce{CH3+}$ | a methyl group |
| 17 | $\ce{OH+}$ | an alcohol or acid |
| 29 | $\ce{C2H5+}$ or $\ce{CHO+}$ | an ethyl group, or an aldehyde |
| 31 | $\ce{CH2OH+}$ | a primary alcohol |
| 43 | $\ce{CH3CO+}$ or $\ce{C3H7+}$ | a methyl ketone, or a propyl group |
| 45 | $\ce{COOH+}$ | a carboxylic acid |
| 57 | $\ce{C2H5CO+}$ or $\ce{C4H9+}$ | an ethyl ketone, or a butyl group |
| 77 | $\ce{C6H5+}$ | a benzene ring |

The **difference** between M and a fragment is also informative: a loss of 15 means a CH₃ was lost, a loss of 29 a C₂H₅ (or CHO), a loss of 17 an OH.

:::example{title="Example 2: the spectrum of butanone"}
Peaks for butanone, $\ce{CH3COCH2CH3}$ (Mr 72):

| m/e | Relative abundance | Assignment |
|---|---|---|
| 72 | 20 | molecular ion $\ce{CH3COCH2CH3+}$ |
| 57 | 8 | $\ce{CH3CH2CO+}$ (loss of CH₃ from M) |
| 43 | 100 | $\ce{CH3CO+}$ (loss of C₂H₅ from M), the base peak |
| 29 | 15 | $\ce{CH3CH2+}$ |

The isomer butanal, $\ce{CH3CH2CH2CHO}$, would also give M⁺ at 72 but a strong peak at 29 ($\ce{CHO+}$ and $\ce{C2H5+}$) and no strong peak at 57 from losing CH₃; the fragments help to tell isomers apart.

![Mass spectrum of butanone (Mr 72): peaks at m/e 29 (abundance 15, C2H5+), 43 (100, the base peak, CH3CO+), 57 (8, C2H5CO+) and 72 (20, the molecular ion), so the highest m/e is the relative molecular mass and the tallest peak is not the molecular ion.](media:diagrams/mass-spectrum-butanone.png "Figure: mass spectrum of butanone; the molecular ion is at m/e 72 and the base peak at 43")

:::

## Counting carbon atoms from the [M+1]⁺ peak

About 1.1% of carbon atoms are carbon-13. A molecule with n carbon atoms is therefore n × 1.1% as likely to contain a ¹³C as a molecule with one carbon. So

$$
n = \frac{100 \times \text{abundance of } [\text{M}+1]^+}{1.1 \times \text{abundance of } \text{M}^+}
$$

:::worked-solution[Example 3: how many carbons?]
A hydrocarbon has M⁺ at m/e 86 with relative abundance 25.0, and an [M+1]⁺ peak at m/e 87 with relative abundance 1.65.

1. n = (100 × 1.65) ÷ (1.1 × 25.0) = 165 ÷ 27.5 = 6.0, so six carbon atoms.
2. Six carbons have mass 6 × 12 = 72; 86 − 72 = 14, so 14 hydrogen atoms.
3. Molecular formula C₆H₁₄: a hexane isomer.
:::

## Chlorine and bromine: the [M+2]⁺ peak

Chlorine is about 75% ³⁵Cl and 25% ³⁷Cl; bromine is about 50% ⁷⁹Br and 50% ⁸¹Br. Molecules containing these atoms give **two molecular ion peaks two units apart**, in characteristic ratios:

| Halogen atoms in the molecule | Peaks | Ratio of heights |
|---|---|---|
| one Cl | M, M+2 | 3 : 1 |
| one Br | M, M+2 | 1 : 1 |
| two Cl | M, M+2, M+4 | 9 : 6 : 1 |
| two Br | M, M+2, M+4 | 1 : 2 : 1 |

For example, chloroethane, $\ce{C2H5Cl}$, shows molecular ion peaks at m/e 64 ($\ce{C2H5^{35}Cl+}$) and 66 ($\ce{C2H5^{37}Cl+}$) in the ratio 3 : 1. Fragments that keep the halogen show the same pair; fragments that have lost it do not.

![Mass spectrum pattern of chloroethane: molecular ion peaks at m/e 64 (C2H5 with chlorine-35) and 66 (chlorine-37) in the height ratio 3 to 1, the signature of one chlorine atom.](media:diagrams/mass-spectrum-chloroethane.png "Figure: one chlorine atom gives M and M+2 peaks in the ratio 3 : 1")

## Common mistakes

:::mistake{title="Dividing by 100 when abundances do not total 100"}
Always divide by the sum of the abundances you are given.
:::

:::mistake{title="Taking the tallest peak as M⁺"}
The base peak is the most abundant fragment. M⁺ is at the highest m/e (apart from isotope peaks).
:::

:::mistake{title="Writing fragments without a charge"}
Detected fragments are positive ions: write $\ce{CH3CO+}$, not CH₃CO. The neutral piece lost is a radical or molecule.
:::

:::mistake{title="Reading the M+1 ratio upside down"}
n = 100 × (M+1) ÷ (1.1 × M). The M+1 peak is the small one, so n comes out as a small whole number.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 1, Paper 2 and Paper 3 Section A; Cambridge Papers 1 and 2, and Paper 4 combined with NMR. Typical tasks: calculate Ar, identify M⁺ and Mr, give the formula of the fragment at a given m/e, find the number of carbons, explain an [M+2]⁺ pattern.
:::

:::exam-tip{title="Command words"}
*Calculate* Ar: show the sum of mass × abundance and the division. *Identify* a fragment: give its formula **with a positive charge**. *Deduce* the number of carbons: substitute into the formula and round to a whole number. *Explain* a pair of peaks two units apart: name the halogen isotopes and their ratio.
:::

## Summary

:::summary
- Ar = Σ(isotopic mass × abundance) ÷ Σ abundances.
- M⁺ (highest m/e, ignoring isotope peaks) gives Mr; the base peak is the most abundant fragment.
- Only positive fragments are detected; learn 15, 29, 43, 45, 77 and look at losses from M.
- Carbons: n = 100 × [M+1] ÷ (1.1 × [M]).
- [M+2] peaks: Cl 3 : 1, Br 1 : 1; two Cl 9 : 6 : 1, two Br 1 : 2 : 1.
:::
