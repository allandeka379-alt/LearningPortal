// Slice G2c: land degradation (ZIMSEC 7.8.2; Cambridge 10.3.5).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

const PLOTS = "**Table 1: Soil lost from four experimental plots on the same slope during one rainy season (fictional data)**\n\n| Plot | Land use | Soil loss (tonnes per hectare) |\n|---|---|---|\n| W | Bare soil, ploughed up and down the slope | 48 |\n| X | Maize, ploughed along the contours | 14 |\n| Y | Maize in planting basins with a mulch of crop residues | 6 |\n| Z | Natural grass cover | 2 |";

const FUEL = "**Table 2: Mean distance walked by women in a fictional communal area to collect firewood (fictional data)**\n\n| Year | 1995 | 2005 | 2015 | 2025 |\n|---|---|---|---|---|\n| Distance (km, one way) | 1.5 | 3.0 | 5.5 | 8.0 |";

concept("geo.environment.land-degradation", { file: "environment/land-degradation", keyPrefix: "environment.land-degradation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of soil erosion removes a thin, even layer of topsoil from a gentle slope?",
    options: [
      ["Sheet erosion", "Correct: water flowing evenly over the surface removes a thin layer."],
      ["Rill erosion", "Rill erosion cuts many small channels a few centimetres deep."],
      ["Gully erosion", "Gullies are deep, steep-sided channels that cannot be ploughed across."],
      ["Wind erosion", "Wind erosion is not caused by water flowing over the slope."],
    ],
    answer: "A",
    explanation: "Sheet erosion is hard to see until stones and roots are exposed. If runoff concentrates, it forms rills, which can deepen into gullies.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method is most suitable for controlling soil erosion on a **steep** hillside used for crops?",
    options: [
      ["Terracing", "Correct: level steps slow runoff and hold soil on steep slopes."],
      ["Ploughing up and down the slope", "This creates channels for runoff and increases erosion."],
      ["Burning the grass before planting", "Burning leaves soil bare and increases erosion."],
      ["Increasing the number of cattle", "More cattle would cause overgrazing and trampling."],
    ],
    answer: "A",
    explanation: "Terraces turn a steep slope into a series of flat steps, so water soaks in instead of running off.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does ploughing along the contours reduce soil erosion?",
    options: [
      ["The furrows trap water and slow runoff down the slope", "Correct: each furrow acts as a small barrier across the slope."],
      ["It makes the soil drier so that it is too hard to erode", "Contour ploughing helps water soak in; it does not dry the soil."],
      ["It removes plant roots that would block water flow", "Roots bind soil; removing them increases erosion."],
      ["It increases the speed of water flowing off the field", "It slows runoff rather than speeding it up."],
    ],
    answer: "A",
    explanation: "Furrows and ridges that follow the contours run across the slope, so water is held back, soaks in, and drops the soil it is carrying.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a direct effect of the **siltation** of a dam?",
    options: [
      ["The dam stores less water", "Correct: silt takes up space that water would fill."],
      ["The dam wall becomes taller", "Silt builds up on the dam floor; the wall does not change."],
      ["The water in the dam becomes saltier", "Siltation adds sediment, not salt."],
      ["Rainfall over the catchment increases", "Siltation does not change rainfall."],
    ],
    answer: "A",
    explanation: "As eroded soil settles on the floor of a dam, its storage capacity falls, so it supplies water for irrigation and towns for a shorter time in the dry season.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Zimbabwe's Pfumvudza/Intwasa programme for smallholder farmers is an example of which land-management approach?",
    options: [
      ["Conservation agriculture", "Correct: minimum tillage, planting basins, mulching and rotation protect the soil."],
      ["Shifting cultivation", "Shifting cultivation moves fields to new land; Pfumvudza keeps farming the same plots."],
      ["Large-scale irrigation", "Pfumvudza is mainly rain-fed farming on small plots."],
      ["Ranching", "Ranching is large-scale livestock farming, not a crop-growing method."],
    ],
    answer: "A",
    explanation: "Pfumvudza/Intwasa promotes conservation agriculture: digging planting basins instead of ploughing the whole field, keeping a mulch cover and rotating crops.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In Zimbabwe, why is soil erosion often greatest during the **first storms** of the rainy season in November?",
    options: [
      ["Grazing and fires in the dry season have left the soil bare", "Correct: heavy rain falls before the new grass and crops have grown."],
      ["The soil is waterlogged from months of earlier rain", "The soil is dry at the end of the dry season, not waterlogged."],
      ["Temperatures are too low for plant roots to hold the soil", "November is hot; low temperature is not the reason."],
      ["Rivers flow fastest in November and erode the fields", "River flow peaks later, and the erosion described is on slopes."],
    ],
    answer: "A",
    explanation: "By the end of the dry season, vegetation has been grazed, burned or has died back. The first intense storms fall on unprotected soil, so raindrop splash and runoff remove large amounts of topsoil.",
    hints: ["Think about the state of the vegetation at the end of the dry season."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "Which strategy for managing desertification in the Sahel is generally the most **sustainable** for poor farmers?",
    options: [
      ["Building stone lines along the contours with local labour", "Correct: low cost, local materials and skills, and farmers can maintain them."],
      ["Importing large machines to plough more of the land", "Machines are costly and ploughing more land exposes more soil."],
      ["Drilling deep wells so that herds can grow larger", "Bigger herds around wells increase overgrazing nearby."],
      ["Clearing more woodland to grow cash crops for export", "Clearing woodland removes vegetation and speeds up degradation."],
    ],
    answer: "A",
    explanation: "Stone lines trap rainwater and soil, are built from local stones by local people, and can be repaired without outside money, so they last.",
    hints: ["A sustainable strategy is affordable and can be kept up by local people."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Many large tree-planting projects in dry areas have had disappointing results. What is the **most likely** reason?",
    options: [
      ["Seedlings die from drought or browsing when not cared for", "Correct: without watering, protection and local ownership many young trees die."],
      ["Trees increase the rate of soil erosion on dry land", "Tree roots and leaf litter reduce erosion."],
      ["Planted trees use up all of the rainfall", "Trees use water but do not stop all rainfall reaching the ground."],
      ["Trees cannot grow anywhere in semi-arid areas", "Many trees grow in semi-arid areas if they are protected."],
    ],
    answer: "A",
    explanation: "Planting is the easy part. Survival depends on rainfall, protection from livestock and fire, and local people having a reason to care for the trees.",
    hints: ["Think about what happens to a seedling after the planting ceremony."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A gully is a channel too deep to be smoothed over by a plough.",
    answer: true,
    explanation: "True. Rills can be ploughed over; gullies are deep, steep-sided channels that cut farmland into pieces.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Desertification is caused only by drought, so people cannot do anything to prevent it.",
    answer: false,
    explanation: "False. Desertification results from drought **and** human activities such as overgrazing, over-cultivation and cutting fuelwood. Better land management can slow or reverse it.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Runoff first removes a thin layer of soil by {{blank:a}} erosion. Where water concentrates into small channels, {{blank:b}} erosion occurs. If these channels deepen into steep-sided channels, {{blank:c}} erosion has taken place.",
    blanks: [
      { id: "a", accepted: ["sheet"], choices: ["sheet", "rill", "gully", "wind"] },
      { id: "b", accepted: ["rill"], choices: ["sheet", "rill", "gully", "wind"] },
      { id: "c", accepted: ["gully"], choices: ["sheet", "rill", "gully", "wind"] },
    ],
    wrong: [["gully", "sheet", "rill"]],
    explanation: "Sheet → rill → gully: erosion becomes more concentrated and more damaging.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each land-degradation problem with the most suitable measure.",
    pairs: [
      ["A gully cutting across grazing land", "Stone check dams and grass planting"],
      ["Veld fires spreading from farm to farm", "Fireguards cleared before the dry season"],
      ["Overgrazed communal grazing land", "Controlled and rotational grazing"],
      ["Hillsides cleared for firewood", "Woodlots and afforestation"],
    ],
    explanation: "Each measure targets the cause: check dams slow water in gullies, fireguards stop fires spreading, rotational grazing lets grass recover, and woodlots replace cut trees and supply fuel.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional dam had a capacity of 5,000,000 m³ when it was built. Twenty-five years later a survey shows it can hold only 4,100,000 m³ because of siltation. Calculate the percentage of the original capacity lost.",
    value: 18, unit: "%", tol: 0.1,
    wrong: [82, 22],
    explanation: "Capacity lost = 5,000,000 − 4,100,000 = 900,000 m³; 900,000 ÷ 5,000,000 × 100 = 18 %.",
    workedSolution: "1. Capacity lost = 5,000,000 − 4,100,000 = 900,000 m³.\n2. Percentage lost = 900,000 ÷ 5,000,000 × 100 = 18 %.",
    hints: ["Find the capacity lost first.", "Divide by the ORIGINAL capacity."],
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In 2016 the head of a fictional gully was 45 m from a road. In 2024 it was 21 m from the road. If it keeps growing at the same mean rate, how many years after 2024 will the gully reach the road?",
    value: 7, unit: "years",
    wrong: [3, 8],
    explanation: "Retreat 2016-2024 = 45 − 21 = 24 m in 8 years = 3 m per year. Time to reach the road = 21 ÷ 3 = 7 years.",
    workedSolution: "1. Distance the head moved = 45 − 21 = 24 m.\n2. Mean rate = 24 ÷ 8 years = 3 m per year.\n3. Time to reach the road = 21 m ÷ 3 m per year = 7 years.",
    hints: ["Find the mean rate in metres per year first.", "Then divide the remaining distance by the rate."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the semi-arid belt of Africa, south of the Sahara, that is well known for desertification.",
    accepted: ["Sahel", "the Sahel", "Sahel region", "the Sahel region"],
    wrong: ["Kalahari"],
    explanation: "The **Sahel** stretches across Africa from Senegal to Sudan, between the Sahara to the north and wetter savanna to the south.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how overgrazing leads to soil erosion.",
    points: [
      "Too many animals eat the grass down to the ground, leaving the soil bare.",
      "Hooves trample and loosen the soil and compact paths, which become channels for runoff.",
      "Rain splashes and runoff then wash the unprotected soil away (sheet, rill and gully erosion).",
    ],
    modelAnswer: "When there are more livestock than the land can support, they remove the grass cover completely. Their hooves loosen the soil and wear tracks into the slope. When heavy rain falls, there are no plants to intercept it or roots to bind the soil, so raindrops splash it loose and runoff carries it away, especially along the tracks, which can deepen into gullies.",
    explanation: "A sequence of three linked steps.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the siltation of rivers and dams affects people.",
    points: [
      "Dams store less water, so irrigation and town water supplies run short in the dry season.",
      "This lowers crop yields and incomes, or forces water rationing in towns.",
      "Shallow, silted river channels overflow more easily, causing floods.",
      "Floods damage crops, homes, roads and bridges / silty water costs more to treat.",
    ],
    modelAnswer: "Silt settling in a dam reduces its capacity, so irrigation water runs out earlier in the dry season; farmers produce less and earn less, and towns may have to ration water. Silt also makes river channels shallower and wider, so after heavy rain the river overflows its banks more readily, flooding fields, homes and roads.",
    explanation: "Two effects, each with a consequence for people (2 + 2).",
    hints: ["Think about water supply and about flooding."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "For a named area you have studied, evaluate the strategies used to reduce soil erosion or desertification.",
    points: [
      ["Names a specific area (e.g. communal areas of Masvingo Province, Zimbabwe; the Sahel, e.g. Burkina Faso or Niger).", 1],
      ["Briefly explains the main causes of the degradation in that area.", 1],
      ["Describes strategy 1 (e.g. contour ridges / stone lines / planting basins).", 1],
      ["Evaluates strategy 1 (cost, effectiveness, maintenance, sustainability).", 1],
      ["Describes strategy 2 (e.g. afforestation / Great Green Wall / controlled grazing / conservation agriculture).", 1],
      ["Evaluates strategy 2.", 1],
      ["Reaches an overall judgement on which strategy is most sustainable, with a reason.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "In the Sahel, for example in Burkina Faso and Niger, droughts in the 1970s and 1980s combined with rapid population growth, overgrazing, over-cultivation and cutting of trees for fuel left large areas of bare, crusted soil.\n\nOne strategy is building stone lines along the contours and digging small planting pits filled with manure. The stones slow runoff so that water soaks in and soil is trapped, and the pits concentrate water and nutrients around the crop. Farmers have recovered yields on land that had been abandoned. The method is cheap, uses local stone and labour, and can be repaired by the farmers themselves, although it is hard work and stones may have to be carried long distances.\n\nA second strategy is tree planting, including the Great Green Wall initiative launched by the African Union in 2007. Trees bind soil and provide shade, fodder and fuel. However, many seedlings planted in large projects have died from drought or browsing, and progress depends on outside funding. In Niger, letting tree stumps on farmland regrow (farmer-managed natural regeneration) has been more successful because farmers own and benefit from the trees.\n\nOverall, low-cost methods controlled by local farmers, such as stone lines, planting pits and natural regeneration, have proved more sustainable than large top-down planting schemes, because they continue without outside money.",
    explanation: "Level 3 answers describe and evaluate at least two strategies in a named area and reach a supported judgement.",
    hints: ["Choose strategies you can describe in detail.", "Judge each one: does it work, what does it cost, who keeps it going?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${PLOTS}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which plot lost the least soil?", options: [
        ["Plot Z", "Correct: natural grass lost only 2 t/ha."],
        ["Plot Y", "Plot Y lost 6 t/ha, more than the grass plot."],
        ["Plot X", "Plot X lost 14 t/ha."],
        ["Plot W", "Plot W lost the most (48 t/ha)."],
      ], answer: "A", explanation: "Continuous grass cover protects the soil best." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times more soil was lost from plot W than from plot Z?", value: 24, wrong: [46], explanation: "48 ÷ 2 = 24 times." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage reduction in soil loss when farmers change from the method in plot W to the method in plot Y.", value: 87.5, unit: "%", tol: 0.1, wrong: [12.5, 42], explanation: "Reduction = 48 − 6 = 42 t/ha; 42 ÷ 48 × 100 = 87.5 %." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why plot W lost the most soil.", points: [
        "There is no plant cover to intercept rain, so raindrops splash soil loose.",
        "There are no roots to bind the soil together.",
        "Furrows running up and down the slope channel runoff downhill quickly, carrying soil.",
      ], explanation: "Bare soil plus ploughing direction." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why some farmers do not use the method in plot Y.", points: [
        "Digging planting basins and finding mulch takes a lot of labour.",
        "Crop residues are needed to feed livestock, or farmers lack training / are used to ploughing.",
      ], explanation: "Labour, competition for residues, knowledge and tradition." }),
    ],
    hints: ["Percentage reduction = reduction ÷ original × 100."],
    explanation: "Practice in interpreting soil-erosion data from experimental plots.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: `Study Table 2.\n\n${FUEL}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "By how many kilometres did the mean distance increase between 1995 and 2025?", value: 6.5, unit: "km", tol: 0.05, answer: "6.5", wrong: [9.5], explanation: "8.0 − 1.5 = 6.5 km." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage increase in the distance between 1995 and 2025, to one decimal place.", value: 433.3, unit: "%", tol: 0.1, answer: "433.3", wrong: [81.3, 533.3], explanation: "Increase = 6.5 km; 6.5 ÷ 1.5 × 100 = 433.3 %." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the distance walked to collect firewood has increased.", points: [
        "Trees near the village have been cut for fuelwood faster than they regrow.",
        "Population growth increases demand for firewood and land.",
        "Woodland is cleared for new fields and homes / for curing tobacco or selling firewood.",
      ], explanation: "Deforestation driven by demand for fuel and land." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe **two** effects of this trend on the women of the area.", points: [
        "More time and energy spent collecting wood, leaving less time for farming, income-earning or school (for girls).",
        "Greater physical strain or risk of injury / danger when walking long distances alone.",
      ], explanation: "Social and economic effects on the people who collect fuelwood." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** ways of reducing the problem.", points: [
        "Plant community or household woodlots of fast-growing trees.",
        "Use fuel-efficient stoves, biogas or solar cookers to reduce the wood needed.",
      ], explanation: "Increase supply or reduce demand." }),
    ],
    hints: ["Percentage increase = increase ÷ original value × 100."],
    explanation: "Practice in using data on deforestation and fuelwood.",
  });
  b.card("DEFINITION", "Land degradation", "A long-term decline in the ability of land to support plants, animals and people.");
  b.card("CONCEPT", "Sheet, rill and gully erosion", "Sheet: thin even layer removed. Rill: small channels that can be ploughed over. Gully: deep steep-sided channels that cannot.");
  b.card("DEFINITION", "Siltation", "Build-up of eroded soil on the beds of rivers, dams and wetlands; reduces dam capacity and makes rivers flood more easily.");
  b.card("DEFINITION", "Desertification", "Degradation of dry land until it becomes desert-like, caused by drought together with overgrazing, over-cultivation and deforestation.");
  b.card("CONCEPT", "Human causes of land degradation", "Overgrazing, over-cultivation, ploughing up and down slopes, deforestation, veld fires, sand abstraction, gold panning, draining wetlands.");
  b.card("CONCEPT", "Soil conservation methods", "Contour ridges and ploughing, terracing, afforestation, conservation agriculture, controlled grazing, fireguards, check dams, stone lines.");
  b.card("CONCEPT", "Sustainable land management", "Cheap, uses local materials and labour, supported by the community, and lasts after outside funding ends.");
  b.card("FACT", "Pfumvudza/Intwasa", "Zimbabwe's conservation agriculture programme: planting basins, minimum tillage, mulching and crop rotation.", undefined, { applies: ZIM });
  b.card("FACT", "Great Green Wall", "African Union initiative launched in 2007 to restore degraded land in a belt across the Sahel.");
});
