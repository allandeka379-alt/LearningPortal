import { t, table, betaIndex, gammaIndex, alphaIndex, cyclomatic, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const v = 8, e1 = 10, e2 = 12;
const n1 = { b: betaIndex(e1, v), g: gammaIndex(e1, v), a: alphaIndex(e1, v), c: cyclomatic(e1, v) };
const n2 = { b: betaIndex(e2, v), g: gammaIndex(e2, v), a: alphaIndex(e2, v), c: cyclomatic(e2, v) };
chk(n1.c, 3); chk(n2.c, 5); chk(3 * (v - 2), 18);
// minibus enterprise
const fare = 3, pax = 18, trips = 4, days = 26, km = 60;
const revenue = fare * pax * trips * days;
const kmMonth = km * trips * days;
const fuelL = kmMonth / 10;
const fuel = fuelL * 1.6;
const wages = 900, maint = 600, ins = 250, loan = 1200;
const cost = fuel + wages + maint + ins + loan;
const profit = revenue - cost;
const be = cost / (fare * trips * days);
console.log({ n1, n2, revenue, kmMonth, fuelL, fuel, cost, profit, be });

const body = t`
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
Illustrative network: ${v} towns (nodes) and ${e1} roads (links), all connected ($p = 1$).

1. Beta: $${e1} \div ${v} = ${dpStr(n1.b, 2)}$.
2. Gamma: maximum links $3(${v} - 2) = 18$, so $${e1} \div 18 = ${dpStr(n1.g, 3)}$, or ${dpStr(n1.g * 100, 1)}%.
3. Alpha: $(${e1} - ${v} + 1) \div (2 \times ${v} - 5) = ${e1 - v + 1} \div 11 = ${dpStr(n1.a, 3)}$.
4. Cyclomatic number: $${e1} - ${v} + 1 = ${n1.c}$ circuits.

Two new roads are built (${e2} links). Then:

${table(["Index", `Before (e = ${e1})`, `After (e = ${e2})`], [["Beta", dpStr(n1.b, 2), dpStr(n2.b, 2)], ["Gamma", dpStr(n1.g, 3), dpStr(n2.g, 3)], ["Alpha", dpStr(n1.a, 3), dpStr(n2.a, 3)], ["Cyclomatic number", n1.c, n2.c]])}

5. All indices rise, so connectivity improves: beta ${dpStr(n1.b, 2)} to ${dpStr(n2.b, 2)} and two more circuits give travellers extra alternative routes. Gamma is still below 1, so the network is far from the maximum.
:::

:::worked-solution[Monthly accounts of a minibus on a 60 km route]
Illustrative figures: fare US\$${fare} one way; ${pax} passengers per trip on average; ${trips} one-way trips a day; ${days} working days a month; fuel use 10 km per litre at US\$1.60 a litre; wages US\$${wages}, maintenance US\$${maint}, insurance and licences US\$${ins}, vehicle loan repayment US\$${loan} a month.

1. Revenue $= ${fare} \times ${pax} \times ${trips} \times ${days} = ${revenue}$ US dollars.
2. Distance $= ${km} \times ${trips} \times ${days} = ${kmMonth}$ km; fuel $= ${kmMonth} \div 10 = ${fuelL}$ litres, costing $${fuelL} \times 1.60 = ${dpStr(fuel, 2)}$ US dollars.
3. Total cost $= ${dpStr(fuel, 2)} + ${wages} + ${maint} + ${ins} + ${loan} = ${dpStr(cost, 2)}$ US dollars.
4. Profit $= ${revenue} - ${dpStr(cost, 2)} = ${dpStr(profit, 2)}$ US dollars a month.
5. Break-even passengers per trip $= ${dpStr(cost, 2)} \div (${fare} \times ${trips} \times ${days}) = ${dpStr(be, 1)}$, so the minibus needs at least ${Math.ceil(be)} passengers per trip to cover its costs; it is carrying ${pax}.
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
Count nodes and links on the network diagram and state them before calculating. Show the formula, the substitution and the result to the required decimal places, then interpret ("beta is above 1, so the network has circuits"). For business questions, set out revenue, costs and profit in a table, and finish with a risk and a way to reduce it.
:::

## Summary

:::summary
- A network consists of nodes ($v$) and links ($e$); connectivity shows how well they are joined.
- $\beta = e \div v$; $\gamma = e \div 3(v - 2)$; $\alpha = (e - v + p) \div (2v - 5)$; cyclomatic number $= e - v + p$.
- Adding links raises all the indices; plan new links by cost, benefit and resilience.
- Revenue = fare × passengers × trips; profit = revenue − fixed and variable costs; compare with the break-even load.
- Risks include fuel prices, poor roads, competition and breakdowns.
:::
`;

writeLesson("transport", "network-indices-enterprise", { title: "Transport network indices and transport enterprise", summary: "Calculate beta, gamma and alpha indices and the cyclomatic number for a transport network, suggest new links to improve connectivity, and plan a transport business with revenue, costs, profit, break-even and risk.", minutes: 40 }, body);
