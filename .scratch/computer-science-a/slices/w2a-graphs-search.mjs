// Slice w2a: graphs, Dijkstra's algorithm and A* (acs.ai.graphs-search, Cambridge A Level).
import { concept, P, chk, same, CAM, dijkstra, pathTo, mdTable, round } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { edgesToGraph, dijkstraSteps, dijkstraMd, aStarSteps, aStarMd, edgeMd } from "../tables/w2a-graph.mjs";

concept("acs.ai.graphs-search", { file: "ai/graphs-search", keyPrefix: "ai.graphs-search", applies: CAM }, (b) => {
  // graph for the questions: a school (S) and clinics/villages A-F, weights in minutes of walking
  const edges = [["S", "A", 4], ["S", "B", 2], ["A", "B", 1], ["A", "C", 5], ["B", "C", 8], ["B", "D", 10], ["C", "D", 2], ["C", "E", 6], ["D", "E", 3], ["D", "F", 7], ["E", "F", 4]];
  const g = edgesToGraph(edges);
  const dj = dijkstraSteps(g, "S");
  same(dj.rows.map((r) => r.visited), ["S", "B", "A", "C", "D", "E", "F"]);
  chk(dj.dist.F, 17); chk(dj.dist.E, 13); chk(dj.dist.C, 8); chk(dj.dist.A, 3);
  same(pathTo(dj.prev, "S", "F"), ["S", "B", "A", "C", "D", "F"]);
  const dF = dijkstra(g, "F").dist;
  const h = Object.fromEntries(Object.entries(dF).map(([k, v]) => [k, Math.floor(v * 0.8)]));
  const as = aStarSteps(g, "S", "F", h);
  same(as.path, ["S", "B", "A", "C", "D", "F"]); chk(as.cost, 17);
  same(as.rows.map((r) => r.node), ["S", "B", "A", "C", "D", "E", "F"]);
  const rowC = dj.rows.find((r) => r.visited === "C");
  const edgeT = edgeMd(edges);
  const hT = mdTable(["Node", "h (estimate to F)"], Object.keys(h).sort().map((k) => [k, h[k]]));
  // second small graph for another question: directed
  const e2 = [["P", "Q", 3], ["P", "R", 7], ["Q", "R", 2], ["Q", "T", 8], ["R", "T", 3]];
  const g2 = edgesToGraph(e2);
  const dj2 = dijkstra(g2, "P");
  chk(dj2.dist.T, 8); same(pathTo(dj2.prev, "P", "T"), ["P", "Q", "R", "T"]);

  // ---- multiple choice
  mc(b, 1, "RECALL", "What does a weight on an edge of a graph represent in a road network?",
    ["The cost of using that edge, such as its length", "Correct."],
    [["The total number of nodes that there are in the whole graph", "That is a property of the whole graph."], ["The name of the town at one end of it", "Names label the nodes."], ["Whether the edge is directed or not", "Direction is shown separately."]],
    "A weight is the cost of travelling along an edge.");
  mc(b, 2, "UNDERSTANDING", "Dijkstra's algorithm is applied from a start node. What does it find?",
    ["The shortest distance from the start to every other node", "Correct."],
    [["The path that visits every node exactly once", "That is a different problem."], ["The node with the greatest number of edges", "Dijkstra does not count edges."], ["Only the straight-line distance to the goal", "Dijkstra uses the edge weights."]],
    "It gives the shortest distance and path to all reachable nodes.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In Dijkstra's algorithm, which node is visited next?",
    ["The unvisited node with the smallest known distance", "Correct."],
    [["The unvisited node with the most edges", "The number of edges is not used."], ["The node that was reached most recently", "The next node is chosen by distance."], ["The node that is nearest to the goal in a straight line", "That is a heuristic idea used by A*."]],
    "The smallest distance is certain to be final.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What is the meaning of f = g + h in the A* algorithm?",
    ["The cost so far plus the estimated cost remaining", "Correct."],
    [["The cost remaining plus the cost of the goal", "g is the cost so far, not the goal's cost."], ["The number of nodes visited plus the number of edges", "f is a cost estimate."], ["The sum of all edge weights in the graph", "f refers to a path through one node."]],
    "A* chooses the node with the lowest estimated total cost.", { hints: ["g is what has been spent; h is what is estimated to remain."] });
  mc(b, 3, "UNDERSTANDING", "What is meant by an admissible heuristic?",
    ["One that never overestimates the true remaining cost", "Correct: this guarantees that A* finds a shortest path."],
    [["One that always equals the true remaining cost", "That would be a perfect heuristic."], ["One that is always zero", "Zero never overestimates but is not what the term means."], ["One that is larger than the cost so far", "It is compared with the remaining cost."]],
    "An admissible heuristic is a lower bound on the remaining cost.", { hints: ["Think about what could go wrong if h were too large."] });
  mc(b, 3, "ANALYSIS", "Why does A* usually examine fewer nodes than Dijkstra's algorithm when searching for one goal?",
    ["The heuristic guides the search towards the goal", "Correct."],
    [["It ignores the weights of the edges in the graph", "A* uses the weights as g."], ["It stops after expanding the first node it finds", "It continues until the goal is chosen."], ["It is run on a smaller graph than Dijkstra uses", "The graph is the same."]],
    "Nodes that look far from the goal have a high f and are not expanded.", { hints: ["What extra information does A* use?"] });
  mc(b, 2, "UNDERSTANDING", "Which structure does an AI program use to model a set of towns and the roads between them?",
    ["A weighted graph", "Correct."],
    [["A stack", "A stack is last in first out."], ["A one-dimensional array of towns only", "That would lose the roads."], ["A queue", "A queue is first in first out."]],
    "Nodes for the towns, weighted edges for the roads.");
  mc(b, 3, "APPLICATION", "In A*, two open nodes both have f = 20. One has h = 6 and the other h = 9. Which is chosen first in this lesson's rule?",
    ["The node with h = 6", "Correct: the lower heuristic is chosen when f is equal."],
    [["The node with h = 9", "That has the larger estimate, so it is chosen later."], ["Both at the same time", "One node is expanded at a time."], ["Neither, because they are tied", "A tie-breaking rule is used."]],
    "Ties in f are broken by the lower h.", { hints: ["The tie-break prefers the node closer to the goal."], calculator: false });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Dijkstra's algorithm can be used when the weights of the edges are distances.", answer: true,
    explanation: "True. Non-negative weights such as distances or times are what it is designed for." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A heuristic that overestimates the remaining cost is admissible.", answer: false,
    explanation: "False. An admissible heuristic must never overestimate." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Node", "A point of the graph, such as a town"], ["Edge", "A link between two nodes"], ["Weight", "The cost attached to an edge"], ["Open list", "Nodes reached but not yet expanded"], ["Closed list", "Nodes that have already been expanded"]],
    explanation: "Terms of graphs and of A*." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Which value has been spent and which is estimated?"],
    stem: "Complete the description of A*.",
    template: "g is the cost {{blank:a}} the start. h is the {{blank:b}} cost to the goal. A* expands the open node with the lowest {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["from"], choices: ["from", "to", "around", "without"] },
      { id: "b", accepted: ["estimated"], choices: ["estimated", "exact", "negative", "total"] },
      { id: "c", accepted: ["f"], choices: ["f", "g", "h", "weight"] },
    ], explanation: "g from the start, h estimated, lowest f." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Follow Dijkstra's algorithm from S, updating the distance to a node only when it improves."],
    stem: "The weights (in minutes) of the roads between a school S and six villages are:\n\n" + edgeT + "\n\nUsing Dijkstra's algorithm from S, what is the shortest time from S to C?",
    value: dj.dist.C, unit: undefined, wrong: [10, 13], workedSolution: "Distances after each visit:\n\n" + dijkstraMd(g, "S") + "\n\nC has distance 8, through S, B, A (2 + 1 + 5).", explanation: "S–B–A–C takes 2 + 1 + 5 = 8 minutes." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Look for a route that goes through D."],
    stem: "Using the same roads (listed in the previous question), what is the shortest time from S to F?",
    value: dj.dist.F, wrong: [19, 13], workedSolution: "The shortest path is S, B, A, C, D, F: 2 + 1 + 5 + 2 + 7 = 17.", explanation: "17 minutes." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["List the nodes in the order in which they are visited."],
    stem: "In Dijkstra's algorithm from S on the same graph, how many nodes are visited before F is visited (not counting F)?",
    value: dj.rows.findIndex((r) => r.visited === "F"), wrong: [5, 7], workedSolution: "The visiting order is " + dj.rows.map((r) => r.visited).join(", ") + ". F is the seventh, so six nodes come before it.", explanation: "Six nodes are visited before F." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["g(C) = 8 and h(C) = 7."],
    stem: "In A* from S to F on the same graph, the heuristic estimates are:\n\n" + hT + "\n\nWhat is the value of f for node C when its best g value has been found?",
    value: as.rows.find((r) => r.node === "C").f, wrong: [8, 7], workedSolution: "g(C) = 2 + 1 + 5 = 8 and h(C) = 7, so f = 8 + 7 = 15.", explanation: "f = 8 + 7 = 15." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of graph in which every edge has a number attached, such as a distance.", accepted: ["weighted graph", "weighted", "a weighted graph"], wrong: ["directed graph", "tree"], explanation: "A weighted graph." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Cover the starting values, the choice at each step and the update."],
    stem: "Describe how Dijkstra's algorithm finds the shortest distance from a start node to the other nodes of a weighted graph. [3]",
    points: ["The start node is given distance 0 and every other node infinity", "The unvisited node with the smallest distance is chosen and marked visited", "Its neighbours' distances are updated if the route through it is shorter; this repeats until all nodes are visited"],
    modelAnswer: "The start node has distance 0 and the others infinity. The unvisited node with the smallest distance is chosen and marked as visited, and the distances of its neighbours are updated when the route through it is shorter. This is repeated until all the nodes are visited.",
    explanation: "Initialise, choose, update." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare the search area and the information used."],
    stem: "Compare Dijkstra's algorithm with the A* algorithm. [4]",
    points: ["Dijkstra finds the shortest path to every node; A* finds a shortest path to one goal", "A* uses a heuristic estimate h to guide the search; Dijkstra uses no estimate", "A* chooses the node with the lowest f = g + h; Dijkstra chooses the lowest g (distance so far)", "A* usually examines fewer nodes, but needs an admissible heuristic to guarantee a shortest path"],
    modelAnswer: "Dijkstra finds the shortest path to every node using only the distance so far (g), while A* finds a shortest path to one goal and uses f = g + h with a heuristic estimate h. A* usually examines fewer nodes but needs an admissible heuristic to be sure that the path is shortest.",
    explanation: "Four contrasts." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What would happen if h were larger than the true cost?"],
    stem: "Explain why the heuristic used in A* should not overestimate the cost to the goal. [3]",
    points: ["If h is too large, the f value of a node on the best path may be too high", "So the node may not be chosen / may be left in the open list", "A* could then return a path that is not the shortest"],
    modelAnswer: "If h is too large, a node on the best path can get an f value that is too high, so it may not be chosen and A* could return a path that is not the shortest.",
    explanation: "Overestimates can hide the best route." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Update a distance only if the new route is shorter.", "S has distance 0 at the start."],
    explanation: "The table shows Dijkstra's algorithm from S.",
    stem: "A school S and villages A to F are joined by paths. The weights (in minutes) are:\n\n" + edgeT + "\n\nDijkstra's algorithm is used from S. The distances after S and B have been visited are:\n\n" + mdTable(["Node", "A", "B", "C", "D", "E", "F", "S"], [["Distance", 3, 2, 10, 12, "∞", "∞", 0]]),
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Next A is visited. State the new distances for C and D.", template: "C = {{blank:c}}\n\nD = {{blank:d}}", blanks: [{ id: "c", accepted: [String(rowC.dist.C)], input: "number" }, { id: "d", accepted: ["12"], input: "number" }], wrong: [["10", "10"]], explanation: "A is at 3; C improves to 3 + 5 = 8; D is unchanged at 12." }),
      P.num({ label: "(b)", marks: 1, stem: "State the shortest time from S to E.", value: dj.dist.E, wrong: [14, 17], workedSolution: "S, B, A, C, D, E = 2 + 1 + 5 + 2 + 3 = 13.", explanation: "13 minutes." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which node is the last one visited before F?", options: [["E", "Correct: E has distance 13, less than F's 17."], ["D", "D has distance 10 and is visited earlier."], ["C", "C has distance 8 and is visited earlier."], ["A", "A has distance 3 and is visited early."]], answer: "A", explanation: "The visiting order is S, B, A, C, D, E, F." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the shortest path from S to F and its length.", points: ["S, B, A, C, D, F", "17 minutes"], modelAnswer: "S, B, A, C, D, F, with a length of 17 minutes.", explanation: "Follow the previous nodes back from F." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["f = g + h."],
    explanation: "Reading the first steps of an A* search.",
    stem: "An A* search is made from S to F on the same graph, with these estimates:\n\n" + hT + "\n\nThe table shows the first steps:\n\n" + mdTable(["Expand", "g", "h", "f"], as.rows.slice(0, 3).map((r) => [r.node, r.g, r.h, r.f])),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of f for S.", value: 13, wrong: [0, 17], workedSolution: "g(S) = 0 and h(S) = 13.", explanation: "f = 13." }),
      P.num({ label: "(b)", marks: 1, stem: "Node B is expanded with g = 2. State f for B.", value: 14, wrong: [12, 2], workedSolution: "g = 2 and h(B) = 12, so f = 14.", explanation: "f = 14." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why A is expanded before C.", points: ["A has a lower f than C", "A* always expands the open node with the lowest f"], modelAnswer: "A has the lower f value, and A* always expands the open node with the lowest f.", explanation: "Lowest f first." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Graph", "Nodes (vertices) joined by edges; weighted if each edge has a cost, directed if edges go one way.");
  b.card("DEFINITION", "Dijkstra's algorithm", "Finds the shortest distance from a start node to all others by repeatedly visiting the unvisited node with the smallest distance and updating its neighbours.");
  b.card("DEFINITION", "A* algorithm", "Expands the open node with the lowest f = g + h to find a shortest path to one goal.");
  b.card("DEFINITION", "Heuristic", "An estimate of the remaining cost to the goal; admissible if it never overestimates.");
  b.card("FORMULA", "f = g + h", "g: cost from the start so far; h: estimated cost to the goal; f: estimated total cost through the node.");
  b.card("CONCEPT", "Open and closed lists", "Open: nodes reached but not expanded. Closed: nodes already expanded.");
  b.card("CONCEPT", "Finding the path", "Follow the previous node from the destination back to the start and reverse it.");
  b.card("CONCEPT", "A* against Dijkstra", "A* uses a heuristic, searches towards one goal and usually expands fewer nodes; with h = 0 it behaves like Dijkstra.");
});
