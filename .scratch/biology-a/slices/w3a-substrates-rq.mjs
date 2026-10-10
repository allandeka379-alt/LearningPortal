// W3a: respiratory substrates, RQ and respirometers.
import { concept, P, t, chk, sfStr, dpStr, table, rq, rqFormula, capillaryVolume, mean } from "../lib.mjs";

concept("abio.respiration.substrates-rq", { file: "respiration/substrates-rq", keyPrefix: "respiration.substrates-rq" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which respiratory substrate releases the most energy per gram?",
    options: [
      ["Lipid", "Correct: about 37-39 kJ per gram."],
      ["Carbohydrate", "About 16 kJ per gram."],
      ["Protein", "About 17 kJ per gram."],
      ["Nucleic acid", "Nucleic acids are not normal respiratory substrates."],
    ],
    answer: "A",
    explanation: "**Lipids** give more than twice the energy per gram of carbohydrate or protein.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do lipids release more energy per gram than carbohydrates when respired?",
    options: [
      ["They contain more hydrogen atoms per gram", "Correct: more hydrogen means more reduced NAD and FAD for the chain."],
      ["They contain more oxygen atoms per gram", "Lipids contain proportionally less oxygen than carbohydrates."],
      ["They are broken down by glycolysis more quickly", "Fatty acids are not respired by glycolysis."],
      ["They are soluble in water and reach mitochondria faster", "Lipids are insoluble in water."],
    ],
    answer: "A",
    explanation: "Energy comes mainly from oxidising **hydrogen**; lipids have the most per gram.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the function of potassium hydroxide solution in a respirometer?",
    options: [
      ["It absorbs carbon dioxide", "Correct: so movement measures oxygen uptake."],
      ["It absorbs oxygen", "KOH does not absorb oxygen."],
      ["It supplies oxygen to the organisms", "KOH supplies no gas."],
      ["It keeps the temperature constant", "A water bath does that."],
    ],
    answer: "A",
    explanation: "KOH (or soda lime) **absorbs CO₂**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An organism has an RQ of 0.7. Which substrate is it mainly respiring?",
    options: [
      ["Lipid", "Correct: a typical lipid gives about 0.7."],
      ["Carbohydrate", "Carbohydrate gives 1.0."],
      ["Protein", "Protein gives about 0.9."],
      ["Glucose anaerobically", "Anaerobic respiration of glucose by yeast raises RQ above 1.0."],
    ],
    answer: "A",
    explanation: "RQ about 0.7 → **lipid**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the purpose of the control tube containing glass beads in a respirometer?",
    options: [
      ["To correct for changes in temperature and pressure", "Correct: these would move the liquid even without respiration."],
      ["To provide carbon dioxide for the organisms", "Glass beads produce no gas."],
      ["To show that the organisms need oxygen in order to survive", "That is not what the control tests."],
      ["To absorb water vapour given off by the organisms", "Glass beads do not absorb water vapour."],
    ],
    answer: "A",
    explanation: "Any movement due to **temperature or pressure** affects both tubes equally.",
    hints: ["What else, apart from respiration, could change gas volume?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Yeast in a sealed flask of glucose solution, with little oxygen left, has an RQ of 1.6. Which is the best explanation?",
    options: [
      ["Some anaerobic respiration releases CO₂ without taking in oxygen", "Correct: ethanol fermentation adds CO₂."],
      ["The yeast is respiring lipid instead of glucose", "Lipid would lower RQ, to about 0.7."],
      ["The yeast is using more oxygen than carbon dioxide it releases", "That would give an RQ below 1."],
      ["Glucose has an RQ of 1.6 when respired aerobically", "Aerobic respiration of glucose gives 1.0."],
    ],
    answer: "A",
    explanation: "RQ > 1 shows **anaerobic** CO₂ release.",
    hints: ["Which process releases CO₂ but uses no oxygen?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a respirometer containing water instead of KOH, the liquid moves towards germinating seeds. What does this show?",
    options: [
      ["The seeds take in more oxygen than the carbon dioxide they give out", "Correct: net loss of gas means RQ below 1."],
      ["The seeds give out more carbon dioxide than the oxygen they take in", "That would move the liquid away from the seeds."],
      ["The seeds are respiring only carbohydrate", "Carbohydrate gives RQ 1.0: little movement."],
      ["The seeds are respiring anaerobically", "Anaerobic respiration adds CO₂ and would move the liquid away."],
    ],
    answer: "A",
    explanation: "Movement towards the seeds = gas volume falling: **O₂ uptake > CO₂ release**, RQ < 1.",
    hints: ["Without KOH, the movement is the difference between two gases."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The RQ of glucose respired aerobically is 1.0.",
    answer: true,
    explanation: "True. C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O: 6 ÷ 6 = 1.0.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Shaking a tube of respiring yeast with methylene blue speeds up the loss of the blue colour.",
    answer: false,
    explanation: "False. Shaking lets **oxygen** re-oxidise the indicator, so it turns blue again.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each RQ value to what it most likely indicates.",
    pairs: [
      ["1.0", "Carbohydrate respired aerobically"],
      ["0.9", "Protein respired aerobically"],
      ["0.7", "Lipid respired aerobically"],
      ["1.5", "Some anaerobic respiration"],
    ],
    explanation: "Know the three standard values and that RQ > 1 shows anaerobic respiration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "RQ is the volume of {{blank:a}} produced divided by the volume of {{blank:b}} taken in. The volume of gas in a capillary tube is calculated as {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["carbon dioxide"], choices: ["carbon dioxide", "oxygen", "water vapour"] },
      { id: "b", accepted: ["oxygen"], choices: ["oxygen", "carbon dioxide", "nitrogen"] },
      { id: "c", accepted: ["πr²l"], choices: ["πr²l", "2πrl", "πd²l"] },
    ],
    explanation: "RQ = CO₂ ÷ O₂; V = πr²l.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name a solid chemical, other than potassium hydroxide, used to absorb carbon dioxide in a respirometer.",
    accepted: ["soda lime", "sodalime", "soda-lime"],
    wrong: ["sodium chloride"],
    explanation: "**Soda lime.**",
  });

  // RQ from formula: oleic acid C18H34O2
  const ole = rqFormula({ C: 18, H: 34, O: 2 });
  const o2ole = 18 + 34 / 4 - 2 / 2;
  chk(o2ole, 25.5);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Oleic acid, C₁₈H₃₄O₂, is respired aerobically: C₁₈H₃₄O₂ + 25.5O₂ → 18CO₂ + 17H₂O. Calculate the RQ of oleic acid, to two decimal places.`,
    value: ole, dp: 2, wrong: [dpStr(1 / ole, 2)],
    explanation: t`1. CO₂ produced $= 18$; O₂ taken in $= 25.5$.
2. RQ $= \dfrac{18}{25.5} = ${dpStr(ole, 2)}$.
3. $25.5 \div 18 = ${dpStr(1 / ole, 2)}$ inverts the ratio.`,
    hints: ["RQ = CO₂ ÷ O₂."],
  });
  const r = 0.4, l = 25, m = 5;
  const vol = capillaryVolume(r, l);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a respirometer with KOH, the liquid in a capillary tube of internal radius 0.4 mm moved 25 mm in 5 minutes. Calculate the rate of oxygen uptake in mm³/min, to three significant figures.",
    value: vol / m, sf: 3, unit: "mm³/min", wrong: [sfStr(capillaryVolume(0.8, l) / m, 3), sfStr(vol, 3)],
    explanation: t`1. Volume $= \pi \times 0.4^2 \times 25 = ${sfStr(vol, 4)}\ \text{mm}^3$.
2. Rate $= ${sfStr(vol, 4)} \div 5 = ${sfStr(vol / m, 3)}\ \text{mm}^3\ \text{min}^{-1}$.
3. Using 0.8 mm (the diameter) gives ${sfStr(capillaryVolume(0.8, l) / m, 3)}; forgetting to divide by time gives ${sfStr(vol, 3)}.`,
    hints: ["V = πr²l, then divide by time."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a respirometer could be used to find the RQ of germinating seeds.",
    points: [
      "Seeds in a tube with KOH / soda lime (absorbs CO₂), connected to a capillary; control tube with glass beads; constant temperature water bath and time to equilibrate",
      "Measure distance moved by liquid in a fixed time: gives O₂ uptake (volume = πr²l)",
      "Repeat with water instead of KOH: movement gives O₂ uptake minus CO₂ released",
      "CO₂ released = difference between the two readings; RQ = CO₂ ÷ O₂",
    ],
    modelAnswer: "Put the seeds on gauze above KOH solution, which absorbs carbon dioxide, in a tube connected to a capillary manometer, with a control tube of glass beads, both in a water bath and left to equilibrate. Measure the distance the liquid moves in a fixed time and calculate the volume of oxygen taken in using πr²l. Repeat with water instead of KOH; this movement is oxygen taken in minus carbon dioxide given out. The carbon dioxide released is the difference between the two readings, and RQ is carbon dioxide released divided by oxygen taken in.",
    explanation: "Two readings: with and without CO₂ absorbent.",
    hints: ["What does each reading measure?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Blowfly larvae are used in a respirometer. Describe the precautions needed for safety and for the welfare of the larvae.",
    points: [
      "Gauze platform so larvae do not touch the KOH / soda lime (corrosive)",
      "Keep experiment short / do not use extreme temperatures; return larvae unharmed afterwards",
      "Wear eye protection / gloves when handling KOH; wash hands after handling larvae",
    ],
    modelAnswer: "The larvae are kept on a gauze platform so they cannot touch the corrosive KOH, the experiment is kept short and at temperatures they would meet naturally, and they are returned unharmed afterwards. Eye protection and gloves are worn when handling KOH, and hands are washed after handling the larvae.",
    explanation: "Humane handling and chemical safety.",
    hints: ["Which chemical is corrosive?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "The RQ of a hibernating animal is measured as 0.71 during winter and 0.98 shortly after it has woken and fed. Explain these values.",
    points: [
      "0.71 shows it respires mainly lipid / fat reserves during hibernation",
      "0.98 shows it respires mainly carbohydrate after feeding",
      "Fat stored before hibernation is a compact store releasing more energy per gram / food not available during hibernation",
    ],
    modelAnswer: "An RQ of 0.71 shows that during hibernation the animal respires mainly fat, the reserve it laid down before winter because fat releases about twice as much energy per gram as carbohydrate. After waking and feeding it respires mainly carbohydrate from its food, giving an RQ close to 1.0.",
    explanation: "Link each RQ to a substrate and a reason.",
    hints: ["Which substrate gives 0.7 and which gives 1.0?"],
  });

  // Practice structured: respirometer with groundnut seeds, with and without KOH, three repeats
  const radius = 0.5;
  const koh = [29, 31, 30];
  const water = [9, 8, 10];
  const mK = mean(koh), mW = mean(water);
  chk(mK, 30); chk(mW, 9);
  const vO2 = capillaryVolume(radius, mK);
  const rqv = rq(mK - mW, mK);
  chk(rqv, 0.7);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Rudo used a respirometer (capillary internal radius 0.5 mm) with germinating groundnut seeds at 25 °C. She measured the distance moved by the liquid towards the seeds in 10 minutes, first with KOH and then with water in place of the KOH.\n\n${table(["Contents", "Trial 1 / mm", "Trial 2 / mm", "Trial 3 / mm"], [["With KOH", ...koh.map(String)], ["With water", ...water.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean rate of oxygen uptake in mm³/min, to three significant figures.",
        value: vO2 / 10, sf: 3, unit: "mm³/min", wrong: [sfStr(capillaryVolume(1, mK) / 10, 3), sfStr(vO2, 3)],
        explanation: t`Mean $= 30$ mm. Volume $= \pi \times 0.5^2 \times 30 = ${sfStr(vO2, 4)}$ mm³; rate $= ${sfStr(vO2, 4)} \div 10 = ${sfStr(vO2 / 10, 3)}$ mm³ min⁻¹.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the RQ of the seeds, to two decimal places.",
        value: rqv, dp: 2, wrong: [dpStr(1 / rqv, 2), dpStr(mW / mK, 2)],
        explanation: t`CO₂ released $\propto 30 - 9 = 21$; RQ $= 21 \div 30 = ${dpStr(rqv, 2)}$. Using 9 ÷ 30 treats the net movement as CO₂.`,
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "State what the RQ suggests about the respiratory substrate.",
        points: ["About 0.7: mainly lipid (oil stored in groundnut seeds)"],
        modelAnswer: "An RQ of 0.70 suggests the seeds are respiring mainly lipid, the oil stored in groundnuts.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the liquid moved towards the seeds when water was used instead of KOH.",
        points: ["Seeds take in more O₂ than the CO₂ they release (RQ below 1)", "So the volume of gas in the tube decreases and pressure falls"],
        modelAnswer: "The seeds take in a larger volume of oxygen than the volume of carbon dioxide they give out, so the gas volume in the tube decreases, the pressure falls and the liquid moves towards the seeds.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest one improvement to the method.",
        points: ["Use a control tube of glass beads / boiled seeds, or use a thermostatically controlled water bath, or use the same mass of seeds in each trial, or allow time to equilibrate"],
        modelAnswer: "Include a control tube containing the same volume of glass beads to correct for temperature and pressure changes.",
      }),
    ],
    explanation: "Volume = πr²l; RQ uses the difference between the two readings.",
    hints: ["The movement with water is oxygen uptake minus CO₂ release.", "π r² cancels in the RQ."],
  });

  // Practice structured: temperature and DCPIP decolourisation by yeast
  const temps = [15, 20, 25, 30, 35, 40];
  const times = [400, 250, 160, 100, 80, 125];
  const rates = times.map((x) => 1000 / x);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Sipho added DCPIP to tubes of yeast suspension in glucose solution and recorded the time for the blue colour to disappear at different temperatures.\n\n${table(["Temperature / °C", ...temps.map(String)], [["Time to decolourise / s", ...times.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the rate of decolourisation at 30 °C as 1000/time, in s⁻¹, to one decimal place.",
        value: rates[3], dp: 1, unit: "s⁻¹", wrong: [0.01],
        explanation: t`$1000 \div 100 = ${dpStr(rates[3], 1)}$ s⁻¹.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the effect of temperature on the rate of respiration shown by these results.",
        points: ["Rate increases from 15 °C to a maximum at 35 °C (time falls from 400 s to 80 s)", "Rate decreases above 35 °C (125 s at 40 °C)"],
        modelAnswer: "The time to decolourise falls from 400 s at 15 °C to 80 s at 35 °C, so the rate increases to a maximum at about 35 °C, then rises to 125 s at 40 °C, so the rate falls.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why DCPIP loses its colour in respiring yeast.",
        points: ["Dehydrogenase enzymes remove hydrogen from substrates in respiration", "DCPIP accepts the hydrogen (is reduced), turning from blue to colourless"],
        modelAnswer: "Dehydrogenases remove hydrogen from respiratory substrates, and DCPIP accepts this hydrogen in place of NAD; reduced DCPIP is colourless.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why the tubes should not be shaken during the investigation.",
        points: ["Oxygen would re-oxidise the DCPIP, turning it blue again"],
        modelAnswer: "Shaking mixes in oxygen, which re-oxidises the DCPIP and turns it blue again.",
      }),
    ],
    explanation: "Redox indicators accept hydrogen from dehydrogenases; rate = 1/time.",
    hints: ["Shorter time means a faster rate.", "Which enzymes remove hydrogen?"],
  });

  b.card("DEFINITION", "Define **respiratory quotient**.", "RQ = volume of CO₂ produced ÷ volume of O₂ taken in, in the same time.");
  b.card("FACT", "Typical RQ values", "Carbohydrate 1.0; protein about 0.9; lipid about 0.7; above 1.0: some anaerobic respiration.");
  b.card("FACT", "Energy values of substrates", "Carbohydrate about 16 kJ/g; protein about 17 kJ/g; lipid about 37-39 kJ/g.");
  b.card("CONCEPT", "Why do lipids release most energy per gram?", "More hydrogen atoms per gram, so more reduced NAD and FAD for oxidative phosphorylation.");
  b.card("FORMULA", "Volume of gas from a capillary", "V = πr²l (r = internal radius, l = distance moved by the liquid).");
  b.card("CONCEPT", "Finding RQ with a respirometer", "With KOH: O₂ uptake. With water: O₂ − CO₂. CO₂ = difference. RQ = CO₂ ÷ O₂.");
  b.card("FACT", "Purpose of the control tube", "Glass beads (same volume) compensate for temperature and pressure changes.");
  b.card("FACT", "Redox indicators for respiration", "DCPIP and methylene blue: blue → colourless when they accept hydrogen from dehydrogenases.");
});
