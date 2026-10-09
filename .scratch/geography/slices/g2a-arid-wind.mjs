// Slice G2a: arid and semi-arid regions and wind action (ZIMSEC-only concept).
import { concept, P, geographyLevels } from "../lib.mjs";

const RAIN = "| Year | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Rainfall (mm) | 410 | 185 | 520 | 290 | 135 | 360 |";

concept("geo.landforms.arid-wind", { file: "landforms/arid-wind", keyPrefix: "landforms.arid-wind" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which process of wind erosion **removes loose dust and sand** from the ground surface?",
    options: [
      ["Deflation", "Correct: the wind lifts and carries away loose fine material."],
      ["Abrasion", "Abrasion is the sandblasting of rock by grains the wind carries."],
      ["Saltation", "Saltation is a way of transporting sand, by bouncing."],
      ["Exfoliation", "Exfoliation is a weathering process, not wind erosion."],
    ],
    answer: "A",
    explanation: "**Deflation** removes loose fine material, leaving hollows and stony desert pavement.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Sand grains that move by **bouncing** along the ground in short hops are transported by:",
    options: [
      ["saltation", "Correct: grains are lifted, carried a short distance and fall back."],
      ["suspension", "Suspension carries fine dust high in the air."],
      ["surface creep", "Surface creep rolls and pushes larger grains along the ground."],
      ["solution", "Solution is a river process; the wind cannot carry dissolved material."],
    ],
    answer: "A",
    explanation: "Wind transport: **suspension** (dust), **saltation** (bouncing sand), **surface creep** (rolling larger grains).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which direction do the horns of a barchan dune point?",
    options: [
      ["Downwind", "Correct: the edges move faster than the centre and run ahead."],
      ["Upwind", "The gentle windward slope faces upwind; the horns trail downwind."],
      ["Across the wind at right angles", "The crescent lies across the wind, but its horns point downwind."],
      ["In no fixed direction", "Barchans form under a steady wind, so their shape is regular."],
    ],
    answer: "A",
    explanation: "A **barchan** is a crescent with a gentle windward slope, a steep slip face and **horns pointing downwind**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the Namib Desert so dry even though it lies beside the Atlantic Ocean?",
    options: [
      ["The cold Benguela current chills the air so it cannot rise and form rain clouds", "Correct: the air is stable; it brings fog but little rain."],
      ["It lies in the rain shadow of the Drakensberg mountains on Africa's east side", "The Drakensberg is far away on the east side of the continent."],
      ["Warm ocean water evaporates too quickly for clouds to form over the land", "Warm water would add moisture and favour rain; the current is cold."],
      ["It lies on the equator, where air sinks and warms all year round", "Air rises at the equator; the Namib lies at about 20-25° S."],
    ],
    answer: "A",
    explanation: "Cold currents cool the lower air, making it **stable**; the Namib gets coastal fog but very little rain. Subtropical high pressure adds to the dryness.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which landform has a hard cap rock lying on **horizontal** layers of softer rock, cut into flat-topped ridges separated by trenches?",
    options: [
      ["Zeugen", "Correct: horizontal hard and soft layers are cut into tabular ridges."],
      ["Yardangs", "Yardangs form where hard and soft bands are vertical and run parallel to the wind."],
      ["Seif dunes", "Seif dunes are sand ridges, not rock."],
      ["Barchans", "Barchans are crescent-shaped sand dunes."],
    ],
    answer: "A",
    explanation: "**Zeugen**: horizontal strata. **Yardangs**: vertical bands parallel to the wind.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which part of Zimbabwe is **semi-arid**?",
    options: [
      ["The south-east lowveld", "Correct: low, hot and dry, in natural region V."],
      ["The Eastern Highlands", "The Eastern Highlands are the wettest part of Zimbabwe."],
      ["The highveld around Harare", "The highveld receives moderate, fairly reliable rain."],
      ["The Nyanga mountains", "Nyanga is part of the wet Eastern Highlands."],
    ],
    answer: "A",
    explanation: "Semi-arid Zimbabwe includes the south-east lowveld, the Zambezi valley and south-western Matabeleland.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a rock pedestal have a narrow base and a wider top?",
    options: [
      ["Sand grains carried by the wind are concentrated close to the ground, so abrasion is greatest there", "Correct: saltating sand rarely rises more than 1-2 m."],
      ["The upper part of the rock is softer and has been worn away more slowly over time", "Softer rock would be worn faster, not more slowly."],
      ["Deflation lifts dust from the top of the rock and drops it around the base, where it protects the lower part", "Deflation removes loose material; it does not build up rock."],
      ["Rain falling on the top of the rock is evaporated before it can weather it", "This does not explain undercutting at the base."],
    ],
    answer: "A",
    explanation: "Most sand moves by **saltation** within about 1-2 m of the ground, so **abrasion** undercuts the base.",
    hints: ["How high does bouncing sand travel?", "Where is sandblasting strongest?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Seif dunes are best described as:",
    options: [
      ["long sand ridges parallel to the wind","Correct: they form where winds come from two main directions."],
      ["crescent-shaped dunes with horns pointing downwind", "That is a barchan."],
      ["flat-topped hills of rock with a hard cap", "That describes a mesa."],
      ["ridges of hard rock separated by grooves", "That describes yardangs (rock, not sand)."],
    ],
    answer: "A",
    explanation: "**Seif** (Arabic for sword) dunes are long, sharp-crested ridges parallel to the prevailing wind.",
    hints: ["Seif means 'sword'.", "Are they made of sand or rock?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fictional semi-arid station recorded these annual rainfall totals over five years: 280 mm, 350 mm, 190 mm, 430 mm and 250 mm. Calculate the mean annual rainfall.",
    value: 300, unit: "mm",
    wrong: [240, 1500],
    explanation: "Total = 280 + 350 + 190 + 430 + 250 = 1,500 mm; 1,500 ÷ 5 = 300 mm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A barchan dune in a fictional desert moves downwind at 12 m per year. A road lies 150 m downwind of its slip face. How many years will it take the dune to reach the road?",
    value: 12.5, unit: "years", tol: 0.05,
    wrong: [1800, 138],
    explanation: "150 ÷ 12 = 12.5 years.",
    workedSolution: "1. Time = distance ÷ speed.\n2. = 150 ÷ 12 = 12.5 years.",
    hints: ["Distance ÷ rate.", "Both are in metres."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "Annual rainfall at another fictional semi-arid station over six years was 340, 120, 455, 260, 205 and 380 mm. Calculate the range of rainfall as a percentage of the mean. Give your answer to the nearest whole number.",
    value: 114, unit: "%", tol: 0.5,
    wrong: [335, 88],
    explanation: "Range = 455 − 120 = 335 mm. Mean = 1,760 ÷ 6 = 293.3 mm. 335 ÷ 293.3 × 100 = 114.2 %, about 114 %. Such a large figure shows very unreliable rainfall.",
    workedSolution: "1. Range = 455 − 120 = 335 mm.\n2. Mean = 1,760 ÷ 6 = 293.33 mm.\n3. 335 ÷ 293.33 × 100 = 114.2 %.\n4. To the nearest whole number: 114 %.",
    hints: ["Find the range and the mean first.", "Divide the range by the mean and multiply by 100."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the steep-sided, usually dry valley in a desert that is cut by occasional flash floods.",
    accepted: ["wadi", "a wadi", "wadis", "arroyo", "an arroyo"],
    wrong: ["yardang"],
    explanation: "A **wadi** (called an arroyo in the Americas).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about wind transport.",
    template: "Fine dust is carried high in the air by {{blank:a}}. Sand grains bounce along by {{blank:b}}. Larger grains are rolled and pushed along by {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["suspension"], wrong: "saltation" },
      { id: "b", accepted: ["saltation"], wrong: "suspension" },
      { id: "c", accepted: ["surface creep", "creep", "traction"], wrong: "deflation" },
    ],
    explanation: "Suspension (dust), saltation (sand), surface creep (coarse grains).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of aridity to an example.",
    pairs: [
      ["Cold ocean current", "Namib Desert"],
      ["Subtropical high pressure", "Sahara Desert"],
      ["Continentality (far from the sea)", "Gobi Desert"],
      ["Rain shadow of mountains", "Leeward side of a mountain range"],
    ],
    explanation: "Benguela current → Namib; sinking air at about 30° N → Sahara; distance from the sea → Gobi; descending air beyond mountains → rain shadow.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: in most deserts, running water from occasional storms shapes the land as much as, or more than, the wind does.",
    answer: true,
    feedbackTrue: "Correct: flash floods cut wadis and build alluvial fans; many features also date from wetter periods.",
    feedbackFalse: "Water is very important in deserts: rare but violent floods cut wadis, build alluvial fans and wear back pediments.",
    explanation: "Wind sorts and moves loose material, but water does much of the erosion in deserts.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** characteristics of the climate of semi-arid regions.",
    points: [
      "Low rainfall (often about 250-500 mm a year)",
      "Rainfall is unreliable / falls in short heavy storms / long dry season",
      "High temperatures and evaporation / large daily temperature range",
    ],
    modelAnswer: "Rainfall is low, often 250-500 mm a year, and very unreliable, falling in short heavy storms in one season. Temperatures are high by day, so evaporation is high, and clear skies give a large daily temperature range.",
    explanation: "Three distinct climatic characteristics.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the formation of a barchan dune.",
    points: [
      "Forms where wind blows mainly from one direction and sand supply is limited",
      "Sand accumulates against an obstacle; it is pushed up the gentle windward slope by saltation",
      "Sand avalanches down the steep leeward slip face",
      "The lower edges move faster, forming horns pointing downwind; the dune migrates downwind",
    ],
    modelAnswer: "A barchan forms where a steady wind blows from one direction over a limited supply of sand. Sand collects behind an obstacle and is driven up the gentle windward slope by saltation. At the crest it avalanches down the steep slip face. The thinner edges move faster than the centre, so horns form and point downwind, and the whole crescent migrates downwind.",
    explanation: "Conditions, windward slope, slip face, horns.",
    hints: ["What wind conditions are needed?", "Why do the edges get ahead of the middle?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Wind is the most important agent shaping desert landscapes.\" To what extent do you agree?",
    points: [
      "Wind erosion: deflation (hollows, desert pavement) and abrasion (rock pedestals, zeugen, yardangs)",
      "Wind deposition: barchan and seif dunes, sand seas",
      "Water: flash floods cut wadis, build alluvial fans and playas",
      "Water / weathering: sheet floods and weathering form pediments, mesas, buttes and inselbergs",
      "Many features formed in wetter past climates",
      "Judgement, e.g. wind dominates in sandy areas, but water and weathering shape most desert relief",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Wind is clearly important. Deflation removes fine material, leaving hollows and stony desert pavement, and abrasion near the ground undercuts rocks into pedestals and carves zeugen and yardangs. Wind also builds barchan and seif dunes and great sand seas. However, rare but violent storms produce flash floods that cut wadis, spread alluvial fans and fill playas, and sheet floods together with weathering wear back the slopes of mesas, buttes and inselbergs to form pediments. Many desert landforms were also shaped when the climate was wetter. I only partly agree: wind is the most important agent in sandy deserts and for small-scale features, but water and weathering shape most of the larger relief.",
    explanation: "Credit balanced evidence on wind and water with a supported judgement.",
    hints: ["List landforms made by wind and by water.", "Which shapes larger landforms?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows annual rainfall over six years at a fictional semi-arid station.\n\n${RAIN}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which year was the driest?", accepted: ["5", "year 5"], wrong: ["2"], explanation: "Year 5, with 135 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "How many of the six years received less than 300 mm?", value: 3, wrong: [2], explanation: "Years 2 (185), 4 (290) and 5 (135): three years." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement best describes the rainfall?", options: [
        ["Low and highly variable from year to year", "Correct: from 135 mm to 520 mm."],
        ["High and reliable", "No year reached even 600 mm, and totals vary widely."],
        ["Low but almost the same every year, at about 300 mm", "Totals vary by a factor of almost four, from 135 mm to 520 mm."],
        ["Increasing steadily every year", "Totals go up and down with no steady trend."],
      ], answer: "A", explanation: "Low totals and a large range show unreliable rainfall." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** problems such rainfall causes for farmers.", points: [
        "Crop failure / low yields in dry years (e.g. maize needs more water)",
        "Shortage of grazing and water for livestock, so animals die or lose condition",
        "Food insecurity / loss of income / need for food aid or costly irrigation",
      ], modelAnswer: "In dry years such as year 5, rain-fed maize fails. Grazing and water for cattle run short, so animals weaken or die. Families lose food and income and may need food aid or expensive irrigation.", explanation: "Three distinct problems." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why wind erosion is more likely in such an area during a dry year.", points: [
        "Vegetation dies back, leaving soil bare",
        "Dry, loose soil particles are easily lifted (deflation)",
      ], modelAnswer: "In a dry year grass and crops die back, leaving bare ground, and the dry, loose topsoil is easily lifted by the wind.", explanation: "Bare and dry soil." }),
    ],
    hints: ["Look for the smallest and largest totals.", "What protects soil from the wind?"],
    explanation: "Practice in interpreting semi-arid rainfall data.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Description of a fictional desert landscape: in the west, sharp sand ridges run for many kilometres from north-east to south-west. In the centre, crescent-shaped dunes stand on a stony plain, their horns pointing south-west. In the east, a flat-topped hill with a hard sandstone cap rises 80 m above the plain; it is 1.5 km across. A dry valley with steep sides leads from it to a fan of gravel.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "From which direction does the main wind blow over the crescent dunes?", options: [
        ["North-east", "Correct: the horns point downwind (south-west), so the wind comes from the north-east."],
        ["South-west", "The horns point south-west, which is the downwind direction."],
        ["North-west", "The dune shape shows a north-east to south-west wind."],
        ["South-east", "The dune shape shows a north-east to south-west wind."],
      ], answer: "A", explanation: "Barchan horns point downwind." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the sand ridges in the west.", accepted: ["seif dunes", "seif dune", "seifs", "seif", "longitudinal dunes", "linear dunes"], wrong: ["barchans"], explanation: "Long ridges parallel to the wind: seif dunes." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the flat-topped hill in the east (it is much wider than it is high).", accepted: ["mesa", "a mesa"], wrong: ["butte"], explanation: "Wider than high with a cap rock: a mesa." }),
      P.manual({ label: "(d)", marks: 2, stem: "Name the dry valley and the gravel fan, and state what formed them.", points: [
        "Wadi and alluvial fan",
        "Formed by flash floods (running water) after rare heavy storms",
      ], modelAnswer: "The valley is a wadi and the fan is an alluvial fan, both formed by flash floods after rare heavy storms.", explanation: "Water features in a desert." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the stony plain beneath the crescent dunes may have formed.", points: [
        "Deflation by the wind removed fine particles (dust and sand)",
        "Heavier pebbles and stones too large to be lifted were left behind",
        "They form a protective layer (desert pavement / reg) that limits further deflation",
      ], modelAnswer: "The wind removed fine dust and sand by deflation, leaving the pebbles and stones that were too heavy to move. These now cover the surface as a desert pavement that protects the material below from further deflation.", explanation: "Deflation leaves a lag of stones." }),
    ],
    hints: ["Horns point downwind.", "Mesa versus butte: compare width and height."],
    explanation: "Practice in recognising desert landforms from a description.",
  });

  b.card("DEFINITION", "Arid region", "An area with very low rainfall (often under about 250 mm a year), very high evaporation and sparse vegetation.");
  b.card("DEFINITION", "Semi-arid region", "An area with low, unreliable rainfall (often about 250-500 mm a year), a long dry season and drought-resistant vegetation.");
  b.card("DEFINITION", "Deflation", "Removal of loose dust and sand by the wind, leaving hollows and desert pavement.");
  b.card("DEFINITION", "Abrasion (wind)", "Sandblasting of rock by grains carried in the wind; strongest within about 1-2 m of the ground.");
  b.card("CONCEPT", "Wind transport", "Suspension (fine dust, high in the air), saltation (sand bouncing in hops), surface creep (larger grains rolled along).");
  b.card("CONCEPT", "Barchan vs seif", "Barchan: crescent across the wind, horns point downwind, one main wind direction. Seif: long ridge parallel to the wind, winds from two directions.");
  b.card("CONCEPT", "Causes of hot deserts", "Subtropical high pressure (sinking air), cold ocean currents, rain shadow and continentality.");
  b.card("VOCABULARY", "Zeugen and yardangs", "Zeugen: flat-topped ridges on horizontal hard and soft layers. Yardangs: ridges on vertical bands parallel to the wind.");
  b.card("VOCABULARY", "Mesa and butte", "Mesa: flat-topped hill with a cap rock, wider than high. Butte: smaller remnant, higher than wide.");
  b.card("FACT", "Semi-arid Zimbabwe", "The south-east lowveld (Save-Limpopo), the Zambezi valley and south-western Matabeleland (natural region V and drier parts of IV).");
});
