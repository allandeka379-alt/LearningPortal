---
{
  "key": "particles.electron-charge-mass",
  "title": "Charged particles: thermionic emission, e/m and Millikan's experiment",
  "summary": "Explain thermionic emission and how electron beams are produced, determine the specific charge e/m of the electron from deflection in magnetic and crossed electric and magnetic fields, describe the principle of Millikan's oil-drop experiment as evidence for the quantisation of charge, and use the electronvolt.",
  "concepts": ["aphys.particles.electron-charge-mass"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Old television sets, the X-ray tubes in Parirenyatwa Hospital and the electron microscopes at the University of Zimbabwe all start with the same step: boiling electrons out of a hot metal and accelerating them into a beam. Experiments on such beams, around 1897, showed that "cathode rays" are streams of tiny negatively charged particles with a definite charge-to-mass ratio. A few years later Millikan's oil-drop experiment showed that charge always comes in whole-number multiples of one basic charge, $e$.

This lesson explains thermionic emission, shows how $e/m$ is measured with magnetic and electric fields, and describes the principle of Millikan's experiment. It uses $F = BQv$ for a moving charge and $E = V/d$ for a uniform field, which are covered in the field lessons.

## Key definitions

:::definition{term="Thermionic emission"}
The emission of electrons from the surface of a heated metal, when some free electrons gain enough thermal energy to escape.
:::

:::definition{term="Specific charge"}
The charge per unit mass of a particle, $q/m$, in $\text{C kg}^{-1}$. For the electron it is $e/m_e$.
:::

:::definition{term="Electronvolt"}
The energy gained (or lost) by an electron when it moves through a potential difference of one volt: $1\ \text{eV} = 1.60 \times 10^{-19}\ \text{J}$.
:::

:::definition{term="Quantisation of charge"}
Electric charge exists only in whole-number multiples of the elementary charge $e = 1.60 \times 10^{-19}\ \text{C}$.
:::

:::formula{name="Electron accelerated from rest"}
$$
eV = \tfrac{1}{2}m_ev^2 \qquad v = \sqrt{\frac{2eV}{m_e}}
$$

$V$ accelerating p.d. in V; $v$ speed in $\text{m s}^{-1}$ (non-relativistic, so $V$ up to a few kV).
:::

:::formula{name="Circular path in a magnetic field"}
$$
Bev = \frac{m_ev^2}{r} \quad\Rightarrow\quad r = \frac{m_ev}{Be} \quad\Rightarrow\quad \frac{e}{m_e} = \frac{2V}{B^2r^2}
$$

$B$ flux density in T; $r$ radius of the circular path in m.
:::

:::formula{name="Crossed fields (velocity selector)"}
$$
eE = Bev \quad\Rightarrow\quad v = \frac{E}{B} = \frac{V}{Bd}
$$
:::

:::keyfact{title="Values"}
$e = 1.60 \times 10^{-19}\ \text{C}$, $m_e = 9.11 \times 10^{-31}\ \text{kg}$, so $e/m_e = 1.76 \times 10^{11}\ \text{C kg}^{-1}$, about 1840 times the specific charge of the proton.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC only (Form 6, "charged particles"; scope to be confirmed against the syllabus). Cambridge students meet the force on a moving charge and velocity selection in topic 20 but not the $e/m$ or Millikan experiments.
:::

## Thermionic emission and electron guns

A metal filament heated by a current (to well over $1000\ ^\circ\text{C}$) gives some of its free electrons enough kinetic energy to escape the surface. In an **electron gun**:

1. the heated cathode emits electrons;
2. a positive anode, at a p.d. $V$ above the cathode, accelerates them; each gains kinetic energy $eV$;
3. electrons passing through a hole in the anode form a narrow beam;
4. the tube is evacuated so that electrons are not scattered or slowed by gas molecules.

Raising the filament temperature increases the **number** of electrons emitted per second (the beam current); raising the anode p.d. increases their **speed**.

## Measuring e/m with a fine-beam tube

A fine-beam tube contains a little low-pressure gas that glows where the beam passes, so the path is visible. Two large coils (Helmholtz coils) produce a uniform magnetic field at right angles to the beam.

- The magnetic force $Bev$ is always perpendicular to the velocity, so the electrons move in a **circle**.
- Equating the magnetic force to the centripetal force gives $r = m_ev/(Be)$.
- Combining with $eV = \tfrac{1}{2}m_ev^2$ to eliminate $v$:

$$
\frac{e}{m_e} = \frac{2V}{B^2r^2}
$$

So measuring $V$, $B$ (from the coil current) and $r$ (with a scale behind the tube) gives $e/m_e$. The radius is hard to read precisely because the glowing beam is several millimetres wide and the scale is outside the glass (parallax); its uncertainty counts **twice**, because $r$ is squared.

### Crossed fields

Alternatively, an electric field $E = V/d$ between two plates is applied at right angles to a magnetic field, both perpendicular to the beam. The fields are adjusted until the beam goes straight through undeflected: then $eE = Bev$ and $v = E/B$. Switching off the electric field, the beam curves with radius $r$ in the magnetic field alone, and $e/m_e = v/(Br) = E/(B^2r)$.

## Millikan's oil-drop experiment

Tiny oil drops are sprayed between two horizontal metal plates a distance $d$ apart. Friction in the spray (or X-rays) gives some drops a small charge. A drop is watched through a microscope.

- With a p.d. $V$ across the plates, the electric force on a drop of charge $q$ is $qE = qV/d$, upwards if the top plate has the right sign.
- $V$ is adjusted until a chosen drop is **stationary**: the electric force balances its weight,

$$
\frac{qV}{d} = mg \qquad q = \frac{mgd}{V}
$$

- The mass is found from the drop's radius $r$ and the oil density $\rho$: $m = \tfrac{4}{3}\pi r^3\rho$. (In practice $r$ is found from the drop's terminal speed when it falls with the field off.)

Charges found for many drops cluster at whole-number multiples of one value. A set of results of this kind:

| drop | $q\,/\,10^{-19}\ \text{C}$ | $q/e$ |
| --- | --- | --- |
| 1 | 3.24 | 2.02 |
| 2 | 7.94 | 4.96 |
| 3 | 4.87 | 3.04 |
| 4 | 11.14 | 6.96 |
| 5 | 6.32 | 3.95 |
| 6 | 1.63 | 1.02 |
| 7 | 9.66 | 6.04 |

Every value is close to a whole number of $e$, and no drop carries a fraction such as $1.5e$. This is the evidence that **charge is quantised**, with $e$ the smallest free charge.

## Worked examples

:::worked-solution[Specific charge from a fine-beam tube]
Electrons are accelerated through $250\ \text{V}$ and travel in a circle of radius $6.7\ \text{cm}$ in a field of $0.80\ \text{mT}$. Find $e/m_e$.

1. $\dfrac{e}{m_e} = \dfrac{2V}{B^2r^2} = \dfrac{2 \times 250}{(0.80 \times 10^{-3})^2 \times (0.067)^2}$.
2. $\dfrac{e}{m_e} = 1.74 \times 10^{11}\ \text{C kg}^{-1}$, within 1% of the accepted value.
:::

:::worked-solution[Crossed fields]
Plates $4.0\ \text{cm}$ apart have $2000\ \text{V}$ across them; a beam passes undeflected when $B = 1.6\ \text{mT}$. With the electric field off, the beam's radius is $0.11\ \text{m}$. Find $v$ and $e/m_e$.

1. $E = V/d = 2000/0.040 = 5.00 \times 10^{4}\ \text{V m}^{-1}$.
2. $v = E/B = 5.00 \times 10^{4}/1.6 \times 10^{-3} = 3.13 \times 10^{7}\ \text{m s}^{-1}$.
3. $e/m_e = v/(Br) = 3.13 \times 10^{7}/(1.6 \times 10^{-3} \times 0.11) = 1.78 \times 10^{11}\ \text{C kg}^{-1}$.
:::

:::worked-solution[A balanced oil drop]
An oil drop of radius $1.2 \times 10^{-6}\ \text{m}$ (density $870\ \text{kg m}^{-3}$) is held stationary between plates $8.0\ \text{mm}$ apart by a p.d. of $1030\ \text{V}$. Find its charge.

1. $m = \tfrac{4}{3}\pi r^3\rho = \tfrac{4}{3}\pi(1.2 \times 10^{-6})^3 \times 870 = 6.30 \times 10^{-15}\ \text{kg}$.
2. $q = \dfrac{mgd}{V} = \dfrac{6.30 \times 10^{-15} \times 9.81 \times 8.0 \times 10^{-3}}{1030} = 4.80 \times 10^{-19}\ \text{C}$.
3. $q/e = 3.00$: the drop carries three electronic charges.
:::

## Common mistakes

:::mistake{title="Using the diameter of the beam circle"}
$r$ in $e/m = 2V/(B^2r^2)$ is the radius. Reading the diameter from the scale and not halving it gives a value four times too small.
:::

:::mistake{title="Magnetic force does work"}
The magnetic force is perpendicular to the velocity, so it changes the direction but not the speed of the electrons.
:::

:::mistake{title="Upthrust and the sign of the drop"}
For a negative drop to be held up, the **top** plate must be positive. (Accurate work also allows for the small upthrust of the air, which this course usually ignores.)
:::

:::mistake{title="Electronvolt as a unit of p.d."}
The electronvolt is a unit of **energy**. A p.d. of 250 V gives each electron $250\ \text{eV} = 4.00 \times 10^{-17}\ \text{J}$.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 6). Expect a derivation of $e/m = 2V/(B^2r^2)$, calculations with crossed fields, and a description of the oil-drop principle with the balancing condition.
:::

:::exam-tip{title="Command words"}
*Explain* thermionic emission: heating gives free electrons enough energy to escape the surface. *Derive*: write $eV = \tfrac{1}{2}mv^2$ and $Bev = mv^2/r$, then eliminate $v$. *Describe* Millikan's experiment: balance a drop, $qV/d = mg$, many drops give multiples of $e$. *Explain* why the beam is circular: force perpendicular to velocity, constant speed.
:::

## Summary

:::summary
- Thermionic emission: a heated filament releases electrons; an anode at p.d. $V$ gives each one kinetic energy $eV$.
- In a uniform magnetic field electrons move in circles: $r = m_ev/(Be)$; with $eV = \tfrac{1}{2}m_ev^2$, $e/m_e = 2V/(B^2r^2)$.
- Crossed fields select $v = E/B$; then $e/m_e = v/(Br)$.
- Millikan: a stationary drop has $qV/d = mg$; all charges are whole-number multiples of $e = 1.60 \times 10^{-19}\ \text{C}$.
- $1\ \text{eV} = 1.60 \times 10^{-19}\ \text{J}$; $e/m_e = 1.76 \times 10^{11}\ \text{C kg}^{-1}$.
:::
