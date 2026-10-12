---
{
  "key": "ai.graphs-search",
  "title": "Graphs and path finding: Dijkstra's algorithm and A*",
  "summary": "The purpose and structure of a graph used in AI (nodes, edges, weights), Dijkstra's shortest path algorithm performed with a distance table, and the A* algorithm with a heuristic, f = g + h, and open and closed lists, both worked by hand on a given graph.",
  "concepts": ["acs.ai.graphs-search"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A bus company plans routes between towns in Zimbabwe. A map-reading app finds the quickest way to travel between two places. A computer game character finds its way across a game map. All of these problems have the same shape: a set of places, some links between them, and a cost for each link. A **graph** models exactly this, and **artificial intelligence (AI)** programs search it to find the best path.

This lesson explains the structure of a graph, then two path-finding algorithms performed by hand: **Dijkstra's algorithm**, which finds the shortest path from one node to all the others, and the **A\* algorithm**, which finds a shortest path to one goal more quickly by using a **heuristic**. The tables here were produced by code that implements both algorithms. The distances are invented for practice and are not real road distances.

You should already know how to use a table and how to compare numbers.

## Key definitions

:::definition{term="Graph"}
A set of nodes (vertices) joined by edges. In a weighted graph each edge has a number, its weight, such as a distance or a cost. In a directed graph an edge can be used in one direction only.
:::

:::definition{term="Dijkstra's algorithm"}
An algorithm that finds the shortest path from a start node to every other node of a weighted graph, by repeatedly visiting the unvisited node with the smallest known distance.
:::

:::definition{term="Heuristic"}
An estimate of the remaining cost from a node to the goal, used to guide a search. In A* it should never be larger than the true remaining cost (an admissible heuristic).
:::

:::definition{term="A* algorithm"}
A path-finding algorithm that always expands the node with the lowest value of f = g + h, where g is the cost from the start to the node and h is the heuristic estimate from the node to the goal.
:::

## Graphs in AI

The nodes may be towns, squares of a game board, states of a puzzle or locations for a robot; the edges are the moves between them; the weights are distances, times or costs. The AI program searches for a sequence of edges from the start to the goal with the lowest total weight. The graph below has ten towns and the letters are used in the tables.

| Letter | Town |
|:-:|:-:|
| H | Harare |
| C | Chegutu |
| K | Kadoma |
| W | Kwekwe |
| G | Gweru |
| B | Bulawayo |
| M | Marondera |
| R | Rusape |
| T | Mutare |
| N | Nyanga |

The edges (the graph is undirected, so each can be travelled either way) are:

| Edge | Weight |
|:-:|:-:|
| H – C | 100 |
| H – M | 70 |
| C – K | 60 |
| K – W | 90 |
| W – G | 55 |
| G – B | 165 |
| W – B | 220 |
| M – G | 250 |
| K – G | 140 |
| M – R | 75 |
| R – T | 85 |
| T – N | 60 |

## Dijkstra's algorithm

1. Give the start node distance 0 and all other nodes distance ∞.
2. Choose the **unvisited** node with the smallest distance and mark it visited (its distance is now final).
3. For each neighbour, if distance of the chosen node + the edge weight is smaller than the neighbour's recorded distance, replace it, and note that the chosen node is the neighbour's previous node.
4. Repeat from step 2 until the destination (or every node) has been visited.
5. Find the path by following the previous nodes back from the destination.

:::worked-solution{title="Dijkstra from Harare (H)"}
Each row shows the distances after the visit named in the first column. **Bold** marks the node visited in that row, and ✓ marks nodes whose distance is final. Ties are visited in alphabetical order.

| Visit | B | C | G | H | K | M | N | R | T | W |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| H | ∞ | 100 | ∞ | **0** | ∞ | 70 | ∞ | ∞ | ∞ | ∞ |
| M | ∞ | 100 | 320 | 0✓ | ∞ | **70** | ∞ | 145 | ∞ | ∞ |
| C | ∞ | **100** | 320 | 0✓ | 160 | 70✓ | ∞ | 145 | ∞ | ∞ |
| R | ∞ | 100✓ | 320 | 0✓ | 160 | 70✓ | ∞ | **145** | 230 | ∞ |
| K | ∞ | 100✓ | 300 | 0✓ | **160** | 70✓ | ∞ | 145✓ | 230 | 250 |
| T | ∞ | 100✓ | 300 | 0✓ | 160✓ | 70✓ | 290 | 145✓ | **230** | 250 |
| W | 470 | 100✓ | 300 | 0✓ | 160✓ | 70✓ | 290 | 145✓ | 230✓ | **250** |
| N | 470 | 100✓ | 300 | 0✓ | 160✓ | 70✓ | **290** | 145✓ | 230✓ | 250✓ |
| G | 465 | 100✓ | **300** | 0✓ | 160✓ | 70✓ | 290✓ | 145✓ | 230✓ | 250✓ |
| B | **465** | 100✓ | 300✓ | 0✓ | 160✓ | 70✓ | 290✓ | 145✓ | 230✓ | 250✓ |

1. H is visited first (0). Its neighbours C and M get 100 and 70.
2. M has the smallest unvisited distance (70) and is visited next; it gives R a distance of 145 and G a distance of 320.
3. C (100), R (145) and K (160) follow in order of distance.
4. G first gets 320 (through M) and is later improved to 300 (through K, which is 160 + 140). B first gets 470 through W, and is improved to 465 through G.
5. The shortest distance from H to B is **465**, and following the previous nodes back from B gives the path **H, C, K, G, B**.
6. All 10 nodes were visited, in the order H, M, C, R, K, T, W, N, G, B, including towns in the wrong direction.
:::

## The A* algorithm

A* searches towards one goal. It keeps an **open list** of nodes that have been reached but not yet expanded, and a **closed list** of nodes already expanded. For each node it uses:

- **g**: the cost of the cheapest path found so far from the start to the node;
- **h**: the heuristic estimate of the remaining cost from the node to the goal;
- **f = g + h**: the estimated total cost of a path through the node.

At each step A* takes the node with the **lowest f** from the open list (the lower h if f is equal), moves it to the closed list, and updates its neighbours, exactly as Dijkstra does for g. It stops when the goal is chosen. If h is admissible, the path found is a shortest one.

For the search from Harare to Bulawayo, the heuristic for each town is an estimate of the distance to Bulawayo, deliberately never more than the true distance:

| Node | Estimate h to Bulawayo | True distance (for checking) |
|:-:|:-:|:-:|
| B (Bulawayo) | 0 | 0 |
| C (Chegutu) | 325 | 365 |
| G (Gweru) | 145 | 165 |
| H (Harare) | 415 | 465 |
| K (Kadoma) | 270 | 305 |
| M (Marondera) | 370 | 415 |
| N (Nyanga) | 570 | 635 |
| R (Rusape) | 440 | 490 |
| T (Mutare) | 515 | 575 |
| W (Kwekwe) | 195 | 220 |

:::worked-solution{title="A* from Harare (H) to Bulawayo (B)"}
| Expand | g | h | f = g + h | Open list after (node(f)) |
|:-:|:-:|:-:|:-:|:-:|
| H | 0 | 415 | 415 | C(425), M(440) |
| C | 100 | 325 | 425 | K(430), M(440) |
| K | 160 | 270 | 430 | G(445), M(440), W(445) |
| M | 70 | 370 | 440 | G(445), R(585), W(445) |
| G | 300 | 145 | 445 | B(465), R(585), W(445) |
| W | 250 | 195 | 445 | B(465), R(585) |
| B | 465 | 0 | 465 | goal reached |

1. H is expanded first: C has f = 100 + 325 = 425 and M has f = 70 + 370 = 440.
2. C has the lowest f, so it is expanded, then K (160 + 270 = 430).
3. After K the open list has G and W (both 445) and M (440). M is expanded next, then G (h = 145) is chosen before W because it has the lower h.
4. G's neighbour B is reached with g = 465. B is chosen when it has the lowest f, and the algorithm stops.
5. A* expanded 7 nodes (in the order H, C, K, M, G, W, B) against 10 for Dijkstra. It never expanded Rusape, Mutare or Nyanga, because their estimates were large. The path is H, C, K, G, B and the cost is 465, the same as Dijkstra's.
:::

:::keyfact{title="Dijkstra against A*"}
Dijkstra finds the shortest paths to all nodes and uses no estimate. A* finds a shortest path to one goal and usually visits fewer nodes, because the heuristic guides it. A* needs an admissible heuristic to be sure of the shortest path. With h = 0 for every node, A* behaves like Dijkstra.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Graphs, Dijkstra's algorithm and A* are Cambridge A Level content (topic 18.1). Candidates do not have to write the algorithms, only perform them on a given graph. ZIMSEC does not examine them.
:::

## Common mistakes

:::mistake{title="Visiting a node as soon as it is first reached"}
A node's distance is final only when it is the unvisited node with the smallest distance. G first showed 320 but was improved to 300.
:::

:::mistake{title="Using f = h"}
A* uses f = g + h. Using h alone (greedy search) can find a path that is not the shortest.
:::

:::mistake{title="Choosing an overestimate for the heuristic"}
If h is larger than the true remaining cost, A* may miss the shortest path.
:::

:::mistake{title="Forgetting to find the path"}
The table gives distances. The path is found by following the previous node from the destination back to the start.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** gives a graph (as a table of edges and weights) and asks you to **show** Dijkstra's algorithm in a table, **state** the shortest distance and path, or **show** the g, h and f values of A*. Draw a table with a column for each node and update only the values that improve.
:::

:::exam-tip
"**Explain** why A* is often faster than Dijkstra": its heuristic guides the search towards the goal so fewer nodes are expanded. "**Explain** what makes a good heuristic": it is cheap to calculate and never more than the true remaining cost.
:::

## Summary

:::summary
- A graph has nodes, edges and (when weighted) edge weights; AI uses graphs to model routes, maps and problem states.
- Dijkstra visits the unvisited node with the smallest distance, updates its neighbours and finds the shortest path to every node.
- The path is found by following the previous node back from the destination.
- A* chooses the open node with the lowest f = g + h, where h is a heuristic estimate of the remaining cost.
- An admissible heuristic never overestimates, so A* finds a shortest path while usually expanding fewer nodes than Dijkstra.
:::
