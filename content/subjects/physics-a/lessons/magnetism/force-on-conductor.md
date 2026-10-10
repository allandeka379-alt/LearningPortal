---
{
  "key": "magnetism.force-on-conductor",
  "title": "Force on a current-carrying conductor and magnetic flux density",
  "summary": "Use F = BIL sin θ and Fleming's left-hand rule, define magnetic flux density and the tesla, measure B with a current balance, and explain the d.c. motor and the moving-coil meter.",
  "concepts": ["aphys.magnetism.force-on-conductor"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A grinding mill in a rural business centre, the starter motor of a haulage truck and the fan in a laptop all turn for the same reason: a wire carrying a current in a magnetic field feels a force. This "motor effect" converts electrical energy into mechanical work, and it also gives us the way to define how strong a magnetic field is.

In the last lesson you saw that a current makes a magnetic field. Now the current is placed **in** a field made by something else, such as a permanent magnet. You should already know the field patterns of magnets and currents, vectors and their components, and moments and couples.

## Key definitions

:::definition{term="Magnetic flux density"}
The magnetic flux density $B$ at a point is the force per unit current per unit length acting on a long straight conductor placed at right angles to the magnetic field at that point.
:::

:::definition{term="Tesla"}
One tesla is the uniform magnetic flux density which, acting at right angles to a long straight wire carrying a current of 1 A, produces a force of 1 N on each metre of the wire. $1\ \text{T} = 1\ \text{N A}^{-1}\ \text{m}^{-1}$.
:::

:::formula{name="Force on a conductor"}
$$
F = BIL\sin\theta
$$

$F$ force in N; $B$ magnetic flux density in T; $I$ current in A; $L$ length of conductor in the field in m; $\theta$ angle between the conductor (current) and the field. The force is greatest ($F = BIL$) when $\theta = 90^\circ$ and zero when the wire is parallel to the field.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (electromagnetism) and Cambridge A Level (topic 20, Paper 4). Both need $F = BIL\sin\theta$, Fleming's left-hand rule, the definition of $B$ and the tesla, and experiments to measure $B$.
:::

## Direction: Fleming's left-hand rule

Hold the thumb and first two fingers of the **left** hand mutually at right angles:

- **F**irst finger: **F**ield (north to south);
- se**C**ond finger: **C**urrent (conventional, + to −);
- **Th**u**M**b: **M**otion (the force).

The force is always **perpendicular to both** the field and the current. If either the current or the field is reversed, the force reverses; reversing both leaves it unchanged.

The physical origin is the force on each moving charge carrier in the wire (next lesson): the sum of all these tiny forces is the force on the wire.

## Why sin θ?

Only the component of the field **perpendicular to the wire** produces a force. If the field $B$ makes an angle $\theta$ with the wire, resolve $B$ into $B\cos\theta$ along the wire (no force) and $B\sin\theta$ across it. The force is therefore $F = (B\sin\theta)IL$.

## Measuring B: the current balance

A simple **current balance** measures the force directly.

1. A U-shaped wire frame, or a straight wire, is fixed to an insulating block standing on a top-pan balance; or a permanent magnet stands on the balance and a rigid straight wire is clamped through its field without touching it.
2. With no current, the balance is zeroed.
3. A current $I$ is passed through the horizontal wire of length $L$ lying at right angles to the field. The force on the wire has an equal and opposite reaction on the magnet (Newton's third law), so the balance reading changes by $\Delta m$.
4. The force is $F = \Delta m\,g$, so $B = \dfrac{\Delta m\,g}{IL}$.

Readings are repeated for several currents, and each with the current reversed (the change in reading reverses), averaging the magnitudes.

### Results and graph

For a wire $5.0\ \text{cm}$ long between the poles of a magnet:

| $I\,/\,\text{A}$ | $\Delta m\,/\,\text{g}$ |
| --- | --- |
| 1.0 | 0.32 |
| 2.0 | 0.60 |
| 3.0 | 0.92 |
| 4.0 | 1.24 |
| 5.0 | 1.52 |

A graph of $\Delta m$ against $I$ is a straight line through the origin, showing $F \propto I$. Its gradient is about $0.304\ \text{g A}^{-1}$, which is $BL/g$. So $B = \dfrac{0.304 \times 10^{-3} \times 9.81}{0.050} = 0.0596\ \text{T}$, about $0.060\ \text{T}$.

## Applications

### The d.c. motor

A rectangular coil of $N$ turns sits between the poles of a magnet and can rotate about an axis.

- The two sides of the coil perpendicular to the field carry current in opposite directions, so by Fleming's left-hand rule they feel equal and **opposite** forces, each $NBIL$.
- These forces form a **couple**, whose torque is force × perpendicular distance between the lines of action. When the plane of the coil is parallel to the field, the torque is $NBIL \times w$, where $w$ is the width of the coil.
- As the coil turns, the perpendicular distance between the forces falls, and the torque is zero when the plane of the coil is perpendicular to the field.
- A **split-ring commutator** reverses the current every half turn, so the torque always acts in the same rotational sense and the motor keeps turning.

Practical motors use many turns, curved pole pieces giving a radial field, and several coils at different angles, giving a smoother, larger torque.

### The moving-coil meter

In an analogue ammeter, a coil on a soft-iron cylinder sits in a **radial** field made by curved pole pieces. Because the field is always in the plane of the coil, the torque $NBILw$ is the same at every angle. Hairsprings provide an opposing torque proportional to the angle turned, so the deflection is **proportional to the current**, and the scale is linear.

## Worked examples

:::worked-solution[Force at an angle]
A straight wire $12\ \text{cm}$ long carries $3.0\ \text{A}$ in a uniform field of $0.25\ \text{T}$. Find the force on it when it is at $90^\circ$ and at $30^\circ$ to the field.

1. At $90^\circ$: $F = BIL = 0.25 \times 3.0 \times 0.12 = 0.090\ \text{N}$.
2. At $30^\circ$: $F = BIL\sin 30^\circ = 0.090 \times 0.50 = 0.045\ \text{N}$.
3. The direction is perpendicular to both the wire and the field (Fleming's left-hand rule).
:::

:::worked-solution[Current balance]
A wire $4.0\ \text{cm}$ long lies at right angles to the field between the poles of a magnet standing on a top-pan balance. With a current of $4.0\ \text{A}$ the reading changes by $0.82\ \text{g}$. Find $B$.

1. $F = \Delta m\,g = 0.82 \times 10^{-3} \times 9.81 = 8.04 \times 10^{-3}\ \text{N}$.
2. $B = \dfrac{F}{IL} = \dfrac{8.04 \times 10^{-3}}{4.0 \times 0.040}$.
3. $B = 0.0503\ \text{T}$.
:::

:::worked-solution[Torque on a motor coil]
A coil of $50$ turns, $4.0\ \text{cm}$ long and $3.0\ \text{cm}$ wide, carries $0.50\ \text{A}$ in a field of $0.20\ \text{T}$. Its plane is parallel to the field and its long sides are perpendicular to the field. Find the torque.

1. Force on each long side: $F = NBIL = 50 \times 0.20 \times 0.50 \times 0.040 = 0.20\ \text{N}$.
2. The two forces are opposite and $0.030\ \text{m}$ apart: a couple.
3. Torque $= 0.20 \times 0.030 = 6.00 \times 10^{-3}\ \text{N m}$.
:::

## Common mistakes

:::mistake{title="Using the right hand"}
Fleming's **left**-hand rule is for motors (force on a current). The right-hand grip rule gives the field of a current; the right-hand rule in induction is for generators.
:::

:::mistake{title="Using cos θ"}
$\theta$ is the angle between the wire and the field: the force is zero when they are parallel, so the factor is $\sin\theta$.
:::

:::mistake{title="Length outside the field"}
$L$ is the length of wire inside the field and at an angle to it. Sides of a frame parallel to the field, or outside it, feel no force.
:::

:::mistake{title="Electron flow for the current"}
The second finger shows **conventional** current. For a beam of electrons, the current points opposite to their motion.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 6) and Cambridge Paper 4 (and Paper 5 planning, where a current balance or a balance-and-magnet method is a common context).
:::

:::exam-tip{title="Command words"}
*Define* $B$ or the tesla: "force per unit current per unit length on a wire at right angles to the field". *State* the direction: name Fleming's left-hand rule and give the direction in words ("into the page"). *Describe* a current-balance experiment: arrangement, $F = \Delta m g$, graph of $F$ against $I$, $B$ from gradient $/L$. *Explain* why a motor needs a commutator, or why a meter needs a radial field.
:::

## Summary

:::summary
- A current-carrying conductor in a magnetic field feels a force $F = BIL\sin\theta$, perpendicular to both the current and the field.
- Fleming's left-hand rule: first finger field, second finger current, thumb motion.
- $B$ is the force per unit current per unit length on a wire at right angles to the field; $1\ \text{T} = 1\ \text{N A}^{-1}\ \text{m}^{-1}$.
- A current balance measures $B$ from $F = \Delta m g = BIL$.
- A coil in a field feels a couple: the basis of the d.c. motor (with a commutator) and the moving-coil meter (with a radial field).
:::
