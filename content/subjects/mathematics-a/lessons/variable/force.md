---
{
  "key": "variable.force",
  "title": "Motion under a variable force",
  "summary": "Use calculus for straight-line motion when the acceleration depends on time, displacement or velocity: a = dv/dt = v dv/dx, Newton's second law with variable forces and resistances proportional to v or v², separable differential equations, and position, velocity and acceleration vectors in a plane.",
  "concepts": ["amaths.variable.force"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The suvat equations only work when the acceleration is constant. Real forces are rarely so kind: the thrust of a borehole pump's piston changes during each stroke, the drag on a speedboat on Lake Kariba grows with its speed, and the pull of a stretched rope grows as it stretches. When the force varies, Newton's second law becomes a **differential equation**, and calculus replaces suvat.

ZIMSEC Mechanics examines this in Form 6 (topic 6.11): acceleration as a function of time, displacement or velocity, setting up and solving differential equations, and motion in the $x$–$y$ plane with vectors. Cambridge 9709 Paper 4 uses calculus only when displacement or velocity is given as a function of time, so this lesson is for ZIMSEC candidates. You need integration, separation of variables and logarithms.

## Key definitions

:::definition{term="Variable force"}
A force whose magnitude or direction changes during the motion, for example as a function of time $t$, displacement $x$ or velocity $v$. The acceleration it produces then changes too, so the constant-acceleration equations do not apply.
:::

:::formula{name="Three forms of acceleration"}
$$
a = \frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}^2x}{\mathrm{d}t^2} = v\frac{\mathrm{d}v}{\mathrm{d}x}
$$
:::

The last form comes from the chain rule: $\frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}v}{\mathrm{d}x} \times \frac{\mathrm{d}x}{\mathrm{d}t} = v\frac{\mathrm{d}v}{\mathrm{d}x}$.

:::keyfact{title="Choosing the form"}
- Force or acceleration given in terms of $t$: use $a = \frac{\mathrm{d}v}{\mathrm{d}t}$ and integrate with respect to $t$.
- Given in terms of $x$: use $a = v\frac{\mathrm{d}v}{\mathrm{d}x}$ (velocity as a function of displacement).
- Given in terms of $v$: use $\frac{\mathrm{d}v}{\mathrm{d}t}$ if time is asked, $v\frac{\mathrm{d}v}{\mathrm{d}x}$ if distance is asked; separate the variables.
:::

Newton's second law still holds at every instant: $F = ma$, where $F$ is the resultant force at that instant. Every integration brings a constant, fixed by the **initial conditions** (where the particle is and how fast it moves at the start).

## Acceleration as a function of time

:::worked-solution[Example 1: A particle starts from rest at $O$ and moves in a straight line with acceleration $a = (6 - 2t)$ m s$^{-2}$. Find its greatest velocity in the positive direction and its displacement from $O$ when it next comes to rest.]
1. $v = \displaystyle\int (6 - 2t)\,\mathrm{d}t = 6t - t^2 + c$; at $t = 0$, $v = 0$, so $c = 0$.
2. Greatest velocity when $a = 0$: $t = 3$, so $v = 18 - 9 = 9$ m s$^{-1}$.
3. $x = \displaystyle\int (6t - t^2)\,\mathrm{d}t = 3t^2 - \tfrac{1}{3}t^3$ (constant zero, since $x = 0$ at $t = 0$).
4. Next at rest: $6t - t^2 = 0$, so $t = 6$ s.
5. $x = 3(36) - \tfrac{1}{3}(216) = 108 - 72 = 36$ m.
:::

## Acceleration as a function of displacement

Write $v\frac{\mathrm{d}v}{\mathrm{d}x} = f(x)$, separate and integrate: $\int v\,\mathrm{d}v = \int f(x)\,\mathrm{d}x$ gives $\tfrac{1}{2}v^2$ in terms of $x$. This is a work–energy statement in disguise: multiplying by $m$, the gain in kinetic energy equals the work done by the force.

:::worked-solution[Example 2: A particle moves along the positive $x$-axis with acceleration $\dfrac{3}{x^2}$ m s$^{-2}$ directed away from $O$. At $x = 1$ m its speed is 2 m s$^{-1}$. Find its speed at $x = 3$ m, and the speed it approaches as $x$ becomes large.]
1. $v\dfrac{\mathrm{d}v}{\mathrm{d}x} = 3x^{-2}$, so $\displaystyle\int v\,\mathrm{d}v = \int 3x^{-2}\,\mathrm{d}x$.
2. $\tfrac{1}{2}v^2 = -\dfrac{3}{x} + c$. At $x = 1$, $v = 2$: $2 = -3 + c$, so $c = 5$.
3. $v^2 = 10 - \dfrac{6}{x}$.
4. At $x = 3$: $v^2 = 8$, so $v = 2\sqrt{2} = 2.83$ m s$^{-1}$.
5. As $x \to \infty$, $\dfrac{6}{x} \to 0$, so $v \to \sqrt{10} = 3.16$ m s$^{-1}$.
:::

## Resistance depending on velocity

Resistances such as air or water drag are often modelled as $kv$ (slow motion) or $kv^2$ (faster motion). The equation of motion is separable.

