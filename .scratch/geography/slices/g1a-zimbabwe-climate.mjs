// Slice G1a: the climate of Zimbabwe and climate variability.
import { concept, P, geographyLevels } from "../lib.mjs";

const ST = "| Station (fictional) | Altitude (m) | Mean January temperature (°C) | Mean July temperature (°C) | Mean annual rainfall (mm) |\n|---|---|---|---|---|\n| P (eastern mountains) | 1,800 | 18 | 11 | 1,350 |\n| Q (highveld) | 1,450 | 21 | 14 | 820 |\n| R (south-western plateau) | 1,350 | 22 | 14 | 590 |\n| S (south-eastern lowveld) | 430 | 28 | 19 | 470 |";
const VR = "| Season | Rainfall (mm) |\n|---|---|\n| 2018-19 | 610 |\n| 2019-20 | 880 |\n| 2020-21 | 1,010 |\n| 2021-22 | 720 |\n| 2022-23 | 830 |\n| Long-term mean | 800 |";

concept("geo.weather.zimbabwe-climate", { file: "weather/zimbabwe-climate", keyPrefix: "weather.zimbabwe-climate" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which months make up Zimbabwe's **hot wet season**?",
    options: [
      ["About November to March", "Correct: almost all the year's rain falls in these months."],
      ["About May to August", "These months form the cool dry season."],
      ["About September to October", "These months form the hot dry season, before the rains."],
      ["About April to July", "April ends the rains and May to July are cool and dry."],
    ],
    answer: "A",
    explanation: "The **hot wet season** runs from about November to March.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are temperatures on Zimbabwe's highveld moderate even though the country lies in the tropics?",
    options: [
      ["The high altitude of the plateau", "Correct: temperature falls by about 6.5 °C per 1,000 m."],
      ["Cold ocean currents off the coast", "Zimbabwe is landlocked, so ocean currents have no direct effect."],
      ["Its position far from the equator", "Zimbabwe is within the tropics, between about 15.5° and 22.5° S."],
      ["Snow that falls every winter", "Snow is extremely rare in Zimbabwe."],
    ],
    answer: "A",
    explanation: "**Altitude** keeps the highveld moderate: temperature falls with height.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which general direction does mean annual rainfall **decrease** across Zimbabwe?",
    options: [
      ["From north-east to south-west", "Correct: the east and north-east are wettest, Matabeleland and the south driest."],
      ["From south-west to north-east", "This is the opposite: the south-west is the drier part."],
      ["From north-west to south-east", "The far south-east lowveld is dry, but the north-west is not the wettest area."],
      ["From west to east", "The Eastern Highlands are the wettest part of the country."],
    ],
    answer: "A",
    explanation: "Rainfall (and its reliability) decreases from the **north-east and east** towards the **south and south-west**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the cool dry season in Zimbabwe mostly cloudless?",
    options: [
      ["High pressure with sinking air lies over southern Africa", "Correct: sinking air warms and cloud cannot form."],
      ["The ITCZ lies directly over the country", "The ITCZ brings rain; in July it is far to the north."],
      ["Moist air streams blow from the Indian Ocean", "Moist air would bring cloud and rain, not clear skies."],
      ["The sun is overhead and heats the ground strongly", "In winter the sun is lower in the northern sky."],
    ],
    answer: "A",
    explanation: "In the cool season **high pressure** and sinking air dominate, giving clear skies, warm days and cold nights.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many Zimbabwean stations record their **highest** monthly mean temperature in October or November rather than in January. Why?",
    options: [
      ["Cloud and rain in the wet season reduce daytime heating", "Correct: before the rains the sky is clear and the sun high."],
      ["The sun is furthest north in October", "In October the sun is moving south towards the Tropic of Capricorn."],
      ["October and November have the longest nights", "Nights are longest in June."],
      ["Winds from the Antarctic stop in October", "Cold southerly air is a winter feature but does not explain the October peak."],
    ],
    answer: "A",
    explanation: "In October-November the sun is high and the sky clear; once the rains begin, cloud cover and evaporation of rain keep temperatures lower.",
    hints: ["What changes in the sky once the rains start?", "Think about cloud cover during the day."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which farming activity is **best** suited to the cool, wet, misty climate of the Eastern Highlands?",
    options: [
      ["Tea and timber plantations", "Correct: tea needs high, well-distributed rainfall and cool conditions."],
      ["Extensive cattle ranching", "Ranching suits the hot, dry lowveld and region V."],
      ["Cotton growing", "Cotton suits warmer, drier middleveld areas."],
      ["Rain-fed sugar cane", "Sugar cane in Zimbabwe is grown in the hot lowveld under irrigation."],
    ],
    answer: "A",
    explanation: "High, reliable rainfall and cool temperatures suit **tea, coffee and timber** in the Eastern Highlands.",
    hints: ["Which crops need a lot of rain all year?", "Which activities suit hot, dry areas instead?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement describes **climate variability** rather than climate change?",
    options: [
      ["One season gets 30 % less rain than normal, the next 20 % more", "Correct: year-to-year swings around an average are variability."],
      ["Average temperatures rise steadily over fifty years", "A long-term shift in the average is climate change."],
      ["Glaciers retreat over a century", "This is long-term evidence of climate change."],
      ["The long-term mean rainfall falls by 100 mm over decades", "A change in the average itself is climate change."],
    ],
    answer: "A",
    explanation: "**Variability** is the normal swing above and below the average from season to season.",
    hints: ["Is the average itself changing, or only individual years?"],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional station at 400 m has a mean January temperature of 27 °C. Using a fall of 6.5 °C per 1,000 m, estimate the January temperature at a station at 1,800 m.",
    value: 17.9, unit: "°C", tol: 0.05,
    wrong: [36.1, 9.1],
    explanation: "Height difference 1,400 m, so the fall is 6.5 × 1.4 = 9.1 °C: 27 − 9.1 = 17.9 °C.",
    hints: ["Find the difference in height first.", "1,400 m is 1.4 thousand metres."],
    workedSolution: "1. Height difference = 1,800 − 400 = 1,400 m.\n2. Fall = 6.5 °C per 1,000 m × 1.4 = 9.1 °C.\n3. Estimate = 27 − 9.1 = 17.9 °C.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows rainfall at a fictional highveld station.\n\n${VR}\n\nWhat was the rainfall anomaly for 2018-19, in mm? (Use a minus sign for below normal.)`,
    value: -190, unit: "mm",
    wrong: [190, 610],
    explanation: "Anomaly = 610 − 800 = −190 mm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `The table shows rainfall at a fictional highveld station.\n\n${VR}\n\nExpress the 2020-21 rainfall anomaly as a percentage of the long-term mean. Give your answer to the nearest whole number (use a minus sign if below normal).`,
    value: 26, unit: "%", tol: 0.5,
    wrong: [-26, 126],
    explanation: "Anomaly = 1,010 − 800 = +210 mm; 210 ÷ 800 × 100 = 26.25 %, about +26 %.",
    workedSolution: "1. Anomaly = 1,010 − 800 = 210 mm.\n2. 210 ÷ 800 = 0.2625.\n3. × 100 = 26.25 %, which rounds to 26 % (above normal).",
    hints: ["First find the anomaly in mm.", "Divide by the long-term mean and multiply by 100."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: `Study the data for fictional stations.\n\n${ST}\n\nCalculate the **annual temperature range** suggested by the January and July means at station S, and state how many degrees larger it is than at station P.`,
    value: 2, unit: "°C",
    wrong: [9, 7],
    explanation: "S: 28 − 19 = 9 °C. P: 18 − 11 = 7 °C. Difference = 9 − 7 = 2 °C.",
    workedSolution: "1. Range at S = 28 − 19 = 9 °C.\n2. Range at P = 18 − 11 = 7 °C.\n3. Difference = 9 − 7 = 2 °C.",
    hints: ["Range = January mean − July mean here.", "Then subtract P's range from S's."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Temperature falls by roughly {{blank:a}} °C for every 1,000 m of height, so the {{blank:b}} is hotter than the highveld.",
    blanks: [
      { id: "a", accepted: ["6.5", "6,5"], wrong: "1" },
      { id: "b", accepted: ["lowveld", "low veld", "Zambezi valley"], wrong: "Eastern Highlands" },
    ],
    explanation: "About **6.5 °C** per 1,000 m (an average). The low-lying **lowveld** and Zambezi valley are the hottest areas.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each climatic zone of Zimbabwe with an activity it supports.",
    pairs: [
      ["Eastern Highlands", "Tea, coffee and timber plantations"],
      ["Highveld", "Maize, tobacco and dairy farming"],
      ["Lowveld", "Irrigated sugar cane and cattle ranching"],
      ["Zambezi valley and Hwange area", "Wildlife and safari tourism"],
    ],
    explanation: "Rainfall, its reliability and temperature determine which activities suit each zone.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe lies wholly within the tropics.",
    answer: true,
    explanation: "True. It lies between about 15.5° S and 22.5° S, north of the Tropic of Capricorn.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Zimbabwe, the drier an area is, the more reliable its rainfall usually is.",
    answer: false,
    explanation: "False. Drier areas (regions IV and V) usually have the **least** reliable rainfall.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the warming of the eastern Pacific Ocean that is often linked with drought in Zimbabwe.",
    accepted: ["El Nino", "El Niño", "ElNino", "El-Nino", "El Niño event", "El Nino event"],
    wrong: ["La Nina"],
    explanation: "**El Niño** years (for example 1991-92 and 2015-16) often bring below-normal rains.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how distance from the sea affects the climate of Zimbabwe.",
    points: [
      "Zimbabwe is landlocked, so moist air from the Indian Ocean loses moisture crossing Mozambique and the Eastern Highlands.",
      "As a result, rainfall generally decreases westwards (away from the ocean).",
      "Being inland (continental), it has a larger temperature range: hot days and cold winter nights.",
    ],
    modelAnswer: "Zimbabwe is landlocked. Moist air from the Indian Ocean loses much of its moisture over Mozambique and the Eastern Highlands, so rainfall decreases westwards. Because it is far from the moderating effect of the sea, it has a continental climate with a large range: hot days and cold winter nights, with frost in places.",
    explanation: "Credit moisture loss inland, decreasing rainfall westwards and continentality.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **four** ways farmers and the government can reduce the effects of climate variability in Zimbabwe.",
    points: [
      "Issue and use seasonal forecasts and early warnings before planting.",
      "Grow drought-tolerant or early-maturing varieties (sorghum, millet).",
      "Harvest and store water / irrigate from dams and boreholes / conservation farming.",
      "Keep national grain reserves, provide food aid or insurance for crops and livestock.",
    ],
    modelAnswer: "The meteorological service can issue seasonal forecasts so farmers decide what and when to plant. Farmers can grow drought-tolerant or early-maturing crops such as sorghum and millet, and use mulching, planting basins and rainwater harvesting. Irrigation from dams and boreholes protects crops in dry spells. The government can keep grain reserves and support insurance schemes for bad seasons.",
    explanation: "One mark each for four different, practical measures.",
    hints: ["Think of information, crops, water and food security.", "Include at least one government measure."],
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: `Using the data for fictional stations, describe and explain the differences in temperature and rainfall between the stations.\n\n${ST}`,
    points: [
      ["Temperature description with data: S is hottest (28 °C January), P coolest (18 °C January).", 1],
      ["Temperature explanation: altitude, S at 430 m versus P at 1,800 m (about 6.5 °C per 1,000 m).", 1],
      ["Rainfall description with data: from 1,350 mm at P to 470 mm at S (590 mm at R).", 1],
      ["Rainfall explanation for P: relief rain from moist south-east air forced over the eastern mountains.", 1],
      ["Rainfall explanation for R and S: further from the ocean / in a rain shadow / less reliable rain belt.", 1],
      ["Linking: lowveld is hot and dry, eastern mountains cool and wet (correct use of all four stations).", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Temperature rises as altitude falls. Station P, at 1,800 m in the eastern mountains, has a January mean of 18 °C, while station S in the lowveld at 430 m has 28 °C. Temperature falls by about 6.5 °C per 1,000 m, so the 1,370 m difference explains most of the 10 °C contrast. Q and R on the plateau are in between.\n\nRainfall decreases from 1,350 mm at P to 820 mm at Q, 590 mm at R and 470 mm at S. P receives relief rain as moist south-east winds from the Indian Ocean are forced over the mountains. Q on the highveld gets reliable convectional rain. R in the south-west is further from the ocean, and S lies in the rain shadow of the eastern mountains, so both are drier.",
    explanation: "Describe with data first, then explain using altitude, relief rain, distance from the sea and rain shadow.",
    hints: ["Rank the stations by altitude and compare with temperature.", "Which station gets relief rain and which is in a rain shadow?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows rainfall at a fictional highveld station.\n\n${VR}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the wettest season.", accepted: ["2020-21", "2020 21", "2020/21", "2020-2021", "202021"], wrong: ["2019-20"], explanation: "2020-21, with 1,010 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the range of seasonal rainfall over the five seasons.", value: 400, unit: "mm", wrong: [210], explanation: "1,010 − 610 = 400 mm." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean rainfall of the five seasons.", value: 810, unit: "mm", wrong: [800, 4050], explanation: "610 + 880 + 1,010 + 720 + 830 = 4,050; 4,050 ÷ 5 = 810 mm." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe **two** problems a maize farmer might face in a season like 2018-19.", points: [
        "Crops wilt or fail (lower yields) because of too little rain / dry spells.",
        "Loss of income and food shortages; may need food aid or to sell livestock.",
      ], explanation: "2018-19 was 190 mm below normal." }),
    ],
    hints: ["Range = highest − lowest.", "Mean = total ÷ 5 (do not include the long-term mean)."],
    explanation: "Practice in analysing rainfall variability.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "A tour operator (fictional) runs game drives in a national park in the Zambezi valley and boat trips on a river. Her bookings are highest from June to October and lowest from December to March.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which season includes the busiest months?", options: [
        ["The cool and hot dry seasons", "Correct: June to October covers the cool dry and hot dry seasons."],
        ["The hot wet season", "December to March is the quietest period here."],
        ["Only the hot wet season's end", "The busiest months span June to October."],
        ["The months of heaviest rain", "Heavy rain falls from December to February, when bookings are lowest."],
      ], answer: "A", explanation: "June to October is the dry part of the year." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why game viewing is better in the dry season.", points: [
        "Grass and bush are thin or leafless, so animals are easier to see.",
        "Water is scarce, so animals gather at rivers and water holes.",
      ], explanation: "Visibility and concentration of animals at water." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** problems for tourism in the hot wet season.", points: [
        "Heavy rain and floods make dirt roads impassable / storms disrupt activities.",
        "Thick vegetation hides animals; more mosquitoes (malaria risk) and heat.",
      ], explanation: "Credit access, visibility and health or comfort problems." }),
    ],
    hints: ["Think about vegetation and water in each season.", "What happens to dirt roads in heavy rain?"],
    explanation: "Practice in relating climate to tourism.",
  });
  b.card("FACT", "Zimbabwe's seasons", "Hot wet: about November-March. Cool dry: about May-August. Hot dry: about September-October.");
  b.card("CONCEPT", "Why the highveld is moderate", "Altitude: temperature falls about 6.5 °C per 1,000 m.");
  b.card("CONCEPT", "Rainfall pattern", "Decreases (and becomes less reliable) from the north-east and east to the south and south-west.");
  b.card("CONCEPT", "Distance from the sea", "Landlocked: moist Indian Ocean air dries out westwards; continental climate with a large range.");
  b.card("DEFINITION", "Climate variability", "Year-to-year or season-to-season departures from the long-term average climate.");
  b.card("DEFINITION", "Rainfall anomaly", "Actual rainfall minus the long-term mean; often given as a percentage of the mean.");
  b.card("DEFINITION", "Mid-season dry spell", "Several weeks without useful rain in the middle of the rainy season, often in January or February.");
  b.card("FACT", "El Niño droughts", "Often linked with below-normal rain in Zimbabwe, e.g. 1991-92 and 2015-16.");
  b.card("CONCEPT", "Responses to variability", "Seasonal forecasts, drought-tolerant crops, water harvesting, irrigation, grain reserves, insurance.");
});
