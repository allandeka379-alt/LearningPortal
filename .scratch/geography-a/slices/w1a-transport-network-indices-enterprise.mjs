// W1a: transport.network-indices-enterprise (ZIMSEC Form 5). Illustrative networks and accounts; numbers computed in code.
import { concept, P, t, chk, table, betaIndex, gammaIndex, alphaIndex, cyclomatic, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const LINKS9 = ["A-B", "B-C", "C-D", "A-E", "B-F", "D-G", "E-F", "F-H", "G-H", "H-I", "E-I"];
const v9 = 9, e9 = 11;
chk(LINKS9.length, 11);
const rev = 2.5 * 15 * 6 * 25;
const costBus = 1080 + 800 + 450 + 300 + 1100;
chk(costBus, 3730);
const profitBus = rev - costBus;
const beBus = costBus / (2.5 * 6 * 25);

concept("ageo.transport.network-indices-enterprise", { file: "transport/network-indices-enterprise", keyPrefix: "transport.network-indices-enterprise" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a transport network, what is a node?",
    options: [
      ["A point where routes meet or end", "Correct: a town, junction or terminal."],
      ["A road or railway that joins two places", "That is a link (edge)."],
      ["The shortest route between two towns", "That is a path, not a node."],
      ["The length of the whole road network", "Length is a total of the links."],
    ],
    answer: "A",
    explanation: "Nodes (vertices) are the places connected by the network; links (edges) are the routes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A transport network has a beta index of 0.8. What does this show?",
    options: [
      ["It is tree-like or not fully connected", "Correct: beta below 1 means fewer links than nodes."],
      ["It has exactly one circuit in it", "Exactly one circuit gives a beta of 1."],
      ["It is fully connected, with many circuits", "Beta above 1 means circuits."],
      ["It has more links than it has nodes", "A beta below 1 means fewer links than nodes."],
    ],
    answer: "A",
    explanation: "Beta = links ÷ nodes. Below 1 the network is tree-like (or in separate parts); 1 means one circuit; above 1 means more complex.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a planar network?",
    options: [
      ["One with no links crossing except at nodes", "Correct: this is what makes the network planar."],
      ["One with all links the same length", "Link length does not decide planarity."],
      ["One with every node joined to every other", "A complete network is not necessarily planar."],
      ["One whose links form a single straight line", "A straight line is a very simple network."],
    ],
    answer: "A",
    explanation: "A planar network can be drawn on a flat surface without crossings except at nodes; the maximum number of links is 3(v − 2).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which new link would raise the connectivity of a province the most?",
    options: [
      ["One joining two towns linked by a long detour", "Correct: it adds a circuit and shortens journeys."],
      ["One built parallel to an existing tarred road", "A duplicate road adds little new connectivity."],
      ["One leading to a town that is already well linked", "This adds a link but little new access."],
      ["One that removes a junction from the whole network", "Removing nodes does not improve connectivity."],
    ],
    answer: "A",
    explanation: "The biggest gain comes from creating a new route between places that have poor links, shortening journeys and adding alternative routes.",
    hints: ["Which link adds a new route where there is none?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the following is a fixed cost for a minibus operator?",
    options: [
      ["Insurance and licence fees", "Correct: paid whether or not the vehicle runs."],
      ["Fuel used on each trip", "Fuel is a variable cost."],
      ["Tyres worn by the distance driven", "Tyre wear depends on distance, so it is variable."],
      ["Drivers' pay per trip", "Pay per trip varies with the trips made."],
    ],
    answer: "A",
    explanation: "Fixed costs do not change with the number of trips; variable costs rise with distance or number of trips.",
    hints: ["Does the cost change with the number of trips?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A new minibus operator's profit disappears when the fuel price rises sharply. Which response best reduces this risk?",
    options: [
      ["Review fares and keep vehicles well serviced", "Correct: this protects revenue and reduces fuel use."],
      ["Carry fewer passengers on each trip", "Fewer passengers reduces revenue."],
      ["Delay all vehicle servicing to save money", "Poor maintenance raises fuel use and risks breakdowns."],
      ["Use older vehicles with no insurance cover", "This increases rather than reduces risk."],
    ],
    answer: "A",
    explanation: "Operators manage fuel-price risk by reviewing fares and routes within regulations, maintaining vehicles for efficiency and keeping a reserve.",
    hints: ["Think of revenue and costs."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a cyclomatic number of 0 indicate?",
    options: [
      ["A tree network with no circuits", "Correct: e − v + p equals zero for a tree."],
      ["A network with exactly one circuit", "One circuit gives a cyclomatic number of 1."],
      ["A fully connected network", "A fully connected network has many circuits."],
      ["A network with no nodes", "A network must have nodes."],
    ],
    answer: "A",
    explanation: "A tree joins v nodes with v − 1 links, so e − v + 1 = 0: no independent circuits.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A network has 9 nodes and 14 links. Calculate the beta index to two decimal places.",
    value: betaIndex(14, 9), dp: 2,
    wrong: [0.64, 5],
    explanation: "Beta = e ÷ v = 14 ÷ 9 = 1.56. Dividing the other way gives 0.64.",
    hints: ["Divide links by nodes."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A connected network has 7 nodes and 11 links. Calculate the gamma index, $\gamma = e \div 3(v - 2)$, to three decimal places.`,
    value: gammaIndex(11, 7), dp: 3,
    wrong: [11 / 21, 0.524],
    explanation: t`The maximum number of links is $3(v - 2) = 3 \times 5 = 15$. $\gamma = 11 \div 15 = ${dpStr(gammaIndex(11, 7), 3)}$. Using $3v = 21$ gives 0.524.`,
    hints: ["Work out v − 2 first."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A connected network (p = 1) has 6 nodes and 9 links. Calculate the alpha index, $\alpha = (e - v + p) \div (2v - 5)$, to three decimal places.`,
    value: alphaIndex(9, 6), dp: 3,
    wrong: [4, 0.8],
    explanation: t`Numerator $= 9 - 6 + 1 = 4$; denominator $= 2 \times 6 - 5 = 7$. $\alpha = 4 \div 7 = ${dpStr(alphaIndex(9, 6), 3)}$.`,
    hints: ["Compute the numerator and denominator separately."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A map shows two separate road networks (p = 2) with 14 nodes and 17 links altogether. Calculate the cyclomatic number e − v + p.",
    value: cyclomatic(17, 14, 2),
    wrong: [3, 4],
    explanation: "e − v + p = 17 − 14 + 2 = 5 independent circuits. Forgetting p gives 3.",
    hints: ["p is the number of separate sub-networks."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding a link to a connected network always raises its beta index.",
    answer: true,
    explanation: "True. Beta = e ÷ v; adding a link increases e while v is unchanged.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why a network with a high alpha index is more resilient when a road is closed by flooding.",
    points: ["A high alpha index means many circuits (loops) in the network", "So there are alternative routes between most pairs of towns", "Traffic can divert around the closed road, whereas in a tree-like network a closed link cuts off places beyond it"],
    modelAnswer: "A high alpha index means the network has many circuits, so there are alternative routes between most pairs of towns. Traffic can divert around a closed road, whereas in a tree-like network a closed link cuts off the places beyond it.",
    explanation: "Circuits give alternative routes.",
    hints: ["What does a circuit give a traveller?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each index to its formula.",
    pairs: [
      ["Beta", "e ÷ v"],
      ["Gamma", "e ÷ 3(v − 2)"],
      ["Alpha", "(e − v + p) ÷ (2v − 5)"],
      ["Cyclomatic number", "e − v + p"],
    ],
    explanation: "e is the number of links, v the number of nodes and p the number of separate sub-networks.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Profit is {{blank:a}} minus total costs, and the break-even point is where revenue is {{blank:b}} total costs.",
    blanks: [
      { id: "a", accepted: ["revenue"], choices: ["revenue", "fares", "wages"] },
      { id: "b", accepted: ["equal to"], choices: ["equal to", "greater than", "less than"] },
    ],
    explanation: "Profit = revenue − costs; at break-even, revenue equals costs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a network drawn so that no links cross except at nodes?",
    accepted: ["planar", "planar network", "planar graph"],
    wrong: ["tree", "dendritic"],
    explanation: "A **planar** network has no crossing links apart from at nodes.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a network with a higher beta index is better connected.",
    points: ["Beta is the ratio of links to nodes, so a higher value means more links per node", "More links means more circuits and alternative routes", "So journeys can be shorter or can avoid a blocked road"],
    modelAnswer: "A higher beta index means more links for each node, which creates more circuits and alternative routes. Journeys can therefore be shorter or can avoid a blocked road, so the network is better connected.",
    explanation: "Links per node, circuits, benefits.",
    hints: ["What does a link per node ratio show?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Distinguish between fixed and variable costs for a bus company, giving an example of each.",
    points: ["Fixed costs do not change with the number of trips (e.g. insurance, licences, loan repayments)", "Variable costs change with distance or trips (e.g. fuel, tyres, maintenance)", "Both must be covered by revenue for the business to make a profit"],
    modelAnswer: "Fixed costs such as insurance, licences and loan repayments do not change with the number of trips, while variable costs such as fuel and tyres change with the distance driven. Both must be covered by fares for the company to make a profit.",
    explanation: "Definition and example of each.",
    hints: ["Which costs are paid even when the bus is parked?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two risks facing a new rural minibus business and a way of reducing each.",
    points: ["Poor road conditions damage the vehicle: choose a robust vehicle, maintain it regularly, and avoid the worst routes in the rains", "Rising fuel prices: monitor costs, adjust fares within regulations and keep vehicles efficient", "Competition from other operators: offer a reliable timetable and good service", "Low demand in off-peak periods: adapt the timetable and carry goods"],
    modelAnswer: "Poor roads may damage the vehicle, which can be reduced by choosing a robust vehicle and servicing it regularly. Rising fuel prices can be managed by adjusting fares within regulations and keeping the vehicle efficient.",
    explanation: "Two risks, each with a response.",
    hints: ["Think of what could reduce revenue or raise costs."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The road network among nine towns (A to I) in a district has these ${e9} links: ${LINKS9.join(", ")} (illustrative data). The network is connected (p = 1).`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the beta index to two decimal places.", value: betaIndex(e9, v9), dp: 2, wrong: [0.82, 11], explanation: "β = 11 ÷ 9 = 1.22." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the gamma index to three decimal places.", value: gammaIndex(e9, v9), dp: 3, wrong: [0.407, 1.222], explanation: "3(v − 2) = 21; γ = 11 ÷ 21 = 0.524." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "Calculate the alpha index to three decimal places.", value: alphaIndex(e9, v9), dp: 3, wrong: [0.846, 3], explanation: "α = (11 − 9 + 1) ÷ (2 × 9 − 5) = 3 ÷ 13 = 0.231." }),
      P.num({ label: "(d)", marks: 1, stem: "State the cyclomatic number.", value: cyclomatic(e9, v9), wrong: [2, 11], explanation: "e − v + p = 11 − 9 + 1 = 3." }),
      P.manual({ label: "(e)", marks: 2, stem: "Interpret the beta and gamma values.", points: ["Beta above 1 shows the network has several circuits (about 1.2 links per node)", "Gamma about 0.52 means roughly half the maximum possible links exist, so there is scope to improve connectivity"], modelAnswer: "Beta is above 1, so the network has several circuits. Gamma is about 0.52, so roughly half of the possible links exist, meaning there is room to improve connectivity." }),
      P.manual({ label: "(f)", marks: 3, stem: "Suggest one new link that would improve connectivity and justify your choice.", points: ["Name a link between nodes not now joined (e.g. C-F, D-H or A-F)", "It would create a new circuit or shorten journeys between places that now need a long detour", "Consider cost/benefit: shorter journeys, access for isolated towns or alternative routes if a road is flooded"], modelAnswer: "A link between C and F would create a new circuit, because journeys between C and F now have to go through B. It would shorten those journeys and give an alternative route if one road is flooded, and the benefit would be weighed against its cost." }),
    ],
    explanation: "Beta, gamma, alpha and cyclomatic calculations followed by interpretation and a recommendation.",
    hints: ["Count the nodes and links: v = 9, e = 11."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A minibus runs between two rural centres. Fare: US\$2.50 one way. Average 15 passengers per trip, 6 one-way trips a day, 25 working days a month. Monthly costs (US dollars): fuel 1080, wages 800, maintenance 450, insurance and licences 300, loan repayment 1100 (illustrative data).`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the monthly revenue, in US dollars.", value: rev, wrong: [225, 3730], explanation: "2.50 × 15 × 6 × 25 = 5 625." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the monthly profit, in US dollars.", value: profitBus, wrong: [5625, 3730], explanation: "Total costs = 1 080 + 800 + 450 + 300 + 1 100 = 3 730; profit = 5 625 − 3 730 = 1 895." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "What is the smallest whole number of passengers per trip needed to cover all the costs?", value: 10, wrong: [9, 15], explanation: "Break-even = 3 730 ÷ (2.50 × 6 × 25) = 9.95, so at least 10 passengers per trip are needed." }),
      P.manual({ label: "(d)", marks: 2, stem: "Identify one risk to this business and suggest a response.", points: ["A valid risk (fuel price rise, breakdowns on poor roads, competition, fewer passengers)", "A matching response (adjust fares within regulations, regular maintenance, better service or timetable)"], modelAnswer: "A risk is a rise in fuel prices, which could be met by regular servicing to keep the vehicle efficient and by reviewing fares within the regulations." }),
    ],
    explanation: "Revenue, profit and break-even for a small transport business.",
    hints: ["Add all the monthly costs before finding profit."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how far connectivity indices are useful for deciding where to build new roads in a province. [8]",
    points: [
      "Simple to calculate from the numbers of nodes and links",
      "Allow networks to be compared (two provinces, or the same province before and after a new road)",
      "Show how much a proposed link would raise connectivity (change in beta, gamma and alpha)",
      "Treat every link and node as equal, ignoring distance, road quality, traffic and population served",
      "Ignore physical barriers (rivers, mountains), cost and environmental effects",
      "Do not show which links serve most people or have most economic benefit",
      "Judgement: useful as a first screening tool for connectivity, but decisions also need traffic counts, cost-benefit analysis and community needs",
      "Social aspects, such as access to clinics and schools for remote areas, may justify a link even where an index changes little",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Connectivity indices are simple to calculate from the number of nodes and links and allow different provinces, or the same province before and after a new road, to be compared. The change in beta, gamma and alpha shows how much a proposed link would improve connectivity. However, they treat all links and nodes as equal, ignoring distance, road quality, traffic and the number of people served, and they do not take account of rivers, cost or environmental effects. A road to a remote clinic might raise the index very little yet bring large social benefit. Overall the indices are a useful first screening tool, but decisions need traffic counts, cost-benefit analysis and the needs of communities as well.",
    wordLimit: { max: 300 },
    explanation: "Strengths, limitations and a supported judgement.",
    hints: ["What do the indices count, and what do they ignore?"],
  });

  b.card("DEFINITION", "Node and link?", "Node (vertex): a point where routes begin, end or meet. Link (edge): a route joining two nodes.");
  b.card("FORMULA", "Beta index?", t`$\beta = e \div v$`, "Below 1: tree or disconnected. 1: one circuit. Above 1: several circuits.");
  b.card("FORMULA", "Gamma index?", t`$\gamma = e \div 3(v - 2)$`, "Actual links as a share of the maximum possible in a planar network.");
  b.card("FORMULA", "Alpha index?", t`$\alpha = (e - v + p) \div (2v - 5)$`, "Circuits as a share of the maximum possible circuits.");
  b.card("FORMULA", "Cyclomatic number?", t`$e - v + p$`, "The number of independent circuits; p = number of separate sub-networks.");
  b.card("FACT", "Maximum links in a planar network?", t`$3(v - 2)$`);
  b.card("CONCEPT", "Fixed and variable transport costs?", "Fixed: insurance, licences, loan repayments. Variable: fuel, tyres, maintenance and wages that vary with trips.");
  b.card("FORMULA", "Revenue, profit and break-even for a bus?", "Revenue = fare × passengers × trips. Profit = revenue − costs. Break-even passengers = costs ÷ (fare × trips).");
  b.card("CONCEPT", "Risks for a transport business?", "Fuel prices, poor roads, breakdowns, competition, accidents, fare regulation and changes in demand.");
});
