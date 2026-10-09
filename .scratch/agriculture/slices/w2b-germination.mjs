// Slice W2b: seeds and germination.
import { concept, P, germinationPct, seedRate, plantPopulation, round, check, table, agricultureLevels } from "../lib.mjs";

// Germination test: 200 seeds.
const SOWN = 200, GERM = 172;
const gPct = germinationPct(GERM, SOWN);
check(gPct === 86, "gPct");

// Maize seed rate: 90 x 30 cm, TSM 300 g, 80% germination.
const popM = plantPopulation({ rowCm: 90, inRowCm: 30 }).perHa;
const srM = seedRate({ population: popM, thousandSeedMassG: 300, germinationPct: 80 });
const srM100 = seedRate({ population: popM, thousandSeedMassG: 300 });
check(Math.abs(srM.kgPerHa - 13.8889) < 1e-3, "maize sr");

// Bean seed rate: 45 x 10 cm, TSM 400 g, 90% germination.
const popB = plantPopulation({ rowCm: 45, inRowCm: 10 }).perHa;
const srB = seedRate({ population: popB, thousandSeedMassG: 400, germinationPct: 90 });
check(Math.abs(srB.kgPerHa - 98.765) < 1e-2, "bean sr");

// Structured: three seed lots tested with 50 seeds each, and tubes experiment.
const LOTS = [["Lot 1 (bought certified seed)", 50, 47], ["Lot 2 (saved, stored dry)", 50, 41], ["Lot 3 (saved, stored in a damp hut)", 50, 23]];
const LOT_TABLE = table(["Seed lot", "Seeds tested", "Seeds germinated after 7 days"], LOTS);
const lot1 = germinationPct(47, 50), lot3 = germinationPct(23, 50);
check(lot1 === 94 && lot3 === 46, "lots");

