// W4b: tourism.impacts-management (both boards). Detailed examples: Victoria Falls and the Maldives (facts kept general; no invented statistics).
// Items about the two named examples are tagged CAM (detailed specific examples); Zimbabwe planning/marketing items are tagged ZIM.
// Computed: capacity 2 400/4 = 600, x 8 h = 4 800, excess 1 200; retained 60, leakage 40, emissions 100 000 t; viewpoint 3 000/5 = 600, x6 = 3 600, excess 900; leakage share 60%.
import { concept, P, geographyLevels, chk, sum, CAM, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const cap1 = chk(2400 / 4, 600, 1e-9);
const capDay = chk(cap1 * 8, 4800, 1e-9);
const excess = chk(6000 - capDay, 1200, 1e-9);
const retained = chk(100 * (1 - 0.4), 60, 1e-9);
const leak = chk(100 * 0.4, 40, 1e-9);
const em = chk(40000 * 2.5, 100000, 1e-9);
const v1 = chk(3000 / 5, 600, 1e-9);
const vDay = chk(v1 * 6, 3600, 1e-9);
const vEx = chk(4500 - vDay, 900, 1e-9);
const SP = [["Imported food and drink", 22], ["Fees and wages of foreign staff", 18], ["Profits sent abroad", 20], ["Local wages", 15], ["Local suppliers", 10], ["Taxes paid to government", 15]];
chk(sum(SP.map((s) => s[1])), 100);
const leakPct = chk(22 + 18 + 20, 60);
const retPct = chk(15 + 10 + 15, 40);
const retUS = chk(1000 * (retPct / 100), 400, 1e-9);
const ST = tbl(["Where the tourist's spending goes", "Share of spending (%)"], SP);

concept("ageo.tourism.impacts-management", { file: "tourism/impacts-management", keyPrefix: "tourism.impacts-management" }, (b) => {
  mc(b, 1, "RECALL", "What is meant by the carrying capacity of a tourist site?", [
    ["The most visitors it can hold without unacceptable damage", "Correct: beyond this level the environment or experience suffers."],
    ["The total number of rooms available in all the hotels near the site", "That is accommodation supply."],
    ["The weight a bridge can carry at one time", "That is an engineering limit."],
    ["The number of visitors who return each year", "That is repeat visits."],
  ], "**Carrying capacity** is the limit before damage or harm to the experience.");
  mc(b, 2, "UNDERSTANDING", "What is leakage in tourism?", [
    ["Tourist spending that leaves the host area, such as profits sent abroad", "Correct: the host area does not keep this money."],
    ["Water that escapes from pipes at a hotel", "That is a different meaning of leakage."],
    ["A fall in tourist numbers during the low season each year", "That is seasonality."],
    ["Money paid to local guides and craft sellers", "That stays in the host area."],
  ], "**Leakage** is the part of spending that leaves the local economy.");
  mc(b, 2, "UNDERSTANDING", "Which is an environmental impact of tourism on coral islands such as the Maldives?", [
    ["Damage to reefs from anchors, dredging and visitors", "Correct: reefs are fragile."],
    ["A fall in the amount of salt in the sea around the islands", "Tourism does not cause this."],
    ["An increase in the number of mountains", "Tourism does not create mountains."],
    ["A rise in the depth of the ocean floor", "Tourism does not change this."],
  ], "Coral reefs are **damaged** by anchors, dredging and visitors.");
  mc(b, 3, "APPLICATION", "Which measure would best reduce leakage from a beach resort?", [
    ["Buying food from local farms and training local staff for management jobs", "Correct: more of the spending stays in the area."],
    ["Importing all food and employing only foreign managers and staff", "This increases leakage."],
    ["Sending all profits to the owner's home country", "This is leakage."],
    ["Closing the resort for most of the year", "This reduces jobs and income."],
  ], "Local supply and employment **keep spending in the area**.", { hints: ["Look for the option that keeps money inside the host area."] });
  mc(b, 3, "ANALYSIS", "Why is a long-haul holiday often criticised in debates about sustainable tourism?", [
    ["Flights release large amounts of greenhouse gas per passenger", "Correct: air travel has a high carbon cost."],
    ["Long-haul tourists never spend any money", "They often spend more."],
    ["Aircraft reduce the carbon dioxide in the air", "Aircraft add carbon dioxide."],
    ["Long-haul destinations have no fragile environments that need protecting", "They often have fragile environments."],
  ], "Flights add **greenhouse gases**.", { hints: ["Think about fuel and distance."] });
  mc(b, 4, "EVALUATION", "A site can hold 4 800 visitors a day but 6 000 arrive on peak days. Which management response is most suitable?", [
    ["Timed tickets and extra viewing points to spread visitors", "Correct: this reduces crowding while keeping the site open."],
    ["Allowing unlimited entry at all times because visitors bring income", "This ignores damage and quality."],
    ["Closing the site permanently to all visitors", "This removes the benefits of tourism."],
    ["Doubling the entrance fee for local residents only", "This does not address the number of visitors."],
  ], "Spread visitors in **time and space**.", { hints: ["Which option deals with the peak without closing the site?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Sustainable tourism tries to meet the needs of visitors and hosts without harming future generations.", answer: true,
    feedbackTrue: "Correct: that is the idea of sustainability.",
    feedbackFalse: "Not so: sustainability looks after future as well as present needs.",
    explanation: "Sustainable tourism considers future generations as well as present visitors and hosts." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "All the money tourists spend at an all-inclusive foreign-owned resort stays in the host community.", answer: false,
    feedbackFalse: "Correct: profits and imported goods cause leakage.",
    feedbackTrue: "Not so: much of the spending leaves the area.",
    explanation: "Leakage means a large part of the spending leaves the host area." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The Maldives is made up of coral {{blank:a}} grouped in atolls. Tourism there is heavily dependent on {{blank:b}} travel from other continents.",
    blanks: [
      { id: "a", accepted: ["islands"], choices: ["islands", "mountains", "lakes"] },
      { id: "b", accepted: ["air"], choices: ["air", "rail", "camel"] },
    ], explanation: "Coral **islands** reached by **air** travel." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each impact to its type.",
    pairs: ["Foreign exchange earnings and jobs", "Commercialisation of local culture", "Damage to paths and habitats", "Rising land prices for residents"], right: ["Economic", "Social and cultural", "Environmental"], rightIndex: [0, 1, 2, 0],
    explanation: "Each impact belongs to one of three types." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "units",
    stem: "A viewing area of 2 400 m² allows each visitor 4 m². How many visitors can be present at one time?",
    hints: ["Divide the area by the space per visitor."],
    value: cap1, wrong: [9600, 4],
    explanation: "2 400 ÷ 4 = **600 visitors**. The value 9 600 multiplies instead of dividing." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "units",
    stem: "The viewing area holds 600 visitors at a time, each visit lasts 1 hour and the site is open for 8 hours. How many visitors can it receive in a day?",
    hints: ["A new group of 600 can enter each hour."],
    value: capDay, wrong: [600, 4],
    explanation: "600 × 8 = **4 800 visitors**." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "A resort receives 40 000 visitors a year. Each makes a return flight causing 2.5 tonnes of carbon dioxide (illustrative figure). Calculate the total emissions from the flights, in tonnes.",
    hints: ["Multiply visitors by emissions per visitor."],
    value: em, wrong: [16000, 42.5],
    explanation: "1. Visitors × emissions = 40 000 × 2.5.\n2. = **100 000 t** of carbon dioxide. The value 16 000 divides instead of multiplying." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the term for the part of tourist spending that leaves the host area, such as profits sent abroad.",
    accepted: ["leakage", "economic leakage", "leakages"], wrong: ["multiplier"],
    explanation: "**Leakage**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What is the local name of the Victoria Falls, meaning 'the smoke that thunders'?",
    accepted: ["Mosi-oa-Tunya", "Mosi oa Tunya", "Mosioatunya", "Mosi-O-Tunya"], wrong: ["Kariba"],
    explanation: "**Mosi-oa-Tunya**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two positive and two negative economic impacts of tourism.",
    hints: ["Think about jobs, foreign exchange, leakage and prices."],
    points: [
      "Positive: tourism creates jobs in hotels, guiding, transport and crafts.",
      "Positive: it earns foreign exchange and tax revenue for the government.",
      "Negative: leakage means profits and imports take money out of the area.",
      "Negative: jobs may be seasonal and low-paid, and prices and land values may rise for residents.",
    ],
    modelAnswer: "Tourism creates jobs in hotels, guiding, transport and crafts, and earns foreign exchange and tax revenue. However, leakage takes profits and import payments out of the area, jobs may be seasonal and low-paid, and prices and land values may rise for residents.",
    explanation: "Two gains and two costs." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Using the example of Victoria Falls, describe how tourism has developed and two ways in which it is managed.",
    hints: ["Give dated facts: a bridge, an airport, activities, World Heritage status."],
    points: [
      "Development: the rail bridge opened in 1905 and the town grew with hotels, an expanded airport and activities such as rafting, bungee jumping and helicopter flights.",
      "Development: the Falls became a World Heritage Site in 1989, which raised their profile.",
      "Management: entrance fees and controlled access to the rainforest and park.",
      "Management: regulation of activities and environmental assessment of developments, and regional co-operation through KAZA.",
    ],
    modelAnswer: "The rail bridge opened in 1905 and the town grew with hotels, an expanded airport and activities such as rafting, bungee jumping and helicopter flights; World Heritage status in 1989 raised the profile of the Falls. Management includes entrance fees and controlled access to the rainforest and park, regulation of activities with environmental assessment, and regional co-operation through KAZA.",
    explanation: "Dated development facts and two management methods." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Suggest four ways of improving a local tourist attraction in a Zimbabwean district so that it attracts more visitors.",
    hints: ["Think about access, facilities, guides and marketing."],
    points: [
      "Improve roads, signs and parking so that the site is easy to reach.",
      "Provide toilets, safe accommodation, food and clear entrance fees.",
      "Train local guides and provide information about the site's heritage or wildlife.",
      "Market the site through websites, social media, trade fairs and the Zimbabwe Tourism Authority, and plan with the community so that benefits are shared.",
    ],
    modelAnswer: "Improve roads, signs and parking, provide toilets, safe accommodation and food with clear entrance fees, train local guides and provide information about the site, and market it through websites, social media, trade fairs and the Zimbabwe Tourism Authority while planning with the community so that benefits are shared.",
    explanation: "Access, facilities, guides and marketing." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A viewpoint at a waterfall has an area of 3 000 m² and each visitor needs 5 m². It opens for 6 hours a day and each visit lasts 1 hour. On the busiest day 4 500 visitors arrive (illustrative data).",
    hints: ["Capacity at one time = area ÷ space per visitor.", "Daily capacity = capacity at one time × hours open."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of visitors the viewpoint can hold at one time.", value: v1, unit: "units", wrong: [15000, 5],
        explanation: "3 000 ÷ 5 = 600." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the daily carrying capacity.", value: vDay, unit: "units", wrong: [600, 18000],
        explanation: "600 × 6 = 3 600 visitors." }),
      P.num({ label: "(c)", marks: 1, stem: "By how many visitors does the busiest day exceed the daily capacity?", value: vEx, unit: "units", wrong: [4500, 1200],
        explanation: "4 500 − 3 600 = 900." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest three ways of managing the pressure on the viewpoint.",
        points: [
          "Timed tickets and booking to spread arrivals through the day.",
          "Extra viewing platforms or paths to share the load.",
          "Higher fees at peak times, or promotion of the site at quieter times.",
        ],
        modelAnswer: "Timed tickets and booking to spread arrivals, extra viewing platforms or paths to share the load, and higher fees at peak times or promotion in quieter periods.",
        explanation: "Spread visitors in time and space." }),
    ], explanation: "Calculate carrying capacity and suggest management." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A tourist on a one-week holiday at a foreign-owned island resort spends US\\$1 000. The table shows where the spending goes (illustrative data).\n\n${ST}`,
    hints: ["Leakage = food + foreign staff + profits.", "Retained = local wages + local suppliers + taxes."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of spending that leaks out of the country.", value: leakPct, unit: "%", wrong: [40, 22],
        explanation: "22 + 18 + 20 = 60%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how much of the US\\$1 000 stays in the host country, in US\\$.", value: retUS, unit: "US$", wrong: [600, 40],
        explanation: "15 + 10 + 15 = 40%; 40% of 1 000 = US\\$400." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why leakage is high at foreign-owned island resorts.",
        points: [
          "Profits are paid to owners and shareholders overseas.",
          "Food, drink and equipment are imported because islands cannot produce them.",
          "Some managers and skilled staff are foreign and their pay is sent abroad.",
        ],
        modelAnswer: "Profits are paid to owners and shareholders overseas, food, drink and equipment are imported because islands cannot produce them, and some managers and skilled staff are foreign and their pay is sent abroad.",
        explanation: "Ownership, imports and foreign staff." }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Suggest and justify measures that a government could use to reduce leakage.",
        points: [
          "Encourage local ownership or joint ventures so that more profit stays at home.",
          "Support local farmers and fishers to supply resorts, which lowers imports.",
          "Train local people for management jobs so that fewer foreign staff are needed.",
          "Use taxes and conditions on licences to require local purchasing.",
          "Judgement: a mix of ownership, supply links and training is likely to be effective, though some imports will remain on small islands.",
        ],
        wordLimit: { max: 180 },
        modelAnswer: "Encourage local ownership or joint ventures so that more profit stays at home, support local farmers and fishers to supply resorts, and train local people for management jobs. Taxes and licence conditions can require local purchasing. A mix of these is likely to be effective, though some imports will remain on small islands.",
        explanation: "Ownership, supply links, training and rules." }),
    ], explanation: "Calculate leakage and suggest ways of reducing it." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, applies: CAM,
    stem: "Using the Maldives as an example, evaluate the success of attempts to manage the impacts of tourism.",
    hints: ["Give development facts, impacts and management measures.", "Reach a judgement about sustainability."],
    points: [
      "Tourism began in the early 1970s, with the first resorts in 1972, and became the largest part of the economy.",
      "The one island, one resort policy separated resorts from inhabited islands, limiting social and cultural impacts.",
      "Guesthouses on local islands since about 2009 spread income to more Maldivians.",
      "Tourism earns foreign exchange and jobs, but food and materials are largely imported, so leakage is high.",
      "Reefs are damaged by anchors, dredging and visitors, and waste and sewage are hard to manage, with waste dumped on Thilafushi.",
      "Management includes limits on building, marine protected areas, a tax on tourists' nights and waste rules.",
      "The country is threatened by sea-level rise, and flights to the islands have a large carbon cost.",
      "Judgement: management has controlled social impacts and raised income, but environmental and climate risks mean sustainability is uncertain.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Tourism in the Maldives began in the early 1970s, with the first resorts opening in 1972, and became the largest part of the economy. The one island, one resort policy kept resorts apart from inhabited islands, limiting social and cultural impacts, and guesthouses on local islands since about 2009 spread income to more Maldivians. However, food and materials are largely imported, so leakage is high, reefs are damaged by anchors, dredging and visitors, and waste and sewage are hard to manage, with waste dumped on Thilafushi. Management includes limits on building, marine protected areas, a tax on tourists' nights and waste rules. The country is also threatened by sea-level rise, and flights to the islands have a large carbon cost. I conclude that management has controlled social impacts and raised income, but environmental and climate risks mean that sustainability is uncertain.",
    wordLimit: { max: 300 }, explanation: "Use dated facts, weigh success against remaining problems and judge." });

  b.card("DEFINITION", "Sustainable tourism", "Tourism that meets the needs of visitors and hosts today without harming the environment, culture or economy of the future.");
  b.card("DEFINITION", "Carrying capacity", "The maximum number of visitors a place can hold without unacceptable damage or loss of quality.");
  b.card("DEFINITION", "Leakage", "The part of tourist spending that leaves the host area, e.g. profits sent abroad and imported goods.");
  b.card("CONCEPT", "Economic impacts of tourism", "Jobs, foreign exchange and taxes; but leakage, seasonal low-paid jobs and rising prices.");
  b.card("CONCEPT", "Environmental impacts of tourism", "Funds for conservation, but damaged paths, habitats and reefs, waste, water use and aircraft emissions.");
  b.card("FACT", "Victoria Falls", "On the Zambezi between Zimbabwe and Zambia; World Heritage Site since 1989; rail bridge opened 1905; managed through park fees, regulation and KAZA.", undefined, { applies: CAM });
  b.card("FACT", "The Maldives", "About 1 200 coral islands in 26 atolls; tourism since the early 1970s; one island, one resort; threatened by sea-level rise.", undefined, { applies: CAM });
  b.card("CONCEPT", "Reducing leakage", "Local ownership, local suppliers, training local staff and licence conditions that require local purchasing.");
  b.card("CONCEPT", "Planning and marketing tourism in Zimbabwe", "Zoning, EIAs, community involvement and grading by the ZTA; marketing through websites, fairs and social media.", undefined, { applies: ZIM });
});
