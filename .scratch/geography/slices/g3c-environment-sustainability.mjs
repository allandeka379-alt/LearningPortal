// Slice G3c: mining, the environment and sustainable use (ZIMSEC 7.7.5).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.mining.environment-sustainability", { file: "mining/environment-sustainability", keyPrefix: "mining.environment-sustainability" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **rehabilitation** of mined land?",
    options: [
      ["Restoring the land to a safe, stable and useful state", "Correct: filling, reshaping, re-soiling and replanting the land."],
      ["Opening a second pit next to the first one", "This expands mining; it does not restore land."],
      ["Selling the mine to a new company", "A change of owner does not restore the land."],
      ["Sinking a deeper shaft to reach more ore", "This is further mining."],
    ],
    answer: "A",
    explanation: "Rehabilitation makes mined land safe and usable again, for grazing, forestry or water storage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which disease is caused by breathing in **asbestos** fibres?",
    options: [
      ["Asbestosis", "Correct: asbestos fibres scar the lungs."],
      ["Malaria", "Malaria is spread by mosquitoes."],
      ["Cholera", "Cholera is spread by contaminated water."],
      ["Bilharzia", "Bilharzia is caught from snails in fresh water."],
    ],
    answer: "A",
    explanation: "Asbestosis is a lung disease of asbestos workers; silicosis is caused by silica dust.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which measure most directly reduces the risk of **methane explosions** in an underground coal mine?",
    options: [
      ["Ventilation fans and gas detectors", "Correct: fans dilute the gas and detectors warn before it reaches dangerous levels."],
      ["Wearing hard hats and steel-toed boots", "These protect against falling objects, not explosions."],
      ["Spraying haul roads with water", "This reduces surface dust, not underground gas."],
      ["Planting trees on waste dumps", "This rehabilitates land; it does not affect gas underground."],
    ],
    answer: "A",
    explanation: "Methane is controlled by ventilation, gas monitoring and banning naked flames underground.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does mining cause **siltation** of rivers and dams?",
    options: [
      ["Loose soil and gravel from pits and dumps wash into the rivers", "Correct: exposed, disturbed material is eroded by rain and carried downstream."],
      ["Mines pump clean water into the rivers", "Clean water does not cause siltation."],
      ["Smelter fumes turn into mud in the air", "Fumes cause air pollution, not silt."],
      ["Blasting at the mine makes rivers flow faster and deeper", "Blasting does not change river flow in this way."],
    ],
    answer: "A",
    explanation: "Silt fills river channels and dams, reducing their capacity and harming fish.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **sustainable use** of mineral resources?",
    options: [
      ["Recycling scrap copper and steel", "Correct: recycling reduces the need to mine new ore."],
      ["Mining only the richest ore and dumping the rest", "This wastes the resource."],
      ["Exporting all ore as fast as possible", "This uses up the resource quickly with little lasting benefit."],
      ["Leaving open pits unfilled after mining", "This damages land and is not sustainable."],
    ],
    answer: "A",
    explanation: "Sustainable use includes recycling, reuse, efficient extraction, reprocessing and investing mineral revenue in other sectors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **topsoil** stripped and stored separately before an open-cast mine begins?",
    options: [
      ["So it can be spread back to help vegetation regrow later", "Correct: topsoil holds the seeds, nutrients and organisms needed for rehabilitation."],
      ["Because it contains most of the valuable ore", "Ore lies below; topsoil is not the target."],
      ["So it can be sold as building sand", "Topsoil is kept for rehabilitation, not for sale."],
      ["Because it stops blasting from making noise", "Stored topsoil has no effect on blasting noise."],
    ],
    answer: "A",
    explanation: "Rehabilitation is planned from the start; keeping topsoil makes replanting succeed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A cost-benefit analysis gives a proposed mine a benefit-cost ratio of 0.8. What does this suggest?",
    options: [
      ["Costs exceed benefits, so the project is not worthwhile on these figures", "Correct: a ratio below 1 means benefits are smaller than costs."],
      ["Benefits exceed costs by 80%, so the mine should go ahead", "A ratio of 0.8 means benefits are only 80% of costs."],
      ["The mine will employ 80% of local workers", "The ratio compares values, not employment."],
      ["Benefits and costs are exactly equal", "Equal values give a ratio of exactly 1."],
    ],
    answer: "A",
    hints: ["Ratio = benefits ÷ costs.", "What does a ratio below 1 mean?"],
    explanation: "A ratio above 1 favours the project; below 1 it does not, unless unpriced benefits are judged important.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Villagers downstream of a gold mine report dying fish and sick cattle after heavy rain. Which cause is **most likely**?",
    options: [
      ["An overflowing tailings dam releasing cyanide or metals", "Correct: heavy rain can make poorly built tailings dams overflow, releasing toxic water."],
      ["Dust from the haul roads settling on grass and water", "Dust is reduced in rainy weather and would not kill fish."],
      ["Noise from blasting at the mine", "Noise does not poison fish or cattle."],
      ["Topsoil stored in heaps near the pit", "Stored topsoil is not toxic."],
    ],
    answer: "A",
    hints: ["Link the timing (after heavy rain) to a store of polluted water.", "Which mine feature holds chemical waste?"],
    explanation: "Tailings dams must be lined, maintained and designed for heavy rain to prevent toxic overflows.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Minerals are non-renewable resources.",
    answer: true,
    explanation: "True. Minerals form over millions of years, so once a deposit is worked out it cannot be replaced in human time scales.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Underground mining causes no environmental problems at the surface.",
    answer: false,
    explanation: "False. Underground mines produce waste dumps and tailings, can cause subsidence, and can pollute water through acid mine drainage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each environmental problem with a suitable mitigation measure.",
    pairs: [
      ["Dust from haul roads", "Spraying roads with water"],
      ["Sulphur dioxide from a smelter", "Scrubbers and filters on chimneys"],
      ["Bare, eroding waste dumps", "Reshaping slopes and planting grass"],
      ["Toxic seepage from tailings", "Lining tailings dams and treating water"],
    ],
    explanation: "Each measure targets the source of the problem.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Breathing silica dust can cause {{blank:a}}. In coal mines the explosive gas {{blank:b}} must be removed by ventilation. Miners wear {{blank:c}} to protect their hearing.",
    blanks: [
      { id: "a", accepted: ["silicosis"], choices: ["silicosis", "malaria", "asthma", "anaemia"] },
      { id: "b", accepted: ["methane"], choices: ["methane", "oxygen", "nitrogen", "helium"] },
      { id: "c", accepted: ["ear protection"], choices: ["ear protection", "goggles", "hard hats", "gloves"] },
    ],
    explanation: "Each hazard has a matching control.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A proposed mine has total benefits of US\\$720 million and total costs of US\\$600 million (fictional figures). Calculate the benefit-cost ratio.",
    value: 1.2, tol: 0.005,
    wrong: [0.83, 120],
    explanation: "720 ÷ 600 = 1.2. A ratio above 1 means benefits exceed costs.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "ha",
    stem: "A mine disturbed 360 ha of land. By the end of Year 1, 25% had been rehabilitated, and in Year 2 a further 108 ha was rehabilitated (fictional figures). How many hectares still need rehabilitation?",
    value: 162,
    wrong: [252, 198, 90],
    hints: ["Find 25% of 360 ha first.", "Subtract both amounts from the total."],
    workedSolution: "1. Year 1: 25% of 360 = 90 ha.\n2. Total rehabilitated = 90 + 108 = 198 ha.\n3. Remaining = 360 − 198 = 162 ha.",
    explanation: "360 − (90 + 108) = 162 ha remain.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how an open-cast mine can be rehabilitated after mining.",
    points: [
      "Backfill the pit (partly) with waste rock / turn it into a reservoir.",
      "Reshape dumps and steep slopes to gentle gradients to stop erosion.",
      "Spread stored topsoil back over the surface.",
      "Plant grass and indigenous trees and monitor the site until vegetation is established.",
    ],
    modelAnswer: "The pit is partly backfilled with waste rock or allowed to fill with water as a dam. Dumps are reshaped into gentle slopes, the stored topsoil is spread back, and grass and indigenous trees are planted and monitored.",
    explanation: "Give the stages in a logical order.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about workers, the company and the law."],
    stem: "Explain why health and safety are important in mining.",
    points: [
      "They prevent deaths, injuries and disease among workers (for example lung disease from dust).",
      "Accidents stop production and cost money in repairs and compensation, so safety protects productivity and profit.",
      "Laws require safety standards; a good record keeps the mining licence and attracts investors and workers.",
    ],
    modelAnswer: "Safety measures prevent miners being killed or injured by rock falls and gas, and protect them from lung diseases. Accidents halt production and cost money, and companies must meet legal standards to keep their licences.",
    explanation: "Give reasons for workers, the company and the country.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "Table 1 shows estimated costs and benefits over the life of a proposed fictional open-cast mine (US\\$ million, fictional data).\n\n| Costs | US\\$ million | Benefits | US\\$ million |\n|---|---|---|---|\n| Building the mine | 180 | Export sales | 520 |\n| Running costs | 260 | Wages paid locally | 60 |\n| Relocating 300 households | 15 | New road and clinic | 20 |\n| Lost farming output | 25 | | |\n| Rehabilitation | 40 | | |",
    hints: ["Add up each column first.", "Ratio = total benefits ÷ total costs."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total costs, in US\\$ million.", value: 520, wrong: [600, 440], explanation: "180 + 260 + 15 + 25 + 40 = 520." }),
      P.num({ label: "(b)", stem: "Calculate the total benefits, in US\\$ million.", value: 600, wrong: [520, 580], explanation: "520 + 60 + 20 = 600." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the benefit-cost ratio. Give your answer to two decimal places.", value: 600 / 520, answer: "1.15", tol: 0.005, wrong: [0.87, 80], explanation: "600 ÷ 520 = 1.1538..., which is 1.15." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Name **two** costs that are not shown in the table but should be considered.",
        points: ["An environmental cost such as water or air pollution, dust or loss of biodiversity.", "A social cost such as loss of graves or sacred sites, health effects or the break-up of communities."],
        modelAnswer: "Pollution of the river by dust and run-off, and the loss of family graves and sacred sites when households are moved.",
        explanation: "Many environmental and social costs are hard to value but still matter.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why the relocated households might oppose the mine even though the ratio is above 1.",
        points: ["They bear the costs (loss of land, homes, graves) while many benefits (export sales) go to the company and the state.", "Compensation may be too low or their new land poorer."],
        modelAnswer: "The households lose their land and homes, while most of the US\\$520 million of export sales goes to the company and government, and their compensation may not replace what they lose.",
        explanation: "A CBA shows who gains and who loses, not just the overall total.",
      }),
    ],
    explanation: "This item practises a simple cost-benefit analysis and asks who gains and who loses.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    hints: ["Link each problem in the description to a cause and a measure."],
    stem: "A report on a fictional abandoned gold mine says: \"A 60 m deep pit is now full of orange, acidic water. Grey waste dumps with steep, gullied sides lie beside the river. In heavy rain the river turns brown downstream, and fish have disappeared.\"",
    parts: [
      P.short({ label: "(a)", stem: "Name the process that makes the water in the pit acidic.", accepted: ["acid mine drainage", "acid drainage", "acid rock drainage", "amd"], wrong: ["siltation"], explanation: "Sulphide minerals react with air and water to form acid." }),
      P.mcq({
        label: "(b)", stem: "Why does the river turn brown downstream after heavy rain?",
        options: [
          ["Rain erodes the bare, steep dumps and washes silt into it", "Correct: unvegetated dumps erode easily."],
          ["The acid water in the pit evaporates into the river", "Evaporation does not carry silt."],
          ["Fish stir up mud on the river bed", "The fish have disappeared."],
          ["Blasting at the mine shakes mud into the river", "The mine is abandoned, so there is no blasting."],
        ],
        answer: "A", explanation: "Bare waste dumps erode in heavy rain, causing siltation.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** ways the site could be rehabilitated.",
        points: ["Reshape the dumps to gentle slopes and cover them with soil.", "Plant grass and trees to stabilise the dumps and stop erosion.", "Treat or neutralise the acid water (for example with lime) / fence the pit / build silt traps or drains."],
        modelAnswer: "Reshape the dumps into gentle slopes, cover them with soil and plant grass and trees. Treat the pit water with lime, fence the pit and build silt traps between the dumps and the river.",
        explanation: "Each measure should address one of the problems described.",
      }),
    ],
    explanation: "Identify the impacts of an abandoned mine and suggest rehabilitation.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Mining in Zimbabwe can never be sustainable because minerals are non-renewable.\" To what extent do you agree?",
    hints: ["Agree that deposits run out, then consider what makes mining more sustainable.", "Use Zimbabwean examples."],
    points: [
      "Agree: minerals are non-renewable; deposits such as asbestos at Zvishavane and Mashava have effectively stopped producing.",
      "Agree: impacts such as pits, dumps, siltation and mercury pollution can damage land and water for generations.",
      "Disagree: efficient extraction, reprocessing of old dumps and tailings and recycling stretch reserves.",
      "Disagree: rehabilitation and pollution control (EIA, EMA monitoring, lined tailings dams) reduce lasting damage.",
      "Disagree: mineral revenue can be invested in farming, industry, education and infrastructure so benefits last after closure.",
      ["Judgement: a single deposit cannot last forever, but the way it is used can be sustainable if impacts are managed and wealth is reinvested.", 2],
    ],
    levels: geographyLevels(7),
    modelAnswer: "In one sense the statement is true: a mineral deposit is finite. Asbestos production at Zvishavane and Mashava has largely stopped, and every gold or platinum mine will eventually close. Mining can also leave lasting damage, such as pits, dumps, silted rivers and mercury pollution. However, sustainability is also about how minerals are used. Better recovery and reprocessing of old tailings extract more from each deposit, and recycling scrap metal reduces the need for new mining. If companies carry out EIAs, store topsoil and rehabilitate land under EMA supervision, the environment can recover. Most importantly, if mineral revenue is invested in schools, farming and industry, the benefits continue after the mine closes. So mining cannot last for ever in one place, but it can be part of sustainable development if it is well managed.",
    explanation: "Distinguish between the finite resource and sustainable management of it, then judge.",
  });

  b.card("DEFINITION", "**Rehabilitation**", "Restoring mined land to a safe, stable and useful state.", "Backfill, reshape, re-soil, replant.");
  b.card("DEFINITION", "**Acid mine drainage**", "Acidic, metal-rich water formed when sulphide minerals in mine waste meet air and water.", undefined);
  b.card("DEFINITION", "**Cost-benefit analysis**", "Comparing all the costs of a project with all its benefits to decide whether it should go ahead.", "Benefit-cost ratio = benefits ÷ costs; above 1 favours the project.");
  b.card("CONCEPT", "Environmental impacts of mining", "Land degradation, deforestation, water and air pollution, siltation, noise, habitat loss.", undefined);
  b.card("CONCEPT", "Mining hazards", "Rock falls, gases (methane), dust (silicosis, asbestosis), noise, flooding, chemicals, machinery.", undefined);
  b.card("CONCEPT", "Safety measures", "Roof supports, ventilation, gas detectors, PPE (hard hats, masks, ear protection), training, inspections.", undefined);
  b.card("CONCEPT", "Sustainable use of minerals", "Efficient extraction, reprocessing tailings, recycling, substitution, reinvesting revenue, planning for closure.", undefined);
  b.card("FACT", "Who enforces environmental rules", "The Environmental Management Agency (EMA) under the Environmental Management Act.", undefined);
  b.card("CONCEPT", "Why store topsoil?", "It holds the seeds, nutrients and organisms needed to replant mined land.", undefined);
});
