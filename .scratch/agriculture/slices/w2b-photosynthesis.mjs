// Slice W2b: photosynthesis.
import { concept, P, t, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// Pondweed bubbles in 3 minutes at different temperatures (numbers differ from the lesson).
const MINS = 3;
const TEMP = [[15, 18], [25, 42], [35, 57], [45, 9]];
const TEMP_TABLE = table(["Temperature (°C)", `Bubbles in ${MINS} min`], TEMP.map(([c, n]) => [c, n]));
const rate35 = 57 / MINS;
check(rate35 === 19, "rate35");
const rise15to25 = pctChange(18, 42);
check(Math.abs(rise15to25 - 133.333) < 1e-2, "rise");

// Light-distance item.
const L_BUBBLES = 75, L_MIN = 5;
const lRate = L_BUBBLES / L_MIN;
check(lRate === 15, "lRate");

// Molecules in the balanced equation.
const glucoseFrom = 6; // CO2 molecules per glucose

concept("agri.plants.photosynthesis", { file: "plants/photosynthesis", keyPrefix: "plants.photosynthesis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of substances are the raw materials of photosynthesis?",
    options: [
      ["Carbon dioxide and water", "Correct: both are combined to make glucose."],
      ["Oxygen and water", "Oxygen is a product of photosynthesis, not a raw material."],
      ["Glucose and oxygen", "These are the products."],
      ["Carbon dioxide and chlorophyll", "Chlorophyll absorbs light; it is not used up as a raw material."],
    ],
    answer: "A",
    explanation: "Carbon dioxide + water → glucose + oxygen, with light energy absorbed by chlorophyll.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the role of chlorophyll in photosynthesis?",
    options: [
      ["It absorbs light energy", "Correct: the green pigment traps light."],
      ["It takes in carbon dioxide from the air", "Carbon dioxide enters through the stomata."],
      ["It carries water to the leaf cells", "Water is carried in the xylem."],
      ["It stores the glucose that is made", "Glucose is stored as starch, not in chlorophyll."],
    ],
    answer: "A",
    explanation: "Chlorophyll in the chloroplasts absorbs the light energy that drives photosynthesis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a leaf boiled in ethanol during the starch test?",
    options: [
      ["To remove the chlorophyll from the leaf", "Correct: the green colour would hide the result."],
      ["To kill the leaf and break the cell membranes", "That is done by boiling in water first."],
      ["To change all the glucose in the leaf into starch before testing", "Ethanol does not make starch."],
      ["To soften the leaf so that it can be spread out", "Softening is done by dipping in hot water afterwards."],
    ],
    answer: "A",
    explanation: "Ethanol dissolves chlorophyll, leaving a pale leaf on which the blue-black or brown colour of iodine shows clearly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a plant kept in the dark for about two days before an experiment on photosynthesis?",
    options: [
      ["To use up the starch already in its leaves", "Correct: this is destarching, so any starch found later was made during the experiment."],
      ["To let the stomata open fully before the experiment", "Stomata close in darkness."],
      ["To increase the amount of chlorophyll in the leaves", "Darkness does not increase chlorophyll."],
      ["To let the plant absorb extra carbon dioxide", "Without light the plant cannot use carbon dioxide."],
    ],
    answer: "A",
    explanation: "Destarching removes stored starch so that a positive starch test can only come from photosynthesis during the experiment.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which chemical is used to absorb carbon dioxide in an experiment to show that carbon dioxide is needed for photosynthesis?",
    options: [
      ["Soda lime", "Correct: it absorbs carbon dioxide (potassium hydroxide solution also works)."],
      ["Iodine solution", "Iodine is used to test for starch."],
      ["Ethanol", "Ethanol removes chlorophyll from the leaf."],
      ["Limewater", "Limewater is used to detect carbon dioxide (it turns milky); soda lime is used to remove it."],
    ],
    answer: "A",
    explanation: "Soda lime or potassium hydroxide removes carbon dioxide from the air around the test leaf.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A variegated leaf with green edges and a white centre is tested for starch after a day in sunlight. What is the result?",
    options: [
      ["The green edges turn blue-black and the white centre stays brown", "Correct: only parts with chlorophyll made starch."],
      ["The white centre turns blue-black and the green edges stay brown", "This is the reverse of the result."],
      ["The whole leaf turns blue-black because all of it received light", "The white part has no chlorophyll, so it makes no starch."],
      ["The whole leaf stays brown because variegated leaves cannot photosynthesise", "The green parts can photosynthesise."],
    ],
    answer: "A",
    hints: ["Which parts have chlorophyll?"],
    explanation: "This experiment shows that chlorophyll is needed for photosynthesis.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On a bright, hot day a farmer's maize leaves roll up and the stomata close. Why does photosynthesis slow down?",
    options: [
      ["Carbon dioxide cannot enter the leaves through closed stomata", "Correct: closing stomata to save water cuts off the carbon dioxide supply."],
      ["Light cannot pass through rolled leaves to reach the xylem", "Light is absorbed by chloroplasts, not the xylem."],
      ["Oxygen builds up in the soil and stops root respiration", "Oxygen in the soil is not the cause."],
      ["Chlorophyll is destroyed whenever the temperature rises above 25 °C", "Chlorophyll is not destroyed at such temperatures."],
    ],
    answer: "A",
    hints: ["What enters through the stomata?"],
    explanation: "Water stress closes stomata, so carbon dioxide becomes limiting even in bright light.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a closed tunnel on a sunny morning, increasing the light has no effect on tomato growth, but opening the tunnel sides increases growth. What was the limiting factor?",
    options: [
      ["Carbon dioxide concentration", "Correct: fresh air brings in carbon dioxide used up in the closed tunnel."],
      ["Light intensity", "More light had no effect, so light was not limiting."],
      ["Chlorophyll content of the leaves", "Opening the tunnel does not change chlorophyll content."],
      ["Water in the soil of the tunnel", "Opening the sides does not add water to the soil."],
    ],
    answer: "A",
    hints: ["A limiting factor is the one whose increase raises the rate."],
    explanation: "Only increasing the factor in shortest supply raises the rate; here fresh air restored carbon dioxide.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Oxygen is a by-product of photosynthesis.",
    answer: true,
    explanation: "True. Oxygen is released and diffuses out through the stomata.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Raising the temperature always increases the rate of photosynthesis.",
    answer: false,
    explanation: "False. The rate rises up to an optimum and then falls, because the enzymes are damaged at high temperatures.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each experiment with what it shows.",
    pairs: [
      ["Part of a leaf covered with foil", "Light is needed"],
      ["Variegated leaf tested for starch", "Chlorophyll is needed"],
      ["Leaf enclosed with soda lime", "Carbon dioxide is needed"],
      ["Gas from pondweed relights a glowing splint", "Oxygen is produced"],
    ],
    explanation: "Each experiment removes one requirement (or collects one product) and uses a control.",
  });
  b.fib({
    d: 2,
    stem: "Complete the balanced equation for photosynthesis by filling in the numbers.",
    template: t`{{blank:a}} CO₂ + 6 H₂O → C₆H₁₂O₆ + {{blank:b}} O₂`,
    blanks: [
      { id: "a", accepted: [String(glucoseFrom), "six"] },
      { id: "b", accepted: ["6", "six"] },
    ],
    explanation: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the colour seen when iodine solution is added to a leaf that contains starch.",
    accepted: ["blue-black", "blue black", "blueblack", "black", "dark blue", "blue"],
    rejected: ["brown", "orange", "yellow"],
    explanation: "Starch turns iodine **blue-black**; without starch the iodine stays brown.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Pondweed near a lamp gives off ${L_BUBBLES} bubbles of gas in ${L_MIN} minutes. Calculate the rate in bubbles per minute.`,
    value: lRate, wrong: [L_BUBBLES * L_MIN],
    explanation: `Rate = ${L_BUBBLES} ÷ ${L_MIN} = ${lRate} bubbles per minute. Multiplying instead of dividing gives a wrong answer.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how to test a leaf for starch.",
    hints: ["There are four main steps, and one safety point."],
    points: [
      "Boil the leaf in water for about a minute (kills it / breaks membranes).",
      "Turn off the flame and place the leaf in ethanol in a hot-water bath to remove the chlorophyll (ethanol is flammable).",
      "Dip the leaf in hot water to soften it and spread it on a white tile.",
      "Add iodine solution: blue-black shows starch, brown shows no starch.",
    ],
    modelAnswer: "Boil the leaf in water for a minute. With the flame off, put it in a tube of ethanol in the hot water until it is pale. Dip it in hot water to soften it, spread it on a white tile and add iodine: blue-black means starch is present, brown means none.",
    explanation: "Numbered steps with the colour result.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** field practices that increase the rate of photosynthesis of a maize crop, and explain how each works.",
    hints: ["Think of light, water, carbon dioxide entry and chlorophyll."],
    points: [
      "Correct spacing / plant population.",
      "So leaves are not shaded and the crop canopy captures most light.",
      "Weeding / irrigation / nitrogen top dressing.",
      "Removes shading and competition / keeps stomata open for carbon dioxide / nitrogen is needed for chlorophyll.",
    ],
    modelAnswer: "Plant at the correct spacing so that leaves do not shade each other and the canopy captures most light. Top dress with nitrogen, which is needed to make chlorophyll, so leaves stay green and absorb more light.",
    explanation: "Each practice must be linked to a factor.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Tendai placed pondweed in water at different temperatures, with a lamp at a fixed distance, and counted the gas bubbles given off in ${MINS} minutes.\n\n${TEMP_TABLE}`,
    hints: ["Rate = bubbles ÷ time.", "Photosynthesis is controlled by enzymes."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the rate of bubbling at 35 °C, in bubbles per minute.",
        value: rate35, wrong: [57],
        explanation: `57 ÷ ${MINS} = ${rate35} bubbles per minute.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage increase in bubbles from 15 °C to 25 °C, to the nearest whole number.",
        value: rise15to25, unit: "%", tol: 0.5, answer: "133", wrong: [round(pctChange(42, 18), 0)],
        explanation: `(42 − 18) ÷ 18 × 100 = ${round(rise15to25, 1)}%, which is 133% to the nearest whole number.`,
      }),
      P.short({
        label: "(c)", stem: "Name the gas collected.",
        accepted: ["oxygen", "o2"],
        explanation: "Oxygen is the by-product of photosynthesis.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the fall in the number of bubbles at 45 °C.",
        points: ["Photosynthesis is controlled by enzymes.", "Above the optimum temperature the enzymes are damaged (denatured), so the rate falls."],
        explanation: "Temperature acts through enzymes.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** variables that Tendai must keep constant.",
        points: ["Light intensity / distance of the lamp.", "Same pondweed / same carbon dioxide (sodium hydrogencarbonate) in the water / same time."],
        explanation: "Only temperature should change.",
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Suggest why greenhouse growers ventilate their houses on very hot days.",
        points: ["To keep the temperature near the optimum (and let in carbon dioxide) so photosynthesis does not slow."],
        explanation: "Ventilation prevents overheating.",
      }),
    ],
    explanation: "The rate rises to an optimum and then falls as enzymes are damaged; control other variables.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Rudo destarched two potted bean plants. She put plant X under a clear bell jar with a dish of soda lime and plant Y under a clear bell jar with a dish of water. Both were left in sunlight for six hours and a leaf from each was tested with iodine.",
    hints: ["Which plant had no carbon dioxide?", "What is the purpose of plant Y?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which result is expected?",
        options: [
          ["X stays brown and Y turns blue-black", "Correct: X had no carbon dioxide, so no starch was made."],
          ["X turns blue-black and Y stays brown", "This is the reverse of the expected result."],
          ["Both turn blue-black", "X could not photosynthesise without carbon dioxide."],
          ["Both stay brown", "Y had carbon dioxide and light, so it made starch."],
        ],
        answer: "A",
        explanation: "Soda lime removed carbon dioxide from X.",
      }),
      P.short({
        label: "(b)", stem: "State the purpose of plant Y.",
        accepted: ["control", "a control", "to act as a control", "it is the control", "comparison", "for comparison"],
        keywords: { any: ["control", "compar"] },
        explanation: "Y is the control: everything is the same except carbon dioxide.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the plants were destarched.",
        points: ["To remove the starch already present in the leaves.", "So any starch found was made during the experiment."],
        explanation: "Destarching makes the result valid.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State what this experiment shows and give one source of carbon dioxide for crops in a field.",
        points: ["Carbon dioxide is needed for photosynthesis (starch formation).", "The air (respiration of organisms / decomposition of organic matter in the soil)."],
        explanation: "Conclusion and source.",
      }),
    ],
    explanation: "Removing carbon dioxide stops starch production; the control proves it.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says that the only way to raise the yield of his maize is to apply more fertiliser. Using your knowledge of photosynthesis, discuss this view.",
    hints: ["Name the factors that can limit photosynthesis in a field.", "Is fertiliser always the limiting factor?"],
    points: [
      "Nitrogen and magnesium are needed for chlorophyll, so fertiliser can raise photosynthesis when nutrients are short.",
      "But the rate is controlled by the limiting factor, which may be water, light or leaf health instead.",
      "In a drought, stomata close and carbon dioxide cannot enter: irrigation or moisture conservation would help more than fertiliser.",
      "Weeds and poor spacing shade the crop: weeding and correct plant population raise light capture.",
      "Pests and diseases reduce leaf area: control them to keep green leaf.",
      "Judgement: fertiliser helps only when nutrients are limiting; the farmer should find and correct the limiting factor.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Fertiliser can raise yield, because nitrogen and magnesium are needed to make chlorophyll and nitrogen to make proteins, so a hungry crop photosynthesises faster after top dressing. But the rate of photosynthesis is set by the limiting factor. If the crop is short of water, the stomata close and carbon dioxide cannot enter, so more fertiliser does nothing; irrigation or mulching would help. If the maize is crowded or weedy, light is limiting, so correct spacing and weeding raise yield. Leaf diseases or fall armyworm reduce the green leaf area. So the farmer is only partly right: fertiliser raises yield only when nutrients are the limiting factor.",
    explanation: "Use the idea of limiting factors to judge the claim.",
  });

  b.card("DEFINITION", "Photosynthesis", "Use of light energy, absorbed by chlorophyll, to make glucose from carbon dioxide and water, releasing oxygen.");
  b.card("FORMULA", "Balanced equation for photosynthesis", t`$\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$ (light and chlorophyll over the arrow).`);
  b.card("DEFINITION", "Limiting factor", "The factor in shortest supply, which controls the rate of a process.");
  b.card("CONCEPT", "Starch test steps", "Boil in water; ethanol in a hot-water bath (no flame) to remove chlorophyll; soften in hot water; iodine: blue-black = starch.");
  b.card("CONCEPT", "Destarching", "Keep the plant in the dark for about two days so leaf starch is used up before the experiment.");
  b.card("FACT", "What absorbs carbon dioxide in a photosynthesis experiment?", "Soda lime or potassium hydroxide solution.");
  b.card("CONCEPT", "Factors affecting the rate", "Light intensity, carbon dioxide concentration, temperature (optimum, enzymes), water supply, chlorophyll.");
  b.card("CONCEPT", "Uses of glucose made in photosynthesis", "Respiration, starch storage, sucrose for transport, cellulose, proteins (with nitrate) and oils.");
  b.card("CONCEPT", "Farm practices that raise photosynthesis", "Correct spacing, weeding, irrigation, nitrogen fertiliser, pest control, tunnels or greenhouses.");
});
