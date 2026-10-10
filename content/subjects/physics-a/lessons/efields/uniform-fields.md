---
{
  "key": "efields.uniform-fields",
  "title": "Electric fields and uniform fields between plates",
  "summary": "Describe an electric field as a field of force, define electric field strength as force per unit positive charge, use F = qE and E = V/d, describe field-line patterns, and analyse charged particles accelerated along or deflected across a uniform field.",
  "concepts": ["aphys.efields.uniform-fields"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Rub a plastic ruler on your sleeve and it picks up scraps of paper; on a dry Bulawayo day a car door can give you a small shock. Both are signs of electric charge and the force it exerts on other charges at a distance. As with gravity, we describe this action at a distance with a **field**. Electric fields are far stronger than gravitational ones and can push as well as pull, which is why they can steer an electron beam in an oscilloscope, accelerate particles in an X-ray tube, or place each drop of ink from an ink-jet printer.

This lesson concentrates on the simplest field of all, the uniform field between two parallel charged plates, and on how charged particles move in it. Point charges and Coulomb's law follow in the next lesson.

You should already know that like charges repel and unlike charges attract, that charge is measured in coulombs, potential difference $V = W/Q$, and the equations of uniformly accelerated motion and of projectiles.

## Key definitions

:::definition{term="Electric field"}
A region of space in which a charge experiences a force because of its charge.
:::

:::definition{term="Electric field strength"}
The force per unit positive charge acting on a small stationary test charge placed at that point. It is a vector in the direction of the force on a positive charge.
:::

:::formula{name="Force on a charge in a field"}
$$
E = \frac{F}{q} \qquad F = qE
$$

$E$ electric field strength in $\text{N C}^{-1}$; $F$ force in N on a charge $q$ in C. A negative charge feels a force opposite to the field direction.
:::

:::formula{name="Uniform field between parallel plates"}
$$
E = \frac{V}{d}
$$

$V$ potential difference between the plates in V; $d$ separation of the plates in m. This gives $E$ in $\text{V m}^{-1}$, which is the same unit as $\text{N C}^{-1}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 5 (electric fields) and Cambridge A Level (topic 18, Paper 4). Both require field-line patterns, $F = qE$, $E = V/d$ and the motion of charged particles in a uniform field.
:::

## Field lines

Field lines show the direction of the force on a small **positive** test charge; their spacing shows the field strength.

- **Isolated positive point charge:** straight radial lines pointing outwards. **Negative point charge:** radial lines pointing inwards.
- **Two equal positive charges:** lines leave both and curve away from each other; midway between them there is a **neutral point** where the field is zero.
- **A positive and a negative charge:** lines leave the positive charge and curve round to end on the negative charge, most densely along the line joining them.
- **Parallel plates:** straight, parallel, equally spaced lines from the positive plate to the negative plate, at right angles to the plates. Near the edges the lines bulge outwards (edge effects), but between the plates, away from the edges, the field is **uniform**.

Field lines never cross, start on positive charges and end on negative charges, and meet a conducting surface at right angles.

## Why E = V/d

Move a charge $q$ from the negative plate to the positive plate against the field. The force on it is $qE$ (constant, because the field is uniform) and it moves a distance $d$, so the work done is $W = qEd$. By definition of potential difference, $W = qV$. So $qV = qEd$, giving $E = V/d$. Doubling the voltage or halving the gap doubles the field strength.

## Charged particles in a uniform field

### Moving along the field: acceleration

A charge released in a uniform field feels a constant force $qE$, so it has a constant acceleration $a = qE/m$ along the field lines (positive charges towards the negative plate, electrons towards the positive plate). Gravity is negligible for electrons, protons and ions: for an electron in a field of $1.5 \times 10^{4}\ \text{V m}^{-1}$ the electric force is about $10^{14}$ times its weight.

The energy gained in crossing a potential difference $V$ is

$$
\tfrac{1}{2}mv^2 = qV
$$

for a charge starting from rest. This is the principle of the **electron gun**: electrons released from a hot cathode are accelerated through a few thousand volts towards a positive anode with a hole in it, and emerge as a narrow, fast beam.

### Moving across the field: parabolic paths

A charged particle entering the field at right angles to the field lines behaves like a ball thrown horizontally:

- **along the plates** there is no force, so the velocity component $v_x$ stays constant;
- **across the plates** there is a constant force $qE$, so a constant acceleration $a = qE/m$ towards one plate.

The path between the plates is therefore a **parabola**. After time $t = L/v_x$ inside plates of length $L$, the sideways displacement is $y = \tfrac{1}{2}at^2$ and the sideways velocity is $v_y = at$. Once the particle leaves the plates it travels in a straight line.

**Ink-jet printers** use the same idea: drops of ink are given a small charge and pass between deflecting plates, and the voltage on the plates sets how far each drop is deflected and so where it lands on the paper.

## Worked examples

:::worked-solution[Force and acceleration of an electron]
Two parallel plates $4.0\ \text{cm}$ apart are connected to a $600\ \text{V}$ supply. Find the field strength, the force on an electron between the plates and its acceleration ($e = 1.60 \times 10^{-19}\ \text{C}$, $m_e = 9.11 \times 10^{-31}\ \text{kg}$).

1. $E = \dfrac{V}{d} = \dfrac{600}{0.040} = 1.5 \times 10^{4}\ \text{V m}^{-1}$ (convert cm to m).
2. $F = eE = 1.60 \times 10^{-19} \times 1.5 \times 10^{4} = 2.40 \times 10^{-15}\ \text{N}$, towards the positive plate.
3. $a = \dfrac{F}{m_e} = \dfrac{2.40 \times 10^{-15}}{9.11 \times 10^{-31}} = 2.63 \times 10^{15}\ \text{m s}^{-2}$.
:::

:::worked-solution[Speed from an electron gun]
Electrons start from rest and are accelerated through $2000\ \text{V}$. Find their speed.

1. Energy gained: $eV = 1.60 \times 10^{-19} \times 2000 = 3.20 \times 10^{-16}\ \text{J}$.
2. $\tfrac{1}{2}m_ev^2 = eV$, so $v = \sqrt{\dfrac{2eV}{m_e}} = \sqrt{\dfrac{2 \times 3.20 \times 10^{-16}}{9.11 \times 10^{-31}}}$.
3. $v = 2.65 \times 10^{7}\ \text{m s}^{-1}$ (about 9% of the speed of light, so the non-relativistic formula is still a fair approximation).
:::

:::worked-solution[Deflection between plates]
The electrons from the previous example enter, at right angles to the field, the region between the plates of the first example. The plates are $5.0\ \text{cm}$ long. Find the sideways deflection as they leave.

1. Time between the plates: $t = \dfrac{L}{v_x} = \dfrac{0.050}{2.65 \times 10^{7}} = 1.89 \times 10^{-9}\ \text{s}$.
2. Sideways acceleration (from the first example): $a = 2.63 \times 10^{15}\ \text{m s}^{-2}$.
3. $y = \tfrac{1}{2}at^2 = \tfrac{1}{2} \times 2.63 \times 10^{15} \times (1.89 \times 10^{-9})^2 = 4.69 \times 10^{-3}\ \text{m}$, about $4.7\ \text{mm}$ towards the positive plate.
4. Sideways speed on leaving: $v_y = at = 4.97 \times 10^{6}\ \text{m s}^{-1}$, so the beam leaves at about $10.6^\circ$ to its original direction.
:::

## Common mistakes

:::mistake{title="Field direction for electrons"}
Field lines show the force on a **positive** charge. Electrons accelerate against the field lines, towards the positive plate.
:::

:::mistake{title="Using cm in E = V/d"}
Convert the plate separation to metres; $600\ \text{V}$ across $4.0\ \text{cm}$ is $1.5 \times 10^{4}\ \text{V m}^{-1}$, not $150$.
:::

:::mistake{title="Speed changing along the plates"}
Across the field, only the velocity component parallel to the field changes. The component along the plates is constant, exactly as for a horizontal projectile.
:::

:::mistake{title="Field strength depends on position"}
Between large parallel plates (away from the edges) $E$ is the same everywhere, so the force on a charge does not depend on how close it is to either plate.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5) and Cambridge Paper 4. Multiple-choice items test field lines, units and ratios; structured questions follow a particle through an accelerating gap and a pair of deflecting plates.
:::

:::exam-tip{title="Command words"}
*Define* electric field strength: "force per unit positive charge". *Describe* (sketch in words) the field between plates: parallel, equally spaced lines from + to −, perpendicular to the plates, with curved edges. *Show that* $E = V/d$: work $qEd$ equals $qV$. *Explain* the parabolic path: constant velocity along the plates, constant acceleration across them. *Calculate*: give the direction of any force.
:::

## Summary

:::summary
- Electric field strength is force per unit positive charge: $E = F/q$, in $\text{N C}^{-1}$ or $\text{V m}^{-1}$.
- Between parallel plates the field is uniform, $E = V/d$, with parallel equally spaced field lines.
- Along the field a charge accelerates uniformly, $a = qE/m$, and gains energy $qV$.
- Across the field a charge follows a parabola: constant $v_x$, constant acceleration perpendicular to the plates.
- Gravity is negligible for electrons and ions in typical laboratory fields.
:::
