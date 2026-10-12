// W1b: atmos.air-masses-pressure-systems (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: 1016 - 1002 = 14 hPa; (1026 - 1014)/300 x 100 = 4 hPa per 100 km; front temperature fall 29 - 18 = 11 °C;
// struct: (1014 - 1002)/400 x 100 = 3 and (1018 - 1014)/800 x 100 = 0.5 hPa per 100 km.
import { concept, P, geographyLevels, chk } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const diff12 = chk(1016 - 1002, 14);
const grad13 = chk(((1026 - 1014) / 300) * 100, 4);
const fall14 = chk(29 - 18, 11);
const g1 = chk(((1014 - 1002) / 400) * 100, 3);
const g2 = chk(((1018 - 1014) / 800) * 100, 0.5);

concept("ageo.atmos.air-masses-pressure-systems", { file: "atmos/air-masses-pressure-systems", keyPrefix: "atmos.air-masses-pressure-systems" }, (b) => {
  mc(b, 1, "RECALL", "What is a **source region** for an air mass?", [
    ["A large, uniform surface where air takes on its properties", "Correct: typically under high pressure with light winds."],
    ["The place where an air mass finally fades away and disappears", "An air mass is modified and may fade, but that is not the source region."],
    ["The boundary line between two different kinds of air mass", "That is a front."],
    ["A narrow strip of land with a varied surface", "A source region must be large and uniform."],
  ], "A **source region** is a large, uniform surface under light winds where the air takes on its temperature and humidity.");
  mc(b, 1, "RECALL", "Which description fits a **tropical continental** (cT) air mass?", [
    ["Hot and dry", "Correct: it forms over warm land in low latitudes, with little moisture."],
    ["Hot and very moist", "That describes equatorial maritime air."],
    ["Cold and dry", "That describes polar continental air."],
    ["Cool and moist", "That describes polar maritime air."],
  ], "**cT** air is hot and dry because it forms over land in the tropics.");
  mc(b, 2, "APPLICATION", "Which air mass is mainly responsible for the cool, misty drizzle called guti on the Zimbabwean plateau?", [
    ["Moist maritime air from the Indian Ocean", "Correct: moist air is lifted and cooled over the plateau and the Eastern Highlands."],
    ["Dry tropical continental air from the Kalahari", "Dry air gives clear skies, not drizzle."],
    ["Hot equatorial air from the Atlantic Ocean", "Equatorial air is associated with summer thunderstorms, not cool drizzle."],
    ["Polar maritime air from the Arctic", "Arctic air does not reach Zimbabwe."],
  ], "The cool, moist south-easterly flow from the Indian Ocean brings **cloud and drizzle** when it is lifted.");
  mc(b, 2, "UNDERSTANDING", "What kind of weather do anticyclones usually bring in the cool season in Zimbabwe?", [
    ["Clear skies, light winds and frost on cold nights", "Correct: sinking air prevents cloud and clear skies allow strong cooling at night."],
    ["Thick cloud, steady rain and rising pressure", "Rain is typical of depressions with rising air."],
    ["Strong winds, tornadoes and rapid temperature changes", "Winds are light in the centre of an anticyclone."],
    ["Heavy thunderstorms every afternoon in the cool season", "Thunderstorms need rising unstable air."],
  ], "In an **anticyclone** air sinks, so skies are clear; in the cool season the night cooling can lead to frost.");
  mc(b, 2, "UNDERSTANDING", "In the southern hemisphere, how do surface winds move around a depression?", [
    ["Clockwise and inwards", "Correct: the Coriolis effect deflects air to the left, so it spirals clockwise into a low."],
    ["Anticlockwise and inwards", "That is the northern hemisphere pattern."],
    ["Clockwise and outwards", "Air moves outwards from highs, not lows."],
    ["Anticlockwise and outwards", "This describes a southern hemisphere high."],
  ], "In the southern hemisphere: **clockwise and inwards** around lows; **anticlockwise and outwards** around highs.");
  mc(b, 3, "ANALYSIS", "On a weather map the isobars are very close together over one coast. What does this show?", [
    ["A steep pressure gradient and strong winds", "Correct: the pressure changes quickly over a short distance."],
    ["A weak pressure gradient and light winds", "That would be shown by widely spaced isobars."],
    ["A cold front is overhead", "Fronts are drawn separately and are not shown by isobar spacing."],
    ["The region is under a stable anticyclone centre", "The centre of an anticyclone has widely spaced isobars and light winds."],
  ], "Close isobars mean a **steep pressure gradient**, so stronger winds.", { hints: ["Think of isobars like contour lines on a relief map."] });
  b.tf({ d: 1, skill: "UNDERSTANDING", stem: "In a depression the air at the surface converges and rises.", answer: true,
    feedbackTrue: "Correct: converging air has nowhere to go but upward, so it rises, cools and forms cloud.",
    feedbackFalse: "Not so: depressions have rising air with converging surface winds.",
    explanation: "Rising air in a **depression** gives cloud and rain." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Anticyclones usually bring more rain than depressions.", answer: false, daily: true,
    feedbackFalse: "Correct: sinking air in anticyclones prevents cloud; rain is typical of depressions.",
    feedbackTrue: "Not so: anticyclones have sinking air and mostly dry weather.",
    explanation: "**Depressions** bring rain; **anticyclones** bring dry, settled weather." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A boundary between two air masses is a {{blank:a}}. A system of high pressure with sinking air is an {{blank:b}}. Cold air moving over a warm surface becomes {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["front"], choices: ["front", "isobar", "gradient"] },
      { id: "b", accepted: ["anticyclone"], choices: ["anticyclone", "depression", "monsoon"] },
      { id: "c", accepted: ["unstable"], choices: ["unstable", "stable", "saturated"] },
    ], explanation: "Front; anticyclone; unstable (heated from below)." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each air mass symbol to its description.",
    pairs: [
      ["cT", "Hot and dry, formed over tropical land"],
      ["mT", "Warm and moist, formed over a tropical ocean"],
      ["cP", "Cold and dry, formed over a polar land mass"],
      ["mP", "Cool and moist, formed over a polar or temperate ocean"],
      ["mE", "Hot and very humid, formed near the equator over water"],
    ], explanation: "The first letter shows whether it is continental (dry) or maritime (moist); the second its latitude." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "hPa",
    stem: "Station X records a pressure of 1 002 hPa and Station Y records 1 016 hPa. Calculate the pressure difference between them, in hPa.",
    value: diff12, wrong: [2018, 24],
    explanation: "1 016 − 1 002 = **14 hPa**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "hPa",
    stem: "On a weather map the 1 026 hPa isobar is 300 km from the 1 014 hPa isobar. Calculate the pressure gradient, in hPa per 100 km.",
    hints: ["Find the pressure difference.", "Divide by the distance, then multiply by 100 to get hPa per 100 km."],
    value: grad13, wrong: [12, 0.04],
    explanation: "Difference = 12 hPa over 300 km. 12 ÷ 300 × 100 = **4 hPa per 100 km**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°C",
    stem: "A station records 29 °C just before a cold front passes and 18 °C three hours after it has passed. Calculate the fall in temperature, in °C.",
    hints: ["Subtract the lower value from the higher."],
    value: fall14, wrong: [47, 3.7],
    explanation: "29 − 18 = **11 °C**. This sharp fall is typical of a cold front." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the boundary between two air masses of different temperature and humidity.",
    accepted: ["front", "a front", "weather front"], wrong: ["isobar"],
    explanation: "A **front** is the boundary between two different air masses." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of pressure system that has low pressure at its centre and rising air.",
    accepted: ["depression", "cyclone", "a depression", "low", "low pressure", "low-pressure system", "mid-latitude depression"], wrong: ["anticyclone"],
    explanation: "A **depression** (cyclone) has low pressure and rising air." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why moist tropical maritime air brings cloud and drizzle to the Eastern Highlands.",
    hints: ["Think about what happens to moist air that meets high ground."],
    points: [
      "The air has picked up a lot of water vapour from the warm Indian Ocean.",
      "It is forced to rise over the highlands (relief uplift) and cools adiabatically to its dew point.",
      "Water vapour condenses on nuclei to form low cloud and drizzle (or rain).",
    ],
    modelAnswer: "The south-easterly air has crossed the warm Indian Ocean and is full of water vapour. When it meets the Eastern Highlands it is forced to rise and cools to its dew point, so the vapour condenses to form low cloud and drizzle.",
    explanation: "Moisture source, uplift and cooling, condensation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why frost is common on the Zimbabwean highveld when an anticyclone dominates in the cool season.",
    hints: ["Link subsidence, cloud and night-time radiation."],
    points: [
      "Air descends in an anticyclone, warming by compression, so cloud does not form.",
      "Clear, dry skies let the ground lose heat by longwave radiation at night with little back radiation.",
      "Light winds allow cold dense air to settle near the ground and in hollows.",
      "Air temperature near the surface can fall below 0 °C, causing frost.",
    ],
    modelAnswer: "Sinking air in an anticyclone warms and prevents cloud forming. Under clear dry skies the ground loses heat by radiation at night. With light winds, the cold air stays near the surface and collects in hollows, so temperatures fall below freezing and frost forms.",
    explanation: "Clear skies and light winds give strong night-time cooling." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "The following readings were taken at a station in southern Africa as a cold front passed.\n\n" + tbl(["Time", "Pressure (hPa)", "Temperature (°C)", "Weather"], [["Morning", 1011, 23, "Warm, cloud thickening"], ["Midday", 1001, 25, "Heavy rain"], ["Afternoon", 1007, 14, "Showers, cooler"], ["Evening", 1017, 12, "Clear, cold"]]) + "\n\nDescribe the changes in pressure, temperature and weather as the front passes.",
    hints: ["Quote values with units.", "Give the time when the pressure was lowest and when the temperature fell."],
    points: [
      "Pressure fell to a minimum of 1 001 hPa at midday, then rose steadily to 1 017 hPa by evening.",
      "Temperature stayed warm (23–25 °C) until midday, then fell by 11 °C between midday and the afternoon (25 °C to 14 °C), reaching 12 °C in the evening.",
      "Cloud thickened before the front and heavy rain fell at midday as the front passed.",
      "After the front the rain changed to showers and then the sky cleared, with cold conditions.",
    ],
    modelAnswer: "Pressure fell from 1 011 hPa to 1 001 hPa at midday and then rose to 1 017 hPa by evening. Temperature was 23–25 °C until midday and then fell by 11 °C to 14 °C by the afternoon, reaching 12 °C in the evening. Cloud thickened and heavy rain fell at midday as the front passed; later there were showers, then clear, cold weather.",
    explanation: "Describe the changes in sequence with figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Surface pressure was measured at three stations along a line (illustrative data).\n\n" + tbl(["Station", "Pressure (hPa)", "Distance from the previous station (km)"], [["1", 1002, "—"], ["2", 1014, 400], ["3", 1018, 800]]),
    hints: ["Pressure gradient = pressure difference ÷ distance × 100 (hPa per 100 km)."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the pressure gradient between Station 1 and Station 2, in hPa per 100 km.", value: g1, unit: "hPa", wrong: [12, 0.03],
        explanation: "(1 014 − 1 002) = 12 hPa over 400 km. 12 ÷ 400 × 100 = 3 hPa per 100 km." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the pressure gradient between Station 2 and Station 3, in hPa per 100 km.", value: g2, dp: 1, unit: "hPa", wrong: [4, 0.005],
        explanation: "(1 018 − 1 014) = 4 hPa over 800 km. 4 ÷ 800 × 100 = 0.5 hPa per 100 km." }),
      P.mcq({ label: "(c)", stem: "Where will the surface winds be stronger?", options: [
        ["Between Stations 1 and 2", "Correct: the gradient is six times as steep."],
        ["Between Stations 2 and 3", "The gradient here is much weaker."],
        ["Equal in both places", "The gradients differ, so the wind speeds differ."],
        ["No wind is possible at any station", "Wind blows wherever there is a pressure gradient."],
      ], answer: "A", explanation: "Steeper gradient means stronger winds." }),
      P.manual({ label: "(d)", marks: 3, stem: "Station 1 is near the centre of a depression and Station 3 is near the centre of an anticyclone. Compare the weather you would expect at the two stations.",
        points: [
          "Station 1 (low pressure): air converges and rises, so cloud and rain are likely.",
          "Station 3 (high pressure): air descends, so skies are clear and the weather is dry.",
          "Winds are likely to be stronger near the depression (steeper gradient) and light near the centre of the anticyclone.",
        ],
        modelAnswer: "At Station 1 air converges and rises, so there is cloud, rain and strong winds. At Station 3 air sinks, so skies are clear and dry and winds are light.",
        explanation: "Rising air gives cloud; sinking air gives dry weather." }),
    ], explanation: "Calculate the gradients and relate them to wind and weather." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Three air masses affect southern Africa (illustrative descriptions).\n\n" + tbl(["Air mass", "Source region", "Temperature at source", "Humidity at source"], [["A", "Subtropical Indian Ocean", "Warm", "High"], ["B", "Interior of southern Africa", "Hot in the hot season", "Low"], ["C", "Southern Ocean south of Africa", "Cold", "Moderate"]]),
    hints: ["The first letter of the symbol shows continental or maritime.", "Think about what happens to each air mass as it moves towards Zimbabwe."],
    parts: [
      P.short({ label: "(a)", stem: "Give the symbol for Air mass A (use two letters).", accepted: ["mT", "mt"], explanation: "Maritime tropical (mT)." }),
      P.short({ label: "(b)", stem: "Give the symbol for Air mass B (use two letters).", accepted: ["cT", "ct"], explanation: "Continental tropical (cT)." }),
      P.mcq({ label: "(c)", stem: "Which air mass is responsible for clear, hot and dry weather before the rains in October?", options: [
        ["Air mass B", "Correct: hot, dry continental air gives clear skies."],
        ["Air mass A", "This moist air gives cloud and drizzle."],
        ["Air mass C", "This cold air gives cold snaps."],
        ["None of these", "One of these is the cause."],
      ], answer: "A", explanation: "Dry tropical continental air gives hot, clear weather." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how Air mass A brings cool, misty weather to the Eastern Highlands.",
        points: [
          "The air has gathered moisture from the warm ocean, so it is humid and near saturation.",
          "It moves inland on south-easterly winds and is cooled from below over the cooler land in the cool season, so it becomes stable.",
          "Where it meets the highlands it is forced to rise, cools to the dew point and condenses.",
          "Low cloud, mist and drizzle result and may spread onto the plateau.",
        ],
        modelAnswer: "Air mass A is humid after crossing the warm ocean. Moving inland in the cool season it is cooled from below and becomes stable. When it is forced to rise over the Eastern Highlands it cools to its dew point and condenses, producing low cloud, mist and drizzle that may spread onto the plateau.",
        explanation: "Moisture source, cooling from below, uplift, condensation." }),
      P.manual({ label: "(e)", marks: 5, stem: "Explain how Air mass C is modified as it moves north and how it affects the weather in Zimbabwe.",
        points: [
          "It moves over progressively warmer surfaces, so it is warmed from the bottom, which reduces its temperature contrast with the land.",
          "It gains little moisture crossing the dry interior, so it stays dry.",
          "Behind a cold front it reaches Zimbabwe as cold, dry air with a clear sky.",
          "Clear skies allow rapid cooling by radiation at night, giving frost on the highveld.",
          "The temperature may fall sharply when the cold front arrives, causing a cold snap that lasts a few days.",
        ],
        modelAnswer: "As the cold air moves north over warmer land, its lower layers are warmed, but it gains little moisture, so it remains dry. It arrives behind a cold front as cold, dry air with clear skies. At night the clear sky lets the ground cool rapidly, so frost forms on the highveld, and temperatures fall sharply for a few days.",
        explanation: "Modification reduces but does not remove the cold, dry character of the air." }),
    ], explanation: "Identify the air masses and explain their effects on Zimbabwe's weather." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which air masses control the seasonal weather of Zimbabwe.",
    hints: ["Describe the air masses of the hot-wet, cool-dry and hot-dry periods.", "Then consider other controls (relief, ITCZ, altitude) and judge."],
    points: [
      "Hot wet season: moist Indian Ocean and Congo air converge along the Congo Air Boundary, giving rain and thunderstorms.",
      "Cool dry season: stable air under the subtropical anticyclone brings dry weather and frost; cold air behind fronts causes cold snaps.",
      "Hot dry season: dry continental air gives clear skies and very high daytime temperatures before the rains.",
      "Tropical maritime air brings cool, misty drizzle (guti) in the cool season.",
      "Relief affects how air masses behave: the Eastern Highlands force moist air to rise and cause high rainfall, with a rain shadow in the lowveld.",
      "Altitude controls temperature independently of air masses (the highveld is cooler than the lowveld).",
      "The ITCZ, tropical cyclones and El Niño also affect rainfall totals and timing.",
      "Judgement: air masses are the main control of seasonal character, but relief, altitude and larger-scale systems modify their effect, so they explain the pattern only in combination.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Air masses largely determine Zimbabwe's seasons. In summer moist Indian Ocean and Congo air converge and give heavy rain and thunderstorms. In the cool season stable air under a subtropical anticyclone brings clear days and frosty nights, interrupted by cold snaps behind fronts and by cool, misty weather when moist maritime air is lifted. Before the rains, hot dry continental air gives clear skies and high temperatures. However, relief and altitude also control the weather: the Eastern Highlands receive much more rain and the lowveld is hotter than the highveld whatever air mass is present, and systems such as the ITCZ, tropical cyclones and El Niño change the totals from year to year. I conclude that air masses are the main control of the character of the seasons, but their effects are modified by relief, altitude and larger systems.",
    wordLimit: { max: 300 }, explanation: "Describe the air masses for each season, then weigh other controls." });

  b.card("DEFINITION", "Air mass", "A large body of air with similar temperature and humidity across it, acquired in a source region.");
  b.card("CONCEPT", "Air mass symbols", "c = continental (dry), m = maritime (moist); E equatorial, T tropical, P polar. So cT is hot and dry; mT is warm and moist; cP is cold and dry.");
  b.card("CONCEPT", "Air mass modification", "Heating from below makes air unstable (showers); cooling from below makes it stable (fog, stratus); crossing seas adds moisture; crossing mountains removes it.");
  b.card("DEFINITION", "Depression (cyclone)", "Low pressure system: air converges and rises; cloud, rain and strong winds. Southern hemisphere circulation is clockwise.");
  b.card("DEFINITION", "Anticyclone", "High pressure system: air descends and spreads out; clear, dry, light winds. Southern hemisphere circulation is anticlockwise.");
  b.card("FORMULA", "Pressure gradient", "Pressure difference (hPa) ÷ distance (km) × 100 = hPa per 100 km. Steeper gradient means stronger wind.");
  b.card("CONCEPT", "Cold front weather", "Heavy rain or showers as it passes; then temperature falls sharply, pressure rises and the sky clears.");
  b.card("FACT", "Guti", "Cool, misty drizzle on the Zimbabwean plateau, caused by moist Indian Ocean air lifted and cooled.");
  b.card("FACT", "Air masses affecting Zimbabwe", "Tropical maritime (Indian Ocean), equatorial/Congo air (summer rain), tropical continental (hot dry), cold dry air behind fronts (cool season).");
});
