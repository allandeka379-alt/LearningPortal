// W1b: atmos.microclimates (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: UHI intensity 27 - 21 = 6; mean of paired differences 24/6 = 4; rainfall (912 - 830)/830 x 100 = 9.9%;
// transect 25.0 - 19.0 = 6.0 and (23.5 - 22.0)/3 = 0.5 per km; valley minus ridge 4.5 - (-2.0) = 6.5; 18/30 = 60%.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const TIMES = ["Midnight", "6 am", "Noon", "3 pm"];
const URB = [13, 12, 26, 33];
const RUR = [8, 6, 23, 31];
const TAB13 = tbl(["Time", "Urban (°C)", "Rural (°C)"], TIMES.map((tm, i) => [tm, URB[i], RUR[i]]));
const uhi12 = chk(34 - 26, 8);
const mean13 = chk(mean(URB.map((u, i) => u - RUR[i])), 4);
const pct14 = rnd(((912 - 830) / 830) * 100, 1, 9.9, "pct");
const tr = chk(25.0 - 19.0, 6);
const rate = chk((23.5 - 22.0) / 3, 0.5);
const diffV = chk(4.5 - -2.0, 6.5);
const frostPct = chk((18 / 30) * 100, 60);

concept("ageo.atmos.microclimates", { file: "atmos/microclimates", keyPrefix: "atmos.microclimates" }, (b) => {
  mc(b, 1, "RECALL", "What is an **urban heat island**?", [
    ["A built-up area that is warmer than its rural surroundings", "Correct: the difference is usually greatest at night."],
    ["A small island inside a city lake that is cooler than the shore", "The term refers to a city's temperature relative to its surroundings."],
    ["A rural area that is warmer than the nearest large city", "The reverse of the usual pattern."],
    ["A region where cold air collects in the valleys on clear nights", "That describes a frost hollow."],
  ], "An **urban heat island** is a city that is warmer than the surrounding rural area.");
  mc(b, 1, "RECALL", "Which feature helps to cause an urban heat island?", [
    ["Dark roads and roofs that store heat", "Correct: low albedo surfaces absorb more radiation and release it slowly at night."],
    ["A large area of trees that shade and cool the air", "Trees cool the air by shade and transpiration."],
    ["High-albedo snow cover that reflects most sunlight", "Snow reflects radiation and is not a feature of tropical cities."],
    ["A wide open grassland that surrounds the city edge", "Open grassland is a rural feature, not an urban one."],
  ], "Dark surfaces, heat storage, waste heat and little evapotranspiration raise urban temperatures.");
  mc(b, 2, "UNDERSTANDING", "When is the urban heat island usually strongest?", [
    ["At night in clear, calm weather", "Correct: the countryside cools quickly while the city releases stored heat."],
    ["At midday in cloudy, windy weather", "Wind and cloud reduce temperature differences."],
    ["At midday in clear weather", "By day the rural surface also heats up, so the difference is small."],
    ["Whenever it is raining heavily", "Rain and cloud reduce the contrast."],
  ], "UHI intensity peaks on **clear, calm nights**.");
  mc(b, 2, "UNDERSTANDING", "What is a sea breeze?", [
    ["A wind blowing from the sea to the land by day", "Correct: land heats faster, pressure falls over it and cooler sea air moves in."],
    ["A wind blowing from the land to the sea during the night", "That is a land breeze."],
    ["A wind blowing down a valley slope at night", "That is a katabatic wind."],
    ["A wind blowing up a warm slope in the morning", "That is an anabatic wind."],
  ], "A **sea breeze** blows onshore by day because the land is warmer than the sea.");
  mc(b, 2, "UNDERSTANDING", "Why does a land breeze blow at night?", [
    ["Land cools faster, so pressure is higher over it", "Correct: air flows from the high-pressure land to the lower-pressure sea."],
    ["The land stays warmer than the sea during the night", "Land cools faster, so it is cooler."],
    ["The sea evaporates faster at night so the air sinks", "Evaporation does not reverse the breeze."],
    ["The Coriolis effect reverses direction at night", "The Coriolis effect does not change between day and night."],
  ], "At night the land cools faster; air flows from land to sea: a **land breeze**.");
  mc(b, 3, "APPLICATION", "On a clear, calm night, in which place on a slope is frost most likely to form?", [
    ["On the valley floor", "Correct: cold dense air drains downslope and collects at the bottom."],
    ["On the top of the ridge", "Cold air flows away from the ridge top, so it is usually warmer."],
    ["On the middle of the slope, in the thermal belt", "The mid-slope is warmer than the valley floor."],
    ["It is equally likely everywhere", "Cold air drainage makes the lowest ground colder."],
  ], "A **frost hollow** forms in the valley bottom as katabatic winds collect cold air there.", { hints: ["Think about the direction cold, dense air flows at night."] });
  mc(b, 3, "ANALYSIS", "Compared with a nearby clearing, how is the air in a dense forest at midday?", [
    ["Cooler and more humid", "Correct: shade and transpiration cool the air and add vapour."],
    ["Warmer and drier than the clearing", "Shade and transpiration have the opposite effect."],
    ["Windier, with stronger sunshine", "A canopy reduces wind and sunlight."],
    ["Exactly the same as the clearing", "Forest and clearing have different energy and water balances."],
  ], "Forests are **cooler and more humid** by day with lower wind speeds.", { hints: ["Think about shade and transpiration."] });
  b.tf({ d: 1, skill: "RECALL", stem: "A sea breeze blows from the land to the sea during the day.", answer: false,
    feedbackFalse: "Correct: a sea breeze blows from the sea towards the land.",
    feedbackTrue: "Not so: the land is warmer by day, so air flows in from the sea.",
    explanation: "Sea breeze: sea to land by day. Land breeze: land to sea at night." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Cold air drains downslope at night and collects in valley bottoms.", answer: true, daily: true,
    feedbackTrue: "Correct: this katabatic flow forms frost hollows.",
    feedbackFalse: "Not so: cold air is dense and sinks to the lowest ground.",
    explanation: "Cold, dense air flows downhill: a **katabatic** wind." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "An upslope wind during the day is {{blank:a}}. A downslope wind at night is {{blank:b}}. A pool of cold air in a valley bottom is a frost {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["anabatic"], choices: ["anabatic", "katabatic", "monsoon"] },
      { id: "b", accepted: ["katabatic"], choices: ["katabatic", "anabatic", "trade"] },
      { id: "c", accepted: ["hollow"], choices: ["hollow", "front", "belt"] },
    ], explanation: "Anabatic (up), katabatic (down), frost hollow." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each microclimate feature to its cause.",
    pairs: [
      ["Urban heat island", "Heat storage in dark surfaces and waste heat"],
      ["Sea breeze", "Land heated faster than the sea by day"],
      ["Frost hollow", "Cold dense air draining into a valley at night"],
      ["Cool humid forest air", "Shade and transpiration"],
      ["Mild lake shore", "High heat capacity of water"],
    ], explanation: "Each microclimate is explained by surface properties and energy transfers." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "°C",
    stem: "At 03:00 the air temperature is 34 °C in the city centre and 26 °C in a rural area nearby. Calculate the urban heat island intensity, in °C.",
    value: uhi12, wrong: [60, 1.3],
    explanation: "Intensity = urban − rural = 34 − 26 = **8 °C**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°C",
    stem: `Illustrative temperatures (°C) at an urban and a rural site:\n\n${TAB13}\n\nCalculate the mean urban heat island intensity from the four pairs of readings, in °C.`,
    hints: ["Subtract the rural value from the urban value for each time.", "Add the four differences and divide by 4."],
    value: mean13, wrong: [16, 3],
    explanation: "Differences: 5, 6, 3, 2. Sum = 16. Mean = 16 ÷ 4 = **4 °C**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1, unit: "%",
    stem: "A city receives a mean of 912 mm of rain a year and a rural station 30 km away receives 830 mm. Calculate how much more rain the city receives, as a percentage of the rural total, to 1 decimal place.",
    hints: ["Find the difference first.", "Divide by the rural total, not the city total."],
    value: pct14, wrong: [9, 82],
    explanation: "1. Difference = 912 − 830 = 82 mm.\n2. As a percentage of the rural total: 82 ÷ 830 × 100 = **9.9%**.\n3. Dividing by the city total (912) gives 9.0%, which is the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the wind that blows up a slope during the day when the slope is warmed.",
    accepted: ["anabatic", "anabatic wind", "an anabatic wind"], wrong: ["katabatic"],
    explanation: "An **anabatic** wind blows upslope by day." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the effect that makes a city warmer than the surrounding countryside.",
    accepted: ["urban heat island", "heat island", "uhi", "the urban heat island effect", "urban heat island effect"], wrong: ["greenhouse effect"],
    explanation: "The **urban heat island** effect." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why urban areas stay warmer than rural areas at night.",
    hints: ["Think about heat stored during the day and the shape of cities."],
    points: [
      "Dark surfaces of concrete, tar and metal absorb a lot of heat during the day and store it.",
      "This stored heat is released slowly at night as longwave radiation and conduction.",
      "Buildings and narrow streets reduce loss of longwave radiation to the sky (and waste heat and pollution add warmth).",
    ],
    modelAnswer: "In the city, tar, concrete and roofs absorb and store heat by day and release it slowly after dark. Tall buildings trap some of the outgoing radiation and traffic and industry add waste heat, so the city cools more slowly than the open countryside.",
    explanation: "Heat storage, geometry and waste heat slow night-time cooling." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a sea breeze develops on a hot afternoon on a tropical coast.",
    hints: ["Start with the different heating of land and sea."],
    points: [
      "The land has a lower heat capacity than water, so it heats faster than the sea during the day.",
      "Air over the land is heated, expands and rises, producing lower pressure at the surface over the land.",
      "The air over the sea is cooler and denser, giving higher surface pressure.",
      "Air flows from the sea (high pressure) towards the land (low pressure) as a sea breeze, and the rising air returns seaward aloft.",
    ],
    modelAnswer: "The land heats faster than the sea because it has a lower heat capacity. Air over the land rises, lowering surface pressure there, while the cooler air over the sea has higher pressure. Air flows from sea to land as a sea breeze, and rising air returns out to sea high up, completing a circulation.",
    explanation: "Differential heating creates a pressure difference that drives the breeze." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Illustrative readings from a forest floor and from a nearby clearing:\n\n" + tbl(["Measurement", "Clearing", "Forest floor"], [["Air temperature at 12:00 (°C)", 31, 25], ["Air temperature at 03:00 (°C)", 9, 12], ["Relative humidity at 12:00 (%)", 36, 68], ["Mean wind speed at 12:00 (m/s)", 2.6, 0.7]]) + "\n\nDescribe the differences between the forest floor and the clearing.",
    hints: ["Compare each pair of figures and say which is higher.", "Mention both day and night."],
    points: [
      "At midday the forest is cooler: 25 °C compared with 31 °C (6 °C lower).",
      "At night the forest is warmer: 12 °C compared with 9 °C (3 °C higher), so the daily range is smaller in the forest.",
      "Humidity is much higher in the forest (68% compared with 36%).",
      "Wind speed is much lower in the forest (0.7 m/s compared with 2.6 m/s).",
    ],
    modelAnswer: "At midday the forest floor is 6 °C cooler than the clearing (25 °C and 31 °C), but at 03:00 it is 3 °C warmer (12 °C and 9 °C), so its range is smaller. Relative humidity is 68% in the forest against 36% in the clearing, and the mean wind speed is only 0.7 m/s against 2.6 m/s.",
    explanation: "Quote and compare each pair of values." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative night-time air temperatures along a transect from the rural edge to the centre of a city on a calm, clear night.\n\n" + tbl(["Distance from the city centre (km)", "20", "10", "5", "2", "0 (CBD)"], [["Air temperature (°C)", 19.0, 20.5, 22.0, 23.5, 25.0]]),
    hints: ["Subtract for the intensity.", "The rate of change is the temperature difference divided by the distance."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the urban heat island intensity, taking the 20 km reading as the rural temperature, in °C.", value: tr, unit: "°C", wrong: [44, 1.3],
        explanation: "25.0 − 19.0 = 6.0 °C." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the rate at which temperature rises per kilometre between 5 km and 2 km from the centre, in °C per km.", value: rate, dp: 1, wrong: [1.5, 0.2],
        explanation: "(23.5 − 22.0) ÷ (5 − 2) = 1.5 ÷ 3 = 0.5 °C per km." }),
      P.mcq({ label: "(c)", stem: "Where is the temperature highest?", options: [
        ["In the central business district", "Correct: dense buildings and heat sources are concentrated there."],
        ["At the rural edge", "The rural edge is the coolest place on the transect."],
        ["Halfway between the edge and the centre", "Temperature rises steadily towards the centre."],
        ["It is the same everywhere", "The readings differ along the transect."],
      ], answer: "A", explanation: "The CBD is the warmest part of the urban heat island." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the temperature is highest in the central business district.",
        points: [
          "Dense, tall buildings and paved surfaces absorb and store the most heat and trap outgoing radiation.",
          "There is little vegetation, so less cooling by evapotranspiration.",
          "Traffic, air-conditioning and industry release the most waste heat in the centre.",
        ],
        modelAnswer: "The centre has the densest buildings and paving, which store heat and trap radiation, almost no vegetation to cool the air, and the greatest amount of waste heat from traffic and air conditioners.",
        explanation: "Surface, vegetation and waste heat are strongest at the centre." }),
    ], explanation: "Calculate the intensity and gradient, then explain the pattern." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative data for a horticultural area in a highveld valley on clear, calm cool-season nights:\n\n" + tbl(["Position", "Height above sea level (m)", "Mean minimum temperature (°C)", "Nights with frost out of 30"], [["Valley floor", 1150, -2.0, 18], ["Middle of the slope", 1250, 2.0, 3], ["Top of the ridge", 1350, 4.5, 1]]),
    hints: ["Subtract the lower value from the higher value for a difference.", "Percentage = frost nights ÷ 30 × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the difference in mean minimum temperature between the ridge top and the valley floor, in °C.", value: diffV, unit: "°C", wrong: [2.5, 6],
        explanation: "4.5 − (−2.0) = 6.5 °C." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of nights on which the valley floor had frost.", value: frostPct, unit: "%", wrong: [18, 40],
        explanation: "18 ÷ 30 × 100 = 60%." }),
      P.short({ label: "(c)", stem: "Name the type of wind that carries cold air down the slope at night.", accepted: ["katabatic", "katabatic wind", "a katabatic wind"],
        explanation: "A katabatic wind drains cold air downslope." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the valley floor is the coldest position.",
        points: [
          "On clear nights the slopes lose heat by radiation and chill the air touching them.",
          "The cold air is dense and drains downslope under gravity as a katabatic flow.",
          "It collects on the valley floor, forming a frost hollow, while warmer air stays higher on the slope.",
        ],
        modelAnswer: "Slopes cool by radiation on clear nights and chill the air above them. This cold, dense air flows downhill and pools on the valley floor, forming a frost hollow, while warmer air remains higher up.",
        explanation: "Katabatic drainage concentrates cold air in the lowest ground." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest how a farmer in this valley could reduce the risk of frost damage to a frost-sensitive crop.",
        points: [
          "Plant the crop on the middle of the slope (thermal belt) rather than on the valley floor.",
          "Avoid building solid walls or dense hedges across the slope that would trap cold air above the crop; leave gaps so cold air can drain away.",
          "Use frost protection: covers, overhead irrigation or smoke on the coldest nights.",
          "Use an early warning from the weather forecast to prepare, or choose frost-tolerant varieties.",
        ],
        modelAnswer: "Plant on the mid-slope, where the air is warmer, and keep the downslope route clear of walls or thick hedges so cold air can drain away. On forecast frost nights use covers or irrigation, and choose frost-tolerant varieties.",
        explanation: "Use the thermal belt and allow cold air to drain." }),
    ], explanation: "Use the data to describe the frost pattern, then explain and manage it." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effectiveness of measures that could reduce the urban heat island effect in a southern African city.",
    hints: ["Choose at least three measures such as trees, cool roofs and green space, and evaluate each.", "Reach a judgement."],
    points: [
      "Tree planting and urban parks shade surfaces and cool the air by transpiration, with benefits for people and biodiversity.",
      "Trees take years to grow and need water, which is scarce in dry years.",
      "Cool (light-coloured, reflective) roofs and paving raise albedo and are cheap to apply on new buildings.",
      "Retrofitting existing roofs and roads is costly, and reflective surfaces can cause glare.",
      "Green roofs and walls cool buildings but are expensive and need maintenance and water.",
      "Reducing waste heat (efficient transport, solar power, better building design) lowers energy use but depends on investment.",
      "Planning controls (open space, ventilation corridors, building height and density) work best when applied early.",
      "Judgement: a combination, led by trees and reflective roofs for low cost and fast effect, is most effective; no single measure removes the effect entirely.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Planting trees and creating parks cools cities by shading and transpiration and also benefits health and wildlife, but trees take years to grow and need water in dry climates. Light-coloured roofs and paving raise albedo, are cheap on new buildings and act at once, although retrofitting is costly. Green roofs work but are expensive. Cutting waste heat through efficient transport and building design helps in the long term but needs investment. Planning rules that keep open space and allow air movement are most effective when applied early. I conclude that a combination of tree planting and reflective roofs gives the quickest and cheapest cooling, while no single measure removes the heat island entirely.",
    wordLimit: { max: 300 }, explanation: "Evaluate several measures by effect, cost and practicality, then judge." });

  b.card("DEFINITION", "Microclimate", "The climate of a small area (city, valley, forest, lake shore) that differs from the surrounding region.");
  b.card("DEFINITION", "Urban heat island", "A city warmer than the surrounding countryside; intensity = urban temperature − rural temperature; strongest on calm, clear nights.");
  b.card("CONCEPT", "Causes of the urban heat island", "Low-albedo surfaces that store heat, little evapotranspiration, building geometry trapping radiation, waste heat, and pollution.");
  b.card("CONCEPT", "Sea breeze and land breeze", "Sea breeze: sea to land by day (land heats faster). Land breeze: land to sea at night (land cools faster).");
  b.card("DEFINITION", "Katabatic wind", "Cold, dense air draining downslope at night; collects in valley bottoms to form frost hollows.");
  b.card("DEFINITION", "Anabatic wind", "Warm air flowing up a heated slope during the day.");
  b.card("CONCEPT", "Forest microclimate", "Cooler and more humid by day, warmer at night, less wind and a smaller temperature range than open ground.");
  b.card("CONCEPT", "Thermal belt", "The warmer zone on a mid-slope above the valley cold pool; better for frost-sensitive crops.");
});
