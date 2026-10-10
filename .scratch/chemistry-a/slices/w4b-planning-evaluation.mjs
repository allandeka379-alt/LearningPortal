// W4b: achem.skills.planning-evaluation (both boards; ZIMSEC Forms 5-6 practical P.3, Cambridge A Level P5.1)
import { concept, P, t, ce, Mr, linearFit, pctError, pctErrorDifference, VM_RTP, sfStr, dpStr } from "../lib.mjs";

concept("achem.skills.planning-evaluation", { file: "skills/planning-evaluation", keyPrefix: "skills.planning-evaluation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A student investigates how the concentration of hydrochloric acid affects the time taken for a piece of magnesium ribbon to dissolve. What is the dependent variable?",
    options: [
      ["the time taken for the magnesium to dissolve", "Correct: it is measured to see how it responds."],
      ["the concentration of hydrochloric acid", "This is changed deliberately: the independent variable."],
      ["the mass of magnesium ribbon used in each run", "This should be kept constant: a controlled variable."],
      ["the temperature of the acid", "This should be controlled, not measured as the outcome."],
    ],
    answer: "A",
    explanation: "Independent: what you change (concentration). Dependent: what you measure (time). Controlled: what you keep constant.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which apparatus is best for measuring exactly 25.0 cm³ of a solution to be titrated?",
    options: [
      ["a 25.0 cm³ volumetric pipette", "Correct: it delivers a fixed volume with small uncertainty."],
      ["a 50 cm³ measuring cylinder", "A measuring cylinder is far less precise."],
      ["a 100 cm³ beaker with graduation marks", "Beaker graduations are only rough guides."],
      ["a 250 cm³ volumetric flask", "This makes up a solution to 250 cm³; it cannot deliver 25.0 cm³."],
    ],
    answer: "A",
    explanation: "Fixed volumes: pipette. Variable volumes added: burette. Making up solutions: volumetric flask.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an experiment to measure the enthalpy change of neutralisation in a polystyrene cup, the results are always less exothermic than the accepted value. Which improvement deals with the main cause?",
    options: [
      ["insulate the cup and fit a lid", "Correct: heat loss to the surroundings is a systematic error that lowers every temperature rise."],
      ["repeat the experiment three times and take a mean", "Repeating reduces random error, not a systematic error that affects every run the same way."],
      ["use a measuring cylinder instead of a pipette", "This would make the volumes less precise."],
      ["record the final temperature after five minutes", "Waiting longer would let more heat escape."],
    ],
    answer: "A",
    explanation: "A consistent shortfall points to a systematic error (heat loss); reduce it by insulating or by extrapolating a temperature-time graph.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about errors are correct?\n\n1. Random errors cause repeated results to scatter either side of the true value.\n2. Repeating measurements and taking a mean reduces the effect of systematic errors.\n3. A systematic error shifts all results in the same direction.",
    options: [
      ["1 and 3 only", "Correct: repeats reduce random error, not systematic error."],
      ["1, 2 and 3", "Statement 2 is false: a systematic error affects every repeat equally."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["3 only", "Statement 1 is also true."],
    ],
    answer: "A",
    hints: ["Would repeating a reading with a mis-calibrated balance help?"],
    explanation: "Random errors scatter results and are reduced by repeating; systematic errors bias results one way and need a change of method or calibration.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The rate of a reaction is thought to follow rate = k[X]ⁿ. Which graph gives n directly as its gradient?",
    options: [
      ["lg(rate) against lg[X]", "Correct: lg(rate) = n lg[X] + lg k, a straight line of gradient n."],
      ["rate against [X]", "This is a straight line only if n = 1, and the gradient would be k, not n."],
      ["lg(rate) against 1/[X]", "This does not linearise rate = k[X]ⁿ."],
      ["lg(rate) against [X]", "Only one variable has been logged, so the line is not straight in general."],
    ],
    answer: "A",
    hints: ["Take logs of both sides of rate = k[X]ⁿ."],
    explanation: "Taking logarithms: lg(rate) = n lg[X] + lg k, of the form y = mx + c.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "In a plan to find how temperature affects the rate of a reaction, which statements describe good practice?\n\n1. Warm both reactant solutions separately in a thermostatted water bath before mixing.\n2. Use at least five different temperatures over a wide range.\n3. Use the same volumes and concentrations of reactants in every run.",
    options: [
      ["1, 2 and 3", "Correct: all three improve the validity of the results."],
      ["1 and 2 only", "Statement 3 is also good practice: volume and concentration are controlled variables."],
      ["2 and 3 only", "Statement 1 is also good practice: both solutions must start at the chosen temperature."],
      ["1 only", "Statements 2 and 3 are also good practice."],
    ],
    answer: "A",
    hints: ["Which variables must be controlled, and how many readings are needed for a trend?"],
    explanation: "Equilibrate solutions at the chosen temperature, use a good spread of values and keep every other variable constant.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "In a titration the titre is about 9 cm³. Which change would most reduce the percentage uncertainty in the titre?",
    options: [
      ["use a more dilute titrant to give a larger titre", "Correct: the ±0.10 cm³ uncertainty becomes a smaller percentage of a larger titre."],
      ["read the burette to the nearest 0.5 cm³ instead", "Reading less precisely increases the uncertainty."],
      ["use a 10 cm³ measuring cylinder instead of a burette", "A measuring cylinder is less precise than a burette."],
      ["do one accurate titration instead of several", "Fewer titrations make random errors more likely to go unnoticed; it does not reduce the uncertainty of each reading."],
    ],
    answer: "A",
    hints: ["Percentage uncertainty = absolute uncertainty ÷ value × 100."],
    explanation: "A larger titre with the same absolute uncertainty gives a smaller percentage uncertainty.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A student's graph of lg(rate) against lg[Y] is a straight line of gradient 0.98 and intercept −2.40. What can be concluded?",
    options: [
      ["It is first order in Y, and k is about 4.0 × 10⁻³.", "Correct: n ≈ 1 and k = 10⁻²·⁴⁰ ≈ 4.0 × 10⁻³."],
      ["The reaction is second order in Y, because the line is straight.", "The gradient (≈ 1), not the straightness, gives the order."],
      ["The reaction is zero order in Y, because the intercept is negative.", "The intercept gives lg k; the gradient gives the order."],
      ["The rate constant is −2.40, because it equals the intercept.", "The intercept is lg k, so k = 10⁻²·⁴⁰."],
    ],
    answer: "A",
    hints: ["Gradient = n; intercept = lg k."],
    explanation: "n = 0.98 ≈ 1; k = 10^(−2.40) = 3.98 × 10⁻³ ≈ 4.0 × 10⁻³.",
  });
  {
    const m = 0.1 * 0.05 * Mr("H2C2O4.2H2O");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A plan needs 100 cm³ of a 0.0500 mol dm⁻³ standard solution of hydrated ethanedioic acid, H₂C₂O₄·2H₂O (Mr 126.0). Calculate the mass of the solid to weigh out, in g.",
      value: m, sf: 3, unit: "g",
      wrong: [0.1 * 0.05 * Mr("H2C2O4"), 100 * 0.05 * Mr("H2C2O4.2H2O")],
      hints: ["Convert 100 cm³ to dm³ first."],
      explanation: `1. Amount = 0.0500 × 100 ÷ 1000 = 5.00 × 10⁻³ mol.\n2. Mass = 5.00 × 10⁻³ × 126.0 = ${sfStr(m, 3)} g.\n3. Using Mr of the anhydrous acid (${Mr("H2C2O4")}) forgets the water of crystallisation; not converting cm³ to dm³ gives a mass 1000 times too large.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A titre of 18.40 cm³ is calculated from two burette readings, each with an uncertainty of ±0.05 cm³. Calculate the percentage uncertainty in the titre, to two significant figures.",
    value: pctErrorDifference(0.05, 18.4), sf: 2, unit: "%",
    wrong: [pctError(0.05, 18.4)],
    explanation: `Absolute uncertainty = 2 × 0.05 = 0.10 cm³; percentage = 0.10 ÷ 18.40 × 100 = ${sfStr(pctErrorDifference(0.05, 18.4), 2)}%. Using only one reading's uncertainty gives ${sfStr(pctError(0.05, 18.4), 2)}%.`,
  });
  {
    const tot = pctErrorDifference(0.005, 1.25) + pctError(0.3, 250);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A standard solution is made by weighing 1.25 g of solid by difference on a balance reading to ±0.005 g, and making it up in a 250.0 cm³ volumetric flask with an uncertainty of ±0.3 cm³. Calculate the overall percentage uncertainty in the concentration, to two significant figures.",
      value: tot, sf: 2, unit: "%",
      wrong: [pctError(0.005, 1.25) + pctError(0.3, 250)],
      hints: ["Weighing by difference uses two readings.", "Add percentage uncertainties when quantities are divided."],
      explanation: `1. Mass: 2 × 0.005 = 0.010 g; 0.010 ÷ 1.25 × 100 = ${sfStr(pctErrorDifference(0.005, 1.25), 2)}%.\n2. Volume: 0.3 ÷ 250.0 × 100 = ${sfStr(pctError(0.3, 250), 2)}%.\n3. Concentration = mass ÷ (Mr × volume), so the percentages add: ${sfStr(tot, 2)}%.\n4. Using a single balance reading gives ${sfStr(pctError(0.005, 1.25) + pctError(0.3, 250), 2)}%.`,
    });
  }
  {
    const v = (0.08 / Mr("Mg")) * VM_RTP * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A plan uses 0.0800 g of magnesium with excess hydrochloric acid, collecting the hydrogen in a 100 cm³ gas syringe: Mg + 2HCl → MgCl₂ + H₂. Calculate the volume of hydrogen expected, in cm³ at room conditions. Ar(Mg) = 24.3; molar gas volume 24.0 dm³ mol⁻¹.",
      value: v, sf: 3, unit: "cm³",
      wrong: [v / 2, v / 1000],
      hints: ["1 mol Mg gives 1 mol H₂."],
      explanation: `n(Mg) = 0.0800 ÷ 24.3 = ${sfStr(0.08 / 24.3, 3)} mol = n(H₂); V = ${sfStr(0.08 / 24.3, 3)} × 24 000 = ${sfStr(v, 3)} cm³, which fits in a 100 cm³ syringe.`,
    });
  }
  {
    const m = (80 / 24000) * Mr("CaCO3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A plan to study the rate of reaction of marble chips (CaCO₃) with excess hydrochloric acid should produce about 80 cm³ of carbon dioxide in total, so that a 100 cm³ gas syringe is not overfilled. Calculate the mass of calcium carbonate to use, in g. Mr(CaCO₃) = 100.1; molar gas volume 24.0 dm³ mol⁻¹.",
      value: m, sf: 3, unit: "g",
      wrong: [(80 / 24) * Mr("CaCO3")],
      hints: ["CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂."],
      explanation: `1. n(CO₂) = 80 ÷ 24 000 = ${sciLike(80 / 24000)} mol = n(CaCO₃).\n2. Mass = ${sciLike(80 / 24000)} × 100.1 = ${sfStr(m, 3)} g.\n3. Forgetting to convert cm³ to dm³ gives a mass 1000 times too large.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An anomalous result should be included when calculating a mean, so that no data are wasted.",
    answer: false,
    explanation: "False. Identify the anomaly, suggest its cause, and leave it out of means and lines of best fit (or repeat that measurement).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each piece of standard practice with its purpose.",
    pairs: [
      ["weighing by difference", "finds the mass actually transferred, allowing for solid left behind"],
      ["heating to constant mass", "makes sure decomposition or dehydration is complete"],
      ["repeating titrations until two are concordant", "gives reliable titres free of random slips"],
      ["using a thermostatted water bath", "keeps the temperature constant"],
      ["taking extra readings near the end point", "locates a steep change accurately"],
    ],
    explanation: "Each practice addresses a specific source of error.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about plotting graphs.",
    template: "The {{blank:a}} variable is plotted on the x-axis. To find an order of reaction, plot lg(rate) against lg(concentration): the {{blank:b}} of the line is the order and the {{blank:c}} is lg k.",
    blanks: [
      { id: "a", accepted: ["independent"], choices: ["independent", "dependent", "controlled"] },
      { id: "b", accepted: ["gradient"], choices: ["gradient", "intercept", "area"] },
      { id: "c", accepted: ["intercept"], choices: ["intercept", "gradient", "area"] },
    ],
    explanation: "Independent on x; lg rate = n lg[X] + lg k.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the piece of apparatus used to make up a standard solution to an accurately known volume.",
    accepted: ["volumetric flask", "graduated flask", "standard flask", "a volumetric flask"],
    wrong: ["measuring cylinder"],
    explanation: "A volumetric (graduated) flask, filled to the mark.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how to determine accurately the mass of water lost when a sample of hydrated copper(II) sulfate is heated, including how you would know that all the water has been removed.",
    points: ["Weigh a clean, dry crucible (with lid), add the hydrated salt and weigh again (to 0.01 g or better)", "Heat gently at first, then more strongly, avoiding spitting/overheating (which would decompose the anhydrous salt)", "Cool in a desiccator and reweigh", "Repeat heating, cooling and weighing until two consecutive masses agree (constant mass); mass lost = water"],
    modelAnswer: "Weigh an empty crucible and lid, add about 2-3 g of hydrated copper(II) sulfate and reweigh. Heat gently, then more strongly, without letting the solid blacken (which would mean the sulfate is decomposing). Let the crucible cool in a desiccator so that it does not absorb moisture, and weigh it. Heat, cool and weigh again until two successive masses agree: the solid is then at constant mass and the total loss in mass is the water of crystallisation.",
    hints: ["How do you know the reaction has finished?"],
    explanation: "Heating to constant mass with cooling in a desiccator.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A student finds the rate of a reaction by timing how long a cross takes to disappear under a beaker. Identify two weaknesses of this method and suggest an improvement for each.",
    points: ["Judging when the cross disappears is subjective (different people/lighting give different times)", "Improvement: use a light sensor/colorimeter and data logger to detect a fixed turbidity, or have the same person judge under the same lighting", "Temperature may not be controlled (or the depth of liquid varies); improvement: use a water bath (or the same total volume in the same beaker)"],
    modelAnswer: "Deciding when the cross 'disappears' is subjective and depends on the observer and the lighting; a light sensor or colorimeter with a data logger would detect the same degree of cloudiness each time. The temperature is not controlled and may change between runs; carrying out each run in a thermostatted water bath, with the same total volume in the same beaker, would fix this.",
    hints: ["Think about judgement and control of variables."],
    explanation: "Specific weakness, its effect, and a specific improvement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why 'use the same equipment each time' is not accepted as a controlled variable in a plan.",
    points: ["A controlled variable must be a quantity that could change and affect the result, such as temperature, concentration or volume", "'Same equipment' is vague; the plan must name the variable and how it is kept constant (e.g. temperature kept at 30 °C in a water bath)"],
    modelAnswer: "A controlled variable is a measurable quantity that would affect the dependent variable if it changed, such as temperature or the volume of a reactant. 'The same equipment' does not name such a quantity; the plan should say, for example, 'temperature kept at 30 °C in a thermostatted water bath'.",
    hints: ["What is a variable?"],
    explanation: "Controls must be named quantities with a method of keeping them constant.",
  });
  {
    const c = [0.2, 0.4, 0.6, 0.8, 1.0];
    const f = [1.02, 0.98, 1.15, 1.01, 0.99];
    const r = c.map((x, i) => Number((0.31 * x * f[i]).toPrecision(3)));
    const fit = linearFit(c.map((x, i) => [x, r[i]]).filter((_, i) => i !== 2));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Thandeka measured the initial rate of oxygen production when hydrogen peroxide solutions of different concentrations were added to the same mass of manganese(IV) oxide catalyst at 25 °C: $\\ce{2H2O2 -> 2H2O + O2}$.\n\n| [H₂O₂] / mol dm⁻³ | ${c.map((x) => x.toFixed(1)).join(" | ")} |\n|---|---|---|---|---|---|\n| initial rate / cm³ O₂ s⁻¹ | ${r.map((x) => sfStr(x, 3)).join(" | ")} |`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Identify the anomalous result (give the concentration).", accepted: ["0.6", "0.60", "0.6 mol dm-3", "0.60 mol dm-3"], normalise: ["trim", "collapse_whitespace"], wrong: ["1.0"], explanation: "At 0.6 mol dm⁻³ the rate lies well above the line through the other points." }),
        P.num({ label: "(b)", marks: 2, stem: "Using the other four points, determine the gradient of the graph of initial rate against [H₂O₂], in cm³ s⁻¹ per mol dm⁻³.", value: fit.m, sf: 2, tol: 0.01, explanation: `Best-fit gradient ≈ ${sfStr(fit.m, 2)} (for example (${sfStr(r[4], 3)} − ${sfStr(r[0], 3)}) ÷ (1.0 − 0.2) = ${sfStr((r[4] - r[0]) / 0.8, 3)}).` }),
        P.mcq({ label: "(c)", marks: 1, stem: "The line passes very close to the origin. What does this show?", options: [
          ["Rate ∝ [H₂O₂]: first order in H₂O₂.", "Correct: a straight line through the origin means rate ∝ concentration."],
          ["The reaction is second order in H₂O₂.", "Second order would give a curve on a rate–concentration graph."],
          ["The reaction is zero order in H₂O₂.", "Zero order would give a horizontal line."],
          ["The catalyst is used up during the reaction.", "The graph says nothing about the catalyst being consumed."],
        ], answer: "A", explanation: "Straight line through the origin: rate = k[H₂O₂]." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two variables that Thandeka should have controlled, and how.", points: ["Temperature: carry out each run in a water bath at 25 °C", "Mass and particle size (surface area) of MnO₂, and total volume of solution: weigh the same mass of the same powder; use the same total volume"], modelAnswer: "The temperature, kept at 25 °C using a thermostatted water bath; and the mass and particle size of the manganese(IV) oxide (same mass of the same powder each time), with the same total volume of solution." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest one possible cause of the anomalous result and how the experiment could be made more reliable.", points: ["Cause: e.g. more catalyst or a finer powder used, a higher temperature, or a timing/reading error for that run", "Repeat each concentration (at least twice) and take means, discarding anomalies"], modelAnswer: "The anomalous run may have used slightly more or finer manganese(IV) oxide, or been warmer, or the gas volume may have been misread at the timing point. Each concentration should be repeated and a mean of concordant results used." }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe how the initial rate would be found from a graph of volume of oxygen against time for one run.", points: ["Draw a tangent to the curve at time zero (at the start)", "The gradient of this tangent (volume ÷ time) is the initial rate in cm³ s⁻¹"], modelAnswer: "Plot volume of oxygen against time, draw a tangent to the curve at t = 0, and calculate its gradient (change in volume ÷ change in time): this is the initial rate in cm³ s⁻¹." }),
        P.manual({ label: "(g)", marks: 2, stem: "State one hazard in this experiment and a precaution.", points: ["Hydrogen peroxide (especially concentrated) is an irritant/corrosive oxidiser; or the reaction may froth and pressure can build up in a sealed apparatus", "Wear eye protection and gloves / use dilute solutions / do not seal the apparatus (use a gas syringe that can move freely)"], modelAnswer: "Hydrogen peroxide is an oxidising irritant to skin and eyes, so wear eye protection and gloves; the gas produced must be collected in a free-moving gas syringe so that pressure cannot build up." }),
      ],
      hints: ["Leave the anomaly out of the line.", "Straight line through the origin: rate ∝ concentration."],
      explanation: `Anomaly at 0.6 mol dm⁻³; gradient ≈ ${sfStr(fit.m, 2)}; first order in H₂O₂.`,
    });
  }
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Tatenda plans to find which of three local maize-meal brands contains the most starch. Starch reacts with iodine solution to form a blue-black colour whose intensity can be measured with a colorimeter.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the independent and dependent variables, and one controlled variable.", points: ["Independent: the brand of maize meal; dependent: colorimeter absorbance (intensity of blue-black colour)", "Controlled (any one): mass of maize meal; volume of water; volume and concentration of iodine solution; temperature; time before reading"], modelAnswer: "Independent variable: the brand of maize meal. Dependent variable: the absorbance reading of the blue-black colour. Controlled variable: the mass of meal used (e.g. 1.00 g in 100 cm³ of water), with the same volume and concentration of iodine solution." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how a calibration graph would allow the starch content to be found.", points: ["Make standard starch solutions of known concentrations and add the same volume of iodine solution to each", "Measure the absorbance of each and plot absorbance against starch concentration (calibration graph)", "Measure the absorbance of each maize-meal sample treated the same way and read its starch concentration from the graph"], modelAnswer: "Prepare a set of standard starch solutions of known concentration, add the same volume of iodine solution to each, and measure their absorbances with a colorimeter. Plot absorbance against concentration. Then treat each maize-meal sample in exactly the same way, measure its absorbance and read the starch concentration from the calibration graph." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two reasons why the results might not be valid, and an improvement for each.", points: ["Starch may not be fully dispersed/dissolved from the meal: boil the meal with water for a fixed time and filter, or use the same procedure for all samples", "Particles cause cloudiness that also absorbs/scatters light: filter or centrifuge before measuring; or colour fades with time/temperature: read at a fixed time after mixing"], modelAnswer: "Not all the starch may be extracted from the meal; each sample should be boiled with water for the same time and filtered. Suspended particles scatter light and raise the absorbance; filtering or centrifuging before measurement, and reading at a fixed time after adding iodine, would make the comparison fair." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which result would show that the method is precise?", options: [
        ["repeat readings for each brand agree closely", "Correct: precision is the closeness of repeated measurements."],
        ["the readings for all three brands are the same", "This would show the brands are similar, not that the method is precise."],
        ["the calibration line passes through the origin", "This supports the calibration, not the precision of repeats."],
        ["one brand gives a much higher reading than the other two", "That is a finding, not a measure of precision."],
      ], answer: "A", explanation: "Precise results are close together when repeated." }),
      P.manual({ label: "(e)", marks: 1, stem: "State one safety precaution.", points: ["Iodine solution stains and irritates: wear gloves and eye protection (or take care with boiling water/hot apparatus)"], modelAnswer: "Wear eye protection and gloves because iodine solution stains skin and irritates eyes, and take care with boiling water." }),
    ],
    hints: ["A calibration graph uses standards of known concentration."],
    explanation: "Plan with clear variables, a calibration graph, and evaluation of extraction and turbidity problems.",
  });
  b.card("DEFINITION", "Independent, dependent, controlled variables", "Changed deliberately (x-axis); measured (y-axis); kept constant.");
  b.card("FORMULA", "Percentage uncertainty", "Absolute uncertainty ÷ value × 100; for a difference of two readings use 2u.");
  b.card("CONCEPT", "Combining uncertainties", "When quantities are multiplied or divided, add their percentage uncertainties.");
  b.card("CONCEPT", "Order from a log graph", "lg(rate) = n lg[X] + lg k: gradient n, intercept lg k.");
  b.card("CONCEPT", "Random vs systematic error", "Random: scatter, reduced by repeats. Systematic: all results shifted one way; change the method or calibrate.");
  b.card("FACT", "Standard practice in plans", "Weigh by difference; volumetric flask; concordant titres; heat to constant mass; water bath; more readings near rapid change.");
  b.card("CONCEPT", "Good safety statements", "Name the hazard of a named substance and the precaution: e.g. ethanol is flammable, heat with a water bath.");
  b.card("CONCEPT", "Anomalous results", "Identify, suggest a specific cause, exclude from means and lines of best fit, repeat if possible.");
  b.card("CONCEPT", "Reducing percentage uncertainty", "Measure a larger quantity (larger titre, mass or ΔT) or use more precise apparatus.");
});

function sciLike(x) {
  return sfStr(x, 3);
}
