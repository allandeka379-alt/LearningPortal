// W2b: bio.soils (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: moisture (120-96)/120 = 20% (fresh) and /96 = 25% (dry); LOI (50.0-47.0)/50.0 = 6%; silt at crest 12; clay difference 55;
// moisture ratio 34/6 = 5.7; mean pH 5.84 = 5.8; pH 5.5 vs 6.5 = 10 times.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const POS = ["Crest", "Upper slope", "Mid slope", "Foot slope", "Vlei (dambo)"];
const SLOPE = [2, 8, 5, 2, 0.5];
const DEPTH = [20, 35, 60, 80, 100];
const SAND = [78, 70, 55, 40, 20];
const CLAY = [10, 15, 28, 40, 65];
const PH = [5.2, 5.4, 5.8, 6.2, 6.6];
const MOIST = [6, 8, 12, 18, 34];
const OM = [1.2, 1.5, 1.9, 2.4, 5.8];
const CAT = tbl(["Position", "Slope (°)", "Topsoil depth (cm)", "Sand (%)", "Clay (%)", "pH", "Moisture (%)", "Organic matter (%)"],
  POS.map((p, i) => [p, SLOPE[i], DEPTH[i], SAND[i], CLAY[i], PH[i].toFixed(1), MOIST[i], OM[i].toFixed(1)]));
const moistFresh = chk(((120 - 96) / 120) * 100, 20);
const moistDry = chk(((120 - 96) / 96) * 100, 25);
const loi = chk(((50.0 - 47.0) / 50.0) * 100, 6);
const silt = chk(100 - SAND[0] - CLAY[0], 12);
const clayDiff = chk(CLAY[4] - CLAY[0], 55);
const moistRatio = rnd(MOIST[4] / MOIST[0], 1, 5.7, "moistRatio");
const meanPh = rnd(mean(PH), 1, 5.8, "meanPh");
const phTimes = chk(10 ** (6.5 - 5.5), 10);
const meanDepth = chk(mean(DEPTH), 59);
const depthDiff = chk(DEPTH[4] - DEPTH[0], 80);
const omRatio = rnd(OM[4] / OM[0], 1, 4.8, "omRatio");

