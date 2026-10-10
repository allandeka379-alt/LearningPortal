---
{
  "key": "efields.electric-potential",
  "title": "Electric potential and electric potential energy",
  "summary": "Define electric potential as work done per unit positive charge bringing a small test charge from infinity, use V = Q/(4πε₀r) and E_P = Qq/(4πε₀r), relate field strength to the potential gradient, describe equipotentials, solve closest-approach problems, and compare electric with gravitational potential.",
  "concepts": ["aphys.efields.electric-potential"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When Ernest Rutherford's team fired alpha particles at thin gold foil, a few bounced almost straight back. An alpha particle heading for a gold nucleus slows down as it climbs a "hill" of electric potential, stops at its distance of closest approach, and is pushed back out. Working out how close it gets is an energy problem, and the tool for it is **electric potential**.

Potential is also what a voltmeter measures. The $11\ \text{kV}$ on a ZESA distribution line, the $5\ \text{V}$ from a phone charger and the few kilovolts in an electron gun are all potential differences: energy transferred per unit charge between two points. In this lesson we define potential at a single point, find it for a point charge, and link it to the field strength you met in the last two lessons.

You should already know $E = F/q$, Coulomb's law $F = Qq/(4\pi\varepsilon_0r^2)$, the field of a point charge, and the idea of gravitational potential $\phi = -GM/r$.

## Key definitions

:::definition{term="Electric potential"}
The electric potential at a point is the work done per unit positive charge in bringing a small test charge from infinity to that point.
:::

:::definition{term="Electric potential energy"}
The electric potential energy of a charge at a point is the work done in bringing that charge from infinity to the point. It equals the charge multiplied by the potential there.
:::

:::formula{name="Potential due to a point charge"}
$$
V = \frac{Q}{4\pi\varepsilon_0 r}
$$

$V$ potential in V (J C⁻¹); $Q$ charge in C (with its sign); $r$ distance from the charge (or from the centre of a charged conducting sphere, for points outside it) in m; $\varepsilon_0 = 8.85 \times 10^{-12}\ \text{F m}^{-1}$, and $1/(4\pi\varepsilon_0) = 8.99 \times 10^{9}\ \text{m F}^{-1}$.
:::

:::formula{name="Electric potential energy of two point charges"}
$$
E_P = qV = \frac{Qq}{4\pi\varepsilon_0 r}
$$

$E_P$ in J; $Q$ and $q$ the two charges in C, with their signs; $r$ their separation in m. Positive for like charges, negative for unlike charges.
:::

:::formula{name="Field strength and potential gradient"}
$$
E = -\frac{\Delta V}{\Delta r}
$$

The field strength is equal to the negative of the potential gradient. For a uniform field this becomes $E = V/d$ in size.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 5 (electric fields) and Cambridge A Level (topic 18, Paper 4). Both need the definition, $V = Q/(4\pi\varepsilon_0r)$, potential energy of two charges and the link between field strength and potential gradient.
:::

## Why potential has a sign

Potential is a **scalar**: it has a size and a sign but no direction. The reference point is infinity, where $V = 0$.

- Near a **positive** charge you must push a positive test charge inwards against repulsion, so you do positive work: $V$ is **positive** and rises as you get closer.
- Near a **negative** charge the test charge is attracted in; the field does the work, so the work done by you is negative: $V$ is **negative** and becomes more negative closer in.

This is the key contrast with gravity. Masses only attract, so gravitational potential $\phi = -GM/r$ is always negative. Charges can attract or repel, so electric potential can be either sign.

Because potential is a scalar, potentials from several charges simply **add algebraically**, with signs. There is no need for the vector diagrams you used for field strength.

## Potential energy and work done

Moving a charge $q$ from a point at potential $V_1$ to a point at potential $V_2$ needs work

$$
W = q(V_2 - V_1) = q\,\Delta V
$$

For a positive charge, moving towards higher potential needs work input; for an electron, moving towards higher potential releases energy, which is why electrons "fall" towards positive plates and gain kinetic energy.

For two point charges, $E_P = Qq/(4\pi\varepsilon_0r)$:

- like charges: $E_P$ is positive and **increases** as they are pushed together (work must be done);
- unlike charges: $E_P$ is negative and **decreases** (becomes more negative) as they come together, energy being released.

## Potential against distance: the graph

For a charge of $+12\ \text{nC}$ the potential at distance $r$ is:

| $r\,/\,\text{m}$ | $V\,/\,\text{V}$ |
| --- | --- |
| 0.10 | 1080 |
| 0.15 | 719 |
| 0.20 | 539 |
| 0.30 | 360 |
| 0.40 | 270 |
| 0.60 | 180 |

The graph of $V$ against $r$ is a $1/r$ curve: doubling $r$ halves $V$, and the curve approaches zero without reaching it. The **gradient of the tangent** at any point is $\Delta V/\Delta r$, and the field strength is minus this gradient. At $r = 0.20\ \text{m}$ the tangent gradient is $-2.70 \times 10^{3}\ \text{V m}^{-1}$, so $E = 2.70 \times 10^{3}\ \text{V m}^{-1}$ outwards, exactly what $E = Q/(4\pi\varepsilon_0r^2)$ gives. The curve is steepest close to the charge, where the field is strongest. A negative charge gives the same shape reflected below the $r$-axis.

The minus sign in $E = -\Delta V/\Delta r$ says that the field points from high potential to low potential, the direction in which a positive charge would "roll downhill".

## Equipotentials

An **equipotential** is a surface (or a line, on a flat drawing) on which every point is at the same potential. No work is done moving a charge along an equipotential.

- Equipotentials are always **perpendicular** to field lines.
- Around a point charge they are concentric spheres. For the $+12\ \text{nC}$ charge, the $600\ \text{V}$, $450\ \text{V}$, $300\ \text{V}$ and $150\ \text{V}$ equipotentials have radii $0.180$, $0.240$, $0.360$ and $0.719\ \text{m}$: equal steps of potential are **closer together** where the field is stronger.
- Between parallel plates they are flat planes parallel to the plates and **equally spaced**, because the field is uniform.

## Electric and gravitational potential compared

| Feature | Gravitational | Electric |
| --- | --- | --- |
| Defined per unit | mass | positive charge |
| Point source | $\phi = -GM/r$ | $V = Q/(4\pi\varepsilon_0r)$ |
| Sign | always negative | positive for $+Q$, negative for $-Q$ |
| Potential energy | $-GMm/r$ | $Qq/(4\pi\varepsilon_0r)$ |
| Link to field | $g = -\Delta\phi/\Delta r$ | $E = -\Delta V/\Delta r$ |

Both are scalars, both fall off as $1/r$, both are zero at infinity, and in both cases the field is the negative potential gradient.

## Worked examples

:::worked-solution[Work done between two points]
A small conducting sphere carries a charge of $+6.0\ \text{nC}$. Find the work needed to move a charge of $+2.0\ \text{nC}$ from $0.30\ \text{m}$ to $0.15\ \text{m}$ from its centre.

1. $V_1 = \dfrac{8.99 \times 10^{9} \times 6.0 \times 10^{-9}}{0.30} = 180\ \text{V}$.
2. $V_2 = \dfrac{8.99 \times 10^{9} \times 6.0 \times 10^{-9}}{0.15} = 360\ \text{V}$.
3. $W = q(V_2 - V_1) = 2.0 \times 10^{-9} \times (360 - 180) = 3.60 \times 10^{-7}\ \text{J}$.
:::

:::worked-solution[Closest approach of an alpha particle]
An alpha particle (charge $+2e$) with kinetic energy $5.0\ \text{MeV}$ heads straight for a gold nucleus (charge $+79e$). Find the distance of closest approach.

1. Initial kinetic energy: $5.0 \times 10^{6} \times 1.60 \times 10^{-19} = 8.00 \times 10^{-13}\ \text{J}$.
2. At closest approach the particle is momentarily at rest, so all its kinetic energy has become electric potential energy: $E_k = \dfrac{(2e)(79e)}{4\pi\varepsilon_0r}$.
3. $r = \dfrac{8.99 \times 10^{9} \times 2 \times 79 \times (1.60 \times 10^{-19})^2}{8.00 \times 10^{-13}} = 4.55 \times 10^{-14}\ \text{m}$.

The gold nucleus is assumed to stay still (it is about 50 times heavier). The answer is an upper limit for the nuclear radius.
:::

:::worked-solution[Potentials from two charges]
Charges of $+4.0\ \text{nC}$ and $-2.0\ \text{nC}$ are $0.20\ \text{m}$ apart. Find the potential midway between them and the point on the line between them where $V = 0$.

1. Midpoint: $V = 8.99 \times 10^{9}\left(\dfrac{4.0 \times 10^{-9}}{0.10} - \dfrac{2.0 \times 10^{-9}}{0.10}\right) = 180\ \text{V}$ (scalars: just add with signs).
2. $V = 0$ where $\dfrac{4.0}{x} = \dfrac{2.0}{0.20 - x}$, $x$ measured from the $+4.0\ \text{nC}$ charge.
3. $4.0(0.20 - x) = 2.0x$, so $x = 0.133\ \text{m}$ from the positive charge. (The field there is not zero: zero potential and zero field are different things.)
:::

## Common mistakes

:::mistake{title="Using 1/r² for potential"}
Field strength goes as $1/r^2$; potential goes as $1/r$. Check which one the question asks for.
:::

:::mistake{title="Adding potentials as vectors"}
Potential is a scalar. Add the values with their signs; do not use Pythagoras or resolve.
:::

:::mistake{title="Dropping the sign of the charge"}
Substitute $Q$ with its sign. A negative charge gives a negative potential, and unlike charges have negative potential energy.
:::

:::mistake{title="Zero potential means zero field"}
At the point between $+4.0\ \text{nC}$ and $-2.0\ \text{nC}$ where $V = 0$, both fields point towards the negative charge, so $E$ is large. The field is the potential gradient, not the potential.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5) and Cambridge Paper 4. Expect definitions, closest-approach energy problems, a $V$-$r$ graph to read a gradient from, and comparisons with gravitational potential.
:::

:::exam-tip{title="Command words"}
*Define* potential: "work done per unit positive charge bringing a small test charge from infinity". *Explain* why it can be positive or negative: repulsion versus attraction. *Show that* $E = -\Delta V/\Delta r$: work $F\Delta r$ against the field equals $q\Delta V$. *Calculate* closest approach: initial kinetic energy equals $Qq/(4\pi\varepsilon_0r)$. *Describe* equipotentials: perpendicular to field lines, closer where the field is stronger.
:::

## Summary

:::summary
- Electric potential is the work done per unit positive charge bringing a small test charge from infinity; it is a scalar in volts.
- For a point charge $V = Q/(4\pi\varepsilon_0r)$: positive near $+Q$, negative near $-Q$, zero at infinity.
- Potential energy of two charges $E_P = Qq/(4\pi\varepsilon_0r)$; work to move a charge is $q\Delta V$.
- Field strength is the negative potential gradient, $E = -\Delta V/\Delta r$; equipotentials are perpendicular to field lines.
- Gravitational potential is always negative; electric potential can have either sign.
:::
