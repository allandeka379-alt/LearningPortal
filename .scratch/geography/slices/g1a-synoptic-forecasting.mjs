// Slice G1a: synoptic charts and weather forecasting.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.weather.synoptic-forecasting", { file: "weather/synoptic-forecasting", keyPrefix: "weather.synoptic-forecasting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does an **isobar** on a weather map join?",
    options: [
      ["Places with the same air pressure", "Correct: isobars join points of equal (sea-level) pressure."],
      ["Places with the same temperature", "Lines of equal temperature are isotherms."],
      ["Places with the same rainfall", "Lines of equal rainfall are isohyets."],
      ["Places with the same height", "Lines of equal height are contours."],
    ],
    answer: "A",
    explanation: "An **isobar** joins places with equal air pressure. Isotherms join equal temperature, isohyets equal rainfall and contours equal height.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a station model, the station circle is **completely shaded**. What does this show?",
    options: [
      ["The sky is overcast: 8 oktas of cloud", "Correct: full shading means the whole sky is covered."],
      ["The sky is clear: 0 oktas of cloud", "A clear sky is shown by an empty circle."],
      ["Half the sky is covered: 4 oktas", "Four oktas is shown by a half-shaded circle."],
      ["The wind is calm at the station", "Calm is shown by a second circle drawn around the station, not by shading."],
    ],
    answer: "A",
    explanation: "Cloud cover is shown by how much of the circle is shaded: empty = 0 oktas, half = 4 oktas, full = 8 oktas (overcast).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On a synoptic chart, the wind shaft at a station points to the **south-east** and has one full feather and one half feather. What is the wind?",
    options: [
      ["From the south-east at 15 knots", "Correct: the shaft points to where the wind comes from; 10 + 5 = 15 knots."],
      ["From the north-west at 15 knots", "The shaft points to the source of the wind, so this reverses the direction."],
      ["From the south-east at 11 knots", "A full feather is 10 knots and a half feather 5 knots, so the total is 15, not 11."],
      ["From the north-west at 6 knots", "Both the direction and the speed are wrong: from the south-east at 15 knots."],
    ],
    answer: "A",
    explanation: "The shaft points to the direction the wind blows **from** (south-east). Speed: full feather = 10 knots, half feather = 5 knots, total 15 knots.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What weather is usually associated with a **high-pressure system (anticyclone)** over Zimbabwe in June?",
    options: [
      ["Clear skies, light winds and cold nights with possible frost", "Correct: sinking air prevents cloud; clear calm nights lose heat fast."],
      ["Thick cloud, heavy rain and thunderstorms", "Thick cloud and storms come with rising air in low pressure."],
      ["Strong winds and continuous drizzle all day", "Highs have widely spaced isobars (light winds) and dry, sinking air."],
      ["Hot, humid afternoons with heavy convectional rain", "Convectional storms belong to the hot wet season, not a winter high."],
    ],
    answer: "A",
    explanation: "In a high, air **sinks**, warms and dries, so cloud does not form. With clear skies and light winds, heat escapes at night, giving cold nights and frost in low-lying places, and sunny days.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which front symbol is a line with **semicircles** on one side?",
    options: [
      ["Warm front", "Correct: semicircles show a warm front, pointing in the direction it moves."],
      ["Cold front", "A cold front has triangles."],
      ["Occluded front", "An occluded front has triangles and semicircles alternating on the same side."],
      ["Isobar", "An isobar is a plain line labelled with a pressure value."],
    ],
    answer: "A",
    explanation: "Warm front: semicircles. Cold front: triangles. Occluded front: triangles and semicircles alternating on the same side.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "On a synoptic chart, where would the **strongest winds** be found?",
    options: [
      ["Where the isobars are closest together", "Correct: close isobars mean a steep pressure gradient and strong winds."],
      ["At the centre of a high, where pressure is greatest", "The centre of a high usually has light or calm winds."],
      ["Where the isobars are furthest apart", "Widely spaced isobars mean a gentle gradient and light winds."],
      ["Wherever the pressure is exactly 1013 hPa", "Wind speed depends on the change in pressure over distance, not on the pressure value."],
    ],
    answer: "A",
    explanation: "Wind speed depends on the **pressure gradient**: how quickly pressure changes over a distance. Close isobars mean a big change over a short distance and therefore strong winds.",
    hints: ["Wind blows because of a difference in pressure.", "Where does pressure change most over a short distance?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the **southern hemisphere**, how does the wind blow around a centre of low pressure?",
    options: [
      ["Clockwise, spiralling inwards", "Correct: in the southern hemisphere winds turn clockwise into a low."],
      ["Anticlockwise, spiralling inwards", "This is the pattern around a low in the northern hemisphere."],
      ["Clockwise, spiralling outwards", "Air spirals into a low, not out of it; outward spirals belong to highs."],
      ["Straight from the centre in all directions", "Air moves into a low, and the Earth's rotation turns it, so it does not blow straight out."],
    ],
    answer: "A",
    explanation: "Air flows **into** a low and is turned by the Earth's rotation. In the southern hemisphere this gives a **clockwise** inward spiral; around a high the air spirals out anticlockwise. The northern hemisphere is the reverse.",
    hints: ["Air moves from high to low pressure, so it flows into a low.", "The southern hemisphere is the opposite of the northern."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which present-weather symbol on a station model means **drizzle**?",
    options: [
      ["A comma", "Correct: a comma is the symbol for drizzle."],
      ["A dot", "A dot means rain."],
      ["A star (asterisk)", "A star means snow."],
      ["Three horizontal lines", "Three horizontal lines mean fog or mist."],
    ],
    answer: "A",
    explanation: "Present weather: dot = rain, comma = drizzle, star = snow, triangle = hail, three lines = fog or mist.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **main weakness** of using indigenous indicators, such as new leaves on trees, to forecast the rains?",
    options: [
      ["They cannot give exact dates or rainfall amounts", "Correct: they show general signs, not measured amounts or dates."],
      ["They are too expensive for rural farmers", "They cost nothing, which is one of their strengths."],
      ["They can only be used with a computer model", "Indigenous indicators are observed directly in nature."],
      ["They are understood only by trained meteorologists", "They are known locally and passed on by elders; that is a strength."],
    ],
    answer: "A",
    explanation: "Indigenous indicators are free, local and widely understood, but they are qualitative: they cannot give exact rainfall amounts or dates, and their reliability varies from place to place.",
    hints: ["Two of the options are actually strengths.", "What does a modern forecast give that a natural sign cannot?"],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Isobars on a chart are drawn every 4 hPa. A low has a central isobar of 1004 hPa. What is the value of the **third** isobar outward from the centre (the centre isobar is the first)?",
    value: 1012, unit: "hPa",
    wrong: [1016, 996],
    explanation: "In a low, pressure rises outwards. First isobar 1004, second 1008, third 1012 hPa.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "On a station model the wind shaft has **two full feathers and one half feather**. What wind speed does it show, in knots?",
    value: 25,
    wrong: [3, 21],
    explanation: "Full feather = 10 knots, half feather = 5 knots: 2 × 10 + 5 = 25 knots.",
    hints: ["A full feather is worth 10 knots.", "A half feather is worth half of that."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A station circle is shaded for **one quarter** of its area. How many oktas of cloud does this show?",
    value: 2,
    wrong: [4, 1],
    explanation: "The sky is divided into 8 oktas. One quarter of 8 = 2 oktas.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In a low-pressure system air {{blank:a}}, so cloud and rain are likely. In a high-pressure system air {{blank:b}}, so skies are usually clear.",
    blanks: [
      { id: "a", accepted: ["rises"], choices: ["rises", "sinks"] },
      { id: "b", accepted: ["sinks"], choices: ["rises", "sinks"] },
    ],
    explanation: "Rising air cools and its water vapour condenses into cloud (lows). Sinking air warms and dries, so clouds evaporate (highs).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each user with the way a weather forecast helps them.",
    pairs: [
      ["A farmer near Chinhoyi", "Deciding when to plant after the first effective rains"],
      ["A pilot landing at Harare", "Knowing the wind, visibility and thunderstorm risk"],
      ["A fisherman on Lake Kariba", "Avoiding sudden storms that raise dangerous waves"],
      ["The Civil Protection Unit", "Moving people to safety before a cyclone or flood"],
    ],
    explanation: "Forecasts matter for farming (planting dates), aviation (safe landing), boating (storm waves) and disaster management (early warnings and evacuation).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "On a synoptic chart, a cold front is shown as a line with triangles.",
    answer: true,
    explanation: "True. Triangles mark a cold front; semicircles mark a warm front.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Widely spaced isobars on a synoptic chart show strong winds.",
    answer: false,
    explanation: "False. Widely spaced isobars mean a gentle pressure gradient and **light** winds. Strong winds go with closely spaced isobars.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the weather map that shows the weather conditions over a large area at one time, using isobars and standard symbols.",
    accepted: ["synoptic chart", "a synoptic chart", "synoptic map", "synoptic weather chart", "synoptic weather map", "weather chart"],
    wrong: ["climate graph", "isobar"],
    explanation: "A **synoptic chart** (weather map) shows the weather at many stations at the same time.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why weather forecasts are important to **two** different groups of people in Zimbabwe.",
    points: [
      "Group 1 named (for example, farmers).",
      "How the forecast helps group 1 (for example, timing planting, spraying or harvesting; choosing crops for a dry season).",
      "Group 2 named (for example, pilots, boat operators on Kariba, disaster managers, tourism operators).",
      "How the forecast helps group 2 (for example, safe flights, avoiding storms, early warning and evacuation).",
    ],
    modelAnswer: "Farmers use forecasts to decide when to plant: if a dry spell is forecast they can wait, so seed and fertiliser are not wasted. Disaster managers use warnings of heavy rain or cyclones to move people away from flood-prone areas before the storm arrives.",
    explanation: "Each group needs a specific use of the forecast, not just 'it helps them'.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Indigenous knowledge is as useful as modern scientific forecasts for small-scale farmers in Zimbabwe.\" To what extent do you agree?",
    points: [
      ["Describes indigenous indicators with examples (trees coming into leaf, birds, insects, ants, moon halo, wind and heat).", 1],
      ["Strengths of indigenous knowledge: free, local, understood, trusted, available without technology.", 1],
      ["Weaknesses: qualitative, not exact on dates or amounts, reliability varies, may be affected by changing climate, knowledge being lost.", 1],
      ["Strengths and limits of scientific forecasts: measured data, seasonal outlooks and warnings, but may not reach remote farmers or be too general for a small area.", 2],
      ["Reasoned conclusion, for example that combining both is most useful.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Many farmers watch signs such as trees putting out new leaves, the arrival of migrant birds or ants carrying eggs to higher ground. These indicators cost nothing, need no radio or phone and are understood by the whole community, so they are useful where official forecasts do not reach. However, they only show that rain is coming, not how much or exactly when, and some signs vary between areas or may change as the climate warms.\n\nScientific forecasts from the Meteorological Services Department use measured data and computer models, give seasonal outlooks (for example a likely drier season) and warn of storms and dry spells. Their weakness is that they may be too general for one village and can fail to reach farmers without phones or radios.\n\nI partly agree: indigenous knowledge is valuable and trusted, but it is less precise. The most useful approach is to combine both, as many extension workers now encourage.",
    explanation: "A balanced answer weighs both sources and reaches a supported judgement.",
    hints: ["Give strengths and weaknesses of each kind of forecast.", "Your conclusion can be 'partly': say why."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A simplified synoptic chart of southern Africa for a day in January (fictional) shows:\n\n- a low of 1002 hPa centred over northern Zambia, with isobars every 2 hPa;\n- a high of 1024 hPa over the ocean south-east of South Africa;\n- a station at Mutare: circle three-quarters shaded, shaft pointing north-east with one full feather, two dots to the left, temperature 24 °C;\n- a station at Bulawayo: circle one-quarter shaded, shaft pointing east with two full feathers, no present-weather symbol, temperature 29 °C.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many oktas of cloud were recorded at Mutare?", value: 6, wrong: [3], explanation: "Three-quarters of 8 oktas = 6 oktas." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the present weather at Mutare.", accepted: ["rain", "raining", "it was raining", "light rain", "continuous rain"], wrong: ["drizzle"], explanation: "Dots are the symbol for rain." }),
      P.num({ label: "(c)", marks: 1, stem: "State the wind speed at Bulawayo in knots.", value: 20, wrong: [2], explanation: "Two full feathers = 2 × 10 = 20 knots." }),
      P.mcq({ label: "(d)", marks: 1, stem: "From which direction was the wind blowing at Bulawayo?", options: [
        ["East", "Correct: the shaft points to where the wind comes from."],
        ["West", "This reads the shaft as pointing downwind."],
        ["North-east", "North-east is the direction at Mutare, not Bulawayo."],
        ["South", "The shaft points east, so the wind is from the east."],
      ], answer: "A", explanation: "The shaft points east, so this is an easterly wind." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why Mutare was cloudier and wetter than Bulawayo on this day.", points: [
        "Moist air from the north-east (or from the Indian Ocean) was reaching Mutare.",
        "Air was forced to rise over the Eastern Highlands (relief), cooling and condensing to form cloud and rain.",
      ], explanation: "Credit moisture source and a lifting mechanism (relief, or nearness to the low/convergence). Bulawayo, further west and lower, was drier." }),
    ],
    hints: ["Use the station-model keys: shading, dots, feathers, shaft direction.", "Think about where moist air comes from and what makes it rise near Mutare."],
    explanation: "A practice question in decoding station models and linking them to the pattern of pressure.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A rural community in Masvingo Province (fictional survey) listed the signs elders use to judge that the rainy season is near: trees coming into new leaf, swallows arriving, ants carrying eggs uphill, hot still nights, and a halo around the moon.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which sign in the list can be explained by thin, high cloud that often arrives ahead of rain?", options: [
        ["A halo around the moon", "Correct: a halo forms when moonlight passes through thin, high ice-crystal cloud."],
        ["Trees coming into new leaf", "Leafing is linked to heat and day length, not to cloud."],
        ["Swallows arriving", "Bird migration follows the seasons, not a particular cloud."],
        ["Ants carrying eggs uphill", "This is animal behaviour, not an effect of cloud."],
      ], answer: "A", explanation: "Halos are caused by ice crystals in thin, high cloud; such cloud often spreads ahead of rain-bearing systems." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** advantages of indigenous forecasting for this community.", points: [
        "It is free or cheap (no equipment, radio or phone needed).",
        "It is local, understood and trusted by the community (passed on by elders).",
      ], explanation: "Other valid points: available in remote areas; part of cultural heritage." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the community should also use the official seasonal forecast.", points: [
        "Official forecasts are based on measured data and models, so they are more precise.",
        "They can give the expected amount of rain or likelihood of a dry season (seasonal outlook), which indicators cannot.",
        "They give warnings of hazards (dry spells, storms, floods), helping farmers choose crops and planting dates.",
      ], explanation: "Credit the precision of measured data, quantitative outlooks and hazard warnings." }),
    ],
    hints: ["Think about cost, trust and who understands the signs.", "What can measured data tell a farmer that a natural sign cannot?"],
    explanation: "Practice in evaluating indigenous and scientific forecasting.",
  });
  b.card("DEFINITION", "Synoptic chart", "A weather map showing the weather over a large area at one time, with station models, isobars and fronts.");
  b.card("DEFINITION", "Isobar", "A line joining places with the same air pressure.");
  b.card("FACT", "Wind feathers on a station model", "Full feather = 10 knots; half feather = 5 knots; pennant (triangle) = 50 knots; circle around station = calm.");
  b.card("CONCEPT", "Close isobars", "Steep pressure gradient: strong winds. Widely spaced isobars: light winds.");
  b.card("CONCEPT", "Highs and lows", "Low: rising air, cloud and rain. High: sinking air, clear dry weather (cold nights and frost in winter).");
  b.card("FACT", "Southern hemisphere wind circulation", "Clockwise inward spiral around a low; anticlockwise outward spiral around a high.");
  b.card("FACT", "Front symbols", "Cold front: triangles. Warm front: semicircles. Occluded front: both, alternating on the same side.");
  b.card("FACT", "Present-weather symbols", "Dot = rain; comma = drizzle; star = snow; triangle = hail; three lines = fog or mist.");
  b.card("CONCEPT", "Indigenous forecasting: strengths and weaknesses", "Strengths: free, local, trusted. Weaknesses: no exact dates or amounts, reliability varies, knowledge being lost.");
});
