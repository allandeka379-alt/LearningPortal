---
{
  "key": "induction.lenz-applications",
  "title": "Lenz's law and applications of electromagnetic induction",
  "summary": "State Lenz's law and explain it as a consequence of conservation of energy, find the direction of induced currents with Lenz's law and Fleming's right-hand rule, explain magnets falling through coils and tubes, eddy currents and magnetic braking, the a.c. generator (E₀ = BANω) and back e.m.f. in motors.",
  "concepts": ["aphys.induction.lenz-applications"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Drop a strong magnet down a copper pipe and it drifts down slowly, as if the pipe were full of honey, even though copper is not magnetic. The explanation is the subject of this lesson: induced currents always **oppose** the change that produces them. The same principle brakes heavy trucks and trains without friction, damps the needle of a moving-coil meter, and explains why a motor draws a huge current when it starts but much less once it is running.

Faraday's law gives the **size** of an induced e.m.f.; **Lenz's law** gives its **direction**. This lesson uses both to explain the generator that turns at every power station, from the hydro turbines at Kariba to a small petrol generator during load-shedding.

You should already know Faraday's law, flux linkage, $E = BLv$, Fleming's left-hand rule and the field patterns of coils.

## Key definitions

:::definition{term="Lenz's law"}
The direction of an induced e.m.f. (or current) is such that it tends to oppose the change in magnetic flux linkage that produces it.
:::

:::definition{term="Eddy currents"}
Circulating currents induced in a bulk piece of conductor when the magnetic flux through it changes.
:::

:::definition{term="Back e.m.f."}
The e.m.f. induced in the rotating coil of a motor, which opposes the applied p.d. and grows with the speed of rotation.
:::

:::formula{name="Faraday's and Lenz's laws together"}
$$
E = -\frac{\Delta(N\Phi)}{\Delta t}
$$

The minus sign expresses Lenz's law: the induced e.m.f. opposes the change in flux linkage.
:::

:::formula{name="a.c. generator (extension)"}
$$
E = E_0\sin\omega t \qquad E_0 = BAN\omega
$$

$E_0$ peak e.m.f. in V; $B$ in T; $A$ area of the coil in m²; $N$ number of turns; $\omega$ angular speed in rad s⁻¹ ($\omega = 2\pi f$). Time is measured from the moment the plane of the coil is perpendicular to the field.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level (topic 20, Paper 4). Lenz's law, direction of induced currents, falling-magnet experiments and eddy currents are needed by both. $E_0 = BAN\omega$ and back e.m.f. are treated as an extension and in outline.
:::

## Lenz's law and conservation of energy

Push the north pole of a magnet towards a coil connected in a closed circuit. The induced current makes the near end of the coil a **north** pole, which **repels** the magnet. You have to do work to keep pushing, and that work becomes the electrical energy in the circuit (and finally heat).

![Lenz's law: as a north pole is pushed into a coil, the induced current makes the near end of the coil a north pole, which repels the magnet; the work done against this repulsion is the energy that appears as electrical energy.](media:diagrams/lenz-law-magnet-coil.png "Figure: the induced current opposes the approaching north pole")

Suppose the opposite were true and the coil made a south pole that attracted the magnet. The magnet would accelerate in, inducing a larger current and a stronger attraction, so it would gain kinetic energy *and* produce electrical energy from nothing. That would break the **conservation of energy**. Lenz's law is therefore not an extra rule: it is energy conservation applied to induction.

## Finding directions

**Method 1, Lenz's law with poles.** Decide what change is happening (north pole approaching, south pole leaving, current switched on…). The induced current makes a pole that opposes it: approach is opposed by a like pole (repulsion), departure by an unlike pole (attraction). Then use the right-hand grip rule to turn the pole into a current direction.

**Method 2, Fleming's right-hand rule** (for a conductor moving through a field): thumb = **motion**, first finger = **field**, second finger = **induced current**. Use the right hand for generators, the left hand for motors.

The two methods always agree. For a rod moving along rails, the induced current produces a force $BIL$ on the rod (left-hand rule) that **opposes its motion**, Lenz's law again.

## Falling magnets, tubes and eddy currents

- **Magnet through a coil.** As the magnet enters, the flux linkage rises: a pulse of e.m.f. in one direction. As it leaves, the flux falls: a pulse in the opposite direction. The second pulse is **taller and narrower**, because the magnet is moving faster as it leaves (it has accelerated while falling). The areas under the two pulses are equal, because each equals the same change of flux linkage. If the coil is connected to a resistor, the current's opposing force slightly slows the magnet.
- **Magnet down a copper or aluminium tube.** The tube acts as a stack of rings. Below the magnet the flux increases and above it the flux decreases, inducing **eddy currents** in rings that repel the magnet from below and attract it from above. The magnet quickly reaches a low terminal speed. In a plastic tube (insulator) or a tube with a slit along it, the eddy currents cannot circulate and the magnet falls freely.

**Eddy currents** heat conductors and oppose motion. Uses: **magnetic braking** in trucks, trains and some fairground rides (a metal disc or fin moving through a magnetic field), induction hobs, metal detectors, and damping in meters and balances. Unwanted eddy currents waste energy in transformer and motor cores, which are therefore **laminated**: thin insulated iron sheets that break up the current paths.

## The a.c. generator

A coil of $N$ turns and area $A$ rotates at angular speed $\omega$ in a uniform field $B$. If $\theta = \omega t$ is the angle between the normal to the coil and the field, the flux linkage is $N\Phi = BAN\cos\omega t$. Its rate of change gives

$$
E = BAN\omega\sin\omega t
$$

- The e.m.f. is **zero** when the plane of the coil is perpendicular to the field (flux linkage a maximum, but momentarily not changing).
- It is a **maximum** when the plane is parallel to the field (flux zero but changing fastest; the sides of the coil cut the field lines at right angles).
- Slip rings and brushes take the alternating e.m.f. out of the rotating coil.

For a generator with $E_0 = 113\ \text{V}$:

| Angle of normal from field / ° | $E\,/\,\text{V}$ |
| --- | --- |
| 0 | 0 |
| 30 | 56.5 |
| 60 | 97.9 |
| 90 | 113 |
| 120 | 97.9 |
| 150 | 56.5 |
| 180 | 0 |
| 270 | −113 |

The graph of $E$ against time is a sine curve. Doubling the rotation speed doubles both the frequency and the peak e.m.f.

![Generator e.m.f. against the angle of the coil's normal from the field: a sine curve E = 113 sin θ with peak 113 V at 90° and 270° (coil plane parallel to the field) and zero at 0°, 180° and 360° (coil plane perpendicular to the field); 56.5 V at 30°.](media:diagrams/generator-emf-graph.png "Figure: e.m.f. of the a.c. generator (200 turns, 0.012 m², 50 rev/s, 0.15 T) over one rotation")

## Back e.m.f. in motors (outline)

A motor's coil rotating in a field is also a generator. The induced e.m.f. opposes the supply (Lenz), so the current is $I = (V - E_{\text{back}})/R$. At switch-on the coil is still, $E_{\text{back}} = 0$, and the current is large; as the motor speeds up the back e.m.f. grows and the current falls. A heavily loaded motor slows, its back e.m.f. falls and it draws more current, which is why a jammed motor can overheat.

## Worked examples

:::worked-solution[Direction from Lenz's law]
The south pole of a bar magnet is pulled away from the end of a coil. Seen from the magnet's side, which way does the induced current flow?

1. Change: a south pole moving away. Lenz: oppose it by attracting the magnet, so the near end of the coil becomes a **north** pole.
2. A north pole, seen from outside, has an **anticlockwise** current (right-hand grip rule).
3. So the current is anticlockwise as seen from the magnet.
:::

:::worked-solution[Peak e.m.f. of a generator]
A coil of $200$ turns and area $0.012\ \text{m}^2$ rotates at $50$ revolutions per second in a field of $0.15\ \text{T}$. Find the peak and r.m.s. e.m.f.

1. $\omega = 2\pi f = 2\pi \times 50 = 314\ \text{rad s}^{-1}$.
2. $E_0 = BAN\omega = 0.15 \times 0.012 \times 200 \times 314 = 113\ \text{V}$.
3. $E_{\text{rms}} = E_0/\sqrt{2} = 80.0\ \text{V}$.
:::

:::worked-solution[Back e.m.f.]
A $12\ \text{V}$ motor has a coil resistance of $1.5\ \Omega$. Running normally it draws $1.2\ \text{A}$. Find the back e.m.f. and the current at the instant it is switched on.

1. $V = E_{\text{back}} + IR \Rightarrow E_{\text{back}} = 12 - 1.2 \times 1.5 = 10.2\ \text{V}$.
2. At switch-on $E_{\text{back}} = 0$: $I = 12/1.5 = 8.0\ \text{A}$, more than six times the running current.
:::

## Common mistakes

:::mistake{title="Opposing the flux instead of the change"}
Lenz's law opposes the **change** in flux. When the flux is decreasing, the induced current tries to maintain it, so it attracts a departing magnet.
:::

:::mistake{title="Left hand for generators"}
Use the **right** hand for the direction of an induced current in a moving conductor; the left hand is for the force on a current (motors).
:::

:::mistake{title="Maximum e.m.f. at maximum flux"}
In a generator the e.m.f. is largest when the flux linkage is **zero** (plane parallel to the field), because that is when it changes fastest.
:::

:::mistake{title="Open circuits"}
An open coil still has an induced e.m.f., but no current flows, so there is no opposing force and no braking.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 6) and Cambridge Paper 4; falling magnets and coil experiments also appear in Paper 5 planning questions.
:::

:::exam-tip{title="Command words"}
*State* Lenz's law in full: direction, opposes the **change** producing it. *Explain* in terms of energy: opposing force means work is done, which becomes electrical energy. *Explain* a falling-magnet trace: pulses opposite in sign, the second larger and shorter, equal areas. *Describe* eddy-current braking: induced currents in the conductor produce a force opposing the relative motion, kinetic energy becomes heat.
:::

## Summary

:::summary
- Lenz's law: the induced e.m.f. opposes the change in flux linkage causing it; it follows from conservation of energy.
- Directions come from Lenz's law with poles or from Fleming's right-hand rule; the force on the induced current opposes the motion.
- Eddy currents in bulk conductors cause magnetic braking and heating; laminations reduce them in cores.
- A coil rotating in a field generates $E = BAN\omega\sin\omega t$, largest when the plane is parallel to the field.
- A motor's back e.m.f. opposes the supply and limits the current once it is running.
:::
