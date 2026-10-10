---
{
  "key": "skills.quantitative-practical",
  "title": "Quantitative practical skills: titrations, measurements and uncertainty",
  "summary": "How A-Level chemists take, record and process measurements: burette, pipette and balance technique, concordant titres, gravimetric, thermometric, gas-volume and clock experiments, significant figures, percentage uncertainty, errors and graphs.",
  "concepts": ["achem.skills.quantitative-practical"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Every number in physical chemistry starts as a reading on a burette, a balance, a thermometer or a stop-clock. A water-treatment laboratory in Harare checking chlorine levels depends on the same skills you practise at school: careful technique, honest recording and sensible processing.

This lesson is the reference for the practical parts of the course. ZIMSEC Paper 4 (quantitative analysis) and Cambridge Paper 3 (the quantitative question) test these skills directly; Cambridge Paper 5 and the ZIMSEC planning question test them on paper. You should already be able to calculate amounts in moles and concentrations from titration data.

## Key definitions

:::definition{term="Concordant titres"}
Accurate titres that agree with each other within 0.10 cm³. The mean titre is calculated from the concordant values only, never from the rough titre.
:::

:::definition{term="Standard solution"}
A solution whose concentration is known accurately, made by dissolving a weighed mass of a pure, stable solid and making the solution up to the mark in a volumetric flask.
:::

:::definition{term="Constant mass"}
The state reached when repeated heating, cooling and weighing gives masses that agree (for example within 0.01 g), showing that the reaction or the loss of water is complete.
:::

:::definition{term="Percentage uncertainty"}
The maximum uncertainty in a measured quantity divided by the quantity, multiplied by 100.
:::

:::definition{term="Systematic error"}
An error that shifts every reading in the same direction by a similar amount (for example heat lost to the surroundings, or a balance that reads high). Repeating the experiment does not reduce it.
:::

:::definition{term="Random error"}
An error that makes readings scatter unpredictably on either side of the true value (for example judging a colour change or a meniscus). Repeating and averaging reduces its effect.
:::

:::keyfact{title="Recording precision"}
- Burette readings: to the nearest 0.05 cm³ (two decimal places, ending in 0 or 5), including an initial reading of 0.00.
- Pipette: the volume is fixed by the pipette, for example 25.0 cm³.
- Balance: to 0.01 g (two decimal places) on a two-place balance.
- Thermometer: to 0.5 °C on a 1 °C thermometer, or 0.1 °C on a 0.2 °C thermometer.
- Time: to the nearest second.
:::

## Titration technique

A titration measures the volume of one solution that reacts exactly with a fixed volume of another.

1. Rinse the pipette with a little of the solution it will deliver, and the burette with the solution it will hold. Rinsing with water would dilute them.
2. Fill the pipette using a pipette filler until the bottom of the meniscus sits on the line at eye level; run it into a conical flask and let the last drop touch the inside surface (do not blow it out).
3. Fill the burette (below eye level, with a funnel that you then remove), run some liquid through the tap so there is no air bubble in the jet, and read the bottom of the meniscus.
4. Add a few drops of indicator unless the titration is self-indicating (manganate(VII)).
5. Do a **rough** titration to find the end point approximately, then accurate titrations adding the last 1-2 cm³ dropwise while swirling, with a white tile under the flask.
6. Repeat until you have at least two concordant titres.

:::keyfact{title="Uncertainties of common apparatus"}
A burette reading is uncertain by ±0.05 cm³; a titre is the difference of two readings, so it is uncertain by ±0.10 cm³. A 25.0 cm³ pipette is typically ±0.06 cm³ and a two-place balance ±0.01 g for a mass by difference (two readings of ±0.005 g). A thermometer is uncertain by half its smallest division per reading, doubled for a temperature change.
:::

## Other quantitative methods

| Method | What is measured | Key technique |
|---|---|---|
| Gravimetric | mass change on heating (water of crystallisation, decomposition of a carbonate) or mass of a precipitate | weigh by difference; heat, cool in a desiccator or on a tile, weigh, and repeat to constant mass |
| Thermometric | temperature change of a reaction in a polystyrene cup | record the temperature before mixing and at regular intervals afterwards; extrapolate the cooling line back to the time of mixing |
| Gas volume | volume of gas from a reaction | gas syringe or inverted burette; readings at fixed times; allow for the volume of acid added |
| Rate (clock) | time for a fixed amount of reaction, such as a cross disappearing under sulfur | rate is proportional to 1/time; keep the total volume constant when changing one concentration |

## Recording and processing results

A results table has a heading for every column with the quantity and its unit separated by a solidus, for example *titre / cm³* or *temperature / °C*. Every reading in a column is recorded to the same number of decimal places, matching the precision of the instrument.

When you process data, give the answer to the same number of significant figures as the least precise measurement, or one more. A titre of 24.10 cm³ (4 s.f.) used with a concentration of 0.100 mol dm⁻³ (3 s.f.) gives an answer to 3 or 4 s.f. Round only the final answer.

:::worked-solution[Example 1: choosing concordant titres]
A student titrated 25.0 cm³ of hydrochloric acid with 0.100 mol dm⁻³ sodium hydroxide.

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| final burette reading / cm³ | 24.60 | 24.65 | 25.25 | 24.20 |
| initial burette reading / cm³ | 0.00 | 0.50 | 1.20 | 0.10 |
| titre / cm³ | 24.60 | 24.15 | 24.05 | 24.10 |

1. Ignore the rough titre. Titres 1, 2 and 3 lie within 0.10 cm³ of each other (24.05 to 24.15), so all three are concordant.
2. Mean titre $= \dfrac{24.15 + 24.05 + 24.10}{3} = 24.10\ \text{cm}^3$ (recorded to 0.05 cm³ precision, so 24.10, not 24.1).
3. Amount of NaOH $= \dfrac{24.10}{1000} \times 0.100 = 2.41 \times 10^{-3}$ mol, which equals the amount of HCl (1 : 1).
4. $[\ce{HCl}] = \dfrac{2.41 \times 10^{-3}}{0.0250} = 0.0964\ \text{mol dm}^{-3}$ (3 s.f., matching the data).
5. Percentage uncertainty of the mean titre $= \dfrac{0.10}{24.10} \times 100 = 0.41\%$.
:::

:::worked-solution[Example 2: percentage uncertainty of a temperature change]
A 1 °C thermometer is read to ±0.5 °C. The temperature rose from 21.5 °C to 29.0 °C.

1. Temperature change $\Delta T = 29.0 - 21.5 = 7.5$ °C.
2. Each reading is ±0.5 °C, so the change is uncertain by $2 \times 0.5 = 1.0$ °C.
3. Percentage uncertainty $= \dfrac{1.0}{7.5} \times 100 = 13\%$.
4. With a 0.2 °C thermometer read to ±0.1 °C, a similar change of 7.5 °C would have a percentage uncertainty of $\dfrac{0.2}{7.5} \times 100 = 2.7\%$. A larger temperature change (more concentrated reagents) or a more precise thermometer reduces the percentage uncertainty.
:::

:::example{title="Example 3: heating to constant mass"}
A crucible weighed 18.62 g; with hydrated salt it weighed 21.08 g. After three cycles of heating, cooling and weighing the masses were 20.41 g, 20.18 g and 20.17 g. The last two agree within 0.01 g, so constant mass has been reached: the mass of anhydrous salt is 20.17 − 18.62 = 1.55 g and the mass of water lost is 21.08 − 20.17 = 0.91 g. Stopping after the first heating would have given too little water lost and too large a value for the anhydrous mass.
:::

## Errors and improvements

Distinguish the error from its cure.

- **Heat loss** in calorimetry (systematic: ΔT too small) is reduced by a lid, a second cup as insulation, or extrapolation of a cooling curve back to the time of mixing.
- **Gas escaping** before the bung is fitted (systematic: volume too small) is avoided by putting the solid in a small tube inside the flask and tipping it over after the bung is in.
- **Judging an end point** (random) is improved by a white tile, dropwise addition and repeating to concordance.
- A **large percentage uncertainty** is reduced by measuring a larger quantity: a larger titre (a more dilute titrant), a larger mass, a larger temperature change, or a longer time.

## Graphs

Plot the independent variable on the x-axis. Choose scales so the points cover more than half of each axis, label both axes with quantity and unit, and draw a single best-fit line or smooth curve, ignoring clear anomalies (and saying why). For a gradient, use a large triangle on the line, not data points, and quote the coordinates you used. An intercept is read where the line crosses the axis, which may need extrapolation; in a thermometric experiment, extrapolating both the cooling line and the starting line to the time of mixing gives the corrected temperature change.

## Common mistakes

:::mistake{title="Including the rough titre in the mean"}
The rough titre is only a guide. Average the accurate titres that agree within 0.10 cm³.
:::

:::mistake{title="Readings written as 24.1 or 24.125"}
Burette readings are recorded to two decimal places ending in 0 or 5 (24.10, 24.15). A value such as 24.125 claims a precision the burette does not have.
:::

:::mistake{title="Forgetting that a difference has two uncertainties"}
A titre, a temperature change or a mass by difference comes from two readings, so the uncertainty is doubled before you calculate the percentage.
:::

:::mistake{title="Vague improvements"}
"Be more careful" earns nothing. Name the error and a specific change, such as "insulate the cup with a lid to reduce heat loss".
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 4 (quantitative analysis: a titration or measured quantity, results table, calculation and errors) and Cambridge Paper 3 (quantitative question). Cambridge Paper 5 and the ZIMSEC planning question ask you to process given data, find gradients and evaluate methods.
:::

:::exam-tip{title="Command words"}
*Record*: a table with units in the headings and consistent precision. *Calculate*: every step with units, final answer to the right significant figures. *Explain* an error: say what it does to the measured value (too high or too low) and why. *Suggest* an improvement: one specific change to the apparatus or method linked to the error it reduces.
:::

## Summary

:::summary
- Burette readings to 0.05 cm³, masses to 0.01 g, temperatures to 0.5 °C or 0.1 °C, consistent decimal places in every column.
- Mean titre from concordant titres (within 0.10 cm³), never the rough titre.
- Percentage uncertainty = uncertainty ÷ value × 100; double the reading uncertainty for a difference.
- Systematic errors shift results one way (fix the method); random errors scatter (repeat and average).
- Answers to the same significant figures as the least precise data, or one more; round only at the end.
- Best-fit lines, large gradient triangles and extrapolation to the time of mixing for thermometric work.
:::
