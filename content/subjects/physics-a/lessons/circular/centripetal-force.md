---
{
  "key": "circular.centripetal-force",
  "title": "Centripetal acceleration and centripetal force",
  "summary": "Explain why uniform circular motion needs a resultant force towards the centre, use a = v²/r = rω² and F = mv²/r = mrω², and identify the force that provides it for cars on bends and banked tracks, conical pendulums, humps and vertical circles.",
  "concepts": ["aphys.circular.centripetal-force"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A kombi taking a roundabout in Harare too fast skids towards the outside of the bend; a truck with a high load can tip over on a sharp bend; passengers on a fairground ride feel pressed into their seats. All of these are about what it takes to make something move in a circle. The surprising result is that an object moving in a circle at constant speed is **accelerating**, and needs a resultant force towards the centre of the circle.

You need angular speed and $v = r\omega$ (previous lesson), Newton's laws, and resolving forces.

## Key definitions

:::definition{term="Uniform circular motion"}
Motion in a circle at constant speed. The velocity changes direction continuously, so the object accelerates even though its speed is constant.
:::

:::definition{term="Centripetal acceleration"}
The acceleration of an object in uniform circular motion, directed towards the centre of the circle.
:::

:::definition{term="Centripetal force"}
The resultant force on an object in uniform circular motion. It is directed towards the centre of the circle and is provided by real forces such as tension, friction, gravity or a normal contact force.
:::

:::formula{name="Centripetal acceleration"}
$$
a = \frac{v^2}{r} = r\omega^2
$$

$v$ in $\text{m s}^{-1}$, $r$ in m, $\omega$ in $\text{rad s}^{-1}$; $a$ in $\text{m s}^{-2}$, towards the centre.
:::

:::formula{name="Centripetal force"}
$$
F = \frac{mv^2}{r} = mr\omega^2
$$

$m$ in kg; $F$ in N, directed towards the centre.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches this in Form 5; Cambridge in the A Level part (topic 12, Paper 4). Cambridge asks you to *describe qualitatively* how a force of constant magnitude perpendicular to the velocity causes circular motion; neither board requires the derivation of $a = v^2/r$ in detail, but understanding it helps.
:::

## Why there is an acceleration towards the centre

Velocity is a vector. In uniform circular motion its magnitude is constant, but its direction keeps turning, always along the tangent. A change of velocity means acceleration. The change in velocity over a short time points towards the centre of the circle, so the acceleration does too.

A force of **constant magnitude** that is always **perpendicular to the velocity** does no work (the displacement is always at right angles to it), so it cannot change the speed. It only changes the direction of motion, continuously, which produces circular motion. If the force disappears, the object continues in a straight line along the tangent (Newton's first law): it does not fly outwards.

The words "centripetal force" do not name a new kind of force. In every problem, ask: **which real force, or combination, points towards the centre?**

| Situation | What provides the centripetal force |
| --- | --- |
| Stone whirled on a string in a horizontal circle | tension in the string |
| Car going round a flat bend | sideways friction between tyres and road |
| Car on a banked track (at its design speed) | horizontal component of the normal contact force |
| Satellite or the Moon in orbit | gravitational pull of the Earth |
| Electron in a magnetic field | magnetic force |
| Aircraft banking to turn | horizontal component of the lift |

## Horizontal circles

:::worked-solution[A car on a flat roundabout]
A car of mass $1200\ \text{kg}$ goes round a flat roundabout of radius $25\ \text{m}$ at $12\ \text{m s}^{-1}$.

1. $a = \dfrac{v^2}{r} = \dfrac{12^2}{25} = 5.76\ \text{m s}^{-2}$, towards the centre.
2. $F = ma = 1200 \times 5.76 = 6.91 \times 10^{3}\ \text{N}$.
3. This must be supplied by friction between the tyres and the road. On a wet or gravelly road the maximum friction is smaller, so the car can only take the bend more slowly; otherwise it slides off along a path closer to the tangent.
:::

:::worked-solution[A conical pendulum]
A $0.20\ \text{kg}$ bob on a string $0.80\ \text{m}$ long moves in a horizontal circle with the string at $30^\circ$ to the vertical.

1. Radius $r = L\sin\theta = 0.80 \sin 30^\circ = 0.40\ \text{m}$.
2. Vertically there is no acceleration: $T\cos\theta = mg$, so $T = \dfrac{0.20 \times 9.81}{\cos 30^\circ} = 2.27\ \text{N}$.
3. Horizontally: $T\sin\theta = mr\omega^2$. Dividing by step 2: $\tan\theta = \dfrac{r\omega^2}{g}$.
4. $\omega = \sqrt{\dfrac{g\tan\theta}{r}} = \sqrt{\dfrac{9.81 \times \tan 30^\circ}{0.40}} = 3.76\ \text{rad s}^{-1}$; period $= \dfrac{2\pi}{\omega} = 1.67\ \text{s}$.
:::

On a **banked** track the same geometry applies: the normal contact force is tilted, and its horizontal component provides the centripetal force. At the design speed no sideways friction is needed and $\tan\theta = \dfrac{v^2}{rg}$. For a bend of radius $80\ \text{m}$ designed for $20\ \text{m s}^{-1}$, $\tan\theta = \dfrac{400}{80 \times 9.81}$, so $\theta = 27.0^\circ$.

![Conical pendulum, a 0.20 kg bob on a 0.80 m string at 30° to the vertical: radius 0.40 m; the vertical component of tension T cos 30° balances the weight 1.96 N (T = 2.27 N) and the horizontal component T sin 30° is the centripetal force, giving ω = 3.76 rad/s.](media:diagrams/conical-pendulum-forces.png "Figure: forces on a conical pendulum bob")

## Vertical circles and humps

In a vertical circle, weight acts downwards all the time, so the force needed from the string, track or seat changes around the circle. Always take "towards the centre" as positive.

![Forces on a 0.20 kg mass in a vertical circle of radius 0.60 m: at the top (3.0 m/s) tension 1.04 N and weight 1.96 N both point to the centre; at the bottom (5.0 m/s) tension 10.3 N upwards exceeds the weight, so the string is most likely to break at the bottom.](media:diagrams/vertical-circle-tension.png "Figure: tension at the top and bottom of a vertical circle")

:::worked-solution[A car over a hump-backed bridge]
A $1000\ \text{kg}$ car crosses the top of a hump of radius $20\ \text{m}$.

1. At the top the centre is below the car. Resultant downward force $= mg - N = \dfrac{mv^2}{r}$.
2. At $10\ \text{m s}^{-1}$: $N = 1000 \times 9.81 - \dfrac{1000 \times 10^2}{20} = 9810 - 5000 = 4810\ \text{N}$. The car presses on the road less than its weight, so passengers feel lighter.
3. The car loses contact when $N = 0$: $v = \sqrt{gr} = \sqrt{9.81 \times 20} = 14.0\ \text{m s}^{-1}$.
:::

:::worked-solution[A mass whirled in a vertical circle]
A $0.20\ \text{kg}$ mass on a string moves in a vertical circle of radius $0.60\ \text{m}$. Its speed is $3.0\ \text{m s}^{-1}$ at the top and $5.0\ \text{m s}^{-1}$ at the bottom.

1. Top (centre below): $T + mg = \dfrac{mv^2}{r}$, so $T = \dfrac{0.20 \times 3.0^2}{0.60} - 0.20 \times 9.81 = 3.00 - 1.96 = 1.04\ \text{N}$.
2. Bottom (centre above): $T - mg = \dfrac{mv^2}{r}$, so $T = 1.96 + \dfrac{0.20 \times 5.0^2}{0.60} = 1.96 + 8.33 = 10.3\ \text{N}$.
3. The string is most likely to break at the bottom. At the top it goes slack if $v < \sqrt{gr} = 2.43\ \text{m s}^{-1}$.
:::

## Common mistakes

:::mistake{title="Adding a centripetal force to the diagram"}
Do not draw "centripetal force" as an extra arrow. Draw the real forces (weight, tension, normal force, friction); their resultant towards the centre **is** the centripetal force.
:::

:::mistake{title="Centrifugal force pushing outwards"}
There is no outward force on the object. A passenger "thrown outwards" on a bend is really continuing in a straight line while the car turns beneath them.
:::

:::mistake{title="Speed constant means no acceleration"}
The velocity changes direction, so there is an acceleration $v^2/r$ even at constant speed.
:::

:::mistake{title="Sign errors in vertical circles"}
At the top, both weight and tension point to the centre (down); at the bottom, tension points up and weight down. Write "resultant towards centre $= mv^2/r$" each time.
:::

## Exam tips

:::exam-tip{title="Explain circular motion"}
*Explain why an object moving in a circle at constant speed accelerates*: velocity is a vector; its direction changes continuously; so there is an acceleration, towards the centre. *Explain why the speed is constant*: the force is perpendicular to the velocity, so no work is done on the object.
:::

:::exam-tip{title="Calculations"}
Identify the force providing $F = mv^2/r$, resolve forces vertically and horizontally (conical pendulum, banking), and use $\omega = 2\pi/T$ when given a period. Give the direction "towards the centre".
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (with orbits in the gravitation topic) and ZIMSEC Papers 1 and 2.
:::

## Summary

:::summary
- Uniform circular motion has constant speed but changing velocity, so it is accelerated motion.
- $a = v^2/r = r\omega^2$ and $F = mv^2/r = mr\omega^2$, both towards the centre.
- A force of constant size perpendicular to the velocity changes direction only and does no work.
- The centripetal force is always provided by real forces: tension, friction, normal force, gravity, lift.
- In vertical circles the required tension or reaction is largest at the bottom; at the top contact is lost if $v < \sqrt{gr}$.
:::
