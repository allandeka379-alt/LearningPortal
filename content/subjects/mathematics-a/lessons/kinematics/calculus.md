---
{
  "key": "kinematics.calculus",
  "title": "Kinematics using calculus: variable acceleration",
  "summary": "Use v = ds/dt and a = dv/dt, and integration with initial conditions, for straight-line motion whose acceleration varies with time: when a particle is at rest, its greatest velocity and the distance travelled when it changes direction.",
  "concepts": ["amaths.kinematics.calculus"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The constant-acceleration formulae fail as soon as the acceleration changes, and in real motion it usually does. A car pulling away from a robot in Gweru accelerates hard at first and less as it gains speed; a goods train's acceleration falls as the engine approaches full power. When the displacement, velocity or acceleration is given as a function of time, calculus replaces *suvat*.

This lesson links two topics you know: differentiation and integration from Pure Mathematics, and the meanings of gradient and area from velocity–time graphs. ZIMSEC examines it in Mechanics Form 5 (topic 6.3); Cambridge examines it in Paper 4 (topic 4.2), where the functions are polynomials in $t$ (the calculus of Paper 1).

## Key definitions

:::definition{term="Velocity and acceleration as derivatives"}
For displacement $s$ at time $t$: velocity $v = \dfrac{\mathrm{d}s}{\mathrm{d}t}$ and acceleration $a = \dfrac{\mathrm{d}v}{\mathrm{d}t} = \dfrac{\mathrm{d}^2 s}{\mathrm{d}t^2}$.
:::

:::formula{name="Going back by integration"}
$$
v = \int a\,\mathrm{d}t, \qquad s = \int v\,\mathrm{d}t, \qquad \text{displacement from } t_1 \text{ to } t_2 = \int_{t_1}^{t_2} v\,\mathrm{d}t
$$
:::

Each indefinite integral brings a constant, found from an **initial condition** such as "the particle starts from rest at $O$" ($v = 0$ and $s = 0$ when $t = 0$). Neither board prints these relations: learn them.

:::keyfact{title="Key moments in the motion"}
- **At rest**: $v = 0$.
- **Greatest or least velocity**: $\dfrac{\mathrm{d}v}{\mathrm{d}t} = 0$, i.e. $a = 0$.
- **Returns to the start**: $s = 0$ (displacement from the start is zero).
- **Changes direction**: $v = 0$ **and** $v$ changes sign.
:::

## Differentiating: from displacement to acceleration

:::worked-solution[Example 1: a particle moves in a straight line so that its displacement from $O$ after $t$ seconds is $s = t^3 - 6t^2 + 9t + 2$ metres. Find when it is at rest, its acceleration at those times, and the distance it travels in the first $4$ seconds.]
1. $v = \dfrac{\mathrm{d}s}{\mathrm{d}t} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$, so it is at rest when $t = 1$ and $t = 3$.
2. $a = \dfrac{\mathrm{d}v}{\mathrm{d}t} = 6t - 12$: $a = -6$ m s$^{-2}$ at $t = 1$ and $a = 6$ m s$^{-2}$ at $t = 3$.
3. $v$ changes sign at both times, so the particle turns round twice. Find its positions: $s(0) = 2$, $s(1) = 6$, $s(3) = 2$, $s(4) = 6$.
4. Distances: $0$ to $1$ s: $4$ m; $1$ to $3$ s: $4$ m (back towards $O$); $3$ to $4$ s: $4$ m.
5. Total distance $= 12$ m, although the displacement after $4$ s is only $6 - 2 = 4$ m.
:::

![Displacement-time graph of s = t³ − 6t² + 9t + 2: the particle starts at s = 2, is at rest (turning) at t = 1 with s = 6 and at t = 3 with s = 2, and reaches s = 6 at t = 4; each of the three stages is 4 m, so the distance is 12 m but the displacement is 4 m.](media:diagrams/displacement-time-cubic-turns.png "Figure: the turning points t = 1 and t = 3 show why distance (12 m) is more than displacement (4 m)")

The lesson of step 3: **never** find a distance by substituting the end time alone when the particle may have turned round. Find where $v = 0$ inside the interval first.

## Reading the signs

The signs of $v$ and $a$ together describe the motion. If $v$ and $a$ have the **same** sign, the particle is speeding up; if they have **opposite** signs, it is slowing down. In Example 1, between $t = 1$ and $t = 2$ the velocity is negative and so is the acceleration, so the particle speeds up as it moves back towards $O$; between $t = 2$ and $t = 3$ the velocity is still negative but the acceleration is positive, so it slows down before turning round at $t = 3$.

A quick sketch of $v$ against $t$ shows all of this at once: the graph is below the axis between the two times of rest, its lowest point is where $a = 0$, and the areas between the curve and the axis are the distances travelled in each stage. Drawing it takes thirty seconds and prevents most errors in distance questions.

## Integrating: from acceleration to displacement

:::worked-solution[Example 2: a particle has acceleration $a = 6 - 2t$ m s$^{-2}$ and velocity $4$ m s$^{-1}$ when $t = 0$. Find its greatest velocity and the time when it comes to rest.]
1. $v = \int (6 - 2t)\,\mathrm{d}t = 6t - t^2 + c$. At $t = 0$, $v = 4$, so $c = 4$ and $v = 4 + 6t - t^2$.
2. Greatest velocity when $a = 0$: $6 - 2t = 0$, so $t = 3$. Then $v = 4 + 18 - 9 = 13$ m s$^{-1}$.
3. It is a maximum because $a$ changes from positive to negative at $t = 3$.
4. At rest: $t^2 - 6t - 4 = 0$, so $t = 3 + \sqrt{13} = 6.61$ s (the other root is negative).
:::

## Definite integrals and distance

The displacement between $t_1$ and $t_2$ is $\int_{t_1}^{t_2} v\,\mathrm{d}t$. If $v$ keeps one sign throughout, this is also the distance. If $v$ changes sign at $t = T$ inside the interval, split the integral there and add the sizes of the two parts.

:::worked-solution[Example 3 (exam style): a particle $P$ starts from rest at $O$ and moves in a straight line with velocity $v = 0.6t^2 - 0.04t^3$ m s$^{-1}$ for $0 \le t \le 15$. (a) Show that $P$ comes to rest again when $t = 15$. (b) Find the greatest speed of $P$. (c) Find the distance $OP$ when $t = 15$.]
1. (a) $v = t^2(0.6 - 0.04t)$, which is zero at $t = 0$ and when $0.04t = 0.6$, i.e. $t = 15$.
2. (b) $a = 1.2t - 0.12t^2 = 0.12t(10 - t)$, which is zero at $t = 10$.
3. $v(10) = 0.6(100) - 0.04(1000) = 60 - 40 = 20$ m s$^{-1}$; $v \ge 0$ throughout, so this is the greatest speed.
4. (c) $v \ge 0$ on $0 \le t \le 15$, so the distance equals the displacement: $\displaystyle\int_0^{15} (0.6t^2 - 0.04t^3)\,\mathrm{d}t = \left[0.2t^3 - 0.01t^4\right]_0^{15}$.
5. $= 0.2(3375) - 0.01(50625) = 675 - 506.25 = 168.75$ m.
:::

![Velocity-time graph of v = 0.6t² − 0.04t³ for 0 to 15 s: the particle starts and ends at rest, its greatest speed is 20 m/s at t = 10 (where a = 0), and the shaded area under the curve, the integral from 0 to 15, is the distance 168.75 m.](media:diagrams/velocity-time-cubic-area.png "Figure: the area under the velocity–time curve is the distance travelled, 168.75 m")

## When the acceleration is constant

If $a$ is a constant, integrating gives $v = u + at$ and then $s = ut + \tfrac{1}{2}at^2$: the *suvat* formulae are a special case. This is also a neat derivation of them, which ZIMSEC accepts.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4 uses only the calculus of Paper 1, so $s$, $v$ and $a$ are polynomials or simple powers of $t$ (such as $\sqrt{t}$ or $t^{-2}$). ZIMSEC questions may also use other functions you can differentiate and integrate, such as $\mathrm{e}^{-t}$ or $\sin t$.
:::

## Common mistakes

:::mistake{title="Using suvat for variable acceleration"}
If $a$ depends on $t$, the constant-acceleration formulae are wrong. Integrate or differentiate instead.
:::

:::mistake{title="Forgetting the constant of integration"}
"Starts from rest at $O$" gives $v = 0$ and $s = 0$ at $t = 0$; use both. A particle that starts with $v = 4$ needs $c = 4$.
:::

:::mistake{title="Distance across a change of direction"}
Find where $v = 0$ inside the interval and split the integral there; a single definite integral gives the displacement.
:::

:::mistake{title="Maximum velocity from v = 0"}
Greatest velocity needs $\frac{\mathrm{d}v}{\mathrm{d}t} = a = 0$, not $v = 0$.
:::

## Exam tips

:::exam-tip
Write the relation you are using ("$v = \frac{\mathrm{d}s}{\mathrm{d}t}$", "$s = \int v\,\mathrm{d}t$") before calculating: it earns the method mark.
:::

:::exam-tip
In "show that" parts, substitute the given value and show the result is zero (or the given number) with the arithmetic written out.
:::

:::exam-tip
For distances, sketch $v$ against $t$ quickly to see whether it changes sign in the interval.
:::

## Summary

:::summary
- $v = \frac{\mathrm{d}s}{\mathrm{d}t}$ and $a = \frac{\mathrm{d}v}{\mathrm{d}t}$; integrate to go back, using initial conditions for the constants.
- At rest: $v = 0$. Greatest velocity: $a = 0$.
- Displacement from $t_1$ to $t_2$ is $\int_{t_1}^{t_2} v\,\mathrm{d}t$.
- For distance, split the integral wherever $v$ changes sign and add the sizes.
- Constant acceleration is the special case that gives the suvat formulae.
:::
