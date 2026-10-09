// Slice W1a: physical farm planning (both boards).
import { concept, P, field, fmtNum, table, agricultureLevels } from "../lib.mjs";

const f13 = field(250, 160);
const f14 = field(600, 350);
const f14each = f14.ha / 3;
const f15 = field(1000, 600);
const f15used = 22 + 5 + 3;
const f15paddock = (f15.ha - f15used) / 4;

const PLOT = [
  ["A", "Rocky ridge, slope about 25%", "Shallow, stony", "North boundary"],
  ["B", "Gentle slope, about 3%", "Deep red clay loam", "Centre"],
  ["C", "Seasonally waterlogged vlei", "Grey, wet clay", "Beside the stream, south"],
  ["D", "Slightly raised, flat ground", "Well-drained sandy loam", "East, beside the main road and borehole"],
];
const plotB = field(450, 400);

const SITE = "Tatenda's new 50 ha farm lies on a slope that falls from a granite ridge in the west to a small river in the east. The prevailing wind blows from the south-east. A gravel road runs along the northern boundary. He plans to keep 20 dairy cows and 200 layers, grow maize and soya beans in rotation, and run a 0.5 ha irrigated vegetable garden.";
const twoFields = field(400, 300);

concept("agri.land.farm-planning", { file: "land/farm-planning", keyPrefix: "land.farm-planning" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **physical farm planning**?",
    options: [
      ["Deciding where fields, buildings, roads and water will go", "Correct: it is about the layout of the land."],
      ["Working out the expected costs and income of an enterprise", "This is budgeting, part of farm business planning."],
      ["Choosing which crop variety to buy from a seed supplier each season", "This is a production decision, not physical planning."],
      ["Recording daily egg production on a poultry unit", "This is record keeping."],
    ],
    answer: "A",
    explanation: "Physical farm planning arranges the parts of the farm on the ground so that land is used for what it suits and work is efficient.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Where should a pig sty be sited in relation to the farmhouse?",
    options: [
      ["Downwind of the house, at a reasonable distance", "Correct: smells and flies blow away from the house, but the pigs are still easy to supervise."],
      ["Upwind of the house, right beside it", "Smells and flies would blow straight into the house."],
      ["Upslope of the borehole, so effluent can drain away", "Effluent would drain towards and pollute the water supply."],
      ["On the far boundary, as far as possible from the house", "Too far away makes supervision, feeding and security difficult."],
    ],
    answer: "A",
    explanation: "Livestock housing goes near the homestead for supervision and security, but downwind of it and downslope of water sources.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which part of a farm is the best site for a woodlot?",
    options: [
      ["A steep, stony ridge that is unsuitable for ploughing", "Correct: trees hold the soil on steep land and use land that cannot be cropped."],
      ["The deepest, flattest soil in the middle of the farm", "This is the best arable land and should be used for crops."],
      ["The seasonally waterlogged vlei beside the stream", "Most trees grow poorly in waterlogged soil, and the vlei should be protected as a wetland."],
      ["The area between the borehole and the vegetable garden", "This area is needed for the garden, which must be close to water."],
    ],
    answer: "A",
    explanation: "Woodlots are placed on steep, stony or rocky land, or as windbreaks, leaving the best soils for crops.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should the vegetable garden be placed close to the water supply?",
    options: [
      ["Vegetables need watering often, so less carrying is needed", "Correct: gardens are watered often, so they belong near the water."],
      ["Vegetables grow best in waterlogged soil", "Most vegetables are damaged by waterlogging; they need well-drained soil."],
      ["Water sources are always on the steepest land", "Water sources are usually in valleys or low ground, not on the steepest land."],
      ["Livestock must drink from the garden water every single day", "Livestock should be kept out of the garden."],
    ],
    answer: "A",
    explanation: "Enterprises that need frequent attention and water, such as gardens and orchards, are sited close to the water supply and homestead.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How should farm roads be laid out on sloping land?",
    options: [
      ["Along the contours or field boundaries", "Correct: water does not rush along them, so they do not erode into gullies."],
      ["Straight down the steepest slope", "Runoff would follow the road and cut it into a gully."],
      ["Through the middle of each arable field", "This wastes arable land and splits the fields."],
      ["Across the vlei to shorten the route", "Roads across wetlands get waterlogged and damage the wetland."],
    ],
    answer: "A",
    explanation: "Roads on the contour or along boundaries carry little runoff and do not waste good land.",
    hints: ["Think about where rain water flows."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A planner divides the arable land into four fields of equal size. What is the main reason?",
    options: [
      ["It suits a four-course rotation with equal crop areas", "Correct: each crop in the rotation gets one field each season."],
      ["Equal fields need no conservation works", "All fields on slopes need contour ridges, whatever their size."],
      ["It makes each field large enough for ranching", "Arable fields are for crops, not ranching."],
      ["Fields of equal size do not need any fencing or roads", "Fields still need access tracks."],
    ],
    answer: "A",
    explanation: "Equal-sized fields make crop rotation simple: each crop moves to the next field each season, and the area of each crop stays the same.",
    hints: ["Think about crops that move from field to field each season."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which of these planned positions is the **poorest** choice?",
    options: [
      ["A cattle kraal on a slope just above the borehole", "Correct: manure and urine would wash down into the water supply and pollute it."],
      ["A woodlot on a steep, rocky hill", "This is sensible: trees protect steep land."],
      ["Stores beside the homestead near the access road", "This is sensible: stores are secure and easy to load."],
      ["Paddocks on shallow soils with a water trough in each", "This is sensible: poorer land used for grazing, with water."],
    ],
    answer: "A",
    explanation: "Livestock pens must be downslope of water sources so effluent does not contaminate drinking water.",
    hints: ["Look for a position that could harm a water supply."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The homestead is best built on low-lying ground beside the vlei, so that it is close to water.",
    answer: false,
    explanation: "False. The homestead should be on slightly higher, well-drained ground near water and the road. Low-lying vlei land is wet, prone to flooding and may have more mosquitoes.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "A sketch of a farm layout should include a key, a north arrow and labels for each area.",
    answer: true,
    explanation: "True. A key, a north arrow, labels and the direction of slope or wind make a farm plan clear and earn marks.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each part of a farm with the most suitable site.",
    pairs: [
      ["Arable fields", "Deep soils on gentle slopes, with contour ridges"],
      ["Woodlot", "Steep, stony ridge or a windbreak line"],
      ["Poultry house", "Near the homestead, downwind of it"],
      ["Dam", "A narrow point in a valley with water-holding soil"],
      ["Paddocks", "Poorer or steeper land with access to water"],
    ],
    explanation: "Each part of the farm goes where the land suits it and where work is easiest.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the conversion.",
    template: "One hectare is equal to {{blank:a}} square metres.",
    blanks: [{ id: "a", accepted: ["10000", "10,000", "10 000"], wrong: "1000" }],
    explanation: "1 ha = 100 m × 100 m = 10,000 m².",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the fenced areas of grazing land into which a farm is divided for rotational grazing.",
    accepted: ["paddocks", "paddock", "camps", "grazing paddocks"],
    wrong: ["fields"],
    explanation: "Grazing is divided into fenced paddocks (camps) so that livestock can be moved and each paddock rested.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A rectangular field measures 250 m by 160 m. Calculate its area in hectares.",
    value: f13.ha, unit: "ha", wrong: [f13.m2, 400],
    explanation: `Area = 250 × 160 = ${fmtNum(f13.m2)} m²; ÷ 10,000 = ${f13.ha} ha. (40,000 is the area in m², and 400 comes from dividing by 100 instead of 10,000.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "An arable block measures 600 m by 350 m and is divided into three fields of equal size. Calculate the area of each field in hectares.",
    value: f14each, unit: "ha", wrong: [f14.ha, 70000],
    explanation: `Block = 600 × 350 = ${fmtNum(f14.m2)} m² = ${f14.ha} ha. Each field = ${f14.ha} ÷ 3 = ${f14each} ha.`,
    workedSolution: `1. Area of block = 600 × 350 = ${fmtNum(f14.m2)} m².\n2. Convert: ${fmtNum(f14.m2)} ÷ 10,000 = ${f14.ha} ha.\n3. Each field = ${f14.ha} ÷ 3 = ${f14each} ha.`,
    hints: ["Find the area in m², convert to ha, then share."],
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "A rectangular farm measures 1,000 m by 600 m. The plan uses 22 ha for arable fields, 5 ha for a woodlot and 3 ha for buildings, garden and roads. The rest is to be divided into four equal paddocks. Calculate the area of each paddock in hectares.",
    value: f15paddock, unit: "ha", wrong: [(f15.ha) / 4, f15.ha - f15used],
    explanation: `Farm = 1,000 × 600 = ${fmtNum(f15.m2)} m² = ${f15.ha} ha. Used = 22 + 5 + 3 = ${f15used} ha. Grazing = ${f15.ha} − ${f15used} = ${f15.ha - f15used} ha. Each paddock = ${f15.ha - f15used} ÷ 4 = ${f15paddock} ha.`,
    workedSolution: `1. Farm area = 1,000 × 600 = ${fmtNum(f15.m2)} m² = ${f15.ha} ha.\n2. Land already allocated = 22 + 5 + 3 = ${f15used} ha.\n3. Land for paddocks = ${f15.ha} − ${f15used} = ${f15.ha - f15used} ha.\n4. Each paddock = ${f15.ha - f15used} ÷ 4 = ${f15paddock} ha.`,
    hints: ["Convert the farm area to hectares first.", "Subtract the land already allocated before dividing."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a farmer should plan the layout of a farm before developing it.",
    points: [
      "Each area of land is used for what it suits (crops on good soils, grazing or trees on poorer or steep land).",
      "So yields are higher and land is not degraded.",
      "Conservation works / water supplies / roads can be placed before fields are opened (or: distances are kept short).",
      "So erosion is prevented (or: time, labour and fuel are saved).",
    ],
    modelAnswer: "Planning makes sure each area is used for what suits it, such as crops on deep soils and trees on steep land, so the land stays productive. It also places contour ridges and waterways before the fields are opened, which prevents erosion.",
    explanation: "Each reason earns a mark and its explanation a second mark.",
    hints: ["Think about land suitability, conservation and efficiency."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest where a farmer should site (i) the homestead and (ii) a piggery, giving **one** reason for each position.",
    points: [
      "Homestead: slightly higher, well-drained ground, central, near water and the access road.",
      "Reason: dry and healthy site / easy access and supervision of the whole farm.",
      "Piggery: near the homestead but downwind of it and downslope of water sources.",
      "Reason: smells and flies blow away from the house / effluent does not pollute water, while the pigs are still easy to supervise and secure.",
    ],
    modelAnswer: "(i) On slightly raised, well-drained ground near the centre of the farm, close to the road and water, so it is dry and the farmer can reach all parts easily. (ii) Close to the homestead but downwind and downslope of the borehole, so smells blow away and effluent cannot reach the water.",
    explanation: "Positions earn marks only with sensible reasons.",
    hints: ["Think about drainage, access, wind direction and water pollution."],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2",
    stem: `Table 1 describes four areas of a fictional farm.\n\n**Table 1**\n\n${table(["Area", "Slope", "Soil", "Position"], PLOT)}`,
    hints: ["Match each area to the use it suits best.", "Area B measures 450 m by 400 m."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which area is best suited to the homestead and farm buildings?", options: [
        ["Area D", "Correct: raised, well-drained, beside the road and borehole."],
        ["Area A", "Too steep and stony for building and access."],
        ["Area B", "The best arable land; buildings would waste it."],
        ["Area C", "A wet vlei: poorly drained and prone to flooding."],
      ], answer: "A", explanation: "Buildings go on raised, well-drained land near water and the road." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the most suitable use for area A.", accepted: ["woodlot", "a woodlot", "forestry", "trees", "tree planting", "timber plantation", "woodland"], wrong: ["maize"], explanation: "Steep, stony land should be kept under trees." }),
      P.num({ label: "(c)", marks: 2, stem: "Area B measures 450 m by 400 m. Calculate its area in hectares.", value: plotB.ha, unit: "ha", wrong: [plotB.m2], explanation: `450 × 400 = ${fmtNum(plotB.m2)} m² = ${plotB.ha} ha.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how area C should be used and protected.", points: [
        "Fence it off / do not plough it / keep it as a protected wetland.",
        "Ploughing would destroy the wetland, which stores water and feeds the stream.",
        "Use it only for controlled (dry-season) grazing or leave it under grass.",
        "Keeps plant cover, prevents erosion and siltation of the stream.",
      ], explanation: "Vleis should be protected; at most they are grazed under control." }),
    ],
    explanation: "Good planning matches each area to its soil and slope.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: SITE,
    hints: ["Use the slope, the river, the road and the wind direction.", "For (c), give a position and a reason for each part of the farm."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Tatenda's two arable fields each measure 400 m by 300 m. Calculate the total arable area in hectares.", value: 2 * twoFields.ha, unit: "ha", wrong: [twoFields.ha], explanation: `Each field: 400 × 300 = ${fmtNum(twoFields.m2)} m² = ${twoFields.ha} ha. Two fields = ${2 * twoFields.ha} ha.` }),
      P.manual({ label: "(b)", marks: 4, stem: "State **four** factors Tatenda should consider when planning the layout.", points: [
        "Soil type and depth in each part of the farm.",
        "Slope / the granite ridge and the direction of runoff.",
        "Water sources (the river, possible borehole or dam sites).",
        "Access to the road / markets / prevailing wind / existing trees.",
      ], explanation: "Any four distinct factors." }),
      P.manual({ label: "(c)", marks: 6, stem: "Describe a suitable layout for Tatenda's farm, giving reasons for the positions you choose.", points: [
        "Woodlot on the granite ridge in the west (too steep and stony; protects the slope).",
        "Homestead, stores and dairy shed on well-drained ground near the northern road (access for milk collection, security).",
        "Layer house and dairy pens downwind (north-west) of the house and downslope of any borehole.",
        "Arable fields on the gentle middle slopes with contour ridges and grassed waterways.",
        "Vegetable garden near the river or borehole for irrigation; paddocks on the lower slopes with water, river bank protected.",
        "Roads along boundaries or contours; fire guards around buildings, woodlot and paddocks.",
      ], levels: agricultureLevels(6), explanation: "Credit sensible positions linked to slope, water, road and wind." }),
    ],
    explanation: "A good layout uses the ridge for trees, the middle slopes for crops, the lower land for grazing and water-hungry enterprises, and keeps smells downwind.",
  });

  b.card("DEFINITION", "Physical farm planning", "Deciding where fields, paddocks, buildings, roads, water supplies and conservation works go on a farm.");
  b.card("DEFINITION", "Paddock", "A fenced area of grazing that allows livestock to be moved and the grass rested.");
  b.card("CONCEPT", "Where should livestock housing go?", "Near the homestead for supervision, but downwind of it and downslope of water sources.");
  b.card("CONCEPT", "Where should a woodlot go?", "On steep, stony or rocky land, or as a windbreak on the side of the prevailing wind.");
  b.card("CONCEPT", "Where should arable fields go?", "On deep, well-drained soils on gentle slopes, protected by contour ridges.");
  b.card("CONCEPT", "Farm roads on slopes", "Along contours or boundaries, never straight down the slope (they become gullies).");
  b.card("FORMULA", "Area conversion", "1 ha = 10,000 m²; area (ha) = length (m) × width (m) ÷ 10,000.");
  b.card("CONCEPT", "Factors in farm planning", "Soil, slope, water sources, roads and markets, natural region, frost, prevailing wind, existing features.");
  b.card("FACT", "What must a farm layout sketch include?", "Labelled areas, a key, a north arrow and the direction of slope or prevailing wind.");
});
