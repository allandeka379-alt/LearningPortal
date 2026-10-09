// Slice G1a: responding to climate change, mitigation, adaptation and agreements.
import { concept, P, geographyLevels, CAM, ZIM } from "../lib.mjs";

const EM = "| Country (fictional) | Emissions 2010 (million tonnes CO₂) | Emissions 2025 (million tonnes CO₂) | Population 2025 (millions) |\n|---|---|---|---|\n| Alpha (HIC) | 480 | 360 | 40 |\n| Beta (MIC) | 300 | 450 | 90 |\n| Gamma (LIC) | 12 | 18 | 30 |";

concept("geo.climate-change.responses", { file: "climate-change/responses", keyPrefix: "climate-change.responses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which action is an example of **mitigation**?",
    options: [
      ["Replacing coal power with a solar farm", "Correct: it cuts greenhouse gas emissions."],
      ["Growing drought-tolerant sorghum and millet", "This helps farmers cope with drought: adaptation."],
      ["Building a concrete sea wall along the coast", "This protects against rising seas: adaptation."],
      ["Buying crop insurance for a bad season", "This helps recovery from bad seasons: adaptation."],
    ],
    answer: "A",
    explanation: "**Mitigation** reduces the causes: switching from coal to solar cuts CO₂.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which agreement set the goal of keeping warming **well below 2 °C** and trying to limit it to 1.5 °C?",
    options: [
      ["The Paris Agreement (2015)", "Correct: adopted by almost every country."],
      ["The Kyoto Protocol (1997)", "Kyoto set emission-cut targets for richer countries, not this temperature goal."],
      ["The UNFCCC (1992)", "The UNFCCC set up cooperation but not this specific limit."],
      ["The Montreal Protocol (1987)", "Montreal dealt with ozone-depleting substances."],
    ],
    answer: "A",
    explanation: "The **Paris Agreement** (2015) set the well-below-2 °C goal with national pledges (NDCs).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was a major **weakness** of the Kyoto Protocol?",
    options: [
      ["Poorer nations had no targets; some big emitters stayed out", "Correct: this limited its global effect."],
      ["It set the same target for every country in the world", "Targets applied only to richer, industrialised countries."],
      ["It banned all use of coal immediately in every country", "Kyoto did not ban coal."],
      ["It applied only to methane emissions from farming", "It covered CO₂ and other greenhouse gases."],
    ],
    answer: "A",
    explanation: "Only richer countries had binding targets, and some large emitters such as the USA did not ratify it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "The Pfumvudza programme in Zimbabwe mainly promotes:",
    options: [
      ["Conservation farming with planting basins and mulching", "Correct: it conserves soil moisture to cope with dry spells."],
      ["Building new coal-fired power stations", "Pfumvudza is a farming programme."],
      ["Planting hybrid maize only on large commercial farms", "It targets smallholder plots."],
      ["Moving all farmers to towns", "It aims to keep farming productive in a changing climate."],
    ],
    answer: "A",
    explanation: "**Pfumvudza** promotes conservation agriculture: planting basins, mulching and timely planting, an adaptation measure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does planting trees help to **mitigate** climate change?",
    options: [
      ["Growing trees absorb carbon dioxide and store carbon", "Correct: forests act as carbon sinks."],
      ["Trees release oxygen, which cools the air", "Oxygen does not affect the greenhouse effect."],
      ["Trees stop the sun's rays from reaching the Earth", "Shade is local; the global benefit is carbon storage."],
      ["Trees produce rain directly from their leaves", "Transpiration adds moisture but is not how trees mitigate warming."],
    ],
    answer: "A",
    explanation: "Trees take in CO₂ by photosynthesis and store carbon: they are **carbon sinks**.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why might a small country like Zimbabwe put more effort into **adaptation** than mitigation?",
    options: [
      ["Its emissions are small but it is very vulnerable to drought", "Correct: cutting its tiny emissions would barely change global warming."],
      ["Adaptation is the cheapest way to reduce global greenhouse gas levels", "Adaptation copes with effects; it does not reduce gases."],
      ["Mitigation is banned for developing countries", "All countries can mitigate; the Paris Agreement asks all to make pledges."],
      ["Climate change will not affect Zimbabwe", "Zimbabwe is highly vulnerable to drought and heat."],
    ],
    answer: "A",
    explanation: "Zimbabwe contributes a tiny share of emissions but suffers serious impacts, so **adaptation** brings the most direct benefit.",
    hints: ["Compare its share of emissions with its vulnerability."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    stem: "Which response in Bangladesh has done most to reduce **deaths** from cyclones?",
    options: [
      ["Warnings and cyclone shelters", "Correct: they let people move to safety in time."],
      ["Salt-tolerant rice varieties", "These protect food supply, not lives during storms."],
      ["Floating vegetable gardens", "These help farming in flooded areas."],
      ["International carbon trading", "This is a mitigation tool with no direct effect on storm deaths."],
    ],
    answer: "A",
    explanation: "Volunteer **warning networks** and **cyclone shelters** have greatly reduced cyclone death tolls.",
    hints: ["Which response helps people during the storm itself?"],
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: `Study the fictional data.\n\n${EM}\n\nCalculate the percentage fall in Alpha's emissions from 2010 to 2025.`,
    value: 25, unit: "%",
    wrong: [120, 33],
    explanation: "Fall = 480 − 360 = 120; 120 ÷ 480 × 100 = 25 %.",
    workedSolution: "1. Fall = 480 − 360 = 120 million tonnes.\n2. 120 ÷ 480 × 100 = 25 %.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `Study the fictional data.\n\n${EM}\n\nCalculate Alpha's emissions per person in 2025, in tonnes of CO₂ per person.`,
    value: 9,
    wrong: [360, 0.11],
    explanation: "360 million ÷ 40 million = 9 tonnes per person.",
    hints: ["Emissions per person = total emissions ÷ population.", "Both are in millions, so the millions cancel."],
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: `Study the fictional data.\n\n${EM}\n\nCalculate Gamma's emissions per person in 2025, in tonnes of CO₂ per person. Give your answer to one decimal place.`,
    value: 0.6, tol: 0.05,
    wrong: [18, 1.67],
    explanation: "18 ÷ 30 = 0.6 tonnes per person.",
    hints: ["Divide total emissions by population."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Under the Paris Agreement each country sets its own targets, called nationally determined {{blank:a}}, and is meant to strengthen them every {{blank:b}} years.",
    blanks: [
      { id: "a", accepted: ["contributions"], wrong: "laws" },
      { id: "b", accepted: ["five", "5"], wrong: "ten" },
    ],
    explanation: "**Nationally determined contributions** (NDCs), updated every **five** years.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each agreement with its main feature.",
    pairs: [
      ["UNFCCC (1992)", "Started global cooperation at the Rio Earth Summit"],
      ["Kyoto Protocol (1997)", "Binding cuts for richer, industrialised countries"],
      ["Paris Agreement (2015)", "Well below 2 °C goal with pledges from almost all countries"],
    ],
    explanation: "Each agreement built on the one before.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Building flood embankments is an example of mitigation.",
    answer: false,
    explanation: "False. Embankments help people cope with floods: they are **adaptation**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Paris Agreement, national targets are set by each country itself.",
    answer: true,
    explanation: "True. Countries submit their own nationally determined contributions.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a store, such as a forest or the ocean, that absorbs more carbon than it releases.",
    accepted: ["carbon sink", "a carbon sink", "sink", "carbon store"],
    wrong: ["carbon source"],
    explanation: "A **carbon sink**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** mitigation and **two** adaptation measures suitable for Zimbabwe.",
    points: [
      "Mitigation 1: solar energy (solar home systems, solar irrigation pumps) replacing coal or diesel.",
      "Mitigation 2: planting trees / woodlots for tobacco curing instead of cutting indigenous woodland.",
      "Adaptation 1: drought-tolerant crops (sorghum, millet) or conservation farming (Pfumvudza).",
      "Adaptation 2: water harvesting, small dams and irrigation / early warning and seasonal forecasts.",
    ],
    modelAnswer: "Mitigation: installing solar home systems and solar-powered irrigation pumps reduces the use of coal and diesel; planting woodlots for tobacco curing reduces the cutting of indigenous trees and stores carbon. Adaptation: growing drought-tolerant sorghum and millet and using Pfumvudza planting basins helps crops survive dry spells; harvesting rainwater and building small dams provide water in droughts.",
    explanation: "Two correctly classified measures of each kind.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3, applies: CAM,
    stem: `Study the fictional data.\n\n${EM}\n\nSuggest why it may be unfair to ask Gamma to cut its emissions as much as Alpha.`,
    points: [
      "Gamma's emissions per person (0.6 t) are far lower than Alpha's (9 t).",
      "HICs like Alpha have emitted much more in the past (historical responsibility).",
      "Gamma needs more energy to develop and reduce poverty, and has less money for new technology.",
    ],
    modelAnswer: "Gamma emits only about 0.6 tonnes per person, compared with 9 tonnes in Alpha, so its people contribute very little. Rich countries such as Alpha have emitted most of the gases already in the atmosphere. Gamma also needs more energy to develop and has less money to pay for clean technology.",
    explanation: "Credit per-person comparison, historical responsibility and development needs.",
    hints: ["Compare emissions per person.", "Who has emitted most in the past?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    stem: "For a named country or region, describe the impacts of climate change and evaluate the responses to them.",
    points: [
      ["Named country/region with specific location detail (e.g. Bangladesh, Ganges-Brahmaputra delta).", 1],
      ["Impact: sea-level rise and stronger storm surges flooding low land.", 1],
      ["Impact: salt water entering farmland and wells; monsoon floods.", 1],
      ["Response: cyclone shelters and volunteer early warning systems.", 1],
      ["Response: embankments, mangroves, salt-tolerant rice, floating gardens.", 1],
      ["Evaluation: warnings and shelters have cut deaths greatly; embankments need repair; costs depend on aid.", 1],
      ["Judgement: adaptation is effective locally but the country depends on global mitigation it cannot control.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Bangladesh lies largely on the low delta of the Ganges and Brahmaputra rivers, so it is very exposed. Rising sea level makes cyclone storm surges reach further inland, salt water spreads into rice fields and wells, and monsoon floods are severe.\n\nThe country has built thousands of raised concrete cyclone shelters, many used as schools, and a large volunteer network spreads warnings by loudspeaker so people can reach shelter in time. Earth embankments protect farmland, mangroves are planted to absorb wave energy, and farmers use salt-tolerant rice and floating gardens.\n\nThese responses have been effective in saving lives: death tolls from cyclones are far lower than in the 1970s. However, embankments are costly to maintain and can be breached, salt intrusion is hard to stop, and many schemes depend on foreign aid. Above all, Bangladesh's own emissions are tiny, so its long-term safety depends on other countries cutting emissions. Adaptation works well locally, but it cannot solve the problem alone.",
    explanation: "Credit specific located impacts, named responses and a supported judgement of their effectiveness.",
    hints: ["Give place detail and impacts first.", "For each response, say how well it has worked and why."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study the fictional data.\n\n${EM}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which country's emissions increased the most between 2010 and 2025?", accepted: ["Beta"], wrong: ["Gamma"], explanation: "Beta: up by 150 million tonnes." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate Beta's emissions per person in 2025 (tonnes of CO₂ per person).", value: 5, wrong: [450], explanation: "450 ÷ 90 = 5 tonnes per person." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which response by Alpha is most likely to explain the fall in its emissions?", options: [
        ["Switching from coal to renewables", "Correct: this cuts CO₂ directly."],
        ["Building more coastal sea walls", "Sea walls are adaptation; they do not cut emissions."],
        ["Growing more drought-tolerant crops", "This is adaptation."],
        ["Increasing its population size", "A larger population would usually raise emissions."],
      ], answer: "A", explanation: "Switching to renewables is mitigation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Evaluate the Paris Agreement as a way of reducing emissions from countries like Alpha, Beta and Gamma.", points: [
        "Strength: almost every country takes part, including MICs like Beta whose emissions are rising.",
        "Weakness: targets (NDCs) are voluntary and current pledges are not enough to reach 1.5 °C.",
        "Finance promised to LICs like Gamma helps them develop cleanly, but promised funds have often been slow to arrive.",
      ], explanation: "Credit strengths and weaknesses with reference to the countries." }),
    ],
    hints: ["Compare the change for each country.", "Who takes part, and are the targets binding?"],
    explanation: "Practice in analysing emissions data and evaluating agreements.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "A fictional village in natural region IV has suffered three poor seasons in five years. The village committee lists possible projects: (1) a solar-powered borehole, (2) a woodlot of fast-growing trees, (3) training in planting basins and mulching, (4) a store for small grains, (5) an SMS weather alert service.",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Classify projects 2, 3, 4 and 5 as mitigation or adaptation.", pairs: [
        "Woodlot of fast-growing trees",
        "Training in planting basins and mulching",
        "Store for small grains",
        "SMS weather alert service",
      ], right: ["Mitigation", "Adaptation"], rightIndex: [0, 1, 1, 1], explanation: "The woodlot stores carbon (mitigation); the others help people cope (adaptation)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the solar-powered borehole helps with both mitigation and adaptation.", points: [
        "Mitigation: solar power replaces a diesel pump, so no CO₂ is emitted.",
        "Adaptation: provides reliable water for people, livestock and gardens in droughts.",
      ], explanation: "One project can do both." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest which project should be done first and justify your choice.", points: [
        "A clear choice (e.g. planting basins or the borehole).",
        "Justified by need and cost (e.g. cheap, quick to train and directly protects harvests in dry spells).",
      ], explanation: "Any choice with a reasoned justification." }),
    ],
    hints: ["Does the project reduce gases or help people cope?"],
    explanation: "Practice in classifying and choosing climate responses.",
  });
  b.card("DEFINITION", "Mitigation", "Reducing the causes of climate change: cutting greenhouse gas emissions or removing gases from the air.");
  b.card("DEFINITION", "Adaptation", "Reducing the harm from climate change effects, without tackling the causes.");
  b.card("CONCEPT", "Mitigation examples", "Renewable energy, energy efficiency, afforestation, carbon capture and storage, cleaner transport, carbon pricing.");
  b.card("CONCEPT", "Adaptation examples", "Water storage, drought-tolerant crops, conservation farming, irrigation, flood defences, early warning, insurance.");
  b.card("FACT", "UNFCCC", "1992, Rio Earth Summit: framework for global cooperation; annual COP meetings.");
  b.card("FACT", "Kyoto Protocol", "1997 (in force 2005): binding cuts for richer countries; no targets for developing countries; USA did not ratify.");
  b.card("FACT", "Paris Agreement", "2015: well below 2 °C, aim for 1.5 °C; nationally determined contributions updated every five years.");
  b.card("FACT", "Pfumvudza", "Zimbabwean conservation agriculture programme: planting basins and mulching to cope with dry spells.");
  b.card("CONCEPT", "Bangladesh responses", "Cyclone shelters, volunteer early warning, embankments, mangroves, salt-tolerant rice, floating gardens.");
});
