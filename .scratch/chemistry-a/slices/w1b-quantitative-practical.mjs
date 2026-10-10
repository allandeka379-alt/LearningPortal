// W1b: achem.skills.quantitative-practical
import { concept, P, t, ce, titre, meanTitre, pctError, pctErrorDifference, molesFromSolution, concFrom, sfStr, dpStr, chk, mean, linearFit, heatQ, Mr, moles } from "../lib.mjs";

concept("achem.skills.quantitative-practical", { file: "skills/quantitative-practical", keyPrefix: "skills.quantitative-practical" }, (b) => {
  // --- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which burette reading is recorded correctly?",
    options: [
      ["17.35 cm³", "Correct: two decimal places, ending in 0 or 5, the precision of a burette."],
      ["17.3 cm³", "One decimal place does not show the full precision of the burette (to 0.05 cm³)."],
      ["17.325 cm³", "Three decimal places claim a precision the burette cannot give."],
      ["17.37 cm³", "A burette is read to the nearest 0.05 cm³, so the second decimal place is 0 or 5."],
    ],
    answer: "A",
    explanation: "Burette readings are recorded to the nearest 0.05 cm³, always with two decimal places (for example 0.00, 17.35, 24.80).",
  });
  {
    const tt = [23.85, 23.60, 23.70, 23.65];
    const { mean: m, used } = meanTitre(tt.slice(1));
    chk(m, 23.65, 1e-9, "mean");
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "A student's titres were: rough 23.85 cm³, then 23.60, 23.70 and 23.65 cm³. What mean titre should be used?",
      options: [
        ["23.65 cm³", `Correct: the three accurate titres agree within 0.10 cm³ (${used.map((x) => x.toFixed(2)).join(", ")}), so their mean is used.`],
        ["23.70 cm³", "This is the mean including the rough titre, which must be left out."],
        ["23.63 cm³", "This averages only 23.60 and 23.65; 23.70 is also concordant with them, so it is included."],
        ["23.85 cm³", "The rough titre is only a guide to where the end point is."],
      ],
      answer: "A",
      explanation: `Leave out the rough titre and average the concordant accurate titres: (23.60 + 23.70 + 23.65) ÷ 3 = ${dpStr(m, 2)} cm³.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a pipette rinsed with the solution it is going to deliver, rather than with distilled water, before use?",
    options: [
      ["Water left inside would dilute the solution, so fewer moles would be delivered.", "Correct: any water film dilutes the 25.0 cm³ portion, lowering the amount of solute delivered."],
      ["The solution removes grease that distilled water cannot dissolve.", "Grease is removed by cleaning beforehand, not by the rinse; the rinse is about dilution."],
      ["Rinsing with the solution increases the volume the pipette delivers.", "The pipette delivers the same volume; the problem is the concentration of that volume."],
      ["Distilled water would react with the solute in the pipette.", "Water does not react with the usual titration solutions; it simply dilutes them."],
    ],
    answer: "A",
    explanation: "Rinsing with the solution itself means any liquid left on the glass has the same concentration, so the pipette delivers the intended amount of solute. The conical flask, by contrast, may be wet with water: water there does not change the amount of solute already pipetted in.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change would reduce the percentage uncertainty in a titre?",
    options: [
      ["Using a more dilute titrant so that the titre is larger", "Correct: the uncertainty (±0.10 cm³) stays the same while the titre gets bigger, so the percentage falls."],
      ["Using a more concentrated titrant so that the titre is smaller", "A smaller titre with the same ±0.10 cm³ uncertainty gives a larger percentage uncertainty."],
      ["Reading the burette from slightly above the meniscus", "Parallax gives a systematic reading error; it never improves precision."],
      ["Adding extra indicator to make the colour change sharper", "More indicator does not change the burette's uncertainty and can even shift the end point."],
    ],
    answer: "A",
    hints: ["Percentage uncertainty = uncertainty ÷ titre × 100.", "Which quantity can you change without changing the burette?"],
    explanation: "Percentage uncertainty = 0.10 ÷ titre × 100. The burette's uncertainty is fixed, so the only way to lower the percentage is a larger titre (for example a more dilute titrant, or a larger pipette volume of the other solution).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "In a thermometric experiment, a student mixes acid and alkali in a polystyrene cup and records only the highest temperature reached. What is the main effect of heat loss on the calculated enthalpy change of neutralisation?",
    options: [
      ["The temperature rise is too small, so ΔH is less negative than the true value.", "Correct: heat escapes while the mixture is warming, so the peak is lower than it would be with no loss."],
      ["The temperature rise is too large, so ΔH is more negative than the true value.", "Heat loss lowers the peak temperature; it cannot raise it."],
      ["Heat loss affects only the rate, not the size, of the temperature rise.", "Lost energy is not measured, so it reduces the recorded rise."],
      ["The error is random, so repeating the experiment and averaging removes it.", "Heat loss is systematic: every repeat loses heat in the same direction."],
    ],
    answer: "A",
    hints: ["Is the error systematic or random?", "Where does the lost energy go, and is it measured?"],
    explanation: "Heat lost to the surroundings is a systematic error: the measured ΔT is too small, so the magnitude of ΔH is too small (less negative). A lid, insulation and extrapolating the cooling curve back to the time of mixing reduce it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statements about heating a hydrated salt to constant mass are correct?\n\n1. Weighing the crucible while it is still hot gives a more accurate mass.\n2. The crucible and contents are heated, cooled and weighed repeatedly until two masses agree.\n3. Constant mass shows that all the water of crystallisation has been driven off.",
    options: [
      ["1, 2 and 3", "Statement 1 is wrong: a hot crucible sets up convection currents and gives an unreliable (usually low) reading."],
      ["2 and 3 only", "Correct: statements 2 and 3 describe the method and its purpose; 1 is wrong."],
      ["1 and 2 only", "Statement 1 is wrong, and statement 3 is correct."],
      ["1 only", "Statement 1 is the wrong one; 2 and 3 are correct."],
    ],
    answer: "B",
    explanation: "Heat, cool (in a desiccator or on a heatproof mat) and weigh; repeat until consecutive masses agree, which shows the loss of water is complete. Weigh only when cool: rising warm air makes the balance read wrongly and a hot crucible can damage the balance.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which statements describe random errors?\n\n1. Small differences in judging the exact colour change at the end point.\n2. Starting or stopping a stop-clock a fraction of a second early or late in a clock reaction.\n3. A balance that always reads 0.05 g too high.",
    options: [
      ["1 and 2 only", "Correct: judging an end point and timing by hand scatter randomly either way."],
      ["1, 2 and 3", "Statement 3 is systematic: every mass is too high by the same amount."],
      ["2 and 3 only", "Statement 3 is systematic, and statement 1 is random."],
      ["1 only", "Statement 2 is also random: reaction time can make a reading early or late."],
    ],
    answer: "A",
    hints: ["A random error can make a reading too high or too low.", "A systematic error always shifts the reading the same way."],
    explanation: "Random errors scatter readings on both sides of the true value and are reduced by repeating and averaging (statements 1 and 2). A balance with a constant offset (statement 3) is a systematic error: averaging does not help; recalibrating or zeroing the balance does.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A student calculates a concentration from a mass of 1.26 g (3 s.f.), a volume of 250.0 cm³ (4 s.f.) and a titre of 22.45 cm³ (4 s.f.). To how many significant figures should the final concentration be given?",
    options: [
      ["3 or 4", "Correct: the least precise data have 3 s.f., so give 3 (or one more, 4) s.f."],
      ["2", "Two s.f. throws away precision the data support."],
      ["5", "Five s.f. claims more precision than any of the data."],
      ["Any number, if the working is shown", "The precision of the answer must match the data."],
    ],
    answer: "A",
    explanation: "Give a calculated value to the same number of significant figures as the least precise measurement (here 3), or one more. Carry full values through the working and round only at the end.",
  });
  // --- Numerical
  {
    const p = pctErrorDifference(0.05, 18.4);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: "A titre of 18.40 cm³ is obtained from two burette readings, each uncertain by ±0.05 cm³. Calculate the percentage uncertainty in the titre, to two significant figures.",
      value: p, sf: 2, unit: "%",
      wrong: [sfStr(pctError(0.05, 18.4), 2)],
      explanation: `The titre is the difference of two readings, so its uncertainty is 2 × 0.05 = 0.10 cm³. Percentage uncertainty = 0.10 ÷ 18.40 × 100 = ${sfStr(p, 2)}%. Using only 0.05 cm³ (${sfStr(pctError(0.05, 18.4), 2)}%) forgets the second reading.`,
    });
  }
  {
    const dT = 34.6 - 22.2;
    const p = pctErrorDifference(0.1, dT);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A thermometer graduated every 0.2 °C is read to ±0.1 °C. The temperature of a solution rose from 22.2 °C to 34.6 °C. Calculate the percentage uncertainty in the temperature change, to two significant figures.",
      value: p, sf: 2, unit: "%",
      wrong: [sfStr(pctError(0.1, dT), 2)],
      hints: ["Find ΔT first.", "Two readings, each ±0.1 °C."],
      explanation: `ΔT = 34.6 − 22.2 = ${dpStr(dT, 1)} °C. Uncertainty in ΔT = 2 × 0.1 = 0.2 °C. Percentage uncertainty = 0.2 ÷ ${dpStr(dT, 1)} × 100 = ${sfStr(p, 2)}%.`,
    });
  }
  {
    const t1 = titre(1.40, 22.75), t2 = titre(0.65, 21.95), t3 = titre(2.20, 23.60);
    const { mean: m } = meanTitre([t1, t2, t3]);
    const n = molesFromSolution(m, 0.0480);
    const c = concFrom(2 * n, 10.0);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A student pipetted 10.0 cm³ of sodium hydroxide solution into a conical flask and titrated it with 0.0480 mol dm⁻³ sulfuric acid.

| Titration | 1 | 2 | 3 |
|---|---|---|---|
| final burette reading / cm³ | 22.75 | 21.95 | 23.60 |
| initial burette reading / cm³ | 1.40 | 0.65 | 2.20 |

$\ce{2NaOH + H2SO4 -> Na2SO4 + 2H2O}$

Calculate the concentration of the sodium hydroxide, in mol dm⁻³, to three significant figures.`,
      value: c, sf: 3, unit: "mol/dm³",
      wrong: [sfStr(concFrom(n, 10.0), 3)],
      hints: ["Work out each titre and check which are concordant.", "Use the 2 : 1 mole ratio of NaOH to H₂SO₄."],
      explanation: t`1. Titres: ${dpStr(t1, 2)}, ${dpStr(t2, 2)} and ${dpStr(t3, 2)} cm³; all agree within 0.10 cm³, so mean = ${dpStr(m, 2)} cm³.
2. Amount of $\ce{H2SO4}$ = ${dpStr(m, 2)} ÷ 1000 × 0.0480 = ${sfStr(n, 4)} mol.
3. Amount of NaOH = 2 × ${sfStr(n, 4)} = ${sfStr(2 * n, 4)} mol.
4. [NaOH] = ${sfStr(2 * n, 4)} ÷ 0.0100 dm³ = ${sfStr(c, 3)} mol dm⁻³. Forgetting the 2 : 1 ratio gives ${sfStr(concFrom(n, 10.0), 3)} mol dm⁻³.`,
    });
  }
  {
    const crucible = 15.37, hyd = 17.93, an = 16.78;
    const water = hyd - an;
    const pct = (water / (hyd - crucible)) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "An empty crucible weighs 15.37 g. With hydrated salt it weighs 17.93 g; after heating to constant mass it weighs 16.78 g. Calculate the percentage by mass of water in the hydrated salt, to three significant figures.",
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr((water / (an - crucible)) * 100, 3)],
      hints: ["Mass of hydrated salt = 17.93 − 15.37.", "Mass of water = loss in mass on heating."],
      explanation: `1. Mass of hydrated salt = 17.93 − 15.37 = ${dpStr(hyd - crucible, 2)} g.\n2. Mass of water lost = 17.93 − 16.78 = ${dpStr(water, 2)} g.\n3. Percentage of water = ${dpStr(water, 2)} ÷ ${dpStr(hyd - crucible, 2)} × 100 = ${sfStr(pct, 3)}%. Dividing by the anhydrous mass instead gives ${sfStr((water / (an - crucible)) * 100, 3)}%.`,
    });
  }
  {
    const pts = [[0.10, 0.0042], [0.20, 0.0083], [0.30, 0.0126], [0.40, 0.0167]];
    const { m } = linearFit(pts);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "In a clock reaction, 1/time (s⁻¹) was measured for four concentrations of one reactant (mol dm⁻³):\n\n| concentration / mol dm⁻³ | 0.10 | 0.20 | 0.30 | 0.40 |\n|---|---|---|---|---|\n| 1/time / s⁻¹ | 0.0042 | 0.0083 | 0.0126 | 0.0167 |\n\nThe points lie on a straight line through the origin. Calculate the gradient of the best-fit line, in dm³ mol⁻¹ s⁻¹, to two significant figures.",
      value: m, sf: 2, unit: "dm³/mol/s",
      hints: ["Gradient = change in y ÷ change in x, using points far apart on the line.", "For example from (0.10, 0.0042) to (0.40, 0.0167)."],
      explanation: `Using the end points of the line: (0.0167 − 0.0042) ÷ (0.40 − 0.10) = ${sfStr((0.0167 - 0.0042) / 0.3, 3)}; the least-squares gradient is ${sfStr(m, 3)}. To two significant figures the gradient is ${sfStr(m, 2)} dm³ mol⁻¹ s⁻¹. A straight line through the origin means 1/time (proportional to rate) is proportional to concentration: first order in this reactant.`,
    });
  }
  // --- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Repeating a calorimetry experiment several times and averaging the results removes the error caused by heat loss to the surroundings.",
    answer: false,
    explanation: "False. Heat loss is systematic: every repeat loses heat, so every ΔT is too small. Averaging reduces random error only; insulation, a lid or extrapolation of the cooling curve deals with heat loss.",
  });
  // --- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measurement with the precision to which it is normally recorded.",
    pairs: [["burette reading", "nearest 0.05 cm³"], ["mass on a two-place balance", "nearest 0.01 g"], ["temperature on a 1 °C thermometer", "nearest 0.5 °C"], ["volume from a 25 cm³ pipette", "25.0 cm³ (fixed)"]],
    explanation: "Record each reading to the precision of the instrument: burette 0.05 cm³ (two decimal places), two-place balance 0.01 g, 1 °C thermometer 0.5 °C, and a pipette volume as its stated value (25.0 cm³).",
  });
  // --- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of titration technique.",
    template: "The burette is rinsed with {{blank:a}} before filling. Near the end point the titrant is added {{blank:b}} while the flask is swirled over a {{blank:c}} tile.",
    blanks: [
      { id: "a", accepted: ["the titrant"], choices: ["the titrant", "distilled water", "the indicator"] },
      { id: "b", accepted: ["dropwise"], choices: ["dropwise", "quickly", "in 1 cm³ portions"] },
      { id: "c", accepted: ["white"], choices: ["white", "black", "glass"] },
    ],
    explanation: "Rinse the burette with the solution it will hold so it is not diluted; add the titrant dropwise near the end point; a white tile makes the colour change easy to see.",
  });
  // --- Short
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the name of the piece of apparatus used to make up a standard solution to an exact volume such as 250.0 cm³.",
    accepted: ["volumetric flask", "graduated flask", "standard flask", "250 cm3 volumetric flask", "volumetric flask 250 cm3"],
    wrong: ["measuring cylinder", "conical flask"],
    explanation: "A **volumetric (graduated) flask** has a single calibration mark; the solution is made up so the bottom of the meniscus sits on the mark, then the flask is stoppered and inverted to mix.",
  });
  // --- Manual
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how you would prepare 250.0 cm³ of a standard solution from a weighed sample of a pure solid.",
    points: [
      "Weigh the solid accurately in a weighing bottle and weigh the bottle again after tipping (weighing by difference).",
      "Dissolve the solid in a small volume of distilled water in a beaker (warm or stir if needed, then cool).",
      "Transfer the solution to a 250 cm³ volumetric flask, rinsing the beaker (and stirring rod and funnel) into the flask.",
      "Make up to the mark with distilled water (bottom of the meniscus on the line at eye level) and invert the stoppered flask several times to mix.",
    ],
    modelAnswer: "Weigh the solid in a weighing bottle, tip it into a beaker and reweigh the bottle so the mass transferred is known. Dissolve in a little distilled water, transfer to a 250 cm³ volumetric flask, rinsing the beaker and rod into the flask, make up to the mark with distilled water so the bottom of the meniscus is on the line, stopper and invert to mix.",
    hints: ["Think about every place solid could be lost.", "How do you make sure the solution is uniform?"],
    explanation: "Weighing by difference and rinsing every vessel into the flask make sure all the weighed solute ends up in exactly 250.0 cm³; mixing makes the concentration uniform.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "In a gas-volume experiment, a student drops magnesium ribbon into acid in a conical flask and then quickly fits a bung connected to a gas syringe. Identify the main source of error in this method, state its effect on the measured volume, and suggest an improvement.",
    points: [
      "Gas escapes before the bung is fitted.",
      "The measured volume of gas is too small (a systematic error).",
      "Suspend the magnesium (or place the acid) in a small tube inside the flask, fit the bung, then tip to mix; or use a divided flask.",
    ],
    modelAnswer: "Some hydrogen escapes in the time between adding the magnesium and fitting the bung, so the volume recorded is too low. Put the acid in a small tube inside the flask (or hang the ribbon from the bung), fit the bung first and then tip the flask to start the reaction.",
    hints: ["What happens in the second or two before the bung is in?"],
    explanation: "Always name the error, its direction and a specific improvement that removes it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "In a thermometric experiment the temperature of a solution was recorded every 30 s for 3 minutes, a solid was added at 3.5 minutes, and readings continued every 30 s until 9 minutes. Explain how the temperature change at the moment of mixing is found from a graph of the results, and why this is better than using the highest reading.",
    points: [
      "Draw a best-fit line through the readings before mixing and extrapolate it forward to 3.5 minutes.",
      "Draw a best-fit line through the cooling readings after the maximum and extrapolate it back to 3.5 minutes.",
      "ΔT is the vertical difference between the two lines at 3.5 minutes; this corrects for heat lost while the reaction was taking place (the highest reading underestimates ΔT).",
    ],
    modelAnswer: "Plot temperature against time. Extrapolate the line of the steady readings before mixing forward to 3.5 min and the cooling line after the peak back to 3.5 min. The vertical gap between them at the time of mixing is ΔT. This allows for the heat lost to the surroundings while the temperature was rising, so it is larger and more accurate than the highest reading minus the start temperature.",
    hints: ["Two lines are needed.", "Both are taken to the same time."],
    explanation: "Extrapolating to the time of mixing estimates the temperature that would have been reached if the reaction had been instantaneous with no heat loss.",
  });
  // --- Structured
  {
    const r = [[0.50, 26.60], [0.30, 25.95], [1.05, 26.80], [0.15, 25.85]];
    const titres = r.map(([a, c]) => titre(a, c));
    const { mean: m, used } = meanTitre(titres.slice(1));
    const pctT = pctErrorDifference(0.05, m);
    const n = molesFromSolution(m, 0.0200);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Nyasha titrated 20.0 cm³ portions of a solution of ethanedioic acid with 0.0200 mol dm⁻³ sodium hydroxide, using phenolphthalein. Her burette readings were:

| Titration | rough | 1 | 2 | 3 |
|---|---|---|---|---|
| initial reading / cm³ | 0.50 | 0.30 | 1.05 | 0.15 |
| final reading / cm³ | 26.60 | 25.95 | 26.80 | 25.85 |`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe how the results table should be completed, with reference to the headings and the precision of the values.", points: ["A third row headed 'titre / cm³' (quantity and unit in the heading).", "Every value, including titres, given to two decimal places ending in 0 or 5."], modelAnswer: "Add a row 'titre / cm³' and record each titre to two decimal places (for example 25.65), the same precision as the readings." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mean titre, using only concordant results, in cm³ to two decimal places.", value: m, dp: 2, unit: "cm³", wrong: [dpStr(titres.reduce((s, x) => s + x) / 4, 2)], explanation: `Titres: ${titres.map((x) => dpStr(x, 2)).join(", ")}. Concordant accurate titres: ${used.map((x) => dpStr(x, 2)).join(", ")}; mean = ${dpStr(m, 2)} cm³.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the amount, in mol, of sodium hydroxide in the mean titre.", value: n, sf: 3, unit: "mol", explanation: `${dpStr(m, 2)} ÷ 1000 × 0.0200 = ${sfStr(n, 3)} mol.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage uncertainty in the mean titre, to two significant figures.", value: pctT, sf: 2, unit: "%", explanation: `2 × 0.05 = 0.10 cm³; 0.10 ÷ ${dpStr(m, 2)} × 100 = ${sfStr(pctT, 2)}%.` }),
      ],
      hints: ["Check which accurate titres agree within 0.10 cm³.", "Leave out the rough titre."],
      explanation: `Titres ${titres.map((x) => dpStr(x, 2)).join(", ")}; the concordant set is ${used.map((x) => dpStr(x, 2)).join(", ")} (mean ${dpStr(m, 2)} cm³). The amount of NaOH is ${sfStr(n, 3)} mol and the percentage uncertainty in the titre is ${sfStr(pctT, 2)}%.`,
    });
  }
  {
    const mass = 50.0, dT = 6.5;
    const q = heatQ(mass, dT);
    const pT = pctErrorDifference(0.5, dT);
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, calculator: true,
      stem: "Farai measured the temperature rise when 2.00 g of a solid dissolved in 50.0 cm³ of water in a polystyrene cup. He used a thermometer graduated in 1 °C intervals and recorded a rise of 6.5 °C. (Assume the solution has density 1.00 g cm⁻³ and specific heat capacity 4.18 J g⁻¹ K⁻¹.)",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the energy transferred to the solution, in J, to three significant figures.", value: q, sf: 3, unit: "J", wrong: [sfStr(heatQ(52.0, dT), 3)], explanation: `q = mcΔT = 50.0 × 4.18 × 6.5 = ${sfStr(q, 3)} J (the mass of water, 50.0 g, is used).` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage uncertainty in the temperature rise, to two significant figures.", value: pT, sf: 2, unit: "%", explanation: `Each reading ±0.5 °C, so ΔT ±1.0 °C; 1.0 ÷ 6.5 × 100 = ${sfStr(pT, 2)}%.` }),
        P.mcq({ label: "(c)", stem: "Which measurement contributes the largest percentage uncertainty?", options: [["the temperature rise", "Correct: it is far larger than the others."], ["the mass of solid (±0.01 g on 2.00 g)", "Mass by difference: 0.01 ÷ 2.00 × 100 = 0.5%, much smaller."], ["the volume of water from a burette", "A burette volume of 50 cm³ has a small percentage uncertainty."], ["the specific heat capacity", "This is a data value, not a measurement in the experiment."]], answer: "A", explanation: "The temperature rise is uncertain by about 15%; the other measurements are under 1%." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two improvements to make the result more accurate, each linked to the error it reduces.", points: ["Use a thermometer reading to 0.1 °C or 0.2 °C (or a larger mass of solid so the rise is bigger) to reduce the percentage uncertainty in ΔT.", "Use a lid and a second cup (insulation), or plot a temperature-time graph and extrapolate, to reduce or correct for heat loss."], modelAnswer: "Use a 0.2 °C thermometer, or more solid in the same water, to make the percentage uncertainty in ΔT smaller; and put a lid on the cup inside a second cup, or record temperatures over time and extrapolate the cooling line back, to allow for heat lost to the air." }),
      ],
      hints: ["q = mcΔT with m the mass of water.", "A temperature change comes from two readings."],
      explanation: `q = ${sfStr(q, 3)} J; the uncertainty in ΔT (${sfStr(pT, 2)}%) dominates, so the best improvements are a more precise thermometer or a larger ΔT, plus better insulation or extrapolation for heat loss.`,
    });
  }
  // --- Cards
  b.card("DEFINITION", "Concordant titres", "Accurate titres that agree within 0.10 cm³; the mean titre is calculated from these only.");
  b.card("FACT", "Precision of a burette reading", "To the nearest 0.05 cm³, two decimal places (e.g. 23.45 cm³). Uncertainty of a titre ±0.10 cm³ (two readings).");
  b.card("FORMULA", "Percentage uncertainty", "uncertainty ÷ measured value × 100; for a difference of two readings, use twice the reading uncertainty.");
  b.card("DEFINITION", "Systematic error", "An error that shifts every reading the same way (e.g. heat loss, an uncalibrated balance). Not reduced by repeating; fix the method.");
  b.card("DEFINITION", "Random error", "Unpredictable scatter either side of the true value (e.g. judging an end point). Reduced by repeating and averaging.");
  b.card("CONCEPT", "Heating to constant mass", "Heat, cool, weigh and repeat until two consecutive masses agree (e.g. within 0.01 g): shows the reaction or water loss is complete.");
  b.card("CONCEPT", "Significant figures in a calculated answer", "The same as the least precise data, or one more. Round only the final answer.");
  b.card("CONCEPT", "Correcting ΔT in a thermometric experiment", "Extrapolate the before-mixing line forward and the cooling line back to the time of mixing; ΔT is the vertical gap between them.");
  b.card("FACT", "Results-table headings", "Quantity / unit, e.g. 'titre / cm³', 'temperature / °C'; every value in a column to the same number of decimal places.");
});
