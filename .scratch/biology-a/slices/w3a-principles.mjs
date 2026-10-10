// W3a: principles of homeostasis (Cambridge only).
import { concept, P, t, chk, sfStr, dpStr, table, pctChange } from "../lib.mjs";

concept("abio.homeostasis.principles", { file: "homeostasis/principles", keyPrefix: "homeostasis.principles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes keeping the internal environment of the body within narrow limits?",
    options: [
      ["Homeostasis", "Correct."],
      ["Excretion", "Excretion removes metabolic waste; it contributes to, but is not, homeostasis."],
      ["Osmosis", "Osmosis is the movement of water across a membrane."],
      ["Deamination", "Deamination removes amino groups from amino acids."],
    ],
    answer: "A",
    explanation: "**Homeostasis** keeps the tissue fluid steady.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a negative feedback system, what happens when a factor rises above its set point?",
    options: [
      ["Responses are triggered that bring it back down", "Correct: the change is reversed."],
      ["Responses are triggered that raise it further", "That is positive feedback."],
      ["The set point is raised to match the new value", "The set point stays the same in normal regulation."],
      ["No response occurs until it reaches a lethal value", "Receptors respond to small changes."],
    ],
    answer: "A",
    explanation: "Negative feedback **reverses** the change.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where is urea made in a mammal?",
    options: [
      ["Liver", "Correct: ammonia from deamination is converted to urea."],
      ["Kidney", "The kidney excretes urea but does not make it."],
      ["Pancreas", "The pancreas makes digestive enzymes and hormones."],
      ["Bladder", "The bladder stores urine."],
    ],
    answer: "A",
    explanation: "Urea is made in the **liver**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair are both effectors in temperature regulation?",
    options: [
      ["Sweat glands and the muscles of arteriole walls", "Correct: a gland and muscles."],
      ["Thermoreceptors in the skin and the hypothalamus", "These are a receptor and a coordinator."],
      ["The hypothalamus and sweat glands", "The hypothalamus is the coordinator."],
      ["Skin thermoreceptors and skeletal muscles", "Thermoreceptors are receptors, not effectors."],
    ],
    answer: "A",
    explanation: "Effectors are **muscles and glands**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is it important to keep the water potential of the blood almost constant?",
    options: [
      ["To prevent cells gaining or losing water by osmosis and changing volume", "Correct: cells could shrink or burst."],
      ["To keep enzymes in the blood at their optimum temperature", "Water potential does not set temperature."],
      ["To keep the concentration of red blood cells constant", "This is not the main reason."],
      ["To stop glucose entering cells by diffusion", "Glucose uptake is controlled by insulin and transporters."],
    ],
    answer: "A",
    explanation: "Blood water potential controls **osmosis** into and out of cells.",
    hints: ["Think about what happens to a cell placed in a solution of lower water potential."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which example is positive feedback?",
    options: [
      ["Oxytocin causes stronger uterine contractions, which cause more oxytocin release", "Correct: the change is amplified."],
      ["Insulin lowers blood glucose after a meal", "This reverses the change: negative feedback."],
      ["Sweating lowers body temperature on a hot day", "This reverses the change: negative feedback."],
      ["ADH increases water reabsorption when the blood is concentrated", "This reverses the change: negative feedback."],
    ],
    answer: "A",
    explanation: "Positive feedback **amplifies**; the oxytocin loop ends with birth.",
    hints: ["Which response makes the change bigger?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly compares nervous and hormonal communication?",
    options: [
      ["Nervous responses are faster and usually shorter-lasting", "Correct."],
      ["Hormonal responses are faster and more localised", "Hormones are slower and widespread."],
      ["Both use electrical impulses along neurones", "Hormones travel in the blood."],
      ["Nervous responses reach every cell with a receptor", "That describes hormones."],
    ],
    answer: "A",
    explanation: "Nerves: fast, short-lived, precise. Hormones: slower, longer-lasting, widespread.",
    hints: ["How does each signal travel?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do mammals deaminate excess amino acids rather than storing them?",
    options: [
      ["Amino acids cannot be stored; the keto acid part is used", "Correct: the nitrogen is removed as urea."],
      ["Amino acids are converted directly into urea without any useful product", "The keto acid part is used."],
      ["Amino acids are toxic, so they are excreted unchanged in urine", "Amino acids are reabsorbed, not normally excreted."],
      ["Deamination produces ammonia, which is stored in the liver", "Ammonia is toxic and is converted to urea at once."],
    ],
    answer: "A",
    explanation: "Amino acids cannot be stored; the **keto acid** is used and the nitrogen leaves as urea.",
    hints: ["What happens to each half of the amino acid?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In homeostasis, controlled factors fluctuate slightly around a set point rather than staying exactly constant.",
    answer: true,
    explanation: "True. Negative feedback corrects deviations, so the value oscillates within narrow limits.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ammonia is converted into urea because urea is more toxic than ammonia.",
    answer: false,
    explanation: "False. Urea is **much less toxic** than ammonia.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a control system to an example from temperature regulation.",
    pairs: [
      ["Stimulus", "Rise in blood temperature"],
      ["Receptor", "Thermoreceptors in the hypothalamus"],
      ["Coordinator", "Heat loss centre in the hypothalamus"],
      ["Effector", "Sweat glands"],
    ],
    explanation: "Stimulus → receptor → coordinator → effector.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In the liver, excess amino acids are {{blank:a}}, forming ammonia and a keto acid. Ammonia combines with {{blank:b}} to form urea, which is excreted by the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["deaminated"], choices: ["deaminated", "hydrolysed", "phosphorylated"] },
      { id: "b", accepted: ["carbon dioxide"], choices: ["carbon dioxide", "oxygen", "glucose"] },
      { id: "c", accepted: ["kidneys"], choices: ["kidneys", "lungs", "liver"] },
    ],
    explanation: "Deamination; ammonia + CO₂ → urea; excreted by the kidneys.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the part of the brain that detects changes in core body temperature.",
    accepted: ["hypothalamus", "the hypothalamus"],
    wrong: ["cerebellum"],
    explanation: "The **hypothalamus**.",
  });

  const g0 = 4.6, g1 = 6.9;
  const pc = pctChange(g0, g1);
  chk(pc, 50);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Tendai's blood glucose rose from 4.6 to 6.9 mmol dm⁻³ after a meal. Calculate the percentage increase.",
    value: pc, unit: "%", wrong: [sfStr((g1 - g0) / g1 * 100, 3), 150],
    explanation: t`$\dfrac{6.9 - 4.6}{4.6} \times 100 = ${pc}\%$. Dividing by 6.9 uses the new value instead of the original.`,
  });
  const core = [36.9, 37.3], air = [19, 35];
  const ratio = (air[1] - air[0]) / (core[1] - core[0]);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "During a hot day, air temperature rose from 19 °C to 35 °C while Chipo's core temperature rose from 36.9 °C to 37.3 °C. How many times greater was the rise in air temperature than the rise in core temperature?",
    value: ratio, wrong: [sfStr(1 / ratio, 3)],
    explanation: t`Air: $35 - 19 = 16$ °C. Core: $37.3 - 36.9 = 0.4$ °C. $16 \div 0.4 = ${sfStr(ratio, 3)}$.`,
    hints: ["Find each change first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why it is important for mammals to keep their core body temperature close to 37 °C.",
    points: [
      "Enzymes have an optimum temperature; activity / rate of metabolic reactions is greatest near it",
      "Low temperature: less kinetic energy, fewer enzyme-substrate complexes, metabolism slows",
      "High temperature (above about 40 °C): enzymes / proteins denature, active site changes shape",
      "Constant temperature allows activity independent of the environment (e.g. at night or in cold conditions)",
    ],
    modelAnswer: "Enzymes work fastest near an optimum temperature. If the body cools, molecules have less kinetic energy, fewer enzyme-substrate complexes form and metabolism slows. If it overheats, above about 40 °C, enzymes and other proteins start to denature as their active sites change shape. Keeping a constant temperature lets mammals stay active whatever the external temperature.",
    explanation: "Link temperature to enzyme activity.",
    hints: ["Think about enzymes at low and high temperatures."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the principle of negative feedback, using an example.",
    points: [
      "A change from the set point (stimulus) is detected by receptors",
      "Information passed to a coordinator / control centre, which compares with the set point",
      "Effectors bring about a response that reverses the change",
      "Example correctly described (e.g. rise in blood glucose → insulin → glucose taken up → glucose falls); the response decreases as the factor returns",
    ],
    modelAnswer: "In negative feedback a change from the set point is detected by receptors and the information is passed to a coordinator, which compares it with the set point and sends instructions to effectors. The effectors produce a response that reverses the change. For example, a rise in blood glucose is detected by beta cells, which secrete insulin; liver and muscle cells take up glucose, so the concentration falls, and as it falls less insulin is secreted.",
    explanation: "Receptor → coordinator → effector → reversal.",
    hints: ["Name each component in your example."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why having separate mechanisms to correct a rise and a fall in a factor (for example insulin and glucagon) gives better control than a single mechanism.",
    points: [
      "Correction can be made actively in both directions",
      "Faster / more sensitive response; smaller deviations from the set point",
      "Not dependent on simply stopping one response, which would be slow (e.g. waiting for insulin to be removed)",
    ],
    modelAnswer: "With two mechanisms the body can actively push the factor back in either direction, so the response is faster and more precise and deviations from the set point are smaller. With one mechanism, a change in the other direction could only be corrected slowly by switching that mechanism off.",
    explanation: "Two antagonistic mechanisms give finer control.",
    hints: ["Compare an accelerator alone with an accelerator plus a brake."],
  });

  const tm = [0, 25, 50, 75, 100, 125];
  const gl = [4.6, 7.1, 6.3, 5.4, 4.7, 4.5];
  const fall = (gl[1] - gl[4]) / (tm[4] - tm[1]);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tendai's blood glucose concentration was measured after a meal.\n\n${table(["Time after meal / min", ...tm.map(String)], [["Blood glucose / mmol dm⁻³", ...gl.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean rate of fall in blood glucose between 25 and 100 minutes, in mmol dm⁻³ per minute, to two significant figures.",
        value: fall, sf: 2, wrong: [sfStr(2.4 / 100, 2)],
        explanation: t`$(7.1 - 4.7) \div (100 - 25) = 2.4 \div 75 = ${sfStr(fall, 2)}$ mmol dm⁻³ min⁻¹.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe how the results show negative feedback.",
        points: ["Glucose rises after the meal (to 7.1) and is brought back close to the starting value (4.7 at 100 min, compared with 4.6)", "Falls slightly below (4.5) then would be corrected: fluctuation around a set point"],
        modelAnswer: "The concentration rises to 7.1 mmol dm⁻³ after the meal and is then brought back down to 4.7 by 100 minutes, close to the starting value of 4.6, dipping slightly to 4.5 before being corrected, so it fluctuates around a set point.",
      }),
      P.short({ label: "(c)", marks: 1, stem: "Name the hormone mainly responsible for the fall between 25 and 100 minutes.", accepted: ["insulin"], wrong: ["glucagon"], explanation: "**Insulin.**" }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the blood glucose concentration must not fall too low.",
        points: ["Cells (especially brain cells) need glucose for respiration", "Brain cells rely almost entirely on glucose / cannot store much", "Too little glucose: less ATP, cells cannot function (e.g. confusion, unconsciousness)"],
        modelAnswer: "Cells need a steady supply of glucose for respiration, and brain cells depend almost entirely on glucose from the blood because they store very little. If the concentration falls too low, cells make too little ATP and cannot function, leading to confusion or unconsciousness.",
      }),
    ],
    explanation: "Blood glucose fluctuates about a set point under negative feedback.",
    hints: ["Rate = change ÷ time."],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A meal rich in protein provides more amino acids than the body needs.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the process in which the amino group is removed from an amino acid.", accepted: ["deamination"], wrong: ["transamination"], explanation: "**Deamination.**" }),
      P.short({ label: "(b)", marks: 1, stem: "Name the toxic nitrogenous compound formed directly by this process.", accepted: ["ammonia", "NH3", "NH₃"], wrong: ["urea"], explanation: "**Ammonia.**" }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why this compound is converted to urea.",
        points: ["Ammonia is highly toxic / very soluble / affects pH", "Urea is much less toxic, so it can be carried in the blood to the kidneys safely"],
        modelAnswer: "Ammonia is very soluble and highly toxic, so it is converted to urea, which is much less toxic and can be carried safely in the blood to the kidneys.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two possible fates of the rest of the amino acid molecule.",
        points: ["Respired (to release energy)", "Converted to glucose / glycogen or fat (stored)"],
        modelAnswer: "The keto acid can be respired to release energy, or converted into glucose, glycogen or fat for storage.",
      }),
    ],
    explanation: "Deamination in the liver: ammonia → urea; keto acid used.",
    hints: ["Two products of deamination."],
  });

  b.card("DEFINITION", "Define **homeostasis**.", "Maintaining a relatively constant internal environment (tissue fluid) within narrow limits.");
  b.card("DEFINITION", "Define **negative feedback**.", "A change from the set point triggers responses that reverse it.");
  b.card("CONCEPT", "Components of a control system", "Stimulus → receptor → coordinator → (nerves or hormones) → effector → response.");
  b.card("FACT", "Three factors controlled in mammals", "Core temperature (about 37 °C), blood glucose (about 4-6 mmol dm⁻³ fasting), blood water potential.");
  b.card("CONCEPT", "Nervous versus hormonal control", "Nervous: fast, short-lived, localised. Hormonal: slower, longer-lasting, widespread.");
  b.card("FACT", "Example of positive feedback", "Oxytocin and uterine contractions in childbirth.");
  b.card("CONCEPT", "Deamination and urea", "Liver: amino acid → ammonia + keto acid; ammonia + CO₂ → urea, excreted by kidneys.");
  b.card("FACT", "What are effectors?", "Muscles and glands that bring about a response.");
});
