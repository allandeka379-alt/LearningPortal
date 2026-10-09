// Slice W1a: land tenure and land reform in Zimbabwe (ZIMSEC only). Neutral, factual, no statistics.
import { concept, P, table, agricultureLevels } from "../lib.mjs";

const FARMERS = [
  ["Farmer K", "Communal area", "Field allocated by the village head", "Shares grazing with the village"],
  ["Farmer L", "Commercial farm", "Bought the farm; holds a title deed", "Own fenced paddocks"],
  ["Farmer M", "Resettlement area", "Plot allocated under a government permit", "Shares grazing with other settlers"],
];

concept("agri.land.land-tenure", { file: "land/land-tenure", keyPrefix: "land.land-tenure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **land tenure**?",
    options: [
      ["The system of rights under which land is held and used", "Correct: tenure covers who controls land, for how long and what the holder may do with it."],
      ["The physical features of the land, such as slope and altitude", "This is topography."],
      ["The amount of crop harvested from each hectare of land", "This is yield."],
      ["The process of dividing a farm into fields and paddocks", "This is farm planning (farm layout)."],
    ],
    answer: "A",
    explanation: "Land tenure is the set of rules and rights by which land is held: freehold, leasehold, communal and resettlement tenure are the systems in Zimbabwe.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under which tenure system does the holder have a **title deed** and may sell the land?",
    options: [
      ["Freehold", "Correct: a freehold owner holds a title deed and may sell, mortgage or pass on the land."],
      ["Communal", "Communal land is vested in the state; families have only the right to use it."],
      ["Leasehold", "A lessee rents the land for a period; it belongs to someone else."],
      ["Resettlement under a permit", "A permit gives the right to use state land; it is not ownership."],
    ],
    answer: "A",
    explanation: "Freehold tenure is private ownership with a title deed, held permanently.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who allocates arable land to households in a communal area of Zimbabwe?",
    options: [
      ["Traditional leaders together with the rural district council", "Correct: chiefs, headmen and village heads allocate land, working with the rural district council."],
      ["A commercial bank, in return for a mortgage", "Banks lend money; they do not allocate communal land."],
      ["The Grain Marketing Board, according to past deliveries", "The GMB buys and stores grain; it does not allocate land."],
      ["The household that farmed the plot first, by sale", "Communal land cannot be sold."],
    ],
    answer: "A",
    explanation: "Communal land is vested in the state and allocated by traditional leaders (chiefs, headmen, village heads) together with the rural district council.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do communal farmers often find it hard to get a bank loan to develop their land?",
    options: [
      ["They have no title deed to offer as collateral", "Correct: without a title deed there is no security the bank can hold."],
      ["Communal land is always too dry for farming", "Communal areas are found in all natural regions; dryness is not the reason."],
      ["Banks are not allowed to lend money to farmers", "Banks do lend to farmers when they have security."],
      ["Communal farmers are not allowed to grow cash crops", "Communal farmers may grow cash crops such as cotton and tobacco."],
    ],
    answer: "A",
    explanation: "Communal farmers have the right to use land but no title deed, so they cannot mortgage it. This limits borrowing and long-term investment.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which law of 1930 divided the land of the colony into separate areas for European and African occupation?",
    options: [
      ["The Land Apportionment Act", "Correct: the Land Apportionment Act of 1930 divided land along racial lines."],
      ["The Land Acquisition Act", "The Land Acquisition Act was passed after independence, in 1992."],
      ["The Native Land Husbandry Act", "This act of 1951 tried to control land use and stock numbers in the reserves."],
      ["The Fast Track Land Reform Programme", "This programme began in 2000; it is not a colonial law."],
    ],
    answer: "A",
    explanation: "The Land Apportionment Act (1930) set aside separate European and African areas; Africans were moved into reserves, many of them in drier, less fertile areas.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes the **A1** resettlement model?",
    options: [
      ["Small-scale plots that relieve crowded communal areas", "Correct: A1 gives smaller plots, often villagised with shared grazing, to families with little or no land."],
      ["Large self-contained commercial farms held on long leases", "This describes the A2 model."],
      ["Private farms bought with a title deed from the state", "Resettlement land is state land held under permits or leases, not freehold."],
      ["Land set aside for national parks and safari areas", "This is a protected area, not a resettlement model."],
    ],
    answer: "A",
    explanation: "A1 aims to decongest communal areas and give land to the landless; plots are small-scale, either villagised or self-contained. A2 creates commercial farms.",
    hints: ["One model is about relieving congestion; the other is about commercial farming."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Shared grazing land in a communal area is often overgrazed. Which feature of communal tenure best explains this?",
    options: [
      ["No single user benefits from limiting his own herd", "Correct: each owner gains from adding animals, but the cost of overgrazing is shared by all."],
      ["The grazing land has a title deed held by the chief", "Communal land has no title deed; it is vested in the state."],
      ["The land is leased for a short period at a high rent", "Communal land is not leased or rented."],
      ["Fences divide the grazing into private paddocks", "Communal grazing is usually unfenced and shared."],
    ],
    answer: "A",
    explanation: "When grazing is shared and unfenced, each owner gains from keeping more animals while the damage is spread over everyone, so herds grow beyond the carrying capacity.",
    hints: ["Who loses when one family adds more cattle to shared grazing?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A settler holds a resettlement plot under a permit. Which change would most likely encourage her to invest in a borehole and an orchard?",
    options: [
      ["Longer, more secure tenure that lenders accept", "Correct: secure tenure lets her borrow and assures her she will benefit from long-term investments."],
      ["Shorter permits renewed by the authorities each year", "Short, uncertain tenure discourages long-term investment."],
      ["Sharing her plot with two more families", "Smaller plots reduce the return on investment."],
      ["A rule forbidding her from growing cash crops", "This would lower her income and her ability to invest."],
    ],
    answer: "A",
    explanation: "Farmers invest in boreholes, fences, orchards and conservation works when tenure is secure for long enough to benefit, and when it can be used to raise credit.",
    hints: ["Think about security and access to credit."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under communal tenure a family may sell its arable land to another family.",
    answer: false,
    explanation: "False. Communal land is vested in the state. Families have the right to use it, but they may not sell it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Before colonial rule, land in Zimbabwe was held by the community and allocated to families by the chief.",
    answer: true,
    explanation: "True. The chief acted as custodian on behalf of the ancestors and allocated land through headmen; land could not be sold.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tenure system with its description.",
    pairs: [
      ["Freehold", "Permanent private ownership with a title deed"],
      ["Leasehold", "Use of another owner's land for a fixed period in return for rent"],
      ["Communal", "State land allocated by traditional leaders; grazing shared"],
      ["Resettlement", "State-acquired land allocated to settlers under permits or leases"],
    ],
    explanation: "The systems differ in who holds the land, for how long and whether it can be sold or used as collateral.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "The Fast Track Land Reform Programme began in {{blank:a}}. The {{blank:b}} model was designed to create indigenous commercial farmers.",
    blanks: [
      { id: "a", accepted: ["2000"], choices: ["1930", "1980", "2000", "2019"] },
      { id: "b", accepted: ["A2"], choices: ["A1", "A2"] },
    ],
    explanation: "Fast-track land reform started in 2000. A1 is small-scale resettlement; A2 is commercial resettlement.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the document that proves private (freehold) ownership of a piece of land.",
    accepted: ["title deed", "title deeds", "a title deed", "deed of title"],
    wrong: ["permit", "lease"],
    explanation: "A title deed proves freehold ownership and can be used as collateral for a loan.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year did Zimbabwe gain independence, after which the first resettlement programme began?",
    accepted: ["1980"],
    wrong: ["1965", "2000"],
    explanation: "Zimbabwe became independent in 1980. In the 1980s land was bought for resettlement on a willing-buyer, willing-seller basis.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why land is regarded as a national heritage in Zimbabwe.",
    points: [
      "Land is the base of food production, jobs and the economy.",
      "Explains that the nation's food security and livelihoods depend on it.",
      "Land holds ancestral graves, shrines and sacred sites / is tied to identity.",
      "Explains that it links families and communities to their history and culture, so it must be kept for future generations.",
    ],
    modelAnswer: "Land is the base of farming, mining and other work, so the country's food and income depend on it. It also holds ancestral graves and sacred sites, which give people their identity and link them to their history, so it must be protected for future generations.",
    explanation: "Each reason earns a mark, and a second mark for explaining why it matters.",
    hints: ["Think of economic reasons and cultural reasons."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** reasons for land reform in Zimbabwe after independence.",
    points: [
      "To correct the unequal distribution of land inherited from the colonial period.",
      "To decongest overcrowded communal areas.",
      "To give land to the landless and poor families.",
      "To create indigenous commercial farmers / bring under-used land into production.",
    ],
    modelAnswer: "To correct the unequal land distribution of the colonial period; to relieve overcrowding in communal areas; to give land to landless families; to create indigenous commercial farmers and use under-used land.",
    explanation: "One mark for each distinct reason.",
    hints: ["Think about fairness, congestion, the landless and production."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Describe **two** benefits and **two** problems that have been recognised since the land reform programme.",
    points: [
      "Benefit: many more families gained access to land.",
      "Benefit: congestion in some communal areas was reduced / ownership was spread more widely / new farmers entered cash crops.",
      "Problem: many new farmers lacked capital, equipment, inputs or skills, so production on some farms fell.",
      "Problem: permits/leases not always accepted as collateral / tenure insecurity and boundary disputes / infrastructure deteriorated / farm workers lost jobs.",
    ],
    modelAnswer: "More families now have land, and crowding in some communal areas was eased. However, many new farmers lacked money, equipment and skills, so output on some farms fell, and their permits are not always accepted by banks as security, which makes borrowing difficult.",
    explanation: "A balanced answer gives both benefits and problems, stated factually.",
    hints: ["Give both sides; avoid slogans."],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2",
    stem: `Table 1 describes three fictional farmers.\n\n**Table 1**\n\n${table(["Farmer", "Area", "How the land is held", "Grazing"], FARMERS)}`,
    hints: ["Identify each tenure system first.", "Which farmer has something a bank will accept as security?"],
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "Which tenure system does farmer L hold the land under?",
        options: [
          ["Freehold", "Correct: L bought the farm and holds a title deed."],
          ["Communal", "Communal land is allocated, not bought."],
          ["Resettlement", "Resettlement land is held under a permit or lease."],
          ["Leasehold", "L owns the land; it is not rented."],
        ],
        answer: "A",
        explanation: "A title deed shows freehold ownership.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the tenure system of farmer K.",
        accepted: ["communal", "communal tenure", "communal land tenure", "communal system"],
        wrong: ["freehold"],
        explanation: "Land allocated by the village head with shared grazing is communal tenure.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why farmer L finds it easier than farmer K to get a bank loan.",
        points: ["L has a title deed that can be used as collateral / security.", "K has only the right to use the land, which cannot be mortgaged, so the bank has no security."],
        explanation: "Security of tenure and a title deed make borrowing easier.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **one** problem farmers K and M may face because their grazing is shared.",
        points: ["Overgrazing / too many animals on the shared land.", "Explains that no one controls numbers, so grass cover is lost and the soil erodes (or diseases spread between herds)."],
        explanation: "Shared, unfenced grazing is easily overstocked.",
      }),
    ],
    explanation: "Tenure decides access to credit and how land is managed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: "After independence the government of Zimbabwe carried out land reform, first by buying land and later through the Fast Track Land Reform Programme, which resettled people under the A1 and A2 models.",
    hints: ["Compare the aims, size and tenure of the two models.", "For (c), give benefits and problems, then a balanced conclusion."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe how land was held in Zimbabwe before colonial rule.",
        points: ["Land belonged to the community and was held by the chief as custodian.", "Families were allocated land to use through headmen; it could not be sold / grazing was shared."],
        explanation: "Pre-colonial tenure was communal, under the chief.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Compare the A1 and A2 resettlement models.",
        points: [
          "Aim: A1 decongests communal areas / helps the landless; A2 creates commercial farmers.",
          "Scale: A1 small-scale plots; A2 small- to large-scale commercial farms.",
          "Layout: A1 villagised or self-contained with shared grazing; A2 self-contained farms.",
          "Tenure: A1 permits; A2 leases (long leases).",
        ],
        explanation: "Each comparison point must mention both models.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss the effects of the land reform programme on agriculture in Zimbabwe.",
        points: [
          "More families gained access to land / ownership spread more widely.",
          "Congestion and pressure on some communal areas reduced.",
          "New farmers entered crops such as tobacco and maize, many supported by contract farming.",
          "Many new farmers lacked capital, equipment, inputs and skills, so production on some farms fell.",
          "Tenure insecurity / permits not accepted as collateral / boundary disputes discouraged investment; some infrastructure deteriorated; farm workers lost jobs.",
          "Balanced conclusion weighing benefits against problems (e.g. access widened, but secure tenure, credit and support decide whether farms are productive).",
        ],
        levels: agricultureLevels(6),
        explanation: "A discussion needs both benefits and problems, stated factually, with a conclusion.",
      }),
    ],
    explanation: "Land reform changed who holds land; its effects depend on capital, skills, support and secure tenure.",
  });

  b.card("DEFINITION", "Land tenure", "The system of rights under which land is held and used: who controls it, for how long and what may be done with it.");
  b.card("DEFINITION", "Freehold tenure", "Permanent private ownership with a title deed; land can be sold, leased, mortgaged or inherited.");
  b.card("DEFINITION", "Leasehold tenure", "The right to use another owner's land for a fixed period in return for rent and on agreed conditions.");
  b.card("DEFINITION", "Communal tenure", "Land vested in the state, allocated to families by traditional leaders and the RDC; arable use rights, shared grazing, no sale.");
  b.card("CONCEPT", "Why does secure tenure matter?", "A title deed or long lease can be used as collateral, and farmers invest more when they are sure to keep the land.");
  b.card("DATE", "Land Apportionment Act", "1930: divided land into separate European and African areas; Africans moved to reserves.");
  b.card("DATE", "Start of the Fast Track Land Reform Programme", "2000.");
  b.card("CONCEPT", "A1 versus A2", "A1: small-scale, decongests communal areas, permits. A2: commercial farms, settlers with skills and capital, leases.");
  b.card("CONCEPT", "Land as a national heritage", "Base of food, jobs and the economy; holds ancestral graves and sacred sites; identity; to be kept for future generations.");
});
