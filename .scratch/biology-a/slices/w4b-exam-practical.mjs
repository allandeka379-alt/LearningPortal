// W4b: PLANNING (ZIMSEC Paper 4 planning / Cambridge Paper 5 question 1 style): nitrate concentration and the growth of
// duckweed (Lemna).
import { concept, P, t, chk, dpStr, pctChange, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("skills.planning-evaluation"), { file: "exam/w4b-practical", keyPrefix: "exam.w4b-practical" }, (b) => {
  const stock = 10, target = 2, final = 50;
  const vStock = (target / stock) * final;
  chk(vStock, 10);
  const f0 = 12, f10 = 41;
  const pcF = pctChange(f0, f10);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "ZIMSEC P4 / Cambridge P5",
    concepts: [A("skills.planning-evaluation")],
    calculator: true,
    stem: "Farai wants to investigate the hypothesis that the growth of duckweed (*Lemna*) increases as the concentration of nitrate in its water increases. Duckweed is a small floating plant that reproduces by budding off new fronds (leaf-like parts). He has a culture of duckweed, a 10 mmol dm⁻³ potassium nitrate stock solution made up in a nutrient solution that contains every other mineral ion but no nitrogen, the same nitrogen-free nutrient solution, beakers, measuring cylinders and syringes, a fine paintbrush, a bench lamp and a hand lens.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({
        label: "(a)", marks: 1, stem: "Make a prediction based on the hypothesis, in terms of variables Farai can measure.",
        points: ["As nitrate concentration increases, the number of fronds after a set time (or the rate of increase in frond number) increases, until it levels off"],
        modelAnswer: "The higher the nitrate concentration, the greater the increase in the number of fronds over ten days, up to a point at which it levels off.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Identify the independent and dependent variables and state how each would be changed or measured.",
        points: [
          "Independent: nitrate concentration, at five or more values (e.g. 0, 1, 2, 4, 6, 8 mmol dm⁻³) made by proportional dilution of the stock with nitrogen-free nutrient solution",
          "Dependent: growth, measured as the number of fronds counted (with a hand lens) at the start and after a fixed time, e.g. every 2 days for 10 days / or dry mass at the end",
        ],
        modelAnswer: "The independent variable is nitrate concentration, set at 0, 1, 2, 4, 6 and 8 mmol dm⁻³ by diluting the stock with nitrogen-free nutrient solution. The dependent variable is growth, measured by counting the fronds with a hand lens at the start and every two days for ten days.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: `Calculate the volume of ${stock} mmol dm⁻³ stock solution needed to make ${final} cm³ of a ${target} mmol dm⁻³ solution.`,
        value: vStock, unit: "cm³", wrong: [(stock / target) * final, final - vStock],
        explanation: t`$\dfrac{${target}}{${stock}} \times ${final} = ${vStock}$ cm³ of stock, made up to ${final} cm³ with ${final - vStock} cm³ of nitrogen-free nutrient solution.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe a method Farai could use.",
        points: [
          "Put the same volume (e.g. 50 cm³) of each solution in identical beakers, labelled",
          "Transfer the same number of healthy plants (e.g. 3 plants with 12 fronds in total) of similar size to each beaker with a paintbrush",
          "Keep under the same lamp / light intensity, temperature and day length for 10 days; top up evaporated water with distilled water",
          "Count fronds at the start and every 2 days; three replicate beakers per concentration; calculate mean increase",
        ],
        modelAnswer: "Measure 50 cm³ of each nitrate solution into labelled identical beakers. Using a paintbrush, transfer to each beaker duckweed plants carrying 12 fronds in total, chosen to be similar in size and colour. Keep all beakers side by side under the same lamp, at the same temperature, for 10 days, topping up any evaporation with distilled water. Count the fronds with a hand lens at the start and every 2 days. Set up three beakers at each concentration and calculate the mean number of fronds.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State how two other variables would be standardised, and describe a suitable control.",
        points: [
          "Light intensity and temperature kept the same (same lamp distance, thermometer, same room); same volume of solution; same starting number and type of fronds; other mineral ions the same (same nutrient solution)",
          "Control: duckweed in nitrogen-free nutrient solution (0 mmol dm⁻³ nitrate) to show growth depends on nitrate",
        ],
        modelAnswer: "Light intensity and temperature are kept the same by placing all beakers at the same distance from one lamp in one room and checking with a thermometer, and every beaker has the same volume of solution with the same other mineral ions. The control is duckweed in nitrogen-free nutrient solution, with no nitrate.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Identify one hazard and how the risk would be reduced, and state the level of risk.",
        points: [
          "Potassium nitrate is an oxidising agent / mild irritant: wear eye protection and gloves, wash spills and hands; or the lamp gets hot / electricity near water: keep water away from the lamp",
          "Overall risk: low (with precautions)",
        ],
        modelAnswer: "Potassium nitrate solution is a mild irritant and an oxidising agent, so eye protection is worn, spills are wiped up and hands washed; the lamp is kept away from the water. With these precautions the risk is low.",
      }),
      P.num({
        label: "(g)", marks: 1, stem: `In a trial at 4 mmol dm⁻³, the fronds increased from ${f0} to ${f10} in ten days. Calculate the percentage increase, to one decimal place.`,
        value: pcF, dp: 1, unit: "%", wrong: [Math.round((f10 / f0) * 1000) / 10],
        explanation: `(${f10} − ${f0}) ÷ ${f0} × 100 = ${dpStr(pcF, 1)}%.`,
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Explain how Farai should process and present his results to decide whether they support the hypothesis.",
        points: [
          "Calculate the mean (percentage) increase in frond number at each concentration, with standard deviation or range",
          "Plot mean increase against nitrate concentration with error bars; supported if growth increases with concentration and error bars do not overlap (or a significant positive Spearman correlation)",
        ],
        modelAnswer: "He should calculate the mean percentage increase in frond number for each concentration, with the standard deviation, and plot it against nitrate concentration with error bars. The hypothesis is supported if growth increases with nitrate concentration and the error bars of different concentrations do not overlap, or if Spearman's rank correlation is significantly positive.",
      }),
    ]),
    explanation: "A planning answer needs a measurable dependent variable, at least five values of the independent variable made by dilution, standardised variables, a control, replicates, a risk assessment and a method of analysis.",
    hints: ["Proportional dilution: volume of stock = (target ÷ stock) × final volume.", "Duckweed growth can be measured by counting fronds."],
  });
});
