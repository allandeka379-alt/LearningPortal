---
{
  "key": "calculus.kinematics",
  "title": "Kinematics with calculus",
  "summary": "Use v = ds/dt and a = dv/dt to move between displacement, velocity and acceleration for motion in a straight line, integrate back with initial conditions, find when a particle is at rest or changes direction, tell distance from displacement, and read motion graphs.",
  "concepts": ["amath.calculus.kinematics"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A kombi on the Harare–Mutare road rarely moves with constant acceleration: it speeds up, slows for a roadblock, pulls away again. When the velocity is given by a formula in terms of time, calculus describes the motion exactly. Differentiating tells you how fast something is changing; integrating adds up the changes.

Kinematics is the last topic of Cambridge 0606 calculus and usually carries a full structured question, often on the calculator paper with exponential or trigonometric velocities. (ZIMSEC teaches straight-line motion with the constant-acceleration equations in its Mechanics section instead.) You need the derivatives and integrals of powers, $e^{kt}$, $\sin kt$ and $\cos kt$, with time in seconds and angles in radians.

## Key definitions

A particle $P$ moves along a straight line through a fixed point $O$. One direction is chosen as positive.

:::definition{term="Displacement, s"}
The position of $P$ relative to $O$, positive on one side and negative on the other (metres).
:::

:::definition{term="Velocity, v"}
The rate of change of displacement, $v = \dfrac{ds}{dt}$ (m s$^{-1}$). Its sign gives the direction of motion.
:::

:::definition{term="Acceleration, a"}
The rate of change of velocity, $a = \dfrac{dv}{dt} = \dfrac{d^2s}{dt^2}$ (m s$^{-2}$).
:::

:::definition{term="Speed and distance"}
Speed is the size of the velocity, $|v|$, never negative. Distance travelled is the total length of path covered, never negative; displacement is only where the particle ends up relative to $O$.
:::

:::formula{name="Moving between s, v and a (not in Cambridge's List of formulas)"}
$$
s \xrightarrow{\ \frac{d}{dt}\ } v \xrightarrow{\ \frac{d}{dt}\ } a, \qquad a \xrightarrow{\ \int dt\ } v \xrightarrow{\ \int dt\ } s
$$
:::

## Differentiating: from displacement to velocity and acceleration

"At rest" means $v = 0$. "Initially" means $t = 0$. The particle **changes direction** where $v = 0$ and $v$ changes sign.

:::worked-solution[Example 1: a particle moves so that $s = t^3 - 6t^2 + 9t$ metres after $t$ seconds. Find when it is at rest and its acceleration at those times.]
1. $v = \dfrac{ds}{dt} = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$.
2. At rest: $v = 0$ gives $t = 1$ s and $t = 3$ s.
3. $a = \dfrac{dv}{dt} = 6t - 12$.
4. At $t = 1$: $a = -6$ m s$^{-2}$. At $t = 3$: $a = 6$ m s$^{-2}$.
5. Signs of $v$: positive for $0 \leq t < 1$, negative for $1 < t < 3$, positive for $t > 3$. The particle changes direction at both times.
:::

## Distance travelled versus displacement

A single integral (or a single subtraction of displacements) gives the **displacement**: motion forwards and backwards cancels. For the **distance**, find every time the particle turns round, work out the displacement at each, and add the lengths of the separate stages.

:::worked-solution[Example 2: for the particle in Example 1, find the distance travelled in the first 4 seconds and its displacement at $t = 4$.]
1. Displacements at the key times: $s(0) = 0$, $s(1) = 1 - 6 + 9 = 4$, $s(3) = 27 - 54 + 27 = 0$, $s(4) = 64 - 96 + 36 = 4$.
2. Stage 1 ($0$ to $1$ s): from 0 to 4, distance 4 m.
3. Stage 2 ($1$ to $3$ s): from 4 back to 0, distance 4 m.
4. Stage 3 ($3$ to $4$ s): from 0 to 4, distance 4 m.
5. Distance travelled $= 4 + 4 + 4 = 12$ m, but the displacement at $t = 4$ is only $4$ m.
:::

## Integrating: from acceleration to velocity and displacement

Integrating gives a constant each time. Use the **initial conditions** (for example "starts from rest at $O$": $v = 0$ and $s = 0$ when $t = 0$) to find each constant.

:::worked-solution[Example 3: a particle starts at $O$ with velocity $2$ m s$^{-1}$ and has acceleration $a = 6t - 4$ m s$^{-2}$. Find $v$ and $s$, and show it never comes to rest.]
1. $v = \displaystyle\int (6t - 4)\,dt = 3t^2 - 4t + c$. At $t = 0$, $v = 2$, so $c = 2$: $v = 3t^2 - 4t + 2$.
2. Discriminant of $3t^2 - 4t + 2$: $16 - 24 = -8 < 0$, so $v$ is never zero (and is always positive). The particle never comes to rest.
3. $s = \displaystyle\int (3t^2 - 4t + 2)\,dt = t^3 - 2t^2 + 2t + k$. At $t = 0$, $s = 0$, so $k = 0$.
4. For example, at $t = 3$: $s = 27 - 18 + 6 = 15$ m.
:::

On the calculator paper the velocity is often exponential or trigonometric.

:::worked-solution[Example 4: a cyclist starts from $O$ with $v = 10 - 10e^{-0.2t}$ m s$^{-1}$. Find the acceleration at $t = 5$, the distance travelled in the first 5 seconds, and the velocity she approaches.]
1. $a = \dfrac{dv}{dt} = 10 \times 0.2e^{-0.2t} = 2e^{-0.2t}$. At $t = 5$: $a = 2e^{-1} \approx 0.736$ m s$^{-2}$.
2. $s = \displaystyle\int (10 - 10e^{-0.2t})\,dt = 10t + 50e^{-0.2t} + c$. At $t = 0$, $s = 0$: $0 = 50 + c$, so $c = -50$.
3. At $t = 5$: $s = 50 + 50e^{-1} - 50 = \dfrac{50}{e} \approx 18.4$ m. Since $v > 0$ for $t > 0$, this is also the distance.
4. As $t \to \infty$, $e^{-0.2t} \to 0$, so $v \to 10$ m s$^{-1}$: she approaches a steady 10 m s$^{-1}$ but never quite reaches it.
:::

With trigonometric velocities, use radians. If $v = 6\cos 2t$ and $s = 0$ when $t = 0$, then $s = 3\sin 2t$ and $a = -12\sin 2t$. The particle is first at rest when $\cos 2t = 0$, at $t = \frac{\pi}{4}$, when $s = 3\sin\frac{\pi}{2} = 3$ m: it oscillates between $-3$ m and $3$ m.

## Motion graphs

| Graph | Gradient means | Area under it means |
| --- | --- | --- |
| displacement–time | velocity | (not used) |
| velocity–time | acceleration | displacement (area below the axis counts as negative) |
| speed–time | (size of acceleration) | distance travelled |
| acceleration–time | (not used) | change in velocity |

A **distance–time** graph never decreases; a displacement–time graph falls whenever $v < 0$. The **speed–time** graph is the velocity–time graph with every part below the $t$-axis reflected above it. When you sketch, mark the times of rest (where the velocity graph crosses the axis) and the values at the ends.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0606 expects calculus kinematics with variable acceleration. ZIMSEC teaches straight-line motion with the constant-acceleration equations ($v = u + at$ and the others) in Paper 2 Mechanics; those equations are a special case of these results when $a$ is constant.
:::

## Common mistakes

:::mistake{title="Using suvat with variable acceleration"}
$v = u + at$ and $s = ut + \frac{1}{2}at^2$ hold only when $a$ is constant. If $a$ depends on $t$, differentiate or integrate.
:::

:::mistake{title="Forgetting the constant of integration"}
After integrating $a$ or $v$, use the initial conditions to find the constant. "Starts from $O$" means $s = 0$ at $t = 0$, which does **not** always make the constant zero (see Example 4).
:::

:::mistake{title="Giving displacement when distance is asked"}
If the particle turns round, the distance is the sum of the stage lengths. Always check for $v = 0$ inside the time interval.
:::

:::mistake{title="Degrees in trigonometric motion"}
$v = 6\cos 2t$ means $2t$ radians. A calculator in degree mode gives completely wrong values.
:::

## Exam tips

:::exam-tip
Write down what each phrase means before calculating: "at rest" is $v = 0$, "initially" is $t = 0$, "returns to $O$" is $s = 0$, "maximum velocity" is $a = 0$.
:::

:::exam-tip
For a distance question, list the displacements at the start, at every time of rest and at the end, then add the differences. Show this list: it earns the method marks.
:::

:::exam-tip
Give units (m, m s$^{-1}$, m s$^{-2}$) and, on Paper 2, 3 significant figures unless told otherwise.
:::

## Summary

:::summary
- $v = \dfrac{ds}{dt}$ and $a = \dfrac{dv}{dt}$; integrate the other way and use initial conditions for the constants.
- At rest: $v = 0$. A change of direction needs $v = 0$ with a change of sign.
- Distance travelled adds the lengths of the stages between times of rest; displacement is just $s$.
- The gradient of a displacement–time graph is velocity; the gradient of a velocity–time graph is acceleration and its area is displacement.
- Use radians for trigonometric motion, and the constant-acceleration equations only when $a$ is constant.
:::
