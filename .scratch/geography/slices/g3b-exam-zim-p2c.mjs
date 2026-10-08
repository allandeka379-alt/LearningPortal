// Slice G3b: ZIMSEC Paper 2 Section C (population, settlement, transport and trade): transport and trade (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.transport.networks", { file: "exam/zim-p2-c-transport", keyPrefix: "exam.zim-p2-c-transport", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.transport.networks", "geo.transport.modes"],
    stem: "A fictional mining and farming district in Zimbabwe has seven towns, A to G, joined by eight tarred roads: A–B, A–C, A–D, A–E, B–C, D–E, E–F and F–G. Town A is the district's main commercial centre. A chrome mine near town G sends ore to a port about 900 km away.\n\nTable 1 gives distances between two of the towns (fictional data).\n\n| Route | Straight-line distance (km) | Distance by road (km) |\n|---|---|---|\n| Town A to town G | 120 | 156 |",
    hints: ["Count each town as a node and each road between two towns as a link.", "Detour index = road distance ÷ straight-line distance × 100."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which mode of transport is most suitable for carrying the chrome ore from the mine to the port?",
        options: [
          ["Rail", "Correct: chrome ore is heavy and bulky and travels a long distance, which rail handles cheaply."],
          ["Air", "Air freight is far too expensive for bulky, low-value ore."],
          ["Pipeline", "Pipelines carry only liquids and gases."],
          ["Bicycle", "Bicycles carry tiny loads over short distances."],
        ],
        answer: "A", explanation: "Bulky, low-value goods over long distances suit rail.",
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the beta index of the district's road network. Give your answer to two decimal places.", value: 1.1428571428571428, answer: "1.14", tol: 0.005, wrong: [0.88, 1], explanation: "β = links ÷ nodes = 8 ÷ 7 = 1.14." }),
      P.mcq({
        label: "(c)", stem: "What does your answer to (b) show about the network?",
        options: [
          ["It has circuits, so some towns have alternative routes", "Correct: a beta index above 1 means there are more links than nodes, so circuits exist."],
          ["It is a simple branching network with no circuits", "That would need a beta index below 1."],
          ["Every town is directly joined to every other town", "That would need far more links; G, for example, is joined only to F."],
          ["The roads are much longer than straight lines", "Route length is measured by the detour index, not the beta index."],
        ],
        answer: "A", explanation: "β above 1 indicates a connected network with circuits (here A–B–C and A–D–E).",
      }),
      P.num({ label: "(d)", marks: 2, stem: "Use Table 1 to calculate the detour index for the road from town A to town G.", value: 130, tol: 0.5, wrong: [77, 36], explanation: "156 ÷ 120 × 100 = 130." }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why town A has become the district's main commercial centre.",
        points: [
          "Town A has the most links (four roads), so it is the most accessible town in the network.",
          "People and goods from many towns can reach A directly, so shops, banks and services locate there to serve the largest market.",
          "Its position at the junction attracts transport services (bus ranks, depots), which brings more trade (cumulative growth).",
        ],
        modelAnswer: "Town A is joined directly to four other towns, more than any other, so it is the easiest place to reach. Shops, banks and wholesalers set up there to serve customers from the whole district, and bus ranks and depots at the junction bring even more trade.",
        explanation: "Accessibility at a network junction encourages commercial growth.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe Zimbabwe's main road and rail links to seaports in neighbouring countries.",
        points: [
          "The Beira corridor: road and rail from Harare through Mutare (Forbes border post) to Beira in Mozambique, with the fuel pipeline to Feruka.",
          "Road and rail south through Beitbridge across the Limpopo to South Africa and its ports such as Durban.",
          "A railway from the south-east of Zimbabwe to Maputo in Mozambique.",
          "Routes north and west through Chirundu or Victoria Falls into Zambia (and onward to Dar es Salaam), or via Plumtree into Botswana.",
        ],
        modelAnswer: "The shortest route is the Beira corridor, with road and rail running from Harare through Mutare to Beira, beside the fuel pipeline. Road and rail also run south via Beitbridge to the South African ports such as Durban. A railway links the south-east to Maputo, and routes through Chirundu and Victoria Falls lead to Zambia and on towards Dar es Salaam.",
        explanation: "Name the route, the modes and the port.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Compare the advantages and disadvantages of road and rail for a Zimbabwean exporter.",
        points: [
          "Road advantage: door-to-door delivery and flexible timing, reaching places without railway sidings.",
          "Road disadvantage: higher cost per tonne over long distances; small loads per lorry; delays and damage on poor roads.",
          "Rail advantage: carries large, bulky loads cheaply over long distances (for example coal, chrome, fertiliser).",
          "Rail disadvantage: fixed routes and timetables, so goods need transfers by lorry; shortages of locomotives and wagons cause delays.",
        ],
        modelAnswer: "Road is flexible: a lorry collects from the farm or factory and delivers to the customer when needed, but it carries small loads and costs more per tonne over long distances, and poor roads cause delays. Rail moves large tonnages of bulky goods such as chrome cheaply over long distances, but it runs only on fixed lines and timetables, so goods must be transferred, and a shortage of working wagons can cause delays. Road therefore suits small, urgent or short-distance consignments, and rail suits bulky goods over long distances.",
        explanation: "A comparison should balance both modes and end with which suits which cargo.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to Zimbabwe, explain the transport problems that affect the movement of goods and evaluate the solutions that have been or could be used.",
        points: [
          "Landlocked position: long distances to the ports of Beira, Maputo and Durban add cost and time.",
          "Border delays: long queues of lorries at busy posts such as Beitbridge.",
          "Poor road condition: potholes, narrow roads, accidents; overloaded lorries damage roads.",
          "Rail problems: old locomotives and wagons, slow services, freight shifted to road.",
          "Solution evaluated: one-stop border posts and electronic pre-clearance (Chirundu with Zambia) cut waiting times at relatively low cost.",
          "Solution evaluated: rehabilitation and dualisation of main roads funded by tolls are effective but expensive and need maintenance.",
          "Solution evaluated: investment in rolling stock and track would move bulky freight back to rail and protect roads; using several corridors reduces dependence on one route.",
          "Judgement: a combination is needed; a reasoned priority (for example rail plus border efficiency) for a landlocked country.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Because Zimbabwe is landlocked, its exports and imports travel hundreds of kilometres to Beira, Maputo or Durban, which adds cost. Lorries can wait a long time at Beitbridge, the busiest border post. Many roads are narrow and potholed, accidents are common and overloaded lorries make the damage worse. The railway has too few working locomotives and wagons, so bulky goods such as chrome and coal have moved to road, increasing road damage. Several solutions have been tried. One-stop border posts, such as Chirundu with Zambia, let officials of both countries clear lorries once, cutting delays cheaply. Rehabilitating and dualising highways, partly funded by tolls, makes journeys safer and faster, but it is very expensive and roads must be maintained. Recapitalising the railway would take heavy freight off the roads and lower costs per tonne, but needs large investment. Using the Beira, Beitbridge and Maputo routes keeps trade moving if one corridor is blocked. No single solution is enough; faster border clearance combined with a stronger railway would do most to cut the cost of trade for a landlocked country.",
        explanation: "Explain several problems with Zimbabwean detail, then weigh up solutions and reach a judgement.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C transport question: mode choice, beta and detour indices, accessibility, routes to the sea, comparing modes and an extended evaluation of transport problems.",
  });
});

