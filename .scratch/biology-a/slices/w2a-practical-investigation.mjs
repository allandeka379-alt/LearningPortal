// W2a: practical investigation skills (ZIMSEC Paper 4, Cambridge Paper 3).
import { concept, P, t, chk, table, mean, pctChange, pctError, dpStr, sfStr, rnd } from "../lib.mjs";

concept("abio.skills.practical-investigation", { file: "skills/practical-investigation", keyPrefix: "skills.practical-investigation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A student measures the volume of oxygen released by catalase at five different hydrogen peroxide concentrations. What is the independent variable?",
    options: [
      ["Hydrogen peroxide concentration", "Correct: the variable deliberately changed."],
      ["Volume of oxygen released", "This is measured: the dependent variable."],
      ["Temperature of the solutions", "This should be standardised."],
      ["Volume of catalase solution", "This should be standardised."],
    ],
    answer: "A",
    explanation: "The **independent variable** is the one the investigator changes: substrate concentration.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which column heading follows the conventions for a results table?",
    options: [
      ["Mass of potato / g", "Correct: quantity, solidus, unit."],
      ["Mass of potato (grams per piece)", "Use the unit symbol after a solidus, not words in brackets."],
      ["g", "A heading needs the quantity as well as the unit."],
      ["Mass of potato", "The unit is missing."],
    ],
    answer: "A",
    explanation: "Headings are written **quantity / unit**, with units only in the heading.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A balance reads 0.03 g with nothing on it, and the student does not notice. What type of error does this cause?",
    options: [
      ["Systematic error", "Correct: every mass is 0.03 g too high."],
      ["Random error", "Random errors vary unpredictably; this one is the same each time."],
      ["Anomalous result", "An anomaly is a single result that does not fit, not a constant shift."],
      ["Human reaction time", "This is an instrument zero error."],
    ],
    answer: "A",
    explanation: "A zero error shifts every reading by the same amount: a **systematic** error, not reduced by repeats.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would most reduce the effect of random errors on a mean result?",
    options: [
      ["Increase the number of replicates at each value", "Correct: random errors tend to cancel in a larger sample."],
      ["Calibrate the thermometer against a reference", "This removes a systematic error."],
      ["Use a wider range of independent variable values", "This shows more of the trend; it does not reduce random error."],
      ["Record readings to fewer decimal places", "This reduces precision."],
    ],
    answer: "A",
    explanation: "More **replicates** reduce the effect of random error on the mean.",
    hints: ["Which kind of error cancels out when averaged?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Times for a colour change were 58 s, 61 s and 60 s. How should the mean be recorded?",
    options: [
      ["60 s", "Correct: 59.7 s recorded to whole seconds like the raw data."],
      ["59.666 s", "Too many figures: the data are whole seconds."],
      ["59.7 s", "One extra decimal place is sometimes accepted, but the best record matches the raw data."],
      ["60.0 s", "60.0 implies a precision of 0.1 s, which the data do not have."],
    ],
    answer: "A",
    explanation: "Mean $= 179 \\div 3 = 59.7$; recorded as **60 s**, matching the whole-second raw data.",
    hints: ["Match the precision of the raw readings."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student found the highest rate of an enzyme reaction at 40 °C, testing 20, 30, 40, 50 and 60 °C. Which improvement would best locate the optimum temperature more precisely?",
    options: [
      ["Add temperatures at smaller intervals between 30 °C and 50 °C", "Correct: the optimum could lie anywhere in that range."],
      ["Repeat 20 °C and 60 °C five more times", "These are far from the optimum."],
      ["Use a larger volume of enzyme at every temperature", "This changes a standardised variable, not the precision of the optimum."],
      ["Extend the range to 0 °C and 90 °C", "This adds values far from the optimum."],
    ],
    answer: "A",
    explanation: "Smaller intervals **around the peak** (35, 40, 45 °C) narrow down the optimum.",
    hints: ["Where is the uncertainty about the peak?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which type of chart should be used to show the mean height of seedlings of four different maize varieties?",
    options: [
      ["Bar chart", "Correct: the independent variable (variety) is categorical."],
      ["Line graph", "A line graph needs a continuous independent variable."],
      ["Histogram", "A histogram shows frequencies of a continuous variable in classes."],
      ["Scatter graph with a best-fit line", "Variety is not a numerical variable."],
    ],
    answer: "A",
    explanation: "Discontinuous (categorical) data → **bar chart**, with gaps between bars.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Units should be written in the column headings of a results table, not in each cell.",
    answer: true,
    explanation: "True. For example *Time / s*, with plain numbers below.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Repeating an experiment several times removes a systematic error.",
    answer: false,
    explanation: "False. Repeats reduce random error; a systematic error shifts every repeat in the same way.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an investigation of the effect of light intensity on the rate of oxygen production by pondweed, match each item to its role.",
    pairs: [
      ["Distance of the lamp from the plant", "Independent variable"],
      ["Bubbles released per minute", "Dependent variable"],
      ["Temperature of the water", "Standardised variable"],
      ["Same set-up kept in darkness", "Control"],
    ],
    explanation: "Change one, measure one, keep the rest constant, include a control.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The independent variable is plotted on the {{blank:a}} axis. Points are joined with ruled lines point to point or a smooth {{blank:b}} line.",
    blanks: [
      { id: "a", accepted: ["x"], choices: ["x", "y"] },
      { id: "b", accepted: ["best-fit"], choices: ["best-fit", "dotted", "freehand sketched", "coloured"] },
    ],
    explanation: "x-axis for the independent variable; ruled point-to-point or best-fit line.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a set-up identical to the experiment except that the factor being tested is absent (for example boiled enzyme).",
    accepted: ["control", "a control", "control experiment", "negative control"],
    wrong: ["replicate", "standardised variable"],
    explanation: "A **control** shows the result is due to the factor tested.",
  });

  // Calculations (data differ from the lesson)
  const reps = [7.4, 7.9, 7.6];
  const m = mean(reps);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Three readings of the volume of gas collected were 7.4 cm³, 7.9 cm³ and 7.6 cm³. Calculate the mean, to two decimal places.",
    value: m, dp: 2, unit: "cm³", wrong: [22.9, 7.9],
    explanation: t`$(7.4 + 7.9 + 7.6) \div 3 = 22.9 \div 3 = ${dpStr(m, 2)}\ \text{cm}^3$.`,
  });
  const time = 74;
  const rate = 1000 / time;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "The mean time for a reaction to reach its end point was 74 s. Calculate the rate as 1000 ÷ time, in s⁻¹, to three significant figures.",
    value: rate, sf: 3, unit: "s⁻¹", wrong: [sfStr(time / 1000, 3), 74000],
    explanation: t`$1000 \div 74 = ${sfStr(rate, 4)} \approx ${sfStr(rate, 3)}\ \text{s}^{-1}$.`,
  });
  const pe = pctError(0.5, 12.5);
  chk(pe, 4);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A measuring cylinder has 1 cm³ divisions. Taking the uncertainty as half a division, calculate the percentage error when measuring 12.5 cm³.",
    value: pe, unit: "%", wrong: [8, sfStr(pctError(0.5, 1) , 2)],
    explanation: t`1. Uncertainty $= \tfrac{1}{2} \times 1 = 0.5\ \text{cm}^3$.
2. Percentage error $= \dfrac{0.5}{12.5} \times 100 = 4\%$.
3. Using the full division (1 cm³) gives 8%.`,
    hints: ["Uncertainty is half the smallest division.", "Divide by the measured value."],
  });
  const before = 2.36, after = 2.07;
  const pc = pctChange(before, after);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A potato cylinder had a mass of 2.36 g before and 2.07 g after soaking in a sucrose solution. Calculate the percentage change in mass, to one decimal place, including the sign.",
    value: pc, dp: 1, unit: "%", wrong: [rnd(pctChange(after, before), 1), rnd(-pc, 1)],
    explanation: t`$\dfrac{2.07 - 2.36}{2.36} \times 100 = ${dpStr(pc, 1)}\%$. Dividing by the final mass gives the wrong base.`,
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would set out a table to record the results of an investigation into the effect of sucrose concentration (five concentrations, three replicates) on the time taken for yeast to produce 5 cm³ of carbon dioxide.",
    points: [
      "First column: sucrose concentration / % (or mol dm⁻³), the independent variable",
      "Columns for time for each of the three replicates, heading time / s, units in headings only",
      "A column for mean time / s (and rate, if calculated, with its unit)",
      "Values for each quantity recorded to the same number of decimal places (e.g. whole seconds)",
    ],
    modelAnswer: "The first column would be sucrose concentration / %. Then three columns headed time 1 / s, time 2 / s and time 3 / s, followed by mean time / s and, if wanted, rate / s⁻¹. Units appear only in the headings, and all times are recorded to whole seconds.",
    explanation: "Independent variable first; quantity / unit headings; replicates then processed values.",
    hints: ["Which variable goes in the first column?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess the risk of an investigation using iodine solution, starch and amylase in water baths at up to 60 °C, and state precautions.",
    points: [
      "Hazard: hot water / glassware in water bath; precaution: use tongs or a test-tube holder",
      "Hazard: iodine solution is an irritant / stains; precaution: wear eye protection, avoid skin contact",
      "Overall risk: low",
    ],
    modelAnswer: "Hot water at up to 60 °C could scald, so handle tubes with a holder or tongs. Iodine solution is an irritant, so wear eye protection and avoid skin contact. Overall the risk is low.",
    explanation: "Hazard + precaution, then a risk level.",
    hints: ["Name each hazard with a precaution, then the level."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "In an osmosis investigation, potato cylinders were blotted by hand and weighed on a balance reading to 0.01 g, at room temperature, with one cylinder per concentration. Suggest four specific improvements.",
    points: [
      "Use three or more cylinders per concentration and calculate means",
      "Standardise blotting (e.g. roll once on the same paper with the same pressure)",
      "Control temperature with a thermostatically controlled water bath",
      "Use more concentrations / smaller intervals near where the change in mass is zero / cut all cylinders from the same potato to the same size",
    ],
    modelAnswer: "Use at least three cylinders at each concentration and calculate means; standardise the blotting by rolling each cylinder once on the same paper; keep the tubes in a thermostatically controlled water bath; and add concentrations at smaller intervals near the point of no change, with all cylinders cut from the same potato to the same size.",
    explanation: "Improvements must be specific and linked to an error.",
    hints: ["Replicates, blotting, temperature, intervals."],
  });

  // Practice structured: catalase investigation
  const conc = [0.5, 1.0, 1.5, 2.0, 2.5];
  const vol = [[4.2, 4.5, 4.4], [8.1, 8.6, 8.3], [11.9, 12.4, 6.0], [14.6, 15.1, 14.8], [15.7, 16.2, 16.0]];
  const m15 = mean([vol[2][0], vol[2][1]]);
  const mAll15 = mean(vol[2]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo investigated the effect of hydrogen peroxide concentration on the volume of oxygen released by a potato extract (catalase) in 2 minutes at 25 °C.\n\n${table(["H₂O₂ concentration / %", "Volume 1 / cm³", "Volume 2 / cm³", "Volume 3 / cm³"], conc.map((c, i) => [c.toFixed(1), ...vol[i].map((x) => x.toFixed(1))]))}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the dependent variable.", accepted: ["volume of oxygen", "volume of oxygen released", "volume of oxygen released in 2 minutes", "oxygen volume", "volume of O2", "volume of gas"], wrong: ["concentration of hydrogen peroxide"], explanation: "The volume of oxygen is measured." }),
      P.mcq({
        label: "(b)", stem: "Which result is anomalous?",
        options: [["1.5% replicate 3", "Correct: 6.0 cm³ is about half the other two."], ["0.5% replicate 1", "4.2 is close to 4.5 and 4.4."], ["2.5% replicate 2", "16.2 is close to 15.7 and 16.0."], ["2.0% replicate 1", "14.6 is close to 15.1 and 14.8."]],
        answer: "A", explanation: "6.0 cm³ does not fit the other readings at 1.5%.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the mean volume at 1.5%, leaving out the anomalous result. Give your answer to two decimal places.",
        value: m15, dp: 2, unit: "cm³", wrong: [rnd(mAll15, 2)],
        explanation: t`$(11.9 + 12.4) \div 2 = ${dpStr(m15, 2)}\ \text{cm}^3$. Including the anomaly gives ${dpStr(mAll15, 2)}.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the trend in the results.",
        points: ["Volume increases with concentration, steeply from 0.5% to 2.0%", "Then increases less / levels off between 2.0% and 2.5% (quote e.g. means about 14.8 and 16.0 cm³)"],
        modelAnswer: "The volume of oxygen rises steadily with concentration from a mean of about 4.4 cm³ at 0.5% to 14.8 cm³ at 2.0%, then rises less steeply, to 16.0 cm³ at 2.5%.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest one source of systematic error and one source of random error.",
        points: ["Systematic: e.g. gas escaping before the bung is fitted each time / syringe or cylinder calibration / temperature of room not 25 °C throughout", "Random: e.g. reading the meniscus / variation in catalase in potato samples / timing the 2 minutes by hand"],
        modelAnswer: "A systematic error would be some oxygen escaping in the seconds before the bung is fitted each time, giving every volume too low. A random error would be variation in the catalase content of different potato samples, or misreading the meniscus.",
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Suggest a suitable control.",
        points: ["Boiled potato extract with the same H₂O₂ / water instead of extract"],
        modelAnswer: "Repeat with boiled potato extract (denatured catalase) and the same hydrogen peroxide.",
      }),
    ],
    explanation: "Identify variables, exclude anomalies from means, describe trends with data, distinguish error types.",
    hints: ["An anomaly does not fit the other replicates."],
    calculator: true,
  });

  const std = [["0.0", "blue"], ["0.25", "green"], ["0.50", "yellow"], ["0.75", "orange"], ["1.00", "red-brown"]];
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Tendai heated equal volumes of glucose standards and of an unknown sample with Benedict's solution for 5 minutes.\n\n${table(["Glucose concentration / %", "Colour"], std)}\n\nThe unknown gave a green-yellow colour.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the best estimate of the unknown's glucose concentration?",
        options: [["Between 0.25% and 0.50%", "Correct: green-yellow lies between green and yellow."], ["Between 0.50% and 0.75%", "That would be between yellow and orange."], ["Exactly 0.25%", "Green-yellow is not exactly the green standard."], ["Above 1.00%", "That would be red-brown or darker."]],
        answer: "A", explanation: "Green-yellow lies between the 0.25% (green) and 0.50% (yellow) standards.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State two variables that must be standardised for the comparison to be valid.",
        points: ["Volume of sample and of Benedict's solution", "Heating time (5 minutes) / temperature of water bath"],
        modelAnswer: "The volumes of sample and of Benedict's solution, and the time and temperature of heating.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest two ways to obtain a more precise estimate.",
        points: ["Prepare standards at smaller intervals between 0.25% and 0.50%", "Use a colorimeter to measure absorbance / filter, dry and weigh the precipitate (quantitative)"],
        modelAnswer: "Make extra standards between 0.25% and 0.50%, for example every 0.05%, and use a colorimeter to measure the colour (or filter and weigh the precipitate) rather than judging by eye.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why judging colours by eye is a source of error.",
        points: ["It is subjective / people perceive colours differently / hard to match intermediate shades"],
        modelAnswer: "Colour judgements are subjective, so intermediate shades are hard to match reliably.",
      }),
    ],
    explanation: "A series of standards allows a semi-quantitative estimate; smaller intervals or a colorimeter improve precision.",
    hints: ["Find the two standards the colour falls between."],
  });

  b.card("DEFINITION", "Define the **independent variable**.", "The variable deliberately changed by the investigator.");
  b.card("DEFINITION", "Define the **dependent variable**.", "The variable measured to find the effect of the independent variable.");
  b.card("CONCEPT", "Results table rules", "Independent variable first; headings as quantity / unit; no units in cells; consistent decimal places; processed values in extra columns.");
  b.card("FACT", "Minimum number of values of the independent variable", "At least five, with at least three replicates of each.");
  b.card("CONCEPT", "Systematic vs random error", "Systematic: shifts all readings the same way (not removed by repeats). Random: unpredictable, reduced by replicates and means.");
  b.card("FORMULA", "Percentage error", "(uncertainty ÷ measured value) × 100; uncertainty often half the smallest division.");
  b.card("FACT", "Significant figures for calculated values", "Same as the least precise data, or one more.");
  b.card("FACT", "Rate from a time", "Rate ∝ 1 ÷ time (often 1000 ÷ time).");
  b.card("CONCEPT", "Estimating concentration from a colour test", "Test a series of standards under identical conditions; the unknown lies between the two closest standards.");
});
