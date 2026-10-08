// Slice G1a: world climate types and their distribution.
import { concept, P, geographyLevels } from "../lib.mjs";

const HEAD = "| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n";
const TD = HEAD + "| Temperature (°C) | 30 | 31 | 28 | 24 | 19 | 15 | 14 | 17 | 21 | 25 | 28 | 30 |\n| Rainfall (mm) | 10 | 15 | 8 | 3 | 1 | 0 | 0 | 0 | 1 | 4 | 6 | 8 |";
const TM = HEAD + "| Temperature (°C) | 24 | 26 | 29 | 31 | 32 | 30 | 28 | 28 | 28 | 27 | 25 | 23 |\n| Rainfall (mm) | 5 | 8 | 10 | 20 | 120 | 450 | 600 | 500 | 300 | 90 | 20 | 5 |";
const TC = HEAD + "| Temperature (°C) | 5 | 5 | 7 | 9 | 12 | 15 | 17 | 17 | 14 | 11 | 8 | 6 |\n| Rainfall (mm) | 90 | 65 | 60 | 55 | 55 | 60 | 65 | 75 | 80 | 90 | 90 | 95 |";

concept("geo.weather.world-climates", { file: "weather/world-climates", keyPrefix: "weather.world-climates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which **two** elements of weather are mainly used to classify world climates?",
    options: [
      ["Temperature and rainfall", "Correct: their levels, ranges and seasonal timing define each type."],
      ["Wind speed and cloud type", "These vary daily and are not the basis of classification."],
      ["Air pressure and sunshine hours", "These help explain climates but are not the main basis."],
      ["Humidity and visibility", "These are weather observations, not the basis of climate types."],
    ],
    answer: "A",
    explanation: "Climates are classified mainly by **temperature** (level and range) and **rainfall** (amount and season).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which climate has **hot, dry summers and mild, wet winters**?",
    options: [
      ["Mediterranean", "Correct: subtropical high pressure in summer, depressions in winter."],
      ["Tropical continental (savanna)", "Savanna has wet summers and dry winters, the reverse."],
      ["Equatorial", "Equatorial regions are hot and wet all year."],
      ["Tropical monsoon", "Monsoon climates have very wet summers."],
    ],
    answer: "A",
    explanation: "The **Mediterranean** climate has dry summers and wet winters (e.g. Cape Town).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which climate type covers most of Zimbabwe?",
    options: [
      ["Tropical continental (savanna)", "Correct: a hot wet summer and a dry winter."],
      ["Equatorial", "Equatorial climates have rain all year; Zimbabwe has a long dry season."],
      ["Warm temperate east coast", "This type is found on coasts such as KwaZulu-Natal."],
      ["Mediterranean", "Zimbabwe's rain falls in summer, not in winter."],
    ],
    answer: "A",
    explanation: "Most of Zimbabwe has a **tropical continental (savanna)** climate, modified by altitude on the highveld.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are many hot deserts found on the **west coasts** of continents between about 15° and 30°?",
    options: [
      ["Sinking air and cold ocean currents prevent rain", "Correct: high pressure and air cooled from below give stable, dry conditions."],
      ["They are too close to the ITCZ", "The ITCZ brings rain; deserts lie away from it."],
      ["They receive warm, moist onshore trade winds", "Moist onshore winds bring rain to east coasts, not deserts."],
      ["They are at high altitudes", "Coastal deserts such as the Namib are low-lying."],
    ],
    answer: "A",
    explanation: "Subtropical **high pressure** (sinking air) plus **cold currents** such as the Benguela make the air stable and dry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where in Africa is the **equatorial** climate found?",
    options: [
      ["The Congo basin", "Correct: it lies on the equator, with rain all year."],
      ["The Kalahari", "The Kalahari is a semi-desert in the southern subtropics."],
      ["The south-western Cape", "This area has a Mediterranean climate."],
      ["The Sahel", "The Sahel is a dry savanna on the southern edge of the Sahara."],
    ],
    answer: "A",
    explanation: "The **Congo basin** (and the Gulf of Guinea coast) has an equatorial climate.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Study the climate data for a fictional station.\n\n${TM}\n\nWhich climate type does it show?`,
    options: [
      ["Tropical monsoon", "Correct: extremely wet June-September after a very hot May, then a dry winter."],
      ["Equatorial", "Equatorial climates have rain in every month; here November-April are dry."],
      ["Mediterranean", "Here the rain falls in summer, not winter."],
      ["Hot desert", "The total is over 2,000 mm, far too wet for a desert."],
    ],
    answer: "A",
    explanation: "Over 2,100 mm, nearly all from May to September, with the hottest month just before the rains: **tropical monsoon** (northern hemisphere).",
    hints: ["When does most of the rain fall, and how much?", "Which month is hottest compared with the rains?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Study the climate data for a fictional station.\n\n${TC}\n\nWhich climate type does it show?`,
    options: [
      ["Cool temperate western margin", "Correct: mild, cool, small range and rain in every month."],
      ["Cool temperate continental", "Continental interiors have a very large range and cold winters well below 0 °C."],
      ["Polar tundra", "In tundra the warmest month is below 10 °C; here it is 17 °C."],
      ["Mediterranean", "Mediterranean summers are hot and dry; here summer is cool and wet."],
    ],
    answer: "A",
    explanation: "Cool summers (17 °C), mild winters (5 °C), a 12 °C range and rain all year: **cool temperate western margin**, like Britain.",
    hints: ["Is there a dry season?", "Compare the range with a continental interior."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows climate data for a fictional station.\n\n${TD}\n\nCalculate the total annual rainfall.`,
    value: 56, unit: "mm",
    wrong: [4.67, 15],
    explanation: "10 + 15 + 8 + 3 + 1 + 0 + 0 + 0 + 1 + 4 + 6 + 8 = 56 mm.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station.\n\n${TD}\n\nCalculate the annual temperature range.`,
    value: 17, unit: "°C",
    wrong: [45, 31],
    explanation: "Hottest February 31 °C, coolest July 14 °C: 31 − 14 = 17 °C.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station.\n\n${TM}\n\nWhat percentage of the annual rainfall falls from May to September? Give your answer to the nearest whole number.`,
    value: 93, unit: "%", tol: 0.5,
    wrong: [1970, 42],
    explanation: "May-September: 120 + 450 + 600 + 500 + 300 = 1,970 mm. Total 2,128 mm. 1,970 ÷ 2,128 × 100 = 92.6 %, about 93 %.",
    workedSolution: "1. May-September = 120 + 450 + 600 + 500 + 300 = 1,970 mm.\n2. Annual total = 2,128 mm.\n3. 1,970 ÷ 2,128 × 100 = 92.58 %.\n4. Nearest whole number: 93 %.",
    hints: ["Add the five wet months.", "Then divide by the annual total and multiply by 100."],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station.\n\n${TC}\n\nCalculate the mean annual temperature. Give your answer to one decimal place.`,
    value: 10.5, unit: "°C", tol: 0.05,
    wrong: [126, 12],
    explanation: "Sum = 126; 126 ÷ 12 = 10.5 °C.",
    workedSolution: "1. 5 + 5 + 7 + 9 + 12 + 15 + 17 + 17 + 14 + 11 + 8 + 6 = 126.\n2. 126 ÷ 12 = 10.5 °C.",
    hints: ["Add all twelve temperatures.", "Divide by 12."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The savanna climate has its rainy season in {{blank:a}}, while the Mediterranean climate has its rainy season in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["summer"], choices: ["summer", "winter", "spring"] },
      { id: "b", accepted: ["winter"], choices: ["summer", "winter", "spring"] },
    ],
    explanation: "Savanna: wet **summer**. Mediterranean: wet **winter**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each climate type with a region where it is found.",
    pairs: [
      ["Equatorial", "Congo basin"],
      ["Hot desert", "Namib"],
      ["Mediterranean", "South-western Cape"],
      ["Warm temperate east coast", "KwaZulu-Natal coast"],
    ],
    explanation: "Africa's climates form belts north and south of the equatorial Congo basin.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "As latitude increases, the annual range of temperature generally increases.",
    answer: true,
    explanation: "True. Near the equator the sun is high all year; towards the poles the seasons differ much more.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a tundra climate, the warmest month has a mean temperature above 20 °C.",
    answer: false,
    explanation: "False. In tundra the warmest month is below about 10 °C.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the cold ocean current off the coast of Namibia that helps to create the Namib Desert.",
    accepted: ["Benguela", "Benguela Current", "the Benguela Current", "Benguela current"],
    wrong: ["Agulhas"],
    explanation: "The cold **Benguela Current** cools the air from below so it cannot rise and give rain.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the characteristics of the equatorial climate.",
    points: [
      "Hot all year, with mean monthly temperatures of about 26-28 °C.",
      "Very small annual range (under about 3 °C).",
      "Heavy rain in every month (often over 2,000 mm a year), mostly from afternoon convectional storms.",
    ],
    modelAnswer: "The equatorial climate is hot all year, with monthly means of about 26-28 °C and an annual range of less than 3 °C. Rainfall is heavy, often over 2,000 mm, and falls in every month, usually in afternoon convectional thunderstorms.",
    explanation: "Credit temperature level, small range and year-round heavy rain, with figures.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Mediterranean climate has dry summers and wet winters.",
    points: [
      "In summer the subtropical high-pressure belt moves towards the pole over these regions.",
      "Sinking air in high pressure prevents cloud and rain, giving dry summers.",
      "In winter the pressure belts move towards the equator and the westerlies reach these coasts.",
      "Depressions (fronts) bring frontal rain in winter.",
    ],
    modelAnswer: "The pressure belts follow the overhead sun. In summer the subtropical high moves over Mediterranean regions, so the air sinks and summers are hot and dry. In winter the belts move towards the equator and the westerly winds, with their depressions and fronts, reach these coasts, bringing frontal rain.",
    explanation: "Two marks for summer (high pressure, sinking air), two for winter (westerlies, depressions).",
    hints: ["Which way do the pressure belts move in each season?", "Which type of rainfall do depressions bring?"],
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 7,
    stem: "Compare the equatorial and tropical continental (savanna) climates and explain the differences.",
    points: [
      ["Temperature: equatorial hot all year, range under about 3 °C; savanna has a cooler dry season, range about 5-10 °C.", 1],
      ["Rainfall amount: equatorial often over 2,000 mm; savanna about 500-1,500 mm.", 1],
      ["Seasonality: equatorial rain every month; savanna wet summer and dry winter.", 1],
      ["Explanation: equatorial sun high all year / always near the ITCZ, so rising air and convectional rain daily.", 1],
      ["Explanation: savanna is reached by the ITCZ only in summer, bringing the rainy season.", 1],
      ["Explanation: in winter subtropical high pressure gives sinking dry air in savanna regions.", 1],
      ["Located examples: Congo basin (equatorial); Zimbabwe or Zambia (savanna).", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "The equatorial climate, found in the Congo basin, is hot all year at about 26-28 °C with a range of under 3 °C. The savanna climate, found over most of Zimbabwe and Zambia, is also hot but has a cooler dry season, so its range is larger, about 5-10 °C. Equatorial rainfall is heavier, often over 2,000 mm, and falls in every month, whereas savanna receives about 500-1,500 mm, almost all in summer, with a long dry winter.\n\nNear the equator the midday sun is high all year and the ITCZ is never far away, so strong heating gives rising air and convectional storms nearly every afternoon. Savanna regions lie further from the equator: the ITCZ moves over them only in summer, bringing the rains, while in winter subtropical high pressure brings sinking, dry air and a lower sun gives cooler temperatures.",
    explanation: "A full answer compares temperature, amount and season of rainfall with figures and explains them through the sun and the ITCZ.",
    hints: ["Compare temperature, rainfall total and rainfall timing.", "Where is the ITCZ in each region through the year?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows climate data for a fictional station.\n\n${TD}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "In which hemisphere is the station?", options: [
        ["Southern", "Correct: hottest in December-February, coolest in June-July."],
        ["Northern", "Northern stations are hottest around June-August."],
        ["On the equator", "Equatorial stations have a very small range and heavy rain."],
        ["Cannot be told", "The timing of the warm season shows the hemisphere."],
      ], answer: "A", explanation: "The warm season is December-February." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the climate type shown.", accepted: ["hot desert", "tropical desert", "desert", "hot desert climate", "tropical desert climate", "arid", "tropical hot desert"], wrong: ["savanna"], explanation: "56 mm a year with hot summers: hot (tropical) desert." }),
      P.num({ label: "(c)", marks: 1, stem: "How many months have no rain at all?", value: 3, wrong: [5], explanation: "June, July and August: 3 months." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why this kind of place receives so little rain.", points: [
        "Subtropical high pressure: air sinks, warms and cannot form cloud.",
        "A cold ocean current offshore (on west coasts) cools the air from below, making it stable.",
        "Winds blow from the dry interior (offshore) / far from moisture sources.",
      ], explanation: "Credit high pressure, cold currents and dry winds." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest why such places have a very large range between day and night temperatures.", points: [
        "Clear, cloudless skies let the ground heat strongly by day.",
        "With no cloud or moisture to trap heat, it escapes quickly at night.",
      ], explanation: "Cloud and water vapour act as a blanket; deserts lack both." }),
    ],
    hints: ["Find the hottest and coolest months.", "Think about pressure, ocean currents and cloud cover."],
    explanation: "Practice in identifying and explaining a desert climate.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A Form 3 project (fictional) compares two African cities. City A, on a west coast at about 34° S, has a mean January temperature of 22 °C and July 12 °C; 75 % of its 520 mm of rain falls from May to August. City B, on an east coast at about 30° S, has January 25 °C and July 17 °C; 65 % of its 1,000 mm falls from November to March.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the amount of rain (mm) that falls in City A from May to August.", value: 390, unit: "mm", wrong: [520, 75], explanation: "75 % of 520 = 0.75 × 520 = 390 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "How many degrees larger is City A's January-July range than City B's?", value: 2, unit: "°C", wrong: [10, 8], explanation: "A: 22 − 12 = 10 °C. B: 25 − 17 = 8 °C. Difference 2 °C." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which climate does City B have?", options: [
        ["Warm temperate east coast", "Correct: rain all year with a summer maximum on an east coast."],
        ["Mediterranean (warm temperate west coast)", "City B's rain falls mainly in summer, not winter."],
        ["Tropical hot desert (arid)", "1,000 mm is far too wet for a desert."],
        ["Equatorial (tropical rainforest)", "At 30° S with a cool July it is not equatorial."],
      ], answer: "A", explanation: "City B is like Durban on the KwaZulu-Natal coast." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why City B is wetter than City A.", points: [
        "Onshore winds bring moist air from the warm Indian Ocean to the east coast.",
        "A warm current offshore (Agulhas) warms and moistens the air, so it rises easily; City A is affected by a cold current and summer high pressure.",
      ], explanation: "Credit onshore winds and the warm current." }),
    ],
    hints: ["Percentage of a total = percentage ÷ 100 × total.", "Compare the ocean currents on the two coasts."],
    explanation: "Practice in comparing two subtropical climates.",
  });
  b.card("CONCEPT", "Basis of climate classification", "Temperature (level and range) and rainfall (amount and season); vegetation reflects climate.");
  b.card("FACT", "Equatorial climate", "Hot all year (26-28 °C), range under 3 °C, heavy rain every month. Congo basin, Amazon.");
  b.card("FACT", "Savanna (tropical continental)", "Hot; wet summer, dry winter; about 500-1,500 mm. Most of Zimbabwe.");
  b.card("FACT", "Hot desert", "Under about 250 mm; large daily range; 15-30° N and S, often west coasts. Sahara, Namib.");
  b.card("FACT", "Mediterranean", "Hot dry summers, mild wet winters; 30-40° west coasts. South-western Cape, North Africa coast.");
  b.card("FACT", "Warm temperate east coast", "Rain all year with a summer maximum; hot, humid summers. KwaZulu-Natal coast.");
  b.card("FACT", "Tropical monsoon", "Very heavy summer monsoon rain, dry winter; hottest before the rains. India, Bangladesh.");
  b.card("FACT", "Cool temperate and polar", "Western margin: mild, rain all year (Britain). Continental: huge range. Polar: warmest month below 10 °C.");
  b.card("DEFINITION", "Continentality", "Inland places have hotter summers, colder winters and a larger range than coasts at the same latitude.");
});
