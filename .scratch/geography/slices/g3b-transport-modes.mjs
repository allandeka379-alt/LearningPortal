// Slice G3b: modes of transport (ZIMSEC 7.12.1).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.transport.modes", { file: "transport/modes", keyPrefix: "transport.modes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mode of transport is best suited to moving **petrol and diesel** continuously from a port to an inland depot?",
    options: [
      ["Pipeline", "Correct: pipelines carry liquids and gases in a continuous flow at a very low running cost."],
      ["Air freight", "Aircraft carry small loads at high cost; they are not used to supply fuel in bulk."],
      ["Ox-drawn scotch cart", "A scotch cart carries very small loads over short distances."],
      ["Passenger kombi", "Kombis carry people, not bulk fuel."],
    ],
    answer: "A",
    explanation: "Pipelines suit fluids such as fuel, oil, gas and water. Fuel for Zimbabwe travels by pipeline from Beira in Mozambique to Feruka near Mutare.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mode of transport is the **fastest** for passengers travelling between continents?",
    options: [
      ["Air", "Correct: aircraft are by far the fastest mode over long distances."],
      ["Rail", "Trains are slower than aircraft and cannot cross oceans."],
      ["Sea", "Ships are the slowest of the main modes."],
      ["Road", "Road vehicles are slow over long distances and cannot cross oceans."],
    ],
    answer: "A",
    explanation: "Air transport is the fastest mode, which is why it is used for long-distance passengers and urgent, valuable or perishable goods.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which cargo is most suitable for **rail** transport?",
    options: [
      ["Coal from Hwange to a distant power station", "Correct: coal is heavy and bulky, and rail carries large loads cheaply over long distances."],
      ["Fresh cut flowers for a market in Europe", "Flowers are perishable and light, so they go by air."],
      ["A parcel of medicine to a rural clinic", "A small, urgent delivery to one place suits road transport, which reaches the door."],
      ["Diesel fuel from Beira to Feruka depot", "Fuel on this route travels by pipeline."],
    ],
    answer: "A",
    explanation: "Rail suits heavy, bulky, low-value goods (coal, chrome, fertiliser, grain) moved in large quantities over long distances.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **road** transport the most common way of moving goods short distances in Zimbabwe?",
    options: [
      ["Lorries can deliver from door to door without transfers", "Correct: roads reach farms, shops and villages directly, so no loading onto another mode is needed."],
      ["Lorries carry larger loads than goods trains can", "A goods train carries far more than a lorry."],
      ["Road transport uses less fuel per tonne than rail", "Road uses more fuel per tonne than rail."],
      ["Roads never need repair once they are tarred", "Roads need constant maintenance, especially under heavy lorries."],
    ],
    answer: "A",
    explanation: "Flexibility and door-to-door delivery, with low terminal costs, make road the cheapest and most convenient mode over short distances.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of a **terminal cost**?",
    options: [
      ["Hiring a crane to load containers onto wagons", "Correct: loading and unloading costs are paid at the terminals, however long the journey."],
      ["Diesel used by a locomotive on the line", "Fuel use rises with distance, so it is a line-haul cost."],
      ["Wages paid to a lorry driver for each hour driven", "Driving wages rise with journey length, so they are line-haul costs."],
      ["Wear on a lorry's tyres during the journey", "Tyre wear increases with distance travelled, a line-haul cost."],
    ],
    answer: "A",
    explanation: "Terminal costs are fixed costs at the start and end (loading, unloading, stations, ports). Line-haul costs grow with distance (fuel, wages, wear).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Over which journey is **sea** transport most likely to be the cheapest mode?",
    options: [
      ["Moving 50,000 tonnes of iron ore from Africa to China", "Correct: very large, bulky loads over very long distances are cheapest by sea because line-haul costs per tonne are lowest."],
      ["Moving 2 tonnes of vegetables from Mutoko to Harare", "A short inland journey with a small load suits road."],
      ["Moving 200 commuters from Chitungwiza to Harare", "Commuters travel short distances by bus, kombi or train."],
      ["Moving 5 tonnes of mail from Harare to Bulawayo", "This is an inland trip between cities; road or rail is used."],
    ],
    answer: "A",
    hints: ["Think about load size and distance.", "Which mode has the lowest line-haul cost per tonne?"],
    explanation: "Ships have high terminal (port) costs but the lowest line-haul costs, so they are cheapest for very large loads over very long distances.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph of total cost against distance shows the road line starting **lower** but rising **more steeply** than the rail line. What does this show?",
    options: [
      ["Road is cheaper for short journeys, rail for long ones", "Correct: road has lower terminal costs but higher line-haul costs, so the lines cross at a break-even distance."],
      ["Road is cheaper than rail over every distance", "Because the road line rises more steeply, it eventually rises above the rail line."],
      ["Rail is cheaper than road over every distance", "At short distances the road line is lower, so road is cheaper there."],
      ["Road and rail cost the same over every distance travelled", "The lines have different starting points and slopes, so costs differ except where they cross."],
    ],
    answer: "A",
    hints: ["The starting point of each line shows terminal costs.", "The slope shows the cost added for each extra kilometre."],
    explanation: "The intercept of each line is the terminal cost and the slope is the line-haul cost per km. Lower intercept but steeper slope means road wins at short range and rail at long range.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is **containerisation**?",
    options: [
      ["Carrying goods in standard steel boxes moved between ship, rail and road", "Correct: standard containers can be transferred between modes without unpacking."],
      ["Storing grain in large concrete silos at a railway depot before it is loaded onto wagons", "This is storage, not a method of carrying goods."],
      ["Moving liquids through a closed system of steel pipes", "This describes pipeline transport."],
      ["Packing perishable goods in ice for air freight", "This is a way of keeping goods fresh, not containerisation."],
    ],
    answer: "A",
    explanation: "Containers save time and reduce theft and damage, because the goods stay sealed in the same box from start to finish.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A horticulture farm near Harare exports fresh green beans to supermarkets in Europe. Which transport chain is most suitable?",
    options: [
      ["Refrigerated lorry to the airport, then air freight", "Correct: the beans are perishable and valuable, so they need the speed of air with cold road transport to the airport."],
      ["Lorry to Beitbridge, then rail to Durban and a ship", "Rail and sea would take weeks, and the beans would spoil."],
      ["Rail from Harare to Beira, then a bulk cargo ship", "Too slow for fresh produce."],
      ["Ox-drawn cart to Harare market, then a bus to Europe", "Buses cannot carry goods to Europe, and the trip would be far too slow."],
    ],
    answer: "A",
    hints: ["How long do fresh vegetables stay fresh?", "Which mode is fastest over long distances?"],
    explanation: "Perishable, high-value goods justify the high cost of air freight; a refrigerated lorry links the farm to the airport.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe is a **landlocked** country, so its overseas trade must pass through neighbouring countries to reach a seaport.",
    answer: true,
    explanation: "True. Zimbabwe has no coastline; its goods reach the sea through ports such as Beira, Maputo and Durban.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Pipelines are cheap to build but expensive to run.",
    answer: false,
    explanation: "False. It is the other way round: pipelines are very expensive to build but cheap to run, because the fluid flows continuously with few workers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cargo or journey with the most suitable mode of transport.",
    pairs: [
      ["Natural gas from a gas field to a city", "Pipeline"],
      ["A tourist flying from London to Victoria Falls", "Air"],
      ["Chrome ore from the Great Dyke to a port", "Rail"],
      ["Maize meal from a mill to rural shops", "Road"],
    ],
    explanation: "Fluids by pipeline; long-distance passengers by air; bulky ore by rail; short, door-to-door deliveries by road.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Costs such as loading and unloading, which do not change with distance, are {{blank:a}} costs. Costs such as fuel, which rise with every kilometre, are {{blank:b}} costs.",
    blanks: [
      { id: "a", accepted: ["terminal"], choices: ["terminal", "line-haul", "variable", "transfer"] },
      { id: "b", accepted: ["line-haul"], choices: ["terminal", "line-haul", "fixed", "transfer"] },
    ],
    explanation: "Total transport cost = terminal costs (fixed) + line-haul costs (rise with distance).",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A goods train carries 1,200 tonnes of coal. A lorry carries 30 tonnes (fictional figures). How many lorry loads would be needed to carry the same amount of coal?",
    value: 40,
    wrong: [36000, 1170],
    explanation: "1,200 ÷ 30 = 40 lorry loads. This shows why rail suits bulky goods: one train replaces many lorries.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "h", daily: true,
    stem: "A bus travels 440 km between two towns at an average speed of 80 km/h (fictional figures). How long does the journey take, in hours?",
    value: 5.5, tol: 0.05,
    wrong: [35200, 0.18],
    explanation: "Time = distance ÷ speed = 440 ÷ 80 = 5.5 hours (5 hours 30 minutes).",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A company must move 800 tonnes of fertiliser 350 km. Road costs US\\$0.10 per tonne-km. Rail costs US\\$0.06 per tonne-km plus a fixed loading charge of US\\$3,000 (fictional rates). How many US dollars does the company **save** by using rail?",
    value: 8200,
    wrong: [9200, 28000, 19800],
    hints: ["Cost = tonnes × km × rate.", "Remember to add the fixed charge to the rail cost only."],
    workedSolution: "1. Road: 800 × 350 × 0.10 = US\\$28,000.\n2. Rail: 800 × 350 × 0.06 = US\\$16,800; plus US\\$3,000 = US\\$19,800.\n3. Saving = 28,000 − 19,800 = US\\$8,200.",
    explanation: "Road costs US\\$28,000 and rail US\\$19,800, so rail saves US\\$8,200.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** advantages and **two** disadvantages of rail transport in Zimbabwe.",
    points: [
      "Advantage: carries large, heavy loads (for example coal, chrome, fertiliser) in one train.",
      "Advantage: cheaper per tonne / uses less fuel per tonne than road over long distances, or reduces lorries on the roads.",
      "Disadvantage: fixed routes, so goods often need a lorry at one or both ends (extra transfer cost and time).",
      "Disadvantage: high cost of building and maintaining track, wagons and signals / slower and less flexible than road.",
    ],
    modelAnswer: "Rail can carry over a thousand tonnes of coal or chrome in one train, and it is cheaper per tonne than road over long distances. However, it only runs on fixed lines, so goods must be transferred to lorries, and the track and wagons are expensive to maintain.",
    explanation: "Each advantage or disadvantage needs a reason, not just a word such as 'cheap' or 'slow'.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why much freight in Zimbabwe that once travelled by rail is now carried by road.",
    hints: ["Think about flexibility and door-to-door delivery.", "Think about the condition of equipment."],
    points: [
      "Road gives door-to-door delivery with no transfers, saving time and handling.",
      "Lorries are flexible: they can leave when loaded and reach places without railway lines (farms, small mines, new towns).",
      "Rail has suffered from shortages of working locomotives and wagons / slow and unreliable services, so customers chose road.",
    ],
    modelAnswer: "Lorries collect from the factory and deliver to the customer without transfers, and they can leave whenever a load is ready. Many places have no railway siding. Rail services have also been slowed by a shortage of working locomotives and wagons, so businesses switched to road.",
    explanation: "The shift reflects road's flexibility and the problems of keeping an old rail network in good order.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 720,
    stem: "Table 1 shows the cost of moving one tonne of goods by road and by rail over different distances (fictional data).\n\n| Distance (km) | 50 | 100 | 150 | 200 | 300 |\n|---|---|---|---|---|---|\n| Road cost (US\\$ per tonne) | 7.00 | 12.00 | 17.00 | 22.00 | 32.00 |\n| Rail cost (US\\$ per tonne) | 10.50 | 13.00 | 15.50 | 18.00 | 23.00 |",
    hints: ["Compare the two rows column by column.", "Look at how much each cost rises for every extra 50 km."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate how much cheaper rail is than road, in US dollars per tonne, at 300 km.", value: 9, tol: 0.005, wrong: [55], explanation: "32.00 − 23.00 = US\\$9.00 per tonne." }),
      P.mcq({
        label: "(b)", stem: "Which is the **shortest distance in the table** at which rail is cheaper than road?",
        options: [
          ["150 km", "Correct: at 150 km rail costs US\\$15.50 and road US\\$17.00."],
          ["100 km", "At 100 km road (US\\$12.00) is still cheaper than rail (US\\$13.00)."],
          ["200 km", "Rail is cheaper here, but it is already cheaper at 150 km."],
          ["50 km", "At 50 km road (US\\$7.00) is much cheaper than rail (US\\$10.50)."],
        ],
        answer: "A", explanation: "The lines cross between 100 km and 150 km; 150 km is the first distance in the table where rail is cheaper.",
      }),
      P.num({ label: "(c)", unit: "km", stem: "Road costs rise by US\\$0.10 per tonne for every km and rail by US\\$0.05. Road costs US\\$2.00 per tonne at the start, rail US\\$8.00. At what distance do the two modes cost the same?", value: 120, tol: 1, wrong: [60, 100], explanation: "2 + 0.10d = 8 + 0.05d, so 0.05d = 6 and d = 120 km." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why rail costs more than road over short distances.",
        points: ["Rail has higher terminal costs (stations, sidings, loading equipment, shunting).", "Over a short journey there are too few kilometres for rail's lower line-haul cost to make up for the higher terminal cost."],
        modelAnswer: "Rail has high fixed costs for loading and shunting at stations. Over short trips these are spread over few kilometres, so road, with its low terminal costs, is cheaper.",
        explanation: "Terminal costs dominate short journeys; line-haul costs dominate long ones.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** reasons, other than cost, why a business might still choose road for a 250 km journey.",
        points: ["Speed or flexibility: the lorry leaves when the business wants / delivers door to door without waiting for a train.", "Access: the factory or customer has no railway siding, or the goods are fragile/perishable and need less handling."],
        modelAnswer: "The lorry can collect from the factory and deliver straight to the customer without unloading at stations, and it can leave the same day rather than waiting for a scheduled train.",
        explanation: "Reliability, speed, access and handling can matter more than a small saving in cost.",
      }),
    ],
    explanation: "This item practises reading a cost table, finding the break-even distance and explaining terminal and line-haul costs.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "A trader in a fictional town must choose how to send four consignments.\n\n| Consignment | Mass (tonnes) | Value | Distance (km) | Notes |\n|---|---|---|---|---|\n| W | 2,000 | Low | 600 | Crushed chrome ore |\n| X | 0.5 | High | 8,000 | Cut roses for an overseas market |\n| Y | 3 | Medium | 40 | Building materials to a rural school |\n| Z | Continuous flow | Medium | 280 | Diesel from a port |",
    hints: ["Think about bulk, perishability, access and the state of the cargo."],
    parts: [
      P.match({
        label: "(a)", stem: "Match each consignment with the most suitable mode.",
        pairs: [["W", "Rail"], ["X", "Air"], ["Y", "Road"], ["Z", "Pipeline"]],
        explanation: "Bulky ore by rail; perishable, valuable roses by air; a short rural delivery by road; continuous liquid flow by pipeline.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why air is the best choice for consignment X even though it is expensive.",
        points: ["The roses are perishable and would spoil on a slow journey.", "They are light and high in value, so the value can pay for the high cost of air freight."],
        modelAnswer: "Roses wilt within days, so only air is fast enough over 8,000 km, and because they are light and valuable the high freight charge is a small share of their price.",
        explanation: "Air suits light, high-value and perishable goods.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** disadvantages of pipeline transport.",
        points: ["Very high cost of building / laying the pipe.", "Carries only liquids or gases / fixed route / leaks or illegal tapping cause pollution and losses."],
        modelAnswer: "Pipelines are very expensive to build and can carry only fluids along one fixed route.",
        explanation: "Low running costs only pay off when large volumes flow for many years.",
      }),
    ],
    explanation: "Choosing a mode means matching it to the bulk, value, perishability and form of the cargo and to the distance.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Road transport is the most important mode of transport for Zimbabwe.\" To what extent do you agree? Refer to examples of the different modes.",
    hints: ["Give the case for road first, then the roles of rail, pipeline and air.", "End with a clear judgement."],
    points: [
      "Road carries most passengers (buses, kombis) and reaches farms, villages and small mines; door-to-door delivery.",
      "Road links Zimbabwe to neighbours and ports, for example through Beitbridge to South Africa.",
      "Rail remains important for bulky goods such as coal, chrome and fertiliser over long distances.",
      "The pipeline from Beira to Feruka carries fuel more cheaply and takes tankers off the roads.",
      "Air links the country to world markets for tourists and perishable exports such as flowers and horticultural produce.",
      "Judgement: road is the most used and most flexible mode, but the modes work together and no single mode meets all needs.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "I largely agree. Road carries most passengers in buses and kombis and most freight over short and medium distances, and it is the only mode that reaches most farms, villages and small mines. Much trade crosses Beitbridge by lorry. However, rail still moves bulky goods such as coal from Hwange and chrome more cheaply over long distances, the Beira to Feruka pipeline carries fuel without road tankers, and air links tourists and fresh produce to distant markets. Road is the most important single mode, but Zimbabwe needs all of them working together.",
    explanation: "A 'to what extent' answer gives both sides with examples and ends with a supported judgement.",
  });

  b.card("DEFINITION", "**Mode of transport**", "A type of transport: road, rail, air, water or pipeline.", undefined);
  b.card("DEFINITION", "**Terminal costs**", "Fixed costs at the start and end of a journey: loading, unloading, stations, ports and airports.", "They do not change with distance.");
  b.card("DEFINITION", "**Line-haul costs**", "Costs that rise with distance: fuel, wages and wear on vehicles.", undefined);
  b.card("CONCEPT", "Cost and distance", "Road is cheapest over short distances; rail over longer ones; sea over very long distances.", "Because terminal and line-haul costs differ.");
  b.card("CONCEPT", "Best uses of air transport", "Long-distance passengers and light, valuable or perishable goods such as cut flowers.", undefined);
  b.card("CONCEPT", "Best uses of rail", "Heavy, bulky goods (coal, chrome, fertiliser, grain) over long distances, and commuters.", undefined);
  b.card("FACT", "Fuel pipeline to Zimbabwe", "A pipeline carries fuel from the port of Beira in Mozambique to Feruka near Mutare.", undefined);
  b.card("DEFINITION", "**Containerisation**", "Carrying goods in standard steel boxes that move between ship, rail and lorry without unpacking.", undefined);
  b.card("DEFINITION", "**Landlocked**", "Having no coastline; Zimbabwe's sea trade passes through ports in neighbouring countries.", "For example Beira, Maputo and Durban.");
});
