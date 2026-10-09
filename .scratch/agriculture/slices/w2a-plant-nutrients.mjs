// Slice W2a: plant nutrients, deficiency and oversupply.
import { concept, P, pct, round, productForNutrient, check, table, agricultureLevels } from "../lib.mjs";

// Daily / num: percentage reduction in a sand-culture trial (different numbers from the lesson).
const fullG = 18.0, noMgG = 12.6;
const redMg = pct(fullG - noMgG, fullG);
check(Math.abs(redMg - 30) < 1e-9, "redMg");

// Calc: N removed by a sorghum harvest and AN to replace it.
const grainT = 4.5, kgNPerT = 16;
const nOut = grainT * kgNPerT;
const anKg = productForNutrient(nOut, 34.5);
check(Math.abs(nOut - 72) < 1e-9 && Math.abs(anKg - 208.6957) < 1e-3, "anKg");

// Structured: pot trial with four solutions.
const TRIAL = [["Complete", 32.0, "Dark green, upright"], ["No nitrogen", 11.2, "Pale yellow, older leaves first"], ["No phosphorus", 17.6, "Purple tinge on leaves, small roots"], ["No calcium", 20.8, "Tips of young leaves hooked and dead"]];
const T_TABLE = table(["Culture solution", "Mean dry mass (g)", "Appearance after four weeks"], TRIAL.map(([a, g, c]) => [a, g.toFixed(1), c]));
const redN = pct(TRIAL[0][1] - TRIAL[1][1], TRIAL[0][1]);
const ratioP = TRIAL[0][1] / TRIAL[2][1];
check(Math.abs(redN - 65) < 1e-9, "redN");
check(Math.abs(ratioP - 1.8182) < 1e-3, "ratioP");

