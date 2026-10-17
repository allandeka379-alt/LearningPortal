---
{
  "key": "vectors.velocity",
  "title": "Velocity vectors and relative position",
  "summary": "Treat velocity as a vector: find speed and direction, write a velocity of given speed in a given direction, use r = r₀ + tv for constant velocity, decide when two particles collide or are a given distance apart, and combine velocities, as for a boat crossing a river.",
  "concepts": ["amath.vectors.velocity"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A ferry crossing Lake Kariba, a light aircraft flying from Harare to Victoria Falls in a cross-wind, a canoe paddling across the Zambezi: in each case the direction a craft points and the direction it actually travels can differ, because velocities combine as vectors. Vector methods also answer practical safety questions: will two boats collide, and when will they be within radio range of each other?

This lesson applies the vector skills of the previous two lessons to motion with **constant velocity**. Cambridge 0606 (topic 13) asks for velocities to be composed and resolved and for positions to be found from a velocity vector, usually with $\mathbf{i}$ pointing east and $\mathbf{j}$ pointing north.

## Key definitions

:::definition{term="Velocity and speed"}
Velocity is a vector: it has a size and a direction. Speed is the magnitude of the velocity: if $\mathbf{v} = 6\mathbf{i} + 8\mathbf{j}$ km/h, the speed is $|\mathbf{v}| = 10$ km/h.
:::

:::definition{term="Position at time t"}
A particle that is at the point with position vector $\mathbf{r}_0$ when $t = 0$ and moves with constant velocity $\mathbf{v}$ has position vector $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$ at time $t$.
:::

:::definition{term="Resultant velocity"}
When a body has a velocity relative to a medium (a boat relative to the water, a plane relative to the air) and the medium itself moves (a current, a wind), the actual velocity is the vector sum of the two.
:::

:::formula{name="Velocity results (not in Cambridge's List of formulas)"}
$$
\text{speed} = |\mathbf{v}|, \qquad \mathbf{v} = \text{speed} \times \hat{\mathbf{d}}, \qquad \mathbf{r} = \mathbf{r}_0 + t\mathbf{v}
$$
where $\hat{\mathbf{d}}$ is the unit vector in the direction of motion.
:::

## Speed and direction

:::worked-solution[Example 1: a boat has velocity $(6\mathbf{i} + 8\mathbf{j})$ km/h, where $\mathbf{i}$ points east and $\mathbf{j}$ north. Find its speed and the bearing on which it travels.]
1. Speed $= \sqrt{6^2 + 8^2} = 10$ km/h.
2. Angle above the east direction: $\tan\theta = \frac{8}{6}$, so $\theta = 53.1°$.
3. Bearings are measured clockwise from north, so the bearing is $90° - 53.1° = 036.9°$.
:::

To write a velocity of known speed in a known direction, multiply the speed by the unit vector. A canoe moving at 26 km/h in the direction of $5\mathbf{i} + 12\mathbf{j}$: $|5\mathbf{i} + 12\mathbf{j}| = 13$, so $\mathbf{v} = \frac{26}{13}(5\mathbf{i} + 12\mathbf{j}) = (10\mathbf{i} + 24\mathbf{j})$ km/h.

## Position from velocity: r = r₀ + tv

Each hour (or second) the particle adds one copy of $\mathbf{v}$ to its position.

:::worked-solution[Example 2: a boat leaves the point with position vector $(2\mathbf{i} + 3\mathbf{j})$ km at noon and moves with velocity $(4\mathbf{i} - 2\mathbf{j})$ km/h. Find its position at 14:30 and the time when it is due east of the origin.]
1. $\mathbf{r} = (2\mathbf{i} + 3\mathbf{j}) + t(4\mathbf{i} - 2\mathbf{j}) = (2 + 4t)\mathbf{i} + (3 - 2t)\mathbf{j}$, with $t$ in hours after noon.
2. At 14:30, $t = 2.5$: $\mathbf{r} = 12\mathbf{i} - 2\mathbf{j}$, so the boat is at $(12, -2)$.
3. Due east of $O$ means the $\mathbf{j}$ component is 0 (and the $\mathbf{i}$ component positive): $3 - 2t = 0$, so $t = 1.5$.
4. At 13:30 the boat is at $8\mathbf{i}$, due east of $O$.
:::

## Collisions

Two particles collide if they are at the **same place at the same time**. Equate the $\mathbf{i}$ components to find a time, then check that the $\mathbf{j}$ components agree at that **same** time.

:::worked-solution[Example 3: $\mathbf{r}_P = (1 + 2t)\mathbf{i} + (3 + t)\mathbf{j}$ and $\mathbf{r}_Q = (10 - t)\mathbf{i} + (-3 + 3t)\mathbf{j}$. Show that $P$ and $Q$ collide, and find where.]
1. $\mathbf{i}$: $1 + 2t = 10 - t$, so $t = 3$.
2. $\mathbf{j}$ at $t = 3$: $P$ gives $3 + 3 = 6$; $Q$ gives $-3 + 9 = 6$. They agree.
3. Both are at $(7, 6)$ when $t = 3$, so they collide there.
:::

If the $\mathbf{j}$ components had disagreed, the paths would cross but the particles would pass through the crossing point at different times: no collision.

## Distance between two particles

The vector from $P$ to $Q$ at time $t$ is $\overrightarrow{PQ} = \mathbf{r}_Q - \mathbf{r}_P$. Its magnitude is the distance between them, a function of $t$.

:::worked-solution[Example 4: $\mathbf{r}_P = (2\mathbf{i} + \mathbf{j}) + t(3\mathbf{i} + 2\mathbf{j})$ and $\mathbf{r}_Q = (18\mathbf{i} - 11\mathbf{j}) + t(-\mathbf{i} + 5\mathbf{j})$, in km and hours. Find when they are 10 km apart.]
1. $\overrightarrow{PQ} = (16 - 4t)\mathbf{i} + (-12 + 3t)\mathbf{j} = (4 - t)(4\mathbf{i} - 3\mathbf{j})$.
2. $|\overrightarrow{PQ}| = |4 - t| \times |4\mathbf{i} - 3\mathbf{j}| = 5|4 - t|$.
3. $5|4 - t| = 10$ gives $4 - t = \pm 2$, so $t = 2$ or $t = 6$.
4. Check $t = 2$: $\overrightarrow{PQ} = 8\mathbf{i} - 6\mathbf{j}$, of length 10. ✓ (At $t = 4$ the distance is 0: they collide.)
:::

Usually the factorisation in step 1 is not available; then square the magnitude, set it equal to the square of the distance and solve the quadratic in $t$.

## Combining velocities: the river crossing

A canoeist paddles at $2.5$ m/s relative to the water across a river $120$ m wide; the current flows at $1.5$ m/s parallel to the banks.

- **Heading straight across:** the resultant velocity is the sum of $2.5$ m/s across and $1.5$ m/s downstream. Speed $= \sqrt{2.5^2 + 1.5^2} \approx 2.92$ m/s. The crossing takes $\frac{120}{2.5} = 48$ s (only the across component matters), and in that time the current carries the canoe $1.5 \times 48 = 72$ m downstream.
- **To land directly opposite:** point upstream at an angle $\alpha$ to the straight-across direction so that the upstream component of the paddling cancels the current: $2.5\sin\alpha = 1.5$, so $\alpha = 36.9°$. The resultant is straight across with speed $\sqrt{2.5^2 - 1.5^2} = 2$ m/s, and the crossing takes $\frac{120}{2} = 60$ s.

:::worked-solution[Example 5: the same results as vectors, with $\mathbf{i}$ downstream and $\mathbf{j}$ across the river]
1. Current: $1.5\mathbf{i}$. Paddling straight across: $2.5\mathbf{j}$. Resultant: $1.5\mathbf{i} + 2.5\mathbf{j}$.
2. Time to cross: $\mathbf{j}$ component of position $= 2.5t = 120$, so $t = 48$ s; drift $= 1.5 \times 48 = 72$ m.
3. To go directly across, paddle with velocity $-1.5\mathbf{i} + q\mathbf{j}$ where $1.5^2 + q^2 = 2.5^2$, so $q = 2$: resultant $2\mathbf{j}$, time 60 s.
:::

![Velocity triangles for a canoe paddled at 2.5 m/s in a river with a 1.5 m/s current: heading straight across gives a resultant of about 2.92 m/s and 72 m of drift in 48 s; aiming upstream at 36.9 degrees makes the resultant 2 m/s straight across, taking 60 s.](media:diagrams/velocity-river-crossing.png "Figure: paddle velocity plus current velocity equals the resultant; aiming upstream cancels the drift")

:::keyfact{title="ZIMSEC and Cambridge"}
Velocity vectors are examined as pure vectors in Cambridge 0606 only. ZIMSEC candidates compose and resolve velocities and forces in Mechanics with the same right-angled-triangle methods.
:::

## Common mistakes

:::mistake{title="Checking only one component for a collision"}
Equal $\mathbf{i}$ components at some time is not enough. The $\mathbf{j}$ components must agree at the same time.
:::

:::mistake{title="Using different times for the two particles"}
Both particles' positions must be written with the same $t$, measured from the same starting moment.
:::

:::mistake{title="Using the resultant speed for the crossing time"}
The time to cross depends only on the component of velocity across the river, not on the resultant speed.
:::

:::mistake{title="Confusing speed and velocity"}
"Find the velocity" needs a vector (or a speed and direction); "find the speed" needs a single positive number.
:::

## Exam tips

:::exam-tip
Write each position as one vector, $(\ldots)\mathbf{i} + (\ldots)\mathbf{j}$, in terms of $t$ before answering any part. Most later parts then take one line each.
:::

:::exam-tip
For "distance apart", form $\overrightarrow{PQ}$ first, then $|\overrightarrow{PQ}|^2$; reject negative times and say why.
:::

:::exam-tip
Give bearings as three-figure angles measured clockwise from north, for example $036.9°$.
:::

## Summary

:::summary
- Speed is the magnitude of velocity; a velocity of given speed in a direction is speed × unit vector.
- Constant velocity: $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$.
- Collision: equal positions at the same time; check both components.
- Distance apart at time $t$ is $|\mathbf{r}_Q - \mathbf{r}_P|$; square it to form an equation in $t$.
- Velocities add as vectors; for a river crossing, the time depends only on the component across the river.
:::
