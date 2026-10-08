---
{
  "key": "transport.networks",
  "title": "Transport networks and network analysis",
  "summary": "Zimbabwe's road, rail and air links to ports and neighbours, regional and African networks, network analysis with nodes, links, the beta index and the detour index, flow-line diagrams, and transport problems and their solutions.",
  "concepts": ["geo.transport.networks"],
  "objectives": ["zimsec/o-level/geography:7.12.2.1", "zimsec/o-level/geography:7.12.2.2", "zimsec/o-level/geography:7.12.2.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A lorry carrying tobacco from Harare to the sea does not travel along a single road. It follows a **network**: a set of routes joined at towns, junctions and border posts. Some places sit where many routes meet and are easy to reach; others lie at the end of a single road. Because Zimbabwe is landlocked, the shape of its network, and how well it links to ports in Mozambique and South Africa, affects the price of almost everything bought and sold in the country.

In this lesson you will describe Zimbabwe's road, rail and air network, see how it connects to the region and to Africa, measure networks with simple indices, read flow-line diagrams, and discuss transport problems and solutions.

## Key definitions

:::definition{term="Transport network"}
A system of routes (links) joining places (nodes) so that people and goods can move between them.
:::

:::definition{term="Node (vertex)"}
A place on a network where routes meet or end: a town, junction, port, station or border post.
:::

:::definition{term="Link (edge)"}
A direct route between two nodes with no other node in between.
:::

:::definition{term="Connectivity"}
How well the nodes of a network are joined to each other. A highly connected network offers many alternative routes.
:::

:::definition{term="Accessibility"}
How easy it is to reach a place from other places on the network.
:::

:::definition{term="Transport corridor"}
A main route, often road and rail together, that carries heavy traffic between an inland area and a port or between countries.
:::

## Zimbabwe's network

**Railways.** Bulawayo is the main railway junction and the headquarters of the National Railways of Zimbabwe. From Bulawayo, lines run:

- north-west through Hwange to **Victoria Falls**, where a bridge across the Zambezi links to Zambia;
- south-west to Plumtree and into **Botswana**;
- south to **Beitbridge** and on into South Africa;
- north-east through Gweru and Kwekwe to Harare, then east to **Mutare** and the Mozambican port of **Beira**.

A line from the south-east of the country runs to the Mozambican border and on to the port of **Maputo**.

**Roads.** Trunk roads join Harare to Bulawayo, Mutare, Masvingo and Beitbridge, Chirundu and Nyamapanda; Bulawayo is linked to Victoria Falls, Plumtree and Beitbridge. Border posts such as **Beitbridge** (South Africa), **Forbes near Mutare** (Mozambique, towards Beira), **Chirundu** (Zambia) and **Nyamapanda** (Mozambique, towards Malawi) carry heavy lorry traffic.

**Air.** International airports serve Harare, Bulawayo and Victoria Falls, with smaller airfields elsewhere.

**Pipeline.** A fuel pipeline runs from Beira to Feruka near Mutare.

The pattern reflects history. Railways were built from the late 1800s to carry minerals and farm produce to the coast, so lines run from the mining and farming areas towards ports, and towns grew along them.

## Networks in the region and in Africa

Zimbabwe sits on several **regional corridors**:

- the **Beira corridor** (road, rail and pipeline from Beira through Mutare to Harare);
- the **North–South corridor** (from the South African ports through Beitbridge, Harare and Chirundu towards Zambia and the Democratic Republic of the Congo);
- the **Limpopo route** (rail from the south-east of Zimbabwe to Maputo).

Many African networks share features:

1. Lines run **inland from a port**, like branches of a tree, with few links between neighbouring countries.
2. Networks are **densest** in mining and commercial farming areas and around large cities, and thin in deserts, forests and mountains.
3. Different countries used different rail gauges, which can force goods to be transferred at borders.
4. Long-distance links built after independence, such as the TAZARA railway from Zambia to Dar es Salaam in Tanzania, gave landlocked countries alternative routes to the sea.

## Network analysis

A network can be drawn as a **topological diagram**: nodes as dots and links as straight lines, ignoring true distance and direction.

:::example{title="A fictional network"}
Six towns, P, Q, R, S, T and U, are joined by seven roads: P–Q, Q–R, R–S, Q–T, T–U, R–T and S–U. (Imagine the dots with straight lines between them.)
:::

**Beta index** measures connectivity:

$$\beta = \frac{\text{number of links}}{\text{number of nodes}}$$

- below 1.0: a simple, branching network (no circuits);
- about 1.0: one circuit;
- above 1.0: a well-connected network with alternative routes.

:::worked-solution[Beta index of the fictional network]
1. Links = 7; nodes = 6.
2. β = 7 ÷ 6 = 1.17 (to 2 decimal places).
3. β is above 1, so the network has circuits and alternative routes.
:::

The **cyclomatic number** counts the circuits: links − nodes + 1 = 7 − 6 + 1 = 2.

The **detour index** compares the real route with the straight line:

$$\text{Detour index} = \frac{\text{actual route distance}}{\text{straight-line distance}} \times 100$$

:::worked-solution[Detour index]
1. Two towns are 60 km apart in a straight line, but the road between them is 84 km long.
2. Detour index = 84 ÷ 60 × 100 = 140.
3. 100 would be a perfectly direct route; 140 means the road is 40% longer than the straight line, perhaps because it bends around hills or a lake.
:::

**Accessibility** can be compared by counting the fewest links needed to reach every other node. In the fictional network, Q, R and T each need a total of 7 links to reach all other towns, while P needs 11, so P is the least accessible town.

## Flow-line diagrams

A **flow-line diagram** shows the volume of traffic along routes. Each route is drawn as a band whose **width is proportional to the flow**. With a scale of 1 mm to 100 vehicles per day, a road carrying 2,400 vehicles per day is drawn 24 mm wide. The diagram shows at a glance which routes are busiest, for example the roads into a city centre or towards a border post.

## Transport problems and solutions

| Problem | Example of a solution |
| --- | --- |
| Long delays at busy border posts | One-stop border posts where both countries' officials work in one place (Chirundu with Zambia works this way); electronic pre-clearance of cargo |
| Potholed and narrow roads, many accidents | Road rehabilitation and dualisation of busy highways; toll fees used for maintenance; enforcement of speed and vehicle-fitness rules |
| Ageing locomotives and wagons; slow trains | Investment in new or refurbished rolling stock; repair of track and signals |
| Urban congestion and unreliable commuter transport | Large buses and commuter trains, designated ranks, bypass and ring roads |
| Overloaded lorries damaging roads | Weighbridges and fines; moving bulky goods back to rail |
| High cost of reaching ports | Using several corridors so traffic is not dependent on one route |

## Common mistakes

:::mistake{title="Counting nodes and links wrongly"}
Count every end-point and junction as a node, and every stretch between two neighbouring nodes as one link. A long road through three towns is two or more links, not one.
:::

:::mistake{title="Reading the beta index backwards"}
A higher beta index means a **better** connected network, not a worse one.
:::

:::mistake{title="Using the detour index the wrong way up"}
Divide the actual distance by the straight-line distance. The answer is always 100 or more.
:::

## Exam tips

:::exam-tip{title="Paper 2 Section C"}
Questions often give a simple network diagram in words or a table of distances. Show the formula, the substitution and the answer, then interpret it in one sentence ("β = 1.17, so the network is well connected with alternative routes"). For "discuss solutions", name the problem, the solution and how the solution helps, with a Zimbabwean example.
:::

:::exam-tip{title="Describing a network"}
Mention the main junctions (Bulawayo, Harare), the routes to ports and neighbours (Beira, Beitbridge, Victoria Falls, Chirundu) and where the network is dense or sparse.
:::

## Summary

:::summary
- Zimbabwe's network centres on Bulawayo and Harare, with road, rail and pipeline links to ports through Mozambique and South Africa.
- Regional corridors include the Beira corridor, the North–South corridor and the route to Maputo.
- Beta index = links ÷ nodes; above 1 means well connected. Cyclomatic number = links − nodes + 1.
- Detour index = actual distance ÷ straight-line distance × 100; 100 is perfectly direct.
- Flow-line widths are proportional to traffic; transport problems include border delays, poor roads, old rolling stock and urban congestion.
:::
