// Slice G2c: pollution and waste management (ZIMSEC 7.8.2).
import { concept, P, geographyLevels } from "../lib.mjs";

const WASTE = "**Table 1: Solid waste collected in one week from a fictional Zimbabwean town (fictional data)**\n\n| Type of waste | Mass (tonnes) |\n|---|---|\n| Food and garden (organic) waste | 540 |\n| Plastics | 150 |\n| Paper and card | 120 |\n| Glass | 60 |\n| Metals | 45 |\n| Other | 85 |";

const NOISE = "**Table 2: Noise levels measured at 08:00 by a Form 4 class near a fictional town's bus terminus (fictional data)**\n\n| Site | Distance from the terminus (m) | Noise level (decibels) |\n|---|---|---|\n| A: bus terminus | 0 | 88 |\n| B: market | 100 | 79 |\n| C: main road | 250 | 72 |\n| D: residential street | 400 | 58 |\n| E: school gate | 500 | 52 |";

concept("geo.environment.pollution-waste", { file: "environment/pollution-waste", keyPrefix: "environment.pollution-waste" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method is at the **top** of the waste hierarchy, so it is the most sustainable?",
    options: [
      ["Reducing the amount of waste produced", "Correct: waste that is never made needs no collection, treatment or disposal."],
      ["Recycling plastics and cans", "Recycling is useful but still needs collection, sorting, energy and processing."],
      ["Burying waste in a sanitary landfill", "Disposal is the last choice in the hierarchy."],
      ["Burning waste in the backyard", "Open burning is not part of the hierarchy at all: it causes air pollution."],
    ],
    answer: "A",
    explanation: "The waste hierarchy runs: **reduce**, reuse, recycle, recover energy or compost, and dispose only as a last resort.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a source of **noise** pollution in a town?",
    options: [
      ["Loudspeakers outside shops and bars", "Correct: loud music and announcements disturb residents, especially at night."],
      ["Leachate seeping from a dump", "Leachate pollutes water and soil, not the air with sound."],
      ["Fertiliser washed into a river", "This is a source of water pollution."],
      ["Slogans painted on a bridge", "Graffiti is visual pollution."],
    ],
    answer: "A",
    explanation: "Noise pollution comes from traffic and hooting, loudspeakers, industry, generators and aircraft.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature makes a **sanitary landfill** different from an open dump?",
    options: [
      ["Waste is compacted and covered with soil each day", "Correct: daily cover keeps out flies, rats and rain and reduces smells and fires."],
      ["Waste is left on the surface to dry out", "Leaving waste uncovered is what happens at an open dump."],
      ["Waste is burned in the open to save space", "Open burning causes air pollution and is not a feature of a sanitary landfill."],
      ["Waste is dumped close to rivers for easy drainage", "Sites near rivers allow leachate to pollute water; landfills are sited away from them."],
    ],
    answer: "A",
    explanation: "A sanitary landfill has a lined base, daily compaction and soil cover, and controls for leachate and gas. An open dump has none of these.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is **leachate**?",
    options: [
      ["Polluted liquid that drains out of a waste dump", "Correct: rainwater soaks through rotting waste and picks up chemicals and bacteria."],
      ["Gas given off by rotting waste in a dump or landfill", "That is landfill gas, mainly methane and carbon dioxide."],
      ["Smoke from waste burned in the open", "Smoke is air pollution, not leachate."],
      ["Plastic waste collected for recycling", "Recyclable plastic is a resource, not leachate."],
    ],
    answer: "A",
    explanation: "Leachate can seep into soil, groundwater and streams, so landfills need a lined base and drainage to collect it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pollutant from burning coal is the main cause of **acid rain**?",
    options: [
      ["Sulphur dioxide", "Correct: it dissolves in water droplets in the air to form an acid."],
      ["Methane", "Methane is a greenhouse gas from rotting waste and livestock; it does not cause acid rain."],
      ["Water vapour", "Water vapour is not a pollutant that makes rain acidic."],
      ["Oxygen", "Oxygen is needed for burning; it is not a pollutant."],
    ],
    explanation: "Sulphur dioxide (and nitrogen oxides) from coal-fired power stations, smelters and vehicles dissolve in cloud droplets and fall as acid rain, damaging plants, soils and buildings.",
    answer: "A",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Residents of a high-density suburb burn their refuse because it is not collected. What is the **main** harm caused to people?",
    options: [
      ["Smoke with toxic gases and particles causes breathing problems", "Correct: burning plastics and mixed waste gives off particles and poisonous fumes."],
      ["The ash makes the soil too fertile for gardens", "Ash is not the main harm; it may contain toxic residues rather than making soil too fertile."],
      ["The fires use up oxygen needed by the residents", "Small fires do not noticeably lower the oxygen in the open air."],
      ["The heat from the fires raises the temperature of the whole suburb", "The heat from small fires is local and short-lived."],
    ],
    answer: "A",
    explanation: "Open burning of mixed waste releases smoke, particles and toxic gases that cause asthma, bronchitis and other respiratory illness.",
    hints: ["Think about what burning plastics releases into the air people breathe."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these is an **economic** effect of polluted water supplies on a town?",
    options: [
      ["The council spends more on chemicals to treat drinking water", "Correct: this is a cost in money to the council and its ratepayers."],
      ["Children fall ill with diarrhoea after drinking well water", "This is a social (health) effect."],
      ["Algae cover the surface of the town's dam", "This is a physical (environmental) effect."],
      ["Fish in the river die from lack of oxygen", "This is a physical (environmental) effect, although it may later have economic costs."],
    ],
    answer: "A",
    explanation: "Sort effects into **social** (health, well-being), **economic** (costs, lost income) and **physical** (damage to land, water, air and wildlife).",
    hints: ["Which option is about money?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do many Zimbabwean town councils fail to collect all the solid waste their residents produce?",
    options: [
      ["Waste has grown faster than council trucks, fuel and funds", "Correct: collection capacity has not kept up with urban growth."],
      ["Most urban waste rots away before it can be collected", "Plastics, glass and metals do not rot quickly, and rotting waste still needs removing."],
      ["The law forbids councils from collecting waste in suburbs", "Councils are responsible for refuse collection by law."],
      ["Residents produce less waste each year as incomes rise", "Waste generally increases, not decreases, as incomes rise and towns grow."],
    ],
    answer: "A",
    explanation: "Rapid urban growth, informal settlements, shortages of refuse trucks and fuel, and unpaid rates leave councils without the capacity to collect waste regularly.",
    hints: ["Compare how fast towns grow with the resources councils have."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Graffiti on walls and buses is a form of visual pollution.",
    answer: true,
    explanation: "True. Graffiti spoils the appearance of public places, lowers property values and costs money to remove.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the waste hierarchy, recycling is more sustainable than reducing waste.",
    answer: false,
    explanation: "False. **Reducing** waste comes first, because it avoids the energy and cost of collecting and recycling. Recycling comes after reduce and reuse.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the first three steps of the waste hierarchy, in order.",
    template: "First {{blank:a}}, then {{blank:b}}, then {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["reduce"], choices: ["reduce", "reuse", "recycle", "dispose"] },
      { id: "b", accepted: ["reuse"], choices: ["reduce", "reuse", "recycle", "dispose"] },
      { id: "c", accepted: ["recycle"], choices: ["reduce", "reuse", "recycle", "dispose"] },
    ],
    wrong: [["recycle", "reuse", "reduce"]],
    explanation: "Reduce, reuse, recycle (the 3Rs), then recover or compost, then dispose.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source with the type of pollution it mainly causes.",
    pairs: [
      ["Overflowing sewers in a high-density suburb", "Water pollution"],
      ["Exhaust fumes from kombis and lorries", "Air pollution"],
      ["Plastic bags and bottles dumped on open land", "Land pollution"],
      ["Hooting and loud music at a bus terminus", "Noise pollution"],
    ],
    explanation: "Each source mainly pollutes one part of the environment, although effects often spread (for example litter blocks drains and pollutes water).",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional town's residents produce an estimated 2,000 tonnes of solid waste a month, but the council collects only 1,250 tonnes. Calculate the percentage of the waste that is **not** collected.",
    value: 37.5, unit: "%", tol: 0.1,
    wrong: [62.5, 750],
    explanation: "Uncollected waste = 2,000 − 1,250 = 750 t; 750 ÷ 2,000 × 100 = 37.5 %.",
    workedSolution: "1. Uncollected = 2,000 − 1,250 = 750 tonnes.\n2. Percentage = 750 ÷ 2,000 × 100 = 37.5 %.",
    hints: ["First find how much is not collected.", "Divide by the total produced, not by the amount collected."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In a fictional survey, 25 households threw away a total of 300 kg of waste in one week. Calculate the mean mass of waste per household per week, in kilograms.",
    value: 12,
    wrong: [7500, 0.083],
    explanation: "Mean = total ÷ number of households = 300 ÷ 25 = 12 kg per household per week.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Zimbabwean government agency that issues licences for the discharge of effluent and can fine polluters.",
    accepted: ["Environmental Management Agency", "EMA", "the Environmental Management Agency", "Environment Management Agency"],
    wrong: ["ZINWA"],
    explanation: "The **Environmental Management Agency (EMA)**, set up under the Environmental Management Act, licenses effluent and emissions, inspects polluters and enforces the law.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** social effects and **two** economic effects of uncontrolled dumping of waste in a town.",
    points: [
      "Social: spreads diseases such as cholera, typhoid or diarrhoea (flies, rats, contaminated water).",
      "Social: bad smells, ugly surroundings or loss of pride and well-being in the neighbourhood.",
      "Economic: councils spend money on clean-ups, extra treatment of water or health care.",
      "Economic: lower property values, lost tourism or lost working days through illness.",
    ],
    modelAnswer: "Dumped waste attracts flies and rats and blocks drains, so diseases such as cholera and diarrhoea spread. The smell and ugly surroundings reduce people's quality of life. Councils must spend money clearing illegal dumps and treating polluted water, and illness means lost working days. Property values fall and visitors avoid dirty areas.",
    explanation: "Two social and two economic effects, each clearly stated.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Outline **three** measures that could reduce noise pollution in the centre of a town.",
    points: [
      "By-laws that limit loudspeakers and music, with fines enforced by the council or EMA.",
      "Moving or zoning bus termini and noisy industry away from homes, schools and hospitals.",
      "Banning unnecessary hooting / planting trees or building barriers that absorb sound.",
    ],
    modelAnswer: "The council could pass by-laws limiting loudspeakers outside shops and fine offenders. Bus termini and noisy industries could be zoned away from homes, schools and clinics. Unnecessary hooting could be banned, and rows of trees planted to absorb sound.",
    explanation: "Each measure must be practical and linked to a source of noise.",
    hints: ["Think about laws, planning and physical barriers."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "With reference to a named town in Zimbabwe, evaluate the strategies used to manage solid waste.",
    points: [
      ["Names a town and describes its waste problem (e.g. irregular collection, illegal dumps, open dumpsite such as Pomona in Harare).", 1],
      ["Explains a cause of the problem (e.g. rapid urban growth, too few trucks and too little fuel, unpaid rates).", 1],
      ["Describes a collection or disposal strategy (council collection, landfill or dumpsite).", 1],
      ["Evaluates it (e.g. open dump causes leachate, fires and smoke; collection irregular).", 1],
      ["Describes reduce/reuse/recycling, including informal waste pickers or private recyclers.", 1],
      ["Evaluates it (e.g. creates income and cuts waste, but limited by low prices and lack of sorting).", 1],
      ["Describes and evaluates laws, bans or education (e.g. 2017 ban on polystyrene containers, fines, national clean-up day).", 1],
      ["Overall judgement on which strategy is most sustainable, with a reason.", 1],
    ],
    levels: geographyLevels(8),
    modelAnswer: "Harare's population has grown faster than the council's capacity to collect refuse. Shortages of refuse trucks and fuel mean that some high-density suburbs go weeks without collection, so residents dump or burn waste on open land and in drains.\n\nCollected waste goes mainly to Pomona, which has operated as an open dump rather than an engineered landfill. It has no proper lining, so leachate can reach groundwater and streams, and fires there produce smoke that affects nearby residents. Collection and dumping therefore move the problem rather than solve it.\n\nRecycling helps. Informal waste pickers collect plastics, cans and cardboard and sell them to recyclers, which reduces waste and provides an income. However, prices are low and unstable, and most waste is not sorted at source, so only a small share is recycled. Composting could deal with the large share of organic waste but is not practised on a large scale.\n\nThe government has used laws and campaigns. Expanded polystyrene food containers were banned in 2017, which reduced one type of litter, and a national clean-up day encourages community action. Fines for littering are hard to enforce.\n\nOverall, the most sustainable strategies are reducing and separating waste at source and composting organic waste, because they cut the amount that must be collected. They will only work if councils provide separate collection and residents are educated, while the dumpsite is upgraded to a sanitary landfill.",
    explanation: "Level 3 answers describe and evaluate at least three strategies for a named town and reach a supported judgement.",
    hints: ["Use the waste hierarchy to organise your answer.", "For each strategy say what works and what limits it."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${WASTE}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total mass of waste collected in the week.", value: 1000, unit: "t", wrong: [915], explanation: "540 + 150 + 120 + 60 + 45 + 85 = 1,000 t." }),
      P.num({ label: "(b)", marks: 2, stem: "Plastics, paper and card, glass and metals can be recycled. Calculate the percentage of the total waste that could be recycled.", value: 37.5, unit: "%", tol: 0.1, wrong: [375, 54], explanation: "150 + 120 + 60 + 45 = 375 t; 375 ÷ 1,000 × 100 = 37.5 %." }),
      P.num({ label: "(c)", marks: 2, stem: "The data are to be shown as a pie chart. Calculate the angle of the sector for food and garden waste, to one decimal place.", value: 194.4, unit: "°", tol: 0.1, answer: "194.4", wrong: [54, 540], explanation: "540 ÷ 1,000 × 360 = 194.4°." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** reasons why food and garden waste makes up the largest share of the town's waste.", points: [
        "Most households cook fresh food at home, producing peelings and scraps.",
        "Garden and yard sweepings (leaves, grass) are thrown away; few households compost.",
      ], explanation: "Credit reasons linked to household food preparation and garden waste." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the council could reduce the amount of waste sent to its dumpsite.", points: [
        "Encourage or provide composting of organic waste, which is over half of the total.",
        "Separate recyclables at source (separate bins) and support recycling businesses or waste pickers.",
        "Educate residents to reduce and reuse, e.g. carry reusable bags, refill containers.",
      ], explanation: "Each strategy should be linked to the data where possible." }),
    ],
    hints: ["For percentages, divide by the total and multiply by 100.", "A full circle is 360°."],
    explanation: "Practice in processing waste-composition data and linking it to waste management.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 2.\n\n${NOISE}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "At which site was the noise level highest?", options: [
        ["Site A", "Correct: 88 decibels at the bus terminus."],
        ["Site B", "Site B (79 decibels) is quieter than the terminus."],
        ["Site C", "Site C recorded 72 decibels."],
        ["Site E", "Site E was the quietest (52 decibels)."],
      ], answer: "A", explanation: "The bus terminus (site A) recorded 88 decibels, the highest value." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the range of the noise levels.", value: 36, wrong: [140], explanation: "88 − 52 = 36 decibels." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean noise level of the five sites.", value: 69.8, tol: 0.05, answer: "69.8", wrong: [72, 349], explanation: "(88 + 79 + 72 + 58 + 52) ÷ 5 = 349 ÷ 5 = 69.8 decibels." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe the relationship between distance from the terminus and noise level.", points: [
        "Noise level decreases as distance from the terminus increases (a negative relationship).",
        "Uses data, e.g. from 88 decibels at 0 m to 52 decibels at 500 m.",
      ], explanation: "State the relationship and support it with figures." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** effects of the noise at site A on people who work there every day.", points: [
        "Stress, headaches or difficulty concentrating / communicating.",
        "Long-term hearing damage from many hours of loud noise.",
      ], explanation: "Health effects of prolonged exposure." }),
    ],
    hints: ["Range = highest − lowest.", "Add all five values and divide by five for the mean."],
    explanation: "Practice in using fieldwork data on noise pollution.",
  });
  b.card("DEFINITION", "Pollution", "The release of harmful substances or energy into the environment faster than it can disperse, break down or absorb them.");
  b.card("CONCEPT", "Waste hierarchy", "Reduce → reuse → recycle → recover energy or compost → dispose (landfill) as the last resort.");
  b.card("DEFINITION", "Sanitary landfill", "Lined site where waste is compacted and covered with soil daily; leachate and gas are controlled. An open dump has no controls.");
  b.card("DEFINITION", "Leachate", "Polluted liquid formed when rainwater drains through rotting waste; it can contaminate soil, groundwater and streams.");
  b.card("CONCEPT", "Types of pollution", "Water, air, land, noise and visual (graffiti). Give a source, a pollutant and an effect for each.");
  b.card("CONCEPT", "Effects of environmental deterioration", "Social (disease, stress), economic (treatment and health costs, lost tourism), physical (eutrophication, contaminated soil, flooding).");
  b.card("FACT", "Polystyrene ban", "In 2017 Zimbabwe banned expanded polystyrene (kaylite) food containers, a major source of litter.");
  b.card("FACT", "Cholera 2008-2009", "Outbreak in Harare, Chitungwiza and elsewhere caused about 4,000 deaths; burst sewers, broken water supply and uncollected refuse helped it spread.");
  b.card("CONCEPT", "Controlling pollution", "Laws and fines (EMA, polluter pays), treatment at source, bans, education and clean-ups, zoning of industry.");
});
