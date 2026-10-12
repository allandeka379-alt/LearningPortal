---
{
  "key": "mechanics.kinematics-graphs",
  "title": "Displacement, velocity and acceleration: motion graphs",
  "summary": "Tell scalars from vectors (distance and displacement, speed and velocity), find average speed, and read displacement–time and velocity–time graphs: gradients give velocity and acceleration, areas give displacement.",
  "concepts": ["amath.mechanics.kinematics-graphs"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Kinematics describes how things move without asking why. A kombi on the Harare–Mutare road, a cyclist in Gweru or a stone dropped into a borehole all move along a line, and three quantities describe that motion: where the object is (displacement), how fast its position changes (velocity) and how fast its velocity changes (acceleration).

In ZIMSEC Paper 2 Mechanics, motion graphs appear on their own and inside longer questions: you sketch a velocity–time graph for a journey in stages, then use its gradients and areas to find unknown speeds, times and distances. This lesson builds those skills; the next one adds the equations of motion for constant acceleration.

You should already be able to find the gradient of a straight line and the areas of triangles, rectangles and trapezia.

## Key definitions

:::definition{term="Scalar and vector"}
A scalar has size (magnitude) only, for example distance, speed, time and mass. A vector has size and direction, for example displacement, velocity, acceleration and force.
:::

:::definition{term="Distance and displacement"}
Distance is the total length of path travelled. Displacement is the position relative to a fixed starting point, measured along the line with a sign (or direction): $+30$ m means 30 m in the positive direction.
:::

:::definition{term="Speed and velocity"}
Speed is the rate at which distance is covered. Velocity is the rate of change of displacement; its sign shows the direction of motion.
:::

:::definition{term="Acceleration"}
The rate of change of velocity, in m s$^{-2}$. A negative acceleration when the velocity is positive means the object is slowing down (a deceleration or retardation).
:::

:::formula{name="Averages over a journey"}
$$
\text{average speed} = \frac{\text{total distance}}{\text{total time}}, \qquad \text{average velocity} = \frac{\text{displacement}}{\text{total time}}
$$
:::

## Distance, displacement and average speed

Distance can never decrease during a journey; displacement goes down whenever the object moves back towards the start. A journey that ends where it started has displacement zero, however far the object travelled.

Average speed is **not** the average of the speeds unless every stage takes the same time. Always go back to total distance and total time, in consistent units.

:::worked-solution[Example 1: Tendai walks 1.2 km east in 15 minutes, then 0.6 km west in 10 minutes. Find his average speed and average velocity in m s$^{-1}$.]
1. Total distance $= 1200 + 600 = 1800$ m.
2. Displacement $= 1200 - 600 = 600$ m east of the start.
3. Total time $= 25$ min $= 1500$ s.
4. Average speed $= \dfrac{1800}{1500} = 1.2$ m s$^{-1}$.
5. Average velocity $= \dfrac{600}{1500} = 0.4$ m s$^{-1}$ east.
:::

## Displacement–time graphs

Time goes on the horizontal axis and displacement on the vertical axis.

- The **gradient** is the velocity. A straight segment means constant velocity.
- A **horizontal** segment means the object is at rest.
- A segment sloping **down** means a negative velocity: the object is moving back towards the start.
- A **curve** that gets steeper means the speed is increasing.

For example, a cyclist's displacement–time graph joins $(0, 0)$ to $(20, 100)$, stays at 100 m until $t = 30$ s and then falls in a straight line to $(50, 0)$. Her velocities are $\frac{100}{20} = 5$ m s$^{-1}$, then 0, then $\frac{-100}{20} = -5$ m s$^{-1}$. She travels 200 m but her final displacement is 0.

## Velocity–time graphs

Time goes on the horizontal axis and velocity on the vertical axis.

- The **gradient** is the acceleration. A horizontal segment means constant velocity (zero acceleration).
- The **area** between the graph and the time axis is the displacement. Area above the axis counts as positive, area below as negative.
- For the **distance** travelled, add all the areas as positive amounts.
- Where the graph **crosses** the time axis the object stops and changes direction.

| Graph | Gradient | Area under the graph |
| --- | --- | --- |
| displacement–time | velocity | not used |
| velocity–time | acceleration | displacement |

:::worked-solution[Example 2: a kombi starts from rest and accelerates uniformly to 20 m s$^{-1}$ in 10 s. It travels at 20 m s$^{-1}$ for 60 s, then decelerates uniformly to rest in 8 s. Find the acceleration, the deceleration and the total distance.]
1. The graph is a trapezium: up from $(0, 0)$ to $(10, 20)$, level to $(70, 20)$, down to $(78, 0)$.
2. Acceleration $= \dfrac{20 - 0}{10} = 2$ m s$^{-2}$.
3. Deceleration $= \dfrac{20}{8} = 2.5$ m s$^{-2}$ (the gradient is $-2.5$).
4. Distance = area of the trapezium $= \dfrac{1}{2}(78 + 60) \times 20 = 1380$ m.
5. Check by parts: $\frac{1}{2}(10)(20) + 60(20) + \frac{1}{2}(8)(20) = 100 + 1200 + 80 = 1380$ m.
:::

![Velocity-time graph of the kombi: it accelerates at 2 m/s^2 from rest to 20 m/s in 10 s, travels at 20 m/s until 70 s, then decelerates at 2.5 m/s^2 to rest at 78 s; the area under the graph, 1380 m, is the total distance.](media:diagrams/velocity-time-kombi.png "Figure: the area under the velocity-time graph is the distance travelled, 1380 m")

### Working backwards to an unknown

Exam questions usually give the total distance and ask for a speed or time. Write the area in terms of the unknown and solve.

:::worked-solution[Example 3: a train starts from rest at a station, accelerates uniformly for 20 s to a speed $V$ m s$^{-1}$, travels at that speed for 2 minutes, then decelerates uniformly to rest in 30 s. The stations are 2.9 km apart. Find $V$ and the acceleration and deceleration.]
1. Total time $= 20 + 120 + 30 = 170$ s; the top of the trapezium is 120 s long.
2. Area $= \dfrac{1}{2}(170 + 120)V = 145V$.
3. $145V = 2900$, so $V = 20$.
4. Acceleration $= \dfrac{20}{20} = 1$ m s$^{-2}$; deceleration $= \dfrac{20}{30} = \dfrac{2}{3} \approx 0.667$ m s$^{-2}$.
:::

:::worked-solution[Example 4: a particle moves with velocity 8 m s$^{-1}$ at $t = 0$ and has constant acceleration $-2$ m s$^{-2}$ for 6 s. Find the distance travelled and the displacement after 6 s.]
1. The velocity–time graph is a straight line from $(0, 8)$ with gradient $-2$, so it crosses the axis at $t = 4$ and ends at $(6, -4)$.
2. Area above the axis: $\frac{1}{2}(4)(8) = 16$ m (moving forwards).
3. Area below the axis: $\frac{1}{2}(2)(4) = 4$ m (moving backwards).
4. Distance $= 16 + 4 = 20$ m. Displacement $= 16 - 4 = 12$ m.
:::

### Describing a sketch

When asked to sketch a graph, state the key points with coordinates: the start, every change of stage, every crossing of the axis and the end. Straight segments mean constant velocity (on a displacement–time graph) or constant acceleration (on a velocity–time graph).

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is in ZIMSEC Paper 2 Mechanics only, with constant accelerations and straight-line graphs. Cambridge 0606 treats motion with calculus instead (see "Kinematics with calculus").
:::

## Common mistakes

:::mistake{title="Averaging the speeds"}
Travelling at 60 km/h for 1 hour and 40 km/h for 2 hours does not give an average speed of 50 km/h. Total distance $140$ km over $3$ hours gives about 46.7 km/h.
:::

:::mistake{title="Reading a velocity–time graph as a picture of the road"}
A line sloping down on a velocity–time graph means slowing down, not going downhill or turning back. The object turns back only where the graph crosses the time axis.
:::

:::mistake{title="Mixing units"}
Minutes and kilometres must be changed to seconds and metres before calculating in m s$^{-1}$ and m s$^{-2}$.
:::

:::mistake{title="Adding signed areas for a distance"}
Area below the time axis subtracts for displacement but adds for distance.
:::

## Exam tips

:::exam-tip
When you **sketch** a velocity–time graph, label the axes with units and mark the values of every corner, including the unknown $V$ or $T$.
:::

:::exam-tip
For "find the total distance", split the area into triangles and rectangles or use the trapezium rule $\frac{1}{2}(a + b)h$, and show the expression before the number.
:::

:::exam-tip
"Decelerates at 2 m s$^{-2}$" means the gradient is $-2$. Give a deceleration as a positive number and an acceleration with its sign.
:::

## Summary

:::summary
- Distance and speed are scalars; displacement, velocity and acceleration are vectors.
- Average speed = total distance ÷ total time, never the mean of the speeds.
- Gradient of a displacement–time graph = velocity; gradient of a velocity–time graph = acceleration.
- Area under a velocity–time graph = displacement; count all areas as positive for distance.
- For an unknown speed or time, write the area in terms of it and solve.
:::