:::worked-solution[Example 3: A speedboat of mass 400 kg is moving at 6 m s$^{-1}$ when its engine is switched off. The water resistance is $10v^2$ N. Find (a) the distance travelled while its speed falls to 2 m s$^{-1}$, (b) the time taken.]
1. (a) Distance asked, so use $v\frac{\mathrm{d}v}{\mathrm{d}x}$: $400v\dfrac{\mathrm{d}v}{\mathrm{d}x} = -10v^2$, i.e. $\dfrac{\mathrm{d}v}{\mathrm{d}x} = -\dfrac{v}{40}$.
2. Separate: $\displaystyle\int_6^2 \frac{\mathrm{d}v}{v} = -\int_0^X \frac{\mathrm{d}x}{40}$, so $\ln\frac{2}{6} = -\frac{X}{40}$.
3. $X = 40\ln 3 = 43.9$ m.
4. (b) Time asked, so use $\frac{\mathrm{d}v}{\mathrm{d}t}$: $400\dfrac{\mathrm{d}v}{\mathrm{d}t} = -10v^2$, i.e. $\displaystyle\int_6^2 \frac{\mathrm{d}v}{v^2} = -\int_0^T \frac{\mathrm{d}t}{40}$.
5. $\left[-\dfrac{1}{v}\right]_6^2 = -\dfrac{1}{2} + \dfrac{1}{6} = -\dfrac{1}{3}$, so $\dfrac{T}{40} = \dfrac{1}{3}$.
6. $T = 13.3$ s.
:::

When a constant driving force acts against a resistance $kv$, the velocity approaches a **terminal velocity**, the speed at which the forces balance.

:::worked-solution[Example 4: A car of mass 800 kg starts from rest. Its engine gives a constant driving force of 2400 N and the resistance to motion is $60v$ N. Find its terminal velocity, and the time it takes to reach 30 m s$^{-1}$.]
1. $800\dfrac{\mathrm{d}v}{\mathrm{d}t} = 2400 - 60v = 60(40 - v)$, so $\dfrac{\mathrm{d}v}{\mathrm{d}t} = \dfrac{3}{40}(40 - v)$.
2. Terminal velocity: $\frac{\mathrm{d}v}{\mathrm{d}t} = 0$ when $v = 40$ m s$^{-1}$.
3. Separate: $\displaystyle\int_0^{30} \frac{\mathrm{d}v}{40 - v} = \int_0^T \frac{3}{40}\,\mathrm{d}t$.
4. $\left[-\ln(40 - v)\right]_0^{30} = \ln 40 - \ln 10 = \ln 4$, so $\dfrac{3T}{40} = \ln 4$.
5. $T = \dfrac{40}{3}\ln 4 = 18.5$ s.
:::

The general solution here is $v = 40\left(1 - \mathrm{e}^{-3t/40}\right)$: the car approaches 40 m s$^{-1}$ but never quite reaches it.

## Motion in the x–y plane

When the position vector is given as a function of time, differentiate each component: $\mathbf{v} = \dot{\mathbf{r}}$ and $\mathbf{a} = \ddot{\mathbf{r}}$. Going the other way, integrate each component and use the initial position and velocity to fix the constant **vectors**. For example, if $\mathbf{r} = t^2\mathbf{i} + (4t - t^2)\mathbf{j}$, then $\mathbf{v} = 2t\mathbf{i} + (4 - 2t)\mathbf{j}$ and $\mathbf{a} = 2\mathbf{i} - 2\mathbf{j}$, a constant acceleration of magnitude $2\sqrt{2}$ m s$^{-2}$. The particle moves parallel to the $x$-axis when the $\mathbf{j}$-component of $\mathbf{v}$ is zero, at $t = 2$. The force on a particle of mass $m$ is $m\mathbf{a}$.

## Common mistakes

:::mistake{title="Using suvat with a variable force"}
If the force depends on $t$, $x$ or $v$, the acceleration is not constant. Integrate instead.
:::

:::mistake{title="Forgetting the constant of integration"}
Each integration needs a constant (or definite limits). Use the initial conditions to find it before answering.
:::

:::mistake{title="Wrong sign for a resistance"}
A resistance opposes motion: with the positive direction along the motion, it enters as $-kv$ or $-kv^2$.
:::

:::mistake{title="Choosing the wrong form of acceleration"}
For distance with a velocity-dependent force use $v\frac{\mathrm{d}v}{\mathrm{d}x}$; for time use $\frac{\mathrm{d}v}{\mathrm{d}t}$.
:::

## Exam tips

:::exam-tip
Start with Newton's second law in words: "resultant force = mass × acceleration", written with the correct form of $a$. That line earns the method mark.
:::

:::exam-tip
"Show that $v = 40(1 - \mathrm{e}^{-3t/40})$" needs the separation, both integrals, the constant from the initial condition and the rearrangement. Use definite integrals with matching limits to avoid a separate constant.
:::

:::exam-tip
Give exact answers such as $40\ln 3$ when asked for them, otherwise 3 significant figures with units.
:::

## Summary

:::summary
- $a = \frac{\mathrm{d}v}{\mathrm{d}t} = \frac{\mathrm{d}^2x}{\mathrm{d}t^2} = v\frac{\mathrm{d}v}{\mathrm{d}x}$; choose the form that matches the variable in the force and the quantity asked for.
- $a(t)$: integrate twice with respect to $t$. $a(x)$: $\int v\,\mathrm{d}v = \int a\,\mathrm{d}x$.
- Resistances $kv$ or $kv^2$ give separable differential equations; a driving force against resistance gives a terminal velocity.
- In the plane, differentiate or integrate each component of $\mathbf{r}$, $\mathbf{v}$ and $\mathbf{a}$.
:::
