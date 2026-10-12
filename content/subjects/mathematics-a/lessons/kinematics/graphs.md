---
{
  "key": "kinematics.graphs",
  "title": "Displacement–time and velocity–time graphs",
  "summary": "Distinguish scalars from vectors in straight-line motion, and sketch and interpret displacement–time and velocity–time graphs using gradients and areas, including multi-stage journeys and changes of direction.",
  "concepts": ["amaths.kinematics.graphs"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A ZUPCO bus leaves a stop in Chitungwiza, speeds up, cruises along the highway and slows down at the next stop. A graph of its velocity against time tells the whole story at a glance: how quickly it accelerated, how fast it went, how far it travelled. Reading such graphs, and sketching them from a description, is a basic skill of mechanics.

Both boards examine it: ZIMSEC Mechanics Form 5 (topic 6.3, including distance–time and acceleration–time graphs) and Cambridge Paper 4 (topic 4.2). Graph questions are often the first part of a longer question, where the graph is then used to set up an equation for an unknown time or speed.

## Key definitions

:::definition{term="Scalars and vectors in one dimension"}
**Distance** and **speed** are scalars: sizes only. **Displacement**, **velocity** and **acceleration** are vectors: in straight-line motion their sign shows the direction.
:::

:::definition{term="Average speed and average velocity"}
Average speed $= \dfrac{\text{total distance}}{\text{total time}}$; average velocity $= \dfrac{\text{displacement}}{\text{total time}}$.
:::

:::keyfact{title="Gradients and areas"}
- Gradient of a displacement–time graph $=$ velocity.
- Gradient of a velocity–time graph $=$ acceleration.
- Area between a velocity–time graph and the time axis $=$ displacement (area below the axis counts as negative).
- Area under an acceleration–time graph $=$ change in velocity (ZIMSEC).
:::

None of these is on a formula list; they follow from $v = \frac{\mathrm{d}s}{\mathrm{d}t}$ and $a = \frac{\mathrm{d}v}{\mathrm{d}t}$, which you meet in the calculus lesson.

## Displacement–time graphs

A straight line means constant velocity; its gradient is the velocity. A horizontal line means the object is at rest. A line sloping down means the object is moving back towards the origin (negative velocity). A curve means the velocity is changing: a curve getting steeper means speeding up. For a distance–time graph (ZIMSEC), the graph never goes down, because distance never decreases.

## Velocity–time graphs

Straight segments mean constant acceleration. The steepness gives the size of the acceleration; a negative gradient is a deceleration if the velocity is positive. The graph crossing the time axis means the object stops for an instant and turns round.

The displacement over any interval is the area between the graph and the time axis: trapezia and triangles for straight-line graphs. If part of the graph is below the axis, that area is a displacement in the negative direction. To find a **distance**, add the sizes of the areas; to find a **displacement**, subtract the area below the axis from the area above.

:::worked-solution[Example 1: a train starts from rest and accelerates uniformly to $24$ m s$^{-1}$ in $30$ s. It travels at this speed for $2$ minutes, then decelerates uniformly to rest in $40$ s. Sketch the velocity–time graph, and find the total distance and the average speed.]
1. The graph is a trapezium: a straight line from $(0, 0)$ to $(30, 24)$, horizontal to $(150, 24)$, then a straight line down to $(190, 0)$.
2. Area of the first triangle: $\tfrac{1}{2} \times 30 \times 24 = 360$ m.
3. Rectangle: $120 \times 24 = 2880$ m (2 minutes is $120$ s).
4. Last triangle: $\tfrac{1}{2} \times 40 \times 24 = 480$ m.
5. Total distance $= 360 + 2880 + 480 = 3720$ m.
6. Average speed $= \dfrac{3720}{190} = 19.6$ m s$^{-1}$.
:::

![Velocity-time graph of a train: a line from (0, 0) up to (30, 24), horizontal to (150, 24), then down to (190, 0); the areas of the two triangles and the rectangle are 360 m, 2880 m and 480 m, so the total distance is 3720 m.](media:diagrams/vt-train-trapezium.png "Figure: the area under the velocity–time graph is the distance, 3720 m")

A quicker route for step 2 to 5: the area of a trapezium is $\tfrac{1}{2}(\text{sum of parallel sides}) \times \text{height}$, here $\tfrac{1}{2}(190 + 120) \times 24 = 3720$.

## Finding an unknown from the graph

Many questions give the total distance and ask for an unknown speed or time. Write the area in terms of the unknown and set it equal to the distance.

:::worked-solution[Example 2 (exam style): a cyclist starts from rest and accelerates uniformly for $10$ s to a speed of $V$ m s$^{-1}$. She rides at this speed for $40$ s, then decelerates uniformly to rest in $6$ s. The total distance is $816$ m. Find $V$ and the two accelerations.]
1. Area of the trapezium: $\tfrac{1}{2}(10)V + 40V + \tfrac{1}{2}(6)V = 5V + 40V + 3V = 48V$.
2. Set equal to the distance: $48V = 816$, so $V = 17$.
3. Acceleration in the first stage: gradient $\dfrac{17}{10} = 1.7$ m s$^{-2}$.
4. Last stage: gradient $-\dfrac{17}{6}$, a deceleration of $2.83$ m s$^{-2}$.
:::

## Changing direction

:::worked-solution[Example 3: a particle moves in a straight line. At $t = 0$ its velocity is $6$ m s$^{-1}$, and it has a constant acceleration of $-2$ m s$^{-2}$ for $5$ s. Find its displacement and the distance it travels in these $5$ s.]
1. Velocity: $v = 6 - 2t$, a straight line from $(0, 6)$ to $(5, -4)$, crossing the axis at $t = 3$.
2. Area above the axis (from $0$ to $3$ s): $\tfrac{1}{2} \times 3 \times 6 = 9$ m.
3. Area below the axis (from $3$ to $5$ s): $\tfrac{1}{2} \times 2 \times 4 = 4$ m, in the negative direction.
4. Displacement $= 9 - 4 = 5$ m in the original direction.
5. Distance $= 9 + 4 = 13$ m.
:::

![Velocity-time graph v = 6 - 2t from (0, 6) to (5, -4), crossing the time axis at t = 3: the area above the axis is 9 m forward and the area below is 4 m backward, so the displacement is 5 m but the distance travelled is 13 m.](media:diagrams/vt-direction-change.png "Figure: area above the axis (9 m) minus area below (4 m) gives displacement 5 m; the sum gives distance 13 m")

Using $s = ut + \tfrac{1}{2}at^2$ for the whole $5$ s gives $30 - 25 = 5$ m: the **displacement**. A suvat formula never gives the distance when the direction changes.

## Acceleration–time graphs (ZIMSEC)

On an acceleration–time graph the area between the graph and the axis is the change in velocity. For example, a particle starting from rest with acceleration $2$ m s$^{-2}$ for $4$ s and then $-1$ m s$^{-2}$ for $6$ s has velocity $0 + 2 \times 4 = 8$ m s$^{-1}$ after $4$ s and $8 - 6 = 2$ m s$^{-1}$ after $10$ s. The corresponding velocity–time graph rises from $(0, 0)$ to $(4, 8)$ and falls to $(10, 2)$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4 uses displacement–time and velocity–time graphs. ZIMSEC also examines distance–time and acceleration–time graphs, and expects you to sketch any of the four from a description.
:::

## Common mistakes

:::mistake{title="Reading the height instead of the area"}
On a velocity–time graph, the height is the velocity. The distance is the area underneath.
:::

:::mistake{title="Adding signed areas to get a distance"}
When the graph goes below the axis, distance adds the sizes of the areas; displacement subtracts.
:::

:::mistake{title="Mixing minutes and seconds"}
Convert all times to seconds before calculating areas when speeds are in m s$^{-1}$.
:::

:::mistake{title="Calling a negative velocity a deceleration"}
Deceleration means the speed is decreasing. A negative velocity with a negative acceleration means speeding up in the negative direction.
:::

## Exam tips

:::exam-tip
When asked to sketch, label the axes with quantities and units, and mark every key value (speeds and times) on the axes. Straight segments must be ruled.
:::

:::exam-tip
For "find $T$" questions, write the area as an expression in $T$ before substituting numbers; one equation usually finishes the question.
:::

:::exam-tip
Always say which you are finding: distance or displacement. Examiners use both words deliberately.
:::

## Summary

:::summary
- Distance and speed are scalars; displacement, velocity and acceleration are vectors with signs in one dimension.
- Gradient of a displacement–time graph is velocity; gradient of a velocity–time graph is acceleration.
- Area under a velocity–time graph is displacement; area below the axis is negative.
- Distance adds the sizes of the areas; displacement subtracts the parts below the axis.
- ZIMSEC: area under an acceleration–time graph is the change in velocity.
:::
