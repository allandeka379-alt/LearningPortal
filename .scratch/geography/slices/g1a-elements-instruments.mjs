// Slice G1a: weather elements, instruments and the weather station.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.weather.elements-instruments", { file: "weather/elements-instruments", keyPrefix: "weather.elements-instruments" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which instrument measures **air pressure**?",
    options: [
      ["Barometer", "Correct: a barometer (aneroid or mercury) measures the pressure of the air in hectopascals."],
      ["Anemometer", "An anemometer measures wind speed, not pressure."],
      ["Hygrometer", "A hygrometer (wet-and-dry bulb thermometer) measures humidity."],
      ["Rain gauge", "A rain gauge collects and measures rainfall in millimetres."],
    ],
    answer: "A",
    explanation: "Air pressure is measured with a **barometer**, in hectopascals (hPa, the same as millibars). A barograph draws a continuous record of pressure.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which unit is **cloud cover** recorded at a weather station?",
    options: [
      ["Oktas", "Correct: cloud cover is estimated in eighths (oktas) of the sky."],
      ["Hectopascals", "Hectopascals are the unit of air pressure."],
      ["Millimetres", "Millimetres are the unit of rainfall."],
      ["Hours", "Hours are used for sunshine duration, not cloud cover."],
    ],
    answer: "A",
    explanation: "The observer estimates how many eighths of the sky are covered by cloud: 0 oktas is a clear sky and 8 oktas is overcast.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The arrow of a wind vane at a school in Bulawayo points towards the **east**. What is the wind?",
    options: [
      ["An easterly wind, blowing from the east", "Correct: the arrow points into the wind, to where the wind comes from."],
      ["A westerly wind, blowing from the west", "This assumes the arrow points to where the wind is going; it points to where it comes from."],
      ["An easterly wind, blowing towards the east", "A wind blowing towards the east comes from the west, so it is a westerly."],
      ["A westerly wind, blowing towards the west", "A wind blowing towards the west comes from the east, so it is an easterly, not a westerly."],
    ],
    answer: "A",
    explanation: "A wind vane swings so that its arrow faces into the wind. Winds are named after the direction they blow **from**, so an arrow pointing east shows an easterly wind.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a Stevenson screen painted **white**?",
    options: [
      ["To reflect the sun's rays so the box does not heat up", "Correct: white reflects most solar radiation, so the air inside stays at the true shade temperature."],
      ["To make the screen easy to see from a distance", "Visibility is not the reason; the colour is chosen for its effect on temperature."],
      ["To absorb heat so the thermometers warm up quickly", "White reflects heat; a dark colour would absorb it and give false high readings."],
      ["To stop rainwater from soaking into the wood", "Paint protects wood, but any colour would do that; white is chosen to reflect sunlight."],
    ],
    answer: "A",
    explanation: "The screen must measure the **air** temperature in the shade. White paint reflects the sun's rays, so the box does not warm up and raise the readings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which reading of a wet-and-dry bulb thermometer shows the **driest** air?",
    options: [
      ["Dry bulb 30 °C, wet bulb 19 °C", "Correct: the difference is 11 °C, the largest, so evaporation is fastest and the air is driest."],
      ["Dry bulb 30 °C, wet bulb 27 °C", "A difference of only 3 °C means slow evaporation and fairly moist air."],
      ["Dry bulb 22 °C, wet bulb 22 °C", "No difference means the air is saturated: relative humidity is 100 %."],
      ["Dry bulb 25 °C, wet bulb 21 °C", "A difference of 4 °C is smaller than 11 °C, so the air is moister."],
    ],
    answer: "A",
    explanation: "The bigger the difference between the dry and wet bulbs, the faster water evaporates from the muslin, and the drier the air. Equal readings mean saturated air.",
    hints: ["Work out the difference between the two readings for each option.", "Fast evaporation cools the wet bulb a lot. When is evaporation fastest?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the rim of a rain gauge stand about 30 cm **above** the ground?",
    options: [
      ["To stop rain splashing off the ground into the funnel", "Correct: rain bouncing off the surface would add water that did not fall into the gauge."],
      ["To catch more rain than falls on the ground nearby", "A gauge should catch exactly the rain falling on its area, not extra rain."],
      ["To keep the gauge in the sun so water evaporates", "Evaporation would make the reading too low; the gauge is designed to reduce it."],
      ["To let the wind blow raindrops into the funnel", "Strong wind blows rain past a raised gauge, which is why it is kept low, not higher."],
    ],
    answer: "A",
    explanation: "About 30 cm is high enough to avoid **splash** from the ground and low enough that wind does not blow rain past the funnel. The gauge is sunk into the ground so it stays upright and cool.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school plans its weather station. Which site is **best**?",
    options: [
      ["An open, level grassy area on the sports field, fenced in", "Correct: open, grassy, level and secure: no shelter, shade or heat from hard surfaces."],
      ["Beside the tarred car park, where the caretaker can watch it", "Tar heats up and gives off heat, so temperature readings would be too high."],
      ["Under a large tree, where the instruments are kept cool", "Trees shade the rain gauge, block the wind and drip water: readings would be wrong."],
      ["Next to the classroom wall, sheltered from strong winds", "Buildings block wind and rain and give off stored heat, so the readings would not be true."],
    ],
    answer: "A",
    explanation: "A weather station needs an **open** site away from buildings and trees, on **level, grass-covered** ground (not tar or concrete), that is **secure** and easy to reach daily.",
    hints: ["Think about what could block wind or rain, or add extra heat.", "Which surface heats up least in the sun?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Over a week the barometer at a station falls steadily from 1018 hPa to 1004 hPa. What weather is **most likely** to follow?",
    options: [
      ["Cloudier, unsettled weather with a chance of rain", "Correct: falling pressure usually means rising air, which cools and forms cloud and rain."],
      ["Clear skies and calm, settled conditions", "Clear, settled weather is linked to high or rising pressure, the opposite of this trend."],
      ["Frost on the next night because the sky clears", "Frost needs clear skies and calm air, which go with high pressure, not falling pressure."],
      ["No change, because pressure does not affect weather", "Pressure is closely linked to weather: falling pressure often brings cloud and rain."],
    ],
    answer: "A",
    explanation: "Low or falling pressure means air is rising. Rising air cools, its water vapour condenses, and cloud and rain form. High or rising pressure means sinking air and settled, dry weather.",
    hints: ["Is the air rising or sinking when pressure falls?", "What happens to rising air as it cools?"],
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which instrument records the number of **hours of sunshine** in a day?",
    options: [
      ["Campbell-Stokes sunshine recorder", "Correct: its glass sphere burns a trace on a card whenever the sun shines."],
      ["Maximum-minimum thermometer", "This records the highest and lowest temperatures, not sunshine."],
      ["Cup anemometer", "An anemometer measures wind speed."],
      ["Aneroid barometer", "A barometer measures air pressure."],
    ],
    answer: "A",
    explanation: "The **Campbell-Stokes recorder** focuses the sun's rays onto a card. The length of the burnt line gives the hours of bright sunshine.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A maximum-minimum thermometer at Kariba (fictional readings) shows a maximum of 33 °C and a minimum of 18 °C. Calculate the **mean daily temperature**.",
    value: 25.5, unit: "°C", tol: 0.05,
    wrong: [15, 51],
    explanation: "Mean daily temperature = (maximum + minimum) ÷ 2 = (33 + 18) ÷ 2 = 51 ÷ 2 = 25.5 °C.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "On a winter night in Nyanga (fictional readings) the minimum temperature was 2 °C and the next day's maximum was 19 °C. Calculate the **daily temperature range**.",
    value: 17, unit: "°C",
    wrong: [21, 10.5],
    explanation: "Daily range = maximum − minimum = 19 − 2 = 17 °C.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A rain gauge at a school in Masvingo (fictional data) recorded these daily totals in one week of December:\n\n| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|---|\n| Rainfall (mm) | 0 | 12.5 | 31.0 | 4.5 | 0 | 0 | 18.0 |\n\nCalculate the **total rainfall** for the week.",
    value: 66, unit: "mm", tol: 0.05,
    wrong: [9.4, 50],
    explanation: "Total = 0 + 12.5 + 31.0 + 4.5 + 0 + 0 + 18.0 = 66 mm.",
    workedSolution: "1. Add the daily totals: 12.5 + 31.0 = 43.5.\n2. 43.5 + 4.5 = 48.0.\n3. 48.0 + 18.0 = 66.0 mm (the dry days add nothing).",
    hints: ["Rainfall totals are added, not averaged.", "Days with 0 mm still count as days but add nothing to the total."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Rainfall is measured in {{blank:a}} with a rain gauge. Air pressure is measured in {{blank:b}} with a barometer.",
    blanks: [
      { id: "a", accepted: ["millimetres", "mm", "millimeters"], wrong: "centimetres" },
      { id: "b", accepted: ["hectopascals", "hPa", "millibars", "mb"], wrong: "oktas" },
    ],
    explanation: "Rainfall: millimetres (mm). Air pressure: hectopascals (hPa), which are equal to millibars (mb).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each instrument with the element of weather it measures.",
    pairs: [
      ["Cup anemometer", "Wind speed"],
      ["Wind vane", "Wind direction"],
      ["Wet-and-dry bulb thermometer", "Relative humidity"],
      ["Six's thermometer", "Highest and lowest temperatures"],
    ],
    explanation: "Anemometer: wind speed. Wind vane: wind direction. Wet-and-dry bulb (hygrometer): humidity. Six's (maximum-minimum) thermometer: maximum and minimum temperatures.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Climate is the average weather of a place, worked out from records kept over a long period, usually at least 30 years.",
    answer: true,
    explanation: "True. Weather is the condition of the atmosphere at a given time; climate is the long-term average, usually over 30 years or more.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When the wet bulb and the dry bulb show the same temperature, the air is very dry.",
    answer: false,
    explanation: "False. Equal readings mean no water is evaporating from the wet bulb, so the air is **saturated**: relative humidity is 100 %.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the white, louvred wooden box in which thermometers are kept at a weather station.",
    accepted: ["Stevenson screen", "Stevenson's screen", "Stevensons screen", "a Stevenson screen"],
    wrong: ["weather box", "rain gauge"],
    explanation: "The **Stevenson screen** keeps thermometers in the shade with free air flow, so they measure the true air temperature.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a rain gauge is used to measure the rainfall for one day.",
    points: [
      "Rain falls into the funnel and collects in the jar (or container) inside the gauge.",
      "At the same time each day (usually in the morning) the water is poured into a measuring cylinder.",
      "The level is read at eye level in millimetres, recorded, and the cylinder emptied.",
    ],
    modelAnswer: "Rain enters the funnel and collects in the jar below it. Every morning at the same time, the water is poured into a graduated measuring cylinder, read at eye level in millimetres and recorded before the cylinder is emptied.",
    explanation: "Credit the sequence: collect in funnel and jar, pour into a measuring cylinder at a fixed time, read in mm at eye level and record.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** features of a Stevenson screen that help it to measure the true temperature of the air.",
    points: [
      "Feature 1, for example: painted white.",
      "Reason 1, for example: reflects the sun's rays so the box does not heat up.",
      "Feature 2, for example: louvred sides (or standing on legs about 1.2 m high, or a double roof).",
      "Reason 2, for example: louvres let air flow freely but keep out direct sun (legs keep it away from heat given off by the ground; the double roof insulates).",
    ],
    modelAnswer: "It is painted white, which reflects the sun's rays so the box does not warm up. Its sides are louvred, so air circulates freely around the thermometers while direct sunlight and rain are kept out.",
    explanation: "Each feature earns a mark only with its matching reason. Other valid pairs: legs (away from ground heat), door facing away from the sun (no sunlight on thermometers when opened), double roof (insulation).",
    hints: ["Think about colour, sides, height and roof.", "For each feature, say how it keeps sunlight or ground heat away while letting air through."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A Form 2 class wants to set up a weather station at their rural school. Discuss where they should place it and what they should do to make sure their readings are reliable.",
    points: [
      ["Siting: open area away from buildings and trees, explained (no shelter, shading or drips).", 2],
      ["Surface: level, grass-covered ground rather than tar, concrete or bare soil, explained (hard surfaces heat up).", 1],
      ["Security and access: fenced against animals and damage; easy to reach every day.", 1],
      ["Procedure: readings taken at the same time daily, the same way (eye level, reset indexes), and recorded carefully.", 1],
      ["Judgement: which factors matter most and any compromise the school must accept.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "The station should be in an open part of the school grounds, such as the edge of the sports field, well away from classroom blocks and trees. Buildings and trees shelter the instruments from the wind, shade the rain gauge and drip water into it, so the readings would not represent the area. The ground should be level and grassy: tar and concrete absorb heat and raise temperature readings. A fence keeps out goats and cattle and protects the instruments, and the site must be close enough that a pupil can read it every morning.\n\nReliability also depends on method. Readings should be taken at the same time each day, the measuring cylinder read at eye level, and the thermometer indexes reset after each reading. A rota with a written record sheet helps. The most important factor is an open site, because shelter affects every instrument; in a small school ground some compromise on distance from buildings may be needed, but the site should never be on a hard surface or under trees.",
    explanation: "A good answer explains each siting choice and adds the method that keeps readings comparable.",
    hints: ["Think about shelter, the ground surface, safety and the daily routine.", "End with which factor matters most."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A Form 1 class kept these records at their school weather station in Gweru (fictional data) for three days in September.\n\n| Day | Maximum (°C) | Minimum (°C) | Dry bulb (°C) | Wet bulb (°C) | Wind vane points to |\n|---|---|---|---|---|---|\n| 1 | 29 | 12 | 24 | 16 | North-east |\n| 2 | 31 | 15 | 26 | 17 | East |\n| 3 | 25 | 14 | 21 | 19 | North |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean daily temperature on Day 1.", value: 20.5, unit: "°C", tol: 0.05, wrong: [17], explanation: "(29 + 12) ÷ 2 = 41 ÷ 2 = 20.5 °C." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the daily temperature range on Day 2.", value: 16, unit: "°C", wrong: [23], explanation: "31 − 15 = 16 °C." }),
      P.mcq({ label: "(c)", marks: 1, stem: "On which day was the relative humidity **highest**?", options: [
        ["Day 3", "Correct: the wet-bulb depression is only 2 °C, so evaporation was slowest and the air moistest."],
        ["Day 1", "Day 1 had a depression of 8 °C, which means drier air."],
        ["Day 2", "Day 2 had the biggest depression (9 °C), so it was the driest day."],
        ["All three days were equal", "The differences are 8, 9 and 2 °C, so humidity was not equal."],
      ], answer: "A", explanation: "Differences: Day 1 = 8 °C, Day 2 = 9 °C, Day 3 = 2 °C. The smallest difference means the highest humidity." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the wind on Day 2 (for example, a westerly wind).", accepted: ["easterly", "an easterly", "easterly wind", "an easterly wind", "east", "east wind"], wrong: ["westerly"], explanation: "The vane points to where the wind comes from: east, so it is an easterly wind." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why Day 3 had the smallest temperature range.", points: [
        "Cloud cover (moist air on Day 3) blocked some sunshine by day, keeping the maximum lower.",
        "Cloud trapped heat at night (reduced radiation loss), keeping the minimum higher.",
      ], explanation: "Day 3 was the most humid day; cloudy, moist days have small ranges because cloud reduces heating by day and cooling by night." }),
    ],
    hints: ["Mean = (max + min) ÷ 2; range = max − min.", "Compare the dry-bulb minus wet-bulb differences."],
    explanation: "This practice question links temperature statistics, humidity and wind direction from one set of station records.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "Study this list of instruments found at a school weather station: rain gauge, Six's thermometer, cup anemometer, barometer, Campbell-Stokes recorder.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which instrument is kept inside the Stevenson screen?", options: [
        ["Six's thermometer", "Correct: thermometers are kept in the screen so they read the air temperature in the shade."],
        ["Rain gauge", "A rain gauge must be in the open to catch rain."],
        ["Cup anemometer", "An anemometer must be high on a pole in the open wind."],
        ["Campbell-Stokes recorder", "A sunshine recorder must face the open sky to receive sunshine."],
      ], answer: "A", explanation: "Only thermometers (maximum-minimum and wet-and-dry bulb) go inside the Stevenson screen." }),
      P.match({ label: "(b)", stem: "Match each instrument with the unit of its reading.", pairs: [
        ["Rain gauge", "mm"], ["Barometer", "hPa"], ["Cup anemometer", "km/h"], ["Campbell-Stokes recorder", "hours"],
      ], explanation: "Rainfall in mm, pressure in hPa, wind speed in km/h (or m/s), sunshine in hours." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how a maximum-minimum thermometer is read and reset.", points: [
        "Read the temperature at the bottom (end nearest the mercury) of each metal index.",
        "Reset by drawing the indexes back to the mercury with a magnet (or push button).",
      ], explanation: "The indexes stay at the highest and lowest points reached; the reading is taken at the end of each index touching the mercury." }),
    ],
    explanation: "Practice in matching instruments to their units and using a maximum-minimum thermometer.",
  });
  b.card("DEFINITION", "Weather", "The condition of the atmosphere at a particular place and time (temperature, rain, wind, cloud and so on).");
  b.card("DEFINITION", "Climate", "The average weather of a place over a long period, usually at least 30 years.");
  b.card("FACT", "Instrument for wind speed", "Cup anemometer (m/s or km/h).");
  b.card("FACT", "Instrument for humidity", "Wet-and-dry bulb thermometer (hygrometer); the difference between the readings is looked up in a humidity table.");
  b.card("CONCEPT", "Which way does a wind vane point?", "Into the wind: to the direction the wind comes FROM. Winds are named by where they come from.");
  b.card("FACT", "Cloud cover unit", "Oktas: eighths of the sky covered (0 = clear, 8 = overcast).");
  b.card("CONCEPT", "Mean daily temperature and daily range", "Mean = (maximum + minimum) ÷ 2. Range = maximum − minimum.");
  b.card("CONCEPT", "Stevenson screen features", "White (reflects sun), louvred sides (air flow, no direct sun), legs about 1.2 m (away from ground heat), double roof, door facing away from the sun.");
  b.card("CONCEPT", "Siting a weather station", "Open (away from buildings and trees), level, grass-covered, fenced and easy to reach; read at the same time daily.");
});
