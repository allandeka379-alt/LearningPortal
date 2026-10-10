---
{
  "key": "circular.motion",
  "title": "Motion in a circle",
  "summary": "Use angular speed, v = rω and the acceleration rω² = v²/r towards the centre to solve horizontal-circle problems (turntables, strings, conical pendulums, banked tracks) and vertical-circle problems with a particle on a string.",
  "concepts": ["amaths.circular.motion"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A maize-grinding hammer mill, a merry-go-round at a Harare fun fair, a kombi taking the bend at a roundabout and a stone whirled on a string all move in circles. Even at a constant speed, these bodies are **accelerating**, because the direction of their velocity keeps changing. Something must supply a force towards the centre: friction, a tension, or a component of a normal reaction.

ZIMSEC Mechanics examines circular motion in Form 6 (topic 6.10): angular speed, the acceleration of a particle moving in a circle with constant speed, horizontal and vertical circles, the conical pendulum and banked tracks. Cambridge 9709 does not include circular motion, so this lesson is for ZIMSEC candidates. You need Newton's second law and resolving forces.

## Key definitions

:::definition{term="Angular speed"}
The rate at which the radius to the particle turns, $\omega = \frac{\mathrm{d}\theta}{\mathrm{d}t}$, in radians per second (rad s$^{-1}$). One revolution is $2\pi$ radians, so $n$ revolutions per minute is $\omega = \frac{2\pi n}{60}$ rad s$^{-1}$.
:::

:::formula{name="Speed, acceleration and force in a circle of radius r"}
$$
v = r\omega, \qquad a = r\omega^2 = \frac{v^2}{r} \text{ towards the centre}, \qquad F = mr\omega^2 = \frac{mv^2}{r}
$$
:::

:::keyfact{title="Period"}
The time for one revolution is $T = \dfrac{2\pi}{\omega} = \dfrac{2\pi r}{v}$.
:::

The force $F$ is **not** an extra force to add to a diagram. It is the resultant of the real forces (tension, friction, reaction, weight) in the direction of the centre.

## Why the acceleration points to the centre

At constant speed the velocity vector keeps the same length but turns through an angle $\omega\,\delta t$ in a short time $\delta t$. The change in velocity has size $v\omega\,\delta t$ and points towards the centre, so the acceleration is $v\omega = r\omega^2 = \frac{v^2}{r}$, directed inwards. In vector form, if $\mathbf{r} = r\cos\omega t\,\mathbf{i} + r\sin\omega t\,\mathbf{j}$, differentiating twice gives $\ddot{\mathbf{r}} = -\omega^2\mathbf{r}$.

## Horizontal circles

The method is always the same:

1. Draw the forces.
2. **Resolve vertically**: there is no vertical acceleration, so the vertical forces balance.
3. **Resolve horizontally towards the centre**: the resultant equals $mr\omega^2$ or $\frac{mv^2}{r}$.

:::worked-solution[Example 1: A coin rests 0.15 m from the centre of a horizontal turntable that rotates at 45 revolutions per minute. Take $g = 9.8$ m s$^{-2}$. Find the least coefficient of friction that stops the coin slipping.]
1. $\omega = \dfrac{45 \times 2\pi}{60} = 4.712$ rad s$^{-1}$.
2. Vertically: $R = mg$.
3. Towards the centre, friction provides the force: $F = mr\omega^2 = m(0.15)(4.712)^2 = 3.331m$.
4. No slipping needs $F \le \mu R$: $3.331m \le \mu(9.8m)$.
5. So $\mu \ge \dfrac{3.331}{9.8} = 0.340$.
:::

The mass cancels, so every coin at that radius needs the same coefficient. Further out, $r\omega^2$ is larger and the coin slips sooner.

## The conical pendulum

A particle on a string, moving in a horizontal circle with the string sweeping out a cone, is a **conical pendulum**. If the string has length $l$ and makes angle $\theta$ with the vertical, the radius of the circle is $r = l\sin\theta$.

:::worked-solution[Example 2: A particle of mass 0.3 kg on a light string of length 0.8 m moves in a horizontal circle with the string at $30°$ to the vertical. Take $g = 9.8$ m s$^{-2}$. Find the tension and the angular speed, and show that $\omega^2 = \dfrac{g}{l\cos\theta}$.]
1. Radius: $r = 0.8\sin 30° = 0.4$ m.
2. Vertically: $T\cos 30° = 0.3 \times 9.8$, so $T = \dfrac{2.94}{0.8660} = 3.39$ N.
3. Horizontally: $T\sin 30° = 0.3 \times 0.4 \times \omega^2$, so $\omega^2 = \dfrac{1.6974}{0.12} = 14.145$ and $\omega = 3.76$ rad s$^{-1}$.
4. In general, $T\sin\theta = m(l\sin\theta)\omega^2$ gives $T = ml\omega^2$; then $T\cos\theta = mg$ gives $ml\omega^2\cos\theta = mg$.
5. So $\omega^2 = \dfrac{g}{l\cos\theta}$, as required. Check: $\dfrac{9.8}{0.8 \times 0.8660} = 14.145$.
:::

The period is $2\pi\sqrt{\frac{l\cos\theta}{g}}$, here $1.67$ s: it depends on the **depth** $l\cos\theta$ of the circle below the fixed point, not on the mass.

## Banked tracks

Roads and railway curves are **banked** (tilted towards the centre) so that the normal reaction helps to supply the central force. On a smooth track banked at $\theta$, a vehicle needs no friction when
$$
R\cos\theta = mg, \quad R\sin\theta = \frac{mv^2}{r} \quad\Rightarrow\quad \tan\theta = \frac{v^2}{rg}.
$$

:::worked-solution[Example 3: A bend on a road has radius 80 m and is banked at $12°$. Take $g = 9.8$ m s$^{-2}$. Find the speed at which a kombi can take the bend with no tendency to slip sideways.]
1. No friction: $\tan 12° = \dfrac{v^2}{80 \times 9.8}$.
2. $v^2 = 784\tan 12° = 166.6$.
3. $v = 12.9$ m s$^{-1}$ (about 46 km h$^{-1}$).
:::

Faster than this, friction acts down the slope to stop the vehicle sliding outwards; slower, friction acts up the slope. With friction included, resolve vertically and horizontally (not along the slope), with $F = \mu R$ at the limit.

## Vertical circles

A stone whirled on a string in a vertical circle has its weight acting along the radius at the top and the bottom.

- **At the bottom:** $T - mg = \dfrac{mv^2}{r}$, so the tension is largest here.
- **At the top:** $T + mg = \dfrac{mv^2}{r}$, so the tension is smallest here.

For example, a particle of mass 0.2 kg on a string of length 0.5 m moving at a constant 4 m s$^{-1}$ has $\frac{mv^2}{r} = 6.4$ N, so the tension is $6.4 - 1.96 = 4.44$ N at the top and $6.4 + 1.96 = 8.36$ N at the bottom. The string stays taut at the top only if $\frac{mv^2}{r} \ge mg$, i.e. $v \ge \sqrt{gr}$.

The syllabus speaks of vertical circles with constant speed. When a particle swings freely, its speed changes: then use conservation of energy to find the speed at each point before applying the radial equation.

## Common mistakes

:::mistake{title="Adding a 'centripetal force' to the diagram"}
$\frac{mv^2}{r}$ is the resultant of the forces you have drawn, not another force.
:::

:::mistake{title="Using revolutions per minute as ω"}
Convert to radians per second: multiply by $2\pi$ and divide by 60.
:::

:::mistake{title="Using the string length as the radius"}
In a conical pendulum the radius is $l\sin\theta$, not $l$.
:::

:::mistake{title="Resolving along the slope on a banked track"}
The acceleration is horizontal, towards the centre. Resolve vertically and horizontally.
:::

## Exam tips

:::exam-tip
Write "$\uparrow$: …" and "$\leftarrow$ (towards the centre): … $= mr\omega^2$" as headings; examiners award a method mark for each correct equation.
:::

:::exam-tip
In "show that" questions such as $\omega^2 = \frac{g}{l\cos\theta}$, keep the work in symbols until the last line. Give speeds in m s$^{-1}$ and angular speeds in rad s$^{-1}$ to 3 significant figures.
:::

## Summary

:::summary
- $v = r\omega$; acceleration $r\omega^2 = \frac{v^2}{r}$ towards the centre; resultant force $mr\omega^2$ towards the centre.
- Horizontal circles: vertical forces balance; the horizontal resultant towards the centre is $mr\omega^2$.
- Conical pendulum: $r = l\sin\theta$, $T = ml\omega^2$, $\omega^2 = \frac{g}{l\cos\theta}$.
- Smooth banked track: $\tan\theta = \frac{v^2}{rg}$.
- Vertical circle on a string: $T - mg = \frac{mv^2}{r}$ at the bottom, $T + mg = \frac{mv^2}{r}$ at the top.
:::
