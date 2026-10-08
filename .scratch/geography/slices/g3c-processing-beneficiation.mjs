// Slice G3c: processing minerals and beneficiation (ZIMSEC 7.7.4).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.mining.processing-beneficiation", { file: "mining/processing-beneficiation", keyPrefix: "mining.processing-beneficiation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **beneficiation**?",
    options: [
      ["Processing a mineral further inside the country before export", "Correct: beneficiation adds value locally so more of the final price is earned at home."],
      ["Exporting raw ore as soon as it leaves the mine", "This is the opposite of beneficiation."],
      ["Searching for new mineral deposits to mine later", "This is prospecting."],
      ["Filling and replanting old mine pits", "This is rehabilitation."],
    ],
    answer: "A",
    explanation: "Beneficiation (value addition) means turning ore into concentrate, metal or finished goods within the country.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Chromite ore is smelted to produce which alloy?",
    options: [
      ["Ferrochrome", "Correct: ferrochrome is an alloy of chrome and iron used in stainless steel."],
      ["Bronze", "Bronze is an alloy of copper and tin."],
      ["Brass", "Brass is an alloy of copper and zinc."],
      ["Pig iron", "Pig iron comes from smelting iron ore in a blast furnace."],
    ],
    answer: "A",
    explanation: "Zimbabwe smelts chromite into ferrochrome, mainly at Kwekwe, for export to stainless-steel makers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a blast furnace, what is the job of **limestone**?",
    options: [
      ["It combines with impurities to form slag", "Correct: the slag floats on the molten iron and is tapped off."],
      ["It removes oxygen from the iron ore", "This is the job of carbon from the coke."],
      ["It provides most of the heat in the furnace", "Heat comes mainly from burning coke in the hot air blast."],
      ["It is the main source of iron in the furnace", "The iron comes from iron ore."],
    ],
    answer: "A",
    explanation: "Iron ore supplies the iron, coke is the fuel and reducing agent, and limestone removes impurities as slag.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happens during **froth flotation**?",
    options: [
      ["Metal-bearing grains stick to air bubbles and float off", "Correct: chemicals make the valuable grains attach to bubbles, giving a concentrate."],
      ["Ore is heated until the metal melts out", "This describes smelting."],
      ["Gold is dissolved by a weak cyanide solution", "This describes leaching."],
      ["Pure metal is deposited on cathodes by electricity", "This describes electrolytic refining."],
    ],
    answer: "A",
    explanation: "Flotation is used to concentrate platinum, copper and other ores before smelting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are minerals such as copper and platinum concentrated **near the mine** before they are transported?",
    options: [
      ["Concentrate is far lighter than ore, so transport costs fall", "Correct: most of the ore's mass is waste, so removing it first saves a great deal of transport."],
      ["Concentrate is heavier than ore, so it travels more safely", "Concentrate is much lighter than the ore it came from."],
      ["Ore cannot be carried by rail or road at all", "Ore can be carried, but moving all the waste rock is costly."],
      ["Concentrating destroys the valuable metal", "Concentrating keeps the metal and removes waste."],
    ],
    answer: "A",
    explanation: "Weight-losing processes are located near the raw material to reduce transport costs.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How are diamonds picked out from crushed gravel at a modern processing plant?",
    options: [
      ["By X-ray sorters, because diamonds glow under X-rays", "Correct: diamonds fluoresce, so sorting machines detect and remove them."],
      ["By magnets, because diamonds are magnetic", "Diamonds are not magnetic."],
      ["By dissolving the gravel in cyanide", "Cyanide is used for gold, not diamonds."],
      ["By smelting the gravel in a blast furnace", "Heat would destroy diamonds; smelting is for metals."],
    ],
    answer: "A",
    explanation: "After dense medium separation, X-ray sorters recover diamonds from the heavy-mineral concentrate.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would best show **beneficiation** of platinum in Zimbabwe?",
    options: [
      ["Building a refinery to separate matte into pure metals locally", "Correct: refining in Zimbabwe keeps the last and most valuable stage at home."],
      ["Exporting more unprocessed ore from the Great Dyke", "Exporting ore adds no value locally."],
      ["Opening a new underground shaft at an existing mine", "This raises output, but it does not add value to it."],
      ["Lowering royalties on exports of concentrate", "This may encourage concentrate exports rather than further processing."],
    ],
    answer: "A",
    hints: ["Beneficiation means more processing inside the country.", "Which option adds a later processing stage locally?"],
    explanation: "Much Zimbabwean platinum matte has been refined abroad; local refining is a beneficiation goal.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Ferrochrome smelters in Zimbabwe have sometimes cut output even when chrome ore was available. What is the **most likely** reason?",
    options: [
      ["Shortages of electricity for the furnaces", "Correct: electric arc furnaces need huge, reliable power, so power cuts reduce output."],
      ["Too much rain falling on the Great Dyke", "Rain does not stop smelters operating."],
      ["Ferrochrome is lighter than chrome ore", "This helps transport; it is not a reason to cut output."],
      ["A lack of iron ore on the Great Dyke", "Ferrochrome needs chromite, coke and electricity; the iron in it comes from the chromite."],
    ],
    answer: "A",
    hints: ["What powers an electric arc furnace?"],
    explanation: "Power supply is one of the biggest challenges for beneficiation in Zimbabwe.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gold bullion from Zimbabwe's mines is refined at Fidelity Gold Refinery in Harare.",
    answer: true,
    explanation: "True. Fidelity Gold Refinery buys and refines gold produced in Zimbabwe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Beneficiation usually reduces the value of a country's mineral exports.",
    answer: false,
    explanation: "False. Processed products such as refined metal or ferrochrome are worth much more than raw ore, so beneficiation usually raises export earnings.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each processing stage with what happens during it.",
    pairs: [
      ["Milling", "Crushed ore is ground to a fine powder in rotating mills"],
      ["Leaching", "A chemical solution dissolves the metal from the ore"],
      ["Smelting", "Concentrate is melted at high temperature to separate the metal"],
      ["Electrolytic refining", "Pure metal is deposited on cathodes in an acid solution"],
    ],
    explanation: "Processing moves from physical breaking (crushing, milling) to separation (flotation, leaching) and then heat and electricity (smelting, refining).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "In a blast furnace, iron ore is mixed with {{blank:a}} and limestone. The product is molten {{blank:b}}, which is turned into steel by blowing {{blank:c}} through it.",
    blanks: [
      { id: "a", accepted: ["coke"], choices: ["coke", "chromite", "sand", "cyanide"] },
      { id: "b", accepted: ["pig iron"], choices: ["pig iron", "ferrochrome", "slag", "matte"] },
      { id: "c", accepted: ["oxygen"], choices: ["oxygen", "nitrogen", "steam", "carbon dioxide"] },
    ],
    explanation: "Coke removes oxygen from the ore; pig iron is refined into steel by burning off excess carbon with oxygen.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the finely ground waste left after the valuable mineral has been removed from ore.",
    accepted: ["tailings", "tailing", "mine tailings", "slimes"],
    wrong: ["slag"],
    explanation: "Tailings are stored in tailings dams; slag is the waste from smelting.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "It takes 2.5 tonnes of chrome ore to make 1 tonne of ferrochrome (fictional ratio). How many tonnes of ferrochrome can be made from 15,000 tonnes of ore?",
    value: 6000,
    wrong: [37500, 14997.5],
    explanation: "15,000 ÷ 2.5 = 6,000 tonnes of ferrochrome.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A company can sell 20,000 tonnes of ore at US\\$150 per tonne, or process it into 8,000 tonnes of concentrate worth US\\$600 per tonne (fictional prices). By how many US dollars is the value of the product increased by processing?",
    value: 1800000,
    answer: "1800000",
    wrong: [3000000, 4800000, 450],
    hints: ["Find the value of the ore and of the concentrate separately.", "Subtract."],
    workedSolution: "1. Ore value = 20,000 × 150 = US\\$3,000,000.\n2. Concentrate value = 8,000 × 600 = US\\$4,800,000.\n3. Increase = 4,800,000 − 3,000,000 = US\\$1,800,000.",
    explanation: "Processing adds US\\$1,800,000 of value (before processing costs).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main stages in processing gold ore at a large mine.",
    points: [
      "Crushing the ore into small pieces.",
      "Milling it into a fine powder / slurry.",
      "Dissolving the gold with cyanide (leaching) and collecting it on carbon / by gravity concentration.",
      "Smelting into bullion bars, which are then refined (at Fidelity Gold Refinery).",
    ],
    modelAnswer: "The ore is crushed and then milled into a fine slurry. Cyanide dissolves the gold, which is absorbed onto carbon and recovered by electrowinning. The gold is smelted into bullion bars and refined at Fidelity Gold Refinery.",
    explanation: "Give the stages in the correct order.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["Think about power, money, skills and markets."],
    stem: "Explain **two** challenges that limit beneficiation of minerals in Zimbabwe.",
    points: [
      "Electricity shortages: smelters and refineries need large, reliable power (1).",
      "So power cuts reduce output or make plants uneconomic (1).",
      "Lack of capital / technology / skills, or limited markets (1).",
      "Development: refineries cost hundreds of millions of dollars and need specialists / buyers abroad already own refineries (1).",
    ],
    modelAnswer: "Smelters and refineries use huge amounts of electricity, and frequent power cuts reduce output and raise costs. Building a refinery also costs hundreds of millions of dollars and needs specialised technology and staff, which are hard to finance.",
    explanation: "Each challenge needs a reason or effect.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "Table 1 shows the value of one tonne of a fictional mineral at each stage of processing (fictional data).\n\n| Stage | Mass from 100 t of ore (t) | Value per tonne (US\\$) |\n|---|---|---|\n| Ore | 100 | 40 |\n| Concentrate | 5 | 1,200 |\n| Refined metal | 1 | 9,000 |",
    hints: ["Total value = mass × value per tonne."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total value, in US dollars, of the 100 t of ore.", value: 4000, wrong: [40, 100], explanation: "100 × 40 = US\\$4,000." }),
      P.num({ label: "(b)", stem: "Calculate the total value, in US dollars, of the concentrate made from it.", value: 6000, wrong: [1200, 120000], explanation: "5 × 1,200 = US\\$6,000." }),
      P.num({ label: "(c)", marks: 2, stem: "How many times greater is the value of the refined metal than the value of the ore it came from?", value: 2.25, tol: 0.01, wrong: [225, 0.44], explanation: "Metal value = 1 × 9,000 = US\\$9,000; 9,000 ÷ 4,000 = 2.25 times." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Use the table to explain why concentrating is done near the mine.",
        points: ["100 t of ore gives only 5 t of concentrate, so 95% of the mass is waste.", "Concentrating before transport avoids carrying the waste, cutting transport costs."],
        modelAnswer: "Only 5 t of every 100 t of ore is concentrate; the other 95 t is waste. Removing it at the mine means far less has to be transported.",
        explanation: "Weight-losing processes locate at the raw material.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain **one** benefit to the country of refining the metal locally rather than exporting concentrate.",
        points: ["It earns more foreign currency: the metal is worth US\\$9,000 against US\\$6,000 for the concentrate.", "Developed point: more jobs, skills or linkages with local industry."],
        modelAnswer: "Refining raises the export value from US\\$6,000 to US\\$9,000 per 100 t of ore, and the refinery creates skilled jobs in the country.",
        explanation: "Use figures from the table in your answer.",
      }),
    ],
    explanation: "This item shows how value rises at each processing stage and why location and beneficiation matter.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", secs: 540,
    hints: ["Follow the flow from ore to pure metal: concentrate, then melt, then separate."],
    stem: "A flow diagram (described in words) shows platinum processing at a fictional Great Dyke mine: underground mine → stage X (crushing, milling, flotation) → stage Y (electric furnace producing matte and slag) → stage Z (separating the matte into individual metals), which takes place abroad.",
    parts: [
      P.short({ label: "(a)", stem: "Name stage X.", accepted: ["concentrating", "concentration", "concentrator", "the concentrator", "concentrating plant", "beneficiation plant"], wrong: ["smelting"], explanation: "Crushing, milling and flotation produce a concentrate." }),
      P.short({ label: "(b)", stem: "Name stage Y.", accepted: ["smelting", "smelter", "the smelter", "smelt"], wrong: ["refining"], explanation: "Melting concentrate in a furnace to give matte is smelting." }),
      P.short({ label: "(c)", stem: "Name stage Z.", accepted: ["refining", "refinery", "the refinery", "refine", "base metal refining", "precious metal refining"], wrong: ["milling"], explanation: "Separating matte into pure metals is refining." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the government wants stage Z to take place in Zimbabwe.",
        points: ["Refined metals are worth more, so export earnings rise.", "A refinery creates jobs and builds skills and technology.", "It creates linkages (power, chemicals, transport, engineering) and keeps by-products such as nickel and copper in the country."],
        modelAnswer: "Refining locally would let Zimbabwe sell pure metals, earning more foreign currency. The refinery would employ skilled workers, and it would buy power, chemicals and services from local firms.",
        explanation: "Refining is the last and most valuable stage.",
      }),
    ],
    explanation: "Identify processing stages and explain the case for beneficiation.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "Evaluate the benefits and challenges of beneficiation for Zimbabwe's mineral sector.",
    hints: ["Use examples: ferrochrome, gold refining, platinum matte, lithium.", "Weigh the benefits against what holds beneficiation back, then judge."],
    points: [
      "Benefit: higher export earnings, for example ferrochrome is worth more than chrome ore.",
      "Benefit: jobs, skills and technology at smelters and refineries (for example at Kwekwe).",
      "Benefit: linkages with local industry and lower transport costs per unit of value.",
      "Example of policy: the 2022 ban on raw lithium ore exports led to local concentrator plants.",
      "Challenge: electricity shortages for energy-hungry smelters.",
      "Challenge: high capital costs, technology and skills, limited markets, pollution (sulphur dioxide, slag, tailings).",
      "Judgement: beneficiation offers large gains but depends on reliable power and investment, so progress is likely to be gradual.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Beneficiation can greatly increase what Zimbabwe earns from its minerals. Chrome smelted into ferrochrome at Kwekwe sells for far more than raw ore, and gold refined at Fidelity Gold Refinery is sold as a finished product. Processing plants employ skilled workers and buy services from local firms, and lighter products cost less to transport. Policy can drive it: after the 2022 ban on exporting raw lithium ore, miners built concentrator plants in Zimbabwe. However, smelters and refineries need huge amounts of electricity, and power shortages have cut output. A platinum refinery needs very large investment and specialised skills, and smelting causes air pollution and waste that must be managed. The benefits are large, but they can only be realised if power supply and investment improve, so beneficiation will probably advance step by step.",
    explanation: "Use named examples on both sides and finish with a supported judgement.",
  });

  b.card("DEFINITION", "**Beneficiation**", "Processing a mineral further within the country before export, to add value.", undefined);
  b.card("DEFINITION", "**Concentrate**", "The high-grade product left after most of the waste rock has been removed from ore.", undefined);
  b.card("DEFINITION", "**Smelting**", "Heating ore or concentrate to a very high temperature (often with coke) to extract the metal.", undefined);
  b.card("DEFINITION", "**Tailings**", "Finely ground waste left after processing; stored in tailings dams.", undefined);
  b.card("CONCEPT", "Gold processing", "Crushing → milling → cyanide leaching / gravity → smelting to bullion → refining.", undefined);
  b.card("CONCEPT", "Platinum processing", "Crushing and milling → froth flotation (concentrate) → smelting (matte) → refining into separate metals.", undefined);
  b.card("FACT", "Ferrochrome", "Chromite + coke smelted in electric arc furnaces (Kwekwe); used to make stainless steel.", undefined);
  b.card("CONCEPT", "Blast furnace inputs", "Iron ore (iron), coke (fuel and reducing agent), limestone (removes impurities as slag).", undefined);
  b.card("CONCEPT", "Challenges of beneficiation", "Power shortages, capital, technology and skills, markets, scale and pollution.", undefined);
});
