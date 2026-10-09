// Slice W3b: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A), ZIMSEC P2
// Section B crop production (20 marks) and Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer
// must check them against past papers.
import { concept, P, ZIM, CAM, sprayVolume, pct, grossMargin, round, check, table, agricultureLevels } from "../lib.mjs";

// T1: calibration over 8 m x 30 m (240 m²), 5.4 L used, 20 L tank, label 1.35 L/ha.
const T1 = sprayVolume({ litresUsed: 5.4, areaM2: 240, tankL: 20 });
T1.lPerHa = round(T1.lPerHa, 2);
T1.tanksPerHa = round(T1.tanksPerHa, 4);
const T1fills = Math.ceil(T1.tanksPerHa - 1e-9);
const T1ml = round((1.35 * 1000 * 20) / T1.lPerHa, 2);
check(Math.abs(T1.lPerHa - 225) < 1e-9 && T1fills === 12 && T1ml === 120, "T1");

// T2: fall armyworm scouting.
const T2pct = pct(21, 60);
check(Math.abs(T2pct - 35) < 1e-9, "T2");

// T3: tomato gross margin on 0.4 ha.
const T3 = grossMargin({ output: [["Tomatoes (t)", round(0.4 * 14, 2), 320]], variable: [["Seedlings", 180], ["Fertiliser and manure", 210], ["Chemicals", 160], ["Casual labour", 300], ["Transport and crates", 120]], areaHa: 0.4 });
for (const k of ["grossOutput", "grossMargin", "perHa"]) T3[k] = round(T3[k], 2);
check(T3.grossOutput === 1792 && T3.variableCosts === 970 && T3.grossMargin === 822 && T3.perHa === 2055, "T3");
const T3_TABLE = table(["Item", "Amount"], [
  ["Area", "0.4 ha"],
  ["Expected yield", "14 t/ha"],
  ["Expected price (assume)", "US\\$320 per tonne"],
  ...T3.variableRows.map(([i, a]) => [i, `US\\$${a}`]),
]);

// T4: pig feed and daily gain.
const FEED = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
const GAIN = [320, 500, 620, 700, 740, 750];
const T4steps = GAIN.slice(1).map((g, i) => g - GAIN[i]);
check(T4steps.join() === "180,120,80,40,10", "T4 steps");
const T4ap = GAIN[2] / FEED[2];
const T4value = round(T4steps[3] * 0.003, 2);
check(T4ap === 310 && T4value === 0.12, "T4");
const T4_TABLE = table(["Feed per pig per day (kg)", "Mean daily gain (g)"], FEED.map((f, i) => [f.toFixed(1), GAIN[i]]));

// Z1: tomato field checks, 200 plants.
const Z1_ROWS = [[1, 2, 0, 3], [2, 5, 4, 9], [3, 11, 9, 18], [4, 16, 15, 30]];
const Z1_TABLE = table(["Week", "Plants with bored fruit", "Plants wilted", "Plants with ringed leaf spots"], Z1_ROWS);
const Z1wilt = pct(Z1_ROWS[3][2], 200);
check(Math.abs(Z1wilt - 7.5) < 1e-9, "Z1");

// Z2: weed control on 3.5 ha of maize.
const Z2A = 3.5, Z2wage = 4.5;
const Z2litres = round(Z2A * 1.8, 2);
const Z2hand = 2 * 20 * Z2wage;
const Z2herb = round(1.8 * 9 + 1 * Z2wage + 8 * Z2wage, 2);
const Z2save = round(Z2A * (Z2hand - Z2herb), 2);
check(Z2litres === 6.3 && Z2hand === 180 && Z2herb === 56.7 && Z2save === 431.55, "Z2");

// C2: value of an extra bag.
const C2mp = 3550 - 3300;
const C2value = round(C2mp * 0.28, 2);
check(C2mp === 250 && C2value === 70, "C2");

