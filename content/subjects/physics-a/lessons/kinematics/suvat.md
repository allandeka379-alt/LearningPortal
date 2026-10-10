---
{
  "key": "kinematics.suvat",
  "title": "Equations of uniformly accelerated motion and free fall",
  "summary": "Derive the four equations of uniformly accelerated motion from a velocity-time graph, solve one-dimensional problems with a consistent sign convention, apply them to free fall and vertical throws, and determine g by experiment.",
  "concepts": ["aphys.kinematics.suvat"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A haulage truck on the Beitbridge road brakes hard when a goat steps onto the tarmac. Will it stop in time? The answer depends on four numbers: how fast it was going, how hard it can decelerate, how far away the goat is and how long the driver takes to react. Whenever the acceleration is constant, five quantities describe the motion completely, and four equations connect them. These "suvat" equations are among the most used tools in A-Level physics.

In this lesson you derive the equations from a velocity-time graph, learn to choose the right one, handle signs when motion changes direction, and apply them to objects falling freely near the Earth's surface. You should be confident with motion graphs (gradient $=$ acceleration, area $=$ displacement) and with rearranging equations.

## Key definitions

:::definition{term="Uniform acceleration"}
Acceleration that is constant in both magnitude and direction, so that the velocity changes by equal amounts in equal times.
:::

:::definition{term="Free fall"}
Motion under the influence of gravity alone, with no air resistance. Near the Earth's surface every object in free fall has the same acceleration, $g = 9.81\ \text{m s}^{-2}$, directed vertically downwards.
:::

:::formula{name="The equations of uniformly accelerated motion"}
$$
v = u + at
$$
$$
s = \tfrac{1}{2}(u + v)t
$$
$$
s = ut + \tfrac{1}{2}at^2
$$
$$
v^2 = u^2 + 2as
$$

$s$ = displacement (m), $u$ = initial velocity ($\text{m s}^{-1}$), $v$ = final velocity ($\text{m s}^{-1}$), $a$ = acceleration ($\text{m s}^{-2}$), $t$ = time (s). They are valid **only** for constant acceleration in a straight line.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the derivation of these equations from a velocity-time graph and their use for free fall. Cambridge's data sheet gives $s = ut + \tfrac{1}{2}at^2$ and $v^2 = u^2 + 2as$; learn all four.
:::

## Deriving the equations

Consider an object whose velocity rises uniformly from $u$ to $v$ in time $t$. Its velocity-time graph is a straight line.

1. **Gradient.** Acceleration is the gradient: $a = \dfrac{v - u}{t}$, which rearranges to $v = u + at$.
2. **Area.** Displacement is the area under the line, a trapezium: $s = \tfrac{1}{2}(u + v)t$.
3. **Eliminate $v$.** Substitute $v = u + at$ into step 2: $s = \tfrac{1}{2}(u + u + at)t = ut + \tfrac{1}{2}at^2$. (Geometrically: a rectangle $ut$ plus a triangle $\tfrac{1}{2}t \times at$.)
4. **Eliminate $t$.** From step 1, $t = \dfrac{v - u}{a}$. Substitute into step 2: $s = \tfrac{1}{2}(u + v)\dfrac{(v - u)}{a} = \dfrac{v^2 - u^2}{2a}$, so $v^2 = u^2 + 2as$.

Each equation leaves out one of the five quantities, which is how you choose between them.

| Equation | Missing quantity |
| --- | --- |
| $v = u + at$ | $s$ |
| $s = \tfrac{1}{2}(u + v)t$ | $a$ |
| $s = ut + \tfrac{1}{2}at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |

## Solving problems

1. Choose a positive direction and stick to it.
2. List the five quantities, with signs; mark the one you want and the one you neither know nor want.
3. Pick the equation that leaves out the unwanted quantity.

:::worked-solution[A truck braking]
A truck travelling at $22\ \text{m s}^{-1}$ brakes uniformly and stops in $48\ \text{m}$. Find its deceleration and the braking time.

1. Forwards positive: $u = 22\ \text{m s}^{-1}$, $v = 0$, $s = 48\ \text{m}$; $t$ is not needed at first.
2. $v^2 = u^2 + 2as$: $0 = 22^2 + 2a(48)$, so $a = -\dfrac{484}{96} = -5.04\ \text{m s}^{-2}$. The deceleration is $5.04\ \text{m s}^{-2}$.
3. Time: $s = \tfrac{1}{2}(u + v)t$ gives $48 = \tfrac{1}{2}(22 + 0)t$, so $t = 4.36\ \text{s}$.
:::

## Free fall and vertical motion

For vertical motion the acceleration is $g = 9.81\ \text{m s}^{-2}$ **downwards** throughout, whether the object is rising, at the top or falling. With upwards taken as positive, $a = -9.81\ \text{m s}^{-2}$.

:::worked-solution[A stone dropped from a bridge]
A stone is dropped from rest and takes $3.2\ \text{s}$ to reach the water below. Take downwards as positive.

1. $u = 0$, $a = +9.81\ \text{m s}^{-2}$, $t = 3.2\ \text{s}$.
2. Height: $s = ut + \tfrac{1}{2}at^2 = 0 + \tfrac{1}{2}(9.81)(3.2)^2 = 50.2\ \text{m}$, about $50\ \text{m}$.
3. Impact speed: $v = u + at = 9.81 \times 3.2 = 31.4\ \text{m s}^{-1}$.
:::

:::worked-solution[A ball thrown up from a cliff]
A ball is thrown vertically upwards at $15\ \text{m s}^{-1}$ from the edge of a cliff $20\ \text{m}$ above the beach. When does it land? Take upwards as positive.

1. $u = +15\ \text{m s}^{-1}$, $a = -9.81\ \text{m s}^{-2}$, and on landing $s = -20\ \text{m}$ (below the start).
2. $s = ut + \tfrac{1}{2}at^2$: $-20 = 15t - 4.905t^2$, so $4.905t^2 - 15t - 20 = 0$.
3. $t = \dfrac{15 + \sqrt{15^2 + 4(4.905)(20)}}{2(4.905)} = \dfrac{15 + 24.8}{9.81} = 4.06\ \text{s}$ (the negative root has no meaning here).
4. Landing velocity: $v = 15 - 9.81 \times 4.06 = -24.8\ \text{m s}^{-1}$, that is, $24.8\ \text{m s}^{-1}$ downwards.
:::

Notice that the sign convention handles the whole flight at once: there is no need to split it into "up" and "down" stages.

## Determining g by experiment

Drop a steel ball from rest from an electromagnet. Switching off the current releases the ball and starts an electronic timer; the ball opens a trapdoor switch (or breaks a light gate) a height $h$ below, which stops the timer. Repeat for six or more heights.

Since $u = 0$, $h = \tfrac{1}{2}gt^2$. A graph of $h$ against $t^2$ is a straight line through the origin with gradient $\tfrac{1}{2}g$, so

$$
g = 2 \times \text{gradient}
$$

A graph is better than a single calculation: random errors are averaged by the best-fit line, and a systematic error such as a delay in releasing the ball (residual magnetism) shows up as a line that misses the origin. Using two light gates below the release point, and timing between them, removes the release delay altogether.

## Common mistakes

:::mistake{title="Using suvat when the acceleration changes"}
The equations only apply to constant acceleration. A falling parachutist, a car pulling away with changing engine force, or anything with significant air resistance needs another method (graphs or step-by-step calculation).
:::

:::mistake{title="Mixing signs"}
If upwards is positive, $g$ enters as $-9.81\ \text{m s}^{-2}$ even while the object is rising, and a point below the start has negative displacement.
:::

:::mistake{title="Setting a = 0 at the top of a throw"}
At the highest point $v = 0$, not $a$. The acceleration is $-9.81\ \text{m s}^{-2}$ throughout.
:::

:::mistake{title="Reaction distance forgotten"}
In stopping problems the vehicle travels at constant speed during the driver's reaction time before braking starts. Calculate that distance separately ($s = ut$).
:::

## Exam tips

:::exam-tip{title="Derive"}
"Derive $v^2 = u^2 + 2as$" earns marks for starting from definitions or the graph ($a = (v - u)/t$ and $s = \tfrac{1}{2}(u + v)t$), showing the substitution that removes $t$, and the final rearrangement. Words linking the steps help.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 and Paper 2 test the equations, often combined with forces; Paper 3 and Paper 5 use the free-fall experiment. ZIMSEC Papers 1 and 2 and the practical paper test the same.
:::

:::exam-tip{title="Show the quantities"}
Write the list of $s, u, v, a, t$ with signs before choosing an equation; it shows the examiner your method and earns marks even when an arithmetic slip follows.
:::

## Summary

:::summary
- For constant acceleration: $v = u + at$, $s = \tfrac{1}{2}(u + v)t$, $s = ut + \tfrac{1}{2}at^2$, $v^2 = u^2 + 2as$.
- They come from the gradient and the area of a straight-line velocity-time graph.
- Choose a positive direction; each equation omits one quantity.
- Free fall: $a = g = 9.81\ \text{m s}^{-2}$ downwards throughout, including at the top of a throw.
- Determine $g$ from the gradient of $h$ against $t^2$: $g = 2 \times \text{gradient}$.
:::
