---
{
  "key": "kinematics.motion-graphs",
  "title": "Displacement, velocity, acceleration and motion graphs",
  "summary": "Define displacement, velocity and acceleration, and read motion graphs: velocity is the gradient of a displacement-time graph, acceleration the gradient of a velocity-time graph, and displacement the area under a velocity-time graph.",
  "concepts": ["aphys.kinematics.motion-graphs"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A data logger fixed to a kombi travelling from Harare to Chitungwiza could record its position every second. The resulting list of numbers would be hard to read, but a graph makes the journey obvious: steep sections where it sped along, flat sections at the robots, a curve where it pulled away. Motion graphs are the fastest way to describe, compare and calculate movement, and A-Level questions expect you to move between graphs, words and numbers with confidence.

This lesson defines the quantities of kinematics and shows how gradients and areas of graphs give velocity, acceleration and displacement, including for objects that change direction. You should know speed $=$ distance $/$ time and the difference between scalars and vectors.

## Key definitions

:::definition{term="Displacement"}
The distance moved in a specified direction from a reference point: a vector, measured in metres.
:::

:::definition{term="Speed"}
The rate of change of distance travelled (distance per unit time): a scalar.
:::

:::definition{term="Velocity"}
The rate of change of displacement (change of displacement per unit time): a vector.
:::

:::definition{term="Acceleration"}
The rate of change of velocity (change of velocity per unit time): a vector, measured in $\text{m s}^{-2}$.
:::

:::formula{name="Average velocity and acceleration"}
$$
\bar{v} = \frac{\Delta s}{\Delta t} \qquad a = \frac{\Delta v}{\Delta t}
$$

$\Delta s$ is the change in displacement (m), $\Delta v$ the change in velocity ($\text{m s}^{-1}$) and $\Delta t$ the time taken (s).
:::

:::keyfact{title="The three graph rules"}
- Gradient of a displacement-time graph $=$ velocity.
- Gradient of a velocity-time graph $=$ acceleration.
- Area between a velocity-time graph and the time axis $=$ displacement.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require these definitions and graph rules, including tangents to curves and journeys that change direction.
:::

## Displacement-time graphs

- A straight line means constant velocity; its gradient is the velocity.
- A horizontal line means the object is at rest.
- A negative gradient means the object moves back towards the reference point (negative velocity).
- A curve means the velocity is changing: the velocity at an instant is the gradient of the **tangent** at that point.

:::worked-solution[Velocity from a tangent]
A car pulls away from rest. Its displacement $s$ is recorded:

| $t\,/\,\text{s}$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $s\,/\,\text{m}$ | 0 | 0.75 | 3.00 | 6.75 | 12.00 | 18.75 | 27.00 |

The graph curves upwards (the gradient keeps increasing). The tangent drawn at $t = 4.0\ \text{s}$ passes through $(2.0\ \text{s},\ 0\ \text{m})$ and $(6.0\ \text{s},\ 24.0\ \text{m})$.

![Displacement-time graph of the accelerating car (s = 0.75t²): the curve steepens, and the tangent at t = 4.0 s passes through (2.0 s, 0 m) and (6.0 s, 24.0 m), so its gradient, the velocity at that instant, is 6.0 m/s.](media:diagrams/car-displacement-time-tangent.png "Figure: the velocity at an instant is the gradient of the tangent")

1. Gradient of the tangent $= \dfrac{24.0 - 0}{6.0 - 2.0} = 6.0\ \text{m s}^{-1}$.
2. The velocity at $t = 4.0\ \text{s}$ is $6.0\ \text{m s}^{-1}$.
3. Compare the average velocity over the first 4 s: $12.0/4.0 = 3.0\ \text{m s}^{-1}$, only half the instantaneous value, because the car is still speeding up.
:::

## Velocity-time graphs

- A horizontal line: constant velocity (zero acceleration).
- A straight sloping line: constant (uniform) acceleration, equal to the gradient.
- A curve: changing acceleration; use a tangent for the acceleration at an instant.
- The area under the line gives the displacement. Area **below** the time axis is negative displacement (motion in the opposite direction).

:::worked-solution[A kombi journey]
A kombi accelerates uniformly from rest to $20\ \text{m s}^{-1}$ in $8.0\ \text{s}$, travels at $20\ \text{m s}^{-1}$ for $30\ \text{s}$, then decelerates uniformly to rest in $12\ \text{s}$.

![Velocity-time graph of the kombi: it accelerates uniformly from rest to 20 m/s in 8 s (gradient 2.5 m/s²), moves at 20 m/s for 30 s, then slows to rest in 12 s; the areas under the three sections are 80 m, 600 m and 120 m, a total displacement of 800 m.](media:diagrams/kombi-velocity-time-graph.png "Figure: the area under the v-t graph is the displacement, 800 m")

1. Acceleration in the first stage: $a = \dfrac{20 - 0}{8.0} = 2.5\ \text{m s}^{-2}$; in the last stage $a = \dfrac{0 - 20}{12} = -1.7\ \text{m s}^{-2}$.
2. Displacement = area: $\tfrac{1}{2}(8.0)(20) + (30)(20) + \tfrac{1}{2}(12)(20) = 80 + 600 + 120 = 800\ \text{m}$.
3. Average velocity $= \dfrac{800\ \text{m}}{50\ \text{s}} = 16\ \text{m s}^{-1}$.
:::

## Motion with a change of direction

A ball thrown straight up at $12\ \text{m s}^{-1}$ (taking upwards as positive and ignoring air resistance) has a velocity-time graph that is a **single straight line** of gradient $-9.81\ \text{m s}^{-2}$:

![Velocity-time graph for a ball thrown up at 12 m/s: one straight line of gradient −9.81 m/s² crossing zero at the top of the flight (t = 1.22 s); the triangle above the axis is +7.3 m (maximum height) and the equal triangle below is −7.3 m, so the net displacement is zero.](media:diagrams/thrown-ball-velocity-time-graph.png "Figure: one straight line for the whole flight; areas above and below the axis cancel")

| $t\,/\,\text{s}$ | 0 | 0.50 | 1.00 | 1.22 | 1.50 | 2.00 | 2.45 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $v\,/\,\text{m s}^{-1}$ | 12.0 | 7.1 | 2.2 | 0 | $-2.7$ | $-7.6$ | $-12.0$ |

- The line crosses the time axis at the top of the flight ($t = 1.22\ \text{s}$): the velocity is momentarily zero, but the acceleration is still $-9.81\ \text{m s}^{-2}$.
- The triangle above the axis has area $\tfrac{1}{2}(1.22)(12.0) = 7.3\ \text{m}$, the maximum height. The triangle below has the same area but is negative.
- When the ball is caught at the starting height, its **displacement** is zero but the **distance** travelled is $14.7\ \text{m}$.

The displacement-time graph for the same flight is a symmetrical arch (a parabola), with zero gradient at the top.

## Acceleration-time graphs

For uniform acceleration the acceleration-time graph is a horizontal line, and the area under it equals the change in velocity. For the thrown ball it is a horizontal line at $-9.81\ \text{m s}^{-2}$ for the whole flight, including the top.

## Common mistakes

:::mistake{title="Reading velocity from a displacement-time graph's height"}
The velocity is the **gradient**, not the value of $s$. A high, flat section of an $s$-$t$ graph means the object is far away but stationary.
:::

:::mistake{title="Zero velocity means zero acceleration"}
At the top of its flight a ball has zero velocity but is still accelerating at $9.81\ \text{m s}^{-2}$ downwards; otherwise it would stay up there.
:::

:::mistake{title="Adding areas below the axis as positive"}
For displacement, area below the time axis counts as negative. For distance travelled, add the sizes of the areas.
:::

:::mistake{title="Averaging the velocities over a curved section"}
The average velocity is total displacement ÷ total time. Averaging the start and end velocities works only for uniform acceleration.
:::

## Exam tips

:::exam-tip{title="Command words"}
"Define velocity" needs "rate of change of displacement" (not "speed in a direction" alone, and never "distance per time"). "Sketch" a graph expects the right shape, labelled axes and key values (intercepts, the time where $v = 0$). "Determine the acceleration at $t = 3\ \text{s}$" on a curve means draw a tangent and show the triangle.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 tests graph shapes, gradients and areas; Paper 2 combines graphs with the suvat equations and forces. ZIMSEC Papers 1 and 2 test the same skills.
:::

## Summary

:::summary
- Displacement, velocity and acceleration are vectors; distance and speed are scalars.
- Gradient of $s$-$t$ is velocity; tangents give instantaneous values on curves.
- Gradient of $v$-$t$ is acceleration; area under $v$-$t$ is displacement (negative below the axis).
- A thrown ball has a straight-line $v$-$t$ graph crossing the axis at the top of its flight; its acceleration is $-g$ throughout.
- Average velocity $=$ total displacement ÷ total time.
:::