concept("agri.protection.agrochemicals", { file: "exam/w3b-theory", keyPrefix: "exam.w3b-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.protection.agrochemicals"],
    stem: "Sipho calibrates his 20 L knapsack sprayer before spraying a fungicide on potatoes near Marondera. He fills the tank with water, sprays a strip 8 m × 30 m at his normal walking speed and pumping rate, and finds that he has used 5.4 L.",
    hints: ["1 ha = 10,000 m².", "Product per tank = product per ha × tank volume ÷ spray volume."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the part of the sprayer that breaks the liquid into droplets.",
        accepted: ["nozzle", "the nozzle", "nozzle tip", "spray nozzle"],
        keywords: { any: ["nozzle"] },
        explanation: "The **nozzle**.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the spray volume in L/ha.",
        value: T1.lPerHa, unit: "L/ha", tol: 0, wrong: [round(5.4 / 240, 4), 5.4 * 240],
        explanation: `Area = 8 × 30 = 240 m²; 5.4 ÷ 240 × 10,000 = ${T1.lPerHa} L/ha.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "How many tank fills are needed to spray 1 ha? Round UP to a whole number.",
        value: T1fills, tol: 0, wrong: [Math.floor(T1.tanksPerHa), round(T1.tanksPerHa, 2)],
        explanation: `${T1.lPerHa} ÷ 20 = ${T1.tanksPerHa}, so ${T1fills} fills.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "The label rate is 1.35 L of product per hectare. Calculate the volume of product, in mL, for each full tank.",
        value: T1ml, unit: "mL", tol: 0, wrong: [1.35 * 20, round((1.35 * 1000) / 20, 1)],
        explanation: `1.35 × 1000 × 20 ÷ ${T1.lPerHa} = ${T1ml} mL.`,
      }),
      P.mcq({
        label: "(e)", stem: "Which precaution is most important when measuring the concentrated fungicide?",
        options: [
          ["Wear gloves and eye protection", "Correct: the concentrate is the most dangerous form."],
          ["Measure it in the kitchen out of the wind", "Chemicals must never be handled in the kitchen."],
          ["Taste a drop to check its strength", "Never taste chemicals."],
          ["Use a cooking cup that is washed afterwards", "Use a dedicated measure kept with the chemicals."],
        ],
        answer: "A",
        explanation: "The concentrate is handled with gloves and eye protection, outdoors, with a measure kept only for chemicals.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the calibration must be repeated if a different person sprays or a new nozzle is fitted.",
        points: ["The volume applied depends on walking speed, pumping rate (pressure) and nozzle size.", "A different person or nozzle changes the L/ha, so the dose of fungicide would be wrong (too much or too little)."],
        explanation: "Calibration is specific to operator and nozzle.",
      }),
    ],
    explanation: "Name a sprayer part, calibrate a knapsack sprayer and mix the correct dose safely.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.protection.pests", "agri.protection.pest-control"],
    stem: "Nyasha scouts her young maize near Chinhoyi. Of 60 plants checked, 21 have ragged holes in the leaves and moist, sawdust-like droppings in the funnel. She finds green-brown caterpillars with a pale inverted Y on the head.",
    hints: ["% infested = infested ÷ checked × 100.", "Where is the larva hiding, and when is it easiest to kill?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the pest.",
        accepted: ["fall armyworm", "armyworm", "Spodoptera frugiperda", "fall army worm", "FAW"],
        keywords: { any: ["armyworm", "army worm", "spodoptera", "faw"] },
        explanation: "**Fall armyworm** (*Spodoptera frugiperda*).",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of plants infested.",
        value: T2pct, unit: "%", tol: 0, wrong: [21, round((60 / 21) * 100, 1)],
        explanation: `21 ÷ 60 × 100 = ${T2pct}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "How does the adult female lay her eggs?",
        options: [
          ["In masses on the leaves, covered with scales", "Correct."],
          ["Singly inside the maize grains in store", "That is the grain weevil."],
          ["In pods buried in the soil", "That is the locust."],
          ["Between the leaf sheath and stem only", "That is typical of the stalk borer."],
        ],
        answer: "A",
        explanation: "Fall armyworm moths lay egg masses on leaves, covered with greyish scales.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State the type of metamorphosis of this pest and name its stages in order.",
        points: ["Complete metamorphosis.", "Egg → larva → pupa (in the soil) → adult moth."],
        explanation: "Complete: four stages.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why control should be aimed at young larvae early in the infestation.",
        points: ["Young larvae are small, feed openly and are easier to kill.", "Older larvae hide deep in the funnel or bore into cobs, where sprays reach them poorly, and do most damage."],
        explanation: "Early, exposed stages.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest **two** non-chemical methods Nyasha could use against this pest.",
        points: ["Hand-pick and crush egg masses and larvae / apply sand or ash into funnels.", "Encourage natural enemies (avoid broad-spectrum sprays) / push-pull or intercropping / timely planting / destroy crop residues."],
        explanation: "Mechanical, biological and cultural options.",
      }),
    ],
    explanation: "Identify a named pest, calculate infestation, describe its life cycle and suggest control.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true, applies: ZIM,
    paper: "ZIMSEC Paper 2 Section A",
    concepts: ["agri.business.budgets"],
    stem: `Farai plans to grow tomatoes on a small irrigated plot near Mutare. His budget figures are shown.\n\n${T3_TABLE}`,
    hints: ["Gross output = area × yield × price.", "Gross margin = gross output − variable costs."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which of these would be a **fixed** cost for Farai's farm rather than a variable cost of the tomatoes?",
        options: [
          ["Depreciation of his water pump", "Correct: shared by the farm and not tied to the tomato area."],
          ["Tomato seedlings", "A variable cost of tomatoes."],
          ["Chemicals for the tomatoes", "A variable cost."],
          ["Crates for the tomatoes", "A variable cost."],
        ],
        answer: "A",
        explanation: "Depreciation of equipment is a fixed cost; seedlings, chemicals and crates vary with the tomato area.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the gross output of the tomatoes.",
        value: T3.grossOutput, prefix: "US$", wrong: [14 * 320, round(0.4 * 320, 2)],
        explanation: `0.4 × 14 = 5.6 t; 5.6 × 320 = US\\$${T3.grossOutput.toLocaleString("en-GB")}.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the total variable costs.",
        value: T3.variableCosts, prefix: "US$", wrong: [T3.variableCosts - 120, T3.variableCosts + 180],
        explanation: `180 + 210 + 160 + 300 + 120 = US\\$${T3.variableCosts}.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the gross margin per hectare.",
        value: T3.perHa, prefix: "US$", wrong: [T3.grossMargin, round(T3.grossMargin * 0.4, 2)],
        explanation: `Gross margin = ${T3.grossOutput.toLocaleString("en-GB")} − ${T3.variableCosts} = US\\$${T3.grossMargin}; per ha = ${T3.grossMargin} ÷ 0.4 = US\\$${T3.perHa.toLocaleString("en-GB")}.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why fixed costs are not subtracted when calculating a gross margin.",
        points: ["Fixed costs are shared by the whole farm and are paid whatever enterprise is grown.", "Leaving them out allows enterprises to be compared fairly (they are subtracted later in a whole-farm budget)."],
        explanation: "Fixed costs do not change with the choice.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** sources of information Farai could use for his budget figures.",
        points: ["His own records from previous seasons.", "AGRITEX extension officers / input suppliers' price lists / buyers' prices / farm management handbooks / other farmers."],
        explanation: "Records and outside sources.",
      }),
    ],
    explanation: "Classify costs and calculate gross output, variable costs and gross margin per hectare.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.business.diminishing-returns"],
    stem: `In a feeding trial at a farm near Gweru, groups of growing pigs were given different amounts of the same ration (example figures).\n\n${T4_TABLE}`,
    hints: ["Extra gain = difference between neighbouring rows.", "Gain per kg of feed = gain ÷ feed."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the extra daily gain, in g, when feed is raised from 2.0 kg to 2.5 kg per day.",
        value: T4steps[2], tol: 0, wrong: [GAIN[3], T4steps[1]],
        explanation: `700 − 620 = ${T4steps[2]} g per day.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the daily gain per kg of feed (average product) at 2.0 kg of feed per day, in g per kg.",
        value: T4ap, tol: 0, wrong: [GAIN[2] * FEED[2], GAIN[2]],
        explanation: `620 ÷ 2.0 = ${T4ap} g per kg of feed.`,
      }),
      P.mcq({
        label: "(c)", stem: "Between which two feeding levels is the extra gain smallest?",
        options: [
          ["3.0 kg and 3.5 kg", "Correct: only 10 g extra."],
          ["1.0 kg and 1.5 kg", "This gives the largest extra gain (180 g)."],
          ["2.0 kg and 2.5 kg", "80 g extra."],
          ["2.5 kg and 3.0 kg", "40 g extra."],
        ],
        answer: "A",
        explanation: "Extra gains: 180, 120, 80, 40, 10 g: each step adds less.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Assume each extra gram of daily gain is worth US\\$0.003. Calculate the value of the extra gain from raising feed from 2.5 kg to 3.0 kg per day.",
        value: T4value, prefix: "US$", answer: "0.12", wrong: [round(GAIN[4] * 0.003, 2), 40],
        explanation: `Extra gain = 740 − 700 = 40 g; 40 × 0.003 = US\\$${T4value.toFixed(2)}.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State the law of diminishing returns as shown by these results.",
        points: ["As more and more feed (variable input) is given to the pig (fixed input / its capacity)…", "…the extra gain from each additional 0.5 kg of feed becomes smaller."],
        explanation: "Variable input to a fixed factor; falling extra output.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "The extra 0.5 kg of feed costs US\\$0.20. Suggest the most profitable feeding level and explain your answer.",
        points: ["2.5 kg per day.", "The step from 2.0 to 2.5 kg adds 80 g worth US\\$0.24 (more than US\\$0.20), but the step to 3.0 kg adds only US\\$0.12, less than its cost."],
        explanation: "Compare the value of each step with its cost.",
      }),
    ],
    explanation: "Interpret a feeding trial with the law of diminishing returns and find the most profitable level.",
  });
});

