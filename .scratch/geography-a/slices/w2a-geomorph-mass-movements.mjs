// W2a: geomorph.mass-movements (both boards). Numbers computed: three-day rainfall totals, weighted hazard scores, creep distance
// (see tables/w2a-geomorph-mass-movements.mjs for the lesson examples).
import { concept, P, geographyLevels, chk, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

const WEIGHTS = [3, 2, 2, 3];
const score = (s) => sum(s.map((x, i) => x * WEIGHTS[i]));
// Struct 1: hazard map cells (different from the lesson)
const CELLS = [["P", [3, 2, 3, 3]], ["Q", [2, 2, 1, 2]], ["R", [1, 1, 1, 2]], ["S", [2, 3, 3, 1]]];
const CELLTAB = tbl(["Cell", "Slope (×3)", "Rainfall (×2)", "Bare ground (×2)", "Weak geology (×3)"], CELLS.map(([n, s]) => [n, ...s]));
const scoreP = chk(score(CELLS[0][1]), 28);
const scoreS = chk(score(CELLS[3][1]), 21);
// Struct 2 data (illustrative)
const R2 = [27, 85, 172, 201];

concept("ageo.geomorph.mass-movements", { file: "geomorph/mass-movements", keyPrefix: "geomorph.mass-movements" }, (b) => {
  mc(b, 1, "RECALL", "Which type of mass movement is the slow downslope movement of soil particles, a few millimetres a year?", [
    ["Soil creep (heave)", "Correct: particles expand and settle in turn, so soil moves very slowly."],
    ["Rock fall", "Rock falls are very rapid movements from cliffs."],
    ["Debris flow", "Debris flows are fast, fluid movements of saturated debris."],
    ["Rotational slide", "Rotational slides are faster movements along a curved surface."],
  ], "**Heave or creep** is the slowest mass movement: a few millimetres a year.");
  mc(b, 2, "UNDERSTANDING", "Which description matches a **rotational slide (slump)**?", [
    ["A mass of weak rock or clay moving on a curved surface, leaving a scar", "Correct: typical of clay slopes and undercut river banks."],
    ["Loose rock dropping, bouncing and rolling from a steep cliff face", "That is a rock fall."],
    ["Saturated soil flowing downhill like a thick liquid in a channel", "That is a mudflow or debris flow."],
    ["Soil moving a few millimetres each year without any sudden failure", "That is soil creep."],
  ], "A **rotational slide** moves on a curved failure surface and leaves a curved scar.");
  mc(b, 2, "UNDERSTANDING", "How does heavy rain make a slope more likely to fail?", [
    ["It raises pore water pressure, which lowers the strength of the soil", "Correct: water pushes particles apart and reduces friction."],
    ["It cools the slope, so the rock contracts and cracks", "Cooling is not the main effect of heavy rain on soils."],
    ["It removes the weight of the soil from the slope", "Rain adds weight to the slope; it does not remove it."],
    ["It makes the soil more cohesive, binding the particles tightly", "Saturated soil loses strength; it does not bind more tightly."],
  ], "Rain adds weight and raises **pore water pressure**, so shear strength falls below the driving force.", { daily: true });
  mc(b, 2, "RECALL", "Which is a **human** cause of mass movement?", [
    ["Cutting into the foot of a slope to build a road", "Correct: removing support at the toe makes the slope unstable."],
    ["A tropical cyclone bringing several days of rain", "A cyclone is a physical trigger, though human land use affects vulnerability."],
    ["Layers of rock that dip in the same direction as the slope", "This is a geological (physical) cause."],
    ["An earthquake that shakes a steep valley side", "This is a physical trigger."],
  ], "Road cuts, clearing, leaking pipes and loading of slopes are **human** causes.", { daily: true });
  mc(b, 3, "APPLICATION", "Which measure is best at reducing pore water pressure in a slope?", [
    ["Surface and drilled drains that remove water", "Correct: draining the slope increases its shear strength."],
    ["Steel mesh fixed over the face of the rock", "Mesh holds loose rock but does not lower water pressure."],
    ["Warning signs placed along a road at the foot", "Signs warn people but do not make the slope more stable."],
    ["Painting the rock with a light-coloured sealant", "This does nothing for water pressure inside the slope."],
  ], "**Drainage** lowers pore water pressure and so raises shear strength.", { hints: ["Which measure removes water?"] });
  mc(b, 3, "ANALYSIS", "Why do debris flows often cause many deaths even where rainfall warnings exist?", [
    ["They move fast and give little time to evacuate", "Correct: a flow can reach a settlement within minutes of starting."],
    ["They only occur in towns, where many people live", "Debris flows occur on steep slopes, often in rural areas."],
    ["They are slow, so people do not feel in danger", "Debris flows are fast, not slow."],
    ["They are caused by earthquakes that no one can predict", "Rain is the commonest trigger, and rain can be forecast."],
  ], "Debris flows are **fast and unpredictable in detail**, so warning time is short.", { hints: ["Think about the speed of the flow."] });
  mc(b, 4, "EVALUATION", "A rural community on a steep slope has little money. Why is planting trees and grass often recommended rather than building a concrete wall?", [
    ["It is cheap, long-lasting and the roots bind the soil", "Correct: vegetation also uses water and brings other benefits."],
    ["It stops all landslides at once, at every location", "Vegetation reduces risk but cannot stop deep slides."],
    ["It needs no maintenance and no planning of any kind", "Planting needs care in the early years and protection from grazing."],
    ["It is faster to establish than any engineering measure", "Roots take years to develop, so the effect is slow."],
  ], "Vegetation is **low-cost and sustainable**, but slow and limited on deep slides.", { hints: ["Compare cost and speed with those of a wall."] });

  b.tf({ d: 1, skill: "RECALL", stem: "A rock fall is a very rapid movement of rock from a steep, jointed face.", answer: true,
    feedbackTrue: "Correct.", feedbackFalse: "Not so: rock falls are rapid.",
    explanation: "Rock falls are very rapid and occur on steep faces where joints let blocks detach." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "An increase in pore water pressure makes a slope more stable.", answer: false,
    feedbackFalse: "Correct: higher pore water pressure lowers the shear strength of the slope.", feedbackTrue: "Not so: water pushes soil particles apart and reduces friction.",
    explanation: "Rising **pore water pressure reduces shear strength** and makes failure more likely." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each mass movement to its description.",
    pairs: [
      ["Soil creep", "Very slow movement of soil particles downslope"],
      ["Debris flow", "Fast flow of saturated soil and boulders along a channel"],
      ["Rotational slide", "Movement of a mass along a curved surface, leaving a scar"],
      ["Rock fall", "Blocks of rock dropping from a steep jointed face"],
    ],
    extraRight: ["Gradual wearing away of a rock face by wind"],
    explanation: "Each movement is defined by its speed, water content and path." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A slope fails when the driving force exceeds the {{blank:a}}. The pressure of water between soil particles is called {{blank:b}} pressure. Roots help to {{blank:c}} the soil.",
    blanks: [
      { id: "a", accepted: ["shear strength"], choices: ["shear strength", "albedo", "discharge"] },
      { id: "b", accepted: ["pore water"], choices: ["pore water", "atmospheric", "tectonic"] },
      { id: "c", accepted: ["bind"], choices: ["bind", "dissolve", "heat"] },
    ], explanation: "Failure occurs when driving force exceeds shear strength; pore water pressure reduces strength; roots bind the soil." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the instrument used to measure the pressure of water in the soil of a slope.",
    accepted: ["piezometer"], explanation: "A **piezometer** measures pore water pressure." });

  const three = chk(38 + 109 + 164, 311);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "Daily rainfall on three consecutive days was 38 mm, 109 mm and 164 mm. Calculate the three-day total, in mm.",
    value: three, wrong: [164, 103.7],
    explanation: "38 + 109 + 164 = **311 mm**. The value 103.7 is the mean, not the total." });
  const scE = chk(score([2, 3, 2, 1]), 19);
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "units",
    stem: "A hazard map gives each cell a score from 1 to 3 for slope, rainfall, bare ground and weak geology. The weights are slope ×3, rainfall ×2, bare ground ×2 and weak geology ×3. Cell E scores 2, 3, 2 and 1 in that order. Calculate its weighted score.",
    hints: ["Multiply each score by its weight, then add."],
    value: scE, wrong: [8, 24],
    explanation: "1. Slope: 2 × 3 = 6.\n2. Rainfall: 3 × 2 = 6.\n3. Bare ground: 2 × 2 = 4.\n4. Geology: 1 × 3 = 3.\n5. Total = 6 + 6 + 4 + 3 = **19**. The value 8 is the unweighted total." });
  const creep = chk(4.5 * 40, 180);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "A fence post on a hillside moved 4.5 mm per year downslope through soil creep. Calculate how far it moves in 40 years, in mm.",
    hints: ["Distance = rate × time."],
    value: creep, wrong: [0.11, 45],
    explanation: "4.5 mm per year × 40 years = **180 mm** (18 cm)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a period of very heavy rainfall can trigger a landslide.",
    hints: ["Think of weight and pore water pressure."],
    points: [
      "Rain infiltrates and the soil becomes saturated, adding to the weight of the slope.",
      "Water fills the spaces between particles and raises the pore water pressure.",
      "This pushes the particles apart and reduces friction, so shear strength falls.",
      "When the driving force exceeds the shear strength, the slope fails, often along a weak layer.",
    ],
    modelAnswer: "Heavy rain soaks into the soil and makes it heavier. The water raises the pressure between the soil particles and pushes them apart, so friction and shear strength fall. When the downslope force becomes greater than the strength, the slope fails along a weak layer.",
    explanation: "Weight increases and strength decreases." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how removing trees from a steep slope increases the risk of mass movement.",
    hints: ["Think about roots and water."],
    points: [
      "Tree roots bind the soil and may anchor it to the rock beneath, so removing them reduces its strength.",
      "Less rain is intercepted and less water is taken up and transpired, so the soil becomes wetter.",
      "Bare soil is more easily eroded by wash and more easily saturated, which raises pore water pressure.",
    ],
    modelAnswer: "Roots hold the soil together and anchor it to the rock, so when trees are cut the soil loses strength. Fewer trees means less interception and transpiration, so the soil is wetter and the pore water pressure is higher. The bare soil is also more exposed to wash.",
    explanation: "Vegetation removal reduces strength and increases water." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how drainage and grading (reducing the slope angle) make a slope more stable.",
    hints: ["One lowers the water pressure; the other lowers the driving force."],
    points: [
      "Drains remove water from the slope.",
      "This lowers pore water pressure and raises shear strength.",
      "Grading cuts the slope to a gentler angle or breaks it into terraces.",
      "This reduces the downslope component of weight (the driving force).",
    ],
    modelAnswer: "Drains take water out of the slope, which lowers the pore water pressure and increases the strength of the soil. Grading makes the slope gentler or breaks it into terraces, so the downslope pull of gravity is reduced.",
    explanation: "Drainage raises strength; grading reduces driving force." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Suggest why landslides cause greater loss of life in poorer communities.",
    hints: ["Think of where people live and how they receive warnings."],
    points: [
      "People may live on steep or unstable slopes because land is cheap and safer land is expensive.",
      "Houses are often built from weaker materials without engineering, so they are easily buried or destroyed.",
      "Warning systems, emergency services and evacuation routes are weak or lacking, and roads can be cut off.",
    ],
    modelAnswer: "Poorer households often live on cheaper, steeper slopes. Their houses are less strongly built and are easily destroyed, and there may be no warning system, evacuation plan or emergency service, so rescue is slow.",
    explanation: "Vulnerability depends on location, building quality and preparedness." });

  b.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: `A planner scored four map cells for landslide hazard (1 = low, 3 = high). The weights are slope ×3, rainfall ×2, bare ground ×2 and weak geology ×3, so the possible total is 10 to 30. Classes: 10-14 low, 15-21 moderate, 22-30 high (illustrative data, invented for this exercise).\n\n${CELLTAB}`,
    hints: ["Multiply each score by its weight and add.", "Compare the total with the class limits."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the weighted score for cell P.", value: scoreP, wrong: [11, 17],
        explanation: "(3 × 3) + (2 × 2) + (3 × 2) + (3 × 3) = 9 + 4 + 6 + 9 = 28. The value 11 is the unweighted total." }),
      P.mcq({ label: "(b)", stem: "Into which hazard class does cell S fall?", options: [
        ["Moderate", "Correct: S scores 2 × 3 + 3 × 2 + 3 × 2 + 1 × 3 = 21."],
        ["Low", "The score of 21 is above the low class (10-14)."],
        ["High", "The score of 21 is below the high class (22-30)."],
        ["Not classified", "Every possible score falls into one of the three classes."],
      ], answer: "A", explanation: "Cell S scores 6 + 6 + 6 + 3 = 21: moderate." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why slope and weak geology are given a higher weight than rainfall and bare ground.",
        points: [
          "Slope angle and weak geology control the strength of the slope in all conditions, so they are the permanent conditions for failure.",
          "Rainfall and bare ground are triggers or factors that can change or be managed.",
        ],
        modelAnswer: "Slope angle and weak geology are permanent conditions that decide whether a slope is prone to failure, while rainfall and bare ground are triggers or factors that vary or can be managed.",
        explanation: "Permanent controls are given more weight than variable triggers." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest how the map could be used to reduce the hazard.",
        points: [
          "To restrict building and settlement in high-risk cells.",
          "To target drainage, afforestation or slope stabilisation in moderate and high cells.",
          "To plan evacuation routes and warning systems for communities in the high-risk zones.",
        ],
        modelAnswer: "Planners can ban building in the high-risk cells, plant trees or build drains in moderate and high cells, and plan evacuation routes and warnings for people in the high-risk zones.",
        explanation: "Hazard maps support planning, mitigation and preparedness." }),
    ], explanation: "Calculate weighted scores and use hazard classes." });

  const total4 = chk(R2.reduce((a, c) => a + c, 0), 485);
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A district in the Eastern Highlands of Zimbabwe received heavy rain from a tropical cyclone. Daily rainfall at a station was as follows. On the night of day 4 several debris flows destroyed houses on steep slopes below cleared land (illustrative data, invented for this exercise).\n\n${tbl(["Day", "1", "2", "3", "4"], [["Rainfall (mm)", ...R2]])}`,
    hints: ["For (a) add the four values.", "In (d) judge each measure on cost and effectiveness."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total rainfall for the four days, in mm.", value: total4, unit: "mm", wrong: [121, 201],
        explanation: "27 + 85 + 172 + 201 = 485 mm." }),
      P.mcq({ label: "(b)", stem: "Which type of mass movement was this?", options: [
        ["Debris flow", "Correct: saturated soil and debris flowing down a steep slope."],
        ["Soil creep", "Creep is too slow to destroy houses."],
        ["Rock fall", "Rock falls need a steep rock face and are not saturated flows."],
        ["Rotational slide", "A slump moves as a block along a curved surface, not as a flow."],
      ], answer: "A", explanation: "Heavy rain on steep, loose, cleared slopes produces debris flows." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why the debris flows happened on day 4.",
        points: [
          "Rain on days 1-3 had already soaked the soil, so it was nearly saturated before day 4.",
          "The heavy rain on day 4 (201 mm) pushed the pore water pressure up and the shear strength down.",
          "The slopes were steep, so the downslope force of gravity was large.",
          "Clearing of the land removed roots that bound the soil, and so the soil moved easily.",
        ],
        modelAnswer: "Rain on the first three days saturated the soil, and the 201 mm on day 4 raised the pore water pressure and reduced shear strength. The slopes were steep, so gravity pulled strongly, and cleared land had lost the roots that bind soil. The saturated soil and debris then flowed downhill.",
        explanation: "Antecedent rainfall, high pore pressure, steep slope and clearance explain the flows." }),
      P.manual({ label: "(d)", marks: 5, stem: "Assess two measures that could reduce the risk of debris flows to people in the district.",
        points: [
          "Afforestation: roots bind the soil and trees use water, so this reduces strength loss; it is low-cost and sustainable.",
          "Afforestation takes years to work and cannot stop a large flow in extreme rain.",
          "Early warning and evacuation (using rainfall thresholds and community alerts): saves lives at low cost.",
          "Warnings need reliable rainfall data, communication and trained local committees, and debris flows give little notice.",
          "Judgement: a combination, with warnings for immediate protection and trees for long-term stability, is likely to be best.",
        ],
        type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        modelAnswer: "Planting trees on cleared slopes is cheap and lasting because roots bind the soil and trees use water, but it takes years to work and will not stop a large flow in extreme rain. Early warning with rainfall thresholds and community alerts can save lives at low cost, but it needs reliable data and communications and debris flows may give little time. A combination of the two, warnings now and trees for the longer term, is likely to be the most effective.",
        explanation: "Evaluate each measure, then judge." }),
    ], explanation: "Calculate rainfall, explain the cause and assess measures." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the view that human activity, rather than physical factors, is the main cause of mass movement hazards.",
    hints: ["Cover physical causes and human causes, then compare.", "Reach a judgement."],
    points: [
      "Physical factors: steep slopes, weak or weathered rock and dipping layers make some slopes naturally unstable.",
      "Rainfall, especially from tropical cyclones, is the commonest trigger: pore water pressure rises and strength falls.",
      "Earthquakes and undercutting by rivers trigger failures in some places.",
      "Human factors: cutting for roads and housing, deforestation, leaking pipes and loading increase instability.",
      "Humans increase vulnerability by settling on and below steep slopes, with weak buildings and little warning.",
      "Hazard becomes a disaster only if people and property are exposed.",
      "Many landslides in remote areas occur without human influence.",
      "Judgement: physical factors set the conditions and the triggers, but human activity often decides whether an event becomes a disaster.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Physical factors are the foundation. Steep slopes, weathered rock and layers dipping downslope make failure possible, and heavy rain from a tropical cyclone supplies the trigger by raising pore water pressure. Many landslides in remote areas occur without any human influence. However, human activity can make slopes less stable by cutting roads, clearing trees and leaking water. More importantly, people increase exposure and vulnerability by building weak houses on and below steep slopes, with little warning. I conclude that physical factors set the conditions and the trigger, but human activity often determines whether a mass movement becomes a disaster.",
    wordLimit: { max: 300 }, explanation: "Weigh physical and human causes and judge." });

  b.card("DEFINITION", "Mass movement", "The downslope movement of rock, regolith and soil under gravity; water often helps by adding weight and reducing friction.");
  b.card("CONCEPT", "Types of mass movement", "Heave (creep), flow (mudflow, debris flow), slide (translational, rotational) and fall (rock fall); classified by speed and water content.");
  b.card("DEFINITION", "Pore water pressure", "The pressure of water between soil particles; when it rises it reduces friction and shear strength, making failure more likely.");
  b.card("CONCEPT", "Physical causes of mass movement", "Weak or weathered rock, dipping layers, steep slopes, heavy rainfall, earthquakes, undercutting and climate change.");
  b.card("CONCEPT", "Human causes of mass movement", "Cutting into slopes for roads and buildings, loading, deforestation, leaking pipes, poor drainage, quarrying and mining.");
  b.card("CONCEPT", "Slope stability measures", "Rock pinning and bolting, netting, grading and terracing, drainage, retaining walls, afforestation, planning, education and early warning.");
  b.card("CONCEPT", "Hazard mapping and monitoring", "Zoning land by slope, geology, vegetation and past events; monitoring with rain gauges, piezometers, extensometers, tiltmeters and satellites.");
  b.card("FACT", "Chimanimani and Cyclone Idai", "March 2019: days of heavy rain on steep slopes in the Eastern Highlands caused landslides and debris flows; hundreds of people died in Zimbabwe and roads and bridges were destroyed.");
  b.card("FORMULA", "Weighted hazard score", "Score = Σ (factor score × weight); compare with class limits (low, moderate, high) to map the hazard.");
});
