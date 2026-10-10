---
{
  "key": "gravitation.potential",
  "title": "Gravitational potential and potential energy",
  "summary": "Define gravitational potential as work done per unit mass bringing a small test mass from infinity, use φ = −GM/r and E_P = −GMm/r, explain why both are negative, calculate energy changes between orbits, find escape speeds, and relate field strength to the potential gradient.",
  "concepts": ["aphys.gravitation.potential"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Lifting a bag of maize onto a lorry needs $mg\Delta h$ of work, and for any height you can reach on Earth that formula is excellent. Launching a satellite from Zimbabwe to a geostationary orbit is different: $g$ falls to almost nothing on the way up, so $mg\Delta h$ would overestimate the energy needed many times over. To handle large distances we need a measure of "height in the field" that already takes the weakening of gravity into account. That measure is the **gravitational potential**.

This lesson defines potential and potential energy for radial fields, explains the minus signs that puzzle many students, and uses them for orbit changes and escape speed. You should already know $g = GM/r^2$, Newton's law of gravitation, work done = force × distance moved in the direction of the force, and kinetic energy $\tfrac{1}{2}mv^2$.

## Key definitions

:::definition{term="Gravitational potential"}
The gravitational potential at a point is the work done per unit mass in bringing a small test mass from infinity to that point.
:::

:::definition{term="Gravitational potential energy (of two point masses)"}
The work done in bringing one mass from infinity to its position at a distance $r$ from the other mass.
:::

:::formula{name="Potential and potential energy in a radial field"}
$$
\phi = -\frac{GM}{r} \qquad E_P = m\phi = -\frac{GMm}{r}
$$

$\phi$ gravitational potential in $\text{J kg}^{-1}$; $E_P$ gravitational potential energy in J; $M$ mass producing the field and $m$ the second mass, in kg; $r$ distance between the centres in m; $G = 6.67 \times 10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$. Both are zero at infinity.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 5 and Cambridge A Level (13.4, Paper 4). Cambridge names $E_P = -GMm/r$ explicitly; both expect the explanation of the negative sign and the use of potential differences for energy changes. Escape speed is a standard application.
:::

## Why the potential is negative

We choose the zero of potential at **infinity**, where the field is zero. Gravity always attracts, so as a test mass is brought in from infinity the field does work on it: the external agent does **negative** work (it must hold the mass back). The work done per unit mass is therefore negative everywhere, and it becomes more negative closer to the mass.

So:

- $\phi$ is zero at infinity and negative everywhere else;
- the potential **increases** (towards zero) as $r$ increases;
- an object at a point of lower (more negative) potential is "deeper in the potential well" and needs energy to escape.

The values below are for the Earth, $M_E = 5.97 \times 10^{24}\ \text{kg}$, $R_E = 6.37 \times 10^{6}\ \text{m}$.

| $r/R_E$ | $r\,/\,10^{6}\ \text{m}$ | $\phi\,/\,10^{7}\ \text{J kg}^{-1}$ |
| --- | --- | --- |
| 1.0 | 6.37 | −6.25 |
| 2.0 | 12.7 | −3.13 |
| 3.0 | 19.1 | −2.08 |
| 4.0 | 25.5 | −1.56 |
| 6.6 | 42.0 | −0.947 |

A graph of $\phi$ against $r$ is a curve that rises from $-6.25 \times 10^{7}\ \text{J kg}^{-1}$ at the surface towards zero, getting less steep with distance; it is a $-1/r$ curve, so doubling $r$ halves the magnitude of $\phi$ (compare $g$, which falls to a quarter).

## Field strength and potential gradient

The field strength at a point equals the **negative of the potential gradient** there:

$$
g = -\frac{\Delta\phi}{\Delta r}
$$

In words: the field points in the direction in which the potential decreases fastest, and its size is the rate of fall of potential with distance. On a graph of $\phi$ against $r$, the gradient of the tangent at any point gives the magnitude of $g$ there. Near the Earth the curve is steep (strong field); far away it is nearly flat (weak field).

**Equipotentials** are surfaces of equal potential. For a spherical planet they are concentric spheres, closer together near the planet; no work is done moving along an equipotential, and field lines cross equipotentials at right angles.

## Energy changes

Changes in potential energy depend only on the potentials at the start and the end:

$$
\Delta E_P = m\,\Delta\phi = GMm\left(\frac{1}{r_1} - \frac{1}{r_2}\right)
$$

for a move from $r_1$ out to $r_2$. Close to the surface, where $\Delta r = \Delta h$ is small compared with $r$, this reduces to the familiar $mg\Delta h$. For a $100\ \text{km}$ climb from the Earth's surface, the exact change per kilogram is $9.66 \times 10^{5}\ \text{J}$, while $g\Delta h$ gives $9.81 \times 10^{5}\ \text{J}$, already $1.6\%$ too high.

### Escape speed

An object escapes from a planet if it can reach infinity, where $E_P = 0$. Launched with speed $v$ from the surface (ignoring air resistance), it just escapes if its kinetic energy equals the energy needed to climb out of the potential well:

1. $\tfrac{1}{2}mv^2 = \dfrac{GMm}{R}$ (kinetic energy at launch $=$ gain in potential energy from $-GMm/R$ to 0).
2. The mass $m$ cancels: $v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}}$.

