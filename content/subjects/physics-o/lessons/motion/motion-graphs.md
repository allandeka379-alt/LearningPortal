---
{
  "key": "motion.graphs",
  "title": "Distance–time and speed–time graphs",
  "summary": "Read motion from the shape of distance-time and speed-time graphs, find speed and acceleration from gradients, and find distance from the area under a speed-time graph.",
  "concepts": ["phys.motion.graphs"],
  "objectives": ["cambridge/igcse/physics:1.2.4", "cambridge/igcse/physics:1.2.5", "cambridge/igcse/physics:1.2.6", "cambridge/igcse/physics:1.2.7", "cambridge/igcse/physics:1.2.11", "zimsec/o-level/physics:2.2.1", "zimsec/o-level/physics:2.2.2"],
  "estimatedMinutes": 11
}
---
## Introduction

A graph tells the whole story of a journey at a glance: when a minibus was parked, when it was speeding up, how far it went. Examiners love motion graphs because they test understanding, not just recall. Two kinds matter: **distance-time** graphs and **speed-time** (velocity-time) graphs. They look similar but are read in different ways.

You should already know $v = s/t$ and $a = \Delta v/\Delta t$, and how to find the gradient of a straight line.

## Key definitions

:::definition{term="Gradient"}
The steepness of a line: $\dfrac{\text{change in the } y\text{-quantity}}{\text{change in the } x\text{-quantity}}$ between two points on the line.
:::

:::keyfact
On a **distance-time** graph the gradient is the **speed**. On a **speed-time** graph the gradient is the **acceleration** and the **area underneath** is the **distance travelled**.
:::

## Distance-time graphs

| Shape of the line | Motion |
| --- | --- |
| horizontal (flat) | at rest |
| straight, sloping upwards | constant speed |
| steeper straight line | faster constant speed |
| curving upwards (getting steeper) | speeding up (accelerating) |
| curving and levelling off (getting less steep) | slowing down (decelerating) |

:::worked-solution[Speed from a distance-time graph]
A straight line on a distance-time graph rises from the origin to $300\ \text{m}$ at $40\ \text{s}$.

1. Gradient $= \dfrac{300 - 0}{40 - 0} = 7.5$.
2. So the speed is $7.5\ \text{m/s}$, constant over those $40\ \text{s}$.
:::

![Distance-time graph: a straight line from the origin to 300 m at 40 s. A gradient triangle with 150 m up and 20 s across gives the speed, 7.5 m/s, which is constant because the line is straight.](media:diagrams/motion-distance-time-gradient.png "Figure: the gradient of a distance-time graph is the speed")

## Speed-time graphs

| Shape of the line | Motion |
| --- | --- |
| horizontal line above zero | constant speed |
| horizontal line on the time axis | at rest |
| straight line sloping up | constant acceleration |
| straight line sloping down | constant deceleration |
| curve getting less steep | acceleration decreasing (Supplement: changing acceleration) |

A horizontal line on a **speed-time** graph does not mean "at rest" unless it lies on the time axis. This is the most common confusion between the two kinds of graph.

![Speed-time graph of a trolley: speeds up from 0 to 12 m/s in 6 s (gradient 2.0 m/s squared), moves at a steady 12 m/s for 10 s, then slows to rest in 4 s (gradient minus 3.0 m/s squared). The areas under the three sections are 36 m, 120 m and 24 m, a total distance of 180 m.](media:diagrams/motion-speed-time-three-stage.png "Figure: gradient gives acceleration; area under the line gives distance")

:::worked-solution[A three-stage journey]
A trolley's speed-time graph has three straight sections: it speeds up from $0$ to $12\ \text{m/s}$ in the first $6\ \text{s}$, keeps $12\ \text{m/s}$ for the next $10\ \text{s}$, then slows steadily to rest in $4\ \text{s}$.

1. Acceleration in stage 1 $= \dfrac{12 - 0}{6} = 2.0\ \text{m/s}^2$.
2. Deceleration in stage 3 $= \dfrac{12}{4} = 3.0\ \text{m/s}^2$ (the gradient is $-3.0\ \text{m/s}^2$).
3. Distance $=$ area under the graph: triangle $\tfrac{1}{2} \times 6 \times 12 = 36\ \text{m}$, rectangle $10 \times 12 = 120\ \text{m}$, triangle $\tfrac{1}{2} \times 4 \times 12 = 24\ \text{m}$.
4. Total distance $= 36 + 120 + 24 = 180\ \text{m}$.
5. Average speed $= \dfrac{180}{20} = 9.0\ \text{m/s}$.
:::

### Drawing your own graphs

When you plot a graph from data: choose scales that use most of the grid, label both axes with the quantity and unit (for example "time / s"), plot points neatly, and draw a single smooth line or a ruled straight line of best fit.

### Gradient of a curve

To find the speed at one instant on a curved distance-time graph, draw a **tangent** to the curve at that point and find the tangent's gradient.

![Curved distance-time graph that gets steeper with time. A straight tangent drawn at 20 s rises 64 m over 16 s, so the speed at that instant is 4.0 m/s; the curve means the speed is increasing.](media:diagrams/motion-tangent-curve.png "Figure: a tangent to the curve gives the speed at one instant")

## Common mistakes

:::mistake{title="Reading the wrong graph"}
A horizontal line means "at rest" on a distance-time graph but "constant speed" on a speed-time graph. Check the axis labels first.
:::

:::mistake{title="Area of a triangle"}
The area of a triangular section is $\tfrac{1}{2} \times \text{base} \times \text{height}$. Forgetting the half doubles that part of the distance.
:::

:::mistake{title="Using one point for a gradient"}
A gradient needs two points on the line. Use points far apart for accuracy, and read their values carefully from the scales.
:::

## Exam tips

:::exam-tip
When asked to "describe the motion" shown by a graph, describe each section in turn with numbers: "accelerates uniformly from rest to 12 m/s in 6 s, then moves at a constant 12 m/s for 10 s …".
:::

:::exam-tip
Show the gradient triangle or the shapes you split the area into; the method marks are for showing how you used the graph.
:::

## Summary

:::summary
- Distance-time graph: gradient = speed; flat = at rest; curve getting steeper = accelerating.
- Speed-time graph: gradient = acceleration; flat (above zero) = constant speed.
- Area under a speed-time graph = distance travelled.
- A sloping-down line on a speed-time graph is a deceleration (negative gradient).
- Label axes with quantity and unit, and use large triangles for gradients.
:::
