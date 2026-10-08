// Slice G2c: environmental management, legislation and international agreements (ZIMSEC 7.8.1).
import { concept, P, geographyLevels } from "../lib.mjs";

const OFFENCES = "**Table 1: Environmental offences recorded in a fictional rural district in one year (fictional data)**\n\n| Offence | Cases reported | Cases that ended in a fine |\n|---|---|---|\n| Starting veld fires | 120 | 18 |\n| Illegal sand abstraction | 45 | 27 |\n| Streambank cultivation | 60 | 6 |\n| Illegal dumping of waste | 75 | 30 |";

const SITES = "**Descriptions of two hillsides recorded by a Form 3 class (fictional sites)**\n\n- **Site P**, inside a national park: dense miombo woodland with tall grass, a clear stream flowing over rocks, many birds and antelope, no houses or fields.\n- **Site Q**, in a communal area near a business centre: a few scattered tree stumps, bare ground with three gullies up to 2 m deep, cattle tracks running downhill, plastic bags and bottles near the shops, and a stream whose bed is filled with sand.";

concept("geo.environment.management-laws", { file: "environment/management-laws", keyPrefix: "environment.management-laws" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Zimbabwean institution allocates water permits and manages the country's dams?",
    options: [
      ["ZINWA", "Correct: the Zimbabwe National Water Authority manages water resources under the Water Act."],
      ["ZimParks", "ZimParks manages national parks and wildlife."],
      ["The Forestry Commission", "The Forestry Commission manages forests and timber."],
      ["The Zimbabwe Republic Police", "The police enforce criminal law; they do not manage water."],
    ],
    answer: "A",
    explanation: "The **Zimbabwe National Water Authority (ZINWA)** works with catchment councils to allocate and manage water.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which international agreement deals with the conservation of **wetlands**?",
    options: [
      ["The Ramsar Convention", "Correct: signed in 1971 at Ramsar in Iran."],
      ["The Montreal Protocol", "The Montreal Protocol protects the ozone layer."],
      ["CITES", "CITES controls trade in endangered species."],
      ["The Kyoto Protocol", "The Kyoto Protocol set greenhouse-gas targets."],
    ],
    answer: "A",
    explanation: "The **Ramsar Convention** promotes the wise use of wetlands. Mana Pools and Monavale Vlei are among Zimbabwe's listed sites.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main aim of the **Montreal Protocol** (1987)?",
    options: [
      ["To phase out chemicals that destroy the ozone layer", "Correct: it controls CFCs and other ozone-depleting substances."],
      ["To ban the trade in elephant ivory", "Trade in endangered species is controlled by CITES."],
      ["To stop hazardous waste being dumped in Africa", "That is the aim of the Bamako Convention."],
      ["To protect wetlands of international importance", "That is the aim of the Ramsar Convention."],
    ],
    answer: "A",
    explanation: "The Montreal Protocol phased out CFCs (once used in fridges and aerosols) and similar chemicals that thin the ozone layer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is the best example of a **pristine** environment?",
    options: [
      ["Undisturbed woodland deep inside a national park", "Correct: it remains in its natural state with little human change."],
      ["A hillside with gullies caused by overgrazing", "Gullies show the land has been degraded."],
      ["An abandoned open-cast mine pit", "Mining has greatly changed this land."],
      ["A river below a town's sewage works", "Pollution means this river is degraded."],
    ],
    answer: "A",
    explanation: "A **pristine** environment is still in, or very close to, its natural state. The other three have been degraded by human activity.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which agreement **bans** the import of hazardous waste into African countries?",
    options: [
      ["The Bamako Convention", "Correct: the African agreement of 1991."],
      ["The Basel Convention", "Basel is a global agreement that controls, rather than bans, movements of hazardous waste."],
      ["The UNFCCC", "The UNFCCC deals with climate change."],
      ["The Ramsar Convention", "Ramsar deals with wetlands."],
    ],
    answer: "A",
    explanation: "African countries negotiated the **Bamako Convention** because they felt the global Basel Convention did not go far enough to stop waste being shipped to Africa.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did declaring a forest **sacred** help to conserve it?",
    options: [
      ["Cutting trees and hunting there were forbidden, so it acted as a reserve", "Correct: traditional rules protected the trees and animals."],
      ["The trees in sacred forests grew faster than other trees", "Tree growth does not depend on a forest's status."],
      ["Sacred forests received higher rainfall than other areas", "Rainfall does not depend on a forest's status."],
      ["Only the government could enter sacred forests", "Sacred sites were controlled by traditional leaders and custom, not government."],
    ],
    answer: "A",
    explanation: "Sacred sites, enforced by chiefs and spirit mediums, worked like small nature reserves: people feared punishment or bad luck if they cut trees or hunted there.",
    hints: ["Think about what people were not allowed to do there."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do fines often fail to stop illegal gold panning in river beds?",
    options: [
      ["Panners can earn more than the fine, and few are caught", "Correct: low fines and weak enforcement make the risk worth taking."],
      ["Gold panning does no lasting damage to rivers or banks", "Panning damages river banks and adds silt and mercury."],
      ["No law in Zimbabwe controls gold panning", "Environmental and mining laws do control it."],
      ["Fines for panning are always paid by the government", "Fines are paid by the offenders themselves."],
    ],
    answer: "A",
    explanation: "When the income from an illegal activity is high, fines are low, inspectors are few and people have no other livelihood, laws alone do not stop the activity.",
    hints: ["Compare the fine with what a panner can earn."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a **disadvantage** to Zimbabwe of following the rules of CITES?",
    options: [
      ["Restrictions stop it selling stockpiled ivory for income", "Correct: Zimbabwe has argued that ivory sales could fund conservation."],
      ["CITES lets countries share information on smuggling", "Sharing information to stop smuggling is an advantage."],
      ["CITES helps stop poachers selling animal products abroad", "Reducing illegal trade is an advantage."],
      ["CITES improves Zimbabwe's reputation in tourism markets", "A better reputation is an advantage."],
    ],
    answer: "A",
    explanation: "Domesticating treaties brings cooperation and support, but can limit economic activities. CITES restrictions on ivory trade prevent the sale of stockpiles that Zimbabwe says could pay for conservation.",
    hints: ["Look for the option that costs Zimbabwe something."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Environmental Management Agency (EMA) was set up under the Environmental Management Act.",
    answer: true,
    explanation: "True. The Environmental Management Act (Chapter 20:27) created EMA to protect the environment and enforce the Act.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The Kyoto Protocol is an agreement to protect wetlands.",
    answer: false,
    explanation: "False. The Kyoto Protocol (1997) set targets for cutting greenhouse-gas emissions under the UNFCCC. Wetlands are protected by the **Ramsar Convention**.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the institution responsible for each task.",
    template: "Permits to use river water are issued by {{blank:a}}. National parks and wildlife are managed by {{blank:b}}. Licences to cut timber in state forests are issued by {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["ZINWA"], choices: ["ZINWA", "ZimParks", "the Forestry Commission", "EMA"] },
      { id: "b", accepted: ["ZimParks"], choices: ["ZINWA", "ZimParks", "the Forestry Commission", "EMA"] },
      { id: "c", accepted: ["the Forestry Commission"], choices: ["ZINWA", "ZimParks", "the Forestry Commission", "EMA"] },
    ],
    wrong: [["EMA", "ZINWA", "ZimParks"]],
    explanation: "ZINWA manages water, ZimParks manages parks and wildlife, the Forestry Commission manages forests, and EMA oversees the environment as a whole.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each international agreement with its purpose.",
    pairs: [
      ["CITES", "Controls trade in endangered species"],
      ["Montreal Protocol", "Protects the ozone layer"],
      ["Basel Convention", "Controls movements of hazardous waste between countries"],
      ["UNFCCC", "Framework for action on climate change"],
    ],
    explanation: "CITES (1973) controls wildlife trade; the Montreal Protocol (1987) protects the ozone layer; the Basel Convention (1989) controls hazardous waste movements; the UNFCCC (1992) is the framework for climate action.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the authority that manages Zimbabwe's national parks under the Parks and Wild Life Act.",
    accepted: ["ZimParks", "Zim Parks", "Zimbabwe Parks and Wildlife Management Authority", "Parks and Wildlife Management Authority", "Zimbabwe Parks and Wild Life Management Authority", "Parks and Wildlife Authority"],
    wrong: ["EMA"],
    explanation: "The **Zimbabwe Parks and Wildlife Management Authority (ZimParks)** manages national parks and other protected areas and fights poaching.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional district, 160 cases of starting veld fires were reported in one year, but only 24 offenders were fined. Calculate the percentage of reported cases that ended in a fine.",
    value: 15, unit: "%", tol: 0.1,
    wrong: [85, 6.7],
    explanation: "24 ÷ 160 × 100 = 15 %.",
    workedSolution: "1. Fraction fined = 24 ÷ 160 = 0.15.\n2. Percentage = 0.15 × 100 = 15 %.",
    hints: ["Divide the number fined by the number reported, then multiply by 100."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Describe **three** ways in which indigenous knowledge systems helped to conserve the environment.",
    points: [
      "Sacred forests, hills or pools where cutting trees, hunting or fishing was forbidden.",
      "Taboos, e.g. against cutting fruit trees or drawing water from springs with dirty or blackened containers.",
      "Totems: people did not kill or eat their totem animal / chiefs enforced rules and fined offenders.",
    ],
    modelAnswer: "Some forests, hills and pools were sacred, so no one could cut trees or hunt there. Taboos forbade cutting fruit trees or drawing water from springs with dirty or blackened pots, which protected trees and water. People did not kill their totem animal, and chiefs fined anyone who broke these rules.",
    explanation: "Three distinct practices, each linked to what it protected.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **four** challenges that reduce the effectiveness of environmental laws in Zimbabwe.",
    points: [
      "Too few inspectors, vehicles and funds, so many areas are rarely checked.",
      "Fines are low compared with the profits from illegal activities such as sand abstraction or gold panning.",
      "Poverty: people depend on firewood, panning or streambank cultivation and have no alternatives.",
      "Overlapping mandates between agencies and councils / corruption / poor public awareness of the laws.",
    ],
    modelAnswer: "EMA and other agencies have too few staff, vehicles and funds to inspect remote areas, so offences go unnoticed. Fines are often small compared with what offenders earn from sand abstraction or gold panning, so they are not a deterrent. Many offenders are poor and have no other way to earn a living or get fuel. Responsibilities overlap between agencies and councils, some officials are corrupt, and many people do not know the laws.",
    explanation: "One mark for each clearly explained challenge.",
    hints: ["Think about money and staff, size of fines, poverty and organisation."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effectiveness of environmental legislation in Zimbabwe.",
    points: [
      ["Names at least two laws with their institutions (e.g. Environmental Management Act and EMA; Water Act and ZINWA; Parks and Wild Life Act and ZimParks; Forest Act and Forestry Commission).", 1],
      ["Strength: a clear legal framework covering land, water, air and wildlife.", 1],
      ["Strength: EIAs required before major projects; licences and fines apply the polluter-pays principle.", 1],
      ["Strength: education and awareness campaigns (e.g. on veld fires, littering) with an example of success.", 1],
      ["Challenge: limited funding, staff and vehicles; weak enforcement in remote areas.", 1],
      ["Challenge: low fines, poverty and lack of alternatives (gold panning, sand abstraction, firewood).", 1],
      ["Challenge: overlapping mandates, corruption or poor awareness.", 1],
      ["Supported overall judgement (e.g. good laws on paper, partly effective in practice) with a suggested improvement.", 1],
    ],
    levels: geographyLevels(8),
    modelAnswer: "Zimbabwe has a broad set of environmental laws. The Environmental Management Act created the Environmental Management Agency (EMA), which requires environmental impact assessments before projects such as mines and dams go ahead, licenses effluent and emissions, and fines polluters. The Water Act gives ZINWA and catchment councils control over water permits, the Parks and Wild Life Act lets ZimParks manage protected areas, and the Forest Act protects state forests.\n\nThese laws have had successes. Projects can be halted until an EIA is approved, which forces developers to plan how to reduce damage. Campaigns against veld fires and littering reach schools and communities, and the 2017 ban on polystyrene food containers removed a common type of litter.\n\nHowever, enforcement is weak. EMA and ZimParks lack staff, vehicles and money, so remote areas are rarely inspected. Fines are often lower than the profits from sand abstraction or gold panning, so offenders keep working. Many offenders are poor and depend on firewood or streambank cultivation. Responsibilities sometimes overlap between agencies and councils, and corruption can allow offenders to escape.\n\nOverall, the laws are good on paper but only partly effective in practice. They would work better with higher, consistently enforced fines, more inspectors, the involvement of traditional leaders and communities, and alternative livelihoods for people who now depend on damaging activities.",
    explanation: "Level 3 answers balance strengths and challenges with examples and reach a supported judgement.",
    hints: ["Give both strengths and weaknesses.", "End with a clear judgement."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the advantages and disadvantages to Zimbabwe of domesticating international environmental treaties.",
    points: [
      ["Advantage: access to international funding, technology or expertise.", 1],
      ["Advantage: cooperation on cross-border problems (shared rivers such as the Zambezi, climate, wildlife trade, waste).", 1],
      ["Advantage: stronger national laws or international recognition (e.g. Ramsar sites).", 1],
      ["Disadvantage: costs of monitoring, reporting and meeting targets.", 1],
      ["Disadvantage: limits on economic activities (e.g. CITES ivory restrictions) or rules made mainly by richer countries.", 1],
      ["Judgement: benefits depend on enforcement and on support being provided.", 1],
    ],
    levels: geographyLevels(6),
    modelAnswer: "Domesticating treaties brings benefits. Zimbabwe can obtain funding and technology, for example for climate adaptation under the UNFCCC. Problems such as climate change, the wildlife trade and the management of the shared Zambezi cannot be solved by one country, so agreements allow joint action. Listing Mana Pools and Monavale Vlei under the Ramsar Convention brought international recognition to these wetlands.\n\nThere are also costs. Meeting obligations means paying for monitoring, reporting and new equipment. Some rules restrict economic activity: CITES restrictions prevent Zimbabwe selling stockpiled ivory that it says could fund conservation. Many treaties were shaped mainly by richer countries and may not fit local conditions.\n\nOverall, the advantages are greater when international support is actually provided and the laws are enforced at home; otherwise the treaties remain on paper.",
    explanation: "Level 3 answers discuss both sides with examples and conclude.",
    hints: ["Use named treaties as examples."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${OFFENCES}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total number of cases reported.", value: 300, wrong: [81], explanation: "120 + 45 + 60 + 75 = 300." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of all reported cases that ended in a fine.", value: 27, unit: "%", tol: 0.1, wrong: [81, 73], explanation: "Fined = 18 + 27 + 6 + 30 = 81; 81 ÷ 300 × 100 = 27 %." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which offence had the highest **proportion** of reported cases ending in a fine?", options: [
        ["Illegal sand abstraction", "Correct: 27 of 45 cases (60 %)."],
        ["Illegal dumping of waste", "30 of 75 cases is 40 %, a lower proportion."],
        ["Starting veld fires", "18 of 120 cases is only 15 %."],
        ["Streambank cultivation", "6 of 60 cases is only 10 %."],
      ], answer: "A", explanation: "Compare fined ÷ reported: sand abstraction 60 %, dumping 40 %, veld fires 15 %, streambank cultivation 10 %." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** reasons why few veld-fire cases ended in a fine.", points: [
        "It is hard to identify who started a fire, which may have spread over a large area.",
        "Fires happen in remote areas with few inspectors or witnesses / people protect neighbours.",
      ], explanation: "Problems of evidence and enforcement." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest **three** ways the district could reduce environmental offences.", points: [
        "More inspectors or community monitors, and consistent enforcement of fines.",
        "Education and awareness campaigns through schools, chiefs and the media.",
        "Alternative livelihoods or legal sand-mining sites / fireguards and fire-fighting teams.",
      ], explanation: "Enforcement, education and alternatives." }),
    ],
    hints: ["Find the proportion fined for each offence, not just the number."],
    explanation: "Practice in using data on environmental law enforcement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study the descriptions of sites P and Q.\n\n${SITES}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which site is the better example of a pristine environment?", options: [
        ["Site P", "Correct: it is close to its natural state."],
        ["Site Q", "Site Q shows gullies, litter and a silted stream: it is degraded."],
        ["Both sites equally", "The descriptions show very different levels of human impact."],
        ["Neither site", "Site P shows no signs of human damage."],
      ], answer: "A", explanation: "Site P has natural woodland, clear water and wildlife, with no sign of human damage." }),
      P.manual({ label: "(b)", marks: 2, stem: "Identify **one** sign that the land at site Q is degraded and **one** sign that the water is degraded.", points: [
        "Land: bare ground, gullies up to 2 m deep, tree stumps or plastic litter.",
        "Water: the stream bed is filled with sand (siltation).",
      ], explanation: "One land and one water indicator from the description." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how human activities have caused the degradation at site Q.", points: [
        "Trees cut (for fuelwood or fields), removing roots that bind the soil.",
        "Cattle overgrazed the grass and their tracks channelled runoff, forming gullies.",
        "Eroded soil was washed into the stream, causing siltation / litter from the shops was dumped.",
      ], explanation: "Link each activity to the evidence." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how traditional leaders and indigenous knowledge could help to restore site Q.", points: [
        "Chiefs could set and enforce rules on tree cutting, grazing or dumping, with traditional fines.",
        "Reviving taboos or setting aside a protected (sacred) area so trees can regrow.",
      ], explanation: "Use of traditional authority and customs." }),
    ],
    hints: ["Use evidence from the descriptions in every answer."],
    explanation: "Practice in recognising pristine and degraded environments.",
  });
  b.card("DEFINITION", "Environmental management", "Planning and controlling resource use and human activities to protect the environment for present and future generations.");
  b.card("CONCEPT", "Pristine v degraded environment", "Pristine: still in its natural state. Degraded: quality reduced by human activity (erosion, pollution, mining).");
  b.card("CONCEPT", "Indigenous knowledge systems", "Sacred sites, taboos, totems and rules enforced by chiefs that protected trees, water and animals.");
  b.card("FACT", "EMA", "Environmental Management Agency, set up under the Environmental Management Act (Chapter 20:27): EIAs, pollution licences, fines.");
  b.card("FACT", "ZINWA and catchment councils", "Manage water under the Water Act; seven catchments: Gwayi, Manyame, Mazowe, Mzingwane, Runde, Sanyati, Save.");
  b.card("FACT", "ZimParks and the Forestry Commission", "ZimParks: national parks and wildlife (Parks and Wild Life Act). Forestry Commission: state forests and timber (Forest Act).");
  b.card("VOCABULARY", "Domestication of a treaty", "Turning an international agreement into national law so that it can be enforced at home.");
  b.card("FACT", "Key environmental treaties", "Ramsar 1971 (wetlands), CITES 1973 (wildlife trade), Montreal 1987 (ozone), Basel 1989 and Bamako 1991 (hazardous waste), UNFCCC 1992, Kyoto 1997.");
  b.card("CONCEPT", "Why environmental laws are hard to enforce", "Few staff and funds, low fines, poverty and lack of alternatives, overlapping mandates, corruption, low awareness.");
});
