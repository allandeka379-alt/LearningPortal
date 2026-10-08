---
{
  "key": "motion.equations-of-motion",
  "title": "Equations of uniformly accelerated motion",
  "summary": "Choose and use the four equations of motion for constant acceleration to find velocities, distances, times and accelerations.",
  "concepts": ["phys.motion.equations-of-motion"],
  "objectives": ["zimsec/o-level/physics:2.1.3"],
  "estimatedMinutes": 9,
  "applies": ["zimsec"]
}
---
## Introduction

The ZIMSEC syllabus asks you to use the **equations of linear motion** (topic 2.1). They let you work out how far a truck travels while braking, or how long a mango takes to fall from a tree, without drawing a graph. They only work when the acceleration is **constant** (uniform).

You should already know $v = s/t$ and $a = (v - u)/t$.

## Key definitions

:::definition{term="Uniform acceleration"}
Acceleration that stays the same size and direction throughout the motion.
:::

The five quantities (often remembered as **suvat**):

| Symbol | Quantity | Unit |
| --- | --- | --- |
| $s$ | displacement | m |
| $u$ | initial velocity | m/s |
| $v$ | final velocity | m/s |
| $a$ | acceleration | m/s² |
| $t$ | time | s |

:::formula{name="The equations of motion"}
$$
v = u + at
$$

$$
s = ut + \tfrac{1}{2}at^2
$$

$$
v^2 = u^2 + 2as
$$

$$
s = \frac{(u + v)}{2}\,t
$$
:::

Each equation leaves out one of the five quantities. Write down the three you know and the one you want, then choose the equation that contains exactly those four.

## Worked examples

:::worked-solution[A car accelerating on the highway]
A car moving at $12\ \text{m/s}$ accelerates uniformly at $1.5\ \text{m/s}^2$ for $8.0\ \text{s}$. How far does it travel?

1. Known: $u = 12$, $a = 1.5$, $t = 8.0$. Wanted: $s$. ($v$ is not needed.)
2. Use $s = ut + \tfrac{1}{2}at^2$.
3. $s = 12 \times 8.0 + \tfrac{1}{2} \times 1.5 \times 8.0^2 = 96 + 48 = 144\ \text{m}$.
:::

:::worked-solution[A lorry braking to a stop]
A lorry travelling at $30\ \text{m/s}$ stops in a distance of $75\ \text{m}$. Find its deceleration.

1. Known: $u = 30$, $v = 0$, $s = 75$. Wanted: $a$. ($t$ is not needed.)
2. Use $v^2 = u^2 + 2as$: $0 = 30^2 + 2 \times a \times 75$.
3. $0 = 900 + 150a$, so $a = -6.0\ \text{m/s}^2$.
4. The deceleration is $6.0\ \text{m/s}^2$.
:::

:::worked-solution[Distance from average velocity]
A cyclist speeds up uniformly from $6\ \text{m/s}$ to $14\ \text{m/s}$ in $5\ \text{s}$.

1. Known: $u = 6$, $v = 14$, $t = 5$. Wanted: $s$.
2. Use $s = \dfrac{(u + v)}{2}t = \dfrac{6 + 14}{2} \times 5 = 10 \times 5 = 50\ \text{m}$.
:::

## Free fall with the equations

For an object falling freely from rest, $u = 0$ and $a = g$ (take $g = 10\ \text{m/s}^2$ or $9.8\ \text{m/s}^2$ as the question says). For a ball thrown upwards, take upwards as positive: then $a = -g$, and at the highest point $v = 0$.

## Common mistakes

:::mistake{title="Using the equations when the acceleration changes"}
The equations are for **uniform** acceleration only. For a falling parachutist approaching terminal velocity, the acceleration changes, so use a graph instead.
:::

:::mistake{title="Sign errors"}
Choose a positive direction and keep to it. A velocity or acceleration in the opposite direction is negative.
:::

:::mistake{title="Forgetting to square"}
In $s = ut + \tfrac{1}{2}at^2$ only $t$ is squared, and in $v^2 = u^2 + 2as$ remember to take the square root at the end when finding $v$.
:::

## Exam tips

:::exam-tip
List $s$, $u$, $v$, $a$, $t$ with the values you know before choosing an equation; examiners give a mark for the correct equation even if the arithmetic slips.
:::

:::exam-tip
"Starts from rest" means $u = 0$; "comes to rest" means $v = 0$; "dropped" means $u = 0$ and $a = g$.
:::

## Summary

:::summary
- The equations of motion apply only to uniform (constant) acceleration.
- $v = u + at$, $s = ut + \tfrac{1}{2}at^2$, $v^2 = u^2 + 2as$, $s = \tfrac{(u + v)}{2}t$.
- Pick the equation that contains the three known quantities and the one you want.
- Keep signs consistent: a deceleration is a negative acceleration.
- In free fall from rest, $u = 0$ and $a = g$.
:::
