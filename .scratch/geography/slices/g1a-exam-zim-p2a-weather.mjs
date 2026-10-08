// Slice G1a: ZIMSEC Paper 2 Section A (physical environment), weather and climate (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const HEAD = "| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n";
const STATIONS = "**Table 1: Climate data for two fictional stations in Zimbabwe**\n\nStation H (highveld, 1,480 m)\n\n" + HEAD +
  "| Temperature (°C) | 21 | 21 | 20 | 18 | 16 | 13 | 13 | 16 | 19 | 22 | 22 | 21 |\n| Rainfall (mm) | 195 | 175 | 100 | 35 | 10 | 2 | 1 | 2 | 8 | 35 | 100 | 165 |\n\nStation L (south-eastern lowveld, 430 m)\n\n" + HEAD +
  "| Temperature (°C) | 28 | 27 | 26 | 24 | 21 | 18 | 18 | 20 | 24 | 27 | 28 | 28 |\n| Rainfall (mm) | 95 | 85 | 50 | 20 | 8 | 3 | 2 | 2 | 6 | 25 | 60 | 90 |";

const STORM = "**Table 2: Track of a fictional tropical cyclone**\n\n| Day | Position | Central pressure (hPa) | Maximum sustained wind (km/h) |\n|---|---|---|---|\n| 1 | Mozambique Channel | 985 | 110 |\n| 2 | Mozambique Channel | 955 | 175 |\n| 3 | Crossing the Mozambique coast | 960 | 165 |\n| 4 | Over eastern Zimbabwe | 994 | 65 |\n\n**Table 3: Rainfall (mm) at three fictional stations in eastern Zimbabwe**\n\n| Station | Setting | Day 3 | Day 4 | Day 5 |\n|---|---|---|---|---|\n| P | East-facing mountain slope | 140 | 310 | 90 |\n| Q | Valley floor to the west of the mountains | 60 | 120 | 30 |\n| R | Plateau, 150 km further west | 15 | 45 | 10 |";

