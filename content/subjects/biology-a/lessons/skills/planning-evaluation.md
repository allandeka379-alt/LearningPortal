---
{
  "key": "skills.planning-evaluation",
  "title": "Planning investigations and evaluating data",
  "summary": "How to plan a biological investigation from a given context (hypothesis and prediction, variables, serial and proportional dilutions, controls, replicates, a logical method and a risk assessment), how to analyse the results and choose a statistical test, and how to draw conclusions and evaluate the method, anomalies, validity and confidence.",
  "concepts": ["abio.skills.planning-evaluation"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Tendai's family grows tomatoes near Chinhoyi, and he wonders whether watering with diluted borehole water that is slightly salty slows their growth. To find out, he needs more than a good idea: he needs a **plan** that someone else could follow and get the same results, and a way of deciding whether his results really support his idea. Planning questions (ZIMSEC Paper 4 and Cambridge Paper 5) give you a context you may never have met and ask you to design the investigation. Analysis and evaluation questions give you someone else's data and ask what it shows and how far it can be trusted.

You should already be able to identify variables, record results in a table and plot graphs (see the lesson on practical investigations).

## Key definitions

:::definition{term="Hypothesis"}
A testable explanation of an observation, stating the expected relationship between the independent and dependent variables, often with a biological reason.
:::

:::definition{term="Prediction"}
A specific statement of the results expected if the hypothesis is correct, in terms of the variables to be measured.
:::

:::definition{term="Validity"}
The extent to which an investigation measures what it claims to measure, so that its conclusion answers the question asked; it depends on controlling all other variables.
:::

:::definition{term="Reliability (repeatability)"}
The extent to which repeating the investigation in the same way gives similar results.
:::

:::definition{term="Serial dilution"}
A series of dilutions in which each solution is made by diluting the previous one by the same factor, for example tenfold each time.
:::

:::definition{term="Proportional dilution"}
Making a range of concentrations by mixing different volumes of a stock solution with water so that the total volume is the same each time.
:::

## Step 1: hypothesis, prediction and variables

Start from the context. A good **hypothesis** links two variables with a reason: "Salty water reduces the growth of tomato plants because it lowers the water potential of the soil, so the roots take up less water." A **prediction** says what will be measured: "The higher the salt concentration, the smaller the increase in plant height over four weeks."

Then identify:

- the **independent variable** and how it is changed, with at least **five values** across a sensible range;
- the **dependent variable** and exactly how it is measured (instrument, unit, time);
- the **standardised variables** that could affect the result, and how **each** is kept constant (a water bath at a set temperature, the same volume, the same species and age).

## Step 2: concentrations

Many plans need a range of solutions made from one stock.

| Concentration / mol dm⁻³ | Volume of 1.0 mol dm⁻³ sucrose / cm³ | Volume of distilled water / cm³ |
|---|---|---|
| 0.0 | 0.0 | 20.0 |
| 0.2 | 4.0 | 16.0 |
| 0.4 | 8.0 | 12.0 |
| 0.6 | 12.0 | 8.0 |
| 0.8 | 16.0 | 4.0 |
| 1.0 | 20.0 | 0.0 |

:::worked-solution[Proportional dilution of sucrose solution]
Make 20 cm³ of each concentration from 1.0 mol dm⁻³ sucrose.
1. Volume of stock $= \dfrac{\text{concentration wanted}}{\text{stock concentration}} \times \text{total volume}$.
2. For 0.6 mol dm⁻³: $\dfrac{0.6}{1.0} \times 20 = 12.0$ cm³ of stock.
3. Add $20 - 12 = 8.0$ cm³ of distilled water.
4. Measure volumes with a graduated pipette or syringe, and mix thoroughly.
:::

**Concentration units.** A **% (w/v)** solution contains that many grams of solute in 100 cm³ of solution: 5% glucose is 5 g made up to 100 cm³. A **mol dm⁻³** solution contains that many moles in 1 dm³ (1000 cm³): 1.0 mol dm⁻³ sucrose ($M_r$ 342) is 342 g made up to 1 dm³, or 85.5 g made up to 250 cm³.

:::worked-solution[Serial dilution of a 1% glucose solution]
1. Label four test tubes. Put 10 cm³ of 1% (w/v) glucose in tube 1.
2. Transfer 1 cm³ from tube 1 to tube 2 and add 9 cm³ of distilled water: 0.1%.
3. Transfer 1 cm³ from tube 2 to tube 3 and add 9 cm³ of water: 0.01%.
4. Repeat for tube 4: 0.001%.
Each step is a tenfold dilution. Serial dilutions are useful when concentrations must cover several orders of magnitude, such as antibiotic or bacterial suspensions.
:::

## Step 3: controls, replicates and a logical method

- A **control** shows that the effect is caused by the independent variable: boiled enzyme instead of active enzyme, distilled water instead of a plant extract, or a tube with no organism.
- **Replicates**: at least three readings at each value, so that anomalies can be spotted and a mean calculated.
- The **method** is a numbered sequence a technician could follow: equipment with sizes, volumes and concentrations, how long to equilibrate, when to start timing, how to measure the end point.
- A **risk assessment** names each hazard, the risk and the precaution, and gives an overall level (low, medium or high): ethanol is flammable (no naked flames), hot water baths can scald, Benedict's reagent and biuret reagents are irritants (eye protection), and microorganisms need aseptic technique. Living animals must be handled humanely and returned unharmed.

## Step 4: analysing the data

| Type of data | Example | Typical analysis |
|---|---|---|
| Nominal (categories with no order) | Blood group, flower colour | Counts; chi-squared test |
| Ordinal (ordered categories) | Abundance on a five-point scale | Medians; Spearman's rank test |
| Continuous (measured on a scale) | Length, mass, time | Means, standard deviations; t-test or Pearson |

Process raw results before concluding. Calculate **means** of replicates (ignoring clear anomalies, and saying so), **percentage change** where starting values differ, and **rates** (often $1/\text{time}$ or change ÷ time).

:::worked-solution[Percentage change in mass of a potato cylinder]
A cylinder of potato had a mass of 2.40 g before and 2.15 g after 30 minutes in sucrose solution.
1. Change $= 2.15 - 2.40 = -0.25$ g.
2. Percentage change $= \dfrac{-0.25}{2.40} \times 100 = -10.4\%$ (3 s.f.).
3. The negative sign shows a loss of mass: water left the cells by osmosis.
:::

**Choosing a test.** Comparing two means of continuous data → t-test. Comparing observed counts with expected counts → chi-squared. Testing for a relationship between two variables → Pearson (continuous, normal, linear) or Spearman (ranked or not normal). Always state the **null hypothesis**.

## Step 5: conclusions and evaluation

A **conclusion** states the relationship shown, with figures, and whether it supports the hypothesis. Keep it within the range of the data and do not claim more than the data show: a correlation does not prove cause.

An **evaluation** looks for:

- **anomalous results** (identify them, suggest a cause, repeat them);
- **sources of error**: **systematic** errors shift every reading the same way (an uncalibrated balance), whereas **random** errors scatter readings (judging a colour change by eye);
- **uncontrolled variables** that reduce validity (temperature in an unheated room);
- the **range and interval** of the independent variable (too narrow to show an optimum, or too few values);
- the **spread of replicates** or overlapping error bars, which lower confidence in the conclusion;
- specific **improvements**: a colorimeter instead of eye judgement, a thermostatically controlled water bath, more replicates, a narrower interval around an optimum.

:::example{title="Evaluating a conclusion"}
A student concluded that "catalase works best at 40 °C" from readings at 20, 40 and 60 °C. Evaluation: only three temperatures were used, so the optimum could lie anywhere between 20 and 60 °C; there were no replicates, so anomalies cannot be detected; and the water baths were not checked with a thermometer. Improvement: use at least five temperatures at 5 °C intervals between 30 and 50 °C, three replicates at each, and a thermostatically controlled water bath. The conclusion should be stated with low confidence.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards test planning and evaluation: ZIMSEC in Paper 4 (planning, recording, interpreting and evaluating) and Cambridge in Paper 5 (A Level), where statistical tests, standard deviation and standard error are expected. ZIMSEC Paper 4 needs an understanding of the chi-squared test but not its detailed computation.
:::

## Common mistakes

:::mistake{title="Vague variables"}
"Keep the conditions the same" earns nothing. Name each variable and say how it is controlled: "temperature kept at 30 °C with a thermostatically controlled water bath".
:::

:::mistake{title="Too few values or no replicates"}
Use at least five values of the independent variable and at least three replicates of each.
:::

:::mistake{title="Confusing accuracy, precision and reliability"}
Accurate readings are close to the true value; precise readings are close to each other; reliable results are repeatable.
:::

:::mistake{title="Conclusions beyond the data"}
Do not extrapolate outside the range tested or claim that a correlation proves cause.
:::

## Exam tips

:::exam-tip
In a planning question, write the method as numbered steps with real quantities (volumes in cm³, concentrations, times in minutes, temperatures). Mark schemes give separate marks for the independent variable, the dependent variable, each standardised variable, the control, replicates, the dilution and the risk assessment.
:::

:::exam-tip
*Evaluate* means identify a weakness, explain its effect on the results and give a specific improvement. "Use better equipment" gains no credit; "use a colorimeter to measure the colour change, because judging by eye is subjective" does.
:::

## Summary

:::summary
- Start with a hypothesis that has a reason and a prediction stated in terms of the variables.
- Use at least five values, at least three replicates, a control and named standardised variables.
- Proportional dilution: volume of stock = (concentration wanted ÷ stock concentration) × total volume; serial dilution divides by the same factor each step.
- Process data (means, percentage change, rates) and choose a statistical test that matches the data type.
- Evaluate with anomalies, systematic and random errors, uncontrolled variables and specific improvements.
:::
