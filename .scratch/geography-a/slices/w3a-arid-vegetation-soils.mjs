// W3a: arid.vegetation-soils (Cambridge only, A Level Paper 3 option 10). Data are illustrative (invented for this exercise) or rounded textbook values; every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const nppRatio = rnd(1200 / 90, 1, 13.3, "nppRatio");
const saltKg = chk(0.6 * 9000, 5400, 1e-9);
const netKg = chk(saltKg - 1900, 3500, 1e-9);
const yrs = chk(21000 / netKg, 6, 1e-9);
const density = rnd(14 / 25, 2, 0.56, "density");
// Struct 1: cover and rainfall
const CV = [[1, 60, 4, "Scattered ephemerals and a few low shrubs"], [2, 120, 11, "Low shrubs and ephemerals"], [3, 220, 27, "Shrubs and clumps of grass"], [4, 340, 46, "Grass, shrubs and scattered acacias"]];
const CVTAB = tbl(["Site", "Mean annual rainfall (mm)", "Plant cover (%)", "Main vegetation"], CV.map((r) => r));
const coverTimes = rnd(46 / 4, 1, 11.5, "coverTimes");
// Struct 2: two soils
const SO = tbl(["Property", "Soil P", "Soil Q"], [["pH", "7.9", "9.2"], ["Exchangeable sodium (% of exchangeable ions)", 8, 32], ["Electrical conductivity of the soil water (dS/m)", 22, 3], ["Surface", "White crust 1–2 cm thick", "Pale, thin and bare"], ["B horizon", "Not clearly developed", "Dense with columns"]]);
const ecTimes = rnd(22 / 3, 1, 7.3, "ecTimes");

