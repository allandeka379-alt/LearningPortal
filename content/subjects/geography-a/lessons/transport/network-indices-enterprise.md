---
{
  "key": "transport.network-indices-enterprise",
  "title": "Transport network indices and transport enterprise",
  "summary": "Calculate beta, gamma and alpha indices and the cyclomatic number for a transport network, suggest new links to improve connectivity, and plan a transport business with revenue, costs, profit, break-even and risk.",
  "concepts": [
    "ageo.transport.network-indices-enterprise"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A road map looks like a drawing, but a transport planner sees a network: points (towns, junctions) joined by links (roads, railways, flight paths). Counting the points and links gives numbers that show how well connected a place is, and how a new road would change that. A second skill in this lesson is planning a transport business: choosing a route, estimating costs and revenue and judging risk. Both appear in ZIMSEC Form 5 and Paper 2.

You should already know the main transport modes and be able to read a simple map of roads and railways.

## Key definitions

:::definition{term="Node and link"}
A **node** (vertex, $v$) is a point where routes begin, end or meet, such as a town or junction. A **link** (edge, $e$) is a route joining two nodes.
:::

:::definition{term="Connectivity"}
The degree to which the nodes of a network are joined to one another, and so the number of alternative routes between them.
:::

:::definition{term="Beta, gamma and alpha indices"}
Measures of connectivity calculated from the numbers of links and nodes. Higher values mean a better-connected network.
:::

:::definition{term="Cyclomatic number"}
The number of independent circuits (loops) in a network: $e - v + p$, where $p$ is the number of separate sub-graphs (1 if the whole network is connected).
:::

## Measuring connectivity

| Index | Formula | Range and meaning |
|---|---|---|
| Beta ($\beta$) | $e \div v$ | Below 1: tree-like or disconnected; 1: a single circuit; above 1: more complex, several circuits |
| Gamma ($\gamma$) | $e \div 3(v - 2)$ | 0 to 1 (or 0 to 100%): the actual links as a share of the maximum possible in a planar network |
| Alpha ($\alpha$) | $(e - v + p) \div (2v - 5)$ | 0 to 1 (or 0 to 100%): circuits as a share of the maximum possible |
| Cyclomatic number | $e - v + p$ | 0 for a tree; rises with the number of loops |

A **planar** network is one drawn without links crossing except at nodes. The most links it can have is $3(v - 2)$, which is used in gamma. A tree network joins $v$ nodes with $v - 1$ links and has no circuits (beta below 1, alpha 0).

## Designing a better network

When a region has poor connectivity, add links where they give the greatest gain: join nodes that have few links, close the gaps in a ring that give alternative routes, or connect two sub-networks. Weigh each new link against cost (building, land, environmental damage), the traffic it will carry and the benefits (shorter journeys, access for isolated communities, resilience when a road is closed by floods).

## Planning a transport enterprise

1. **Route and market:** choose a route with enough passengers or goods, a road in good condition, and a terminus with a legal rank.
2. **Vehicle:** choose type and size (minibus, bus, truck) to match demand and road conditions.
3. **Costs:** *fixed* (purchase or loan repayments, insurance, licences) and *variable* (fuel, tyres, maintenance, wages that depend on trips).
4. **Revenue:** fare (or freight rate) × passengers (or tonnes) × trips.
5. **Profit** $=$ revenue $-$ total cost; **break-even** is where revenue equals cost.
6. **Risks:** fuel price rises, poor roads and breakdowns, competition, illegal operators, accidents, fare regulation, and changes in demand. Reduce them with maintenance, insurance, good drivers and a flexible timetable.

## Worked examples

:::worked-solution[Connectivity indices before and after new links]
Illustrative network: 8 towns (nodes) and 10 roads (links), all connected ($p = 1$).

1. Beta: $10 \div 8 = 1.25$.
2. Gamma: maximum links $3(8 - 2) = 18$, so $10 \div 18 = 0.556$, or 55.6%.
3. Alpha: $(10 - 8 + 1) \div (2 \times 8 - 5) = 3 \div 11 = 0.273$.
4. Cyclomatic number: $10 - 8 + 1 = 3$ circuits.

Two new roads are built (12 links). Then:

| Index | Before (e = 10) | After (e = 12) |
|---|---|---|
| Beta | 1.25 | 1.50 |
| Gamma | 0.556 | 0.667 |
| Alpha | 0.273 | 0.455 |
| Cyclomatic number | 3 | 5 |

5. All indices rise, so connectivity improves: beta 1.25 to 1.50 and two more circuits give travellers extra alternative routes. Gamma is still below 1, so the network is far from the maximum.
:::

:::worked-solution[Monthly accounts of a minibus on a 60 km route]
Illustrative figures: fare US\$3 one way; 18 passengers per trip on average; 4 one-way trips a day; 26 working days a month; fuel use 10 km per litre at US\$1.60 a litre; wages US\$900, maintenance US\$600, insurance and licences US\$250, vehicle loan repayment US\$1200 a month.

1. Revenue $= 3 \times 18 \times 4 \times 26 = 5616$ US dollars.
2. Distance $= 60 \times 4 \times 26 = 6240$ km; fuel $= 6240 \div 10 = 624$ litres, costing $624 \times 1.60 = 998.40$ US dollars.
3. Total cost $= 998.40 + 900 + 600 + 250 + 1200 = 3948.40$ US dollars.
4. Profit $= 5616 - 3948.40 = 1667.60$ US dollars a month.
5. Break-even passengers per trip $= 3948.40 \div (3 \times 4 \times 26) = 12.7$, so the minibus needs at least 13 passengers per trip to cover its costs; it is carrying 18.
:::

:::example{title="Where to put a new link"}
A province has a ring of five towns joined by roads but one remote district centre is joined only by a single gravel road. A planner compares two projects: a new road between two ring towns (which gives a shortcut but little new access) and an upgrade linking the district centre to a second town (which gives the isolated district an alternative route and raises its link count). The second gives a larger social benefit and also improves resilience, because the district is no longer cut off if the gravel road floods.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Network indices, designing a network and planning a transport enterprise are ZIMSEC Form 5 content (transport distribution is a separate lesson). Cambridge covers transport and accessibility in urban and trade topics but does not set these indices.
:::

## Common mistakes

:::mistake{title="Using the wrong denominator for gamma"}
Gamma divides by $3(v - 2)$, not by $v$ or $3v$. Check the number of nodes before you substitute.
:::

:::mistake{title="Forgetting p in the cyclomatic number"}
For one connected network $p = 1$. If two separate networks are drawn on the same map, $p = 2$.
:::

:::mistake{title="Omitting fixed costs from a business plan"}
Loan repayments, insurance and licences must be paid even when the vehicle does not run. Leaving them out overstates profit.
:::

## Exam tips

:::exam-tip
Count nodes and links in the network you are given and state them before calculating. Show the formula, the substitution and the result to the required decimal places, then interpret ("beta is above 1, so the network has circuits"). For business questions, set out revenue, costs and profit in a table, and finish with a risk and a way to reduce it.
:::

## Summary

:::summary
- A network consists of nodes ($v$) and links ($e$); connectivity shows how well they are joined.
- $\beta = e \div v$; $\gamma = e \div 3(v - 2)$; $\alpha = (e - v + p) \div (2v - 5)$; cyclomatic number $= e - v + p$.
- Adding links raises all the indices; plan new links by cost, benefit and resilience.
- Revenue = fare × passengers × trips; profit = revenue − fixed and variable costs; compare with the break-even load.
- Risks include fuel prices, poor roads, competition and breakdowns.
:::
