---
{
  "key": "operations.critical-path",
  "title": "Network analysis and critical path analysis",
  "summary": "Planning a project with a network: activities, dummy activities and nodes, earliest start and latest finish times, minimum project duration, the critical path, total and free float, and the benefits and limits of critical path analysis.",
  "concepts": ["abus.operations.critical-path"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

Chipo is building a mushroom-growing hall at her farm outside Chinhoyi. Walls cannot go up until the foundations are laid and the materials have arrived, and the roof cannot be fitted before the walls. If she forgets which delay holds up the whole job, the hall opens late and the first crop is lost. **Network analysis** (called **critical path analysis** by Cambridge) is the tool that shows the order of the work, the shortest time the whole project can take and the activities that must not slip.

The technique is tested in ZIMSEC Business Studies (Forms 5 and 6), Business Enterprise Skills (Form 6) and Cambridge A Level Papers 3 and 4. You should already be able to read a table.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Network analysis; earliest start time (EST); latest finish time (LFT); minimum project duration; critical path | Critical path analysis; earliest start time; latest finish time; total float and free float |

Both boards examine the network, the EST and LFT, the critical path and the minimum duration. **Total float and free float are Cambridge A Level only**; the ZIMSEC syllabi speak of non-critical activities having time to spare. Networks are given as tables, so you are never asked to draw one.
:::

## Key definitions

:::definition{term="Critical path analysis"}
A planning technique that shows the activities of a project, the order in which they must be done and how long each takes, in order to find the shortest time in which the whole project can be completed and the activities that cannot be delayed.
:::

:::definition{term="Critical path"}
The longest route through the network from start to finish. Its activities have no spare time, so a delay to any one of them delays the whole project.
:::

:::definition{term="Float"}
The time by which a non-critical activity can be delayed. **Total float** is the delay possible without delaying the whole project; **free float** is the delay possible without delaying the earliest start of the next activity.
:::

:::keyfact{title="Rules for the numbers"}
Earliest start time (EST) of an activity = the largest earliest finish of the activities it follows (0 if it follows none). Earliest finish = EST + duration. **Minimum project duration** = the largest earliest finish. Latest finish time (LFT) = the smallest latest start of the activities that follow it (the project duration if none follow). Latest start = LFT − duration. **Total float** = latest start − EST. **Free float** = the smallest EST of the following activities − earliest finish (project duration − earliest finish if none follow). Critical activities have a total float of zero. A **dummy activity** has duration 0.
:::

## Reading the network

A network is built from **activities** (jobs that take time and resources) and **nodes** (events that mark the start or end of activities). Each activity is listed with its duration and the activities that must be finished before it can start. Where one activity depends on a different group of activities from another, a **dummy activity** of zero duration shows the dependence without using time. This course gives networks as a **precedence table** (each activity with its duration and predecessors) or an **arc table** (each activity with its start and end node).

To analyse a network, work in two passes:

1. **Forward pass.** Moving from the start, find the earliest start and finish of each activity. Where several activities lead into one, take the **largest** earliest finish. The largest finish of all is the minimum project duration.
2. **Backward pass.** Moving from the end, start with the project duration as the latest finish of the last activities. For each activity take the **smallest** latest start of the activities that follow it.

The activities where the earliest and latest times agree form the critical path.

:::worked-solution[Example 1: a precedence table]
Chipo's hall is planned as eight activities. Durations are in days.

| Activity | Description | Duration (days) | Follows |
| --- | --- | ---: | --- |
| A | Clear the site | 3 | none |
| B | Lay foundations | 4 | A |
| C | Order materials | 2 | none |
| D | Build walls | 6 | B, C |
| E | Fit electrics | 3 | D |
| F | Put on roof | 5 | D |
| G | Plaster inside | 4 | E, F |
| H | Paint | 2 | G |

| Activity | Duration | Earliest start | Earliest finish | Latest start | Latest finish | Total float | Free float |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 3 | 0 | 3 | 0 | 3 | 0 | 0 |
| B | 4 | 3 | 7 | 3 | 7 | 0 | 0 |
| C | 2 | 0 | 2 | 5 | 7 | 5 | 5 |
| D | 6 | 7 | 13 | 7 | 13 | 0 | 0 |
| E | 3 | 13 | 16 | 15 | 18 | 2 | 2 |
| F | 5 | 13 | 18 | 13 | 18 | 0 | 0 |
| G | 4 | 18 | 22 | 18 | 22 | 0 | 0 |
| H | 2 | 22 | 24 | 22 | 24 | 0 | 0 |

1. Forward pass: D follows B (finish 7) and C (finish 2), so it starts at the larger, day 7. G follows E (finish 16) and F (finish 18), so it starts at day 18.
2. The largest earliest finish is H at day 24, so the **minimum project duration is 24 days**.
3. Backward pass: E must finish by 18 (the latest start of G), so its latest start is 15. C must finish by 7, so its latest start is 5.
4. Activities with zero total float are A, B, D, F, G and H: the **critical path is A, B, D, F, G, H** (3 + 4 + 6 + 5 + 4 + 2 = 24).
5. C has 5 days of float and E has 2: ordering materials can wait until day 5.
:::

![Network for Chipo's hall: A (3 days), B (4), D (6), F (5), G (4) and H (2) all have zero float and form the critical path of 24 days; C (2 days, earliest start 0, latest start 5) has 5 days of float and E (3 days, earliest start 13, latest start 15) has 2 days of float.](media:diagrams/critical-path-network.png "Figure: the hall project as a network with earliest and latest times and float for each activity")

## Dummy activities and node times

When activities are drawn on arrows between numbered nodes, each node has an earliest start time (EST, the longest path to it) and a latest finish time (LFT). A dummy is needed when two activities share some, but not all, of their predecessors.

:::worked-solution[Example 2: an arc table with a dummy]
A small project has activities A to F. C follows A only; D and E follow both A and B; F follows C and D. A dummy activity (zero duration) from node 2 to node 3 carries the dependence of D and E on A.

| Activity | Duration (days) | Follows |
| --- | ---: | --- |
| A | 4 | none |
| B | 6 | none |
| C | 5 | A |
| D | 3 | A, B |
| E | 7 | A, B |
| F | 2 | C, D |

| Node | Earliest start time (EST) | Latest finish time (LFT) |
| --- | ---: | ---: |
| 1 | 0 | 0 |
| 2 | 4 | 6 |
| 3 | 6 | 6 |
| 4 | 9 | 11 |
| 5 | 13 | 13 |

| Activity | From | To | Duration | Total float | Free float | Critical? |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| A | 1 | 2 | 4 | 2 | 0 | no |
| B | 1 | 3 | 6 | 0 | 0 | yes |
| C | 2 | 4 | 5 | 2 | 0 | no |
| D | 3 | 4 | 3 | 2 | 0 | no |
| Dummy | 2 | 3 | 0 | 2 | 2 | no |
| E | 3 | 5 | 7 | 0 | 0 | yes |
| F | 4 | 5 | 2 | 2 | 2 | no |

1. Node 3 is reached by B (6 days) and by A plus the dummy (4 + 0 = 4), so its EST is 6.
2. Node 5 is reached by E (6 + 7 = 13) and by F (9 + 2 = 11), so the **minimum duration is 13 days**.
3. Total float of C = LFT of its end node (11) − EST of its start node (4) − duration (5) = 2. Free float of C = EST of node 4 (9) − 4 − 5 = 0.
4. The critical path is B then E (6 + 7 = 13). A has two days of total float but no free float, so delaying A delays the start of C.
:::

## Using the results

The minimum duration tells the owner when the project can finish. The critical path shows where to concentrate supervision and extra resources. If a critical activity is **crashed** (finished faster, for example by hiring more workers), the project is shorter only until another path becomes critical. Non-critical activities can be delayed by up to their float, so spare workers can be moved to critical jobs.

**Benefits:** it forces planning, shows which jobs cannot slip, helps schedule resources and makes delays easier to manage. **Limitations:** durations are estimates and may be wrong; it assumes resources are available; it shows time but not cost or quality; a large network is complex to update; and it may give a false sense of precision.

:::worked-solution[Example 3: case analysis, using float]
**Context.** In Example 1 bricks arrive late, so the walls (D) cannot start until day 9. In a second scenario the electrician starts the electrics (E) three days late.

**Point.** A delay to a critical activity delays the project; a delay to a non-critical one may not.

**Application.** D is critical. Starting on day 9 it finishes on day 15, F finishes on day 20, G on day 24 and H on day 26, so the project takes 26 days instead of 24. In the second scenario E starts on day 16 instead of 13 and finishes on day 19; G cannot start until day 19, one day later than planned, so the project takes 25 days, because the delay of 3 days is more than E's float of 2.

**Analysis.** The late bricks matter more than the electrician, because D sits on the critical path and every day lost there is lost to the project. E can slip by up to its float of 2 days at no cost to the completion date.

**Judgement.** Chipo should put her effort into a reliable supply of bricks and keep the electrician within the 2-day float.
:::

## Common mistakes

:::mistake{title="Adding all durations"}
The minimum duration is the longest path, not the total of all durations. Activities on parallel paths overlap.
:::

:::mistake{title="Using the smaller finish in the forward pass"}
When two activities lead into one, the next activity can start only when **both** are finished: take the larger earliest finish. In the backward pass take the smaller latest start.
:::

:::mistake{title="Confusing total and free float"}
Total float is about the whole project; free float is about the next activity. Free float can never be larger than total float.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 (EST, LFT, minimum duration, the critical path, benefits and limits); Cambridge Paper 3 (calculate duration, critical path and float, then analyse and evaluate) and Paper 4 (use in a case).
:::

:::exam-tip{title="Command words"}
*Calculate/identify*: show both passes, then name the critical path with its total. *State/outline* (ZIMSEC): give one benefit or limitation. *Explain/analyse*: use the float to say which delay matters and why. *Evaluate/discuss/assess*: weigh the value of the technique against the reliability of the estimates and reach a judgement.
:::

## Summary

:::summary
- A network shows activities, their durations and order; dummy activities have zero duration and show dependence.
- The forward pass takes the larger finish to give the EST; the backward pass takes the smaller start to give the LFT.
- The minimum project duration is the longest path; the critical path is the activities with zero total float.
- Total float = latest start − EST; free float = next EST − earliest finish (Cambridge A Level).
- The technique helps planning and resource use but depends on estimated durations and needs updating.
:::
