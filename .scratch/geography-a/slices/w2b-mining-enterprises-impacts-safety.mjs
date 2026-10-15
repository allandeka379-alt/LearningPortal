// W2b: mining.enterprises-impacts-safety (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: payback 600000/132000 = 4.5 years; silicosis 36/600 = 6%; injury rate 18/1.2 = 15 per million hours; B/C 2.4/1.6 = 1.5;
// struct A gold per worker 30 g and 405 g; struct B 12%, 3%, 4 times; struct C 10^(7.2-4.1) = 1258.9.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const sales = chk(3000 * 5 * 0.8 * 30, 360000);
const royalty = chk(0.05 * sales, 18000);
const profit = chk(sales - 210000 - royalty, 132000);
const payback = chk(600000 / 120000, 5, 1e-9);
const silicosis = chk((45 / 500) * 100, 9);
const injury = chk(24 / 1.5, 16, 1e-9);

// struct A: two enterprises
const SM = { workers: 40, ore: 600, grade: 4, rec: 0.5 };
const LG = { workers: 400, ore: 60000, grade: 3, rec: 0.9 };
const gSm = chk(SM.ore * SM.grade * SM.rec, 1200, 1e-9);
const gLg = chk(LG.ore * LG.grade * LG.rec, 162000, 1e-9);
const pwSm = chk(gSm / SM.workers, 30, 1e-9);
const pwLg = chk(gLg / LG.workers, 405, 1e-9);
const ENT = tbl(["Feature", "Mine S (small-scale)", "Mine L (large-scale)"], [
  ["Workers", SM.workers, LG.workers],
  ["Ore mined in a year (t)", SM.ore, "60 000"],
  ["Average grade (g per tonne)", SM.grade, LG.grade],
  ["Share of gold recovered", "50%", "90%"],
]);
// struct B: dust exposure
const rA = chk((30 / 250) * 100, 12, 1e-9);
const rB = chk((6 / 200) * 100, 3, 1e-9);
const rr = chk(rA / rB, 4, 1e-9);
const DUST = tbl(["Group", "Miners screened", "Miners with signs of silicosis"], [["Underground drillers", 250, 30], ["Surface workers", 200, 6]]);
// struct C: pH
const hRatio = rnd(10 ** (7.2 - 4.1), 0, 1259, "hRatio");
const PH = tbl(["Sampling site", "pH"], [["Stream 500 m upstream of the waste dump", "7.2"], ["Stream 500 m downstream of the waste dump", "4.1"]]);

