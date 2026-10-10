// W3a: limiting factors and photosynthesis investigations.
import { concept, P, t, chk, sfStr, dpStr, table, mean, inverseSquare, capillaryVolume } from "../lib.mjs";

concept("abio.photosynthesis.limiting-factors", { file: "photosynthesis/limiting-factors", keyPrefix: "photosynthesis.limiting-factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which substance is added to the water around *Elodea* to provide a constant supply of carbon dioxide?",
    options: [
      ["Sodium hydrogencarbonate", "Correct: it releases CO₂ in solution."],
      ["Sodium chloride", "Salt provides no CO₂."],
      ["Potassium hydroxide solution", "KOH absorbs CO₂."],
      ["Glucose", "Glucose is not a source of CO₂ for photosynthesis."],
    ],
    answer: "A",
    explanation: "**Sodium hydrogencarbonate** supplies CO₂.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A lamp is moved from 20 cm to 10 cm from a plant. By what factor does the light intensity change?",
    options: [
      ["It increases four times", "Correct: (20/10)² = 4."],
      ["It increases two times", "Intensity varies with 1/d², not 1/d."],
      ["It decreases to a quarter", "Moving closer increases intensity."],
      ["It does not change", "Intensity depends on distance."],
    ],
    answer: "A",
    explanation: "Inverse square law: halving d multiplies intensity by **4**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a bright, warm day, which factor most often limits the rate of photosynthesis of a crop in an open field?",
    options: [
      ["Carbon dioxide concentration", "Correct: about 0.04% in air is often limiting in bright light."],
      ["Light intensity", "In bright light the rate is usually light saturated."],
      ["The amount of chlorophyll in the leaves", "Healthy leaves have plenty of chlorophyll."],
      ["The concentration of oxygen", "Oxygen is not a reactant in photosynthesis."],
    ],
    answer: "A",
    explanation: "In bright light, **CO₂** is usually the limiting factor.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is a beaker of water placed between the lamp and the *Elodea* in a photosynthesis investigation?",
    options: [
      ["To absorb heat from the lamp (a heat filter)", "Correct: it acts as a heat filter."],
      ["To supply extra carbon dioxide to the plant", "Plain water in the beaker does not reach the plant."],
      ["To change the wavelength of light reaching the plant", "Clear water does not change the colour of the light much."],
      ["To increase the light intensity reaching the plant", "It slightly reduces, not increases, light intensity."],
    ],
    answer: "A",
    explanation: "A **heat filter** keeps temperature a controlled variable.",
    hints: ["What else does a lamp give out besides light?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does counting bubbles give a less accurate measure of the rate of photosynthesis than collecting the gas?",
    options: [
      ["Bubbles may differ in size", "Correct: the count ignores volume."],
      ["Bubbles contain only carbon dioxide", "Bubbles are mostly oxygen."],
      ["Bubbles are produced only in the dark", "Bubbling increases in light."],
      ["Counting bubbles needs a colorimeter", "Counting needs only a timer."],
    ],
    answer: "A",
    explanation: "Unequal **bubble sizes** make counts unreliable.",
    hints: ["Two bubbles are not always the same volume."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Leaf discs with the air removed are placed in sodium hydrogencarbonate solution under a lamp. Why do they float after some time?",
    options: [
      ["Oxygen from photosynthesis fills the air spaces", "Correct: the discs become less dense."],
      ["Carbon dioxide from the solution fills the air spaces", "CO₂ is used, not accumulated."],
      ["Water evaporates from the discs in the heat of the lamp", "The discs are submerged."],
      ["Starch made in photosynthesis is less dense than water", "Starch is denser than water."],
    ],
    answer: "A",
    explanation: "**Oxygen** accumulates in the intercellular spaces.",
    hints: ["What gas is produced?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Increasing the temperature from 15 °C to 25 °C has little effect on the rate of photosynthesis in very dim light, but a large effect in bright light. Which is the best explanation?",
    options: [
      ["Light limits in dim light; Calvin cycle enzymes limit in bright light", "Correct: temperature affects enzyme-controlled steps."],
      ["Temperature affects only the light-dependent stage", "The Calvin cycle is more temperature-sensitive."],
      ["Enzymes are denatured at 25 °C in dim light", "Enzymes are not denatured at 25 °C."],
      ["Bright light increases the temperature of the leaf by 10 °C", "The temperature was controlled in this comparison."],
    ],
    answer: "A",
    explanation: "Temperature matters only where it is the **limiting factor**: in bright light, the enzyme-controlled Calvin cycle.",
    hints: ["Which stage is enzyme-controlled and temperature-sensitive?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A grower adds carbon dioxide to a greenhouse of tomatoes on a dull, cloudy day, but the yield does not increase. Which is the most likely reason?",
    options: [
      ["Light intensity was the limiting factor", "Correct: extra CO₂ helps only when CO₂ limits the rate."],
      ["Carbon dioxide inhibits rubisco at high concentrations", "Higher CO₂ increases rubisco carboxylation."],
      ["Tomatoes are C4 plants and do not use extra CO₂", "Tomatoes are C3 plants."],
      ["The extra CO₂ was all absorbed by the soil", "This is not a realistic explanation."],
    ],
    answer: "A",
    explanation: "On a dull day **light** is limiting.",
    hints: ["Only the limiting factor raises the rate."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The volume of gas collected from an aquatic plant underestimates the true rate of photosynthesis.",
    answer: true,
    explanation: "True. Some oxygen is used in respiration or dissolves in the water: it is a **net** rate.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "On the plateau of a graph of rate against light intensity, light is the limiting factor.",
    answer: false,
    explanation: "False. On the plateau, **another factor** (CO₂ or temperature) is limiting.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each greenhouse practice to the limiting factor it removes.",
    pairs: [
      ["Burning paraffin", "Carbon dioxide concentration"],
      ["Artificial lighting", "Light intensity"],
      ["Heaters in winter", "Temperature"],
      ["Shade netting in very hot weather", "Excess temperature and water stress"],
    ],
    explanation: "Each practice targets one factor.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Light intensity is proportional to {{blank:a}}. In a chloroplast suspension, DCPIP turns from blue to {{blank:b}} when it is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["1/d²"], choices: ["1/d²", "1/d", "d²"] },
      { id: "b", accepted: ["colourless"], choices: ["colourless", "red", "green"] },
      { id: "c", accepted: ["reduced"], choices: ["reduced", "oxidised", "hydrolysed"] },
    ],
    explanation: "Inverse square law; DCPIP is decolourised when reduced.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the light intensity above which the rate of photosynthesis no longer increases.",
    accepted: ["light saturation", "light saturation point", "saturation point", "light-saturation point"],
    wrong: ["compensation point"],
    explanation: "**Light saturation** (not the compensation point, where photosynthesis equals respiration).",
  });

  const dist = 25;
  const rel = inverseSquare(dist) * 1e4;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Calculate the relative light intensity, as 10 000/d², when a lamp is 25 cm from a plant.",
    value: rel, wrong: [10000 / dist],
    explanation: t`$10\,000 \div 25^2 = 10\,000 \div 625 = ${rel}$. Dividing by 25 instead of 625 forgets to square the distance.`,
  });
  const r = 0.5, l = 18, m = 5;
  const v = capillaryVolume(r, l);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Gas from *Cabomba* collected in a photosynthometer formed a bubble 18 mm long in a capillary tube of internal radius 0.5 mm, in 5 minutes. Calculate the rate of gas production in mm³/min, to three significant figures.",
    value: v / m, sf: 3, unit: "mm³/min", wrong: [sfStr(capillaryVolume(1, l) / m, 3), sfStr(v, 3)],
    explanation: t`1. Volume $= \pi \times 0.5^2 \times 18 = ${sfStr(v, 4)}$ mm³.
2. Rate $= ${sfStr(v, 4)} \div 5 = ${sfStr(v / m, 3)}$ mm³ min⁻¹.
3. Using the diameter (1 mm) gives four times too much.`,
    hints: ["V = πr²l."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the effect of increasing temperature from 10 °C to 45 °C on the rate of photosynthesis in bright light with plenty of carbon dioxide.",
    points: [
      "Rate increases as temperature rises to an optimum (about 25-35 °C)",
      "Enzymes of the Calvin cycle (e.g. rubisco) and substrates have more kinetic energy, more frequent successful collisions / enzyme-substrate complexes",
      "Above the optimum the rate falls as enzymes denature (active sites change shape)",
      "Also stomata close / photorespiration increases at high temperature, reducing CO₂ fixation",
    ],
    modelAnswer: "The rate increases as the temperature rises to an optimum, often between about 25 and 35 °C, because rubisco and other Calvin cycle enzymes and their substrates have more kinetic energy and form more enzyme-substrate complexes. Above the optimum the rate falls, because the enzymes begin to denature and their active sites change shape. At high temperatures stomata also close and photorespiration increases, which reduces CO₂ fixation.",
    explanation: "Temperature acts mainly on enzyme-controlled reactions.",
    hints: ["Which stage contains temperature-sensitive enzymes?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would use a chloroplast suspension and DCPIP to investigate the effect of light wavelength on the light-dependent stage.",
    points: [
      "Extract chloroplasts by grinding leaves in ice-cold buffer and filtering / centrifuging",
      "Add the same volume of suspension and DCPIP to tubes covered with different coloured filters (e.g. red, blue, green), same lamp distance",
      "Record time for the blue colour to disappear (or absorbance with a colorimeter); rate = 1/time",
      "Controls: tube in the dark and tube with boiled chloroplasts; constant temperature; repeat three times",
    ],
    modelAnswer: "Grind spinach leaves in ice-cold buffer, filter and keep the chloroplast suspension cold. Put the same volume of suspension and of DCPIP into tubes covered with red, blue and green filters, at the same distance from the same lamp. Record the time for the blue colour to disappear, or use a colorimeter, and calculate rate as 1/time. Include a tube in the dark and one with boiled chloroplasts as controls, keep the temperature constant and repeat each colour three times.",
    explanation: "Independent variable: filter colour; dependent: time to decolourise.",
    hints: ["What changes colour, and why?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why a grower might not raise the carbon dioxide concentration in a greenhouse above about 0.1%.",
    points: [
      "Rate levels off; another factor (light / temperature / rubisco amount) becomes limiting",
      "Extra cost of CO₂ / fuel greater than the value of extra yield",
      "Very high CO₂ may cause stomata to close / is a hazard to workers",
    ],
    modelAnswer: "Above about 0.1% CO₂ the rate levels off because light, temperature or the amount of rubisco becomes limiting, so the extra cost of CO₂ or fuel is greater than the value of any extra yield. Very high concentrations can also make stomata close and are a health hazard for workers.",
    explanation: "Economic and biological limits.",
    hints: ["Does the rate keep rising with CO₂?"],
  });

  // Practice structured: inverse square with Cabomba
  const d = [12, 16, 22, 28, 32];
  const bubbles = [[57, 55, 56], [43, 41, 42], [34, 32, 33], [27, 26, 28], [18, 17, 19]];
  const rel20 = inverseSquare(16) * 1e4;
  chk(rel20, 10000 / 256);
  const m15 = mean(bubbles[1]);
  chk(m15, 42);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Rudo counted the bubbles released per minute by a shoot of *Cabomba* in 0.5% sodium hydrogencarbonate solution, with a lamp at different distances. She counted three times at each distance.\n\n${table(["Distance / cm", "Count 1 / bubbles per min", "Count 2 / bubbles per min", "Count 3 / bubbles per min"], d.map((x, i) => [x, ...bubbles[i]]))}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the relative light intensity (10 000/d²) at 16 cm, to three significant figures.", value: rel20, sf: 3, wrong: [625], explanation: t`$10\,000 \div 256 = ${sfStr(rel20, 3)}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean number of bubbles per minute at 16 cm.", value: m15, wrong: [126], explanation: t`$(43 + 41 + 42) \div 3 = ${m15}$.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "When the lamp was moved from 32 cm to 16 cm, the light intensity increased four times but the mean rate only rose about 2.3 times (18 to 42). Explain why.",
        points: ["At higher light intensities light is no longer the only limiting factor / approaching light saturation", "Another factor (CO₂ concentration or temperature) limits the rate"],
        modelAnswer: "At the higher light intensities the rate is approaching light saturation, so light is no longer the only limiting factor; the CO₂ concentration or temperature limits the rate.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two variables Rudo should have controlled, and how.",
        points: ["Temperature: heat filter / water bath / LED lamp, checked with a thermometer", "CO₂: same concentration of hydrogencarbonate (0.5%) / same shoot / same time allowed to equilibrate at each distance"],
        modelAnswer: "Temperature, by placing a beaker of water between lamp and plant and checking with a thermometer; carbon dioxide, by using the same 0.5% hydrogencarbonate solution throughout.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two improvements to make the results more accurate.",
        points: ["Collect gas in a photosynthometer / syringe and measure volume instead of counting bubbles", "Equilibrate for 5 min at each distance / darken the room / use a light meter"],
        modelAnswer: "Collect the gas in a photosynthometer and measure its volume, because bubbles vary in size, and leave the plant for 5 minutes at each new distance in a darkened room before measuring.",
      }),
    ],
    explanation: "Light intensity ∝ 1/d²; diminishing returns show another limiting factor.",
    hints: ["Square the distance.", "If the rate does not keep up with the light, what is limiting?"],
  });

  const li = [0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0];
  const low = [0, 5.2, 8.6, 9.9, 10.3, 10.3, 10.3];
  const high = [0, 5.6, 10.8, 15.4, 18.9, 20.8, 20.8];
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The rate of photosynthesis of a plant was measured at different light intensities at two carbon dioxide concentrations, at 25 °C.\n\n${table(["Light intensity / arbitrary units", ...li.map((x) => x.toFixed(1))], [["Rate at 0.05% CO₂ / arbitrary units", ...low.map((x) => x.toFixed(1))], ["Rate at 0.12% CO₂ / arbitrary units", ...high.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What limits the rate at 0.05% CO₂ and 7.5 units of light?",
        options: [["Carbon dioxide concentration", "Correct: raising CO₂ raises the rate here."], ["Light intensity", "More light does not raise the rate here."], ["Temperature", "Raising CO₂ alone increases the rate, so CO₂ is limiting."], ["Chlorophyll concentration in the leaf", "Not tested; raising CO₂ is enough to raise the rate."]],
        answer: "A", explanation: "Raising CO₂ to 0.12% about doubles the rate (10.3 to 20.8) at this light intensity.",
      }),
      P.mcq({
        label: "(b)", stem: "What limits the rate at both CO₂ concentrations at 1.5 units of light?",
        options: [["Light intensity", "Correct: the two rates are almost equal."], ["Carbon dioxide concentration", "Changing CO₂ makes little difference here."], ["Oxygen concentration", "Not a limiting factor of photosynthesis here."], ["Water supply", "Not tested."]],
        answer: "A", explanation: "Similar rates at both CO₂ levels → light limits.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest what limits the rate at 0.12% CO₂ above 7.5 units of light, and explain your answer.",
        points: ["Temperature (or amount of rubisco / enzymes)", "Rate no longer rises with light, and CO₂ has been increased, so another factor such as temperature must be limiting"],
        modelAnswer: "Temperature, or the amount of rubisco, because the rate has stopped rising with light even at the higher CO₂ concentration, so neither light nor CO₂ is limiting.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the effect of raising CO₂ from 0.05% to 0.12%, using figures.",
        points: ["Little effect at low light (5.2 and 5.6 at 1.5 units)", "Large effect at high light: plateau rises from 10.3 to 20.8 units (about double)"],
        modelAnswer: "At 1.5 units of light the rate is almost the same (5.2 and 5.6), but at high light the maximum rate about doubles, from 10.3 to 20.8 units.",
      }),
    ],
    explanation: "A factor is limiting where changing it changes the rate.",
    hints: ["Compare the two rows column by column."],
  });

  b.card("DEFINITION", "Define **limiting factor**.", "The factor in shortest supply, which alone determines the rate; increasing it increases the rate.");
  b.card("FORMULA", "Inverse square law", "Light intensity ∝ 1/d²: halving the distance gives four times the intensity.");
  b.card("FACT", "Main limiting factors of photosynthesis", "Light intensity, CO₂ concentration, temperature (and wavelength of light).");
  b.card("CONCEPT", "Reading a limiting-factor graph", "Rising part: the x-axis factor is limiting. Plateau: another factor is limiting.");
  b.card("FACT", "Source of CO₂ for aquatic plants", "Sodium hydrogencarbonate solution.");
  b.card("CONCEPT", "Why is gas collected a net rate?", "Some oxygen is used in respiration or dissolves in water.");
  b.card("FACT", "Leaf disc method", "Air removed so discs sink; O₂ from photosynthesis makes them float; rate = 1/time to float.");
  b.card("FACT", "Greenhouse applications", "Lighting, CO₂ enrichment (paraffin, propane) and heating, used only when the factor is limiting and economic.");
});
