// W3a: arid.climates-causes (Cambridge only, A Level Paper 3 option 10). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, mean, sd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const aiA = rnd(96 / 1600, 2, 0.06, "aiA");
const aiB = rnd(380 / 1520, 2, 0.25, "aiB");
const RAIN = [210, 95, 160, 305, 120, 70, 185, 255];
const rMean = chk(mean(RAIN), 175);
const cv = rnd((sd(RAIN) / mean(RAIN)) * 100, 1, 46.0, "cv");
const diurnal = rnd(43.2 - 17.9, 1, 25.3, "diurnal");
const deficit = chk(1640 - 120, 1520);
// Struct 1: two stations
const ST1 = tbl(["", "Station N (coast)", "Station K (interior)"], [["Latitude", "23°S", "24°S"], ["Distance from the sea (km)", 8, 600], ["Annual rainfall (mm)", 14, 260], ["Mean daily maximum in January (°C)", "24.8", "33.5"], ["Mean daily minimum in July (°C)", "8.9", "2.1"], ["Days with fog per year", 105, 4]]);
const rangeK = rnd(33.5 - 2.1, 1, 31.4, "rangeK");
const rangeN = rnd(24.8 - 8.9, 1, 15.9, "rangeN");
// Struct 2: four stations
const ST2 = tbl(["Station", "Latitude", "Distance from the sea (km)", "Annual rainfall (mm)", "Setting"], [
  ["W", "31°S", 150, 120, "Prevailing winds are from the west; a mountain range 4 000 m high lies 80 km to the west"],
  ["X", "24°N", "1 800", 25, "Centre of a large continent; beneath the subtropical high-pressure belt"],
  ["Y", "22°S", 5, 12, "A cold ocean current flows along the coast"],
  ["Z", "9°N", 400, 480, "Under the ITCZ for about four months of the year"],
]);
const timesZW = chk(480 / 120, 4);

