// Slice G2b: drainage basins, the water cycle, the Bradshaw model, river regimes and hydrographs.
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

const HYD = "**Table 1: Rainfall and discharge after a storm in a fictional basin**\n\n| Hours from start | 0 | 3 | 6 | 9 | 12 | 15 | 18 | 21 | 24 |\n|---|---|---|---|---|---|---|---|---|---|\n| Rainfall in previous 3 hours (mm) | 2 | 16 | 11 | 3 | 0 | 0 | 0 | 0 | 0 |\n| Discharge (m³/s) | 4 | 5 | 9 | 17 | 24 | 20 | 14 | 9 | 6 |";

const SITES = "**Table 2: Channel measurements at two fictional sites on the same river**\n\n| Site | Distance from source (km) | Width (m) | Mean depth (m) | Mean velocity (m/s) |\n|---|---|---|---|---|\n| 1 | 2 | 3 | 0.2 | 0.3 |\n| 2 | 25 | 10 | 0.6 | 0.5 |";

concept("geo.rivers.drainage-basin", { file: "rivers/drainage-basin", keyPrefix: "rivers.drainage-basin" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to the boundary of a drainage basin?",
    options: [
      ["Watershed", "Correct: the line of high ground separating one basin from the next."],
      ["Confluence", "A confluence is where two rivers join, inside a basin."],
      ["Floodplain", "A floodplain is flat land beside a river, not a boundary."],
      ["Tributary", "A tributary is a smaller river joining a larger one."],
    ],
    answer: "A",
    explanation: "The **watershed** is the edge of a drainage basin. Rain falling on either side of it drains to different rivers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **output** from a drainage basin?",
    options: [
      ["Transpiration", "Correct: water vapour leaves the basin from plant leaves."],
      ["Infiltration", "Infiltration is a flow from the surface into the soil."],
      ["Precipitation", "Precipitation is the input to the basin."],
      ["Groundwater", "Groundwater is a store inside the basin."],
    ],
    answer: "A",
    explanation: "Outputs are evaporation, transpiration and river discharge leaving the basin. Precipitation is the input; groundwater is a store; infiltration is a flow.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **throughflow**?",
    options: [
      ["Water moving sideways downslope through the soil", "Correct: it travels through the soil towards the river."],
      ["Water moving over the ground surface to a river", "That is overland flow (surface run-off)."],
      ["Water soaking downward from the soil into rock", "That is percolation."],
      ["Water dripping from leaves down onto the ground", "That is part of interception loss and throughfall."],
    ],
    answer: "A",
    explanation: "**Throughflow** is lateral movement of water through the soil. Overland flow is on the surface; percolation moves water down into the rock.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "According to the Bradshaw model, which channel characteristic **decreases** from source to mouth?",
    options: [
      ["Size of load particles", "Correct: attrition and abrasion make particles smaller and rounder downstream."],
      ["Mean velocity of the flow", "Mean velocity increases because the channel becomes more efficient."],
      ["Discharge of the river", "Discharge increases as tributaries and groundwater add water."],
      ["Depth of the channel", "Depth increases downstream."],
    ],
    answer: "A",
    explanation: "Downstream, discharge, width, depth, velocity and load volume increase; gradient, particle size and bed roughness decrease.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the mean velocity of a river usually **increase** downstream although the gradient becomes gentler?",
    options: [
      ["Less energy is lost to friction in a deeper, smoother channel", "Correct: a smaller share of the water touches the bed and banks."],
      ["Water near the mouth is warmer and so flows more easily", "Temperature has only a tiny effect; channel efficiency is the key."],
      ["Tides pull the water strongly towards the sea", "Tides affect only the last stretch and can even slow the flow."],
      ["Downstream rivers carry less load, so they are lighter", "Load volume increases downstream."],
    ],
    answer: "A",
    explanation: "Upstream, a shallow, boulder-strewn channel loses much energy to friction. Downstream the channel is deeper and smoother relative to its volume, so the flow is more efficient and faster on average.",
    hints: ["Think about how much of the water is in contact with the bed and banks.", "Friction uses up energy."],
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In which months do most rivers on the Zimbabwean highveld carry their **highest** flow?",
    options: [
      ["December to March", "Correct: the main rains fall then and saturate the ground."],
      ["May to August", "This is the cool dry season, when flow is low."],
      ["September to October", "The hot dry season brings the lowest flow of the year."],
      ["April to June", "Flow is falling after the rains have ended."],
    ],
    answer: "A",
    explanation: "Zimbabwe has one rainy season (roughly November to March). Rivers rise once soils are wet, so flow is highest from about December to March.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which basin would most likely produce a **flashy** storm hydrograph (short lag time, high peak)?",
    options: [
      ["A steep, urban basin on impermeable granite", "Correct: rapid overland flow reaches the channel quickly."],
      ["A gentle, forested basin on permeable sandstone", "Interception and infiltration slow the water down."],
      ["A flat basin with deep, dry, sandy soils", "Water infiltrates easily, so the peak is delayed and lower."],
      ["A gentle basin with grass cover and wetlands", "Vegetation and wetlands store water and slow its release."],
    ],
    answer: "A",
    explanation: "Steep slopes, impermeable rock and tarmac or roofs all send water quickly over the surface to the river, giving a short lag time and a high peak.",
    hints: ["Which factors increase overland flow?", "Which factors store or slow water?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the Zambezi at the Victoria Falls usually carry most water around **April**, after Zimbabwe's rains have ended?",
    options: [
      ["Water from rain far upstream is slowed by wide floodplains", "Correct: rain in Angola and Zambia takes weeks to arrive."],
      ["Snow melts on mountains at the source of the river", "There is no snowmelt in the Zambezi's source area."],
      ["Water is released from Lake Kariba at that time", "Kariba is downstream of the falls, so it cannot affect them."],
      ["April is the wettest month of the year at Victoria Falls town", "The local rains peak earlier, around December to February."],
    ],
    answer: "A",
    explanation: "The upper Zambezi drains a huge area of Angola and Zambia. Floodwater spreads over wide floodplains and travels slowly, so the peak reaches the falls weeks after the rains.",
    hints: ["Where does most of the river's water come from?", "Is Kariba upstream or downstream of the falls?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A river channel is 12 m wide with a mean depth of 0.75 m, and the mean velocity is 0.8 m/s. Calculate the discharge.",
    value: 7.2, unit: "m³/s", tol: 0.05,
    wrong: [9, 13.55],
    explanation: "Cross-sectional area = 12 × 0.75 = 9 m². Discharge = 9 × 0.8 = 7.2 m³/s.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In a hydrograph, rainfall peaked at 14:00 on Monday and discharge peaked at 05:00 on Tuesday. Calculate the lag time in hours.",
    value: 15, unit: "h",
    wrong: [9, 19],
    explanation: "From 14:00 Monday to 05:00 Tuesday is 10 h to midnight plus 5 h = 15 hours.",
    workedSolution: "1. 14:00 to 24:00 on Monday = 10 hours.\n2. 00:00 to 05:00 on Tuesday = 5 hours.\n3. Lag time = 10 + 5 = 15 hours.",
    hints: ["Lag time runs from peak rainfall to peak discharge.", "Count the hours to midnight first."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional basin receives 650 mm of rain in a year and loses 520 mm by evapotranspiration. Storage does not change. What **percentage** of the rainfall leaves the basin as river discharge?",
    value: 20, unit: "%",
    wrong: [80, 130],
    explanation: "Discharge = 650 − 520 = 130 mm. 130 ÷ 650 × 100 = 20 %.",
    workedSolution: "1. Water balance: P = Q + E ± ΔS, with ΔS = 0.\n2. Q = 650 − 520 = 130 mm.\n3. Percentage = 130 ÷ 650 × 100 = 20 %.",
    hints: ["Precipitation = discharge + evapotranspiration when storage is unchanged.", "Then express discharge as a percentage of the rainfall."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about basin features.",
    template: "A smaller river that joins a larger one is a {{blank:a}}. The point where two rivers meet is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["tributary"], wrong: "distributary" },
      { id: "b", accepted: ["confluence"], wrong: "watershed" },
    ],
    explanation: "A **tributary** joins the main river at a **confluence**.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each drainage-basin process with its description.",
    pairs: [
      ["Interception", "Rain caught and held on leaves and stems"],
      ["Infiltration", "Water soaking into the soil surface"],
      ["Percolation", "Water moving down from the soil into the rock"],
      ["Overland flow", "Water running across the ground surface"],
      ["Groundwater flow", "Slow movement of water through rock to the river"],
    ],
    explanation: "These five processes move water through the basin from the vegetation to the channel.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A drainage basin is an open system.",
    answer: true,
    explanation: "True. Water enters (precipitation) and leaves (evapotranspiration and discharge), so it is open. The global water cycle as a whole is closed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lag time is measured from the start of the rainfall to the peak discharge.",
    answer: false,
    explanation: "False. Lag time is measured from **peak rainfall** to **peak discharge**.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the river that forms Zimbabwe's southern border with South Africa.",
    accepted: ["Limpopo", "Limpopo River", "the Limpopo", "the Limpopo River"],
    wrong: ["Zambezi"],
    explanation: "The **Limpopo** forms the border with South Africa; Beitbridge stands on it.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3, applies: ZIM,
    stem: "Describe the seasonal nature of water flow in Zimbabwe's rivers.",
    points: [
      "High flow / floods in the rainy season, roughly December to March.",
      "Flow falls after the rains and is very low in the dry season (about July to October).",
      "Many smaller rivers are seasonal: they dry to pools or sandy beds in the dry season (with water still moving in the sand).",
    ],
    modelAnswer: "Most rivers flow strongly and may flood between about December and March, when the summer rains fall. Flow decreases from April, and in the dry season from about July to October many rivers are very low. Smaller rivers such as many in the south are seasonal: they dry up to a line of pools or a sandy bed, although water still moves slowly through the sand.",
    explanation: "Link flow to the rainy season, give months and mention seasonal rivers.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how **two** human activities can shorten the lag time of a river.",
    points: [
      "Activity 1 named (e.g. urbanisation / building roads and roofs).",
      "Explanation 1: impermeable surfaces and drains send water quickly to the river instead of infiltrating.",
      "Activity 2 named (e.g. deforestation / overgrazing / ploughing down slopes).",
      "Explanation 2: less interception and more bare or compacted soil, so more overland flow reaches the channel faster.",
    ],
    modelAnswer: "Urbanisation covers the ground with tarmac and roofs. Rain cannot infiltrate and is carried by gutters and drains straight to the river, so it arrives sooner. Deforestation removes trees that intercept rain; bare soil is compacted by rain splash and more water runs over the surface, again reaching the river quickly and raising the peak.",
    explanation: "Two marks for each activity with its explanation.",
    hints: ["What happens to rain falling on tarmac?", "What do trees do to rain?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Explain how physical factors in a drainage basin affect the shape of a storm hydrograph.",
    points: [
      ["Slope: steep slopes speed overland flow, shortening lag time.", 1],
      ["Rock type: impermeable rock (e.g. granite, clay) limits percolation; permeable rock stores water.", 1],
      ["Soil: thin or saturated soils (after earlier rain) cannot absorb more water; baked dry soils also shed water.", 1],
      ["Vegetation: forest intercepts rain and increases infiltration, lengthening lag time and lowering the peak.", 1],
      ["Basin size/shape and drainage density: small, round basins with many streams give quicker, higher peaks.", 1],
      ["Rainfall intensity and duration: intense storms exceed infiltration capacity; links factors to lag time and peak.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "The shape of a storm hydrograph depends on how quickly rain reaches the channel. Steep slopes make water run off rapidly, shortening the lag time and raising the peak, whereas gentle slopes slow it. Impermeable rocks such as granite allow little percolation, so more water flows over or through the soil quickly; permeable rocks store water and release it slowly as base flow. If the soil is already saturated from earlier rain, or baked hard at the start of the Zimbabwean rainy season, infiltration is low and overland flow increases. Dense vegetation intercepts rain and its roots help water infiltrate, giving a longer lag time and lower peak. Small, round basins with a high drainage density deliver water to the gauging point quickly. Finally, intense convectional storms exceed the infiltration capacity of the soil, giving a flashier hydrograph than steady light rain.",
    explanation: "Credit each factor explained in terms of lag time and peak discharge.",
    hints: ["Think of anything that speeds water to the channel or stores it.", "Mention both lag time and peak discharge."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1, which shows a storm in a fictional basin.\n\n${HYD}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the peak discharge.", value: 24, unit: "m³/s", wrong: [16], explanation: "The highest discharge is 24 m³/s at 12 hours." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the lag time in hours (from the peak rainfall reading to the peak discharge reading).", value: 9, unit: "h", wrong: [12], explanation: "Peak rainfall at 3 h; peak discharge at 12 h; 12 − 3 = 9 hours." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the total rainfall during the storm.", value: 32, unit: "mm", wrong: [30], explanation: "2 + 16 + 11 + 3 = 32 mm." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe the shape of the falling limb compared with the rising limb.", points: [
        "The falling limb is less steep / discharge falls more slowly than it rose.",
        "Data: rose from 5 to 24 m³/s in 9 hours but took 12 hours to fall from 24 to 6 m³/s (still above the starting 4 m³/s at 24 h).",
      ], explanation: "Water held in soil and rock drains out slowly after the storm." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest **three** reasons why the lag time in this basin might become shorter if the area were built up.", points: [
        "Impermeable roofs and roads prevent infiltration.",
        "Drains and gutters carry water rapidly to the river.",
        "Removal of vegetation reduces interception.",
      ], explanation: "Any three valid urban effects." }),
    ],
    hints: ["Lag time uses the times of the two peaks.", "Read the discharge row carefully for the falling limb."],
    explanation: "Practice in reading a storm hydrograph from data.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2, which shows measurements made by students at two sites.\n\n${SITES}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the cross-sectional area of the channel at site 2.", value: 6, unit: "m²", wrong: [10.6], explanation: "10 × 0.6 = 6 m²." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the discharge at site 1.", value: 0.18, unit: "m³/s", tol: 0.005, answer: "0.18", wrong: [0.6, 0.9], explanation: "Area = 3 × 0.2 = 0.6 m²; discharge = 0.6 × 0.3 = 0.18 m³/s." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement agrees with the Bradshaw model?", options: [
        ["Velocity is higher at site 2 than at site 1", "Correct: 0.5 m/s against 0.3 m/s."],
        ["The channel is narrower at site 2 than at site 1", "It is wider: 10 m against 3 m."],
        ["The channel is shallower at site 2 than at site 1", "It is deeper: 0.6 m against 0.2 m."],
        ["Discharge is lower at site 2 than at site 1", "Discharge is far higher at site 2 (3 m³/s)."],
      ], answer: "A", explanation: "Width, depth, velocity and discharge all increase downstream, as the model predicts." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why discharge increases between site 1 and site 2.", points: [
        "Tributaries join the river, adding water.",
        "More throughflow and groundwater flow enter from the larger area drained.",
      ], explanation: "The drainage area grows downstream." }),
    ],
    hints: ["Area = width × mean depth.", "Discharge = area × velocity."],
    explanation: "Practice applying the Bradshaw model to field data.",
  });
  b.card("DEFINITION", "Drainage basin", "The area of land drained by a river and its tributaries (catchment).");
  b.card("DEFINITION", "Watershed", "The boundary of a drainage basin, usually a line of high ground.");
  b.card("DEFINITION", "Discharge", "Volume of water passing a point per second (m³/s). Discharge = cross-sectional area × velocity.");
  b.card("CONCEPT", "Basin as an open system", "Input: precipitation. Stores: interception, soil, groundwater, channel. Flows: infiltration, throughflow, overland flow, percolation, groundwater flow. Outputs: evapotranspiration, discharge.");
  b.card("CONCEPT", "Bradshaw model", "Downstream: discharge, width, depth, velocity, load volume increase; gradient, particle size, bed roughness decrease.");
  b.card("DEFINITION", "Lag time", "Time between peak rainfall and peak discharge on a storm hydrograph.");
  b.card("CONCEPT", "Flashy hydrograph", "Short lag, high peak: steep slopes, impermeable rock, saturated or baked soil, little vegetation, urban areas.");
  b.card("FACT", "Zimbabwe's basins", "Zambezi (north of the central watershed), Save and Limpopo (south and east); all reach the Indian Ocean through Mozambique.", undefined, { applies: ZIM });
  b.card("FACT", "Zambezi at Victoria Falls", "Highest flow about April, lowest about November: rain far upstream is delayed by floodplains.");
  b.card("VOCABULARY", "Base flow", "The normal flow of a river fed by groundwater between storms.");
});
