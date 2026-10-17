---
{
  "key": "magnetism.force-on-charge",
  "title": "Force on moving charges in magnetic fields",
  "summary": "Use F = BQv sin θ and the left-hand rule for moving charges, explain and calculate the circular path of a charged particle in a uniform magnetic field (r = mv/BQ), describe beam deflection, and use crossed fields as a velocity selector in a mass spectrometer.",
  "concepts": ["aphys.magnetism.force-on-charge"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Charged particles from the Sun stream towards the Earth all the time. The Earth's magnetic field bends most of them away, and those that spiral in near the poles light up the sky as aurorae. In the laboratory the same force steers the electron beam in old television tubes, bends particle beams in accelerators and separates isotopes in a **mass spectrometer**, the instrument used, among other things, to measure the carbon-isotope ratios in radiocarbon dating and to identify pollutants in water samples from rivers and boreholes.

In the previous lesson a current in a wire felt a force $BIL$ in a magnetic field. A current is just moving charge, so each moving charge must feel a force too. This lesson finds that force and follows its consequences: circles, velocity selectors and mass spectrometers.

You should already know $F = BIL\sin\theta$, Fleming's left-hand rule, circular motion ($F = mv^2/r$) and the force on a charge in an electric field, $F = qE$.

## Key definitions

:::definition{term="Velocity selector"}
An arrangement of uniform electric and magnetic fields at right angles to each other and to a beam of charged particles, through which only particles of one speed pass undeflected.
:::

:::definition{term="Mass spectrometer"}
An instrument that separates ions of equal charge and speed according to their mass, using the radius of their circular paths in a uniform magnetic field.
:::

:::formula{name="Force on a moving charge"}
$$
F = BQv\sin\theta
$$

$F$ force in N; $B$ flux density in T; $Q$ charge in C; $v$ speed in m s⁻¹; $\theta$ angle between the velocity and the field. A charge at rest, or moving parallel to the field, feels no magnetic force.
:::

:::formula{name="Radius of the circular path"}
$$
r = \frac{mv}{BQ}
$$

For a particle of mass $m$ (kg) moving at right angles to a uniform field: $r$ in m. The radius is proportional to the momentum $mv$.
:::

:::formula{name="Velocity selector"}
$$
v = \frac{E}{B}
$$

In crossed electric and magnetic fields, only particles with this speed pass through undeflected, whatever their charge or mass. $E$ in V m⁻¹, $B$ in T.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level (topic 20, Paper 4). Both use $F = BQv\sin\theta$, circular paths and velocity selection. The Hall effect (Cambridge only) and $e/m$ experiments are separate lessons.
:::

## From BIL to BQv

Consider a wire of length $L$ in which charge carriers, each of charge $Q$, drift at speed $v$. A carrier takes time $t = L/v$ to travel the length $L$. If $N$ carriers are in this length, the current is $I = NQ/t = NQv/L$. The force on the wire is

$$
F_{\text{wire}} = BIL = B\left(\frac{NQv}{L}\right)L = N(BQv)
$$

so each carrier feels a force $BQv$ (at right angles to the field). With the velocity at angle $\theta$ to the field, only the perpendicular component $v\sin\theta$ counts.

**Direction.** Use Fleming's left-hand rule with the second finger along the **conventional current**: along $v$ for a positive charge, **opposite** to $v$ for an electron.

## Circular motion in a uniform field

The magnetic force is always **perpendicular to the velocity**. Two consequences follow:

![An electron moving at 3.0 × 10⁷ m/s at right angles to a 2.0 mT field into the page: the magnetic force BQv is always perpendicular to the velocity, towards the centre, so the electron moves in a circle of radius mv/(BQ) = 8.5 cm at constant speed.](media:diagrams/charge-circular-path-b-field.png "Figure: a charged particle moves in a circle in a uniform magnetic field")

1. **No work is done** on the particle, so its speed and kinetic energy stay constant. A magnetic field can change a particle's direction but never its speed.
2. A force of constant size always at right angles to the velocity produces **uniform circular motion**.

Setting the magnetic force equal to the centripetal force:

$$
BQv = \frac{mv^2}{r} \quad\Rightarrow\quad r = \frac{mv}{BQ}
$$

- Faster or heavier particles move in **larger** circles; stronger fields or larger charges give **tighter** circles.
- The time for one orbit is $T = 2\pi r/v = 2\pi m/(BQ)$, which does **not** depend on the speed. (This is the principle of the cyclotron.)
- If the velocity has a component along the field, that component is unaffected, and the path becomes a **helix**.
- Particles of opposite sign curve in opposite directions, so a cloud-chamber or bubble-chamber photograph tells you the sign of a particle's charge from which way its track curls.

## Deflection of a beam

A beam of electrons crossing a region of uniform magnetic field follows an arc of a circle while in the field and a straight line after leaving it. Compare an electric field across the beam, which gives a **parabola**: the electric force has a fixed direction, while the magnetic force turns with the velocity.

## Velocity selection

Charged particles pass between two parallel plates (electric field $E$) placed in a magnetic field $B$ perpendicular both to $E$ and to the beam. The fields are arranged so that the electric and magnetic forces are opposite.

- For a particle to go straight through, the forces must balance: $QE = BQv$, so $v = E/B$.
- $Q$ cancels, so the selected speed is the same for all particles.
- Faster particles have $BQv > QE$ and are deflected one way; slower particles the other way. A slit at the exit lets through only particles with $v = E/B$.

## The mass spectrometer

1. Atoms are ionised (usually singly, charge $+e$) and accelerated.
2. A **velocity selector** passes only ions of one speed $v$.
3. The ions enter a region of uniform field $B_2$ alone, perpendicular to their velocity, and move in semicircles of radius $r = mv/(B_2Q)$.
4. Since $v$, $B_2$ and $Q$ are the same for all ions, $r \propto m$: heavier isotopes land further away on a detector after half a circle.

![Mass spectrometer: neon ions at 4.0 × 10⁵ m/s enter a 0.50 T field and move in semicircles with r = mv/(BQ) proportional to mass; neon-20 has r = 0.166 m and neon-22 r = 0.183 m, so they land 3.3 cm apart.](media:diagrams/mass-spectrometer-semicircles.png "Figure: heavier isotopes follow larger semicircles in a mass spectrometer")

## Worked examples

:::worked-solution[Force on a proton]
A proton moves at $2.0 \times 10^{6}\ \text{m s}^{-1}$ at right angles to a field of $0.40\ \text{T}$. Find the force on it and its acceleration.

1. $F = BQv = 0.40 \times 1.60 \times 10^{-19} \times 2.0 \times 10^{6} = 1.28 \times 10^{-13}\ \text{N}$.
2. $a = F/m_p = 1.28 \times 10^{-13}/(1.67 \times 10^{-27}) = 7.66 \times 10^{13}\ \text{m s}^{-2}$, towards the centre of its circular path.
:::

:::worked-solution[Radius of an electron's path]
Electrons moving at $3.0 \times 10^{7}\ \text{m s}^{-1}$ enter a uniform field of $2.0\ \text{mT}$ at right angles. Find the radius of their path.

1. $r = \dfrac{m_ev}{eB} = \dfrac{9.11 \times 10^{-31} \times 3.0 \times 10^{7}}{1.60 \times 10^{-19} \times 2.0 \times 10^{-3}}$.
2. $r = 0.0854\ \text{m}$, about $8.5\ \text{cm}$.
3. Convert mT to T first: using $2.0$ instead of $2.0 \times 10^{-3}$ makes $r$ a thousand times too small.
:::

:::worked-solution[Velocity selector and spectrometer]
Ions of neon (mass $20\ \text{u}$ and $22\ \text{u}$, charge $+e$) pass through a selector with $E = 2.4 \times 10^{4}\ \text{V m}^{-1}$ and $B = 0.060\ \text{T}$, then enter a field of $0.50\ \text{T}$. Find the selected speed and the separation of the two isotopes on the detector after a semicircle.

1. $v = E/B = 2.4 \times 10^{4}/0.060 = 4.0 \times 10^{5}\ \text{m s}^{-1}$.
2. $r_{20} = \dfrac{20 \times 1.66 \times 10^{-27} \times 4.0 \times 10^{5}}{1.60 \times 10^{-19} \times 0.50} = 0.166\ \text{m}$; similarly $r_{22} = 0.183\ \text{m}$.
3. Separation $= 2(r_{22} - r_{20}) = 0.0332\ \text{m}$, about $3.3\ \text{cm}$ (the ions land a diameter from the entrance slit).
:::

## Common mistakes

:::mistake{title="Electron direction"}
For an electron, point the "current" finger **opposite** to its velocity. Forgetting this gives a force in exactly the wrong direction.
:::

:::mistake{title="Magnetic fields speed particles up"}
The magnetic force is perpendicular to the velocity, so it does no work. Speed and kinetic energy stay constant; only the direction changes.
:::

:::mistake{title="Parabola in a magnetic field"}
A parabola needs a force of fixed direction (an electric field). A uniform magnetic field gives a circular arc.
:::

:::mistake{title="Radius and speed"}
$r = mv/(BQ)$: radius is proportional to speed (momentum), not inversely proportional. Doubling the speed doubles the radius.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 6) and Cambridge Paper 4. Typical questions: direction of deflection, derivation of $r = mv/(BQ)$, a velocity selector and a mass spectrometer, comparing electric and magnetic deflection.
:::

:::exam-tip{title="Command words"}
*Explain* why the path is circular: force perpendicular to velocity, constant size, so it provides the centripetal force and no work is done. *Show that* $r = mv/(BQ)$: equate $BQv$ to $mv^2/r$. *Explain* why the selector speed is independent of charge: $Q$ appears in both forces and cancels. *State* directions in words, naming the rule.
:::

## Summary

:::summary
- A charge moving in a magnetic field feels $F = BQv\sin\theta$, perpendicular to both $v$ and $B$; zero if at rest or moving along the field.
- The force does no work: speed is constant and the path in a uniform perpendicular field is a circle, $r = mv/(BQ)$.
- The orbit time $2\pi m/(BQ)$ does not depend on speed; a velocity component along $B$ gives a helix.
- Crossed fields select one speed, $v = E/B$, for all charges and masses.
- In a mass spectrometer ions of equal speed and charge move on radii proportional to their mass.
:::
