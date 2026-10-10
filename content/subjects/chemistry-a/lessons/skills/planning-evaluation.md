---
{
  "key": "skills.planning-evaluation",
  "title": "Planning, analysing and evaluating experiments",
  "summary": "How to plan a chemistry experiment (prediction, variables, apparatus and quantities, a safe step-by-step method, results table and graph), how to analyse data (calculations, choosing what to plot, gradient and intercept of y = mx + c, percentage error) and how to evaluate (anomalies, reliability, weaknesses, improvements and confidence in a conclusion).",
  "concepts": ["achem.skills.planning-evaluation"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A water laboratory in Bulawayo is asked to find out how quickly a new disinfectant breaks down in stored water. Nobody hands the chemists a worksheet: they must decide what to measure, what to keep the same, which apparatus and quantities to use, how to stay safe, how to turn readings into an answer, and how far to trust that answer. These are the skills of **planning, analysis and evaluation**, examined in ZIMSEC Paper 4 (planning and design) and Cambridge Paper 5. The contexts can be unfamiliar, even outside the syllabus; the method is always the same.

This lesson is the reference for those questions. You should already know the practical techniques and uncertainty rules in the quantitative practical lesson (burettes, pipettes, balances, concordant titres, significant figures).

## Key definitions

:::definition{term="Independent variable"}
The variable the experimenter deliberately changes (plotted on the x-axis).
:::

:::definition{term="Dependent variable"}
The variable that is measured to see how it responds (plotted on the y-axis).
:::

:::definition{term="Controlled variable"}
A variable that is kept constant so that it cannot affect the dependent variable.
:::

:::definition{term="Anomalous result"}
A result that does not fit the pattern of the others (far from the line of best fit, or not concordant), usually caused by an error in that measurement.
:::

:::definition{term="Percentage uncertainty"}
(absolute uncertainty ÷ measured value) × 100; for a value found as the difference of two readings, each with uncertainty ±u, the absolute uncertainty is 2u.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Paper 4 planning and design (Forms 5-6, practical node P.3); Cambridge Paper 5 (A Level, P5.1), questions on planning (question 1) and on analysis and evaluation (question 2). Mark schemes for both reward specific, quantitative detail.
:::

## Part 1: Planning

### 1. Define the problem

- State a **prediction** (hypothesis) linking the independent and dependent variables, with a reason from theory, and describe the expected graph in words ("rate is proportional to concentration, so a straight line through the origin").
- Name the **independent**, **dependent** and **controlled** variables. Controls should be specific: "temperature, kept at 25 °C in a water bath", not "conditions".

### 2. Choose apparatus and quantities

Quote **quantities** and **calculate** them. Examiners expect volumes, concentrations, masses and the apparatus with a suitable precision:

| Quantity | Suitable apparatus |
|---|---|
| fixed volume of solution | volumetric pipette (10.0 or 25.0 cm³) |
| variable volume to be added | burette (to ±0.05 cm³) |
| making a standard solution | volumetric flask (100 or 250 cm³) |
| mass | balance reading to 0.01 g or 0.001 g |
| gas volume | gas syringe (100 cm³) or inverted burette |
| temperature | thermometer reading to 0.5 °C or 0.1 °C; thermostatted water bath |
| time | stop-clock reading to 1 s |

:::worked-solution[Example 1: mass for a standard solution]
Plan to make 250 cm³ of 0.100 mol dm⁻³ sodium carbonate solution. Mr(Na₂CO₃) = 106.0.

1. Amount needed = 0.100 × 250 ÷ 1000 = 0.0250 mol.
2. Mass = 0.0250 × 106.0 = 2.65 g.
3. Method: weigh about 2.65 g into a weighing bottle and record the exact mass by difference; dissolve in distilled water in a beaker; transfer with washings to a 250 cm³ volumetric flask; make up to the mark; stopper and invert to mix.
:::

### 3. Write a method that someone else could follow

Use numbered steps, name the apparatus and quantities, and include **standard practice**:

- standard solutions in volumetric flasks; **weighing by difference**;
- rough titration followed by accurate titres until two are **concordant** (within 0.10 cm³);
- **heating to constant mass** in gravimetric work (heat, cool in a desiccator, weigh, repeat until two masses agree);
- equilibrating solutions in a **water bath** before mixing in rate or equilibrium work;
- taking **more readings where values change rapidly** (for example near the end point of a pH titration);
- **repeating** each measurement and taking a mean.

### 4. Safety and risk assessment

Link each precaution to a hazard: "concentrated hydrochloric acid is corrosive, so wear gloves and eye protection"; "ethanol is flammable, so heat with a water bath, not a flame"; "bromine vapour is toxic, so use a fume cupboard". General statements such as "be careful" score nothing.

### 5. Plan the results table and graph

A table has a column for each measured or calculated quantity, headed with **quantity / unit** (for example "time / s", "1/time / s⁻¹"), and allows for repeats and means. Say what will be plotted on each axis and what shape is expected.

## Part 2: Analysis

### Processing data

- Give calculated values to a sensible number of significant figures (the same as, or one more than, the least precise data).
- Choose what to plot so that the expected relationship becomes a **straight line**, y = mx + c, because a gradient and intercept can then be measured.

| Relationship | Plot | Straight-line meaning |
|---|---|---|
| rate = k[X]ⁿ | lg(rate) against lg[X] | gradient = n (order); intercept = lg k |
| first-order decay | ln[X] against time | gradient = −k |
| equation given relating ln k and 1/T | ln k against 1/T | gradient and intercept as given (outline only) |
| rate ∝ [X] | rate against [X] | straight line through the origin |

:::worked-solution[Example 2: order from a log-log graph]
Initial rates of a reaction were measured at different concentrations of X.

| [X] / mol dm⁻³ | rate / mol dm⁻³ s⁻¹ | lg[X] | lg(rate) |
|---|---|---|---|
| 0.020 | 2.06 × 10⁻⁴ | −1.70 | −3.69 |
| 0.040 | 7.76 × 10⁻⁴ | −1.40 | −3.11 |
| 0.060 | 1.84 × 10⁻³ | −1.22 | −2.74 |
| 0.080 | 3.14 × 10⁻³ | −1.10 | −2.50 |
| 0.100 | 5.00 × 10⁻³ | −1.00 | −2.30 |

1. If rate = k[X]ⁿ, then lg(rate) = n lg[X] + lg k: a straight line of gradient n.
2. Gradient using the first and last points: (−2.30 − (−3.69)) ÷ (−1.00 − (−1.70)) = 1.39 ÷ 0.70 = 1.99, so n = 2 (second order). The best-fit line through all five points gives 1.98.
3. Intercept (at lg[X] = 0): lg k ≈ −0.32, so k ≈ 10⁻⁰·³² ≈ 0.48 dm³ mol⁻¹ s⁻¹.
:::

### Percentage error (uncertainty)

| Measurement | Absolute uncertainty | Example | Percentage uncertainty |
|---|---|---|---|
| mass by difference, balance ±0.005 g | 2 × 0.005 = 0.010 g | 2.65 g | 0.38% |
| titre from two burette readings ±0.05 cm³ | 0.10 cm³ | 24.50 cm³ | 0.41% |
| 25.0 cm³ pipette, ±0.06 cm³ | 0.06 cm³ | 25.0 cm³ | 0.24% |

When values are multiplied or divided, the percentage uncertainties add to give the overall percentage uncertainty. The largest single contribution shows which measurement to improve. To reduce a percentage uncertainty, measure a **larger quantity** (larger mass, larger titre, larger temperature change) or use **more precise apparatus**.

## Part 3: Evaluation and conclusions

- **Anomalies.** Identify them (far from the line, not concordant), suggest a specific cause, and leave them out of means and lines of best fit.
- **Reliability.** Repeats that agree closely increase confidence; a narrow spread of repeats shows small random error.
- **Range and number of readings.** At least five values of the independent variable, spread across a sensible range.
- **Control of variables.** Was anything that should have been constant allowed to change (for example temperature rising during an exothermic reaction)?
- **Systematic and random errors.** Random errors scatter results either side of the true value (reduced by repeating); systematic errors shift all results the same way (reduced only by changing the method or calibrating), for example heat loss in calorimetry, or a gas escaping before the bung is inserted.
- **Improvements** must be specific and practical: "use a gas syringe instead of collecting over water", "use a thermostatted water bath", "use a data logger to take readings more often".
- **Conclusion.** State whether the data support the prediction, quote the evidence (gradient, value with units), and comment on confidence in the light of anomalies and uncertainties.

## Common mistakes

:::mistake{title="Vague quantities"}
"Some acid in a beaker" earns nothing. Write "25.0 cm³ of 1.00 mol dm⁻³ HCl measured with a pipette into a conical flask".
:::

:::mistake{title="Controlled variables that are not variables"}
"Use the same apparatus" is not a controlled variable. Name a quantity: temperature, concentration, volume, mass, particle size.
:::

:::mistake{title="Generic safety"}
Every precaution must be linked to a named hazard of a named substance.
:::

:::mistake{title="Reading the gradient from data points far apart from the line"}
Use the line of best fit, with points on the line that are far apart, not two data points that happen to be anomalous.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 4 (planning/design question); Cambridge Paper 5 (question 1 planning, question 2 analysis and evaluation of given data).
:::

:::exam-tip{title="Command words"}
*Predict*: state the relationship and the theory behind it. *Describe a method*: numbered steps with apparatus, quantities and repeats. *Calculate*: show working and give the answer to an appropriate number of significant figures with units. *Determine the gradient*: draw the line of best fit, use a large triangle, quote the coordinates. *Evaluate*: identify a specific weakness, explain its effect on the result, and suggest a specific improvement.
:::

## Summary

:::summary
- Plan: prediction with reason; independent, dependent and controlled variables; apparatus with calculated quantities; numbered method with standard practice; linked safety; results table and graph.
- Analyse: process data to sensible significant figures; plot so that y = mx + c is a straight line; use gradient and intercept (e.g. lg rate against lg[X] gives the order).
- Percentage uncertainty = absolute uncertainty ÷ value × 100 (2u for a difference of two readings).
- Evaluate: anomalies, repeats, range, control, systematic vs random error, specific improvements.
- Conclude with evidence and say how confident the data allow you to be.
:::