concept("agri.plants.germination", { file: "plants/germination", keyPrefix: "plants.germination" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which set of conditions is needed for the germination of most crop seeds?",
    options: [
      ["Water, oxygen and suitable warmth", "Correct: these are the three conditions."],
      ["Water, light and carbon dioxide from the air", "Light and carbon dioxide are needed for photosynthesis, not germination."],
      ["Soil, fertiliser and light", "Seeds germinate on wet cotton wool without soil, fertiliser or light."],
      ["Oxygen, light and fertiliser", "Light and fertiliser are not needed for germination."],
    ],
    answer: "A",
    explanation: "Germination needs water, oxygen and a suitable temperature (and a viable embryo).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a bean seed grows into the root?",
    options: [
      ["Radicle", "Correct: the radicle is the embryonic root."],
      ["Plumule", "The plumule grows into the shoot."],
      ["Cotyledon", "Cotyledons store food."],
      ["Hilum", "The hilum is the scar where the seed was attached to the pod."],
    ],
    answer: "A",
    explanation: "Radicle → root; plumule → shoot; cotyledons → food store.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is most of the food stored in a maize grain?",
    options: [
      ["In the endosperm", "Correct: the starchy endosperm makes up most of the grain."],
      ["In two large cotyledons", "This describes a bean seed."],
      ["In the coleoptile", "The coleoptile is a sheath protecting the plumule."],
      ["In the pericarp", "The pericarp is the thin outer fruit wall."],
    ],
    answer: "A",
    explanation: "Maize stores food in the endosperm; the scutellum absorbs it for the embryo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main reason a germinating seed needs oxygen?",
    options: [
      ["For aerobic respiration to release energy", "Correct: the embryo respires rapidly."],
      ["To soften the testa so that it can split", "Water softens the testa."],
      ["To turn the sugars in the seed into starch for the young shoot", "Starch is broken down, not made, during germination."],
      ["For photosynthesis in the cotyledons", "Germination begins in the dark; respiration supplies the energy."],
    ],
    answer: "A",
    explanation: "Oxygen is used in aerobic respiration, which releases energy from the stored food.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes **epigeal** germination?",
    options: [
      ["The cotyledons are carried above the soil surface", "Correct: the hypocotyl lengthens and lifts them."],
      ["The cotyledons stay below the soil surface", "That is hypogeal germination."],
      ["The radicle grows upwards before the plumule appears", "The radicle grows down in all germination."],
      ["The seed germinates without taking up any water", "All seeds need water to germinate."],
    ],
    answer: "A",
    explanation: "Epigeal: cotyledons above ground (bean). Hypogeal: below ground (maize).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A germination test on a seed lot gives 92% germination, but only 60% of seedlings emerge in the field. Which is the most likely cause?",
    options: [
      ["A hard cap formed on the soil after heavy rain", "Correct: the seeds germinated but many shoots could not break through."],
      ["The seed was dead before it was planted", "The test showed the seed was viable."],
      ["The seeds did not receive enough light in the soil to germinate", "Seeds do not need light to germinate or emerge."],
      ["The seed had too much stored food in it", "A large food store helps emergence."],
    ],
    answer: "A",
    hints: ["The seed is clearly viable. What in the field could stop shoots appearing?"],
    explanation: "Emergence can fail because of capping, deep planting, cold or waterlogged soil, or soil pests, even when germination is good.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In an experiment, soaked seeds are covered with boiled, cooled water and a layer of oil. Why is the water boiled?",
    options: [
      ["To remove dissolved oxygen from the water", "Correct: the tube tests whether oxygen is needed."],
      ["To kill the seeds before the experiment", "Living seeds are needed; the water is cooled before use."],
      ["To dissolve the starch in the seeds", "Boiled water does not dissolve the stored starch."],
      ["To keep the seeds warmer than the control", "The water is cooled to room temperature first."],
    ],
    answer: "A",
    hints: ["What does the oil layer stop?"],
    explanation: "Boiling drives out dissolved oxygen; the oil stops oxygen dissolving back in.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does a crusted soil surface harm the emergence of beans more than that of maize?",
    options: [
      ["Beans drag bulky cotyledons up; maize pushes a pointed coleoptile", "Correct: epigeal germination needs more force to break a crust."],
      ["Maize seeds are planted deeper than beans, below the crust", "Planting depth does not explain the difference."],
      ["Beans need light to germinate and the crust blocks it", "Beans do not need light to germinate."],
      ["Maize roots grow up and break the crust from below before the maize shoot emerges", "Roots grow downwards; they do not break the surface crust."],
    ],
    answer: "A",
    hints: ["Compare what each seedling pushes through the soil."],
    explanation: "In epigeal germination the hypocotyl hook drags the bulky cotyledons through the surface, so crusts block bean emergence easily.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Maize germination is hypogeal.",
    answer: true,
    explanation: "True. The grain and cotyledon (scutellum) stay below the soil.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Germination and emergence mean the same thing.",
    answer: false,
    explanation: "False. Germination begins in the soil when the radicle emerges from the seed; emergence is when the shoot appears above the soil.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a seed with its description or function.",
    pairs: [
      ["Testa", "Protective seed coat"],
      ["Micropyle", "Small pore where water first enters"],
      ["Hilum", "Scar where the seed was attached"],
      ["Coleoptile", "Sheath protecting the maize plumule"],
      ["Scutellum", "Absorbs food from the endosperm in maize"],
    ],
    explanation: "External bean parts: testa, hilum, micropyle. Maize embryo: coleoptile, scutellum.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Water entering a seed activates {{blank:a}} that digest stored starch into sugars. The embryo shoot is called the {{blank:b}}. A bean seed stores its food in two {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["enzymes", "enzyme"] },
      { id: "b", accepted: ["plumule"] },
      { id: "c", accepted: ["cotyledons", "cotyledon", "seed leaves"] },
    ],
    explanation: "Enzymes digest the food store; plumule is the shoot; beans store food in cotyledons.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the type of germination in which the cotyledons stay below the soil surface.",
    accepted: ["hypogeal", "hypogeal germination", "hypogeous"],
    rejected: ["epigeal"],
    explanation: "**Hypogeal** germination, as in maize.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a germination test, ${GERM} out of ${SOWN} seeds germinated. Calculate the percentage germination.`,
    value: gPct, unit: "%", wrong: [GERM, round((SOWN - GERM) / SOWN * 100, 0)],
    explanation: `${GERM} ÷ ${SOWN} × 100 = ${gPct}%. ${round((SOWN - GERM) / SOWN * 100, 0)}% is the percentage that failed.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Maize is to be planted at 90 cm × 30 cm, one plant per station. The mass of 1,000 seeds is 300 g and the germination is 80%. Calculate the seed rate in kg/ha, to one decimal place.",
    value: srM.kgPerHa, unit: "kg/ha", tol: 0.05, wrong: [round(srM100.kgPerHa, 1), round(srM100.kgPerHa * 0.8, 1)],
    hints: ["Plant population = 10,000 ÷ (0.9 × 0.3).", "Divide by 0.80, not multiply, to allow for seeds that fail."],
    explanation: `Population = 10,000 ÷ 0.27 = ${round(popM, 0).toLocaleString("en-GB")} plants/ha. Seeds = ${round(popM, 0).toLocaleString("en-GB")} ÷ 0.80 = ${round(srM.seeds, 0).toLocaleString("en-GB")}. Mass = ${round(srM.seeds, 0).toLocaleString("en-GB")} × 300 g ÷ 1,000 = ${round(srM.kgPerHa * 1000, 0).toLocaleString("en-GB")} g = ${round(srM.kgPerHa, 1)} kg/ha.`,
    workedSolution: `1. Area per station = 0.90 × 0.30 = 0.27 m².\n2. Population = 10,000 ÷ 0.27 = ${round(popM, 1).toLocaleString("en-GB")} plants/ha.\n3. Seeds needed = ${round(popM, 1).toLocaleString("en-GB")} ÷ 0.80 = ${round(srM.seeds, 1).toLocaleString("en-GB")}.\n4. Mass = ${round(srM.seeds, 1).toLocaleString("en-GB")} × 300 ÷ 1,000 ÷ 1,000 = ${round(srM.kgPerHa, 1)} kg/ha.\n5. Ignoring germination gives ${round(srM100.kgPerHa, 1)} kg/ha; multiplying by 0.8 instead of dividing gives ${round(srM100.kgPerHa * 0.8, 1)} kg/ha, both too little seed.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why water is needed for germination.",
    hints: ["Give three different jobs of water."],
    points: [
      "Softens the testa so that it splits / the seed swells (imbibition).",
      "Activates enzymes that digest the stored food into soluble substances.",
      "Dissolves and transports the digested food to the growing embryo (and makes cells turgid for growth).",
    ],
    modelAnswer: "Water softens the testa and makes the seed swell and burst its coat. It activates enzymes that change the stored starch and protein into sugars and amino acids, and it carries these dissolved foods to the growing radicle and plumule.",
    explanation: "Three roles of water.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how to carry out a germination test on a sample of maize seed and calculate the result.",
    hints: ["Count, place, keep moist and warm, count again."],
    points: [
      "Count out a known number of seeds at random (e.g. 100 or four lots of 25).",
      "Place them on moist paper / cloth / in a tray of moist sand and roll or cover.",
      "Keep moist and warm for about 7 days.",
      "Count the seeds with a normal radicle and plumule; percentage = germinated ÷ tested × 100.",
    ],
    modelAnswer: "Take 100 seeds at random and spread them on wet newspaper. Roll it up, keep it moist and warm for about a week, then count the seeds with a healthy root and shoot. Percentage germination = number germinated ÷ 100 × 100.",
    explanation: "Method and calculation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Rudo tested three lots of sugar bean seed before planting.\n\n${LOT_TABLE}`,
    hints: ["Percentage = germinated ÷ tested × 100.", "Seeds in damp storage respire and are attacked by moulds."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the percentage germination of Lot 1.", value: lot1, unit: "%", wrong: [47], explanation: `47 ÷ 50 × 100 = ${lot1}%.` }),
      P.num({ label: "(b)", stem: "Calculate the percentage germination of Lot 3.", value: lot3, unit: "%", wrong: [23], explanation: `23 ÷ 50 × 100 = ${lot3}%.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why Lot 3 germinated so poorly.",
        points: ["In damp storage the seeds absorbed moisture and respired, using up stored food.", "Moulds / fungi attacked the seeds and killed many embryos."],
        explanation: "Damp storage destroys viability.",
      }),
      P.num({ type: "CALCULATION",
        label: "(d)", marks: 2, stem: `Sugar beans are planted at 45 cm × 10 cm. The mass of 1,000 seeds is 400 g. Using a germination of 90%, calculate the seed rate in kg/ha, to the nearest whole number.`,
        value: srB.kgPerHa, unit: "kg/ha", tol: 0.5, answer: String(round(srB.kgPerHa, 0)), wrong: [round((popB * 400) / 1e6, 0)],
        explanation: `Population = 10,000 ÷ (0.45 × 0.10) = ${round(popB, 0).toLocaleString("en-GB")}; ÷ 0.9 = ${round(srB.seeds, 0).toLocaleString("en-GB")} seeds; × 400 g ÷ 1,000 ÷ 1,000 = ${round(srB.kgPerHa, 0)} kg/ha.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Advise Rudo which lot to plant and how to store saved seed in future.",
        points: ["Plant Lot 1 (or Lot 2 at a higher seed rate); do not use Lot 3.", "Store saved seed dry, cool and protected from pests (in sealed containers / off the floor)."],
        explanation: "Choose viable seed and store it well.",
      }),
    ],
    explanation: "Germination tests show viability; the result sets the seed rate and the choice of seed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Four test tubes each held soaked bean seeds. Tube A: moist cotton wool at room temperature. Tube B: dry cotton wool at room temperature. Tube C: seeds under boiled, cooled water with a layer of oil. Tube D: moist cotton wool in a refrigerator. After five days the seeds had germinated only in tube A.",
    hints: ["Compare each tube with tube A."],
    parts: [
      P.short({ label: "(a)", stem: "State which tube is the control.", accepted: ["a", "tube a"], explanation: "Tube A has all three conditions." }),
      P.short({ label: "(b)", stem: "Name the condition shown to be necessary by tube C.", accepted: ["oxygen", "air", "o2"], explanation: "Boiled water and oil exclude oxygen." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the seeds in tube D did not germinate.",
        points: ["The low temperature slowed or stopped enzyme action.", "So stored food was not digested / respiration was too slow to release energy for growth."],
        explanation: "Temperature acts through enzymes.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Use these results to explain why farmers should not plant into waterlogged soil.",
        points: ["Water fills the air spaces in waterlogged soil, so there is little oxygen (as in tube C).", "Seeds cannot respire aerobically, so they fail to germinate and may rot."],
        explanation: "Link the experiment to the field.",
      }),
    ],
    explanation: "Each tube lacks one condition compared with the control.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss how a farmer can make sure that maize seed planted in the field gives a good, even stand of seedlings.",
    hints: ["Think about seed quality, timing, seedbed and planting depth.", "Which steps matter most?"],
    points: [
      "Use certified seed or test saved seed for germination and adjust the seed rate.",
      "Plant when the soil is moist after effective rains, and warm enough, so water and temperature are suitable.",
      "Prepare a fine, firm seedbed / avoid compaction and waterlogging, so oxygen reaches the seed.",
      "Plant at the right depth so the coleoptile can reach the surface, and cover seed well.",
      "Prevent capping (mulch, conservation tillage) and protect seed from soil pests and birds (seed dressing).",
      "Judgement: emergence depends on several factors together; viable seed planted at the right time and depth into moist, well-aerated soil matters most.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "First the seed must be viable: certified seed, or saved seed tested on wet paper so that the seed rate can be raised if germination is low. Planting should wait for effective rains so the seed has water, and the soil should be warm enough for enzymes to work. A fine but firm seedbed that is not waterlogged or compacted lets oxygen reach the seed for respiration. Planting at the right depth, neither too shallow (drying out) nor too deep (the coleoptile cannot reach the surface), gives even emergence, and mulch prevents a cap forming. Seed dressing protects against soil pests and birds. All these together give an even stand, but the key is viable seed planted at the right time and depth into moist, aerated soil.",
    explanation: "Link each practice to a condition for germination or emergence and judge.",
  });

  b.card("DEFINITION", "Germination", "The embryo resumes growth and develops into a seedling; usually counted when the radicle breaks through the testa.");
  b.card("DEFINITION", "Emergence", "The shoot appearing above the soil surface (after germination).");
  b.card("CONCEPT", "Conditions for germination", "Water (enzymes, softening), oxygen (respiration), suitable temperature (enzymes).");
  b.card("CONCEPT", "Bean seed parts", "Testa, hilum, micropyle, two cotyledons (food), plumule, radicle; no endosperm.");
  b.card("CONCEPT", "Maize grain parts", "Pericarp fused with testa, endosperm (starch), scutellum, plumule in coleoptile, radicle in coleorhiza.");
  b.card("CONCEPT", "Epigeal vs hypogeal", "Epigeal: cotyledons above ground (bean). Hypogeal: cotyledons stay below (maize).");
  b.card("FORMULA", "Percentage germination", "Seeds germinated ÷ seeds tested × 100.");
  b.card("FORMULA", "Seed rate adjusted for germination", "Seeds/ha = plants/ha ÷ (germination % ÷ 100); kg/ha = seeds × 1,000-seed mass (g) ÷ 1,000 ÷ 1,000.");
  b.card("FACT", "Why boil the water in the oxygen tube?", "To remove dissolved oxygen; oil on top stops it dissolving again.");
});
