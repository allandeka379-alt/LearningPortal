---
{
  "key": "motion.acceleration",
  "title": "Acceleration",
  "summary": "Define acceleration as the rate of change of velocity, use a = Δv/Δt with the correct units, and treat deceleration as a negative acceleration.",
  "concepts": ["phys.motion.acceleration"],
  "objectives": ["cambridge/igcse/physics:1.2.9", "cambridge/igcse/physics:1.2.12", "zimsec/o-level/physics:2.1.1"],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

When a ZUPCO bus pulls away from a stop, its velocity increases; when it brakes at a robot (traffic light), its velocity decreases. **Acceleration** measures how quickly velocity changes. It is the key link between motion and force, which you will meet with Newton's laws.

For Cambridge, the equation for acceleration is Supplement content; ZIMSEC learners need it for topic 2.1. You should already know how to calculate speed.

## Key definitions

:::definition{term="Acceleration"}
The change in velocity per unit time.
:::

:::formula{name="Acceleration"}
$$
a = \frac{\Delta v}{\Delta t} = \frac{v - u}{t}
$$

where $u$ is the initial velocity, $v$ the final velocity and $t$ the time taken. The unit is metres per second per second, $\text{m/s}^2$.
:::

:::definition{term="Deceleration"}
A decrease in velocity. In calculations a deceleration is a **negative** acceleration.
:::

## What the unit means

An acceleration of $3\ \text{m/s}^2$ means the velocity increases by $3\ \text{m/s}$ **every second**. Starting from rest, the velocity is $3\ \text{m/s}$ after one second, $6\ \text{m/s}$ after two seconds, and so on.

:::worked-solution[A car pulling away]
A car starts from rest and reaches $18\ \text{m/s}$ in $7.5\ \text{s}$.

1. $u = 0$, $v = 18\ \text{m/s}$, $t = 7.5\ \text{s}$.
2. $a = \dfrac{v - u}{t} = \dfrac{18 - 0}{7.5} = 2.4\ \text{m/s}^2$.
:::

:::worked-solution[A train braking]
A train slows from $25\ \text{m/s}$ to $5\ \text{m/s}$ in $16\ \text{s}$.

1. $a = \dfrac{5 - 25}{16} = \dfrac{-20}{16} = -1.25\ \text{m/s}^2$.
2. The negative sign shows a deceleration of $1.25\ \text{m/s}^2$.
:::

## Rearranging the equation

The same equation gives the final velocity or the time:

- $v = u + at$
- $t = \dfrac{v - u}{a}$

:::worked-solution[Finding the final velocity]
A cyclist moving at $4.0\ \text{m/s}$ accelerates at $0.6\ \text{m/s}^2$ for $5.0\ \text{s}$.

1. $v = u + at = 4.0 + 0.6 \times 5.0 = 4.0 + 3.0 = 7.0\ \text{m/s}$.
:::

## Acceleration needs a change in velocity

Because velocity is a vector, an object accelerates if its speed changes **or** its direction changes. A car going round a roundabout at a steady $20\ \text{km/h}$ is accelerating, because its direction keeps changing. (This idea returns in the lesson on circular motion.)

Acceleration is found in the laboratory from ticker tape or light gates: measure the velocity at two moments and the time between them, then use $a = \Delta v / \Delta t$. It is also the **gradient** of a speed-time graph, as the figure shows (the next lesson covers motion graphs in full).

![Speed-time graph of a car pulling away: speed rises in a straight line from 0 to 18 m/s in 7.5 s, so the gradient, which is the acceleration, is 2.4 m/s squared (every 3 s the speed rises by 7.2 m/s); after 7.5 s the speed stays at 18 m/s.](media:diagrams/acceleration-speed-time-gradient.png "Figure: the gradient of a speed-time graph is the acceleration")

## Common mistakes

:::mistake{title="Dividing the final speed by the time"}
$a = v/t$ is only correct when the object starts from rest. In general use the **change** in velocity, $v - u$.
:::

:::mistake{title="Losing the minus sign"}
When an object slows down, $v - u$ is negative. Keep the sign in the working, and state "deceleration of …" if the question asks for a deceleration.
:::

:::mistake{title="Wrong unit"}
Acceleration is in $\text{m/s}^2$, not $\text{m/s}$. Writing $\text{m/s}$ loses the unit mark.
:::

## Exam tips

:::exam-tip
"Define acceleration" earns its mark only for "change in velocity per unit time" (or "rate of change of velocity"). "Speed per unit time" or "how fast something speeds up" does not score.
:::

:::exam-tip
Write down $u$, $v$ and $t$ with units before substituting. Many marks are lost by using the wrong velocity as $u$.
:::

## Summary

:::summary
- Acceleration is the change in velocity per unit time: $a = (v - u)/t$, in $\text{m/s}^2$.
- $3\ \text{m/s}^2$ means the velocity changes by $3\ \text{m/s}$ every second.
- A deceleration is a negative acceleration.
- Rearranged: $v = u + at$ and $t = (v - u)/a$.
- A change in direction is also a change in velocity, so it is an acceleration.
:::
