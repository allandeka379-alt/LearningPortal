// W1a: Cambridge Paper 3 question 1 style investigation (catalase and hydrogen peroxide concentration).
import { concept, P, t, chk, table, dpStr, EXAM, checkExam, CAM, mean } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("enzymes.factors"), { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  const conc = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8];
  const vols = [[2.6, 2.9, 2.7], [5.2, 4.9, 5.4], [7.4, 7.8, 7.5], [9.1, 9.5, 6.4], [10.6, 10.9, 10.7], [11.3, 11.6, 11.4]];
  const m15 = mean(vols[2]);
  const m20 = mean([9.1, 9.5]);
  chk(m20, 9.3, 1e-9);
  const rate15 = m15 / 2;
  b.struct({
    skill: EXAM.CAM_P3_INVESTIGATION.skill, secs: EXAM.CAM_P3_INVESTIGATION.secs, applies: EXAM.CAM_P3_INVESTIGATION.applies, examStyle: true, paper: "Paper 3", d: 5, calculator: true,
    concepts: [A("enzymes.factors"), A("enzymes.mode-of-action"), A("skills.practical-investigation")],
    stem: `Tatenda investigated the effect of hydrogen peroxide concentration on the activity of catalase in potato tissue.\n\n1. Six discs, each 2 mm thick, were cut from one potato cylinder with a scalpel and placed in a boiling tube.\n2. 10 cm³ of hydrogen peroxide solution was added, a bung with a delivery tube was fitted, and oxygen was collected for 2 minutes in an inverted measuring cylinder full of water.\n3. This was done three times with fresh discs at each of six concentrations of hydrogen peroxide.\n\nTatenda's results (volume of oxygen collected in 2 minutes, in cm³):\n\n${table(["Hydrogen peroxide / %", "Trial 1", "Trial 2", "Trial 3"], conc.map((c, i) => [dpStr(c, 1), ...vols[i].map((v) => dpStr(v, 1))]))}`,
    parts: checkExam(EXAM.CAM_P3_INVESTIGATION, [
      P.group({
        label: "(a)", stem: "Variables in this investigation.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "State the independent variable.", accepted: ["concentration of hydrogen peroxide", "hydrogen peroxide concentration", "substrate concentration", "concentration of substrate", "H2O2 concentration", "concentration of H2O2"], keywords: { all: ["concentration"], any: ["peroxide", "substrate", "h2o2"] }, explanation: "The concentration of hydrogen peroxide was changed." }),
          P.short({ label: "(ii)", marks: 1, stem: "State the dependent variable.", accepted: ["volume of oxygen collected in 2 minutes", "volume of oxygen", "volume of oxygen produced", "oxygen volume", "volume of gas collected"], keywords: { all: ["volume"], any: ["oxygen", "gas"] }, explanation: "The volume of oxygen collected in 2 minutes." }),
          P.manual({ label: "(iii)", marks: 3, stem: "Identify **three** variables that should be standardised and state how each would be controlled.", points: ["Temperature: thermostatically controlled water bath (e.g. 30 °C) for the tubes / solutions", "Surface area / mass / number of discs: same number of discs cut to the same size with a cork borer and ruler (or same potato)", "Volume of hydrogen peroxide (10 cm³, measured with a syringe or graduated pipette) or pH using a buffer, or time of collection (2 min, timer)"], modelAnswer: "Temperature, by standing the tubes in a water bath at 30 °C; the surface area of potato, by cutting six discs of the same diameter (cork borer) and thickness (2 mm, ruler) from the same potato; and the volume of hydrogen peroxide, 10 cm³ measured with a syringe." }),
        ],
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how the results should be recorded in a table that includes the mean volume and the rate.",
        points: ["Independent variable in the first column with units in the heading (hydrogen peroxide / %)", "Columns for trials 1–3, mean volume / cm³ and rate / cm³ min⁻¹, units only in headings", "All volumes and means to the same number of decimal places (1 d.p., matching the measuring cylinder)"],
        modelAnswer: "The first column is headed 'Hydrogen peroxide concentration / %' with values in ascending order. Further columns are headed 'Volume of oxygen / cm³' (Trial 1, Trial 2, Trial 3, Mean) and 'Rate / cm³ min⁻¹'. Units appear only in the headings, and every volume and mean is given to one decimal place.",
      }),
      P.group({
        label: "(c)", stem: "Process the results.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "Identify the anomalous result (give the volume in cm³).", accepted: ["6.4", "6.4 cm3", "6.4 cm³"], explanation: "6.4 cm³ at 1.2% is much lower than the other two trials (9.1 and 9.5) and lower than the mean at 0.9%." }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mean volume at 1.2%, excluding the anomaly, to one decimal place.", value: m20, dp: 1, unit: "cm³", wrong: ["8.3"], explanation: "(9.1 + 9.5) ÷ 2 = 9.3 cm³. Including 6.4 gives 8.3 cm³." }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the mean volume at 0.9%, to one decimal place.", value: m15, dp: 1, unit: "cm³", wrong: ["22.7"], explanation: "(7.4 + 7.8 + 7.5) ÷ 3 = 7.57…, which is 7.6 cm³ to one decimal place, matching the data. 22.7 is the total, not the mean." }),
          P.num({ label: "(iv)", marks: 1, stem: "Calculate the mean rate of oxygen production at 0.9%, in cm³ min⁻¹, to one decimal place.", value: rate15, dp: 1, unit: "cm³/min", wrong: ["15.1"], explanation: "7.57 ÷ 2 min = 3.8 cm³ min⁻¹. Multiplying by 2 gives 15.1." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe the trend shown by the mean results.",
        points: ["Volume of oxygen increases as hydrogen peroxide concentration increases", "Increase is steep at low concentrations (about 2.7 to 7.6 cm³ from 0.3 to 0.9%)", "Then smaller increases / levels off at about 11 cm³ (10.7 at 1.5%, 11.4 at 1.8%)"],
        modelAnswer: "The mean volume of oxygen rises as the concentration of hydrogen peroxide increases. The increase is steep and almost proportional at low concentrations, from 2.7 cm³ at 0.3% to 7.6 cm³ at 0.9%, then becomes smaller, levelling off at about 11 cm³ (10.7 cm³ at 1.5% and 11.4 cm³ at 1.8%).",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the trend.",
        points: ["At low concentrations more substrate molecules mean more collisions with active sites and more enzyme-substrate complexes per minute (substrate limiting)", "At high concentrations most active sites are occupied / enzyme becomes saturated, so enzyme (catalase) concentration limits the rate"],
        modelAnswer: "At low concentrations, increasing the hydrogen peroxide concentration increases collisions with free active sites of catalase, so more enzyme-substrate complexes form each minute. At high concentrations nearly all active sites are occupied, so the amount of catalase limits the rate and the volume levels off.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Identify **two** sources of error in this method. For each, state whether it is a systematic error or a random error.",
        points: ["Error 1: some oxygen escapes before the bung is fitted / oxygen dissolves in the water", "Correct classification: systematic (always gives a lower volume)", "Error 2: discs differ in size / catalase content, or temperature not controlled, or reading the meniscus", "Correct classification: random (varies unpredictably between trials) — e.g. disc size or temperature fluctuation"],
        modelAnswer: "Some oxygen is lost between adding the hydrogen peroxide and fitting the bung, and some dissolves in the water; this is a systematic error, since it always makes the volume too low. The discs may differ slightly in thickness and hence in surface area and amount of catalase; this is a random error, varying from trial to trial.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest **three** improvements to the investigation.",
        points: ["Use a gas syringe instead of collecting over water (more precise, no gas dissolving)", "Thermostatically controlled water bath to keep temperature constant", "More concentrations above 1.8% to confirm the plateau / repeat the anomalous trial / more replicates / buffer to control pH"],
        modelAnswer: "Collect the oxygen in a gas syringe so that less dissolves and the volume can be read more precisely; stand the tubes in a thermostatically controlled water bath; and repeat the 1.2% trial that gave the anomaly, adding concentrations of 2.1% and 2.4% to confirm the plateau.",
      }),
      P.mcq({
        label: "(h)", marks: 1, stem: "Which risk assessment is most appropriate for this investigation?",
        options: [["Low risk, with eye protection and cutting away from the body", "Correct: the hazards are an irritant solution and a sharp scalpel; with precautions the risk is low."], ["High risk, because the experiment releases a highly flammable gas", "Oxygen is not flammable, although it supports combustion; the quantities are tiny."], ["No risk, because all of the materials are biological", "Hydrogen peroxide is an irritant and scalpels are sharp, so precautions are needed."], ["High risk, because potato tissue contains a toxic enzyme", "Catalase is not toxic."]],
        answer: "A", explanation: "Hydrogen peroxide (an irritant) and a scalpel are the main hazards: wear eye protection and cut on a tile away from the body; overall risk low.",
      }),
    ]),
    explanation: "Volume of oxygen rises steeply with hydrogen peroxide concentration, then levels off as catalase becomes saturated. Means exclude the anomaly; rates are means ÷ 2 min.",
    hints: ["Exclude the anomaly before taking a mean.", "Rate = volume ÷ time."],
  });
});
