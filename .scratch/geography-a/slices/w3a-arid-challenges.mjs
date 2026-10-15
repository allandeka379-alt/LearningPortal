// W3a: arid.challenges (Cambridge only, A Level Paper 3 option 10). Sahel facts are general and dated (see the lesson); data tables are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const capacity = chk((360 * 100) / 12, 3000, 1e-9);
const stockPct = chk((4200 / capacity) * 100, 140, 1e-9);
const lossShare = chk(((95 * 30) / 9500) * 100, 30, 1e-9);
const yieldPct = rnd(((1.3 - 0.8) / 0.8) * 100, 1, 62.5, "yieldPct");
const density = chk(54000 / 900, 60, 1e-9);
// Struct 1: district land data
const LD = [[1985, 620, 38, 410], [2000, 790, 61, 330], [2015, 1010, 94, 248]];
const LDTAB = tbl(["Year", "Cultivated land (km²)", "Cattle, sheep and goats (thousands)", "Woodland (km²)"], LD.map((r) => r));
const woodPct = rnd(((410 - 248) / 410) * 100, 1, 39.5, "woodPct");
// Struct 2: strategies
const SG = [["Farmer-managed natural regeneration", 20, 3.0, "Crop yields up by about 30%"], ["Tree planting in rows", 300, 0.4, "Only 2 in 10 seedlings survive"], ["Zaï pits", 80, 0.5, "Crop yields up by about 60%"]];
const SGTAB = tbl(["Strategy", "Cost (US\\$ per ha)", "Area treated (million ha)", "Result"], SG.map((r) => [r[0], r[1], r[2].toFixed(1), r[3]]));
const costFMNR = chk(20 * 3.0, 60, 1e-9);

