// Slice G3b: transport networks and network analysis (ZIMSEC 7.12.2).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.transport.networks", { file: "transport/networks", keyPrefix: "transport.networks" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which city is the main railway junction of Zimbabwe and the headquarters of the National Railways of Zimbabwe?",
    options: [
      ["Bulawayo", "Correct: lines to Victoria Falls, Botswana, Beitbridge and Harare all meet at Bulawayo."],
      ["Masvingo", "Masvingo is an important road centre, not the main railway junction."],
      ["Mutare", "Mutare is on the line to Beira but is not the main junction."],
      ["Kariba", "Kariba has no railway; it is known for its dam and lake."],
    ],
    answer: "A",
    explanation: "Bulawayo grew as a railway town; it is where the main lines of the network meet.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The port of **Beira**, used by much of Zimbabwe's trade, is in which country?",
    options: [
      ["Mozambique", "Correct: Beira is on the coast of Mozambique, linked to Zimbabwe by road, rail and pipeline through Mutare."],
      ["South Africa", "South Africa's main ports used by Zimbabwe include Durban, not Beira."],
      ["Tanzania", "Tanzania's main port is Dar es Salaam."],
      ["Namibia", "Namibia's main port is Walvis Bay."],
    ],
    answer: "A",
    explanation: "The Beira corridor (road, rail and the fuel pipeline) is Zimbabwe's shortest route to the sea.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A road network has a beta index of **0.8**. What does this tell you?",
    options: [
      ["It is a simple branching network with no circuits", "Correct: a beta index below 1 means there are fewer links than nodes, so there are no alternative routes."],
      ["It is a highly connected network with many circuits", "A highly connected network has a beta index well above 1."],
      ["Its roads are 80% longer than straight lines", "That would be described by the detour index, not the beta index."],
      ["It has exactly one circuit linking every node", "A network with one circuit has a beta index of about 1."],
    ],
    answer: "A",
    explanation: "β = links ÷ nodes. Below 1 = branching (tree-like) network; about 1 = one circuit; above 1 = well connected.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On a flow-line diagram of traffic, what does the **width** of each band show?",
    options: [
      ["The volume of traffic along that route", "Correct: band width is drawn in proportion to the flow, for example vehicles per day."],
      ["The width of the road surface in metres", "Flow lines show amounts of movement, not the physical size of the road."],
      ["The distance between the two places joined", "Distance is shown by the length of the line, not its width."],
      ["The speed limit along that stretch of road", "Speed limits are not shown on flow-line diagrams."],
    ],
    answer: "A",
    explanation: "Flow-line widths are proportional to flow, using a scale such as 1 mm = 100 vehicles per day.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A road has a **detour index of 100**. What does this mean?",
    options: [
      ["The road follows the straight line exactly", "Correct: actual distance equals straight-line distance, so actual ÷ straight × 100 = 100."],
      ["The road is twice as long as the straight line", "That would give a detour index of 200."],
      ["The road carries 100 vehicles each day", "Traffic volume is shown by counts or flow lines, not the detour index."],
      ["The road has 100 bends along its length", "The index compares distances; it does not count bends."],
    ],
    answer: "A",
    explanation: "Detour index = actual route distance ÷ straight-line distance × 100. A value of 100 is perfectly direct; higher values mean longer detours.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change to a network would **increase** its beta index?",
    options: [
      ["Building a new road between two towns already on the network", "Correct: links rise while nodes stay the same, so links ÷ nodes increases."],
      ["Closing a road between two towns on the network", "Removing a link lowers the beta index."],
      ["Resurfacing a road that already joins two towns", "Resurfacing improves quality but adds no link or node."],
      ["Lowering the speed limit on the main trunk road", "Speed limits do not change the number of links or nodes."],
    ],
    answer: "A",
    hints: ["β = links ÷ nodes.", "Which change adds a link without adding a node?"],
    explanation: "Adding a link between existing nodes raises the numerator only, so the beta index rises and connectivity improves.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do many railway lines in Africa run from the interior to the coast, with few links between neighbouring countries?",
    options: [
      ["They were built mainly to carry minerals and crops to ports for export", "Correct: colonial-era lines linked mines and farms to the sea, not neighbouring inland areas to each other."],
      ["The coast is the only flat land on which railways can be built", "Railways run across many inland plateaus, including Zimbabwe's highveld."],
      ["Neighbouring countries had nothing that could be carried by rail", "Neighbours produce many goods; the lines were simply planned for export."],
      ["Trains cannot cross the borders between African countries", "Many lines cross borders, for example at Victoria Falls and Beitbridge."],
    ],
    answer: "A",
    hints: ["Think about when and why the railways were built."],
    explanation: "The export-oriented pattern explains the 'tree' shape of many African networks and the lack of cross-border links.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a **one-stop border post** reduce delays for lorries?",
    options: [
      ["Officials of both countries clear the lorry at one place", "Correct: the driver stops once instead of being checked separately on each side of the border."],
      ["Lorries no longer need any documents to cross", "Documents are still needed; they are simply checked in one place."],
      ["The border is open only to lorries, not to cars", "One-stop posts serve all traffic; they combine the checks."],
      ["Lorries must unload all their goods for inspection", "Unloading everything would increase delays, not reduce them."],
    ],
    answer: "A",
    explanation: "Combining both countries' customs and immigration checks in one place saves time; Chirundu, between Zimbabwe and Zambia, works this way.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nodes Q, R and T each need 7 links in total to reach every other node on a network; node P needs 11. What does this show?",
    options: [
      ["P is the least accessible node on the network", "Correct: P needs the most links to reach the other nodes, so it is hardest to reach."],
      ["P is the most accessible node on the network", "A higher total means the node is further, in links, from the rest of the network."],
      ["P has the largest population on the network", "Accessibility totals say nothing about population."],
      ["P is joined directly to every other node", "If it were, its total would be the lowest possible, not the highest."],
    ],
    answer: "A",
    hints: ["A low total means few links are needed to reach everywhere else."],
    explanation: "In a shortest-path count, the lowest total marks the most accessible node and the highest total the least accessible.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A detour index can be less than 100.",
    answer: false,
    explanation: "False. No route can be shorter than the straight line between two places, so the actual distance is always at least the straight-line distance and the index is 100 or more.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Chirundu border post links Zimbabwe with Zambia across the Zambezi River.",
    answer: true,
    explanation: "True. Chirundu is on the Zambezi on the route from Harare to Lusaka, part of the North–South corridor.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Zimbabwean border post with the neighbouring country it leads to.",
    pairs: [
      ["Beitbridge", "South Africa"],
      ["Chirundu", "Zambia"],
      ["Forbes (near Mutare)", "Mozambique"],
      ["Plumtree", "Botswana"],
    ],
    explanation: "Beitbridge crosses the Limpopo to South Africa; Chirundu crosses the Zambezi to Zambia; Forbes leads to Mozambique and Beira; Plumtree leads to Botswana.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "The beta index is the number of {{blank:a}} divided by the number of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["links"], choices: ["links", "nodes", "kilometres", "vehicles"] },
      { id: "b", accepted: ["nodes"], choices: ["links", "nodes", "kilometres", "vehicles"] },
    ],
    explanation: "β = links (edges) ÷ nodes (vertices). More links per node means better connectivity.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A rail network has 8 nodes and 9 links (fictional). Calculate its beta index. Give your answer to two decimal places.",
    value: 1.125, answer: "1.13", tol: 0.006,
    wrong: [0.89, 72],
    explanation: "β = links ÷ nodes = 9 ÷ 8 = 1.125, which rounds to 1.13 (1.12 is also accepted). Above 1, so there are circuits.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Two towns are 90 km apart in a straight line. The road between them is 117 km long (fictional). Calculate the detour index.",
    value: 130, tol: 0.5,
    wrong: [77, 27],
    explanation: "Detour index = 117 ÷ 90 × 100 = 130. The road is 30% longer than the straight line.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A network has 8 nodes and 10 links and is all joined together (fictional). Calculate the **cyclomatic number** (links − nodes + 1).",
    value: 3,
    wrong: [2, 1.25],
    hints: ["Substitute: 10 − 8 + 1."],
    explanation: "Cyclomatic number = 10 − 8 + 1 = 3, so the network contains three independent circuits.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "mm",
    stem: "On a flow-line diagram, 1 mm represents 200 vehicles per day. How wide should the band be for a road carrying 3,600 vehicles per day?",
    value: 18,
    wrong: [720000, 180],
    explanation: "3,600 ÷ 200 = 18 mm.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Zimbabwe's main links to seaports in neighbouring countries.",
    points: [
      "Beira corridor: road, rail and fuel pipeline from Harare/Mutare to Beira in Mozambique.",
      "Road and rail south through Beitbridge across the Limpopo to South African ports (for example Durban).",
      "Rail from the south-east of Zimbabwe to Maputo in Mozambique.",
      "Links north/west through Chirundu or Victoria Falls to Zambia (and on to Dar es Salaam via TAZARA) or through Botswana via Plumtree.",
    ],
    modelAnswer: "The shortest route to the sea is the Beira corridor, with road, rail and the fuel pipeline from Mutare. Road and rail also run south through Beitbridge to South African ports such as Durban, and a railway runs from the south-east to Maputo. Routes north through Chirundu and Victoria Falls link to Zambia and on to Dar es Salaam.",
    explanation: "Name the corridor, the mode and the port for each mark.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest how **one** named transport problem in Zimbabwe could be reduced, and explain how the solution would help.",
    hints: ["Choose one problem: border delays, poor roads, old rolling stock or urban congestion."],
    points: [
      "Names a specific problem (for example long queues of lorries at Beitbridge, potholed roads, a shortage of working locomotives, congestion in Harare).",
      "Gives a matching solution (one-stop border post / electronic pre-clearance, road rehabilitation or dualisation with toll funds, new rolling stock, large buses and ring roads).",
      "Explains how the solution helps (less waiting time and cost, fewer accidents, more freight back on rail, faster commuter trips).",
    ],
    modelAnswer: "Lorries wait for days at Beitbridge. A one-stop border post with electronic pre-clearance would let officials of both countries clear each lorry once, cutting waiting time and the cost of goods.",
    explanation: "A full answer links problem, solution and effect.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "A fictional district has six towns, P, Q, R, S, T and U, joined by seven roads: P–Q, Q–R, R–S, Q–T, T–U, R–T and S–U.\n\nTable 1 shows the fewest links needed to travel from each town to every other town.\n\n| From | P | Q | R | S | T | U | Total |\n|---|---|---|---|---|---|---|---|\n| P | 0 | 1 | 2 | 3 | 2 | 3 | 11 |\n| Q | 1 | 0 | 1 | 2 | 1 | 2 | 7 |\n| R | 2 | 1 | 0 | 1 | 1 | 2 | 7 |\n| S | 3 | 2 | 1 | 0 | 2 | 1 | 9 |\n| T | 2 | 1 | 1 | 2 | 0 | 1 | 7 |\n| U | 3 | 2 | 2 | 1 | 1 | 0 | 9 |",
    hints: ["Count links and nodes carefully.", "A lower total in Table 1 means a more accessible town."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the beta index of the network. Give your answer to two decimal places.", value: 1.1666666666666667, answer: "1.17", tol: 0.005, wrong: [0.86], explanation: "β = 7 links ÷ 6 nodes = 1.17." }),
      P.num({ label: "(b)", stem: "Calculate the cyclomatic number (links − nodes + 1).", value: 2, wrong: [1], explanation: "7 − 6 + 1 = 2 circuits." }),
      P.mcq({
        label: "(c)", stem: "Which town is the **least** accessible?",
        options: [
          ["P", "Correct: it has the highest total (11 links)."],
          ["Q", "Q has one of the lowest totals (7), so it is among the most accessible."],
          ["S", "S has a total of 9, lower than P."],
          ["T", "T has one of the lowest totals (7)."],
        ],
        answer: "A", explanation: "The highest total in the shortest-path table marks the least accessible node.",
      }),
      P.num({ label: "(d)", stem: "A new road is built between P and U. Calculate the new beta index. Give your answer to two decimal places.", value: 1.3333333333333333, answer: "1.33", tol: 0.005, wrong: [1.17, 1.14], explanation: "Links become 8 and nodes stay 6: 8 ÷ 6 = 1.33." }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain **two** benefits of the new road for the people of town P.",
        points: ["P becomes more accessible: fewer links / a shorter route to U and S, so journeys are quicker and cheaper.", "There is an alternative route if the P–Q road is blocked or damaged / easier access to services, markets or jobs in U and S."],
        modelAnswer: "People in P can reach U directly instead of travelling through Q and T, saving time and fares. If the road to Q floods, they still have another way out of the town.",
        explanation: "Higher connectivity means shorter journeys and alternative routes.",
      }),
    ],
    explanation: "This item practises the beta index, the cyclomatic number and a shortest-path accessibility table.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 660,
    stem: "Table 2 shows traffic counts on four roads leading into a fictional town on a weekday (fictional data).\n\n| Road | From the north | From the east | From the south | From the west |\n|---|---|---|---|---|\n| Vehicles per day | 4,800 | 2,200 | 6,400 | 1,600 |",
    hints: ["Divide each count by the scale value.", "Think about where the lorries and commuters are going."],
    parts: [
      P.num({ label: "(a)", unit: "mm", stem: "On a flow-line diagram with a scale of 1 mm to 400 vehicles per day, how wide should the band for the southern road be?", value: 16, wrong: [2560000, 160], explanation: "6,400 ÷ 400 = 16 mm." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of all the traffic that uses the northern road.", value: 32, tol: 0.05, wrong: [48], explanation: "Total = 4,800 + 2,200 + 6,400 + 1,600 = 15,000; 4,800 ÷ 15,000 × 100 = 32%." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** reasons why the southern road is the busiest.",
        points: ["It may lead to a larger town, a border post or the main trunk road / national highway.", "It may serve the main industrial area, a mine or the residential suburbs where commuters live."],
        modelAnswer: "The southern road may join the main highway to a border post, carrying many lorries, and it may also lead to the largest suburbs, so commuters use it every day.",
        explanation: "Traffic flows reflect the size and function of the places a road connects.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe **three** problems that heavy traffic on the southern road could cause and suggest a solution for one of them.",
        points: ["Congestion and delays at peak hours.", "Accidents, noise or air pollution / damage to the road surface by heavy lorries.", "A matching solution, such as a bypass for through lorries, road widening, traffic lights or a weighbridge."],
        modelAnswer: "There will be queues at rush hour, more accidents and potholes caused by heavy lorries. A bypass would take through lorries around the town, reducing congestion and road damage.",
        explanation: "Problems and solutions must match.",
      }),
    ],
    explanation: "Flow-line widths are proportional to traffic; the busiest routes link the largest and most important places.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the problems of transport in Zimbabwe and evaluate possible solutions.",
    hints: ["Cover roads, rail, border posts and urban transport.", "Judge which solutions would help most."],
    points: [
      "Road problems: potholes and narrow roads, many accidents, overloaded lorries damaging roads.",
      "Rail problems: shortage of working locomotives and wagons, slow and unreliable services, freight lost to road.",
      "Border and corridor problems: long delays at busy border posts such as Beitbridge raise costs for a landlocked country.",
      "Urban problems: congestion and unreliable commuter transport in Harare and other towns.",
      "Solutions evaluated: road rehabilitation and dualisation funded by tolls; new rolling stock; one-stop border posts; large buses, commuter trains and ring roads; weighbridges.",
      "Judgement: solutions need large investment and maintenance; combining rail investment with faster border clearance would help most / a reasoned priority.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Many roads are potholed and narrow, and heavy, sometimes overloaded lorries make them worse and cause accidents. The railway has too few working locomotives and wagons, so freight has moved to road. Lorries can wait a long time at Beitbridge, adding to the cost of imports and exports. In towns, commuters face congestion and unreliable kombis. Rehabilitating and dualising main roads, funded partly by tolls, makes travel safer but is expensive and needs constant maintenance. One-stop border posts like Chirundu cut waiting times at low cost. New rolling stock would move bulky freight back to rail and protect the roads. Large buses and ring roads ease urban congestion. The most effective approach combines faster border clearance with investment in rail, because both lower the cost of trade for a landlocked country.",
    explanation: "Discuss problems for several modes, then weigh up solutions and end with a reasoned judgement.",
  });

  b.card("DEFINITION", "**Node** and **link**", "A node is a place where routes meet or end; a link is a direct route between two nodes.", undefined);
  b.card("FACT", "Beta index", "β = links ÷ nodes. Below 1: branching network; about 1: one circuit; above 1: well connected.", undefined);
  b.card("FACT", "Detour index", "Actual route distance ÷ straight-line distance × 100. 100 is perfectly direct.", undefined);
  b.card("FACT", "Cyclomatic number", "Links − nodes + 1: the number of circuits in a connected network.", undefined);
  b.card("DEFINITION", "**Flow-line diagram**", "A map whose route bands are drawn with widths proportional to the traffic they carry.", undefined);
  b.card("CONCEPT", "Zimbabwe's routes to the sea", "Beira corridor (road, rail, pipeline via Mutare); Beitbridge to South African ports; rail to Maputo.", undefined);
  b.card("FACT", "Bulawayo", "Zimbabwe's main railway junction and headquarters of the National Railways of Zimbabwe.", undefined);
  b.card("DEFINITION", "**One-stop border post**", "A border post where both countries' officials clear travellers and goods in one place, reducing delays.", "Chirundu, Zimbabwe–Zambia.");
  b.card("CONCEPT", "Why African railways run to the coast", "They were built to carry minerals and crops to ports for export, so there are few cross-border links.", undefined);
});