concept("geo.weather.zimbabwe-climate", { file: "exam/zim-p2-a-weather", keyPrefix: "exam.zim-p2-a-weather", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.weather.zimbabwe-climate", "geo.weather.climate-graphs", "geo.weather.precipitation", "geo.weather.air-masses", "geo.weather.hazards"],
    stem: `Study Table 1, which gives climate data for two fictional stations in Zimbabwe.\n\n${STATIONS}`,
    hints: ["Annual range = hottest month − coolest month.", "For the long answer, name a real area of Zimbabwe and judge each measure."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "During which months does Station H receive more than 90 mm of rain each month?", options: [
        ["November to March", "Correct: 100, 165, 195, 175 and 100 mm."],
        ["May to August", "These are the driest months (1-10 mm)."],
        ["September to December", "September (8 mm) and October (35 mm) are dry."],
        ["January to April", "April has only 35 mm."],
      ], answer: "A", explanation: "November (100), December (165), January (195), February (175) and March (100 mm)." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the annual temperature range at Station L.", value: 10, unit: "°C", wrong: [46, 9], explanation: "28 − 18 = 10 °C." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the difference between the total annual rainfall of Station H and that of Station L.", value: 382, unit: "mm", wrong: [828, 446], explanation: "H: 828 mm; L: 446 mm; difference = 828 − 446 = 382 mm." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the type of rainfall that gives both stations most of their rain in the hot wet season.", accepted: ["convectional", "convectional rainfall", "convectional rain", "convection"], wrong: ["frontal"], explanation: "Convectional rainfall from afternoon thunderstorms." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why Station L is hotter than Station H throughout the year.", points: [
        "Station L is about 1,050 m lower than Station H.",
        "Temperature falls with height (about 6.5 °C per 1,000 m), so the low-lying lowveld is hotter.",
      ], explanation: "The difference is due to altitude." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why Zimbabwe receives most of its rain between November and March.", points: [
        "The overhead sun moves south and the ITCZ follows it over or near Zimbabwe.",
        "Moist air streams (Congo air, north-east monsoon, south-east trades) converge over the country.",
        "Strong heating causes the moist air to rise, cool and condense, forming storms.",
      ], explanation: "Credit the ITCZ, moist air streams and convection." }),
      P.manual({ label: "(g)", marks: 4, stem: "Describe, with the help of an annotated diagram described in words, how convectional rain forms.", points: [
        "The sun heats the ground strongly, which heats the air above it.",
        "Warm, moist air rises in convection currents.",
        "Rising air expands and cools to its dew point; vapour condenses into cumulonimbus cloud.",
        "Droplets grow and fall as heavy afternoon showers or thunderstorms.",
      ], explanation: "One mark per correctly ordered stage (labels on a diagram are acceptable)." }),
      P.manual({ label: "(h)", marks: 3, stem: "Station L's rainfall is less reliable than Station H's. Describe **three** effects of this unreliability on farmers near Station L.", points: [
        "Frequent crop failure / low yields of rain-fed crops such as maize.",
        "Shortage of water and grazing, so livestock lose condition or die.",
        "Food insecurity and loss of income; dependence on food aid or off-farm work.",
      ], explanation: "Credit three different effects on farmers." }),
      P.manual({
        label: "(i)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "With reference to a named area of Zimbabwe, explain the causes of drought and evaluate the measures used to reduce its effects.",
        points: [
          ["Named drought-prone area (e.g. Masvingo lowveld, Matabeleland South, natural regions IV-V).", 1],
          ["Cause: low and unreliable rainfall; late onset, mid-season dry spells, early end of the rains.", 1],
          ["Cause: El Niño years (e.g. 1991-92, 2015-16) / persistent high pressure / the ITCZ not reaching the south.", 1],
          ["Cause: high temperatures and evaporation; human factors such as deforestation and overgrazing worsen the effects.", 1],
          ["Measure: drought-tolerant small grains and conservation farming (planting basins, mulching), with evaluation.", 1],
          ["Measure: irrigation, small dams, boreholes and water harvesting, with evaluation (cost, reliance on stored water).", 1],
          ["Measure: forecasts, early warning, grain reserves, food aid, with evaluation.", 1],
          ["Overall judgement on which measures are most effective and why.", 1],
        ],
        levels: geographyLevels(8),
        modelAnswer: "The south-eastern lowveld around Chiredzi and much of Masvingo and Matabeleland South lie in natural regions IV and V, where drought is common. Rainfall is low and unreliable: the rains may start late, stop for weeks in January or February, or end early. In El Niño years such as 1991-92 and 2015-16 the rain belt brought far less rain than normal, and high pressure persisted. High temperatures increase evaporation, and deforestation and overgrazing leave soils that hold little moisture.\n\nFarmers are encouraged to grow sorghum and millet and to use conservation farming with planting basins and mulch. These are cheap and keep moisture in the soil, but small grains are harder to process and sell than maize. Irrigation from dams and boreholes, as on the sugar estates of the lowveld, gives reliable yields, but it is expensive and fails if dams are not refilled. Seasonal forecasts, early warning, grain reserves and food aid reduce hunger, but they treat the effects rather than the cause and depend on government funds and donors.\n\nOverall, combining water storage with drought-tolerant crops and conservation farming is most effective, because it reduces losses every season, while food aid is only a short-term safety net.",
        explanation: "Level 3 answers explain several causes for a named area and evaluate at least two measures with a judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section A style question on the climate of Zimbabwe, rainfall and drought.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.weather.tropical-cyclones", "geo.weather.precipitation", "geo.weather.hazards"],
    stem: `Study Tables 2 and 3, which describe a fictional tropical cyclone and the rain it brought to eastern Zimbabwe.\n\n${STORM}`,
    hints: ["Compare Day 2 with Day 4 in Table 2.", "For the long answer, use Cyclone Idai (2019) with named places."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "On which day was the cyclone strongest?", options: [
        ["Day 2", "Correct: lowest pressure (955 hPa) and strongest winds (175 km/h)."],
        ["Day 1", "Pressure was higher and winds weaker on Day 1."],
        ["Day 3", "It was slightly weaker on Day 3 (960 hPa, 165 km/h)."],
        ["Day 4", "By Day 4 it had weakened over land."],
      ], answer: "A", explanation: "Day 2 had the lowest pressure and the highest wind speed." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the rise in central pressure from Day 3 to Day 4.", value: 34, unit: "hPa", wrong: [39], explanation: "994 − 960 = 34 hPa." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the total rainfall at Station P over the three days.", value: 540, unit: "mm", wrong: [310, 180], explanation: "140 + 310 + 90 = 540 mm." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the type of rainfall that explains why Station P received more rain than Station Q.", accepted: ["relief", "relief rainfall", "orographic", "orographic rainfall", "relief rain", "orographic rain"], wrong: ["convectional"], explanation: "Relief (orographic) rainfall: moist air forced up the east-facing slope." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe **three** conditions needed for a tropical cyclone to form.", points: [
        "Sea-surface temperature of about 26.5 °C or more (warm, deep water).",
        "At least about 5° from the equator so the Coriolis effect creates spin.",
        "Moist, rising air with low wind shear / an existing low-pressure disturbance.",
      ], explanation: "One mark per condition." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why the cyclone weakened between Day 3 and Day 4.", points: [
        "It moved over land, losing its supply of heat and moisture from the warm sea.",
        "Friction with the land surface slowed the winds.",
      ], explanation: "Loss of energy supply and friction." }),
      P.manual({ label: "(g)", marks: 3, stem: "Explain why heavy rain at stations such as P can cause landslides and flash floods.", points: [
        "Very heavy rain saturates the soil on steep slopes.",
        "Saturated soil is heavy and loses strength, so slopes collapse as mudslides and rock falls.",
        "Water runs off rapidly into narrow valleys, so rivers rise suddenly (flash floods).",
      ], explanation: "Credit saturation, slope failure and rapid run-off." }),
      P.manual({ label: "(h)", marks: 4, stem: "Suggest **four** measures that could reduce deaths in eastern Zimbabwe in a future cyclone.", points: [
        "Early warnings that reach remote communities (radio, SMS, community leaders).",
        "Evacuation plans and safe shelters on stable ground.",
        "Preventing settlement on steep, unstable slopes and beside rivers.",
        "Stronger bridges and roads / emergency supplies and rescue teams ready in advance.",
      ], explanation: "Credit four practical measures (prediction, preparation, planning, protection)." }),
      P.manual({
        label: "(i)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "With reference to Cyclone Idai (2019), describe its impacts in Zimbabwe and evaluate the responses to it.",
        points: [
          ["Located: March 2019; landfall near Beira; heaviest impacts in Chimanimani and Chipinge districts.", 1],
          ["Social impact: several hundred deaths, many missing; homes buried by mudslides; people displaced.", 1],
          ["Economic impact: roads, bridges, schools and clinics destroyed; crops and livestock lost.", 1],
          ["Environmental impact: landslides, river channels changed, soil and forest loss.", 1],
          ["Response: rescue by army, police, volunteers and helicopters; evaluated (delayed by cut roads).", 1],
          ["Response: food, shelter and medical aid from government, churches and international organisations; evaluated.", 1],
          ["Response: rebuilding and relocating families from dangerous slopes; evaluated (slow, costly).", 1],
          ["Overall judgement: rescue and aid saved lives, but weak warnings and settlement on steep slopes made losses high; lessons learned.", 1],
        ],
        levels: geographyLevels(8),
        modelAnswer: "Cyclone Idai made landfall near Beira in Mozambique in mid-March 2019 and moved inland over eastern Zimbabwe, bringing torrential rain to Chimanimani and Chipinge districts. On steep, saturated slopes the rain triggered mudslides and rock falls that buried homes, and flash floods swept away people and property. Several hundred people died in Zimbabwe and many were never found. Roads, bridges, schools and clinics were destroyed, crops and livestock were lost, and whole valleys were changed by debris.\n\nThe army, police and volunteers carried out rescues, using helicopters where roads had gone, but many communities were cut off for days, so help arrived late. The government, churches, neighbouring countries and international organisations supplied food, shelter and medical care, which prevented further deaths and disease, although supplies were hard to deliver at first. Later, roads and bridges were rebuilt and some families were moved away from dangerous slopes, but rebuilding was slow and expensive.\n\nOverall, the emergency response saved many lives, but losses were high because warnings did not clearly reach remote communities and many homes stood on unstable slopes and river banks. Better early warning and land-use planning are the main lessons.",
        explanation: "Level 3 answers give located, specific impacts and evaluate several responses with a judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section A style question on tropical cyclones, relief rainfall and weather hazards.",
  });
});
