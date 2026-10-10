// W1b: Cambridge Paper 3 question 1 style investigation (CAM_P3_INVESTIGATION): water potential of potato tissue.
import { concept, P, t, chk, table, EXAM, checkExam, CAM, pctChange, mean, dpStr, zeroCrossing, rnd } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("membranes.diffusion-osmosis"), { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  const conc = [0.0, 0.15, 0.3, 0.45, 0.6, 0.75];
  const L = (i) => conc[i].toFixed(2);
  const init = [[1.52, 1.48, 1.55], [1.50, 1.47, 1.53], [1.49, 1.54, 1.51], [1.53, 1.50, 1.46], [1.48, 1.52, 1.50], [1.51, 1.49, 1.54]];
  const fin = [[1.71, 1.66, 1.75], [1.58, 1.55, 1.62], [1.43, 1.48, 1.45], [1.37, 1.48, 1.31], [1.28, 1.31, 1.30], [1.25, 1.24, 1.28]];
  const pc = init.map((row, i) => row.map((x, j) => pctChange(x, fin[i][j])));
  const one = pc[4][1];
  chk(rnd(one, 1), -13.8);
  const mean06 = mean([pc[3][0], pc[3][2]]);
  chk(rnd(mean06, 1), -10.4);
  const means = pc.map((row, i) => (i === 3 ? mean06 : mean(row)));
  const zero = zeroCrossing(conc, means);
  chk(rnd(zero, 2), 0.24);
  const rows = conc.map((c, i) => [c.toFixed(2), ...init[i].map((x, j) => `${x.toFixed(2)} → ${fin[i][j].toFixed(2)}`)]);

  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P3_INVESTIGATION.skill, secs: EXAM.CAM_P3_INVESTIGATION.secs, applies: EXAM.CAM_P3_INVESTIGATION.applies, paper: "Cambridge Paper 3",
    concepts: [A("membranes.diffusion-osmosis"), A("skills.practical-investigation")],
    stem: `A student investigated the effect of sucrose concentration on the mass of potato tissue.

1. A 1.0 mol dm⁻³ sucrose solution was diluted with distilled water to give 20 cm³ of each concentration shown in the table, in labelled boiling tubes.
2. Eighteen cylinders were cut from one potato with a cork borer and trimmed to 30 mm with a scalpel on a tile.
3. Each cylinder was blotted, weighed and placed in a tube (three cylinders per concentration).
4. After 60 minutes at room temperature, each cylinder was removed, blotted and reweighed.

The results (initial mass → final mass, in g) were:

${table(["Sucrose concentration / mol dm⁻³", "Cylinder 1", "Cylinder 2", "Cylinder 3"], rows)}`,
    parts: checkExam(EXAM.CAM_P3_INVESTIGATION, [
      P.group({
        label: "(a)", stem: "Variables.",
        parts: [
          P.short({
            label: "(i)", marks: 1, stem: "State the independent variable.",
            accepted: ["sucrose concentration", "concentration of sucrose", "concentration of sucrose solution", "the concentration of the sucrose solution", "sucrose solution concentration", "concentration"],
            wrong: ["mass"],
            explanation: "The student varied the sucrose concentration.",
          }),
          P.manual({
            label: "(ii)", marks: 1, stem: "State the dependent variable and how it should be expressed.",
            points: ["Change in mass of the potato cylinders, expressed as percentage change in mass"],
            modelAnswer: "The change in mass of the cylinders, expressed as percentage change in mass.",
          }),
          P.manual({
            label: "(iii)", marks: 2, stem: "State two variables that were standardised in this method.",
            points: ["Volume of solution (20 cm³) / time in solution (60 minutes)", "Length or diameter of cylinders / same potato / temperature (room temperature)"],
            modelAnswer: "The volume of solution (20 cm³) and the time in the solution (60 minutes); also the length and diameter of the cylinders, which all came from one potato.",
          }),
        ],
      }),
      P.fib({
        label: "(b)", stem: "Complete the proportional dilution for 20 cm³ of 0.45 mol dm⁻³ sucrose.",
        template: "Volume of 1.0 mol dm⁻³ sucrose = {{blank:s}} cm³; volume of distilled water = {{blank:w}} cm³.",
        blanks: [
          { id: "s", accepted: ["9"], input: "number", wrong: "4.5" },
          { id: "w", accepted: ["11"], input: "number", wrong: "15.5" },
        ],
        explanation: t`$0.45 / 1.0 \times 20 = 9\ \text{cm}^3$ of stock, made up to 20 cm³ with $11\ \text{cm}^3$ of water.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe how the student should set out a table to record the raw and processed results.",
        points: [
          "Independent variable (sucrose concentration / mol dm⁻³) in the first column",
          "Column headings with units in the heading only (e.g. initial mass / g, final mass / g, percentage change in mass / %), not in the cells",
          "Columns for each replicate and for the mean; masses to the same number of decimal places (2 d.p.)",
        ],
        modelAnswer: "The first column would show sucrose concentration / mol dm⁻³. Further columns would show initial mass / g and final mass / g for each of the three cylinders, then percentage change in mass / % for each and the mean percentage change. Units appear only in the headings, and all masses are recorded to two decimal places.",
      }),
      P.group({
        label: "(d)", stem: "Processing the results.",
        parts: [
          P.num({
            label: "(i)", marks: 1, stem: `Calculate the percentage change in mass of cylinder 2 in ${L(4)} mol dm⁻³ sucrose, to one decimal place. Include a minus sign for a loss.`,
            value: one, dp: 1, unit: "%", wrong: [rnd(((1.31 - 1.52) / 1.31) * 100, 1), 13.8],
            explanation: t`$\dfrac{1.31 - 1.52}{1.52} \times 100 = ${dpStr(one, 1)}\%$.`,
          }),
          P.mcq({
            label: "(ii)", stem: "Which result is anomalous?",
            options: [
              [`Cylinder 2 in ${L(3)} mol dm⁻³`, "Correct: it lost only about 1% while the other two lost about 10%."],
              [`Cylinder 1 in ${L(0)} mol dm⁻³`, "Its gain (12.5%) is close to the other two in water."],
              [`Cylinder 3 in ${L(5)} mol dm⁻³`, "Its loss (about 17%) matches the other two."],
              [`Cylinder 2 in ${L(1)} mol dm⁻³`, "Its gain (about 5%) matches the other two."],
            ],
            answer: "A",
            explanation: "1.50 → 1.48 g is a change of about −1.3%, far from the −10.5% and −10.3% of the other cylinders.",
          }),
          P.num({
            label: "(iii)", marks: 2, stem: `Calculate the mean percentage change in mass in ${L(3)} mol dm⁻³ sucrose, leaving out the anomalous result. Give your answer to one decimal place.`,
            value: mean06, dp: 1, unit: "%", wrong: [Number(mean(pc[3]).toFixed(1))],
            explanation: t`Cylinder 1: $${dpStr(pc[3][0], 2)}\%$; cylinder 3: $${dpStr(pc[3][2], 2)}\%$. Mean $= ${dpStr(mean06, 1)}\%$. Including the anomaly gives $${dpStr(mean(pc[3]), 1)}\%$.`,
          }),
        ],
      }),
      P.manual({
        label: "(e)", marks: 2, stem: `The mean percentage changes (leaving out the anomaly) are ${means.map((m) => dpStr(m, 1)).join(", ")} for ${L(0)} to ${L(5)} mol dm⁻³. Describe the graph of mean percentage change in mass against concentration.`,
        points: ["Percentage change decreases as concentration increases: gain at low concentrations, loss at high", "Line crosses zero between 0.15 and 0.30 mol dm⁻³; steep fall at first, becoming less steep above 0.45 mol dm⁻³ (levelling)"],
        modelAnswer: "As sucrose concentration increases, the percentage change falls from a gain of 12.5% in water to a loss of 17.0% at 0.75 mol dm⁻³. The line crosses zero between 0.15 and 0.30 mol dm⁻³, and the fall becomes less steep at the highest concentrations.",
      }),
      P.num({
        label: "(f)", marks: 2, stem: `Using the means at ${L(1)} mol dm⁻³ (+${dpStr(means[1], 2)}%) and ${L(2)} mol dm⁻³ (${dpStr(means[2], 2)}%), and assuming a straight line between them, estimate the sucrose concentration that would cause no change in mass. Give your answer to two decimal places.`,
        value: zero, dp: 2, unit: "mol/dm³", wrong: [0.3, 0.15],
        explanation: t`$0.15 + 0.15 \times \dfrac{${dpStr(means[1], 2)}}{${dpStr(means[1], 2)} + ${dpStr(-means[2], 2)}} = ${dpStr(zero, 3)} \approx ${dpStr(zero, 2)}\ \text{mol dm}^{-3}$.`,
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain what the concentration in (f) tells you about the potato cells.",
        points: ["At this concentration there is no net movement of water by osmosis", "So the water potential of the solution equals the water potential of the potato cells / tissue"],
        modelAnswer: "At about 0.24 mol dm⁻³ there is no net gain or loss of water by osmosis, so this solution has the same water potential as the potato cells.",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Identify one source of systematic error and one source of random error in this method.",
        points: ["Systematic: e.g. balance not zeroed / incorrectly calibrated (all masses shifted), or evaporation of water from all tubes", "Random: e.g. blotting removed different amounts of surface liquid / cylinders cut to slightly different sizes / cylinders not fully submerged"],
        modelAnswer: "A systematic error would be a balance that was not zeroed, shifting every mass by the same amount. A random error would be blotting the cylinders inconsistently, so different amounts of surface solution remained.",
      }),
      P.manual({
        label: "(i)", marks: 3, stem: "Suggest three improvements to the method that would increase confidence in the estimate.",
        points: [
          "More concentrations between 0.15 and 0.30 mol dm⁻³ (smaller intervals near the zero point)",
          "More replicates (e.g. five per concentration) and calculate means / repeat the anomalous result",
          "Standardise blotting (same number of rolls on the same paper) / control temperature with a water bath / leave longer to reach equilibrium / cover tubes",
        ],
        modelAnswer: "Use more concentrations between 0.15 and 0.30 mol dm⁻³, for example every 0.03 mol dm⁻³; use five cylinders per concentration and repeat any anomalous result; and standardise blotting and control the temperature with a thermostatically controlled water bath, leaving the cylinders long enough to reach a steady mass.",
      }),
      P.manual({
        label: "(j)", marks: 1, stem: "Assess the overall risk of this investigation and state one precaution.",
        points: ["Low risk; e.g. cut away from the body with the scalpel / cork borer onto a tile"],
        modelAnswer: "Low risk. Cut with the scalpel and cork borer away from the body, onto a tile.",
      }),
    ]),
    explanation: "Percentage change in mass falls with sucrose concentration; the tissue's water potential equals that of about 0.24 mol dm⁻³ sucrose.",
    hints: ["Percentage change = (final − initial) ÷ initial × 100.", "For a proportional dilution, volume of stock = required concentration ÷ stock concentration × total volume."],
    calculator: true,
  });
});