concept("agri.protection.diseases", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.protection.pests", "agri.protection.diseases", "agri.protection.pest-control"],
    stem: `Chipo grows 200 tomato plants near Masvingo. She records three problems each week. Bored fruits contain caterpillars; wilted plants collapse suddenly while still green; the leaf spots are dark brown with rings.\n\n${Z1_TABLE}`,
    hints: ["% = plants affected ÷ 200 × 100.", "Which group of organism makes ringed spots, and which causes sudden wilt?", "For the long part, organise your answer from before planting to harvest."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the fungal disease that causes dark brown leaf spots with rings on tomatoes.",
        accepted: ["early blight", "early blight of tomato", "Alternaria", "alternaria leaf spot", "target spot"],
        keywords: { any: ["early blight", "alternaria"] },
        explanation: "**Early blight**.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of plants wilted in week 4.",
        value: Z1wilt, unit: "%", tol: 0.05, answer: "7.5", wrong: [15, round((200 / 15) * 100, 1)],
        explanation: `15 ÷ 200 × 100 = ${Z1wilt}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "A wilted stem placed in a glass of water releases milky threads. Which group of organism causes the wilt?",
        options: [
          ["Bacteria", "Correct: bacterial wilt."],
          ["Fungi", "Fungal wilts do not stream ooze like this."],
          ["Viruses", "Viruses cause mosaics and curling, not ooze."],
          ["Nematodes", "Root-knot nematodes cause galls, not ooze."],
        ],
        answer: "A",
        explanation: "Streaming bacterial ooze shows bacterial wilt.",
      }),
      P.short({
        label: "(d)", stem: "Name the moth whose larvae bore into tomato fruits.",
        accepted: ["American bollworm", "bollworm", "African bollworm", "Helicoverpa armigera", "Helicoverpa", "tomato fruitworm"],
        keywords: { any: ["bollworm", "helicoverpa"] },
        explanation: "The **American bollworm**.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe the life cycle of the pest named in (d).",
        points: ["Eggs laid singly on young leaves, buds and flowers.", "Larvae feed on buds and flowers and bore into the fruit.", "Larvae pupate in the soil; moths emerge and lay eggs (complete metamorphosis)."],
        explanation: "Egg, larva, pupa in soil, adult.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why spraying a fungicide will not control the wilt.",
        points: ["The wilt is caused by bacteria, which fungicides do not kill.", "The bacteria are inside the water-conducting tissue / in the soil, where sprays cannot reach (there is no chemical cure)."],
        explanation: "Wrong organism, inaccessible site.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "State **two** precautions Chipo must observe when spraying tomatoes that are close to harvest.",
        points: ["Observe the pre-harvest interval on the label before picking.", "Wear protective clothing / spray in calm weather / keep people out of the field until the re-entry time / wash fruit."],
        explanation: "Residues and operator safety.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe an integrated programme Chipo could follow from before planting to harvest to control the pests and diseases of her tomatoes.",
        points: [
          "Before planting: rotate away from tomato-family crops (and land with bacterial wilt) for several seasons; choose resistant varieties and clean, healthy seedlings.",
          "Prepare well-drained land; remove weed hosts such as nightshades and old crop residues.",
          "Space and stake plants for air movement; water at the base (drip or furrow) so leaves stay dry, reducing early blight.",
          "Scout regularly (twice a week), recording bored fruit, wilted plants and leaf spots, and compare with action levels.",
          "Remove and destroy wilted plants with their soil and pick off spotted lower leaves; disinfect tools and wash hands.",
          "Use a protectant fungicide against early blight when weather favours it, renewing after rain.",
          "Against bollworm: destroy damaged fruit, use pheromone traps to time action, encourage natural enemies, and spray a suitable insecticide on young larvae only when scouting shows it is needed.",
          "Observe pre-harvest intervals, wear protective clothing, and after harvest destroy residues and rotate.",
        ],
        levels: agricultureLevels(8),
        explanation: "Prevention, monitoring, cultural, biological and chemical methods in order, with reasons.",
      }),
    ],
    explanation: "Interpret field records of tomato pests and diseases, describe a pest life cycle and plan integrated control.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.protection.weeds", "agri.protection.weed-control"],
    stem: `Tendai grows ${Z2A} ha of maize on sandy soil near Gokwe. Short plants with red flowers appear among the maize each February, and a corner of the field is full of couch grass. He compares weeding by hand twice (20 person-days per hectare each time) with a programme of a pre-emergence herbicide at 1.8 L/ha plus 1 person-day of spraying and one hand weeding of 8 person-days per hectare. Assume labour costs US\\$${Z2wage.toFixed(2)} per person-day and the herbicide US\\$9 per litre.`,
    hints: ["Work out each programme's cost per hectare.", "Multiply by the area for whole-field figures.", "For the long part, think over several seasons: witchweed seeds live for years."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the parasitic weed with red flowers.",
        accepted: ["witchweed", "witch weed", "striga", "Striga asiatica"],
        keywords: { any: ["witch", "striga"] },
        explanation: "**Witchweed** (*Striga*).",
      }),
      P.mcq({
        label: "(b)", stem: "How is couch grass classified?",
        options: [
          ["A perennial grass", "Correct: it spreads by rhizomes and stolons."],
          ["An annual broad-leaved weed", "Couch grass is a grass and perennial."],
          ["A perennial sedge", "Sedges have triangular stems, like nut grass."],
          ["An annual parasitic weed", "That describes witchweed."],
        ],
        answer: "A",
        explanation: "Couch grass is a perennial grass.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the volume of herbicide needed for the whole field, in litres.",
        value: Z2litres, unit: "L", tol: 0.05, answer: "6.3", wrong: [1.8, round(1.8 / Z2A, 2)],
        explanation: `${Z2A} × 1.8 = ${Z2litres} L.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the cost per hectare of the herbicide programme, to the nearest cent.",
        value: Z2herb, prefix: "US$", answer: "56.70", wrong: [round(1.8 * 9, 2), round(1.8 * 9 + 8 * Z2wage, 2)],
        explanation: `Herbicide 1.8 × 9 = US\\$16.20; spraying 1 × 4.50 = US\\$4.50; hand weeding 8 × 4.50 = US\\$36; total US\\$${Z2herb.toFixed(2)}.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate how much Tendai saves on the whole field by using the herbicide programme instead of hand weeding twice. Give your answer to the nearest cent.",
        value: Z2save, prefix: "US$", answer: "431.55", wrong: [round(Z2hand - Z2herb, 2), round(Z2A * Z2hand, 2)],
        explanation: `Hand weeding: 2 × 20 × 4.50 = US\\$${Z2hand} per ha. Saving per ha = ${Z2hand} − ${Z2herb.toFixed(2)} = US\\$${round(Z2hand - Z2herb, 2).toFixed(2)}; × ${Z2A} = US\\$${Z2save.toFixed(2)}.`,
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why a pre-emergence herbicide should be applied to moist soil soon after planting.",
        points: ["It forms a layer in the surface soil that kills weed seedlings as they germinate, which needs moisture to work.", "Applied before crop and weeds emerge, it keeps the crop weed-free in its critical early weeks."],
        explanation: "Moist soil activates the layer; early control.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why couch grass is not killed by hoeing or by a contact herbicide.",
        points: ["It regrows from its rhizomes and stolons, which hoeing cuts up and spreads.", "A contact herbicide kills only the leaves it touches and does not reach the rhizomes (a systemic herbicide is needed)."],
        explanation: "Underground organs.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Discuss how Tendai could reduce witchweed and couch grass in this field over the next few seasons.",
        points: [
          "Witchweed seeds stay alive in the soil for many years, so control must continue over several seasons.",
          "Rotate maize with trap crops such as groundnuts, cowpeas, soya beans or cotton, which cause suicidal germination of witchweed seeds.",
          "Hand-pull witchweed before it flowers and sets seed, and destroy it, so the seed store shrinks.",
          "Improve soil fertility with manure or compost and nitrogen fertiliser, which reduces witchweed attack; use tolerant varieties and clean seed.",
          "Treat couch grass with a systemic (translocated) non-selective herbicide while it is actively growing, before planting, so the chemical reaches the rhizomes.",
          "Avoid ploughing or harrowing through the couch grass patch, which spreads rhizome pieces; clean implements.",
          "Use mulch and a good crop stand (correct spacing, timely planting) to shade out weeds; compare costs and labour of each method.",
          "Judgement: a combination (rotation, hand-pulling, fertility, systemic herbicide on couch) works best because no single method removes both weeds.",
        ],
        levels: agricultureLevels(8),
        explanation: "An integrated, multi-season programme with reasons for each method.",
      }),
    ],
    explanation: "Identify and classify weeds, compare the costs of weed control programmes and plan long-term control.",
  });
});

concept("agri.protection.pest-control", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.protection.pests", "agri.protection.pest-control"],
    stem: "A farmer's cabbages are attacked by caterpillars that eat holes in the leaves and by aphids that cluster under the leaves.",
    hints: ["(a) Stages in order, where each happens, and the damage.", "(b) Where does each insecticide go after spraying?", "(c) Weigh IPM against chemicals alone and decide."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the life cycle and damage of a named biting and chewing pest of a crop grown in your area.",
        points: [
          "Named pest with complete metamorphosis, e.g. fall armyworm / maize stalk borer / American bollworm.",
          "Eggs laid on the plant (e.g. masses on leaves, or between leaf sheath and stem).",
          "Larvae feed and cause damage (e.g. ragged holes and frass in the maize funnel, or boring into stems or fruit).",
          "Larvae pupate (in the soil or in stems) and adult moths emerge and spread to new crops.",
        ],
        explanation: "Name, stages in order, damage.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how contact and systemic insecticides act, and which would be more suitable against the aphids.",
        points: [
          "A contact insecticide kills insects when it touches their bodies.",
          "It must cover the pest, is washed off by rain, and does not reach insects hidden under leaves or inside plants.",
          "A systemic insecticide is absorbed by the plant and carried in the sap to all parts.",
          "Sap-sucking insects are poisoned as they feed, wherever they are on the plant; new growth is protected.",
          "Systemic is more suitable for aphids, which suck sap and hide under leaves (observing the pre-harvest interval).",
        ],
        explanation: "Mode of action and suitability.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the farmer should use integrated pest management (IPM) rather than relying on insecticides alone.",
        points: [
          "Relying on insecticides is fast and effective in an outbreak.",
          "But repeated sprays are costly, leave residues on the cabbages and can poison people and pollute water.",
          "Pests become resistant, and natural enemies such as ladybirds and parasitic wasps are killed, causing pest resurgence or secondary pests.",
          "IPM combines scouting and thresholds, cultural methods (rotation, hygiene), biological control and selective sprays only when needed.",
          "IPM needs knowledge, regular scouting and time.",
          "Judgement: IPM is better in the long term (lower costs, safer food, slower resistance), with chemicals kept as one tool within it.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh both approaches and reach a judgement.",
      }),
    ],
    explanation: "Life cycle and damage of a named pest, how insecticides act, and a discussion of IPM.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945, calculator: true,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.business.economic-principles", "agri.business.diminishing-returns", "agri.business.risk-decisions"],
    stem: "A maize farmer is deciding how much fertiliser to buy for the coming season. Most farmers in the area expect a good season.",
    hints: ["(a) Supply and price.", "(b) Extra yield × price.", "(d) Consider prices, costs, diminishing returns and risk."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "State the law of supply and explain how a bumper maize harvest across the area would affect the market price of maize.",
        points: [
          "Law of supply: other things equal, the higher the price, the greater the quantity supplied.",
          "A bumper harvest increases supply at every price (supply shifts).",
          "Demand for maize changes little, so at the old price there is a surplus.",
          "Sellers cut prices to sell, so the market price falls.",
        ],
        explanation: "Law, shift, surplus, price fall.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Adding a third bag of fertiliser per hectare raises the expected yield from 3,300 kg to 3,550 kg. Assume maize sells at US\\$0.28 per kg. Calculate the value of the extra yield.",
        value: C2value, prefix: "US$", wrong: [C2mp, round(3550 * 0.28, 2)],
        explanation: `Extra yield = 3,550 − 3,300 = ${C2mp} kg; ${C2mp} × 0.28 = US\\$${C2value}.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain, using the law of diminishing returns, why each additional bag of fertiliser adds less yield than the one before.",
        points: [
          "Land (and the crop's capacity) is a fixed input; fertiliser is the variable input.",
          "As nutrients become less limiting, other factors (water, light, the crop's genetic potential) limit growth.",
          "So the marginal product of each extra bag falls, and very high rates may even reduce yield.",
        ],
        explanation: "Fixed factor and limiting factors.",
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Discuss how the farmer should decide how many bags of fertiliser to apply.",
        points: [
          "Compare the value of the extra yield from each bag with the cost of the bag; stop when the value falls below the cost.",
          "The most profitable rate is below the rate that gives maximum yield.",
          "If the maize price is likely to fall (bumper harvest), the value of extra yield falls, so fewer bags are justified.",
          "Risk: in a drought year the extra fertiliser may give little return, so a farmer with little money may apply less or split top dressings.",
          "Other factors: soil test results, cash or credit available, opportunity cost of the money, contracts that fix the price.",
          "Judgement: a reasoned rate based on soil tests and marginal value versus cost, adjusted for expected price and risk.",
        ],
        levels: agricultureLevels(6),
        explanation: "Marginal value versus cost, adjusted for price expectations and risk.",
      }),
    ],
    explanation: "Supply and price, the value of an extra input, diminishing returns and an economic decision on fertiliser.",
  });
});
