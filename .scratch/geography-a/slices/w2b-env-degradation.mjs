// W2b: env.degradation (both boards; items suit both unless tagged).
// Computed: ridging reduces loss (25-8)/25 = 68%; bare/grass 40/1 = 40; gully (168-120)/8 = 6 m/yr; dam storage (2.5-1.9)/2.5 = 24%;
// forest 5000 -> 4200 ha: loss 800 ha = 16%, 100 ha/yr; soil loss of bare vs maize ridged 40-8 = 32.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const EROS = tbl(["Land cover", "Soil loss (t per ha)"], [["Bare soil", 40], ["Maize ploughed up and down the slope", 25], ["Maize with contour ridges", 8], ["Grass", 1]]);
const redRidge = chk(((25 - 8) / 25) * 100, 68);
const ratioBare = chk(40 / 1, 40);
const diffBare = chk(40 - 8, 32);
const gullyRate = chk((168 - 120) / 8, 6);
const siltPct = chk(((2.5 - 1.9) / 2.5) * 100, 24, 1e-9);
const forestLoss = chk(5000 - 4200, 800);
const forestPct = chk((forestLoss / 5000) * 100, 16);
const forestRate = chk(forestLoss / 8, 100);

concept("ageo.env.degradation", { file: "env/degradation", keyPrefix: "env.degradation" }, (b) => {
  mc(b, 1, "RECALL", "What is **siltation**?", [
    ["The build-up of eroded sediment in dams and river beds", "Correct: silt reduces storage and channel capacity."],
    ["The removal of topsoil by strong wind", "That is wind erosion."],
    ["The enrichment of water with nitrates and phosphates", "That is eutrophication."],
    ["The spread of desert conditions into farmland", "That is desertification."],
  ], "**Siltation** is the build-up of sediment in dams, lakes and river beds.");
  mc(b, 2, "UNDERSTANDING", "Why do gullies often start along cattle tracks and footpaths?", [
    ["Run-off concentrates on the bare, compacted surface", "Correct: water cuts channels where vegetation is absent."],
    ["Cattle tracks contain more clay than the surrounding fields", "Texture is not the main reason."],
    ["Water cannot flow over compacted ground", "Compacted ground sheds water quickly, increasing run-off."],
    ["Tracks receive more rain than the surrounding land", "Rainfall is the same; run-off differs."],
  ], "Bare, compacted tracks concentrate run-off, which cuts a **gully**.");
  mc(b, 2, "UNDERSTANDING", "Which statement about indigenous knowledge systems (IKS) in conservation is correct?", [
    ["They use taboos and sacred places to protect resources", "Correct: they rely on community acceptance."],
    ["They depend entirely on expensive imported technology", "IKS is local and low-cost."],
    ["They have no effect on forests or water sources", "In many areas they protect forests and springs."],
    ["They are always stronger than modern laws", "They can be weakened by social and economic change."],
  ], "IKS such as totems, taboos and sacred forests are low-cost controls that depend on **community respect**.");
  mc(b, 2, "UNDERSTANDING", "How does deforestation increase soil erosion?", [
    ["Fewer roots bind the soil and less canopy intercepts rain", "Correct: bare soil is exposed to raindrops and run-off."],
    ["Trees absorb more water, so the soil becomes too dry", "This does not explain erosion."],
    ["Leaf litter increases, which washes the soil away", "Litter protects the soil; its loss increases erosion."],
    ["Soil particles become larger when trees are removed", "Particle size does not change."],
  ], "Removing trees **exposes the soil** and removes the roots that hold it.");
  mc(b, 3, "APPLICATION", "A small dam in a communal area loses water storage each year. Which is the most likely cause?", [
    ["Silt from eroding fields and gullies in its catchment", "Correct: sediment settles in the dam."],
    ["Too much rainfall in the dam catchment", "More rain does not reduce capacity in itself."],
    ["Growth of the dam walls by natural processes", "Walls do not grow naturally."],
    ["Planting of trees on the dam wall", "Trees on the wall do not reduce capacity."],
  ], "Sediment from the catchment gradually fills the dam, **reducing capacity**.", { hints: ["Think about where the soil washed from fields goes."] });
  mc(b, 3, "ANALYSIS", "Which is the best reason why fencing off a degraded gully and planting grass in it may fail?", [
    ["Livestock or people continue to cross it and water is not diverted", "Correct: the causes of run-off remain."],
    ["Grass roots increase the speed of the water", "Roots slow water and bind soil."],
    ["Fencing causes rain to run into the gully faster", "Fencing does not change run-off."],
    ["Planted grass always dies because gullies are too fertile", "Gully soils are usually infertile."],
  ], "Reclamation fails when the **cause** (run-off and trampling) is not tackled.", { hints: ["Think about causes, not only symptoms."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Deforestation can increase soil erosion and reduce biodiversity.", answer: true,
    feedbackTrue: "Correct: both effects follow from loss of tree cover.",
    feedbackFalse: "Not so: removing trees exposes soil and removes habitat.",
    explanation: "Tree loss leads to erosion and habitat loss." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Ploughing up and down a slope reduces soil erosion compared with ploughing along the contour.", answer: false,
    feedbackFalse: "Correct: ploughing up and down creates channels for run-off, which increases erosion.",
    feedbackTrue: "Not so: ridges along the contour slow the water.",
    explanation: "Contour ploughing reduces erosion; up-and-down ploughing increases it." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Land degradation in dry areas caused by climatic variation and human activity is {{blank:a}}. Structures of stones or brushwood that trap silt in a gully are {{blank:b}} dams. Sacred forests and totems are examples of {{blank:c}} knowledge systems.",
    blanks: [
      { id: "a", accepted: ["desertification"], choices: ["desertification", "eutrophication", "afforestation"] },
      { id: "b", accepted: ["check"], choices: ["check", "storage", "irrigation"] },
      { id: "c", accepted: ["indigenous"], choices: ["indigenous", "scientific", "commercial"] },
    ], explanation: "Desertification, check dams and indigenous knowledge systems." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each degradation problem to a suitable response.",
    pairs: [
      ["Gully erosion", "Diversion of water and check dams with grass planting"],
      ["Deforestation for firewood", "Woodlots and efficient stoves"],
      ["Overgrazing", "Destocking and rotational grazing"],
      ["Uncontrolled veld fires", "Fire committees and firebreaks"],
    ], explanation: "Responses target each cause." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 0,
    stem: `Illustrative erosion plots:\n\n${EROS}\n\nBy what percentage did contour ridges reduce soil loss compared with ploughing up and down the slope? Give the answer to the nearest whole number.`,
    hints: ["Find the reduction (25 − 8), then divide by the loss without ridges."],
    value: redRidge, wrong: [17, 32],
    explanation: "Reduction = 25 − 8 = 17 t per ha. 17 ÷ 25 × 100 = **68%**. Dividing by 8 would give the wrong base." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "times", dp: 0,
    stem: `Use the erosion plot data:\n\n${EROS}\n\nHow many times greater is the soil loss on bare soil than under grass?`,
    hints: ["Divide the larger value by the smaller."],
    value: ratioBare, wrong: [39, 0.025],
    explanation: "40 ÷ 1 = **40** times. Subtracting (39) gives a difference, not a ratio." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "m", dp: 0,
    stem: "A gully was 120 m long in 2015 and 168 m long in 2023. Calculate the mean rate of lengthening, in metres per year.",
    hints: ["Find the change in length, then divide by the number of years."],
    value: gullyRate, wrong: [48, 21],
    explanation: "Change = 168 − 120 = 48 m over 2023 − 2015 = 8 years. 48 ÷ 8 = **6** m per year." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%", dp: 0,
    stem: "A woodland of 5 000 ha has been reduced to 4 200 ha over 8 years. Calculate the percentage of the original woodland that has been lost.",
    hints: ["Find the area lost first.", "Divide by the original area, not the present one."],
    value: forestPct, wrong: [19, 800],
    explanation: "1. Area lost = 5 000 − 4 200 = 800 ha.\n2. Percentage of the original: 800 ÷ 5 000 × 100 = **16%**.\n3. Dividing by the present area (4 200) gives 19%, the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the process in which rainwater cuts a deep channel into the land, often along a path or track.",
    accepted: ["gully erosion", "gullying", "gully formation", "gully", "gully erosion."], wrong: ["sheet erosion"],
    explanation: "**Gully erosion**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process in which sediment from eroded land fills dams and river beds.",
    accepted: ["siltation", "silting", "sedimentation", "silting up"], wrong: ["eutrophication"],
    explanation: "**Siltation**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a gully is reclaimed using check dams.",
    hints: ["Think about the water, the dams and the planting."],
    points: [
      "Run-off is diverted away from the head of the gully, for example by a ditch or ridge.",
      "Check dams of stones, logs or brushwood are built across the gully to slow the water and trap silt.",
      "Grass and trees are planted on the silt and banks, and animals are fenced out.",
    ],
    modelAnswer: "First the run-off is diverted from the gully head. Check dams of stones or brushwood are built across the channel to slow the water and trap silt. Grass and trees are planted in the trapped silt and on the banks, and animals are fenced out.",
    explanation: "Divert, trap, plant and protect." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why deforestation in a communal area is often caused by poverty.",
    hints: ["Think of fuel, income and land."],
    points: [
      "Many households have no money for electricity or gas, so they depend on firewood for cooking and heating.",
      "Cutting and selling wood or charcoal gives a cash income when there are few jobs.",
      "A growing population needs more cropland, so people clear woodland for fields.",
      "Tobacco curing and building need large amounts of wood, and enforcement is weak, so there is little to stop cutting.",
    ],
    modelAnswer: "Poor households cannot afford electricity or gas, so they use firewood, and selling wood or charcoal provides income where jobs are scarce. A growing population needs more cropland, and tobacco curing and building need wood. With weak enforcement, there is little to stop the cutting.",
    explanation: "Fuel, income, land and weak enforcement." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative erosion plots:\n\n${EROS}\n\nDescribe the pattern of soil loss shown.`,
    hints: ["Quote the highest and lowest values and compare the cultivated plots."],
    points: [
      "Soil loss is highest on bare soil (40 t per ha) and lowest under grass (1 t per ha).",
      "Maize ploughed up and down loses 25 t per ha.",
      "Contour ridges cut the loss from maize to 8 t per ha, a fall of 17 t per ha (68%).",
      "Loss decreases as ground cover and conservation increase.",
    ],
    modelAnswer: "Soil loss is highest on bare soil (40 t per ha) and lowest under grass (1 t per ha). Maize ploughed up and down loses 25 t per ha, but with contour ridges the loss falls to 8 t per ha, a reduction of 68%. The more cover and conservation, the less soil is lost.",
    explanation: "Describe with figures and the overall trend." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A research team measured soil loss on four plots on the same slope during one rainy season (illustrative data, invented for this exercise).\n\n${EROS}`,
    hints: ["Percentage reduction = reduction ÷ original × 100.", "Think about raindrop impact and run-off."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage by which contour ridges reduced soil loss compared with ploughing up and down, to the nearest whole number.", value: redRidge, dp: 0, unit: "%", wrong: [17, 32],
        explanation: "(25 − 8) ÷ 25 × 100 = 68%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the difference in soil loss between bare soil and maize with contour ridges, in t per ha.", value: diffBare, unit: "t/ha", wrong: [48, 5],
        explanation: "40 − 8 = 32 t per ha." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which land cover loses the least soil?", options: [
        ["Grass", "Correct: dense cover and roots protect the soil."],
        ["Bare soil", "Bare soil loses the most, 40 t per ha."],
        ["Maize ploughed up and down", "This loses 25 t per ha."],
        ["Maize with contour ridges", "This loses 8 t per ha, more than grass."],
      ], answer: "A", explanation: "Grass loses 1 t per ha." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why grass loses much less soil than bare soil.",
        points: [
          "Leaves and stems intercept raindrops, reducing splash erosion.",
          "Roots bind the soil particles and increase infiltration, so less water runs over the surface.",
          "Dense cover slows run-off, and litter protects the surface.",
        ],
        modelAnswer: "Grass leaves intercept raindrops and reduce splash. Roots bind the soil and let water soak in, so there is less run-off, and the dense cover and litter slow any water that does flow.",
        explanation: "Interception, root binding and slowed run-off." }),
    ], explanation: "Calculate from erosion plot data and explain the protection offered by cover." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A woodland in a communal area covered 5 000 ha in 2015 and 4 200 ha in 2023 (illustrative figures, invented for this exercise). Most of the loss is due to fuelwood cutting and clearing for fields.",
    hints: ["Rate per year = total change ÷ number of years."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the 2015 woodland that was lost by 2023, to the nearest whole number.", value: forestPct, dp: 0, unit: "%", wrong: [19, 800],
        explanation: "800 ÷ 5 000 × 100 = 16%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean area lost each year, in ha per year.", value: forestRate, unit: "ha", wrong: [800, 625],
        explanation: "800 ha ÷ 8 years = 100 ha per year." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways in which the loss of woodland could be reduced.",
        points: [
          "Provide alternative fuels or efficient stoves so that households use less firewood.",
          "Plant community woodlots and enforce rules on cutting with the help of local leaders.",
        ],
        modelAnswer: "Supply efficient stoves or alternative fuels so that less wood is burnt, and plant community woodlots with local rules on cutting, backed by village leaders.",
        explanation: "Reduce demand and increase supply." }),
    ], explanation: "Use the figures to find a rate and suggest solutions." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the effectiveness of measures used to reduce soil erosion and reclaim degraded land in the rural areas of Zimbabwe, including indigenous knowledge systems.",
    hints: ["Cover conservation farming, gully reclamation, woodlots and IKS.", "Judge which are most effective."],
    points: [
      "Contour ridges, terraces and mulching cut run-off and erosion cheaply, but must be built and maintained properly.",
      "Conservation agriculture (minimum tillage, cover and rotation) protects soil and raises yields, but needs labour, inputs and training.",
      "Gully reclamation with diversion, check dams and planting restores land, but needs sustained effort and fencing against livestock.",
      "Woodlots, agroforestry and efficient stoves reduce deforestation but take years to produce benefits.",
      "IKS, such as sacred forests, totems and grazing rules, are low-cost and accepted but are weakened by social change and population pressure.",
      "Laws and extension services support these measures but are limited by funding and enforcement.",
      "Success depends on community involvement and benefits that people can see within a few seasons.",
      "Judgement: simple, low-cost measures such as ridges and conservation agriculture, combined with community rules and IKS, are most effective.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Contour ridges, terraces and mulching cut run-off and erosion cheaply, but they must be built and maintained properly. Conservation agriculture protects the soil and raises yields, but needs labour and training. Gully reclamation with diversion, check dams and planting restores land, but needs sustained effort and fencing. Woodlots and efficient stoves reduce deforestation but take years to pay off. Indigenous knowledge systems such as sacred forests and totems are low in cost and accepted by communities, but are weakened by social change and population pressure. Laws and extension help but are limited by funding. I conclude that simple, low-cost measures such as ridges and conservation agriculture, combined with community rules and IKS, are most effective because people can see the benefits within a few seasons.",
    wordLimit: { max: 300 }, explanation: "Evaluate each measure by cost, effect and acceptance, then judge." });

  b.card("DEFINITION", "Environmental degradation", "The decline in the quality or productivity of land, water or ecosystems, usually caused by human activity.");
  b.card("DEFINITION", "Desertification", "Land degradation in arid, semi-arid and dry sub-humid areas caused by climatic variation and human activities.");
  b.card("CONCEPT", "Causes of soil erosion", "Clearing vegetation, ploughing up and down slopes, overgrazing, cultivating steep land and stream banks.");
  b.card("CONCEPT", "Gully reclamation", "Divert run-off from the gully head, build check dams to trap silt, plant grass and trees, fence out animals.");
  b.card("CONCEPT", "Soil conservation methods", "Contour ridges, terraces, mulching, conservation agriculture (minimum tillage, cover, rotation), vetiver strips.");
  b.card("DEFINITION", "Indigenous knowledge systems (IKS)", "Community knowledge and customs, such as totems, taboos and sacred forests, that protect natural resources.");
  b.card("CONCEPT", "Effects of siltation", "Dams and canals lose storage, irrigation is reduced and aquatic life is harmed.");
  b.card("CONCEPT", "Restoring extractive landscapes (Cambridge)", "Backfill pits, spread stored topsoil, re-vegetate with local species, treat water and monitor.");
  b.card("CONCEPT", "Root causes of rural degradation", "Population pressure, poverty, lack of alternative fuel and land, and weak enforcement.");
});
