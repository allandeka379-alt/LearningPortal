// Slice G4a: service industries and tourism in Zimbabwe (ZIMSEC 7.10.6). ZIMSEC-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.tourism.zimbabwe", { file: "tourism/zimbabwe", keyPrefix: "tourism.zimbabwe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which tourist attraction is found near **Masvingo**?",
    options: [
      ["Great Zimbabwe", "Correct: the stone ruins lie about 30 km from Masvingo."],
      ["Mana Pools", "Mana Pools is in the Zambezi valley in the north."],
      ["Matobo Hills", "The Matobo Hills are near Bulawayo."],
      ["Mutarazi Falls", "Mutarazi Falls is in the Eastern Highlands."],
    ],
    answer: "A",
    explanation: "Great Zimbabwe is near Masvingo, in the south-centre of the country.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is Zimbabwe's **largest** national park?",
    options: [
      ["Hwange", "Correct: Hwange is the largest national park and is famous for elephants."],
      ["Nyanga", "Nyanga is a mountain park in the Eastern Highlands, much smaller."],
      ["Matusadona", "Matusadona is on the shore of Lake Kariba, much smaller."],
      ["Chimanimani", "Chimanimani is a mountain park on the eastern border, much smaller."],
    ],
    answer: "A",
    explanation: "Hwange National Park, in the north-west, is Zimbabwe's largest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which activity is an example of **domestic** tourism?",
    options: [
      ["A family from Bulawayo spending a weekend at Lake Kariba", "Correct: residents travelling within their own country are domestic tourists."],
      ["A group from Germany visiting Victoria Falls", "Visitors from abroad are international tourists."],
      ["A Zimbabwean student studying in South Africa for three years", "This is migration for study, not tourism."],
      ["A Zambian trader selling goods in Harare for one day", "This is cross-border trade, and the trader is a foreign visitor."],
    ],
    answer: "A",
    explanation: "Domestic tourism means people travelling for leisure within their own country.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which attraction is known for granite kopjes, balancing rocks and ancient rock paintings?",
    options: [
      ["The Matobo Hills", "Correct: the Matobo Hills near Bulawayo have kopjes, balancing rocks and San rock art."],
      ["Lake Kariba", "Kariba is a man-made lake known for houseboats and tiger-fishing."],
      ["Mana Pools", "Mana Pools is a Zambezi floodplain known for wildlife and canoeing."],
      ["Victoria Falls", "Victoria Falls is a waterfall on the Zambezi."],
    ],
    answer: "A",
    explanation: "The Matobo Hills are a World Heritage Site for their landscape and rock art.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a **quaternary** service in Zimbabwe?",
    options: [
      ["Developing software for mobile banking", "Correct: ICT and research are knowledge-based (quaternary) activities."],
      ["Driving a kombi between Harare's suburbs", "Transport is a tertiary service."],
      ["Selling vegetables at a market", "Retail is a tertiary service."],
      ["Working as a waiter in a hotel", "Hospitality is a tertiary service."],
    ],
    answer: "A",
    explanation: "Quaternary industries produce and process knowledge and information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does tourism earn **foreign currency** for Zimbabwe?",
    options: [
      ["International visitors pay for hotels, park fees and activities with foreign money", "Correct: spending by foreign tourists is an export of services."],
      ["Zimbabwean tourists exchange their money for foreign currency when they travel abroad", "This spends foreign currency rather than earning it."],
      ["Hotels import furniture and food from abroad", "Imports use up foreign currency."],
      ["Domestic tourists pay park fees in local currency", "Local spending does not bring in foreign currency."],
    ],
    answer: "A",
    explanation: "International tourism brings foreign currency into the country.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which problem does each solution address?"],
    stem: "Foreign tourists choose Botswana and Zambia rather than Zimbabwe because of the country's poor image abroad. Which solution most directly tackles this problem?",
    options: [
      ["Marketing campaigns abroad by the Zimbabwe Tourism Authority", "Correct: promotion aims to change visitors' perceptions."],
      ["Anti-poaching patrols in national parks", "Anti-poaching protects wildlife but does not directly change the country's image abroad."],
      ["Lower hotel and lodge rates for local Zimbabwean residents", "This promotes domestic tourism, not international perceptions."],
      ["Solar panels for lodges", "Solar power deals with power cuts, not image."],
    ],
    answer: "A",
    explanation: "Image problems are tackled by marketing and positive publicity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What happens to the Zambezi's flow during the dry season?"],
    stem: "Why do some visitors to Victoria Falls in late October and November find the falls less impressive?",
    options: [
      ["The Zambezi's flow is low late in the dry season, so less water goes over the falls", "Correct: flow peaks after the rains upstream and falls in the dry season."],
      ["The rainforest blocks the view of the falls in those months", "The rainforest is there all year; flow is what changes."],
      ["Visitors are not allowed to enter the rainforest national park during those months", "The park is open all year."],
      ["The falls are covered by cloud for most of the dry season", "The dry season has clear skies; the spray is reduced, not hidden."],
    ],
    answer: "A",
    explanation: "Seasonal changes in river flow affect the attraction and visitor numbers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lake Kariba is a man-made lake on the Zambezi River.",
    answer: true,
    explanation: "True. It formed behind the Kariba dam, completed in 1959.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mana Pools National Park is in the Eastern Highlands.",
    answer: false,
    explanation: "False. Mana Pools is on the Zambezi floodplain in the north, downstream of Kariba.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each attraction with the activity or feature it is best known for.",
    pairs: [
      ["Victoria Falls", "Bungee jumping and white-water rafting"],
      ["Lake Kariba", "Houseboats and tiger-fishing"],
      ["Mana Pools", "Canoe safaris on the Zambezi"],
      ["Nyanga", "Hiking up Zimbabwe's highest mountain"],
    ],
    explanation: "Victoria Falls is known for adventure activities, Kariba for houseboats, Mana Pools for canoe safaris and Nyanga for Mount Nyangani.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "The local name of Victoria Falls, Mosi-oa-Tunya, means \"the smoke that {{blank:a}}\". The falls are shared with {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["thunders"], choices: ["thunders", "rises", "falls", "shines"] },
      { id: "b", accepted: ["Zambia"], choices: ["Zambia", "Botswana", "Mozambique", "Namibia"] },
    ],
    explanation: "Mosi-oa-Tunya means \"the smoke that thunders\"; the Zambezi forms the border with Zambia at the falls.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional lodge had 4,800 guest-nights in a year. 1,440 were by domestic tourists (fictional data). What percentage were by domestic tourists?",
    value: 30,
    wrong: [70, 333],
    explanation: "1,440 ÷ 4,800 × 100 = 30%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Multiply visitors by the spending per visitor.", "Convert to millions."],
    stem: "A fictional resort town receives 36,000 international visitors in a month. Each spends an average of US\\$450 (fictional data). Calculate the total spending in US\\$ million.",
    value: 16.2,
    tol: 0.05,
    wrong: [1.62, 162],
    workedSolution: "1. 36,000 × 450 = 16,200,000.\n2. = US\\$16.2 million.",
    explanation: "36,000 × US\\$450 = US\\$16,200,000 = US\\$16.2 million.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the river on which Victoria Falls is found.",
    accepted: ["Zambezi", "the Zambezi", "Zambezi River", "the Zambezi River", "Zambesi"],
    wrong: ["Limpopo"],
    explanation: "Victoria Falls is on the Zambezi River.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which tourism is important to Zimbabwe.",
    points: [
      "Earns foreign currency from international visitors.",
      "Development: used to pay for imports such as fuel and machinery.",
      "Creates jobs (hotels, guiding, crafts, transport) / funds conservation through park fees and CAMPFIRE / builds infrastructure.",
      "Development: wages spread through the multiplier effect / communities value wildlife / airports and roads serve local people.",
    ],
    modelAnswer: "Foreign tourists at Victoria Falls and Hwange pay in foreign currency, which the country uses to import fuel and machinery. Tourism also employs people in lodges, guiding and craft markets, and their wages are spent in local shops, supporting other businesses.",
    explanation: "Each way needs a point and a development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about the economy, infrastructure, competition and wildlife."],
    stem: "Describe **four** problems facing the tourist industry in Zimbabwe.",
    points: [
      "Economic instability / foreign-currency shortages / high prices.",
      "Negative international image reduces visitor numbers.",
      "Poor infrastructure: roads, few direct flights, power and water cuts.",
      "Competition from neighbouring countries / poaching / drought / seasonality / emigration of skilled staff (any one).",
    ],
    modelAnswer: "Economic instability makes prices high and unpredictable. A poor image abroad puts tourists off. Potholed roads, few direct flights and power cuts affect hotels. Neighbouring countries such as Botswana and Zambia compete for the same visitors.",
    explanation: "Four separate problems, each briefly described.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows tourist arrivals at a fictional Zimbabwean resort (thousands, fictional data).\n\n| Year | International | Domestic | Total |\n|---|---|---|---|\n| Year 1 | 180 | 60 | 240 |\n| Year 2 | 120 | 90 | 210 |",
    hints: ["Compare each group between the two years."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage decrease in international arrivals from Year 1 to Year 2. Give your answer to one decimal place.", value: 33.3333, answer: "33.3", tol: 0.05, wrong: [50, 60], explanation: "Fall = 60; 60 ÷ 180 × 100 = 33.3%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of total arrivals that were domestic in Year 2. Give your answer to one decimal place.", value: 42.857, answer: "42.9", tol: 0.05, wrong: [25, 57.1], explanation: "90 ÷ 210 × 100 = 42.9%." }),
      P.mcq({
        label: "(c)", stem: "Which statement best describes the change?",
        options: [
          ["International arrivals fell but domestic arrivals rose", "Correct: 180 to 120 and 60 to 90."],
          ["Both international and domestic arrivals fell", "Domestic arrivals rose from 60 to 90."],
          ["Total arrivals increased", "Total arrivals fell from 240 to 210."],
          ["Domestic arrivals were larger than international in both years", "International arrivals were larger in both years."],
        ],
        answer: "A", explanation: "The resort became more dependent on domestic tourists.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why international arrivals might fall at a Zimbabwean resort.",
        points: ["Negative image / political or economic instability abroad.", "High prices, few direct flights or expensive visas.", "Competition from neighbouring countries / a global shock such as a pandemic / drought reducing attractions."],
        modelAnswer: "International visitors may be put off by negative news about the country, high prices and few direct flights, or may choose cheaper destinations in neighbouring countries.",
        explanation: "Suggest reasons linked to the problems of tourism.",
      }),
    ],
    explanation: "This item practises interpreting tourism data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A fictional community in a dry district next to a national park earns little from farming. Elephants raid crops and some young men poach. The district council proposes a scheme in which hunting and photographic safari companies pay fees, part of which goes to the villages.",
    hints: ["Think about how the scheme changes the value of wildlife to villagers."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the Zimbabwean programme on which this kind of community wildlife scheme is based.",
        accepted: ["CAMPFIRE", "Campfire", "Communal Areas Management Programme for Indigenous Resources"],
        wrong: ["ZTA"],
        explanation: "CAMPFIRE returns wildlife revenue to rural communities through district councils.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how the scheme could reduce poaching and benefit the villages.",
        points: ["Fees give villagers income from wildlife, e.g. for schools, clinics or boreholes.", "Wildlife becomes valuable alive, so villagers protect it and report poachers.", "Jobs as guides, scouts or lodge workers replace poaching as a source of income."],
        modelAnswer: "Part of the safari fees would pay for village projects such as boreholes and classrooms. Because wildlife now earns money, people have a reason to protect it and report poachers, and some young men could work as scouts or guides instead of poaching.",
        explanation: "Link income from tourism to conservation behaviour.",
      }),
    ],
    explanation: "This item links tourism with community conservation.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    hints: ["Describe several problems with Zimbabwean examples.", "Evaluate solutions and judge which matter most."],
    stem: "Describe the problems facing the tourist industry in Zimbabwe and evaluate the solutions that could be used.",
    points: [
      "Problem: economic instability and foreign-currency shortages raise costs.",
      "Problem: negative image abroad; competition from Zambia, Botswana, South Africa.",
      "Problem: poor roads, few direct flights, power and water cuts at hotels.",
      "Problem: poaching, drought (low flow at Victoria Falls, low Kariba), seasonality, COVID-19, skills loss.",
      "Solution evaluated: ZTA marketing and social media; cheap but limited if conditions do not change.",
      "Solution evaluated: infrastructure (airport upgrade at Victoria Falls, roads, solar power); effective but costly.",
      "Solution evaluated: KAZA visa and regional cooperation; domestic tourism; anti-poaching and CAMPFIRE.",
      "Judgement: which solutions are most important and why.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Zimbabwe's tourism faces several problems. Economic instability and shortages of foreign currency make prices high and supplies uncertain. A negative image abroad sends visitors to Zambia, Botswana and South Africa, which offer similar wildlife and scenery. Potholed roads, few direct flights and power cuts at hotels add to costs and reduce comfort. Poaching threatens wildlife, droughts reduce the flow at Victoria Falls and the level of Lake Kariba, and shocks such as the COVID-19 pandemic stopped travel completely. Many trained guides and chefs have emigrated. Marketing by the ZTA and on social media is cheap and can improve the country's image, but it will not work if visitors still meet poor services. Investment in infrastructure, such as the upgraded Victoria Falls airport, better roads and solar power at lodges, is effective but costly. Regional cooperation such as the KAZA visa attracts visitors who want to see several countries. Promoting domestic tourism keeps hotels open when foreign visitors fall. Anti-poaching and CAMPFIRE protect wildlife by giving communities income from it. The most important solutions are economic stability and better infrastructure, because marketing only succeeds when visitors have a good experience.",
    explanation: "Describe several problems with examples, then evaluate solutions and judge.",
  });

  b.card("DEFINITION", "Tourism", "Travel to and stay in places away from home for leisure, business or other purposes, and the services that support it.");
  b.card("DEFINITION", "Domestic tourism", "Tourism by people within their own country, e.g. a Harare family holidaying in Nyanga.");
  b.card("DEFINITION", "Service (tertiary) industry", "An industry providing services: retail, transport, finance, communications, health, education, government and tourism.");
  b.card("FACT", "Victoria Falls", "On the Zambezi, shared with Zambia; about 1.7 km wide and about 100 m high; World Heritage Site; Mosi-oa-Tunya, 'the smoke that thunders'.");
  b.card("FACT", "Great Zimbabwe", "Stone ruins near Masvingo, capital of a Shona state built roughly between the 11th and 15th centuries; World Heritage Site.");
  b.card("FACT", "Hwange National Park", "Zimbabwe's largest national park, in the north-west; famous for large elephant herds.");
  b.card("FACT", "Matobo Hills and Mana Pools", "Matobo (near Bulawayo): kopjes, balancing rocks, rock art. Mana Pools (Zambezi floodplain): wildlife, canoe safaris. Both World Heritage Sites.");
  b.card("CONCEPT", "Importance of tourism to Zimbabwe", "Foreign currency, jobs, multiplier effect, infrastructure, conservation funding (park fees, CAMPFIRE), government revenue.");
  b.card("CONCEPT", "Problems of tourism in Zimbabwe", "Economic instability, poor image, poor infrastructure, competition from neighbours, poaching, drought, seasonality, skills loss.");
  b.card("CONCEPT", "Solutions for tourism in Zimbabwe", "ZTA marketing, better infrastructure, KAZA visa, domestic tourism promotion, anti-poaching and CAMPFIRE, diversification.");
});
