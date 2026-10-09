---
{
  "key": "mechanics.newtons-laws",
  "title": "Newton's laws of motion",
  "summary": "State Newton's three laws, apply F = ma to a particle of constant mass under constant forces, including weight, lifts, vertical lifting and motion against resistance, and combine the results with the equations of motion.",
  "concepts": ["amath.mechanics.newtons-laws"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Kinematics describes motion; Newton's laws explain it. Why does a loaded lorry take longer to stop than an empty one? Why do you feel heavier as a lift starts upwards in a Harare office block? Why does a bus pulling away from a rank need a larger driving force than one cruising at a steady speed? All three answers come from $F = ma$.

In ZIMSEC Paper 2 Newton's second law links the forces on a body to its acceleration, and the equations of motion then give speeds, distances and times. Almost every Mechanics question in Section B uses this combination. You need the equations of motion and the idea of resultant force.

## Key definitions

:::definition{term="Newton's first law"}
A body stays at rest, or moves in a straight line at constant speed, unless a resultant force acts on it.
:::

:::definition{term="Newton's second law"}
The resultant force on a body of constant mass equals its mass times its acceleration, $F = ma$, and the acceleration is in the direction of the resultant force.
:::

:::definition{term="Newton's third law"}
If body $A$ exerts a force on body $B$, then $B$ exerts a force on $A$ of equal size and opposite direction. The two forces act on **different** bodies.
:::

:::definition{term="Mass and weight"}
Mass (kg) measures the amount of matter and resistance to acceleration. Weight is the force of gravity on the body, $W = mg$ newtons.
:::

:::formula{name="Newton's second law"}
$$
F = ma
$$

$F$ is the **resultant** force in newtons, $m$ the mass in kilograms, $a$ the acceleration in m s$^{-2}$.
:::

## Using F = ma

1. Draw a force diagram and mark the direction of the acceleration.
2. Take that direction as positive.
3. Resultant force = (forces in the positive direction) − (forces in the opposite direction).
4. Set it equal to $ma$ and solve.

:::worked-solution[Example 1: a car of mass 1200 kg has a driving force of 3000 N and meets resistance totalling 600 N. Find its acceleration.]
1. Positive direction: the direction of motion.
2. Resultant force $= 3000 - 600 = 2400$ N.
3. $2400 = 1200a$, so $a = 2$ m s$^{-2}$.
:::

## Forces and the equations of motion

When the forces are constant, the acceleration is constant, so the equations of motion apply. The acceleration is the link: Newton's law gives $a$ from the forces, or the equations of motion give $a$ from the motion and Newton's law then gives a force.

:::worked-solution[Example 2: a 900 kg car travelling at 25 m s$^{-1}$ brakes with a constant braking force of 4500 N. Ignoring other resistances, find how far and for how long it travels before stopping.]
1. $-4500 = 900a$, so $a = -5$ m s$^{-2}$.
2. $v^2 = u^2 + 2as$: $0 = 625 - 10s$, so $s = 62.5$ m.
3. $v = u + at$: $0 = 25 - 5t$, so $t = 5$ s.
:::

## Vertical motion: lifting and lifts

For vertical motion the weight $mg$ is one of the forces. Take the direction of the acceleration as positive.

:::worked-solution[Example 3: a 50 kg crate is raised from rest by a vertical rope with tension 600 N. Take $g = 9.8$ m s$^{-2}$. Find its acceleration, and its speed and height after 3 s.]
1. Upwards positive: $600 - 50(9.8) = 50a$, so $110 = 50a$ and $a = 2.2$ m s$^{-2}$.
2. $v = 0 + 2.2 \times 3 = 6.6$ m s$^{-1}$.
3. $s = \frac{1}{2}(2.2)(3^2) = 9.9$ m.
:::

In a lift, the floor pushes up on a passenger with normal reaction $R$; that is what a bathroom scale on the floor would read.

:::worked-solution[Example 4: Tatenda, of mass 70 kg, stands in a lift. Take $g = 9.8$ m s$^{-2}$. Find the reaction of the floor when the lift accelerates (a) upwards at 0.8 m s$^{-2}$ (b) downwards at 0.8 m s$^{-2}$ (c) at constant speed.]
1. (a) Upwards positive: $R - 70(9.8) = 70(0.8)$, so $R = 70(10.6) = 742$ N.
2. (b) Downwards positive: $70(9.8) - R = 70(0.8)$, so $R = 70(9.0) = 630$ N.
3. (c) $a = 0$, so $R = 70(9.8) = 686$ N, his weight.
:::

He feels heavier in (a) and lighter in (b). A lift slowing down while moving downwards also accelerates upwards, so it gives the same reaction as (a).

## Newton's third law in practice

A book lies on a table. Its weight (Earth pulls book) and the normal reaction (table pushes book) are equal and opposite, but they are **not** a third-law pair: they act on the same body and are equal only because the book is in equilibrium. The third-law partner of the weight is the book pulling the Earth upwards; the partner of the normal reaction is the book pushing down on the table.

:::keyfact{title="ZIMSEC and Cambridge"}
Newton's laws are in ZIMSEC Paper 2 Mechanics only; Cambridge 0606 has no forces.
:::

## Common mistakes

:::mistake{title="Putting the driving force alone into F = ma"}
$F$ is the **resultant** force. Subtract resistances and, for vertical motion, the weight.
:::

:::mistake{title="Using mass instead of weight"}
In $T - mg = ma$ the weight term is $mg$ in newtons, not $m$.
:::

:::mistake{title="Thinking motion needs a force"}
A kombi moving at a steady 80 km/h on a level road has zero resultant force: the driving force exactly balances the resistances.
:::

:::mistake{title="Pairing forces on the same body"}
Third-law pairs always act on two different bodies and are of the same type (both gravitational, both contact).
:::

## Exam tips

:::exam-tip
Write "N2L" or "Newton's second law" and the direction you resolve in, for example "N2L ($\uparrow$): $T - 490 = 50a$". This earns the method mark even after an arithmetic slip.
:::

:::exam-tip
In multi-stage problems, the speed at the end of one stage is the starting speed of the next. Make a small table of $u$, $v$, $a$, $s$, $t$ for each stage.
:::

:::exam-tip
State the value of $g$ you use (the one in the question) and give forces to 3 significant figures.
:::

## Summary

:::summary
- First law: no resultant force means constant velocity (or rest).
- Second law: resultant force $= ma$, in the direction of the acceleration.
- Third law: forces come in equal and opposite pairs acting on different bodies.
- For vertical motion include the weight $mg$; in a lift accelerating upwards $R = m(g + a)$, downwards $R = m(g - a)$.
- Constant forces give constant acceleration, so combine $F = ma$ with the equations of motion.
:::