concept("agri.soil.plant-nutrients", { file: "soil/plant-nutrients", keyPrefix: "soil.plant-nutrients" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which nutrient is the central atom of the chlorophyll molecule?",
    options: [
      ["Magnesium", "Correct: each chlorophyll molecule has a magnesium atom at its centre."],
      ["Calcium, which is built into the walls of every leaf cell", "Calcium is part of cell walls, not chlorophyll."],
      ["Potassium", "Potassium controls stomata and activates enzymes; it is not part of chlorophyll."],
      ["Phosphorus", "Phosphorus is needed for energy transfer (ATP) and roots."],
    ],
    answer: "A",
    explanation: "Magnesium sits at the centre of chlorophyll, which is why a shortage causes chlorosis between the veins.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Young maize seedlings in a cold, wet spell show a purple colour on their leaves. Which nutrient are they most likely short of?",
    options: [
      ["Phosphorus", "Correct: purpling is the classic sign of phosphorus deficiency in young maize."],
      ["Nitrogen, which is needed for proteins and chlorophyll", "Nitrogen shortage gives pale yellow leaves, not purple."],
      ["Potassium", "Potassium shortage scorches leaf margins."],
      ["Magnesium", "Magnesium shortage gives yellow stripes between the veins."],
    ],
    answer: "A",
    explanation: "Phosphorus deficiency shows as purple or reddish leaves; cold, wet soils slow phosphorus uptake by young roots.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which deficiency sign is typical of potassium shortage?",
    options: [
      ["Browning and scorching of the edges of older leaves", "Correct: marginal scorch on older leaves is the typical sign."],
      ["Purple leaves on young seedlings", "That points to phosphorus."],
      ["A yellow V from the leaf tip down the midrib of lower leaves", "That is the typical nitrogen sign in maize."],
      ["White bands on either side of the midrib of young leaves", "That is zinc deficiency in maize."],
    ],
    answer: "A",
    explanation: "Potassium is mobile, so it is moved out of old leaves, whose edges then scorch; stalks are also weak.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tomatoes on a farm near Mutare develop dark, sunken patches at the end of the fruit away from the stalk. Which nutrient problem is this?",
    options: [
      ["Calcium deficiency (blossom-end rot)", "Correct: blossom-end rot is linked to too little calcium reaching the fruit."],
      ["Nitrogen excess", "Too much nitrogen gives lush leaves, not this fruit disorder."],
      ["Sulfur deficiency", "Sulfur shortage gives general yellowing of young leaves."],
      ["Molybdenum deficiency, which causes whiptail in cauliflowers", "Molybdenum is linked to whiptail in brassicas, not this tomato disorder."],
    ],
    answer: "A",
    explanation: "Calcium is immobile and needed for cell walls; fruit tissue short of it collapses at the blossom end, often when watering is irregular.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On a crop, the **youngest** leaves turn yellow between green veins while the older leaves stay green. Which nutrient is most likely lacking?",
    options: [
      ["Iron", "Correct: iron is immobile, so its interveinal chlorosis appears on young leaves."],
      ["Magnesium", "Magnesium causes interveinal chlorosis on older leaves, because it is mobile."],
      ["Nitrogen", "Nitrogen yellowing starts on older leaves and is not limited to the spaces between veins."],
      ["Potassium, which is moved to new growth when supply is short", "Potassium is mobile, so it affects older leaves."],
    ],
    answer: "A",
    hints: ["Is the nutrient mobile or immobile in the plant?", "Mobile nutrients show first on old leaves."],
    explanation: "Interveinal chlorosis on young leaves points to an immobile nutrient such as iron; on old leaves the same pattern suggests magnesium.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Groundnuts on a sandy soil produce many empty pods (\"pops\"). Which treatment would most directly correct this?",
    options: [
      ["Gypsum applied to the pegging zone at flowering", "Correct: gypsum supplies calcium where the pods form."],
      ["Extra ammonium nitrate as a top dressing at pegging", "Groundnuts fix their own nitrogen; nitrogen does not fill pods."],
      ["Muriate of potash broadcast before planting", "Extra potassium can even reduce calcium uptake."],
      ["A foliar spray of urea", "Nitrogen is not the cause of empty pods."],
    ],
    answer: "A",
    hints: ["Which nutrient do developing groundnut pods take directly from the soil?"],
    explanation: "Developing pods absorb calcium directly from the soil around them, so gypsum (calcium sulfate) is applied to the pegging zone at flowering.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer applies twice the recommended nitrogen to a wheat crop. Which outcome is most likely?",
    options: [
      ["Lush, soft growth that lodges and suffers more aphid and fungal attack", "Correct: excess nitrogen weakens stems and attracts pests and diseases."],
      ["Stronger stems, because nitrogen builds thicker cell walls", "Calcium and potassium strengthen stems; extra nitrogen weakens them."],
      ["Earlier maturity and a higher grain yield in proportion to the extra nitrogen", "Excess nitrogen delays maturity and yield does not rise in proportion."],
      ["Purple leaves, because nitrogen blocks phosphorus uptake", "Purpling is a phosphorus sign; excess nitrogen gives dark green leaves."],
    ],
    answer: "A",
    hints: ["Think about what nitrogen does to leafy growth, and what happens when there is too much."],
    explanation: "Too much nitrogen gives tall, soft plants with weak stems that fall over (lodge) and are more attractive to aphids and fungi; maturity is delayed and money is wasted.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a shortage of molybdenum often seen first in legumes such as soya beans?",
    options: [
      ["Molybdenum is needed for nitrogen fixation in the root nodules", "Correct: without it the nodules fix little nitrogen and the plant yellows."],
      ["Legumes need molybdenum to make their seed coats hard", "This is not the role of molybdenum."],
      ["Molybdenum is the main part of legume chlorophyll", "Magnesium is in chlorophyll."],
      ["Legume roots release acids that destroy molybdenum in the soil", "This is not why legumes are affected."],
    ],
    answer: "A",
    hints: ["What do legumes do that other crops do not?"],
    explanation: "The nitrogen-fixing enzyme in *Rhizobium* nodules needs molybdenum, so molybdenum-deficient legumes show nitrogen-deficiency symptoms.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trace elements are called minor nutrients because they are less important to the plant than nitrogen.",
    answer: false,
    explanation: "False. \"Minor\" refers only to the small amount needed; without a trace element the plant cannot grow normally.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Deficiency of a mobile nutrient such as nitrogen shows first on the older, lower leaves of a plant.",
    answer: true,
    explanation: "True. The plant moves mobile nutrients from old leaves to new growth, so old leaves show the shortage first.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each nutrient with its main function in the plant.",
    pairs: [
      ["Nitrogen", "Part of proteins and chlorophyll; leafy growth"],
      ["Phosphorus", "Energy transfer, root growth and seed formation"],
      ["Potassium", "Opening and closing of stomata; strong stems"],
      ["Calcium", "Formation of cell walls and growing points"],
      ["Sulfur", "Part of some amino acids and proteins"],
    ],
    explanation: "N proteins and chlorophyll; P energy, roots, seed; K stomata, enzymes and strength; Ca cell walls; S amino acids.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each deficiency sign with the nutrient most likely to be lacking.",
    pairs: [
      ["Yellow stripes between the veins of older maize leaves", "Magnesium"],
      ["White bands beside the midrib of young maize leaves", "Zinc"],
      ["Narrow, distorted leaves (whiptail) in cauliflower", "Molybdenum"],
      ["Hollow stems in cabbages and death of growing points", "Boron"],
    ],
    hints: ["Two of these are trace elements of brassicas."],
    explanation: "Interveinal striping of old maize leaves is magnesium; white bud is zinc; whiptail is molybdenum; hollow stem is boron.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Nutrients needed in large amounts are called {{blank:a}} nutrients. Yellowing of leaves caused by too little chlorophyll is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["major", "macro", "macronutrients", "major (macro)"] },
      { id: "b", accepted: ["chlorosis"] },
    ],
    explanation: "Major (macro) nutrients; chlorosis.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `In a sand-culture trial, bean seedlings in a complete solution had a mean dry mass of ${fullG.toFixed(1)} g, and those in a solution with no magnesium ${noMgG.toFixed(1)} g. Calculate the percentage reduction in dry mass caused by leaving out magnesium.`,
    value: redMg, unit: "%", wrong: [round(pct(noMgG, fullG), 0), round(fullG - noMgG, 1)],
    explanation: `Reduction = (${fullG.toFixed(1)} − ${noMgG.toFixed(1)}) ÷ ${fullG.toFixed(1)} × 100 = ${redMg}%. Dividing ${noMgG.toFixed(1)} by ${fullG.toFixed(1)} gives the mass remaining (${round(pct(noMgG, fullG), 0)}%), not the reduction.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Assume each tonne of sorghum grain removes ${kgNPerT} kg of nitrogen from the soil and ammonium nitrate contains 34.5% N. A farmer harvests ${grainT} t/ha. Calculate the mass of ammonium nitrate needed to replace the nitrogen removed, in kg/ha, to one decimal place.`,
    value: anKg, unit: "kg/ha", tol: 0.05, wrong: [nOut, round(nOut * 0.345, 1)],
    hints: ["First find the nitrogen removed.", "Then divide by the fraction of N in the fertiliser."],
    explanation: `Nitrogen removed = ${grainT} × ${kgNPerT} = ${nOut} kg N/ha. Ammonium nitrate = ${nOut} ÷ 0.345 = ${round(anKg, 1)} kg/ha. Multiplying by 0.345 instead of dividing gives ${round(nOut * 0.345, 1)} kg, far too little.`,
    workedSolution: `1. Nitrogen removed = ${grainT} × ${kgNPerT} = ${nOut} kg N/ha.\n2. Each kg of ammonium nitrate contains 0.345 kg N.\n3. Ammonium nitrate needed = ${nOut} ÷ 0.345 = ${round(anKg, 1)} kg/ha.`,
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the nutrient whose deficiency causes empty pods (\"pops\") in groundnuts.",
    accepted: ["calcium", "Ca"],
    explanation: "**Calcium**, supplied as gypsum at flowering.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why magnesium deficiency shows on the older leaves of a plant while calcium deficiency shows on the young leaves.",
    hints: ["Which nutrient can the plant move from old to new leaves?"],
    points: [
      "Magnesium is mobile: when supply is short the plant moves it from old leaves to new growth.",
      "So the old leaves lose magnesium (chlorophyll) and show chlorosis first.",
      "Calcium is immobile (fixed in cell walls), so new leaves and growing points cannot get it from old leaves and show the deficiency.",
    ],
    modelAnswer: "Magnesium is mobile in the plant, so when the soil supply runs short the plant moves magnesium out of the older leaves to the young growth; the older leaves then lose chlorophyll and turn yellow between the veins. Calcium is built into cell walls and cannot be moved again, so new leaves and growing points depend on fresh supply from the roots and are the first to be damaged.",
    explanation: "The mobility of a nutrient decides where its deficiency appears.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **two** harmful effects of applying too much nitrogen fertiliser to a crop and explain each.",
    hints: ["Think of the plant, and of the environment."],
    points: [
      "Lush, soft growth / weak stems.",
      "So the crop lodges and is attacked more by aphids and fungal diseases (or matures late).",
      "Nitrate not used by the crop is leached.",
      "So it pollutes groundwater and rivers (algal growth) and the money spent is wasted.",
    ],
    modelAnswer: "Too much nitrogen makes the crop grow lush and soft with weak stems, so it falls over (lodges) and is attacked more by aphids and fungi, lowering yield. The nitrate the crop cannot use is washed down by rain, so it pollutes groundwater and rivers, encouraging algae, and the farmer's money is wasted.",
    explanation: "Give the effect and then its consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 1 pupils at a school near Gweru grew maize seedlings in culture solutions. All pots had the same light, temperature and volume of solution.\n\n${T_TABLE}`,
    hints: ["Percentage reduction = (complete − treatment) ÷ complete × 100.", "Use the position of the symptoms (old or young leaves)."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage reduction in dry mass caused by leaving out nitrogen.",
        value: redN, unit: "%", wrong: [round(pct(TRIAL[1][1], TRIAL[0][1]), 0), round(TRIAL[0][1] - TRIAL[1][1], 1)],
        explanation: `(${TRIAL[0][1].toFixed(1)} − ${TRIAL[1][1].toFixed(1)}) ÷ ${TRIAL[0][1].toFixed(1)} × 100 = ${redN}%.`,
      }),
      P.mcq({
        label: "(b)", stem: "Why was a pot with the complete solution included?",
        options: [
          ["As a control, to compare the effect of each missing nutrient", "Correct: it shows normal growth for comparison."],
          ["To supply extra nutrients that could flow into the other pots", "Each pot is separate."],
          ["To prove that maize needs no phosphorus at all", "The no-phosphorus pots grew less, so phosphorus is needed."],
          ["To make the whole experiment take less time to complete", "The control does not shorten the trial."],
        ],
        answer: "A",
        explanation: "The complete solution is the control: any difference in the other pots is due to the missing nutrient.",
      }),
      P.short({
        label: "(c)", stem: "Name the nutrient that is immobile in the plant, as shown by where its symptoms appeared.",
        accepted: ["calcium", "Ca"],
        explanation: "Calcium: symptoms on the young leaf tips show it cannot be moved from old leaves.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the plants with no nitrogen were pale yellow.",
        points: ["Nitrogen is part of chlorophyll (and proteins).", "Without it little chlorophyll is made, so leaves yellow (chlorosis), starting with older leaves as nitrogen is moved to new growth."],
        explanation: "Link nitrogen to chlorophyll.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** ways of improving this experiment.",
        points: ["Use more pots (replicates) for each solution and take the mean.", "Include more solutions (e.g. no potassium, no magnesium) / grow for longer / measure root mass and height too / use seeds of one variety and equal size."],
        explanation: "Replication and fair-test improvements.",
      }),
    ],
    explanation: "Calculate from the table, then explain the symptoms using the function and mobility of each nutrient.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Chipo grows tomatoes and cabbages in a school garden near Chinhoyi. The tomatoes have weak growth with brown, scorched leaf edges on the older leaves and small fruit. Some cabbages have hollow stems, and their growing points have died.",
    hints: ["Use the position and type of each symptom."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the nutrient most likely lacking in the tomatoes.",
        accepted: ["potassium", "K", "potash"],
        explanation: "Marginal scorch of older leaves and small fruit point to potassium.",
      }),
      P.short({
        label: "(b)", stem: "Name the trace element most likely lacking in the cabbages.",
        accepted: ["boron", "B"],
        explanation: "Hollow stems and dead growing points in brassicas point to boron.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** functions of the nutrient you named in (a).",
        points: ["Controls opening and closing of stomata / water balance.", "Activates enzymes / moves sugars / strengthens stems / disease resistance / fruit quality."],
        explanation: "Potassium functions.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why trace elements must be applied with great care.",
        points: ["They are needed in very small amounts and the range between enough and too much is narrow.", "An overdose is toxic and can scorch or kill the crop."],
        explanation: "Small requirement, high risk of toxicity.",
      }),
    ],
    explanation: "Read the symptoms, name the nutrient, then explain its role and the risk of overuse.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says: \"If my maize is yellow, I only need to add more ammonium nitrate.\" Discuss this statement.",
    hints: ["Is nitrogen the only cause of yellow leaves?", "Where on the plant is the yellowing?"],
    points: [
      "Nitrogen shortage is a common cause: yellowing of old leaves in a V along the midrib.",
      "But magnesium deficiency gives interveinal striping of old leaves and needs magnesium (e.g. dolomitic lime), not nitrogen.",
      "Sulfur, iron or zinc shortage give yellowing of young leaves.",
      "Waterlogging, root damage, pests or diseases (e.g. maize streak virus) can also yellow leaves.",
      "Extra nitrogen when it is not the cause wastes money and may cause lodging and leaching.",
      "Judgement: diagnose first (position and pattern of symptoms, soil test) before adding fertiliser.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "The farmer may be right if the yellowing starts on the lower leaves as a V down the midrib, the typical sign of nitrogen shortage, especially after heavy rain on sandy soil. But other causes look similar. Magnesium shortage gives yellow stripes between the veins of old leaves; sulfur, iron and zinc shortages show on young leaves; waterlogging, root pests and diseases such as maize streak virus also yellow maize. Adding ammonium nitrate then wastes money, may cause soft growth and lodging, and the nitrate may be leached. The farmer should look at where and how the leaves are yellow and test the soil before deciding.",
    explanation: "Weigh nitrogen against other causes and conclude that diagnosis comes first.",
  });

  b.card("DEFINITION", "Major (macro) nutrients", "N, P, K, Ca, Mg and S: needed by plants in relatively large amounts.");
  b.card("DEFINITION", "Trace elements (micronutrients)", "Nutrients needed in tiny amounts, e.g. Fe, Mn, Zn, Cu, B, Mo; still essential.");
  b.card("FACT", "Which nutrient deficiency shows as purpling of young maize leaves?", "Phosphorus.");
  b.card("FACT", "Sign of nitrogen deficiency in maize", "Yellowing of older, lower leaves in a V from the tip down the midrib; stunted, pale plants.");
  b.card("FACT", "Sign of potassium deficiency", "Scorching (browning) of the margins of older leaves; weak stalks that lodge.");
  b.card("FACT", "Sign of magnesium deficiency", "Interveinal chlorosis (stripes) on older leaves; Mg is the centre of chlorophyll.");
  b.card("CONCEPT", "Mobile and immobile nutrients", "Mobile (N, P, K, Mg) → symptoms on old leaves. Immobile (Ca, Fe, B, mostly S) → symptoms on young leaves and growing points.");
  b.card("FACT", "Calcium deficiency disorders", "Blossom-end rot of tomatoes; empty groundnut pods (pops); dead growing points.");
  b.card("CONCEPT", "Effects of excess nitrogen", "Lush soft growth, lodging, more pests and diseases, late maturity, leaching and pollution, wasted money.");
});
