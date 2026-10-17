---
{
  "key": "dynamics.drag-terminal-velocity",
  "title": "Friction, drag and terminal velocity",
  "summary": "Describe frictional and viscous (drag) forces, use a simple model in which drag increases with speed, and explain the motion of a falling object reaching terminal velocity, including its velocity-time graph, parachutes and vehicles at top speed.",
  "concepts": ["aphys.dynamics.drag-terminal-velocity"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Raindrops falling from a storm cloud about 2 km above Harare would hit the ground at nearly $200\ \text{m s}^{-1}$ if nothing slowed them. In fact they land at only a few metres per second, gently enough to water the maize rather than flatten it. The reason is **air resistance**, a force that grows as the speed grows until it balances the drop's weight. The same physics sets the top speed of a kombi on the highway and makes a parachute work.

This lesson describes resistive forces, explains how and why falling objects reach a terminal velocity, and connects the motion to its graphs. You need Newton's laws, weight $W = mg$ and velocity-time graphs.

## Key definitions

:::definition{term="Frictional force"}
A force that opposes the relative motion (or attempted motion) of two surfaces in contact, acting along the surfaces.
:::

:::definition{term="Drag (viscous force)"}
A resistive force on an object moving through a fluid (a liquid or a gas), acting opposite to the object's velocity relative to the fluid. Air resistance is drag in air.
:::

:::definition{term="Terminal velocity"}
The constant (maximum) velocity reached by an object moving through a fluid when the drag force, together with any other resistive forces and upthrust, balances the driving force (for a falling object, its weight), so that the resultant force and the acceleration are zero.
:::

:::formula{name="Resultant force on a falling object"}
$$
ma = mg - D \qquad \text{at terminal velocity: } D = mg
$$

$m$ = mass (kg), $g$ = $9.81\ \text{m s}^{-2}$, $D$ = drag force (N), which increases with speed. (Upthrust from the air is usually negligible.)
:::

:::keyfact{title="A simple model of drag"}
Drag increases with speed. At low speeds in a viscous fluid it is roughly proportional to $v$; for most everyday objects moving fast through air it is roughly proportional to $v^2$. It also increases with the cross-sectional area and depends on the shape and the density of the fluid.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards treat friction and drag qualitatively, with a simple model of drag increasing with speed. Coefficients of friction and Stokes' law are not required.
:::

## Friction and drag compared

| | Friction (solid surfaces) | Drag (fluid) |
| --- | --- | --- |
| Acts | along the surfaces, opposing relative motion | opposite to the velocity through the fluid |
| Depends on speed? | roughly independent of speed | increases with speed |
| Energy | transfers kinetic energy to internal energy (heating) | transfers kinetic energy to the internal energy of the fluid and object |
| Useful when | walking, braking, gripping | parachutes, slowing landing aircraft |

Both are dissipative: they transfer kinetic energy to internal energy, which is why a kombi's brakes get hot and why a meteor glows.

## Falling with air resistance

Consider a skydiver who steps out of an aircraft.

1. **At the start** the speed is zero, so the drag is zero. The only force is the weight, and the acceleration is $g = 9.81\ \text{m s}^{-2}$.
2. **As the speed increases**, the drag increases. The resultant force $mg - D$ decreases, so the acceleration decreases.
3. **Eventually** the drag equals the weight. The resultant force is zero, the acceleration is zero and the skydiver falls at constant **terminal velocity**.

:::worked-solution[A skydiver's terminal velocity]
An $80\ \text{kg}$ skydiver experiences a drag force $D = kv^2$ with $k = 0.25\ \text{kg m}^{-1}$.

1. At terminal velocity $D = mg$: $kv_t^2 = mg$.
2. $v_t = \sqrt{\dfrac{mg}{k}} = \sqrt{\dfrac{80 \times 9.81}{0.25}} = 56.0\ \text{m s}^{-1}$.
3. At $30\ \text{m s}^{-1}$ on the way down: $D = 0.25 \times 30^2 = 225\ \text{N}$, so $a = \dfrac{mg - D}{m} = 9.81 - \dfrac{225}{80} = 7.00\ \text{m s}^{-2}$.
:::

The table shows the same model worked out step by step (a computer model, not measurements):

| $t\,/\,\text{s}$ | 0 | 2 | 4 | 6 | 8 | 10 | 14 | 20 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $v\,/\,\text{m s}^{-1}$ | 0.0 | 18.9 | 33.9 | 43.8 | 49.6 | 52.8 | 55.2 | 55.9 |
| $a\,/\,\text{m s}^{-2}$ | 9.81 | 8.70 | 6.22 | 3.81 | 2.12 | 1.11 | 0.29 | 0.04 |

The velocity-time graph starts with gradient $g$, curves over as the gradient (acceleration) falls, and levels off towards a horizontal line at the terminal velocity. The area under it is the distance fallen.

![Velocity-time graph for an 80 kg skydiver with drag 0.25v²: it starts with gradient 9.81 m/s², curves over as drag grows and levels off at the terminal velocity 56.0 m/s (18.9 m/s at 2 s, 49.6 m/s at 8 s) where drag equals weight.](media:diagrams/terminal-velocity-graph.png "Figure: velocity-time graph of a skydiver reaching terminal velocity")


## Opening a parachute

When the parachute opens at terminal velocity, the cross-sectional area increases enormously, so the drag at that speed becomes much larger than the weight. The resultant force is now **upwards**: the skydiver decelerates. As the speed falls, the drag falls, until it again equals the weight at a new, much lower terminal velocity (about $5\ \text{m s}^{-1}$ for a typical parachute). On the velocity-time graph this appears as a steep drop that curves into a new, lower horizontal line. The skydiver keeps moving **downwards** throughout; only the acceleration changes direction.

## Vehicles at top speed

A vehicle on a level road reaches its top speed when the maximum driving force equals the total resistive force (air resistance plus rolling friction). Because air resistance rises roughly with $v^2$, a small increase in top speed needs a large increase in driving force. A car whose air resistance is $0.80v^2$ (in N, with $v$ in $\text{m s}^{-1}$) and maximum driving force $2400\ \text{N}$ has a top speed of $\sqrt{2400/0.80} = 54.8\ \text{m s}^{-1}$, and at that speed the engine must supply $2400 \times 54.8 \approx 1.3 \times 10^{5}\ \text{W}$ to the wheels. Roof racks and open windows increase the drag and lower the top speed.

## Common mistakes

:::mistake{title="Saying the object stops accelerating because gravity stops"}
The weight is constant. The acceleration falls to zero because the drag rises until it balances the weight.
:::

:::mistake{title="Saying the skydiver moves upwards when the parachute opens"}
The resultant force and acceleration are upwards for a moment, but the velocity is still downwards: the skydiver slows down while still falling.
:::

:::mistake{title="Drawing a straight-line velocity-time graph"}
With air resistance the acceleration changes, so the $v$-$t$ graph is a curve whose gradient decreases to zero. The suvat equations do not apply.
:::

## Exam tips

:::exam-tip{title="Explain terminal velocity"}
A full answer moves step by step: at first only weight acts, so $a = g$; as speed increases drag increases; resultant force decreases so acceleration decreases; when drag $=$ weight, resultant force is zero, acceleration zero, constant (terminal) velocity. Name the forces and use "resultant".
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 tests graph shapes and force descriptions; Paper 2 asks for explanations and sketches of $v$-$t$ graphs (describe the shape in words if asked). ZIMSEC Papers 1 and 2 test the same, often with parachutes.
:::

## Summary

:::summary
- Friction opposes the relative motion of surfaces; drag opposes motion through a fluid and increases with speed.
- A falling object starts with $a = g$; drag rises with speed, so the resultant force and acceleration decrease.
- At terminal velocity drag $=$ weight, the resultant force is zero and the velocity is constant.
- Opening a parachute increases drag, giving an upward resultant and deceleration to a lower terminal velocity.
- A vehicle's top speed is reached when the driving force equals the total resistive force.
:::
