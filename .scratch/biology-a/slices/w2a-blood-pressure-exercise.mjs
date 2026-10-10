// W2a: blood pressure, hypertension and exercise (ZIMSEC only).
import { concept, P, t, chk, table, cardiacOutput, pctChange, mean, dpStr, sfStr, rnd } from "../lib.mjs";

concept("abio.mammal-transport.blood-pressure-exercise", { file: "mammal-transport/blood-pressure-exercise", keyPrefix: "mammal-transport.blood-pressure-exercise" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A blood pressure reading is recorded as 124/82 mmHg. What does 124 represent?",
    options: [
      ["The systolic pressure", "Correct: the higher number, during ventricular contraction."],
      ["The diastolic pressure", "Diastolic is the lower number, 82."],
      ["The pulse rate in beats per minute", "Pulse rate is not part of a blood pressure reading."],
      ["The pressure in the veins", "Blood pressure is measured in an artery."],
    ],
    answer: "A",
    explanation: "The first, higher number is the **systolic** pressure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When measuring blood pressure with a sphygmomanometer, what does the first tapping sound heard as the cuff is deflated indicate?",
    options: [
      ["Cuff pressure has just fallen below systolic pressure", "Correct: blood spurts through at each systole."],
      ["Cuff pressure has just fallen below diastolic pressure", "Sounds disappear at about diastolic pressure."],
      ["The heart valves are closing in the arm", "Heart valves are in the heart; the sound comes from turbulent flow in the artery."],
      ["The artery has been completely blocked", "When fully blocked there is no sound."],
    ],
    answer: "A",
    explanation: "At the first sound, blood forces through the partly squeezed artery during **systole**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a long-term effect of regular aerobic training on the heart?",
    options: [
      ["Increased stroke volume at rest", "Correct: a larger, stronger left ventricle."],
      ["Increased resting heart rate", "Resting heart rate falls with training."],
      ["Decreased number of capillaries in muscles", "Training increases capillary density."],
      ["Thinner ventricle walls", "Heart muscle becomes larger and stronger."],
    ],
    answer: "A",
    explanation: "Training enlarges the heart muscle, so **stroke volume increases** and resting heart rate falls.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why can a high-salt diet contribute to hypertension?",
    options: [
      ["It increases water retention and blood volume", "Correct: more volume in the same vessels raises pressure."],
      ["It makes the heart beat more slowly and more weakly", "Salt does not directly slow the heart."],
      ["It dissolves fatty plaques in arteries", "Salt does not dissolve plaques."],
      ["It reduces the number of red blood cells", "Salt does not reduce red cell numbers."],
    ],
    answer: "A",
    explanation: "Excess salt leads to **water retention**, increasing blood volume and therefore pressure.",
    hints: ["Think about water following salt."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "During exercise, how is more blood directed to the skeletal muscles?",
    options: [
      ["Arterioles to the muscles dilate while those to the gut constrict", "Correct."],
      ["Veins draining the muscles constrict to hold blood there", "This would reduce flow through the muscles."],
      ["Capillaries in the muscles contract to pull blood in", "Capillaries have no muscle."],
      ["The aorta narrows so that blood pressure rises in every organ", "The aorta does not redirect blood to particular organs."],
    ],
    answer: "A",
    explanation: "Smooth muscle in **arterioles** controls flow: dilation to muscles, constriction to the gut.",
    hints: ["Which vessels have muscle walls that control flow to organs?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two students did the same step test. Student X's pulse rose from 68 to 104 beats/min and recovered in 3 minutes; student Y's rose from 80 to 142 beats/min and recovered in 7 minutes. Which conclusion is best supported?",
    options: [
      ["X has the more efficient cardiovascular system", "Correct: lower rise, lower resting rate and faster recovery."],
      ["Y has a larger stroke volume than X", "Y needs more beats for the same work, suggesting a smaller stroke volume."],
      ["Y is fitter because the heart rate rose more", "A larger rise means the heart works harder for the same exercise."],
      ["Both are equally fit because both pulse rates rose after exercise", "Recovery time and size of rise differ clearly."],
    ],
    answer: "A",
    explanation: "A lower resting rate, smaller rise and **faster recovery** indicate greater fitness.",
    hints: ["Compare resting rate, rise and recovery time."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a consequence of untreated hypertension?",
    options: [
      ["Increased risk of stroke", "Correct: damaged or blocked arteries in the brain."],
      ["Lower risk of heart attack", "Hypertension increases the risk of heart attack."],
      ["Thinner left ventricle wall", "The left ventricle wall thickens as it works harder."],
      ["Lower workload for the heart", "The heart works harder against higher pressure."],
    ],
    answer: "A",
    explanation: "Hypertension raises the risk of **stroke**, heart attack, heart failure and kidney damage.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The pulse rate is the same as the heart rate.",
    answer: true,
    explanation: "True. Each ventricular contraction produces one pulse in the arteries.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Regular training greatly increases resting cardiac output.",
    answer: false,
    explanation: "False. Resting cardiac output stays about the same; stroke volume rises and resting heart rate falls. Maximum cardiac output rises.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Systolic pressure", "Highest arterial pressure, as the ventricles contract"],
      ["Diastolic pressure", "Lowest arterial pressure, as the ventricles relax"],
      ["Hypertension", "Persistently raised resting blood pressure"],
      ["Recovery time", "Time for pulse rate to return to the resting value"],
    ],
    explanation: "Key terms for blood pressure and fitness.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "During exercise heart rate {{blank:a}} and stroke volume {{blank:b}}, so cardiac output {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "b", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
      { id: "c", accepted: ["increases"], choices: ["increases", "decreases", "stays the same"] },
    ],
    explanation: "Cardiac output = stroke volume × heart rate; both rise.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the instrument used to measure blood pressure.",
    accepted: ["sphygmomanometer", "a sphygmomanometer", "blood pressure monitor", "sphygmanometer"],
    wrong: ["stethoscope", "thermometer"],
    explanation: "A **sphygmomanometer** (cuff, pump and gauge).",
  });

  // Calculations (numbers differ from the lesson)
  b.num({
    d: 1, skill: "APPLICATION",
    stem: "Chipo counted 37 beats in 30 s at rest. Calculate her pulse rate in beats/min.",
    value: 74, unit: "beats/min", wrong: [148, 37],
    explanation: t`$37 \times (60 \div 30) = 37 \times 2 = 74$ beats/min.`,
  });
  chk(37 * 2, 74);
  const rest = mean([66, 70, 68]);
  const peak = 151;
  const pc = pctChange(rest, peak);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Sipho's resting pulse readings were 66, 70 and 68 beats/min. Immediately after a 400 m run his pulse was 151 beats/min. Calculate the percentage increase from his mean resting pulse, to one decimal place.",
    value: pc, dp: 1, unit: "%", wrong: [rnd(pctChange(peak, rest), 1), 83],
    explanation: t`1. Mean resting pulse $= (66 + 70 + 68) \div 3 = 68$ beats/min.
2. Increase $= 151 - 68 = 83$ beats/min.
3. Percentage increase $= \dfrac{83}{68} \times 100 = ${dpStr(pc, 1)}\%$.
4. Dividing by 151 instead of the starting value gives the wrong base.`,
    hints: ["Find the mean resting pulse first.", "Divide by the starting value."],
  });
  const sv1 = 72, hr1 = 71, sv2 = 88, hr2 = 59;
  const co1 = cardiacOutput(sv1, hr1), co2 = cardiacOutput(sv2, hr2);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "Before training, Nyasha's resting stroke volume was 72 cm³ and heart rate 71 beats/min. After training they were 88 cm³ and 59 beats/min. Calculate the percentage change in her resting cardiac output, to one decimal place (include the sign).",
    value: pctChange(co1, co2), dp: 1, unit: "%", wrong: [rnd(pctChange(sv1, sv2), 1), rnd(pctChange(hr1, hr2), 1)],
    explanation: t`Before: $72 \times 70 = ${co1}\ \text{cm}^3\ \text{min}^{-1}$. After: $88 \times 57 = ${co2}\ \text{cm}^3\ \text{min}^{-1}$. Change $= \dfrac{${co2} - ${co1}}{${co1}} \times 100 = ${dpStr(pctChange(co1, co2), 1)}\%$: almost no change at rest.`,
    hints: ["Work out each cardiac output first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how blood pressure is measured using a sphygmomanometer and stethoscope.",
    points: [
      "Cuff round the upper arm (at heart level, person seated and rested) inflated until the brachial artery is closed / no pulse",
      "Stethoscope placed over the artery at the elbow; cuff deflated slowly",
      "Pressure at the first tapping sound is the systolic pressure",
      "Pressure when the sounds disappear is the diastolic pressure",
    ],
    modelAnswer: "With the person seated and rested, the cuff is wrapped round the upper arm at heart level and inflated until the brachial artery is squeezed shut. A stethoscope is placed over the artery at the elbow and the cuff is slowly deflated. The pressure when tapping sounds are first heard is the systolic pressure; the pressure when the sounds disappear is the diastolic pressure.",
    explanation: "Close, deflate, first sound, last sound.",
    hints: ["Two readings: when sounds start and when they stop."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how hypertension increases the risk of a heart attack.",
    points: [
      "High pressure damages the endothelium of arteries",
      "Fatty plaques / atheroma form at damaged sites (atherosclerosis)",
      "Coronary arteries narrow / blood clot forms on a plaque",
      "Less oxygen reaches heart muscle, which dies (myocardial infarction); heart also works harder",
    ],
    modelAnswer: "Persistently high pressure damages the endothelium lining the arteries. Fatty plaques build up at the damaged sites (atherosclerosis), narrowing the coronary arteries, and a clot may form on a plaque. Heart muscle beyond the blockage receives too little oxygen and dies: a heart attack. The heart also has to work harder against the high pressure.",
    explanation: "Damage → plaque → narrowing/clot → muscle deprived of oxygen.",
    hints: ["Start with damage to the artery lining."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest three ways in which a person with high blood pressure could lower it without medicines.",
    points: [
      "Reduce salt intake",
      "Take regular exercise / lose excess weight",
      "Stop smoking / reduce alcohol / reduce stress",
    ],
    modelAnswer: "Eat less salt, take regular exercise to lose excess weight, and stop smoking, drink less alcohol and manage stress.",
    explanation: "Lifestyle risk factors can be changed.",
    hints: ["Think about the changeable risk factors."],
  });

  // Practice structured: pulse recovery
  const tmin = [0, 1, 2, 3, 4, 5, 6];
  const A = [113, 97, 83, 73, 69, 67, 67];
  const B = [140, 129, 117, 106, 96, 88, 82];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Two students, A and B, did 3 minutes of step-ups on the same step at the same rate. Their pulse rates were measured every minute afterwards. Resting rates were A 67 beats/min and B 79 beats/min.\n\n${table(["Time after exercise / min", ...tmin.map(String)], [["Student A / beats per min", ...A.map(String)], ["Student B / beats per min", ...B.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many minutes did student A take to return to the resting pulse rate?", value: 5, unit: "min", wrong: [6], explanation: "A reached 67 beats/min at 5 minutes." }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage by which B's pulse immediately after exercise exceeded B's resting rate, to the nearest whole number.",
        value: pctChange(79, 140), dp: 0, unit: "%", wrong: [61],
        explanation: t`$\dfrac{140 - 79}{79} \times 100 = ${dpStr(pctChange(79, 140), 1)} \approx ${dpStr(pctChange(79, 140), 0)}\%$.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest which student is fitter and explain your answer.",
        points: ["Student A is fitter", "A's pulse rose less (113 vs 140) and recovered faster (5 min; B not recovered after 6 min)", "A probably has a larger stroke volume, so fewer beats are needed for the same cardiac output"],
        modelAnswer: "Student A is fitter. A's pulse rose only to 113 beats/min compared with 140, and returned to the resting rate in 5 minutes, while B had not recovered after 6 minutes. A's heart probably has a larger stroke volume, so it needs fewer beats to deliver the same cardiac output.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Give two ways the students made this comparison fair.",
        points: ["Same step height / same rate of stepping / same duration (3 minutes)", "Pulse measured at the same intervals / same method (e.g. radial pulse counted for a set time)"],
        modelAnswer: "They used the same step at the same rate for the same 3 minutes, and measured the pulse at the same one-minute intervals by the same method.",
      }),
    ],
    explanation: "Fitter people have lower rises and faster recovery.",
    hints: ["Percentage increase uses the resting rate as the base."],
    calculator: true,
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Blood pressure readings for four adults, each taken at rest on three separate days, are: P 119/75, 124/78, 116/77; Q 152/98, 149/95, 155/99; R 127/86, 121/81, 125/85; S 136/87, 111/65, 115/63 (all in mmHg).",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which adult's readings suggest hypertension?", accepted: ["Q", "adult Q"], wrong: ["S"], explanation: "Q's readings are raised on all three days." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why adult S should not be diagnosed with hypertension from these readings.",
        points: ["Only one reading (136/87) was raised; the other two were normal", "Blood pressure varies (stress, activity, time of day); diagnosis needs persistently raised readings"],
        modelAnswer: "Only the first reading was raised; the other two were normal. Blood pressure varies with stress and activity, so hypertension is diagnosed only when readings are raised persistently.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State two consequences that adult Q could face if the condition is not treated.",
        points: ["Stroke / heart attack (coronary heart disease)", "Heart failure / kidney damage / damage to the retina"],
        modelAnswer: "A stroke or a heart attack, and heart failure or kidney damage.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why the second number in each reading is always lower than the first.",
        points: ["Second is diastolic, when the ventricles are relaxed; the first is systolic, when the left ventricle contracts"],
        modelAnswer: "The second is the diastolic pressure, measured while the ventricles relax; the first is the systolic pressure produced by ventricular contraction.",
      }),
    ],
    explanation: "Diagnosis needs persistently raised readings.",
    hints: ["Look for readings raised on every day."],
  });

  b.card("DEFINITION", "Define **systolic pressure**.", "Highest arterial pressure, when the left ventricle contracts.");
  b.card("DEFINITION", "Define **diastolic pressure**.", "Lowest arterial pressure, while the ventricles relax.");
  b.card("FACT", "Typical healthy young adult at rest", "Blood pressure about 120/80 mmHg; pulse about 60-80 beats/min.");
  b.card("CONCEPT", "Sphygmomanometer readings", "First sound on deflation = systolic; sounds disappear = diastolic.");
  b.card("FACT", "Risk factors for hypertension", "Age, family history, high salt, obesity, inactivity, alcohol, smoking, stress.");
  b.card("FACT", "Consequences of hypertension", "Heart failure, atherosclerosis, heart attack, stroke, kidney damage, eye damage.");
  b.card("CONCEPT", "Short-term effects of exercise", "Heart rate, stroke volume, cardiac output and systolic pressure rise; arterioles to muscles dilate.");
  b.card("CONCEPT", "Long-term effects of training", "Larger stroke volume, lower resting heart rate, more capillaries, faster recovery, lower resting blood pressure.");
  b.card("CONCEPT", "Efficient cardiovascular system", "Low resting heart rate with large stroke volume, normal blood pressure, fast recovery after exercise.");
});
