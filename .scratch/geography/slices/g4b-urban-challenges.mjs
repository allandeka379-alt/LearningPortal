// Slice G4b: opportunities and challenges of urban growth; urban sprawl (ZIMSEC 7.11.2.2; Cambridge 7.2.1-7.2.3).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.settlement.urban-challenges", { file: "settlement/urban-challenges", keyPrefix: "settlement.urban-challenges" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an **opportunity** of urban living?",
    options: [
      ["Access to hospitals and colleges", "Correct: towns concentrate specialist services."],
      ["Traffic congestion at peak times", "Congestion is a challenge."],
      ["Overcrowded rented rooms", "Overcrowding is a challenge."],
      ["Irregular refuse collection", "Poor waste collection is a challenge."],
    ],
    answer: "A",
    explanation: "Opportunities include jobs, services, utilities, culture and markets.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **urban sprawl**?",
    options: [
      ["The spread of a town's built-up area into the countryside", "Correct: the outward, often uncontrolled, growth of the town."],
      ["The movement of people from large towns back to rural areas", "That is counter-urbanisation."],
      ["The rebuilding of old housing in the inner city", "That is urban regeneration."],
      ["Overcrowding in the central business district", "Sprawl is about outward spread, not crowding at the centre."],
    ],
    answer: "A",
    explanation: "Urban sprawl takes over land at the edge of the town.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which disease is most closely linked to overflowing sewers and unsafe water in crowded urban areas?",
    options: [
      ["Cholera", "Correct: cholera spreads through water and food contaminated with sewage."],
      ["Malaria", "Malaria is spread by mosquitoes, not sewage."],
      ["Diabetes", "Diabetes is a non-communicable lifestyle disease."],
      ["Lung cancer", "Lung cancer is linked mainly to smoking."],
    ],
    answer: "A",
    explanation: "Cholera and typhoid are water-borne diseases linked to poor sanitation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many urban residents in LICs work in the informal sector?",
    options: [
      ["There are too few formal jobs for the growing population", "Correct: formal employment grows more slowly than the population."],
      ["Informal jobs always pay more than formal jobs in offices", "Informal incomes are usually low and uncertain."],
      ["The informal sector is required by law", "Informal work is, by definition, unregistered."],
      ["Formal jobs are found only in rural areas", "Most formal jobs are in towns."],
    ],
    answer: "A",
    explanation: "Rapid population growth outpaces formal job creation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a negative impact of urban sprawl on the rural-urban fringe?",
    options: [
      ["Loss of farmland and wetlands to housing", "Correct: land is permanently built over."],
      ["New shops and services near former farms", "This is a positive impact."],
      ["Jobs in construction for local people", "This is a positive impact."],
      ["Larger markets for nearby vegetable growers", "This is a positive impact."],
    ],
    answer: "A",
    explanation: "Sprawl replaces rural land uses with urban ones.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which lake supplies much of Harare's water and is polluted by urban sewage and effluent?",
    options: [
      ["Lake Chivero", "Correct: it lies on the Manyame River downstream of Harare."],
      ["Lake Kariba", "Kariba is on the Zambezi, far to the north-west."],
      ["Lake Mutirikwi", "Mutirikwi is near Masvingo."],
      ["Lake Tanganyika", "Tanganyika is not in Zimbabwe."],
    ],
    answer: "A",
    explanation: "Lake Chivero receives polluted water from the city upstream.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What happens to rain falling on wetlands compared with roofs and roads?"],
    stem: "Why can building houses on urban wetlands (vleis) increase flooding?",
    options: [
      ["Wetlands that stored rainwater are replaced by hard surfaces", "Correct: runoff increases and reaches streams faster."],
      ["Houses increase the amount of rain that falls", "Buildings do not increase rainfall."],
      ["Wetlands cause nearby rivers to dry up in the wet season", "Wetlands help keep rivers flowing."],
      ["Building on wetlands raises the water table", "Hard surfaces reduce infiltration and recharge."],
    ],
    answer: "A",
    explanation: "Loss of wetland storage and infiltration increases rapid runoff.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which problem is most directly caused by a growing number of vehicles?"],
    stem: "A city's population doubles in 20 years, but its road network hardly changes. Which problem is most likely to increase?",
    options: [
      ["Traffic congestion", "Correct: more vehicles on the same roads."],
      ["Loss of farmland on the fringe", "That results from sprawl, not from the road network."],
      ["Shortage of hospital beds", "That depends on health spending, not roads."],
      ["Low rainfall", "Rainfall is not caused by population growth."],
    ],
    answer: "A",
    explanation: "Road capacity that does not keep pace with growth leads to congestion.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Which change tackles the cause, not just the symptom?"],
    stem: "Which action would most effectively reduce cholera risk in a high-density suburb?",
    options: [
      ["Repairing sewers and providing safe piped water", "Correct: it removes the route by which the disease spreads."],
      ["Building a larger hospital in the CBD", "This treats patients but does not stop infection."],
      ["Widening the main road to the suburb", "Roads do not affect water-borne disease."],
      ["Moving the bus terminus nearer the suburb", "Bus termini do not affect sanitation."],
    ],
    answer: "A",
    explanation: "Safe water and sanitation prevent water-borne disease.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Refuse that is not collected can block drains and attract flies and rats.",
    answer: true,
    explanation: "True. Uncollected waste causes health and flooding problems.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Urban sprawl has only negative impacts on the rural-urban fringe.",
    answer: false,
    explanation: "False. It also brings housing, jobs, services and urban markets for nearby farmers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each urban challenge with a likely cause.",
    pairs: [
      ["Water shortages", "Demand growing faster than treatment capacity"],
      ["Traffic congestion", "More vehicles than the roads can carry"],
      ["Illegal dumping", "Irregular refuse collection"],
      ["Backyard shacks", "Housing shortage and long waiting lists"],
    ],
    explanation: "Each challenge results from growth outpacing provision.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Street vending and small unregistered workshops are part of the {{blank:a}} sector. The zone at the edge of a town where rural and urban land uses mix is the {{blank:b}} fringe.",
    blanks: [
      { id: "a", accepted: ["informal"], choices: ["informal", "formal", "primary", "quaternary"] },
      { id: "b", accepted: ["rural-urban"], choices: ["rural-urban", "inner-city", "central", "industrial"] },
    ],
    explanation: "The informal sector is unregistered work; the rural-urban fringe lies at the city edge.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional city needs 1,200 megalitres of water a day but its treatment works supply 450 megalitres a day (fictional data). What percentage of demand is met?",
    value: 37.5, tol: 0.05,
    wrong: [266.7, 62.5],
    explanation: "450 ÷ 1,200 × 100 = 37.5%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "t",
    hints: ["Multiply people by waste per person.", "Convert kilograms to tonnes."],
    stem: "A fictional suburb has 80,000 residents, each producing about 0.5 kg of refuse a day (fictional data). How many tonnes of refuse does the suburb produce in a week?",
    value: 280, tol: 0,
    wrong: [40, 280000],
    workedSolution: "1. Per day: 80,000 × 0.5 = 40,000 kg = 40 t.\n2. Per week: 40 × 7 = 280 t.",
    explanation: "40 t a day × 7 = 280 t.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** opportunities that urban areas offer to people who move there from rural areas.",
    points: [
      "Formal and informal jobs / higher incomes.",
      "Better access to schools, colleges and universities.",
      "Hospitals and specialist health care.",
      "Piped water, electricity, entertainment or larger markets.",
    ],
    modelAnswer: "Towns offer more jobs, both formal and informal, so people can earn cash. They have secondary schools and colleges, hospitals with specialists, and more homes with piped water and electricity.",
    explanation: "Four distinct opportunities.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    hints: ["Think about water, disease, waste and transport in Harare."],
    stem: "Describe the problems caused by rapid urban growth in a named Zimbabwean town.",
    points: [
      "Names the town (e.g. Harare) and describes water shortages / pollution of Lake Chivero.",
      "Overcrowding, housing shortages and unplanned settlements / backyard shacks.",
      "Disease outbreaks such as cholera (2008-09, 2018) linked to poor sanitation.",
      "Uncollected refuse and illegal dumps / traffic congestion / unemployment.",
    ],
    modelAnswer: "In Harare, demand for water exceeds supply and Lake Chivero is polluted by sewage. Housing shortages lead to overcrowded lodgings and backyard shacks. Poor sanitation contributed to cholera outbreaks in 2008-09 and 2018. Refuse is not collected regularly and roads are congested at peak times.",
    explanation: "Name the town and give specific problems.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Weigh opportunities against challenges.", "Use a named city."],
    stem: "\"For most people who move there, the opportunities of city life outweigh the challenges.\" With reference to a named city in an LIC or MIC, how far do you agree?",
    points: [
      "Names the city (e.g. Harare) and the context of rapid growth.",
      "Opportunities: jobs (formal and informal), higher incomes.",
      "Opportunities: education, health care, utilities, culture.",
      "Challenges: housing shortages, unplanned settlements, overcrowding.",
      "Challenges: water shortages, poor sanitation and disease, waste, pollution, congestion.",
      "Differences between groups: the poor and newcomers face most challenges; skilled workers gain most.",
      "Supported judgement, e.g. most migrants stay because opportunities are greater than in rural areas.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Harare offers far more jobs than rural areas, both in commerce and government and in the large informal sector, so people can earn a cash income. It has universities, hospitals and more homes with electricity. However, housing is short, so many newcomers rent single rooms or live in backyard shacks. Water supply is unreliable, Lake Chivero is polluted, refuse goes uncollected and cholera outbreaks in 2008-09 and 2018 hit the high-density suburbs. Educated, employed residents gain most, while poor newcomers face most of the problems. On balance, most migrants stay because even an informal income and better schools are better than poverty in the village, so the opportunities outweigh the challenges for many, but not for the poorest.",
    explanation: "Weigh both sides, consider different groups and conclude.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows survey results from three fictional suburbs of a city (fictional data).\n\n| Suburb | Households with piped water every day (%) | Households with weekly refuse collection (%) | People per room |\n|---|---|---|---|\n| X (high-density, old) | 34 | 40 | 3.2 |\n| Y (high-density, new) | 12 | 15 | 3.8 |\n| Z (low-density) | 78 | 85 | 0.9 |",
    hints: ["Compare each column across the suburbs.", "Think about why new suburbs lack services."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which suburb has the worst service provision?",
        options: [
          ["Y", "Correct: lowest water and refuse figures and the most crowding."],
          ["X", "X is better than Y on all three measures."],
          ["Z", "Z has the best services."],
          ["X and Z equally", "Z is far better served than X."],
        ],
        answer: "A", explanation: "Suburb Y scores worst on every indicator.",
      }),
      P.num({ label: "(b)", stem: "How many times more crowded (people per room) is suburb Y than suburb Z? Give your answer to one decimal place.", value: 4.2222, answer: "4.2", tol: 0.05, wrong: [2.9, 0.24], explanation: "3.8 ÷ 0.9 = 4.2 times." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest reasons why services in suburb Y are worse than in suburb X.",
        points: ["Y is new, so pipes, sewers and roads have not yet been built / completed.", "Population grew faster than the council could extend services.", "The council lacks money / Y may have grown informally without planning."],
        modelAnswer: "Suburb Y is new and grew quickly, so the council has not yet laid pipes and sewers or planned refuse routes. It lacks the money to extend services as fast as people arrive, and parts may have been built without planning.",
        explanation: "Link the age and growth of Y to services.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the conditions in suburb Y could affect the health of residents.",
        points: ["Unreliable piped water means people use unsafe wells or stored water.", "Uncollected refuse breeds flies and rats and blocks drains.", "Overcrowding spreads diseases such as cholera, typhoid or tuberculosis quickly."],
        modelAnswer: "Without daily piped water, residents use shallow wells that may be contaminated. Refuse breeds flies and rats, and overcrowded rooms allow diseases such as cholera and TB to spread quickly.",
        explanation: "Link each condition to a health effect.",
      }),
    ],
    explanation: "This item practises interpreting data on urban service provision.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480, applies: CAM,
    stem: "Table 1 shows land use in a fictional area of the rural-urban fringe in two years (fictional data, hectares).\n\n| Land use | Year 1 | Year 2 |\n|---|---|---|\n| Farmland | 620 | 410 |\n| Wetland | 80 | 35 |\n| Housing | 150 | 360 |\n| Shopping centre and roads | 50 | 95 |\n| **Total** | 900 | 900 |",
    hints: ["Subtract Year 1 from Year 2 for each land use."],
    parts: [
      P.num({ label: "(a)", unit: "ha", stem: "By how many hectares did farmland decrease?", value: 210, wrong: [1030, 45], explanation: "620 − 410 = 210 ha." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of the wetland lost between Year 1 and Year 2. Give your answer to the nearest whole number.", value: 56.25, answer: "56", tol: 0.5, wrong: [45, 44], explanation: "(80 − 35) ÷ 80 × 100 = 56.25%, about 56%." }),
      P.manual({
        label: "(c)", marks: 4, stem: "Describe the likely impacts of these changes on people and the environment of the rural-urban fringe.",
        points: ["Farmers lose land and livelihoods / less food produced near the city.", "Loss of wetland increases flooding and reduces groundwater and river flow.", "More traffic, noise and pollution from new housing and roads.", "Positive: new homes, shops, services and jobs for residents."],
        modelAnswer: "Farmers have lost 210 ha, so fewer people can earn a living from farming. Over half the wetland has gone, so floods will be worse and groundwater recharge less. More housing and roads bring traffic and noise, although residents gain new homes, shops and jobs.",
        explanation: "Include both people and environment, negative and positive.",
      }),
    ],
    explanation: "This item practises analysing the impact of urban sprawl.",
  });

  b.card("DEFINITION", "Urban sprawl", "Uncontrolled outward spread of a town's built-up area into the countryside.");
  b.card("DEFINITION", "Informal sector", "Small-scale unregistered, untaxed work such as vending, small workshops and unlicensed transport.");
  b.card("CONCEPT", "Opportunities of urban living", "Jobs and income, schools and hospitals, piped water and electricity, culture and leisure, larger markets.");
  b.card("CONCEPT", "Challenges of rapid urban growth", "Housing shortage, water and sanitation, disease, waste, traffic congestion, unemployment, pollution, inequality.");
  b.card("CONCEPT", "Impacts of sprawl on the rural-urban fringe", "Loss of farmland and wetlands, traffic, higher land prices, waste sites; but new housing, jobs, services and markets.");
  b.card("FACT", "Lake Chivero", "Harare's main water source on the Manyame River, downstream of the city; polluted by sewage and effluent.", undefined, { applies: ZIM });
  b.card("FACT", "Cholera in Zimbabwe's towns", "2008-09 outbreak: about 100,000 cases and about 4,000 deaths nationally; 2018 outbreak began in Glen View and Budiriro, Harare.", undefined, { applies: ZIM });
  b.card("VOCABULARY", "Service provision", "Supplying water, sewerage, electricity, refuse collection, health care, schools and transport.");
});