concept("ageo.mining.enterprises-impacts-safety", { file: "mining/enterprises-impacts-safety", keyPrefix: "mining.enterprises-impacts-safety" }, (b) => {
  mc(b, 1, "RECALL", "Which description fits **small-scale mining**?", [
    ["Low capital, simple tools and few workers", "Correct: this is the usual description of small-scale mining."],
    ["Heavy machinery and a processing plant on site", "That describes large-scale mining."],
    ["Thousands of formal employees and strict inspection", "That is typical of large-scale mines."],
    ["Mining only below a depth of 1 000 m", "Depth does not define the scale of a mine."],
  ], "Small-scale mining uses **little capital and simple tools**.");
  mc(b, 2, "UNDERSTANDING", "Which is the best example of **mitigation** while a mine is working?", [
    ["Spraying water on haul roads to reduce dust", "Correct: mitigation reduces impacts during operation."],
    ["Re-planting the pit area after the mine closes", "That is rehabilitation, which comes after mining."],
    ["Selling the gold on the world market", "That earns income but does not reduce an impact."],
    ["Paying royalties to the government", "A royalty is a payment, not a mitigation measure."],
  ], "**Mitigation** reduces impacts during operation; **rehabilitation** restores land afterwards.");
  mc(b, 2, "UNDERSTANDING", "Why should a cost-benefit analysis of a mine include the cost of environmental damage?", [
    ["Damage and clean-up costs fall on someone", "Correct: leaving them out overstates the benefit."],
    ["Environmental costs are always larger than the income", "They are not always larger; they must be estimated."],
    ["The law forbids mines that have any costs", "Mines have costs; the law requires them to be managed."],
    ["It increases the price of the mineral on world markets", "Including a cost does not change the world price."],
  ], "A CBA that ignores environmental costs **overstates** the benefits of the project.");
  mc(b, 2, "RECALL", "Which disease is caused by breathing in silica dust over many years?", [
    ["Silicosis", "Correct: silica dust scars the lungs."],
    ["Malaria", "Malaria is spread by mosquitoes."],
    ["Cholera", "Cholera is caused by contaminated water."],
    ["Bilharzia", "Bilharzia is caused by a parasite from water snails."],
  ], "**Silicosis** results from long exposure to silica dust.");
  mc(b, 3, "APPLICATION", "A gold mine has a tailings dam beside a river. Which measure best reduces the risk of water pollution?", [
    ["Line the dam and monitor water quality downstream", "Correct: it stops seepage and detects problems early."],
    ["Build the dam on the river bank without a lining", "Seepage would reach the river."],
    ["Release the tailings into the river in the dry season", "That deliberately pollutes the river."],
    ["Stop all rainfall from reaching the mine site", "Rainfall cannot be controlled."],
  ], "A **lined and monitored** tailings dam reduces seepage and warns of pollution.", { hints: ["Think about how pollutants leave the dam."] });
  mc(b, 3, "ANALYSIS", "A mine has 18 injuries in 1.2 million hours in year 1 and 9 injuries in 1.5 million hours in year 2. What does this show?", [
    ["The injury rate fell from 15 to 6 per million hours", "Correct: 18 ÷ 1.2 = 15 and 9 ÷ 1.5 = 6."],
    ["The injury rate rose because more hours were worked", "Rates allow for hours worked, and this rate fell."],
    ["The injury rate stayed the same in both years", "15 and 6 are not the same."],
    ["No conclusion is possible without the pay of the workers", "Pay is not needed to calculate a rate."],
  ], "Rates per million hours: year 1 = **15**, year 2 = **6**.", { hints: ["Divide injuries by hours (in millions)."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Mercury is used safely in gold panning because it does not enter the food chain.", answer: false,
    feedbackTrue: "Not so: mercury is toxic and builds up in food chains.",
    feedbackFalse: "Correct: mercury poisons workers and water and builds up in food chains.",
    explanation: "Mercury is a toxic heavy metal that harms miners and pollutes water; gravity methods and retorts reduce the risk." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A {{blank:a}} compares the total costs and benefits of a project. Restoring land after mining is called {{blank:b}}. Acid mine {{blank:c}} forms when sulphide minerals react with air and water.",
    blanks: [
      { id: "a", accepted: ["cost-benefit analysis"], choices: ["cost-benefit analysis", "census", "transect"] },
      { id: "b", accepted: ["rehabilitation"], choices: ["rehabilitation", "prospecting", "smelting"] },
      { id: "c", accepted: ["drainage"], choices: ["drainage", "ventilation", "legislation"] },
    ], explanation: "Cost-benefit analysis; rehabilitation; acid mine drainage." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each hazard in mining to a suitable control measure.",
    pairs: [
      ["Silica dust", "Water sprays and respirators"],
      ["Roof collapse", "Rock bolts, props and pillars"],
      ["Flooding of workings", "Drainage and pumping"],
      ["Poisonous gas", "Ventilation and gas detectors"],
    ], explanation: "Each control deals with the cause of the hazard." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, daily: true, unit: "years",
    stem: "A small gold mine costs US\\$600 000 to set up and makes an annual profit of US\\$120 000 (illustrative figures). Calculate the payback period in years.",
    hints: ["Payback = capital cost ÷ annual profit."],
    value: payback, wrong: [0.2, 720],
    explanation: `Payback = 600 000 ÷ 120 000 = **${payback} years**. Dividing the other way round gives 0.2.` });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, dp: 0, unit: "%",
    stem: "Of 500 miners screened, 45 had signs of silicosis (illustrative data). Calculate the percentage affected.",
    hints: ["Cases ÷ number screened × 100."],
    value: silicosis, wrong: [11.1, 0.09],
    explanation: "1. Cases ÷ screened = 45 ÷ 500 = 0.09.\n2. × 100 = **9%**.\n3. 11.1 comes from dividing 500 by 45." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 0,
    stem: "A mine recorded 24 injuries in 1.5 million hours worked (illustrative data). Calculate the injury frequency rate, in injuries per million hours worked.",
    hints: ["Divide the number of injuries by the hours in millions."],
    value: injury, wrong: [0.0625, 36],
    explanation: "24 ÷ 1.5 = **16** injuries per million hours. Multiplying (36) instead of dividing is a common slip." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the lung disease caused by breathing in silica dust in mines.",
    accepted: ["silicosis", "silicosis."], wrong: ["asthma"], explanation: "**Silicosis**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the toxic metal that small-scale gold miners sometimes use to collect fine gold, and that can poison rivers.",
    accepted: ["mercury", "Hg", "quicksilver"], wrong: ["lead"], explanation: "**Mercury**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three differences between small-scale and large-scale mining.",
    hints: ["Think of capital, employment and regulation."],
    points: [
      "Small-scale mining uses little capital and simple tools, whereas large-scale mining uses heavy machinery and large capital.",
      "Small-scale mines employ few workers, often informally, whereas large mines employ many people in formal jobs.",
      "Small-scale mines recover less of the mineral and are often poorly regulated, whereas large mines recover more and are inspected.",
    ],
    modelAnswer: "Small-scale mines use little capital and simple tools, but large mines use heavy machinery. Small mines employ few, often informal, workers but large mines have many formal jobs. Small mines recover less and are poorly regulated, whereas large mines recover more and are inspected.",
    explanation: "Capital, employment and regulation differ." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how acid mine drainage forms and why it is harmful.",
    hints: ["Start with the sulphide minerals in the waste."],
    points: [
      "Sulphide minerals (such as pyrite) in waste rock or tailings are exposed to air and water.",
      "They react (oxidise) to form sulphuric acid, giving water of low pH.",
      "The acid dissolves metals such as copper and iron from the rock.",
      "The acidic, metal-rich water kills fish and plants and makes water unsafe to drink.",
    ],
    modelAnswer: "When sulphide minerals such as pyrite in waste rock are exposed to air and water they oxidise and form sulphuric acid. The acid dissolves metals from the rock. When this water reaches a river it kills fish and plants and makes the water unsafe to drink.",
    explanation: "Oxidation of sulphides makes acid, which dissolves metals and harms life." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest four contents of a proposal for opening a new mine.",
    hints: ["Think of the mineral, money, people and environment."],
    points: [
      "The mineral, its estimated quantity and grade, and the mining rights or claim.",
      "The method of mining and processing, and the capital and running costs.",
      "The market and expected income, and the workforce and training.",
      "The environmental plan (EIA, mitigation, rehabilitation) and the safety and health measures.",
    ],
    modelAnswer: "The proposal should state the mineral, its quantity, grade and the claim; the mining and processing methods and the costs; the market and expected income and the workforce; and the environmental and safety plans, including rehabilitation.",
    explanation: "Any four distinct contents." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why informal small-scale miners may be more exposed to health hazards than workers at a large formal mine.",
    hints: ["Think about equipment, training and inspection."],
    points: [
      "They often have no protective equipment such as helmets, respirators or ear protection.",
      "Workings are often unsupported, so roof falls and collapse are more likely.",
      "There is little training, no health screening and no inspection by the authorities.",
      "They may handle mercury without safe methods and have poor access to clinics and clean water.",
    ],
    modelAnswer: "Informal miners often lack protective equipment, so they breathe dust and suffer noise. Their workings are usually unsupported, so roofs may collapse. There is little training, health screening or inspection, and they may handle mercury unsafely with poor access to clinics and clean water.",
    explanation: "Weak equipment, supports, training and inspection raise the risk." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Two gold mines in Zimbabwe are compared for one year (illustrative data, not real mines). Gold recovered = ore × grade × share recovered.\n\n${ENT}`,
    hints: ["Gold recovered = ore (t) × grade (g/t) × share recovered.", "Per worker = gold ÷ workers."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mass of gold recovered by Mine S, in grams.", value: gSm, wrong: [2400, 120],
        explanation: "600 × 4 × 0.5 = 1 200 g. Forgetting the recovery share gives 2 400 g." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of gold recovered per worker at Mine L, in grams.", value: pwLg, wrong: [162000, 450],
        explanation: "Gold = 60 000 × 3 × 0.9 = 162 000 g. Per worker = 162 000 ÷ 400 = 405 g." }),
      P.mcq({ label: "(c)", marks: 1, stem: `Mine S recovers ${pwSm} g per worker. What is the main reason for the difference from Mine L?`, options: [
        ["Mine L uses machinery and processing that raise recovery", "Correct: capital and technology raise output per worker."],
        ["Mine S has richer ore than Mine L and works fewer hours", "Mine S has a higher grade (4 g/t), so ore quality does not explain it."],
        ["Mine L employs fewer workers than Mine S, so each does more", "Mine L employs more workers (400)."],
        ["Mine S recovers a larger share of the gold from its ore", "Mine S recovers only 50%."],
      ], answer: "A", explanation: "Capital and technology raise recovery and output per worker." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest three ways in which Mine S could raise its recovery without harming the environment.",
        points: [
          "Better crushing and gravity concentration (for example a shaking table or sluice) to catch more gold.",
          "Using retorts and avoiding mercury, or sharing a central mill with other small miners.",
          "Training in sampling and mining methods, and group finance for equipment.",
        ],
        modelAnswer: "Mine S could improve crushing and use gravity concentration such as a sluice, share a central mill with other small miners so that fine gold is caught without much mercury, and train workers in better methods with group finance for equipment.",
        explanation: "Technology, shared processing and training raise recovery safely." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Explain why many governments support small-scale mining even though it is harder to regulate.",
        points: [
          "It provides livelihoods for many families, especially in rural areas with few other jobs.",
          "It needs little capital, so ordinary people can start.",
          "Gold sold through official channels earns foreign currency and taxes.",
          "Support (training, registration and shared mills) can improve safety and reduce environmental damage.",
        ],
        modelAnswer: "Small-scale mining gives livelihoods to many families in areas with few jobs and needs little capital. Gold sold through official channels earns foreign currency and taxes, and support such as training, registration and shared mills can make it safer and cleaner.",
        explanation: "Livelihoods, low capital, official income and improvement." }),
    ], explanation: "Compare two enterprises with calculated gold output per worker." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A health clinic screened miners at a mine for signs of silicosis (illustrative data).\n\n${DUST}`,
    hints: ["Rate = cases ÷ screened × 100.", "Compare the groups by dividing the rates."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of underground drillers with signs of silicosis.", value: rA, unit: "%", wrong: [8.3, 0.12],
        explanation: "30 ÷ 250 × 100 = 12%." }),
      P.num({ label: "(b)", marks: 2, stem: "How many times greater is the rate for drillers than for surface workers (surface workers: 6 ÷ 200 × 100 = 3%)?", value: rr, unit: "times", wrong: [9, 0.25],
        explanation: "12% ÷ 3% = 4 times." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why underground drillers are at greater risk than surface workers.",
        points: [
          "Drilling rock containing quartz produces fine silica dust that is breathed in.",
          "Dust is concentrated in enclosed workings with poor ventilation, whereas in the open it is dispersed by wind.",
        ],
        modelAnswer: "Drilling quartz-bearing rock makes fine silica dust. In enclosed underground workings with poor ventilation the dust stays in the air, but in the open the wind disperses it.",
        explanation: "Dust concentration is greater underground." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two measures to reduce the risk to drillers.",
        points: [
          "Wet drilling or water sprays and good ventilation to reduce dust.",
          "Respirators, regular health checks and job rotation.",
        ],
        modelAnswer: "Use wet drilling and ventilation to reduce dust, give respirators, and carry out regular health checks.",
        explanation: "Suppress dust, protect workers and screen them." }),
    ], explanation: "Compare disease rates between groups and suggest controls." });

  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `Water was tested above and below a mine waste dump (illustrative data).\n\n${PH}\n\nThe pH scale is logarithmic: one pH unit is a tenfold change in hydrogen-ion concentration.`,
    hints: ["The difference in pH is 3.1 units: raise 10 to that power."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times greater is the hydrogen-ion concentration downstream than upstream? Give the answer to the nearest whole number.", value: hRatio, unit: "times", wrong: [3.1, 31],
        explanation: "The difference is 7.2 − 4.1 = 3.1 pH units, so the ratio is 10^3.1 = 1 259. Giving 3.1 only subtracts the pH values." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which is the most likely cause of the change?", options: [
        ["Acid drainage from sulphide minerals in the waste", "Correct: sulphides oxidise and make sulphuric acid."],
        ["Fertiliser washed in from a nearby maize field", "Fertiliser causes nutrient enrichment, not a strong fall in pH."],
        ["Rainwater falling on both sites equally", "Rain alone would affect both sites."],
        ["Evaporation of water from the stream in the dry season", "Evaporation does not acidify water."],
      ], answer: "A", explanation: "Acid mine drainage lowers the pH below the dump." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest three ways in which the mine could reduce the pollution.",
        points: [
          "Cover or seal the waste dump so that less air and rain reach the sulphides.",
          "Divert clean water around the dump and collect the drainage.",
          "Treat the drainage (for example with lime) before release and monitor the stream.",
        ],
        modelAnswer: "Cover the dump so less air and rain reach the sulphides, divert clean water around it and collect the drainage, and treat the drainage with lime before release while monitoring the stream.",
        explanation: "Reduce the reaction, separate clean water and treat what remains." }),
    ], explanation: "Use a pH comparison to infer acid drainage and plan control." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess whether the benefits of a large new mine outweigh its costs for the people of a nearby rural community.",
    hints: ["Give benefits and costs, both economic and environmental.", "Say how mitigation changes the balance and give a judgement."],
    points: [
      "Benefits: formal jobs for local people and a market for local food and services.",
      "Royalties, taxes and community funds can pay for clinics, schools and roads.",
      "Training gives skills that last after the mine closes.",
      "Costs: loss of farmland and grazing, and possible displacement of families.",
      "Dust, noise, siltation and water pollution can harm health, crops and livestock.",
      "Pressure on housing and services, and risks to health and safety in the workforce.",
      "Mitigation, consultation and fair compensation reduce harm, but depend on enforcement.",
      "Judgement: benefits may outweigh costs if the community is consulted, damage is managed and some income stays local; if not, the costs are borne locally while gains go elsewhere.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "A large mine can bring formal jobs, a market for local food and services, and royalties and community funds that may pay for clinics, schools and roads. Training gives skills that last. However, farmland and grazing may be lost, families may be displaced, and dust, noise and water pollution can harm health, crops and livestock, while the influx of workers puts pressure on housing and services. Mitigation and fair compensation reduce harm, but only if they are enforced. I conclude that benefits can outweigh costs if the community is consulted, damage is managed and some income stays local; if not, the costs fall on the community while the gains go elsewhere.",
    wordLimit: { max: 300 }, explanation: "Weigh economic gains against local costs and judge." });

  b.card("DEFINITION", "Small-scale mining", "Mining by individuals or small teams with simple tools and little capital; may be registered or informal (artisanal).");
  b.card("DEFINITION", "Large-scale mining", "Mining by companies using large capital, heavy machinery, processing plants and many employees.");
  b.card("DEFINITION", "Cost-benefit analysis", "Comparing the total costs and benefits of a project, including environmental and social ones, to decide whether it is worthwhile.");
  b.card("FORMULA", "Payback period", "Payback = capital cost ÷ annual profit.");
  b.card("FORMULA", "Injury frequency rate", "Injuries ÷ hours worked (in millions) = injuries per million hours.");
  b.card("CONCEPT", "Mitigation or rehabilitation?", "Mitigation reduces impacts while the mine operates; rehabilitation restores the land after mining (backfilling, re-vegetation).");
  b.card("CONCEPT", "Acid mine drainage", "Sulphide minerals in waste react with air and water to form sulphuric acid, which dissolves metals and lowers pH.");
  b.card("FACT", "Health hazards of mining", "Silicosis, noise deafness, mercury poisoning, heat stress, and infections in crowded camps; accidents include roof falls, flooding, fire and gas.");
  b.card("CONCEPT", "Safety measures", "Props and rock bolts, pillars, ventilation, water sprays, protective equipment, gas detection, escape routes, training and inspection.");
});
