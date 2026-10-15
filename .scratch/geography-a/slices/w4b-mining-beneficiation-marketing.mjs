// W4b: mining.beneficiation-marketing (ZIMSEC only). All grades, prices and costs are illustrative. Rules flagged "to be verified".
// Computed: Cu 1 000 t x 2% = 20 t, 90% -> 18 t, concentrate 72 t (ratio 13.9); gold 500 t x 4 g = 2 000 g, 85% = 1 700 g, US$110 500;
// Ni 800 t x 1.5% = 12 t, 80% = 9.6 t, concentrate 96 t; lithium options 8.0 / 11.4 / gain 1.3 US$ million; diamond yield 40%.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const cuIn = chk(1000 * 0.02, 20, 1e-9);
const cuRec = chk(cuIn * 0.9, 18, 1e-9);
const concMass = chk(cuRec / 0.25, 72, 1e-9);
const ratio = rnd(1000 / concMass, 1, 13.9, "ratio");
const auIn = chk(500 * 4, 2000, 1e-9);
const auRec = chk(auIn * 0.85, 1700, 1e-9);
const auVal = chk(auRec * 65, 110500, 1e-9);
const auLost = chk(auIn - auRec, 300, 1e-9);
const niIn = chk(800 * 0.015, 12, 1e-9);
const niRec = chk(niIn * 0.8, 9.6, 1e-9);
const niConc = chk(niRec / 0.1, 96, 1e-9);
const revA = chk((10000 * 800) / 1e6, 8, 1e-9);
const revB = chk((6000 * 1900) / 1e6, 11.4, 1e-9);
const extra = 2.1;
const gain = chk(revB - revA - extra, 1.3, 1e-9);
const dia = chk((1.0 / 2.5) * 100, 40, 1e-9);
const LT = tbl(["Option", "Product", "Quantity sold (t)", "Price (US\\$ per tonne)", "Extra processing cost (US\\$ million)"], [["A", "Spodumene concentrate (exported)", "10 000", 800, "0"], ["B", "Lithium sulphate (made in Zimbabwe)", "6 000", "1 900", "2.1"]]);