concept("geo.trade.patterns-blocs", { file: "exam/zim-p2-c-trade", keyPrefix: "exam.zim-p2-c-trade", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.trade.patterns-blocs"],
    stem: "Table 1 shows the value of the exports and imports of a fictional landlocked SADC country in two years (US\\$ million, fictional data).\n\n| | Year 1 | Year 2 |\n|---|---|---|\n| Exports | 4,800 | 5,400 |\n| Imports | 5,600 | 5,700 |\n\nTable 2 shows the make-up of its exports in Year 2.\n\n| Export group | Minerals | Agricultural products | Manufactured goods | Total |\n|---|---|---|---|---|\n| Value (US\\$ million) | 3,240 | 1,350 | 810 | 5,400 |",
    hints: ["Balance of trade = exports − imports.", "Percentage change = change ÷ original value × 100."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the balance of trade in Year 1, in US\\$ million (use a minus sign for a deficit).", value: -800, wrong: [800, 10400], explanation: "4,800 − 5,600 = −800 (a deficit of US\\$800 million)." }),
      P.num({ label: "(b)", stem: "Calculate the balance of trade in Year 2, in US\\$ million (use a minus sign for a deficit).", value: -300, wrong: [300, 11100], explanation: "5,400 − 5,700 = −300 (a deficit of US\\$300 million)." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate the percentage increase in the value of exports from Year 1 to Year 2.", value: 12.5, tol: 0.05, wrong: [11.1, 600], explanation: "Increase = 600; 600 ÷ 4,800 × 100 = 12.5%." }),
      P.num({ label: "(d)", unit: "%", stem: "Calculate the percentage of Year 2 export earnings that came from minerals.", value: 60, tol: 0.05, wrong: [3240, 40], explanation: "3,240 ÷ 5,400 × 100 = 60%." }),
      P.mcq({
        label: "(e)", stem: "Which statement best describes the change in the country's trade between Year 1 and Year 2?",
        options: [
          ["The trade deficit became smaller", "Correct: the deficit fell from US\\$800 million to US\\$300 million because exports grew faster than imports."],
          ["The country moved from a deficit to a surplus", "Imports are still greater than exports in Year 2, so there is still a deficit."],
          ["The trade deficit became larger", "The deficit fell from 800 to 300."],
          ["Imports fell while exports stayed the same", "Imports rose slightly (5,600 to 5,700) and exports rose by 600."],
        ],
        answer: "A", explanation: "Exports rose by 600 and imports by only 100, so the deficit narrowed by US\\$500 million.",
      }),
      P.mcq({
        label: "(f)", stem: "Which organisation is a **producers' organisation** rather than a regional trading bloc?",
        options: [
          ["OPEC", "Correct: OPEC's members are oil exporters who agree on oil output to influence prices."],
          ["SADC", "SADC is a regional community with a free trade area in southern Africa."],
          ["COMESA", "COMESA is a common market of eastern and southern African states."],
          ["ECOWAS", "ECOWAS is a regional economic community of West African states."],
        ],
        answer: "A", explanation: "OPEC controls output of one product; trading blocs remove barriers to trade between neighbouring members.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Distinguish between **domestic** trade and **foreign** trade, giving a Zimbabwean example of each.",
        points: [
          "Domestic trade takes place within one country, using one currency and with no customs duties.",
          "Foreign trade crosses national borders and involves imports, exports, customs duties/tariffs and exchange rates.",
          "Gives a correct example of each (for example vegetables from Mutoko sold at Mbare Musika; tobacco exported to China or fuel imported through Beira).",
        ],
        modelAnswer: "Domestic trade happens inside Zimbabwe, for example farmers in Mutoko selling vegetables at Mbare Musika in Harare, with no customs duties. Foreign trade crosses borders and involves customs checks, tariffs and foreign currency, for example tobacco exported to China or fuel imported through Beira.",
        explanation: "The difference is whether goods cross a national border.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "Give **four** reasons why countries such as this one join regional trading blocs like SADC and COMESA.",
        points: [
          "To remove or reduce tariffs and quotas between members, making goods cheaper.",
          "To gain access to a larger market, allowing larger-scale production and attracting investment.",
          "To bargain together with powerful trading partners outside the region / protect members with a common external tariff.",
          "To co-operate on shared infrastructure such as transport corridors, border posts and power supply, or to reduce dependence on former colonial powers.",
        ],
        modelAnswer: "Members cut tariffs so their goods are cheaper in each other's markets; together they form a much larger market that attracts investors; they negotiate more strongly with large outside partners; and they co-operate on shared projects such as transport corridors to the ports.",
        explanation: "Four distinct reasons earn four marks.",
      }),
      P.manual({
        label: "(i)", marks: 3, stem: "Describe how trade creates imbalances **within** Zimbabwe.",
        points: [
          "Most trade is concentrated in Harare and Bulawayo, with their industries, wholesalers, banks and transport hubs.",
          "Areas with mines, commercial farms and good road or rail links trade more and grow wealthier.",
          "Remote communal areas with poor transport trade little beyond local markets, so incomes and services lag behind (core-periphery pattern).",
        ],
        modelAnswer: "Harare and Bulawayo, with factories, banks and the main transport links, handle most trade and attract more investment. Mining and commercial farming areas along main roads and railways also benefit, but remote communal areas trade little beyond local markets, so they fall further behind.",
        explanation: "Trade reinforces a core-periphery pattern inside the country.",
      }),
      P.manual({
        label: "(j)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain why many African countries, such as Zimbabwe, have trade imbalances with the industrialised countries of the world, and evaluate measures that could reduce these imbalances.",
        points: [
          "Exports are mainly primary products (minerals such as platinum and gold, and tobacco) with little value added.",
          "Prices of primary products are low and fluctuate; manufactured imports (machinery, vehicles, fuel products) are expensive, giving poor terms of trade.",
          "Raw materials are processed abroad, so jobs and profits from adding value are lost; dependence on a few products and markets.",
          "Measure evaluated: beneficiation / value addition (refining minerals, manufacturing from tobacco or cotton) raises earnings but needs investment, skills and reliable power.",
          "Measure evaluated: diversifying exports (horticulture, tourism and other services) reduces dependence on one product but takes time.",
          "Measure evaluated: regional trade through SADC, COMESA and the African Continental Free Trade Area provides nearer markets for manufactured goods but members often produce similar goods.",
          "Measure evaluated: improving transport links and border efficiency lowers costs of exporting for a landlocked country.",
          "Judgement: a reasoned conclusion, for example value addition combined with regional trade offers the best long-term solution.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Many African countries sell mainly raw materials and buy manufactured goods. Zimbabwe exports gold, platinum-group metals, nickel, chrome and tobacco, but imports fuel, machinery, vehicles and chemicals. Raw material prices are low and rise and fall sharply, while the prices of manufactured goods tend to rise, so the terms of trade are poor and trade deficits are common. Because ore and leaf are processed abroad, the jobs and profits from adding value go to industrialised countries. One measure is beneficiation: refining platinum or manufacturing tobacco products before export earns more per tonne and creates jobs, but it needs large investment, skills and reliable electricity. Diversifying into horticulture, tourism and other services reduces dependence on a few products, although it takes time. Trading within SADC, COMESA and the African Continental Free Trade Area gives nearer markets for manufactured goods, but neighbours often produce similar goods. Better transport corridors and faster border posts lower the cost of exporting from a landlocked country. Value addition is the most important measure, because without it the other measures still leave the country selling cheap raw materials, but it works best when combined with regional trade and better transport.",
        explanation: "Explain the causes with examples, evaluate several measures and give a supported judgement.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C trade question: balance-of-trade and percentage calculations, interpreting change, trading blocs, domestic and foreign trade, internal imbalances and an extended evaluation.",
  });
});
