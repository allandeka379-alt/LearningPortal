---
{
  "key": "circular.angular-speed",
  "title": "Radians and angular speed",
  "summary": "Define the radian, convert between degrees and radians, and use angular speed with ω = 2π/T = 2πf and v = rω for wheels, the rotating Earth, discs and centrifuges.",
  "concepts": ["aphys.circular.angular-speed"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Every point on a turning kombi wheel goes round once in the same time, but a point on the rim moves much faster than a point near the hub. A maize-mill flywheel, a borehole pump motor, a centrifuge in a hospital laboratory in Bulawayo and the Earth itself all rotate. To describe rotation without worrying about which point you choose, physicists measure **angles** in radians and speeds of rotation as **angular speeds**.

You should know the circumference of a circle, $2\pi r$, and the idea of period and frequency. This lesson is the foundation for centripetal acceleration and force in the next lesson.

## Key definitions

:::definition{term="Radian"}
The angle subtended at the centre of a circle by an arc whose length equals the radius of the circle.
:::

:::definition{term="Angular displacement"}
The angle, in radians, through which an object moving in a circle has turned about the centre.
:::

:::definition{term="Angular speed"}
The rate of change of angular displacement with time: $\omega = \Delta\theta/\Delta t$, in $\text{rad s}^{-1}$.
:::

:::formula{name="Arc length and the radian"}
$$
\theta = \frac{s}{r}
$$

$\theta$ in radians, arc length $s$ and radius $r$ in the same unit. One complete turn: $s = 2\pi r$, so $360^\circ = 2\pi\ \text{rad}$.
:::

:::formula{name="Angular speed, period, frequency and linear speed"}
$$
\omega = \frac{2\pi}{T} = 2\pi f \qquad v = r\omega
$$

$T$ is the period (time for one revolution) in s, $f$ the frequency in Hz (revolutions per second), $v$ the linear (tangential) speed in $\text{m s}^{-1}$ and $r$ the radius in m.
:::

:::keyfact{title="Conversions"}
$1\ \text{rad} = \dfrac{180^\circ}{\pi} \approx 57.3^\circ$; $\quad 90^\circ = \dfrac{\pi}{2}\ \text{rad}$; $\quad 180^\circ = \pi\ \text{rad}$; $\quad 1\ \text{rev min}^{-1} = \dfrac{2\pi}{60}\ \text{rad s}^{-1}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches circular motion in Form 5. Cambridge places it in the A Level part of the course (topic 12, Paper 4). Both use the same definitions and equations.
:::

## Why radians?

A radian is a ratio of two lengths (arc ÷ radius), so it is really a pure number; "rad" is written to remind us it is an angle. Using radians makes the relationships simple: an arc is just $s = r\theta$ and a speed is $v = r\omega$, with no factors of $\pi/180$. In degrees, every formula would carry an awkward conversion factor. Your calculator must be in radian mode when you take the sine or cosine of an angle in radians.

To convert, multiply degrees by $\pi/180$; multiply radians by $180/\pi$.

:::worked-solution[Converting angles]
1. $75^\circ = 75 \times \dfrac{\pi}{180} = 1.31\ \text{rad}$.
2. $2.5\ \text{rad} = 2.5 \times \dfrac{180}{\pi} = 143^\circ$.
3. A wheel of radius $0.30\ \text{m}$ that turns through $2.5\ \text{rad}$ moves a point on its rim through an arc $s = r\theta = 0.30 \times 2.5 = 0.75\ \text{m}$.
:::

## Angular speed and linear speed

All points on a rigid rotating object have the **same** angular speed. Their linear speeds differ: a point at radius $r$ travels $2\pi r$ in one period, so $v = \dfrac{2\pi r}{T} = r\omega$. The velocity of each point is directed along the **tangent** to its circle, perpendicular to the radius.

:::worked-solution[A kombi wheel]
A kombi travels at $25\ \text{m s}^{-1}$ on wheels of radius $0.30\ \text{m}$ that roll without slipping.

1. The rim moves relative to the axle at the same speed as the road moves relative to the kombi, so $v = 25\ \text{m s}^{-1}$.
2. $\omega = \dfrac{v}{r} = \dfrac{25}{0.30} = 83.3\ \text{rad s}^{-1}$.
3. $f = \dfrac{\omega}{2\pi} = 13.3\ \text{Hz}$, about $796$ revolutions per minute.
:::

:::worked-solution[The rotating Earth]
Taking the Earth's rotation period as $24\ \text{h}$ and its radius as $6.4 \times 10^{6}\ \text{m}$, find the speed of a point in Harare (latitude about $18^\circ$ S) due to the rotation.

1. $\omega = \dfrac{2\pi}{T} = \dfrac{2\pi}{24 \times 3600} = 7.27 \times 10^{-5}\ \text{rad s}^{-1}$, the same for every point on the Earth.
2. Harare moves in a circle about the Earth's axis of radius $r = 6.4 \times 10^{6} \times \cos 18^\circ = 6.09 \times 10^{6}\ \text{m}$.
3. $v = r\omega = 6.09 \times 10^{6} \times 7.27 \times 10^{-5} = 443\ \text{m s}^{-1}$ (on the equator it would be $465\ \text{m s}^{-1}$).
:::

(The true rotation period relative to the stars is about 23.9 hours; 24 hours is a good approximation here.)

:::worked-solution[A laboratory centrifuge]
A centrifuge spins at $3000$ revolutions per minute. A sample tube is held $0.12\ \text{m}$ from the axis.

1. $f = \dfrac{3000}{60} = 50\ \text{Hz}$; $\omega = 2\pi f = 314\ \text{rad s}^{-1}$.
2. $v = r\omega = 0.12 \times 314 = 37.7\ \text{m s}^{-1}$.
:::

## Graphs and data

For an object rotating at constant angular speed, a graph of angular displacement $\theta$ against time is a straight line through the origin with gradient $\omega$. For a set of points on one rigid disc, a graph of linear speed $v$ against radius $r$ is also a straight line through the origin, with gradient $\omega$:

| $r\,/\,\text{m}$ | 0.05 | 0.10 | 0.15 | 0.20 |
| --- | --- | --- | --- | --- |
| $v\,/\,\text{m s}^{-1}$ (disc at $\omega = 20\ \text{rad s}^{-1}$) | 1.0 | 2.0 | 3.0 | 4.0 |

## Common mistakes

:::mistake{title="Calculator in degree mode"}
If an angle is in radians, set the calculator to radians before using sin, cos or tan.
:::

:::mistake{title="Using frequency for angular speed"}
$\omega = 2\pi f$, not $f$. A wheel turning at 10 Hz has $\omega = 62.8\ \text{rad s}^{-1}$.
:::

:::mistake{title="Revolutions per minute"}
Divide by 60 to get revolutions per second (Hz) before multiplying by $2\pi$.
:::

:::mistake{title="Same speed for every point"}
Every point on a rigid rotating body has the same $\omega$ but a different $v$; $v$ is proportional to the distance from the axis.
:::

## Exam tips

:::exam-tip{title="Define the radian"}
"The angle subtended at the centre of a circle by an arc equal in length to the radius." Include *at the centre* and *equal in length to the radius*.
:::

:::exam-tip{title="Show your conversions"}
In multi-step questions write $\omega = 2\pi/T$ or $2\pi f$ explicitly and keep units: $\text{rad s}^{-1}$ for $\omega$, $\text{m s}^{-1}$ for $v$.
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (A Level) and ZIMSEC Papers 1 and 2. Expect it inside centripetal-force and orbit questions.
:::

## Summary

:::summary
- One radian is the angle subtended at the centre by an arc equal to the radius; $2\pi\ \text{rad} = 360^\circ$.
- Arc length $s = r\theta$ with $\theta$ in radians.
- Angular speed $\omega = \Delta\theta/\Delta t = 2\pi/T = 2\pi f$, in $\text{rad s}^{-1}$.
- Linear speed $v = r\omega$, directed along the tangent.
- All points of a rigid rotating body share $\omega$; their speeds are proportional to $r$.
:::
