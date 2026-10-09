// Slice G1a: precipitation and the types of rainfall.
import { concept, P, geographyLevels } from "../lib.mjs";

const RS = "| Station (fictional) | Height (m) | Side of the range | Mean annual rainfall (mm) |\n|---|---|---|---|\n| K | 300 | Coast, windward | 1,100 |\n| L | 1,600 | Windward slope | 1,450 |\n| M | 2,100 | Summit | 1,300 |\n| N | 900 | Leeward slope | 520 |\n| O | 400 | Leeward lowland | 380 |";

concept("geo.weather.precipitation", { file: "weather/precipitation", keyPrefix: "weather.precipitation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of precipitation consists of **lumps of ice** built up in layers inside a cumulonimbus cloud?",
    options: [
      ["Hail", "Correct: strong up-currents carry drops up and down, adding layers of ice."],
      ["Drizzle", "Drizzle is tiny liquid drops from low layer cloud."],
      ["Dew", "Dew is liquid water that condenses on cold surfaces at night."],
      ["Sleet", "Sleet is partly melted snow or a rain-snow mixture, not layered ice."],
    ],
    answer: "A",
    explanation: "**Hail** forms when up-currents in tall cumulonimbus clouds carry drops above the freezing level again and again, so layers of ice build up until the stones fall.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **dew point**?",
    options: [
      ["The temperature at which air becomes saturated", "Correct: cooling below it makes vapour condense."],
      ["The height at which rain starts to fall", "Rain can fall from cloud at many heights; the dew point is a temperature."],
      ["The amount of dew collected in a night", "Dew point is a temperature, not an amount of water."],
      ["The lowest temperature reached in a day", "That is the daily minimum, which may or may not reach the dew point."],
    ],
    answer: "A",
    explanation: "The **dew point** is the temperature at which air is saturated. Cool it further and water vapour condenses into droplets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does rising air cool?",
    options: [
      ["It expands as air pressure falls with height", "Correct: expansion spreads the same energy through a larger volume (adiabatic cooling)."],
      ["It loses heat to the cold cloud around it", "Cooling happens before cloud forms; it is caused by expansion."],
      ["It moves further away from the sun", "A few kilometres makes no difference to the distance from the sun."],
      ["Water vapour inside it absorbs the heat", "Condensation actually releases heat; it does not cause cooling."],
    ],
    answer: "A",
    explanation: "Air pressure falls with height, so a rising parcel **expands** and cools. This is **adiabatic cooling**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of rainfall brings most of Zimbabwe's afternoon thunderstorms in the hot wet season?",
    options: [
      ["Convectional", "Correct: strong heating makes moist air rise and form cumulonimbus by the afternoon."],
      ["Frontal", "Fronts are uncommon over Zimbabwe; they mainly affect the mid-latitudes."],
      ["Relief", "Relief rain falls where wind meets high ground, not in afternoon storms everywhere."],
      ["Cyclonic only", "Tropical cyclones reach Zimbabwe rarely; most summer storms are from local heating."],
    ],
    answer: "A",
    explanation: "Summer storms over most of Zimbabwe are **convectional**: the morning sun heats the ground, air rises, and storms break in the afternoon.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On which side of a mountain range does a **rain shadow** form?",
    options: [
      ["The leeward side, where air sinks and warms", "Correct: sinking air is compressed and warms, so cloud evaporates."],
      ["The windward side, where air rises and cools", "Rising air on the windward side brings the heaviest rain."],
      ["The summit, where the air is coldest", "Summits are usually wet; the shadow lies beyond them."],
      ["The side nearest the sea, where air is moist", "Moist air from the sea brings rain to the windward side."],
    ],
    answer: "A",
    explanation: "Air loses much of its moisture on the windward side, then sinks down the **leeward** side, warms and dries: a rain shadow.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is rain at a **warm front** usually steadier and longer-lasting than at a cold front?",
    options: [
      ["Warm air rises gently over a shallow slope of cold air", "Correct: gentle uplift spreads layered cloud over a wide area."],
      ["Warm fronts always carry more water vapour", "The amount of vapour varies; the slope of the front is the key."],
      ["Cold fronts move far too slowly to give any lasting rain", "Cold fronts often move faster than warm fronts."],
      ["Warm fronts occur only over mountains", "Fronts form where air masses meet, over any kind of ground."],
    ],
    answer: "A",
    explanation: "At a warm front the boundary slopes gently, so uplift is slow and **layered cloud** gives steady rain over a wide belt. At a cold front the slope is steep, so uplift is sudden and showers are short and heavy.",
    hints: ["Compare the slope of the two fronts.", "Gentle uplift spreads cloud over a wide area."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Frost is most likely on the Zimbabwean highveld on which kind of night?",
    options: [
      ["A clear, calm night in July", "Correct: no cloud lets heat escape, and calm air lets cold air settle near the ground."],
      ["A cloudy, windy night in January", "Cloud traps heat and January is the hot season, so frost is very unlikely."],
      ["A rainy night in December", "Rain and cloud keep summer nights mild."],
      ["A cloudy, calm night in March", "Cloud cover acts like a blanket and keeps the ground warmer."],
    ],
    answer: "A",
    explanation: "Frost needs the ground to cool below 0 °C: clear skies let heat radiate away, and still air allows cold air to collect, especially in hollows in the cool dry season.",
    hints: ["Which season is coldest?", "What does cloud do at night?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Air at the ground is 30 °C with a dew point of 22 °C. It rises and cools at 1 °C per 100 m. At what height (in metres) will cloud start to form?",
    value: 800, unit: "m",
    wrong: [2200, 8],
    explanation: "Cooling needed = 30 − 22 = 8 °C. At 1 °C per 100 m, height = 8 × 100 = 800 m.",
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "Air at 20 °C at sea level is forced over a 2,000 m mountain. It cools at 1 °C per 100 m until it reaches its dew point of 10 °C, then at 0.5 °C per 100 m up to the summit. It then sinks to sea level on the leeward side, warming at 1 °C per 100 m. What is its temperature when it reaches sea level on the leeward side?",
    value: 25, unit: "°C",
    wrong: [20, 15],
    explanation: "Dew point reached at 1,000 m (20 − 10 = 10 °C of cooling). From 1,000 to 2,000 m it cools 5 °C, to 5 °C at the summit. Sinking 2,000 m warms it by 20 °C: 5 + 20 = 25 °C.",
    workedSolution: "1. Cooling to dew point: 20 − 10 = 10 °C, which takes 10 × 100 = 1,000 m.\n2. From 1,000 m to 2,000 m at 0.5 °C per 100 m: 10 × 0.5 = 5 °C, so the summit temperature is 10 − 5 = 5 °C.\n3. Descent of 2,000 m at 1 °C per 100 m: warming of 20 °C.\n4. Leeward sea-level temperature = 5 + 20 = 25 °C.",
    hints: ["First find the height of the condensation level.", "On the way down the air is unsaturated, so it warms at the faster rate for the whole 2,000 m."],
  });
  b.calc({
    d: 3, skill: "ANALYSIS",
    stem: `The table shows rainfall at fictional stations across a mountain range.\n\n${RS}\n\nStation N's rainfall is what **percentage** of station L's? Give your answer to the nearest whole number.`,
    value: 36, unit: "%", tol: 0.5,
    wrong: [279, 930],
    explanation: "520 ÷ 1,450 × 100 = 35.86…, about 36 %.",
    workedSolution: "1. N = 520 mm, L = 1,450 mm.\n2. 520 ÷ 1,450 = 0.3586.\n3. × 100 = 35.86 %, which rounds to 36 %.",
    hints: ["Percentage = part ÷ whole × 100.", "The 'whole' is station L."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sequence of rain formation.",
    template: "Moist air rises and cools until it reaches its {{blank:a}}. Water vapour then {{blank:b}} on tiny particles called nuclei, forming cloud droplets.",
    blanks: [
      { id: "a", accepted: ["dew point", "dewpoint", "dew-point"], wrong: "boiling point" },
      { id: "b", accepted: ["condenses"], wrong: "evaporates" },
    ],
    explanation: "Cooling to **dew point** leads to **condensation** of vapour on condensation nuclei.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of precipitation with how it forms.",
    pairs: [
      ["Drizzle", "Tiny drops from low layer cloud with weak uplift"],
      ["Hail", "Ice layers added by strong up-currents in cumulonimbus"],
      ["Dew", "Vapour condenses on surfaces cooled on clear, calm nights"],
      ["Frost", "Vapour turns to ice on surfaces when the dew point is below 0 °C"],
    ],
    explanation: "Drizzle comes from stratus, hail from cumulonimbus, while dew and frost form directly on cold surfaces.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Warm air can hold more water vapour than cold air.",
    answer: true,
    explanation: "True. This is why cooling air leads to condensation, and why sinking air that warms becomes drier.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Frontal rainfall is the main source of rain over most of Zimbabwe.",
    answer: false,
    explanation: "False. Most of Zimbabwe's rain is convectional, with relief rain in the Eastern Highlands. Frontal rain is typical of the mid-latitudes.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the local name for the cool-season mist and drizzle brought to the Eastern Highlands by moist south-east winds.",
    accepted: ["guti"],
    wrong: ["harmattan"],
    explanation: "**Guti** is the misty, drizzly weather of the cool season on the eastern slopes, a form of relief precipitation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of cloud associated with thunderstorms, heavy showers and hail.",
    accepted: ["cumulonimbus", "cumulo-nimbus", "cumulo nimbus", "Cb"],
    wrong: ["stratus", "cirrus"],
    explanation: "**Cumulonimbus** is the tall storm cloud of convectional rain.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how convectional rainfall forms.",
    points: [
      "The sun strongly heats the ground, which heats the air above it.",
      "The warm, moist air rises in convection currents.",
      "It cools (adiabatically) as it rises and reaches dew point, so vapour condenses into cumulonimbus cloud.",
      "Droplets grow until heavy enough to fall as heavy afternoon showers or thunderstorms.",
    ],
    modelAnswer: "In the morning the sun heats the ground strongly and the ground heats the air above it. The warm, moist air rises in convection currents and cools as it expands. When it reaches its dew point the vapour condenses into towering cumulonimbus clouds. The droplets grow and fall as heavy afternoon showers or thunderstorms.",
    explanation: "One mark for each stage in the correct order: heating, rising, cooling/condensation, heavy rain.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: `Study the table.\n\n${RS}\n\nDescribe the pattern of rainfall across the range and explain why station O is so dry.`,
    points: [
      "Rainfall rises from the coast (1,100 mm) to a peak on the windward slope (1,450 mm at L).",
      "It falls sharply on the leeward side (520 mm at N, 380 mm at O).",
      "O is in a rain shadow: air has lost moisture on the windward side and sinks, warms and dries on the leeward side.",
    ],
    modelAnswer: "Rainfall increases from 1,100 mm on the coast to 1,450 mm on the windward slope, then decreases to 1,300 mm at the summit and drops sharply to 520 mm and 380 mm on the leeward side. Station O is in a rain shadow: the air has lost much of its moisture rising over the windward slope, and as it sinks it is compressed and warms, so clouds evaporate.",
    explanation: "Describe with data, then explain using sinking, warming, drying air.",
    hints: ["Quote the highest and lowest values.", "What happens to air as it sinks?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "With the help of an annotated diagram described in words, compare relief and frontal rainfall. Refer to places where each occurs.",
    points: [
      ["Relief: moist air (e.g. from the Indian Ocean) is forced to rise over high ground.", 1],
      ["Relief: cools on the windward slope, condenses, rain on the windward side; rain shadow on the leeward side.", 1],
      ["Relief example: Eastern Highlands of Zimbabwe (or Drakensberg).", 1],
      ["Frontal: warm air meets cold air and is forced to rise over the denser cold air.", 1],
      ["Frontal: steady rain at warm fronts, short heavy rain at cold fronts.", 1],
      ["Frontal example: mid-latitudes such as Britain or Cape Town in winter; comparison that both depend on forced uplift but the cause differs (relief vs air masses).", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Both relief and frontal rain form when air is forced to rise, cool to its dew point and condense, but the cause of uplift differs. In relief rain, moist air blown off the sea meets high ground and is forced up the windward slope. It cools, cloud forms and rain falls on the windward side, as on the Eastern Highlands of Zimbabwe, where south-east winds from the Indian Ocean bring over 1,000 mm a year. After crossing the summit the air sinks, warms and dries, leaving a rain shadow on the leeward side.\n\nIn frontal rain, warm moist air meets colder, denser air and rises over it along a front. At a warm front the slope is gentle and rain is steady and prolonged; at a cold front it is steep and showers are short and heavy. Frontal rain is typical of the mid-latitudes, for example Britain or Cape Town in winter, and is uncommon in Zimbabwe. Relief rain is fixed to the same slopes every year, whereas frontal rain moves with the weather systems.",
    explanation: "Credit annotated sequences for each type, named places and a direct comparison.",
    hints: ["What forces the air to rise in each case?", "Where does each type fall, and where is it rare?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `The table shows rainfall at fictional stations across a mountain range. The prevailing wind blows from the coast towards station O.\n\n${RS}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the station with the highest rainfall.", accepted: ["L", "Station L"], wrong: ["M"], explanation: "L, with 1,450 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in rainfall between stations L and O.", value: 1070, unit: "mm", wrong: [1830], explanation: "1,450 − 380 = 1,070 mm." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which type of rainfall mainly explains the high totals at K, L and M?", options: [
        ["Relief", "Correct: moist sea air is forced up the windward slope."],
        ["Convectional", "The pattern follows the slope and the wind, not local heating."],
        ["Frontal", "Nothing in the resource mentions air masses or fronts."],
        ["Cyclonic", "No storm system is described; the pattern is tied to the mountains."],
      ], answer: "A", explanation: "Rain increases up the windward slope: relief rainfall." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why station M (summit) has less rain than station L.", points: [
        "Much of the moisture has already condensed and fallen lower on the windward slope.",
        "The air reaching the summit therefore holds less water vapour.",
        "The heaviest rain falls on the slope below the summit where uplift is strongest (or the air begins to sink just beyond the crest).",
      ], explanation: "The wettest zone is often on the windward slope rather than the very top." }),
    ],
    hints: ["Read the table carefully: which station is wettest?", "Where has the moisture gone by the time air reaches the summit?"],
    explanation: "Practice in interpreting rainfall data across a mountain range.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A Form 2 class kept a weather diary in November at their school on the highveld (fictional data). Mornings were clear and hot (about 27 °C by 11:00). Towering clouds built up after 13:00, and on 9 of the 15 days a thunderstorm gave heavy rain between 15:00 and 17:00. Evenings were clear.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which type of rainfall is described?", options: [
        ["Convectional", "Correct: morning heating followed by afternoon storms."],
        ["Relief", "Relief rain is linked to high ground facing the wind, not to the time of day."],
        ["Frontal", "Frontal rain is linked to air masses meeting, not to daily heating."],
        ["Drizzle from guti", "Guti is a cool-season drizzle, not hot-season storms."],
      ], answer: "A", explanation: "Clear hot mornings and afternoon thunderstorms are the signature of convectional rain." }),
      P.num({ label: "(b)", marks: 1, stem: "On what percentage of the days was there a thunderstorm?", value: 60, unit: "%", wrong: [9, 40], explanation: "9 ÷ 15 × 100 = 60 %." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the storms happened in the afternoon rather than the morning.", points: [
        "Heating of the ground builds up through the morning, reaching a peak after midday.",
        "It takes several hours for rising air to cool, condense and build cumulonimbus tall enough to rain.",
      ], explanation: "Credit the delay between heating and the growth of storm clouds." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** hazards that such storms can bring to the school.", points: [
        "Lightning (risk to people outdoors or in buildings without conductors).",
        "Hail or strong gusts / flash flooding (damage to roofs, crops, gardens).",
      ], explanation: "Any two of lightning, hail, strong winds, flash floods, soil erosion." }),
    ],
    hints: ["When is the ground hottest?", "Think of what falls from cumulonimbus besides rain."],
    explanation: "Practice in recognising convectional rainfall from observations.",
  });
  b.card("DEFINITION", "Precipitation", "Water, liquid or solid, falling from the atmosphere: rain, drizzle, hail, sleet, snow.");
  b.card("DEFINITION", "Dew point", "The temperature at which air becomes saturated; further cooling causes condensation.");
  b.card("DEFINITION", "Adiabatic cooling", "Cooling of rising air because it expands as pressure falls (no heat removed).");
  b.card("CONCEPT", "Rain formation sequence", "Evaporation → uplift → adiabatic cooling → dew point → condensation on nuclei → droplets grow → fall.");
  b.card("CONCEPT", "Convectional rainfall", "Ground heating → air rises → cumulonimbus → heavy afternoon storms. Most of Zimbabwe's summer rain.");
  b.card("CONCEPT", "Relief rainfall", "Moist air forced over high ground: rain on the windward side, rain shadow on the leeward side (sinking air warms and dries).");
  b.card("CONCEPT", "Frontal rainfall", "Warm air forced to rise over cold air at a front. Warm front: steady rain. Cold front: short, heavy showers.");
  b.card("FACT", "Guti", "Cool-season mist and drizzle on the Eastern Highlands, brought by moist south-east trade winds.");
  b.card("CONCEPT", "Dew and frost", "Form on surfaces on clear, calm nights. Frost when the dew point is below 0 °C.");
});
