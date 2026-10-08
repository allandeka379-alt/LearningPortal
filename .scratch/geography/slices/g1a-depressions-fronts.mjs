// Slice G1a: temperate depressions, fronts and anticyclones.
import { concept, P, geographyLevels } from "../lib.mjs";

const OBS = "| Time | Pressure (hPa) | Temperature (°C) | Cloud | Weather |\n|---|---|---|---|---|\n| 06:00 | 1,018 | 9 | Cirrus | Dry |\n| 10:00 | 1,011 | 10 | Altostratus | Dry |\n| 14:00 | 1,003 | 11 | Nimbostratus | Steady rain |\n| 18:00 | 999 | 15 | Stratus | Drizzle |\n| 22:00 | 1,000 | 15 | Stratus | Drizzle |\n| 02:00 | 1,006 | 8 | Cumulonimbus | Heavy showers |\n| 06:00 | 1,013 | 7 | Cumulus | Bright, odd shower |";

concept("geo.weather.depressions-fronts", { file: "weather/depressions-fronts", keyPrefix: "weather.depressions-fronts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **front**?",
    options: [
      ["The boundary between two air masses", "Correct: for example between warm tropical and cold polar air."],
      ["The centre of an area of low pressure", "The centre of a low is not a front."],
      ["A line joining places of equal pressure", "That is an isobar."],
      ["The leading edge of a sea breeze", "A sea-breeze front is local; in this topic a front separates air masses."],
    ],
    answer: "A",
    explanation: "A **front** is the boundary between two air masses of different temperature and humidity.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Along which boundary do temperate depressions form?",
    options: [
      ["The polar front", "Correct: where cold polar air meets warm tropical air in the mid-latitudes."],
      ["The ITCZ", "The ITCZ is near the equator, where trade winds converge."],
      ["The Tropic of Capricorn", "This is a line of latitude, not a meeting of air masses."],
      ["The equatorial trough", "This is another name for the low-pressure belt near the equator."],
    ],
    answer: "A",
    explanation: "Depressions form on the **polar front**, at about 40-60° of latitude.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which weather is typical as a **cold front** passes?",
    options: [
      ["Short, heavy showers and a sudden fall in temperature", "Correct: cold air undercuts warm air steeply, forming cumulonimbus."],
      ["Long periods of light drizzle and mild air", "This describes the warm sector."],
      ["Thin, high cirrus cloud and dry weather", "Cirrus usually appears far ahead of the warm front."],
      ["Calm, clear skies and frost", "This describes an anticyclone in winter."],
    ],
    answer: "A",
    explanation: "At a **cold front** air is lifted steeply: cumulonimbus, heavy short showers, gusty winds and a drop in temperature.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **warm sector** of a depression?",
    options: [
      ["The wedge of warm air between the warm front and the cold front", "Correct: it is mild and humid with low cloud."],
      ["The area of cold air behind the cold front", "Behind the cold front lies cold polar air."],
      ["The zone of high cirrus cloud ahead of the warm front", "This is the leading edge of the cloud, still in cold air."],
      ["The centre of the depression where pressure is highest", "Pressure is lowest at the centre of a depression."],
    ],
    answer: "A",
    explanation: "The **warm sector** is the tongue of warm tropical air between the two fronts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which weather is typical of an **anticyclone** in winter?",
    options: [
      ["Clear skies, cold nights, frost or fog", "Correct: sinking air prevents cloud and heat escapes at night."],
      ["Strong winds and heavy rain", "These belong to depressions."],
      ["Daily afternoon thunderstorms", "Thunderstorms need rising air, not sinking air."],
      ["Steady drizzle from low stratus", "Drizzle is typical of a warm sector."],
    ],
    answer: "A",
    explanation: "In an **anticyclone** the air sinks; in winter clear skies let heat escape, giving frost and fog.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does an **occlusion** form?",
    options: [
      ["The cold front moves faster and catches up the warm front", "Correct: the warm air is lifted off the ground."],
      ["The warm front speeds up and overtakes the cold front", "Warm fronts move more slowly than cold fronts."],
      ["The depression moves over a warm ocean", "Warm water feeds tropical cyclones, not occlusions."],
      ["High pressure builds in the warm sector", "Occlusion results from the movement of the fronts."],
    ],
    answer: "A",
    explanation: "The faster **cold front** overtakes the warm front, lifting the warm sector off the ground: an occluded front.",
    hints: ["Which front moves faster?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does Cape Town receive most of its rain in **winter**?",
    options: [
      ["Winter depressions from the westerlies reach the Cape", "Correct: winter fronts bring Cape Town's rainy season."],
      ["The ITCZ moves south over the Cape in winter", "The ITCZ never reaches the Cape, and moves north in July."],
      ["Convection is at its strongest in the cool winter months", "Convection is strongest in summer heat."],
      ["Cold ocean currents bring moist onshore air in winter", "Cold currents make air stable and dry."],
    ],
    answer: "A",
    explanation: "In winter the subtropical high moves towards the equator and **depressions** from the westerlies bring frontal rain to the Cape.",
    hints: ["Which way do the pressure belts move in winter?", "What do depressions bring?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A cold front is 360 km west of a town and moving east at 40 km/h. How many hours will it take to reach the town?",
    value: 9, unit: "h",
    wrong: [14400, 400],
    explanation: "Time = distance ÷ speed = 360 ÷ 40 = 9 hours.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `The table shows observations at a fictional coastal station as a depression passed.\n\n${OBS}\n\nCalculate the average rate of fall in pressure between 06:00 and 18:00 on the first day, in hPa per hour (give the number only)`,
    value: 1.58, tol: 0.02, answer: "1.58",
    wrong: [19, 0.79],
    explanation: "1,018 − 999 = 19 hPa in 12 hours; 19 ÷ 12 = 1.58 hPa per hour.",
    workedSolution: "1. Fall = 1,018 − 999 = 19 hPa.\n2. Time = 18:00 − 06:00 = 12 hours.\n3. Rate = 19 ÷ 12 = 1.583… ≈ 1.58 hPa per hour.",
    hints: ["Find the change in pressure and the time taken.", "Rate = change ÷ time."],
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows observations at a fictional coastal station as a depression passed.\n\n${OBS}\n\nBy how many degrees did the temperature fall between 22:00 and 02:00?`,
    value: 7, unit: "°C",
    wrong: [8, 15],
    explanation: "15 − 8 = 7 °C: the cold front passed.",
    hints: ["Read the two temperatures and subtract."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Around a depression in the southern hemisphere the air circulates {{blank:a}}; around an anticyclone it circulates {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["clockwise"], choices: ["clockwise", "anticlockwise"] },
      { id: "b", accepted: ["anticlockwise"], choices: ["clockwise", "anticlockwise"] },
    ],
    explanation: "Southern hemisphere: lows **clockwise**, highs **anticlockwise** (the reverse of the northern hemisphere).",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Put each description with the part of a depression it describes.",
    pairs: [
      ["Thin, high cirrus; pressure starting to fall", "Far ahead of the warm front"],
      ["Nimbostratus and steady, prolonged rain", "Just ahead of the warm front"],
      ["Mild, humid air with stratus and drizzle", "Warm sector"],
      ["Cumulonimbus, heavy rain, temperature drop", "Cold front"],
    ],
    explanation: "The sequence moves from high cloud to steady rain, then drizzle in the warm sector, then heavy showers at the cold front.",
    hints: ["Start with the highest, thinnest cloud.", "Where does the temperature fall suddenly?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A warm front slopes more gently than a cold front.",
    answer: true,
    explanation: "True. The gentle slope gives a wide belt of layered cloud and steady rain ahead of the warm front.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Temperate depressions generally move from east to west.",
    answer: false,
    explanation: "False. They are carried by the westerlies, generally from **west to east**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of front formed when a cold front catches up with a warm front.",
    accepted: ["occluded front", "occlusion", "an occluded front", "occluded"],
    wrong: ["stationary front"],
    explanation: "An **occluded front** (occlusion).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the stages in the formation of a temperate depression.",
    points: [
      "Warm tropical air and cold polar air meet along the polar front.",
      "A wave or kink forms; warm air pushes into and rises over the cold air, and pressure falls.",
      "A warm sector develops between a warm front and a cold front (mature stage).",
      "The faster cold front catches the warm front (occlusion) and the depression fills and dies.",
    ],
    modelAnswer: "Along the polar front, warm tropical air and cold polar air flow side by side. A wave forms where warm air pushes into the cold air and rises, so pressure falls. The wave grows into a warm sector bounded by a warm front ahead and a cold front behind. The cold front moves faster and catches the warm front, lifting the warm air off the ground (occlusion), and the depression slowly fills.",
    explanation: "One mark per stage in order.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: `The table shows observations at a fictional coastal station as a depression passed.\n\n${OBS}\n\nUse the table to identify when the warm front and the cold front passed, giving evidence.`,
    points: [
      "Warm front passed between 14:00 and 18:00.",
      "Evidence: temperature rose (11 to 15 °C), steady rain changed to drizzle under stratus, pressure stopped falling.",
      "Cold front passed between 22:00 and 02:00.",
      "Evidence: temperature fell sharply (15 to 8 °C), cumulonimbus and heavy showers, pressure started rising.",
    ],
    modelAnswer: "The warm front passed between 14:00 and 18:00: the temperature rose from 11 to 15 °C, the steady rain from nimbostratus gave way to drizzle from stratus, and the pressure fall levelled off near 999 hPa. The cold front passed between 22:00 and 02:00: the temperature dropped from 15 to 8 °C, cumulonimbus brought heavy showers and pressure began to rise.",
    explanation: "Each front needs a time and at least one piece of evidence from the table.",
    hints: ["Look for a rise in temperature, then a fall.", "Where does the pressure stop falling and start rising?"],
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Compare the weather associated with depressions and anticyclones, and explain the differences.",
    points: [
      ["Depression: low pressure, converging and rising air.", 1],
      ["Depression weather: cloud, rain at fronts, strong winds, changeable.", 1],
      ["Anticyclone: high pressure, sinking and diverging air.", 1],
      ["Anticyclone weather: clear, dry, light winds; hot by day in summer, frost and fog on winter nights.", 1],
      ["Explanation: rising air cools and condenses; sinking air warms and prevents cloud.", 1],
      ["Explanation of wind: close isobars (steep pressure gradient) in depressions, widely spaced in anticyclones; example such as Zimbabwe's winter high or Cape Town's winter depressions.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "A depression is an area of low pressure where air converges and rises. Rising air cools and condenses, so depressions bring thick cloud and rain along their fronts, and because the isobars are close together the winds are strong. The weather changes quickly as the fronts pass, as in Cape Town's winter rainy season.\n\nAn anticyclone is an area of high pressure where air sinks and spreads out. Sinking air warms, so cloud cannot form and the weather is dry and settled. Isobars are widely spaced, so winds are light. In summer days are hot and sunny; in winter clear skies let heat escape, giving cold nights with frost and fog, as on Zimbabwe's highveld in July under the southern African high.",
    explanation: "Compare pressure, air movement, cloud, rain and wind, explain each, and use an example.",
    hints: ["What does air do in each system: rise or sink?", "How are the isobars spaced?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows observations at a fictional coastal station in the southern hemisphere as a depression passed.\n\n${OBS}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What was the lowest pressure recorded?", value: 999, unit: "hPa", wrong: [1000], explanation: "999 hPa at 18:00." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the rise in pressure between 22:00 and 06:00 the next morning.", value: 13, unit: "hPa", wrong: [7], explanation: "1,013 − 1,000 = 13 hPa." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the cloud type at 14:00.", accepted: ["nimbostratus", "nimbo-stratus", "nimbo stratus", "Ns"], wrong: ["cirrus"], explanation: "Nimbostratus, giving steady rain." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the cloud changed from 06:00 to 14:00 and explain the change.", points: [
        "Cloud thickened and lowered from cirrus to altostratus to nimbostratus.",
        "The warm front was approaching; warm air rises gently over the cold air ahead of it.",
        "Near the front the warm air is lower, so cloud base is lower and thicker, giving rain.",
      ], explanation: "Credit the sequence and its link to the gently sloping warm front." }),
    ],
    hints: ["Read the pressure column carefully.", "Which front gives a sequence of thickening layered cloud?"],
    explanation: "Practice in interpreting observations of a passing depression.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A description of a weather map (fictional). A low of 984 hPa lies south of South Africa. A warm front runs north-east from the low; a cold front runs north-west then north. Isobars are close together near the low. Over Zimbabwe a high of 1,028 hPa has widely spaced isobars.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the difference in pressure between the high and the low.", value: 44, unit: "hPa", wrong: [2012], explanation: "1,028 − 984 = 44 hPa." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What weather would Zimbabwe most likely have?", options: [
        ["Clear, dry, light winds and cold nights", "Correct: high pressure with widely spaced isobars."],
        ["Heavy frontal rain and strong winds", "The fronts and low lie far to the south."],
        ["Daily afternoon thunderstorms", "Storms need rising air; this is a high."],
        ["Mild drizzle from stratus", "Drizzle is typical of a warm sector, not a high."],
      ], answer: "A", explanation: "A large high: sinking air, settled weather." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why winds are strong near the low.", points: [
        "Isobars are close together, showing a steep pressure gradient.",
        "Air moves quickly from high to low pressure down a steep gradient.",
      ], explanation: "Close isobars = strong winds." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how the weather in southern Zimbabwe might change if the cold front moved north over South Africa.", points: [
        "Colder air (a cold snap) with a drop in temperature and strong southerly winds.",
        "More cloud and possibly light rain or drizzle.",
      ], explanation: "Winter cold fronts can push cold air and cloud northwards." }),
    ],
    hints: ["Subtract the lower pressure from the higher.", "What do close isobars mean?"],
    explanation: "Practice in reading a synoptic description with a depression and an anticyclone.",
  });
  b.card("DEFINITION", "Temperate depression", "A mid-latitude low-pressure system where warm and cold air masses meet, bringing cloud, wind and rain.");
  b.card("CONCEPT", "Stages of a depression", "Polar front → wave → mature (warm sector between warm and cold fronts) → occlusion → decay.");
  b.card("CONCEPT", "Warm front weather", "Gentle slope: cirrus → altostratus → nimbostratus; long steady rain; pressure falling; temperature rises after it passes.");
  b.card("CONCEPT", "Cold front weather", "Steep slope: cumulonimbus, short heavy rain, gusts, sudden temperature fall; pressure rises after it passes.");
  b.card("CONCEPT", "Warm sector", "Mild, humid air with low stratus and drizzle; pressure steady.");
  b.card("DEFINITION", "Occlusion", "The faster cold front catches the warm front and lifts the warm air off the ground.");
  b.card("DEFINITION", "Anticyclone", "High pressure, sinking air, light winds; settled weather; frost and fog on winter nights.");
  b.card("FACT", "Where depressions bring rain", "North-west Europe all year; Mediterranean lands, south-western Cape and south-west Australia in winter.");
  b.card("FACT", "Southern hemisphere circulation", "Lows: clockwise inward. Highs: anticlockwise outward. Depressions move west to east.");
});
