// Slice W1a: reducing the effects of adverse environmental conditions (ZIMSEC only).
import { concept, P, field, waterVolume, pct, mean, fmtNum, table, agricultureLevels } from "../lib.mjs";

const bed14 = field(10, 1.2);
const vol14 = waterVolume({ areaM2: bed14.m2, depthMm: 15 });

const bed15 = field(6, 2);
const vol15 = waterVolume({ areaM2: bed15.m2, depthMm: 25 });
const cans15 = vol15.litres / 15;

const basin16 = field(2.5, 0.8);
const vol16 = waterVolume({ areaM2: basin16.m2, depthMm: 45 });
const field16m3 = (vol16.litres * 4000) / 1000;

const MOISTURE = [
  ["Day 0 (after rain)", 28, 28],
  ["Day 4", 24, 19],
  ["Day 8", 20, 13],
  ["Day 12", 17, 8],
];
const lossMulch = 28 - 17;
const lossBare = 28 - 8;

const TRIAL = [
  ["Flat planting, no mulch", 1.1],
  ["Potholes only", 1.6],
  ["Potholes + mulch", 2.0],
  ["Potholes + mulch + manure", 2.4],
];
const trialGain = pct(2.4 - 1.1, 1.1);

concept("agri.environment.adverse-conditions", { file: "environment/adverse-conditions", keyPrefix: "environment.adverse-conditions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main way in which a mulch of dry grass helps a crop during a dry spell?",
    options: [
      ["It reduces evaporation of water from the soil", "Correct: the mulch shades the soil and slows water loss."],
      ["It adds water to the soil as it rots", "Mulch does not supply water; it reduces loss."],
      ["It increases the rate of transpiration", "Mulch does not increase transpiration; that would waste water."],
      ["It raises the soil temperature sharply at midday", "Mulch keeps the soil cooler, not hotter."],
    ],
    answer: "A",
    explanation: "Mulch shades the soil, reduces evaporation, keeps the soil cool, reduces weeds and protects the surface from crusting.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How should a windbreak be positioned?",
    options: [
      ["Across the prevailing wind, on its upwind side", "Correct: it must cross the path of the wind to slow it."],
      ["Parallel to the prevailing wind", "Wind would blow along it, not be slowed by it."],
      ["Downwind of the crop it protects", "It must stand between the wind and the crop."],
      ["In the middle of each field, facing in any direction you like", "Direction matters: across the prevailing wind."],
    ],
    answer: "A",
    explanation: "A windbreak is planted across (at right angles to) the prevailing wind, upwind of the crop, garden or pens.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How do tied ridges reduce the effect of low rainfall?",
    options: [
      ["They hold rainwater in basins so it soaks into the soil", "Correct: cross-ties stop water running along or off the field."],
      ["They drain water quickly away from the crop", "That is the purpose of drains, used on waterlogged land."],
      ["They shade the soil surface and lower its temperature by day", "This is mainly what mulch does."],
      ["They raise the crop above flood water", "Ridges can do this on wet land, but the ties are for holding water."],
    ],
    answer: "A",
    explanation: "Ridges made along the contour and joined by cross-ties form basins that trap rain, so it infiltrates instead of running off.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "At what time of day should a vegetable garden be watered to waste the least water?",
    options: [
      ["Early morning or late afternoon", "Correct: evaporation is lowest when it is cool."],
      ["Midday, when plants are wilting", "Much of the water evaporates in the midday heat."],
      ["Any time, because evaporation is always the same", "Evaporation depends strongly on temperature, sun and wind."],
      ["Only at night during a frost", "Watering is done when evaporation is low, not only at night in frost."],
    ],
    answer: "A",
    explanation: "Watering in the cool of the morning or evening lets more water soak into the root zone before it evaporates.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which crop is the best choice for a farmer whose maize often fails in dry spells?",
    options: [
      ["Pearl millet", "Correct: pearl millet tolerates heat and drought well."],
      ["Rice", "Rice needs a lot of water."],
      ["Irrigated wheat", "Wheat is a winter crop needing irrigation; it does not solve a rain-fed dry-spell problem."],
      ["Tea", "Tea needs high, reliable rainfall."],
    ],
    answer: "A",
    explanation: "Drought-tolerant crops such as sorghum, pearl millet, finger millet, cowpeas and cassava are more reliable where dry spells are common.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does adding manure to a sandy soil help crops survive a dry spell?",
    options: [
      ["It increases the soil's water-holding capacity", "Correct: organic matter holds water like a sponge and improves structure."],
      ["It makes the soil drain water faster", "Sandy soils already drain too fast; manure helps hold water."],
      ["It raises the air temperature around the crop", "Manure does not warm the air."],
      ["It stops plants from transpiring", "Plants must transpire; manure does not stop it."],
    ],
    answer: "A",
    explanation: "Organic matter (humus) holds water and binds sand particles into crumbs, so the soil stores more water for the crop.",
    hints: ["Think about what organic matter does to the soil's ability to hold water."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A farmer builds a closed plastic tunnel to grow tomatoes. What is a problem he must manage?",
    options: [
      ["Very high temperatures inside on sunny days", "Correct: plastic traps heat, so tunnels need ventilation."],
      ["Frost forming inside on summer afternoons", "The tunnel protects against frost; it does not cause it."],
      ["Heavy rain falling directly on the plants", "The tunnel keeps rain off the crop."],
      ["Strong wind flattening the crop inside", "The tunnel shelters the crop from wind."],
    ],
    answer: "A",
    explanation: "Greenhouses and tunnels protect crops from frost, rain, hail and wind, but they can overheat and become humid, so they need ventilation; they are also expensive.",
    hints: ["What happens inside a closed car parked in the sun?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer on sandy soil in a low-rainfall area wants to grow maize. Which combination of measures would most improve the water available to the crop?",
    options: [
      ["Potholes at planting stations, mulch and manure", "Correct: these catch rain, reduce evaporation and raise water-holding capacity."],
      ["Deep ploughing every season and burning crop residues", "Ploughing and burning expose the soil and increase water loss."],
      ["Planting late, after the rains have ended", "Late planting leaves the crop short of water."],
      ["Removing all trees around the field to increase wind", "Wind increases evapotranspiration."],
    ],
    answer: "A",
    explanation: "Potholes capture rain at the roots, mulch cuts evaporation and manure helps sandy soil hold the water. Ploughing and burning do the opposite.",
    hints: ["Choose measures that catch rain, keep it in and help the soil hold it."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A mulch supplies water to the soil when it rots.",
    answer: false,
    explanation: "False. Mulch reduces water loss by evaporation; it does not supply water. As it rots it adds organic matter.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hardy indigenous cattle breeds such as the Mashona are better able to withstand heat and drought than many exotic breeds.",
    answer: true,
    explanation: "True. Indigenous breeds (Mashona, Tuli, Nkone) are adapted to local heat, drought, poor grazing and many local diseases.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each adverse condition with a suitable measure.",
    pairs: [
      ["Strong prevailing wind", "Windbreak of trees across the wind"],
      ["Hot sun scorching transplants", "Shade cloth over the seedbed"],
      ["Rain running off a sloping field", "Tied ridges along the contour"],
      ["Frost in winter", "Growing tender crops in a greenhouse"],
      ["Rapid drying of bare soil", "Mulching with crop residues"],
    ],
    explanation: "Each measure attacks the cause of the problem: slowing wind, cutting radiation, holding water, trapping heat or reducing evaporation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Growing crops with minimum soil disturbance and leaving residues on the surface is called {{blank:a}} tillage. Crops such as cowpeas grown to protect bare soil are called {{blank:b}} crops.",
    blanks: [
      { id: "a", accepted: ["conservation"], choices: ["conservation", "conventional", "deep", "secondary"] },
      { id: "b", accepted: ["cover"], choices: ["cover", "cash", "trap", "catch"] },
    ],
    explanation: "Conservation tillage and cover crops both keep the soil covered, reduce evaporation and runoff, and add organic matter.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the practice of digging small basins at each planting station to collect rainwater.",
    accepted: ["potholing", "potholes", "planting basins", "planting basin", "pot holing", "basins"],
    wrong: ["ridging"],
    explanation: "Potholing (planting basins) concentrates rainwater where the roots are.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A seedbed measures 10 m by 1.2 m. How many litres of water are needed to apply 15 mm of water to it? (1 mm of water on 1 m² = 1 L.)",
    value: vol14.litres, unit: "L", wrong: [vol14.litres / 10, 12],
    explanation: `Area = 10 × 1.2 = ${bed14.m2} m². Volume = ${bed14.m2} × 15 = ${vol14.litres} L.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A garden bed measures 6 m by 2 m and needs 25 mm of water. How many 15 L watering cans of water are needed?",
    value: cans15, wrong: [vol15.litres, 10],
    explanation: `Area = 6 × 2 = ${bed15.m2} m². Volume = ${bed15.m2} × 25 = ${vol15.litres} L. Cans = ${vol15.litres} ÷ 15 = ${cans15}.`,
    workedSolution: `1. Area = 6 × 2 = ${bed15.m2} m².\n2. Volume = ${bed15.m2} m² × 25 mm = ${vol15.litres} L (1 mm on 1 m² = 1 L).\n3. Number of cans = ${vol15.litres} ÷ 15 = ${cans15}.`,
    hints: ["Find the volume in litres first.", "Then divide by the size of one can."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Each basin between tied ridges in a field measures 2.5 m by 0.8 m. A storm fills every basin to a depth of 45 mm. The field has 4,000 basins. Calculate the total volume of water held, in m³ (1 m³ = 1,000 L).",
    value: field16m3, unit: "m³", wrong: [vol16.litres * 4000, vol16.litres],
    explanation: `Basin area = 2.5 × 0.8 = ${basin16.m2} m². Water per basin = ${basin16.m2} × 45 = ${vol16.litres} L. Total = ${vol16.litres} × 4,000 = ${fmtNum(vol16.litres * 4000)} L = ${field16m3} m³.`,
    workedSolution: `1. Basin area = 2.5 × 0.8 = ${basin16.m2} m².\n2. Water per basin = ${basin16.m2} m² × 45 mm = ${vol16.litres} L.\n3. Total = ${vol16.litres} × 4,000 = ${fmtNum(vol16.litres * 4000)} L.\n4. In m³: ${fmtNum(vol16.litres * 4000)} ÷ 1,000 = ${field16m3} m³.`,
    hints: ["1 mm over 1 m² is 1 L.", "Divide litres by 1,000 to get m³."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which conservation tillage reduces the effect of dry spells on a crop.",
    points: [
      "Crop residues are left on the surface as a mulch.",
      "Which reduces evaporation and keeps the soil cooler and moist for longer.",
      "The soil is not ploughed, so its pores and structure are kept / organic matter builds up.",
      "So more rain infiltrates and the soil holds more water.",
    ],
    modelAnswer: "Residues left on the surface act as a mulch that shades the soil and reduces evaporation. Because the soil is not ploughed, its pore structure and organic matter are kept, so rain soaks in faster and more water is stored for the crop.",
    explanation: "Link each feature of conservation tillage to more water in the soil.",
    hints: ["Think about the residues and about not ploughing."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** measures a farmer in a hot, dry area could take to reduce heat and drought stress in a herd of cattle, and explain each.",
    points: [
      "Provide shade (trees or shelters) / keep hardy indigenous breeds.",
      "Reduces heat stress so animals keep grazing and producing / adapted breeds tolerate heat, drought and poor grazing.",
      "Store feed (hay, silage, crop residues) and provide reliable water points / reduce numbers early in a drought.",
      "So animals have enough feed and water through the dry season and do not lose condition.",
    ],
    modelAnswer: "Provide shade trees in the paddocks so the cattle can rest out of the sun and keep eating. Store hay and crop residues and provide water points so the herd has feed and water through the dry season.",
    explanation: "Each measure needs a reason.",
    hints: ["Think about heat, feed and water."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2",
    stem: `Pupils measured soil moisture (%) at 10 cm depth in a mulched bed and a bare bed after rain.\n\n**Table 1**\n\n${table(["Time", "Mulched bed (%)", "Bare bed (%)"], MOISTURE)}`,
    hints: ["Loss = moisture on day 0 − moisture on day 12."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the fall in soil moisture in the bare bed from day 0 to day 12, in percentage points.", value: lossBare, wrong: [8], explanation: `28 − 8 = ${lossBare} percentage points.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the fall in the mulched bed over the same period.", value: lossMulch, wrong: [17], explanation: `28 − 17 = ${lossMulch} percentage points.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the effect of the mulch shown by the results.", points: [
        "The mulched bed lost moisture more slowly / kept more moisture at every reading.",
        `Quotes data, e.g. day 12: 17% against 8% (fall of ${lossMulch} against ${lossBare}).`,
      ], explanation: "Describe the pattern and quote figures." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain the effect you described.", points: [
        "The mulch shades the soil and keeps it cooler.",
        "So less water evaporates from the soil surface.",
      ], explanation: "Mulch reduces evaporation." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** ways the pupils could make their experiment more reliable.", points: [
        "Repeat with several beds of each type (replicates) / take readings at several points and average.",
        "Keep other conditions the same (same soil, same shade, same depth of reading, same time of day).",
      ], explanation: "Replication and control of variables make results reliable." }),
    ],
    explanation: "The mulch slowed moisture loss because it reduced evaporation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `A fictional trial on sandy soil in a dry district compared maize yields (t/ha) with different water-conserving practices.\n\n**Table 2**\n\n${table(["Practice", "Maize yield (t/ha)"], TRIAL)}`,
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "For (c), weigh up benefits, labour and cost."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage increase in yield from flat planting to potholes + mulch + manure. Give your answer to the nearest whole number.", value: trialGain, tol: 0.5, answer: String(Math.round(trialGain)), unit: "%", wrong: [54], explanation: `(2.4 − 1.1) ÷ 1.1 × 100 = 1.3 ÷ 1.1 × 100 = ${Math.round(trialGain)}%. (Dividing by 2.4 gives 54%, the wrong base.)` }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why each added practice increased the yield.", points: [
        "Potholes collect rain at the planting stations.",
        "So more water soaks in where the roots are.",
        "Mulch reduces evaporation from the soil.",
        "Manure raises the water-holding capacity (and fertility) of the sandy soil.",
      ], explanation: "Each practice adds a different way of keeping water for the crop." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss whether farmers in the district should adopt all three practices.", points: [
        "The full combination gave the highest yield (more than double flat planting).",
        "The practices are cheap in cash terms and use local materials (grass, crop residues, manure).",
        "But digging potholes and collecting mulch and manure need a lot of labour.",
        "Mulch may be scarce because residues are fed to cattle / termites eat mulch.",
        "Benefits build up over seasons as organic matter increases; they reduce the risk of crop failure.",
        "Reasoned conclusion, e.g. adopt all three, starting on part of the land if labour is short.",
      ], levels: agricultureLevels(6), explanation: "A discussion weighs yield benefits against labour and material constraints." }),
    ],
    explanation: "Combining water-harvesting, mulch and manure gave the largest benefit on sandy soil in a dry area.",
  });

  b.card("DEFINITION", "Mulching", "Covering the soil with grass, residues or leaves to reduce evaporation, keep soil cool and protect it from raindrop impact.");
  b.card("DEFINITION", "Potholing", "Digging small basins at planting stations to collect and hold rainwater around the plants.");
  b.card("DEFINITION", "Tied ridging", "Contour ridges joined by cross-ties to form basins that hold rainwater.");
  b.card("DEFINITION", "Windbreak", "A belt of trees, shrubs or tall grass at right angles to the prevailing wind, reducing wind speed.");
  b.card("CONCEPT", "How manure helps against drought", "Adds organic matter, which improves structure and increases water-holding capacity.");
  b.card("CONCEPT", "Greenhouses: for and against", "Protect from frost, rain, hail, wind and some pests; costly and can overheat without ventilation.");
  b.card("FACT", "Name three drought-tolerant crops.", "Sorghum, pearl millet and finger millet (also cowpeas and cassava).");
  b.card("FORMULA", "Water volume for an area", "Litres = area (m²) × depth (mm), because 1 mm on 1 m² = 1 L.");
  b.card("CONCEPT", "Protecting livestock from heat and drought", "Shade, ventilated housing, stored feed, reliable water, early destocking and hardy indigenous breeds.");
});
