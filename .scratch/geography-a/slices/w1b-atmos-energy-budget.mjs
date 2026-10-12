// W1b: atmos.energy-budget (both boards). Numbers computed: 900 x (1 - 0.25) = 675; albedo 240/800 = 0.3; snow-covered
// grass absorbs 800 x 0.2 = 160 against 640 (75% less); diurnal ranges 20 and 8 (see tables/w1b-atmos-energy-budget.mjs).
import { concept, P, geographyLevels, chk, mean, range, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const CLEAR = [11, 9, 8, 16, 25, 28, 22, 14];
const CLOUD = [15, 14, 14, 17, 21, 22, 20, 17];
const TIMES = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
const DAYTAB = tbl(["Time", "Clear sky (°C)", "Cloudy (°C)"], TIMES.map((tm, i) => [tm, CLEAR[i], CLOUD[i]]));
const rClear = chk(range(CLEAR), 20);
const rCloud = chk(range(CLOUD), 8);
// Dataset B (comparison item) and dataset C (structured item): different from the lesson's example.
const TIMES2 = ["Midnight", "3 am", "6 am", "9 am", "Noon", "3 pm", "6 pm", "9 pm"];
const CLEAR_B = [26, 24, 23, 29, 35, 38, 34, 27];
const CLOUD_B = [27, 26, 26, 29, 32, 35, 31, 30];
const TAB_B = tbl(["Time", "Clear sky (°C)", "Cloudy (°C)"], TIMES2.map((tm, i) => [tm, CLEAR_B[i], CLOUD_B[i]]));
const rB1 = chk(range(CLEAR_B), 15);
const rB2 = chk(range(CLOUD_B), 9);
const CLEAR_C = [4, 2, 1, 10, 19, 23, 13, 7];
const CLOUD_C = [7, 6, 6, 10, 12, 13, 12, 10];
const TAB_C = tbl(["Time", "Clear sky (°C)", "Cloudy (°C)"], TIMES2.map((tm, i) => [tm, CLEAR_C[i], CLOUD_C[i]]));
const rC1 = chk(range(CLEAR_C), 22);

concept("ageo.atmos.energy-budget", { file: "atmos/energy-budget", keyPrefix: "atmos.energy-budget" }, (b) => {
  mc(b, 1, "RECALL", "Which type of radiation does the Sun mainly emit?", [
    ["Shortwave radiation", "Correct: the Sun is very hot, so it emits mainly ultraviolet, visible and near-infrared light."],
    ["Longwave radiation", "Longwave (infrared) radiation is what the cooler Earth emits."],
    ["Conducted radiation", "Conduction is heat transfer by contact, not a kind of radiation."],
    ["Sensible radiation", "Sensible heat is heat carried by air; it is not a type of radiation."],
  ], "The Sun emits mainly **shortwave** radiation; the Earth re-emits energy as **longwave** radiation.");
  mc(b, 1, "RECALL", "What does the term **albedo** measure?", [
    ["The fraction of incoming radiation that a surface reflects", "Correct: reflected radiation divided by incoming radiation."],
    ["The fraction of radiation that a surface absorbs", "This is 1 minus the albedo, not the albedo."],
    ["The total solar energy reaching the top of the atmosphere", "That is the solar constant."],
    ["The temperature of a surface at noon", "Albedo is a ratio of radiation, not a temperature."],
  ], "**Albedo** = reflected radiation ÷ incoming radiation (0 to 1).");
  mc(b, 2, "UNDERSTANDING", "Which surface has the **highest** albedo?", [
    ["Fresh snow", "Correct: about 0.8 to 0.9 of the radiation is reflected."],
    ["Dense forest", "Forest is dark and rough and absorbs most radiation (albedo about 0.1)."],
    ["Calm open water", "Water absorbs most radiation at a high sun angle (albedo about 0.06)."],
    ["Dry savanna grass", "Grass reflects only about a fifth of the radiation."],
  ], "Fresh snow reflects most of the incoming shortwave radiation.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is **back radiation**?", [
    ["Longwave radiation returned to the ground by the air", "Correct: greenhouse gases and clouds re-emit part of the energy they absorb, and some goes back down."],
    ["Sunlight reflected back to space by the tops of clouds", "That is reflection of shortwave radiation, not back radiation."],
    ["Heat carried upwards from the ground by rising warm air", "That is sensible heat transfer."],
    ["Energy released when water vapour condenses into cloud", "That is latent heat."],
  ], "Back radiation is **longwave** radiation emitted downwards by the atmosphere. It warms the surface.");
  mc(b, 2, "UNDERSTANDING", "Why is a cloudy night usually warmer than a clear night?", [
    ["Cloud returns longwave radiation to the ground", "Correct: cloud absorbs outgoing longwave radiation and radiates much of it back down."],
    ["Cloud lets more longwave radiation escape", "The opposite: cloud traps longwave radiation, clear skies let it escape."],
    ["Cloud brings in more insolation after dark", "There is no insolation at night."],
    ["Cloud stops the ground from emitting radiation", "The ground still emits; the cloud absorbs and returns part of it."],
  ], "Cloud increases **back radiation**, so the surface loses heat more slowly at night.");
  mc(b, 3, "APPLICATION", "Water evaporates from a dam on a hot day and the vapour condenses into cloud 3 km above the ground. What energy transfer has taken place?", [
    ["Latent heat is absorbed, then released on condensation", "Correct: energy is stored in the vapour and released as heat when it condenses."],
    ["Sensible heat is carried up by conduction through the air", "Conduction is transfer by contact; the key point here is the change of state."],
    ["Back radiation is emitted downwards from the dam surface", "Back radiation is downward longwave radiation from the atmosphere."],
    ["Shortwave radiation is reflected by the water to space", "Reflection does not involve a change of state or the upward transport of energy."],
  ], "Evaporation absorbs **latent heat**, which is released when the vapour condenses. It is a major way of moving energy upwards.", { hints: ["Think about what happens to energy when water changes state."] });
  mc(b, 2, "RECALL", "Roughly how warm would the Earth's average surface temperature be without the natural greenhouse effect?", [
    ["About −18 °C", "Correct: this is the commonly quoted value, about 33 °C below the present +15 °C."],
    ["About +15 °C", "That is the present average, with the natural greenhouse effect."],
    ["About +33 °C", "That is the size of the warming, not the temperature."],
    ["About +50 °C", "Without the greenhouse effect the planet would be colder, not hotter."],
  ], "Without greenhouse gases the average would be about **−18 °C**, instead of about +15 °C.");
  b.tf({ d: 1, skill: "UNDERSTANDING", stem: "Most of the atmosphere is heated directly by shortwave radiation from the Sun as it passes through.", answer: false,
    feedbackFalse: "Correct: most shortwave radiation passes through the air and warms the surface, which then heats the air from below.",
    feedbackTrue: "Not so: air absorbs only a small share of the shortwave radiation passing through it.",
    explanation: "The lower atmosphere is heated mainly **from below** by longwave radiation, conduction, convection and latent heat." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Clear skies give a larger diurnal temperature range than cloudy skies.", answer: true, daily: true,
    feedbackTrue: "Correct: clear skies allow high daytime heating and fast night-time cooling.",
    feedbackFalse: "Not so: clear skies give hotter days and colder nights, so the range is larger.",
    explanation: "Under clear skies more insolation arrives by day and more longwave radiation escapes at night." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The planet reflects about {{blank:a}} of incoming radiation, so its albedo is about 0.3. The warming that natural gases such as water vapour and carbon dioxide cause is the {{blank:b}} effect. Radiation from the cool Earth is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["30%"], choices: ["30%", "3%", "70%"] },
      { id: "b", accepted: ["greenhouse"], choices: ["greenhouse", "albedo", "scattering"] },
      { id: "c", accepted: ["longwave"], choices: ["longwave", "shortwave", "ultraviolet"] },
    ], explanation: "About 30% is reflected or scattered (albedo 0.3); greenhouse gases cause the greenhouse effect; the Earth emits longwave radiation." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each energy-budget process to its meaning.",
    pairs: [
      ["Scattering", "Gas molecules and dust change the direction of radiation"],
      ["Conduction", "Heat passing from the ground to the air touching it"],
      ["Sensible heat", "Heat carried upwards by rising, warm air"],
      ["Latent heat", "Energy taken up or released when water changes state"],
      ["Back radiation", "Longwave radiation returned downwards by the atmosphere"],
    ], explanation: "These are the processes by which energy is moved or redirected in the budget." });
  const abs1 = chk(900 * (1 - 0.25), 675);
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A surface with an albedo of 0.25 receives 900 W/m² of shortwave radiation at noon. Calculate the radiation it absorbs, in W/m².",
    value: abs1, wrong: [225, 1125],
    explanation: "Absorbed = insolation × (1 − albedo) = 900 × 0.75 = **675 W/m²**. The value 225 W/m² is the radiation reflected, not absorbed." });
  const albedo = chk(240 / 800, 0.3);
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A sensor over a field receives 800 W/m² of shortwave radiation and measures 240 W/m² reflected. Calculate the albedo, as a decimal to 2 decimal places.",
    hints: ["Albedo = reflected ÷ incoming.", "Do not subtract; divide."],
    value: albedo, dp: 2, wrong: [0.7, 560],
    explanation: "Albedo = 240 ÷ 800 = **0.30**. The value 0.7 is the fraction absorbed." });
  const grassAbs = 600 * (1 - 0.25);
  const snowAbs = 600 * (1 - 0.75);
  const cut = rnd(((grassAbs - snowAbs) / grassAbs) * 100, 1, 66.7, "cut");
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%",
    stem: "Winter noon insolation at a high-altitude site is 600 W/m². Bare grassland has an albedo of 0.25. After a fall of fresh snow the surface has an albedo of 0.75. Calculate the percentage decrease in the radiation absorbed by the surface, to 1 decimal place.",
    hints: ["Find the absorbed radiation for each surface.", "Percentage decrease = (old − new) ÷ old × 100."],
    value: cut, wrong: [25, 480],
    explanation: "1. Grass absorbs 800 × (1 − 0.20) = 640 W/m².\n2. Snow absorbs 800 × (1 − 0.80) = 160 W/m².\n3. Decrease = 640 − 160 = 480 W/m².\n4. As a percentage of the original: 480 ÷ 640 × 100 = **75%**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the term for the transfer of heat by rising, warmed air that can be felt and measured with a thermometer.",
    accepted: ["sensible heat", "sensible heat transfer", "convection"], wrong: ["latent heat"],
    explanation: "**Sensible heat** is carried upwards by convection. Latent heat is hidden in water vapour." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why cloudy nights are usually warmer than clear nights.",
    hints: ["Think about what the ground emits at night and what cloud does with it."],
    points: [
      "At night the ground cools by emitting longwave (infrared) radiation.",
      "Cloud (and water vapour) absorbs much of this outgoing longwave radiation.",
      "The cloud re-emits part of it downwards as back radiation, so the surface loses heat more slowly (and the minimum temperature is higher).",
    ],
    modelAnswer: "The ground loses heat at night by emitting longwave radiation. Cloud absorbs much of it and sends part back to the surface as back radiation, so the ground cools more slowly and the night is warmer. Under a clear sky the radiation escapes to space.",
    explanation: "Cloud increases back radiation and slows night-time cooling." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the natural greenhouse effect keeps the Earth's surface warmer than it would otherwise be.",
    hints: ["Start with the radiation that passes through the atmosphere.", "Then follow the longwave radiation back out."],
    points: [
      "Shortwave radiation from the Sun passes through the atmosphere and warms the surface.",
      "The surface emits longwave (infrared) radiation.",
      "Greenhouse gases (water vapour, carbon dioxide, methane, ozone) absorb part of this longwave radiation.",
      "They re-emit it in all directions, including downwards as back radiation, which warms the surface and lower atmosphere (to about +15 °C instead of about −18 °C).",
    ],
    modelAnswer: "Shortwave radiation passes through the atmosphere and warms the ground. The ground gives out longwave radiation, which greenhouse gases such as water vapour and carbon dioxide absorb. They re-emit it in all directions, and the part sent down is back radiation that warms the surface. As a result the average temperature is about +15 °C rather than about −18 °C.",
    explanation: "The effect depends on the atmosphere being transparent to shortwave and absorbing longwave radiation." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative temperatures at a lowveld station on two days in the hot season:\n\n${TAB_B}\n\nCompare the temperatures on the clear day and the cloudy day, using figures from the table.`,
    hints: ["Find the highest and lowest value for each day and the range.", "Say which day is warmer by day and which is warmer at night."],
    points: [
      `Diurnal range is much greater on the clear day (${rB1} °C) than on the cloudy day (${rB2} °C).`,
      "The clear day is hotter in the afternoon: 38 °C at 3 pm compared with 35 °C.",
      "The clear night is colder: minimum 23 °C (6 am) compared with 26 °C.",
      "On both days the lowest temperature is at 6 am (around dawn) and the highest at 3 pm (a lag after the noon peak of insolation).",
    ],
    modelAnswer: "The clear day has a diurnal range of 15 °C (23 °C to 38 °C) while the cloudy day has only 9 °C (26 °C to 35 °C). The clear day is hotter at 3 pm (38 °C against 35 °C) but colder at 6 am (23 °C against 26 °C). On both days the lowest temperature is at 6 am and the highest is at 3 pm.",
    explanation: "Quote highest, lowest and range for both columns, then compare." });

  b.struct({ d: 4, skill: "APPLICATION",
    stem: "A city planner compares two roof surfaces (illustrative values). At noon the insolation is 850 W/m².\n\n| Surface | Albedo |\n|---|---|\n| New light-coloured concrete roof | 0.60 |\n| Old dark tar roof | 0.10 |",
    hints: ["Absorbed = insolation × (1 − albedo).", "A lower albedo means more energy is absorbed."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the radiation absorbed by the dark tar roof, in W/m².", value: chk(850 * 0.9, 765), wrong: [85, 510],
        explanation: "850 × (1 − 0.10) = 850 × 0.90 = 765 W/m²." }),
      P.num({ label: "(b)", stem: "Calculate the radiation absorbed by the light-coloured roof, in W/m².", value: chk(850 * 0.4, 340), wrong: [510, 765],
        explanation: "850 × (1 − 0.60) = 850 × 0.40 = 340 W/m²." }),
      P.mcq({ label: "(c)", stem: "Which statement best describes the effect of the light-coloured roof compared with the dark roof?", options: [
        ["It absorbs less radiation, so the building stays cooler", "Correct: higher albedo reduces absorbed energy, so less heat is stored and re-emitted."],
        ["It absorbs more radiation, so the building warms faster", "A higher albedo means less absorption."],
        ["It has the same effect because both roofs receive equal insolation", "They receive the same insolation but absorb different amounts."],
        ["It increases back radiation coming down from the atmosphere", "Roof colour does not change back radiation directly."],
      ], answer: "A", explanation: "Higher albedo means less absorbed shortwave radiation." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why changing roof colour could reduce temperatures in a city.",
        points: [
          "Light roofs have a higher albedo, so they reflect more insolation back to space.",
          "Less energy is absorbed by the roofs and building materials.",
          "Less heat is conducted into the air and the building (less sensible heat), which reduces air temperature near the surface.",
          "Less energy is stored in the city by day and re-radiated as longwave radiation at night, reducing the urban heat island and cooling demand.",
        ],
        modelAnswer: "Light roofs have a high albedo so they reflect more insolation. Less energy is absorbed, so less heat is conducted to the air and less is stored in the building and released at night. The city stays cooler, and less electricity is needed for cooling.",
        explanation: "Link albedo to absorption, to heat transfer and to temperature." }),
    ], explanation: "Calculate absorption for each surface, then link albedo to temperature." });

  const dayAvgClear = rnd(mean(CLEAR_C), 1, 9.9, "avg");
  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative air temperatures at a highveld station on two days in the cool season:\n\n${TAB_C}`,
    hints: ["Range = highest − lowest.", "For the mean, add the eight values and divide by 8."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the diurnal range on the clear day, in °C.", value: rC1, unit: "°C", wrong: [23, 21],
        explanation: "23 − 1 = 22 °C." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean temperature on the clear day from the eight readings, in °C to 1 decimal place.", value: dayAvgClear, dp: 1, unit: "°C", wrong: [22, 11.5],
        explanation: "Sum = 4 + 2 + 1 + 10 + 19 + 23 + 13 + 7 = 79; 79 ÷ 8 = 9.9 °C." }),
      P.short({ label: "(c)", stem: "Name the type of radiation that cloud sends back to the ground at night.", accepted: ["back radiation", "longwave radiation", "longwave", "infrared"],
        explanation: "Cloud emits longwave (infrared) radiation downward, called back radiation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the afternoon temperature on the cloudy day is lower than on the clear day.",
        points: [
          "Cloud reflects a large part of the incoming shortwave radiation (high albedo cloud tops).",
          "Cloud also absorbs some insolation, so less reaches the ground.",
          "The surface absorbs less energy, so less sensible heat is passed to the air, giving a lower maximum (13 °C against 23 °C).",
        ], modelAnswer: "Cloud tops reflect and cloud absorbs part of the insolation, so less shortwave radiation reaches the ground. The surface absorbs less and heats the air less, so the afternoon maximum is only 13 °C compared with 23 °C.",
        explanation: "Cloud lowers the daytime maximum by reflecting and absorbing insolation." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest why frost is more likely on the clear night than on the cloudy night in the cool season.",
        points: [
          "Clear sky lets longwave radiation escape to space, so the ground cools faster and further.",
          "Calm, dry air cools more (little back radiation, little water vapour).",
          "The clear-night minimum (1 °C here at screen height) is low enough for ground frost, because the ground is colder than the air above it.",
          "Cold dense air drains into hollows and valley bottoms, where frost is most likely.",
        ], modelAnswer: "On a clear night the ground radiates heat to space with little back radiation, so it cools quickly. In the cool season the minimum can fall to freezing, especially in dry, calm air.",
        explanation: "Frost needs strong radiation cooling, which clear skies allow." }),
    ], explanation: "Analyse range, mean and explain the effect of cloud." });
  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how far albedo is the most important factor controlling the temperature of the Earth's surface.",
    hints: ["Consider albedo, then the other factors in the budget (cloud, greenhouse gases, latitude).", "Reach a judgement."],
    points: [
      "Albedo controls how much insolation is absorbed: dark surfaces (forest, tar) absorb more, snow absorbs little.",
      "Example: fresh snow can cut the radiation a surface absorbs by well over half, keeping places cold.",
      "Cloud affects both albedo (reflection by day) and back radiation (warming at night).",
      "Greenhouse gases control the longwave loss, giving the natural 33 °C warming.",
      "Latitude and season set the amount of insolation, so they can matter more than albedo.",
      "Surface type also affects latent heat (evaporation) and heat capacity, so wet surfaces warm less.",
      "Albedo changes feed back (snow loss reduces albedo and warms further).",
      "Judgement: albedo is a major control locally, but the greenhouse effect and latitude set the global pattern, so it is one of several important factors.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Albedo decides how much insolation a surface absorbs: fresh snow absorbs about a fifth of the radiation that dark forest absorbs, so snow-covered areas stay cold even in strong sun. It is therefore a major local control, and changes in albedo can amplify warming when ice melts. However, albedo is not the only control. Latitude and season determine how much insolation arrives; cloud reflects sunlight by day and returns longwave radiation at night; and greenhouse gases are responsible for the 33 °C of natural warming. Surfaces also differ in how much energy is used in evaporation or stored in water. I conclude that albedo is very important for local temperature differences, but the global pattern depends equally on latitude, cloud and the greenhouse effect.",
    wordLimit: { max: 300 }, explanation: "Judge albedo against latitude, cloud, greenhouse gases and surface properties." });

  b.card("DEFINITION", "Albedo", "The fraction of incoming shortwave radiation a surface reflects (reflected ÷ incoming). Earth's average is about 0.3; fresh snow about 0.8-0.9; forest about 0.1.");
  b.card("FORMULA", "Absorbed radiation", "Absorbed = insolation × (1 − albedo), in W/m².");
  b.card("CONCEPT", "Shortwave and longwave radiation", "The Sun emits shortwave radiation; the cooler Earth emits longwave (infrared) radiation, which greenhouse gases absorb.");
  b.card("DEFINITION", "Back radiation", "Longwave radiation emitted downwards by the atmosphere (greenhouse gases and cloud), warming the surface.");
  b.card("DEFINITION", "Latent heat", "Energy taken up when water evaporates and released when the vapour condenses; moves energy upwards in the atmosphere.");
  b.card("FACT", "Natural greenhouse effect: how much warming?", "About 33 °C: average surface temperature about +15 °C instead of about −18 °C without greenhouse gases.");
  b.card("CONCEPT", "Why clear nights are colder", "Clear skies let longwave radiation escape to space, with little back radiation, so the ground cools quickly; cloud slows cooling.");
  b.card("FACT", "Simplified global budget (100 units)", "About 30 reflected or scattered (26 by cloud and atmosphere, 4 by the surface), about 20 absorbed by the atmosphere, about 50 absorbed by the surface.");
  b.card("DEFINITION", "Diurnal range", "The difference between the highest and lowest temperatures in a 24-hour period; larger under clear, dry skies.");
});
