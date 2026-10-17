---
{
  "key": "dynamics.momentum-force",
  "title": "Linear momentum and force as rate of change of momentum",
  "summary": "Define momentum p = mv as a vector, state Newton's second law as force equals rate of change of momentum, show how F = ma follows for constant mass, and use impulse (the area under a force-time graph) for collisions, crumple zones, rockets and fluid jets.",
  "concepts": ["aphys.dynamics.momentum-force"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Why does a cricketer draw her hands back when catching a hard ball? Why are modern kombis built with crumple zones that collapse in a crash? Why does a fire hose push back on the firefighter holding it? Each answer involves **momentum**, the quantity that combines mass and velocity, and the idea that a force is what changes it.

This lesson defines momentum, restates Newton's second law in its general form and introduces impulse. You should know Newton's laws in the form $F = ma$ and be comfortable treating velocity as a vector with a sign.

## Key definitions

:::definition{term="Linear momentum"}
The product of an object's mass and its velocity, $p = mv$. It is a vector in the direction of the velocity, measured in $\text{kg m s}^{-1}$ (equivalent to N s).
:::

:::definition{term="Newton's second law (general form)"}
The resultant force acting on an object is equal to the rate of change of its momentum, and is in the direction of that change.
:::

:::definition{term="Impulse"}
The product of a force and the time for which it acts, $F\Delta t$, equal to the change in momentum it produces. For a varying force it is the area under the force-time graph. Unit: N s.
:::

:::formula{name="Momentum, force and impulse"}
$$
p = mv \qquad F = \frac{\Delta p}{\Delta t} \qquad F\Delta t = \Delta p = mv - mu
$$

$m$ = mass (kg), $u$ and $v$ = initial and final velocities ($\text{m s}^{-1}$), $\Delta t$ = time (s), $F$ = resultant force (N).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define momentum and use force as rate of change of momentum and impulse. Cambridge states Newton's second law in the momentum form and expects you to show that $F = ma$ follows for constant mass.
:::

## From rate of change of momentum to F = ma

If the mass stays constant,

$$
F = \frac{\Delta(mv)}{\Delta t} = m\frac{\Delta v}{\Delta t} = ma
$$

So $F = ma$ is a special case. The momentum form is more general: it also covers systems whose mass changes, such as a rocket burning fuel or a conveyor belt being loaded with maize.

## Momentum is a vector: watch the signs

When a ball rebounds, its momentum reverses. With the original direction positive, the change in momentum is $m(v - u)$ with $v$ negative, so its size is the **sum** of the two momenta.

:::worked-solution[A tennis ball returned]
A $0.057\ \text{kg}$ tennis ball travelling at $30\ \text{m s}^{-1}$ is hit straight back at $25\ \text{m s}^{-1}$. The racket is in contact with it for $4.0\ \text{ms}$.

1. Take the ball's final direction as positive: $u = -30\ \text{m s}^{-1}$, $v = +25\ \text{m s}^{-1}$.
2. $\Delta p = m(v - u) = 0.057 \times (25 - (-30)) = 0.057 \times 55 = 3.14\ \text{N s}$.
3. Average force: $F = \dfrac{\Delta p}{\Delta t} = \dfrac{3.135}{4.0 \times 10^{-3}} = 784\ \text{N}$, in the direction of the return shot.
:::

Ignoring the reversal ($25 - 30$) would give a change of momentum eleven times too small.

## Impulse and safety

For a given change in momentum, $F = \Delta p / \Delta t$: the **longer** the stopping time, the **smaller** the force.

![Two force-time graphs for a 1200 kg car stopping from 15 m/s: a rigid car stops in 20 ms with a force of 900 kN, a crumple zone stops it in 90 ms with 200 kN; the areas are equal (18 000 N s) so a longer time means a much smaller force.](media:diagrams/crumple-zone-force-time-graph.png "Figure: same impulse, different stopping times (rigid car against crumple zone)")

:::worked-solution[Why crumple zones work]
A $1200\ \text{kg}$ car travelling at $15\ \text{m s}^{-1}$ hits a wall and stops.

1. Change in momentum (size): $1200 \times 15 = 18\,000\ \text{N s}$, whatever the car is made of.
2. A rigid car stopping in $0.020\ \text{s}$: $F = 18\,000/0.020 = 9.0 \times 10^{5}\ \text{N}$.
3. A car whose front crumples, stopping in $0.090\ \text{s}$: $F = 18\,000/0.090 = 2.0 \times 10^{5}\ \text{N}$, less than a quarter of the force.
:::

The same idea explains seat belts and airbags (they stretch or deflate, lengthening the stopping time for the occupant), catching a ball with "soft hands", bending your knees when you land from a jump, and the padding in helmets.

## Force-time graphs

When the force varies, impulse is the **area under the force-time graph**. A kick, a bat stroke or a collision usually gives a curve that rises to a peak and falls again.

![Force-time graph for the kicked ball: the force rises steadily to 600 N and falls to zero over 12 ms, a triangle whose area, ½ × 600 × 0.012 = 3.6 N s, is the impulse and the ball's change in momentum.](media:diagrams/kicked-ball-force-time-graph.png "Figure: impulse is the area under a force-time graph (kicked ball)")

:::example{title="A kicked ball"}
A $0.15\ \text{kg}$ ball at rest is kicked. The force rises steadily to $600\ \text{N}$ and falls steadily to zero, the whole contact lasting $0.012\ \text{s}$: a triangular graph. Impulse $= \tfrac{1}{2} \times 600 \times 0.012 = 3.6\ \text{N s}$, so the ball leaves at $v = 3.6/0.15 = 24\ \text{m s}^{-1}$.
:::

## Rockets and jets of fluid

A rocket pushes exhaust gas backwards; by Newton's third law the gas pushes the rocket forwards. The thrust equals the rate at which momentum is given to the gas: thrust $=$ (mass of gas expelled per second) $\times$ (speed of the gas relative to the rocket).

A jet of water hitting a wall works the same way. If the water arrives at speed $v$ at a mass flow rate $\dfrac{\Delta m}{\Delta t}$ and stops (does not bounce back), the force on the wall is

$$
F = \frac{\Delta m}{\Delta t}\,v
$$

A borehole pump delivering $0.80\ \text{kg s}^{-1}$ of water at $12\ \text{m s}^{-1}$ against a tank wall exerts $0.80 \times 12 = 9.6\ \text{N}$. If the water splashed straight back, the momentum change and the force would be larger.

## Common mistakes

:::mistake{title="Ignoring direction in a rebound"}
Momentum is a vector. A ball bouncing back has a change in momentum of $m(v + u)$ in size, not $m(v - u)$.
:::

:::mistake{title="Confusing impulse with force"}
Impulse is force $\times$ time (N s), the change in momentum. Safety features do not reduce the impulse; they spread it over a longer time so the force is smaller.
:::

:::mistake{title="Unit errors"}
$\text{kg m s}^{-1}$ and N s are the same unit. Contact times are often in milliseconds: convert before dividing.
:::

## Exam tips

:::exam-tip{title="Define and show that"}
"Define linear momentum" needs "mass × velocity" (not speed). "State Newton's second law" for Cambridge: "the resultant force is proportional to (equal to) the rate of change of momentum". "Show that $F = ma$" needs $F = \Delta(mv)/\Delta t$ and the step "for constant mass".
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 tests momentum changes and force-time graphs; Paper 2 combines them with collisions. ZIMSEC Papers 1 and 2 test the same ideas, often in road-safety and sports contexts.
:::

## Summary

:::summary
- Momentum $p = mv$ is a vector, in $\text{kg m s}^{-1}$ or N s.
- Resultant force $=$ rate of change of momentum; for constant mass this gives $F = ma$.
- Impulse $F\Delta t$ $=$ change in momentum $=$ area under a force-time graph.
- A longer stopping time means a smaller force for the same change of momentum (crumple zones, airbags, catching).
- Jets and rockets: force $=$ mass flow rate $\times$ change in velocity.
:::