concept("ageo.arid.vegetation-soils", { file: "arid/vegetation-soils", keyPrefix: "arid.vegetation-soils", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "What is a xerophyte?", [
    ["A plant adapted to survive in dry conditions", "Correct: it stores water, reduces loss or reaches deep water."],
    ["A plant adapted to grow in very salty soil", "That is a halophyte."],
    ["A plant that grows only in water or on waterlogged ground", "That is a hydrophyte."],
    ["A plant that lives on the branches of other plants", "That is an epiphyte."],
  ], "**Xerophytes** are plants adapted to drought.");
  mc(b, 2, "UNDERSTANDING", "Why do many cacti open their stomata at night?", [
    ["It reduces water loss in the cooler, more humid air", "Correct: less water escapes than if the stomata were open in the hot day."],
    ["It allows the plant to take in sunlight for photosynthesis", "There is no sunlight at night."],
    ["It allows the plant to absorb water from the dry air", "Stomata release water vapour; they do not absorb it."],
    ["It helps the plant to remove excess salt from the soil", "Stomata are not for removing salt."],
  ], "Opening stomata at night **reduces water loss** in the cooler air.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which adaptation is shown by a desert annual that germinates, flowers and sets seed within a few weeks of rain?", [
    ["Drought escape", "Correct: the plant completes its life cycle while water is present."],
    ["Drought tolerance by storing water", "It does not store water in tissues."],
    ["Fog harvesting using the leaves", "It relies on rainfall, not on fog."],
    ["Salt excretion by the leaves", "Salt excretion is a halophyte adaptation."],
  ], "Ephemerals **escape** drought as dormant seeds.");
  mc(b, 3, "ANALYSIS", "A soil has plenty of water, but plants wilt. The water contains a very high concentration of salt. What is this situation called?", [
    ["Physiological drought", "Correct: the roots cannot absorb water from very salty soil."],
    ["Physical drought in the soil", "In physical drought there is a real lack of water."],
    ["Waterlogging of the soil", "Waterlogging is a lack of air, not salt."],
    ["Leaching of the topsoil", "Leaching is the washing out of soluble substances."],
  ], "Water is present but plants cannot take it up: **physiological drought**.", { hints: ["Why can roots not take up water from very salty soil?"] });
  mc(b, 2, "UNDERSTANDING", "Which structure is typical of the B horizon of a solonetz?", [
    ["Dense and columnar", "Correct: dispersed clay forms hard columns with rounded tops."],
    ["Loose and sandy", "A solonetz has a dense clay B horizon."],
    ["A thick layer of dark humus", "Desert soils have little humus."],
    ["A layer of unweathered rock fragments", "A solonetz has a developed B horizon of clay."],
  ], "A solonetz has a **dense columnar** B horizon.");
  mc(b, 3, "ANALYSIS", "Why do salts accumulate near the surface of desert soils?", [
    ["Water rises by capillary action and evaporates, leaving salts", "Correct: evaporation exceeds rainfall, so there is no leaching."],
    ["Heavy rain washes the salts down from the top layer of soil", "Rainfall is too small to wash salts away."],
    ["Plant roots deposit large amounts of salt at the surface", "Roots do not deposit salt on the surface."],
    ["The wind blows the salt downwards into the deeper layers", "Wind does not move salt downwards."],
  ], "Upward movement and **evaporation** leave salts near the surface.", { hints: ["Which way does water move when evaporation is greater than rainfall?"] });
  mc(b, 3, "ANALYSIS", "How does a Gersmehl diagram for a desert differ from one for a tropical rainforest?", [
    ["All stores and flows are small, and the soil holds most nutrients", "Correct: biomass and litter are small and decomposition is slow."],
    ["The biomass store is very large and the soil store is very small", "That describes the tropical rainforest."],
    ["The flows are all large because of the intense sunshine", "Flows are small because of the lack of water."],
    ["There are no nutrient stores of any kind in a hot desert", "Stores exist, though they are small."],
  ], "In a desert, stores and flows are **small**.", { hints: ["Compare the size of the biomass circle in each biome."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A solonchak is a soil with a high concentration of soluble salts.", answer: true,
    feedbackTrue: "Correct: a white salt crust often forms at the surface.", feedbackFalse: "Not so: a solonchak is a saline soil.",
    explanation: "A **solonchak** is saline; a **solonetz** is sodic." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each plant strategy to an example.",
    pairs: [
      ["Succulent", "A cactus with a fleshy stem that stores water"],
      ["Ephemeral", "An annual that completes its life cycle within weeks after rain"],
      ["Phreatophyte", "A tree with a very deep tap root reaching groundwater"],
      ["Halophyte", "A saltbush that tolerates salty soil"],
      ["Fog harvester", "Welwitschia, which absorbs moisture from sea fog"],
    ], explanation: "Each strategy answers a different problem of dry conditions." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A plant that tolerates salty soil is a {{blank:a}}. A {{blank:b}} soil has a high concentration of sodium ions on the clay and a columnar B horizon. A saline soil with a white crust is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["halophyte"], choices: ["halophyte", "xerophyte", "hydrophyte"] },
      { id: "b", accepted: ["solonetz"], choices: ["solonetz", "solonchak", "oxisol"] },
      { id: "c", accepted: ["solonchak"], choices: ["solonchak", "solonetz", "podsol"] },
    ], explanation: "Halophyte, solonetz and solonchak." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of plant that completes its life cycle in a few weeks after rain and survives the dry period as seeds.",
    accepted: ["ephemeral", "an ephemeral", "ephemerals", "annual", "desert annual"], explanation: "**Ephemerals** escape drought as dormant seeds." });

  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "Typical net primary productivity (rounded textbook values) is about 1 200 g/m² per year in a temperate forest and about 90 g/m² per year in a desert scrub. How many times greater is the productivity of the forest, to one decimal place?",
    hints: ["Divide the forest value by the desert value."],
    value: nppRatio, dp: 1, wrong: [0.075, 1110, 13],
    explanation: "1 200 ÷ 90 = **13.3 times**. The value 0.075 divides the other way round (90 ÷ 1 200)." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "kg",
    stem: "Irrigation water contains 0.6 kg of salt per m³. A farmer applies 9 000 m³ per hectare in a year (illustrative data). Calculate the mass of salt added to each hectare, in kg.",
    hints: ["Concentration × volume."],
    value: saltKg, wrong: [15000, 0.0000667],
    explanation: "0.6 × 9 000 = **5 400 kg per hectare**. The value 15 000 divides the volume by the concentration (9 000 ÷ 0.6)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "Each year 5 400 kg of salt per hectare is added by irrigation and 1 900 kg per hectare is removed by drainage (illustrative data). How many years before the soil gains 21 000 kg of salt per hectare?",
    hints: ["Find the net gain each year, then divide the target by it."],
    value: yrs, wrong: [3.9, 2.8, 11],
    explanation: "1. Net gain = 5 400 − 1 900 = 3 500 kg per hectare per year.\n2. Years = 21 000 ÷ 3 500 = **6 years**. The value 3.9 uses the total added without subtracting the drainage (21 000 ÷ 5 400)." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "A survey of 25 quadrats, each 1 m², found a total of 14 plants of a desert shrub (illustrative data). Calculate the mean density, in plants per m², to two decimal places.",
    hints: ["Total plants ÷ total area."],
    value: density, dp: 2, wrong: [1.79, 350, 0.14],
    explanation: "14 ÷ 25 = **0.56 plants per m²**. The value 1.79 divides the number of quadrats by the number of plants (25 ÷ 14)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how plants in a hot desert are adapted to the lack of water.",
    hints: ["Give the feature and its function."],
    points: [
      "Succulents store water in fleshy stems or leaves, and many open their stomata at night to reduce water loss.",
      "Deep tap roots reach groundwater, while shallow, widespread roots absorb light rain quickly.",
      "Small leaves, spines, a thick waxy cuticle and hairs reduce transpiration.",
      "Ephemerals escape drought by completing their life cycle in the weeks after rain and surviving as dormant seeds.",
    ],
    modelAnswer: "Succulents store water in fleshy stems, and many open their stomata at night to reduce water loss. Deep tap roots reach groundwater, while shallow, wide roots absorb light rain. Small leaves, spines, a waxy cuticle and hairs reduce transpiration. Ephemerals escape drought by completing their life cycle after rain and surviving as dormant seeds.",
    explanation: "Store, reach, reduce loss or escape." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a solonchak forms.",
    hints: ["Start with the water source and the direction of movement."],
    points: [
      "The soil lies in a depression or low plain where the water table is shallow and the groundwater contains dissolved salts (or irrigation water adds salts).",
      "Evaporation is much greater than rainfall, so water is drawn upwards by capillary action.",
      "The water evaporates at or near the surface, leaving the dissolved salts behind.",
      "Over many years salts build up as a white crust, and the high salt level makes the soil saline.",
    ],
    modelAnswer: "The soil lies in a low area where the water table is shallow and the groundwater contains dissolved salts, or irrigation adds salt. Evaporation is much greater than rainfall, so water is drawn upwards by capillary action. The water evaporates near the surface and leaves the salts behind. Over many years salts build up as a white crust and the soil becomes saline.",
    explanation: "Shallow saline groundwater, capillary rise and evaporation." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare a solonchak with a solonetz.",
    hints: ["Use the same criteria for each soil."],
    points: [
      "A solonchak has a high concentration of soluble salts in general, whereas a solonetz has a high proportion of sodium on the clay.",
      "A solonchak has a white salt crust and a loose or granular surface, and a solonetz has a dense B horizon with a columnar structure.",
      "A solonchak has a neutral to slightly alkaline pH, while a solonetz is strongly alkaline (above about 8.5).",
    ],
    modelAnswer: "A solonchak has a high concentration of soluble salts, whereas a solonetz has a high proportion of sodium on the clay. A solonchak has a white salt crust and a loose surface, and a solonetz has a dense B horizon with a columnar structure. A solonchak is neutral to slightly alkaline, and a solonetz is strongly alkaline.",
    explanation: "Compare the cause, structure and pH." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest how overgrazing can change the vegetation and soil of a semi-arid area.",
    hints: ["Think about plant cover, roots and the surface."],
    points: [
      "Grazing animals remove palatable grasses and shrubs, so the cover falls and less palatable or thorny plants replace them.",
      "Trampling compacts and breaks the surface, which reduces infiltration and increases runoff and erosion by wind and water.",
      "With less litter and fewer roots, organic matter in the soil falls, and the topsoil is lost.",
    ],
    modelAnswer: "Grazing animals remove palatable grasses and shrubs, so the plant cover falls and thorny or unpalatable plants replace them. Trampling compacts and breaks the surface, so infiltration falls and runoff and erosion increase. With less litter and fewer roots, organic matter falls and topsoil is lost.",
    explanation: "Reduced cover, trampling and erosion." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Plant cover was measured at four sites along a rainfall gradient in a desert region (illustrative data, invented for this exercise).\n\n${CVTAB}`,
    hints: ["Divide the cover at Site 4 by the cover at Site 1.", "Think about what limits growth when there is more water."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times greater is the plant cover at Site 4 than at Site 1, to one decimal place?", value: coverTimes, dp: 1, wrong: [42, 0.09, 11],
        explanation: "46 ÷ 4 = 11.5 times. The value 42 is the difference in percentage points." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the relationship between rainfall and the vegetation shown in the table.",
        points: [
          "Plant cover increases with rainfall, from 4% at 60 mm to 46% at 340 mm.",
          "The increase is greatest between Site 2 and Site 3 (16 percentage points) and between Site 3 and Site 4 (19 percentage points), so cover rises faster at higher rainfall.",
          "The type of vegetation changes from scattered ephemerals to shrubs, grasses and scattered acacias.",
        ],
        modelAnswer: "Plant cover increases with rainfall, from 4% at 60 mm to 46% at 340 mm. The increase is greatest between Site 3 and Site 4, which is 19 percentage points, so cover rises faster at higher rainfall. The vegetation changes from scattered ephemerals to shrubs, grasses and scattered acacias.",
        explanation: "Quote the figures, describe the rate and note the change in vegetation type." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why plant cover and diversity increase with rainfall.",
        points: [
          "Water is the main factor limiting growth, so with more rainfall more plants can survive and grow larger, and productivity rises.",
          "More water allows species that are less drought-tolerant, such as grasses and trees, to survive, so diversity increases.",
          "More plant growth gives more litter and humus, which improve the soil and its water-holding capacity, and the greater cover reduces evaporation and gives shelter.",
        ],
        modelAnswer: "Water limits growth, so with more rainfall more plants can survive and grow larger and productivity rises. More water allows species that are less drought-tolerant, such as grasses and trees, to survive, so diversity increases. More growth gives more litter and humus, which improve the soil's ability to hold water, and the greater cover reduces evaporation.",
        explanation: "Water is the limiting factor, and greater cover improves the soil." }),
    ], explanation: "Calculate a ratio, describe the effect of rainfall and explain it." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Two soils from different parts of a dry region were analysed (illustrative data, invented for this exercise).\n\n${SO}`,
    hints: ["High salt content with a white crust suggests a solonchak; high sodium and pH with columns suggests a solonetz.", "Think about osmotic effects on roots."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "How many times greater is the electrical conductivity of the soil water in Soil P than in Soil Q, to one decimal place?", value: ecTimes, dp: 1, wrong: [19, 0.14, 7],
            explanation: "22 ÷ 3 = 7.3 times. The value 19 is the difference in dS/m." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which soil type is Soil P most likely to be?", options: [
            ["Solonchak", "Correct: high conductivity, a white crust and no strong alkalinity."],
            ["Solonetz", "A solonetz has a high sodium percentage, strong alkalinity and a columnar B horizon, which describes Soil Q."],
            ["Oxisol", "An oxisol is a deep red soil of humid areas."],
            ["Podsol", "A podsol is an acid leached soil of cool wet areas."],
          ], answer: "A", explanation: "Soil P has a very high salt content (22 dS/m) and a white crust: a solonchak." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how the features of Soil Q arise.",
        points: [
          "Sodium makes up 32% of the exchangeable ions, so the clay particles disperse because the sodium ions cause them to repel each other.",
          "The dispersed clay moves downwards and accumulates in the B horizon, forming a dense layer with a columnar structure, while the top is pale and thin.",
          "The sodium also raises the pH (9.2), and the soil is impermeable and hard when dry.",
        ],
        modelAnswer: "Sodium makes up 32% of the exchangeable ions, so the clay particles disperse because the sodium ions make them repel each other. The dispersed clay moves downwards and accumulates in the B horizon, forming a dense layer with a columnar structure, while the top is pale and thin. The sodium also raises the pH to 9.2, and the soil is hard when dry and impermeable.",
        explanation: "Sodium disperses clay, which accumulates in the B horizon." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why plants find it difficult to grow in Soil P even when water is available.",
        points: [
          "The soil water has a very high salt concentration (22 dS/m).",
          "Water moves into plant roots by osmosis, which needs the solution in the soil to be weaker than the solution in the roots; in salty soil this does not happen, so the plant cannot take up water (physiological drought).",
          "Only halophytes, with adaptations such as salt glands, can survive, and high salt levels may also be toxic.",
        ],
        modelAnswer: "The soil water has a very high salt concentration. Water enters roots by osmosis, which needs the soil solution to be weaker than that in the roots, so in salty soil the plant cannot take up water, a physiological drought. Only halophytes with adaptations such as salt glands can survive, and high salt levels may also be toxic.",
        explanation: "Osmotic effect causes physiological drought." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest how farmers on irrigated land could prevent the spread of soils like Soil P.",
        points: [
          "Install drainage and apply extra water to flush the salts below the root zone (leaching), taking the drainage water away safely.",
          "Use water with a low salt content, apply it efficiently (for example by drip irrigation) and avoid over-irrigation, which raises the water table.",
          "Grow salt-tolerant crops, and plant trees or deep-rooted plants to keep the water table low.",
        ],
        modelAnswer: "Farmers can install drainage and apply extra water to flush the salts below the root zone, taking the drainage water away safely. They can use water with a low salt content and apply it efficiently, for example by drip irrigation, to avoid raising the water table. They can grow salt-tolerant crops and plant deep-rooted trees to keep the water table low.",
        explanation: "Drainage and leaching, efficient irrigation and crop choice." }),
    ], explanation: "Calculate a ratio, identify soils and explain formation and management." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how far the vegetation of arid environments is controlled by climate rather than by soils and human activity.",
    hints: ["Describe each control.", "Say how they interact."],
    points: [
      "Climate sets the limit: rainfall is the main factor, and plant cover, biomass and diversity rise with rainfall from arid to semi-arid areas.",
      "Temperature extremes and strong winds also restrict growth and select for plants adapted to heat and drought.",
      "Soils modify the effect of climate: salinity and sodium (solonchak and solonetz) cause physiological drought, shallow stony soils hold little water, and sandy soils may hold more usable water than clay.",
      "Human activity can change vegetation within the climatic limits: overgrazing, fuelwood cutting and irrigation change cover, species and soil, and invasive species such as Prosopis alter the community.",
      "In some places human influence is greater than climate, for example where land is heavily overgrazed and degraded.",
      "These factors interact: climate controls what is possible, soils alter the water available and humans add pressure.",
      "Evidence: cover increases consistently along rainfall gradients in many deserts.",
      "Judgement: climate is the primary control of arid vegetation, but soils and human activity are significant locally and can be decisive in particular places.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Climate sets the limit: rainfall is the main factor, and plant cover, biomass and diversity increase with rainfall from arid to semi-arid areas. Heat and strong winds also restrict growth and select plants adapted to drought. Soils modify the effect of climate: salinity and sodium cause physiological drought, shallow stony soils hold little water, and sandy soils may hold more usable water than clay. Human activity can change the vegetation within the climatic limits, since overgrazing, fuelwood cutting and irrigation change cover, species and soil, and invasive species such as Prosopis alter the community. In heavily overgrazed areas human influence can be greater than that of climate. I conclude that climate is the primary control of arid vegetation, but soils and human activity are significant locally and can be decisive in particular places.",
    wordLimit: { max: 300 }, explanation: "Weigh climate, soils and human activity, then judge." });

  b.card("DEFINITION", "Xerophyte", "A plant adapted to dry conditions by storing water, reducing water loss or reaching water with deep or wide roots.");
  b.card("CONCEPT", "Desert plant strategies", "Store water (succulents), reach water (deep tap roots), reduce loss (small leaves, spines, waxy cuticle), escape drought (ephemerals), use fog, and tolerate salt (halophytes).");
  b.card("DEFINITION", "Physiological drought", "Water is present in the soil but plants cannot take it up, for example because the soil is so salty.");
  b.card("CONCEPT", "Gersmehl diagram for a desert", "All stores (biomass, litter, soil) and flows are small; decomposition is slow and leaching is low, so the soil holds most nutrients.");
  b.card("DEFINITION", "Solonchak", "A saline soil with a high concentration of soluble salts and often a white surface crust; the pH is usually neutral to slightly alkaline.");
  b.card("DEFINITION", "Solonetz", "A sodic soil with a high proportion of sodium on the clay, strongly alkaline pH, dispersed clay and a dense columnar B horizon.");
  b.card("CONCEPT", "Why salts accumulate in desert soils", "Evaporation exceeds rainfall, so water moves upwards by capillary rise and evaporates, leaving salts near the surface.");
  b.card("FACT", "Welwitschia in the Namib", "A plant with two strap-like leaves that absorbs moisture from sea fog and can live for hundreds of years.");
  b.card("FORMULA", "Salt added by irrigation", "Salt added (kg per ha) = concentration of salt in water (kg per m³) × volume of water applied (m³ per ha).");
});