concept("ageo.arid.challenges", { file: "arid/challenges", keyPrefix: "arid.challenges", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which statement best defines desertification?", [
    ["Land degradation in dry areas caused by climate and people", "Correct: it is not the spread of an existing desert."],
    ["The natural movement of the Sahara southwards in a straight line", "Deserts do not advance like a tide."],
    ["The formation of sand dunes in a coastal area with high rainfall", "Desertification occurs in dry regions."],
    ["The planting of trees on land that was formerly bare", "That would be afforestation."],
  ], "Desertification is **degradation of dryland** by climate and people.");
  mc(b, 2, "UNDERSTANDING", "How does overgrazing contribute to desertification?", [
    ["It removes plant cover, which exposes the soil to erosion", "Correct: wind and water then remove the topsoil."],
    ["It adds nutrients to the soil, so the plants grow thicker", "Overgrazing reduces plants rather than increasing them."],
    ["It increases the rainfall by adding moisture to the air", "Livestock do not increase rainfall."],
    ["It raises the water table so that the soil becomes waterlogged", "Overgrazing does not raise the water table."],
  ], "Overgrazing reduces **cover**, so erosion increases.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why does irrigation in a dry climate often lead to salinisation?", [
    ["Water evaporates and leaves the dissolved salts in the soil", "Correct: with poor drainage the salts build up."],
    ["Irrigation water always contains more salt than sea water does", "Irrigation water is much less salty than sea water."],
    ["Salt is added by the roots of the crops that are being irrigated", "Crops take up some salt but do not add it."],
    ["Irrigation causes heavy rainfall which then washes the salt away", "Irrigation does not cause rainfall."],
  ], "Evaporation concentrates **salts** in the soil.");
  mc(b, 2, "UNDERSTANDING", "What is farmer-managed natural regeneration?", [
    ["Protecting tree shoots that grow back in farmers' fields", "Correct: it restores tree cover cheaply, using existing roots."],
    ["Planting thousands of seedlings from a nursery in a long belt", "That is tree planting, as in the original Great Green Wall idea."],
    ["Moving all livestock off the land for a hundred years", "FMNR works with farming and does not remove it."],
    ["Building concrete dams across every seasonal stream in the Sahel", "FMNR is a tree management practice, not engineering."],
  ], "FMNR lets **existing roots and stumps** regrow into trees.");
  mc(b, 3, "ANALYSIS", "Why has tree planting in the Great Green Wall often had limited success?", [
    ["Many seedlings die without protection and local involvement", "Correct: survival depends on care, and funding has been uneven."],
    ["Trees cannot grow in any part of the Sahel region", "Many trees grow naturally in the Sahel."],
    ["Planting trees always makes the soil more salty and less fertile", "Trees do not cause salinisation."],
    ["The programme has always been fully funded and well managed", "Funding has been uneven and progress slow."],
  ], "Seedlings need **protection and local ownership** to survive.", { hints: ["What happens to young trees that are not fenced or watered?"] });
  mc(b, 3, "ANALYSIS", "How could climate change threaten livestock farming in a semi-arid area?", [
    ["Higher temperatures and more drought reduce grass and water supplies", "Correct: pasture and water are the main limits for herds."],
    ["Higher temperatures always increase the growth of grass in dry areas", "Higher temperatures usually increase water stress."],
    ["More reliable rainfall makes it easy to graze herds at any season", "Rainfall may become more variable and unreliable."],
    ["Rising carbon dioxide stops the animals from needing to drink", "Livestock still need water."],
  ], "Heat and drought **reduce pasture and water**.", { hints: ["What do cattle need every day?"] });
  mc(b, 3, "EVALUATION", "Why are low-cost, farmer-led techniques often more sustainable than large, top-down projects?", [
    ["Farmers gain directly and so continue to maintain them", "Correct: local ownership, low cost and direct benefit keep them going."],
    ["They need much more money and complex machinery to operate", "They are usually cheap and simple."],
    ["They are imposed by governments without any local involvement", "They are led by the farmers themselves."],
    ["They work only in years when the rainfall is above average", "They are designed to conserve water in dry years."],
  ], "Local **benefit and ownership** keep farmer-led techniques going.", { hints: ["Who maintains the technique after the project ends?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Desertification means that an existing desert is spreading like a tide into surrounding land.", answer: false,
    feedbackTrue: "Not so: it is land degradation in dry areas.", feedbackFalse: "Correct: it is degradation of dryland caused by climate variation and human activity.",
    explanation: "Desertification is **land degradation**, not the advance of a desert's edge." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each strategy to its description.",
    pairs: [
      ["Zaï pits", "Planting holes filled with manure that collect water and soil"],
      ["Stone lines (bunds)", "Rows of stones along the contour that trap water and soil"],
      ["Farmer-managed natural regeneration", "Protecting shoots from stumps and roots to grow into trees"],
      ["Great Green Wall", "African Union land restoration programme across the Sahel"],
      ["Drip irrigation", "Slow application of water to roots to reduce waste and salinisation"],
    ], explanation: "Each measure restores cover, conserves water or reduces salt build-up." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The number of animals an area can support indefinitely is its {{blank:a}} capacity. The build-up of salts in soil after irrigation is {{blank:b}}. The semi-arid belt south of the Sahara is the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["carrying"], choices: ["carrying", "storage", "holding"] },
      { id: "b", accepted: ["salinisation"], choices: ["salinisation", "afforestation", "leaching"] },
      { id: "c", accepted: ["Sahel"], choices: ["Sahel", "Kalahari", "Namib"] },
    ], explanation: "Carrying capacity, salinisation and the Sahel." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the process in which salts build up in soil, often after irrigation in a dry climate.",
    accepted: ["salinisation", "salinization", "soil salinisation", "soil salinization"], explanation: "**Salinisation** is the build-up of soluble salts in soil." });

  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A rangeland of 360 km² has a carrying capacity of one livestock unit (LU) per 12 ha. It carries 4 200 LU (illustrative data; 1 km² = 100 ha). Calculate the number of livestock units as a percentage of the carrying capacity.",
    hints: ["Find the capacity first: area in hectares ÷ 12."],
    value: stockPct, wrong: [11.7, 3000, 71],
    explanation: "Area = 360 × 100 = 36 000 ha. Capacity = 36 000 ÷ 12 = 3 000 LU. Stocking = 4 200 ÷ 3 000 × 100 = **140%**. The value 3 000 is the capacity in LU." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A district of 9 500 km² loses 95 km² a year to severe degradation (illustrative data). What percentage of the district is lost in 30 years, at a constant rate?",
    hints: ["Loss over 30 years ÷ area × 100."],
    value: lossShare, wrong: [2850, 1.0],
    explanation: "Loss = 95 × 30 = 2 850 km². 2 850 ÷ 9 500 × 100 = **30%**. The value 2 850 is the loss in km²." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Millet yields are 1.3 t/ha with stone lines and 0.8 t/ha without them (illustrative data). Calculate the percentage increase in yield due to the stone lines, to one decimal place.",
    hints: ["Increase ÷ yield without stone lines × 100."],
    value: yieldPct, dp: 1, wrong: [38.5, 0.5],
    explanation: "Increase = 1.3 − 0.8 = 0.5 t/ha. 0.5 ÷ 0.8 × 100 = **62.5%**. The value 38.5 divides by the larger value (0.5 ÷ 1.3)." });
  b.calc({ d: 2, skill: "APPLICATION", calculator: true, unit: "people/km²",
    stem: "A semi-arid district of 900 km² has a population of 54 000 (illustrative data). Calculate the population density, in people per km².",
    hints: ["Population ÷ area."],
    value: density, wrong: [0.0167, 48600000],
    explanation: "54 000 ÷ 900 = **60 people per km²**. The value 0.0167 divides the area by the population." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how physical and human factors together cause desertification.",
    hints: ["Give a physical factor, a human factor and how they interact."],
    points: [
      "Physical factors: low and variable rainfall, drought, high temperatures and strong winds make the land vulnerable to loss of cover.",
      "Human factors: overgrazing, overcultivation and the cutting of trees and shrubs for fuel remove the plant cover.",
      "Without cover, the soil is exposed to wind and water erosion, and the topsoil, which holds nutrients and water, is lost.",
      "Drought then makes recovery harder, and poverty and population pressure force people to keep using the land, so degradation continues in a cycle.",
    ],
    modelAnswer: "Low and variable rainfall, drought, high temperatures and strong winds make the land vulnerable. Overgrazing, overcultivation and cutting of trees for fuel remove the plant cover. The exposed soil is eroded by wind and water, and the topsoil that holds nutrients and water is lost. Drought makes recovery harder, and poverty and population pressure force people to keep using the land, so degradation continues in a cycle.",
    explanation: "Physical vulnerability plus human pressure produces a cycle of degradation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how irrigation can cause salinisation of soils in a dry area.",
    hints: ["Evaporation, water table and capillary rise."],
    points: [
      "Irrigation water contains dissolved salts, and when the water evaporates the salts are left in the soil.",
      "If drainage is poor, over-irrigation raises the water table towards the surface.",
      "Capillary action then draws salty water up to the surface, where it evaporates and a salt crust forms.",
    ],
    modelAnswer: "Irrigation water contains dissolved salts, and when it evaporates the salts are left in the soil. If drainage is poor, over-irrigation raises the water table towards the surface. Capillary action then draws salty water to the surface, where it evaporates and a salt crust forms.",
    explanation: "Evaporation, rising water table and capillary rise." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Evaluate farmer-managed natural regeneration as a way of reducing land degradation in the Sahel.",
    hints: ["Cost, benefits to farmers and limits."],
    points: [
      "It is cheap, because it uses roots and stumps already in the soil and needs little money or machinery.",
      "Trees provide fuelwood, fodder, shade and shelter from the wind, and improve soil and crop yields, so farmers have a direct benefit.",
      "But it needs secure rights to land and trees and works best where rainfall is not too low; it takes years to see the full effect.",
    ],
    modelAnswer: "It is cheap, because it uses roots and stumps already in the soil. Trees provide fuelwood, fodder, shade and shelter from the wind, and improve soil and crop yields, so farmers benefit directly. But it needs secure rights to land and trees and works best where rainfall is not too low, and the effects take years to appear.",
    explanation: "Cost and benefit against the conditions it needs." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Suggest how climate change may threaten agriculture in semi-arid areas.",
    hints: ["Temperature, rainfall, crops, livestock and water."],
    points: [
      "Higher temperatures increase evaporation and heat stress, so crops need more water and may fail.",
      "Rainfall may become more variable, with a later start, shorter season or more dry spells, so planting dates are uncertain and harvests fall.",
      "Pasture and drinking water for livestock become scarcer, so herds are reduced or move into conflict areas.",
      "More frequent droughts reduce incomes, increase food insecurity and migration, and make recovery between droughts difficult.",
    ],
    modelAnswer: "Higher temperatures increase evaporation and heat stress, so crops need more water and may fail. Rainfall may become more variable, with a later start, a shorter season or more dry spells, so harvests fall. Pasture and drinking water for livestock become scarcer. More frequent droughts reduce incomes, increase food insecurity and migration, and make recovery difficult.",
    explanation: "Heat, variable rain, pasture and drought risk." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives data for a semi-arid district in the Sahel (illustrative data, invented for this exercise).\n\n${LDTAB}`,
    hints: ["Percentage loss of woodland = (410 − 248) ÷ 410 × 100.", "Think about the demands that people and animals make on the land."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage fall in woodland between 1985 and 2015, to one decimal place.", value: woodPct, dp: 1, unit: "%", wrong: [162, 65.3, 60.5],
        explanation: "Fall = 410 − 248 = 162 km². 162 ÷ 410 × 100 = 39.5%. The value 162 is the fall in km²; 65.3 divides by the 2015 figure (162 ÷ 248)." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the changes shown in the table.",
        points: [
          "Cultivated land increased steadily from 620 km² in 1985 to 1 010 km² in 2015, an increase of 390 km².",
          "Livestock numbers rose from 38 000 to 94 000, more than doubling.",
          "Woodland fell from 410 km² to 248 km² over the same period.",
        ],
        modelAnswer: "Cultivated land increased steadily from 620 km² in 1985 to 1 010 km² in 2015, an increase of 390 km². Livestock numbers rose from 38 000 to 94 000, more than doubling. Woodland fell from 410 km² to 248 km².",
        explanation: "Quote start and end values for each variable." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how the changes in cultivation and livestock may be linked to the loss of woodland and to desertification.",
        points: [
          "Woodland is cleared for new fields and cut for fuelwood and building, so as cultivation expands, trees are lost.",
          "More livestock overgraze the grass, and browse young trees and shrubs, so that woodland does not regenerate.",
          "With less cover, the soil is exposed to wind and water erosion and loses fertility, so the land becomes degraded and the pressure moves to new areas.",
        ],
        modelAnswer: "Woodland is cleared for new fields and cut for fuelwood, so as cultivation expands, trees are lost. More livestock overgraze the grass and browse young trees, so the woodland does not regenerate. With less cover, the soil is exposed to wind and water erosion and loses fertility, so the land becomes degraded and pressure moves to new areas.",
        explanation: "Clearance, overgrazing and erosion form a cycle." }),
    ], explanation: "Calculate a change, describe trends and explain links to desertification." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table compares three strategies used to restore degraded land in a semi-arid region (illustrative data, invented for this exercise).\n\n${SGTAB}`,
    hints: ["Total cost = cost per hectare × area; 1 million ha × US\\$1 per ha = US\\$1 million.", "Which strategy gives the best result for the lowest cost?"],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the total cost of farmer-managed natural regeneration, in US\\$ million.", value: costFMNR, unit: "US$ million", wrong: [6, 600, 0.0000067],
            explanation: "US\\$20 per ha × 3.0 million ha = US\\$60 million." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which strategy has the highest cost per hectare?", options: [
            ["Tree planting in rows", "Correct: US$300 per ha is the highest value."],
            ["Zaï pits", "US$80 per ha is lower than tree planting."],
            ["Farmer-managed natural regeneration", "US$20 per ha is the lowest cost."],
            ["All three cost the same per hectare", "The costs are US$20, US$300 and US$80."],
          ].map(([c, r]) => [c.replace("US$", "US\\$"), r.replace(/US\$/g, "US\\$")]), answer: "A", explanation: "Tree planting costs US\\$300 per hectare, more than the other strategies." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why farmer-managed natural regeneration can be done at low cost.",
        points: [
          "It uses roots and stumps that are already in the ground, so no seedlings, nurseries or planting are needed.",
          "The work of protecting and pruning is done by farmers on their own land, so labour is not paid.",
          "It needs little equipment and no transport of plants, and the trees are adapted to local conditions.",
        ],
        modelAnswer: "It uses roots and stumps already in the ground, so no seedlings or nurseries are needed. The work of protecting and pruning is done by farmers on their own land. It needs little equipment and no transport of plants, and the trees are adapted to local conditions.",
        explanation: "Existing roots, farmers' labour and local adaptation." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest why only 2 in 10 seedlings survive in the tree planting scheme.",
        points: [
          "Seedlings are eaten or trampled by livestock if they are not fenced or protected.",
          "They may be planted in a dry year and have no water, as watering is costly and rainfall is unreliable.",
          "Local people may not feel that the trees are theirs, so they do not look after them, and fuelwood-cutters may remove them.",
        ],
        modelAnswer: "Seedlings are eaten or trampled by livestock if they are not fenced. They may be planted in a dry year and have no water, since watering is costly and rainfall is unreliable. Local people may not feel that the trees are theirs, so they do not look after them, and fuelwood-cutters may remove them.",
        explanation: "Livestock, drought and lack of local ownership." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess which strategy is most suitable for a poor farming community.",
        points: [
          "Farmer-managed natural regeneration is cheapest (US\\$20 per ha), covers the largest area and increases yields by about 30%.",
          "Zaï pits cost more (US\\$80 per ha) and need labour and manure, but give the highest yield increase (about 60%), so they suit land that is badly degraded.",
          "Judgement: FMNR is the most suitable overall because of its low cost and wide coverage, with zaï pits on bare, degraded plots; row planting is the least cost-effective (accept a reasoned choice).",
        ],
        modelAnswer: "Farmer-managed natural regeneration is cheapest at US\\$20 per ha, covers the largest area and raises yields by about 30%. Zaï pits cost more at US\\$80 per ha and need labour and manure, but give the highest yield increase, about 60%, so they suit badly degraded land. FMNR is the most suitable overall, with zaï pits on bare plots, and row planting is the least cost-effective.",
        explanation: "Compare cost, area and results, then judge." }),
    ], explanation: "Calculate costs, explain results and assess which strategy suits a community." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "To what extent has management in a semi-arid environment that you have studied reduced land degradation? Use a detailed specific example.",
    hints: ["Name the place and dated strategies.", "Give successes, limits and a judgement."],
    points: [
      "Names the environment and the issues (for example the Sahel: droughts in 1968–73 and 1983–85, population growth, overgrazing, fuelwood cutting and cultivation of marginal land).",
      "Names strategies (farmer-managed natural regeneration in Niger from the 1980s, zaï pits and stone lines in Burkina Faso, and the Great Green Wall launched in 2007).",
      "Success: FMNR has restored tree cover over several million hectares at low cost, with higher yields and more fuelwood and fodder.",
      "Success: zaï pits and stone lines trap water and soil and raise yields, and are used by farmers who benefit directly.",
      "Limits: the Great Green Wall has progressed more slowly than planned, with uneven funding and many planted seedlings dying.",
      "Limits: part of the greening is due to the recovery of rainfall since the mid-1980s, so management cannot take all the credit.",
      "Continuing problems: rapid population growth, poverty, conflict, weak land rights and climate change keep the region vulnerable.",
      "Judgement: management has reduced degradation locally and where farmers lead and benefit, but the effects are patchy and not secure, so success is partial.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In the Sahel, droughts in 1968–73 and 1983–85, population growth, overgrazing, fuelwood cutting and cultivation of marginal land caused severe degradation. Management has included farmer-managed natural regeneration in Niger from the 1980s, zaï pits and stone lines in Burkina Faso, and the Great Green Wall launched in 2007. FMNR has restored tree cover over several million hectares at low cost, with higher yields and more fuelwood and fodder, and zaï pits and stone lines trap water and soil and raise yields. However, the Great Green Wall has progressed more slowly than planned, with uneven funding and many seedlings dying, and part of the greening is due to the recovery of rainfall since the mid-1980s. Population growth, poverty, conflict and climate change keep the region vulnerable. I conclude that management has reduced degradation locally, particularly where farmers lead and benefit, but the effects are patchy and not secure, so success is partial.",
    wordLimit: { max: 300 }, explanation: "Use a named place, dated strategies and evidence of success and limits." });

  b.card("DEFINITION", "Desertification", "Land degradation in arid, semi-arid and dry sub-humid areas caused by climatic variation and human activities; it is not the spread of an existing desert.");
  b.card("CONCEPT", "Causes of desertification", "Physical: drought, variable rainfall, wind and water erosion. Human: overgrazing, overcultivation, fuelwood cutting, poor irrigation, population pressure and poverty.");
  b.card("DEFINITION", "Carrying capacity", "The number of people or livestock an area can support indefinitely without damage to the land.");
  b.card("CONCEPT", "Salinisation", "Build-up of salts in soil after irrigation in a dry climate: evaporation leaves salts, and poor drainage lets the water table and capillary rise bring more to the surface.");
  b.card("FACT", "Sahel droughts", "Severe droughts occurred in 1968–73 and 1983–85; they caused famine, loss of livestock and migration.");
  b.card("CONCEPT", "Farmer-managed natural regeneration", "Farmers protect and prune tree shoots growing from stumps and roots in their fields; cheap, widespread in Niger since the 1980s, with more fuelwood, fodder and higher yields.");
  b.card("CONCEPT", "Zaï pits and stone lines", "Planting pits filled with manure and lines of stones along contours that trap water and soil, used in Burkina Faso and revived from the 1980s.");
  b.card("FACT", "Great Green Wall", "Launched in 2007 by the African Union; now a programme of land restoration across the Sahel; progress slower than planned and funding uneven.");
  b.card("FORMULA", "Stocking rate", "Stocking (%) = number of livestock units ÷ carrying capacity × 100; capacity = area (ha) ÷ hectares needed per livestock unit.");
});
