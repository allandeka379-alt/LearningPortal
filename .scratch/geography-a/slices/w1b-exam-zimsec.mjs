// W1b exam rows: ZIMSEC Paper 1 (physical component), topic 4 atmospheric processes: ZIM_STRUCT25 x 2.
// (1) Urban heat island and the energy budget (microclimates, energy-budget). (2) Rainfall, ENSO and drought (weather-climatic hazards,
// causes of climate change). All datasets are invented for this exercise and every number is computed in code.
import { concept, P, chk, same, checkExam, EXAM, geographyLevels, ZIM, mean, rnd } from "../lib.mjs";
import { tbl } from "../tables/w1b-_q.mjs";

const BASE = { d: 4, skill: EXAM.ZIM_STRUCT25.skill, secs: EXAM.ZIM_STRUCT25.secs, examStyle: true, paper: "Paper 1", applies: EXAM.ZIM_STRUCT25.applies };

// ---- Item 1 data
const TIMES = ["Midnight", "4 am", "8 am", "Noon", "4 pm", "8 pm"];
const URB = [12.5, 10.5, 13.5, 23.5, 26.5, 15.5];
const RUR = [7.5, 4.5, 10.5, 22.5, 24.5, 10.5];
const DIFF = URB.map((u, i) => u - RUR[i]);
same(DIFF, [5, 6, 3, 1, 2, 5]);
const uhi04 = chk(DIFF[1], 6);
const uhiMean = rnd(mean(DIFF), 1, 3.7, "uhiMean");
const absUrban = chk(700 * (1 - 0.1), 630);
const absRural = chk(700 * (1 - 0.25), 525);
const absDiff = chk(absUrban - absRural, 105);

// ---- Item 2 data
const RAIN = [650, 360, 940, 695, 400, 735, 870, 430];
const PHASE = ["Neutral", "El Niño", "La Niña", "Neutral", "El Niño", "Neutral", "La Niña", "El Niño"];
const mRain = chk(mean(RAIN), 635);
const pctS2 = rnd((360 / mRain) * 100, 1, 56.7, "pctS2");
const below = chk(RAIN.filter((x) => x < 0.75 * mRain).length, 3);
const mEN = rnd(mean([360, 400, 430]), 1, 396.7, "mEN");

