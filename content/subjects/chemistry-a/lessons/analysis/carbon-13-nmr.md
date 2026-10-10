---
{
  "key": "analysis.carbon-13-nmr",
  "title": "Carbon-13 NMR spectroscopy",
  "summary": "The principles of carbon-13 NMR in outline: chemical shift relative to TMS, one peak per carbon environment, using symmetry to predict the number of peaks, using chemical shift ranges to identify types of carbon, and distinguishing isomers by their spectra.",
  "concepts": ["achem.analysis.carbon-13-nmr"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Infrared spectroscopy tells you which functional groups a molecule has; mass spectrometry gives its relative molecular mass. Neither shows how the carbon skeleton is put together. **Nuclear magnetic resonance (NMR)** spectroscopy does, and it is the main tool chemists use to work out the structure of a new compound, from a drug candidate to a natural product extracted from a plant. The same physics, applied to the hydrogen nuclei in the body, gives hospital MRI scans.

This lesson covers carbon-13 NMR: how many peaks a molecule gives, what their positions mean, and how to use a spectrum to choose between isomers. You should know structural formulae, isomerism and the main functional groups. Proton NMR is in the next lesson.

## Key definitions

:::definition{term="Nuclear magnetic resonance"}
The absorption of radio-frequency radiation by certain nuclei (such as ¹H and ¹³C) when they are placed in a strong magnetic field; the frequency absorbed depends on the nucleus's chemical environment.
:::

:::definition{term="Chemical shift, δ"}
The position of an NMR absorption relative to that of the reference compound tetramethylsilane (TMS), measured in parts per million (ppm); δ(TMS) = 0.
:::

:::definition{term="Carbon environment"}
A set of carbon atoms in a molecule that are equivalent by symmetry (bonded to the same groups in the same way); each environment gives one peak in a carbon-13 NMR spectrum.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge A Level only (37.3, Paper 4). Not in the ZIMSEC syllabus.
:::

## Principles in outline

- Only about 1.1% of carbon atoms are ¹³C, but this isotope has a nuclear spin and behaves like a tiny magnet; ¹²C does not, so it gives no signal.
- In a strong magnetic field, ¹³C nuclei absorb radio waves of a particular frequency. The electrons around each carbon **shield** it slightly from the field, so carbons in different environments absorb at slightly different frequencies.
- An electronegative atom (O, N, halogen) or a π bond nearby pulls electron density away, **deshielding** the carbon and moving its peak to a **larger δ**.
- Positions are measured relative to **tetramethylsilane**, Si(CH₃)₄ (TMS), whose twelve hydrogens and four carbons are all equivalent and very shielded, giving one sharp peak defined as δ = 0. TMS is inert, volatile and does not overlap with most organic peaks.
- In the spectra you will see, each carbon environment gives a **single line**; peak heights are **not** used to count carbons at this level.

## Counting peaks: carbon environments

The number of peaks equals the number of **different** carbon environments. Look for symmetry: carbons that can be swapped by a mirror plane or rotation of the molecule are equivalent.

| Molecule | Structure | Environments | Peaks |
|---|---|---|---|
| propan-1-ol | $\ce{CH3CH2CH2OH}$ | all three carbons differ | 3 |
| propan-2-ol | $\ce{CH3CH(OH)CH3}$ | two equivalent CH₃ + one CH | 2 |
| butanone | $\ce{CH3COCH2CH3}$ | four different carbons | 4 |
| pentan-3-one | $\ce{CH3CH2COCH2CH3}$ | CH₃ (×2), CH₂ (×2), C=O | 3 |
| 2-methylpropan-2-ol | $\ce{(CH3)3COH}$ | three equivalent CH₃ + one C | 2 |
| benzene | $\ce{C6H6}$ | all six equivalent | 1 |
| methylbenzene | $\ce{C6H5CH3}$ | CH₃; ring C attached to CH₃; 2 ortho; 2 meta; 1 para | 5 |
| 1,4-dimethylbenzene | $\ce{CH3C6H4CH3}$ | CH₃ (×2); ring C bearing CH₃ (×2); other ring CH (×4) | 3 |

## Chemical shift ranges

Use the data table to assign peaks:

| Type of carbon | Example environment | δ / ppm |
|---|---|---|
| sp³, alkyl | CH₃–, –CH₂–, >CH–, >C< | 0-50 |
| sp³, next to alkene or arene | –C–C=C, –C–Ar | 25-50 |
| sp³, next to carbonyl or carboxyl | –C–COR, –C–COOR | 30-65 |
| sp³, next to halogen | –C–X | 30-60 |
| sp³, next to oxygen | –C–O | 50-70 |
| sp², alkene or arene | >C=C< | 110-160 |
| sp², carboxyl | R–COOH, R–COOR | 160-185 |
| sp², carbonyl | R–CHO, R–CO–R | 190-220 |
| sp, nitrile | R–C≡N | 100-125 |

Some ranges overlap, so use them together with the formula and the number of peaks. Two regions are especially diagnostic: **190-220** (aldehyde or ketone C=O) and **160-185** (acid or ester C=O); a peak at **50-70** suggests C–O.

:::example{title="Example 1: predicting the spectrum of butanone"}
Butanone is $\ce{CH3-CO-CH2-CH3}$, carbons numbered 1 to 4 from the left.

1. Four different environments: four peaks.
2. C2 (the C=O carbon of a ketone): 190-220 ppm (observed about 209).
3. C3 (CH₂ next to C=O): 30-65 ppm (observed about 37).
4. C1 (CH₃ next to C=O) and C4 (CH₃ at the end of the ethyl group): within the 0-50 ppm alkyl region (observed about 29 and 8).
5. TMS gives a reference line at δ = 0.
:::

## Deducing structures and distinguishing isomers

A good method:

1. From the molecular formula, list the possible isomers.
2. Predict the number of peaks for each; often this alone decides.
3. Use the shift ranges to confirm (is there a C=O peak above 190? a C–O at 50-70? aromatic peaks at 110-160?).

:::example{title="Example 2: which isomer of C₄H₁₀O?"}
An alcohol, C₄H₁₀O, gives a carbon-13 spectrum with only two peaks, at δ 69 and δ 31.

| Isomer | Environments | Peaks |
|---|---|---|
| butan-1-ol, CH₃CH₂CH₂CH₂OH | 4 | 4 |
| butan-2-ol, CH₃CH(OH)CH₂CH₃ | 4 | 4 |
| 2-methylpropan-1-ol, (CH₃)₂CHCH₂OH | 3 | 3 |
| 2-methylpropan-2-ol, (CH₃)₃COH | 2 | 2 |

1. Only 2-methylpropan-2-ol has two environments.
2. δ 69: the carbon bonded to O (C–O range 50-70).
3. δ 31: the three equivalent CH₃ carbons (alkyl region).
4. The alcohol is 2-methylpropan-2-ol.
:::

Carbon-13 NMR is often combined with infrared (functional groups), mass spectrometry (Mr) and proton NMR (hydrogen environments and neighbours) to fix a structure with certainty.

## Common mistakes

:::mistake{title="Counting carbon atoms instead of environments"}
Propan-2-ol has three carbons but only two peaks: the two CH₃ groups are equivalent.
:::

:::mistake{title="Missing ring symmetry"}
In a monosubstituted benzene ring there are four ring environments (ipso, ortho, meta, para), not six.
:::

:::mistake{title="Counting TMS as a peak of the sample"}
The line at δ = 0 is the reference, not part of the compound's spectrum.
:::

:::mistake{title="Using peak heights to count carbons"}
In the carbon-13 spectra used here, heights are not proportional to the number of carbons in each environment.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4: predict the number of peaks, assign shifts using the data booklet, deduce a structure (often with IR, mass spectrum or proton NMR data).
:::

:::exam-tip{title="Command words"}
*Predict* the number of peaks: identify the equivalent carbons and say why. *Deduce* the structure: list isomers, compare their numbers of peaks, and match each peak to a carbon using the δ ranges. *Explain* why TMS is used: one peak, at δ = 0, from twelve equivalent H (four equivalent C); inert and volatile; away from most peaks.
:::

## Summary

:::summary
- Carbon-13 NMR detects ¹³C nuclei; each different carbon environment gives one peak.
- Chemical shift δ (ppm) is measured relative to TMS (δ = 0); electronegative atoms and π bonds move peaks to higher δ.
- Use symmetry to count environments: propan-2-ol 2, butanone 4, methylbenzene 5.
- Key regions: C=O of aldehydes and ketones 190-220; acids and esters 160-185; alkene and arene 110-160; C–O 50-70.
- Compare the predicted spectra of possible isomers to decide which one fits.
:::
