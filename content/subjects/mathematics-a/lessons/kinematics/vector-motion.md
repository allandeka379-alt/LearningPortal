---
{
  "key": "kinematics.vector-motion",
  "title": "Vectors in kinematics: positions, velocities and paths",
  "summary": "Describe the motion of a particle moving with constant velocity by r = r₀ + tv, find speed, direction and bearing, decide whether two particles collide or only have crossing paths, find where two lines meet, and find the closest approach of two moving objects.",
  "concepts": ["amaths.kinematics.vector-motion"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

An air-traffic controller at Victoria Falls airport watches two light aircraft on radar. Each moves in a straight line at a steady speed. Will they collide? If not, how close do they come, and when? A ZESA maintenance boat on Lake Kariba sets off towards a pylon on an island: where will it be in 40 minutes? Questions like these are answered by writing each position as a **vector that depends on time**.

This topic is examined in ZIMSEC Mechanics, Form 5 (topic 6.1.2, "vector equations of lines and paths"). It builds on the vector notation of topic 6.1.1 and on the idea of velocity as a vector from straight-line kinematics. Questions are usually short structured items (6 or 7 marks in Paper 1) or one part of a long Paper 2 question on two ships or two aircraft.

:::keyfact{title="ZIMSEC and Cambridge"}
This is ZIMSEC only. Cambridge 9709 Paper 4 does not use vector notation; Cambridge students meet vector lines in Paper 3 Pure Mathematics instead.
:::

## Key definitions

:::definition{term="Position vector"}
The position vector $\mathbf{r}$ of a particle is its displacement from a fixed origin $O$. In the plane we write $\mathbf{r} = x\mathbf{i} + y\mathbf{j}$, where $\mathbf{i}$ and $\mathbf{j}$ are perpendicular unit vectors. In navigation problems $\mathbf{i}$ usually points **east** and $\mathbf{j}$ points **north**; the question always says so.
:::

:::definition{term="Constant velocity"}
A particle has constant velocity $\mathbf{v}$ when its displacement in any time interval of length $t$ is $t\mathbf{v}$. Its **speed** is the magnitude $|\mathbf{v}|$ and its **direction of motion** is the direction of $\mathbf{v}$.
:::

:::formula{name="Position at time t (constant velocity)"}
$$
\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}
$$
:::

Here $\mathbf{r}_0$ is the position when $t = 0$. This is exactly the vector equation of a straight line, $\mathbf{r} = \mathbf{a} + t\mathbf{b}$, from Pure Mathematics: the particle's **path** is the line through $\mathbf{r}_0$ with direction $\mathbf{v}$, and the parameter is now time. The ZIMSEC syllabus prints no formula list, so learn this result and the two below.

:::formula{name="Velocity from two positions"}
$$
\mathbf{v} = \frac{\mathbf{r}_2 - \mathbf{r}_1}{t_2 - t_1}
$$
:::

:::formula{name="Speed"}
$$
|a\mathbf{i} + b\mathbf{j}| = \sqrt{a^2 + b^2}
$$
:::

## Position, speed and direction

To use $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$, collect the $\mathbf{i}$ and $\mathbf{j}$ parts separately: $\mathbf{r} = (x_0 + tv_x)\mathbf{i} + (y_0 + tv_y)\mathbf{j}$. The direction of motion can be given as an angle with $\mathbf{i}$ or, with east and north axes, as a **bearing**: the angle measured clockwise from north, written with three figures.

:::worked-solution[Example 1: at noon a boat on Lake Kariba is at the point with position vector $(2\mathbf{i} + 3\mathbf{j})$ km relative to a harbour $O$, where $\mathbf{i}$ points east and $\mathbf{j}$ north. It moves with constant velocity $(4\mathbf{i} - 3\mathbf{j})$ km h$^{-1}$. Find its speed, the bearing on which it moves, and its distance from $O$ at 14:30.]
1. Speed: $|\mathbf{v}| = \sqrt{4^2 + (-3)^2} = \sqrt{25} = 5$ km h$^{-1}$.
2. The velocity points 4 east and 3 south. The angle below east is $\tan^{-1}\frac{3}{4} = 36.87°$.
3. Bearing: $90° + 36.87° = 126.9°$ (to 1 d.p.).
4. At 14:30, $t = 2.5$ h: $\mathbf{r} = (2 + 2.5 \times 4)\mathbf{i} + (3 - 2.5 \times 3)\mathbf{j} = 12\mathbf{i} - 4.5\mathbf{j}$.
5. Distance from $O$: $\sqrt{12^2 + 4.5^2} = \sqrt{164.25} = 12.8$ km (3 s.f.).
:::

Notice that time is measured **from** the moment when the position is $\mathbf{r}_0$. If the boat had been at $2\mathbf{i} + 3\mathbf{j}$ at 11:00 instead, then at 14:30 we would use $t = 3.5$.

## Collide, or only cross paths?

Two particles **collide** only if they are at the same place **at the same time**. Their **paths cross** if the two lines meet, even if the particles pass the meeting point at different times. The test is the difference between one time and two parameters.

- **Collision:** put $\mathbf{r}_P(t) = \mathbf{r}_Q(t)$ with the **same** $t$. Each component gives a value of $t$; the particles collide only if every component gives the same value.
- **Paths crossing:** write the paths with **different** parameters, $\mathbf{r}_0 + s\mathbf{v}_P$ and $\mathbf{q}_0 + u\mathbf{v}_Q$, and solve. If $s \neq u$ the particles reach the crossing point at different times.

:::worked-solution[Example 2 (exam style): particles $A$ and $B$ have position vectors $\mathbf{r}_A = (-3\mathbf{i} + 4\mathbf{j}) + t(4\mathbf{i} + \mathbf{j})$ and $\mathbf{r}_B = (3\mathbf{i} - 2\mathbf{j}) + t(\mathbf{i} + 4\mathbf{j})$ metres at time $t$ seconds. Show that $A$ and $B$ collide, and find the position vector of the point of collision.]
1. $\mathbf{i}$ components: $-3 + 4t = 3 + t$, so $3t = 6$ and $t = 2$.
2. $\mathbf{j}$ components: $4 + t = -2 + 4t$, so $3t = 6$ and $t = 2$.
3. Both components give the same time, so $A$ and $B$ are at the same point when $t = 2$: they collide.
4. Position: $\mathbf{r}_A(2) = (-3 + 8)\mathbf{i} + (4 + 2)\mathbf{j} = 5\mathbf{i} + 6\mathbf{j}$. Check with $B$: $(3 + 2)\mathbf{i} + (-2 + 8)\mathbf{j} = 5\mathbf{i} + 6\mathbf{j}$.
:::

:::worked-solution[Example 3: $P$ moves with $\mathbf{r}_P = (\mathbf{i} + 5\mathbf{j}) + t(3\mathbf{i} + \mathbf{j})$ and $Q$ with $\mathbf{r}_Q = (13\mathbf{i} - 5\mathbf{j}) + t(-2\mathbf{i} + 4\mathbf{j})$. Show that $P$ and $Q$ do not collide, but that their paths cross, and find where.]
1. Same time, $\mathbf{i}$: $1 + 3t = 13 - 2t$ gives $t = 2.4$. $\mathbf{j}$: $5 + t = -5 + 4t$ gives $t = \frac{10}{3}$. Different, so no collision.
2. Paths: $1 + 3s = 13 - 2u$ and $5 + s = -5 + 4u$.
3. From the second, $s = 4u - 10$. Substitute: $1 + 12u - 30 = 13 - 2u$, so $14u = 42$, $u = 3$ and $s = 2$.
4. Crossing point: $\mathbf{r}_P(2) = 7\mathbf{i} + 7\mathbf{j}$ (check: $\mathbf{r}_Q(3) = 7\mathbf{i} + 7\mathbf{j}$).
5. $P$ passes through this point at $t = 2$ and $Q$ at $t = 3$, one time unit later.
:::

The same method finds where any two lines meet. For the lines $\mathbf{r} = \mathbf{i} + 2\mathbf{j} + s(\mathbf{i} + 3\mathbf{j})$ and $\mathbf{r} = 7\mathbf{i} + t(-\mathbf{i} + 2\mathbf{j})$: $1 + s = 7 - t$ and $2 + 3s = 2t$ give $s = 2$, $t = 4$, so the lines meet at $3\mathbf{i} + 8\mathbf{j}$.

## How close do they come?

The displacement of $Q$ from $P$ at time $t$ is $\overrightarrow{PQ} = \mathbf{r}_Q - \mathbf{r}_P$, itself of the form $\mathbf{c} + t\mathbf{w}$. Its magnitude squared is a quadratic in $t$; completing the square (or differentiating) gives the least distance and when it happens.

:::worked-solution[Example 4: two aircraft move with $\mathbf{r}_C = (2\mathbf{i} + \mathbf{j}) + t(3\mathbf{i} + 2\mathbf{j})$ and $\mathbf{r}_D = (10\mathbf{i} - 3\mathbf{j}) + t(\mathbf{i} + 4\mathbf{j})$, distances in km and $t$ in minutes. Find the least distance between them and the time at which it occurs.]
1. $\overrightarrow{CD} = \mathbf{r}_D - \mathbf{r}_C = (8 - 2t)\mathbf{i} + (-4 + 2t)\mathbf{j}$.
2. $CD^2 = (8 - 2t)^2 + (2t - 4)^2 = 8t^2 - 48t + 80$.
3. Complete the square: $8t^2 - 48t + 80 = 8(t - 3)^2 + 8$.
4. The least value of $CD^2$ is $8$, when $t = 3$.
5. Least distance $= \sqrt{8} = 2\sqrt{2} = 2.83$ km (3 s.f.), 3 minutes after the start.
:::

A useful check: at the closest moment $\overrightarrow{CD}$ is perpendicular to the relative velocity $\mathbf{w}$. Here $\overrightarrow{CD} = 2\mathbf{i} + 2\mathbf{j}$ and $\mathbf{w} = -2\mathbf{i} + 2\mathbf{j}$, and $2(-2) + 2(2) = 0$.

## The Cartesian equation of a path

Eliminating $t$ from $x = x_0 + tv_x$ and $y = y_0 + tv_y$ gives the path as an ordinary straight-line equation. For $\mathbf{r} = (1 + 2t)\mathbf{i} + (3 - t)\mathbf{j}$: from $y$, $t = 3 - y$, so $x = 1 + 2(3 - y)$, that is $x + 2y = 7$. The gradient $-\frac{1}{2}$ matches the velocity $2\mathbf{i} - \mathbf{j}$.

## Common mistakes

:::mistake{title="Equating paths with one parameter"}
Using the same letter for both paths tests for a **collision**, not for crossing paths. Two paths can cross even when the particles never meet.
:::

:::mistake{title="Checking only one component"}
A collision needs the same $t$ from **every** component. One component alone always gives some value of $t$.
:::

:::mistake{title="Measuring the bearing from east"}
A bearing is measured clockwise from north. The velocity $4\mathbf{i} - 3\mathbf{j}$ makes $36.9°$ with east, but its bearing is $126.9°$.
:::

:::mistake{title="Forgetting where t = 0 is"}
$\mathbf{r}_0$ is the position at the time you call $t = 0$. If a question gives the position at 09:30 and asks about 11:00, use $t = 1.5$ hours, not $t = 11$.
:::

## Exam tips

:::exam-tip
"Show that the particles collide" needs both component equations solved and the same time stated, then the common position. "Find the position vector" means an answer such as $5\mathbf{i} + 6\mathbf{j}$, not a pair of coordinates.
:::

:::exam-tip
For "least distance", write $\overrightarrow{PQ}$ in terms of $t$ first, then square and add the components. Give the distance to 3 significant figures unless it is exact.
:::

:::exam-tip
State units on every answer: km h$^{-1}$ for velocities when distances are in km and times in hours.
:::

## Summary

:::summary
- Constant velocity: $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$; the path is the line through $\mathbf{r}_0$ with direction $\mathbf{v}$.
- Speed $= |\mathbf{v}|$; a bearing is measured clockwise from north (with $\mathbf{i}$ east and $\mathbf{j}$ north).
- $\mathbf{v} = \dfrac{\mathbf{r}_2 - \mathbf{r}_1}{t_2 - t_1}$ from two positions.
- Collision: same $t$ in every component. Crossing paths: different parameters $s$ and $u$.
- Least distance: square $|\mathbf{r}_Q - \mathbf{r}_P|$, complete the square in $t$.
:::
