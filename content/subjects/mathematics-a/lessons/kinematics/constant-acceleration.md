---
{
  "key": "kinematics.constant-acceleration",
  "title": "Motion in a straight line with constant acceleration",
  "summary": "Derive and use the five constant-acceleration formulae, including vertical motion under gravity, and solve problems with two moving objects by forming more than one equation.",
  "concepts": ["amaths.kinematics.constant-acceleration"],
  "estimatedMinutes": 55,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A kombi pulls away from the rank in Harare and speeds up along Samora Machel Avenue; a stone dropped from the Victoria Falls Bridge falls towards the Zambezi; a goods train brakes to a halt at Bulawayo station. When the acceleration is constant, five short formulae describe each of these motions completely.

These formulae, often called the *suvat* equations, are the most used tool in A Level mechanics. ZIMSEC Mechanics examines them in Form 5 (topic 6.3) and asks you to **derive** them; Cambridge Paper 4 (topic 4.2) uses them in almost every paper, on their own and inside Newton's-law questions. You need the idea of velocity as the gradient of a displacement–time graph and displacement as the area under a velocity–time graph.

## Key definitions

:::definition{term="Displacement, velocity, acceleration"}
Displacement $s$ is the position relative to a starting point, with a sign for direction. Velocity $v$ is the rate of change of displacement; acceleration $a$ is the rate of change of velocity. All three are vectors; in one dimension the sign gives the direction.
:::

:::definition{term="The suvat symbols"}
$u$ initial velocity, $v$ final velocity, $a$ constant acceleration, $s$ displacement, $t$ time taken.
:::

:::formula{name="Constant-acceleration formulae"}
$$
v = u + at, \qquad s = \tfrac{1}{2}(u + v)t, \qquad s = ut + \tfrac{1}{2}at^2, \qquad s = vt - \tfrac{1}{2}at^2, \qquad v^2 = u^2 + 2as
$$
:::

Cambridge does not print these on MF19 for Paper 4, and ZIMSEC prints no formula list: learn them.

## Deriving the formulae

Constant acceleration means the velocity–time graph is a straight line from $(0, u)$ to $(t, v)$.

1. Its gradient is the acceleration: $a = \dfrac{v - u}{t}$, so $v = u + at$.
2. The displacement is the area under the graph, a trapezium: $s = \tfrac{1}{2}(u + v)t$.
3. Substitute $v = u + at$ into step 2: $s = \tfrac{1}{2}(2u + at)t = ut + \tfrac{1}{2}at^2$.
4. Substitute $u = v - at$ instead: $s = vt - \tfrac{1}{2}at^2$.
5. Substitute $t = \dfrac{v - u}{a}$ into step 2: $s = \dfrac{(u + v)(v - u)}{2a}$, so $v^2 = u^2 + 2as$.

Each formula leaves out one of the five quantities, which is how you choose between them: write down the three you know and the one you want, and pick the formula that does not involve the fifth.

## Using the formulae

:::worked-solution[Example 1: a kombi accelerates uniformly from $8$ m s$^{-1}$ to $26$ m s$^{-1}$ while travelling $300$ m. Find its acceleration and the time taken.]
1. Known: $u = 8$, $v = 26$, $s = 300$. Wanted: $a$ and $t$.
2. For $a$, use the formula without $t$: $v^2 = u^2 + 2as$, so $676 = 64 + 600a$ and $a = 1.02$ m s$^{-2}$.
3. For $t$, use the formula without $a$ (so an error in step 2 cannot spread): $300 = \tfrac{1}{2}(8 + 26)t$, so $t = \dfrac{600}{34} = 17.6$ s.
:::

Signs matter. Choose a positive direction at the start and keep it. A deceleration of $3$ m s$^{-2}$ in the direction of motion is $a = -3$.

## Vertical motion under gravity

Near the Earth's surface, ignoring air resistance, every falling object has the same downward acceleration $g$. Cambridge uses $g = 10$ m s$^{-2}$; ZIMSEC questions state $g$, often $9.8$ m s$^{-2}$. Take upwards as positive for a ball thrown up, so $a = -g$.

- At the highest point, $v = 0$ (for an instant).
- The motion up and down is one single motion with constant acceleration: there is no need to split it at the top unless the question asks about the top.
- A displacement below the starting point is negative.

:::worked-solution[Example 2 (exam style): a ball is thrown vertically upwards at $14$ m s$^{-1}$ from a point $2.5$ m above the ground. Take $g = 10$ m s$^{-2}$. (a) Find the greatest height of the ball above the ground. (b) Find the time until the ball hits the ground.]
1. Take upwards as positive: $u = 14$, $a = -10$.
2. (a) At the top $v = 0$: $0 = 14^2 - 20s$, so $s = 9.8$ m above the point of projection.
3. Greatest height above the ground: $9.8 + 2.5 = 12.3$ m.
4. (b) At the ground, $s = -2.5$ (below the start): $-2.5 = 14t - 5t^2$.
5. Rearrange: $5t^2 - 14t - 2.5 = 0$, so $t = \dfrac{14 \pm \sqrt{196 + 50}}{10}$.
6. The positive root is $t = \dfrac{14 + 15.68}{10} = 2.97$ s. The negative root has no meaning here.
:::

## Two moving objects

When two objects move at the same time, write an equation for each, using the **same** time variable and the **same** origin, then use the condition linking them (same position, same speed, a given gap).

:::worked-solution[Example 3: a car waits at a robot in Mutare. As the light turns green, the car accelerates from rest at $2$ m s$^{-2}$, at the same moment as a truck passes it at a constant $15$ m s$^{-1}$. Find when and where the car overtakes the truck, and the car's speed then.]
1. Let $t$ be the time after the light changes, measured from the robot.
2. Car: $s_C = \tfrac{1}{2}(2)t^2 = t^2$. Truck (constant velocity, $a = 0$): $s_T = 15t$.
3. Overtaking when $s_C = s_T$: $t^2 = 15t$, so $t(t - 15) = 0$.
4. $t = 0$ is the start, so the car overtakes after $t = 15$ s, at $15 \times 15 = 225$ m from the robot.
5. Car's speed: $v = 0 + 2 \times 15 = 30$ m s$^{-1}$, twice the truck's speed.
:::

Notice that motion at constant velocity is a special case with $a = 0$, so $s = ut$.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to derive the formulae (from a velocity–time graph or by integration) and states $g$ in each question. Cambridge Paper 4 uses $g = 10$ m s$^{-2}$ and expects the formulae to be quoted, not derived.
:::

## Common mistakes

:::mistake{title="Mixing sign conventions"}
If upwards is positive, then $g$ gives $a = -10$, and a point below the start has negative $s$. Write your positive direction at the top of the working.
:::

:::mistake{title="Using suvat when the acceleration is not constant"}
The formulae hold only for constant acceleration. For a journey in stages, apply them to each stage separately.
:::

:::mistake{title="Confusing displacement with distance"}
A ball thrown up and caught at the same height has $s = 0$, but it has travelled a distance of twice its greatest height.
:::

:::mistake{title="Rejecting the wrong root"}
A quadratic in $t$ can have two positive roots (passing a height on the way up and on the way down). Read the question to decide which one is wanted, or whether both are.
:::

## Exam tips

:::exam-tip
List $s, u, v, a, t$ with the known values and a question mark for the one you want. This earns method marks and makes the choice of formula obvious.
:::

:::exam-tip
Use given values rather than your own earlier answers where possible, so an early slip does not cost marks later.
:::

:::exam-tip
Give final answers to 3 significant figures unless the value is exact, with units (m, m s$^{-1}$, m s$^{-2}$, s).
:::

## Summary

:::summary
- For constant acceleration: $v = u + at$, $s = \tfrac{1}{2}(u + v)t$, $s = ut + \tfrac{1}{2}at^2$, $s = vt - \tfrac{1}{2}at^2$, $v^2 = u^2 + 2as$.
- The formulae come from the straight-line velocity–time graph: gradient $a$, area $s$.
- Choose a positive direction; deceleration and downward gravity are then negative.
- Vertical motion: $a = \pm g$, $v = 0$ at the highest point, and up-and-down is one motion.
- For two objects, write one equation each with a common time and origin, then link them.
:::
