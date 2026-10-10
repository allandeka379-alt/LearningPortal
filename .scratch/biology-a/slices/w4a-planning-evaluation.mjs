// W4a: planning, analysis and evaluation (both boards).
import { concept, P, t, chk, table, dpStr, sfStr, mean, pctChange } from "../lib.mjs";

concept("abio.skills.planning-evaluation", { file: "skills/planning-evaluation", keyPrefix: "skills.planning-evaluation" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is a prediction rather than a hypothesis?",
    options: [
      ["The volume of gas collected per minute will double when the lamp is moved from 20 cm to 14 cm", "Correct: a specific expected result in terms of measured variables."],
      ["Light intensity limits photosynthesis because it supplies energy for the light-dependent stage", "This is a hypothesis: an explanation with a reason."],
      ["Light intensity is the independent variable and gas volume is the dependent variable", "This identifies variables; it predicts nothing."],
      ["Photosynthesis is a process that converts light energy into chemical energy", "This is a definition."],
    ],
    answer: "A",
    explanation: "A prediction states the expected result in terms of the variables measured; a hypothesis is a testable explanation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "In an investigation of the effect of amylase concentration on starch digestion, which is the most suitable control?",
    options: [
      ["Starch mixed with boiled amylase solution", "Correct: shows that active enzyme causes the digestion."],
      ["Starch mixed with the most concentrated amylase", "This is one of the experimental conditions."],
      ["Amylase solution with no starch added", "This does not show that the enzyme digests starch."],
      ["Starch mixed with amylase at a higher temperature", "This changes a second variable."],
    ],
    answer: "A",
    explanation: "Boiled (denatured) enzyme keeps everything the same except enzyme activity.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of these is an example of nominal data?",
    options: [
      ["The blood groups of students in a class", "Correct: categories with no order."],
      ["The masses of maize cobs in grams", "Mass is continuous data."],
      ["Abundance on a scale from rare to dominant", "Ordered categories are ordinal data."],
      ["The time taken for a colour change in seconds", "Time is continuous data."],
    ],
    answer: "A",
    explanation: "Nominal data are named categories with no order, such as blood groups.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Every mass recorded on a balance was 0.05 g too high because it had not been zeroed. What type of error is this?",
    options: [
      ["A systematic error", "Correct: every reading is shifted the same way."],
      ["A random error", "Random errors vary unpredictably in size and direction."],
      ["An anomalous result", "An anomaly is a single result that does not fit the pattern."],
      ["A sampling error", "The error comes from the instrument, not the choice of sample."],
    ],
    answer: "A",
    explanation: "A consistent offset in one direction is a systematic error; it affects accuracy, not the spread of repeats.",
    hints: ["Does the error change from reading to reading?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A student tested the effect of temperature on yeast respiration in an unheated laboratory, but used a different batch of yeast suspension at each temperature. Which change would most improve the validity of the results?",
    options: [
      ["Use the same batch of yeast suspension for every temperature", "Correct: removes an uncontrolled variable."],
      ["Record the results to more decimal places", "More decimal places do not remove an uncontrolled variable."],
      ["Plot the results as a bar chart instead of as a line graph of rate", "The graph type does not affect validity."],
      ["Do the experiment at only one temperature", "Then the independent variable would not be tested."],
    ],
    answer: "A",
    explanation: "Validity depends on controlling all variables except the independent variable; yeast batch could affect the rate.",
    hints: ["Which other variable changes along with temperature?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student counts the numbers of seeds that germinate and fail to germinate in two soil types. Which statistical test should be used?",
    options: [
      ["Chi-squared test", "Correct: counts in categories (germinated or not) in two soils."],
      ["t-test", "There are no continuous measurements to average."],
      ["Spearman's rank correlation", "No relationship between two variables is being tested."],
      ["Pearson's correlation", "Pearson needs paired continuous measurements."],
    ],
    answer: "A",
    explanation: "Frequencies in categories are tested with chi-squared.",
    hints: ["What kind of data are counts in categories?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Rates of an enzyme reaction were measured at 20, 30, 40, 50 and 60 °C. The highest rate was at 40 °C. Which improvement would best find the optimum temperature more precisely?",
    options: [
      ["Use temperatures at 2 °C intervals between 30 °C and 50 °C", "Correct: smaller intervals around the peak."],
      ["Extend the range to include 0 °C and 80 °C", "The optimum is clearly between 30 and 50 °C."],
      ["Repeat each of the five temperatures ten times and take a mean", "Replicates improve reliability, not the resolution of the optimum."],
      ["Use a larger volume of substrate at 40 °C only", "Changing volume at one temperature adds an uncontrolled variable."],
    ],
    answer: "A",
    explanation: "Narrower intervals around the observed peak locate the optimum more precisely.",
    hints: ["Where must the optimum lie?"],
  });

  // Proportional dilution
  const stock = 2.0, want = 0.5, tot = 25;
  const vS = (want / stock) * tot;
  chk(vS, 6.25);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `What volume of ${stock.toFixed(1)} mol dm⁻³ sodium chloride solution, in cm³, is needed to make ${tot} cm³ of ${want} mol dm⁻³ solution by proportional dilution?`,
    value: vS, unit: "cm³", dp: 2, wrong: [tot - vS, (stock / want) * tot],
    explanation: t`$\dfrac{${want}}{${stock.toFixed(1)}} \times ${tot} = ${vS}$ cm³ of stock, made up to ${tot} cm³ with ${tot - vS} cm³ of distilled water.`,
  });
  // % (w/v)
  const pct = 3, vol = 250;
  calc({
    d: 2, skill: "APPLICATION",
    stem: `What mass of glucose, in g, is needed to make ${vol} cm³ of a ${pct}% (w/v) solution?`,
    value: (pct / 100) * vol, unit: "g", wrong: [pct, (pct / 100) * 1000],
    explanation: t`${pct}% (w/v) means ${pct} g per 100 cm³, so $${pct} \times \dfrac{${vol}}{100} = ${(pct / 100) * vol}$ g, dissolved and made up to ${vol} cm³.`,
  });
  // mol dm-3
  const Mr = 180, c = 0.2, v2 = 500;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `Glucose has a relative molecular mass of ${Mr}. Calculate the mass of glucose, in g, needed to make ${v2} cm³ of ${c} mol dm⁻³ solution.`,
    value: Mr * c * (v2 / 1000), unit: "g", wrong: [Mr * c * v2, Mr * c],
    explanation: t`1. Moles needed $= ${c} \times \dfrac{${v2}}{1000} = ${c * (v2 / 1000)}$ mol.
2. Mass $= ${c * (v2 / 1000)} \times ${Mr} = ${Mr * c * (v2 / 1000)}$ g.
Forgetting to convert cm³ to dm³ gives a value 1000 times too large.`,
    hints: ["Convert cm³ to dm³ first."],
  });
  // percentage change
  const m0 = 3.15, m1 = 3.62;
  const pc = pctChange(m0, m1);
  calc({
    d: 3, skill: "APPLICATION",
    stem: `A strip of beetroot had a mass of ${m0.toFixed(2)} g before and ${m1.toFixed(2)} g after 40 minutes in distilled water. Calculate the percentage change in mass, to three significant figures.`,
    value: pc, sf: 3, unit: "%", wrong: [sfStr(((m1 - m0) / m1) * 100, 3)],
    explanation: t`1. Change $= ${m1.toFixed(2)} - ${m0.toFixed(2)} = ${dpStr(m1 - m0, 2)}$ g.
2. $\dfrac{${dpStr(m1 - m0, 2)}}{${m0.toFixed(2)}} \times 100 = +${sfStr(pc, 3)}\%$ (a gain).
Dividing by the final mass instead of the starting mass is a common error.`,
    hints: ["Divide by the starting mass."],
  });
  // serial dilution
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A 5% (w/v) sucrose solution is diluted tenfold three times in a serial dilution. What is the concentration of the final solution, in %?",
    value: 0.005, unit: "%", wrong: [0.05, 0.0005, 5 / 30],
    explanation: "5% → 0.5% → 0.05% → 0.005%.",
    hints: ["Divide by 10 at each of the three steps."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Repeating each reading three times improves the accuracy of an instrument that has not been calibrated.",
    answer: false,
    explanation: "False. Replicates improve reliability and help detect anomalies, but a systematic error from an uncalibrated instrument remains.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A standardised variable is a variable kept constant because it could affect the dependent variable.",
    answer: true,
    explanation: "True.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Accurate", "Close to the true value"],
      ["Precise", "Repeated readings close to each other"],
      ["Reliable", "Gives similar results when repeated"],
      ["Valid", "Measures what it is intended to measure"],
    ],
    explanation: "Accuracy: true value; precision: closeness of repeats; reliability: repeatability; validity: answers the question asked.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the plan.",
    template: "To make 10 cm³ of 0.4% starch from a 1% stock, mix {{blank:a}} cm³ of stock with {{blank:b}} cm³ of distilled water.",
    blanks: [
      { id: "a", accepted: ["4"], input: "number" },
      { id: "b", accepted: ["6"], input: "number" },
    ],
    explanation: "0.4 ÷ 1 × 10 = 4 cm³ of stock; 10 − 4 = 6 cm³ of water.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of error that causes repeated readings to scatter unpredictably above and below the true value.",
    accepted: ["random error", "random", "random errors"],
    wrong: ["systematic error"],
    explanation: "Random error.",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "A student plans to test reducing sugars in fruit juices with Benedict's reagent in a boiling water bath. Write a risk assessment.",
    points: [
      "Hot water / boiling water bath can scald: use test-tube holders, keep tubes pointing away from people",
      "Benedict's reagent is an irritant (contains copper sulfate): wear eye protection, wash off spills",
      "Overall risk: low (or medium) with these precautions",
    ],
    modelAnswer: "The boiling water bath can cause scalds, so test tubes are handled with holders and pointed away from people. Benedict's reagent is an irritant, so eye protection is worn and spills are washed off skin at once. With these precautions the overall risk is low.",
    explanation: "Hazard, precaution, overall level.",
    hints: ["Name each hazard and its precaution, then the overall level."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain the difference between a systematic and a random error, giving an example of each from an investigation timing a colour change by eye.",
    points: [
      "Systematic error: shifts all readings in the same direction (by the same amount)",
      "Random error: readings vary unpredictably above and below the true value",
      "Example: stopclock started late every time / a consistently misread end-point (systematic); judging the moment the colour changes by eye varies each time (random)",
    ],
    modelAnswer: "A systematic error shifts every reading in the same direction, for example if the stopclock is always started a second late. A random error makes readings scatter unpredictably above and below the true value, for example because judging the exact moment of a colour change by eye varies from one tube to the next.",
    explanation: "Systematic: consistent offset; random: unpredictable scatter.",
    hints: ["Which kind can be reduced by averaging replicates?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A student concluded from three measurements that 'fertiliser X increases maize yield'. She grew one plant with fertiliser and one without at each of three farms. Evaluate her investigation and suggest two improvements.",
    points: [
      "Very small sample: one plant per treatment per farm, so anomalies cannot be detected / results not reliable",
      "Farms differ in soil, water, rainfall, variety: uncontrolled variables reduce validity",
      "Improvement: many plants (replicates) per treatment, randomly assigned plots on the same farm with the same variety and watering",
      "Improvement: use a statistical test (t-test on mean yields) / state the conclusion with low confidence",
    ],
    modelAnswer: "With only one plant per treatment at each farm, anomalies cannot be identified and the results are unreliable. The farms differ in soil, rainfall and possibly variety, so these uncontrolled variables make the comparison invalid. She should grow many plants of the same variety in randomly assigned fertilised and unfertilised plots on one farm, with the same watering, and compare the mean yields with a t-test. Until then her conclusion should be stated with low confidence.",
    explanation: "Small sample and uncontrolled variables; improvements with replicates, randomisation and a test.",
    hints: ["Consider sample size and other variables."],
  });

  // Practice structured 1: plan the dilutions and variables (salt and seed germination)
  const stockPct = 2.0, totV = 50;
  const levels = [0, 0.4, 0.8, 1.2, 1.6, 2.0];
  const v12 = (1.2 / stockPct) * totV;
  chk(v12, 30);
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: `Tendai wants to test the hypothesis that *salty irrigation water reduces the percentage germination of tomato seeds*. He has a ${stockPct.toFixed(1)}% (w/v) sodium chloride stock solution, distilled water, Petri dishes, filter paper, tomato seeds from one packet, measuring cylinders and an incubator.`,
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Write a prediction.", points: ["As salt concentration increases, the percentage of seeds that germinate decreases"], modelAnswer: "The higher the salt concentration, the lower the percentage of seeds that germinate." }),
      P.num({ label: "(b)", marks: 1, stem: `Calculate the volume of stock, in cm³, needed to make ${totV} cm³ of 1.2% sodium chloride.`, value: v12, unit: "cm³", wrong: [totV - v12], explanation: `1.2 ÷ 2.0 × ${totV} = ${v12} cm³ of stock + ${totV - v12} cm³ water.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State the independent and dependent variables, and how each would be varied or measured.", points: ["Independent: salt concentration, six values such as " + levels.join(", ") + "% made by proportional dilution", "Dependent: percentage germination: count seeds with a visible radicle (e.g. 2 mm) after a fixed time, e.g. 7 days, ÷ number sown × 100"], modelAnswer: `Independent: sodium chloride concentration, ${levels.join(", ")}%, made by proportional dilution of the stock. Dependent: percentage germination, counting seeds with a radicle at least 2 mm long after 7 days and dividing by the number sown, × 100.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how he should carry out the investigation, including standardised variables.", points: ["Line each dish with filter paper and add the same volume (e.g. 5 cm³) of the solution; label dishes", "Place the same number of seeds (e.g. 20) from the same packet, evenly spaced", "Keep all dishes in the incubator at the same temperature (e.g. 25 °C) in the dark; cover with lids to reduce evaporation"], modelAnswer: "Line Petri dishes with filter paper and add 5 cm³ of one solution to each, labelling the dish. Place 20 seeds from the same packet evenly on the paper and cover with a lid to reduce evaporation. Keep all dishes in the incubator at 25 °C in the dark for 7 days, then count the germinated seeds." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain the role of the 0% dish and how replication would be used.", points: ["0% (distilled water) is the control: shows germination without salt / that seeds are viable", "Three or more dishes at each concentration; calculate the mean percentage germination and identify anomalies"], modelAnswer: "The 0% dish is the control, showing the germination rate without salt and that the seeds are viable. He should set up three dishes at each concentration and calculate the mean percentage germination, so anomalies can be identified." }),
      P.manual({ label: "(f)", marks: 1, stem: "State one hazard and a precaution.", points: ["Glassware breakage / salt solution in eyes: handle carefully, wear eye protection (low risk); wash hands after handling seeds (may be treated with fungicide)"], modelAnswer: "Seeds may be coated with fungicide, so gloves are worn or hands are washed after handling; the overall risk is low." }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain how he should present and analyse the results to test the hypothesis.", points: ["Table and graph of mean percentage germination against salt concentration (with range or SD bars)", "Spearman's rank correlation (or Pearson) between concentration and germination, or chi-squared on germinated / not germinated against the control; state the null hypothesis"], modelAnswer: "He should tabulate the mean percentage germination at each concentration and plot it against concentration, with error bars. A Spearman's rank test, with the null hypothesis that there is no correlation between salt concentration and germination, would show whether the negative trend is significant." }),
    ],
    explanation: "A full plan: prediction, dilution, variables, method, control, replicates, risk, analysis.",
    hints: ["Volume of stock = concentration wanted ÷ stock concentration × total volume."],
  });

  // Practice structured 2: evaluating given data
  const temps = [20, 30, 40, 50, 60];
  const r1 = [48, 31, 22, 35, 91], r2 = [51, 29, 24, 58, 88], r3 = [46, 30, 21, 37, 95];
  const means = temps.map((_, i) => mean([r1[i], r2[i], r3[i]]));
  const m50 = mean([r1[3], r3[3]]);
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: `Rudo measured the time taken for starch to disappear (iodine no longer turning blue-black) when amylase was mixed with starch at different temperatures. She judged the end point by taking a drop every 10 s and testing it with iodine on a spotting tile.\n\n${table(["Temperature / °C", "Time 1 / s", "Time 2 / s", "Time 3 / s"], temps.map((tt, i) => [String(tt), String(r1[i]), String(r2[i]), String(r3[i])]))}`,
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Identify the anomalous result.", points: ["58 s at 50 °C (time 2)"], modelAnswer: "58 s at 50 °C (time 2)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean time at 50 °C, excluding the anomaly, in s.", value: m50, unit: "s", wrong: [means[3]], explanation: `(${r1[3]} + ${r3[3]}) ÷ 2 = ${m50} s.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why sampling every 10 s limits the precision of the results.", points: ["The end point can only be detected to the nearest 10 s / the true time could be up to 10 s earlier", "Differences smaller than 10 s (e.g. between 30 and 40 °C replicates) cannot be distinguished"], modelAnswer: "Because drops are tested only every 10 s, the end point is known only to within 10 s and could have occurred up to 10 s before it was detected, so small differences between temperatures cannot be distinguished." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two improvements to the method.", points: ["Sample more often (e.g. every 5 s) or use a colorimeter to follow the colour continuously", "Use temperatures at smaller intervals around 40 °C / more replicates / pre-incubate enzyme and starch separately at the temperature before mixing"], modelAnswer: "Sample every 5 s, or follow the reaction continuously with a colorimeter. Pre-incubate the enzyme and starch separately at each temperature before mixing, and use extra temperatures at 35 and 45 °C to locate the optimum." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the conclusion that can be drawn, and how confident Rudo can be in it.", points: ["The optimum temperature is around 40 °C (shortest time, about 22 s)", "Moderate/low confidence: only 5 temperatures 10 °C apart, so optimum could be between 30 and 50 °C; end point judged by eye"], modelAnswer: "The reaction is fastest at about 40 °C, where the mean time is shortest, so the optimum is near 40 °C. Confidence is limited, because the temperatures are 10 °C apart, so the true optimum could lie anywhere between 30 and 50 °C, and the end point was judged by eye." }),
    ],
    explanation: "Spot the anomaly, process the data and evaluate precision and confidence.",
    hints: ["Which replicate differs greatly from the others at the same temperature?"],
    calculator: true,
  });

  b.card("DEFINITION", "Hypothesis", "A testable explanation stating the expected relationship between variables, with a reason.");
  b.card("DEFINITION", "Prediction", "The specific result expected if the hypothesis is correct, stated in terms of the measured variables.");
  b.card("FORMULA", "Proportional dilution", "Volume of stock = (concentration wanted ÷ stock concentration) × total volume; make up to the total with water.");
  b.card("DEFINITION", "Serial dilution", "Each solution is made by diluting the previous one by the same factor (e.g. 1 cm³ + 9 cm³ water for tenfold).");
  b.card("CONCEPT", "% (w/v) concentration", "Grams of solute per 100 cm³ of solution (5% = 5 g in 100 cm³).");
  b.card("CONCEPT", "Systematic versus random error", "Systematic: all readings shifted the same way. Random: unpredictable scatter about the true value.");
  b.card("CONCEPT", "Choosing a statistical test", "Two means: t-test. Counts against expected: chi-squared. Relationship: Pearson (continuous, normal, linear) or Spearman (ranked).");
  b.card("CONCEPT", "Nominal, ordinal and continuous data", "Nominal: unordered categories. Ordinal: ordered categories. Continuous: measured on a scale.");
});
