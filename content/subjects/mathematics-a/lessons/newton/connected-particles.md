---
{
  "key": "newton.connected-particles",
  "title": "Connected particles: strings, pulleys and tow-bars",
  "summary": "Apply Newton's second law to two particles joined by a light inextensible string over a smooth pulley or by a tow-bar, find the common acceleration and the tension or thrust, and handle the motion after a string becomes slack or a particle hits the ground.",
  "concepts": ["amaths.newton.connected-particles"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A bucket of water is hauled up a well by a rope over a pulley; a tractor tows a trailer of tobacco bales to the auction floors in Harare; a mine cage is balanced by a counterweight. In each case two bodies are joined, and they move together with the same speed and the same size of acceleration. Questions on such **connected particles** are among the most common in A Level mechanics.

ZIMSEC examines them in Mechanics Form 5 (topic 6.4); Cambridge in Paper 4 (topic 4.4), usually as a long question that continues after one particle hits the ground or the string goes slack. You need Newton's second law and the constant-acceleration formulae.

## Key definitions

:::definition{term="Light inextensible string"}
A string of negligible mass ("light") that does not stretch ("inextensible"). The tension is the same all along it, and the particles at its two ends have the same speed and the same magnitude of acceleration.
:::

:::definition{term="Smooth light pulley"}
A pulley with no friction at its axle and negligible mass. The tension is the same on both sides of it.
:::

:::definition{term="Tension and thrust"}
A string can only pull (tension). A rigid rod or tow-bar can pull (tension) or push (thrust, or compression).
:::

:::keyfact{title="Two ways to write the equations"}
- **Separately**: write $F = ma$ for each particle, with the tension appearing in both, and solve simultaneously. This always works and gives the tension.
- **As one system**: when the particles move in the same straight line (car and trailer), treat them as a single body of total mass; internal forces (the tension) cancel. This gives the acceleration quickly.
:::

## Particles over a pulley

Take the direction of motion as positive **for each particle**: down for the heavier hanging particle, up for the lighter one. Then the accelerations have the same sign and size.

:::worked-solution[Example 1 (exam style): particles of mass $5$ kg and $3$ kg hang at the ends of a light inextensible string over a smooth pulley, and are released from rest. Take $g = 10$ m s$^{-2}$. (a) Find the acceleration and the tension. (b) The $5$ kg particle hits the floor after falling $1.6$ m. Find the greatest height the $3$ kg particle reaches above its starting point.]
1. (a) $5$ kg particle, downwards: $50 - T = 5a$.
2. $3$ kg particle, upwards: $T - 30 = 3a$.
3. Add the equations: $20 = 8a$, so $a = 2.5$ m s$^{-2}$, and $T = 30 + 7.5 = 37.5$ N.
4. (b) When the $5$ kg particle lands, both have speed $v$ with $v^2 = 2(2.5)(1.6) = 8$.
5. The string goes slack. The $3$ kg particle, now $1.6$ m up, moves freely under gravity: $0 = 8 - 20s$, so it rises a further $0.4$ m.
6. Greatest height above its start: $1.6 + 0.4 = 2.0$ m (provided the string is long enough not to reach the pulley).
:::

Adding the two equations in step 3 removes $T$: it is the same as treating the string and the particles as one system of mass $8$ kg driven by the difference in weights.

## One particle on a table

:::worked-solution[Example 2: a block of mass $4$ kg on a rough horizontal table is joined by a light inextensible string, passing over a smooth pulley at the edge of the table, to a particle of mass $2$ kg hanging freely. The coefficient of friction between block and table is $0.25$; $g = 10$ m s$^{-2}$. Find the acceleration and the tension.]
1. Block: $R = 40$ N, so friction $= 0.25 \times 40 = 10$ N (sliding, so limiting).
2. Block, towards the pulley: $T - 10 = 4a$.
3. Hanging particle, downwards: $20 - T = 2a$.
4. Add: $10 = 6a$, so $a = \dfrac{5}{3} = 1.67$ m s$^{-2}$.
5. Then $T = 20 - 2 \times \dfrac{5}{3} = \dfrac{50}{3} = 16.7$ N.
6. Check: the tension is less than the hanging weight ($20$ N), as it must be when the particle accelerates downwards.
:::

Before writing step 2, check that motion actually happens: the hanging weight ($20$ N) must exceed the greatest friction ($10$ N). If it did not, the system would stay at rest and $T$ would equal the hanging weight.

On an **inclined** plane the method is the same: the particle on the slope has $mg\sin\alpha$ along the slope, and friction (if rough) opposes the direction in which it moves.

## Car and trailer: tension and thrust

:::worked-solution[Example 3: a car of mass $1200$ kg tows a trailer of mass $400$ kg along a level road using a light rigid tow-bar. The resistances are $500$ N on the car and $300$ N on the trailer. (a) The driving force is $3000$ N. Find the acceleration and the tension in the tow-bar. (b) Later the engine is disengaged and the car brakes with a force of $1500$ N. Find the deceleration and the force in the tow-bar, saying whether it is a tension or a thrust.]
1. (a) Whole system: $3000 - 500 - 300 = 1600a$, so $a = 1.375$ m s$^{-2}$.
2. Trailer alone: $T - 300 = 400 \times 1.375$, so $T = 850$ N (tension).
3. (b) Whole system, deceleration $d$: $1500 + 500 + 300 = 1600d$, so $d = 1.4375$ m s$^{-2}$.
4. Trailer alone: it needs a backward force of $400 \times 1.4375 = 575$ N, but resistance supplies only $300$ N.
5. So the tow-bar pushes back on the trailer with $575 - 300 = 275$ N: a **thrust** of $275$ N.
6. Check on the car: $1500 + 500 - 275 = 1725 = 1200 \times 1.4375$. Correct.
:::

When braking, the car slows more strongly than the trailer would on its own, so the trailer "pushes" into the car: the bar is in compression. A rope could not do this, which is why trailers use rigid bars.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine particles connected over fixed smooth pulleys or pegs, on horizontal and inclined planes, with $g = 10$ m s$^{-2}$ for Cambridge and $g$ stated by ZIMSEC. Cambridge often adds the motion after a particle reaches the floor; ZIMSEC may ask you to state the modelling assumptions (light, inextensible, smooth).
:::

## Common mistakes

:::mistake{title="Using different accelerations for the two particles"}
An inextensible string forces equal magnitudes of acceleration. Choose the positive direction for each particle along its own motion.
:::

:::mistake{title="Taking the tension equal to the hanging weight"}
That is true only in equilibrium. If the hanging particle accelerates down, $T < mg$; if up, $T > mg$.
:::

:::mistake{title="Whole-system equation for a pulley system with T"}
The whole-system shortcut gives the acceleration only; you still need a separate equation for one particle to find the tension.
:::

:::mistake{title="Continuing with the same acceleration after the string goes slack"}
Once a particle lands, the tension vanishes; the other particle moves under gravity (and friction) alone.
:::

## Exam tips

:::exam-tip
Label each equation with the particle it describes ("For $A$:", "For $B$:"). Each correct equation usually earns its own mark.
:::

:::exam-tip
State the assumptions when asked: a light string has the same tension throughout; an inextensible string gives equal accelerations; a smooth pulley does not change the tension.
:::

:::exam-tip
For a tow-bar under braking, find the force on the trailer first; a negative tension means the bar is in thrust.
:::

## Summary

:::summary
- A light inextensible string over a smooth pulley has one tension $T$ and gives both particles the same speed and size of acceleration.
- Write $F = ma$ for each particle in its own direction of motion; adding the equations eliminates $T$.
- For vehicles in a straight line, the whole-system equation gives the acceleration; one vehicle alone gives the tension or thrust.
- A rod or tow-bar can be in tension or thrust; a string only in tension.
- After a particle hits the ground, the string goes slack and the other particle moves freely.
:::
