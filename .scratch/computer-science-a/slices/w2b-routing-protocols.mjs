// Slice w2b: routing protocols RIP and OSPF (acs.network.routing-protocols, ZIMSEC only).
import { concept, P, chk, same, mdTable, dijkstra, pathTo } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";

const edges = [["P", "Q", 20], ["Q", "T", 20], ["P", "R", 5], ["R", "S", 5], ["S", "T", 5], ["T", "U", 10]];
const mk = (cost) => { const g = {}; for (const [a, c, w] of edges) { (g[a] ??= {})[c] = cost ? w : 1; (g[c] ??= {})[a] = cost ? w : 1; } return g; };
const rip = dijkstra(mk(false), "P");
const ospf = dijkstra(mk(true), "P");
same(pathTo(rip.prev, "P", "U"), ["P", "Q", "T", "U"]);
chk(rip.dist.U, 3);
same(pathTo(ospf.prev, "P", "U"), ["P", "R", "S", "T", "U"]);
chk(ospf.dist.U, 25);
chk(20 + 20 + 10, 50);
const linkTable = mdTable(["Link", "OSPF cost"], edges.map((e) => [`${e[0]} - ${e[1]}`, e[2]]));

concept("acs.network.routing-protocols", { file: "network/routing-protocols", keyPrefix: "network.routing-protocols" }, (b) => {
  mc(b, 1, "RECALL", "What metric does the Routing Information Protocol (RIP) use?",
    ["The number of hops", "Correct."],
    [["The bandwidth of the link", "Bandwidth-based cost is used by OSPF."], ["The length of the cable in metres", "RIP does not measure the length of a cable."], ["The number of users on the network", "The number of users is not a routing metric."]],
    "RIP counts routers (hops).");
  mc(b, 2, "RECALL", "What is the largest number of hops that RIP allows for a reachable route?",
    ["15", "Correct: 16 means unreachable."],
    [["8", "The limit is higher than 8."], ["16", "A route of 16 hops is treated as unreachable."], ["255", "The limit is much smaller than 255."]],
    "RIP allows at most 15 hops.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What type of protocol is OSPF?",
    ["Link-state", "Correct: each router has a map of the network."],
    [["Distance-vector", "That is RIP."], ["Static", "Static routes are set by hand, not by a protocol."], ["Application-layer", "OSPF is a routing protocol, not an application protocol such as HTTP."]],
    "OSPF is link-state.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is meant by dynamic routing?",
    ["Routers learn and update routes automatically using a protocol", "Correct."],
    [["An administrator types every route into each router by hand each time", "That describes static routing."], ["Packets always take the same route", "Dynamic routing allows the route to change."], ["Routers do not use routing tables", "All routers use routing tables."]],
    "Routers exchange information so that the tables change when the network changes.");
  mc(b, 3, "ANALYSIS", "Which is a weakness of RIP?",
    ["It ignores the speed of the links when choosing a route", "Correct: it counts hops only."],
    [["It needs all the routers to build a full map of the whole network", "That is how OSPF works."], ["It sends an update only when a link fails", "RIP also sends its table at regular intervals."], ["It uses areas to divide large networks", "Areas belong to OSPF."]],
    "A short route over slow links can be chosen.", { hints: ["What does RIP measure?"] });
  mc(b, 3, "UNDERSTANDING", "In OSPF what is stored in the link-state database?",
    ["The state and cost of the links of all the routers in the area", "Correct: it gives each router a map."],
    [["The web pages recently visited by users", "Routers do not store web pages in the database."], ["Only the hop count from the router to each of its direct neighbours", "Hop count is the RIP metric."], ["The user names and passwords", "Routing databases do not hold passwords of users."]],
    "Every router in the area holds the same map.", { hints: ["What does each router need to build a map?"] });
  mc(b, 4, "EVALUATION", "A company in Mutare has 40 routers in five towns, with links ranging from 1 Mbit/s to 1 Gbit/s, and some routes of more than 15 hops. Which protocol is the better choice?",
    ["OSPF, because it uses link costs, adjusts quickly and divides the network into areas", "Correct."],
    [["RIP, because it is simple to set up and has no limit on the size of the network or the hops", "RIP has a limit of 15 hops."], ["RIP, because it chooses the fastest links", "RIP counts hops and ignores link speed."], ["Static routing only, because routes never change", "Links fail and change; static routes would not adjust."]],
    "Large networks with mixed link speeds need link-state routing.", { hints: ["Compare the number of hops with the limit of RIP."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "OSPF chooses the route with the lowest total cost.", answer: true, explanation: "True. Cost is based on link bandwidth and the costs along the route are added." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In RIP each router builds a map of the whole network.", answer: false, explanation: "False. RIP routers only know what their neighbours tell them. Building a map is what OSPF routers do." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each feature to RIP or OSPF.",
    pairs: ["Distance-vector", "Link-state", "Maximum of 15 hops", "Cost based on bandwidth", "Sends its whole table every 30 seconds"], right: ["RIP", "OSPF"], rightIndex: [0, 1, 0, 1, 0],
    explanation: "RIP: distance-vector, 15 hops, whole table. OSPF: link-state, cost." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about routing.",
    template: "Routes typed in by an administrator are called {{blank:a}} routes. RIP uses the {{blank:b}} count as its metric. OSPF uses the idea of {{blank:c}} algorithm to find the shortest path.",
    blanks: [
      { id: "a", accepted: ["static"], choices: ["static", "dynamic", "default", "private"] },
      { id: "b", accepted: ["hop"], choices: ["hop", "cost", "packet", "port"] },
      { id: "c", accepted: ["Dijkstra's"], choices: ["Dijkstra's", "Caesar's", "Euclid's", "Boole's"] },
    ], hints: ["OSPF computes shortest paths on a map."], explanation: "Static, hop, Dijkstra's." });
  chk(100 / 20, 5);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Cost = 100 ÷ bandwidth in Mbit/s."],
    stem: "An OSPF router uses the rule cost = 100 ÷ bandwidth in Mbit/s. What is the cost of a 20 Mbit/s link?",
    value: 5, wrong: [20, 2000], workedSolution: "1. Cost = 100 ÷ 20.\n2. = 5.", explanation: "100 ÷ 20 = 5." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Count the routers or links between P and U for the shortest number of hops."],
    stem: `A network has these links, with OSPF costs.\n\n${linkTable}\n\nRIP chooses the route with the fewest hops from P to U. How many hops does it use?`,
    value: 3, wrong: [4, 25], workedSolution: "1. The routes are P-Q-T-U (3 hops) and P-R-S-T-U (4 hops).\n2. RIP chooses P-Q-T-U: 3 hops.", explanation: "P-Q-T-U has 3 hops." });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Add the costs of the links on each route.", "OSPF picks the lower total."],
    stem: `Use the network below.\n\n${linkTable}\n\nCalculate the total cost of the route that OSPF chooses from P to U.`,
    value: 25, wrong: [50, 40], workedSolution: "1. P-Q-T-U costs 20 + 20 + 10 = 50.\n2. P-R-S-T-U costs 5 + 5 + 5 + 10 = 25.\n3. OSPF chooses the lower cost: 25.", explanation: "The route via R and S costs 25, less than 50." });
  b.mcq({ d: 4, skill: "ANALYSIS", hints: ["Compare the hop count and the cost of each route."],
    stem: `The network has these links.\n\n${linkTable}\n\nWhich statement about the routes from P to U is correct?`,
    options: [["RIP and OSPF choose different routes", "Correct: RIP uses P-Q-T-U, OSPF uses P-R-S-T-U."], ["RIP and OSPF choose the same route", "RIP prefers the route with fewer hops, which is not the cheapest route."], ["Both choose P-R-S-T-U because it has fewer hops", "P-R-S-T-U has more hops than P-Q-T-U."], ["Both choose P-Q-T-U because its links are faster", "Its links have the higher costs, so they are slower."]], answer: "A",
    explanation: "RIP chooses the 3-hop route, OSPF chooses the 25-cost route." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two differences in how they work."],
    stem: "Describe how a router using RIP learns routes. [4]",
    points: ["Each router sends its routing table to its neighbours at regular intervals (every 30 seconds)", "A router receiving a table adds 1 to the hop count of each route", "It keeps the route with the fewest hops to each network", "A route of 16 hops is treated as unreachable"],
    modelAnswer: "Each router sends its routing table to its neighbours every 30 seconds. A receiving router adds 1 to the hop count of each route and keeps the route with the fewest hops to each network. A route of 16 hops is treated as unreachable.",
    explanation: "Regular tables, add one hop, keep the best, 16 is unreachable." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link-state database, cost, Dijkstra."],
    stem: "Describe how a router using OSPF decides on the best route to a network. [4]",
    points: ["Each router tells the other routers in its area the state and cost of its links", "Each router stores this in its link-state database, giving it a map of the network", "The router calculates the lowest-cost path to each network using a shortest-path (Dijkstra) algorithm", "It puts the next hop of the lowest-cost path in its routing table"],
    modelAnswer: "Each router tells the other routers in its area the state and cost of its links. Each router stores this in its link-state database, which gives it a map of the network. It then calculates the lowest-cost path to each network with a shortest-path algorithm and puts the next hop in its routing table.",
    explanation: "Advertise, database, calculate, table." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Think about size, adjusting after a failure and link speed."],
    stem: "Give three reasons why OSPF is better than RIP for a large network. [3]",
    points: ["It is not limited to 15 hops and the network can be divided into areas", "It uses a cost based on the speed of the links so it chooses faster routes", "It adjusts quickly to a change because only changes are sent to all the routers in the area"],
    modelAnswer: "It has no 15-hop limit and the network can be divided into areas. It uses a cost based on link speed so it chooses faster routes, and it adjusts quickly because changes are sent at once to all routers in the area.",
    explanation: "Size, cost metric, speed of adjusting." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, hints: ["What happens when a link fails?"],
    stem: "State two disadvantages of static routing in a large network. [2]",
    points: ["Every route must be entered and changed by hand, which takes a lot of work", "If a link fails the routes are not updated and packets are lost until the administrator corrects them"],
    modelAnswer: "Every route has to be entered and changed by hand, and if a link fails the routes are not updated, so packets are lost until the administrator corrects them.",
    explanation: "Manual work and no automatic repair." });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Add the costs for OSPF; count the links for RIP."],
    explanation: "RIP chooses P-Q-T-U (3 hops); OSPF chooses P-R-S-T-U (cost 25).",
    stem: `A bank links its branch offices through routers P, Q, R, S, T and U. The links and their OSPF costs are shown.\n\n${linkTable}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of hops on the route P-Q-T-U.", value: 3, wrong: [4, 50], workedSolution: "1. The links are P-Q, Q-T and T-U.\n2. That is 3 hops.", explanation: "Three links: P-Q, Q-T, T-U." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the OSPF cost of the route P-Q-T-U.", value: 50, wrong: [3, 25], workedSolution: "1. 20 + 20 + 10 = 50.", explanation: "20 + 20 + 10 = 50." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the OSPF cost of the route P-R-S-T-U.", value: 25, wrong: [4, 50], workedSolution: "1. 5 + 5 + 5 + 10 = 25.", explanation: "5 + 5 + 5 + 10 = 25." }),
      P.manual({ label: "(d)", marks: 3, stem: "State the route chosen by RIP and the route chosen by OSPF, and explain why they are different.", points: ["RIP chooses P-Q-T-U because it has the fewest hops (3)", "OSPF chooses P-R-S-T-U because its total cost (25) is lower than 50", "RIP ignores link speed but OSPF's cost is based on the speed of the links"], modelAnswer: "RIP chooses P-Q-T-U because it has the fewest hops (3). OSPF chooses P-R-S-T-U because its cost of 25 is lower than 50. RIP ignores link speed, but OSPF's cost is based on the speed of the links.", explanation: "Different metrics, different routes." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Link each answer to the numbers in the scenario."],
    explanation: "A single campus with a few routers suits RIP; a large national network needs OSPF.",
    stem: "A school group in Masvingo has a campus network with 5 routers, all within 3 hops of each other, managed by one part-time technician. A hospital group has a network of 90 routers over many towns, with routes of up to 20 hops and links of different speeds.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Recommend a routing protocol for the school and give one reason.", points: ["RIP", "It is simple to set up and the network is well within the 15-hop limit"], modelAnswer: "RIP, because it is simple to set up and the network is well within the 15-hop limit.", explanation: "Small network." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why RIP is unsuitable for the hospital network.", points: ["Routes of 20 hops are more than the maximum of 15 hops, so those routers would be unreachable", "RIP ignores the speed of the links and adjusts slowly in a big network"], modelAnswer: "Routes of 20 hops are more than RIP's maximum of 15, so some routers would be unreachable, and RIP ignores link speed and adjusts slowly in a large network.", explanation: "Hop limit." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe two features of OSPF that suit the hospital network.", points: ["The network can be divided into areas, so databases and calculations stay small", "The cost is based on link speed and updates are sent only when something changes"], modelAnswer: "The network can be divided into areas to keep each database small, and the cost is based on link speed with updates sent only when something changes.", explanation: "Areas and cost." }),
    ] });
  b.card("DEFINITION", "Routing table", "A router's list of destination networks, next hop and metric.");
  b.card("CONCEPT", "Static and dynamic routing", "Static: routes set by hand. Dynamic: routers learn and update routes using a protocol.");
  b.card("CONCEPT", "RIP", "Distance-vector; metric is hop count; whole table sent every 30 seconds; maximum 15 hops (16 is unreachable).");
  b.card("CONCEPT", "OSPF", "Link-state; metric is cost based on bandwidth; link-state database; shortest path with Dijkstra's idea; areas.");
  b.card("FORMULA", "OSPF cost", "Cost = reference bandwidth ÷ link bandwidth, for example 100 ÷ bandwidth in Mbit/s; add the costs along a route.");
  b.card("CONCEPT", "RIP against OSPF", "RIP: simple, small networks, ignores speed. OSPF: large networks, uses link cost, fast adjusting, needs more router resources.");
  b.card("DEFINITION", "Hop count", "The number of routers a packet passes through; RIP's metric.");
  b.card("DEFINITION", "Link-state database", "The map of links and costs held by every router in an OSPF area.");
});
