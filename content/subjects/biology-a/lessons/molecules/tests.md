---
{
  "key": "molecules.tests",
  "title": "Tests for biological molecules",
  "summary": "Carry out and interpret Benedict's test for reducing sugars, the non-reducing sugar test, the iodine test for starch, the emulsion test for lipids and the biuret test for proteins; make Benedict's test semi-quantitative; and use a colorimeter and calibration curve to estimate concentration.",
  "concepts": ["abio.molecules.tests"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Is there sugar in this sorghum stem? Does this groundnut contain fat? How much glucose is in a sample of fruit juice? Simple chemical tests answer the first two questions; a standardised Benedict's test or a colorimeter answers the third. Food scientists, clinic laboratories and examiners all use these tests, and they appear in every practical paper.

You should know the O-Level food tests. Here you add precise methods, the chemistry behind the colours, the non-reducing sugar test and ways of making the tests give numbers.

## Key definitions

:::definition{term="Reducing sugar"}
A sugar that can donate electrons to (reduce) another substance; it reduces blue copper(II) ions in Benedict's solution to copper(I) oxide. All monosaccharides and most disaccharides, such as maltose and lactose, are reducing sugars.
:::

:::definition{term="Non-reducing sugar"}
A sugar that does not reduce Benedict's solution until it has been hydrolysed into its monosaccharides; sucrose is the main example.
:::

:::definition{term="Semi-quantitative test"}
A test that gives an approximate measure of concentration, for example by comparing colours or times with those of standard solutions of known concentration.
:::

:::definition{term="Calibration curve"}
A graph of a measured value (such as colorimeter absorbance or transmission) against known concentrations, used to read off the concentration of an unknown sample.
:::

## The five tests

| Test for | Method | Positive result | Negative result |
|---|---|---|---|
| Reducing sugar | Add an equal volume of Benedict's solution; heat in a water bath at about 80–100 °C for a few minutes | Brick-red (orange-red) precipitate; green, yellow or orange with less sugar | Stays blue |
| Non-reducing sugar | First show Benedict's stays blue; boil a fresh sample with dilute hydrochloric acid, cool, neutralise with sodium hydrogencarbonate, then do Benedict's test | Brick-red precipitate after hydrolysis | Stays blue |
| Starch | Add a few drops of iodine in potassium iodide solution | Blue-black | Stays orange-brown |
| Lipid (emulsion test) | Shake the sample with ethanol to dissolve lipid, then pour into water | Milky-white emulsion | Clear |
| Protein (biuret test) | Add biuret reagent (or sodium hydroxide then dilute copper(II) sulfate); no heating | Lilac / purple | Stays blue |

### Why the colours appear

- **Benedict's**: reducing sugars reduce blue copper(II) ions to copper(I) oxide, a brick-red precipitate. The more sugar, the more precipitate and the less blue remains, so the colour runs blue → green → yellow → orange → brick-red.
- **Non-reducing sugar test**: acid hydrolyses the glycosidic bond in sucrose, releasing glucose and fructose, which are reducing sugars. Benedict's test works only in alkaline conditions, so the acid must be neutralised first.
- **Iodine**: polyiodide ions fit inside the helix of amylose, giving the blue-black colour.
- **Emulsion**: lipids dissolve in ethanol but not in water; in water they form tiny droplets that scatter light.
- **Biuret**: copper(II) ions form a purple complex with the nitrogen atoms of peptide bonds, so any molecule with two or more peptide bonds gives a positive result; free amino acids do not.

:::keyfact{title="Safety"}
Wear eye protection: Benedict's and biuret reagents are irritants (sodium hydroxide in biuret is corrosive), and hydrochloric acid is an irritant. Use a water bath rather than a naked flame to heat test tubes, because ethanol is highly flammable and boiling tubes can spit. With these precautions the risk is low to medium.
:::

:::example{title="Interpreting the non-reducing sugar test"}
A sample of juice from a sorghum stem gives these results: Benedict's test on the untreated juice stays blue; after boiling with acid, neutralising and testing again, it gives a brick-red precipitate.

Interpretation: no reducing sugar was present at first, but a non-reducing sugar was. Acid hydrolysed the glycosidic bonds of the non-reducing sugar (most likely sucrose) to release reducing monosaccharides. A sample that is green before hydrolysis and brick-red after contains some reducing sugar **and** some non-reducing sugar.
:::

## Making Benedict's test semi-quantitative

The colour of a Benedict's test depends on the concentration of reducing sugar, but only if every other variable is kept the same. Standardise:

1. the volume of sample and of Benedict's solution (use excess Benedict's so the copper ions do not run out);
2. the temperature of the water bath and the heating time;
3. the size of the tubes and the way they are shaken.

Then either compare colours with a set of **colour standards** made from glucose solutions of known concentration, or record the **time to the first colour change**: the higher the concentration, the shorter the time.

:::worked-solution[Estimating concentration from times to first colour change]
1. Standard glucose solutions were tested in a water bath at 90 °C:

| Glucose / % (w/v) | Time to first colour change / s | Rate (1000/t) / s⁻¹ |
|---|---|---|
| 0.2 | 148 | 6.8 |
| 0.4 | 92 | 10.9 |
| 0.6 | 61 | 16.4 |
| 0.8 | 44 | 22.7 |
| 1.0 | 35 | 28.6 |

2. An unknown sample took 75 s, which lies between 92 s (0.4%) and 61 s (0.6%).
3. So its concentration is between 0.4% and 0.6%, roughly 0.5%.
4. To narrow the estimate, make more standards between 0.4% and 0.6% (for example 0.45%, 0.50%, 0.55%) and repeat.
:::

## Using a colorimeter

A colorimeter passes light of a chosen colour (wavelength) through a sample in a cuvette and measures how much is absorbed (**absorbance**) or transmitted (**% transmission**). For Benedict's test, the precipitate is removed by filtering or centrifuging and the remaining blue solution is measured, with a **red filter** (blue solutions absorb red light). The more sugar, the less copper(II) remains, so absorbance falls and transmission rises.

Steps: set zero with a blank (distilled water or unreacted reagent as instructed); measure standards of known concentration; plot a calibration curve; measure the unknown and read its concentration from the curve.

:::worked-solution[Reading a calibration curve]
1. Standards gave these readings after Benedict's test and filtering:

| Glucose concentration / % (w/v) | Transmission / % |
|---|---|
| 0.0 | 20 |
| 0.2 | 34 |
| 0.4 | 47 |
| 0.6 | 61 |
| 0.8 | 74 |
| 1.0 | 88 |

2. The graph of transmission against concentration is close to a straight line. An unknown juice gives 55% transmission, between the 0.4% (47%) and 0.6% (61%) standards.
3. Interpolating: $0.4 + \dfrac{55 - 47}{61 - 47} \times 0.2 = 0.514$.
4. The concentration is about 0.51% (w/v). Read from a drawn curve, any value from about 0.50 to 0.52% would be accepted.
:::

## Common mistakes

:::mistake{title="Heating the biuret test"}
Biuret does not need heating. Heating is needed only for Benedict's test (and to hydrolyse sucrose with acid).
:::

:::mistake{title="Forgetting to neutralise"}
Benedict's test needs alkaline conditions; skipping the sodium hydrogencarbonate after acid hydrolysis can give a false negative.
:::

:::mistake{title="Saying 'it turns red' for any sugar"}
Sucrose alone gives a negative (blue) result with Benedict's. State the colour change in full, including the starting colour.
:::

:::mistake{title="Using too little Benedict's in a quantitative test"}
If the copper(II) ions run out, all high concentrations give the same result. Use Benedict's in excess.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 4 and Cambridge Paper 3 expect you to carry out the tests, record results in a table (use "+", "++" or colours as instructed) and estimate concentrations; ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2 ask for methods and explanations.
:::

:::exam-tip{title="Command words"}
*Describe* a test: reagent, conditions (heat or not), positive and negative colours. *Explain* a result: link the colour to the chemistry (copper(II) reduced, glycosidic bond hydrolysed, complex with peptide bonds). *Suggest* how to make a test more precise: standardise volumes, temperature and time, use more standards in a narrower range, or use a colorimeter.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: all five tests, the non-reducing sugar test and semi-quantitative Benedict's. The colorimeter and calibration curves are named in the Cambridge practical skills and are useful for ZIMSEC Paper 4.
:::

## Summary

:::summary
- Benedict's (heat): blue → brick-red for reducing sugars; colour and time depend on concentration.
- Non-reducing sugars (sucrose): negative with Benedict's, then positive after acid hydrolysis and neutralisation.
- Iodine: orange-brown → blue-black with starch; emulsion test: milky with lipids; biuret (no heat): blue → lilac with proteins.
- A standardised Benedict's test with colour standards or times to first colour change is semi-quantitative.
- A colorimeter and a calibration curve from known standards give a quantitative estimate of concentration.
:::