concept("ageo.arid.climates-causes", { file: "arid/climates-causes", keyPrefix: "arid.climates-causes", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Between which latitudes do most hot deserts lie?", [
    ["About 15° and 35° north and south of the equator", "Correct: they lie beneath the subtropical high-pressure belts."],
    ["Within 5° of the equator", "The equator has the ITCZ and heavy rain."],
    ["About 50° and 70° north and south of the equator", "These are mid- and high latitudes with depressions and cold climates."],
    ["Only at the poles, where it is too cold for rain", "Polar deserts are cold deserts, not hot ones."],
  ], "Hot deserts lie at **15°–35°**, beneath the subtropical high.");
  mc(b, 2, "UNDERSTANDING", "Why does sinking air in a subtropical high-pressure belt produce dry conditions?", [
    ["It warms by compression, so its relative humidity falls", "Correct: warmer air can hold more water vapour, so cloud does not form."],
    ["It cools quickly, so water vapour condenses and falls as rain", "Cooling and condensation are features of rising air."],
    ["It carries moist air upwards from the ocean to the land", "Sinking air does not carry moisture upwards."],
    ["It creates strong convection currents that produce thunderstorms", "Convection is a feature of rising air."],
  ], "Sinking air **warms**, its relative humidity falls and cloud dissolves.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How does a cold ocean current help to cause a coastal desert?", [
    ["It cools the air above it, which becomes stable and gives no rain", "Correct: the air does not rise, so convection and cloud are suppressed."],
    ["It warms the air above it, which then rises quickly to form storms", "Cold currents cool the air."],
    ["It brings heavy rain from the ocean to the land along the coast", "Cold currents are associated with dry coasts."],
    ["It blows dry winds from the land onto the sea throughout the year", "Currents are movements of water and not winds."],
  ], "Cold water cools the air above, producing **stability** and little rain, although fog is common.");
  mc(b, 2, "UNDERSTANDING", "What is a rain shadow?", [
    ["A dry area on the leeward side of a mountain range", "Correct: air descends and warms, so little rain falls."],
    ["A wet area on the windward side of a mountain range", "That is the area of relief rainfall."],
    ["A dry area caused by cold ocean currents along a coast", "That is a different cause of aridity."],
    ["A shadow cast by tall clouds over the surface of a desert", "Rain shadow has nothing to do with the cast of light."],
  ], "A rain shadow lies in the **lee** of mountains.");
  mc(b, 3, "ANALYSIS", "Why is the daily temperature range in a hot desert so large?", [
    ["Clear, dry air allows strong heating by day and rapid cooling at night", "Correct: there is little cloud or water vapour to trap heat."],
    ["Cloud cover keeps the heat in at night, and the Sun is high by day", "Deserts have little cloud."],
    ["The sea keeps the temperature steady throughout the day and night", "Deserts are far from the sea or have a cold coast."],
    ["Heavy rain cools the surface during the day, followed by heat at night", "Rain is rare in deserts."],
  ], "Clear, dry air gives **strong heating and rapid heat loss**.", { hints: ["What traps heat at night in a humid climate?"] });
  mc(b, 3, "ANALYSIS", "Which pair of causes best explains the Namib Desert?", [
    ["Subtropical high pressure and the cold Benguela current", "Correct: sinking air and cold, stable air at the coast work together."],
    ["A rain shadow and the warm Agulhas current", "The Namib is on the west coast, with a cold current, not a warm one."],
    ["Continentality and a monsoon from the Indian Ocean", "The Namib is on the coast, with no monsoon."],
    ["Heavy convectional rain and the effect of the ITCZ", "The ITCZ does not bring heavy rain to the Namib."],
  ], "The Namib has **subtropical high pressure and a cold current**.", { hints: ["Which ocean borders Namibia, and which current flows there?"] });
  mc(b, 3, "APPLICATION", "A station has an annual rainfall of 96 mm and a potential evapotranspiration of 1 600 mm. How is the climate classified using the aridity index scheme in this lesson?", [
    ["Arid, with an index of 0.06", "Correct: 96 ÷ 1 600 = 0.06, which is between 0.05 and 0.20."],
    ["Hyper-arid, with an index below 0.05", "The index is 0.06, which is above 0.05."],
    ["Semi-arid, with an index between 0.20 and 0.50", "0.06 is lower than 0.20."],
    ["Humid, with an index above 1.0", "The index is far below 1.0."],
  ], "96 ÷ 1 600 = 0.06, so the climate is **arid**.", { hints: ["Divide P by PET and compare with the class limits."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A rain shadow desert lies on the windward side of the mountain range.", answer: false,
    feedbackTrue: "Not so: the windward side is wet.", feedbackFalse: "Correct: a rain shadow desert is on the leeward (sheltered) side.",
    explanation: "Air loses moisture on the windward slope and descends on the **leeward** side." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each desert to its main cause of aridity.",
    pairs: [
      ["Sahara", "Subtropical high pressure and continentality"],
      ["Atacama", "Cold Humboldt current and a rain shadow behind the Andes"],
      ["Namib", "Subtropical high pressure and the cold Benguela current"],
      ["Patagonian Desert", "Rain shadow of the Andes"],
      ["Gobi", "Continentality and mountain barriers far from the sea"],
    ], explanation: "Most deserts result from more than one cause." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Air sinking in the subtropical high-pressure belt is part of the {{blank:a}} cell. A desert far from the sea is affected by {{blank:b}}. The ratio of precipitation to potential evapotranspiration is the {{blank:c}} index.",
    blanks: [
      { id: "a", accepted: ["Hadley"], choices: ["Hadley", "Ferrel", "Polar"] },
      { id: "b", accepted: ["continentality"], choices: ["continentality", "refraction", "leaching"] },
      { id: "c", accepted: ["aridity"], choices: ["aridity", "humidity", "variability"] },
    ], explanation: "The Hadley cell, continentality and the aridity index." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the cold ocean current that flows along the coast of Namibia.",
    accepted: ["Benguela", "Benguela current", "the Benguela current", "Benguela Current"], explanation: "The **Benguela** current flows north along the south-west coast of Africa." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "A station has an annual rainfall of 380 mm and a potential evapotranspiration of 1 520 mm (illustrative data). Calculate the aridity index (P ÷ PET) to two decimal places.",
    hints: ["Divide the rainfall by the potential evapotranspiration."],
    value: aiB, dp: 2, wrong: [4, 0.4, 2.5],
    explanation: "380 ÷ 1 520 = **0.25**. The value 4 divides PET by P (1 520 ÷ 380)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Annual rainfall (mm) at a semi-arid station over eight years was 210, 95, 160, 305, 120, 70, 185 and 255 (illustrative data). Calculate the coefficient of variation (sample standard deviation ÷ mean × 100), to one decimal place.",
    hints: ["The mean is 175 mm.", "Use n − 1 in the standard deviation."],
    value: cv, dp: 1, wrong: [80.4, 43.0, 45.9],
    explanation: "1. Mean = 1 400 ÷ 8 = 175 mm.\n2. Sample standard deviation (n − 1) = 80.4 mm.\n3. Coefficient of variation = 80.4 ÷ 175 × 100 = **46.0%**. The value 80.4 is the standard deviation, and 43.0 divides by n instead of n − 1." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "°C",
    stem: "On one day in a hot desert the maximum temperature is 43.2 °C and the minimum is 17.9 °C (illustrative data). Calculate the diurnal temperature range, in °C to one decimal place.",
    hints: ["Maximum minus minimum."],
    value: diurnal, dp: 1, wrong: [61.1, 30.5],
    explanation: "43.2 − 17.9 = **25.3 °C**. The value 61.1 adds the two temperatures." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "A semi-arid area receives 120 mm of rain a year and has a potential evapotranspiration of 1 640 mm (illustrative data). Calculate the annual water deficit (PET − P), in mm.",
    hints: ["Subtract the rainfall from the potential evapotranspiration."],
    value: deficit, wrong: [1760, 13.7],
    explanation: "1 640 − 120 = **1 520 mm**. The value 1 760 adds the two numbers." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the main features of the climate of a hot desert.",
    points: [
      "Very low rainfall, usually under about 250 mm a year, which is highly variable and falls in short, intense storms.",
      "Very high daytime temperatures in summer, often above 40 °C, and a large diurnal range (often 20–30 °C).",
      "Clear skies, low humidity and high rates of evaporation, with strong, gusty winds.",
    ],
    modelAnswer: "Rainfall is very low, usually under about 250 mm a year, highly variable and falls in short, intense storms. Daytime temperatures in summer are often above 40 °C and the diurnal range is large, often 20–30 °C. Skies are clear, humidity is low and evaporation is high, with strong, gusty winds.",
    explanation: "Rainfall, temperature and other features, each with figures." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the subtropical high-pressure belt causes aridity.",
    hints: ["Start with the Hadley cell."],
    points: [
      "Air rises at the ITCZ, moves poleward at height, cools and sinks at about 30° latitude as part of the Hadley cell.",
      "Sinking air is compressed and warms, so its relative humidity falls and cloud dissolves.",
      "Surface winds blow outward from the high pressure, so moist air does not enter.",
      "The sky is clear, so there is strong heating and high evaporation, and rain is rare.",
    ],
    modelAnswer: "Air rises at the ITCZ, moves poleward, cools and sinks at about 30° latitude as part of the Hadley cell. Sinking air is compressed and warms, so its relative humidity falls and cloud dissolves. Surface winds blow outward from the high pressure, so moist air does not enter. Skies are clear, which gives strong heating and high evaporation.",
    explanation: "Sinking air warms, so cloud does not form." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the Humboldt current contributes to the dryness of the Atacama Desert.",
    hints: ["Think about the air above cold water."],
    points: [
      "The cold current cools the air above it, so the air becomes dense and stable and does not rise.",
      "Without rising air there is no convection, cloud or rain, although fog may form.",
      "Winds blowing from the cooled air over the land bring little moisture, and the Andes add a rain shadow.",
    ],
    modelAnswer: "The cold Humboldt current cools the air above it, so the air becomes dense and stable and does not rise. Without rising air there is no convection, cloud or rain, though fog may form. The air blowing onto the land brings little moisture, and the Andes add a rain shadow.",
    explanation: "Cold current, stable air and no rain." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why rainfall in semi-arid areas is so unreliable from year to year.",
    hints: ["Think about the ITCZ and ENSO."],
    points: [
      "These areas lie at the edge of the rain belt, so small changes in the position or strength of the ITCZ or the monsoon change the length and strength of the wet season.",
      "Rain falls mainly in a few intense convectional storms, so the total depends on how many occur.",
      "Climatic cycles such as El Niño affect rainfall in many semi-arid regions, so some years are much drier.",
    ],
    modelAnswer: "These areas lie at the edge of the rain belt, so small changes in the position or strength of the ITCZ or monsoon change the wet season. Rain falls in a few intense convectional storms, so the total depends on how many occur. El Niño and other climatic cycles affect rainfall in many semi-arid regions, so some years are much drier.",
    explanation: "Edge-of-belt position, storm dependence and climatic cycles." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table compares two stations at similar latitudes in a desert region (illustrative data, invented for this exercise).\n\n${ST1}`,
    hints: ["Annual temperature range here = January maximum − July minimum.", "Think about the effect of the sea and of a cold current."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the difference between the mean daily maximum in January and the mean daily minimum in July at Station K, in °C.", value: rangeK, dp: 1, unit: "°C", wrong: [35.6, 15.9],
        explanation: "33.5 − 2.1 = 31.4 °C. The value 35.6 adds the two temperatures." }),
      P.manual({ label: "(b)", marks: 3, stem: "Compare the climates of Station N and Station K.",
        points: [
          "Station N is far drier in terms of rainfall (14 mm) than Station K (260 mm), but both receive little.",
          "The temperature difference between January and July is much smaller at N (15.9 °C) than at K (31.4 °C).",
          "Station N has many days with fog (105) compared with only 4 at K, and its January maximum is lower (24.8 °C compared with 33.5 °C).",
        ],
        modelAnswer: "Station N is drier, with 14 mm compared with 260 mm at K, though both receive little. The difference between the January maximum and July minimum is much smaller at N (15.9 °C) than at K (31.4 °C). N has 105 days with fog compared with 4 at K, and its January maximum is lower, at 24.8 °C compared with 33.5 °C.",
        explanation: "Compare rainfall, temperature range and fog with figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the differences between the two stations.",
        points: [
          "Station N lies beside a cold ocean current, which cools the air and reduces the temperature range and the January maximum; the sea also moderates temperatures.",
          "The cooled air is stable, so it gives fog but almost no rain, whereas K, far from the sea, has a continental climate with a larger range and some convectional rain in summer.",
          "K lies 600 km from the sea, so it has strong heating by day and rapid cooling by night, giving higher maxima and lower minima.",
        ],
        modelAnswer: "Station N lies beside a cold ocean current, which cools the air and reduces the January maximum and the range; the sea also moderates temperatures. The cooled air is stable, so it gives fog but almost no rain. K lies 600 km from the sea, so it has a continental climate, strong heating by day, rapid cooling at night and some convectional rain in summer.",
        explanation: "Cold current and sea influence at N; continentality at K." }),
    ], explanation: "Calculate a range, compare stations and explain the differences." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives information on four stations (illustrative data, invented for this exercise).\n\n${ST2}`,
    hints: ["Divide the rainfall at Z by that at W.", "Match each station's setting to one of the causes of aridity."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "How many times greater is the annual rainfall at Station Z than at Station W?", value: timesZW, wrong: [360, 0.25],
            explanation: "480 ÷ 120 = 4 times. The value 360 is the difference in mm." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which cause best explains the low rainfall at Station W?", options: [
            ["Rain shadow behind a mountain range", "Correct: the winds come from the west over mountains 80 km away."],
            ["A cold ocean current along the coast", "Station W is 150 km from the sea and the table gives a mountain range."],
            ["Position under the ITCZ", "Station W is at 31°S, outside the ITCZ."],
            ["Continentality of a large landmass", "Station W is only 150 km from the sea."],
          ], answer: "A", explanation: "The prevailing wind crosses a high range, loses its moisture and descends as dry air at W." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why Station Y is arid although it is only 5 km from the sea.",
        points: [
          "A cold ocean current cools the air above the coast, so the air is dense and stable and does not rise to form cloud and rain.",
          "Onshore winds are cool and bring fog but little rain.",
          "Station Y lies at 22°S, beneath the subtropical high-pressure belt, where sinking air also prevents rain.",
        ],
        modelAnswer: "A cold ocean current cools the air above the coast, so the air is dense and stable and does not rise to form cloud and rain. The onshore winds are cool and bring fog but little rain. Station Y also lies at 22°S, beneath the subtropical high, where sinking air prevents rain.",
        explanation: "Cold current and subtropical high." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why Station X has very low rainfall.",
        points: [
          "It lies in the centre of a large continent, far from the sea, so moist air from the oceans loses its moisture before it arrives (continentality).",
          "It lies beneath the subtropical high-pressure belt at 24°N, where sinking air warms and prevents cloud.",
          "Surface winds blow from the land, so they are dry, and strong heating increases evaporation.",
        ],
        modelAnswer: "Station X lies in the centre of a large continent, so air from the oceans loses its moisture before it arrives. It lies beneath the subtropical high at 24°N, where sinking air warms and prevents cloud. Surface winds blow from the land and are dry, and strong heating increases evaporation.",
        explanation: "Continentality plus subtropical high." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess which cause of aridity appears to be most important in the table.",
        points: [
          "The subtropical high-pressure belt is relevant to three stations (W at 31°S, X at 24°N and Y at 22°S), whereas Z, within the ITCZ zone, is much wetter, so latitude is a strong control.",
          "Other causes act in addition: rain shadow at W, continentality at X and a cold current at Y, so the rainfall at each place is explained by more than one cause.",
          "Judgement: the subtropical high is the most widespread cause, but local factors decide how dry each place is, so there is no single cause.",
        ],
        modelAnswer: "The subtropical high is relevant to three stations: W at 31°S, X at 24°N and Y at 22°S, while Z, in the ITCZ zone, is much wetter, so latitude is a strong control. Other causes act in addition: rain shadow at W, continentality at X and a cold current at Y. The subtropical high is the most widespread cause, but local factors decide how dry each place is.",
        explanation: "Weigh the widespread cause against local ones." }),
    ], explanation: "Calculate a ratio, explain aridity at three stations and assess the causes." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of subtropical high pressure in explaining the distribution of hot deserts.",
    hints: ["Explain how it causes aridity.", "Say where it fails to explain the pattern."],
    points: [
      "Sinking air in the Hadley cell warms and prevents cloud, which explains why deserts lie at about 15°–35° on both sides of the equator.",
      "It explains the Sahara, the Arabian Desert and the Australian interior well.",
      "Winds blow out of high-pressure cells, so moist air is not drawn in.",
      "But it does not explain the Atacama or Namib alone, where cold ocean currents make the aridity extreme.",
      "It does not explain Patagonia or the Great Basin, which are rain shadow deserts, nor the Gobi, which is caused by continentality.",
      "Deserts on the western sides of continents are drier than those on the east, which shows that ocean currents and winds also matter.",
      "Highlands and the position of the ITCZ modify where the belt sits through the year.",
      "Judgement: subtropical high pressure is the most important general cause and explains the broad pattern, but local and regional causes explain the exceptions and the extreme dryness.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Subtropical high pressure explains the broad pattern of hot deserts at about 15°–35° on both sides of the equator. Air sinks in the Hadley cell, warms by compression and prevents cloud, and winds blow out of the high-pressure cells, so moist air is not drawn in. This explains the Sahara, the Arabian Desert and the Australian interior well. However, it does not explain the Atacama or the Namib alone, where cold ocean currents make the aridity extreme. It does not explain Patagonia or the Great Basin, which are rain shadow deserts, nor the Gobi, which is caused by continentality. I conclude that subtropical high pressure is the most important general cause and explains the broad pattern, but local and regional causes explain the exceptions and the extreme dryness.",
    wordLimit: { max: 300 }, explanation: "Weigh the main cause against the others, using named deserts." });

  b.card("DEFINITION", "Arid and semi-arid", "Arid: typically under about 250 mm of rain a year. Semi-arid: about 250–500 mm. Rainfall is low compared with potential evaporation.");
  b.card("DEFINITION", "Aridity index", "Precipitation ÷ potential evapotranspiration. Hyper-arid below 0.05, arid 0.05–0.20, semi-arid 0.20–0.50.");
  b.card("CONCEPT", "Climate of hot deserts", "Low, variable and intense rainfall; very high daytime temperatures; a diurnal range of 20–30 °C; clear skies, low humidity, high evaporation and strong winds.");
  b.card("CONCEPT", "Subtropical high pressure", "Air rising at the ITCZ sinks at about 30° (the Hadley cell), warms by compression, so its relative humidity falls and cloud does not form.");
  b.card("CONCEPT", "Cold currents and coastal deserts", "A cold current (Benguela, Humboldt, Canary, West Australian) cools the air above it, which is stable and gives fog but no rain: Namib and Atacama.");
  b.card("DEFINITION", "Rain shadow", "A dry area on the leeward side of a mountain range where air descends and warms, for example Patagonia behind the Andes.");
  b.card("DEFINITION", "Continentality", "Remoteness from the sea, giving a large temperature range and little moisture, as in the Gobi and the central Sahara.");
  b.card("FACT", "Highest reliably recorded temperature", "56.7 °C at Death Valley, California, in July 1913.");
  b.card("FORMULA", "Coefficient of variation", "CV (%) = sample standard deviation ÷ mean × 100; a high value shows unreliable rainfall.");
});
