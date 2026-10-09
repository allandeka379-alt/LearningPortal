---
{
  "key": "mechanics.constant-acceleration",
  "title": "Equations of motion for constant acceleration",
  "summary": "Use the five constant-acceleration equations with a clear sign convention, including vertical motion under gravity and two-particle meeting and overtaking problems.",
  "concepts": ["amath.mechanics.constant-acceleration"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a car brakes steadily, a kombi pulls away from a rank or a stone falls down a borehole, the acceleration is (very nearly) constant. Then you do not need a graph for every question: five short equations connect the starting velocity, the final velocity, the acceleration, the displacement and the time.

These equations are the main tool of ZIMSEC Paper 2 kinematics. They appear in short Section A questions and inside longer Mechanics questions with Newton's laws and energy. You need the velocity–time graph ideas from the previous lesson: the equations are just its gradient and area written in algebra.

## Key definitions

:::definition{term="The five quantities"}
$u$ = initial velocity, $v$ = final velocity, $a$ = constant acceleration, $s$ = displacement, $t$ = time taken. Velocities and displacements are signed along the line of motion.
:::

:::definition{term="Uniform acceleration"}
Acceleration that stays the same throughout the motion. The equations below are valid **only** in that case.
:::

:::definition{term="Free fall"}
Motion under gravity alone, with air resistance ignored. The acceleration is $g$ downwards; the question states the value of $g$ (usually $9.8$ or $10$ m s$^{-2}$).
:::

:::formula{name="Equations of motion (constant acceleration)"}
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
s = \tfrac{1}{2}(u + v)t
$$

$$
s = vt - \tfrac{1}{2}at^2
$$
:::

Each equation leaves out one of the five quantities. List the three you know and the one you want, then choose the equation that does not contain the fifth.

| Equation | Quantity it leaves out |
| --- | --- |
| $v = u + at$ | $s$ |
| $s = ut + \frac{1}{2}at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |
| $s = \frac{1}{2}(u + v)t$ | $a$ |
| $s = vt - \frac{1}{2}at^2$ | $u$ |

## Where the equations come from

On a velocity–time graph with constant acceleration, the line goes from $(0, u)$ to $(t, v)$. Its gradient is $a = \frac{v - u}{t}$, which rearranges to $v = u + at$. The area under it is a trapezium, $s = \frac{1}{2}(u + v)t$. Substituting $v = u + at$ into the area gives $s = ut + \frac{1}{2}at^2$, and eliminating $t$ gives $v^2 = u^2 + 2as$.

## Using the equations

:::worked-solution[Example 1: a car moving at 8 m s$^{-1}$ accelerates at 1.5 m s$^{-2}$ for 6 s. Find its final speed and the distance it covers.]
1. Known: $u = 8$, $a = 1.5$, $t = 6$. Want $v$ and $s$.
2. $v = u + at = 8 + 1.5 \times 6 = 17$ m s$^{-1}$.
3. $s = ut + \frac{1}{2}at^2 = 8 \times 6 + \frac{1}{2} \times 1.5 \times 36 = 48 + 27 = 75$ m.
:::

:::worked-solution[Example 2: a lorry travelling at 30 m s$^{-1}$ brakes uniformly and stops in 75 m. Find its deceleration and the time taken to stop.]
1. Known: $u = 30$, $v = 0$, $s = 75$.
2. $v^2 = u^2 + 2as$: $0 = 900 + 150a$, so $a = -6$ m s$^{-2}$: a deceleration of 6 m s$^{-2}$.
3. $s = \frac{1}{2}(u + v)t$: $75 = 15t$, so $t = 5$ s.
:::

## Vertical motion under gravity

Choose a positive direction and keep it. If **upwards** is positive, then $a = -g$ for the whole flight, both going up and coming down. At the highest point $v = 0$ (but $a$ is still $-g$). A displacement below the starting point is negative.

:::worked-solution[Example 3: a ball is thrown vertically upwards at 14.7 m s$^{-1}$. Take $g = 9.8$ m s$^{-2}$. Find the greatest height reached and the time until it returns to the thrower's hand.]
1. Upwards positive: $u = 14.7$, $a = -9.8$.
2. Highest point, $v = 0$: $0 = 14.7^2 - 2(9.8)s$, so $s = \dfrac{216.09}{19.6} \approx 11.0$ m.
3. Back at the start, $s = 0$: $0 = 14.7t - 4.9t^2 = t(14.7 - 4.9t)$.
4. $t = 0$ (the throw) or $t = 3$ s. It returns after 3 s; going up takes 1.5 s and coming down the same.
:::

## Two particles: meeting and overtaking

Write the displacement of each particle from the **same** fixed point in terms of the **same** time $t$. They meet when the displacements are equal. If one starts later, its time of motion is $t - k$.

:::worked-solution[Example 4: car $A$ starts from rest at a petrol station and accelerates at 2 m s$^{-2}$. At the same moment car $B$ passes the station at a constant 16 m s$^{-1}$. Find when and where $A$ overtakes $B$, and $A$'s speed then.]
1. $s_A = \frac{1}{2}(2)t^2 = t^2$ and $s_B = 16t$.
2. They meet when $t^2 = 16t$: $t(t - 16) = 0$, so $t = 16$ s (not $t = 0$, the start).
3. Distance from the station $= 16 \times 16 = 256$ m.
4. $A$'s speed $= 0 + 2 \times 16 = 32$ m s$^{-1}$, twice $B$'s speed.
:::

## Two unknowns from two pieces of information

:::worked-solution[Example 5: a particle moving with constant acceleration travels 20 m in the first 2 s and 75 m in the next 3 s. Find its initial velocity and its acceleration.]
1. First 2 s: $20 = 2u + \frac{1}{2}a(2^2)$, so $2u + 2a = 20$, i.e. $u + a = 10$.
2. First 5 s: total $95 = 5u + \frac{1}{2}a(5^2) = 5u + 12.5a$.
3. Substitute $u = 10 - a$: $50 - 5a + 12.5a = 95$, so $7.5a = 45$ and $a = 6$ m s$^{-2}$.
4. Then $u = 4$ m s$^{-1}$. Check: in 5 s, $s = 20 + 75 = 95$ m.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC Paper 2 uses these equations for constant acceleration. Cambridge 0606 does not list them; it uses calculus for straight-line motion, of which these are the special case $a$ constant.
:::

## Common mistakes

:::mistake{title="Changing the sign of g halfway"}
With upwards positive, $a = -g$ on the way up **and** on the way down. Do not switch to $+g$ for the fall unless you restart with downwards positive.
:::

:::mistake{title="Using the equations when a is not constant"}
If the acceleration changes between stages, treat each stage separately; the final velocity of one stage is the initial velocity of the next.
:::

:::mistake{title="Taking the wrong root"}
$s = ut + \frac{1}{2}at^2$ is a quadratic in $t$. Reject negative times and check which positive root fits the question (the first or second time at a height).
:::

:::mistake{title="Mixing km/h with m/s"}
Divide km/h by 3.6 to get m s$^{-1}$: 72 km/h is 20 m s$^{-1}$.
:::

## Exam tips

:::exam-tip
Start every answer with a list, for example $u = 14.7$, $v = 0$, $a = -9.8$, $s = ?$. It shows the examiner your sign convention and earns method marks.
:::

:::exam-tip
Use the value of $g$ given in the question, and give answers to 3 significant figures unless told otherwise.
:::

:::exam-tip
In overtaking questions, say clearly which time is which ("$t$ seconds after $A$ starts") before writing the equation.
:::

## Summary

:::summary
- Five equations link $u$, $v$, $a$, $s$ and $t$; each leaves out one quantity.
- They hold only for constant acceleration; split a journey into stages otherwise.
- Choose a positive direction; for vertical motion with upwards positive, $a = -g$ throughout.
- At the highest point $v = 0$; on returning to the start $s = 0$.
- For two particles, equate displacements from the same point at the same time.
:::