concept("ageo.mining.beneficiation-marketing", { file: "mining/beneficiation-marketing", keyPrefix: "mining.beneficiation-marketing" }, (b) => {
  mc(b, 1, "RECALL", "Which property of minerals does gravity separation use?", [
    ["Differences in density", "Correct: heavy minerals settle while light waste is washed away."],
    ["Differences in magnetism", "That is magnetic separation."],
    ["Differences in melting point", "That is smelting."],
    ["Differences in colour", "Colour is not used in gravity separation."],
  ], "Gravity separation uses **density**.");
  mc(b, 2, "UNDERSTANDING", "Why is ore crushed and ground before most separation methods?", [
    ["To free the valuable mineral grains from the waste rock", "Correct: liberation lets the mineral be separated."],
    ["To make the ore heavier so that it settles faster in the tank", "Grinding does not add mass."],
    ["To remove the need for any further processing", "Grinding is only the first step."],
    ["To turn the mineral into pure metal directly", "Metal is produced later by smelting and refining."],
  ], "Grinding **liberates** the mineral from the gangue.");
  mc(b, 2, "UNDERSTANDING", "Which method is most widely used to concentrate sulphide ores of copper, nickel and platinum group metals?", [
    ["Flotation", "Correct: air bubbles carry sulphide grains to the surface."],
    ["Panning", "Panning is gravity separation for coarse heavy grains."],
    ["Magnetic separation", "These sulphide ores are not mainly magnetic."],
    ["Cutting and polishing", "That applies to diamonds."],
  ], "**Flotation** concentrates sulphide ores.");
  mc(b, 2, "APPLICATION", "Which method would be most suitable for concentrating magnetite iron ore?", [
    ["Magnetic separation", "Correct: magnetite is attracted by magnets."],
    ["Cyanide leaching", "This is used for gold."],
    ["Cutting and polishing", "This is for diamonds."],
    ["Evaporation in salt pans", "This is for dissolved salts."],
  ], "**Magnetic separation** suits magnetite.");
  mc(b, 3, "APPLICATION", "A country exports lithium as a concentrate rather than raw ore. What is the main reason this earns more per tonne?", [
    ["The concentrate has a much higher lithium content", "Correct: a higher grade means a higher price."],
    ["The concentrate is bulkier and costs more to transport", "A concentrate is smaller than ore."],
    ["The export has no need for any buyers", "Buyers are still needed."],
    ["The ore is treated with no equipment or power", "Processing needs equipment and power."],
  ], "A concentrate has a **higher grade** and sells at a higher price.", { hints: ["Compare the lithium content of ore and concentrate."] });
  mc(b, 3, "ANALYSIS", "Which market-research finding would most encourage a company to invest in a plant to process lithium?", [
    ["Growing demand from battery makers and a firm offer to buy output", "Correct: demand and buyers make investment safer."],
    ["Falling demand and many competing producers with lower costs", "This discourages investment."],
    ["A guarantee that world prices will never change", "Prices cannot be guaranteed."],
    ["An absence of any reliable electricity supply", "Power is needed for processing."],
  ], "Rising **demand and firm buyers** support investment.", { hints: ["Look for the option that reduces risk."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Smelting separates a metal from its concentrate by heating it in a furnace.", answer: true,
    feedbackTrue: "Correct: the metal and slag separate when the concentrate is melted.",
    feedbackFalse: "Not so: smelting uses heat.",
    explanation: "Smelting melts the concentrate so the metal separates from the slag." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Mercury is a safe method for small-scale gold miners because it does not harm rivers or people.", answer: false,
    feedbackFalse: "Correct: mercury is toxic and pollutes water.",
    feedbackTrue: "Not so: mercury is dangerous and should be replaced by safer methods.",
    explanation: "Mercury harms health and rivers." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The waste rock that occurs with a valuable mineral is called {{blank:a}}. The state body that markets most minerals is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["gangue"], choices: ["gangue", "concentrate", "alloy"] },
      { id: "b", accepted: ["MMCZ"], choices: ["MMCZ", "EMA", "ZINWA"] },
    ], explanation: "**Gangue** is waste rock; **MMCZ** markets minerals." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each mineral to the processing method that suits it.",
    pairs: [
      ["Magnetite iron ore", "Magnetic separation"],
      ["Platinum group metal sulphides", "Flotation"],
      ["Fine gold in quartz", "Cyanide leaching"],
      ["Rough diamonds", "Cutting and polishing"],
    ], explanation: "Methods match the properties of each mineral." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "kg",
    stem: "A gold plant treats 500 t of ore of grade 4 g per tonne with a recovery of 85%. Calculate the mass of gold recovered, in kilograms (1 kg = 1 000 g).",
    hints: ["Find the gold in the ore, then take 85%."],
    value: auRec / 1000, wrong: [2, 1700, 0.34],
    explanation: "Gold in ore = 500 × 4 = 2 000 g. Recovered = 2 000 × 0.85 = 1 700 g = **1.7 kg**. The value 2 ignores recovery." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "A mine treats 1 000 t of ore of 2.0% copper. Flotation recovers 90% of the copper in a concentrate of 25% copper. Calculate the mass of concentrate produced, in tonnes.",
    hints: ["Copper in ore = 1 000 × 0.02.", "Mass of concentrate = copper recovered ÷ 0.25."],
    value: concMass, wrong: [18, 80, 20],
    explanation: "Copper in ore = 20 t; recovered = 18 t; concentrate = 18 ÷ 0.25 = **72 t**. The value 80 ignores recovery." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "US$ million",
    stem: `A mine can choose between two options (illustrative figures).\n\n${LT}\n\nCalculate the extra income of option B over option A after paying the extra processing cost, in US\\$ million.`,
    hints: ["Revenue = tonnes × price.", "Convert to US\\$ million by dividing by 1 000 000."],
    value: gain, wrong: [3.4, 11.4, 8],
    explanation: "1. Option A: 10 000 × 800 = US\\$8 000 000 = US\\$8.0 million.\n2. Option B: 6 000 × 1 900 = US\\$11 400 000 = US\\$11.4 million.\n3. Extra income = 11.4 − 8.0 = 3.4; after the 2.1 cost the gain is 3.4 − 2.1 = **US\\$1.3 million**. The value 3.4 forgets the cost." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the process of heating a metal concentrate in a furnace so that the metal separates from the slag.",
    accepted: ["smelting", "smelt", "to smelt"], wrong: ["flotation"],
    explanation: "**Smelting**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What is the term for waste rock found with a valuable mineral in an ore?",
    accepted: ["gangue", "waste rock", "tailings", "gangue minerals"], wrong: ["concentrate"],
    explanation: "**Gangue**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how flotation concentrates a sulphide ore.",
    hints: ["Think of grinding, chemicals, air bubbles and froth."],
    points: [
      "The ore is ground to a fine powder and mixed with water to form a slurry.",
      "Chemicals make the valuable mineral grains repel water while the waste grains stay wet.",
      "Air is blown through the slurry and the mineral grains stick to the bubbles.",
      "The froth rises to the surface and is skimmed off as a concentrate, leaving waste as tailings.",
    ],
    modelAnswer: "The ore is ground to a fine powder and mixed with water to form a slurry. Chemicals make the mineral grains repel water while the waste stays wet. Air is blown through the slurry, the mineral grains stick to the bubbles, and the froth is skimmed off as concentrate, leaving the waste as tailings.",
    explanation: "Slurry, chemicals, air bubbles and skimmed froth." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a mine might concentrate its ore before transporting it to a smelter.",
    hints: ["Think of mass and transport cost."],
    points: [
      "Concentrating removes most of the waste rock, so the mass to be transported is much smaller.",
      "Transport costs per tonne of metal are lower.",
      "The smelter receives a higher-grade product, so it uses less energy for each tonne of metal.",
    ],
    modelAnswer: "Concentrating removes most of the waste rock, so there is much less mass to transport and the cost per tonne of metal falls. The smelter also receives a higher-grade product and uses less energy for each tonne of metal.",
    explanation: "Less mass, lower transport cost and cheaper smelting." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four questions that market research for a new mineral product should answer.",
    hints: ["Who buys, how much, at what price and what are the risks?"],
    points: [
      "Who are the buyers and which industries use the mineral?",
      "How much is demanded now and how is demand expected to change?",
      "What price will buyers pay and how stable is the price?",
      "Who are the competitors, and what standards or export rules apply?",
    ],
    modelAnswer: "Who are the buyers and which industries use the mineral? How much is demanded and how will demand change? What price will buyers pay and how stable is it? Who are the competitors, and what standards and export rules apply?",
    explanation: "Buyers, demand, price and competition." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A nickel mine treats 800 t of sulphide ore of grade 1.5% nickel. Flotation recovers 80% of the nickel in a concentrate of 10% nickel (illustrative data).",
    hints: ["Nickel in ore = ore × grade.", "Concentrate mass = nickel recovered ÷ grade of the concentrate."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mass of nickel recovered, in tonnes.", value: niRec, unit: "t", wrong: [12, 9],
        explanation: "800 × 0.015 = 12 t of nickel in the ore; 12 × 0.80 = 9.6 t recovered." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of concentrate produced, in tonnes.", value: niConc, unit: "t", wrong: [9.6, 120],
        explanation: "9.6 ÷ 0.10 = 96 t of concentrate." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why flotation suits a sulphide ore.",
        points: [
          "Sulphide mineral grains can be treated with chemicals so that they repel water and attach to air bubbles.",
          "The grains then rise in a froth, while the waste rock sinks, so they can be separated.",
        ],
        modelAnswer: "Chemicals make sulphide grains repel water so that they attach to air bubbles and rise in a froth, while the waste rock sinks.",
        explanation: "Sulphides respond to flotation chemicals." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two advantages of producing a concentrate near the mine.",
        points: [
          "The mass to be transported falls from 800 t to 96 t, which lowers transport cost.",
          "The smelter receives a higher-grade product.",
        ],
        modelAnswer: "The mass to be transported falls from 800 t to 96 t, which lowers transport cost, and the smelter receives a higher-grade product.",
        explanation: "Lower transport cost and higher grade." }),
    ], explanation: "Calculate recovery and concentrate mass and explain flotation." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A company can export lithium as a concentrate or process it in Zimbabwe into lithium sulphate (illustrative figures).\n\n${LT}`,
    hints: ["Revenue = tonnes × price per tonne.", "Subtract the extra processing cost from the extra revenue."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the revenue from option A, in US\\$ million.", value: revA, unit: "US$ million", wrong: [8000, 10000],
        explanation: "10 000 × 800 = 8 000 000, which is US\\$8.0 million." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the revenue from option B, in US\\$ million.", value: revB, unit: "US$ million", wrong: [11400, 3.4],
        explanation: "6 000 × 1 900 = 11 400 000, which is US\\$11.4 million." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the gain from option B over option A after paying the extra processing cost, in US\\$ million.", value: gain, unit: "US$ million", wrong: [3.4, 2.1],
        explanation: "11.4 − 8.0 − 2.1 = US\\$1.3 million." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Assess whether the company should choose option B.",
        points: [
          "Option B earns US\\$1.3 million more after the extra processing cost, on these figures.",
          "Processing in Zimbabwe creates jobs and skills and keeps more value in the country.",
          "Option B needs capital, reliable electricity, water and skilled workers, which may be lacking.",
          "Prices of lithium products change, so the gain could disappear if prices fall.",
          "Rules on exports of raw ore may favour processing, which should be verified against current law.",
          "Judgement: option B is better if power and markets are secure, otherwise option A carries less risk.",
        ],
        wordLimit: { max: 220 },
        modelAnswer: "On these figures option B earns US\\$1.3 million more after paying the extra processing cost, and processing in Zimbabwe creates jobs and skills and keeps more value in the country. However, it needs capital, reliable electricity, water and skilled workers, and prices of lithium products change, so the gain could disappear if prices fall. Export rules may also favour processing, which should be checked against current law. I conclude that option B is better if power and markets are secure, otherwise option A carries less risk.",
        explanation: "Use the figures and weigh gain against risk." }),
    ], explanation: "Compare exporting a concentrate with processing locally." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the case for processing minerals in Zimbabwe rather than exporting them as raw ore.",
    hints: ["Consider value, jobs, power, capital and markets.", "Reach a judgement."],
    points: [
      "Processed products earn more per tonne than raw ore, so export earnings rise.",
      "Processing creates jobs in plants, transport and services, and builds skills.",
      "Concentrating and smelting reduce the mass to be transported and raise the grade sold.",
      "Processing plants need large amounts of reliable electricity and water, which may be unavailable.",
      "They also need capital and skilled workers, and may harm the environment through waste and emissions.",
      "Buyers may be in other countries, and processed products face competition and price changes.",
      "Policy such as raw-ore export restrictions may encourage processing but can reduce short-term sales if plants are not ready.",
      "Judgement: processing adds value if power, capital and markets are secure; otherwise a step-by-step approach is more realistic.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Processed products earn more per tonne than raw ore, so export earnings rise, and processing creates jobs and builds skills. Concentrating and smelting also reduce the mass to be transported. However, processing plants need large amounts of reliable electricity and water, capital and skilled workers, and they may cause pollution. Buyers may be abroad, and processed products face competition and price changes. Policies that restrict the export of raw ore can encourage processing but may reduce sales in the short term if plants are not ready. I conclude that processing adds value if power, capital and markets are secure; otherwise a step-by-step approach is more realistic.",
    wordLimit: { max: 300 }, explanation: "Weigh extra value against power, capital and market risk and judge." });

  b.card("DEFINITION", "Beneficiation", "Processing an ore to raise its mineral content and value before sale: concentrating, smelting, refining and manufacturing.");
  b.card("DEFINITION", "Ore grade", "The amount of valuable mineral in an ore, as a percentage or in grams per tonne.");
  b.card("CONCEPT", "Crushing and grinding", "Breaking ore to a fine powder to free (liberate) the valuable mineral grains from the waste rock.");
  b.card("CONCEPT", "Gravity separation", "Separates minerals by density: panning, sluices, shaking tables, jigs and spirals; used for gold, tin and chromite.");
  b.card("CONCEPT", "Flotation", "Chemicals and air bubbles carry sulphide mineral grains to a froth that is skimmed off; used for copper, nickel and platinum group metals.");
  b.card("CONCEPT", "Magnetic separation", "Magnets remove magnetic minerals such as magnetite from non-magnetic waste.");
  b.card("CONCEPT", "Smelting", "Heating a concentrate in a furnace so that the metal separates from the slag; ferrochrome is smelted from chromite.");
  b.card("FACT", "Selling minerals", "Gold goes to Fidelity Printers and Refiners, diamonds are sold under Kimberley Process certification, and MMCZ markets most other minerals (verify against current law).");
  b.card("CONCEPT", "Market research for a mineral", "Find the buyers and users, the demand and price trends, competitors, standards and export rules.");
});
