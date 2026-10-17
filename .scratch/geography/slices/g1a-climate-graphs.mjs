// Slice G1a: climate data and climate graphs.
import { concept, P, geographyLevels } from "../lib.mjs";

const TQ = "| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Temperature (°C) | 26 | 25 | 24 | 22 | 19 | 16 | 16 | 19 | 23 | 27 | 27 | 26 |\n| Rainfall (mm) | 205 | 165 | 110 | 35 | 8 | 1 | 0 | 0 | 4 | 28 | 90 | 185 |";
const TN = "| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Temperature (°C) | 10 | 11 | 13 | 16 | 20 | 24 | 27 | 27 | 24 | 19 | 14 | 11 |\n| Rainfall (mm) | 90 | 80 | 60 | 40 | 20 | 5 | 1 | 3 | 20 | 60 | 90 | 100 |";
const TE = "| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Temperature (°C) | 27 | 27 | 27.5 | 27.5 | 27 | 26.5 | 26 | 26 | 26.5 | 27 | 27 | 27 |\n| Rainfall (mm) | 250 | 240 | 290 | 280 | 200 | 120 | 110 | 130 | 180 | 220 | 260 | 270 |";

concept("geo.weather.climate-graphs", { file: "weather/climate-graphs", keyPrefix: "weather.climate-graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a climate graph, how is **rainfall** usually shown?",
    options: [
      ["As bars for each month", "Correct: rainfall totals for each month are shown as bars."],
      ["As a smooth line joining points", "A line is used for temperature, which changes continuously."],
      ["As a pie chart beside the graph", "Pie charts are not part of a climate graph."],
      ["As dots with no line joining them", "Rainfall is a monthly total, drawn as bars rising from the axis."],
    ],
    answer: "A",
    explanation: "A climate graph shows **rainfall as bars** and **temperature as a line**, with a separate vertical axis for each.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is the **annual temperature range** calculated?",
    options: [
      ["Hottest month's mean minus coolest month's mean", "Correct: the range is the difference between the highest and lowest monthly means."],
      ["Sum of all monthly means divided by 12", "This gives the mean annual temperature, not the range."],
      ["Hottest month's mean plus coolest month's mean", "Adding them gives a meaningless total; the range is a difference."],
      ["Daily maximum minus daily minimum", "That is the daily (diurnal) range, not the annual range."],
    ],
    answer: "A",
    explanation: "Annual range = mean temperature of the hottest month − mean temperature of the coolest month.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows climate data for a fictional station in southern Africa.\n\n${TQ}\n\nCalculate the **annual temperature range**.`,
    value: 11, unit: "°C",
    wrong: [43, 27],
    explanation: "Hottest months: October and November, 27 °C. Coolest months: June and July, 16 °C. Range = 27 − 16 = 11 °C.",
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station in southern Africa.\n\n${TQ}\n\nCalculate the **total annual rainfall**.`,
    value: 831, unit: "mm",
    wrong: [69.25, 755],
    explanation: "Total = 205 + 165 + 110 + 35 + 8 + 1 + 0 + 0 + 4 + 28 + 90 + 185 = 831 mm.",
    workedSolution: "1. Wet months: 205 + 165 + 110 + 90 + 185 = 755 mm.\n2. Other months: 35 + 8 + 1 + 0 + 0 + 4 + 28 = 76 mm.\n3. Total = 755 + 76 = 831 mm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station in southern Africa.\n\n${TQ}\n\nCalculate the **mean annual temperature**.`,
    value: 22.5, unit: "°C", tol: 0.05,
    wrong: [21.5, 270],
    explanation: "Sum of the monthly means = 270; 270 ÷ 12 = 22.5 °C.",
    workedSolution: "1. Add the twelve monthly temperatures: 26 + 25 + 24 + 22 + 19 + 16 + 16 + 19 + 23 + 27 + 27 + 26 = 270.\n2. Divide by 12: 270 ÷ 12 = 22.5 °C.",
    hints: ["Add all twelve temperatures first.", "Divide the sum by the number of months."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows climate data for a fictional station in southern Africa.\n\n${TQ}\n\nWhat **percentage** of the annual rainfall falls in the five months November to March? Give your answer to the nearest whole number.`,
    value: 91, unit: "%", tol: 0.5,
    wrong: [42, 755],
    explanation: "November to March: 90 + 185 + 205 + 165 + 110 = 755 mm. Total = 831 mm. 755 ÷ 831 × 100 = 90.85…, about 91 %.",
    workedSolution: "1. Rain from November to March = 90 + 185 + 205 + 165 + 110 = 755 mm.\n2. Total annual rainfall = 831 mm.\n3. Percentage = 755 ÷ 831 × 100 = 90.85 %.\n4. To the nearest whole number: 91 %.",
    hints: ["Find the wet-season total and the annual total.", "Percentage = part ÷ whole × 100."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A class recorded these mean daily temperatures (°C) for one week at their school (fictional data): 22, 24, 25, 21, 20, 23, 26. Calculate the **mean temperature** for the week.",
    value: 23, unit: "°C", tol: 0.05,
    wrong: [161, 6],
    explanation: "Sum = 22 + 24 + 25 + 21 + 20 + 23 + 26 = 161. Mean = 161 ÷ 7 = 23 °C.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Study the climate data for a fictional station.\n\n${TN}\n\nIn which hemisphere is this station?`,
    options: [
      ["Northern, because the hottest months are July and August", "Correct: the warmest season falls in June to August, the northern summer."],
      ["Southern, because the hottest months are July and August", "In the southern hemisphere July and August are winter months, the coolest."],
      ["Northern, because most rain falls in the summer", "Most rain here falls in the cool months (November to February), not in summer."],
      ["Southern, because the coolest month is January", "January is midsummer in the southern hemisphere, so a cool January points north."],
    ],
    answer: "A",
    explanation: "The hottest months (July and August, 27 °C) and coolest (January, 10 °C) show the summer is in June to August, so the station is in the **northern hemisphere**. Its rain falls mainly in winter.",
    hints: ["Find the hottest months first.", "When is summer in each hemisphere?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Study the climate data for a fictional station.\n\n${TE}\n\nWhich climate type does it show?`,
    options: [
      ["Equatorial: hot all year, tiny range, heavy rain every month", "Correct: a range of only 1.5 °C and over 100 mm every month fit an equatorial climate."],
      ["Tropical continental: a hot wet season and a long dry season", "There is no dry season here: every month has at least 110 mm."],
      ["Mediterranean: hot dry summers and mild wet winters", "There is no dry summer and no cool season here."],
      ["Hot desert: very low rainfall and a large daily range", "The total rainfall is about 2,550 mm, far too much for a desert."],
    ],
    answer: "A",
    explanation: "Temperatures stay between 26 and 27.5 °C (range 1.5 °C) and every month is wet (total 2,550 mm): an **equatorial** climate close to the equator.",
    hints: ["Work out the annual range.", "Is there any dry month?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A climate graph for a station in the tropics shows a hottest-month mean of only 21 °C. What is the **most likely** reason?",
    options: [
      ["The station is at a high altitude", "Correct: temperature falls with height, so high ground in the tropics stays moderate."],
      ["The station is right on the equator", "Places on the equator at low altitude are hot all year, usually about 26-28 °C."],
      ["The station is in a hot desert", "Hot deserts have very high summer temperatures."],
      ["The station receives heavy rain all year", "Rain alone does not keep the hottest month this cool; altitude does."],
    ],
    answer: "A",
    explanation: "In the tropics, low-lying places are hot. A cool hottest month suggests **altitude**: temperature falls by roughly 6.5 °C for every 1,000 m of height (an approximate average).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where on a climate graph should the temperature for each month be plotted?",
    options: [
      ["In the middle of that month's column", "Correct: the point represents the whole month, so it goes at the centre."],
      ["On the left-hand edge of the month's column", "Plotting at the edge places the value between two months."],
      ["At the top of the month's rainfall bar", "Temperature uses its own axis, not the height of the bar."],
      ["On the right-hand edge of the month's column", "Plotting at the edge places the value between two months."],
    ],
    answer: "A",
    explanation: "Each monthly temperature is plotted at the **middle** of the month and the points are joined with a smooth line, read against the temperature axis.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Total annual rainfall is found by {{blank:a}} the twelve monthly figures, while mean annual temperature is found by adding the monthly means and dividing by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["adding", "summing", "totalling", "totaling"], wrong: "averaging" },
      { id: "b", accepted: ["12", "twelve"], wrong: "7" },
    ],
    explanation: "Rainfall is a total (add); temperature is an average (add and divide by 12).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a station's hottest months are December, January and February, it is in the southern hemisphere.",
    answer: true,
    explanation: "True. December to February is summer in the southern hemisphere, as in Zimbabwe.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each description of a climate graph with the climate it most likely shows.",
    pairs: [
      ["Hot all year, range about 2 °C, rain in every month", "Equatorial"],
      ["Hot wet season, warm dry season, about 800 mm a year", "Tropical continental (savanna)"],
      ["Very hot summers, under 100 mm of rain a year", "Hot desert"],
      ["Hot dry summers, mild wet winters", "Mediterranean"],
    ],
    explanation: "The level of temperature, the range and the timing and amount of rain together identify the climate type.",
    hints: ["Start with the rainfall total and timing.", "Mediterranean is the only one with rain in winter."],
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: `Study the climate data for a fictional station.\n\n${TQ}\n\nName the **wettest month**.`,
    accepted: ["January", "Jan"],
    wrong: ["December", "February"],
    explanation: "January has the highest rainfall, 205 mm.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: `Describe the climate shown by these data for a fictional station.\n\n${TN}`,
    points: [
      "Temperature: hottest in July and August (27 °C), coolest in January (10 °C).",
      "Annual range of 17 °C.",
      "Total rainfall 569 mm, most falling from October to March (wettest month December, 100 mm).",
      "Summer (June to August) is almost dry (for example 1 mm in July): rain falls in the cool season.",
    ],
    modelAnswer: "Temperatures range from 10 °C in January to 27 °C in July and August, an annual range of 17 °C. The total rainfall is 569 mm. Most rain falls in the cooler months from October to March, with the wettest month December at 100 mm, while the summer is almost dry with only 1 mm in July.",
    explanation: "Each point needs data with units. This pattern (dry hot summer, wet mild winter) is Mediterranean.",
    hints: ["Give the highest and lowest temperatures with months, then the range.", "Give the total rainfall and say when it falls."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "List **three** things you must include when drawing a climate graph so that it is complete and accurate.",
    points: [
      "Two labelled vertical axes with units (rainfall in mm and temperature in °C) and suitable scales.",
      "Rainfall plotted as bars for each month and temperature as points in the middle of each month joined by a smooth line.",
      "A title naming the station (with months labelled along the horizontal axis).",
    ],
    modelAnswer: "Two vertical axes, one for rainfall in mm and one for temperature in °C, with labelled scales; rainfall as bars and temperature as a line plotted at the middle of each month; and a title giving the station name, with the months along the bottom.",
    explanation: "Any three of: labelled axes with units, sensible scales, bars for rainfall, line for temperature (mid-month), month labels, title, key.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: `Compare the climates of the two fictional stations below and suggest reasons for the differences.\n\nStation P:\n\n${TQ}\n\nStation Q:\n\n${TE}`,
    points: [
      ["Temperature comparison with data: P ranges 16-27 °C (range 11 °C), Q is 26-27.5 °C (range 1.5 °C).", 1],
      ["Rainfall comparison with data: P has 831 mm with a long dry season (May-September), Q has 2,550 mm with every month over 100 mm.", 1],
      ["Reason for Q's high, even temperatures: near the equator, the sun is high overhead all year.", 1],
      ["Reason for P's cooler dry season: further from the equator, lower sun angle in winter (and possibly altitude).", 1],
      ["Reason for Q's rain all year: rising air and convection (low pressure/ITCZ) all year.", 1],
      ["Reason for P's dry season: high pressure and sinking air in winter when the ITCZ has moved away.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Station Q is hot all year, between 26 and 27.5 °C, a range of only 1.5 °C, while Station P varies from 16 °C in June and July to 27 °C in October and November, a range of 11 °C. Q is very wet, with about 2,550 mm and at least 110 mm in every month, but P has 831 mm, almost all from November to March, and is dry from May to September.\n\nQ is probably close to the equator, where the midday sun is high all year, so temperatures hardly change, and strong heating causes rising air and convectional rain every month. P is further from the equator: in winter the sun is lower in the sky, so it is cooler, and high pressure with sinking air brings a dry season. In summer the rain belt (ITCZ) moves south over P and brings its rainy season.",
    explanation: "Comparisons need data from both stations; reasons need latitude, sun angle and pressure/air movement.",
    hints: ["Compare temperature and rainfall separately, using figures.", "Think about latitude, sun angle and rising or sinking air."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `The table shows climate data for a fictional station on the plateau of southern Africa.\n\n${TQ}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the coolest month(s).", accepted: ["June and July", "July and June", "June July", "Jun and Jul", "June, July"], wrong: ["July"], explanation: "June and July both have 16 °C." }),
      P.num({ label: "(b)", marks: 1, stem: "How many months have less than 10 mm of rain?", value: 5, wrong: [4], explanation: "May (8), June (1), July (0), August (0), September (4): 5 months." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean monthly rainfall. Give your answer to one decimal place.", value: 69.25, unit: "mm", tol: 0.051, answer: "69.3", wrong: [831], explanation: "831 ÷ 12 = 69.25, which is 69.3 mm to one decimal place (69.2 is also accepted for the rounding of .25)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the rain falls in the hottest months at this station.", points: [
        "Strong heating in the hot season makes air rise (convection), cool and condense to form cloud and rain.",
        "The rain belt (ITCZ / low pressure with moist air streams) moves over southern Africa in this season.",
      ], explanation: "Credit convection from heating and the seasonal shift of the rain belt." }),
    ],
    hints: ["Count carefully: 'less than 10 mm'.", "Mean monthly rainfall = total ÷ 12."],
    explanation: "Practice in reading statistics from a climate table and explaining its pattern.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "A student plotted a climate graph for a fictional station. Rainfall bars rise above 100 mm in every month from October to April and are under 20 mm from May to September. The temperature line stays between 19 °C and 24 °C. The hottest point is in October.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "In which hemisphere is the station most likely to be?", options: [
        ["Southern", "Correct: the hot, wet season runs from October to April, the southern summer."],
        ["Northern", "Northern summer is June to August, which is the dry, cooler season here."],
        ["Exactly on the equator", "Equatorial stations have rain in every month, not a five-month dry season."],
        ["It cannot be told from a climate graph", "The timing of the hot season shows the hemisphere."],
      ], answer: "A", explanation: "The hot season, with the rain, falls between October and April: southern summer." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which climate type do these data show?", options: [
        ["Tropical continental (savanna)", "Correct: a hot wet season and a cooler dry season."],
        ["Equatorial (tropical rainforest)", "Equatorial climates have no dry season."],
        ["Hot desert (tropical arid)", "A desert would not have over 100 mm in seven months."],
        ["Mediterranean (warm temperate)", "Mediterranean rain falls in winter, not in the hot season."],
      ], answer: "A", explanation: "Wet summer, dry winter and warm temperatures all year: tropical continental." }),
      P.num({ label: "(c)", marks: 1, stem: "What is the largest possible annual range, in °C, shown by the temperature line?", value: 5, unit: "°C", wrong: [43], explanation: "24 − 19 = 5 °C." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why the hottest month is October rather than January.", points: [
        "October comes before the rains, so skies are clear and the sun heats the ground strongly.",
        "From November to January cloud cover and rain (evaporation cooling) reduce temperatures.",
      ], explanation: "In southern Africa the hot dry season (September-October) is often hottest because cloud and rain later cool the wet season." }),
    ],
    hints: ["When is summer in each hemisphere?", "What does cloud do to daytime temperatures?"],
    explanation: "Practice in interpreting a described climate graph.",
  });
  b.card("DEFINITION", "Annual temperature range", "Mean temperature of the hottest month minus that of the coolest month.");
  b.card("CONCEPT", "Total annual rainfall", "Add the 12 monthly totals. Do not divide by 12 (that gives mean monthly rainfall).");
  b.card("CONCEPT", "Mean annual temperature", "Sum of the 12 monthly mean temperatures ÷ 12.");
  b.card("CONCEPT", "Climate graph layout", "Rainfall as bars, temperature as a line plotted mid-month; two labelled vertical axes; months along the bottom; title.");
  b.card("CONCEPT", "Hemisphere from a climate graph", "Hottest months Dec-Feb: southern hemisphere. Hottest months Jun-Aug: northern hemisphere.");
  b.card("CONCEPT", "Tiny annual range with high temperatures", "Suggests a place near the equator (equatorial climate).");
  b.card("CONCEPT", "Cool temperatures in the tropics", "Suggest high altitude: temperature falls with height.");
  b.card("CONCEPT", "Describing a climate graph", "Hottest and coolest months with values, range, total rainfall, wet and dry season months, wettest month: always quote data and units.");
});