For the Earth this is about $11.2\ \text{km s}^{-1}$, whatever the object's mass. In practice rockets do not need to reach this speed at launch, because their engines keep supplying energy as they climb.

## Worked examples

:::worked-solution[Potential at the Earth's surface]
Find the gravitational potential at the Earth's surface.

1. $\phi = -\dfrac{GM}{R} = -\dfrac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{6.37 \times 10^{6}}$.
2. $\phi = -6.25 \times 10^{7}\ \text{J kg}^{-1}$: each kilogram needs $6.25 \times 10^{7}\ \text{J}$ to be removed to infinity.
:::

:::worked-solution[Raising a satellite to a higher orbit]
A $1200\ \text{kg}$ satellite is moved from an orbit of radius $6.67 \times 10^{6}\ \text{m}$ to one of radius $4.22 \times 10^{7}\ \text{m}$. Find the increase in its gravitational potential energy.

1. $\phi_1 = -\dfrac{GM}{r_1} = -5.97 \times 10^{7}\ \text{J kg}^{-1}$; $\phi_2 = -\dfrac{GM}{r_2} = -9.44 \times 10^{6}\ \text{J kg}^{-1}$.
2. $\Delta\phi = \phi_2 - \phi_1 = +5.03 \times 10^{7}\ \text{J kg}^{-1}$ (the potential rises towards zero).
3. $\Delta E_P = m\Delta\phi = 1200 \times 5.03 \times 10^{7} = 6.03 \times 10^{10}\ \text{J}$.
:::

:::worked-solution[Escape speed from the Earth]
1. $v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}} = \sqrt{\dfrac{2 \times 6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{6.37 \times 10^{6}}}$.
2. $v_{\text{esc}} = 1.12 \times 10^{4}\ \text{m s}^{-1}$ ($11.2\ \text{km s}^{-1}$).
:::

## Common mistakes

:::mistake{title="Dropping the minus sign"}
$\phi = -GM/r$ is negative. A "higher" potential is one closer to zero, so moving away from a planet **increases** $\phi$ and $E_P$.
:::

:::mistake{title="Using 1/r² for potential"}
Potential varies as $1/r$; field strength varies as $1/r^2$. Doubling $r$ halves $\phi$ but quarters $g$.
:::

:::mistake{title="Subtracting potentials the wrong way"}
Work out $\Delta\phi = \phi_{\text{final}} - \phi_{\text{initial}}$ with the signs included. Moving outwards must give a positive change.
:::

:::mistake{title="mgΔh for large heights"}
$mg\Delta h$ assumes $g$ is constant. For changes comparable with the planet's radius, use $GMm(1/r_1 - 1/r_2)$.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (Form 5) and Cambridge Paper 4. Expect definitions, the negative sign, energy to move between orbits and escape speed.
:::

:::exam-tip{title="Command words"}
*Define* potential: "work done per unit mass", "small test mass", "from infinity". *Explain* why it is negative: zero at infinity and the force is attractive, so work is done by the field as the mass approaches. *Show that* the escape speed is $\sqrt{2GM/R}$: equate kinetic energy to $GMm/R$. *Describe* the $\phi$-$r$ graph: negative, rising towards zero, gradient equal to $g$ in magnitude.
:::

## Summary

:::summary
- Gravitational potential: work done per unit mass bringing a small test mass from infinity; $\phi = -GM/r$, zero at infinity.
- Potential energy of two masses: $E_P = -GMm/r$; it increases (towards zero) as the masses separate.
- Energy to move between radii: $\Delta E_P = m\Delta\phi = GMm(1/r_1 - 1/r_2)$; $mg\Delta h$ only for small heights.
- Field strength is the negative of the potential gradient, $g = -\Delta\phi/\Delta r$.
- Escape speed $v = \sqrt{2GM/R}$, independent of the escaping mass.
:::
