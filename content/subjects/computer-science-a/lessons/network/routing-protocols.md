---
{
  "key": "network.routing-protocols",
  "title": "Routing protocols: RIP and OSPF",
  "summary": "How routers learn routes: static and dynamic routing, routing tables, hop count and cost metrics, the Routing Information Protocol (distance-vector, 15-hop limit) and Open Shortest Path First (link-state, cost, shortest-path calculation, areas), and choosing between them for a network of a given size.",
  "concepts": ["acs.network.routing-protocols"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A packet from a school in Bulawayo to a server in Harare passes through several routers, and each router must know which neighbour to hand the packet to next. In a small network the technician can type those answers in by hand. In a large network, links fail, new links are added and traffic changes, so routers have to **learn routes automatically** and **change them when something breaks**. The rules they follow to do this are **routing protocols**.

This lesson covers static and dynamic routing, the two metrics (hop count and cost), and the two routing protocols named in the ZIMSEC syllabus: **RIP** and **OSPF**. You should already know what a router, a routing table and packet switching are.

## Key definitions

:::definition{term="Routing table"}
A list kept by a router of destination networks, the next router (next hop) to send packets to for each one, and a metric measuring how good the route is.
:::

:::definition{term="Metric"}
A number used to compare routes so that the router can choose the best, such as the number of hops or a cost based on link speed.
:::

:::definition{term="Static routing"}
Routes entered into the routing table by hand by an administrator. They do not change unless the administrator changes them.
:::

:::definition{term="Dynamic routing"}
Routes learnt and updated automatically by routers exchanging information using a routing protocol.
:::

## Static and dynamic routing

| | Static routing | Dynamic routing |
|---|---|---|
| Who sets the routes | The administrator | The routers, using a protocol |
| If a link fails | The table is not changed, so packets are lost until the administrator corrects it | The routers find another route automatically |
| Network traffic | None for routing | Routers exchange routing messages |
| Suits | Small, simple networks with few routes, or one fixed route such as a branch's link to head office | Larger networks that change |
| Effort | A lot of manual work as the network grows | Little manual work |

## Metrics

- **Hop count.** The number of routers a packet passes through. The route with the fewest hops is preferred. It ignores the speed of the links.
- **Cost.** A number worked out from the properties of a link, usually its bandwidth: a fast link has a low cost and a slow link a high cost. The route with the lowest total cost is preferred. A commonly used rule is cost = 100 Mbit/s ÷ the link bandwidth in Mbit/s.

| Link bandwidth (Mbit/s) | Cost |
|:-:|:-:|
| 100 | 1 |
| 10 | 10 |
| 2 | 50 |
| 1 | 100 |

## RIP: Routing Information Protocol

RIP is a **distance-vector** protocol. Each router knows only its own table and what its neighbours tell it.

- The metric is the **hop count**.
- Every 30 seconds (and when something changes) each router sends **its whole routing table** to its neighbours. A router adds 1 to the hop count of each route it learns from a neighbour and keeps the best.
- The **maximum is 15 hops**. A route of 16 hops is treated as unreachable, so RIP cannot be used in a network where routers are more than 15 hops apart.
- Strengths: simple to set up and understand; needs little processing. Weaknesses: slow to adjust after a change (the information has to pass from router to router), ignores the speed of the links, and sends the full table regularly, using bandwidth.

## OSPF: Open Shortest Path First

OSPF is a **link-state** protocol. Each router builds a map of the whole network.

- Each router tells **all the routers in its area** about the state and **cost** of its own links (it sends link-state advertisements). Updates are sent only when something changes.
- Each router stores what it has learnt in its **link-state database**. Every router in the area has the same database, so each has the same map of the network.
- Each router then runs a shortest-path calculation on the map, using the idea of **Dijkstra's algorithm**, to find the lowest-cost route to every destination.
- Large networks are divided into **areas** to keep each database and each calculation small.
- Strengths: adjusts quickly to a change; uses link cost, so it picks faster links; scales to large networks. Weaknesses: more complicated to configure, and more memory and processing power are needed in the routers.

| | RIP | OSPF |
|---|---|---|
| Type | Distance-vector | Link-state |
| Metric | Hop count | Cost (based on bandwidth) |
| Maximum size | 15 hops | Very large, divided into areas |
| Updates | Whole table every 30 seconds | Only changes, sent to the area |
| Speed of adjusting | Slow | Fast |
| Router resources | Low | Higher |

:::worked-solution{title="Same network, different protocols"}
Router A must reach router F. The links and their OSPF costs are:

| Link | OSPF cost |
|:-:|:-:|
| A - B | 50 |
| B - F | 50 |
| A - C | 10 |
| C - D | 10 |
| D - E | 10 |
| E - F | 10 |

1. **RIP** counts hops. The route A → B → F is 2 hops; the route A → C → D → E → F is 4 hops. RIP chooses **A → B → F**.
2. **OSPF** adds costs. A → B → F costs 50 + 50 = 100; A → C → D → E → F costs 10 + 10 + 10 + 10 = 40. OSPF chooses **A → C → D → E → F**, even though it has more hops.
3. The links A - B and B - F are slow, which RIP does not take into account. OSPF avoids them.
:::

:::worked-solution{title="Choosing a protocol for a network"}
(a) A school campus in Gweru has 6 routers, all within 3 hops of each other, and a technician who looks after the network part-time. (b) A bank has 120 routers in Harare, Bulawayo, Mutare and many other towns, with some routes of more than 15 hops, and links of very different speeds.

1. (a) RIP is simple to set up and is within the 15-hop limit, so it is suitable.
2. (b) RIP cannot handle routes of more than 15 hops, and its slow adjustment and ignorance of link speed are poor for a large network. OSPF, with areas for the different regions and a cost based on speed, is the correct choice.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is ZIMSEC only (Form 5), and appears in ZIMSEC Paper 2 section C (routing decisions with RIP hop counts and OSPF costs on a given topology). Cambridge does not examine RIP and OSPF; it covers how a router forwards packets in the packet-switching lesson.
:::

## Common mistakes

:::mistake{title="Saying that RIP uses link speed"}
RIP counts only hops, so it may choose a short route that goes over slow links. OSPF uses cost.
:::

:::mistake{title="Forgetting the 15-hop limit"}
A route of 16 hops is unreachable in RIP. Quote the limit when a question asks why RIP is unsuitable for a large network.
:::

:::mistake{title="Calling OSPF a distance-vector protocol"}
OSPF is link-state: every router has a map of the network and calculates the shortest path. RIP is distance-vector.
:::

:::mistake{title="Adding hop counts instead of costs for OSPF"}
For OSPF add the costs of the links on the route. For RIP count the hops.
:::

## Exam tips

:::exam-tip
In a route-choice question write the candidate routes, then the RIP total (number of hops) and the OSPF total (sum of costs) for each, and state which is chosen. Showing the totals earns the method marks.
:::

:::exam-tip
"**Compare RIP and OSPF**": use matching points: type, metric, size limit, update method, speed of adjustment, router resources.
:::

:::exam-tip
"**State why OSPF suits a large network**": it divides the network into areas, uses a cost based on link speed, sends updates only on change, and adjusts quickly.
:::

## Summary

:::summary
- Static routes are entered by hand; dynamic routes are learnt by routers using a routing protocol and change when links fail.
- A routing table lists destinations, the next hop and a metric; the metric is a hop count or a cost based on link bandwidth.
- RIP is distance-vector: it uses the hop count, sends its whole table every 30 seconds and allows at most 15 hops.
- OSPF is link-state: routers share link costs, build the same map (link-state database), calculate shortest paths with Dijkstra's idea, and use areas.
- RIP suits small simple networks; OSPF suits large networks with links of different speeds.
:::
