---
{
  "key": "magnetism.field-patterns",
  "title": "Magnetic fields and the fields of currents",
  "summary": "Describe a magnetic field as a field of force produced by moving charges or permanent magnets, describe the field patterns of a straight wire, a flat coil and a solenoid with their direction rules, explain the effect of an iron core, and explain the forces between parallel current-carrying conductors.",
  "concepts": ["aphys.magnetism.field-patterns"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Every electric motor in a maize mill, every relay in a ZESA substation and every scrap-yard crane lifting old kombi bodies depends on one discovery: an electric current produces a magnetic field. In 1820 Hans Christian Ørsted noticed a compass needle swing when a nearby wire carried a current.

This lesson describes magnetic fields and their patterns, especially the fields made by currents in a long straight wire, a flat circular coil and a long solenoid. It ends by explaining why parallel currents attract, which leads into the force on a conductor in the next lesson.

You should already know the field patterns of bar magnets from O Level, that like poles repel and unlike poles attract, and the idea of a field of force from your work on gravitational and electric fields.

## Key definitions

:::definition{term="Magnetic field"}
A region of space in which a moving charge, a current-carrying conductor or a magnetic pole experiences a force.
:::

:::definition{term="Magnetic field line"}
A line whose direction at every point is the direction in which the north pole of a small compass would point there; the closer the lines, the stronger the field.
:::

:::definition{term="Solenoid"}
A long coil of wire with many turns, usually wound on a cylinder, whose length is much greater than its diameter.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 (electromagnetism) and Cambridge A Level (topic 20, Paper 4). Cambridge needs the patterns and the forces between conductors but not formulae for $B$ near a wire or inside a solenoid. Whether ZIMSEC needs those formulae is to be confirmed, so they appear below only as an extension.
:::

## What makes a magnetic field

Magnetic fields are produced by **moving charges**. A current in a wire is a flow of charge, so it makes a field. In a permanent magnet the fields come from the spin and orbital motion of electrons in atoms such as iron, which line up in small regions called domains.

Field lines run from north poles to south poles outside a magnet, never cross, and form closed loops (inside a magnet they run from south to north). The **magnetic flux density** $B$, measured in tesla (T), is the strength of the field; it is defined properly in the next lesson. For scale: the Earth's field at the surface is a few times $10^{-5}\ \text{T}$, a fridge magnet about $10^{-2}\ \text{T}$, and a hospital MRI magnet 1.5 T or more.

## Field patterns of currents

### Long straight wire

- The field lines are **concentric circles** centred on the wire, in planes at right angles to it.
- The circles get further apart with distance: the field weakens as you move away.
- **Direction: right-hand grip rule.** Grip the wire with the right hand, thumb along the conventional current; the fingers curl in the direction of the field.

A useful notation on flat drawings: a dot (⊙) for a current coming out of the page, a cross (⊗) for a current going into it. For a current into the page the field circles are clockwise when viewed from the front.

### Flat circular coil

- Near each side of the coil the lines are circles round the wire, as for a straight wire.
- At the centre the contributions from all parts of the loop point the same way, so the field is strong and the lines are **straight and along the axis**.
- One face acts as a north pole and the other as a south pole: looking at a face, an anticlockwise current makes it a north pole, a clockwise current a south pole.

### Long solenoid

- **Inside**: the lines are straight, parallel and equally spaced: the field is **uniform** along most of the length.
- **Outside**: the pattern is like that of a bar magnet, with lines spreading from one end and returning to the other; the field outside is much weaker than inside.
- The field at each end is about half the field in the middle.
- **Direction: right-hand grip rule for coils.** Curl the fingers of the right hand in the direction of the current in the turns; the thumb points along the field inside, towards the north-pole end.

### Strengthening the field: a ferrous core

Placing a core of **soft iron** (a ferrous material) inside a solenoid multiplies the flux density many times. The core becomes magnetised and its domains line up with the solenoid's field, adding their fields. Soft iron is used because it magnetises strongly and loses its magnetism as soon as the current is switched off, which is what an **electromagnet** needs. Steel keeps its magnetism and is used for permanent magnets.

Electromagnets are used in relays (a small current switches a large one), circuit breakers, electric bells, lifting magnets in scrap yards, loudspeakers and MRI scanners.

## Forces between two current-carrying conductors

Two long parallel wires carry currents. Each wire sits in the magnetic field of the other, so each feels a force.

- **Currents in the same direction: the wires attract.**
- **Currents in opposite directions: the wires repel.**

To show this for parallel currents, take both currents out of the page with wire X on the left and wire Y on the right. By the right-hand grip rule, X's field circles anticlockwise, so at Y it points **up the page**. Y carries current out of the page in an upward field; Fleming's left-hand rule (next lesson) gives a force on Y **towards X**. By the same argument the force on X is towards Y. The two forces are equal in size and opposite in direction, a Newton's third law pair, **even if the currents are different**.

This is why the busbars in a large switchboard are clamped firmly: during a short circuit the forces between them become very large.

## Graph: field near a long wire (extension)

A Hall probe is moved away from a long straight wire carrying $12\ \text{A}$:

| $r\,/\,\text{cm}$ | $B\,/\,\mu\text{T}$ |
| --- | --- |
| 1 | 240 |
| 2 | 120 |
| 4 | 60.0 |
| 8 | 30.0 |

Each doubling of distance halves $B$: $B \propto 1/r$. A graph of $B$ against $1/r$ is a straight line through the origin. The standard results, for reference only, are $B = \mu_0 I/(2\pi r)$ for a long wire and $B = \mu_0 nI$ inside a long solenoid with $n$ turns per unit length, where $\mu_0 = 4\pi \times 10^{-7}\ \text{H m}^{-1}$.

## Worked examples

:::worked-solution[Direction of a field round a wire]
A vertical wire carries a current upwards. A compass is placed due east of the wire. Which way does the compass needle point, ignoring the Earth's field?

1. Right hand: thumb pointing up (along the current).
2. Viewed from above, the fingers curl anticlockwise.
3. At a point due east of the wire, anticlockwise motion is towards the north. The needle's north pole points **north**.
:::

:::worked-solution[Field inside a solenoid (extension)]
A solenoid has $2000$ turns per metre and carries $0.50\ \text{A}$. Find the flux density inside it.

1. $B = \mu_0 nI$.
2. $B = 4\pi \times 10^{-7} \times 2000 \times 0.50$.
3. $B = 1.26 \times 10^{-3}\ \text{T}$. With a soft-iron core it would be many times larger.
:::

:::worked-solution[Force between parallel wires]
Two long parallel wires $4.0\ \text{cm}$ apart carry currents of $5.0\ \text{A}$ and $8.0\ \text{A}$ in the same direction. Find the force on a $0.50\ \text{m}$ length of each.

1. Field of the first wire at the second (extension formula): $B = \dfrac{\mu_0 I_1}{2\pi r} = \dfrac{4\pi \times 10^{-7} \times 5.0}{2\pi \times 0.040} = 2.50 \times 10^{-5}\ \text{T}$.
2. Force on the second wire (at right angles to the field): $F = BI_2L = 2.50 \times 10^{-5} \times 8.0 \times 0.50 = 1.00 \times 10^{-4}\ \text{N}$.
3. The currents are in the same direction, so the wires attract; the first wire feels an equal force of $1.00 \times 10^{-4}\ \text{N}$ towards the second.
:::

## Common mistakes

:::mistake{title="Using the left hand for the field"}
The **right-hand** grip rule gives the direction of the field made by a current. Fleming's **left-hand** rule gives the force on a current in a field.
:::

:::mistake{title="The bigger current feels the bigger force"}
The forces on two wires are a Newton's third law pair: equal in size and opposite in direction, whatever the two currents are.
:::

:::mistake{title="Uniform field everywhere near a solenoid"}
Only the field inside, away from the ends, is uniform. Outside it is weak and spreads out like a bar magnet's.
:::

:::mistake{title="Steel for an electromagnet"}
The core must be soft iron, which loses its magnetism when the current stops. Steel stays magnetised.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 6) and Cambridge Paper 4. Expect direction questions in multiple choice and "describe the field pattern" or "explain why the wires attract" in structured questions.
:::

:::exam-tip{title="Command words"}
*Describe* (sketch in words) a field pattern: shape of the lines, their spacing, and direction with the rule used. *Explain* attraction between parallel currents: field of one wire at the other, force by the left-hand rule, third-law pair. *State* the effect of an iron core: field greatly increased, because the core is magnetised.
:::

## Summary

:::summary
- Magnetic fields are produced by moving charges: currents and the electrons in magnetic materials.
- Long wire: concentric circles, weaker further out, direction by the right-hand grip rule.
- Long solenoid: uniform field inside, bar-magnet pattern outside; a soft-iron core greatly strengthens it.
- Parallel currents attract and antiparallel currents repel, with equal and opposite forces on the two wires.
- Electromagnets (relays, cranes, bells, loudspeakers, MRI) use soft-iron cores so they can be switched off.
:::