concept("ageo.atmos.microclimates", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ============================================================ Item 1: urban heat island
  b.struct({
    ...BASE,
    concepts: ["ageo.atmos.microclimates", "ageo.atmos.energy-budget"],
    hints: ["UHI intensity is urban temperature minus rural temperature.", "In (e) consider cost, speed, scale and who benefits before you judge."],
    stem: "Harare and other cities in Zimbabwe are growing quickly. A student compared air temperatures in the centre of a southern African city with those in a farming area 25 km away on a calm, clear day in the cool season (data invented for this exercise).\n\n" +
      tbl(["Time", ...TIMES], [["City centre (°C)", ...URB], ["Farming area (°C)", ...RUR]]) +
      "\n\nThe urban heat island (UHI) intensity is the temperature of the city centre minus that of the farming area at the same time.",
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Describe the UHI shown by the data.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "State the UHI intensity at 4 am, in °C.", value: uhi04, unit: "°C", wrong: [10.5, 4.5],
            explanation: "10.5 − 4.5 = 6 °C." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the mean UHI intensity for the six times, in °C to 1 decimal place.", value: uhiMean, dp: 1, unit: "°C", wrong: [16, 3],
            explanation: "Differences: 5, 6, 3, 1, 2, 5. Sum = 22. Mean = 22 ÷ 6 = 3.7 °C." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which statement best describes the pattern?", options: [
            ["The intensity is greatest at night and least at midday", "Correct: 6 °C at 4 am and 1 °C at noon."],
            ["The intensity is greatest at midday and least at night", "The reverse is true."],
            ["The intensity is the same at all times", "The values range from 1 °C to 6 °C."],
            ["The farming area is warmer than the city at every time", "The city is warmer at every time."],
          ], answer: "A", explanation: "The UHI is strongest at night and weakest around midday." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the UHI.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "At noon the insolation is 700 W/m². Dark urban surfaces have an albedo of 0.10 and the farming area has an albedo of 0.25. Calculate how much more radiation the urban surfaces absorb, in W/m².", value: absDiff, wrong: [175, 525],
            explanation: "Urban absorb 700 × 0.90 = 630 W/m²; rural absorb 700 × 0.75 = 525 W/m². Difference = 105 W/m²." }),
          P.manual({ label: "(ii)", marks: 3, stem: "Explain why the UHI is greatest at night.",
            points: [
              "Concrete, tar and brick store heat by day and release it slowly by conduction and longwave radiation at night.",
              "Tall buildings and narrow streets trap longwave radiation (and reduce loss to the sky), so cooling is slower than in the open farm area.",
              "The farming area cools rapidly on a clear, calm night, while waste heat from vehicles and air conditioners keeps the city warm.",
            ],
            modelAnswer: "In the city, tar and concrete store heat by day and release it slowly at night. Buildings trap longwave radiation so heat is lost more slowly, and traffic and air-conditioners add waste heat. The farming area loses heat quickly by radiation on a clear calm night, so the difference is greatest then.",
            explanation: "Heat storage, trapping and waste heat explain night-time differences." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain two effects of an urban heat island on people living in the city.",
        points: [
          "Heat stress and illness: higher night temperatures prevent the body from recovering, especially for the elderly, children and outdoor workers.",
          "Explains why (higher night temperatures, poor ventilation in crowded housing) increases risk during heatwaves.",
          "Higher demand for electricity and water (for fans and air-conditioning, drinking and cooling), which raises costs and puts a strain on supply.",
          "Explains why (supply is often unreliable, and low-income households have less capacity to pay or to adapt).",
        ],
        modelAnswer: "Higher night temperatures can cause heat stress, especially for older people, children and outdoor workers, because the body cannot cool down; crowded housing makes this worse. Cooling needs also raise demand for electricity and water, which increases costs and strains supplies that are already unreliable, and poorer households find it hard to pay.",
        explanation: "Two effects, each with a reason." }),
      P.group({
        label: "(d)", stem: "The UHI and the energy budget.",
        parts: [
          P.tf({ label: "(i)", marks: 1, stem: "The data show that the UHI intensity is greatest at midday.", answer: false,
            explanation: "False. It is greatest at 4 am (6 °C) and least at noon (1 °C)." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which change would increase the albedo of the city centre?", options: [
            ["Painting roofs white or light grey", "Correct: light surfaces reflect more shortwave radiation."],
            ["Replacing trees with tarmac", "Tarmac has a low albedo and reduces evapotranspiration."],
            ["Adding more dark glass buildings", "Dark glass absorbs radiation and traps heat."],
            ["Increasing traffic in the centre", "Traffic adds waste heat; it does not change albedo."],
          ], answer: "A", explanation: "Raising the albedo reduces the amount of radiation absorbed." }),
          P.manual({ label: "(iii)", marks: 2, stem: "Explain why the UHI intensity is smallest at noon.",
            points: [
              "At midday the farming area also receives strong insolation and is heated by the Sun, so its temperature rises towards the city's.",
              "Evapotranspiration and mixing of air by convection cool both places, so the extra stored heat in the city has less effect.",
            ],
            modelAnswer: "At midday both places are strongly heated by the Sun, so the farming area warms close to the city's temperature. Convection mixes the air and plants in the farming area use energy to evaporate water, which reduces the difference.",
            explanation: "Both areas are heated strongly by day, so the contrast is small." }),
        ],
      }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effectiveness of measures that could reduce the urban heat island effect in a southern African city.",
        points: [
          "Planting trees and creating parks provide shade and cooling by transpiration, with benefits for health and biodiversity.",
          "Trees take years to grow and need water in dry climates, so effects are slow.",
          "Light-coloured (cool) roofs and paving raise albedo, are cheap on new buildings and act at once.",
          "Retrofitting existing roofs is costly and glare may be a problem.",
          "Green roofs and walls cool buildings but are expensive and need water and maintenance.",
          "Reducing waste heat (efficient transport, solar power, better building design) helps over the long term but needs investment.",
          "Planning controls for open space, building height and ventilation corridors work best for new development.",
          "Judgement: a combination led by trees and cool roofs is likely to be most effective for the cost; no single measure removes the effect.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Tree planting and parks cool cities by shade and transpiration and also improve health and biodiversity, but trees take years to grow and need water in dry cities. Light-coloured roofs and paving raise the albedo, cost little on new buildings and work at once, although retrofitting old roofs is expensive. Green roofs cool buildings but are costly and need water and upkeep. Reducing waste heat through efficient transport and building design helps in the long term but needs investment, and planning controls that keep open space and allow air to move work best on new development. I conclude that a combination, led by trees and cool roofs, gives the best effect for the cost, but no single measure removes the heat island.",
        explanation: "Evaluate each measure by effect, cost and practicality, then judge." }),
    ]),
    explanation: "Describe, explain and assess the urban heat island using the data.",
  });

  // ============================================================ Item 2: ENSO and drought
  b.struct({
    ...BASE,
    concepts: ["ageo.hazard.weather-climatic", "ageo.atmos.climate-evidence-causes"],
    hints: ["For (a)(iii) work out 75% of the mean first.", "In (e) compare forecasts with other measures before you judge."],
    stem: "Rain-fed farming supports many households in a communal area of Zimbabwe. The table shows seasonal rainfall at a station in the area and the El Niño–Southern Oscillation (ENSO) phase in each season (data invented for this exercise).\n\n" +
      tbl(["Season", "1", "2", "3", "4", "5", "6", "7", "8"], [["ENSO phase", ...PHASE], ["Rainfall (mm)", ...RAIN]]),
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Analyse the rainfall data.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean seasonal rainfall, in mm.", value: mRain, unit: "mm", wrong: [5080, 695],
            explanation: "5 080 ÷ 8 = 635 mm." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the rainfall of Season 2 as a percentage of the mean, to 1 decimal place.", value: pctS2, dp: 1, unit: "%", wrong: [43.3, 360],
            explanation: "360 ÷ 635 × 100 = 56.7%." }),
          P.num({ label: "(iii)", marks: 1, stem: "A season is called a drought season if its rainfall is below 75% of the mean. How many of the eight seasons are drought seasons?", value: below, wrong: [2, 5],
            explanation: "75% of 635 = 476.25 mm. Seasons 2 (360), 5 (400) and 8 (430) are below this: 3 seasons." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "ENSO and rainfall.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean rainfall of the El Niño seasons, in mm to 1 decimal place.", value: mEN, dp: 1, unit: "mm", wrong: [1190, 635],
            explanation: "(360 + 400 + 430) ÷ 3 = 1 190 ÷ 3 = 396.7 mm." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which ENSO phase had the highest mean rainfall in the data?", options: [
            ["La Niña", "Correct: seasons 3 and 7 had 940 and 870 mm (mean 905 mm)."],
            ["El Niño", "El Niño seasons had the lowest rainfall."],
            ["Neutral", "Neutral seasons had a mean of about 693 mm, lower than La Niña."],
            ["All phases had the same mean", "The means differ greatly."],
          ], answer: "A", explanation: "La Niña mean = (940 + 870) ÷ 2 = 905 mm." }),
          P.manual({ label: "(iii)", marks: 1, stem: "Describe the relationship between ENSO phase and rainfall shown by the data.",
            points: ["El Niño seasons have the lowest rainfall (all below 450 mm) and La Niña seasons the highest (above 850 mm), with neutral seasons in between."],
            modelAnswer: "El Niño seasons had the lowest rainfall (360–430 mm), La Niña the highest (870–940 mm) and neutral seasons were in between (650–735 mm).",
            explanation: "A one-mark description with figures." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain how an El Niño event can lead to drought in southern Africa.",
        points: [
          "In an El Niño the trade winds weaken and warm surface water spreads eastwards across the Pacific.",
          "This shifts the main area of rising air and heavy rain eastwards, which alters the atmospheric circulation across the tropics.",
          "Over southern Africa there is more sinking air, so cloud and rain are suppressed and the rains are weaker or late.",
          "Higher temperatures increase evaporation and soil moisture loss, making the drought worse.",
        ],
        modelAnswer: "In an El Niño the trade winds weaken and warm water spreads east in the Pacific. The areas of rising air and heavy rain shift, and over southern Africa there is more sinking air, which prevents cloud formation, so the rains are weaker or late. The higher temperatures also raise evaporation and dry the soil faster.",
        explanation: "Pacific change, shifted circulation, subsidence over the region, and heat." }),
      P.manual({ label: "(d)", marks: 4, stem: "Describe the effects of a drought season on rural households and on the national economy.",
        points: [
          "Crop failure and loss of livestock reduce household food and income, causing hunger and malnutrition.",
          "Households sell assets, take children out of school or migrate to find work.",
          "Low harvests reduce national maize production, so the country has to import grain and spend foreign currency or depend on food aid.",
          "Low river and dam levels reduce hydropower (Kariba) and water supplies, with power cuts that affect industry and services.",
        ],
        modelAnswer: "Crops fail and cattle die, so households have little food or income and may suffer hunger. Families sell assets, take children from school or migrate for work. Nationally, a poor maize harvest means grain imports and aid, and low dam levels, for example at Kariba, reduce hydropower and cause power cuts that harm industry.",
        explanation: "Describe household, national and environmental effects." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the view that seasonal forecasts are the most effective way of reducing the impact of drought on farmers in Zimbabwe.",
        points: [
          "Forecasts from the Meteorological Services Department and regional outlook forums allow farmers to choose crops, planting dates and inputs in advance.",
          "Forecasts are low cost for farmers once produced and can be shared by radio and mobile phone.",
          "Limits: forecasts are probabilistic and give seasonal totals, not dry spells within the season, which are what damage crops.",
          "Limits: warnings may not reach remote farmers or be understood, and poor farmers may not be able to act on them (no seed, money or water).",
          "Drought-tolerant crops and conservation farming reduce the damage whatever the weather and complement forecasts.",
          "Water harvesting, irrigation and storage give direct protection, but need investment and maintenance.",
          "Safety nets such as grain reserves, insurance and food aid help after the event, when forecasting has not prevented the loss.",
          "Judgement: forecasts are an effective and inexpensive first step but need to be combined with adaptation measures and support; they are not the most effective on their own.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Seasonal forecasts allow farmers to plan the choice of crop, planting dates and inputs, and they cost little to share by radio and mobile phone, so they can be effective. However, they give a probability for the season and cannot show dry spells within it, which are often what destroy a crop, and they may not reach remote farmers or be understood. Poor farmers may also be unable to act, for lack of seed, money or water. Drought-tolerant crops and conservation farming reduce losses whatever the weather, water harvesting and irrigation protect crops directly but need investment, and grain reserves and insurance help after the event. I conclude that forecasts are a valuable and cheap first step, but they are most effective when combined with adaptation measures and support, so they are not the most effective measure by themselves.",
        explanation: "Weigh forecasts against adaptation, storage and safety-net measures, then judge." }),
    ]),
    explanation: "Analyse rainfall and ENSO, explain El Niño drought and evaluate responses.",
  });

});
