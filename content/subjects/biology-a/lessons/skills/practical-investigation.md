---
{
  "key": "skills.practical-investigation",
  "title": "Carrying out practical investigations: variables, results, graphs and errors",
  "summary": "The practical skills tested in ZIMSEC Paper 4 and Cambridge Paper 3: identifying and controlling variables, choosing ranges, intervals and replicates, assessing risk, recording results in tables with correct headings, units and decimal places, processing data to the right number of significant figures, drawing and describing graphs, estimating concentrations from qualitative results, and identifying anomalies, errors and improvements.",
  "concepts": ["abio.skills.practical-investigation"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

In the practical paper, the biology is usually familiar: an enzyme, osmosis in potato, a food test, transpiration. What earns the marks is the **method**: whether you change one variable and control the rest, record results so anyone can read them, process them correctly and judge honestly how reliable they are. Examiners in both ZIMSEC Paper 4 and Cambridge Paper 3 reward the same habits, and these habits can be learned.

This lesson uses one running example, an investigation of the effect of temperature on the activity of amylase, but the rules apply to every investigation. You should already know how enzymes work and the basic food tests.

## Key definitions

:::definition{term="Independent variable"}
The variable that the investigator deliberately changes, to find its effect.
:::

:::definition{term="Dependent variable"}
The variable that is measured or observed to find the effect of changing the independent variable.
:::

:::definition{term="Standardised (controlled) variable"}
A variable that could affect the dependent variable and is kept constant so that the test is fair.
:::

:::definition{term="Control"}
A set-up that is identical to the experiment except for the factor being tested (for example boiled enzyme instead of active enzyme), used to show that the result is caused by that factor.
:::

:::definition{term="Anomalous result"}
A result that does not fit the pattern of the other results, usually because of an error.
:::

## Planning the procedure

1. **Identify the variables.** In the amylase investigation, the independent variable is temperature; the dependent variable is the time taken for starch to disappear (iodine no longer turns blue-black). Standardised variables include the concentration and volume of amylase and starch, the pH (use a buffer) and the interval between samples.
2. **Choose a range and interval.** Use **at least five values** of the independent variable, spread to show the whole pattern, for example 20, 30, 40, 50 and 60 °C. Add extra values where the pattern changes (near an optimum).
3. **Replicates.** Repeat each value at least **three times** so that anomalies can be spotted and a mean calculated.
4. **Controls.** Include a control, such as boiled amylase, to show that starch disappears because of enzyme activity.
5. **Measure accurately.** Use syringes or pipettes for small volumes, a thermostatically controlled water bath, and allow solutions to reach the temperature before mixing (equilibrate for a few minutes).
6. **Assess risk.** Identify each hazard and a precaution, and state the overall risk as **low**, **medium** or **high**. Here: hot water (take care, use tongs or a test-tube holder), iodine solution (irritant; avoid skin and eyes, wear eye protection), glassware (handle carefully). Overall risk: **low**.

## Recording results

A results table should have:

- The **independent variable in the first column**.
- **Column headings** with the quantity and its **unit**, separated by a solidus, for example *Temperature / °C* and *Time / s*. Units go in the heading only, never in the body of the table.
- All raw readings of one quantity to the **same number of decimal places**, matching the precision of the instrument (a stopwatch read to the nearest second: whole seconds).
- Columns for each replicate, then processed values (mean, rate).

| Temperature / °C | Time 1 / s | Time 2 / s | Time 3 / s | Mean time / s | Rate (1000 ÷ mean time) / s⁻¹ |
|---|---|---|---|---|---|
| 20 | 312 | 298 | 305 | 305 | 3.28 |
| 30 | 164 | 171 | 158 | 164 | 6.09 |
| 40 | 92 | 88 | 96 | 92 | 10.9 |
| 50 | 118 | 240 | 124 | 121* | 8.26 |
| 60 | 410 | 395 | 402 | 402 | 2.49 |

\* The mean at 50 °C leaves out the anomalous 240 s.

## Processing results

- **Means**: add the replicates and divide by the number of replicates, **leaving out** anomalies. Record the mean to the same number of decimal places as the raw data (or one more).
- **Rates**: when the dependent variable is a time, rate is proportional to 1 ÷ time. Multiplying by 1000 gives convenient numbers.
- **Percentage change**: $\dfrac{\text{final} - \text{initial}}{\text{initial}} \times 100$, used when starting values differ (for example masses of potato cylinders).
- **Significant figures**: give a calculated value to the **same number of significant figures as the least precise data, or one more**.

:::worked-solution[Processing the amylase results]
1. Mean at 30 °C $= (164 + 171 + 158) \div 3 = 164.3$, recorded as 164 s (whole seconds, like the raw data).
2. At 50 °C, 240 s is about twice the other two readings: it is **anomalous**. Mean $= (118 + 124) \div 2 = 121$ s.
3. Rate at 40 °C $= 1000 \div 92 = 10.87$, recorded as 10.9 to three significant figures (the times have two or three significant figures).
4. Highest rate: 40 °C. The true optimum could be anywhere between 30 and 50 °C, so more temperatures in that range (35, 40, 45 °C) are needed to find it more precisely.
:::

## Graphs

- Plot the **independent variable on the x-axis** and the dependent (or processed) variable on the y-axis, each axis labelled with quantity and unit.
- Choose linear scales that use more than half the grid, with even intervals (1, 2, 5 or 10 units per large square).
- Plot points precisely as small crosses or encircled dots.
- Join points with **ruled straight lines point to point**, or draw a smooth **best-fit** line if the trend is clearly a smooth curve; do not extrapolate beyond the data unless asked.
- Use a **bar chart** for discontinuous (categorical) independent variables, such as species, and a **histogram** for frequencies of a continuous variable in classes.

**Describing a trend:** state the overall pattern, quote values with units at key points (the start, the peak and the end), and describe changes in gradient: "The rate increases from 3.28 s⁻¹ at 20 °C to a maximum of 10.9 s⁻¹ at 40 °C, then decreases to 2.49 s⁻¹ at 60 °C."

## Qualitative results and estimating concentrations

Some tests give colours rather than numbers. To estimate an unknown concentration, set up a **series of standards** of known concentration (for example glucose solutions of 0, 2, 4, 6, 8 and 10 mmol dm⁻³), test each under identical conditions, and compare the unknown with them.

:::example{title="Estimating glucose concentration with Benedict's solution"}
After heating with Benedict's solution for the same time, standards gave: 0 mmol dm⁻³ blue, 2 green, 4 yellow, 6 orange, 8 brick-red, 10 brick-red with heavy precipitate. An unknown sample from Thandeka's fruit juice turned yellow-orange. **Estimate** its concentration: between 4 and 6 mmol dm⁻³. **Suggest** an improvement: make standards at smaller intervals in that range (4.5, 5.0 and 5.5 mmol dm⁻³), or use a colorimeter to give a numerical reading, or filter and dry the precipitate and weigh it.
:::

## Errors, anomalies and improvements

- **Systematic errors** shift every reading in the same direction, for example a balance that is not zeroed, a thermometer that reads 2 °C high, or the time lost each time before the stopwatch is started. They affect accuracy and are **not** reduced by repeats.
- **Random errors** vary unpredictably between readings, for example judging the exact end point of a colour change, or temperature fluctuating in a water bath without a thermostat. They are reduced by **replicates and means**.
- **Uncertainty** in a measurement is often taken as half the smallest division of the scale; the percentage error is $\dfrac{\text{uncertainty}}{\text{measured value}} \times 100$. A larger measured value gives a smaller percentage error.
- **Improvements** should be specific: "use a thermostatically controlled water bath" rather than "be more careful"; "use a colorimeter to judge the end point" rather than "use better equipment"; "add 35 and 45 °C" rather than "use more temperatures".

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: variables, ranges, replicates, tables, processing, graphs, anomalies, errors and improvements. Cambridge Paper 3 asks you to state the **level of risk** (low, medium or high) and is strict on significant figures and table conventions; ZIMSEC Paper 4 tests the same skills with an investigation question.
:::

## Common mistakes

:::mistake{title="Units in the table body"}
Write *Time / s* in the heading and plain numbers in the cells.
:::

:::mistake{title="Inconsistent decimal places"}
Record all readings of one quantity to the same number of decimal places, e.g. 2.30 g not 2.3 g alongside 2.27 g.
:::

:::mistake{title="Including an anomaly in a mean"}
Identify the anomaly, explain why, and leave it out (or repeat the reading).
:::

:::mistake{title="Vague improvements"}
"Repeat the experiment" alone earns little. Say what to repeat, how many times, and why.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 4 and Cambridge Paper 3, *describe* means trend plus figures with units; *explain* means the biological reason; *suggest* means apply knowledge to a new situation. When asked for "a significant source of error", name the error and say how it affected the results.
:::

:::exam-tip
Before the practical starts, read the whole question, draw the results table with headings and units, and plan how many readings you have time for. Record readings straight into the table as you go.
:::

## Summary

:::summary
- Change one independent variable over at least five values; measure the dependent variable; standardise others; include controls and replicates.
- State hazards, precautions and an overall risk level.
- Tables: independent variable first, quantity / unit headings, consistent decimal places, processed columns.
- Means leave out anomalies; calculated values have the same significant figures as the data or one more; rate ∝ 1 ÷ time.
- Systematic errors shift all readings; random errors are reduced by replicates; improvements must be specific.
:::