concept("ageo.bio.soils", { file: "bio/soils", keyPrefix: "bio.soils" }, (b) => {
  mc(b, 1, "RECALL", "What is a **soil catena**?", [
    ["A sequence of linked soils down a slope", "Correct: the soils differ with position but are linked by drainage."],
    ["A vertical section through one soil showing layers", "That is a soil profile."],
    ["A mixture of sand, silt and clay in a sample", "That is soil texture."],
    ["The layer of litter on the soil surface", "That is the O horizon."],
  ], "A **catena** is a series of soils down a slope from crest to valley floor.");
  mc(b, 1, "RECALL", "Which pair of factors is included in Jenny's formula for soil formation?", [
    ["Parent material and time", "Correct: the five factors are climate, organisms, relief, parent material and time."],
    ["Altitude and latitude", "These are not listed as soil-forming factors."],
    ["Fertiliser and irrigation", "These are management inputs, not Jenny's factors."],
    ["Population and wealth", "These are human factors outside the formula."],
  ], "Jenny: **climate, organisms, relief, parent material and time**.");
  mc(b, 2, "UNDERSTANDING", "Which describes **eluviation**?", [
    ["The washing of fine particles and dissolved material out of a horizon", "Correct: material is removed from the layer."],
    ["The deposition of clay in the subsoil horizon", "That is illuviation."],
    ["The breakdown of litter by bacteria and fungi", "That is decomposition."],
    ["The mixing of topsoil by termites and earthworms", "That is biological mixing."],
  ], "**Eluviation** removes material from a layer; **illuviation** deposits it lower down.");
  mc(b, 2, "UNDERSTANDING", "Why are soils on the crest of a granite slope usually sandy and thin?", [
    ["Fine particles are washed downslope and the soil is eroded", "Correct: clay and silt are carried away, leaving sand."],
    ["The crest receives more clay from the soils above it", "There is nothing above the crest."],
    ["Water collects on the crest and keeps the soil deep", "Water drains away from a crest."],
    ["Granite weathers only into clay minerals", "Granite contains much quartz, which gives sand."],
  ], "Drainage and erosion carry fine material **downslope**, leaving sandy soils on the crest.");
  mc(b, 2, "UNDERSTANDING", "Why is the organic content of vlei soils usually high?", [
    ["Waterlogging slows the decay of plant remains", "Correct: poor aeration slows decomposers."],
    ["Vlei soils are too dry for plants to grow", "Vleis are wet, not dry."],
    ["Fire burns the vlei grass every few weeks", "Frequent burning would reduce organic matter."],
    ["Sand grains in the vlei produce humus directly", "Sand does not produce humus."],
  ], "Waterlogged conditions slow decomposition, so organic matter builds up.");
  mc(b, 3, "APPLICATION", "A soil sample has 20% clay, 15% silt and the rest is sand. What is the percentage of sand?", [
    ["65%", "Correct: 100 − 20 − 15 = 65."],
    ["35%", "This adds the clay and silt but does not subtract them from 100."],
    ["85%", "This subtracts only the silt from 100."],
    ["80%", "This subtracts only the clay from 100."],
  ], "The three fractions add to 100%: sand = 100 − 20 − 15 = **65%**.", { hints: ["The sand, silt and clay percentages add to 100."] });
  mc(b, 3, "ANALYSIS", "A pit shows a pale grey layer lying above a reddish layer with much more clay. What is the best explanation?", [
    ["Clay and iron have been washed out of the upper layer into the lower one", "Correct: eluviation above and illuviation below."],
    ["The pale layer is the parent rock and has not been weathered", "Unweathered rock would be solid, not a soil layer."],
    ["The reddish layer is a surface layer of fresh litter", "Litter is dark and sits at the surface."],
    ["Wind has deposited the clay evenly through the whole profile", "That would not produce a distinct pale and red layering."],
  ], "The pale layer is **eluviated**; the reddish layer is **illuviated**.", { hints: ["Think about the downward movement of water."] });
  b.tf({ d: 1, skill: "RECALL", stem: "The A horizon is the dark topsoil that is rich in humus.", answer: true,
    feedbackTrue: "Correct: roots and soil organisms are concentrated here.",
    feedbackFalse: "Not so: the A horizon is the humus-rich topsoil.",
    explanation: "The **A horizon** is the topsoil." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Soil moisture calculated from the fresh mass and from the dry mass gives the same percentage.", answer: false,
    feedbackFalse: "Correct: the denominators differ, so the percentages differ.",
    feedbackTrue: "Not so: using the dry mass gives a higher percentage.",
    explanation: "Moisture ÷ fresh mass is lower than moisture ÷ dry mass for the same sample." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Particles smaller than 0.002 mm are {{blank:a}}. Soil with a pH below 7 is {{blank:b}}. A layer of weathered parent material is the {{blank:c}} horizon.",
    blanks: [
      { id: "a", accepted: ["clay"], choices: ["clay", "silt", "sand"] },
      { id: "b", accepted: ["acid"], choices: ["acid", "alkaline", "neutral"] },
      { id: "c", accepted: ["C"], choices: ["C", "A", "O"] },
    ], explanation: "Clay is below 0.002 mm; pH below 7 is acid; the C horizon is weathered parent material." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each soil property to a method of measuring it.",
    pairs: [
      ["Moisture content", "Weigh fresh soil, oven-dry it and reweigh"],
      ["Organic content", "Loss on ignition after heating dried soil"],
      ["pH", "A soil test kit or pH meter"],
      ["Colour", "Comparison with a colour chart"],
    ], explanation: "Each property has a standard simple field or laboratory method." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 0,
    stem: "A fresh soil sample has a mass of 120 g. After oven-drying it has a mass of 96 g. Calculate the soil moisture as a percentage of the fresh mass.",
    hints: ["Find the mass of water lost, then divide by the fresh mass."],
    value: moistFresh, wrong: [25, 24],
    explanation: "Water lost = 120 − 96 = 24 g. 24 ÷ 120 × 100 = **20%**. Using the dry mass (96 g) as the base gives 25%, which is a different measure." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: "A 50.0 g sample of oven-dried soil is heated strongly and its mass falls to 47.0 g. Calculate the organic matter content by loss on ignition, as a percentage of the dry mass.",
    hints: ["The mass lost is the organic matter burnt off."],
    value: loi, wrong: [3, 94],
    explanation: "Loss = 50.0 − 47.0 = 3.0 g. 3.0 ÷ 50.0 × 100 = **6%**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1, unit: "times",
    stem: `Illustrative catena data:\n\n${CAT}\n\nHow many times greater is the soil moisture in the vlei than at the crest? Give the answer to 1 decimal place.`,
    hints: ["Divide the vlei value by the crest value."],
    value: moistRatio, wrong: [0.2, 28],
    explanation: "34 ÷ 6 = **5.7** times. Subtracting (28) gives a difference, not a ratio." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "times", dp: 0,
    stem: "Soil A has a pH of 5.5 and soil B has a pH of 6.5. The pH scale is logarithmic: each whole unit is a tenfold change in hydrogen-ion concentration. How many times more acidic is soil A than soil B?",
    hints: ["The difference is one pH unit."],
    value: phTimes, wrong: [1, 100],
    explanation: "1. The difference is 6.5 − 5.5 = 1 pH unit.\n2. Each pH unit is a tenfold change, so soil A is **10** times more acidic than soil B." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "In Zimbabwe, what name is given to a shallow, wet, grassy valley-floor wetland found at the bottom of a catena?",
    accepted: ["dambo", "vlei", "a dambo", "a vlei", "dambos", "vleis"], wrong: ["dwala"],
    explanation: "A **dambo** (or vlei)." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how parent material affects the texture of a soil.",
    hints: ["Compare granite with basalt or dolerite."],
    points: [
      "Granite contains much quartz, which resists weathering and remains as sand grains, so the soil is sandy.",
      "Basalt and dolerite contain minerals that weather to clay, so the soil is clay-rich.",
      "The texture then affects drainage and nutrient retention.",
    ],
    modelAnswer: "Granite contains much quartz, which weathers slowly to sand grains, so granite soils are sandy. Basalt and dolerite weather into clay minerals, giving clay-rich soils. Texture then affects how well the soil drains and holds nutrients.",
    explanation: "The minerals in the rock decide the particles that remain." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why soil depth and clay content increase from the crest to the foot of a slope.",
    hints: ["Think about the movement of water and fine particles downslope."],
    points: [
      "Rainwater running over and through the soil carries fine particles and dissolved material downslope.",
      "Erosion removes material from the steeper upper slopes, keeping soils there thin.",
      "Material is deposited on the gentle lower slopes, where the slope angle falls, building deeper soil.",
      "Clay and nutrients accumulate at the foot, where the water table is closer to the surface and weathering is more intense.",
    ],
    modelAnswer: "Water carries fine particles and dissolved material downslope. Erosion keeps the steeper upper slopes thin, while material is deposited on the gentle lower slopes, which builds deeper soil. Clay and nutrients accumulate at the foot, where the water table is close to the surface.",
    explanation: "Downslope movement and deposition explain the catena." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative catena data:\n\n${CAT}\n\nDescribe how the soil changes from the crest to the vlei.`,
    hints: ["Quote the crest and vlei values for at least three properties."],
    points: [
      "Topsoil depth increases from 20 cm at the crest to 100 cm in the vlei.",
      "Sand decreases from 78% to 20% while clay increases from 10% to 65%.",
      "pH rises from 5.2 (acid) to 6.6 (close to neutral).",
      "Moisture rises from 6% to 34% and organic matter from 1.2% to 5.8%.",
    ],
    modelAnswer: "Topsoil depth increases from 20 cm at the crest to 100 cm in the vlei. Sand falls from 78% to 20% while clay rises from 10% to 65%. The soil becomes less acid, from pH 5.2 to 6.6, and moisture rises from 6% to 34% and organic matter from 1.2% to 5.8%.",
    explanation: "Describe each trend with figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Pupils sampled soils along a catena on a granite slope in Masvingo Province (illustrative data, invented for this exercise).\n\n${CAT}`,
    hints: ["Mean = sum ÷ number of values.", "Think about drainage and decay."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean pH of the five sites, to 1 decimal place.", value: meanPh, dp: 1, wrong: [29.2, 6.6],
        explanation: "(5.2 + 5.4 + 5.8 + 6.2 + 6.6) ÷ 5 = 29.2 ÷ 5 = 5.84, which is 5.8." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the difference in topsoil depth between the vlei and the crest, in cm.", value: depthDiff, unit: "cm", wrong: [59, 120],
        explanation: "100 − 20 = 80 cm." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement about organic matter is correct?", options: [
        ["It is highest in the vlei at 5.8%", "Correct: it is much higher than at any other site."],
        ["It is highest at the crest", "The crest has the lowest value, 1.2%."],
        ["It is the same at all sites", "The values range from 1.2% to 5.8%."],
        ["It decreases from the crest to the vlei", "It increases downslope."],
      ], answer: "A", explanation: "5.8% in the vlei is the highest value." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the vlei soil has the highest organic matter and moisture.",
        points: [
          "The vlei lies at the bottom of the slope, where water collects from the slopes above and the water table is near the surface.",
          "Waterlogging reduces oxygen, so decomposers work slowly and plant remains build up as organic matter.",
          "Dense grass and sedge growth supply large amounts of plant remains, and the clay holds water and nutrients.",
        ],
        modelAnswer: "Water drains from the slopes to the vlei, so the water table is near the surface and the soil is wet. Waterlogging reduces oxygen, so decomposers work slowly and plant remains accumulate as organic matter. Dense grass and sedge growth supplies a lot of plant material, and the clay holds water.",
        explanation: "Water collection, slow decomposition and plenty of plant matter." }),
    ], explanation: "Calculate from a catena table and explain the pattern." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A pupil measures the moisture and organic content of a topsoil sample from a school field (illustrative data). Fresh mass 120 g; oven-dry mass 96 g. A 50.0 g portion of the dried soil has a mass of 47.0 g after strong heating.",
    hints: ["Moisture = water lost ÷ fresh mass × 100.", "Organic matter = mass lost on heating ÷ dry mass × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the moisture content as a percentage of the fresh mass.", value: moistFresh, dp: 0, unit: "%", wrong: [25, 24],
        explanation: "(120 − 96) ÷ 120 × 100 = 20%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the organic matter content of the dried soil, in per cent.", value: loi, dp: 0, unit: "%", wrong: [3, 6.4],
        explanation: "(50.0 − 47.0) ÷ 50.0 × 100 = 6%." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two precautions that would make the results more reliable.",
        points: [
          "Dry the sample until its mass stops changing (constant mass) and weigh accurately on the same balance.",
          "Take several samples from different places at the same depth and calculate a mean.",
        ],
        modelAnswer: "Dry the soil until the mass is constant and weigh on the same balance each time. Take several samples from different places at the same depth and calculate a mean.",
        explanation: "Constant mass and repeat samples." }),
    ], explanation: "Calculate soil moisture and organic content and improve reliability." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of parent material, relief and climate in explaining differences in soils in Zimbabwe.",
    hints: ["Give an example of each factor from southern Africa.", "End with a judgement."],
    points: [
      "Parent material sets the starting texture and minerals: granite gives sandy soils, basalt and dolerite give clays.",
      "Relief controls drainage and erosion: thin sandy soils on crests and deep wet soils in vleis (the catena).",
      "Climate controls weathering and leaching: heavier rainfall in the Eastern Highlands gives deeper, more leached soils than the dry lowveld.",
      "Time and organisms also matter, for example the effects of termites and vegetation on organic matter.",
      "Parent material is most important where the climate is the same, such as sands and clays beside each other.",
      "Relief is most important at the local scale, creating the catena within one geology and climate.",
      "Climate is most important at the national scale, explaining regional patterns of weathering and leaching.",
      "Judgement: the factors interact; parent material and relief explain local differences, while climate explains regional ones.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Parent material is important because it sets the starting minerals: granite weathers to sandy soils and basalt and dolerite weather to clays. Relief controls drainage and erosion, which gives thin sandy soils on crests and deep wet soils in the vleis along a catena. Climate controls the rate of weathering and leaching, so the wetter Eastern Highlands have deeper, more leached soils than the dry lowveld. Time and living organisms such as termites also matter. Parent material is the key factor where the climate is the same, relief within one slope, and climate at the national scale. I conclude that the factors interact: parent material and relief explain local differences, while climate explains regional ones.",
    wordLimit: { max: 300 }, explanation: "Weigh the factors at different scales and judge." });

  b.card("FORMULA", "Jenny's formula", "S = f(cl, o, r, p, t): soil depends on climate, organisms, relief, parent material and time.");
  b.card("CONCEPT", "Soil horizons", "O litter, A topsoil (humus), E leached layer, B subsoil (accumulation), C weathered parent material, R bedrock.");
  b.card("DEFINITION", "Soil catena", "A sequence of linked soils down a slope from crest to valley floor, differing because of drainage and position.");
  b.card("CONCEPT", "Granite catena", "Thin sandy soils on the crest; deeper, more clay-rich soils at the foot; deep, dark, wet clay soils in the vlei (dambo).");
  b.card("DEFINITION", "Soil texture", "The proportions of sand (2.0–0.05 mm), silt (0.05–0.002 mm) and clay (below 0.002 mm); the three add to 100%.");
  b.card("DEFINITION", "Eluviation and illuviation", "Eluviation: removal of material from a layer. Illuviation: deposition of that material in a lower layer.");
  b.card("FORMULA", "Soil moisture", "Moisture (%) = (fresh mass − dry mass) ÷ fresh mass × 100 (or ÷ dry mass; state the base).");
  b.card("FORMULA", "Organic matter by loss on ignition", "Organic matter (%) = (dry mass − mass after heating) ÷ dry mass × 100.");
  b.card("FACT", "The pH scale", "Below 7 is acid, above 7 is alkaline; each whole unit is a tenfold change in hydrogen-ion concentration.");
});
