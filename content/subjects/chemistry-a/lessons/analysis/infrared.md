---
{
  "key": "analysis.infrared",
  "title": "Infrared spectroscopy",
  "summary": "Why bonds absorb infrared radiation, wavenumbers and the characteristic absorption ranges of O–H, N–H, C–H, C=O, C≡N, C=C and C–O; identifying functional groups from a table of peaks; the fingerprint region; following the oxidation of an alcohol; why some atmospheric gases absorb infrared.",
  "concepts": ["achem.analysis.infrared"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A forensic laboratory receives an unknown white powder; a brewer wants to know whether a batch of ethanol has started turning into vinegar; a quality-control chemist at a sugar and ethanol plant checks each batch of product. A quick first test in all three cases is an **infrared spectrum**. It takes a minute, uses a tiny sample, and tells you which functional groups are present.

This lesson explains why molecules absorb infrared radiation, how to read the data table of absorption ranges, and how to identify functional groups from a described spectrum. You should know the common functional groups (alcohols, aldehydes, ketones, carboxylic acids, esters, amines, amides, nitriles) and bond polarity.

## Key definitions

:::definition{term="Infrared (IR) spectroscopy"}
A technique that measures which frequencies of infrared radiation a sample absorbs; absorptions occur at frequencies that match the natural vibration frequencies of its bonds.
:::

:::definition{term="Wavenumber"}
The number of waves per centimetre, equal to 1/wavelength (in cm); unit cm⁻¹. In IR spectra it is used in place of frequency, to which it is proportional.
:::

:::definition{term="Fingerprint region"}
The part of an IR spectrum below about 1500 cm⁻¹, containing many overlapping absorptions that form a pattern unique to a particular compound.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge AS Level (22.1, Papers 1 and 2; also used in Paper 4 with NMR). Not in the ZIMSEC syllabus, which uses chemical tests and mass spectra for identification.
:::

## Why bonds absorb infrared radiation

Covalent bonds behave like springs: they stretch and bend continually. Each bond vibrates at a natural frequency that depends on

- the **masses** of the two atoms (bonds to the light hydrogen atom vibrate at high frequency, so O–H, N–H and C–H absorb above 2500 cm⁻¹);
- the **strength** of the bond (triple > double > single, so C≡N absorbs at a higher wavenumber than C=O, which is higher than C–O).

A molecule absorbs infrared radiation of exactly the frequency of one of its vibrations, provided that the vibration **changes the dipole moment** of the molecule. Polar bonds such as O–H and C=O therefore give strong absorptions. The energy absorbed makes the bond vibrate more vigorously.

## Reading an IR spectrum

A spectrum plots **transmittance** (%) against wavenumber, with wavenumber decreasing from left (about 4000 cm⁻¹) to right (about 500 cm⁻¹). An absorption appears as a downward "trough". In questions without a graph, the spectrum is described as a table of peaks.

![Chart of characteristic infrared absorption ranges in cm-1: O-H alcohol 3200-3600, O-H acid 2500-3000, N-H 3300-3500, C-H 2850-2950, C≡N 2200-2250, C=O ester 1710-1750, carbonyl 1670-1740, amide 1640-1690, C=C 1500-1680 and C-O 1040-1300; the fingerprint region lies below 1500.](media:diagrams/ir-absorption-ranges.png "Figure: characteristic IR absorption ranges from the data table; the C=O ranges overlap, so position is only a hint")

Use the characteristic ranges from the data table:

| Bond | Functional groups containing the bond | Absorption range / cm⁻¹ |
|---|---|---|
| C–O | hydroxy, ester | 1040-1300 |
| C=C | aromatic compound, alkene | 1500-1680 |
| C=O | amide | 1640-1690 |
| C=O | carbonyl, carboxyl | 1670-1740 |
| C=O | ester | 1710-1750 |
| C≡N | nitrile | 2200-2250 |
| C–H | alkane | 2850-2950 |
| N–H | amine, amide | 3300-3500 |
| O–H | carboxyl | 2500-3000 |
| O–H | hydroxy | 3200-3600 |

The **shape** of a peak helps too:

- **O–H in alcohols**: strong and broad (hydrogen bonding gives a spread of bond strengths), centred around 3300 cm⁻¹.
- **O–H in carboxylic acids**: very broad, spreading over 2500-3000 cm⁻¹ and often overlapping the C–H peaks.
- **C=O**: strong and sharp, around 1700 cm⁻¹: usually the easiest peak to spot.
- **N–H**: medium, sharper than O–H.

## A method for identifying functional groups

1. Look above 3000 cm⁻¹. A broad absorption at 3200-3600 means alcohol O–H; a medium absorption at 3300-3500 suggests N–H.
2. Look at 2500-3000. A very broad absorption here, with a C=O peak, means a carboxylic acid.
3. Look at 2200-2250 for C≡N.
4. Look at 1640-1750 for C=O, and use the exact position as a hint (amide lower, ester higher).
5. Look at 1040-1300 for C–O (alcohols and esters).
6. Combine the evidence with the molecular formula. The **absence** of a peak is as useful as its presence.

![Infrared spectrum of the unknown C4H8O2 from the worked example: a medium C-H trough at 2950 cm-1, a strong sharp C=O trough at 1740 (ester range 1710-1750) and a strong C-O trough at 1240, with no broad O-H absorption between 2500 and 3600, so the compound is an ester, not an acid or alcohol.](media:diagrams/ir-spectrum-ester-unknown.png "Figure: IR spectrum of the ester in Example 1 (peaks at 2950, 1740 and 1240 cm⁻¹; no O–H)")

:::example{title="Example 1: an unknown with formula C₄H₈O₂"}
Absorptions: 2950 (medium), 1740 (strong, sharp), 1240 (strong). No absorption between 2500 and 3600 apart from C–H.

1. 1740 cm⁻¹: a C=O bond, in the range for esters (1710-1750).
2. 1240 cm⁻¹: a C–O bond, also consistent with an ester.
3. No broad O–H: it is not a carboxylic acid (butanoic acid would show 2500-3000 broad) and not an alcohol.
4. 2950 cm⁻¹: alkane C–H.
5. Conclusion: an ester, such as ethyl ethanoate, $\ce{CH3COOCH2CH3}$, or methyl propanoate. Infrared alone cannot decide which ester; the fingerprint region or NMR would.
:::

:::example{title="Example 2: following the oxidation of propan-1-ol"}
Propan-1-ol is heated with acidified potassium dichromate(VI). Samples are taken and their spectra recorded.

| Sample | Key absorptions / cm⁻¹ | Interpretation |
|---|---|---|
| starting material | broad 3200-3600; 1050 | alcohol O–H and C–O: propan-1-ol |
| distillate collected early | sharp, strong 1730; no broad O–H | C=O, no O–H: propanal |
| after heating under reflux | very broad 2500-3000; strong 1715 | carboxyl O–H and C=O: propanoic acid |

The disappearance of the 3200-3600 absorption and the appearance of C=O show that oxidation has occurred; the very broad 2500-3000 absorption shows it has gone as far as the acid.
:::

## The fingerprint region

Below about 1500 cm⁻¹, bending vibrations and C–C, C–O and C–N stretches overlap to give a complex pattern. It is hard to assign individual peaks, but the pattern as a whole is characteristic of one compound. Comparing the fingerprint region of an unknown with a database of spectra of known compounds identifies it; an exact match also shows that a sample is **pure** (extra peaks suggest an impurity).

## Infrared and the atmosphere

The Earth's surface emits infrared radiation. Molecules in the atmosphere whose vibrations change their dipole moment, mainly carbon dioxide, water vapour and methane, absorb some of this radiation and re-emit it, warming the lower atmosphere: the greenhouse effect. Nitrogen and oxygen, made of two identical atoms, have no dipole that can change, so they do not absorb infrared. This is covered with air pollution and energy elsewhere.

## Common mistakes

:::mistake{title="Calling every peak near 3000 an O–H"}
C–H absorbs at 2850-2950 in almost every organic compound. Alcohol O–H is broad and at 3200-3600; acid O–H is very broad at 2500-3000.
:::

:::mistake{title="Deciding the exact structure from IR alone"}
IR identifies bonds and functional groups, not the whole molecule. Use the formula, the fingerprint region, mass spectra or NMR to go further.
:::

:::mistake{title="Forgetting what is missing"}
A ketone has C=O but no O–H. Stating that no broad absorption appears at 3200-3600 is often worth a mark.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Papers 1 and 2 (identify a functional group from a peak or table), and Paper 4 (IR combined with NMR and mass spectra to deduce a structure).
:::

:::exam-tip{title="Command words"}
*Identify* the bond responsible for a peak: name the bond and quote the range ("C=O, 1670-1740 cm⁻¹"). *Deduce* the compound: link each peak to a bond, mention significant absences, and combine with the formula. *Explain* how IR shows a reaction has happened: name the peak that disappears and the one that appears, with wavenumbers.
:::

## Summary

:::summary
- Bonds absorb IR at their natural vibration frequency if the vibration changes the dipole moment.
- Wavenumber (cm⁻¹) = 1/wavelength; light atoms and strong bonds absorb at higher wavenumbers.
- Key ranges: O–H alcohol 3200-3600 (broad), O–H acid 2500-3000 (very broad), N–H 3300-3500, C≡N 2200-2250, C=O 1640-1750, C–O 1040-1300.
- The fingerprint region (below 1500 cm⁻¹) identifies a compound by comparison with known spectra.
- IR follows reactions: e.g. alcohol O–H disappears and C=O appears on oxidation.
:::
