// W2a: the heart, cardiac cycle, cardiac output and myogenic control.
import { concept, P, t, chk, ZIM, table, cardiacOutput, sfStr, dpStr, rnd } from "../lib.mjs";

concept("abio.mammal-transport.heart", { file: "mammal-transport/heart", keyPrefix: "mammal-transport.heart" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which chamber of the heart receives blood from the pulmonary veins?",
    options: [
      ["Left atrium", "Correct: oxygenated blood returns from the lungs to the left atrium."],
      ["Right atrium", "The right atrium receives blood from the venae cavae."],
      ["Left ventricle", "The left ventricle receives blood from the left atrium."],
      ["Right ventricle", "The right ventricle pumps blood to the lungs."],
    ],
    answer: "A",
    explanation: "Pulmonary veins → **left atrium**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the wall of the left ventricle thicker than the wall of the right ventricle?",
    options: [
      ["It must produce a higher pressure to pump blood round the whole body", "Correct."],
      ["It pumps a larger volume of blood per beat than the right ventricle", "Both ventricles pump the same volume per beat."],
      ["It receives deoxygenated blood, which needs more force to move round the body", "The left side carries oxygenated blood; oxygen content does not change the force needed."],
      ["It contracts before the right ventricle", "Both ventricles contract together."],
    ],
    answer: "A",
    explanation: "The systemic circuit is longer with more resistance, so the left ventricle generates a **higher pressure**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which structure acts as the pacemaker of the heart?",
    options: [
      ["Sinoatrial node", "Correct: in the wall of the right atrium."],
      ["Atrioventricular node", "The AVN delays the impulse; it does not normally set the rhythm."],
      ["Bundle of His", "The bundle of His conducts excitation down the septum."],
      ["Purkyne tissue", "Purkyne tissue spreads excitation through the ventricle walls."],
    ],
    answer: "A",
    explanation: "The **SAN** initiates each wave of excitation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the importance of the delay at the atrioventricular node?",
    options: [
      ["The atria finish contracting before the ventricles contract", "Correct: the ventricles fill fully first."],
      ["The ventricles contract before the atria to prevent backflow", "Ventricles contract after the atria."],
      ["The SAN has time to recover before the next impulse", "The delay concerns the timing of atria and ventricles."],
      ["The semilunar valves have time to open before atrial systole", "Semilunar valves open during ventricular systole."],
    ],
    answer: "A",
    explanation: "The delay of about 0.1 s lets the **atria empty completely** into the ventricles before ventricular systole.",
    hints: ["What must be complete before the ventricles contract?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During one point in the cardiac cycle, pressure in the left ventricle is higher than in the left atrium but lower than in the aorta. Which valves are open?",
    options: [
      ["Neither valve is open", "Correct: both are closed (isovolumetric contraction or relaxation)."],
      ["Only the bicuspid valve", "The bicuspid valve closes when ventricular pressure exceeds atrial pressure."],
      ["Only the aortic semilunar valve", "It opens only when ventricular pressure exceeds aortic pressure."],
      ["Both valves", "Both pressure differences point the wrong way for opening."],
    ],
    answer: "A",
    explanation: "Ventricle > atrium closes the bicuspid; ventricle < aorta keeps the semilunar closed: **both closed**.",
    hints: ["A valve opens only when the pressure behind it is higher."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do the ventricles contract from the apex upwards?",
    options: [
      ["To push blood up towards the arteries leaving the top of the heart", "Correct: like squeezing a tube from the bottom."],
      ["Because the SAN is at the apex of the heart", "The SAN is in the right atrium wall."],
      ["To close the semilunar valves at the start of systole", "Semilunar valves close at the end of systole."],
      ["So that the atria can refill with blood from the veins during ventricular systole", "Atria do refill then, but this is not why contraction starts at the apex."],
    ],
    answer: "A",
    explanation: "Purkyne tissue carries excitation to the **apex** first, so contraction squeezes blood **upwards** into the aorta and pulmonary artery.",
    hints: ["Where do the arteries leave the heart?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a person with a damaged (leaking) bicuspid valve, which would be expected during ventricular systole?",
    options: [
      ["Some blood flows back into the left atrium, reducing stroke volume", "Correct: the valve no longer prevents backflow."],
      ["Blood flows back from the aorta into the left ventricle", "That would be a leaking aortic semilunar valve, during diastole."],
      ["Deoxygenated blood mixes with oxygenated blood through a gap in the septum", "That would be a hole in the septum."],
      ["The SAN stops generating impulses", "Valve damage does not stop the pacemaker."],
    ],
    answer: "A",
    explanation: "A leaking **AV valve** lets blood return to the atrium when the ventricle contracts, so less is pumped into the aorta.",
    hints: ["Which valve separates the left atrium and ventricle?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cardiac muscle is myogenic: it can contract without stimulation by a nerve.",
    answer: true,
    explanation: "True. The SAN generates the impulse within the heart.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The tendinous cords pull the atrioventricular valves open during atrial systole.",
    answer: false,
    explanation: "False. Valves open and close because of pressure differences. The cords stop AV valves turning inside out during ventricular systole.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the conducting system to its role.",
    pairs: [
      ["Sinoatrial node", "Generates regular waves of excitation (pacemaker)"],
      ["Non-conducting tissue", "Stops excitation passing directly from atria to ventricles"],
      ["Atrioventricular node", "Delays the excitation before passing it on"],
      ["Purkyne tissue", "Carries excitation up the ventricle walls from the apex"],
    ],
    explanation: "SAN → atria → AVN (delay) → bundle of His → Purkyne tissue.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When ventricular pressure rises above atrial pressure the {{blank:a}} valves close. When it rises above aortic pressure the {{blank:b}} valves open.",
    blanks: [
      { id: "a", accepted: ["atrioventricular"], choices: ["atrioventricular", "semilunar"] },
      { id: "b", accepted: ["semilunar"], choices: ["semilunar", "atrioventricular"] },
    ],
    explanation: "AV valves close first, then semilunar valves open.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the blood vessels that supply the heart muscle itself with oxygenated blood.",
    accepted: ["coronary arteries", "coronary artery", "the coronary arteries"],
    wrong: ["pulmonary arteries", "coronary veins"],
    explanation: "The **coronary arteries** branch from the aorta.",
  });

  // Calculations (numbers differ from the lesson)
  const sv = 85, hr = 64;
  const co = cardiacOutput(sv, hr);
  chk(co, 5440);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A trained athlete at rest has a stroke volume of 85 cm³ and a heart rate of 64 beats/min. Calculate the cardiac output in dm³/min, to three significant figures.",
    value: co / 1000, unit: "dm³/min", sf: 3, wrong: [5440, sfStr(85 / 64, 3)],
    explanation: t`$85 \times 64 = 5440\ \text{cm}^3\ \text{min}^{-1} = 5.44\ \text{dm}^3\ \text{min}^{-1}$. Not converting cm³ to dm³ gives 5440.`,
  });
  const cycle = 0.68;
  const rate = 60 / cycle;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "One cardiac cycle lasts 0.68 s. Calculate the heart rate in beats/min, to the nearest whole number.",
    value: rate, dp: 0, unit: "beats/min", wrong: [41, sfStr(cycle * 60, 3)],
    explanation: t`Heart rate $= 60 \div 0.68 = ${dpStr(rate, 2)} \approx ${dpStr(rate, 0)}$ beats/min. Multiplying gives ${sfStr(cycle * 60, 3)}.`,
  });
  const coEx = 21000, hrEx = 175;
  const svEx = coEx / hrEx;
  chk(svEx, 120);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "During hard exercise Thandeka's cardiac output is 21.0 dm³/min and her heart rate is 175 beats/min. Calculate her stroke volume in cm³.",
    value: svEx, unit: "cm³", wrong: [0.12, rnd(175 / 21, 1)],
    explanation: t`1. Cardiac output $= 21.0\ \text{dm}^3\ \text{min}^{-1} = 21\,000\ \text{cm}^3\ \text{min}^{-1}$.
2. Stroke volume $= \dfrac{\text{cardiac output}}{\text{heart rate}} = 21\,000 \div 175 = 120\ \text{cm}^3$.
3. Forgetting to convert dm³ to cm³ gives 0.12.`,
    hints: ["Rearrange cardiac output = stroke volume × heart rate.", "1 dm³ = 1000 cm³."],
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how the heartbeat is initiated and coordinated.",
    points: [
      "SAN in the right atrium wall generates waves of excitation (myogenic pacemaker)",
      "Excitation spreads across the atria, which contract",
      "Non-conducting tissue prevents direct spread to ventricles; AVN delays the impulse (about 0.1 s)",
      "Delay allows atria to empty / ventricles to fill before they contract",
      "Bundle of His and Purkyne tissue carry excitation to the apex and up the ventricle walls; ventricles contract from the apex upwards",
    ],
    modelAnswer: "The sinoatrial node in the wall of the right atrium generates regular waves of excitation without nervous stimulation. These spread across the atria, which contract. Non-conducting tissue stops the wave reaching the ventricles directly; instead the atrioventricular node picks it up and delays it for about 0.1 s, so the atria finish emptying into the ventricles. The excitation then passes down the bundle of His to the apex and up the ventricle walls in the Purkyne tissue, so the ventricles contract from the apex upwards, pushing blood into the arteries.",
    explanation: "SAN → atria → AVN delay → bundle of His → Purkyne → ventricles.",
    hints: ["Start at the SAN and follow the excitation."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the walls of the atria are thinner than the walls of the ventricles.",
    points: [
      "Atria pump blood only into the ventricles (short distance) / low pressure needed",
      "Ventricles pump blood out of the heart into arteries / to lungs or whole body",
      "So ventricles need more muscle to produce higher pressure",
    ],
    modelAnswer: "The atria push blood only a short distance, down into the ventricles, so they need little force. The ventricles must pump blood out of the heart to the lungs or the whole body, so they need much more muscle to generate a high pressure.",
    explanation: "Wall thickness matches the pressure needed.",
    hints: ["Where does each chamber send its blood?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Outline how heart rate is increased during exercise.",
    points: [
      "Cardiovascular centre in the medulla (detects rise in CO₂ / fall in pH / stretch)",
      "Sends more impulses along sympathetic nerves to the SAN (fewer along the vagus)",
      "Adrenaline from the adrenal glands increases rate and force of contraction",
    ],
    modelAnswer: "During exercise, receptors detect the rise in blood carbon dioxide (fall in pH). The cardiovascular centre in the medulla sends more impulses along sympathetic nerves to the SAN and fewer along the vagus nerve, so the SAN fires faster. Adrenaline from the adrenal glands also increases the rate and force of contraction.",
    explanation: "The SAN sets the rhythm; nerves and adrenaline adjust it.",
    hints: ["Which part of the brain and which hormone?"],
  });

  // Practice structured: pressure data (different from the lesson)
  const T = [0, 90, 180, 270, 360, 450, 540, 630];
  const LA = [3, 10, 2, 4, 5, 9, 6, 3];
  const LV = [2, 8, 102, 126, 48, 1, 4, 2];
  const AO = [78, 76, 98, 121, 95, 89, 84, 79];
  const open = T.map((_, i) => LV[i] > AO[i]);
  const avOpen = T.map((_, i) => LA[i] > LV[i]);
  const cyc = 0.72;
  const hrQ = 60 / cyc;
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows pressures on the left side of the heart of a student during one cardiac cycle, which began at 0 ms and ended at 720 ms.\n\n${table(["Time / ms", ...T.map(String)], [["Left atrium / mmHg", ...LA.map(String)], ["Left ventricle / mmHg", ...LV.map(String)], ["Aorta / mmHg", ...AO.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "At which time is the aortic semilunar valve open?",
        options: [["270 ms", "Correct: ventricle 126 mmHg > aorta 121 mmHg."], ["90 ms", "Ventricle 8 mmHg is far below aorta 76 mmHg."], ["360 ms", "Ventricle 48 mmHg < aorta 95 mmHg: closed."], ["540 ms", "Ventricle 4 mmHg < aorta 84 mmHg: closed."]],
        answer: "A", explanation: "Open only when ventricular pressure exceeds aortic pressure: 180 ms and 270 ms.",
      }),
      P.mcq({
        label: "(b)", stem: "At which time is the bicuspid valve open?",
        options: [["450 ms", "Correct: atrium 9 mmHg > ventricle 1 mmHg."], ["180 ms", "Ventricle 102 mmHg > atrium: closed."], ["270 ms", "Ventricle 126 mmHg > atrium: closed."], ["360 ms", "Ventricle 48 mmHg > atrium 5 mmHg: closed."]],
        answer: "A", explanation: "The bicuspid valve is open when atrial pressure exceeds ventricular pressure.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the student's heart rate in beats/min, to the nearest whole number.",
        value: hrQ, dp: 0, unit: "beats/min", wrong: [43],
        explanation: t`One cycle lasts 720 ms $= 0.72$ s. Heart rate $= 60 \div 0.72 = ${dpStr(hrQ, 2)} \approx ${dpStr(hrQ, 0)}$ beats/min.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the pressure in the aorta does not fall below 75 mmHg during diastole.",
        points: ["Elastic fibres in the aorta wall were stretched during systole", "They recoil during diastole, maintaining pressure / semilunar valve stops backflow into the ventricle"],
        modelAnswer: "The elastic fibres of the aorta wall stretch during systole and recoil during diastole, pushing on the blood and keeping the pressure up, while the closed semilunar valve stops blood flowing back into the ventricle.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest how the pressures in the right ventricle would differ from the left ventricle.",
        points: ["Lower maximum pressure (about a third to a quarter) because the right ventricle has a thinner wall and pumps only to the lungs"],
        modelAnswer: "The right ventricle's maximum pressure would be much lower, because its thinner wall pumps blood only to the nearby lungs.",
      }),
    ],
    explanation: "Valves follow the pressure differences; heart rate = 60 ÷ cycle time.",
    hints: ["Compare the two pressures on either side of each valve."],
    calculator: true,
  });
  chk(open.filter(Boolean).length, 2);
  chk(avOpen.filter(Boolean).length, 5);

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Sipho dissected a sheep's heart. He cut open the left ventricle and found two thin flaps attached by string-like cords to small projections of the ventricle wall. At the base of the large vessel leaving this ventricle he found three small pocket-shaped flaps.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the valve formed by the two thin flaps.", accepted: ["bicuspid valve", "bicuspid", "mitral valve", "mitral", "left atrioventricular valve", "atrioventricular valve"], wrong: ["tricuspid valve"], explanation: "Two flaps on the left: the bicuspid (mitral) valve." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the large vessel leaving the left ventricle.", accepted: ["aorta", "the aorta"], wrong: ["pulmonary artery"], explanation: "The aorta leaves the left ventricle." }),
      P.manual({
        label: "(c)", marks: 2, stem: "State the function of the string-like cords and explain why they are needed.",
        points: ["Tendinous cords / chordae tendineae hold the valve flaps (attached to papillary muscles)", "Stop the valve turning inside out (into the atrium) when ventricular pressure is high, preventing backflow"],
        modelAnswer: "These are tendinous cords. They anchor the flaps to papillary muscles so that the valve does not turn inside out into the atrium when the ventricle contracts at high pressure, preventing backflow.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how the pocket-shaped flaps prevent backflow during diastole.",
        points: ["When ventricular pressure falls below aortic pressure, blood flowing back fills the pockets", "The pockets meet and close the opening (semilunar valve shut)"],
        modelAnswer: "When the ventricle relaxes and its pressure falls below that in the aorta, blood starts to flow back and fills the pockets, which balloon out, meet and seal the opening.",
      }),
    ],
    explanation: "AV valves with cords; semilunar valves as pockets.",
    hints: ["Which valves are anchored by cords?"],
  });

  b.card("DEFINITION", "Define **cardiac output**.", "Volume of blood pumped by one ventricle per minute = stroke volume × heart rate.");
  b.card("FORMULA", "Heart rate from cycle length", "Heart rate (beats/min) = 60 ÷ duration of one cycle (s).");
  b.card("CONCEPT", "Order of events in the cardiac cycle", "Atrial systole → ventricular systole (AV valves close, semilunar open) → diastole (semilunar close, AV open, filling).");
  b.card("CONCEPT", "Why valves open and close", "Passively, by pressure differences: open when pressure behind is higher, close when it reverses.");
  b.card("CONCEPT", "Coordination of the heartbeat", "SAN → atria contract → AVN delay (~0.1 s) → bundle of His → Purkyne tissue → ventricles contract from apex.");
  b.card("FACT", "Why is the left ventricle wall thicker?", "It generates higher pressure to pump blood through the whole systemic circulation.");
  b.card("DEFINITION", "Define **myogenic**.", "Contracting rhythmically without nervous stimulation (cardiac muscle).");
  b.card("FACT", "Function of the tendinous cords", "Stop atrioventricular valves turning inside out during ventricular systole.");
  b.card("FACT", "What adjusts the heart rate?", "Cardiovascular centre in the medulla (sympathetic speeds up, vagus slows) and adrenaline.", undefined, { applies: ZIM });
});
