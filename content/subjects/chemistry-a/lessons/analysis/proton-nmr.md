---
{
  "key": "analysis.proton-nmr",
  "title": "Proton (¹H) NMR spectroscopy",
  "summary": "Reading and predicting proton NMR spectra: chemical shift and proton environments, relative peak areas, splitting by neighbouring protons and the n + 1 rule, TMS as the standard, deuterated solvents, and identifying O–H and N–H protons by exchange with D₂O; deducing structures from described spectra.",
  "concepts": ["achem.analysis.proton-nmr"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Proton NMR is the single most informative technique an organic chemist has. One spectrum shows how many kinds of hydrogen a molecule contains, how many of each, what they are next to, and how many hydrogens sit on the neighbouring carbon. Put together, these clues often give the whole structure. Chemists checking a new medicine, or identifying a flavour compound from a plant, run a proton NMR spectrum first.

This lesson explains the four pieces of information in a proton NMR spectrum and how to use them, with D₂O exchange and the role of the solvent. You should have studied carbon-13 NMR (chemical shift, TMS, environments) and know structural formulae.

## Key definitions

:::definition{term="Proton environment"}
A set of hydrogen atoms in a molecule that are equivalent by symmetry; each environment gives one signal (which may be split).
:::

:::definition{term="Relative peak area (integration)"}
The area under a signal, proportional to the number of hydrogen atoms in that environment; usually given as a ratio such as 3 : 2 : 1.
:::

:::definition{term="Splitting (n + 1 rule)"}
A signal from protons with n equivalent protons on the adjacent carbon atom(s) is split into n + 1 lines: singlet (n = 0), doublet (1), triplet (2), quartet (3); more lines are described as a multiplet.
:::

:::definition{term="Deuterated solvent"}
A solvent in which hydrogen atoms are replaced by deuterium (²H), such as CDCl₃, so that the solvent gives no signal in a proton NMR spectrum.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge A Level only (37.4, Paper 4). Not in the ZIMSEC syllabus.
:::

## The four clues in a proton NMR spectrum

| Clue | What it tells you |
|---|---|
| number of signals | number of different proton environments |
| chemical shift, δ / ppm | the type of environment (what the protons are near) |
| relative peak area | the relative number of protons in each environment |
| splitting pattern | the number of protons on the adjacent carbon atom(s) (n + 1 rule) |

## Chemical shift

As in carbon-13 NMR, nearby electronegative atoms and π systems deshield protons and move them to higher δ. Use the data table:

| Environment of proton | Example | δ / ppm |
|---|---|---|
| alkane | –CH₃, –CH₂–, >CH– | 0.9-1.7 |
| alkyl next to C=O | CH₃–C=O, –CH₂–C=O | 2.2-3.0 |
| alkyl next to an aromatic ring | CH₃–Ar, –CH₂–Ar | 2.3-3.0 |
| alkyl next to an electronegative atom | CH₃–O, –CH₂–O, –CH₂–Cl | 3.2-4.0 |
| attached to an alkene | =CHR | 4.5-6.0 |
| attached to an aromatic ring | H–Ar | 6.0-9.0 |
| aldehyde | –CHO | 9.3-10.5 |
| alcohol | R–OH | 0.5-6.0 |
| phenol | Ar–OH | 4.5-7.0 |
| carboxylic acid | –COOH | 9.0-13.0 |
| alkyl amine | R–NH– | 1.0-5.0 |
| aryl amine | Ar–NH– | 3.0-6.0 |
| amide | –CONH– | 5.0-12.0 |

O–H and N–H shifts vary with solvent and concentration, so their wide ranges overlap other regions.

## Splitting: the n + 1 rule

The small magnetic field of protons on the **adjacent** carbon makes a signal split. Count the equivalent H atoms on the neighbouring carbon(s), n; the signal has n + 1 lines.

| H on adjacent carbon(s), n | Lines | Name |
|---|---|---|
| 0 | 1 | singlet |
| 1 | 2 | doublet |
| 2 | 3 | triplet |
| 3 | 4 | quartet |
| more | many | multiplet |

Points to remember:

- Protons in the **same** environment do not split each other.
- An **ethyl group**, –CH₂CH₃, gives the classic pair: a quartet (CH₂, split by CH₃) and a triplet (CH₃, split by CH₂).
- An **isopropyl group**, –CH(CH₃)₂, gives a doublet (6H) and a multiplet (1H).
- **O–H** (and usually N–H) protons exchange rapidly between molecules, so they appear as a **singlet** and do not split neighbouring signals.

## Solvents, TMS and D₂O exchange

- **TMS**, Si(CH₃)₄, gives one sharp signal from twelve equivalent protons, set at δ = 0.
- Spectra are run in a **deuterated solvent** such as CDCl₃. Deuterium nuclei do not absorb in the proton region, so the solvent does not swamp the spectrum.
- **D₂O exchange.** Shaking the sample with D₂O replaces the hydrogen of O–H and N–H groups with deuterium: R–OH + D₂O ⇌ R–OD + HDO. When the spectrum is run again, the O–H or N–H signal **disappears**. This identifies which signal was O–H or N–H.

:::example{title="Example 1: predicting the spectrum of ethanol"}
Ethanol, $\ce{CH3CH2OH}$:

| Protons | δ / ppm (range from table) | Relative area | Splitting | Reason |
|---|---|---|---|---|
| CH₃ | 0.9-1.7 | 3 | triplet | 2 H on adjacent CH₂ |
| CH₂ | 3.2-4.0 | 2 | quartet | 3 H on adjacent CH₃ (the OH does not split it) |
| OH | 0.5-6.0 | 1 | singlet | rapid exchange; disappears with D₂O |

Three signals, areas 3 : 2 : 1.

![Schematic proton NMR spectrum of ethanol: a triplet for CH3 near 1.2 ppm with area 3, a singlet for OH near 2.6 ppm with area 1, and a quartet for CH2 near 3.7 ppm with area 2; the n + 1 rule gives the splitting, and TMS is the reference at 0 ppm.](media:diagrams/proton-nmr-ethanol.png "Figure: schematic proton NMR spectrum of ethanol (areas 3 : 2 : 1)")

:::

## Deducing a structure: a method

1. Use the molecular formula (and IR or carbon-13 data if given) to note possible functional groups.
2. Convert the relative areas into actual numbers of H using the formula (the areas must add up to the total H).
3. Assign each signal using δ.
4. Use the splitting to link neighbouring groups: a quartet and a triplet together suggest CH₃CH₂–; a singlet means no H on adjacent carbons.
5. Assemble a structure, then predict its spectrum and check that it matches every signal.

:::example{title="Example 2: an ester C₄H₈O₂"}
A neutral compound, C₄H₈O₂, shows a strong IR absorption at 1740 cm⁻¹. Its proton NMR spectrum:

| δ / ppm | Relative area | Splitting |
|---|---|---|
| 1.1 | 3 | triplet |
| 2.3 | 2 | quartet |
| 3.7 | 3 | singlet |

1. Areas 3 + 2 + 3 = 8, matching the 8 H in the formula.
2. IR 1740 cm⁻¹ and two O atoms with no acid O–H: an ester.
3. δ 3.7, singlet, 3H: a CH₃ on oxygen with no neighbouring H: –O–CH₃.
4. δ 2.3, quartet, 2H: a CH₂ next to C=O, with a CH₃ neighbour.
5. δ 1.1, triplet, 3H: a CH₃ next to a CH₂.
6. Structure: $\ce{CH3CH2COOCH3}$, methyl propanoate. (Ethyl ethanoate would instead show a 3H singlet near 2.2 for CH₃–C=O and a 2H quartet above 3.2 for –O–CH₂–.)
:::

## Common mistakes

:::mistake{title="Counting neighbours on the same carbon"}
Splitting comes from H atoms on the **adjacent** carbon, not from the H on the same carbon.
:::

:::mistake{title="Splitting by O–H"}
O–H protons normally appear as singlets and do not split neighbouring CH signals.
:::

:::mistake{title="Forgetting to scale the areas"}
A ratio of 1 : 1.5 may mean 2H : 3H. Scale the ratio so the total matches the molecular formula.
:::

:::mistake{title="Using CHCl₃ as the solvent"}
Ordinary CHCl₃ has a proton that gives a large signal; a deuterated solvent such as CDCl₃ is used.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4: deduce a structure from a described spectrum (often with IR, mass spectrum or carbon-13 data), predict the spectrum of a given molecule, explain D₂O exchange, TMS and deuterated solvents.
:::

:::exam-tip{title="Command words"}
*Deduce* the structure: for each signal state the environment (from δ), the number of H (from the area) and the neighbours (from the splitting). *Predict* the spectrum: give δ range, relative area and splitting for every environment. *Explain* the effect of adding D₂O: the O–H (or N–H) hydrogen is exchanged for D, which does not absorb in this region, so that signal disappears.
:::

## Summary

:::summary
- Number of signals = number of proton environments; δ shows the type of environment.
- Relative peak areas give the relative numbers of H in each environment.
- n + 1 rule: n equivalent H on the adjacent carbon split a signal into n + 1 lines (ethyl: quartet + triplet).
- TMS is the δ = 0 standard; deuterated solvents such as CDCl₃ give no proton signal.
- Shaking with D₂O removes O–H and N–H signals; these protons appear as singlets and do not split neighbours.
:::
