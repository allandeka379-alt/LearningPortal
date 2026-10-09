// Slice G4b: managing urban growth (ZIMSEC 7.11.2.3; Cambridge 7.3.1-7.3.2).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.settlement.urban-management", { file: "settlement/urban-management", keyPrefix: "settlement.urban-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a **site-and-service scheme**, what does the council provide?",
    options: [
      ["Plots with roads, water and sewers", "Correct: families then build their own houses."],
      ["Fully built houses at no cost", "Houses are built by the families themselves."],
      ["Free bus travel to the CBD", "That is a transport policy."],
      ["Farmland for growing crops", "Site-and-service is a housing scheme."],
    ],
    answer: "A",
    explanation: "The council provides serviced plots; residents build homes.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a **green belt**?",
    options: [
      ["To restrict urban sprawl into the countryside", "Correct: building is restricted in the protected zone."],
      ["To grow trees for firewood in the CBD", "Green belts surround the city, not the CBD."],
      ["To provide land for new factories", "Green belts restrict building."],
      ["To store floodwater in the city centre after storms", "That is the role of parks or detention ponds."],
    ],
    answer: "A",
    explanation: "Green belts protect open land around cities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which strategy most directly reduces traffic congestion in a city centre?",
    options: [
      ["A frequent bus rapid transit system", "Correct: buses carry many more people per vehicle than cars."],
      ["A site-and-service housing scheme", "This addresses housing, not traffic."],
      ["A new landfill site", "This addresses waste."],
      ["Upgrading an informal settlement", "This addresses housing conditions."],
    ],
    answer: "A",
    explanation: "Efficient public transport takes cars off the road.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why did Zimbabwe develop **growth points** such as Gokwe and Murambinda?",
    options: [
      ["To bring jobs and services to rural areas", "Correct: growth points tackle push factors."],
      ["To build new high-density suburbs on the edge of Harare", "Growth points are rural centres, not suburbs."],
      ["To replace the central business district of Bulawayo", "They were not designed to replace city centres."],
      ["To create green belts round Harare", "Green belts are protected open land."],
    ],
    answer: "A",
    explanation: "Growth points decentralise development to rural areas.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which town was developed south of Harare largely to house people who work in Harare?",
    options: [
      ["Chitungwiza", "Correct: it is a satellite (largely dormitory) town of Harare."],
      ["Kariba", "Kariba is a resort and HEP town on the Zambezi."],
      ["Hwange", "Hwange is a coal-mining town in the north-west."],
      ["Beitbridge", "Beitbridge is a border town on the Limpopo."],
    ],
    answer: "A",
    explanation: "Chitungwiza grew as a satellite town for Harare workers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which feature of Curitiba, Brazil, is an example of sustainable urban transport?",
    options: [
      ["Bus rapid transit with dedicated lanes", "Correct: fast, high-capacity buses reduce car use."],
      ["New motorways through the city centre", "Motorways encourage more car use."],
      ["Free parking for all cars in the CBD", "Free parking encourages car use."],
      ["Banning all public buses", "This would increase car use."],
    ],
    answer: "A",
    explanation: "Curitiba's BRT is a well-known sustainable transport scheme.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Where do the residents of the new town work?"],
    stem: "A satellite town was built 25 km from a capital city, but almost all its residents still work in the capital. What problem is most likely?",
    options: [
      ["Long, costly commuting and congestion on the main road", "Correct: it has become a dormitory town."],
      ["A shortage of workers in the satellite town's factories", "Few factories exist there, so this is unlikely."],
      ["Rapid loss of population from the satellite town", "People still live there; the issue is commuting."],
      ["Falling land values in the capital's CBD", "Commuting into the CBD keeps demand high."],
    ],
    answer: "A",
    explanation: "Without local jobs, satellite towns generate commuter traffic.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Consider who can afford each option."],
    stem: "Which is the main weakness of site-and-service schemes for the poorest urban families?",
    options: [
      ["They may still be unable to afford the plot and building materials", "Correct: costs can exclude the poorest."],
      ["The plots have no water or sewer connections", "Providing these services is the point of the scheme."],
      ["Families are not allowed to build their own houses", "Self-building is part of the scheme."],
      ["The schemes are always located in the central business district", "They are usually on the edge of the town."],
    ],
    answer: "A",
    explanation: "Affordability limits who benefits.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Recycling can reduce the amount of waste sent to landfill and create jobs.",
    answer: true,
    explanation: "True. Recycling reduces landfill and supports collectors and processors.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Building more roads always reduces traffic congestion permanently.",
    answer: false,
    explanation: "False. New roads often attract more traffic; public transport and planning are also needed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each urban problem with a suitable management strategy.",
    pairs: [
      ["Housing shortage", "Site-and-service schemes"],
      ["Traffic congestion", "Bus rapid transit"],
      ["Urban sprawl", "Green belt"],
      ["Waste on the streets", "Regular collection and recycling"],
    ],
    explanation: "Each strategy targets one problem.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A satellite town whose residents mostly work in the main city is called a {{blank:a}} town. A city that uses sensors and data to manage traffic and energy is a {{blank:b}} city.",
    blanks: [
      { id: "a", accepted: ["dormitory"], choices: ["dormitory", "market", "mining", "border"] },
      { id: "b", accepted: ["smart"], choices: ["smart", "primate", "compact", "garden"] },
    ],
    explanation: "Dormitory towns house commuters; smart cities use digital technology.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A bus carries 120 passengers. Cars in a fictional city carry an average of 1.5 people (fictional data). How many cars would be needed to carry the same number of people as one full bus?",
    value: 80, tol: 0,
    wrong: [180, 121.5],
    explanation: "120 ÷ 1.5 = 80 cars.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Find the total cost first.", "Divide by the number of plots."],
    stem: "A fictional site-and-service scheme of 2,500 plots costs US\\$ 3,000,000 for roads and US\\$ 4,500,000 for water and sewer pipes (fictional data). Calculate the cost per plot in US dollars.",
    value: 3000, tol: 0,
    wrong: [1200, 1800],
    workedSolution: "1. Total = 3,000,000 + 4,500,000 = US\\$ 7,500,000.\n2. Per plot = 7,500,000 ÷ 2,500 = US\\$ 3,000.",
    explanation: "US\\$ 7,500,000 ÷ 2,500 = US\\$ 3,000 per plot.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Suggest **four** solutions to the problems caused by rapid urbanisation, linking each to a problem.",
    points: [
      "Housing shortage: site-and-service or low-cost housing schemes.",
      "Congestion: better public transport (buses, commuter trains) / ring roads.",
      "Water and sanitation: repair and expand treatment works and sewers / boreholes.",
      "Waste: regular collection and recycling / migration: growth points and rural development.",
    ],
    modelAnswer: "Site-and-service schemes ease the housing shortage. More buses and commuter trains reduce congestion. Expanding water treatment works and repairing sewers reduce disease. Regular refuse collection and recycling keep streets clean.",
    explanation: "Each solution must match a problem.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["Give advantages and limitations, then judge."],
    stem: "Evaluate satellite towns as a way of managing the growth of a large city.",
    points: [
      "Advantage: relieve housing pressure and overcrowding in the main city.",
      "Advantage: can attract industry and services, spreading jobs.",
      "Limitation: often become dormitory towns, causing long commutes and congestion.",
      "Judgement: successful only if jobs and services are provided locally (e.g. Chitungwiza).",
    ],
    modelAnswer: "Satellite towns house many people and relieve overcrowding in the main city, and they can attract factories and shops. But if jobs stay in the city, like many in Chitungwiza, residents face long, expensive commutes and the main roads become congested. They work best when local jobs and services are provided.",
    explanation: "Weigh both sides and judge.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Causes, challenges, opportunities, management, then evaluation.", "Use real place names in your city."],
    stem: "For a named urban area, describe the challenges caused by its growth and evaluate the strategies used to manage it.",
    points: [
      "Names the urban area (e.g. Harare) and the causes of growth.",
      "Challenges: housing shortage, unplanned settlements (e.g. Epworth, Caledonia).",
      "Challenges: water supply and pollution of Lake Chivero, cholera, waste, congestion, unemployment.",
      "Strategy: site-and-service and upgrading; benefits and limits.",
      "Strategy: satellite towns (Chitungwiza, Norton, Ruwa) and growth points; benefits and limits.",
      "Strategy: transport regulation and buses / water and sewer rehabilitation / recycling; benefits and limits.",
      "Overall judgement on success with reasons (funding, scale, maintenance, participation).",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Harare has grown rapidly since 1980 through rural-urban migration and natural increase. Housing is short, so many people rent rooms or live in backyard shacks and unplanned settlements such as parts of Epworth and Caledonia. Water treatment and sewers are overloaded, Lake Chivero is polluted, and cholera outbreaks in 2008-09 and 2018 followed. Refuse collection is irregular and roads are congested. Site-and-service schemes have provided many serviced plots, but not enough to clear the waiting list and some are unaffordable for the poorest. Upgrading in Epworth gives residents security and services without moving them, but it is slow and depends on funding. Satellite towns such as Chitungwiza have housed large numbers but created long commutes. Rehabilitation of water works and boreholes has helped some suburbs, but supply still falls short. Overall the strategies have reduced some problems but have not kept pace with growth, mainly because of limited funding and maintenance.",
    explanation: "Case study detail, evaluation of several strategies and a judgement.",
  });
  b.struct({
    d: 3, skill: "EVALUATION", secs: 600,
    stem: "A fictional city council has US\\$ 20 million to spend. It is considering three projects (fictional data).\n\n| Project | Cost (US\\$ million) | Main benefit | People helped |\n|---|---|---|---|\n| P: bus rapid transit corridor | 18 | Faster, cheaper commuting | 90,000 daily passengers |\n| Q: site-and-service plots | 12 | 4,000 serviced plots | about 20,000 residents |\n| R: sewer repairs in old high-density suburbs | 8 | Fewer sewage overflows | about 150,000 residents |",
    hints: ["Check which combinations fit the budget.", "Compare cost per person helped."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which combination of projects can the council afford within its budget?",
        options: [
          ["Q and R", "Correct: 12 + 8 = US\\$ 20 million."],
          ["P and Q", "18 + 12 = US\\$ 30 million is over budget."],
          ["P and R", "18 + 8 = US\\$ 26 million is over budget."],
          ["P, Q and R", "38 million is far over budget."],
        ],
        answer: "A", explanation: "Only Q and R together fit the US\\$ 20 million budget.",
      }),
      P.num({ label: "(b)", stem: "Calculate the cost per plot of Project Q in US dollars.", value: 3000, wrong: [333, 600], explanation: "12,000,000 ÷ 4,000 = US\\$ 3,000." }),
      P.manual({
        label: "(c)", marks: 4, stem: "Recommend which project(s) the council should choose. Justify your answer.",
        points: ["Clear recommendation (e.g. Q and R together, as they fit the budget).", "R helps the most people (150,000) at the lowest cost, reducing disease.", "Q provides housing for about 20,000 people, easing the shortage.", "Recognises the trade-off: P would help commuters but uses most of the budget alone."],
        modelAnswer: "The council should choose Q and R, which together cost exactly US\\$ 20 million. Sewer repairs help about 150,000 people for only US\\$ 8 million and reduce cholera risk, while the plots house about 20,000 people. The bus corridor would help commuters but would use almost the whole budget.",
        explanation: "Justify with data and acknowledge what is lost.",
      }),
    ],
    explanation: "This item practises evaluating urban management options with data.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 480,
    stem: "Table 1 shows average journey times into a fictional city centre before and after a bus rapid transit (BRT) line opened (fictional data).\n\n| Mode | Before BRT (minutes) | After BRT (minutes) |\n|---|---|---|\n| Car | 55 | 48 |\n| Ordinary bus | 70 | 66 |\n| BRT bus | — | 35 |",
    hints: ["Subtract to find the time saved."],
    parts: [
      P.num({ label: "(a)", unit: "min", stem: "How many minutes faster is the BRT bus than a car after the BRT opened?", value: 13, wrong: [20, 7], explanation: "48 − 35 = 13 minutes." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage fall in car journey time. Give your answer to one decimal place.", value: 12.727, answer: "12.7", tol: 0.05, wrong: [14.6, 7], explanation: "(55 − 48) ÷ 55 × 100 = 12.7%." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest why car journeys also became faster after the BRT opened.",
        points: ["Some drivers switched to the BRT, so fewer cars were on the road.", "Less congestion at junctions and in the CBD.", "Dedicated bus lanes removed buses from the general traffic lanes / fewer buses stopping in traffic."],
        modelAnswer: "Some commuters left their cars and used the faster BRT, so there were fewer cars on the roads. The buses also ran in their own lanes, so they no longer blocked other traffic at stops.",
        explanation: "Link modal shift to reduced congestion.",
      }),
    ],
    explanation: "This item practises evaluating a transport strategy with data.",
  });

  b.card("DEFINITION", "Site-and-service scheme", "Authorities provide plots with roads, water and sewers; families build their own houses.");
  b.card("DEFINITION", "Satellite town", "A town built away from a large city to relieve pressure on it; a dormitory town if most residents commute to the city.");
  b.card("DEFINITION", "Green belt", "Protected open land around a city where building is restricted to stop sprawl.");
  b.card("DEFINITION", "Sustainable city", "A city meeting present needs without harming the environment or future residents: public transport, renewables, recycling, green space.");
  b.card("CONCEPT", "Evaluating an urban strategy", "Who benefits? Cost and maintenance? Scale? Sustainability? Community participation?");
  b.card("FACT", "Growth points in Zimbabwe", "Rural service centres (e.g. Gokwe, Murambinda) developed since the 1980s to reduce migration to big cities.", undefined, { applies: ZIM });
  b.card("FACT", "Curitiba, Brazil", "Bus rapid transit with dedicated lanes, parks on flood-prone land, recycling and a 'green exchange' scheme.", undefined, { applies: CAM });
  b.card("FACT", "Managing Harare", "Site-and-service schemes, upgrading in Epworth, satellite towns (Chitungwiza, Norton, Ruwa), bus and kombi regulation, water works rehabilitation.");
  b.card("VOCABULARY", "Bus rapid transit (BRT)", "High-capacity buses in dedicated lanes with raised stations for fast boarding.");
});
